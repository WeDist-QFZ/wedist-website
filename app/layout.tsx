import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://wedist.net"),
  title: {
    default: "WeDist Qatar | Trusted Distributor for Security, Networking & Storage Brands",
    template: "%s | WeDist Qatar",
  },
  description:
    "WeDist is a trusted distributor in Qatar for Digifort, Motorola Solutions, Antaira, Zyxel, QSAN, Western Digital, BioMax, Dorlet, Promise Technology, and eSSL—delivering video surveillance, access control, networking, and data storage solutions.",
  keywords: [
    "WeDist Qatar",
    "distributor in Qatar",
    "authorized distributor in Qatar",
    "security distributor in Qatar",
    "video surveillance distributor in Qatar",
    "access control distributor in Qatar",
    "networking distributor in Qatar",
    "data storage distributor in Qatar",
    "Digifort distributor in Qatar",
    "Motorola Solutions distributor in Qatar",
    "Antaira distributor in Qatar",
    "Zyxel distributor in Qatar",
    "QSAN distributor in Qatar",
    "Western Digital distributor in Qatar",
    "BioMax distributor in Qatar",
    "Dorlet distributor in Qatar",
    "Promise Technology distributor in Qatar",
    "eSSL distributor in Qatar",
  ],
  alternates: {
    canonical: "https://wedist.net",
  },
  openGraph: {
    title: "WeDist Qatar | Trusted Distributor for Security, Networking & Storage Brands",
    description:
      "WeDist is a trusted distributor in Qatar for leading security, networking, and storage brands including Digifort, Motorola Solutions, Antaira, Zyxel, QSAN, Western Digital, BioMax, Dorlet, Promise Technology, and eSSL.",
    url: "https://wedist.net",
    siteName: "WeDist Qatar",
    type: "website",
  },
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
