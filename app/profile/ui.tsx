"use client"

/* -------------------------------------------------------------------------- */
/*  Shared building blocks for the company profile                            */
/* -------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from "react"
import type React from "react"
import { Cctv, Fingerprint, HardDrive, Network } from "lucide-react"

import type { VerticalId } from "./profile-data"

export const cardCls = "bg-[#121218]/90 border border-[#2a2a36] rounded-2xl"
export const eyebrow = "text-xs tracking-[0.25em] text-[#f5b800] font-medium"

export const VERTICAL_ICON: Record<VerticalId, React.ComponentType<{ className?: string }>> = {
  surveillance: Cctv,
  access: Fingerprint,
  networking: Network,
  storage: HardDrive,
}

/* ------------------------------- motion utils ------------------------------ */

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const on = () => setReduced(mq.matches)
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])
  return reduced
}

/** true once the element has entered the viewport (fires once). */
export function useInView<T extends Element>(threshold = 0.3) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen, threshold])
  return { ref, seen }
}

/** Number that counts up when it scrolls into view. */
export function CountUp({ to, suffix = "", duration = 1400 }: { to: number; suffix?: string; duration?: number }) {
  const { ref, seen } = useInView<HTMLSpanElement>(0.6)
  const reduced = usePrefersReducedMotion()
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!seen) return
    if (reduced) return setVal(to)
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration)
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, to, duration, reduced])
  return (
    <span ref={ref} className="tabular-nums">
      {val}
      {suffix}
    </span>
  )
}

/* --------------------------------- layout ---------------------------------- */

export function SectionHeading({
  chapter,
  kicker,
  title,
  text,
  center,
}: {
  chapter?: string
  kicker: string
  title: React.ReactNode
  text?: string
  center?: boolean
}) {
  return (
    <div className={`max-w-3xl mb-10 md:mb-14 ${center ? "mx-auto text-center" : ""}`}>
      <p className={`${eyebrow} flex items-center gap-3 ${center ? "justify-center" : ""}`}>
        {chapter && <span className="text-[#f5b800]/50">{chapter}</span>}
        {chapter && <span className="h-px w-8 bg-[#f5b800]/40" />}
        {kicker}
      </p>
      <h2 className="mt-4 text-3xl md:text-5xl font-bold text-[#f0f0f5] leading-tight text-balance">{title}</h2>
      {text && <p className="mt-4 text-base md:text-lg text-[#888899] leading-relaxed text-balance">{text}</p>}
    </div>
  )
}

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

/** Product image with a neutral placeholder if missing. */
export function ProductImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)
  const ref = useRef<HTMLImageElement>(null)
  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth === 0) setFailed(true)
  }, [])
  if (failed)
    return (
      <div className="w-full h-full flex items-center justify-center text-[#666677] text-xs">
        <span className="px-3 text-center">{alt}</span>
      </div>
    )
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={encodeURI(src)}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
    />
  )
}

/* ---------------------------- chapter navigation --------------------------- */

export interface Chapter {
  id: string
  label: string
}

/** Thin progress bar at the top + a dot rail on the right (desktop) to jump between chapters. */
export function ChapterNav({ chapters }: { chapters: Chapter[] }) {
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(chapters[0]?.id)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? h.scrollTop / max : 0)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [chapters])

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#f5b800]/60 via-[#f5b800] to-[#ffd84d] shadow-[0_0_12px_rgba(245,184,0,0.8)]"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <nav
        aria-label="Company profile chapters"
        className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3"
      >
        {chapters.map((c, i) => {
          const on = active === c.id
          return (
            <a key={c.id} href={`#${c.id}`} className="group flex items-center justify-end gap-3" aria-current={on}>
              <span
                className={`text-xs tracking-wider transition-all duration-300 ${
                  on
                    ? "opacity-100 text-[#f5b800]"
                    : "opacity-0 group-hover:opacity-100 text-[#888899] translate-x-2 group-hover:translate-x-0"
                }`}
              >
                {String(i + 1).padStart(2, "0")} {c.label}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  on ? "w-3 h-3 bg-[#f5b800] shadow-[0_0_12px_rgba(245,184,0,0.9)]" : "w-2 h-2 bg-[#3a3a48] group-hover:bg-[#888899]"
                }`}
              />
            </a>
          )
        })}
      </nav>
    </>
  )
}
