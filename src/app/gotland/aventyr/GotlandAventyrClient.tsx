'use client'

import Link from 'next/link'

const ADVENTURES = [
  {
    id: 1,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Fårö – raukernas värld',
    distance: 'Ca 85 km från Visby',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    imageAlt: 'Dramatiska raukar vid havet på Fårö',
    intro: 'Fårö är Gotlands nordligaste ö och platsen där Ingmar Bergman valde att leva och filma. Men det är raukarna som stjäl showen.',
    body: 'Vid Langhammars sticker kalkstensformationerna upp ur havet som enorma, urgamla svampar – formade av vågor och vind under tusentals år. Det finns ingen annan plats i Sverige som ser ut så här. Ön nås med den gratis bilfärjan från Fårösund, och väl framme kan du spendera en hel dag på att vandra längs klippkusten, bada i klart vatten och besöka Bergmancentrum.',
    practicalInfo: 'Bilfärja Fårösund–Fårö: 5 min, gratis. Planera 4–5 h på ön. Ta med matsäck. Öppet hela året men bäst juni–september.',
  },
  {
    id: 2,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Lummelunda grottan – underjordens skatter',
    distance: 'Ca 15 km norr om Visby',
    image: 'https://images.unsplash.com/photo-1604537466158-719b1972feb8?w=800&q=80',
    imageAlt: 'Stalaktiter och stalagmiter inne i en grotta',
    intro: 'Under Gotlands kalkstensyta gömmer sig ett av Skandinaviens mest fascinerande naturfenomen.',
    body: 'Lummelunda grottan är Skandinaviens mest besökta turistgrotta – och med rätta. Stalaktiter och stalagmiter av kalksten som bildats under miljoner år täcker väggarna och taket. Guideturen tar ca 50 minuter och passar barn från ca 5 år. Temperaturen inne i grottan håller alltid 8°C, så ta med ett extra lager oavsett väder ute. En gratis cykelväg leder hit direkt från Visby.',
    practicalInfo: 'Öppet maj–sep. Guideturer var 30:e min. Temperatur alltid 8°C. Gratis cykelväg från Visby.',
  },
  {
    id: 3,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Hoburgen – Gotlands dramatiska sydspets',
    distance: 'Ca 115 km söder om Visby',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
    imageAlt: 'Dramatisk klippformation vid havet i solnedgång',
    intro: 'Om Fårö är Gotlands nordsida, är Hoburgen öns dramatiska slutackord – ett rakt kalkstensklint som pekar ut i Östersjön.',
    body: 'Fyren på klintens topp ger hisnande 360-gradersvyer över havet. Nere vid basen formar raukarna en nästan surrealistisk skulpturpark – klättervänliga men med respekt för vattenbryn. Det tar ca 1,5 h att vandra runt basen. Kombinera gärna med lunch i Burgsvik på vägen hem, ett litet fiskeläge med charmig hamn och sommarcafé.',
    practicalInfo: 'Inga matmöjligheter vid Hoburgen – ta med. Parkering gratis. Promenad runt basen ca 1,5 h.',
  },
  {
    id: 4,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Raukar-tur – tre platser på en dag',
    distance: 'Langhammars, Digerhuvud, Holmhällar',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
    imageAlt: 'Öde kustlandskap med klippor och hav',
    intro: 'Gotland har världens tätaste koncentration av raukar. En heldagsrunda med bil låter dig se tre av de mest spektakulära platserna.',
    body: 'Starta med Langhammars på Fårö (via bilfärjan), fortsätt till Digerhuvud vid Fårösundet och avsluta med Holmhällar i söder. Varje plats är helt unik – Langhammars höga och smala, Digerhuvud lägre och bredare, Holmhällar nästan som ett utomhusskulpturmuseum. Barnen älskar att klättra, men håll koll vid vattenbryn. Ta med lunch och vatten för hela dagen.',
    practicalInfo: 'Planera 8+ timmar. Inga inträdesavgifter. Ta med lunch och vatten.',
  },
  {
    id: 5,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Gotlands vingårdar – rosévin vid havet',
    distance: 'Ca 60 km söder om Visby',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80',
    imageAlt: 'Vingård med druvor i solljus',
    intro: 'Sverige varmaste ö har blivit en riktig vinregion – och vinprovning i Gotlandssolen är en upplevelse utöver det vanliga.',
    body: 'Bläsinge Vingård, Gotlandsdricka & Vin och Roma Vingård erbjuder alla provningar med havsutsikt och gotländska råvaror. Lokala viner av Solaris och Rondo-druvor, serverade med gotländsk chark och ost. Utse en nykter förare eller boka en guidad tur från Visby – det finns bussarrangemang som kör grupper mellan vingårdarna under högsäsong.',
    practicalInfo: 'Boka vinprovning i förväg. Utse nykter förare eller ta guidad tur från Visby.',
  },
  {
    id: 6,
    transport: 'Kollektivt',
    transportColor: '#2a7a40',
    title: 'Visby stadsvandring – medeltidsstaden',
    distance: 'Visby innerstad, ca 2 km runt',
    image: 'https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?w=800&q=80',
    imageAlt: 'Medeltida ringmur och kyrkoruiner i Visby',
    intro: 'UNESCO-listad sedan 1995. Visby är en av Europas bäst bevarade medeltidsstäder – och en upplevelse som inte liknar något annat i Sverige.',
    body: 'Ringmuren från ~1250 är nästan helt bevarad och sträcker sig 3,6 km runt gamla stan. Innanför muren väntar pittoreska gränder, kyrkoruiner från 1200-talet och en krogscen som blommat ut under de senaste åren. Strandgatan är krogstråket – här äter du middag med utsikt mot ringmurens torn. Gästhamnen anländer du till direkt under muren om du kommit med båt – en av Östersjöns vackraste ankomster.',
    practicalInfo: 'Guidade turer från turistbyrån. Mur-promenad ca 2 h. Färjan från Nynäshamn: 3–3,5 h.',
  },
  {
    id: 7,
    transport: 'Kollektivt',
    transportColor: '#2a7a40',
    title: 'Roma kloster – historiens tystnad',
    distance: 'Ca 18 km öster om Visby, buss 11',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
    imageAlt: 'Medeltida klosterruin med stenpelare',
    intro: 'En av Sveriges bäst bevarade cisterciensklosterruiner, byggd på 1100-talet och fortfarande gripande i sin stillhet.',
    body: 'Roma klosterruin är inte ett turistmål i vanlig mening – det är en plats man besöker för att stanna upp. Stenpelarna och valven är nästan intakta, och sommartid arrangeras konserter och teaterföreställningar inne i ruinen som skapar en atmosfär svår att beskriva. Ta buss 11 från Visby, ca 35 min. Ta med matsäck och planera för ett par lugna timmar.',
    practicalInfo: 'Buss 11 från Visby, ca 35 min. Sommartid teater och konserter. Ta med matsäck.',
  },
  {
    id: 8,
    transport: 'Kollektivt',
    transportColor: '#2a7a40',
    title: 'Tofta strand – Gotlands bästa sandstrand',
    distance: 'Ca 15 km söder om Visby, buss 2',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    imageAlt: 'Bred sandstrand med lugnt turkost vatten',
    intro: 'Gotland har Östersjöns varmaste badvatten och Tofta är öns bästa sandstrand – bred, vindskyddad och barnvänlig.',
    body: 'Tofta strand lockar familjer med grunt, varmt vatten och fin sand längs en lång strandremsa. Vattentemperaturen når 18–22°C i juli–aug, och havet är lugnt och grunt långt ut. Ta buss 2 från Visby (ca 25 min), ta med matsäck och tillbringa dagen. Gratis inträde.',
    practicalInfo: 'Buss 2 från Visby, ca 25 min. Gratis. Vattentemp: 18–22°C i juli–aug.',
  },
  {
    id: 9,
    transport: 'Med cykel',
    transportColor: '#8b4513',
    title: 'Cykla runt norra Gotland',
    distance: 'Ca 100–120 km, 2–3 dagar',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    imageAlt: 'Cyklist på väg längs en kustnära landsväg',
    intro: 'Gotland är landets bästa cykelö – flackt, vackert, välskyltade leder och natur som tar andan ur dig runt varje kurva.',
    body: 'En runda runt Fårö och norra kusten tillbaka till Visby är ett av Sveriges klassiska cykeleventyr. Du cyklar längs kustnära vägar, passerar fiskebyar, raukfält och medeltida kyrkor. Övernatta i vandrarhem längs vägen – boka i förväg under högsäsong. Hyr cykel i Visby vid hamnen eller i förväg via nätbokning.',
    practicalInfo: 'Hyr cykel i Visby. Övernatta i vandrarhem – boka i förväg. Planera 2–3 dagar.',
  },
  {
    id: 10,
    transport: 'Med cykel',
    transportColor: '#8b4513',
    title: 'Visby–Ljugarn – östkustens led',
    distance: 'Ca 75 km, 1–2 dagar',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&q=80',
    imageAlt: 'Cykelstig genom somrig skog',
    intro: 'Östra Gotland är tystare, grönare och mer avskilt än västkusten. Cykeln till Ljugarn längs östkusten är en av Gotlands vackraste dagsrutter.',
    body: 'Från Visby söderut via Roma och kulturhistoriska stopp längs vägen – medeltida kyrkor, fornborgar och öppna alvarlandskap. Målet Ljugarn är ett pittoreskt fiskesommarläge med Ljugarn Krog som utsökt avslutning. Mellannivå-cyklister. Buss tillbaka till Visby på kvällen om du vill göra det som dagstur.',
    practicalInfo: 'Hyr cykel vid hamnen i Visby. Buss tillbaka från Ljugarn. Mellannivå-cyklister.',
  },
]

