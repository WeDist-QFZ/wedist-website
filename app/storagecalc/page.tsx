"use client"

import { useMemo, useRef, useState } from "react"
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
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

/* -------------------------------------------------------------------------- */
/*  Constants & helpers                                                       */
/* -------------------------------------------------------------------------- */

const BITRATES = [1.5, 2.5] as const
const DRIVE_SIZES = [16, 18, 20, 22, 24] // marketing TB

// House rule: 3.1 TiB per camera for 120 days @ 2.5 Mbps (includes overhead).
// Everything else scales linearly from that calibration point.
const REF_TIB = 3.1
const REF_DAYS = 120
const REF_BITRATE = 2.5
const perCamPerDayTiB = (mbps: number) =>
  (REF_TIB / REF_DAYS) * (mbps / REF_BITRATE)

// Marketing TB (10^12) -> TiB (2^40).  22 TB = 20.02 TiB
const tbToTib = (tb: number) => (tb * 1e12) / Math.pow(2, 40)
const tibToTb = (tib: number) => (tib * Math.pow(2, 40)) / 1e12

const fmt = (n: number, dp = 2) =>
  n.toLocaleString("en-US", {
    minimumFractionDigits: dp,
    maximumFractionDigits: dp,
  })

const GROUP_HUES = [45, 190, 285, 140, 10, 220, 320, 90, 165, 25, 250, 350]
const hueOf = (groupId: number) => GROUP_HUES[groupId % GROUP_HUES.length]

const inputCls = "bg-[#1a1a24] border-[#2a2a36] text-[#f0f0f5]"
const selectCls =
  "w-full h-10 rounded-md bg-[#1a1a24] border border-[#2a2a36] text-[#f0f0f5] px-3 text-sm focus:outline-none focus:border-[#f5b800]/60"
const cardCls =
  "p-6 md:p-8 bg-[#121218]/90 border border-[#2a2a36] rounded-xl"

/* -------------------------------------------------------------------------- */
/*  RAID planning engine                                                      */
/* -------------------------------------------------------------------------- */

type RaidLevel = 5 | 6
type BayKind = "empty" | "data" | "parity" | "spare"

interface EncIn {
  id: number
  name: string
  kind: "controller" | "jbod"
  bays: number
  drive: number // TB
}
interface Slot {
  enc: number
  bay: number
}
interface Bay {
  kind: BayKind
  group?: number
}
interface Group {
  id: number
  size: number
  parity: number
  drive: number // TB
  usableTiB: number
  encs: number[] // enclosure indexes the group touches
}
interface Plan {
  level: RaidLevel
  feasible: boolean
  bays: Bay[][]
  groups: Group[]
  dataDrives: number
  parityDrives: number
  spareDrives: number
  rawTiB: number
  usableTiB: number
  maxUsableTiB: number
  shortfallTiB: number
  extraDrivesNeeded: number
  warnings: string[]
}

/**
 * Split n drives into RAID groups of at most G drives.
 *  - groups are balanced (e.g. 20 drives, G=15 -> 10 + 10)
 *  - if the remainder after full groups is too small to form a valid group
 *    (e.g. 16 drives, G=15 -> 15 + 1) the leftover drives become hot spares
 */
function splitGroups(n: number, G: number, m: number) {
  if (n < m) return { sizes: [] as number[], spares: n }
  let spares = 0
  let usable = n
  if (n >= G) {
    const r = n % G
    if (r > 0 && r < m) {
      spares = r
      usable = n - r
    }
  }
  const g = Math.ceil(usable / G)
  const base = Math.floor(usable / g)
  const extra = usable % g
  const sizes = Array.from({ length: g }, (_, i) => base + (i < extra ? 1 : 0))
  return { sizes, spares }
}

function usableOf(n: number, G: number, m: number, p: number, d: number) {
  const { sizes } = splitGroups(n, G, m)
  return sizes.reduce((acc, s) => acc + (s - p) * d, 0)
}

