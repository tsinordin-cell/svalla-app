import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Dagsturer i Stockholms skärgård — Bästa dagsutflykterna med båt | Svalla',
  description: 'De bästa dagsturerna från Stockholm till skärgården. Fjäderholmarna, Vaxholm, Sandhamn, Grinda och fler — restider, färjor och vad som väntar. Planera din dagstur 2026.',
  keywords: [
    'dagsturer stockholm skärgård',
    'dagsutflykt skärgård',
    'dagstur båt stockholm',
    'skärgårdsutflykt dagstur',
    'bästa dagstur stockholm',
    'dagstur från stockholm',
    'dagsturer från stockholm båt',
    'dagsutflykter skärgård',
    'fjäderholmarna dagstur',
    'vaxholm dagstur',
    'sandhamn dagstur',
    'grinda dagstur',
    'dagsturer stockholms skärgård',
  ],
  openGraph: {
    title: 'Dagsturer i Stockholms skärgård — Bästa dagsutflykterna med båt | Svalla',
    description: 'De bästa dagsturerna från Stockholm till skärgården. Fjäderholmarna, Vaxholm, Sandhamn, Grinda och fler — planera din dagstur.',
    url: 'https://svalla.se/dagsturer',
  },
  alternates: { canonical: 'https://svalla.se/dagsturer' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '🏝️',
    title: 'Fjäderholmarna',
    description: 'Närmaste öarna från Stockholm — bara 20 minuter med Waxholmsbåten. Populärt restaurangerna och enkelt naturbad. Perfekt för första gången i skärgården.',
    href: '/o/fjaderholmarna',
    meta: '20 min med Waxholmsbåten',
  },
  {
    icon: '🏰',
    title: 'Vaxholm',
    description: 'Historisk stad med den berömda Vaxholms fästning. 50 minuter från Stockholm — restauranger, affärer och gästhamn. Lätt att tillbringa en hel dag.',
    href: '/o/vaxholm',
    meta: '50 min med Waxholmsbåten',
  },
  {
    icon: '🏖️',
    title: 'Grinda',
    description: 'Lugn ö med fin sandstrand och familjevänlig miljö. 1 timme och 45 minuter ut — perfekt för en längre dagstur med bad och picknick.',
    href: '/o/grinda',
    meta: '1h 45min med Waxholmsbåten',
  },
  {
    icon: '⛵',
    title: 'Sandhamn',
    description: 'Skärgårdens klassiska destination och sommarnoje. 2 timmar och 30 minuter från Stockholm — Sandhamns Värdshus är legendarisk.',
    href: '/o/sandhamn',
    meta: '2h 30min med Waxholmsbåten',
  },
  {
    icon: '🚴',
    title: 'Utö',
    description: 'Lång men väl värd dagstur — 2 timmar ut. Cykling, Utö Värdshus och mitten av en före detta gruva. Bra för äventyrlystna.',
    href: '/o/uto',
    meta: '2h med Waxholmsbåten',
  },
  {
    icon: '🌲',
    title: 'Finnhamn',
    description: 'Naturparadis med vandringsleder och vildmark. 2 timmar från Stockholm — mindre touristiskt än Sandhamn, mer avskilt.',
    href: '/o/finnhamn',
    meta: '2h med Waxholmsbåten',
  },
]

