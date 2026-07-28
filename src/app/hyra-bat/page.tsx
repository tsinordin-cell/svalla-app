import type { Metadata } from 'next'
import Link from 'next/link'
import { GUIDES } from '@/app/guider/guides-data'
import { HYRBAT_SUBS } from './hyrbat-data'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Hyra båt i Sverige 2026 – guide till båtuthyrning',
  description: 'Komplett guide till båtuthyrning i Sverige. Priser, licenskrav och de bästa hyrbåtsbolagen i Stockholms skärgård, Göteborg, Gotland och Bohuslän.',
  keywords: [
    'hyra båt',
    'hyra båt skärgård',
    'hyra motorbåt',
    'båtuthyrning stockholm',
    'hyra båt göteborg',
    'hyra segelbåt',
    'hyra båt gotland',
    'hyra båt bohuslän',
    'boka båt',
    'båtuthyrning sverige',
  ],
  alternates: { canonical: 'https://svalla.se/hyra-bat' },
  openGraph: {
    title: 'Hyra båt i Sverige 2026 – komplett guide',
    description: 'Priser, licenskrav och de bästa hyrbåtsbolagen i Stockholms skärgård, Göteborg, Gotland och Bohuslän.',
    url: 'https://svalla.se/hyra-bat',
    type: 'website',
  },
}

const FAQ_ITEMS = [
  {
    q: 'Behöver man körkort för att hyra båt i Sverige?',
    a: 'Det finns inget lagkrav på båtkörkort i Sverige. De flesta hyrbåtsbolag kräver dock att du klarar en introduktionskörning och kan manövrera båten. Förarintyget (SBF/SSRS) öppnar dörren till kraftigare och större båtar. Segelbåtar kräver normalt segling i bakgrunden.',
  },
  {
    q: 'Vad kostar det att hyra båt i Sverige?',
    a: 'En liten motorbåt kostar 900–1 500 kr/dag. Mellanbåt 1 200–2 500 kr/dag. Segelbåt 28–35 fot: 3 500–7 500 kr/dag. Bränsle tillkommer alltid. Högsäsong (juli) är 20–30% dyrare än maj och september.',
  },
  {
    q: 'Kan man övernatta ombord när man hyr båt?',
    a: 'Ja. Kajutbåtar och segelbåtar hyrs ofta för flerdagarsturer med övernattning ombord. Ankring i naturhamnar är gratis. Gästhamnar kostar 100–350 kr/natt. Fråga hyrbåtsbolaget om flerdagspriser – de är ofta lägre än enkel dagshyra multiplicerat.',
  },
  {
    q: 'Vilken plats är bäst för nybörjare att hyra båt i Sverige?',
    a: 'Stockholms innerskärgård är enklast för nybörjare: skyddat vatten, tät märkning av farleder och kort avstånd till service. Göteborg sydskärgård (Styrsö m.fl.) är ett bra alternativ på västkusten. Undvik Bohuslän Ytterkust och Gotlands öppna vatten som första hyrbåtstur.',
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
    { '@type': 'ListItem', position: 2, name: 'Hyra båt', item: 'https://svalla.se/hyra-bat' },
  ],
}

const relatedGuides = GUIDES.filter(g => g.topics?.includes('hyra-bat'))

