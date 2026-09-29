import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import SvallaLogo from '@/components/SvallaLogo'
import EmailSignup from '@/components/EmailSignup'
import PublicFooter from '@/components/PublicFooter'
import { DAG_HUBS, dagIslands } from '@/lib/dagsplan'
import UtflyktClient from './UtflyktClient'

/**
 * /utflykt — "Din dag i skärgården" (2026-09-28).
 *
 * Mätt 2026-09-28: sidan hade 0 sessioner senaste 30 dagarna och startsidans
 * två "Planera"-knappar ledde till den inloggningskrävande båtruttplaneraren.
 * Nu är det här den öppna dagsplaneraren för besökare utan egen båt: start-
 * punkt, dag, önskemål → öar med källbelagd restid och båttider för dagen.
 * Sidan är statisk; allt dagsberoende (datum, båttider) sker i klienten.
 */

export const metadata: Metadata = {
  title: 'Planera din dag i skärgården — utflykt med båttider, öar och tips',
  description: 'Välj var du startar, vilken dag och vad du vill göra — bad, krog, barn, natur. Få öar som nås därifrån, restid från ösidan och båttider för dagen från Trafiklab, inklusive sista båten hem.',
  alternates: { canonical: 'https://svalla.se/utflykt' },
  openGraph: {
    title: 'Din dag i skärgården — Svalla',
    description: 'Välj start, dag och vad du vill göra. Få öar, restid och båttider för dagen.',
    url: 'https://svalla.se/utflykt',
  },
}

export default function UtflyktPage() {
  const islands = dagIslands()
  const hubs = DAG_HUBS.map(h => ({ slug: h.slug, label: h.label, name: h.name }))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{
        background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '18px 24px 16px',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <SvallaLogo height={24} color="#ffffff" />
          </Link>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textDecoration: 'none' }}>
            ← Hem
          </Link>
        </div>
      </nav>

      <header style={{
        background: 'linear-gradient(170deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '40px 24px 56px', color: '#fff',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>
            Dagsplanerare
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, margin: 0, fontFamily: "'Playfair Display', Georgia, serif", textWrap: 'balance' }}>
            Din dag i skärgården
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.55, marginTop: 12, maxWidth: 640, opacity: 0.92 }}>
            Välj var du startar, vilken dag och vad du vill göra. Du får öarna som nås därifrån,
            restiden från ösidan och båttiderna för just den dagen — med sista båten hem.
            Ingen inloggning behövs.
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '-24px auto 0', padding: '0 16px 60px' }}>
        <Suspense fallback={<div style={{ minHeight: 320 }} aria-busy="true" />}>
          <UtflyktClient islands={islands} hubs={hubs} />
        </Suspense>

        <section aria-labelledby="dag-fragor" style={{ marginTop: 32 }}>
          <h2 id="dag-fragor" style={{ fontSize: 20, fontWeight: 700, margin: '0 0 12px', fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--txt)' }}>
            Vanliga frågor om dagsutflykter
          </h2>
          <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 14, fontSize: 14, lineHeight: 1.6, color: 'var(--txt2)' }}>
            <div>
              <dt style={{ fontWeight: 700, color: 'var(--txt)' }}>Varifrån kommer restiderna?</dt>
              <dd style={{ margin: '4px 0 0' }}>Från respektive ösida. Öar märkta Källbelagd är kontrollerade mot operatörens tidtabell (Waxholmsbolaget, Strömma, Styrsöbolaget med flera) med källa angiven på ösidan; övriga är ösidans egen bedömning.</dd>
            </div>
            <div>
              <dt style={{ fontWeight: 700, color: 'var(--txt)' }}>Varifrån kommer båttiderna?</dt>
              <dd style={{ margin: '4px 0 0' }}>Live från Trafiklab (ResRobot, Samtrafikens samlade tidtabellsdata för svensk kollektivtrafik) när du trycker på Båttider. Tider kan ändras, så kontrollera hos operatören innan du åker, särskilt sista båten hem.</dd>
            </div>
            <div>
              <dt style={{ fontWeight: 700, color: 'var(--txt)' }}>Vilka öar visas?</dt>
              <dd style={{ margin: '4px 0 0' }}>Öar med en Trafiklab-verifierad brygga från din startpunkt, eller vars ösida beskriver hur du tar dig dit därifrån. Väljer du Hela kusten visas alla {islands.length} öar och orter vi har sidor om.</dd>
            </div>
            <div>
              <dt style={{ fontWeight: 700, color: 'var(--txt)' }}>Har jag egen båt?</dt>
              <dd style={{ margin: '4px 0 0' }}>Då är <Link href="/planera" style={{ color: 'var(--sea)', fontWeight: 700 }}>ruttplaneraren</Link> gjord för dig: distans, väder, hamnar och öar längs vägen.</dd>
            </div>
          </dl>
        </section>

        <div style={{ marginTop: 28 }}>
          <EmailSignup
            variant="card"
            source="utflykt"
            title="Få fler utflyktstips"
            description="Säsongsstarter och nya guider, när det händer något. Inga annonser."
          />
        </div>
      </main>
      <PublicFooter />
    </div>
  )
}
