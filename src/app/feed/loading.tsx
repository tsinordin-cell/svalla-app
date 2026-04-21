export default function FeedLoading() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg, #f2f8fa)' }}>
      {/* Header skeleton */}
      <header style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 16px 10px',
        background: 'var(--header-bg, var(--glass-96))',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ width: 80, height: 22, background: 'rgba(30,92,130,0.12)', borderRadius: 8 }} className="sk" />
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          {[1, 2].map(i => (
            <div key={i} style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(30,92,130,0.10)' }} className="sk" />
          ))}
        </div>
      </header>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '12px 14px', paddingBottom: 'calc(var(--nav-h, 60px) + 16px)' }}>
        {/* Tab pills skeleton */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {[80, 64, 72].map((w, i) => (
            <div key={i} style={{ width: w, height: 34, borderRadius: 20, background: i === 0 ? 'rgba(30,92,130,0.18)' : 'rgba(30,92,130,0.08)' }} className="sk" />
          ))}
        </div>

        {/* Social proof banner skeleton */}
        <div style={{
          background: 'rgba(30,92,130,0.08)',
          borderRadius: 18, height: 54, marginBottom: 14,
        }} className="sk" />

        {/* Trip card skeletons — match actual 3:2 card shape to minimise CLS */}
        {[1, 2, 3].map(i => (
          <div key={i} style={{
            background: 'var(--white, #fff)',
            borderRadius: 20,
            marginBottom: 14,
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0,30,50,0.07)',
          }}>
            {/* Photo placeholder — 3:2 aspect ratio */}
            <div style={{ width: '100%', aspectRatio: '3/2', background: 'rgba(30,92,130,0.10)' }} className="sk" />
            {/* Card body */}
            <div style={{ padding: '14px 16px 16px' }}>
              {/* User row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(30,92,130,0.10)', flexShrink: 0 }} className="sk" />
                <div style={{ flex: 1 }}>
                  <div style={{ width: '45%', height: 13, background: 'rgba(30,92,130,0.10)', borderRadius: 6, marginBottom: 6 }} className="sk" />
                  <div style={{ width: '30%', height: 11, background: 'rgba(30,92,130,0.07)', borderRadius: 6 }} className="sk" />
                </div>
              </div>
              {/* Title */}
              <div style={{ width: '70%', height: 16, background: 'rgba(30,92,130,0.10)', borderRadius: 6, marginBottom: 8 }} className="sk" />
              {/* Subtitle */}
              <div style={{ width: '50%', height: 12, background: 'rgba(30,92,130,0.07)', borderRadius: 6 }} className="sk" />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .sk {
          animation: sk-pulse 1.6s ease-in-out infinite;
        }
        @keyframes sk-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.45; }
        }
      `}</style>
    </div>
  )
}
