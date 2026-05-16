'use client'

import Link from 'next/link'

const ADVENTURES = [
  {
    id: 1,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Södra Öland UNESCO + Långe Jan',
    distance: 'Ca 120 km söder om Borgholm',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    imageAlt: 'Öppet landskap med fyr vid havet',
    intro: 'I södra Ölands ände möts två av Sveriges mest extraordinära naturupplevelser på samma dag.',
    body: 'Södra Ölands odlingslandskap är UNESCO-listat – ett öppet, stäppliknande Alvar unikt i Europa, genomskuret av gamla stenmurar och prunkande av orkidéer i maj. Längst ut i söder reser sig Långe Jan, Skandinaviens högsta fyr på 42 meter. Utsikten därifrån – hav i alla riktningar, Alvaret bakåt, skärgårdsöar i fjärran – är svår att beskriva. Ugglestarens naturreservat alldeles intill är ett paradis för fågelskådare.',
    practicalInfo: 'Bil rekommenderas. Långe Jan: inträde ca 60 kr. Planera heldagstur. Ta med matsäck.',
  },
  {
    id: 2,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Eketorps fornborg – järnålderns Öland',
    distance: 'Ca 100 km söder om Borgholm',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
    imageAlt: 'Rekonstruerad fornborg av kalksten i solsken',
    intro: 'Eketorp är den enda fullständigt utgrävda och rekonstruerade ringborgen i Norden – och ett av Ölands absoluta besöksmål.',
    body: 'Ursprungligen från 400-talet e.Kr., ombyggd och återuppbyggd flera gånger under järnåldern. I dag är borgvallen, bostadshusen och en levande arkeologisk miljö med kostymerad personal öppen för besök. Det är den typ av plats som gör historia konkret och gripbar – särskilt för barn. Familjebiljetter finns och det är ett av Ölands bästa familjeäventyr.',
    practicalInfo: 'Öppet maj–sep. Familjebiljetter finns. Kombinera med Alvaret söderut.',
  },
  {
    id: 3,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Borgholms slottsruin – kunglig historia',
    distance: 'Borgholm centrum',
    image: 'https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?w=800&q=80',
    imageAlt: 'Imponerande slottsruin omgiven av park',
    intro: 'Borgholms slott är en av Skandinaviens mest imponerande slottsruiner – och kopplingen till kungafamiljen gör det extra fascinerande.',
    body: 'Det enorma renässansslottet uppfördes på 1600-talet och brann 1806 under oklara omständigheter. Kungliga familjen använde slottet som sommarresidens och bor fortfarande på Solliden alldeles intill – vars slottspark är öppen under sommaren. Guidade turer dagligen ger historien liv. Promenadavstånd från Borgholms centrum.',
    practicalInfo: 'Öppet maj–aug. Guidade turer dagligen. Solliden slottspark öppet under sommaren.',
  },
  {
    id: 4,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Trollskogen – bok och dimma',
    distance: 'Ca 55 km norr om Borgholm',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
    imageAlt: 'Gammal mossig skog med vindpinade träd',
    intro: 'Trollskogen på norra Öland är ett av Sveriges märkligaste naturområden – och namngiven av goda skäl.',
    body: 'En urskog av gamla, vindpinade bokträd med mossbetäckta stenar och en atmosfär som faktiskt känns trollsk. Naturreservat och en av Ölands bästa vandringsdestinationer, med välmärkta stigar och barnvänlig terräng. Parkering vid Byxelkroks hamn ca 1 km bort. Alltid öppet, inget inträde. Kombinera gärna med ett besök i Byxelkroks charmiga fiskehamn.',
    practicalInfo: 'Alltid öppet, inget inträde. Parkering vid Byxelkroks hamn ca 1 km. Barnvänligt.',
  },
  {
    id: 5,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Alvaret – Europas unika stäpp',
    distance: 'Södra Öland, ca 80–120 km söder om Borgholm',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
    imageAlt: 'Öppet stäpplandskap i varmt solljus',
    intro: 'Det stora Alvaret saknar motstycke i Europa – en öppen kalkstensmark som varken är skog, åker eller myr, utan något helt eget.',
    body: 'I maj lyser Alvaret av orkidéer – upp till 26 arter blommar här, fler än nästan någon annanstans i Sverige. Sommaren bjuder på rosenrot, timjan och backtimjan. Naturreservat med välmärkta vandringsleder och total tystnad bortsett från vinden och fågelljuden. Ta med egen dricka och njut av ett av landets mest meditativa naturområden.',
    practicalInfo: 'Bäst i maj–juni (blomning). Bil rekommenderas. Gratis inträde. Ta med egen dricka.',
  },
  {
    id: 6,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Byxelkrok – norröns pärla',
    distance: 'Ca 60 km norr om Borgholm',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    imageAlt: 'Liten fiskehamn med båtar och röda stugor',
    intro: 'Byxelkrok är Ölands nordligaste by och ett av de mest genuina fiskelägen du hittar längs den svenska östkusten.',
    body: 'En liten hamn med fiskebåtar, ett café vid kajen och direkt tillgång till Trollskogens trollska bokurskog. På sommaren fylls Byxelkrok av båtfolk och badgäster – stämningen är avslappnad och vänlig. Kombinera med Trollskogen för en perfekt nordöländsk dag.',
    practicalInfo: 'Bil eller buss från Borgholm. Café vid hamnen. Kombinera med Trollskogen. Bäst juli–aug.',
  },
  {
    id: 7,
    transport: 'Med cykel',
    transportColor: '#8b4513',
    title: 'Södra Öland – UNESCO på cykel',
    distance: 'Ca 60 km rundtur från Mörbylånga',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    imageAlt: 'Cyklist på öppen väg genom flackt landskap',
    intro: 'En cykelrunda som packar in ett UNESCO-landskap, en fornborg och Skandinaviens högsta fyr på en och samma dag.',
    body: 'Starta i Mörbylånga och rulla söderut längs välskyltade leder genom Alvaret, förbi Eketorps fornborg och vidare till Långe Jan i söder. Flackt landskap och fin underlag gör det till en av Ölands bästa cykeldagar. Planera 7–8 timmar inklusive stopp och lunch.',
    practicalInfo: 'Start Mörbylånga (nås med buss från Kalmar). Hyr cykel i Mörbylånga. Planera 7–8 timmar. Ta med matsäck.',
  },
  {
    id: 8,
    transport: 'Med cykel',
    transportColor: '#8b4513',
    title: 'Borgholm–Eketorp – historisk cykeltur',
    distance: 'Ca 50 km enkel resa',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80',
    imageAlt: 'Cykelväg längs öppen kust med hav i bakgrunden',
    intro: 'En klassisk Ölandsdag: slottsruin på morgonen, fornborg på eftermiddagen, buss hem på kvällen.',
    body: 'Från Borgholm söderut till Eketorps fornborg längs väg 136. En fin dagstur med historiska stopp längs vägen – medeltida kyrkor, utsiktsplatser och enstaka caféer. Välskyltad led men var uppmärksam på biltrafiken längs 136:an. Buss tillbaka från Mörbylånga kvällstid.',
    practicalInfo: 'Hyr cykel i Borgholm. Buss tillbaka från Mörbylånga. Mellannivå-cyklister.',
  },
  {
    id: 9,
    transport: 'Kollektivt',
    transportColor: '#2a7a40',
    title: 'Borgholm stadsvandring – Ölands puls',
    distance: 'Borgholm centrum',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
    imageAlt: 'Charmig liten stad med trähus i sommarljus',
    intro: 'Borgholm är Ölands hjärta – och under sommaren en av Sveriges mest levande småstäder.',
    body: 'Hundratusentals turister passerar Borgholm varje sommar, men staden har lyckats bevara sin karaktär. Storgatan med sina butiker och restauranger, slottsruinen på kullen och hamnen nedanför skapar en naturlig promenadslinga. Kungsparken och Solliden slottspark är pärlor för den som vill vila fötterna. Turistbyrån vid hamnen ger karta och aktuella tips.',
    practicalInfo: 'Buss från Kalmar: ca 45 min. Promenadvänlig innerstad. Turistbyrån vid hamnen ger karta.',
  },
  {
    id: 10,
    transport: 'Kollektivt',
    transportColor: '#2a7a40',
    title: 'Mörbylånga – söder om Borgholm',
    distance: 'Ca 20 km söder om Borgholm, buss',
    image: 'https://images.unsplash.com/photo-1519981337-32df2b6c1bbb?w=800&q=80',
    imageAlt: 'Pittoreskt litet samhälle med kvarn vid vatten',
    intro: 'Mörbylånga är södra Ölands lilla krona – genuint, lugnt och ett perfekt utgångsläge för södra öns bästa upplevelser.',
    body: 'Den karaktäristiska kvarnen syns långt borrifrån och centrum är pittoreskt utan att kännas turistifierat. Härifrån startar den bästa cykeln mot Eketorp och Alvaret, och buss kör dit från Kalmar utan byte. Cykeluthyrning finns i byn. Avsluta dagen med fika vid kvarnparken.',
    practicalInfo: 'Buss från Borgholm ca 20 min, från Kalmar direkt. Kvarnen och museet fritt. Cykeluthyrning i byn.',
  },
]

