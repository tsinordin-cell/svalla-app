'use client'
/**
 * LEVANDE KARTAN, version 2 (2026-11-21). Bild och spel. Logiken ligger i kartmotor.ts.
 * Tryck på en ö så seglar båten till dess brygga, runt allt som ligger emellan. Båten kan aldrig hamna på land.
 * Tio plastpåsar per kust att plocka, räknade var för sig och sparade i webbläsaren. Alla tio ger en medalj.
 * Kartan är stiliserad: lägena kommer ur Svallas data, formerna är påhittade. Plasten ingår i spelet.
 * Premiumprofilen finns inte. Erbjudandet är ett EXEMPEL.
 */
import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ANTAL_PLAST, STRAND, byggVarld, flytta, hittaVag, iLand, narmastFri, radie, slump, hash, styrMot, type Bat, type O, type P } from './kartmotor'

type KO = { slug: string; namn: string; lat: number; lng: number; omrade: 'stockholm' | 'vast' }
type Omrade = 'stockholm' | 'vast'

const NAVY = '#0d2440'
const KUST: Record<Omrade, { namn: string; medalj: string; nyckel: string }> = {
  stockholm: { namn: 'Östkusten', medalj: 'Östkusten städad', nyckel: 'svalla_plast_ost' },
  vast: { namn: 'Västkusten', medalj: 'Västkusten städad', nyckel: 'svalla_plast_vast' },
}
const las = (n: string): number[] => { try { const v: unknown = JSON.parse(localStorage.getItem(n) || '[]'); return Array.isArray(v) ? v.filter((x): x is number => typeof x === 'number') : [] } catch { return [] } }
const spara = (n: string, v: number[]) => { try { localStorage.setItem(n, JSON.stringify(v)) } catch { /* utan lagring fungerar spelet ändå, men minns inte */ } }
const vinkel = (a: number) => { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a }

