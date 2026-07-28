import type { Metadata } from 'next'
import Link from 'next/link'
import { GUIDES } from '@/app/guider/guides-data'
import { TEAMBUILDING_SUBS } from './teambuilding-data'

export const revalidate = 86400

export const metadata: Metadata = {
  title: { absolute: 'Teambuilding i skärgården – aktiviteter, regatta och konferens | Svalla' },
  description: 'Hitta det bästa teambuilding-eventet i skärgården. Segelregatta, kajak, konferensanläggningar och AW på öarna i Stockholm och Göteborg.',
  keywords: [
    'teambuilding skärgården',
    'teambuilding stockholm skärgård',
    'segelregatta teambuilding',
    'konferens skärgården',
    'AW skärgården',
    'kickoff skärgården',
    'teambuilding göteborg skärgård',
    'företagsevent skärgården',
    'teambuilding kajak',
    'teambuilding segling',
  ],
  alternates: { canonical: 'https://svalla.se/teambuilding' },
  openGraph: {
    title: 'Teambuilding i skärgården – aktiviteter, regatta och konferens',
    description: 'Segelregatta, kajak, konferens och AW på öarna. Hitta det bästa teambuilding-eventet för ditt team.',
    url: 'https://svalla.se/teambuilding',
    type: 'website',
  },
}

const AKTIVITETER = [
  { emoji: '⛵', name: 'Segelregatta', desc: 'Tävla i lag på havet – kräver kommunikation och strategi i realtid.', slug: 'segling' },
  { emoji: '🛶', name: 'Kajakpaddling', desc: 'Paddla i naturhamnar. Alla erfarenhetsnivåer, halvdag eller heldag.', slug: 'kajak' },
  { emoji: '🏢', name: 'Konferens på ö', desc: 'Mötesrum med havsutsikt. Helpension och aktiviteter i ett paket.', slug: 'konferens' },
]

const DESTINATIONER = [
  { name: 'Stockholms skärgård', emoji: '⛵', desc: 'Närmast från stan. Störst utbud av anläggningar och aktivitetsleverantörer.', slug: 'stockholm' },
  { name: 'Göteborg och Bohuslän', emoji: '🌊', desc: 'Råare klippmiljö och Västerhavet. Skaldjursmiddagar och ostronprovning.', slug: 'goteborg' },
]

const relatedGuides = GUIDES.filter(g => g.topics?.includes('teambuilding'))

const FAQ_ITEMS = [
  {
    q: 'Vad är bästa teambuilding i skärgården?',
    a: 'Det beror på gruppen. Segelregatter är populärt för team som vill ha spänning och tävling. Konferens med aktiviteter fungerar för ledningsgrupper. Kajakpaddling passar för team som vill ha naturupplevelse utan att tävla. Kombinationen mat + aktivitet + natur är svårslaget oavsett format.',
  },
  {
    q: 'Hur mycket kostar teambuilding i skärgården?',
    a: 'Halvdagsevent med en aktivitet: 800–1 500 kr/person. Heldagsevent med mat och aktiviteter: 1 500–3 500 kr/person. Konferenspaket med övernattning: 2 500–5 000 kr/person/natt. AW-format (4 h, enbart middag): 400–900 kr/person.',
  },
  {
    q: 'Kan man ordna teambuilding i skärgården på vintern?',
    a: 'Ja, men utbudet minskar. Fjäderholmarnas Krog och Vaxholm Hotell har konferenslokaler öppna hela året. Vinteraktiviteter som isfiske, vinterbastu och skärgårdsboule är tillgängliga hos vissa leverantörer. Sommarsäsong (maj–september) ger störst utbud.',
  },
  {
    q: 'Behöver man anlita en event-byrå för teambuilding i skärgården?',
    a: 'Inte alltid. Enklare event (AW på Fjäderholmarna, kajak en halvdag) bokar du direkt med anläggningen. För mer komplexa program med segelregatta, konferens och övernattning är det värt att anlita en lokal event-arrangör som koordinerar alla delar.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
    { '@type': 'ListItem', position: 2, name: 'Teambuilding', item: 'https://svalla.se/teambuilding' },
  ],
}

