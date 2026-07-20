import { resources } from "@/lib/data"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GoogleDrivePdfViewer } from "@/components/google-drive-pdf-viewer"
import { ArrowLeft, FileText } from "lucide-react"

function getGoogleDriveFileId(url: string): string | null {
  if (!/drive\.google\.com/.test(url)) return null
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/) ?? url.match(/[?&]id=([a-zA-Z0-9-_]+)/)
  return match ? match[1] : null
}

export default function CompanyProfilePage() {
  const companyProfile = resources.find((resource) => resource.title === "Company Profile")
  const driveFileId = companyProfile?.externalUrl ? getGoogleDriveFileId(companyProfile.externalUrl) : null

  if (!companyProfile) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5] page-transition">
      <Header />

      <main className="pt-20 md:pt-28 lg:pt-32 pb-12 md:pb-16">
        <div className="mx-auto w-full max-w-[1100px] px-3 sm:px-4 md:px-8">
          <a
            href="/resources"
            className="mb-6 inline-flex items-center gap-2 rounded-lg border border-[#f5b800]/30 px-5 py-3 text-sm text-[#f0f0f5] hover:border-[#f5b800] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-[#f5b800]" />
            Back to Resources
          </a>

          <header className="mb-8 border-b border-[#2a2a36] pb-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#f5b800]/30 bg-[#f5b800]/10 px-3 py-1.5">
              <FileText className="h-4 w-4 text-[#f5b800]" />
              <span className="text-xs uppercase tracking-[0.18em] text-[#f5b800]">
                Company Profile
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-balance leading-tight">
              {companyProfile.title}
            </h1>

            <p className="mt-3 max-w-3xl text-base md:text-lg text-[#cfd0da] text-pretty">
              {companyProfile.description}
            </p>

          </header>

          {companyProfile.externalUrl && driveFileId ? (
            <GoogleDrivePdfViewer shareLink={companyProfile.externalUrl} title={companyProfile.title} />
          ) : (
            <div className="rounded-2xl border border-[#2a2a36] bg-[#121218]/70 p-8 text-center text-[#888899]">
              The company profile document is not available yet.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
