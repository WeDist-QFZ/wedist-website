import { FolderKanban } from "lucide-react"
import { getProjectLogos } from "@/lib/projects"
import { ProjectsMarquee } from "./projects-marquee"
import { ScrollReveal } from "./scroll-reveal"

export function ProjectsSection() {
  const logos = getProjectLogos()

  // split for opposing flow rows
  const half = Math.ceil(logos.length / 2)
  const rowOne = logos.slice(0, half)
  const rowTwo = logos.slice(half).length ? logos.slice(half) : logos

  return (
    <section className="relative overflow-hidden bg-[#050508] py-16 md:py-24">

      {/* === ambient background (same system as Partners) === */}
      <div className="absolute inset-0 hex-pattern opacity-30" />
      <div className="absolute inset-0 data-stream opacity-20" />

      <div className="absolute left-1/4 top-1/2 h-[260px] w-[260px] -translate-y-1/2 rounded-full bg-[#f5b800]/5 blur-3xl md:h-[500px] md:w-[500px]" />
      <div className="absolute right-1/4 top-1/3 h-[220px] w-[220px] rounded-full bg-[#f5b800]/[0.03] blur-3xl md:h-[400px] md:w-[400px]" />

      {/* IMPORTANT: allow full width flow (no overflow restriction feel) */}
      <div className="relative z-10 w-full">

        {/* header stays centered but does NOT affect marquee width */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <ScrollReveal animation="up">
            <div className="text-center mb-10 md:mb-14">

              <div className="inline-flex items-center gap-3 px-5 md:px-6 py-2 md:py-3 bg-[#f5b800]/10 border border-[#f5b800]/30 rounded-full mb-6 md:mb-8">
                <FolderKanban className="w-5 h-5 md:w-6 md:h-6 text-[#f5b800]" />
                <span className="text-sm md:text-base font-medium text-[#f5b800] tracking-[0.2em]">
                  OUR PROJECTS
                </span>
              </div>

              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#f0f0f5] leading-tight">
                Powering Ambitious{" "}
                <span className="text-[#f5b800] text-glow">
                  Projects
                </span>
              </p>

            </div>
          </ScrollReveal>

        </div>

        {/* === MARQUEE AREA (FULL BLEED FEEL) === */}
        {logos.length === 0 ? (
          <div className="text-center text-sm text-[#8a8a99]">
            Add logo images to{" "}
            <code className="rounded bg-[#121218] px-2 py-1 text-[#f5b800]">
              public/images/projects
            </code>{" "}
            to populate this carousel.
          </div>
        ) : (
          <div className="flex flex-col gap-3 md:gap-5">

            {/* Row 1 */}
            <div className="relative">
              <ProjectsMarquee logos={rowOne} reverse={false} />

              {/* stronger fade for full-bleed illusion */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-[#050508] to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-[#050508] to-transparent" />
            </div>

            {/* Row 2 */}
            <div className="relative">
              <ProjectsMarquee logos={rowTwo} reverse />

              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-[#050508] to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-[#050508] to-transparent" />
            </div>

          </div>
        )}
      </div>
    </section>
  )
}