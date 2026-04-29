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
    icon: '⚓',
    title: 'Svängsta',
    description: 'Klassisk naturhamn på Möja. Skyddad vika med bra djup och mysiga ankringskvällar. Helt utan avgifter — ankra och ta minsta fram.',
    href: '/platser?kategori=naturhamn',
    meta: 'Möja, mellanskärgården',
  },
  {
    icon: '🏔️',
    title: 'Bullerö',
    description: 'Södra skärgårdens pärla — naturreservat med sluttande klippor och öppen vy över Östersjön. Bäst för erfarna seglare med god väderprognos.',
    href: '/platser?kategori=naturhamn',
    meta: 'Södra skärgården',
  },
  {
    icon: '🌲',
    title: 'Ålö',
    description: 'Norra skärgårdens hemlighet — lugn naturhamn med tallskog och enkla förtöjningsplatser. Perfekt för seglare som söker avskildhet nära Stockholm.',
    href: '/platser?kategori=naturhamn',
    meta: 'Norra skärgården',
  },
  {
    icon: '🪨',
    title: 'Björkskär',
    description: 'Liten naturhamn i Möja-området med granit och buskmark. Populär bland seglare som vill komma bort från vägen utan att åka långt.',
    href: '/platser?kategori=naturhamn',
    meta: 'Möja-området',
  },
  {
    icon: '💧',
    title: 'Svartsö',
    description: 'Lugn och central naturhamn med kort väg från Stockholm. Bra skydd från väst och väl dold vika — lokal favoritplats.',
    href: '/platser?kategori=naturhamn',
    meta: 'Centrala skärgården',
  },
  {
    icon: '🌳',
    title: 'Svartnö',
    description: 'Odlad miljö med gamla stenmurar och kulturväxter. Naturhamn med historisk prägel — helt lugn och liten ankringsplats.',
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
        acceptedAnswer: { '@type': 'Answer', text: 'Nämdö, Svartsö och Ålö är ideala för första ankringen. De ligger nära Stockholm, har lugnt vatten skyddat från väst, djup mellan 3–5 meter och muddig eller sandig botten — perfekt för att lära sig ankra.' },
      },
      {
        '@type': 'Question',
        name: 'Hur djup måste en naturhamn vara?',
        acceptedAnswer: { '@type': 'Answer', text: 'Minst 3 meter vid lågvattnet — gärna 4–5 meter för stabilitet. I Stockholms skärgård varierar vattennivån med 0,4–0,7 meter. Sjunka ett stickprov och testa botten med en sond innan du ankrar.' },
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
            En naturhamn är en ankringsplats utan gästhamns infrastruktur — ingen strömbox, ingen reception, ingen Swish-betalning. Istället får du <strong>gratis förtöjning, skyddade vikar och allemansrätten</strong> på din sida. Det är seglingslivet i sin renaste form.
          </p>
          <p>
            Skillnaden mellan naturhamn och gästhamn är enkel men avgörande. Gästhamnen erbjuder service, men också köer, höga avgifter och sommartrafik. Naturhamnar erbjuder tystnad, originalitet och frihet — du ankrar där du vill, på ditt sätt, utan regler. Från <strong>Furusund i norr till Landsort i söder</strong> finns hundratals valbara vikar bara för dig.
          </p>
          <p>
            Vilken naturhamn passar dig? Det beror på <strong>djup, väder, vindläge och tid på året</strong>. En bra naturhamn skyddar från väst (sommarvinden), har minst 3 meters djup vid lågvattnet och en muddig eller sandlik botten där ankaret håller. Tyskväxten och påslilien är goda tecken — de växer bara på skyddade ställen. Italienskt väder och lugna nätter är din belöning för att hitta rätt.
          </p>
          <p>
            Allemansrätten ger dig rätt att ankra på naturhamn, men också skyldigheter. Ta hand om miljön. Lämna inget efter dig. Respektera privatägd mark och stugfolk. En naturhamn är en gåva — behandla den som sådan.
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
            <strong>Nämdö, Svartsö och Ålö</strong> är ideala för första ankringen. De ligger nära Stockholm, har lugnt vatten skyddat från väst, djup mellan 3–5 meter och muddig eller sandig botten. Här kan du lära dig att ankra utan att vikingarnas lugn störs av grovväder eller lång väg ut i skärgården. Sätt upp frestavar, testa ankaret — och lär dig då allt är lugnt och ljust.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Hur djup måste en naturhamn vara?
          </h3>
          <p>
            Minst 3 meter vid lågvattnet — gärna 4–5 meter för stabilitet. I Stockholms skärgård varierar vattennivån mellan 0,4 och 0,7 meter mellan höga och låga tider. En naturhamn med 3 meters djup vid kartans djupmarkeringar är säker för de flesta seglarbåtar. Innan du ankrar, sjunka ett stickprov, testa botten med en sond — och använd en bra ankarkarta.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Vad ska jag tänka på när jag ankrar i en naturhamn?
          </h3>
          <p>
            <strong>Väder först:</strong> En naturhamn skyddar bara från vissa vindkvartal — ofta väst och sydväst. Kolla väderprognosen innan du ankrar. <strong>Djup:</strong> Mät djupet själv — kartor kan vara gamla. <strong>Botten:</strong> Mudra hålls ankaret bäst — undvik ren sandbotten. <strong>Ankare:</strong> Använd ett pålitligt ankare (CQR eller Bruce fungerar i skärgården) och 50 meters kedja minimum. <strong>Allemansrätten:</strong> Respektera privatägd mark, lämna ingen skräp och var tyst efter midnatt.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Kan jag ha hundar och barn i en naturhamn?
          </h3>
          <p>
            Absolut. Många naturhamnar är perfekta för barnfamiljer och hundseglarе — de ligger lugnt, långt från båttrafik och ofta med små stränderna där hundar kan simma. Bara var försiktig med Tyskland där privatägd mark kan gränsa till ankringsplatsen. Naturhamnar är helt enkelt Sveriges bästa miljö för att ta med sig familj — där lugnet är äkta och världen verkar bara dina.
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
