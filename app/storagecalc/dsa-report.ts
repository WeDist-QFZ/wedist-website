/* -------------------------------------------------------------------------- */
/*  Qatar DSA - CCTV storage calculation report (A4 landscape PDF)             */
/*  Loaded on demand from the client:  await import("./dsa-report")           */
/* -------------------------------------------------------------------------- */

import { jsPDF } from "jspdf"
import autoTable, { type CellInput, type RowInput } from "jspdf-autotable"

import {
  REF_BITRATE,
  REF_DAYS,
  REF_TIB,
  arrayLabel,
  fmt,
  hueOf,
  type EncIn,
  type RaidLevel,
  type Role,
  type RoleResult,
  type SetResult,
} from "./raid-engine"

export interface ReportCameraSet {
  id: number
  name: string
  count: number
  failoverCount: number
  bitrate: number
  resolution: string
  codec: string
  fps: string
  motion: string
}
export interface ReportStorageSet {
  id: number
  name: string
  model: string
  channels: number
  hddType: string
  encs: (EncIn & { model: string })[]
  result: SetResult
}
export interface ReportRole {
  role: Role
  days: number
  sets: ReportStorageSet[]
  result: RoleResult
}
export interface ReportInput {
  projectName: string
  partnerName: string
  revision: string
  date: string // already formatted dd-mm-yyyy
  documentNo: string
  preparedBy: string
  consultant: string
  contact: string
  notes: string
  partnerLogo?: string // data URL
  clientLogo?: string // data URL
  level: RaidLevel
  groupSize: number
  cameraSets: ReportCameraSet[]
  primary: ReportRole
  failover?: ReportRole
}

/* ---------------------------------- style --------------------------------- */

type RGB = [number, number, number]
const MAROON: RGB = [128, 21, 52]
const MAROON_SOFT: RGB = [248, 232, 236]
const INK: RGB = [25, 25, 30]
const GREY: RGB = [110, 110, 120]
const RED: RGB = [200, 20, 40]
const GREEN: RGB = [20, 140, 60]
const LINE: RGB = [150, 150, 160]

const PAGE_W = 297
const PAGE_H = 210
const M = 10 // side margin (mm)

function hslToRgb(h: number, s: number, l: number): RGB {
  s /= 100
  l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))]
}

const n2 = (n: number) => fmt(n, 2)
const lastY = (doc: jsPDF) =>
  (doc as unknown as { lastAutoTable?: { finalY?: number } }).lastAutoTable?.finalY ?? M

/** Plain ASCII-safe text for the built-in Helvetica font. */
const safe = (s: string) =>
  (s ?? "")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/[^\x09\x0A\x0D\x20-\x7E -ÿ]/g, "")

function imageFormat(dataUrl: string) {
  const m = /^data:image\/(png|jpe?g|webp)/i.exec(dataUrl)
  if (!m) return null
  const t = m[1].toLowerCase()
  return t === "png" ? "PNG" : t === "webp" ? "WEBP" : "JPEG"
}

function drawLogo(doc: jsPDF, dataUrl: string | undefined, x: number, y: number, maxW: number, maxH: number, align: "left" | "right") {
  if (!dataUrl) return
  const format = imageFormat(dataUrl)
  if (!format) return
  try {
    const props = doc.getImageProperties(dataUrl)
    const ratio = props.width / props.height
    let w = maxW
    let h = w / ratio
    if (h > maxH) {
      h = maxH
      w = h * ratio
    }
    doc.addImage(dataUrl, format, align === "right" ? x + maxW - w : x, y + (maxH - h) / 2, w, h)
  } catch {
    /* unreadable image - skip */
  }
}

function bar(doc: jsPDF, y: number, text: string, opts: { h?: number; size?: number; fill?: RGB; color?: RGB } = {}) {
  const h = opts.h ?? 6
  doc.setFillColor(...(opts.fill ?? MAROON))
  doc.rect(M, y, PAGE_W - 2 * M, h, "F")
  doc.setFont("helvetica", "bold")
  doc.setFontSize(opts.size ?? 10)
  doc.setTextColor(...(opts.color ?? ([255, 255, 255] as RGB)))
  doc.text(safe(text), PAGE_W / 2, y + h / 2 + 1.3, { align: "center" })
  return y + h
}

