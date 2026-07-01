"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MonitorPlay, Brain, Eye } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberParticles } from "@/components/cyber-particles"
import { GlitchText } from "@/components/glitch-text"
import { FloatingElements } from "@/components/floating-elements"
import { DataStreamBg } from "@/components/data-stream-bg"
import { ProductGrid } from "@/components/product-grid"
import { getBrandById } from "@/lib/data"

export default function DigifortPage() {
  const brand = getBrandById("digifort")

  if (!brand) return null

  return (
    <div className="min-h-screen bg-[#0a0a0f] page-transition">
      <Header />
      <main className="pt-28 md:pt-32">
        {/* Hero Section - Red/Maroon Theme */}
        <section className="py-32 relative overflow-hidden">
          {/* <DataStreamBg color="#a61c1c" /> */}
          <CyberParticles count={30} color="#a61c1c" />
          <FloatingElements count={6} color="#a61c1c" />

          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(166, 28, 28, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(166, 28, 28, 0.03) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#a61c1c]/10 rounded-full blur-3xl animate-float morph-bg" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#a61c1c]/5 rounded-full blur-3xl animate-float-reverse morph-bg" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal animation="left">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 text-[#888899] hover:text-[#a61c1c] mb-10 transition-colors text-lg group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                Back to Products
              </Link>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal animation="left">
                <div>
                  <div className="p-8 bg-[#f5f5f5] rounded-2xl inline-block mb-10 border border-[#a61c1c]/20">
                    <Image
                      src={brand.logo || "/placeholder.svg"}
                      alt={brand.name}
                      width={250}
                      height={100}
                      className="max-h-24 w-auto"
                    />
                  </div>

                  <h1 className="text-5xl md:text-7xl font-bold text-[#f0f0f5] mb-6">
                    <GlitchText text={brand.name} className="text-[#a61c1c]" autoGlitch glitchInterval={8000} />
                  </h1>

                  <p className="text-2xl md:text-3xl font-light text-[#a61c1c] mb-8 tracking-wide">{brand.tagline}</p>

                  <p className="text-xl text-[#888899] leading-relaxed mb-10">{brand.description}</p>

                  <div className="flex flex-wrap gap-4">
                    {[
                      { icon: MonitorPlay, label: "Video Management" },
                      { icon: Brain, label: "AI Analytics" },
                      { icon: Eye, label: "Surveillance" },
                    ].map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-4 py-2 bg-[#a61c1c]/10 border border-[#a61c1c]/30 rounded-full"
                      >
                        <feature.icon className="w-5 h-5 text-[#a61c1c]" />
                        <span className="text-[#a61c1c] font-medium">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="right">
                <div className="relative">
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#a61c1c]/20 to-transparent border border-[#a61c1c]/30 p-10 relative overflow-hidden">
                    {/* Camera grid visualization */}
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2 p-8">
                      {[...Array(9)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-[#a61c1c]/10 rounded-lg border border-[#a61c1c]/30 flex items-center justify-center animate-pulse"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        >
                          <Eye className="w-8 h-8 text-[#a61c1c]/50" />
                        </div>
                      ))}
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
          accentColor={brand.accentColor || "#a61c1c"}
          icon={MonitorPlay}
        />
      </main>
      <Footer />
    </div>
  )
}
