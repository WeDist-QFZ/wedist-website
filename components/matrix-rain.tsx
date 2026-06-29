"use client"

import { useEffect, useState } from "react"

export function MatrixRain() {
  const [columns, setColumns] = useState<{ id: number; x: number; delay: number; duration: number; chars: string }[]>(
    [],
  )

  useEffect(() => {
    const chars = "♔ ♚ ♕ ♛ ♖ ♜ ♘ ♞ ♙ ♟ ♘ ♞"
    const newColumns = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 10 + 10,
      chars: Array.from({ length: 30 }, () => chars[Math.floor(Math.random() * chars.length)]).join(""),
    }))
    setColumns(newColumns)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {columns.map((col) => (
        <div
          key={col.id}
          className="matrix-column"
          style={{
            left: `${col.x}%`,
            animationDelay: `${col.delay}s`,
            animationDuration: `${col.duration}s`,
          }}
        >
          {col.chars}
        </div>
      ))}
    </div>
  )
}
