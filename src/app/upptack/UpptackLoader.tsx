'use client'
import dynamic from 'next/dynamic'

// Ny STF-style split-explorer (karta + filterbar lista)
const UpptackExplorer = dynamic(() => import('./UpptackExplorer'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        position: 'fixed', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg)',
        flexDirection: 'column', gap: 14,
        paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom,0px))',
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width={36}
        height={36}
        fill="none"
        stroke="var(--sea)"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ animation: 'upptackSpin 2s linear infinite' }}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
      <p style={{ color: 'var(--txt3)', fontSize: 14, margin: 0 }}>Laddar karta…</p>
      <style>{`
        @keyframes upptackSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  ),
})

export default function UpptackLoader() {
  return <UpptackExplorer />
}
