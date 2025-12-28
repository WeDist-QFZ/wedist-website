"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Radio, Video, Shield } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberParticles } from "@/components/cyber-particles"
import { GlitchText } from "@/components/glitch-text"
import { FloatingElements } from "@/components/floating-elements"
import { DataStreamBg } from "@/components/data-stream-bg"
import { ProductGrid } from "@/components/product-grid"
import { getBrandById } from "@/lib/data"

export default function MotorolaSolutionsPage() {
  const brand = getBrandById("motorola-solutions")

  if (!brand) return null

  return (
    <div className="min-h-screen bg-[#0a0a0f] page-transition">
      <Header />
      <main className="pt-28 md:pt-32">
        {/* Hero Section - Black/White Theme */}
        <section className="py-32 relative overflow-hidden">
          <DataStreamBg color="#ffffff" />
          <CyberParticles count={30} color="#888888" />
          <FloatingElements count={6} color="#ffffff" />

          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl animate-float morph-bg" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/3 rounded-full blur-3xl animate-float-reverse morph-bg" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal animation="left">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 text-[#888899] hover:text-white mb-10 transition-colors text-lg group"
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
                      className="max-h-20 w-auto"
                    />
                  </div>

                  <h1 className="text-5xl md:text-7xl font-bold text-[#f0f0f5] mb-6">
                    <GlitchText text={brand.name} className="text-white" autoGlitch glitchInterval={8000} />
                  </h1>

                  <p className="text-2xl md:text-3xl font-light text-[#888899] mb-8 tracking-wide">{brand.tagline}</p>

                  <p className="text-xl text-[#888899] leading-relaxed mb-10">{brand.description}</p>

                  <div className="flex flex-wrap gap-4">
                    {[
                      { icon: Radio, label: "Critical Communications" },
                      { icon: Video, label: "Video Security" },
                      { icon: Shield, label: "Public Safety" },
                    ].map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/30 rounded-full"
                      >
                        <feature.icon className="w-5 h-5 text-white" />
                        <span className="text-white font-medium">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="right">
                <div className="relative">
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 p-10 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full flex items-center justify-center">
                        {[1, 2, 3, 4].map((ring, i) => (
                          <div
                            key={i}
                            className="absolute rounded-full border-2 border-white/20 animate-ping"
                            style={{
                              width: `${ring * 25}%`,
                              height: `${ring * 25}%`,
                              animationDuration: `${2 + i * 0.5}s`,
                              animationDelay: `${i * 0.3}s`,
                            }}
                          />
                        ))}
                        <Radio className="w-24 h-24 text-white animate-pulse" />
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
          accentColor={brand.accentColor || "#ffffff"}
          icon={Radio}
        />
      </main>
      <Footer />
    </div>
  )
}
