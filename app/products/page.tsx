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
        <section className="py-16 md:py-32 cyber-grid relative overflow-hidden">
          <AnimatedGrid />
          <CyberParticles count={25} />
          <FloatingElements count={5} />

          {/* Large animated background - responsive */}
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#f5b800]/10 rounded-full blur-3xl animate-float morph-bg" />
            <div className="absolute bottom-1/3 right-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#f5b800]/5 rounded-full blur-3xl animate-float-slow morph-bg" />
          </div>

          {/* Decorative elements - hidden on mobile */}
          <div className="absolute top-20 left-10 w-60 h-60 border-l-2 border-t-2 border-[#f5b800]/20 hidden md:block" />
          <div className="absolute bottom-20 right-10 w-60 h-60 border-r-2 border-b-2 border-[#f5b800]/20 hidden md:block" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal animation="up">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-[#f5b800]/10 border border-[#f5b800]/30 rounded-full mb-6 md:mb-8">
                  <Cpu className="w-5 h-5 md:w-6 md:h-6 text-[#f5b800]" />
                  <span className="text-sm md:text-lg font-medium text-[#f5b800] tracking-[0.1em] md:tracking-[0.2em]">
                    PRODUCT CATALOG
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold text-[#f0f0f5] mb-6 md:mb-8">
                  Our{" "}
                  <GlitchText text="Products" className="text-[#f5b800] text-glow" autoGlitch glitchInterval={7000} />
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#888899] leading-relaxed px-2">
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
        <section className="py-16 md:py-32 bg-[#050508] relative">
          <CyberParticles count={15} />

          {/* Grid pattern background */}
          <div className="absolute inset-0 hex-pattern opacity-30" />
          <div className="absolute inset-0 circuit-pattern opacity-20" />

          {/* Floating orbs - responsive */}
          <div className="absolute top-1/4 left-10 w-40 md:w-80 h-40 md:h-80 bg-[#f5b800]/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-10 w-48 md:w-96 h-48 md:h-96 bg-[#f5b800]/3 rounded-full blur-3xl animate-float-reverse" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal animation="up">
              <div className="text-center mb-10 md:mb-20">
                <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 bg-[#f5b800]/10 border border-[#f5b800]/30 rounded-full mb-4 md:mb-6">
                  <Zap className="w-4 h-4 md:w-5 md:h-5 text-[#f5b800]" />
                  <span className="text-xs md:text-sm font-medium text-[#f5b800] tracking-[0.15em] md:tracking-[0.2em]">
                    SELECT A BRAND
                  </span>
                </div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0f0f5]">
                  World-Class <span className="text-[#f5b800] text-glow">Technology</span> Partners
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {brands.map((brand, index) => (
                <ScrollReveal key={brand.id} animation="scale" delay={index * 100}>
                  <Link href={`/products/${brand.id}`}>
                    <CyberCard className="h-full group" tiltEffect>
                      <HologramCard>
                        <div className="relative p-6 md:p-10 bg-[#121218]/80 rounded-xl border border-[#2a2a36] hover:border-[#f5b800]/50 transition-all duration-500 overflow-hidden h-full">
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
                            <div className="h-24 md:h-32 flex items-center justify-center mb-6 md:mb-10 relative">
                              <div className="absolute inset-0 bg-gradient-to-b from-[#f5b800]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                              <div className="relative bg-white rounded-lg p-4 w-full h-full flex items-center justify-center overflow-hidden">
                                <Image
                                  src={brand.logo || "/placeholder.svg"}
                                  alt={brand.name}
                                  width={220}
                                  height={100}
                                  className="max-h-16 md:max-h-20 w-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                                />
                              </div>
                            </div>

                            <h3 className="text-xl md:text-3xl font-semibold text-[#f0f0f5] mb-3 md:mb-4 group-hover:text-[#f5b800] transition-colors">
                              {brand.name}
                            </h3>

                            <p className="text-[#888899] text-sm md:text-lg mb-6 md:mb-8 line-clamp-2">
                              {brand.description}
                            </p>

                            <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-[#2a2a36]">
                              <div className="flex items-center gap-2 text-[#f5b800] font-medium">
                                <span className="px-3 md:px-4 py-1.5 md:py-2 bg-[#f5b800]/10 rounded-lg text-sm md:text-lg">
                                  {brand.products.length} Products
                                </span>
                              </div>
                              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#f5b800]/10 flex items-center justify-center group-hover:bg-[#f5b800]/20 transition-colors">
                                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-[#f5b800] group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>

                          {/* Corner accent */}
                          <div className="absolute top-0 right-0 w-16 md:w-24 h-16 md:h-24 overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 md:w-48 h-32 md:h-48 bg-gradient-to-br from-[#f5b800]/20 to-transparent -translate-y-1/2 translate-x-1/2 rotate-45 group-hover:from-[#f5b800]/40 transition-colors" />
                          </div>

                          {/* Bottom corner */}
                          <div className="absolute bottom-0 left-0 w-14 md:w-20 h-14 md:h-20 overflow-hidden">
                            <div className="absolute bottom-0 left-0 w-28 md:w-40 h-28 md:h-40 bg-gradient-to-tr from-[#f5b800]/10 to-transparent translate-y-1/2 -translate-x-1/2 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" />
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
