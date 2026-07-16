import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import {
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  Sparkles,
  ExternalLink,
} from "lucide-react"
import { getEventBySlug, getEventSlugs } from "@/lib/events"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberParticles } from "@/components/cyber-particles"
import { EventRegistrationForm } from "@/components/event-registration-form"
import Image from "next/image"

export function generateStaticParams() {
  return getEventSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const event = getEventBySlug(slug)

  if (!event) {
    return {
      title: "Event Not Found",
    }
  }

  return {
    title: `${event.title} | WeDist Events`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      type: "website",
    },
  }
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = getEventBySlug(slug)

  if (!event) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Header />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden cyber-grid pt-24 md:pt-32 pb-10 md:pb-14">
          <CyberParticles count={12} />

          <div className="absolute top-1/4 right-0 h-[260px] w-[260px] md:h-[520px] md:w-[520px] rounded-full bg-[#f5b800]/5 blur-3xl animate-float" />
          <div className="absolute bottom-0 left-0 h-[220px] w-[220px] md:h-[420px] md:w-[420px] rounded-full bg-[#f5b800]/5 blur-3xl animate-float-slow" />

          <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <ScrollReveal animation="up">
              <div className="mb-8">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 rounded-full border border-[#2a2a36] bg-[#121218]/80 px-4 py-2 text-sm text-[#cfd0da] transition-all hover:border-[#f5b800]/40 hover:text-[#f5b800]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Events
                </Link>
              </div>

              <div
                className={`grid items-start gap-10 ${
                  event.poster ? "lg:grid-cols-[minmax(0,1fr)_420px]" : "grid-cols-1"
                }`}
              >
                {/* LEFT HERO CONTENT */}
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#f5b800]/30 bg-[#f5b800]/10 px-4 py-2">
                    <Sparkles className="h-4 w-4 text-[#f5b800]" />
                    <span className="text-xs font-medium tracking-[0.2em] text-[#f5b800]">
                      EVENT REGISTRATION
                    </span>
                  </div>

                  <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-tight text-[#f0f0f5] md:text-6xl">
                    {event.title}
                  </h1>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#f5b800]/20 bg-[#f5b800]/10 px-4 py-2 text-sm text-[#f5b800]">
                      <Calendar className="h-4 w-4" />
                      {event.date}
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full border border-[#2a2a36] px-4 py-2 text-sm text-[#cfd0da]">
                      <Clock className="h-4 w-4 text-[#f5b800]" />
                      {event.time}
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full border border-[#2a2a36] px-4 py-2 text-sm text-[#cfd0da]">
                      <MapPin className="h-4 w-4 text-[#f5b800]" />
                      {event.location}
                    </span>
                  </div>
                </div>

                {/* RIGHT HERO POSTER */}
                {event.poster && (
                  <div className="mx-auto w-full max-w-[420px] lg:mx-0 lg:justify-self-end">
                    <div className="overflow-hidden rounded-3xl border border-[#2a2a36] bg-[#121218] shadow-[0_0_50px_rgba(245,184,0,0.08)]">
                      <Image
                        src={event.poster.src}
                        alt={event.poster.alt ?? event.title}
                        width={420}
                        height={560}
                        sizes="(max-width: 1024px) 100vw, 420px"
                        className="h-auto w-full object-contain"
                        priority
                      />
                    </div>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CONTENT */}
        <section className="relative pb-20 md:pb-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div
              className={`grid grid-cols-1 gap-12 xl:gap-16 ${
                event.hasForm ? "xl:grid-cols-12" : ""
              }`}
            >
              {/* LEFT CONTENT */}
              <div className={event.hasForm ? "xl:col-span-6" : "xl:col-span-12"}>
                <ScrollReveal animation="up">
                  <div className="prose prose-invert max-w-none">
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h2: ({ children }) => (
                          <h2 className="mt-10 mb-5 text-3xl font-semibold text-[#f0f0f5]">
                            {children}
                          </h2>
                        ),
                        p: ({ children }) => (
                          <p className="mb-5 text-[17px] leading-8 text-[#b4b4c0]">
                            {children}
                          </p>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold text-[#f0f0f5]">
                            {children}
                          </strong>
                        ),
                        ul: ({ children }) => (
                          <ul className="mb-6 space-y-3">{children}</ul>
                        ),
                        li: ({ children }) => (
                          <li className="flex items-start gap-3 text-[17px] leading-8 text-[#b4b4c0]">
                            <span className="mt-3 h-2 w-2 rounded-full bg-[#f5b800]" />
                            <span>{children}</span>
                          </li>
                        ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#f5b800] underline underline-offset-4 hover:text-[#ffd54f]"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {event.longDescription ?? event.description}
                    </Markdown>
                  </div>

                  {event.externalLinks && event.externalLinks.length > 0 && (
                    <div className="mt-10 rounded-3xl border border-[#2a2a36] bg-[#121218] p-6 md:p-8">
                      <h2 className="text-2xl font-semibold text-[#f0f0f5]">
                        External Links
                      </h2>

                      <div className="mt-6 space-y-4">
                        {event.externalLinks.map((link, index) => (
                          <a
                            key={`${link.url}-${index}`}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block rounded-2xl border border-[#2a2a36] bg-[#0f0f15] p-5 transition-all hover:border-[#f5b800]/40 hover:bg-[#14141d]"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="text-lg font-semibold text-[#f0f0f5] group-hover:text-[#f5b800]">
                                  {link.title}
                                </h3>

                                {link.description && (
                                  <p className="mt-2 text-sm leading-7 text-[#a4a4b3]">
                                    {link.description}
                                  </p>
                                )}

                                <p className="mt-3 break-all text-sm text-[#f5b800]">
                                  {link.url}
                                </p>
                              </div>

                              <ExternalLink className="mt-1 h-5 w-5 shrink-0 text-[#f5b800]" />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </ScrollReveal>
              </div>

              {/* RIGHT FORM */}
              {event.hasForm && (
                <div className="xl:col-span-6">
                  <ScrollReveal animation="up" delay={100}>
                    <div className="xl:sticky xl:top-24">
                      {(event.formTitle || event.formSubtitle) && (
                        <div className="mb-6">
                          {event.formTitle && (
                            <h2 className="text-3xl font-bold tracking-tight text-[#f0f0f5] md:text-4xl">
                              {event.formTitle}
                            </h2>
                          )}

                          {event.formSubtitle && (
                            <p className="mt-4 text-lg leading-8 text-[#a4a4b3]">
                              {event.formSubtitle}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="relative overflow-hidden rounded-3xl border border-[#f5b800]/20 bg-[#14141d] p-7 shadow-[0_0_80px_rgba(245,184,0,0.12)] backdrop-blur-xl md:p-10">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#f5b800]/5 via-transparent to-transparent" />
                        <div className="relative z-10">
                          <EventRegistrationForm
                            eventSlug={event.slug as string}
                            eventTitle={event.title}
                          />
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}