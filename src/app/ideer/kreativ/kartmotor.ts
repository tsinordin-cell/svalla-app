/**
 * KARTMOTORN (2026-11-21). Ren logik utan React, så att den går att testa i Node.
 * Värld: öarnas lägen ur Svallas data, isärflyttade så att det går att segla mellan dem. Formerna är påhittade.
 * Rutnät: en ruta är spärrad om den ligger närmare en ö än MARG. Båten flyttas bara till fria rutor,
 * därför kan den aldrig hamna på land. Rutter söks med A-stjärna och rätas ut med fri sikt.
 */
export type KOin = { slug: string; namn: string; lat: number; lng: number }
export type P = { x: number; y: number }
export type O = { slug: string; namn: string; x: number; y: number; r: number; form: number[]; brygga: number; hamn: P }
export type Varld = { oar: O[]; w: number; h: number; gw: number; gh: number; fri: Uint8Array; plast: P[]; start: P }
export type Bat = { x: number; y: number; a: number; v: number }

export const CELL = 14
export const MARG = 22
export const STRAND = 1.12
export const ANTAL_PLAST = 10

export function slump(seed: number) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 } }
export function hash(t: string) { let h = 2166136261; for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 16777619) } return h >>> 0 }
const vinkel = (a: number) => { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a }

/* Öns radie i en viss riktning, mjukt mellan formens stödpunkter. */
export function radie(o: { r: number; form: number[] }, v: number) {
  const n = o.form.length
  const t = ((((v / (Math.PI * 2)) % 1) + 1) % 1) * n
  const i = Math.floor(t) % n, f = t - Math.floor(t)
  const a = o.form[i]!, b = o.form[(i + 1) % n]!
  return o.r * (a + (b - a) * (0.5 - 0.5 * Math.cos(Math.PI * f)))
}
/* Ligger punkten på ön (stranden inräknad), med marginalen marg? */
export function iLand(o: { x: number; y: number; r: number; form: number[] }, x: number, y: number, marg: number) {
  const dx = x - o.x, dy = y - o.y, d2 = dx * dx + dy * dy
  const max = o.r * 1.3 * STRAND + marg
  if (d2 > max * max) return false
  return Math.sqrt(d2) < radie(o, Math.atan2(dy, dx)) * STRAND + marg
}

export function friPunkt(v: Varld, x: number, y: number) {
  const cx = Math.floor(x / CELL), cy = Math.floor(y / CELL)
  return cx >= 0 && cy >= 0 && cx < v.gw && cy < v.gh && v.fri[cy * v.gw + cx] === 1
}
export function narmastFri(v: Varld, x: number, y: number): P | null {
  const cx = Math.max(0, Math.min(v.gw - 1, Math.floor(x / CELL))), cy = Math.max(0, Math.min(v.gh - 1, Math.floor(y / CELL)))
  for (let r = 0; r < 80; r++) {
    let bast: P | null = null, bd = 1e18
    for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue
      const gx = cx + dx, gy = cy + dy
      if (gx < 0 || gy < 0 || gx >= v.gw || gy >= v.gh || v.fri[gy * v.gw + gx] !== 1) continue
      const px = (gx + 0.5) * CELL, py = (gy + 0.5) * CELL, d = (px - x) * (px - x) + (py - y) * (py - y)
      if (d < bd) { bd = d; bast = { x: px, y: py } }
    }
    if (bast) return bast
  }
  return null
}
export function friLinje(v: Varld, a: P, b: P) {
  const d = Math.hypot(b.x - a.x, b.y - a.y), n = Math.max(1, Math.ceil(d / (CELL * 0.4)))
  for (let i = 0; i <= n; i++) { const t = i / n; if (!friPunkt(v, a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t)) return false }
  return true
}

