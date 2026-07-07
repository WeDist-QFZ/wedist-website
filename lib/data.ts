export const brands = [
  {
    id: "motorola-solutions",
    name: "Motorola Solutions",
    description: "Critical communications and video security solutions for enterprises and public safety",
    logo: "/images/motorola-solutions.jpg",
    tagline: "Connecting Those Who Protect",
    accentColor: "#ffffff",
    products: [
      {
        id: "srxp4-2v10-ebt-ir",
        name: "Sarix Professional 4 Series Bullet",
        description:
          "2-8MP environmental IR bullet camera featuring 2.8-11mm or 4.4-10.5mm varifocal lens, IP66/IP67 weatherproofing, IK10 impact protection, WDR, 50-80m IR range, and AI-powered Pelco Smart Analytics.",
        image: "/images/motorola-solutions/srxp4-2v10-ebt-ir.png",
        datasheet: "https://drive.google.com/file/d/1qD1meEKVafvSa5qfgrWokevH7kcVQTrK/view?usp=sharing",
      },
      {
        id: "srxp4-2v10-emd-ir",
        name: "Sarix Professional 4 Series Dome",
        description:
          "2-8MP environmental IR dome camera featuring 3.4-10.5mm varifocal lens, IP66/IP67 weatherproofing, IK10 impact protection, WDR, 40-50m IR range, and AI-powered Pelco Smart Analytics.",
        image: "/images/motorola-solutions/srxp4-2v10-emd-ir.png",
        datasheet: "https://drive.google.com/file/d/1qD1meEKVafvSa5qfgrWokevH7kcVQTrK/view?usp=sharing",
      },
    ],
  },
  {
    id: "digifort",
    name: "Digifort",
    description: "Professional video management software for surveillance and security applications",
    logo: "/images/digifort.jpg",
    tagline: "Professional Video Management",
    accentColor: "#a61c1c",
    products: [
      {
        id: "dgf-en",
        name: "Digifort Enterprise",
        description:
          "The ultimate high-tier VMS platform offering unlimited camera scalability",
        image: "/images/digifort/digifort_enterprise.png",
        datasheet: "https://drive.google.com/file/d/1_fIRVRCFIHPqI4AzY4proos9dtg4CTrb/view?usp=sharing",
      },
      {
        id: "dgf-pr",
        name: "Digifort Professional",
        description:
          "A comprehensive VMS solution for medium-to-large installations",
        image: "/images/digifort/digifort_professional.png",
        datasheet: "https://drive.google.com/file/d/1YtzpjT1HwxIta3NtsdInx8BXdUHLdNJM/view?usp=sharing",
      },
    ],
  },
  {
    id: "antaira",
    name: "Antaira",
    description: "Industrial networking and communication solutions for harsh environments",
    logo: "/images/antaira.jpg",
    tagline: "Industrial Network Solutions",
    accentColor: "#cc0000",
    products: [
      {
        id: "imp-c1000-sfp",
        name: "IMP-C1000-SFP",
        description:
          "Compact Industrial Gigabit PoE+ Media Converter, 1x10/100/1000Tx to 1x100/1000 SFP, 30W PSE, -40 to 75°C operating",
        image: "/images/antaira/imp-c1000-sfp.jpg",
        datasheet: "https://www.antaira.com/core/media/media.nl?id=989212&c=685553&h=HljvuV2xHAdKosXL0StIAVNEDhdDxiXrwaO1Z4d-i6g84HQI&_xt=.pdf",
      },
      {
        id: "lmp-1002g-sfp-t",
        name: "LMP-1002G-SFP-T",
        description:
          "10-Port Industrial PoE+ Layer 3 Managed Switch, 8x10/100/1000Tx (30W/port) + 2x100/1000 SFP, -40~75°C, 48~55VDC",
        image: "/images/antaira/lmp-1002g-sfp-t.jpg",
        datasheet: "https://www.antaira.com/core/media/media.nl?id=2055358&c=685553&h=WcbLNBBD7ISfWzb1lzlLTNei4pkOLnSPGKhb3qzKnjPUI4eo&_xt=.pdf",
      },
    ],
  },
  {
    id: "zyxel",
    name: "Zyxel Networks",
    description: "Enterprise networking solutions including firewalls, switches, and wireless systems",
    logo: "/images/zyxel.png",
    tagline: "Your Networking Ally",
    accentColor: "#6cc24a",
    products: [
      {
        id: "gs1920-24hpv2-eu0101f",
        name: "GS1920-24HPv2-EU0101F",
        description:
          "Zyxel GS1920-24HPv2, 28-Port Smart Managed PoE Switch, 24x GbE PoE (375W) + 4x GbE dual, standalone or NebulaFlex Cloud",
        image: "/zyxel-managed-poe-switch.jpg",
        datasheet: "https://www.wifi-france.com/datasheets/Zyxel/GS1920-24v2_5.pdf",
      },
      {
        id: "nwa50ax-eu0102f",
        name: "NWA50AX-EU0102F",
        description:
          "Zyxel NWA50AX, Wi-Fi 6 Standalone/NebulaFlex Access Point, 802.11ax, single pack with power adaptor, EU/UK variant",
        image: "/zyxel-wifi6-access-point.jpg",
        datasheet: "/datasheets/nwa50ax-eu0102f.pdf",
      },
    ],
  },
  {
    id: "qsan",
    name: "QSAN",
    description: "Enterprise storage solutions with high performance SAN and NAS systems",
    logo: "/images/qsan.png",
    tagline: "Enterprise Storage Excellence",
    accentColor: "#7dc832",
    products: [
      {
        id: "xs3324d-24bay",
        name: "XS3324D (24-Bay)",
        description:
          "Dual-Controller 4U 24-Bay SAN System, Intel 4-Core, 2x8GB DDR4 ECC RAM, redundant power/fans, 4x10GbE SFP+ iSCSI, 4 optional host card slots",
        image: "/images/qsan/xs3324d-24bay.jpeg",
        datasheet: "https://drive.google.com/file/d/1ap8FGmD_hWiF3FQAlItOqppL2B0CJ8rE/view?usp=sharing",
      },
      {
        id: "xs3324d-12bay",
        name: "XS3324D (12-Bay)",
        description:
          "Dual-Controller 4U 12-Bay SAN System, Intel 4-Core, 2x8GB DDR4 ECC RAM, redundant power/fans, 4x10GbE SFP+ iSCSI, 4 optional host card slots",
        image: "/images/qsan/xs3324d-12bay.png",
        datasheet: "https://drive.google.com/file/d/1ap8FGmD_hWiF3FQAlItOqppL2B0CJ8rE/view?usp=sharing",
      },
    ],
  },
  {
    id: "western-digital",
    name: "Western Digital",
    description: "Data storage solutions including HDDs, SSDs, and enterprise storage systems",
    logo: "/images/western-digital.jpg",
    tagline: "Data Makes It Possible",
    accentColor: "#e91e8c",
    products: [
      {
        id: "ultrastar-data60",
        name: "Ultrastar Data60",
        description:
          '60-Bay Hybrid Storage Platform in 4U, up to 60x3.5" HDD/SSD bays, 12Gb/s SAS + 6Gb/s SATA, dual redundant I/O modules, IsoVibe + ArcticFlow',
        image: "/images/wd/data60.jpg",
        datasheet: "https://drive.google.com/file/d/1KqUbaJniW4_KwLigfE6vUH-m2zUgNDp6/view?usp=sharing",
      },
      {
        id: "ultrastar-data102",
        name: "Ultrastar Data102",
        description:
          '102-Bay Hybrid Storage Platform in 4U, up to 102x3.5" HDD/SSD bays, 12Gb/s SAS + 6Gb/s SATA, dual redundant I/O modules, enterprise-grade reliability',
        image: "/images/wd/data102.jpg",
        datasheet:
          "https://drive.google.com/file/d/1y5OQcOQ4eaH9QwPCvHH6ywGMHlpxfhUV/view?usp=sharing",
      },
    ],
  },
  {
    id: "biomax",
    name: "BioMax",
    description: "Maximum Biometrics, Maximum Security - Advanced biometric access control solutions",
    logo: "/images/biomax.png",
    tagline: "Maximum Biometrics, Maximum Security",
    accentColor: "#7cc242",
    "products": [
    {
      "id": "biomax-n-bm22",
      "name": "BioMax N-BM22",
      "description": "Fingerprint & card time attendance system, 10K finger/card capacity, 200K log capacity, Linux based OS, Wi-Fi/TCP-IP connectivity, and built-in door access control relay.",
      "image": "/images/biomax/nbm22.png",
      "datasheet": "https://drive.google.com/file/d/1_TaNAgV_0sgBNeFlisuS_8efOehckTt-/view?usp=sharing"
    },
    {
      "id": "biomax-n-bioaccess",
      "name": "BioMax N-Bioaccess",
      "description": "Basic standalone fingerprint time attendance and access control terminal designed for cost-effective secure enterprise entry management.",
      "image": "/images/biomax/nbioaccess.png",
      "datasheet": "https://drive.google.com/file/d/1V5QT8_LTdGK8axP-F6xY1j0B8fYLN6lX/view?usp=sharing"
    },
    {
      "id": "biomax-access10",
      "name": "BioMax Access10",
      "description": "Offline standalone fingerprint access control system, 500 finger/card capacity, built-in relay door control, and a compact black-white LCD screen.",
      "image": "/images/biomax/access10.png",
      "datasheet": "https://drive.google.com/file/d/1Pp-aMXDquFLUgMZ1Qp0uEy9yXqaeIIeh/view?usp=sharing"
    },
    {
      "id": "biomax-flg22",
      "name": "BioMax FLG22",
      "description": "Smart fingerprint lock for frameless or framed glass doors, 100 user capacity, features a 1.77\" TN color screen, voice instruction, and wireless remote verification.",
      "image": "/images/biomax/flg22.png",
      "datasheet": "https://drive.google.com/file/d/1H2zRlEm7DnyDY8EUV1m46LOSQ7RnNAT2/view?usp=sharing"
    }
  ],
  },
  {
    id: "dorlet",
    name: "Dorlet",
    description: "Professional access control and security management systems",
    logo: "/images/dorlet.png",
    tagline: "Professional Access Control",
    accentColor: "#1e4d8c",
    products: [
      {
        id: "dorlet-d1221000",
        name: "D1221000",
        description:
          "Advanced full IP access controller & attendance for up to 2 readers/2 doors, includes alarms/intrusion panel, enclosure & power supply",
        image: "/dorlet-d1221000-controller.jpg",
        datasheet: "https://www.dorlet.com/en/products/access-control-and-intrusion/asdx/asd2-controller",
      },
      {
        id: "dorlet-14361000",
        name: "Dorlet 14361000",
        description:
          "Mural MIFARE R/W Proximity Card Reader (Black), ISO14443A 13.56MHz, read/write capability, suitable for indoor/outdoor installations",
        image: "/dorlet-mifare-reader-black.jpg",
        datasheet: "https://store.emacs.es/products/14361000",
      },
    ],
  },
  {
    id: "promise",
    name: "Promise Technology",
    description: "Enterprise storage, video surveillance, and cloud infrastructure solutions",
    logo: "/images/Promise.jpg",
    tagline: "Realize Your Vision",
    accentColor: "#00bcd4",
    products: [
      {
        id: "vess-a8600",
        name: "Vess A8600",
        description: "Video surveillance storage with AI-ready capabilities and edge analytics",
        image: "/video-surveillance-storage-server.jpg",
        datasheet: "/datasheets/vess-a8600.pdf",
      },
      {
        id: "vtrak-n1616",
        name: "VTrak N1616",
        description: "High-density NAS with 16 bays for media and content production workflows",
        image: "/high-density-nas-storage-system.jpg",
        datasheet: "/datasheets/vtrak-n1616.pdf",
      },
    ],
  },
  {
    id: "essl",
    name: "eSSL",
    description: "Security at Fingertips - Biometric and time attendance solutions",
    logo: "/images/eSSL.png",
    tagline: "Security at Fingertips",
    accentColor: "#2b5797",
    products: [
      {
        id: "essl-aiface-magnum",
        name: "ESSL AiFace Magnum",
        description:
          'Face & fingerprint biometric terminal, 1500 face/5000 finger/10K card capacity, 200K transactions, 2.4" touch screen, eSSLFace 3.5 algorithm, Linux OS',
        image: "/essl-aiface-magnum-terminal.jpg",
        datasheet: "https://www.esslsecurity.com/storage/app/media/face/Aiface-Magnum/Ai-face-Magnum.pdf",
      },
      {
        id: "essl-aiface-pluto",
        name: "ESSL AiFace-Pluto",
        description:
          'Linux-based hybrid biometric access control & time attendance, visible light facial recognition, 4" touch screen, 1000 faces/1000 cards, 150K transactions, IP65 rated',
        image: "/essl-aiface-pluto-terminal.jpg",
        datasheet: "/datasheets/essl-aiface-pluto.pdf",
      },
    ],
  },
]

