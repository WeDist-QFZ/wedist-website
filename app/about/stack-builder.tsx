"use client"

import { useMemo, useState } from "react"
import type React from "react"

import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberParticles } from "@/components/cyber-particles"
import Link from "next/link"
import { Calculator, Check, ClipboardList, Mail, MessageCircle, Sparkles } from "lucide-react"

import { COMPANY, PROJECT_TYPES, VERTICALS, brandsIn, type VerticalId } from "./profile-data"
import { SiteHeading, VERTICAL_ICON, cardCls, wrap } from "./ui"

const inputCls =
  "w-full h-11 rounded-lg bg-[#0d0d13] border border-[#2a2a36] text-[#f0f0f5] px-3 text-sm placeholder:text-[#555566] focus:outline-none focus:border-[#f5b800]/60"

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="flex items-center gap-3 text-sm font-semibold text-[#f0f0f5]">
        <span className="w-7 h-7 rounded-full bg-[#f5b800]/10 border border-[#f5b800]/40 text-[#f5b800] text-xs flex items-center justify-center">
          {n}
        </span>
        {title}
      </p>
      <div className="mt-4">{children}</div>
    </div>
  )
}

export function StackBuilder() {
  const [verticals, setVerticals] = useState<VerticalId[]>([])
  const [brandSel, setBrandSel] = useState<string[]>([])
  const [type, setType] = useState("")
  const [project, setProject] = useState("")
  const [notes, setNotes] = useState("")

  const toggleV = (id: VerticalId) => {
    const removing = verticals.includes(id)
    setVerticals((p) => (removing ? p.filter((x) => x !== id) : [...p, id]))
    if (removing) {
      // drop brand picks that belonged to the vertical being removed
      const drop = new Set(brandsIn(id).map((b) => b.slug))
      setBrandSel((p) => p.filter((slug) => !drop.has(slug)))
    }
  }
  const toggleB = (slug: string) => setBrandSel((p) => (p.includes(slug) ? p.filter((x) => x !== slug) : [...p, slug]))

  const availableBrands = verticals.flatMap((v) => brandsIn(v))
  const pickedBrands = availableBrands.filter((b) => brandSel.includes(b.slug))
  const ready = verticals.length > 0

  const message = useMemo(() => {
    const lines = ["Hello WeDist, I'd like support for a project."]
    if (project.trim()) lines.push(`Project: ${project.trim()}`)
    if (type) lines.push(`Project type: ${type}`)
    if (verticals.length)
      lines.push(`Needs: ${VERTICALS.filter((v) => verticals.includes(v.id)).map((v) => v.name).join(", ")}`)
    if (pickedBrands.length) lines.push(`Preferred brands: ${pickedBrands.map((b) => b.name).join(", ")}`)
    if (notes.trim()) lines.push(`Notes: ${notes.trim()}`)
    lines.push("(Sent from the WeDist company profile)")
    return lines.join("\n")
  }, [project, type, verticals, pickedBrands, notes])

  const wa = `https://api.whatsapp.com/send?phone=${COMPANY.whatsappNumber}&text=${encodeURIComponent(message)}`
  const mail = `mailto:${COMPANY.email}?subject=${encodeURIComponent(
    `Project enquiry${project.trim() ? ` - ${project.trim()}` : ""}`,
  )}&body=${encodeURIComponent(message)}`

  return (
    <section id="plan" className="py-12 md:py-20 bg-[#050508] relative overflow-hidden scroll-mt-24">
      <CyberParticles count={12} />
      <div className="absolute inset-0 hex-pattern opacity-30" />
      <div className="absolute inset-0 circuit-pattern opacity-20" />
      <div className="absolute bottom-1/4 right-6 w-28 md:w-56 h-28 md:h-56 bg-[#f5b800]/5 rounded-full blur-xl animate-float-reverse" />
      <div className={`${wrap} relative z-10`}>
        <ScrollReveal animation="up">
          <SiteHeading
            icon={ClipboardList}
            badge="PLAN YOUR PROJECT"
            title={
              <>
                Tell us what you&apos;re <span className="text-[#f5b800] text-glow">building</span>
              </>
            }
            text="Three quick steps and your enquiry is ready to send - our team replies with a design and a quotation."
          />
        </ScrollReveal>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-4 md:gap-6 items-start">
          <div className={`${cardCls} p-6 md:p-8 space-y-9`}>
            <Step n={1} title="What does the project need?">
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                {VERTICALS.map((v) => {
                  const Icon = VERTICAL_ICON[v.id]
                  const on = verticals.includes(v.id)
                  return (
                    <button
                      key={v.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleV(v.id)}
                      className={`relative text-left rounded-md border p-4 transition-all duration-300 ${
                        on
                          ? "border-[#f5b800] bg-[#f5b800]/[0.09] shadow-[0_0_26px_-8px_rgba(245,184,0,0.6)]"
                          : "border-[#2a2a36] bg-[#0d0d13] hover:border-[#f5b800]/40"
                      }`}
                    >
                      <span
                        className={`absolute top-3 right-3 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                          on ? "bg-[#f5b800] border-[#f5b800] text-[#0a0a0f]" : "border-[#3a3a48]"
                        }`}
                      >
                        {on && <Check className="w-3.5 h-3.5" />}
                      </span>
                      <Icon className={`w-6 h-6 ${on ? "text-[#f5b800]" : "text-[#888899]"}`} />
                      <span className="mt-3 block text-sm font-semibold text-[#f0f0f5] pr-6">{v.name}</span>
                    </button>
                  )
                })}
              </div>
            </Step>

            <Step n={2} title="Preferred brands (optional)">
              {availableBrands.length ? (
                <div className="flex flex-wrap gap-2">
                  {availableBrands.map((b) => {
                    const on = brandSel.includes(b.slug)
                    return (
                      <button
                        key={b.slug}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggleB(b.slug)}
                        className={`px-3.5 py-2 rounded-lg text-sm border transition-all ${
                          on
                            ? "bg-[#f5b800] text-[#0a0a0f] border-[#f5b800] font-semibold"
                            : "bg-[#0d0d13] text-[#c8c8d4] border-[#2a2a36] hover:border-[#f5b800]/40"
                        }`}
                      >
                        {b.name}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <p className="text-sm text-[#666677]">Choose at least one vertical to see its brands.</p>
              )}
            </Step>

            <Step n={3} title="About the project">
              <div className="flex flex-wrap gap-2">
                {PROJECT_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={type === t}
                    onClick={() => setType(type === t ? "" : t)}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                      type === t
                        ? "bg-[#f5b800]/15 text-[#f5b800] border-[#f5b800]/60"
                        : "text-[#888899] border-[#2a2a36] hover:text-[#f0f0f5]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <input
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  placeholder="Project name (optional)"
                  className={inputCls}
                  aria-label="Project name"
                />
                <input
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. 250 cameras, 120 days, 40 doors"
                  className={inputCls}
                  aria-label="Project notes"
                />
              </div>
            </Step>
          </div>

          {/* summary */}
          <div className={`${cardCls} p-6 md:p-8 lg:sticky lg:top-28 border-[#f5b800]/30 relative overflow-hidden`}>
            <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[#f5b800]/10 blur-3xl" />
            <p className="relative flex items-center gap-2 text-sm font-semibold text-[#f5b800]">
              <Sparkles className="w-4 h-4" /> Your enquiry
            </p>

            <div className="relative mt-5 space-y-4">
              <div>
                <p className="text-xs text-[#888899]">Verticals</p>
                <div className="mt-2 flex flex-wrap gap-2 min-h-8">
                  {verticals.length ? (
                    VERTICALS.filter((v) => verticals.includes(v.id)).map((v) => {
                      const Icon = VERTICAL_ICON[v.id]
                      return (
                        <span key={v.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#f5b800]/10 text-[#f5b800] text-xs">
                          <Icon className="w-3.5 h-3.5" /> {v.short}
                        </span>
                      )
                    })
                  ) : (
                    <span className="text-sm text-[#555566]">Nothing selected yet</span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs text-[#888899]">Brands</p>
                <p className="mt-1 text-sm text-[#f0f0f5]">
                  {pickedBrands.length ? pickedBrands.map((b) => b.name).join(", ") : <span className="text-[#555566]">Open to recommendation</span>}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#888899]">Project</p>
                <p className="mt-1 text-sm text-[#f0f0f5]">
                  {[project.trim(), type].filter(Boolean).join(" · ") || <span className="text-[#555566]">-</span>}
                </p>
              </div>
            </div>

            <div className="relative mt-7 grid gap-3">
              <a
                href={ready ? wa : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!ready}
                onClick={(e) => !ready && e.preventDefault()}
                className={`px-6 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2 transition-all ${
                  ready
                    ? "bg-[#f5b800] text-[#0a0a0f] hover:shadow-[0_0_30px_rgba(245,184,0,0.5)]"
                    : "bg-[#2a2a36] text-[#666677] cursor-not-allowed"
                }`}
              >
                <MessageCircle className="w-5 h-5" /> Send on WhatsApp
              </a>
              <a
                href={ready ? mail : undefined}
                aria-disabled={!ready}
                onClick={(e) => !ready && e.preventDefault()}
                className={`px-6 py-3.5 rounded-lg font-semibold inline-flex items-center justify-center gap-2 border-2 transition-all ${
                  ready
                    ? "border-[#f5b800]/50 text-[#f5b800] hover:bg-[#f5b800]/10"
                    : "border-[#2a2a36] text-[#555566] cursor-not-allowed"
                }`}
              >
                <Mail className="w-5 h-5" /> Send by email
              </a>
              {!ready && <p className="text-xs text-[#666677] text-center">Select at least one vertical to continue.</p>}
            </div>

            {verticals.includes("surveillance") && (
              <Link
                href="/storagecalc"
                className="relative mt-5 flex items-center gap-3 p-3 rounded-lg border border-[#2a2a36] bg-[#0d0d13] hover:border-[#f5b800]/50 transition-colors"
              >
                <Calculator className="w-5 h-5 text-[#f5b800] shrink-0" />
                <span className="text-xs text-[#c8c8d4]">
                  Recording cameras? Size the storage and export your DSA report first.
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
