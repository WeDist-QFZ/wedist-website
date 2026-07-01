import { FolderKanban } from "lucide-react"
import { getProjectLogos } from "@/lib/projects"
import { ProjectsMarquee } from "./projects-marquee"

export function ProjectsSection() {
  const logos = getProjectLogos()

  // Split into two rows for a layered, opposing-direction carousel.
  const half = Math.ceil(logos.length / 2)
  const rowOne = logos.slice(0, half)
  const rowTwo = logos.slice(half).length ? logos.slice(half) : logos

  return (
    <section className="relative overflow-hidden bg-[#050508] py-20 md:py-32">
      {/* ambient glow accents */}
      <div className="absolute left-1/4 top-1/2 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-[#f5b800]/5 blur-3xl md:h-[500px] md:w-[500px]" />
      <div className="absolute right-1/4 top-1/3 h-[250px] w-[250px] rounded-full bg-[#f5b800]/[0.03] blur-3xl md:h-[400px] md:w-[400px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center md:mb-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f5b800]/30 bg-[#f5b800]/10 px-4 py-2 md:gap-3 md:px-6 md:py-3">
            <FolderKanban className="h-5 w-5 text-[#f5b800] md:h-6 md:w-6" />
            <span className="text-sm font-medium tracking-[0.15em] text-[#f5b800] md:text-base md:tracking-[0.2em]">
              OUR PROJECTS
            </span>
          </div>
          <h2 className="text-balance text-3xl font-bold text-[#f0f0f5] sm:text-4xl md:text-5xl lg:text-6xl">
            Powering Ambitious <span className="text-[#f5b800]">Projects</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[#8a8a99] md:mt-6 md:text-lg">
            A snapshot of the teams and products we&apos;ve helped bring to life.
          </p>
        </div>

        {logos.length === 0 ? (
          <p className="text-center text-sm text-[#8a8a99]">
            Add logo images to{" "}
            <code className="rounded bg-[#121218] px-2 py-1 text-[#f5b800]">public/images/projects</code> to populate this
            carousel.
          </p>
        ) : (
          <div className="flex flex-col gap-4 md:gap-6">
            <ProjectsMarquee logos={rowOne} duration={40} />
            <ProjectsMarquee logos={rowTwo} duration={50} reverse />
          </div>
        )}
      </div>
    </section>
  )
}
