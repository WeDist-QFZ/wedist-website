"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Radio, Video, Shield, Cctv, ScanLine } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberParticles } from "@/components/cyber-particles"
import { GlitchText } from "@/components/glitch-text"
import { FloatingElements } from "@/components/floating-elements"
import { ProductGrid } from "@/components/product-grid"
import { getBrandById } from "@/lib/data"

export default function MotorolaSolutionsPage() {
  const brand = getBrandById("motorola-solutions")

  if (!brand) return null

  // Positions for the orbiting surveillance camera nodes (percent-based within the frame)
  const cameraNodes = [
    { top: "12%", left: "18%", delay: "0s", rotate: -25 },
    { top: "14%", left: "72%", delay: "0.6s", rotate: 30 },
    { top: "68%", left: "12%", delay: "1.2s", rotate: -15 },
    { top: "70%", left: "76%", delay: "1.8s", rotate: 20 },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0f] page-transition">
      <Header />
      <main className="pt-28 md:pt-32">
        {/* Hero Section - Black/White Theme */}
        <section className="py-32 relative overflow-hidden">
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

                  <h1 className="text-4xl md:text-6xl font-bold text-[#f0f0f5] mb-6 whitespace-nowrap">
  <GlitchText 
    text={brand.name} 
    className="text-white" 
    autoGlitch 
    glitchInterval={8000} 
  />
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
                    {/* Surveillance monitoring scene */}
                    <div className="absolute inset-0 motorola-surveil">
                      {/* Radar / camera scan sweep emanating from the central camera */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-3/4 h-3/4">
                          {/* concentric range rings */}
                          {[1, 2, 3].map((ring) => (
                            <div
                              key={ring}
                              className="absolute inset-0 m-auto rounded-full border border-white/10"
                              style={{ width: `${ring * 33}%`, height: `${ring * 33}%` }}
                            />
                          ))}
                          {/* rotating scan cone */}
                          <div className="motorola-sweep absolute inset-0 rounded-full" />
                        </div>
                      </div>

                      {/* Orbiting surveillance camera nodes */}
                      {cameraNodes.map((node, i) => (
                        <div
                          key={i}
                          className="absolute"
                          style={{ top: node.top, left: node.left }}
                        >
                          <div
                            className="motorola-node relative flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 border border-white/30 backdrop-blur-sm"
                            style={{ animationDelay: node.delay, transform: `rotate(${node.rotate}deg)` }}
                          >
                            <Cctv className="w-6 h-6 text-white" />
                            {/* field-of-view beam */}
                            <span className="motorola-fov" style={{ animationDelay: node.delay } as React.CSSProperties} />
                          </div>
                        </div>
                      ))}

                      {/* Central camera hub */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-white/10 border-2 border-white/40 backdrop-blur-sm">
                          <Video className="w-12 h-12 text-white motorola-rec" />
                          {/* REC indicator */}
                          <span className="absolute top-3 right-3 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-red-500 motorola-rec-dot" />
                          </span>
                        </div>
                      </div>

                      {/* Roaming detection box */}
                      <div className="motorola-detect absolute w-16 h-16 border-2 border-white/70 rounded-sm">
                        <ScanLine className="absolute -top-5 left-0 w-4 h-4 text-white/70" />
                        <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-white" />
                        <span className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-white" />
                        <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white" />
                      </div>
                    </div>

                    <div className="absolute inset-0 scanlines opacity-20 pointer-events-none" />
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

      <style jsx global>{`
        /* Rotating camera scan cone */
        .motorola-sweep {
          background: conic-gradient(
            from 0deg,
            rgba(255, 255, 255, 0.28) 0deg,
            rgba(255, 255, 255, 0.06) 24deg,
            transparent 60deg,
            transparent 360deg
          );
          -webkit-mask: radial-gradient(circle, transparent 0%, #000 8%, #000 100%);
          mask: radial-gradient(circle, transparent 0%, #000 8%, #000 100%);
          animation: motorolaSweep 4s linear infinite;
        }
        @keyframes motorolaSweep {
          to {
            transform: rotate(360deg);
          }
        }

        /* Camera nodes gently pulse to signal an active feed */
        .motorola-node {
          animation: motorolaNodePulse 2.4s ease-in-out infinite;
        }
        @keyframes motorolaNodePulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
            border-color: rgba(255, 255, 255, 0.3);
          }
          50% {
            box-shadow: 0 0 18px 2px rgba(255, 255, 255, 0.25);
            border-color: rgba(255, 255, 255, 0.7);
          }
        }

        /* Field-of-view beam projected from each camera node */
        .motorola-fov {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 70px;
          height: 46px;
          transform-origin: left center;
          transform: translateY(-50%);
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.22), transparent 80%);
          clip-path: polygon(0 45%, 100% 0, 100% 100%, 0 55%);
          animation: motorolaFov 3.2s ease-in-out infinite;
        }
        @keyframes motorolaFov {
          0%,
          100% {
            opacity: 0.25;
          }
          50% {
            opacity: 0.6;
          }
        }

        /* Central recording camera subtle breathing */
        .motorola-rec {
          animation: motorolaRec 3s ease-in-out infinite;
        }
        @keyframes motorolaRec {
          0%,
          100% {
            opacity: 0.85;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.06);
          }
        }
        .motorola-rec-dot {
          animation: motorolaBlink 1.4s steps(1, end) infinite;
        }
        @keyframes motorolaBlink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0.15;
          }
        }

        /* Detection box roaming across the scene as if tracking a subject */
        .motorola-detect {
          top: 20%;
          left: 18%;
          animation: motorolaDetect 9s ease-in-out infinite;
        }
        @keyframes motorolaDetect {
          0% {
            top: 22%;
            left: 16%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          35% {
            top: 55%;
            left: 60%;
          }
          60% {
            top: 30%;
            left: 62%;
          }
          85% {
            top: 58%;
            left: 20%;
            opacity: 1;
          }
          100% {
            top: 22%;
            left: 16%;
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .motorola-sweep,
          .motorola-node,
          .motorola-fov,
          .motorola-rec,
          .motorola-rec-dot,
          .motorola-detect {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}