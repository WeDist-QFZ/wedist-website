import { type NextRequest, NextResponse } from "next/server"

import { getBrandById } from "@/lib/data"

function getGoogleDriveFileId(url: string): string | null {
  if (!/drive\.google\.com/.test(url)) return null
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/) ?? url.match(/[?&]id=([a-zA-Z0-9-_]+)/)
  return match ? match[1] : null
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ brand: string; slug: string }> },
) {
  const { brand: brandId, slug } = await params
  const brand = getBrandById(brandId)
  const product = brand?.products.find((item) => item.id === slug)
  const fileId = product?.datasheet ? getGoogleDriveFileId(product.datasheet) : null

  if (!product || !fileId) {
    return NextResponse.redirect(new URL(`/products/${brandId}/${slug}`, request.url))
  }

  const googleDriveUrl = `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`
  const safeName = (product.name || "datasheet")
    .replace(/[^\w\-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "datasheet"

  try {
    const response = await fetch(googleDriveUrl, {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; WeDistProductPdfRoute/1.0)",
      },
    })

    if (!response.ok || !response.body) {
      return new NextResponse(`Unable to fetch datasheet for ${product.name}`, {
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
    return NextResponse.json({ error: "Unable to load datasheet" }, { status: 500 })
  }
}
