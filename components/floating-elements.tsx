"use client"

import { useEffect, useState } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  delay: number
}

interface FloatingElementsProps {
  count?: number
  color?: string
}

export function FloatingElements({ count = 8, color = "#f5b800" }: FloatingElementsProps) {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const newElements: FloatingElement[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 300 + 100,
      opacity: Math.random() * 0.1 + 0.05,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }))
    setElements(newElements)
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute rounded-full blur-3xl morph-bg"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            width: `${el.size}px`,
            height: `${el.size}px`,
            background: color,
            opacity: el.opacity,
            animationDuration: `${el.duration}s`,
            animationDelay: `${el.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