export default function DagsturerPage() {
  return (
    <CategoryLanding
      heroGradient={['#1e3a5f', '#1e5c82']}
      eyebrow="Dagsturer"
      title="Dagstur till skärgården"
      tagline="Lämna Stockholm på morgonen, äta räkor vid havet, hem till kvällen — de bästa dagsturerna."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 17l4-8 4 4 3-6 4 10" />
          <path d="M3 21h18" />
        </svg>
      }
      intro={
        <>
          <p>
            Stockholms skärgård är en drömma för dagsturer. Med den moderna färjetrafiken via Waxholmsbåten eller egna båten tar det bara 20 minuter till Fjäderholmarna, 50 minuter till Vaxholm, och högst drygt två timmar och 30 minuter till Sandhamn — <strong>allt går att göra på en dag</strong>. Du kan lämna Stockholm på morgonen, äta räkor vid havet och vara hemma till kvällen. Ingen övernattning, ingen tältning, bara ren skärgård.
          </p>
          <p>
            Beroende på tid och ambition kan en dagstur passa alla. Nybörjare startar ofta på <strong>Fjäderholmarna</strong> — kort resa, restauranger, lugnt vatten. Från där kan du ta nästa steg till <strong>Vaxholm</strong> eller <strong>Grinda</strong> för något längre. De erfarna packar ofta båten och styr för <strong>Sandhamn</strong> eller <strong>Utö</strong>, där varje minut är väl värd det. Färjan från Slussen (Waxholmsbåten) är den populäraste vägen — enkelbiljett är billig, och du kan ta cykel ombord på många båtar.
          </p>
          <p>
            Planering är enkelt: kolla färjescheman, ta med solskydd och en liten matsäck eller pengar för att äta ute. Säsongen är från maj till september, då restauranger öppnar och vattnet blir både barnvänligt och behagligt för simning. Med Svalla kan du spara dina favoritöar, hitta naturhamnar och läsa tips från andra dagstörister — gör nästa tur ännu bättre än förra.
          </p>
        </>
      }
      itemsTitle="De bästa dagsturerna från Stockholm"
      itemsDescription="Från klassiska Fjäderholmarna till äventyret Sandhamn — alla är nåbara på en dag."
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Vanliga frågor om dagsturer i skärgården
          </h2>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Hur länge tar dagstur till Sandhamn?
          </h3>
          <p>
            Med Waxholmsbåten tar det ungefär 2 timmar och 30 minuter från Slussen till Sandhamn. Tillsammans med tiden på ön (2–3 timmar för lunch och att titta omkring) blir det en komplett dag — du kan ta båten dit på morgonen och åter på eftermiddagen samma dag. Många väljer att stanna längre och bo på något pensionat eller vandrarhem, men det är fullt möjligt att göra det som dagstur.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Vilken ö passar för en kort dagstur?
          </h3>
          <p>
            <strong>Fjäderholmarna</strong> är det bästa valet för en kort dagstur — bara 20 minuter från Slussen. Du kan fika, äta lunch och bada utan att spendera flera timmar på transport. <strong>Vaxholm</strong> är nästa steg upp — 50 minuter — och erbjuder mer att se: fästningen, butiker och restauranger. Om du har 3–4 timmar att spendera passar <strong>Grinda</strong> perfekt.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Kan man ta med cykel på Waxholmsbåten?
          </h3>
          <p>
            Ja. De flesta Waxholmsbåtar tillåter cyklar — ofta gratis eller för en liten avgift. Det är praktiskt för längre öar som <strong>Utö</strong>, <strong>Möja</strong> och <strong>Sandhamn</strong>, där cykling är ett vanligt sätt att utforska. Kontrollera båtens specifika regler på Waxholmsbåtens webbplats innan du åker.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Vad kostar dagstur till skärgården?
          </h3>
          <p>
            <strong>Färjebiljett</strong> för Waxholmsbåten kostar mellan 50–150 kronor per resa beroende på destination — Fjäderholmarna är billigast, Sandhamn dyrast. En dagskort eller helårsabonnemang kan spara pengar om du åker ofta. <strong>Mat och dryck</strong> på restauranger varierar från ca 100 kronor för kaffe till 200–400 kronor för en räksmörgås. Du kan också ta matsäck och spara pengar. Sammantaget kan en dagstur att två personer kosta från 300 kronor (bara färja + eget kaffe) till 1000+ kronor (båt och restaurang).
          </p>
        </>
      }
      cta={{
        label: 'Planera din dagstur',
        href: '/utflykt',
        secondaryLabel: 'Se färjor',
        secondaryHref: '/farjor',
      }}
      related={[
        { label: 'Alla färjor', href: '/farjor' },
        { label: 'Alla öar', href: '/o' },
        { label: 'Barnvänliga öar', href: '/oar/barnvanliga-oar' },
        { label: 'Stockholms skärgård', href: '/stockholms-skargard' },
      ]}
    />
  )
}