export function getBrandById(brandId: string) {
  return brands.find((brand) => brand.id === brandId)
}

export function getProductsByBrandId(brandId: string) {
  const brand = getBrandById(brandId)
  return brand?.products || []
}

export function getProductById(brandId: string, productId: string) {
  const brand = getBrandById(brandId)
  return brand?.products.find((product) => product.id === productId)
}

export function getAllProducts() {
  return brands.flatMap((brand) =>
    brand.products.map((product) => ({
      ...product,
      brandId: brand.id,
      brandName: brand.name,
      brandLogo: brand.logo,
      brandAccentColor: brand.accentColor,
    })),
  )
}

export const solutions = [
  {
    id: "enterprise-networking",
    title: "Enterprise Networking",
    description: "Complete networking infrastructure for modern enterprises with industrial-grade reliability",
    brands: ["Zyxel Networks", "Antaira", "QSAN"],
    icon: "network",
  },
  {
    id: "video-surveillance",
    title: "Video Surveillance",
    description: "Comprehensive video security solutions from capture to storage and analytics",
    brands: ["Motorola Solutions", "Digifort", "Promise Technology"],
    icon: "camera",
  },
  {
    id: "access-control",
    title: "Access Control & Biometrics",
    description: "Advanced biometric and access management for secure facilities",
    brands: ["BioMax", "Dorlet", "eSSL"],
    icon: "shield",
  },
  {
    id: "data-storage",
    title: "Data Storage Solutions",
    description: "Enterprise-grade storage solutions for demanding workloads",
    brands: ["Western Digital", "QSAN", "Promise Technology"],
    icon: "server",
  },
]

