import type { MetadataRoute } from "next"
import { brands, resources } from "@/lib/data"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wedist.net"

function getGoogleDriveFileId(url: string): string | null {
  if (!/drive\.google\.com/.test(url)) return null
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/) ?? url.match(/[?&]id=([a-zA-Z0-9-_]+)/)
  return match ? match[1] : null
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/company-profile",
    "/contact",
    "/resources",
    "/downloads",
    "/products",
    "/product-details",
    "/solutions",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  const brandRoutes = brands.flatMap((brand) => [
    {
      url: `${siteUrl}/products/${brand.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${siteUrl}/product-details/${brand.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ])

  const resourcePdfRoutes = resources.flatMap((resource) => {
    if (!resource.externalUrl || !getGoogleDriveFileId(resource.externalUrl)) return []

    return [
      {
        url: `${siteUrl}/resources/${resource.slug}/pdf`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.75,
      },
    ]
  })

  const productPdfRoutes = brands.flatMap((brand) =>
    brand.products.flatMap((product) => {
      if (!product.datasheet || !getGoogleDriveFileId(product.datasheet)) return []

      return [
        {
          url: `${siteUrl}/products/${brand.id}/${product.id}/pdf`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.8,
        },
      ]
    }),
  )

  return [...staticRoutes, ...brandRoutes, ...resourcePdfRoutes, ...productPdfRoutes]
}
