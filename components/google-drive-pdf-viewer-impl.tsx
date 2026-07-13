"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Document, Page, pdfjs } from "react-pdf"
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react"

// import "react-pdf/dist/Page/AnnotationLayer.css"
// import "react-pdf/dist/Page/TextLayer.css"

// Load the PDF.js worker from a CDN, version-matched to the installed pdfjs.
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

interface ViewerProps {
  shareLink: string
  title?: string
}

// Extract a Google Drive file id from either a /d/<id>/ or ?id=<id> style link.
function getDriveFileId(link: string): string | null {
  const match = link.match(/\/d\/([a-zA-Z0-9-_]+)/) ?? link.match(/[?&]id=([a-zA-Z0-9-_]+)/)
  return match ? match[1] : null
}

export function GoogleDrivePdfViewerImpl({ shareLink, title }: ViewerProps) {
  const router = useRouter()
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState(1)
  // `layers` holds the pages currently mounted. During a page change the
  // outgoing page stays underneath while the incoming one renders on top,
  // so there is no blank flash. Once the new page paints we prune to just it.
  const [layers, setLayers] = useState<number[]>([1])
  // Aspect ratio (width / height) of the current page, used to reserve height
  // and prevent layout jump while the next page renders.
  const [aspect, setAspect] = useState<number | null>(null)
  const [containerWidth, setContainerWidth] = useState(800)
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Keep the rendered page width in sync with the container size. We subtract
  // the container's horizontal padding so the page never overflows on phones.
  useEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current

    const measure = () => {
      const styles = window.getComputedStyle(el)
      const paddingX = Number.parseFloat(styles.paddingLeft) + Number.parseFloat(styles.paddingRight)
      const inner = el.clientWidth - paddingX
      if (inner > 0) setContainerWidth(inner)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Track native fullscreen state so the toggle icon stays in sync (e.g. Esc key).
  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener("fullscreenchange", onChange)
    return () => document.removeEventListener("fullscreenchange", onChange)
  }, [])

  const toggleFullscreen = useCallback(async () => {
    const el = wrapperRef.current
    if (!el) return
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      } else {
        await el.requestFullscreen()
      }
    } catch {
      // Ignore: some browsers/iframes block the Fullscreen API.
    }
  }, [])

  // Final render width: fit the container, cap on large screens, apply zoom.
  const renderWidth = useMemo(() => {
    const cap = isFullscreen ? 1400 : 900
    const base = Math.min(containerWidth, cap)
    return Math.max(240, Math.floor(base * zoom))
  }, [containerWidth, zoom, isFullscreen])

  const proxyUrl = useMemo(() => {
    const fileId = getDriveFileId(shareLink)
    return fileId ? `/api/pdf-proxy?id=${fileId}` : null
  }, [shareLink])

  const downloadName = useMemo(() => {
    const base = (title ?? "document").replace(/[^\w\-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")
    return `${base || "document"}.pdf`
  }, [title])

  // Navigate: update the target page and push it as a new top layer (deduped),
  // keeping the previous page mounted underneath until the new one renders.
  const navigate = useCallback((next: number) => {
    setPageNumber(next)
    setLayers((prev) => [...prev.filter((p) => p !== next), next])
  }, [])

  const goPrev = useCallback(() => navigate(Math.max(1, pageNumber - 1)), [navigate, pageNumber])
  const goNext = useCallback(
    () => navigate(numPages ? Math.min(numPages, pageNumber + 1) : pageNumber),
    [navigate, numPages, pageNumber],
  )

  if (!proxyUrl) {
    return <div className="text-[#ff6b6b] font-medium">Invalid or unparseable Google Drive link.</div>
  }

  return (
    <div className="w-full">
      {/* Top toolbar: back on the left, actions on the right. */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-xl border border-[#2a2a36] bg-[#121218]/80 px-3 py-2 text-sm font-medium text-[#f0f0f5] hover:border-[#f5b800]/50 hover:text-[#f5b800] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <a
            href={proxyUrl}
            download={downloadName}
            className="inline-flex items-center gap-2 rounded-xl border border-[#2a2a36] bg-[#121218]/80 px-3 py-2 text-sm font-medium text-[#f0f0f5] hover:border-[#f5b800]/50 hover:text-[#f5b800] transition-colors"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download</span>
          </a>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            className="inline-flex items-center gap-2 rounded-xl border border-[#2a2a36] bg-[#121218]/80 px-3 py-2 text-sm font-medium text-[#f0f0f5] hover:border-[#f5b800]/50 hover:text-[#f5b800] transition-colors"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            <span className="hidden sm:inline">{isFullscreen ? "Exit" : "Fullscreen"}</span>
          </button>
        </div>
      </div>

      <div
        ref={wrapperRef}
        className="w-full data-[fs=true]:flex data-[fs=true]:h-screen data-[fs=true]:flex-col data-[fs=true]:bg-[#0a0a0f]"
        data-fs={isFullscreen}
      >
        <div
          ref={containerRef}
          className="flex flex-1 flex-col items-center gap-6 overflow-hidden rounded-2xl border border-[#2a2a36] bg-[#121218]/80 p-3 sm:p-4 md:p-8 data-[fs=true]:rounded-none data-[fs=true]:border-0"
          data-fs={isFullscreen}
        >
          {/* Zoom controls: essential for readable datasheets on small screens. */}
          {numPages && (
            <div className="flex w-full items-center justify-center gap-2">
              <div className="flex items-center gap-1 rounded-xl border border-[#2a2a36] bg-[#0a0a0f] px-2 py-1.5">
                <button
                  type="button"
                  aria-label="Zoom out"
                  disabled={zoom <= 0.6}
                  onClick={() => setZoom((z) => Math.max(0.6, Math.round((z - 0.2) * 10) / 10))}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#f0f0f5] hover:bg-[#1a1a24] disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="min-w-[3rem] text-center text-xs font-medium text-[#cfd0da]">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  aria-label="Zoom in"
                  disabled={zoom >= 2.4}
                  onClick={() => setZoom((z) => Math.min(2.4, Math.round((z + 0.2) * 10) / 10))}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#f0f0f5] hover:bg-[#1a1a24] disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Horizontal scroll wrapper so zoomed pages can pan on mobile. */}
          <div className="w-full flex-1 overflow-auto overscroll-contain">
            <div className="flex min-w-full justify-center">
              <Document
                file={proxyUrl}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                loading={
                  <div className="flex items-center gap-3 py-16 text-[#cfd0da]">
                    <span className="inline-block h-5 w-5 rounded-full border-2 border-[#f5b800] border-t-transparent animate-spin" />
                    Loading document...
                  </div>
                }
                error={
                  <div className="flex flex-col items-center gap-3 py-16 text-center">
                    <p className="text-[#ff6b6b]">Could not load the document inline.</p>
                    <a
                      href={shareLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[#f5b800] hover:text-[#c49400]"
                    >
                      Open the original on Google Drive
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                }
              >
                <div
                  className="relative"
                  style={{
                    width: renderWidth,
                    minHeight: aspect ? Math.round(renderWidth / aspect) : undefined,
                  }}
                >
                  {layers.map((p, i) => {
                    const isTop = i === layers.length - 1
                    return (
                      <div key={p} className={i === 0 ? "relative" : "absolute inset-0"}>
                        <Page
                          pageNumber={p}
                          width={renderWidth}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                          className="overflow-hidden rounded-lg border border-[#2a2a36] shadow-xl [&_canvas]:!h-auto [&_canvas]:!max-w-full"
                          onLoadSuccess={(page) =>
                            setAspect(page.originalWidth / page.originalHeight)
                          }
                          onRenderSuccess={
                            isTop
                              ? () => setLayers((prev) => (prev[prev.length - 1] === p ? [p] : prev))
                              : undefined
                          }
                          // No spinner here: the previous page stays visible
                          // underneath until this one paints, avoiding a flash.
                          loading={<div style={{ height: aspect ? Math.round(renderWidth / aspect) : 0 }} />}
                        />
                      </div>
                    )
                  })}
                </div>
              </Document>
            </div>
          </div>

          {/* Page navigation, only once the document has loaded. */}
          {numPages && numPages > 1 && (
            <div className="sticky bottom-2 flex items-center gap-3 rounded-xl border border-[#2a2a36] bg-[#0a0a0f]/95 px-3 py-2 backdrop-blur">
              <button
                type="button"
                disabled={pageNumber <= 1}
                onClick={goPrev}
                className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-[#f0f0f5] hover:bg-[#1a1a24] disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>
              <span className="text-sm font-medium text-[#cfd0da]">
                Page {pageNumber} / {numPages}
              </span>
              <button
                type="button"
                disabled={pageNumber >= numPages}
                onClick={goNext}
                className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-[#f0f0f5] hover:bg-[#1a1a24] disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
