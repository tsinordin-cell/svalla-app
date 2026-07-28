import type { Metadata } from 'next'
import Link from 'next/link'
import { ALL_ISLANDS } from '@/app/o/island-data'

export const metadata: Metadata = {
  title: 'Kajak i Stockholms skärgård — guide för nybörjare och erfarna',
  description: 'Allt om kajakpaddling i skärgården: bästa öar, säkerhetstips, utrustning och uthyrning. Perfekt för nybörjare och erfarna paddlare.',
  keywords: [
    'kajak stockholms skärgård',
    'kajak skärgård nybörjare',
    'hyra kajak skärgård',
    'paddling skärgård',
    'kajak med barn skärgård',
    'kajak tur stockholm',
    'kayak archipelago sweden',
    'kajakpaddling utö',
    'kajak sandhamn',
    'kajak grinda',
  ],
  alternates: { canonical: 'https://svalla.se/aktivitet/kajak' },
  openGraph: {
    title: 'Kajak i Stockholms skärgård — guide för nybörjare och erfarna',
    description: 'Hitta de bästa öarna för kajakpaddling, var du hyr kajak och vad du behöver veta om säkerhet i skärgårdens vatten.',
    url: 'https://svalla.se/aktivitet/kajak',
    type: 'website',
  },
}

export const revalidate = 86400

// Öar med kajak-uthyrning
const kajakOar = ALL_ISLANDS.filter(i => i.activity_meta?.kajak?.rental)

const FAQ_ITEMS = [
  {
    q: 'Kan nybörjare paddla kajak i Stockholms skärgård?',
    a: 'Ja — innerskärgårdens lugna vikar och sund är utmärkta för nybörjare. Börja med en guidad tur eller hyr kajak vid en av de etablerade uthyrningsplatserna på Sandhamn, Utö eller Grinda. Undvik öppet vatten och passa på vindar. Halvdagsturer på 2–4 timmar är lagom för första gången.',
  },
  {
    q: 'Var hyr man kajak i Stockholms skärgård?',
    a: 'Kajak hyrs vid hamnen på Sandhamn, Utö, Grinda, Vaxholm och Möja. Priset ligger på 300–500 kr för halvdag och 500–800 kr för heldag. På sommaren, boka i förväg — uthyrningen tar slut tidigt på populära dagar. Utö har störst utbud med ca 50 kajaker.',
  },
  {
    q: 'Vilken utrustning behöver man för kajak i skärgården?',
    a: 'Flytväst är obligatorisk och ingår alltid i uthyrningen. Paddeljacka eller våtdräkt rekommenderas för tidigt på säsongen (maj–juni) när vattnet är kallt. Ta med solskydd, vatten, lätt mat och en drybag för värdesaker. En visselpipa och mobiltelefon i vattentätt fodral är bra säkerhetsutrustning.',
  },
  {
    q: 'Hur svårt är det att paddla kajak i skärgården?',
    a: 'Grunderna i kajakpaddling lär man sig på 15–20 minuter. Det fysiskt krävande är att paddla mot vind — på en lugn dag i innerskärgården klarar de flesta 8–12 km bekvämt. Yttre skärgården med starka vindbyar och öppet vatten är för erfarna paddlare.',
  },
  {
    q: 'Vad kostar det att paddla kajak i skärgården?',
    a: 'Kajakhyrning kostar 300–500 kr för halvdag (4 h) och 500–800 kr för heldag. Guidade turer med instruktör kostar 600–1 200 kr per person. Många aktörer erbjuder familjepaket. Räkna också med eventuell färjebiljett till ön.',
  },
  {
    q: 'Är kajak i skärgården säkert för barn?',
    a: 'Ja, för barn över ca 5–6 år. De flesta uthyrningsplatser erbjuder tandemkajak där ett barn sitter med en vuxen. Livräddningsväst i barnstorlek ingår alltid. Håll dig i skyddade vikar och välj lugna dagar. Lugnast är innerskärgårdens sund i juli och augusti.',
  },
  {
    q: 'Vilka leder är bäst för kajakpaddling i skärgården?',
    a: 'Populära kajakleder: Sandhamn-runda (5–7 km), Grinda–Finnhamn (10 km), Utö–Ålö–Rånö (15 km), Vaxholm–Resarö–Rindö (8 km). Alla dessa leder håller sig i relativt skyddade vatten. Skärgårdsstiftelsens naturhamnar längs leden är perfekta rastplatser.',
  },
]

