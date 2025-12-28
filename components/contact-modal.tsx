"use client"

import type React from "react"

import { useState } from "react"
import { X, Send, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ContactModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", phone: "", company: "", message: "" })
      onOpenChange(false)
    }, 2000)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => onOpenChange(false)} />

      <div className="relative w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto bg-[#121218] border border-[#f5b800]/30 rounded-lg cyber-border animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-[#2a2a36]">
          <div>
            <h2 className="text-2xl font-bold text-[#f0f0f5]">Contact Us</h2>
            <p className="text-[#888899] text-sm mt-1">We would love to hear from you</p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="p-2 text-[#888899] hover:text-[#f5b800] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-[#f5b800] mb-4">Get in Touch</h3>
              <p className="text-[#888899] text-sm leading-relaxed">
                Have questions about our products or solutions? Our team is here to help you find the perfect technology
                solutions for your business.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="tel:+97430624212"
                className="flex items-center gap-4 p-4 bg-[#1a1a24] rounded-lg border border-[#2a2a36] hover:border-[#f5b800]/30 transition-colors"
              >
                <div className="p-3 bg-[#f5b800]/10 rounded-lg">
                  <Phone className="w-5 h-5 text-[#f5b800]" />
                </div>
                <div>
                  <p className="text-[#888899] text-xs">Phone</p>
                  <p className="text-[#f0f0f5] font-medium">+974 30 62 42 12</p>
                </div>
              </a>

              <a
                href="mailto:marketing@wedist.net"
                className="flex items-center gap-4 p-4 bg-[#1a1a24] rounded-lg border border-[#2a2a36] hover:border-[#f5b800]/30 transition-colors"
              >
                <div className="p-3 bg-[#f5b800]/10 rounded-lg">
                  <Mail className="w-5 h-5 text-[#f5b800]" />
                </div>
                <div>
                  <p className="text-[#888899] text-xs">Email</p>
                  <p className="text-[#f0f0f5] font-medium">marketing@wedist.net</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-4 bg-[#1a1a24] rounded-lg border border-[#2a2a36]">
                <div className="p-3 bg-[#f5b800]/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-[#f5b800]" />
                </div>
                <div>
                  <p className="text-[#888899] text-xs">Address</p>
                  <p className="text-[#f0f0f5] font-medium text-sm leading-relaxed">
                    Wedist QFZ LLC
                    <br />
                    Office No 1401, Wing 1, Level 4<br />
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

          {/* Contact Form - unchanged */}
          <div>
            {submitted ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-[#f5b800]/20 rounded-full flex items-center justify-center">
                    <Send className="w-8 h-8 text-[#f5b800]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#f0f0f5] mb-2">Message Sent!</h3>
                  <p className="text-[#888899]">We will get back to you soon.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-[#f0f0f5]">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-[#1a1a24] border-[#2a2a36] text-[#f0f0f5] focus:border-[#f5b800] focus:ring-[#f5b800]"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#f0f0f5]">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-[#1a1a24] border-[#2a2a36] text-[#f0f0f5] focus:border-[#f5b800] focus:ring-[#f5b800]"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-[#f0f0f5]">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-[#1a1a24] border-[#2a2a36] text-[#f0f0f5] focus:border-[#f5b800] focus:ring-[#f5b800]"
                      placeholder="+974 50 123 4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-[#f0f0f5]">
                      Company
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="bg-[#1a1a24] border-[#2a2a36] text-[#f0f0f5] focus:border-[#f5b800] focus:ring-[#f5b800]"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-[#f0f0f5]">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-[#1a1a24] border-[#2a2a36] text-[#f0f0f5] focus:border-[#f5b800] focus:ring-[#f5b800] resize-none"
                    placeholder="How can we help you?"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#f5b800] text-[#0a0a0f] hover:bg-[#c49400] font-semibold py-6 glow-yellow-sm"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
