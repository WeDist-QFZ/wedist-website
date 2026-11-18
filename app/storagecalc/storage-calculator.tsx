"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CyberParticles } from "@/components/cyber-particles"
import { GlitchText } from "@/components/glitch-text"
import { AnimatedGrid } from "@/components/animated-grid"
import { FloatingElements } from "@/components/floating-elements"

import {
  Calculator,
  Camera,
  HardDrive,
  Server,
  Plus,
  Trash2,
  Layers,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Info,
  Database,
  Copy,
  FileDown,
  FileText,
  Loader2,
  Upload,
  X,
  CornerDownRight,
  RotateCcw,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import {
  REF_BITRATE,
  REF_DAYS,
  REF_TIB,
  arrayLabel,
  fmt,
  hueOf,
  minGroupOf,
  perCamPerDayTiB,
  planRole,
  tbToTib,
  tibToTb,
  type Bay,
  type Demand,
  type RaidLevel,
  type Role,
  type RoleResult,
  type SetResult,
  type StorageSetIn,
  type Strategy,
} from "./raid-engine"
import type { ReportInput, ReportRole } from "./dsa-report"
import { FAQS } from "./seo-content"

/* -------------------------------------------------------------------------- */
/*  Constants & helpers                                                       */
/* -------------------------------------------------------------------------- */

const DRIVE_SIZES = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30] // marketing TB
const RESOLUTIONS = ["1MP", "2MP", "3MP", "4MP", "5MP", "6MP", "8MP / 4K", "12MP"]
const CODECS = ["H.264", "H.264+", "H.265", "H.265+", "MJPEG"]
const HDD_TYPES = ["SATA", "SAS", "NL-SAS", "SSD"]
const STORAGE_KEY = "storage-calc:v2"

const inputCls = "bg-[#1a1a24] border-[#2a2a36] text-[#f0f0f5]"
const selectCls =
  "w-full h-10 rounded-md bg-[#1a1a24] border border-[#2a2a36] text-[#f0f0f5] px-3 text-sm focus:outline-none focus:border-[#f5b800]/60 disabled:opacity-50"
const cardCls = "p-6 md:p-8 bg-[#121218]/90 border border-[#2a2a36] rounded-xl"
const subCardCls = "p-4 bg-[#1a1a24] border border-[#2a2a36] rounded-lg"
const ghostBtn =
  "bg-transparent border-[#2a2a36] text-[#f0f0f5] hover:border-[#f5b800]/50 hover:bg-[#f5b800]/10"

const toInt = (s: string, min: number, max: number, def = 0) => {
  const n = parseInt(s)
  return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : def
}
const toNum = (s: string) => {
  const n = parseFloat(s)
  return Number.isFinite(n) ? n : 0
}
const driveLabel = (d: number) => `${d} TB · ${fmt(tbToTib(d))} TiB`
const roleName = (r: Role) => (r === "primary" ? "Primary" : "Failover")
const isoToday = () => new Date().toISOString().slice(0, 10)
const isoToDmy = (iso: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  return m ? `${m[3]}-${m[2]}-${m[1]}` : iso
}

/* -------------------------------------------------------------------------- */
/*  State shapes                                                              */
/* -------------------------------------------------------------------------- */

interface CamSet {
  id: number
  name: string
  count: string
  bitrate: string
  resolution: string
  codec: string
  fps: string
  motion: string
  failover: string // blank = all cameras of this set also record on failover
}
interface Encl {
  id: number
  kind: "controller" | "jbod"
  name: string
  model: string
  bays: string
  drive: number
}
interface SSet {
  id: number
  role: Role
  name: string
  channels: string
  hddType: string
  drive: number
  mixed: boolean
  span: boolean
  spares: string
  encs: Encl[] // encs[0] is always the controller
}
interface Meta {
  projectName: string
  partnerName: string
  consultant: string
  documentNo: string
  revision: string
  date: string
  preparedBy: string
  contact: string
  notes: string
  partnerLogo?: string
  clientLogo?: string
}
interface Saved {
  camSets: CamSet[]
  primaryDays: string
  failoverOn: boolean
  failoverDays: string
  sets: SSet[]
  strategy: Record<Role, Strategy>
  level: RaidLevel
  customG: boolean
  gInput: string
  meta: Meta
  showStorage: boolean
}

const defaults = (): Saved => ({
  camSets: [
    {
      id: 1,
      name: "Camera set 1",
      count: "200",
      bitrate: "2.5",
      resolution: "2MP",
      codec: "H.265",
      fps: "15",
      motion: "100",
      failover: "",
    },
  ],
  primaryDays: "120",
  failoverOn: false,
  failoverDays: "30",
  sets: [
    {
      id: 2,
      role: "primary",
      name: "Primary-01",
      channels: "",
      hddType: "SATA",
      drive: 22,
      mixed: false,
      span: true,
      spares: "0",
      encs: [
        { id: 3, kind: "controller", name: "Controller", model: "", bays: "16", drive: 22 },
        { id: 4, kind: "jbod", name: "JBOD 1", model: "", bays: "60", drive: 22 },
      ],
    },
    {
      id: 5,
      role: "failover",
      name: "FOS-01",
      channels: "",
      hddType: "SATA",
      drive: 22,
      mixed: false,
      span: true,
      spares: "0",
      encs: [{ id: 6, kind: "controller", name: "Controller", model: "", bays: "36", drive: 22 }],
    },
  ],
  strategy: { primary: "balance", failover: "balance" },
  level: 6,
  customG: false,
  gInput: "15",
  meta: {
    projectName: "",
    partnerName: "",
    consultant: "",
    documentNo: "",
    revision: "REV-00",
    date: isoToday(),
    preparedBy: "",
    contact: "",
    notes: "",
  },
  showStorage: false,
})

const maxId = (s: Saved) =>
  Math.max(
    0,
    ...s.camSets.map((c) => c.id),
    ...s.sets.flatMap((x) => [x.id, ...x.encs.map((e) => e.id)]),
  )

/** "NVR-01" -> "NVR-02", "Storage" -> "Storage 2" */
function nextName(base: string, taken: string[]) {
  const m = /^(.*?)(\d+)$/.exec(base)
  let n = m ? parseInt(m[2]) : 1
  const width = m ? m[2].length : 0
  const stem = m ? m[1] : `${base} `
  let name = base
  do {
    n++
    name = `${stem}${String(n).padStart(width, "0")}`
  } while (taken.includes(name))
  return name
}

/* -------------------------------------------------------------------------- */
/*  Small UI pieces                                                           */
/* -------------------------------------------------------------------------- */

function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  hint?: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-start gap-3 text-left"
    >
      <span
        className={`mt-0.5 relative inline-flex h-6 w-11 shrink-0 rounded-full border transition ${
          checked ? "bg-[#f5b800] border-[#f5b800]" : "bg-[#1a1a24] border-[#2a2a36]"
        }`}
      >
        <span
          className={`absolute top-[3px] h-4 w-4 rounded-full transition-all ${
            checked ? "left-[23px] bg-[#0a0a0f]" : "left-[3px] bg-[#888899]"
          }`}
        />
      </span>
      <span>
        <span className="block text-sm text-[#f0f0f5]">{label}</span>
        {hint && <span className="block text-xs text-[#888899] mt-0.5">{hint}</span>}
      </span>
    </button>
  )
}

