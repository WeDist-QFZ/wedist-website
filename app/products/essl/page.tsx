"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Fingerprint, Clock, Users } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberParticles } from "@/components/cyber-particles"
import { GlitchText } from "@/components/glitch-text"
import { FloatingElements } from "@/components/floating-elements"
import { DataStreamBg } from "@/components/data-stream-bg"
import { ProductGrid } from "@/components/product-grid"
import { getBrandById } from "@/lib/data"

export default function EsslPage() {
  const brand = getBrandById("essl")

  if (!brand) return null

  return (
    <div className="min-h-screen bg-[#0a0a0f] page-transition">
      <Header />
      <main className="pt-28 md:pt-32">
        {/* Hero Section - Blue Theme */}
        <section className="py-32 relative overflow-hidden">
          <DataStreamBg color="#2b5797" />
          <CyberParticles count={30} color="#2b5797" />
          <FloatingElements count={6} color="#2b5797" />

          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(43, 87, 151, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(43, 87, 151, 0.03) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#2b5797]/10 rounded-full blur-3xl animate-float morph-bg" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#2b5797]/5 rounded-full blur-3xl animate-float-reverse morph-bg" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal animation="left">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 text-[#888899] hover:text-[#2b5797] mb-10 transition-colors text-lg group"
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
                      width={160}
                      height={80}
                      className="max-h-16 w-auto"
                    />
                  </div>

                  <h1 className="text-5xl md:text-7xl font-bold text-[#f0f0f5] mb-6">
                    <GlitchText text={brand.name} className="text-[#2b5797]" autoGlitch glitchInterval={8000} />
                  </h1>

                  <p className="text-2xl md:text-3xl font-light text-[#5a8fd4] mb-8 tracking-wide">{brand.tagline}</p>

                  <p className="text-xl text-[#888899] leading-relaxed mb-10">{brand.description}</p>

                  <div className="flex flex-wrap gap-4">
                    {[
                      { icon: Fingerprint, label: "Biometrics" },
                      { icon: Clock, label: "Time Attendance" },
                      { icon: Users, label: "Workforce Mgmt" },
                    ].map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-4 py-2 bg-[#2b5797]/10 border border-[#2b5797]/30 rounded-full"
                      >
                        <feature.icon className="w-5 h-5 text-[#5a8fd4]" />
                        <span className="text-[#5a8fd4] font-medium">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="right">
                <div className="relative">
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#2b5797]/20 to-transparent border border-[#2b5797]/30 p-10 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <Fingerprint className="w-48 h-48 text-[#2b5797]" />
                        <div className="absolute inset-0 overflow-hidden">
                          <div className="absolute w-full h-2 bg-gradient-to-b from-[#5a8fd4]/50 to-transparent animate-[scanline-move_2s_linear_infinite]" />
                        </div>
                        {[
                          { top: "25%", left: "40%" },
                          { top: "35%", left: "55%" },
                          { top: "45%", left: "45%" },
                          { top: "55%", left: "60%" },
                          { top: "65%", left: "35%" },
                          { top: "75%", left: "50%" },
                        ].map((pos, i) => (
                          <div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-[#5a8fd4] animate-ping"
                            style={{ top: pos.top, left: pos.left, animationDelay: `${i * 0.15}s` }}
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
          accentColor={brand.accentColor || "#2b5797"}
          icon={Fingerprint}
        />
      </main>
      <Footer />
    </div>
  )
}
