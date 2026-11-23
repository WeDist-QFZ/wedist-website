"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { VERTICALS, brandsIn, productsIn, type VerticalId } from "./profile-data"
import { LogoPlate, ProductImage, SectionHeading, VERTICAL_ICON, cardCls } from "./ui"

const SHOW = 6

export function SolutionExplorer() {
  const [active, setActive] = useState<VerticalId>(VERTICALS[0]?.id ?? "surveillance")
  const v = VERTICALS.find((x) => x.id === active)!
  const brands = brandsIn(active)
  const products = productsIn(active)
  const Icon = VERTICAL_ICON[active]

  return (
    <section id="solutions" className="relative py-20 md:py-28 bg-[#0a0a0f] overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 circuit-pattern opacity-15" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          chapter="03"
          kicker="SOLUTION EXPLORER"
          title={
            <>
              Four verticals. <span className="text-[#f5b800]">Explore what&apos;s inside.</span>
            </>
          }
          text="Pick a vertical to see the brands we carry for it and a selection of our most-requested products."
        />

        <div className="grid lg:grid-cols-[300px_1fr] gap-6">
          {/* tabs */}
          <div role="tablist" aria-label="Solution verticals" className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
            {VERTICALS.map((x, i) => {
              const XI = VERTICAL_ICON[x.id]
              const on = x.id === active
              return (
                <button
                  key={x.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(x.id)}
                  className={`shrink-0 lg:w-full text-left rounded-xl border p-4 transition-all duration-300 flex items-center gap-4 ${
                    on
                      ? "border-[#f5b800]/70 bg-[#f5b800]/[0.08] shadow-[0_0_30px_-8px_rgba(245,184,0,0.5)]"
                      : "border-[#2a2a36] bg-[#121218]/80 hover:border-[#f5b800]/40"
                  }`}
                >
                  <span
                    className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      on ? "bg-[#f5b800] text-[#0a0a0f]" : "bg-[#f5b800]/10 text-[#f5b800] border border-[#f5b800]/30"
                    }`}
                  >
                    <XI className="w-5 h-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="hidden sm:block text-[10px] tracking-[0.2em] text-[#888899]">0{i + 1}</span>
                    <span className={`block font-semibold whitespace-nowrap lg:whitespace-normal ${on ? "text-[#f0f0f5]" : "text-[#c8c8d4]"}`}>
                      {x.name}
                    </span>
                    <span className="block text-xs text-[#888899] mt-0.5">
                      {brandsIn(x.id).map((b) => b.name).join(" · ")}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* panel */}
          <div key={active} role="tabpanel" className={`${cardCls} p-6 md:p-8 wd-fade relative overflow-hidden`}>
            <Icon className="absolute -right-6 -top-6 w-48 h-48 text-[#f5b800]/[0.04]" />
            <div className="relative grid xl:grid-cols-[1fr_auto] gap-6 items-start">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#f0f0f5]">{v.name}</h3>
                <p className="mt-3 text-[#888899] leading-relaxed max-w-2xl">{v.description}</p>
                <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {v.outcomes.map((o) => (
                    <li key={o} className="flex items-center gap-2 text-sm text-[#c8c8d4]">
                      <Check className="w-4 h-4 text-[#f5b800] shrink-0" /> {o}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex xl:flex-col gap-2 flex-wrap">
                {brands.map((b) => (
                  <Link key={b.slug} href={`/products/${b.slug}`} title={`${b.name} products`} className="hover:scale-105 transition-transform">
                    <LogoPlate src={b.logo} name={b.name} className="w-32 h-14" />
                  </Link>
                ))}
                {v.related.length > 0 && (
                  <p className="text-[11px] text-[#666677] xl:max-w-32 leading-snug self-center">
                    Also: {v.related.join(", ")}
                  </p>
                )}
              </div>
            </div>

            <p className="relative mt-8 mb-3 text-xs tracking-[0.2em] text-[#888899]">POPULAR PRODUCTS</p>
            <div className="relative grid grid-cols-2 xl:grid-cols-3 gap-2.5 sm:gap-3">
              {products.slice(0, SHOW).map((p) => (
                <Link
                  key={`${p.brandId}-${p.id}`}
                  href={`/products/${p.brandId}/${p.id}`}
                  className="group rounded-xl border border-[#2a2a36] bg-[#0d0d13] overflow-hidden hover:border-[#f5b800]/60 hover:-translate-y-1 hover:shadow-[0_14px_40px_-16px_rgba(245,184,0,0.5)] transition-all duration-300 flex flex-col"
                >
                  <div className="h-28 sm:h-40 bg-white">
                    <ProductImage src={p.image} alt={p.name} />
                  </div>
                  <div className="p-3 sm:p-4 flex-1 flex flex-col">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#f5b800]">{p.brandName}</p>
                    <p className="mt-1 text-sm sm:text-base font-semibold text-[#f0f0f5] leading-snug group-hover:text-[#f5b800] transition-colors flex-1">
                      {p.name}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#888899] group-hover:text-[#f5b800] transition-colors">
                      View product & datasheet
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/products"
              className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#f5b800] group"
            >
              Explore the full {v.short.toLowerCase()} range
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
      <style>{`@keyframes wd-fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}.wd-fade{animation:wd-fade .45s ease both}@media (prefers-reduced-motion: reduce){.wd-fade{animation:none}}`}</style>
    </section>
  )
}
