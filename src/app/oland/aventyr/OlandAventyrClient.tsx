import Link from 'next/link'
import Icon from '@/components/Icon'

// revision 2026-10-02: fältet icon ersätter imageFallback och imageAlt (se
// kommentaren ovanför komponenten). `as const` längst ned gör att TypeScript
// kontrollerar att varje icon är ett namn som finns i Icon.tsx.
// Entrépriserna för Långe Jan (nr 1), Eketorp (nr 2) och Borgholms slott (nr 3)
// är också borttagna. De saknade belägg, och verify-claims släppte förut igenom
// dem bara för att bildlänken strax ovanför räknades som belägg. Hellre kort
// text än fel text.
// Faktagranskat 2026-10-03 (Toms beslut efter revisionen): avstånden var fel med
// 20–100 km. Vägavstånd räknade med OSRM på OpenStreetMap-data (bil: Borgholm–
// Långe Jan 82 km, –Eketorp 78 km, –Trollskogen 70 km, –Byxelkrok 62 km,
// –Mörbylånga 47 km, –Resmo/Alvarets norra kant 42 km; cykel Mörbylånga–Eketorp–
// Långe Jan–Mörbylånga 92 km, Borgholm–Eketorp 78 km). Trollskogen är tallskog
// med gamla ekar, inte bokskog, och nås via Grankulla strax före Byxelkrok
// (Länsstyrelsen Kalmar, naturreservatets sida). Långe Jan är Sveriges, inte
// Skandinaviens, högsta fyr (Dueodde på Bornholm är högre). Busstider utan
// källa är borttagna – hänvisa till KLT:s tidtabell.
const ADVENTURES = [
  {
    id: 1,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Södra Öland UNESCO + Långe Jan',
    distance: 'Ca 82 km söder om Borgholm',
    icon: 'tower',
    intro: 'I södra Ölands ände möts två av Sveriges mest extraordinära naturupplevelser på samma dag – och ingen av dem kräver biljett för att ta emot dig.',
    body: 'Södra Ölands odlingslandskap är UNESCO-listat sedan 2000 – ett öppet, stäppliknande Alvar unikt i Europa, genomskuret av gamla stenmurar. I maj lyser kalkstensmarken av orkidéer i nästan osannolika koncentrationer. Längst ut i söder reser sig Långe Jan – Sveriges högsta fyr, 42 meter. Att klättra trappan och ställa sig vid lanterninen är att förstå vad som menas med horisont: hav i alla riktningar, Alvaret bakom. Ugglestarens naturreservat alldeles intill är ett paradis för fågelskådare under höstflyttningen.',
    practicalInfo: 'Bil rekommenderas. Planera heldagstur. Bäst i maj (blomning) och aug–sep (fågelflyttning). Ta med matsäck.',
  },
  {
    id: 2,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Eketorps fornborg – järnålderns Öland',
    distance: 'Ca 78 km söder om Borgholm',
    icon: 'castle',
    intro: 'Eketorp är den enda fullständigt utgrävda och rekonstruerade ringborgen i Norden – och ett av Ölands absoluta besöksmål.',
    body: 'Ursprungligen byggd på 400-talet e.Kr. som en befäst boplats för hundratals människor, ombyggd och återuppbyggd under järn- och folkvandringstiden. Borgvallen av kalksten är imponerande i sin omfång. Sommartid lever museet: kostymerad personal visar hantverk och djurhållning, arkeologer presenterar aktuella fynd och barn kan prova dräkter. Det är den typ av plats som gör historia konkret och gripbar istället för abstrakt och inlärd. Familjebiljetter finns. Kombinera med Alvaret som börjar precis söder om Eketorp.',
    practicalInfo: 'Öppet maj–sep. Familjebiljetter finns. Kostymerad personal sommartid. Kombinera med Alvaret söderut.',
  },
  {
    id: 3,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Borgholms slottsruin – kunglig historia',
    distance: 'Borgholm centrum',
    icon: 'castle',
    intro: 'Borgholms slott är en av Skandinaviens mest imponerande slottsruiner – och kopplingen till kungafamiljen gör besöket extra fascinerande.',
    body: 'Det enorma renässansslottet uppfördes på 1600-talet och brann 1806. Ruinen är i sin skala närmast häpnadsväckande: fyra höga murtorn, valvgångar och gallerier av sten som lyser guld i solskenet, med öppen himmel som tak innanför murarna. Guidade turer dagligen ger historien liv – en historia med Gustav Vasa, Erik XIV och Johan III. Kungafamiljen bor fortfarande på Solliden alldeles intill, och slottsparken är öppen under sommaren. Promenadavstånd från Borgholms centrum.',
    practicalInfo: 'Öppet maj–aug. Guidade turer dagligen. Solliden slottspark: öppet jun–aug.',
  },
  {
    id: 4,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Trollskogen – vridna tallar och dimma',
    distance: 'Ca 70 km norr om Borgholm',
    icon: 'tree',
    intro: 'Trollskogen på norra Öland är ett av Sveriges märkligaste naturområden – och namngiven av goda skäl.',
    body: 'En gammal tallskog med stormvridna träd, grova ekar klädda i murgröna, mossbetäckta stenar och ett dimmigt halvljus som skapar känslan av att träda in i en saga. Tallarna har formats av salta havsvindar till former ingen trädgårdsarkitekt kunde planera. Naturreservat med välmärkta stigar, barnvänlig terräng och spänstiga naturliga klätterträd runt varje kurva. Alltid öppet, inget inträde. Kombinera med ett besök i Byxelkroks charmiga fiskehamn och ett fiskebröd vid kajen.',
    practicalInfo: 'Alltid öppet, gratis inträde. Bil: väg 136 norrut, sväng mot Grankulla strax före Byxelkrok. Barnvänligt. Bäst med morgondis – kom tidigt.',
  },
  {
    id: 5,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Alvaret – Europas unika stäpp',
    distance: 'Södra Öland, ca 40–80 km söder om Borgholm',
    icon: 'leaf',
    intro: 'Det stora Alvaret saknar motstycke i Europa – en öppen kalkstensmark som varken är skog, åker eller myr, utan något helt eget.',
    body: 'Alvaret täcker en stor del av södra Öland och är ett landskap som kan se tomt ut från en bil men öppnar sig helt för den som kliver ut och börjar gå. Kalkstensmarken är extrem – extremt tunn jord, extrem torka sommartid – vilket har selekterat fram en blomsterflora utan motstycke med ett stort antal orkidéarter. I maj och juni lyser Alvaret av backsippa, rosenrot och timjan. Naturreservat med välmärkta vandringsleder och total tystnad bortsett från vind och fågelsång. Ta med vatten – inga serviceverksamheter ute på Alvaret.',
    practicalInfo: 'Bäst i maj–juni (blomning). Bil rekommenderas. Gratis inträde. Ta med vatten och matsäck. Kombinerbart med Eketorp och Långe Jan.',
  },
  {
    id: 6,
    transport: 'Med bil',
    transportColor: '#1a4a5e',
    title: 'Byxelkrok – norröns pärla',
    distance: 'Ca 60 km norr om Borgholm',
    icon: 'anchor',
    intro: 'Byxelkrok är en av Ölands nordligaste byar och ett av de mest genuina fiskelägena längs den svenska östkusten.',
    body: 'En liten hamn med brokiga fiskebåtar, ett rökeri vid kajen och ett sommarcafé – och Trollskogens stormvridna tallskog några kilometer nordost om hamnen. Byxelkrok är inte ett turistmål i vanlig mening, det är en plats som råkar vara väldigt vacker utan att ha lagt ner något på det. På sommaren fylls gästhamnen av båtfolk från hela Östersjön. Parkera i byn, ta en promenad längs strandstigen och tillbringa ett par timmar i urskogen. Ät lunch vid kajen efteråt.',
    practicalInfo: 'Bil eller buss från Borgholm – kontrollera tidtabell. Café och rökeri vid hamnen sommartid. Kombinera med Trollskogen några kilometer nordost om hamnen (sväng mot Grankulla strax före Byxelkrok).',
  },
  {
    id: 7,
    transport: 'Med cykel',
    transportColor: '#8b4513',
    title: 'Södra Öland – UNESCO på cykel',
    distance: 'Ca 90 km tur och retur från Mörbylånga',
    icon: 'bike',
    intro: 'En cykelrunda som packar ett UNESCO-landskap, en fornborg och Sveriges högsta fyr på en och samma dag.',
    body: 'Starta i Mörbylånga och rulla söderut längs välskyltade cykelleder genom Alvaret, ett av Europas mest unika landskap med fri horisont och vind i håret. Eketorps fornborg dyker upp längs vägen – ett obligatoriskt stopp. Fortsätt söderut mot Ottenby och Långe Jan, vars trappa ger hisnande utsikt. Flackt landskap och bra asfalt gör det till en av Ölands bästa cykeldagar – men det är nio mil, så räkna med en hel dag inklusive stopp och lunch.',
    practicalInfo: 'Start Mörbylånga (buss från Kalmar, KLT). Hyr cykel i Mörbylånga eller Borgholm. Planera en hel dag. Ta med matsäck och vatten.',
  },
  {
    id: 8,
    transport: 'Med cykel',
    transportColor: '#8b4513',
    title: 'Borgholm–Eketorp – historisk cykeltur',
    distance: 'Ca 78 km enkel resa',
    icon: 'bike',
    intro: 'En klassisk Ölandsdag: slottsruin på morgonen, fornborg på eftermiddagen, buss hem på kvällen.',
    body: 'Från Borgholms slottsruin söderut längs väg 136 mot Eketorps fornborg – en resa som passerar medeltida kyrkor, alvarmark och karaktäristiska kalkstensmurar. Kyrkan i Gårdby, Resmo kyrka med sina romanska muralmålningar och Vickleby är värda ett kortare stopp. Leden är välskyltad och relativt platt, men håll koll på biltrafiken under högsäsong. Ta bussen tillbaka på kvällen (KLT, kontrollera tidtabell och cykelplats), så slipper du cykla tillbaka i motvind.',
    practicalInfo: 'Hyr cykel i Borgholm. Buss tillbaka på kvällen (KLT). Vana cyklister – nästan åtta mil. Planera en hel dag.',
  },
  {
    id: 9,
    transport: 'Kollektivt',
    transportColor: '#2a7a40',
    title: 'Borgholm stadsvandring – Ölands puls',
    distance: 'Borgholm centrum',
    icon: 'walk',
    intro: 'Borgholm är Ölands hjärta – och under sommaren en av Sveriges mest levande småstäder.',
    body: 'Hundratusentals turister passerar Borgholm varje sommar men staden har lyckats bevara sin karaktär tack vare ett centrum som fortfarande är mänskligt i sin skala. Storgatan med boutiques och restauranger, slottsruinen på kullen och hamnen nedanför skapar en naturlig promenadslinga. Kungsparken med sin havsutsikt är en av stadens bästa platser för picknick. Hamnrestaurangerna serverar allt från husmanskost till havsfrukt med direktutsikt mot båtarna. Turistbyrån vid hamnen ger karta och tips.',
    practicalInfo: 'Buss från Kalmar (KLT, se tidtabell). Promenadvänlig innerstad. Turistbyrån vid hamnen ger karta. Solliden slottspark: öppet jun–aug.',
  },
  {
    id: 10,
    transport: 'Kollektivt',
    transportColor: '#2a7a40',
    title: 'Mörbylånga – söder om Borgholm',
    distance: 'Ca 45 km söder om Borgholm',
    icon: 'pin',
    intro: 'Mörbylånga är södra Ölands lilla krona – genuint, lugnt och ett perfekt utgångsläge för södra öns bästa upplevelser.',
    body: 'Den karaktäristiska holländska kvarnen syns långt borrifrån och är ortens mest fotograferade landmärke. Centrum är pittoreskt och genuint öländskt utan att kännas turistifierat – en bedrift för en ort i hjärtat av ett av Sveriges mest besökta semesterområden. Härifrån startar den bästa cykeln mot Eketorps fornborg och Alvaret, och det går buss hit från Kalmar (KLT). Cykeluthyrning finns i byn. Avsluta dagen med fika vid kvarnparken i kvällssolen.',
    practicalInfo: 'Buss från Kalmar och Färjestaden (KLT, se tidtabell). Kvarnen och museet fritt. Cykeluthyrning i byn.',
  },
] as const

