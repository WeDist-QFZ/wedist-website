"use client"

/* -------------------------------------------------------------------------- */
/*  Homepage: static "What we deliver" section                                 */
/*  Sits between the vendors carousel and the projects carousel.              */
/*  Content comes from lib/data.ts (solutions + brands).                       */
/* -------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from "react"
import type React from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Cctv, Check, Fingerprint, HardDrive, Network } from "lucide-react"

import { brands, solutions } from "@/lib/data"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberCard } from "@/components/cyber-card"

/* ------------------------------ presentation ------------------------------ */

type SolutionMeta = {
  icon: React.ComponentType<{ className?: string }>
  points: string[]
  hero: string // product id used as the tile's showcase image
}

// Keyed by solution id in lib/data.ts. Order here = order on the page.
const META: Record<string, SolutionMeta> = {
  "smart-surveillance": {
    icon: Cctv,
    points: ["AI cameras & PTZ", "Video management", "Smart safety sensors"],
    hero: "srxp4-2v10-ebt-ir",
  },
  "access-control": {
    icon: Fingerprint,
    points: ["Face & fingerprint", "IP door controllers", "Time & attendance"],
    hero: "evopass20",
  },
  "enterprise-networking": {
    icon: Network,
    points: ["PoE & L3 switching", "WiFi 6 / WiFi 7", "Industrial Ethernet"],
    hero: "nwa50ax",
  },
  "data-storage": {
    icon: HardDrive,
    points: ["Surveillance storage", "SAN & JBOD", "NVMe all-flash"],
    hero: "ultrastar-data60",
  },
}
const ORDER = ["smart-surveillance", "access-control", "enterprise-networking", "data-storage"]

const brandByName = new Map(brands.map((b) => [b.name, b]))

const ITEMS = solutions
  .filter((s) => META[s.id])
  .sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id))
  .map((s) => {
    const listed = s.brands.map((n) => brandByName.get(n)).filter(Boolean) as (typeof brands)[number][]
    const related = s.brands.filter((n) => !brandByName.has(n))
    const products = listed.flatMap((b) => b.products.map((p) => ({ ...p, brandId: b.id })))
    const hero = products.find((p) => p.id === META[s.id].hero) ?? products[0]
    return { ...s, meta: META[s.id], listed, related, hero }
  })

/* --------------------------------- pieces --------------------------------- */

function SafeImg({ src, alt, className, fallback }: { src: string; alt: string; className?: string; fallback?: React.ReactNode }) {
  const [failed, setFailed] = useState(false)
  const ref = useRef<HTMLImageElement>(null)
  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth === 0) setFailed(true)
  }, [])
  if (failed) return <>{fallback ?? null}</>
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} src={encodeURI(src)} alt={alt} loading="lazy" onError={() => setFailed(true)} className={className} />
}

