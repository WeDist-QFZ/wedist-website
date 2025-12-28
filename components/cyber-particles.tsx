"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  type: "circle" | "square" | "diamond"
}

interface CyberParticlesProps {
  count?: number
  color?: string
}

export function CyberParticles({ count = 30, color = "#f5b800" }: CyberParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const types: ("circle" | "square" | "diamond")[] = ["circle", "square", "diamond"]
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 3,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 8,
      type: types[Math.floor(Math.random() * types.length)],
    }))
    setParticles(newParticles)
  }, [count])

  const getShape = (type: string, size: number) => {
    switch (type) {
      case "square":
        return { borderRadius: "2px", transform: "rotate(0deg)" }
      case "diamond":
        return { borderRadius: "2px", transform: "rotate(45deg)" }
      default:
        return { borderRadius: "50%" }
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            bottom: `-${particle.size}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: color,
            boxShadow: `0 0 ${particle.size * 2}px ${color}, 0 0 ${particle.size * 4}px ${color}`,
            animation: `particle-rise ${particle.duration}s ease-out infinite`,
            animationDelay: `${particle.delay}s`,
            ...getShape(particle.type, particle.size),
          }}
        />
      ))}
    </div>
  )
}
