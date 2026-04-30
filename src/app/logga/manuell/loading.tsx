export default function Loading() {
  return (
    <div style={{
      minHeight: '60dvh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 12,
        color: 'var(--txt3)', fontSize: 13,
      }}>
        <div style={{
          width: 28, height: 28,
          border: '2.5px solid rgba(10,123,140,0.15)',
          borderTop: '2.5px solid var(--sea)',
          borderRadius: '50%',
          animation: 'spin .7s linear infinite',
        }} />
        <span>Laddar formulär…</span>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    </div>
  )
}