export default function HyraBatPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Header */}
      <div style={{ background: 'var(--grad-sea-hero)', padding: '0 20px 48px', paddingTop: 'calc(env(safe-area-inset-top, 0px) + 16px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⛵</div>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 800, color: 'var(--white)', margin: '0 0 12px' }}>
            Hyra båt i Sverige
          </h1>
          <p style={{ color: 'var(--white)', opacity: 0.9, fontSize: 17, lineHeight: 1.65, margin: 0, maxWidth: 580 }}>
            Allt om båtuthyrning i Sverige. Priser, licenskrav och de bästa hyrbåtsbolagen i skärgård och kust.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
            {['Inget körkort krävs', 'Motorbåt & segelbåt', 'Dagshyra & övernattning', 'Hela Sverige'].map(t => (
              <span key={t} style={{ background: 'rgba(255,255,255,0.2)', color: 'var(--white)', borderRadius: 20, padding: '5px 12px', fontSize: 13, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 20px' }}>

        {/* Intro */}
        <section style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-muted)', margin: '0 0 16px' }}>
            Sverige har 270 000 km kustlinje och 221 800 öar – och du behöver inget körkort för att utforska dem med hyrbåt. En vanlig motorbåt, en sjökortsapp och en halvdag är allt som krävs för en minnesvärd dag bland öarna. Det är en av landets mest underskattade upplevelser.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-muted)', margin: 0 }}>
            Den här guiden täcker hyra båt i alla Nordens viktigaste vatten: Stockholms skärgård, Göteborg och Bohuslän, Gotland och Höga Kusten. Välj destination nedan för priser, licenskrav och de bästa hyrbåtsbolagen.
          </p>
        </section>

        {/* Destinationskort */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
            Var i Sverige vill du hyra båt?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
            {HYRBAT_SUBS.map(s => (
              <Link key={s.slug} href={`/hyra-bat/${s.slug}`} style={{
                background: 'var(--white)', borderRadius: 14, padding: '20px 18px',
                border: '1px solid var(--surface-3)', textDecoration: 'none', color: 'inherit', display: 'block',
              }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{s.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>{s.h1}</div>
                <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.6, margin: '0 0 12px' }}>{s.excerpt}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                  {s.tags.slice(0, 2).map(t => (
                    <span key={t} style={{ fontSize: 11, color: 'var(--sea)', background: 'rgba(10,123,140,0.08)', borderRadius: 8, padding: '2px 8px', fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
                <span style={{ fontSize: 13, color: 'var(--sea)', fontWeight: 600 }}>Priser och guide →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Snabb prisjämförelse */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
            Vad kostar det att hyra båt? (Stockholm som referens)
          </h2>
          <div style={{ background: 'var(--white)', borderRadius: 14, border: '1px solid var(--surface-3)', overflow: 'hidden' }}>
            {[
              { type: 'Liten motorbåt (4–5 m)', price: '900–1 500 kr/dag', note: 'Passar 2–4 personer, inget körkort' },
              { type: 'Mellanbåt (6–7 m)', price: '1 200–2 200 kr/dag', note: 'Bra fart, plats för 4–6' },
              { type: 'Stor motorbåt / kabinbåt', price: '2 000–4 000 kr/dag', note: 'Sovplatser, kajut' },
              { type: 'Segelbåt 28–35 fot', price: '3 500–7 000 kr/dag', note: 'Kräver segling i bakgrunden' },
            ].map((row, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr auto',
                padding: '14px 18px', borderBottom: i < 3 ? '1px solid var(--surface-3)' : 'none',
                gap: 12, alignItems: 'start',
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--ink)', marginBottom: 2 }}>{row.type}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{row.note}</div>
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--sea)', whiteSpace: 'nowrap' }}>{row.price}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 8, lineHeight: 1.5 }}>Bränsle tillkommer alltid. Priser varierar med säsong och bolag – juli är 20–30% dyrare.</p>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
            Vanliga frågor om att hyra båt i Sverige
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
              Läs också
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
          <div style={{ fontSize: 32, marginBottom: 12 }}>📍</div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Logga båtturerna på Svalla</h3>
          <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 20, lineHeight: 1.6 }}>
            Dokumentera resorna, dela foton och läs om öarna innan du kastar loss.
          </p>
          <Link href="/registrera" style={{
            display: 'inline-block', background: 'var(--sea)', color: 'var(--white)',
            padding: '12px 24px', borderRadius: 50, fontWeight: 700, fontSize: 15, textDecoration: 'none',
          }}>
            Kom igång gratis →
          </Link>
        </div>
      </div>
    </div>
  )
}
