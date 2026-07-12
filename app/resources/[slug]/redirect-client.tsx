"use client"

import { useEffect } from "react"

interface ResourceRedirectClientProps {
  title: string
  externalUrl: string
}

export function ResourceRedirectClient({ title, externalUrl }: ResourceRedirectClientProps) {
  useEffect(() => {
    // Redirect almost immediately. A tiny timeout lets the interstitial paint
    // once (so the URL stays branded and shareable) without a noticeable pause.
    const timer = window.setTimeout(() => {
      // Use replace so the redirect screen is not kept in browser history
      // (the back button returns to the previous page, not this interstitial).
      window.location.replace(externalUrl)
    }, 80)

    return () => window.clearTimeout(timer)
  }, [externalUrl])

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5] flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full rounded-3xl border border-[#2a2a36] bg-[#121218]/90 p-8 shadow-2xl shadow-[#f5b800]/10">
        <div className="flex items-center gap-3 mb-4">
          <span
            className="inline-block h-5 w-5 rounded-full border-2 border-[#f5b800] border-t-transparent animate-spin"
            aria-hidden="true"
          />
          <h1 className="text-3xl font-bold">Redirecting...</h1>
        </div>
        <p className="text-xl text-[#f5b800] font-semibold mb-4">{title}</p>
        <p className="text-base leading-relaxed text-[#cfd0da] mb-6">
          You&apos;re being redirected to the external resource now.
        </p>
        <p className="text-sm text-[#888899] mb-6">
          If the redirect does not happen automatically, click the link below.
        </p>
        <a
          href={externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-[#f5b800] px-5 py-3 text-sm font-semibold text-[#0a0a0f] hover:bg-[#c49400] transition-colors"
        >
          Open resource now
        </a>
      </div>
    </div>
  )
}