function Segmented<T extends string | number>({
  value,
  options,
  onChange,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
}) {
  return (
    <div className="inline-flex p-1 bg-[#1a1a24] border border-[#2a2a36] rounded-lg">
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          onClick={() => onChange(o.value)}
          className={`px-4 py-2 text-sm rounded-md font-medium transition ${
            value === o.value ? "bg-[#f5b800] text-[#0a0a0f]" : "text-[#888899] hover:text-[#f0f0f5]"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function StepHeading({ n, title, icon }: { n: number; title: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-9 h-9 rounded-lg bg-[#f5b800]/10 border border-[#f5b800]/30 flex items-center justify-center text-[#f5b800]">
        {icon}
      </div>
      <div>
        <p className="text-xs tracking-[0.2em] text-[#f5b800]">STEP {n}</p>
        <h2 className="text-xl md:text-2xl font-bold text-[#f0f0f5]">{title}</h2>
      </div>
    </div>
  )
}

function Stat({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className="p-4 bg-[#1a1a24] border border-[#2a2a36] rounded-lg">
      <p className="text-xs text-[#888899]">{label}</p>
      <p className={`text-xl md:text-2xl font-bold mt-1 ${accent ? "text-[#f5b800]" : "text-[#f0f0f5]"}`}>{value}</p>
      {sub && <p className="text-xs text-[#888899] mt-0.5">{sub}</p>}
    </div>
  )
}

function Field({
  label,
  hint,
  report,
  className,
  children,
}: {
  label: string
  hint?: string
  report?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={`space-y-1.5 ${className ?? ""}`}>
      <Label className="text-xs text-[#888899] flex items-center gap-1.5">
        {label}
        {report && (
          <span
            title="Shown on the DSA report only - not used in the calculation"
            className="text-[9px] uppercase tracking-wider px-1.5 py-px rounded border border-[#2a2a36] text-[#666677]"
          >
            report
          </span>
        )}
      </Label>
      {children}
      {hint && <p className="text-[11px] text-[#666677]">{hint}</p>}
    </div>
  )
}

function Select({
  value,
  options,
  onChange,
  disabled,
}: {
  value: string | number
  options: { value: string | number; label: string }[]
  onChange: (v: string) => void
  disabled?: boolean
}) {
  return (
    <select value={value} disabled={disabled} onChange={(e) => onChange(e.target.value)} className={selectCls}>
      {options.map((o) => (
        <option key={String(o.value)} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

function BayTile({ bay, index }: { bay: Bay; index: number }) {
  const base =
    "aspect-square rounded-[4px] border flex items-center justify-center text-[9px] font-bold leading-none select-none"

  if (bay.kind === "empty")
    return <div title={`Bay ${index + 1} · empty`} className={`${base} border-[#2a2a36] bg-[#0f0f15] opacity-60`} />
  if (bay.kind === "spare")
    return (
      <div
        title={`Bay ${index + 1} · hot spare`}
        className={`${base} border-dashed border-sky-400 bg-sky-400/10 text-sky-300`}
      >
        <span className="hidden sm:inline">S</span>
      </div>
    )

  const h = hueOf(bay.group ?? 0)
  const isParity = bay.kind === "parity"
  return (
    <div
      title={`Bay ${index + 1} · Array ${arrayLabel(bay.group ?? 0)} / RG${(bay.group ?? 0) + 1} · ${
        isParity ? "parity" : "data"
      }`}
      className={base}
      style={{
        borderColor: `hsl(${h} 75% 55%)`,
        color: `hsl(${h} 85% 70%)`,
        background: isParity
          ? `repeating-linear-gradient(45deg, hsl(${h} 75% 55% / 0.55) 0 3px, hsl(${h} 75% 55% / 0.12) 3px 6px)`
          : `hsl(${h} 75% 50% / 0.22)`,
      }}
    >
      <span className="hidden sm:inline">{isParity ? "P" : "D"}</span>
    </div>
  )
}

function LogoInput({
  label,
  value,
  onChange,
}: {
  label: string
  value?: string
  onChange: (v?: string) => void
}) {
  const ref = useRef<HTMLInputElement>(null)
  const [err, setErr] = useState("")
  return (
    <Field label={label} hint={err || "PNG or JPG, up to 1 MB."}>
      <div className="flex items-center gap-3">
        <div className="h-12 w-28 rounded-md border border-[#2a2a36] bg-white/95 flex items-center justify-center overflow-hidden">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt={label} className="max-h-10 max-w-[104px] object-contain" />
          ) : (
            <span className="text-[10px] text-[#888899]">No logo</span>
          )}
        </div>
        <input
          ref={ref}
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            e.target.value = ""
            if (!f) return
            if (f.size > 1024 * 1024) return setErr("File is larger than 1 MB.")
            if (!/image\/(png|jpe?g)/.test(f.type)) return setErr("Use a PNG or JPG file.")
            setErr("")
            const r = new FileReader()
            r.onload = () => onChange(String(r.result))
            r.readAsDataURL(f)
          }}
        />
        <Button type="button" variant="outline" size="sm" className={ghostBtn} onClick={() => ref.current?.click()}>
          <Upload className="w-4 h-4 mr-1.5" /> Upload
        </Button>
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-[#888899] hover:text-red-400"
            onClick={() => onChange(undefined)}
            aria-label={`Remove ${label}`}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </Field>
  )
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function StorageCalculator() {
  const initial = useMemo(defaults, [])
  const nextId = useRef(maxId(initial) + 1)
  const newId = () => nextId.current++

  const [camSets, setCamSets] = useState<CamSet[]>(initial.camSets)
  const [primaryDays, setPrimaryDays] = useState(initial.primaryDays)
  const [failoverOn, setFailoverOn] = useState(initial.failoverOn)
  const [failoverDays, setFailoverDays] = useState(initial.failoverDays)
  const [showStorage, setShowStorage] = useState(initial.showStorage)

  const [sets, setSets] = useState<SSet[]>(initial.sets)
  const [strategy, setStrategy] = useState<Record<Role, Strategy>>(initial.strategy)

  const [level, setLevel] = useState<RaidLevel>(initial.level)
  const [customG, setCustomG] = useState(initial.customG)
  const [gInput, setGInput] = useState(initial.gInput)

  const [meta, setMeta] = useState<Meta>(initial.meta)
  const [exporting, setExporting] = useState(false)
  const [exportError, setExportError] = useState("")

  /* ------------------------------ persistence ------------------------------ */
  const loaded = useRef(false)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const s = { ...defaults(), ...(JSON.parse(raw) as Partial<Saved>) } as Saved
        if (Array.isArray(s.camSets) && s.camSets.length && Array.isArray(s.sets) && s.sets.length) {
          nextId.current = maxId(s) + 1
          setCamSets(s.camSets)
          setPrimaryDays(s.primaryDays)
          setFailoverOn(s.failoverOn)
          setFailoverDays(s.failoverDays)
          setSets(s.sets)
          setStrategy(s.strategy)
          setLevel(s.level)
          setCustomG(s.customG)
          setGInput(s.gInput)
          setMeta({ ...defaults().meta, ...s.meta })
          setShowStorage(s.showStorage)
        }
      }
    } catch {
      /* corrupted or unavailable storage - start fresh */
    }
    loaded.current = true
  }, [])

  useEffect(() => {
    if (!loaded.current) return
    const data: Saved = {
      camSets,
      primaryDays,
      failoverOn,
      failoverDays,
      sets,
      strategy,
      level,
      customG,
      gInput,
      meta,
      showStorage,
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
      try {
        // logos can exceed the quota - keep everything else
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...data, meta: { ...meta, partnerLogo: undefined, clientLogo: undefined } }),
        )
      } catch {
        /* storage unavailable */
      }
    }
  }, [camSets, primaryDays, failoverOn, failoverDays, sets, strategy, level, customG, gInput, meta, showStorage])

  const resetAll = () => {
    const d = defaults()
    nextId.current = maxId(d) + 1
    setCamSets(d.camSets)
    setPrimaryDays(d.primaryDays)
    setFailoverOn(d.failoverOn)
    setFailoverDays(d.failoverDays)
    setSets(d.sets)
    setStrategy(d.strategy)
    setLevel(d.level)
    setCustomG(d.customG)
    setGInput(d.gInput)
    setMeta(d.meta)
    setShowStorage(false)
  }

  /* -------------------------------- derived -------------------------------- */
  const pDays = toInt(primaryDays, 0, 3650)
  const fDays = toInt(failoverDays, 0, 3650)

  const cams = useMemo(
    () =>
      camSets.map((c) => {
        const count = toInt(c.count, 0, 100000)
        return {
          ...c,
          countN: count,
          bitrateN: Math.max(0, Math.min(100, toNum(c.bitrate))),
          failoverN: c.failover.trim() === "" ? count : toInt(c.failover, 0, count),
        }
      }),
    [camSets],
  )

  const totalCams = cams.reduce((a, c) => a + c.countN, 0)
  const totalFailoverCams = failoverOn ? cams.reduce((a, c) => a + c.failoverN, 0) : 0
  const primaryReq = cams.reduce((a, c) => a + c.countN * perCamPerDayTiB(c.bitrateN) * pDays, 0)
  const failoverReq = failoverOn
    ? cams.reduce((a, c) => a + c.failoverN * perCamPerDayTiB(c.bitrateN) * fDays, 0)
    : 0
  const primaryDaily = cams.reduce((a, c) => a + c.countN * perCamPerDayTiB(c.bitrateN), 0)
  const failoverDaily = cams.reduce((a, c) => a + c.failoverN * perCamPerDayTiB(c.bitrateN), 0)
  const badBitrate = cams.some((c) => c.countN > 0 && c.bitrateN <= 0)
  const reqValid = primaryReq > 0 && !badBitrate

  const demands = useMemo(() => {
    const mk = (role: Role): Demand[] =>
      cams.map((c) => ({
        camSetId: c.id,
        perCamTiB: perCamPerDayTiB(c.bitrateN) * (role === "primary" ? pDays : fDays),
        count: role === "primary" ? c.countN : c.failoverN,
      }))
    return { primary: mk("primary"), failover: mk("failover") }
  }, [cams, pDays, fDays])

  const setsOf = (role: Role) => sets.filter((s) => s.role === role)

  const setInputs = useMemo(() => {
    const mk = (role: Role): StorageSetIn[] =>
      sets
        .filter((s) => s.role === role)
        .map((s) => ({
          id: s.id,
          span: s.span,
          spares: toInt(s.spares, 0, 50),
          channels: toInt(s.channels, 0, 100000),
          encs: s.encs.map((e) => ({
            name: e.name,
            kind: e.kind,
            bays: toInt(e.bays, 0, 200),
            drive: s.mixed ? e.drive : s.drive,
          })),
        }))
    return { primary: mk("primary"), failover: mk("failover") }
  }, [sets])

  const gFor = (lvl: RaidLevel) => (customG ? Math.max(minGroupOf(lvl), Math.min(64, parseInt(gInput) || 15)) : 15)
  const G = gFor(level)

  const plans = useMemo(() => {
    const run = (lvl: RaidLevel) => ({
      primary: planRole(demands.primary, setInputs.primary, lvl, gFor(lvl), strategy.primary),
      failover: failoverOn
        ? planRole(demands.failover, setInputs.failover, lvl, gFor(lvl), strategy.failover)
        : null,
    })
    return { 5: run(5), 6: run(6) } as Record<RaidLevel, { primary: RoleResult; failover: RoleResult | null }>
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demands, setInputs, strategy, failoverOn, customG, gInput])

  const cur = plans[level]
  const roles: Role[] = failoverOn ? ["primary", "failover"] : ["primary"]
  const allFeasible = cur.primary.feasible && (!cur.failover || cur.failover.feasible)
  const camName = (id: number) => camSets.find((c) => c.id === id)?.name || "Cameras"

  /* -------------------------------- actions -------------------------------- */
  const updateCam = (id: number, patch: Partial<CamSet>) =>
    setCamSets((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)))

  const addCam = () =>
    setCamSets((prev) => [
      ...prev,
      {
        id: newId(),
        name: `Camera set ${prev.length + 1}`,
        count: "10",
        bitrate: "2.5",
        resolution: "2MP",
        codec: "H.265",
        fps: "15",
        motion: "100",
        failover: "",
      },
    ])

  const updateSet = (id: number, patch: Partial<SSet>) =>
    setSets((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)))

  const updateEnc = (setId: number, encId: number, patch: Partial<Encl>) =>
    setSets((prev) =>
      prev.map((s) =>
        s.id === setId ? { ...s, encs: s.encs.map((e) => (e.id === encId ? { ...e, ...patch } : e)) } : s,
      ),
    )

  const addSet = (role: Role) =>
    setSets((prev) => {
      const same = prev.filter((s) => s.role === role)
      const base = same.length ? same[same.length - 1].name : role === "primary" ? "P-00" : "FOS-00"
      const drive = same[same.length - 1]?.drive ?? 22
      return [
        ...prev,
        {
          id: newId(),
          role,
          name: nextName(base, prev.map((s) => s.name)),
          channels: "",
          hddType: "SATA",
          drive,
          mixed: false,
          span: true,
          spares: "0",
          encs: [{ id: newId(), kind: "controller", name: "Controller", model: "", bays: "16", drive }],
        },
      ]
    })

  const duplicateSet = (id: number) =>
    setSets((prev) => {
      const i = prev.findIndex((s) => s.id === id)
      if (i < 0) return prev
      const src = prev[i]
      const copy: SSet = {
        ...src,
        id: newId(),
        name: nextName(src.name, prev.map((s) => s.name)),
        encs: src.encs.map((e) => ({ ...e, id: newId() })),
      }
      return [...prev.slice(0, i + 1), copy, ...prev.slice(i + 1)]
    })

  const removeSet = (id: number) => setSets((prev) => prev.filter((s) => s.id !== id))

  const addJbod = (setId: number) =>
    setSets((prev) =>
      prev.map((s) => {
        if (s.id !== setId) return s
        const n = s.encs.filter((e) => e.kind === "jbod").length + 1
        const last = s.encs[s.encs.length - 1]
        return {
          ...s,
          encs: [
            ...s.encs,
            {
              id: newId(),
              kind: "jbod",
              name: `JBOD ${n}`,
              model: last.kind === "jbod" ? last.model : "",
              bays: last.kind === "jbod" ? last.bays : "60",
              drive: last.drive,
            },
          ],
        }
      }),
    )

  const removeJbod = (setId: number, encId: number) =>
    setSets((prev) =>
      prev.map((s) => (s.id === setId ? { ...s, encs: s.encs.filter((e) => e.id !== encId || e.kind === "controller") } : s)),
    )

  /* --------------------------------- export -------------------------------- */
  const exportPdf = async () => {
    setExporting(true)
    setExportError("")
    try {
      const { generateDsaPdf, reportFileName } = await import("./dsa-report")
      const mkRole = (role: Role, result: RoleResult, days: number): ReportRole => {
        const byId = new Map(result.sets.map((r) => [r.id, r]))
        return {
          role,
          days,
          result,
          sets: setsOf(role).map((s) => ({
            id: s.id,
            name: s.name,
            model: s.encs[0]?.model ?? "",
            channels: toInt(s.channels, 0, 100000),
            hddType: s.hddType,
            encs: s.encs.map((e) => ({
              name: e.name,
              kind: e.kind,
              model: e.model,
              bays: toInt(e.bays, 0, 200),
              drive: s.mixed ? e.drive : s.drive,
            })),
            result: byId.get(s.id) as SetResult,
          })),
        }
      }
      const input: ReportInput = {
        projectName: meta.projectName.trim(),
        partnerName: meta.partnerName.trim(),
        consultant: meta.consultant.trim(),
        documentNo: meta.documentNo.trim(),
        revision: meta.revision.trim(),
        date: isoToDmy(meta.date),
        preparedBy: meta.preparedBy.trim(),
        contact: meta.contact,
        notes: meta.notes,
        partnerLogo: meta.partnerLogo,
        clientLogo: meta.clientLogo,
        level,
        groupSize: G,
        cameraSets: cams.map((c) => ({
          id: c.id,
          name: c.name,
          count: c.countN,
          failoverCount: c.failoverN,
          bitrate: c.bitrateN,
          resolution: c.resolution,
          codec: c.codec,
          fps: c.fps,
          motion: c.motion,
        })),
        primary: mkRole("primary", cur.primary, pDays),
        failover: cur.failover ? mkRole("failover", cur.failover, fDays) : undefined,
      }
      generateDsaPdf(input).save(reportFileName(input.projectName, input.revision))
    } catch (e) {
      console.error(e)
      setExportError("The PDF could not be generated. Please check the inputs and try again.")
    } finally {
      setExporting(false)
    }
  }

  /* -------------------------------------------------------------------------- */
  /*  Render helpers                                                            */
  /* -------------------------------------------------------------------------- */

  const renderSetEditor = (s: SSet, canDelete: boolean) => {
    const controller = s.encs[0]
    const jbods = s.encs.slice(1)
    const res = cur[s.role]?.sets.find((r) => r.id === s.id)
    const bays = s.encs.reduce((a, e) => a + toInt(e.bays, 0, 200), 0)
    return (
      <div key={s.id} className={`${subCardCls} space-y-4`}>
        <div className="flex flex-wrap items-center gap-3">
          <Server className="w-4 h-4 text-[#f5b800]" />
          <Input
            value={s.name}
            onChange={(e) => updateSet(s.id, { name: e.target.value })}
            className={`${inputCls} h-9 w-44 font-medium`}
            aria-label="Storage set name"
          />
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#f5b800]/30 text-[#f5b800] bg-[#f5b800]/10">
            {roleName(s.role)}
          </span>
          <span className="text-xs text-[#888899]">
            {1 + jbods.length} enclosure{jbods.length ? "s" : ""} · {bays} bays
            {res ? ` · ${res.cameras} cameras` : ""}
          </span>
          <div className="ml-auto flex gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => duplicateSet(s.id)}
              className="text-[#888899] hover:text-[#f5b800]"
              title="Duplicate this storage set"
            >
              <Copy className="w-4 h-4 mr-1" /> Duplicate
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={!canDelete}
              onClick={() => removeSet(s.id)}
              className="text-[#888899] hover:text-red-400"
              aria-label={`Remove ${s.name}`}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Field label="Licensed channels" hint="Max cameras on this set. Blank = no limit.">
            <Input
              type="number"
              min={0}
              inputMode="numeric"
              placeholder="No limit"
              value={s.channels}
              onChange={(e) => updateSet(s.id, { channels: e.target.value })}
              className={inputCls}
            />
          </Field>
          <Field label="Drive size">
            <Select
              disabled={s.mixed}
              value={s.drive}
              onChange={(v) => updateSet(s.id, { drive: Number(v) })}
              options={DRIVE_SIZES.map((d) => ({ value: d, label: driveLabel(d) }))}
            />
          </Field>
          <Field label="Hot spares" hint="Dedicated, on top of leftovers.">
            <Input
              type="number"
              min={0}
              max={50}
              value={s.spares}
              onChange={(e) => updateSet(s.id, { spares: e.target.value })}
              className={inputCls}
            />
          </Field>
          <Field label="HDD type" report>
            <Select
              value={s.hddType}
              onChange={(v) => updateSet(s.id, { hddType: v })}
              options={HDD_TYPES.map((t) => ({ value: t, label: t }))}
            />
          </Field>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <Toggle
            checked={s.mixed}
            onChange={(v) => updateSet(s.id, { mixed: v, encs: s.encs.map((e) => ({ ...e, drive: s.drive })) })}
            label="Different drive size per enclosure"
          />
          <Toggle
            checked={s.span}
            onChange={(v) => updateSet(s.id, { span: v })}
            label="RAID groups may span controller and JBODs"
            hint="Off: every RAID group stays inside one enclosure."
          />
        </div>

        {/* enclosure chain */}
        <div className="space-y-2">
          {[controller, ...jbods].map((e) => {
            const isCtrl = e.kind === "controller"
            return (
              <div key={e.id} className={`flex items-stretch gap-2 ${isCtrl ? "" : "pl-5"}`}>
                {!isCtrl && <CornerDownRight className="w-4 h-4 mt-3 text-[#f5b800]/60 shrink-0" />}
                <div
                  className={`flex-1 grid grid-cols-2 md:grid-cols-[1fr_1.4fr_0.7fr_1.3fr_auto] gap-3 items-end p-3 rounded-md border ${
                    isCtrl ? "border-[#f5b800]/30 bg-[#f5b800]/[0.04]" : "border-[#2a2a36] bg-[#121218]"
                  }`}
                >
                  <Field label={isCtrl ? "Controller" : "JBOD"}>
                    {isCtrl ? (
                      <div className="h-10 flex items-center text-sm font-medium text-[#f5b800]">
                        <HardDrive className="w-4 h-4 mr-2" /> Head unit
                      </div>
                    ) : (
                      <Input
                        value={e.name}
                        onChange={(ev) => updateEnc(s.id, e.id, { name: ev.target.value })}
                        className={inputCls}
                      />
                    )}
                  </Field>
                  <Field label="Model" report>
                    <Input
                      value={e.model}
                      placeholder={isCtrl ? "e.g. NVR / storage server" : "e.g. 60-bay JBOD"}
                      onChange={(ev) => updateEnc(s.id, e.id, { model: ev.target.value })}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Bays">
                    <Input
                      type="number"
                      min={1}
                      max={200}
                      value={e.bays}
                      onChange={(ev) => updateEnc(s.id, e.id, { bays: ev.target.value })}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Drive size">
                    <Select
                      disabled={!s.mixed}
                      value={s.mixed ? e.drive : s.drive}
                      onChange={(v) => updateEnc(s.id, e.id, { drive: Number(v) })}
                      options={DRIVE_SIZES.map((d) => ({ value: d, label: driveLabel(d) }))}
                    />
                  </Field>
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={isCtrl}
                    onClick={() => removeJbod(s.id, e.id)}
                    className="text-[#888899] hover:text-red-400 col-span-2 md:col-span-1"
                    aria-label={isCtrl ? "The controller cannot be removed" : `Remove ${e.name}`}
                    title={isCtrl ? "A storage set always has one controller" : "Remove JBOD"}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )
          })}
          <div className="pl-5">
            <Button type="button" variant="outline" size="sm" onClick={() => addJbod(s.id)} className={ghostBtn}>
              <Plus className="w-4 h-4 mr-1.5" /> Add JBOD to {s.name || "this set"}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const renderRoleResult = (role: Role) => {
    const r = cur[role]
    if (!r) return null
    const roleSets = setsOf(role)
    const days = role === "primary" ? pDays : fDays
    const daily = role === "primary" ? primaryDaily : failoverDaily
    const retention = daily > 0 ? r.usableTiB / daily : 0
    const populated = r.dataDrives + r.parityDrives + r.spareDrives
    const totalBays = setInputs[role].reduce((a, s) => a + s.encs.reduce((x, e) => x + e.bays, 0), 0)
    const rawTiB = r.rawTB > 0 ? tbToTib(r.rawTB) : 0
    const efficiency = rawTiB > 0 ? (r.usableTiB / rawTiB) * 100 : 0

    return (
      <div key={role} className="space-y-5">
        <div className="flex flex-wrap items-baseline gap-3 pt-2 border-t border-[#2a2a36]">
          <h3 className="text-lg md:text-xl font-bold text-[#f0f0f5] pt-5">
            {roleName(role)} recording · {days} days
          </h3>
          <span className="text-xs text-[#888899]">
            {roleSets.length} storage set{roleSets.length === 1 ? "" : "s"} ·{" "}
            {strategy[role] === "balance" ? "balanced distribution" : "filled in order"}
          </span>
        </div>

        {!roleSets.length ? (
          <div className="flex items-start gap-3 p-4 rounded-lg border border-red-500/30 bg-red-500/10">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-300">
              No {role} storage set defined. Add one in Step 2 to record {r.demandCams} cameras.
            </p>
          </div>
        ) : r.feasible ? (
          <div className="flex items-start gap-3 p-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-sm text-emerald-300">
              Requirement met: all {r.cameras} cameras recorded for {days} days. {fmt(r.usableTiB)} TiB usable against{" "}
              {fmt(r.requiredTiB)} TiB required, using {populated} of {totalBays} bays.
            </p>
          </div>
        ) : (
          <div className="flex items-start gap-3 p-4 rounded-lg border border-red-500/30 bg-red-500/10">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-red-300">
              {r.unassignedCams} of {r.demandCams} cameras don&apos;t fit - short by {fmt(r.shortfallTiB)} TiB. Roughly{" "}
              {r.extraDrivesNeeded} more drives (plus bays to hold them), more licensed channels, or another storage set
              are needed.
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat
            label="Usable capacity"
            value={`${fmt(r.usableTiB)} TiB`}
            sub={`${fmt(tibToTb(r.usableTiB))} TB`}
            accent
          />
          <Stat
            label="Drives populated"
            value={`${populated} / ${totalBays}`}
            sub={`${r.dataDrives} data · ${r.parityDrives} parity · ${r.spareDrives} spare`}
          />
          <Stat label="RAID groups" value={`${r.groups}`} sub={`${fmt(efficiency, 1)}% usable efficiency`} />
          <Stat
            label="Retention at this size"
            value={`${fmt(retention, 0)} days`}
            sub={`${r.demandCams} cameras · ${r.rawTB} TB proposed`}
          />
        </div>

        {roleSets.map((s) => {
          const res = r.sets.find((x) => x.id === s.id)
          if (!res) return null
          const inp = setInputs[role].find((x) => x.id === s.id)!
          const channels = toInt(s.channels, 0, 100000)
          return (
            <div key={s.id} className={`${subCardCls} space-y-4`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-[#f5b800]" />
                  <span className="font-semibold text-[#f0f0f5]">{s.name}</span>
                  {s.encs[0]?.model && <span className="text-xs text-[#888899]">{s.encs[0].model}</span>}
                </div>
                <span className="text-xs text-[#888899]">
                  {res.cameras} cameras{channels ? ` / ${channels} ch` : ""} · {fmt(res.requiredTiB)} TiB required ·{" "}
                  {fmt(res.plan.usableTiB)} of {fmt(res.maxUsableTiB)} TiB max usable
                </span>
              </div>

              {res.cameras === 0 && (
                <p className="text-xs text-amber-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> No cameras assigned - this set is not needed with the current
                  distribution.
                </p>
              )}
              {res.plan.warnings.map((w) => (
                <p key={w} className="text-xs text-amber-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> {w}
                </p>
              ))}

              {inp.encs.map((e, ei) => {
                const bays = res.plan.bays[ei] ?? []
                const used = bays.filter((b) => b.kind !== "empty").length
                const cols = e.bays <= 12 ? 6 : e.bays <= 24 ? 12 : 15
                return (
                  <div key={s.encs[ei]?.id ?? ei} className={ei ? "pl-4 border-l border-[#2a2a36]" : ""}>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-3.5 h-3.5 text-[#f5b800]" />
                        <span className="text-sm text-[#f0f0f5]">
                          {e.kind === "controller" ? "Controller" : e.name}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#f5b800]/30 text-[#f5b800] bg-[#f5b800]/10">
                          {e.kind}
                        </span>
                      </div>
                      <span className="text-xs text-[#888899]">
                        {used} / {e.bays} bays · {driveLabel(e.drive)}
                      </span>
                    </div>
                    <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                      {bays.map((b, i) => (
                        <BayTile key={i} bay={b} index={i} />
                      ))}
                    </div>
                  </div>
                )
              })}

              {res.plan.groups.length > 0 && (
                <div className="grid md:grid-cols-2 gap-2 pt-1">
                  {res.plan.groups.map((g, gi) => {
                    const h = hueOf(g.id)
                    const loads = res.groupLoads[gi]?.assignments ?? []
                    return (
                      <div
                        key={g.id}
                        className="flex items-center gap-3 p-3 bg-[#121218] border rounded-lg"
                        style={{ borderColor: `hsl(${h} 75% 55% / 0.5)` }}
                      >
                        <span className="w-3 h-10 rounded-full shrink-0" style={{ background: `hsl(${h} 75% 55%)` }} />
                        <div className="text-sm min-w-0">
                          <p className="text-[#f0f0f5] font-medium">
                            Array {arrayLabel(gi)} · RAID {level} · {g.size} drives ({g.size - g.parity}D + {g.parity}P)
                          </p>
                          <p className="text-xs text-[#888899]">
                            {fmt(g.usableTiB)} TiB usable · {g.drive} TB drives ·{" "}
                            {g.encs.map((i) => (i === 0 ? "Controller" : inp.encs[i]?.name)).join(" + ")}
                            {g.encs.length > 1 ? " (spans enclosures)" : ""}
                          </p>
                          <p className="text-xs text-[#f5b800]/80 mt-0.5 truncate">
                            {loads.length
                              ? loads.map((a) => `${a.count} × ${camName(a.camSetId)}`).join(" · ")
                              : "No cameras"}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  /* -------------------------------------------------------------------------- */
  /*  JSX                                                                       */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-[#0a0a0f] page-transition">
      <Header />

      <main className="pt-20 md:pt-28 lg:pt-32">
        {/* HERO */}
        <section className="py-14 md:py-24 cyber-grid relative overflow-hidden">
          <AnimatedGrid />
          <CyberParticles count={25} />
          <FloatingElements count={5} />

          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#f5b800]/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#f5b800]/5 rounded-full blur-3xl animate-float-slow" />

          <div className="max-w-5xl mx-auto px-4 relative z-10">
            <ScrollReveal animation="up">
              <div className="text-center">
                <div className="inline-flex items-center gap-3 px-5 py-3 bg-[#f5b800]/10 border border-[#f5b800]/30 rounded-full mb-8">
                  <Calculator className="text-[#f5b800]" />
                  <span className="text-[#f5b800] tracking-[0.2em]">MOI QATAR · DSA STORAGE CALCULATOR</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#f0f0f5] mb-8">
                  CCTV{" "}
                  <GlitchText text="Storage" className="text-[#f5b800] text-glow" autoGlitch glitchInterval={7000} />{" "}
                  Sizing
                </h1>

                <p className="text-lg md:text-xl text-[#888899] max-w-3xl mx-auto">
                  Generate an online CCTV storage calculation report for MOI Qatar DSA submissions. Size primary and
                  failover recording for MOI SSD, plan RAID 5 / RAID 6 across controllers and JBODs, then export a
                  DSA-ready PDF. This is a storage calculator, not an official MOI form.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* CALCULATOR */}
        <section className="py-12 md:py-24 bg-[#050508] relative overflow-hidden">
          <CyberParticles count={15} />
          <div className="absolute inset-0 hex-pattern opacity-30" />
          <div className="absolute inset-0 circuit-pattern opacity-20" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
            {/* ------------------------------ STEP 1 ------------------------------ */}
            <div className={cardCls}>
              <div className="flex items-start justify-between gap-4">
                <StepHeading n={1} title="Cameras & retention" icon={<Camera className="w-5 h-5" />} />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={resetAll}
                  className="text-[#888899] hover:text-[#f5b800]"
                  title="Clear the saved project and start again"
                >
                  <RotateCcw className="w-4 h-4 mr-1.5" /> Reset
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-5 mb-6">
                <Field label="Primary retention (days)" hint="MOI SSD standard: 120 days, 24/7.">
                  <Input
                    type="number"
                    min={1}
                    inputMode="numeric"
                    value={primaryDays}
                    onChange={(e) => setPrimaryDays(e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <div className="space-y-3 md:col-span-2">
                  <Toggle
                    checked={failoverOn}
                    onChange={setFailoverOn}
                    label="Failover recording (FOS)"
                    hint="Separate failover storage that takes over recording when a primary server fails."
                  />
                  {failoverOn && (
                    <div className="max-w-xs">
                      <Field label="Failover retention (days)">
                        <Input
                          type="number"
                          min={1}
                          inputMode="numeric"
                          value={failoverDays}
                          onChange={(e) => setFailoverDays(e.target.value)}
                          className={inputCls}
                        />
                      </Field>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {camSets.map((c) => {
                  const d = cams.find((x) => x.id === c.id)!
                  const per = perCamPerDayTiB(d.bitrateN)
                  return (
                    <div key={c.id} className={subCardCls}>
                      <div
                        className={`grid grid-cols-2 md:grid-cols-4 gap-3 items-end ${
                          failoverOn
                            ? "lg:grid-cols-[1.5fr_0.8fr_0.9fr_1fr_0.9fr_0.6fr_0.7fr_0.9fr_auto]"
                            : "lg:grid-cols-[1.6fr_0.8fr_0.9fr_1fr_0.9fr_0.6fr_0.7fr_auto]"
                        }`}
                      >
                        <Field label="Camera set" className="col-span-2 md:col-span-4 lg:col-span-1">
                          <Input
                            value={c.name}
                            onChange={(e) => updateCam(c.id, { name: e.target.value })}
                            className={inputCls}
                          />
                        </Field>
                        <Field label="Cameras">
                          <Input
                            type="number"
                            min={0}
                            inputMode="numeric"
                            value={c.count}
                            onChange={(e) => updateCam(c.id, { count: e.target.value })}
                            className={inputCls}
                          />
                        </Field>
                        <Field label="Bitrate (Mbps)">
                          <Input
                            type="number"
                            min={0.1}
                            step={0.05}
                            inputMode="decimal"
                            value={c.bitrate}
                            onChange={(e) => updateCam(c.id, { bitrate: e.target.value })}
                            className={`${inputCls} ${d.countN > 0 && d.bitrateN <= 0 ? "border-red-500/60" : ""}`}
                          />
                        </Field>
                        <Field label="Resolution" report>
                          <Select
                            value={c.resolution}
                            onChange={(v) => updateCam(c.id, { resolution: v })}
                            options={RESOLUTIONS.map((r) => ({ value: r, label: r }))}
                          />
                        </Field>
                        <Field label="Codec" report>
                          <Select
                            value={c.codec}
                            onChange={(v) => updateCam(c.id, { codec: v })}
                            options={CODECS.map((r) => ({ value: r, label: r }))}
                          />
                        </Field>
                        <Field label="FPS" report>
                          <Input
                            type="number"
                            min={1}
                            value={c.fps}
                            onChange={(e) => updateCam(c.id, { fps: e.target.value })}
                            className={inputCls}
                          />
                        </Field>
                        <Field label="Motion %" report>
                          <Input
                            type="number"
                            min={0}
                            max={100}
                            value={c.motion}
                            onChange={(e) => updateCam(c.id, { motion: e.target.value })}
                            className={inputCls}
                          />
                        </Field>
                        {failoverOn && (
                          <Field label="On failover">
                            <Input
                              type="number"
                              min={0}
                              inputMode="numeric"
                              placeholder={`All (${d.countN})`}
                              value={c.failover}
                              onChange={(e) => updateCam(c.id, { failover: e.target.value })}
                              className={inputCls}
                            />
                          </Field>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          disabled={camSets.length === 1}
                          onClick={() => setCamSets((prev) => prev.filter((x) => x.id !== c.id))}
                          className="text-[#888899] hover:text-red-400"
                          aria-label={`Remove ${c.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-[11px] text-[#666677] mt-2">
                        {fmt(per * 1024, 1)} GiB / camera / day · {fmt(per * pDays)} TiB / camera for {pDays} days ·{" "}
                        <span className="text-[#888899]">{fmt(d.countN * per * pDays)} TiB primary</span>
                        {failoverOn && (
                          <>
                            {" "}
                            · <span className="text-[#888899]">{fmt(d.failoverN * per * fDays)} TiB failover</span>
                          </>
                        )}
                      </p>
                    </div>
                  )
                })}
              </div>

              <div className="mt-3">
                <Button type="button" variant="outline" onClick={addCam} className={ghostBtn}>
                  <Plus className="w-4 h-4 mr-2" /> Add camera set
                </Button>
              </div>

              <div className={`grid gap-4 mt-6 ${failoverOn ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                <Stat
                  label="Cameras"
                  value={`${totalCams}`}
                  sub={`${camSets.length} camera set${camSets.length === 1 ? "" : "s"}${
                    failoverOn ? ` · ${totalFailoverCams} on failover` : ""
                  }`}
                />
                <Stat
                  label={`Primary required usable · ${pDays} days`}
                  value={`${fmt(primaryReq)} TiB`}
                  sub={`${fmt(tibToTb(primaryReq))} TB`}
                  accent
                />
                {failoverOn && (
                  <Stat
                    label={`Failover required usable · ${fDays} days`}
                    value={`${fmt(failoverReq)} TiB`}
                    sub={`${fmt(tibToTb(failoverReq))} TB`}
                    accent
                  />
                )}
              </div>

              <p className="flex items-start gap-2 text-xs text-[#888899] mt-4">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#f5b800]" />
                Calibrated to the rule of {REF_TIB} TiB per camera for {REF_DAYS} days at {REF_BITRATE} Mbps (about 5%
                above raw bitrate maths, covering metadata and overhead), scaled linearly for each set&apos;s bitrate and
                days. Fields tagged “report” are printed on the DSA report only.
              </p>

              {!showStorage && (
                <div className="mt-6">
                  <Button
                    type="button"
                    disabled={!reqValid}
                    onClick={() => setShowStorage(true)}
                    className="py-6 px-8 bg-[#f5b800] text-[#0a0a0f] hover:bg-[#c49400] font-bold glow-yellow-sm"
                  >
                    Continue to storage configuration
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            {showStorage && reqValid && (
              <>
                {/* ------------------------------ STEP 2 ------------------------------ */}
                <div className={cardCls}>
                  <StepHeading n={2} title="Storage sets" icon={<Server className="w-5 h-5" />} />
                  <p className="text-sm text-[#888899] -mt-3 mb-6 max-w-3xl">
                    A storage set is one controller (NVR, storage server or SAN head) with the JBODs chained to it.
                    Each set is an independent array - add as many as the design needs for primary and failover
                    recording.
                  </p>

                  <div className="space-y-10">
                    {roles.map((role) => {
                      const list = setsOf(role)
                      return (
                        <div key={role} className="space-y-4">
                          <div className="flex flex-wrap items-end justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-bold text-[#f0f0f5]">{roleName(role)} recording storage</h3>
                              <p className="text-xs text-[#888899]">
                                {list.length} set{list.length === 1 ? "" : "s"} ·{" "}
                                {fmt(role === "primary" ? primaryReq : failoverReq)} TiB to place
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs text-[#888899]">Distribute cameras</p>
                              <Segmented
                                value={strategy[role]}
                                onChange={(v) => setStrategy((p) => ({ ...p, [role]: v }))}
                                options={[
                                  { value: "balance" as Strategy, label: "Balance across sets" },
                                  { value: "fill" as Strategy, label: "Fill in order" },
                                ]}
                              />
                            </div>
                          </div>

                          {list.map((s) => renderSetEditor(s, role === "failover" || list.length > 1))}

                          <Button type="button" variant="outline" onClick={() => addSet(role)} className={ghostBtn}>
                            <Plus className="w-4 h-4 mr-2" /> Add {role} storage set
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* ------------------------------ STEP 3 ------------------------------ */}
                <div className={cardCls}>
                  <StepHeading n={3} title="RAID configuration" icon={<Layers className="w-5 h-5" />} />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[#f0f0f5]">RAID level</Label>
                      <div>
                        <Segmented
                          value={level}
                          onChange={setLevel}
                          options={[
                            { value: 5 as RaidLevel, label: "RAID 5" },
                            { value: 6 as RaidLevel, label: "RAID 6" },
                          ]}
                        />
                      </div>
                      <p className="text-xs text-[#888899]">
                        {level === 5 ? "1 parity drive per group" : "2 parity drives per group"} · applies to every
                        storage set
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Toggle
                        checked={customG}
                        onChange={setCustomG}
                        label="Custom drives per RAID group"
                        hint="Default is 15 (optimal)."
                      />
                      {customG && (
                        <Input
                          type="number"
                          min={minGroupOf(level)}
                          max={64}
                          value={gInput}
                          onChange={(e) => setGInput(e.target.value)}
                          className={`${inputCls} max-w-xs`}
                        />
                      )}
                      <p className="text-xs text-[#888899]">
                        Maximum group size used: <span className="text-[#f5b800]">{G}</span> drives
                        {customG && G !== (parseInt(gInput) || 15) ? ` (min ${minGroupOf(level)} for RAID ${level})` : ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ------------------------------ RESULT ------------------------------ */}
                <div className={cardCls}>
                  <StepHeading n={4} title="Optimised layout" icon={<Database className="w-5 h-5" />} />

                  {level === 5 && G >= 8 && setInputs.primary.concat(setInputs.failover).some((s) => s.encs.some((e) => e.drive >= 16)) && (
                    <p className="text-sm text-amber-300 mb-6 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      RAID 5 with {G}-drive groups of 16 TB+ disks means long rebuilds with no second-failure
                      protection. RAID 6 is the safer choice here.
                    </p>
                  )}

                  {/* RAID 5 vs 6 comparison */}
                  <div className="overflow-x-auto mb-8">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs text-[#888899] border-b border-[#2a2a36]">
                          <th className="py-2 pr-4 font-normal">Option (all storage sets)</th>
                          <th className="py-2 pr-4 font-normal">Drives needed</th>
                          <th className="py-2 pr-4 font-normal">Groups</th>
                          <th className="py-2 pr-4 font-normal">Usable (TiB)</th>
                          <th className="py-2 pr-4 font-normal">Efficiency</th>
                          <th className="py-2 font-normal">Fault tolerance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {([5, 6] as RaidLevel[]).map((lvl) => {
                          const rs = [plans[lvl].primary, plans[lvl].failover].filter(Boolean) as RoleResult[]
                          const drives = rs.reduce((a, r) => a + r.dataDrives + r.parityDrives + r.spareDrives, 0)
                          const usable = rs.reduce((a, r) => a + r.usableTiB, 0)
                          const raw = rs.reduce((a, r) => a + tbToTib(r.rawTB), 0)
                          const ok = rs.every((r) => r.feasible)
                          return (
                            <tr
                              key={lvl}
                              className={`border-b border-[#2a2a36]/60 ${lvl === level ? "text-[#f5b800]" : "text-[#f0f0f5]"}`}
                            >
                              <td className="py-2 pr-4 font-medium">
                                RAID {lvl}
                                {lvl === level ? " (selected)" : ""}
                                {!ok ? " - insufficient" : ""}
                              </td>
                              <td className="py-2 pr-4">{drives}</td>
                              <td className="py-2 pr-4">{rs.reduce((a, r) => a + r.groups, 0)}</td>
                              <td className="py-2 pr-4">{fmt(usable)}</td>
                              <td className="py-2 pr-4">{raw > 0 ? fmt((usable / raw) * 100, 1) : "0.0"}%</td>
                              <td className="py-2">{lvl === 5 ? "1 drive / group" : "2 drives / group"}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* legend */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-4 text-xs text-[#888899]">
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-[4px] border border-[#f5b800] bg-[#f5b800]/20" /> Data
                    </span>
                    <span className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 rounded-[4px] border border-[#f5b800]"
                        style={{
                          background:
                            "repeating-linear-gradient(45deg, hsl(45 75% 55% / 0.55) 0 3px, hsl(45 75% 55% / 0.12) 3px 6px)",
                        }}
                      />{" "}
                      Parity
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-[4px] border border-dashed border-sky-400 bg-sky-400/10" /> Hot
                      spare
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-[4px] border border-[#2a2a36] bg-[#0f0f15]" /> Empty bay
                    </span>
                    <span>Each colour = one RAID group (array A, B, C … per storage set)</span>
                  </div>

                  <div className="space-y-8">{roles.map((role) => renderRoleResult(role))}</div>

                  <p className="flex items-start gap-2 text-xs text-[#888899] mt-6">
                    <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#f5b800]" />
                    RAID 5/6 distribute parity across every drive in the group; the P tiles show parity capacity, not
                    fixed parity disks. Cameras are placed whole on one array, as in DSA sheets. Each set uses the
                    fewest drives that hold its cameras, filling larger drives and the controller first, with balanced
                    group sizes.
                  </p>
                </div>

                {/* ------------------------------ STEP 5 ------------------------------ */}
                <div className={cardCls}>
                  <StepHeading n={5} title="DSA report (MOI Qatar)" icon={<FileText className="w-5 h-5" />} />
                  <p className="text-sm text-[#888899] -mt-3 mb-6 max-w-3xl">
                    These details appear on the exported CCTV storage calculation only. The PDF follows the DSA sheet
                    layout - project block, primary and failover tables per storage server and disk pool, summaries -
                    plus a drive-bay layout for every storage set.
                  </p>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Field label="Project name" className="sm:col-span-2 lg:col-span-1">
                      <Input
                        value={meta.projectName}
                        placeholder="e.g. Hotel & Residences (3B+G+M+14+R)"
                        onChange={(e) => setMeta((m) => ({ ...m, projectName: e.target.value }))}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Partner / contractor name">
                      <Input
                        value={meta.partnerName}
                        placeholder="Security systems contractor"
                        onChange={(e) => setMeta((m) => ({ ...m, partnerName: e.target.value }))}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Consultant / client" hint="Optional">
                      <Input
                        value={meta.consultant}
                        onChange={(e) => setMeta((m) => ({ ...m, consultant: e.target.value }))}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Revision no.">
                      <Input
                        value={meta.revision}
                        onChange={(e) => setMeta((m) => ({ ...m, revision: e.target.value }))}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Date">
                      <Input
                        type="date"
                        value={meta.date}
                        onChange={(e) => setMeta((m) => ({ ...m, date: e.target.value }))}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Document no." hint="Optional">
                      <Input
                        value={meta.documentNo}
                        onChange={(e) => setMeta((m) => ({ ...m, documentNo: e.target.value }))}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Prepared by" hint="Optional">
                      <Input
                        value={meta.preparedBy}
                        onChange={(e) => setMeta((m) => ({ ...m, preparedBy: e.target.value }))}
                        className={inputCls}
                      />
                    </Field>
                    <LogoInput
                      label="Client / project logo (top left)"
                      value={meta.clientLogo}
                      onChange={(v) => setMeta((m) => ({ ...m, clientLogo: v }))}
                    />
                    <LogoInput
                      label="Partner logo (top right)"
                      value={meta.partnerLogo}
                      onChange={(v) => setMeta((m) => ({ ...m, partnerLogo: v }))}
                    />
                    <Field label="Partner contact (footer)" hint="Up to 5 lines" className="sm:col-span-2 lg:col-span-1">
                      <textarea
                        rows={4}
                        value={meta.contact}
                        placeholder={"Tel: +974 ...\nP.O. Box ..., Doha, Qatar\ninfo@company.qa"}
                        onChange={(e) => setMeta((m) => ({ ...m, contact: e.target.value }))}
                        className={`${selectCls} h-auto py-2`}
                      />
                    </Field>
                    <Field label="Notes" hint="Printed under the basis of calculation" className="sm:col-span-2">
                      <textarea
                        rows={4}
                        value={meta.notes}
                        onChange={(e) => setMeta((m) => ({ ...m, notes: e.target.value }))}
                        className={`${selectCls} h-auto py-2`}
                      />
                    </Field>
                  </div>

                  {!allFeasible && (
                    <p className="text-sm text-amber-300 mt-6 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      The current design does not hold every camera. The report will mark the storage as insufficient -
                      fix the storage sets before submitting.
                    </p>
                  )}
                  {!meta.projectName.trim() && (
                    <p className="text-sm text-[#888899] mt-3 flex items-start gap-2">
                      <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#f5b800]" /> Add a project name before exporting
                      for submission.
                    </p>
                  )}
                  {exportError && <p className="text-sm text-red-400 mt-3">{exportError}</p>}

                  <div className="mt-6">
                    <Button
                      type="button"
                      onClick={exportPdf}
                      disabled={exporting}
                      className="py-6 px-8 bg-[#f5b800] text-[#0a0a0f] hover:bg-[#c49400] font-bold glow-yellow-sm"
                    >
                      {exporting ? (
                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      ) : (
                        <FileDown className="mr-2 w-4 h-4" />
                      )}
                      Download DSA storage calculation (PDF)
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* SEO / GUIDE */}
        <section className="py-16 md:py-24 bg-[#0a0a0f] relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div className="space-y-5">
              <h2 className="text-2xl md:text-4xl font-bold text-[#f0f0f5]">
                CCTV storage calculation for <span className="text-[#f5b800]">MOI Qatar DSA</span> submissions
              </h2>
              <p className="text-[#888899] leading-relaxed">
                Every CCTV design for a regulated premises in Qatar goes through the Ministry of Interior Security
                Systems Department (MOI SSD). At Design Stage Assessment (DSA) the contractor submits drawings, the
                camera schedule, equipment data and a CCTV storage calculation that proves the recording servers hold
                every camera for the required retention - 120 days of 24/7 recording for most premises under Law No. 9
                of 2011.
              </p>
              <p className="text-[#888899] leading-relaxed">
                This calculator is built for ELV projects in Qatar - hotels, towers, malls, residential compounds,
                schools, hospitals, warehouses and government buildings. It turns the camera schedule into usable
                capacity, plans RAID 5 or RAID 6 arrays across NVRs, storage servers and JBOD expansion units from any
                vendor, and exports the storage calculation sheet as an A4 PDF ready to attach to the DSA document.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  t: "Multiple camera sets",
                  d: "Mix 2MP indoor, 4MP perimeter and 8MP overview cameras with their own bitrates in one project.",
                },
                {
                  t: "Primary and failover (FOS)",
                  d: "Size 120-day primary recording and a separate failover retention, each on its own storage sets.",
                },
                {
                  t: "Controllers with JBODs",
                  d: "Model each NVR or storage server with the JBODs chained to it, with licensed channel limits.",
                },
                {
                  t: "DSA-ready PDF",
                  d: "Project block, per-server disk pool / array table, summaries and drive-bay layout - one click.",
                },
              ].map((f) => (
                <div key={f.t} className={subCardCls}>
                  <p className="font-semibold text-[#f0f0f5]">{f.t}</p>
                  <p className="text-sm text-[#888899] mt-1">{f.d}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#f0f0f5]">How the MOI SSD storage calculation works</h2>
              <ol className="list-decimal pl-5 space-y-2 text-[#888899]">
                <li>Enter each camera set with its count and bitrate, plus primary and failover retention days.</li>
                <li>
                  Storage per camera = {REF_TIB} TiB × (bitrate ÷ {REF_BITRATE} Mbps) × (days ÷ {REF_DAYS}), including
                  file-system and metadata overhead.
                </li>
                <li>
                  Cameras are distributed across storage sets - balanced or filled in order - respecting licensed
                  channels and whole-camera placement per disk pool / array.
                </li>
                <li>
                  Each storage set gets the fewest drives that hold its cameras, in balanced RAID groups, with optional
                  hot spares.
                </li>
                <li>Export the DSA storage calculation PDF and attach it to the MOI SSD submission.</li>
              </ol>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-bold text-[#f0f0f5]">Frequently asked questions</h2>
              <div className="space-y-3">
                {FAQS.map((f) => (
                  <details key={f.q} className={`${subCardCls} group`}>
                    <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-[#f0f0f5] font-medium">
                      <h3 className="text-base">{f.q}</h3>
                      <Plus className="w-4 h-4 shrink-0 text-[#f5b800] transition group-open:rotate-45" />
                    </summary>
                    <p className="text-sm text-[#888899] mt-3 leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
