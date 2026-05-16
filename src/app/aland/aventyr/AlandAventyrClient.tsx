'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const ADVENTURES = [
  {
    id: 1,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Kastelholms slott – aldrig glömt',
    distance: 'Ca 30 km öster om Mariehamn',
    imageFallback: 'https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?w=1200&q=85',
    imageAlt: 'Medeltida slottsruin omgiven av grönska',
    intro: 'Kastelholm är Ålands mäktigaste medeltidslämning – och ett av de bäst bevarade slotten i hela Norden.',
    body: 'Slottet reser sig ur en skogklädd ås omgiven av vatten på tre sidor – ett läge valt med samma militära kalkyl som styrt alla Östersjöns strategiska platser sedan medeltiden. Byggt på 1300-talet tjänade Kastelholm som fängelse, kungligt residens, administrativt centrum och lantbruk under sina drygt 700 år. Gustav Vasa, Erik XIV och Johan III övernattade alla här. I dag är det ett välskött museum med guidade turer på svenska och engelska. Alldeles intill ligger Jan Karlsgårdens friluftsmuseum, ett levande 1800-talsgårdsmuseum med djur och hantverk. Planera minst tre timmar för båda.',
    practicalInfo: 'Öppet maj–sep. Guidade turer – boka i förväg under högsäsong. Jan Karlsgårdens friluftsmuseum intill. Inträde ca 10 €. Ta med matsäck.',
  },
  {
    id: 2,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Bomarsunds fästning – ryssarnas Åland',
    distance: 'Ca 45 km öster om Mariehamn',
    imageFallback: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=85',
    imageAlt: 'Gamla fästningsruiner av sten vid vattnet',
    intro: 'Ingenstans på Åland är historiens tyngd mer påtaglig än bland Bomarsunds kolossala stenväggar.',
    body: 'Bomarsund var ett gigantiskt ryskt fästningsverk påbörjat på 1830-talet, tänkt att bli ett av Östersjöns mest formidabla försvar. Men 1854, bara tjugo år efter att bygget startade, bombades det sönder av en brittisk-fransk flotta under Krimkriget. Det som återstår är häpnadsväckande i sin skala – stenblock stora som bilar, murar som är meter tjocka och vallgravar fortfarande synliga i terrängen. Platsen är aldrig stängd och kostar inget att besöka. Informationsskyltar på svenska och engelska förklarar geopolitiken bakom bygget. Kombinera med Kastelholm samma dag – bara 15 minuters bilresa åtskiljer dem.',
    practicalInfo: 'Alltid öppet, gratis inträde. Info-skyltar på svenska och engelska. Ta bil eller cykel från Kastelholm – ca 15 min.',
  },
  {
    id: 3,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Föglö – cykelöns skärgård',
    distance: 'Ca 50 km öster om Mariehamn, bilfärja',
    imageFallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85',
    imageAlt: 'Liten skärgårdsö med klippor och lugnt hav',
    intro: 'Föglö kallas cykelön och är en av Ålands mest välkomnande yttre öar – precis lagom stor för att utforska på en dag.',
    body: 'Gästhamnen i Degerby är liten och mysig, med ett kafé vid kajen och en butikshandel som säljer allt från fiskkrokar till lokalproducerade sylter. Nå hit med Ålandstrafiken från Svinö (ca 25 min). Välskyltade cykelleder löper runt Föglös kuperade landskap och tar dig till avskilda badklippor, gamla fiskelägen och vyer mot både finska och svenska fastlandet. Det finns ett litet café och en enkel krog sommartid, men ta gärna med matsäck som säkerhetsnät. Det är den typ av dag man inte planerar i detalj men alltid minns.',
    practicalInfo: 'Bilfärja från Svinö – kontrollera tidtabell på alandstrafiken.ax. Hyr cykel på Föglö. Kafé vid hamnen sommartid. Planera heldagstur.',
  },
  {
    id: 4,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Kökar – längst ut i Åland',
    distance: 'Ca 100 km sydöster om Mariehamn, bilfärja',
    imageFallback: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=85',
    imageAlt: 'Karg klippö ute i havet med blå himmel',
    intro: 'Kökar är Ålands yttersta utpost – en ö där havet tar över och tystnad är det dominerande intrycket.',
    body: 'Klipporna är rakade rena av havet, vattnet är kristallklart och kyrkan från 1784 – byggd på resterna av ett fransiskanerkloster från 1100-talet – är en av Ålands vackraste byggnader. Nästan inga turister, nästan ingen kommersiell service. Resan hit är en del av upplevelsen: bilfärjan från Galtby på Korpo tar dig via öppet hav i nästan två timmar. Kökar har en liten butik och ett enkelt café, men ta med mat och dricka. Sätt dig vid vattnet och lyssna på tystnaden – det är en plats att andas ut i.',
    practicalInfo: 'Bilfärja från Galtby på Korpo – ca 2 h. Ta med matsäck och dricka. Planera hela dagen.',
  },
  {
    id: 5,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Ålands sjöfartsmuseum – havshistoria i världsklass',
    distance: 'Mariehamn, västhamnen',
    imageFallback: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=1200&q=85',
    imageAlt: 'Gammalt segelfartyg i hamn',
    intro: 'Åland var länge en av världens ledande sjöfartsregioner. Museet berättar med en kärlek och ett djup som tar andan ur en.',
    body: 'Kronjuvelen är museifartyget Pommern – en av världens sista bevarade fyrmastade stålbarkar, byggd i Glasgow 1903 och fortfarande i ursprungligt skick. Att gå ombord är att kliva rakt in i 1900-talets stora seglingsepok: smala kojer, trängt maskinrum och den enorma däcksytan som en gång fylldes av sjömän under topptackel. Pommern seglade i spannmålshandeln mellan Europa och Australien ända till 1939. Museet inomhus kompletterar med kartor, berättelser och artefakter från hundratals åländska sjöfarare. Räkna med minst två timmar.',
    practicalInfo: 'Öppet hela året. Pommern öppen maj–sep. Inträde ca 12 €. Parkering vid västhamnen.',
  },
  {
    id: 6,
    transport: 'Med cykel',
    transportColor: '#8b4513',
    title: 'Lemland & Lumparland – sydöns pärlor',
    distance: 'Ca 50–60 km rundtur',
    imageFallback: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
    imageAlt: 'Cyklist på smal väg omgiven av gröna åkrar',
    intro: 'Lemland och Lumparland är Ålands lugnaste öar – och den bästa platsen att förstå vad folk menar när de talar om äkta åländsk natur.',
    body: 'Böljande åkrar, stenmurar, äldre träkyrkor och knappt någon biltrafik. Cykelturen passerar Flisö naturreservat med sina fågelrika strandängar och Lumparlands kyrka från 1280-talet. Inga branta backar, välskyltade leder och vackra vyer mot Östersjön. Vid Lembotes strandklippor kan du bada i klart vatten med utsikt mot öppet hav – ett av öarnas bäst bevarade hemligheter. Service är begränsad längs vägen – ta med matsäck.',
    practicalInfo: 'Hyr cykel i Mariehamn. Nås med bro – ingen färja krävs. Planera 4–5 h. Bäst maj–september.',
  },
  {
    id: 7,
    transport: 'Med cykel',
    transportColor: '#8b4513',
    title: 'Sund & Kastelholm – historisk rundtur',
    distance: 'Ca 35 km rundtur från Kastelholm',
    imageFallback: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&q=85',
    imageAlt: 'Smal cykelväg genom sommargrön natur',
    intro: 'En cykeldag som kombinerar tre av Ålands viktigaste historiska platser – med välskyltad led och lagom svårighet för hela familjen.',
    body: 'Starta vid Kastelholms slott och rulla österut mot Bomarsunds imponerande ruin – stenblock av sådan storlek att man nästan inte tror dem vara lagda av mänskliga händer. Därifrån vidare till Sunds medeltida kyrka, vars romanska murar är ett av Ålands finaste kyrkliga arv. Leden är välskyltad och lagom utmanande, lämplig för familjer. Vägen löper längs lugna landsvägar omgiven av åländsk jordbruksmark. Cyklar hyrs vid Kastelholm eller i Mariehamn.',
    practicalInfo: 'Cyklar hyrs vid Kastelholm eller i Mariehamn. Nåbar med buss från Mariehamn. Planera 4–5 h.',
  },
  {
    id: 8,
    transport: 'Med cykel',
    transportColor: '#8b4513',
    title: 'Runt Lemland – skärgårdens idyll',
    distance: 'Ca 40 km rundtur',
    imageFallback: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=85',
    imageAlt: 'Lugn havsvik omgiven av grönska i kvällsljus',
    intro: 'Lemlands kust är en av Ålands vackraste – en rundtur som tar en halvdag och ger en hel dags känsla.',
    body: 'Vikar med spegelblank vattenyta, fågelrika våtmarker och en tystnad som sällan bryts av biltrafik. Lembote-klinten är ruttens höjdpunkt: en kalkstensklint vid havet med vyer söderut mot öppet Östersjö. Rundturen tar dig längs öns östra kust och söderut mot Flisö. Från Mariehamn tar du bron ut till Lemland och är igång direkt – ingen bilfärja krävs, vilket gör det till en av de smidigaste cykeldagarna på Åland.',
    practicalInfo: 'Från Mariehamn: bro – ingen bilfärja krävs. Hyr cykel i Mariehamn. Planera 4–5 h.',
  },
  {
    id: 9,
    transport: 'Kollektivt',
    transportColor: '#2a7a40',
    title: 'Skärgårdshoppning med passagerarbåt',
    distance: 'Varierar, utgår från Mariehamn',
    imageFallback: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=85',
    imageAlt: 'Liten passagerarfärja på blått hav',
    intro: 'Ålands 6 700 öar går inte att uppleva från en bil. Med passagerarbåtarna kan du hoppa mellan dem som om du hade hela skärgårdshavet som hemmaplan.',
    body: 'Ålandstrafiken kör reguljära passagerarbåtar till Föglö, Kökar, Sottunga och andra yttre öar. En dag av öhoppning – frukost i Mariehamn, ett par timmar på Föglö, lunch på Kökar med benen hängande över kajen, hem via Sottunga – är ett av Ålands absolut bästa sätt att uppleva skärgårdshavet på riktigt. Det handlar om att sitta på däcket och se öarna träda ur dimman, om den salta lukten av öppet hav. Boka biljetter i förväg under högsäsong.',
    practicalInfo: 'Tidtabeller och biljetter på alandstrafiken.ax. Boka i förväg under juli–aug. Ta matsäck – service varierar på öarna.',
  },
  {
    id: 10,
    transport: 'Kollektivt',
    transportColor: '#2a7a40',
    title: 'Mariehamn stadsvandring – Nordens trädgårdsstad',
    distance: 'Mariehamn innerstad, ca 2–3 km',
    imageFallback: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=85',
    imageAlt: 'Charmig stadsallé med lindträd i sommarsol',
    intro: 'Mariehamn är en av Skandinaviens minsta städer och, argumenterar många, en av de allra charmigaste.',
    body: 'Esplanaden är stadens hjärta och en av norra Europas vackraste stadsalleer – en boulevard kantad av lindar vars kronor sluter sig samman ovanför promenaden. Allén sträcker sig hela vägen från östhamnen till västhamnen, kantad av caféer, boutiques och sommarblomsrabatter. I änden mot västhamnen ligger Ålands sjöfartsmuseum och Pommern. Gamla stan med sina trähus i pastellfärger påminner om en norsk kuststad från förra seklet. Avsluta med kaffe och åländsk pannkaka längs Esplanaden.',
    practicalInfo: 'Ålands sjöfartsmuseum: öppet hela året. Esplanaden: alltid fri. Turistbyrån vid hamnen: gratis stadskartor.',
  },
]