const STEG = [
  {
    nr: 1,
    titel: 'Välj ö och boka uthyrning',
    text: 'Sandhamn, Utö och Grinda är de enklaste startpunkterna med etablerad uthyrning. Boka uthyrning i förväg online — speciellt i juli. Kontrollera väderprognoser (vindstyrka under 5 m/s är bra för nybörjare).',
  },
  {
    nr: 2,
    titel: 'Ta dig till ön',
    text: 'Ta Waxholmsbolaget från Strömkajen eller Stavsnäs. Kajaken väntar vid uthyrningsstället vid hamnen — du behöver inte ta med något eget.',
  },
  {
    nr: 3,
    titel: 'Säkerhetsgenomgång och packning',
    text: 'Uthyraren ger dig en kort instruktion om paddelteknik, hur du självrätar kajaken och vad du gör om du kapsejsar. Packa drybag med mobiltelefon, mat och solskydd.',
  },
  {
    nr: 4,
    titel: 'Paddla!',
    text: 'Börja med att paddla en kort sträcka från hamnen för att testa. Håll dig nära strandlinjen och i lä. En halvdag ger dig 8–12 km beroende på vind och paustid.',
  },
  {
    nr: 5,
    titel: 'Lämna tillbaka och ät',
    text: 'Lämna kajaken i tid — uthyrningsplatser har strikta återlämningstider. Avsluta med lunch eller fika på ön innan du tar båten tillbaka.',
  },
]

