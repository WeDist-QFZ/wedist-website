"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Zap } from "lucide-react"
import Image from "next/image"
import { CyberParticles } from "./cyber-particles"
import { GlitchText } from "./glitch-text"
import { AnimatedCounter } from "./animated-counter"
import { MatrixRain } from "./matrix-rain"
import { FloatingElements } from "./floating-elements"
import { AnimatedGrid } from "./animated-grid"
import { useParallax } from "@/hooks/use-scroll-animation"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const parallaxOffset = useParallax(0.3)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden cyber-grid">
      {/* Background layers */}
      <AnimatedGrid />
      <MatrixRain />
      <FloatingElements count={6} />
      <CyberParticles count={40} />

      {/* Animated blobs */}
      <div className="absolute inset-0" style={{ transform: `translateY(${parallaxOffset}px)` }}>
        <div className="absolute top-1/4 left-1/4 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-[#f5b800]/10 rounded-full blur-3xl animate-float morph-bg" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-[#f5b800]/5 rounded-full blur-3xl animate-float-slow animate-float-delay-1 morph-bg" />
        <div className="absolute top-1/2 right-1/3 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#f5b800]/8 rounded-full blur-3xl animate-float-reverse animate-float-delay-2 morph-bg" />
        <div className="absolute bottom-1/3 left-1/3 w-[250px] md:w-[450px] h-[250px] md:h-[450px] bg-[#f5b800]/6 rounded-full blur-3xl animate-float animate-float-delay-3 morph-bg" />

        <div className="absolute inset-0 hex-pattern opacity-40" />
        <div className="absolute inset-0 circuit-pattern opacity-30" />

        <div className="absolute top-10 md:top-20 left-5 md:left-10 w-40 md:w-80 h-40 md:h-80 border-l-2 border-t-2 border-[#f5b800]/30 animate-pulse" />
        <div className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-40 md:w-80 h-40 md:h-80 border-r-2 border-b-2 border-[#f5b800]/30 animate-pulse" />
        <div className="absolute top-20 md:top-40 right-10 md:right-20 w-32 md:w-60 h-32 md:h-60 border border-[#f5b800]/20 rotate-45 animate-float-slow hidden sm:block" />
        <div className="absolute bottom-20 md:bottom-40 left-10 md:left-20 w-24 md:w-48 h-24 md:h-48 border border-[#f5b800]/20 rotate-12 animate-float hidden sm:block" />
      </div>

      {/* Scan effects */}
      <div className="absolute inset-0 scanlines pointer-events-none" />
      <div className="absolute inset-0 horizontal-scan pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24">
        <div className="text-center">

          {/* Logo */}
          <div
            className={`mb-6 md:mb-10 transition-all duration-1000 ${
              mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <Image
              src="/images/wedist-logo-cut.png"
              alt="WeDist Logo"
              width={220}
              height={140}
              className="mx-auto w-[160px] md:w-[220px] h-auto drop-shadow-[0_0_30px_rgba(245,184,0,0.5)]"
            />
          </div>

          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-[#f5b800]/10 border border-[#f5b800]/40 rounded-full mb-6 md:mb-10 transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Zap className="w-4 h-4 md:w-5 md:h-5 text-[#f5b800] animate-pulse" />
            <span className="text-xs md:text-base font-medium text-[#f5b800] tracking-[0.1em] md:tracking-[0.2em]">
              LEADING TECH DISTRIBUTION PARTNER
            </span>
            <Zap className="w-4 h-4 md:w-5 md:h-5 text-[#f5b800] animate-pulse" />
          </div>

          {/* HERO HEADING (FIXED SIZE) */}
          <h1
            className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-6 md:mb-8 transition-all duration-700 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-[#f0f0f5]">We </span>
            <GlitchText
              text="Empower"
              className="text-[#f5b800] text-glow"
              autoGlitch
              glitchInterval={6000}
            />
            <span className="text-[#f0f0f5]">.</span>

            <br />

            <span className="text-[#f0f0f5]">We </span>
            <GlitchText
              text="Deliver"
              className="text-[#f5b800] text-glow"
              autoGlitch
              glitchInterval={8000}
            />
            <span className="text-[#f0f0f5]">.</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#888899] max-w-4xl mx-auto mb-8 md:mb-14 leading-relaxed px-2 transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Your trusted technology distribution partner, connecting businesses with{" "}
            <span className="text-[#f5b800] text-glow-sm">cutting-edge solutions</span>{" "}
            from world-leading brands.
          </p>

          {/* CTA */}
          <div
            className={`flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4 transition-all duration-700 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href="/products"
              className="relative overflow-hidden group px-8 md:px-12 py-4 md:py-5 text-base md:text-xl font-semibold rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2 md:gap-3 bg-[#f5b800] text-[#0a0a0f] hover:shadow-[0_0_30px_rgba(245,184,0,0.5)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-2 md:gap-3">
                Explore Products
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </a>

            <a
              href="/solutions"
              className="relative px-8 md:px-12 py-4 md:py-5 text-base md:text-xl font-semibold text-[#f5b800] border-2 border-[#f5b800]/50 rounded-lg bg-transparent hover:bg-[#f5b800]/10 transition-all duration-300 overflow-hidden group inline-flex items-center justify-center"
            >
              <span className="relative z-10 group-hover:text-glow-sm transition-all">
                View Solutions
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f5b800]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-16 md:mt-28 pt-8 md:pt-14 border-t border-[#2a2a36] transition-all duration-700 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {[
              { value: 500, suffix: "+", label: "Enterprise Clients" },
              { value: 50, suffix: "+", label: "Brand Partners" },
              { value: 15, suffix: "+", label: "Years Experience" },
              { value: 24, suffix: "/7", label: "Technical Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#f5b800] mb-2 md:mb-3 group-hover:text-glow transition-all">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={2000 + index * 200}
                  />
                </p>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#888899]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  )
}