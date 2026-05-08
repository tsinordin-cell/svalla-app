import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Naturhamnar i Stockholms skärgård — Ankringsguide | Svalla',
  description: 'Hitta de bästa naturhamnarna i Stockholms skärgård. Skyddade vikar, ankringsplatser och gratis förtöjning från Furusund till Landsort. Uppdaterad guide för seglare 2026.',
  keywords: [
    'naturhamnar stockholms skärgård',
    'ankra stockholms skärgård',
    'förtöjning skärgård',
    'naturhamn segling',
    'skyddade vikar',
    'gratis ankring',
    'ankringsplatser stockholm',
    'seglarstugor',
    'vildmarkscamping båt',
    'allemansrätten segling',
  ],
  openGraph: {
    title: 'Naturhamnar i Stockholms skärgård — Ankringsguide | Svalla',
    description: 'Hitta de bästa naturhamnarna i Stockholms skärgård. Gratis ankring och skyddade vikar för seglare.',
    url: 'https://svalla.se/naturhamnar',
  },
  alternates: { canonical: 'https://svalla.se/naturhamnar' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '',
    title: 'Möja',
    description: 'Mellanskärgårdens klassiska seglarö. Flera skyddade vikar runt ön — Berg, Ramsmora och Långviksskär bjuder på lugna ankringskvällar med Bergs Glass och bröd-shoppen som bonus.',
    href: '/platser?kategori=naturhamn',
    meta: 'Möja, mellanskärgården',
  },
  {
    icon: '🏔️',
    title: 'Bullerö',
    description: 'Yttre skärgårdens pärla — naturreservat sedan 1967 i Nämdö-området, med jaktstuga byggd av Bruno Liljefors 1909. Klippor och öppen vy mot havet. För erfarna seglare med god väderprognos.',
    href: '/platser?kategori=naturhamn',
    meta: 'Yttre skärgården',
  },
  {
    icon: '',
    title: 'Ålö',
    description: 'Naturreservat granne med Utö i södra skärgården. Tallskog, vandringsleder och fina ankringsvikar. Brobunden till Utö, vilket gör det enkelt att kombinera.',
    href: '/platser?kategori=naturhamn',
    meta: 'Södra skärgården',
  },
  {
    icon: '🪨',
    title: 'Björkskär',
    description: 'Klassisk ankringsplats i ytterskärgården öster om Möja-/Sandhamnsområdet. Granit och låg buskmark — populärt för seglare som söker mer öppen havskänsla.',
    href: '/platser?kategori=naturhamn',
    meta: 'Yttre skärgården',
  },
  {
    icon: '💧',
    title: 'Svartsö',
    description: 'Lugn naturhamn-rik ö i mellanskärgården. Bra skydd från flera vindkvartal i de många mindre vikarna. Kort till samhälle med butik, lanthandel och färjeläge.',
    href: '/platser?kategori=naturhamn',
    meta: 'Mellanskärgården',
  },
  {
    icon: '🌳',
    title: 'Finnhamn',
    description: 'STF-vandrarhem på en av mellanskärgårdens vackraste öar. Naturreservat med flera skyddade ankringsplatser runt ön — t.ex. Storkliven och vikarna mot Idholmen.',
    href: '/platser?kategori=naturhamn',
    meta: 'Mellanskärgården',
  },
]