function ensureSpace(doc: jsPDF, y: number, needed: number, top = 22) {
  if (y + needed > PAGE_H - 16) {
    doc.addPage()
    return top
  }
  return y
}

/* --------------------------------- tables --------------------------------- */

const HEAD = [
  "NVR / Storage server",
  "No. of channels",
  "No. of HDD bays",
  "Type of HDD",
  "Size of HDD (TB)",
  "Disk pool / array",
  "# HDD in each array",
  "HDD for RAID (parity)",
  "Hot spare HDD",
  "Total # HDD",
  "No. of cameras",
  "Recording resolution",
  "Recording codec",
  "FPS",
  "Bitrate (Mbps)",
  "Motion (%)",
  "Recording days",
  "Required storage per camera (TiB)",
  "Total storage required (TiB)",
  "Available storage (TiB)",
  "Proposed storage (TB raw)",
]

function setLabel(s: ReportStorageSet) {
  const jbods = s.encs.filter((e) => e.kind === "jbod")
  const parts = [s.name || "Storage"]
  if (s.model) parts.push(`(Model: ${s.model})`)
  if (jbods.length) {
    const models = [...new Set(jbods.map((j) => j.model).filter(Boolean))]
    parts.push(`+ ${jbods.length} JBOD${jbods.length > 1 ? "s" : ""}${models.length ? ` (${models.join(", ")})` : ""}`)
  }
  return safe(parts.join("\n"))
}

function sizesLabel(sizes: number[]) {
  const u = [...new Set(sizes)].sort((a, b) => a - b)
  return u.map((d) => `${d}`).join(" / ")
}

function roleRows(input: ReportInput, role: ReportRole) {
  const cams = new Map(input.cameraSets.map((c) => [c.id, c]))
  const body: RowInput[] = []
  const red = { textColor: RED, fontStyle: "bold" as const }

  for (const s of role.sets) {
    const r = s.result
    const plan = r.plan
    const totalBays = s.encs.reduce((a, e) => a + e.bays, 0)
    const totalHdd = plan.dataDrives + plan.parityDrives + plan.spareDrives
    const usedSizes = plan.groups.length ? plan.groups.map((g) => g.drive) : s.encs.map((e) => e.drive)

    const groupRows = plan.groups.map((g, gi) => ({ g, gi, loads: r.groupLoads[gi]?.assignments ?? [] }))
    const setRowCount = Math.max(1, groupRows.reduce((a, x) => a + Math.max(1, x.loads.length), 0))

    const setCells: CellInput[] = [
      { content: setLabel(s), rowSpan: setRowCount, styles: { fontStyle: "bold", halign: "center" } },
      { content: s.channels > 0 ? String(s.channels) : "-", rowSpan: setRowCount },
      { content: String(totalBays), rowSpan: setRowCount },
      { content: safe(s.hddType), rowSpan: setRowCount },
      { content: sizesLabel(usedSizes), rowSpan: setRowCount },
    ]

    if (!groupRows.length) {
      body.push([
        ...setCells,
        "-", "-", "-",
        String(plan.spareDrives),
        String(totalHdd),
        "0",
        { content: "No cameras assigned to this storage set", colSpan: 8, styles: { textColor: GREY } },
        "0.00",
        "-",
      ])
      continue
    }

    let first = true
    groupRows.forEach(({ g, gi, loads }) => {
      const span = Math.max(1, loads.length)
      const groupCells: CellInput[] = [
        { content: arrayLabel(gi), rowSpan: span, styles: { fontStyle: "bold" } },
        { content: String(g.size), rowSpan: span },
        { content: String(g.parity), rowSpan: span },
      ]
      const tail = (k: number): CellInput[] =>
        k === 0
          ? [
              { content: n2(g.usableTiB), rowSpan: span },
              { content: String(g.size * g.drive), rowSpan: span, styles: { fontStyle: "bold" } },
            ]
          : []

      const camCells = (k: number): CellInput[] => {
        const a = loads[k]
        if (!a) return ["0", "-", "-", "-", "-", "-", String(role.days), "-", "0.00"]
        const c = cams.get(a.camSetId)
        return [
          { content: String(a.count), styles: { fontStyle: "bold" } },
          safe(c?.resolution ?? "-"),
          safe(c?.codec ?? "-"),
          safe(c?.fps || "-"),
          c ? fmt(c.bitrate, c.bitrate % 1 ? 2 : 1) : "-",
          safe(c?.motion || "-"),
          String(role.days),
          fmt(a.perCamTiB, 3),
          n2(a.count * a.perCamTiB),
        ]
      }

      for (let k = 0; k < span; k++) {
        const row: CellInput[] = []
        if (first) {
          row.push(...setCells.slice(0, 5))
        }
        if (k === 0) row.push(...groupCells)
        if (first) {
          row.push(
            { content: String(plan.spareDrives), rowSpan: setRowCount, styles: { fontStyle: "bold" } },
            { content: String(totalHdd), rowSpan: setRowCount, styles: { fontStyle: "bold" } },
          )
        }
        row.push(...camCells(k), ...tail(k))
        body.push(row)
        first = false
      }
    })
  }

  const res = role.result
  const totalHdd = res.dataDrives + res.parityDrives + res.spareDrives
  if (res.unassignedCams > 0) {
    body.push([
      { content: "NOT ACCOMMODATED - insufficient storage", colSpan: 10, styles: { ...red, halign: "right" } },
      { content: String(res.unassignedCams), styles: red },
      {
        content: `Short by ${n2(res.shortfallTiB)} TiB - approx. ${res.extraDrivesNeeded} more drives (and bays) required`,
        colSpan: 7,
        styles: red,
      },
      { content: n2(res.shortfallTiB), styles: red },
      { content: "-", styles: red },
      { content: "-", styles: red },
    ])
  }
  body.push([
    { content: "Grand Total:", colSpan: 9, styles: { halign: "right", fontStyle: "bold", fillColor: MAROON_SOFT } },
    { content: String(totalHdd), styles: { fontStyle: "bold", fillColor: MAROON_SOFT } },
    { content: String(res.cameras), styles: { fontStyle: "bold", fillColor: MAROON_SOFT } },
    { content: "Grand Total Storage:", colSpan: 7, styles: { halign: "right", fontStyle: "bold", fillColor: MAROON_SOFT } },
    { content: n2(res.requiredTiB + res.shortfallTiB), styles: { fontStyle: "bold", textColor: RED, fillColor: MAROON_SOFT } },
    { content: n2(res.usableTiB), styles: { fontStyle: "bold", textColor: RED, fillColor: MAROON_SOFT } },
    { content: String(res.rawTB), styles: { fontStyle: "bold", textColor: RED, fillColor: MAROON_SOFT } },
  ])
  return body
}

