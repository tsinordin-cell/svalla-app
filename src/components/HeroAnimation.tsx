'use client'
import { useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────────────────────────────────────
   HeroAnimation — Svensk skärgård, canvas + requestAnimationFrame
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
}

const THEMES: Record<HeroVariant, Theme> = {
  1: {
    sky:          ['#4ca8e8','#72c2f5','#a8daf8','#c2e8f5'],
    sunX: 0.73,   sunY: 0.092, sunR: 0.036,
    sunInner:     '#fffee0', sunOuter: '#ffe070',
    glowA: 0.55,  glowColor: '255,225,90',
    water:        ['#2e9fd8','#1e7db8','#145a90','#0a2e58'],
    waterHighlight:'rgba(255,255,255,0.24)',
    farIsland:    'rgba(122,150,168,0.50)',
    islandGreen:  '#5a8850',
    rockColor:    '#788068',
    pineTrunk:    '#5c3820', pineBody: '#285a28', pineTop: '#367038',
    overlay:      ['rgba(5,20,40,0.06)','rgba(5,20,40,0.18)','rgba(5,20,40,0.26)','rgba(5,20,40,0.15)','rgba(5,20,40,0.08)'],
    waveSpeed: 1.0, waveAmp: 1.0,
    birdColor:    'rgba(52,78,95,0.82)',
    underwaterRay:'120,200,248',
    seabedTint:   'rgba(4,18,48,',
  },
  2: {
    sky:          ['#d45e20','#e8904a','#f5bc72','#fde4b8'],
    sunX: 0.78,   sunY: 0.42, sunR: 0.058,
    sunInner:     '#fff0a0', sunOuter: '#ffb040',
    glowA: 0.70,  glowColor: '255,160,40',
    water:        ['#b86830','#904820','#6a2e14','#3e1408'],
    waterHighlight:'rgba(255,200,100,0.28)',
    farIsland:    'rgba(140,80,50,0.55)',
    islandGreen:  '#6a7840',
    rockColor:    '#887058',
    pineTrunk:    '#5a3010', pineBody: '#3a5010', pineTop: '#4a6818',
    overlay:      ['rgba(40,10,0,0.04)','rgba(40,10,0,0.16)','rgba(40,10,0,0.28)','rgba(40,10,0,0.18)','rgba(40,10,0,0.10)'],
    waveSpeed: 0.75, waveAmp: 0.85,
    birdColor:    'rgba(80,40,15,0.80)',
    underwaterRay:'220,140,60',
    seabedTint:   'rgba(40,12,4,',
  },
  3: {
    sky:          ['#1a1248','#2e2278','#5a48a8','#9080c8'],
    sunX: 0.60,   sunY: 0.50, sunR: 0.050,
    sunInner:     '#fffce0', sunOuter: '#ffd080',
    glowA: 0.45,  glowColor: '255,210,100',
    water:        ['#182858','#102048','#0c1a38','#060e22'],
    waterHighlight:'rgba(160,170,255,0.20)',
    farIsland:    'rgba(60,50,90,0.60)',
    islandGreen:  '#284858',
    rockColor:    '#384860',
    pineTrunk:    '#1e1a2e', pineBody: '#1a2e38', pineTop: '#243848',
    overlay:      ['rgba(10,5,30,0.12)','rgba(10,5,30,0.28)','rgba(10,5,30,0.38)','rgba(10,5,30,0.24)','rgba(10,5,30,0.15)'],
    waveSpeed: 0.55, waveAmp: 0.70,
    birdColor:    'rgba(130,120,200,0.70)',
    underwaterRay:'80,100,200',
    seabedTint:   'rgba(5,5,25,',
  },
  4: {
    sky:          ['#282e30','#3a4a52','#526070','#687885'],
    sunX: 0.20,   sunY: 0.18, sunR: 0.026,
    sunInner:     'rgba(220,220,200,0.6)', sunOuter: 'rgba(180,180,160,0.3)',
    glowA: 0.20,  glowColor: '200,210,200',
    water:        ['#253c48','#1c2e3a','#14202c','#0a121c'],
    waterHighlight:'rgba(180,210,230,0.18)',
    farIsland:    'rgba(60,75,80,0.65)',
    islandGreen:  '#3a5040',
    rockColor:    '#4a5850',
    pineTrunk:    '#2a2018', pineBody: '#1e3028', pineTop: '#283c30',
    overlay:      ['rgba(5,12,18,0.18)','rgba(5,12,18,0.32)','rgba(5,12,18,0.42)','rgba(5,12,18,0.30)','rgba(5,12,18,0.20)'],
    waveSpeed: 1.65, waveAmp: 1.55,
    birdColor:    'rgba(40,55,65,0.88)',
    underwaterRay:'60,90,110',
    seabedTint:   'rgba(4,10,18,',
  },
  5: {
    sky:          ['#b8ccd8','#ccdce8','#deeaf2','#edf4f8'],
    sunX: 0.50,   sunY: 0.32, sunR: 0.068,
    sunInner:     'rgba(255,250,240,0.9)', sunOuter: 'rgba(220,230,240,0.5)',
    glowA: 0.90,  glowColor: '220,235,248',
    water:        ['#8aaec0','#6890a4','#4a7088','#2e5068'],
    waterHighlight:'rgba(255,255,255,0.18)',
    farIsland:    'rgba(140,160,172,0.45)',
    islandGreen:  '#6a8878',
    rockColor:    '#788488',
    pineTrunk:    '#4a3c38', pineBody: '#3c5048', pineTop: '#4e6258',
    overlay:      ['rgba(180,200,215,0.28)','rgba(180,200,215,0.42)','rgba(160,185,205,0.50)','rgba(180,200,215,0.40)','rgba(180,200,215,0.30)'],
    waveSpeed: 0.45, waveAmp: 0.55,
    birdColor:    'rgba(80,100,115,0.65)',
    underwaterRay:'160,190,210',
    seabedTint:   'rgba(20,40,58,',
  },
}

