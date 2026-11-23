"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Building2, Cctv, Fingerprint, HardDrive, Network } from "lucide-react"

import { BRANDS, VERTICALS, type Brand } from "@/app/profile/profile-data"

const ICONS = { surveillance: Cctv, access: Fingerprint, networking: Network, storage: HardDrive }

function Logo({ brand }: { brand: Brand }) {
  const [failed, setFailed] = useState(false)
  const ref = useRef<HTMLImageElement>(null)
  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth === 0) setFailed(true)
  }, [])
  return (
    <div className="h-14 md:h-16 rounded-lg bg-white/95 flex items-center justify-center px-3 overflow-hidden">
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
          className="max-h-[60%] max-w-[85%] object-contain"
        />
      )}
    </div>
  )
}

/** Homepage call-out for the company profile page. Drop it below the hero or the partners strip. */
export function CompanyProfileBanner() {
  return (
    <section className="relative py-14 md:py-20 bg-[#050508] overflow-hidden">
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[360px] bg-[#f5b800]/10 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/profile"
          className="group block rounded-2xl border border-[#f5b800]/35 bg-[#121218]/90 p-6 md:p-10 hover:border-[#f5b800]/70 hover:shadow-[0_0_50px_-10px_rgba(245,184,0,0.45)] transition-all duration-300"
        >
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f5b800]/10 border border-[#f5b800]/30 text-xs tracking-[0.2em] text-[#f5b800]">
                <Building2 className="w-4 h-4" /> COMPANY PROFILE
              </span>
              <h2 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold text-[#f0f0f5] leading-tight text-balance">
                {BRANDS.length} brands. {VERTICALS.length} verticals.{" "}
                <span className="text-[#f5b800]">One partner.</span>
              </h2>
              <p className="mt-4 text-[#888899] md:text-lg leading-relaxed">
                See who we are, every brand we distribute and how they come together across our solution verticals.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {VERTICALS.map((v) => {
                  const Icon = ICONS[v.id]
                  return (
                    <span
                      key={v.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md border border-[#2a2a36] bg-[#0a0a0f] text-[#c8c8d4]"
                    >
                      <Icon className="w-4 h-4 text-[#f5b800]" /> {v.short}
                    </span>
                  )
                })}
              </div>
              <span className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-[#f5b800] text-[#0a0a0f] font-semibold group-hover:shadow-[0_0_30px_rgba(245,184,0,0.5)] transition-all">
                View company profile
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-2 xl:grid-cols-5 gap-2.5">
              {BRANDS.map((b) => (
                <Logo key={b.slug} brand={b} />
              ))}
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
