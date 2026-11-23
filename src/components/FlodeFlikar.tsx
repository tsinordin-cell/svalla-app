import Link from 'next/link'

/**
 * Flikraden Flöde · Forum · Topplista (menyförslaget 2026-11-23, Toms ja).
 * Före: Flöde och Forum hade var sin egen flikrad med bara två flikar, och
 * Topplista gick bara att nå från profilen. Nu är alla tre flikar i Flöde, och
 * menyns Flöde-flik är markerad på alla tre sidorna.
 */
const FLIKAR = [
  { id: 'flode', href: '/feed', label: 'Flöde' },
  { id: 'forum', href: '/forum', label: 'Forum' },
  { id: 'topplista', href: '/topplista', label: 'Topplista' },
] as const

export default function FlodeFlikar({ aktiv, bakgrund, marginBottom = 0 }: {
  aktiv: (typeof FLIKAR)[number]['id']
  bakgrund?: string
  marginBottom?: number
}) {
  return (
    <nav aria-label="Flöde, Forum och Topplista" style={{ display: 'flex', borderBottom: '1.5px solid rgba(10,123,140,0.08)', background: bakgrund, marginBottom }}>
      {FLIKAR.map(f => {
        const ar = f.id === aktiv
        return (
          <Link key={f.id} href={f.href} prefetch={false} aria-current={ar ? 'page' : undefined} style={{
            flex: 1, textAlign: 'center', padding: '12px 8px 10px', minHeight: 44, boxSizing: 'border-box',
            fontSize: 13, fontWeight: 700, textDecoration: 'none', display: 'block',
            color: ar ? 'var(--sea)' : 'var(--txt3)',
            borderBottom: ar ? '2px solid var(--sea)' : '2px solid transparent', marginBottom: -1.5,
          }}>
            {f.label}
          </Link>
        )
      })}
    </nav>
  )
}
