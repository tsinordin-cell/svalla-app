import type { Metadata } from 'next'
import Prisobservation from '@/components/Prisobservation'
import Link from 'next/link'
import { GUIDES } from '@/app/guider/guides-data'
import { HYRBAT_SUBS } from './hyrbat-data'
import Icon from '@/components/Icon'
import { emojiToIcon } from '@/lib/iconMap'

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'Hyra båt i Sverige 2026 – guide till båtuthyrning | Svalla',
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
    // KÄLLA: observerat i 18 öppna annonser hos Ship O'Hoi och Click&Boat, Stockholm, avlästa 2026-08-10
    a: 'I öppna annonser för Stockholm (avlästa 10 augusti 2026) låg små motorbåtar på 995–5 869 kr/dag, mellanklassen 6–8 m på 2 250–7 337 kr/dag och segelbåt 31–36 fot på 5 000–5 890 kr/dag. Spannen är breda för att samma båtstorlek kan kosta flera gånger mer hos en förmedlare än en annan — jämför alltid. Bränsle tillkommer nästan alltid.',
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
          <div style={{ marginBottom: 12, color: 'var(--white)', display: 'flex', justifyContent: 'center' }}><Icon name="sailboat" size={40} stroke={1.5} /></div>
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
                <div style={{ marginBottom: 10, color: 'var(--sea)' }}><Icon name={emojiToIcon(s.emoji)} size={28} stroke={1.7} /></div>
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
          <Prisobservation antal={18} kallor="Ship O'Hoi och Click&Boat" hamtad="10 augusti 2026" />
          <div style={{ background: 'var(--white)', borderRadius: 14, border: '1px solid var(--surface-3)', overflow: 'hidden' }}>
            {[
              // KÄLLA: observerat i 18 öppna annonser hos Ship O'Hoi och Click&Boat, Stockholm, avlästa 2026-08-10
              { type: 'Liten motorbåt (4–6 m)', price: '995–5 869 kr/dag', note: '4 annonser — lägst hos Ship O\'Hoi, högst hos Click&Boat' },
              { type: 'Mellanstor motorbåt (6–8 m)', price: '2 250–7 337 kr/dag', note: '9 annonser, kajut i övre delen' },
              { type: 'Segelbåt 31–36 fot', price: '5 000–5 890 kr/dag', note: '3 annonser, kräver seglingsvana' },
              { type: 'Segelbåt 45–46 fot', price: '9 000–14 000 kr/dag', note: '4 annonser, havskryssare' },
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

        {/* Förmedlare vi hämtat priser från */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 }}>
            Var hyr man?
          </h2>
          <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 16, lineHeight: 1.6 }}>
            Förmedlarna som prisspannen ovan är avlästa hos. Vi listar bara källor vi själva kontrollerat.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
            {[
              {
                namn: "Ship O'Hoi",
                url: 'https://www.ship-ohoi.com/sv/hyra/baat/plats/stockholm',
                text: 'Svensk båtuthyrning med fasta dygnspriser per båt. Vid vår avläsning 10 augusti 2026: 22 båtar i Stockholm, från 995 kr/dag.',
              },
              {
                namn: 'Click&Boat',
                url: 'https://www.clickandboat.com/se/hyra-bat/sverige/stockholms-l%C3%A4n',
                text: 'Marknadsplats där privatpersoner och företag hyr ut. Störst utbud, men mest skepparcharter per tur — vid vår avläsning var få annonser ren dygnshyra, och priserna låg klart högre än hos fasta uthyrare.',
              },
            ].map((f, i) => (
              <a key={i} href={f.url} target="_blank" rel="noopener noreferrer"
                style={{ background: 'var(--white)', borderRadius: 14, padding: '18px', border: '1px solid var(--surface-3)', textDecoration: 'none', display: 'block' }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>{f.namn} ↗</div>
                <p style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.6, margin: 0 }}>{f.text}</p>
              </a>
            ))}
          </div>
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
                  <span style={{ color: 'var(--sea)', display: 'inline-flex', flexShrink: 0 }}><Icon name={emojiToIcon(g.emoji)} size={24} stroke={1.7} /></span>
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
          <div style={{ marginBottom: 12, color: 'var(--sea)', display: 'flex', justifyContent: 'center' }}><Icon name="pin" size={32} stroke={1.7} /></div>
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