type BoatType = 'sail' | 'motor'
interface Boat    { x: number; spd: number; type: BoatType; ph: number }
interface Bird    { x: number; baseY: number; spd: number; wingT: number; amp: number; ph: number }
interface Fish    { x: number; y: number; spd: number; dir: 1|-1; sz: number; ph: number; hue: number }
interface Weed    { x: number; h: number; ph: number; hue: number; w: number; spd: number }
interface Bubble  { x: number; y: number; r: number; spd: number; ph: number; a: number }
interface Herring { x: number; y: number; ph: number }

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
    let weeds: Weed[] = [], bubbles: Bubble[] = [], herring: Herring[] = []
    let dolX = 0, dolPh = 0, dolOn = false, nextDol = 0
    let ferryX = 0
    let diverX = 0, diverY = 0, diverOn = false, nextDiver = 0, diverDir: 1|-1 = -1
    let herringCx = 0, herringCy = 0, herringDir: 1|-1 = 1, herringSpd = 8

    /* ── Layout ─────────────────────────────────────────────────────────── */
    const WL = () => H * 0.52

    /* ── Multi-sine wave ────────────────────────────────────────────────── */
    const wave = (x: number): number => {
      const b  = WL()
      const ws = th.waveSpeed
      const wa = th.waveAmp
      const swell  = Math.sin(x * 0.0022 + t * 0.18 * ws) * H * 0.014 * wa
      const mid    = Math.sin(x * 0.0058 - t * 0.32 * ws + 1.2) * H * 0.006 * wa
      const ripple = Math.sin(x * 0.0145 + t * 0.62 * ws + 2.5) * H * 0.003 * wa
      return b + swell + mid + ripple
    }

    /* ── Scene init ─────────────────────────────────────────────────────── */
    const init = () => {
      const rnd = Math.random
      boats = [
        { x: W * 1.1,  spd: 13, type: 'sail',  ph: 0 },
        { x: W * 1.55, spd: 9,  type: 'motor', ph: Math.PI },
        { x: W * 1.9,  spd: 11, type: 'sail',  ph: 1.8 },
      ]
      birds = Array.from({ length: 5 }, (_, i) => ({
        x:     W * (0.05 + i * 0.20) + rnd() * 80,
        baseY: H * (0.06 + i * 0.022 + rnd() * 0.015),
        spd:   20 + rnd() * 14,
        wingT: rnd() * Math.PI * 2,
        amp:   H * (0.005 + rnd() * 0.004),
        ph:    rnd() * Math.PI * 2,
      }))
      fish = Array.from({ length: 11 }, () => {
        const dir = rnd() > 0.5 ? 1 : -1 as 1|-1
        return {
          x: rnd() * W, y: H * (0.60 + rnd() * 0.32),
          spd: 10 + rnd() * 30, dir,
          sz: 6 + rnd() * 14, ph: rnd() * Math.PI * 2,
          hue: 120 + rnd() * 80,  // Nordic teal/blue-green
        }
      })
      weeds = Array.from({ length: 26 }, (_, i) => ({
        x: (i / 26 + (rnd() - 0.5) * 0.025) * W,
        h: H * (0.048 + rnd() * 0.072),
        ph: rnd() * Math.PI * 2, hue: 98 + rnd() * 42, w: 3.5 + rnd() * 4.5,
        spd: 0.55 + rnd() * 0.90,  // per-weed sway speed
      }))
      bubbles = Array.from({ length: 20 }, () => ({
        x: rnd() * W, y: H * (0.65 + rnd() * 0.35),
        r: 0.8 + rnd() * 2.8, spd: 3 + rnd() * 7,
        ph: rnd() * Math.PI * 2, a: 0.14 + rnd() * 0.32,
      }))
      herring = Array.from({ length: 22 }, () => ({
        x: (rnd() - 0.5) * W * 0.10,
        y: (rnd() - 0.5) * H * 0.07,
        ph: rnd() * Math.PI * 2,
      }))
      herringCx = W * 0.50; herringCy = H * 0.68
      herringDir = 1; herringSpd = 8 + rnd() * 4
      dolX = W + 80; dolOn = false; nextDol = ms + 10000
      ferryX = W + 220 + rnd() * 180
      diverOn = false; nextDiver = ms + 22000 + rnd() * 20000
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
      const g = cx.createLinearGradient(0, 0, 0, H * 0.57)
      const [s0, s1, s2, s3] = th.sky
      g.addColorStop(0, s0); g.addColorStop(0.35, s1)
      g.addColorStop(0.75, s2); g.addColorStop(1, s3)
      cx.fillStyle = g; cx.fillRect(0, 0, W, H * 0.57)
    }

    const drawSun = () => {
      const sx = W * th.sunX, sy = H * th.sunY, sr = H * th.sunR
      const glow = cx.createRadialGradient(sx, sy, 0, sx, sy, sr * 7)
      glow.addColorStop(0,   `rgba(${th.glowColor},${th.glowA})`)
      glow.addColorStop(0.4, `rgba(${th.glowColor},${(th.glowA * 0.4).toFixed(2)})`)
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
      cx.bezierCurveTo(W*0.02, H*0.30, W*0.09, H*0.265, W*0.175, H*0.315)
      cx.bezierCurveTo(W*0.23, H*0.35, W*0.27, H*0.42, W*0.30, H*0.445)
      cx.lineTo(0, H * 0.445); cx.fill()
      cx.beginPath()
      cx.moveTo(W*0.37, H*0.445)
      cx.bezierCurveTo(W*0.40, H*0.265, W*0.52, H*0.215, W*0.63, H*0.295)
      cx.bezierCurveTo(W*0.70, H*0.34, W*0.745, H*0.415, W*0.76, H*0.445)
      cx.lineTo(W*0.37, H*0.445); cx.fill()
      cx.beginPath()
      cx.moveTo(W*0.83, H*0.445)
      cx.bezierCurveTo(W*0.85, H*0.295, W*0.94, H*0.275, W, H*0.325)
      cx.lineTo(W, H * 0.445); cx.fill()
    }

    /* ── Archipelago ferry ───────────────────────────────────────────────── */
    const drawFerry = (dt: number) => {
      ferryX -= 3.6 * dt * 0.001
      if (ferryX < W * 0.18) ferryX = W * 0.58 + Math.random() * W * 0.25

      const fy = H * 0.448
      cx.save(); cx.translate(ferryX, fy); cx.scale(0.50, 0.50)

      // Dark hull bottom
      cx.beginPath()
      cx.moveTo(-112, 0); cx.lineTo(112, 0)
      cx.lineTo(106, 13); cx.lineTo(-106, 13); cx.closePath()
      cx.fillStyle = 'rgba(28,44,62,0.80)'; cx.fill()
      // White hull
      cx.fillStyle = 'rgba(236,234,226,0.88)'
      cx.fillRect(-106, -22, 212, 22)
      // Red waterline stripe
      cx.fillStyle = 'rgba(162,36,26,0.68)'
      cx.fillRect(-106, -4, 212, 4)
      // Superstructure
      cx.fillStyle = 'rgba(230,228,220,0.84)'
      cx.fillRect(-90, -40, 180, 18)
      // Wheelhouse
      cx.fillStyle = 'rgba(218,216,208,0.80)'
      cx.fillRect(-50, -56, 100, 16)
      // Funnels
      cx.fillStyle = 'rgba(28,28,28,0.80)'
      cx.fillRect(-14, -74, 15, 22); cx.fillRect(6, -68, 13, 17)
      cx.fillStyle = 'rgba(162,36,26,0.78)'
      cx.fillRect(-15, -78, 17, 6); cx.fillRect(5, -72, 15, 5)
      // Windows row 1
      cx.fillStyle = 'rgba(138,190,230,0.48)'
      for (let i = -78; i <= 78; i += 16) cx.fillRect(i, -38, 10, 8)
      for (let i = -40; i <= 40; i += 16) cx.fillRect(i, -54, 9, 7)
      // Wake
      cx.strokeStyle = 'rgba(255,255,255,0.20)'; cx.lineWidth = 2
      cx.beginPath(); cx.moveTo(110, 7)
      cx.bezierCurveTo(135, 5, 150, 2, 168, 6); cx.stroke()

      cx.restore()
    }

    /* ── Pine tree ───────────────────────────────────────────────────────── */
    const pine = (x: number, y: number, h: number) => {
      const w2 = h * 0.30
      cx.fillStyle = th.pineTrunk; cx.fillRect(x - 1.5, y, 3, h * 0.16)
      cx.beginPath()
      cx.moveTo(x, y - h); cx.lineTo(x + w2, y); cx.lineTo(x - w2, y); cx.closePath()
      cx.fillStyle = th.pineBody; cx.fill()
      cx.beginPath()
      cx.moveTo(x, y - h*1.32); cx.lineTo(x + w2*0.62, y - h*0.40); cx.lineTo(x - w2*0.62, y - h*0.40); cx.closePath()
      cx.fillStyle = th.pineTop; cx.fill()
    }

    /* ── Lighthouse ─────────────────────────────────────────────────────── */
    const lighthouse = (x: number, by: number) => {
      const lh = H * 0.058
      cx.fillStyle = '#e8e2d4'; cx.fillRect(x - 4, by - lh, 8, lh)
      cx.fillStyle = '#c84040'
      cx.fillRect(x - 4, by - lh * 0.56, 8, lh * 0.12)
      cx.fillRect(x - 4, by - lh * 0.26, 8, lh * 0.12)
      cx.fillStyle = '#d0c8b0'; cx.fillRect(x - 7, by - lh - 7, 14, 8)
      const pulse = (Math.sin(ms * 0.0018) + 1) * 0.5
      cx.fillStyle = `rgba(255,255,170,${0.55 + pulse * 0.45})`
      cx.beginPath(); cx.arc(x, by - lh - 3.5, 3.5, 0, Math.PI * 2); cx.fill()
      const lg = cx.createRadialGradient(x, by - lh - 3.5, 0, x, by - lh - 3.5, 22)
      lg.addColorStop(0, `rgba(255,255,100,${0.22 * pulse})`)
      lg.addColorStop(1, 'rgba(255,255,100,0)')
      cx.fillStyle = lg; cx.beginPath(); cx.arc(x, by - lh - 3.5, 22, 0, Math.PI * 2); cx.fill()
      cx.fillStyle = '#c84040'
      cx.beginPath(); cx.moveTo(x - 8, by - lh - 7); cx.lineTo(x + 8, by - lh - 7); cx.lineTo(x, by - lh - 14); cx.closePath(); cx.fill()
    }

    /* ── Faluröd cottage ────────────────────────────────────────────────── */
    const cottage = (x: number, y: number, small = false) => {
      const cw = W * (small ? 0.017 : 0.024), ch = H * (small ? 0.019 : 0.025)
      // Faluröd walls
      cx.fillStyle = small ? '#8c2020' : '#9b2720'
      cx.fillRect(x - cw/2, y, cw, ch)
      // White corner boards
      cx.fillStyle = '#f0ebe0'
      cx.fillRect(x - cw/2, y, 2, ch)
      cx.fillRect(x + cw/2 - 2, y, 2, ch)
      // Dark roof
      cx.fillStyle = '#2e1a10'
      cx.beginPath()
      cx.moveTo(x - cw/2 - 2, y); cx.lineTo(x + cw/2 + 2, y); cx.lineTo(x, y - ch*0.65)
      cx.closePath(); cx.fill()
      // White window frame + glass
      cx.fillStyle = '#f0ebe0'
      cx.fillRect(x - cw*0.15, y + ch*0.18, cw*0.30, ch*0.34)
      cx.fillStyle = 'rgba(135,195,225,0.55)'
      cx.fillRect(x - cw*0.13, y + ch*0.20, cw*0.26, ch*0.30)
    }

    /* ── Sjöbod / boathouse ─────────────────────────────────────────────── */
    const boathouse = (x: number, y: number) => {
      const bw = W * 0.028, bh = H * 0.034
      // Foundation poles into water
      cx.fillStyle = '#3a2810'
      ;[-bw*0.28, 0, bw*0.28].forEach(ox => cx.fillRect(x + ox - 1.5, y, 3, H * 0.028))
      // Walls
      cx.fillStyle = '#8c2020'
      cx.fillRect(x - bw/2, y - bh, bw, bh)
      // White corner trim
      cx.fillStyle = '#f0ebe0'
      cx.fillRect(x - bw/2, y - bh, 2, bh)
      cx.fillRect(x + bw/2 - 2, y - bh, 2, bh)
      // Dark roof
      cx.fillStyle = '#2e1810'
      cx.beginPath()
      cx.moveTo(x - bw/2 - 3, y - bh); cx.lineTo(x + bw/2 + 3, y - bh); cx.lineTo(x, y - bh - bh*0.55)
      cx.closePath(); cx.fill()
      // Boat opening
      cx.fillStyle = 'rgba(6,14,28,0.68)'
      cx.fillRect(x - bw*0.27, y - bh*0.52, bw*0.54, bh*0.52)
      cx.strokeStyle = '#f0ebe0'; cx.lineWidth = 1.2
      cx.strokeRect(x - bw*0.27, y - bh*0.52, bw*0.54, bh*0.52)
    }

    /* ── Swedish flagpole ───────────────────────────────────────────────── */
    const flagpole = (x: number, y: number) => {
      const topY = y - H * 0.068
      cx.strokeStyle = '#c8b880'; cx.lineWidth = 1.6
      cx.beginPath(); cx.moveTo(x, y); cx.lineTo(x, topY); cx.stroke()

      const fw = H * 0.030, fh = H * 0.020
      const fy = topY + 2
      const wt = ms * 0.0016

      // Waving flag with clip
      cx.save()
      cx.beginPath()
      for (let i = 0; i <= 10; i++) {
        const px = x + (i / 10) * fw
        const py = fy + Math.sin(i * 0.78 + wt) * (i / 10) * 2.8
        i === 0 ? cx.moveTo(px, py) : cx.lineTo(px, py)
      }
      for (let i = 10; i >= 0; i--) {
        const px = x + (i / 10) * fw
        const py = fy + fh + Math.sin(i * 0.78 + wt + 0.4) * (i / 10) * 2.8
        cx.lineTo(px, py)
      }
      cx.closePath(); cx.clip()

      // Blue background
      cx.fillStyle = '#006AA7'
      cx.fillRect(x, fy - 2, fw + 3, fh + 4)
      // Yellow cross
      cx.fillStyle = '#FECC02'
      cx.fillRect(x, fy + fh * 0.34, fw + 3, fh * 0.30)   // horizontal
      cx.fillRect(x + fw * 0.28, fy - 2, fw * 0.18, fh + 4) // vertical

      cx.restore()
    }

    /* ── Dock / brygga ──────────────────────────────────────────────────── */
    const dock = (x: number, waterY: number) => {
      const dLen = W * 0.040
      const dTop = waterY - H * 0.009
      // Poles
      cx.fillStyle = '#3a2810'
      ;[x + 3, x + dLen * 0.36, x + dLen * 0.70, x + dLen - 3].forEach(px =>
        cx.fillRect(px - 2, dTop, 4, H * 0.040)
      )
      // Plank surface
      cx.fillStyle = '#7a5a32'
      cx.fillRect(x, dTop, dLen, H * 0.009)
      // Plank separators
      cx.strokeStyle = '#5a4020'; cx.lineWidth = 0.6
      for (let i = 1; i <= 5; i++) {
        const px = x + i * (dLen / 6)
        cx.beginPath(); cx.moveTo(px, dTop); cx.lineTo(px, dTop + H * 0.009); cx.stroke()
      }
      // Weathered highlight
      cx.fillStyle = 'rgba(220,195,155,0.16)'
      cx.fillRect(x, dTop, dLen, H * 0.003)
    }

    /* ── Rowboat on shore ───────────────────────────────────────────────── */
    const rowboat = (x: number, y: number) => {
      cx.save(); cx.translate(x, y); cx.rotate(-0.06)
      cx.beginPath()
      cx.moveTo(-16, 0); cx.bezierCurveTo(-18, 5, 18, 5, 18, 0)
      cx.lineTo(15, -4); cx.lineTo(-14, -4); cx.closePath()
      cx.fillStyle = '#b83520'; cx.fill()
      cx.beginPath()
      cx.moveTo(-12, -3); cx.bezierCurveTo(-12, 1, 12, 1, 12, -3); cx.closePath()
      cx.fillStyle = '#a02c18'; cx.fill()
      cx.strokeStyle = '#d8a050'; cx.lineWidth = 1.0
      cx.beginPath(); cx.moveTo(-14, -4); cx.lineTo(15, -4); cx.stroke()
      cx.strokeStyle = '#7a5028'; cx.lineWidth = 1.4
      cx.beginPath(); cx.moveTo(-6, -5); cx.lineTo(-20, -11); cx.stroke()
      cx.restore()
    }

    /* ── Fishing net ────────────────────────────────────────────────────── */
    const fishingNet = (x1: number, x2: number, topY: number) => {
      const netH = H * 0.040
      // Poles
      cx.fillStyle = '#3a2810'
      cx.fillRect(x1 - 2, topY, 4, H * 0.048)
      cx.fillRect(x2 - 2, topY, 4, H * 0.048)
      // Top rope
      cx.strokeStyle = 'rgba(148,115,66,0.72)'; cx.lineWidth = 1.4
      cx.beginPath(); cx.moveTo(x1, topY); cx.lineTo(x2, topY); cx.stroke()
      // Net mesh
      cx.strokeStyle = 'rgba(118,92,52,0.45)'; cx.lineWidth = 0.7
      const rows = 6, cols = 7
      for (let r = 0; r <= rows; r++) {
        const ny = topY + r * (netH / rows)
        cx.beginPath(); cx.moveTo(x1, ny); cx.lineTo(x2, ny); cx.stroke()
      }
      for (let c = 0; c <= cols; c++) {
        const nx = x1 + c * ((x2 - x1) / cols)
        cx.beginPath(); cx.moveTo(nx, topY); cx.lineTo(nx, topY + netH); cx.stroke()
      }
    }

    /* ── Near islands ────────────────────────────────────────────────────── */
    const drawNearIslands = () => {
      const wb = WL()
      cx.save()

      // Left island
      cx.beginPath()
      cx.moveTo(-6, wb)
      cx.bezierCurveTo(W*0.01, H*0.375, W*0.075, H*0.335, W*0.145, H*0.378)
      cx.bezierCurveTo(W*0.20, H*0.41, W*0.245, H*0.475, W*0.26, wb)
      cx.lineTo(-6, wb); cx.closePath()
      cx.fillStyle = th.islandGreen; cx.fill()
      cx.beginPath()
      cx.moveTo(-6, wb); cx.lineTo(-6, H*0.458)
      cx.bezierCurveTo(W*0.01, H*0.415, W*0.038, H*0.405, W*0.058, H*0.438)
      cx.lineTo(W*0.068, wb)
      cx.fillStyle = th.rockColor; cx.fill()
      // Granite speckle on rock
      cx.fillStyle = 'rgba(200,195,185,0.18)'
      for (let i = 0; i < 6; i++) cx.fillRect(W*(0.01 + i*0.008), H*0.430, 2, 2)

      const tA: [number, number][] = [[W*0.04, 0.955],[W*0.08, 0.924],[W*0.11, 0.906],[W*0.155, 0.912],[W*0.195, 0.940]]
      tA.forEach(([tx, yt]) => pine(tx, wb * yt, H * 0.060))
      lighthouse(W * 0.225, wb * 0.954)
      cottage(W * 0.105, wb * 0.952, true)
      flagpole(W * 0.175, wb * 0.945)
      dock(W * 0.234, wb)
      rowboat(W * 0.250, wb - 3)

      // Right island
      cx.beginPath()
      cx.moveTo(W*0.50, wb)
      cx.bezierCurveTo(W*0.52, H*0.375, W*0.595, H*0.325, W*0.685, H*0.375)
      cx.bezierCurveTo(W*0.745, H*0.415, W*0.785, H*0.485, W*0.80, wb)
      cx.lineTo(W*0.50, wb); cx.closePath()
      cx.fillStyle = th.islandGreen; cx.fill()
      cx.beginPath()
      cx.moveTo(W*0.80, wb)
      cx.bezierCurveTo(W*0.82, H*0.445, W*0.88, H*0.435, W*0.935, H*0.475)
      cx.lineTo(W*0.935, wb)
      cx.fillStyle = th.rockColor; cx.fill()
      // Granite speckle
      cx.fillStyle = 'rgba(200,195,185,0.18)'
      for (let i = 0; i < 7; i++) cx.fillRect(W*(0.808 + i*0.009), H*0.460, 2, 2)

      const tB: [number, number][] = [[W*0.535, 0.944],[W*0.575, 0.912],[W*0.635, 0.902],[W*0.72, 0.921],[W*0.768, 0.948]]
      tB.forEach(([tx, yt]) => pine(tx, wb * yt, H * 0.056))
      cottage(W * 0.655, wb * 0.935)
      boathouse(W * 0.516, wb)
      fishingNet(W * 0.530, W * 0.572, wb - H * 0.036)

      // Small mid rock
      cx.beginPath()
      cx.moveTo(W*0.340, wb)
      cx.bezierCurveTo(W*0.350, H*0.468, W*0.370, H*0.455, W*0.395, H*0.468)
      cx.lineTo(W*0.405, wb)
      cx.fillStyle = th.rockColor; cx.fill()

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
      const wg = cx.createLinearGradient(0, WL() - 8, 0, H)
      wg.addColorStop(0, w0); wg.addColorStop(0.18, w1)
      wg.addColorStop(0.55, w2); wg.addColorStop(1, w3)
      cx.fillStyle = wg; cx.fill()
      cx.beginPath()
      cx.moveTo(0, wave(0))
      for (let x = 2; x <= W; x += 2) cx.lineTo(x, wave(x))
      cx.strokeStyle = th.waterHighlight; cx.lineWidth = 1.8; cx.stroke()
      cx.beginPath()
      const off = H * 0.009
      for (let x = 0; x <= W; x += 4) {
        const y2 = wave(x) + off + Math.sin(x * 0.004 - t * 0.25 * th.waveSpeed + 0.9) * H * 0.004 * th.waveAmp
        x === 0 ? cx.moveTo(x, y2) : cx.lineTo(x, y2)
      }
      cx.strokeStyle = 'rgba(255,255,255,0.09)'; cx.lineWidth = 1.0; cx.stroke()
      cx.restore()
    }

    /* ── Bobbing buoy ───────────────────────────────────────────────────── */
    const drawBuoy = () => {
      const bx = W * 0.42
      const by = wave(bx) - H * 0.005
      cx.save(); cx.translate(bx, by)
      const br = H * 0.011
      cx.beginPath(); cx.arc(0, 0, br, 0, Math.PI * 2)
      cx.fillStyle = '#c83020'; cx.fill()
      cx.strokeStyle = '#e84828'; cx.lineWidth = 1.0; cx.stroke()
      cx.beginPath(); cx.arc(-br*0.28, -br*0.28, br*0.32, 0, Math.PI * 2)
      cx.fillStyle = 'rgba(255,155,125,0.38)'; cx.fill()
      // Top marker cross
      cx.strokeStyle = '#f0e8d8'; cx.lineWidth = 1.5
      cx.beginPath(); cx.moveTo(0, -br); cx.lineTo(0, -br*2.5); cx.stroke()
      cx.beginPath(); cx.moveTo(-br*0.8, -br*1.9); cx.lineTo(br*0.8, -br*1.9); cx.stroke()
      // Mooring line
      cx.strokeStyle = 'rgba(88,70,48,0.35)'; cx.lineWidth = 0.8
      cx.beginPath(); cx.moveTo(0, br); cx.lineTo(2, H * 0.060); cx.stroke()
      cx.restore()
    }

    /* ── Underwater atmosphere ───────────────────────────────────────────── */
    const drawUnderwater = () => {
      const wb = WL()
      const dg = cx.createLinearGradient(0, wb, 0, H)
      dg.addColorStop(0,    `${th.seabedTint}0)`)
      dg.addColorStop(0.35, `${th.seabedTint}0.16)`)
      dg.addColorStop(1,    `${th.seabedTint}0.58)`)
      cx.fillStyle = dg; cx.fillRect(0, wb, W, H - wb)
      for (let i = 0; i < 5; i++) {
        const rx = W * (0.08 + i * 0.185) + Math.sin(t * 0.14 + i * 1.1) * 12
        cx.save(); cx.translate(rx, wb); cx.rotate(-0.06 + i * 0.03)
        const rg = cx.createLinearGradient(0, 0, 0, H * 0.30)
        const a = 0.07 + Math.sin(t * 0.38 + i) * 0.03
        rg.addColorStop(0, `rgba(${th.underwaterRay},${a})`)
        rg.addColorStop(1, `rgba(${th.underwaterRay},0)`)
        cx.fillStyle = rg
        cx.beginPath(); cx.moveTo(-7, 0); cx.lineTo(7, 0)
        cx.lineTo(17, H*0.30); cx.lineTo(-17, H*0.30); cx.closePath(); cx.fill()
        cx.restore()
      }
    }

    /* ── Seabed rocks ───────────────────────────────────────────────────── */
    const drawSeabedRocks = () => {
      const rdata = [
        { x: W*0.06, rw: H*0.038, rh: H*0.020 }, { x: W*0.19, rw: H*0.028, rh: H*0.016 },
        { x: W*0.34, rw: H*0.044, rh: H*0.024 }, { x: W*0.49, rw: H*0.030, rh: H*0.017 },
        { x: W*0.63, rw: H*0.040, rh: H*0.022 }, { x: W*0.78, rw: H*0.028, rh: H*0.015 },
        { x: W*0.92, rw: H*0.042, rh: H*0.020 },
      ]
      rdata.forEach(({ x, rw, rh }) => {
        const ry = H - rh * 0.5
        cx.beginPath(); cx.ellipse(x, ry, rw, rh, 0, 0, Math.PI * 2)
        cx.fillStyle = 'hsla(215,16%,27%,0.68)'; cx.fill()
        // Highlight facet
        cx.beginPath(); cx.ellipse(x - rw*0.15, ry - rh*0.22, rw*0.42, rh*0.38, 0, 0, Math.PI * 2)
        cx.fillStyle = 'hsla(215,14%,36%,0.36)'; cx.fill()
        // Granite speckles
        cx.fillStyle = 'hsla(215,12%,42%,0.28)'
        for (let s = 0; s < 4; s++) cx.fillRect(x - rw*0.6 + s*rw*0.28, ry - rh*0.4, 2, 2)
      })
    }

    /* ── Seabed anchor ──────────────────────────────────────────────────── */
    const drawAnchor = () => {
      const ax = W * 0.32, ay = H * 0.876
      cx.save(); cx.translate(ax, ay)
      cx.strokeStyle = 'rgba(36,46,56,0.50)'; cx.fillStyle = 'rgba(36,46,56,0.50)'
      cx.lineWidth = 2.2; cx.lineCap = 'round'
      cx.beginPath(); cx.arc(0, -13, 4, 0, Math.PI * 2); cx.stroke()
      cx.beginPath(); cx.moveTo(0, -9); cx.lineTo(0, 11); cx.stroke()
      cx.beginPath(); cx.moveTo(-9, -6); cx.lineTo(9, -6); cx.stroke()
      cx.beginPath(); cx.moveTo(0, 11); cx.bezierCurveTo(-5, 11, -10, 6, -10, 2); cx.stroke()
      cx.beginPath(); cx.moveTo(0, 11); cx.bezierCurveTo(5, 11, 10, 6, 10, 2); cx.stroke()
      cx.beginPath(); cx.arc(-10, 2, 2.5, 0, Math.PI * 2); cx.fill()
      cx.beginPath(); cx.arc(10, 2, 2.5, 0, Math.PI * 2); cx.fill()
      cx.restore()
    }

    /* ── Seaweed (per-weed sway speed) ──────────────────────────────────── */
    const drawSeaweed = () => {
      weeds.forEach(w => {
        cx.save(); cx.translate(w.x, H)
        cx.beginPath(); cx.moveTo(0, 0)
        const segs = 7; let py = 0
        for (let s = 0; s < segs; s++) {
          const sg = w.h / segs
          const k = (s + 1) / segs
          const sw = Math.sin(t * 0.95 * w.spd + w.ph + s * 0.55) * 18 * k
          cx.bezierCurveTo(
            sw * 0.38 + (s % 2 === 0 ?  5 : -5), py - sg * 0.38,
            sw * 0.78 + (s % 2 === 0 ?  8 : -8), py - sg * 0.74,
            sw, py - sg
          )
          py -= sg
        }
        cx.strokeStyle = `hsla(${w.hue},60%,30%,0.90)`
        cx.lineWidth = w.w; cx.lineCap = 'round'; cx.stroke()
        cx.restore()
      })
    }

    /* ── Bubbles ─────────────────────────────────────────────────────────── */
    const drawBubbles = (dt: number) => {
      bubbles.forEach(b => {
        b.y   -= b.spd * dt * 0.001
        b.ph  += 0.0022 * dt
        b.x   += Math.sin(b.ph) * 0.22
        if (b.y < WL()) { b.y = H * (0.70 + Math.random() * 0.30); b.x = Math.random() * W }
        cx.beginPath(); cx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        cx.strokeStyle = `rgba(172,218,255,${b.a})`; cx.lineWidth = 0.75; cx.stroke()
      })
    }

    /* ── Fish (Nordic hues) ─────────────────────────────────────────────── */
    const drawFish = (dt: number) => {
      fish.forEach(f => {
        f.x += f.spd * f.dir * dt * 0.001
        f.ph += 0.0028 * dt
        const fy = f.y + Math.sin(f.ph) * 3.8
        if (f.dir === 1  && f.x >  W + f.sz * 2) f.x = -f.sz * 2
        if (f.dir === -1 && f.x < -f.sz * 2)     f.x =  W + f.sz * 2
        cx.save(); cx.translate(f.x, fy)
        if (f.dir === -1) cx.scale(-1, 1)
        const a = f.sz, b2 = f.sz * 0.42
        cx.beginPath(); cx.ellipse(0, 0, a, b2, 0, 0, Math.PI * 2)
        cx.fillStyle = `hsla(${f.hue},50%,44%,0.82)`; cx.fill()
        cx.beginPath()
        cx.moveTo(-a*0.88, 0); cx.lineTo(-a*1.72, -b2*1.05); cx.lineTo(-a*1.72, b2*1.05); cx.closePath()
        cx.fillStyle = `hsla(${f.hue},44%,36%,0.80)`; cx.fill()
        cx.beginPath(); cx.arc(a*0.53, -b2*0.12, a*0.10, 0, Math.PI * 2)
        cx.fillStyle = '#08141e'; cx.fill()
        cx.beginPath(); cx.arc(a*0.55, -b2*0.15, a*0.04, 0, Math.PI * 2)
        cx.fillStyle = 'rgba(255,255,255,0.72)'; cx.fill()
        cx.restore()
      })
    }

    /* ── Herring school ─────────────────────────────────────────────────── */
    const drawHerring = (dt: number) => {
      herringCx += herringDir * herringSpd * dt * 0.001
      if (herringCx > W * 0.82) { herringDir = -1; herringSpd = 7 + Math.random() * 4 }
      if (herringCx < W * 0.18) { herringDir = 1;  herringSpd = 7 + Math.random() * 4 }
      herringCy += Math.sin(ms * 0.00038) * 0.06
      herringCy = Math.max(H * 0.60, Math.min(H * 0.76, herringCy))

      herring.forEach((h, i) => {
        h.ph += 0.0014 * dt
        const hx = herringCx + h.x + Math.sin(h.ph + i * 0.45) * 5
        const hy = herringCy + h.y + Math.cos(h.ph * 0.72 + i * 0.32) * 4

        cx.save(); cx.translate(hx, hy)
        if (herringDir === -1) cx.scale(-1, 1)
        const sz = 3.5
        cx.beginPath(); cx.ellipse(0, 0, sz, sz * 0.34, 0, 0, Math.PI * 2)
        cx.fillStyle = 'hsla(205,42%,63%,0.80)'; cx.fill()
        cx.beginPath()
        cx.moveTo(-sz*0.9, 0); cx.lineTo(-sz*1.7, -sz*0.50); cx.lineTo(-sz*1.7, sz*0.50); cx.closePath()
        cx.fillStyle = 'hsla(205,38%,52%,0.72)'; cx.fill()
        cx.restore()
      })
    }

    /* ── Diver ──────────────────────────────────────────────────────────── */
    const drawDiver = (dt: number) => {
      if (!diverOn) return
      diverX += diverDir * 20 * dt * 0.001
      if ((diverDir === -1 && diverX < -70) || (diverDir === 1 && diverX > W + 70)) {
        diverOn = false; nextDiver = ms + 40000 + Math.random() * 25000
      }
      cx.save(); cx.translate(diverX, diverY)
      if (diverDir === 1) cx.scale(-1, 1)
      cx.fillStyle = 'rgba(24,42,60,0.68)'
      cx.beginPath(); cx.ellipse(0, 0, 11, 4, 0, 0, Math.PI * 2); cx.fill()       // body
      cx.beginPath(); cx.arc(9, -1, 4.5, 0, Math.PI * 2); cx.fill()               // head
      cx.beginPath(); cx.ellipse(-2, 3.5, 5, 2.2, 0, 0, Math.PI * 2); cx.fill()  // tank
      cx.beginPath(); cx.ellipse(-13, 0, 7, 1.8, 0.15, 0, Math.PI * 2); cx.fill() // flippers
      cx.strokeStyle = 'rgba(24,42,60,0.68)'; cx.lineWidth = 2.4; cx.lineCap = 'round'
      cx.beginPath(); cx.moveTo(7, -2); cx.lineTo(16, -4); cx.stroke()             // arm
      cx.restore()
    }

    /* ── Porpoise + calf ─────────────────────────────────────────────────── */
    const drawDolphin = (dt: number) => {
      if (!dolOn) return
      dolX  -= 32 * dt * 0.001
      dolPh += 2.2 * dt * 0.001
      const dy = WL() + 10 + Math.sin(dolPh * 2.8) * 11
      if (dolX < -160) { dolOn = false; nextDol = ms + 28000 + Math.random() * 18000 }

      // Calf trailing behind
      const calfX = dolX + 54 + Math.sin(dolPh + 1.2) * 4
      const calfY = dy + 5 + Math.sin(dolPh * 2.8 + 0.8) * 7
      cx.save(); cx.translate(calfX, calfY)
      cx.beginPath(); cx.ellipse(0, 0, 15, 5.5, 0, 0, Math.PI * 2)
      cx.fillStyle = 'rgba(56,86,118,0.74)'; cx.fill()
      cx.beginPath(); cx.ellipse(17, 1.5, 6, 2.5, 0.2, 0, Math.PI * 2)
      cx.fillStyle = 'rgba(66,98,130,0.70)'; cx.fill()
      cx.beginPath(); cx.moveTo(0,-5.5); cx.lineTo(5,-13); cx.lineTo(9,-5.5); cx.closePath()
      cx.fillStyle = 'rgba(48,76,108,0.72)'; cx.fill()
      cx.beginPath()
      cx.moveTo(-13,0); cx.lineTo(-20,-5); cx.lineTo(-22,-2)
      cx.lineTo(-13,0); cx.lineTo(-22,3); cx.lineTo(-20,6); cx.closePath()
      cx.fillStyle = 'rgba(48,76,108,0.70)'; cx.fill()
      cx.restore()

      // Adult porpoise (rounder, shorter snout than old dolphin)
      cx.save(); cx.translate(dolX, dy)
      cx.beginPath(); cx.ellipse(0, 0, 27, 9, 0, 0, Math.PI * 2)
      cx.fillStyle = 'rgba(46,73,108,0.88)'; cx.fill()
      cx.beginPath(); cx.ellipse(28, 2, 9, 3.5, 0.15, 0, Math.PI * 2)
      cx.fillStyle = 'rgba(60,90,125,0.85)'; cx.fill()
      cx.beginPath(); cx.moveTo(0,-9); cx.lineTo(8,-21); cx.lineTo(13,-9); cx.closePath()
      cx.fillStyle = 'rgba(38,66,98,0.88)'; cx.fill()
      cx.beginPath()
      cx.moveTo(-24,0); cx.lineTo(-35,-8); cx.lineTo(-37,-3)
      cx.lineTo(-24,0); cx.lineTo(-37,4); cx.lineTo(-35,9); cx.closePath()
      cx.fillStyle = 'rgba(38,66,98,0.85)'; cx.fill()
      // Eye
      cx.beginPath(); cx.arc(20, 0, 2.2, 0, Math.PI * 2)
      cx.fillStyle = '#060e1a'; cx.fill()
      // Light belly patch
      cx.beginPath(); cx.ellipse(4, 3.5, 14, 4.5, 0, 0, Math.PI * 2)
      cx.fillStyle = 'rgba(148,178,208,0.30)'; cx.fill()
      cx.restore()
    }

    /* ── Boats ───────────────────────────────────────────────────────────── */
    const drawBoats = (dt: number) => {
      boats.forEach(b => {
        b.x -= b.spd * dt * 0.001
        if (b.x < -130) b.x = W + 80 + Math.random() * 350
        const wy  = wave(b.x)
        const bob  = Math.sin(t * 0.68 + b.ph) * 2.8
        const tilt = Math.sin(t * 0.52 + b.ph) * 1.6 * (Math.PI / 180)
        cx.save(); cx.translate(b.x, wy + bob); cx.rotate(tilt)
        b.type === 'sail' ? drawSailboat() : drawMotorboat()
        cx.restore()
      })
    }

    const drawSailboat = () => {
      cx.beginPath(); cx.moveTo(-20, 6); cx.bezierCurveTo(-40, 8, -65, 9, -85, 7)
      cx.strokeStyle = 'rgba(255,255,255,0.20)'; cx.lineWidth = 1.2; cx.stroke()
      cx.beginPath(); cx.moveTo(-22,8); cx.lineTo(22,8); cx.lineTo(17,0); cx.lineTo(-17,0); cx.closePath()
      cx.fillStyle = '#ead8a8'; cx.fill()
      cx.beginPath(); cx.moveTo(-17,0); cx.lineTo(17,0); cx.bezierCurveTo(15,-4,-15,-4,-17,0); cx.closePath()
      cx.fillStyle = '#d0b870'; cx.fill()
      cx.strokeStyle = '#7a4e28'; cx.lineWidth = 1.5
      cx.beginPath(); cx.moveTo(0,0); cx.lineTo(0,-44); cx.stroke()
      cx.beginPath(); cx.moveTo(0,-42); cx.lineTo(23,-2); cx.lineTo(0,-2); cx.closePath()
      cx.fillStyle = 'rgba(252,248,236,0.95)'; cx.fill()
      cx.beginPath(); cx.moveTo(0,-28); cx.lineTo(-17,-4); cx.lineTo(0,-4); cx.closePath()
      cx.fillStyle = 'rgba(252,248,236,0.62)'; cx.fill()
      cx.beginPath(); cx.moveTo(0,-44); cx.lineTo(9,-39); cx.lineTo(0,-34); cx.closePath()
      cx.fillStyle = '#e04040'; cx.fill()
    }

    const drawMotorboat = () => {
      cx.beginPath(); cx.moveTo(-16,4); cx.bezierCurveTo(-30,6,-55,8,-72,6)
      cx.strokeStyle = 'rgba(255,255,255,0.18)'; cx.lineWidth = 1.2; cx.stroke()
      cx.beginPath(); cx.moveTo(-16,5); cx.lineTo(24,5); cx.lineTo(20,0); cx.lineTo(-14,0); cx.closePath()
      cx.fillStyle = '#c8d8e4'; cx.fill()
      cx.beginPath(); cx.moveTo(-14,0); cx.lineTo(20,0); cx.bezierCurveTo(18,-3,-12,-3,-14,0); cx.closePath()
      cx.fillStyle = '#a8c0d0'; cx.fill()
      cx.fillStyle = '#deeaf2'; cx.fillRect(-8,-14,16,14)
      cx.fillStyle = '#b4c8d8'
      cx.beginPath(); cx.moveTo(-9,-14); cx.lineTo(9,-14); cx.lineTo(14,-8); cx.lineTo(-9,-8); cx.closePath(); cx.fill()
      cx.fillStyle = 'rgba(136,192,228,0.52)'; cx.fillRect(-5,-13,11,6)
    }

    /* ── Birds ───────────────────────────────────────────────────────────── */
    const drawBirds = (dt: number) => {
      birds.forEach(b => {
        b.x    -= b.spd * dt * 0.001
        b.wingT += 2.0 * dt * 0.001
        if (b.x < -25) { b.x = W + 25; b.baseY = H * (0.06 + Math.random() * 0.10) }
        const y = b.baseY + Math.sin(b.wingT * 0.28 + b.ph) * b.amp * 4
        const w = Math.sin(b.wingT) * 5.5
        cx.save(); cx.translate(b.x, y)
        cx.strokeStyle = th.birdColor; cx.lineWidth = 1.4; cx.lineCap = 'round'
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
      if (!diverOn && ms > nextDiver) {
        diverOn = true
        diverDir = Math.random() > 0.5 ? -1 : 1
        diverX = diverDir === -1 ? W + 55 : -55
        diverY = H * (0.62 + Math.random() * 0.13)
      }

      drawSky()
      drawSun()
      drawFarIslands()
      drawFerry(dt)         // behind near islands
      drawNearIslands()
      drawWater()
      drawBuoy()
      drawBoats(dt)
      drawUnderwater()
      drawSeabedRocks()
      drawAnchor()
      drawSeaweed()
      drawBubbles(dt)
      drawFish(dt)
      drawHerring(dt)
      drawDiver(dt)
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
