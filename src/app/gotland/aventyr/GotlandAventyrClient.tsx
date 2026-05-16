'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const ADVENTURES = [
  {
    id: 1,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Fårö – raukernas värld',
    distance: 'Ca 85 km från Visby',
    imageFallback: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85',
    imageAlt: 'Dramatiska raukar vid havet på Fårö',
    intro: 'Fårö är Gotlands nordligaste ö och platsen där Ingmar Bergman valde att leva, filma och till slut vila. Men det är raukarna som stjäl showen.',
    body: 'Vid Langhammars sticker kalkstensformationerna upp ur havet som enorma, urgamla svampar – formade av vågor och vind under mer än 400 miljoner år. Det finns ingen annan plats i Sverige som ser ut så här, och de flesta som besöker Fårö för första gången brukar bli stående i tystnad utan att riktigt veta varför. Ön nås med den gratis bilfärjan från Fårösund, en treminutersöverfart som ändå markerar något – ett skifte i tempo och stämning. Väl framme är det lätt att spendera en hel dag: vandra längs klippkusten norr om Langhammars, bada i det glasklara vattnet vid Ekeviken, och besöka Bergmancentrum i Dämba. Stranden Sudersand är öns populäraste men också vackraste – lång, vid och med sand som lyser vit mot tångluktande sommarluft.',
    practicalInfo: 'Bilfärja Fårösund–Fårö: 3 min, gratis. Bergmancentrum öppet maj–sep. Planera 5–6 h på ön. Ta med matsäck.',
  },
  {
    id: 2,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Lummelunda grottan – underjordens skatter',
    distance: 'Ca 15 km norr om Visby',
    imageFallback: 'https://images.unsplash.com/photo-1604537466158-719b1972feb8?w=1200&q=85',
    imageAlt: 'Stalaktiter och stalagmiter inne i en grotta',
    intro: 'Under Gotlands kalkstensyta gömmer sig ett av Skandinaviens mest fascinerande naturfenomen – ett underjordiskt landskap som tog miljoner år att forma.',
    body: 'Lummelunda grottan upptäcktes 1948 av tre pojkar som letade efter en försvunnen katt – och vad de hittade förändrade gotländsk turism för alltid. Stalaktiter och stalagmiter av kalksten hänger och reser sig i former som ser ut som smälta stearinljus, kristallbågar och petrifierade vattenfall. Guideturen tar ca 50 minuter och passar barn från ca 5 år. Temperaturen inne i grottan håller alltid 8°C oavsett hur varmt det är ute, så ta med ett extra lager. En underjordisk sjö reflekterar lysen i ett skimrande blått ljus som är nästan overkligt att se. En gratis cykelväg längs Lummelundaån leder hit direkt från Visby.',
    practicalInfo: 'Öppet maj–sep. Guideturer var 30:e min. Temp alltid 8°C – ta med extra kläder. Gratis cykelväg från Visby. Inträde ca 175 kr vuxen.',
  },
  {
    id: 3,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Hoburgen – Gotlands dramatiska sydspets',
    distance: 'Ca 115 km söder om Visby',
    imageFallback: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=85',
    imageAlt: 'Dramatisk klippformation vid havet i solnedgång',
    intro: 'Om Fårö är Gotlands nordsida är Hoburgen öns dramatiska slutackord – ett rakt kalkstensklint som pekar ut i Östersjön med en naturlig auktoritet.',
    body: 'Klintens vägg reser sig drygt 35 meter rak ur havet och fyren på dess topp ger 360-gradersvyer som täcker hela södra horisonten. Nere vid basen formar raukarna en nästan surrealistisk skulpturpark – de kallas "Hoburgsgubben" och liknar fornnordiska väktare av sten. Promenaden runt basen tar ca 1,5 h och är tillgänglig utan stödhjälpmedel. Kom tidigt på morgonen för tystnad och mjukt ljus. Kombinera gärna med ett lunchstopp i Burgsvik på vägen hem: ett pittoreskt fiskeläge med en enkel hamncafé och genuina gotlänningar som fortfarande vet hur en sill ska ätas.',
    practicalInfo: 'Inga matmöjligheter vid Hoburgen – ta med. Parkering gratis. Promenad runt basen ca 1,5 h. Burgsvik ca 10 km norrut.',
  },
  {
    id: 4,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Raukar-tur – tre platser på en dag',
    distance: 'Langhammars, Digerhuvud, Holmhällar',
    imageFallback: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=85',
    imageAlt: 'Öde kustlandskap med klippor och hav',
    intro: 'Gotland har världens tätaste koncentration av raukar. En heldagsrunda låter dig se tre spektakulära platser – varje med sin helt egna karaktär.',
    body: 'Starta på morgonen med bilfärjan till Fårö och Langhammars – de höga, smala pelarna vid norra kusten. Kör sedan söderut till Digerhuvud, där raukfältet är lägre och bredare, ibland täckt av fårhagar. Ta bilfärjan tillbaka och kör söderut till Holmhällar vid Vamlingbo – ett kustnära raukfält som i kvällsljus glöder i rosenguld. Varje plats skiljer sig dramatiskt från de andra. Barn älskar klättermöjligheterna, men håll koll vid vattenbryn. Ta med lunch och vatten för hela dagen – servicemöjligheterna längs rutten är begränsade.',
    practicalInfo: 'Planera 8–10 h. Inga inträdesavgifter. Bilfärjan Fårösund–Fårö gratis. Ta med lunch och vatten. GPS rekommenderas.',
  },
  {
    id: 5,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Gotlands vingårdar – rosévin vid havet',
    distance: 'Ca 50–70 km söder om Visby',
    imageFallback: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=85',
    imageAlt: 'Vingård med druvor i solljus',
    intro: 'Sveriges varmaste ö har blivit en riktig vinregion – och vinprovning i Gotlandssolen med utsikt mot havet är en upplevelse utöver det vanliga.',
    body: 'Gotland har flera vingårdar med gott rykte. Bläsinge Vingård strax söder om Visby fokuserar på Solaris och Rondo-druvor som ger en fruktig rosé idealisk för en sommarmiddag. Gotlandsdricka & Vin i Klintehamn kombinerar vinestat med lokalt bryggeri och erbjuder provningspaket med gotländsk chark och ost. Roma Vingård vid det gamla klostret ger utsikt mot klosterruinen. Gotlands terroir – kalkrik mark, sommarvärme och havsvind – ger vinerna en mineralisk karaktär som skiljer dem från söderländska alternativ. Utse en nykter förare eller boka guidad buss från Visby.',
    practicalInfo: 'Boka vinprovning i förväg, särskilt juli–aug. Utse nykter förare eller boka guidad buss från Visby.',
  },
  {
    id: 6,
    transport: 'Kollektivt',
    transportColor: '#2a7a40',
    title: 'Visby stadsvandring – medeltidsstaden',
    distance: 'Visby innerstad, ca 2–3 km runt',
    imageFallback: 'https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?w=1200&q=85',
    imageAlt: 'Medeltida ringmur och kyrkoruiner i Visby',
    intro: 'UNESCO-listad sedan 1995. Visby är en av Europas bäst bevarade medeltidsstäder – och en upplevelse utan motstycke i Sverige.',
    body: 'Ringmuren från omkring 1250 är nästan helt bevarad och sträcker sig 3,6 km runt gamla stan med sina 29 bevarade torn. Att vandra längs murens topp i solnedgången, med utsikt över tegeltaken på ena sidan och Östersjön på den andra, är en stund man minns länge. Innanför muren väntar pittoreska gränder av kullersten och tio kyrkoruiner från 1200-talet. Strandgatan och Stora Torget är krogstråket – gotländsk lammgryta eller öl med utsikt mot murens torn. Under Medeltidsveckan i början av augusti förvandlas hela staden till ett levande medeltidsmuseum.',
    practicalInfo: 'Guidade turer från turistbyrån vid hamnen. Mur-promenad ca 2 h. Färjan från Nynäshamn: 3–3,5 h. Medeltidsveckan: tidigt aug.',
  },
  {
    id: 7,
    transport: 'Kollektivt',
    transportColor: '#2a7a40',
    title: 'Roma kloster – historiens tystnad',
    distance: 'Ca 18 km öster om Visby, buss 11',
    imageFallback: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=85',
    imageAlt: 'Medeltida klosterruin med stenpelare',
    intro: 'En av Sveriges bäst bevarade cisterciensklosterruiner, grundad på 1100-talet – och fortfarande gripande i sin stilla skönhet.',
    body: 'Roma klosterruin är inte ett turistmål i vanlig bemärkelse – det är en plats man besöker för att stanna upp. Stenpelarna och de spetsbågade valven är nästan intakta, och när sommarsolen rör sig längs gulkalkstenen skapar det ett ljus som varierar timme för timme. Klostret uppfördes på 1100-talet och var ett av Östersjöregionens rikaste under medeltiden. Sommartid arrangeras konserter och Shakespeareföreställningar inne i ruinen – en atmosfär svår att beskriva med ord. Ta buss 11 från Visby (ca 35 min) och planera minst ett par lugna timmar.',
    practicalInfo: 'Buss 11 från Visby, ca 35 min. Sommartid teater och konserter – boka i förväg. Gratis inträde till ruinen. Ta med matsäck.',
  },
  {
    id: 8,
    transport: 'Kollektivt',
    transportColor: '#2a7a40',
    title: 'Tofta strand – Gotlands bästa sandstrand',
    distance: 'Ca 15 km söder om Visby, buss 2',
    imageFallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85',
    imageAlt: 'Bred sandstrand med lugnt turkost vatten',
    intro: 'Gotland har Östersjöns varmaste badvatten och Tofta är öns bästa sandstrand – bred, vindskyddad och alldeles perfekt för en hel dag i solen.',
    body: 'Tofta strand sträcker sig längs en lång, skyddad bukt där sandkornens ljusgula kontrast mot det grönblå vattnet skapar nästan medelhavskänsla – fast på svenska breddgrader. Vattentemperaturen når 18–22°C i juli och havet är grunt och lugnt långt ut, perfekt för familjer med barn. Strandremsan är tillräckligt lång för att aldrig kännas trång. Ta buss 2 från Visby (ca 25 min) och undvik parkeringsproblematiken under högsäsong. Kombinera med ett snabbstopp vid Follingbo kyrka på vägen.',
    practicalInfo: 'Buss 2 från Visby, ca 25 min. Gratis inträde. Vattentemp: 18–22°C i juli–aug. Glasskiosk sommartid. Ta med matsäck.',
  },
  {
    id: 9,
    transport: 'Med cykel',
    transportColor: '#8b4513',
    title: 'Cykla runt norra Gotland',
    distance: 'Ca 100–120 km, 2–3 dagar',
    imageFallback: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
    imageAlt: 'Cyklist på väg längs en kustnära landsväg',
    intro: 'Gotland är landets bästa cykelö – flackt, vackert, välskyltade leder och natur som tar andan ur dig runt varje kurva.',
    body: 'En runda runt Fårö och norra kusten tillbaka till Visby är ett av Sveriges klassiska cykeleventyr. Du cyklar längs kustnära vägar med tallskog på ena sidan och hav på den andra, passerar fiskebyar som Lickershamn och Kyllaj, raukfält och medeltida kyrkor varannan mil. På cykel tvingar Gotland dig att stanna, sniffa på det salta havet och äta glass i en by du aldrig planerat att besöka. Övernatta i vandrarhem längs vägen – boka i förväg under högsäsong. Elcykel finns hos de flesta uthyrare.',
    practicalInfo: 'Hyr cykel vid hamnen i Visby. Elcyklar tillgängliga. Övernatta i vandrarhem – boka i förväg. Planera 2–3 dagar.',
  },
  {
    id: 10,
    transport: 'Med cykel',
    transportColor: '#8b4513',
    title: 'Visby–Ljugarn – östkustens led',
    distance: 'Ca 75 km, 1–2 dagar',
    imageFallback: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&q=85',
    imageAlt: 'Cykelstig genom somrig skog',
    intro: 'Östra Gotland är tystare, grönare och mer avskilt än västkusten. Cykeln till Ljugarn längs östkusten är en av Gotlands vackraste dagsrutter.',
    body: 'Från Visby söderut genom det gotländska inlandet – förbi Roma klosterruin, vidare längs alvar och enbuskshagmark. Vägen passerar ett pärlband av medeltida kyrkor; det finns inget bättre sätt att förstå varför Gotland har fler medeltidskyrkor per kvadratkilometer än något annat område i Norden. Alvaret vid Lojsta är ruttens höjdpunkt – öppet, vindpinat och fullt av blomster i maj. Ljugarn vid kusten är målet: ett pittoreskt fiskeläge med träbryggor och Ljugarn Krog som serverar mat på en altan med direktutsikt mot havet.',
    practicalInfo: 'Hyr cykel vid hamnen i Visby. Buss tillbaka från Ljugarn på kvällen. Mellannivå-cyklister. Planera 7–8 h.',
  },
]

