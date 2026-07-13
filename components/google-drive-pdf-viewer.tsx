"use client"

import dynamic from "next/dynamic"
import { FileText } from "lucide-react"

interface ViewerProps {
  shareLink: string
  title?: string
}

// react-pdf pulls in pdfjs, which touches browser-only globals like DOMMatrix at
// import time. Loading the implementation with ssr:false guarantees the module is
// only ever evaluated in the browser, avoiding the "DOMMatrix is not defined" crash.
const GoogleDrivePdfViewerImpl = dynamic(
  () => import("./google-drive-pdf-viewer-impl").then((m) => m.GoogleDrivePdfViewerImpl),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center gap-3 rounded-2xl border border-[#2a2a36] bg-[#121218]/80 py-16 px-4 text-[#cfd0da]">
        <FileText className="h-5 w-5 text-[#f5b800]" />
        Preparing viewer...
      </div>
    ),
  },
)

export function GoogleDrivePdfViewer(props: ViewerProps) {
  return <GoogleDrivePdfViewerImpl {...props} />
}
