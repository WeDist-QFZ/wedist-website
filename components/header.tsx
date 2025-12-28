"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactModal } from "@/components/contact-modal"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/solutions", label: "Solutions" },
  { href: "/downloads", label: "Downloads" },
  { href: "/about", label: "About" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#f5b800]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/wedist-logo-text.png"
                alt="WeDist Logo"
                width={140}
                height={50}
                className="h-10 md:h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-[#888899] hover:text-[#f5b800] transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#f5b800] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>

            {/* Contact Button */}
            <div className="hidden md:block">
              <Button
                onClick={() => setContactOpen(true)}
                className="bg-[#f5b800] text-[#0a0a0f] hover:bg-[#c49400] font-semibold px-6 glow-yellow-sm"
              >
                Contact Us
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-[#f0f0f5]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#121218] border-t border-[#2a2a36]">
            <nav className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-[#888899] hover:text-[#f5b800] hover:bg-[#1a1a24] rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                onClick={() => {
                  setContactOpen(true)
                  setMobileMenuOpen(false)
                }}
                className="mt-2 bg-[#f5b800] text-[#0a0a0f] hover:bg-[#c49400] font-semibold"
              >
                Contact Us
              </Button>
            </nav>
          </div>
        )}
      </header>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </>
  )
}
