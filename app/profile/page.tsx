import type { Metadata } from "next"

import CompanyProfile from "./company-profile"
import { BRANDS, COMPANY, VERTICALS } from "./profile-data"

const TITLE = "Company Profile | WeDist - Security, Networking & Storage Distributor in Qatar"
const DESCRIPTION = `WeDist is a value-added technology distributor in Qatar for ${BRANDS.map((b) => b.name).join(", ")} - covering ${VERTICALS.map((v) => v.name).join(", ")}.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/profile" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/profile", type: "website", locale: "en_QA" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WeDist",
  legalName: COMPANY.legalName,
  slogan: COMPANY.tagline,
  url: "/",
  email: COMPANY.email,
  telephone: COMPANY.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.address.slice(0, 2).join(", "),
    addressLocality: "Doha",
    addressRegion: "Ras Bufontas Free Zone",
    addressCountry: "QA",
  },
  areaServed: { "@type": "Country", name: "Qatar" },
  sameAs: COMPANY.socials.map((s) => s.href),
  knowsAbout: VERTICALS.map((v) => v.name),
  brand: BRANDS.map((b) => ({ "@type": "Brand", name: b.name })),
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <CompanyProfile />
    </>
  )
}