export default function GotlandAventyrClient() {
  const [photoMap, setPhotoMap] = useState<Record<string, string>>({})
  const [photosReady, setPhotosReady] = useState(false)

  useEffect(() => {
    fetch('/api/adventure-photos?island=gotland')
      .then(r => r.ok ? r.json() : {})
      .then((data: Record<string, string>) => { setPhotoMap(data); setPhotosReady(true) })
      .catch(() => setPhotosReady(true))
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg, #f8f7f4)' }}>

      {/* ── Hero ── */}
      <div style={{
        background: 'linear-gradient(160deg, #0a1f35 0%, #1a4a5e 55%, #1e6070 100%)',
        padding: '0 24px',
        paddingTop: 'calc(env(safe-area-inset-top, 0px))',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 20, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', paddingBottom: 64 }}>
          {/* Back link */}
          <div style={{ padding: '18px 0 36px' }}>
            <Link href="/gotland" style={{
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
              Gotland
            </Link>
          </div>

          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', margin: '0 0 16px' }}>
            Reseguide · 10 äventyr
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
            fontSize: 'clamp(38px, 6vw, 68px)',
            fontWeight: 900, color: '#fff',
            margin: '0 0 20px', lineHeight: 1.08, letterSpacing: '-0.01em',
          }}>Äventyr på Gotland</h1>
          <p style={{
            color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(16px, 2vw, 20px)',
            margin: 0, maxWidth: 580, lineHeight: 1.65,
            fontStyle: 'italic',
            fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
          }}>
            Raukar, medeltidsmur, vingårdar och cykelleder – de tio upplevelser du inte bör missa på Östersjöns pärla.
          </p>
        </div>

        {/* Wave */}
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 56, marginBottom: -1 }}>
          <path d="M0,28 C480,56 960,0 1440,28 L1440,56 L0,56 Z" fill="var(--bg, #f8f7f4)" />
        </svg>
      </div>

      {/* ── Breadcrumb ── */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '16px 24px 0' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--txt3, #999)' }}>
          <Link href="/" style={{ color: 'var(--sea, #0a7b8c)', textDecoration: 'none', fontWeight: 600 }}>Svalla</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href="/gotland" style={{ color: 'var(--sea, #0a7b8c)', textDecoration: 'none', fontWeight: 600 }}>Gotland</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span>Äventyr</span>
        </nav>
      </div>

      {/* ── Lead paragraph ── */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px 0' }}>
        <p style={{
          fontSize: 'clamp(17px, 2vw, 20px)',
          color: 'var(--txt, #1a1a1a)',
          lineHeight: 1.85,
          margin: '0 0 72px',
          borderLeft: '4px solid var(--sea, #0a7b8c)',
          paddingLeft: 24,
          fontWeight: 400,
          maxWidth: 660,
        }}>
          Gotland är mer än en sommaröstination. Det är raukernas ö, medeltidsstaden, cykelparadiset och vinregionen – allt på samma plats. Här är tio upplevelser vi verkligen rekommenderar, oavsett om du kommit med båt, färja eller flyg.
        </p>

        {/* ── Articles ── */}
        {ADVENTURES.map((adv, i) => (
          <article key={adv.id} style={{ marginBottom: 100 }}>

            {/* Chapter number + meta */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 10 }}>
              <span style={{
                fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
                fontSize: 'clamp(64px, 8vw, 96px)',
                fontWeight: 900, lineHeight: 1,
                color: 'rgba(10,123,140,0.09)',
                flexShrink: 0, userSelect: 'none',
                letterSpacing: '-0.03em',
              }}>{String(adv.id).padStart(2, '0')}</span>

              <div style={{ paddingBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em',
                    background: adv.transportColor, color: '#fff',
                    padding: '4px 12px', borderRadius: 20,
                  }}>{adv.transport}</span>
                  <span style={{ fontSize: 12, color: 'var(--txt3, #888)', fontWeight: 500 }}>{adv.distance}</span>
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
                  fontSize: 'clamp(22px, 3.5vw, 34px)',
                  fontWeight: 800, color: 'var(--txt, #1a1a1a)',
                  margin: 0, lineHeight: 1.2, letterSpacing: '-0.01em',
                }}>{adv.title}</h2>
              </div>
            </div>

            {/* Full-bleed image */}
            <div style={{
              width: 'calc(100% + 0px)',
              aspectRatio: '16 / 7',
              borderRadius: 20,
              overflow: 'hidden',
              marginBottom: 28,
              background: `linear-gradient(135deg, ${adv.transportColor}44, ${adv.transportColor}99)`,
              boxShadow: '0 4px 40px rgba(0,0,0,0.12)',
            }}>
              {(photosReady || photoMap[String(adv.id)]) && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photoMap[String(adv.id)] || adv.imageFallback}
                  alt={adv.imageAlt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  loading={i < 2 ? 'eager' : 'lazy'}
                />
              )}
            </div>

            {/* Intro – bold lead */}
            <p style={{
              fontSize: 'clamp(17px, 2vw, 20px)',
              color: 'var(--txt, #1a1a1a)',
              lineHeight: 1.7, margin: '0 0 16px',
              fontWeight: 700,
              fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
              fontStyle: 'italic',
              maxWidth: 720,
            }}>{adv.intro}</p>

            {/* Body */}
            <p style={{
              fontSize: 'clamp(15.5px, 1.6vw, 17.5px)',
              color: 'var(--txt2, #3a3a3a)',
              lineHeight: 1.9, margin: '0 0 24px',
              maxWidth: 720,
            }}>{adv.body}</p>

            {/* Practical info */}
            <div style={{
              display: 'inline-flex', gap: 10, alignItems: 'flex-start',
              background: 'rgba(10,123,140,0.06)',
              border: '1px solid rgba(10,123,140,0.14)',
              borderLeft: '4px solid var(--sea, #0a7b8c)',
              borderRadius: '0 12px 12px 0',
              padding: '16px 20px',
              maxWidth: 680,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16, color: 'var(--sea, #0a7b8c)', flexShrink: 0, marginTop: 2 }}>
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
              </svg>
              <div>
                <strong style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--sea, #0a7b8c)', display: 'block', marginBottom: 5, fontWeight: 800 }}>Praktisk info</strong>
                <span style={{ fontSize: 14, color: 'var(--txt2, #3a3a3a)', lineHeight: 1.7 }}>{adv.practicalInfo}</span>
              </div>
            </div>

            {/* Divider */}
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

        {/* ── CTA ── */}
        <div style={{
          margin: '24px 0 80px',
          padding: '48px 40px',
          background: 'linear-gradient(135deg, #0a1f35 0%, #1a4a5e 100%)',
          borderRadius: 28, textAlign: 'center',
          boxShadow: '0 12px 48px rgba(10,31,53,0.3)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: -40, left: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }} />
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '0 0 14px', position: 'relative' }}>Nästa steg</p>
          <p style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)', position: 'relative', lineHeight: 1.25 }}>
            Redo att planera din Gotlandsresa?
          </p>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', margin: '0 0 32px', position: 'relative' }}>
            Låt Thorkel hjälpa dig att sätta ihop en personlig dagsplan.
          </p>
          <Link href="/planera" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: '#fff', color: '#1a4a5e',
            fontSize: 15, fontWeight: 800, textDecoration: 'none',
            padding: '16px 36px', borderRadius: 32,
            position: 'relative',
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            letterSpacing: '0.01em',
          }}>
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
