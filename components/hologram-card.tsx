"use client"

import type { ReactNode } from "react"

interface HologramCardProps {
  children: ReactNode
  className?: string
  accentColor?: string
}

export function HologramCard({ children, className = "", accentColor = "#f5b800" }: HologramCardProps) {
  return (
    <div className={`relative hologram rounded-xl overflow-hidden ${className}`}>
      {/* Hologram lines */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px"
            style={{
              top: `${i * 5}%`,
              background: `linear-gradient(90deg, transparent, ${accentColor}20, transparent)`,
              animation: `hologram-lines ${1 + i * 0.1}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2" style={{ borderColor: accentColor }} />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2" style={{ borderColor: accentColor }} />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2" style={{ borderColor: accentColor }} />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2" style={{ borderColor: accentColor }} />
    </div>
  )
}