export function byggVarld(lista: KOin[], seed: number): Varld {
  if (!lista.length) return { oar: [], w: 1200, h: 900, gw: 86, gh: 65, fri: new Uint8Array(86 * 65).fill(1), plast: [], start: { x: 600, y: 450 } }
  const latM = lista.reduce((a, o) => a + o.lat, 0) / lista.length
  const k = Math.cos((latM * Math.PI) / 180)
  const xs = lista.map(o => o.lng * k), ys = lista.map(o => -o.lat)
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys)
  const skala = 2400 / Math.max(x1 - x0, (y1 - y0) * 1.2, 0.001)
  const oar: O[] = lista.map(o => {
    const r = slump(hash(o.slug))
    const rad = 28 + r() * 26
    return { slug: o.slug, namn: o.namn, x: (o.lng * k - x0) * skala, y: (-o.lat - y0) * skala, r: rad, form: Array.from({ length: 9 }, () => 0.78 + r() * 0.42), brygga: r() * Math.PI * 2, hamn: { x: 0, y: 0 } }
  })
  // Flytta isär öar som ligger för tätt, så att det alltid finns en farled mellan dem
  for (let varv = 0; varv < 80; varv++) {
    let rort = false
    for (let i = 0; i < oar.length; i++) for (let j = i + 1; j < oar.length; j++) {
      const a = oar[i]!, b = oar[j]!
      let dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy)
      const min = (a.r + b.r) * 1.2 * STRAND + 2 * MARG + 30
      if (d >= min) continue
      if (d < 0.01) { const v = (i * 2.399) % (Math.PI * 2); dx = Math.cos(v); dy = Math.sin(v); d = 1 }
      const s = (min - d) / 2 / d
      a.x -= dx * s; a.y -= dy * s; b.x += dx * s; b.y += dy * s; rort = true
    }
    if (!rort) break
  }
  const pad = 300
  const mx = Math.min(...oar.map(o => o.x)), my = Math.min(...oar.map(o => o.y))
  for (const o of oar) { o.x += pad - mx; o.y += pad - my }
  const w = Math.max(...oar.map(o => o.x)) + pad, h = Math.max(...oar.map(o => o.y)) + pad
  const gw = Math.ceil(w / CELL), gh = Math.ceil(h / CELL)
  const fri = new Uint8Array(gw * gh).fill(1)
  for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) if (x < 2 || y < 2 || x >= gw - 2 || y >= gh - 2) fri[y * gw + x] = 0
  for (const o of oar) {
    const rr = o.r * 1.3 * STRAND + MARG + CELL
    const ax = Math.max(0, Math.floor((o.x - rr) / CELL)), bx = Math.min(gw - 1, Math.ceil((o.x + rr) / CELL))
    const ay = Math.max(0, Math.floor((o.y - rr) / CELL)), by = Math.min(gh - 1, Math.ceil((o.y + rr) / CELL))
    for (let y = ay; y <= by; y++) for (let x = ax; x <= bx; x++) {
      // Rutan spärras om något av dess hörn eller mitten ligger för nära ön
      const px = x * CELL, py = y * CELL
      if (iLand(o, px + CELL / 2, py + CELL / 2, MARG) || iLand(o, px, py, MARG) || iLand(o, px + CELL, py, MARG) || iLand(o, px, py + CELL, MARG) || iLand(o, px + CELL, py + CELL, MARG)) fri[y * gw + x] = 0
    }
  }
  const v: Varld = { oar, w, h, gw, gh, fri, plast: [], start: { x: w / 2, y: h / 2 } }
  const forsta = oar[0]!
  v.start = narmastFri(v, forsta.x - forsta.r * 2 - 60, forsta.y + forsta.r + 70) ?? narmastFri(v, w / 2, h / 2) ?? { x: w / 2, y: h / 2 }
  // Bara vatten som går att nå från starten räknas som fritt
  const natt = new Uint8Array(gw * gh)
  const ko = [Math.floor(v.start.y / CELL) * gw + Math.floor(v.start.x / CELL)]
  natt[ko[0]!] = 1
  for (let q = 0; q < ko.length; q++) {
    const c = ko[q]!, cx = c % gw, cy = (c - cx) / gw
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
      const nx = cx + dx, ny = cy + dy
      if (nx < 0 || ny < 0 || nx >= gw || ny >= gh) continue
      const n = ny * gw + nx
      if (fri[n] === 1 && natt[n] === 0) { natt[n] = 1; ko.push(n) }
    }
  }
  for (let i = 0; i < fri.length; i++) if (natt[i] === 0) fri[i] = 0
  // Brygga och hamnläge: första riktningen där det går att lägga till
  for (const o of oar) {
    let klar = false
    for (let t = 0; t < 24 && !klar; t++) {
      const a = o.brygga + (t * Math.PI * 2) / 24
      const d = radie(o, a) * STRAND + MARG + 16
      const p = { x: o.x + Math.cos(a) * d, y: o.y + Math.sin(a) * d }
      if (friPunkt(v, p.x, p.y)) { o.brygga = a; o.hamn = p; klar = true }
    }
    if (!klar) { const p = narmastFri(v, o.x, o.y) ?? v.start; o.hamn = p; o.brygga = Math.atan2(p.y - o.y, p.x - o.x) }
  }
  // Plasten: tio påsar utspridda över hela kartan, på öppet vatten
  const r = slump(seed)
  const kol = 5, rad = 2
  const okej = (p: P, lugn: number) => friPunkt(v, p.x, p.y) && Math.hypot(p.x - v.start.x, p.y - v.start.y) > 160
    && v.plast.every(q => Math.hypot(q.x - p.x, q.y - p.y) > lugn) && oar.every(o => !iLand(o, p.x, p.y, 46))
  for (let i = 0; i < ANTAL_PLAST; i++) {
    const cx = i % kol, cy = Math.floor(i / kol) % rad
    let lagd = false
    for (let t = 0; t < 400 && !lagd; t++) {
      const hela = t >= 200
      const p = hela ? { x: 80 + r() * (w - 160), y: 80 + r() * (h - 160) } : { x: 90 + ((cx + r()) / kol) * (w - 180), y: 90 + ((cy + r()) / rad) * (h - 180) }
      const q = { x: (Math.floor(p.x / CELL) + 0.5) * CELL, y: (Math.floor(p.y / CELL) + 0.5) * CELL }
      if (okej(q, t < 300 ? 220 : 90)) { v.plast.push(q); lagd = true }
    }
    if (!lagd) { const q = narmastFri(v, 80 + r() * (w - 160), 80 + r() * (h - 160)); if (q) v.plast.push(q) }
  }
  return v
}

