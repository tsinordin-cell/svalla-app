import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Öland: världsarvet, Trollskogen och Långe Jan',
  description: 'Världsarvet på södra Öland, Borgholms slott, Trollskogen, Böda och Ottenby med Långe Jan. Så tar du dig till Öland med bil, tåg och buss.',
  keywords: [
    'öland guide',
    'öland semester',
    'borgholms slott',
    'alvaret öland',
    'trollskogen öland',
    'långe jan',
    'ölandsbron',
    'öland buss',
    'södra ölands odlingslandskap',
    'världsarv öland',
    'ottenby',
    'böda sandstrand',
    'mörbylångaleden',
    'öland sevärdheter',
  ],
  openGraph: {
    title: 'Öland: världsarvet, Trollskogen och Långe Jan',
    description: 'Världsarvet på södra Öland, Trollskogen, Böda och Ottenby.',
    url: 'https://svalla.se/oland',
  },
  alternates: { canonical: 'https://svalla.se/oland' },
}

const ITEMS: LandingItem[] = [
  {
    icon: 'map',
    title: 'Ösidan om Öland',
    description: 'Världsarvet, Trollskogen, Böda och Ottenby på en sida, med resvägar och regler.',
    href: '/o/oland',
    meta: 'Gratis',
  },
  {
    icon: '🏰',
    title: 'Borgholms slott',
    // KÄLLA: https://www.borgholmsslott.se/ — "I 900 år har Borgholms slott stått på sin klippkant och blickat ut över Kalmarsund", "innan palatset förstördes vid en brand i början av 1800-talet", "Guidade turer" (läst 2026-09-27); https://www.borgholmsslott.se/oppettider/ — "28 mars – 30 april: Dagligen kl. 10-16", "1 oktober – 1 november: Dagligen kl. 10-16", "Hundar är välkomna till Borgholms Slott." (läst 2026-09-27); https://www.sollidensslott.se/ — "Öppet dagligen 7 maj - 27 september 2026", "Det byggdes av min farfars mor, Drottning Victoria, och stod färdigt 1906" (läst 2026-09-27)
    description: 'Slottsruinen på klippkanten över Kalmarsund, med utställningar och guidade turer.',
    href: '/o/oland',
  },
  {
    icon: '🌲',
    title: 'Trollskogen och Böda',
    // KÄLLA: https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/trollskogen.html — "Reservatet ligger på Ölands nordostligaste udde", "gammal tallskog med stormvridna träd", "mäktiga ekar klädda i murgröna", "klapperstenstränder", "Trollskogen är ett av Ölands mest besökta naturområden" (läst 2026-09-27); https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/bodakustens-ostra.html — "Här finns Ölands längsta sandstrand", "tio meter höga sanddyner", "De äldsta tallarna är upp emot 200 år gamla" (läst 2026-09-27)
    description: 'Stormvridna tallar på Ölands nordostligaste udde, och Ölands längsta sandstrand i Bödakustens östra naturreservat.',
    href: '/o/oland',
  },
  {
    icon: '🗼',
    title: 'Ottenby och Långe Jan',
    // KÄLLA: https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/ottenby.html — "På Ölands södra udde, en av Sveriges bästa fågellokaler, ligger naturreservatet Ottenby. Reservatet är ett av de största i Kalmar län och omfattar 995 hektar.", "Vid Ottenby fyrby, längs ner på udden finns en fågelstation som drivs av Sveriges Ornitologiska förening. Här ringmärks årligen tusentals fåglar", "Fyren Långe Jan är ett av Ölands mest kända landmärken. Den byggdes på 1780-talet och är med sina 42 meter Sveriges högsta fyr.", "de äldsta har en stamomkrets på över 400 cm och är drygt 400 år gamla", "På 1690-talet lät Karl XI bygga muren runt Ottenby lund" (läst 2026-09-27)
    description: 'En av Sveriges bästa fågellokaler på Ölands södra udde, och Långe Jan, Sveriges högsta fyr.',
    href: '/o/oland',
  },
  {
    icon: '⛵',
    title: 'Äventyr på Öland',
    description: 'Utvalda rundor med bil, cykel och kollektivtrafik.',
    href: '/oland/aventyr',
  },
  {
    icon: '📍',
    title: 'Logga dina turer',
    description: 'Skapa ett gratis konto och logga dina turer med GPS, bilder och anteckningar.',
    href: '/kom-igang',
  },
]

