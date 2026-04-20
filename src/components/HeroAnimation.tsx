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
    // Klar sommardag — dämpat Skandinaviskt blå
    sky:          ['#3d94d4','#60aee0','#92c8f0','#b0dcf2'],
    sunX: 0.73,   sunY: 0.092, sunR: 0.034,
    sunInner:     '#fffee0', sunOuter: '#ffe070',
    glowA: 0.48,  glowColor: '255,225,90',
    water:        ['#2488c0','#186aa8','#104e84','#082848'],
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
    water:        ['#182858','#102048','#0c1a38','#060e22'],
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
    water:        ['#253c48','#1c2e3a','#14202c','#0a121c'],
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
interface Fish   { x: number; y: number; spd: number; dir: 1|-1; sz: number; ph: number; hue: number }
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
    let raf = 0, last = 0, t = 0, ms = 0
    let boats: Boat[] = [], birds: Bird[] = [], fish: Fish[] = []
    let weeds: Weed[] = [], bubbles: Bubble[] = []
    let dolX = 0, dolPh = 0, dolOn = false, nextDol = 0

    /* ── Layout ─────────────────────────────────────────────────────────── */
    const WL = () => H * 0.52

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
      // Two sailboats only — slow, secondary
      boats = [
        { x: W * 1.15, spd: 7, type: 'sail', ph: 0 },
        { x: W * 1.70, spd: 6, type: 'sail', ph: 1.8 },
      ]
      // Three birds, slow and gliding
      birds = Array.from({ length: 3 }, (_, i) => ({
        x:     W * (0.08 + i * 0.34) + rnd() * 60,
        baseY: H * (0.07 + i * 0.030 + rnd() * 0.012),
        spd:   11 + rnd() * 9,
        wingT: rnd() * Math.PI * 2,
        amp:   H * (0.004 + rnd() * 0.003),
        ph:    rnd() * Math.PI * 2,
      }))
      // Four fish — varied sizes, deeper water, not evenly spread
      fish = Array.from({ length: 4 }, (_, i) => {
        const dir = i % 2 === 0 ? 1 : -1 as 1|-1
        return {
          x: rnd() * W,
          y: H * (0.66 + rnd() * 0.26),
          spd: 6 + rnd() * 16, dir,
          sz: 9 + rnd() * 18, ph: rnd() * Math.PI * 2,
          hue: 170 + rnd() * 50,
        }
      })
      // Seaweed — clustered in two zones near islands, not evenly spread
      weeds = [
        ...Array.from({ length: 7 }, (_, i) => ({
          x: W * (0.02 + i * 0.034) + (rnd() - 0.5) * W * 0.014,
          h: H * (0.052 + rnd() * 0.068),
          ph: rnd() * Math.PI * 2, hue: 100 + rnd() * 38, w: 3.0 + rnd() * 3.8,
          spd: 0.40 + rnd() * 0.70,
        })),
        ...Array.from({ length: 7 }, (_, i) => ({
          x: W * (0.52 + i * 0.040) + (rnd() - 0.5) * W * 0.014,
          h: H * (0.048 + rnd() * 0.062),
          ph: rnd() * Math.PI * 2, hue: 98 + rnd() * 38, w: 2.8 + rnd() * 3.6,
          spd: 0.40 + rnd() * 0.70,
        })),
      ]
      // Eight bubbles — sparse
      bubbles = Array.from({ length: 8 }, () => ({
        x: rnd() * W, y: H * (0.68 + rnd() * 0.32),
        r: 0.7 + rnd() * 2.0, spd: 2.0 + rnd() * 4.5,
        ph: rnd() * Math.PI * 2, a: 0.08 + rnd() * 0.18,
      }))
      dolX = W + 80; dolOn = false; nextDol = ms + 12000
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

    const drawSky = () => {
      const g = cx.createLinearGradient(0, 0, 0, H * 0.52)
      const [s0, s1, s2, s3] = th.sky
      g.addColorStop(0, s0); g.addColorStop(0.35, s1)
      g.addColorStop(0.75, s2); g.addColorStop(1, s3)
      cx.fillStyle = g; cx.fillRect(0, 0, W, H * 0.52)
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
      // Low flat skärgård silhouettes
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

    /* ── Near islands — one coherent bay scene ───────────────────────────── */
    const drawNearIslands = () => {
      const wb = WL()
      cx.save()

      // ── LEFT ISLAND — the settlement ─────────────────────────────────────
      // Green mass — flatter, broader
      cx.beginPath()
      cx.moveTo(-6, wb)
      cx.bezierCurveTo(W*0.01, H*0.380, W*0.072, H*0.352, W*0.148, H*0.382)
      cx.bezierCurveTo(W*0.205, H*0.408, W*0.248, H*0.472, W*0.265, wb)
      cx.lineTo(-6, wb); cx.closePath()
      cx.fillStyle = th.islandGreen; cx.fill()

      // Granite rock face along lower left shore
      cx.beginPath()
      cx.moveTo(-6, wb)
      cx.lineTo(-6, H*0.462)
      cx.bezierCurveTo(W*0.012, H*0.418, W*0.040, H*0.408, W*0.062, H*0.440)
      cx.lineTo(W*0.072, wb)
      cx.fillStyle = th.rockColor; cx.fill()

      // Subtle granite strata lines
      cx.strokeStyle = 'rgba(155,148,135,0.12)'; cx.lineWidth = 0.8
      for (let l = 0; l < 3; l++) {
        const ly = wb * (0.956 + l * 0.013)
        cx.beginPath()
        cx.moveTo(-4, ly)
        cx.bezierCurveTo(W*0.018, ly - H*0.002, W*0.038, ly + H*0.002, W*0.065, ly)
        cx.stroke()
      }
      cx.fillStyle = 'rgba(195,188,175,0.16)'
      for (let i = 0; i < 5; i++) cx.fillRect(W*(0.012 + i*0.009), H*0.432, 2, 2)

      // Pines — 3, clustered left-center
      pine(W*0.06,  wb * 0.958, H * 0.058)
      pine(W*0.10,  wb * 0.928, H * 0.064)
      pine(W*0.162, wb * 0.920, H * 0.058)

      // Two cottages grouped — a small hamlet near shore
      cottage(W * 0.098, wb * 0.950, true)
      cottage(W * 0.148, wb * 0.948, false)

      // Dock
      dock(W * 0.230, wb)


      // ── RIGHT ISLAND — rocky framing ────────────────────────────────────
      // Green mass — lower profile than before
      cx.beginPath()
      cx.moveTo(W*0.505, wb)
      cx.bezierCurveTo(W*0.525, H*0.380, W*0.598, H*0.338, W*0.688, H*0.382)
      cx.bezierCurveTo(W*0.748, H*0.418, W*0.788, H*0.482, W*0.802, wb)
      cx.lineTo(W*0.505, wb); cx.closePath()
      cx.fillStyle = th.islandGreen; cx.fill()

      // Rocky extension — smooth, curves off right edge
      cx.beginPath()
      cx.moveTo(W*0.792, wb)
      cx.bezierCurveTo(W*0.822, H*0.448, W*0.878, H*0.436, W*0.928, H*0.464)
      cx.bezierCurveTo(W*0.956, H*0.458, W*0.982, H*0.454, W+8, H*0.456)
      cx.lineTo(W+8, wb)
      cx.fillStyle = th.rockColor; cx.fill()

      // Granite speckle on right shore
      cx.fillStyle = 'rgba(195,188,175,0.16)'
      for (let i = 0; i < 6; i++) cx.fillRect(W*(0.810 + i*0.010), H*0.462, 2, 2)

      // Subtle strata lines on right rocky shore
      cx.strokeStyle = 'rgba(155,148,135,0.10)'; cx.lineWidth = 0.8
      for (let l = 0; l < 2; l++) {
        const ly = wb * (0.962 + l * 0.014)
        cx.beginPath()
        cx.moveTo(W*0.800, ly)
        cx.bezierCurveTo(W*0.840, ly - H*0.002, W*0.880, ly + H*0.002, W*0.930, ly)
        cx.stroke()
      }

      // Two pines — sparse
      pine(W*0.572, wb * 0.918, H * 0.055)
      pine(W*0.640, wb * 0.905, H * 0.060)

      // Cottage + boathouse
      cottage(W * 0.660, wb * 0.938)
      boathouse(W * 0.520, wb)

      // ── Small mid skerry — low, subtle ───────────────────────────────────
      cx.beginPath()
      cx.moveTo(W*0.338, wb)
      cx.bezierCurveTo(W*0.344, H*0.490, W*0.360, H*0.476, W*0.380, H*0.482)
      cx.bezierCurveTo(W*0.395, H*0.488, W*0.406, H*0.491, W*0.413, wb)
      cx.fillStyle = th.rockColor; cx.fill()
      cx.fillStyle = 'rgba(195,188,175,0.20)'
      for (let i = 0; i < 3; i++) cx.fillRect(W*(0.350 + i*0.014), H*0.484, 2, 2)

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
      const wg = cx.createLinearGradient(0, WL() - 6, 0, H)
      wg.addColorStop(0, w0); wg.addColorStop(0.16, w1)
      wg.addColorStop(0.52, w2); wg.addColorStop(1, w3)
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

      // Elongated shimmer column aligned with sun
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

      // Small surface sparkles — scattered around shimmer column
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

    /* ── Bobbing buoy ───────────────────────────────────────────────────── */
    const drawBuoy = () => {
      const bx = W * 0.42
      const bob = Math.sin(t * 0.80) * H * 0.0025
      const by  = wave(bx) - H * 0.011 + bob
      cx.save(); cx.translate(bx, by)
      const bw = H * 0.0072, bh = H * 0.019

      // Mooring chain
      cx.strokeStyle = 'rgba(85,68,45,0.38)'; cx.lineWidth = 0.9
      cx.beginPath(); cx.moveTo(0, bh); cx.bezierCurveTo(3, bh+H*0.016, 5, H*0.030, 4, H*0.050); cx.stroke()

      // Cylindrical body
      cx.beginPath()
      cx.moveTo(-bw, bh)
      cx.bezierCurveTo(-bw, bh+1, bw, bh+1, bw, bh)
      cx.lineTo(bw, -bh*0.52)
      cx.bezierCurveTo(bw, -bh*0.68, -bw, -bh*0.68, -bw, -bh*0.52)
      cx.closePath()
      cx.fillStyle = '#b82c1e'; cx.fill()
      cx.strokeStyle = 'rgba(165,38,26,0.55)'; cx.lineWidth = 0.7; cx.stroke()

      // White band
      cx.fillStyle = 'rgba(235,228,210,0.85)'
      cx.fillRect(-bw, -bh*0.08, bw*2, bh*0.20)

      // Conical top
      cx.beginPath()
      cx.moveTo(-bw, -bh*0.52)
      cx.lineTo(0, -bh*1.15)
      cx.lineTo(bw, -bh*0.52)
      cx.closePath()
      cx.fillStyle = '#b82c1e'; cx.fill()

      // Pole + pulsing light
      cx.strokeStyle = '#c8b878'; cx.lineWidth = 1.1
      cx.beginPath(); cx.moveTo(0, -bh*1.15); cx.lineTo(0, -bh*1.80); cx.stroke()
      const pulse = (Math.sin(ms * 0.0020) + 1) * 0.5
      cx.fillStyle = `rgba(255,252,90,${0.45 + pulse * 0.55})`
      cx.beginPath(); cx.arc(0, -bh*1.80, 1.7, 0, Math.PI * 2); cx.fill()

      cx.restore()
    }

    /* ── Underwater atmosphere — calm, minimal ──────────────────────────── */
    const drawUnderwater = () => {
      const wb = WL()
      const dg = cx.createLinearGradient(0, wb, 0, H)
      dg.addColorStop(0,    `${th.seabedTint}0)`)
      dg.addColorStop(0.32, `${th.seabedTint}0.12)`)
      dg.addColorStop(1,    `${th.seabedTint}0.50)`)
      cx.fillStyle = dg; cx.fillRect(0, wb, W, H - wb)
      // Three subtle light rays
      for (let i = 0; i < 3; i++) {
        const rx = W * (0.15 + i * 0.28) + Math.sin(t * 0.12 + i * 1.1) * 10
        cx.save(); cx.translate(rx, wb); cx.rotate(-0.04 + i * 0.025)
        const rg = cx.createLinearGradient(0, 0, 0, H * 0.28)
        const a = 0.055 + Math.sin(t * 0.32 + i) * 0.022
        rg.addColorStop(0, `rgba(${th.underwaterRay},${a})`)
        rg.addColorStop(1, `rgba(${th.underwaterRay},0)`)
        cx.fillStyle = rg
        cx.beginPath(); cx.moveTo(-6, 0); cx.lineTo(6, 0)
        cx.lineTo(15, H*0.28); cx.lineTo(-15, H*0.28); cx.closePath(); cx.fill()
        cx.restore()
      }
    }

    /* ── Seabed rocks ───────────────────────────────────────────────────── */
    const drawSeabedRocks = () => {
      const rdata = [
        { x: W*0.08, rw: H*0.036, rh: H*0.018 }, { x: W*0.22, rw: H*0.026, rh: H*0.014 },
        { x: W*0.38, rw: H*0.042, rh: H*0.022 }, { x: W*0.55, rw: H*0.028, rh: H*0.015 },
        { x: W*0.70, rw: H*0.038, rh: H*0.020 }, { x: W*0.88, rw: H*0.032, rh: H*0.016 },
      ]
      rdata.forEach(({ x, rw, rh }) => {
        const ry = H - rh * 0.5
        cx.beginPath(); cx.ellipse(x, ry, rw, rh, 0, 0, Math.PI * 2)
        cx.fillStyle = 'hsla(215,14%,25%,0.65)'; cx.fill()
        cx.beginPath(); cx.ellipse(x - rw*0.14, ry - rh*0.20, rw*0.40, rh*0.36, 0, 0, Math.PI * 2)
        cx.fillStyle = 'hsla(215,12%,34%,0.32)'; cx.fill()
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
        if (b.y < WL()) { b.y = H * (0.72 + Math.random() * 0.28); b.x = Math.random() * W }
        cx.beginPath(); cx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        cx.strokeStyle = `rgba(160,212,248,${b.a})`; cx.lineWidth = 0.7; cx.stroke()
      })
    }

    /* ── Fish — 4 naturalistic, varied sizes ────────────────────────────── */
    const drawFish = (dt: number) => {
      fish.forEach(f => {
        f.x += f.spd * f.dir * dt * 0.001
        f.ph += 0.0024 * dt
        const fy = f.y + Math.sin(f.ph) * 3.5
        if (f.dir === 1  && f.x >  W + f.sz * 2) f.x = -f.sz * 2
        if (f.dir === -1 && f.x < -f.sz * 2)     f.x =  W + f.sz * 2
        cx.save(); cx.translate(f.x, fy)
        if (f.dir === -1) cx.scale(-1, 1)
        const a = f.sz, b2 = f.sz * 0.40
        cx.beginPath(); cx.ellipse(0, 0, a, b2, 0, 0, Math.PI * 2)
        cx.fillStyle = `hsla(${f.hue},44%,40%,0.78)`; cx.fill()
        cx.beginPath()
        cx.moveTo(-a*0.86, 0); cx.lineTo(-a*1.68, -b2*1.0); cx.lineTo(-a*1.68, b2*1.0); cx.closePath()
        cx.fillStyle = `hsla(${f.hue},38%,32%,0.76)`; cx.fill()
        cx.beginPath(); cx.arc(a*0.52, -b2*0.12, a*0.095, 0, Math.PI * 2)
        cx.fillStyle = '#060e1a'; cx.fill()
        cx.beginPath(); cx.arc(a*0.54, -b2*0.15, a*0.038, 0, Math.PI * 2)
        cx.fillStyle = 'rgba(255,255,255,0.65)'; cx.fill()
        cx.restore()
      })
    }

    /* ── Harbour porpoise (tumlare) — underwater, slow ──────────────────── */
    const drawPorpoise = (x: number, y: number, scale: number, ph: number) => {
      cx.save(); cx.translate(x, y); cx.scale(scale, scale)
      const bodyAngle = Math.sin(ph * 1.8) * 0.055
      cx.rotate(bodyAngle)

      // Squat body — dark dorsal, no beak
      cx.beginPath()
      cx.moveTo(26, 0)
      cx.bezierCurveTo(28, -8, 10, -11, 0, -11)
      cx.bezierCurveTo(-14, -11, -26, -7, -28, 0)
      cx.bezierCurveTo(-26, 7, -14, 10, 0, 10)
      cx.bezierCurveTo(10, 10, 28, 8, 26, 0)
      cx.closePath()
      cx.fillStyle = 'rgba(28,40,55,0.80)'; cx.fill()

      // White belly
      cx.beginPath()
      cx.ellipse(4, 5, 15, 5.2, 0.10, 0, Math.PI * 2)
      cx.fillStyle = 'rgba(210,225,232,0.68)'; cx.fill()

      // Short triangular dorsal fin
      cx.beginPath()
      cx.moveTo(-2, -11); cx.lineTo(5, -21); cx.lineTo(12, -11); cx.closePath()
      cx.fillStyle = 'rgba(20,32,48,0.82)'; cx.fill()

      // Tail fluke
      const tailWag = Math.sin(ph * 1.8 + 0.5) * 0.16
      cx.save(); cx.translate(-28, 0); cx.rotate(tailWag)
      cx.beginPath()
      cx.moveTo(0, 0)
      cx.bezierCurveTo(-5, -3, -12, -2, -14, -7)
      cx.bezierCurveTo(-12, -2, -5, 0, 0, 0)
      cx.bezierCurveTo(-5, 3, -12, 2, -14, 7)
      cx.bezierCurveTo(-12, 2, -5, 3, 0, 0)
      cx.fillStyle = 'rgba(20,32,48,0.80)'; cx.fill()
      cx.restore()

      // Pectoral fin
      cx.beginPath()
      cx.moveTo(10, 4); cx.bezierCurveTo(5, 8, -2, 12, -5, 10); cx.bezierCurveTo(-2, 8, 5, 5, 10, 4)
      cx.fillStyle = 'rgba(20,32,48,0.72)'; cx.fill()

      // Eye
      cx.beginPath(); cx.arc(20, -3, 1.5, 0, Math.PI * 2); cx.fillStyle = '#03080e'; cx.fill()
      cx.beginPath(); cx.arc(20.5, -3.4, 0.48, 0, Math.PI * 2); cx.fillStyle = 'rgba(255,255,255,0.55)'; cx.fill()

      cx.restore()
    }

    const drawDolphin = (dt: number) => {
      if (!dolOn) return
      dolX  -= 15 * dt * 0.001
      dolPh += 1.3 * dt * 0.001
      const dy = WL() + H * 0.070 + Math.sin(dolPh * 1.2) * H * 0.009
      if (dolX < -150) { dolOn = false; nextDol = ms + 30000 + Math.random() * 20000 }
      // Calf
      drawPorpoise(dolX + 50 + Math.sin(dolPh + 0.9) * 3, dy + H * 0.024, 0.56, dolPh + 0.4)
      // Adult
      drawPorpoise(dolX, dy, 1.0, dolPh)
    }

    /* ── Two sailboats — slow, rocking gently ───────────────────────────── */
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
      // Wake
      cx.beginPath(); cx.moveTo(-20, 6); cx.bezierCurveTo(-42, 8, -68, 9, -88, 7)
      cx.strokeStyle = 'rgba(255,255,255,0.17)'; cx.lineWidth = 1.1; cx.stroke()
      // Hull
      cx.beginPath(); cx.moveTo(-22,8); cx.lineTo(22,8); cx.lineTo(17,0); cx.lineTo(-17,0); cx.closePath()
      cx.fillStyle = '#e0d0a0'; cx.fill()
      cx.beginPath(); cx.moveTo(-17,0); cx.lineTo(17,0); cx.bezierCurveTo(15,-4,-15,-4,-17,0); cx.closePath()
      cx.fillStyle = '#c8aa60'; cx.fill()
      // Mast
      cx.strokeStyle = '#6e4420'; cx.lineWidth = 1.4
      cx.beginPath(); cx.moveTo(0,0); cx.lineTo(0,-44); cx.stroke()
      // Main sail
      cx.beginPath(); cx.moveTo(0,-42); cx.lineTo(23,-2); cx.lineTo(0,-2); cx.closePath()
      cx.fillStyle = 'rgba(248,244,232,0.92)'; cx.fill()
      // Jib
      cx.beginPath(); cx.moveTo(0,-26); cx.lineTo(-16,-4); cx.lineTo(0,-4); cx.closePath()
      cx.fillStyle = 'rgba(248,244,232,0.58)'; cx.fill()
      // Burgee
      cx.beginPath(); cx.moveTo(0,-44); cx.lineTo(8,-39); cx.lineTo(0,-34); cx.closePath()
      cx.fillStyle = '#d83838'; cx.fill()
    }

    /* ── Three birds — slow glide ───────────────────────────────────────── */
    const drawBirds = (dt: number) => {
      birds.forEach(b => {
        b.x    -= b.spd * dt * 0.001
        b.wingT += 1.8 * dt * 0.001
        if (b.x < -25) { b.x = W + 25; b.baseY = H * (0.06 + Math.random() * 0.10) }
        const y = b.baseY + Math.sin(b.wingT * 0.26 + b.ph) * b.amp * 3.8
        // Wings always arc upward — no flip
        const w = 2.2 + Math.abs(Math.sin(b.wingT)) * 6.0
        cx.save(); cx.translate(b.x, y)
        cx.strokeStyle = th.birdColor; cx.lineWidth = 1.3; cx.lineCap = 'round'
        cx.beginPath(); cx.moveTo(0,0); cx.quadraticCurveTo(-8,-w,-16,0); cx.stroke()
        cx.beginPath(); cx.moveTo(0,0); cx.quadraticCurveTo( 8,-w, 16,0); cx.stroke()
        cx.restore()
      })
    }

    /* ── Overlay ─────────────────────────────────────────────────────────── */
    const drawOverlay = () => {
      const g = cx.createLinearGradient(0, 0, 0, H)
      const [o0, o1, o2, o3, o4] = th.overlay
      g.addColorStop(0, o0); g.addColorStop(0.20, o1)
      g.addColorStop(0.45, o2); g.addColorStop(0.65, o3); g.addColorStop(1, o4)
      cx.fillStyle = g; cx.fillRect(0, 0, W, H)
    }

    /* ═══════════════════════════════════════════════════════════════════════
       MAIN LOOP
    ════════════════════════════════════════════════════════════════════════ */
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50)
      last = now; ms += dt; t += dt * 0.001

      if (!dolOn && ms > nextDol) { dolOn = true; dolX = W + 80; dolPh = 0 }

      drawSky()
      drawSun()
      drawFarIslands()
      drawWater()
      drawWaterShimmer()
      drawNearIslands()
      drawBuoy()
      drawBoats(dt)
      drawUnderwater()
      drawSeabedRocks()
      drawSeaweed()
      drawBubbles(dt)
      drawFish(dt)
      drawDolphin(dt)
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
