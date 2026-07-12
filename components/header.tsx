"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/solutions", label: "Solutions" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-[#f5b800]/20">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="flex items-center justify-between h-[72px] md:h-[86px]">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/wedist-logo-text.png"
              alt="WeDist Logo"
              width={165}
              height={60}
              className="h-11 md:h-[56px] w-auto transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="
                  px-4
                  lg:px-5
                  py-2
                  text-[15px]
                  lg:text-base
                  font-medium
                  tracking-wide
                  text-[#888899]
                  hover:text-[#f5b800]
                  transition-colors
                  relative
                  group
                "
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#f5b800] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Desktop Contact Button */}
          <div className="hidden md:block">
            <Button
              asChild
              className="
                bg-[#f5b800]
                text-[#0a0a0f]
                hover:bg-[#c49400]
                font-semibold
                text-[15px]
                lg:text-base
                px-7
                py-6
                rounded-xl
                glow-yellow-sm
                transition-all
              "
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#f0f0f5]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
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
              asChild
              className="mt-2 bg-[#f5b800] text-[#0a0a0f] hover:bg-[#c49400] font-semibold"
            >
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}