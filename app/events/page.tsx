import type { Metadata } from "next"
import Link from "next/link"
import {
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { events, type EventItem } from "@/lib/events"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberParticles } from "@/components/cyber-particles"
import { CyberCard } from "@/components/cyber-card"
import { NeonBorder } from "@/components/neon-border"
import { GlitchText } from "@/components/glitch-text"

export const metadata: Metadata = {
  title: "Events | WeDist",
  description:
    "Explore all WeDist events, webinars, workshops, and training opportunities.",
}

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Header />

      <main>
        <section className="relative overflow-hidden cyber-grid pt-24 pb-12 md:pt-32 md:pb-16">
          <CyberParticles count={12} />

          <div className="absolute top-1/4 right-0 h-[260px] w-[260px] rounded-full bg-[#f5b800]/5 blur-3xl animate-float md:h-[520px] md:w-[520px]" />
          <div className="absolute bottom-0 left-0 h-[220px] w-[220px] rounded-full bg-[#f5b800]/5 blur-3xl animate-float-slow md:h-[420px] md:w-[420px]" />

          <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <ScrollReveal animation="up">
              <div className="mb-8">
                <Link
                  href="/#events"
                  className="inline-flex items-center gap-2 rounded-full border border-[#2a2a36] bg-[#121218]/80 px-4 py-2 text-sm text-[#cfd0da] transition-all hover:border-[#f5b800]/40 hover:text-[#f5b800]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#f5b800]/30 bg-[#f5b800]/10 px-4 py-2">
                <Sparkles className="h-4 w-4 text-[#f5b800]" />
                <span className="text-xs font-medium tracking-[0.2em] text-[#f5b800]">
                  ALL EVENTS
                </span>
              </div>

              <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-tight text-[#f0f0f5] md:text-6xl">
                <GlitchText
                                  text="Events"
                                  className="text-[#f5b800] text-glow"
                                  autoGlitch
                                  glitchInterval={10000}
                                /> & Workshops
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-[#b4b4c0] md:text-lg">
                Explore WeDist webinars, training sessions, workshops, and special
                events. Browse all upcoming opportunities and open each event for
                full details or registration where available.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#f5b800]/20 bg-[#f5b800]/10 px-4 py-2 text-sm text-[#f5b800]">
                  <Calendar className="h-4 w-4" />
                  {events.length} Events
                </span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="relative pb-20 md:pb-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 xl:grid-cols-3">
              {events.map((event, index) => (
                <ScrollReveal key={`${event.id}-${index}`} animation="up" delay={index * 80}>
                  <EventPageCard event={event} highlight={index === 0} />
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

function EventPageCard({
  event,
  highlight,
}: {
  event: EventItem
  highlight: boolean
}) {
  const isClickable = Boolean(event.slug)

  const card = (
    <CyberCard className="h-full" tiltEffect={isClickable}>
      <NeonBorder animate={highlight}>
        <div className="group relative flex min-h-[340px] h-full flex-col overflow-hidden p-6 md:min-h-[390px] md:p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f5b800]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative z-10 mb-6 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#f5b800]/20 bg-[#f5b800]/10 px-3 py-1.5 text-sm text-[#f5b800]">
              <Calendar className="h-4 w-4" />
              {event.date}
            </div>

            {event.hasForm ? (
              <span className="rounded-full bg-[#f5b800] px-3 py-1 text-[10px] font-bold text-[#0a0a0f]">
                REGISTRATION OPEN
              </span>
            ) : event.slug ? (
              <span className="rounded-full border border-[#f5b800]/30 bg-[#f5b800]/10 px-3 py-1 text-[10px] font-bold text-[#f5b800]">
                EVENT DETAILS
              </span>
            ) : (
              <span className="rounded-full border border-[#2a2a36] px-3 py-1 text-[10px] font-bold text-[#a4a4b3]">
                EVENT INFO
              </span>
            )}
          </div>

          <h2 className="relative z-10 mb-3 text-2xl font-semibold text-[#f0f0f5] transition-colors group-hover:text-[#f5b800]">
            {event.title}
          </h2>

          <p className="relative z-10 mb-6 flex-grow text-[16px] leading-7 text-[#aeb0ba]">
            {event.description}
          </p>

          <div className="relative z-10 space-y-3 border-t border-[#2a2a36] pt-5 text-sm text-[#b4b4c0]">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#f5b800]" />
              <span>{event.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#f5b800]" />
              <span>{event.time}</span>
            </div>
          </div>

          {event.slug && (
            <div className="relative z-10 mt-5 flex items-center gap-2 text-sm font-medium text-[#f5b800] md:text-base">
              {event.hasForm ? "Register now" : "View event"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          )}
        </div>
      </NeonBorder>
    </CyberCard>
  )

  if (isClickable) {
    return (
      <Link
        href={`/events/${event.slug}`}
        className="block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5b800]/60"
        aria-label={
          event.hasForm ? `Register for ${event.title}` : `View ${event.title}`
        }
      >
        {card}
      </Link>
    )
  }

  return <div className="h-full">{card}</div>
}