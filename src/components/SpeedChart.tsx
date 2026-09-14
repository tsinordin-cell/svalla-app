'use client'
// SpeedChart — fart över tid för en tur (tursidan, "det synliga" 2026-09-10).
//
// En serie, ingen legend (rubriken namnger den). Inline-SVG utan bibliotek:
// 2 px linje, yta 10 %, luckor > 60 s bryter kurvan (null i serien) så att
// en paus inte ritas som ett streck. Hovra/dra ger hårkors + värde. "Tabell"
// visar samma data som text för skärmläsare och för den som vill läsa av.
//
// Datat är speedSeries() ur src/lib/tripSplits.ts — medel per 5 s av sparade
// punkter. Ingen tolkning, inga påhittade värden.

import { useMemo, useRef, useState } from 'react'
import type { SpeedSample } from '@/lib/tripSplits'

type Props = {
  series: (SpeedSample | null)[]
  /** Toppfart som sidan visar (bästa 10 s) — ritas som en tunn referenslinje */
  topKn?: number
  avgKn?: number
}

const W = 640, H = 200
const PAD = { l: 34, r: 10, t: 12, b: 24 }

function fmtT(s: number): string {
  const m = Math.floor(s / 60), r = Math.round(s % 60)
  if (m >= 60) return `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m`
  return `${m}:${String(r).padStart(2, '0')}`
}

/** Snygga tick-avstånd för en tidsaxel i sekunder. */
function timeStep(totalS: number): number {
  for (const s of [30, 60, 120, 300, 600, 900, 1800, 3600, 7200]) if (totalS / s <= 7) return s
  return 14400
}

