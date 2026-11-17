import type { Metadata } from "next"

import StorageCalculator from "./storage-calculator"
import { FAQS, ROUTE, SEO_DESCRIPTION, SEO_KEYWORDS, SEO_TITLE } from "./seo-content"

// Absolute URLs resolve against `metadataBase` set in your root layout.
export const metadata: Metadata = {
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  alternates: { canonical: ROUTE },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: ROUTE,
    type: "website",
    locale: "en_QA",
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
  },
  other: {
    "geo.region": "QA",
    "geo.placename": "Doha",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "CCTV Storage Calculator for MOI Qatar DSA",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web browser",
      description: SEO_DESCRIPTION,
      url: ROUTE,
      areaServed: { "@type": "Country", name: "Qatar" },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "ELV contractors, security system integrators and MEP consultants in Qatar",
      },
      offers: { "@type": "Offer", price: "0", priceCurrency: "QAR" },
      featureList: [
        "Multiple camera sets with individual bitrates",
        "120-day primary and failover (FOS) retention sizing",
        "Controller + JBOD storage sets",
        "RAID 5 / RAID 6 array planning with hot spares",
        "MOI SSD DSA storage calculation PDF export",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <StorageCalculator />
    </>
  )
}
