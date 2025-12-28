"use client"

import { useEffect, useRef } from "react"

interface DataStreamBgProps {
  color?: string
}

export function DataStreamBg({ color = "#f5b800" }: DataStreamBgProps) {
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

    const streams: { x: number; y: number; speed: number; length: number; chars: string[] }[] = []
    const charSet = "01アイウエオカキクケコサシスセソタチツテト"

    // Initialize streams
    for (let i = 0; i < 30; i++) {
      streams.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        speed: Math.random() * 3 + 1,
        length: Math.floor(Math.random() * 15) + 5,
        chars: Array.from({ length: 20 }, () => charSet[Math.floor(Math.random() * charSet.length)]),
      })
    }

    const animate = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = "14px monospace"

      streams.forEach((stream) => {
        stream.chars.forEach((char, i) => {
          const y = stream.y + i * 20
          const opacity = 1 - i / stream.chars.length

          if (i === 0) {
            ctx.fillStyle = "#ffffff"
            ctx.globalAlpha = 0.9
          } else {
            ctx.fillStyle = color
            ctx.globalAlpha = opacity * 0.4
          }

          ctx.fillText(char, stream.x, y)
        })

        stream.y += stream.speed

        if (stream.y > canvas.height + 400) {
          stream.y = -400
          stream.x = Math.random() * canvas.width
        }

        // Randomly change characters
        if (Math.random() > 0.95) {
          const idx = Math.floor(Math.random() * stream.chars.length)
          stream.chars[idx] = charSet[Math.floor(Math.random() * charSet.length)]
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [color])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.5 }} />
}
