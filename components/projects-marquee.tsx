"use client"

import Image from "next/image"
import type { ProjectLogo } from "@/lib/projects"

type ProjectsMarqueeProps = {
  logos: ProjectLogo[]
  /** seconds for one full loop — lower is faster */
  duration?: number
  reverse?: boolean
}

export function ProjectsMarquee({ logos, duration = 40, reverse = false }: ProjectsMarqueeProps) {
  if (logos.length === 0) return null

  // Duplicate the set so the -50% translate loops seamlessly.
  const loop = [...logos, ...logos]

  return (
    <div className="group relative flex overflow-hidden py-3 md:py-4">
      {/* edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-[#050508] to-transparent md:w-40" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-[#050508] to-transparent md:w-40" />

      <div
        className="flex shrink-0 items-center gap-4 md:gap-6 pr-4 md:pr-6 [animation-play-state:running] group-hover:[animation-play-state:paused]"
        style={{
          animationName: "projects-marquee",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {loop.map((logo, index) => (
          <ProjectTile key={`${logo.src}-${index}`} logo={logo} />
        ))}
      </div>
    </div>
  )
}

function ProjectTile({ logo }: { logo: ProjectLogo }) {
  return (
    <div className="group/tile relative flex-shrink-0">
      <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border border-[#2a2a36] bg-white p-4 transition-all duration-500 hover:border-[#f5b800]/60 hover:shadow-[0_0_30px_-8px_rgba(245,184,0,0.5)] md:h-40 md:w-40 md:p-6">
        {/* scanline sweep on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/tile:opacity-100">
          <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#f5b800]/60 to-transparent" />
        </div>
        <Image
          src={logo.src || "/placeholder.svg"}
          alt={`${logo.name} logo`}
          width={160}
          height={160}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  )
}