function Tile({ item, index }: { item: (typeof ITEMS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const Icon = item.meta.icon

  // cursor spotlight
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${e.clientX - r.left}px`)
    el.style.setProperty("--my", `${e.clientY - r.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="group relative h-full rounded-2xl border border-[#2a2a36] bg-[#121218]/90 p-5 sm:p-7 overflow-hidden transition-all duration-500 hover:border-[#f5b800]/55 hover:shadow-[0_24px_60px_-28px_rgba(245,184,0,0.55)]"
    >
      {/* spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(245,184,0,0.13), transparent 60%)" }}
      />
      {/* top edge light */}
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#f5b800]/60 to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

      {/* showcase product */}
      {item.hero && (
        <Link
          href={`/products/${item.hero.brandId}/${item.hero.id}`}
          aria-label={item.hero.name}
          className="absolute right-4 top-4 lg:right-6 lg:top-6 w-20 h-20 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-2xl bg-white shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] rotate-3 group-hover:rotate-0 group-hover:scale-105 transition-transform duration-500 overflow-hidden"
        >
          <SafeImg src={item.hero.image} alt={item.hero.name} className="w-full h-full object-contain p-2 lg:p-3.5" />
          <span className="absolute bottom-0 inset-x-0 bg-[#0a0a0f]/85 text-[9px] sm:text-[10px] text-[#f0f0f5] px-2 py-1 truncate opacity-0 group-hover:opacity-100 transition-opacity">
            {item.hero.name}
          </span>
        </Link>
      )}

      <div className="relative flex flex-col h-full">
        <div className="pr-24 lg:pr-36 xl:pr-40">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-xl bg-[#f5b800]/10 border border-[#f5b800]/30 text-[#f5b800] flex items-center justify-center group-hover:bg-[#f5b800] group-hover:text-[#0a0a0f] group-hover:shadow-[0_0_24px_rgba(245,184,0,0.55)] transition-all duration-300">
              <Icon className="w-6 h-6" />
            </span>
            <span className="text-xs tracking-[0.25em] text-[#f5b800]/60">0{index + 1}</span>
          </div>
          <h3 className="mt-5 text-xl sm:text-2xl font-bold text-[#f0f0f5] leading-tight group-hover:text-[#f5b800] transition-colors">
            {item.title}
          </h3>
          <p className="mt-2 text-sm text-[#888899] leading-relaxed">{item.description}</p>
        </div>

        <ul className="mt-5 space-y-2">
          {item.meta.points.map((p) => (
            <li key={p} className="flex items-center gap-1.5 text-sm text-[#c8c8d4]">
              <Check className="w-4 h-4 text-[#f5b800]" /> {p}
            </li>
          ))}
        </ul>

        {/* <div className="mt-auto pt-6">
          <div className="pt-5 border-t border-[#2a2a36] flex flex-wrap items-center gap-2">
            {item.listed.map((b) => (
              <Link
                key={b.id}
                href={`/products/${b.id}`}
                title={`${b.name} products`}
                className="h-10 w-24 rounded-md bg-white flex items-center justify-center px-2 hover:scale-105 hover:shadow-[0_0_0_2px_rgba(245,184,0,0.7)] transition-all"
              > */}
                {/* <SafeImg
                  src={b.logo}
                  alt={b.name}
                  className="max-h-[65%] max-w-[90%] object-contain"
                  fallback={<span className="text-[10px] font-bold text-[#0a0a0f] text-center leading-tight">{b.name}</span>}
                /> */}
              {/* </Link>
            ))}
            {item.related.map((n) => (
              <span key={n} className="px-2.5 py-1 text-xs rounded-md border border-[#2a2a36] text-[#888899]">
                {n}
              </span>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  )
}

/** Desktop-only spine between the two columns: hub + connector lines to each tile. */
function Spine() {
  const [failed, setFailed] = useState(false)
  return (
    <div aria-hidden className="hidden lg:block relative lg:col-start-2 lg:row-start-1 lg:row-span-2">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ss-v" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f5b800" stopOpacity="0" />
            <stop offset="0.5" stopColor="#f5b800" stopOpacity="0.55" />
            <stop offset="1" stopColor="#f5b800" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="50" y1="4" x2="50" y2="96" stroke="url(#ss-v)" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
        {[25, 75].map((y) => (
          <g key={y}>
            <path d={`M50 50 C 50 ${y}, 50 ${y}, 0 ${y}`} fill="none" stroke="#f5b800" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" className="ss-flow" />
            <path d={`M50 50 C 50 ${y}, 50 ${y}, 100 ${y}`} fill="none" stroke="#f5b800" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" className="ss-flow" />
          </g>
        ))}
      </svg>
      {[25, 75].flatMap((y) => [0, 100].map((x) => (
        <span
          key={`${x}-${y}`}
          className="absolute w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5b800] shadow-[0_0_12px_#f5b800]"
          style={{ left: `${x}%`, top: `${y}%` }}
        />
      )))}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="relative w-28 h-28 rounded-full bg-[#0a0a0f] border border-[#f5b800]/60 flex items-center justify-center ss-pulse">
          <div className="absolute -inset-3 rounded-full border border-dashed border-[#f5b800]/25 ss-spin" />
          {failed ? (
            <span className="text-[#f5b800] font-bold tracking-wider">WEDIST</span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/images/wedist-logo.png"
              alt=""
              style={{ width: "76%", height: "auto", maxHeight: "62%", objectFit: "contain" }}
              onError={() => setFailed(true)}
            />
          )}
        </div>
        <span className="mt-4 text-[10px] tracking-[0.3em] text-[#f5b800]">ONE PARTNER</span>
      </div>
    </div>
  )
}

/* --------------------------------- section -------------------------------- */

// desktop grid placement for tiles 1-4 (static class names so Tailwind generates them)
const PLACE = [
  "lg:col-start-1 lg:row-start-1",
  "lg:col-start-3 lg:row-start-1",
  "lg:col-start-1 lg:row-start-2",
  "lg:col-start-3 lg:row-start-2",
]

export function SolutionsShowcase() {
  return (
    <section className="relative py-16 md:py-28 bg-[#050508] overflow-hidden" aria-labelledby="solutions-showcase-heading">
      <div className="absolute inset-0 hex-pattern opacity-20" />
      <div className="absolute inset-0 circuit-pattern opacity-10" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#f5b800]/[0.07] rounded-full blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f5b800]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#f5b800]/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="up">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <p className="text-xs tracking-[0.3em] text-[#f5b800]">WHAT WE DELIVER</p>
            <h2 id="solutions-showcase-heading" className="mt-4 text-3xl md:text-5xl font-bold text-[#f0f0f5] leading-tight text-balance">
              Solutions engineered <span className="text-[#f5b800] text-glow">end to end</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-[#888899] leading-relaxed text-balance">
              Surveillance, access control, networking and storage from one distributor - specified to work together
              from day one.
            </p>
          </div>
        </ScrollReveal>

        {/* natural order on mobile/tablet; on desktop tiles sit left/right of the hub spine */}
        <div className="grid md:grid-cols-2 lg:grid-cols-[1fr_10rem_1fr] lg:grid-rows-2 gap-4 md:gap-5 lg:gap-x-0 lg:gap-y-5">
          {ITEMS.map((item, i) => (
            <div key={item.id} className={`h-full ${PLACE[i] ?? ""}`}>
              <ScrollReveal animation={i % 2 === 0 ? "left" : "right"}>
                <CyberCard className="h-full">
                  <Tile item={item} index={i} />
                </CyberCard>
              </ScrollReveal>
            </div>
          ))}
          <Spine />
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/solutions"
            className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#f5b800] text-[#0a0a0f] font-semibold hover:shadow-[0_0_30px_rgba(245,184,0,0.5)] transition-all"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 inline-flex items-center gap-2">
              Explore all solutions <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link
            href="/storagecalc"
            className="inline-flex items-center justify-center gap-1.5 text-sm text-center text-[#888899] hover:text-[#f5b800] transition-colors"
          >
            Sizing CCTV storage? Try the DSA Report Generator <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes ss-flow { to { stroke-dashoffset: -14 } }
        @keyframes ss-spin { to { transform: rotate(360deg) } }
        @keyframes ss-pulse { 0%,100% { box-shadow: 0 0 30px rgba(245,184,0,.35) } 50% { box-shadow: 0 0 55px rgba(245,184,0,.6) } }
        .ss-flow { animation: ss-flow 2.4s linear infinite }
        .ss-spin { animation: ss-spin 30s linear infinite }
        .ss-pulse { animation: ss-pulse 4s ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) { .ss-flow, .ss-spin, .ss-pulse { animation: none } }
      `}</style>
    </section>
  )
}