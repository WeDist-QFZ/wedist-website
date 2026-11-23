"use client"

import Link from "next/link"
import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberParticles } from "@/components/cyber-particles"
import { GlitchText } from "@/components/glitch-text"
import { ProjectsMarquee } from "@/components/projects-marquee"
import type { ProjectLogo } from "@/lib/projects"

import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Calculator,
  Eye,
  FileText,
  GraduationCap,
  Handshake,
  Headset,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Target,
} from "lucide-react"

import { BRANDS, CHANNEL, COMPANY, PROJECTS, VERTICALS } from "./profile-data"
import { ChapterNav, CountUp, LogoPlate, SectionHeading, VERTICAL_ICON, cardCls, eyebrow, type Chapter } from "./ui"
import { ProfileHero } from "./hero"
import { SolutionExplorer } from "./solution-explorer"
import { StackBuilder } from "./stack-builder"

const CHAPTERS: Chapter[] = [
  { id: "intro", label: "Intro" },
  { id: "about", label: "Who we are" },
  { id: "flow", label: "How we fit in" },
  { id: "solutions", label: "Solutions" },
  { id: "brands", label: "Brands" },
  { id: "toolkit", label: "Partner toolkit" },
  { id: "plan", label: "Plan a project" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
]

const PROJECT_LOGOS = PROJECTS.map((p) => ({ name: p.name, src: p.src })) as ProjectLogo[]
const half = Math.ceil(PROJECT_LOGOS.length / 2)

/* -------------------------------------------------------------------------- */
/*  01 - Who we are                                                           */
/* -------------------------------------------------------------------------- */

function About() {
  return (
    <section id="about" className="relative py-20 md:py-28 bg-[#050508] overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 hex-pattern opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-start">
          <ScrollReveal animation="up">
            <div>
              <SectionHeading
                chapter="01"
                kicker="WHO WE ARE"
                title={
                  <>
                    A value-added distributor, <span className="text-[#f5b800]">built for the channel</span>
                  </>
                }
              />
              <div className="-mt-4 space-y-4 text-[#888899] text-base md:text-lg leading-relaxed">
                <p>
                  WeDist is a technology distribution company based in Qatar Free Zones. We bring leading global brands
                  in video surveillance, access control, networking and data storage to the Qatar market - and stand
                  behind them with pre-sales design and post-sales support from a team of certified experts.
                </p>
                <p>
                  We work through the channel. Our partners get the right product, the right price and the engineering
                  help to win and deliver projects - from a single camera schedule to a full ELV package.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="up">
            <div className={`${cardCls} p-6 md:p-8 relative overflow-hidden`}>
              <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-[#f5b800]/10 blur-3xl" />
              <p className={eyebrow}>AT A GLANCE</p>
              <dl className="mt-5 divide-y divide-[#2a2a36]">
                {[
                  ["Company", COMPANY.legalName],
                  ["Headquarters", "Business Innovation Park, Ras Bufontas Free Zone, Doha"],
                  ["Business model", "Two-tier distribution through the channel"],
                  ["Portfolio", `${BRANDS.length} global brands across ${VERTICALS.length} verticals`],
                  ["Verticals", VERTICALS.map((v) => v.short).join(" · ")],
                  ["Partner programme", "WeAppreciate"],
                ].map(([k, v]) => (
                  <div key={k} className="py-3.5 grid grid-cols-[130px_1fr] gap-4">
                    <dt className="text-sm text-[#888899]">{k}</dt>
                    <dd className="text-sm text-[#f0f0f5] font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-4">
          {[
            {
              icon: Eye,
              title: "Vision",
              text: "To empower our customers with world-class service - bringing global technology to local markets, and growing into a sustainable global technology solutions distributor.",
            },
            {
              icon: Target,
              title: "Mission",
              text: "To deliver the right technology at the right value, and to promote sustainable hardware solutions that put the long-term health of our community first.",
            },
            {
              icon: Leaf,
              title: "Values",
              text: "Customer first. Excellence in everything we do. A green business commitment. Partnership - growing together.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <ScrollReveal key={title} animation="up">
              <div className={`${cardCls} group p-6 h-full hover:border-[#f5b800]/40 hover:-translate-y-1 transition-all duration-300`}>
                <div className="w-11 h-11 rounded-xl bg-[#f5b800]/10 border border-[#f5b800]/30 flex items-center justify-center text-[#f5b800] group-hover:bg-[#f5b800] group-hover:text-[#0a0a0f] transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-[#f0f0f5]">{title}</h3>
                <p className="mt-2 text-sm text-[#888899] leading-relaxed">{text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  02 - How we fit in (value chain)                                          */
/* -------------------------------------------------------------------------- */

function FlowNode({
  step,
  title,
  sub,
  highlight,
  children,
}: {
  step: string
  title: string
  sub: string
  highlight?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={`relative rounded-2xl p-5 md:p-6 h-full ${
        highlight
          ? "bg-gradient-to-b from-[#f5b800]/[0.14] to-[#121218] border-2 border-[#f5b800]/70 shadow-[0_0_50px_-12px_rgba(245,184,0,0.6)]"
          : "bg-[#121218]/90 border border-[#2a2a36]"
      }`}
    >
      <p className={`text-[10px] tracking-[0.25em] ${highlight ? "text-[#f5b800]" : "text-[#888899]"}`}>{step}</p>
      <h3 className={`mt-2 text-xl font-bold ${highlight ? "text-[#f5b800]" : "text-[#f0f0f5]"}`}>{title}</h3>
      <p className="mt-1 text-xs text-[#888899]">{sub}</p>
      <div className="mt-5">{children}</div>
    </div>
  )
}

function Connector() {
  return (
    <div aria-hidden className="relative flex items-center justify-center lg:w-10 h-8 lg:h-auto">
      <div className="absolute lg:inset-x-0 lg:top-1/2 lg:h-px lg:w-auto inset-y-0 left-1/2 w-px bg-gradient-to-b lg:bg-gradient-to-r from-[#f5b800]/10 via-[#f5b800]/60 to-[#f5b800]/10" />
      <span className="absolute w-2 h-2 rounded-full bg-[#f5b800] shadow-[0_0_10px_#f5b800] wd-travel" />
    </div>
  )
}

function Flow() {
  const sectors = ["Hospitality", "Telecom", "Finance", "Logistics", "Retail", "Education", "Free zones"]
  return (
    <section id="flow" className="relative py-20 md:py-28 bg-[#0a0a0f] overflow-hidden scroll-mt-24">
      <CyberParticles count={10} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          chapter="02"
          kicker="HOW WE FIT IN"
          title={
            <>
              From the world&apos;s vendors <span className="text-[#f5b800]">to Qatar&apos;s projects</span>
            </>
          }
          text="Vendors reach the market through us. Partners get one source for product, design help and support. Projects get technology that is specified, stocked and backed locally."
        />

        <ScrollReveal animation="up">
          <div className="flex flex-col lg:flex-row items-stretch">
            <div className="lg:flex-1">
              <FlowNode step="SOURCE" title="Global vendors" sub={`${BRANDS.length} global brands`}>
                <div className="grid grid-cols-5 gap-1.5">
                  {BRANDS.map((b) => (
                    <LogoPlate key={b.slug} src={b.logo} name={b.name} className="h-8 [&_span]:text-[6px]" imgClassName="max-h-[70%] max-w-[85%]" />
                  ))}
                </div>
              </FlowNode>
            </div>
            <Connector />
            <div className="lg:flex-[1.15]">
              <FlowNode step="DISTRIBUTE" title="WeDist" sub="Ras Bufontas Free Zone, Doha" highlight>
                <ul className="space-y-2.5">
                  {[
                    [ShieldCheck, "Authorised distribution"],
                    [Headset, "Pre-sales design support"],
                    [GraduationCap, "Certified training"],
                    [Handshake, "Post-sales support"],
                  ].map(([Icon, t]) => {
                    const I = Icon as React.ComponentType<{ className?: string }>
                    return (
                      <li key={t as string} className="flex items-center gap-2.5 text-sm text-[#f0f0f5]">
                        <I className="w-4 h-4 text-[#f5b800] shrink-0" /> {t as string}
                      </li>
                    )
                  })}
                </ul>
              </FlowNode>
            </div>
            <Connector />
            <div className="lg:flex-1">
              <FlowNode step="BUILD" title="Channel partners" sub="Who we sell through">
                <div className="flex flex-wrap gap-1.5">
                  {CHANNEL.map((c) => (
                    <span key={c} className="px-2.5 py-1 text-xs rounded-md border border-[#2a2a36] bg-[#0d0d13] text-[#c8c8d4]">
                      {c}
                    </span>
                  ))}
                </div>
              </FlowNode>
            </div>
            <Connector />
            <div className="lg:flex-1">
              <FlowNode step="DELIVER" title="Qatar's projects" sub="Sectors we power">
                <div className="flex flex-wrap gap-1.5">
                  {sectors.map((c) => (
                    <span key={c} className="px-2.5 py-1 text-xs rounded-md border border-[#f5b800]/25 bg-[#f5b800]/[0.05] text-[#f5b800]">
                      {c}
                    </span>
                  ))}
                </div>
              </FlowNode>
            </div>
          </div>
        </ScrollReveal>
      </div>
      <style>{`
        @keyframes wd-travel-x { 0% { left: 0; opacity: 0 } 15% { opacity: 1 } 85% { opacity: 1 } 100% { left: calc(100% - 8px); opacity: 0 } }
        @keyframes wd-travel-y { 0% { top: 0; opacity: 0 } 15% { opacity: 1 } 85% { opacity: 1 } 100% { top: calc(100% - 8px); opacity: 0 } }
        .wd-travel { animation: wd-travel-y 1.8s ease-in-out infinite }
        @media (min-width: 1024px) { .wd-travel { animation-name: wd-travel-x; top: calc(50% - 4px) } }
        @media (prefers-reduced-motion: reduce) { .wd-travel { animation: none; opacity: 0 } }
      `}</style>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  04 - Brand wall                                                           */
/* -------------------------------------------------------------------------- */

function BrandWall() {
  return (
    <section id="brands" className="relative py-20 md:py-28 bg-[#050508] overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 hex-pattern opacity-15" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          chapter="04"
          kicker="BRAND PORTFOLIO"
          title={
            <>
              <CountUp to={BRANDS.length} /> brands we&apos;re proud to <span className="text-[#f5b800]">represent</span>
            </>
          }
          text="Authorised distribution of the brands Qatar's integrators specify. Hover a brand to see what it stands for."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {BRANDS.map((b) => {
            const Icon = VERTICAL_ICON[b.vertical]
            const v = VERTICALS.find((x) => x.id === b.vertical)
            return (
              <Link
                key={b.slug}
                href={`/products/${b.slug}`}
                style={{ "--accent": b.accent } as React.CSSProperties}
                className="group relative rounded-2xl border border-[#2a2a36] bg-[#121218]/90 p-3 md:p-4 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--accent)] hover:shadow-[0_18px_50px_-18px_var(--accent)]"
              >
                <span className="absolute inset-x-0 top-0 h-[3px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                <LogoPlate src={b.logo} name={b.name} className="h-20 md:h-24" />
                <div className="mt-4 px-1">
                  <h3 className="font-bold text-[#f0f0f5] leading-tight">{b.name}</h3>
                  <p className="mt-1.5 text-xs italic text-[#888899] leading-snug min-h-[2.5em]">&ldquo;{b.tagline}&rdquo;</p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-[11px]">
                    <span className="inline-flex items-center gap-1 text-[#c8c8d4]">
                      <Icon className="w-3.5 h-3.5 text-[#f5b800]" /> {v?.short}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#888899] group-hover:text-[#f5b800] transition-colors">
                      View products <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  05 - Partner toolkit (bento)                                              */
/* -------------------------------------------------------------------------- */

function MiniBays() {
  const hues = [45, 45, 45, 45, 45, 190, 190, 190, 190, 190, 285, 285, 285, 285, 285, 45, 190, 285, 0, 0]
  return (
    <div className="grid grid-cols-10 gap-1.5" aria-hidden>
      {hues.map((h, i) =>
        h ? (
          <span
            key={i}
            className="aspect-square rounded-[3px] border wd-blink"
            style={{
              borderColor: `hsl(${h} 75% 55%)`,
              background: i % 5 >= 3 && i < 15
                ? `repeating-linear-gradient(45deg, hsl(${h} 75% 55% / .55) 0 3px, hsl(${h} 75% 55% / .12) 3px 6px)`
                : `hsl(${h} 75% 50% / .22)`,
              animationDelay: `${(i * 0.37) % 3}s`,
            }}
          />
        ) : (
          <span key={i} className="aspect-square rounded-[3px] border border-[#2a2a36] bg-[#0f0f15]" />
        ),
      )}
    </div>
  )
}

function Tile({
  href,
  icon: Icon,
  title,
  text,
  className = "",
  children,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  text: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className={`group relative rounded-2xl border border-[#2a2a36] bg-[#121218]/90 p-6 overflow-hidden hover:border-[#f5b800]/60 hover:shadow-[0_0_40px_-14px_rgba(245,184,0,0.6)] transition-all duration-300 flex flex-col ${className}`}
    >
      <div className="flex items-start justify-between">
        <Icon className="w-7 h-7 text-[#f5b800]" />
        <ArrowUpRight className="w-5 h-5 text-[#555566] group-hover:text-[#f5b800] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-[#f0f0f5]">{title}</h3>
      <p className="mt-1.5 text-sm text-[#888899] leading-relaxed">{text}</p>
      {children}
    </Link>
  )
}

function Toolkit() {
  return (
    <section id="toolkit" className="relative py-20 md:py-28 bg-[#0a0a0f] overflow-hidden scroll-mt-24">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          chapter="05"
          kicker="PARTNER TOOLKIT"
          title={
            <>
              More than a price list - <span className="text-[#f5b800]">tools that help you win</span>
            </>
          }
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:auto-rows-fr">
          <Tile
            href="/storagecalc"
            icon={Calculator}
            title="DSA Report Generator"
            text="Size CCTV storage across controllers and JBODs, plan RAID 5 / RAID 6 arrays and export a ready-to-submit DSA storage calculation PDF."
            className="sm:col-span-2 lg:row-span-2 bg-gradient-to-br from-[#f5b800]/[0.10] to-[#121218] border-[#f5b800]/40"
          >
            <div className="mt-auto pt-8">
              <MiniBays />
              <span className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#f5b800] text-[#0a0a0f] text-sm font-semibold group-hover:shadow-[0_0_24px_rgba(245,184,0,0.5)] transition-shadow">
                Open the tool <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Tile>
          <Tile
            href="/products"
            icon={FileText}
            title="Product datasheets"
            text="Datasheets for our most-requested products, one click from each product page."
          />
          <Tile
            href="/events"
            icon={GraduationCap}
            title="Certified training"
            text="Vendor-certified programmes such as Digifort certified training for your engineers."
          />
          <Tile
            href="/contact"
            icon={Headset}
            title="Pre-sales design"
            text="Our certified team helps size, design and specify the solution before you quote."
          />
          <Tile
            href="/resources"
            icon={BookOpen}
            title="Resources"
            text="Guides, references and articles - from surveillance storage to licensing how-tos."
          />
          <Link
            href="/contact"
            className="group sm:col-span-2 lg:col-span-4 relative rounded-2xl border border-dashed border-[#f5b800]/40 bg-[#f5b800]/[0.04] p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 hover:border-[#f5b800]/80 hover:bg-[#f5b800]/[0.08] transition-all"
          >
            <Award className="w-10 h-10 text-[#f5b800] shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-bold text-[#f0f0f5]">WeAppreciate partner programme</h3>
              <p className="mt-1 text-sm text-[#888899]">
                Rewards for channel partners who build strong business relationships and drive customer satisfaction
                with us.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-[#f5b800] font-semibold whitespace-nowrap">
              Join the programme <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
      <style>{`@keyframes wd-blink{0%,92%,100%{filter:none}95%{filter:brightness(1.9)}}.wd-blink{animation:wd-blink 3.2s ease-in-out infinite}@media (prefers-reduced-motion: reduce){.wd-blink{animation:none}}`}</style>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  07 - Projects                                                             */
/* -------------------------------------------------------------------------- */

function Projects() {
  return (
    <section id="projects" className="relative py-20 md:py-24 bg-[#050508] overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          center
          chapter="07"
          kicker="POWERING AMBITIOUS PROJECTS"
          title={
            <>
              Trusted on sites <span className="text-[#f5b800]">across Qatar</span>
            </>
          }
          text="Technology we distribute is deployed at hotels, telecom, finance, logistics and public-sector sites."
        />
      </div>
      <ProjectsMarquee logos={PROJECT_LOGOS.slice(0, half)} />
      <ProjectsMarquee logos={PROJECT_LOGOS.slice(half)} reverse offsetPhase={140} />
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  08 - Contact                                                              */
/* -------------------------------------------------------------------------- */

function Contact() {
  const cards = [
    {
      icon: MapPin,
      label: "Visit us",
      value: COMPANY.address.join(", "),
      href: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(`${COMPANY.legalName}, Business Innovation Park, Ras Bufontas Free Zone, Doha`),
    },
    { icon: Phone, label: "Call", value: COMPANY.phone, href: COMPANY.phoneHref },
    { icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with our team", href: COMPANY.whatsapp },
  ]
  return (
    <section id="contact" className="relative py-20 md:py-32 bg-[#0a0a0f] overflow-hidden scroll-mt-24">
      <CyberParticles count={15} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[460px] bg-[#f5b800]/10 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className={`${eyebrow} flex items-center justify-center gap-3`}>
          <span className="text-[#f5b800]/50">08</span>
          <span className="h-px w-8 bg-[#f5b800]/40" />
          LET&apos;S WORK TOGETHER
        </p>
        <h2 className="mt-5 text-5xl md:text-7xl lg:text-8xl font-bold text-[#f0f0f5] leading-[1.02]">
          We Empower.
          <br />
          <GlitchText text="We Deliver." className="text-[#f5b800] text-glow" autoGlitch glitchInterval={5000} />
        </h2>
        <p className="mt-6 text-lg text-[#888899] max-w-xl mx-auto">
          Become a WeDist partner, request a quotation or get design support for your next project.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="relative overflow-hidden group px-8 py-4 text-lg font-semibold rounded-lg inline-flex items-center justify-center gap-2 bg-[#f5b800] text-[#0a0a0f] hover:shadow-[0_0_30px_rgba(245,184,0,0.5)] transition-all"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 inline-flex items-center gap-2">
              <Handshake className="w-5 h-5" /> Become a partner
            </span>
          </Link>
          <a
            href="#plan"
            className="px-8 py-4 text-lg font-semibold text-[#f5b800] border-2 border-[#f5b800]/50 rounded-lg hover:bg-[#f5b800]/10 transition-all inline-flex items-center justify-center gap-2"
          >
            Plan your project
          </a>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
          {cards.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`${cardCls} group p-5 flex gap-4 items-start hover:border-[#f5b800]/50 transition-colors`}
            >
              <span className="w-10 h-10 rounded-lg bg-[#f5b800]/10 border border-[#f5b800]/30 flex items-center justify-center text-[#f5b800] shrink-0 group-hover:bg-[#f5b800] group-hover:text-[#0a0a0f] transition-colors">
                <Icon className="w-5 h-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-[#888899]">{label}</span>
                <span className="block mt-0.5 text-sm text-[#f0f0f5] leading-snug break-words">{value}</span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {COMPANY.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#888899] hover:text-[#f5b800] inline-flex items-center gap-1"
            >
              {s.label} <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
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
      <ChapterNav chapters={CHAPTERS} />
      <main className="pt-20 md:pt-28 lg:pt-32">
        <ProfileHero />
        <About />
        <Flow />
        <SolutionExplorer />
        <BrandWall />
        <Toolkit />
        <StackBuilder />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
