/* -------------------------------------------------------------------------- */
/*  Storage sizing + RAID planning engine (pure, framework-free)              */
/* -------------------------------------------------------------------------- */

// House rule: 3.1 TiB per camera for 120 days @ 2.5 Mbps (includes overhead).
// Everything else scales linearly from that calibration point.
export const REF_TIB = 3.1
export const REF_DAYS = 120
export const REF_BITRATE = 2.5
export const perCamPerDayTiB = (mbps: number) => (REF_TIB / REF_DAYS) * (mbps / REF_BITRATE)

// Marketing TB (10^12) -> TiB (2^40).  22 TB = 20.01 TiB
export const tbToTib = (tb: number) => (tb * 1e12) / Math.pow(2, 40)
export const tibToTb = (tib: number) => (tib * Math.pow(2, 40)) / 1e12

const EPS = 1e-9

export type RaidLevel = 5 | 6
export type BayKind = "empty" | "data" | "parity" | "spare"
export type Role = "primary" | "failover"
export type Strategy = "balance" | "fill"

export interface EncIn {
  name: string
  kind: "controller" | "jbod"
  bays: number
  drive: number // TB
}
interface Slot {
  enc: number
  bay: number
}
export interface Bay {
  kind: BayKind
  group?: number
}
export interface Group {
  id: number
  size: number
  parity: number
  drive: number // TB
  usableTiB: number
  encs: number[] // enclosure indexes the group touches
}
export interface Plan {
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
  warnings: string[]
}

export const parityOf = (level: RaidLevel) => (level === 5 ? 1 : 2)
export const minGroupOf = (level: RaidLevel) => (level === 5 ? 3 : 4)

/**
 * Split n drives into RAID groups of at most G drives.
 *  - groups are balanced (e.g. 20 drives, G=15 -> 10 + 10)
 *  - if the remainder after full groups is too small to form a valid group
 *    (e.g. 16 drives, G=15 -> 15 + 1) the leftover drives become hot spares
 */
