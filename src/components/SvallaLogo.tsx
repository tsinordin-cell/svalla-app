export default function SvallaLogo({ height = 26, color = '#ffffff' }: { height?: number; color?: string }) {
  return (
    <svg viewBox="0 0 120 28" height={height} xmlns="http://www.w3.org/2000/svg" aria-label="Svalla" style={{ display: 'block' }}>
      <g transform="translate(0,2)">
        <line x1="9" y1="20" x2="9" y2="3" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M9,4 L18,18 L9,18 Z" fill={color} opacity="0.9"/>
        <path d="M9,8 L1,17 L9,17 Z" fill={color} opacity="0.5"/>
        <path d="M2,20 Q6,17.5 9,20 Q12,17.5 17,20" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7"/>
      </g>
      <text x="23" y="20" fill={color} style={{ fontFamily: "'Georgia','Times New Roman',serif", fontSize: 15, fontWeight: 700, letterSpacing: 2.5 }}>SVALLA</text>
    </svg>
  )
}
