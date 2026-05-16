'use client'

import Link from 'next/link'

const ADVENTURES = [
  {
    id: 1,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Kastelholms slott – aldrig glömt',
    distance: 'Ca 30 km öster om Mariehamn',
    image: 'https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?w=800&q=80',
    imageAlt: 'Medeltida slottsruin omgiven av grönska',
    intro: 'Kastelholm är Ålands mäktigaste medeltidslämning – och ett av de bäst bevarade slotten i hela Norden.',
    body: 'Slottet från 1300-talet sticker upp ur en skogklädd ås och har tjänat som fängelse, kungligt residens och lantbruk under sina drygt 700 år. I dag är det ett välskött museum med guidade turer på svenska. Alldeles intill ligger Jan Karlsgårdens friluftsmuseum, ett levande 1800-talsgårdsmuseum med djur och hantverk. Planera minst tre timmar för båda.',
    practicalInfo: 'Öppet maj–sep. Boka guidad tur i förväg under högsäsong. Kombinera med Jan Karlsgårdens friluftsmuseum alldeles intill. Ta med matsäck.',
  },
  {
    id: 2,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Bomarsunds fästning – ryssarnas Åland',
    distance: 'Ca 45 km öster om Mariehamn',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
    imageAlt: 'Gamla fästningsruiner av sten vid vattnet',
    intro: 'Ingenstans på Åland är historiens tyngd mer påtaglig än bland Bomarsunds kolossala stenväggar.',
    body: 'Bomarsund var ett gigantiskt ryskt fästningsverk påbörjat på 1830-talet – tänkt att bli ett av Östersjöns mest formidabla försvar. Men 1854 förstördes det av en brittisk-fransk flotta under Krimkriget, bara tjugo år efter att bygget startade. De kvarvarande ruinerna är häpnadsväckande i sin skala. Stenblock stora som bilar vittnar om ett projekt som aldrig fullbordades. Ingen entré, alltid öppet – en av Ålands bästa gratisupplevelser.',
    practicalInfo: 'Alltid öppet, inget inträde. Ta bil eller cykel från Kastelholm – ca 15 min. Info-skyltar på svenska och engelska.',
  },
  {
    id: 3,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Föglö – cykelöns skärgård',
    distance: 'Ca 50 km öster om Mariehamn (färja)',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    imageAlt: 'Liten skärgårdsö med klippor och lugnt hav',
    intro: 'Föglö kallas cykelön och är en av Ålands mest välkomnande yttre öar – lagom stor för att utforska på en dag.',
    body: 'Gästhamnen är liten och mysig, naturen öppen och havet allestädes närvarande. Nå hit med Ålandstrafiken från Svinö – bilfärjan tar ca 25 minuter. Väl framme kan du hyra cykel och rulla runt öns välskyltade leder, bada från klipporna och äta lunch på hamnkrogen. Det är den typ av dag man inte planerar men aldrig glömmer.',
    practicalInfo: 'Bilfärja från Svinö – kontrollera tidtabell på alandstrafiken.ax. Hyr cykel på Föglö. Plan: heldagstur. Ta med matsäck.',
  },
  {
    id: 4,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Kökar – längst ut i Åland',
    distance: 'Ca 100 km sydöster om Mariehamn (färja)',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
    imageAlt: 'Karg klippö ute i havet med blå himmel',
    intro: 'Kökar är Ålands yttersta utpost – en ö där havet tar över och tystnad är det dominerande intrycket.',
    body: 'Klipporna är rakade rena av havet, vattnet är kristallklart och kyrkan från 1784 är en av Ålands vackraste. Nästan inga turister, nästan ingen service – äkta skärgård på dess villkor. Resan hit är en del av upplevelsen: bilfärjan från Galtby på Korpo tar dig via öppet hav i nästan två timmar. Ta med all mat och dricka du behöver för dagen.',
    practicalInfo: 'Bilfärja från Galtby på Korpo – kontrollera tidtabell i förväg. Plan: hela dagen. Ta med matsäck och dricka.',
  },
  {
    id: 5,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Ålands sjöfartsmuseum – havshistoria i världsklass',
    distance: 'Mariehamn, västhamnen',
    image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&q=80',
    imageAlt: 'Gammalt segelfartyg i hamn',
    intro: 'Åland var länge en av världens ledande sjöfartsregioner. Det museet berättar med en kärlek och ett djup som tar andan ur en.',
    body: 'Kronjuvelen är museifartyget Pommern – en av världens sista bevarade fyrmastade stålbarkar, byggd 1903 och fortfarande i ursprungligt skick. Att gå ombord är att kliva rakt in i 1900-talets stora seglingsepok. Museet inomhus kompletterar med kartor, berättelser och artefakter från hundratals åländska sjöfarare. Räkna med minst två timmar.',
    practicalInfo: 'Öppet hela året. Pommern öppen sommar. Inträde ca 12 €. Parkering vid västhamnen.',
  },
  {
    id: 6,
    transport: 'Med cykel',
    transportColor: '#8b4513',
    title: 'Lemland & Lumparland – sydöns pärlor',
    distance: 'Ca 50–60 km rundtur',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    imageAlt: 'Cyklist på smal väg omgiven av gröna åkrar',
    intro: 'Lemland och Lumparland är Ålands lugnaste öar – och den bästa platsen att förstå vad folk menar när de talar om "riktig" åländsk natur.',
    body: 'Böljande åkrar, äldre kyrkor och knappt några turister. Cykelturen passerar Flisö naturreservat och Lumparlands kyrka från 1280-talet – en av Ålands äldsta. Inga branta backar, välskyltade leder och vackra vyer mot Östersjön. Ta med matsäck – service är begränsad, men det är en del av charmen.',
    practicalInfo: 'Hyr cykel i Mariehamn. Nås med bro från fastlandet (Åland). Matsäck rekommenderas.',
  },
  {
    id: 7,
    transport: 'Med cykel',
    transportColor: '#8b4513',
    title: 'Sund & Kastelholm – historisk rundtur',
    distance: 'Ca 35 km rundtur från Kastelholm',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80',
    imageAlt: 'Smal cykelväg genom sommargrön natur',
    intro: 'En cykeldag som kombinerar tre av Ålands viktigaste historiska platser – med välskyltad led och lagom svårighet.',
    body: 'Starta vid Kastelholms slott, rulla vidare till Bomarsunds imponerande ruin och avsluta med Sunds medeltida kyrka. Vart femte kilometer väntar en ny historisk pärla. Leden är välskyltad och lagom svår – lämplig för familjer med barn som cyklar. Cyklar hyrs vid Kastelholm och bussar kör dit från Mariehamn.',
    practicalInfo: 'Cyklar hyrs vid Kastelholm. Nåbar med buss från Mariehamn. Lagom svårighet – lämplig för familjer.',
  },
  {
    id: 8,
    transport: 'Med cykel',
    transportColor: '#8b4513',
    title: 'Runt Lemland – skärgårdens idyll',
    distance: 'Ca 40 km rundtur',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
    imageAlt: 'Lugn havsvik omgiven av grönska i kvällsljus',
    intro: 'Lemlands kust är en av Ålands vackraste – en rundtur som tar en halvdag och ger en hel dags känsla.',
    body: 'Vikar, fågelrika våtmarker och tystnad som inte bryts av biltrafik. Rundturen avslutas med bad från klipporna vid Lembotes – klart, svalt vatten och utsikt mot öppet hav. Från Mariehamn tar du bron ut till Lemland och är igång direkt. Ingen bilfärja krävs.',
    practicalInfo: 'Från Mariehamn: bro och bra cykelmöjligheter. Ingen bilfärja krävs. Planera 4–5 h.',
  },
  {
    id: 9,
    transport: 'Kollektivt',
    transportColor: '#2a7a40',
    title: 'Skärgårdshoppning med passagerarbåt',
    distance: 'Varierar, utgår från Mariehamn',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    imageAlt: 'Liten passagerarfärja på blått hav',
    intro: 'Ålands 6 700 öar går inte att se från en bil. Men med passagerarbåtarna kan du hoppa mellan dem som om du hade hela skärgården som hemmaplan.',
    body: 'Ålandstrafiken kör reguljära turer till Föglö, Kökar, Sottunga och andra yttre öar. En dag av öhoppning – lite frukost i Mariehamn, ett par timmar på Föglö, lunch på Kökar, hem via Sottunga – är ett av Ålands absolut bästa sätt att uppleva skärgårdshavet. Boka i förväg under högsäsong och ta med matsäck.',
    practicalInfo: 'Tidtabeller på alandstrafiken.ax. Boka i förväg under högsäsong. Ta matsäck – service varierar på öarna.',
  },
  {
    id: 10,
    transport: 'Kollektivt',
    transportColor: '#2a7a40',
    title: 'Mariehamn stadsvandring – Nordens trädgårdsstad',
    distance: 'Mariehamn innerstad, ca 2–3 km',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
    imageAlt: 'Charmig stadsallé med lindträd i sommarsol',
    intro: 'Mariehamn är en av Skandinaviens minsta städer och, argumenterar många, en av de allra charmigaste.',
    body: 'Esplanaden är stadens hjärta – en allé av lindar som sträcker sig hela vägen från östhamnen till västhamnen, kantad av caféer, bänkar och sommarblommor. I änden av allén ligger Ålands sjöfartsmuseum och Pommern. Gamla stan med sina trähus påminner om en norsk kuststad från förra seklet. Turistbyrån vid hamnen ger gratis stadskartor och tipsar om aktuella utställningar.',
    practicalInfo: 'Ålands sjöfartsmuseum: öppet hela året. Esplanaden: alltid fri. Turistbyrån ger gratis stadskartor.',
  },
]