// revision 2026-10-02: sidan visar inga foton längre.
// 1) Fotona hämtades från Google via /api/adventure-photos (borttagen). Rutten
//    gjorde upp till 10 Text Search-anrop per cachemiss och tystade felen.
//    Uppmätt 2026-10-02: /api/adventure-photos svarade {} för alla tre öarna,
//    så besökarna fick bara reservbilderna (det tidigare fältet imageFallback).
// 2) Reservbilderna var Unsplash-foton som inte föreställde platserna, till
//    exempel Taj Mahal som Eketorps fornborg, London som Borgholm och alptoppar
//    som Långe Jan. Bilden till Mörbylånga gav 404. Alt-texterna beskrev alltså
//    något annat än det som syntes. Granskat 2026-10-02. Hellre ingen bild än
//    fel bild.
// I stället visas en dekorativ ruta i samma format (16/7) med en ikon för
// äventyrstypen, så att sidans utseende inte ändras. Rutan är aria-hidden och saknar
// alt-text. Ska bilder tillbaka: använd foton av rätt plats, med alt-text som
// beskriver det som faktiskt syns.
// Komponenten har inga hooks eller händelsehanterare kvar och är därför en
// serverkomponent. Filnamnet (…Client.tsx) är kvar för att hålla ändringen liten.
export default function OlandAventyrClient() {
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
            UNESCO-Alvaret, Långe Jan, fornborg och cykelleder – tio upplevelser längs den 137 km långa solön.
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
              <span className="dekor-nr" aria-hidden="true" data-nr={String(adv.id).padStart(2, '0')} style={{ fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)', fontSize: 'clamp(64px, 8vw, 96px)', fontWeight: 900, lineHeight: 1, color: 'rgba(10,123,140,0.09)', flexShrink: 0, userSelect: 'none', letterSpacing: '-0.03em' }} />
              <div style={{ paddingBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', background: adv.transportColor, color: '#fff', padding: '4px 12px', borderRadius: 20 }}>{adv.transport}</span>
                  <span style={{ fontSize: 12, color: 'var(--txt3, #888)', fontWeight: 500 }}>{adv.distance}</span>
                </div>
                <h2 style={{ fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)', fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 800, color: 'var(--txt, #1a1a1a)', margin: 0, lineHeight: 1.2, letterSpacing: '-0.01em' }}>{adv.title}</h2>
              </div>
            </div>

            {/* Dekorativ ruta i bildens format, se kommentaren ovanför komponenten */}
            <div aria-hidden="true" style={{ width: '100%', aspectRatio: '16 / 7', borderRadius: 20, overflow: 'hidden', marginBottom: 28, background: `linear-gradient(135deg, ${adv.transportColor}44, ${adv.transportColor}99)`, boxShadow: '0 4px 40px rgba(0,0,0,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ width: 76, height: 76, borderRadius: '50%', background: adv.transportColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(0,0,0,0.18)' }}>
                <Icon name={adv.icon} size={36} stroke={1.6} />
              </span>
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
          <Link href="/planera" prefetch={false} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', color: '#6b3a1a', fontSize: 15, fontWeight: 800, textDecoration: 'none', padding: '16px 36px', borderRadius: 32, position: 'relative', boxShadow: '0 4px 20px rgba(0,0,0,0.25)', letterSpacing: '0.01em' }}>
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
