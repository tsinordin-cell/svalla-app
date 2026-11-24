/**
 * SVALLAS LOGGA. Max 2026-11-24 (bild i chatten): detta är rätt logga, samma form som i LOGGA.md.
 * En båt med fock, storsegel, mast och skrov, ingen våg under. SVALLA i Playfair Display Bold med brett teckenavstånd.
 * Byt inte form, färger eller typsnitt utan att Max eller Thomas ber om det.
 */
export default function SvallaLogo({ height = 26, color = '#ffffff' }: { height?: number; color?: string }) {
  return (
    <svg viewBox="0 0 130 27" height={height} xmlns="http://www.w3.org/2000/svg" aria-label="Svalla" style={{ display: 'block' }}>
      <g fill={color}>
        <rect x="11.2" y="0.6" width="1" height="22" />
        <path d="M10.65 7.3V21.4H2.25Z" />
        <path d="M12.65 2.6L23.6 21.4H12.65Z" />
        <path d="M0.7 22.9Q11.6 27.1 22.6 22.9A0.6 0.6 0 0 1 22.7 24.1Q11.6 28.3 0.6 24.1A0.6 0.6 0 0 1 0.7 22.9Z" />
      </g>
      <text x="32" y="19.5" fill={color} style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontWeight: 700, letterSpacing: 3.6 }}>SVALLA</text>
    </svg>
  )
}