export function splitGroups(n: number, G: number, m: number) {
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

/** Fewest drives in one storage set (controller + its JBODs) that give `required` TiB usable. */
export function buildPlan(
  encs: EncIn[],
  span: boolean,
  level: RaidLevel,
  G: number,
  spareReq: number,
  required: number,
): Plan {
  const p = parityOf(level)
  const m = minGroupOf(level)
  const warnings: string[] = []

  const bays: Bay[][] = encs.map((e) =>
    Array.from({ length: e.bays }, () => ({ kind: "empty" as BayKind })),
  )

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
  pools.sort((a, b) => b.drive - a.drive)

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
    if (remaining <= EPS || full <= 0) continue

    let n = N
    if (full >= remaining) {
      for (let k = m; k <= N; k++) {
        if (usableOf(k, G, m, p, d) >= remaining - EPS) {
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
        bays[sl.enc][sl.bay] = { kind: j < s - p ? "data" : "parity", group: gid }
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

  return {
    level,
    feasible: remaining <= 1e-6,
    bays,
    groups,
    dataDrives: groups.reduce((a, g) => a + (g.size - g.parity), 0),
    parityDrives: groups.reduce((a, g) => a + g.parity, 0),
    spareDrives: spareSlots.length,
    rawTiB: groups.reduce((a, g) => a + g.size * tbToTib(g.drive), 0),
    usableTiB: groups.reduce((a, g) => a + g.usableTiB, 0),
    maxUsableTiB: maxUsable,
    warnings,
  }
}

/* -------------------------------------------------------------------------- */
/*  Multi-set planning: camera sets  ->  storage sets  ->  RAID groups         */
/* -------------------------------------------------------------------------- */

/** Cameras of one camera set that must be recorded by one role (primary or failover). */
export interface Demand {
  camSetId: number
  perCamTiB: number // storage for ONE camera for the full retention period
  count: number
}
/** One independent storage system: a controller plus the JBODs chained to it. */
export interface StorageSetIn {
  id: number
  encs: EncIn[] // index 0 is always the controller
  span: boolean
  spares: number
  channels: number // NVR / VMS licence channels; 0 = unlimited
}
export interface Assignment {
  camSetId: number
  count: number
  perCamTiB: number
}
export interface GroupLoad {
  groupId: number
  assignments: Assignment[]
  requiredTiB: number
}
export interface SetResult {
  id: number
  plan: Plan
  maxUsableTiB: number
  cameras: number
  requiredTiB: number
  assignments: Assignment[]
  groupLoads: GroupLoad[]
}
export interface RoleResult {
  sets: SetResult[]
  unassigned: Assignment[]
  unassignedCams: number
  demandTiB: number
  demandCams: number
  requiredTiB: number // assigned
  usableTiB: number
  rawTB: number // drives in RAID groups (excl. spares), marketing TB
  dataDrives: number
  parityDrives: number
  spareDrives: number
  groups: number
  cameras: number
  feasible: boolean
  shortfallTiB: number
  extraDrivesNeeded: number
}

const sumA = (list: Assignment[]) => list.reduce((a, x) => a + x.count * x.perCamTiB, 0)
const countA = (list: Assignment[]) => list.reduce((a, x) => a + x.count, 0)

function pushOne(list: Assignment[], camSetId: number, perCamTiB: number) {
  const last = list[list.length - 1]
  if (last && last.camSetId === camSetId) last.count++
  else list.push({ camSetId, perCamTiB, count: 1 })
}

/**
 * Next-fit packing of whole cameras into RAID groups, in order.
 * A camera's recording lives on one array, with cameras assigned per disk pool.
 */
function packNextFit(caps: number[], seq: Assignment[]) {
  const loads: Assignment[][] = caps.map(() => [])
  const leftover: Assignment[] = []
  let gi = 0
  let rem = caps[0] ?? 0
  for (const a of seq) {
    for (let k = 0; k < a.count; k++) {
      while (gi < caps.length && rem < a.perCamTiB - EPS) {
        gi++
        rem = caps[gi] ?? 0
      }
      if (gi >= caps.length) pushOne(leftover, a.camSetId, a.perCamTiB)
      else {
        rem -= a.perCamTiB
        pushOne(loads[gi], a.camSetId, a.perCamTiB)
      }
    }
  }
  return { loads, leftover }
}

interface FillState {
  caps: number[]
  gi: number
  rem: number
  cams: number
  used: number
  total: number
  channels: number
  list: Assignment[]
}

function advance(st: FillState, size: number) {
  let gi = st.gi
  let rem = st.rem
  while (gi < st.caps.length && rem < size - EPS) {
    gi++
    rem = st.caps[gi] ?? 0
  }
  return { gi, rem }
}
const canPlace = (st: FillState, size: number) =>
  !(st.channels > 0 && st.cams >= st.channels) && advance(st, size).gi < st.caps.length

/**
 * Plan every storage set of one role.
 *  Phase A - distribute cameras to storage sets against each set's FULL capacity
 *            ("balance" = even utilisation, "fill" = fill sets in order, fewest drives).
 *  Phase B - for each set, find the fewest drives whose RAID groups still hold
 *            every camera assigned to it (whole cameras per array).
 */
export function planRole(
  demands: Demand[],
  sets: StorageSetIn[],
  level: RaidLevel,
  G: number,
  strategy: Strategy,
): RoleResult {
  const p = parityOf(level)

  const fulls = sets.map((s) => buildPlan(s.encs, s.span, level, G, s.spares, Number.POSITIVE_INFINITY))
  const states: FillState[] = fulls.map((f, i) => {
    const caps = f.groups.map((g) => g.usableTiB)
    return {
      caps,
      gi: 0,
      rem: caps[0] ?? 0,
      cams: 0,
      used: 0,
      total: caps.reduce((a, b) => a + b, 0),
      channels: sets[i].channels,
      list: [],
    }
  })

  // ---- Phase A
  const unassigned: Assignment[] = []
  for (const d of demands) {
    if (d.count <= 0 || d.perCamTiB <= 0) continue
    for (let k = 0; k < d.count; k++) {
      let pick = -1
      if (strategy === "fill") {
        pick = states.findIndex((st) => canPlace(st, d.perCamTiB))
      } else {
        let best = Infinity
        states.forEach((st, i) => {
          if (!canPlace(st, d.perCamTiB)) return
          const ratio = (st.used + d.perCamTiB) / st.total
          if (ratio < best - EPS) {
            best = ratio
            pick = i
          }
        })
      }
      if (pick < 0) {
        pushOne(unassigned, d.camSetId, d.perCamTiB)
        continue
      }
      const st = states[pick]
      const { gi, rem } = advance(st, d.perCamTiB)
      st.gi = gi
      st.rem = rem - d.perCamTiB
      st.cams++
      st.used += d.perCamTiB
      pushOne(st.list, d.camSetId, d.perCamTiB)
    }
  }

  // ---- Phase B
  const results: SetResult[] = sets.map((s, i) => {
    const seq = states[i].list
    const need = sumA(seq)
    let req = need
    let plan = buildPlan(s.encs, s.span, level, G, s.spares, req)
    let packed = packNextFit(plan.groups.map((g) => g.usableTiB), seq)
    for (let iter = 0; iter < 80 && packed.leftover.length; iter++) {
      const left = sumA(packed.leftover)
      req = req + left
      if (req > fulls[i].maxUsableTiB) req = Number.POSITIVE_INFINITY
      plan = buildPlan(s.encs, s.span, level, G, s.spares, req)
      packed = packNextFit(plan.groups.map((g) => g.usableTiB), seq)
      if (req === Number.POSITIVE_INFINITY) break
    }
    if (packed.leftover.length) {
      plan = fulls[i]
      packed = packNextFit(plan.groups.map((g) => g.usableTiB), seq)
    }
    return {
      id: s.id,
      plan,
      maxUsableTiB: fulls[i].maxUsableTiB,
      cameras: countA(seq),
      requiredTiB: need,
      assignments: seq,
      groupLoads: plan.groups.map((g, gi) => ({
        groupId: g.id,
        assignments: packed.loads[gi],
        requiredTiB: sumA(packed.loads[gi]),
      })),
    }
  })

  const demandTiB = demands.reduce((a, d) => a + Math.max(0, d.count) * d.perCamTiB, 0)
  const shortfallTiB = sumA(unassigned)
  const unassignedCams = countA(unassigned)
  const dMax = sets.length
    ? Math.max(0, ...sets.flatMap((s) => s.encs.map((e) => tbToTib(e.drive))))
    : 0
  const perDrive = dMax * ((G - p) / G)

  return {
    sets: results,
    unassigned,
    unassignedCams,
    demandTiB,
    demandCams: demands.reduce((a, d) => a + Math.max(0, d.count), 0),
    requiredTiB: results.reduce((a, r) => a + r.requiredTiB, 0),
    usableTiB: results.reduce((a, r) => a + r.plan.usableTiB, 0),
    rawTB: results.reduce((a, r) => a + r.plan.groups.reduce((x, g) => x + g.size * g.drive, 0), 0),
    dataDrives: results.reduce((a, r) => a + r.plan.dataDrives, 0),
    parityDrives: results.reduce((a, r) => a + r.plan.parityDrives, 0),
    spareDrives: results.reduce((a, r) => a + r.plan.spareDrives, 0),
    groups: results.reduce((a, r) => a + r.plan.groups.length, 0),
    cameras: results.reduce((a, r) => a + r.cameras, 0),
    feasible: unassignedCams === 0,
    shortfallTiB,
    extraDrivesNeeded: unassignedCams > 0 && perDrive > 0 ? Math.ceil(shortfallTiB / perDrive) : 0,
  }
}

/* -------------------------------------------------------------------------- */
/*  Shared presentation helpers                                               */
/* -------------------------------------------------------------------------- */

export const GROUP_HUES = [45, 190, 285, 140, 10, 220, 320, 90, 165, 25, 250, 350]
export const hueOf = (groupId: number) => GROUP_HUES[groupId % GROUP_HUES.length]

/** Pool / array label used in DSA sheets: A, B, ... Z, AA, AB ... */
export const arrayLabel = (i: number): string =>
  i < 26 ? String.fromCharCode(65 + i) : arrayLabel(Math.floor(i / 26) - 1) + arrayLabel(i % 26)

export const fmt = (n: number, dp = 2) =>
  (Number.isFinite(n) ? n : 0).toLocaleString("en-US", {
    minimumFractionDigits: dp,
    maximumFractionDigits: dp,
  })
