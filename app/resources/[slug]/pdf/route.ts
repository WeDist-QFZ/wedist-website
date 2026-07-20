import { type NextRequest, NextResponse } from "next/server"

import { resources } from "@/lib/data"

function getGoogleDriveFileId(url: string): string | null {
  if (!/drive\.google\.com/.test(url)) return null
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/) ?? url.match(/[?&]id=([a-zA-Z0-9-_]+)/)
  return match ? match[1] : null
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const resource = resources.find((item) => item.slug === slug)
  const fileId = resource?.externalUrl ? getGoogleDriveFileId(resource.externalUrl) : null

  if (!resource || !fileId) {
    return NextResponse.redirect(new URL(`/resources/${slug}`, request.url))
  }

  const googleDriveUrl = `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`
  const safeName = (resource.title || "document")
    .replace(/[^\w\-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "document"

  try {
    const response = await fetch(googleDriveUrl, {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; WeDistPdfRoute/1.0)",
      },
    })

    if (!response.ok || !response.body) {
      return new NextResponse(`Unable to fetch PDF for ${resource.title}`, {
        status: response.ok ? 502 : response.status,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      })
    }

    const contentType = response.headers.get("content-type") ?? "application/pdf"

    return new NextResponse(response.body, {
      status: 200,
      headers: {
        "Content-Type": contentType.includes("application/pdf") ? "application/pdf" : contentType,
        "Content-Disposition": `inline; filename="${safeName}.pdf"`,
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
        "X-Robots-Tag": "index, follow",
      },
    })
  } catch {
    return NextResponse.json({ error: "Unable to load PDF" }, { status: 500 })
  }
}