/* A-stjärna i åtta riktningar utan att skära hörn, sedan uträtning med fri sikt. */
export function hittaVag(v: Varld, fran: P, till: P): P[] | null {
  const s = friPunkt(v, fran.x, fran.y) ? fran : narmastFri(v, fran.x, fran.y)
  const m = friPunkt(v, till.x, till.y) ? till : narmastFri(v, till.x, till.y)
  if (!s || !m) return null
  const { gw, gh, fri } = v
  const si = Math.floor(s.y / CELL) * gw + Math.floor(s.x / CELL), mi = Math.floor(m.y / CELL) * gw + Math.floor(m.x / CELL)
  const g = new Float32Array(gw * gh).fill(Infinity), fore = new Int32Array(gw * gh).fill(-1), stangd = new Uint8Array(gw * gh)
  const hf: number[] = [], hi: number[] = []
  const in_ = (f: number, i: number) => { hf.push(f); hi.push(i); let c = hf.length - 1; while (c > 0) { const p = (c - 1) >> 1; if (hf[p]! <= hf[c]!) break; [hf[p], hf[c]] = [hf[c]!, hf[p]!];[hi[p], hi[c]] = [hi[c]!, hi[p]!]; c = p } }
  const ut = () => { const i = hi[0]!; const lf = hf.pop()!, li = hi.pop()!; if (hf.length) { hf[0] = lf; hi[0] = li; let c = 0; for (;;) { const a = c * 2 + 1, b = a + 1; let n = c; if (a < hf.length && hf[a]! < hf[n]!) n = a; if (b < hf.length && hf[b]! < hf[n]!) n = b; if (n === c) break; [hf[n], hf[c]] = [hf[c]!, hf[n]!];[hi[n], hi[c]] = [hi[c]!, hi[n]!]; c = n } } return i }
  const mx = mi % gw, my = (mi - mx) / gw
  const h = (i: number) => { const x = i % gw, y = (i - x) / gw, dx = Math.abs(x - mx), dy = Math.abs(y - my); return Math.max(dx, dy) + 0.4142 * Math.min(dx, dy) }
  g[si] = 0; in_(h(si), si)
  let hittad = false
  while (hf.length) {
    const c = ut()
    if (c === mi) { hittad = true; break }
    if (stangd[c]) continue
    stangd[c] = 1
    const cx = c % gw, cy = (c - cx) / gw
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue
      const nx = cx + dx, ny = cy + dy
      if (nx < 0 || ny < 0 || nx >= gw || ny >= gh) continue
      const n = ny * gw + nx
      if (fri[n] !== 1 || stangd[n]) continue
      if (dx && dy && (fri[cy * gw + nx] !== 1 || fri[ny * gw + cx] !== 1)) continue
      const ng = g[c]! + (dx && dy ? 1.4142 : 1)
      if (ng < g[n]!) { g[n] = ng; fore[n] = c; in_(ng + h(n), n) }
    }
  }
  if (!hittad) return null
  const rutor: P[] = []
  for (let c = mi; c !== -1; c = fore[c]!) { const x = c % gw; rutor.push({ x: (x + 0.5) * CELL, y: ((c - x) / gw + 0.5) * CELL }) }
  rutor.reverse()
  rutor[0] = { x: s.x, y: s.y }
  rutor[rutor.length - 1] = { x: m.x, y: m.y }
  const rak: P[] = [rutor[0]!]
  let i = 0
  while (i < rutor.length - 1) {
    let j = rutor.length - 1
    while (j > i + 1 && !friLinje(v, rutor[i]!, rutor[j]!)) j--
    rak.push(rutor[j]!); i = j
  }
  return rak
}

