/** Sparade ar force-dynamic och personlig. */
const sk = { background: 'rgba(30,92,130,0.09)', borderRadius: 8 } as const

export default function SparadeLoading() {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '20px 16px', paddingBottom: 'calc(var(--nav-h, 60px) + 16px)' }}>
        <div style={{ width: '45%', height: 26, marginBottom: 8, ...sk }} className="sk" />
        <div style={{ width: '65%', height: 13, marginBottom: 24, ...sk }} className="sk" />

        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {[90, 110, 80].map((w, i) => (
            <div key={i} style={{ width: w, height: 32, ...sk, borderRadius: 20 }} className="sk" />
          ))}
        </div>

        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} style={{ display: 'flex', gap: 12, background: 'var(--white)', borderRadius: 18, padding: '14px 16px', marginBottom: 10, boxShadow: '0 1px 6px rgba(0,30,50,0.06)' }}>
            <div style={{ width: 44, height: 44, flexShrink: 0, ...sk, borderRadius: 12 }} className="sk" />
            <div style={{ flex: 1 }}>
              <div style={{ width: '55%', height: 13, marginBottom: 8, ...sk }} className="sk" />
              <div style={{ width: '80%', height: 10, marginBottom: 6, ...sk }} className="sk" />
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