const TRANSPORT_BADGE_ICON: Record<string, string> = {
  'Med bil': `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  'Kollektivt': `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  'Med cykel': `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="17.5" r="3.5"/><circle cx="18.5" cy="17.5" r="3.5"/><path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5L9 10l-4 4h5l3-5.5"/></svg>`,
}

export default function GotlandAventyrClient() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 100 }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #0d2440 0%, #1a4a5e 60%, #24697f 100%)',
        padding: '0 20px 0',
        paddingTop: 'calc(env(safe-area-inset-top, 0px))',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 30, left: -80, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', paddingBottom: 52 }}>
          <div style={{ padding: '14px 0 28px' }}>
            <Link href="/gotland" style={{
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
              Gotland
            </Link>
          </div>

          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', margin: '0 0 12px' }}>
            Reseguide · 10 äventyr
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 900, color: '#fff',
            margin: '0 0 16px', lineHeight: 1.15,
          }}>Äventyr på Gotland</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 17, margin: 0, maxWidth: 560, lineHeight: 1.7, fontStyle: 'italic', fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)' }}>
            Raukar, medeltidsmur, vingårdar och cykelleder – de tio upplevelser du inte bör missa på Östersjöns pärla.
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
          <Link href="/gotland" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>Gotland</Link>
          <span>›</span>
          <span>Äventyr</span>
        </nav>
      </div>

      {/* Article body */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 20px 0' }}>

        {/* Intro text */}
        <p style={{ fontSize: 16, color: 'var(--txt2)', lineHeight: 1.8, margin: '0 0 52px', borderLeft: '3px solid var(--sea)', paddingLeft: 20 }}>
          Gotland är mer än en sommaröstination. Det är raukarnas ö, medeltidsstaden, cykelparadiset och vinregionen – allt på samma plats. Här är tio upplevelser vi verkligen rekommenderar, oavsett om du kommit med båt, färja eller flyg.
        </p>

        {/* Adventure entries */}
        {ADVENTURES.map((adv, i) => (
          <article key={adv.id} style={{ marginBottom: 72 }}>
            {/* Number + title */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 20 }}>
              <span style={{
                fontSize: 48, fontWeight: 900, lineHeight: 1,
                fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
                color: 'rgba(10,123,140,0.12)',
                flexShrink: 0, minWidth: 52,
              }}>{String(adv.id).padStart(2, '0')}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                    background: adv.transportColor, color: '#fff',
                    padding: '3px 10px', borderRadius: 20,
                  }}>{adv.transport}</span>
                  <span style={{ fontSize: 12, color: 'var(--txt3)' }}>{adv.distance}</span>
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
                  fontSize: 'clamp(20px, 3vw, 26px)',
                  fontWeight: 700, color: 'var(--txt)',
                  margin: 0, lineHeight: 1.25,
                }}>{adv.title}</h2>
              </div>
            </div>

            {/* Image */}
            <div style={{
              width: '100%', aspectRatio: '16/8',
              borderRadius: 16,
              overflow: 'hidden',
              marginBottom: 20,
              background: `linear-gradient(135deg, ${adv.transportColor}33, ${adv.transportColor}88)`,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={adv.image}
                alt={adv.imageAlt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                loading={i < 2 ? 'eager' : 'lazy'}
              />
            </div>

            {/* Text */}
            <p style={{ fontSize: 15.5, color: 'var(--txt2)', lineHeight: 1.8, margin: '0 0 12px', fontWeight: 600 }}>
              {adv.intro}
            </p>
            <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.8, margin: '0 0 16px' }}>
              {adv.body}
            </p>

            {/* Practical box */}
            <div style={{
              background: 'rgba(10,123,140,0.05)',
              border: '1px solid rgba(10,123,140,0.12)',
              borderRadius: 12, padding: '14px 18px',
              fontSize: 13.5, color: 'var(--txt2)', lineHeight: 1.7,
            }}>
              <strong style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--sea)', display: 'block', marginBottom: 5, fontWeight: 800 }}>Praktisk info</strong>
              {adv.practicalInfo}
            </div>

            {/* Divider */}
            {i < ADVENTURES.length - 1 && (
              <div style={{ marginTop: 52, height: 1, background: 'rgba(10,123,140,0.1)' }} />
            )}
          </article>
        ))}

        {/* CTA */}
        <div style={{
          marginTop: 24, padding: '36px 32px',
          background: 'linear-gradient(135deg, #0d2440 0%, #1a4a5e 100%)',
          borderRadius: 24, textAlign: 'center',
          boxShadow: '0 8px 32px rgba(13,36,64,0.25)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: '0 0 10px' }}>Nästa steg</p>
          <p style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 8px', fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)', position: 'relative' }}>
            Redo att planera din Gotlandsresa?
          </p>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', margin: '0 0 24px', position: 'relative' }}>
            Låt Thorkel hjälpa dig att sätta ihop en personlig dagsplan.
          </p>
          <Link href="/planera" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', color: '#1a4a5e',
            fontSize: 15, fontWeight: 700, textDecoration: 'none',
            padding: '14px 32px', borderRadius: 28,
            position: 'relative',
            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          }}>
            Planera din tur med Thorkel →
          </Link>
        </div>
      </div>
    </div>
  )
}
