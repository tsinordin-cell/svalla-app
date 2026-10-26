/**
 * Klistermärken (genomskinliga PNG) för delning av en tur ovanpå egen bild i
 * Instagram-storyn. Ritas med satori via next/og: varje div med flera barn
 * måste ha display: flex. Ingen bakgrund = genomskinlig PNG.
 *
 * Fyra mallar: rutt, tal, rutt-tal, delstrackor. Se src/lib/dela-klistermarken.ts.
 */
import type { ReactElement } from 'react'
import { ruttPath, ruttStartSlut, type Punkt, type Stapel } from '@/lib/dela-klistermarken'

export type Tal = { val: string; enhet: string; etikett: string }

const ORANGE = '#ff5c2e'
const SKUGGA = '0 2px 6px rgba(0,0,0,0.55), 0 0 28px rgba(0,0,0,0.35)'
const FONT = 'Inter, system-ui, sans-serif'

function Logga({ storlek = 34, alpha = 0.95 }: { storlek?: number; alpha?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: Math.round(storlek * 0.35) }}>
      <svg viewBox="0 0 20 22" width={storlek * 1.2} height={storlek * 1.2} style={{ display: 'flex' }}>
        <line x1="9" y1="20" x2="9" y2="2" stroke={`rgba(255,255,255,${alpha})`} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M9,3 L18,18 L9,18 Z" fill={`rgba(255,255,255,${alpha})`} />
        <path d="M9,7 L1,17 L9,17 Z" fill={`rgba(255,255,255,${alpha * 0.6})`} />
        <path d="M1,20 Q5,17.5 9,20 Q13,17.5 17,20" stroke={`rgba(255,255,255,${alpha * 0.75})`} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </svg>
      <div style={{ fontSize: storlek, fontWeight: 700, letterSpacing: Math.round(storlek * 0.18), color: `rgba(255,255,255,${alpha})`, textShadow: SKUGGA, display: 'flex' }}>SVALLA</div>
    </div>
  )
}

function Rutt({ pts, W, H, pad, tjock = 1 }: { pts: Punkt[]; W: number; H: number; pad: number; tjock?: number }) {
  const d = ruttPath(pts, W, H, pad)
  const ss = ruttStartSlut(pts, W, H, pad)
  if (!d || !ss) return null
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'flex' }}>
      <path d={d} stroke="rgba(0,0,0,0.35)" strokeWidth={34 * tjock} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke="rgba(255,255,255,0.92)" strokeWidth={26 * tjock} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke={ORANGE} strokeWidth={13 * tjock} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={ss.start[0]} cy={ss.start[1]} r={15 * tjock} fill="#22c55e" stroke="#fff" strokeWidth={5 * tjock} />
      <circle cx={ss.slut[0]} cy={ss.slut[1]} r={15 * tjock} fill={ORANGE} stroke="#fff" strokeWidth={5 * tjock} />
    </svg>
  )
}

function TalRad({ tal, stor = 96 }: { tal: Tal[]; stor?: number }) {
  return (
    <div style={{ display: 'flex', gap: 56, justifyContent: 'center', alignItems: 'flex-end' }}>
      {tal.map(t => (
        <div key={t.etikett} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{ fontSize: Math.round(stor * 0.27), fontWeight: 700, letterSpacing: 3, color: 'rgba(255,255,255,0.85)', textShadow: SKUGGA, display: 'flex' }}>{t.etikett}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <div style={{ fontSize: stor, fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: -2, textShadow: SKUGGA, display: 'flex' }}>{t.val}</div>
            {t.enhet ? <div style={{ fontSize: Math.round(stor * 0.36), fontWeight: 700, color: 'rgba(255,255,255,0.85)', textShadow: SKUGGA, display: 'flex' }}>{t.enhet}</div> : null}
          </div>
        </div>
      ))}
    </div>
  )
}

function TalKolumn({ tal }: { tal: Tal[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 44 }}>
      {tal.map(t => (
        <div key={t.etikett} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 4, color: 'rgba(255,255,255,0.85)', textShadow: SKUGGA, display: 'flex' }}>{t.etikett}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <div style={{ fontSize: 136, fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: -4, textShadow: SKUGGA, display: 'flex' }}>{t.val}</div>
            {t.enhet ? <div style={{ fontSize: 48, fontWeight: 700, color: 'rgba(255,255,255,0.85)', textShadow: SKUGGA, display: 'flex' }}>{t.enhet}</div> : null}
          </div>
        </div>
      ))}
    </div>
  )
}

