"use client"

import Image from "next/image"
import Link from "next/link"
import { Download } from "lucide-react"
import { CyberCard } from "@/components/cyber-card"
import { HologramCard } from "@/components/hologram-card"
import { ElectricButton } from "@/components/electric-button"

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    image: string
    datasheet?: string
  }
  brandId: string
  accentColor: string
  index: number
}

export function ProductCard({ product, brandId, accentColor, index }: ProductCardProps) {
  const handleDatasheetClick = () => {
    if (product.datasheet) {
      window.open(product.datasheet, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <CyberCard className="h-full" tiltEffect>
      <HologramCard accentColor={accentColor}>
        <div
          className="bg-[#121218]/90 rounded-2xl overflow-hidden h-full group transition-all duration-500"
          style={{
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: `${accentColor}33`,
          }}
        >
          {/* Product Image */}
          <div
            className="aspect-video relative overflow-hidden"
            style={{
              background: `linear-gradient(to bottom right, ${accentColor}1a, #0a0a0f)`,
            }}
          >
            <div className="absolute inset-4 bg-white rounded-lg overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg?height=400&width=600"}
                alt={product.name}
                fill
                className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
            <div className="absolute inset-0 scanlines opacity-30" />
          </div>

          {/* Product Info */}
          <div className="p-8">
            <Link href={`/products/${brandId}/${product.id}`}>
              <h3
                className="text-2xl font-bold text-[#f0f0f5] mb-3 transition-colors cursor-pointer"
                style={{ ["--hover-color" as string]: accentColor }}
                onMouseEnter={(e) => (e.currentTarget.style.color = accentColor)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#f0f0f5")}
              >
                {product.name}
              </h3>
            </Link>
            <p className="text-base text-[#888899] mb-6 leading-relaxed line-clamp-3">{product.description}</p>

            {product.datasheet && (
  <ElectricButton
    className="w-full py-4 text-sm"
    accentColor={accentColor}
    onClick={handleDatasheetClick}
  >
    <div className="flex items-center justify-center flex-nowrap w-full">
      <Download className="w-4 h-4 mr-2 inline-block" />
      <span className="inline-block">Download Datasheet</span>
    </div>
  </ElectricButton>
)}

          </div>
        </div>
      </HologramCard>
    </CyberCard>
  )
}
