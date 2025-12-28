"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, DoorOpen, KeyRound, Monitor } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberParticles } from "@/components/cyber-particles"
import { GlitchText } from "@/components/glitch-text"
import { FloatingElements } from "@/components/floating-elements"
import { DataStreamBg } from "@/components/data-stream-bg"
import { ProductGrid } from "@/components/product-grid"
import { getBrandById } from "@/lib/data"

export default function DorletPage() {
  const brand = getBrandById("dorlet")

  if (!brand) return null

  return (
    <div className="min-h-screen bg-[#0a0a0f] page-transition">
      <Header />
      <main className="pt-28 md:pt-32">
        {/* Hero Section - Navy Blue Theme */}
        <section className="py-32 relative overflow-hidden">
          <DataStreamBg color="#1e4d8c" />
          <CyberParticles count={30} color="#1e4d8c" />
          <FloatingElements count={6} color="#1e4d8c" />

          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(30, 77, 140, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(30, 77, 140, 0.03) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#1e4d8c]/10 rounded-full blur-3xl animate-float morph-bg" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#1e4d8c]/5 rounded-full blur-3xl animate-float-reverse morph-bg" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal animation="left">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 text-[#888899] hover:text-[#1e4d8c] mb-10 transition-colors text-lg group"
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
                      width={200}
                      height={80}
                      className="max-h-12 w-auto"
                    />
                  </div>

                  <h1 className="text-5xl md:text-7xl font-bold text-[#f0f0f5] mb-6">
                    <GlitchText text={brand.name} className="text-[#1e4d8c]" autoGlitch glitchInterval={8000} />
                  </h1>

                  <p className="text-2xl md:text-3xl font-light text-[#5a8fd4] mb-8 tracking-wide">{brand.tagline}</p>

                  <p className="text-xl text-[#888899] leading-relaxed mb-10">{brand.description}</p>

                  <div className="flex flex-wrap gap-4">
                    {[
                      { icon: DoorOpen, label: "Access Control" },
                      { icon: KeyRound, label: "Credential Mgmt" },
                      { icon: Monitor, label: "Security Platform" },
                    ].map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1e4d8c]/10 border border-[#1e4d8c]/30 rounded-full"
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
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#1e4d8c]/20 to-transparent border border-[#1e4d8c]/30 p-10 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-32 h-48 border-4 border-[#1e4d8c]/50 rounded-lg relative">
                          <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-8 h-16 bg-[#1e4d8c]/30 rounded border border-[#1e4d8c]/50">
                            <div className="grid grid-cols-3 gap-0.5 p-1">
                              {[...Array(9)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-1.5 h-1.5 bg-[#5a8fd4] rounded-sm animate-pulse"
                                  style={{ animationDelay: `${i * 0.1}s` }}
                                />
                              ))}
                            </div>
                          </div>
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#5a8fd4] animate-ping" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 scanlines opacity-20" />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <ProductGrid
          products={brand.products}
          brandId={brand.id}
          brandName={brand.name}
          accentColor={brand.accentColor || "#1e4d8c"}
          icon={KeyRound}
        />
      </main>
      <Footer />
    </div>
  )
}
