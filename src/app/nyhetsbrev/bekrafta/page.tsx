import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: { absolute: 'Bekräfta nyhetsbrevet · Svalla' },
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

const kort: React.CSSProperties = {
  maxWidth: 480, margin: '48px auto', padding: '28px 24px', borderRadius: 16,
  background: 'var(--white, #fff)', boxShadow: '0 4px 20px rgba(10,20,35,0.08)',
  color: 'var(--txt, #0d2a3e)',
}
const knapp: React.CSSProperties = {
  display: 'inline-block', padding: '14px 24px', borderRadius: 12, border: 'none',
  background: 'var(--sea-knapp, #1e5c82)', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer',
}

/** Dubbel bekräftelse för nyhetsbrevet (2026-11-22). Knappen postar till /api/subscribe/bekrafta. */
export default async function BekraftaNyhetsbrev({ searchParams }: Props) {
  const p = await searchParams
  const str = (v: string | string[] | undefined) => (typeof v === 'string' ? v : '')
  const e = str(p.e)
  const t = str(p.t)

  if (str(p.klart) === '1') {
    return (
      <main style={kort}>
        <h1 style={{ fontSize: 24, margin: '0 0 12px' }}>Klart, du är med</h1>
        <p style={{ lineHeight: 1.6, margin: '0 0 20px' }}>Nästa nyhetsbrev kommer till din inkorg. Du kan avsluta när du vill via länken längst ner i varje mejl.</p>
        <Link href="/" style={{ color: 'var(--sea, #0a7b8c)', fontWeight: 700 }}>Till svalla.se</Link>
      </main>
    )
  }

  if (str(p.fel) === '1' || !e || !t) {
    return (
      <main style={kort}>
        <h1 style={{ fontSize: 24, margin: '0 0 12px' }}>Länken fungerar inte</h1>
        <p style={{ lineHeight: 1.6, margin: '0 0 20px' }}>Kopiera hela länken från mejlet, eller anmäl dig igen så skickar vi en ny.</p>
        <Link href="/nyhetsbrev" style={{ color: 'var(--sea, #0a7b8c)', fontWeight: 700 }}>Till nyhetsbrevet</Link>
      </main>
    )
  }

  return (
    <main style={kort}>
      <h1 style={{ fontSize: 24, margin: '0 0 12px' }}>Bekräfta nyhetsbrevet</h1>
      <p style={{ lineHeight: 1.6, margin: '0 0 20px' }}>Tryck på knappen så får du Svallas nyhetsbrev. Har du inte anmält dig kan du stänga sidan.</p>
      <form method="post" action="/api/subscribe/bekrafta">
        <input type="hidden" name="e" value={e} />
        <input type="hidden" name="t" value={t} />
        <button type="submit" style={knapp}>Ja, jag vill ha nyhetsbrevet</button>
      </form>
    </main>
  )
}
