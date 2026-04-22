const sk = { background: 'rgba(30,92,130,0.09)', borderRadius: 8 } as const

export default function ToplistaLoading() {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '16px 14px', paddingBottom: 'calc(var(--nav-h, 60px) + 16px)' }}>
        {/* Title */}
        <div style={{ width: 160, height: 28, marginBottom: 6, ...sk }} className="sk" />
        <div style={{ width: 200, height: 13, marginBottom: 20, ...sk }} className="sk" />

        {/* Tab pills */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {[80, 80, 80].map((w, i) => (
            <div key={i} style={{ width: w, height: 34, ...sk, borderRadius: 20 }} className="sk" />
          ))}
        </div>

        {/* Leaderboard rows */}
        {[1,2,3,4,5,6,7,8].map(i => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'var(--white)', borderRadius: 18,
            padding: '12px 14px', marginBottom: 8,
            boxShadow: '0 1px 8px rgba(0,30,50,0.06)',
          }}>
            <div style={{ width: 28, height: 20, flexShrink: 0, ...sk, borderRadius: 6 }} className="sk" />
            <div style={{ width: 40, height: 40, flexShrink: 0, ...sk, borderRadius: '50%' }} className="sk" />
            <div style={{ flex: 1 }}>
              <div style={{ width: '45%', height: 13, marginBottom: 6, ...sk }} className="sk" />
              <div style={{ width: '30%', height: 10, ...sk }} className="sk" />
            </div>
            <div style={{ width: 60, height: 18, flexShrink: 0, ...sk }} className="sk" />
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
