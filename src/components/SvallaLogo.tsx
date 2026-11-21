/**
 * SVALLAS LOGGA. LÅST 2026-11-15.
 * Max: "se till att aldrig byta från den loggan tills vi ber dig igen".
 * Båt med fock, storsegel, mast och skrov. Ingen våg under skrovet. Texten är Playfair (--font-display).
 * Samma form används i favicon, appikoner, mejl, delningsbilder, filmer och Instagram.
 * Ändra inte formen, färgerna eller typsnittet utan att Max eller Thomas uttryckligen ber om det.
 */
type Props = { height?: number; color?: string }

/** Själva båten (utan text). viewBox 0 0 24 27. */
export function SvallaBatForm({ color = '#ffffff' }: { color?: string }) {
  return (
    <g fill={color}>
      <rect x="11.2" y="0.6" width="1" height="22" />
      <path d="M10.65 7.3V21.4H2.25Z" />
      <path d="M12.65 2.6L23.6 21.4H12.65Z" />
      <path d="M0.7 22.9Q11.6 27.1 22.6 22.9A0.6 0.6 0 0 1 22.7 24.1Q11.6 28.3 0.6 24.1A0.6 0.6 0 0 1 0.7 22.9Z" />
    </g>
  )
}

/** Bara båten, t.ex. för små ytor. */
export function SvallaBat({ height = 24, color = '#ffffff' }: Props) {
  return (
    <svg viewBox="0 0 24 27" height={height} xmlns="http://www.w3.org/2000/svg" aria-label="Svalla" style={{ display: 'block' }}>
      <SvallaBatForm color={color} />
    </svg>
  )
}

/** Båt och SVALLA bredvid varandra (sidhuvuden och sidfötter). */
export default function SvallaLogo({ height = 26, color = '#ffffff' }: Props) {
  return (
    <svg viewBox="0 0 134 28" height={height} xmlns="http://www.w3.org/2000/svg" aria-label="Svalla" style={{ display: 'block', overflow: 'visible' }}>
      <SvallaBatForm color={color} />
      <text x="33" y="21" fill={color} style={{ fontFamily: "var(--font-display), 'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, letterSpacing: 4 }}>SVALLA</text>
    </svg>
  )
}
