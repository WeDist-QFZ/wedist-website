"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Building2, Cctv, Fingerprint, HardDrive, Network } from "lucide-react"

import { BRANDS, VERTICALS, type Brand } from "@/app/about/profile-data"

const WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"]
const ICONS = { surveillance: Cctv, access: Fingerprint, networking: Network, storage: HardDrive }

function Logo({ brand }: { brand: Brand }) {
  const [failed, setFailed] = useState(false)
  const ref = useRef<HTMLImageElement>(null)
  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth === 0) setFailed(true)
  }, [])
  return (
    <div className="h-14 md:h-16 w-36 md:w-44 shrink-0 rounded-lg bg-white flex items-center justify-center px-3 overflow-hidden">
      {failed ? (
        <span className="text-[#0a0a0f] text-xs font-bold text-center leading-tight">{brand.name}</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={encodeURI(brand.logo)}
          alt={brand.name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="max-h-[62%] max-w-[85%] object-contain"
        />
      )}
    </div>
  )
}

/**
 * Homepage call-out for the company profile (/about).
 * Full-bleed band: headline + CTA on top, an edge-to-edge scrolling strip of brand logos below.
 */
export function CompanyProfileBanner() {
  return (
    <section className="relative w-full overflow-hidden border-y border-[#f5b800]/25 bg-[#07070b]">
      {/* ambient light */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[60%] h-[420px] bg-[#f5b800]/10 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f5b800]/70 to-transparent" />

      <Link href="/about" className="group relative block" aria-label="View the WeDist company profile">
        <div className="w-full px-4 sm:px-8 pt-12 md:pt-16 pb-10 md:pb-12 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f5b800]/10 border border-[#f5b800]/30 text-xs tracking-[0.2em] text-[#f5b800]">
            <Building2 className="w-4 h-4" /> COMPANY PROFILE
          </span>
          <h2 className="mt-5 max-w-4xl text-3xl md:text-5xl xl:text-6xl font-bold text-[#f0f0f5] leading-[1.05] text-balance">
            Global brands. {WORDS[VERTICALS.length] ?? VERTICALS.length} verticals.{" "}
            <span className="text-[#f5b800] text-glow">One partner.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[#888899] md:text-lg leading-relaxed text-balance">
            See who we are, the brands we distribute and how we support partners across every solution vertical.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {VERTICALS.map((v) => {
              const Icon = ICONS[v.id]
              return (
                <span
                  key={v.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md border border-[#2a2a36] bg-[#0a0a0f]/80 text-[#c8c8d4]"
                >
                  <Icon className="w-4 h-4 text-[#f5b800]" /> {v.short}
                </span>
              )
            })}
          </div>

          <span className="mt-8 relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#f5b800] text-[#0a0a0f] text-base md:text-lg font-semibold group-hover:shadow-[0_0_34px_rgba(245,184,0,0.55)] transition-all">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 inline-flex items-center gap-2">
              View company profile
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </span>
        </div>

        {/* edge-to-edge logo strip */}
        <div className="relative border-t border-[#2a2a36] bg-[#0a0a0f]/60 py-5 md:py-6 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max wd-banner-marquee group-hover:[animation-play-state:paused]">
            {[...BRANDS, ...BRANDS].map((b, i) => (
              <div key={`${b.slug}-${i}`} aria-hidden={i >= BRANDS.length} className="pr-4 md:pr-6">
                <Logo brand={b} />
              </div>
            ))}
          </div>
        </div>
      </Link>

      <style>{`
        @keyframes wd-banner-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .wd-banner-marquee { animation: wd-banner-marquee 45s linear infinite }
        @media (prefers-reduced-motion: reduce) { .wd-banner-marquee { animation: none } }
      `}</style>
    </section>
  )
}
