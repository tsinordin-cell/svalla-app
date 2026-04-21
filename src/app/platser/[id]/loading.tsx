const sk = { background: 'rgba(30,92,130,0.09)', borderRadius: 8 } as const

export default function PlatserDetailLoading() {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg, #f2f8fa)' }}>
      {/* Hero image */}
      <div style={{ width: '100%', aspectRatio: '16/9', background: 'rgba(13,42,62,0.7)', position: 'relative' }} className="sk">
        <div style={{ position: 'absolute', top: 14, left: 14, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }} />
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '16px 14px', paddingBottom: 'calc(var(--nav-h, 60px) + 16px)' }}>
        {/* Name + meta */}
        <div style={{ width: '60%', height: 24, marginBottom: 10, ...sk }} className="sk" />
        <div style={{ width: '40%', height: 13, marginBottom: 18, ...sk }} className="sk" />

        {/* Action pills */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[100, 90, 80].map((w, i) => (
            <div key={i} style={{ width: w, height: 36, flexShrink: 0, ...sk, borderRadius: 20 }} className="sk" />
          ))}
        </div>

        {/* Description block */}
        <div style={{ background: 'var(--white, #fff)', borderRadius: 20, padding: '16px', marginBottom: 16, boxShadow: '0 1px 8px rgba(0,30,50,0.06)' }}>
          {[95, 88, 75, 60].map((w, i) => (
            <div key={i} style={{ width: `${w}%`, height: 11, marginBottom: 8, ...sk }} className="sk" />
          ))}
        </div>

        {/* Map */}
        <div style={{ width: '100%', height: 200, marginBottom: 16, ...sk, borderRadius: 20, background: 'rgba(10,123,140,0.08)' }} className="sk" />

        {/* Reviews */}
        {[1, 2].map(i => (
          <div key={i} style={{ display: 'flex', gap: 12, background: 'var(--white, #fff)', borderRadius: 18, padding: '14px 16px', marginBottom: 10, boxShadow: '0 1px 6px rgba(0,30,50,0.06)' }}>
            <div style={{ width: 36, height: 36, flexShrink: 0, ...sk, borderRadius: '50%' }} className="sk" />
            <div style={{ flex: 1 }}>
              <div style={{ width: '40%', height: 12, marginBottom: 8, ...sk }} className="sk" />
              <div style={{ width: '80%', height: 10, marginBottom: 6, ...sk }} className="sk" />
              <div style={{ width: '60%', height: 10, ...sk }} className="sk" />
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
