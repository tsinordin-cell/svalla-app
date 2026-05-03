/**
 * /spara loading skeleton — matchar setup-fasens layout.
 * Visar header, ortlock-kort, båttyp-väljare och primary-knapp som skeletons
 * istället för en generisk spinner. Premium-känsla = ingen tom skärm.
 */
export default function SparaLoading() {
  return (
    <div style={{
      minHeight: '100dvh',
      background: 'linear-gradient(180deg, #0e3d52 0%, #0a2030 65%, #080e18 100%)',
      color: '#fff',
      padding: 'calc(env(safe-area-inset-top,0px) + 18px) 20px 24px',
      maxWidth: 640, margin: '0 auto',
    }}>
      {/* Top bar — back button + title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <div className="sk" style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.10)' }} />
        <div className="sk" style={{ flex: 1, height: 22, borderRadius: 8, background: 'rgba(255,255,255,0.10)' }} />
      </div>

      {/* Hero section — large status card */}
      <div className="sk" style={{
        width: '100%', height: 180, borderRadius: 22,
        background: 'rgba(255,255,255,0.06)', marginBottom: 22,
      }} />

      {/* Section label */}
      <div className="sk" style={{ width: 110, height: 13, borderRadius: 6, background: 'rgba(255,255,255,0.10)', marginBottom: 14 }} />

      {/* Boat type chips row */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 26, flexWrap: 'wrap' }}>
        {[88, 110, 96, 120, 80].map((w, i) => (
          <div key={i} className="sk" style={{
            height: 38, width: w, borderRadius: 999,
            background: 'rgba(255,255,255,0.08)',
          }} />
        ))}
      </div>

      {/* Secondary stats / inputs */}
      <div className="sk" style={{ width: '100%', height: 56, borderRadius: 14, background: 'rgba(255,255,255,0.06)', marginBottom: 12 }} />
      <div className="sk" style={{ width: '100%', height: 56, borderRadius: 14, background: 'rgba(255,255,255,0.06)', marginBottom: 28 }} />

      {/* Primary CTA */}
      <div className="sk" style={{
        width: '100%', height: 60, borderRadius: 18,
        background: 'rgba(255,255,255,0.12)',
      }} />

      <style>{`
        .sk { animation: spara-sk-pulse 1.5s ease-in-out infinite; }
        @keyframes spara-sk-pulse { 0%,100%{opacity:1} 50%{opacity:.55} }
      `}</style>
    </div>
  )
}
