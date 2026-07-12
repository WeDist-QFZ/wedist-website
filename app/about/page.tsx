import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Target, Eye, Users, Award, Globe, Handshake, Sparkles, Heart } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberCard } from "@/components/cyber-card"
import { CyberParticles } from "@/components/cyber-particles"
import { GlitchText } from "@/components/glitch-text"
import { AnimatedCounter } from "@/components/animated-counter"
import { HologramCard } from "@/components/hologram-card"
import { AnimatedGrid } from "@/components/animated-grid"
import { FloatingElements } from "@/components/floating-elements"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About WeDist Qatar | Technology Distributor for Leading Brands",
  description:
    "WeDist is a trusted technology distributor in Qatar, supporting customers with authorized solutions for security, networking, and storage brands.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] page-transition">
      <Header />

      <main className="pt-20 md:pt-28 lg:pt-32">
        <section className="py-9 md:py-16 cyber-grid relative overflow-hidden">
          <AnimatedGrid />
          <CyberParticles count={25} />
          <FloatingElements count={5} />

          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/4 w-[169px] md:w-[338px] h-[169px] md:h-[338px] bg-[#f5b800]/10 rounded-full blur-xl animate-float morph-bg" />
            <div className="absolute bottom-1/3 right-1/4 w-[141px] md:w-[281px] h-[141px] md:h-[281px] bg-[#f5b800]/5 rounded-full blur-xl animate-float-slow morph-bg" />
          </div>

          <div className="absolute top-10 left-6 w-32 h-32 border-l-2 border-t-2 border-[#f5b800]/20 hidden md:block" />
          <div className="absolute bottom-10 right-6 w-32 h-32 border-r-2 border-b-2 border-[#f5b800]/20 hidden md:block" />

          <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 relative z-10">
            <ScrollReveal animation="up">
              <div className="text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 bg-[#f5b800]/10 border border-[#f5b800]/30 rounded-full mb-3 md:mb-4">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-[#f5b800]" />
                  <span className="text-xs md:text-sm font-medium text-[#f5b800] tracking-[0.1em] md:tracking-[0.2em]">
                    ABOUT US
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold text-[#f0f0f5] mb-3 md:mb-4">
                  About{" "}
                  <GlitchText text="WeDist" className="text-[#f5b800] text-glow" autoGlitch glitchInterval={7000} />
                </h1>

                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#888899] leading-relaxed px-1">
                  We are a leading technology distribution company committed to empowering businesses with cutting-edge
                  solutions and delivering exceptional value to our partners.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="absolute inset-0 horizontal-scan pointer-events-none" />
        </section>

        <section className="py-9 md:py-16 bg-[#050508] relative overflow-hidden">
          <CyberParticles count={15} />
          <div className="absolute inset-0 hex-pattern opacity-30" />
          <div className="absolute inset-0 circuit-pattern opacity-20" />
          <div className="absolute top-1/4 left-6 w-20 md:w-44 h-20 md:h-44 bg-[#f5b800]/5 rounded-full blur-xl animate-float" />
          <div className="absolute bottom-1/4 right-6 w-28 md:w-56 h-28 md:h-56 bg-[#f5b800]/3 rounded-full blur-xl animate-float-reverse" />

          <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              <ScrollReveal animation="left" delay={0}>
                <CyberCard className="h-full" tiltEffect>
                  <HologramCard>
                    <div className="group relative p-3 md:p-6 bg-[#121218]/80 rounded-md border border-[#2a2a36] hover:border-[#f5b800]/50 transition-all duration-500 overflow-hidden h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#f5b800]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f5b800]/50 to-transparent animate-[scanline-move_2s_linear_infinite]" />
                        </div>
                      </div>

                      <div className="relative z-10">
                        <div className="inline-flex p-2 md:p-3 bg-[#f5b800]/10 rounded-md text-[#f5b800] mb-3 md:mb-6 group-hover:bg-[#f5b800]/20 transition-colors glow-yellow">
                          <Eye className="w-5 h-5 md:w-7 md:h-7" />
                        </div>
                        <h3 className="text-base md:text-xl font-semibold text-[#f0f0f5] mb-2 md:mb-3 group-hover:text-[#f5b800] transition-colors">
                          Our Vision
                        </h3>
                        <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-[#888899] leading-relaxed">
                          <p>To empower our customers and deliver world-class service.</p>
                          <p>
                            We aspire to bring technology from the world to local markets and expand local technology to
                            the world.
                          </p>
                          <p>
                            Our goal is to become the most esteemed and sustainable Global Technology Solutions
                            Distributor.
                          </p>
                        </div>
                      </div>
                    </div>
                  </HologramCard>
                </CyberCard>
              </ScrollReveal>

              <ScrollReveal animation="right" delay={100}>
                <CyberCard className="h-full" tiltEffect>
                  <HologramCard>
                    <div className="group relative p-3 md:p-6 bg-[#121218]/80 rounded-md border border-[#2a2a36] hover:border-[#f5b800]/50 transition-all duration-500 overflow-hidden h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#f5b800]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f5b800]/50 to-transparent animate-[scanline-move_2s_linear_infinite]" />
                        </div>
                      </div>

                      <div className="relative z-10">
                        <div className="inline-flex p-2 md:p-3 bg-[#f5b800]/10 rounded-md text-[#f5b800] mb-3 md:mb-6 group-hover:bg-[#f5b800]/20 transition-colors glow-yellow">
                          <Target className="w-5 h-5 md:w-7 md:h-7" />
                        </div>
                        <h3 className="text-base md:text-xl font-semibold text-[#f0f0f5] mb-2 md:mb-3 group-hover:text-[#f5b800] transition-colors">
                          Our Mission
                        </h3>
                        <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-[#888899] leading-relaxed">
                          <p>
                            We believe a green business is a commitment to society and the planet we live in, focusing
                            on an ecosystem for long-term health of the community as a priority over profitability.
                          </p>
                          <p>
                            Our mission is to promote and accelerate sustainable hardware solutions by providing the
                            right technology at the right worth that adds value for our customers.
                          </p>
                        </div>
                      </div>
                    </div>
                  </HologramCard>
                </CyberCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-9 md:py-16 bg-[#0a0a0f] relative overflow-hidden">
          <div className="absolute inset-0 hex-pattern opacity-20" />
          <div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-[#f5b800]/5 rounded-full blur-3xl animate-float" />

          <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 relative z-10">
            <ScrollReveal animation="up">
              <div className="text-center mb-8 md:mb-12">
                <div className="flex justify-center mb-6 md:mb-8">
                  <Image
                    src="/images/weappreciate2.png"
                    alt="WeAppreciate Logo"
                    width={300}
                    height={80}
                    className="w-[200px] md:w-[360px] h-auto"
                  />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0f0f5] mb-4">
                  Partner Rewards <span className="text-[#f5b800] text-glow">Programme</span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
              <ScrollReveal animation="left">
                <div className="space-y-3 md:space-y-4">
                  <CyberCard>
                    <div className="p-4 md:p-6 bg-[#121218] rounded-lg border border-[#2a2a36]">
                      <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className="p-2 md:p-3 bg-[#f5b800]/10 rounded-lg shrink-0">
                          <Heart className="w-5 h-5 md:w-6 md:h-6 text-[#f5b800]" />
                        </div>
                        <div>
                          <h3 className="text-base md:text-lg font-semibold text-[#f0f0f5] mb-2">
                            Recognizing Your Value
                          </h3>
                          <p className="text-[#888899] leading-relaxed text-xs sm:text-sm md:text-base">
                            At WeDist, we recognize the significance of our channel partners and aim to deliver
                            value-added services. The WeAppreciate programme rewards and incentivizes partners to
                            establish strong business relationships and drive customer satisfaction for steady business
                            growth.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CyberCard>

                  <CyberCard>
                    <div className="p-4 md:p-6 bg-[#121218] rounded-lg border border-[#2a2a36]">
                      <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                        <div className="p-2 md:p-3 bg-[#f5b800]/10 rounded-lg shrink-0">
                          <Award className="w-5 h-5 md:w-6 md:h-6 text-[#f5b800]" />
                        </div>
                        <div>
                          <h3 className="text-base md:text-lg font-semibold text-[#f0f0f5] mb-2">Mutual Success</h3>
                          <p className="text-[#888899] leading-relaxed text-xs sm:text-sm md:text-base">
                            As part of the WeAppreciate programme, we recognize your repute and are devoted to helping
                            all our partners achieve success. For your continuous participation, sincerity, and effort
                            toward mutual goals, we provide multiple benefits as appreciation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CyberCard>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="right">
                <CyberCard tiltEffect>
                  <HologramCard>
                    <div className="p-4 md:p-8 bg-[#121218] rounded-lg">
                      <h3 className="text-lg md:text-2xl font-bold text-[#f0f0f5] mb-4 md:mb-6">Growing Together</h3>
                      <p className="text-[#888899] leading-relaxed mb-4 md:mb-6 text-xs sm:text-sm md:text-base">
                        We aim to achieve maximum business potential and enhanced relationships with our partners. Being
                        mindful of the dynamic essence of the industry, we appreciate your unmatched effort.
                      </p>
                      <p className="text-[#888899] leading-relaxed mb-4 md:mb-6 text-xs sm:text-sm md:text-base">
                        For every business deal registered, we offer benefits as part of our commitment to mutual
                        growth, regardless of unforeseen challenges.
                      </p>
                      <p className="text-base md:text-xl font-semibold text-[#f5b800] text-glow">
                        Let&apos;s unfold together.
                      </p>
                    </div>
                  </HologramCard>
                </CyberCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-9 md:py-16 bg-[#050508] relative overflow-hidden">
          <div className="absolute inset-0 hex-pattern opacity-20" />
          <div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-[#f5b800]/5 rounded-full blur-3xl animate-float" />

          <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 relative z-10">
            <ScrollReveal animation="up">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-xs md:text-sm font-semibold text-[#f5b800] tracking-[0.2em] md:tracking-[0.3em] uppercase mb-3 md:mb-4">
                  // WHO WE ARE
                </h2>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f0f0f5]">
                  Your Trusted <span className="text-[#f5b800] text-glow">Technology</span> Partner
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
              <ScrollReveal animation="left">
                <div className="space-y-3 md:space-y-4 text-xs sm:text-sm md:text-base text-[#888899] leading-relaxed">
                  <p>
                    Founded with a vision to bridge the gap between world-class technology vendors and businesses,
                    WeDist has grown to become a leading technology distribution company in the region.
                  </p>
                  <p>
                    With years of experience, we have built strong relationships with global technology brands and
                    serve enterprise clients across various industries.
                  </p>
                  <p>
                    Our team of certified experts provides comprehensive pre-sales and post-sales support, ensuring
                    our partners and customers get the most value from their technology investments.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[
                  {
                    icon: <Users className="w-5 h-5 md:w-6 md:h-6" />,
                    title: "Customer First",
                    desc: "Your success is our priority",
                  },
                  {
                    icon: <Award className="w-5 h-5 md:w-6 md:h-6" />,
                    title: "Excellence",
                    desc: "Quality in everything we do",
                  },
                  {
                    icon: <Globe className="w-5 h-5 md:w-6 md:h-6" />,
                    title: "Sustainability",
                    desc: "Green business commitment",
                  },
                  {
                    icon: <Handshake className="w-5 h-5 md:w-6 md:h-6" />,
                    title: "Partnership",
                    desc: "Growing together",
                  },
                ].map((value, index) => (
                  <ScrollReveal key={index} animation="scale" delay={index * 100}>
                    <CyberCard className="h-full">
                      <div className="p-4 md:p-6 bg-[#121218] rounded-lg border border-[#2a2a36] hover:border-[#f5b800]/30 transition-all h-full group">
                        <div className="text-[#f5b800] mb-2 md:mb-3 group-hover:scale-110 transition-transform">
                          {value.icon}
                        </div>
                        <h4 className="text-[#f0f0f5] font-semibold text-sm md:text-base mb-1 md:mb-2 group-hover:text-[#f5b800] transition-colors">
                          {value.title}
                        </h4>
                        <p className="text-[#888899] text-xs md:text-sm">{value.desc}</p>
                      </div>
                    </CyberCard>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-9 md:py-16 bg-[#050508] relative overflow-hidden">
          <div className="absolute inset-0 hex-pattern opacity-20" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f5b800]/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f5b800]/30 to-transparent" />

          <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 relative z-10">
            <ScrollReveal animation="up">
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-xs md:text-sm font-semibold text-[#f5b800] tracking-[0.2em] md:tracking-[0.3em] uppercase mb-3 md:mb-4">
                  // BY THE NUMBERS
                </h2>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f0f0f5]">
                  Our <span className="text-[#f5b800] text-glow">Impact</span>
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {[
                { value: 500, suffix: "+", label: "Enterprise Clients" },
                { value: 10, suffix: "+", label: "Brand Partners" },
                { value: 15, suffix: "+", label: "Years Experience" },
                { value: 100, suffix: "+", label: "Certified Experts" },
              ].map((stat, index) => (
                <ScrollReveal key={index} animation="scale" delay={index * 100}>
                  <div className="text-center group rounded-md border border-[#2a2a36] bg-[#121218]/80 p-4 md:p-6">
                    <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5b800] mb-2 md:mb-3 group-hover:text-glow transition-all">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2500} />
                    </p>
                    <p className="text-[#888899] text-xs sm:text-sm md:text-base">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-9 md:py-16 bg-[#0a0a0f] cyber-grid relative overflow-hidden">
          <CyberParticles count={15} />
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[#f5b800]/5 rounded-full blur-3xl" />
          </div>
          <div className="max-w-4xl mx-auto px-2 sm:px-3 lg:px-4 text-center relative z-10">
            <ScrollReveal animation="scale">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#f0f0f5] mb-3 md:mb-6">
                Ready to <span className="text-[#f5b800] text-glow">Grow Together</span>?
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-[#888899] mb-6 md:mb-8 max-w-3xl mx-auto">
                Let’s explore how WeDist can support your next technology milestone with trusted brands, local expertise,
                and dependable partnership.
              </p>

              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-[#f5b800] text-[#0a0a0f] rounded-lg font-bold text-sm md:text-base hover:bg-[#c49400] transition-colors glow-yellow"
              >
                Get in Touch
              </a>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