export default function OlandPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Hur tar man sig till Öland?',
        // KÄLLA: https://www.oland.se/en/travel/bus-tag-taxi — "several daily departures to Kalmar from Stockholm, Gothenburg and Malmö/Copenhagen", "Direct bus in both directions all year round", "From Kalmar and on to Öland, you can travel with the local bus company KLT", "lines 101, 102, 103, 104, 105, 106, 107, 112", "you can bring a bicycle" (läst 2026-09-27). Restider, BRA-flyg och «kostnads- och tullfri bro» stod tidigare utan källa.
        acceptedAnswer: { '@type': 'Answer', text: 'Med bil kör du över Ölandsbron från Kalmar. Med tåg åker du till Kalmar och tar sedan Kalmar länstrafiks regionbussar vidare ut på ön. Silverlinjen kör direktbuss mellan Stockholm och Öland året runt.' },
      },
      {
        '@type': 'Question',
        name: 'Vad är världsarvet på södra Öland?',
        // KÄLLA: https://www.oland.se/ — "Solens och vindarnas ö", "Välkommen till Ölands officiella besöksguide." (läst 2026-09-27); https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/bodakustens-ostra.html — "Här finns Ölands längsta sandstrand" (läst 2026-09-27); https://www.lansstyrelsen.se/kalmar/besoksmal/varldsarvet-sodra-olands-odlingslandskap.html — "År 2000 skrevs Södra Ölands odlingslandskap in på Unesco:s världsarvslista" (läst 2026-09-27); https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/trollskogen.html — "Trollskogen gör verkligen skäl för sitt namn" (läst 2026-09-27)
        acceptedAnswer: { '@type': 'Answer', text: 'Södra Ölands odlingslandskap skrevs in på Unescos världsarvslista år 2000. Ölänningarna odlar i dag den jord som odlats i generationer och låter beta de marker som har betats i ett par tusen år.' },
      },
      {
        '@type': 'Question',
        name: 'Vad är Trollskogen?',
        // KÄLLA: https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/trollskogen.html — "Reservatet ligger på Ölands nordostligaste udde", "gammal tallskog med stormvridna träd", "mäktiga ekar klädda i murgröna", "klapperstenstränder", "Trollskogen är ett av Ölands mest besökta naturområden" (läst 2026-09-27); https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/bodakustens-ostra.html — "Här finns Ölands längsta sandstrand", "tio meter höga sanddyner", "De äldsta tallarna är upp emot 200 år gamla" (läst 2026-09-27)
        acceptedAnswer: { '@type': 'Answer', text: 'Ett naturreservat på Ölands nordostligaste udde, med gammal tallskog med stormvridna träd, grova ekar och klapperstensstränder. Det är ett av Ölands mest besökta naturområden.' },
      },
    ],
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Öland', item: 'https://svalla.se/oland' },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <CategoryLanding
        heroGradient={['#6b3a1a', '#8b5524']}
        eyebrow="Öland"
        title="Solens och vindarnas ö"
        tagline="Världsarvet på södra Öland, Trollskogen och Ölands längsta sandstrand vid Böda."
        heroIcon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        }
        intro={
          <>
            {/* KÄLLA: https://www.oland.se/ — "Solens och vindarnas ö", "Välkommen till Ölands officiella besöksguide." (läst 2026-09-27); https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/bodakustens-ostra.html — "Här finns Ölands längsta sandstrand" (läst 2026-09-27); https://www.lansstyrelsen.se/kalmar/besoksmal/varldsarvet-sodra-olands-odlingslandskap.html — "År 2000 skrevs Södra Ölands odlingslandskap in på Unesco:s världsarvslista" (läst 2026-09-27); https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/trollskogen.html — "Trollskogen gör verkligen skäl för sitt namn" (läst 2026-09-27) */}
            <p>
              Södra Ölands odlingslandskap skrevs in på Unescos världsarvslista år 2000. Ölänningarna odlar i dag den jord som odlats i generationer och låter beta de marker som har betats i ett par tusen år.
            </p>
            {/* KÄLLA: https://www.lansstyrelsen.se/kalmar/besoksmal/varldsarvet-sodra-olands-odlingslandskap.html — "Av Ölands drygt 300 byar är cirka 200 radbyar", "alla gårdarna ligger tätt intill varandra på rad utmed bygatan eller landsvägen" (läst 2026-09-27); https://www.raa.se/evenemang-och-upplevelser/upplev-kulturarvet/varldsarv-i-sverige/alla-varldsarv-i-sverige/sodra-olands-odlingslandskap/ — "består av flacka hällmarker på hård kalkberggrund", "Stora Alvaret dominerar" (läst 2026-09-27) */}
            <p>
              Av Ölands drygt 300 byar är cirka 200 radbyar, där gårdarna ligger tätt på rad utmed bygatan. Utmarkerna är alvaren, flacka hällmarker på hård kalkberggrund, och Stora alvaret är det största.
            </p>
            <p>
              Med ett gratis konto på Svalla kan du logga dina turer med GPS, bilder och anteckningar.
            </p>
          </>
        }
        itemsTitle="Öland på Svalla"
        itemsDescription="Ösidan, sevärdheterna och rundorna."
        items={ITEMS}
        deeperContent={
          <>
            {/* Äventyrsbanner */}
            <a href="/oland/aventyr" style={{ textDecoration: 'none', display: 'block', marginBottom: 32 }}>
              <div style={{
                background: 'linear-gradient(135deg, #4a1e08 0%, #8b4513 100%)',
                borderRadius: 20,
                padding: '22px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 6px 28px rgba(139,69,19,0.30)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
                <div style={{
                  width: 48, height: 48, flexShrink: 0, borderRadius: 14,
                  background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76" />
                  </svg>
                </div>
                <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Utforska mer</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 3, fontFamily: "'Playfair Display', Georgia, serif" }}>Äventyr på Öland</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)' }}>10 utvalda rundor: bil, cykel och kollektivt</div>
                </div>
                <div style={{ width: 34, height: 34, flexShrink: 0, borderRadius: 10, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </div>
              </div>
            </a>

<h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
              Ta dig till Öland
            </h2>
            {/* KÄLLA: https://www.trafikverket.se/aktuellt-i-lanet/kalmar/pa-gang/vi-forbattrar-i-kalmar-lan/broarbeten-i-kalmar-lan/ — "Från augusti 2026 till 31 mars 2027", "Trafiken påverkas genom att vi stänger ett körfält i vardera riktning och sänker hastigheten", "Tänk också på att restiden kan bli längre" (läst 2026-09-27); https://www.trafikverket.se/om-oss/nyheter/lansnyheter/kalmar/2026/underhallsarbeten-pa-olandsbron--risk-for-koer/ — "6 april till 15 juni och 16 augusti till 21 september" (läst 2026-09-27) */}
            <p>
              <strong>Med bil</strong> kör du över Ölandsbron från Kalmar. Från augusti 2026 till 31 mars 2027 byter Trafikverket delar av brons övergångskonstruktioner. Ett körfält i vardera riktningen är avstängt och hastigheten sänkt, så räkna med längre restid.
            </p>
            {/* KÄLLA: https://www.oland.se/en/travel/bus-tag-taxi — "several daily departures to Kalmar from Stockholm, Gothenburg and Malmö/Copenhagen", "Direct bus in both directions all year round", "From Kalmar and on to Öland, you can travel with the local bus company KLT", "lines 101, 102, 103, 104, 105, 106, 107, 112", "you can bring a bicycle" (läst 2026-09-27). Restider, BRA-flyg och «kostnads- och tullfri bro» stod tidigare utan källa. */}
            <p>
              <strong>Med tåg och buss</strong> åker du till Kalmar, som har flera avgångar om dagen från Stockholm, Göteborg och Malmö. Därifrån går Kalmar länstrafiks regionbussar ut på ön. Silverlinjen kör direktbuss mellan Stockholm och Öland året runt.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
              Borgholm
            </h2>
            {/* KÄLLA: https://www.borgholmsslott.se/ — "I 900 år har Borgholms slott stått på sin klippkant och blickat ut över Kalmarsund", "innan palatset förstördes vid en brand i början av 1800-talet", "Guidade turer" (läst 2026-09-27); https://www.borgholmsslott.se/oppettider/ — "28 mars – 30 april: Dagligen kl. 10-16", "1 oktober – 1 november: Dagligen kl. 10-16", "Hundar är välkomna till Borgholms Slott." (läst 2026-09-27); https://www.sollidensslott.se/ — "Öppet dagligen 7 maj - 27 september 2026", "Det byggdes av min farfars mor, Drottning Victoria, och stod färdigt 1906" (läst 2026-09-27) */}
            {/* KÄLLA: https://www.sollidensslott.se/ — "Öppet dagligen 7 maj - 27 september 2026", "Kungafamiljens privata foton från Solliden", "deras privata miljö på Solliden", "På natursköna Kaffetorpet njuter du av mat, smörgåsar och härliga bakverk från eget bageri" (läst 2026-09-27) */}
            <p>
              Borgholms slott har legat på klippkanten över Kalmarsund i 900 år. Palatset brann i början av 1800-talet, och i ruinen finns i dag utställningar och guidade turer. Sollidens parker var öppna dagligen 7 maj till 27 september 2026.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
              Södra Öland
            </h2>
            {/* KÄLLA: https://www.oland.se/varldsarvet — "Hela södra Öland är ett världsarv. Från Karlevi i väster till Gårdby i öster och sedan hela vägen söderut sträcker sig ett underskönt landskap och en unik kulturbygd." (läst 2026-09-27); https://www.oland.se/ — "Sjömarker, alvarmarker, odlingsmarker och radbyarna på södra Öland utgör världsarvet", "Genom det karga och vackra världsarvet löper Mörbylångaleden, som är en av Svenska Turistföreningens tolv signaturleder. Upplev hela leden från Färjestaden ner till Ottenby" (läst 2026-09-27) */}
            <p>
              Världsarvet täcker hela södra Öland, från Karlevi i väster till Gårdby i öster och vidare söderut. Genom det går Mörbylångaleden, en av Svenska Turistföreningens tolv signaturleder, från Färjestaden ner till Ottenby.
            </p>
            {/* KÄLLA: https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/ottenby.html — "På Ölands södra udde, en av Sveriges bästa fågellokaler, ligger naturreservatet Ottenby. Reservatet är ett av de största i Kalmar län och omfattar 995 hektar.", "Vid Ottenby fyrby, längs ner på udden finns en fågelstation som drivs av Sveriges Ornitologiska förening. Här ringmärks årligen tusentals fåglar", "Fyren Långe Jan är ett av Ölands mest kända landmärken. Den byggdes på 1780-talet och är med sina 42 meter Sveriges högsta fyr.", "de äldsta har en stamomkrets på över 400 cm och är drygt 400 år gamla", "På 1690-talet lät Karl XI bygga muren runt Ottenby lund" (läst 2026-09-27) */}
            <p>
              Längst i söder ligger naturreservatet Ottenby, 995 hektar och en av Sveriges bästa fågellokaler. Vid Ottenby fyrby driver Sveriges Ornitologiska förening en fågelstation där tusentals fåglar ringmärks varje år. Här står också Långe Jan, som med sina 42 meter är Sveriges högsta fyr.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
              Norra Öland
            </h2>
            {/* KÄLLA: https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/trollskogen.html — "Reservatet ligger på Ölands nordostligaste udde", "gammal tallskog med stormvridna träd", "mäktiga ekar klädda i murgröna", "klapperstenstränder", "Trollskogen är ett av Ölands mest besökta naturområden" (läst 2026-09-27); https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/bodakustens-ostra.html — "Här finns Ölands längsta sandstrand", "tio meter höga sanddyner", "De äldsta tallarna är upp emot 200 år gamla" (läst 2026-09-27) */}
            <p>
              Trollskogen ligger på Ölands nordostligaste udde, med stormvridna tallar, grova ekar och klapperstensstränder. Det är ett av öns mest besökta naturområden. I Bödakustens östra naturreservat finns Ölands längsta sandstrand.
            </p>
            {/* KÄLLA: https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/bodakustens-ostra.html — "Dynområdet med flygsand är ett av Sveriges största", "Från Fagerrör till Trollskogen går en järnväg som anlades i början av 1900-talet för att forsla ut timmer från kronoparken. Järnvägen används idag som museijärnväg med turisttrafik under sommaren." (läst 2026-09-27); https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/trollskogen.html — "I Trollskogen finns fyra färgmarkerade vandringsleder", "Samtliga leder startar och avslutas vid naturum" (läst 2026-09-27) */}
            <p>
              Dynområdet med flygsand innanför Bödastranden är ett av Sveriges största. Från Fagerrör till Trollskogen går en järnväg från början av 1900-talet, som i dag trafikeras som museijärnväg på sommaren.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
              Vanliga frågor om Öland
            </h2>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Hur tar man sig till Öland?
            </h3>
            {/* KÄLLA: https://www.oland.se/en/travel/bus-tag-taxi — "several daily departures to Kalmar from Stockholm, Gothenburg and Malmö/Copenhagen", "Direct bus in both directions all year round", "From Kalmar and on to Öland, you can travel with the local bus company KLT", "lines 101, 102, 103, 104, 105, 106, 107, 112", "you can bring a bicycle" (läst 2026-09-27). Restider, BRA-flyg och «kostnads- och tullfri bro» stod tidigare utan källa. */}
            <p>
              Med bil kör du över Ölandsbron från Kalmar. Med tåg åker du till Kalmar och tar sedan Kalmar länstrafiks regionbussar vidare ut på ön. Silverlinjen kör direktbuss mellan Stockholm och Öland året runt.
            </p>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Vad är världsarvet på södra Öland?
            </h3>
            {/* KÄLLA: https://www.oland.se/ — "Solens och vindarnas ö", "Välkommen till Ölands officiella besöksguide." (läst 2026-09-27); https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/bodakustens-ostra.html — "Här finns Ölands längsta sandstrand" (läst 2026-09-27); https://www.lansstyrelsen.se/kalmar/besoksmal/varldsarvet-sodra-olands-odlingslandskap.html — "År 2000 skrevs Södra Ölands odlingslandskap in på Unesco:s världsarvslista" (läst 2026-09-27); https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/trollskogen.html — "Trollskogen gör verkligen skäl för sitt namn" (läst 2026-09-27) */}
            <p>
              Södra Ölands odlingslandskap skrevs in på Unescos världsarvslista år 2000 och är ett av Sveriges 15 världsarv.
            </p>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Vad är Trollskogen?
            </h3>
            {/* KÄLLA: https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/trollskogen.html — "Reservatet ligger på Ölands nordostligaste udde", "gammal tallskog med stormvridna träd", "mäktiga ekar klädda i murgröna", "klapperstenstränder", "Trollskogen är ett av Ölands mest besökta naturområden" (läst 2026-09-27); https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/bodakustens-ostra.html — "Här finns Ölands längsta sandstrand", "tio meter höga sanddyner", "De äldsta tallarna är upp emot 200 år gamla" (läst 2026-09-27) */}
            <p>
              Ett naturreservat på Ölands nordostligaste udde, med gammal tallskog med stormvridna träd, grova ekar och klapperstensstränder. Det är ett av Ölands mest besökta naturområden.
            </p>
          </>
        }
        cta={{ label: 'Utforska Ölands äventyr', href: '/oland/aventyr' }}
        related={[
          { label: 'Äventyr på Öland', href: '/oland/aventyr' },
          { label: 'Gotland', href: '/gotland' },
          { label: 'Åland', href: '/aland' },
          { label: 'Blekinges skärgård', href: '/blekinge-skargard' },
        ]}
      />
    </>
  )
}
