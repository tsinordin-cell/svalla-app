/**
 * SvallaIcons — nautiska ikoner med karaktär
 *
 * Dessa är Svallas egna ikoner — det Lucide inte har.
 * Stil: havstema, Thorkel-känsla, levande detaljer.
 * Alla: viewBox 0 0 24 24, stroke="currentColor", fill="none" (om inget annat anges)
 *
 * Användning:
 *   import { IconSailboat, IconAnchor } from '@/components/icons/SvallaIcons'
 *   <IconSailboat size={24} className="text-accent" />
 */

import React from 'react'

interface IconProps {
  size?: number
  className?: string
  style?: React.CSSProperties
  strokeWidth?: number
}

const SVG = (
  size: number,
  className: string | undefined,
  style: React.CSSProperties | undefined,
  sw: number,
  children: React.ReactNode,
) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
    aria-hidden="true"
  >
    {children}
  </svg>
)

// ─────────────────────────────────────────────────────────────────────────────
// BÅTAR
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Segelbåt — klassisk sloop-profil med focksegel, storsegel,
 * rakat master och kölfinne. Pennant i toppen.
 */
export function IconSailboat({ size = 24, className, style, strokeWidth = 1.75 }: IconProps) {
  return SVG(size, className, style, strokeWidth,
    <>
      {/* Mast — rakar akter */}
      <line x1="10.5" y1="2" x2="11.5" y2="16.5" />
      {/* Boom — horisontell rå */}
      <line x1="11.5" y1="16.5" x2="19" y2="15.5" strokeWidth={strokeWidth * 0.7} />
      {/* Storsegel — stor triangel aktom mast */}
      <path d="M10.5 2 L19 15.5 L11.5 16.5 Z" />
      {/* Focksegel — framtriangel */}
      <path d="M10.5 6 L3 16.5 L11.5 16.5" />
      {/* Skrovlinje — vattenlinjen */}
      <line x1="2.5" y1="16.5" x2="21.5" y2="16.5" />
      {/* Skrovet — böjd undervattendel */}
      <path d="M2.5 16.5 Q7 19 12 20 Q17 19 21.5 16.5" />
      {/* Kölfinne */}
      <path d="M12 20 L11.5 22.5 L12.5 22.5" strokeWidth={strokeWidth * 0.9} />
      {/* Pennant i toppen */}
      <path d="M10.5 2 L14 3.2 L10.5 4.8" fill="currentColor" stroke="none" />
      {/* Liten vågkrusning under */}
      <path d="M3 21.5 Q7.5 20 12 21 Q16.5 22 21 21" strokeWidth={strokeWidth * 0.55} opacity={0.5} />
    </>
  )
}

/**
 * Motorbåt — planerande öppen båt med kajuta,
 * vindruta och svall bakom.
 */
export function IconMotorboat({ size = 24, className, style, strokeWidth = 1.75 }: IconProps) {
  return SVG(size, className, style, strokeWidth,
    <>
      {/* Skrov i planande läge — nosen lite uppåt */}
      <path d="M2 18 L5 13 L8 12.5 L19 12 L22.5 14.5 L22.5 18 Q12 21 2 18 Z" />
      {/* Kajuta */}
      <path d="M9 12.5 L9 9 L15.5 9 L18 12" />
      {/* Vindruta — snedställd */}
      <path d="M9 12.5 L11 9.5" strokeWidth={strokeWidth * 0.65} />
      <path d="M15.5 9 L14.5 12" strokeWidth={strokeWidth * 0.65} />
      {/* Motor / akter-detalj */}
      <path d="M22 14.5 L23.5 17" strokeWidth={strokeWidth * 0.8} />
      {/* Svall-linjer bakom */}
      <path d="M2 19.5 Q6 17.5 11 18.5 Q16 19.5 20 19" strokeWidth={strokeWidth * 0.55} opacity={0.65} />
      <path d="M1.5 21.5 Q7 19.5 13 20.5 Q18 21.5 22 21" strokeWidth={strokeWidth * 0.4} opacity={0.35} />
    </>
  )
}