export default function Karta({ oar }: { oar: KO[] }) {
  const [omrade, setOmrade] = useState<Omrade>('stockholm')
  const canvas = useRef<HTMLCanvasElement>(null)
  const [nara, setNara] = useState<O | null>(null)
  const [plock, setPlock] = useState(0)
  const [medalj, setMedalj] = useState(false)
  const [klara, setKlara] = useState<Record<Omrade, boolean>>({ stockholm: false, vast: false })
  const [omstart, setOmstart] = useState(0)
  const tagna = useRef<Set<number>>(new Set())

  const varld = useMemo(() => byggVarld(oar.filter(o => o.omrade === omrade), omrade === 'stockholm' ? 11 : 23), [oar, omrade])

  useEffect(() => {
    const t = las(KUST[omrade].nyckel).filter(i => i >= 0 && i < varld.plast.length)
    tagna.current = new Set(t)
    setPlock(t.length); setMedalj(false)
    setKlara({ stockholm: las(KUST.stockholm.nyckel).length >= ANTAL_PLAST, vast: las(KUST.vast.nyckel).length >= ANTAL_PLAST })
  }, [omrade, varld, omstart])

  useEffect(() => {
    const c = canvas.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const vast = omrade === 'vast'
    const stil = vast
      ? { hav: '#b9d6e2', djup: '#9cc3d4', grunt: 'rgba(214,238,236,.75)', land: '#cbaaa0', ljus: '#dcc2b9', strand: '#ecdfd8', trad: '', hus: '#a33a2a' }
      : { hav: '#bcdbe6', djup: '#a2cbda', grunt: 'rgba(206,238,228,.8)', land: '#7fa56c', ljus: '#93b67e', strand: '#e4d9c0', trad: '#2f5a3a', hus: '#a33a2a' }
    const bat: Bat = { x: varld.start.x, y: varld.start.y, a: -Math.PI / 2, v: 0 }
    let vag: P[] | null = null
    const steg = { n: 0 }
    let slutmal: P | null = null
    const kam = { x: bat.x, y: bat.y }
    const vy = { kx: 0, ky: 0 }
    const kol: { x: number; y: number; t: number; a: number }[] = []
    const poff: { x: number; y: number; t: number }[] = []
    const tangent: Record<string, boolean> = {}
    let raf = 0, senast = performance.now(), naraSlug = '', fast = 0, sving = 0, forraA = bat.a

    const planera = (till: P) => { const v = hittaVag(varld, bat, till); if (v) { vag = v; steg.n = 0; fast = 0; slutmal = v[v.length - 1] ?? null } }
    const form = (o: O, skala: number, dx = 0, dy = 0) => {
      ctx.beginPath()
      const n = 40
      for (let i = 0; i <= n; i++) { const v = (i / n) * Math.PI * 2, rr = radie(o, v) * skala; const px = o.x + dx + Math.cos(v) * rr, py = o.y + dy + Math.sin(v) * rr; if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py) }
      ctx.closePath()
    }

    const rita = (nu: number) => {
      const dt = Math.min(0.05, (nu - senast) / 1000); senast = nu
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const W = c.clientWidth, H = c.clientHeight
      if (c.width !== Math.round(W * dpr) || c.height !== Math.round(H * dpr)) { c.width = Math.round(W * dpr); c.height = Math.round(H * dpr) }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Styrning: tangenter tar över från rutten
      const gas = (tangent.ArrowUp || tangent.w ? 1 : 0) - (tangent.ArrowDown || tangent.s ? 0.6 : 0)
      const sva = (tangent.ArrowRight || tangent.d ? 1 : 0) - (tangent.ArrowLeft || tangent.a ? 1 : 0)
      if (gas || sva) { vag = null; slutmal = null }
      const fx = bat.x, fy = bat.y
      if (vag) {
        const s = styrMot(varld, bat, vag, steg, dt)
        if (s === 'framme') { vag = null; slutmal = null }
        else if (s === 'vilse' && slutmal) planera(slutmal)
        if (vag && Math.hypot(bat.x - fx, bat.y - fy) < 6 * dt) fast += dt; else fast = 0
        if (fast > 1 && slutmal) planera(slutmal)
      } else {
        bat.a = vinkel(bat.a + sva * 2.4 * dt * (0.35 + Math.min(1, Math.abs(bat.v) / 110)))
        bat.v += gas * 200 * dt; bat.v *= Math.max(0, 1 - 1.3 * dt); bat.v = Math.max(-50, Math.min(190, bat.v))
        if (!flytta(varld, bat, bat.x + Math.cos(bat.a) * bat.v * dt, bat.y + Math.sin(bat.a) * bat.v * dt)) bat.v *= Math.max(0, 1 - 5 * dt)
      }
      sving += ((vinkel(bat.a - forraA) / Math.max(dt, 0.001)) * 0.3 - sving) * Math.min(1, 4 * dt); forraA = bat.a
      if (Math.abs(bat.v) > 24 && (!kol.length || nu - kol[kol.length - 1]!.t > 45)) kol.push({ x: bat.x - Math.cos(bat.a) * 20, y: bat.y - Math.sin(bat.a) * 20, t: nu, a: bat.a })
      while (kol.length && nu - kol[0]!.t > 2200) kol.shift()

      // Plocka plast
      varld.plast.forEach((p, i) => {
        if (tagna.current.has(i) || Math.hypot(p.x - bat.x, p.y - bat.y) > 30) return
        tagna.current.add(i); spara(KUST[omrade].nyckel, [...tagna.current]); poff.push({ x: p.x, y: p.y, t: nu })
        const antal = tagna.current.size
        setPlock(antal)
        if (antal >= ANTAL_PLAST) { setMedalj(true); setKlara(k => ({ ...k, [omrade]: true })) }
      })

      // Kameran följer mjukt och tittar lite framåt
      const fram = Math.min(80, Math.abs(bat.v) * 0.45)
      kam.x += (bat.x + Math.cos(bat.a) * fram - kam.x) * Math.min(1, 3.5 * dt); kam.y += (bat.y + Math.sin(bat.a) * fram - kam.y) * Math.min(1, 3.5 * dt)
      const kx = varld.w <= W ? (varld.w - W) / 2 : Math.max(0, Math.min(varld.w - W, kam.x - W / 2))
      const ky = varld.h <= H ? (varld.h - H) / 2 : Math.max(0, Math.min(varld.h - H, kam.y - H / 2))
      vy.kx = kx; vy.ky = ky
      const syns = (o: O, m: number) => !(o.x + m < kx || o.x - m > kx + W || o.y + m < ky || o.y - m > ky + H)

      // Havet
      const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, stil.hav); g.addColorStop(1, stil.djup)
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
      ctx.save(); ctx.translate(-kx, -ky)
      ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.lineWidth = 1.4; ctx.lineCap = 'round'
      for (let gy = Math.floor(ky / 64) * 64; gy < ky + H + 64; gy += 64) for (let gx = Math.floor(kx / 96) * 96; gx < kx + W + 96; gx += 96) {
        const fas = Math.sin(nu / 1100 + gx * 0.013 + gy * 0.021), off = fas * 6 + ((gy / 64) % 2) * 48
        ctx.globalAlpha = 0.25 + 0.3 * (0.5 + 0.5 * fas)
        ctx.beginPath(); ctx.moveTo(gx + off, gy); ctx.quadraticCurveTo(gx + 9 + off, gy - 4, gx + 18 + off, gy); ctx.quadraticCurveTo(gx + 27 + off, gy + 4, gx + 36 + off, gy); ctx.stroke()
      }
      ctx.globalAlpha = 1
      // Grunt vatten runt öarna
      for (const o of varld.oar) { if (!syns(o, o.r * 2.4)) continue; ctx.fillStyle = 'rgba(255,255,255,.16)'; form(o, 1.62); ctx.fill(); ctx.fillStyle = stil.grunt; form(o, 1.36); ctx.fill() }
      // Kölvatten
      for (const s of kol) {
        const ald = (nu - s.t) / 2200, a = 1 - ald, bredd = 5 + ald * 26
        ctx.strokeStyle = `rgba(255,255,255,${0.55 * a})`; ctx.lineWidth = 2.2 * a + 0.4
        const nx = Math.cos(s.a + Math.PI / 2), ny = Math.sin(s.a + Math.PI / 2)
        ctx.beginPath(); ctx.arc(s.x + nx * bredd, s.y + ny * bredd, 1.6, 0, Math.PI * 2); ctx.arc(s.x - nx * bredd, s.y - ny * bredd, 1.6, 0, Math.PI * 2); ctx.stroke()
      }
      // Rutten ritas fram som en streckad linje
      if (vag && slutmal) {
        ctx.strokeStyle = 'rgba(13,36,64,.5)'; ctx.lineWidth = 2.5; ctx.setLineDash([2, 9]); ctx.lineDashOffset = -nu / 60
        ctx.beginPath(); ctx.moveTo(bat.x, bat.y); for (let i = steg.n; i < vag.length; i++) ctx.lineTo(vag[i]!.x, vag[i]!.y); ctx.stroke(); ctx.setLineDash([])
        const puls = 0.5 + 0.5 * Math.sin(nu / 260)
        ctx.strokeStyle = `rgba(200,100,42,${0.9 - puls * 0.5})`; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(slutmal.x, slutmal.y, 9 + puls * 6, 0, Math.PI * 2); ctx.stroke()
        ctx.fillStyle = '#c8642a'; ctx.beginPath(); ctx.arc(slutmal.x, slutmal.y, 4, 0, Math.PI * 2); ctx.fill()
      }
      // Öarna
      let narmast: O | null = null, nd = 1e9
      for (const o of varld.oar) {
        const d = Math.hypot(bat.x - o.hamn.x, bat.y - o.hamn.y)
        if (d < nd) { nd = d; narmast = o }
        if (!syns(o, o.r * 2.2)) continue
        const r = slump(hash(o.slug) + 9)
        // Bryggan
        const bx = Math.cos(o.brygga), by = Math.sin(o.brygga), b0 = radie(o, o.brygga) * 0.9, b1 = radie(o, o.brygga) * STRAND + 16
        ctx.strokeStyle = '#8a6a4a'; ctx.lineWidth = 5; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(o.x + bx * b0, o.y + by * b0); ctx.lineTo(o.x + bx * b1, o.y + by * b1); ctx.stroke()
        ctx.fillStyle = 'rgba(13,36,64,.16)'; form(o, STRAND, 4, 7); ctx.fill()
        ctx.fillStyle = stil.strand; form(o, STRAND); ctx.fill()
        ctx.fillStyle = stil.land; form(o, 1); ctx.fill()
        ctx.fillStyle = stil.ljus; form(o, 0.7, -o.r * 0.08, -o.r * 0.1); ctx.fill()
        ctx.strokeStyle = '#8a6a4a'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(o.x + bx * b0, o.y + by * b0); ctx.lineTo(o.x + bx * (b0 + 8), o.y + by * (b0 + 8)); ctx.stroke()
        if (stil.trad) {
          for (let i = 0; i < 7; i++) {
            const v = r() * Math.PI * 2, rr = Math.sqrt(r()) * radie(o, v) * 0.7, tx = o.x + Math.cos(v) * rr, ty = o.y + Math.sin(v) * rr
            ctx.fillStyle = 'rgba(13,36,64,.18)'; ctx.beginPath(); ctx.ellipse(tx + 3, ty + 5, 5, 2.4, 0, 0, Math.PI * 2); ctx.fill()
            ctx.fillStyle = stil.trad; ctx.beginPath(); ctx.moveTo(tx, ty - 11); ctx.lineTo(tx - 5.5, ty + 4); ctx.lineTo(tx + 5.5, ty + 4); ctx.closePath(); ctx.fill()
            ctx.fillStyle = '#3d7049'; ctx.beginPath(); ctx.moveTo(tx, ty - 11); ctx.lineTo(tx - 3, ty - 2); ctx.lineTo(tx + 1, ty - 2); ctx.closePath(); ctx.fill()
          }
        } else {
          ctx.strokeStyle = 'rgba(120,80,70,.4)'; ctx.lineWidth = 1.8; ctx.lineCap = 'round'
          for (let i = 0; i < 4; i++) { const v = r() * Math.PI * 2, rr = Math.sqrt(r()) * radie(o, v) * 0.65, tx = o.x + Math.cos(v) * rr, ty = o.y + Math.sin(v) * rr; ctx.beginPath(); ctx.arc(tx, ty, 5 + r() * 7, 0.3 + r(), 2.4 + r()); ctx.stroke() }
        }
        // Röd stuga vid bryggan
        const hx = o.x + bx * b0 * 0.55 - 5, hy = o.y + by * b0 * 0.55 - 4
        ctx.fillStyle = 'rgba(13,36,64,.2)'; ctx.fillRect(hx + 2, hy + 3, 11, 8)
        ctx.fillStyle = stil.hus; ctx.fillRect(hx, hy, 11, 8)
        ctx.fillStyle = '#5b2018'; ctx.beginPath(); ctx.moveTo(hx - 1.5, hy); ctx.lineTo(hx + 5.5, hy - 5); ctx.lineTo(hx + 12.5, hy); ctx.closePath(); ctx.fill()
        ctx.fillStyle = '#fff'; ctx.fillRect(hx + 4.5, hy + 3, 2.2, 5)
        // Namnskylt
        ctx.font = '600 12px Inter, system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        const tb = ctx.measureText(o.namn).width + 16, ly = o.y - o.r * 1.32 - 12
        ctx.fillStyle = 'rgba(255,253,248,.92)'; ctx.beginPath(); ctx.roundRect(o.x - tb / 2, ly - 10, tb, 20, 10); ctx.fill()
        ctx.fillStyle = NAVY; ctx.fillText(o.namn, o.x, ly + 0.5)
      }
      // Plasten guppar
      varld.plast.forEach((p, i) => {
        if (tagna.current.has(i) || p.x < kx - 40 || p.x > kx + W + 40 || p.y < ky - 40 || p.y > ky + H + 40) return
        const gupp = Math.sin(nu / 520 + i * 1.7), ring = (nu / 1600 + i * 0.37) % 1
        ctx.strokeStyle = `rgba(255,255,255,${0.7 * (1 - ring)})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(p.x, p.y + 6, 10 + ring * 14, 4 + ring * 6, 0, 0, Math.PI * 2); ctx.stroke()
        ctx.save(); ctx.translate(p.x, p.y + gupp * 2.5); ctx.rotate(gupp * 0.14)
        ctx.fillStyle = 'rgba(13,36,64,.16)'; ctx.beginPath(); ctx.ellipse(2, 11, 10, 3.5, 0, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = '#fffdf8'; ctx.strokeStyle = '#c8642a'; ctx.lineWidth = 1.6; ctx.lineJoin = 'round'
        ctx.beginPath(); ctx.moveTo(-8, -4); ctx.quadraticCurveTo(-11, 6, -7, 11); ctx.quadraticCurveTo(0, 14, 7, 11); ctx.quadraticCurveTo(11, 6, 8, -4); ctx.quadraticCurveTo(0, -1, -8, -4); ctx.closePath(); ctx.fill(); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(-8, -4); ctx.quadraticCurveTo(-7, -13, -3, -4.5); ctx.moveTo(8, -4); ctx.quadraticCurveTo(7, -13, 3, -4.5); ctx.stroke()
        ctx.fillStyle = '#c8642a'; ctx.beginPath(); ctx.arc(0, 4.5, 2.6, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
      })
      // Båten, sedd uppifrån
      ctx.save(); ctx.translate(bat.x, bat.y); ctx.rotate(bat.a + Math.PI / 2)
      ctx.fillStyle = 'rgba(13,36,64,.2)'; ctx.beginPath(); ctx.ellipse(4, 6, 11, 22, 0, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = '#fffdf8'; ctx.strokeStyle = NAVY; ctx.lineWidth = 2.2; ctx.lineJoin = 'round'
      ctx.beginPath(); ctx.moveTo(0, -24); ctx.bezierCurveTo(11, -10, 11, 8, 7, 19); ctx.lineTo(-7, 19); ctx.bezierCurveTo(-11, 8, -11, -10, 0, -24); ctx.closePath(); ctx.fill(); ctx.stroke()
      ctx.fillStyle = '#e9dcc3'; ctx.beginPath(); ctx.moveTo(0, -15); ctx.bezierCurveTo(6, -6, 6, 6, 4, 14); ctx.lineTo(-4, 14); ctx.bezierCurveTo(-6, 6, -6, -6, 0, -15); ctx.fill()
      ctx.fillStyle = '#1f5f99'; ctx.beginPath(); ctx.arc(-2.6, 9, 2.7, 0, Math.PI * 2); ctx.fill()
      ctx.fillStyle = '#fff'; ctx.strokeStyle = NAVY; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(2.8, 9.5, 2.7, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
      const slag = Math.max(-1, Math.min(1, -sving * 1.6 + Math.sin(nu / 700) * 0.12))
      ctx.fillStyle = '#fff'; ctx.strokeStyle = NAVY; ctx.lineWidth = 1.6
      ctx.beginPath(); ctx.moveTo(0, -17); ctx.quadraticCurveTo(10 * slag + 5 * Math.sign(slag || 1), -4, 13 * slag, 7); ctx.lineTo(0, 5); ctx.closePath(); ctx.fill(); ctx.stroke()
      ctx.fillStyle = NAVY; ctx.beginPath(); ctx.arc(0, -17, 1.6, 0, Math.PI * 2); ctx.fill()
      ctx.restore()
      // Plock: en ring och en etta
      for (const q of poff) {
        const ald = (nu - q.t) / 900; if (ald > 1) continue
        ctx.strokeStyle = `rgba(200,100,42,${1 - ald})`; ctx.lineWidth = 3 * (1 - ald) + 0.5; ctx.beginPath(); ctx.arc(q.x, q.y, 10 + ald * 34, 0, Math.PI * 2); ctx.stroke()
        ctx.fillStyle = `rgba(13,36,64,${1 - ald})`; ctx.font = '700 18px Inter, system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('+1', q.x, q.y - 16 - ald * 26)
      }
      ctx.restore()

      const vid = narmast && nd < 46 && Math.abs(bat.v) < 60 ? narmast : null
      if ((vid?.slug ?? '') !== naraSlug) { naraSlug = vid?.slug ?? ''; setNara(vid) }
      raf = requestAnimationFrame(rita)
    }
    raf = requestAnimationFrame(rita)

    const ner = (e: KeyboardEvent) => { if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) e.preventDefault(); tangent[e.key] = true }
    const upp = (e: KeyboardEvent) => { tangent[e.key] = false }
    const slapp = () => { for (const k of Object.keys(tangent)) tangent[k] = false }
    const klick = (e: MouseEvent) => {
      const r = c.getBoundingClientRect()
      const x = e.clientX - r.left + vy.kx, y = e.clientY - r.top + vy.ky
      let till: P | null = null
      for (const o of varld.oar) if (iLand(o, x, y, 16) || (Math.abs(x - o.x) < 54 && Math.abs(y - (o.y - o.r * 1.32 - 12)) < 14)) { till = o.hamn; break }
      if (!till) varld.plast.forEach((p, i) => { if (!till && !tagna.current.has(i) && Math.hypot(p.x - x, p.y - y) < 44) till = p })
      if (!till) till = narmastFri(varld, x, y)
      if (till) planera(till)
      c.focus({ preventScroll: true })
    }
    c.addEventListener('keydown', ner); c.addEventListener('keyup', upp); c.addEventListener('blur', slapp); c.addEventListener('click', klick)
    return () => { cancelAnimationFrame(raf); c.removeEventListener('keydown', ner); c.removeEventListener('keyup', upp); c.removeEventListener('blur', slapp); c.removeEventListener('click', klick) }
  }, [varld, omrade, omstart])

  const borjaOm = () => { spara(KUST[omrade].nyckel, []); setOmstart(n => n + 1) }
  const kust = KUST[omrade]
  const bada = klara.stockholm && klara.vast

  return (
    <div className="kk">
      <div className="kr-scen kk-yta">
        <canvas ref={canvas} tabIndex={0} aria-label="Spelbar karta. Tryck på en ö så seglar båten dit. Plocka tio plastpåsar. Piltangenterna styr också." />
        <div className="kk-val" role="group" aria-label="Kust">
          {(['stockholm', 'vast'] as const).map(o => (
            <button key={o} type="button" className={omrade === o ? 'pa' : ''} onClick={() => setOmrade(o)}>{KUST[o].namn}{klara[o] && <span aria-label="medalj tagen"> ●</span>}</button>
          ))}
        </div>
        <div className={plock >= ANTAL_PLAST ? 'kk-rakna klar' : 'kk-rakna'} aria-live="polite">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8 Q3 17 6 21 Q12 23 18 21 Q21 17 19 8 Q12 10 5 8 Z" fill="#fffdf8" stroke="#c8642a" strokeWidth="1.6" strokeLinejoin="round" /><path d="M5 8 Q6 1 9.5 7.6 M19 8 Q18 1 14.5 7.6" fill="none" stroke="#c8642a" strokeWidth="1.6" /></svg>
          <b>{plock}/{ANTAL_PLAST}</b><span>plast</span>
          {plock >= ANTAL_PLAST && <button type="button" onClick={() => setMedalj(true)}>Visa medaljen</button>}
        </div>
        <p className="kk-tips">Tryck på en ö eller på vattnet. Piltangenterna styr också.</p>
        {nara && !medalj && (
          <div className="kk-kort">
            <small>Du ligger vid</small>
            <b>{nara.namn}</b>
            <Link href={`/o/${nara.slug}`}>Till ösidan →</Link>
          </div>
        )}
        {medalj && (
          <div className="kk-medalj" role="dialog" aria-label="Medalj">
            <div className="kk-medalj-kort">
              <svg className="kk-medalj-bild" viewBox="0 0 120 150" aria-hidden="true">
                <path d="M38 4 L60 62 L82 4 L66 4 L60 22 L54 4 Z" fill="#1f5f99" /><path d="M38 4 L54 4 L66 40 L60 62 Z" fill="#0d2440" />
                <circle cx="60" cy="96" r="44" fill="#e8b04a" /><circle cx="60" cy="96" r="36" fill="none" stroke="#fff3d6" strokeWidth="2.5" />
                <g transform="translate(60 96) scale(2.6) translate(-9.5 -11)"><line x1="9" y1="20" x2="9" y2="3" stroke="#0d2440" strokeWidth="1.4" strokeLinecap="round" /><path d="M9,4 L18,18 L9,18 Z" fill="#0d2440" /><path d="M9,8 L1,17 L9,17 Z" fill="#0d2440" opacity=".65" /><path d="M2,20 Q6,17.5 9,20 Q12,17.5 17,20" stroke="#0d2440" strokeWidth="1.2" fill="none" strokeLinecap="round" /></g>
              </svg>
              <small>Medalj</small>
              <h4>{kust.medalj}</h4>
              <p>Du plockade alla {ANTAL_PLAST} plastpåsar på {kust.namn.toLowerCase()}.{bada ? ' Båda kusterna är klara.' : ` ${omrade === 'stockholm' ? 'Västkusten' : 'Östkusten'} väntar.`}</p>
              <div className="kk-erbj">
                <span>Exempel</span>
                <b>Bli medlem och få en premiumprofil</b>
                <p>Premiumprofilen finns inte än. Här visas hur erbjudandet kan se ut efter medaljen.</p>
                <Link href="/kom-igang" className="kk-knapp">Bli medlem</Link>
              </div>
              <div className="kk-rad">
                <button type="button" onClick={() => setMedalj(false)}>Fortsätt segla</button>
                {!bada && <button type="button" onClick={() => { setMedalj(false); setOmrade(omrade === 'stockholm' ? 'vast' : 'stockholm') }}>Till {omrade === 'stockholm' ? 'västkusten' : 'östkusten'}</button>}
                <button type="button" onClick={borjaOm}>Börja om</button>
              </div>
            </div>
          </div>
        )}
      </div>
      <p className="kr-not">Stiliserad karta, inte en sjökarta. Öarnas lägen kommer ur Svallas data, men formerna är påhittade och öarna är isärflyttade så att det går att segla mellan dem. Plasten är påhittad och ingår i spelet. Premiumprofilen är ett exempel och finns inte än.</p>
      <style>{CSS}</style>
    </div>
  )
}

const CSS = `
.kk-yta{aspect-ratio:16/9;background:#bcdbe6}
.kk-yta canvas{position:absolute;inset:0;width:100%;height:100%;outline:none;touch-action:pan-y;cursor:pointer}
.kk-yta canvas:focus-visible{box-shadow:inset 0 0 0 3px #c8642a}
.kk-val{position:absolute;top:14px;left:14px;display:inline-flex;background:rgba(255,253,248,.94);border-radius:999px;padding:3px;box-shadow:0 6px 18px rgba(13,36,64,.14)}
.kk-val button{border:none;background:none;font:inherit;font-size:13px;font-weight:600;color:#0d2440;padding:7px 13px;border-radius:999px;cursor:pointer}
.kk-val button.pa{background:#0d2440;color:#fff}
.kk-val button span{color:#e8b04a}
.kk-rakna{position:absolute;top:14px;right:14px;display:flex;align-items:center;gap:7px;background:rgba(255,253,248,.94);border-radius:999px;padding:6px 14px 6px 10px;box-shadow:0 6px 18px rgba(13,36,64,.14);color:#0d2440}
.kk-rakna svg{width:22px;height:22px}
.kk-rakna b{font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:700;line-height:1}
.kk-rakna span{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#5c6f76}
.kk-rakna.klar{background:#e8b04a}
.kk-rakna.klar span{color:#0d2440}
.kk-rakna button{border:none;background:#0d2440;color:#fff;font:inherit;font-size:12px;font-weight:600;border-radius:999px;padding:5px 10px;cursor:pointer;margin-left:4px}
.kk-tips{position:absolute;left:0;right:0;bottom:12px;margin:0;text-align:center;font-size:12px;font-weight:600;color:#0d2440;opacity:.75;pointer-events:none}
.kk-kort{position:absolute;right:14px;bottom:38px;background:#fffdf8;border-radius:16px;padding:12px 16px;display:flex;flex-direction:column;gap:2px;box-shadow:0 10px 26px rgba(13,36,64,.18);animation:kkUpp .3s ease both}
.kk-kort small{font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#b5591a}
.kk-kort b{font-family:'Playfair Display',Georgia,serif;font-weight:400;font-size:22px;color:#0d2440}
.kk-kort a{font-size:13px;font-weight:600}
@keyframes kkUpp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.kk-medalj{position:absolute;inset:0;z-index:6;display:flex;align-items:center;justify-content:center;padding:14px;background:rgba(13,36,64,.5);animation:kkTona .3s ease both;overflow:auto}
@keyframes kkTona{from{opacity:0}to{opacity:1}}
.kk-medalj-kort{background:#fffdf8;border-radius:22px;padding:18px 22px 16px;max-width:400px;width:100%;text-align:center;box-shadow:0 24px 60px rgba(13,36,64,.35);animation:kkUpp .45s cubic-bezier(.2,.8,.2,1) both}
.kk-medalj-bild{width:74px;height:auto;display:block;margin:0 auto 4px;animation:kkGunga 2.6s ease-in-out infinite;transform-origin:50% 0}
@keyframes kkGunga{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}
.kk-medalj-kort>small{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#b5591a}
.kk-medalj-kort h4{font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:26px;line-height:1.1;margin:2px 0 6px;color:#0d2440}
.kk-medalj-kort>p{font-size:14px;line-height:1.5;color:#3c4d58;margin:0}
.kk-erbj{margin-top:12px;border:1.5px dashed rgba(13,36,64,.25);border-radius:16px;padding:12px 14px;display:flex;flex-direction:column;align-items:center;gap:5px}
.kk-erbj span{font-size:10.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#8a5a2b;background:rgba(181,89,26,.12);border-radius:999px;padding:3px 9px}
.kk-erbj b{font-size:16px;color:#0d2440}
.kk-erbj p{font-size:12.5px;line-height:1.45;color:#5c6f76;margin:0}
.kk-knapp{margin-top:4px;background:#b5591a;color:#fff !important;font-weight:700;font-size:14px;border-radius:999px;padding:9px 20px;text-decoration:none}
.kk-rad{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:12px}
.kk-rad button{border:1.5px solid rgba(13,36,64,.25);background:none;color:#0d2440;font:inherit;font-size:13px;font-weight:600;border-radius:999px;padding:7px 13px;cursor:pointer}
@media (max-width:860px){
  .kk-yta{aspect-ratio:4/5}
  .kk-val button{font-size:12px;padding:6px 10px}
  .kk-rakna{padding:5px 11px 5px 8px}
  .kk-rakna b{font-size:17px}
  .kk-rakna span{display:none}
  .kk-kort{left:12px;right:12px}
  .kk-tips{font-size:11px}
  .kk-medalj{position:fixed;z-index:1000}
  .kk-medalj-kort{padding:16px 16px 14px;max-height:calc(100vh - 28px);overflow:auto}
  .kk-medalj-bild{width:54px}
  .kk-medalj-kort h4{font-size:22px}
}
`