function buildPlan(
  encs: EncIn[],
  span: boolean,
  level: RaidLevel,
  G: number,
  spareReq: number,
  required: number,
): Plan {
  const p = level === 5 ? 1 : 2
  const m = level === 5 ? 3 : 4
  const warnings: string[] = []

  const bays: Bay[][] = encs.map((e) =>
    Array.from({ length: e.bays }, () => ({ kind: "empty" as BayKind })),
  )

  // Build pools: a pool is a set of slots that can be combined into RAID groups.
  let pools: { drive: number; slots: Slot[] }[] = []
  if (span) {
    const map = new Map<number, Slot[]>()
    encs.forEach((e, ei) => {
      const arr = map.get(e.drive) ?? []
      for (let b = 0; b < e.bays; b++) arr.push({ enc: ei, bay: b })
      map.set(e.drive, arr)
    })
    pools = [...map.entries()].map(([drive, slots]) => ({ drive, slots }))
  } else {
    pools = encs.map((e, ei) => ({
      drive: e.drive,
      slots: Array.from({ length: e.bays }, (_, b) => ({ enc: ei, bay: b })),
    }))
  }
  pools = pools.filter((pl) => pl.slots.length > 0)
  // Biggest drives first = fewest drives for a given capacity (stable sort keeps user order)
  pools.sort((a, b) => b.drive - a.drive)

  // Reserve dedicated hot spares from the first (largest-drive) pool
  const spareSlots: Slot[] = []
  if (spareReq > 0 && pools.length) {
    const take = Math.min(spareReq, pools[0].slots.length)
    spareSlots.push(...pools[0].slots.splice(pools[0].slots.length - take, take))
    if (take < spareReq)
      warnings.push(`Only ${take} of ${spareReq} requested hot spares could be reserved.`)
  }

  let remaining = required
  let maxUsable = 0
  let gid = 0
  const groups: Group[] = []

  for (const pool of pools) {
    const d = tbToTib(pool.drive)
    const N = pool.slots.length
    const full = usableOf(N, G, m, p, d)
    maxUsable += full
    if (remaining <= 1e-9 || full <= 0) continue

    // Fewest drives that satisfy the remaining requirement (or fill the pool)
    let n = N
    if (full >= remaining) {
      for (let k = m; k <= N; k++) {
        if (usableOf(k, G, m, p, d) >= remaining - 1e-9) {
          n = k
          break
        }
      }
    }

    const { sizes, spares } = splitGroups(n, G, m)
    let cursor = 0
    for (const s of sizes) {
      const slots = pool.slots.slice(cursor, cursor + s)
      cursor += s
      slots.forEach((sl, j) => {
        bays[sl.enc][sl.bay] = {
          kind: j < s - p ? "data" : "parity",
          group: gid,
        }
      })
      const usableTiB = (s - p) * d
      remaining -= usableTiB
      groups.push({
        id: gid,
        size: s,
        parity: p,
        drive: pool.drive,
        usableTiB,
        encs: [...new Set(slots.map((x) => x.enc))],
      })
      gid++
    }
    for (let i = 0; i < spares; i++) spareSlots.push(pool.slots[cursor++])
  }

  spareSlots.forEach((sl) => {
    bays[sl.enc][sl.bay] = { kind: "spare" }
  })

  const dataDrives = groups.reduce((a, g) => a + (g.size - g.parity), 0)
  const parityDrives = groups.reduce((a, g) => a + g.parity, 0)
  const rawTiB = groups.reduce((a, g) => a + g.size * tbToTib(g.drive), 0)
  const usableTiB = groups.reduce((a, g) => a + g.usableTiB, 0)
  const feasible = remaining <= 1e-6
  const shortfallTiB = feasible ? 0 : remaining

  const dMax = encs.length ? Math.max(...encs.map((e) => tbToTib(e.drive))) : 0
  const perDrive = dMax * ((G - p) / G)
  const extraDrivesNeeded =
    !feasible && perDrive > 0 ? Math.ceil(shortfallTiB / perDrive) : 0

  if (!pools.length) warnings.push("No bays defined - add at least one enclosure.")

  return {
    level,
    feasible,
    bays,
    groups,
    dataDrives,
    parityDrives,
    spareDrives: spareSlots.length,
    rawTiB,
    usableTiB,
    maxUsableTiB: maxUsable,
    shortfallTiB,
    extraDrivesNeeded,
    warnings,
  }
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
            value === o.value
              ? "bg-[#f5b800] text-[#0a0a0f]"
              : "text-[#888899] hover:text-[#f0f0f5]"
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

function Stat({
  label,
  value,
  sub,
  accent,
}: {
  label: string
  value: string
  sub?: string
  accent?: boolean
}) {
  return (
    <div className="p-4 bg-[#1a1a24] border border-[#2a2a36] rounded-lg">
      <p className="text-xs text-[#888899]">{label}</p>
      <p className={`text-xl md:text-2xl font-bold mt-1 ${accent ? "text-[#f5b800]" : "text-[#f0f0f5]"}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-[#888899] mt-0.5">{sub}</p>}
    </div>
  )
}

function BayTile({ bay, index }: { bay: Bay; index: number }) {
  const base =
    "aspect-square rounded-[4px] border flex items-center justify-center text-[9px] font-bold leading-none select-none"

  if (bay.kind === "empty")
    return (
      <div
        title={`Bay ${index + 1} · empty`}
        className={`${base} border-[#2a2a36] bg-[#0f0f15] opacity-60`}
      />
    )
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
      title={`Bay ${index + 1} · RG${(bay.group ?? 0) + 1} · ${isParity ? "parity" : "data"}`}
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

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function StorageCalcPage() {
  // Step 1 - requirement
  const [bitrate, setBitrate] = useState<number>(2.5)
  const [cameras, setCameras] = useState("200")
  const [days, setDays] = useState("120")
  const [showStorage, setShowStorage] = useState(false)

  // Step 2 - hardware
  const nextId = useRef(3)
  const [encs, setEncs] = useState<EncIn[]>([
    { id: 1, name: "Controller 1", kind: "controller", bays: 16, drive: 22 },
    { id: 2, name: "JBOD 1", kind: "jbod", bays: 60, drive: 22 },
  ])
  const [sameDrive, setSameDrive] = useState(true)
  const [globalDrive, setGlobalDrive] = useState(22)
  const [span, setSpan] = useState(true)

  // Step 3 - RAID
  const [level, setLevel] = useState<RaidLevel>(6)
  const [customG, setCustomG] = useState(false)
  const [gInput, setGInput] = useState("15")
  const [spares, setSpares] = useState("0")

  const camsN = Math.max(0, parseInt(cameras) || 0)
  const daysN = Math.max(0, parseInt(days) || 0)
  const perCam = perCamPerDayTiB(bitrate)
  const perCamForDays = perCam * daysN
  const requiredTiB = camsN * daysN * perCam
  const reqValid = requiredTiB > 0

  const effEncs: EncIn[] = useMemo(
    () =>
      encs.map((e) => ({
        ...e,
        bays: Math.max(0, Math.min(200, Math.floor(e.bays) || 0)),
        drive: sameDrive ? globalDrive : e.drive,
      })),
    [encs, sameDrive, globalDrive],
  )

  const minGroup = level === 5 ? 3 : 4
  const G = customG ? Math.max(minGroup, Math.min(64, parseInt(gInput) || 15)) : 15
  const spareN = Math.max(0, Math.min(50, parseInt(spares) || 0))

  const plan5 = useMemo(
    () => buildPlan(effEncs, span, 5, customG ? Math.max(3, Math.min(64, parseInt(gInput) || 15)) : 15, spareN, requiredTiB),
    [effEncs, span, customG, gInput, spareN, requiredTiB],
  )
  const plan6 = useMemo(
    () => buildPlan(effEncs, span, 6, customG ? Math.max(4, Math.min(64, parseInt(gInput) || 15)) : 15, spareN, requiredTiB),
    [effEncs, span, customG, gInput, spareN, requiredTiB],
  )
  const plan = level === 5 ? plan5 : plan6

  const updateEnc = (id: number, patch: Partial<EncIn>) =>
    setEncs((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)))

  const addEnc = (kind: "controller" | "jbod") => {
    const count = encs.filter((e) => e.kind === kind).length + 1
    setEncs((prev) => [
      ...prev,
      {
        id: nextId.current++,
        name: `${kind === "controller" ? "Controller" : "JBOD"} ${count}`,
        kind,
        bays: kind === "controller" ? 16 : 60,
        drive: globalDrive,
      },
    ])
  }

  const retentionDays =
    camsN > 0 && perCam > 0 ? plan.usableTiB / (camsN * perCam) : 0
  const efficiency = plan.rawTiB > 0 ? (plan.usableTiB / plan.rawTiB) * 100 : 0
  const populated = plan.dataDrives + plan.parityDrives + plan.spareDrives
  const totalBays = effEncs.reduce((a, e) => a + e.bays, 0)

  const driveLabel = (d: number) => `${d} TB · ${fmt(tbToTib(d))} TiB`

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
                  <span className="text-[#f5b800] tracking-[0.2em]">STORAGE CALCULATOR</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#f0f0f5] mb-8">
                  Surveillance{" "}
                  <GlitchText
                    text="Storage"
                    className="text-[#f5b800] text-glow"
                    autoGlitch
                    glitchInterval={7000}
                  />{" "}
                  Sizing
                </h1>

                <p className="text-lg md:text-xl text-[#888899] max-w-3xl mx-auto">
                  Size usable capacity from cameras, bitrate and retention - then fit it onto any
                  vendor&apos;s enclosures with an optimised RAID 5 / RAID 6 layout.
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
              <StepHeading n={1} title="Required usable capacity" icon={<Camera className="w-5 h-5" />} />

              <div className="grid md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <Label className="text-[#f0f0f5]">Bitrate per camera</Label>
                  <div>
                    <Segmented
                      value={bitrate}
                      onChange={setBitrate}
                      options={BITRATES.map((b) => ({ value: b, label: `${b} Mbps` }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#f0f0f5]">Number of cameras</Label>
                  <Input
                    type="number"
                    min={1}
                    inputMode="numeric"
                    value={cameras}
                    onChange={(e) => setCameras(e.target.value)}
                    className={inputCls}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[#f0f0f5]">Retention (days)</Label>
                  <Input
                    type="number"
                    min={1}
                    inputMode="numeric"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                <Stat label="Per camera / day" value={`${fmt(perCam * 1024, 1)} GiB`} sub={`${fmt(perCam, 4)} TiB`} />
                <Stat
                  label={`Per camera / ${daysN || 0} days`}
                  value={`${fmt(perCamForDays)} TiB`}
                  sub={`${fmt(tibToTb(perCamForDays))} TB`}
                />
                <Stat
                  label="Total required usable"
                  value={`${fmt(requiredTiB)} TiB`}
                  sub={`${fmt(tibToTb(requiredTiB))} TB`}
                  accent
                />
              </div>

              <p className="flex items-start gap-2 text-xs text-[#888899] mt-4">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#f5b800]" />
                Calibrated to the rule of {REF_TIB} TiB per camera for {REF_DAYS} days at {REF_BITRATE} Mbps
                (about 5% above raw bitrate maths, covering metadata and overhead), scaled linearly for
                bitrate and days.
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
                  <StepHeading n={2} title="Storage enclosures" icon={<Server className="w-5 h-5" />} />

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <Toggle
                        checked={sameDrive}
                        onChange={setSameDrive}
                        label="Same drive size in every enclosure"
                        hint="Turn off to choose a drive size per enclosure."
                      />
                      {sameDrive && (
                        <div className="space-y-2 max-w-xs">
                          <Label className="text-[#f0f0f5]">Drive size</Label>
                          <select
                            value={globalDrive}
                            onChange={(e) => setGlobalDrive(Number(e.target.value))}
                            className={selectCls}
                          >
                            {DRIVE_SIZES.map((d) => (
                              <option key={d} value={d}>
                                {driveLabel(d)}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    <Toggle
                      checked={span}
                      onChange={setSpan}
                      label="RAID groups may span controller and JBODs"
                      hint="On: drives of the same size are pooled across enclosures. Off: every RAID group stays inside one enclosure."
                    />
                  </div>

                  <div className="space-y-3">
                    {encs.map((e) => (
                      <div
                        key={e.id}
                        className="grid grid-cols-2 md:grid-cols-[1.4fr_1.2fr_0.8fr_1.4fr_auto] gap-3 items-end p-4 bg-[#1a1a24] border border-[#2a2a36] rounded-lg"
                      >
                        <div className="space-y-1.5 col-span-2 md:col-span-1">
                          <Label className="text-xs text-[#888899]">Name</Label>
                          <Input
                            value={e.name}
                            onChange={(ev) => updateEnc(e.id, { name: ev.target.value })}
                            className={inputCls}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs text-[#888899]">Type</Label>
                          <select
                            value={e.kind}
                            onChange={(ev) =>
                              updateEnc(e.id, { kind: ev.target.value as "controller" | "jbod" })
                            }
                            className={selectCls}
                          >
                            <option value="controller">Controller</option>
                            <option value="jbod">JBOD</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs text-[#888899]">Bays</Label>
                          <Input
                            type="number"
                            min={1}
                            max={200}
                            value={e.bays || ""}
                            onChange={(ev) => updateEnc(e.id, { bays: Number(ev.target.value) })}
                            className={inputCls}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs text-[#888899]">Drive size</Label>
                          <select
                            disabled={sameDrive}
                            value={sameDrive ? globalDrive : e.drive}
                            onChange={(ev) => updateEnc(e.id, { drive: Number(ev.target.value) })}
                            className={`${selectCls} disabled:opacity-50`}
                          >
                            {DRIVE_SIZES.map((d) => (
                              <option key={d} value={d}>
                                {driveLabel(d)}
                              </option>
                            ))}
                          </select>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          disabled={encs.length === 1}
                          onClick={() => setEncs((prev) => prev.filter((x) => x.id !== e.id))}
                          className="text-[#888899] hover:text-red-400 col-span-2 md:col-span-1"
                          aria-label={`Remove ${e.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => addEnc("controller")}
                      className="bg-transparent border-[#2a2a36] text-[#f0f0f5] hover:border-[#f5b800]/50 hover:bg-[#f5b800]/10"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add controller
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => addEnc("jbod")}
                      className="bg-transparent border-[#2a2a36] text-[#f0f0f5] hover:border-[#f5b800]/50 hover:bg-[#f5b800]/10"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add JBOD
                    </Button>
                  </div>
                </div>

                {/* ------------------------------ STEP 3 ------------------------------ */}
                <div className={cardCls}>
                  <StepHeading n={3} title="RAID configuration" icon={<Layers className="w-5 h-5" />} />

                  <div className="grid md:grid-cols-3 gap-6">
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
                        {level === 5 ? "1 parity drive per group" : "2 parity drives per group"}
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
                          min={minGroup}
                          max={64}
                          value={gInput}
                          onChange={(e) => setGInput(e.target.value)}
                          className={inputCls}
                        />
                      )}
                      <p className="text-xs text-[#888899]">
                        Maximum group size used: <span className="text-[#f5b800]">{G}</span> drives
                        {customG && G !== (parseInt(gInput) || 15) ? ` (min ${minGroup} for RAID ${level})` : ""}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[#f0f0f5]">Extra hot spares (optional)</Label>
                      <Input
                        type="number"
                        min={0}
                        max={50}
                        value={spares}
                        onChange={(e) => setSpares(e.target.value)}
                        className={inputCls}
                      />
                      <p className="text-xs text-[#888899]">
                        Bays left over after full groups are also shown as spares.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ------------------------------ RESULT ------------------------------ */}
                <div className={cardCls}>
                  <StepHeading n={4} title="Optimised layout" icon={<Database className="w-5 h-5" />} />

                  {/* status */}
                  {plan.feasible ? (
                    <div className="flex items-start gap-3 p-4 mb-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-emerald-300">
                        Requirement met: {fmt(plan.usableTiB)} TiB usable against {fmt(requiredTiB)} TiB
                        required, using {populated} of {totalBays} bays.
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 p-4 mb-6 rounded-lg border border-red-500/30 bg-red-500/10">
                      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-300">
                        These enclosures top out at {fmt(plan.usableTiB)} TiB usable - short by{" "}
                        {fmt(plan.shortfallTiB)} TiB. Roughly {plan.extraDrivesNeeded} more{" "}
                        {sameDrive ? `${globalDrive} TB` : "largest-size"} drives (plus bays to hold them)
                        are needed.
                      </p>
                    </div>
                  )}

                  {plan.warnings.map((w) => (
                    <p key={w} className="text-sm text-amber-300 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> {w}
                    </p>
                  ))}

                  {level === 5 && G >= 8 && effEncs.some((e) => e.drive >= 16) && (
                    <p className="text-sm text-amber-300 mb-6 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      RAID 5 with {G}-drive groups of 16 TB+ disks means long rebuilds with no second-failure
                      protection. RAID 6 is the safer choice here.
                    </p>
                  )}

                  {/* stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Stat
                      label="Usable capacity"
                      value={`${fmt(plan.usableTiB)} TiB`}
                      sub={`${fmt(tibToTb(plan.usableTiB))} TB`}
                      accent
                    />
                    <Stat
                      label="Drives populated"
                      value={`${populated} / ${totalBays}`}
                      sub={`${plan.dataDrives} data · ${plan.parityDrives} parity · ${plan.spareDrives} spare`}
                    />
                    <Stat
                      label="RAID groups"
                      value={`${plan.groups.length}`}
                      sub={`${fmt(efficiency, 1)}% usable efficiency`}
                    />
                    <Stat
                      label="Retention at this size"
                      value={`${fmt(retentionDays, 0)} days`}
                      sub={`${camsN} cameras @ ${bitrate} Mbps`}
                    />
                  </div>

                  {/* RAID 5 vs 6 comparison */}
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-xs text-[#888899] border-b border-[#2a2a36]">
                          <th className="py-2 pr-4 font-normal">Option</th>
                          <th className="py-2 pr-4 font-normal">Drives needed</th>
                          <th className="py-2 pr-4 font-normal">Groups</th>
                          <th className="py-2 pr-4 font-normal">Usable (TiB)</th>
                          <th className="py-2 pr-4 font-normal">Efficiency</th>
                          <th className="py-2 font-normal">Fault tolerance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[plan5, plan6].map((pl) => (
                          <tr
                            key={pl.level}
                            className={`border-b border-[#2a2a36]/60 ${
                              pl.level === level ? "text-[#f5b800]" : "text-[#f0f0f5]"
                            }`}
                          >
                            <td className="py-2 pr-4 font-medium">
                              RAID {pl.level}
                              {pl.level === level ? " (selected)" : ""}
                              {!pl.feasible ? " - insufficient" : ""}
                            </td>
                            <td className="py-2 pr-4">
                              {pl.dataDrives + pl.parityDrives + pl.spareDrives}
                            </td>
                            <td className="py-2 pr-4">{pl.groups.length}</td>
                            <td className="py-2 pr-4">{fmt(pl.usableTiB)}</td>
                            <td className="py-2 pr-4">
                              {pl.rawTiB > 0 ? fmt((pl.usableTiB / pl.rawTiB) * 100, 1) : "0.0"}%
                            </td>
                            <td className="py-2">
                              {pl.level === 5 ? "1 drive / group" : "2 drives / group"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* legend */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-8 mb-4 text-xs text-[#888899]">
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
                    <span>Each colour = one RAID group</span>
                  </div>

                  {/* enclosures */}
                  <div className="space-y-4">
                    {effEncs.map((e, ei) => {
                      const used = plan.bays[ei].filter((b) => b.kind !== "empty").length
                      const cols = e.bays <= 12 ? 6 : e.bays <= 24 ? 12 : 15
                      return (
                        <div key={e.id} className="p-4 bg-[#1a1a24] border border-[#2a2a36] rounded-lg">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <HardDrive className="w-4 h-4 text-[#f5b800]" />
                              <span className="font-medium text-[#f0f0f5]">{e.name}</span>
                              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#f5b800]/30 text-[#f5b800] bg-[#f5b800]/10">
                                {e.kind}
                              </span>
                            </div>
                            <span className="text-xs text-[#888899]">
                              {used} / {e.bays} bays · {driveLabel(e.drive)}
                            </span>
                          </div>

                          <div
                            className="grid gap-1.5"
                            style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
                          >
                            {plan.bays[ei].map((b, i) => (
                              <BayTile key={i} bay={b} index={i} />
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* groups */}
                  {plan.groups.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-bold text-[#f0f0f5] mb-3">RAID groups</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {plan.groups.map((g) => {
                          const h = hueOf(g.id)
                          return (
                            <div
                              key={g.id}
                              className="flex items-center gap-3 p-3 bg-[#1a1a24] border rounded-lg"
                              style={{ borderColor: `hsl(${h} 75% 55% / 0.5)` }}
                            >
                              <span
                                className="w-3 h-10 rounded-full shrink-0"
                                style={{ background: `hsl(${h} 75% 55%)` }}
                              />
                              <div className="text-sm min-w-0">
                                <p className="text-[#f0f0f5] font-medium">
                                  RG{g.id + 1} · RAID {level} · {g.size} drives ({g.size - g.parity}D + {g.parity}P)
                                </p>
                                <p className="text-xs text-[#888899]">
                                  {fmt(g.usableTiB)} TiB usable · {g.drive} TB drives ·{" "}
                                  {g.encs.map((i) => effEncs[i].name).join(" + ")}
                                  {g.encs.length > 1 ? " (spans enclosures)" : ""}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  <p className="flex items-start gap-2 text-xs text-[#888899] mt-6">
                    <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#f5b800]" />
                    RAID 5/6 distribute parity across every drive in the group; the P tiles show parity
                    capacity, not fixed parity disks. The plan uses the fewest drives that meet the
                    requirement, filling larger drives and earlier enclosures first, with balanced group
                    sizes.
                  </p>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}