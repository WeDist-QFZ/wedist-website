import { type NextRequest, NextResponse } from "next/server"

// Same-origin proxy for public Google Drive PDFs.
//
// The browser can't fetch a Drive file directly (CORS + it serves an HTML
// wrapper, not the raw bytes). This route streams the raw PDF back from our own
// domain so react-pdf can render it without CORS issues.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const fileId = searchParams.get("id")

  if (!fileId) {
    return NextResponse.json({ error: "Missing file ID" }, { status: 400 })
  }

  // Google Drive's public direct-download endpoint for a given file id.
  const googleDriveUrl = `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`

  try {
    const response = await fetch(googleDriveUrl, {
      // Follow Drive's redirect to the actual file host.
      redirect: "follow",
      headers: {
        // A UA header makes Drive reliably return the file rather than a
        // consent/interstitial page for some public documents.
        "User-Agent": "Mozilla/5.0 (compatible; WeDistDatasheetProxy/1.0)",
      },
    })

    if (!response.ok || !response.body) {
      return NextResponse.json(
        { error: "Failed to fetch from Google Drive" },
        { status: response.ok ? 502 : response.status },
      )
    }

    // Stream the bytes back with PDF headers so the viewer treats it as a PDF.
    return new NextResponse(response.body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
