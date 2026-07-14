"use client"

import Link from "next/link"
import { Calendar, MapPin, ArrowRight, Clock, Sparkles } from "lucide-react"
import { events, type EventItem } from "@/lib/events"
import { ScrollReveal } from "./scroll-reveal"
import { CyberCard } from "./cyber-card"
import { NeonBorder } from "./neon-border"
import { CyberParticles } from "./cyber-particles"
import { GlitchText } from "./glitch-text"

export function EventsSection() {
  return (
    <section id="events" className="py-16 md:py-32 bg-[#0a0a0f] cyber-grid relative overflow-hidden">
      {/* Particles */}
      <CyberParticles count={15} />

      {/* Animated background elements - responsive */}
      <div className="absolute top-1/4 right-0 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-[#f5b800]/5 rounded-full blur-3xl animate-float morph-bg" />
      <div className="absolute bottom-1/4 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-[#f5b800]/3 rounded-full blur-3xl animate-float-slow morph-bg" />
      <div className="absolute top-1/2 left-1/2 w-[150px] md:w-[300px] h-[150px] md:h-[300px] bg-[#f5b800]/4 rounded-full blur-3xl animate-float-reverse" />

      {/* Decorative corners - hidden on mobile */}
      <div className="absolute top-10 left-10 w-40 h-40 border-l-2 border-t-2 border-[#f5b800]/20 hidden md:block" />
      <div className="absolute bottom-10 right-10 w-40 h-40 border-r-2 border-b-2 border-[#f5b800]/20 hidden md:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="up">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-20">
            <div>
              <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 bg-[#f5b800]/10 border border-[#f5b800]/30 rounded-full mb-4 md:mb-6">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-[#f5b800]" />
                <span className="text-xs md:text-sm font-medium text-[#f5b800] tracking-[0.15em] md:tracking-[0.2em]">
                  LATEST EVENTS
                </span>
              </div>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#f0f0f5]">
                Upcoming{" "}
                <GlitchText text="Events" className="text-[#f5b800] text-glow" autoGlitch glitchInterval={10000} /> &
                Workshops
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {events.map((event, index) => (
            <ScrollReveal key={event.id} animation="up" delay={index * 150}>
              <EventCard event={event} highlight={index === 0} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function EventCard({ event, highlight }: { event: EventItem; highlight: boolean }) {
  const isClickable = Boolean(event.hasForm && event.slug)

  const card = (
    <CyberCard className="h-full" tiltEffect={isClickable}>
      <NeonBorder animate={highlight}>
        <div className="p-6 md:p-10 min-h-[320px] md:min-h-[400px] flex flex-col relative overflow-hidden group">
          {/* Background glow on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f5b800]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Scan line effect */}
          <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#f5b800]/30 to-transparent animate-[scanline-move_3s_linear_infinite]" />
          </div>

          <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8 relative z-10 flex-wrap">
            <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 bg-[#f5b800]/10 rounded-full text-[#f5b800] border border-[#f5b800]/20">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
              <span className="text-sm md:text-base font-medium whitespace-nowrap">{event.date}</span>
            </div>
            {isClickable && (
              <span className="px-2 md:px-3 py-1 bg-[#f5b800] text-[#0a0a0f] text-[10px] md:text-xs font-bold rounded-full glow-yellow whitespace-nowrap">
                REGISTRATION OPEN
              </span>
            )}
          </div>

          <h3 className="text-xl md:text-2xl font-semibold text-[#f0f0f5] mb-3 md:mb-4 group-hover:text-[#f5b800] transition-colors relative z-10 line-clamp-2 min-h-[56px] md:min-h-[64px]">
            {event.title}
          </h3>

          <p className="text-[#888899] text-base md:text-lg mb-6 md:mb-8 flex-grow line-clamp-3 relative z-10 min-h-[72px] md:min-h-[84px]">
            {event.description}
          </p>

          <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-[#2a2a36] relative z-10 mt-auto gap-2">
            <div className="flex items-center gap-1.5 md:gap-2 text-[#888899] text-sm md:text-base">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#f5b800] flex-shrink-0" />
              <span className="truncate max-w-[100px] md:max-w-[120px]">{event.location}</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 text-[#888899] text-sm md:text-base">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-[#f5b800] flex-shrink-0" />
              <span>{event.time}</span>
            </div>
          </div>

          {/* Register CTA - only for events with a form */}
          {isClickable && (
            <div className="flex items-center gap-2 pt-4 relative z-10 text-[#f5b800] font-medium text-sm md:text-base">
              Register now
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
            </div>
          )}

          {/* Corner accent */}
          <div className="absolute -bottom-10 -right-10 w-24 md:w-32 h-24 md:h-32 border border-[#f5b800]/10 rounded-full group-hover:border-[#f5b800]/30 transition-colors" />
        </div>
      </NeonBorder>
    </CyberCard>
  )

  if (isClickable) {
    return (
      <Link
        href={`/events/${event.slug}`}
        aria-label={`Register for ${event.title}`}
        className="block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f5b800]/60"
      >
        {card}
      </Link>
    )
  }

  // Non-form events are informational only and not clickable.
  return <div className="h-full cursor-default">{card}</div>
}
