import Link from 'next/link'
import Icon, { type IconName } from './Icon'

/**
 * Vinterläge i flödet (2026-11-16). Serverkomponent, ingen state.
 *
 * VARFÖR: november till mars loggas nästan inga turer (4 turer senaste 60
 * dagarna, 11 totalt). Flödet blir då en lista med gamla turer och inget
 * att göra. Det som är värt något i vinter: vilka båtar som går
 * (vintertrafikguiden), att planera sommarens turer (ruttplaneraren, nu
 * med koppling till loggningen) och att fråga Thorkel.
 *
 * ORDNING: julkalendern ligger redan överst 1–24 december
 * (JulkalenderFlodeKort). Därefter det här blocket: vintertrafik,
 * planera, Thorkel. Visas för alla, in- och utloggade. Inga påståenden om
 * tidtabeller här; de står i guiden med källa.
 *
 * STORLEK (2026-11-27, Tom: "gör rutorna mindre men behåll samma innehåll"):
 * mindre luft, ikonruta 30 px, text ett halvt steg mindre, smalare kort på
 * mobil (72 %). Samma texter, ikoner och pil.
 */

const VINTERMANADER = new Set([11, 12, 1, 2, 3])

type Rad = { href: string; titel: string; text: string; icon: IconName }

const RADER: Rad[] = [
  {
    href: '/guider/vintertrafik-skargarden',
    titel: 'Vintertrafiken i skärgården',
    text: 'Istabeller, svävare, vinterhamnar och var du ser trafikläget en viss dag.',
    icon: 'ship',
  },
  {
    href: '/planera/ny',
    titel: 'Planera sommarens turer',
    text: 'Välj start och mål, få sjöled, stopp och öar längs vägen. Logga turen från rutten när du gjort den.',
    icon: 'navigation',
  },
  {
    href: '/guide',
    titel: 'Fråga Thorkel',
    text: 'Lots och skeppare från Möja. Säg vad du vill göra, han föreslår öar och rutt.',
    icon: 'compass',
  },
]

export default function VinterIFlodet({ manad = new Date().getMonth() + 1 }: { manad?: number }) {
  if (!VINTERMANADER.has(manad)) return null

  return (
    <section aria-label="I vinter" style={{ margin: '0 0 18px' }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 10 }}>
        I vinter
      </div>
      {/* Mobil (under 768 px): korten ligger i en rad man sveper i, så att
          första turen hamnar högre upp. Allt innehåll är kvar. Från 768 px
          ligger de under varandra som förut. Layouten står i globals.css
          (.vinter-rad, .vinter-kort). */}
      <div className="vinter-rad">
        {RADER.map(r => (
          <Link
            key={r.href}
            href={r.href}
            className="vinter-kort"
            style={{
              alignItems: 'center', gap: 10,
              padding: '9px 11px', borderRadius: 12,
              background: 'var(--surface)',
              border: '1px solid var(--teal-12)',
              textDecoration: 'none', color: 'inherit',
            }}
          >
            <div style={{
              width: 30, height: 30, flexShrink: 0, borderRadius: 9,
              background: 'var(--teal-10)', color: 'var(--sea)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }} aria-hidden>
              <Icon name={r.icon} size={16} stroke={1.9} malad />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)', lineHeight: 1.25 }}>{r.titel}</div>
              <div style={{ fontSize: 11.5, color: 'var(--txt2)', lineHeight: 1.35, marginTop: 1 }}>{r.text}</div>
            </div>
            <span style={{ color: 'var(--txt3)', fontSize: 14, flexShrink: 0 }} aria-hidden>›</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
