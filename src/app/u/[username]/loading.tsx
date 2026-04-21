const sk = { background: 'rgba(30,92,130,0.09)', borderRadius: 8 } as const

export default function UserProfileLoading() {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg, #f2f8fa)' }}>
      {/* Hero */}
      <div style={{ height: 180, background: 'rgba(30,92,130,0.12)' }} className="sk" />

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 16px', paddingBottom: 'calc(var(--nav-h, 60px) + 16px)' }}>
        {/* Avatar + follow row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginTop: -36, marginBottom: 16 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', flexShrink: 0, border: '3px solid var(--bg, #f2f8fa)', ...sk }} className="sk" />
          <div style={{ flex: 1, paddingBottom: 4 }}>
            <div style={{ width: '40%', height: 18, marginBottom: 8, ...sk }} className="sk" />
            <div style={{ width: '25%', height: 11, ...sk }} className="sk" />
          </div>
          <div style={{ width: 90, height: 34, borderRadius: 20, flexShrink: 0, ...sk }} className="sk" />
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex', background: 'var(--white, #fff)', borderRadius: 20,
          marginBottom: 16, overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,30,50,0.07)',
        }}>
          {[1,2,3].map((i: number) => (
            <div key={i} style={{ flex: 1, padding: '14px 8px', textAlign: 'center', borderLeft: i > 1 ? '1px solid rgba(10,123,140,0.07)' : 'none' }}>
              <div style={{ width: 36, height: 18, margin: '0 auto 6px', ...sk }} className="sk" />
              <div style={{ width: 28, height: 10, margin: '0 auto', ...sk }} className="sk" />
            </div>
          ))}
        </div>

        {/* Photo grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
          {Array.from({ length: 6 }).map((_, i: number) => (
            <div key={i} style={{ aspectRatio: '1/1', ...sk, borderRadius: 4 }} className="sk" />
          ))}
        </div>
      </div>

      <style>{`
        .sk { animation: sk-pulse 1.6s ease-in-out infinite; }
        @keyframes sk-pulse { 0%,100%{opacity:1} 50%{opacity:.45} }
      `}</style>
    </div>
  )
}
