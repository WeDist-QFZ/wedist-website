"use client"

import Link from "next/link"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberParticles } from "@/components/cyber-particles"
import { ProjectsMarquee } from "@/components/projects-marquee"
import type { ProjectLogo } from "@/lib/projects"

import {
  Award,
  Briefcase,
  Eye,
  Handshake,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react"

import { CHANNEL, COMPANY, PROJECTS } from "./profile-data"
import { CardIcon, SiteCard, SiteHeading, btnPrimary, btnSecondary, wrap } from "./ui"
import { ProfileHero } from "./hero"
import { StackBuilder } from "./stack-builder"

const PROJECT_LOGOS = PROJECTS.map((p) => ({ name: p.name, src: p.src })) as ProjectLogo[]
const half = Math.ceil(PROJECT_LOGOS.length / 2)

/* -------------------------------------------------------------------------- */
/*  Who we are + Vision / Mission / Values                                     */
/* -------------------------------------------------------------------------- */

function WhoWeAre() {
  const statements = [
    {
      icon: Eye,
      title: "Our Vision",
      text: "To empower our customers with world-class service - bringing world technology to local markets, and growing into a sustainable global technology solutions distributor.",
    },
    {
      icon: Target,
      title: "Our Mission",
      text: "To promote sustainable hardware solutions by offering the right technology at the right value, with the long-term health of our community first.",
    },
  ]
  const values = [
    ["Customer First", "Your success is our priority"],
    ["Excellence", "Quality in everything we do"],
    ["Sustainability", "Green business commitment"],
    ["Partnership", "Growing together"],
  ]

  return (
    <section id="about" className="py-12 md:py-20 bg-[#050508] relative overflow-hidden scroll-mt-24">
      <CyberParticles count={15} />
      <div className="absolute inset-0 hex-pattern opacity-30" />
      <div className="absolute inset-0 circuit-pattern opacity-20" />
      <div className="absolute top-1/4 left-6 w-20 md:w-44 h-20 md:h-44 bg-[#f5b800]/5 rounded-full blur-xl animate-float" />

      <div className={`${wrap} relative z-10 grid lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-16 items-center`}>
        <ScrollReveal animation="left">
          <div>
            <SiteHeading
              align="left"
              icon={Users}
              badge="WHO WE ARE"
              title={
                <>
                  A trusted bridge between <span className="text-[#f5b800] text-glow">global vendors</span> and
                  Qatar&apos;s projects
                </>
              }
            />
            <div className="space-y-4 text-sm md:text-base lg:text-lg text-[#888899] leading-relaxed">
              <p>
                We bring the brands Qatar&apos;s integrators specify into the market, and stand behind them with
                pre-sales design and post-sales support from a team of certified experts.
              </p>
              <p>
                We work through the channel - giving our partners the right product, the right value and the
                engineering help to win and deliver projects, from a single camera schedule to a full ELV package.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-1.5 md:gap-2">
              {CHANNEL.map((c) => (
                <span
                  key={c}
                  className="px-2 md:px-3 py-1 md:py-1.5 bg-[#1a1a24] border border-[#2a2a36] rounded-full text-xs md:text-sm text-[#f5b800]"
                >
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-6 flex items-start gap-2 text-xs md:text-sm text-[#888899]">
              <MapPin className="w-4 h-4 text-[#f5b800] shrink-0 mt-0.5" />
              {COMPANY.address.join(", ")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-3 md:gap-5">
          {statements.map((s, i) => (
            <ScrollReveal key={s.title} animation="right" delay={i * 100}>
              <SiteCard>
                <CardIcon icon={s.icon} />
                <h3 className="text-base md:text-xl font-semibold text-[#f0f0f5] mb-2 md:mb-3 group-hover:text-[#f5b800] transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs md:text-sm text-[#888899] leading-relaxed">{s.text}</p>
              </SiteCard>
            </ScrollReveal>
          ))}
          <div className="sm:col-span-2">
            <ScrollReveal animation="right" delay={200}>
              <SiteCard>
                <div className="flex items-center gap-3 mb-4 md:mb-5">
                  <div className="inline-flex p-2 md:p-3 bg-[#f5b800]/10 rounded-md text-[#f5b800] group-hover:bg-[#f5b800]/20 transition-colors glow-yellow">
                    <Leaf className="w-5 h-5 md:w-7 md:h-7" />
                  </div>
                  <h3 className="text-base md:text-xl font-semibold text-[#f0f0f5] group-hover:text-[#f5b800] transition-colors">
                    Our Values
                  </h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {values.map(([t, d]) => (
                    <div key={t} className="border-l-2 border-[#f5b800]/40 pl-3">
                      <p className="text-sm md:text-base font-semibold text-[#f0f0f5]">{t}</p>
                      <p className="mt-0.5 text-xs md:text-sm text-[#888899]">{d}</p>
                    </div>
                  ))}
                </div>
              </SiteCard>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  WeAppreciate                                                              */
/* -------------------------------------------------------------------------- */

function WeAppreciate() {
  const benefits = [
    {
      icon: Award,
      title: "Recognising Your Value",
      text: "Our partners matter to us - and we back that with value-added services that help your business grow.",
    },
    {
      icon: Handshake,
      title: "Mutual Success",
      text: "Multiple benefits that reward your continued participation and the effort you put into every project.",
    },
    {
      icon: TrendingUp,
      title: "Growing Together",
      text: "Benefits on every business deal you register with us - the more we build together, the more you earn.",
    },
  ]
  return (
    <section className="py-12 md:py-20 bg-[#0a0a0f] cyber-grid relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[900px] h-[300px] md:h-[500px] bg-[#f5b800]/5 rounded-full blur-3xl" />
      </div>
      <div className={`${wrap} relative z-10`}>
        <ScrollReveal animation="up">
          <SiteHeading
            icon={Sparkles}
            badge="PARTNER REWARDS PROGRAMME"
            title={
              <>
                We<span className="text-[#f5b800] text-glow">Appreciate</span>
              </>
            }
            text="Our partner programme rewards channel partners for building strong business relationships and driving customer satisfaction."
          />
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-3 md:gap-6">
          {benefits.map((b, i) => (
            <ScrollReveal key={b.title} animation="scale" delay={i * 100}>
              <SiteCard>
                <CardIcon icon={b.icon} />
                <h3 className="text-base md:text-xl font-semibold text-[#f0f0f5] mb-2 md:mb-3 group-hover:text-[#f5b800] transition-colors">
                  {b.title}
                </h3>
                <p className="text-xs md:text-sm text-[#888899] leading-relaxed">{b.text}</p>
              </SiteCard>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-8 md:mt-10 text-center">
          <Link href="/contact" className={btnPrimary}>
            Become a Partner
          </Link>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Projects                                                                  */
/* -------------------------------------------------------------------------- */

function Projects() {
  return (
    <section className="py-12 md:py-20 bg-[#050508] relative overflow-hidden">
      <div className={wrap}>
        <ScrollReveal animation="up">
          <SiteHeading
            icon={Briefcase}
            badge="OUR PROJECTS"
            title={
              <>
                Powering <span className="text-[#f5b800] text-glow">Ambitious Projects</span>
              </>
            }
            text="Technology we distribute is deployed at hotels, telecom, finance, logistics and public-sector sites across Qatar."
          />
        </ScrollReveal>
      </div>
      <ProjectsMarquee logos={PROJECT_LOGOS.slice(0, half)} />
      <ProjectsMarquee logos={PROJECT_LOGOS.slice(half)} reverse offsetPhase={140} />
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Contact CTA                                                               */
/* -------------------------------------------------------------------------- */

function Contact() {
  return (
    <section id="contact" className="py-12 md:py-20 bg-[#0a0a0f] cyber-grid relative overflow-hidden">
      <CyberParticles count={15} />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-[#f5b800]/5 rounded-full blur-3xl" />
      </div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <ScrollReveal animation="scale">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#f0f0f5] mb-3 md:mb-6">
            Ready to <span className="text-[#f5b800] text-glow">Grow Together</span>?
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-[#888899] mb-6 md:mb-8 max-w-3xl mx-auto">
            Become a WeDist partner, request a quotation or get design support for your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link href="/contact" className={btnPrimary}>
              Get in Touch
            </Link>
            <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5" /> WhatsApp us
            </a>
          </div>
          <div className="mt-8 md:mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs md:text-sm text-[#888899]">
            <a href={COMPANY.phoneHref} className="inline-flex items-center gap-2 hover:text-[#f5b800] transition-colors">
              <Phone className="w-4 h-4 text-[#f5b800]" /> {COMPANY.phone}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="inline-flex items-center gap-2 hover:text-[#f5b800] transition-colors">
              <Mail className="w-4 h-4 text-[#f5b800]" /> {COMPANY.email}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function CompanyProfile() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] page-transition">
      <Header />
      <main className="pt-20 md:pt-28 lg:pt-32">
        <ProfileHero />
        <WhoWeAre />
        <WeAppreciate />
        <StackBuilder />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
