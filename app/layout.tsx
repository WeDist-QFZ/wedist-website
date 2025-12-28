import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WeDist - We Empower. We Deliver.",
  description:
    "WeDist is a leading tech distribution company empowering businesses with cutting-edge technology solutions.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased bg-[#0a0a0f] text-[#f0f0f5]">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
