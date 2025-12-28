"use client"

import { useEffect, useRef } from "react"

interface AnimatedGridProps {
  color?: string
  cellSize?: number
}

export function AnimatedGrid({ color = "#f5b800", cellSize = 60 }: AnimatedGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    let frame = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cols = Math.ceil(canvas.width / cellSize)
      const rows = Math.ceil(canvas.height / cellSize)

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cellSize
          const y = j * cellSize

          // Animated opacity based on position and time
          const wave = Math.sin((i + j + frame * 0.02) * 0.5) * 0.5 + 0.5
          const opacity = wave * 0.1

          ctx.strokeStyle = color
          ctx.globalAlpha = opacity
          ctx.lineWidth = 0.5

          // Draw cell
          ctx.strokeRect(x, y, cellSize, cellSize)

          // Draw corner dots
          if (wave > 0.7) {
            ctx.fillStyle = color
            ctx.globalAlpha = wave * 0.3
            ctx.beginPath()
            ctx.arc(x, y, 2, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      frame++
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [color, cellSize])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.6 }} />
}