export type KlisterData = {
  plats: string
  tal: Tal[]
  rutt: Punkt[] | null
  staplar: Stapel[]
}

/** Bara rutten och loggan. 1080×1080. */
export function klisterRutt(d: KlisterData, W: number, H: number): ReactElement {
  return (
    <div style={{ width: W, height: H, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
      <div style={{ display: 'flex', width: W, height: H - 160 }}>
        {d.rutt ? <Rutt pts={d.rutt} W={W} H={H - 160} pad={0.12} tjock={1.3} /> : null}
      </div>
      <div style={{ display: 'flex', height: 160, alignItems: 'center' }}><Logga storlek={38} /></div>
    </div>
  )
}

/** Talen i en kolumn och loggan. 1080×1080. */
export function klisterTal(d: KlisterData, W: number, H: number): ReactElement {
  return (
    <div style={{ width: W, height: H, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 70, fontFamily: FONT }}>
      <TalKolumn tal={d.tal} />
      <Logga storlek={38} />
    </div>
  )
}

/** Plats, rutt, tal och logga. 1080×1350. */
export function klisterRuttTal(d: KlisterData, W: number, H: number): ReactElement {
  const stor = d.plats.length > 22 ? 64 : 84
  return (
    <div style={{ width: W, height: H, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '70px 60px 60px', fontFamily: FONT }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <Logga storlek={28} alpha={0.85} />
        <div style={{ fontSize: stor, fontWeight: 800, color: '#fff', letterSpacing: -2, lineHeight: 1.05, textAlign: 'center', textShadow: SKUGGA, display: 'flex' }}>{d.plats || 'Svalla-tur'}</div>
      </div>
      <div style={{ display: 'flex', width: W - 120, height: 700 }}>
        {d.rutt ? <Rutt pts={d.rutt} W={W - 120} H={700} pad={0.08} /> : null}
      </div>
      <TalRad tal={d.tal} stor={92} />
    </div>
  )
}

/** Delsträckor som staplar. 1080×1350. */
export function klisterDelstrackor(d: KlisterData, W: number, H: number): ReactElement {
  const n = Math.max(1, d.staplar.length)
  const radH = Math.min(84, Math.floor(860 / n))
  const barMax = W - 120 - 150 - 250
  return (
    <div style={{ width: W, height: H, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '70px 60px 60px', fontFamily: FONT }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <Logga storlek={28} alpha={0.85} />
        <div style={{ fontSize: 64, fontWeight: 800, color: '#fff', letterSpacing: -2, textShadow: SKUGGA, display: 'flex' }}>Delsträckor</div>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 3, color: 'rgba(255,255,255,0.8)', textShadow: SKUGGA, display: 'flex' }}>{`${d.plats ? d.plats.toUpperCase() + ' · ' : ''}SNITTFART PER SJÖMIL`}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: W - 120, gap: Math.max(6, Math.round(radH * 0.22)) }}>
        {d.staplar.map(s => (
          <div key={s.etikett} style={{ display: 'flex', alignItems: 'center', height: radH * 0.78, gap: 18 }}>
            <div style={{ width: 132, fontSize: Math.round(radH * 0.4), fontWeight: 700, color: 'rgba(255,255,255,0.9)', textShadow: SKUGGA, display: 'flex' }}>{s.etikett}</div>
            <div style={{ display: 'flex', width: barMax, height: radH * 0.5 }}>
              <div style={{ width: Math.round(barMax * s.andel), height: radH * 0.5, borderRadius: radH * 0.25, background: ORANGE, border: '3px solid rgba(255,255,255,0.85)', display: 'flex' }} />
            </div>
            <div style={{ width: 250, display: 'flex', justifyContent: 'flex-end', gap: 14, alignItems: 'baseline' }}>
              <div style={{ fontSize: Math.round(radH * 0.42), fontWeight: 800, color: '#fff', textShadow: SKUGGA, display: 'flex' }}>{s.fart}</div>
              <div style={{ fontSize: Math.round(radH * 0.32), fontWeight: 600, color: 'rgba(255,255,255,0.75)', textShadow: SKUGGA, display: 'flex' }}>{s.tid}</div>
            </div>
          </div>
        ))}
      </div>
      <TalRad tal={d.tal.slice(0, 3)} stor={72} />
    </div>
  )
}
