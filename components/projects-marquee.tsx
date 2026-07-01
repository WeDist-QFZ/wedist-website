"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import type { ProjectLogo } from "@/lib/projects"
import { CyberCard } from "./cyber-card"

type Props = {
  logos: ProjectLogo[]
  reverse?: boolean
  offsetPhase?: number
}

export function ProjectsMarquee({
  logos,
  reverse = false,
  offsetPhase = 0,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const position = useRef(0)
  const raf = useRef<number | null>(null)

  // 🔥 DUPLICATION ONLY ONCE (we use mathematical looping instead of DOM looping)
  const loop = [...logos, ...logos]

  useEffect(() => {
    const speed = 1.6

    const animate = () => {
      const el = trackRef.current
      if (!el) return

      const totalWidth = el.scrollWidth / 2

      // forward or backward flow
      position.current += reverse ? speed : -speed

      // 🔥 PURE INFINITE LOOP (NO RESET GLITCH)
      const mod = ((position.current % totalWidth) + totalWidth) % totalWidth

      // Row phase shift (THIS IS THE KEY FIX)
      const phase = offsetPhase % totalWidth

      el.style.transform = `translate3d(${-mod + phase}px,0,0)`

      raf.current = requestAnimationFrame(animate)
    }

    raf.current = requestAnimationFrame(animate)

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [reverse, offsetPhase])

  return (
    <div className="relative w-full overflow-hidden py-4 md:py-6">

      {/* fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-28 md:w-64 bg-gradient-to-r from-[#050508] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-28 md:w-64 bg-gradient-to-l from-[#050508] to-transparent" />

      {/* track */}
      <div
        ref={trackRef}
        className="flex w-max items-center gap-6 md:gap-10 will-change-transform"
      >
        {loop.map((logo, i) => (
          <ProjectTile key={`${logo.src}-${i}`} logo={logo} />
        ))}
      </div>
    </div>
  )
}

function ProjectTile({ logo }: { logo: ProjectLogo }) {
  return (
    <CyberCard className="flex-shrink-0 group cursor-pointer">
      <div className="
        relative flex items-center justify-center
        overflow-hidden rounded-xl
        border border-[#2a2a36]
        bg-[#121218]
        w-56 h-36 md:w-72 md:h-44
        p-4 md:p-6
        transition-all duration-500
        hover:border-[#f5b800]/50
      ">
        <div className="bg-white rounded-lg p-3 md:p-4 flex items-center justify-center w-full h-full">
          <Image
            src={logo.src || "/placeholder.svg"}
            alt={logo.name}
            width={180}
            height={180}
            className="object-contain max-h-20 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
          />
        </div>
      </div>
    </CyberCard>
  )
}