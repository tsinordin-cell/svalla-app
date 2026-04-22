'use client'
import { useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────────────────────────────────────
   HeroAnimation — En stilla vik i Stockholms skärgård
   5 varianter: klar sommardag | gyllene timmen | midnattssol | storm | dimma
───────────────────────────────────────────────────────────────────────────── */

export type HeroVariant = 1 | 2 | 3 | 4 | 5

interface Theme {
  sky: [string, string, string, string]
  sunX: number; sunY: number; sunR: number
  sunInner: string; sunOuter: string
  glowA: number; glowColor: string
  water: [string, string, string, string]
  waterHighlight: string
  farIsland: string; islandGreen: string; rockColor: string
  pineTrunk: string; pineBody: string; pineTop: string
  overlay: [string, string, string, string, string]
  waveSpeed: number; waveAmp: number
  birdColor: string; underwaterRay: string; seabedTint: string
  shimmer: string
}

const THEMES: Record<HeroVariant, Theme> = {
  1: {
    sky:          ['#3d94d4','#60aee0','#92c8f0','#b0dcf2'],
    sunX: 0.73,   sunY: 0.092, sunR: 0.034,
    sunInner:     '#fffee0', sunOuter: '#ffe070',
    glowA: 0.48,  glowColor: '255,225,90',
    water:        ['#2488c0','#186aa8','#104e84','#0a2e5a'],
    waterHighlight:'rgba(255,255,255,0.20)',
    farIsland:    'rgba(105,135,155,0.48)',
    islandGreen:  '#4e7845',
    rockColor:    '#6e7462',
    pineTrunk:    '#4e3018', pineBody: '#234a20', pineTop: '#2e5e2a',
    overlay:      ['rgba(5,20,40,0.04)','rgba(5,20,40,0.14)','rgba(5,20,40,0.22)','rgba(5,20,40,0.12)','rgba(5,20,40,0.06)'],
    waveSpeed: 0.80, waveAmp: 0.75,
    birdColor:    'rgba(48,70,88,0.75)',
    underwaterRay:'100,180,230',
    seabedTint:   'rgba(4,18,48,',
    shimmer:      '255,255,255',
  },
  2: {
    sky:          ['#d45e20','#e8904a','#f5bc72','#fde4b8'],
    sunX: 0.78,   sunY: 0.42, sunR: 0.058,
    sunInner:     '#fff0a0', sunOuter: '#ffb040',
    glowA: 0.70,  glowColor: '255,160,40',
    water:        ['#b86830','#904820','#6a2e14','#3e1408'],
    waterHighlight:'rgba(255,200,100,0.28)',
    farIsland:    'rgba(130,75,45,0.52)',
    islandGreen:  '#5e6838',
    rockColor:    '#7a6248',
    pineTrunk:    '#5a3010', pineBody: '#3a5010', pineTop: '#4a6818',
    overlay:      ['rgba(40,10,0,0.04)','rgba(40,10,0,0.14)','rgba(40,10,0,0.24)','rgba(40,10,0,0.15)','rgba(40,10,0,0.08)'],
    waveSpeed: 0.65, waveAmp: 0.75,
    birdColor:    'rgba(80,40,15,0.75)',
    underwaterRay:'200,120,50',
    seabedTint:   'rgba(40,12,4,',
    shimmer:      '255,220,140',
  },
  3: {
    sky:          ['#1a1248','#2e2278','#5a48a8','#9080c8'],
    sunX: 0.60,   sunY: 0.50, sunR: 0.050,
    sunInner:     '#fffce0', sunOuter: '#ffd080',
    glowA: 0.45,  glowColor: '255,210,100',
    water:        ['#182858','#102048','#0c1a38','#0a1440'],
    waterHighlight:'rgba(160,170,255,0.20)',
    farIsland:    'rgba(55,45,85,0.58)',
    islandGreen:  '#234050',
    rockColor:    '#303e54',
    pineTrunk:    '#1e1a2e', pineBody: '#1a2e38', pineTop: '#243848',
    overlay:      ['rgba(10,5,30,0.12)','rgba(10,5,30,0.26)','rgba(10,5,30,0.36)','rgba(10,5,30,0.22)','rgba(10,5,30,0.14)'],
    waveSpeed: 0.45, waveAmp: 0.60,
    birdColor:    'rgba(120,110,190,0.65)',
    underwaterRay:'70,90,190',
    seabedTint:   'rgba(5,5,25,',
    shimmer:      '180,180,255',
  },
  4: {
    sky:          ['#282e30','#3a4a52','#526070','#687885'],
    sunX: 0.20,   sunY: 0.18, sunR: 0.026,
    sunInner:     'rgba(220,220,200,0.6)', sunOuter: 'rgba(180,180,160,0.3)',
    glowA: 0.20,  glowColor: '200,210,200',
    water:        ['#253c48','#1c2e3a','#14202c','#0a1828'],
    waterHighlight:'rgba(180,210,230,0.14)',
    farIsland:    'rgba(55,70,75,0.62)',
    islandGreen:  '#304438',
    rockColor:    '#404e48',
    pineTrunk:    '#2a2018', pineBody: '#1e3028', pineTop: '#283c30',
    overlay:      ['rgba(5,12,18,0.18)','rgba(5,12,18,0.30)','rgba(5,12,18,0.40)','rgba(5,12,18,0.28)','rgba(5,12,18,0.18)'],
    waveSpeed: 1.40, waveAmp: 1.30,
    birdColor:    'rgba(38,52,62,0.85)',
    underwaterRay:'50,80,100',
    seabedTint:   'rgba(4,10,18,',
    shimmer:      '180,210,230',
  },
  5: {
    sky:          ['#b0c8d6','#c4d8e6','#d8e8f0','#eaf2f8'],
    sunX: 0.50,   sunY: 0.32, sunR: 0.065,
    sunInner:     'rgba(255,250,240,0.9)', sunOuter: 'rgba(215,228,238,0.5)',
    glowA: 0.85,  glowColor: '215,232,248',
    water:        ['#82a8bc','#6088a0','#426880','#2c4e64'],
    waterHighlight:'rgba(255,255,255,0.16)',
    farIsland:    'rgba(130,155,168,0.42)',
    islandGreen:  '#608070',
    rockColor:    '#6e7c80',
    pineTrunk:    '#4a3c38', pineBody: '#3c5048', pineTop: '#4e6258',
    overlay:      ['rgba(180,200,215,0.28)','rgba(180,200,215,0.40)','rgba(155,180,200,0.48)','rgba(180,200,215,0.38)','rgba(180,200,215,0.28)'],
    waveSpeed: 0.38, waveAmp: 0.48,
    birdColor:    'rgba(75,95,110,0.60)',
    underwaterRay:'150,182,205',
    seabedTint:   'rgba(20,40,58,',
    shimmer:      '240,248,255',
  },
}

type BoatType = 'sail'
interface Boat   { x: number; spd: number; type: BoatType; ph: number }
interface Bird   { x: number; baseY: number; spd: number; wingT: number; amp: number; ph: number }
interface Fish   { x: number; y: number; spd: number; dir: 1|-1; sz: number; ph: number; hue: number; type: 'pike'|'perch'|'zander'|'bream'|'cod'|'herring' }
interface Ferry  { x: number; spd: number; ph: number }
interface Weed   { x: number; h: number; ph: number; hue: number; w: number; spd: number }
interface Bubble { x: number; y: number; r: number; spd: number; ph: number; a: number }

interface Props { variant?: HeroVariant }

export default function HeroAnimation({ variant = 1 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const cx = cv.getContext('2d', { alpha: false })
    if (!cx) return

    const th = THEMES[variant]

    let W = 0, H = 0, dpr = 1
    let raf = 0, last = 0, t = 0
    let boats: Boat[] = [], birds: Bird[] = [], fish: Fish[] = []
    let weeds: Weed[] = [], bubbles: Bubble[] = []
    let ferry: Ferry = { x: 0, spd: 0, ph: 0 }

    /* ── Layout ─────────────────────────────────────────────────────────── */
    const WL = () => H * 0.58

    /* ── Multi-sine wave — calm by default ──────────────────────────────── */
    const wave = (x: number): number => {
      const b  = WL()
      const ws = th.waveSpeed
      const wa = th.waveAmp
      const swell  = Math.sin(x * 0.0020 + t * 0.16 * ws) * H * 0.012 * wa
      const mid    = Math.sin(x * 0.0052 - t * 0.28 * ws + 1.2) * H * 0.005 * wa
      const ripple = Math.sin(x * 0.0130 + t * 0.55 * ws + 2.5) * H * 0.0025 * wa
      return b + swell + mid + ripple
    }

    /* ── Scene init ─────────────────────────────────────────────────────── */
    const init = () => {
      const rnd = Math.random
      boats = [
        { x: W * 1.15, spd: 7, type: 'sail', ph: 0 },
        { x: W * 1.70, spd: 6, type: 'sail', ph: 1.8 },
        { x: W * 2.20, spd: 5, type: 'sail', ph: 3.4 },
      ]
      ferry = { x: W * 0.58, spd: 2.5, ph: 0 }
      birds = Array.from({ length: 3 }, (_, i) => ({
        x:     W * (0.08 + i * 0.34) + rnd() * 60,
        baseY: H * (0.07 + i * 0.030 + rnd() * 0.012),
        spd:   11 + rnd() * 9,
        wingT: rnd() * Math.PI * 2,
        amp:   H * (0.004 + rnd() * 0.003),
        ph:    rnd() * Math.PI * 2,
      }))
      // 14 fish — gädda, abborre, gös, braxen, torsk, sill
      fish = [
        { x: rnd()*W, y: H*0.68, spd: 4,  dir:  1, sz: 26, ph: rnd()*Math.PI*2, hue: 110, type: 'pike'    },
        { x: rnd()*W, y: H*0.80, spd: 3,  dir: -1, sz: 22, ph: rnd()*Math.PI*2, hue: 118, type: 'pike'    },
        { x: rnd()*W, y: H*0.90, spd: 4,  dir: -1, sz: 16, ph: rnd()*Math.PI*2, hue: 112, type: 'pike'    },
        { x: rnd()*W, y: H*0.63, spd: 8,  dir: -1, sz: 14, ph: rnd()*Math.PI*2, hue: 95,  type: 'perch'   },
        { x: rnd()*W, y: H*0.75, spd: 7,  dir:  1, sz: 12, ph: rnd()*Math.PI*2, hue: 105, type: 'perch'   },
        { x: rnd()*W, y: H*0.85, spd: 9,  dir: -1, sz: 10, ph: rnd()*Math.PI*2, hue: 90,  type: 'perch'   },
        { x: rnd()*W, y: H*0.72, spd: 5,  dir:  1, sz: 20, ph: rnd()*Math.PI*2, hue: 130, type: 'zander'  },
        { x: rnd()*W, y: H*0.82, spd: 4,  dir: -1, sz: 17, ph: rnd()*Math.PI*2, hue: 125, type: 'zander'  },
        { x: rnd()*W, y: H*0.78, spd: 3,  dir:  1, sz: 19, ph: rnd()*Math.PI*2, hue: 38,  type: 'bream'   },
        { x: rnd()*W, y: H*0.88, spd: 4,  dir: -1, sz: 15, ph: rnd()*Math.PI*2, hue: 42,  type: 'bream'   },
        { x: rnd()*W, y: H*0.76, spd: 3,  dir:  1, sz: 24, ph: rnd()*Math.PI*2, hue: 170, type: 'cod'     },
        { x: rnd()*W, y: H*0.86, spd: 4,  dir: -1, sz: 20, ph: rnd()*Math.PI*2, hue: 165, type: 'cod'     },
        { x: rnd()*W, y: H*0.65, spd: 10, dir:  1, sz:  9, ph: rnd()*Math.PI*2, hue: 200, type: 'herring'  },
        { x: rnd()*W, y: H*0.70, spd: 11, dir: -1, sz:  8, ph: rnd()*Math.PI*2, hue: 205, type: 'herring'  },
      ]
      // Sparse seaweed — 3 plants, short, natural
      weeds = Array.from({ length: 3 }, (_, i) => ({
        x: W * (0.09 + i * 0.36) + (rnd() - 0.5) * W * 0.05,
        h: H * (0.028 + rnd() * 0.036),
        ph: rnd() * Math.PI * 2, hue: 108 + rnd() * 28, w: 1.8 + rnd() * 2.2,
        spd: 0.28 + rnd() * 0.42,
      }))
      bubbles = Array.from({ length: 4 }, () => ({
        x: rnd() * W, y: H * (0.72 + rnd() * 0.28),
        r: 0.7 + rnd() * 1.4, spd: 1.4 + rnd() * 2.8,
        ph: rnd() * Math.PI * 2, a: 0.06 + rnd() * 0.10,
      }))
    }

    /* ── Resize ─────────────────────────────────────────────────────────── */
    const resize = () => {
      dpr = window.devicePixelRatio || 1
      const r = cv.getBoundingClientRect()
      W = r.width; H = r.height
      cv.width  = Math.round(W * dpr)
      cv.height = Math.round(H * dpr)
      cx.setTransform(dpr, 0, 0, dpr, 0, 0)
      init()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(cv)

    /* ═══════════════════════════════════════════════════════════════════════
       DRAW HELPERS
    ════════════════════════════════════════════════════════════════════════ */

    // Sky extends past WL() to prevent gap when wave dips below baseline
    const drawSky = () => {
      const g = cx.createLinearGradient(0, 0, 0, H * 0.62)
      const [s0, s1, s2, s3] = th.sky
      g.addColorStop(0, s0); g.addColorStop(0.35, s1)
      g.addColorStop(0.75, s2); g.addColorStop(1, s3)
      cx.fillStyle = g; cx.fillRect(0, 0, W, H * 0.62)
    }

    const drawSun = () => {
      const sx = W * th.sunX, sy = H * th.sunY, sr = H * th.sunR
      const glow = cx.createRadialGradient(sx, sy, 0, sx, sy, sr * 7)
      glow.addColorStop(0,   `rgba(${th.glowColor},${th.glowA})`)
      glow.addColorStop(0.4, `rgba(${th.glowColor},${(th.glowA * 0.38).toFixed(2)})`)
      glow.addColorStop(1,   `rgba(${th.glowColor},0)`)
      cx.fillStyle = glow
      cx.beginPath(); cx.arc(sx, sy, sr * 7, 0, Math.PI * 2); cx.fill()
      const disc = cx.createRadialGradient(sx, sy, 0, sx, sy, sr)
      disc.addColorStop(0, th.sunInner); disc.addColorStop(1, th.sunOuter)
      cx.fillStyle = disc; cx.beginPath(); cx.arc(sx, sy, sr, 0, Math.PI * 2); cx.fill()
    }

    const drawFarIslands = () => {
      cx.fillStyle = th.farIsland
      cx.beginPath()
      cx.moveTo(0, H * 0.445)
      cx.bezierCurveTo(W*0.04, H*0.400, W*0.11, H*0.382, W*0.185, H*0.400)
      cx.bezierCurveTo(W*0.23, H*0.415, W*0.265, H*0.435, W*0.295, H*0.445)
      cx.lineTo(0, H * 0.445); cx.fill()
      cx.beginPath()
      cx.moveTo(W*0.365, H*0.445)
      cx.bezierCurveTo(W*0.395, H*0.388, W*0.495, H*0.368, W*0.608, H*0.386)
      cx.bezierCurveTo(W*0.672, H*0.400, W*0.722, H*0.428, W*0.752, H*0.445)
      cx.lineTo(W*0.365, H*0.445); cx.fill()
      cx.beginPath()
      cx.moveTo(W*0.825, H*0.445)
      cx.bezierCurveTo(W*0.862, H*0.382, W*0.930, H*0.372, W, H*0.390)
      cx.lineTo(W, H * 0.445); cx.fill()
      // Colorful sjöbodar on far islands — west-coast style (red, yellow, blue, ochre)
      const sjobod = (bx: number, by: number, bw: number, bh: number, bodyColor: string) => {
        cx.fillStyle = bodyColor
        cx.fillRect(bx - bw/2, by, bw, bh)
        cx.fillStyle = 'rgba(28,14,8,0.72)'
        cx.beginPath()
        cx.moveTo(bx - bw/2 - 1, by); cx.lineTo(bx + bw/2 + 1, by); cx.lineTo(bx, by - bh * 0.60)
        cx.closePath(); cx.fill()
      }
      // Island 1 (left) — röd · gul · blå — tight west-coast row
      const bhb = H * 0.015, bwb = W * 0.015
      sjobod(W*0.080, H*0.411, bwb, bhb, 'rgba(192,40,28,0.84)')
      sjobod(W*0.099, H*0.411, bwb, bhb, 'rgba(200,162,22,0.82)')
      sjobod(W*0.118, H*0.411, bwb, bhb, 'rgba(28,76,168,0.80)')
      // Island 2 (centre) — röd · gul · blå · vit — tight west-coast row, centred
      sjobod(W*0.474, H*0.400, bwb, bhb, 'rgba(192,40,28,0.84)')
      sjobod(W*0.493, H*0.400, bwb, bhb, 'rgba(200,162,22,0.82)')
      sjobod(W*0.512, H*0.400, bwb, bhb, 'rgba(28,76,168,0.80)')
      sjobod(W*0.531, H*0.400, bwb, bhb, 'rgba(228,220,206,0.78)')
      // Island 3 (right) — gul sjöbod
      sjobod(W*0.888, H*0.396, bwb, bhb, 'rgba(200,162,22,0.82)')
    }

    /* ── Pine tree ───────────────────────────────────────────────────────── */
    const pine = (x: number, y: number, h: number) => {
      const w2 = h * 0.28
      cx.fillStyle = th.pineTrunk; cx.fillRect(x - 1.5, y, 3, h * 0.14)
      cx.beginPath()
      cx.moveTo(x, y - h); cx.lineTo(x + w2, y); cx.lineTo(x - w2, y); cx.closePath()
      cx.fillStyle = th.pineBody; cx.fill()
      cx.beginPath()
      cx.moveTo(x, y - h*1.30); cx.lineTo(x + w2*0.60, y - h*0.38); cx.lineTo(x - w2*0.60, y - h*0.38); cx.closePath()
      cx.fillStyle = th.pineTop; cx.fill()
    }

    /* ── Faluröd cottage ────────────────────────────────────────────────── */
    const cottage = (x: number, y: number, small = false) => {
      const cw = W * (small ? 0.018 : 0.026), ch = H * (small ? 0.020 : 0.027)
      cx.fillStyle = small ? '#8a2020' : '#952420'
      cx.fillRect(x - cw/2, y, cw, ch)
      cx.fillStyle = '#ede8dc'
      cx.fillRect(x - cw/2, y, 2.5, ch)
      cx.fillRect(x + cw/2 - 2.5, y, 2.5, ch)
      cx.fillStyle = '#2a1808'
      cx.beginPath()
      cx.moveTo(x - cw/2 - 2, y); cx.lineTo(x + cw/2 + 2, y); cx.lineTo(x, y - ch*0.62)
      cx.closePath(); cx.fill()
      cx.fillStyle = '#ede8dc'
      cx.fillRect(x - cw*0.15, y + ch*0.20, cw*0.30, ch*0.32)
      cx.fillStyle = 'rgba(120,185,218,0.50)'
      cx.fillRect(x - cw*0.13, y + ch*0.22, cw*0.26, ch*0.28)
    }

    /* ── Bastu / sauna ──────────────────────────────────────────────────── */
    const sauna = (x: number, y: number) => {
      const sw = W * 0.032, sh = H * 0.024
      // Horizontal log body — dark reddish brown
      cx.fillStyle = '#5a1818'
      cx.fillRect(x - sw/2, y - sh, sw, sh)
      // Log grain lines
      cx.strokeStyle = 'rgba(30,8,8,0.38)'; cx.lineWidth = 0.9
      for (let i = 1; i <= 4; i++) {
        cx.beginPath()
        cx.moveTo(x - sw/2, y - sh + i * sh/5)
        cx.lineTo(x + sw/2, y - sh + i * sh/5)
        cx.stroke()
      }
      // Corner notches (vertical boards)
      cx.fillStyle = '#3e1010'
      cx.fillRect(x - sw/2, y - sh, 3.5, sh)
      cx.fillRect(x + sw/2 - 3.5, y - sh, 3.5, sh)
      // Low pitched roof
      cx.fillStyle = '#2a1808'
      cx.beginPath()
      cx.moveTo(x - sw/2 - 3, y - sh)
      cx.lineTo(x, y - sh - sh * 0.35)
      cx.lineTo(x + sw/2 + 3, y - sh)
      cx.closePath(); cx.fill()
      // Chimney
      const chimX = x + sw * 0.22
      cx.fillStyle = '#3a2a20'
      cx.fillRect(chimX - 3, y - sh - sh*0.35 - H*0.022, 6, H*0.022)
      // Smoke — slow animated wisp
      cx.save()
      cx.strokeStyle = 'rgba(210,200,188,0.28)'; cx.lineWidth = 1.8; cx.lineCap = 'round'
      cx.beginPath()
      const st = t * 0.30
      cx.moveTo(chimX, y - sh - sh*0.35 - H*0.022)
      cx.bezierCurveTo(
        chimX + Math.sin(st)       * 4, y - sh - sh*0.35 - H*0.034,
        chimX + Math.sin(st + 1.0) * 6, y - sh - sh*0.35 - H*0.048,
        chimX + Math.sin(st + 2.0) * 5, y - sh - sh*0.35 - H*0.062
      )
      cx.stroke()
      cx.restore()
    }

    /* ── Fishing net ────────────────────────────────────────────────────── */
    const fishingNet = (x: number, y: number) => {
      const nw = W * 0.062, nh = H * 0.048
      const cols = 13, rows = 7
      // Drying posts
      cx.strokeStyle = '#4a3010'; cx.lineWidth = 2.2
      cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x, y - nh - H*0.012); cx.stroke()
      cx.beginPath(); cx.moveTo(x + nw, y); cx.lineTo(x + nw, y - nh - H*0.012); cx.stroke()
      // Top rope line
      cx.strokeStyle = 'rgba(160,125,70,0.88)'; cx.lineWidth = 1.5
      cx.beginPath(); cx.moveTo(x, y - nh - H*0.006); cx.lineTo(x + nw, y - nh - H*0.006); cx.stroke()
      // Cork floats
      cx.fillStyle = '#d47818'
      for (let i = 0; i <= 6; i++) {
        const fx = x + i * nw / 6
        cx.beginPath(); cx.ellipse(fx, y - nh - H*0.006, 2.8, 1.8, 0, 0, Math.PI * 2); cx.fill()
      }
      // Pre-compute node positions with organic irregularity
      const nodeX = (col: number, row: number): number => {
        const base = x + col * nw / cols
        // subtle sag: inner columns droop slightly more
        const sag = Math.sin(col * 0.7 + t * 0.14) * H * 0.0018 * (1 + row * 0.3)
        return base + sag * 0.4
      }
      const nodeY = (col: number, row: number): number => {
        const base = y - nh + row * nh / rows
        // catenary-style gentle bow per column
        const bow = Math.sin(col * Math.PI / cols) * H * 0.006
        const wiggle = Math.sin(col * 1.1 + row * 0.9 + t * 0.20) * H * 0.0008
        return base + bow + wiggle
      }
      // Vertical threads
      cx.strokeStyle = 'rgba(88,65,36,0.42)'; cx.lineWidth = 0.35; cx.lineCap = 'round'
      for (let c = 0; c <= cols; c++) {
        cx.beginPath()
        cx.moveTo(nodeX(c, 0), nodeY(c, 0))
        for (let r = 1; r <= rows; r++) {
          cx.lineTo(nodeX(c, r), nodeY(c, r))
        }
        cx.stroke()
      }
      // Horizontal threads
      for (let r = 0; r <= rows; r++) {
        cx.beginPath()
        cx.moveTo(nodeX(0, r), nodeY(0, r))
        for (let c = 1; c <= cols; c++) {
          cx.lineTo(nodeX(c, r), nodeY(c, r))
        }
        cx.stroke()
      }
      // Knot dots at intersections — sparse, naturalistic
      cx.fillStyle = 'rgba(72,50,24,0.55)'
      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          cx.beginPath()
          cx.arc(nodeX(c, r), nodeY(c, r), 0.9, 0, Math.PI * 2)
          cx.fill()
        }
      }
    }

    /* ── Sjöbod / boathouse ─────────────────────────────────────────────── */
    const boathouse = (x: number, y: number) => {
      const bw = W * 0.026, bh = H * 0.032
      cx.fillStyle = '#3a2810'
      ;[-bw*0.28, 0, bw*0.28].forEach(ox => cx.fillRect(x + ox - 1.5, y, 3, H * 0.026))
      cx.fillStyle = '#8a2020'
      cx.fillRect(x - bw/2, y - bh, bw, bh)
      cx.fillStyle = '#ede8dc'
      cx.fillRect(x - bw/2, y - bh, 2.5, bh)
      cx.fillRect(x + bw/2 - 2.5, y - bh, 2.5, bh)
      cx.fillStyle = '#2a1808'
      cx.beginPath()
      cx.moveTo(x - bw/2 - 3, y - bh); cx.lineTo(x + bw/2 + 3, y - bh); cx.lineTo(x, y - bh - bh*0.52)
      cx.closePath(); cx.fill()
      cx.fillStyle = 'rgba(6,14,28,0.65)'
      cx.fillRect(x - bw*0.28, y - bh*0.50, bw*0.56, bh*0.50)
      cx.strokeStyle = '#ede8dc'; cx.lineWidth = 1.0
      cx.strokeRect(x - bw*0.28, y - bh*0.50, bw*0.56, bh*0.50)
    }

    /* ── Dock / brygga ──────────────────────────────────────────────────── */
    const dock = (x: number, waterY: number) => {
      const dLen = W * 0.042
      const dTop = waterY - H * 0.008
      cx.fillStyle = '#382608'
      ;[x + 3, x + dLen * 0.36, x + dLen * 0.70, x + dLen - 3].forEach(px =>
        cx.fillRect(px - 2, dTop, 4, H * 0.038)
      )
      cx.fillStyle = '#6e5028'
      cx.fillRect(x, dTop, dLen, H * 0.008)
      cx.strokeStyle = '#503818'; cx.lineWidth = 0.6
      for (let i = 1; i <= 5; i++) {
        const px = x + i * (dLen / 6)
        cx.beginPath(); cx.moveTo(px, dTop); cx.lineTo(px, dTop + H * 0.008); cx.stroke()
      }
      cx.fillStyle = 'rgba(210,185,145,0.14)'
      cx.fillRect(x, dTop, dLen, H * 0.003)
    }

    /* ── Bathing ladder (stege) ─────────────────────────────────────────── */
    const ladder = (x: number, waterY: number) => {
      const lw = W * 0.009, lh = H * 0.058
      cx.strokeStyle = 'rgba(90,58,24,0.72)'; cx.lineWidth = 1.8; cx.lineCap = 'round'
      // Two rails
      cx.beginPath(); cx.moveTo(x - lw/2, waterY); cx.lineTo(x - lw/2, waterY + lh); cx.stroke()
      cx.beginPath(); cx.moveTo(x + lw/2, waterY); cx.lineTo(x + lw/2, waterY + lh); cx.stroke()
      // Rungs
      cx.lineWidth = 1.4
      for (let i = 0; i <= 4; i++) {
        const ry = waterY + i * lh / 4
        cx.beginPath(); cx.moveTo(x - lw/2, ry); cx.lineTo(x + lw/2, ry); cx.stroke()
      }
    }

    /* ── Short sauna dock ───────────────────────────────────────────────── */
    const saunaDock = (x: number, waterY: number) => {
      const dLen = W * 0.028
      const dTop = waterY - H * 0.006
      cx.fillStyle = '#382608'
      ;[x + 2, x + dLen * 0.50, x + dLen - 2].forEach(px =>
        cx.fillRect(px - 1.5, dTop, 3, H * 0.030)
      )
      cx.fillStyle = '#5e4020'
      cx.fillRect(x, dTop, dLen, H * 0.007)
    }

    /* ── Swedish flagpole ───────────────────────────────────────────────── */
    const flagpole = (x: number, y: number) => {
      const ph = H * 0.055
      cx.strokeStyle = '#b0b0b0'; cx.lineWidth = 1.4; cx.lineCap = 'round'
      cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x, y - ph); cx.stroke()
      // Flag — blue with yellow cross
      const fw = H * 0.022, fh = H * 0.015, fy2 = y - ph
      cx.fillStyle = '#006AA7'
      cx.fillRect(x, fy2, fw, fh)
      // Cross: horizontal
      cx.fillStyle = '#FECC02'
      cx.fillRect(x, fy2 + fh * 0.38, fw, fh * 0.24)
      // Cross: vertical (shifted left of centre — Swedish flag style)
      cx.fillRect(x + fw * 0.28, fy2, fw * 0.20, fh)
    }

    /* ── Midsommarstång ──────────────────────────────────────────────────── */
    const midsommarstang = (x: number, y: number, scale = 1.0) => {
      const ph = H * 0.090 * scale
      cx.strokeStyle = '#4a6e28'; cx.lineWidth = 2.8 * scale; cx.lineCap = 'round'
      cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x, y - ph); cx.stroke()
      // Cross piece
      const cw = H * 0.032 * scale, cy2 = y - ph * 0.80
      cx.strokeStyle = '#4a6e28'; cx.lineWidth = 2.2 * scale
      cx.beginPath(); cx.moveTo(x - cw, cy2); cx.lineTo(x + cw, cy2); cx.stroke()
      // Green wreath at top
      cx.fillStyle = 'rgba(72,148,48,0.78)'
      cx.beginPath(); cx.arc(x, y - ph, H * 0.006 * scale, 0, Math.PI * 2); cx.fill()
      cx.beginPath(); cx.arc(x - cw, cy2, H * 0.005 * scale, 0, Math.PI * 2); cx.fill()
      cx.beginPath(); cx.arc(x + cw, cy2, H * 0.005 * scale, 0, Math.PI * 2); cx.fill()
      // Ribbons — red and green hanging curves
      cx.strokeStyle = 'rgba(210,48,60,0.65)'; cx.lineWidth = 0.9 * scale; cx.lineCap = 'round'
      cx.beginPath()
      cx.moveTo(x - cw, cy2)
      cx.bezierCurveTo(x - cw - 4*scale, cy2 + H*0.012*scale, x - cw - 2*scale, cy2 + H*0.022*scale, x - cw, cy2 + H*0.026*scale)
      cx.stroke()
      cx.strokeStyle = 'rgba(68,150,48,0.65)'
      cx.beginPath()
      cx.moveTo(x + cw, cy2)
      cx.bezierCurveTo(x + cw + 4*scale, cy2 + H*0.012*scale, x + cw + 2*scale, cy2 + H*0.022*scale, x + cw, cy2 + H*0.026*scale)
      cx.stroke()
    }

    /* ── Near islands — one coherent bay scene ───────────────────────────── */
    const drawNearIslands = () => {
      const wb = WL()
      // Extend island shapes BELOW waterline to eliminate rendering gap
      // Water wave can dip up to ~H*0.018 below WL — extend by H*0.024 for safety
      const ext = H * 0.024
      cx.save()

      // ── LEFT ISLAND — the settlement ─────────────────────────────────────
      // Flat granite island — low profile, wide shape
      cx.beginPath()
      cx.moveTo(-6, wb + ext)
      cx.bezierCurveTo(W*0.010, H*0.448, W*0.058, H*0.428, W*0.138, H*0.440)
      cx.bezierCurveTo(W*0.195, H*0.455, W*0.240, H*0.480, W*0.268, wb + ext)
      cx.lineTo(-6, wb + ext); cx.closePath()
      cx.fillStyle = th.islandGreen; cx.fill()

      // Granite rock face — lower left shore
      cx.beginPath()
      cx.moveTo(-6, wb + ext)
      cx.lineTo(-6, H*0.465)
      cx.bezierCurveTo(W*0.012, H*0.428, W*0.040, H*0.418, W*0.062, H*0.445)
      cx.lineTo(W*0.075, wb + ext)
      cx.fillStyle = th.rockColor; cx.fill()

      // Subtle granite strata
      cx.strokeStyle = 'rgba(155,148,135,0.12)'; cx.lineWidth = 0.8
      for (let l = 0; l < 3; l++) {
        const ly = wb * (0.956 + l * 0.013)
        cx.beginPath()
        cx.moveTo(-4, ly)
        cx.bezierCurveTo(W*0.018, ly - H*0.002, W*0.038, ly + H*0.002, W*0.065, ly)
        cx.stroke()
      }
      cx.fillStyle = 'rgba(195,188,175,0.16)'
      for (let i = 0; i < 5; i++) cx.fillRect(W*(0.012 + i*0.009), H*0.450, 2, 2)

      // Pines — 3, sparsely placed
      pine(W*0.058, wb * 0.964, H * 0.050)
      pine(W*0.098, wb * 0.942, H * 0.056)
      pine(W*0.155, wb * 0.938, H * 0.050)

      // Two cottages — small hamlet
      cottage(W * 0.095, wb * 0.958, true)
      cottage(W * 0.142, wb * 0.952, false)

      // Dock — left island
      dock(W * 0.222, wb)

      // Fishing net — drying on shore, larger and visible
      fishingNet(W * 0.178, wb * 0.995)

      // Flagpole — Swedish flag
      flagpole(W * 0.120, wb * 0.950)


      // ── RIGHT ISLAND — rocky, sauna side ─────────────────────────────────
      // Flat rocky island — lower, wider
      cx.beginPath()
      cx.moveTo(W*0.508, wb + ext)
      cx.bezierCurveTo(W*0.528, H*0.400, W*0.595, H*0.378, W*0.682, H*0.398)
      cx.bezierCurveTo(W*0.740, H*0.425, W*0.780, H*0.470, W*0.796, wb + ext)
      cx.lineTo(W*0.508, wb + ext); cx.closePath()
      cx.fillStyle = th.islandGreen; cx.fill()

      // Rocky extension — smooth to right edge
      cx.beginPath()
      cx.moveTo(W*0.788, wb + ext)
      cx.bezierCurveTo(W*0.818, H*0.452, W*0.872, H*0.440, W*0.925, H*0.462)
      cx.bezierCurveTo(W*0.955, H*0.456, W*0.982, H*0.452, W+8, H*0.454)
      cx.lineTo(W+8, wb + ext)
      cx.fillStyle = th.rockColor; cx.fill()

      // Granite speckle
      cx.fillStyle = 'rgba(195,188,175,0.16)'
      for (let i = 0; i < 6; i++) cx.fillRect(W*(0.806 + i*0.010), H*0.464, 2, 2)

      // Strata lines right shore
      cx.strokeStyle = 'rgba(155,148,135,0.10)'; cx.lineWidth = 0.8
      for (let l = 0; l < 2; l++) {
        const ly = wb * (0.962 + l * 0.014)
        cx.beginPath()
        cx.moveTo(W*0.796, ly)
        cx.bezierCurveTo(W*0.838, ly - H*0.002, W*0.878, ly + H*0.002, W*0.928, ly)
        cx.stroke()
      }

      // Two pines
      pine(W*0.568, wb * 0.930, H * 0.048)
      pine(W*0.635, wb * 0.920, H * 0.054)

      // Boathouse left side
      boathouse(W * 0.518, wb)

      // Sauna with short dock + ladder on right side
      sauna(W * 0.740, wb * 0.968)
      saunaDock(W * 0.758, wb)
      ladder(W * 0.772, wb)

      // ── Small mid skerry — low granite
      cx.beginPath()
      cx.moveTo(W*0.340, wb + ext)
      cx.bezierCurveTo(W*0.346, H*0.492, W*0.362, H*0.480, W*0.380, H*0.485)
      cx.bezierCurveTo(W*0.394, H*0.490, W*0.404, H*0.493, W*0.412, wb + ext)
      cx.fillStyle = th.rockColor; cx.fill()
      cx.fillStyle = 'rgba(195,188,175,0.20)'
      for (let i = 0; i < 3; i++) cx.fillRect(W*(0.352 + i*0.014), H*0.486, 2, 2)

      cx.restore()
    }

    /* ── Water ───────────────────────────────────────────────────────────── */
    const drawWater = () => {
      cx.save()
      cx.beginPath()
      cx.moveTo(0, wave(0))
      for (let x = 2; x <= W; x += 2) cx.lineTo(x, wave(x))
      cx.lineTo(W, H); cx.lineTo(0, H); cx.closePath()
      const [w0, w1, w2, w3] = th.water
      const wg = cx.createLinearGradient(0, WL(), 0, H)
      wg.addColorStop(0,    w0)
      wg.addColorStop(0.10, w0)
      wg.addColorStop(0.30, w1)
      wg.addColorStop(0.60, w2)
      wg.addColorStop(1,    w3)
      cx.fillStyle = wg; cx.fill()
      // Surface highlight line
      cx.beginPath()
      cx.moveTo(0, wave(0))
      for (let x = 2; x <= W; x += 2) cx.lineTo(x, wave(x))
      cx.strokeStyle = th.waterHighlight; cx.lineWidth = 1.6; cx.stroke()
      // Subtle second ripple
      cx.beginPath()
      const off = H * 0.008
      for (let x = 0; x <= W; x += 4) {
        const y2 = wave(x) + off + Math.sin(x * 0.0035 - t * 0.22 * th.waveSpeed + 0.9) * H * 0.0035 * th.waveAmp
        x === 0 ? cx.moveTo(x, y2) : cx.lineTo(x, y2)
      }
      cx.strokeStyle = 'rgba(255,255,255,0.07)'; cx.lineWidth = 0.9; cx.stroke()
      cx.restore()
    }

    /* ── Sun shimmer on water surface ───────────────────────────────────── */
    const drawWaterShimmer = () => {
      const sx   = W * th.sunX
      const wy   = WL()
      const shimH = H * 0.22
      const sg = cx.createLinearGradient(sx, wy, sx, wy + shimH)
      const sa = 0.10 + Math.sin(t * 1.0) * 0.03
      sg.addColorStop(0,    `rgba(${th.shimmer},${sa})`)
      sg.addColorStop(0.30, `rgba(${th.shimmer},${(sa * 0.55).toFixed(3)})`)
      sg.addColorStop(0.65, `rgba(${th.shimmer},${(sa * 0.20).toFixed(3)})`)
      sg.addColorStop(1,    `rgba(${th.shimmer},0)`)
      cx.fillStyle = sg
      const sw = W * 0.058 + Math.sin(t * 0.7) * W * 0.008
      cx.beginPath()
      cx.ellipse(sx, wy + shimH * 0.5, sw, shimH * 0.5, 0, 0, Math.PI * 2)
      cx.fill()
      for (let i = 0; i < 5; i++) {
        const spx = sx + Math.sin(t * 1.6 + i * 1.1) * sw * 1.5
        const spy = wy + (i / 4.5) * shimH * 0.4 + Math.sin(t * 2.0 + i) * H * 0.004
        const spa = (0.20 + Math.sin(t * 2.2 + i * 1.3) * 0.14) * (1 - i / 5.5)
        cx.fillStyle = `rgba(${th.shimmer},${spa.toFixed(3)})`
        cx.beginPath()
        cx.ellipse(spx, spy, 2.2 + i * 0.4, 0.7, 0, 0, Math.PI * 2)
        cx.fill()
      }
    }

    /* ── Underwater atmosphere ──────────────────────────────────────────── */
    const drawUnderwater = () => {
      const wb = WL()
      // Deeper blue-green tint — natural, not aquarium
      const dg = cx.createLinearGradient(0, wb, 0, H)
      dg.addColorStop(0,    `${th.seabedTint}0)`)
      dg.addColorStop(0.20, `${th.seabedTint}0.04)`)
      dg.addColorStop(0.55, `${th.seabedTint}0.12)`)
      dg.addColorStop(1,    `${th.seabedTint}0.22)`)
      cx.fillStyle = dg; cx.fillRect(0, wb, W, H - wb)
      // Two subtle light rays — slower, narrower
      for (let i = 0; i < 2; i++) {
        const rx = W * (0.22 + i * 0.40) + Math.sin(t * 0.08 + i * 1.4) * 10
        cx.save(); cx.translate(rx, wb); cx.rotate(-0.03 + i * 0.02)
        const rg = cx.createLinearGradient(0, 0, 0, H * 0.26)
        const a = 0.030 + Math.sin(t * 0.22 + i) * 0.012
        rg.addColorStop(0, `rgba(${th.underwaterRay},${a})`)
        rg.addColorStop(1, `rgba(${th.underwaterRay},0)`)
        cx.fillStyle = rg
        cx.beginPath(); cx.moveTo(-3, 0); cx.lineTo(3, 0)
        cx.lineTo(10, H*0.26); cx.lineTo(-10, H*0.26); cx.closePath(); cx.fill()
        cx.restore()
      }
    }

    /* ── Suspended particles — sediment drifting in water ─────────────── */
    const drawParticles = () => {
      const wb = WL()
      cx.save()
      for (let i = 0; i < 16; i++) {
        const px = (W * (0.032 + i * 0.062) + Math.sin(t * 0.12 + i * 2.1) * W * 0.018) % W
        const depth = (i * 0.065 + 0.04) % 0.78
        const py = wb + H * (depth * 0.58) + Math.sin(t * 0.07 + i * 1.9) * H * 0.010
        if (py >= H - 4) continue
        const a = (0.06 + Math.sin(t * 0.25 + i * 0.8) * 0.028) * (1 - depth * 0.5)
        cx.fillStyle = `rgba(${th.underwaterRay},${a.toFixed(3)})`
        cx.beginPath(); cx.arc(px, py, 0.8, 0, Math.PI * 2); cx.fill()
      }
      cx.restore()
    }

    /* ── Seabed — sandy sediment + scattered stones ─────────────────────── */
    const drawSeabedRocks = () => {
      // Sandy/silty bottom gradient
      const sg = cx.createLinearGradient(0, H * 0.86, 0, H)
      sg.addColorStop(0, 'rgba(38,52,68,0)')
      sg.addColorStop(0.40, 'rgba(32,46,62,0.28)')
      sg.addColorStop(1,    'rgba(24,36,52,0.52)')
      cx.fillStyle = sg; cx.fillRect(0, H * 0.86, W, H * 0.14)
      // Sediment grain texture — irregular dots
      cx.fillStyle = 'rgba(50,65,80,0.28)'
      for (let i = 0; i < 28; i++) {
        const gx = W * ((i * 0.037 + 0.008) % 1.0)
        const gy = H * (0.90 + ((i * 0.031) % 0.09))
        cx.beginPath(); cx.arc(gx, gy, 1.0 + (i % 3) * 0.5, 0, Math.PI * 2); cx.fill()
      }
      // Darker sediment in deeper corners
      cx.fillStyle = 'rgba(18,28,44,0.22)'
      cx.fillRect(0, H * 0.94, W * 0.22, H * 0.06)
      cx.fillRect(W * 0.78, H * 0.94, W * 0.22, H * 0.06)
      // Stones — varied sizes, natural
      const stones = [
        { x: W*0.06, rw: H*0.036, rh: H*0.016 }, { x: W*0.19, rw: H*0.024, rh: H*0.011 },
        { x: W*0.34, rw: H*0.042, rh: H*0.018 }, { x: W*0.52, rw: H*0.028, rh: H*0.013 },
        { x: W*0.70, rw: H*0.038, rh: H*0.017 }, { x: W*0.86, rw: H*0.030, rh: H*0.013 },
        { x: W*0.43, rw: H*0.016, rh: H*0.008 }, { x: W*0.77, rw: H*0.018, rh: H*0.008 },
      ]
      stones.forEach(({ x, rw, rh }) => {
        const ry = H - rh * 0.5
        cx.beginPath(); cx.ellipse(x, ry, rw, rh, 0, 0, Math.PI * 2)
        cx.fillStyle = 'hsla(215,14%,22%,0.70)'; cx.fill()
        // Highlight edge
        cx.beginPath(); cx.ellipse(x - rw*0.16, ry - rh*0.22, rw*0.36, rh*0.32, 0, 0, Math.PI * 2)
        cx.fillStyle = 'hsla(215,12%,36%,0.25)'; cx.fill()
      })
    }

    /* ── Seaweed — clustered, natural sway ──────────────────────────────── */
    const drawSeaweed = () => {
      weeds.forEach(w => {
        cx.save(); cx.translate(w.x, H)
        cx.beginPath(); cx.moveTo(0, 0)
        const segs = 6; let py = 0
        for (let s = 0; s < segs; s++) {
          const sg = w.h / segs
          const k = (s + 1) / segs
          const sw = Math.sin(t * 0.85 * w.spd + w.ph + s * 0.52) * 16 * k
          cx.bezierCurveTo(
            sw * 0.36 + (s % 2 === 0 ?  4 : -4), py - sg * 0.36,
            sw * 0.75 + (s % 2 === 0 ?  7 : -7), py - sg * 0.72,
            sw, py - sg
          )
          py -= sg
        }
        cx.strokeStyle = `hsla(${w.hue},52%,28%,0.85)`
        cx.lineWidth = w.w; cx.lineCap = 'round'; cx.stroke()
        cx.restore()
      })
    }

    /* ── Bubbles — sparse ───────────────────────────────────────────────── */
    const drawBubbles = (dt: number) => {
      bubbles.forEach(b => {
        b.y   -= b.spd * dt * 0.001
        b.ph  += 0.0018 * dt
        b.x   += Math.sin(b.ph) * 0.18
        if (b.y < WL()) { b.y = H * (0.74 + Math.random() * 0.26); b.x = Math.random() * W }
        cx.beginPath(); cx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        cx.strokeStyle = `rgba(160,212,248,${b.a})`; cx.lineWidth = 0.7; cx.stroke()
      })
    }

    /* ── Fish — pike (gädda) + perch (abborre), naturalistic ────────────── */
    const drawFish = (dt: number) => {
      fish.forEach(f => {
        f.x += f.spd * f.dir * dt * 0.001
        f.ph += 0.0022 * dt
        const fy = f.y + Math.sin(f.ph) * 3.0
        if (f.dir === 1  && f.x >  W + f.sz * 2) f.x = -f.sz * 2
        if (f.dir === -1 && f.x < -f.sz * 2)     f.x =  W + f.sz * 2
        cx.save(); cx.translate(f.x, fy)
        if (f.dir === -1) cx.scale(-1, 1)

        if (f.type === 'pike') {
          // Pike — elongated, pointed, green-grey
          const a = f.sz, b2 = f.sz * 0.21
          // Body
          cx.beginPath()
          cx.moveTo(a * 1.2, 0)
          cx.bezierCurveTo(a * 0.7, -b2, -a * 0.5, -b2, -a * 0.9, 0)
          cx.bezierCurveTo(-a * 0.5,  b2,  a * 0.7,  b2,  a * 1.2, 0)
          cx.closePath()
          cx.fillStyle = `hsla(${f.hue},30%,32%,0.82)`; cx.fill()
          // Dark back stripe
          cx.beginPath()
          cx.moveTo(a * 1.0, -b2 * 0.4)
          cx.bezierCurveTo(a * 0.2, -b2 * 1.1, -a * 0.4, -b2 * 1.0, -a * 0.85, -b2 * 0.3)
          cx.strokeStyle = `hsla(${f.hue},22%,18%,0.38)`; cx.lineWidth = b2 * 0.7; cx.stroke()
          // Tail
          cx.beginPath()
          cx.moveTo(-a * 0.88, 0); cx.lineTo(-a * 1.65, -b2 * 1.5); cx.lineTo(-a * 1.65, b2 * 1.5)
          cx.closePath()
          cx.fillStyle = `hsla(${f.hue},25%,26%,0.78)`; cx.fill()
          // Eye — yellow iris
          cx.beginPath(); cx.arc(a * 0.82, -b2 * 0.25, a * 0.085, 0, Math.PI * 2)
          cx.fillStyle = '#d0b830'; cx.fill()
          cx.beginPath(); cx.arc(a * 0.82, -b2 * 0.25, a * 0.042, 0, Math.PI * 2)
          cx.fillStyle = '#050a10'; cx.fill()
        } else if (f.type === 'perch') {
          // Perch — rounder, vertical stripes, orange fins
          const a = f.sz, b2 = f.sz * 0.46
          cx.beginPath(); cx.ellipse(0, 0, a, b2, 0, 0, Math.PI * 2)
          cx.fillStyle = `hsla(${f.hue},40%,35%,0.84)`; cx.fill()
          // Vertical dark stripes (4)
          cx.strokeStyle = `hsla(${f.hue},20%,16%,0.42)`; cx.lineCap = 'round'
          for (let s = 0; s < 4; s++) {
            const sx = a * 0.55 - s * a * 0.36
            const hw = b2 * (0.85 - s * 0.05)
            cx.lineWidth = a * 0.09
            cx.beginPath(); cx.moveTo(sx, -hw); cx.lineTo(sx, hw); cx.stroke()
          }
          // Orange-red dorsal fin hint
          cx.beginPath()
          cx.moveTo(-a*0.15, -b2); cx.lineTo(-a*0.55, -b2*1.55); cx.lineTo(a*0.25, -b2)
          cx.closePath()
          cx.fillStyle = `hsla(18,72%,50%,0.45)`; cx.fill()
          // Tail
          cx.beginPath()
          cx.moveTo(-a*0.88, 0); cx.lineTo(-a*1.52, -b2*1.1); cx.lineTo(-a*1.52, b2*1.1)
          cx.closePath()
          cx.fillStyle = `hsla(${f.hue},34%,28%,0.78)`; cx.fill()
          // Eye
          cx.beginPath(); cx.arc(a*0.52, -b2*0.12, a*0.10, 0, Math.PI * 2)
          cx.fillStyle = '#050a10'; cx.fill()
          cx.beginPath(); cx.arc(a*0.54, -b2*0.15, a*0.040, 0, Math.PI * 2)
          cx.fillStyle = 'rgba(255,255,255,0.62)'; cx.fill()
        } else if (f.type === 'zander') {
          // Gös — slender like pike, golden-green, dark back
          const a = f.sz, b2 = f.sz * 0.24
          cx.beginPath()
          cx.moveTo(a * 1.1, 0)
          cx.bezierCurveTo(a * 0.6, -b2, -a * 0.5, -b2, -a * 0.85, 0)
          cx.bezierCurveTo(-a * 0.5,  b2,  a * 0.6,  b2,  a * 1.1, 0)
          cx.closePath()
          cx.fillStyle = `hsla(${f.hue},28%,34%,0.82)`; cx.fill()
          // Darker back
          cx.beginPath()
          cx.moveTo(a*1.0, -b2*0.3)
          cx.bezierCurveTo(a*0.2, -b2*1.05, -a*0.4, -b2*0.95, -a*0.8, -b2*0.2)
          cx.strokeStyle = `hsla(${f.hue},18%,16%,0.40)`; cx.lineWidth = b2*0.75; cx.stroke()
          // Tail — forked
          cx.beginPath()
          cx.moveTo(-a*0.82, 0); cx.lineTo(-a*1.55, -b2*1.6); cx.lineTo(-a*1.55, b2*1.6)
          cx.closePath()
          cx.fillStyle = `hsla(${f.hue},22%,24%,0.76)`; cx.fill()
          // Eye — glassy
          cx.beginPath(); cx.arc(a*0.76, -b2*0.22, a*0.09, 0, Math.PI*2)
          cx.fillStyle = '#c8c8b0'; cx.fill()
          cx.beginPath(); cx.arc(a*0.76, -b2*0.22, a*0.045, 0, Math.PI*2)
          cx.fillStyle = '#050a10'; cx.fill()
        } else if (f.type === 'bream') {
          // Braxen — deep-bodied, silvery, gold tint
          const a = f.sz * 0.75, b2 = f.sz * 0.52
          cx.beginPath(); cx.ellipse(0, 0, a, b2, 0, 0, Math.PI*2)
          cx.fillStyle = `hsla(${f.hue},30%,54%,0.80)`; cx.fill()
          // Lateral line
          cx.beginPath(); cx.moveTo(a*0.8, -b2*0.05); cx.lineTo(-a*0.5, -b2*0.05)
          cx.strokeStyle = `hsla(${f.hue},18%,38%,0.38)`; cx.lineWidth = 0.8; cx.stroke()
          // Tail
          cx.beginPath()
          cx.moveTo(-a*0.88, 0); cx.lineTo(-a*1.55, -b2*1.2); cx.lineTo(-a*1.55, b2*1.2)
          cx.closePath()
          cx.fillStyle = `hsla(${f.hue},24%,46%,0.74)`; cx.fill()
          // Eye
          cx.beginPath(); cx.arc(a*0.55, -b2*0.10, a*0.10, 0, Math.PI*2)
          cx.fillStyle = '#050a10'; cx.fill()
          cx.beginPath(); cx.arc(a*0.57, -b2*0.13, a*0.038, 0, Math.PI*2)
          cx.fillStyle = 'rgba(255,255,255,0.55)'; cx.fill()
        } else if (f.type === 'cod') {
          // Torsk — stocky, olive-brown, chin barbel
          const a = f.sz * 0.85, b2 = f.sz * 0.38
          cx.beginPath()
          cx.moveTo(a*1.0, 0)
          cx.bezierCurveTo(a*0.5, -b2, -a*0.5, -b2*0.9, -a*0.9, 0)
          cx.bezierCurveTo(-a*0.5,  b2*0.9,  a*0.5,  b2,  a*1.0, 0)
          cx.closePath()
          cx.fillStyle = `hsla(${f.hue},20%,35%,0.82)`; cx.fill()
          // Mottled spots
          for (let sp = 0; sp < 5; sp++) {
            cx.beginPath(); cx.arc(a*(0.5 - sp*0.22), b2*(sp%2===0?0.2:-0.2), a*0.07, 0, Math.PI*2)
            cx.fillStyle = `hsla(${f.hue},14%,22%,0.28)`; cx.fill()
          }
          // Chin barbel
          cx.beginPath(); cx.moveTo(a*0.82, b2*0.45); cx.lineTo(a*0.72, b2*0.90)
          cx.strokeStyle = `hsla(${f.hue},10%,30%,0.55)`; cx.lineWidth = 1.2; cx.stroke()
          // Tail
          cx.beginPath()
          cx.moveTo(-a*0.88, 0); cx.lineTo(-a*1.50, -b2*1.1); cx.lineTo(-a*1.50, b2*1.1)
          cx.closePath()
          cx.fillStyle = `hsla(${f.hue},16%,28%,0.76)`; cx.fill()
          // Eye
          cx.beginPath(); cx.arc(a*0.72, -b2*0.22, a*0.10, 0, Math.PI*2)
          cx.fillStyle = '#ffe090'; cx.fill()
          cx.beginPath(); cx.arc(a*0.72, -b2*0.22, a*0.048, 0, Math.PI*2)
          cx.fillStyle = '#050a10'; cx.fill()
        } else {
          // Sill/herring — small, sleek, silver-blue schooling fish
          const a = f.sz, b2 = f.sz * 0.18
          cx.beginPath()
          cx.moveTo(a*1.15, 0)
          cx.bezierCurveTo(a*0.5, -b2, -a*0.6, -b2*0.8, -a*0.95, 0)
          cx.bezierCurveTo(-a*0.6,  b2*0.8,  a*0.5,  b2,  a*1.15, 0)
          cx.closePath()
          cx.fillStyle = `hsla(${f.hue},55%,64%,0.78)`; cx.fill()
          // Silver belly sheen
          cx.beginPath(); cx.ellipse(a*0.1, 0, a*0.55, b2*0.55, 0, 0, Math.PI*2)
          cx.fillStyle = 'rgba(220,235,255,0.30)'; cx.fill()
          // Forked tail
          cx.beginPath()
          cx.moveTo(-a*0.92, 0); cx.lineTo(-a*1.70, -b2*1.8); cx.lineTo(-a*1.52, 0)
          cx.lineTo(-a*1.70, b2*1.8); cx.closePath()
          cx.fillStyle = `hsla(${f.hue},50%,52%,0.72)`; cx.fill()
          // Eye — tiny
          cx.beginPath(); cx.arc(a*0.88, -b2*0.18, a*0.07, 0, Math.PI*2)
          cx.fillStyle = '#050a10'; cx.fill()
        }
        cx.restore()
      })
    }

    /* ── Waxholmsbolaget-style ferry — white hull, yellow funnel ─────────── */
    const drawFerry = (dt: number) => {
      ferry.x -= ferry.spd * dt * 0.001
      ferry.ph += 0.8 * dt * 0.001
      if (ferry.x < -200) ferry.x = W + 200
      const wy  = wave(ferry.x)
      const bob = Math.sin(ferry.ph * 0.7) * 1.2
      const tilt = Math.sin(ferry.ph * 0.55) * 0.35 * (Math.PI / 180)
      cx.save(); cx.translate(ferry.x, wy + bob); cx.rotate(tilt)
      // Hull
      cx.beginPath()
      cx.moveTo(-62, 0); cx.lineTo(62, 0); cx.lineTo(56, 14); cx.lineTo(-56, 14); cx.closePath()
      cx.fillStyle = 'rgba(244,244,240,0.92)'; cx.fill()
      cx.strokeStyle = 'rgba(150,130,100,0.45)'; cx.lineWidth = 0.8; cx.stroke()
      // Waterline stripe — dark blue
      cx.fillStyle = 'rgba(22,65,130,0.78)'
      cx.fillRect(-55, 10, 110, 4)
      // Main superstructure
      cx.beginPath()
      cx.moveTo(-46, 0); cx.lineTo(-46, -12); cx.lineTo(46, -12); cx.lineTo(46, 0); cx.closePath()
      cx.fillStyle = 'rgba(244,244,240,0.88)'; cx.fill()
      cx.strokeStyle = 'rgba(170,155,130,0.30)'; cx.lineWidth = 0.6; cx.stroke()
      // Upper deck
      cx.beginPath()
      cx.moveTo(-32, -12); cx.lineTo(-32, -20); cx.lineTo(32, -20); cx.lineTo(32, -12); cx.closePath()
      cx.fillStyle = 'rgba(242,242,238,0.85)'; cx.fill()
      // Portholes / windows lower deck
      cx.fillStyle = 'rgba(110,168,210,0.52)'
      for (let i = -3; i <= 3; i++) { if (i === 0) continue
        cx.fillRect(i * 12 - 3, -10, 6, 5)
      }
      // Yellow funnel — Waxholmsbolaget
      cx.beginPath()
      cx.moveTo(-7, -20); cx.lineTo(-9, -33); cx.lineTo(9, -33); cx.lineTo(7, -20); cx.closePath()
      cx.fillStyle = 'rgba(238,192,28,0.92)'; cx.fill()
      // Red band
      cx.fillStyle = 'rgba(185,28,28,0.82)'
      cx.fillRect(-8, -27, 16, 3.5)
      // Smoke
      cx.save()
      const st = t * 0.18
      cx.strokeStyle = 'rgba(200,195,188,0.20)'; cx.lineWidth = 2.4; cx.lineCap = 'round'
      cx.beginPath()
      cx.moveTo(0, -33)
      cx.bezierCurveTo(Math.sin(st)*3, -39, Math.sin(st+0.8)*5, -45, Math.sin(st+1.6)*4, -50)
      cx.stroke()
      cx.restore()
      // Bow wave
      cx.strokeStyle = 'rgba(255,255,255,0.20)'; cx.lineWidth = 1.2
      cx.beginPath(); cx.moveTo(62, 8); cx.lineTo(82, 10); cx.stroke()
      cx.restore()
    }

    /* ── Sailboats — slow, rocking gently ───────────────────────────────── */
    const drawBoats = (dt: number) => {
      boats.forEach(b => {
        b.x -= b.spd * dt * 0.001
        if (b.x < -120) b.x = W + 80 + Math.random() * 300
        const wy   = wave(b.x)
        const bob  = Math.sin(t * 0.60 + b.ph) * 2.2
        const tilt = Math.sin(t * 0.46 + b.ph) * 1.2 * (Math.PI / 180)
        cx.save(); cx.translate(b.x, wy + bob); cx.rotate(tilt)
        drawSailboat()
        cx.restore()
      })
    }

    const drawSailboat = () => {
      cx.beginPath(); cx.moveTo(-20, 6); cx.bezierCurveTo(-42, 8, -68, 9, -88, 7)
      cx.strokeStyle = 'rgba(255,255,255,0.17)'; cx.lineWidth = 1.1; cx.stroke()
      cx.beginPath(); cx.moveTo(-22,8); cx.lineTo(22,8); cx.lineTo(17,0); cx.lineTo(-17,0); cx.closePath()
      cx.fillStyle = '#e0d0a0'; cx.fill()
      cx.beginPath(); cx.moveTo(-17,0); cx.lineTo(17,0); cx.bezierCurveTo(15,-4,-15,-4,-17,0); cx.closePath()
      cx.fillStyle = '#c8aa60'; cx.fill()
      cx.strokeStyle = '#6e4420'; cx.lineWidth = 1.4
      cx.beginPath(); cx.moveTo(0,0); cx.lineTo(0,-44); cx.stroke()
      cx.beginPath(); cx.moveTo(0,-42); cx.lineTo(23,-2); cx.lineTo(0,-2); cx.closePath()
      cx.fillStyle = 'rgba(248,244,232,0.92)'; cx.fill()
      cx.beginPath(); cx.moveTo(0,-26); cx.lineTo(-16,-4); cx.lineTo(0,-4); cx.closePath()
      cx.fillStyle = 'rgba(248,244,232,0.58)'; cx.fill()
      cx.beginPath(); cx.moveTo(0,-44); cx.lineTo(8,-39); cx.lineTo(0,-34); cx.closePath()
      cx.fillStyle = '#d83838'; cx.fill()
    }

    /* ── Three birds — slow lazy glide ─────────────────────────────────── */
    const drawBirds = (dt: number) => {
      birds.forEach(b => {
        b.x    -= b.spd * 0.78 * dt * 0.001   // slower drift
        b.wingT += 1.3 * dt * 0.001             // slower wingbeat
        if (b.x < -25) { b.x = W + 25; b.baseY = H * (0.06 + Math.random() * 0.10) }
        const y = b.baseY + Math.sin(b.wingT * 0.22 + b.ph) * b.amp * 3.5
        const w = 1.8 + Math.abs(Math.sin(b.wingT)) * 5.2   // slightly smaller wing arc
        cx.save(); cx.translate(b.x, y)
        cx.strokeStyle = th.birdColor; cx.lineWidth = 1.2; cx.lineCap = 'round'
        cx.beginPath(); cx.moveTo(0,0); cx.quadraticCurveTo(-8,-w,-16,0); cx.stroke()
        cx.beginPath(); cx.moveTo(0,0); cx.quadraticCurveTo( 8,-w, 16,0); cx.stroke()
        cx.restore()
      })
    }

    /* ── Overlay — slightly reduced mid-section for more light ──────────── */
    const drawOverlay = () => {
      const g = cx.createLinearGradient(0, 0, 0, H)
      const [o0, o1, o2, o3, o4] = th.overlay
      // Scale back the mid-section (o1/o2) slightly for a brighter, airier feel
      g.addColorStop(0,    o0)
      g.addColorStop(0.22, o1)
      g.addColorStop(0.46, o2)
      g.addColorStop(0.68, o3)
      g.addColorStop(1,    o4)
      cx.fillStyle = g; cx.fillRect(0, 0, W, H)
      // Soft vignette on sides only — increases depth without darkening sky
      const vl = cx.createLinearGradient(0, 0, W * 0.18, 0)
      vl.addColorStop(0, 'rgba(5,15,28,0.18)'); vl.addColorStop(1, 'rgba(5,15,28,0)')
      cx.fillStyle = vl; cx.fillRect(0, 0, W * 0.18, H)
      const vr = cx.createLinearGradient(W, 0, W * 0.82, 0)
      vr.addColorStop(0, 'rgba(5,15,28,0.18)'); vr.addColorStop(1, 'rgba(5,15,28,0)')
      cx.fillStyle = vr; cx.fillRect(W * 0.82, 0, W * 0.18, H)
    }

    /* ═══════════════════════════════════════════════════════════════════════
       MAIN LOOP
    ════════════════════════════════════════════════════════════════════════ */
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50)
      last = now; t += dt * 0.001

      drawSky()
      drawSun()
      drawFarIslands()
      drawNearIslands()
      drawWater()
      drawWaterShimmer()
      drawFerry(dt)
      drawBoats(dt)
      drawUnderwater()
      drawSeabedRocks()
      drawSeaweed()
      drawParticles()
      drawBubbles(dt)
      drawFish(dt)
      drawOverlay()
      drawBirds(dt)

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(n => { last = n; tick(n) })
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [variant])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        display: 'block', pointerEvents: 'none',
      }}
    />
  )
}