export default function AlandAventyrClient() {
  const [photoMap, setPhotoMap] = useState<Record<string, string>>({})
  const [photosReady, setPhotosReady] = useState(false)

  useEffect(() => {
    fetch('/api/adventure-photos?island=aland')
      .then(r => r.ok ? r.json() : {})
      .then((data: Record<string, string>) => { setPhotoMap(data); setPhotosReady(true) })
      .catch(() => setPhotosReady(true))
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg, #f8f7f4)' }}>

      {/* ── Hero ── */}
      <div style={{
        background: 'linear-gradient(160deg, #082014 0%, #1a5c3a 55%, #1e7a4d 100%)',
        padding: '0 24px',
        paddingTop: 'calc(env(safe-area-inset-top, 0px))',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 20, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', paddingBottom: 64 }}>
          <div style={{ padding: '18px 0 36px' }}>
            <Link href="/aland" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: 'rgba(255,255,255,0.8)', textDecoration: 'none',
              fontSize: 13, fontWeight: 700, letterSpacing: '0.02em',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 20, padding: '6px 14px 6px 10px',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 13, height: 13 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Åland
            </Link>
          </div>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', margin: '0 0 16px' }}>Reseguide · 10 äventyr</p>
          <h1 style={{ fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)', fontSize: 'clamp(38px, 6vw, 68px)', fontWeight: 900, color: '#fff', margin: '0 0 20px', lineHeight: 1.08, letterSpacing: '-0.01em' }}>Äventyr på Åland</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(16px, 2vw, 20px)', margin: 0, maxWidth: 580, lineHeight: 1.65, fontStyle: 'italic', fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)' }}>
            Medeltidsslott, passagerarbåtar genom skärgårdshavet, cykelleder och Nordens mest charmiga lilla stad.
          </p>
        </div>
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 56, marginBottom: -1 }}>
          <path d="M0,28 C480,56 960,0 1440,28 L1440,56 L0,56 Z" fill="var(--bg, #f8f7f4)" />
        </svg>
      </div>

      {/* ── Breadcrumb ── */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '16px 24px 0' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--txt3, #999)' }}>
          <Link href="/" style={{ color: 'var(--sea, #0a7b8c)', textDecoration: 'none', fontWeight: 600 }}>Svalla</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href="/aland" style={{ color: 'var(--sea, #0a7b8c)', textDecoration: 'none', fontWeight: 600 }}>Åland</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span>Äventyr</span>
        </nav>
      </div>

      {/* ── Lead + Articles ── */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px 0' }}>
        <p style={{ fontSize: 'clamp(17px, 2vw, 20px)', color: 'var(--txt, #1a1a1a)', lineHeight: 1.85, margin: '0 0 72px', borderLeft: '4px solid var(--sea, #0a7b8c)', paddingLeft: 24, maxWidth: 660 }}>
          Åland är inte bara en ö – det är ett självstyrande landskap med 6 700 öar, ett eget sjöfartsarv och en natur som skiljer sig från både Sverige och Finland. Här är tio upplevelser som verkligen gör Åland rättvisa.
        </p>

        {ADVENTURES.map((adv, i) => (
          <article key={adv.id} style={{ marginBottom: 100 }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 10 }}>
              <span style={{ fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)', fontSize: 'clamp(64px, 8vw, 96px)', fontWeight: 900, lineHeight: 1, color: 'rgba(10,123,140,0.09)', flexShrink: 0, userSelect: 'none', letterSpacing: '-0.03em' }}>{String(adv.id).padStart(2, '0')}</span>
              <div style={{ paddingBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', background: adv.transportColor, color: '#fff', padding: '4px 12px', borderRadius: 20 }}>{adv.transport}</span>
                  <span style={{ fontSize: 12, color: 'var(--txt3, #888)', fontWeight: 500 }}>{adv.distance}</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)', fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, color: 'var(--txt, #1a1a1a)', margin: 0, lineHeight: 1.2, letterSpacing: '-0.01em' }}>{adv.title}</h2>
              </div>
            </div>

            <div style={{ width: '100%', aspectRatio: '16 / 7', borderRadius: 20, overflow: 'hidden', marginBottom: 28, background: `linear-gradient(135deg, ${adv.transportColor}44, ${adv.transportColor}99)`, boxShadow: '0 4px 40px rgba(0,0,0,0.12)' }}>
              {(photosReady || photoMap[String(adv.id)]) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photoMap[String(adv.id)] || adv.imageFallback} alt={adv.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading={i < 2 ? 'eager' : 'lazy'} />
              )}
            </div>

            <p style={{ fontSize: 'clamp(17px, 2vw, 20px)', color: 'var(--txt, #1a1a1a)', lineHeight: 1.7, margin: '0 0 16px', fontWeight: 700, fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)', fontStyle: 'italic', maxWidth: 720 }}>{adv.intro}</p>
            <p style={{ fontSize: 'clamp(15.5px, 1.6vw, 17.5px)', color: 'var(--txt2, #3a3a3a)', lineHeight: 1.9, margin: '0 0 24px', maxWidth: 720 }}>{adv.body}</p>

            <div style={{ display: 'inline-flex', gap: 10, alignItems: 'flex-start', background: 'rgba(10,123,140,0.06)', border: '1px solid rgba(10,123,140,0.14)', borderLeft: '4px solid var(--sea, #0a7b8c)', borderRadius: '0 12px 12px 0', padding: '16px 20px', maxWidth: 680 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16, color: 'var(--sea, #0a7b8c)', flexShrink: 0, marginTop: 2 }}>
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
              </svg>
              <div>
                <strong style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--sea, #0a7b8c)', display: 'block', marginBottom: 5, fontWeight: 800 }}>Praktisk info</strong>
                <span style={{ fontSize: 14, color: 'var(--txt2, #3a3a3a)', lineHeight: 1.7 }}>{adv.practicalInfo}</span>
              </div>
            </div>

            {i < ADVENTURES.length - 1 && (
              <div style={{ marginTop: 72, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1, height: 1, background: 'rgba(10,123,140,0.1)' }} />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 18, height: 18, color: 'rgba(10,123,140,0.25)', flexShrink: 0 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 3.185-9 7.115 0 2.557 1.522 4.82 3.889 6.185C6.667 17.49 6 19.5 6 19.5s2.533-1.09 4.124-2.025c.614.08 1.24.125 1.876.125 4.97 0 9-3.185 9-7.115S16.97 3 12 3z"/>
                </svg>
                <div style={{ flex: 1, height: 1, background: 'rgba(10,123,140,0.1)' }} />
              </div>
            )}
          </article>
        ))}

        <div style={{ margin: '24px 0 80px', padding: '48px 40px', background: 'linear-gradient(135deg, #082014 0%, #1a5c3a 100%)', borderRadius: 28, textAlign: 'center', boxShadow: '0 12px 48px rgba(8,32,20,0.3)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '0 0 14px', position: 'relative' }}>Nästa steg</p>
          <p style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)', position: 'relative', lineHeight: 1.25 }}>Redo att planera din Ålandsresa?</p>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', margin: '0 0 32px', position: 'relative' }}>Låt Thorkel hjälpa dig att sätta ihop en personlig dagsplan.</p>
          <Link href="/planera" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', color: '#1a5c3a', fontSize: 15, fontWeight: 800, textDecoration: 'none', padding: '16px 36px', borderRadius: 32, position: 'relative', boxShadow: '0 4px 20px rgba(0,0,0,0.25)', letterSpacing: '0.01em' }}>
            Planera din tur med Thorkel
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 16, height: 16 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
