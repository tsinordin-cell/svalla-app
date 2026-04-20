'use client'
import { useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────────────────────────────────────
   HeroAnimation — canvas + requestAnimationFrame
   Realistisk skärgårdsmiljö: statiska öar, levande hav, båtar, fåglar, fisk
───────────────────────────────────────────────────────────────────────────── */

type BoatType = 'sail' | 'motor'
interface Boat   { x: number; spd: number; type: BoatType; ph: number }
interface Bird   { x: number; baseY: number; spd: number; wingT: number; amp: number; ph: number }
interface Fish   { x: number; y: number; spd: number; dir: 1|-1; sz: number; ph: number; hue: number }
interface Weed   { x: number; h: number; ph: number; hue: number; w: number }
interface Bubble { x: number; y: number; r: number; spd: number; ph: number; a: number }

export default function HeroAnimation() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const cx = cv.getContext('2d', { alpha: false })
    if (!cx) return

    let W = 0, H = 0, dpr = 1
    let raf = 0, last = 0, t = 0, ms = 0
    let boats: Boat[] = [], birds: Bird[] = [], fish: Fish[] = []
    let weeds: Weed[] = [], bubbles: Bubble[] = []
    let dolX = 0, dolPh = 0, dolOn = false, nextDol = 0

    /* ── Layout ─────────────────────────────────────────────────────────── */
    const WL = () => H * 0.52          // waterline baseline

    /* ── Multi-sine wave ────────────────────────────────────────────────── */
    const wave = (x: number): number => {
      const b = WL()
      const swell  = Math.sin(x * 0.0022 + t * 0.18) * H * 0.014   // large, slow
      const mid    = Math.sin(x * 0.0058 - t * 0.32 + 1.2) * H * 0.006
      const ripple = Math.sin(x * 0.0145 + t * 0.62 + 2.5) * H * 0.003
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
          sz: 6 + rnd() * 14, ph: rnd() * Math.PI * 2, hue: 168 + rnd() * 65,
        }
      })
      weeds = Array.from({ length: 26 }, (_, i) => ({
        x: (i / 26 + (rnd() - 0.5) * 0.025) * W,
        h: H * (0.048 + rnd() * 0.072),
        ph: rnd() * Math.PI * 2, hue: 98 + rnd() * 42, w: 3.5 + rnd() * 4.5,
      }))
      bubbles = Array.from({ length: 20 }, () => ({
        x: rnd() * W, y: H * (0.65 + rnd() * 0.35),
        r: 0.8 + rnd() * 2.8, spd: 3 + rnd() * 7,
        ph: rnd() * Math.PI * 2, a: 0.14 + rnd() * 0.32,
      }))
      dolX = W + 80; dolOn = false; nextDol = ms + 10000
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
      g.addColorStop(0,   '#b4d8f2')
      g.addColorStop(0.45,'#cae4f8')
      g.addColorStop(1,   '#a4c8dc')
      cx.fillStyle = g
      cx.fillRect(0, 0, W, H * 0.57)
    }

    const drawSun = () => {
      const sx = W * 0.73, sy = H * 0.092, sr = H * 0.036
      // outer glow
      const glow = cx.createRadialGradient(sx, sy, 0, sx, sy, sr * 7)
      glow.addColorStop(0,   'rgba(255,238,150,0.26)')
      glow.addColorStop(0.4, 'rgba(255,228,100,0.10)')
      glow.addColorStop(1,   'rgba(255,228,100,0)')
      cx.fillStyle = glow
      cx.beginPath(); cx.arc(sx, sy, sr * 7, 0, Math.PI * 2); cx.fill()
      // disc
      const disc = cx.createRadialGradient(sx, sy, 0, sx, sy, sr)
      disc.addColorStop(0, '#fffee0'); disc.addColorStop(1, '#ffe070')
      cx.fillStyle = disc; cx.beginPath(); cx.arc(sx, sy, sr, 0, Math.PI * 2); cx.fill()
    }

    /* ── Far islands (distant silhouette, blue-grey, no detail) ─────────── */
    const drawFarIslands = () => {
      cx.fillStyle = 'rgba(122,150,168,0.50)'
      // Left group
      cx.beginPath()
      cx.moveTo(0, H * 0.445)
      cx.bezierCurveTo(W*0.02, H*0.30, W*0.09, H*0.265, W*0.175, H*0.315)
      cx.bezierCurveTo(W*0.23, H*0.35, W*0.27, H*0.42, W*0.30, H*0.445)
      cx.lineTo(0, H * 0.445); cx.fill()
      // Centre
      cx.beginPath()
      cx.moveTo(W*0.37, H*0.445)
      cx.bezierCurveTo(W*0.40, H*0.265, W*0.52, H*0.215, W*0.63, H*0.295)
      cx.bezierCurveTo(W*0.70, H*0.34, W*0.745, H*0.415, W*0.76, H*0.445)
      cx.lineTo(W*0.37, H*0.445); cx.fill()
      // Right
      cx.beginPath()
      cx.moveTo(W*0.83, H*0.445)
      cx.bezierCurveTo(W*0.85, H*0.295, W*0.94, H*0.275, W, H*0.325)
      cx.lineTo(W, H * 0.445); cx.fill()
    }

    /* ── Pine tree ───────────────────────────────────────────────────────── */
    const pine = (x: number, y: number, h: number) => {
      const w2 = h * 0.30
      cx.fillStyle = '#5c3820'; cx.fillRect(x - 1.5, y, 3, h * 0.16)
      cx.beginPath()
      cx.moveTo(x, y - h); cx.lineTo(x + w2, y); cx.lineTo(x - w2, y); cx.closePath()
      cx.fillStyle = '#285a28'; cx.fill()
      cx.beginPath()
      cx.moveTo(x, y - h*1.32); cx.lineTo(x + w2*0.62, y - h*0.40); cx.lineTo(x - w2*0.62, y - h*0.40); cx.closePath()
      cx.fillStyle = '#367038'; cx.fill()
    }

    /* ── Lighthouse ─────────────────────────────────────────────────────── */
    const lighthouse = (x: number, by: number) => {
      const lh = H * 0.058
      cx.fillStyle = '#e8e2d4'; cx.fillRect(x - 4, by - lh, 8, lh)
      cx.fillStyle = '#c84040'
      cx.fillRect(x - 4, by - lh * 0.56, 8, lh * 0.12)
      cx.fillRect(x - 4, by - lh * 0.26, 8, lh * 0.12)
      cx.fillStyle = '#d0c8b0'; cx.fillRect(x - 7, by - lh - 7, 14, 8)
      // pulsing light
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

    /* ── Cottage ────────────────────────────────────────────────────────── */
    const cottage = (x: number, y: number, small = false) => {
      const cw = W * (small ? 0.017 : 0.024), ch = H * (small ? 0.019 : 0.025)
      cx.fillStyle = small ? '#ece4cc' : '#f2ecd8'
      cx.fillRect(x - cw/2, y, cw, ch)
      cx.fillStyle = '#c05030'
      cx.beginPath(); cx.moveTo(x - cw/2 - 2, y); cx.lineTo(x + cw/2 + 2, y); cx.lineTo(x, y - ch*0.65); cx.closePath(); cx.fill()
      cx.fillStyle = 'rgba(135,195,225,0.55)'
      cx.fillRect(x - cw*0.14, y + ch*0.2, cw*0.28, ch*0.32)
    }

    /* ── Near islands (static, green, with trees/lighthouse/cottage) ─────── */
    const drawNearIslands = () => {
      const wb = WL()
      cx.save()

      // ── Island A — left, large ──────────────────────────────────────────
      cx.beginPath()
      cx.moveTo(-6, wb)
      cx.bezierCurveTo(W*0.01, H*0.375, W*0.075, H*0.335, W*0.145, H*0.378)
      cx.bezierCurveTo(W*0.20, H*0.41, W*0.245, H*0.475, W*0.26, wb)
      cx.lineTo(-6, wb); cx.closePath()
      cx.fillStyle = '#5a8850'; cx.fill()
      // Rock face left
      cx.beginPath()
      cx.moveTo(-6, wb); cx.lineTo(-6, H*0.458)
      cx.bezierCurveTo(W*0.01, H*0.415, W*0.038, H*0.405, W*0.058, H*0.438)
      cx.lineTo(W*0.068, wb)
      cx.fillStyle = '#889878'; cx.fill()
      // Trees + features
      const tA: [number, number][] = [[W*0.04, 0.955],[W*0.08, 0.924],[W*0.11, 0.906],[W*0.155, 0.912],[W*0.195, 0.940]]
      tA.forEach(([tx, yt]) => pine(tx, wb * yt, H * 0.060))
      lighthouse(W * 0.225, wb * 0.954)
      cottage(W * 0.105, wb * 0.952, true)

      // ── Island B — centre-right, medium ────────────────────────────────
      cx.beginPath()
      cx.moveTo(W*0.50, wb)
      cx.bezierCurveTo(W*0.52, H*0.375, W*0.595, H*0.325, W*0.685, H*0.375)
      cx.bezierCurveTo(W*0.745, H*0.415, W*0.785, H*0.485, W*0.80, wb)
      cx.lineTo(W*0.50, wb); cx.closePath()
      cx.fillStyle = '#5a8850'; cx.fill()
      // Rocky outcrop right
      cx.beginPath()
      cx.moveTo(W*0.80, wb)
      cx.bezierCurveTo(W*0.82, H*0.445, W*0.88, H*0.435, W*0.935, H*0.475)
      cx.lineTo(W*0.935, wb)
      cx.fillStyle = '#7a8870'; cx.fill()
      const tB: [number, number][] = [[W*0.535, 0.944],[W*0.575, 0.912],[W*0.635, 0.902],[W*0.72, 0.921],[W*0.768, 0.948]]
      tB.forEach(([tx, yt]) => pine(tx, wb * yt, H * 0.056))
      cottage(W * 0.655, wb * 0.935)

      // ── Small rocky outcrop — centre gap ───────────────────────────────
      cx.beginPath()
      cx.moveTo(W*0.340, wb)
      cx.bezierCurveTo(W*0.350, H*0.468, W*0.370, H*0.455, W*0.395, H*0.468)
      cx.lineTo(W*0.405, wb)
      cx.fillStyle = '#788068'; cx.fill()

      cx.restore()
    }

    /* ── Water surface + body ────────────────────────────────────────────── */
    const drawWater = () => {
      cx.save()
      // Main fill
      cx.beginPath()
      cx.moveTo(0, wave(0))
      for (let x = 2; x <= W; x += 2) cx.lineTo(x, wave(x))
      cx.lineTo(W, H); cx.lineTo(0, H); cx.closePath()
      const wg = cx.createLinearGradient(0, WL() - 8, 0, H)
      wg.addColorStop(0,   '#3c92c2')
      wg.addColorStop(0.18,'#2c72a0')
      wg.addColorStop(0.55,'#1c5080')
      wg.addColorStop(1,   '#0d2c56')
      cx.fillStyle = wg; cx.fill()
      // Primary surface highlight
      cx.beginPath()
      cx.moveTo(0, wave(0))
      for (let x = 2; x <= W; x += 2) cx.lineTo(x, wave(x))
      cx.strokeStyle = 'rgba(255,255,255,0.24)'; cx.lineWidth = 1.8; cx.stroke()
      // Secondary undulation (behind / slower)
      cx.beginPath()
      const off = H * 0.009
      for (let x = 0; x <= W; x += 4) {
        const y2 = wave(x) + off + Math.sin(x * 0.004 - t * 0.25 + 0.9) * H * 0.004
        x === 0 ? cx.moveTo(x, y2) : cx.lineTo(x, y2)
      }
      cx.strokeStyle = 'rgba(255,255,255,0.09)'; cx.lineWidth = 1.0; cx.stroke()
      cx.restore()
    }

    /* ── Underwater atmosphere ───────────────────────────────────────────── */
    const drawUnderwater = () => {
      const wb = WL()
      // Depth gradient (transparent at surface → dark at bottom)
      const dg = cx.createLinearGradient(0, wb, 0, H)
      dg.addColorStop(0,   'rgba(4,18,48,0)')
      dg.addColorStop(0.35,'rgba(4,14,40,0.16)')
      dg.addColorStop(1,   'rgba(2,8,26,0.58)')
      cx.fillStyle = dg; cx.fillRect(0, wb, W, H - wb)
      // Light rays
      for (let i = 0; i < 5; i++) {
        const rx = W * (0.08 + i * 0.185) + Math.sin(t * 0.14 + i * 1.1) * 12
        cx.save(); cx.translate(rx, wb); cx.rotate(-0.06 + i * 0.03)
        const rg = cx.createLinearGradient(0, 0, 0, H * 0.30)
        const a = 0.07 + Math.sin(t * 0.38 + i) * 0.03
        rg.addColorStop(0, `rgba(120,200,248,${a})`)
        rg.addColorStop(1, 'rgba(120,200,248,0)')
        cx.fillStyle = rg
        cx.beginPath(); cx.moveTo(-7, 0); cx.lineTo(7, 0)
        cx.lineTo(17, H*0.30); cx.lineTo(-17, H*0.30); cx.closePath(); cx.fill()
        cx.restore()
      }
    }

    /* ── Seaweed ─────────────────────────────────────────────────────────── */
    const drawSeaweed = () => {
      weeds.forEach(w => {
        cx.save(); cx.translate(w.x, H)
        cx.beginPath(); cx.moveTo(0, 0)
        const segs = 7; let py = 0
        for (let s = 0; s < segs; s++) {
          const sg = w.h / segs
          const k = (s + 1) / segs
          const sw = Math.sin(t * 0.95 + w.ph + s * 0.55) * 18 * k
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

    /* ── Fish ────────────────────────────────────────────────────────────── */
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
        // Body
        cx.beginPath(); cx.ellipse(0, 0, a, b2, 0, 0, Math.PI * 2)
        cx.fillStyle = `hsla(${f.hue},50%,44%,0.82)`; cx.fill()
        // Tail
        cx.beginPath()
        cx.moveTo(-a*0.88, 0); cx.lineTo(-a*1.72, -b2*1.05); cx.lineTo(-a*1.72, b2*1.05); cx.closePath()
        cx.fillStyle = `hsla(${f.hue},44%,36%,0.80)`; cx.fill()
        // Eye
        cx.beginPath(); cx.arc(a*0.53, -b2*0.12, a*0.10, 0, Math.PI * 2)
        cx.fillStyle = '#08141e'; cx.fill()
        cx.beginPath(); cx.arc(a*0.55, -b2*0.15, a*0.04, 0, Math.PI * 2)
        cx.fillStyle = 'rgba(255,255,255,0.72)'; cx.fill()
        cx.restore()
      })
    }

    /* ── Dolphin (occasional) ────────────────────────────────────────────── */
    const drawDolphin = (dt: number) => {
      if (!dolOn) return
      dolX  -= 34 * dt * 0.001
      dolPh += 2.4 * dt * 0.001
      const dy = WL() + 12 + Math.sin(dolPh * 2.6) * 13
      if (dolX < -110) { dolOn = false; nextDol = ms + 28000 + Math.random() * 18000 }
      cx.save(); cx.translate(dolX, dy)
      cx.beginPath(); cx.ellipse(0, 0, 30, 10, 0, 0, Math.PI * 2)
      cx.fillStyle = 'rgba(62,92,122,0.90)'; cx.fill()
      cx.beginPath(); cx.ellipse(33, 2, 12, 5, 0.18, 0, Math.PI * 2)
      cx.fillStyle = 'rgba(75,108,140,0.88)'; cx.fill()
      cx.beginPath(); cx.moveTo(0,-10); cx.lineTo(9,-23); cx.lineTo(15,-10); cx.closePath()
      cx.fillStyle = 'rgba(52,82,112,0.88)'; cx.fill()
      cx.beginPath()
      cx.moveTo(-28,0); cx.lineTo(-38,-9); cx.lineTo(-40,-4)
      cx.lineTo(-28,0); cx.lineTo(-40,5); cx.lineTo(-38,10); cx.closePath()
      cx.fillStyle = 'rgba(52,82,112,0.88)'; cx.fill()
      cx.beginPath(); cx.arc(24, -1, 2.5, 0, Math.PI * 2)
      cx.fillStyle = '#070f1a'; cx.fill()
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
      // Wake
      cx.beginPath(); cx.moveTo(-20, 6); cx.bezierCurveTo(-40, 8, -65, 9, -85, 7)
      cx.strokeStyle = 'rgba(255,255,255,0.20)'; cx.lineWidth = 1.2; cx.stroke()
      // Hull
      cx.beginPath(); cx.moveTo(-22,8); cx.lineTo(22,8); cx.lineTo(17,0); cx.lineTo(-17,0); cx.closePath()
      cx.fillStyle = '#ead8a8'; cx.fill()
      cx.beginPath(); cx.moveTo(-17,0); cx.lineTo(17,0); cx.bezierCurveTo(15,-4,-15,-4,-17,0); cx.closePath()
      cx.fillStyle = '#d0b870'; cx.fill()
      // Mast
      cx.strokeStyle = '#7a4e28'; cx.lineWidth = 1.5
      cx.beginPath(); cx.moveTo(0,0); cx.lineTo(0,-44); cx.stroke()
      // Main sail
      cx.beginPath(); cx.moveTo(0,-42); cx.lineTo(23,-2); cx.lineTo(0,-2); cx.closePath()
      cx.fillStyle = 'rgba(252,248,236,0.95)'; cx.fill()
      // Jib
      cx.beginPath(); cx.moveTo(0,-28); cx.lineTo(-17,-4); cx.lineTo(0,-4); cx.closePath()
      cx.fillStyle = 'rgba(252,248,236,0.62)'; cx.fill()
      // Flag
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
        cx.strokeStyle = 'rgba(52,78,95,0.82)'; cx.lineWidth = 1.4; cx.lineCap = 'round'
        cx.beginPath(); cx.moveTo(0,0); cx.quadraticCurveTo(-8,-w,-16,0); cx.stroke()
        cx.beginPath(); cx.moveTo(0,0); cx.quadraticCurveTo( 8,-w, 16,0); cx.stroke()
        cx.restore()
      })
    }

    /* ── Text-readability overlay ────────────────────────────────────────── */
    const drawOverlay = () => {
      const g = cx.createLinearGradient(0, 0, 0, H)
      g.addColorStop(0,    'rgba(5,16,36,0.52)')
      g.addColorStop(0.42, 'rgba(7,20,42,0.30)')
      g.addColorStop(0.78, 'rgba(9,24,48,0.42)')
      g.addColorStop(1,    'rgba(5,14,32,0.64)')
      cx.fillStyle = g; cx.fillRect(0, 0, W, H)
    }

    /* ═══════════════════════════════════════════════════════════════════════
       MAIN LOOP
    ════════════════════════════════════════════════════════════════════════ */
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50)   // cap delta to avoid jump on tab-return
      last = now; ms += dt
      t += dt * 0.001                        // t in seconds

      if (!dolOn && ms > nextDol) { dolOn = true; dolX = W + 80; dolPh = 0 }

      // Draw order: sky → islands → water → boats (surface) → underwater → seaweed → bubbles → fish → dolphin → overlay → birds
      drawSky()
      drawSun()
      drawFarIslands()
      drawNearIslands()
      drawWater()
      drawBoats(dt)
      drawUnderwater()
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
  }, [])

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
