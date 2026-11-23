"use client"

/* -------------------------------------------------------------------------- */
/*  Shared building blocks for the company profile                            */
/* -------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from "react"
import type React from "react"
import { Cctv, Fingerprint, HardDrive, Network } from "lucide-react"

import { CyberCard } from "@/components/cyber-card"
import { HologramCard } from "@/components/hologram-card"

import type { VerticalId } from "./profile-data"

/** Page width used across the About page - wide, matching full-width sections on the site. */
export const wrap = "max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-16"

export const cardCls = "bg-[#121218]/80 border border-[#2a2a36] rounded-md"

export const VERTICAL_ICON: Record<VerticalId, React.ComponentType<{ className?: string }>> = {
  surveillance: Cctv,
  access: Fingerprint,
  networking: Network,
  storage: HardDrive,
}

/* --------------------------------- layout ---------------------------------- */

/** Logo on a light plate (most logos are designed for white); wordmark fallback if the file is missing. */
export function LogoPlate({
  src,
  name,
  className = "",
  imgClassName = "max-h-[62%] max-w-[85%]",
}: {
  src: string
  name: string
  className?: string
  imgClassName?: string
}) {
  const [failed, setFailed] = useState(false)
  const ref = useRef<HTMLImageElement>(null)
  // an image can fail before hydration attaches onError - check once mounted
  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth === 0) setFailed(true)
  }, [])
  return (
    <div className={`flex items-center justify-center rounded-lg bg-white overflow-hidden ${className}`} aria-label={name}>
      {failed ? (
        <span className="px-2 text-[#0a0a0f] font-bold tracking-tight text-center leading-tight text-sm">{name}</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={encodeURI(src)}
          alt={`${name} logo`}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`object-contain ${imgClassName}`}
        />
      )}
    </div>
  )
}

/* ---------------------- site design-language helpers ---------------------- */

/** Badge pill + heading + intro, exactly as used on the Solutions and Resources pages. */
export function SiteHeading({
  icon: Icon,
  badge,
  title,
  text,
  align = "center",
}: {
  icon: React.ComponentType<{ className?: string }>
  badge: string
  title: React.ReactNode
  text?: string
  align?: "center" | "left"
}) {
  return (
    <div className={align === "center" ? "text-center max-w-4xl mx-auto mb-8 md:mb-12" : "max-w-3xl mb-8 md:mb-10"}>
      <div className="inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 bg-[#f5b800]/10 border border-[#f5b800]/30 rounded-full mb-3 md:mb-4">
        <Icon className="w-3 h-3 md:w-4 md:h-4 text-[#f5b800]" />
        <span className="text-xs md:text-sm font-medium text-[#f5b800] tracking-[0.1em] md:tracking-[0.2em]">{badge}</span>
      </div>
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#f0f0f5] mb-3 md:mb-4 text-balance">
        {title}
      </h2>
      {text && <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#888899] leading-relaxed">{text}</p>}
    </div>
  )
}

/** The site's standard card: tilt + hologram, hover glow, scan line and corner rings. */
export function SiteCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <CyberCard className="h-full" tiltEffect>
      <HologramCard>
        <div
          className={`group relative p-4 md:p-6 bg-[#121218]/80 rounded-md border border-[#2a2a36] hover:border-[#f5b800]/50 transition-all duration-500 overflow-hidden h-full ${className}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#f5b800]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f5b800]/50 to-transparent animate-[scanline-move_2s_linear_infinite]" />
            </div>
          </div>
          <div className="relative z-10 h-full">{children}</div>
          <div className="absolute -bottom-10 md:-bottom-12 -right-10 md:-right-12 w-24 md:w-32 h-24 md:h-32 border border-[#f5b800]/10 rounded-full group-hover:border-[#f5b800]/30 transition-colors" />
          <div className="absolute -bottom-6 md:-bottom-8 -right-6 md:-right-8 w-16 md:w-24 h-16 md:h-24 border border-[#f5b800]/10 rounded-full group-hover:border-[#f5b800]/20 transition-colors" />
        </div>
      </HologramCard>
    </CyberCard>
  )
}

/** Icon tile used inside SiteCard (same as Solutions page). */
export function CardIcon({ icon: Icon }: { icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="inline-flex p-2 md:p-3 bg-[#f5b800]/10 rounded-md text-[#f5b800] mb-3 md:mb-5 group-hover:bg-[#f5b800]/20 transition-colors glow-yellow">
      <Icon className="w-5 h-5 md:w-7 md:h-7" />
    </div>
  )
}

/** Corner brackets used on the site's hero sections. */
export function CornerBrackets() {
  return (
    <>
      <div className="absolute top-10 left-6 w-32 h-32 border-l-2 border-t-2 border-[#f5b800]/20 hidden md:block" />
      <div className="absolute bottom-10 right-6 w-32 h-32 border-r-2 border-b-2 border-[#f5b800]/20 hidden md:block" />
    </>
  )
}

/** Primary / secondary buttons in the site's style. */
export const btnPrimary =
  "inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-[#f5b800] text-[#0a0a0f] rounded-lg font-bold text-sm md:text-base hover:bg-[#c49400] transition-colors glow-yellow"
export const btnSecondary =
  "inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 border-2 border-[#f5b800]/50 text-[#f5b800] rounded-lg font-bold text-sm md:text-base hover:bg-[#f5b800]/10 transition-colors"
