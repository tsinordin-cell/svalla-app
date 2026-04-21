const sk = { background: 'rgba(30,92,130,0.09)', borderRadius: 8 } as const

export default function SokLoading() {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg, #f2f8fa)' }}>
      <header style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px',
        background: 'var(--glass-96, rgba(242,248,250,0.96))',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        {/* Search bar skeleton */}
        <div style={{ flex: 1, height: 40, ...sk, borderRadius: 20 }} className="sk" />
      </header>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '14px 14px' }}>
        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, overflowX: 'hidden' }}>
          {[56, 80, 64, 72, 60, 68].map((w, i) => (
            <div key={i} style={{ width: w, height: 30, flexShrink: 0, ...sk, borderRadius: 20 }} className="sk" />
          ))}
        </div>

        {/* Result rows */}
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'var(--white, #fff)', borderRadius: 18,
            padding: '12px 14px', marginBottom: 8,
            boxShadow: '0 1px 8px rgba(0,30,50,0.06)',
          }}>
            <div style={{ width: 44, height: 44, flexShrink: 0, ...sk, borderRadius: 12 }} className="sk" />
            <div style={{ flex: 1 }}>
              <div style={{ width: '55%', height: 13, marginBottom: 7, ...sk }} className="sk" />
              <div style={{ width: '35%', height: 10, ...sk }} className="sk" />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .sk { animation: sk-pulse 1.6s ease-in-out infinite; }
        @keyframes sk-pulse { 0%,100%{opacity:1} 50%{opacity:.45} }
      `}</style>
    </div>
  )
}
