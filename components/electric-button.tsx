"use client"

import { type ReactNode, useState } from "react"
import { Button } from "@/components/ui/button"

interface ElectricButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  accentColor?: string
}

export function ElectricButton({ children, className = "", onClick, accentColor = "#f5b800" }: ElectricButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Button
      className={`relative overflow-hidden group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        background: accentColor,
        color: "#0a0a0f",
        boxShadow: isHovered ? `0 0 30px ${accentColor}80, 0 0 60px ${accentColor}40` : `0 0 20px ${accentColor}40`,
      }}
    >
      {/* Electric arcs on hover */}
      {isHovered && (
        <>
          <span className="absolute top-0 left-1/4 w-px h-full bg-white/50 electric-arc" />
          <span
            className="absolute top-0 left-2/4 w-px h-full bg-white/30 electric-arc"
            style={{ animationDelay: "0.05s" }}
          />
          <span
            className="absolute top-0 left-3/4 w-px h-full bg-white/40 electric-arc"
            style={{ animationDelay: "0.1s" }}
          />
        </>
      )}

      {/* Shine effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

      <span className="relative z-10 font-semibold">{children}</span>
    </Button>
  )
}