function drawRoleTable(doc: jsPDF, input: ReportInput, role: ReportRole, startY: number) {
  let y = ensureSpace(doc, startY, 30)
  const title = `${role.role === "primary" ? "PRIMARY" : "FAILOVER"} STORAGE: ${role.days} DAYS`
  y = bar(doc, y, title, { h: 5.5, size: 9 })
  autoTable(doc, {
    startY: y,
    margin: { left: M, right: M, top: 22, bottom: 16 },
    theme: "grid",
    head: [HEAD],
    body: roleRows(input, role),
    rowPageBreak: "avoid",
    styles: {
      font: "helvetica",
      fontSize: 6.3,
      cellPadding: 0.9,
      halign: "center",
      valign: "middle",
      lineColor: LINE,
      lineWidth: 0.15,
      textColor: INK,
      overflow: "linebreak",
    },
    headStyles: { fillColor: [235, 235, 238], textColor: INK, fontStyle: "bold", fontSize: 5.8 },
    columnStyles: { 0: { cellWidth: 27 } },
  })
  return lastY(doc)
}

function resolutionBreakdown(input: ReportInput, role: ReportRole) {
  const cams = new Map(input.cameraSets.map((c) => [c.id, c]))
  const by = new Map<string, number>()
  for (const s of role.result.sets)
    for (const a of s.assignments) {
      const res = cams.get(a.camSetId)?.resolution || "Other"
      by.set(res, (by.get(res) ?? 0) + a.count)
    }
  return [...by.entries()]
}

