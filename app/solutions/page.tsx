"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { solutions } from "@/lib/data"
import { Network, Shield, Server, Camera } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberParticles } from "@/components/cyber-particles"
import { GlitchText } from "@/components/glitch-text"
import { CyberCard } from "@/components/cyber-card"
import { HologramCard } from "@/components/hologram-card"
import { AnimatedGrid } from "@/components/animated-grid"
import { FloatingElements } from "@/components/floating-elements"
import { ContactModal } from "@/components/contact-modal"
const iconMap: Record<string, React.ReactNode> = {
  network: <Network className="w-5 h-5 md:w-7 md:h-7" />,
  shield: <Shield className="w-5 h-5 md:w-7 md:h-7" />,
  server: <Server className="w-5 h-5 md:w-7 md:h-7" />,
  camera: <Camera className="w-5 h-5 md:w-7 md:h-7" />,
}
export default function SolutionsPage() {
  const [contactOpen, setContactOpen] = useState(false)
  const router = useRouter()
  return (
    <div className="min-h-screen bg-[#0a0a0f] page-transition">
      <Header />
      <main className="pt-20 md:pt-28 lg:pt-32">
        {/* HERO SECTION */}
        <section className="py-9 md:py-16 cyber-grid relative overflow-hidden">
          <AnimatedGrid />
          <CyberParticles count={25} />
          <FloatingElements count={5} />
          {/* Background Glow */}
          <div className="absolute inset-0">
            <div
              className="absolute top-1/3 left-1/4 w-[169px] md:w-[338px] h-[169px] md:h-[338px] bg-[#f5b800]/10 rounded-full blur-xl animate-float morph-bg"
            />
            <div
              className="absolute bottom-1/3 right-1/4 w-[141px] md:w-[281px] h-[141px] md:h-[281px] bg-[#f5b800]/5 rounded-full blur-xl animate-float-slow morph-bg"
            />
          </div>
          {/* Decorative Borders */}
          <div className="absolute top-10 left-6 w-32 h-32 border-l-2 border-t-2 border-[#f5b800]/20 hidden md:block" />
          <div className="absolute bottom-10 right-6 w-32 h-32 border-r-2 border-b-2 border-[#f5b800]/20 hidden md:block" />
          <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 relative z-10">
            <ScrollReveal animation="up">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 bg-[#f5b800]/10 border border-[#f5b800]/30 rounded-full mb-3 md:mb-4">
                  <Shield className="w-3 h-3 md:w-4 md:h-4 text-[#f5b800]" />
                  <span className="text-xs md:text-sm font-medium text-[#f5b800] tracking-[0.1em] md:tracking-[0.2em]">
                    INDUSTRY SOLUTIONS
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold text-[#f0f0f5] mb-3 md:mb-4">
                  Our{" "}
                  <GlitchText
                    text="Solutions"
                    className="text-[#f5b800] text-glow"
                    autoGlitch
                    glitchInterval={7000}
                  />
                </h1>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#888899] leading-relaxed px-1">
                  Comprehensive technology solutions tailored for your industry needs.
                  We bring together best-in-class brands to solve your most complex challenges.
                </p>
              </div>
            </ScrollReveal>
          </div>
          <div className="absolute inset-0 horizontal-scan pointer-events-none" />
        </section>
        {/* SOLUTIONS GRID */}
        <section className="py-9 md:py-16 bg-[#050508] relative overflow-hidden">
          <CyberParticles count={15} />
          <div className="absolute inset-0 hex-pattern opacity-30" />
          <div className="absolute inset-0 circuit-pattern opacity-20" />
          {/* Floating Background Elements */}
          <div className="absolute top-1/4 left-6 w-20 md:w-44 h-20 md:h-44 bg-[#f5b800]/5 rounded-full blur-xl animate-float" />
          <div className="absolute bottom-1/4 right-6 w-28 md:w-56 h-28 md:h-56 bg-[#f5b800]/3 rounded-full blur-xl animate-float-reverse" />
          <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              {solutions.map((solution, index) => (
                <ScrollReveal
                  key={solution.id}
                  animation={index % 2 === 0 ? "left" : "right"}
                  delay={index * 100}
                >
                  <CyberCard className="h-full" tiltEffect>
                    <HologramCard>
                      <div className="group relative p-3 md:p-6 bg-[#121218]/80 rounded-md border border-[#2a2a36] hover:border-[#f5b800]/50 transition-all duration-500 overflow-hidden h-full">
                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#f5b800]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        {/* Scan Line */}
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f5b800]/50 to-transparent animate-[scanline-move_2s_linear_infinite]" />
                          </div>
                        </div>
                        <div className="relative z-10">
                          {/* Icon */}
                          <div className="inline-flex p-2 md:p-3 bg-[#f5b800]/10 rounded-md text-[#f5b800] mb-3 md:mb-6 group-hover:bg-[#f5b800]/20 transition-colors glow-yellow">
                            {iconMap[solution.icon]}
                          </div>
                          <h3 className="text-base md:text-xl font-semibold text-[#f0f0f5] mb-2 md:mb-3 group-hover:text-[#f5b800] transition-colors">
                            {solution.title}
                          </h3>
                          <p className="text-xs md:text-sm text-[#888899] mb-3 md:mb-4 leading-relaxed">
                            {solution.description}
                          </p>
                          {/* Brands */}
                          <div className="flex flex-wrap gap-1.5 md:gap-2">
                            {solution.brands.map((brand) => (
                              <span
                                key={brand}
                                className="px-2 md:px-3 py-1 md:py-1.5 bg-[#1a1a24] border border-[#2a2a36] rounded-full text-xs md:text-sm text-[#f5b800] hover:border-[#f5b800]/50 transition-colors"
                              >
                                {brand}
                              </span>
                            ))}
                          </div>
                        </div>
                        {/* Corner Decorations */}
                        <div className="absolute -bottom-10 md:-bottom-12 -right-10 md:-right-12 w-24 md:w-32 h-24 md:h-32 border border-[#f5b800]/10 rounded-full group-hover:border-[#f5b800]/30 transition-colors" />
                        <div className="absolute -bottom-6 md:-bottom-8 -right-6 md:-right-8 w-16 md:w-24 h-16 md:h-24 border border-[#f5b800]/10 rounded-full group-hover:border-[#f5b800]/20 transition-colors" />
                      </div>
                    </HologramCard>
                  </CyberCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
        {/* CTA SECTION */}
        <section className="py-9 md:py-16 bg-[#0a0a0f] cyber-grid relative overflow-hidden">
          <CyberParticles count={15} />
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[#f5b800]/5 rounded-full blur-3xl" />
          </div>
          <div className="max-w-4xl mx-auto px-2 sm:px-3 lg:px-4 text-center relative z-10">
            <ScrollReveal animation="scale">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#f0f0f5] mb-3 md:mb-6">
                Need a{" "}
                <span className="text-[#f5b800] text-glow">
                  Custom Solution
                </span>
                ?
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-[#888899] mb-6 md:mb-8 max-w-3xl mx-auto">
                Our team of experts can help design a tailored solution that perfectly fits your business requirements.
              </p>
              <button
                onClick={() => router.push("/contact")}
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-[#f5b800] text-[#0a0a0f] rounded-lg font-bold text-sm md:text-base hover:bg-[#c49400] transition-colors glow-yellow"
              >
                Get in Touch
              </button>
            </ScrollReveal>
            <ContactModal
              open={contactOpen}
              onOpenChange={setContactOpen}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
