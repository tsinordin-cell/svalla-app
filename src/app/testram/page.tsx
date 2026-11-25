// ENDAST TESTGRENEN test-inloggad-profil. Visar en sida från samma webbplats
// i en ram med telefonbredd (t.ex. 390 px), för skärmbilder. Får aldrig till main.
export const dynamic = 'force-dynamic'

export default async function Testram({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const p = await searchParams
  const sida = p.sida && p.sida.startsWith('/') && !p.sida.startsWith('//') ? p.sida : '/'
  const b = Math.min(1440, Math.max(320, Number(p.b) || 390))
  const h = Math.min(1200, Math.max(500, Number(p.h) || 844))
  return (
    <div style={{ position: 'fixed', inset: 0, background: '#222', zIndex: 2147483647 }}>
      <iframe src={sida} title="testram" style={{ width: b, height: h, border: 0, display: 'block', background: '#fff' }} />
    </div>
  )
}