export default function AlandAventyrClient() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 100 }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0d2d1e 0%, #1a5c3a 60%, #207a4f 100%)',
        padding: '0 20px 0',
        paddingTop: 'calc(env(safe-area-inset-top, 0px))',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 30, left: -80, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', paddingBottom: 52 }}>
          <div style={{ padding: '14px 0 28px' }}>
            <Link href="/aland" style={{
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
              Åland
            </Link>
          </div>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', margin: '0 0 12px' }}>Reseguide · 10 äventyr</p>
          <h1 style={{ fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#fff', margin: '0 0 16px', lineHeight: 1.15 }}>Äventyr på Åland</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 17, margin: 0, maxWidth: 560, lineHeight: 1.7, fontStyle: 'italic', fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)' }}>
            Medeltidsslott, passagerarbåtar genom skärgårdshavet, cykelleder och Nordens mest charmiga lilla stad.
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
          <Link href="/aland" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>Åland</Link>
          <span>›</span>
          <span>Äventyr</span>
        </nav>
      </div>

      {/* Article body */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px 0' }}>
        <p style={{ fontSize: 16, color: 'var(--txt2)', lineHeight: 1.8, margin: '0 0 52px', borderLeft: '3px solid var(--sea)', paddingLeft: 20 }}>
          Åland är inte bara en ö – det är ett självstyrande landskap med 6 700 öar, ett eget sjöfartsarv och en natur som skiljer sig från både Sverige och Finland. Här är tio upplevelser som verkligen gör Åland rättvisa.
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

        <div style={{ marginTop: 24, padding: '36px 32px', background: 'linear-gradient(135deg, #0d2d1e 0%, #1a5c3a 100%)', borderRadius: 24, textAlign: 'center', boxShadow: '0 8px 32px rgba(13,45,30,0.25)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 10px' }}>Nästa steg</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 8px', fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)', position: 'relative' }}>Redo att planera din Ålandsresa?</p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', margin: '0 0 24px', position: 'relative' }}>Låt Thorkel hjälpa dig att sätta ihop en personlig dagsplan.</p>
          <Link href="/planera" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#1a5c3a', fontSize: 15, fontWeight: 700, textDecoration: 'none', padding: '14px 32px', borderRadius: 28, position: 'relative', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
            Planera din tur med Thorkel →
          </Link>
        </div>
      </div>
    </div>
  )
}