export default function KajakPage() {
  const exerciseAction = {
    '@context': 'https://schema.org',
    '@type': 'ExerciseAction',
    name: 'Kajakpaddling i Stockholms skärgård',
    description: 'Paddla kajak bland öarna i Stockholms skärgård. Perfekt för nybörjare och erfarna paddlare.',
    url: 'https://svalla.se/aktivitet/kajak',
    exerciseType: 'Kayaking',
    sportActivityLocation: {
      '@type': 'TouristDestination',
      name: 'Stockholms skärgård',
      description: 'Stockholms skärgård med 30 000+ öar, perfekt för kajakpaddling.',
    },
    subjectOf: {
      '@type': 'HowTo',
      name: 'Hur paddlar man kajak i skärgården som nybörjare?',
      description: 'Steg-för-steg guide för din första kajaktur i Stockholms skärgård.',
      step: STEG.map(s => ({
        '@type': 'HowToStep',
        position: s.nr,
        name: s.titel,
        text: s.text,
      })),
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const speakable = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Kajak i Stockholms skärgård — guide för nybörjare och erfarna',
    url: 'https://svalla.se/aktivitet/kajak',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '#kajak-intro'],
    },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Aktiviteter', item: 'https://svalla.se/aktivitet' },
      { '@type': 'ListItem', position: 3, name: 'Kajak', item: 'https://svalla.se/aktivitet/kajak' },
    ],
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(exerciseAction) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakable) }} />

      {/* Header */}
      <div style={{ background: 'var(--grad-sea-hero)', padding: '0 20px 48px', paddingTop: 'calc(env(safe-area-inset-top, 0px) + 16px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Link href="/aktivitet" style={{ color: 'var(--white)', opacity: 0.8, fontSize: 14, textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
            ← Aktiviteter
          </Link>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🛶</div>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 800, color: 'var(--white)', margin: '0 0 12px' }}>
            Kajak i Stockholms skärgård
          </h1>
          <p style={{ color: 'var(--white)', opacity: 0.9, fontSize: 17, lineHeight: 1.65, margin: 0, maxWidth: 580 }}>
            Paddla bland tusentals öar, klippor och naturhamnar. Stockholms skärgård är ett av Europas bästa kajakrevir — nås direkt med kollektivtrafik.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
            {['Nybörjarvänligt', 'Uthyrning på plats', 'Direktbåt från stan', 'Barn OK från 5 år'].map(t => (
              <span key={t} style={{ background: 'rgba(255,255,255,0.2)', color: 'var(--white)', borderRadius: 20, padding: '5px 12px', fontSize: 13, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 20px' }}>

        {/* Intro-text */}
        <section style={{ marginBottom: 40 }}>
          <p id="kajak-intro" style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-muted)', margin: 0 }}>
            Stockholms skärgård är ett av världens mest tillgängliga kajakrevir. Du tar Waxholmsbåten ut till en ö, hyr kajak vid hamnen och paddlar bland klippor och naturhamnar — utan att behöva ta med något eget. Innerskärgårdens skyddade vatten är perfekta för nybörjare, medan ytterskärgårdens öppna fjärdar erbjuder mer utmanande paddling för den erfarne.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink-muted)', margin: '16px 0 0' }}>
            Kajakpaddling är en av de aktiviteter som ger skärgården ett helt nytt perspektiv. Du kommer nära klipporna, kan anlöpa naturhamnar som är omöjliga med motorbåt och rör dig i din egen takt. En halvdag räcker för en minnesvärd upplevelse.
          </p>
          <p style={{ marginTop: 16, fontSize: 15 }}>
            <Link href="/blogg/kajak-stockholms-skargard-nyborjare" style={{ color: 'var(--sea)', fontWeight: 600, textDecoration: 'none' }}>
              Läs vår kompletta nybörjarguide för kajak i skärgården →
            </Link>
          </p>
        </section>

        {/* Öar med kajak */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
            Var kan man hyra kajak i Stockholms skärgård?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
            {kajakOar.map(island => (
              <Link key={island.slug} href={`/o/${island.slug}`} style={{
                background: 'var(--white)',
                borderRadius: 14,
                padding: '18px 18px',
                border: '1px solid var(--surface-3)',
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
              }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>🛶</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 4 }}>{island.name}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.5, marginBottom: 8 }}>
                  {island.activity_meta?.kajak?.notes ?? 'Kajakhyrning vid hamnen.'}
                </div>
                <div style={{ fontSize: 12, color: 'var(--sea)', fontWeight: 600 }}>
                  {island.activity_meta?.kajak?.difficulty === 'lätt' ? '🟢 Lätt' : island.activity_meta?.kajak?.difficulty === 'medel' ? '🟡 Medel' : '🔴 Svår'} · Uthyrning: {island.activity_meta?.kajak?.rental ? 'Ja' : 'Nej'}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Steg-för-steg */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
            Hur paddlar man kajak i skärgården för första gången?
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {STEG.map(s => (
              <div key={s.nr} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'var(--white)', borderRadius: 14, padding: '18px 20px', border: '1px solid var(--surface-3)' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--sea)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{s.nr}</div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{s.titel}</div>
                  <p style={{ fontSize: 14, color: 'var(--ink-muted)', margin: 0, lineHeight: 1.65 }}>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
            Vanliga frågor om kajak i skärgården
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

        {/* CTA till blogg */}
        <div style={{ background: 'var(--surface-2)', borderRadius: 16, padding: '28px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🛶</div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Redo att paddla?</h3>
          <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: 20, lineHeight: 1.6 }}>
            Läs vår fullständiga guide om utrustning, säkerhet och de bästa lederna för din första kajaktur.
          </p>
          <Link href="/blogg/kajak-stockholms-skargard-nyborjare" style={{
            display: 'inline-block',
            background: 'var(--sea)',
            color: 'var(--white)',
            padding: '12px 24px',
            borderRadius: 50,
            fontWeight: 700,
            fontSize: 15,
            textDecoration: 'none',
          }}>
            Läs nybörjarguiden →
          </Link>
        </div>
      </div>
    </div>
  )
}
