"use client"

interface MorphingBlobProps {
  color?: string
  size?: string
  className?: string
  opacity?: number
}

export function MorphingBlob({
  color = "#f5b800",
  size = "w-96 h-96",
  className = "",
  opacity = 0.15,
}: MorphingBlobProps) {
  return (
    <div
      className={`${size} rounded-full blur-3xl morph-bg ${className}`}
      style={{
        background: color,
        opacity,
      }}
    />
  )
}