export default function TeambuildingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Header */}
      <div style={{ background: 'var(--grad-sea-hero)', padding: '0 20px 48px', paddingTop: 'calc(env(safe-area-inset-top, 0px) + 16px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⛵</div>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 800, color: 'var(--white)', margin: '0 0 12px' }}>
            Teambuilding i skärgården
          </h1>
          <p style={{ color: 'var(--white)', opacity: 0.9, fontSize: 17, lineHeight: 1.65, margin: 0, maxWidth: 580 }}>
            Segelregatta, kajak, konferens och AW på öarna. En dag ute på havet gör mer för lagkänslan än ett halvt år med teammöten.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
            {['Segling & regatta', 'Kajak', 'Konferensöar', 'Stockholm & Göteborg'].map(t => (
              <span key={t} style={{ background: 'rgba(255,255,255,0.2)', color: 'var(--white)', borderRadius: 20, padding: '5px 12px', fontSize: 13, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 20px' }}>

        {/* Intro */}
        <section style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-muted)', margin: '0 0 16px' }}>
            Skärgården är Skandinaviens bästa scen för teambuilding och konferens. 45 minuter med Waxholmsbolaget separerar ditt team från kontorets vardagsdistraktion och placerar er mitt i ett landskap av öar, vatten och naturlig tystnad. Det förändrar hur gruppen kommunicerar och tänker.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-muted)', margin: 0 }}>
            Sverige erbjuder unika format: segelregattor där laget konkurrerar under press, kajakpaddling som kräver synkronisering, och konferensanläggningar som kombinerar mötesrum med havsutsikt. Välj aktivitet utifrån vad gruppen behöver träna på.
          </p>
        </section>

        {/* Aktivitetstyper */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
            Välj aktivitet efter vad ditt team behöver
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
            {AKTIVITETER.map(a => (
              <Link key={a.slug} href={`/teambuilding/${a.slug}`} style={{
                background: 'var(--white)', borderRadius: 14, padding: '20px 18px',
                border: '1px solid var(--surface-3)', textDecoration: 'none', color: 'inherit', display: 'block',
              }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{a.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>{a.name}</div>
                <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.6, margin: '0 0 12px' }}>{a.desc}</p>
                <span style={{ fontSize: 13, color: 'var(--sea)', fontWeight: 600 }}>Läs mer →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Destinationer */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
            Var i Sverige?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
            {DESTINATIONER.map(d => (
              <Link key={d.slug} href={`/teambuilding/${d.slug}`} style={{
                background: 'var(--white)', borderRadius: 14, padding: '22px 20px',
                border: '1px solid var(--surface-3)', textDecoration: 'none', color: 'inherit', display: 'block',
              }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{d.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--ink)', marginBottom: 8 }}>{d.name}</div>
                <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.65, margin: '0 0 14px' }}>{d.desc}</p>
                <span style={{ fontSize: 13, color: 'var(--sea)', fontWeight: 600 }}>Se aktiviteter och anläggningar →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Alla undersidor */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
            Alla teambuilding-guider
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {TEAMBUILDING_SUBS.map(s => (
              <Link key={s.slug} href={`/teambuilding/${s.slug}`} style={{
                background: 'var(--white)', borderRadius: 14, padding: '16px 18px',
                border: '1px solid var(--surface-3)', textDecoration: 'none', color: 'inherit',
                display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{s.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 4 }}>{s.h1}</div>
                  <p style={{ fontSize: 13, color: 'var(--ink-muted)', margin: 0, lineHeight: 1.5 }}>{s.excerpt}</p>
                </div>
                <div style={{ fontSize: 18, color: 'var(--sea)', flexShrink: 0 }}>→</div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
            Vanliga frågor om teambuilding i skärgården
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {FAQ_ITEMS.map((f, i) => (
              <div key={i} style={{ background: 'var(--white)', borderRadius: 14, padding: '18px 20px', border: '1px solid var(--surface-3)' }}>
                <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 8, fontSize: 15 }}>{f.q}</div>
                <p style={{ fontSize: 14, color: 'var(--ink-muted)', margin: 0, lineHeight: 1.7 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Relaterade guider */}
        {relatedGuides.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
              Läs mer
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {relatedGuides.map(g => (
                <Link key={g.slug} href={`/guider/${g.slug}`} style={{
                  background: 'var(--white)', borderRadius: 14, padding: '16px 18px',
                  border: '1px solid var(--surface-3)', textDecoration: 'none', color: 'inherit',
                  display: 'flex', alignItems: 'center', gap: 14,
                }}>
                  <span style={{ fontSize: 24 }}>{g.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)', marginBottom: 2 }}>{g.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{g.readTime} · {g.category}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div style={{ background: 'var(--surface-2)', borderRadius: 16, padding: '28px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>⛵</div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Logga era turer på Svalla</h3>
          <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 20, lineHeight: 1.6 }}>
            Dokumentera teamets skärgårdsäventyr, spara rutterna och se statistik efter säsongen.
          </p>
          <Link href="/registrera" style={{
            display: 'inline-block', background: 'var(--sea)', color: 'var(--white)',
            padding: '12px 24px', borderRadius: 50, fontWeight: 700, fontSize: 15, textDecoration: 'none',
          }}>
            Skapa konto gratis →
          </Link>
        </div>
      </div>
    </div>
  )
}
