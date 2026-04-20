export default function ProfilLoading() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg, #f2f8fa)' }}>
      <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2.5px solid #1e5c82', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}
