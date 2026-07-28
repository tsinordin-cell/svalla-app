import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Statistik om Stockholms skärgård — fakta, siffror och data',
  description: 'Fakta och statistik om Stockholms skärgård: antal öar, besökare, trafik, natur och säsong. Verifierade siffror med källhänvisningar.',
  keywords: [
    'statistik stockholms skärgård',
    'fakta stockholms skärgård',
    'hur många öar stockholms skärgård',
    'skärgård siffror',
    'stockholms skärgård data',
    'antal öar skärgård',
    'skärgård geografi fakta',
  ],
  alternates: { canonical: 'https://svalla.se/statistik' },
  openGraph: {
    title: 'Statistik om Stockholms skärgård | Svalla',
    description: 'Fakta och statistik om Stockholms skärgård: antal öar, besökare, trafik och natur.',
    url: 'https://svalla.se/statistik',
  },
}

const UPDATED = '2026-05-27'

const SECTIONS = [
  {
    title: 'Geografi',
    icon: '🗺️',
    color: '#1e5c82',
    bg: 'rgba(30,92,130,0.06)',
    border: 'rgba(30,92,130,0.18)',
    stats: [
      { label: 'Antal öar, holmar och skär', value: 'ca 30 000', note: 'Varav ca 1 000 bebodda året runt', source: 'Länsstyrelsen Stockholm' },
      { label: 'Utbredning österut', value: 'ca 150 km', note: 'Från Stockholms innerstad till ytterskärgårdens gräns', source: 'Sjöfartsverket' },
      { label: 'Nord–sydlig bredd', value: 'ca 80 km', note: 'Från Arholma i norr till Landsort i söder', source: 'Lantmäteriet' },
      { label: 'Total vattenarea', value: 'ca 6 000 km²', note: 'Inklusive fjärdar, sund och öppna havsområden', source: 'SCB' },
      { label: 'Djupaste punkt', value: 'ca 246 m', note: 'I Landsortssdjupet, Östersjöns djupaste punkt', source: 'SMHI' },
    ],
  },
  {
    title: 'Trafik och tillgänglighet',
    icon: '⛴️',
    color: '#2d7a5c',
    bg: 'rgba(45,122,92,0.06)',
    border: 'rgba(45,122,92,0.18)',
    stats: [
      { label: 'Waxholmsbolagets bryggor', value: '150+', note: 'I Stockholms skärgård och längs Mälarens stränder', source: 'Waxholmsbolaget' },
      { label: 'Waxholmsbolagets linjer', value: '30+', note: 'Reguljär kollektivtrafik på vatten, sommar och helår', source: 'Waxholmsbolaget' },
      { label: 'Cinderellabåtarnas säsong', value: 'ca 5 månader', note: 'Maj–september, från Strömkajen till ytterskärgården', source: 'Strömma/Cinderella' },
      { label: 'Pendeltåg till Nynäshamn', value: 'ca 55 min', note: 'Från Stockholm Central — utgångspunkt för Utö och södra skärgården', source: 'SL' },
    ],
  },
  {
    title: 'Natur och miljö',
    icon: '🌿',
    color: '#4a7c3f',
    bg: 'rgba(74,124,63,0.06)',
    border: 'rgba(74,124,63,0.18)',
    stats: [
      { label: 'Naturreservat i skärgården', value: 'ca 150', note: 'Förvaltas av Länsstyrelsen och Skärgårdsstiftelsen', source: 'Länsstyrelsen Stockholm' },
      { label: 'Land som förvaltas av Skärgårdsstiftelsen', value: 'ca 23 000 ha', note: 'Öar och strandområden för allmänhetens friluftsliv', source: 'Skärgårdsstiftelsen' },
      { label: 'Salthalt i ytterskärgården', value: '6–7 ‰', note: 'Bräckt vatten — lägre än Nordsjöns ca 35 ‰', source: 'SMHI' },
      { label: 'Medelvattentemperatur juli', value: '18–22 °C', note: 'I ytskiktet i innerskärgården vid god sommar', source: 'SMHI' },
      { label: 'Fågelarter i skärgården', value: 'ca 200', note: 'Häckande och rastande arter, inkl. ejder, sillgrissla, havsörn', source: 'ArtDatabanken/SLU' },
    ],
  },
  {
    title: 'Säsong och besök',
    icon: '📅',
    color: '#8b5e3c',
    bg: 'rgba(139,94,60,0.06)',
    border: 'rgba(139,94,60,0.18)',
    stats: [
      { label: 'Navigeringssäsong', value: 'maj–september', note: 'Ca 5 månader av full aktivitet. Islossning mars–april i innerskärgården', source: 'SMHI/Sjöfartsverket' },
      { label: 'Populäraste månaden', value: 'juli', note: 'Störst besökarantryck, flest avgångar, flest uthyrda båtar och kajaker', source: 'Waxholmsbolaget' },
      { label: 'Midsommarhelgen', value: 'topphelgen', note: 'Högst nyttjandegrad av naturhamnar, bryggor och restauranger under hela året', source: 'Skärgårdsstiftelsen' },
      { label: 'Eldningsförbud', value: 'varierar per år', note: 'Utfärdas av länsstyrelsen vid torka — kontrollera alltid på krisinformation.se', source: 'Länsstyrelsen Stockholm' },
    ],
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Hur många öar finns det i Stockholms skärgård?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Stockholms skärgård består av ca 30 000 öar, holmar och skär enligt Länsstyrelsen Stockholm. Av dessa är ca 1 000 bebodda året runt. Resten är allt från klippor knappt synliga ovan ytan till stora öar med skog och jordbruksmark.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hur stor är Stockholms skärgård?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Skärgården sträcker sig ca 150 km österut från Stockholm och ca 80 km i nord–sydlig riktning (från Arholma i norr till Landsort i söder). Den totala vattenarealen är ca 6 000 km².',
      },
    },
    {
      '@type': 'Question',
      name: 'Hur djupt är Östersjön i Stockholms skärgård?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Östersjöns djupaste punkt, Landsortssdjupet, ligger i skärgårdens södra del och mäter ca 246 meter. I innerskärgårdens sund och fjärdar är djupet betydligt lägre, ofta 5–30 meter.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hur många naturreservat finns i Stockholms skärgård?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Det finns ca 150 naturreservat i Stockholms skärgård, förvaltade av Länsstyrelsen Stockholm och Skärgårdsstiftelsen. Skärgårdsstiftelsen förvaltar ensamt ca 23 000 hektar land fördelat på hundratals öar.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hur salt är vattnet i Stockholms skärgård?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vattnet i Stockholms skärgård är bräckt med en salthalt på ca 6–7 promille i ytterskärgården. Det är betydligt lägre än Nordsjöns ca 35 promille men högre än Finska vikens innersta delar. Salthalten minskar ju längre in mot Stockholm man kommer.',
      },
    },
  ],
}

const dataPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'Statistik om Stockholms skärgård',
  description: 'Fakta och statistik om Stockholms skärgård: geografi, trafik, natur och säsong. Sammanställt av Svalla med källhänvisningar till Länsstyrelsen, SMHI, Waxholmsbolaget och Skärgårdsstiftelsen.',
  url: 'https://svalla.se/statistik',
  creator: { '@type': 'Organization', name: 'Svalla', url: 'https://svalla.se' },
  dateModified: UPDATED,
  keywords: ['Stockholms skärgård', 'statistik', 'geografi', 'natur', 'skärgård fakta'],
  license: 'https://creativecommons.org/licenses/by/4.0/',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
    { '@type': 'ListItem', position: 2, name: 'Statistik', item: 'https://svalla.se/statistik' },
  ],
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Statistik om Stockholms skärgård',
  url: 'https://svalla.se/statistik',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '#statistik-intro'],
  },
}

export default function StatistikPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dataPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(160deg, #1a3a5c 0%, #1e5c82 60%, #2d7d8a 100%)', padding: '52px 24px 44px', color: '#fff' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 16, display: 'flex', gap: 6 }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Svalla</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.75)' }}>Statistik</span>
          </div>
          <h1 style={{ fontSize: 'clamp(28px,5vw,42px)', fontWeight: 800, margin: '0 0 16px', letterSpacing: -0.5 }}>
            Statistik om Stockholms skärgård
          </h1>
          <p id="statistik-intro" style={{ fontSize: 16, color: 'rgba(255,255,255,0.82)', lineHeight: 1.65, maxWidth: 620, margin: '0 0 24px' }}>
            Stockholms skärgård omfattar ca 30 000 öar, holmar och skär och sträcker sig 150 km österut från Stockholm. Här samlar vi verifierade fakta och siffror om geografi, kollektivtrafik, natur och säsong — med källhänvisningar.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { label: '~30 000 öar', sub: 'Stockholms skärgård' },
              { label: '~1 000 bebodda', sub: 'Hela året' },
              { label: '150 km', sub: 'Utbredning österut' },
              { label: '~6 000 km²', sub: 'Total area' },
            ].map(chip => (
              <div key={chip.label} style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '10px 16px', backdropFilter: 'blur(4px)' }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>{chip.label}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{chip.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 20px' }}>

        {/* Datakort per sektion */}
        {SECTIONS.map(section => (
          <section key={section.title} style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 22 }}>{section.icon}</span>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--txt)', margin: 0 }}>{section.title}</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {section.stats.map(stat => (
                <div key={stat.label} style={{
                  background: section.bg,
                  border: `1px solid ${section.border}`,
                  borderRadius: 14,
                  padding: '18px 20px',
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '4px 20px',
                  alignItems: 'start',
                }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)', marginBottom: 3 }}>{stat.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--txt2)', lineHeight: 1.5 }}>{stat.note}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: section.color, whiteSpace: 'nowrap' }}>{stat.value}</div>
                    <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 2 }}>Källa: {stat.source}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* FAQ */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--txt)', marginBottom: 20 }}>
            Vanliga frågor om Stockholms skärgård
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { q: 'Hur många öar finns det i Stockholms skärgård?', a: 'Ca 30 000 öar, holmar och skär enligt Länsstyrelsen Stockholm. Av dessa är ca 1 000 bebodda året runt. Resten är allt från klippor knappt synliga ovan ytan till stora öar med skog och jordbruksmark.' },
              { q: 'Hur stor är Stockholms skärgård?', a: 'Skärgården sträcker sig ca 150 km österut från Stockholm och ca 80 km i nord–sydlig riktning (från Arholma i norr till Landsort i söder). Den totala vattenarealen är ca 6 000 km².' },
              { q: 'Hur djupt är vattnet i skärgården?', a: 'Östersjöns djupaste punkt, Landsortssdjupet, ligger i skärgårdens södra ytterkant och mäter ca 246 meter. I innerskärgårdens sund och fjärdar är djupet ofta 5–30 meter.' },
              { q: 'Hur salt är vattnet i Stockholms skärgård?', a: 'Bräckt vatten med ca 6–7 promille salt i ytterskärgården — betydligt lägre än Nordsjöns ca 35 promille. Salthalten minskar ju längre in mot Stockholm man kommer.' },
            ].map((faq, i) => (
              <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--surface-3)', borderRadius: 14, padding: '18px 20px' }}>
                <div style={{ fontWeight: 700, color: 'var(--txt)', marginBottom: 8, fontSize: 14 }}>{faq.q}</div>
                <p style={{ fontSize: 13, color: 'var(--txt2)', margin: 0, lineHeight: 1.7 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Källförteckning */}
        <section style={{ background: 'var(--white)', border: '1px solid var(--surface-3)', borderRadius: 16, padding: '24px 24px' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', marginBottom: 16 }}>Källor och metodik</h2>
          <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.7, marginBottom: 16 }}>
            Statistiken på denna sida är hämtad från offentliga myndigheter och organisationer. Siffror anges som ungefärliga ("ca") där exakta tal varierar beroende på mätmetod eller år. Sidan uppdaterades senast <strong>{UPDATED}</strong>.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { name: 'Länsstyrelsen Stockholm', url: 'https://www.lansstyrelsen.se/stockholm', desc: 'Antal öar, naturreservat' },
              { name: 'SMHI', url: 'https://www.smhi.se', desc: 'Vattentemperatur, salthalt, Landsortssdjupet' },
              { name: 'Waxholmsbolaget', url: 'https://www.waxholmsbolaget.se', desc: 'Antal bryggor och linjer' },
              { name: 'Skärgårdsstiftelsen', url: 'https://skargardsstiftelsen.se', desc: 'Förvaltad mark, naturreservat' },
              { name: 'SCB — Statistikmyndigheten', url: 'https://www.scb.se', desc: 'Areal och administrativa data' },
              { name: 'ArtDatabanken / SLU', url: 'https://www.artdatabanken.se', desc: 'Fågelarter och biologisk mångfald' },
            ].map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 14px', borderRadius: 10,
                background: 'rgba(30,92,130,0.04)', border: '1px solid rgba(30,92,130,0.12)',
                textDecoration: 'none', color: 'var(--sea)', fontSize: 13, fontWeight: 600,
              }}>
                <span>{s.name} <span style={{ fontWeight: 400, color: 'var(--txt3)', fontSize: 12 }}>— {s.desc}</span></span>
                <span style={{ opacity: 0.5 }}>↗</span>
              </a>
            ))}
          </div>
        </section>

        {/* Relaterade sidor */}
        <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {[
            { label: 'Öar i skärgården', href: '/o/sandhamn' },
            { label: 'Färjetider', href: '/farjor' },
            { label: 'Guider', href: '/guider' },
            { label: 'Jämför öar', href: '/jamfor/sandhamn-vs-grinda' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{
              padding: '10px 18px', borderRadius: 50,
              background: 'rgba(30,92,130,0.08)', border: '1px solid rgba(30,92,130,0.2)',
              color: 'var(--sea)', fontSize: 13, fontWeight: 600, textDecoration: 'none',
            }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
