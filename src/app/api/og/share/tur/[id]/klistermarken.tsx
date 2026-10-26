/**
 * Klistermärken (genomskinliga PNG) för delning av en tur ovanpå egen bild i
 * Instagram-storyn. Ritas med satori via next/og: varje div med flera barn
 * måste ha display: flex. Ingen bakgrund = genomskinlig PNG.
 *
 * Fyra mallar: rutt, tal, rutt-tal, delstrackor. Se src/lib/dela-klistermarken.ts.
 *
 * Formspråk (2026-10-26, Thomas: "lika proffsigt som andra stora appar"): en enda
 * tjock ruttlinje med runda ändar, vit text med lätt skugga, stora tal med små
 * spärrade etiketter ovanför, loggan alltid nederst i mitten. Ingen vit kant,
 * inga start- och slutprickar, inga ramar.
 */
import type { ReactElement } from 'react'
import { ruttPath, type Punkt, type Stapel } from '@/lib/dela-klistermarken'

export type Tal = { val: string; enhet: string; etikett: string }

const ORANGE = '#ff5c2e'
const VIT = '#ffffff'
const VIT_SVAG = 'rgba(255,255,255,0.78)'
const SKUGGA = '0 1px 2px rgba(0,0,0,0.40), 0 6px 24px rgba(0,0,0,0.28)'
const FONT = 'Inter, system-ui, sans-serif'

/**
 * Svallas logga: seglet (samma som SvallaLogo.tsx) och ordmärket SVALLA i
 * Playfair Display, som sajtens rubriker. `pill` lägger en mörk, halvgenomskinlig
 * platta bakom så att loggan syns på kartor och ljusa bilder (korten); på
 * klistermärkena ritas den fritt med skugga, som Stravas.
 */
export function Logga({ storlek = 34, pill = false }: { storlek?: number; pill?: boolean }) {
  const ikon = Math.round(storlek * 1.35)
  const inre = (
    <div style={{ display: 'flex', alignItems: 'center', gap: Math.round(storlek * 0.42) }}>
      <svg viewBox="0 0 20 22" width={ikon} height={ikon} style={pill ? { display: 'flex' } : { display: 'flex', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.45))' }}>
        <line x1="9" y1="20" x2="9" y2="3" stroke={VIT} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9,4 L18,18 L9,18 Z" fill={VIT} opacity="0.95" />
        <path d="M9,8 L1,17 L9,17 Z" fill={VIT} opacity="0.55" />
        <path d="M2,20 Q6,17.5 9,20 Q12,17.5 17,20" stroke={VIT} strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.8" />
      </svg>
      <div style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: storlek, fontWeight: 700, letterSpacing: Math.round(storlek * 0.2), color: VIT, display: 'flex', paddingTop: Math.round(storlek * 0.08), ...(pill ? {} : { textShadow: SKUGGA }) }}>SVALLA</div>
    </div>
  )
  if (!pill) return inre
  return (
    <div style={{
      display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.48)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 999,
      paddingTop: Math.round(storlek * 0.32), paddingBottom: Math.round(storlek * 0.32), paddingLeft: Math.round(storlek * 0.55), paddingRight: Math.round(storlek * 0.8),
    }}>
      {inre}
    </div>
  )
}

/** En tjock linje i Svallas orange med runda ändar, och en knappt synlig mörk kant så att den syns på ljusa bilder. */
function Rutt({ pts, W, H, pad, tjock = 30 }: { pts: Punkt[]; W: number; H: number; pad: number; tjock?: number }) {
  const d = ruttPath(pts, W, H, pad)
  if (!d) return null
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'flex' }}>
      <path d={d} stroke="rgba(0,0,0,0.22)" strokeWidth={tjock + 8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} stroke={ORANGE} strokeWidth={tjock} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Etikett({ text, storlek = 26 }: { text: string; storlek?: number }) {
  return <div style={{ fontSize: storlek, fontWeight: 700, letterSpacing: Math.round(storlek * 0.12), color: VIT_SVAG, textShadow: SKUGGA, display: 'flex' }}>{text}</div>
}

function Varde({ val, enhet, storlek }: { val: string; enhet: string; storlek: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: Math.round(storlek * 0.08) }}>
      <div style={{ fontSize: storlek, fontWeight: 800, color: VIT, lineHeight: 1, letterSpacing: Math.round(-storlek * 0.035), textShadow: SKUGGA, display: 'flex' }}>{val}</div>
      {enhet ? <div style={{ fontSize: Math.round(storlek * 0.34), fontWeight: 700, color: VIT_SVAG, textShadow: SKUGGA, display: 'flex' }}>{enhet}</div> : null}
    </div>
  )
}

