"use client"

import type { ReactNode } from "react"
import { useParallax } from "@/hooks/use-scroll-animation"

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function ParallaxSection({ children, speed = 0.5, className = "" }: ParallaxSectionProps) {
  const offset = useParallax(speed)

  return (
    <div className={className} style={{ transform: `translateY(${offset}px)` }}>
      {children}
    </div>
  )
}
