"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { brands } from "@/lib/data"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Cpu, Zap } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberCard } from "@/components/cyber-card"
import { CyberParticles } from "@/components/cyber-particles"
import { GlitchText } from "@/components/glitch-text"
import { FloatingElements } from "@/components/floating-elements"
import { AnimatedGrid } from "@/components/animated-grid"
import { HologramCard } from "@/components/hologram-card"

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] page-transition">
      <Header />
      <main className="pt-20 md:pt-28 lg:pt-32">
        {/* Hero Section - Mobile responsive */}
        <section className="py-9 md:py-16 cyber-grid relative overflow-hidden">
          <AnimatedGrid />
          <CyberParticles count={25} />
          <FloatingElements count={5} />

          {/* Large animated background - responsive */}
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/4 w-[169px] md:w-[338px] h-[169px] md:h-[338px] bg-[#f5b800]/10 rounded-full blur-xl animate-float morph-bg" />
            <div className="absolute bottom-1/3 right-1/4 w-[141px] md:w-[281px] h-[141px] md:h-[281px] bg-[#f5b800]/5 rounded-full blur-xl animate-float-slow morph-bg" />
          </div>

          {/* Decorative elements - hidden on mobile */}
          <div className="absolute top-10 left-6 w-32 h-32 border-l-2 border-t-2 border-[#f5b800]/20 hidden md:block" />
          <div className="absolute bottom-10 right-6 w-32 h-32 border-r-2 border-b-2 border-[#f5b800]/20 hidden md:block" />

          <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 relative z-10">
            <ScrollReveal animation="up">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 bg-[#f5b800]/10 border border-[#f5b800]/30 rounded-full mb-3 md:mb-4">
                  <Cpu className="w-3 h-3 md:w-4 md:h-4 text-[#f5b800]" />
                  <span className="text-xs md:text-sm font-medium text-[#f5b800] tracking-[0.1em] md:tracking-[0.2em]">
                    PRODUCT CATALOG
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold text-[#f0f0f5] mb-3 md:mb-4">
                  Our{" "}
                  <GlitchText text="Products" className="text-[#f5b800] text-glow" autoGlitch glitchInterval={7000} />
                </h1>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#888899] leading-relaxed px-1">
                  Explore our comprehensive portfolio of technology solutions from world-leading brands. Click on any
                  brand to discover their complete product lineup.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Horizontal scan effect */}
          <div className="absolute inset-0 horizontal-scan pointer-events-none" />
        </section>

        {/* Brands Grid - Mobile responsive */}
        <section className="py-9 md:py-16 bg-[#050508] relative">
          <CyberParticles count={15} />

          {/* Grid pattern background */}
          <div className="absolute inset-0 hex-pattern opacity-30" />
          <div className="absolute inset-0 circuit-pattern opacity-20" />

          {/* Floating orbs - responsive */}
          <div className="absolute top-1/4 left-6 w-20 md:w-44 h-20 md:h-44 bg-[#f5b800]/5 rounded-full blur-xl animate-float" />
          <div className="absolute bottom-1/4 right-6 w-28 md:w-56 h-28 md:h-56 bg-[#f5b800]/3 rounded-full blur-xl animate-float-reverse" />

          <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 relative z-10">
            <ScrollReveal animation="up">
              <div className="text-center mb-6 md:mb-10">
                <div className="inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 bg-[#f5b800]/10 border border-[#f5b800]/30 rounded-full mb-2 md:mb-3">
                  <Zap className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#f5b800]" />
                  <span className="text-xs font-medium text-[#f5b800] tracking-[0.15em] md:tracking-[0.2em]">
                    SELECT A BRAND
                  </span>
                </div>
                <p className="text-base sm:text-lg md:text-xl font-bold text-[#f0f0f5]">
                  World-Class <span className="text-[#f5b800] text-glow">Technology</span> Partners
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {brands.map((brand, index) => (
                <ScrollReveal key={brand.id} animation="scale" delay={index * 100}>
                  <Link href={`/products/${brand.id}`}>
                    <CyberCard className="h-full group" tiltEffect>
                      <HologramCard>
                        <div className="relative p-3 md:p-6 bg-[#121218]/80 rounded-md border border-[#2a2a36] hover:border-[#f5b800]/50 transition-all duration-500 overflow-hidden h-full">
                          {/* Animated scan line */}
                          <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f5b800]/50 to-transparent animate-[scanline-move_2s_linear_infinite]" />
                            </div>
                          </div>

                          {/* Hover glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#f5b800]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          <div className="relative z-10">
                            {/* Logo container - responsive */}
                            <div className="h-12 md:h-16 flex items-center justify-center mb-3 md:mb-6 relative">
                              <div className="absolute inset-0 bg-gradient-to-b from-[#f5b800]/5 to-transparent rounded-md opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="relative bg-white rounded p-2 w-full h-full flex items-center justify-center overflow-hidden">
                                <Image
                                  src={brand.logo || "/placeholder.svg"}
                                  alt={brand.name}
                                  width={124}
                                  height={56}
                                  className="max-h-9 md:max-h-10 w-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                                />
                              </div>
                            </div>

                            <h3 className="text-base md:text-xl font-semibold text-[#f0f0f5] mb-1.5 md:mb-2 group-hover:text-[#f5b800] transition-colors">
                              {brand.name}
                            </h3>

                            <p className="text-[#888899] text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
                              {brand.description}
                            </p>

                            <div className="flex items-center justify-between pt-2 md:pt-3 border-t border-[#2a2a36]">
                              <div className="flex items-center gap-1 text-[#f5b800] font-medium">
                                <span className="px-1.5 md:px-2 py-1 bg-[#f5b800]/10 rounded text-xs md:text-sm">
                                  {brand.products.length} Products
                                </span>
                              </div>
                              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#f5b800]/10 flex items-center justify-center group-hover:bg-[#f5b800]/20 transition-colors">
                                <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-[#f5b800] group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>

                          {/* Corner accent */}
                          <div className="absolute top-0 right-0 w-9 md:w-12 h-9 md:h-12 overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 md:w-28 h-16 md:h-28 bg-gradient-to-br from-[#f5b800]/20 to-transparent -translate-y-1/2 translate-x-1/2 rotate-45 group-hover:from-[#f5b800]/40 transition-colors" />
                          </div>

                          {/* Bottom corner */}
                          <div className="absolute bottom-0 left-0 w-8 md:w-10 h-8 md:h-10 overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-14 md:w-20 h-14 md:h-20 bg-gradient-to-tr from-[#f5b800]/10 to-transparent translate-y-1/2 -translate-x-1/2 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      </HologramCard>
                    </CyberCard>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}