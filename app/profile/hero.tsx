"use client"

import { useState } from "react"
import { ArrowDown, ArrowRight, Building2 } from "lucide-react"

import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberParticles } from "@/components/cyber-particles"
import { GlitchText } from "@/components/glitch-text"
import { AnimatedGrid } from "@/components/animated-grid"
import { FloatingElements } from "@/components/floating-elements"

import { BRANDS, COMPANY, PROJECTS, VERTICALS } from "./profile-data"
import { CountUp, LogoPlate } from "./ui"

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
  const stats = [
    { to: BRANDS.length, label: "Brand partners" },
    { to: VERTICALS.length, label: "Solution verticals" },
    { to: PROJECTS.length, label: "Showcase projects" },
  ]

  return (
    <section id="intro" className="relative overflow-hidden cyber-grid pt-10 pb-16 md:pt-16 md:pb-24">
      <AnimatedGrid />
      <CyberParticles count={25} />
      <FloatingElements count={5} />
      <div className="absolute top-1/4 left-[10%] w-[520px] h-[520px] bg-[#f5b800]/10 rounded-full blur-3xl animate-float" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-6 items-center">
        <ScrollReveal animation="up">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[#f5b800]/10 border border-[#f5b800]/30 rounded-full mb-8">
              <Building2 className="w-4 h-4 text-[#f5b800]" />
              <span className="text-xs md:text-sm text-[#f5b800] tracking-[0.25em]">COMPANY PROFILE</span>
            </div>

            <h1 className="text-[2.6rem] sm:text-6xl xl:text-[4.25rem] font-bold text-[#f0f0f5] leading-[1.04] text-balance">
              Global technology.{" "}
              <GlitchText text="Delivered" className="text-[#f5b800] text-glow" autoGlitch glitchInterval={6000} />{" "}
              for Qatar.
            </h1>

            <p className="mt-7 text-lg md:text-xl text-[#888899] max-w-xl mx-auto lg:mx-0 leading-relaxed">
              WeDist is the distribution partner behind Qatar&apos;s security, networking and storage projects -
              bringing {BRANDS.length} global brands to the integrators and resellers who build them.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#about"
                className="relative overflow-hidden group px-8 py-4 text-base md:text-lg font-semibold rounded-lg inline-flex items-center justify-center gap-2 bg-[#f5b800] text-[#0a0a0f] hover:shadow-[0_0_30px_rgba(245,184,0,0.5)] transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-2">
                  Start the tour <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                </span>
              </a>
              <a
                href="#plan"
                className="group px-8 py-4 text-base md:text-lg font-semibold text-[#f5b800] border-2 border-[#f5b800]/50 rounded-lg hover:bg-[#f5b800]/10 transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                Plan your project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        <Orbit />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 md:mt-20">
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-[#2a2a36] bg-[#2a2a36]">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#0d0d13]/95 px-3 sm:px-6 py-7 text-center group">
              <p className="text-4xl md:text-5xl font-bold text-[#f5b800] text-glow">
                <CountUp to={s.to} />
              </p>
              <p className="mt-2 text-xs md:text-sm text-[#888899] tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
