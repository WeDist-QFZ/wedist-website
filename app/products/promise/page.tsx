"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Video, HardDrive, Cloud } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberParticles } from "@/components/cyber-particles"
import { GlitchText } from "@/components/glitch-text"
import { FloatingElements } from "@/components/floating-elements"
import { DataStreamBg } from "@/components/data-stream-bg"
import { ProductGrid } from "@/components/product-grid"
import { getBrandById } from "@/lib/data"

export default function PromisePage() {
  const brand = getBrandById("promise")

  if (!brand) return null

  return (
    <div className="min-h-screen bg-[#0a0a0f] page-transition">
      <Header />
      <main className="pt-28 md:pt-32">
        {/* Hero Section - Cyan Theme */}
        <section className="py-32 relative overflow-hidden">
          {/* <DataStreamBg color="#00bcd4" /> */}
          <CyberParticles count={30} color="#00bcd4" />
          <FloatingElements count={6} color="#00bcd4" />

          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 188, 212, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 188, 212, 0.03) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00bcd4]/10 rounded-full blur-3xl animate-float morph-bg" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00bcd4]/5 rounded-full blur-3xl animate-float-reverse morph-bg" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal animation="left">
              <Link
                href="/products"
                className="inline-flex items-center gap-3 text-[#888899] hover:text-[#00bcd4] mb-10 transition-colors text-lg group"
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
                      width={280}
                      height={100}
                      className="max-h-16 w-auto"
                    />
                  </div>

                  <h1 className="text-3xl md:text-5xl font-bold text-[#f0f0f5] mb-6">
                    <GlitchText text={brand.name} className="text-[#00bcd4]" autoGlitch glitchInterval={8000} />
                  </h1>

                  <p className="text-2xl md:text-3xl font-light text-[#00bcd4] mb-8 tracking-wide">{brand.tagline}</p>

                  <p className="text-xl text-[#888899] leading-relaxed mb-10">{brand.description}</p>

                  <div className="flex flex-wrap gap-4">
                    {[
                      { icon: Video, label: "Video Storage" },
                      { icon: HardDrive, label: "Enterprise NAS" },
                      { icon: Cloud, label: "Cloud Ready" },
                    ].map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-4 py-2 bg-[#00bcd4]/10 border border-[#00bcd4]/30 rounded-full"
                      >
                        <feature.icon className="w-5 h-5 text-[#00bcd4]" />
                        <span className="text-[#00bcd4] font-medium">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="right">
                <div className="relative">
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#00bcd4]/20 to-transparent border border-[#00bcd4]/30 p-10 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg viewBox="0 0 200 100" className="w-64 h-32">
                        <path
                          d="M50,50 C50,20 80,20 100,50 C120,80 150,80 150,50 C150,20 120,20 100,50 C80,80 50,80 50,50"
                          fill="none"
                          stroke="#00bcd4"
                          strokeWidth="4"
                          strokeDasharray="10 5"
                          className="animate-pulse"
                        >
                          <animate
                            attributeName="stroke-dashoffset"
                            from="0"
                            to="30"
                            dur="2s"
                            repeatCount="indefinite"
                          />
                        </path>
                      </svg>
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
          accentColor={brand.accentColor || "#00bcd4"}
          icon={HardDrive}
        />
      </main>
      <Footer />
    </div>
  )
}
