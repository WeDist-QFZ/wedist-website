import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { downloads } from "@/lib/data"
import { Download, FileText, HardDrive, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Header />
      <main className="pt-20 md:pt-24 lg:pt-28">
        {/* Hero Section */}
        <section className="py-12 md:py-16 cyber-grid">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0f0f5] mb-4 md:mb-6">
                <span className="text-[#f5b800] text-glow">Downloads</span> Center
              </h1>
              <p className="text-base md:text-lg text-[#888899] leading-relaxed px-4">
                Access our library of product catalogs, technical documentation, case studies, and more resources to
                help you make informed decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Downloads Grid */}
        <section className="py-12 md:py-16 bg-[#050508]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {downloads.map((item) => (
                <div
                  key={item.id}
                  className="group p-4 md:p-6 bg-[#121218] rounded-lg border border-[#2a2a36] hover:border-[#f5b800]/50 transition-all duration-300 flex flex-col sm:flex-row items-start gap-4"
                >
                  <div className="p-3 md:p-4 bg-[#f5b800]/10 rounded-lg text-[#f5b800] group-hover:bg-[#f5b800]/20 transition-colors shrink-0">
                    <FileText className="w-5 h-5 md:w-6 md:h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-semibold text-[#f0f0f5] mb-1 group-hover:text-[#f5b800] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[#888899] text-sm mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex items-center gap-3 md:gap-4 text-xs text-[#888899]">
                      <span className="flex items-center gap-1">
                        <HardDrive className="w-3 h-3" />
                        {item.size}
                      </span>
                      <span className="px-2 py-0.5 bg-[#1a1a24] rounded text-[#f5b800]">{item.type}</span>
                      {item.isImportant && (
                        <span className="px-2 py-0.5 bg-[#f5b800]/20 rounded text-[#f5b800] text-xs">Important</span>
                      )}
                    </div>
                  </div>

                  {item.isImportant && item.redirectPath ? (
                    <Link href={item.redirectPath}>
                      <Button size="icon" className="bg-[#f5b800] text-[#0a0a0f] hover:bg-[#c49400] shrink-0">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                  ) : item.externalUrl ? (
                    <a href={item.externalUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="icon" className="bg-[#f5b800] text-[#0a0a0f] hover:bg-[#c49400] shrink-0">
                        <Download className="w-4 h-4" />
                      </Button>
                    </a>
                  ) : (
                    <Button size="icon" className="bg-[#f5b800] text-[#0a0a0f] hover:bg-[#c49400] shrink-0" disabled>
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Request Document Section */}
        <section className="py-16 md:py-20 bg-[#0a0a0f] cyber-grid">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0f0f5] mb-4 md:mb-6">
              Can not Find What You Need?
            </h2>
            <p className="text-base md:text-lg text-[#888899] mb-6 md:mb-8 px-4">
              Contact our team for specific documentation, custom proposals, or additional technical resources.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-[#f5b800] text-[#0a0a0f] rounded-lg font-semibold hover:bg-[#c49400] transition-colors glow-yellow"
            >
              Request Documents
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
