export default function TurLoading() {
  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg, #f2f8fa)', maxWidth: 640, margin: '0 auto' }}>
      {/* Hero image skeleton — matches full-width hero on tur/[id] */}
      <div style={{ width: '100%', aspectRatio: '4/3', background: 'rgba(13,42,62,0.85)', position: 'relative' }} className="sk">
        {/* Back button placeholder */}
        <div style={{
          position: 'absolute', top: 14, left: 14,
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
        }} />
      </div>

      <div style={{ padding: '0 14px 80px' }}>
        {/* Title + meta */}
        <div style={{ padding: '18px 0 14px', borderBottom: '1px solid rgba(10,123,140,0.08)', marginBottom: 16 }}>
          <div style={{ width: '65%', height: 22, background: 'rgba(30,92,130,0.12)', borderRadius: 8, marginBottom: 10 }} className="sk" />
          <div style={{ display: 'flex', gap: 8 }}>
            {[120, 90, 80].map((w, i) => (
              <div key={i} style={{ width: w, height: 14, background: 'rgba(30,92,130,0.08)', borderRadius: 6 }} className="sk" />
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ flex: 1, height: 72, borderRadius: 16, background: 'rgba(30,92,130,0.07)' }} className="sk" />
          ))}
        </div>

        {/* Map skeleton */}
        <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 20, background: 'rgba(10,123,140,0.08)', marginBottom: 16 }} className="sk" />

        {/* Comments skeleton */}
        <div style={{ height: 56, borderRadius: 16, background: 'rgba(30,92,130,0.07)' }} className="sk" />
      </div>

      <style>{`
        .sk { animation: sk-pulse 1.6s ease-in-out infinite; }
        @keyframes sk-pulse { 0%,100%{opacity:1} 50%{opacity:.45} }
      `}</style>
    </div>
  )
}