export default function SpeedChart({ series, topKn, avgKn }: Props) {
  const [hover, setHover] = useState<number | null>(null)
  const [table, setTable] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  const samples = useMemo(() => series.filter((s): s is SpeedSample => s !== null), [series])
  const totalS = samples.length ? samples[samples.length - 1]!.t : 0
  const maxKn = Math.max(1, ...samples.map(s => s.kn), topKn ?? 0)
  const yMax = niceMax(maxKn)

  const x = (t: number) => PAD.l + (totalS > 0 ? (t / totalS) * (W - PAD.l - PAD.r) : 0)
  const y = (kn: number) => PAD.t + (1 - kn / yMax) * (H - PAD.t - PAD.b)

  // Kurvan i segment (bryts vid null)
  const paths = useMemo(() => {
    const segs: SpeedSample[][] = []
    let cur: SpeedSample[] = []
    for (const s of series) {
      if (s === null) { if (cur.length) segs.push(cur); cur = []; continue }
      cur.push(s)
    }
    if (cur.length) segs.push(cur)
    return segs.map(seg => {
      const line = seg.map((s, i) => `${i ? 'L' : 'M'}${x(s.t).toFixed(1)},${y(s.kn).toFixed(1)}`).join(' ')
      const base = y(0).toFixed(1)
      const area = `${line} L${x(seg[seg.length - 1]!.t).toFixed(1)},${base} L${x(seg[0]!.t).toFixed(1)},${base} Z`
      return { line, area }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [series, totalS, yMax])

  if (samples.length < 2) return null

  const step = timeStep(totalS)
  const xTicks: number[] = []
  for (let t = 0; t <= totalS; t += step) xTicks.push(t)
  const yTicks = [0, yMax / 2, yMax]

  function onMove(e: React.PointerEvent<SVGSVGElement>) {
    const el = svgRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * W
    const t = ((px - PAD.l) / (W - PAD.l - PAD.r)) * totalS
    let best = 0, bd = Infinity
    for (let i = 0; i < samples.length; i++) {
      const d = Math.abs(samples[i]!.t - t)
      if (d < bd) { bd = d; best = i }
    }
    setHover(best)
  }

  const hs = hover != null ? samples[hover] : null

  return (
    <div style={{ background: 'var(--white)', borderRadius: 20, padding: '14px 12px 10px', boxShadow: '0 1px 6px rgba(0,45,60,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8, padding: '0 4px 8px', flexWrap: 'wrap' }}>
        <div style={{ fontSize: 12, color: 'var(--txt2)', fontVariantNumeric: 'tabular-nums' }}>
          {hs
            ? <><b style={{ color: 'var(--txt)', fontSize: 14 }}>{hs.kn.toFixed(1)} kn</b> vid {fmtT(hs.t)}</>
            : <>{topKn != null && <>Topp <b style={{ color: 'var(--txt)' }}>{topKn.toFixed(1)} kn</b></>}{avgKn != null && <> · Snitt <b style={{ color: 'var(--txt)' }}>{avgKn.toFixed(1)} kn</b></>}</>}
        </div>
        <button type="button" onClick={() => setTable(v => !v)} aria-pressed={table} style={{
          fontSize: 11, fontWeight: 600, color: 'var(--sea)', background: 'var(--sea-08)',
          border: 'none', borderRadius: 999, padding: '4px 10px', cursor: 'pointer',
        }}>
          {table ? 'Kurva' : 'Tabell'}
        </button>
      </div>

      {table ? (
        <div style={{ maxHeight: 260, overflowY: 'auto', fontSize: 12, fontVariantNumeric: 'tabular-nums' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: 'var(--txt3)', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                <th scope="col" style={{ textAlign: 'left', padding: '4px 6px', fontWeight: 600 }}>Tid</th>
                <th scope="col" style={{ textAlign: 'right', padding: '4px 6px', fontWeight: 600 }}>Fart (kn)</th>
              </tr>
            </thead>
            <tbody>
              {series.map((s, i) => s === null
                ? <tr key={i}><td colSpan={2} style={{ padding: '4px 6px', color: 'var(--txt3)', fontStyle: 'italic' }}>— lucka i inspelningen —</td></tr>
                : <tr key={i} style={{ borderTop: '1px solid var(--sea-06)' }}>
                    <td style={{ padding: '4px 6px', color: 'var(--txt2)' }}>{fmtT(s.t)}</td>
                    <td style={{ padding: '4px 6px', textAlign: 'right', color: 'var(--txt)' }}>{s.kn.toFixed(1)}</td>
                  </tr>)}
            </tbody>
          </table>
        </div>
      ) : (
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: '100%', height: 'auto', display: 'block', touchAction: 'pan-y', cursor: 'crosshair' }}
          role="img"
          aria-label={`Fart över tid. Topp ${(topKn ?? maxKn).toFixed(1)} knop.`}
          onPointerMove={onMove}
          onPointerDown={onMove}
          onPointerLeave={() => setHover(null)}
        >
          {/* rutnät + y-etiketter */}
          {yTicks.map(kn => (
            <g key={kn}>
              <line x1={PAD.l} x2={W - PAD.r} y1={y(kn)} y2={y(kn)} stroke="var(--sea-10)" strokeWidth={1} />
              <text x={PAD.l - 6} y={y(kn) + 3.5} textAnchor="end" fontSize={10} fill="var(--txt3)">{Math.round(kn)}</text>
            </g>
          ))}
          {/* x-etiketter */}
          {xTicks.map(t => (
            <text key={t} x={x(t)} y={H - 6} textAnchor={t === 0 ? 'start' : 'middle'} fontSize={10} fill="var(--txt3)">{fmtT(t)}</text>
          ))}
          {/* toppfart-referens */}
          {topKn != null && topKn <= yMax && (
            <line x1={PAD.l} x2={W - PAD.r} y1={y(topKn)} y2={y(topKn)} stroke="var(--amber, #c96e2a)" strokeWidth={1} strokeDasharray="3 4" opacity={0.7} />
          )}
          {/* yta + linje */}
          {paths.map((p, i) => (
            <g key={i}>
              <path d={p.area} fill="var(--sea)" opacity={0.1} />
              <path d={p.line} fill="none" stroke="var(--sea)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            </g>
          ))}
          {/* hårkors */}
          {hs && (
            <g>
              <line x1={x(hs.t)} x2={x(hs.t)} y1={PAD.t} y2={H - PAD.b} stroke="var(--txt3)" strokeWidth={1} strokeDasharray="2 3" />
              <circle cx={x(hs.t)} cy={y(hs.kn)} r={4.5} fill="var(--sea)" stroke="var(--white)" strokeWidth={2} />
            </g>
          )}
        </svg>
      )}
    </div>
  )
}

/** Övre axelgräns: närmaste "snälla" tal ovanför max. */
function niceMax(v: number): number {
  const steps = [5, 10, 15, 20, 30, 40, 50, 60, 80, 100, 150, 200]
  for (const s of steps) if (v <= s) return s
  return Math.ceil(v / 100) * 100
}
