import type { MetadataRoute } from "next"
import { brands } from "@/lib/data"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://wedist.net"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/company-profile",
    "/contact",
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

  return [...staticRoutes, ...brandRoutes]
}
