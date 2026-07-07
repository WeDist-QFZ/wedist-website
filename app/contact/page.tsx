"use client"

import { useState } from "react"
import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberParticles } from "@/components/cyber-particles"
import { GlitchText } from "@/components/glitch-text"
import { CyberCard } from "@/components/cyber-card"
import { HologramCard } from "@/components/hologram-card"
import { AnimatedGrid } from "@/components/animated-grid"
import { FloatingElements } from "@/components/floating-elements"

import { Send, Phone, Mail, MapPin, Shield } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })

  const [result, setResult] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSubmitting(true)
    setResult("")

    const data = new FormData(event.currentTarget)

    // Honeypot check - Web3Forms will silently reject if this is filled
    if (data.get("botcheck")) {
      setSubmitting(false)
      return
    }

    data.append("access_key", "c93e1169-88f4-44a2-b3c9-77ec6f1e2e77")
    data.append("subject", "New Contact Enquiry - WEDIST Website")
    data.append("from_name", "WEDIST Website Contact Form")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      })

      const responseData = await response.json()

      if (response.ok && responseData.success) {
        setResult("success")
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        })
      } else {
        setResult("error")
      }
    } catch (error) {
      setResult("error")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] page-transition">
      <Header />

      <main className="pt-20 md:pt-28 lg:pt-32">
        <section className="py-16 md:py-32 cyber-grid relative overflow-hidden">
          <AnimatedGrid />
          <CyberParticles count={25} />
          <FloatingElements count={5} />

          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#f5b800]/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#f5b800]/5 rounded-full blur-3xl animate-float-slow" />

          <div className="max-w-5xl mx-auto px-4 relative z-10">
            <ScrollReveal animation="up">
              <div className="text-center">
                <div className="inline-flex items-center gap-3 px-5 py-3 bg-[#f5b800]/10 border border-[#f5b800]/30 rounded-full mb-8">
                  <Shield className="text-[#f5b800]" />
                  <span className="text-[#f5b800] tracking-[0.2em]">
                    CONTACT WEDIST
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-[#f0f0f5] mb-8">
                  Get In{" "}
                  <GlitchText
                    text="Touch"
                    className="text-[#f5b800] text-glow"
                    autoGlitch
                    glitchInterval={7000}
                  />
                </h1>

                <p className="text-lg md:text-xl text-[#888899] max-w-3xl mx-auto">
                  Have questions about our solutions, partnerships, or
                  technology offerings? Our team is ready to help.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 md:py-32 bg-[#050508] relative overflow-hidden">
          <CyberParticles count={15} />

          <div className="absolute inset-0 hex-pattern opacity-30" />
          <div className="absolute inset-0 circuit-pattern opacity-20" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* CONTACT INFORMATION - CyberCard + HologramCard wrap only this */}
              <CyberCard tiltEffect>
                <HologramCard>
                  <div className="space-y-8 p-6 md:p-10 bg-[#121218]/90 border border-[#2a2a36] rounded-xl h-full">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#f5b800] mb-4">
                        Get in Touch
                      </h2>

                      <p className="text-[#888899] leading-relaxed">
                        Our specialists can help you with enterprise
                        technology solutions, security systems,
                        infrastructure, and digital transformation.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <a
                        href="tel:+97430624212"
                        className="flex items-center gap-4 p-4 bg-[#1a1a24] border border-[#2a2a36] rounded-lg hover:border-[#f5b800]/40 transition"
                      >
                        <div className="p-3 bg-[#f5b800]/10 rounded-lg">
                          <Phone className="text-[#f5b800]" />
                        </div>

                        <div>
                          <p className="text-xs text-[#888899]">Phone</p>
                          <p className="text-[#f0f0f5] font-medium">
                            +974 30 62 42 12
                          </p>
                        </div>
                      </a>

                      <a
                        href="mailto:marketing@wedist.net"
                        className="flex items-center gap-4 p-4 bg-[#1a1a24] border border-[#2a2a36] rounded-lg hover:border-[#f5b800]/40 transition"
                      >
                        <div className="p-3 bg-[#f5b800]/10 rounded-lg">
                          <Mail className="text-[#f5b800]" />
                        </div>

                        <div>
                          <p className="text-xs text-[#888899]">Email</p>
                          <p className="text-[#f0f0f5] font-medium">
                            marketing@wedist.net
                          </p>
                        </div>
                      </a>

                      <div className="flex items-start gap-4 p-4 bg-[#1a1a24] border border-[#2a2a36] rounded-lg">
                        <div className="p-3 bg-[#f5b800]/10 rounded-lg">
                          <MapPin className="text-[#f5b800]" />
                        </div>

                        <div>
                          <p className="text-xs text-[#888899]">Address</p>

                          <p className="text-[#f0f0f5] text-sm leading-relaxed">
                            Wedist QFZ LLC
                            <br />
                            Office No 1401, Wing 1, Level 4
                            <br />
                            Business & Innovation Park
                            <br />
                            Ras Bufontas Free Zone
                            <br />
                            Doha, Qatar
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </HologramCard>
              </CyberCard>

              {/* FORM - fully separate, no CyberCard / HologramCard wrapper */}
              <div className="p-6 md:p-10 bg-[#121218]/90 border border-[#2a2a36] rounded-xl h-full flex flex-col">
                {result === "success" ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-5 bg-[#f5b800]/20 rounded-full flex items-center justify-center">
                        <Send className="text-[#f5b800]" />
                      </div>

                      <h3 className="text-2xl font-bold text-[#f0f0f5]">
                        Message Sent!
                      </h3>

                      <p className="text-[#888899] mt-2">
                        We will get back to you soon.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col h-full gap-5"
                  >
                    {/* Honeypot field for spam protection - kept hidden from real users */}
                    <input
                      type="checkbox"
                      name="botcheck"
                      className="hidden"
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[#f0f0f5]">Full Name *</Label>

                        <Input
                          required
                          name="name"
                          placeholder="Saul Goodman"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              name: e.target.value,
                            })
                          }
                          className="bg-[#1a1a24] border-[#2a2a36] text-[#f0f0f5]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[#f0f0f5]">Email *</Label>

                        <Input
                          required
                          type="email"
                          name="email"
                          placeholder="contact@saulgoodman.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              email: e.target.value,
                            })
                          }
                          className="bg-[#1a1a24] border-[#2a2a36] text-[#f0f0f5]"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[#f0f0f5]">Phone</Label>

                        <Input
                          name="phone"
                          type="tel"
                          placeholder="+15055034455"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phone: e.target.value,
                            })
                          }
                          className="bg-[#1a1a24] border-[#2a2a36] text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[#f0f0f5]">Company</Label>

                        <Input
                          name="company"
                          placeholder="Saul Goodman & Associates"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: e.target.value,
                            })
                          }
                          className="bg-[#1a1a24] border-[#2a2a36] text-white"
                        />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col space-y-2 min-h-[140px]">
                      <Label className="text-[#f0f0f5]">Message *</Label>

                      <Textarea
                        required
                        name="message"
                        placeholder="Hypothetically speaking, a 'friend' had a little accident with a giant magnet near a server room—help me legally resurrect these hard drives before the IT feds find out!"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            message: e.target.value,
                          })
                        }
                        className="bg-[#1a1a24] border-[#2a2a36] text-white resize-none flex-1 h-full"
                      />
                    </div>

                    <div className="space-y-3">
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-6 bg-[#f5b800] text-[#0a0a0f] hover:bg-[#c49400] font-bold glow-yellow-sm"
                      >
                        <Send className="mr-2 w-4 h-4" />
                        {submitting ? "Sending..." : "Send Message"}
                      </Button>

                      {result === "error" && (
                        <p className="text-red-400 text-sm text-center">
                          Something went wrong. Please try again.
                        </p>
                      )}

                      <p className="text-xs text-[#888899] text-center">
                        * Required fields [Better call s̶a̶u̶l Us!]
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}