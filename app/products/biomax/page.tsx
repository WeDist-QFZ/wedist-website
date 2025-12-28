"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Fingerprint, ScanFace, Shield } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberParticles } from "@/components/cyber-particles"
import { GlitchText } from "@/components/glitch-text"
import { FloatingElements } from "@/components/floating-elements"
import { DataStreamBg } from "@/components/data-stream-bg"
import { ProductGrid } from "@/components/product-grid"
import { getBrandById } from "@/lib/data"

export default function BiomaxPage() {
  const brand = getBrandById("biomax")

  if (!brand) return null

  return (
    <div className="min-h-screen bg-[#0a0a0f] page-transition">
      <Header />
      <main className="pt-28 md:pt-32">
        {/* Hero Section - Green Theme */}
        <section className="py-32 relative overflow-hidden">
          <DataStreamBg color="#7cc242" />
          <CyberParticles count={30} color="#7cc242" />
          <FloatingElements count={6} color="#7cc242" />

          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(124, 194, 66, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124, 194, 66, 0.03) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7cc242]/10 rounded-full blur-3xl animate-float morph-bg" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#7cc242]/5 rounded-full blur-3xl animate-float-reverse morph-bg" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal animation="left">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 text-[#888899] hover:text-[#7cc242] mb-10 transition-colors text-lg group"
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
                      width={240}
                      height={120}
                      className="max-h-24 w-auto"
                    />
                  </div>

                  <h1 className="text-5xl md:text-7xl font-bold text-[#f0f0f5] mb-6">
                    <GlitchText text={brand.name} className="text-[#7cc242]" autoGlitch glitchInterval={8000} />
                  </h1>

                  <p className="text-2xl md:text-3xl font-light text-[#7cc242] mb-8 tracking-wide">{brand.tagline}</p>

                  <p className="text-xl text-[#888899] leading-relaxed mb-10">{brand.description}</p>

                  <div className="flex flex-wrap gap-4">
                    {[
                      { icon: ScanFace, label: "Facial Recognition" },
                      { icon: Fingerprint, label: "Fingerprint" },
                      { icon: Shield, label: "Access Control" },
                    ].map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-4 py-2 bg-[#7cc242]/10 border border-[#7cc242]/30 rounded-full"
                      >
                        <feature.icon className="w-5 h-5 text-[#7cc242]" />
                        <span className="text-[#7cc242] font-medium">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="right">
                <div className="relative">
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#7cc242]/20 to-transparent border border-[#7cc242]/30 p-10 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <ScanFace className="w-40 h-40 text-[#7cc242]" />
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="absolute w-full h-1 bg-[#7cc242]/50 animate-[scanline-move_2s_linear_infinite]" />
                        </div>
                        {[
                          { top: "30%", left: "35%" },
                          { top: "30%", left: "65%" },
                          { top: "50%", left: "50%" },
                          { top: "70%", left: "40%" },
                          { top: "70%", left: "60%" },
                        ].map((pos, i) => (
                          <div
                            key={i}
                            className="absolute w-3 h-3 rounded-full bg-[#7cc242] animate-ping"
                            style={{ top: pos.top, left: pos.left, animationDelay: `${i * 0.2}s` }}
                          />
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
          accentColor={brand.accentColor || "#7cc242"}
          icon={Fingerprint}
        />
      </main>
      <Footer />
    </div>
  )
}
