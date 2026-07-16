"use client"

import Link from "next/link"
import { Calendar, MapPin, ArrowRight, Clock, Sparkles } from "lucide-react"
import { events, type EventItem } from "@/lib/events"
import { ScrollReveal } from "./scroll-reveal"
import { CyberCard } from "./cyber-card"
import { NeonBorder } from "./neon-border"
import { CyberParticles } from "./cyber-particles"
import { GlitchText } from "./glitch-text"

const HOMEPAGE_EVENTS_LIMIT = 3

export function EventsSection() {
  const featuredEvents = events.slice(0, HOMEPAGE_EVENTS_LIMIT)
  const hasMoreEvents = events.length > HOMEPAGE_EVENTS_LIMIT

  return (
    <section
      id="events"
      className="relative overflow-hidden bg-[#0a0a0f] py-16 md:py-32 cyber-grid"
    >
      <CyberParticles count={15} />

      <div className="pointer-events-none absolute top-1/4 right-0 h-[250px] w-[250px] rounded-full bg-[#f5b800]/5 blur-3xl animate-float morph-bg md:h-[500px] md:w-[500px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 h-[200px] w-[200px] rounded-full bg-[#f5b800]/3 blur-3xl animate-float-slow morph-bg md:h-[400px] md:w-[400px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[150px] w-[150px] rounded-full bg-[#f5b800]/4 blur-3xl animate-float-reverse md:h-[300px] md:w-[300px]" />

      <div className="pointer-events-none absolute top-10 left-10 hidden h-40 w-40 border-l-2 border-t-2 border-[#f5b800]/20 md:block" />
      <div className="pointer-events-none absolute right-10 bottom-10 hidden h-40 w-40 border-r-2 border-b-2 border-[#f5b800]/20 md:block" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="up">
          <div className="mb-10 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#f5b800]/30 bg-[#f5b800]/10 px-4 py-2 md:mb-6 md:gap-3 md:px-5">
                <Sparkles className="h-4 w-4 text-[#f5b800] md:h-5 md:w-5" />
                <span className="text-xs font-medium tracking-[0.15em] text-[#f5b800] md:text-sm md:tracking-[0.2em]">
                  LATEST EVENTS
                </span>
              </div>

              <p className="text-2xl font-bold text-[#f0f0f5] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                Upcoming{" "}
                <GlitchText
                  text="Events"
                  className="text-[#f5b800] text-glow"
                  autoGlitch
                  glitchInterval={10000}
                />{" "}
                & Workshops
              </p>
            </div>

            {hasMoreEvents && (
              <div className="flex items-start md:items-end">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 rounded-full border border-[#f5b800]/30 bg-[#f5b800]/10 px-5 py-3 text-sm font-medium text-[#f5b800] transition-all hover:border-[#f5b800]/50 hover:bg-[#f5b800]/15 hover:text-[#ffd54f] md:px-6 md:py-3.5 md:text-base"
                >
                  View More Events
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </div>
            )}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
          {featuredEvents.map((event, index) => (
            <ScrollReveal key={event.id} animation="up" delay={index * 150}>
              <EventCard event={event} highlight={index === 0} />
            </ScrollReveal>
          ))}
        </div>

        {hasMoreEvents && (
          <ScrollReveal animation="up" delay={250}>
            <div className="mt-8 flex justify-center md:mt-12">
              <Link
                href="/events"
                className="group inline-flex items-center gap-2 rounded-full border border-[#2a2a36] bg-[#121218]/90 px-5 py-3 text-sm text-[#cfd0da] transition-all hover:border-[#f5b800]/40 hover:text-[#f5b800] md:text-base"
              >
                Explore all events
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}

function EventCard({
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
        <div className="group relative flex min-h-[320px] h-full flex-col overflow-hidden p-6 md:min-h-[400px] md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#f5b800]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity group-hover:opacity-100">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f5b800]/30 to-transparent animate-[scanline-move_3s_linear_infinite]" />
          </div>

          <div className="relative z-10 mb-6 flex flex-wrap items-center gap-2 md:mb-8 md:gap-3">
            <div className="flex items-center gap-2 rounded-full border border-[#f5b800]/20 bg-[#f5b800]/10 px-3 py-1.5 text-[#f5b800] md:gap-3 md:px-4 md:py-2">
              <Calendar className="h-4 w-4 flex-shrink-0 md:h-5 md:w-5" />
              <span className="whitespace-nowrap text-sm font-medium md:text-base">
                {event.date}
              </span>
            </div>

            {event.hasForm ? (
              <span className="glow-yellow whitespace-nowrap rounded-full bg-[#f5b800] px-2 py-1 text-[10px] font-bold text-[#0a0a0f] md:px-3 md:text-xs">
                REGISTRATION OPEN
              </span>
            ) : event.slug ? (
              <span className="whitespace-nowrap rounded-full border border-[#f5b800]/30 bg-[#f5b800]/10 px-2 py-1 text-[10px] font-bold text-[#f5b800] md:px-3 md:text-xs">
                EVENT DETAILS
              </span>
            ) : null}
          </div>

          <h3 className="relative z-10 mb-3 min-h-[56px] line-clamp-2 text-xl font-semibold text-[#f0f0f5] transition-colors group-hover:text-[#f5b800] md:mb-4 md:min-h-[64px] md:text-2xl">
            {event.title}
          </h3>

          <p className="relative z-10 mb-6 min-h-[72px] flex-grow line-clamp-3 text-base text-[#888899] md:mb-8 md:min-h-[84px] md:text-lg">
            {event.description}
          </p>

          <div className="relative z-10 mt-auto flex items-center justify-between gap-2 border-t border-[#2a2a36] pt-4 md:pt-6">
            <div className="flex items-center gap-1.5 text-sm text-[#888899] md:gap-2 md:text-base">
              <MapPin className="h-4 w-4 flex-shrink-0 text-[#f5b800] md:h-5 md:w-5" />
              <span className="max-w-[100px] truncate md:max-w-[120px]">
                {event.location}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-[#888899] md:gap-2 md:text-base">
              <Clock className="h-4 w-4 flex-shrink-0 text-[#f5b800] md:h-5 md:w-5" />
              <span>{event.time}</span>
            </div>
          </div>

          {event.slug && (
            <div className="relative z-10 flex items-center gap-2 pt-4 text-sm font-medium text-[#f5b800] md:text-base">
              {event.hasForm ? "Register now" : "View event"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2 md:h-5 md:w-5" />
            </div>
          )}

          <div className="pointer-events-none absolute -right-10 -bottom-10 h-24 w-24 rounded-full border border-[#f5b800]/10 transition-colors group-hover:border-[#f5b800]/30 md:h-32 md:w-32" />
        </div>
      </NeonBorder>
    </CyberCard>
  )

  if (isClickable) {
    return (
      <Link
        href={`/events/${event.slug}`}
        aria-label={
          event.hasForm ? `Register for ${event.title}` : `View ${event.title}`
        }
        className="block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5b800]/60"
      >
        {card}
      </Link>
    )
  }

  return <div className="h-full cursor-default">{card}</div>
}