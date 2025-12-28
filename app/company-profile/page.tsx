import { redirect } from "next/navigation"
import { downloads } from "@/lib/data"

export default function CompanyProfilePage() {
  const companyProfile = downloads.find((d) => d.title === "Company Profile")

  // If Firebase URL is set, redirect to it
  if (companyProfile?.externalUrl) {
    redirect(companyProfile.externalUrl)
  }

  // Otherwise show a placeholder page
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-[#f0f0f5] mb-4">Company Profile</h1>
        <p className="text-[#888899] mb-8">The company profile document will be available here once uploaded.</p>
        <p className="text-sm text-[#666677]">
          To enable this feature, add your Firebase Storage URL to the externalUrl field in lib/data.ts
        </p>
        <a
          href="/"
          className="inline-block mt-8 px-6 py-3 bg-[#f5b800] text-[#0a0a0f] rounded-lg font-semibold hover:bg-[#c49400] transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  )
}
