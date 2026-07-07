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
import { ProductGrid } from "@/components/product-grid"
import { getBrandById } from "@/lib/data"

export default function AntairaPage() {
  const brand = getBrandById("antaira")

  if (!brand) return null

  const features = [
    { icon: Factory, label: "Industrial Grade", type: "hub" },
    { icon: Wifi, label: "Wireless Solutions", type: "node" },
    { icon: Cable, label: "Ethernet Switches", type: "node" },
  ]

  // Radial topology node angles
  const nodeAngles = [0, 90, 180, 270]

  return (
    <div className="min-h-screen bg-[#0a0a0f] page-transition">
      <Header />

      <main className="pt-28 md:pt-32">
        {/* HERO */}
        <section className="py-32 relative overflow-hidden">
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

          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#cc0000]/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#cc0000]/5 rounded-full blur-3xl animate-float-reverse" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* BACK */}
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
              {/* LEFT */}
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

                  {/* INDUSTRIAL NETWORK FLOW: badges wired together with a traveling data packet */}
                  <div className="antaira-network flex flex-wrap items-center gap-4">
                    {features.map((feature, i) => {
                      const isHub = feature.type === "hub"

                      return (
                        <div
                          key={i}
                          className={`antaira-node relative flex items-center gap-2 px-4 py-2 rounded-full border overflow-hidden cursor-default transition-all duration-300 ${
                            isHub
                              ? "bg-[#cc0000]/15 border-[#cc0000]/40 shadow-[0_0_25px_rgba(204,0,0,0.25)]"
                              : "bg-[#cc0000]/10 border-[#cc0000]/25 hover:bg-[#cc0000]/20"
                          }`}
                        >
                          {/* Traveling data packet — only on relay nodes */}
                          {!isHub && (
                            <span
                              aria-hidden="true"
                              className="antaira-packet"
                              style={{ animationDelay: `${i * 0.4}s` }}
                            />
                          )}

                          <feature.icon className="w-5 h-5 text-[#cc0000] relative z-10" />
                          <span className="text-[#cc0000] font-medium relative z-10">{feature.label}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </ScrollReveal>

              {/* RIGHT */}
              <ScrollReveal animation="right">
                <div className="relative">
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#cc0000]/20 to-transparent border border-[#cc0000]/30 p-10 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        {/* Connection lines from core to each node */}
                        {nodeAngles.map((angle, i) => (
                          <span
                            key={`line-${i}`}
                            aria-hidden="true"
                            className="antaira-link absolute top-1/2 left-1/2 origin-left"
                            style={{ transform: `rotate(${angle}deg)` }}
                          />
                        ))}

                        {/* CORE SWITCH */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-lg bg-[#cc0000]/30 flex items-center justify-center animate-pulse z-10">
                          <Factory className="w-12 h-12 text-[#cc0000]" />
                        </div>

                        {/* NETWORK NODES (radial industrial topology) */}
                        {nodeAngles.map((angle, i) => (
                          // Outer wrapper: static radial positioning (never animated)
                          <div
                            key={i}
                            className="absolute top-1/2 left-1/2"
                            style={{
                              transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(120px) rotate(-${angle}deg)`,
                            }}
                          >
                            {/* Inner element: gentle float only (translateY), no positioning conflict */}
                            <div
                              className="antaira-orbit w-12 h-12 rounded-lg bg-[#cc0000]/20 flex items-center justify-center"
                              style={{ animationDelay: `${i * 0.25}s` }}
                            >
                              <Cable className="w-6 h-6 text-[#cc0000]" />
                            </div>
                          </div>
                        ))}

                        {/* signal ring */}
                        <div className="absolute inset-0 border border-[#cc0000]/10 rounded-full animate-ping" />
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

      {/* Global styles so keyframe names are NOT scoped/renamed by styled-jsx */}
      <style jsx global>{`
        /* Data packet that travels across a relay badge */
        .antaira-packet {
          position: absolute;
          top: 50%;
          left: 0;
          width: 0.5rem;
          height: 0.5rem;
          margin-top: -0.25rem;
          border-radius: 9999px;
          background: #cc0000;
          box-shadow: 0 0 8px 2px rgba(204, 0, 0, 0.7);
          animation: antairaPacket 1.8s linear infinite;
          pointer-events: none;
        }
        @keyframes antairaPacket {
          0% {
            transform: translateX(0);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateX(160px);
            opacity: 0;
          }
        }

        /* Gentle vertical float for radial nodes (translateY only, so it never
           fights the positioning transform on the wrapper) */
        .antaira-orbit {
          animation: antairaOrbit 3s ease-in-out infinite;
        }
        @keyframes antairaOrbit {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        /* Faint connection lines from the core outward */
        .antaira-link {
          width: 120px;
          height: 1px;
          background: linear-gradient(90deg, rgba(204, 0, 0, 0.35), rgba(204, 0, 0, 0));
        }

        @media (prefers-reduced-motion: reduce) {
          .antaira-packet,
          .antaira-orbit {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}
