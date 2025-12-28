"use client"

import { useEffect, useState } from "react"

interface GlitchTextProps {
  text: string
  className?: string
  glitchOnHover?: boolean
  autoGlitch?: boolean
  glitchInterval?: number
}

export function GlitchText({
  text,
  className = "",
  glitchOnHover = true,
  autoGlitch = false,
  glitchInterval = 5000,
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const [displayText, setDisplayText] = useState(text)

  useEffect(() => {
    if (!autoGlitch) return

    const interval = setInterval(() => {
      triggerGlitch()
    }, glitchInterval)

    return () => clearInterval(interval)
  }, [autoGlitch, glitchInterval])

  const triggerGlitch = () => {
    setIsGlitching(true)
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    let iterations = 0
    const maxIterations = 10

    const glitchEffect = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, i) => {
            if (i < iterations) return text[i]
            return glitchChars[Math.floor(Math.random() * glitchChars.length)]
          })
          .join(""),
      )

      iterations += 1
      if (iterations > text.length) {
        clearInterval(glitchEffect)
        setDisplayText(text)
        setIsGlitching(false)
      }
    }, 30)
  }

  return (
    <span
      className={`${className} ${glitchOnHover ? "cursor-pointer" : ""} ${isGlitching ? "text-glow" : ""}`}
      onMouseEnter={() => glitchOnHover && triggerGlitch()}
      data-text={text}
    >
      {displayText}
    </span>
  )
}
