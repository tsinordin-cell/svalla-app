export default function FeedLoading() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg, #f2f8fa)' }}>
      {/* Header skeleton */}
      <header style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 16px 10px',
        background: 'var(--header-bg, var(--glass-96))',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ width: 100, height: 26, background: 'rgba(30,92,130,0.15)', borderRadius: 8, animation: 'pulse 2s infinite' }} />
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(30,92,130,0.1)', animation: 'pulse 2s infinite' }} />
          ))}
        </div>
      </header>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '12px 14px' }}>
        {/* Social proof banner skeleton */}
        <div style={{
          background: 'rgba(30,92,130,0.1)',
          borderRadius: 18, padding: '14px 18px', marginBottom: 14,
          height: 60, animation: 'pulse 2s infinite',
        }} />

        {/* Feed items skeleton */}
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            background: 'var(--white)',
            borderRadius: 16, padding: 12,
            marginBottom: 12,
            display: 'flex', gap: 12,
            animation: 'pulse 2s infinite',
          }}>
            <div style={{ width: 60, height: 60, borderRadius: 10, background: 'rgba(30,92,130,0.1)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ width: '80%', height: 14, background: 'rgba(30,92,130,0.1)', borderRadius: 4, marginBottom: 8 }} />
              <div style={{ width: '60%', height: 12, background: 'rgba(30,92,130,0.08)', borderRadius: 4 }} />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}
