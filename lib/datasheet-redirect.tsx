import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getBrandById } from "@/lib/data"
import { ResourceRedirectClient } from "@/app/resources/[slug]/redirect-client"
import { GoogleDrivePdfViewer } from "@/components/google-drive-pdf-viewer"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, FileText, ArrowUp } from "lucide-react"

// Returns the Drive file id if `url` is a public Google Drive link, else null.
// Only Drive links get the inline PDF viewer; anything else redirects.
function getGoogleDriveFileId(url: string): string | null {
  if (!/drive\.google\.com/.test(url)) return null
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/) ?? url.match(/[?&]id=([a-zA-Z0-9-_]+)/)
  return match ? match[1] : null
}

// Shared datasheet factory.
//
// Each brand has its own static folder (e.g. app/products/digifort/page.tsx),
// which shadows any top-level [brand] dynamic route. So instead of one global
// dynamic route, each brand gets a tiny [slug] child page that calls this
// factory with its own brand id. All the real logic lives here in one place.
//
// A brand's datasheet page is just:
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

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const brand = getBrandById(brandId)
    const product = brand?.products.find((item) => item.id === slug)

    if (!product?.datasheet) {
      notFound()
    }

    // Google Drive datasheets render inline as a PDF on your own domain,
    // wrapped in the site Header/Footer so the page feels native.
if (getGoogleDriveFileId(product.datasheet)) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5] page-transition">
      <Header />

      <main className="pt-20 md:pt-28 lg:pt-32 pb-12 md:pb-16">
        <div className="mx-auto w-full max-w-[1100px] px-3 sm:px-4 md:px-8">
          <a
            href={`/products/${brandId}`}
            className="mb-6 inline-flex items-center gap-2 rounded-lg border border-[#f5b800]/30 px-5 py-3 text-sm text-[#f0f0f5] hover:border-[#f5b800] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-[#f5b800]" />
            Back to {brand?.name} products
          </a>

          <header className="mb-8 border-b border-[#2a2a36] pb-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#f5b800]/30 bg-[#f5b800]/10 px-3 py-1.5">
              <FileText className="h-4 w-4 text-[#f5b800]" />
              <span className="text-xs uppercase tracking-[0.18em] text-[#f5b800]">
                {brand?.name} Datasheet
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-balance leading-tight">
              {product.name}
            </h1>

            {product.description && (
              <p className="mt-3 text-base md:text-lg text-[#cfd0da] text-pretty">
                {product.description}
              </p>
            )}
          </header>

          <GoogleDrivePdfViewer
            shareLink={product.datasheet}
            title={`${product.name} datasheet`}
          />
          <a
              href="#top"
              aria-label="Back to top"
              className="fixed bottom-8 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[#f5b800]/40 bg-[#f5b800] text-[#0a0a0f] shadow-[0_0_30px_rgba(245,184,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#ffcc33]"
            >
              <ArrowUp className="h-6 w-6" />
            </a>
        </div>
        
      </main>

      <Footer />
    </div>
  )
}

    // Non-Drive links keep the brief "Redirecting..." interstitial + forward.
    return <ResourceRedirectClient title={`${product.name} Datasheet`} externalUrl={product.datasheet} />
  }

  return { generateMetadata, Page }
}
