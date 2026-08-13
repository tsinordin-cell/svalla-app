import type { Island } from '@/app/o/island-data'

/**
 * Liten skärgårdsvinjett för ö-kort i listor.
 *
 * Ersätter den tidigare lösningen där OG-bilden (1200×630, med inbränd
 * rubriktext) skalades ner till 64×48 — texten blev oläslig gröt och varje
 * kort kostade ett bildanrop. Den här ritas som inline-SVG: noll requests,
 * inget CLS, och den skalar lika bra i 40 px som i 200.
 *
 * Motivet varieras deterministiskt ur slug:en, så varje ö får sin egen
 * siluett men ser likadan ut vid varje rendering. Färgerna följer regionen:
 * norra skärgården är svalare, Bohuslän gråare granit, södra varmare.
 */

type Palette = {
  skyTop: string; skyBot: string
  waterTop: string; waterBot: string
  far: string; near: string; nearShade: string
  tree: string; sun: string
}

const PALETTES: Record<Island['region'], Palette> = {
  norra: {
    skyTop: '#7ba6cc', skyBot: '#b4cee2',
    waterTop: '#3f7ba8', waterBot: '#255677',
    far: '#8fa6b4', near: '#4f7f4a', nearShade: '#44703c',
    tree: '#2b5230', sun: '#f5dc86',
  },
  mellersta: {
    skyTop: '#8fb8dc', skyBot: '#c0d6e8',
    waterTop: '#4a86bc', waterBot: '#2a5a8c',
    far: '#a3b6c2', near: '#5f8f4e', nearShade: '#527f42',
    tree: '#2f5a30', sun: '#f7d868',
  },
  'södra': {
    skyTop: '#96bcd8', skyBot: '#d2dfe4',
    waterTop: '#4f8ab4', waterBot: '#2c5f80',
    far: '#aebcc2', near: '#67934f', nearShade: '#588243',
    tree: '#345d33', sun: '#f8dc78',
  },
  bohuslan: {
    skyTop: '#a2c0d6', skyBot: '#d8e4ec',
    waterTop: '#4a8ab0', waterBot: '#2a6084',
    far: '#c6bbb0', near: '#c0b2a4', nearShade: '#a89a8c',
    tree: '#3f6238', sun: '#f7dc8c',
  },
  goteborg: {
    skyTop: '#9dbdd4', skyBot: '#d4e2ea',
    waterTop: '#48849f', waterBot: '#2a5c74',
    far: '#c2b8ae', near: '#b8ab9e', nearShade: '#a0958a',
    tree: '#3c6038', sun: '#f7dc8c',
  },
  ovriga: {
    skyTop: '#8fb4d0', skyBot: '#c8dae6',
    waterTop: '#4682ac', waterBot: '#2a5878',
    far: '#a8b6bc', near: '#5f8f4e', nearShade: '#527f42',
    tree: '#2f5a30', sun: '#f7d868',
  },
}

/** Stabil 32-bitars hash — samma slug ger alltid samma motiv. */
function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export default function IslandThumb({
  slug,
  region = 'mellersta',
  width = 64,
  height = 48,
  radius = 8,
  className,
}: {
  slug: string
  region?: Island['region']
  width?: number
  height?: number
  radius?: number
  className?: string
}) {
  const p = PALETTES[region] ?? PALETTES.mellersta
  const h = hash(slug)

  // Varje egenskap tar sina egna bitar ur hashen.
  const shape = h % 4                       // huvudöns form
  const sunLeft = ((h >> 2) & 1) === 0      // solens sida
  const detail = (h >> 3) % 3               // gran / stuga / båt
  const farShift = ((h >> 5) % 13) - 6      // bakre öns förskjutning
  const nearShift = ((h >> 9) % 11) - 5
  const sunUp = ((h >> 13) % 7) - 3

  const id = `it-${h.toString(36)}`
  const sunX = sunLeft ? 16 : 64
  const sunY = 11 + sunUp * 0.6

  // Fyra huvudsilhuetter: kupol, långsträckt, dubbelkulle, låg klippa.
  const NEAR = [
    `M${8 + nearShift},38 Q${30 + nearShift},14 ${48 + nearShift},20 Q${62 + nearShift},25 ${72 + nearShift},38 Z`,
    `M${-2 + nearShift},38 Q${20 + nearShift},22 ${44 + nearShift},24 Q${66 + nearShift},26 ${84 + nearShift},38 Z`,
    `M${2 + nearShift},38 Q${16 + nearShift},18 ${30 + nearShift},27 Q${40 + nearShift},16 ${56 + nearShift},22 Q${70 + nearShift},27 ${80 + nearShift},38 Z`,
    `M${6 + nearShift},38 Q${26 + nearShift},26 ${46 + nearShift},28 Q${64 + nearShift},29 ${76 + nearShift},38 Z`,
  ][shape]

  const treeX = 22 + nearShift + (shape === 2 ? 8 : 0)

  return (
    <svg
      viewBox="0 0 80 60"
      width={width}
      height={height}
      className={className}
      role="presentation"
      aria-hidden="true"
      style={{ display: 'block', borderRadius: radius, flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={`${id}-s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.skyTop} />
          <stop offset="1" stopColor={p.skyBot} />
        </linearGradient>
        <linearGradient id={`${id}-w`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.waterTop} />
          <stop offset="1" stopColor={p.waterBot} />
        </linearGradient>
        <clipPath id={`${id}-c`}>
          <rect width="80" height="60" rx={radius * (80 / width)} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}-c)`}>
        <rect width="80" height="40" fill={`url(#${id}-s)`} />
        <circle cx={sunX} cy={sunY} r="4.6" fill={p.sun} opacity="0.95" />

        {/* Bakre ö — dis */}
        <ellipse cx={40 + farShift} cy="40" rx="34" ry="9" fill={p.far} opacity="0.7" />

        {/* Huvudö */}
        <path d={NEAR} fill={p.near} />
        <path d={NEAR} fill={p.nearShade} opacity="0.45" transform="translate(0,3)" />

        {/* En detalj räcker i den här storleken */}
        {detail === 0 && (
          <g>
            <path d={`M${treeX},33 L${treeX + 3.4},24 L${treeX + 6.8},33 Z`} fill={p.tree} />
            <rect x={treeX + 2.7} y="33" width="1.6" height="3" fill="#5a3a22" />
          </g>
        )}
        {detail === 1 && (
          <g transform={`translate(${treeX - 1},27)`}>
            <rect width="10" height="7" fill="#a83232" />
            <path d="M-1.4,0 L5,-4.6 L11.4,0 Z" fill="#4a2a1a" />
          </g>
        )}
        {detail === 2 && (
          <g transform={`translate(${52 + nearShift},29)`}>
            <path d="M5,0 L10,8 L5,8 Z" fill="#fafaf5" />
            <path d="M4,0 L0,8 L4,8 Z" fill="#eae6da" />
            <path d="M-1,8.6 Q5,7.6 11,8.6 L9.6,11 Q5,11.8 0.4,11 Z" fill="#c94848" />
          </g>
        )}

        <rect y="38" width="80" height="22" fill={`url(#${id}-w)`} />
        <rect y="38" width="80" height="1" fill="#ffffff" opacity="0.35" />
      </g>
    </svg>
  )
}
