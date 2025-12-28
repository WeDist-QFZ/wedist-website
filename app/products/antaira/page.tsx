"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Factory, Wifi, Cable } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberParticles } from "@/components/cyber-particles"
import { GlitchText } from "@/components/glitch-text"
import { FloatingElements } from "@/components/floating-elements"
import { DataStreamBg } from "@/components/data-stream-bg"
import { ProductGrid } from "@/components/product-grid"
import { getBrandById } from "@/lib/data"

export default function AntairaPage() {
  const brand = getBrandById("antaira")

  if (!brand) return null

  return (
    <div className="min-h-screen bg-[#0a0a0f] page-transition">
      <Header />
      <main className="pt-28 md:pt-32">
        {/* Hero Section - Red/Black Theme */}
        <section className="py-32 relative overflow-hidden">
          <DataStreamBg color="#cc0000" />
          <CyberParticles count={30} color="#cc0000" />
          <FloatingElements count={6} color="#cc0000" />

          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(204, 0, 0, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(204, 0, 0, 0.03) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#cc0000]/10 rounded-full blur-3xl animate-float morph-bg" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#cc0000]/5 rounded-full blur-3xl animate-float-reverse morph-bg" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal animation="left">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 text-[#888899] hover:text-[#cc0000] mb-10 transition-colors text-lg group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                Back to Products
              </Link>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal animation="left">
                <div>
                  <div className="p-8 bg-white rounded-2xl inline-block mb-10">
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={brand.name}
                      width={250}
                      height={100}
                      className="max-h-16 w-auto"
                    />
                  </div>

                  <h1 className="text-5xl md:text-7xl font-bold text-[#f0f0f5] mb-6">
                    <GlitchText text={brand.name} className="text-[#cc0000]" autoGlitch glitchInterval={8000} />
                  </h1>

                  <p className="text-2xl md:text-3xl font-light text-[#cc0000] mb-8 tracking-wide">{brand.tagline}</p>

                  <p className="text-xl text-[#888899] leading-relaxed mb-10">{brand.description}</p>

                  <div className="flex flex-wrap gap-4">
                    {[
                      { icon: Factory, label: "Industrial Grade" },
                      { icon: Wifi, label: "Wireless Solutions" },
                      { icon: Cable, label: "Ethernet Switches" },
                    ].map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-4 py-2 bg-[#cc0000]/10 border border-[#cc0000]/30 rounded-full"
                      >
                        <feature.icon className="w-5 h-5 text-[#cc0000]" />
                        <span className="text-[#cc0000] font-medium">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="right">
                <div className="relative">
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#cc0000]/20 to-transparent border border-[#cc0000]/30 p-10 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-lg bg-[#cc0000]/30 flex items-center justify-center animate-pulse">
                          <Factory className="w-12 h-12 text-[#cc0000]" />
                        </div>
                        {[0, 90, 180, 270].map((angle, i) => (
                          <div
                            key={i}
                            className="absolute top-1/2 left-1/2 w-12 h-12 rounded-lg bg-[#cc0000]/20 flex items-center justify-center animate-float"
                            style={{
                              transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(100px)`,
                              animationDelay: `${i * 0.3}s`,
                            }}
                          >
                            <Cable className="w-6 h-6 text-[#cc0000]" style={{ transform: `rotate(-${angle}deg)` }} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute inset-0 scanlines opacity-20" />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <ProductGrid
          products={brand.products}
          brandId={brand.id}
          brandName={brand.name}
          accentColor={brand.accentColor || "#cc0000"}
          icon={Factory}
        />
      </main>
      <Footer />
    </div>
  )
}
