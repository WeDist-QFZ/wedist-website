import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getBrandById } from "@/lib/data"
import { ResourceRedirectClient } from "@/app/resources/[slug]/redirect-client"

// Shared datasheet-redirect factory.
//
// Each brand has its own static folder (e.g. app/products/digifort/page.tsx),
// which shadows any top-level [brand] dynamic route. So instead of one global
// dynamic route, each brand gets a tiny [slug] child page that calls this
// factory with its own brand id. All the real logic lives here in one place.
//
// A brand's datasheet redirect page is just:
//
//   import { createDatasheetRedirect } from "@/lib/datasheet-redirect"
//   const { generateMetadata, Page } = createDatasheetRedirect("digifort")
//   export { generateMetadata }
//   export default Page
//
export function createDatasheetRedirect(brandId: string) {
  async function generateMetadata({
    params,
  }: {
    params: Promise<{ slug: string }>
  }): Promise<Metadata> {
    const { slug } = await params
    const brand = getBrandById(brandId)
    const product = brand?.products.find((item) => item.id === slug)

    if (!brand || !product) {
      return { title: "Datasheet not found | WeDist" }
    }

    return {
      title: `${product.name} Datasheet | ${brand.name} | WeDist`,
      description: product.description,
    }
  }

  // Shows the same brief "Redirecting..." interstitial as the resources hub,
  // then forwards to the product's external datasheet link.
  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const brand = getBrandById(brandId)
    const product = brand?.products.find((item) => item.id === slug)

    if (!product?.datasheet) {
      notFound()
    }

    return <ResourceRedirectClient title={`${product.name} Datasheet`} externalUrl={product.datasheet} />
  }

  return { generateMetadata, Page }
}
