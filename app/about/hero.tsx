"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Building2 } from "lucide-react"

import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberParticles } from "@/components/cyber-particles"
import { GlitchText } from "@/components/glitch-text"
import { AnimatedGrid } from "@/components/animated-grid"
import { FloatingElements } from "@/components/floating-elements"

import { BRANDS, COMPANY } from "./profile-data"
import { CornerBrackets, LogoPlate, btnPrimary, btnSecondary, wrap } from "./ui"

const OUTER_R = 44 // % of the orbit box

function polar(r: number, deg: number) {
  const a = (deg * Math.PI) / 180
  return { left: `${50 + r * Math.cos(a)}%`, top: `${50 + r * Math.sin(a)}%` }
}

function Orbit() {
  const [logoFailed, setLogoFailed] = useState(false)
  const n = BRANDS.length

  return (
    <div className="group relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[460px] lg:max-w-[540px] select-none">
      {/* glow + rings */}
      <div className="absolute inset-[18%] rounded-full bg-[#f5b800]/10 blur-3xl" />
      <div className="absolute inset-[6%] rounded-full border border-dashed border-[#f5b800]/15" />
      <div className="absolute inset-[25%] rounded-full border border-[#f5b800]/20" />
      <div className="absolute inset-[30%] rounded-full border border-[#f5b800]/10" />

      {/* outer ring: brands */}
      <div className="absolute inset-0 wd-spin group-hover:[animation-play-state:paused]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" aria-hidden>
          {BRANDS.map((b, i) => {
            const a = ((360 / n) * i - 90) * (Math.PI / 180)
            return (
              <line
                key={b.slug}
                x1={50}
                y1={50}
                x2={50 + OUTER_R * Math.cos(a)}
                y2={50 + OUTER_R * Math.sin(a)}
                stroke="#f5b800"
                strokeOpacity={0.18}
                strokeWidth={0.25}
                strokeDasharray="1 1.5"
                className="wd-dash"
              />
            )
          })}
        </svg>
        {BRANDS.map((b, i) => (
          <a
            key={b.slug}
            href={`/products/${b.slug}`}
            title={b.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={polar(OUTER_R, (360 / n) * i - 90)}
          >
            <div className="wd-spin-rev group-hover:[animation-play-state:paused]">
              <LogoPlate
                src={b.logo}
                name={b.name}
                className="w-[58px] h-[34px] sm:w-[78px] sm:h-[44px] lg:w-[92px] lg:h-[50px] shadow-[0_0_0_1px_rgba(245,184,0,0.25),0_8px_24px_-8px_rgba(0,0,0,0.8)] hover:scale-110 transition-transform duration-300 [&_span]:text-[8px] sm:[&_span]:text-[10px]"
                imgClassName="max-h-[70%] max-w-[85%]"
              />
            </div>
          </a>
        ))}
      </div>

      {/* core - geometry set inline so no global style can stretch it */}
      <div
        className="rounded-full bg-[#0a0a0f] border border-[#f5b800]/60 flex items-center justify-center overflow-hidden wd-pulse"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "34%",
          height: "34%",
          transform: "translate(-50%, -50%)",
          borderRadius: "9999px",
        }}
      >
        {logoFailed ? (
          <span className="text-[#f5b800] font-bold text-sm sm:text-lg tracking-wider">WEDIST</span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={COMPANY.logo}
            alt="WeDist"
            style={{ width: "74%", height: "auto", maxHeight: "60%", objectFit: "contain", display: "block" }}
            onError={() => setLogoFailed(true)}
          />
        )}
      </div>

      <style>{`
        @keyframes wd-spin { to { transform: rotate(360deg) } }
        @keyframes wd-spin-rev { to { transform: rotate(-360deg) } }
        @keyframes wd-dash { to { stroke-dashoffset: -10 } }
        @keyframes wd-pulse { 0%,100% { box-shadow: 0 0 40px rgba(245,184,0,.45), inset 0 0 24px rgba(245,184,0,.15) } 50% { box-shadow: 0 0 70px rgba(245,184,0,.7), inset 0 0 30px rgba(245,184,0,.25) } }
        .wd-spin { animation: wd-spin 70s linear infinite }
        .wd-spin-rev { animation: wd-spin-rev 70s linear infinite }
        .wd-dash { animation: wd-dash 3s linear infinite }
        .wd-pulse { animation: wd-pulse 4s ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) {
          .wd-spin, .wd-spin-rev, .wd-dash, .wd-pulse { animation: none }
        }
      `}</style>
    </div>
  )
}

export function ProfileHero() {
  return (
    <section id="intro" className="py-9 md:py-16 cyber-grid relative overflow-hidden">
      <AnimatedGrid />
      <CyberParticles count={25} />
      <FloatingElements count={5} />
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[169px] md:w-[338px] h-[169px] md:h-[338px] bg-[#f5b800]/10 rounded-full blur-xl animate-float morph-bg" />
        <div className="absolute bottom-1/3 right-1/4 w-[141px] md:w-[281px] h-[141px] md:h-[281px] bg-[#f5b800]/5 rounded-full blur-xl animate-float-slow morph-bg" />
      </div>
      <CornerBrackets />

      <div className={`${wrap} relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
        <ScrollReveal animation="up">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 bg-[#f5b800]/10 border border-[#f5b800]/30 rounded-full mb-3 md:mb-4">
              <Building2 className="w-3 h-3 md:w-4 md:h-4 text-[#f5b800]" />
              <span className="text-xs md:text-sm font-medium text-[#f5b800] tracking-[0.1em] md:tracking-[0.2em]">
                ABOUT WEDIST
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#f0f0f5] mb-3 md:mb-5 leading-tight">
              Global technology,{" "}
              <GlitchText text="delivered" className="text-[#f5b800] text-glow" autoGlitch glitchInterval={7000} />{" "}
              for Qatar
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-[#888899] leading-relaxed max-w-2xl mx-auto lg:mx-0">
              WeDist is a technology distributor based in Qatar Free Zones. We bring leading global brands in video
              surveillance, access control, networking and data storage to the integrators and resellers who build
              Qatar&apos;s projects.
            </p>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <Link href="/contact" className={btnPrimary}>
                Get in Touch <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
              <a href="#plan" className={btnSecondary}>
                Plan your project
              </a>
            </div>
          </div>
        </ScrollReveal>

        <Orbit />
      </div>
      <div className="absolute inset-0 horizontal-scan pointer-events-none" />
    </section>
  )
}