function summaryRows(input: ReportInput, role: ReportRole): RowInput[] {
  const r = role.result
  const sizes = new Set<number>()
  role.sets.forEach((s) => s.result.plan.groups.forEach((g) => sizes.add(g.drive)))
  const sizeText = sizes.size ? [...sizes].sort((a, b) => a - b).map((d) => `${d}TB`).join(" & ") : "-"
  const usedSets = role.sets.filter((s) => s.result.cameras > 0).length
  const rows: RowInput[] = [
    ["Number of storage servers:", `${usedSets}${usedSets !== role.sets.length ? ` (of ${role.sets.length} defined)` : ""}`],
    ["Number of HDD:", `${r.dataDrives + r.parityDrives + r.spareDrives} (incl. ${r.spareDrives} hot spare)`],
    ["Size of HDD:", sizeText],
    ["RAID type:", `RAID ${input.level}`],
    ["Number of cameras:", String(r.cameras)],
    ...resolutionBreakdown(input, role).map(([k, v]) => [`${safe(k)} recording:`, String(v)] as RowInput),
    ["Retention:", `${role.days} days, 24/7`],
    [
      { content: "Total required storage:", styles: { fontStyle: "bold" } },
      { content: `${n2(r.requiredTiB + r.shortfallTiB)} TiB`, styles: { textColor: RED, fontStyle: "bold" } },
    ],
    [
      { content: "Total available storage:", styles: { fontStyle: "bold" } },
      { content: `${n2(r.usableTiB)} TiB`, styles: { textColor: RED, fontStyle: "bold" } },
    ],
    [
      { content: "Total proposed storage:", styles: { fontStyle: "bold" } },
      { content: `${r.rawTB} TB`, styles: { textColor: GREEN, fontStyle: "bold" } },
    ],
    [
      { content: "Status:", styles: { fontStyle: "bold" } },
      r.feasible
        ? { content: "Requirement met", styles: { textColor: GREEN, fontStyle: "bold" } }
        : { content: `Insufficient - ${r.unassignedCams} cameras not accommodated`, styles: { textColor: RED, fontStyle: "bold" } },
    ],
  ]
  return rows
}

function drawSummaries(doc: jsPDF, input: ReportInput, startY: number) {
  const roles = [input.primary, input.failover].filter(Boolean) as ReportRole[]
  const title = (r: ReportRole) => `Summary (${r.role === "primary" ? "Primary" : "Failover"} Storage)`
  const blank = { content: "", styles: { lineWidth: 0, fillColor: [255, 255, 255] as RGB } }

  // One combined table, kept on a single page (pageBreak: "avoid"), so the two
  // summaries always sit side by side and are never split across pages.
  let head: RowInput[]
  let body: RowInput[]
  let width: number
  let left: number
  let columnStyles: Record<number, object>
  if (roles.length > 1) {
    const a = summaryRows(input, roles[0])
    const b = summaryRows(input, roles[1])
    const n = Math.max(a.length, b.length)
    const pad = (rows: RowInput[], i: number) => (rows[i] as CellInput[] | undefined) ?? [blank, blank]
    body = Array.from({ length: n }, (_, i) => [...pad(a, i), blank, ...pad(b, i)])
    head = [[{ content: title(roles[0]), colSpan: 2 }, blank, { content: title(roles[1]), colSpan: 2 }]]
    width = PAGE_W - 2 * M
    left = M
    const col = (width - 12) / 2
    columnStyles = {
      0: { cellWidth: col * 0.45, fontStyle: "bold" },
      1: { cellWidth: col * 0.55, halign: "center" },
      2: { cellWidth: 12 },
      3: { cellWidth: col * 0.45, fontStyle: "bold" },
      4: { cellWidth: col * 0.55, halign: "center" },
    }
  } else {
    body = summaryRows(input, roles[0])
    head = [[{ content: title(roles[0]), colSpan: 2 }]]
    width = 130
    left = (PAGE_W - width) / 2
    columnStyles = { 0: { cellWidth: width * 0.45, fontStyle: "bold" }, 1: { halign: "center" } }
  }

  autoTable(doc, {
    startY: startY + 5,
    margin: { left, right: PAGE_W - left - width, top: 22, bottom: 16 },
    tableWidth: width,
    pageBreak: "avoid",
    rowPageBreak: "avoid",
    theme: "grid",
    head,
    body,
    styles: { fontSize: 7.5, cellPadding: 1, lineColor: LINE, lineWidth: 0.15, textColor: INK },
    headStyles: { fillColor: MAROON, textColor: 255, halign: "center", fontStyle: "bold" },
    columnStyles,
  })
  return lastY(doc)
}

