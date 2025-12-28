"use client"

import type { ReactNode } from "react"

interface NeonBorderProps {
  children: ReactNode
  className?: string
  animate?: boolean
}

export function NeonBorder({ children, className = "", animate = true }: NeonBorderProps) {
  return (
    <div className={`relative ${className}`}>
      {animate && (
        <>
          <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-[#f5b800] to-transparent opacity-50 blur-sm" />
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div className="neon-line-h top-0 left-0" />
            <div className="neon-line-h bottom-0 right-0" style={{ animationDelay: "-1.5s" }} />
            <div className="neon-line-v left-0 top-0" style={{ animationDelay: "-0.75s" }} />
            <div className="neon-line-v right-0 bottom-0" style={{ animationDelay: "-2.25s" }} />
          </div>
        </>
      )}
      <div className="relative bg-[#121218] rounded-lg border border-[#f5b800]/20">{children}</div>
    </div>
  )
}
