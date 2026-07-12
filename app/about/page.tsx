import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Target, Eye, Users, Award, Globe, Handshake, Sparkles, Heart } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberCard } from "@/components/cyber-card"
import { CyberParticles } from "@/components/cyber-particles"
import { GlitchText } from "@/components/glitch-text"
import { AnimatedCounter } from "@/components/animated-counter"
import Image from "next/image"
import { HologramCard } from "@/components/hologram-card"

export const metadata: Metadata = {
  title: "About WeDist Qatar | Technology Distributor for Leading Brands",
  description:
    "WeDist is a trusted technology distributor in Qatar, supporting customers with authorized solutions for security, networking, and storage brands.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Header />
      <main className="pt-20 md:pt-24 lg:pt-28">
        {/* Hero Section - Mobile responsive */}
        <section className="py-12 md:py-20 cyber-grid relative overflow-hidden">
          <CyberParticles count={20} />

          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/4 w-48 md:w-80 h-48 md:h-80 bg-[#f5b800]/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/3 right-1/4 w-40 md:w-64 h-40 md:h-64 bg-[#f5b800]/5 rounded-full blur-3xl animate-float-slow" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal animation="up">
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-[#f5b800]/10 border border-[#f5b800]/30 rounded-full mb-4 md:mb-6">
                  <Sparkles className="w-4 h-4 text-[#f5b800]" />
                  <span className="text-xs md:text-sm font-medium text-[#f5b800] tracking-wider">ABOUT US</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#f0f0f5] mb-4 md:mb-6">
                  About{" "}
                  <GlitchText text="WeDist" className="text-[#f5b800] text-glow" autoGlitch glitchInterval={6000} />
                </h1>
                <p className="text-base md:text-lg text-[#888899] leading-relaxed px-2">
                  We are a leading technology distribution company committed to empowering businesses with cutting-edge
                  solutions and delivering exceptional value to our partners.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Vision & Mission - Mobile responsive */}
        <section className="py-12 md:py-20 bg-[#050508] relative">
          <div className="absolute inset-0 circuit-pattern opacity-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              {/* Vision */}
              <ScrollReveal animation="left">
                <CyberCard tiltEffect>
                  <HologramCard>
                    <div className="p-6 md:p-10 relative overflow-hidden min-h-[300px] md:min-h-[400px]">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f5b800] via-[#f5b800]/50 to-transparent" />
                      <div className="relative z-10">
                        <div className="inline-flex p-4 md:p-5 bg-[#f5b800]/10 rounded-xl text-[#f5b800] mb-6 md:mb-8 group-hover:bg-[#f5b800]/20 transition-all duration-500 glow-yellow">
                          <Eye className="w-8 h-8 md:w-10 md:h-10" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#f0f0f5] group-hover:text-[#f5b800] transition-colors duration-500">Our Vision</h2>
                        <div className="space-y-3 md:space-y-4 text-[#888899] leading-relaxed text-base md:text-lg">
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

              {/* Mission */}
              <ScrollReveal animation="right">
                <CyberCard tiltEffect>
                  <HologramCard>
                    <div className="p-6 md:p-10 relative overflow-hidden min-h-[300px] md:min-h-[400px]">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#f5b800] via-[#f5b800]/50 to-transparent" />
                      <div className="relative z-10">
                        <div className="inline-flex p-4 md:p-5 bg-[#f5b800]/10 rounded-xl text-[#f5b800] mb-6 md:mb-8 group-hover:bg-[#f5b800]/20 transition-all duration-500 glow-yellow">
                          <Target className="w-8 h-8 md:w-10 md:h-10" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-[#f0f0f5] group-hover:text-[#f5b800] transition-colors duration-500">Our Mission</h2>
                        <div className="space-y-3 md:space-y-4 text-[#888899] leading-relaxed text-base md:text-lg">
                          <p>
                            We believe a green business is a commitment to society and the planet we live in, focusing
                            on an ecosystem for long-term health of the community as a priority over profitability.
                          </p>
                          <p>
                            The team at WeDist is convinced of the relevance and responsibility in handling IT products.
                            Our mission is to promote and accelerate Sustainable Hardware Solutions by providing the
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

        {/* WeAppreciate Section - Mobile responsive */}
        <section className="py-12 md:py-20 bg-[#0a0a0f] relative overflow-hidden">
          <div className="absolute inset-0 hex-pattern opacity-10" />
          <div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-[#f5b800]/5 rounded-full blur-3xl animate-float" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal animation="up">
              <div className="text-center mb-10 md:mb-16">
                <div className="flex justify-center mb-6 md:mb-8">
  <Image
    src="/images/weappreciate2.png"
    alt="WeAppreciate Logo"
    width={300}
    height={80}
    className="w-[200px] md:w-[400px] h-auto"
    // style={{
    //   filter:
    //     "drop-shadow(1px 0 white) drop-shadow(-1px 0 white) drop-shadow(0 1px white) drop-shadow(0 -1px white)",
    // }}
  />
</div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0f0f5] mb-4">
                  Partner Rewards <span className="text-[#f5b800] text-glow">Programme</span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <ScrollReveal animation="left">
                <div className="space-y-4 md:space-y-6">
                  <CyberCard>
                    <div className="p-6 md:p-8 bg-[#121218] rounded-xl border border-[#2a2a36]">
                      <div className="flex items-start gap-3 md:gap-4 mb-4">
                        <div className="p-2 md:p-3 bg-[#f5b800]/10 rounded-lg shrink-0">
                          <Heart className="w-5 h-5 md:w-6 md:h-6 text-[#f5b800]" />
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-semibold text-[#f0f0f5] mb-2">
                            Recognizing Your Value
                          </h3>
                          <p className="text-[#888899] leading-relaxed text-sm md:text-base">
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
                    <div className="p-6 md:p-8 bg-[#121218] rounded-xl border border-[#2a2a36]">
                      <div className="flex items-start gap-3 md:gap-4 mb-4">
                        <div className="p-2 md:p-3 bg-[#f5b800]/10 rounded-lg shrink-0">
                          <Award className="w-5 h-5 md:w-6 md:h-6 text-[#f5b800]" />
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-semibold text-[#f0f0f5] mb-2">Mutual Success</h3>
                          <p className="text-[#888899] leading-relaxed text-sm md:text-base">
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
                    <div className="p-6 md:p-10 bg-[#121218] rounded-xl">
                      <h3 className="text-xl md:text-2xl font-bold text-[#f0f0f5] mb-4 md:mb-6">Growing Together</h3>
                      <p className="text-[#888899] leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                        We aim to achieve maximum business potential and enhanced relationships with our partners. Being
                        mindful of the dynamic essence of the industry, we appreciate your unmatched effort.
                      </p>
                      <p className="text-[#888899] leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                        For every business deal registered, we offer benefits as part of our commitment to mutual
                        growth, regardless of unforeseen challenges.
                      </p>
                      <p className="text-lg md:text-xl font-semibold text-[#f5b800] text-glow">
                        Let's unfold together.
                      </p>
                    </div>
                  </HologramCard>
                </CyberCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* About Us Content - Mobile responsive */}
        <section className="py-12 md:py-20 bg-[#050508] cyber-grid relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-[#f5b800]/5 rounded-full blur-3xl animate-float" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
              <ScrollReveal animation="left">
                <div>
                  <h2 className="text-xs md:text-sm font-semibold text-[#f5b800] tracking-[0.2em] md:tracking-[0.3em] uppercase mb-3 md:mb-4">
                    // WHO WE ARE
                  </h2>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#f0f0f5] mb-6 md:mb-8">
                    Your Trusted <span className="text-[#f5b800] text-glow">Technology</span> Partner
                  </h3>
                  <div className="space-y-4 md:space-y-6 text-[#888899] leading-relaxed text-base md:text-lg">
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
                </div>
              </ScrollReveal>

              {/* Values Grid */}
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {[
                  {
                    icon: <Users className="w-6 h-6 md:w-7 md:h-7" />,
                    title: "Customer First",
                    desc: "Your success is our priority",
                  },
                  {
                    icon: <Award className="w-6 h-6 md:w-7 md:h-7" />,
                    title: "Excellence",
                    desc: "Quality in everything we do",
                  },
                  {
                    icon: <Globe className="w-6 h-6 md:w-7 md:h-7" />,
                    title: "Sustainability",
                    desc: "Green business commitment",
                  },
                  {
                    icon: <Handshake className="w-6 h-6 md:w-7 md:h-7" />,
                    title: "Partnership",
                    desc: "Growing together",
                  },
                ].map((value, index) => (
                  <ScrollReveal key={index} animation="scale" delay={index * 100}>
                    <CyberCard className="h-full">
                      <div className="p-5 md:p-8 bg-[#121218] rounded-lg border border-[#2a2a36] hover:border-[#f5b800]/30 transition-all h-full group">
                        <div className="text-[#f5b800] mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                          {value.icon}
                        </div>
                        <h4 className="text-[#f0f0f5] font-semibold text-base md:text-lg mb-1 md:mb-2 group-hover:text-[#f5b800] transition-colors">
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

        {/* Stats Section - Mobile responsive */}
        <section className="py-16 md:py-24 bg-[#0a0a0f] relative overflow-hidden">
          <div className="absolute inset-0 hex-pattern opacity-20" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f5b800]/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f5b800]/30 to-transparent" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <ScrollReveal animation="up">
              <div className="text-center mb-10 md:mb-16">
                <h2 className="text-xs md:text-sm font-semibold text-[#f5b800] tracking-[0.2em] md:tracking-[0.3em] uppercase mb-3 md:mb-4">
                  // BY THE NUMBERS
                </h2>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f0f0f5]">
                  Our <span className="text-[#f5b800] text-glow">Impact</span>
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {[
                { value: 500, suffix: "+", label: "Enterprise Clients" },
                { value: 10, suffix: "+", label: "Brand Partners" },
                { value: 15, suffix: "+", label: "Years Experience" },
                { value: 100, suffix: "+", label: "Certified Experts" },
              ].map((stat, index) => (
                <ScrollReveal key={index} animation="scale" delay={index * 100}>
                  <div className="text-center group">
                    <div className="relative inline-block">
                      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#f5b800] mb-2 md:mb-3 group-hover:text-glow transition-all">
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2500} />
                      </p>
                      <div className="absolute -bottom-1 md:-bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#f5b800] group-hover:w-full transition-all duration-500" />
                    </div>
                    <p className="text-[#888899] text-sm md:text-lg mt-2 md:mt-4">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
