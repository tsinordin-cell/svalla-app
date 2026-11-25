import { ORDBILD_LITEN } from './svallaOrdbild'

/**
 * SVALLAS LOGGA (B). Beslut Max 2026-11-21: två segel, mast och våg under.
 * Samma form ska finnas i favicon, appikoner och delningsbilder. Byt inte form utan att Max ber om det.
 *
 * Avståndet i SVALLA (Max och Oskar 2026-11-24): tätare och optiskt jämnt, så att det inte läses "SV ALLA".
 * 0,12 em mellan bokstäverna (var 0,167 em) och kerning i paren V–A, A–L, L–L och L–A via dx.
 * 2026-11-25: SVALLA är Playfair Display som ritade former (svallaOrdbild.ts), samma typsnitt som rubrikerna.
 *
 * EN STORLEK: alltid 28 x 90 px (Max 2026-11-25). Vid 28 px är en enhet i viewBox exakt en pixel,
 * så SVALLA står på hel pixel (baslinje 20) och versalerna blir exakt 11 px höga. Det ger skarpast
 * kanter på vanliga skärmar. Andra höjder (22, 24, 26, 30) hamnar mellan pixlarna och ser suddiga ut.
 * height finns kvar för att gamla anrop ska fungera, men används inte.
 */
export default function SvallaLogo({ color = '#ffffff' }: { height?: number; color?: string }) {
  return (
    <svg viewBox="0 0 90 28" width={90} height={28} xmlns="http://www.w3.org/2000/svg" aria-label="Svalla" style={{ display: 'block' }}>
      <g transform="translate(0,2)">
        <line x1="9" y1="20" x2="9" y2="3" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M9,4 L18,18 L9,18 Z" fill={color} opacity="0.9"/>
        <path d="M9,8 L1,17 L9,17 Z" fill={color} opacity="0.5"/>
        <path d="M2,20 Q6,17.5 9,20 Q12,17.5 17,20" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7"/>
      </g>
      <path transform="translate(23 20) scale(0.0155) translate(-55 0)" fill={color} d={ORDBILD_LITEN} />
    </svg>
  )
}

/** Bara seglet ur loggan, utan texten (Tom 2026-11-22). Samma form som SvallaLogo. */
export function SvallaSegel({ size = 48, color = '#ffffff' }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 3 19 21" width={size * 19 / 21} height={size} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ display: 'block' }}>
      <g transform="translate(0,2)">
        <line x1="9" y1="20" x2="9" y2="3" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M9,4 L18,18 L9,18 Z" fill={color} opacity="0.9"/>
        <path d="M9,8 L1,17 L9,17 Z" fill={color} opacity="0.5"/>
        <path d="M2,20 Q6,17.5 9,20 Q12,17.5 17,20" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7"/>
      </g>
    </svg>
  )
}