/* ------------------------------ bay layout page ---------------------------- */

function drawLayouts(doc: jsPDF, input: ReportInput) {
  const roles = [input.primary, input.failover].filter(Boolean) as ReportRole[]
  doc.addPage()
  let y = 22
  y = bar(doc, y, "STORAGE ARRAY LAYOUT (DRIVE BAY ALLOCATION)", { h: 6.5, size: 10 })
  y += 3

  // legend
  doc.setFontSize(7)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(...GREY)
  const legend: [string, () => void][] = [
    ["Data (number = RAID group)", () => { doc.setFillColor(...hslToRgb(45, 75, 86)); doc.setDrawColor(...hslToRgb(45, 75, 45)) }],
    ["Parity capacity", () => { doc.setFillColor(...hslToRgb(45, 75, 62)); doc.setDrawColor(...hslToRgb(45, 75, 45)) }],
    ["Hot spare", () => { doc.setFillColor(222, 240, 252); doc.setDrawColor(56, 160, 220) }],
    ["Empty bay", () => { doc.setFillColor(246, 246, 248); doc.setDrawColor(200, 200, 205) }],
  ]
  let lx = M
  legend.forEach(([label, style]) => {
    style()
    doc.setLineWidth(0.25)
    doc.rect(lx, y, 3.5, 3.5, "FD")
    doc.text(label, lx + 5, y + 2.7)
    lx += doc.getTextWidth(label) + 13
  })
  y += 7

  const cams = new Map(input.cameraSets.map((c) => [c.id, c]))

  for (const role of roles) {
    y = ensureSpace(doc, y, 50)
    y = bar(doc, y, `${role.role === "primary" ? "PRIMARY" : "FAILOVER"} RECORDING - ${role.days} DAYS`, {
      h: 5,
      size: 8.5,
      fill: MAROON_SOFT,
      color: MAROON,
    })
    y += 3

    for (const s of role.sets) {
      const plan = s.result.plan
      // estimate height to avoid splitting a set
      const est =
        10 +
        s.encs.reduce((a, e) => {
          const cols = e.bays <= 30 ? Math.max(1, e.bays) : Math.ceil(e.bays / Math.ceil(e.bays / 30))
          return a + 5 + Math.ceil(e.bays / cols) * 6.2 + 2
        }, 0) +
        plan.groups.length * 4 +
        4
      y = ensureSpace(doc, y, Math.min(est, PAGE_H - 40))

      doc.setFont("helvetica", "bold")
      doc.setFontSize(9)
      doc.setTextColor(...INK)
      const head = `${safe(s.name)}${s.model ? `  (${safe(s.model)})` : ""}`
      doc.text(head, M, y + 3)
      const headW = doc.getTextWidth(head) // measured in the bold 9pt font it was drawn with
      doc.setFont("helvetica", "normal")
      doc.setFontSize(7)
      doc.setTextColor(...GREY)
      const meta = `RAID ${input.level} - ${plan.groups.length} group(s) - ${plan.dataDrives} data + ${plan.parityDrives} parity + ${plan.spareDrives} spare drives - ${s.result.cameras} cameras - ${n2(plan.usableTiB)} TiB usable`
      if (M + headW + 5 + doc.getTextWidth(meta) <= PAGE_W - M) {
        doc.text(meta, M + headW + 5, y + 3)
        y += 6
      } else {
        doc.text(meta, M, y + 7)
        y += 10
      }

      s.encs.forEach((e, ei) => {
        const bays = s.result.plan.bays[ei] ?? []
        const cols = e.bays <= 30 ? Math.max(1, e.bays) : Math.ceil(e.bays / Math.ceil(e.bays / 30))
        const tile = 5.6
        const gap = 0.6
        const labelW = 52
        y = ensureSpace(doc, y, Math.ceil(e.bays / cols) * (tile + gap) + 4)
        doc.setFont("helvetica", "bold")
        doc.setFontSize(7)
        doc.setTextColor(...INK)
        doc.text(safe(e.kind === "controller" ? "Controller" : e.name || "JBOD"), M, y + 3, { maxWidth: labelW - 3 })
        doc.setFont("helvetica", "normal")
        doc.setFontSize(6.5)
        doc.setTextColor(...GREY)
        const info = [
          ...(e.model ? (doc.splitTextToSize(safe(e.model), labelW - 3) as string[]).slice(0, 2) : []),
          `${e.bays} bays x ${e.drive} TB`,
          `${bays.filter((b) => b.kind !== "empty").length} / ${e.bays} populated`,
        ]
        info.forEach((line, k) => doc.text(line, M, y + 6 + k * 2.8))
        const labelH = 4 + info.length * 2.8

        bays.forEach((b, i) => {
          const cx = M + labelW + (i % cols) * (tile + gap)
          const cy = y + Math.floor(i / cols) * (tile + gap)
          doc.setLineWidth(0.25)
          let label = ""
          if (b.kind === "empty") {
            doc.setFillColor(246, 246, 248)
            doc.setDrawColor(200, 200, 205)
          } else if (b.kind === "spare") {
            doc.setFillColor(222, 240, 252)
            doc.setDrawColor(56, 160, 220)
            label = "S"
          } else {
            const h = hueOf(b.group ?? 0)
            doc.setDrawColor(...hslToRgb(h, 70, 40))
            doc.setFillColor(...hslToRgb(h, 75, b.kind === "parity" ? 62 : 86))
            label = b.kind === "parity" ? `P${(b.group ?? 0) + 1}` : String((b.group ?? 0) + 1)
          }
          doc.rect(cx, cy, tile, tile, "FD")
          if (label) {
            doc.setFontSize(5)
            doc.setTextColor(...INK)
            doc.text(label, cx + tile / 2, cy + tile / 2 + 0.9, { align: "center" })
          }
        })
        y += Math.max(labelH, Math.ceil(e.bays / cols) * (tile + gap)) + 2.5
      })

      // group legend lines
      doc.setFontSize(6.8)
      plan.groups.forEach((g, gi) => {
        y = ensureSpace(doc, y, 5)
        const h = hueOf(g.id)
        doc.setFillColor(...hslToRgb(h, 75, 62))
        doc.setDrawColor(...hslToRgb(h, 70, 40))
        doc.rect(M + 2, y, 3, 3, "FD")
        const loads = s.result.groupLoads[gi]?.assignments ?? []
        const camText = loads.length
          ? loads.map((a) => `${a.count} x ${safe(cams.get(a.camSetId)?.name ?? "cameras")}`).join(", ")
          : "no cameras"
        doc.setTextColor(...INK)
        doc.text(
          `Array ${arrayLabel(gi)} / RG${g.id + 1}: ${g.size} x ${g.drive} TB (${g.size - g.parity}D + ${g.parity}P) - ${n2(g.usableTiB)} TiB usable - ${camText}`,
          M + 7,
          y + 2.5,
          { maxWidth: PAGE_W - 2 * M - 8 },
        )
        y += 4
      })
      y += 4
    }
  }
}

