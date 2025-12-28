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
  const [scrollOffset, setScrollOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height)
        const offset = scrollProgress * 600
        setScrollOffset(offset)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const firstRowPartners = partners.slice(0, 5)
  const secondRowPartners = partners.slice(5, 10)

  const extendedFirstRow = [...firstRowPartners, ...firstRowPartners, ...firstRowPartners]
  const extendedSecondRow = [...secondRowPartners, ...secondRowPartners, ...secondRowPartners]

  return (
    <section ref={sectionRef} className="py-20 md:py-40 bg-[#050508] relative overflow-hidden">
      <CyberParticles count={25} />
      <div className="absolute inset-0 data-stream" />
      <div className="absolute inset-0 hex-pattern opacity-30" />
      <div className="absolute top-10 md:top-20 left-5 md:left-10 w-48 md:w-96 h-48 md:h-96 border-l-2 border-t-2 border-[#f5b800]/10 animate-pulse hidden sm:block" />
      <div className="absolute bottom-10 md:bottom-20 right-5 md:right-10 w-48 md:w-96 h-48 md:h-96 border-r-2 border-b-2 border-[#f5b800]/10 animate-pulse hidden sm:block" />
      <div className="absolute top-1/2 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#f5b800]/5 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/3 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[#f5b800]/3 rounded-full blur-3xl animate-float-reverse" />

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="up">
          <div className="text-center mb-12 md:mb-24">
            <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-[#f5b800]/10 border border-[#f5b800]/30 rounded-full mb-6 md:mb-8">
              <Handshake className="w-5 h-5 md:w-6 md:h-6 text-[#f5b800]" />
              <span className="text-sm md:text-base font-medium text-[#f5b800] tracking-[0.1em] md:tracking-[0.2em]">
                TRUSTED PARTNERS
              </span>
            </div>
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#f0f0f5]">
              Partnering with <span className="text-[#f5b800] text-glow">Industry Leaders</span>
            </p>
          </div>
        </ScrollReveal>

        <div className="relative overflow-hidden py-4 md:py-8">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-64 bg-gradient-to-r from-[#050508] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-64 bg-gradient-to-l from-[#050508] to-transparent z-10" />

          <div className="flex justify-center">
            <div
              className="flex gap-4 md:gap-8 transition-transform duration-100 ease-out"
              style={{
                transform: `translateX(${-scrollOffset}px)`,
              }}
            >
              {extendedFirstRow.map((partner, index) => (
                <Link key={`row1-${partner.name}-${index}`} href={`/products/${partner.slug}`}>
                  <CyberCard className="flex-shrink-0 group cursor-pointer">
                    <div className="flex items-center justify-center p-4 md:p-8 bg-[#121218] rounded-xl border border-[#2a2a36] hover:border-[#f5b800]/50 transition-all duration-500 w-48 md:w-72 h-32 md:h-44 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f5b800]/50 to-transparent animate-[scanline-move_2s_linear_infinite]" />
                      </div>
                      <div className="bg-white rounded-lg p-2 md:p-4 flex items-center justify-center w-full h-full">
                        <Image
                          src={partner.logo || "/placeholder.svg"}
                          alt={partner.name}
                          width={200}
                          height={90}
                          className="opacity-70 group-hover:opacity-100 transition-all group-hover:scale-110 duration-500 object-contain max-h-16 md:max-h-20"
                        />
                      </div>
                    </div>
                  </CyberCard>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden py-4 md:py-8 mt-2 md:mt-4">
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-64 bg-gradient-to-r from-[#050508] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-64 bg-gradient-to-l from-[#050508] to-transparent z-10" />

          <div className="flex justify-center">
            <div
              className="flex gap-4 md:gap-8 transition-transform duration-100 ease-out"
              style={{
                transform: `translateX(${scrollOffset}px)`,
              }}
            >
              {extendedSecondRow.map((partner, index) => (
                <Link key={`row2-${partner.name}-${index}`} href={`/products/${partner.slug}`}>
                  <CyberCard className="flex-shrink-0 group cursor-pointer">
                    <div className="flex items-center justify-center p-4 md:p-8 bg-[#121218] rounded-xl border border-[#2a2a36] hover:border-[#f5b800]/50 transition-all duration-500 w-48 md:w-72 h-32 md:h-44 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f5b800]/50 to-transparent animate-[scanline-move_2s_linear_infinite]" />
                      </div>
                      <div className="bg-white rounded-lg p-2 md:p-4 flex items-center justify-center w-full h-full">
                        <Image
                          src={partner.logo || "/placeholder.svg"}
                          alt={partner.name}
                          width={200}
                          height={90}
                          className="opacity-70 group-hover:opacity-100 transition-all group-hover:scale-110 duration-500 object-contain max-h-16 md:max-h-20"
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