export const partners = [
  { name: "Motorola Solutions", logo: "/images/motorola-solutions.jpg", slug: "motorola-solutions" },
  { name: "Digifort", logo: "/images/digifort.jpg", slug: "digifort" },
  { name: "Antaira", logo: "/images/antaira.jpg", slug: "antaira" },
  { name: "Zyxel Networks", logo: "/images/zyxel.png", slug: "zyxel" },
  { name: "QSAN", logo: "/images/qsan.png", slug: "qsan" },
  { name: "Western Digital", logo: "/images/western-digital.jpg", slug: "western-digital" },
  { name: "BioMax", logo: "/images/biomax.png", slug: "biomax" },
  { name: "Dorlet", logo: "/images/dorlet.png", slug: "dorlet" },
  { name: "Promise Technology", logo: "/images/Promise.jpg", slug: "promise" },
  { name: "eSSL", logo: "/images/eSSL.png", slug: "essl" },
]

export const events = [
{
  id: 0,
  title: "WeDist 5th Anniversary Celebration",
  date: "August 9, 2026",
  time: "all day",
  location: "WeDist",
  description:
    "Join us as we celebrate WeDist's 5th Anniversary, marking five years of innovation, partnerships, and growth with our valued customers, partners, and team.",
},
]

export const downloads = [
  {
    id: 1,
    title: "Company Profile",
    description: "Complete overview of WeDist - our services, partners, and capabilities",
    type: "PDF",
    size: "5.2 MB",
    isImportant: true,
    redirectPath: "company-profile",
    externalUrl:
      "https://drive.google.com/file/d/1BwheBcMnsrjPw-y1-aPobfzu9voyKIGd/view?usp=sharing",
  },
]

export const contactInfo = {
  email: "marketing@wedist.net",
  phone: "+974 3062 4212",
  address: {
    company: "Wedist QFZ LLC",
    line1: "Office No 1401, Wing 1, Level 4",
    line2: "Business Innovation Park",
    line3: "Ras Bufontas Free Zone",
    city: "Doha",
    country: "Qatar",
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/wedist",
    facebook: "https://www.facebook.com/WEDISTQFZ",
    instagram: "https://instagram.com/wedistqfz",
    youtube: "https://youtube.com/channel/UCFHIuJtxezhkuZEANnYLSsQ",
    whatsapp: "https://api.whatsapp.com/send?phone=97430624212",
  },
}
