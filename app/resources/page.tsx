"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { resources } from "@/lib/data"
import { Database, FileText, ExternalLink, Download, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberParticles } from "@/components/cyber-particles"
import { FloatingElements } from "@/components/floating-elements"
import { AnimatedGrid } from "@/components/animated-grid"
import { CyberCard } from "@/components/cyber-card"
import { HologramCard } from "@/components/hologram-card"

const categories = [
  "Company Profile",
  "Articles / Blogs",
  "Whitepapers",
  "Case Studies",
  "Technical Resources",
  "Downloads",
]

function getGoogleDriveFileId(url: string): string | null {
  if (!/drive\.google\.com/.test(url)) return null
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/) ?? url.match(/[?&]id=([a-zA-Z0-9-_]+)/)
  return match ? match[1] : null
}

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] page-transition">
      <Header />
      <main className="pt-20 md:pt-28 lg:pt-32">
        <section className="py-9 md:py-16 cyber-grid relative overflow-hidden">
          <AnimatedGrid />
          <CyberParticles count={25} />
          <FloatingElements count={5} />
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/4 w-[169px] md:w-[338px] h-[169px] md:h-[338px] bg-[#f5b800]/10 rounded-full blur-xl animate-float" />
            <div className="absolute bottom-1/3 right-1/4 w-[141px] md:w-[281px] h-[141px] md:h-[281px] bg-[#f5b800]/5 rounded-full blur-xl animate-float-slow" />
          </div>
          <div className="absolute top-10 left-6 w-32 h-32 border-l-2 border-t-2 border-[#f5b800]/20 hidden md:block" />
          <div className="absolute bottom-10 right-6 w-32 h-32 border-r-2 border-b-2 border-[#f5b800]/20 hidden md:block" />
          <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 relative z-10">
            <ScrollReveal animation="up">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 bg-[#f5b800]/10 border border-[#f5b800]/30 rounded-full mb-3 md:mb-4">
                  <Database className="w-3 h-3 md:w-4 md:h-4 text-[#f5b800]" />
                  <span className="text-xs md:text-sm font-medium text-[#f5b800] tracking-[0.1em] md:tracking-[0.2em]">
                    RESOURCE CENTER
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold text-[#f0f0f5] mb-3 md:mb-4">
                  <span className="text-[#f5b800] text-glow">Resources</span> Hub
                </h1>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#888899] leading-relaxed px-1">
                  Browse company profile, articles, blogs, whitepapers, case studies, technical resources, and
                  downloads from our full resource collection.
                </p>
              </div>
            </ScrollReveal>
          </div>
          <div className="absolute inset-0 horizontal-scan pointer-events-none" />
        </section>
        <section className="py-9 md:py-16 bg-[#050508] relative overflow-hidden">
          <CyberParticles count={15} />
          <div className="absolute inset-0 hex-pattern opacity-30" />
          <div className="absolute inset-0 circuit-pattern opacity-20" />
          <div className="absolute top-1/4 left-6 w-20 md:w-44 h-20 md:h-44 bg-[#f5b800]/5 rounded-full blur-xl animate-float" />
          <div className="absolute bottom-1/4 right-6 w-28 md:w-56 h-28 md:h-56 bg-[#f5b800]/3 rounded-full blur-xl animate-float-reverse" />
          <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 relative z-10">
            {categories.map((category) => {
              const items = resources.filter((resource) => resource.category === category)
              if (!items.length) return null
              return (
                <div key={category} className="mb-10">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-[#f5b800] mb-2">{category}</p>
                      <h2 className="text-2xl md:text-3xl font-semibold text-[#f0f0f5]">{category} Resources</h2>
                    </div>
                    <div className="text-sm text-[#888899]">
                      {items.length} item{items.length > 1 ? "s" : ""}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                    {items.map((resource, index) => {
                      const isDrivePdf = Boolean(resource.externalUrl && getGoogleDriveFileId(resource.externalUrl))
                      const isLink = resource.link && Boolean(resource.externalUrl) && !isDrivePdf
                      const isArticle = !resource.link && Boolean(resource.article)
                      // Choose the icon, badge and call-to-action per resource kind.
                      const kind = isDrivePdf
                        ? { Icon: FileText, label: "PDF", cta: "View document", CtaIcon: ArrowRight }
                        : isLink
                          ? { Icon: ExternalLink, label: "External Link", cta: "Visit link", CtaIcon: ExternalLink }
                          : isArticle
                            ? { Icon: BookOpen, label: "Article", cta: "Read article", CtaIcon: ArrowRight }
                            : { Icon: FileText, label: resource.type, cta: "Open", CtaIcon: Download }
                      return (
<ScrollReveal key={resource.id} animation="scale" delay={index * 75}>
  <CyberCard className="h-full" tiltEffect>
    <HologramCard>
      <Link
  href={`/resources/${resource.slug}`}
  aria-label={`${kind.cta}: ${resource.title}`}
  className="block h-full"
>
  <div
    className="
      group relative
      flex flex-col
      min-h-[340px]
      sm:min-h-[360px]
      lg:aspect-square
      p-4 sm:p-5 lg:p-6
      bg-[#121218]/80
      border border-[#2a2a36]
      hover:border-[#f5b800]/50
      transition-all duration-500
      overflow-hidden
      rounded-xl
      h-full
    "
  >
        {/* Hover Glow */}
        <div className="pointer-events-none
          absolute inset-0
          bg-gradient-to-br from-[#f5b800]/10 via-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
        " />


        {/* Scan Line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="
              absolute top-0 left-0 right-0 h-1
              bg-gradient-to-r from-transparent via-[#f5b800]/50 to-transparent
              animate-[scanline-move_2s_linear_infinite]
            " />
          </div>
        </div>


        <div className="relative z-10 flex h-full flex-col">


          {/* Header */}
          <div className="flex items-start justify-between gap-3">

            <div className="
              flex items-center justify-center
              w-11 h-11 sm:w-12 sm:h-12
              rounded-lg
              bg-[#f5b800]/10
              text-[#f5b800]
              border border-[#f5b800]/20
            ">
              <kind.Icon className="w-5 h-5" />
            </div>


            <span className="
              text-[10px]
              uppercase
              tracking-[0.18em]
              text-[#f5b800]
              border border-[#f5b800]/30
              px-2 py-1
              rounded-sm
              whitespace-nowrap
            ">
              {kind.label}
            </span>

          </div>



          {/* Title */}
          <h3
            className="
              mt-5
              text-lg sm:text-xl
              font-semibold
              leading-snug
              text-[#f0f0f5]
              group-hover:text-[#f5b800]
              transition-colors

              line-clamp-3
              lg:line-clamp-2
            "
          >
            {resource.title}
          </h3>


          {/* Author */}
          {isArticle && resource.article?.author && (
            <p className="
              mt-2
              text-xs
              text-[#888899]
              truncate
            ">
              By {resource.article.author}
            </p>
          )}



          {/* Accent */}
          <div className="
            mt-4
            h-px
            w-16
            bg-gradient-to-r
            from-[#f5b800]
            to-transparent
          " />



          {/* Description */}
          <p
            className="
              mt-4
              text-xs sm:text-sm
              leading-relaxed
              text-[#888899]

              line-clamp-3
            "
          >
            {resource.description}
          </p>



          {/* Footer */}
          <div className="
            mt-auto
            pt-5
            flex
            items-center
            justify-between
            gap-3
            border-t
            border-[#2a2a36]/60
          ">

            <span className="
              text-xs
              text-[#888899]
              truncate
            ">
              {resource.category}
            </span>


            <span className="
              flex-shrink-0
              inline-flex
              items-center
              gap-1.5
              text-xs
              uppercase
              tracking-wider
              text-[#f5b800]
              group-hover:gap-2.5
              transition-all
            ">
              {kind.cta}
              <kind.CtaIcon className="w-3.5 h-3.5" />
            </span>

          </div>

        </div>



        {/* Corner Tech Decoration */}
        <div className="
          absolute
          -bottom-10
          -right-10
          w-28
          h-28
          border
          border-[#f5b800]/10
          rounded-full
          group-hover:border-[#f5b800]/30
          transition-colors
        " />

        <div className="
          absolute
          bottom-4
          right-4
          w-2
          h-2
          rounded-full
          bg-[#f5b800]/40
          shadow-[0_0_12px_#f5b800]
        " />


      </div>
    </Link>
    </HologramCard>
  </CyberCard>
</ScrollReveal>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
