const sk = { background: 'rgba(30,92,130,0.09)', borderRadius: 8 } as const

export default function PlatserLoading() {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg, #f2f8fa)' }}>
      {/* Map skeleton — takes ~60% of viewport height */}
      <div style={{ width: '100%', height: '55vh', background: 'rgba(30,92,130,0.07)', position: 'relative' }} className="sk">
        {/* Fake map tiles hint */}
        <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(3, 1fr)', gap: 1, opacity: 0.4 }}>
          {Array.from({length: 12}).map((_, i) => (
            <div key={i} style={{ background: 'rgba(30,92,130,0.06)', borderRadius: 2 }} />
          ))}
        </div>
      </div>

      {/* Place cards below map */}
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '14px 14px', paddingBottom: 'calc(var(--nav-h, 60px) + 16px)' }}>
        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14, overflowX: 'hidden' }}>
          {[60, 90, 80, 70, 85].map((w, i) => (
            <div key={i} style={{ width: w, height: 30, borderRadius: 20, flexShrink: 0, ...sk }} className="sk" />
          ))}
        </div>
        {[1,2,3].map(i => (
          <div key={i} style={{
            background: 'var(--white, #fff)', borderRadius: 18,
            marginBottom: 10, overflow: 'hidden',
            boxShadow: '0 1px 8px rgba(0,30,50,0.06)',
          }}>
            <div style={{ width: '100%', height: 140, ...sk, borderRadius: 0 }} className="sk" />
            <div style={{ padding: '12px 14px 14px' }}>
              <div style={{ width: '50%', height: 14, marginBottom: 7, ...sk }} className="sk" />
              <div style={{ width: '70%', height: 10, ...sk }} className="sk" />
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