export default function OlandAventyrClient() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 100 }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #2d1a0d 0%, #6b3a1a 60%, #8b5524 100%)',
        padding: '0 20px 0',
        paddingTop: 'calc(env(safe-area-inset-top, 0px))',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 30, left: -80, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', paddingBottom: 52 }}>
          <div style={{ padding: '14px 0 28px' }}>
            <Link href="/oland" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
              fontSize: 13, fontWeight: 700,
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 20, padding: '6px 14px 6px 10px',
              backdropFilter: 'blur(6px)',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 14, height: 14 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Öland
            </Link>
          </div>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', margin: '0 0 12px' }}>Reseguide · 10 äventyr</p>
          <h1 style={{ fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#fff', margin: '0 0 16px', lineHeight: 1.15 }}>Äventyr på Öland</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 17, margin: 0, maxWidth: 560, lineHeight: 1.7, fontStyle: 'italic', fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)' }}>
            UNESCO-Alvaret, Långe Jan, fornborg och cykelleder – tio upplevelser längs solöns 137 km långa kust.
          </p>
        </div>

        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 40, marginBottom: -1 }}>
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="var(--bg, #f8f7f4)" />
        </svg>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '14px 20px 0' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--txt3)' }}>
          <Link href="/" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>Svalla</Link>
          <span>›</span>
          <Link href="/oland" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>Öland</Link>
          <span>›</span>
          <span>Äventyr</span>
        </nav>
      </div>

      {/* Article body */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px 0' }}>
        <p style={{ fontSize: 16, color: 'var(--txt2)', lineHeight: 1.8, margin: '0 0 52px', borderLeft: '3px solid var(--sea)', paddingLeft: 20 }}>
          Öland kallas solön – och med rätta. Men det är mer än sol och bad. Det är UNESCO-landskap, järnåldersfornborgar, vindpinade urskogar och en 137 km lång ö kantad av historia. Här är tio upplevelser som gör Öland rättvisa.
        </p>

        {ADVENTURES.map((adv, i) => (
          <article key={adv.id} style={{ marginBottom: 72 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 20 }}>
              <span style={{ fontSize: 48, fontWeight: 900, lineHeight: 1, fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)', color: 'rgba(10,123,140,0.12)', flexShrink: 0, minWidth: 52 }}>{String(adv.id).padStart(2, '0')}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', background: adv.transportColor, color: '#fff', padding: '3px 10px', borderRadius: 20 }}>{adv.transport}</span>
                  <span style={{ fontSize: 12, color: 'var(--txt3)' }}>{adv.distance}</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700, color: 'var(--txt)', margin: 0, lineHeight: 1.25 }}>{adv.title}</h2>
              </div>
            </div>

            <div style={{ width: '100%', aspectRatio: '16/8', borderRadius: 16, overflow: 'hidden', marginBottom: 20, background: `linear-gradient(135deg, ${adv.transportColor}33, ${adv.transportColor}88)` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={adv.image} alt={adv.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading={i < 2 ? 'eager' : 'lazy'} />
            </div>

            <p style={{ fontSize: 15.5, color: 'var(--txt2)', lineHeight: 1.8, margin: '0 0 12px', fontWeight: 600 }}>{adv.intro}</p>
            <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.8, margin: '0 0 16px' }}>{adv.body}</p>

            <div style={{ background: 'rgba(10,123,140,0.05)', border: '1px solid rgba(10,123,140,0.12)', borderRadius: 12, padding: '14px 18px', fontSize: 13.5, color: 'var(--txt2)', lineHeight: 1.7 }}>
              <strong style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--sea)', display: 'block', marginBottom: 5, fontWeight: 800 }}>Praktisk info</strong>
              {adv.practicalInfo}
            </div>

            {i < ADVENTURES.length - 1 && (
              <div style={{ marginTop: 52, height: 1, background: 'rgba(10,123,140,0.1)' }} />
            )}
          </article>
        ))}

        <div style={{ marginTop: 24, padding: '36px 32px', background: 'linear-gradient(135deg, #2d1a0d 0%, #6b3a1a 100%)', borderRadius: 24, textAlign: 'center', boxShadow: '0 8px 32px rgba(45,26,13,0.25)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 10px' }}>Nästa steg</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 8px', fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)', position: 'relative' }}>Redo att planera din Ölandsresa?</p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', margin: '0 0 24px', position: 'relative' }}>Låt Thorkel hjälpa dig att sätta ihop en personlig dagsplan.</p>
          <Link href="/planera" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#6b3a1a', fontSize: 15, fontWeight: 700, textDecoration: 'none', padding: '14px 32px', borderRadius: 28, position: 'relative', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
            Planera din tur med Thorkel →
          </Link>
        </div>
      </div>
    </div>
  )
}
