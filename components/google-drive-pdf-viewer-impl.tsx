"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import {
    Download,
    ExternalLink,
    Maximize2,
    Minimize2,
    ZoomIn,
    ZoomOut,
    ArrowUp,
    Share2,
    Check,
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
    const [numPages, setNumPages] = useState<number | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    // Aspect ratio (width / height) of the document's pages, used to reserve
    // height so pages don't jump/flash as they render during scroll.
    const [aspect, setAspect] = useState<number | null>(null)
    const [containerWidth, setContainerWidth] = useState(800)
    const [zoom, setZoom] = useState(1)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [copied, setCopied] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollRef = useRef<HTMLDivElement>(null)

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

    useEffect(() => {
        const root = document.documentElement
        const body = document.body

        if (isFullscreen) {
            root.style.overflow = "hidden"
            body.style.overflow = "hidden"
            body.style.touchAction = "none"
        } else {
            root.style.overflow = ""
            body.style.overflow = ""
            body.style.touchAction = ""
        }

        return () => {
            root.style.overflow = ""
            body.style.overflow = ""
            body.style.touchAction = ""
        }
    }, [isFullscreen])

    const toggleFullscreen = useCallback(async () => {
        const el = wrapperRef.current
        if (!el) return

        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen()
                return
            }

            if (typeof el.requestFullscreen === "function") {
                await el.requestFullscreen({ navigationUI: "hide" })
                return
            }
        } catch {
            // Fall back to the in-page expanded layout on browsers that block the
            // native fullscreen API (especially mobile Safari / some embedded webviews).
        }

        setIsFullscreen((prev) => !prev)
    }, [])

    // Final render width: fit the container, cap on large screens, apply zoom.
    const renderWidth = useMemo(() => {
        const cap = isFullscreen ? 1700 : 1240
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

    const shareUrl = useMemo(() => {
        if (typeof window === "undefined") return ""
        return `${window.location.origin}${window.location.pathname}`
    }, [])

    const copyShareLink = useCallback(async () => {
        if (!shareUrl) return
        try {
            await navigator.clipboard.writeText(shareUrl)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1600)
        } catch {
            // Ignore clipboard failures on unsupported browsers.
        }
    }, [shareUrl])

    // Observe each page as it scrolls through the viewport and keep the page
    // indicator in sync with whichever page is most centred. Re-created whenever
    // the page count changes so all page nodes are observed.
    const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map())

    const registerPage = useCallback((page: number, node: HTMLDivElement | null) => {
        if (node) pageRefs.current.set(page, node)
        else pageRefs.current.delete(page)
    }, [])

    useEffect(() => {
        if (!numPages || !scrollRef.current) return
        const observer = new IntersectionObserver(
            (entries) => {
                // Pick the most visible page that is currently intersecting.
                let best: { page: number; ratio: number } | null = null
                for (const entry of entries) {
                    const page = Number((entry.target as HTMLElement).dataset.page)
                    if (entry.isIntersecting && (!best || entry.intersectionRatio > best.ratio)) {
                        best = { page, ratio: entry.intersectionRatio }
                    }
                }
                if (best) setCurrentPage(best.page)
            },
            {
                root: scrollRef.current,rootMargin: "-35% 0px -35% 0px",threshold: 0,
            }
        )
        pageRefs.current.forEach((node) => observer.observe(node))
        return () => observer.disconnect()
    }, [numPages])

    if (!proxyUrl) {
        return <div className="text-[#ff6b6b] font-medium">Invalid or unparseable Google Drive link.</div>
    }

    const reservedHeight = aspect ? Math.round(renderWidth / aspect) : undefined

    return (
        <div className="w-full">
            {/* Top toolbar: back on the left, actions on the right. */}
            <div className="mb-4 flex justify-end">
                <div className="flex items-center gap-2">

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
                            onClick={copyShareLink}
                            aria-label="Copy page link"
                            className="inline-flex items-center gap-2 rounded-xl border border-[#2a2a36] bg-[#121218]/80 px-3 py-2 text-sm font-medium text-[#f0f0f5] hover:border-[#f5b800]/50 hover:text-[#f5b800] transition-colors"
                        >
                            {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                            <span className="hidden sm:inline">{copied ? "Copied" : "Share"}</span>
                        </button>
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
            </div>

            <div
                ref={wrapperRef}
                className="w-full data-[fs=true]:flex data-[fs=true]:h-screen data-[fs=true]:flex-col data-[fs=true]:bg-[#0a0a0f]"
                data-fs={isFullscreen}
            >
                <div
                    ref={containerRef}
                    className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col items-center gap-4 overflow-hidden rounded-2xl border border-[#2a2a36] bg-[#121218]/80 p-3 sm:p-4 md:p-6 data-[fs=true]:rounded-none data-[fs=true]:border-0"
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

                    {/* Continuous vertical scroll: all pages stacked and scrollable. */}
                    <div
                        ref={scrollRef}
                        className="w-full flex-1 overflow-auto overscroll-contain data-[fs=false]:max-h-[148vh]"
                        data-fs={isFullscreen}
                    >
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
                            <div className="flex flex-col items-center gap-4 py-1">
                                {Array.from({ length: numPages ?? 0 }, (_, i) => i + 1).map((p) => (
                                    <div
                                        key={p}
                                        data-page={p}
                                        ref={(node) => registerPage(p, node)}
                                        style={{ width: renderWidth, minHeight: reservedHeight }}
                                    >
                                        <Page
                                            pageNumber={p}
                                            width={renderWidth}
                                            renderTextLayer={false}
                                            renderAnnotationLayer={false}
                                            className="overflow-hidden rounded-lg border border-[#2a2a36] shadow-xl [&_canvas]:!h-auto [&_canvas]:!max-w-full"
                                            onLoadSuccess={(page) => {
                                                if (p === 1) setAspect(page.originalWidth / page.originalHeight)
                                            }}
                                            // Reserve the page height while it renders so scrolling
                                            // stays smooth and there is no layout flash.
                                            loading={<div style={{ height: reservedHeight ?? 0 }} />}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Document>
                    </div>
                    {numPages && (
                        <button
                            type="button"
                            onClick={() =>
                                scrollRef.current?.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                })
                            }
                            className="absolute bottom-4 left-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#2a2a36] bg-[#0a0a0f]/95 text-[#f0f0f5] shadow-lg backdrop-blur transition-colors hover:border-[#f5b800]/50 hover:text-[#f5b800]"
                            aria-label="Back to top"
                        >
                            <ArrowUp className="h-5 w-5" />
                        </button>
                    )}
                    {/* Page position indicator (read-only) once the document loads. */}
                    {numPages && numPages > 1 && (
                        <div className="pointer-events-none absolute bottom-4 right-4 rounded-xl border border-[#2a2a36] bg-[#0a0a0f]/95 px-3 py-1.5 text-sm font-medium text-[#cfd0da] backdrop-blur">
                            Page {currentPage} / {numPages}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
