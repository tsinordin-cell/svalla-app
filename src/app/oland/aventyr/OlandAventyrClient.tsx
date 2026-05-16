'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const ADVENTURES = [
  {
    id: 1,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Södra Öland UNESCO + Långe Jan',
    distance: 'Ca 120 km söder om Borgholm',
    imageFallback: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85',
    imageAlt: 'Öppet landskap med fyr vid havet',
    intro: 'I södra Ölands ände möts två av Sveriges mest extraordinära naturupplevelser på samma dag – och ingen av dem kräver biljett för att ta emot dig.',
    body: 'Södra Ölands odlingslandskap är UNESCO-listat sedan 2000 – ett öppet, stäppliknande Alvar unikt i Europa, genomskuret av gamla stenmurar. I maj lyser kalkstensmarken av orkidéer i nästan osannolika koncentrationer. Längst ut i söder reser sig Långe Jan – Skandinaviens högsta fyr på 42 meter. Att klättra de 193 trappstegen och ställa sig vid lanterninen är att förstå vad som menas med horisont: hav i alla riktningar, Alvaret bakom. Ugglestarens naturreservat alldeles intill är ett paradis för fågelskådare under höstflyttningen.',
    practicalInfo: 'Bil rekommenderas. Långe Jan: inträde ca 60 kr. Planera heldagstur. Bäst i maj (blomning) och aug–sep (fågelflyttning). Ta med matsäck.',
  },
  {
    id: 2,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Eketorps fornborg – järnålderns Öland',
    distance: 'Ca 100 km söder om Borgholm',
    imageFallback: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=85',
    imageAlt: 'Rekonstruerad fornborg av kalksten i solsken',
    intro: 'Eketorp är den enda fullständigt utgrävda och rekonstruerade ringborgen i Norden – och ett av Ölands absoluta besöksmål.',
    body: 'Ursprungligen byggd på 400-talet e.Kr. som en befäst boplats för hundratals människor, ombyggd och återuppbyggd under järn- och folkvandringstiden. Borgvallen av kalksten är imponerande i sin omfång. Sommartid lever museet: kostymerad personal visar hantverk och djurhållning, arkeologer presenterar aktuella fynd och barn kan prova dräkter. Det är den typ av plats som gör historia konkret och gripbar istället för abstrakt och inlärd. Familjebiljetter finns. Kombinera med Alvaret som börjar precis söder om Eketorp.',
    practicalInfo: 'Öppet maj–sep. Familjebiljetter finns. Kostymerad personal sommartid. Kombinera med Alvaret söderut. Inträde ca 140 kr vuxen.',
  },
  {
    id: 3,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Borgholms slottsruin – kunglig historia',
    distance: 'Borgholm centrum',
    imageFallback: 'https://images.unsplash.com/photo-1467377791767-c929b5dc9a23?w=1200&q=85',
    imageAlt: 'Imponerande slottsruin omgiven av park',
    intro: 'Borgholms slott är en av Skandinaviens mest imponerande slottsruiner – och kopplingen till kungafamiljen gör besöket extra fascinerande.',
    body: 'Det enorma renässansslottet uppfördes på 1600-talet och brann 1806. Ruinen är i sin skala närmast häpnadsväckande: fyra höga murtorn, valvgångar och gallerier av sten som lyser guld i solskenet, med öppen himmel som tak innanför murarna. Guidade turer dagligen ger historien liv – en historia med Gustav Vasa, Erik XIV och Johan III. Kungafamiljen bor fortfarande på Solliden alldeles intill, och slottsparken är öppen under sommaren. Promenadavstånd från Borgholms centrum.',
    practicalInfo: 'Öppet maj–aug. Guidade turer dagligen. Inträde ca 100 kr vuxen. Solliden slottspark: öppet jun–aug.',
  },
  {
    id: 4,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Trollskogen – bok och dimma',
    distance: 'Ca 55 km norr om Borgholm',
    imageFallback: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=85',
    imageAlt: 'Gammal mossig skog med vindpinade träd',
    intro: 'Trollskogen på norra Öland är ett av Sveriges märkligaste naturområden – och namngiven av goda skäl.',
    body: 'En urskog av gamla, vindpinade och vridna bokträd med mossbetäckta stenar, rotvältor och ett dimmigt halvljus som skapar känslan av att träda in i en saga. Träden, som kan vara uppemot 1 000 år gamla, har formats av salta havsvinder till former ingen trädgårdsarkitekt kunde planera. Naturreservat med välmärkta stigar, barnvänlig terräng och spänstiga naturliga klätterträd runt varje kurva. Alltid öppet, inget inträde. Kombinera med ett besök i Byxelkroks charmiga fiskehamn och ett fiskebröd vid kajen.',
    practicalInfo: 'Alltid öppet, gratis inträde. Parkering vid Byxelkroks hamn ca 1 km. Barnvänligt. Bäst med morgondis – kom tidigt.',
  },
  {
    id: 5,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Alvaret – Europas unika stäpp',
    distance: 'Södra Öland, ca 80–120 km söder om Borgholm',
    imageFallback: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=85',
    imageAlt: 'Öppet stäpplandskap i varmt solljus',
    intro: 'Det stora Alvaret saknar motstycke i Europa – en öppen kalkstensmark som varken är skog, åker eller myr, utan något helt eget.',
    body: 'Alvaret täcker nästan en tredjedel av Ölands yta och är ett landskap som kan se tomt ut från en bil men öppnar sig helt för den som kliver ut och börjar gå. Kalkstensmarken är extrem – extremt tunn jord, extrem torka sommartid – vilket har selekterat fram en blomsterflora utan motstycke: upp till 26 orkidéarter blommar här. I maj och juni lyser Alvaret av backsippa, rosenrot och timjan. Naturreservat med välmärkta vandringsleder och total tystnad bortsett från vind och fågelsång. Ta med vatten – inga serviceverksamheter ute på Alvaret.',
    practicalInfo: 'Bäst i maj–juni (blomning). Bil rekommenderas. Gratis inträde. Ta med vatten och matsäck. Kombinerbart med Eketorp och Långe Jan.',
  },
  {
    id: 6,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Byxelkrok – norröns pärla',
    distance: 'Ca 60 km norr om Borgholm',
    imageFallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=85',
    imageAlt: 'Liten fiskehamn med båtar och röda stugor',
    intro: 'Byxelkrok är Ölands nordligaste by och ett av de mest genuina fiskelägen längs den svenska östkusten.',
    body: 'En liten hamn med brokiga fiskebåtar, ett rökeri vid kajen och ett sommarcafé – och direkt tillgång till Trollskogens trollska bokurskog norr om hamnen. Byxelkrok är inte ett turistmål i vanlig mening, det är en plats som råkar vara väldigt vacker utan att ha lagt ner något på det. På sommaren fylls gästhamnen av båtfolk från hela Östersjön. Parkera i byn, ta en promenad längs strandstigen och tillbringa ett par timmar i urskogen. Ät lunch vid kajen efteråt.',
    practicalInfo: 'Bil eller buss från Borgholm – kontrollera tidtabell. Café och rökeri vid hamnen sommartid. Kombinera med Trollskogen direkt norr om hamnen.',
  },
  {
    id: 7,
    transport: 'Med cykel',
    transportColor: '#8b4513',
    title: 'Södra Öland – UNESCO på cykel',
    distance: 'Ca 60 km rundtur från Mörbylånga',
    imageFallback: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
    imageAlt: 'Cyklist på öppen väg genom flackt landskap',
    intro: 'En cykelrunda som packar ett UNESCO-landskap, en fornborg och Skandinaviens högsta fyr på en och samma dag.',
    body: 'Starta i Mörbylånga och rulla söderut längs välskyltade cykelleder genom Alvaret, ett av Europas mest unika landskap med fri horisont och vind i håret. Eketorps fornborg dyker upp längs vägen – ett obligatoriskt stopp. Fortsätt söderut mot Ottenby och Långe Jan, vars trappa ger hisnande utsikt. Flackt landskap och bra asfalt gör det till en av Ölands bästa cykeldagar. Räkna med 7–8 timmar inklusive stopp och lunch.',
    practicalInfo: 'Start Mörbylånga (buss från Kalmar). Hyr cykel i Mörbylånga eller Borgholm. Planera 7–8 h. Ta med matsäck och vatten.',
  },
  {
    id: 8,
    transport: 'Med cykel',
    transportColor: '#8b4513',
    title: 'Borgholm–Eketorp – historisk cykeltur',
    distance: 'Ca 50 km enkel resa',
    imageFallback: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&q=85',
    imageAlt: 'Cykelväg längs öppen kust med hav i bakgrunden',
    intro: 'En klassisk Ölandsdag: slottsruin på morgonen, fornborg på eftermiddagen, buss hem på kvällen.',
    body: 'Från Borgholms slottsruin söderut längs väg 136 mot Eketorps fornborg – en resa som passerar medeltida kyrkor, alvarmark och karaktäristiska kalkstensmurar. Kyrkan i Gårdby, Resmo kyrka med sina romanska muralmålningar och Vickleby är värda ett kortare stopp. Leden är välskyltad och relativt platt, men håll koll på biltrafiken under högsäsong. Buss tillbaka från Mörbylånga på kvällen, vilket gör att du slipper cykla tillbaka i motvind.',
    practicalInfo: 'Hyr cykel i Borgholm. Buss tillbaka från Mörbylånga på kvällen. Mellannivå-cyklister. Planera 6–7 h.',
  },
  {
    id: 9,
    transport: 'Kollektivt',
    transportColor: '#2a7a40',
    title: 'Borgholm stadsvandring – Ölands puls',
    distance: 'Borgholm centrum',
    imageFallback: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=85',
    imageAlt: 'Charmig liten stad med trähus i sommarljus',
    intro: 'Borgholm är Ölands hjärta – och under sommaren en av Sveriges mest levande småstäder.',
    body: 'Hundratusentals turister passerar Borgholm varje sommar men staden har lyckats bevara sin karaktär tack vare ett centrum som fortfarande är mänskligt i sin skala. Storgatan med boutiques och restauranger, slottsruinen på kullen och hamnen nedanför skapar en naturlig promenadslinga. Kungsparken med sin havsutsikt är en av stadens bästa platser för picknick. Hamnrestaurangerna serverar allt från husmanskost till havsfrukt med direktutsikt mot båtarna. Turistbyrån vid hamnen ger karta och tips.',
    practicalInfo: 'Buss från Kalmar: ca 45 min. Promenadvänlig innerstad. Turistbyrån vid hamnen ger karta. Solliden slottspark: öppet jun–aug.',
  },
  {
    id: 10,
    transport: 'Kollektivt',
    transportColor: '#2a7a40',
    title: 'Mörbylånga – söder om Borgholm',
    distance: 'Ca 20 km söder om Borgholm, buss',
    imageFallback: 'https://images.unsplash.com/photo-1519981337-32df2b6c1bbb?w=1200&q=85',
    imageAlt: 'Pittoreskt litet samhälle med kvarn vid vatten',
    intro: 'Mörbylånga är södra Ölands lilla krona – genuint, lugnt och ett perfekt utgångsläge för södra öns bästa upplevelser.',
    body: 'Den karaktäristiska holländska kvarnen syns långt borrifrån och är ortens mest fotograferade landmärke. Centrum är pittoreskt och genuint öländskt utan att kännas turistifierat – en bedrift för en ort i hjärtat av ett av Sveriges mest besökta semesterområden. Härifrån startar den bästa cykeln mot Eketorps fornborg och Alvaret, och direktbuss kör hit från Kalmar utan byte. Cykeluthyrning finns i byn. Avsluta dagen med fika vid kvarnparken i kvällssolen.',
    practicalInfo: 'Buss från Borgholm ca 20 min, från Kalmar direkt. Kvarnen och museet fritt. Cykeluthyrning i byn.',
  },
]

