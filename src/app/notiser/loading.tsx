const sk = { background: 'rgba(30,92,130,0.09)', borderRadius: 8 } as const

export default function NotiserLoading() {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg, #f2f8fa)' }}>
      <header style={{
        display: 'flex', alignItems: 'center', padding: '14px 16px 12px',
        background: 'var(--glass-96, rgba(242,248,250,0.96))',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ width: 80, height: 20, ...sk }} className="sk" />
        <div style={{ marginLeft: 'auto', width: 68, height: 28, ...sk, borderRadius: 14 }} className="sk" />
      </header>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[1,2,3,4,5,6].map(i => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'var(--white, #fff)', borderRadius: 18,
            padding: '14px 16px',
            boxShadow: '0 1px 8px rgba(0,30,50,0.06)',
          }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', flexShrink: 0, ...sk }} className="sk" />
            <div style={{ flex: 1 }}>
              <div style={{ width: '65%', height: 13, marginBottom: 7, ...sk }} className="sk" />
              <div style={{ width: '40%', height: 10, ...sk }} className="sk" />
            </div>
            <div style={{ width: 36, height: 28, borderRadius: 10, flexShrink: 0, ...sk }} className="sk" />
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
