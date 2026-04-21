const sk = { background: 'rgba(30,92,130,0.09)', borderRadius: 8 } as const

export default function TaggLoading() {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg, #f2f8fa)' }}>
      <header style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
        background: 'var(--glass-96, rgba(242,248,250,0.96))',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ width: 36, height: 36, flexShrink: 0, ...sk, borderRadius: '50%' }} className="sk" />
        <div style={{ width: 120, height: 20, ...sk }} className="sk" />
        <div style={{ marginLeft: 'auto', width: 80, height: 32, ...sk, borderRadius: 20 }} className="sk" />
      </header>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 'calc(var(--nav-h, 60px) + 16px)' }}>
        {[1,2,3].map(i => (
          <div key={i} style={{ background: 'var(--white, #fff)', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,30,50,0.07)' }}>
            <div style={{ width: '100%', aspectRatio: '3/2', ...sk, borderRadius: 0 }} className="sk" />
            <div style={{ padding: '12px 14px 14px', display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ width: 36, height: 36, flexShrink: 0, ...sk, borderRadius: '50%' }} className="sk" />
              <div style={{ flex: 1 }}>
                <div style={{ width: '50%', height: 13, marginBottom: 7, ...sk }} className="sk" />
                <div style={{ width: '35%', height: 10, ...sk }} className="sk" />
              </div>
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
