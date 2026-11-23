/* -------------------------------------------------------------------------- */
/*  Company profile content                                                   */
/*  Brands, products, solutions and contact details come from lib/data.ts, so */
/*  the profile updates itself whenever a brand or product is added there.    */
/* -------------------------------------------------------------------------- */

import { brands, contactInfo, solutions } from "@/lib/data"

export type VerticalId = "surveillance" | "access" | "networking" | "storage"

export interface Product {
  id: string
  name: string
  description: string
  image: string
  datasheet?: string
  brandId: string
  brandName: string
}

export interface Brand {
  slug: string // matches /products/<slug>
  name: string
  vertical: VerticalId
  description: string
  tagline: string
  accent: string // brand colour used for glows; falls back to WeDist yellow
  logo: string
  products: Product[]
}

export interface Vertical {
  id: VerticalId
  solutionId: string
  name: string
  short: string
  description: string
  outcomes: string[]
  /** brands named on the solution that have no product page of their own (e.g. Pelco under Motorola) */
  related: string[]
}

/* ------------------------------- verticals -------------------------------- */

// Presentation details for each solution in lib/data.ts (keyed by solution id).
const VERTICAL_META: Record<string, { id: VerticalId; short: string; outcomes: string[] }> = {
  "smart-surveillance": {
    id: "surveillance",
    short: "Surveillance",
    outcomes: ["IP cameras & PTZ", "Video management software", "AI video analytics", "Smart safety sensors"],
  },
  "access-control": {
    id: "access",
    short: "Access control",
    outcomes: ["Face & fingerprint terminals", "IP access controllers", "Smart card readers", "Time & attendance"],
  },
  "enterprise-networking": {
    id: "networking",
    short: "Networking",
    outcomes: ["Managed & PoE switching", "WiFi 6 / WiFi 7", "L3 aggregation", "Industrial Ethernet"],
  },
  "data-storage": {
    id: "storage",
    short: "Storage",
    outcomes: ["Surveillance & unified storage", "SAN arrays", "High-density JBODs", "NVMe all-flash"],
  },
}

const DISPLAY_ORDER: VerticalId[] = ["surveillance", "access", "networking", "storage"]
const brandNames = new Set(brands.map((b) => b.name))

export const VERTICALS: Vertical[] = solutions
  .filter((s) => VERTICAL_META[s.id])
  .map((s) => ({
    id: VERTICAL_META[s.id].id,
    solutionId: s.id,
    name: s.title,
    short: VERTICAL_META[s.id].short,
    description: s.description,
    outcomes: VERTICAL_META[s.id].outcomes,
    related: s.brands.filter((n) => !brandNames.has(n)),
  }))
  .sort((a, b) => DISPLAY_ORDER.indexOf(a.id) - DISPLAY_ORDER.indexOf(b.id))

/* --------------------------------- brands --------------------------------- */

function verticalOf(brandName: string): VerticalId {
  const s = solutions.find((x) => x.brands.includes(brandName) && VERTICAL_META[x.id])
  return s ? VERTICAL_META[s.id].id : "surveillance"
}

/** Very light accents (e.g. white) don't glow on a dark page - use WeDist yellow instead. */
function usableAccent(hex: string | undefined) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex ?? "")
  if (!m) return "#f5b800"
  const n = parseInt(m[1], 16)
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
  return lum > 0.85 ? "#f5b800" : `#${m[1]}`
}

export const BRANDS: Brand[] = brands
  .map((b) => ({
    slug: b.id,
    name: b.name,
    vertical: verticalOf(b.name),
    description: b.description,
    tagline: b.tagline,
    accent: usableAccent(b.accentColor),
    logo: b.logo,
    products: b.products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      image: p.image,
      datasheet: p.datasheet,
      brandId: b.id,
      brandName: b.name,
    })),
  }))
  .sort((a, b) => DISPLAY_ORDER.indexOf(a.vertical) - DISPLAY_ORDER.indexOf(b.vertical))

export const totalProducts = BRANDS.reduce((a, b) => a + b.products.length, 0)
export const totalDatasheets = BRANDS.reduce((a, b) => a + b.products.filter((p) => p.datasheet).length, 0)

export const brandsIn = (v: VerticalId) => BRANDS.filter((b) => b.vertical === v)
export const productsIn = (v: VerticalId) => brandsIn(v).flatMap((b) => b.products)

/* -------------------------------- company --------------------------------- */

const a = contactInfo.address
export const COMPANY = {
  legalName: a.company,
  tagline: "We Empower. We Deliver.",
  logo: "/images/wedist-logo.png",
  address: [a.line1, a.line2, `${a.line3}, ${a.city}, ${a.country}`],
  phone: contactInfo.phone,
  phoneHref: `tel:${contactInfo.phone.replace(/[^\d+]/g, "")}`,
  whatsappNumber: contactInfo.phone.replace(/[^\d]/g, ""),
  email: contactInfo.email,
  whatsapp: contactInfo.socials.whatsapp,
  socials: [
    { label: "LinkedIn", href: contactInfo.socials.linkedin },
    { label: "Facebook", href: contactInfo.socials.facebook },
    { label: "Instagram", href: contactInfo.socials.instagram },
    { label: "YouTube", href: contactInfo.socials.youtube },
  ],
}

export const CHANNEL = ["System integrators", "Resellers", "IT service providers", "Traders", "Consultants"]

export const PROJECT_TYPES = [
  "Hospitality",
  "Commercial / office tower",
  "Residential compound",
  "Retail / mall",
  "Government",
  "Education",
  "Healthcare",
  "Industrial / logistics",
  "Data centre",
  "Other",
]

/* -------------------------------- projects -------------------------------- */

/** Same logos as the homepage "Powering Ambitious Projects" strip (public/images/projects). */
export const PROJECTS: { name: string; src: string }[] = [
  { name: "Hilton", src: "/images/projects/Hilton.png" },
  { name: "Marriott", src: "/images/projects/MARRIOT.png" },
  { name: "Westin", src: "/images/projects/westin.png" },
  { name: "Crowne Plaza", src: "/images/projects/crowneplaza.avif" },
  { name: "Dusit", src: "/images/projects/dusit.png" },
  { name: "NH Collection", src: "/images/projects/NH-Collection.png" },
  { name: "Ooredoo", src: "/images/projects/Ooredoo.svg" },
  { name: "Qatar Foundation", src: "/images/projects/qf.png" },
  { name: "QDB", src: "/images/projects/qdb.png" },
  { name: "QIC", src: "/images/projects/qic.png" },
  { name: "Manateq", src: "/images/projects/manateq.png" },
  { name: "Milaha", src: "/images/projects/Milaha.png" },
  { name: "GWC", src: "/images/projects/GWC.jpeg" },
  { name: "DHL", src: "/images/projects/dhl.svg" },
  { name: "IKEA", src: "/images/projects/ikea.png" },
  { name: "Gulf Exchange", src: "/images/projects/gulf exchange.png" },
]
