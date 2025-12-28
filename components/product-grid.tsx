"use client"

import { ScrollReveal } from "@/components/scroll-reveal"
import { ProductCard } from "@/components/product-card"
import type { LucideIcon } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  image: string
  datasheet?: string
}

interface ProductGridProps {
  products: Product[]
  brandId: string
  brandName: string
  accentColor: string
  icon: LucideIcon
}

export function ProductGrid({ products, brandId, brandName, accentColor, icon: Icon }: ProductGridProps) {
  return (
    <section className="py-32 bg-[#050508] relative overflow-hidden">
      <div className="absolute inset-0 hex-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal animation="up">
          <div className="text-center mb-20">
            <div
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full mb-6"
              style={{
                backgroundColor: `${accentColor}1a`,
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: `${accentColor}4d`,
              }}
            >
              <Icon className="w-5 h-5" style={{ color: accentColor }} />
              <span className="text-sm font-medium tracking-[0.2em]" style={{ color: accentColor }}>
                PRODUCT LINEUP
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#f0f0f5]">
              <span style={{ color: accentColor }}>{brandName}</span> Products
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {products.map((product, index) => (
            <ScrollReveal key={product.id} animation={index % 2 === 0 ? "left" : "right"} delay={index * 150}>
              <ProductCard product={product} brandId={brandId} accentColor={accentColor} index={index} />
            </ScrollReveal>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#888899] text-lg">No products available at this time.</p>
          </div>
        )}
      </div>
    </section>
  )
}
