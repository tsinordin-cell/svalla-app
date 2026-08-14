'use client'
import dynamic from 'next/dynamic'

/**
 * Platshållaren visas medan Leaflet-chunken hämtas — uppmätt upp till 20 s på
 * långsam uppkoppling. Den var tidigare en tom ruta utan text, vilket lästes
 * som att sidan var trasig (rapporterat 2026-08-13). Nu säger den vad som
 * händer, och har SAMMA höjd som den riktiga kartan (300 px) så layouten inte
 * hoppar när den byts ut.
 */
const PlaneraMap = dynamic(() => import('./PlaneraMap'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: 300, borderRadius: 18, marginBottom: 20,
        background: 'var(--sea-xl,#e8f2fa)',
        border: '1px solid rgba(10,123,140,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 10, color: 'var(--txt3)', fontSize: 13,
      }}
      role="status"
      aria-live="polite"
    >
      <svg viewBox="0 0 24 24" width={16} height={16} aria-hidden="true"
           style={{ animation: 'svalla-snurr 1s linear infinite' }}>
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round"
                strokeDasharray="42" strokeDashoffset="14" opacity="0.55" />
      </svg>
      Laddar karta…
      <style>{'@keyframes svalla-snurr{to{transform:rotate(360deg)}}'}</style>
    </div>
  ),
})

export default PlaneraMap