export default function OlandAventyrClient() {
  const [photoMap, setPhotoMap] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/adventure-photos?island=oland')
      .then(r => r.ok ? r.json() : {})
      .then((data: Record<string, string>) => setPhotoMap(data))
      .catch(() => {})
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg, #f8f7f4)' }}>

      {/* ── Hero ── */}
      <div style={{
        background: 'linear-gradient(160deg, #1e0e06 0%, #6b3a1a 55%, #8b5220 100%)',
        padding: '0 24px',
        paddingTop: 'calc(env(safe-area-inset-top, 0px))',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 20, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', paddingBottom: 64 }}>
          <div style={{ padding: '18px 0 36px' }}>
            <Link href="/oland" style={{
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
              Öland
            </Link>
          </div>
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', margin: '0 0 16px' }}>Reseguide · 10 äventyr</p>
          <h1 style={{ fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)', fontSize: 'clamp(38px, 6vw, 68px)', fontWeight: 900, color: '#fff', margin: '0 0 20px', lineHeight: 1.08, letterSpacing: '-0.01em' }}>Äventyr på Öland</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(16px, 2vw, 20px)', margin: 0, maxWidth: 580, lineHeight: 1.65, fontStyle: 'italic', fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)' }}>
            UNESCO-Alvaret, Långe Jan, fornborg och cykelleder – tio upplevelser längs solöns 137 km långa kust.
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
          <Link href="/oland" style={{ color: 'var(--sea, #0a7b8c)', textDecoration: 'none', fontWeight: 600 }}>Öland</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span>Äventyr</span>
        </nav>
      </div>

      {/* ── Lead + Articles ── */}
      <div style={{ maxWidth: 820, margin: '0 auto', padding: '48px 24px 0' }}>
        <p style={{ fontSize: 'clamp(17px, 2vw, 20px)', color: 'var(--txt, #1a1a1a)', lineHeight: 1.85, margin: '0 0 72px', borderLeft: '4px solid var(--sea, #0a7b8c)', paddingLeft: 24, maxWidth: 660 }}>
          Öland kallas solön – och med rätta. Men det är mer än sol och bad. Det är UNESCO-landskap, järnåldersfornborgar, vindpinade urskogar och en 137 km lång ö kantad av historia. Här är tio upplevelser som gör Öland rättvisa.
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoMap[String(adv.id)] || adv.imageFallback} alt={adv.imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading={i < 2 ? 'eager' : 'lazy'} />
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

        <div style={{ margin: '24px 0 80px', padding: '48px 40px', background: 'linear-gradient(135deg, #1e0e06 0%, #6b3a1a 100%)', borderRadius: 28, textAlign: 'center', boxShadow: '0 12px 48px rgba(30,14,6,0.3)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -60, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
          <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '0 0 14px', position: 'relative' }}>Nästa steg</p>
          <p style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, color: '#fff', margin: '0 0 12px', fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)', position: 'relative', lineHeight: 1.25 }}>Redo att planera din Ölandsresa?</p>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', margin: '0 0 32px', position: 'relative' }}>Låt Thorkel hjälpa dig att sätta ihop en personlig dagsplan.</p>
          <Link href="/planera" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', color: '#6b3a1a', fontSize: 15, fontWeight: 800, textDecoration: 'none', padding: '16px 36px', borderRadius: 32, position: 'relative', boxShadow: '0 4px 20px rgba(0,0,0,0.25)', letterSpacing: '0.01em' }}>
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