/* Flyttar båten om målrutan är fri. Annars glider den längs kanten. Svarar om den kom dit den ville. */
export function flytta(v: Varld, b: Bat, nx: number, ny: number) {
  if (friPunkt(v, nx, ny)) { b.x = nx; b.y = ny; return true }
  if (friPunkt(v, nx, b.y)) { b.x = nx; return false }
  if (friPunkt(v, b.x, ny)) { b.y = ny; return false }
  return false
}

/* Ett steg längs rutten. Båten siktar på den bortersta punkt den ser fritt, svänger med tröghet och saktar in före målet. */
export function styrMot(v: Varld, b: Bat, vag: P[], steg: { n: number }, dt: number): 'framme' | 'pa-vag' | 'vilse' {
  const sist = vag.length - 1, slut = vag[sist]!
  if (steg.n > sist) steg.n = sist
  // Gå vidare till nästa punkt först när båten ser den fritt, eller står på den nuvarande
  while (steg.n < sist && (friLinje(v, b, vag[steg.n + 1]!) || Math.hypot(vag[steg.n]!.x - b.x, vag[steg.n]!.y - b.y) < 5)) steg.n++
  const m = vag[steg.n]!
  // Har båten tappat sikten till sin punkt ska rutten räknas om från där den är
  if (!friLinje(v, b, m)) return 'vilse'
  const dSlut = Math.hypot(slut.x - b.x, slut.y - b.y)
  if (steg.n === sist && dSlut < 12) { b.v *= Math.max(0, 1 - 6 * dt); return 'framme' }
  const diff = vinkel(Math.atan2(m.y - b.y, m.x - b.x) - b.a)
  const nara = steg.n === sist && dSlut < 60
  const maxSv = (nara ? 5.5 : 3.2) * dt
  b.a = vinkel(b.a + Math.max(-maxSv, Math.min(maxSv, diff * Math.min(1, 6 * dt) * 2.2)))
  const rakt = Math.max(nara ? 0.08 : 0.22, Math.cos(Math.min(Math.abs(diff), Math.PI / 2)))
  const fart = 175 * rakt * Math.min(1, Math.max(0.2, dSlut / 140))
  b.v += (fart - b.v) * Math.min(1, 3.2 * dt)
  if (!flytta(v, b, b.x + Math.cos(b.a) * b.v * dt, b.y + Math.sin(b.a) * b.v * dt)) b.v *= Math.max(0, 1 - 4 * dt)
  return 'pa-vag'
}
