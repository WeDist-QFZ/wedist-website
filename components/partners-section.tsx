"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { partners } from "@/lib/data"
import { ScrollReveal } from "./scroll-reveal"
import { CyberCard } from "./cyber-card"
import { CyberParticles } from "./cyber-particles"
import { Handshake } from "lucide-react"

export function PartnersSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const targetOffset = useRef(0)
  const currentOffset = useRef(0)

  const [offset, setOffset] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const progress =
        (windowHeight - rect.top) /
        (windowHeight + rect.height)

      targetOffset.current = progress * 650
    }

    let animationFrame: number

    const animate = () => {
      currentOffset.current +=
        (targetOffset.current - currentOffset.current) * 0.08

      setOffset(currentOffset.current)

      animationFrame = requestAnimationFrame(animate)
    }

    handleScroll()
    animate()

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animationFrame)
    }
  }, [isMobile])

  const firstRowPartners = partners.slice(0, 5)
  const secondRowPartners = partners.slice(5, 10)

  const row1 = [...firstRowPartners, ...firstRowPartners, ...firstRowPartners]
  const row2 = [...secondRowPartners, ...secondRowPartners, ...secondRowPartners]

  return (
    <section
      ref={sectionRef}
      className="pt-20 pb-12 md:pt-32 md:pb-20 bg-[#050508] relative overflow-hidden"
    >
      <CyberParticles count={25} />

      <div className="absolute inset-0 data-stream" />
      <div className="absolute inset-0 hex-pattern opacity-30" />

      <div className="absolute top-20 left-10 w-96 h-96 border-l-2 border-t-2 border-[#f5b800]/10 animate-pulse hidden md:block" />
      <div className="absolute bottom-20 right-10 w-96 h-96 border-r-2 border-b-2 border-[#f5b800]/10 animate-pulse hidden md:block" />

      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#f5b800]/5 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#f5b800]/3 rounded-full blur-3xl animate-float-reverse" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <ScrollReveal animation="up">
          <div className="text-center mb-10 md:mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#f5b800]/10 border border-[#f5b800]/30 rounded-full mb-8">
              <Handshake className="w-6 h-6 text-[#f5b800]" />
              <span className="text-[#f5b800] tracking-[0.2em] font-medium">
                TRUSTED PARTNERS
              </span>
            </div>

            <p className="text-3xl sm:text-4xl md:text-6xl xl:text-7xl font-bold text-[#f0f0f5]">
              Partnering with{" "}
              <span className="text-[#f5b800] text-glow">
                Industry Leaders
              </span>
            </p>
          </div>
        </ScrollReveal>

        {/* Row 1 */}
        <div className="relative overflow-hidden py-5">
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-64 bg-gradient-to-r from-[#050508] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-64 bg-gradient-to-l from-[#050508] to-transparent z-10" />

          <div className="flex justify-center">
            <div
              className={`flex gap-4 md:gap-8 ${
                isMobile ? "animate-[marquee_30s_linear_infinite]" : ""
              }`}
              style={
                !isMobile
                  ? {
                      transform: `translate3d(${-offset}px,0,0)`,
                      willChange: "transform",
                    }
                  : undefined
              }
            >
              {row1.map((partner, index) => (
                <Link
                  key={`row1-${partner.name}-${index}`}
                  href={`/products/${partner.slug}`}
                >
                  <CyberCard className="flex-shrink-0 group">
                    <div className="flex items-center justify-center p-4 md:p-8 bg-[#121218] rounded-xl border border-[#2a2a36] hover:border-[#f5b800]/50 transition-all duration-500 w-48 md:w-72 h-32 md:h-44 overflow-hidden relative">

                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f5b800]/50 to-transparent animate-[scanline-move_2s_linear_infinite]" />
                      </div>

                      <div className="bg-white rounded-lg p-2 md:p-4 w-full h-full flex items-center justify-center">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          width={200}
                          height={90}
                          className="object-contain max-h-16 md:max-h-20 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                        />
                      </div>

                    </div>
                  </CyberCard>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative overflow-hidden py-5 mt-2">
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-64 bg-gradient-to-r from-[#050508] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-64 bg-gradient-to-l from-[#050508] to-transparent z-10" />

          <div className="flex justify-center">
            <div
              className={`flex gap-4 md:gap-8 ${
                isMobile
                  ? "animate-[marqueeReverse_34s_linear_infinite]"
                  : ""
              }`}
              style={
                !isMobile
                  ? {
                      transform: `translate3d(${offset}px,0,0)`,
                      willChange: "transform",
                    }
                  : undefined
              }
            >
              {row2.map((partner, index) => (
                <Link
                  key={`row2-${partner.name}-${index}`}
                  href={`/products/${partner.slug}`}
                >
                  <CyberCard className="flex-shrink-0 group">
                    <div className="flex items-center justify-center p-4 md:p-8 bg-[#121218] rounded-xl border border-[#2a2a36] hover:border-[#f5b800]/50 transition-all duration-500 w-48 md:w-72 h-32 md:h-44 overflow-hidden relative">

                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f5b800]/50 to-transparent animate-[scanline-move_2s_linear_infinite]" />
                      </div>

                      <div className="bg-white rounded-lg p-2 md:p-4 w-full h-full flex items-center justify-center">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          width={200}
                          height={90}
                          className="object-contain max-h-16 md:max-h-20 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                        />
                      </div>

                    </div>
                  </CyberCard>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}