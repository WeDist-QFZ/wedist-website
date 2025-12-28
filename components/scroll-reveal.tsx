"use client"

import type { ReactNode } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

type AnimationType = "up" | "left" | "right" | "scale" | "rotate" | "fade"

interface ScrollRevealProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  className?: string
  threshold?: number
}

export function ScrollReveal({
  children,
  animation = "up",
  delay = 0,
  duration = 800,
  className = "",
  threshold = 0.1,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold })

  const animationClasses: Record<AnimationType, string> = {
    up: "reveal-up",
    left: "reveal-left",
    right: "reveal-right",
    scale: "reveal-scale",
    rotate: "reveal-rotate",
    fade: "reveal-up",
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
      }}
    >
      <div className={isVisible ? animationClasses[animation] : ""}>{children}</div>
    </div>
  )
}