/* -------------------------------- main entry ------------------------------- */

export function generateDsaPdf(input: ReportInput): jsPDF {
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4", compress: true })
  doc.setProperties({
    title: safe(`${input.projectName || "CCTV"} - CCTV Storage Calculation (DSA)`),
    subject: "CCTV system storage calculation for Qatar Design Stage Assessment",
    author: safe(input.partnerName || ""),
    keywords: "Qatar, DSA, CCTV storage calculation, RAID",
    creator: "Surveillance Storage Calculator",
  })

  // ---- header (first page)
  const hasLogos = !!(input.partnerLogo || input.clientLogo)
  drawLogo(doc, input.clientLogo, M, 7, 60, 16, "left")
  drawLogo(doc, input.partnerLogo, PAGE_W - M - 60, 7, 60, 16, "right")
  let y = hasLogos ? 26 : 10

  const info: RowInput[] = [
    ["Project Name", safe(input.projectName || "-")],
    ["Partner / Contractor", safe(input.partnerName || "-")],
  ]
  if (input.consultant) info.push(["Consultant / Client", safe(input.consultant)])
  if (input.documentNo) info.push(["Document No.", safe(input.documentNo)])
  info.push(["Revision No.", safe(input.revision || "-")], ["Date:", safe(input.date || "-")])

  autoTable(doc, {
    startY: y,
    margin: { left: M, right: M },
    theme: "grid",
    body: info,
    styles: { fontSize: 8.5, cellPadding: 1.4, halign: "center", lineColor: LINE, lineWidth: 0.15, textColor: INK },
    columnStyles: { 0: { cellWidth: 58, fillColor: MAROON, textColor: 255, fontStyle: "bold" } },
  })
  y = lastY(doc) + 4

  y = bar(doc, y, "CCTV SYSTEM STORAGE CALCULATION", { h: 6.5, size: 10.5 })

  y = drawRoleTable(doc, input, input.primary, y)
  if (input.failover) y = drawRoleTable(doc, input, input.failover, y + 4)

  y = drawSummaries(doc, input, y)

  // ---- basis of calculation + notes
  const basis = [
    `Storage per camera is calibrated to ${REF_TIB} TiB for ${REF_DAYS} days at ${REF_BITRATE} Mbps (24/7 continuous recording, incl. ~5% file-system and metadata overhead) and scaled linearly with bitrate and retention days.`,
    `RAID ${input.level}, max. ${input.groupSize} drives per RAID group. Available storage = (drives per array - parity drives) x drive size, in TiB (1 TiB = 2^40 bytes). Proposed storage = installed drive capacity in marketing TB (10^12 bytes), excluding hot spares.`,
    "Cameras are allocated to whole disk pools / arrays; each storage set (controller with its JBOD expansion units) is an independent storage system.",
  ]
  if (input.preparedBy) basis.push(`Prepared by: ${input.preparedBy}`)
  const notes = safe(input.notes).trim()
  const block = [...basis.map((b) => `- ${safe(b)}`), ...(notes ? ["", `Note: ${notes}`] : [])]
  doc.setFontSize(7)
  const wrapped = doc.splitTextToSize(block.join("\n"), PAGE_W - 2 * M - 70) as string[]
  y = ensureSpace(doc, y + 5, wrapped.length * 3.2 + 4)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(...MAROON)
  doc.text("Basis of calculation", M, y)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(...INK)
  doc.text(wrapped, M, y + 4)

  // ---- bay layout pages
  drawLayouts(doc, input)

  // ---- running header / footer on every page
  const pages = doc.getNumberOfPages()
  const contact = safe(input.contact).split(/\r?\n/).map((l) => l.trim()).filter(Boolean).slice(0, 5)
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i)
    if (i > 1) {
      drawLogo(doc, input.clientLogo, M, 5, 30, 10, "left")
      drawLogo(doc, input.partnerLogo, PAGE_W - M - 30, 5, 30, 10, "right")
      doc.setFont("helvetica", "bold")
      doc.setFontSize(8)
      doc.setTextColor(...MAROON)
      doc.text(safe(`${input.projectName || "Project"} - CCTV Storage Calculation`), PAGE_W / 2, 10, { align: "center" })
      doc.setFont("helvetica", "normal")
      doc.setFontSize(7)
      doc.setTextColor(...GREY)
      doc.text(safe(`Rev. ${input.revision || "-"}  |  ${input.date || ""}`), PAGE_W / 2, 14, { align: "center" })
      doc.setDrawColor(...MAROON)
      doc.setLineWidth(0.4)
      doc.line(M, 17, PAGE_W - M, 17)
    }
    doc.setFontSize(6.5)
    doc.setTextColor(...GREY)
    doc.setFont("helvetica", "normal")
    doc.text(`Page ${i} of ${pages}`, M, PAGE_H - 6)
    if (input.partnerName) doc.text(safe(input.partnerName), M, PAGE_H - 9.5)
    contact.forEach((line, k) => {
      doc.text(line, PAGE_W - M, PAGE_H - 6 - (contact.length - 1 - k) * 2.9, { align: "right" })
    })
  }

  return doc
}

export function reportFileName(projectName: string, revision: string) {
  const clean = (s: string) => s.replace(/[^\w\-]+/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "")
  return `${clean(projectName || "Project") || "Project"}_CCTV_Storage_Calculation_DSA${revision ? "_" + clean(revision) : ""}.pdf`
}