/** Tal i en rad, vänsterställda, som i en appvy. */
function TalRad({ tal, stor = 88, gap = 64, justera = 'flex-start' }: { tal: Tal[]; stor?: number; gap?: number; justera?: 'flex-start' | 'center' }) {
  return (
    <div style={{ display: 'flex', gap, justifyContent: justera, alignItems: 'flex-end', width: '100%' }}>
      {tal.map(t => (
        <div key={t.etikett} style={{ display: 'flex', flexDirection: 'column', alignItems: justera === 'center' ? 'center' : 'flex-start', gap: 10 }}>
          <Etikett text={t.etikett} storlek={Math.round(stor * 0.27)} />
          <Varde val={t.val} enhet={t.enhet} storlek={stor} />
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
  const rh = H - 200
  return (
    <div style={{ width: W, height: H, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: FONT }}>
      <div style={{ display: 'flex', width: W, height: rh }}>
        {d.rutt ? <Rutt pts={d.rutt} W={W} H={rh} pad={0.09} tjock={34} /> : null}
      </div>
      <div style={{ display: 'flex', height: 200, alignItems: 'center' }}><Logga storlek={44} /></div>
    </div>
  )
}

/** Talen i en kolumn, centrerade, loggan under. 1080×1080. */
export function klisterTal(d: KlisterData, W: number, H: number): ReactElement {
  const n = Math.max(1, d.tal.length)
  const stor = n >= 3 ? 150 : 180
  return (
    <div style={{ width: W, height: H, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 60, fontFamily: FONT }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 46 }}>
        {d.tal.map(t => (
          <div key={t.etikett} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <Etikett text={t.etikett} storlek={30} />
            <Varde val={t.val} enhet={t.enhet} storlek={stor} />
          </div>
        ))}
      </div>
      <Logga storlek={40} />
    </div>
  )
}

/** Plats och rutt överst, talen under, loggan nederst. 1080×1350. */
export function klisterRuttTal(d: KlisterData, W: number, H: number): ReactElement {
  const platsStorlek = d.plats.length > 24 ? 60 : d.plats.length > 16 ? 76 : 92
  const IW = W - 2 * 72
  return (
    <div style={{ width: W, height: H, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', padding: '84px 72px 72px', fontFamily: FONT }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: IW }}>
        <Etikett text="LOGGAD MED SVALLA" storlek={26} />
        <div style={{ fontSize: platsStorlek, fontWeight: 800, color: VIT, letterSpacing: Math.round(-platsStorlek * 0.03), lineHeight: 1.05, textShadow: SKUGGA, display: 'flex' }}>{d.plats || 'Svalla-tur'}</div>
      </div>
      <div style={{ display: 'flex', width: IW, height: 620 }}>
        {d.rutt ? <Rutt pts={d.rutt} W={IW} H={620} pad={0.06} tjock={28} /> : null}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 54, width: IW }}>
        <TalRad tal={d.tal} stor={96} gap={72} />
        <Logga storlek={34} />
      </div>
    </div>
  )
}

/** Delsträckor som staplar: snittfart per sjömil. 1080×1350. */
export function klisterDelstrackor(d: KlisterData, W: number, H: number): ReactElement {
  const IW = W - 2 * 72
  const n = Math.max(1, d.staplar.length)
  const radH = Math.min(78, Math.floor(760 / n))
  const etikettB = 120, talB = 300
  const barMax = IW - etikettB - talB - 2 * 24
  return (
    <div style={{ width: W, height: H, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', padding: '84px 72px 72px', fontFamily: FONT }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: IW }}>
        <Etikett text={d.plats ? `${d.plats.toUpperCase()} · SNITTFART PER SJÖMIL` : 'SNITTFART PER SJÖMIL'} storlek={26} />
        <div style={{ fontSize: 84, fontWeight: 800, color: VIT, letterSpacing: -3, lineHeight: 1.05, textShadow: SKUGGA, display: 'flex' }}>Delsträckor</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: IW, gap: Math.max(8, Math.round(radH * 0.26)) }}>
        {d.staplar.map(s => (
          <div key={s.etikett} style={{ display: 'flex', alignItems: 'center', height: radH * 0.74, gap: 24 }}>
            <div style={{ width: etikettB, fontSize: Math.round(radH * 0.42), fontWeight: 700, color: VIT_SVAG, textShadow: SKUGGA, display: 'flex', whiteSpace: 'nowrap' }}>{s.etikett}</div>
            <div style={{ display: 'flex', width: barMax, height: radH * 0.56 }}>
              <div style={{ width: Math.max(radH * 0.56, Math.round(barMax * s.andel)), height: radH * 0.56, borderRadius: radH * 0.28, background: ORANGE, boxShadow: '0 2px 8px rgba(0,0,0,0.25)', display: 'flex' }} />
            </div>
            <div style={{ width: talB, display: 'flex', justifyContent: 'flex-end', gap: 16, alignItems: 'baseline' }}>
              <div style={{ fontSize: Math.round(radH * 0.46), fontWeight: 800, color: VIT, textShadow: SKUGGA, display: 'flex' }}>{s.fart}</div>
              <div style={{ fontSize: Math.round(radH * 0.34), fontWeight: 600, color: VIT_SVAG, textShadow: SKUGGA, display: 'flex' }}>{s.tid}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 48, width: IW }}>
        <TalRad tal={d.tal.slice(0, 3)} stor={76} gap={64} />
        <Logga storlek={34} />
      </div>
    </div>
  )
}