/**
 * Kajak — låg, snabb, tvåbladig paddelsiluett
 * med paddlare och cockpit.
 */
export function IconKayak({ size = 24, className, style, strokeWidth = 1.75 }: IconProps) {
  return SVG(size, className, style, strokeWidth,
    <>
      {/* Skrov — långt, spetsigt i båda ändar */}
      <path d="M1.5 14.5 Q12 12 22.5 14.5 Q12 17 1.5 14.5 Z" />
      {/* Cockpit-öppning */}
      <ellipse cx="11.5" cy="14.5" rx="3.5" ry="1.1" />
      {/* Paddel — diagonal */}
      <line x1="3.5" y1="9.5" x2="20.5" y2="19.5" />
      {/* Paddel-blad vänster */}
      <path d="M3.5 9.5 Q1.5 8 2 11 Q2.5 12 3.5 9.5" />
      {/* Paddel-blad höger */}
      <path d="M20.5 19.5 Q22.5 21 22 18 Q21.5 17 20.5 19.5" />
      {/* Paddlare — huvud */}
      <circle cx="11.5" cy="12.5" r="1.6" />
    </>
  )
}

/**
 * RIB — gummibåt med tydliga flytrör,
 * konsol och motor bakom.
 */
export function IconRIB({ size = 24, className, style, strokeWidth = 1.75 }: IconProps) {
  return SVG(size, className, style, strokeWidth,
    <>
      {/* Uppblåst flytrör — tjockt rundat skrov */}
      <path d="M3 16 Q3 11.5 8 11 L17 11 Q22 11 22 15.5 Q22 19 17 19.5 L7 19.5 Q3 19 3 16 Z" />
      {/* Trä-/aluminiumdäck inuti */}
      <path d="M7 11.5 L7 19 M17 11.5 L17 19" strokeWidth={strokeWidth * 0.6} opacity={0.5} />
      {/* Konsol / ratt */}
      <path d="M10 11 L10 8 L14 8 L14 11" />
      <line x1="11.5" y1="8" x2="12.5" y2="8" strokeWidth={strokeWidth * 0.6} />
      {/* Motor vid aktern */}
      <path d="M22 13 L23.5 13 L23.5 17" strokeWidth={strokeWidth * 0.8} />
      {/* Bow eye (bogsering-ring i nosen) */}
      <circle cx="3" cy="15.5" r="0.8" />
      {/* Svall */}
      <path d="M2 20.5 Q7 19 13 20 Q18 21 23 20" strokeWidth={strokeWidth * 0.45} opacity={0.5} />
    </>
  )
}

/**
 * SUP — stand-up paddle, paddlare i rörelse
 * med lång paddel och brett bräde.
 */
