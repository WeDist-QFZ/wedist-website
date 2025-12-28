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

const iconMap: Record<string, React.ReactNode> = {
  network: <Network className="w-8 h-8 md:w-10 md:h-10" />,
  shield: <Shield className="w-8 h-8 md:w-10 md:h-10" />,
  server: <Server className="w-8 h-8 md:w-10 md:h-10" />,
  camera: <Camera className="w-8 h-8 md:w-10 md:h-10" />,
}

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] page-transition">
      <Header />
      <main className="pt-20 md:pt-28 lg:pt-32">
        {/* Hero Section - Mobile responsive */}
        <section className="py-16 md:py-32 cyber-grid relative overflow-hidden">
          <AnimatedGrid />
          <CyberParticles count={25} />
          <FloatingElements count={5} />

          <div className="absolute top-1/3 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#f5b800]/10 rounded-full blur-3xl animate-float morph-bg" />
          <div className="absolute bottom-1/3 right-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#f5b800]/5 rounded-full blur-3xl animate-float-slow morph-bg" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal animation="up">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-[#f5b800]/10 border border-[#f5b800]/30 rounded-full mb-6 md:mb-8">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-[#f5b800]" />
                  <span className="text-sm md:text-lg font-medium text-[#f5b800] tracking-[0.1em] md:tracking-[0.2em]">
                    INDUSTRY SOLUTIONS
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-[#f0f0f5] mb-6 md:mb-8">
                  Our{" "}
                  <GlitchText text="Solutions" className="text-[#f5b800] text-glow" autoGlitch glitchInterval={7000} />
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#888899] leading-relaxed px-2">
                  Comprehensive technology solutions tailored for your industry needs. We bring together best-in-class
                  brands to solve your most complex challenges.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Solutions Grid - Mobile responsive */}
        <section className="py-16 md:py-32 bg-[#050508] relative overflow-hidden">
          <CyberParticles count={15} />
          <div className="absolute inset-0 hex-pattern opacity-30" />
          <div className="absolute inset-0 circuit-pattern opacity-20" />

          <div className="absolute top-1/4 left-10 w-40 md:w-80 h-40 md:h-80 bg-[#f5b800]/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-10 w-48 md:w-96 h-48 md:h-96 bg-[#f5b800]/3 rounded-full blur-3xl animate-float-reverse" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              {solutions.map((solution, index) => (
                <ScrollReveal key={solution.id} animation={index % 2 === 0 ? "left" : "right"} delay={index * 100}>
                  <CyberCard className="h-full" tiltEffect>
                    <HologramCard>
                      <div className="group relative p-6 md:p-10 bg-[#121218]/80 rounded-xl border border-[#2a2a36] hover:border-[#f5b800]/50 transition-all duration-500 overflow-hidden h-full">
                        {/* Background glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#f5b800]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Scan line */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f5b800]/50 to-transparent animate-[scanline-move_2s_linear_infinite]" />
                        </div>

                        <div className="relative z-10">
                          {/* Icon */}
                          <div className="inline-flex p-4 md:p-5 bg-[#f5b800]/10 rounded-xl text-[#f5b800] mb-6 md:mb-8 group-hover:bg-[#f5b800]/20 transition-colors glow-yellow">
                            {iconMap[solution.icon]}
                          </div>

                          <h3 className="text-xl md:text-3xl font-bold text-[#f0f0f5] mb-4 md:mb-5 group-hover:text-[#f5b800] transition-colors">
                            {solution.title}
                          </h3>

                          <p className="text-base md:text-lg text-[#888899] mb-6 md:mb-8 leading-relaxed">
                            {solution.description}
                          </p>

                          {/* Brands */}
                          <div className="flex flex-wrap gap-2 md:gap-3">
                            {solution.brands.map((brand) => (
                              <span
                                key={brand}
                                className="px-3 md:px-4 py-1.5 md:py-2 bg-[#1a1a24] border border-[#2a2a36] rounded-full text-sm md:text-base text-[#f5b800] hover:border-[#f5b800]/50 transition-colors"
                              >
                                {brand}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Corner decorations */}
                        <div className="absolute -bottom-12 md:-bottom-16 -right-12 md:-right-16 w-32 md:w-40 h-32 md:h-40 border border-[#f5b800]/10 rounded-full group-hover:border-[#f5b800]/30 transition-colors" />
                        <div className="absolute -bottom-8 md:-bottom-12 -right-8 md:-right-12 w-24 md:w-32 h-24 md:h-32 border border-[#f5b800]/10 rounded-full group-hover:border-[#f5b800]/20 transition-colors" />
                      </div>
                    </HologramCard>
                  </CyberCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Mobile responsive */}
        <section className="py-16 md:py-32 bg-[#0a0a0f] cyber-grid relative overflow-hidden">
          <CyberParticles count={15} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[#f5b800]/5 rounded-full blur-3xl" />

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <ScrollReveal animation="scale">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#f0f0f5] mb-6 md:mb-8">
                Need a <span className="text-[#f5b800] text-glow">Custom Solution</span>?
              </h2>
              <p className="text-base md:text-xl text-[#888899] mb-8 md:mb-10 max-w-3xl mx-auto px-2">
                Our team of experts can help design a tailored solution that perfectly fits your business requirements.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 md:px-10 py-4 md:py-5 bg-[#f5b800] text-[#0a0a0f] rounded-xl font-bold text-base md:text-xl hover:bg-[#c49400] transition-colors glow-yellow"
              >
                Get in Touch
              </a>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
