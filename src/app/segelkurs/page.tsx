import type { Metadata } from 'next'
import Link from 'next/link'
import { GUIDES } from '@/app/guider/guides-data'
import { SEGELKURS_SUBS } from './segelkurs-data'
import { emojiToIcon } from '@/lib/iconMap'
import Icon from '@/components/Icon'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Segelkurs Sverige 2026 – hitta rätt kurs för din nivå | Svalla',
  description: 'Hitta segelkurs i Sverige. Nybörjarkurser, kustskepparintyget och seglarskola för barn. Jämför kurser i Stockholm, Göteborg och Bohuslän.',
  keywords: [
    'segelkurs',
    'segelkurs stockholm',
    'segelkurs nybörjare',
    'segla kurs',
    'kustskepparintyget',
    'segelkurs göteborg',
    'seglarskola barn',
    'förarintyg segling',
    'lära sig segla',
    'segelkurs bohuslän',
  ],
  alternates: { canonical: 'https://svalla.se/segelkurs' },
  openGraph: {
    title: 'Segelkurs Sverige 2026 – hitta rätt kurs',
    description: 'Nybörjarkurser, kustskepparintyget och seglarskola för barn. Hitta rätt segelkurs för din nivå.',
    url: 'https://svalla.se/segelkurs',
    type: 'website',
  },
}

const FAQ_ITEMS = [
  {
    q: 'Kan man lära sig segla utan förkunskaper?',
    a: 'Ja. Introduktionskurser och nybörjarkurser är öppna för alla som aldrig seglat. En dag räcker för att förstå grunderna. Välj en kurs i innerskärgård (Stockholm) eller sydskärgård (Göteborg) för de skyddade och lugna förhållandena.',
  },
  {
    q: 'Vad är skillnaden på förarintyg och kustskepparintyget?',
    a: 'Förarintyget (SBF/SSRS) ger rätt att föra de flesta fritidsbåtar och tar 2–3 helger. Kustskepparintyget (KA) är ett internationellt erkänt certifikat för segling upp till 200 sjömil offshore och tar 5–7 dagar mer intensivt. KA är vad hyrbåtsbolag och offshore-seglare kräver.',
  },
  {
    q: 'Hur lång tid tar det att ta kustskepparintyget?',
    a: 'Kursen tar 5–7 dagar (intensiv) eller 2–4 helger uppdelade. Självstudier inför teoriprovet tillkommer. Räkna totalt 3–6 månader om du läser i lugn takt vid sidan av jobbet.',
  },
  {
    q: 'Var hittar man segelkurser i Sverige?',
    a: 'Svenska Seglarförbundets hemsida listar alla certifierade segelsällskap och segelskolor i Sverige. Lokala segelsällskap (KSSS i Stockholm, GSS i Göteborg) är ofta billigare än kommersiella segelskolor och håller samma kursstandard.',
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
    { '@type': 'ListItem', position: 2, name: 'Segelkurs', item: 'https://svalla.se/segelkurs' },
  ],
}

const relatedGuides = GUIDES.filter(g => g.topics?.includes('segelkurs'))

export default function SegelkursPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Header */}
      <div style={{ background: 'var(--grad-sea-hero)', padding: '0 20px 48px', paddingTop: 'calc(env(safe-area-inset-top, 0px) + 16px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⛵</div>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 800, color: 'var(--white)', margin: '0 0 12px' }}>
            Segelkurs i Sverige
          </h1>
          <p style={{ color: 'var(--white)', opacity: 0.9, fontSize: 17, lineHeight: 1.65, margin: 0, maxWidth: 580 }}>
            Hitta rätt kurs för din nivå – från nybörjare som aldrig seglat till kustskepparintyget och offshore-segling.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
            {['Nybörjare välkommen', 'Kustskepparintyget', 'Seglarskola barn', 'Stockholm & Göteborg'].map(t => (
              <span key={t} style={{ background: 'rgba(255,255,255,0.2)', color: 'var(--white)', borderRadius: 20, padding: '5px 12px', fontSize: 13, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 20px' }}>

        {/* Intro */}
        <section style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-muted)', margin: '0 0 16px' }}>
            Segling är en av få aktiviteter där du lär dig hantera vind, vatten och navigering på en gång – och sedan har en livslång kompetens som öppnar upp hela Sveriges kust och skärgård. Sverige har över 400 segelsällskap som erbjuder kurser, från gratis provsegling till avancerade offshore-certifikat.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-muted)', margin: 0 }}>
            Välj kurs nedan utifrån nivå eller plats. Nybörjare börjar med introduktionskurser; den som vill hyra båt tar förarintyget; den som vill segla självständigt längs kusten siktar på kustskepparintyget.
          </p>
        </section>

        {/* Alla undersidor / kurs-typer */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
            Hitta rätt segelkurs
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
            {SEGELKURS_SUBS.map(s => (
              <Link key={s.slug} href={`/segelkurs/${s.slug}`} style={{
                background: 'var(--white)', borderRadius: 14, padding: '20px 18px',
                border: '1px solid var(--surface-3)', textDecoration: 'none', color: 'inherit', display: 'block',
              }}>
                <div style={{marginBottom: 10}} aria-hidden><Icon name={emojiToIcon(s.emoji)} size={28} /></div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>{s.h1}</div>
                <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.6, margin: '0 0 12px' }}>{s.excerpt.substring(0, 100)}…</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                  {s.tags.slice(0, 2).map(t => (
                    <span key={t} style={{ fontSize: 11, color: 'var(--sea)', background: 'rgba(10,123,140,0.08)', borderRadius: 8, padding: '2px 8px', fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
                <span style={{ fontSize: 13, color: 'var(--sea)', fontWeight: 600 }}>Se kurser →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Certifikatstege */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
            Segelcertifikatens stege i Sverige
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { step: 1, name: 'Introduktionskurs / Prova-på', time: '1 dag', note: 'Inget certifikat', color: '#22c55e' },
              { step: 2, name: 'Grön flagg / Seglarbok', time: '2–5 dagar', note: 'Erkänd av Svenska Seglarförbundet', color: '#22c55e' },
              { step: 3, name: 'Förarintyget (SBF/SSRS)', time: '2–3 helger', note: 'Krav hos de flesta hyrbåtsbolag', color: '#eab308' },
              { step: 4, name: 'Kustskepparintyget (KA)', time: '5–7 dagar', note: 'Internationellt erkänt, krav för offshore', color: '#f97316' },
              { step: 5, name: 'Offshore-certifikat', time: '7–14 dagar', note: 'Bluewater och långdistanssegling', color: '#ef4444' },
            ].map((s, i) => (
              <div key={i} style={{
                background: 'var(--white)', borderRadius: 12, padding: '14px 18px',
                border: '1px solid var(--surface-3)', display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', background: s.color,
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 14, flexShrink: 0,
                }}>{s.step}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 2 }}>{s.time} · {s.note}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
            Vanliga frågor om segelkurser
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
                  <span aria-hidden><Icon name={emojiToIcon(g.emoji)} size={24} /></span>
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
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Logga dina segel-äventyr på Svalla</h3>
          <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 20, lineHeight: 1.6 }}>
            Dokumentera turerna, spara rutter och läs guider om öarna längs vägen.
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