export function IconSUP({ size = 24, className, style, strokeWidth = 1.75 }: IconProps) {
  return SVG(size, className, style, strokeWidth,
    <>
      {/* Bräde — avrundad surfbräde-form */}
      <path d="M1.5 17 Q12 15 22.5 17 Q12 20 1.5 17 Z" />
      {/* Paddel — lång diagonal */}
      <line x1="8" y1="4" x2="17" y2="20" />
      {/* Paddel-blad nertill */}
      <path d="M17 20 Q18.5 21.5 19.5 19.5 Q18 17.5 17 20" />
      {/* Paddlarens kropp */}
      <line x1="12" y1="8" x2="11" y2="15.5" strokeWidth={strokeWidth * 0.8} />
      {/* Huvud */}
      <circle cx="12.5" cy="6.5" r="1.8" />
      {/* Armar — ut mot paddeln */}
      <path d="M12 10 L14.5 12" strokeWidth={strokeWidth * 0.7} />
      <path d="M11.5 10.5 L9.5 12" strokeWidth={strokeWidth * 0.7} />
      {/* Liten svall vid brädet */}
      <path d="M3 19 Q7 17.5 12 18.5 Q17 19.5 21 19" strokeWidth={strokeWidth * 0.45} opacity={0.5} />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Ankare — traditionellt admialties-ankare med stock,
 * skaft, armarna och tydliga flugor. Liten rep-detalj.
 */
export function IconAnchor({ size = 24, className, style, strokeWidth = 1.75 }: IconProps) {
  return SVG(size, className, style, strokeWidth,
    <>
      {/* Ring — ankaret fästs här */}
      <circle cx="12" cy="4.5" r="1.8" />
      {/* Skaft */}
      <line x1="12" y1="6.3" x2="12" y2="16" />
      {/* Stock — horisontell bom */}
      <line x1="7" y1="9" x2="17" y2="9" />
      {/* Rep-ögla på stocken — liten detalj */}
      <path d="M10.8 8.5 Q12 9.8 13.2 8.5" strokeWidth={strokeWidth * 0.55} />
      {/* Vänster arm */}
      <path d="M12 16 L6.5 20" />
      {/* Höger arm */}
      <path d="M12 16 L17.5 20" />
      {/* Vänster fluga — kastar sig uppåt som en krok */}
      <path d="M6.5 20 Q4 22 5 18" />
      {/* Höger fluga */}
      <path d="M17.5 20 Q20 22 19 18" />
      {/* Kron-punkt där armarna möts */}
      <circle cx="12" cy="16" r="0.9" fill="currentColor" stroke="none" />
    </>
  )
}

/**
 * Kompassros — äkta nautisk kompass med kardinalriktningar,
 * N-pilen ifylld (mörk) enl. navigationstradition.
 */
export function IconCompass({ size = 24, className, style, strokeWidth = 1.75 }: IconProps) {
  return SVG(size, className, style, strokeWidth,
    <>
      {/* Yttre ring / kompassen */}
      <circle cx="12" cy="12" r="10.5" />
      {/* Inre ring — gimbaling */}
      <circle cx="12" cy="12" r="3" />
      {/* Norrpilen — ifylld = N (standard) */}
      <path d="M12 1.5 L10.7 10.2 L12 9 L13.3 10.2 Z" fill="currentColor" strokeWidth={0} />
      {/* Sydpilen — ihålig */}
      <path d="M12 22.5 L10.7 13.8 L12 15 L13.3 13.8 Z" />
      {/* Östpilen */}
      <path d="M22.5 12 L13.8 10.7 L15 12 L13.8 13.3 Z" />
      {/* Västpilen */}
      <path d="M1.5 12 L10.2 10.7 L9 12 L10.2 13.3 Z" />
      {/* Ordinalstreck NE NW SE SW */}
      <line x1="6.2" y1="6.2" x2="9.5" y2="9.5" strokeWidth={strokeWidth * 0.6} opacity={0.5} />
      <line x1="17.8" y1="6.2" x2="14.5" y2="9.5" strokeWidth={strokeWidth * 0.6} opacity={0.5} />
      <line x1="17.8" y1="17.8" x2="14.5" y2="14.5" strokeWidth={strokeWidth * 0.6} opacity={0.5} />
      <line x1="6.2" y1="17.8" x2="9.5" y2="14.5" strokeWidth={strokeWidth * 0.6} opacity={0.5} />
      {/* Centerpunkt */}
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
    </>
  )
}

/**
 * Fyr — klassisk rund fyr med ljuslykta i toppen
 * och strålar som skär ut i mörkret.
 */
export function IconLighthouse({ size = 24, className, style, strokeWidth = 1.75 }: IconProps) {
  return SVG(size, className, style, strokeWidth,
    <>
      {/* Tornkropp — avsmalnande uppåt */}
      <path d="M8.5 22 L9.5 9 L14.5 9 L15.5 22 Z" />
      {/* Horisontella band på tornet */}
      <line x1="9.2" y1="13.5" x2="14.8" y2="13.5" strokeWidth={strokeWidth * 0.6} opacity={0.45} />
      <line x1="9.6" y1="17.5" x2="14.4" y2="17.5" strokeWidth={strokeWidth * 0.6} opacity={0.45} />
      {/* Lykthus */}
      <rect x="8.5" y="5.5" width="7" height="3.5" rx="0.4" />
      {/* Kupol */}
      <path d="M8.5 5.5 Q12 3 15.5 5.5" />
      {/* Ljusstrålar */}
      <path d="M15.5 7 Q19.5 4.5 22.5 6" strokeWidth={strokeWidth * 1.1} opacity={0.85} />
      <path d="M15.5 7.2 Q20 7.2 22.5 9" strokeWidth={strokeWidth * 0.75} opacity={0.6} />
      <path d="M15.5 7.5 Q19.5 10 22 12.5" strokeWidth={strokeWidth * 0.5} opacity={0.35} />
      {/* Grund / klippa */}
      <path d="M6 22 L18 22" />
      <path d="M5 22 Q12 24 19 22" strokeWidth={strokeWidth * 0.6} opacity={0.5} />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HAV & VÄDER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Vågor — tre lager havsvågor. Bakgrunden
 * diskret, förgrunden fyllig med vita kammarna.
 */
export function IconWaves({ size = 24, className, style, strokeWidth = 1.75 }: IconProps) {
  return SVG(size, className, style, strokeWidth,
    <>
      {/* Bakgrundsdyning — liten, diskret */}
      <path d="M0 8.5 C3 6.5 6 10.5 9 8.5 C12 6.5 15 10.5 18 8.5 C20.5 7 22.5 8.5 24 8.5"
        strokeWidth={strokeWidth * 0.55} opacity={0.35} />
      {/* Mellansikt */}
      <path d="M0 14 C3.5 11.5 7 16.5 10.5 14 C14 11.5 17.5 16.5 21 14 C22 13 23 14 24 13.5"
        strokeWidth={strokeWidth * 0.85} opacity={0.65} />
      {/* Förgrund — tydligast */}
      <path d="M0 19.5 C3.5 16.5 7.5 22.5 11 19.5 C14.5 16.5 18 22 21.5 19.5 C22.5 18.5 23.5 19.5 24 19.5"
        strokeWidth={strokeWidth * 1.15} />
      {/* Vita kammar — skum på förgrundsvågen */}
      <path d="M4 16.5 Q5.5 14.5 7 15.5" strokeWidth={strokeWidth * 0.55} opacity={0.6} />
      <path d="M14.5 16 Q16 14 17.5 15" strokeWidth={strokeWidth * 0.55} opacity={0.6} />
    </>
  )
}

/**
 * Vind — tre böjda vindlinjer som flödar
 * som en byig, havsnära bris.
 */
export function IconWind({ size = 24, className, style, strokeWidth = 1.75 }: IconProps) {
  return SVG(size, className, style, strokeWidth,
    <>
      {/* Vindlinje 1 — längst, med krok i höger ände */}
      <path d="M2 9 Q8 7 14 9 Q18 10.5 20 9 Q22.5 7.5 22.5 5.5 Q22.5 3.5 20.5 3.5 Q18.5 3.5 18.5 5.5" />
      {/* Vindlinje 2 — kortare rakt igenom */}
      <path d="M2 13 Q9 11 16 13 Q19 14 20 13" strokeWidth={strokeWidth * 0.8} />
      {/* Vindlinje 3 — nedre, längst med krok åt höger */}
      <path d="M2 17.5 Q7 15.5 13 17.5 Q17 19 19 17.5 Q21.5 16 21.5 14 Q21.5 12 19.5 12 Q17.5 12 17.5 14"
        strokeWidth={strokeWidth * 0.9} />
    </>
  )
}

/**
 * Solnedgång — horisonten över vattnet,
 * solen halvt neddykta och reflektionsrand.
 */
export function IconSunset({ size = 24, className, style, strokeWidth = 1.75 }: IconProps) {
  return SVG(size, className, style, strokeWidth,
    <>
      {/* Horisontlinje */}
      <line x1="1.5" y1="14" x2="22.5" y2="14" />
      {/* Solskiva — halvt under horisonten */}
      <path d="M7 14 A5 5 0 0 1 17 14" />
      {/* Solstrålar uppåt */}
      <line x1="12" y1="2" x2="12" y2="4.5" />
      <line x1="4.9" y1="4.9" x2="6.7" y2="6.7" />
      <line x1="19.1" y1="4.9" x2="17.3" y2="6.7" />
      <line x1="2" y1="12" x2="4.5" y2="12" />
      <line x1="22" y1="12" x2="19.5" y2="12" />
      {/* Vattenreflektion — glänsande band */}
      <path d="M9 15.5 Q12 17 15 15.5" strokeWidth={strokeWidth * 0.9} />
      <path d="M7 17.5 Q12 19.5 17 17.5" strokeWidth={strokeWidth * 0.65} opacity={0.6} />
      {/* Vågkrusning på vattnet */}
      <path d="M2.5 20 Q7 18.5 12 19.5 Q17 20.5 21.5 19.5" strokeWidth={strokeWidth * 0.5} opacity={0.4} />
    </>
  )
}

/**
 * Snöflinga / is — för vintersegling.
 */
export function IconSnowflake({ size = 24, className, style, strokeWidth = 1.75 }: IconProps) {
  return SVG(size, className, style, strokeWidth,
    <>
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
      <path d="M12 2 L9.5 4.5 M12 2 L14.5 4.5" strokeWidth={strokeWidth * 0.75} />
      <path d="M12 22 L9.5 19.5 M12 22 L14.5 19.5" strokeWidth={strokeWidth * 0.75} />
      <path d="M2 12 L4.5 9.5 M2 12 L4.5 14.5" strokeWidth={strokeWidth * 0.75} />
      <path d="M22 12 L19.5 9.5 M22 12 L19.5 14.5" strokeWidth={strokeWidth * 0.75} />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ATMOSFÄR & KARAKTÄR
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Mås — siluett av en trut i glidflykt,
 * lite sned och levande, inte geometrisk.
 */
export function IconSeagull({ size = 24, className, style, strokeWidth = 1.75 }: IconProps) {
  return SVG(size, className, style, strokeWidth,
    <>
      {/* Vänster vinge — mjukt böjd uppåt */}
      <path d="M2 13.5 Q5.5 9.5 9.5 12 Q10.5 12.5 11.5 12" />
      {/* Höger vinge */}
      <path d="M22 12 Q18.5 8.5 14.5 11.5 Q13.5 12 12.5 11.5" />
      {/* Kropp */}
      <path d="M11.5 12 Q12.5 13.5 14 12.5" />
      {/* Huvud */}
      <circle cx="14.5" cy="11" r="1.8" />
      {/* Näbb */}
      <path d="M16 10.8 L18.5 11.2 L16.2 12.5" strokeWidth={strokeWidth * 0.8} />
      {/* Öga */}
      <circle cx="15.1" cy="10.6" r="0.45" fill="currentColor" stroke="none" />
      {/* Stjärtfjädrar */}
      <path d="M11.5 12 L9.5 15 M12 12.5 L10.5 16" strokeWidth={strokeWidth * 0.6} opacity={0.65} />
    </>
  )
}

/**
 * Fisk — horisontell fisk med fjälldetanj
 * och karakteristisk svans.
 */
export function IconFish({ size = 24, className, style, strokeWidth = 1.75 }: IconProps) {
  return SVG(size, className, style, strokeWidth,
    <>
      {/* Kropp */}
      <path d="M6 12 Q9 7.5 16 9.5 Q19.5 10.5 21 12 Q19.5 13.5 16 14.5 Q9 16.5 6 12 Z" />
      {/* Svansfena */}
      <path d="M6 12 L2.5 9 M6 12 L2.5 15" />
      {/* Ryggfena */}
      <path d="M12 9.5 Q13.5 7 15 9" strokeWidth={strokeWidth * 0.75} />
      {/* Stjärtfena liten */}
      <path d="M16 14 Q17.5 16 19 14.5" strokeWidth={strokeWidth * 0.7} opacity={0.6} />
      {/* Öga */}
      <circle cx="18" cy="11.5" r="1" />
      <circle cx="18.2" cy="11.3" r="0.4" fill="currentColor" stroke="none" />
      {/* Fjäll — liten båge */}
      <path d="M11 10.5 Q12.5 12 11 13.5" strokeWidth={strokeWidth * 0.55} opacity={0.5} />
      <path d="M13.5 10 Q15 12 13.5 14" strokeWidth={strokeWidth * 0.55} opacity={0.5} />
    </>
  )
}

/**
 * Ankare-stjärna — ankaret som en rating-ikon.
 * En stiliserad femuddig stjärna med ankarets form.
 */
export function IconAnchorStar({ size = 24, className, style, strokeWidth = 1.75 }: IconProps) {
  return SVG(size, className, style, strokeWidth,
    <>
      <path d="M12 2 L14.1 8.4 L20.9 8.4 L15.4 12.6 L17.5 19 L12 14.8 L6.5 19 L8.6 12.6 L3.1 8.4 L9.9 8.4 Z" />
    </>
  )
}

/**
 * Rep / knop — ett repöga eller knopp-detalj,
 * för nautisk känsla i t.ex. tomma tillstånd.
 */
export function IconRope({ size = 24, className, style, strokeWidth = 1.75 }: IconProps) {
  return SVG(size, className, style, strokeWidth,
    <>
      {/* Yttre repöga */}
      <circle cx="12" cy="12" r="7" />
      {/* Knopp-detalj inuti */}
      <path d="M8.5 12 Q10 9 12 10.5 Q14 12 16 10 Q17.5 8.5 16 12 Q14.5 15.5 12 14 Q9.5 12.5 8.5 12 Z" />
      {/* Rep-ändar */}
      <path d="M12 5 L12 2.5" />
      <path d="M12 19 L12 21.5" />
    </>
  )
}

/**
 * Paddel — ett kajak/SUP-paddel sett diagonalt,
 * används som kategori-ikon.
 */
export function IconPaddle({ size = 24, className, style, strokeWidth = 1.75 }: IconProps) {
  return SVG(size, className, style, strokeWidth,
    <>
      {/* Skaft */}
      <line x1="5" y1="19" x2="19" y2="5" />
      {/* Blad 1 — övre */}
      <path d="M19 5 Q22 3 22.5 6.5 Q22 9 19 5" />
      {/* Blad 2 — nedre */}
      <path d="M5 19 Q2 21 1.5 17.5 Q2 15 5 19" />
    </>
  )
}

/**
 * Klippa / skärgård — siluett av skärgårdsklippa
 * med vattenlinjen under.
 */
export function IconIsland({ size = 24, className, style, strokeWidth = 1.75 }: IconProps) {
  return SVG(size, className, style, strokeWidth,
    <>
      {/* Klipp-siluett */}
      <path d="M2 17 L5 14 L7 15.5 L9 11 L12 13 L14 9.5 L17 13 L19 12 L22 17 Z" />
      {/* Vattenlinjen */}
      <line x1="1" y1="17" x2="23" y2="17" />
      {/* Vågkrusning */}
      <path d="M2 19 Q6 17.5 10 18.5 Q14 19.5 18 18.5 Q21 17.5 22 19" strokeWidth={strokeWidth * 0.6} opacity={0.55} />
      {/* Liten tall/gran på toppen */}
      <path d="M14 9.5 L14 7 M12.5 8 L15.5 8 M13 7 L15 7" strokeWidth={strokeWidth * 0.65} />
    </>
  )
}