export default function NaturhamnarPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Vad är en naturhamn?',
        acceptedAnswer: { '@type': 'Answer', text: 'En naturhamn är en ankringsplats utan formell infrastruktur — ingen hamnadministration, ingen gästbok, ingen avgift. Du ankrar fritt på en skyddad vika där djupet räcker och botten håller. Naturhamnar är ofta mer vilda och autentiska än gästhamnar.' },
      },
      {
        '@type': 'Question',
        name: 'Är det gratis att ankra i naturhamnar i Sverige?',
        acceptedAnswer: { '@type': 'Answer', text: 'Ja, helt gratis. Det finns inga avgifter, ingen elmätare och ingen reception. Allemansrätten ger dig rätt att ankra på naturhamnar, men du måste respektera privatägd mark och miljön.' },
      },
      {
        '@type': 'Question',
        name: 'Vilka naturhamnar är bäst för nybörjare i Stockholms skärgård?',
        acceptedAnswer: { '@type': 'Answer', text: 'Möja, Svartsö och inre Nämdö-området är fina för första ankringen. De ligger relativt nära Stockholm, har gott om skyddade vikar för olika vindar och flera har samhälle/butik nära.' },
      },
      {
        '@type': 'Question',
        name: 'Hur djup ska en naturhamn vara?',
        acceptedAnswer: { '@type': 'Answer', text: 'För typiska kölbåtar (1,4–1,8 m djupgående) vill du gärna ha minst 3 meter där du ankrar. Östersjön har ingen reell tidvattendynamik — vattenståndet styrs av vind och lufttryck och varierar oftast bara några decimeter.' },
      },
    ],
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Naturhamnar', item: 'https://svalla.se/naturhamnar' },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <CategoryLanding
      heroGradient={['#0a4a5e', '#0a7b8c']}
      eyebrow="Naturhamnar"
      title="Ankra fritt i skärgården"
      tagline="Över 400 naturhamnar — skyddade vikar, klippor och stilla kvällar utan avgifter."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 2v20" />
          <path d="M2 8h20" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      }
      intro={
        <>
          <p>
            En naturhamn är en ankringsplats utan gästhamnens infrastruktur — ingen strömbox, ingen reception, inget pris att betala. Istället får du <strong>gratis förtöjning, skyddade vikar och allemansrätten</strong> på din sida. Det är seglingslivet i sin renaste form.
          </p>
          <p>
            Skillnaden mellan naturhamn och gästhamn är enkel men avgörande. Gästhamnen ger service, men också köer, avgifter och sommartrafik. Naturhamnar ger tystnad och frihet — du ankrar där det är säkert och tillåtet. Från <strong>Furusund i norr till Landsort i söder</strong> finns hundratals lämpliga vikar i Stockholms skärgård.
          </p>
          <p>
            Vilken naturhamn passar dig? Det beror på <strong>djup, vindkvartal och tid på året</strong>. En bra naturhamn skyddar mot vinden från det håll prognosen säger, har gott djup och en botten där ankaret håller — typiskt sand eller lera. Östersjön har ingen tidvattendynamik att tala om (vattenståndet styrs av vind och lufttryck och varierar oftast bara några decimeter), så &quot;djup vid lågvattnet&quot; är inte samma sak som på västkusten.
          </p>
          <p>
            Allemansrätten ger dig rätt att tillfälligt ankra och vistas i skärgården, men också skyldigheter. Ta hand om miljön. Lämna inget efter dig. Respektera fågelskyddsområden (landstigningsförbud 1 april–15 juli i många reservat) och privatägd mark. En naturhamn är en förmån — behandla den så.
          </p>
        </>
      }
      itemsTitle="Populära naturhamnar i Stockholms skärgård"
      itemsDescription="Sex klassiska ankringsplatser från norra till södra skärgården — alla fria, alla skyddade."
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Vanliga frågor om naturhamnar
          </h2>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Vad är en naturhamn?
          </h3>
          <p>
            En naturhamn är en ankringsplats utan formell infrastruktur — ingen hamnadministration, ingen gästbok, ingen avgift. Du ankrar fri och frivilligt på en skyddad vika där djupet räcker och botten håller. Naturhamnar är ofta mindre, mer vilda och långt mer autentiska än gästhamnar. De är Sveriges sätt att säga att skärgården tillhör alla.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Är det gratis att ankra i naturhamnar?
          </h3>
          <p>
            Ja, helt gratis. Det finns inga avgifter, ingen elmätare och ingen reception. Du ankrar där du vill, så länge du respekterar allemansrätten och inte ligger över privata ägodelar. Naturhamnar är en av de sista möjligheterna för seglare att vara helt obunden av ekonomi och administration — en gåva från Sveriges allemansrätt och skärgårdskultur.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Vilka naturhamnar är bäst för nybörjare?
          </h3>
          <p>
            <strong>Möja, Svartsö och inre Nämdö-området</strong> är fina för dina första ankringar. De ligger relativt nära Stockholm, har gott om skyddade vikar för olika vindar och flera har samhälle/butik nära ifall något oförutsett händer. Öva i lugnt väder och dagsljus innan du tar dig längre ut.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Hur djup ska en naturhamn vara?
          </h3>
          <p>
            För typiska kölbåtar (1,4–1,8 m djupgående) vill du gärna ha minst 3 meter där du ligger för ankar, gärna mer för marginal vid vindändring. Östersjön har ingen reell tidvattendynamik — vattenståndet varierar med vind och lufttryck, oftast bara några decimeter. Lita inte blint på sjökortet; lodningar kan ha ändrats. Mät själv med ekolod eller lod när du går in.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Vad ska jag tänka på när jag ankrar i en naturhamn?
          </h3>
          <p>
            <strong>Väder först:</strong> En naturhamn skyddar bara från vissa vindkvartal. Kolla prognos och planera reträtt. <strong>Djup:</strong> Mät själv — sjökort kan vara gamla. <strong>Botten:</strong> Sand och lera ger oftast bäst grepp för ankaret. Undvik hård botten med berg, alger eller grus. <strong>Ankare och kätting:</strong> Lägg ut tillräcklig kättinglängd i förhållande till djupet (riktmärke 4–5 gånger vattendjupet i bra väder, mer i hård vind). Vanliga ankartyper i skärgården är Bruce, Delta och plogankare. <strong>Allemansrätten:</strong> Respektera privatägd mark, lämna inget skräp och visa hänsyn mot grannar i viken.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Kan jag ha hundar och barn i en naturhamn?
          </h3>
          <p>
            Ja. Många naturhamnar är fina för barnfamiljer och hundägare — de ligger lugnt, långt från båttrafik och har ofta klippor eller småstränder att gå iland på. Tänk på koppeltvång (1 mars–20 augusti i naturen, men lokala regler kan vara strängare i naturreservat) och respektera privatägd mark vid ankringsplatsen.
          </p>
        </>
      }
      cta={{ label: 'Se naturhamnar på kartan', href: '/platser?kategori=naturhamn' }}
      related={[
        { label: 'Segelrutter', href: '/segelrutter' },
        { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
        { label: 'Stockholms skärgård', href: '/stockholms-skargard' },
        { label: 'Nybörjare & segling', href: '/nyborjare-segling' },
      ]}
    />
    </>
  )
}
