export type IslandActivity = {
  icon: string
  name: string
  desc: string
}

export type IslandAccommodation = {
  name: string
  type: string
  desc: string
  /** Boknings-URL — visas som "Boka →" på boende-undersidan */
  bookingUrl?: string
  /** Hemsida — visas som "Hemsida →" */
  websiteUrl?: string
}

export type IslandTransport = {
  method: string
  from?: string
  time?: string
  desc: string
  icon: string
  /** Operatörens egen sida för just det här färdsättet. Saknas den visas transport_meta.booking_url bara om färdsättet körs av transport_meta.operator. */
  url?: string
}

export type IslandHarbor = {
  name: string
  desc: string
  spots?: number
  fuel?: boolean
  service?: string[]
}

export type IslandRestaurant = {
  name: string
  type: string
  desc: string
  slug?: string
  /** URL till bokning (egen hemsida, OpenTable, Resy, Bokun osv.) — visas som "Boka bord →" på ösidan */
  bookingUrl?: string
  /** URL till hemsida — visas som "Hemsida →" om bookingUrl saknas */
  websiteUrl?: string
  price_example?: string
  open_season?: string
  open_hours?: string
  book_required?: boolean
  book_note?: string
  phone?: string
  child_menu?: boolean
}

export type IslandBeach = {
  name: string
  /** Beskrivning som känns lokal och specifik */
  desc: string
  type: 'sandstrand' | 'klippbad' | 'grusstrand' | 'brygga' | 'trampolinbad' | 'badvik'
  child_friendly?: boolean
  depth?: string
  directions?: string
  insider_tip?: string
}

export type IslandDayCost = {
  budget_per_person: string
  includes: string
  breakdown: { item: string; price: string }[]
  tips: string[]
}

export type Island = {
  slug: string
  name: string
  /** URL till coverbild (Wikimedia, Unsplash etc.) — visas i listsidor och OG-bilder */
  coverImage?: string
  region: 'norra' | 'mellersta' | 'södra' | 'bohuslan' | 'ovriga' | 'goteborg'
  regionLabel?: string
  /**
   * Vad posten är. Utelämnad = ö. Lysekil och Grebbestad är fastlandsorter och
   * Kosterhavet en nationalpark — de ligger under /o/ för att sidmallen passar,
   * men ska inte kallas ö för besökaren (Toms delegation 2026-09-20).
   */
  slag?: 'ö' | 'ort' | 'nationalpark'
  emoji: string
  tagline: string
  lat?: number   // approx center coordinate
  lng?: number
  description: string[]
  facts: Record<string, string>
  /**
   * Källproveniens per faktvärde i facts{}. Nyckeln matchar facts-nyckeln
   * (travel_time, season, character, best_for). 'matt' = källbelagt mot
   * myndighet/operatör, visas med ✓ 'Källbelagd'. 'bedomning' = vår egen
   * redaktionella bedömning, visas med ≈ 'Vår bedömning'. Fält som saknas
   * här visas utan märkning (nuläget). Infört varv 53 (2026-08-25).
   */
  facts_provenance?: Record<string, 'matt' | 'bedomning'>
  activities: IslandActivity[]
  accommodation: IslandAccommodation[]
  getting_there: IslandTransport[]
  harbors: IslandHarbor[]
  restaurants: IslandRestaurant[]
  day_cost?: IslandDayCost
  tips: string[]
  related: string[]
  tags: string[]
  /** 2–3 meningar om boendeutbudet på denna specifika ö — visas på /o/[slug]/boende */
  accommodationIntro?: string
  /**
   * Anpassad SEO-title som ersätter den generiska mallen.
   * Ange för högtrafik-öar för att bättre matcha sökintent.
   * Max ~60 tecken inkl. layoutens suffix " – Svalla" (9 tecken) = ~50 tecken för titeln. Skriv INTE "| Svalla" själv — layout.tsx lägger på suffixet (PR #336).
   */
  seoTitle?: string
  /**
   * Anpassad meta description som ersätter den generiska mallen.
   * Ange för högtrafik-öar. Max ~155 tecken.
   */
  seoDescription?: string
  did_you_know?: string
  /**
   * Maskinläsbar transport-sammanfattning för /o/[slug]/komma-dit (snabbfakta).
   * Kompletterar getting_there[] som är display-fokuserad.
   */
  transport_meta?: {
    from_city_min: number       // restid i minuter från Strömkajen / central hållplats
    from_nearest_hub_min: number // restid från närmaste pendeltågs-brygga (t.ex. Stavsnäs, Nynäshamn)
    nearest_hub: string          // namn på närmaste hub, t.ex. "Stavsnäs"
    operator: string             // "Waxholmsbolaget" | "Cinderella" | "Strömma"
    line?: string                // linjenummer eller linjenamn
    frequency: string            // t.ex. "Varje timme" | "3–5 ggr/dag sommartid"
    booking_url?: string
    car_parking?: string         // parkerings-info vid avfärdsbryggan
  }
  /**
   * Strukturerade aktivitetsdetaljer för schema.org och filter-funktioner.
   * Separerat från activities[] som är display-fokuserad med ikon + beskrivning.
   */
  activity_meta?: {
    kajak?: { difficulty: string, rental: boolean, notes?: string }
    cykel?: { rental: boolean, km_track?: number, notes?: string }
    bad?: {
      beaches: (string | IslandBeach)[]
      /** Källbelagd upplysning om bad på ön (t.ex. att kommunen saknar badplats här). Visas överst på /o/[slug]/bad. */
      note?: string
    }
    vandring?: {
      trails: number
      max_km?: number
      /** Etapp av Stockholm Archipelago Trail på denna ö. 270 km över 20 öar, invigd 2024. */
      sat?: { km: number, difficulty: 'Lätt' | 'Medel' | 'Krävande' }
    }
    fiske?: boolean
  }
  /** Praktisk serviceinformation på ön — för schema och filter */
  amenities?: {
    toilets?: boolean
    shower?: boolean
    cafe?: boolean
    grocery?: boolean
    atm?: boolean
    restaurant?: boolean
    shop?: boolean
    accommodation?: boolean
    beach?: boolean
    camping?: boolean
  }
  /**
   * Hundvänlighet. Satt på 8 öar, bara Grinda har dog_notes med KÄLLA. Ingen
   * /oar/hundvanliga-rutt byggs förrän varje ö som flaggas har koppelregler
   * från länsstyrelsens reservatsföreskrifter i dog_notes — en hundsida med
   * sju obelagda öar vore samma fel som barnvänliga-filtret var (2026-09-20).
   */
  dog_friendly?: boolean
  dog_notes?: string
  /**
   * Specifika insiderkunskaper om ön — används av Thorkel och visas på ö-sidan.
   * Ska vara konkreta, faktakontrollerade och svåra att hitta på egen hand.
   * Undvik generaliseringar — varje tips ska gälla just denna ö.
   */
  insiderTips?: string[]
  /**
   * Blogginlägg som handlar om eller nämner denna ö.
   * Visas som "Guider om [ö]"-sektion på ö-sidan för intern länkning.
   * Använd exakta slugs från src/app/blogg/posts-data.ts.
   */
  blogLinks?: { slug: string; title: string }[]
  /**
   * Strukturerad säsongsdata — visas som månadskalender + rekommendation på ö-sidan.
   * Används också för säsongs-SEO ("Sandhamn september öppet?").
   * months[0] = januari … months[11] = december
   */
  seasonal?: {
    /** T.ex. "Maj–September" */
    open: string
    /** T.ex. "Juli–mitten av Augusti" */
    peak: string
    /** T.ex. "Juni eller September" */
    best: string
    /** Förklaring till best — visas under kalenderraden */
    bestReason: string
    /** Varning om t.ex. begränsad service utanför säsong */
    warning?: string
    /** Månader 1-12: 'off' = stängt/vinter, 'limited' = begränsad service, 'open' = öppet, 'peak' = högsäsong */
    months: ('off' | 'limited' | 'open' | 'peak')[]
  }
}

export const ISLANDS: Island[] = [
  // ─── SANDHAMN ────────────────────────────────────────────────
  {
    slug: 'sandhamn',
    name: 'Sandhamn',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '⛵',
    // KÄLLA: https://stockholmslansmuseum.se/besoksmal/sandhamn/ — "Sandhamn har sedan 1700-talet varit lots- och tullstation och är nu en seglarmetropol", "ålderdomliga tull- och lotsstugor och sommarvillor från sekelskiftet 1900" (läst 2026-09-27); https://sandshotell.se/ — "Sandhamn i Stockholms ytterskärgård" (läst 2026-09-27)
    tagline: 'Seglarort, gammal lots- och tullplats och en by av lotsstugor och sommarvillor i ytterskärgården.',
    // KÄLLA: https://www.sandhamn.com/sv/restauranger-och-barer/segelsalen (restauranger), https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/trouvillesandhamn.4.18c983316e0536cb189a2d4.html ("Den långsträckta stranden i Trouville"), https://www.ksss.se/hamnar/sandhamn ("Gästhamnen på Sandhamn består av tre pontonbryggor med mellanliggande kajer framför Seglarhotellet"), https://stockholmslansmuseum.se/besoksmal/sandhamn/ ("lots- och tullstation") (läst 2026-09-27)
    seoTitle: 'Sandhamn 2026 – restauranger, boende & seglarkultur',
    seoDescription: 'Guide till Sandhamn: restauranger, Trouville-stranden, Seglarhotellet och båt från Stockholm. Lots- och tullplats i Stockholms skärgård.',
    description: [
      // KÄLLA: https://ksss.se/KSSS/historia/ — "KSSS grundades i Stockholm 1830 under namnet Svenska Segel Sällskapet" samt "aktiv seglingsverksamhet på fjärdarna runt Sandhamn, bidrog till klubbens goda rykte"
      'Sandhamn hör till de namn i Stockholms skärgård som de flesta känner igen, och seglingen är en stor del av förklaringen. Kungliga Svenska Segel Sällskapet, KSSS, grundades i Stockholm 1830 under namnet Svenska Segel Sällskapet, och sällskapets seglingsverksamhet på fjärdarna runt Sandhamn har följt ön sedan dess. Under sommaren ligger båtarna tätt och hamnlivet håller på långt in på kvällarna.',
      // KÄLLA: https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/trouvillesandhamn.4.18c983316e0536cb189a2d4.html, Trouville Sandhamn — "Den långsträckta stranden i Trouville, med sin vita sand, ligger på Sandhamns södra sida." / "Trouville ligger omkring 20 minuters promenad från hamnen."
      'Den långsträckta stranden Trouville, med sin vita sand, ligger på Sandhamns södra sida, omkring tjugo minuters promenad från hamnen.',
      // KÄLLA: https://stockholmslansmuseum.se/besoksmal/sandhamn/ — "Under slutet av 1600-talet upprättades en lotsstation och de bofasta under 1700- och 1800-talen var främst lotsar, tullare och krögare." / "Sandhamn har sedan 1700-talet varit lots- och tullstation"
      'Sandhamn är ingen gammal fiskeby utan en gammal lots- och tullplats. En lotsstation upprättades under slutet av 1600-talet, och de bofasta under 1700- och 1800-talen var främst lotsar, tullare och krögare. Sedan 1700-talet har ön varit lots- och tullstation, och den sjöfartsanknutna arbetskulturen syns fortfarande i hur byn är byggd.',
      // KÄLLA: https://stockholmslansmuseum.se/besoksmal/sandhamn/ — "Det pampiga gula tullhuset av sten som dominerar hamnen ritades av slottsarkitekten Carl Hårleman och byggdes 1752", "I de små 1700-talshusen Bryggstugan och Tullvaktstugan finns ett museum", "Den tre kilometer långa och en kilometer breda ön består av sand och åter sand" (läst 2026-09-27)
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/sandhamn — "Sandön ligger precis på gränsen till öppet hav och blev tidigt en viktig knutpunkt för sjöfarten" (läst 2026-09-27)
      'Det gula tullhuset av sten dominerar hamnen. Det ritades av slottsarkitekten Carl Hårleman och byggdes 1752. I de små 1700-talshusen Bryggstugan och Tullvaktstugan finns ett museum. Sandön, där byn ligger, är omkring tre kilometer lång och en kilometer bred och ligger precis på gränsen till öppet hav – därför blev den tidigt en knutpunkt för sjöfarten.',
      // KÄLLA: https://ksss.se/en/gotlandrunt/ — "since 2024 it starts at Gråskärsfjärden south of Sandön" / "boats sail south on open water to round Gotland with the finish at Sandhamn"
      // KÄLLA: https://ksss.se/KSSS/historia/ — Gotland Runt beskrivs som "den ledande havskappseglingen i norra Europa"
      // KÄLLA: https://www.ksss.se/hamnar/sandhamn/aktuellt — "26 juni-2 juli, Gotland Runt. Hela hamnen abbonerad." (läst 2026-09-27)
      'Gotland Runt avslutas i Sandhamn. Sedan 2024 går starten från Gråskärsfjärden söder om Sandön, medan målgången ligger kvar i Sandhamn, och KSSS beskriver tävlingen som den ledande havskappseglingen i norra Europa. Under tävlingen är hela KSSS gästhamn reserverad – 2026 gällde det 26 juni–2 juli.',
      // KÄLLA: https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/trouvillesandhamn.4.18c983316e0536cb189a2d4.html — "Trouville ligger omkring 20 minuters promenad från hamnen." (läst 2026-09-27); https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/flaskberget.4.18c983316e0536cb189a2c1.html — "klippbad alldeles vid Sandhamns by" (läst 2026-09-27); https://www.ksss.se/hamnar/sandhamn — "Från leden norr om Sandön till syd om Lökholmen är fartbegränsningen högst 5 knop. Vi ber er tänka på båtens svall" (läst 2026-09-27)
      'Barnfamiljer bör veta att det inte finns någon sandstrand vid hamnen: Trouville ligger omkring tjugo minuters promenad bort, och närmast byn finns klippbadet Fläskberget. Förbi gästhamnen, från leden norr om Sandön till söder om Lökholmen, gäller högst 5 knop, och KSSS ber båtfolket tänka på svallet.',
      // KÄLLA: https://www.naturkartan.se/sv/stockholms-lan/sandon-2 (text från Kultur & Fritid, Värmdö kommun) — "Den naturtyp som man ser över större delen av Sandön är trädklädda sanddynor", "måste du åka till Gotska Sandön eller Fårö", "Öns växtlighet består till stor del av vindpinade och små tallar, även om de tallar som är över 200 år är ofta smala stammar" (läst 2026-09-27)
      'Marken under fötterna är det som gör Sandön ovanlig. Huvuddelen av ön består av trädklädda sanddyner, och i den här delen av landet finns motsvarigheten bara på Gotska Sandön och Fårö. Tallskogen ovanpå dynerna är vindpinad och lågvuxen, och en tall som är över tvåhundra år gammal kan ändå ha en smal stam. Det förklarar både ljuset i skogen och varför stigarna känns mjuka att gå på.',
      // KÄLLA: https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/sparochleder.4.18c983316e0536cb189a419.html, Spår och leder — "Den cirka 8 km stigen går runt hela Sandön. Stigen utgår från Sandhamn, passerar sandstranden Trouville och vidare genom den vackra och ljusa tallskogen som är typisk för ön."
      // KÄLLA: https://www.naturkartan.se/sv/stockholms-lan/sandon-2 (Värmdö kommun) — "en Natur- och miljöstig 2,5 km, samt stigar på 3,5 km, 5,5 km samt den längsta som är 8 km. De utgår från Sandhamn" (läst 2026-09-27); https://stockholmarchipelagotrail.com/section/section-sandhamn/ — "The section starts from the quay where the public ferries arrive" (läst 2026-09-27)
      'Den som vill gå kan välja längd. Sandhamnsstigen är omkring åtta kilometer och går runt hela Sandön, utgår från Sandhamn, passerar Trouville och fortsätter genom tallskogen. Kortare varianter finns också: en natur- och miljöstig på 2,5 kilometer samt slingor på 3,5 och 5,5 kilometer, alla med start i byn, där också båtarna lägger till.',
      // KÄLLA: https://stockholmslansmuseum.se/besoksmal/sandhamn/ — "Värdshuset från 1670-talet är ett av Sveriges äldsta" / "ålderdomliga tull- och lotsstugor och sommarvillor från sekelskiftet 1900"
      'Värdshuset i Sandhamn är från 1670-talet och räknas som ett av Sveriges äldsta. Bebyggelsen runt omkring är en blandning av ålderdomliga tull- och lotsstugor och sommarvillor från sekelskiftet 1900 – arbetsplats och sommarnöje i samma by.',
      // KÄLLA: https://www.naturkartan.se/sv/stockholms-lan/sandon-2 (Värmdö kommun) — "Sandhamn befolkades av lotsar på 1700-talet och växte under 1800 talet när ångbåtstrafiken kom och Stockholmarna byggde sommarboende", "I slutet av 1800 talet växte ett av Sveriges centrum för segelbåtsentusiaster fram" (läst 2026-09-27)
      // KÄLLA: https://stockholmslansmuseum.se/besoksmal/sandhamn/ — "När ångbåtarna började gå på 1860-talet kom sommargästerna", "Författare och konstnärer lockades till ön, bland annat berömdheter som August Strindberg och Anders Zorn" (läst 2026-09-27)
      'Förvandlingen från lotsplats till seglarort gick i två steg. Lotsarna fanns här redan på 1700-talet, och när ångbåtarna började gå på 1860-talet kom sommargästerna och stockholmare började bygga sommarvillor. Författare och konstnärer lockades också, bland dem August Strindberg och Anders Zorn. Mot slutet av samma århundrade hade Sandhamn blivit ett svenskt centrum för seglare.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/gronskar.html, naturreservat Grönskär — "Skyddat sedan: 1965", "Storlek: 1,6 hektar varav land 1,1 hektar", "en liten, flack och vegetationsfattig ö i det yttersta kustbandet öster om Sandhamn", "den kända Grönskärs fyr som är av stort kulturhistoriskt värde" (läst 2026-09-27)
      // KÄLLA: https://skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/ — "Den 26 meter höga fyren har kallats Östersjöns Drottning på grund av sin skönhet. Fyren uppfördes 1770 av granit och sandsten efter ritningar av Carl Fredrik Adelcrantz."
      'Öster om Sandhamn ligger Grönskär, som Länsstyrelsen beskriver som en liten, flack och vegetationsfattig ö i det yttersta kustbandet. Ön är naturreservat sedan 1965 och omfattar 1,6 hektar, varav 1,1 hektar land, med Skärgårdsstiftelsen som markägare och förvaltare. Här står Grönskärs fyr: 26 meter hög, uppförd 1770 av granit och sandsten efter ritningar av Carl Fredrik Adelcrantz, och kallad Östersjöns Drottning på grund av sin skönhet.',
      // KÄLLA: https://skargardsstiftelsen.se/om-skargardsstiftelsen/var-historia/ — "Sjöfartsverket skänker Grönskärs fyr efter renovering" (1984); Stiftelsen Stockholms skärgård bildades den 20 mars 1959
      'Att fyren går att besöka är resultatet av en överlåtelse. Sjöfartsverket skänkte Grönskärs fyr till Skärgårdsstiftelsen 1984 efter en renovering, och stiftelsen har haft hand om den sedan dess. Stiftelsen själv bildades den 20 mars 1959.',
      // KÄLLA: https://www.varmdo.se/varmdohamnar/sandhamn — "Värmdö Hamnar äger fastigheten vid inloppet till Sandhamn", "Tullhuset som idag innehåller hyreslägenheter", "På fastigheten finns Sjöfartsverkets lotsverksamhet samt Kustbevakningen etablerade" (läst 2026-09-27)
      'Sjöfarten är inte bara historia här. Värmdö Hamnar äger fastigheten vid inloppet till Sandhamn, det gamla tullhuset rymmer i dag hyreslägenheter, och på platsen finns fortfarande Sjöfartsverkets lotsverksamhet och Kustbevakningen.',
    ],
    facts: {
      // KÄLLA: https://battaxi.se/sandhamnslinjen-2/ — "Sandhamnslinjen är en direkt reguljär tur som tar dig mellan Stavsnäs och Sandhamn på endast 30 minuter", "Höst 2 2026 (21/9-20/12)" (läst 2026-09-27); https://kund.printhuset-sthlm.se/wa/h16.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "STAVSNÄS – SANDHAMN – HAGEDE": Stavsnäs 09.45 → Sandhamn 10.45, 07.00 → 08.05, 20.12 → 20.50 (läst 2026-09-27); https://www.sandhamn.com/en/hitta-hit — "Year round — including winter" (läst 2026-09-27)
      // KÄLLA: https://www.stromma.com/globalassets/sweden/stockholm/product_timetables/02_excursions/cinderella/2026/cinderella_stockholm_sandhamn_2026.pdf — "Strandvägen - kajplats 14", "7/9 - 27/9", Strandvägen 10:00 → Sandhamn 12:30 (läst 2026-09-27)
      travel_time: 'Från Stavsnäs 30–65 min året runt · 2 tim 30 min med Cinderella från Strandvägen sommartid',
      // KÄLLA: https://www.ksss.se/hamnar/sandhamn — "Det finns ca 150 gästplatser på Sandhamn" (läst 2026-09-27); Seglarhotellet och Sandhamns Värdshus, se accommodation
      character: 'Seglarort med gästhamn, hotell och värdshus',
      // KÄLLA: https://www.dykarbaren.se/ — "Öppet 2026 säsong maj – september" (läst 2026-09-27); https://www.ksss.se/hamnar/sandhamn/aktuellt — "servicehusen med dusch, toalett och tvättstuga är endast öppna maj till september" (läst 2026-09-27); https://www.sandhamn.com/ — "året runt" (läst 2026-09-27); https://sandhamns-vardshus.se/ — "Puben", "Öppet året runt" (läst 2026-09-27)
      season: 'Maj–September (Seglarhotellet och värdshusets pub: helår)',
      // UPPSKATTNING: bedömning utifrån KSSS gästhamn, Trouville och Sandhamnsstigen (källor ovan)
      best_for: 'Segling, strandbad vid Trouville, promenad runt ön',
    },
    facts_provenance: { travel_time: 'matt', character: 'matt', season: 'bedomning', best_for: 'bedomning' },
    activities: [
      // KÄLLA: https://ksss.se/en/gotlandrunt/ — "boats sail south on open water to round Gotland with the finish at Sandhamn" (läst 2026-09-27)
      // KÄLLA: https://www.ksss.se/hamnar/sandhamn — "Gästhamnen på Sandhamn består av tre pontonbryggor med mellanliggande kajer framför Seglarhotellet", "Det finns ca 150 gästplatser på Sandhamn" (läst 2026-09-27); https://www.ksss.se/hamnar/lokholmen — "På Lökholmen finns plats för ca 200 båtar" (läst 2026-09-27)
      { icon: '⛵', name: 'Segling', desc: 'KSSS gästhamn har omkring 150 gästplatser framför Seglarhotellet och plats för cirka 200 båtar på Lökholmen. Gotland Runt Offshore Race har målgång i Sandhamn.' },
      // KÄLLA: https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/trouvillesandhamn.4.18c983316e0536cb189a2d4.html — "Den långsträckta stranden i Trouville, med sin vita sand", "omkring 20 minuters promenad från hamnen"
      { icon: '🏊', name: 'Sandstranden Trouville', desc: 'Lång strand med vit sand på södra sidan, omkring 20 minuters promenad från hamnen.' },
      // KÄLLA: https://www.sandhamn.com/sv/spa — "Här kan ni simma i den tempererade poolen, sjunka ner i jacuzzin", "Här finns också bastu, gym", "Spa och gym har öppet dagligen mellan 08.00–20.00", "Icke hotellgäster är välkomna i mån av plats", "Värmen från den vedeldade bastun", "Bokningar av bastuflotten sker via receptionen" (läst 2026-09-27)
      { icon: '🧖', name: 'Spa & Gym', desc: 'Seglarhotellets spa har tempererad pool, jacuzzi, bastu och gym, öppet dagligen 08–20. Den som inte bor på hotellet är välkommen i mån av plats. Vid havet finns vedeldade bastuflottar att boka.' },
      // KÄLLA: https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/sparochleder.4.18c983316e0536cb189a419.html — "Den cirka 8 km stigen går runt hela Sandön. Stigen utgår från Sandhamn, passerar sandstranden Trouville" (läst 2026-09-27); https://www.naturkartan.se/sv/stockholms-lan/sandon-2 — "en Natur- och miljöstig 2,5 km, samt stigar på 3,5 km, 5,5 km" (läst 2026-09-27)
      { icon: '🚶', name: 'Vandring', desc: 'Sandhamnsstigen går runt hela Sandön, cirka 8 km från byn förbi Trouville. Kortare slingor på 2,5, 3,5 och 5,5 km börjar också i byn.' },
      // KÄLLA: https://www.lansstyrelsen.se/download/18.1b1d393819324610c374853c/1732515630171/Fiskeguide%20Stockholms%20l%C3%A4n.pdf (Länsstyrelsen, Fiskeguide Stockholms län) — näbbgädda: "Våren och sommaren", "I Stockholms yttre skärgård från Sandhamn och söderut", "Grönskär, Horsten, Långviksskär, Ålö, Torö" (läst 2026-09-27)
      { icon: '🎣', name: 'Fiske', desc: 'Enligt Länsstyrelsens fiskeguide går näbbgäddan till i ytterskärgården från Sandhamn och söderut på våren och sommaren, och Grönskär nämns som en plats att prova.' },
    ],
    // KÄLLA: https://www.ksss.se/hamnar/sandhamn — gästhamnen "framför Seglarhotellet" (läst 2026-09-27); https://sandhamns-vardshus.se/boende — "Missionshuset är öppet året runt för bokning", "mitt i Sandhamns by" (läst 2026-09-27); https://sandshotell.se/ — "terrasser med utsikt över hamninloppet" (läst 2026-09-27)
    accommodationIntro: 'På Sandhamn finns Seglarhotellet med spa och restaurang vid gästhamnen, Sandhamns Värdshus B&B i Missionshuset mitt i byn och lägenhetshotellet Sands Hotell vid hamninloppet.',
    accommodation: [
      // KÄLLA: https://www.sandhamn.com/ — "Hit kommer människor för att vila, fira, mötas och njuta av skärgården – året runt", "Frukost ingår, och som hotellgäst har du fri tillgång till spa och gym under hela vistelsen" (läst 2026-09-27)
      { name: 'Sandhamn Seglarhotell', type: 'Hotell', desc: 'Hotell vid hamnen med spa, restaurang, gym och pool. Öppet året runt. Frukost ingår, och hotellgäster har fri tillgång till spa och gym.', websiteUrl: 'https://www.sandhamn.com' },
      // KÄLLA: https://sandhamns-vardshus.se/boende — "På Missionshuset finns det 5 dubbelrum med gemensamma badrum", "På gården finns en stuga med eget badrum som vi kallar för Friggan. Här får man ha hund.", "I alla våra priser ingår frukost, lakan och handdukar", "Missionshuset är öppet året runt för bokning" (läst 2026-09-27)
      { name: 'Sandhamns Värdshus', type: 'B&B', desc: 'B&B i Missionshuset, bokningsbart året runt: fem dubbelrum med gemensamma badrum och en stuga med eget badrum där hund är tillåten. Frukost, lakan och handdukar ingår.', websiteUrl: 'https://sandhamns-vardshus.se' },
      // KÄLLA: https://sandshotell.se/ — "Sands Hotell erbjuder boende i lägenheter och rum", "Hotellet har 15 dubbelrum, 3 enkelrum så totalt 33 bäddar, relaxavdelning med bastu" (läst 2026-09-27)
      { name: 'Sands Hotell', type: 'Hotell', desc: 'Lägenhetshotell med hotellservice vid hamninloppet, 15 dubbelrum och 3 enkelrum, totalt 33 bäddar, och relaxavdelning med bastu.', websiteUrl: 'https://sandshotell.se' },
    ],
    getting_there: [
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h16.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "STAVSNÄS – SANDHAMN – HAGEDE": Stavsnäs 20.12 → Sandhamn 20.50 (38 min), 09.45 → 10.45 (60 min), 07.00 → 08.05 (65 min) (läst 2026-09-27)
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/sandhamn — "och då tar resan drygt en timme", "Det går flera turer varje dag till Sandhamn", "tabell 16" (läst 2026-09-27); https://www.sandhamn.com/en/hitta-hit — "Year round — including winter", "Take bus 433 from Slussen or drive to Stavsnäs Vinterhamn" (läst 2026-09-27); https://kund.printhuset-sthlm.se/sl/h433.pdf — "Stavsnäs vinterhamn", Slussen 10.15 → Stavsnäs vinterhamn 11.06 (läst 2026-09-27)
      { method: 'Waxholmsbåt från Stavsnäs', from: 'Stavsnäs vinterhamn', time: '40–65 min', desc: 'Året runt med Waxholmsbolagets linje 16, flera turer om dagen. Till Stavsnäs tar du SL-buss 433 från Slussen, ungefär en timme, eller bil.', icon: '⛴' },
      // KÄLLA: Stavsnäs Båttaxi, Sandhamnslinjen, https://battaxi.se/sandhamnslinjen-2/ — "Sandhamnslinjen är en direkt reguljär tur som tar dig mellan Stavsnäs och Sandhamn på endast 30 minuter"; "Bokade biljetter har alltid förtur, men det går även bra att köpa biljett direkt på båten"; hösttidtabeller 17/8–20/9 och 21/9–20/12 2026 (läst 2026-09-21)
      { method: 'Sandhamnslinjen (Stavsnäs Båttaxi)', from: 'Stavsnäs', time: '30 min', desc: 'Snabbast. Direktbåt från Stavsnäs, egen biljett – förbokade resenärer har förtur, men du kan också köpa ombord.', icon: '🚤', url: 'https://battaxi.se/sandhamnslinjen-2/' },
      // KÄLLA: Strömma, Cinderellabåtarna Stockholm–Sandhamn 2026, https://www.stromma.com/globalassets/sweden/stockholm/product_timetables/02_excursions/cinderella/2026/cinderella_stockholm_sandhamn_2026.pdf — "30/4 - 4/6", "7/9 - 27/9", "Strandvägen - kajplats 14" 10:00 → Sandhamn 12:30 (läst 2026-09-27)
      // KÄLLA: Waxholmsbolaget linje 15, https://kund.printhuset-sthlm.se/wa/s15.pdf — "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026"; Strömkajen 10.00 → Sandhamn 13.45, 08.30 → 13.25 (läst 2026-09-27). Seglarhotellets uppgift om 2–3 timmar för linje 15 stämmer inte med tidtabellen och används inte.
      { method: 'Cinderellabåten från Strandvägen', from: 'Strandvägen kajplats 14, Stockholm', time: '2 h 30 min', desc: 'Strömmas sommarbåt via Vaxholm och Grinda, 30 april–27 september (helger mot slutet av säsongen).', icon: '⛴', url: 'https://www.stromma.com/en-se/stockholm/cinderella-boats/timetables/' },
      { method: 'Waxholmsbåt från Strömkajen', from: 'Strömkajen, Stockholm', time: '3 h 45 min–4 h 55 min', desc: 'Linje 15, bara 19 juni–16 augusti. Lång resa rakt ut genom skärgården.', icon: '⛴' },
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Gästhamnen i Sandhamn – se hamnavsnittet för service och bokning.', icon: '⛵' },
    ],
    harbors: [
      // KÄLLA: https://www.ksss.se/hamnar/sandhamn — "Det finns ca 150 gästplatser på Sandhamn", "Gästhamnen har 20 st bokningsbara platser", "Hamnen är öppen från sista helgen i april till sista helgen i oktober" (läst 2026-09-27); https://www.ksss.se/hamnar/sandhamn/aktuellt — "Vatten på bryggorna och servicehusen med dusch, toalett och tvättstuga är endast öppna maj till september", "You can find power on pier B and C" (läst 2026-09-27). Bränsle nämns inte av KSSS.
      { name: 'KSSS Sandhamn', desc: 'KSSS gästhamn framför Seglarhotellet, ca 150 platser, öppen sista helgen i april till sista helgen i oktober. 20 bokningsbara platser via Dockspot. Vatten och servicehus maj–september, el på brygga B och C.', fuel: false, service: ['el', 'vatten', 'dusch', 'tvätt'] },
    ],
    restaurants: [
      // KÄLLA: https://www.sandhamn.com/sv/restauranger-och-barer/segelsalen — "Vi serverar en särskilt framtagen meny med fokus på säsongens råvaror", "Boka gärna bord i förväg" (läst 2026-09-27)
      { name: 'Segelsalen, Sandhamn Seglarhotell', type: 'Restaurang', desc: 'Seglarhotellets matsal med säsongsmeny. Boka gärna bord i förväg.', websiteUrl: 'https://www.sandhamn.com/sv/restauranger-och-barer/segelsalen' },
      // KÄLLA: https://sandhamns-vardshus.se/ — "Sandhamns Värdshus anno 1672", "Puben Här är hjärtat på Värdshuset! Öppet året runt.", "Restaurangen Med en magisk utsikt över hamnen" (läst 2026-09-27)
      { name: 'Sandhamns Värdshus', type: 'Restaurang', desc: 'Värdshus anno 1672 med pub öppen året runt och restaurang med utsikt över hamnen.', websiteUrl: 'https://sandhamns-vardshus.se' },
      // Sands Bistro är struken: sandshotell.se nämner ingen bistro för allmänheten 2026, och namnet kom från bokningssajter (förbjudna källor).
      // KÄLLA: https://www.dykarbaren.se/ — "DYKARBAREN SANDHAMN", "Vi erbjuder endast bordsbokning inomhus då vår uteservering inte helt går att vädersäkra", "Öppet 2026 säsong maj – september" (läst 2026-09-27)
      { name: 'Dykarbaren', type: 'Bar', desc: 'Bar och restaurang i Sandhamn med inne- och uteservering. Säsong maj–september.', websiteUrl: 'https://dykarbaren.se' },
      // KÄLLA: https://www.sandhamnsbageriet.com/ — "Vetesurdegsbröd", "Kanelbulle, Kardemummabulle, Seglarbulle", "TÅRTOR", "Ost & Skinkmacka", "SISTA HELGEN -26" (läst 2026-09-27)
      { name: 'Sandhamnsbageriet', type: 'Bageri', desc: 'Bageri i Sandhamn med surdegsbröd, bullar, tårtor och smörgåsar. Säsongsöppet.', websiteUrl: 'https://www.sandhamnsbageriet.com' },
    ],
    tips: [
      // KÄLLA: https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/trouvillesandhamn.4.18c983316e0536cb189a2d4.html, Trouville Sandhamn — "Trouville ligger omkring 20 minuters promenad från hamnen." / "Toaletter sommartid"
      'Trouville ligger omkring 20 minuters promenad från hamnen — räkna med gångtiden när du planerar badet.',
      // KÄLLA: https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/trouvillesandhamn.4.18c983316e0536cb189a2d4.html, Trouville Sandhamn — "Ingen provtagning av badvatten utförs av Värmdö kommun."
      'Värmdö kommun tar inga badvattenprover vid Trouville.',
      // KÄLLA: https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/flaskberget.4.18c983316e0536cb189a2c1.html — "Ett fint klippbad alldeles vid Sandhamns by. Badet fick sitt namn efter en skuta lastad med fläsk gick på grund och sjönk där för länge sedan." (läst 2026-09-27)
      'Vill du hellre bada från klippor ligger Fläskberget alldeles vid Sandhamns by. Badet har fått sitt namn efter en skuta lastad med fläsk som gick på grund och sjönk där.',
      // KÄLLA: https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/sparochleder.4.18c983316e0536cb189a419.html, Spår och leder — "Den cirka 8 km stigen går runt hela Sandön. Stigen utgår från Sandhamn, passerar sandstranden Trouville"
      'Sandhamnsstigen är cirka 8 km och går runt hela Sandön — den utgår från Sandhamn och passerar Trouville, så badet kan läggas in mitt i rundan.',
      // KÄLLA: https://www.naturkartan.se/sv/stockholms-lan/sandon-2 (Värmdö kommun) — natur- och miljöstig 2,5 km samt slingor på 3,5 km och 5,5 km
      'Orkar du inte hela varvet finns kortare slingor: natur- och miljöstigen på 2,5 km samt 3,5 och 5,5 km.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/gronskar.html, naturreservat Grönskär — föreskrifterna förbjuder bland annat lösa hundar och tältning utan tillstånd; "Ibland finns det en fin utställning i fotogenboden."
      'Åker du vidare till Grönskär: reservatet förbjuder lösa hundar och tältning utan tillstånd, och ibland finns en utställning i fotogenboden.',
    ],
    related: ['moja', 'grinda', 'finnhamn'],
    tags: ['segling', 'gästhamn', 'restauranger', 'sandstrand', 'sommarfest'],
    // KÄLLA: https://stockholmslansmuseum.se/besoksmal/sandhamn/ — "Det pampiga gula tullhuset av sten som dominerar hamnen ritades av slottsarkitekten Carl Hårleman och byggdes 1752."
    // KÄLLA: https://ksss.se/en/gotlandrunt/ — "since 2024 it starts at Gråskärsfjärden south of Sandön"
    did_you_know: 'Det gula tullhuset i hamnen ritades av slottsarkitekten Carl Hårleman och byggdes 1752. Gotland Runt startar sedan 2024 från Gråskärsfjärden söder om Sandön — men målgången ligger kvar i Sandhamn.',
    transport_meta: {
      // KÄLLA: https://www.sandhamn.com/en/hitta-hit — "Total travel time from Stockholm: approx. 1.5 hours" via buss 433 och båt från Stavsnäs (läst 2026-09-27); https://kund.printhuset-sthlm.se/sl/h433.pdf Slussen 10.15 → Stavsnäs vinterhamn 11.06 och https://battaxi.se/sandhamnslinjen-2/ "på endast 30 minuter" ger samma storleksordning (läst 2026-09-27)
      from_city_min: 90,
      // KÄLLA: https://battaxi.se/sandhamnslinjen-2/ — Sandhamnslinjen Stavsnäs–Sandhamn 30 minuter
      from_nearest_hub_min: 30,
      nearest_hub: 'Stavsnäs',
      operator: 'Waxholmsbolaget',
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h16.pdf — "STAVSNÄS – SANDHAMN – HAGEDE" (året runt, tabellen gäller till 12 december 2026) (läst 2026-09-27); https://kund.printhuset-sthlm.se/wa/s15.pdf — "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026" (linje 15 Strömkajen–Sandhamn) (läst 2026-09-27); https://www.sandhamn.com/en/hitta-hit — "Departures run several times daily" (läst 2026-09-27). Sandhamnslinjen Stavsnäs–Sandhamn drivs av Stavsnäs Båttaxi, inte Waxholmsbolaget.
      line: '16 (året runt), 15 (sommar)',
      frequency: 'Flera turer om dagen från Stavsnäs året runt',
      booking_url: 'https://waxholmsbolaget.se',
      // KÄLLA: https://www.varmdo.se/varmdohamnar/parkera.4.6e5e3cc318a8d4dc3f6361bf.html — "Ska du parkera max 3 timmar så är det gratis om du använder p-skiva", "Du betalar din besöksparkering med app", "Parkit Sweden AB ansvarar", "I Stavsnäs vinterhamn finns cirka 1300 parkeringsplatser. Cirka hälften är till för besökare" (läst 2026-09-27)
      car_parking: 'Parkering vid Stavsnäs vinterhamn: 3 timmar fritt med p-skiva, därefter avgift som betalas i app (operatör Parkit). Cirka 1 300 platser, varav omkring hälften för besökare.',
    },
    activity_meta: {
      // KÄLLA: https://stockholmarchipelagotrail.com/section/section-sandhamn/ — "Section Sandhamn", "Easy 8.1 km" (ledens egen webbplats) (läst 2026-09-27)
      vandring: { trails: 1, max_km: 8.1, sat: { km: 8.1, difficulty: 'Lätt' } },
      bad: {
        beaches: [
          {
            name: 'Trouville-stranden',
            type: 'sandstrand',
            // KÄLLA: https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/trouvillesandhamn.4.18c983316e0536cb189a2d4.html — "Den långsträckta stranden i Trouville, med sin vita sand, ligger på Sandhamns södra sida", "omkring 20 minuters promenad från hamnen", "Toaletter sommartid", "Badet ägs och sköts av Eknö hemman", "Ingen provtagning av badvatten utförs av Värmdö kommun". Stod "ca 10 min", barnvänligt djup, vind och namnets ursprung utan källa.
            desc: 'Lång strand med vit sand på Sandhamns södra sida. Toaletter finns sommartid. Badet ägs och sköts av Eknö hemman, och Värmdö kommun tar inga badvattenprover här.',
            directions: 'Omkring 20 minuters promenad från hamnen.',
          },
          // KÄLLA: https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/flaskberget.4.18c983316e0536cb189a2c1.html — "Ett fint klippbad alldeles vid Sandhamns by", "Badet fick sitt namn efter en skuta lastad med fläsk gick på grund och sjönk där för länge sedan", "Toaletter sommartid", "Badet ägs och sköts av Eknö hemman", "Ingen provtagning av badvatten utförs av Värmdö kommun" (läst 2026-09-27)
          {
            name: 'Fläskberget',
            type: 'klippbad',
            desc: 'Klippbad alldeles vid Sandhamns by, uppkallat efter en skuta lastad med fläsk som gick på grund och sjönk där. Toaletter sommartid; badet ägs och sköts av Eknö hemman och kommunen tar inga badvattenprover.',
          },
        ],
      },
      fiske: true,
    },
    // KÄLLA: https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/trouvillesandhamn.4.18c983316e0536cb189a2d4.html ("Toaletter sommartid"), https://www.ksss.se/hamnar/sandhamn/aktuellt ("servicehusen med dusch, toalett och tvättstuga"), https://www.sandhamnsbageriet.com/ (kafé/bageri), https://www.tempo.se/butiker/tempo-sandhamn-westerberg/ — "TEMPO SANDHAMN WESTERBERG", "SANDHAMNS BRYGGA" (läst 2026-09-27). atm: ingen källa hittad åt något håll.
    amenities: { toilets: true, shower: true, cafe: true, grocery: true, atm: false },
    dog_friendly: true,
    // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/hundar-i-naturen/ — "Mellan 1 mars och 20 augusti måste du ha extra uppsikt över din hund i naturen. Under den tiden får hunden inte springa lös.", "Ha alltid koppel på hunden när ni vistas i nationalparker eller naturreservat" (läst 2026-09-27); https://sandhamns-vardshus.se/boende — "Här får man ha hund" (stugan Friggan) (läst 2026-09-27)
    dog_notes: 'Mellan 1 mars och 20 augusti får hunden inte springa lös i naturen, och i naturreservat som Grönskär råder Naturvårdsverket att alltid ha hunden kopplad. Sandhamns Värdshus har en stuga där hund är tillåten.',
    insiderTips: [
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/s15.pdf — "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026": Strömkajen 10.00 → Sandhamn 13.45, 08.30 → 13.25 (läst 2026-09-27); https://kund.printhuset-sthlm.se/wa/h16.pdf — Stavsnäs–Sandhamn 38–65 min (läst 2026-09-27); https://battaxi.se/sandhamnslinjen-2/ — "på endast 30 minuter" (läst 2026-09-27)
      'Waxholmsbåten från Strömkajen (linje 15) går bara 19 juni–16 augusti och tar 3 h 45 min–4 h 55 min. Året runt går båtarna från Stavsnäs: 40–65 minuter med Waxholmsbolaget eller 30 minuter med Sandhamnslinjen.',
      // KÄLLA: https://www.naturkartan.se/sv/stockholms-lan/sandon-2 (text från Värmdö kommun) — "trädklädda sanddynor", "måste du åka till Gotska Sandön eller Fårö" (läst 2026-09-27)
      'Sandön består till stor del av trädklädda sanddyner. Enligt Värmdö kommun finns motsvarigheten i den här delen av landet bara på Gotska Sandön och Fårö.',
      // KÄLLA: https://ksss.se/KSSS/historia/ (fullständigt namn "Kungl. Svenska Segel Sällskapet"); ksss.se/en/gotlandrunt/ (start sedan 2024 vid Gråskärsfjärden, mål i Sandhamn)
      'KSSS (Kungliga Svenska Segel Sällskapet) har gästhamn på Sandhamn och på Lökholmen, och Gotland Runt Offshore Race har målgång i Sandhamn.',
      // KÄLLA: https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/sparochleder.4.18c983316e0536cb189a419.html — "Den cirka 8 km stigen går runt hela Sandön. Stigen utgår från Sandhamn" (läst 2026-09-27); https://stockholmslansmuseum.se/besoksmal/sandhamn/ — "Under slutet av 1600-talet upprättades en lotsstation" (läst 2026-09-27); https://www.varmdo.se/varmdohamnar/sandhamn — "Sjöfartsverkets lotsverksamhet" (läst 2026-09-27)
      'Sandhamnsstigen runt hela Sandön är omkring 8 kilometer och börjar i byn.',
      'En lotsstation upprättades på Sandhamn i slutet av 1600-talet, och Sjöfartsverkets lotsverksamhet finns kvar vid inloppet i dag.',
    ],
    blogLinks: [
      { slug: 'basta-restaurangerna-sandhamn', title: 'Restauranger på Sandhamn – lunch, middag, kafé och bar' },
      { slug: 'gasthamnar-guide', title: 'Gästhamnar i Stockholms skärgård – platser, service och bokning' },
      { slug: 'segling-nyborjare-guide', title: 'Börja segla – så lär du dig segla i skärgården' },
    ],
    // KÄLLA: https://www.sandhamn.com/en/hitta-hit ("Year round — including winter"), https://sandhamns-vardshus.se/ ("Öppet året runt", "Öppet varje dag från mitten av juni till mitten på september. Annan tid på året är restaurangen främst öppen helger"), https://www.sandhamn.com/ ("året runt"), https://www.dykarbaren.se/ ("Öppet 2026 säsong maj – september"), https://www.ksss.se/hamnar/sandhamn/aktuellt ("servicehusen med dusch, toalett och tvättstuga är endast öppna maj till september") (läst 2026-09-27). Cinderella 30/4–27/9 2026 enligt Strömmas tidtabell (se getting_there).
    // Månaderna följer källorna: öppet året runt men begränsat oktober–april, fullt öppet mitten av juni–mitten av september.
    seasonal: {
      open: 'Året runt – båt från Stavsnäs, värdshusets pub och Seglarhotellet',
      peak: 'Mitten av juni–mitten av september',
      best: 'Mitten av juni–mitten av september',
      bestReason: 'Då har Sandhamns Värdshus restaurang öppet varje dag, och Dykarbaren (maj–september) och KSSS servicehus (maj–september) är öppna.',
      warning: 'Oktober–april har värdshusets restaurang främst öppet helger, och Cinderellabåtarna från Strandvägen går bara 30 april–27 september.',
      months: ['limited','limited','limited','limited','open','peak','peak','peak','open','limited','limited','limited'],
    },
  },
  // ─── UTÖ ─────────────────────────────────────────────────────
  {
    slug: 'uto',
    name: 'Utö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🚲',
    // KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ — "I den historiska Gruvbyn finns spår av järnbrytning som påbörjades redan under medeltiden", "Cykla längs grusvägarna", "Ålö Storsand, som nås med båt eller via vandringsled, räknas som en av Stockholms skärgårds mest omtyckta sandstränder" (läst 2026-09-27)
    tagline: 'Järngruvor sedan medeltiden, grusvägar att cykla och sandstrand vid Ålö Storsand.',
    seoTitle: 'Utö 2026 – cykling, gruvhistoria & Utö Värdshus',
    // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "Pendeltåg till Västerhaninge. Buss till Årsta brygga. Waxholmsbåt året om till Gruvbryggan." (läst 2026-09-27)
    // KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ — "som har öppet året runt, erbjuder både restaurang, hotell och konferens", "Norra delen av Utö är ett naturreservat" (läst 2026-09-27)
    seoDescription: 'Guide till Utö: grusvägar att cykla, gruvhistoria och Utö Värdshus. Pendeltåg till Västerhaninge, buss till Årsta brygga och båt året om. Naturreservat i södra skärgården.',
    description: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "Här finns också Utö gruvor från järnmalmsbrytningen som funnits till och från under 700 år med början redan under 1100-talet." (läst 2026-09-19)
      // KÄLLA: https://www.kulturarvstockholm.se/industrihistoria/artiklar-om-industrihistoria/uto-gruvor/, Utö gruvor — "År 1879 upphörde slutligen gruvdriften helt"
      'Utö präglas av järnet. Järnmalmsbrytning har funnits här till och från under 700 år, med början redan under 1100-talet, och 1879 upphörde gruvdriften slutligen helt. Spåren efter arbetet finns kvar i landskapet: schakt, varphögar och den gamla gruvbyn.',
      // KÄLLA: https://www.kulturarvstockholm.se/industrihistoria/artiklar-om-industrihistoria/uto-gruvor/, Utö gruvor — "måhända Sveriges äldsta järngruvor, upptagna redan under tidig medeltid" / "Sommaren 1719 härjade tsar Peter I:s flotta stora delar av den svenska ostkusten och totalförstörde utögruvorna"
      'Gruvorna beskrivs som måhända Sveriges äldsta järngruvor, upptagna redan under tidig medeltid. Driften var inte obruten. Sommaren 1719 härjade tsar Peter I:s flotta stora delar av den svenska ostkusten och totalförstörde utögruvorna, och verksamheten fick byggas upp på nytt.',
      // KÄLLA: https://www.kulturarvstockholm.se/industrihistoria/artiklar-om-industrihistoria/uto-gruvor/, Utö gruvor — "under 1840-talet uppnådde befolkningstalet sitt maximum, 446 personer"
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/sevardheter/hembygdsmuseer/ — "Utö gruvmuseum", "Museet ligger alldeles intill gruvschakten och berättar historien om Utös gruvor." (läst 2026-09-27)
      'Gruvsamhället var som störst under 1840-talet, då befolkningstalet nådde sitt maximum på 446 personer. Det är ett annat perspektiv på skärgårdsliv än fiskebyar och seglarhamnar: industriellt arbete i en ömiljö. Utö gruvmuseum, alldeles intill gruvschakten, berättar den historien.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ — "I den historiska Gruvbyn finns spår av järnbrytning som påbörjades redan under medeltiden." / "Sveriges äldsta bevarade väderkvarn"
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "De små enkla trähusen längs med Lurgatan är de mest välbevarade i Gruvbyn." (läst 2026-09-27)
      'I den historiska Gruvbyn finns spår av järnbrytningen, och här står också Sveriges äldsta bevarade väderkvarn. De små trähusen längs Lurgatan är enligt Länsstyrelsen de mest välbevarade i byn.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ — "Ålö Storsand, som nås med båt eller via vandringsled, räknas som en av Stockholms skärgårds mest omtyckta sandstränder."
      // KÄLLA: https://stockholmarchipelagotrail.com/section/uto-alo-connector-2/ — "A gravel road takes you through an active military firing range that connects the trail sections on Utö and Ålö.", "The distance is 4.6 km along the gravel road", "It takes about 90 minutes to walk between the sections.", "Never leave the gravel road until you reach the next section." (läst 2026-09-27)
      'Ålö Storsand, som nås med båt eller via vandringsled, räknas av Skärgårdsstiftelsen som en av Stockholms skärgårds mest omtyckta sandstränder. Till fots går Stockholm Archipelago Trails anslutningsled från Utö längs en grusväg genom ett aktivt militärt skjutfält till Ålö: 4,6 km, ungefär 90 minuters promenad, och man ska hålla sig på grusvägen hela vägen.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ — "Utö är en riktig cykel-ö med möjlighet att hyra dagsvis"
      // KÄLLA: https://www.utogasthamn.se/uto-cykeluthyrning/ — "I Cykelboden har vi över 300 cyklar från Skeppshult", "Cykelhyran gäller per dag, inte 24 timmar." (läst 2026-09-27)
      'Utö är en riktig cykel-ö med möjlighet att hyra cykel dagsvis. I Cykelboden vid gästhamnen finns över 300 cyklar i olika storlekar, och hyran gäller per dag, inte per 24 timmar.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html, naturreservat Utö — "Reservatet utgör norra delen av Utö samt ett antal öar i omgivande vatten" (skyddat 1974, 4 183 hektar varav 653 land; markägare och förvaltare Skärgårdsstiftelsen)
      'Norra delen av Utö är naturreservat tillsammans med ett antal öar i omgivande vatten. Reservatet är skyddat sedan 1974 och omfattar 4 183 hektar, varav 653 hektar land. Skärgårdsstiftelsen är både markägare och förvaltare.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "Kroka är inte bara intressant för alla växter utan är också en fin plats för många fågelarter, särskilt vid västliga och nordvästliga vindar under hösten, då flyttande rov- och småfågel blåser dit.", "Norra Utö är också känd för sina många fjärilar.", "Under högsommaren flyger den stora fridlysta apollofjärilen över hällmarkerna norr om Tremaskogen." (läst 2026-09-27)
      'Kroka nära Utös nordligaste udde är en fin plats för fågelskådning, särskilt vid västliga och nordvästliga vindar under hösten, då flyttande rov- och småfågel blåser dit. Norra Utö är också känt för sina många fjärilar: under högsommaren flyger den fridlysta apollofjärilen över hällmarkerna norr om Tremaskogen.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "här kan man hitta guldglänsande svavelkis, blå turmalin och röda granater. Tänk dock på att låta stenarna ligga kvar!" (läst 2026-09-27)
      'I varphögarna efter gruvdriften går det fortfarande att hitta mineral: guldglänsande svavelkis, blå turmalin och röda granater. Länsstyrelsen ber samtidigt besökare att titta men låta stenarna ligga kvar i reservatet.',
      // KÄLLA: https://www.utovardshus.se/kontakt/hitta-hit/ — "Waxholmsbåtar trafikerar linjen Utö – Årsta Brygga dagligen" / "Båt utgår även från Nynäshamn till grannön Ålö som har broförbindelse till Utö"
      // KÄLLA: https://kund.printhuset-sthlm.se/sl/v846.pdf — "Västerhaninge station–Årsta (–Årsta slott)", "Tidtabellen är anpassad till pendeltåg från Stockholm vid", "Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026"; Västerhaninge station–Årsta brygga 14–17 min enligt tabellen (läst 2026-09-27)
      // KÄLLA: https://www.utogasthamn.se/hitta-hit/ — "Under sommarmånaderna går det att ta sig till Utö med färja från Strömkajen i centrala Stockholm." (läst 2026-09-27)
      'Waxholmsbåtar trafikerar linjen Utö–Årsta brygga dagligen. Årsta brygga nås med pendeltåg till Västerhaninge och därifrån buss 846, som är anpassad till pendeltågen och tar 14–17 minuter till bryggan. Under sommarmånaderna går det även båt från Strömkajen i Stockholm, och från Nynäshamn går båt till grannön Ålö, som har broförbindelse till Utö.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "inom hela reservatet med undantag av Persholmen medföra hund som ej är kopplad. För Persholmen skall hund vara kopplad under tiden 1 mars - 20 augusti och under övrig tid hållas under uppsikt", "tälta eller ställa upp husvagn annat än på anvisad plats", "för längre tid än två dygn förtöja eller förankra båt vid samma strand", "göra upp eld annat än på härför iordningställda och anvisade platser", "Tillträdesförbud på Utö skjutfält vissa tider." (läst 2026-09-27)
      'Reservatsföreskrifterna styr mer än man tror. Hund ska hållas kopplad, med undantag för Persholmen utanför perioden 1 mars till 20 augusti. Tältning är bara tillåten på anvisade platser, eldning bara på iordningställda, och en båt får förtöjas högst två dygn vid samma strand. Söder om reservatet ligger skjutfältet, där det vissa tider är tillträdesförbud.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "Kalkstråken finns främst i ett band på öns norra del och här växer många kalkälskare som Adam och Eva, mandelblom och grusbräcka. Vid Kroka nära Utös nordligaste udde blommar de mest." (läst 2026-09-27)
      'Berggrunden gör Utö botaniskt intressant. Ett band av urkalksten går genom öns norra del, och där kalken påverkar marken växer arter som Adam och Eva, mandelblom och grusbräcka. Mest blommar det vid Kroka, nära Utös nordligaste udde.',
      // KÄLLA: https://skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/ — "Utö kvarn är byggd 1791 och har under lång tid varit både symbol och sjömärke för Utö." / "2001 blev de nio gruvarbetarbostäderna tillsammans med kvarnen byggnadsminne enligt Kulturmiljölagen." / kvarnen restaurerades 1982
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html, naturreservat Utö — trähusen längs Lurgatan; "väderkvarnen som uppfördes 1791"
      'Väderkvarnen är byggd 1791 och har under lång tid varit både symbol och sjömärke för Utö. Den restaurerades 1982, och 2001 blev de nio gruvarbetarbostäderna längs Lurgatan tillsammans med kvarnen byggnadsminne enligt kulturmiljölagen. Lurgatan är alltså inte en kuliss utan lagskyddad arbetarbebyggelse.',
      // KÄLLA: https://www.svenskakyrkan.se/haninge/om-uto-kyrka — kyrkan "uppfördes mellan år 1848 och 1850", byggd av "sten som bröts direkt ur gruvorna"; Utö Gruvbolag betalade 5 000 riksdaler banco och ställde tomten, församlingen bidrog med 11 000 riksdaler banco och dagsverken; "Utö kyrka är skärgårdens största stenkyrka."
      'Utö kyrka uppfördes mellan 1848 och 1850 av sten som bröts direkt ur gruvorna. Utö Gruvbolag betalade 5 000 riksdaler banco och ställde tomten, medan församlingen bidrog med 11 000 riksdaler banco och dagsverken. Svenska kyrkan beskriver den som skärgårdens största stenkyrka — ovanligt monumental för en ö av den här storleken, och en direkt följd av att här fanns en industri som kunde betala.',
      // KÄLLA: https://www.svenskakyrkan.se/haninge/om-uto-kyrka — "Den pampiga orgeln är från 1745 och har ursprungligen stått i Holländska reformerta kyrkan i Stockholm."; ett äldre träkapell revs 1698, ett nytt uppfördes 1699 som "Helga Trefaldighets tempel", skadades av ryssarna 1719, reparerades 1727 och revs 1874
      'Orgeln är äldre än kyrkan. Den är från 1745 och har ursprungligen stått i Holländska reformerta kyrkan i Stockholm. Före stenkyrkan fanns ett träkapell som revs 1698 och ett nytt som uppfördes 1699 under namnet Helga Trefaldighets tempel; det skadades av ryssarna 1719, reparerades 1727 och revs först 1874.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/alo-rano.html, naturreservat Ålö-Rånö — skyddat sedan 2008, 2 829 hektar varav land 1 063 hektar, Haninge kommun, Skärgårdsstiftelsen markägare och förvaltare, Natura 2000-områdena SE0110017 Ålö och SE0110118 Rånö Ängsholm; naturtyper "skärgård, marina miljöer, barrskog, odlingslandskap", främst hällmarkstallskogar med kalkpåverkad berggrund; "Storsand på Ålö anses vara en av Stockholms skärgårds finaste sandstränder."; Ålö har broförbindelse med Utö
      'Ålö är inte bara en bro bort utan ett eget naturreservat. Ålö-Rånö är skyddat sedan 2008 och omfattar 2 829 hektar, varav 1 063 hektar land, med Skärgårdsstiftelsen som markägare och förvaltare och med två Natura 2000-områden inom sig. Naturen är skärgård, marina miljöer, barrskog och odlingslandskap, och de dominerande hällmarkstallskogarna står på kalkpåverkad berggrund som ger en artrik flora. Länsstyrelsen skriver att Storsand på Ålö anses vara en av Stockholms skärgårds finaste sandstränder.',
      // KÄLLA: https://skargardsstiftelsen.se/om-skargardsstiftelsen/var-historia/ — 1973: "Hela norra Utö med gruvbyn köps från Ställbergsbolaget"
      'Att norra Utö är reservat i dag har en konkret förhistoria. 1973 köpte Skärgårdsstiftelsen hela norra Utö med gruvbyn från Ställbergsbolaget, och året därpå fick området sitt reservatsskydd. Ön gick alltså direkt från gruvbolag till naturvårdsförvaltning, utan mellanled.',
      // KÄLLA: https://utoskola.haninge.se/ — "Elever 22", "Årskurs 1–9", "Personal 7"
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-uto-sv/ — "Det är en ö med ungefär 250 bofasta och med nära 70000 besökare per år." (läst 2026-09-27)
      'Utö har en egen grundskola hela vägen upp. Utö skola har årskurs 1–9 med 22 elever och 7 anställda. Enligt Stockholm Archipelago Trail har ön ungefär 250 bofasta och nära 70 000 besökare per år.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ — "Rävstavik och Barnens bad erbjuder långgrunda sandstränder som passar barnfamiljer", "Milslånga grusvägar och stigar" — sidan skriver "Här finns milslånga grusvägar och stigar" (läst 2026-09-27)
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "En fin strand finns också vid Barnens bad strax norr om Gruvbyn." (läst 2026-09-27)
      'Alla bad kräver inte en vandring. Vid sidan av Ålö Storsand pekar Skärgårdsstiftelsen ut Rävstavik och Barnens bad, och grusvägarna och stigarna som binder ihop ön beskrivs som milslånga. Barnens bad ligger strax norr om Gruvbyn.',
    ],
    facts: {
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h21.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "21A ÅRSTA – UTÖ", "minst 1 timme innan avgång"; Årsta brygga–Gruvbryggan 40 min på de flesta turer (t.ex. 11.00–11.40), 55–75 min när båten går via Spränga först, kortast 35 min (20.35–21.10) (läst 2026-09-27)
      // KÄLLA: https://kund.printhuset-sthlm.se/sl/v846.pdf — "Västerhaninge station–Årsta (–Årsta slott)"; Västerhaninge station–Årsta brygga 14–17 min (läst 2026-09-27)
      travel_time: 'Buss 846 till Årsta brygga (14–17 min) + båt 35–75 min, oftast 40 min (tabell 21, 2026; vissa turer förbokas minst 1 tim före avgång)',
      character: 'Cykel-ö med gruvby och naturreservat',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ (läst 2026-09-26) — "Utö Värdshus, som har öppet året runt, erbjuder både restaurang, hotell och konferens"; "Sommartid sjuder ön av liv med restauranger, caféer, butiker och aktiviteter"; "Skärgårdsstiftelsen flera stugor och hus som hyrs ut veckovis"; lansstyrelsen.se Utö: "Waxholmsbåt året om till Gruvbryggan"
      season: 'Året runt – båt året om och Utö Värdshus öppet året runt; fler ställen öppna sommartid',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ — "Cykla längs grusvägarna, vandra genom skogar och öppna betesmarker eller upptäck öns många badplatser"; https://www.utogasthamn.se/gasthamnen/ — "Hos oss finns dusch, bastu och toaletter." (läst 2026-09-27)
      best_for: 'Cykling, vandring, bad, gruvhistoria',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      // KÄLLA: https://www.utogasthamn.se/uto-cykeluthyrning/ — "I Cykelboden har vi över 300 cyklar från Skeppshult", "Här finns även barnstolar, sulkys och cykelkärror", "Under högsäsong kan du även hyra din cykel på", "Du kan välja att lämna tillbaka din cykel på Utö i Cykelboden eller på Ålö vid restaurangen Båtshaket." (läst 2026-09-27)
      { icon: '🚲', name: 'Cykling', desc: 'Cykelboden vid gästhamnen hyr ut över 300 cyklar samt barnstolar och cykelkärror, per dag. Under högsäsong kan cykel också hyras och lämnas vid Båtshaket på Ålö, dit grusvägen går via bron.' },
      // KÄLLA: https://www.utogasthamn.se/gasthamnen/ — "dusch, bastu och toaletter"
      { icon: '🧖', name: 'Bastu', desc: 'Utö gästhamn har bastu, dusch och toaletter.' },
      // KÄLLA: https://www.kulturarvstockholm.se/industrihistoria/artiklar-om-industrihistoria/uto-gruvor/, Utö gruvor — "under 1840-talet uppnådde befolkningstalet sitt maximum, 446 personer" / "År 1879 upphörde slutligen gruvdriften helt". «16 000 ton/år» och «cirka 500 invånare» saknade källa och motsade 446; strukna.
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/sevardheter/hembygdsmuseer/ — "Utö gruvmuseum", "Museet ligger alldeles intill gruvschakten och berättar historien om Utös gruvor." (läst 2026-09-27)
      { icon: '⛏', name: 'Gruvan & museet', desc: 'Järnmalm bröts på Utö till och från under 700 år, från 1100-talet till 1879. Befolkningen var som störst på 1840-talet, 446 personer. Utö gruvmuseum intill gruvschakten berättar historien.' },
      // KÄLLA: https://www.utogasthamn.se/att-gora/ — "Persholmen som ligger över den lilla bron nere i hamnen har klippbad", "en fin och långgrund sandstrand i en liten vik" (om Barnens bad), "Storsand, som är just en stor sandstrand och ligger på skjutfältets mark några kilometer från Gruvbyn. Glöm bara inte att fråga oss i Hamnboden om skjutfältet är öppet" (läst 2026-09-27)
      { icon: '🏊', name: 'Bad & stränder', desc: 'Ålö Storsand på grannön Ålö nås med båt eller via vandringsled. Närmare Gruvbyn ligger Barnens bad, en långgrund sandstrand, och klippbad på Persholmen och vid Rävstavik. Storsand på södra Utö ligger på skjutfältets mark – fråga i Hamnboden om skjutfältet är öppet.' },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — reservatet omfattar "norra delen av Utö samt ett antal öar i omgivande vatten"; södra delen är militärt övningsområde
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-uto-sv/ — "Etapp Utö är en utmanande etapp som har allt. Denna 18,4 km långa etapp", "Från Gruvbryggan kan du ta dig norrut längs grusvägen. Antingen hela vägen till Kroka eller till Barnens bad." (läst 2026-09-27)
      { icon: '🚶', name: 'Vandring', desc: 'Naturreservat i öns norra del. Stockholm Archipelago Trails etapp Utö är 18,4 km och klassad som utmanande; grusvägen norrut från Gruvbryggan till Kroka eller Barnens bad går även med barnvagn.' },
      // KÄLLA: https://www.lansstyrelsen.se/download/18.1b1d393819324610c374853c/1732515630171/Fiskeguide%20Stockholms%20l%C3%A4n.pdf — "Andra bra ställen är", "Baggensfjärden, Ingarö, Ornö, Utö och Torö", "Fritt handredskapsfiske gäller på enskilt vatten i Mälaren och skärgården" (läst 2026-09-27)
      { icon: '🎣', name: 'Fiske', desc: 'Länsstyrelsens fiskeguide nämner vattnen vid Utö bland platserna för havsöring. I skärgården gäller fritt handredskapsfiske, så med spö behövs inget fiskekort.' },
    ],
    // "Skärgårdens bredaste boendeutbud" var ett obelagt superlativ och togs bort 2026-09-14.
    // KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ (läst 2026-09-26) — "Utö Värdshus, som har öppet året runt, erbjuder både restaurang, hotell och konferens"; "Sommartid sjuder ön av liv med restauranger, caféer, butiker och aktiviteter"; "Skärgårdsstiftelsen flera stugor och hus som hyrs ut veckovis"; lansstyrelsen.se Utö: "Waxholmsbåt året om till Gruvbryggan"
    accommodationIntro: 'Utö har värdshus med hotell och vandrarhem, camping och stugor som Skärgårdsstiftelsen hyr ut veckovis.',
    // KÄLLA: https://www.utovardshus.se/boende/ — "Kvarnvillan är vår nyaste hotellbyggnad med 8 dubbelrum", "Byggnaden är en varsamt renoverad 1700-talsbyggnad med totalt 10 rum", "Våra faluröda hotellstugor ligger i sluttningen ner mot hamnen" (läst 2026-09-27)
    accommodation: [
      { name: 'Utö Värdshus', type: 'Hotell', desc: 'Värdshus med restaurang, hotell och konferens – rum i Kvarnvillan, Stenhotellet och hotellstugor. Öppet året runt.', websiteUrl: 'https://www.utovardshus.se' },
      // KÄLLA: https://www.utovardshus.se/boende/vandrarhemmet/ — "Utö Vandrarhem Skärgården", "Vandrarhemmet är i tre plan och har 73 bäddar" (läst 2026-09-27)
      { name: 'Utö Vandrarhem Skärgården', type: 'Vandrarhem', desc: 'Vandrarhemsdelen av Utö Värdshus, 73 bäddar i tre plan med gemensamma kök. Bokningsbart online.', websiteUrl: 'https://www.utovardshus.se/boende/vandrarhemmet/' },
      // KÄLLA: https://www.utogasthamn.se/camping/ — "Campingen är av så kallad friluftsmodell och har inga numrerade platser", "På campingen finns en servicestuga med toaletter, duschar och ett enklare kök", "Du anmäler dig och betalar i Hamnboden" (läst 2026-09-27)
      { name: 'Utö camping', type: 'Camping', desc: 'Tältcamping av friluftsmodell utan numrerade platser, med servicestuga (toaletter, duschar, enklare kök). Anmälan och betalning i Hamnboden vid Gruvbryggan.', websiteUrl: 'https://www.utogasthamn.se/camping/' },
    ],
    getting_there: [
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h21.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "21A ÅRSTA – UTÖ", "minst 1 timme innan avgång"; Årsta brygga–Gruvbryggan 40 min på de flesta turer, 55–75 min via Spränga, kortast 35 min (läst 2026-09-27)
      // KÄLLA: https://sl.se/biljetter/sortiment-och-regler/biljetter-for-resor-med-waxholmsbolagets-skargardsbatar — "Under lågsäsongen, från 14 september till 29 april, gäller alla SL:s periodbiljetter som har en giltighetstid på 30 dagar eller längre för resor på Waxholmsbolagets båtar." (läst 2026-09-27). Priset 104/64 kr struket: ingen daterad prislista kunde läsas.
      { method: 'Skärgårdsbåt', from: 'Årsta brygga, Haninge', time: '35–75 min', desc: 'Waxholmsbolagets linje 21 från Årsta brygga i Haninge till Gruvbryggan. De flesta turer tar 40 min, turer som går via Spränga först 55–75 min (tabell 21, gäller 17 augusti–12 december 2026). Under lågsäsongen 14 september–29 april gäller SL:s periodbiljetter på 30 dagar eller längre; annars krävs Waxholmsbolaget-biljett.', icon: '⛴' },
      // Raden "Snabbåt 30 min, expresslinje av Waxholmsbolaget" struken 2026-09-21: linje 21 (https://kund.printhuset-sthlm.se/wa/h21.pdf, läst 2026-09-21) har ingen separat expresslinje; snabbaste tur Årsta brygga 20.35 → Gruvbryggan 21.10 = 35 min.
      // KÄLLA: https://kund.printhuset-sthlm.se/sl/v846.pdf — "Västerhaninge station–Årsta (–Årsta slott)"; https://kund.printhuset-sthlm.se/wa/h21.pdf — "Beställ resan i SL-appen, på" … "minst 1 timme innan avgång" (läst 2026-09-27)
      { method: 'Pendel + buss + båt', from: 'Stockholm City', time: 'båt 35–75 min', desc: 'Pendeltåg till Västerhaninge, buss 846 till Årsta brygga (14–17 min) och Waxholmsbåt till Gruvbryggan (35–75 min). På flera turer ska resan beställas minst en timme i förväg i SL-appen, på Waxholmsbolagets webb eller via kundtjänst.', icon: '🚆' },
    ],
    harbors: [
      // KÄLLA: https://www.utogasthamn.se/gasthamnen/ — "plats för ca 300 fritidsbåtar med eluttag … på samtliga platser", "dusch, bastu och toaletter", "tvättstuga att hyra", "fylla på färskvatten", "I den norra hamnen finns sjömacken"
      { name: 'Utö Gästhamn', desc: 'Gästhamn i Gruvbyn med ca 300 platser. El på alla platser, dusch, bastu, tvättstuga och sjömack i norra hamnen.', fuel: true, service: ['el', 'vatten', 'dusch', 'tvätt', 'bränsle'] },
    ],
    restaurants: [
      // KÄLLA: https://www.utovardshus.se/restaurang/uto-vardshus/ — "I det gamla gruvkontoret finns Utö Värdshus bar och matsalar … à la carte både lunch och middag … verandan öppen" på sommaren
      { name: 'Utö Värdshus', type: 'Restaurang', desc: 'Bar och matsalar i det gamla gruvkontoret. À la carte lunch och middag, veranda sommartid.', bookingUrl: 'https://www.utovardshus.se/restaurang/boka-bord-vardshuset/', websiteUrl: 'https://www.utovardshus.se' },
      // KÄLLA: https://www.utovardshus.se/restaurang/seglarbaren/ — "BAREN MITT I HAMNEN", veranda mot hamninloppet, "enklare rätter till lunch … kolgrillade rätter till kvällen"
      { name: 'Seglarbaren', type: 'Bar', desc: 'Utö Värdshus bar mitt i hamnen. Veranda mot hamninloppet, enklare lunch och kolgrillat till kvällen.', websiteUrl: 'https://www.utovardshus.se/restaurang/seglarbaren/' },
      // KÄLLA: https://www.utogasthamn.se/kiosk-cafe/ — "Hamnboden … kiosk, café och restaurang i samma byggnad … glass, godis, korv och toast men även sushi samt en bar"
      { name: 'Hamnboden', type: 'Kiosk/Café', desc: 'Kiosk, café och restaurang i Utö gästhamn: glass, korv, toast, sushi och bar.', websiteUrl: 'https://www.utogasthamn.se/kiosk-cafe/' },
      // KÄLLA: https://www.utovardshus.se/bakfickan/ — "DANSA IN SOMMARNATTEN", "musik, dans och trevligt umgänge", "Bakfickan stänger för säsongen 31 augusti 2026." (läst 2026-09-27)
      { name: 'Bakfickan Utö', type: 'Bar', desc: 'Utö Värdshus dansställe med musik och dans sommarkvällar. Stängde för säsongen 31 augusti 2026.', slug: 'bakfickan-uto' },
    ],
    tips: [
      // KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ — "Utö är en riktig cykel-ö med möjlighet att hyra dagsvis"
      'Utö är en cykel-ö och cykel går att hyra dagsvis — planera dagen kring grusvägarna.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ — "Ålö Storsand, som nås med båt eller via vandringsled"
      'Ålö Storsand nås med båt eller via vandringsled.',
      // KÄLLA: https://www.utovardshus.se/kontakt/hitta-hit/ — "Båt utgår även från Nynäshamn till grannön Ålö som har broförbindelse till Utö"
      'Kommer du från Nynäshamn lägger båten till på Ålö — därifrån går bro över till Utö.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html, naturreservat Utö — hundar kopplade, undantag Persholmen utanför 1 mars–20 augusti
      'Hunden ska vara kopplad i reservatet. Undantaget är Persholmen utanför perioden 1 mars–20 augusti, då hunden i stället ska hållas under uppsikt.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html, naturreservat Utö — tältning endast på anvisade platser, eldning endast på iordningställda platser, båt högst två dygn vid samma strand
      'Tälta bara på anvisade platser och elda bara på iordningställda. Kommer du med egen båt får du ligga högst två dygn vid samma strand.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ — badplatserna Rävstavik och Barnens bad
      'Rävstavik och Barnens bad ligger närmare än Ålö Storsand om ni inte vill ta hela vandringen.',
      // KÄLLA: https://www.svenskakyrkan.se/haninge/om-uto-kyrka — orgeln från 1745, ursprungligen i Holländska reformerta kyrkan i Stockholm
      'Gå in i kyrkan om den är öppen — orgeln är från 1745 och kom hit från Holländska reformerta kyrkan i Stockholm.',
    ],
    related: ['nattaro', 'dalaro', 'orno'],
    tags: ['cykling', 'havsbastu', 'gruva', 'naturreservat', 'familj'],
    // KÄLLA: https://www.kulturarvstockholm.se/industrihistoria/artiklar-om-industrihistoria/uto-gruvor/, Utö gruvor — "under 1840-talet uppnådde befolkningstalet sitt maximum, 446 personer"
    // KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ — "Sveriges äldsta bevarade väderkvarn"
    // KÄLLA: https://www.kulturarvstockholm.se/industrihistoria/artiklar-om-industrihistoria/uto-gruvor/, Utö gruvor — "Sommaren 1719 härjade tsar Peter I:s flotta … och totalförstörde utögruvorna"
    did_you_know: 'Utös befolkning nådde sitt maximum under 1840-talet: 446 personer. I Gruvbyn står Sveriges äldsta bevarade väderkvarn. Gruvdriften var inte obruten: sommaren 1719 totalförstörde tsar Peter I:s flotta anläggningarna.',
    transport_meta: {
      // UPPSKATTNING: from_city_min 120 = pendeltåg Stockholm City–Västerhaninge (ingen 2026-tabell kunde läsas) + buss 846 14–17 min (https://kund.printhuset-sthlm.se/sl/v846.pdf) + byte + båt 35–75 min (https://kund.printhuset-sthlm.se/wa/h21.pdf).
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h21.pdf — "21A ÅRSTA – UTÖ"; de flesta turer Årsta brygga–Gruvbryggan 40 min (t.ex. 11.00–11.40, 15.55–16.35) (läst 2026-09-27). Tidigare 30 min stämde inte med någon tur.
      from_city_min: 120,
      from_nearest_hub_min: 40,
      // KÄLLA: Länsstyrelsen Stockholm, Utö, https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "Pendeltåg till Västerhaninge. Buss till Årsta brygga. Waxholmsbåt året om till Gruvbryggan" (läst 2026-09-21); Waxholmsbolaget linje 21, https://kund.printhuset-sthlm.se/wa/h21.pdf — "21A ÅRSTA – UTÖ". Tidigare stod «Nynäshamn (Årsta brygga)» och pendeltåg till Nynäshamn — Årsta brygga ligger i Haninge och nås via Västerhaninge.
      nearest_hub: 'Årsta brygga (Haninge)',
      operator: 'Waxholmsbolaget',
      line: '21',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "Waxholmsbåt året om till Gruvbryggan." (läst 2026-09-27)
      frequency: 'Året runt',
      booking_url: 'https://waxholmsbolaget.se',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "Bil: Nynäsvägen (väg 73) söderut. Skyltad avfart mot Årsta brygga." (läst 2026-09-27)
      // KÄLLA: https://www.utogasthamn.se/hitta-hit/ — "Väl vid bryggan finns en parkeringsplats som betalas via appen" (läst 2026-09-27)
      car_parking: 'Utan bil: pendeltåg till Västerhaninge och buss 846 till Årsta brygga. Med bil: väg 73 (Nynäsvägen) söderut, skyltad avfart mot Årsta brygga. Vid bryggan finns en parkering som betalas i appen Easypark.',
    },
    activity_meta: {
      // KÄLLA: https://www.utogasthamn.se/uto-cykeluthyrning/ — "I Cykelboden har vi över 300 cyklar från Skeppshult", "Cykelhyran gäller per dag, inte 24 timmar." (läst 2026-09-27)
      cykel: { rental: true, notes: 'Cykelboden vid gästhamnen, över 300 cyklar. Hyran gäller per dag.' },
      bad: {
        beaches: [
          {
            name: 'Ålö Storsand',
            type: 'sandstrand',
          // KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ — "Ålö Storsand, som nås med båt eller via vandringsled"; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/alo-rano.html — "Storsand på Ålö anses vara en av Stockholms skärgårds finaste sandstränder." (läst 2026-09-27)
            desc: 'Sandstrand på grannön Ålö, som har broförbindelse med Utö. Nås med båt eller via vandringsled.',
            child_friendly: true,
            directions: 'Via vandringsleden eller grusvägen och bron över till Ålö, eller med båt.',
          },
        // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "Den största delen av södra Utö har varit militärt skjutfält sedan 1940-talet.", "Tillträdesförbud på Utö skjutfält vissa tider." (läst 2026-09-27)
          {
          name: 'Storsand (södra Utö)',
            type: 'sandstrand',
          // KÄLLA: https://www.utogasthamn.se/att-gora/ — "Tar du cykel eller moped kan du åka till skärgårdens kanske finaste strand Storsand, som är just en stor sandstrand och ligger på skjutfältets mark några kilometer från Gruvbyn. Glöm bara inte att fråga oss i Hamnboden om skjutfältet är öppet" (läst 2026-09-27)
          desc: 'Stor sandstrand på skjutfältets mark på södra Utö, där det vissa tider är tillträdesförbud. Fråga i Hamnboden om skjutfältet är öppet innan du åker.',
            child_friendly: true,
          directions: 'Söderut från Gruvbyn, några kilometer. Går att nå med cykel.',
          },
        ],
      },
      // KÄLLA: Stockholm Archipelago Trail, https://stockholmarchipelagotrail.com/section/ (2026-09-17)
      vandring: { trails: 4, max_km: 18.4, sat: { km: 18.4, difficulty: 'Krävande' } },
      fiske: true,
    },
    amenities: { toilets: true, shower: true, cafe: true, grocery: true, atm: false },
    dog_friendly: true,
    // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "inom hela reservatet med undantag av Persholmen medföra hund som ej är kopplad" (läst 2026-09-27)
    // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/hundar-i-naturen/ — "Koppla hunden när vilda djur har ungar, 1 mars–20 augusti." (läst 2026-09-27)
    dog_notes: 'Hunden ska vara kopplad i naturreservatet på norra Utö, utom på Persholmen utanför perioden 1 mars–20 augusti. I resten av naturen får hunden inte springa lös 1 mars–20 augusti.',
    insiderTips: [
      // KÄLLA: https://www.kulturarvstockholm.se/industrihistoria/artiklar-om-industrihistoria/uto-gruvor/ (Stockholms läns museum) — "måhända Sveriges äldsta järngruvor, upptagna redan under tidig medeltid", "År 1879 upphörde slutligen gruvdriften helt" (läst 2026-09-27)
      'Stockholms läns museum beskriver Utös järngruvor som måhända Sveriges äldsta, upptagna redan under tidig medeltid. Gruvdriften upphörde slutligen 1879.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ (läst 2026-09-26) — "Utö Värdshus, som har öppet året runt, erbjuder både restaurang, hotell och konferens"; "Sommartid sjuder ön av liv med restauranger, caféer, butiker och aktiviteter"; "Skärgårdsstiftelsen flera stugor och hus som hyrs ut veckovis"; lansstyrelsen.se Utö: "Waxholmsbåt året om till Gruvbryggan"
      'Utö Värdshus har öppet året runt med restaurang, hotell och konferens.',
    ],
    blogLinks: [
      { slug: 'uto-guide', title: 'Utö guide – gruvorna, cykel, bad och båt från Årsta brygga' },
      { slug: 'vandring-orno-uto', title: 'Vandring på Ornö och Utö – etapper, slingor och båt' },
      { slug: 'havsbastu-guide', title: 'Havsbastu i skärgården – bastur vid hamnar och öar' },
    ],
    seasonal: {
      // KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ (läst 2026-09-26) — "Utö Värdshus, som har öppet året runt, erbjuder både restaurang, hotell och konferens"; "Sommartid sjuder ön av liv med restauranger, caféer, butiker och aktiviteter"; "Skärgårdsstiftelsen flera stugor och hus som hyrs ut veckovis"; lansstyrelsen.se Utö: "Waxholmsbåt året om till Gruvbryggan"
      open: 'Året runt',
      peak: 'Juli',
      best: 'Sommar för flest öppna ställen',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ — "som har öppet året runt, erbjuder både restaurang, hotell och konferens", "Sommartid sjuder ön av liv med restauranger, caféer, butiker och aktiviteter"; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "Waxholmsbåt året om till Gruvbryggan." (läst 2026-09-27)
      bestReason: 'Båten går året om och Utö Värdshus har öppet året runt. Sommartid har fler restauranger, kaféer och butiker öppet.',
      months: ['limited','limited','limited','limited','open','open','peak','peak','open','limited','limited','limited'],
    },
  },
  // ─── VAXHOLM ─────────────────────────────────────────────────
  {
    slug: 'vaxholm',
    name: 'Vaxholm',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🏛️',
    // KÄLLA: https://www.vaxholm.se/kommun--politik/fakta-om-vaxholm/historia — "Stadskärnans bebyggelse består till övervägande del av trähus" (läst 2026-09-27)
    // KÄLLA: https://assets.ctfassets.net/4l7cjdaypzcu/1WCfe56Z2KZwgDq26t7IO3/9320e22bd9562098960f572bc7b3615f/SLomradet-2026-04-02.pdf (Waxholmsbolagets karta över SL-området, 2026-04-02) — "SL-biljett gäller alltid för resor med Waxholmsbolaget mellan dessa bryggor", listan omfattar "Strömkajen" och "Vaxholm" (läst 2026-09-27)
    tagline: 'Skärgårdsstad med kastell, trähuskvarter och båt från Strömkajen på SL-biljett.',
    seoTitle: 'Vaxholm 2026 – fästning, historisk stad & dagstur',
    seoDescription: 'Guide till Vaxholm: Vaxholms kastell, restauranger och båt från Strömkajen. Dagstur eller weekendresa i Stockholms skärgård.',
    description: [
      // KÄLLA: https://vaxholmsfastning.se/historik/ — "Vaxholms fästnings historia inleddes i början av 1500-talet med ett blockhus på Vaxholmen, byggt av riksföreståndaren Svante Nilsson Sture." / "Gustav Vasa 1548 åt ståthållaren på Stockholms slott att uppföra en ny och kraftigare fästning."
      'Vaxholms fästnings historia inleddes i början av 1500-talet med ett blockhus på Vaxholmen, byggt av riksföreståndaren Svante Nilsson Sture. År 1548 gav Gustav Vasa ståthållaren på Stockholms slott i uppdrag att uppföra en ny och kraftigare fästning. Det strategiska läget vid inloppet mot Stockholm är anledningen till att anläggningen finns där den finns.',
      // KÄLLA: https://vaxholmsfastning.se/historik/ — "Den gamla fästningen revs och ersattes med det nuvarande Kastellet under åren 1833-1863."
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/vaxholms-kastell, Vaxholms kastell — "Byggår: 1833-1863 på uppdrag av Karl XIV Johan"
      'Den gamla fästningen revs och ersattes med det nuvarande Kastellet under åren 1833–1863, på uppdrag av Karl XIV Johan. Det är den byggnaden som ligger i sundet i dag, tyngre och mer sluten än man väntar sig av bilderna.',
      // KÄLLA: https://vaxholmsfastning.se/historik/ — angrepp slogs tillbaka två gånger: "Första gången var 1612 då danskarna anföll" och "andra gången 1719 då ryssarna härjade i Stockholms skärgård"
      'Fästningen har slagit tillbaka angrepp två gånger. Första gången var 1612 då danskarna anföll, andra gången 1719 då ryssarna härjade i Stockholms skärgård.',
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/vaxholms-kastell, Vaxholms kastell — "På ön Vaxholmen ett stenkast från skärgårdens huvudstad Vaxholm ligger Vaxholms kastell."
      // KÄLLA: https://vaxholmsfastning.se/ — museet låter besökaren följa "skärgårdsförsvarets 500-åriga historia" och täcker "Sveriges försvarshistoria från Gustav Vasa till nutid"
      'Vaxholms kastell ligger på ön Vaxholmen, ett stenkast från staden Vaxholm, och nås över vattnet. Inne i kastellet finns museet, där utställningarna följer skärgårdsförsvarets 500-åriga historia och Sveriges försvarshistoria från Gustav Vasa till nutid. Utsikten från murarna går ut över sundet åt båda håll.',
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "11A STOCKHOLM – VAXHOLM – GRINDA – BODA – SOLLENKROKA", bryggorna "Nacka strand", "Hasseludden", "Gåshaga brygga" (läst 2026-09-27). Restiden Strömkajen → Vaxholm ank. är 55–82 min på de 34 turerna i tabellen (siffrorna ligger i ett kodat typsnitt i PDF:en och är avkodade och räknade kolumn för kolumn).
      // KÄLLA: https://assets.ctfassets.net/4l7cjdaypzcu/1WCfe56Z2KZwgDq26t7IO3/9320e22bd9562098960f572bc7b3615f/SLomradet-2026-04-02.pdf — "SL-biljett gäller alltid för resor med Waxholmsbolaget mellan dessa bryggor" (läst 2026-09-27)
      'Båten från Strömkajen tar 55–82 minuter till Vaxholm beroende på tur och stannar på vägen vid bland annat Nacka strand, Hasseludden och Gåshaga brygga. SL-biljetten gäller hela sträckan. Från Vaxholm går linje 11 vidare mot Grinda, Boda och Sollenkroka.',
      // KÄLLA: https://kund.printhuset-sthlm.se/sl/v670_670x.pdf — "670 Stockholm–Vaxholm", "Giltig 14 december 2025–18 juni 2026", hållplatserna "Tekniska högskolan" och "Västerhamnsplan" (läst 2026-09-27). Restid 45–58 min (räknat tur för tur); på vardagar dagtid går bussen ungefär var 15:e minut, lördag–söndag var 20:e–30:e minut. Någon utgåva för hösten 2026 finns inte på SL:s tryckeri-URL; tabellen ovan är den senaste som gick att öppna.
      'Buss 670 går från Tekniska högskolan till Västerhamnsplan i Vaxholm på 45–58 minuter, på vardagar ungefär var femtonde minut dagtid. Med buss åt ena hållet och båt åt det andra fungerar Vaxholm som halvdags- eller heldagsutflykt även på kort varsel.',
      // KÄLLA: https://www.vaxholm.se/kommun--politik/fakta-om-vaxholm/historia — "Stadens bebyggelsestruktur med dess rätvinkliga gatunät från huvudgatan Hamngatan finns dokumenterat redan på 1700-talet", "Vaxholm var, då som nu, en viktig knutpunkt i skärgården", "sommarbostadsort med stora sommarvillor och badhus" (läst 2026-09-27)
      'Det som skiljer Vaxholm från öarna längre ut är att det är en stad. Gatunätet är rätvinkligt och utgår från huvudgatan Hamngatan, en struktur som finns dokumenterad redan på 1700-talet. Mot slutet av 1800-talet blev Vaxholm också sommarbostadsort med stora sommarvillor och badhus, och staden har varit en knutpunkt i skärgården sedan dess.',
      // KÄLLA: https://www.vaxholm.se/kommun--politik/fakta-om-vaxholm/historia — "Stadskärnans bebyggelse består till övervägande del av trähus, först 1912 blev det tillåtet att uppföra byggnader i annat material. Skälet till det var att staten var markägare och kunde besluta om en snabb rivning av staden om det militära läget så krävde." (läst 2026-09-27)
      'Stadskärnan består till övervägande del av trähus, och det har en militär förklaring. Staten ägde marken och ville kunna riva staden snabbt om det militära läget krävde det, så först 1912 blev det tillåtet att bygga i något annat material än trä.',
      // KÄLLA: https://www.destinationvaxholm.se/events/vaxholms-julmarknad-2025 — "Den andra helgen i advent, 6 – 7 december, är det åter dags för Vaxholms traditionsenliga julmarknad. Med brända mandlar, hantverk, glögg och granar", plats "Rådhustorget" (läst 2026-09-27)
      'Andra helgen i advent hålls Vaxholms julmarknad på Rådhustorget, med brända mandlar, hantverk, glögg och granar – 2025 var det 6–7 december. Julmarknaden är ett av de tydligaste skälen att komma hit utanför sommarhalvåret.',
      // KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/waxholm-vaxholm/ — "Gästhamnen är placerad mitt i centrum", "I Gästhamnen finner du restaurang, bar, café och glasskiosk", "flera sjöbodar med kläder, skor, inredning, leksaker och souvenirer", "service hus med duschar och toaletter", 110 gästplatser (läst 2026-09-27)
      'Gästhamnen ligger mitt i centrum och har 110 gästplatser. Runt den finns restaurang, bar, café och glasskiosk, sjöbodar med kläder, skor, inredning, leksaker och souvenirer, och ett servicehus med duschar och toaletter.',
      // KÄLLA: https://stockholmslansmuseum.se/besoksmal/vaxholm/ — "Kastellet är byggt i granit med mer än två meter tjocka murar och kaserner för över tusen man. Beväpningen utgjordes av 156 kanoner.", "kastellet genom artilleriets utveckling blivit omodernt redan när det stod klart", "man tar sig dit med en linfärja" (läst 2026-09-27)
      'Till kastellet tar man sig med linfärja. Det är byggt i granit med mer än två meter tjocka murar och kaserner för över tusen man, och beväpningen bestod av 156 kanoner. Ändå var det omodernt redan när det stod klart – artilleriet hade hunnit utvecklas under byggtiden.',
      // KÄLLA: https://www.vaxholm.se/kommun--politik/fakta-om-vaxholm/historia — "Vaxholm fick sina första stadsprivilegier år 1647, av drottning Kristina"; "Viss bebyggelse har funnits på Vaxön sedan 1200-talets slut"; omkring 1770 ca 800 invånare; början av 1900-talet ca 2 000 invånare; "Vaxholm fick sina första reguljära ångbåtsförbindelser c:a 1850"
      'Vaxholm fick sina första stadsprivilegier 1647 av drottning Kristina, men bebyggelse har funnits på Vaxön sedan 1200-talets slut. Omkring 1770 bodde här ungefär 800 personer, vid 1900-talets början cirka 2 000. De första reguljära ångbåtsförbindelserna kom omkring 1850 — det var de som gjorde staden till ett utflyktsmål.',
      // KÄLLA: https://www.vaxholm.se/kommun--politik/fakta-om-vaxholm/historia — landförbindelse via Pålsundsbron 1926; 1974 sammanslagning med Österåker; 1983 blir Vaxholm åter egen kommun och Bogesundslandet och Resarö tillkommer
      // KÄLLA: https://www.vaxholm.se/kommun--politik/fakta-om-vaxholm — cirka 12 000 fastboende (2024); "Kommunen omfattar cirka 70 öar, varav 57 bebodda samt den stora gröna halvön Bogesundslandet"
      'Att Vaxholm går att nå med buss beror på Pålsundsbron, som gav landförbindelse 1926. Kommunen slogs ihop med Österåker 1974 och blev åter egen 1983, då Bogesundslandet och Resarö tillkom. I dag har kommunen ungefär 12 000 fastboende och omfattar cirka 70 öar, varav 57 bebodda, plus halvön Bogesundslandet.',
      // KÄLLA: https://www.svenskakyrkan.se/vaxholm/vaxholms-kyrka — "År 1760 lades grunden till den nuvarande kyrkan", färdig 1803 och kallad Gustav Adolfkyrkan efter Gustav III och Gustav IV Adolf; ritad av C F Adelcrantz och Olof Tempelman; det planerade tornet byggdes aldrig utan ersattes av en klockstapel i trä med tre klockor; dopfunt i gotländsk sandsten från slutet av 1300-talet, ursprungligen i Riddarholmskyrkan, överförd omkring 1677; modeller av roslagsbåtar i sidokapellen
      'Vaxholms kyrka tog fyrtiotre år att bygga: grunden lades 1760 och kyrkan stod färdig 1803, med namnet Gustav Adolfkyrkan efter de två kungar som regerade under byggtiden. C F Adelcrantz och Olof Tempelman ritade den, men det planerade tornet blev aldrig byggt — i stället restes en klockstapel av trä med tre klockor. Inne i kyrkan står en dopfunt av gotländsk sandsten från slutet av 1300-talet, ursprungligen i Riddarholmskyrkan och överförd hit omkring 1677, och i sidoskeppen står modeller av roslagsbåtar i glasmontrar.',
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/vaxholms-kastell — arkitekter "Erik Dahlberg, C M Stuart, C F Meijer"; "Efter första världskriget flyttades försvarslinjen längre ut i skärgården och Vaxholm förlorade då återigen sin militära betydelse"; "1964 invigdes kastellets museum"; i dag finns "restaurang, konsertlokaler och en uppskattad äventyrsverksamhet"
      'Bakom kastellets utformning står namnen Erik Dahlberg, C M Stuart och C F Meijer. Dess militära roll tog slut efter första världskriget, när försvarslinjen flyttades längre ut i skärgården. Museet i kastellet invigdes 1964, och i byggnaden finns i dag också restaurang och konsertlokaler.',
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/rindo-redutt — byggd "1859–1864" för att komplettera Vaxholms kastell i försvaret av Stockholms inlopp; domineras av en donjon omgiven av vallar, djup grav och fältvall; innehöll två kaponjärer, "de första som byggdes i landet"; sten och tegel; statligt byggnadsminne; "går att besöka på egen hand"
      'På Rindö, granne med Vaxön, ligger Rindö redutt, byggd 1859–1864 för att komplettera kastellet i försvaret av Stockholms inlopp. Anläggningen domineras av en donjon i sten och tegel, omgiven av vallar och en djup grav, och innehöll två kaponjärer — de första som byggdes i landet. Redutten är statligt byggnadsminne och går att besöka på egen hand.',
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/oscar-fredriksborg — "Byggår: 1867-1877"; anlagt vid Oxdjupet sedan en farled öppnats där efter århundraden av stenblockering; modernt bergfort med tunnelsprängning med nitroglycerin, "betongen som byggmaterial och pansar som fasadskydd"; byggnadsminne 2002 (sidan stavar namnet "Oscar Fredriksborg" i rubrik och löptext men "Oskar-Fredriksborg" i just den meningen); "Området vid Oscar Fredriksborg är öppet för besök." (läst 2026-09-19)
      'Oscar-Fredriksborg vid Oxdjupet byggdes 1867–1877, sedan en farled öppnats genom sundet efter århundraden av stenblockering. Det var ett modernt bergfort för sin tid, med tunnlar sprängda med nitroglycerin, betong och pansar, och med en låg profil i stället för kastellets höga murar. Anläggningen blev byggnadsminne 2002 och området är öppet för besök.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/bogesundslandet.html — bildat 2015; "4341 hektar varav 2 891 hektar land"; Vaxholms kommun; förvaltare Statens fastighetsverk; naturtyper "barrskog, ädellövskog, odlingslandskap"; "många gamla grova ekar som växer i området, såväl i betesmark som i skogsmiljö"; Natura 2000-området "Damstakärret SE0110132 ligger inom området"
      'Bogesundslandets naturreservat bildades 2015 och är 4 341 hektar, varav 2 891 hektar land — en av de största skyddade ytorna så nära Stockholm. Statens fastighetsverk förvaltar det, och naturtyperna är barrskog, ädellövskog och odlingslandskap. Det som gör området särskilt är mängden gamla grova ekar, både i betesmark och i skogsmiljö. Natura 2000-området Damstakärret ligger inom reservatet.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/bogesundslandet.html — Bogesunds slott från mitten av 1600-talet är statligt byggnadsminne och rymmer vandrarhem; anordningar: markerade vandringsleder och ridstigar, badplatser, rastplatser med eldstäder och vindskydd, campingplatser, golfbana; föreskrifterna förbjuder att medföra okopplad hund, att "tälta mer än två dygn i följd annat än på anvisad plats", att cykla utanför anvisade stigar och att "rida annat än på vägar och på anvisade ridstigar"
      'Mitt i reservatet ligger Bogesunds slott från mitten av 1600-talet, statligt byggnadsminne och i dag vandrarhem. Runt omkring finns markerade vandringsleder och ridstigar, badplatser, rastplatser med eldstäder och vindskydd, campingplatser och en golfbana. Reglerna är värda att känna till: koppel på hunden, tältning högst två dygn i följd utanför anvisad plats, cykling bara på anvisade stigar och ridning bara på vägar och anvisade ridstigar.',
    ],
    facts: {
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — linje 11, "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", Strömkajen → Vaxholm 55–82 min; https://kund.printhuset-sthlm.se/sl/v670_670x.pdf — "Giltig 14 december 2025–18 juni 2026", Tekniska högskolan → Västerhamnsplan 45–58 min (läst 2026-09-27)
      travel_time: 'Båt från Strömkajen 55–82 min (linje 11) eller buss 670 från Tekniska högskolan 45–58 min',
      // KÄLLA: https://www.vaxholm.se/kommun--politik/fakta-om-vaxholm/historia — "Vaxholm fick sina första stadsprivilegier år 1647", "Stadskärnans bebyggelse består till övervägande del av trähus" (läst 2026-09-27)
      character: 'Stad med stadsprivilegier från 1647, trähuskärna och kastell på egen ö',
      // KÄLLA: https://assets.ctfassets.net/4l7cjdaypzcu/1WCfe56Z2KZwgDq26t7IO3/9320e22bd9562098960f572bc7b3615f/SLomradet-2026-04-02.pdf — "SL-biljett gäller alltid för resor med Waxholmsbolaget mellan dessa bryggor" (läst 2026-09-27); https://sl.se/biljetter/sortiment-och-regler/biljetter-for-resor-med-waxholmsbolagets-skargardsbatar (renderad med webbläsare, laddar inte med curl) — "Inom Waxholmsbolagets "SL-område" kan du året runt resa på alla SL-biljetter"
      season: 'Helår – buss och båt med SL-biljett året runt',
      // UPPSKATTNING: redaktionell bedömning utifrån restid och sevärdheter ovan
      best_for: 'Dagsturer, fästningshistoria, första skärgårdsbesöket',
    },
    facts_provenance: { travel_time: 'matt', character: 'matt', season: 'matt', best_for: 'bedomning' },
    activities: [
      // KÄLLA: https://vaxholmsfastning.se/besoksinfo/index.php — "BESÖKSINFO 2026", "Hos oss kan du ta del av historien om skärgårdens försvar under 500 år", "Visningar med guide ingår i entréavgiften och utgår från museet fr.o.m. 27 juni t.o.m. 16 augusti", "cirka 45 minuter" (läst 2026-09-27)
      { icon: '🏰', name: 'Vaxholms Kastell', desc: 'Fästningsmuseum om skärgårdsförsvarets 500 år. Sommaren 2026 ingick guidade visningar på cirka 45 minuter i entrén 27 juni–16 augusti; se museets besöksinfo för öppettider.' },
      // KÄLLA: https://www.vaxholm.se/kommun--politik/fakta-om-vaxholm/historia — "rätvinkliga gatunät från huvudgatan Hamngatan", "Stadskärnans bebyggelse består till övervägande del av trähus" (läst 2026-09-27); https://www.svenskagasthamnar.se/stockholms-skargard/waxholm-vaxholm/ — "restaurang, bar, café och glasskiosk" (läst 2026-09-27)
      { icon: '🛍', name: 'Stadspromenaden', desc: 'Gå längs Hamngatan och det rätvinkliga gatunätet i trähuskärnan, och ner till gästhamnen med restaurang, bar, café och glasskiosk.' },
      // KÄLLA: https://catchrelax.se/ — "Guidade fisketurer och aktiviteter i Stockholms skärgård & Mälaren sedan 2005", Villa HelleBo "5 minuter från Vaxholm" (läst 2026-09-27)
      { icon: '🎣', name: 'Fiskeguider', desc: 'catch&relax har ordnat guidade fisketurer i Stockholms skärgård och Mälaren sedan 2005, med bas några minuter från Vaxholm.' },
      // KÄLLA: https://www.destinationvaxholm.se/skargardens-kanotcenter — "Skärgårdens Kanotcenter och Adventure Hub erbjuder guidade turer, kajak-och cykeluthyrning, gruppaktiviteter och friluftsäventyr året runt", "Ingen tidigare paddlingserfarenhet behövs när du paddlar med guide", "Resarövägen 10" (läst 2026-09-27); verksamheten aktiv hösten 2026 enligt https://kanotcenter.com/
      { icon: '🛶', name: 'Kajakpaddling', desc: 'Skärgårdens Kanotcenter på Resarövägen hyr ut kajaker och har guidade turer året runt – med guide behövs ingen tidigare paddlingserfarenhet.' },
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "11A STOCKHOLM – VAXHOLM – GRINDA – BODA – SOLLENKROKA"; https://kund.printhuset-sthlm.se/wa/h13.pdf — "13A STOCKHOLM – VAXHOLM – BODA – SÖDRA INGMARSÖ – HUSARÖ" med bryggan "Finnhamn" (läst 2026-09-27)
      { icon: '🚢', name: 'Båtutflykter', desc: 'Ta Waxholmsbåten vidare ut i skärgården – linje 11 går till Grinda och linje 13 till bland annat Finnhamn och Husarö.' },
    ],
    // "Skärgårdens mest tillgängliga" var ett obelagt superlativ och togs bort 2026-09-14.
    accommodationIntro: 'Vaxholm nås med bil, buss och båt, och boendet finns i staden snarare än utspritt på en ö: hotell, bed & breakfast, vandrarhem och camping.',
    // KÄLLA: https://www.waxholmshotell.se/; https://kastelletvaxholm.se/ + STF (STF Kastellet Bed & Breakfast, 27 rum, 81 bäddplatser); https://www.vaxholmsbedandbreakfast.se/; svenskaturistforeningen.se/boende/stf-vaxholm-bogesund-vandrarhem; https://waxholmscamping.com/ (läst 2026-09-14). "Året runt" på källsidorna gäller båttrafiken respektive Sjövillan, inte B&B:et, och är struket.
    accommodation: [
      { name: 'Waxholms Hotell', type: 'Hotell', desc: 'Historiskt hotell vid hamnen med matsal och havsutsikt. Öppet hela året.', websiteUrl: 'https://www.waxholmshotell.se' },
      { name: 'Kastellet Bed & Breakfast', type: 'B&B', desc: 'STF-anslutet B&B i Vaxholms kastell, 27 rum och totalt 81 bäddplatser; bistro och café sommartid.', websiteUrl: 'https://kastelletvaxholm.se' },
      { name: 'Vaxholms Bed & Breakfast', type: 'B&B', desc: 'Litet B&B i privat hem i Vaxholm.', websiteUrl: 'https://vaxholmsbedandbreakfast.se' },
      { name: 'STF Bogesunds Vandrarhem', type: 'Vandrarhem', desc: 'Vandrarhem vid Bogesunds slott utanför Vaxholm.', websiteUrl: 'https://www.svenskaturistforeningen.se/boende/stf-vaxholm-bogesund-vandrarhem/' },
      { name: 'Waxholms Camping', type: 'Camping', desc: 'Campingplats med stugor på Eriksö — nås med bil.', websiteUrl: 'https://waxholmscamping.com' },
    ],
    getting_there: [
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", Strömkajen → Vaxholm 55–82 min (läst 2026-09-27); https://assets.ctfassets.net/4l7cjdaypzcu/1WCfe56Z2KZwgDq26t7IO3/9320e22bd9562098960f572bc7b3615f/SLomradet-2026-04-02.pdf — "SL-biljett gäller alltid för resor med Waxholmsbolaget mellan dessa bryggor" (läst 2026-09-27)
      { method: 'Waxholmsbåt', from: 'Strömkajen, Stockholm', time: '55–82 min', desc: 'Waxholmsbolagets linje 11 och flera andra linjer, med stopp på vägen. SL-biljetten gäller mellan Strömkajen och Vaxholm året runt.', icon: '⛴' },
      { method: 'Bil', from: 'Stockholm', time: '', desc: 'Vaxholm har fast landsförbindelse och nås med bil. Det finns parkeringar i staden.', icon: '🚗' },
      // KÄLLA: https://kund.printhuset-sthlm.se/sl/v670_670x.pdf — "670 Stockholm–Vaxholm", "Giltig 14 december 2025–18 juni 2026", "Tekniska högskolan", "Västerhamnsplan" (läst 2026-09-27); restid 45–58 min räknad tur för tur
      { method: 'Buss', from: 'Tekniska högskolan', time: '45–58 min', desc: 'SL-buss 670 från Tekniska högskolan (tunnelbana) till Västerhamnsplan i Vaxholm, vardagar ungefär var 15:e minut dagtid.', icon: '🚌' },
    ],
    harbors: [
      // KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/waxholm-vaxholm/ — "Gästhamnen är placerad mitt i centrum", "Sjömackarna/Gulf" (diesel, bensin, gasol), 110 gästplatser; service: färskvatten, toalett, dusch, eluttag (läst 2026-09-27)
      { name: 'Vaxholms Gästhamn', desc: 'Gästhamn mitt i centrum med 110 gästplatser, servicehus med dusch och toalett, septiktömning och båtbottentvätt. Drivmedel via Sjömackarna/Gulf.', fuel: true, service: ['el', 'vatten', 'dusch', 'toilet'] },
    ],
    restaurants: [
      // KÄLLA: https://www.hamnkrogenvaxholm.com/ — "vaxholmarnas kvarterskrog sedan 1950-talet … ser ut över båtlivet i gästhamnen", Söderhamnen 10, "Våra klassiker samsas med husmanskost"
      { name: 'Hamnkrogen', type: 'Restaurang', desc: 'Kvarterskrog vid gästhamnen sedan 1950-talet. Lunch, middag och husmanskost.', websiteUrl: 'https://www.hamnkrogenvaxholm.com' },
      // KÄLLA: https://www.winbergs.se/ — "WINBERGS KÖK & BAR PÅ KAJEN I VAXHOLM … sommarkrog … Krogen är grundad 1961"
      { name: 'Winbergs Kök & Bar', type: 'Restaurang', desc: 'Sommarkrog och grill på kajen i Vaxholm, grundad 1961.', websiteUrl: 'https://www.winbergs.se' },
      // KÄLLA: https://ostmakeriet.se/aterforsaljare/ — "Mathantverkstan i Skärgården"; destinationvaxholm.se (Vaxholms turistbyrå) — "artisan cheeses, bread, jams, kombucha, coffee, ice cream", Söderhamnsplan 1
      { name: 'Mathantverkstan i Skärgården', type: 'Delikatess/Café', desc: 'Butik och café vid Söderhamnsplan med hantverksostar, bröd, sylt, kombucha och kaffe.' },
    ],
    tips: [
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/vaxholms-kastell, Vaxholms kastell — "På ön Vaxholmen ett stenkast från skärgårdens huvudstad Vaxholm ligger Vaxholms kastell."
      'Kastellet ligger på en egen ö, Vaxholmen — du måste över vattnet för att komma dit.',
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "11A STOCKHOLM – VAXHOLM – GRINDA – BODA – SOLLENKROKA", bryggorna "Nacka strand", "Hasseludden", "Gåshaga brygga"; Strömkajen → Vaxholm 55–82 min (läst 2026-09-27)
      'Båten från Strömkajen tar 55–82 minuter och går förbi Nacka strand, Hasseludden och Gåshaga på vägen – räkna med en dryg timme.',
      // KÄLLA: https://www.vaxholm.se/, nyhetsarkiv — "Välkommen till Vaxholms julmarknad 7–8/12"
      'Julmarknaden i december är ett skäl att komma hit utanför sommarsäsongen — kolla datum på vaxholm.se.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/bogesundslandet.html — reservatet är 4 341 hektar varav 2 891 land; markerade vandringsleder, badplatser, vindskydd och eldstäder; nås "med främst bil, buss eller båt"
      'Bogesundslandet på fastlandssidan av kommunen är ett stort vandringsområde med markerade leder, badplatser och vindskydd — och nås med buss.',
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/rindo-redutt (läst 2026-09-20) — Rindö redutt är statligt byggnadsminne och "går att besöka på egen hand"
      'Rindö redutt är statligt byggnadsminne och går att besöka på egen hand.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/bogesundslandet.html — förbjudet att cykla utanför anvisade stigar och att rida annat än på vägar; okopplad hund förbjuden
      'I Bogesundslandets naturreservat får du bara cykla på anvisade stigar och rida på vägarna, och hunden ska vara kopplad.',
    ],
    related: ['grinda', 'finnhamn', 'ljustero'],
    tags: ['historia', 'fästning', 'stad', 'dagsturer', 'helår'],
    // KÄLLA: https://vaxholmsfastning.se/historik/ — "Vaxholms fästnings historia inleddes i början av 1500-talet med ett blockhus på Vaxholmen, byggt av riksföreståndaren Svante Nilsson Sture."
    // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/vaxholms-kastell, Vaxholms kastell — "Byggår: 1833-1863 på uppdrag av Karl XIV Johan"
    // KÄLLA: https://vaxholmsfastning.se/historik/ — angreppen 1612 (danskarna) och 1719 (ryssarna) slogs tillbaka
    did_you_know: 'Det första försvarsverket på Vaxholmen var ett blockhus från början av 1500-talet, byggt av riksföreståndaren Svante Nilsson Sture. Dagens kastell byggdes 1833–1863 på uppdrag av Karl XIV Johan — den fästning Gustav Vasa lät uppföra 1548 revs för att ge plats åt det. Två angrepp har slagits tillbaka här: danskarna 1612 och ryssarna 1719.',
    transport_meta: {
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", Strömkajen → Vaxholm 55–82 min (typvärde ca 60–70) (läst 2026-09-27); https://kund.printhuset-sthlm.se/sl/v670_670x.pdf — "Giltig 14 december 2025–18 juni 2026", Tekniska högskolan → Västerhamnsplan 45–58 min, vardagar dagtid ungefär var 15:e minut, helger var 20:e–30:e minut (läst 2026-09-27)
      from_city_min: 65,
      from_nearest_hub_min: 0,
      nearest_hub: 'Strömkajen (båt) / Tekniska högskolan (buss 670)',
      operator: 'Waxholmsbolaget',
      line: 'Båt linje 11 m.fl. från Strömkajen; buss 670 från Tekniska högskolan',
      frequency: 'Buss 670 ungefär var 15:e minut vardagar dagtid. Båt flera gånger/dag.',
      booking_url: 'https://sl.se',
      // KÄLLA: Vaxholms stad, taxa antagen av kommunfullmäktige 2025 — https://www.vaxholm.se/trafik--infrastruktur/trafik-gator-och-parkering/parkering/taxor-och-avgifter (hämtad 2026-08-06)
      car_parking: 'Parkering i centrala Vaxholm (zon 1595 och 1596): 40 kr/timme 1 maj–31 augusti, 8–18 vardagar och 8–15 helger. Avgiftsfritt 1 september–30 april gäller halva Kronängsskolans parkeringsområde (zon 1606), där det är parkeringsförbud tisdagar 00–08.',
    },
    activity_meta: {
      // KÄLLA: https://www.destinationvaxholm.se/skargardens-kanotcenter — "kajak-och cykeluthyrning", "Resarövägen 10" (läst 2026-09-27)
      kajak: { difficulty: 'lätt', rental: true, notes: 'Skärgårdens Kanotcenter på Resarövägen hyr ut kajaker och har guidade turer året runt.' },
      bad: {
        beaches: [
          // KÄLLA: https://www.vaxholm.se/ (badplatser) + visitskargarden.se/laesvaert/badplatser-i-vaxholm.aspx — badplatsen på Rindö heter Grönviksbadet/Grönviken, "liten sandstrand och en brygga", renoverad 2020
          {
            name: 'Grönviksbadet (Rindö)',
            type: 'sandstrand',
            // KÄLLA: https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser — "Beläget på södra Rindö i slutet på Grönviksvägen finns detta lilla lokala bad", "Sandstrand", "Badbrygga", "Grillplats", "Baja-maja under badsäsong" (läst 2026-09-27)
            desc: 'Litet lokalt bad på södra Rindö i slutet av Grönviksvägen, med sandstrand, badbrygga, grillplats och bajamaja under badsäsong.',
            child_friendly: true,
            // KÄLLA: Trafikverket, https://www.trafikverket.se/resa-och-trafik/farjetrafik/vaxholmsleden/ — gratis vägfärja, ca 6 min över 970 m
            directions: 'Rindö nås från Vaxholm med den gratis vägfärjan Vaxholmsleden (ca 6 min) eller egen båt.',
            // KÄLLA: https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser — Måldepån: "längs med Militärvägen", "utsikt mot Vaxholmsfjärden vid Oxdjupet där alla stora fartyg passerar på väg in mot Stockholm" (läst 2026-09-27)
            insider_tip: 'Vill du se de stora fartygen passera? Badet vid Måldepån längs Militärvägen på Rindö har utsikt mot Oxdjupet, där de går in mot Stockholm.',
          },
        ],
      },
      fiske: true,
    },
    amenities: { toilets: true, shower: true, cafe: true, grocery: true, atm: true },
    dog_friendly: true,
    // KÄLLA: https://www.vaxholm.se/allanyheter/nyhetsarkiv/vadgallernarskahundarvarakopplade.5.117b327517db288a7c818059.html — "Vaxholms föreskrifter anger att hundar ska hållas kopplade på offentliga platser i hela kommunen och att hundar inte får vistas på begravningsplatser eller lekplats som är offentlig plats", "det är förbjudet att medföra okopplad hund i reservatet" (läst 2026-09-27)
    dog_notes: 'Hunden ska vara kopplad på offentliga platser i hela kommunen och får inte vistas på begravningsplatser eller offentliga lekplatser. Även i Bogesundslandets naturreservat gäller koppel.',
    insiderTips: [
      // KÄLLA: https://kund.printhuset-sthlm.se/sl/v670_670x.pdf — "670 Stockholm–Vaxholm", "Giltig 14 december 2025–18 juni 2026" (läst 2026-09-27); https://assets.ctfassets.net/4l7cjdaypzcu/1WCfe56Z2KZwgDq26t7IO3/9320e22bd9562098960f572bc7b3615f/SLomradet-2026-04-02.pdf — "SL-biljett gäller alltid för resor med Waxholmsbolaget mellan dessa bryggor", med "Strömkajen" och "Vaxholm" i listan (läst 2026-09-27); https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor (renderad med webbläsare, laddar inte med curl) — "Du kan resa med SL-biljett i skärgårdstrafiken mellan Strömkajen i innerstan och Vaxholm med omnejd. Det här gäller året runt"
      'SL-biljetten gäller både på buss 670 från Tekniska högskolan och på Waxholmsbolagets båtar mellan Strömkajen och Vaxholm, året runt – så välj efter tid och lust, inte pris. Bussen tar 45–58 minuter, båten 55–82 minuter.',
      // KÄLLA: https://vaxholmsfastning.se/historik/ (läst 2026-08-25) + SFV — blockhus på Vaxholmen i början av 1500-talet (Svante Nilsson Sture), Gustav Vasas nya och kraftigare fästning 1548, nuvarande kastell 1833–1863. Tidigare stod här att 1548 var den FÖRSTA fästningen.
      'Vaxholmen befästes redan i början av 1500-talet med ett blockhus, och 1548 lät Gustav Vasa uppföra en ny och kraftigare fästning som avvisade både danska och ryska anfall. Det kastell som står här i dag byggdes 1833–1863, sedan stora delar av den gamla fästningen rivits.',
      // KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/waxholm-vaxholm/ — avstånd från gästhamnen: Apotek 250 m, Tandläkare 250 m, Läkare 300 m, Livsmedel 300 m, Turistbyrå 400 m (läst 2026-09-27)
      'Från gästhamnen är det enligt Svenska Gästhamnar 250 meter till apotek och tandläkare, 300 meter till läkare och livsmedelsbutik och 400 meter till turistbyrån.',
      // KÄLLA: https://www.vaxholm.se/kommun--politik/fakta-om-vaxholm/historia — "först 1912 blev det tillåtet att uppföra byggnader i annat material" (läst 2026-09-27)
      'Innerstaden är nästan helt byggd i trä – fram till 1912 var det inte tillåtet att bygga i något annat material.',
    ],
    blogLinks: [
      { slug: 'vaxholm-guide', title: 'Vaxholm dagstur – kastellet, staden och båt från Strömkajen' },
      { slug: 'waxholmsbolaget-guide', title: 'Waxholmsbolaget – komplett guide till båttrafiken' },
    ],
    seasonal: {
      open: 'Hela året',
      peak: 'Juli–Augusti',
      best: 'Maj–Juni eller September',
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026" (läst 2026-09-27); https://vaxholmsfastning.se/besoksinfo/index.php — "Öppettider maj-sept" (läst 2026-09-27); https://kund.printhuset-sthlm.se/sl/v670_670x.pdf — buss 670 alla dagar
      bestReason: 'Buss 670 och båtarna från Strömkajen går hela året. I maj–juni och september har kastellmuseet öppet på helger och båtarna går enligt vår- och hösttabellen.',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },
  },
  // ─── GRINDA ──────────────────────────────────────────────────
  {
    slug: 'grinda',
    name: 'Grinda',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌿',
    // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Naturen är typisk för mellanskärgården."; "En cirka 2,5 km lång natur- och kulturstig leder runt öns sydöstra del."; "Grinda har fina barnvänliga bad både vid den södra och norra ångbåtsbryggan."; "Markägare: Skärgårdsstiftelsen" (läst 2026-09-27)
    // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ — "STF Grinda Hotell & Sea Lodge" (läst 2026-09-27)
    // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Du kan åka till Grinda från Strömkajen, via Vaxholm." (läst 2026-09-27)
    tagline: 'Naturreservat i mellanskärgården — natur- och kulturstig, barnvänliga bad och STF-boende.',
    seoTitle: 'Grinda 2026 – Grinda Wärdshus, natur & gästhamn',
    seoDescription: 'Guide till Grinda: Grinda Wärdshus, natur, gästhamn och båt från Strömkajen. Skärgårdsstiftelsens ö i mellersta skärgården.',
    description: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html, naturreservat Grinda — "Skyddat sedan: 2000", "Förvaltare: Skärgårdsstiftelsen", "Markägare: Skärgårdsstiftelsen", "Storlek: 503 hektar varav land 178"
      // KÄLLA: https://skargardsstiftelsen.se/omraden/grinda/ — "Grinda är ett naturreservat som ägs och förvaltas av Skärgårdsstiftelsen"
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Eftersom det är Skärgårdsstiftelsen som äger ön får du vara nästan överallt på ön" (läst 2026-09-27)
      'Grinda är ett naturreservat som ägs och förvaltas av Skärgårdsstiftelsen. Reservatet är skyddat sedan 2000 och omfattar 503 hektar, varav 178 hektar land. Eftersom stiftelsen äger ön får du enligt Waxholmsbolaget vara nästan överallt på den.',
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ — "Hotellet erbjuder 28 moderna dubbelrum och två King Size rum"; "Rummen ligger i ett annex till Wärdshuset."; "På öns södra sida hittar ni Grinda Sea Lodge"; "Frukost ingår i rumspriset eller finns att köpa mot tillägg." (läst 2026-09-27)
      // KÄLLA: https://grinda.se/en/accommodation/sea-lodge/ — "The accommodation is spread over 4 lengths with a total of 44 beds in 4- and 2-bed rooms." (läst 2026-09-27)
      // KÄLLA: https://grinda.se/en/accommodation/ — "We have 27 different cottages in our charming cottage village."; "Company registration number: 556251-4272" (läst 2026-09-27)
      'Boendet finns i Svenska Turistföreningens utbud under namnet STF Grinda Hotell & Sea Lodge, men drivs av Grinda Wärdshus. Hotellet har 28 dubbelrum och två King Size-rum i ett annex till Wärdshuset, och frukost ingår i rumspriset eller kan köpas till. På öns södra sida ligger Grinda Sea Lodge, ett enklare boende med 44 bäddar i fyra längor. Därtill finns en stugby med 27 stugor.',
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ — "Det anrika Grinda Wärdshus erbjuder vällagad klassisk skärgårdsmat."; "Framfickans stora trädäck precis vid havet är en naturlig samlingsplats för både båtfolk och ögäster." (läst 2026-09-27)
      // KÄLLA: https://skargardsstiftelsen.se/omraden/grinda/ — "Grinda Wärdshus har restaurang, hotellrum och vandrarhem" (läst 2026-09-27)
      // KÄLLA: https://grinda.se/mat-fest/wardshuset/ — "Vi gav arkitekten Jonas Bohlin fria händer i Wärdshusets olika salonger och rum"; "Ingen som passerar genom Foajén missar den klassiska öppna spisen." (läst 2026-09-27)
      // KÄLLA: https://grinda.se/mat-fest/framfickan/ — "OBS! Framfickan har endast drop-in. Ej möjligt att boka bord" (läst 2026-09-27)
      'Grinda Wärdshus har restaurang, hotellrum och vandrarhem, och serverar klassisk skärgårdsmat. Arkitekten Jonas Bohlin har fått fria händer i wärdshusets salonger, och i foajén står en öppen spis. Nere vid vattnet ligger hamnkrogen Framfickan med ett stort trädäck precis vid havet. Där är det bara drop-in.',
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ — "Till hotellet och Wärdshuset är det ungefär lika nära från Södra Bryggan som från Norra bryggan, en knapp kilometers promenad (15 min)."; "Har du större eller tungt bagage kan transport ordnas på förfrågan."; "Till Grinda Sea Lodge är Södra bryggan närmast."; "Från Norra bryggan till Grinda Sea Lodge är det 30 minuters promenad tvärs över ön" (läst 2026-09-27)
      'Till hotellet och wärdshuset är det ungefär lika långt från Södra och Norra bryggan, en knapp kilometers promenad eller runt en kvart. Har du tungt bagage kan transport ordnas på förfrågan. Ska du till Grinda Sea Lodge är Södra bryggan närmast; från Norra bryggan tar promenaden tvärs över ön en halvtimme.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/grinda/ — "Följ stigarna mellan norra och södra bryggan"; "bland annat natur- och kulturstigen och"; "som leder genom skogar, öppna marker och historiska miljöer"; "bjuder på en varierad vandring genom skogar, öppna ängar och havsnära klipplandskap" (läst 2026-09-27)
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ — "Närmare än 1 km till markerad vandringsled." (läst 2026-09-27)
      'Stigar går mellan norra och södra bryggan. Natur- och kulturstigen och Stockholm Archipelago Trail leder genom skog, öppen mark och historiska miljöer, och ledens etapp på Grinda går även ut i det havsnära klipplandskapet.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Grinda har fina barnvänliga bad både vid den södra och norra ångbåtsbryggan. Ytterligare ett fint bad finns vid Källviken. Grillplatser finns vid södra ångbåtsbryggan och vid tältplatsen."; "Torrdass finns vid alla badplatser och vid södra ångbåtsbryggan och i Källviken finns anpassade ingångar till badet." (läst 2026-09-27)
      // KÄLLA: https://skargardsstiftelsen.se/omraden/grinda/ — "slå dig ner på de solvarma klipporna vid Källviken" (läst 2026-09-27)
      'Det finns barnvänliga bad vid både södra och norra ångbåtsbryggan och ett tredje bad vid Källviken, där klipporna ligger i solen. Alla badplatser har torrdass, och i Källviken finns anpassade ingångar till badet. Grillplatser finns vid södra ångbåtsbryggan och vid tältplatsen.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "medföra okopplad hund"; "Tältning är endast tillåten på tältplatsen nära norra bryggan."; "I Sverige har vi allemansrätt, det innebär att du får utöva friluftsliv och röra dig fritt i naturen så länge du inte stör eller förstör." (läst 2026-09-27)
      'Reservatsföreskrifterna sätter ramarna. Hund ska hållas kopplad, och tältning är endast tillåten på tältplatsen nära norra bryggan. I övrigt gäller allemansrätten: du får röra dig fritt i naturen så länge du inte stör eller förstör.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/grinda/ — "Grinda lanbruk där kor, hästar och andra djur betar och bidrar till det levande kulturlandskapet" (läst 2026-09-27)
      // KÄLLA: https://skargardsstiftelsen.se/var-verksamhet/jordbruken-och-angarna/ — "Grinda lantbruk" (läst 2026-09-27)
      'På Grinda finns ett jordbruk, Grinda lantbruk, där kor, hästar och andra djur betar och bidrar till det levande kulturlandskapet. Det är ett av Skärgårdsstiftelsens jordbruk i skärgården.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/grinda/ — "Sommartid finns även café, lanthandel och aktiviteter för både stora och små."; "Under sommaren arrangeras aktiviteter som musikkvällar, regattor och grillkvällar." (läst 2026-09-27)
      // KÄLLA: https://grinda.se/mat-fest/lanthandel-cafe/ — "Vi är stolta att kunna erbjuda nybakat bröd och ljuvliga bullar varje dag under högsäsong, fr o m Midsommarveckan." (läst 2026-09-27)
      'Sommartid finns café, lanthandel och aktiviteter för både stora och små, bland annat musikkvällar, regattor och grillkvällar. Från midsommarveckan bakar lanthandeln nytt bröd och bullar varje dag.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Grinda ligger omedelbart söder om Ljusterö."; "Grinda är en strategisk hamn för båtfolket och har många dagsgäster." (läst 2026-09-27)
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Grinda är ett av Waxholmsbolagets populäraste utflyktsmål och det går täta turer till ön." (läst 2026-09-27)
      'Grinda ligger omedelbart söder om Ljusterö. Länsstyrelsen kallar ön en strategisk hamn för båtfolket med många dagsgäster, och för Waxholmsbolaget är den ett av de populäraste utflyktsmålen, med täta turer.',
      // KÄLLA: https://grinda.se/ — "Tredje helgen i oktober har vi vårt återkommande tema och event Eld!"; "När löven börjar falla och färgerna skiftar i rostrött och violett."; "tänder vi öppna brasan i Wärdshuset stora salong" (läst 2026-09-27)
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Under sommaren går det flera turer till Grinda varje dag, men Grinda har trafik året om." (läst 2026-09-27)
      'Ön har trafik året om, och wärdshuset håller igång även på hösten. Då tänds brasan i wärdshusets stora salong, och tredje helgen i oktober ordnar Grinda Wärdshus eventet Eld med middagsbuffé, fackeltåg och eldshow.',
      // KÄLLA: https://grinda.se/en/accommodation/sea-lodge/ — "At Grinda we like dogs, as long as they do not disturb other guests."; "We have dog-friendly rooms" (läst 2026-09-27)
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ — "Ett begränsat antal djurrum finns." (läst 2026-09-27)
      'Hundar är välkomna så länge de inte stör andra gäster. Grinda Sea Lodge har hundvänliga rum, och STF-boendet har ett begränsat antal djurrum. I reservatet ska hunden vara kopplad.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Syftet med reservatet ska vara att bevara ett lättillgängligt skärgårdsområde av stor betydelse för friluftslivet."; "Stockholms stad tog över Grinda 1947 och ön har därefter blivit ett viktigt friluftsområde med bland annat uthyrningsstugor och tältplats." (läst 2026-09-27)
      'Reservatets syfte är formulerat i klartext: att bevara ett lättillgängligt skärgårdsområde av stor betydelse för friluftslivet, samtidigt som natur- och kulturmiljövärdena skyddas. Att ön är allmän egendom är äldre än reservatet. Stockholms stad tog över Grinda 1947, och ön har därefter blivit ett viktigt friluftsområde med bland annat uthyrningsstugor och tältplats.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html, naturreservat Grinda — "Utkiksplatsen uppe på Klubbudden är öns högsta punkt med 35 m." / "En cirka 2,5 km lång natur- och kulturstig leder runt öns sydöstra del. Stigen startar vid gården Hemviken."
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Du kan till exempel promenera längs med Grindastigen som tar dig förbi Klubbudden, öns högsta punkt." (läst 2026-09-27)
      'Utkiksplatsen uppe på Klubbudden är öns högsta punkt med 35 meter. Natur- och kulturstigen är cirka 2,5 kilometer lång, leder runt den sydöstra delen och startar vid gården Hemviken. Waxholmsbolaget beskriver Grindastigen som vägen förbi Klubbudden.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Merparten av öarna består av hällmarker och barrskog som är måttligt påverkad av skogsbruk. Inslaget av lövträd är bitvis ganska stort. Odlingsmarker återfinns på Grindas centrala delar."; "Besök också Grinda Stugby, Grinda gård"; "Stigen startar vid gården Hemviken." (läst 2026-09-27)
      'Landskapet är typiskt för mellanskärgården: hällmarker och barrskog som Länsstyrelsen beskriver som måttligt påverkad av skogsbruk, med bitvis stort inslag av lövträd och odlingsmarker på öns centrala delar. På ön finns gårdarna Hemviken och Grinda gård.',
      // KÄLLA: https://skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/ — "Den vackra jugendvillan i sten är ritad av Ernst Stenhammar och stod klar 1908."; "Efter 1944 fungerade huset under en tid som behandlingshem och barnkoloni." (läst 2026-09-27)
      // KÄLLA: https://skargardsstiftelsen.se/aktuellt/vara-hus-grinda/ — "Resan börjar genom Lindalssundet"; "Kring förra sekelskiftet uppfördes här några av skärgårdens mest påkostade sommarnöjen"; "Mitt i denna idyll lät Henrik Santesson, Nobelstiftelsens första vd, 1906 uppföra den stora sommarvillan som i dag är Grinda Wärdshus."; "med pensionatsverksamhet, badgäster, ridläger, barnkollo och dagens värdshus" (läst 2026-09-27)
      'Wärdshuset var från början ett privat sommarnöje. Kring förra sekelskiftet byggdes några av skärgårdens mest påkostade sommarvillor längs Lindalssundet, och 1906 lät Henrik Santesson, Nobelstiftelsens förste vd, uppföra den stora villan på Grinda. Jugendvillan i sten ritades av Ernst Stenhammar och stod klar 1908. Efter 1944 var huset en tid behandlingshem och barnkoloni, och det har också rymt pensionat, badgäster och ridläger innan det blev dagens värdshus.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "för längre tid än två dygn i följd förankra båt vid samma strand"; "förankra båt längs de strandsträckor som markerats med heldragen linje på karta"; "framföra motordrivet motorfordon annat än på anvisade vägar"; "landa med luftfarkost på annat än anvisad plats"; "på ett för andra störande sätt använda musikanläggning eller musikinstrument." (läst 2026-09-27)
      'Utöver koppeltvång och tältplats finns fler regler värda att känna till. Du får inte ligga förankrad vid samma strand mer än två dygn i följd, och inte alls längs de strandsträckor som är markerade med heldragen linje på reservatskartan. Det är också förbjudet att köra motorfordon utanför anvisade vägar, att landa luftfarkost på annan än anvisad plats och att spela musik eller använda musikanläggning på ett sätt som stör andra.',
      // KÄLLA: https://skargardsstiftelsen.se/om-skargardsstiftelsen/var-historia/ — "Stiftelsen Stockholms skärgård bildas den 20 mars 1959."; "Samma år skänker Stockholm stad alla sina skärgårdsmarker till Skärgårdsstiftelsen och vårt markinnehav fördubblas från ca 7 000 ha till ca 14 000 ha mark."; "idag är vi Stockholms läns tredje största markägare" (årtalet 1998 står som rubrik närmast ovanför) (läst 2026-09-27)
      // KÄLLA: https://skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/ — "Skärgårdsstiftelsen äger cirka tvåtusen byggnader i Stockholms skärgård." (läst 2026-09-27)
      'Förvaltaren har en egen historia. Stiftelsen Stockholms skärgård bildades den 20 mars 1959, och 1998 fördubblades markinnehavet när Stockholms stad skänkte sina skärgårdsmarker — från omkring 7 000 till omkring 14 000 hektar. Stiftelsen beskriver sig i dag som Stockholms läns tredje största markägare, och äger cirka tvåtusen byggnader i skärgården.',
    ],
    facts: {
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Resan från Strömkajen tar ungefär en och en halv timme."; "tabell 11" (läst 2026-09-27)
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/s11.pdf — "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026"; "11A STOCKHOLM – VAXHOLM – GRINDA – BODA – SOLLENKROKA" — måndag–torsdag t.ex. tur 1402 Strömkajen 07.45, Södra Grinda 09.15 (1 h 30 min); tur 1203 10.40–12.50; tur 1313 13.00–14.45 (tidtabellens siffror är satta i ett eget typsnitt som pdftotext inte avkodar; tiderna är avlästa med teckenmappning, se grinda.md) (läst 2026-09-27)
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026"; "11A STOCKHOLM – VAXHOLM – GRINDA – BODA – SOLLENKROKA" — från 14 september måndag–torsdag tur 1341 08.15–10.10 Södra Grinda, tur 1201 10.00–12.40 Norra Grinda, tur 1303 14.45–17.00 Södra Grinda (tidtabellens siffror är satta i ett eget typsnitt som pdftotext inte avkodar; tiderna är avlästa med teckenmappning, se grinda.md) (läst 2026-09-27)
      // KÄLLA: https://grinda.se/hamn-mack/gasthamn/ — "En trygg gästhamn för 100 båtar" (läst 2026-09-27)
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Grinda är en strategisk hamn för båtfolket och har många dagsgäster." (läst 2026-09-27)
      travel_time: 'ca 1 h 30 min–2 h 40 min med Waxholmsbåt från Strömkajen (linje 11)',
      character: 'Naturreservat med wärdshus, stigar och gästhamn för 100 båtar',
      season: 'Året runt (båt och sjömack); café och Sea Lodge sommartid',
      best_for: 'Båtfolk, dagsutflykt, vandring, barnfamiljer',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "En cirka 2,5 km lång natur- och kulturstig leder runt öns sydöstra del. Stigen startar vid gården Hemviken."; "Utkiksplatsen uppe på Klubbudden är öns högsta punkt med 35 m." (läst 2026-09-27)
      // KÄLLA: https://skargardsstiftelsen.se/omraden/grinda/ — "Stockholm Archipelago Trail på Grinda" (läst 2026-09-27)
      { icon: '🚶', name: 'Vandring', desc: 'Natur- och kulturstigen är cirka 2,5 km och går runt öns sydöstra del från gården Hemviken. Klubbudden, 35 meter, är öns högsta punkt och har en utkiksplats. Stockholm Archipelago Trail har också en etapp på Grinda.' },
      // KÄLLA: https://grinda.se/hamn-mack/sakerhet-service/ — "uthyrning av kajaker" (läst 2026-09-27)
      // KÄLLA: https://grinda.se/en/accommodation/sea-lodge/ — "The outdoor gym, kayaks, canoes, stand-up paddleboards and a large part of our walking and nature trails also start from here." (läst 2026-09-27)
      { icon: '🛶', name: 'Kajak & SUP', desc: 'Hamnkontoret i gästhamnen hyr ut kajaker, och vid Grinda Sea Lodge på södra sidan finns kajaker, kanoter och SUP-brädor.' },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Grinda har fina barnvänliga bad både vid den södra och norra ångbåtsbryggan. Ytterligare ett fint bad finns vid Källviken." (läst 2026-09-27)
      // KÄLLA: https://grinda.se/en/accommodation/sea-lodge/ — "For those who want to swim, there are wonderful sandy beaches, rock pools, saunas for rent directly by the water" (läst 2026-09-27)
      { icon: '🏊', name: 'Bad', desc: 'Barnvänliga bad vid både södra och norra ångbåtsbryggan och ett bad vid Källviken. Vid Grinda Sea Lodge finns sandstränder, klippbad och bastu att hyra vid vattnet.' },
      // KÄLLA: https://grinda.se/hamn-mack/gasthamn/ — "En trygg gästhamn för 100 båtar"; "Som övernattande gäst har du tillgång till el, dusch, toalett och hushållssop- och septitank-tömning." (läst 2026-09-27)
      // KÄLLA: https://skargardsstiftelsen.se/omraden/grinda/ — "Gästhamn finns i Hemviken och naturhamn i Hästholmssundet på öns södra sida." (läst 2026-09-27)
      { icon: '⛵', name: 'Segling', desc: 'Gästhamnen i Hemviken har plats för 100 båtar med el, dusch, toalett och sop- och septitanktömning. Naturhamn finns i Hästholmssundet på öns södra sida.' },
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ — "På hamnkrogen Framfickan bjuds det på enklare, men lika god mat, levande musik och en magnifik solnedgång." (läst 2026-09-27)
      // KÄLLA: https://grinda.se/mat-fest/wardshuset/ — "Det anrika huset har blickat ut över Saxarfjärden sedan 1906" (läst 2026-09-27)
      { icon: '🌅', name: 'Solnedgång vid hamnen', desc: 'Framfickans trädäck vid gästhamnen är enligt STF platsen för levande musik och solnedgång. Wärdshusets terrass blickar ut över Saxarfjärden.' },
    ],
    // KÄLLA: https://grinda.se/en/accommodation/ — "We have 27 different cottages in our charming cottage village."; "Bring your own tent and pitch it in our large camping area. No need to book a pitch here."; "Company registration number: 556251-4272" (läst 2026-09-27)
    // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ — "Det anrika Grinda Wärdshus erbjuder vällagad klassisk skärgårdsmat. Bo på det intilliggande hotellet eller på Grinda Sea Lodge på öns södra sida." (läst 2026-09-27)
    accommodationIntro: 'Grinda Wärdshus driver boendet på ön: hotellrum intill wärdshuset, Grinda Sea Lodge på södra sidan, en stugby med 27 stugor och en tältplats. Allt går att nå till fots från bryggorna.',
    accommodation: [
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ — "Hotellet erbjuder 28 moderna dubbelrum och två King Size rum"; "Rummen ligger i ett annex till Wärdshuset."; "Frukost ingår i rumspriset eller finns att köpa mot tillägg."; "STF Grinda Hotell & Sea Lodge" (läst 2026-09-27)
      { name: 'Grinda Wärdshus Hotell', type: 'Hotell', desc: '28 dubbelrum och två King Size-rum i ett annex till wärdshuset. Frukost ingår i rumspriset eller kan köpas till. Finns i STF:s utbud som STF Grinda Hotell & Sea Lodge.', websiteUrl: 'https://grinda.se' },
      // KÄLLA: https://grinda.se/en/accommodation/sea-lodge/ — "Grinda Sea Lodge is located in a scenic seaside location on the southern part of the island"; "a total of 44 beds in 4- and 2-bed rooms"; "Open for individuals and/or families during the high season, from midsummer starting Thursday to mid-August."; "Breakfast is included for those staying overnight" (läst 2026-09-27)
      { name: 'Grinda Sea Lodge', type: 'Pensionat', desc: 'Enkelt boende på öns södra sida med 44 bäddar i fyr- och tvåbäddsrum. Öppet för enskilda och familjer från midsommar till mitten av augusti; frukost ingår.', websiteUrl: 'https://grinda.se/en/accommodation/sea-lodge/' },
      // KÄLLA: https://grinda.se/en/accommodation/ — "We have 27 different cottages in our charming cottage village." (läst 2026-09-27)
      // KÄLLA: https://grinda.se/en/accommodation/camping/ — "the Stugby reception, Lilla Längan, at the southern jetty" (läst 2026-09-27)
      { name: 'Grinda Stugby', type: 'Stugor', desc: 'Stugby med 27 stugor av olika slag. Receptionen, Lilla Längan, ligger vid södra bryggan.', websiteUrl: 'https://grinda.se/en/accommodation/' },
      // KÄLLA: https://grinda.se/en/accommodation/camping/ — "beautifully located on Norra Grinda"; "No reservation is needed"; "the fee includes access to waste disposal, dry toilets and shower facilities" (läst 2026-09-27)
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Tältning är endast tillåten på tältplatsen nära norra bryggan." (läst 2026-09-27)
      { name: 'Grinda Camping', type: 'Camping', desc: 'Tältplatsen på norra Grinda är den enda platsen i reservatet där tältning är tillåten. Ingen förbokning krävs; avgiften ger tillgång till sophantering, torrdass och dusch.', websiteUrl: 'https://grinda.se/en/accommodation/camping/' },
    ],
    getting_there: [
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/s11.pdf — "11A STOCKHOLM – VAXHOLM – GRINDA – BODA – SOLLENKROKA"; "Södra Grinda"; "Norra Grinda" — sommaren 2026 måndag–torsdag cirka tio avgångar från Strömkajen, restid 1 h 30 min–2 h 20 min (tidtabellens siffror är satta i ett eget typsnitt som pdftotext inte avkodar; tiderna är avlästa med teckenmappning, se grinda.md) (läst 2026-09-27)
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/s14.pdf — "14A STOCKHOLM – VAXHOLM – SOLLENKROKA – MÖJA"; "Södra Grinda" (läst 2026-09-27)
      // KÄLLA: https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "Om du till exempel ska resa från Strömkajen till Grinda kan du resa på SL-biljett mellan Strömkajen och Vaxholm och sedan resa på en Waxhomsbolaget-biljett för sträckan mellan Vaxholm och Grinda."; "Lågsäsong: Vissa SL-biljetter gäller i hela trafiken 14 september–29 april"; "Om din SL-biljett gäller i 30 dagar eller mer kan du resa på den i hela Waxholmsbolagets trafik när det är lågsäsong." (läst 2026-09-27)
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: '1 h 30 min–2 h 40 min', desc: 'Linje 11 via Vaxholm till Södra eller Norra Grinda; sommartid stannar även bland annat linje 14 vid Södra Grinda. SL-biljett gäller till Vaxholm, och för sträckan Vaxholm–Grinda behöver du en Waxholmsbolaget-biljett. Under lågsäsong, 14 september–29 april, gäller SL-biljett för 30 dagar eller mer hela vägen.', icon: '⛴' },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Norra och södra bryggan trafikeras året om av Waxholmsbolaget och Cinderella." (läst 2026-09-27)
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ — "Ta Waxholmsbåten från Strömkajen vid Grand Hotell eller Cinderellabåten från Nybroviken vid Hotell Diplomat." (läst 2026-09-27)
      // KÄLLA: https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/grinda/ — "1,5 timmes båttur från Stockholm till Grinda genom skärgården"; "Avgår från Strandvägen, Nacka Strand, Vaxholm och fler stopp" (läst 2026-09-27)
      { method: 'Cinderellabåt', from: 'Strandvägen', time: 'ca 1,5 tim', desc: 'Strömmas Cinderellabåtar trafikerar också Grinda. Båten avgår från Strandvägen vid Nybroviken och stannar bland annat i Nacka Strand och Vaxholm.', icon: '⛴' },
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ — "Du kan även ta båt från bryggorna Lillsved eller Boda på Värmdö, därifrån tar båtturen endast cirka tio minuter till Grinda. Till dessa bryggor kan du ta dig med bil eller anslutningsbuss från Slussen." (läst 2026-09-27)
      { method: 'Båt från Värmdö', from: 'Lillsved eller Boda', time: 'ca 10 min', desc: 'Kortaste båtresan går från bryggorna Lillsved eller Boda på Värmdö. Dit kommer du med bil eller anslutningsbuss från Slussen.', icon: '⛴' },
      // KÄLLA: https://grinda.se/hamn-mack/gasthamn/ — "Det finns det 28 st bokningsbara platser i gästhamnen"; "Förtöjning sker på boj eller mooringlina." (läst 2026-09-27)
      // KÄLLA: https://grinda.se/hamn-mack/sakerhet-service/ — "El finns på alla bryggor, eftersom vi befinner oss på en ö så är tillgången begränsad 24 uttag / båtar kan använda elen samtidigt." (läst 2026-09-27)
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Gästhamnen har 28 bokningsbara platser; förtöjning sker på boj eller mooringlina. El finns på alla bryggor, men bara 24 båtar kan använda elen samtidigt.', icon: '⛵' },
    ],
    harbors: [
      // KÄLLA: https://grinda.se/hamn-mack/gasthamn/ — "En trygg gästhamn för 100 båtar"; "Som övernattande gäst har du tillgång till el, dusch, toalett"; "Det finns det 28 st bokningsbara platser i gästhamnen" (läst 2026-09-27)
      // KÄLLA: https://grinda.se/hamn-mack/sakerhet-service/ — "Kan du fylla på i dunk i anslutning till bryggorna." (läst 2026-09-27)
      // KÄLLA: https://grinda.se/hamn-mack/sjomack/ — "Bensin 98, Diesel, Gasol"; "Vår sjömack har öppet året om" (läst 2026-09-27)
      // KÄLLA: https://skargardsstiftelsen.se/omraden/grinda/ — "Gästhamn finns i Hemviken" (läst 2026-09-27)
      { name: 'Grinda Gästhamn (Hemviken)', desc: 'Gästhamn för ca 100 båtar med el, dusch, toalett, färskvatten och sjömack. 28 bokningsbara platser.', fuel: true, service: ['el', 'vatten', 'dusch', 'bränsle'] },
    ],
    restaurants: [
      // KÄLLA: https://grinda.se/mat-fest/wardshuset/ — "Grinda Wärdshus klassisk skärgårdsmat & stämning sedan 1906"; "Det anrika huset har blickat ut över Saxarfjärden sedan 1906"; "Gör din bordsreservation på Grinda Wärdshus" (läst 2026-09-27)
      // KÄLLA: https://skargardsstiftelsen.se/omraden/grinda/ — "Mitt på ön ligger" (läst 2026-09-27)
      { name: 'Grinda Wärdshus', type: 'Restaurang', desc: 'Wärdshus från 1906 med klassisk skärgårdsmat och utsikt över Saxarfjärden. Boka bord.', bookingUrl: 'https://grinda.se/boka-bord/', websiteUrl: 'https://grinda.se/mat-fest/wardshuset/' },
      // KÄLLA: https://grinda.se/mat-fest/framfickan/ — "hamnkrog, pizza & lättare rätter", "Gästhamnen ligger bara tio simtag bort", "endast drop-in"
      { name: 'Framfickan', type: 'Bistro', desc: 'Hamnkrog vid gästhamnen med pizza och lättare rätter. Endast drop-in.', websiteUrl: 'https://grinda.se/mat-fest/framfickan/' },
      // KÄLLA: https://grinda.se/mat-fest/lanthandel-cafe/ — "Nedanför Grinda Wärdshus ligger vår … Lanthandel med tillhörande cafédel … frukost och enklare luncher"
      { name: 'Grinda Lanthandel & Café', type: 'Café', desc: 'Lanthandel med café nedanför Wärdshuset. Frukost, enklare luncher och glass.', websiteUrl: 'https://grinda.se/mat-fest/lanthandel-cafe/' },
    ],
    tips: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html, naturreservat Grinda — föreskrifterna förbjuder att "medföra okopplad hund"
      'Hunden ska vara kopplad — det gäller hela reservatet, inte bara under häckningen.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html, naturreservat Grinda — "Tältning är endast tillåten på tältplatsen nära norra bryggan"
      'Ska du tälta måste du göra det på tältplatsen nära norra bryggan.',
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ — hotellet ligger cirka en kilometer från bryggorna, ungefär 15 minuters promenad
      'Räkna med en kvarts promenad från bryggan upp till hotellet och wärdshuset.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/grinda/ — badplatsen Källviken och barnvänliga badstränder
      'Källviken är ett bra val om ni badar med barn.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html, naturreservat Grinda — "Utkiksplatsen uppe på Klubbudden är öns högsta punkt med 35 m."
      'Gå upp på Klubbudden — 35 meter, öns högsta punkt, och den bästa överblicken du får på Grinda.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html, naturreservat Grinda — natur- och kulturstigen är cirka 2,5 km och startar vid gården Hemviken
      'Natur- och kulturstigen är bara 2,5 km och startar vid gården Hemviken.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html, naturreservat Grinda — förbjudet att förankra båt längre än två dygn
      'Kommer du med egen båt: du får inte ligga förankrad längre än två dygn.',
    ],
    related: ['sandhamn', 'finnhamn', 'vaxholm'],
    tags: ['gästhamn', 'värdshus', 'natur', 'segling', 'romantik'],
    // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html, naturreservat Grinda — "Storlek: 503 hektar varav land 178"
    // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html, naturreservat Grinda — "Tältning är endast tillåten på tältplatsen nära norra bryggan"
    // KÄLLA: https://skargardsstiftelsen.se/omraden/grinda/ — "Grinda lanbruk där kor, hästar och andra djur betar"
    did_you_know: 'Naturreservatet Grinda är 503 hektar stort — men bara 178 hektar av det är land. Tältning på Grinda är bara tillåten på tältplatsen nära norra bryggan. De öppna ängarna på Grinda hålls öppna av betande djur från Grinda lantbruk.',
    // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Resan från Strömkajen tar ungefär en och en halv timme."; "Under sommaren går det flera turer till Grinda varje dag, men Grinda har trafik året om."; "tabell 11" (läst 2026-09-27)
    // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ — "Du kan även ta båt från bryggorna Lillsved eller Boda på Värmdö, därifrån tar båtturen endast cirka tio minuter till Grinda."; "Till dessa bryggor kan du ta dig med bil eller anslutningsbuss från Slussen." (läst 2026-09-27)
    transport_meta: {
      from_city_min: 90,
      from_nearest_hub_min: 10,
      nearest_hub: 'Lillsved/Boda (Värmdö)',
      operator: 'Waxholmsbolaget',
      line: '11',
      frequency: 'Flera turer dagligen sommartid, trafik året om',
      booking_url: 'https://waxholmsbolaget.se',
      car_parking: 'Ingen bilväg till Grinda. Till bryggorna Lillsved och Boda på Värmdö kan du ta bil eller anslutningsbuss från Slussen.',
    },
    activity_meta: {
      // KÄLLA: Stockholm Archipelago Trail, https://stockholmarchipelagotrail.com/section/ (2026-09-17)
      vandring: { trails: 1, max_km: 9.8, sat: { km: 9.8, difficulty: 'Medel' } },
      // UPPSKATTNING: svårighetsgrad lätt eftersom det finns uthyrning på ön och gästhamn/naturhamn att utgå från; inget om vattnet är belagt.
      // KÄLLA: https://grinda.se/hamn-mack/sakerhet-service/ — "uthyrning av kajaker" (läst 2026-09-27)
      // KÄLLA: https://grinda.se/en/accommodation/sea-lodge/ — "kayaks, canoes, stand-up paddleboards" (läst 2026-09-27)
      kajak: { difficulty: 'lätt', rental: true, notes: 'Kajakuthyrning vid hamnkontoret i gästhamnen; kajaker, kanoter och SUP vid Grinda Sea Lodge.' },
      bad: {
        beaches: [
          // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Grinda har fina barnvänliga bad både vid den södra och norra ångbåtsbryggan." (läst 2026-09-27)
          'Barnvänligt bad vid södra ångbåtsbryggan',
          'Barnvänligt bad vid norra ångbåtsbryggan',
          {
            // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Ytterligare ett fint bad finns vid Källviken."; "Torrdass finns vid alla badplatser och vid södra ångbåtsbryggan och i Källviken finns anpassade ingångar till badet." (läst 2026-09-27)
            // KÄLLA: https://skargardsstiftelsen.se/omraden/grinda/ — "slå dig ner på de solvarma klipporna vid Källviken" (läst 2026-09-27)
            name: 'Källviken',
            type: 'klippbad',
            desc: 'Badplats med solvarma klippor. Här finns anpassade ingångar till badet och torrdass.',
          },
          {
            // KÄLLA: https://grinda.se/en/accommodation/sea-lodge/ — "For those who want to swim, there are wonderful sandy beaches, rock pools, saunas for rent directly by the water where we also have the practice dock" (läst 2026-09-27)
            // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ — "Till Grinda Sea Lodge är Södra bryggan närmast." (läst 2026-09-27)
            name: 'Stränderna vid Grinda Sea Lodge',
            type: 'sandstrand',
            desc: 'Sandstränder och klippbad vid Grinda Sea Lodge på öns södra sida, med bastu att hyra direkt vid vattnet.',
            directions: 'Närmast från Södra bryggan: gå cirka 200 meter till receptionen Lilla Längan och följ vägen genom stugbyn ungefär 300 meter.',
          },
        ],
      },
      fiske: false,
    },
    amenities: { toilets: true, shower: true, cafe: true, grocery: true, atm: false },
    dog_friendly: true,
    // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "medföra okopplad hund" (läst 2026-09-27)
    // KÄLLA: https://grinda.se/en/accommodation/sea-lodge/ — "At Grinda we like dogs, as long as they do not disturb other guests." (läst 2026-09-27)
    dog_notes: 'Naturreservat — koppeltvång gäller hela året i reservatet. Hundar är välkomna på boendet så länge de inte stör andra gäster.',
    insiderTips: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Förvaltare: Skärgårdsstiftelsen"; "framföra motordrivet motorfordon annat än på anvisade vägar" (läst 2026-09-27)
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Eftersom det är Skärgårdsstiftelsen som äger ön får du vara nästan överallt på ön" (läst 2026-09-27)
      'Grinda ägs och förvaltas av Skärgårdsstiftelsen, så du får röra dig nästan överallt på ön. Motorfordon får bara köras på anvisade vägar.',
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ — "Till hotellet och Wärdshuset är det ungefär lika nära från Södra Bryggan som från Norra bryggan"; "Till Grinda Sea Lodge är Södra bryggan närmast." (läst 2026-09-27)
      // KÄLLA: https://skargardsstiftelsen.se/omraden/grinda/ — "Gästhamn finns i Hemviken och naturhamn i Hästholmssundet på öns södra sida." (läst 2026-09-27)
      'Waxholmsbåtarna lägger till vid två bryggor, Norra och Södra Grinda, så kolla vilken din tur går till. Till wärdshuset är det ungefär lika långt från båda, men till Sea Lodge är Södra bryggan närmast. Gästhamnen ligger i Hemviken och naturhamnen i Hästholmssundet på södra sidan.',
      // KÄLLA: https://grinda.se/mat-fest/framfickan/ — "OBS! Framfickan har endast drop-in. Ej möjligt att boka bord" (läst 2026-09-27)
      // KÄLLA: https://grinda.se/mat-fest/wardshuset/ — "Gör din bordsreservation på Grinda Wärdshus" (läst 2026-09-27)
      'Framfickan tar bara drop-in och går inte att boka. Vill du vara säker på bord, boka på Grinda Wärdshus.',
    ],
    blogLinks: [
      { slug: 'kajak-stockholms-skargard-nyborjare', title: 'Kajak i Stockholms skärgård – guide för nybörjare' },
      { slug: 'barnfamilj-skargard', title: 'Skärgård med barn – flytväst, säkerhet och båtvett' },
    ],
    seasonal: {
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Under sommaren går det flera turer till Grinda varje dag, men Grinda har trafik året om." (läst 2026-09-27)
      // KÄLLA: https://grinda.se/hamn-mack/sjomack/ — "Vår sjömack har öppet året om" (läst 2026-09-27)
      // KÄLLA: https://grinda.se/en/accommodation/sea-lodge/ — "Open for individuals and/or families during the high season, from midsummer starting Thursday to mid-August." (läst 2026-09-27)
      // KÄLLA: https://grinda.se/mat-fest/lanthandel-cafe/ — "Vi är stolta att kunna erbjuda nybakat bröd och ljuvliga bullar varje dag under högsäsong, fr o m Midsommarveckan." (läst 2026-09-27)
      // KÄLLA: https://grinda.se/ — "Tredje helgen i oktober har vi vårt återkommande tema och event Eld!" (läst 2026-09-27)
      open: 'Året runt (båt och sjömack); fullt utbud midsommar–mitten av augusti',
      peak: 'Midsommar–mitten av augusti',
      best: 'Midsommar–augusti',
      bestReason: 'Från midsommar till mitten av augusti har Grinda Sea Lodge öppet för alla, lanthandeln bakar bröd varje dag och sommartabellen ger flest båtar. Vill du ha lugnare dagar går båten året om, och wärdshuset ordnar höstevent i oktober.',
      warning: 'Grinda Sea Lodge har bara öppet för enskilda från midsommar till mitten av augusti. Utanför högsäsongen går färre båtar – kolla tabell 11.',
      // UPPSKATTNING: månadsraden bygger på Sea Lodges högsäsong (midsommar–mitten av augusti), året-runt-trafiken och höstevent i oktober; öppettider för wärdshuset vintertid har vi inte hittat.
      months: ['limited','limited','limited','limited','limited','peak','peak','peak','open','limited','limited','limited'],
    },
  },
  // ─── FINNHAMN ────────────────────────────────────────────────
  {
    slug: 'finnhamn',
    name: 'Finnhamn',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌲',
    // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "Naturreservatet Finnhamn består av tre öar som sitter ihop." (läst 2026-09-27); https://skargardsstiftelsen.se/omraden/finnhamn/ — "en 10 kilometer lång vandring som tar dig genom skogar, öppna ängar, klipphällar" (läst 2026-09-27)
    tagline: 'Naturreservat på tre hopvuxna öar, med STF-vandrarhem och vandring över klipporna.',
    description: [
      // KÄLLA: https://skargardsstiftelsen.se/omraden/finnhamn/ — "Stora delar av Finnhamn är ett naturreservat med vandringsstigar som går genom lövskogar, ängar, levande jordbruksbygd och karg skärgårdsnatur." (Skärgårdsstiftelsen förvaltar området)
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "Naturreservatet Finnhamn består av tre öar som sitter ihop. Lilla och stora Jolpan samt Idholmen."
      'Naturreservatet Finnhamn består av tre öar som sitter ihop: Lilla och Stora Jolpan samt Idholmen. Stora delar av Finnhamn är naturreservat med vandringsstigar som går genom lövskogar, ängar, levande jordbruksbygd och karg skärgårdsnatur. Området förvaltas av Skärgårdsstiftelsen.',
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "Vandrarhemmet och de tillhörande stugorna har totalt 87 bäddar fördelade på 28 rum." / "Det vackra, gula huset, står högt och syns långväga."
      // KÄLLA: https://finnhamn.se/ — "Sedan sommaren 2024 är Finnhamns vandrarhem med tillhörande stugor anslutet till STF." (läst 2026-09-27)
      // KÄLLA: https://finnhamn.se/boende — "Vandrarhemmets idé bygger på att gästerna sköter sig själva och städar undan efter sig." (läst 2026-09-27)
      'Vandrarhemmet drivs av Finnhamns Arkipelag och är sedan sommaren 2024 anslutet till Svenska Turistföreningen som STF Finnhamns Vandrarhem. Det gula huset står högt och syns långväga. Vandrarhemmet och de tillhörande stugorna har totalt 87 bäddar fördelade på 28 rum. Det är självhushåll: gästerna städar och diskar efter sig, och det finns ingen städpersonal.',
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "en restaurang med takbar som har en vidunderlig utsikt" / "Enklare mat- och caféservering."
      // KÄLLA: https://finnhamn.se/boende — "Frukost för boende i Vandrarhemmet med tillhörande stugor ingår i priset under perioden midsommar till mitten augusti." (läst 2026-09-27)
      'På ön finns en restaurang med takbar och utsikt över vattnet, samt enklare mat- och caféservering. För vandrarhemsgäster ingår frukost från midsommar till mitten av augusti; övrig tid får man laga själv i gästköket.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/finnhamn/ — "Stockholm Archipelago Trail har en etapp på Finnhamn: en 10 kilometer lång vandring"
      // KÄLLA: https://skargardsstiftelsen.se/omraden/finnhamn/ — "en 10 kilometer lång vandring som tar dig genom skogar, öppna ängar, klipphällar och havsnära utsiktsplatser", "Vid sundet mellan Idholmen och Kålgårdsön finns roddbåtar som tar dig vidare mot Ingmarsö och Brottö" (läst 2026-09-27)
      'Vandring är öns huvudsakliga friluftsaktivitet. Stockholm Archipelago Trail har en etapp på Finnhamn: en tio kilometer lång vandring genom skogar, öppna ängar, klipphällar och havsnära utsiktsplatser. Vid sundet mellan Idholmen och Kålgårdsön ligger roddbåtarna på Båtluffarleden, som tar dig vidare mot Ingmarsö och Brottö.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/finnhamn/ — "möjlighet att hyra kajak och upptäcka de omgivande vikarna, kobbarna och skären i egen takt"
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "Kanot finns att hyra."
      // KÄLLA: https://finnhamn.se/aktiviteter — "Vi har 11 nybörjarkajaker som är enkla och stabila.", "Kajakerna finns nere vid Ragnars kiosk.", "lär dig paddla i den skyddade Paradisviken", "Vi har nio brädor" (läst 2026-09-27)
      'Kajak är ett naturligt komplement till vandringen. Det finns möjlighet att hyra kajak och upptäcka de omgivande vikarna, kobbarna och skären i egen takt, och kanot finns att hyra vid vandrarhemmet. Vid Ragnars kiosk hyrs elva stabila nybörjarkajaker och nio SUP-brädor ut, och den skyddade Paradisviken passar för att lära sig paddla.',
      // KÄLLA: Waxholmsbolaget linje 12, https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA" (läst 2026-09-27); linje 13, https://kund.printhuset-sthlm.se/wa/h13.pdf — "13A STOCKHOLM – VAXHOLM – BODA – SÖDRA INGMARSÖ – HUSARÖ", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026" (läst 2026-09-27). Strömkajen → Finnhamn: 09.00–12.40, 14.55–18.50, 08.30–11.35, 08.15–12.00 m.fl., dvs. ca 3–4 h.
      // KÄLLA: Waxholmsbolaget linje 10, https://kund.printhuset-sthlm.se/wa/h10.pdf — "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026" (läst 2026-09-27). Åsättra brygga → Finnhamn 30–55 min (t.ex. 08.30–09.25, 14.05–14.55). Tabell 10 går från Åsättra på Ljusterö, inte från Strömkajen som den gamla källraden påstod.
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "Waxholmsbolaget kör flera turer till Finnhamn per dag. Från Strömkajen, Värmdö Boda brygga/Lillsved, Vaxholm och Ljusterö." (läst 2026-09-27)
      'Direktbåten från Strömkajen (Waxholmsbolagets linje 12 och 13) tar ungefär tre till fyra timmar enligt tidtabellerna för vår och höst 2026. Båtar går också från Boda brygga och Lillsved på Värmdö, och från Åsättra på Ljusterö tar linje 10 bara 30–55 minuter. Många turer och bryggor måste beställas i förväg i SL-appen.',
      // KÄLLA: https://finnhamn.se/ — "flytbryggan på Söder Långholm som ligger avskilt på ön mittemot Finnhamn till öster" (läst 2026-09-27); https://finnhamn.se/hamnar — "På Söderlångholm har vi en flytbrygga", "Här finns sopmaja och mulltoa.", "Endast stäv- och akterförtöjning." (läst 2026-09-27); https://skargardsstiftelsen.se/omraden/finnhamn/ — "Söder Långholm passar dig som söker ett lugnare och mer naturnära läge" (läst 2026-09-27)
      'Söder Långholm ligger avskilt på ön mittemot Finnhamn, österut. Där finns en flytbrygga för stäv- och akterförtöjning, sopmaja och mulltoa, men ingen kiosk. Skärgårdsstiftelsen beskriver den som hamnen för den som söker ett lugnare och mer naturnära läge.',
      // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/angso-nationalpark/fakta-om-parken — Ängsö nationalpark inrättades 1909 (24 maj 1909), ligger i Norrtälje kommun, syfte "Bevara ett äldre odlingslandskap i väsentligen oförändrat skick", naturtyp "Skärgård, ängs- och hagmarker, blandskog"
      'Ängsö nationalpark i Norrtälje kommun inrättades 1909 och hör därmed till Sveriges första nationalparker. Syftet är att bevara ett äldre odlingslandskap i väsentligen oförändrat skick, och naturen består av skärgård, ängs- och hagmarker och blandskog.',
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "Lilla Jolpan har en urskogsliknande skog med över 100 år på nacken. Unikt för ön är mängden ekar och den gömda ängen med den vackra och sällsynta men giftiga blomman Tbast.", "Det finns hela fem olika arter av hackspett" (läst 2026-09-27)
      'Lilla Jolpan har en urskogsliknande skog som är över hundra år gammal, många ekar och en gömd äng där den sällsynta men giftiga tibasten växer. På öarna finns rådjur, grävling och räv, och hela fem arter av hackspett; med tur ser man havsörn jaga fisk.',
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "Du får inte plocka blommor eller cykla i naturen, men gärna på den slingrande grusvägen som går över hela ön." (läst 2026-09-27)
      'I reservatet får man inte plocka blommor eller cykla i naturen, men grusvägen som slingrar sig över hela ön går bra att cykla på.',
      // KÄLLA: https://finnhamn.se/boende — "Vid ankomst hämtar vi bagage vid ångbåtsbryggan vid alla båtar mellan kl 11:00 och 14:00" (läst 2026-09-27)
      'För den som bor på ön hämtar personalen bagage vid ångbåtsbryggan vid alla båtar mellan klockan 11 och 14 och kör det till vandrarhemmet eller stugbyn.',
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "Juni till augusti är allt öppet på Finnhamn och Waxholmsbolaget trafikerar bryggan med flera turer varje dag. Övriga tider är det en begränsad öppethållning." (läst 2026-09-27)
      'Juni till augusti är allt öppet på Finnhamn och båtarna går flera gånger om dagen. Övriga tider är öppethållandet begränsat, och vandrarhemmet tar under den kallare årstiden bara emot större grupper.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html, naturreservat Finnhamn — "Skyddat sedan: 2000", 684 hektar varav land 186 hektar, kommun Österåker, markägare och förvaltare Skärgårdsstiftelsen, karaktär "skärgård, marina miljöer och blandskog"; reservatet består av "tre delområden" öster om Ljusterö
      'Reservatet har siffror värda att känna till. Finnhamn är skyddat sedan 2000 och omfattar 684 hektar, varav 186 hektar land, i Österåkers kommun, med Skärgårdsstiftelsen som både markägare och förvaltare. Länsstyrelsen delar in det i tre delområden öster om Ljusterö och beskriver karaktären som skärgård, marina miljöer och blandskog.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html, naturreservat Finnhamn — syftet är att bevara "ett skärgårdsområde av stor betydelse för friluftslivet" och att återställa "delar av det historiska odlingslandskapet"; "Naturen på öarna är typisk för mellanskärgården med hällmarker, barrskogar och lövskogar samt odlingsmarker"
      'Syftet är dubbelt: att bevara ett skärgårdsområde av stor betydelse för friluftslivet och att återställa delar av det historiska odlingslandskapet. Naturen beskrivs som typisk för mellanskärgården, med hällmarker, barrskogar och lövskogar samt odlingsmarker. Det är därför ängarna ser ut som de gör — de är ett aktivt återställningsarbete, inte en rest.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html, naturreservat Finnhamn — föreskrifterna kräver kopplad hund, tillåter eldning endast på anvisade platser, förbjuder tältning längre än två dygn i följd och hänvisar tältning på Idholmen, Stora och Lilla Jolpan till anvisade platser, förbjuder att förtöja båt "längre tid än två dygn i följd" på samma plats, att landa luftfarkost utanför anvisad plats och att använda musikanläggning störande
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html — "elda annat än på anvisad plats", "på Idholmen, Stora och Lilla Jolpan tälta på annat än anvisad plats. På övriga platser gäller förbud att tälta längre tid än två dygn i följd", "för längre tid än två dygn i följd förankra båt vid samma strand" (läst 2026-09-27). Koppelkravet står inte längre bland reservatsföreskrifterna (ändrade 2025).
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "På Finnhamn är det koppeltvång året runt" (läst 2026-09-27)
      'Föreskrifterna är konkreta. Eldning är tillåten bara på anvisade platser. På Idholmen samt Stora och Lilla Jolpan får man bara tälta på anvisade tältplatser; på övriga platser i reservatet högst två dygn i följd. Samma tvådygnsgräns gäller för att förankra båt vid samma strand, och störande musikanläggning är förbjuden. Hundar ska enligt STF vara kopplade året runt.',
      // KÄLLA: https://skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/ — "På 1910-talet lät kolhandlare Wilhelm Rönström uppföra ett pampigt sommarhus på ön Stora Jolpan." (vandrarhemmet Utsikten, ritat av Ernst Stenhammar)
      // KÄLLA: https://skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/ — "Arkitekt var Ernst Stenhammar som ritat många ståtliga hus i skärgården, till exempel den stora jugendvillan på Grinda", "Idag är Utsikten vandrarhem." (läst 2026-09-27); https://finnhamn.se/boende — "Vandrarhemmet renoverades mellan åren 2014-2017" (läst 2026-09-27)
      'Det gula huset har ett namn och en byggherre. Vandrarhemmet Utsikten är ett sommarhus som kolhandlaren Wilhelm Rönström lät uppföra på Stora Jolpan på 1910-talet, ritat av Ernst Stenhammar — samma arkitekt som ritade jugendvillan på Grinda. Villan har varit privatbostad och pensionat, ägs i dag av Skärgårdsstiftelsen och renoverades 2014–2017.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/finnhamn/ — "På Idholmens gård finns, förutom kor, höns och andra djur, en gårdsbutik med grönsaker och produkter från de egna ekologiska odlingarna."
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html, naturreservat Finnhamn — Idholmen har uthyrningsstugor och gårdsbutik; Stora Jolpan har "vandrarhem, restaurang, tältplats och handelsbod"
      'Öarna har olika roller. På Idholmens gård finns kor, höns och andra djur samt en gårdsbutik med grönsaker och produkter från de egna ekologiska odlingarna, och här ligger också uthyrningsstugorna. Stora Jolpan är den med vandrarhem, restaurang, tältplats och handelsbod. Djuren är inte dekoration utan det som håller markerna öppna.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/kalgardson.html, naturreservat Kålgårdsön — "Skyddat sedan: 1974", 103 hektar varav land 100 hektar, Österåkers kommun, Skärgårdsstiftelsen markägare och förvaltare, naturtyper "skärgård, ängs- och betesmark, barrskog"; omfattar "merparten av Kålgårdsön som är östligaste delen av Ingmarsö, Bockholmen söder därom samt ytterligare ett par öar"; syftet är att "säkra ett område av stort värde för allmänhetens rörliga friluftsliv"
      // KÄLLA: https://skargardsstiftelsen.se/omraden/finnhamn/ — på Kålgårdsön har "de tidigare odlingsmarkerna ... röjts och hålls idag öppet genom betande djur från Idholmens gård"
      'Grannreservatet Kålgårdsön hör ihop med Finnhamn i praktiken. Det är skyddat sedan 1974 och omfattar 103 hektar, varav 100 hektar land, i Österåkers kommun med Skärgårdsstiftelsen som markägare och förvaltare, och täcker merparten av Kålgårdsön — östligaste delen av Ingmarsö — samt Bockholmen och ytterligare ett par öar. De tidigare odlingsmarkerna har röjts och hålls i dag öppna av betande djur från Idholmens gård. Naturtyperna är skärgård, ängs- och betesmark och barrskog.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/finnhamn/ — "Finnhamn är ett av de mest välbesökta utflyktsmålen i Stockholms skärgård", "Finnhamn nås med reguljär båttrafik från Stockholm, året runt", "café och kiosk, vandrarhem, stugor och tältplatser på anvisade områden", "badplatser med både sandstrand och klippor" (läst 2026-09-27)
      // KÄLLA: https://finnhamn.se/boende — "Bastun är belägen intill butik och krog. Bastun bokas genom vår" (läst 2026-09-27); https://finnhamn.se/ — "Med 70 hus, 270 bäddar och närmare tusen båtplatser" (läst 2026-09-27)
      'Skärgårdsstiftelsen beskriver Finnhamn som ett av de mest välbesökta utflyktsmålen i Stockholms skärgård, och ön nås året runt med reguljär båttrafik. Totalt finns 70 hus med 270 bäddar och närmare tusen båtplatser, och utöver vandrarhem och stugby finns tältplatser, tre gästhamnar, kafé och kiosk samt badplatser med både sandstrand och klippor. Bastun ligger intill butiken och krogen och bokas i förväg på Finnhamns webbplats.',
    ],
    facts: {
      // KÄLLA: Waxholmsbolaget linje 12 och 13, https://kund.printhuset-sthlm.se/wa/h12.pdf och https://kund.printhuset-sthlm.se/wa/h13.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026" (läst 2026-09-27): Strömkajen → Finnhamn ca 3–4 h. Linje 10, https://kund.printhuset-sthlm.se/wa/h10.pdf — "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA" (läst 2026-09-27): Åsättra → Finnhamn 30–55 min. Skargardstrafikanten.se (entusiastsajt) är struken.
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html — "Karaktär: skärgård, marina miljöer och blandskog"; https://finnhamn.se/boende — "Stugbyn byggdes under mitten 1950-tal och består idag av 30 stugor." (läst 2026-09-27)
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "Vandrarhemmet har öppet året runt men under den kallare årstiden endast för större grupper. Juni till augusti är allt öppet på Finnhamn" (läst 2026-09-27)
      // KÄLLA: https://skargardsstiftelsen.se/omraden/finnhamn/ — "har en etapp på Finnhamn: en 10 kilometer lång vandring", "möjlighet att hyra kajak" (läst 2026-09-27); https://finnhamn.se/ — "tre gästhamnar en ögrupp" (läst 2026-09-27)
      travel_time: 'Ca 3–4 tim från Strömkajen · 30–55 min från Åsättra (linje 10)',
      character: 'Naturreservat med vandrarhem, stugby och tre gästhamnar',
      season: 'Juni–augusti allt öppet; övrig tid begränsat',
      best_for: 'Vandring, kajak, båtfolk, vandrarhemsboende',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      // KÄLLA: https://skargardsstiftelsen.se/omraden/finnhamn/ — "en 10 kilometer lång vandring", "Vid sundet mellan Idholmen och Kålgårdsön finns roddbåtar" (läst 2026-09-27)
      { icon: '🚶', name: 'Vandring', desc: 'Stockholm Archipelago Trails tio kilometer långa etapp på Finnhamn, och Båtluffarleden med roddbåt över till Kålgårdsön.' },
      // KÄLLA: https://finnhamn.se/aktiviteter — "Kajakerna finns nere vid Ragnars kiosk.", "SUP finns nere vid Ragnars kiosk." (läst 2026-09-27)
      { icon: '🛶', name: 'Kajak & SUP', desc: 'Paddla till omgivande öar och naturhamnar. Kajak och SUP hyrs vid Ragnars kiosk i Paradisviken.' },
      // KÄLLA: https://skargardsstiftelsen.se/omraden/finnhamn/ — "På Finnhamn finns många badplatser med både sandstrand och klippor" (läst 2026-09-27); https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "kiosk vid Paradisvikens sandstrand" (läst 2026-09-27)
      { icon: '🏊', name: 'Bad', desc: 'Många badplatser med både sandstrand och klippor, bland annat sandstranden i Paradisviken.' },
      // KÄLLA: https://finnhamn.se/ — "Välj mellan klassiska gästhamnen Paradisviken med dryga hundra platser", "flytbryggan på Söder Långholm" (läst 2026-09-27)
      { icon: '⛵', name: 'Segling', desc: 'Tre gästhamnar: Paradisviken med drygt hundra platser, Vandrarhemsviken och flytbryggan på Söder Långholm.' },
    ],
    // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/; finnhamn.se/en/accommodation; boka.finnhamn.se; skargardsstiftelsen.se/omraden/finnhamn — tältning på två anvisade platser i reservatet; "fråga i lanthandeln" obelagt, borttaget (läst 2026-09-14)
    accommodation: [
      { name: 'STF Finnhamns Vandrarhem', type: 'Vandrarhem', desc: 'STF-vandrarhem i kolhandlarvillan från 1910-talet, flerbädds- och tvåbäddsrum.', websiteUrl: 'https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/' },
      // KÄLLA: https://finnhamn.se/boende — "består idag av 30 stugor", "Stugorna är belägna på Idholmen", "De 30 stugorna är fördelade på två och fyrbäddsstugor.", "Torrdass och dusch i separata hus", "Njut av vattnet, båtlivet och skärgården i en av sex små lägenheter." (läst 2026-09-27)
      { name: 'Stugby Finnhamn', type: 'Stugor', desc: 'Stugby från 1950-talet på Idholmen med 30 två- och fyrbäddsstugor med el och pentry; torrdass och dusch i separata hus. Därtill sex små lägenheter i Sjölängorna på Stora Jolpan. Boka tidigt.', websiteUrl: 'https://boka.finnhamn.se' },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html — "Tältning på anvisad plats.", "på Idholmen, Stora och Lilla Jolpan tälta på annat än anvisad plats" (läst 2026-09-27)
      { name: 'Tältplatser', type: 'Camping', desc: 'På Idholmen, Stora och Lilla Jolpan bara på anvisade tältplatser — Finnhamn är naturreservat.', websiteUrl: 'https://skargardsstiftelsen.se/omraden/finnhamn/' },
    ],
    getting_there: [
      // KÄLLA: https://sl.se/aktuellt/nyheter/sl-biljetter-i-en-del-av-waxholmsbolagets-trafik (SL-biljett/reskassa gäller bara Strömkajen–Vaxholm med omnejd); regionstockholm.se (SL-periodkort 30 dagar+ gäller alla linjer men bara lågsäsong 14/9–29/4).
      // KÄLLA: Waxholmsbolaget linje 12 och 13, https://kund.printhuset-sthlm.se/wa/h12.pdf och https://kund.printhuset-sthlm.se/wa/h13.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026" (läst 2026-09-27). Strömkajen 09.00 → Finnhamn 12.40 (linje 12), 08.15 → 12.00 (linje 13), 14.55 → 18.50: ca 3–4 h.
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: 'ca 3–4 h', desc: 'Linje 12 och 13 via Vaxholm. SL-biljett gäller till Vaxholm; resten kräver Waxholmsbolaget-biljett 30 april–13 september. 14 september–29 april gäller SL-periodbiljett på 30 dagar eller mer hela vägen.', icon: '⛴' }, // KÄLLA: https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor; sl.se/biljetter/sortiment-och-regler/biljetter-for-resor-med-waxholmsbolagets-skargardsbatar; läst 2026-09-19
      // KÄLLA: Waxholmsbolaget linje 10, https://kund.printhuset-sthlm.se/wa/h10.pdf — "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Beställ resan i SL-appen" (läst 2026-09-27). Åsättra brygga → Finnhamn 30–55 min, flera turer markerade b (beställs).
      { method: 'Waxholmsbåt', from: 'Åsättra (Ljusterö)', time: '30–55 min', desc: 'Linje 10 från Åsättra brygga, flera turer om dagen vår och höst. Många turer till Finnhamn måste beställas i SL-appen.', icon: '⛴' },
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html — "Gästhamn finns i Djupfladen, vid Söder-Långholm och nedanför vandrarhemmet.", "Naturhamnar vid Djupfladen, Söder-Långholm och Korsholm." (läst 2026-09-27)
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Gästhamnar i Paradisviken (Djupfladen), Vandrarhemsviken och på Söder Långholm; naturhamnar vid Djupfladen, Söder Långholm och Korsholm.', icon: '⛵' },
    ],
    harbors: [
      // KÄLLA: https://finnhamn.se/hamnar — "PARADISVIKEN – den stora gästhamnen", "här har du tillgång till vatten, el och gratis WiFi", "Närhet till Ragnars kiosk, bad, fotbollsplan m.m. 10 minuters promenad till Lanthandel och Krog.", "Sopmaja", "Mulltoa" (läst 2026-09-27); https://finnhamn.se/ — "Paradisviken med dryga hundra platser vid brygga utmed berget" (läst 2026-09-27)
      { name: 'Djupfladen (Paradisviken)', desc: 'Den stora gästhamnen med drygt hundra platser vid brygga utmed berget. Vatten, el och gratis wifi; nära Ragnars kiosk och bad, tio minuters promenad till lanthandel och krog.', fuel: false, service: ['vatten', 'el', 'wifi', 'sopor'] },
      // KÄLLA: https://finnhamn.se/hamnar — "Även kallade Båthusviken, här har vi ett 20 tal platser med el och vatten.", "Skärgårdsstiftelsen har en toatömning på platsen längst ut", "Hamnen ligger i nordvästläge." (läst 2026-09-27)
      { name: 'Vandrarhemsviken', desc: 'Även kallad Båthusviken: ett tjugotal platser med el och vatten nedanför vandrarhemmet, nära krog och lanthandel. Toatömning längst ut (08–18). Nordvästläge.', fuel: false, service: ['el', 'vatten'] },
    ],
    restaurants: [
      // KÄLLA: https://finnhamn.se/ata/ — "Finnhamns krog är belägen nere vid ångbåtsbryggan … klassisk inriktning på lunchen och en á la carte meny som varierar under säsongen"
      { name: 'Finnhamns krog', type: 'Restaurang', desc: 'Krog vid ångbåtsbryggan med klassisk lunch och säsongsvarierad à la carte.', websiteUrl: 'https://finnhamn.se/ata/' },
      // KÄLLA: https://finnhamn.se/ata/ — "Uppe på krogens tak ligger … Takbaren … nästan 150 sittplatser", öppen "Vid midsommar … till mitten augusti"
      { name: 'Takbaren', type: 'Bar', desc: 'Bar på krogens tak med ca 150 sittplatser. Öppen midsommar till mitten av augusti.', websiteUrl: 'https://finnhamn.se/ata/' },
      // KÄLLA: https://finnhamn.se/en/eat/ ("Ragnar's Kiosk, located at Paradise Bay beach").
      { name: 'Ragnars kiosk', type: 'Kiosk', desc: 'Glassbar och café vid Paradisviken. Här hyrs SUP, kajak och roddbåt, och här betalas hamnavgiften.', slug: 'ragnars-kiosk-finnhamn' },
      // KÄLLA: https://finnhamn.se/hamnar — "Glassbar och cafe. Uthyrning av SUP, kajak och roddbåt.", "Hamnavgift betalas i Ragnars kiosk, Lanthandeln eller Vandrarhemmet." (läst 2026-09-27); https://finnhamn.se/ — "Vandrarhemsviken, den mindre hamnen med ett 20 tal platser med närhet till krog och lanthandel" (läst 2026-09-27); https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "Proviant och i vissa fall friluftsutrustning finns till försäljning. Sortiment varierar." (läst 2026-09-27)
      { name: 'Lanthandeln', type: 'Handel', desc: 'Lanthandel nära Vandrarhemsviken och krogen. Här kan hamnavgiften betalas.' },
    ],
    tips: [
      // KÄLLA: https://finnhamn.se/hamnar — "På Söderlångholm har vi en flytbrygga", "Endast stäv- och akterförtöjning.", "Långsides förtöjning är förbjuden" (läst 2026-09-27)
      'På Söder Långholm, ön mittemot Finnhamn österut, finns en flytbrygga men ingen kiosk. Där gäller stäv- och akterförtöjning – långsides är förbjudet.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/finnhamn/ — "Stockholm Archipelago Trail har en etapp på Finnhamn: en 10 kilometer lång vandring"
      'Stockholm Archipelago Trails etapp på Finnhamn är 10 kilometer — räkna in den i dagsplaneringen.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/finnhamn/ — "möjlighet att hyra kajak"; svenskaturistforeningen.se — "Kanot finns att hyra."
      'Kajak och kanot går att hyra på ön om du vill ut bland kobbarna.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html — "på Idholmen, Stora och Lilla Jolpan tälta på annat än anvisad plats. På övriga platser gäller förbud att tälta längre tid än två dygn i följd" (läst 2026-09-27)
      'Tält: på Idholmen, Stora och Lilla Jolpan bara på de anvisade tältplatserna; på övriga platser i reservatet högst två dygn i följd.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html — "för längre tid än två dygn i följd förankra båt vid samma strand", "elda annat än på anvisad plats" (läst 2026-09-27); https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "På Finnhamn är det koppeltvång året runt", "Har du hund med kan den få springa av sig i hundrastgården" (läst 2026-09-27)
      'Egen båt får ligga högst två dygn i följd vid samma strand, och eldning är tillåten bara på anvisade platser. Hunden ska vara kopplad året runt, men det finns en inhägnad hundrastgård.',
      // KÄLLA: https://finnhamn.se/boende — "Bastun är belägen intill butik och krog. Bastun bokas genom vår", "Avbokning skall ske senast kl 18:00 dagen innan." (läst 2026-09-27)
      'Bastun ligger intill butiken och krogen och bokas i förväg på finnhamn.se; avbokning senast klockan 18 dagen innan.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/finnhamn/ — gårdsbutik på Idholmens gård med grönsaker och produkter från egna ekologiska odlingar
      'Gårdsbutiken på Idholmens gård säljer grönsaker och produkter från gårdens egna ekologiska odlingar.',
    ],
    related: ['grinda', 'ingmarso', 'ljustero'],
    tags: ['vandrarhem', 'natur', 'vandring', 'segling', 'lugnt'],
    // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "Naturreservatet Finnhamn består av tre öar som sitter ihop. Lilla och stora Jolpan samt Idholmen."
    // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "Vandrarhemmet och de tillhörande stugorna har totalt 87 bäddar fördelade på 28 rum."
    // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/angso-nationalpark/fakta-om-parken — Ängsö nationalpark inrättades 1909
    did_you_know: '"Finnhamn" är egentligen tre öar som sitter ihop: Lilla och Stora Jolpan samt Idholmen. Vandrarhemmet och stugorna rymmer tillsammans 87 bäddar fördelade på 28 rum. Ängsö nationalpark i Norrtälje kommun inrättades 1909 och är en av Sveriges första nationalparker.',
    insiderTips: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html — "Skyddat sedan: 2000", "Markägare: Skärgårdsstiftelsen", "Tältning på anvisad plats." (läst 2026-09-27); https://finnhamn.se/ — "Sedan sommaren 2024 är Finnhamns vandrarhem med tillhörande stugor anslutet till STF." (läst 2026-09-27)
      'Finnhamn ägs och förvaltas av Skärgårdsstiftelsen och är naturreservat sedan år 2000. Vandrarhemmet drivs av Finnhamns Arkipelag och är sedan 2024 anslutet till STF; tältning sker på anvisade platser.',
      // KÄLLA: https://finnhamn.se/boende — "Vid ankomst hämtar vi bagage vid ångbåtsbryggan vid alla båtar mellan kl 11:00 och 14:00", "Vid avfärd hämtar vi bagage vid vandrarhemmet och stugbyn kl 10:45" (läst 2026-09-27)
      'Bor du på ön behöver du inte bära: bagaget hämtas vid ångbåtsbryggan vid alla båtar mellan 11 och 14, och vid avfärd hämtas det vid vandrarhemmet och stugbyn kl. 10.45.',
      // KÄLLA: https://finnhamn.se/aktiviteter — "Vi har 11 nybörjarkajaker som är enkla och stabila.", "lär dig paddla i den skyddade Paradisviken", "Vi har nio brädor" (läst 2026-09-27)
      'Vid Ragnars kiosk hyrs elva nybörjarkajaker och nio SUP-brädor ut. Den skyddade Paradisviken är bra för att lära sig paddla.',
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "Juni till augusti är allt öppet på Finnhamn", "Övriga tider är det en begränsad öppethållning." (läst 2026-09-27); https://finnhamn.se/boende — "Bor ni i Stugbyn eller Sjölängorna kan ni köpa er frukost i butiken eller kiosken." (läst 2026-09-27)
      'Utanför juni–augusti har krog, kiosk och butik begränsade öppettider. Kolla finnhamn.se och ta med proviant om du kommer sent eller utanför högsäsong.',
    ],
    seasonal: {
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "Juni till augusti är allt öppet på Finnhamn och Waxholmsbolaget trafikerar bryggan med flera turer varje dag. Övriga tider är det en begränsad öppethållning." (läst 2026-09-27); https://skargardsstiftelsen.se/omraden/finnhamn/ — "ett av de mest välbesökta utflyktsmålen i Stockholms skärgård" (läst 2026-09-27)
      // KÄLLA: Waxholmsbolaget linje 10, 12 och 13 (https://kund.printhuset-sthlm.se/wa/h10.pdf, https://kund.printhuset-sthlm.se/wa/h12.pdf, https://kund.printhuset-sthlm.se/wa/h13.pdf) — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Beställ resan i SL-appen" (läst 2026-09-27). Många Finnhamnstider är markerade b (beställs).
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Juni–augusti',
      bestReason: 'Juni till augusti är allt öppet på Finnhamn och båtarna går flera gånger om dagen. Frukost ingår för vandrarhemsgäster från midsommar till mitten av augusti.',
      warning: 'Utanför juni–augusti är öppettiderna begränsade, och vår och höst måste många båtturer till Finnhamn beställas i förväg i SL-appen.',
      months: ['off','off','off','off','limited','open','peak','open','limited','off','off','off'],
    },
    activity_meta: {
      // KÄLLA: https://finnhamn.se/aktiviteter — "Kajakerna finns nere vid Ragnars kiosk.", "lär dig paddla i den skyddade Paradisviken" (läst 2026-09-27)
      kajak: { difficulty: 'lätt', rental: true, notes: 'Lär dig paddla i den skyddade Paradisviken eller ta en längre tur runt småskären. Uthyrning vid Ragnars kiosk.' },
      bad: {
        beaches: [
          {
            // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "kiosk vid Paradisvikens sandstrand" (läst 2026-09-27); https://finnhamn.se/hamnar — "Närhet till Ragnars kiosk, bad, fotbollsplan m.m." (läst 2026-09-27)
            name: 'Sandstranden i Paradisviken',
            type: 'sandstrand',
            desc: 'Sandstrand i Paradisviken, intill Ragnars kiosk och den stora gästhamnen.',
            directions: 'Vid gästhamnen i Paradisviken, tio minuters promenad från lanthandeln och krogen.',
          },
          {
            // KÄLLA: https://finnhamn.se/boende — "Grillmöjlighet finns precis utanför stugorna och badstrand på den västra sidan.", "Sjölängorna ligger ca 5 minuter från stora bryggan." (läst 2026-09-27)
            name: 'Badstranden vid Sjölängorna',
            type: 'badvik',
            desc: 'Badstrand på västra sidan vid Sjölängorna på Stora Jolpan, ungefär fem minuter från stora bryggan.',
          },
          // Klippbaden "norr om hamnen" och "söder om hamnen" (med djup, barnvänlighet och gryningstips) gick inte att belägga och är ersatta. Skärgårdsstiftelsen: "badplatser med både sandstrand och klippor".
        ],
      },
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-finnhamn/ (medelslinga 10,1 km; tre slingor plus Båtluffarleden) — ingen källa för exakt 12 km, justerat till belagd slinglängd.
      // KÄLLA: Stockholm Archipelago Trail, https://stockholmarchipelagotrail.com/section/ (2026-09-17)
      vandring: { trails: 4, max_km: 10.1, sat: { km: 10.1, difficulty: 'Medel' } },
    },
  },
  // ─── MÖJA ────────────────────────────────────────────────────
  {
    slug: 'moja',
    name: 'Möja',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: 'island',
    // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — "Kyrkan uppfördes 1768"; https://konsummoja.se/ — "Vi har livsmedelsbutikerna Coop Berg och Coop Långvik på Möja" (läst 2026-09-27)
    // KÄLLA: https://visitmoja.se/%c3%a4ta-och-handla-p%c3%a5-m%c3%b6ja/ — "Möja värdshus", "Möja bageri"; https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — "Med sina fina landsvägar är Möja en utmärkt ö att cykla på" (läst 2026-09-27). Bilfri och äkta skärgård saknade källa: ön har landsvägar, bilar och sommartid PerMobilen.
    tagline: 'Byar, kyrka och lanthandel i Stockholms mellersta skärgård.',
    seoTitle: 'Möja 2026 – båt dit, värdshus, bageri och vandring',
    seoDescription: 'Guide till Möja: båt från Strömkajen, Sollenkroka eller Boda, värdshus och bageri i Berg, cykel, vandring i Björndalen och fem gästhamnar. Hur du tar dig dit och vad som finns på ön.',
    description: [
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — "Huvudöarna Möja och Södermöja har cirka 250 bofasta"; byarna Berg, Långvik, Ramsmora, Löka och Södermöja
      'Möja ligger i Stockholms mellersta skärgård. Huvudöarna Möja och Södermöja har omkring 250 bofasta. Ön är avlång i nord-sydlig riktning, och landskapet växlar mellan skog, öppen mark och klippor längs hela sträckan.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — "Öns skola finns i Berg ... och har ca 25 elever från förskola till klass 9"
      'Öns skola ligger i Berg och har ett tjugofemtal elever från förskola till årskurs 9.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — "Kyrkan uppfördes 1768" (renoverad på 1880-talet)
      'Möja kyrka uppfördes 1768 och renoverades på 1880-talet.',
      // KÄLLA: Waxholmsbolaget linje 14, https://kund.printhuset-sthlm.se/wa/h14.pdf — "14A STOCKHOLM – VAXHOLM – SOLLENKROKA – MÖJA", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026" (läst 2026-09-27). Strömkajen → Berg (Möja) utan byte: 3 h 10 min (sö 11.00–14.10) till 4 h 10 min (må–to 14.45–18.55); Sollenkroka → Berg 40–75 min (t.ex. 09.15–09.55, 11.15–12.30).
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/moja — "Båtar går året runt från Boda brygga på Värmdö till flera bryggor på Möja", "Vissa turer går också direkt från Strömkajen ut till Möja utan byte", "De mest trafikerade bryggorna på Möja är Möjaström och Berg, som båda ligger på öns sydligaste del" (läst 2026-09-27)
      // KÄLLA: SL buss 434, https://kund.printhuset-sthlm.se/sl/v433_434.pdf — "434 Slussen–Vindö", "Sollenkroka brygga" (Slussen 07.48 → Sollenkroka brygga 09.00, måndag–fredag); SL buss 438, https://kund.printhuset-sthlm.se/sl/v438.pdf — "438 Slussen–Boda" (Slussen 09.20 → Boda brygga 10.10) (läst 2026-09-27)
      'Till Möja reser man med båt. Waxholmsbolagets linje 14 går från Strömkajen via Vaxholm, och vissa turer går hela vägen ut utan byte – enligt tidtabellen för vår och höst 2026 tar det mellan drygt tre och drygt fyra timmar till Berg. Snabbare är SL-buss 434 från Slussen till Sollenkroka brygga, drygt en timme, och båten därifrån, 40–75 minuter till Berg. Båtar går också året runt från Boda brygga på Värmdö, dit buss 438 går från Slussen. De mest trafikerade bryggorna är Möjaström och Berg på öns sydligaste del.',
      // KÄLLA: https://konsummoja.se/ — Möja Konsumtionsförening driver Coop Berg, "Den stora butiken på Möja och som har öppet året runt", samt en obemannad automatbutik i Långvik
      'Möja Konsumtionsförening driver Coop i Berg, som håller öppet året runt, och en obemannad automatbutik i Långvik.',
      // KÄLLA: https://visitmoja.se/%c3%a4ta-och-handla-p%c3%a5-m%c3%b6ja/ — Möja värdshus, Hamnbaren, Les Poissonniers de Möja, Jeppes, Hamncafét, Möja bageri; Hamncafét: "Café med glass och bullar samt cykeluthyrning"
      // KÄLLA: https://visitmoja.se/%c3%a4ta-och-handla-p%c3%a5-m%c3%b6ja/ — "Du kan äta på restauranger året runt på Möja och sommartid dubbleras antalet matställen, då finns även pizzeria, glasskiosk, bageri och fiskbod." (läst 2026-09-27)
      'Det går att äta på restaurang året runt på Möja, och sommartid dubbleras antalet matställen med pizzeria, glasskiosk, bageri och fiskbod. På ön finns Möja värdshus, Hamnbaren, Les Poissonniers de Möja, Jeppes, Hamncafét och Möja bageri. Hamncafét serverar glass och bullar och hyr ut cyklar.',
      // KÄLLA: https://www.rolandsvenssonmuseet.se/ — "Roland Svensson (1910-2003)"; https://www.rolandsvenssonmuseet.se/roland-svensson-museet/ — "målar- och skrivarhörnorna. Dessa har sedan Rolands bortgång 2003 bevarats i hans gamla ateljé på Tornö och allt är nu flyttat till det nybyggda museet vid Ramsmora ångbåtsbrygga, där även en glasad vägg ger ett vidunderligt perspektiv"; "Museet öppnade 2014" (läst 2026-09-19)
      'Roland Svensson-museet ligger vid Ramsmora brygga. Roland Svensson (1910–2003) skildrade skärgården och dess människor i bild och text, och hans målar- och skrivarhörnor flyttades 2014 från ateljén på Tornö till det nybyggda museet. En glasvägg vetter ut mot det landskap han arbetade med.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — Björndalens naturreservat, Storö-Bockö-Lökaö naturreservat och Granholmens naturreservat
      'Tre naturreservat ligger i och kring Möja: Björndalens, Storö-Bockö-Lökaö och Granholmens.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — "För Möjaborna var fisket den mest betydelsefulla inkomstkällan till långt in på 1980-talet"
      // KÄLLA: https://visitmoja.se/g%C3%A4sthamnar/ — "Ön har flera gamla", "charmiga fiskehamnar", "som erbjuder gästplatser" (läst 2026-09-27)
      'Fisket var Möjabornas viktigaste inkomstkälla långt in på 1980-talet. De gamla fiskehamnarna finns kvar, och flera av dem tar i dag emot gästande båtar.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Möja.pdf — "Det var troligen under vikingatiden som Möja fick bofast befolkning"; Möja nämns som "Myghi" i Kung Valdemars seglingsbeskrivning från 1200-talet; ön är "cirka 6 km lång och 4 km bred"; "Här finns tre insjöar"; landhöjningen "30 - 40 centimeter per hundra år"
      'Möja fick troligen bofast befolkning redan under vikingatiden, och ön nämns som Myghi i Kung Valdemars seglingsbeskrivning från 1200-talet. Själva ön är ungefär sex kilometer lång och fyra kilometer bred och rymmer tre insjöar. Landhöjningen i Stockholms skärgård ligger på 30–40 centimeter per hundra år, så strandlinjen du ser är en färskvara i geologisk mening.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — år 1719 anföll den ryska flottan kusten; "all bebyggelse blev nedbränd förutom det lilla kapellet i Berg"
      // KÄLLA: https://stockholmslansmuseum.se/besoksmal/moja-bockon-och-lokaon/ — "Ryssugnarna som ryska soldater lagade mat i under sina härjningar i skärgården 1719" återstår fortfarande
      'När den ryska flottan härjade kusten 1719 brändes all bebyggelse på Möja utom det lilla kapellet i Berg. Spåren finns kvar i landskapet i form av ryssugnar — de eldstäder där de ryska soldaterna lagade mat.',
      // KÄLLA: https://stockholmslansmuseum.se/besoksmal/moja-bockon-och-lokaon/ — "Längs Möjas och Södermöjas östra kust har det funnits skyddade hamnvikar som lockat till sig bebyggelse ända sedan medeltiden"; "Vid 1800-talets mitt fanns där 74 gårdar"; "Det goda fisket var basen för försörjningen"; jordgubbsodlingen blomstrade "från sekelskiftet 1900 och en bit in på 1970-talet"; "Möja fick fast ångbåtsförbindelse 1906"
      'De skyddade hamnvikarna längs Möjas och Södermöjas östra kust har lockat bebyggelse sedan medeltiden, och vid 1800-talets mitt fanns 74 gårdar där. Fisket var basen för försörjningen, men från sekelskiftet 1900 och en bit in på 1970-talet var jordgubbsodling en blomstrande näring på ön. Fast ångbåtsförbindelse kom 1906.',
      // KÄLLA: https://www.svenskakyrkan.se/djuro-moja-namdo/moja-kyrka — "Möja kyrka är från 1768 och uppfördes av byggmästare Carl Örn"; "Tornet är från 1885"; "Ingången till tornet har dörrar som är från 1924"; renovering påbörjad 1924; altartavla föreställande Kristus på korset med ram från 1700-talets senare hälft; "Kyrkogården anlades omkring 1755"; nuvarande orgel byggd 1982 av Walter Thür
      'Möja kyrka uppfördes av byggmästaren Carl Örn, och delarna är från olika tider: tornet är från 1885 och dörrarna in i det från 1924, samma år som den renovering påbörjades som gav kyrkan dess nuvarande utseende. Ovanför altaret hänger en tavla med Kristus på korset i en ram från 1700-talets senare hälft. Kyrkogården anlades omkring 1755, och den orgel som står där i dag byggdes 1982 av Walter Thür.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/storo-bocko-lokao.html — skyddat sedan 1972; "6 045 hektar varav land 1 892 hektar"; Värmdö kommun; förvaltare Skärgårdsstiftelsen; syfte att "säkra ett för allmänhetens friluftsliv värdefullt skärgårdsområde samt att skydda och bibehålla områdets värdefulla växt- och djurvärld"; björk dominerar yttersta öarna, hällmarkstallskog i övrigt; arter svärta, vigg, ejder, roskarl, labb, tobisgrissla
      'Storö-Bockö-Lökaö naturreservat öster om Möja är stort: 6 045 hektar, varav 1 892 hektar land, skyddat sedan 1972 och förvaltat av Skärgårdsstiftelsen. Syftet är att säkra ett för allmänhetens friluftsliv värdefullt skärgårdsområde och att skydda områdets växt- och djurvärld. På de yttersta öarna dominerar björk, längre in hällmarkstallskog, och bland fåglarna nämns svärta, vigg, ejder, roskarl, labb och tobisgrissla.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/moja-bjorndalen.html — skyddat sedan 1992, utvidgat 1998; 143 hektar; Värmdö; förvaltare Skärgårdsstiftelsen; syfte "bevara och vårda ett för faunan värdefullt skogsområde samt att låta delar av skogsmarken utvecklas mot naturskog"; hällmarkstallskog, barr- och blandskog, myrmarker; anordningar rast-/övernattningsstuga och torrdass; tältning och eldning förbjuden
      'Möja-Björndalens naturreservat på öns norra del är 143 hektar, skyddat sedan 1992 och utvidgat 1998. Syftet är att bevara ett för faunan värdefullt skogsområde och att låta delar av skogsmarken utvecklas mot naturskog, och terrängen växlar mellan hällmarkstallskog, barr- och blandskog och myrmarker. Här finns rast- och övernattningsstuga och torrdass, men tältning och eldning är förbjudet.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/granholmen.html — "Skyddat sedan: 1978, utvidgat 2018"; "Storlek: 39 hektar varav land 18 hektar"; Värmdö; Skärgårdsstiftelsen; arter "blodnäva, småborre, darrgräs, jungfrulin, vildlin och tvåblad"; naturhamnen Munkhamnen; tältning högst två dygn per plats
      'Granholmens naturreservat är litet: 39 hektar, varav 18 hektar land, skyddat sedan 1978 och utvidgat 2018. Det som gör det värt besväret är floran i de öppna betesmarkerna — blodnäva, småborre, darrgräs, jungfrulin, vildlin och tvåblad. Naturhamnen Munkhamnen ligger i området, och tältning är begränsad till två dygn per plats.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — hembygdsmuseet består av Bergstugan, Lökastugan och Sjöboden; dansbanan från 1940-talet är "skärgårdens äldsta"; vårdkase på Vårdkasberget bakom skolan; Berg hade 1630 fem gårdar och 50 invånare; Berg har "karaktär av en skärgårdsby från sekelskiftet 1900"
      // KÄLLA: https://stockholmslansmuseum.se/besoksmal/moja-bockon-och-lokaon/ — "Möja hembygdsmuseum, invigt 1922, finns i Berg"
      'Möja hembygdsmuseum invigdes 1922 och ligger i Berg.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — klippbad i Långvik, Ramsmora, Löka och Berg; vid Saltvik finns "både badklippor och sandstrand"; "Det finns ett fåtal badplatser... men inga anlagda badplatser"; gästhamnar i Långvik, Ramsmora, Löka och Kyrkviken; "Möjaborna är mångsysslare, här finns runt 60 företag"
      'Det finns klippbad i Långvik, Ramsmora, Löka och Berg, och vid Saltvik både badklippor och sandstrand — men inga anlagda badplatser. Gästhamnar finns i Långvik, Ramsmora, Löka och Kyrkviken. Kommunen beskriver möjaborna som mångsysslare: på ön finns omkring sextio företag.',
    ],
    facts: {
      // KÄLLA: Waxholmsbolaget linje 14, https://kund.printhuset-sthlm.se/wa/h14.pdf — "14A STOCKHOLM – VAXHOLM – SOLLENKROKA – MÖJA", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026" (läst 2026-09-27). Sollenkroka → Berg 40–75 min; Strömkajen → Berg utan byte 3 h 10 min–4 h 10 min. Tidigare källa (Värmdö-foldern 2022: båt drygt 1 timme) ersatt.
      // Kortad 2026-09-23: faktakortet ska gå att läsa på en blick; hela restiden står i brödtexten och på /komma-dit.
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — "Möjaborna", "är mångsysslare, här finns runt 60 företag", "ca 25 elever från förskola till klass 9" (läst 2026-09-27)
      // KÄLLA: https://visitmoja.se/aktiviteter-p%C3%A5-m%C3%B6ja/ — "Det finns verksamheter på", "MÖJA året runt" (läst 2026-09-27); https://visitmoja.se/%c3%a4ta-och-handla-p%c3%a5-m%c3%b6ja/ — "sommartid dubbleras antalet matställen" (läst 2026-09-27)
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — "Med sina fina landsvägar är Möja en utmärkt ö att cykla på"; https://visitmoja.se/aktiviteter-p%C3%A5-m%C3%B6ja/ — "På Möja går leden längs landsvägen från Långvik till Hamn"; https://visitmoja.se/g%C3%A4sthamnar/ — "Möja är populärt bland båtfolket" (läst 2026-09-27)
      travel_time: 'Båt 40–75 min från Sollenkroka · ca 3–4 tim från Strömkajen',
      character: 'Bofast ö med skola, två Coop och runt 60 företag',
      season: 'Året runt; flest verksamheter öppna sommartid',
      best_for: 'Cykel, vandring i Björndalen, båtfolk',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      // KÄLLA: https://www.rolandsvenssonmuseet.se/ — "Roland Svensson (1910-2003)", "Under sommarsäsong är det öppet varje dag fr o m midsommardagen till början av augusti", "Adress: Ramsmora brygga Möja" (läst 2026-09-27)
      { icon: '🎨', name: 'Roland Svensson-museet', desc: 'Museum tillägnat skärgårdskonstnären Roland Svensson (1910–2003). Öppnade 2014 vid Ramsmora ångbåtsbrygga — hans målar- och skrivarhörnor från ateljén på Tornö är flyttade in i museet. Öppet dagligen från midsommardagen till början av augusti.' },
      // KÄLLA: https://visitmoja.se/aktiviteter-p%C3%A5-m%C3%B6ja/ — "På Möja går leden längs landsvägen från Långvik till Hamn, en lätt etapp som även fungerar med barnvagn eller rullstol", "naturstigarna är uppmärkta med gula band", "Mellan Hamn-Ramsmora är det (12km)" (läst 2026-09-27)
      { icon: '🚶', name: 'Vandring', desc: 'Stockholm Archipelago Trail följer landsvägen från Långvik till Hamn – lätt, även med barnvagn. Naturstigen Hamn–Ramsmora (12 km) genom Björndalen är märkt med gula band.' },
      // KÄLLA: https://www.svenskakyrkan.se/djuro-moja-namdo/moja-kyrka — "Möja kyrka är från 1768 och uppfördes av byggmästare Carl Örn", "Tornet är från 1885" (läst 2026-09-19)
      { icon: '⛪', name: 'Möja kyrka', desc: 'Kyrka från 1768 i Berg, byggd av Carl Örn. Tornet tillkom 1885.' },
      // KÄLLA: https://visitmoja.se/aktiviteter-p%C3%A5-m%C3%B6ja/ — "Möjas dansbana är skärgårdens äldsta ännu i drift och varje år ordnas musikspelningar, dans, bio och marknader." (läst 2026-09-27). Fiskeaktiviteten (abborre, gädda, havsöring) saknade källa och är ersatt.
      { icon: '💃', name: 'Möja dansbana', desc: 'Skärgårdens äldsta dansbana som ännu är i drift. Varje år ordnas musik, dans, bio och marknader.' },
      // KÄLLA: https://visitmoja.se/aktiviteter-p%C3%A5-m%C3%B6ja/ — "Hyr kajak, roddbåt och SUP eller följ med på sälsafari och bastu tur på en ö." (läst 2026-09-27)
      { icon: '🛶', name: 'Kajak & SUP', desc: 'Möja Outdoor hyr ut kajak, roddbåt och SUP och ordnar sälsafari och bastutur till en ö.' },
    ],
    // KÄLLA: https://visitmoja.se/boende-p%C3%A5-m%C3%B6ja/ — "På Möja finns ett fåtal boenden för besökare så under högsommaren blir det ofta fullbokat tidigt på året", "Många privatpersoner hyr ut stugor och det finns några organiserade boenden." (läst 2026-09-27)
    accommodationIntro: 'Möja har ett fåtal boenden för besökare, och under högsommaren blir det ofta fullbokat tidigt på året. Utöver vandrarhemmet och värdshuset hyr många privatpersoner ut stugor.',
    // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-moja-vandrarhem/ (öppet april–december); mojavardshusochbageri.se. Wikströms Fisk stängde 13 juni 2024 (wikstromsfisk.com) — inget boende där (läst 2026-09-14)
    accommodation: [
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-moja-vandrarhem/ — "Öppet April - December", "Vandrarhemmet ligger i Berg som är huvudbyn på Möja", "två- eller fyrabäddsrum med delad dusch och wc", "Vandrarhemmet erbjuder även cyklar för uthyrning" (läst 2026-09-27)
      { name: 'STF Möja Vandrarhem', type: 'Vandrarhem', desc: 'STF-vandrarhem i Berg med självhushåll, två- och fyrbäddsrum med delad dusch och wc. Hyr ut cyklar. Öppet april–december. Boka i god tid inför sommaren.', websiteUrl: 'https://www.svenskaturistforeningen.se/boende/stf-moja-vandrarhem/' },
      { name: 'Möja Värdshus & Bageri', type: 'B&B', desc: 'Värdshus och bageri med B&B-boende under förlängd sommarsäsong.', websiteUrl: 'https://mojavardshusochbageri.se' },
    ],
    getting_there: [
      // KÄLLA: Waxholmsbolaget linje 14, https://kund.printhuset-sthlm.se/wa/h14.pdf — "14A STOCKHOLM – VAXHOLM – SOLLENKROKA – MÖJA", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Beställ resan i SL-appen" (läst 2026-09-27). Sollenkroka → Berg 40–75 min; fasta tider i Berg och Långvik, Ramsmora och Möjaström oftast utan fast tid (X).
      // KÄLLA: SL buss 434, https://kund.printhuset-sthlm.se/sl/v433_434.pdf — "434 Slussen–Vindö", "Sollenkroka brygga" (läst 2026-09-27)
      { method: 'Waxholmsbåt', from: 'Sollenkroka', time: '40–75 min', desc: 'Waxholmsbolagets linje 14 från Sollenkroka brygga (buss 434 från Slussen dit, drygt en timme) till Berg och Långvik; Södermöja, Möjaström och Ramsmora angörs ofta utan fast tid. Flera turer måste beställas i SL-appen. Tider gäller vår och höst 2026.', icon: '⛴' },
      // KÄLLA: Waxholmsbolaget linje 14, https://kund.printhuset-sthlm.se/wa/h14.pdf — "14A STOCKHOLM – VAXHOLM – SOLLENKROKA – MÖJA", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026" (läst 2026-09-27). Strömkajen 08.00 → Berg 11.40 (lördag), 11.00 → 14.10 (söndag), 14.45 → 18.55 (måndag, tisdag).
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/moja — "Vissa turer går också direkt från Strömkajen ut till Möja utan byte" (läst 2026-09-27)
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: '3 h 10 min–4 h 10 min', desc: 'Linje 14 via Vaxholm, vissa turer utan byte. Oftast en till tre turer om dagen vår och höst; några byter båt i Boda brygga.', icon: '⛴' },
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/moja — "Båtar går året runt från Boda brygga på Värmdö till flera bryggor på Möja" (läst 2026-09-27); SL buss 438, https://kund.printhuset-sthlm.se/sl/v438.pdf — "438 Slussen–Boda", "Boda brygga ank" (läst 2026-09-27)
      { method: 'Buss + båt', from: 'Slussen via Boda brygga', time: 'ca 50 min buss', desc: 'SL-buss 438 Slussen–Boda brygga på Värmdö, därifrån Waxholmsbåt till Möja. Båtar från Boda går året runt enligt Waxholmsbolaget, men bara vissa turer passar bussen.', icon: '🚌' },
      // KÄLLA: https://visitmoja.se/g%C3%A4sthamnar/ — "Långviks inre gästhamn", "Ramsmora gästhamn", "Löka gästhamn", "Kyrkviken", "Möjaström", "det kan vara trångt i juli", "det går inte att förboka plats" (läst 2026-09-27)
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Gästplatser i Långvik, Ramsmora, Löka, Kyrkviken och Möjaström. Plats kan inte förbokas, och i juli kan det vara trångt.', icon: '⛵' },
    ],
    harbors: [
      // KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/moja-kyrkviken/ — "Liten fiskehamn på Möjas sydöstra sida med gästbrygga längst in i hamnen", "Gästhamnen ligger nära Berg", "ankare", "Restaurang", "500 m" (läst 2026-09-27)
      // KÄLLA: https://visitmoja.se/g%C3%A4sthamnar/ — Kyrkviken: "Konsollbryggor vid östra och västra inloppet samt längst in mot landsvägen, tilläggning med ankare.", "Faciliteter: wc, vatten (dunk)." (läst 2026-09-27)
      { name: 'Kyrkviken gästhamn', desc: 'Liten fiskehamn på Möjas sydöstra sida nära Berg, med konsolbryggor vid inloppen och längst in; förtöjning med ankare. Toalett och vatten i dunk. Restaurang, livsmedel och drivmedel i Berg ca 500 meter bort.', service: ['vatten', 'toalett'] },
      // KÄLLA: https://visitmoja.se/g%C3%A4sthamnar/ — "Betongbrygga i viken innanför Coop och mack med ca 10 ankarplatser.", "Ingen förhandsbokning.", "Faciliteter: vatten, el, wc, dusch." (läst 2026-09-27)
      { name: 'Långviks inre gästhamn', desc: 'Betongbrygga i viken innanför Coop och macken, ca 10 ankarplatser. Ingen förhandsbokning; betala med swish eller på Jeppes.', service: ['el', 'vatten', 'toalett', 'dusch'] },
      // KÄLLA: https://visitmoja.se/g%C3%A4sthamnar/ — "Ny flytbrygga med platser långsides på den västra sidan av bryggan öster om macken.", "Faciliteter: vatten, el, mack." (läst 2026-09-27)
      { name: 'Möjaström gästhamn', desc: 'Ny flytbrygga med platser långsides, öster om macken i Möjaström.', fuel: true, service: ['el', 'vatten'] },
    ],
    restaurants: [
      // KÄLLA: https://mojavardshusochbageri.se/ — "genuin och hemtrevlig skärgårdsrestaurang med fullskaligt bageri", "Möja bageris historia tar sin början 1951", Bergs by
      { name: 'Möja Värdshus & Bageri', type: 'Värdshus/Bageri', desc: 'Skärgårdsrestaurang med eget bageri i Bergs by. Bagerihistoria sedan 1951. Säsongsöppet.', websiteUrl: 'https://mojavardshusochbageri.se' },
      // Nedan fyra kompletterade 2026-09-23. Källan var redan läst och stod i
      // källistan, men bara värdshuset hade lagts in — sidan sa "1 krog eller
      // kafé" om en ö med sex ställen.
      // Beskrivningarna är tunna med flit: visitmoja.se räknar upp namnen men
      // säger inget om kök, säsong eller öppettider utom för Hamncafét. Vi
      // skriver inte mer än vad någon har läst.
      // KÄLLA: https://visitmoja.se/%c3%a4ta-och-handla-p%c3%a5-m%c3%b6ja/ — "Möja värdshus, Hamnbaren, Les Poissonniers de Möja, Jeppes, Hamncafét, Möja bageri"
      // KÄLLA: https://visitmoja.se/%c3%a4ta-och-handla-p%c3%a5-m%c3%b6ja/ — "Pizza i en liten mysig sjöbod vid gästhamnen i Kyrkviken." (läst 2026-09-27)
      { name: 'Hamnbaren', type: 'Bar', desc: 'Pizza i en sjöbod vid gästhamnen i Kyrkviken.' },
      // KÄLLA: https://visitmoja.se/%c3%a4ta-och-handla-p%c3%a5-m%c3%b6ja/ — "Möja värdshus, Hamnbaren, Les Poissonniers de Möja, Jeppes, Hamncafét, Möja bageri"
      // KÄLLA: https://visitmoja.se/%c3%a4ta-och-handla-p%c3%a5-m%c3%b6ja/ — "Les Poissonniers de Möja", "Skaldjur, Dryck med härlig känsla på ängen i Berg." (läst 2026-09-27)
      { name: 'Les Poissonniers de Möja', type: 'Restaurang', desc: 'Fisk, skaldjur och dryck på ängen i Berg.', websiteUrl: 'https://www.mojafisk.se' },
      // KÄLLA: https://visitmoja.se/%c3%a4ta-och-handla-p%c3%a5-m%c3%b6ja/ — "Möja värdshus, Hamnbaren, Les Poissonniers de Möja, Jeppes, Hamncafét, Möja bageri"
      // KÄLLA: https://visitmoja.se/%c3%a4ta-och-handla-p%c3%a5-m%c3%b6ja/ — "På spritbaronens gamla gård drivs ett bohemt och lite galet ställe.", "Charmig lada med lokalt hantverk och konst vid Jeppes i Långvik." (läst 2026-09-27)
      { name: 'Jeppes', type: 'Restaurang', desc: 'Restaurang på spritbaronens gamla gård i Långvik.' },
      // KÄLLA: https://visitmoja.se/%c3%a4ta-och-handla-p%c3%a5-m%c3%b6ja/ — Hamncafét: "Café med glass och bullar samt cykeluthyrning"
      { name: 'Hamncafét', type: 'Café', desc: 'Café med glass och bullar. Hyr även ut cyklar.' },
    ],
    tips: [
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-moja-vandrarhem/ — "Sommartid stiger du av i Berg", "Vintertid stiger du av i Möja Ström och tar sedan Möjabussen som stannar utanför STF Möja." (läst 2026-09-27)
      'Ska du bo i Berg: sommartid kliver du av i Berg, vintertid i Möja Ström och tar Möjabussen därifrån.',
      // KÄLLA: https://www.rolandsvenssonmuseet.se/ — "Adress: Ramsmora brygga Möja", "öppet varje dag fr o m midsommardagen till början av augusti" (läst 2026-09-27)
      'Roland Svensson-museet ligger vid Ramsmora brygga och har öppet varje dag från midsommardagen till början av augusti.',
      // KÄLLA: https://konsummoja.se/ — Coop Berg har öppet året runt; Långvik är obemannad automatbutik
      'Coop i Berg har öppet året runt; butiken i Långvik är en obemannad automatbutik.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/moja-bjorndalen.html — tältning och eldning förbjuden i reservatet; rast-/övernattningsstuga finns
      'I Möja-Björndalens naturreservat är det förbjudet att tälta och elda — däremot finns en rast- och övernattningsstuga.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — "Det finns ett fåtal badplatser... men inga anlagda badplatser"; klippbad i Långvik, Ramsmora, Löka och Berg; Saltvik har badklippor och sandstrand
      'Baden på Möja är klippbad, inte anlagda badplatser — Saltvik är undantaget med både klippor och sandstrand.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — Möja är cykelvänlig med "fina landsvägar"; naturstigen till Hamn via Björndalens naturreservat startar vid mellansjön
      'Ön är cykelvänlig, och naturstigen norrut till Hamn genom Björndalens naturreservat startar vid mellansjön.',
    ],
    related: ['sandhamn', 'gallno', 'finnhamn'],
    tags: ['cykel', 'lantlig', 'vandring', 'gästhamn', 'konstnär'],
    // KÄLLA: https://visitmoja.se/om-m%C3%B6ja/ — "Nya Vi på Saltkråkan spelades in på Möja", "Matbutiken Grankvists livs är Coop Långvik som byggts om.", "angör vid Löka på Möja" (läst 2026-09-27)
    did_you_know: 'Den nya versionen av Vi på Saltkråkan spelades delvis in på Möja. Coop Långvik byggdes om till Grankvists livs, och båten Saltkråkan lade till vid Löka.',
    transport_meta: {
      // KÄLLA: Waxholmsbolaget linje 14, https://kund.printhuset-sthlm.se/wa/h14.pdf — "14A STOCKHOLM – VAXHOLM – SOLLENKROKA – MÖJA", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026" (läst 2026-09-27). Strömkajen → Berg utan byte, tio turer: 190–250 min, median 220. Sollenkroka → Berg 40–75 min, median ca 60. Avgångar från Sollenkroka: måndag–torsdag 6–7, fredag 6, lördag 3, söndag 3–4; flera markerade B/b = beställs i förväg. Sommartabellen (19 juni–16 augusti) är inte publicerad nu och är inte kontrollerad.
      from_city_min: 220,
      from_nearest_hub_min: 60,
      nearest_hub: 'Sollenkroka',
      operator: 'Waxholmsbolaget',
      line: 'Linje 14 (Stockholm–Vaxholm–Sollenkroka–Möja); buss 434 Slussen–Sollenkroka, buss 438 Slussen–Boda',
      frequency: 'Vår och höst 3–7 turer/dag från Sollenkroka, flera beställs i förväg',
      booking_url: 'https://waxholmsbolaget.se',
      // KÄLLA: Värmdö kommun — https://www.varmdo.se/varmdohamnar/parkera.4.6e5e3cc318a8d4dc3f6361bf.html (hämtad 2026-08-06)
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-moja-vandrarhem/ — "Tar du egen bil ut till Sollenkroka tänk på att det sommartid är ont om p-platser." (läst 2026-09-27)
      car_parking: 'Parkering vid Sollenkroka brygga (avfärdshamn för Möja) — Värmdö kommun anger att Parkit Sweden AB sköter parkeringen i Stavsnäs, Sollenkroka och Boda. Sommartid är det ont om platser i Sollenkroka. Vid Stavsnäs vinterhamn finns cirka 1 300 platser, men den hamnen gäller Sandhamn/Nämdö-trafiken, inte Möja.',
    },
    activity_meta: {
      // KÄLLA: https://visitmoja.se/aktiviteter-p%C3%A5-m%C3%B6ja/ — "Hyr kajak, roddbåt och SUP" (Möja Outdoor) (läst 2026-09-27); https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — "Havet upplevs bäst i kajak" (läst 2026-09-27). Paddelrutten mot Gällnö och Svartsö och uthyrning vid Berg gick inte att belägga.
      kajak: { difficulty: 'lätt', rental: true, notes: 'Möja Outdoor hyr ut kajak, roddbåt och SUP.' },
      bad: {
        // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — "inga anlagda badplatser", "Möjlighet till klippbad", "finns i t.ex. Långvik, Ramsmora, Löka och Berg. Vid Saltvik finns både", "badklippor och sandstrand" (läst 2026-09-27)
        // KÄLLA: https://visitmoja.se/aktiviteter-p%C3%A5-m%C3%B6ja/ — "det finns ingen officiell badplats och alla platser nyttjas enl." (läst 2026-09-27). Barnvänlighet, djup och vägbeskrivningar saknade källa och är strukna; Coop Långvik är obemannad, så tipset att fråga där var fel.
        beaches: [
          {
            name: 'Klippbad vid Berg',
            type: 'klippbad',
            desc: 'Klippbad i Berg. Ingen anlagd badplats – badet sker enligt allemansrätten.',
          },
          {
            name: 'Klippbad vid Långvik',
            type: 'klippbad',
            desc: 'Klippbad i Långvik, där också Coop Långvik och Långviks inre gästhamn ligger.',
          },
          {
            name: 'Saltvik',
            type: 'sandstrand',
            desc: 'Både badklippor och sandstrand – den plats där kommunen nämner sandstrand.',
          },
        ],
      },
      // KÄLLA: https://visitmoja.se/vandra/ (Stockholm Archipelago Trail-sektionen Långvik–Berg–Hamn med gren till Ulvik, samt Naturstigen Hamn–Ramsmora)
      // KÄLLA: Stockholm Archipelago Trail, https://stockholmarchipelagotrail.com/section/ (2026-09-17)
      vandring: { trails: 2, max_km: 13.8, sat: { km: 13.8, difficulty: 'Lätt' } },
      fiske: true,
    },
    // KÄLLA: https://visitmoja.se/g%C3%A4sthamnar/ — Långviks inre gästhamn "Faciliteter: vatten, el, wc, dusch." (läst 2026-09-27); https://visitmoja.se/%c3%a4ta-och-handla-p%c3%a5-m%c3%b6ja/ — "Café med glass och bullar samt cykeluthyrning." (läst 2026-09-27); https://konsummoja.se/ — "Den stora butiken på Möja och som har öppet året runt." (läst 2026-09-27). Uttagsautomat nämns inte i någon källa (atm: false är obekräftat).
    amenities: { toilets: true, shower: true, cafe: true, grocery: true, atm: false },
    dog_friendly: true,
    // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/moja-bjorndalen.html — "I reservatet är det förbjudet att", "medföra hund eller katt som inte är kopplad" (läst 2026-09-27); https://www.svenskaturistforeningen.se/boende/stf-moja-vandrarhem/ — "ett familjerum med egen ingång från altanen, där djur är välkomna" (läst 2026-09-27)
    dog_notes: 'I Möja-Björndalens naturreservat ska hunden vara kopplad. STF Möja vandrarhem har ett familjerum med egen ingång där djur får bo; i de gemensamma utrymmena är husdjur inte tillåtna.',
    insiderTips: [
      // KÄLLA: https://visitmoja.se/%c3%a4ta-och-handla-p%c3%a5-m%c3%b6ja/ — "sommartid dubbleras antalet matställen, då finns även pizzeria, glasskiosk, bageri och fiskbod." (läst 2026-09-27). Wikströms Fisk stängde 13 juni 2024 (se boendekommentaren ovan) och är struken.
      'Sommartid finns en fiskbod på ön, och Les Poissonniers de Möja i Berg serverar fisk och skaldjur.',
      // KÄLLA: https://konsummoja.se/ — "Coop Långvik är en obemannad butik. För att kunna handla krävs Coops app samt ett svenskt bank-id", "använd vårt fria wi-fi, Coop_Free när du handlar", "Måndag-Söndag 5.00-22.00" (läst 2026-09-27); https://visitmoja.se/%c3%a4ta-och-handla-p%c3%a5-m%c3%b6ja/ — "utlämningsställe för", "(alkohol), Post och Apotek." (läst 2026-09-27)
      'Coop Långvik är obemannad: du behöver Coop-appen och svenskt bank-id, och butiken har fritt wifi (Coop_Free) eftersom mobiltäckningen varierar. Coop är också ombud för Systembolaget, post och apotek.',
      // KÄLLA: https://visitmoja.se/aktiviteter-p%C3%A5-m%C3%B6ja/ — "Sommartid daglig transport på landsväg från norr till söder." (läst 2026-09-27)
      'Sommartid kör PerMobilen dagliga turer på landsvägen från norr till söder – hoppa av och på där du vill.',
    ],
    blogLinks: [
      { slug: 'dolda-parlor-moja', title: 'Möja – vandring, bad, museum och mat på ön' },
      { slug: 'cykling-moja-gallno', title: 'Hyra cykel på Möja och Gällnö – cykla i skärgården' },
    ],
    seasonal: {
      // KÄLLA: https://visitmoja.se/g%C3%A4sthamnar/ — "det kan vara trångt i juli", "det går inte att förboka plats" (läst 2026-09-27); https://visitmoja.se/boende-p%C3%A5-m%C3%B6ja/ — "under högsommaren blir det ofta fullbokat tidigt på året. Men vår, sensommar och höst är det ofta lugnt" (läst 2026-09-27)
      // KÄLLA: https://visitmoja.se/%c3%a4ta-och-handla-p%c3%a5-m%c3%b6ja/ — "sommartid dubbleras antalet matställen" (läst 2026-09-27); https://konsummoja.se/ — "Den stora butiken på Möja och som har öppet året runt." (läst 2026-09-27); https://visitmoja.se/ — "Öppet under juni - augusti!" (Brunströms bod) (läst 2026-09-27)
      open: 'Maj–Oktober',
      peak: 'Juli',
      best: 'Juni eller augusti',
      bestReason: 'Gästhamnarna kan vara trånga i juli och boendena fullbokas tidigt inför högsommaren. I juni och augusti har sommarverksamheterna öppet, och vår, sensommar och höst är det ofta lugnt enligt Möja turistförening.',
      warning: 'Utanför sommaren är färre krogar och bodar öppna. Coop Berg har öppet året runt; kolla turistföreningens öppettidskalender före resan.',
      months: ['off','off','off','off','limited','open','peak','open','open','limited','off','off'],
    },
  },
  // ─── FJÄDERHOLMARNA ──────────────────────────────────────────
  {
    slug: 'fjaderholmarna',
    name: 'Fjäderholmarna',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '⛴',
    // KÄLLA: https://www.fjaderholmarna.se/ — "Fjäderholmarna – Stockholms närmsta skärgårdsöar – är ett populärt och uppskattat besöksmål" (läst 2026-09-27)
    // KÄLLA: https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/ — "Endast 30 minuters båtresa från city", "Strandvägen - Kajplatsområde 13" (läst 2026-09-27)
    // KÄLLA: http://www.fjaderholmslinjen.se/valkommen/index.asp — "under perioden 1 maj", "Resan tar ca 25 minuter." (läst 2026-09-27). Visitskargarden.se och ResRobot (tidigare källor) är inga operatörer och är strukna.
    tagline: 'Närmaste skärgårdsöarna från centrala Stockholm — en kort båttur ut.',
    seoTitle: 'Fjäderholmarna 2026 – dagstur 25–30 min från Stockholm',
    seoDescription: 'Fjäderholmarna – närmaste skärgårdsupplevelsen från Stockholm. Båt från Slussen och Strandvägen, restauranger, bryggeri och hantverk. Guide till din dagstur.',
    description: [
      // KÄLLA: https://www.fjaderholmarna.se/ — Fjäderholmarnas Krog, Restaurang Rökeriet och Fjäderholmarnas Bryggeri anges som verksamheter på ön, liksom hantverkare (trä, textil, keramik, glas)
      // KÄLLA: https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/ — avgång Strandvägen kajplats 13, restid ca 30 minuter
      // KÄLLA: http://www.fjaderholmslinjen.se/valkommen/index.asp — "Resan tar ca 25 minuter." (läst 2026-09-27)
      'Fjäderholmarna är det enklaste svaret på frågan hur man snabbt tar sig ut i skärgården. En halvtimme med båt från Strandvägen, eller 25 minuter från Slussen, och du står på en ö med rökeri, krog, bryggeri och hantverkare. Ingen bil och ingen övernattning att boka.',
      // KÄLLA: https://lidingo.se/stad-politik/om-lidingo/lidingo-skargard/ — "Fjäderholmarna, som består av de fyra öarna Fjäderholmen, Ängsholmen, Libertas och Rövarns holme" (läst 2026-09-27)
      // KÄLLA: https://www.naturkartan.se/sv/stockholms-lan/libertas-fagelskyddsomrade (Lidingö stads sida på Naturkartan) — "Libertas och Rövarns holme är ett fågelskyddsområde där det är landstigningsförbud under fåglarnas häckningstid från 1 april till 15 juli", "Stockholms största koloni av silltrut", "På Libertas står en fyr som är förklarad som byggnadsminne" (läst 2026-09-27)
      'Ögruppen består av fyra öar: Stora Fjäderholmen, Ängsholmen, Libertas och Rövarns holme. Det är Stora Fjäderholmen man kliver av på. Libertas och Rövarns holme är fågelskyddsområde med landstigningsförbud under häckningstiden 1 april–15 juli. Där finns Stockholms största koloni av silltrut, och på Libertas står en fyr som är byggnadsminne. Fågellivet går att följa med kikare från Stora Fjäderholmen.',
      // KÄLLA: https://www.fjaderholmarna.se/ — "(1) Waxholmsbolaget", "(19) Strömma Kanalbolaget", "(20) Fjäderholmslinjen" (läst 2026-09-27)
      // KÄLLA: https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/ — "Strandvägen - Kajplatsområde 13", "Vissa turer stannar även vid Nacka Strand", "1 maj – 18 juni & 17 augusti – 13 september", "Varje halvtimme 10:30–17:00" (läst 2026-09-27)
      // KÄLLA: http://www.fjaderholmslinjen.se/valkommen/index.asp — "under perioden 1 maj", "till 13 september 2026", "Alla turer stannar i Nacka Strand vid behov" (läst 2026-09-27)
      'Tre operatörer trafikerar öarna: Waxholmsbolaget, Strömma Kanalbolaget och Fjäderholmslinjen. Strömmas båt går från Strandvägen kajplats 13, och vissa avgångar stannar vid Nacka Strand. Fjäderholmslinjen går från Slussen och stannar i Nacka Strand vid behov. Båda gick 2026 från 1 maj till 13 september, och mellan 19 juni och 16 augusti gick Strömma varje halvtimme på dagen.',
      // KÄLLA: https://www.rokeriet-fjaderholmarna.se/om-rokeriet-fjaderholmarna — "fokus på våra egna rökta produkter, tillagade på plats", "under sommarmånaderna även besöka vår deli och glasskiosk", "Rökeriets uteservering bjuder på sol hela dagen och en fantastisk utsikt över Stockholms inlopp" (läst 2026-09-27)
      'Restaurang Rökeriet har fokus på egna rökta produkter som tillagas på plats. Under sommarmånaderna finns också en deli och en glasskiosk, så det går att ta med sig något ut på klipporna. Uteserveringen har sol hela dagen och vetter mot Stockholms inlopp.',
      // KÄLLA: https://fjaderholmarnasbryggeri.se/fjaderholmarnas-bryggeri-at-sea — "offering a wide variety of our beers served directly from the Brite Beer Tanks", "You can also grab a bite from our pub menu", "We offer Beer Flights", "We only accept drop-ins" (läst 2026-09-27)
      // KÄLLA: https://fjaderholmarnasbryggeri.se/about — "in 2014 we were finally ready for take-off and opened our own brewpub at Fjäderholmarna", "we opened our bigger production brewery in Bro" (läst 2026-09-27)
      'Fjäderholmarnas Bryggeri öppnade sin brewpub på ön 2014. Där serveras ölen direkt från tankarna, med pubmeny och ölprovningar med fyra–fem av bryggeriets egna öl. Man tar bara emot drop-in, utom för sällskap på tio eller fler. Den större produktionen ligger sedan 2020 i Bro norr om Stockholm.',
      // KÄLLA: https://www.fjaderholmarnaskrog.se/ — "Hamnbaren", "Loftet", "FESTVÅNING MAGASINET", "FÖR KOMMANDE SOMMAREN ÖPPNAR VI UPP DEN 1 MAJ 2027", "NU SERVERA JULBORD MELLAN 20/11 - 22/12" (läst 2026-09-27)
      // KÄLLA: https://www.fjaderholmarna.se/ — "Förboka bord för att säkra plats!" (läst 2026-09-27)
      'Fjäderholmarnas Krog är uppdelad på Krogen, Hamnbaren och Loftet, med festvåningen Magasinet intill. Kungl. Djurgårdens förvaltning råder besökare att förboka bord. Krogen öppnar för sommaren igen 1 maj 2027 och serverar julbord 20 november–22 december.',
      // KÄLLA: https://www.fjaderholmarna.se/ — "(9) Allmogebåtar"; https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/ — "Du som är intresserad av sjöfart och båtbygge bör titta in hos Föreningen Allmogebåtar." (läst 2026-09-27)
      'Föreningen Allmogebåtar har en utställning på ön om de traditionella skärgårdsbåtarna och hur de byggdes.',
      // KÄLLA: https://www.fjaderholmarna.se/ — "Tamano Specialsnickeri", "Textiltrycket", "Krukmakeriet", "Garage by the Sea, (Glashytta)", "The Forge, (Smedja)", "Fjäderholmarnas Choklad" (läst 2026-09-27). Strömmas lista för samma säsong har delvis andra namn.
      'Flera hantverkare har verkstad på ön: snickeri, textiltryck, krukmakeri, glashytta, smedja och chokladtillverkning. Vilka som är på plats varierar mellan säsonger.',
      // KÄLLA: https://www.visitstockholm.se/o/fjaderholmarnas-bad/ — "Åk till badvänliga klippor på Stockholms närmaste skärgårdsö" (läst 2026-09-27). Sandstränder (explorearchipelago.com, startsidan) gick inte att belägga och är strukna.
      'Bad går bra från klipporna, med utsikt över Stockholms inlopp.',
      // KÄLLA: https://www.fjaderholmarna.se/ — "Fjäderholmarna har nu säsongsöppet till och med 13 september." (läst 2026-09-27)
      // KÄLLA: https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/ — "1 maj – 18 juni & 17 augusti – 13 september", "19 juni – 16 augusti", "ÅTER MAJ 2027" (läst 2026-09-27)
      'Fjäderholmarna drivs inte året runt. Säsongen 2026 pågick till och med 13 september: då gick sommarbåtarna och restauranger och butiker hade öppet. Tätast går Strömmas båt mellan 19 juni och 16 augusti, varje halvtimme på dagen; före och efter det går den en gång i timmen. Nästa säsong börjar i maj 2027.',
      // KÄLLA: https://lidingo.se/bygga-bo/bygglov/kulturmiljoprogram/ (Stora Fjäderholmen, pdf), kulturmiljöunderlag Stora Fjäderholmen — "Fjäderholmarna omnämns i skrift redan 1381"; "Åtminstone sedan 1699 och troligen även sedan långt tidigare fanns krog på Stora Fjäderholmen"; "År 1849 övertogs ägandet av holmarna av Stockholms stad"; "Från 1849 fram till 1880-talets slut använde Stockholms stad nämligen Ängsholmen som deponi för stadens latrintömning"
      'Fjäderholmarna omnämns i skrift redan 1381, och åtminstone sedan 1699 fanns krog på Stora Fjäderholmen — troligen långt tidigare än så. År 1849 övertog Stockholms stad ägandet, och från 1849 fram till 1880-talets slut användes Ängsholmen som deponi för stadens latrintömning.',
      // KÄLLA: https://lidingo.se/bygga-bo/bygglov/kulturmiljoprogram/ (Stora Fjäderholmen, pdf), kulturmiljöunderlag Stora Fjäderholmen — "År 1918 när Försvarsmakten (marinen) förvärvade Fjäderholmarna"; "landstigningsförbud, som i princip rådde fram till 1976 då Försvarsmakten lämnade holmarna"; "Kungliga Djurgårdsförvaltningen förvaltar Fjäderholmarna sedan 1982"; ny restaurangbyggnad färdig 1985; "Sedan 1995 ingår Fjäderholmarna i Kungliga nationalstadsparken"
      '1918 förvärvade marinen Fjäderholmarna, och 1940 utfärdades ett landstigningsförbud som i princip rådde fram till 1976 då Försvarsmakten lämnade holmarna. Kungl. Djurgårdens förvaltning har förvaltat öarna sedan 1982, en ny restaurangbyggnad stod färdig 1985 och sedan 1995 ingår Fjäderholmarna i Kungliga nationalstadsparken.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/kungliga-nationalstadsparken.html — parken inrättades 1995, omfattar 27 kvadratkilometer, sträcker sig "från Sörentorp och Ulriksdal i norr till Djurgården och Fjäderholmarna i söder" och "spänner över tre kommuner: Solna, Stockholm och Lidingö"; "Länsstyrelsen samordnar arbetet med parkens förvaltning och utveckling. Kungliga Djurgårdens förvaltning sköter runt 80 procent av marken."
      'Att Fjäderholmarna ingår i Kungliga nationalstadsparken är mer än en etikett. Parken inrättades 1995, omfattar 27 kvadratkilometer och sträcker sig från Sörentorp och Ulriksdal i norr till Djurgården och Fjäderholmarna i söder, över tre kommuner: Solna, Stockholm och Lidingö. Länsstyrelsen samordnar förvaltningen och Kungliga Djurgårdens förvaltning sköter runt 80 procent av marken. Öarna är alltså den yttersta sydspetsen av ett skyddat landskap som börjar långt inne i staden.',
      // KÄLLA: https://lidingo.se/bygga-bo/bygglov/kulturmiljoprogram/ (Stora Fjäderholmen, pdf), kulturmiljöunderlag Stora Fjäderholmen — "Redan 1884 hade ett utsiktstorn uppförts, kallat Belvederen. År 1894 byggdes detta om till restaurangpaviljong för 500–600 personer." / "År 1905 ombyggdes restaurangpaviljongen till en större anläggning, som fick namnet 'Grand Restaurant Bellevue' och 1910 tillkom en utedansbana."
      'Nöjesön är inte en nutida uppfinning. Redan 1884 uppfördes ett utsiktstorn på Stora Fjäderholmen, kallat Belvederen, och 1894 byggdes det om till restaurangpaviljong för 500–600 personer. 1905 blev paviljongen en ännu större anläggning under namnet Grand Restaurant Bellevue, och 1910 tillkom en utedansbana. Badhus och kägelbana hade byggts redan 1894, samma år som ombyggnaden till restaurangpaviljong.',
      // KÄLLA: https://lidingo.se/bygga-bo/bygglov/kulturmiljoprogram/ (Stora Fjäderholmen, pdf), kulturmiljöunderlag Stora Fjäderholmen — "Röda stugan (förr kallad Grå stugan) från 1700-talet. Det är den enda återstående byggnaden från Stora Fjäderholmens äldre sjöfartsepok." / "Det faluröda panelade lilla timmerhuset har bland annat fyrspröjsade fönster och karaktäristiska korta taksprång." / "I väster ligger Röda villan, förr kallad Gröna villan, i dag den enda återstående av de byggnader som uppförts på 1890-talet."
      'Två hus bär hela den äldre historien. Röda stugan, förr kallad Grå stugan, är från 1700-talet och den enda återstående byggnaden från öns äldre sjöfartsepok — ett falurött panelat timmerhus med fyrspröjsade fönster och korta taksprång. I väster ligger Röda villan, förr Gröna villan, byggd 1894 och i dag den enda kvarvarande från 1890-talets sommarnöjesepok. Resten av den tiden finns bara som grundmurar och terrassmurar.',
      // KÄLLA: https://lidingo.se/bygga-bo/bygglov/kulturmiljoprogram/ (Stora Fjäderholmen, pdf), kulturmiljöunderlag Stora Fjäderholmen — om Jenny Linds ek: "Den berömda sångerskan från 1800-talet sägs ha rott över till Stora Fjäderholmen för att sitta och läsa eller meditera under eken under några somrar på 1860-talet då hon bodde i Nyckelviken."
      'På ön står Jenny Linds ek. Den berömda sångerskan sägs ha rott över till Stora Fjäderholmen för att sitta och läsa eller meditera under eken under några somrar på 1860-talet, då hon bodde i Nyckelviken. Trädet tas upp under rubriken Karaktärsdrag i Lidingö stads kulturmiljöunderlag.',
      // KÄLLA: https://lidingo.se/bygga-bo/bygglov/kulturmiljoprogram/ (Stora Fjäderholmen, pdf), kulturmiljöunderlag Stora Fjäderholmen — "Bergrummen i norr härstammar från försvarsepoken." / "Välbevarade är tre gulputsade före detta verkstadslängor under pulpettak från ca 1935–1945 i 'hantverksbyn' i söder." / militärkaj från 1940-talet
      'Militärtiden syns fortfarande i marken. Bergrummen i norr härstammar från försvarsepoken, och i hantverksbyn i söder står tre välbevarade gulputsade före detta verkstadslängor under pulpettak från omkring 1935–1945. Även militärkajen från 1940-talet finns kvar. Hantverkarna arbetar alltså i marinens gamla verkstäder.',
      // KÄLLA: https://www.fjaderholmarna.se/ — "Markundersökningar på Stora Fjäderholmen visar att ön är förorenad av tungmetaller och organiska föreningar i form av PAH", "Respektera därför ytor som är avstängd", "Försvarsmakten har utfört undersökningar sedan 2018" (läst 2026-09-27)
      'Marinen lämnade också spår i jorden. Försvarsmaktens markundersökningar sedan 2018 visar att Stora Fjäderholmen är förorenad av tungmetaller och PAH, och vissa ytor ska saneras. Kungl. Djurgårdens förvaltning ber besökare hålla sig borta från avstängda ytor.',
      // KÄLLA: https://lidingo.se/bygga-bo/bygglov/kulturmiljoprogram/ (Stora Fjäderholmen, pdf), kulturmiljöunderlag Stora Fjäderholmen — "Stora Fjäderholmen är en karaktäristisk stor skärgårdsholme. Landskapet är kuperat med några markerade bergskrön och mindre bergsknallar med stråk av flackare partier emellan." / "Södra delen av holmen är grön och lummig medan norra delen är lite kargare och framför allt mer bebyggd."
      'Ön har två ansikten. Landskapet är kuperat med några markerade bergskrön och mindre bergsknallar med flackare stråk emellan. Södra delen är grön och lummig, präglad av gångstigar bland små bergknallar och högvuxna ädellövträd, medan den norra delen är kargare och framför allt mer bebyggd. Går man tio minuter söderut från hamnen byter ön karaktär.',
      // KÄLLA: https://lidingo.se/stad-politik/om-lidingo/lidingo-skargard/ — "Fjäderholmarna, som består av de fyra öarna Fjäderholmen, Ängsholmen, Libertas och Rövarns holme"; öarna ligger inom Lidingö stads område och ingår i Kungliga nationalstadsparken
      'Administrativt hör Fjäderholmarna till Lidingö stad, och kommunen räknar dem som en del av Lidingös skärgård. Det är en av förklaringarna till att öarnas kulturmiljö är beskriven i Lidingös kulturmiljöprogram trots att båtarna går från Stockholm.',
    ],
    facts: {
      // KÄLLA: https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/ — "Endast 30 minuters båtresa från city", "1 maj – 18 juni & 17 augusti – 13 september" (läst 2026-09-27)
      // KÄLLA: http://www.fjaderholmslinjen.se/valkommen/index.asp — "Resan tar ca 25 minuter.", "till 13 september 2026" (läst 2026-09-27)
      // KÄLLA: Waxholmsbolaget linje 2, https://kund.printhuset-sthlm.se/wa/h2.pdf — "2A STOCKHOLM – HÖGANÄS – VAXHOLM", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026"; Fjäderholmarna utan fast tid (X) (läst 2026-09-27)
      // KÄLLA: https://www.fjaderholmarna.se/ — "Här njuter man av mat och dryck, hantverk och kultur under sommarhalvåret", "ingår sedan 1995 i Kungliga Nationalstadsparken" (läst 2026-09-27)
      // KÄLLA: https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/ — "Det här är ett perfekt utflyktsmål för hela familjen." (läst 2026-09-27); https://www.svenskagasthamnar.se/stockholms-skargard/stockholm-fjaderholmarna/ — "Gästplatser", "35 (1/5-31/9)" (läst 2026-09-27)
      travel_time: '25 min från Slussen, 30 min från Strandvägen (maj–sep) · Waxholmsbåt linje 2 vår och höst',
      character: 'Mat, bryggeri och hantverk i Kungliga nationalstadsparken',
      season: 'Maj–mitten av september',
      best_for: 'Dagstur, lunch, barnfamiljer, båtfolk (35 gästplatser)',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      // KÄLLA: https://fjaderholmarnasbryggeri.se/fjaderholmarnas-bryggeri-at-sea — "served directly from the Brite Beer Tanks", "grab a bite from our pub menu", "Beer Flights" (läst 2026-09-27)
      { icon: '🍺', name: 'Fjäderholmarnas Bryggeri', desc: 'Brewpub med öl direkt från tanken, pubmeny och ölprovning.' },
      // KÄLLA: https://www.rokeriet-fjaderholmarna.se/om-rokeriet-fjaderholmarna — "fokus på våra egna rökta produkter, tillagade på plats", "vår deli och glasskiosk" (läst 2026-09-27)
      { icon: '🐟', name: 'Rökeriet', desc: 'Restaurang med egna rökta produkter som tillagas på plats. Deli och glasskiosk under sommarmånaderna.' },
      // KÄLLA: https://www.fjaderholmarna.se/ — "Tamano Specialsnickeri", "Krukmakeriet", "Garage by the Sea, (Glashytta)", "The Forge, (Smedja)", "Fjäderholmarnas Choklad"; https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/ — "Längs hantverkslängan finns flera små butiker med konsthantverk" (läst 2026-09-27)
      { icon: '🛒', name: 'Hantverk & butiker', desc: 'Snickeri, textil, keramik, glas, smide och choklad i små butiker längs hantverkslängan.' },
      // KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/stockholm-fjaderholmarna/ — "Lekplats." (läst 2026-09-27); https://www.fjaderholmarna.se/ — "Röda Villans Boulebanor" (läst 2026-09-27)
      { icon: '🧒', name: 'Lekplats & boule', desc: 'Lekplats på ön och boulebanor vid Röda Villan.' },
      // KÄLLA: https://lidingo.se/bygga-bo/bygglov/kulturmiljoprogram/ (Stora Fjäderholmen, pdf), kulturmiljöunderlag Stora Fjäderholmen — Jenny Linds ek, bergrummen i norr och verkstadslängorna i söder (se beskrivningen ovan); https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/ — "plan mark utan backar om man håller sig kring området med butiker och restauranger" (läst 2026-09-27)
      { icon: '🚶', name: 'Promenad runt ön', desc: 'Promenera runt Stora Fjäderholmen, förbi Jenny Linds ek, bergrummen i norr och marinens gamla verkstadslängor i söder. Kring butikerna och restaurangerna är det plan grusväg.' },
    ],
    accommodation: [],
    getting_there: [
      // KÄLLA: Strömma, Båt till Fjäderholmarna, https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/ — "Avgår från: Strandvägen & Nacka Strand"; "Strandvägen - Kajplatsområde 13"; "Enkel resa: 170 kr | Tur och retur: 205 kr"; "Endast 30 minuters båtresa från city"; "ÅTER MAJ 2027"; "När du har bokat en viss avgång har du förtur på den"; hundar "måste hållas kopplade … enligt Lidingö kommuns lokala ordningsföreskrifter" (läst 2026-09-21)
      { method: 'Strömma', from: 'Strandvägen kajplats 13 eller Nacka Strand', time: '30 min', desc: 'Sommarbåten, 1 maj–13 september 2026 (åter maj 2027). 170 kr enkel, 205 kr tur och retur. Bokad avgång ger förtur.', icon: '⛴', url: 'https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/' },
      // KÄLLA: http://www.fjaderholmslinjen.se/valkommen/index.asp — "under perioden 1 maj", "till 13 september 2026", "Resan tar ca 25 minuter.", "inte att reservera platser", "Vi accepterar Visa/Mastercard, ej kontanter.", "hundar i koppel" (läst 2026-09-27)
      { method: 'Fjäderholmslinjen', from: 'Slussen (via Nacka Strand vid behov)', time: '25 min', desc: 'Sommarbåt 1 maj–13 september 2026. Platser kan inte bokas; betalning ombord med kort, inte kontanter. Hundar i koppel får följa med.', icon: '⛴' },
      // KÄLLA: Waxholmsbolaget linje 2, https://kund.printhuset-sthlm.se/wa/h2.pdf — "2A STOCKHOLM – HÖGANÄS – VAXHOLM", gäller 2 april–18 juni och 17 augusti–12 december 2026; Fjäderholmarna angörs på vissa turer med X = "trafikeras utan fast avgångstid" (läst 2026-09-21). Waxholmsbolaget, Alla SL-biljetter gäller mellan 44 bryggor, https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "Du kan resa med SL-biljett i skärgårdstrafiken mellan Strömkajen i innerstan och Vaxholm med omnejd"; "SL-biljetter gäller endast på de linjer som går via Vaxholm" (läst 2026-09-21). Tidigare källa ResRobot är ingen operatör och är struken.
      { method: 'Waxholmsbolaget linje 2', from: 'Strömkajen eller Nacka strand', time: '', desc: 'När Strömma inte går. Linje 2 mot Vaxholm lägger till vid Fjäderholmarna på vissa turer, utan fast tid – sök resan i SL-appen. Linjen går via Vaxholm, där SL-biljetten gäller enligt Waxholmsbolaget.', icon: '⛴' },
      // KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/stockholm-fjaderholmarna/ — "Gästplatser", "35 (1/5-31/9)", "boj", "Hamnvärd: Sjöstation Fjäderholmarna" (läst 2026-09-27); https://www.fjaderholmarna.se/ — "Gästhamn och bensinstation", "Sjömacken & Gästhamnskontor" (läst 2026-09-27)
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: '35 gästplatser med förtöjning vid boj 1 maj–30 september. Sjömacken och gästhamnskontoret sköter hamnen.', icon: '⛵' },
    ],
    harbors: [
      // KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/stockholm-fjaderholmarna/ — "35 (1/5-31/9)", "boj", "1-8 m", "Dusch", "ingår", "Hamnvärd: Sjöstation Fjäderholmarna" (läst 2026-09-27). Eluttag, färskvatten och toalett är inte markerade. Priserna står bara hos Svenska Gästhamnar, inte i en prislista hos hamnen, och är strukna.
      // KÄLLA: https://www.fjaderholmarna.se/ — "Gästhamn och bensinstation", "Sjömacken & Gästhamnskontor, 08-716 39 10" (läst 2026-09-27)
      { name: 'Fjäderholmarnas Gästhamn & Sjömack', desc: '35 gästplatser med förtöjning vid boj, hamndjup 1–8 meter. Säsong 1 maj–30 september. Dusch ingår; eluttag anges inte. Sjömack med gästhamnskontor.', fuel: true, service: ['dusch'] },
    ],
    restaurants: [
      // KÄLLA: https://www.fjaderholmarnaskrog.se/ — "STOCKHOLMS NÄRMASTE SKÄRGÅRDSKROG", à la carte-meny 2026, öppettider 2026 19 juni–13 september, festvåning Magasinet
      { name: 'Fjäderholmarnas Krog', type: 'Restaurang', desc: 'Skärgårdskrog på Fjäderholmarna med à la carte, hamnbar och festvåning. Säsongsöppen.', websiteUrl: 'https://www.fjaderholmarnaskrog.se' },
      // KÄLLA: https://www.rokeriet-fjaderholmarna.se/ — "1 Maj-13 Sep", "11:30-22:30", "20 Nov-20 Dec" (läst 2026-09-27); https://www.rokeriet-fjaderholmarna.se/om-rokeriet-fjaderholmarna — "vår deli och glasskiosk" (läst 2026-09-27)
      { name: 'Rökeriet Fjäderholmarna', type: 'Restaurang', desc: 'Egna rökta produkter tillagade på plats, bordsservering samt deli och glasskiosk sommartid. Säsong 1 maj–13 september, julbord 20 november–20 december.', websiteUrl: 'https://www.rokeriet-fjaderholmarna.se' },
      // KÄLLA: https://fjaderholmarnasbryggeri.se/fjaderholmarnas-bryggeri-at-sea — "The brewpub opens on 1 May and closes for the season on 13 September.", "served directly from the Brite Beer Tanks", "We only accept drop-ins." (läst 2026-09-27)
      { name: 'Fjäderholmarnas Bryggeri', type: 'Bar', desc: 'Brewpub med bryggeriets egna öl direkt från tankarna och pubmeny. Bara drop-in. Säsong 1 maj–13 september.', slug: 'fjaderholmarna-bryggeri' },
    ],
    tips: [
      // KÄLLA: https://www.fjaderholmarna.se/ — Waxholmsbolaget, Strömma Kanalbolaget och Fjäderholmslinjen trafikerar öarna
      'Tre rederier går hit från olika kajer i stan: Strömma från Strandvägen, Fjäderholmslinjen från Slussen och Waxholmsbolaget från Strömkajen. Välj den kaj som ligger närmast dig.',
      // KÄLLA: https://www.fjaderholmarnaskrog.se/ — bordsbokning sker online
      'Boka bord på Fjäderholmarnas Krog online i förväg om du vill äta på en sommarhelg.',
      // KÄLLA: https://www.naturkartan.se/sv/stockholms-lan/libertas-fagelskyddsomrade (Lidingö stads sida på Naturkartan) — "landstigningsförbud under fåglarnas häckningstid från 1 april till 15 juli", "Med en bra kikare kan man titta på holmarnas fågelliv från Stora Fjäderholmen" (läst 2026-09-27)
      'Libertas och Rövarns holme har landstigningsförbud 1 april–15 juli, under fåglarnas häckningstid. Ta med kikare – fågellivet syns från Stora Fjäderholmen.',
      // KÄLLA: https://lidingo.se/bygga-bo/bygglov/kulturmiljoprogram/ (Stora Fjäderholmen, pdf), kulturmiljöunderlag Stora Fjäderholmen — Röda stugan från 1700-talet är den enda återstående byggnaden från sjöfartsepoken; Röda villan från 1894 den enda kvarvarande från 1890-talet
      'Leta upp Röda stugan och Röda villan — det är de enda husen kvar från 1700-talet respektive 1890-talet.',
      // KÄLLA: https://lidingo.se/bygga-bo/bygglov/kulturmiljoprogram/ (Stora Fjäderholmen, pdf), kulturmiljöunderlag Stora Fjäderholmen — "Södra delen av holmen är grön och lummig medan norra delen är lite kargare och framför allt mer bebyggd."
      'Vill du bort från folk: gå söderut. Norra delen är den bebyggda, södra är grön och lummig.',
      // KÄLLA: https://lidingo.se/bygga-bo/bygglov/kulturmiljoprogram/ (Stora Fjäderholmen, pdf), kulturmiljöunderlag Stora Fjäderholmen — "tre gulputsade före detta verkstadslängor under pulpettak från ca 1935–1945 i 'hantverksbyn' i söder"
      'Hantverksbyns gulputsade längor är marinens gamla verkstäder från 1935–1945.',
    ],
    related: ['vaxholm', 'grinda', 'bockholmen'],
    tags: ['nära stan', 'dagstur', 'rökeriet', 'öl', 'mat'],
    // KÄLLA: https://lidingo.se/bygga-bo/bygglov/kulturmiljoprogram/ (Stora Fjäderholmen, pdf) (kulturmiljö-PDF: Försvaret 1918–1976, landstigningsförbud 1940, KDF 1982, ny restaurangbyggnad 1985); systrarnadegen.se (1985 öppnades Stora Fjäderholmen för besökare); nationalstadsparken.se (ammunitions- och minförråd i berg)
    // KÄLLA: https://lidingo.se/bygga-bo/bygglov/kulturmiljoprogram/ (Stora Fjäderholmen, pdf), kulturmiljöunderlag Stora Fjäderholmen — "Från 1849 fram till 1880-talets slut använde Stockholms stad nämligen Ängsholmen som deponi för stadens latrintömning"
      // KÄLLA: https://lidingo.se/bygga-bo/bygglov/kulturmiljoprogram/ (Stora Fjäderholmen, pdf), kulturmiljöunderlag Stora Fjäderholmen — "1940 utfärdades ett landstigningsförbud, som i princip rådde fram till 1976 då Försvarsmakten lämnade holmarna"; 1918 är året då marinen förvärvade öarna
      // KÄLLA: https://lidingo.se/bygga-bo/bygglov/kulturmiljoprogram/ (Stora Fjäderholmen, pdf), kulturmiljöunderlag Stora Fjäderholmen — "Åtminstone sedan 1699 och troligen även sedan långt tidigare fanns krog på Stora Fjäderholmen"
    did_you_know: 'Ängsholmen i Fjäderholmarna var Stockholms stads deponi för latrintömning från 1849 fram till slutet av 1880-talet. Fjäderholmarna var militärt område 1918–1976, och landstigningsförbudet gällde i princip från 1940 fram till att Försvarsmakten lämnade holmarna. Det har funnits krog på Stora Fjäderholmen åtminstone sedan 1699.',
    insiderTips: [
      // KÄLLA: https://lidingo.se/bygga-bo/bygglov/kulturmiljoprogram/ (Stora Fjäderholmen, pdf) (militären lämnade 1976); https://www.fjaderholmarna.se/ — "öarna öppnades åter för allmänheten 1985" (läst 2026-09-27)
      'Ön var militärområde fram till 1976 och öppnades åter för allmänheten 1985, efter att Kungl. Djurgårdens förvaltning tagit över 1982 och renoverat.',
      // KÄLLA: https://www.rokeriet-fjaderholmarna.se/om-rokeriet-fjaderholmarna — "under sommarmånaderna även besöka vår deli och glasskiosk, där ni kan ta med er något gott hem" (läst 2026-09-27)
      'Rökeriets deli och glasskiosk har öppet under sommarmånaderna – där kan du köpa rökt med dig hem eller ut på klipporna.',
      // KÄLLA: https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/ — "Enkel resa: 170 kr | Tur och retur: 205 kr" (läst 2026-09-27); http://www.fjaderholmslinjen.se/valkommen/index.asp — "Vi accepterar Visa/Mastercard, ej kontanter." (läst 2026-09-27); Waxholmsbolaget, https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor (SL-biljett på linjerna via Vaxholm, läst 2026-09-21)
      'Strömma och Fjäderholmslinjen säljer egna biljetter – Strömmas bokas online, Fjäderholmslinjens köps ombord med kort. Vill du resa på SL-biljett: ta Waxholmsbolagets linje 2 från Strömkajen, som angör Fjäderholmarna utan fast tid.',
    ],
    seasonal: {
      // KÄLLA: https://www.fjaderholmarna.se/ — "Fjäderholmarna har nu säsongsöppet till och med 13 september." (läst 2026-09-27); https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/ — "19 juni – 16 augusti", "Varje halvtimme 10:30–17:00" (läst 2026-09-27); https://www.rokeriet-fjaderholmarna.se/ — "1 Maj-13 Sep", "20 Nov-20 Dec" (läst 2026-09-27); https://www.fjaderholmarnaskrog.se/ — "NU SERVERA JULBORD MELLAN 20/11 - 22/12" (läst 2026-09-27); https://fjaderholmarnasbryggeri.se/fjaderholmarnas-bryggeri-at-sea — "The brewpub opens on 1 May and closes for the season on 13 September." (läst 2026-09-27)
      open: 'Maj–September',
      peak: 'Juli–Augusti',
      best: 'Maj–mitten av september',
      bestReason: 'Båtar, restauranger och butiker har säsongsöppet 1 maj–13 september (2026). Tätast båttrafik 19 juni–16 augusti.',
      warning: 'Sommarsäsongen är kort. De flesta verksamheter stänger i mitten av september och öppnar i maj; Krogen och Rökeriet serverar julbord från 20 november.',
      months: ['off','off','off','limited','open','open','peak','peak','open','limited','off','off'],
    },
    activity_meta: {
      bad: {
        beaches: [
          // KÄLLA: https://www.visitstockholm.se/o/fjaderholmarnas-bad/ — "Åk till badvänliga klippor på Stockholms närmaste skärgårdsö" (läst 2026-09-27); https://www.rokeriet-fjaderholmarna.se/om-rokeriet-fjaderholmarna — "utsikt över Stockholms inlopp" (läst 2026-09-27). Sandstränder och väg dit gick inte att belägga.
          {
            name: 'Klipporna på Stora Fjäderholmen',
            type: 'klippbad',
            desc: 'Badvänliga klipphällar med utsikt över Stockholms inlopp.',
            child_friendly: false,
          },
        ],
      },
    },
  },
  // ─── LJUSTERÖ ─────────────────────────────────────────────────
  {
    slug: 'ljustero',
    name: 'Ljusterö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌊',
    // KÄLLA: https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "Ljusterö är en av de största öarna i den mellersta delen av Stockholms skärgård" (läst 2026-09-27); https://www.trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/ — "Ljusteröleden går mellan Östanå och Ljusterö", "Resan med vägfärjan är avgiftsfri" (läst 2026-09-27)
    tagline: 'Ö i mellersta skärgården med avgiftsfri bilfärja från Östanå.',
    description: [
      // KÄLLA: https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "Ljusterö är en av de största öarna i den mellersta delen av Stockholms skärgård", "Under sommarsäsongen vistas det nästan 20 000 personer på ön" (läst 2026-09-27)
      'Ljusterö är en av de största öarna i den mellersta delen av Stockholms skärgård. Under sommarsäsongen vistas nästan 20 000 personer på ön, och en bilfärja går från Östanå färjeläge året runt.',
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/ — "Ljusteröleden går mellan Östanå och Ljusterö"; "Överfartstiden är sju minuter"; "Resan med vägfärjan är avgiftsfri"
      'Till skillnad från de flesta skärgårdsöar kan man ta bilen hit. Ljusteröleden går mellan Östanå och Ljusterö, överfarten tar sju minuter och resan med vägfärjan är avgiftsfri.',
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h9.pdf — "STOCKHOLM – VAXHOLM – LJUSTERÖ", "Linanäs (Ljusterö)", "Laggarsvik (Ljusterö)", "Skuggan (Ljusterö)", "Väsbystrand (Ljusterö)" (läst 2026-09-27)
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "Åsättra brygga" (läst 2026-09-27); https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "Ta bussen från Åkersberga station till Åsättra brygga på Ljusterö. Därifrån tar du färjan vidare till Husarö och våra andra öar." (läst 2026-09-27)
      'Ön nås också utan bil. Waxholmsbolagets linje 9 Stockholm–Vaxholm–Ljusterö angör bland annat Linanäs, Laggarsvik, Skuggan och Väsbystrand. Från Åsättra brygga på norra Ljusterö går linje 10 vidare ut mot Ingmarsö, Husarö och Möja, och dit går buss från Åkersberga station.',
      // KÄLLA: https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "Linanäs, där besökarna kan njuta av skärgårdsmiljön och de gamla, fina sekelskifteshusen. Här kan du också besöka den gamla fiskebyn Laggarsvik", "Vid Linanäs finns det också ett stort utbud av restauranger" (läst 2026-09-27)
      'Vid Linanäs på södra Ljusterö finns ett stort utbud av restauranger och gamla sekelskifteshus, och intill ligger den gamla fiskebyn Laggarsvik.',
      // KÄLLA: https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "ett klippbad med storslagen utsikt över Saxarfjärden, och ett barnbad med sandstrand"; naturstig, sagostig, boule och tennis
      'På ön finns ett klippbad med utsikt över Saxarfjärden och ett barnbad med sandstrand. Där finns också naturstig och sagostig, boule och tennis.',
      // KÄLLA: https://www.svenskakyrkan.se/osteraker/ljustero-kyrka — "Norra Ljusterö fick sitt första kapell under 1600 talet, möjligen redan på 1500 talet", "Ett nytt kapell ersatte det äldre under 1750 talet", "Mot slutet av 1800 talet fattades beslut om ombyggnad och kapellet omgestaltades helt till dagens kyrka" (läst 2026-09-27)
      'Ljusterö kyrka ligger vid Mellansjö, omkring tre kilometer från färjeläget. Norra Ljusterö fick sitt första kapell under 1600-talet, möjligen redan på 1500-talet. Ett nytt kapell uppfördes under 1750-talet och byggdes mot slutet av 1800-talet om till dagens vita, åttkantiga träkyrka.',
      // KÄLLA: https://www.osteraker.se/subsitegrundskolor/ljusteroskola.html — "Ljusterö skola är en trygg skola för för elever från förskoleklass till årskurs 9" (läst 2026-09-27)
      'Ljusterö har en egen kommunal grundskola för förskoleklass till årskurs 9.',
      // KÄLLA: https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "Ljusterö har under flera decennier varit en konstnärs-ö, många kända konstnärer som Carl Larsson, Bruno Liljefors och J.A.G Acke har besökt och inspirerats av Ljusterö genom åren. Idag kan du se konstsamlingen på Ljusterö Hembygdsgård" (läst 2026-09-27)
      // KÄLLA: https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "utkiksplatsen Ljusterö huvud, där du vid klart väder kan se tre mil rakt ut i skärgården", "rester kvar av ett stort betongfundament för kanoner som byggdes under andra världskriget" (läst 2026-09-27)
      'Ljusterö har under flera decennier varit en konstnärsö: Carl Larsson, Bruno Liljefors och J.A.G. Acke har besökt ön, och konstsamlingen finns i dag på Ljusterö hembygdsgård. Från utkiksplatsen Ljusterö huvud ser man vid klart väder tre mil ut i skärgården, och på toppen finns rester av ett betongfundament för kanoner från andra världskriget.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sjalbottna-ostra-lagno.html — "skyddat sedan: 1977 Storlek: 532 hektar, varav land 150 hektar ... Kommun: Norrtälje och Österåker Markägare: Skärgårdsstiftelsen Förvaltare: Skärgårdsstiftelsen" / "Som en sista utpost mot Ålands hav hittar du Östra Lagnö som är en del av Ljusterö."
      'Ljusterös östra spets ingår i Själbottna–Östra Lagnö naturreservat, skyddat sedan 1977 och 532 hektar stort varav 150 hektar land. Skärgårdsstiftelsen både äger och förvaltar området, som är öns sista utpost mot Ålands hav.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sjalbottna-ostra-lagno.html — "Brännholmen är udden vid nordöstra spetsen av reservatet och här kan du bada, tälta och fiska. Klipporna mot havet är mjukt slipade av inlandsisen och randiga av bergarterna svart diabas och ljusröd fältspat." / "På Brännholmen finns ett gammalt självföryngrande idegransbestånd."
      'Ute på Brännholmen är klipporna mjukt slipade av inlandsisen och randiga av svart diabas och ljusröd fältspat. Här går det att bada, fiska och tälta, och på udden står ett gammalt självföryngrande bestånd av idegran.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sjalbottna-ostra-lagno.html — "Skären öster om Skakroksudden har ett rikt fågelliv med bland annat roskarl, strandskata och måsfåglar. Här rastar också rovfåglar och sjöfåglar som ejder, svärta och alfågel." / "Här finns också stigar, fiskebrygga och toaletter anpassade för rullstolsburna."
      'Skären öster om Skakroksudden har ett rikt fågelliv med roskarl, strandskata och måsfåglar, och här rastar ejder, svärta och alfågel. Reservatet har lättvandrade stigar, och både fiskebrygga och toaletter är anpassade för rullstolsburna.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/ostra-lagno/ — "Östra Lagnö är ett lättillgängligt naturreservat på Ljusterös östra sida där släta havsklippor, strandängar och skogsstigar möter utsikten över Svartlögafjärden." / "Hit tar du dig med bil eller SL-buss via färjan till Ljusterö. Från Lagnö by är det en kort promenad till reservatet."
      'Skärgårdsstiftelsen kallar Östra Lagnö "ett lättillgängligt naturreservat" — man kommer hit med bil eller SL-buss via färjan, och från Lagnö by är det en kort promenad in. Från klipporna ser man ut över Svartlögafjärden.',
      // KÄLLA: https://www.osteraker.se/download/18.367d658917909e8fc2b5172/1628586891118/Ljusterö_planprogram_Hela_Lågupplöst.pdf (Österåkers kommun, Ljusterö planprogram 2010) — "Det finns två geologiska skyddsobjekt på Ljusterö, nämligen ett stråk av urkalksten längs norra stranden av Östra Lagnö och ett mindre åsparti vid Skogshult, där utsiktspunkten Ljusterö Huvud ligger. De dominerande bergarterna i kommunen utgörs av gnejser och gnejsgraniter. Till de äldsta formationerna hör leptitgnejserna som bland annat är särskilt framträdande på Västra och Östra Lagnö."
      'Berggrunden domineras av gnejser och gnejsgraniter, med leptitgnejser som särskilt framträdande på Västra och Östra Lagnö. Kommunen pekar ut två geologiska skyddsobjekt på ön: ett stråk urkalksten längs Östra Lagnös norra strand och ett mindre åsparti vid Skogshult, där utsiktspunkten Ljusterö Huvud ligger.',
      // KÄLLA: https://www.osteraker.se/download/18.367d658917909e8fc2b5172/1628586891118/Ljusterö_planprogram_Hela_Lågupplöst.pdf — "Troligen var delar av Ljusterö bebodda redan under bronsåldern. Havsnivån var då 15 - 20 meter högre än idag. Under järnåldern ökade skärgårdens betydelse och sex gårdar etablerades under denna period. Fem av dem låg på Norra Ljusterö (Gärdsvik, Inneby, Mörtsunda, Väsby och Ösby) och en på Södra Ljusterö nämligen Bolby."
      'Delar av Ljusterö var troligen bebodda redan under bronsåldern, när havsnivån låg 15–20 meter högre än i dag. Under järnåldern etablerades sex gårdar: Gärdsvik, Inneby, Mörtsunda, Väsby och Ösby på Norra Ljusterö, och Bolby på den södra delen.',
      // KÄLLA: https://www.osteraker.se/download/18.367d658917909e8fc2b5172/1628586891118/Ljusterö_planprogram_Hela_Lågupplöst.pdf — "Bolby är den största bevarade byn på Södra Ljusterö och är troligen ursprungsbyn på Södra Ljusterö", "två järnåldersgravfält med ca 20 gravar var", "kommunens enda storhög, som nu tyvärr är bortgrävd", "troligen en form av kunglig förvaltningsgård", "strategiskt belägen längst in vid den skyddade segelleden mellan Ljusteröarna" (läst 2026-09-27)
      'Bolby är den största bevarade byn på Södra Ljusterö och troligen dess ursprungsby. Här ligger två järnåldersgravfält med ett tjugotal gravar vardera. Fram till sent 1800-tal fanns här kommunens enda storhög, nu bortgrävd — den tyder på en stormannagård, troligen en kunglig förvaltningsgård, strategiskt placerad innerst vid den skyddade segelleden mellan Ljusteröarna.',
      // KÄLLA: https://www.osteraker.se/download/18.367d658917909e8fc2b5172/1628586891118/Ljusterö_planprogram_Hela_Lågupplöst.pdf — "12 säterier etablerades i Österåker varav fem låg på Ljusterö, nämligen Västra Lagnö, Grundvik, Väsby, Hummelmora och Hästede", "Marum är en herrgård uppförd kring 1740", "I flera århundraden har nordvästra delen av Ljusterö legat under Östanå Säteri", "ägorna på Norra Ljusterö utgörs av sammanhängande skogar med undantag av några mindre avstyckade fastigheter" (läst 2026-09-27)
      'Under 1600-talet etablerades tolv säterier i Österåker, och fem av dem låg på Ljusterö: Västra Lagnö, Grundvik, Väsby, Hummelmora och Hästede. Marums herrgård uppfördes kring 1740. I flera århundraden har nordvästra Ljusterö legat under Östanå säteri på fastlandet, vilket än i dag syns i att Norra Ljusterö är sammanhängande skog snarare än styckad tomtmark.',
      // KÄLLA: https://www.osteraker.se/download/18.367d658917909e8fc2b5172/1628586891118/Ljusterö_planprogram_Hela_Lågupplöst.pdf — "Alla som åker färjan från fastlandet passerar Ljusterö Torg i korsningen mellan Ljusterövägen och Mellansjö", "dagligvarubutik med systembolagsutlämning och postservice, restaurang, skärgårds" (planprogram april 2010) (läst 2026-09-27)
      'Mellansjö är öns centrum och stod enligt kommunens planprogram från 2010 för merparten av servicen: kyrka, skola, förskola, fritidshem, äldreboende och distriktssköterska. Alla som kommer med färjan passerar Ljusterö torg i korsningen mellan Ljusterövägen och Mellansjövägen, där planprogrammet räknar upp dagligvarubutik, restaurang, skärgårdskontor och mindre företag.',
      // KÄLLA: https://www.osteraker.se/download/18.367d658917909e8fc2b5172/1628586891118/Ljusterö_planprogram_Hela_Lågupplöst.pdf — "Ljusterö har en för skärgården typisk topografi med branta stränder i väster som övergår i djupa bottnar. Östra sidan har större inslag av flacka lerstränder som övergår i flacka mjukbottnar." / "På det över 10 km långsmala Lagnölandet, som sträcker ut sig mot öster ... På grund av dess smala form är det alltid nära till stranden."
      'Öns två sidor är olika: branta stränder i väster som går ner i djupa bottnar, flacka lerstränder och mjukbottnar i öster. Lagnölandet, som sträcker sig över tio kilometer österut, är så smalt att det alltid är nära till stranden.',
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/ — "Färjeledens längd är 1100 meter och överfartstiden är sju minuter", "Med vår app Trafikinfo Färjerederiet får du tillgång till tidtabeller och trafikinformation. Du kan även kalla på färjan direkt i appen." (läst 2026-09-27)
      'Ljusteröleden är 1 100 meter lång. Tidtabellen finns i Trafikverkets app Trafikinfo Färjerederiet, där man också kan kalla på färjan.',
    ],
    facts: {
      // KÄLLA: https://kund.printhuset-sthlm.se/sl/h626.pdf — "Giltig 17 augusti–12 december 2026", "Danderyds sjukhus–Ljusterö": Danderyds sjukhus 09.25 → Östanå färjeläge 10.25 → Ljusterö färjeläge 10.37 (72 min); lördag 07.31 → 08.37 (66 min) (läst 2026-09-27). https://www.trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/ — "Resan med vägfärjan är avgiftsfri" (läst 2026-09-27)
      travel_time: '~72 min från Danderyds sjukhus (buss 626 + avgiftsfri bilfärja Ljusteröleden)',
      // KÄLLA: https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "en av de största öarna i den mellersta delen av Stockholms skärgård", "En bilfärja går från Östanå färjeläge året runt" (läst 2026-09-27)
      character: 'En av de största öarna i mellersta skärgården, avgiftsfri bilfärja året runt',
      // KÄLLA: https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "En bilfärja går från Östanå färjeläge året runt"; https://kund.printhuset-sthlm.se/sl/h626.pdf — buss 626 alla dagar (måndag–fredag, lördag, söndag och helgdag) (läst 2026-09-27)
      season: 'Året runt',
      // UPPSKATTNING: bedömning utifrån kajakuthyrning vid Klintsundet, Linanäsbadet och naturreservatet (källor nedan)
      best_for: 'Kajakpaddling från Lagnö, bad vid Linanäsbadet, bilburna besökare, naturreservatet Östra Lagnö',
    },
    activities: [
      // KÄLLA: https://klintsundetmarina.se/ — "Fyra stycken fina, nya cylkar från Skeppshult finns att hyra" (läst 2026-09-27); https://www.osteraker.se/download/18.367d658917909e8fc2b5172/1628586891118/Ljusterö_planprogram_Hela_Lågupplöst.pdf — "Eftersom öns vägar saknar fysiskt utrymme för fotgängare och cyklister föreslås en sammanhängande gång- och cykelbana utmed Ljusterövägen" (planprogram april 2010) (läst 2026-09-27)
      { icon: '🚲', name: 'Cykling', desc: 'Klintsundet Marina hyr ut fyra cyklar. Kommunens planprogram från 2010 konstaterar att öns vägar saknar utrymme för fotgängare och cyklister, så räkna med att cykla i blandtrafik på Ljusterövägen.' },
      // KÄLLA: https://klintsundetmarina.se/kajak-1/ — "Vi har 4 st enkel (K1) och en dubbelkajak (K2) till uthyrning", "Kajakerna är beläget vid Klintsundet, sundet mellan Västra och Östra Lagnö" (läst 2026-09-27); https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "Lagnö sticker ut som en 1,2 mil lång arm från Ljusterö i ett av Stockholms skärgårds allra vackraste paddelvatten" (läst 2026-09-27)
      { icon: '🛶', name: 'Kajak', desc: 'Klintsundet Marina i sundet mellan Västra och Östra Lagnö hyr ut fyra enkelkajaker och en dubbelkajak. Lagnö sträcker sig 1,2 mil ut från Ljusterö, i vad Österåkers kommun kallar ett av skärgårdens allra vackraste paddelvatten.' },
      // KÄLLA: https://www.osteraker.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatser.4.367d658917909e8fc2b985.html — "Linanäsbadet, som har en barnvänlig strand och flytbryggor med en storslagen utsikt över Saxarfjärden", "flyttbar utomhustoalett som är tillgänglighetsanpassad", "Här tar kommunen prover på badvattnet" (läst 2026-09-27)
      { icon: '🏊', name: 'Bad', desc: 'Linanäsbadet har barnvänlig strand och flytbryggor mot Saxarfjärden. Under badsäsongen finns en tillgänglighetsanpassad utomhustoalett, och kommunen tar prover på badvattnet.' },
      // KÄLLA: https://klintsundetmarina.se/ — "Vi har Blyfri 98, RME-fri diesel för båtar och alkylatbensin från pump och på dunk", "byter in flaskor med gasol från både AGA och Primagaz" (läst 2026-09-27)
      { icon: '⛽', name: 'Sjömack', desc: 'Klintsundet Marina säljer blyfri 98, diesel och alkylatbensin samt gasol.' },
    ],
    // KÄLLA: https://ljusterologi.se/ — "31 sovplatser i Stockholms Skärgård", "Skärgårdsboende med historiskt arv och plats för evenemang & tillställningar sedan 1910-talet", "Vi har 15 smakfullt inredda rum", "Det finns en stor pool med terrass och en bastu" (läst 2026-09-27); https://www.linanasbryggan.se/julbord — "Ljusterö Logi ligger cirka 150 meter bort" (julbord 2026) (läst 2026-09-27)
    // Gåsviks vandrarhem är struket: verksamheten har ingen egen webbplats (bara sociala medier och kataloger), och bäddantalet kom från en aggregator. Den länkade visitskargarden.se-sidan svarar inte.
    accommodation: [
      { name: 'Ljusterö Logi', type: 'B&B', desc: 'Skärgårdsboende vid Linanäs med 15 rum och 31 sovplatser, pool och bastu. Huset har använts för boende och tillställningar sedan 1910-talet.', websiteUrl: 'https://ljusterologi.se' },
    ],
    getting_there: [
      // KÄLLA: https://kund.printhuset-sthlm.se/sl/h626.pdf — "Giltig 17 augusti–12 december 2026", "Danderyds sjukhus–Ljusterö", "Linanäs brygga": Danderyds sjukhus 09.25 → Östanå färjeläge 10.25 → Ljusterö färjeläge 10.37 → Linanäs brygga 11.03; lördag 07.31 → Ljusterö färjeläge 08.37 (läst 2026-09-27). Färjan avgiftsfri enligt https://www.trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/ (läst 2026-09-27)
      { method: 'Buss + Bilfärja', from: 'Danderyds sjukhus', time: '~72 min', desc: 'Buss 626 från Danderyds sjukhus till Östanå färjeläge tar ca 60 min, sedan avgiftsfri bilfärja Östanå–Ljusterö (7 min). Hela resan till Ljusterö färjeläge tar ~72 min (snabbast 66). Samma linje fortsätter ut på ön till Åsättra brygga och Linanäs brygga.', icon: '🚌' },
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/ — "Ljusteröleden går mellan Östanå och Ljusterö", "överfartstiden är sju minuter", "Resan med vägfärjan är avgiftsfri" (läst 2026-09-27)
      { method: 'Bil + Färja', from: 'Stockholm', time: '', desc: 'Kör till Östanå färjeläge och ta den avgiftsfria bilfärjan över till Ljusterö (Ljusteröleden, 7 min).', icon: '🚗' },
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h9.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "STOCKHOLM – VAXHOLM – LJUSTERÖ": söndag Strömkajen 17.20 → Linanäs 18.55 (14 september–1 november), söndag 09.00 → 11.05, lördag 09.00 → 11.15, tisdag 10.00 → 12.50 (läst 2026-09-27)
      { method: 'Waxholmsbåt', from: 'Strömkajen / Vaxholm', time: 'ca 1 h 35 min–2 h 50 min', desc: 'Linje 9 Stockholm–Vaxholm–Ljusterö angör Linanäs, Laggarsvik, Skuggan och Väsbystrand; vissa turer byter båt i Vaxholm. Från Åsättra brygga går linje 10 vidare ut i skärgården.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: https://klintsundetmarina.se/ — "Vår marina har ca 60 st permanenta båtplatser vid Y-bommar. Utöver dessa så erbjuder vi ett fåtal för korttidsuthyrning och som gästhamnsplatser", "Vi har Blyfri 98, RME-fri diesel", "Vid tankning kan vi erbjuda er att fylla upp din båt med vatten" (läst 2026-09-27). El nämns inte.
      { name: 'Klintsundet Marina', desc: 'Marina med sjömack, gasol, lanthandel och café vid Klintsundet. Ett fåtal gästplatser utöver ca 60 fasta båtplatser; vatten kan fyllas vid tankning.', fuel: true, service: ['vatten', 'bränsle', 'gästhamn'] },
      // KÄLLA: https://www.linanasbryggan.se/faq — "LINANÄS GÄSTHAMN Hur många båtplatser har ni? 20+ Finns det toalett? Ja. 3 st. Inklusive 1 handikapptoalett" (läst 2026-09-27); https://www.linanasbryggan.se/gsthamn — "Hamnvärd VHF, kanal L1 eller 16" (läst 2026-09-27)
      { name: 'Linanäs gästhamn', desc: 'Gästhamn vid restaurangen Linanäsbryggan med drygt 20 båtplatser och tre toaletter, varav en handikapptoalett. Hamnvärden nås på VHF kanal L1 eller 16.', fuel: false },
    ],
    restaurants: [
      // KÄLLA: https://www.linanasbryggan.se/meny-4 — "285 KR MOULES FRITES", "255 KR HAMBURGARE" (läst 2026-09-27); https://www.linanasbryggan.se/ — "RESTAURANGEN August Open everyday from 11.00-21.00", "BUTIK & DELI August Open everyday from 9.30-19.00" (läst 2026-09-27); https://www.linanasbryggan.se/julbord — "Datum 2026: 27–28 november · 4–5 december · 11–12 december", "19 december" (läst 2026-09-27). Den tidigare citerade texten om öppet till 29 september och åter i april finns inte längre på sajten.
      { name: 'Linanäsbryggan', type: 'Restaurang', desc: 'Restaurang, deli och café vid Linanäs brygga, med gästhamn intill. Menyn har bland annat moules frites, hamburgare och surdegspizza.', price_example: 'Varmrätter ca 255–285 kr (2026)', open_season: 'Sommar (augusti 2026: alla dagar); julbord 27 november–19 december 2026', open_hours: '11–21 (augusti 2026)' },
      // KÄLLA: https://klintsundetmarina.se/ — "Våra öppettider 2026 Juni Alla dagar 10 - 18 Juli Alla dagar 10 - 18 Augusti alla dagar 11 - 16", "Vi har öppet nu i helgen Fre - Sönd (25 - 27 sept) 11 - 16", "Vi försöker att ha öppet i helgerna" (läst 2026-09-27); https://klintsundetmarina.se/kajak-1/ — "Våra priser 2026", "Halvdag K1: 370 kr" (läst 2026-09-27)
      { name: 'Klintsundet Marina', type: 'Service/Café', desc: 'Sjömack, lanthandel och kaffebar vid Klintsundet – hyr även ut kajaker och cyklar.', slug: 'klintan-sjostation', price_example: 'Kajak från 370 kr/halvdag (2026)', open_season: 'Juni–augusti alla dagar, därefter i regel helger', open_hours: '10–18 (juni–juli), 11–16 (augusti), 11–16 helger i september' },
      // Pizzeria Ljusterö (Långsjöängen 20) är struken: ingen egen webbplats hittades, och de citerade källorna var en katalogsida som inte laddar och en förbjuden listsajt.
    ],
    day_cost: {
      // Ingen totalsumma: cafépriser publiceras inte, och summan blev en gissning. Posterna nedan är belagda var för sig.
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/ — "Resan med vägfärjan är avgiftsfri" (läst 2026-09-27); buss 626 är en vanlig SL-linje (https://kund.printhuset-sthlm.se/sl/h626.pdf)
      budget_per_person: 'Bilfärjan är avgiftsfri och bussen kostar en vanlig SL-biljett – resten beror på mat och ev. kajakhyra',
      includes: 'Avgiftsfri bilfärja, lunch på Linanäsbryggan, kaffe vid Klintsundet',
      breakdown: [
        // KÄLLA: https://kund.printhuset-sthlm.se/sl/h626.pdf ("Danderyds sjukhus–Ljusterö") och https://www.trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/ ("Resan med vägfärjan är avgiftsfri") (läst 2026-09-27)
        { item: 'Buss 626 från Danderyds sjukhus', price: 'Vanlig SL-biljett' },
        { item: 'Bilfärja Östanå–Ljusterö (avgiftsfri)', price: '0 kr' },
        // KÄLLA: https://www.linanasbryggan.se/meny-4 — "255 KR HAMBURGARE", "285 KR MOULES FRITES" (läst 2026-09-27)
        { item: 'Lunch Linanäsbryggan', price: '255–285 kr (2026)' },
        // KÄLLA: https://klintsundetmarina.se/ — "Vi har en kaffebar med en riktig espressomaskin och med nybakat bröd"; priser publiceras inte, därför ingen siffra (läst 2026-09-27)
        { item: 'Kaffe + bulle, Klintsundets café', price: 'Se pris på plats' },
        // KÄLLA: https://klintsundetmarina.se/kajak-1/ — "Våra priser 2026", "Halvdag K1: 370 kr" (läst 2026-09-27)
        { item: 'Kajakhyra Klintsundet Marina (halvdag)', price: 'från 370 kr (2026)' },
      ],
      tips: [
        // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/ — "Resan med vägfärjan är avgiftsfri" (läst 2026-09-27)
        'Bilfärjan Östanå–Ljusterö är avgiftsfri – buss 626 åker med över sundet.',
        // KÄLLA: https://klintsundetmarina.se/kajak-1/ — "De kan bokas för en halvdag på plats (Klintan) eller för en dag eller längre via vår bokningsmodul" (läst 2026-09-27); https://kund.printhuset-sthlm.se/sl/h626.pdf — "Linanäs brygga" (läst 2026-09-27)
        'Hyr kajak vid Klintsundet Marina eller ta buss 626 som fortsätter ut på ön till Linanäs brygga.',
        // KÄLLA: https://klintsundetmarina.se/ — "Våra öppettider 2026 Juni Alla dagar 10 - 18", "Augusti alla dagar 11 - 16", "Vi försöker att ha öppet i helgerna" (läst 2026-09-27)
        'Klintsundet Marina har öppet alla dagar juni–augusti; efter det i regel bara helger.',
      ],
    },
    tips: [
      // KÄLLA: https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "Vid Linanäs finns ett stort utbud av restauranger"
      'Linanäs på södra Ljusterö har flera restauranger.',
      // KÄLLA: https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "bussen från Åkersberga station till Åsättra brygga på Ljusterö"
      'Utan bil: buss från Åkersberga station till Åsättra brygga.',
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/ — "Resan med vägfärjan är avgiftsfri"
      'Vägfärjan över Ljusteröleden är avgiftsfri.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sjalbottna-ostra-lagno.html — i reservatet är det förbjudet att "medföra hund som inte är kopplad", "tälta mer än två dygn i följd på samma plats", "göra upp öppen eld", "framföra motordrivet fordon annat än på anvisade vägar" och "parkera annat än på särskilt anvisade platser"
      'I Själbottna–Östra Lagnö naturreservat råder koppeltvång och totalt förbud mot öppen eld. Tältning högst två dygn i följd på samma plats, och parkering bara på anvisade platser.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sjalbottna-ostra-lagno.html — "under tiden 1 februari – 15 augusti beträda eller befara de land- och vattenområden (fågelskyddsområden) som framgår av karta"
      'Fågelskyddsområdena i reservatet är stängda 1 februari–15 augusti, både till lands och till sjöss — kolla kartan innan du paddlar in bland skären.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sjalbottna-ostra-lagno.html — "Till Östra Lagnö: Buss från Danderyds sjukhus till Östanå färjeläge, byte buss till Lagnö by. Därefter tre kilometers promenad."
      'Utan bil till Östra Lagnö: buss från Danderyds sjukhus till Östanå färjeläge, byte till Lagnö by, sedan tre kilometers promenad.',
    ],
    related: ['finnhamn', 'ingmarso', 'blido'],
    tags: ['cykling', 'kajak', 'bilfärja', 'kustlinje', 'familj'],
    // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/ — "Ljusteröleden går mellan Östanå och Ljusterö", "Färjeledens längd är 1100 meter och överfartstiden är sju minuter", "Resan med vägfärjan är avgiftsfri" (läst 2026-09-27)
    did_you_know: 'Ljusterö nås med den avgiftsfria bilfärjan Ljusteröleden mellan Östanå och Ljusterö, en resa på ungefär 7 minuter över sundet.',
    insiderTips: [
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/ — "överfartstiden är sju minuter", "Med vår app Trafikinfo Färjerederiet får du tillgång till tidtabeller och trafikinformation" (läst 2026-09-27)
      'Färjan från Östanå tar sju minuter. Tidtabellen finns i Trafikverkets app Trafikinfo Färjerederiet.',
      // KÄLLA: https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "Lagnö sticker ut som en 1,2 mil lång arm från Ljusterö", "Vid Klintsundet leder en bro mellan Västra och Östra Lagnö" (läst 2026-09-27)
      'Lagnö sträcker sig 1,2 mil österut från Ljusterö, och vid Klintsundet går en bro mellan Västra och Östra Lagnö.',
      // KÄLLA: https://www.osteraker.se/download/18.367d658917909e8fc2b5172/1628586891118/Ljusterö_planprogram_Hela_Lågupplöst.pdf — "Mellansjö på Norra Ljusterö är öns huvudort. Här finns kyrka, skola, äldreboende, distriktssköterska och kommersiell service på Ljusterö Torg" (2010) (läst 2026-09-27); https://klintsundetmarina.se/ — "Vi har Blyfri 98, RME-fri diesel för båtar" (läst 2026-09-27)
      'Mellansjö på norra Ljusterö är öns huvudort med kyrka, skola och service kring Ljusterö torg. Båtbränsle finns vid Klintsundet Marina.',
      // KÄLLA: https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "utkiksplatsen Ljusterö huvud, där du vid klart väder kan se tre mil rakt ut i skärgården" (läst 2026-09-27); https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sjalbottna-ostra-lagno.html — "Skären öster om Skakroksudden har ett rikt fågelliv" (läst 2026-09-27)
      'Från Ljusterö huvud ser du vid klart väder tre mil ut i skärgården. För fåglar: skären öster om Skakroksudden i Östra Lagnö-reservatet har ett rikt fågelliv.',
    ],
    // KÄLLA: https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "En bilfärja går från Östanå färjeläge året runt", "Under sommarsäsongen vistas det nästan 20 000 personer på ön" (läst 2026-09-27); https://klintsundetmarina.se/ — "Våra öppettider 2026 Juni Alla dagar 10 - 18" (läst 2026-09-27); https://www.osteraker.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatser.4.367d658917909e8fc2b985.html — "Under badsäsongen finns en flyttbar utomhustoalett" (läst 2026-09-27); https://www.linanasbryggan.se/ — "RESTAURANGEN August Open everyday from 11.00-21.00" (läst 2026-09-27)
    // UPPSKATTNING: månadsraden är en bedömning; bilfärja och buss går året runt.
    seasonal: {
      open: 'Året runt – bilfärjan och buss 626 går hela året',
      peak: 'Sommaren, då nästan 20 000 personer vistas på ön',
      best: 'Juni–augusti',
      bestReason: 'Då har Klintsundet Marina öppet alla dagar och hyr ut kajaker, Linanäsbadet har sin badsäsong, och Linanäsbryggan hade 2026 öppet alla dagar i augusti.',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },
  },
  // ─── DALARÖ ──────────────────────────────────────────────────
  {
    slug: 'dalaro',
    name: 'Dalarö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '⚓',
    // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/dalaro/ — "Dalarö är lots- och tullsamhället som sedan blev badortsidyll", "Dalarö – porten till södra skärgården", "Dalarö når du enkelt med bil eller bus från Haninge och Stockholm" (läst 2026-09-27)
    tagline: 'Lots- och tullsamhället som blev badort — södra skärgårdens port, nåbar med bil och buss.',
    description: [
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/dalaro/ — "Dalarö är lots- och tullsamhället som sedan blev badortsidyll"; "snirkliga gator, gränder och villor med snickarglädje i schweizisk anda"; Strindberg kallade det "porten till paradiset"
      'Dalarö är lots- och tullsamhället som sedan blev badortsidyll. Här möts snirkliga gator och gränder och villor med snickarglädje i schweizisk anda. August Strindberg kallade platsen "porten till paradiset".',
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/oevrigt/dalaro-tullhus — 1636 räknas som grundläggningsår för samhället Dalarö; "I samband med att systemet avskaffades 1928 drogs även tullstationen in"
      'År 1636 blev Dalarö inloppsstation för Stockholm, och 1636 räknas som grundläggningsår för samhället. Tullstationen drogs in när systemet avskaffades 1928.',
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/oevrigt/dalaro-tullhus — uppfört "under åren 1787–88" efter Erik Palmstedts ritningar; "ett av en handfull tullhus som är statligt byggnadsminne"; Haninge kommun använder det som turistbyrå och skärgårdsmuseum
      'Dalarö tullhus uppfördes 1787–88 efter Erik Palmstedts ritningar och är ett av en handfull tullhus som är statligt byggnadsminne. Haninge kommun använder byggnaden som turistbyrå och skärgårdsmuseum.',
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/dalaro-skans — "man beslöt 1656 att på Stockskäret anlägga en skans"; "1683 ritade generalkvartermästaren Erik Dahlbergh ett förslag"; "Först 1698 påbörjades arbeten ... ända till 1724 innan skansen var försvarsduglig"; "1854 upphörde den att räknas till rikets fasta försvar"
      'Dalarö skans går tillbaka till 1656, då man beslöt att på Stockskäret anlägga en skans. 1683 ritade generalkvartermästaren Erik Dahlbergh ett förslag till förbättring och förstärkning, men först 1698 påbörjades arbetena, och det dröjde till 1724 innan skansen var försvarsduglig. 1854 upphörde den att räknas till rikets fasta försvar. Skansen är statligt byggnadsminne.',
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/dalaro/ — "Dalarö når du enkelt med bil eller buss från Haninge och Stockholm"; orten är "en populär utgångspunkt för att upptäcka Haninges öar"
      'Dalarö når man enkelt med bil eller buss från Haninge och Stockholm. Det gör orten ovanlig bland skärgårdsmålen — man behöver ingen båt för att komma hit — och den fungerar som utgångspunkt för att upptäcka Haninges öar.',
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/dalaro/ — bada "på olika badplatser (till exempel Schweizerbadet)"; "paddla kajak, segla, kitesurfning och SUP-bräda"; "dyka vid Dalarös unika skeppsvraksområde"
      'Det finns flera badplatser, till exempel Schweizerbadet. Runt Dalarö går det att paddla kajak, segla, kitesurfa och paddla SUP, och utanför orten ligger ett skeppsvraksområde som går att dyka vid.',
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/dalaro/ — "naturhamnar och gästhamn för fritidsbåtar"; "små butiker, bageri och museum att besöka"; "pittoreska caféer och restauranger"
      'I Dalarö finns naturhamnar och gästhamn för fritidsbåtar, små butiker, bageri och museum, och kaféer och restauranger.',
      // KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/dalaro-askfatshamnen/ — "Klubbhamn vid Dalarö kanals södra mynning", "Centrum 500 m - gångstig över Askfatsberget", "Schweizerbadet 500 m", gästplatser "40 (15/5-15/9)" (läst 2026-09-27)
      // KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/dalaro-hotellbryggan/ — "På Dalarös östra sida nära centrum", "Fri tilläggning under dagen", "Vandrarhemmet Lotsen 50 m" (läst 2026-09-27)
      'Båtfolk har två gästhamnar att välja på. Askfatshamnen är en klubbhamn vid Dalarö kanals södra mynning med 40 gästplatser 15 maj–15 september, 500 meter från centrum via en gångstig över Askfatsberget. Hotellbryggan ligger på östra sidan nära centrum, och där är det fri tilläggning under dagen.',
      // KÄLLA: https://www.svenskakyrkan.se/haninge/historik-dalaro-kyrka — kyrkan uppfördes 1649–1652 som kapell; "Fram till 1780-talet behöll kapellet sin form, en rektangulär knuttimrad byggnad med sadeltak och sakristia i norr"; ombyggnad 1786–1787 då "väggarna höjdes och brädfodrades, taket fick sin brutna form"; restaurering 1936 av arkitekt Einar Lundberg; kyrkan och Sandemar var de enda byggnader som inte brändes av ryssarna 1719
      'Dalarö kyrka byggdes 1649–1652 som kapell och var fram till 1780-talet en rektangulär knuttimrad byggnad med sadeltak och sakristia i norr. Vid ombyggnaden 1786–87 höjdes och brädfodrades väggarna och taket fick sin brutna form. 1936 restaurerades kyrkan av arkitekten Einar Lundberg, som ville stärka 1780-talets gestaltning. Kapellet och Sandemar slott var de enda två byggnader som ryssarna inte brände ned 1719.',
      // KÄLLA: https://www.dalarohembygd.se/Aretvarx/Aret%20var%20kronologi.pdf — "1719 Ryska galärflottan bränner de flesta husen i Dalarö som ligger kustnära"; "1890 En brand förstör 27 hus i centrala Dalarö den 30 september"
      'Dalarö har brunnit två gånger på allvar. 1719 brände den ryska galärflottan de flesta av de kustnära husen, och den 30 september 1890 förstörde en brand 27 hus i centrala Dalarö.',
      // KÄLLA: https://www.dalarohembygd.se/Aretvarx/Aret%20var%20kronologi.pdf — "1675 Per Eriksson utses till Sveriges första lotsåldersman, med placering på Dalarö"; "1770 Kungligt postkontor, med egen postmästare, Lars Filéen inrättas på Dalarö den 14 mars"; "1858 Elektrisk telegraflinje mellan Stockholm - Dalarö invigs"; "1844 Inrättades den första skolan i hyrd lokal"
      'Dalarö var länge en plats där staten hade personal. 1675 utsågs Per Eriksson till Sveriges första lotsåldersman, placerad här. Kungligt postkontor med egen postmästare inrättades 14 mars 1770, den första skolan öppnade 1844 i en hyrd lokal, och 1858 invigdes den elektriska telegraflinjen mellan Stockholm och Dalarö.',
      // KÄLLA: https://www.dalarohembygd.se/Aretvarx/Aret%20var%20kronologi.pdf — "1839 Den första lustresan, 7 juli, med hjuldrivna ångslupen Bellman till Dalarö"; "1865 Varmbadhuset i Fiskarhamnen uppförs"
      // KÄLLA: https://stockholmslansmuseum.se/besoksmal/dalaro-och-dalaro-skans/ — ångbåtstrafik till Stockholm 1852; "Vid slutet av 1800-talet och början av 1900-talet blev det populärt bland stockholmare som hade råd att bygga sommarhus"; "Kända konstnärer som Anders Zorn arbetade och kopplade av på Dalarö"
      'Badortsepoken har ett startdatum: den 7 juli 1839 gick den första lustresan hit med den hjuldrivna ångslupen Bellman. Reguljär ångbåtstrafik till Stockholm kom 1852, varmbadhuset i Fiskarhamnen uppfördes 1865, och mot slutet av 1800-talet blev det populärt bland stockholmare med råd att bygga sommarhus här. Anders Zorn hörde till dem som arbetade och kopplade av på Dalarö.',
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/besok-och-upplev-haninge/sevardheter/dalaro-skeppsvraksomrade/ — omkring 30 registrerade fartygslämningar från 1600- till 1900-talet, varav tre gjorts tillgängliga för dykning; all dykning måste ske från båt; tillstånd krävs från Dalarö Dykpark före varje dyk; dykguide håller en kulturhistorisk genomgång före dyket; förbjudet att dyka över skrovet; minst en meters säkerhetsavstånd till fartygslämningen
      'I vattnen utanför Dalarö finns ungefär trettio registrerade fartygslämningar från 1600- till 1900-talet, och tre av dem har gjorts tillgängliga för dykning. Det är inte fritt fram: all dykning ska ske från båt, tillstånd krävs före varje dyk, en dykguide håller en kulturhistorisk genomgång innan man går i, det är förbjudet att dyka över skrovet och minst en meters säkerhetsavstånd till lämningen ska hållas.',
      // KÄLLA: https://www.vrak.se/utforska/vrak-och-lamningar/1600-talet/riksapplet — "Fartyget byggdes på flottans varv vid Stigberget i Göteborg och var färdigt 1663"; längd 48 meter, bredd 12 meter; i storm 5 juni (1676) "slet sig skeppet från sina förtöjningar, grundstötte och sjönk på 16 meters djup"; djup 7–16 meter
      'Det mest kända vraket är regalskeppet Riksäpplet. Det byggdes på flottans varv vid Stigberget i Göteborg och var färdigt 1663, fyrtioåtta meter långt och tolv meter brett. I en våldsam storm den 5 juni 1676 slet det sig från sina förtöjningar, grundstötte och sjönk. Resterna ligger på mellan sju och sexton meters djup.',
      // KÄLLA: https://stockholmslansmuseum.se/besoksmal/dalaro-och-dalaro-skans/ — "Dalarö blev 1636 platsen för den så kallade stora sjötullen och landets viktigaste tullstation"; Dalarö beskrivs som "fortfarande ett levande skärgårdssamhälle" med välbevarad bebyggelse från 1800-talets senare del
      // KÄLLA: https://stockholmslansmuseum.se/besoksmal/dalaro-och-dalaro-skans/ — "Dagens Dalarö är därmed Haninge kommuns äldsta tätort och fortfarande ett levande skärgårdssamhälle med Dalarö torg som central plats" (läst 2026-09-27)
      'Den bebyggelse som möter en i dag rymmer många rikt utsirade trävillor från slutet av 1800-talet och början av 1900-talet, och Stockholms läns museum beskriver Dalarö som ett fortfarande levande skärgårdssamhälle. Dalarö är också Haninge kommuns äldsta tätort, med Dalarö torg som central plats.',
    ],
    facts: {
      // KÄLLA: https://kund.printhuset-sthlm.se/sl/v839.pdf — "839 Handens station–Dalarö (–Smådalarö)", "Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026", "Tidtabellen är anpassad till pendeltåg från Stockholm vid" Handens station; Handens station → Hotellbryggan 33–40 min, alla dagar (läst 2026-09-27)
      // KÄLLA: https://kund.printhuset-sthlm.se/sl/v869.pdf — "869 Globen–Dalarö", "Lördag, söndag och helgdag", "Ingen trafik"; Slakthuset (Globen) → Hotellbryggan 46–50 min, fyra turer vardagar (läst 2026-09-27)
      travel_time: 'Buss 839 från Handens station 33–40 min, alla dagar (buss 869 från Slakthuset/Globen vardagar, 46–50 min)',
      // KÄLLA: https://stockholmslansmuseum.se/besoksmal/dalaro-och-dalaro-skans/ — "Dalarö är ett gammalt lots- och tullsamhälle som vid slutet av 1800-talet blev semesterort för välbärgade stockholmare" (läst 2026-09-27)
      character: 'Lots- och tullsamhälle från 1636 som blev semesterort vid slutet av 1800-talet',
      // KÄLLA: https://kund.printhuset-sthlm.se/sl/v839.pdf — trafik alla dagar året runt enligt tabellen; https://www.svenskagasthamnar.se/stockholms-skargard/dalaro-askfatshamnen/ — gästplatser "40 (15/5-15/9)" (läst 2026-09-27)
      season: 'Året runt med buss och bil; gästhamnssäsong 15 maj–15 september',
      // UPPSKATTNING: redaktionell bedömning utifrån kommunikationer och sevärdheter ovan
      best_for: 'Dagsturer utan båt, kulturhistoria, vrakdykning, båt vidare till Ornö och Utö',
    },
    facts_provenance: { travel_time: 'matt', character: 'matt', season: 'matt', best_for: 'bedomning' },
    activities: [
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/dalaro-skans — "man beslöt 1656 att på Stockskäret anlägga en skans", "Statligt byggnadsminne (SBM)", "Idag kan Dalarö skans hyras för olika evenemang", "Allmänhet har också möjlighet att besöka ön med egen båt eller genom Waxholmsbolagets turer" (läst 2026-09-27)
      { icon: '🏰', name: 'Dalarö skans', desc: 'Skans på Stockskäret, beslutad 1656 och statligt byggnadsminne. I dag hyrs den ut för evenemang; ön nås med egen båt eller med Waxholmsbolagets turer.' },
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "19A STOCKHOLM – DALARÖ – ORNÖ (ÖSTRA SIDAN) – UTÖ"; https://kund.printhuset-sthlm.se/wa/h20.pdf — "20A DALARÖ – ORNÖ (VÄSTRA SIDAN)", "Gruvbryggan (Utö)", "Spränga (Utö)"; båda "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026" (läst 2026-09-27)
      { icon: '⛵', name: 'Båt mot Ornö och Utö', desc: 'Från Dalarö går Waxholmsbolagets linje 19 mot Ornös östra sida och Utö och linje 20 mot Ornös västra sida, där vissa turer angör Gruvbryggan och Spränga på Utö.' },
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/sevardheter/dalaro-skeppsvraksomrade/ — "I Dalaröområdet finns ett 30-tal registrerade fartygslämningar från 1600- till 1900-talet", "All dykning inom Dalarö skeppsvraksområde ska ske från en båt", "detta sker via Dalarö Dykpark" (läst 2026-09-27)
      { icon: '🤿', name: 'Vrakdykning', desc: 'Tre av ett trettiotal registrerade vrak utanför Dalarö är tillgängliga för dykning, alltid från båt och med tillstånd via Dalarö Dykpark före varje dyk.' },
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/oevrigt/dalaro-tullhus — "Idag används huset av Haninge kommun som turistbyrå och skärgårdsmuseum" (läst 2026-09-27); https://stockholmslansmuseum.se/besoksmal/dalaro-och-dalaro-skans/ — "I tullhuset från 1788 finns nu Dalarö Kultur- och Föreningscentrum med ett skärgårdsmuseum och turistbyrå" (läst 2026-09-27)
      { icon: '🚶', name: 'Skärgårdsmuseet i Tullhuset', desc: 'Haninge kommun har turistbyrå och skärgårdsmuseum i tullhuset från 1787–88, ritat av Erik Palmstedt.' },
    ],
    // KÄLLA: https://smadalarogard.se/ — "Smådalarö Gård Hotell & Spa", "Ett av Sveriges största spahotell i Stockholms skärgård", "Spa, aktiviteter, närodlad mat och personlig service" (läst 2026-09-27); https://kund.printhuset-sthlm.se/sl/v839.pdf — "839 Handens station–Dalarö (–Smådalarö)", "Endast vissa turer" (läst 2026-09-27)
    // KÄLLA: https://vandrarhemmetlotsen.se/ — "VI HAR ÖPPET ÅRET RUNT!", "I Fiskehamnen precis vid vattnet ligger Vandrarhemmet Lotsen", "Huset har 12 bäddar fördelat på 4 rum, alla med sjöutsikt" (läst 2026-09-27). Inte STF. Dalarö Strand Hotell gick inte att belägga; Dalarö Skans är evenemangsplats (SFV), inget boende (läst 2026-09-14).
    accommodation: [
      { name: 'Smådalarö Gård', type: 'Hotell', desc: 'Hotell och spa på Smådalarö utanför Dalarö, med spa, restauranger och konferens. Buss 839 fortsätter till Smådalarö på vissa turer.', websiteUrl: 'https://smadalarogard.se' },
      { name: 'Vandrarhemmet Lotsen', type: 'Vandrarhem', desc: 'Vandrarhem i Fiskehamnen vid vattnet, 12 bäddar i fyra rum, alla med sjöutsikt. Öppet året runt.', websiteUrl: 'https://vandrarhemmetlotsen.se' },
    ],
    getting_there: [
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/dalaro/ — "Dalarö når du enkelt med bil eller bus från Haninge och Stockholm" (läst 2026-09-27)
      { method: 'Bil', from: 'Stockholm', time: '', desc: 'Dalarö nås med bil från Haninge och Stockholm – ingen båt behövs.', icon: '🚗' },
      // KÄLLA: https://kund.printhuset-sthlm.se/sl/v839.pdf — "839 Handens station–Dalarö (–Smådalarö)", "Tidtabellen är anpassad till pendeltåg från Stockholm vid" Handens station, "Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026"; Handens station → Hotellbryggan 33–40 min (läst 2026-09-27); https://kund.printhuset-sthlm.se/sl/v869.pdf — "869 Globen–Dalarö", "Ingen trafik" lördag, söndag och helgdag; 46–50 min (läst 2026-09-27). Pendeltågets restid Stockholm C–Handen är inte belagd (ingen aktuell tryckt tabell för linje 43 hittades).
      { method: 'Pendeltåg + Buss', from: 'Handens station', time: '33–40 min', desc: 'Pendeltåg till Handens station, sedan SL-buss 839 till Dalarö (Hotellbryggan), alla dagar och anpassad till tågen. Buss 869 går vardagar från Slakthuset vid Globen (46–50 min).', icon: '🚌' },
    ],
    harbors: [
      // KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/dalaro-askfatshamnen/ — "Klubbhamn vid Dalarö kanals södra mynning", "Centrum 500 m - gångstig över Askfatsberget", gästplatser "40 (15/5-15/9)"; färskvatten, toalett ("kodlås"), dusch och eluttag ("50 kr/dygn") finns; diesel och bensin "1 km" bort (läst 2026-09-27)
      { name: 'Dalarö Gästhamn (Askfatshamnen)', desc: 'Klubbhamn vid Dalarö kanals södra mynning med 40 gästplatser 15 maj–15 september, 500 m från centrum. Diesel och bensin finns cirka 1 km bort.', spots: 40, fuel: false, service: ['el', 'vatten', 'dusch', 'toilet'] },
      // KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/dalaro-hotellbryggan/ — "På Dalarös östra sida nära centrum", "ca 25", "Fri tilläggning under dagen", "Restaurang" "även kafé" (läst 2026-09-27)
      { name: 'Hotellbryggan', desc: 'Brygga på Dalarös östra sida nära centrum med cirka 25 platser. Fri tilläggning under dagen, avgift över natten.', spots: 25 },
    ],
    restaurants: [
      // KÄLLA: https://www.tullhuset.nu/ — "Tullhuset Restaurant & Bar är en skärgårdskrog som huserar i anrika Dalarö Tullhus", "Från och med måndagen den 17 augusti välkomnar vi er följande tider" (17 augusti är en måndag 2026) (läst 2026-09-27); https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/oevrigt/dalaro-tullhus — "här finns också Tullhuset Restaurant & Bar" (läst 2026-09-27)
      { name: 'Tullhuset Restaurant & Bar', type: 'Restaurang', desc: 'Skärgårdskrog i Dalarö tullhus med säsongsmeny, luncher och middagar. Har hösttider från mitten av augusti – se webbplatsen.', websiteUrl: 'https://www.tullhuset.nu' },
      // KÄLLA: https://www.dalarobageri.se/ — "Odinsvägen 15", "Veckans lunch", "Cafémeny", "Kvällsöppet" (läst 2026-09-27)
      { name: 'Dalarö Bageri', type: 'Bageri', desc: 'Bageri och café på Odinsvägen 15 med veckans lunch och cafémeny.', websiteUrl: 'https://www.dalarobageri.se' },
    ],
    tips: [
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/dalaro-skans — skansen anlades från 1656 och är statligt byggnadsminne
      'Dalarö skans går tillbaka till 1656 och är statligt byggnadsminne.',
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/dalaro/ — "dyka vid Dalarös unika skeppsvraksområde"
      'Skeppsvraksområdet utanför Dalarö går att dyka vid.',
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/dalaro/ — "en populär utgångspunkt för att upptäcka Haninges öar"
      'Dalarö är en utgångspunkt för att ta sig vidare till Haninges öar.',
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/sevardheter/dalaro-skeppsvraksomrade/ (läst 2026-09-20) — all dykning ska ske från båt, tillstånd krävs före varje dyk, dykguide håller kulturhistorisk genomgång, förbjudet att dyka över skrovet
      'Vrakdykningen är reglerad: dyk sker från båt, kräver tillstånd i förväg och sker med guide — man kan inte bara hoppa i från land.',
      // KÄLLA: https://www.svenskakyrkan.se/haninge/historik-dalaro-kyrka — kyrkan från 1649–1652, ombyggd 1786–87, en av få byggnader som klarade 1719
      'Dalarö kyrka från 1649–52 är en av få byggnader på platsen som klarade ryssarnas härjningar 1719.',
    ],
    related: ['uto', 'nattaro', 'orno'],
    tags: ['historia', 'hamn', 'utgångspunkt', 'södern', 'fortet'],
    // KÄLLA: https://stockholmslansmuseum.se/besoksmal/dalaro-och-dalaro-skans/ — "Dalarö blev 1636 platsen för den så kallade stora sjötullen och landets viktigaste tullstation" (läst 2026-09-27); https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/oevrigt/dalaro-tullhus — "Inloppsstation för Stockholm blev Dalarö", "I samband med att systemet avskaffades 1928 drogs även tullstationen in", "Byggår:" "1787–88" (läst 2026-09-27)
    did_you_know: 'Dalarö blev 1636 platsen för "stora sjötullen" — landets viktigaste tullstation och inloppsstation för Stockholm. Tullstationen drogs in först 1928, och tullhuset från 1787–88 står kvar vid vattnet.',
    insiderTips: [
      // KÄLLA: https://kund.printhuset-sthlm.se/sl/v839.pdf — "839 Handens station–Dalarö (–Smådalarö)", "Lördag, söndag helgdag" med turer hela dagen (läst 2026-09-27)
      'Buss 839 från Handens station går alla dagar och tar 33–40 minuter till Hotellbryggan – du behöver varken bil eller båt för en dagstur hit.',
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/oevrigt/dalaro-tullhus — "Dalarö tullhus uppfördes under åren 1787–88, efter ritningar av Erik Palmstedt", "Inloppsstation för Stockholm blev Dalarö" (läst 2026-09-27)
      'Tullhuset i Dalarö byggdes 1787–88 efter ritningar av Erik Palmstedt. Dalarö var inloppsstation för Stockholm i det tullsystem som infördes 1636 och avskaffades 1928.',
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/sevardheter/dalaro-skeppsvraksomrade/ — "Dalarö med omnejd är ett av Sveriges mest fornlämningstäta när det gäller fartygslämningar äldre än 100 år" (läst 2026-09-27)
      'Dalarö med omnejd hör enligt Haninge kommun till de mest fornlämningstäta områdena i Sverige när det gäller fartygslämningar äldre än 100 år.',
      // KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/dalaro-askfatshamnen/ — "Schweizerbadet 500 m", "Centrum 500 m - gångstig över Askfatsberget" (läst 2026-09-27)
      'Från Askfatshamnen är det 500 meter både till centrum (gångstig över Askfatsberget) och till Schweizerbadet.',
    ],
    seasonal: {
      open: 'Hela året',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      // KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/dalaro-askfatshamnen/ — gästplatser "40 (15/5-15/9)" (läst 2026-09-27); https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-haninge-kommun/havsbadet-schweizerbadet-dalaro.html — "10 Bajamajor + 1 Handikapp finns 1 juni - 15 september" (läst 2026-09-27); https://kund.printhuset-sthlm.se/sl/v839.pdf — trafik alla dagar
      bestReason: 'Buss 839 går hela året, men gästplatserna i Askfatshamnen gäller 15 maj–15 september och Schweizerbadet har full service 1 juni–15 september. Juni och första halvan av september ligger inom båda.',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },
    activity_meta: {
      bad: {
        beaches: [
          // KÄLLA: https://www.haninge.se/uppleva-och-gora/idrott-och-friluftsliv/friluft-och-natur/bad/ — "Stort bad vid havet med strand. Schweizerbadet är känt för att vara väldigt långgrunt.", "Grillplats:", "Stor parkering.", "Närmaste busshållplats Schweizerparken.", "Ja, vid Vadviken." (hundbad) (läst 2026-09-27)
          // KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-haninge-kommun/havsbadet-schweizerbadet-dalaro.html — "Havsbadet Schweizerbadet, Dalarö är ett EU-bad", "10 Bajamajor + 1 Handikapp finns 1 juni - 15 september", "Foodtruck, Dalarö Mat och Glasskiosk"; klassificering 2025: utmärkt kvalitet (läst 2026-09-27)
          // UPPSKATTNING: typ sandstrand – kommunen skriver "strand" och "väldigt långgrunt" men nämner inte sand uttryckligen
          {
            name: 'Schweizerbadet',
            type: 'sandstrand',
            desc: 'Stort EU-bad vid havet med strand, känt för att vara väldigt långgrunt. Badvattnet klassades som utmärkt 2025. Grillplats, kiosk och bajamajor 1 juni–15 september.',
            child_friendly: true,
            depth: 'Väldigt långgrunt enligt Haninge kommun.',
            directions: 'Buss 839 eller 869 till hållplatsen Schweizerparken. Stor parkering. Från Askfatshamnen är det cirka 500 m.',
            insider_tip: 'Har du hund? Hundbadet ligger vid Vadviken.',
          },
        ],
      },
    },
  },
  // ─── ARHOLMA ─────────────────────────────────────────────────
  {
    slug: 'arholma',
    name: 'Arholma',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌊',
    // KÄLLA: https://skargardsstiftelsen.se/omraden/arholma/ — "Arholma är en av de nordligaste öarna i Stockholms skärgård" (läst 2026-09-27)
    // KÄLLA: https://stockholmslansmuseum.se/besoksmal/arholma/ — "På Arholma finns inga bilar" (läst 2026-09-27)
    // KÄLLA: https://www.sjofartsverket.se/sv/om-oss/fyrar-och-kulturfastigheter/visningsfyrar/arholma-bak/ — "byggdes 1768 av hovjunkaren Pehr Ridderstad" (läst 2026-09-27)
    // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/arholma-ido.html — "Området ligger exponerat mot Ålands hav" (läst 2026-09-27)
    tagline: 'Bilfri ö längst norrut i Stockholms skärgård — båk från 1768 och naturreservat mot Ålands hav.',
    description: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/arholma-ido.html — reservatet i Norrtälje kommun; relativt flack terräng; "skärgård, marina miljöer och odlingslandskap"
      'Arholma ligger längst ut i Roslagens skärgård i Norrtälje kommun, där skärgården övergår i öppet hav. Terrängen är relativt flack, vinden ofta märkbar och horisonten öppen österut.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/arholma-ido.html — "Arholma och öarna öster därom samt Idö, Idskär och några mindre öar"; bildat 1965; 1 866 ha varav 538 ha land; Natura 2000
      'Naturreservatet Arholma-Idö bildades 1965 och omfattar Arholma och öarna öster därom samt Idö, Idskär och några mindre öar. Reservatet är 1 866 hektar, varav 538 hektar land, och ingår i Natura 2000. Landskapet är skärgård, marina miljöer och odlingslandskap, med åkrar, strandängar och betesmarker.',
      // KÄLLA: https://www.sjofartsverket.se/sv/om-oss/fyrar-och-kulturfastigheter/visningsfyrar/arholma-bak/ — "byggdes 1768 av hovjunkaren Pehr Ridderstad från Rådmansö"; "ett runt, 12,5 meter högt stentorn med koniskt tak"; "ritad av Carl Johan Cronstedt (1709–1777), som även konstruerade den svenska kakelugnen"; "Den är en så kallad känningsbåk och har aldrig haft fyrljus. Sjömärket syns cirka 15 nautiska mil"; "fungerade också som lotsutkik fram till 1875"; "Under kriget mot Ryssland 1809 fungerade båken som en av många optiska telegrafstationer"; "Under andra världskriget 1939-45 inrymde båken också en signalstation med en underliggande stridsledningscentral"; statligt byggnadsminne sedan 1935 (läst 2026-09-19)
      'Arholma båk byggdes 1768 av hovjunkaren Pehr Ridderstad från Rådmansö — ett runt, 12,5 meter högt stentorn med koniskt tak, ritat av Carl Johan Cronstedt, som också konstruerade den svenska kakelugnen. Det är en så kallad känningsbåk som aldrig haft fyrljus men syns cirka 15 nautiska mil, och den fungerade som lotsutkik fram till 1875. Under kriget mot Ryssland 1809 var båken optisk telegrafstation, och under andra världskriget inrymde den en signalstation med stridsledningscentral under sig. Sedan 1935 är båken statligt byggnadsminne.',
      // KÄLLA: https://arholmahandel.se/ — "åretruntöppen butik"; "livsmedel, nybakat bröd och produkter från lokala producenter"; "bensin, diesel, gasol och kemtekniska varor"; ombud för apotek och Systembolaget, postservice, cykeluthyrning, stuguthyrning; bryggcafé sommartid
      'Arholma Handel är en åretruntöppen butik med livsmedel, nybakat bröd och produkter från lokala producenter. Där finns också bensin, diesel och gasol, ombud för apotek och Systembolaget, postservice, cykeluthyrning och stuguthyrning. Sommartid driver de ett bryggcafé.',
      // KÄLLA: https://arholmanord.se/ — "Vandrarhem, restaurang, guidade turer och aktiviteter i egen havsvik på Arholma i Stockholms norra skärgård"
      'Arholma Nord erbjuder vandrarhem, restaurang, guidade turer och aktiviteter i en egen havsvik.',
      // KÄLLA: https://blidosundsbolaget.se/norra-batlinjen/ — "I sommar erbjuder vi dagliga avgångar mellan den 6 juli och 9 augusti"; "09:30 Norrtälje, längst bort på Norrtälje hamnpromenad, vid bron Havslänken"; "M/S Rex" (läst 2026-09-27)
      // KÄLLA: https://www.arholma.nu/resa-hit — "Härifrån går passbåten Monsun till Arholma året runt. Resan tar cirka 15 minuter" (läst 2026-09-27)
      'Sommaren 2026 gick Blidösundsbolagets Norra båtlinjen dagligen 6 juli–9 augusti från Norrtälje hamn till Lidö och Arholma med M/S Rex, med avgång 09.30. Året runt är vägen hit annars buss eller bil till Simpnäs och passbåten Monsun, en överfart på ungefär en kvart.',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-arholma/ — "I öns nordöstra hörn belönas du med en fantastisk utsikt över Ålands hav"; "Naturen är karg på nordöstra sidan och betesmarkerna är bördiga mitt på ön" (läst 2026-09-27)
      // KÄLLA: https://stockholmslansmuseum.se/besoksmal/arholma/ — "Vi klart väder kan man se Åland härifrån" (läst 2026-09-27)
      'Naturen är karg på öns nordöstra sida, där utsikten öppnar sig över Ålands hav, medan betesmarkerna mitt på ön är bördiga. Från båken kan man enligt Stockholms läns museum se Åland när vädret är klart.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/arholma-ido.html — förvaltare Skärgårdsstiftelsen, markägare Skärgårdsstiftelsen, staten och privata; "lek- och uppväxtplatser för fisk"; mjuka lerbottnar, skärgårdsgrund och sandbottnar; öarna hyser flera häckande rovfåglar; lundmiljöer med rik kärlväxt- och svampflora
      'Reservatet förvaltas av Skärgårdsstiftelsen, och marken ägs av stiftelsen, staten och privata. Det som skyddas är inte bara land: de mjuka lerbottnarna, grunden och sandbottnarna runt öarna är lek- och uppväxtplatser för fisk. På land finns lundmiljöer med rik kärlväxt- och svampflora, och öarna hyser flera häckande rovfåglar.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/arholma-ido.html — "medföra okopplad hund"; "för längre tid än två dygn i följd förtöja, dra upp eller förankra båt eller annan farkost vid samma plats (gäller ej brygga)"; "för längre tid än två dygn i följd tälta på samma plats, annat än inom anlagd tältplats"; "elda annat än på anvisad plats"; "under tiden 1 april till 31 juli landstiga på öarna Rödkobben och Nollekobb"; "ankra båt eller framföra motordriven båt i inre delen av Idöfladen" (läst 2026-09-27)
      'Föreskrifterna är värda att läsa innan du åker. Hunden ska vara kopplad, och båt får inte ligga förtöjd på samma plats mer än två dygn i följd (bryggor undantagna). Samma tvådygnsgräns gäller tältning utanför anlagd tältplats, och eld får bara göras på anvisad plats. På Rödkobben och Nollekobb råder landstigningsförbud 1 april–31 juli, och i inre Idöfladen är det förbjudet att ankra eller köra motorbåt.',
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/arholma-nord — anläggningen stod färdig 1968; bergrum "i fyra nivåer" med "stridsledningscentral, kraftaggregatsrum, verkstäder, logement, kök med kantin, sjukvårdrum och operationssal"; ca 110 man; 10,5 cm kustartilleripjäs; sista kanonskottet 1992; statligt byggnadsminne våren 2007; SFV tog över förvaltningen 2008
      'Inne i Arholmas norra bergssida ligger Batteri Arholma, färdigt 1968. Bergrummen är byggda i fyra nivåer och rymde stridsledningscentral, kraftaggregatsrum, verkstäder, logement, kök med kantin, sjukvårdsrum och operationssal för omkring 110 man, medan en 10,5 centimeters kustartilleripjäs stod uppe i dagen. Det sista kanonskottet avlossades 1992. Anläggningen blev statligt byggnadsminne våren 2007, och Statens fastighetsverk tog över förvaltningen 2008.',
      // KÄLLA: https://www.norrtalje.se/info/kultur-och-fritid/kultur-och-konst/norrtalje-museerkulturarv-och-stadsarkiv/museer-hembygds--och-kulturforeningar/batteri-arholma--upplevelsemuseum/ — "Anläggningen byggdes för Kalla kriget och stod klar 1968"; "På ön Arholmas norra spets och gömd i berget"; "Den visas av säkerhetsskäl endast genom guidade turer"
      'Batteriet ligger på öns norra spets och är gömt i berget. Norrtälje kommun anger att anläggningen av säkerhetsskäl endast visas genom guidade turer — det går alltså inte att gå in på egen hand.',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-arholma/ — "Arholma markerar den nordligaste punkten på den 270 km långa Stockholm Archipelago Trail"; etappen anges som "Medel 13.4 km"; start vid kajen på Arholma; leden passerar Bull-Augusts gård, kyrkan och båken
      'Arholma markerar den nordligaste punkten på den 270 kilometer långa Stockholm Archipelago Trail. Öns egen etapp är omkring 13,4 kilometer och börjar vid kajen; sträckningen går genom skogen i norr, ut mot kusten och tillbaka på grusvägar förbi Bull-Augusts gård, kyrkan och båken. Det är en dagsvandring snarare än en promenad.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/arholma/ — "landskapet brukats i hundratals år"; "åkrar, strandängar, hagmarker och skogspartier"; "på Arholma är kor våra bästa naturvårdsarbetare, de hjälper till att hålla markerna öppna"; Bull-Augusts gård är "en klassisk roslagsgård som idag fungerar som vandrarhem"
      'Skärgårdsstiftelsen beskriver ett landskap som brukats i hundratals år, med åkrar, strandängar, hagmarker och skogspartier. Att markerna fortfarande är öppna är inget som sker av sig självt: enligt stiftelsen är korna på Arholma \'våra bästa naturvårdsarbetare\'. Bull-Augusts gård, en klassisk roslagsgård, fungerar i dag som vandrarhem.',
      // KÄLLA: https://sfv.se/upptack-mer/kulturvarden/sok-innehall/kulturvarden-2-2020/en-hallbar-utpost — "Det var vattenbristen 2018 som gjorde att vi började diskutera den här lösningen"; "Här hämtas vattnet direkt från Östersjön och filtreras, avsaltas, renas och mineraliseras"; "Systemet täcker hela vandrarhemmets vattenbehov" (läst 2026-09-27)
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/arholma-nord — "Cirka 50 personer bor här året runt"; "Här finns handelsbod, vandrarhem, gästbryggor, kyrka, restaurang och caféer" (läst 2026-09-27)
      'Vatten är den begränsande resursen här ute. Efter vattenbristen 2018 byggdes en anläggning i Batteri Arholmas bergrum som tar vatten direkt från Östersjön och filtrerar, avsaltar, renar och mineraliserar det — den täcker hela Arholma Nords vattenbehov. Omkring 50 personer bor på ön året runt, och här finns handelsbod, vandrarhem, gästbryggor, kyrka, restaurang och kaféer.',
    ],
    facts: {
      // KÄLLA: https://kund.printhuset-sthlm.se/sl/h636.pdf — "Norrtälje busstation 08.23 10.21 12.21"; "Simpnäs brygga 10.05b 11.42 13.31"; "Giltig 17 augusti–12 december 2026" (läst 2026-09-27)
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h30.pdf — "Simpnäs (Björkö) 07.05 08.00 10.10 13.35"; "Arholma 07.20 08.15 10.25 13.50". Restid vardag: buss 12.21–13.31 (70 min) + båt 13.35–13.50 = 1 h 29 min (läst 2026-09-27)
      travel_time: 'Buss 636 från Norrtälje till Simpnäs brygga (ca 70 min), sedan passbåt 15 min — ca 1,5 h med anslutning',
      // KÄLLA: https://stockholmslansmuseum.se/besoksmal/arholma/ — "På Arholma finns inga bilar" (läst 2026-09-27)
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/arholma-nord — "Kustartilleribatteriet AH på Arholma var en av landets viktigaste försvarsanläggningar under kalla kriget" (läst 2026-09-27)
      character: 'Bilfri ö med båk, kalla krigets batteri och naturreservat',
      // KÄLLA: https://www.arholma.nu/resa-hit — "passbåten Monsun till Arholma året runt" (läst 2026-09-27)
      // KÄLLA: https://arholmahandel.se/ — "en välsorterad åretruntöppen butik"; "Sommartid driver vi även ett Bryggcafé" (läst 2026-09-27)
      season: 'Året runt (kaféer och restauranger sommartid)',
      // UPPSKATTNING: målgrupper utifrån Archipelago Trail-etappen, gästhamnarna och båken/batteriet
      best_for: 'Vandrare, seglare, sjöfarts- och försvarshistoria',
    },
    activities: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/arholma-ido.html — "Farleden mellan den svenska och åländska skärgården har under mycket lång tid passerat Arholma" (läst 2026-09-27)
      // KÄLLA: https://www.arholma.nu/resa-hit — "har plats för ett 20-tal båtar och gästbryggan i" (läst 2026-09-27)
      { icon: '⛵', name: 'Segling', desc: 'Farleden mellan den svenska och åländska skärgården har länge passerat Arholma. Gästbryggan i Österhamn tar ett 20-tal båtar och den i Ahlmansviken 30.' },
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-arholma/ — "Arholma markerar den nordligaste punkten på den 270 km långa Stockholm Archipelago Trail"; "Etappen börjar vid kajen på Arholma"; "Här är leden på lite mer teknisk stig" (läst 2026-09-27)
      { icon: '🥾', name: 'Vandring', desc: 'Stockholm Archipelago Trails nordligaste etapp, 13,4 km, börjar vid kajen och går genom skogen ut mot havet i norr och längs östra kusten, där stigen är mer teknisk.' },
      // KÄLLA: https://arholmahandel.se/cykeluthyrning/ — "Halvdag"; "(4h) – 100kr"; "(8h) – 150kr"; "(24h) – 200kr"; "(7 dagar) – 1000kr"; "Hyr din cykel och hämta direkt på bryggan där båten lägger till"; "på grund av högt tryck rekommenderar vi att du bokar i god tid" (läst 2026-09-27)
      { icon: '🚲', name: 'Cykling', desc: 'Arholma Handel hyr ut cyklar: 100 kr halvdag (4 h), 150 kr heldag (8 h), 200 kr per dygn, 1 000 kr per vecka (prislista läst 2026-09-27). Hämtas direkt på bryggan — boka i god tid, trycket är högt.' },
    ],
    // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-arholma-bull-august-gard/ — "På Bull-August gård finns 14 rum med totalt 32 bäddar"; "Boningshuset, som är öppet året runt, har 10 bäddar" (läst 2026-09-27)
    // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-arholma-nord/ — "Rummen är fördelade i flera mindre byggnader"; "från enkelrum till familjerum med plats för upp till fem personer"; "bäddade sängar och frukostbuffé ingår alltid" (läst 2026-09-27)
    // KÄLLA: https://arholmahandel.se/stuguthyrning/ — "Stugan ligger vid Norra bryggan där båtarna från fastlandet lägger till"; "upp till fyra bäddar och uthyres per dygn från maj till och med september månad samt under höstlovsveckan" (läst 2026-09-27)
    accommodation: [
      { name: 'STF Arholma Bull-August gård', type: 'Vandrarhem', desc: 'STF-vandrarhem på gammal roslagsgård mitt på ön, 14 rum och 32 bäddar. Boningshuset med 10 bäddar är öppet året runt.', websiteUrl: 'https://bullaugust.com' },
      { name: 'Arholma Nord', type: 'Vandrarhem', desc: 'Rum från enkelrum till familjerum för upp till fem personer, i flera mindre hus i en egen vik på norra Arholma. Bäddat och frukostbuffé ingår.', websiteUrl: 'https://arholmanord.se' },
      { name: 'Arholma Handel — Källarstugan', type: 'Stuga', desc: 'Stuga med upp till fyra bäddar vid Norra bryggan. Hyrs ut maj–september och under höstlovsveckan.', websiteUrl: 'https://arholmahandel.se/stuguthyrning/' },
    ],
    getting_there: [
      // KÄLLA: https://kund.printhuset-sthlm.se/sl/h636.pdf — "Norrtälje busstation 08.23 10.21 12.21"; "Simpnäs brygga 10.05b 11.42 13.31"; "Giltig 17 augusti–12 december 2026" (läst 2026-09-27)
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h30.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026"; "30A SIMPNÄS – ARHOLMA"; "Simpnäs (Björkö) 07.05 08.00 10.10 13.35"; "Arholma 07.20 08.15 10.25 13.50" (läst 2026-09-27)
      { method: 'Buss + färja', from: 'Norrtälje (via Simpnäs)', time: 'ca 1,5 h', desc: 'SL-buss 636 från Norrtälje busstation till Simpnäs brygga på Björkö, sedan Waxholmsbolagets passbåt 15 minuter till Arholma. Exempel vardagar: buss 12.21, i Simpnäs 13.31; båt 13.35, framme 13.50 (hösttidtabell 17 augusti–12 december 2026).', icon: '🚌' },
      // KÄLLA: https://www.arholma.nu/resa-hit — "Med bil från Stockholm tar det drygt två timmar"; "På Simpnäs finns en stor parkeringsplats" (läst 2026-09-27)
      { method: 'Bil + passagerarfärja', from: 'Stockholm via Simpnäs', time: 'ca 2,5 h', desc: 'Kör till Simpnäs brygga på Björkö, drygt två timmar från Stockholm. Där finns en stor betalparkering. Sedan passbåt Simpnäs–Arholma, 15 minuter — ingen bilfärja.', icon: '🚗' },
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h27.pdf — "27A STOCKHOLM – VAXHOLM – NORRSUND – ARHOLMA"; "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026"; "Strömkajen (Stockholm) 08.45 08.45 08.45 16.30 16.30 08.45 10.00 10.30"; "Arholma 20.55 14.30". Lördagstur 2651: Strömkajen 08.45 → Arholma 14.30 (läst 2026-09-27)
      { method: 'Båt direkt', from: 'Stockholm (Strömkajen)', time: 'ca 5 h 45 min', desc: 'Waxholmsbolagets linje 27 går enstaka turer hela vägen via Vaxholm och Norrsund. Hösten 2026 (17 augusti–1 november) går en lördagstur 08.45 från Strömkajen, framme 14.30. Planera hemresan via Simpnäs.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: https://skargardsstiftelsen.se/omraden/arholma/ — "För dig som kommer med egen båt finns gästhamnar i Österhamn och Ahlmansviken samt flera naturhamnar runt ön" (läst 2026-09-27)
      // KÄLLA: https://www.arholma.nu/resa-hit — "har plats för ett 20-tal båtar och gästbryggan i" (läst 2026-09-27)
      // KÄLLA: https://arholmahandel.se/diesel-och-bensin/ — "Vi har en sjömack där du själv kan tanka bensin och diesel" (läst 2026-09-27)
      { name: 'Arholma gästhamnar', desc: 'Gästbryggor i Österhamn (ett 20-tal båtar) och Ahlmansviken (30 båtar), plus flera naturhamnar runt ön. Arholma Handel har en självbetjänad sjömack för bensin och diesel.', fuel: true, service: ['bränsle'] },
    ],
    restaurants: [
      // KÄLLA: https://www.arholma.nu/mat-dryck/dansbanan — "På Arholma har det funnits en dansbana sedan beredskapstiden i början av 1940-talet"; "Idag är det en charmig restaurang med stort kök, trevlig bar" (läst 2026-09-27)
      // KÄLLA: https://arholmahandel.se/stuguthyrning/ — "På Arholma ö finns sommartid flera restauranger, den närmaste ser du från ditt sovrumsfönster – Arholma Dansbana" (läst 2026-09-27)
      // KÄLLA: https://arholmadansbana.se/index.html — "Tack för i år, vi ses 2027" (läst 2026-09-27)
      { name: 'Arholma Dansbana', type: 'Restaurang', desc: 'Restaurang och bar i den gamla dansbanan nära Norra bryggan. Dansbana har funnits här sedan början av 1940-talet.', open_season: 'Sommar', websiteUrl: 'https://arholmadansbana.se', slug: 'arholma-dansbana-krog' },
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-arholma-nord/ — "Arholma Nords restaurang har blivit en naturlig samlingsplats för båtfolk, gäster och öbor"; "särskilt under sommarkvällar med livemusik" (läst 2026-09-27)
      // KÄLLA: https://arholmanord.se/mat — "Öppnar midsommarafton och stänger 9 augusti"; "här bjuder vi på godsaker från röken" — sidan renderas med JavaScript, citatet kontrollerat i headless Chrome (läst 2026-09-27)
      { name: 'Arholma Nord', type: 'Restaurang', desc: 'Restaurang med uteservering i Arholma Nords havsvik, med mat från röken och livemusik på sommarkvällarna.', open_season: 'Midsommarafton–9 augusti (2026)', websiteUrl: 'https://arholmanord.se' },
    ],
    tips: [
      // KÄLLA: https://arholmahandel.se/sommarens-avslutande-veckor-och-bryggcafeets-sista-helg/ — "Därefter blir det lågsäsongstider (måndag, onsdag, fredag och lördag)" (läst 2026-09-27)
      'Efter sommaren har Arholma Handel lågsäsongsöppet måndag, onsdag, fredag och lördag — kolla tiderna på butikens sida innan du åker, så du inte står utan proviant.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/arholma-ido.html — "Området ligger exponerat mot Ålands hav och är tydligt präglat av det" (läst 2026-09-27)
      'Reservatet ligger exponerat mot Ålands hav — kolla SMHI:s prognos noggrant innan du tar ut kajak eller liten båt.',
      // KÄLLA: https://arholmahandel.se/ — åretruntöppen butik med livsmedel, bensin, diesel, gasol och cykeluthyrning
      'Arholma Handel har öppet året runt och säljer livsmedel, bensin, diesel och gasol, och hyr ut cyklar.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/arholma-ido.html — "under tiden 1 april till 31 juli landstiga på öarna Rödkobben och Nollekobb"; "för längre tid än två dygn i följd förtöja, dra upp eller förankra båt eller annan farkost vid samma plats (gäller ej brygga)" (läst 2026-09-27)
      'I reservatet gäller landstigningsförbud på Rödkobben och Nollekobb 1 april–31 juli, och båt får inte ligga förtöjd på samma plats mer än två dygn i följd (bryggor undantagna).',
      // KÄLLA: https://www.norrtalje.se/info/kultur-och-fritid/kultur-och-konst/norrtalje-museerkulturarv-och-stadsarkiv/museer-hembygds--och-kulturforeningar/batteri-arholma--upplevelsemuseum/ (läst 2026-09-20) — "Den visas av säkerhetsskäl endast genom guidade turer"
      'Batteri Arholma visas bara med guide — planera in den turen i förväg om du vill se anläggningen inifrån.',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-arholma/ — etappen "Medel 13.4 km", start vid kajen, "utmanande stigar" och "teknisk stig"
      'Vandringsetappen på Arholma är drygt 13 kilometer och innehåller partier med teknisk stig — ha skor som tål berg.',
    ],
    activity_meta: {
      // KÄLLA: Stockholm Archipelago Trail, https://stockholmarchipelagotrail.com/section/ (2026-09-17)
      vandring: { trails: 1, max_km: 13.4, sat: { km: 13.4, difficulty: 'Medel' } },
    },
    related: ['blido', 'furusund', 'norrora'],
    tags: ['ytterst', 'orört', 'norra', 'vilt', 'segling'],
    // KÄLLA: https://stockholmslansmuseum.se/besoksmal/arholma/ — "Arholma nämns redan på 1200-talet i en beskrivning av segelleden längs den svenska kusten"; "Arholma och Arholma by omtalas 1547 i Gustav Vasas räkenskaper"; "År 1719 anföll ryssarna Stockholms skärgård och brände alla hus på ön" (läst 2026-09-27)
    // KÄLLA: https://www.arholma.nu/resa-hit — "Resan tar cirka 15 minuter" (läst 2026-09-27)
    did_you_know: 'Arholma nämns redan på 1200-talet i en beskrivning av segelleden längs den svenska kusten, och Arholma by omtalas 1547 i Gustav Vasas räkenskaper. År 1719 brände ryssarna alla hus på ön, och det dröjde några år innan byn byggdes upp igen. Ön har ingen bilfärja — passbåten från Simpnäs tar ungefär en kvart.',
    insiderTips: [
      // KÄLLA: https://skargardsstiftelsen.se/omraden/arholma/ — "Arholma är en av de nordligaste öarna i Stockholms skärgård" (läst 2026-09-27)
      // KÄLLA: https://www.arholma.nu/resa-hit — "Härifrån går passbåten Monsun till Arholma året runt. Resan tar cirka 15 minuter" (läst 2026-09-27)
      'Arholma är en av de nordligaste öarna i Stockholms skärgård, men passbåten Monsun från Simpnäs går året runt och tar bara en kvart.',
      // KÄLLA: https://stockholmslansmuseum.se/besoksmal/arholma/ — "byggde öns redare och skeppare ut sina boningshus till stiliga redargårdar"; "Flera av gårdarna blev pensionat"; "Björköadeln kallades de redare som snabbt blev rika på sjöfart i mitten av 1800-talet" (läst 2026-09-27)
      'Titta på husen i byn: under 1800-talet byggde öns redare och skeppare ut sina boningshus till redargårdar. Björköadeln kallades de redare som blev rika på sjöfarten, och när segelsjöfarten tappade betydelse kring 1900 blev flera gårdar pensionat.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/arholma-ido.html — "Det restaurerade kulturlandskapet på sydöstra Arholma är ett av norra länets mest artrika och skyddsvärda" (läst 2026-09-27)
      'Det restaurerade kulturlandskapet på sydöstra Arholma är enligt Länsstyrelsen ett av norra länets mest artrika och skyddsvärda — värt en omväg från vandringsleden.',
      // KÄLLA: https://arholmahandel.se/sommartider-2/ — "Vi öppnar även vårt Bryggcafe´ på torsdagen 18 juni" (läst 2026-09-27)
      // KÄLLA: https://arholmahandel.se/sommarens-avslutande-veckor-och-bryggcafeets-sista-helg/ — "denna sista helg, 8-9 augusti" (läst 2026-09-27)
      // KÄLLA: https://arholmanord.se/mat — "Öppnar midsommarafton och stänger 9 augusti" — sidan renderas med JavaScript, citatet kontrollerat i headless Chrome (läst 2026-09-27)
      'Högsäsongen är kort: 2026 var Bryggcaféet vid Arholma Handel öppet 18 juni–9 augusti, och Arholma Nords restaurang stängde samma dag. Kommer du senare på sommaren, räkna med butiken och egen matsäck.',
    ],
    seasonal: {
      // KÄLLA: https://www.arholma.nu/resa-hit — "passbåten Monsun till Arholma året runt" (läst 2026-09-27)
      // KÄLLA: https://arholmahandel.se/ — "en välsorterad åretruntöppen butik" (läst 2026-09-27)
      open: 'Året runt',
      peak: 'Juli–början av augusti',
      best: 'Juli',
      // KÄLLA: https://blidosundsbolaget.se/norra-batlinjen/ — "dagliga avgångar mellan den 6 juli och 9 augusti" (läst 2026-09-27)
      // KÄLLA: https://arholmahandel.se/sommarens-avslutande-veckor-och-bryggcafeets-sista-helg/ — "denna sista helg, 8-9 augusti" (läst 2026-09-27)
      // KÄLLA: https://www.norrtalje.se/info/kultur-och-fritid/kultur-och-konst/norrtalje-museerkulturarv-och-stadsarkiv/museer-hembygds--och-kulturforeningar/batteri-arholma--upplevelsemuseum/ — "Den visas av säkerhetsskäl endast genom guidade turer" (läst 2026-09-27)
      bestReason: 'I juli är allt igång samtidigt: Bryggcaféet, restaurangerna, Norra båtlinjen från Norrtälje och guidade turer i Batteri Arholma. 2026 stängde flera av dem den 9 augusti.',
      warning: 'Säsongen är kort — 2026 stängde Bryggcaféet, Arholma Nords restaurang och Norra båtlinjen 9 augusti. Utanför sommaren har Arholma Handel begränsade öppetdagar; passbåten från Simpnäs går året runt.',
      // UPPSKATTNING: båt och butik året runt ('limited' i stället för 'off'); servering juni–9 augusti
      months: ['limited','limited','limited','limited','limited','open','peak','open','limited','limited','limited','limited'],
    },
  },
  // ─── ORNÖ ─────────────────────────────────────────────────────
  {
    slug: 'orno',
    name: 'Ornö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🌲',
    tagline: 'Södra skärgårdens största ö — bilfärja från Dalarö och skogsreservat i norr.',
    description: [
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/orno/ — Ornö beskrivs som "södra skärgårdens största ö"
      'Ornö är södra skärgårdens största ö. Storleken märks: skog, sjöar och kust ryms inom samma ö, och avstånden är långa nog att en dag går åt om man vill se en meningsfull del av den.',
      // KÄLLA: https://ornosjotrafik.se/ — "Avgår från Hässelmara brygga på Ornö och Hotellbryggan på Dalarö"; "Överfarten tar ca 30 minuter"; alla fordon måste bokas
      'Bilfärjan drivs av Ornö Sjötrafik och går mellan Hotellbryggan på Dalarö och Hässelmara brygga på Ornö. Överfarten tar ungefär 30 minuter, och fordon måste bokas i förväg.',
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/orno/ — Kyrkviken är "Ornös nav" med "museum, bibliotek, gästbryggor och cykeluthyrning"; utställning i Sockenstugan; cykeluthyrning även i Brunnsviken
      'Kyrkviken är Ornös nav, med museum, bibliotek, gästbryggor och cykeluthyrning. Hit hör också utställningen i Sockenstugan. Cykel går att hyra både i Kyrkviken och i Brunnsviken.',
      // KÄLLA: https://www.svenskakyrkan.se/haninge/orno-kyrka — "Det första kapellet på ön uppfördes troligen redan vid 1300-talets slut"; "En större kyrka uppfördes 1652" i "för dåtiden modern stil"; "en vacker träkyrka med spännande historia"
      'Ornö kyrka är en träkyrka som uppfördes 1652, i för dåtiden modern stil. Det första kapellet på ön uppfördes troligen redan vid 1300-talets slut.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/norra-skogen.html — reservatet på norra Ornö i Haninge kommun, skyddat 2024, 389 ha varav 360 ha land; "långsamväxande hällmarkstallskog, kala bergspartier, grövre barrblandskog, sumpskogar och våtmarkspartier"; "Stor del av Nybysjön med god vattenkvalitet ligger i reservatet"
      'Naturreservatet Norra skogen på norra Ornö skyddades 2024 och omfattar 389 hektar, varav 360 hektar land. Här finns långsamväxande hällmarkstallskog, kala bergspartier, grövre barrblandskog, sumpskogar och våtmarkspartier. En stor del av Nybysjön, som är omkring 31 hektar och rymmer ett tiotal småöar, ligger inom reservatet.',
      'Att gå i Ornös inre liknar mer en fastlandsskog än den klippiga skärgård många väntar sig. Träden står tätt, undervegetationen är rik och ljudet av vatten försvinner en stund.',
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/orno/ — "cykling, vandring" anges som aktiviteter; cykeluthyrning i Kyrkviken och Brunnsviken
      'Cykel är ett rimligt sätt att ta sig runt på ön, och vandring hör till det kommunen lyfter fram.',
      'Ornö skyltas inte högt. Den som ger ön en hel dag får utrymme att röra sig utan att ha bråttom.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sundby.html — "Sundby naturreservat omfattar södra delen av Ornö och närmare 30-talet mindre öar." / "Skyddat sedan: 1965, Storlek: 5 175 hektar varav land 929 hektar ... Kommun: Haninge Markägare: privat Förvaltare: Länsstyrelsen ... Övrigt: Natura 2000-område Varnöfladen SE0110199"
      'Ornös andra och äldre reservat är Sundby, som omfattar södra delen av ön plus ett trettiotal mindre öar. Det skyddades redan 1965 och är 5 175 hektar stort, varav 929 hektar land. Länsstyrelsen förvaltar det, och området rymmer Natura 2000-området Varnöfladen.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sundby.html — "Med start vid Sundby gård finns en drygt sex kilometer lång, lättvandrad rundslinga. På grusvägar och stigar går du igenom naturreservatets uråldriga odlingslandskap. Slingan är till stora delar tillgänglig för barnvagn eller rullstol, men tyvärr inte hela vägen runt. Här har marken brukats sedan 1400-talet."
      'Från Sundby gård går en drygt sex kilometer lång, lättvandrad rundslinga på grusvägar och stigar genom ett odlingslandskap som brukats sedan 1400-talet. Slingan är till stora delar framkomlig med barnvagn eller rullstol, men inte hela vägen runt.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sundby.html — "Leden tar dig också ... till spännande sevärdheter och platser, däribland Stenhuset, ruinen efter Sundbys första säteri som brändes av ryssarna 1719. Ta dig lite extra tid att utforska det gamla eklandskapet vid Mane äng."
      // KÄLLA: https://haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/orno/ — sevärdheter: "orkidéerna vid Mane äng", "gravfält från bronsåldern vid Hässelmara", "ruinerna efter öns första säteriet", "bergarter på Ornöhuvud"
      'Längs slingan ligger Stenhuset, ruinen efter Sundbys första säteri, som brändes av ryssarna 1719. Vid Mane äng står ett gammalt eklandskap med orkidéer. Haninge kommun lyfter också fram bronsåldersgravfältet vid Hässelmara och bergarterna på Ornöhuvud.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sundby.html — "Runt viken Maren på Ornö finns ett vackert äldre odlingslandskap med naturbetesmarker ... Lövskogsområden finns runt Maren, vid Varnö och på Ängsholmen. På några av öarna finns smala stråk av kalksten där man återfinner en varierad flora."
      'Runt viken Maren breder ett äldre odlingslandskap ut sig med naturbetesmarker, och lövskog finns vid Maren, Varnö och på Ängsholmen. På några av öarna löper smala stråk av kalksten, och där blir floran märkbart mer varierad än på hällmarken runtomkring.',
      // KÄLLA: https://www.lansstyrelsen.se/download/18.1b1d393819324610c3749289/1732517028266/Förorenade områden - inventering av gruvbranschen i Stockholms län.pdf (Länsstyrelsen Stockholm) — "De största gruvorna var Härsbacka i Österåkers kommun och Lugnet på Ornö i Haninge kommun." / "Ornö, Lugnets fältspatsbrott ... Ett av länets största fältspatsbrott."
      'Ornö har brutits på mer än sten till husgrunder. Lugnets fältspatsbrott på ön är enligt Länsstyrelsen ett av länets största, och tillsammans med Härsbacka i Österåker den största pegmatitgruvan i Stockholms län. Brottet är vattenfyllt och ligger strax sydväst om Kyrkviken.',
      // KÄLLA: https://www.lansstyrelsen.se/download/18.1b1d393819324610c3749289/1732517028266/Förorenade områden - inventering av gruvbranschen i Stockholms län.pdf — "Utömalm bearbetades bland annat vid Penningby masugn i Norrtälje kommun, vid Lättinge bruk på Ornö och Vitså masugn nära Årsta havsbad"
      'Vid Lättinge på Ornö låg ett bruk där järnmalm från Utö bearbetades. Malmen fraktades sjövägen till hyttor och masugnar runt om i regionen, och Ornö var alltså en länk i Stockholms skärgårds järnhantering, inte bara en jordbruks- och fiskeö.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/norra-skogen.html — "Vid Kvarnbacken mellan Nybysjön och Hemträsket låg på 1700-talet en vattenkvarn. I dag finns inga spår kvar."
      'Strax utanför Norra skogen finns ett kulturspår som inte längre syns: vid Kvarnbacken mellan Nybysjön och Hemträsket låg vid 1700-talets början en skvaltkvarn. I dag finns inga spår kvar av den.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/stora-och-lilla-sandbote.html — "Skyddat sedan: 1938 Storlek: 21 hektar ... Markägare: Skärgårdsstiftelsen" / "En av de gamla stugorna är ett fiskartorp från 1700-talet som byggts upp efter en brand 2001 efter originalritningar och med gamla metoder och ställts i ordning som museum. Invid hamnen visas även ett båtbyggarmuseum." / "Öarna donerades till Naturskyddsföreningen 1941 av Anna Lindhagen ... Anna hade fått området naturminnesförklarat redan 1938."
      'Öster om Ornö ligger Stora och Lilla Sandbötes naturreservat, 21 hektar som naturminnesförklarades redan 1938. Anna Lindhagen — profil inom freds- och rösträttsrörelsen och pionjär bakom Stockholms koloniträdgårdar — donerade öarna 1941, och de förvaltas nu av Skärgårdsstiftelsen. På Stora Sandböte står ett fiskartorp från 1700-talet, återuppbyggt efter en brand 2001 med originalritningar och gamla metoder, och intill hamnen finns ett båtbyggarmuseum.',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-orno/ — "Etapp Ornö ... Medel ... 34.1 km"; "Ornö är den längsta etappen på Stockholm Archipelago Trail."; etappen kan börja vid Hässelmara, Ornöboda, Lättinge brygga eller Ornö Kyrka
      'Stockholm Archipelago Trails Ornö-etapp är 34,1 kilometer och den längsta på hela leden. Den kan påbörjas vid Hässelmara där bilfärjan går in, vid Ornöboda mitt emot Kymmendö, vid Lättinge brygga eller vid Ornö kyrka, och är markerad som två dagsetapper som båda börjar i Hässelmara och slutar i hamnen vid kyrkan.',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-orno/ — "Det är en ö med ungefär 300 bofasta året om." / "Ornö har vackra skogar, klipphällar, orkidéer, tolv injöar och två naturreservat." / "Under 1500-talet fanns ett 30-tal gårdar och torp, under 1800-talet hade dessa mer än fördubblats. 1719 brändes mer eller mindre hela Ornö ner under Rysshärjningarna." / "Under tidigt 1900-tal styckade och sålde Sundby Säteri mark för fritidsboende."
      'Ön har omkring 300 bofasta året om och tolv insjöar. Under 1500-talet fanns ett trettiotal gårdar och torp här, en siffra som mer än fördubblades fram till 1800-talet. År 1719 brändes så gott som hela Ornö ner under rysshärjningarna och allt fick byggas upp igen; under tidigt 1900-tal styckade Sundby säteri av mark för fritidsboende, vilket format dagens bebyggelsemönster.',
    ],
    facts: {
      // KÄLLA: https://ornosjotrafik.se/ — "Överfarten tar ca 30 minuter" (Hässelmara–Dalarö Hotellbryggan)
      travel_time: '~30 min med bilfärja från Dalarö',
      character: 'Naturskönt, skogsrikt, tyst, genuint',
      season: 'Maj–September',
      best_for: 'Naturälskare, vandring, de som söker lugn',
    },
    activities: [
      { icon: '🚶', name: 'Vandring i naturreservat', desc: 'Leder genom gammal skog, bland annat i naturreservatet Norra skogen. Vandringstiden beror på vald sträcka.' },
      { icon: '🐦', name: 'Fågelskådning', desc: 'Ornö är känt för sitt rika fågelliv, särskilt under vår- och höstflytt.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Rent vatten och fina klippor längs kusten.' },
    ],
    // KÄLLA: https://ornoskargardshotell.se/ (året runt); https://sundbyorno.se/ (5 dubbelrum); orno.se/ata-bo/boende — Ornö Båtvarv 6 stugor, 18 bäddar; https://visitskargarden.se/ — stuga i Brunnsviken. Kyrkvikens vandrarhem och camping gick inte att belägga (läst 2026-09-14)
    accommodation: [
      { name: 'Ornö Skärgårdshotell', type: 'Hotell', desc: 'Hotell med dubbelrum och lägenheter vid vattnet i Brunnsviken, frukost ingår. Öppet året runt.', websiteUrl: 'https://ornoskargardshotell.se' },
      { name: 'Sundby gård', type: 'B&B', desc: 'B&B med fem dubbelrum i herrgårdsflygel.', websiteUrl: 'https://sundbyorno.se' },
      { name: 'Stugor på Ornö Båtvarv', type: 'Stugor', desc: 'Sju stugor med sammanlagt 18 bäddar vid båtvarvet.', websiteUrl: 'https://ornobatvarv.se' },
    ],
    getting_there: [
      // KÄLLA: https://ornosjotrafik.se/ — "Avgår från Hässelmara brygga på Ornö och Hotellbryggan på Dalarö", "Överfarten tar ca 30 minuter"; publicerad turlista gäller 27/4–13/9 2026 och ingen vintertidtabell hittades vid granskningen. KÄLLA: stockholmarchipelagotrail.com/sv/section/etapp-orno — "Du åker till Hässelmara på Ornö från Dalarö året om".
      { method: 'Bilfärja', from: 'Dalarö (Hotellbryggan) → Hässelmara brygga', time: '~30 min', desc: 'Ornö Sjötrafik kör bilfärjan mellan Dalarö och Hässelmara och tar både bil och passagerare. Det är huvudvägen till Ornö. Stockholm Archipelago Trail anger att turen går året om, men Ornö Sjötrafiks publicerade turlista täcker bara 27 april–13 september — kontrollera turlistan innan du planerar en vinterresa.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: Haninge kommun, "Ornö" (https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/orno/) — Kyrkviken har museum, bibliotek, gästbryggor och cykeluthyrning.
      { name: 'Kyrkviken', desc: 'Öns huvudhamn med gästbryggor, museum, bibliotek och cykeluthyrning.', fuel: false },
    ],
    restaurants: [
    ],
    tips: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/norra-skogen.html — reservatet ligger på norra Ornö och skyddades 2024
      'Naturreservatet Norra skogen ligger på norra Ornö och skyddades 2024.',
      // KÄLLA: https://ornosjotrafik.se/ — alla fordon måste bokas
      'Boka fordonsplats på bilfärjan i förväg.',
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/orno/ — cykeluthyrning i Kyrkviken och Brunnsviken
      'Cykeluthyrning finns i Kyrkviken och i Brunnsviken.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sundby.html — "Med kollektivtrafik: SL-buss till Dalarö (Hotellbryggan). Vägfärja till Ornö, därefter buss 889 från färjeterminalen till Sundby, Ornö." / "Från parkering och busshållplats är det drygt 800 meters promenad till reservatet"
      'Till Sundby naturreservat utan bil: buss till Dalarö, färja till Ornö och sedan buss 889 från färjeterminalen till Sundby. Från hållplatsen är det drygt 800 meter in i reservatet.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sundby.html — i reservatet är det förbjudet att "medföra hund eller katt som inte är kopplad", "göra upp öppen eld inom zon 1 och 2B (se beslut)" och att "tälta på samma plats" längre tid än två dygn i följd
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/norra-skogen.html — förbud mot att tälta "mer än två dygn i följd"
      'Koppeltvång gäller i Sundby naturreservat, och eldning är förbjuden inom delar av reservatet. Tältning högst två dygn i följd — samma regel gäller i Norra skogen.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/norra-skogen.html — reservatet nås "endast till fots, cirka 1,5–2 kilometer från parkering eller färjeläget"
      'Norra skogen nås bara till fots, ungefär 1,5–2 kilometer från parkering eller färjeläget — räkna med att ställa cykeln och gå sista biten.',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-orno/ — "Bussen på Ornö går mellan Lättinge, Sundby, Ornö Kyrka, Hässelmara och Skinnardal ... du kan använda ditt SL-kort eller lösa enkelbiljett."
      'Det går buss på Ornö mellan Lättinge, Sundby, Ornö kyrka, Hässelmara och Skinnardal, och SL-kortet gäller — praktiskt om cykelbenen tar slut.',
    ],
    activity_meta: {
      // KÄLLA: Stockholm Archipelago Trail, https://stockholmarchipelagotrail.com/section/ (2026-09-17)
      vandring: { trails: 1, max_km: 34.1, sat: { km: 34.1, difficulty: 'Medel' } },
    },
    related: ['uto', 'nattaro', 'dalaro'],
    tags: ['natur', 'vandring', 'skog', 'fåglar', 'lugnt'],
    // KÄLLA: Haninge kommun, "Ornö" (https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/orno/) — "Ornö, södra skärgårdens största ö". Postbåtens turtäthet kunde inte beläggas och är borttagen.
    did_you_know: 'Ornö är södra skärgårdens största ö.',
    insiderTips: [
      // KÄLLA: Haninge kommun, "Ornö" (https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/orno/) — "Ornö, södra skärgårdens största ö".
      'Ornö är södra skärgårdens största ö.',
      'Ornö södra del erbjuder skyddade vikar och bra förutsättningar för kajakpaddling.',
      // KÄLLA: Haninge kommun, "Ornö" (https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/orno/) nämner ett café vid Brunnsviken; ingen lanthandel kunde beläggas.
      'Det finns ett café vid Brunnsviken men utbudet på ön är begränsat. Planera med matsäck om du ska ut på en heldagstur.',
    ],
    seasonal: {
      // KÄLLA: https://ornosjotrafik.se/turlista-fran-dalaro/ — publicerad turlista gäller 27/4–13/9 2026; ingen vintertidtabell hittades vid granskning, så "hela året" är borttaget.
      open: 'Bilfärja enligt Ornö Sjötrafiks tidtabell',
      peak: 'Juli',
      best: 'Maj–Juni eller September',
      bestReason: 'Turismen är låg utanför sommarsäsongen. September ger höstfärger och total stillhet.',
      warning: 'Kafé och lanthandel kan ha begränsade öppettider utanför juli–aug. Kontrollera inför besöket.',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },
  },
  // ─── LANDSORT ────────────────────────────────────────────────
  {
    slug: 'landsort',
    name: 'Landsort',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🪨',
    // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/landsort — "Landsort är Stockholms skärgårds sydligaste utpost"; "Landsorts fågelstation" (läst 2026-09-27)
    // KÄLLA: https://www.sjofartsverket.se/en/about-us/fyrar-och-kulturfastigheter/visningsfyrar/landsort--the-oldest-swedish-built-lighthouse/ — "the oldest Swedish-built lighthouse" (läst 2026-09-27)
    tagline: 'Stockholms skärgårds sydligaste utpost — Sveriges äldsta svenskbyggda fyr, lotsby och fågelstation.',
    description: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/oja-landsort.html — "omfattar den kända ön Öja med fyrplatsen Landsort"; naturreservat sedan 1985, 570 ha varav 178 ha land (2026-09-14)
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/landsort — "Landsort är Waxholmsbolagets sydligaste destination. Här hittar du vacker natur, badklippor och Sveriges allra äldsta fyr." (2026-09-14)
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/landsortoeja-stockholms-skargard — "Den avlånga ön Öja ligger i nord-/sydlig riktning" (läst 2026-09-27)
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/landsort — "Här finns karga klippor och frodig vegetation där du hittar bland annat viltoxel, idegran, åkerbär och en del sällsynta orkidéer" (läst 2026-09-27)
      'Landsort är namnet på fyrplatsen och samhället längst söderut på ön Öja, Waxholmsbolagets sydligaste destination. Ön och vattnen runt den ingår i naturreservatet Öja-Landsort, som omfattar 570 hektar varav 178 hektar är land. Ön är avlång och ligger i nord–sydlig riktning, med karga klippor men också frodig vegetation där bland annat idegran, åkerbär och sällsynta orkidéer växer.',
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/landsortoeja-stockholms-skargard — grunden lades på 1680-talet, fyren fick "sitt nuvarande utseende 1869-70", statligt byggnadsminne 1935, obemannad sedan 1963 (2026-09-14)
      // KÄLLA: https://sjofartsverket.se/en/about-us/fyrar-och-kulturfastigheter/visningsfyrar/landsort--the-oldest-swedish-built-lighthouse/ — "the oldest Swedish-built lighthouse"; "Electrified in 1938"; "Automated and demanned in 1963" (2026-09-14)
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/landsortoeja-stockholms-skargard — "Den största delen av bebyggelsen finns i Storhamn"; "På Norrudden ligger fornlämningsområdet Öja gamla bytomt. Här finns minst 15 husgrunder, båtlämningar, terrasser och fossila åkerytor" (läst 2026-09-27)
      'Fyren på Landsort är Sveriges äldsta svenskbyggda fyr. Grunden lades på 1680-talet och tornet fick sitt nuvarande utseende 1869–70. Fyren elektrifierades 1938, blev statligt byggnadsminne 1935 och är obemannad sedan 1963. Den största delen av bebyggelsen ligger i Storhamn, och på Norrudden i norr finns fornlämningsområdet Öja gamla bytomt med minst 15 husgrunder, båtlämningar, terrasser och fossila åkerytor.',
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/landsortoeja-stockholms-skargard — lotsningen har "gamla anor och kan vara en av de äldsta i landet"; Gustav Vasa lär ha anlitat lotsen Anders Bertilsson på 1530-talet; de flesta yrkesverksamma var "lotsar, fyrtjänstemän, tullare och telegrafister" (2026-09-14)
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/landsortoeja-stockholms-skargard — "De flesta yrkesarbetande hade med andra ord statlig tjänst, vilket utöver den ekonomiska tryggheten innebar att man fick bära uniform" (läst 2026-09-27)
      'Lotsningen vid Landsort har gamla anor och kan vara en av de äldsta i landet — Gustav Vasa ska ha anlitat lotsen Anders Bertilsson här. Under lång tid var de flesta yrkesverksamma på ön lotsar, fyrtjänstemän, tullare och telegrafister. De flesta som arbetade på ön hade alltså statlig tjänst, vilket bland annat innebar att man bar uniform.',
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/landsortoeja-stockholms-skargard — "Under 1930-talet anlades ett kustartilleribatteri på Landsort"; ERSTA-batteriet byggdes 1974–78 som "ett fyravåningshus av stål inuti berget", konstruerat "för att kunna stå emot kärnvapenangrepp", statligt byggnadsminne 2018 (läst 2026-09-19)
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/landsortoeja-stockholms-skargard — "Under 1930-talet anlades ett kustartilleribatteri på Landsort för att kontrollera sjöfarten in mot Nynäshamn"; "Det är ett fyravåningshus av stål inuti berget, dimensionerat för ett underjordiskt samhälle"; "Batteriet på Landsort är ett av de 26 fasta batterier som byggdes mellan 1960 till 1983"; "Idag finns fyra av dessa batterier kvar varav batteriet på Landsort är ett"; "150 ton tung Boforskanon"; "står i ett 18 meter djupt schakt" (läst 2026-09-27)
      'Militärhistorien ligger kvar i berget. Ett kustartilleribatteri anlades på 1930-talet för att kontrollera sjöfarten in mot Nynäshamn, och 1974–78 byggdes ERSTA-batteriet som ett fyravåningshus av stål inne i klippan, dimensionerat för ett underjordiskt samhälle. Det är ett av 26 fasta batterier som byggdes 1960–1983 för att stå emot kärnvapenangrepp, och ett av fyra som finns kvar. Hjärtat är en 150 ton tung Boforskanon i ett 18 meter djupt schakt. Anläggningen är statligt byggnadsminne sedan 2018.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/oja-landsort.html — Öja är "en av länets förnämsta sträckfågellokaler", med starkt sträck både vår och höst (2026-09-14)
      // KÄLLA: https://landsort-birds.se/pages/skada-pa-landsort.php — över 300 fågelarter noterade; sibiriska felflyttare som tajgasångare och kungsfågelsångare; "Nuförtiden besöks ön nästan dagligen av fågelskådare" (2026-09-14)
      'Öja är en av länets förnämsta sträckfågellokaler, med starkt sträck både vår och höst. Fler än 300 arter har noterats, inklusive sibiriska felflyttare som tajgasångare och kungsfågelsångare, och ön besöks numera nästan dagligen av fågelskådare.',
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/landsortoeja-stockholms-skargard — "Ett 30-tal personer bor på Öja året om men på sommaren ökar befolkningen mångfalt genom alla sommargäster"; "På ön finns en krog, pub, ett vandrarhem, konferens, fågelstation, försäljning av lokal konst och konsthantverk" (läst 2026-09-27)
      'Ett 30-tal personer bor på Öja året om, och på sommaren ökar befolkningen mångfalt. Statens fastighetsverk räknar upp en krog, en pub, ett vandrarhem, konferens, fågelstation och försäljning av lokal konst och konsthantverk — utbudet är litet och till stor del säsongsbundet.',
      // KÄLLA: https://landsort.com/saltboden/ — "Saltboden är en kombinerad handelsbod, servering och pub som ligger på den södra delen av Landsort, mitt i den lilla byn"; "Vi har öppet dagligen juni-augusti"; "samt helger i maj och september" (läst 2026-09-27)
      'Saltboden, mitt i byn på södra delen av ön, är handelsbod, servering och pub i ett. Den har öppet dagligen juni–augusti och helger i maj och september — kommer du andra tider, ta med proviant.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/oja-landsort.html — "Reservatet ligger cirka två kilometer söder om Torö söder om Nynäshamn. Buss med SL till Ankarudden på Torö"; "beroende på rådande väderleksförhållanden kan båten angöra olika bryggor på Öja-Landsort" (läst 2026-09-27)
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h29.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026"; "ANKARUDDEN – LANDSORT"; "Ankarudden 07.10 09.55 16.40 19.40"; "Landsort 07.40 10.25 17.10 20.10" (läst 2026-09-27)
      'Att ta sig hit kräver planering. Reservatet ligger ungefär två kilometer söder om Torö: du åker SL-buss till Ankarudden på Torö, och därifrån tar Waxholmsbolagets båt 30 minuter till Landsort. Beroende på väder kan båten lägga till vid olika bryggor på ön. Kontrollera tidtabellen i förväg.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/oja-landsort.html — skyddsform "naturvårdsområde"; förvaltare Länsstyrelsen; markägare staten; karaktär "skärgård, lövskog, kulturmiljö"; björk och al dominerar, begränsad tallskog; arter vitoxel, åkerbär och idegran; ejder dominerar sträcket, även sädgås, prutgås och sångsvan
      'Skyddet på Öja är av den äldre formen naturvårdsområde, med Länsstyrelsen som förvaltare och staten som markägare. Karaktären anges som skärgård, lövskog och kulturmiljö — det är björk och al som dominerar, inte tall som man kan vänta sig så här långt ut. Bland växterna nämns vitoxel, åkerbär och idegran, och i fågelsträcket dominerar ejder, med sädgås, prutgås och sångsvan bland de arter som passerar.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/oja-landsort.html — "Bybebyggelsen som äger betydande kulturhistoriska och miljömässiga värden är koncentrerad till Storhamn på öns södra del, där även lotsplatsen och fyren ligger"; förbjudet med okopplad hund, att "tälta och elda annat än på anvisade platser", att skada fasta naturföremål och att plocka blomman nattviol; anordningar: informationstavla, rast-/övernattningsstuga, stig, toalett, tältplats och vandringsled
      'Bybebyggelsen, som Länsstyrelsen tillskriver betydande kulturhistoriska och miljömässiga värden, är koncentrerad till Storhamn på öns södra del, där också lotsplatsen och fyren ligger. I området finns vandringsled, stig, tältplats, toalett och en rast- och övernattningsstuga. Reglerna är tydliga: hunden ska vara kopplad, tältning och eldning bara på anvisade platser — och blomman nattviol får inte plockas.',
      // KÄLLA: http://www.landsort.com/?page_id=138 — 1820 övergång till rovoljelampor med försilvrade speglar; 1839 staten inlöser fyren och Mauritz Enegren blir första fyrmästare; 1844 antas Sofia Charlotta Löfström som kvinnligt biträde; 1870 påbörjas ombyggnad med konisk fyr ovanpå stenfyren; 1909 monteras Lux-brännare
      'Fyrens tekniska historia är en kedja av uppgraderingar. 1820 gick man över till rovoljelampor med försilvrade speglar, 1839 löste staten in fyren och Mauritz Enegren blev dess förste statlige fyrmästare, och 1844 antogs Sofia Charlotta Löfström som kvinnligt biträde. 1870 påbörjades ombyggnaden då ett koniskt torn restes ovanpå den gamla stenfyren, och omkring 1909 monterades Lux-brännare.',
      // KÄLLA: http://www.landsort.com/?page_id=138 — 1535 utfärdar Gustav Vasa brev till Anders Bertilsson om Öja kronohemman; 1678 stadgar sjölag lotsningsplikt; 1695 fanns 9 lotsar och fyra drängar på Landsort; 1831 som mest 29 lotsar i tjänst; 1997 blir Landsort lotsstation under Mälarens Sjötrafikområde
      'Lotsningen går att följa i siffror. 1678 stadgade sjölagen lotsningsplikt; 1695 fanns nio lotsar och fyra drängar på Landsort, och som mest var 29 lotsar i tjänst år 1831. Så sent som 1997 blev Landsort lotsstation under Mälarens sjötrafikområde. Det förklarar varför bebyggelsen ser ut som den gör — det här var en arbetsplats, inte en sommarby.',
      // KÄLLA: https://www.sjofartsverket.se/en/about-us/fyrar-och-kulturfastigheter/visningsfyrar/landsort--the-oldest-swedish-built-lighthouse/ — "The present lighthouse was built in 1686"; "metre-thick walls"; "The Russians turned up in 1719 and set fire to Landsort"; "Landsort is located on the island of Öja, some 90 km south of Stockholm"; beskrivs som "one of the most substantial lighthouses that we have in Sweden"
      // KÄLLA: http://www.landsort.com/?page_id=138 — ryssarna anländer 16–18 juli 1719 och ön bränns ned; pestkyrkogård dokumenterad 1710; kapellet invigt 1939
      // KÄLLA: https://www.sjofartsverket.se/en/about-us/fyrar-och-kulturfastigheter/visningsfyrar/landsort--the-oldest-swedish-built-lighthouse/ — "The Russians turned up in 1719 and set fire to Landsort, but the lighthouse and its metre-thick walls survived" (läst 2026-09-27)
      // KÄLLA: http://www.landsort.com/?page_id=138 — "Omkring 17-18 juli var ryssarna över Öja"; "Bara ett hus skonades"; "ligger begraven sedan år 1710"; "Kapellet invigdes1939" (läst 2026-09-27)
      'Det nuvarande tornet restes 1686, med metertjocka murar, och Sjöfartsverket beskriver det som en av de mest robusta fyrarna i Sverige. Murarna visade sitt värde när ryssarna kom 17–18 juli 1719 och brände ön: fyren klarade sig, men av husen skonades bara ett. Norr om byn ligger en pestkyrkogård där en kvinna från Storhamn begravdes 1710, och kapellet invigdes så sent som 1939.',
      // KÄLLA: http://www.landsort.com/?page_id=138 — 1454 nämner Trosas privilegiebrev fiskerättigheter; 1610 privilegiebrev om fiskelägen mellan Oxelösund och Tälje; 1839 övertar staten Öja; 1878 upphör skärfisket
      'Före fyrvaktarna och lotsarna fanns fiskarna. Skärfisket vid Öja har medeltida belägg — Trosas privilegiebrev från 1454 nämner fiskerätten, och ett privilegiebrev 1610 gällde fiskelägena mellan Oxelösund och Tälje. Staten övertog Öja 1839, och skärfisket upphörde 1878.',
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/landsort — "20 bofasta på ön, men sommartid mångdubblas ofta befolkningen"; ön har "tre hamnar – Österhamn, Västerhamn och Norrhamn"; Batteri Landsort är "en underjordisk försvarsanläggning från kalla kriget, nu ett museum"; "Hela ön är naturskyddsområde"; "På Landsorts fågelstation dokumenteras och ringmärks över 12 000 fåglar varje år"
      'Nynäshamns kommun anger tjugo bofasta på ön, med en befolkning som mångdubblas sommartid, och tre hamnar: Österhamn, Västerhamn och Norrhamn. Hela ön är naturskyddsområde. Batteri Landsort, den underjordiska försvarsanläggningen från kalla kriget, är i dag museum, och vid fågelstationen dokumenteras och ringmärks över 12 000 fåglar varje år.',
    ],
    facts: {
      // KÄLLA: https://kund.printhuset-sthlm.se/sl/v852.pdf — "Nynäshamns station 06.26 09.11 11.08"; "Ankarudden 07.05 09.51 11.49"; "Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026" (läst 2026-09-27)
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h29.pdf — "Ankarudden 07.10 09.55 16.40 19.40"; "Landsort 07.40 10.25 17.10 20.10". Restid: buss 06.26–07.05 (39 min) + båt 07.10–07.40 = 1 h 14 min (läst 2026-09-27)
      travel_time: 'Buss 852 från Nynäshamns station till Ankarudden (ca 40 min), sedan båt 30 min — ca 1 h 15 min med anslutning',
      // UPPSKATTNING: karaktären sammanfattar de belagda uppgifterna i description (fyrplats, lotsby, fågelstation, naturvårdsområde)
      character: 'Fyrplats, lotsby och fågelstation i ytterskärgården',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-landsort/ — "Du åker till Landsort från Ankarudden på Torö året om"; https://www.landsortsvandrarhem.se/ — "Vandrarhemmet är öppet året runt"; https://landsort.com/saltboden/ — "Vi har öppet dagligen juni-augusti" (läst 2026-09-27)
      season: 'Året runt (servering och handel främst juni–augusti)',
      // UPPSKATTNING: målgrupper utifrån fågelstationen, fyren, ERSTA-batteriet och Archipelago Trail-etappen
      best_for: 'Fågelskådare, fyr- och försvarshistoria, vandrare',
    },
    activities: [
      // KÄLLA: https://www.g-mo.se/fyren/ — "Fyren visas tre gånger per dag, 11.00, 13.00 och 15.00 från mitten av juli tills mitten av augusti"; "Övriga tider på året efter överenskommelse"; "Lysvidd 22 nautiska mil" (läst 2026-09-27)
      { icon: '🗼', name: 'Landsorts fyr', desc: 'Sveriges äldsta svenskbyggda fyr, med en lysvidd på 22 nautiska mil. Fyren visas tre gånger om dagen från mitten av juli till mitten av augusti, övriga tider efter överenskommelse.' },
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/landsort — "Idag finns 21 skulpturer placerade mer eller mindre permanent på ön"; "1991 startade Arthur Hultling Kulturbryggan" (läst 2026-09-27)
      { icon: '🗿', name: 'Skulpturpromenad', desc: 'Sedan Arthur Hultling startade Kulturbryggan 1991 har skulpturer ställts ut runt ön. I dag står 21 skulpturer mer eller mindre permanent ute på ön.' },
      // KÄLLA: https://landsort-birds.se/pages/guidningar.php — "början av april-slutet av juni, mitten av augusti-början av november"; "öppna guidningar varje lördag 11:00"; "Fågelstationen nås via promenad på ca 10 minuter norrut från byn" (läst 2026-09-27)
      // KÄLLA: https://landsort-birds.se/pages/skada-pa-landsort.php — "Över 300 fågelarter har setts från ön – ett rekord bland svenska öar om man undantar Öland och Gotland" (läst 2026-09-27)
      { icon: '🐦', name: 'Fågelstation', desc: 'Över 300 fågelarter har setts från ön, rekord bland svenska öar utom Öland och Gotland. Fågelstationen ligger tio minuters promenad norr om byn och har öppna guidningar på lördagar under ringmärkningssäsongen (april–juni och mitten av augusti–början av november).' },
      // KÄLLA: https://www.g-mo.se/ersta-batteriet/ — "Mellan mitten av juli till mitten av augusti klockan 13:00 och 16:00 – platser bokas i förväg" (läst 2026-09-27)
      { icon: '🏰', name: 'ERSTA-batteriet', desc: 'Kalla krigets kanonanläggning på öns norra del visas från mitten av juli till mitten av augusti. Platser bokas i förväg.' },
    ],
    // KÄLLA: https://landsortsstuguthyrning.se/stugorna.html — "Våra sex idylliska små stugor ligger på öns norra spets i anslutning till Gästhamnen"; "ner till byn och fyren i söder (ca 3km)" (läst 2026-09-27)
    // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/landsort — "Landsorts Stugor för uthyrning året runt" (läst 2026-09-27)
    // KÄLLA: https://www.landsortsvandrarhem.se/ — "har 26 bäddplatser fördelade på olika hus"; "Vandrarhemmet är öppet året runt" (läst 2026-09-27)
    // KÄLLA: https://www.g-mo.se/hotell/ — "vi har nu sex stycken dubbelrum i modern design" (läst 2026-09-27)
    accommodation: [
      { name: 'Landsorts Stugor', type: 'Stugor', desc: 'Sex små stugor på öns norra spets vid gästhamnen, cirka tre kilometer från byn och fyren. Cyklar ingår. Uthyrning året runt.', websiteUrl: 'https://landsortsstuguthyrning.se' },
      { name: 'Landsorts Vandrarhem', type: 'Vandrarhem', desc: '26 bäddplatser fördelade på flera hus nedanför fyren, öppet året runt.', websiteUrl: 'https://www.landsortsvandrarhem.se' },
      { name: 'Lotstornet', type: 'Hotell', desc: 'Sex dubbelrum i den ombyggda lotsutkiken, med restaurang Svedtiljas.', websiteUrl: 'https://www.g-mo.se/hotell/' },
    ],
    getting_there: [
      // KÄLLA: https://kund.printhuset-sthlm.se/sl/v852.pdf — "Nynäshamns station 06.26 09.11 11.08"; "Ankarudden 07.05 09.51 11.49" (läst 2026-09-27)
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h29.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026"; "Ankarudden 07.10 09.55 16.40 19.40"; "Landsort 07.40 10.25 17.10 20.10" (läst 2026-09-27)
      // KÄLLA: https://visitlandsort.se/resa-till-landsort/ — "Buss 852 till Torö, sista hållplatsen Ankarudden"; "Biljetter köps under resan ombord" (läst 2026-09-27)
      { method: 'Buss + båt', from: 'Nynäshamn → Ankarudden (Torö) → Landsort', time: 'ca 1 h 15 min från Nynäshamns station', desc: 'SL-buss 852 till ändhållplatsen Ankarudden på Torö (ca 40 min), sedan Waxholmsbolagets båt 30 minuter till Landsort. Exempel vardagar: buss 06.26 från Nynäshamns station, båt 07.10, framme 07.40 (gäller 2 april–18 juni och 17 augusti–12 december 2026). Båtbiljetten köps ombord.', icon: '⛴' },
      // KÄLLA: https://visitlandsort.se/resa-till-landsort/ — "gästhamn i norr (Skravleviken eller Norrhamn)"; "utrymmet är i praktiken begränsat till storleksordningen 2-3 segelbåtar"; "Västerhamn (lotsbåtshamnen) får besökare inte gå in i" (läst 2026-09-27)
      { method: 'Egen båt', from: 'Nynäshamn/Utö', time: 'Varierar', desc: 'Gästhamnen ligger i norr, vid Skravleviken/Norrhamn. I Österhamn finns i praktiken plats för bara 2–3 segelbåtar, och i Västerhamn, lotsbåtshamnen, får besökare inte lägga till.', icon: '⛵' },
    ],
    harbors: [
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/landsort — "På den norra delen av ön finns en sommaröppen gästhamn" (läst 2026-09-27)
      // KÄLLA: https://visitlandsort.se/resa-till-landsort/ — "gästhamn i norr (Skravleviken eller Norrhamn)" (läst 2026-09-27)
      { name: 'Landsorts Gästhamn', desc: 'Sommaröppen gästhamn på öns norra del, vid Skravleviken/Norrhamn. Byn och fyren ligger cirka tre kilometer söderut.', fuel: false },
    ],
    restaurants: [
      // KÄLLA: https://landsort.com/saltboden/ — "Saltboden är en kombinerad handelsbod, servering och pub"; "Vi har öppet dagligen juni-augusti"; "samt helger i maj och september" (läst 2026-09-27)
      { name: 'Saltboden Kök & Proviant', type: 'Handelsbod, servering & pub', desc: 'Handelsbod, servering och pub mitt i byn på södra delen av ön.', open_season: 'Dagligen juni–augusti, helger i maj och september', websiteUrl: 'https://landsort.com/saltboden/' },
      // KÄLLA: https://www.g-mo.se/home-2/kontakt/ — "Från Valborg till början av juli har vi öppet fredagar"; "Från mitten av augusti till sista november har vi öppet på helger"; "Under perioden december till slutet av april har vi stängt" (läst 2026-09-27)
      { name: 'Restaurang Svedtiljas', type: 'Restaurang', desc: 'Restaurangen vid Lotstornet. Öppet alla dagar under högsommaren, annars främst helger.', open_season: 'Valborg–november, stängt december–april', websiteUrl: 'https://www.g-mo.se/restaurang-svedtiljas/' },
    ],
    tips: [
      // KÄLLA: https://visitlandsort.se/resa-till-landsort/ — "Ett tips är att man innan tänkt hemfärd tar en titt på tavlan, placerad mitt i byn, längst in i Västerhamn"; "Tavlan markerar också hållplatsen för bussfärd till Norrhamn" (läst 2026-09-27)
      'Titta på tavlan längst in i Västerhamn innan du ska hem — den visar om båten går från byn eller från Norrhamn, och var minibussen till Norrhamn går.',
      // KÄLLA: https://landsort-birds.se/pages/foreningen.php + /pages/skada-pa-landsort.php — fågelstationen bedriver ringmärkning och har guidningar och program för besökare (2026-09-14)
      'Landsorts fågelstation bedriver ringmärkning och tar emot besökare — se fågelstationens egen sida för guidningar och aktuella program.',
      // KÄLLA: https://landsort.com/saltboden/ — Saltboden är öns livsmedels- och matställe (2026-09-14)
      'Utbudet på ön är begränsat — kontrollera Saltbodens aktuella öppettider innan du åker, och ta med mat.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/oja-landsort.html — förbjudet med okopplad hund samt att tälta och elda annat än på anvisade platser; blomman nattviol får inte plockas
      'I naturvårdsområdet gäller kopplingstvång, tältning och eldning bara på anvisade platser — och nattviol får inte plockas.',
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/landsort — ön har tre hamnar: Österhamn, Västerhamn och Norrhamn; minibussar via Landsorttrafiken om färjan ankommer vid Norrhamn
      'Ön har tre hamnar — Österhamn, Västerhamn och Norrhamn — och vilken båten går till avgör hur långt du har kvar att gå.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/oja-landsort.html — anordningar: rast-/övernattningsstuga, tältplats, toalett, vandringsled och stig
      'Det finns vandringsled, tältplats, toalett och en rast- och övernattningsstuga i området.',
    ],
    activity_meta: {
      // KÄLLA: Stockholm Archipelago Trail, https://stockholmarchipelagotrail.com/section/ (2026-09-17)
      vandring: { trails: 1, max_km: 10.7, sat: { km: 10.7, difficulty: 'Medel' } },
    },
    related: ['uto', 'dalaro', 'nattaro'],
    tags: ['fyr', 'ytterst', 'dramatiskt', 'hav', 'fåglar'],
    // KÄLLA: https://www.sjofartsverket.se/en/about-us/fyrar-och-kulturfastigheter/visningsfyrar/landsort--the-oldest-swedish-built-lighthouse/ — "the oldest Swedish-built lighthouse"; "The row related to the 1651 beacon"; "The present lighthouse was built in 1686" (läst 2026-09-27)
    // KÄLLA: http://www.landsort.com/?page_id=138 — "erhåller emellertid år 1669 privilegium att för fyrens"; "uppbära 4 öre Sm. lästen av varje" (läst 2026-09-27)
    // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/landsortoeja-stockholms-skargard — "grunden till dagens fyrtorn lades på 1680-talet"; "Fyren fick sitt nuvarande utseende 1869-70" (läst 2026-09-27)
    // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/landsort — "Egenligen är det bara fyren och lotsstationen som heter Landsort, själva ön heter Öja" (läst 2026-09-27)
    did_you_know: 'Landsorts fyr är enligt Sjöfartsverket Sveriges äldsta svenskbyggda fyr. Ett fyrbål brann här redan 1651, och 1669 fick köpmannen Johan van der Hagen privilegium att ta ut en avgift av varje förbiseglande skepp för fyrens drift. Dagens torn restes 1686 och fick sitt nuvarande utseende 1869–70. Egentligen heter bara fyren och lotsstationen Landsort — ön heter Öja.',
    insiderTips: [
      // KÄLLA: https://www.sjofartsverket.se/en/about-us/fyrar-och-kulturfastigheter/visningsfyrar/landsort--the-oldest-swedish-built-lighthouse/ — "the oldest Swedish-built lighthouse"; "The row related to the 1651 beacon"; "Automated and demanned in 1963" (läst 2026-09-27)
      'Sjöfartsverket kallar Landsort Sveriges äldsta svenskbyggda fyr. Redan 1651 fanns ett fyrbål här, och sedan 1963 är fyren automatiserad och obemannad.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/oja-landsort.html — "Buss med SL till Ankarudden på Torö. Därifrån reguljär turtrafik med Waxholmsbolagets fartyg till Öja-Landsort" (läst 2026-09-27)
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/landsort — "Landsort är Stockholms skärgårds sydligaste utpost" (läst 2026-09-27)
      'Waxholmsbåten till Landsort går inte från Nynäshamn utan från Ankarudden på Torö, dit SL-buss 852 går. Landsort är Stockholms skärgårds sydligaste utpost.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/oja-landsort.html — "Ön torde vara en av länets förnämsta sträckfågellokaler"; "sjöfågelsträcket är kraftigt såväl vår som höst" (läst 2026-09-27)
      // KÄLLA: https://landsort-birds.se/pages/guidningar.php — "början av april-slutet av juni, mitten av augusti-början av november" (läst 2026-09-27)
      'Länsstyrelsen räknar Öja till länets förnämsta sträckfågellokaler, med kraftigt sjöfågelsträck både vår och höst. Fågelstationen ringmärker början av april–slutet av juni och mitten av augusti–början av november, med sommaruppehåll.',
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/landsort — "Det finns 20 bofasta på ön" (läst 2026-09-27)
      // KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/landsortoeja-stockholms-skargard — "Ett 30-tal personer bor på Öja året om" (läst 2026-09-27)
      'Kommunen anger 20 bofasta och Statens fastighetsverk ett 30-tal — i vilket fall en liten fast befolkning, som mångdubblas på sommaren.',
    ],
    seasonal: {
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-landsort/ — "Du åker till Landsort från Ankarudden på Torö året om" (läst 2026-09-27)
      // KÄLLA: https://visitlandsort.se/resa-till-landsort/ — "under Högsommaren kan trycket på transporterna bli extremt" (läst 2026-09-27)
      open: 'Året runt',
      peak: 'Juli–Mitten av Augusti',
      best: 'Maj eller September',
      // KÄLLA: https://landsort-birds.se/pages/guidningar.php — "början av april-slutet av juni, mitten av augusti-början av november"; "Fågelstationen nås via promenad på ca 10 minuter norrut från byn" (läst 2026-09-27)
      bestReason: 'Maj och september ligger mitt i fågelstationens ringmärkningssäsong, med öppna guidningar på lördagar, och trycket på båtarna är lägre än på högsommaren.',
      // KÄLLA: https://landsort.com/saltboden/ — "Vi har öppet dagligen juni-augusti" (läst 2026-09-27)
      // KÄLLA: https://www.g-mo.se/home-2/kontakt/ — "Under perioden december till slutet av april har vi stängt" (läst 2026-09-27)
      warning: 'Båten Ankarudden–Landsort går året runt, men Saltboden har öppet dagligen bara juni–augusti och Svedtiljas är stängd december–april. Utanför sommaren: ta med mat.',
      // UPPSKATTNING: trafik och boende året runt, servering juni–augusti; vintermånaderna 'limited' i stället för 'off'
      months: ['limited','limited','limited','limited','open','open','peak','peak','open','limited','limited','limited'],
    },
  },
  // ─── FURUSUND ────────────────────────────────────────────────
  {
    slug: 'furusund',
    name: 'Furusund',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌲',
    tagline: 'Klassisk passage i norra skärgården med värdshus och gästhamn.',
    description: [
      // KÄLLA: Trafikverket, https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/ — "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård"; "Färjeledens längd är 600 meter"; "överfartstiden är fyra minuter"; "Resan med vägfärjan är avgiftsfri" (läst 2026-09-19)
      // KÄLLA: Trafikverket, https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/ — "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård"; "Färjeledens längd är 600 meter"; "överfartstiden är fyra minuter"; "Resan med vägfärjan är avgiftsfri" (läst 2026-09-19) ; Furusund Hamn, https://furusund.se/hamnen/ — "I vår gästhamn finns plats för upp till hundra båtar", med toaletter, duschar, bastu, el, vatten och tvätt (läst 2026-09-19)
      'Furusund ligger vid ett smalt sund i norra skärgården som länge varit en av farlederna in mot Stockholm. Vägfärjan Furusundsleden korsar sundet på 600 meter och fyra minuter, och i gästhamnen finns plats för upp till hundra båtar, med toaletter, duschar, bastu, el, vatten och tvätt.',
      // KÄLLA: https://hotellfurusund.se/historia/ — "1811 bygger man så en tullstation med arrest på Furusund"; "den stora restaurangen brann 1950", vilket blev starten för värdshusverksamheten i det gamla tullhuset; juveleraren Christian Hammer utvecklade Furusund till badort efter 1882 (2026-09-14)
      'Värdshuset har sin kärna i den tullstation med arrest som byggdes 1811. Efter 1882 utvecklade juveleraren Christian Hammer Furusund till badort, och när den stora restaurangbyggnaden brann 1950 flyttade värdshusverksamheten in i det gamla tullhuset — där den finns kvar. Huset är välbevarat och matsalen bär ett äldre hantverk.',
      // KÄLLA: https://hotellfurusund.se/historia/ — "August Strindberg kom till Furusund sommaren 1899, hitlockad av sin syster och svåger"; "På Furusund kom Strindberg även att vistas med tid med Harriet Bosse i villan Isola Bella"; Strindbergs verk från 1902 kallade Furusund "Fagervik" och grannön Köpmanholm "Skamsund" (2026-09-14)
      'August Strindberg kom till Furusund sommaren 1899, hitlockad av sin syster och svåger, och vistades senare här med Harriet Bosse i villan Isola Bella. I verket "Fagervik och Skamsund" (1902) blev Furusund "Fagervik" och grannön Köpmanholm "Skamsund".',
      // KÄLLA: https://hotellfurusund.se/historia/ — "1200-talet: Furusundsleden omnämns första gången i skrift"; 1463 lägger unionskungen Kristian I ankar med örlogsflottan i Ålandsviken och "man hugger i bergshällen in en kompassros" som fortfarande är synlig (2026-09-14)
      'Farleden är äldre än orten. Furusundsleden omnämns i skrift redan på 1200-talet, och 1463 låg unionskungen Kristian I för ankar med örlogsflottan i Ålandsviken — vid det tillfället höggs en kompassros in i bergshällen, och den finns kvar.',
      // KÄLLA: https://hotellfurusund.se/historia/ — efter förlusten av Finland 1809 byggdes 1811 "en tullstation med arrest på Furusund"; personalen omfattade "15 tullmän med familjer, en inspektor, 12 vaktmästare och 2 roddarkarlar" (2026-09-14)
      'Tullstationen från 1811 var ingen liten bemanning. Sedan Finland gått förlorat 1809 hade gränsen flyttat hit, och på ön fanns femton tullmän med familjer, en inspektor, tolv vaktmästare och två roddarkarlar. Furusund var under en period lika mycket myndighetspost som ö.',
      // KÄLLA: Hotell Furusund, https://hotellfurusund.se/historia/ — "hovjuveleraren Christian Hammer (1818-1905) som köper ön 1882 och omvandlar den till ett sommarparadis, som med sina badhus, pittoreska villor och vackra promenadstråk attraherade så väl societeten och kungligheter, konstnärer och författare" (läst 2026-09-19)
      'Hovjuveleraren Christian Hammer (1818–1905) köpte ön 1882 och byggde den till badort: badhus, pittoreska villor och anlagda promenadstråk. Det är hans stadsplan man fortfarande går omkring i.',
      // KÄLLA: https://hotellfurusund.se/historia/ — omkring 1900–1914 förband ångbåtarna Svithiod, Lena, Odin och von Döbeln ön med Östersjöhamnarna Lübeck, Stettin, Riga och S:t Petersburg (2026-09-14)
      'Under åren fram till första världskriget var Furusund en hållplats i ett större nät. Ångbåtarna Svithiod, Lena, Odin och von Döbeln gick härifrån till Lübeck, Stettin, Riga och S:t Petersburg. Sundet var inte en återvändsgränd utan en genomfart.',
      // KÄLLA: https://hotellfurusund.se/historia/ — "1921: Godsägare Samuelsson köper ön" och prioriterar "skogsaffärer och avverkning"; 1938 är ön i "djupaste förfall" när Albin Andersson övertar äganderätten; 1944 blir ön "karantän för krigsflyktingar, framförallt estländare" (2026-09-14)
      'Nedgången kom snabbt. 1921 köptes ön av godsägare Samuelsson, som prioriterade skogsaffärer och avverkning, och 1938 beskrivs Furusund som i djupaste förfall när Albin Andersson tog över. Under kriget dröjde upprustningen, och 1944 användes ön som karantän för krigsflyktingar, framför allt estländare.',
      // KÄLLA: https://www.norrtalje.se/, Översiktsplan 2050, Kulturmiljöer av lokalt intresse — "Furusund representerar en tidstypisk sommarnöjesort. Många byggnader är bevarade från storhetstiden från 1880 fram till första världskriget." (2026-09-14)
      'Norrtälje kommun pekar ut Furusund som kulturmiljö av lokalt intresse och skriver att ön representerar en tidstypisk sommarnöjesort, där många byggnader är bevarade från storhetstiden från 1880 fram till första världskriget. Det är alltså inte en enskild byggnad som är värd skydd utan helheten.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/furusundsfjarden.html — reservatet omfattar öarna Stor-Asken, Lill-Asken och Stumpen "belägna tre kilometer nordost om Furusund"; skyddat sedan 1974; "373 hektar varav land 24 hektar"; förvaltare Länsstyrelsen; syftet är att "bevara ett oexploaterat område av innerskärgården av värde för friluftslivet"; Natura 2000-område (2026-09-14)
      'Tre kilometer nordost om Furusund ligger Furusundsfjärdens naturreservat, som omfattar öarna Stor-Asken, Lill-Asken och Stumpen. Det bildades 1974 och mäter 373 hektar, varav bara 24 är land. Länsstyrelsen förvaltar det, syftet är att bevara ett oexploaterat område av innerskärgården av värde för friluftslivet, och området är också Natura 2000.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/furusundsfjarden.html — naturtyper "skärgård, marina miljöer, lövskog", främst al, lönn, ask, alm, asp och hassel med inslag av tall, gran och en; på Stor-Asken finns hassellund och rik almförekomst; föreskrifterna förbjuder lös hund, tältning över ett dygn och öppen eld (2026-09-14)
      'Askarna bär sitt namn med rätta: lövskogen där består av al, lönn, ask, alm, asp och hassel med inslag av tall, gran och en, och på Stor-Asken finns en hassellund och rikligt med alm. Här gäller strängare tältregler än i många andra reservat — högst ett dygn — och eldning är förbjuden.',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/ — etappen "Furusund" anges som "Medium, 7.2 km" (2026-09-14)
      'Furusund är en av etapperna i Stockholm Archipelago Trail. Sträckan anges till 7,2 kilometer och klassas som medelsvår — en dagsvandring snarare än en expedition, men tillräckligt lång för att man ska hinna lämna gästhamnen bakom sig.',
    ],

    facts: {
      travel_time: '2 h med bil från Stockholm', // KÄLLA: https://hotellfurusund.se/kontakt/ nämner bil, SL-buss via Norrtälje eller båt men ingen Waxholmsbolaget-linje eller restid från Strömkajen kunde beläggas (se Fynd)
      character: 'Lugnt, naturskönt, historiskt, seglingstradition',
      season: 'Maj–September',
      best_for: 'Seglare, romantik, Strindberg-intresserade',
    },
    activities: [
      { icon: '⛵', name: 'Segling', desc: 'Furusund är en klassisk passage och etappstopp på norrlandsresorna.' },
      { icon: '📚', name: 'Strindbergs-turism', desc: 'August Strindberg bodde och skrev här. Platsen bär hans historia.' },
      { icon: '🏊', name: 'Bad', desc: 'Klippbad längs sundet och på de omgivande holmarna.' },
    ],
    // KÄLLA: https://hotellfurusund.se/ (furusundvardshus.se omdirigerar dit) — boutiquehotell med 16 rum, restaurang, året runt; visitskargarden.se/boende/hotell/hotell-furusund (läst 2026-09-14)
    accommodation: [
      { name: 'Hotell Furusund', type: 'Hotell', desc: 'Anrikt värdshus, i dag boutiquehotell med 16 rum och restaurang. Öppet året runt.', websiteUrl: 'https://hotellfurusund.se' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Stockholm via Norrtälje', time: '2 h', desc: 'Kör E18 mot Norrtälje och följ skylt mot Furusund.', icon: '🚗' },
    ],
    harbors: [
      { name: 'Furusund Hamn', desc: 'Välplacerad gästhamn vid sundet med WC, dusch, el och vatten.', fuel: false, service: ['el', 'vatten', 'dusch'] }, // KÄLLA: https://furusundshamnkrog.se/gasthamn ("Service i hamnen: WC, Dusch, El, Vatten, WiFi, Miljöstation") — ingen bränsleförsäljning listad
    ],
    restaurants: [
      // KÄLLA: https://hotellfurusund.se/ — hotellet kallar den bara "restaurang"; "Värdshus" är det historiska namnet
      { name: 'Hotell Furusund, restaurangen', type: 'Restaurang', desc: 'Det gamla värdshuset — mat i historisk miljö.', slug: 'furusund-vardshus', price_example: 'Förrätt 175–195 kr, huvudrätt 225–390 kr', open_season: 'Maj–Oktober', open_hours: 'Varierar med säsong, kortare öppettider utanför juni–augusti', book_required: true, phone: '0176-803 44', child_menu: true }, // KÄLLA: https://hotellfurusund.se/kontakt/ (telefon +46 (0)176-803 44; öppettider publicerade per månad, t.ex. september); hotellfurusund.se/menyer/, PDF-menyer hösten 2026 (förrätter 175–195 kr, huvudrätter 225–390 kr)
    ],
    day_cost: {
      // Ingen totalsumma: parkering och resa saknar belagt pris. Menypriserna nedan är belagda.
      budget_per_person: 'Lunch och middag enligt hotellets menyer — resa och parkering tillkommer',
      includes: 'Bil/buss till Furusund, lunch + middag på hotellets restaurang, parkering',
      breakdown: [
        { item: 'Lunch, Hotell Furusund', price: '175–290 kr' }, // KÄLLA: https://hotellfurusund.se/, lunchmeny hösten 2026 (PDF): förrätt 175 kr, huvudrätt 225–290 kr
        { item: 'Middag, Hotell Furusund', price: '175–390 kr' }, // KÄLLA: https://hotellfurusund.se/, kvällsmeny hösten 2026 (PDF): förrätt 175–195 kr, huvudrätt 225–390 kr
      ],
      tips: [
        'Boka bord på hotellets restaurang i förväg under högsäsong.',
        'Kom med bil — det är det snabbaste sättet att ta sig till Furusund. Alternativet är SL-buss via Norrtälje.', // KÄLLA: https://hotellfurusund.se/kontakt/ ("Här hittar du hur SL-bussarna går till och från Furusund")
        'Strömmen i sundet gör att seglare ofta stannar över kvällen.',
      ],
    },
    tips: [
      // KÄLLA: https://www.trafikverket.se/furusundsleden — vägfärja mellan Furusund och Yxlan, 600 meter (2026-09-14)
      'Vägfärjan Furusund–Yxlan korsar sundet — håll uppsikt på färjetrafiken när du passerar.',
      'Boka bord på värdshuset i förväg under sommaren.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/furusundsfjarden.html — i reservatet är det förbjudet att tälta över ett dygn, göra upp eld och ha lös hund (2026-09-14)
      'I Furusundsfjärdens naturreservat på Askarna får tältet stå högst ett dygn, eldning är förbjuden och hunden ska vara kopplad.',
      // KÄLLA: https://www.furusund.se/hamnen/ — gästhamnen har "Gästplatser: 100" och grunddjupet anges till 2–3 meter enligt sjökort 111 SW; elanslutningen är 10 ampere (2026-09-14)
      'Grunddjupet i gästhamnen anges till 2–3 meter och eluttagen ger 10 ampere — värt att veta för den som kommer med djupgående båt eller kylskåpsladdning.',
    ],
    activity_meta: {
      // KÄLLA: Stockholm Archipelago Trail, https://stockholmarchipelagotrail.com/section/ (2026-09-17)
      vandring: { trails: 1, max_km: 7.2, sat: { km: 7.2, difficulty: 'Medel' } },
    },
    related: ['blido', 'arholma', 'norrora'],
    tags: ['segling', 'Strindberg', 'norra', 'passage', 'historia'],
    // KÄLLA: https://stockholmslansmuseum.se/besoksmal/furusund/ — "Furusund blev på 1800-talet en populär badort som lockade dåtidens kändisar"; "Den förmögne juveleraren Christian Hammer köpte Furusund 1883. Här skapade han en modern badort. Han lät bygga sommarvillor som fick romantiska namn och ett varmbadhus"; "Kanske förknippas Furusund mest med August Strindberg. Han hyrde en villa här under sitt äktenskap med Harriet Bosse. Strindberg hämtade många motiv från Furusund. I 'Fagervik och Skamsund' stod Fagervik för Furusund och Skamsund för grannorten Köpmanholm på Yxlan"; "Telegrafstationen från 1837 är den enda bevarade i Sverige" (läst 2026-09-19)
    did_you_know: 'Furusund blev på 1800-talet en populär badort som lockade dåtidens kändisar. Juveleraren Christian Hammer köpte ön 1883 och lät bygga sommarvillor och ett varmbadhus. August Strindberg hyrde en villa här under äktenskapet med Harriet Bosse och hämtade många motiv från ön — i \'Fagervik och Skamsund\' är Fagervik Furusund och Skamsund grannorten Köpmanholm på Yxlan. Den optiska telegrafstationen från 1837 är enligt Stockholms läns museum den enda bevarade i Sverige.',
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Juni: seglarlivet börjar, värdshuset öppet och inga köer. September: stilla vatten och dramatiska ljusförhållanden.',
      warning: 'Begränsade öppettider utanför högsäsong (juni–augusti). Hotell Furusund håller dock öppet för bl.a. julbord i december.', // KÄLLA: https://hotellfurusund.se/ (menyval "Julbord"; öppettider publicerade även för september); furusundshamnkrog.se/gasthamn/hamnguide/ ("Huvudsäsong: 1 juni – 31 augusti")
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },

  },
  // ─── BLIDÖ ────────────────────────────────────────────────────
  {
    slug: 'blido',
    name: 'Blidö',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌿',
    // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/blidoleden/ — "Blidöleden går mellan Yxlan och Blidö i Stockholms skärgård", "Resan med vägfärjan är avgiftsfri" (läst 2026-09-27); https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-norrtalje-kommun/blido-radmansholmen.html — "Blidö, Rådmansholmen är ett EU-bad" (läst 2026-09-27); Blidö kyrka invigd 1859 enligt RAÄ:s bebyggelseregister (se description)
    tagline: 'Norra skärgårdens ö med bilväg via två avgiftsfria vägfärjor, EU-bad och kyrka från 1859.',
    description: [
      // KÄLLA: Trafikverket, https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/ — "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård"; "Färjeledens längd är 600 meter"; "överfartstiden är fyra minuter"; "Resan med vägfärjan är avgiftsfri" (läst 2026-09-19)
      // KÄLLA: Trafikverket, https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/ — "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård"; "Färjeledens längd är 600 meter"; "överfartstiden är fyra minuter"; "Resan med vägfärjan är avgiftsfri" (läst 2026-09-19) ; Trafikverket, https://www.trafikverket.se/resa-och-trafik/farjetrafik/blidoleden/ — "Blidöleden går mellan Yxlan och Blidö i Stockholms skärgård"; "Färjeledens längd är 530 meter"; "överfartstiden är fyra minuter"; "Resan med vägfärjan är avgiftsfri" (läst 2026-09-19)
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h24.pdf — "24A STOCKHOLM – VAXHOLM – BLIDÖSUNDET", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026", "Stämmarsund (Blidö)" (läst 2026-09-27); https://kund.printhuset-sthlm.se/wa/h26.pdf — "26A STOCKHOLM – VAXHOLM – NORRSUND – RÖDLÖGA", "Norrsund (Blidö)" (läst 2026-09-27)
      'Blidö nås med bil hela vägen, via två avgiftsfria vägfärjor: Furusundsleden mellan Furusund och Yxlan, 600 meter och fyra minuter, och därefter Blidöleden mellan Yxlan och Blidö, 530 meter och lika kort överfart. Utan bil går det att ta Waxholmsbolagets båtar från Strömkajen via Vaxholm: linje 24 angör Stämmarsund och linje 26 Norrsund på Blidö.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/linkudden.html — "Skyddat sedan: 1969"; "Storlek: 18 hektar varav land 14"; kommun Norrtälje; förvaltare Norrtälje kommun; markägare privata; naturtyper "ängs- och betesmark, barrskog, skärgård"; syftet är att "bevara ett område med säregen, vacker natur och stor betydelse för allmänhetens friluftsliv" (2026-09-14)
      'På södra Blidö ligger Linkuddens naturreservat, skyddat sedan 1969. Det är litet — 18 hektar, varav 14 på land — och förvaltas av Norrtälje kommun på privat mark. Syftet formuleras som att bevara ett område med säregen, vacker natur och stor betydelse för allmänhetens friluftsliv, och naturtyperna anges som ängs- och betesmark, barrskog och skärgård.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/linkudden.html — karakteristiska arter: "rosettjungfrulin, liten blåklocka, vildlin", "hundratals Adam och Eva", "låsbräken, solvända, darrgräs, ormtunga, majviva och kärrspira"; hällmarkstallskog i östra och västra delarna, blandskog med ek, asp och hassel mellan bergsryggarna; "Fågellivet är rikt med bland annat häckande sjöfågel" (2026-09-14)
      'Reservatet är bara 18 hektar, men Länsstyrelsen räknar upp rosettjungfrulin, liten blåklocka, vildlin, låsbräken, solvända, darrgräs, ormtunga, majviva och kärrspira — och hundratals exemplar av orkidén Adam och Eva. Hällmarkstallskog klär de östra och västra delarna, medan blandskog med ek, asp och hassel växer mellan bergsryggarna, och fågellivet beskrivs som rikt med bland annat häckande sjöfågel.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/linkudden.html — anordningar: informationstavla, stig; föreskrifter förbjuder bland annat att skada vegetation, störa djurlivet, ha lös hund eller katt, tälta, förtöja båt längre än två dygn, göra upp öppen eld och köra motordrivet fordon (2026-09-14)
      'Anordningarna är sparsamma: en informationstavla och en stig. Reglerna är desto tydligare — här är det förbjudet att tälta, göra upp eld, ha hund eller katt lös, köra motorfordon och att ligga förtöjd med båt längre än två dygn på samma plats.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/salskaren.html — reservatet ligger mellan Blidö och Svartlöga i Norrtälje kommun; "Skyddat sedan: 1973"; "Storlek: 76 hektar varav land 5"; förvaltare Skärgårdsstiftelsen; syftet är att "trygga en ögrupp för allmänhetens friluftsliv samt skydda en värdefull häckningsbiotop för sjöfågel"; "Vegetationen på öarna skall i princip lämnas för fri utveckling" (2026-09-14)
      'Ute i vattnet mellan Blidö och Svartlöga ligger Salskärens naturreservat, skyddat sedan 1973 och förvaltat av Skärgårdsstiftelsen. Av de 76 hektaren är bara fem land. Syftet är dubbelt: att trygga en ögrupp för allmänhetens friluftsliv och att skydda en värdefull häckningsbiotop för sjöfågel. Lövskog med al, ask och rönn står bland enbuskar, och vegetationen ska i princip lämnas för fri utveckling.',
      // KÄLLA: Riksantikvarieämbetet, bebyggelseregistret via https://www.kringla.nu/kringla/objekt?referens=raa/bbr/21400000444777 — "En ny kyrka började uppföras år 1856 runt det gamla kapellet som revs först ett år senare. Invigningen förrättades år 1859. Den nya kyrkan ritades av arkitekten Ludvig Hedin."; salkyrka med enskeppigt långhus av sten och tegel; "Fasaderna är putsade och gult avfärgade, tidigare vita"; "Sadeltaket täcks av skiffer" (2026-09-14)
      'Blidö kyrka började byggas 1856 — runt det gamla kapellet, som revs först året därpå — och invigdes 1859. Arkitekten var Ludvig Hedin, och resultatet är en salkyrka med enskeppigt långhus i sten och tegel. Fasaderna är putsade och gult avfärgade, tidigare vita, och sadeltaket är täckt med skiffer.',
      // KÄLLA: Riksantikvarieämbetet, bebyggelseregistret via https://www.kringla.nu/kringla/objekt?referens=raa/bbr/21400000444777 — ett tidigare kapell på platsen stod färdigt 1660; vid mitten av 1800-talet var "kapellet starkt förfallet och beslut fattades om ett nytt kyrkobygge"; interiören är hållen "enkla i nyklassisk anda med brutet vita, slätputsade väggar"; restaurering 1937 under E. Lundberg med konstnären Gunnar Torhamn (2026-09-14)
      'Kyrkan har en föregångare: ett kapell som stod färdigt 1660 och som vid mitten av 1800-talet var starkt förfallet, vilket ledde till beslutet om ett nytt kyrkobygge. Interiören är hållen i nyklassisk anda med brutet vita, slätputsade väggar. 1937 restaurerades byggnaden under E. Lundberg, med konstnären Gunnar Torhamn ansvarig för ny konst och nya färgsättningar.',
      // KÄLLA: hembygd.se/blido/about (Blidö sockens hembygdsförening) — socknen bildades före 1650; "Socknen övergick till att kallas Blidö kommun" 1862; "Den uppgick i Norrtälje kommun" 1971; området omfattar huvudöarna Blidö och Yxlan samt ett tjugotal mindre öar och skär, beläget "sydost om Norrtälje i skärgården vid Svartlögafjärden" (2026-09-14)
      'Blidö socken bildades före 1650 och omfattar mer än en ö: huvudöarna är Blidö och Yxlan, och till socknen hör också mindre öar och skär vid Svartlögafjärden. 1862 övergick socknen till att kallas Blidö kommun, och 1971 uppgick den i Norrtälje kommun.',
      // KÄLLA: Norrtälje kommun, https://www.norrtalje.se/info/kultur-och-fritid/kultur-och-konst/norrtalje-museerkulturarv-och-stadsarkiv/museer-hembygds--och-kulturforeningar/batsmanstorpet--blido-sockens-hembygdsforening/ — "Båtsmanstorpet från 1730-talet på Blidö är inrett som det såg ut på den siste båtsmannens tid"; Bromskärsvägen 2, Oxhalsö; "Hösten 2021 invigs en Bagarstuga samt Silversmedens hus med utställningar och aktiviteter kopplade till Yngve Bergers konstnärskap"; "Sommartid arrangeras aktiviteter som byavandringar, utställningar m m." (läst 2026-09-19)
      // KÄLLA: Norrtälje kommun, https://www.norrtalje.se/info/kultur-och-fritid/kultur-och-konst/norrtalje-museerkulturarv-och-stadsarkiv/museer-hembygds--och-kulturforeningar/batsmanstorpet--blido-sockens-hembygdsforening/ — "Båtsmanstorpet från 1730-talet på Blidö är inrett som det såg ut på den siste båtsmannens tid"; Bromskärsvägen 2, Oxhalsö; "Hösten 2021 invigs en Bagarstuga samt Silversmedens hus med utställningar och aktiviteter kopplade till Yngve Bergers konstnärskap"; "Sommartid arrangeras aktiviteter som byavandringar, utställningar m m." (läst 2026-09-19) ; Blidö sockens hembygdsförening, https://www.hembygd.se/blido/about — "Hembygdsgården består alltså av fyra hus: Båtsmanstorpet, fähuset, Silversmedens hus och Bagarstugan"; fähuset är "en så kallad 'en ko-ladugård', som var avsedd just för en ko" (läst 2026-09-19)
      'I Oxhalsö står ett båtsmanstorp från 1730-talet, inrett som under den siste båtsmannens tid. Runt det har Blidö sockens hembygdsförening samlat fyra byggnader: torpet, ett fähus som kallas en ko-ladugård eftersom det var avsett just för en ko, Silversmedens hus med sidokammarstuga, och en bagarstuga. Sedan 2021 visas här också utställningar kopplade till konstnären Yngve Bergers arbeten, och sommartid arrangeras byavandringar.',
      // KÄLLA: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-norrtalje-kommun/blido-radmansholmen.html — "Blidö, Rådmansholmen är ett EU-bad", "Dass på badplatsen, Lekutrustning samt grillplats", klassificering 2025 utmärkt kvalitet (läst 2026-09-27)
      // KÄLLA: https://www.norrtalje.se/info/kultur-och-fritid/bad/badplatser/radmansholmen/ — "ligger vid södra kusten på Oxhalsö", "Här hittar du cirka 25 meter strandlinje som består av sand", "Runt om badplatsen finns lövskog", "Ytterligare en badflotte närmare strandkanten, på grundare vatten", "Hund tillåtet: Nej, inte mellan 15 maj och 15 september" (läst 2026-09-27)
      'Badet vid Rådmansholmen är ett EU-bad, vilket betyder att vattnet provtas regelbundet — klassificeringen för 2025 var utmärkt kvalitet. Det ligger vid södra kusten på Oxhalsö, med ungefär 25 meter sandstrand omgiven av lövskog, dass, lekutrustning och grillplats, och en extra badflotte på grundare vatten närmare stranden. Hundar är inte tillåtna på badet 15 maj–15 september.',
      // KÄLLA: https://www.norrtalje.se/, Köpmanholms skola — "Här går cirka 35 elever"; skolan är en F–6-skola på adressen Lilltorpsvägen 33, 760 18 Yxlan, och beskrivs som "omgiven av öarna Furusund och Blidö" med närhet till "både skog och hav" (2026-09-14)
      'Barn från ögruppen går i Köpmanholms skola på Yxlan, en F–6-skola med omkring 35 elever som kommunen beskriver som omgiven av öarna Furusund och Blidö, med närhet till både skog och hav.',
    ],

    facts: {
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/ — "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård", "Färjeledens längd är 600 meter och överfartstiden är fyra minuter" (läst 2026-09-27); https://www.trafikverket.se/resa-och-trafik/farjetrafik/blidoleden/ — "Blidöleden går mellan Yxlan och Blidö i Stockholms skärgård", "Färjeledens längd är 530 meter" (läst 2026-09-27)
      travel_time: 'Bil via två avgiftsfria vägfärjor (Furusundsleden och Blidöleden, fyra minuter vardera)',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/linkudden.html — "Skyddat sedan: 1969"; https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/salskaren.html — "Skyddat sedan: 1973"; https://www.kringla.nu/kringla/objekt?referens=raa/bbr/21400000444777 — "Invigningen förrättades år 1859" (se description)
      character: 'Ö med bilväg via Yxlan, kyrka från 1859 och naturreservaten Linkudden och Salskären',
      // KÄLLA: https://www.blidorestaurang.se/ — "Från början av juni till mitten av augusti har vi öppet för lunch och middag" (läst 2026-09-27)
      season: 'Sommar – krogen vid Stämmarsund har öppet början av juni–mitten av augusti',
      // UPPSKATTNING: redaktionell bedömning utifrån bad, reservat och hamn som beskrivs ovan
      best_for: 'Bilutflykt, bad vid Rådmansholmen, naturreservat, båtliv vid Stämmarsund',
    },
    facts_provenance: { travel_time: 'matt', character: 'matt', season: 'matt', best_for: 'bedomning' },
    activities: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/linkudden.html — "Skyddat sedan: 1969", "Storlek: 18 hektar varav land 14", anordningar informationstavla och stig (se description)
      { icon: '🌿', name: 'Linkuddens naturreservat', desc: 'Litet reservat på södra Blidö, 18 hektar, med ängs- och betesmark, hällmarkstallskog och en stig. Tält, eld och lös hund är förbjudna.' },
      // KÄLLA: https://www.norrtalje.se/info/kultur-och-fritid/bad/badplatser/radmansholmen/ — "cirka 25 meter strandlinje som består av sand"; https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-norrtalje-kommun/blido-radmansholmen.html — "Blidö, Rådmansholmen är ett EU-bad" (läst 2026-09-27)
      { icon: '🏊', name: 'Bad', desc: 'EU-badet vid Rådmansholmen på Oxhalsö: ungefär 25 meter sandstrand, grillplats, lekutrustning och badflottar.' },
    ],
    // KÄLLA: https://www.blidorestaurang.se/ — "Vi har två "längor" med vandrarhem och totalt ca 50 sängar", "I varje vandrarhem finns även kök, toaletter och duschar", "Vi har nu stängt för säsongen", sidans titel "Blidö Brygga & Bistro" (läst 2026-09-27); https://blidorestaurang.se/v-hem/ — "Rummen har 2, 3 eller 4 sängar" (läst 2026-09-27). blidobryggabistro.se löser inte längre upp (DNS), verksamheten har bytt till blidorestaurang.se.
    accommodation: [
      { name: 'Blidö Brygga och Bistro', type: 'Vandrarhem', desc: 'Två längor med vandrarhem vid Stämmarsund, totalt cirka 50 sängar i rum med 2–4 sängar, kök, toaletter och duschar. Sommaröppet – kontrollera säsongen på webbplatsen.', websiteUrl: 'https://www.blidorestaurang.se' },
    ],
    getting_there: [
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/ — "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård", "Färjeledens längd är 600 meter och överfartstiden är fyra minuter", "Resan med vägfärjan är avgiftsfri" (läst 2026-09-27); https://www.trafikverket.se/resa-och-trafik/farjetrafik/blidoleden/ — "Blidöleden går mellan Yxlan och Blidö i Stockholms skärgård" (läst 2026-09-27)
      { method: 'Bil + två bilfärjor', from: 'Furusund', time: '', desc: 'Kör mot Furusund, vägfärja till Yxlan (Furusundsleden, 600 m, fyra minuter), sedan vägfärja Yxlan–Blidö (Blidöleden, 530 m). Båda avgiftsfria.', icon: '🚗' },
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h24.pdf — "24A STOCKHOLM – VAXHOLM – BLIDÖSUNDET", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026", "Stämmarsund (Blidö)" (läst 2026-09-27); https://kund.printhuset-sthlm.se/wa/h26.pdf — "26A STOCKHOLM – VAXHOLM – NORRSUND – RÖDLÖGA", "Norrsund (Blidö)" (läst 2026-09-27)
      { method: 'Waxholmsbåt', from: 'Strömkajen, Stockholm', time: '', desc: 'Linje 24 (Stockholm–Vaxholm–Blidösundet) angör Stämmarsund och linje 26 Norrsund på Blidö. Vår- och hösttabellen gäller till 1 november 2026.', icon: '⛴' },
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – BROMSKÄR / RÖDLÖGA", "Bromskär (Blidö)" (läst 2026-09-27)
      { method: 'Waxholmsbåt', from: 'Furusund', time: '', desc: 'Linje 28 från Furusund angör Bromskär på Blidö.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/blido/ — "Hamn i skyddat läge vid restaurang Blidö Brygga", 50 gästplatser, "Boj/ mooringlina/ långsides", "Blidö Brygga & Bistro", diesel och bensin "3 dist." bort (läst 2026-09-27); https://blidorestaurang.se/bryggan/ — "Det går INTE att boka bryggplats hos oss", "Behöver du fylla dunkar kan du göra det här", "El finns tyvärr inte nere på bryggan", "Vi har flera duschar och toaletter" (läst 2026-09-27)
      { name: 'Blidö Brygga (Stämmarsund)', desc: 'Hamn i skyddat läge vid restaurangen, cirka 50 gästplatser med boj, mooring eller långsides. Går inte att förboka. Duschar och toaletter, vatten i dunk, ingen el på bryggan.', spots: 50, fuel: false, service: ['vatten', 'dusch', 'toilet'] },
    ],
    restaurants: [
      // KÄLLA: https://www.blidorestaurang.se/ — "Från början av juni till mitten av augusti har vi öppet för lunch och middag", "Onsdagar förgyller vi med trubadur", "Man kan inte boka bord hos oss", "Vi har nu stängt för säsongen" (läst 2026-09-27); adress Stämmarsundsbacken 7 enligt https://www.explorearchipelago.com/sv/sthlm/norra-skargarden/blido/blido-brygga-och-bistro-vandrarhem
      { name: 'Blidö Brygga & Bistro', type: 'Restaurang', desc: 'Sommarkrog vid gästbryggan i Stämmarsund med lunch och middag från början av juni till mitten av augusti, trubadur på onsdagar. Bordsbokning tas inte emot.', websiteUrl: 'https://www.blidorestaurang.se' },
    ],
    tips: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/linkudden.html — föreskrifterna förbjuder tältning, öppen eld, lös hund eller katt samt förtöjning på samma plats längre än två dygn (2026-09-14)
      'I Linkuddens naturreservat är tältning och öppen eld förbjudna, hunden ska vara kopplad och båten får inte ligga förtöjd på samma plats längre än två dygn.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/linkudden.html — anordningar: informationstavla, stig (2026-09-14)
      'Linkudden har en stig och en informationstavla — inga andra anordningar. Ta med det du behöver.',
    ],
    related: ['furusund', 'arholma', 'norrora'],
    tags: ['lugnt', 'norra', 'bilfärja', 'lantligt'],
    // KÄLLA: https://www.moomin.com/en/tove-jansson-6/ — "As a child Tove spent summers with her relatives in the Stockholm archipelago. It was from the summer house in Blidö and the area surrounding it that Tove drew her inspiration for Moominvalley and the Moominhouse with its terrace and slender tower." (läst 2026-09-27)
    // KÄLLA: https://tovejansson.com/story/tove-jansson-family-studio/ — "She also makes lengthy visits to her grandparents, who live on the Swedish island of Blidö" (läst 2026-09-27)
    did_you_know: 'Tove Jansson tillbringade barndomens somrar hos släkten på Blidö. Enligt Moomin Characters var det sommarhuset där och trakten runt det som inspirerade Mumindalen och Muminhuset med sin veranda och sitt smala torn.',
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli–Augusti',
      best: 'Juni–mitten av augusti',
      // KÄLLA: https://www.blidorestaurang.se/ — "Från början av juni till mitten av augusti har vi öppet för lunch och middag" (läst 2026-09-27); https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-norrtalje-kommun/blido-radmansholmen.html — provsvar 2026-05-25 till 2026-08-17 "Tjänligt" (läst 2026-09-27)
      bestReason: 'Krogen och vandrarhemmet vid Stämmarsund har öppet från början av juni till mitten av augusti, och EU-badet vid Rådmansholmen provtas under sommaren (alla prov maj–augusti 2026 var tjänliga).',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },
  },
  // ─── GÄLLNÖ ──────────────────────────────────────────────────
  {
    slug: 'gallno',
    name: 'Gällnö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌿',
    tagline: 'Bilfri naturreservatsö med kulturlandskap, krog och handelsbod.',
    description: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/gallno.html — "Skyddat sedan: 1978, utvidgat 2017 och 2024"; syftet är att bevara ett skärgårdsområde "av stor betydelse för allmänhetens friluftsliv" med ett "skyddsvärt, kulturpräglat skärgårdslandskap"; "genuin skärgårdsmiljö med levande jordbruk" (2026-09-14)
      // KÄLLA: https://gallno.se/ — ön är bilfri och nås med skärgårdsbåt (2026-09-14)
      'Gällnö är en ö i mellersta skärgården där grusvägarna är bilfria, och naturreservat sedan 1978, utvidgat 2017 och 2024. Syftet är att bevara ett skärgårdsområde av stor betydelse för friluftslivet, med ett skyddsvärt, kulturpräglat skärgårdslandskap.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/gallno.html — "hagmarker med en artrik flora"; på Västerholmen "växer bland annat lind, ask, alm och ek", många gamla och grova med rikligt med död ved (2026-09-14)
      'Reservatets hagmarker har en artrik flora, och på Västerholmen står lövskog med bland annat lind, ask, alm och ek — många av träden gamla och grova, med rikligt med död ved.',
      // KÄLLA: https://gallno.se/ — på ön finns Gällnö krog ("Till vår sommaröppna krog kommer man för att äta en bit mat, sippa på ett glas vin"), Handelsboden, vandrarhem (STF) och Hotell Frans August (2026-09-14)
      'På ön finns en sommaröppen krog, Handelsboden, ett vandrarhem och Hotell Frans August — men ingen storskalig turistinfrastruktur. Landskapet växlar mellan skogspartier och öppna hagmarker.',
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/gallno — Gällnö är ett av Waxholmsbolagets resmål med egen bryggsida (2026-09-14)
      'Ön trafikeras av Waxholmsbolaget.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/gallno.html — "270 hektar varav 150 ha land"; kommun Värmdö; markägare "privat samt Skärgårdsstiftelsen"; förvaltare "Skärgårdsstiftelsen" (2026-09-14)
      'Reservatet omfattar 270 hektar, varav 150 på land, och ligger i Värmdö kommun. Marken ägs dels privat, dels av Skärgårdsstiftelsen, som också är förvaltare — en delad ägobild som förklarar varför jordbruket fortfarande drivs och inte bara visas upp.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/gallno.html — reservatet omfattar grunda havsvikar med vass, kärlväxtängar, kransalger och blåstångsbälten, viktiga reproduktionsmiljöer för gädda och abborre; föreskrifterna förbjuder att framföra motorbåt i Norrviken (2026-09-14)
      'Skyddet går ut i vattnet. De grunda havsvikarna med vass, kärlväxtängar, kransalger och blåstångsbälten är viktiga reproduktionsmiljöer för gädda och abborre, och därför är det förbjudet att köra motorbåt i Norrviken. Det är en tystnad som är påbjuden, inte tillfällig.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/gallno.html — Natura 2000-området "Västerholmen SE0110347"; naturtyper inkluderar hällmarkstallskog, granskog med lövinslag samt ädellövskog (2026-09-14)
      'Västerholmen är dessutom eget Natura 2000-område, SE0110347. Runt om växlar landskapet mellan hällmarkstallskog, granskog med lövinslag och den öppna åker- och betesmarken — tre helt olika marktyper inom gångavstånd.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/gallno.html — anordningar: "handelsbod, rast- och informationstuga, allmän båtplats och vandrarhem" samt informationstavla, cykelled och båtluffarled (2026-09-14)
      'Länsstyrelsen räknar upp anordningarna i reservatet som handelsbod, rast- och informationstuga, allmän båtplats och vandrarhem, plus informationstavla, cykelled och båtluffarled. Gällnö ligger alltså på båtluffarleden, den kedja av roddbåtar och korta överfarter som binder ihop mellanskärgårdens öar.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/gallno.html — föreskrifterna förbjuder bland annat att ta stenar, skada vegetation eller träd, föra lös hund och tälta längre än två dygn på samma plats (2026-09-14)
      'Reglerna följer reservatets logik: hunden ska vara kopplad, tältet får stå högst två dygn på samma plats, och det är förbjudet att ta stenar eller skada träd och vegetation.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/gallno-karklo/ — vid Torsviken finns "sandstrand och tältplats" samt "en välbevarad jättegryta som bildades av inlandsisen för omkring 10 000 år sedan" (2026-09-14)
      'Vid Torsviken finns sandstrand och tältplats — och en välbevarad jättegryta, bildad av inlandsisen för omkring 10 000 år sedan. Det är ett av de få stället på ön där geologin talar högre än jordbrukslandskapet.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/gallno-karklo/ — Gällnö by beskrivs med "rödmålade hus, båthus och bodar under knotiga äppelträd, med utsikt över Hemfladen"; ön ligger i mellersta skärgården mellan Värmdö och Möja (2026-09-14)
      'Gällnö by är öns kärna, och Skärgårdsstiftelsen beskriver den som rödmålade hus, båthus och bodar under knotiga äppelträd, med utsikt över Hemfladen. Ön ligger i mellanskärgården mellan Värmdö och Möja, med badstränder och skyddade naturhamnar på flera håll.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/karklo.html — Karklö naturreservat bildat 2017, "123 hektar varav land 59 hektar", förvaltare Skärgårdsstiftelsen; "Vid Vambö och Kolfatet gränsar reservatet till Gällnö naturreservat i sydost"; i reservatet står "en grov döende ek, troligen upp emot 300 år gammal"; anordningar: bad/badplats och stig (2026-09-14)
      'Grannön Karklö, skild från Gällnö av ett smalt sund, blev eget naturreservat 2017 — 123 hektar varav 59 land, också det förvaltat av Skärgårdsstiftelsen. Vid Vambö och Kolfatet gränsar de två reservaten till varandra. På Karklö står en grov döende ek som troligen är upp emot 300 år gammal, och genom reservatet går en stig. Badplatsen ligger utanför reservatet, i närheten av ångbåtsbryggan.',
    ],

    facts: {
      // KÄLLA: https://gallno.se/ ("trafikeras av både Waxholmsbolaget och Strömma/Cinderella-båtarna", "tar mellan 1,5–2 timmar"). Linjenummer kunde inte verifieras. Kontrollerad 2026-09-03.
      travel_time: 'Waxholmsbåt eller Cinderellabåt från Strömkajen/Strandvägen, ca 1,5–2 h',
      character: 'Bilfri, naturreservat, lugnt',
      // KÄLLA: https://gallno.se/oppettider/ (2026) — begränsat öppet från 14 maj, sista öppna dagar i slutet av augusti. Kontrollerad 2026-09-03.
      season: 'Mitten av maj–slutet av augusti (fullt öppethållande slutet av juni–början av augusti)',
      best_for: 'Natur, kulturlandskap, mat och dryck',
    },
    activities: [
      // KÄLLA: https://gallno.se/ (FAQ, dagsutflykt) — cykel och kajak går att hyra på ön under sommaren. Uppgift om lägertradition hittades inte i primärkällor. Kontrollerad 2026-09-03.
      { icon: '🚴', name: 'Cykel och kajak', desc: 'Cykel och kajak går att hyra på ön under sommaren.' },
      { icon: '🚶', name: 'Vandring', desc: 'Välmarkerade leder i naturreservat.' },
    ],
    // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-gallno-vandrarhem/ + https://gallno.se/ (rum i gamla skolan och stugor, café sommartid, året runt); skargardsstiftelsen.se/omraden/gallno-karklo — tältplats vid Torsviken (läst 2026-09-14)
    accommodation: [
      { name: 'STF Gällnö Vandrarhem', type: 'Vandrarhem', desc: 'STF-vandrarhem i gamla skolan med rum och stugor, café och bar sommartid. Öppet året runt.', websiteUrl: 'https://gallno.se' },
      { name: 'Tältplats Torsviken', type: 'Camping', desc: 'Skärgårdsstiftelsens tältplats och naturhamn vid Torsviken.', websiteUrl: 'https://skargardsstiftelsen.se/omraden/gallno-karklo/' },
    ],
    getting_there: [{ method: 'Waxholmsbåt', from: 'Strömkajen', time: 'ca 2 h', desc: 'Waxholmsbolaget eller Strömma/Cinderellabåtarna från Strömkajen eller Strandvägen.', icon: '⛴' }], // KÄLLA: https://gallno.se/ ("tar mellan 1,5–2 timmar ... trafikeras av både Waxholmsbolaget och Strömma/Cinderella-båtarna")
    harbors: [{ name: 'Gällnö brygga', desc: 'Brygga vid Gällnö by, nära krog, café och handelsbod.', fuel: false }], // KÄLLA: https://gallno.se/ (nämner "Gällnö brygga" och "Gällnö by"); namnet "Gällnö Hamn" hittades inte i primärkällor
    restaurants: [
      // KÄLLA: https://gallno.se/gallno-krog/ (namn, meny) och gallno.se/mat-dryck/oppettider (2026: begränsat öppet från 14 maj, fullt öppet 27 juni–9 aug ti–lö 11–22, sö 12–16, må stängt; nedtrappning 11–23 aug). Prisexempel hittades inte i primärkällor och togs bort. Kontrollerad 2026-09-03.
      { name: 'Gällnö krog', type: 'Restaurang & bar', desc: 'Sommaröppen krog med bar och café, medelhavsinspirerad meny.', slug: 'gallno-krog', open_season: 'Mitten av maj–slutet av augusti (fullt öppethållande slutet av juni–början av augusti)', open_hours: 'Tisdag–lördag ca 11–22, söndag 12–16, måndag stängt (kortare tider i maj och augusti)' },
      // KÄLLA: https://gallno.se/handelsboden/ ("omfattande sortiment av kolonialvaror, mejeriprodukter, frysvaror, färsk frukt, kött, fisk, konfektyr och dryck"; "Varje vardag levereras färskt bröd från bageri Vivels i Stockholm") och gallno.se/mat-dryck/oppettider (2026: högsäsong 13 juli–9 aug ti–lö 09–20, sö–må 10–17; kortare tider i maj, juni och augusti). Kontrollerad 2026-09-03.
      { name: 'Gällnö Handelsbod', type: 'Handel', desc: 'Bred handelsbod med livsmedel, kött, fisk och grönsaker. Färskt bröd levereras varje vardag — alltså inte lördag och söndag.', open_season: 'Mitten av maj–slutet av augusti', open_hours: 'Ca 09–20 i högsäsong (juli), kortare tider i maj, juni och augusti' },
    ],
    day_cost: {
      // Inga belopp: varken båtbiljett eller krogens priser gick att belägga mot publicerad prislista (2026-09-14). Siffror borttagna på Toms beslut.
      budget_per_person: 'Beror på båtbiljett och mat — se waxholmsbolaget.se och gallno.se',
      includes: 'Waxholmsbåt t/r från Strömkajen, dryck på krogen, medhavd matsäck',
      breakdown: [
        // KÄLLA: https://waxholmsbolaget.se/ — prislistan renderas med JavaScript och kunde inte hämtas; inget belopp
        { item: 'Waxholmsbåt t/r Strömkajen–Gällnö', price: 'Se waxholmsbolaget.se för aktuellt pris' },
        // KÄLLA: https://gallno.se/gallno-krog/ — verksamheten heter Gällnö krog (bar ingår); ingen publicerad prislista. Kontrollerad 2026-09-03.
        { item: 'Dryck på Gällnö krog', price: 'Se prislista på plats' },
      ],
      // KÄLLA: https://gallno.se/gallno-krog/ och /mat-dryck/oppettider — krogen serverar lagad mat men öppettiderna varierar kraftigt under säsong. Uppgifter om havsörn och ankringsförhållanden hittades inte i primärkällor och togs bort. Kontrollerad 2026-09-03.
      tips: [
        'Kontrollera öppettiderna för Gällnö krog och Handelsboden innan avfärd — de varierar kraftigt under säsongen.',
      ],
    },
    // KÄLLA: https://gallno.se/gallno-krog/ och /handelsboden — krogen serverar lagad mat och Handelsboden har brett sortiment, men öppettiderna varierar under säsong. Uppgifter om ljunghed och havsörn hittades inte i primärkällor och togs bort. Kontrollerad 2026-09-03.
    tips: [
      'Öppettiderna för krogen och Handelsboden varierar under säsongen — kontrollera aktuella tider innan besök.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/gallno.html — föreskrifterna förbjuder att framföra motorbåt i Norrviken samt tältning längre än två dygn på samma plats; hund ska hållas kopplad (2026-09-14)
      'Motorbåt är förbjuden i Norrviken, hunden ska vara kopplad i reservatet och tältet får stå högst två dygn på samma plats.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/gallno-karklo/ — vid Torsviken finns "sandstrand och tältplats" (2026-09-14)
      'Vill du tälta finns anvisad tältplats vid Torsviken, där det också är sandstrand.',
    ],
    related: ['moja', 'svartso', 'ingmarso'],
    tags: ['bilfri', 'naturreservat', 'läger', 'orört'],
    // KÄLLA: Länsstyrelsen Stockholm, naturreservat Gällnö (https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/gallno.html) — kulturpräglat skärgårdslandskap som hävdas genom aktivt jordbruk och bete. Superlativet "bäst bevarade" kunde inte beläggas och togs bort. Kontrollerad 2026-09-03.
    did_you_know: 'Gällnös naturreservat skyddar ett kulturpräglat skärgårdslandskap där ängarna hålls öppna med betande djur.',
    seasonal: {
      // KÄLLA: https://gallno.se/oppettider/ (2026) — begränsat öppet från 14 maj, sista öppna dagar i slutet av augusti. Kontrollerad 2026-09-03.
      open: 'Mitten av maj–slutet av augusti',
      peak: 'Juli',
      best: 'Juli',
      // KÄLLA: https://gallno.se/oppettider/ (2026) — fullt öppethållande (krog, café och handelsbod) 27 juni–9 augusti. Kontrollerad 2026-09-03.
      bestReason: 'Krog, café och handelsbod har fullt öppethållande under högsäsong, med möjlighet att hyra cykel och kajak.',
      // KÄLLA: https://gallno.se/oppettider/ (2026) — öppettider för krog och handelsbod varierar kraftigt utanför högsäsong. Kontrollerad 2026-09-03.
      warning: 'Öppettiderna för krog och handelsbod varierar kraftigt utanför högsäsong — kontrollera aktuella tider innan besök.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },
  },
  // ─── NORRÖRA ─────────────────────────────────────────────────
  {
    slug: 'norrora',
    name: 'Norröra',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌊',
    // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/norrora-och-soderora — "Saltkråkan är framför allt inspelat på Norröra. Där ligger till exempel det bostadshus som i tv-serien kallades Snickargården" (läst 2026-09-27)
    // KÄLLA: https://www.norrora.se/gronomraden/ — "totalt på ön ca 7 km stigar som är röjda" (läst 2026-09-27)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h26.pdf — "STOCKHOLM – VAXHOLM – NORRSUND – RÖDLÖGA", Strömkajen–Norröra (läst 2026-09-27)
    tagline: 'Ön som blev Saltkråkan – Snickargården, sju kilometer stigar och Waxholmsbåt från Strömkajen.',
    // KÄLLA: https://www.norrora.se/saltkrakan/ — "Sommaren 1963 förverkligades Astrid Lindgrens manuskript för TV" (läst 2026-09-27)
    // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/norrora-och-soderora — "Under våren, sommaren och hösten kommer du till Norröra och Söderöra genom att åka från Strömkajen", "så se till att ta med dig picknickkorgen" (läst 2026-09-27). Furusund: https://kund.printhuset-sthlm.se/wa/h28.pdf — "FURUSUND – ÖSTERNÄS – SÖDERÖRA – BROMSKÄR / RÖDLÖGA" (läst 2026-09-27)
    seoTitle: 'Norröra – Saltkråkans ö: båt, Snickargården & stigar',
    seoDescription: 'Norröra är ön där Vi på Saltkråkan spelades in 1963. Så tar du dig dit med Waxholmsbåt från Strömkajen eller Furusund, vad du ser på ön och vad du ska ta med.',
    // OMSKRIVEN 2026-09-21 (topp-30 i GSC). Tidigare text hade en KÄLLA-rad till en förbjuden källa (fritt uppslagsverk), "klippklättring", "Saltkråkans hus och bryggan känns igen direkt" och påståendet att serien är den enda Astrid Lindgren-berättelsen skriven för TV — inget av det belagt. Allt nedan är läst i webbläsare 2026-09-21.
    description: [
      // KÄLLA: Waxholmsbolaget, Norröra och Söderöra, https://waxholmsbolaget.se/reseplanering/resmal/norrora-och-soderora — "ligger i den vackra Svartlögafjärden, precis utanför Furusund"; "Saltkråkan är framför allt inspelat på Norröra. Där ligger till exempel det bostadshus som i tv-serien kallades Snickargården, det hus som farbror Melker först hyrde och sedan köpte"; "Från Norröra kan du även enkelt ta dig över till Söderöra – båtturen tar bara 10 minuter … Framför allt vinterscenerna spelades in på ön" (läst 2026-09-21)
      'Norröra ligger i Svartlögafjärden strax utanför Furusund, och det är här Vi på Saltkråkan framför allt spelades in. På ön står Snickargården – huset som farbror Melker först hyrde och sedan köpte i tv-serien. Grannön Söderöra, tio minuter bort med båt, syns mest i vinterscenerna.',
      // KÄLLA: Norröra samfällighetsförening, Saltkråkan, https://www.norrora.se/saltkrakan/ — "Sommaren 1963 förverkligades Astrid Lindgrens manuskript för TV"; "Det var Artfilms producent Olle Nordemar och regissör Olle Hellbom som fann att Norröra och Söderöra bäst motsvarade idén om Saltkråkan"; ångbåten "hette egentligen 'Valkyrian' och var byggd 1909 och skulle just huggas upp"; filmfolket "bodde på 'Panget', klippte film i 'Stallet'"; "de 6 timmar och 15 minuter som de 13 avsnitten kom att ta i TV"; "fick 7 000 svar"; "Premiären var i januari 1964" (läst 2026-09-21)
      'Sommaren 1963 kom filmteamet ut. Producenten Olle Nordemar och regissören Olle Hellbom hade letat efter en ö som passade Astrid Lindgrens manus, och Norröra och Söderöra blev svaret. Teamet bodde på gården Panget, klippte film i Stallet och tog sig fram med en ångbåt från 1909 som egentligen skulle ha huggits upp. Serien blev tretton avsnitt och hade premiär i januari 1964.',
      // KÄLLA: https://www.norrora.se/historia/ — "Numera finns cirka 130 hushåll på ön sommartid, men endast ett par familjer bor här året runt" (läst 2026-09-27)
      // KÄLLA: https://www.norrora.se/gronomraden/ — "Grönområdena är enligt byggnadsplanen från 1974", "Syftet är också att stränderna ska vara allmänt tillgängliga", "utlagda som parkmark i planen, med ett fåtal undantag", "Norröras vägnät på 4 km grusvägar", "totalt på ön ca 7 km stigar som är röjda" (läst 2026-09-27)
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/norrora-och-soderora — "Det finns varken livsmedelsbutiker eller restauranger på öarna" (läst 2026-09-27)
      'I dag har ön omkring 130 hushåll på sommaren och bara ett par familjer året runt. Enligt byggnadsplanen från 1974 ska stränderna vara allmänt tillgängliga, och de är med några få undantag utlagda som parkmark. Samfälligheten har röjt ungefär sju kilometer stigar utöver fyra kilometer grusväg. Det finns ingen affär och ingen restaurang – ta med matsäcken.',
    ],

    facts: {
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h26.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026": Strömkajen 08.45 → Norröra 12.15 (3 h 30 min), söndag 10.00 → 13.10 (3 h 10 min) (läst 2026-09-27)
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/s26.pdf — "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026": Strömkajen 09.00 → Norröra 12.10 (3 h 10 min), 17.15 → 20.50 (3 h 35 min) (läst 2026-09-27)
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "FURUSUND – ÖSTERNÄS – SÖDERÖRA – BROMSKÄR / RÖDLÖGA": Furusund 07.50 → Norröra 08.30, 10.05 → 10.45, 15.40 → 16.20 (40 min) (läst 2026-09-27)
      travel_time: 'ca 3 h 10–3 h 35 min med Waxholmsbåt från Strömkajen · ca 40 min från Furusund',
      // KÄLLA: norrora.se/saltkrakan, norrora.se/gronomraden och Waxholmsbolagets resmålssida (se description): inspelningsö, 4 km grusväg och ca 7 km stigar, varken butik eller restaurang
      character: 'Saltkråkans inspelningsö, stigar och grusvägar, ingen service',
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/norrora-och-soderora — "Under vintern och början av våren behöver du åka från Köpmanholm på Yxlan för att ta dig till Norröra eller Söderöra" (läst 2026-09-27); tabell 26 gäller till 1 november 2026 (se ovan)
      season: 'Båt från Strömkajen april–1 november, vintertid från Köpmanholm',
      // UPPSKATTNING: målgrupp bedömd utifrån Saltkråkan-kopplingen och att ön saknar affär och restaurang
      best_for: 'Saltkråkan-fans, barnfamiljer, dagstur med matsäck',
    },
    facts_provenance: { travel_time: 'matt', character: 'matt', season: 'bedomning', best_for: 'bedomning' },
    activities: [
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/norrora-och-soderora — "det bostadshus som i tv-serien kallades Snickargården, det hus som farbror Melker först hyrde och sedan köpte" (läst 2026-09-27)
      // KÄLLA: https://www.norrora.se/saltkrakan/ — "bodde på “Panget”, klippte film i “Stallet”" (läst 2026-09-27)
      { icon: '📚', name: 'Saltkråkans Norröra', desc: 'Snickargården – Melkerssons hus i serien – står på Norröra och är ett bostadshus, så titta från vägen. Filmteamet bodde på gården Panget och klippte film i Stallet sommaren 1963.' },
      // KÄLLA: norrora.se/gronomraden — "ca 7 km stigar som är röjda och iordningjorda med god framkomlighet (för gående, ej rullstolar eller barnvagnar)"; röjda 2020–2021 efter stormen Alfrida (läst 2026-09-21)
      { icon: '🚶', name: 'Stigarna', desc: 'Omkring sju kilometer röjda stigar och fyra kilometer grusväg. Stigarna fungerar för gående men inte för barnvagn eller rullstol.' },
      // KÄLLA: https://www.norrora.se/kapellet/ — "tidigare ägaren Blidö missionsförsamling", "Överlåtelsen fullbordades våren 2009", "Det drygt 100-åriga Kapellet", "efter kontakt med Stockholms läns museum under 2011 fått byggnadsvårdsmässiga råd", "Under våren och sommaren 2012 restaurerades de gamla fönstren", "Under 2014 målades östra sidan samt entrén om" (läst 2026-09-27)
      { icon: '⛪', name: 'Kapellet', desc: 'Det drygt hundra år gamla kapellet köptes av öborna från Blidö missionsförsamling 2009 och restaurerades 2012–2014 med råd från Stockholms läns museum.' },
      // KÄLLA: Waxholmsbolaget — "Från Norröra kan du även enkelt ta dig över till Söderöra – båtturen tar bara 10 minuter"; h26/h28: Norröra 12.15 → Söderöra 12.25 (läst 2026-09-21)
      { icon: '⛴', name: 'Söderöra', desc: 'Grannön, tio minuter bort med samma båt. Här spelades framför allt vinterscenerna in.' },
    ],
    accommodation: [],
    getting_there: [
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h26.pdf — "26A STOCKHOLM – VAXHOLM – NORRSUND – RÖDLÖGA", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026", "Går under perioderna 8 maj - 18 juni och 17", "Går under perioden 17 augusti - 30 augusti". Måndag–torsdag går turerna 2601 (8 maj–18 juni) och 2611 (17–30 augusti), fredag 2621 och 2623, lördag 08.45 → Norröra 12.15, söndag 10.00 → 13.10 (läst 2026-09-27)
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/s26.pdf — "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026": två turer om dagen, t.ex. måndag–torsdag 09.00 → 12.10 och 17.15 → 20.50 (läst 2026-09-27)
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/norrora-och-soderora — "Under vintern och början av våren behöver du åka från Köpmanholm på Yxlan" (läst 2026-09-27)
      { method: 'Waxholmsbolaget linje 26', from: 'Strömkajen via Vaxholm', time: 'ca 3 h 10–3 h 35 min', desc: 'Linje 26 Stockholm–Vaxholm–Norrsund–Rödlöga angör Norröra och Söderöra. Sommartid, 19 juni–16 augusti, går två turer om dagen. Vår och höst (2 april–18 juni och 17 augusti–1 november) går båten fredag till söndag; måndag–torsdag bara 8 maj–18 juni och 17–30 augusti. Vintertid åker du i stället från Köpmanholm.', icon: '⛴' },
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "FURUSUND – ÖSTERNÄS – SÖDERÖRA – BROMSKÄR / RÖDLÖGA", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 30 SEPTEMBER 2026", "Beställ resan i SL-appen"; Furusund 07.50 → Köpmanholm 07.52 → Norröra 08.30, 10.05 → 10.45b (läst 2026-09-27). https://kund.printhuset-sthlm.se/wa/v28.pdf — "17 AUGUSTI 2026 – 12 DECEMBER 2026", samma tider Furusund–Norröra (läst 2026-09-27)
      // KÄLLA: https://kund.printhuset-sthlm.se/sl/h632.pdf — "Norrtälje–Yxlan", "Furusunds färjeläge", "Köpmanholm" (läst 2026-09-27)
      { method: 'Waxholmsbolaget linje 28', from: 'Furusund eller Köpmanholm (Yxlan)', time: 'ca 40 min', desc: 'Kortaste vägen: linje 28 från Furusund och Köpmanholm. Vissa turer och bryggor är beställningstrafik – boka i SL-appen. Till Furusund och Köpmanholm går SL-buss 632 från Norrtälje.', icon: '⛴' },
    ],
    transport_meta: {
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h26.pdf — söndag Strömkajen 10.00 → Norröra 13.10; https://kund.printhuset-sthlm.se/wa/s26.pdf — 09.00 → 12.10 (3 h 10 min, snabbaste tur) (läst 2026-09-27)
      from_city_min: 190,
      nearest_hub: 'Furusund',
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — Furusund 07.50 → Norröra 08.30, 10.05 → 10.45 (40 min) (läst 2026-09-27)
      from_nearest_hub_min: 40,
      operator: 'Waxholmsbolaget',
      line: '26 / 28',
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/s26.pdf — två avgångar om dagen från Strömkajen 19 juni–16 augusti; https://kund.printhuset-sthlm.se/wa/h26.pdf — vår och höst lördag 08.45, söndag 10.00, fredag 08.45 och (till 13 september) 16.30, måndag–torsdag bara 8 maj–18 juni och 17–30 augusti (läst 2026-09-27). https://waxholmsbolaget.se/reseplanering/resmal/norrora-och-soderora skriver "det går ofta två turer om dagen", vilket bara stämmer med sommartabellen.
      frequency: 'Två turer om dagen från Strömkajen sommartid, vår och höst i regel en tur om dagen fredag–söndag',
    },
    harbors: [
      // KÄLLA: https://www.norrora.se/gronomraden/ — "Föreningen byggde ny ångbåtsbrygga 1987-88", "Den lilla gästbryggan i trä byggdes först 1997", "de soptunnor och den torrtoalett som finns där för turister och gästande båtar" (läst 2026-09-27). El, vatten och bränsle nämns inte.
      { name: 'Norröra ångbåtsbrygga', desc: 'Waxholmsbolagets brygga med en liten gästbrygga i trä bredvid. Torrtoalett och soptunnor för besökare och gästande båtar. El, vatten och bränsle nämns inte – räkna inte med det.', fuel: false },
    ],
    // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/norrora-och-soderora ("Det finns varken livsmedelsbutiker eller restauranger på öarna, så se till att ta med dig picknickkorgen...")
    restaurants: [],
    tips: [
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/norrora-och-soderora — "Det finns varken livsmedelsbutiker eller restauranger på öarna", "Du ser om fartyget har en kafeteria när du söker fram din resa i tidtabellen eller i reseplaneraren" (läst 2026-09-27)
      'Ta med mat och dryck – det finns varken affär eller restaurang på Norröra eller Söderöra. Kolla i reseplaneraren om båten har kafeteria ombord.',
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h26.pdf och https://kund.printhuset-sthlm.se/wa/s26.pdf — Strömkajen–Norröra 3 h 10 min–3 h 35 min; https://kund.printhuset-sthlm.se/wa/h28.pdf — Furusund–Norröra 40 min (läst 2026-09-27)
      'Från Strömkajen tar båten över tre timmar enkel väg. Med bil kan du i stället köra till Furusund och ta linje 28 – ungefär 40 minuter över.',
      // KÄLLA: https://www.norrora.se/regler/ — "Hundar ska vara kopplade vilket gäller alla öar utan vägförbindelse" (läst 2026-09-27)
      'Hund ska vara kopplad på ön, enligt samfällighetens regler.',
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/norrora-och-soderora — "det bostadshus som i tv-serien kallades Snickargården" (läst 2026-09-27)
      'Snickargården är ett bostadshus – titta från vägen.',
    ],
    related: ['yxlan', 'furusund', 'blido'],
    tags: ['familj', 'Saltkråkan', 'norra', 'lugnt', 'stigar'],
    // KÄLLA: https://www.norrora.se/saltkrakan/ — "Den hette egentligen “Valkyrian” och var byggd 1909 och skulle just huggas upp, men fick leva en extra härlig sommar tack vare inspelningsarbetet" (läst 2026-09-27)
    did_you_know: 'Ångbåten Saltkråkan i serien hette egentligen Valkyrian. Den byggdes 1909 och skulle just huggas upp, men fick en extra sommar tack vare inspelningen 1963.',
    amenities: { restaurant: false, shop: false, accommodation: false, toilets: true },
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/s26.pdf — "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026", två turer om dagen; https://kund.printhuset-sthlm.se/wa/h26.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026"; https://waxholmsbolaget.se/reseplanering/resmal/norrora-och-soderora — "Under vintern och början av våren behöver du åka från Köpmanholm på Yxlan" (läst 2026-09-27)
    // UPPSKATTNING: månadsraden är en bedömning utifrån tidtabellerna (tätast trafik 19 juni–16 augusti).
    seasonal: {
      open: 'Båt året runt – från Strömkajen 2 april–1 november, vintertid från Köpmanholm',
      peak: '19 juni–16 augusti',
      best: 'Vår till höst',
      bestReason: 'Linje 26 från Strömkajen går 2 april–1 november och har två turer om dagen 19 juni–16 augusti. Vintertid åker du från Köpmanholm på Yxlan.',
      warning: 'Ingen affär eller restaurang på ön. Vintertid går båten bara från Köpmanholm på Yxlan.',
      months: ['limited','limited','limited','limited','open','open','peak','open','open','limited','limited','limited'],
    },

  },
  // ─── NÅTTARÖ ─────────────────────────────────────────────────
  {
    slug: 'nattaro',
    name: 'Nåttarö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🪨',
    tagline: 'Naturreservat i södra skärgården — klippor, sandstränder och lugn.',
    description: [
      // KÄLLA: Länsstyrelsen Stockholm, https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Skyddat sedan: 2008"; "Förvaltare: Skärgårdsstiftelsen"; "Nåttarö är också ett av länets första marina naturreservat, med grunda vikar och en artrik undervattensvegetation" (läst 2026-09-19)
      // KÄLLA: Länsstyrelsen Stockholm, https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Skyddat sedan: 2008"; "Förvaltare: Skärgårdsstiftelsen"; "Nåttarö är också ett av länets första marina naturreservat, med grunda vikar och en artrik undervattensvegetation" (läst 2026-09-19) ; Skärgårdsstiftelsen, https://skargardsstiftelsen.se/omraden/nattaro/ — "Nåttarö är ett av länets första marina naturreservat" (läst 2026-09-19)
      'Nåttarö är ett naturreservat i Haninges del av södra skärgården. Reservatet bildades 2008, förvaltas av Skärgårdsstiftelsen och är ett av länets första marina naturreservat — skyddet omfattar alltså även vattnet runt ön.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Reguljär båttrafik till Nåttarö med Waxholmsbolaget från Nynäshamn."
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/nattaro/ — "endast en halvtimmes båtresa från Nynäshamn"
      'Nåttarö nås med Waxholmsbolagets båtar från Nynäshamn, en resa på ungefär en halvtimme. Egen båt fungerar också — det finns gästhamn och flera naturhamnar runt ön.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Storsand i öster är en av skärgårdens längsta sandstränder med stora sanddyner."
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/nattaro/ — "Det finns gott om barnvänliga, långgrunda sandstränder. Mest känd är Stora sand, men den mer avskilda Skarsand är minst lika vacker."
      'Storsand på öns östra sida är en av skärgårdens längsta sandstränder, med stora sanddyner bakom. Stranden är långgrund och barnvänlig. Den mer avskilda Skarsand är ett alternativ när Storsand fylls, och runt ön finns både sand och klippor att bada från.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "gamla tall- och blandskogar med små mossar och kärr" / "Förutom gäss och måsfåglar finns här gravand, snatterand, bergand och svärta."
      'Innanför stränderna tar gamla tall- och blandskogar vid, med små mossar och kärr insprängda. Fågellivet omfattar bland annat gravand, snatterand, bergand och svärta utöver gäss och måsfåglar. Ta med kikare.',
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/nattaro/ — "På ön ligger Drottninggrottan, där drottning Maria Eleonora gömde sig" / "Runt berget finns ryssugnar från härjningarna 1719" / "På ön strövar även dovhjortar vilt."
      'Ön bär spår av sin historia. Drottninggrottan är enligt traditionen platsen där drottning Maria Eleonora gömde sig i väntan på att fly landet, och runt Bötsudden, öns högsta punkt, finns ryssugnar från härjningarna 1719. Dovhjortar strövar fritt på ön.',
      // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/nattaro/ — "Här finns vandrarhem, stugor, restaurang, tältplats och en handelsbod." / "du kan snorkla längs länets första snorkelled"
      // KÄLLA: https://nattaro.se/ — "En trerätters på Krogen" / "pizza på Sixtens bodega"
      'Servicen är sammanhållen och säsongsbetonad: vandrarhem, stugor, tältplats, handelsbod samt Nåttarö Krog och Sixtens Bodega. För den som vill se ön underifrån finns länets första snorkelled.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — förbud mot att "tälta mer än två dygn i följd annat än på anvisad plats" och att "medföra hund som inte är kopplad"
      'Reservatsföreskrifterna är få men bindande: tältning högst två dygn i följd utanför anvisad plats, och hundar ska hållas kopplade inom hela reservatet.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Skyddat sedan: 2008 Storlek: 6565 hektar varav land: 609 ... Övrigt: Natura 2000-område SE0110201 Södra Nåttarö"
      'Reservatet är mycket större än ön. Av de 6 565 hektaren är bara 609 hektar land — resten är vatten, vilket är hela poängen med ett marint reservat. Södra delen ingår dessutom i Natura 2000-området Södra Nåttarö.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "I våtmarkerna växer typiska arter som skvattram, hjortron och tuvull, men också mer ovanliga växter som spindelblomster, ögonpyrola och repestarr."
      'I våtmarkerna innanför stränderna växer skvattram, hjortron och tuvull, men också betydligt ovanligare arter: spindelblomster, ögonpyrola och repestarr. Det är växter man går förbi utan att se om man inte vet vad man letar efter.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Nåttaröfladen har med sina många små kobbar och skär ett rikt fågelliv ... För att skydda fågellivet råder tillträdesförbud mellan 1 februari och 15 augusti." / föreskrifterna räknar upp bland annat Östra Rödko, Långholmen, Grönborgen, Båten, Vittskär, Gjusskär, Brandholmen, Björkskär, Boskär, Rönnkobben, Tärnkobben och Grenkullen
      'Nåttaröfladen norr om ön är full av små kobbar och skär, och där gäller tillträdesförbud 1 februari–15 augusti. Sjutton namngivna öar och skär är avlysta, och förbudet sträcker sig 100 meter ut i vattnet runt dem — det räcker alltså inte att låta bli att gå i land. Bodskär och Österskär har ett eget förbud 1 april–31 juli.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Invid ångbåtsbryggan finns en snorkelled som markeras på vattenytan av gula bojor, under ytan befinns skyltar som berättar om livet i vattnet."
      'Snorkelleden ligger invid ångbåtsbryggan och märks ut på ytan av gula bojor. Under vattnet står skyltar som berättar om livet där nere, så leden fungerar lika mycket som en utställning som ett bad.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Östermarsfladen i norr är mycket populär bland båtfolk ... Torrdass finns bland annat vid Östermarsfladen och Storsand. Anpassat torrdass finns nära ångbåtsbryggan."
      // KÄLLA: https://skargardsstiftelsen.se/omraden/nattaro/ — "i den populära naturhamnen Östermarsfladen finns våra populära förtöjningsbojar som är fria för alla att använda"
      'Östermarsfladen i norr är öns mest omtyckta naturhamn. Skärgårdsstiftelsen har lagt ut förtöjningsbojar där som är fria att använda. Torrdass finns bland annat vid Östermarsfladen och Storsand, och ett anpassat torrdass nära ångbåtsbryggan.',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-nattaro/ — "Etapp Nåttarö ... Utmanande ... 9.5 km"; "Det tekniska partiet som är svårt, framförallt på regnvåta klippor är längs hela östra kusten."; "Skogsvägen till och från östra kusten kan alla gå."
      'Stockholm Archipelago Trails Nåttarö-etapp är 9,5 kilometer och klassas som utmanande. Det svåra partiet ligger längs hela östkusten, där stigen går på klippor, klapper och rötter och blir riktigt halt i regn. Tvärgående skogsvägar i öst–västlig riktning gör det lätt att korta av — de kan alla gå.',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-nattaro/ — "Nåttarö är en kuperad ö med skog, klappersten, klippor och magiska sandstränder. Ön finns omnämnd redan på 1200-talet och gården vid Östermar härstammar sen 1600-talet. Runt den nordvästra udden finner du Ryssugnar från tidigt 1700-tal."
      'Ön finns omnämnd redan på 1200-talet, och gården vid Östermar går tillbaka till 1600-talet. Nåttarö är kuperat på ett sätt man inte väntar sig av en sandstrandsö — skog, klappersten och klippor avlöser varandra hela vägen runt.',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-nattaro/ — "Är du äventyrlig och stark kan du ta dig längs grusvägen norrut (1,5 km) förbi Drottninggrottan till Nåttarö Storsand. En fin plats att upptäcka och där det är långgrunt." / "Vid Ångbåtsbryggan möter du skärgårdsidyllen direkt. Vid kajkanten är det en fin badstrand."
      'Från ångbåtsbryggan är det omkring 1,5 kilometer på grusväg norrut förbi Drottninggrottan till Storsand — sträckan är framkomlig även med barnvagn eller för den som har begränsad rörlighet. Vid kajkanten finns dessutom en badstrand direkt när man kliver i land.',
      // KÄLLA: https://skargardsstiftelsen.se/omraden/nattaro/ — "Nåttarö ligger i Stockholms södra skärgård mellan Utö och Landsort." / "Nåttarö är också en perfekt plats för höstsurfing."
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-nattaro/ — "Innan midsommar och efter mitten av augusti får du mer eller mindre en hel ö för dig själv."
      'Nåttarö ligger mellan Utö och Landsort. Före midsommar och efter mitten av augusti är ön i stort sett tom, och Skärgårdsstiftelsen framhåller den som en plats för höstsurfing — det öppna läget mot Östersjön ger vågor som resten av skärgården sällan har.',
    ],

    facts: {
      // KÄLLA: https://nattaro.se/ (startsida: "30 minutes by boat from Nynäshamn")
      travel_time: '~30 min med turbåt från Nynäshamn (under säsong)',
      character: 'Vilt, naturreservat, orört',
      // KÄLLA: https://nattaro.se/boende/praktisk-information-om-vistelsen-pa-nattaro/ (praktisk information) (säsong ungefär slutet av april–slutet av september)
      season: 'Slutet av april–slutet av september',
      best_for: 'Seglare, naturupplevelse, dagsutflykt med båt',
    },
    activities: [
      { icon: '🚶', name: 'Vandring', desc: 'Vandringsstigar i naturreservat.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Rent vatten och fina klippor.' },
    ],
    // KÄLLA: https://nattaro.se/boende/vandrarhemmet/ (fyra hus, 32 bäddar); https://nattaro.se/ (stugor, bokning via hemsidan); nattaro.se/gasthamn (gästhamn Kvarnviken)
    // KÄLLA: https://nattaro.se/boende/ — vandrarhemmet fyra hus (Röda Villan, Annexet, Västan, Östan) 32 bäddar, ca 50 stugor, dygnscamping på anvisad plats; skargardsstiftelsen.se/omraden/nattaro (läst 2026-09-14)
    accommodation: [
      { name: 'Nåttarö Vandrarhem', type: 'Vandrarhem', desc: 'Fyra hus — Röda Villan, Annexet, Västan och Östan — med sammanlagt 32 bäddar.', websiteUrl: 'https://nattaro.se/boende/vandrarhemmet/' },
      { name: 'Stugor på Nåttarö', type: 'Stugor', desc: 'Ett femtiotal uthyrningsstugor på ön, bokas via nattaro.se.', websiteUrl: 'https://nattaro.se/boende/' },
      { name: 'Camping', type: 'Camping', desc: 'Dygnscamping och tältning på anvisad plats.', websiteUrl: 'https://nattaro.se/boende/' },
    ],
    getting_there: [
      // KÄLLA: https://nattaro.se/ ("turbåten från Nynäshamn"); exakt linjenamn och trafikperiod kunde inte beläggas hos Waxholmsbolaget (tidtabellen kräver JavaScript och gick inte att hämta)
      { method: 'Turbåt (Waxholmsbolaget)', from: 'Nynäshamn', time: '~30 min', desc: 'Trafikerar under säsong. Kontrollera aktuell tidtabell på waxholmsbolaget.se.', icon: '⛴' },
      { method: 'Egen båt', from: 'Utö/Dalarö', time: 'Varierar', desc: 'Ankringsmöjligheter i flera skyddade vikar.', icon: '⛵' },
    ],
    // KÄLLA: https://nattaro.se/gasthamn/ (Nåttarö gästhamn, Kvarnviken: 45 platser vid flytbrygga, el 230V, toaletter/dusch, bastu)
    harbors: [{ name: 'Nåttarö gästhamn (Kvarnviken)', desc: '45 båtplatser vid flytbrygga, el (230V), toaletter och dusch, bastu mot avgift.', fuel: false }],
    restaurants: [
      // KÄLLA: https://nattaro.se/ (mat på ön: "Vi tar inte bordsbokningar"; krogen har haft öppna helger även i september — dvs. längre säsong än juni–mitten av augusti). Priser och exakta öppettider kunde inte beläggas.
      { name: 'Nåttarö Krog', type: 'Restaurang', desc: 'Restaurang vid ångbåtsbryggan och gästhamnen. Öppettider varierar under säsongen.', open_season: 'Del av sommarsäsongen, kontrollera aktuella tider på nattaro.se', book_required: false },
    ],
    day_cost: {
      // Inga belopp: varken resa eller krog har belagt pris (se raderna nedan). Siffror borttagna på Toms beslut 2026-09-14.
      budget_per_person: 'Beror på tåg/buss, båtbiljett och mat — inga belagda priser',
      // KÄLLA: https://nattaro.se/ ("turbåten från Nynäshamn"); exakt biljettpris kunde inte beläggas
      includes: 'Turbåt + ev. buss från Nynäshamn, lunch på krogen, medhavd picknick',
      breakdown: [
        // KÄLLA: exakt pris kunde inte beläggas efter sökning (SL:s taxa varierar med zon/biljettyp)
        { item: 'Pendeltåg till Nynäshamn + ev. buss', price: 'Enligt SL:s aktuella taxa' },
        // KÄLLA: båtnamn och pris kunde inte beläggas hos Waxholmsbolaget (tidtabell/prislista renderas med JavaScript och gick inte att hämta)
        { item: 'Turbåt Nynäshamn–Nåttarö t/r', price: 'Enligt Waxholmsbolagets aktuella taxa' },
        // KÄLLA: pris kunde inte beläggas på https://nattaro.se/
        { item: 'Lunch Nåttarö Krog', price: 'Se aktuell meny på plats' },
      ],
      tips: [
        'Nåttarö är ett naturreservat — ta med allt du behöver, krogen är enda matplatsen.',
        // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Storsand i öster är en av skärgårdens längsta sandstränder"
        'Storsand ligger på öns östra sida — planera promenaden från bryggan därefter.',
        'Kontrollera Waxholmsbolagets tidtabell före resan — trafiken varierar med säsong.',
      ],
    },
    tips: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Reguljär båttrafik till Nåttarö med Waxholmsbolaget från Nynäshamn."
      'Nåttarö nås med Waxholmsbolagets båtar från Nynäshamn — kontrollera tidtabellen på waxholmsbolaget.se före resan.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Storsand i öster är en av skärgårdens längsta sandstränder med stora sanddyner."
      'Storsand ligger på öns östra sida, inte i söder — planera promenaden från bryggan därefter.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — förbud mot att "medföra hund som inte är kopplad"
      'Hund ska vara kopplad i hela naturreservatet.',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-nattaro/ — "I Östermarviken, vid Skarsand, vid Nåttarö storsand och i Vänsviken finns grillplatser. Var uppmärksam på eldningsförbud då hela ön är tallskog och att det inte finns brandkår."
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — förbud mot att "elda annat än på anvisad plats"
      'Grillplatser finns i Östermarviken, vid Skarsand, vid Storsand och i Vänsviken. Eld är förbjuden utanför anvisad plats — hela ön är tallskog och det finns ingen brandkår.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — förbud mot att "under längre tid än två dygn i följd förankra båt vid annan plats än brygga eller båthamn"
      'Med egen båt: ankring på samma ställe utanför brygga eller båthamn är tillåten högst två dygn i följd.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — förbud mot att "under tiden 1 februari–15 augusti landstiga på följande öar i Nåttaröfladen ... eller befara vattenområdet inom 100 meter från ovannämnda öar"
      'Paddlar du i Nåttaröfladen mellan 1 februari och 15 augusti: håll 100 meter från fågelskären. Förbudet gäller vattnet, inte bara land.',
    ],
    activity_meta: {
      // KÄLLA: Stockholm Archipelago Trail, https://stockholmarchipelagotrail.com/section/ (2026-09-17)
      vandring: { trails: 1, max_km: 9.5, sat: { km: 9.5, difficulty: 'Krävande' } },
    },
    related: ['uto', 'orno', 'landsort'],
    tags: ['naturreservat', 'orört', 'segling', 'södra'],
    // KÄLLA: Länsstyrelsen Stockholm, naturreservat Nåttarö (https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html) (areal 6 565 ha totalt, varav 609 ha land; Natura 2000-område)
    // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/nattaro/ — "På ön ligger Drottninggrottan, där drottning Maria Eleonora gömde sig i väntan på att fly landet."
    // KÄLLA: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/nattaro/ — "du kan snorkla längs länets första snorkelled och uppleva skärgårdens undervattensmiljö"
    did_you_know: 'Drottninggrottan på Nåttarö ska ha varit gömställe för drottning Maria Eleonora inför hennes flykt ur landet. Nåttarö har länets första snorkelled.',
    insiderTips: [
      'Nåttarö är ett naturreservat utan fastboende. Ön nås med säsongsbetonad båttrafik eller egen båt.',
      // KÄLLA: https://nattaro.se/ (stugor, vandrarhem, krog, gästhamn, expedition — etablerad besöksverksamhet på ön)
      'Ön saknar fast bosättning, men har en etablerad säsongsverksamhet med stugor, vandrarhem, krog och gästhamn.',
      'Det finns sandstränder på Nåttarö, vilket är ovanligt i den yttre skärgårdens annars klippdominerade landskap.',
    ],
    seasonal: {
      // KÄLLA: https://nattaro.se/boende/praktisk-information-om-vistelsen-pa-nattaro/ (praktisk information) (säsong ungefär slutet av april–slutet av september)
      open: 'Slutet av april–slutet av september',
      peak: 'Juli–Mitten av Augusti',
      best: 'Juli',
      bestReason: 'Sandstranden är fin i juli. Kombinera med ankring eller gästhamn och en morgonvandring i naturreservatet.',
      // KÄLLA: https://nattaro.se/ (mat på ön: krog och pizzeria med säsongsbegränsade öppettider; turbåt från Nynäshamn — exakt trafikperiod ej bekräftad hos Waxholmsbolaget)
      warning: 'Båttrafik och krogens öppettider varierar under säsongen — kontrollera aktuell tidtabell på waxholmsbolaget.se och nattaro.se. Matutbudet på ön är begränsat, ta med matsäck som komplement.',
      months: ['off','off','off','off','off','open','peak','open','limited','off','off','off'],
    },
  },
  // ─── INGMARSÖ ────────────────────────────────────────────────
  {
    slug: 'ingmarso',
    name: 'Ingmarsö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌲',
    tagline: 'Ö i mellersta skärgården — två bryggor, affär året runt och roddbåtsleden mot Finnhamn.',
    description: [
      // KÄLLA: https://www.ingmarso.se/ — "runt 180 bofasta"; "Coop Ingmarsö" med "året runt-öppet" ligger "vid södra bryggan"; gästhamnen är "Centralt belägen på Södra Ingmarsö" med "gångavstånd till krog, affär och bageri"
      'Ingmarsö är en levande ö i Stockholms mellersta skärgård med runt 180 bofasta. Waxholmsbåtarna lägger till vid två bryggor, norra och södra. Vid södra bryggan ligger Coop Ingmarsö, som har öppet året runt, och gästhamnen på Södra Ingmarsö ligger inom gångavstånd från krog, affär och bageri.',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/roddbatar-finnhamn-ingmarso/ — sträckan anges som "Lätt 0.4 km"; "Det måste alltid finnas en roddbåt på varje sida."
      'Mellan Ingmarsö och Finnhamn finns en roddbåtspassage som ingår i Stockholm Archipelago Trail. Sundet är bara omkring 400 meter, men överfarten har sin egen ritual: det måste alltid finnas en roddbåt kvar på varje sida, så den som ror över får ro fram och tillbaka flera gånger innan vandringen kan fortsätta.',
      // KÄLLA: https://www.ingmarso.se/hittahit — "Båt hela vägen från stan tar mellan två och cirka tre timmar"; "Du till vissa turer ta SL-buss 438 från Slussen i Stockholm och stiga på båten i Boda"; "Till bryggan på norra Ingmarsö går reguljära turer från Åsättra på Ljusterö"
      'Båt hela vägen från stan tar mellan två och cirka tre timmar. Det går snabbare att ta SL-buss 438 från Slussen och kliva på båten i Boda, och till norra bryggan går reguljära turer från Åsättra på Ljusterö.',
      // KÄLLA: https://www.ingmarso.se/ — "Här finns jordbruk, industri, affär, krog och gästhamn.", "ett område som klassats som riksintresse för kulturmiljövården" (läst 2026-09-27)
      // KÄLLA: https://www.ingmarso.se/kultur — "Den bofasta befolkningen på Ingmarsö har pendlat mellan 90-220 personer sedan 1800-talets slut." (läst 2026-09-27)
      'Här finns jordbruk, industri, affär, krog och gästhamn, och sedan 1800-talets slut har den bofasta befolkningen pendlat mellan 90 och 220 personer. Ingmarsö och Brottö ingår i ett område som klassats som riksintresse för kulturmiljövården.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/kalgardson.html — reservatet utgörs till största delen av Kålgårdsön, "den östligaste delen av Ingmarsö", jämte Bockholmen i söder och ytterligare några öar i Österåkers kommun; bildat 1974; 103 hektar varav 100 hektar land; Skärgårdsstiftelsen är både markägare och förvaltare; "Ändamålet med reservatet är att säkra ett område av stort värde för allmänhetens rörliga friluftsliv" (2026-09-14)
      'Ingmarsös östligaste del, Kålgårdsön, är naturreservat sedan 1974. Tillsammans med Bockholmen i söder och några mindre öar omfattar reservatet 103 hektar, varav nästan allt — 100 hektar — är land. Skärgårdsstiftelsen är både markägare och förvaltare, och ändamålet anges som att säkra ett område av stort värde för allmänhetens rörliga friluftsliv.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/kalgardson.html — naturtyper "skärgård, ängs- och betesmark, barrskog"; norra delen präglas av "hällmarkstallskog, omväxlande med lövskog och buskmarker"; föreskrifterna förbjuder lös hund, tältning utanför anvisad plats och störande ljudanläggningar (2026-09-14)
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/kalgardson.html — "tälta annat än på eventuellt anvisade platser", "medföra hund som ej är kopplad", "på ett för andra störande sätt utnyttja radioapparat, grammofon, bandspelare eller dylikt" (läst 2026-09-27)
      'Naturtyperna anges som skärgård, ängs- och betesmark och barrskog, och den norra delen präglas av hällmarkstallskog omväxlande med lövskog och buskmarker. Reglerna är strikta på en punkt som överraskar många: tältning är bara tillåten på anvisad plats. Hunden ska vara kopplad, och det är förbjudet att spela radio eller musik på ett sätt som stör andra.',
      // KÄLLA: https://www.ingmarso.se/kultur — arkeologer har funnit spår från vikingatiden på Brottö; en jordebok från 1539 dokumenterar fyra gårdar på ön; Norrgården omnämns redan på 1640-talets lantmäterikartor (2026-09-14)
      'Bosättningen går långt tillbaka. Arkeologer har funnit vikingatida spår på Brottö, en jordebok från 1539 redovisar fyra gårdar på ön, och Norrgården finns utsatt redan på lantmäteriets kartor från 1640-talet. Det är inte en sommarö som fått bofasta utan en bondebygd som fått sommargäster.',
      // KÄLLA: https://www.ingmarso.se/kultur — missionshuset uppfördes 1904 och förvaltas av Ingmarsö frikyrkoförsamling; vid slutet av 1800-talet fanns ett tegelbruk på Brottö som "skeppade tegel in till byggena i stan" (2026-09-14)
      'Missionshuset byggdes 1904 och förvaltas av Ingmarsö frikyrkoförsamling. I slutet av 1800-talet fanns dessutom ett tegelbruk på Brottö, som skeppade tegel in till byggena i stan — en påminnelse om att öarna en gång var leverantörer till huvudstaden, inte utflyktsmål.',
      // KÄLLA: https://www.ingmarso.se/kultur — Ingmarsö Brottö Hembygdsmuseum presenterar en tidslinje från vikingatiden till nutid, inklusive skola, missionshus, jordgubbsodlingar och pensionat; jordbrukslandskapet präglas av "små, flikiga betesmarkerna och vallarna" (2026-09-14)
      'På Ingmarsö Brottö Hembygdsmuseum löper en tidslinje från vikingatid till nutid, med skolan, missionshuset, jordgubbsodlingarna och pensionaten som hållpunkter. Utanför museet fortsätter samma historia i landskapet: de små, flikiga betesmarkerna och vallarna som fortfarande hålls öppna.',
      // KÄLLA: https://www.ingmarso.se/vi-p%C3%A5-%C3%B6n — "Ingmarsö skytteförening bildades år 1890 och är därmed en av öns äldsta föreningar"; bygdegården Lurkan är samfällighet sedan 1961; vägföreningen grundades 1977; Norrgårdsstiftelsen bildades 2006 och förvaltar kulturmiljöer (2026-09-14)
      'Föreningslivet är öns infrastruktur. Skytteföreningen bildades 1890 och är en av de äldsta, Lurkan har varit öns bygdegård sedan 1961, vägföreningen grundades 1977 och Norrgårdsstiftelsen, som förvaltar kulturmiljöer, tillkom 2006. Ett byalag håller ihop de allmänna frågorna.',
      // KÄLLA: https://www.ingmarso.se/vi-p%C3%A5-%C3%B6n — "Ingmarsö har ett väl fungerande räddningsvärn med 9 frivilliga brandmän"; skolverksamhet har bedrivits på ön i över hundra år, skolan är för närvarande inte i full drift medan förskolan tar omkring fem barn och äldre elever går på Svartsö och Ljusterö (2026-09-14)
      'Ön har ett räddningsvärn med nio frivilliga brandmän — när något händer är det grannarna som kommer. Skolverksamhet har bedrivits här i över hundra år, men skolan är för närvarande inte i full drift: förskolan tar omkring fem barn och de äldre eleverna reser till Svartsö och Ljusterö.',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-ingmarso/ — etappen anges som "Medel 9.8 km" och förbinder bryggorna Ingmarsö Norra och Ingmarsö Södra via stigar och grusvägar, genom öppna ängar och skog och förbi flera insjöar samt Femsundsbadet; delar av leden beskrivs som tekniska och rekommenderas inte för den med begränsad rörlighet (2026-09-14)
      'Ingmarsöetappen på Stockholm Archipelago Trail är 9,8 kilometer och klassad som medelsvår. Den binder ihop norra och södra bryggan via stigar och grusvägar, genom öppna ängar och skog, förbi flera insjöar och Femsundsbadet. Vissa partier är tekniska och avråds för den med begränsad rörlighet.',
    ],

    facts: {
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA" (läst 2026-09-27). Strömkajen–Norra Ingmarsö: söndag 08.40–11.17 = 2 tim 37 min, lördag 08.30–11.17 och vardag 17.30–20.17 = 2 tim 47 min.
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "13A STOCKHOLM – VAXHOLM – BODA – SÖDRA INGMARSÖ – HUSARÖ", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026" (läst 2026-09-27). Strömkajen–Södra Ingmarsö via Boda: 15.30–18.45 = 3 tim 15 min, 08.15–11.40 = 3 tim 25 min, 14.45–18.25 = 3 tim 40 min.
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA" (läst 2026-09-27). Åsättra–Norra Ingmarsö 30 min (t.ex. 08.30–09.00, 16.10–16.40). Sommartidtabellen finns inte publicerad nu, så den tidigare uppgiften 2,5 h sommartid kunde inte kontrolleras.
      travel_time: 'Ca 2 tim 40 min–3 tim 40 min med Waxholmsbåt från Strömkajen (vår/höst 2026); 30 min från Åsättra på Ljusterö',
      // KÄLLA: https://www.ingmarso.se/vi-p%C3%A5-%C3%B6n — "Du som har fastighet på ö utan vägförbindelse är välkommen som medlem." (läst 2026-09-27); https://www.ingmarso.se/ — "De är levande öar med runt 180 bofasta.", "reguljära skärgårdsbåtar går alla dagar året om" (läst 2026-09-27)
      character: 'Ö utan vägförbindelse, grusvägar, runt 180 bofasta och båtar året om',
      // UPPSKATTNING: säsongen är en bedömning. KÄLLA: https://www.konsummoja.se/ — "Butiken är öppen året runt." (läst 2026-09-27)
      season: 'Maj–September (Coop och båttrafik året runt)',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-ingmarso/ — "Ingmarsö kan upplevas som en lugn dagsvandring eller som en del av ett längre ö-hopparäventyr." (läst 2026-09-27)
      best_for: 'Vandrare på Stockholm Archipelago Trail, dagsutflykter, ö-hoppare och båtluffare',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-ingmarso/ — "Från Femsundbadet kan du också fortsätta österut på Båtluffarleden och roddbåtarna över till Finnhamn." (läst 2026-09-27)
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/roddbatar-finnhamn-ingmarso/ — "Du kan ta dig mellan etapperna på Finnhamn och Ingmarsö med hjälp av roddbåtar som är utplacerade av Skärgårdsstiftelsen.", "Det är totalt 400 meter att ro åt ett håll." (läst 2026-09-27)
      { icon: '🥾', name: 'Båtluffarleden mot Finnhamn', desc: 'Från Femsundsbadet går Båtluffarleden österut över Kålgårdsön till roddbåtarna som Skärgårdsstiftelsen placerat ut. Sundet till Finnhamn är 400 meter att ro åt ett håll.' },
      // KÄLLA: https://www.ingmarso.se/: Ingmarsö Bageri = "Café – Deli – Restaurang – Catering", öppet morgon till sen kväll, serverar frukost/lunch/middag/pizza/fika; ingmarsogasthamn.se: bageriet ligger ca 1,5 km från södra bryggan
      { icon: '🍞', name: 'Ingmarsö Bageri', desc: 'Café och bageri mitt på ön — bröd, fika, lunch och pizza, uteservering i trädgården.' },
      // KÄLLA: https://www.ingmarso.se/att-g%C3%B6ra: namnger badplatserna Femsundsviken (brygga och sandstrand) och Badberget (vid norra bryggan)
      { icon: '🏊', name: 'Badplatser', desc: 'Femsundsviken har brygga och sandstrand; Badberget ligger vid norra bryggan.' },
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-ingmarso/ — "Följ leden som är uppmärkt med band och pilar där blått står för havet, gult för solen och reflex i mitten för den skimrande horisonten." (läst 2026-09-27); https://www.ingmarso.se/ — "promenera på markerade stigar" (läst 2026-09-27)
      { icon: '🚶', name: 'Vandring', desc: 'Stigar genom öppet betesmarkslandskap och blandskog. Stockholm Archipelago Trail är uppmärkt med band och pilar i blått och gult med reflex i mitten, och ön har fler markerade stigar.' },
    ],
    // KÄLLA: https://www.ingmarsobnb.se/ + https://roslagen.se/ — B&B på Norrgården, "Svit, familjerum eller enklare dubbelrum, du väljer." Sidan beskriver frukosten men anger ingenstans att den ingår i priset, så "frukost ingår" är borttaget. Ingmarsö Krog är restaurang utan rum (https://ingmarsokrog.com/) (läst 2026-09-14)
    accommodation: [
      { name: 'Ingmarsö B&B', type: 'B&B', desc: 'B&B på Norrgården, en gård från mitten av 1800-talet — svit, familjerum eller enklare dubbelrum.', websiteUrl: 'https://ingmarsobnb.se' },
    ],
    getting_there: [
      // KÄLLA: https://www.ingmarso.se/hittahit — "Du kan som regel stiga ombord i Åsättra på Ljusterö, Stockholm eller Vaxholm", "ta SL-buss 438 från Slussen i Stockholm och stiga på båten i Boda på Värmdö", "tänk på att fälla upp bryggsemaforen" (läst 2026-09-27)
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst" (läst 2026-09-27); restider se facts ovan (tabell 12/13).
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: '2 tim 40 min–3 tim 40 min', desc: 'Angör norra och södra Ingmarsö, via Åsättra (Ljusterö), Vaxholm eller buss 438 till Boda på Värmdö. Vissa turer angör bara efter beställning (b i tidtabellen), och vid hemresa fäller du upp bryggsemaforen.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: https://ingmarsogasthamn.se/: ca 30 platser, landström, färskvatten, dusch/wc, bränsle (bensinmack + sjömack året runt, kortbetalning)
      { name: 'Ingmarsö Gästhamn', desc: 'Gästhamn vid södra bryggan med cirka 30 platser, dusch/wc och bränsleförsäljning.', fuel: true, service: ['el', 'vatten', 'dusch'] },
    ],
    restaurants: [
      // KÄLLA: https://ingmarsokrog.com/ — "Ingmarsö Krog ligger precis invid havet, ett stenkast från södra ångbåtsbryggan.", "Hos oss kan ni nyttja våra bryggor under er sittningstid." (läst 2026-09-27); https://www.ingmarso.se/%C3%A4ta-och-sova — "ta en drink på badflotten innan middagen" (läst 2026-09-27)
      { name: 'Ingmarsö Krog', type: 'Restaurang', desc: 'Öns krog precis invid havet, ett stenkast från södra ångbåtsbryggan. Egen brygga för båtgäster under sittningstiden och en badflotte.', slug: 'ingmarso-krog' },
      // KÄLLA: https://www.ingmarso.se/: "Café – Deli – Restaurang – Catering", öppet morgon till sen kväll, serverar frukost/lunch/middag/pizza/fika. Priser och exakt säsong obelagda.
      { name: 'Ingmarsö Bageri', type: 'Bageri/Café', desc: 'Bröd, fika, lunch och pizza — uteservering i trädgården.' },
      // KÄLLA: https://www.ingmarso.se/%C3%A4ta-och-sova — "Affären är ombud för Systembolaget, Apoteket och Posten. Dessutom har de bensinmacken som har kortautomat som alltid är öppen." (läst 2026-09-27)
      // KÄLLA: https://www.konsummoja.se/ — "Vissa tider är butiken obemannad. Då använder du Coop-appen med Scan & Pay för entrè och betalning. Butiken är öppen året runt." (läst 2026-09-27)
      { name: 'Coop Ingmarsö', type: 'Handel', desc: 'Dagligvaror, ombud för Systembolaget, Apoteket och Posten, och bensinmack med kortautomat — öppet året om. Vissa tider är butiken obemannad och du handlar med Coop-appen.', open_season: 'Helår' },
    ],
    tips: [
      // KÄLLA: https://www.ingmarso.se/ — Waxholmsbåtarna angör både norra och södra bryggan
      'Ön har två bryggor, norra och södra — kontrollera i tidtabellen vilken din båt angör.',
      // KÄLLA: https://www.ingmarso.se/hittahit — "Du till vissa turer ta SL-buss 438 från Slussen i Stockholm och stiga på båten i Boda"
      'Buss 438 från Slussen till Boda kortar resan jämfört med båt hela vägen från stan.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/kalgardson.html — "tälta annat än på eventuellt anvisade platser", "medföra hund som ej är kopplad", "på ett för andra störande sätt utnyttja radioapparat" (läst 2026-09-27)
      'I Kålgårdsöns naturreservat på östra Ingmarsö får du bara tälta på anvisad plats, hunden ska vara kopplad och det är förbjudet att spela radio eller musik så att det stör andra.',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-ingmarso/ — "Från bägge bryggor kan du ta dig fram på grusvägarna", "Du bör undvika den stigen som går norrut från Femsundsbadet, den är teknisk.", "finns tekniska partier som inte är lämpliga" (läst 2026-09-27)
      'Grusvägarna mellan bryggorna, bageriet, krogen och B&B:n går bra med barnvagn eller rullstol. Stigen norrut från Femsundsbadet och Båtluffarleden österut har tekniska partier.',
      // KÄLLA: https://www.ingmarso.se/hittahit — "När du ska åka hem, tänk på att fälla upp bryggsemaforen. Med den uppfälld signalerar du till skepparen att det finns resenärer att hämta." (läst 2026-09-27)
      'När du ska åka hem: fäll upp bryggsemaforen, annars vet skepparen inte att någon väntar på bryggan.',
    ],
    activity_meta: {
      // KÄLLA: Stockholm Archipelago Trail, https://stockholmarchipelagotrail.com/section/ (2026-09-17)
      vandring: { trails: 1, max_km: 9.8, sat: { km: 9.8, difficulty: 'Medel' } },
    },
    related: ['finnhamn', 'svartso', 'ljustero'],
    tags: ['bilfri', 'båtluffarleden', 'vandring', 'natur', 'mellersta'],
    // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/roddbatar-finnhamn-ingmarso/ — "Det måste alltid finnas en roddbåt på varje sida.", "För att det alltid skall finnas en roddbåt på varje sida måste du ro fram och tillbaka tre gånger." (läst 2026-09-27)
    did_you_know: 'På roddbåtspassagen mot Finnhamn måste det alltid finnas en båt kvar på varje sida — därför ror vandrare sundet tre gånger: en gång för att hämta den andra båten, en gång för att bogsera tillbaka den och en gång för att fortsätta.',
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli–Mitten av Augusti',
      best: 'Juni',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-ingmarso/ — "Här har du möjlighet att uppleva öppna landskap tack vare betesdjuren", "Femsundbadet" (läst 2026-09-27); https://www.ingmarso.se/att-g%C3%B6ra — "Längst in i Femsundsviken finns en badplats med brygga och sandstrand." (läst 2026-09-27)
      bestReason: 'Försommar på leden: betesdjuren håller landskapet öppet, och i Femsundsviken finns en badplats med brygga och sandstrand precis vid Stockholm Archipelago Trail.',
      // KÄLLA: https://www.ingmarso.se/vi-p%C3%A5-%C3%B6n — "Krogen har sin sista helg den här helgen", "Bageriet har öppet lördagar." (Lottas spalt v39) (läst 2026-09-27); https://ingmarsobageri.com/hander-i-bageriet/ — "RÄKAN ÄR STÄNGD FÖR SÄSONGEN 2026" (läst 2026-09-27); https://www.konsummoja.se/ — "Butiken är öppen året runt." (läst 2026-09-27)
      warning: 'Utanför sommaren har bageri och krog begränsat öppet — hösten 2026 hade bageriet öppet på lördagar och krogen stängde efter sista helgen i september. Coop har öppet året runt.',
      months: ['off','off','off','off','limited','open','peak','open','limited','off','off','off'],
    },
  },
  // ─── NÄMDÖ ───────────────────────────────────────────────────
  {
    slug: 'namdo',
    name: 'Nämdö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌿',
    tagline: 'Bilfri ö på Stavsnäsleden — kyrka från 1876 och Sveriges nyaste nationalpark utanför.',
    description: [
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/namdo — "Nämdö är en av skärgårdens större öar. Ön är promenadvänlig året om"; "den är både bilfri och till viss del ett naturreservat"; "Waxholmsbolagets fartyg lägger till vid flera bryggor på ön"
      'Nämdö är en av skärgårdens större öar, bilfri och till viss del naturreservat. Waxholmsbolagets fartyg lägger till vid flera bryggor, och ön är promenadvänlig året om. Grusvägar, gårdar och skog snarare än kajpromenad och kösystem.',
      // KÄLLA: Riksantikvarieämbetet, bebyggelseregistret via https://www.kringla.nu/kringla/objekt?referens=raa/bbr/21400000445278 — "Nämdö kyrka invigdes hösten 1876"; "Stilen är nygotisk som framförallt uttrycks genom den höga takresningen, tornet samt de spetsbågade fönstren"; "utförd med trästomme, granitsockel samt svartmålat plåttak"
      'Nämdö kyrka invigdes hösten 1876. Stilen är nygotisk, vilket framför allt syns i den höga takresningen, tornet och de spetsbågade fönstren, och byggnaden har trästomme, granitsockel och svartmålat plåttak.',
      // KÄLLA: Riksantikvarieämbetet via https://www.kringla.nu/kringla/objekt?referens=raa/bbr/21400000445278 — knuttimrat kapell på Nämdö efter 1607; nytt kapell uppfört 1701–1702; kapell på initiativ av häradshövding Magnus Blix färdigt 1798
      'Kyrkan har föregångare. Ett knuttimrat kapell restes på ön efter 1607, ett nytt kapell uppfördes 1701–1702 och överlevde ryssarnas härjningar, och 1798 stod ytterligare ett kapell färdigt tillsammans med klockstapel, likbod och kyrkbrygga.',
      // KÄLLA: Naturvårdsverket, https://www.naturvardsverket.se/om-oss/aktuellt/nyheter-och-pressmeddelanden/2025/juni/namdoskargarden-blir-sveriges-31a-nationalpark/ — "Nämdöskärgården blir Sveriges 31:a nationalpark" (nyhet 2025-06-23); "Den omfattar en areal på 25 300 hektar varav 97 procent är hav"; "drygt 1 300 öar, kobbar och skär"; landets andra nationalpark med marint fokus och den första i Östersjön (läst 2026-09-19)
      // KÄLLA: Naturvårdsverket, https://www.naturvardsverket.se/om-oss/aktuellt/nyheter-och-pressmeddelanden/2025/juni/namdoskargarden-blir-sveriges-31a-nationalpark/ — "Nämdöskärgården blir Sveriges 31:a nationalpark" (nyhet 2025-06-23); "Den omfattar en areal på 25 300 hektar varav 97 procent är hav"; "drygt 1 300 öar, kobbar och skär"; landets andra nationalpark med marint fokus och den första i Östersjön (läst 2026-09-19) ; Länsstyrelsen Stockholm, https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html — "Skyddat sedan: 2025"; "Storlek: 25 300 hektar. 97 procent av ytan består av vatten"; "I nationalparken finns 1 353 öar, kobbar och skär"; "Nämdöskärgården är vår första svenska marina nationalpark i Östersjön"; "Förvaltare: Länsstyrelsen i Stockholms län" (läst 2026-09-19) ; Värmdö kommun, https://www.varmdo.se/byggabomiljo/skargardnaturochparker/namdoskargardensnationalpark.4.18c983316e0536cb189c3ba.html — "Den 17 juni 2025 röstade riksdagen i frågan, kort därefter beslutade regeringen att Nämdöskärgården blir Sveriges 31:a nationalpark"; "Nationalparksområdet ligger öster om ön Nämdö"; "Nationalparken omfattar det som tidigare var Bullerö och Långviksskärs naturreservat samt ett stort område hav utanför" (läst 2026-09-19)
      'Öster om Nämdö bildades 2025 Nämdöskärgårdens nationalpark, Sveriges 31:a och den första med marint fokus i Östersjön. Parken omfattar 25 300 hektar, varav 97 procent är hav, och drygt 1 300 öar, kobbar och skär — bland dem tidigare Bullerö och Långviksskärs naturreservat. Själva ön Nämdö ingår inte i parken, men den ligger vid dess gräns.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/namdo.html — "Skyddat sedan: 2002"; 2 237 hektar varav 500 hektar land; kommun Värmdö; Skärgårdsstiftelsen är både markägare och förvaltare; Natura 2000-området "Norra Nämdö SE0110349" (2026-09-14)
      'Nämdö naturreservat bildades 2002 och omfattar 2 237 hektar, varav 500 är land. Skärgårdsstiftelsen är både markägare och förvaltare, och norra delen av ön ingår i Natura 2000-området Norra Nämdö, SE0110349.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/namdo.html — ön ligger i "södra skärgårdens urkalkstensbälte", vilket ger en flora rik på ormbunkar och orkidéer; kalkbergen vid Östanvik och skogarna på Nämdö Böte och Skabban är botaniskt värdefulla och hyser signalarter och rödlistade arter (2026-09-14)
      'Nämdö ligger i södra skärgårdens urkalkstensbälte, och det syns i floran: ovanligt rik på ormbunkar och orkidéer. Kalkbergen vid Östanvik och skogarna på Nämdö Böte och Skabban pekas ut som botaniskt särskilt värdefulla, med signalarter och rödlistade arter som visar på höga naturvärden. Det är berggrunden som avgör vad som växer, och här är den annorlunda än i resten av skärgården.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html — "I nationalparken finns 1 353 öar, kobbar och skär och ett större havsområde längst österut"; förvaltare "Länsstyrelsen i Stockholms län"; markägare "Staten genom Naturvårdsverket"; tre större bebyggda öar — Bullerö, Rågskär och Långviksskär — har vandringsleder, rastplatser och tältplatser (2026-09-14)
      'Nationalparken öster om ön rymmer 1 353 öar, kobbar och skär plus ett större havsområde längst österut. Länsstyrelsen i Stockholms län förvaltar den, och staten äger marken genom Naturvårdsverket. På de tre största öarna — Bullerö, Rågskär och Långviksskär — finns den äldre bebyggelsen bevarad, liksom vandringsleder, rastplatser och tältplatser.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html — i parken förekommer havsörn och andra sjöfåglar liksom älg, rådjur, räv, hare, mink och bäver; tallen dominerar näringsfattiga hällmarker på de inre öarna medan de yttersta skären bär låg växtlighet och lavar (2026-09-14)
      'Djurlivet i parken sträcker sig från havsörn och sjöfågel till älg, rådjur, räv, hare, mink och bäver. Landskapet trappas ned utåt: tall på näringsfattiga hällmarker på de inre öarna, och längst ut bara låg växtlighet och lavar på skären.',
      // KÄLLA: https://www.xn--nmdhbf-bua0m.se/hembygdsgard-bibliotek/ (Nämdö hembygdsförening) — Sigfrid Jonsson (1895–1983) var föreningens grundare; "1977 gav Sigfrid sina två fastigheter till Nämdö Hembygdsförening vilket ledde till att Nämdö hembygdsgård kunde börja byggas"; hembygdsgården har "en sal med plats för upp till 80 personer plus ett professionellt utrustat kök" (2026-09-14)
      'Hembygdsgården finns tack vare en enda person. Sigfrid Jonsson (1895–1983), föreningens grundare, gav 1977 sina två fastigheter till Nämdö Hembygdsförening, och först då kunde bygget börja. I dag rymmer salen upp till 80 personer och har ett fullt utrustat kök — på en ö av den här storleken är det öns största samlingslokal.',
      // KÄLLA: https://www.xn--nmdhbf-bua0m.se/hembygdsgard-bibliotek/ — föreningen har drivit biblioteksverksamheten "sen 2009" i Nämdö skola, "ett stenkast från hembygdsgården"; "Fastigheten som inrymmer biblioteket ägs av Värmdö kommun" och drivs av föreningen på uppdrag av kommunens kultur- och fritidsavdelning (2026-09-14)
      // KÄLLA: https://www.xn--nmdhbf-bua0m.se/service-information/ — Nämdö bibliotek har "Mer än 1000 böcker för både barn och vuxna"; bokbåten har "Över 3000 böcker som du kan låna och returnera nästa gång båten kommer" (2026-09-14)
      'Biblioteket ligger i Nämdö skola, ett stenkast från hembygdsgården, och drivs sedan 2009 av hembygdsföreningen på uppdrag av Värmdö kommun, som äger fastigheten. Där finns över tusen böcker. Dessutom kommer bokbåten med över tretusen titlar som lånas ut och lämnas tillbaka nästa gång båten passerar.',
      // KÄLLA: https://www.xn--nmdhbf-bua0m.se/service-information/ — Handlarn i Solvik anges som "Livsmedelsaffär, bensinstation"; sjukvårdsbåt från Djurö vårdcentral besöker ön en gång i månaden efter bokning; grovsopfärjan går juni–augusti; återvinningscontainrar finns vid Sand, Solvik och hembygdsgården (2026-09-14)
      'Servicen är uppräknelig. I Solvik ligger Handlarn, som är både livsmedelsaffär och bensinstation. En sjukvårdsbåt från Djurö vårdcentral kommer en gång i månaden efter bokning, grovsopfärjan går juni till augusti och återvinningscontainrar står vid Sand, Solvik och hembygdsgården.',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-namdo/ — etappen anges som "Medel 13.1 km"; rekommenderad start vid Solvik medsols, söderut förbi kyrkan till Sand, västerut längs grusvägen in i skogen till en insjö, vidare till Långvik och norrut till utkiksberget vid Nämdö Böte och Östanvik gård; längs vägen Kyrknäset med "vackra lämningar", Skärgårdsmuseet, biblioteket, hembygdsgården och gårdsbutiken; "ett litet utsiktsberg där du har milsvid utsikt" (2026-09-14)
      'Nämdöetappen på Stockholm Archipelago Trail är 13,1 kilometer och går lämpligen medsols från Solvik: söderut förbi kyrkan till Sand, västerut på grusväg in i skogen till en insjö, vidare till Långvik och norrut till Nämdö Böte. Längs vägen ligger Kyrknäset med lämningar, Skärgårdsmuseet, biblioteket och hembygdsgården, och gårdsbutiken vid Östanvik. Vid Nämdö Böte finns ett litet utsiktsberg med milsvid utsikt.',
    ],

    facts: {
      // KÄLLA: https://skargardsstiftelsen.se/omraden/namdo/ — "Reguljär båttrafik går året runt från Stavsnäs med Waxholmsbolaget. Under sommaren finns även förbindelser från Stockholm och Saltsjöbaden." Restiden gick inte att belägga: Waxholmsbolagets tabell 17 angavs utan URL och bolagets tidtabellssidor svarar bara "Javascript must be enabled"; även ResRobot-mätningen saknade URL. Siffran ~35 min är därför borttagen.
      travel_time: 'Reguljär Waxholmsbåt från Stavsnäs året runt — restiden är inte belagd',
      character: 'Bilfri, genuint, litet samhälle, välskyddat',
      season: 'Maj–September',
      best_for: 'Seglare, naturälskare, genuint skärgårdsliv',
    },
    activities: [
      // KÄLLA: Svenska kyrkan (Djurö, Möja och Nämdö församling) + RAÄ bebyggelseregistret — nygotisk träkyrka, invigd hösten 1876; tidigare uppgifter om åttakantig gustaviansk kyrka 1768/1798 var fel.
      { icon: '⛪', name: 'Nämdö kyrka', desc: 'Vit träkyrka i nygotisk stil, invigd 1876 — en av skärgårdens mest distinkta kyrkobyggnader.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Klara vatten och fina klippor längs södra kustlinjen.' },
      { icon: '🚶', name: 'Vandring', desc: 'Promenera runt ön och utforska de gamla fiskelägena.' },
      { icon: '⛵', name: 'Segling', desc: 'Naturhamnen på södsidan är ett populärt seglarankar.' },
    ],
    // KÄLLA: https://skargardsstiftelsen.se/omraden/namdo/ — Solvik har boende sommartid, bl.a. glamping, samt tältplatser; visitskargarden.se — Nämdö Solviks Gästhamn (läst 2026-09-14)
    accommodation: [
      { name: 'Solvik — glamping och gästhamn', type: 'Camping', desc: 'Skärgårdsstiftelsens område Solvik har boende sommartid, bland annat glamping, samt gästhamn och tältplatser.', websiteUrl: 'https://skargardsstiftelsen.se/omraden/namdo/' },
    ],
    getting_there: [
      // KÄLLA: https://skargardsstiftelsen.se/omraden/namdo/ — "Reguljär båttrafik går året runt från Stavsnäs med Waxholmsbolaget. Under sommaren finns även förbindelser från Stockholm och Saltsjöbaden." Sidan nämner varken linjenummer, restid eller Möja.
      { method: 'Waxholmsbåt', from: 'Stavsnäs', desc: 'Reguljär båttrafik året runt från Stavsnäs med Waxholmsbolaget. Sommartid finns även förbindelser från Stockholm och Saltsjöbaden.', icon: '⛴' },
    ],
    harbors: [
    ],
    restaurants: [
      // KÄLLA: https://visitskargarden.se/, Mellersta skärgården/Nämdö — "Tempo Nämdö Livs", livsmedelsbutik, Solvik 201, öppen året runt.
      { name: 'Tempo Nämdö Livs', type: 'Handel', desc: 'Livsmedelsbutik i Solvik, öppen året runt.' },
    ],
    tips: [
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/namdo — "den är både bilfri och till viss del ett naturreservat"; "Ön är promenadvänlig året om"
      'Ön är bilfri och promenadvänlig året om — räkna med att gå.',
      // KÄLLA: Riksantikvarieämbetet via https://www.kringla.nu/kringla/objekt?referens=raa/bbr/21400000445278 — Nämdö kyrka invigd hösten 1876, nygotisk träkyrka med torn och spetsbågade fönster
      'Nämdö kyrka från 1876 är ett landmärke på ön — nygotisk träkyrka med högt tak och spetsbågade fönster.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html — i nationalparken gäller bland annat koppeltvång för hund, begränsningar för eldning och camping, högst 5 knop inom 100 meter från land samt tillträdesförbud i vissa områden under häckningssäsongen (2026-09-14)
      'I Nämdöskärgårdens nationalpark gäller egna regler: högst 5 knop inom 100 meter från land, koppeltvång för hund, begränsad eldning och camping, och tillträdesförbud i vissa områden under fåglarnas häckningssäsong.',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-namdo/ — "I norra änden av leden, i närheten av Tjusvik finns en liten insjö. Från södra änden av sjön, vid klipporna är det härligt att ta ett dopp." (2026-09-14)
      'I norra änden av leden, nära Tjusvik, ligger en liten insjö där klipporna i södra änden gör ett bra badställe.',
      // KÄLLA: https://www.xn--nmdhbf-bua0m.se/service-information/ — Handlarn i Solvik är "Livsmedelsaffär, bensinstation" (2026-09-14)
      'Handlarn i Solvik är både livsmedelsaffär och bensinstation — öns enda av båda slagen.',
    ],
    activity_meta: {
      // KÄLLA: Stockholm Archipelago Trail, https://stockholmarchipelagotrail.com/section/ (2026-09-17)
      vandring: { trails: 1, max_km: 13.1, sat: { km: 13.1, difficulty: 'Medel' } },
    },
    related: ['moja', 'gallno', 'sandhamn'],
    tags: ['bilfri', 'genuint', 'segling', 'natur', 'kyrka'],
    // KÄLLA: att Nämdö specifikt härjades 1719 samt att kyrkan haft "minst tre föregångare" kunde ej beläggas och är borttaget. Kapell ca 1630 och kyrka invigd 1876: Svenska kyrkan (Djurö, Möja och Nämdö församling) + RAÄ bebyggelseregistret (se KÄLLA-kommentar ovanför activities-fältet).
    // KÄLLA: Naturvårdsverket, https://www.naturvardsverket.se/om-oss/aktuellt/nyheter-och-pressmeddelanden/2025/juni/namdoskargarden-blir-sveriges-31a-nationalpark/ — "Nämdöskärgården blir Sveriges 31:a nationalpark" (nyhet 2025-06-23); "Den omfattar en areal på 25 300 hektar varav 97 procent är hav"; "drygt 1 300 öar, kobbar och skär"; landets andra nationalpark med marint fokus och den första i Östersjön (läst 2026-09-19) ; Riksantikvarieämbetet, bebyggelseregistret via kringla.nu, https://www.kringla.nu/kringla/objekt?referens=raa/bbr/21400000445278 — knuttimrat kapell på Nämdö efter 1607, nytt kapell 1701–1702, kapell vid Östanvik färdigt 1798; "Nämdö kyrka invigdes hösten 1876"; stilen är nygotisk med hög takresning, torn och spetsbågade fönster; "Trästomme, granitsockel samt svartmålat plåttak"; "Numera är kyrkan enhetligt vitmålad" (läst 2026-09-19)
    // KÄLLA: Länsstyrelsen Stockholm, https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html — "Skyddat sedan: 2025"; "Storlek: 25 300 hektar. 97 procent av ytan består av vatten"; "I nationalparken finns 1 353 öar, kobbar och skär"; "Nämdöskärgården är vår första svenska marina nationalpark i Östersjön"; "Förvaltare: Länsstyrelsen i Stockholms län" (läst 2026-09-19) ; Naturvårdsverket, https://www.naturvardsverket.se/om-oss/aktuellt/nyheter-och-pressmeddelanden/2025/juni/namdoskargarden-blir-sveriges-31a-nationalpark/ — "Nämdöskärgården blir Sveriges 31:a nationalpark" (nyhet 2025-06-23); "Den omfattar en areal på 25 300 hektar varav 97 procent är hav"; "drygt 1 300 öar, kobbar och skär"; landets andra nationalpark med marint fokus och den första i Östersjön (läst 2026-09-19) ; Riksantikvarieämbetet, bebyggelseregistret via kringla.nu, https://www.kringla.nu/kringla/objekt?referens=raa/bbr/21400000445278 — knuttimrat kapell på Nämdö efter 1607, nytt kapell 1701–1702, kapell vid Östanvik färdigt 1798; "Nämdö kyrka invigdes hösten 1876"; stilen är nygotisk med hög takresning, torn och spetsbågade fönster; "Trästomme, granitsockel samt svartmålat plåttak"; "Numera är kyrkan enhetligt vitmålad" (läst 2026-09-19)
    did_you_know: 'Nämdöskärgårdens nationalpark, bildad 2025, är Sveriges första nationalpark med marint fokus i Östersjön. Nämdö har haft kapell sedan 1600-talets början — den nuvarande kyrkan från 1876 är minst den fjärde gudstjänstbyggnaden på ön.',
    insiderTips: [
      'Nämdö kyrka, invigd 1876, är en vit nygotisk träkyrka med hög takresning och spetsbågade fönster — ett karakteristiskt inslag i skärgårdslandskapet.',
      'Nämdö har ett fåtal fastboende och nås med Waxholmsbåten från Stavsnäs.',
      'Ön är känd bland seglare för sina skyddade naturhamnar och är ett populärt ankringsställe.',
      // KÄLLA: https://skargardsstiftelsen.se/, Nämdö — nämner livsmedelsbutik, café och "restaurangverksamhet under sommarsäsongen" i Solvik.
      'Café och enklare restaurangservering finns säsongsvis i Solvik, men öppettiderna är begränsade. Ta med eget som backup.',
    ],
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Juni eller Juli',
      bestReason: 'Midsommar vid den gamla kyrkan är skärgård på riktigt. Juni ger lugnet, blomstret och det tomma sundet — utan juli-trängseln.',
      // KÄLLA: https://skargardsstiftelsen.se/, Nämdö — café/restaurangverksamhet i Solvik under sommarsäsongen; https://visitskargarden.se/ anger att livsmedelsbutiken (Tempo Nämdö Livs) är öppen året runt.
      warning: 'Café och restaurang i Solvik har begränsat säsongsöppet. Ta alltid med mat och dryck som backup.',
      months: ['off','off','off','off','limited','open','peak','open','limited','off','off','off'],
    },
  },
  // ─── SVARTSÖ ─────────────────────────────────────────────────
  {
    slug: 'svartso',
    name: 'Svartsö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🏝️',
    // KÄLLA: https://www.svartso.se/att-gora — "14 km långa grusvägar"; https://svartsolanthandel.se/om-svartso — "här finns bl.a. förskola, skola, lanthandel, krog" (läst 2026-09-27)
    tagline: 'Helårsö i Värmdö med 14 km grusvägar, lanthandel, krog och skola.',
    description: [
      // KÄLLA: https://svartso.se/ — "ligger cirka 2 distansminuter ost om södra Ljusterö, strax söder om Ingmarsö", "Svartsö är 8 km lång och 1,5 km bred", "Svartsö tillhör Värmdö kommun" (läst 2026-09-27)
      // KÄLLA: https://svartsolanthandel.se/om-svartso — "Idag bor omkring 65 personer permanent på Svartsö, och här finns bl.a. förskola, skola, lanthandel, krog , Bistro och hotell&vandrarhem." (läst 2026-09-27)
      'Svartsö ligger i Stockholms mellersta skärgård, cirka två distansminuter öster om södra Ljusterö och strax söder om Ingmarsö, och tillhör Värmdö kommun. Ön är åtta kilometer lång och en och en halv kilometer bred. Omkring 65 personer bor här permanent, och på ön finns förskola, skola, lanthandel, krog, bistro och hotell och vandrarhem.',
      // KÄLLA: Värmdö kommun, https://www.varmdo.se/download/18.15c854f417f448919aea0f79/1649062024749/Svartsö.pdf (foldern om Svartsö) — "Svartsö är en av de större öarna i Stockholms skärgård och befolkades troligen under medeltiden. Vid 1500-talets mitt fanns skattegårdar vid Ahlsvik, Skälvik och Svartsö"; "Ett av de äldsta husen på ön är det vackra stenhuset i Ahlsviks by, som bankokommissarie Johan Söderling lät bygga 1732"; Ahlsvik "köptes på 1720-talet av bankokommissarien Johan Söderling som lät uppföra en herrgård här 1732. Byggnadsmaterialet togs från tegelbruket på ön Hästnacken vilket han anlagt några år tidigare"; "Det f d missionshuset är ett av de äldsta missionshusen i skärgården, invigt 1880"; "Skolan byggdes 1897" (läst 2026-09-19)
      'Ön bebyggdes sannolikt redan under medeltiden, och sedan 1500-talet har gårdarna utgjort grundstrukturen i samhället. I Alsvik lät Johan Söderling uppföra ett stenhus 1732, av tegel från hans eget tegelbruk på grannön Hästnacken. Missionshuset restes 1880 och skolan byggdes 1897.',
      // KÄLLA: https://svartso.se/ — "Vägnätet på Svartsö består av grusvägar samt ett stort antal upptrampade stigar." (läst 2026-09-27)
      // KÄLLA: https://www.svartso.se/att-gora — "Cykel kan du antingen hyra på Svartsö lanthandel (Alsviks brygga) eller Svartsö hotell och vandrarhem (Norra svartsö brygga)." (läst 2026-09-27)
      'Vägnätet på Svartsö består av grusvägar och ett stort antal upptrampade stigar, och cykeln är ett naturligt sätt att ta sig runt. Cykel hyrs vid Svartsö Lanthandel vid Alsviks brygga eller vid skärgårdshotellet vid Norra Svartsö brygga.',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-svartso/ — etappen är 17,9 km, "en liggande åtta", nås från bryggorna Norra Svartsö, Alsvik, Skälvik och Söderboudd; svårighetsgrad "Lätt", "De knappt arton kilometrarna är för det mesta på vacker grusväg" (2026-09-14)
      'Stockholm Archipelago Trails Svartsö-etapp är knappt arton kilometer lång och går som en liggande åtta över ön, mest på grusväg och klassad som lätt. Den kan påbörjas från bryggorna Norra Svartsö, Alsvik, Skälvik och Söderboudd.',
      // KÄLLA: https://svartso.se/ — "Svartsö har cirka 60 bofasta personer. På sommaren ökar den fasta befolkningen till cirka 800 genom de många fritidshusen som finns på ön." (läst 2026-09-27)
      'Sommartid förändras ön. Enligt öns egen webbplats ökar befolkningen från ett sextiotal bofasta till cirka 800 genom de många fritidshusen.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f79/1649062024749/Svartsö.pdf — "Träskökvarns brygga (egen ö)", "Brygga med båtförbindelse.", "Kvarnen uppfördes 1749 och är en av två bevarade kvarnar i det", "holländare med vridbart tak. Privatägd och kan beses av grupper" (läst 2026-09-27)
      'Träskö kvarn står på en egen ö med brygga och båtförbindelse och uppfördes 1749. Värmdö kommun beskriver den som en av bara två bevarade kvarnar i det en gång så kvarnrika Värmdö. Det är en så kallad holländare med vridbart tak, och det invändiga maskineriet finns kvar i original. Kvarnen är privatägd och kan ses av grupper efter överenskommelse med ägaren.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f79/1649062024749/Svartsö.pdf — "I juli 1719 anföll den ryska flottan den svenska östkusten i ett försök att inta Stockholm. Även Svartsö drabbades och öborna tog sin tillflykt till en holme i den största insjön Storträsk."
      // KÄLLA: samma sida, punkt 14 — "Hit flydde öborna under rysshärjningarna 1719 och här grävde de ner sina ägodelar för att gömma dem för ryssen. Enligt sägnen kommer en förbannelse att drabba den som försöker leta efter de gömda ägodelarna."
      'I juli 1719 gick den ryska flottan längs östkusten för att ta Stockholm, och Svartsö drabbades. Öborna flydde ut till Boholmen i Storträsk, öns största insjö, och grävde ner sina ägodelar där. Enligt sägnen drabbas den som försöker leta upp dem av en förbannelse.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f79/1649062024749/Svartsö.pdf — "Det f d missionshuset är ett av de äldsta missionshusen i skärgården, invigt 1880 ... Medlemmarna seglade och rodde till mötena vid Ahlsvik ... Missionsförsamlingen upplöstes 1974 och huset fungerar nu som hembygdsgård"
      'Missionshuset i Ahlsvik, invigt 1880, är enligt Värmdö kommun ett av de äldsta missionshusen i skärgården. Kring sekelskiftet 1900 blomstrade församlingen och medlemmarna seglade och rodde till mötena från kringliggande öar; huset blev ett slags kulturellt centrum för bygden. Missionsförsamlingen upplöstes 1974 och byggnaden är i dag öns hembygdsgård, med badplats intill.',
      // KÄLLA: https://www.varmdo.se/barnochutbildning/skolbarn/alltomgrundskolan/grundskolorivarmdokommun/varmdoskargardsskolor.4.2d09c46d1850f82301f9103.html — "Svartsö skola är en liten F–9-skola med närhet till natur och vatten.", "Årskurs 6–9 vilande läsåret 2026/2027." (läst 2026-09-27)
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f79/1649062024749/Svartsö.pdf — "Här ligger skola, förskola och ö-bibliotek.", "Barnen kommer även från andra öar i" (läst 2026-09-27)
      'Skolan, förskolan och ö-biblioteket ligger i Skälvik. Svartsö skola är en liten F–9-skola med elever även från grannöarna, men enligt Värmdö kommun är årskurs 6–9 vilande läsåret 2026/2027.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f79/1649062024749/Svartsö.pdf — "Genom ön går några dalstråk som ännu under vikingatiden delade ön i flera öar." / "Ön har många fina insjöar, våtmarker och grunda havsvikar. Artrikedomen är stor, med bl a orkidéer som Adam och Eva, nattviol och ängsnycklar."
      'Landskapet skiftar från höga berg till blandskog och ängs- och hagmarker. Genom ön går några dalstråk som ännu under vikingatiden delade Svartsö i flera separata öar. Artrikedomen är stor: bland orkidéerna finns Adam och Eva, nattviol och ängsnycklar.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f79/1649062024749/Svartsö.pdf — "Rådjur och räv, men även bäver, grävling, älg, lo och vildsvin kan man se ibland. Det finns gott om småfågel och sjöfågel."
      // KÄLLA: samma sida, punkt 5 — "Vid insjöarna finns bl a storlom och häger. Man kan ofta se havsörn flyga över Svartsö."
      'Djurlivet är rikare än ön är stor. Rådjur och räv är vanliga, men bäver, grävling, älg, lo och vildsvin förekommer också. Vid insjöarna håller storlom och häger till, och havsörn ses ofta dra fram över ön.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f79/1649062024749/Svartsö.pdf — "Jordbruk bedrivs fortfarande och kor och får håller landskapet öppet." / "Gården Marsängen flyttades ut från Ahlsviks by i samband med laga skifte 1874."
      'Jordbruket lever kvar, och kor och får håller landskapet öppet. Gården Marsängen flyttades ut från Ahlsviks by vid laga skiftet 1874 och har välbevarade byggnader från sent 1800-tal och tidigt 1900-tal.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f79/1649062024749/Svartsö.pdf — "En grusväg går från Marsängen i väster förbi Ahlsvik och vidare till Söderboudd i öster och kantas av vackra kulturmarker och skogsområden. Det går även en väg mellan Norra Svartsö brygga och Skälviks brygga."
      'Huvudstråket för cykeln är grusvägen från Marsängen i väster, förbi Ahlsvik och vidare till Söderboudd i öster, kantad av kulturmarker och skog. En andra väg binder ihop Norra Svartsö brygga med Skälviks brygga.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f79/1649062024749/Svartsö.pdf — herrgården i Ahlsvik: "Rokokon var den rådande stilen vid denna tid och i arkitekturen kännetecknas den bl a av det brutna så kallade mansardtaket. Huset är ett exempel på borgarklassens mindre herrgårdsbyggnader ... Huset har en hög grad av ursprunglighet"
      'Söderlings hus i Ahlsvik är ett rokokohus med brutet mansardtak, en av borgarklassens mindre herrgårdsbyggnader av det slag som började uppföras i skärgården från 1700-talet. Värmdö kommun framhåller husets höga grad av ursprunglighet och arkitekturhistoriska värde. Det är privatägt och ses utifrån.',
    ],

    facts: {
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "13A STOCKHOLM – VAXHOLM – BODA – SÖDRA INGMARSÖ – HUSARÖ", "Alsvik (Svartsö)"; Strömkajen–Alsvik t.ex. mån–tor 08.15–10.50, lör 08.35–10.50, sön 08.15–10.35, vardag 14.45–17.45 (läst 2026-09-27)
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-svartso-skargardshotell-vandrarhem/ — "Ca 2,5 h. med reguljär båt från centrala Stockholm." (läst 2026-09-27)
      travel_time: 'ca 2–3 tim med Waxholmsbåt linje 13 från Strömkajen via Vaxholm (hösttabell 2026)',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-svartso/ — "Ön med de vackra grusvägarna och de öppna landskapen."; https://svartsolanthandel.se/om-svartso — "Idag bor omkring 65 personer permanent på Svartsö" (läst 2026-09-27)
      character: 'Helårsö med grusvägar, betesmarker, lanthandel och krog',
      // KÄLLA: https://svartso.se/ — "Svartsö är tillgängligt året runt med dagliga skärgårdsbåtar."; https://www.svenskaturistforeningen.se/boende/stf-svartso-skargardshotell-vandrarhem/ — "Välkommen ut till lugnet – öppet året runt!"; https://svartsolanthandel.se/ — "Öppettider café", "STÄNGT FÖR SÄSONGEN" (läst 2026-09-27)
      season: 'Året runt – dagliga båtar och skärgårdshotellet öppet året runt; café och krog främst sommar och tidig höst',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-svartso/ — "Här vandrar du på dagen och cyklar till den goda maten på kvällen."; https://www.svenskaturistforeningen.se/boende/stf-svartso-skargardshotell-vandrarhem/ — "bad i hav och insjö" (läst 2026-09-27)
      best_for: 'Cykling, vandring, bad i hav och insjö, mat på krogen',
    },
    activities: [
      // KÄLLA: https://svartsolanthandel.se/ — "Svartsö Lanthandel är en välsorterad butik med fräscha grönsaker och butiksbageri.", "Butiken är ombud för PostNord, DHL, Schenker och UPS. Systembolaget och Apoteket." (läst 2026-09-27)
      { icon: '🛒', name: 'Svartsö Lanthandel', desc: 'Välsorterad lanthandel vid Alsviks brygga med butiksbageri och varor från odlare och uppfödare i regionen. Ombud för Systembolaget, Apoteket och PostNord.' },
      // KÄLLA: Värmdö kommun, https://www.varmdo.se/download/18.15c854f417f448919aea0f79/1649062024749/Svartsö.pdf (foldern om Svartsö, punkt 3 Ahlsvik) — "köptes på 1720-talet av bankokommissarien Johan Söderling som lät uppföra en herrgård här 1732. Byggnadsmaterialet togs från tegelbruket på ön Hästnacken vilket han anlagt några år tidigare"; "Huset är privatägt" (läst 2026-09-19) ; https://www.svartso.se/att-gora — "14 km långa grusvägar"; "Cykel kan du antingen hyra på Svartsö lanthandel (Alsviks brygga) eller Svartsö hotell och vandrarhem" (läst 2026-09-19) ; Svartsö Lanthandel, https://www.svartsolanthandel.se/cykeluthyrning — "Vid Ahlsviks brygga väntar Svartsö Lanthandel med cykel och karta över ön"; "Cykla sedan längs öns 14 km långa, vackra grusvägar" (läst 2026-09-19)
      { icon: '🏛', name: 'Stenhuset i Alsvik', desc: 'Stenhus uppfört 1732 av bankokommissarien Johan Söderling, av tegel från hans eget tegelbruk på Hästnacken — en av öns äldsta bevarade byggnader, idag privatägd.' },
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-svartso/ — "Etapp Svartsö är en lång men lättvandrad etapp. De knappt arton kilometrarna är för det mesta på vacker grusväg genom beteslandskap", "Dessa är lite mer tekniska." (läst 2026-09-27)
      { icon: '🚶', name: 'Vandring', desc: 'Stockholm Archipelago Trails Svartsö-etapp är knappt 18 km, mest grusväg genom beteslandskap och klassad som lätt. Två partier följer lokalt uppmärkta blomstigar som är lite mer tekniska.' },
      // KÄLLA: https://svartsolanthandel.se/cykeluthyrning — "Vid Ahlsviks brygga väntar Svartsö Lanthandel med cykel och karta över ön. Cykla sedan längs öns 14 km långa, vackra grusvägar genom en levande skärgårdsbygd med öppna ängar och hagar, betande kor och får" (läst 2026-09-27)
      { icon: '🚲', name: 'Cykling', desc: 'Totalt 14 km grusvägar genom ängar, hagar med betande kor och får, skog och förbi insjöar. Svartsö Lanthandel vid Ahlsviks brygga hyr ut cykel med karta över ön.' },
    ],
    // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-svartso-skargardshotell-vandrarhem/ — "Svartsö Skärgårdshotell & Vandrarhem ägs av fyra familjer på Svartsö", "Vi håller öppet och välkomnar gäster året runt.", "Boendet har möjlighet att arrangera möten / konferens." (läst 2026-09-27)
    // KÄLLA: https://www.svartsolanthandel.se/sjobodarna — "Vi har fyra sjöbodar med enkel standard och sammanlagt åtta bäddar." (läst 2026-09-27)
    accommodation: [
      { name: 'STF Svartsö Skärgårdshotell & Vandrarhem', type: 'Vandrarhem', desc: 'Hotell- och vandrarhemsboende med konferens vid Norra Svartsö brygga, öppet året runt. STF-anslutet, ägs av fyra Svartsöfamiljer.', websiteUrl: 'https://www.svenskaturistforeningen.se/boende/stf-svartso-skargardshotell-vandrarhem/' },
      { name: 'Sjöbodarna, Svartsö Lanthandel', type: 'Stugor', desc: 'Fyra stugor med åtta bäddar vid Alsviks brygga intill lanthandeln.', websiteUrl: 'https://www.svartsolanthandel.se/sjobodarna' },
    ],
    getting_there: [
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "13A STOCKHOLM – VAXHOLM – BODA – SÖDRA INGMARSÖ – HUSARÖ", "Alsvik (Svartsö)"; hösttabell 2026: mån–tor 08.15–10.50, lör 08.35–10.50, vardag 14.45–17.45 (läst 2026-09-27)
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-svartso-skargardshotell-vandrarhem/ — "Maj – September trafikerar även Cinderellabåtarna bryggorna Alsvik och Skälvik på södra sidan av Svartsö. Cinderella avgår från Nybroviken, Strandvägen." (läst 2026-09-27)
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: 'ca 2–3 tim', desc: 'Waxholmsbolagets linje 13 från Strömkajen via Vaxholm och Boda till Alsvik och Skälvik på Svartsö; direktturerna tar 2 tim 15 min–3 tim i hösttabellen 2026 (t.ex. lördag 08.35–10.50). Maj–september går även Cinderellabåtarna från Nybroviken till Alsvik och Skälvik.', icon: '⛴' },
      // KÄLLA: http://svartsokrog.se/hitta-hit/ — "Det går också att åka SL-buss från Slussen. Då stiger du av vid Boda brygga eller Lillsved på Värmdö." (läst 2026-09-27)
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "Boda brygga avg."; Boda brygga–Alsvik 20–35 min (t.ex. 10.25–10.50, 13.15–13.45) (läst 2026-09-27); https://www.svenskaturistforeningen.se/boende/stf-svartso-skargardshotell-vandrarhem/ — "Höst, vinter och vår är den smidigaste resvägen till Svartsö att åka bil eller buss till Boda brygga på Värmdö." (läst 2026-09-27)
      { method: 'Buss + Waxholmsbåt', from: 'Slussen via Boda brygga', time: 'båt 20–35 min', desc: 'SL-buss från Slussen till Boda brygga på Värmdö och Waxholmsbåt linje 13 sista biten till Alsvik (20–35 min i hösttabellen 2026). Höst, vinter och vår är det enligt skärgårdshotellet den smidigaste vägen.', icon: '🚌' },
    ],
    harbors: [
      // KÄLLA: https://svartsolanthandel.se/gasthamn — "Hamnen drivs av oss i Svartsö Lanthandel", "Hamnplats är gratis i", "I hamnen finns ett servicehus innehållandes toalett & dusch", "El:" (läst 2026-09-27)
      { name: 'Svartsö gästhamn', desc: 'Gästhamn i Alsvik, driven av Svartsö Lanthandel, med servicehus (toalett och dusch) för gäster som bokat dygn. De första två timmarna är gratis; plats bokas via Dockspot.', fuel: false, service: ['el', 'dusch'] },
    ],
    restaurants: [
      // KÄLLA: http://svartsokrog.se/hitta-hit/ — "Svartsö Krog finns i Alsvik på öns södra del, strax öster om Alsviks brygga."; http://svartsokrog.se/ — "Förändringarna i menyn sker ständigt", "Välj mellan 4-rättersmenyerna eller från à la carte-menyn.", "tel. 08-54247255" (läst 2026-09-27). Öppettider och priser borttagna: öppettidssidan listar bara enskilda datum i september–oktober och menyn saknar datum.
      { name: 'Svartsö Krog', type: 'Restaurang', desc: 'Krog i Alsvik strax öster om Alsviks brygga. Menyn ändras efter säsong och tillgång; fyrarättersmenyer eller à la carte. Se öppettiderna på krogens sida.', slug: 'svartso-krog', websiteUrl: 'http://svartsokrog.se/', phone: '08-542 472 55' },
      // KÄLLA: https://svartsolanthandel.se/ — "Svartsö Lanthandel är en välsorterad butik med fräscha grönsaker och butiksbageri.", "Butiken är ombud för PostNord, DHL, Schenker och UPS. Systembolaget och Apoteket." (läst 2026-09-27). Öppettider och "Helår" borttagna (inga handskrivna öppettider).
      { name: 'Svartsö Lanthandel', type: 'Handel', desc: 'Välsorterad lanthandel med butiksbageri vid Alsviks brygga. Ombud för Systembolaget, Apoteket och PostNord.', websiteUrl: 'https://svartsolanthandel.se/' },
    ],
    day_cost: {
      // KÄLLA: https://waxholmsbolaget.se/ kunde inte verifieras (JS-renderad sajt, ej skrapbar) — exakt biljettpris borttaget tills det kan beläggas
      budget_per_person: 'Beror på båtbiljett, mat och ev. cykeluthyrning',
      includes: 'Båtbiljett t/r (se waxholmsbolaget.se), mat på krogen, ev. cykeluthyrning och proviant',
      breakdown: [
        // KÄLLA: http://svartsokrog.se/hitta-hit/ och svartsolanthandel.se/cykeluthyrning (avgångsorter Strömkajen/Boda brygga)
        { item: 'Waxholmsbåt t/r från Strömkajen/Boda', price: 'Se waxholmsbolaget.se för aktuellt pris' },
        // KÄLLA: http://svartsokrog.se/meny/ — menyn saknar datum, så inget pris anges (läst 2026-09-27)
        { item: 'Varmrätt Svartsö Krog', price: 'Se krogens meny på svartsokrog.se' },
        // KÄLLA: https://svartsolanthandel.se/cykeluthyrning — prislistan saknar datum, så inget pris anges (läst 2026-09-27)
        { item: 'Cykeluthyrning (heldag)', price: 'Se svartsolanthandel.se' },
      ],
      tips: [
        // KÄLLA: http://svartsokrog.se/ — "Boka bord", "tel. 08-54247255" (läst 2026-09-27)
        'Bord på krogen bokas på telefon 08-542 472 55.',
        // KÄLLA: https://svartsolanthandel.se/cykeluthyrning — lanthandeln hyr ut cyklar
        'Hyr cykel vid lanthandeln och cykla runt på ön.',
        // KÄLLA: https://svartsolanthandel.se/ — "Butiken är ombud för PostNord, DHL, Schenker och UPS. Systembolaget och Apoteket." (läst 2026-09-27)
        'Lanthandeln är ombud för Systembolaget och Apoteket.',
      ],
    },
    tips: [
      // KÄLLA: https://svartsolanthandel.se/ — "Vi satsar på ett så brett sortiment som möjligt av produkter från odlare och uppfödare i regionen." (läst 2026-09-27)
      'Lanthandeln satsar på produkter från odlare och uppfödare i regionen och har eget butiksbageri – bra ställe att handla matsäck innan cykelturen.',
      // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-svartso-skargardshotell-vandrarhem/ — "Höst, vinter och vår är den smidigaste resvägen till Svartsö att åka bil eller buss till Boda brygga på Värmdö." (läst 2026-09-27)
      'Utanför sommaren är det ofta smidigast att ta bil eller buss till Boda brygga på Värmdö och byta till båt där.',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-svartso/ — etapp Svartsö, 17,9 km, svårighetsgrad Lätt (2026-09-14)
      'Stockholm Archipelago Trail går genom Svartsö — etappen är knappt 18 km och klassad som lätt.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f79/1649062024749/Svartsö.pdf — "Du får tälta en natt. Vill du tälta längre tid måste du fråga den som äger marken." / "Tälta en natt utan markägarens tillstånd kan man göra runtom på ön, en bra tältplats nära affär och krog finns vid hembygdsgården."
      'Tältning en natt går bra med stöd av allemansrätten; vill du stanna längre måste du fråga markägaren. Värmdö kommun pekar ut hembygdsgården som en bra tältplats nära affär och krog.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f79/1649062024749/Svartsö.pdf — "Elda inte på hällarna och tänk på att det ofta är torrt i markerna i skärgården – och långt till brandkåren. Respektera eldningsförbud"
      'Elda inte på hällarna — markerna torkar snabbt och det är långt till brandkåren. Kolla eldningsförbud innan du tänder något.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f79/1649062024749/Svartsö.pdf — "Storträsk ... Den största av Svartsös fem insjöar och härifrån tar en del av de boende sitt dricksvatten."
      'Storträsk är öns största av fem insjöar och dricksvattentäkt för en del av de boende — respektera det.',
    ],
    activity_meta: {
      // KÄLLA: Stockholm Archipelago Trail, https://stockholmarchipelagotrail.com/section/ (2026-09-17)
      vandring: { trails: 1, max_km: 17.9, sat: { km: 17.9, difficulty: 'Lätt' } },
    },
    related: ['moja', 'gallno', 'ingmarso'],
    tags: ['helårs-ö', 'lanthandel', 'cykling', 'vandring', 'lantligt'],
    // KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-svartso-skargardshotell-vandrarhem/ — "Förr i tiden hade öarna och dess invånare olika öknamn förknippade med djur. Svartsöborna var, och är, stolta grisar." (läst 2026-09-27)
    // KÄLLA: https://www.svartso.se/att-gora — "Varje år, i samband med Svartsödagen, sker den årliga årparaden och svinrodden.", "är en tävling för sumpar och ökor" (läst 2026-09-27)
    did_you_know: 'Förr hade skärgårdsöarnas invånare öknamn efter djur, och Svartsöborna var – och är – stolta grisar, skriver skärgårdshotellet. Varje år på Svartsödagen hålls Svinrodden, en tävling för sumpar och ökor.',
    insiderTips: [
      // KÄLLA: http://svartsokrog.se/hitta-hit/ — "Det går också att åka SL-buss från Slussen. Då stiger du av vid Boda brygga eller Lillsved på Värmdö. Därifrån tar du Waxholmsbåten sista biten till Svartsö och Alsviks brygga." (läst 2026-09-27)
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "Boda brygga avg."; Boda brygga–Alsvik 20–35 min i hösttabellen 2026 (läst 2026-09-27)
      'Boda brygga på Värmdö är en vanlig omstigningspunkt: ta SL-buss från Slussen till Boda och Waxholmsbåten sista biten till Svartsö, 20–35 minuter till Alsvik.',
      // KÄLLA: https://svartsolanthandel.se/ — "Butiken är ombud för PostNord, DHL, Schenker och UPS. Systembolaget och Apoteket." (läst 2026-09-27)
      'Lanthandeln på Svartsö fungerar även som apoteksombud och utlämningsställe för Systembolaget.',
      // KÄLLA: https://svartsolanthandel.se/om-svartso — "Idag bor omkring 65 personer permanent på Svartsö"; https://svartso.se/ — "Svartsö har cirka 60 bofasta personer." (läst 2026-09-27)
      'Svartsö har omkring 60–65 fastboende året runt.',
    ],
    seasonal: {
      // KÄLLA: https://svartso.se/ — "Svartsö är tillgängligt året runt med dagliga skärgårdsbåtar."; https://www.svenskaturistforeningen.se/boende/stf-svartso-skargardshotell-vandrarhem/ — "Vi håller öppet och välkomnar gäster året runt."; https://www.svartsolanthandel.se/sjobodarna — "caféet, som är öppet sommartid" (läst 2026-09-27)
      open: 'Året runt',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      // KÄLLA: http://svartsokrog.se/oppettider/ — "Pizzasöndag 11.30-15.00", "Lammlördag 5-rätters meny"; öppetdagarna 2026 är fredag–söndag i september och lördag–söndag i oktober (läst 2026-09-27)
      bestReason: 'Båtarna går dagligen året runt och skärgårdshotellet har öppet året runt. Caféet vid bryggan har öppet sommartid, och hösten 2026 hade krogen öppet främst helger i september och oktober.',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },
  },
  // ─── RUNMARÖ ─────────────────────────────────────────────────
  {
    slug: 'runmaro',
    name: 'Runmarö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '⛵',
    tagline: 'Författarnas ö i mellersta skärgården — Strindberg, Söderberg och Tranströmer.',
    description: [
      // KÄLLA: https://xn--runmarhembygdsfrening-mecj.se/forfattare/ — Strindberg hyrde hus tre somrar: "Nore 1889, Stenbro 1890, Lerkila 1891"; "Söderberg hyrde samma hus i Stenbro som Strindberg tidigare hade hyrt"
      'Runmarö har en ovanligt tät litteraturhistoria. August Strindberg hyrde hus på ön tre somrar i rad — Nore 1889, Stenbro 1890 och Lerkila 1891 — och Hjalmar Söderberg hyrde senare samma hus i Stenbro som Strindberg hade bott i.',
      // KÄLLA: https://xn--runmarhembygdsfrening-mecj.se/forfattare/ — Tomas Tranströmer (1931–2015): "Morfadern var lots och det blev många sommarlov hos mormor och morfar i Gatan"; Nobelpriset i litteratur 2011; "Dikter från Runmarö" (2001); sidan avslutas "Vänligen respektera att här nämnda boenden ej är utflyktsmål!"
      // KÄLLA: https://xn--runmarhembygdsfrening-mecj.se/kulturstigar/ — "Vi har gjort en karta som visar intressanta stigar och platser på Runmarö. … Kartans röda stigar är märkta med hänvisningsskyltar av trä på plats. På några ställen finns informationsskyltar om kultur och natur." Etapperna har litterära stopp, bl.a. "Vägen mot Silverträsk — August Strindberg" och "Bemärkta sommargäster i Långvik".
      'Tomas Tranströmer (1931–2015), Nobelpristagare i litteratur 2011, tillbringade många sommarlov hos mormor och morfar i Gatan på Runmarö; morfadern var lots. Samlingen "Dikter från Runmarö" kom 2001. Hembygdsföreningen har märkt ut kulturstigar över ön: de röda stigarna på föreningens karta är skyltade med hänvisningsskyltar av trä, på några ställen med informationsskyltar om kultur och natur, och etapperna har litterära stopp som Strindberg vid Silverträsk och sommargästerna i Långvik. Husen som nämns är privatbostäder — föreningen ber uttryckligen att de inte uppsöks som utflyktsmål.',
      // KÄLLA: https://xn--runmarhembygdsfrening-mecj.se/kalkhallar/ — "Där det finns urkalksten på Runmarö ser man en särpräglad och färgsprakande blomsterprakt och en stor rikedom på orkidéer"; apollofjärilen "finns bara på platser med kalkberggrund"
      'Berggrunden gör ön botaniskt udda. Där urkalkstenen går i dagen växer en särpräglad och färgsprakande flora med stor rikedom på orkidéer, och här finns också apollofjärilen, som bara förekommer på platser med kalkberggrund.',
      // KÄLLA: Runmarö, https://www.runmaro.se/om — "Från Stavsnäs Vinterhamn finns det gott om reguljära förbindelser till Runmarö med Waxholmsbolaget eller andra båtbolag"; "Utgår du från Stockholm tar du buss 433 eller 434 från Slussen. Bussresan till Stavsnäs tar ca 50 minuter" (läst 2026-09-19)
      // KÄLLA: Runmarö, https://www.runmaro.se/om — "Från Stavsnäs Vinterhamn finns det gott om reguljära förbindelser till Runmarö med Waxholmsbolaget eller andra båtbolag"; "Utgår du från Stockholm tar du buss 433 eller 434 från Slussen. Bussresan till Stavsnäs tar ca 50 minuter" (läst 2026-09-19) ; Stockholm Archipelago Trail, https://stockholmarchipelagotrail.com/sv/section/etapp-runmaro/ — "Du åker till Runmarö flera gånger om dagen från Stavsnäs eller Sandhamn, året om." (läst 2026-09-19)
      'Ön nås från Stavsnäs Vinterhamn med Waxholmsbolaget eller andra båtbolag, flera gånger om dagen året om, och även från Sandhamn. Från Stockholm tar man buss 433 eller 434 från Slussen till Stavsnäs, en bussresa på ungefär 50 minuter.',
      // KÄLLA: https://runmaro.se/om — bageri (Låttas Bageri), krog/restaurang (Svängen), affär (Tempo Runmarö)
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-runmaro/ — "På Runmarö finns affär, skola, restaurang och bageri"; cykeluthyrning vid affären eller båthamnen
      'Ön har affär, bageri, krog och skola — det är en ö där folk bor, inte bara hyr. Cykel går att hyra vid affären eller båthamnen.',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-runmaro/ — "Grusvägar genom öppna beteslandskap tar dig till skogsvägar genom gles bebyggelse"; "stigar genom trolsk skog"
      'Landskapet växlar mellan grusvägar genom öppna beteslandskap, skogsvägar genom gles bebyggelse och stigar genom tät skog. Vattnet är aldrig långt bort, och klipporna gör sig lika bra till handduk som till utsiktsplats.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f78/1649062024310/Runmarö.pdf (Värmdö kommun, "Runmarö – en oas i havet"), punkt 7 "Kalkbruket" — "På Runmarö har det brutits kalk sedan 1200-talet. Bland annat har slottet Tre Kronor och Riddarholmskyrkan byggts av Runmarökalk."
      'Kalken har inte bara gett ön blommor. På Runmarö har kalk brutits sedan 1200-talet, och Värmdö kommun uppger att både slottet Tre Kronor och Riddarholmskyrkan byggts med Runmarökalk. Kalkbrottet finns kvar som en plats att gå till.',
      // KÄLLA: https://www.lansstyrelsen.se/download/18.1b1d393819324610c3749289/1732517028266/Förorenade områden - inventering av gruvbranschen i Stockholms län.pdf (Länsstyrelsen Stockholm) — "Sulfidmineralen zinkblände och blyglans bröts på Runmarö i Stockholms skärgård. En mängd av 4 771 ton zinkmalm utvanns i början av 1900-talet." / "Värmdös gruvor är med få undantag belägna på Runmarö. Här finns cirka sju sulfidmalmsbrott eller större skärpningar. De tre gruvorna Kilagruvorna, Söderbygruvorna och Vånögruvorna, alla belägna på Runmarö"
      'Ön har också varit gruvö. Länsstyrelsen räknar cirka sju sulfidmalmsbrott eller större skärpningar på Runmarö — Kilagruvorna, Söderbygruvorna och Vånögruvorna — där zinkblände och blyglans bröts. I början av 1900-talet utvanns 4 771 ton zinkmalm. Gruvhålen står kvar i skogen; gå inte ner i dem.',
      // KÄLLA: https://xn--runmarhembygdsfrening-mecj.se/lotsbyar/ (Runmarö Hembygdsförening) — år 1703 kom "nio av nitton Stockholmslotsar" från Runmarö; år 1797 var "49 av 68 Stockholmslotsar" bosatta på ön; lotsstationen Berghamn mellan Värmdö och Runmarö etablerades 1741 och upphörde i början av 1900-talet; då byggdes "den lilla lotsutkiken på berget i Styrsvik"
      'Lotsningen präglade ön i sekler. År 1703 kom nio av nitton Stockholmslotsar från Runmarö, och 1797 bodde 49 av 68 Stockholmslotsar här. Lotsstationen Berghamn mellan Värmdö och Runmarö hade lotsar anställda sedan 1741 och lades ner i början av 1900-talet — då byggdes den lilla lotsutkiken på berget i Styrsvik, som fortfarande går att gå upp till.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f78/1649062024310/Runmarö.pdf, punkt 4 "Långvik" — "Här låg också Runmarös första lotshemman och när laga skifte genomfördes 1849 bodde inte mindre än fem lotsar här." / punkt 20 — byarna Norrsunda och Södersunda är "sannolikt öns äldsta byar ... Dessa byar har varit boplatser för generationer av lotsar."
      'Långvik i norr är öns nordligaste by och platsen för Runmarös första lotshemman; vid laga skiftet 1849 bodde fem lotsar där. Norrsunda och Södersunda vid sundet mot Storön är sannolikt öns äldsta byar och har varit boplatser för generationer av lotsar.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f78/1649062024310/Runmarö.pdf, punkt 2 "Gatan" — "Strax sydväst om Gatan finns ett område som kallas Ryssflykten efter att ryska soldater slagit läger här under rysshärjningarna sommaren 1719 ... Ett hundratal fartyg och tusentals man övernattade ett par nätter på Runmarö i sluttningen mot fjärden. Här finns än i dag ett tiotal ryssugnar"
      'Sommaren 1719 låg ett hundratal ryska fartyg och tusentals man i land på Runmarö ett par nätter i sluttningen mot Gatufjärden. Området kallas än i dag Ryssflykten, och ett tiotal ryssugnar — soldaternas eldstäder — ligger kvar i terrängen vid Gatan.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f78/1649062024310/Runmarö.pdf, punkt 16 — "Telegrafberget i Solberga är ett 36 m högt utsiktsberg. Det har fått sitt namn efter en optisk telegraf som användes bl a under kriget mot Ryssland 1809-1811. Den ingick i signallinjen Korsö - Ingarö - Stockholm. Redan på 1700-talet var en vårdkase placerad på samma plats."
      'Telegrafberget i Solberga är 36 meter högt och öns självklara utsiktspunkt. Namnet kommer från en optisk telegraf som ingick i signallinjen Korsö–Ingarö–Stockholm och användes bland annat under kriget mot Ryssland 1809–1811. Redan på 1700-talet stod en vårdkase på samma plats.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f78/1649062024310/Runmarö.pdf, Natur — "Den kalkrika berggrunden ger förutsättningar för en stor blomsterprakt med 27 olika orkidéer, som den pampiga guckuskon och de blyga flugblomstren." / "På ön finns nio insjöar som alla en gång varit havsvikar."
      'Värmdö kommun räknar 27 olika orkidéarter på Runmarö, från den pampiga guckuskon till de blyga flugblomstren. Ön har också nio insjöar, som alla en gång var havsvikar innan landhöjningen stängde dem — Vitträsket fick sitt namn av kalken, som gör vattnet ovanligt klart.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f78/1649062024310/Runmarö.pdf, punkt 6 "Silverträsket" — "Här finns vackra näckrosor och ovanliga köttätande växter. Och Strindberg har namngett en novell efter sjön."
      // KÄLLA: samma PDF, punkt 5 "Stenbro" — "Här bodde Strindberg 1890 och beskrev i sina brev byn som 'betagande'. Hjalmar Söderberg hyrde samma hus sommaren 1901 och skrev här ett första kapitlet i 'Den allvarsamma leken'."
      'Litteraturen sitter i landskapet. Strindberg kallade Stenbro "betagande" i sina brev, och i samma hus skrev Hjalmar Söderberg sommaren 1901 det första kapitlet av "Den allvarsamma leken". Silverträsket, som Strindberg namngav en novell efter, ligger inbäddat i hög skog och har näckrosor och ovanliga köttätande växter.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f78/1649062024310/Runmarö.pdf, "Runmarö idag" — "Runmarö är en levande skärgårdsö med bofast befolkning på cirka 250 personer ... Här finns förskola, skola, kapell och hembygdsgård ... Flera båtvarv är verksamma på ön."
      // KÄLLA: samma PDF, punkt 12 — "Kyrkogården med klockstapel invigdes sommaren 1958. kapellet invigdes 1973." / punkt 11 — hembygdsgården "byggd på 1880-talet var fram till 1953 öns skolhus"
      'Runmarö har omkring 250 bofasta och flera verksamma båtvarv. Kapellet i Uppeby invigdes 1973, medan kyrkogården med klockstapel togs i bruk redan 1958. Hembygdsgården intill är byggd på 1880-talet och var öns skolhus fram till 1953.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f78/1649062024310/Runmarö.pdf, Historia — "De första Runmaröborna slog sig vid medeltiden ned vid de många havsvikarna som gav lä och skydd ... Vid slutet av 1800-talet började stockholmare komma som sommargäster till ön. De hyrde in sig hos ortsbefolkningen och i något av öns tolv pensionat"
      'De första Runmaröborna slog sig ner vid medeltiden i de skyddade havsvikarna, där fisket och senare lotsningen bar upp gårdarna. Vid slutet av 1800-talet kom stockholmarna som sommargäster — ön hade tolv pensionat innan de så småningom byggde egna hus.',
    ],

    facts: {
      // KÄLLA: Waxholmsbolaget linje 16, https://kund.printhuset-sthlm.se/wa/v16.pdf — "16A STAVSNÄS – SANDHAMN – HAGEDE", gäller 2 april–18 juni och 17 augusti–12 december 2026; Stavsnäs 07.00 → Styrsvik (Runmarö) 07.05, 09.45 → 09.50, 14.45 → 14.50, alltså ca 5 minuter (läst 2026-09-19)
      travel_time: 'ca 5 min från Stavsnäs med Waxholmsbåt (linje 16/17)',
      character: 'Lugnt, naturnära, knutpunkt för seglare',
      season: 'Maj–September',
      best_for: 'Seglare, naturhamnsankring, de som söker lugnet nära Sandhamn',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      { icon: '✍️', name: 'Tranströmer-spåret', desc: 'Promenera till "Gatan" där Tomas Tranströmer tillbringade somrarna i morfaderns lotshus — miljön bakom diktcykeln "Östersjöar".' },
      { icon: '🚲', name: 'Cykling', desc: 'En av skärgårdens mest cykelvänliga öar. Platta, öppna grusvägar med skog emellan gör alla bryggor lättillgängliga. Cykla till "Gatan" — Nobelpristagaren Tranströmers sommarmiljö och miljön bakom diktcykeln Östersjöar.' },
      { icon: '⛵', name: 'Segling', desc: 'Klassisk passage och stopp på Stavsnäs-leden mot Sandhamn.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Klippbad längs öns kustlinje.' },
    ],
    // KÄLLA: https://runmarobatvarv.se/ — gästbrygga med båtplatser, inga stugor; https://runmaro.se/: Runmarö Krog är nedlagd ("F.d. Runmarö Krog") (läst 2026-09-14)
    accommodation: [
      { name: 'Runmarö Båtvarv — gästbrygga', type: 'Gästhamn', desc: 'Gästplatser för båtar vid Runmarö Båtvarv. Inget boende på land är belagt på ön.', websiteUrl: 'https://runmarobatvarv.se' },
    ],
    // KÄLLA: Waxholmsbolagets tidtabeller linje 16 och 17 (https://kund.printhuset-sthlm.se/wa/v16.pdf, v17.pdf, gäller 2 apr–18 jun och 17 aug–12 dec 2026): Stavsnäs–Styrsvik ca 5 min. Gatan är märkt X, "Bryggorna trafikeras utan fast avgångstid" (beställs enligt anmärkning C), medan Långvik har fasta klockslag i varje kolumn. Genomgående turer Strömkajen 10.00 → Styrsvik 13.55 och Strömkajen 16.25 → Styrsvik 20.20, alltså ca 3 tim 55 min (läst 2026-09-14). Stod 11–20 min, "nås ej från Strömkajen", Långvik som beställningsbrygga och 2–2,5 h — allt fel.
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Stavsnäs', time: 'ca 5 min', desc: 'Waxholmsbolagets linje 16 och 17 från Stavsnäs; Styrsvik är huvudbryggan. Gatan angörs på beställning (utan fast avgångstid), medan Långvik har fasta klockslag. Linje 17 går också hela vägen till Strömkajen via Nämdö och Saltsjöbaden, ca 3 tim 55 min.', icon: '⛴' },
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Gästhamn i Styrsvik.', icon: '⛵' },
    ],
    harbors: [
      // KÄLLA: runmarobatvarv.se/tjänster/gästhamn-marina — "Gästbrygga … Anslutning Landström", Solberga. Ingen källa för bränsle, vatten eller dusch.
      { name: 'Runmarö Båtvarv gästbrygga (Solberga)', desc: 'Gästbrygga vid Runmarö Båtvarv i Solberga med landström.', fuel: false, service: ['el'] },
    ],
    restaurants: [
      // KÄLLA: https://runmaro.se/ (öns egen sida) — "F.d. Runmarö Krog" är nedlagd; aktiva: "Svängen, Krog och restaurang" och "Tempo Runmarö". Inga öppettider anges där.
      { name: 'Svängen', type: 'Restaurang', desc: 'Krog och restaurang på ön.', book_required: false },
      { name: 'Tempo Runmarö', type: 'Handel', desc: 'Öns lanthandel — proviant och dagligvaror.' },
    ],
    tips: [
      // KÄLLA: https://runmaro.se/om — "buss 433 eller 434 från Slussen. Bussresan till Stavsnäs tar ca 50 minuter"
      'Från Slussen går buss 433 och 434 till Stavsnäs, ca 50 minuter, och därifrån båt till Runmarö.',
      // KÄLLA: https://stockholmarchipelagotrail.com/sv/section/etapp-runmaro/ — cykeluthyrning vid affären eller båthamnen
      'Cykel kan hyras vid affären eller båthamnen — grusvägarna gör ön lätt att ta sig runt på.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f78/1649062024310/Runmarö.pdf, Kommunikationer — "Båten över till Runmarö tar 10 minuter. I Stavsnäs finns även parkeringsmöjligheter men under högsäsong kan det vara svårt att hitta en ledig parkeringsplats."
      'Överfarten från Stavsnäs tar tio minuter. Det finns parkering i Stavsnäs, men under högsäsong kan den vara full — kollektivt är säkrare.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f78/1649062024310/Runmarö.pdf — "Med egen båt kan man ankra i bl a Norrviken på Storön, där Svenska Kryssarklubben håller till. Vid Runmarö Varv i Solberga finns gästhamn med toalett och dusch."
      'Med egen båt: gästhamn med toalett och dusch vid Runmarö Varv i Solberga, och ankringsmöjlighet i Norrviken på Storön.',
      // KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f78/1649062024310/Runmarö.pdf — "Det finns ingen campingplats, men möjlighet att tälta någon natt." / "Du får tälta en natt. Vill du tälta längre tid måste du fråga den som äger marken."
      'Det finns ingen campingplats på Runmarö. Allemansrätten räcker till en natt — längre kräver markägarens tillstånd.',
    ],
    activity_meta: {
      // KÄLLA: Stockholm Archipelago Trail, https://stockholmarchipelagotrail.com/section/ (2026-09-17)
      vandring: { trails: 1, max_km: 18.5, sat: { km: 18.5, difficulty: 'Medel' } },
    },
    related: ['sandhamn', 'moja', 'gallno'],
    tags: ['segling', 'naturhamn', 'bränsle', 'lugnt', 'mellersta'],
    // KÄLLA: https://xn--runmarhembygdsfrening-mecj.se/kalkhallar/ — apollofjärilen är "en av Sveriges största fjärilsarter och den finns bara på platser med kalkberggrund"
    // KÄLLA: https://xn--runmarhembygdsfrening-mecj.se/forfattare/ — "Söderberg hyrde samma hus i Stenbro som Strindberg tidigare hade hyrt"
    did_you_know: 'Runmarös urkalksten ger ön orkidéer och apollofjäril — en av Sveriges största fjärilsarter, som bara lever där berggrunden är kalkhaltig. Hjalmar Söderberg hyrde samma hus i Stenbro på Runmarö som August Strindberg hade hyrt före honom.',
    insiderTips: [
      'Tomas Tranströmer och hans familj bodde på Runmarö under lång tid. Tranströmer sammanställde ett urval dikter under titeln \'Dikter från Runmarö\'.',
      'Runmarö nås med bilfärja och det är möjligt att ta med bil till ön.',
      'Ön är en av de mer lantliga och tystlåtna i mellersta skärgården med goda möjligheter för cykling och vandring.',
      'Lanthandeln och caféet på Runmarö har kort säsong. Öppettiderna är begränsade utanför juli och delar av augusti.',
    ],
    seasonal: {
      open: 'Juni–Augusti',
      peak: 'Juli',
      best: 'Juli',
      bestReason: 'Det är i juli som Runmarö vaknar — lanthandeln och caféet öppna, gästhamnen med liv, och Runmarösund i sitt vackraste.',
      warning: 'Lanthandeln och caféet har kort säsong — öppet i juli och delar av augusti. Ta med egna proviant om du besöker utanför den perioden.',
      months: ['off','off','off','off','limited','open','peak','open','limited','off','off','off'],
    },
  },
  // ─── RESARÖ ──────────────────────────────────────────────────
  {
    slug: 'resaro',
    name: 'Resarö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🏡',
    tagline: 'Välmående villaö nära Vaxholm — lättillgänglig med bil och buss.',
    description: [
      'Resarö är en mellanstor ö i mellersta skärgården som erbjuder varierad natur och möjligheter för både kajak och segling. Ön är populär bland naturälskare.',
      'Resarö kombinerar skogsrika områden med väl utvecklad kustlinje och flera goda ankringslägen. Det finns en gästhamn och grundläggande service.',
      'Resarö passar väl för seglare som söker ett gott ankringsläge i mellersta skärgården, eller för kajakvinnare.'
    ],

    facts: {
      travel_time: 'Buss 670 + 682 från Stockholm / 10 min med bil från Vaxholm',
      character: 'Lättillgänglig, villa-ö, badvänlig',
      season: 'April–Oktober',
      best_for: 'Dagstur, bad, familjer, bilanpassad',
    },
    activities: [
      { icon: '🏊', name: 'Klippbad', desc: 'Öns södra udde har ett av regionens populäraste klippbad.' },
      { icon: '🚶', name: 'Promenad', desc: 'Vandra längs öns stigar och beundra den historiska villaarkitekturen.' },
      { icon: '🚲', name: 'Cykling', desc: 'Cykla från Vaxholms hamn via bron till Engarn och vidare till Resarö. Sevärt: Ytterby gruva — sju grundämnen (yttrium, erbium m.fl.) upptäcktes här. Ca 10–15 km tur-retur med fin kustvy.' },
    ],
    accommodation: [
      { name: 'Sommarstugor', type: 'Stugor', desc: 'Privatuthyrning sommartid.' },
    ],
    // KÄLLA: SL buss 682 Engarn–Resarö (https://kund.printhuset-sthlm.se/sl/h682.pdf, gäller 17 aug–12 dec 2026); buss 670 Tekniska högskolan–Vaxholm passerar Engarn (läst 2026-09-14). Stod "buss 676 till Resarö" — 676 går Tekniska högskolan–Norrtälje. "50 min" obelagt, borttaget. Bilpunkten ("Resarö är landfast — bilväg från Vaxholm", 10 min) är också borttagen: tidtabellerna säger ingenting om landfasthet, bilväg eller körtid, och ingen annan källa angavs.
    getting_there: [
      { method: 'Buss', from: 'Stockholm', desc: 'SL-buss 670 (Tekniska högskolan/Danderyds sjukhus–Vaxholm) till Engarn, byte till buss 682 Engarn–Resarö (Ytterby, Överby).', icon: '🚌' },
    ],
    harbors: [
    ],
    restaurants: [
    ],
    tips: [
      'Resarö är ett utmärkt val för den som vill till skärgården utan att ta båt.',
      'Klippbadet på södra udden är bäst tidig morgon innan det fylls.',
    ],
    related: ['vaxholm', 'rindo', 'grinda'],
    tags: ['lättillgänglig', 'bad', 'villa', 'dag-tur', 'bil'],
    did_you_know: 'Resarö nås landvägen från Vaxholm via Eriksberg och är en av få ”skärgårdsöar” där man når sjönära klippbad på en kort bilresa från Stockholm. Stora delar av öns äldre bebyggelse är från sekelskiftet 1900 då Resarö blev sommarö för Stockholmsfamiljer.',
    seasonal: {
      open: 'April–Oktober',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Nära Stockholm med bra kommunikationer — fungerar bra utanför högsäsong.',
      months: ['off','off','off','limited','open','open','peak','peak','open','open','limited','off'],
    },

  },
  // ─── HUSARÖ ──────────────────────────────────────────────────
  {
    slug: 'husaro',
    name: 'Husarö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌿',
    // KÄLLA: https://stockholmslansmuseum.se/besoksmal/husaro/ — "Husarö är ett gammalt lotssamhälle mellan Ljusterö och Möja. Bebyggelsen är från 1800-talet och ligger tätt samlad vid hemmaviken." (läst 2026-09-27)
    // KÄLLA: https://www.husaro.se/om-husaro/ — "Utställningar om lotsar hittar du på öns lotsmuseum" (läst 2026-09-27)
    tagline: 'Gammalt lotssamhälle mellan Ljusterö och Möja — by från 1800-talet, badvikar och lotsmuseum.',
    description: [
      // KÄLLA: https://stockholmslansmuseum.se/besoksmal/husaro/ — "Husarö är ett gammalt lotssamhälle mellan Ljusterö och Möja. Bebyggelsen är från 1800-talet och ligger tätt samlad vid hemmaviken.", "Numera finns endast några enstaka bofasta på Husarö men sommartid är det desto livligare." (läst 2026-09-27)
      // KÄLLA: https://www.husaro.se/om-husaro/ — "Husarö, som ligger i Österåkers kommun, är ungefär 2,5 km lång." (läst 2026-09-27)
      'Husarö är ett gammalt lotssamhälle mellan Ljusterö och Möja, i Österåkers kommun. Byns hus är från 1800-talet och ligger tätt samlade vid hemmaviken. Numera finns bara några enstaka bofasta, men sommartid är det desto livligare.',
      // KÄLLA: https://www.husaro.se/om-husaro/ — "Kulturlandskap med ängar och lövträd, som skiftar under vandringen till vacker tallskog och släta klippor." (läst 2026-09-27)
      // KÄLLA: http://husarohandel.se/husar-handel---om-oss — "Vid Husarö ångbåtsbrygga ligger den nyrenoverade sjömacken med gästhamn." (läst 2026-09-27)
      // KÄLLA: http://husarohandel.se/ — "Ca 300 m från gästhamnen finns Husarö Lanthandel", "Macken är stängd då vi väntar på tillstånd.", "Gästhamnnen är obemannad för tillfället då macken för närvarande är stängd" (läst 2026-09-27)
      'Naturmässigt är Husarö varierad: kulturlandskap med ängar och lövträd i byn, tallskog och släta klippor längre ut. Ön är ungefär 2,5 km lång — allt nås till fots. Vid ångbåtsbryggan ligger Husarö Handels gästhamn, och cirka 300 meter därifrån ligger lanthandeln. Sjömacken är stängd i väntan på tillstånd, och gästhamnen är därför obemannad.',
      // KÄLLA: https://www.husaro.se/att-se-och-gora/ — "Sista lördagen i juli varje år firas Husarödagen med bl.a Husarömaran … skärgårdsmarknad och visning av … i Sundströmska lotsgården." (läst 2026-09-27)
      'Sista lördagen i juli firas Husarödagen med Husarömaran runt ön, skärgårdsmarknad och visning av lotsmuseet i Sundströmska lotsgården.'
    ],

    facts: {
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Går under perioden 14 september - 12 december." (läst 2026-09-27). Restider Strömkajen–Husarö i tabellen (vår/höst 2026): söndag 08.40–11.45 och vardag 17.30–20.35 = 3 tim 5 min; lördag 08.30–11.45 = 3 tim 15 min; måndag–torsdag 08.15–12.10 = 3 tim 55 min.
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "13A STOCKHOLM – VAXHOLM – BODA – SÖDRA INGMARSÖ – HUSARÖ", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026" (läst 2026-09-27). Via Boda: 08.15–12.10 (3 tim 55 min), 15.30–19.10 (3 tim 40 min), 14.45–18.50 (4 tim 5 min).
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA" (läst 2026-09-27). Åsättra–Husarö t.ex. 14.05–14.50 och 16.10–16.55 = 45 min, 10.50–11.40 = 50 min.
      travel_time: 'Ca 3–4 tim med Waxholmsbåt från Strömkajen (linje 12/13, snabbast 3 tim 5 min); ca 45–50 min från Åsättra på Ljusterö (linje 10)',
      // KÄLLA: https://stockholmslansmuseum.se/besoksmal/husaro/ — "Bebyggelsen är från 1800-talet och ligger tätt samlad vid hemmaviken.", "Numera finns endast några enstaka bofasta på Husarö" (läst 2026-09-27)
      // KÄLLA: http://husarohandel.se/ — "det finns många grusvägar och stigar för vandring och badmöjligheter" (läst 2026-09-27)
      character: 'Lotsby från 1800-talet, grusvägar och stigar, några enstaka bofasta',
      // UPPSKATTNING: säsongen är en bedömning; Waxholmsbolaget trafikerar Husarö året runt (https://stockholmslansmuseum.se/besoksmal/husaro/: "Waxholmsbolaget trafikerar Husarö hela året.").
      season: 'Maj–September',
      // KÄLLA: https://www.husaro.se/att-se-och-gora/ — "På Husarö kan du bl.a vandra, bada, fiska." (läst 2026-09-27); http://husarohandel.se/ — "Gästhamnen är en lång pontonbrygga" (läst 2026-09-27)
      best_for: 'Vandring, bad och fiske, båtfolk, lotshistoria',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      // KÄLLA: https://www.husaro.se/om-husaro/ — "Husarö, som ligger i Österåkers kommun, är ungefär 2,5 km lång.", "Kulturlandskap med ängar och lövträd, som skiftar under vandringen till vacker tallskog och släta klippor." (läst 2026-09-27)
      { icon: '🚶', name: 'Vandring', desc: 'Ön är bara 2,5 km lång men skiftar från ängar och lövträd i byn till tallskog och släta klippor.' },
      // KÄLLA: https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "Badplatserna Sandholmen, Badviken, Bockholmen och Kallviken är några exempel." (läst 2026-09-27)
      { icon: '🏊', name: 'Bad', desc: 'Sandholmen, Badviken, Bockholmen och Kallviken är några av öns badplatser.' },
      // KÄLLA: https://stockholmslansmuseum.se/besoksmal/husaro/ — "De försörjde sig också på fiske, säljakt och lite jordbruk." (läst 2026-09-27); https://www.husaro.se/att-se-och-gora/ — "På Husarö kan du bl.a vandra, bada, fiska." (läst 2026-09-27)
      { icon: '🎣', name: 'Fiske', desc: 'Lotsarna på Husarö försörjde sig också på fiske, säljakt och lite jordbruk. I dag står fiske med bland det du kan göra på ön, tillsammans med vandring och bad.' },
      // KÄLLA: http://husarohandel.se/ — "Gästhamnen är en lång pontonbrygga med Y-bommar och mooringlinor och bojar. Inre delen av hamnen har begränsat djupgående och rekommenderas inte för segelbåtar." (läst 2026-09-27); https://stockholmslansmuseum.se/besoksmal/husaro/ — "Mellan 1740 och 1912 var Husarö officiell lotsplats" (läst 2026-09-27)
      { icon: '⛵', name: 'Segling', desc: 'Gästhamnen vid ångbåtsbryggan är en lång pontonbrygga med Y-bommar, mooringlinor och bojar. Inre delen av hamnen har begränsat djup och rekommenderas inte för segelbåtar. Husarö var officiell lotsplats 1740–1912.' },
    ],
    accommodation: [
      // KÄLLA: https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "Du kan även hyra stuga i stugbyn.", "Scoutgården används framförallt till scoutlägren under sommarhalvåret, men hyrs också ut till konferenser, skolklasser och annan verksamhet." (läst 2026-09-27); https://www.husaro.se/ — "Hyr stuga." (läst 2026-09-27)
      { name: 'Stugor på Husarö', type: 'Stugor', desc: 'Det går att hyra stuga i öns stugby. Den gamla scoutgården hyrs också ut till konferenser, skolklasser och andra grupper utanför scoutlägren på sommaren.' },
    ],
    getting_there: [
      // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst" (läst 2026-09-27); se restider under facts.
      // KÄLLA: https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "Ta bussen från Åkersberga station till Åsättra brygga på Ljusterö. Därifrån tar du färjan vidare till Husarö och våra andra öar." (läst 2026-09-27)
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: 'ca 3–4 tim', desc: 'Linje 12 och 13 via Vaxholm, snabbast 3 tim 5 min enligt vår- och hösttidtabellen 2026. Kortare båtresa: buss från Åkersberga station till Åsättra brygga på Ljusterö och linje 10 därifrån, ca 45–50 min. Vissa turer angör bara efter beställning (b i tidtabellen).', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: http://husarohandel.se/ — "Gästhamnen är en lång pontonbrygga med Y-bommar och mooringlinor och bojar.", "Då vi inte är på plats har vi av säkerhetsskäl stängt av elen", "Det finns nya toaletter i kommunens regi", "Tyvärr finns inget färskvatten.", "Macken är stängd då vi väntar på tillstånd.", "Boka gästhamnsplats via Dockspot" (läst 2026-09-27)
      { name: 'Husarö Handel gästhamn', desc: 'Lång pontonbrygga med Y-bommar, mooringlinor och bojar vid ångbåtsbryggan; plats bokas via Dockspot. Sjömacken är stängd i väntan på tillstånd och gästhamnen är obemannad, så elen är avstängd. Nya toaletter i kommunens regi, men inget färskvatten.', fuel: false, service: ['toalett'] },
    ],
    restaurants: [
      // KÄLLA: http://husarohandel.se/ — "Ca 300 m från gästhamnen finns Husarö Lanthandel som har övriga livsmedel, fika och enklare förtäring." (läst 2026-09-27)
      // KÄLLA: https://www.husaro.se/lankar/ — "Husarös egna lanthandel som drivs av Henkan och Kattis. Under sommarperioden serveras även lättare maträtter och du kan njuta av en öl eller ett glas vin." (läst 2026-09-27)
      { name: 'Husarö Lanthandel', type: 'Café', desc: 'Öns lanthandel, cirka 300 meter från gästhamnen, med livsmedel, fika och enklare förtäring. Sommartid serveras även lättare maträtter, öl och vin.' },
    ],
    tips: [
      // KÄLLA: http://husarohandel.se/ — "Tyvärr finns inget färskvatten. Det finns däremot på vår andra mack vid Klintsundet som ligger tvärs över Gälnan.", "stängt av elen" (läst 2026-09-27)
      'Gästhamnen har inget färskvatten och elen är avstängd så länge hamnen är obemannad — fyll vatten innan, till exempel vid Husarö Handels andra mack vid Klintsundet på Ljusterö.',
      // KÄLLA: https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "Du kan söka på hela sträckan Åkersberga–Husarö direkt i SL-appen." (läst 2026-09-27); https://kund.printhuset-sthlm.se/wa/h10.pdf — "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA" (läst 2026-09-27)
      'Kortaste båtresan går från Åsättra på Ljusterö med linje 10, ca 45–50 minuter. Dit går buss från Åkersberga station, och hela sträckan går att söka i SL-appen.',
    ],
    related: ['finnhamn', 'ingmarso', 'ljustero'],
    tags: ['bilfri', 'orört', 'segling', 'vandring', 'lugnt'],
    // KÄLLA: https://stockholmslansmuseum.se/besoksmal/husaro/ — "I den så kallade kung Valdemars jordebok från 1200-talet som är den äldsta seglingsbeskrivningen genom skärgården, finns Husarö med under namnet Husarn.", "Mellan 1740 och 1912 var Husarö officiell lotsplats och under segelsjöfartens storhetstid vid slutet av 1800-talet arbetade ett 20-tal lotsar på Husarö." (läst 2026-09-27)
    // KÄLLA: https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "På ön finns också Elsa Beskows hus där hon hämtat inspiration till boken Puttes äventyr i Blåbärsskogen." (läst 2026-09-27); https://www.husaro.se/om-husaro/ — "Husarö bedöms vara av riksintresse för kulturmiljövården." (läst 2026-09-27). OBS: Skärgårdsstiftelsens Lilla Husarn är en annan ö vid Nämdö.
    did_you_know: 'Husarö finns med redan i kung Valdemars jordebok från 1200-talet, då som "Husarn". Ön var officiell lotsplats 1740–1912 med ett tjugotal lotsar när segelsjöfarten var som störst. Elsa Beskow hade sitt sommarhus här, och byn är i dag riksintresse för kulturmiljövården.',
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Juni',
      // KÄLLA: http://husarohandel.se/ — "det finns många grusvägar och stigar för vandring och badmöjligheter" (läst 2026-09-27); https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html — "Badplatserna Sandholmen, Badviken, Bockholmen och Kallviken är några exempel." (läst 2026-09-27)
      bestReason: 'Försommar före högsäsongen: gå grusvägarna och stigarna mellan byn och klipporna och bada vid Sandholmen, Badviken, Bockholmen eller Kallviken.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },

  },
  // ─── FEJAN ───────────────────────────────────────────────────
  {
    slug: 'fejan',
    name: 'Fejan',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🪨',
    tagline: 'En av norra skärgårdens finaste naturhamnar — klara vatten och vita klippor.',
    description: [
      'Fejan är en av de yttersta bebodda öarna i norra Stockholms skärgård, mot Ålandshav. Ön har bofast historia sedan 1856 och blev känd som östkustens karantänsstation från 1892, sjukhuset "Wasa" stod kvar i drift fram till 1930-talet och flera av dåtidens byggnader finns ännu kvar.',
      'Skärgårdsstiftelsen arrenderade området från Fortifikationsverket 1994 och tog över ägandet 2013. Idag drivs sjökrog, gästhamn och bastu (vandrarhemmet håller stängt under 2026) i karantänsstationens äldre byggnader.',
      'Fejan nås med skärgårdsbåt från Räfsnäs, eller med egen båt, gästhamnen är ett populärt stopp för seglare på Furusundsleden.',
    ],
    facts: {
      travel_time: 'Nås med skärgårdsbåt (Waxholmsbolaget) från Räfsnäs, ca 30 min — eller med privat båt från Furusund',
      character: 'Orört, naturreservat, vitt klipplandskap',
      season: 'Juni–Augusti',
      best_for: 'Seglare, naturälskare, snorkling, fotografer',
    },
    activities: [
      { icon: '🏊', name: 'Klippbad', desc: 'Kristallklart vatten och vita klippor. En av norra skärgårdens finaste badplatser.' },
      { icon: '⛵', name: 'Naturhamnsankring', desc: 'Skyddad inhamn med eldstäder avsedda för besökare. Populär övernattningsplats.' },
      { icon: '🐟', name: 'Snorkling', desc: 'Klart vatten med bra sikt. Havsfauna i fin miljö.' },
      { icon: '🌅', name: 'Solnedgångsfotografering', desc: 'Vita klippor i solnedgång — naturreservatets mest fotograferade vy.' },
    ],
    accommodation: [
      { name: 'Ankring / Tält', type: 'Camping', desc: 'Ankring i naturhamnen eller tältning på anvisad plats i naturreservat.' },
    ],
    getting_there: [
      { method: 'Skärgårdsbåt', from: 'Räfsnäs', time: '30 min', desc: 'Reguljär skärgårdsbåt från Räfsnäs (norr om Norrtälje) — kontrollera aktuell tidtabell hos Waxholmsbolaget.', icon: '⛴' },
      { method: 'Egen båt', from: 'Furusund', time: '30–60 min', desc: 'Naturligt stopp på Furusundsleden norrut.', icon: '⛵' },
    ],
    harbors: [
      // KÄLLA: https://skargardsstiftelsen.se/omraden/fejan/ — "Fejans gästhamn … Hamnavgiften inkluderar tillgång till dusch, toalett och bastu"; fejan.com/gasthamn — "ligger ni på mooringlinor", el/dusch/WC
      { name: 'Fejans gästhamn', desc: 'Gästhamn vid Fejan Sjökrog med mooringlinor. Hamnavgiften inkluderar dusch, toalett och bastu. Säsongsöppen.', fuel: false, service: ['el', 'dusch'] },
    ],
    restaurants: [],
    tips: [
      'Anlöp tidigt — Fejan är populär och naturhamnen fylls kvällar i juli.',
      'Ta med allt du behöver — ingen service finns på ön.',
      // KÄLLA: Skärgårdsstiftelsen, https://skargardsstiftelsen.se/omraden/fejan/ — "I slutet av 1800-talet anlades här en karantänstation för fartyg som misstänktes bära smittsamma sjukdomar, och de välbevarade byggnaderna berättar än idag om öns unika förflutna"; "Under 2026 håller vandrarhemmet stängt"; Fejan är inte naturreservat: ön finns inte med i Norrtälje kommuns lista över skyddad natur (kontrollerat 2026-09-14) och tidigare tips om naturreservatsregler är borttaget (läst 2026-09-19); årtalet 1892 och sjukhusnamnet Wasa nämns inte på sidan
    ],
    related: ['furusund', 'arholma', 'graddo'],
    tags: ['naturreservat', 'klippor', 'segling', 'snorkling', 'norra'],
    // KÄLLA: Skärgårdsstiftelsen, https://skargardsstiftelsen.se/omraden/fejan/ — "I slutet av 1800-talet anlades här en karantänstation för fartyg som misstänktes bära smittsamma sjukdomar, och de välbevarade byggnaderna berättar än idag om öns unika förflutna. Under senare perioder har Fejan även fungerat som flyktingförläggning och lotsmiljö" / fliken Äta och bo: "Under 2026 håller vandrarhemmet stängt" (läst 2026-09-19). 1892, "Wasa" och 1930-talet saknar tillåten källa; strukna.
    // KÄLLA: https://skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/ — "När koleran svepte över Europa 1892 uppfördes i en hast en karantänstation på ön Fejan. Ett monteringsfärdigt trähus som skulle skeppas till Kongo som missionsstation exproprierades vid utskeppningskajen och sattes upp som doktorsvilla på Fejan" (läst 2026-09-19)
    did_you_know: 'När koleran svepte över Europa 1892 uppfördes i all hast en karantänstation på Fejan för fartyg som misstänktes bära smitta. Doktorsvillan är ett monteringsfärdigt trähus som var på väg till Kongo som missionsstation men exproprierades vid kajen — därav namnet Kongohuset. Byggnaderna är bevarade, och ön har senare varit både flyktingförläggning och lotsmiljö. Vandrarhemmet håller stängt under 2026.',
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli',
      best: 'Mitten av juni',
      bestReason: 'Ljusa nätter och tomt — känslan av att ha ytterskärgården för sig själv.',
      warning: 'Inga reguljära förbindelser. Kräver egen båt och god väderkunskap.',
      months: ['off','off','off','off','off','open','peak','open','limited','off','off','off'],
    },

  },
  // ─── RÖDLÖGA ─────────────────────────────────────────────────
  {
    slug: 'rodloga',
    name: 'Rödlöga',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌊',
    // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/rodloga — "Rödlöga skimrar i röd granit, därav namnet. Det här är så långt ut i havsbandet du kommer med reguljär trafik." (läst 2026-09-27)
    // KÄLLA: https://rodlogaboden.se/ — "It is possible to find a safe natural harbour in all winds."; "skärgårdens ostligaste lanthandel och café" (läst 2026-09-27)
    tagline: 'By i röd granit så långt ut i havsbandet som Waxholmsbåten går — naturhamn i alla vindar, lanthandel och café.',
    description: [
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/rodloga — "Rödlöga ligger längst ut i den vackra, karga ytterskärgården."; "Rödlöga skimrar i röd granit, därav namnet."; "Här finns en liten by, men inga vägar, bara slingrande stigar genom vildrossnår." (läst 2026-09-27)
      // KÄLLA: https://www.norrtalje.se/globalassets/dokument/dokument-kultur--fritid/dokument-kultur/dokument-riksintressen-i-norrtalje-kommun/svartloga---rodloga.pdf — "Rödlöga är mer kuperad än Svartlöga, med en högsta punkt omkring 25 meter över havet."; "Byns marker består av tre större öar, Rödlöga, Västerö och Enskär." (Norrtälje kommun, Kulturmiljöutredning nr 4, 2016) (läst 2026-09-27)
      'Rödlöga ligger längst ut i Stockholms norra ytterskärgård, i Norrtälje kommun, och har fått sitt namn av den röda graniten. Här finns en liten by men inga vägar, bara stigar genom vildrosnår. Ön är kuperad och når omkring 25 meter över havet. Byns marker består av tre större öar, Rödlöga, Västerö och Enskär, och ett stort antal mindre öar och skär.',
      // KÄLLA: https://rodlogaboden.se/pages/om-oss — "Totalt finns under sommaren omkring 300 personer fördelade på drygt 100 hushåll på ön."; "På ön finns ingen fast el, men många öbor har alternativa energikällor, exempelvis vindkraftverk och solceller."; "Färskvatten till butiken produceras från havsvatten, med omvänd osmos." (läst 2026-09-27)
      // KÄLLA: https://www.norrtalje.se/globalassets/dokument/dokument-kultur--fritid/dokument-kultur/dokument-riksintressen-i-norrtalje-kommun/svartloga---rodloga.pdf — "Öarna är numera främst bebodda under sommartid. Endast ett fåtal personer bor där vintertid." (Norrtälje kommun, Kulturmiljöutredning nr 4, 2016) (läst 2026-09-27)
      'Enligt Rödlögaboden finns det under sommaren omkring 300 personer i drygt 100 hushåll på ön. Vintertid bor bara ett fåtal personer här. Det finns ingen fast el, så många öbor har egna vindkraftverk och solceller, och butikens färskvatten tas fram ur havsvatten med omvänd osmos.',
      // KÄLLA: https://www.norrtalje.se/globalassets/dokument/dokument-kultur--fritid/dokument-kultur/dokument-riksintressen-i-norrtalje-kommun/svartloga---rodloga.pdf — "fanns det emellertid en bofast befolkning på ön redan år 1535"; "Dalgången utgjorde fram till slutet av 1600-talet ett sund."; "Därför flyttades byns bebyggelse till norra sidan under 1700-talet"; "Enligt den lokala traditionen ska Rödlöga ha klarat sin by vid rysshärjningarna år 1719."; "Invånarna sägs ha gömt sig i en grotta vid vattnet på den södra sidan av ön." (Norrtälje kommun, Kulturmiljöutredning nr 4, 2016) (läst 2026-09-27)
      'Det fanns en bofast familj på Rödlöga redan 1535. Byn låg då vid en dalgång som fram till slutet av 1600-talet var ett sund rakt genom ön. När landhöjningen gjorde sundet för grunt flyttade byn under 1700-talet till norra sidan, där den ligger i dag. Enligt den lokala traditionen klarade sig byn när ryssarna härjade 1719, och invånarna ska ha gömt sig i en grotta vid vattnet på öns södra sida.',
      // KÄLLA: https://www.norrtalje.se/globalassets/dokument/dokument-kultur--fritid/dokument-kultur/dokument-riksintressen-i-norrtalje-kommun/svartloga---rodloga.pdf — "På 1700-talet gavs ett kungligt dekret som ålade byborna på Kudoxa och Rödlöga att hålla lots på Svenska Högarna. Den första permanenta lotsstationen byggdes 1793."; "Mellan åren 1910 och 1927 skulle antalet personer på ön komma att öka från 50 till nästan 400 personer."; "År 1954 infördes daglig förbindelse med båttrafik under sommarhalvåret från Furusund. Trots det upphörde man med jordbruk två år senare på ön."; "I mitten av 1960-talet bodde det sju personer på ön." (Norrtälje kommun, Kulturmiljöutredning nr 4, 2016) (läst 2026-09-27)
      'Byborna levde på boskapsskötsel, fiske och jakt på säl och sjöfågel. På 1700-talet ålade ett kungligt dekret byborna på Kudoxa och Rödlöga att hålla lots på Svenska Högarna, där den första permanenta lotsstationen byggdes 1793. Mellan 1910 och 1927 växte befolkningen från 50 till nästan 400 personer. Därefter gick det utför: 1954 fick ön daglig båtförbindelse från Furusund sommartid, men två år senare upphörde jordbruket, och i mitten av 1960-talet bodde sju personer kvar.',
      // KÄLLA: https://www.norrtalje.se/globalassets/dokument/dokument-kultur--fritid/dokument-kultur/dokument-riksintressen-i-norrtalje-kommun/svartloga---rodloga.pdf — "Byns täta bebyggelse ligger invid hamnen på den norra sidan av ön."; "gistgårdar, vilket är en ställning som man torkar nät på"; "I Gammelstugan finns ett hembygdsmuseum inrymt."; "länsstyrelsen beslutat om utökat strandskydd till 300 meter på Rödlöga" (Norrtälje kommun, Kulturmiljöutredning nr 4, 2016) (läst 2026-09-27)
      // KÄLLA: https://rodlogaboden.se/pages/historia — "Här finns ett litet museum inrymt och här ställer konstnärer, från framför allt skärgården, ut under vissa sommarveckor." (läst 2026-09-27)
      'Svartlöga och Rödlöga är tillsammans ett riksintresse för kulturmiljövården. Byns täta bebyggelse ligger vid hamnen på norra sidan, med sjöbodar, båtplatser, bryggor och gistgårdar där näten torkades. I Gammelstugan finns ett litet museum, och under vissa sommarveckor ställer konstnärer från skärgården ut där. Länsstyrelsen har beslutat om utökat strandskydd på 300 meter på Rödlöga.',
      // KÄLLA: https://cafetruten.se/pages/var-historia — "Rödlögabodens skapare, entreprenören Gösta Söderman"; "I delen mot Gammelstugan, som idag inrymmer Café Truten, fanns en nätbod för fiskenät och utrustning."; "När skötbåten sjösattes 1954, riggade Gösta sjöboden till affär."; "Ångbåtsbryggan stod klar 1957, och i samband med det byggdes affären där den ligger idag." (läst 2026-09-27)
      // KÄLLA: https://www.norrtalje.se/globalassets/dokument/dokument-kultur--fritid/dokument-kultur/dokument-riksintressen-i-norrtalje-kommun/svartloga---rodloga.pdf — "en annan i nordost vid ångbåtsbryggan och säsongsöppna handelsboden. Det är skärgårdens ostligaste lanthandel." (Norrtälje kommun, Kulturmiljöutredning nr 4, 2016) (läst 2026-09-27)
      // KÄLLA: https://rodlogaboden.se/pages/om-oss — "Rödlögaboden ägs och drivs av Rödlögaboden Ekonomisk Förening, och de flesta på ön är medlemmar i föreningen."; "Till Rödlögaboden också en sjömack med bensin, diesel, fotogen och gasol." (läst 2026-09-27)
      'Vid ångbåtsbryggan ligger Rödlögaboden, skärgårdens ostligaste lanthandel. Gösta Söderman startade affären i sin sjöbod 1954, och när ångbåtsbryggan stod klar 1957 byggdes affären där den ligger i dag. Den ägs av en ekonomisk förening där de flesta på ön är medlemmar, och till den hör en sjömack med bensin, diesel, fotogen och gasol. Café Truten ligger i den del av sjöboden som förr var nätbod.',
      // KÄLLA: https://www.norrtalje.se/globalassets/dokument/dokument-kultur--fritid/dokument-kultur/dokument-riksintressen-i-norrtalje-kommun/svartloga---rodloga.pdf — "På Rödlöga finns flera goda hamnar, den mest använda ligger på norra delen av ön, en annan i nordost vid ångbåtsbryggan"; "I norr finns en större och mer tillgänglig naturhamn i sundet mellan Rödlöga-Storskär och Brännskäret."; "Den unika sommarvillan i svensk klassicism från år 1916 på Högskär strax norr om Rödlöga, uppfördes av bokförläggare Karl Lindqvist." (Norrtälje kommun, Kulturmiljöutredning nr 4, 2016) (läst 2026-09-27)
      'Rödlöga har flera goda hamnar. Den mest använda ligger på norra delen av ön och en annan i nordost vid ångbåtsbryggan. I norr finns också en större naturhamn i sundet mellan Rödlöga-Storskär och Brännskäret. Strax norr om Rödlöga, på Högskär, står en sommarvilla i svensk klassicism som bokförläggaren Karl Lindqvist lät bygga 1916, en av de första i ytterskärgården.',
    ],

    facts: {
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/rodloga — "Under våren, sommaren och hösten kan du åka ut till Rödlöga från Strömkajen utan byten. Resan tar fyra timmar."; "Under vintern och början av våren behöver du åka från Köpmanholm på Yxlan för att ta dig till Rödlöga."; "Heldagsutflykt till Rödlöga" (läst 2026-09-27)
      // KÄLLA: https://rodlogaboden.se/pages/om-oss — "På ön finns ingen fast el"; "Butiken har öppet sommartid." (läst 2026-09-27)
      travel_time: 'ca 4 tim med Waxholmsbåt från Strömkajen (linje 26)',
      character: 'Ytterskärgårdsby utan vägar och fast el, naturhamnar',
      season: 'Båt året runt; butik och café öppna sommartid',
      best_for: 'Båtfolk, heldagstur med Waxholmsbåt, kulturmiljö',
    },
    activities: [
      // KÄLLA: https://rodlogaboden.se/ — "It is possible to find a safe natural harbour in all winds." (läst 2026-09-27)
      // KÄLLA: https://www.norrtalje.se/globalassets/dokument/dokument-kultur--fritid/dokument-kultur/dokument-riksintressen-i-norrtalje-kommun/svartloga---rodloga.pdf — "I norr finns en större och mer tillgänglig naturhamn i sundet mellan Rödlöga-Storskär och Brännskäret." (Norrtälje kommun, Kulturmiljöutredning nr 4, 2016) (läst 2026-09-27)
      { icon: '⛵', name: 'Naturhamn', desc: 'Enligt Rödlögaboden går det att hitta en säker naturhamn i alla vindar. Norrtälje kommun pekar ut naturhamnen i sundet mellan Rödlöga-Storskär och Brännskäret i norr som större och mer tillgänglig.' },
      // KÄLLA: https://rodlogaboden.se/pages/att-gora — "Vill du upptäcka ön, ta en promenad på någon av våra uppmärkta stigar. Ta ett dopp från klipporna på öns ostsida, och låt ögonen vila mot den fria horisonten från någon av utsiktsplatserna där." (läst 2026-09-27)
      { icon: '🌊', name: 'Stigar och klippbad', desc: 'Ön har uppmärkta stigar. På östsidan kan du bada från klipporna och se ut mot den fria horisonten från utsiktsplatserna.' },
      // KÄLLA: https://rodlogaboden.se/ — "På lördag 17 juli 2027 11-16 går den av stapeln."; "Det anrika ångfartyget gästar ön vid ost- och skärgårdsmarknaden." (läst 2026-09-27)
      { icon: '🧀', name: 'Ost- och skärgårdsmarknaden', desc: 'Rödlögaboden håller varje sommar en ost- och skärgårdsmarknad i mitten av juli, då ångfartyget s/s Blidösund anlöper ön. Nästa marknad är lördag 17 juli 2027 kl. 11–16.' },
      // KÄLLA: https://www.norrtalje.se/globalassets/dokument/dokument-kultur--fritid/dokument-kultur/dokument-riksintressen-i-norrtalje-kommun/svartloga---rodloga.pdf — "I Gammelstugan finns ett hembygdsmuseum inrymt."; "gistgårdar, vilket är en ställning som man torkar nät på" (Norrtälje kommun, Kulturmiljöutredning nr 4, 2016) (läst 2026-09-27)
      { icon: '🏛', name: 'Byn och Gammelstugan', desc: 'Byn vid hamnen är en del av riksintresset Svartlöga–Rödlöga, med sjöbodar, båthus och gistgårdar. I Gammelstugan finns ett litet hembygdsmuseum.' },
    ],
    accommodation: [
      // KÄLLA: https://rodlogaboden.se/pages/att-gora — "Om du vill ha tak över huvudet är det kanske ledigt i den lilla Kammaren i Gammelstugan mitt i byn."; "två bäddar, liten gasolspis, vatten i pump och utedass"; "350 kr per person/natt, du bokar via Rödlögaboden"; "Ta med dig ett tält och följ blå stigen" (läst 2026-09-27)
      { name: 'Kammaren i Gammelstugan', type: 'Rum', desc: 'Litet rum mitt i byn med två bäddar, liten gasolspis, vatten i pump och utedass. 350 kr per person och natt (Rödlögabodens sida, sommaren 2026). Bokas via Rödlögaboden.', websiteUrl: 'https://rodlogaboden.se/pages/att-gora' },
      { name: 'Tält', type: 'Camping', desc: 'Rödlögaboden hänvisar tältare till blå stigen på öns karta, eller att fråga i butiken var man kan slå upp tältet.', websiteUrl: 'https://rodlogaboden.se/pages/att-gora' },
    ],
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/s26.pdf — "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026"; "26A STOCKHOLM – VAXHOLM – NORRSUND – RÖDLÖGA" — måndag–torsdag tur 2601 Strömkajen 09.00, Rödlöga 13.00; tur 2602 Rödlöga 15.00, Strömkajen 19.00 (läst 2026-09-27)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h26.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026" — tur 2621 Strömkajen 08.45, Rödlöga 13.00 (mån–tors); tur 2671 söndag Strömkajen 10.00, Rödlöga 14.00 (läst 2026-09-27)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 30 SEPTEMBER 2026"; "28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – BROMSKÄR / RÖDLÖGA" — lördag tur 2851 och söndag tur 2871: Furusund 10.05, Rödlöga 12.20 (läst 2026-09-27)
    // KÄLLA: https://rodlogaboden.se/pages/hitta-hit — "Båtturen från Furusund till Rödlöga tar drygt två timmar."; "Om du kommer med bil finns parkering strax innan Furusunds värdshus."; "Det är tidtabellerna 26 och 28 som gäller för Rödlöga." (läst 2026-09-27)
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: 'ca 4 tim', desc: 'Linje 26 (Strömkajen–Vaxholm–Norrsund–Norröra–Söderöra–Svartlöga–Rödlöga) går utan byte, och Rödlöga är ändhållplats. Sommaren 2026 (19 juni–16 augusti) gick båten måndag–torsdag 09.00 från Strömkajen och var framme 13.00; tillbaka 15.00, i Stockholm 19.00. Under hösttabellen (17 augusti–1 november 2026) går vardagsturen 08.45 och är framme 13.00, söndagsturen 10.00 och framme 14.00. Vintertid åker man i stället från Köpmanholm på Yxlan.', icon: '⛴' },
      { method: 'Waxholmsbåt', from: 'Furusund', time: 'drygt 2 tim', desc: 'Linje 28 går från Furusund och Köpmanholm. Våren och hösten 2026 (till 30 september) gick lördags- och söndagsturen 10.05 från Furusund och var på Rödlöga 12.20. Parkering finns strax innan Furusunds värdshus.', icon: '⛴' },
      // KÄLLA: https://rodlogaboden.se/ — "Gästbryggan ligger inne i byviken, nedanför Café Truten."; "Ej nattförtöjning (gäller ej fartyg med särskilt tillstånd), endast stävtillägg och båtvikt max 3 ton gäller för bryggan." (läst 2026-09-27)
      { method: 'Egen båt', from: 'Valfri hamn', desc: 'Ankra i någon av naturhamnarna. För ett kort besök i butiken och caféet finns Rödlögabodens gästbrygga inne i byviken: endast stävtillägg, max 3 ton och ingen nattförtöjning.', icon: '⛵' },
    ],
    harbors: [
      // KÄLLA: https://rodlogaboden.se/ — naturhamn "i alla vindar"; "ny gästbrygga … inne i byviken … Ej nattförtöjning … max 3 ton"; /om-oss — "sjömack med bensin, diesel, fotogen och gasol", "På ön finns ingen fast el"
      { name: 'Rödlöga naturhamn och Rödlögabodens dagbrygga', desc: 'Naturhamn i alla vindar. Dagbrygga (ej nattförtöjning, max 3 ton) vid Rödlögaboden. Sjömack finns.', fuel: true, service: ['bränsle'] },
    ],
    restaurants: [
      // KÄLLA: https://rodlogaboden.se/pages/cafe-truten — "Här kan du njuta av en kopp kaffe eller the, saft och läsk, hembakade pajer och kakor, en god smörgås - eller kanske en hamburgare som du grillar själv!" (läst 2026-09-27)
      // KÄLLA: https://cafetruten.se/ — "Ett sommaröppet café där vårt fokus är hembakat och handgjort"; "Vi bakar vårt surdegsbröd med nymalet ekologiskt mjöl"; "vi öppnar på midsommardagen" (läst 2026-09-27)
      { name: 'Café Truten', type: 'Café', desc: 'Sommaröppet café i byn intill Rödlögaboden: kaffe, hembakade pajer och kakor, surdegsbröd, smörgåsar och hamburgare du grillar själv. Öppnar på midsommardagen.', websiteUrl: 'https://cafetruten.se/' },
    ],
    tips: [
      // KÄLLA: https://rodlogaboden.se/ — "Rödlögaboden öppnar 14 juni och Café Truten och Boklådan på midsommardagen." (läst 2026-09-27)
      'Butik och café har bara öppet sommartid. 2027 öppnar Rödlögaboden 14 juni och Café Truten på midsommardagen.',
      // KÄLLA: https://rodlogaboden.se/pages/hitta-hit — "Waxholmsbolaget når du på 08-600 10 00, tryck 2." (läst 2026-09-27)
      // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/rodloga — "Det går en eller två turer till Rödlöga varje dag." (läst 2026-09-27)
      'Det går en eller två båtar om dagen. Kontrollera returen innan du åker ut; Waxholmsbolagets kundtjänst nås på 08-600 10 00.',
      // KÄLLA: https://rodlogaboden.se/pages/cafe-truten — "Gör ett besök i boklådan utanför Café Truten, med begagnade böcker av alla de slag."; "Boklådan erbjuder även byteshandel" (läst 2026-09-27)
      'Boklådan utanför Café Truten säljer begagnade böcker och tar emot byten – ta med en bok att lämna.',
    ],
    related: ['arholma', 'furusund', 'fejan'],
    tags: ['ytterskärgård', 'segling', 'ankring', 'norra', 'äventyr'],
    // KÄLLA: https://www.norrtalje.se/globalassets/dokument/dokument-kultur--fritid/dokument-kultur/dokument-riksintressen-i-norrtalje-kommun/svartloga---rodloga.pdf — "Mellan åren 1910 och 1927 skulle antalet personer på ön komma att öka från 50 till nästan 400 personer."; "När det gäller fisket runt byns öar, var det ”ganska ringa”" (Norrtälje kommun, Kulturmiljöutredning nr 4, 2016) (läst 2026-09-27)
    did_you_know: 'Mellan 1910 och 1927 växte Rödlögas befolkning från 50 till nästan 400 personer. I dag bor bara ett fåtal här året runt.',
    // KÄLLA: https://rodlogaboden.se/ — "Rödlögaboden öppnar 14 juni och Café Truten och Boklådan på midsommardagen."; "Rödlögabodens ost- och skärgårdsmarknad" (läst 2026-09-27)
    // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/rodloga — "Under våren, sommaren och hösten kan du åka ut till Rödlöga från Strömkajen utan byten." (läst 2026-09-27)
    seasonal: {
      open: 'Mitten av juni–sommar (butik och café); båt året runt',
      peak: 'Juli',
      best: 'Juli',
      bestReason: 'I mitten av juli håller Rödlögaboden sin ost- och skärgårdsmarknad, och ångfartyget s/s Blidösund anlöper ön. Då har både butiken och Café Truten öppet.',
      warning: 'Lång resa: ca 4 tim från Strömkajen. Ingen fast el på ön, och butik och café har bara öppet sommartid.',
      // UPPSKATTNING: månadsraden bygger på butikens och caféets sommarsäsong; direktbåten från Strömkajen går april–oktober (h26/s26), vintertid från Köpmanholm.
      months: ['off','off','off','limited','limited','open','peak','open','limited','limited','off','off'],
    },
  },
  // ─── SINGÖ ───────────────────────────────────────────────────
  {
    slug: 'singo',
    name: 'Singö',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌊',
    tagline: 'Glest befolkad ö i Norrtäljes skärgård — rå natur och en bilfärja bort från turismen.',
    description: [
      'Singö är en stor ö i norra Roslagens skärgård i Norrtälje kommun, broförbunden med fastlandet. Tillsammans med grannön Fogdö bildar den ett av norra Upplands mest oförstörda kustlandskap, öppna fält, träkyrkby och en lång klippkust mot Ålandshav.',
      'Singö kyrka från 1753 är en röd timmrad träkyrka och hyser flera 1700-talsdyrkar, bland annat ett votivskepp från 1700-talet som räknas till Stockholms läns äldsta, skänkt av Norrtälje-borgaren Eric Brant och hans hustru Maria Tillman 1752.',
      'Före Singöbron byggdes (då gjorde båt huvudtransporten) gick Waxholmsbåtarna ända fram till 1951 från Strandvägen via Norrtälje, Väddö kanal, Trästa och Singö till Östhammar och Öregrund. Idag är Singö ett populärt bilburet utflyktsmål för dem som söker bortom de stora turist-öarna.',
    ],

    facts: {
      travel_time: '~1,5 tim med bil från Stockholm / SL-buss 637 från Norrtälje',
      character: 'Genuint, okänt, bilfärja, norra Uppland',
      season: 'Juni–Augusti',
      best_for: 'De som söker äkta orördhet, kulturhistoria',
    },
    activities: [
      { icon: '⛪', name: 'Singö kyrka (1753)', desc: 'Röd timmrad träkyrka med altarprydnader från Hargs kyrka 1761 och en av Stockholms läns äldsta votivskepp (1752).' },
      { icon: '🎣', name: 'Fiske', desc: 'Bra fiskevatten runt ön. Abborre och havsöring i kustvattnen.' },
      { icon: '🚲', name: 'Cykling', desc: 'Officiell cykelled: Singö runt (Röd led), 26,2 km, markerad av Levande Roslagsbygd. Vandrings- och cykelkarta säljs hos Visit Roslagen. Nås med SL-buss 637. Flera etapper går på grusväg, men några stigar kräver att cykeln leds — eller undviks helt.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Lugna klippbad längs kusten — sällan trångt.' },
    ],
    accommodation: [
      { name: 'Stugor', type: 'Stugor', desc: 'Privatuthyrning av sommarstugor på ön.' },
    ],
    // KÄLLA: SL buss 637 Norrtälje–Singö (https://kund.printhuset-sthlm.se/sl/h637.pdf, gäller 17 aug–12 dec 2026) (läst 2026-09-14). Broåret 1955 obelagt — borttaget.
    getting_there: [
      { method: 'Bil / buss', from: 'Norrtälje', time: 'ca 65–70 min med buss', desc: 'SL-buss 637 från Norrtälje busstation: ca 65–70 min till Singö kyrka och ca 80 min till ändhållplatsen Ellans vändplan (hållplatser Singöbron södra, Singö kyrka, Singö camping).', icon: '🚗' },
    ],
    harbors: [
    ],
    restaurants: [
    ],
    tips: [
      'Singö kapell är öns absoluta höjdpunkt — ta med kameran.',
      'Ta med mat hemifrån — restaurangutbudet är mycket begränsat.',
    ],
    related: ['arholma', 'vaddo', 'norrora'],
    tags: ['genuint', 'orört', 'bilfärja', 'norra', 'kulturhistoria'],
    did_you_know: 'Singö kyrka (1753) hyser ett votivskepp från 1752 som räknas till Stockholms läns äldsta — skänkt av Norrtälje-borgaren Eric Brant och hans hustru Maria Tillman. Fram till 1951 trafikerade Waxholmsbåtarna sträckan Stockholm–Norrtälje–Singö–Östhammar/Öregrund som ordinarie passagerarlinje.',
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Norra skärgårdens karaktär utan Stockholmsöarnas folkmassor. Bra paddlingsvatten.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },

  },
  // ─── LIDÖ ────────────────────────────────────────────────────
  {
    slug: 'lido',
    name: 'Lidö',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌲',
    tagline: 'Naturskönt gods med konferens och gästhamn — ett unikt skärgårdshotell.',
    description: [
      'Lidö är en herrgårdsö i Stockholms norra skärgård i Norrtälje kommun. Lidö herrgård har medeltida rötter och nuvarande huvudbyggnad uppfördes 1769. Sedan 1998 ägs större delen av ön av Skärgårdsstiftelsen, som från 2002 hyrt ut driften till olika entreprenörer. Lidö Värdshus drivs sedan 2011 av Hugo Olofsson och Olle Tejle.',
      'Ön kombinerar lugn natur med en vällevande gästhamn, sjökrog, badtunnor, bastu och vandringsleder. Skärgårdsstiftelsen förvaltar också de mindre kringliggande öarna Västerholmen, Gyltan, Skabbö och Örskär.',
      'Lidö passar för par och familjer som söker en blandning av naturupplevelse och välkomponerad service.'
    ],

    facts: {
      // KÄLLA: Waxholmsbolaget linje 31, https://kund.printhuset-sthlm.se/wa/v31.pdf — "31A RÄFSNÄS – TJOCKÖ – FEJAN", gäller 2 april–18 juni och 17 augusti–12 december 2026; turer som angör Lidö: Räfsnäs 07.55 → Lidö 08.05 (10 min), 10.05 → 10.15 (10 min), 09.45 → 10.00 (15 min), 17.35 → 17.50 (15 min); turen 06.40 angör inte Lidö (07.05 är Fejan); ingen bilfärja till ön (läst 2026-09-19)
      travel_time: 'Bil till Räfsnäs, sedan Waxholmsbåt linje 31 (ca 10–15 min)',
      character: 'Naturhotell, välvårdat gods, lugnt',
      season: 'April–Oktober (konferens helår)',
      best_for: 'Par, konferens, naturälskare, golfare',
    },
    activities: [
      { icon: '🛁', name: 'Badtunnor & bastu', desc: 'Badtunnor med havsutsikt och vedeldad bastu vid bryggan.' },
      { icon: '🚶', name: 'Naturpromenader', desc: 'Välskötta leder längs kust och genom skog.' },
      { icon: '🛶', name: 'Kajak & kanot', desc: 'Uthyrning för paddling i de skyddade vattnen runt ön.' },
      { icon: '🎣', name: 'Fiske', desc: 'Guidat fiske och uthyrning av fiskeutrustning.' },
    ],
    accommodation: [
      { name: 'Lidö Naturhotell', type: 'Hotell', desc: 'Hotellrum i historiska herrgårdsbyggnader. Full frukost och middag ingår i vissa paket.' },
    ],
      // KÄLLA: Waxholmsbolaget linje 31 (https://kund.printhuset-sthlm.se/wa/v31.pdf, "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026"), rubrik "31A RÄFSNÄS – TJOCKÖ – FEJAN": Räfsnäs–Lidö ca 10–15 min. Samtliga Lidö-anlöp är märkta "b" — "Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst 08-600 10 00 minst 1 timme innan avgång från aktuell brygga, dock senast kl. 17.00." (läst 2026-09-14). Stod ~25 min, "Norra linjen från Strömkajen 3 h", "bilfärja till ön" och "året runt" — inget av det belagt, borttaget.
    getting_there: [
      { method: 'Bil + Waxholmsbåt', from: 'Räfsnäs', time: 'ca 10–15 min båt', desc: 'E18 mot Norrtälje och vidare till Räfsnäs brygga. Därifrån Waxholmsbolagets linje 31 (31A Räfsnäs–Tjockö–Fejan). Samtliga anlöp vid Lidö är beställningstrafik: resan måste beställas i SL-appen, på Waxholmsbolagets webb eller via kundtjänst 08-600 10 00 minst 1 timme före avgång från aktuell brygga, dock senast kl. 17.00. Tidtabellen gäller 2 april–18 juni och 17 augusti–12 december.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: https://lidovardshus.com/gsthamnen — "Eluttag finns på bryggan", "vid separat brygga finns station att fylla dricksvatten", "Vid Oasen finns toaletter, dusch"
      { name: 'Lidö Värdshus gästhamn', desc: 'Gästhamn vid Lidö Värdshus. El på bryggan, dricksvatten vid separat brygga, toalett och dusch vid Oasen.', fuel: false, service: ['el', 'vatten', 'dusch'] },
    ],
    restaurants: [
      // KÄLLA: https://lidovardshus.com/restaurangen — "klassisk och skärgårdsinspirerad mat med tydliga, svenska smaker där lokala råvaror står i fokus"
      { name: 'Lidö Värdshus, restaurangen', type: 'Restaurang', desc: 'Restaurang på Lidö Värdshus med klassisk, skärgårdsinspirerad mat med lokala råvaror.', websiteUrl: 'https://lidovardshus.com/restaurangen' },
    ],
    tips: [
      'Lidö Värdshus är populärt för weekendpaket — boka i god tid, helst flera veckor i förväg.',
      'Skärgårdsstiftelsens vandringsleder mellan Lidö och de mindre öarna runt om är fina i juni–juli.',
    ],
    activity_meta: {
      // KÄLLA: Stockholm Archipelago Trail, https://stockholmarchipelagotrail.com/section/ (2026-09-17)
      vandring: { trails: 1, max_km: 11.9, sat: { km: 11.9, difficulty: 'Medel' } },
    },
    related: ['furusund', 'blido', 'arholma'],
    tags: ['naturhotell', 'värdshus', 'norra', 'herrgård'],
    did_you_know: 'Lidö herrgård har medeltida rötter och nuvarande huvudbyggnad är från 1769. Sedan 1998 ägs ön av Skärgårdsstiftelsen, som arrenderar ut värdshuset till externa entreprenörer.',
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Juni',
      bestReason: 'Gott om naturliga ankringsplatser i norra skärgården, lugnt och fint före högsäsongen.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },

  },
  // ─── GRÄDDÖ ──────────────────────────────────────────────────
  {
    slug: 'graddo',
    name: 'Gräddö',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌊',
    tagline: 'Hamnby på Rådmansö dit du kör hela vägen – och där båtarna till Tjockö, Lidö och Fejan börjar.',
    seoTitle: 'Gräddö – hamn, camping & båt till Tjockö och Fejan',
    seoDescription: 'Gräddö på Rådmansö: gästhamn med sjömack, Björköörens badplats, camping med restaurang och Waxholmsbolagets båt från Räfsnäs till Tjockö, Lidö och Fejan.',
    // Ifylld 2026-09-21 efter Toms beslut "fyll ut med belagt innehåll". Allt nedan är läst i webbläsare samma dag; källa står vid varje uppgift.
    description: [
      // KÄLLA: SL buss 631 Norrtälje–Rådmansö–Norrtälje, https://kund.printhuset-sthlm.se/sl/h631.pdf (giltig 17 augusti–12 december 2026) — hållplatser i ordning: Norrtälje busstation … Gräddö torg … Räfsnäs brygga (läst 2026-09-21)
      'Gräddö ligger på Rådmansölandet i Norrtälje kommun, vid inloppet till Norrtäljeviken, och är en av få platser i norra skärgården dit du kör bil hela vägen – ingen färja. Utan bil tar du SL:s buss 631 från Norrtälje busstation; den stannar vid Gräddö torg och fortsätter till Räfsnäs brygga.',
      // KÄLLA: Waxholmsbolaget linje 31 Räfsnäs–Tjockö–Fejan, https://kund.printhuset-sthlm.se/wa/h31.pdf (gäller 2 april–18 juni och 17 augusti–12 december 2026): Räfsnäs 10.05 → Tjockö ångbåtsbrygga 10.10 → Fejan 11.00; Lidö, Tyvö, Rovholmen, Enskär, Gisslingö med anmärkning b = beställs (läst 2026-09-21)
      'Räfsnäs, strax intill, är Waxholmsbolagets brygga för linje 31: fem minuter över till Tjockö och därefter vidare mot Lidö och Fejan vid Ålands hav – hela vägen till Fejan på under timmen. Det gör Gräddö till ett naturligt nav för den som vill nå ytterskärgården utan egen båt.',
      // KÄLLA: https://www.graddosjomack.se/ — gästplatser med el, färskvatten, dusch; bensin och diesel (läst 2026-08-24). Caravan Club Björkö Örn, https://caravanclub.se/camping/bjorko-orn/ — "havscamping", "långgrund sandstrand", "9 stugor och tomter för tält", "vedeldad bastu", "restaurang med fulla rättigheter" (läst 2026-09-21). Norrtälje kommun, https://www.norrtalje.se/info/kultur-och-fritid/bad/badplatser/bjorkooren/ — "sandstrand med cirka 85 meter strandlinje i norrläge", "väster om Gräddö" (läst 2026-09-21)
      'Har du egen båt finns Gräddö Sjömack och Gästhamn med gästplatser, el, vatten, dusch och bränsle. Vill du stanna över: Caravan Club Björkö Örn är en havscamping vid viken med stugor, tältplatser, vedeldad bastu nere vid vattnet och restaurangen Gräddös Pärla. Intill ligger kommunens badplats Björköören med 85 meter sandstrand.',
    ],

    facts: {
      travel_time: 'Bil hela vägen via Norrtälje · SL-buss 631 från Norrtälje busstation',
      character: 'Hamnby på Rådmansö – port till Tjockö, Lidö och Fejan',
      season: 'April–Oktober',
      best_for: 'Bilburna, husbil och camping, ö-hopp till Tjockö och Fejan, kajak',
    },
    facts_provenance: { travel_time: 'matt', character: 'matt', season: 'bedomning', best_for: 'bedomning' },
    activities: [
      // KÄLLA: Waxholmsbolaget linje 31, https://kund.printhuset-sthlm.se/wa/h31.pdf — Räfsnäs 10.05, Tjockö 10.10, Fejan 11.00; Lidö "b" = beställ resan (läst 2026-09-21)
      { icon: '⛴', name: 'Båt till Tjockö, Lidö och Fejan', desc: 'Waxholmsbolagets linje 31 går från Räfsnäs brygga: Tjockö efter fem minuter, Fejan efter ungefär 55. Lidö och flera mindre bryggor angörs efter beställning – boka i SL-appen minst en timme före avgång.' },
      // KÄLLA: Norrtälje kommun, https://www.norrtalje.se/info/kultur-och-fritid/bad/badplatser/bjorkooren/ — sandstrand ca 85 m i norrläge, beachvolleyplan ja, kiosk/kafé ja, parkering ja, toalett ja, brygga nej, hund nej 15 maj–15 september (läst 2026-09-21)
      { icon: '🏖', name: 'Björköörens badplats', desc: 'Kommunal badplats vid Norrtäljevikens södra strand, väster om Gräddö: cirka 85 meter sandstrand, beachvolleyplan, kiosk, toalett och parkering. Ingen brygga. Hund är inte tillåten 15 maj–15 september.' },
      // KÄLLA: Visit Skärgården, https://visitskargarden.se/resmaal/norra-skaergaarden/graeddoe.aspx — "Kajak och Uteliv … utgår från våra två kajakbaser i Stockholms norra skärgård, Gräddö och Furusund", adress Gräddö Brygga; butik för kajak och SUP (läst 2026-09-21). Caravan Club Björkö Örn: "kanoter och stand up paddle-boards för uthyrning" (läst 2026-09-21)
      { icon: '🛶', name: 'Kajak och SUP', desc: 'Kajak & Uteliv har en kajakbas vid Gräddö brygga och butik för kajak- och SUP-utrustning. Campingen Björkö Örn hyr ut kanoter och SUP-brädor nere vid havet.' },
      { icon: '⛵', name: 'Gästhamn och sjömack', desc: 'Gräddö Sjömack och Gästhamn: gästplatser, el, vatten, dusch, bensin och diesel enligt hamnens egen sida.' },
    ],
    // KÄLLA: Caravan Club Björkö Örn, https://caravanclub.se/camping/bjorko-orn/ — "Allmän Camping – Året runt", husvagns- och husbilstomter med el, 9 stugor, tälttomter, servicehus, vedeldad bastu vid havet, 9-håls minigolf, lekplats, "ca 7,5 km från färjeterminalen i Kapellskär" (läst 2026-09-21)
    accommodation: [
      { name: 'Caravan Club Björkö Örn', type: 'Camping & stugor', desc: 'Havscamping vid inloppet till Norrtäljeviken, öppen året runt: husvagns- och husbilsplatser med el, nio stugor, tältplatser, servicehus, vedeldad bastu vid havet, minigolf och lekplats. Cirka 7,5 km från färjeterminalen i Kapellskär.', websiteUrl: 'https://caravanclub.se/camping/bjorko-orn/' },
    ],
    accommodationIntro: 'Gräddö är en av få platser i norra skärgården där du kan bo med husbil eller husvagn vid havet och ändå ha båtarna till ytterskärgården inom promenadavstånd. Caravan Club Björkö Örn är det boende vi kunnat belägga hos operatören själv.',
    getting_there: [
      { method: 'Bil', from: 'Stockholm via Norrtälje', desc: 'E18 till Norrtälje, sedan väg 276 ut på Rådmansölandet mot Gräddö och Räfsnäs. Ingen färja.', icon: '🚗' },
      // KÄLLA: SL buss 631, https://kund.printhuset-sthlm.se/sl/h631.pdf (giltig 17 augusti–12 december 2026) — Norrtälje busstation → … Gräddö torg → … Räfsnäs brygga; SL buss 676 Tekniska högskolan–Norrtälje busstation, https://kund.printhuset-sthlm.se/sl/h676676x.pdf (läst 2026-09-19)
      { method: 'Buss', from: 'Norrtälje busstation', desc: 'SL-buss 631 Norrtälje–Rådmansö stannar vid Gräddö torg och Räfsnäs brygga. Från Stockholm: buss 676 från Tekniska högskolan till Norrtälje busstation och byte där. Sök hela resan i SL-appen.', icon: '🚌' },
    ],
    harbors: [
      // KÄLLA: https://www.graddosjomack.se/ — "Gräddö Sjömack och Gästhamn", gästplatser med el, färskvatten, dusch; sjömack med bensin och diesel
      { name: 'Gräddö Sjömack och Gästhamn', desc: 'Gästhamn med sjömack på Gräddö. Gästplatser med el, färskvatten och dusch; bensin och diesel.', fuel: true, service: ['el', 'vatten', 'dusch', 'bränsle'] },
    ],
    // KÄLLA: https://www.graddosparla.se/ — "Gräddös Pärla – Bar & Restaurang", "I Gräddö utanför Norrtälje ligger Gräddös pärla … bar & restaurang naturnära med närheten till havet och Kapellskär" (läst 2026-09-21 i webbläsare); Caravan Club Björkö Örn: "restaurang med fulla rättigheter som har öppet året om men endast på helger under vintersäsongen" (läst 2026-09-21)
    restaurants: [
      { name: 'Gräddös Pärla', type: 'Bar & restaurang', desc: 'Bar och restaurang vid campingen Björkö Örn, med utsikt över skärgården. Öppet året om enligt campingens sida, vintertid bara helger – kontrollera aktuella tider på restaurangens webbplats innan du åker.', websiteUrl: 'https://www.graddosparla.se/' },
    ],
    tips: [
      'Parkera vid Räfsnäs och ta linje 31: Tjockö på fem minuter, Fejan på under timmen. Bryggor med beställningstrafik bokar du i SL-appen minst en timme innan.',
      'Björköörens badplats har kiosk, toalett och parkering men ingen brygga – och hund är inte tillåten 15 maj–15 september.',
      'Tankar du båten här: hamnens sida anger både bensin och diesel.',
    ],
    related: ['tjocko', 'fejan', 'lido', 'furusund', 'blido'],
    tags: ['gästhamn', 'camping', 'bad', 'norra', 'bilväg', 'ö-hopp'],
    // KÄLLA: Sjöhistoriska museet/DigitaltMuseum — Gräddö båtvarv grundat 1924 av bröderna Eriksson, nedlagt 1965, 54 båtar byggda (2026-08-24)
    did_you_know: 'På Gräddö drev bröderna Ericksson ett träbåtsvarv 1924–1965 som hann bygga ett femtiotal båtar innan det lades ner.',
    amenities: { restaurant: true, accommodation: true, beach: true, camping: true },
    activity_meta: {
      bad: {
        beaches: [
          // KÄLLA: Norrtälje kommun, https://www.norrtalje.se/info/kultur-och-fritid/bad/badplatser/bjorkooren/ (läst 2026-09-21)
          { name: 'Björköörens badplats', type: 'sandstrand', desc: 'Kommunal havsbadplats väster om Gräddö med cirka 85 meter sandstrand i norrläge och mindre gräsytor. Beachvolleyplan, kiosk, toalett och parkering.', directions: 'Badviksvägen 7, Gräddö – vid Norrtäljevikens södra strand' },
        ],
      },
    },
    seasonal: {
      open: 'April–Oktober',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Lugnare i hamnen och på campingen utanför juli, och båtarna till Tjockö och Fejan går hela perioden.',
      months: ['off','off','off','limited','open','open','peak','peak','open','limited','off','off'],
    },

  },
  // ─── VÄDDÖ ───────────────────────────────────────────────────
  {
    slug: 'vaddo',
    name: 'Väddö',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌾',
    tagline: 'Stor halvö nära Norrtälje med kanal, dansbana och äkta Roslagskaraktär.',
    description: [
      'Väddö är Roslagens största ö, belägen norr om Norrtälje vid norra Östersjökusten. Tillsammans med Björkö-Arholma utgör Väddö en stor del av norra Roslagens skärgård. Den 18 km långa Väddö kanal, grävd från 1820 av soldater och invigd 1840 av Karl XIV Johan, skär genom området och förbinder Bagghusfjärden i söder med Väddöviken i norr. Det ger seglare ett skyddat alternativ till öppna havet öster om ön.',
      'Idag passerar omkring 22 000 båtar genom kanalen varje år. Slussen vid Älmsta är en av Roslagens populäraste sommarmål. Längs kanalen finns badplatser, restauranger och cykelleder. Herräng på östra Väddö är världens mest kända centrum för lindy hop genom Herrängs Dansläger som arrangerats varje juli sedan 1982.',
      'Väddö passar både för bilburna dagsturister och för seglare som väljer kanalen istället för öppna havet, och för dansare från hela världen som kommer för Herrängs danslägret.',
    ],

    facts: {
      travel_time: 'ca 90 min med bil från Stockholm / buss 676 + 637 via Norrtälje',
      character: 'Bred halvö, landsbygd och skärgård, Roslagens hjärta',
      season: 'April–Oktober',
      best_for: 'Lindy hop-festival, kanalkryssning, cyklister, Roslagen-turism',
    },
    activities: [
      { icon: '💃', name: 'Herrängs Dansbana', desc: 'Legendarisk lindy hop-festival varje sommar. Världsunik stämning.' },
      { icon: '⚓', name: 'Väddö Kanal', desc: 'Historisk kanal med sluss och kanalkryssningar. Unik kulturupplevelse.' },
      { icon: '🚲', name: 'Cykling', desc: 'Väddöleden (del av Roslagsleden), ca 30 km längs östkusten med rastplatser vid Bagghus, Sandviken och Grisslehamn. Höjdpunkten: cykla längs Väddö kanal vid Älmsta. Välj östsidovägen — rv 283 är för trafikerad.' },
      { icon: '🎣', name: 'Fiske', desc: 'Kanalen och kustvattnen erbjuder bra fiske.' },
    ],
    accommodation: [
      { name: 'Hallsta Gård', type: 'B&B', desc: 'Bondgårdsboende med frukost och Roslagsatmosfär.' },
    ],
    // KÄLLA: SL buss 637 Norrtälje–Singö, https://kund.printhuset-sthlm.se/sl/h637.pdf (gäller 17 augusti–12 december 2026) — går från Norrtälje via Väddö kyrka, Älmsta och Grisslehamn till ändhållplatsen Ellans vändplan (läst 2026-09-19) ; SL buss 676 Stockholm–Norrtälje, https://kund.printhuset-sthlm.se/sl/h676676x.pdf (gäller 17 augusti–12 december 2026) — Tekniska högskolan–Norrtälje busstation (läst 2026-09-19); "637 från T-centralen" nämns inte i tabellen — linjen utgår från Norrtälje busstation
    getting_there: [
      { method: 'Buss', from: 'Stockholm', desc: 'SL-buss 676 från Tekniska högskolan till Norrtälje busstation, byte till buss 637 som går genom Väddö (Väddö kyrka, Älmsta, Grisslehamn).', icon: '🚌' },
    ],
    harbors: [
    ],
    restaurants: [
    ],
    tips: [
      'Herrängs Dansbana (juli) är en upplevelse utöver det vanliga — boka boende i god tid.',
      'Väddö Kanalen är ett underskattat besök — kryssningen tar 45 minuter.',
    ],
    related: ['singo', 'blido', 'norrora'],
    tags: ['lindy hop', 'kanal', 'Roslagens', 'norra', 'kultur'],
    did_you_know: 'Väddö kanal är 18 km lång och började grävas 1820 av soldater från olika regementen. Sveriges första ångdrivna mudderverk — konstruerat av Samuel Owen — användes vid bygget. Kanalen öppnades för trafik 1835 och invigdes officiellt 1840 av Karl XIV Johan. Idag passerar omkring 22 000 båtar genom kanalen varje år.',
    seasonal: {
      open: 'Hela året',
      peak: 'Juli',
      best: 'Juli (Herrängs Dansbana) eller Juni',
      bestReason: 'Herrängs lindy hop-festival i juli är öns stora dragplåster och en upplevelse utan like. Juni ger kanal-idyllen utan festivalmassorna för lugnsökare.',
      warning: 'Herräng-festival i juli ger fullt boende i hela Väddöområdet — boka månader i förväg om du vill vara med. Kanalens sluss är stängd utanför sommarsäsongen.',
      months: ['limited','limited','limited','limited','open','open','peak','open','open','open','limited','limited'],
    },
  },
  // ─── ASKÖ ────────────────────────────────────────────────────
  {
    slug: 'asko',
    name: 'Askö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🔬',
    // KÄLLA: Länsstyrelsen Södermanland, naturreservat Askö (https://www.lansstyrelsen.se/sodermanland/besoksmal/naturreservat/asko.html) — bildat 2001, utökat 2007, 5 849 ha varav 624 ha land (läst 2026-09-14)
    tagline: 'Marinbiologisk forskning och naturskönt naturreservat i södra ytterskärgården.',
    description: [
      'Askö ligger i Trosa-skärgården i södra Sörmland (formellt utanför Stockholms län), och är hem för Stockholms universitets marina forskningsstation Askölaboratoriet, en av Sveriges viktigaste forskningsplattformar för Östersjön. Ön är obebodd förutom forskningsstationen.',
      'På Askö ligger Askölaboratoriet, som är knutet till Stockholms universitet. Tack vare laboratoriet är öns undervattensmiljöer väl dokumenterade.',
      'Askö passar för marinbiologi-intresserade som vill se Östersjöforskning på nära håll, och för seglare som söker en ovanlig anhalt i Trosa-skärgården.',
    ],

    facts: {
      travel_time: 'Egen båt från Trosa — ingen reguljär båttrafik belagd',
      character: 'Naturreservat, forskning, ytterskärgård',
      season: 'Juni–Augusti (begränsad tillgänglighet)',
      best_for: 'Marinbiologiintresserade, erfarna seglare, naturälskare',
    },
    activities: [
      { icon: '🔬', name: 'Marinbiologiska turer', desc: 'Stockholms Universitet arrangerar öppna guideturer till Askölaboratoriet sommartid.' },
      { icon: '🌊', name: 'Ytterskärgårdsseglingd', desc: 'Askö är en etappdestination på södra ytterskärgårdens seglingsleder.' },
      { icon: '🐦', name: 'Fågelskådning', desc: 'Naturreservat med rikt fågelliv. Häckningsplats för flera marina fågelarter.' },
    ],
    accommodation: [
      { name: 'Askölaboratoriets stugor', type: 'Stugor', desc: 'Begränsat antal stugor för kursdeltagare och allmänheten under sommaren. Boka via SU.' },
    ],
    // Ingen reguljär skärgårdsbåt till Askö belagd hos Trosa kommun (sökt 2026-09-14) — "skärgårdsbåt sommartid" borttaget. KÄLLA reservat: Länsstyrelsen Södermanland, naturreservat Askö.
    getting_there: [
      { method: 'Egen båt', from: 'Trosa', time: 'Varierar', desc: 'Askö ligger i Trosa skärgård i Sörmland. Ingen reguljär båtlinje är belagd — egen båt från Trosa. Stora delar av ön är naturreservat med Askölaboratoriet; respektera föreskrifterna.', icon: '⛵' },
    ],
    harbors: [
    ],
    restaurants: [],
    tips: [
      'Kontakta Stockholms Universitet för programmet för allmänhetens turer till laboratoriet.',
      'Askö kräver god sjövana — öppet ytterskärgårdsvatten med risk för snabba väderförändringar.',
    ],
    related: ['uto', 'nattaro', 'landsort'],
    tags: ['marinbiologi', 'naturreservat', 'ytterskärgård', 'forskning', 'södra'],
    did_you_know: 'Askölaboratoriet grundades 1961 och är Stockholms universitets fältstation för marin forskning i Östersjön. Det är en av de äldsta och mest produktiva marinbiologiska forskningsstationerna i Sverige — flera centrala studier kring Östersjöns övergödning och miljöövervakning av blåstång och bottenfauna har sitt ursprung här.',
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli',
      best: 'Mitten av juni',
      bestReason: 'Naturreservat i sydskärgården — bäst när hackfågelskyddet lyfts och turisterna inte anlänt.',
      warning: 'Fågelskydd begränsar landstigning i delar av reservatet april–mitten av juni.',
      months: ['off','off','off','off','off','open','peak','peak','open','limited','off','off'],
    },

  },
  // ─── GÅLÖ ────────────────────────────────────────────────────
  {
    slug: 'galo',
    name: 'Gålö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🏖',
    tagline: 'Halvö med en av regionens finaste sandstränder — lättillgänglig med bil.',
    description: [
      'Gålö är en halvö i Stockholms södra skärgård i Haninge kommun, broförbunden med fastlandet via Gålöleden, vilket gör den till en av de mest tillgängliga "skärgårds-platserna" söder om Stockholm. På 40 minuter med bil från innerstaden är man framme.',
      'Gålö Havsbad är en av Stockholmsregionens populäraste sandstränder med fullservice, kioskutbud, parkering och campingplats. Naturreservatet runt halvön rymmer markerade vandringsleder genom kustlandskap, gammal skog och välbevarade kulturmiljöer från jordbrukstidens skärgård.',
      'Gålö passar för dagsutflykter med bil, för barnfamiljer som vill ha sandstrand utan båtresa, och för cyklister som söker en lättillgänglig dag i naturreservat.',
    ],

    facts: {
      travel_time: 'ca 40 min med bil från Stockholm / buss 839 från Handen',
      character: 'Lättillgänglig, sandstrand, naturreservat',
      season: 'April–Oktober',
      best_for: 'Sandstrand, bad, barnfamiljer, dagsturister',
    },
    activities: [
      { icon: '🏖', name: 'Gålö Havsbad', desc: 'Stor sandstrand med anläggningar, parkering och service. Regionens populäraste strandbad.' },
      { icon: '🚶', name: 'Naturreservat', desc: 'Välmarkerade vandringsleder längs kustlinjen och genom det vackra kustlandskapet.' },
      { icon: '🚲', name: 'Cykling', desc: 'Cykla från Horsfjärden till Gålö havsbad, ca 20–40 km tur-retur. Lätt kuperad terräng, mix av grusväg och asfalt — ta med MTB eller hybridcykel. Rekommenderat stopp: Stegsholms gård med café och eget mejeri.' },
      { icon: '🏄', name: 'Vattensport', desc: 'SUP, surfing och kajakuthyrning vid stranden.' },
    ],
    accommodation: [
      { name: 'Gålö Havsbad Camping', type: 'Camping', desc: 'Stor campingplats med alla bekvämligheter. Populär — boka i god tid.' },
      { name: 'Stugby Gålö', type: 'Stugor', desc: 'Stugor nära stranden.' },
    ],
    // KÄLLA: SL buss 839 Handens station–Dalarö (https://kund.printhuset-sthlm.se/sl/v839.pdf, gäller 2026): Handen–Gålövägen ca 18 min (läst 2026-09-14). Stod "buss 843, 30 min" — fel linje.
    getting_there: [
      { method: 'Buss', from: 'Handens station', time: 'ca 18 min', desc: 'SL-buss 839 (Handen–Dalarö/Smådalarö) till hållplats Gålövägen.', icon: '🚌' },
    ],
    harbors: [
    ],
    restaurants: [
      // KÄLLA: https://galohavsbad.se/ata/ — "vår charmiga Bistro", "matbit, fika, smarriga smörgåsar"; skargardsstiftelsen.se/omraden/galo — "Vid Gålö havsbad finns restaurang, café och camping med stugor"
      { name: 'Gålö Havsbad Bistro', type: 'Restaurang', desc: 'Bistro vid Gålö havsbad med mat, fika och smörgåsar. Minilivs och camping intill.', websiteUrl: 'https://galohavsbad.se/ata/' },
    ],
    tips: [
      'Kom tidigt på sommardagar — Gålö Havsbad är populärt och parkeringen fylls snabbt.',
      'Kombinera strandbesöket med vandringen i naturreservatet — 2 timmar och du har sett det bästa.',
    ],
    related: ['dalaro', 'orno', 'uto'],
    tags: ['sandstrand', 'lättillgänglig', 'södra', 'bad', 'camping'],
    did_you_know: 'Gålö Havsbad är en av Stockholmsregionens mest besökta badplatser — här fanns redan tidigt 1900-tal sommarkoloniverksamhet för Stockholms barn, och delar av området drivs idag av Skärgårdsstiftelsen som naturreservat och kulturmiljö.',
    seasonal: {
      open: 'April–Oktober',
      peak: 'Juli',
      best: 'Juni',
      bestReason: 'Familjevänlig sandstrand nåbar med bil — bäst i juni och tidig juli innan parkeringen fylls och trängseln ökar.',
      warning: 'Gålö Havsbad fylls snabbt på sommardagar — kom tidigt på morgonen.',
      months: ['off','off','off','limited','open','open','peak','peak','open','limited','off','off'],
    },
  },
  // ─── TORÖ ────────────────────────────────────────────────────
  {
    slug: 'toro',
    name: 'Torö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🌲',
    tagline: 'Naturreservat i söder med dramatisk kustlinje och surf-stämning.',
    description: [
      'Torö är en stor ö i Stockholms södra skärgård i Nynäshamns kommun, broförbunden med fastlandet via Herrhamras bro och Torö bro. Den dramatiska sydkusten med stora rundslipade strandstenar (Torö stenstrand) är en av Stockholms läns mest unika kustlinjer och är skyddad som naturreservat.',
      'Torö stenstrand bildades under inlandsisens reträtt och är en av få platser i Sverige med så omfattande klapperstensformationer. Stränderna är populära både för promenader och för Östersjöns ovanliga sportsegling i sommarvindarna.',
      'Torö passar för dagsutflykter med bil från Stockholm, för fågelskådare under vår- och höstflyttning, och för seglare som söker en exponerad sydlig kustlinje.',
    ],

    facts: {
      travel_time: 'ca 60 min med bil från Stockholm / buss 852 från Nynäshamn',
      character: 'Naturreservat, dramatisk kust, surf',
      season: 'April–Oktober',
      best_for: 'Vandring, surf, fotografi, naturälskare',
    },
    activities: [
      { icon: '🌊', name: 'Surfing & Windsurfing', desc: 'Södra kustlinjen ger vindförhållanden för vattensport när Östersjövinden drar in.' },
      { icon: '🚶', name: 'Kustvandringsleden', desc: 'Markerad led längs klippkusten mot sydväst. Dramatiska vyer mot öppet hav.' },
      { icon: '🏖', name: 'Torö Strand', desc: 'Sandstrand vid Torö Marinstaden med service och parkering.' },
      { icon: '🎣', name: 'Fiske', desc: 'Utmärkta förhållanden för havsöring längs den öppna kustlinjen.' },
    ],
    accommodation: [
      { name: 'Torö Marinstaden', type: 'Camping', desc: 'Campingplats och stugor nära stranden.' },
    ],
      // KÄLLA: SL buss 852 Nynäshamns station–Torö (https://kund.printhuset-sthlm.se/sl/v852.pdf, 2026): Nynäshamns station–Ankarudden ca 40 min, Ankarudden är ändhållplats; Trafikverket om bron — "Tottnäsbron är en vridbro över Tottnässundet på väg 528 mellan Södertörn och Oxnö där vägtrafiken går i en riktning i taget" (läst 2026-09-14). nynashamn.se/uppleva/skargard--batliv/toro svarade inte vid kontrollen; bilrestiden ca 60 min var obelagd och är borttagen.
    getting_there: [
      { method: 'Bil', from: 'Stockholm', desc: 'Väg 73 mot Nynäshamn, sedan skylt mot Torö. Vägen passerar Tottnäsbron, en vridbro på väg 528 mellan Södertörn och Oxnö där trafiken går i en riktning i taget.', icon: '🚗' },
      { method: 'Buss', from: 'Nynäshamns station', time: 'ca 40 min', desc: 'SL-buss 852 Nynäshamn–Torö till ändhållplatsen Ankarudden.', icon: '🚌' },
    ],
    harbors: [
    ],
    restaurants: [
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/toro — "Restaurang Sjöboden", sommaröppen vid Ankarudden; sjobodentoro.se — "Restaurang Sjöboden Torö Ankarudden", à la carte
      { name: 'Restaurang Sjöboden Torö', type: 'Restaurang', desc: 'Sommaröppen sjökrog vid Ankarudden på Torö med à la carte.', websiteUrl: 'https://sjobodentoro.se/' },
    ],
    tips: [
      'Kustvandringsleden är bäst vid solnedgång — dramatiska vyer mot Östersjön.',
      'Surfare kolla vindprognosen på windguru.cz specifikt för Torö.',
    ],
    related: ['nattaro', 'uto', 'galo'],
    tags: ['naturreservat', 'surf', 'kustlinje', 'södra', 'vandring'],
    did_you_know: 'Torö stenstrand på öns sydsida är en av Stockholms läns geologiska sevärdheter — en lång klapperstensstrand med stora rundslipade stenar formade under inlandsisens reträtt. Stranden är skyddad som naturreservat.',
    seasonal: {
      open: 'April–Oktober',
      peak: 'Juli',
      best: 'September',
      bestReason: 'Dramatisk kustlinje och bäst för havsöringsfiske i september. Surfvindarna är starkast på hösten — utan juliträngseln.',
      months: ['off','off','off','limited','open','open','peak','peak','open','limited','off','off'],
    },
  },
  // ─── FJÄRDLÅNG ───────────────────────────────────────────────
  {
    slug: 'fjardlang',
    name: 'Fjärdlång',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🪨',
    // KÄLLA: Länsstyrelsen Stockholm, naturreservat Fjärdlång (https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/fjardlang.html) — skyddat sedan 1986, förvaltas av Skärgårdsstiftelsen och USF-Ö Fastighet AB (läst 2026-09-14)
    tagline: 'Orört naturreservat i södra ytterskärgården — här åker man hit, inte förbi.',
    description: [
      'Fjärdlång är en större ö i Stockholms södra skärgård öster om Dalarö och Ornö. Ön är skyddad som naturreservat och förvaltas av Skärgårdsstiftelsen, ett tag av Stockholms läns finaste oexploaterade skärgårdsmiljöer med klippkust, blandskog och rikt fågelliv.',
      'På ön finns vandrarhem, stuguthyrning och campingplats.',
      'Fjärdlång nås med Waxholmsbåt eller egen båt från Dalarö. Markerade vandringsleder av varierande längd och svårighetsgrad gör ön till en av södra skärgårdens bästa platser för en längre dagsutflykt eller weekend.',
    ],

    facts: {
      travel_time: '1–1,5 h med Waxholmsbåt från Dalarö (linje 19)',
      character: 'Naturreservat, inga permanentbor, orört',
      season: 'Juni–Augusti',
      best_for: 'Seglare, naturälskare, stillhet',
    },
    activities: [
      // KÄLLA: https://skargardsstiftelsen.se/omraden/fjardlang/ — "gott om fina naturhamnar i naturreservatet"
      { icon: '⛵', name: 'Naturhamnar', desc: 'Gott om naturhamnar i naturreservatet, enligt Skärgårdsstiftelsen.' },
      { icon: '🚶', name: 'Klippvandring', desc: 'Vandra längs östkusten för dramatiska havsvyer.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Rent klart vatten i ytterskärgårdsläge.' },
    ],
    accommodation: [
      { name: 'Fjärdlångs Vandrarhem', type: 'Vandrarhem', desc: '32 bäddar, öppet maj till mitten av september. Drivs i Skärgårdsstiftelsens regi.' },
      { name: 'Norrötorpet', type: 'Stugor', desc: 'Liten 33 m² stuga utan el — vatten från pump, utedass, bastu vid egen brygga. Ta med egen mat.' },
    ],
    // KÄLLA: Waxholmsbolaget linje 19 (https://kund.printhuset-sthlm.se/wa/v19.pdf): Dalarö–Fjärdlång ca 1 h 10 min, året runt, flera turer kräver förbeställning (läst 2026-09-14)
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Dalarö', time: '1–1,5 h', desc: 'Reguljär skärgårdslinje under säsong. Kontrollera Waxholmsbolagets tidtabell.', icon: '⛴' },
      { method: 'Egen båt', from: 'Dalarö / Utö', time: '1–2 h', desc: 'Naturhamnar och en liten gästhamn i reservatet.', icon: '⛵' },
    ],
    harbors: [
      // KÄLLA: https://skargardsstiftelsen.se/omraden/fjardlang/ — "Det finns en liten gästhamn samt gott om fina naturhamnar i naturreservatet". Ingen service nämnd.
      { name: 'Fjärdlångs gästhamn', desc: 'Liten gästhamn och gott om naturhamnar i naturreservatet. Förvaltas av Skärgårdsstiftelsen.', fuel: false, service: [] },
    ],
    restaurants: [],
    tips: [
      'Norrötorpet är el-fritt — perfekt för digital detox men kräver planering.',
      'Markerade vandringsleder av olika längd — bra för både dagsutflykt och längre vistelse.',
    ],
    activity_meta: {
      // KÄLLA: Stockholm Archipelago Trail, https://stockholmarchipelagotrail.com/section/ (2026-09-17)
      vandring: { trails: 1, max_km: 11.7, sat: { km: 11.7, difficulty: 'Medel' } },
    },
    related: ['uto', 'nattaro', 'landsort'],
    tags: ['naturreservat', 'skärgårdsstiftelsen', 'vandrarhem', 'södra'],
    did_you_know: 'Fjärdlång förvaltas av Skärgårdsstiftelsen och vandrarhemmet med 32 bäddar är öppet maj till mitten av september. Stugan Norrötorpet — 33 m² utan el — är en av få platser i Stockholms skärgård där man fortfarande hämtar vatten med handpump och bastubadar vid egen brygga.',
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli',
      best: 'Mitten av juni',
      bestReason: 'Naturreservat i yttre sydskärgården — bäst precis före högsäsongen när allt är öppet och tomt.',
      warning: 'Begränsad service. Inga reguljära förbindelser — kräver egen båt.',
      months: ['off','off','off','off','off','open','peak','open','limited','off','off','off'],
    },

  },
  // ── BATCH 3: Ytterligare öar för full konkurrenskraft ───────────────────

  {
    slug: 'rindo',
    name: 'Rindö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🏛',
    tagline: 'Tidigare KA 1-regementet — militärhistoria omvandlad till bostadsö nära Vaxholm',
    description: [
      'Rindö ligger i Stockholms inre skärgård öster om Vaxholm. Ön har en rik militärhistoria. Vaxholms kustartilleriregemente (KA 1) bildades på Rindö 1 januari 1902 och kasernbyggnaderna stod klara 1906, ritade av arkitekt Erik Josephson efter standardplaner för infanteriet. Regementet bemannade Vaxholms fästning, Oscar-Fredriksborgs fästning och Hörningsholms kustposition.',
      'KA 1 lades ned 30 juni 2000 och ersattes av Vaxholms Amfibieregemente (Amf 1) som 2006 flyttade till Berga örlogsbas. Sedan dess har Vasallen omvandlat kasernområdet till ett växande bostadsområde. Rindö är idag i första hand en bostadsö för Vaxholms-pendlare, med kvarvarande militärhistoriska byggnader och fortifikationer.',
      'Rindö passar för dagsbesök från Vaxholm, för promenader bland kasernerna och Oscar-Fredriksborgs fortifikationer, eller som boendeort för dem som vill kombinera skärgårdsläge med Stockholms-pendling.',
    ],
    facts: { travel_time: '6 min med bilfärja från Vaxholm (Vaxholmsleden)', character: 'Militärhistoria, bostadsö, broförbunden', season: 'Helår', best_for: 'Militärhistoria, vandring, dagsutflykt från Vaxholm' },
    activities: [
      { icon: '🏛', name: 'KA 1-området', desc: 'Promenera bland Erik Josephsons kasernbyggnader från 1906 — idag bostäder och kulturmiljö.' },
      { icon: '🏰', name: 'Oscar-Fredriksborgs fästning', desc: 'Bevarad kustartillerifästning från sent 1800-tal/tidigt 1900-tal.' },
      { icon: '🚶', name: 'Promenader', desc: 'Stigar längs öns klippkust och genom de gamla militärområdena.' },
    ],
    accommodation: [],
    // KÄLLA: Trafikverket, Vaxholmsleden (https://www.trafikverket.se/resa-och-trafik/farjetrafik/vaxholmsleden/, 970 m, 6 min, avgiftsfri) och Oxdjupsleden (https://www.trafikverket.se/resa-och-trafik/farjetrafik/oxdjupsleden/) (500 m, 3 min, avgiftsfri) (läst 2026-09-14)
    getting_there: [
      { method: 'Bilfärja', from: 'Vaxholm', time: '6 min', desc: 'Trafikverkets vägfärja Vaxholmsleden Vaxholm–Rindö, 970 m, avgiftsfri.', icon: '⛴' },
      { method: 'Bilfärja', from: 'Stenslätten (Värmdö)', time: '3 min', desc: 'Trafikverkets vägfärja Oxdjupsleden Rindö–Stenslätten, 500 m, avgiftsfri — vägen österut mot Värmdö.', icon: '⛴' },
    ],
    harbors: [{ name: 'Rindö hamn', desc: 'Liten gästbrygga med begränsat antal platser.' }],
    restaurants: [],
    tips: ['Kombinera gärna med ett besök på Vaxholms fästning på Vaxholmen-sidan.', 'Vasallens omvandling av kasernerna är en av Sveriges större militära konversionsprojekt — värt en promenad.'],
    related: ['vaxholm', 'resaro', 'ljustero'],
    tags: ['militärhistoria', 'KA 1', 'bostadsö', 'nära Vaxholm', 'mellersta'],
    did_you_know: 'Vaxholms kustartilleriregemente (KA 1) bildades på Rindö 1902 och bemannade Vaxholms och Oscar-Fredriksborgs fästningar. Efter regementets nedläggning 2000 omvandlade Vasallen de gamla kasernerna — ritade av Erik Josephson 1906 — till bostäder, vilket gjorde Rindö till ett av Sveriges mest kända exempel på militär konversion.',
    seasonal: {
      open: 'Helår',
      peak: 'Juni–Augusti',
      best: 'Maj–September',
      bestReason: 'Militärhistorisk ö med enkel bilfärja från Vaxholm. Kasernerna och befästningarna är intressanta hela sommarhalvåret.',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },
  },
  {
    slug: 'yxlan',
    name: 'Yxlan',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🚲',
    tagline: 'Ön med bilfärja åt två håll – Furusund i väster, Blidö i öster och sju Waxholmsbryggor däremellan.',
    seoTitle: 'Yxlan – färja från Furusund, bryggor & cykling',
    seoDescription: 'Yxlan mellan Furusund och Blidö: avgiftsfria vägfärjor på fyra minuter, Waxholmsbolagets linje 24 till sju bryggor, SL-buss 632 från Norrtälje och vandringsled över ön.',
    // Ifylld 2026-09-21 efter Toms beslut "fyll ut med belagt innehåll". Boende, affär och krog på ön har inte kunnat beläggas hos någon operatör och står därför inte här.
    description: [
      // KÄLLA: Trafikverket, Furusundsleden (https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/) — Furusund–Yxlan, 600 m, fyra minuter, avgiftsfri; Blidöleden (https://www.trafikverket.se/resa-och-trafik/farjetrafik/blidoleden/) — Yxlan–Blidö, 530 m, 4 minuter, avgiftsfri (båda lästa 2026-09-21). SL buss 632 Norrtälje–Yxlan, https://kund.printhuset-sthlm.se/sl/h632.pdf — hållplatser i ordning: Norrtälje busstation … Furusunds färjeläge, Köpmanholm, Köpmanholms skola … Yxlö brygga … Yxlövik … Alsvik … Vagnsunda (läst 2026-09-21)
      'Yxlan ligger mellan Furusund och Blidö i norra skärgården och nås med bil: Trafikverkets vägfärjor går både från Furusund (Furusundsleden, 600 meter, fyra minuter) och vidare till Blidö (Blidöleden, 530 meter, fyra minuter). Båda är avgiftsfria. Utan bil tar du SL:s buss 632 från Norrtälje busstation – den åker med färjan över och fortsätter via Köpmanholm, Yxlö och Yxlövik till Vagnsunda i öns östra ände.',
      // KÄLLA: Waxholmsbolaget linje 24 Stockholm–Vaxholm–Blidösundet, https://kund.printhuset-sthlm.se/wa/h24.pdf (gäller 2 april–18 juni och 17 augusti–1 november 2026): Strömkajen 08.45 → Vaxholm 09.40 → Siaröfortet 10.35 → Själbottna 11.00 → Vagnsunda (Yxlan) 11.01; Alsvik, Yxlövik, Duvnäs, Kolsvik, Yxlö och Köpmanholm (Yxlan) med X = "trafikeras utan fast avgångstid" (läst 2026-09-21)
      'Från Stockholm går Waxholmsbolagets linje 24 från Strömkajen via Vaxholm och Siaröfortet ut i Blidösundet och angör sju bryggor på Yxlan: Vagnsunda, Alsvik, Yxlövik, Duvnäs, Kolsvik, Yxlö och Köpmanholm. Strömkajen–Vagnsunda tar omkring 2 timmar 15 minuter. De flesta övriga bryggor trafikeras utan fast tid, så sök resan i SL-appen och räkna med att båten går när det finns resenärer.',
      // KÄLLA: Stockholm Archipelago Trail, https://stockholmarchipelagotrail.com/section/ (2026-09-17) — etapp över Yxlan, 24 km. Länsstyrelsen Stockholm, Själbottna-Östra Lagnö naturreservat, https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sjalbottna-ostra-lagno.html — skyddat sedan 1977, 532 ha, markägare och förvaltare Skärgårdsstiftelsen, "bra tältplats", "strövvänliga skogarna är rika på bär och svamp", "Till Själbottna går reguljär Waxholmsbåt sommartid" (läst 2026-09-21); linje 24: Själbottna 11.00, Vagnsunda 11.01
      'Ön passar den som vill cykla eller gå: Stockholm Archipelago Trail har en 24 kilometer lång etapp över Yxlan, och vägarna binder ihop bryggorna från färjeläget vid Köpmanholm till Vagnsunda. Bryggan före Vagnsunda är Själbottna, ett naturreservat sedan 1977 som Skärgårdsstiftelsen förvaltar – strövvänlig skog med bär och svamp, tältplats och slipade klippor. Waxholmsbåten lägger till där en minut innan den når Yxlan.',
    ],
    facts: { travel_time: 'Bil + avgiftsfri vägfärja från Furusund (fyra minuter) · Waxholmsbåt linje 24 ca 2 h 15 min till Vagnsunda', character: 'Stor ö med bilfärja åt två håll och sju Waxholmsbryggor', season: 'Maj–oktober', best_for: 'Cykling, vandring, dagsutflykt med bil, ö-hopp till Själbottna' },
    facts_provenance: { travel_time: 'matt', character: 'matt', season: 'bedomning', best_for: 'bedomning' },
    activities: [
      // Tidigare stod "bilfärja från Räfsnäs" — Räfsnäs ligger på Rådmansö och färjan därifrån går till Tjockö, inte Yxlan. Struket 2026-09-21.
      { icon: '🚲', name: 'Cykling', desc: 'Ta färjan från Furusund och cykla över ön mot Blidöleden – vägarna binder ihop bryggorna. Buss 632 och båda vägfärjorna gör det enkelt att åka en väg och cykla tillbaka.' },
      // KÄLLA: Stockholm Archipelago Trail, https://stockholmarchipelagotrail.com/section/ (2026-09-17) — etapp över Yxlan, 24 km
      { icon: '🚶', name: 'Vandring', desc: 'Stockholm Archipelago Trail går över Yxlan, en etapp på 24 km enligt ledens egen sida.' },
      // KÄLLA: Länsstyrelsen Stockholm, https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sjalbottna-ostra-lagno.html — bad/badplats, fiske, tältplats, torrdass, stig; "tälta mer än två dygn i följd på samma plats" förbjudet; hund kopplad; öppen eld förbjuden (läst 2026-09-21)
      { icon: '⛺', name: 'Själbottna naturreservat', desc: 'Grannön mot söder, brygga intill Vagnsunda på linje 24. Länsstyrelsen anger bad, fiske, tältplats och torrdass; strandängar och bär- och svamprik skog. Högst två dygn på samma tältplats, hund kopplad och ingen öppen eld.' },
    ],
    // "Yxlans Vandrarhem", "Köpmanholms Gästhamn" med service och "Yxlans Café" stod här utan källa och kunde inte beläggas på någon operatörssida — strukna 2026-09-21.
    accommodation: [],
    // KÄLLA: Trafikverket, https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/ — "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård"; "Färjeledens längd är 600 meter"; "överfartstiden är fyra minuter"; "Resan med vägfärjan är avgiftsfri" (läst 2026-09-19). SL buss 632, https://kund.printhuset-sthlm.se/sl/h632.pdf (läst 2026-09-21). Waxholmsbolaget linje 24, https://kund.printhuset-sthlm.se/wa/h24.pdf — Strömkajen 08.45 → Vagnsunda 11.01 (läst 2026-09-21)
    getting_there: [
      { method: 'Bil + bilfärja', from: 'Stockholm via Furusund', desc: 'Kör mot Norrtälje och vidare till Furusund. Furusundsleden (Trafikverkets vägfärja, 600 m, fyra minuter, avgiftsfri) över till Yxlan; Blidöleden (530 m, fyra minuter, avgiftsfri) fortsätter till Blidö.', icon: '🚗' },
      { method: 'Buss', from: 'Norrtälje busstation', desc: 'SL-buss 632 Norrtälje–Yxlan åker med färjan från Furusund och stannar vid Köpmanholm, Yxlö brygga, Yxlövik, Alsvik och Vagnsunda. Sista biten efter Köpmanholms skola körs bara om det finns resenärer i bussen.', icon: '🚌' },
      { method: 'Waxholmsbolaget linje 24', from: 'Strömkajen via Vaxholm', time: 'ca 2 h 15 min till Vagnsunda', desc: 'Linje 24 Stockholm–Vaxholm–Blidösundet angör Vagnsunda med fast tid och Alsvik, Yxlövik, Duvnäs, Kolsvik, Yxlö och Köpmanholm utan fast tid. Sök resan i SL-appen; gäller 2 april–18 juni och 17 augusti–1 november.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 136,
      nearest_hub: 'Furusund',
      from_nearest_hub_min: 4,
      operator: 'Waxholmsbolaget',
      line: '24',
      frequency: 'Enstaka turer per dag; de flesta bryggor utan fast tid',
    },
    harbors: [],
    restaurants: [],
    tips: [
      'Båda vägfärjorna (Furusund–Yxlan och Yxlan–Blidö) är avgiftsfria och tar fyra minuter.',
      'Buss 632 från Norrtälje åker med färjan över och går ända till Vagnsunda – bra om du vill vandra ledens etapp åt ett håll.',
      'Bara Vagnsunda har fast tid på linje 24. Ska du av vid någon annan brygga, sök resan i SL-appen och kontrollera att turen angör den.',
      'Affär, krog och boende på ön har vi inte kunnat belägga hos någon operatör – ta med det du behöver.',
    ],
    activity_meta: {
      // KÄLLA: Stockholm Archipelago Trail, https://stockholmarchipelagotrail.com/section/ (2026-09-17; läst igen 2026-09-26: "Section Yxlan Moderate 24 km")
      vandring: { trails: 1, max_km: 24, sat: { km: 24, difficulty: 'Medel' } },
    },
    related: ['blido', 'furusund', 'graddo'],
    tags: ['stor ö', 'bilfärja', 'cykling', 'vandring', 'norra', 'köpmanholm'],
    did_you_know: 'Yxlan nås med två avgiftsfria vägfärjor: Furusundsleden (600 m) från Furusund och Blidöleden (530 m) vidare till Blidö – fyra minuter vardera, enligt Trafikverket.',
    // seasonal borttaget 2026-09-26: månadskalendern angav januari–april som stängt, men ön är bebodd och vägfärjorna har tidtabell även sent på hösten (Trafikverket). "Färjorna går tätt och vägarna är lugna" i juni hade ingen källa.
  },
  {
    slug: 'kymmendo',
    name: 'Kymmendö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '✍️',
    tagline: 'Strindbergs ö — litteraturhistoria mitt i skärgården',
    description: [
      'Kymmendö är en bilfri ö i mellersta skärgården som har en exceptionell plats i svensk litteraturhistoria. August Strindberg tillbringade sju somrar här mellan 1871 och 1883 och fick på ön inspirationen till en av sina mest lästa romaner, "Hemsöborna" (1887). Karaktärerna Madam Flod och Gusten har förebilder bland Kymmendös faktiska invånare på den tiden.',
      'Ön är känd för sina naturvärden, skogsrika partier växlar med öppna ljunghedar och klippor. Bebyggelsen är fortfarande småskalig och ön är till stor del oexploaterad jämfört med andra mellersta skärgårdsöar.',
      'Kymmendö passar bäst för litteratur- och historieintresserade som vill se "det riktiga Hemsö", eller för den som söker en lugn sidoväg i mellersta skärgården.'
    ],

    facts: { travel_time: '2,5–3 h från Strömkajen · ca 15 min från Dalarö (linje 19)', character: 'Bilfri, historisk, litterär', season: 'Juni–september', best_for: 'Litteraturintresserade, Strindberg-fans, naturälskare' },
    activities: [
      { icon: '✍️', name: 'Strindbergsstugan', desc: 'Stugan där Strindberg bodde och hämtade inspiration till "Hemsöborna" (1887).' },
      { icon: '🥾', name: 'Vandring', desc: 'Korta men stämningsfulla stigar runt ön med klippvyer.' },
    ],
    accommodation: [],
    // KÄLLA: Waxholmsbolaget linje 19 (https://kund.printhuset-sthlm.se/wa/v19.pdf): Dalarö–Kymmendö ca 13–17 min, Strömkajen–Kymmendö ca 2 h 45 min–3 h; vissa turer utan fast tid/förbeställning (läst 2026-09-14)
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Strömkajen / Dalarö', time: '2,5–3 h / 1 h', desc: 'Reguljär skärgårdslinje — kontrollera Waxholmsbolagets tidtabell.', icon: '⛴' },
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Naturhamnen på södra sidan tar emot ett fåtal båtar.', icon: '⛵' },
    ],
    harbors: [{ name: 'Kymmendö naturhamn', desc: 'Skyddad vik på södra sidan. Ankring möjlig.' }],
    restaurants: [],
    tips: ['Läs Hemsöborna innan besöket.', 'Ta med allt — ingen butik eller service finns.', 'Planera vistelsen med vädret i tanke, svår att lämna vid storm.'],
    related: ['orno', 'dalaro', 'nattaro'],
    tags: ['Strindberg', 'literär', 'orört', 'historia', 'mellersta'],
    did_you_know: 'Kymmendö är känd som platsen där August Strindberg skildrade skärgårdslivet i romanen "Hemsöborna" från 1887 — en av Sveriges mest lästa böcker.',
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Lugn sydskärgårdsö med bra ankring — bäst besökt utanför juli-toppet.',
      months: ['off','off','off','off','off','open','peak','peak','open','limited','off','off'],
    },

  },
  {
    slug: 'bullero',
    name: 'Bullerö',
    region: 'mellersta',
    regionLabel: 'Mellersta ytterskärgården',
    emoji: '🎨',
    // KÄLLA: Länsstyrelsen Stockholm, Nämdöskärgårdens nationalpark (https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html) (invigd sept 2025): "Bullerö är nationalparkens entré" (läst 2026-09-14)
    tagline: 'Huvudentré till Nämdöskärgårdens nationalpark — Bruno Liljefors ö',
    description: [
      // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark — "Huvudentrén finns på ön Bullerö", bildades 2025 (hämtad 2026-08-19)
      // Uppgifterna bekräftade per telefon med Nämdöskärgårdens nationalpark 2026-08-19.
      'Bullerö är huvudentré till Nämdöskärgårdens nationalpark — invigd 2025 och den första marina nationalparken i Östersjön. Parken omfattar ett tusental öar, kobbar och skär, och 97 procent av ytan är hav.',
      // KÄLLA: samma sida — "När nationalparken bildades år 2025 fanns två naturreservat i området, Bullerö och Långviksskärs naturreservat." Bullerö naturreservat uppgick alltså i nationalparken.
      'Fram till 2025 var ön ett eget naturreservat. I dag ingår Bullerö i nationalparken, som förvaltas av Länsstyrelsen Stockholm.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html — "en varm raststuga och vedeldad bastu som är öppna året om. På ön finns vandringsleder av olika svårighetsgrad, en informationsplats, en badstrand, en tältplats och ett litet museum i konstnären Bruno Liljefors före detta jaktstuga. Delar av ön är tillgänglighetsanpassade så att det går att ta sig runt med rullstol, barnvagn eller rullator" (läst 2026-09-19)
      'På Bullerö finns en varm raststuga och en vedeldad bastu som är öppna året om, vandringsleder av olika svårighetsgrad, en badstrand, en tältplats och ett litet museum i konstnären Bruno Liljefors före detta jaktstuga. Delar av ön är tillgänglighetsanpassade, så att det går att ta sig runt med rullstol, barnvagn eller rullator.',
      'Bullerö passar för dagsturer och naturhamnsbesök för seglare och naturälskare som vill se den verkliga ytterskärgården och en del av svensk konsthistoria på samma plats.',
    ],
    facts: { travel_time: '3–4 h med segelbåt från Stavsnäs', character: 'Nationalpark, ytterskärgård, konsthistorisk plats', season: 'Maj–september', best_for: 'Jaktstugan, bastu, fågelskådning, segling' },
    activities: [
      // KÄLLA: https://www.sverigesnationalparker.se/sv — Jaktstugan, Bastun på Bullerö ("öppen för alla och går inte att boka"), Brunos slinga (hämtad 2026-08-19)
      { icon: '🎨', name: 'Jaktstugan', desc: 'Bruno Liljefors jaktstuga — i dag utställning om nationalparken och livet i Östersjön.' },
      { icon: '🧖', name: 'Bastun på Bullerö', desc: 'Öppen för alla och går inte att boka.' },
      { icon: '🚶', name: 'Brunos slinga', desc: 'Historisk vandringsled i konstnärens fotspår.' },
      { icon: '🦅', name: 'Fågelliv', desc: 'Havsörn, ejder, vigg och olika sjöfågel häckar i området.' },
    ],
    accommodation: [],
    // KÄLLA: https://bullero.se/sv/turtrafiken/ — "För att komma till Bullerö res med Bullerölinjen" (uppdaterad 2026-02-12, hämtad 2026-08-19)
    getting_there: [{ method: 'Båttaxi (Bullerölinjen)', from: 'Stavsnäs', time: 'Se battaxi.se', desc: 'Bullerö nås med Bullerölinjen, inte Waxholmsbolaget. Boka plats och se aktuell tidtabell på battaxi.se, eller res med egen båt.', icon: '⛴' }],
    // KÄLLA: Nämdöskärgårdens nationalpark per telefon 2026-08-19 — naturhamn gäller, inga gästhamnsplatser, ingen restaurang och inget café på ön.
    harbors: [{ name: 'Naturhamn', desc: 'Naturhamn gäller — inga gästhamnsplatser. Bryggan i Hemviken är reserverad för personal och entreprenörer. Ingen service, ingen restaurang, inget café.' }],
    restaurants: [],
    tips: ['Jaktstugan är öppen sommarsäsong — kontrollera öppettider innan besök.', 'Ingen restaurang, inget café och ingen affär på ön. Ta med allt du behöver.', 'Nationalparkens föreskrifter gäller — läs på sverigesnationalparker.se innan besök.'],
    related: ['nattaro', 'gallno', 'sandhamn'],
    tags: ['nationalpark', 'liljefors', 'konsthistoria', 'ytterskärgård', 'mellersta'],
    did_you_know: 'Bullerö är huvudentré till Nämdöskärgårdens nationalpark, Sveriges 31:a och första marina nationalpark i Östersjön. Den invigdes på ön i september 2025. Konstnären Bruno Liljefors köpte Bullerö 1908 och byggde sin jaktstuga året efter — i dag rymmer den parkens utställning.',
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli',
      best: 'Maj–Juni eller September',
      bestReason: 'Nationalpark utan fast boende — alltid lugnt. September ger havsfärger och få andra besökare.',
      warning: 'Ingen restaurang, inget café, ingen service. Naturhamn utan gästhamnsplatser. Ta med allt du behöver. Res med Bullerölinjen — kontrollera tidtabell på battaxi.se.',
      months: ['limited','limited','limited','limited','open','open','peak','open','open','limited','limited','limited'],
    },
  },
  {
    slug: 'vindo',
    name: 'Vindö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌳',
    tagline: 'Större broförbunden ö i Värmdö-skärgården — skog, vikar och båtliv',
    description: [
      'Vindö är en större ö i Stockholms mellersta skärgård i Värmdö kommun, broförbunden med fastlandet via Djurö i söder och med Skarpö i öster. Det gör Vindö till en av de mest tillgängliga öarna i området, man kör hela vägen utan färja.',
      'Skogen är tät och flera vandringsstigar leder mellan klippkust och inland. Badplatser längs kusten är ofta lugnare än på de mer turisttyngda öarna i området. Vindö är ett populärt sommarstugeområde med stark båtkultur. Stavsnäs och Stockholms inre skärgård ligger nära.',
      'Vindö passar för den som vill kombinera enkla bilförbindelser med skärgårdsnatur, eller som utgångspunkt för båtutflykter mot Stavsnäs och de yttre öarna.',
    ],
    facts: { travel_time: '1 h med bil från Stockholm', character: 'Stor broförbunden ö, skog, sommarstugor', season: 'Maj–oktober', best_for: 'Vandring, sommarboende, båtutflykter' },
    activities: [
      { icon: '🌳', name: 'Vandring', desc: 'Stigar genom blandskog och längs klippkust.' },
      { icon: '🚲', name: 'Cykling', desc: 'Cykla längs grusvägar via Djurö och vidare ut till Skarpö. Smala skogsvägar med karaktär och aldrig långt till vattnet. Del av Värmdö-öarnas sammanlänkade cykelnät — bra dagstur från Stavsnäs.' },
      { icon: '🏊', name: 'Klipp- och sandbad', desc: 'Mindre badplatser längs kusten — ofta lugnare än Värmdöns inre öar.' },
    ],
    accommodation: [{ name: 'Vindö Camping', type: 'Camping', desc: 'Välskött campingplats nära havet.' }],
      // KÄLLA: SL buss 434 (https://kund.printhuset-sthlm.se/sl/v433_434.pdf): Slussen 09.45 → Sollenkroka brygga 10.58 (ca 73 min); Överby brygga ca 85 min (vardag 07.03 → 08.29) (läst 2026-09-14). "Fast broförbindelse", väg 222 och bilrestiden 1 h är inte belagda och borttagna — bussen går dock hela vägen utan färja.
    getting_there: [
      { method: 'Bil', from: 'Stockholm via Värmdö', desc: 'Vägen fram går utan färja — buss 434 trafikerar sträckan hela vägen.', icon: '🚗' },
      { method: 'Buss', from: 'Slussen', time: 'ca 1 h 15 min', desc: 'SL-buss 434 Slussen–Vindö: ca 73 min till Sollenkroka brygga och ca 85 min till Överby brygga.', icon: '🚌' },
    ],
    harbors: [{ name: 'Vindö brygga', desc: 'Gästbrygga med vattenservice.' }],
    restaurants: [{ name: 'Vindö Hamnkafé', type: 'Kafé', desc: 'Fika och enkel mat vid bryggan, öppet sommarsäsong.' }],
    tips: ['Vindö är broförbunden — ingen färja krävs.', 'Bra utgångspunkt för båtutflykter mot Stavsnäs och Möja.', 'Cykla mellan Djurö och Vindö för en stilla halvdag.'],
    related: ['gallno', 'namdo', 'moja'],
    tags: ['stor ö', 'broförbunden', 'skog', 'sommarstugor', 'mellersta'],
    did_you_know: 'Vindö nås landvägen utan färja — ön är broförbunden via Djurö i söder. Tillsammans med Djurö och Skarpö bildar den ett av få sammanhängande bilförbundna ö-områden i mellersta skärgården, vilket gjort området till en av Stockholms tätaste sommarstugekluster.',
    seasonal: {
      open: 'April–Oktober',
      peak: 'Juli',
      best: 'Juni',
      bestReason: 'Broförbunden mellanskärgårdsö — tillgänglig hela säsongen utan färja. Lugnast och grönast i juni och tidig september.',
      months: ['off','off','off','limited','open','open','peak','peak','open','limited','off','off'],
    },
  },
  {
    slug: 'smaadalaro',
    name: 'Smådalarö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🏛',
    tagline: 'Smådalarö Gård (1810) — Stockholms skärgårds kanske mest välrenommerade spa-hotell.',
    description: [
      'Smådalarö är en del av Dalaröhalvön i Stockholms södra skärgård, broförbunden och nåbar med bil från Stockholm på cirka 50 minuter. Området har en lång historia, under 1700-talet drev löjtnant Carl Christian Gyldener jordbruk här och fick livstidsarrende 1750. 1802 köpte kapten Per Niklas Blom hela "Tyresö skärgården" av grevinnan Brita Bonde för 12 000 riksdaler, och 1810 stod Smådalarö Gård klar.',
      'Smådalarö Gård genomgick en omfattande renovering och öppnade sommaren 2021 som ett av Sveriges mest påkostade spahotell, 118 rum, 2 000 m² spa, flera restauranger och bredd av aktiviteter. Det är idag en av Stockholms skärgårds mest välkända destinationer för helgvistelser och konferens.',
      'Smådalarö passar för weekend-resor med fokus på spa, mat och natur, för konferenser, eller som utgångspunkt för utflykter mot Dalarö, Utö och de södra öarna.',
    ],
    facts: { travel_time: '50 min med bil från Stockholm', character: 'Spa-hotell, bilförbunden, herrgårdsmiljö', season: 'Helår', best_for: 'Spa-weekend, konferens, dagstur' },
    activities: [
      { icon: '🧖', name: 'Smådalarö Gård Spa', desc: '2 000 m² spa-anläggning med pooler, bastur och behandlingar — ett av Sveriges mest påkostade spa-hotell efter 2021 års renovering.' },
      { icon: '🍽', name: 'Restauranger', desc: 'Flera restauranger på Smådalarö Gård — fine dining, brasserie och bar.' },
      { icon: '🚶', name: 'Naturpromenader', desc: 'Vandring längs kust och skog runt Smådalaröhalvön.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Mindre badplatser längs kusten.' },
    ],
    accommodation: [{ name: 'Smådalarö Gård Hotell & Spa', type: 'Hotell', desc: 'Anrikt herrgårdshotell från 1810 — 118 rum, 2 000 m² spa, fullrenoverat 2021. Drivs av Sabis.' }],
    getting_there: [
      { method: 'Bil', from: 'Stockholm', time: '50 min', desc: 'E4 söderut mot Haninge, sen skylt mot Dalarö och Smådalarö.', icon: '🚗' },
    ],
    harbors: [{ name: 'Smådalarö Gästhamn', desc: 'Hamn vid Smådalarö Gård — full service, bra skydd, populär sommarhamn.', fuel: true, service: ['El', 'Vatten', 'Duschar', 'Tvätt'] }],
    restaurants: [{ name: 'Smådalarö Gård Restaurant', type: 'Restaurang', desc: 'Skärgårdsmat med lokala råvaror i historisk herrgårdsmiljö.' }],
    tips: ['Boka spa-tider långt i förväg — särskilt helger juli–augusti.', 'Smådalarö Gård är broförbunden — ingen båt krävs.', 'Brunch på helger är populär även för icke-hotellgäster (bokas i förväg).'],
    related: ['dalaro', 'orno', 'toro'],
    tags: ['spa-hotell', 'herrgård', 'broförbunden', 'södra', 'sabis'],
    // KÄLLA: https://www.smadalarogard.se/ — sjökaptenen Carl Peter Blom, köp 1802 (Brita Bonde), klart 1810; hotellets egen sida: 110 rum, 2 000 m² spa (2026-08-24)
    did_you_know: 'Smådalarö Gård byggdes 1802–1810 av sjökaptenen Carl Peter Blom efter att han 1802 köpt hela "Tyresö skärgården" från grevinnan Brita Bonde för 12 000 riksdaler. Efter renoveringen 2021 har Gården 110 rum och 2 000 m² spa.',
    seasonal: {
      open: 'Helår',
      peak: 'Juli–Augusti',
      best: 'Maj eller September',
      bestReason: 'Smådalarö Gård är öppet helåret. Välj maj eller september för lägre pris, öppet spa och utan sommarträngseln.',
      warning: 'Spa-tider bör bokas månader i förväg för juli–augustihelger.',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },
  },
  {
    slug: 'morko',
    name: 'Mörkö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🌊',
    tagline: 'Rå söderskärgård med orörd natur och gamla traditioner',
    description: [
      'Mörkö är en liten, lugn ö i södra skärgården som erbjuder en enkel och autentisk skärgårdsupplevelse långt från turistströmmarna. Ön förblir lugn trots att den är bilfärjebetjänad.',
      'Naturen på Mörkö är varierad med skogspartier och klippor. Det finns möjligheter för båd och enkel vistelse. Service är minimal, ingen restaurang men en handelsbod för grundbehov.',
      'Mörkö passar för den som redan är ute i södra skärgården och letar efter ett lugnt ankringsläge.'
    ],

    facts: { travel_time: '~1 tim från Stockholm (Mörköbron via Hölö/E4) eller Skanssundsleden från Södertörn', character: 'Rå, genuin, fiskartradition', season: 'Maj–oktober', best_for: 'Fiske, natur, äkta skärgård' },
    activities: [
      { icon: '🎣', name: 'Fiske', desc: 'Abborre och gädda i vikarna, havsöring längs ytterkusten.' },
      { icon: '🥾', name: 'Vandring', desc: 'Omarkerade stigar längs kusten med vyer mot Östersjön.' },
    ],
    accommodation: [{ name: 'Mörkö Stugor', type: 'Stugor', desc: 'Enkla stugor att hyra, boka via ön.' }],
    // KÄLLA: Trafikverket, Skanssundsleden (https://www.trafikverket.se/resa-och-trafik/farjetrafik/skanssundsleden/) Hörningsnäs–Mörkö, 330 m, 3 min, avgiftsfri (läst 2026-09-14). Broåret 1972 obelagt — borttaget.
    getting_there: [
      { method: 'Bil', from: 'Stockholm via E4/Hölö', time: 'ca 1 h', desc: 'Mörköbron från Hölö-sidan (avfart från E4).', icon: '🚗' },
      { method: 'Bil + bilfärja', from: 'Hörningsnäs (Södertörn)', time: '3 min överfart', desc: 'Trafikverkets vägfärja Skanssundsleden Hörningsnäs–Mörkö, 330 m, avgiftsfri.', icon: '⛴' },
    ],
    harbors: [{ name: 'Mörkö hamn', desc: 'Enkel gästbrygga med begränsat antal platser.' }],
    restaurants: [],
    tips: ['Ta med proviant — service är minimal.', 'Kontakta ö-borna för lokaltips.'],
    related: ['orno', 'dalaro', 'fjardlang'],
    tags: ['fiske', 'genuin', 'södra', 'orört'],
    did_you_know: 'Mörkö är broförbundet med fastlandet sedan 1972 (Mörköbron från Hölö-sidan) men kan också nås via Trafikverkets avgiftsfria färja Skanssund från Sorunda-Grödinge — en av få platser där en fast bro och en gratisfärja båda finns kvar parallellt.',
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Mörkö nås med bilväg och är en stor naturö i sydskärgården. Bra vandringsterräng utan högsäsongsträngseln.',
      months: ['off','off','off','limited','open','open','peak','peak','open','limited','off','off'],
    },

  },
  {
    slug: 'musko',
    name: 'Muskö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '⚓',
    tagline: 'Gamla marinbasen — berghällshamnar och industrihistoria',
    description: [
      'Muskö är en större ö i södra skärgården som erbjuder varierad natur och en blandning av fast befolkning och sommargäster. Ön är bilfärjebetjänad och erbjuder goda möjligheter för längre vistelse.',
      'Muskö kombinerar skogsrika områden med öppna partier och väl utvecklad kustlinje. Det finns flera hamnar, restauranger och kaféer. Cykelvägar löper längs vägnätet.',
      'Muskö passar för familjer som söker ett lugnt alternativ till de populäraste södra öarna.'
    ],

    facts: { travel_time: '~1 tim från Stockholm via Muskötunneln', character: 'Industrihistoria, klippor, halvö', season: 'Maj–oktober', best_for: 'Historia, klippbad, natur' },
    activities: [
      { icon: '🚲', name: 'Cykling', desc: 'Kuperat landskap med kustängar och höga klippor mot Mysingen. Cykla längs öns strandvägar och utforska det öppna beteslandskapet. Tillgänglig med bil via bro — ingen båt behövs.' },
      { icon: '🏛', name: 'Marinbasens museum', desc: 'Guidade turer i den underjordiska berganläggningen (bokningsbar).' },
      { icon: '🏊', name: 'Klippbad', desc: 'Fina badplatser längs sydkusten med klara vatten.' },
    ],
    accommodation: [],
    // KÄLLA: Trafikverket (Muskötunneln 2 910 m, allmän trafik sedan mars 1964); SL buss 849 Ösmo centrum–Muskö (https://kund.printhuset-sthlm.se/sl/v849.pdf, gäller 2026), Ösmo–Hyttan ca 35–40 min (läst 2026-09-14)
    getting_there: [
      { method: 'Bil', from: 'Stockholm', desc: 'Väg 73 mot Nynäshamn, avfart mot Muskö, genom Muskötunneln (2 910 m, öppen för allmän trafik sedan 1964).', icon: '🚗' },
      { method: 'Buss', from: 'Ösmo centrum', time: 'ca 35–40 min', desc: 'SL-buss 849 Ösmo–Muskö (ändhållplats Hyttan). Pendeltåg till Ösmo.', icon: '🚌' },
    ],
    harbors: [{ name: 'Muskö gästbrygga', desc: 'Enkel brygga nära gamla marininfarten.' }],
    restaurants: [],
    tips: ['Boka marinbas-tur i god tid, populärt sommartid.', 'Ta med fika och grillmat.'],
    related: ['dalaro', 'toro', 'galo'],
    tags: ['marinbas', 'industrihistoria', 'södra', 'klippor'],
    did_you_know: 'Musköbasen är en av världens största underjordiska örlogsbaser — 1,5 miljoner kubikmeter berg sprängdes ut under 19 års byggtid (klar 1969), större volym än Gamla stan i Stockholm. Tunneln dit (Muskötunneln, invigd 1964) går max 65 meter under havsytan.',
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Stora naturytor och marinahistoria — bäst besökt utanför juli.',
      months: ['off','off','off','limited','open','open','peak','peak','open','limited','off','off'],
    },

  },
  {
    slug: 'bjorko',
    name: 'Björkö (Birka)',
    region: 'mellersta',
    regionLabel: 'Mälaren',
    emoji: '⚔️',
    tagline: 'Vikingastaden Birka — UNESCO-världsarv i Mälaren',
    description: [
      'Björkö är en historisk ö i Mälaren som erbjuder ett fascinererande samband mellan vikingatid och modernt skärgårdsliv. Ön är populär bland historieintresserade och familjer.',
      'Arkäologiska utgrävningar och museet på Björkö berättar om vikingasamhället som blomstrade här för över tusen år sedan. Naturmässigt är ön varierad med skog och badplatser.',
      'Björkö nås enkelt från Stockholm och passar perfekt som dagsdestination för familjer med intresse för historia. Kombinationen av arkeologi och skärgårdsnatur gör den unik.'
    ],

    facts: { travel_time: 'ca 2 h med Strömmas Birkabåt från Klara Mälarstrand', character: 'UNESCO, viking, Mälaren', season: 'Maj–september', best_for: 'Historia, arkeologi, kultur' },
    activities: [
      { icon: '⚔️', name: 'Birkas museum', desc: 'Utställning om vikingatidens handel och samhälle.' },
      { icon: '⛏', name: 'Arkeologisk visning', desc: 'Guidade turer till gravhögar och vallgravar (på engelska och svenska).' },
    ],
    accommodation: [],
    // KÄLLA: https://www.birkavikingastaden.se/resa-hit/ (Strömma, Klara Mälarstrand 2; stopp Nya Kungshatt, Jungfrusund, Vårby, Hovgården/Adelsö; lågsäsong nov–apr stängt) (läst 2026-09-14). Stod "3 h t/r med båt" utan operatör.
    getting_there: [
      { method: 'Turbåt (Strömma)', from: 'Klara Mälarstrand, Stockholm', time: 'ca 2 h', desc: 'Strömmas Birkabåt från Klara Mälarstrand vid Stadshuset, med stopp bl.a. vid Hovgården (Adelsö). Museet och restaurangen är stängda november–april. Waxholmsbolaget trafikerar inte Björkö i Mälaren.', icon: '⛴' },
    ],
    harbors: [{ name: 'Björkö brygga', desc: 'Turistbåtsbrygga med gästmöjligheter.' }],
    restaurants: [{ name: 'Birka Bistro', type: 'Restaurang', desc: 'Enkel mat och fika nära museet.' }],
    tips: ['Boka biljett online — populärt sommartid.', 'Kombinera med Adelsö på samma dagstur.', 'Ta solkräm — lite träd på ön.'],
    related: ['adelsjo', 'vaxholm', 'fjaderholmarna'],
    tags: ['UNESCO', 'vikingar', 'historia', 'Mälaren', 'dagstur'],
    did_you_know: 'Björkö är platsen för Birka, en av Nordens viktigaste vikingatida handelsstäder. UNESCO-platsen är aktiv arkeologisk utgrävning än idag.',
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Maj–Juni',
      bestReason: 'Museet och de arkeologiska guidningarna öppnar i maj. Välj juni för turer utan köer och med plats på M/S Birka.',
      warning: 'Museum och guidade turer är stängda oktober–april.',
      months: ['off','off','off','off','open','open','peak','peak','open','limited','off','off'],
    },
  },
  {
    slug: 'adelsjo',
    name: 'Adelsö',
    region: 'mellersta',
    regionLabel: 'Mälaren',
    emoji: '👑',
    tagline: 'Kungsgård och medeltida kyrka vid Birkas granne',
    description: [
      'Adelsö är en större ö som erbjuder lugn, historia och en varierad natur. Ön är tillgänglig både för bilister och båtturister och kombinerar kulturhistoria med naturupplevelse.',
      'Adelsö har en lång historisk tradition med gamla sätesgårdar och kyrka från medeltiden. Naturmässigt erbjuder öns vägnät möjligheter för cykling och vandring.',
      'Adelsö passar för familjer som söker en balanserad blandning av historia, natur och service.'
    ],

    facts: { travel_time: 'Bil via Ekerö och Munsö, Adelsöleden 6 min (gratis)', character: 'Kungsgård, medeltida, lugn', season: 'Maj–september', best_for: 'Historia, cykling, kulturlandskap' },
    activities: [
      { icon: '🚲', name: 'Cykling', desc: 'Cykla runt Adelsö ringväg och besök världsarvet Hovgården med utsikt mot Birka. Hyrcyklar på ön via Adelsö Rent-A-Bike. Nås med bilfärja från Sjöängen, Munsö.' },
      { icon: '👑', name: 'Hovgårdens kungsgård', desc: 'Gamla kungsgården med utsikt mot Birka och Mälaren.' },
      { icon: '⛪', name: 'Adelsö kyrka', desc: 'Romansk medeltidskyrka från slutet av 1100-talet, byggd som sockenkyrka och husfromskyrka för kungsgården Alsnö hus.' },
    ],
    accommodation: [],
    // KÄLLA: Trafikverket, Adelsöleden Munsö–Adelsö ca 1 000 m, 6 min, avgiftsfri; https://www.birkavikingastaden.se/: Strömma stannar vid Hovgården (Adelsö) (läst 2026-09-14). Stod "30 min från Björkö".
    getting_there: [
      { method: 'Bil + bilfärja', from: 'Ekerö via Munsö', time: '6 min överfart', desc: 'Trafikverkets vägfärja Adelsöleden Munsö–Adelsö, ca 1 000 m, avgiftsfri.', icon: '🚗' },
      { method: 'Turbåt (Strömma)', from: 'Klara Mälarstrand, Stockholm', desc: 'Strömmas Birkabåt angör Hovgården på Adelsö under säsong.', icon: '⛴' },
    ],
    harbors: [{ name: 'Adelsö gästbrygga', desc: 'Enkel brygga med plats för ett dussin båtar.' }],
    restaurants: [],
    tips: ['Kombinera med Björkö/Birka på samma dag.', 'Hyr cykel för att utforska hela ön.'],
    related: ['bjorko', 'vindo', 'fjaderholmarna'],
    tags: ['kungsgård', 'historia', 'Mälaren', 'medeltid', 'cykling'],
    did_you_know: 'Adelsö hyser Hovgården — en kungsgård från vendel- och vikingatiden — och tillsammans med Birka på grannön Björkö är platsen sedan 1993 upptagen på UNESCO:s världsarvslista.',
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Maj–Juni',
      bestReason: 'Kombinera med Björkö/Birka — bäst i maj och juni innan trängseln. Kulturlandskapet med utsikt mot Birka är vackrast när löven slår ut.',
      months: ['off','off','off','off','open','open','peak','peak','open','limited','off','off'],
    },
  },
  {
    slug: 'ingaro',
    name: 'Ingarö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌲',
    tagline: 'Stor bro-ö med stränder, skog och seglarhamnar',
    description: [
      'Ingarö är en större och väl bebyggd ö öst om Stockholm som erbjuder lugn och möjligheter för natur nära Stockholm. Ön är bilfärjebetjänad och erbjuder goda förbindelser.',
      'Ingarö kombinerar bosättningar med naturområden och väl utvecklad infrastruktur. Det finns restauranger, kaféer och butiker. Vandringsstigar och badplatser erbjuder naturupplevelse.',
      'Ingarö passar perfekt för stockholmsbor som söker skärgårdsupplevelse utan båt, eller som bas för längre cykelresor.'
    ],

    facts: { travel_time: '45 min från Stockholm', character: 'Bro-ö, skog, tillgänglig', season: 'Hela året', best_for: 'Segling, bad, friluftsliv' },
    activities: [
      { icon: '⛵', name: 'Segling', desc: 'Många naturhamnar längs syd- och östkusten.' },
      { icon: '🚲', name: 'Cykling', desc: 'Nås med buss och bil utan båt. Värmdöleden (25 km, lätt) passerar över Ingarö. Bra cykelleder längs ön, nära Stockholm — perfekt för en cykeldag utan färja.' },
      { icon: '🏊', name: 'Bad', desc: 'Flertalet badplatser med klara vatten och klippor.' },
    ],
    accommodation: [{ name: 'Ingarö Camping', type: 'Camping', desc: 'Välskött campingplats vid vattnet.' }],
    getting_there: [{ method: 'Bil/bro', time: '45 min', desc: 'Via Gustavsbergsleden, bro till Ingarö.', icon: '🚗' }],
    harbors: [{ name: 'Brunns hamn', desc: 'Populär gästhamn med full service.', fuel: true, service: ['El', 'Vatten', 'Duschar'] }],
    restaurants: [{ name: 'Ingarö Krog', type: 'Restaurang', desc: 'Skärgårdskrog med lokalt fångad fisk.' }],
    tips: [
      'Populärt utflyktsmål för stockholmare — undvik högsommarhelger i juli om du vill ha lugn och ro.',
      'Buss 428 från Slussen (via Gustavsberg) når Ingarö — bra alternativ utan bil och ganska snabbt.',
      // Tidigare tips om "Velamsunds naturreservat på Ingarö" borttaget: Velamsund ligger i Nacka kommun (östra Boo), inte på Ingarö. KÄLLA: Länsstyrelsen Stockholm + Nacka kommun, naturreservat Velamsund (läst 2026-09-14).
    ],
    related: ['vindo', 'gallno', 'moja'],
    tags: ['tillgänglig', 'skog', 'segling', 'bad', 'mellersta'],
    did_you_know: 'Ingarö är känt för att ha ett av Stockholms läns varmaste badvatten om sommaren — skyddade vikar värms snabbt upp av solen.',
    seasonal: {
      open: 'Hela året',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Stor ö med bil- och busstillgång. Fin natur och stränder hela säsongen — utan juliträngseln.',
      months: ['limited','limited','off','limited','open','open','peak','peak','open','open','limited','off'],
    },

  },
  {
    slug: 'svenska-hogarna',
    name: 'Svenska Högarna',
    region: 'norra',
    regionLabel: 'Norra ytterskärgården',
    emoji: '🪨',
    // KÄLLA: Länsstyrelsen Stockholm, naturreservat Svenska Högarna (https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/svenska-hogarna.html) — reservat sedan 1976, utökat med stort havsområde 2020, Sveriges största marina naturreservat (läst 2026-09-14)
    tagline: 'Norra ytterskärgårdens ostligaste utpost — fyrplats och naturreservat',
    description: [
      'Svenska Högarna är en ögrupp i Norrtälje kommun, längst österut i Stockholms ytterskärgård, ca 19 nautiska mil öster om Möja.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/svenska-hogarna.html — "cirka 35 kilometer (cirka 19 nautiska mil) öster om Möja" / "sedan gammalt en fyrplats. På Storön finns flera stigar runt Ytterhamnen, Innerhamnen, fyren och öns anläggningar" (läst 2026-09-19). Heidenstam, 1855, 1874, 1966, 1968 står inte på sidan; strukna.
      'Svenska Högarna är sedan gammalt en fyrplats. På Storön finns stigar runt Ytterhamnen, Innerhamnen, fyren och öns anläggningar.',
      // KÄLLA: Riksantikvarieämbetet, Bebyggelseregistret via https://www.kringla.nu/kringla/objekt?referens=raa/bbra/21320000029574 — "På Svenska Högarna (Storön) i den yttersta delen av Stockholms norra skärgård uppsattes på 1700-talet tre stenkummel. År 1855 byggdes där en cirka 12 meter hög träbåk, ritad av Carl Sandell. Planerna på en fyr på Svenska Högarna aktualiserades på 1860-talet men resulterade istället i att ett fyrfartyg, Svenska Björn, lades ut i farvattnen år 1868. Men mot bakgrund av att sjöfarten genom Ålands hav hela tiden ökade föreslog Lotsstyrelsen att en fyr ändå måste uppföras" (läst 2026-09-19)
      'Fyrplatsens historia är dokumenterad av Riksantikvarieämbetet: på 1700-talet restes tre stenkummel på Storön, 1855 byggdes en cirka tolv meter hög träbåk ritad av Carl Sandell, och när planerna på en riktig fyr väcktes på 1860-talet blev det först ett fyrfartyg, Svenska Björn, som lades ut 1868. Sjöfarten genom Ålands hav fortsatte att öka, och Lotsstyrelsen drev igenom att en fyr ändå måste byggas.',
      'Området är naturreservat sedan 1976. Ön besöks av seglare som söker den yttre skärgårdens orörda klipplandskap.',
    ],
    facts: {
      travel_time: '5–7 h med segelbåt från Möja/Sandhamn',
      character: 'Extrem ytterskärgård, fyrplats, naturreservat',
      season: 'Juni–augusti',
      best_for: 'Erfarna seglare, fågelskådare, fyr-entusiaster',
    },
    activities: [
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/svenska-hogarna.html — "På Storön finns flera stigar runt Ytterhamnen, Innerhamnen, fyren och öns anläggningar" (läst 2026-09-19). "Enda Heidenstam-fyr" och 1874 saknar källa; strukna.
      { icon: '🗼', name: 'Fyrplatsen', desc: 'Stigar runt Ytterhamnen, Innerhamnen, fyren och öns anläggningar på Storön.' },
      { icon: '🌅', name: 'Öppet hav', desc: 'En av skärgårdens absolut mest exponerade utsiktsplatser — ingenting öster om dig förrän Åland.' },
      { icon: '🐦', name: 'Fågelliv', desc: 'Naturreservat med rikt häckande sjöfågel — silltrut, ejder, tordmule.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Möja/Sandhamn', time: '5–7 h', desc: 'Inga reguljära förbindelser. Kräver erfaren besättning och stabil väderprognos.', icon: '⛵' }],
    harbors: [{ name: 'Svenska Högarnas naturhamn', desc: 'Liten skyddad vik på Storön. Endast i gott väder.' }],
    restaurants: [],
    tips: ['Kontrollera SMHI noggrant — vid sydväst eller ostlig kuling är hamnen svår att lämna.', 'Fulltanka i Sandhamn eller Möja innan avfärd.', 'Naturreservatets regler gäller — respektera fågelhäckningen; perioderna varierar, vanligen någon gång mellan 1 februari och 31 augusti enligt skyltar och föreskrifter.'],
    related: ['sandhamn', 'rodloga', 'huvudskar'],
    tags: ['ytterskärgård', 'fyr', 'naturreservat', 'segling'],
    // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/svenska-hogarna.html — "Bland sevärdheterna kan nämnas en trojaborg, stenlabyrint och en kyrkogård. Besökare ombeds att visa hänsyn till de boende vid fyrbyn" (läst 2026-09-19)
    did_you_know: 'Bland sevärdheterna på Storön finns en trojaborg, en stenlabyrint och en kyrkogård. Länsstyrelsen ber besökare visa hänsyn till de boende vid fyrbyn.',
    seasonal: {
      open: 'Juni–Augusti',
      peak: 'Juli',
      best: 'Mitten av juni',
      bestReason: 'Gotland Runt-perioden: seglartäthet och festivalstämning ute i ytterskärgården.',
      warning: 'Inga reguljära förbindelser. Kräver erfaren besättning och god väderprognos. Fågelskydd begränsar landstigning april–mitten av juni.',
      months: ['off','off','off','off','off','limited','peak','open','limited','off','off','off'],
    },

  },
  {
    slug: 'huvudskar',
    name: 'Huvudskär',
    region: 'södra',
    regionLabel: 'Södra ytterskärgården',
    emoji: '🏮',
    tagline: 'Gammal lotsplats i ytterskärgården mellan Sandhamn och Landsort',
    description: [
      'Huvudskär ligger i yttersta havsbandet, ungefär mitt emellan Sandhamn och Landsort och utgör skärgårdens sydostliga utpost från Ornö-området. Ön består av tre större skär, Ålandsskär, Lökskär och Manskär, plus grupper av mindre skär som tillsammans skyddar den naturliga hamnen på Ålandsskärs insida.',
      'En signalstång och lotsvaktstuga uppfördes 1861 och en brygga 1865. Fram till 1881 var Huvudskär uppassningsställe under Dalarö lotsplats; därefter blev ön egen lotsplats med tre lotsar i fast tjänst, engelska ångare och segelfartyg som sökte sig upp i Östersjön gjorde stationen nödvändig. Lotsplatsen lades ned 1939 och fram till 1925 fanns även tullbevakning på ön.',
      'Idag är Huvudskär obebodd och en av södra skärgårdens mest älskade naturhamnar för seglare. Skärgårdsstiftelsen förvaltar området.',
    ],
    facts: {
      travel_time: '4–5 h med segelbåt från Sandhamn / Dalarö',
      character: 'Yttersta havsbandet, gammal lotsplats, naturhamn',
      season: 'Juni–augusti',
      best_for: 'Erfarna seglare, naturhamn, fågelliv',
    },
    activities: [
      { icon: '🏮', name: 'Lotshistoria', desc: 'Bevarade lotsbyggnader från 1860-talet — guidning sommartid via Skärgårdsstiftelsen.' },
      { icon: '⛵', name: 'Ankring', desc: 'Skyddad naturhamn på Ålandsskärs insida — en klassiker bland erfarna seglare.' },
      { icon: '🐦', name: 'Fågelskådning', desc: 'Rikt sjöfågelliv i ytterskärgården.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Sandhamn / Dalarö', time: '4–5 h', desc: 'Inga reguljära förbindelser. Kräver erfaren besättning och stabil väderprognos.', icon: '⛵' }],
    harbors: [{ name: 'Huvudskärs naturhamn', desc: 'Välskyddad naturhamn mellan Ålandsskär och övriga skär.' }],
    restaurants: [],
    tips: ['Vid sydväst är det svårt att lämna hamnen — kontrollera SMHI noga innan avfärd.', 'Ta med all proviant — ingen service finns.', 'Lotshusen sköts av Skärgårdsstiftelsen — respektera anvisningar.'],
    related: ['sandhamn', 'landsort', 'svenska-hogarna'],
    tags: ['ytterskärgård', 'lotsplats', 'naturhamn', 'segling', 'södra'],
    did_you_know: 'Huvudskär var självständig lotsplats med tre fast anställda lotsar från 1881 till 1939 — anlagd för att möta de engelska ångare och segelfartyg som ökade trafiken till Stockholm under sent 1800-tal.',
  },
  {
    slug: 'ekno',
    name: 'Eknö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌿',
    tagline: 'Liten bilfri ö i mellersta skärgården med historisk bebyggelse',
    description: [
      'Eknö är en liten bilfri ö i Stockholms mellersta skärgård, i Värmdö kommun. Bebyggelsen är främst sommarstugor och permanentboende på små gårdar, service är begränsad och det går inga reguljära turistförbindelser.',
      'Ön har lång bosättningshistoria. Redan på 1500-talet fanns det familjer som levde här på fiske, jakt och småbruk. Sommaren 1719 brände den ryska galärflottan ner samtliga sex gårdar på Eknö under "Rysshärjningarna", ett öde som drabbade flera öar i området.',
      'Eknö passar för seglare som vill ankra i en lugn naturhamn under en längre tur, eller för dem som har eget boende på ön.',
    ],
    facts: { travel_time: 'Cirka 2 h med egen båt från Stavsnäs', character: 'Liten, bilfri, sommarstugor', season: 'Maj–september', best_for: 'Naturvistelse, segling, sommarboende' },
    activities: [
      { icon: '🚶', name: 'Naturpromenader', desc: 'Stigar i blandskog längs kusten.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Mindre klippbadsplatser längs öns kust.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Stavsnäs', desc: 'Inga reguljära turlinjer.', icon: '⛵' }],
    harbors: [{ name: 'Eknö brygga', desc: 'Liten brygga med begränsat antal platser.' }],
    restaurants: [],
    tips: ['Ta med all proviant — ingen butik finns.', 'Respektera privata sommartomter.'],
    related: ['namdo', 'gallno', 'moja'],
    tags: ['liten ö', 'bilfri', 'sommarstugor', 'mellersta'],
    did_you_know: 'Sommaren 1719 brände den ryska galärflottan ner alla sex gårdarna på Eknö under det som kallas Rysshärjningarna — en serie övergrepp i Stockholms skärgård under stora nordiska kriget.',
  },
  {
    slug: 'hasselo',
    name: 'Hasselö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌻',
    tagline: 'Liten ö i mellersta skärgården nordväst om Sandhamn',
    description: [
      // UPPMÄTT: OSM-brygga Hasselö 59,317N 18,845E — 2,8 NM nordväst om Sandhamn; ferry_terminal enligt OSM (2026-08-23)
      'Hasselö är en cirka 1,5 km lång ö i Stockholms mellersta skärgård, belägen runt tre sjömil nordväst om Sandhamn med Kanholmsfjärden norr om sig och Eknösundet i söder. Läget gör den till ett naturligt mellansteg för seglare som rör sig mellan Sandhamn och de norra öarna.',
      'Ön har egen brygga och trafikeras av Waxholmsbolaget — en sällsynthet bland de mindre öarna i mellersta skärgården. Service är begränsad och vardagslivet här är stilla, men det är just det som gör Hasselö attraktiv för den som söker ett lugnt alternativ till Sandhamns sommarvimmel.',
      'Naturmarken dominerar öns inre med barrskog och öppna klipphällar. Ankringsplatsen på nordvästsidan ger bra skydd vid de vanligaste vindriktningarna och klipporna längs östsidan är rena och inbjudande för bad.',
      'Hasselö är ön du väljer när du vill komma bort från det du åkte till Sandhamn för att undvika. Tyst, enkel och genuint skärgård.',
    ],
    facts: { travel_time: '3–4 h med segelbåt från Dalarö', character: 'Liten, stillsam, naturhamn', season: 'Juni–augusti', best_for: 'Segling, ankring, naturvistelse' },
    activities: [
      { icon: '🏊', name: 'Klippbad', desc: 'Rena vatten längs öns klippkust.' },
      { icon: '⛵', name: 'Ankring', desc: 'Skyddad naturhamn på nordvästsidan.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Dalarö / Utö', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Hasselö naturhamn', desc: 'Liten skyddad ankringsplats på nordvästsidan.' }],
    restaurants: [],
    tips: ['Ta med all proviant — ingen service finns.', 'Vid sydliga vindar är hamnen mindre skyddad.'],
    related: ['fjardlang', 'toro', 'asko'],
    tags: ['liten ö', 'naturhamn', 'södra', 'segling'],
    did_you_know: 'Stockholms södra skärgård innehåller mer än 7 000 öar, kobbar och skär — varav många mindre öar som Hasselö huvudsakligen besöks av seglare som söker ostörda naturhamnar mellan Dalarö, Utö och Landsort.',
  },
  {
    slug: 'ormsko',
    name: 'Ormskär',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '⛵',
    // KÄLLA: Naturvårdsverket, skötselplan Nämdöskärgårdens nationalpark (ISBN 978-91-620-7202-5): "Grunda hårdbottnar och rev finns bland annat kring Långviksskär och Koskären-Ormskär" — Ormskär ligger inom parken (läst 2026-09-14). Uppgiften "norra delen av ön" gick inte att belägga och är borttagen.
    tagline: 'Klippig ö söder om Nämdö — i Nämdöskärgårdens nationalpark',
    description: [
      'Ormskär ligger i Stockholms mellersta skärgård och ingår tillsammans med Koskären i Nämdöskärgårdens nationalpark, invigd 2025.',
      'Klippig kust och stilla vatten i lä-läge präglar miljön. Ön är obebodd och saknar service. Inga reguljära turistförbindelser går hit.',
      'Ormskär passar för seglare som söker en lugn ankringsplats i Bullerö-området. Nationalparkens föreskrifter gäller.',
    ],
    facts: { travel_time: 'Cirka 3–4 h med segelbåt från Stavsnäs', character: 'Klippig ö, naturreservat, ankring', season: 'Juni–augusti', best_for: 'Segling, ankring, naturvistelse' },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'Naturhamn med skydd i lämpliga vindar.' },
      { icon: '🚶', name: 'Klippvandring', desc: 'Korta promenader längs öns klippkust — nationalparkens föreskrifter gäller.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Stavsnäs / Möja', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Ormskärs naturhamn', desc: 'Skyddad ankringsplats.' }],
    restaurants: [],
    // KÄLLA: se skötselplanen ovan (Koskären-Ormskär inom nationalparken)
    tips: ['Ön ligger i Nämdöskärgårdens nationalpark — respektera nationalparkens föreskrifter.', 'Ta med all proviant.'],
    related: ['bullero', 'namdo', 'moja'],
    tags: ['nationalpark', 'naturhamn', 'mellersta', 'segling'],
    did_you_know: 'Ormskär ingår tillsammans med Koskären i Nämdöskärgårdens nationalpark, invigd 2025.',
  },
  {
    slug: 'kanholmen',
    name: 'Kanholmen',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '⚓',
    tagline: 'Mindre ö vid Kanholmsfjärden — naturhamn på vägen mot Sandhamn',
    description: [
      'Kanholmen ligger vid Kanholmsfjärden i Stockholms mellersta skärgård, mellan Värmdö-områdets inre skärgård och de yttre öarna mot Sandhamn. Ön är obebodd permanent och saknar service.',
      'Klippor och en skyddad naturhamn på lä-sidan gör Kanholmen till ett klassiskt mellanstopp för seglare på väg mot Sandhamn eller Stavsnäs-leden.',
      'Kanholmen passar som naturhamn för en kortare övernattning under en längre seglingstur.',
    ],
    facts: { travel_time: '2–3 h med segelbåt från Stavsnäs', character: 'Liten naturhamn, ankring', season: 'Juni–augusti', best_for: 'Segling, ankring, naturvistelse' },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'Skyddad naturhamn för seglare på väg mot Sandhamn.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Klart vatten runt öns klippkust.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Stavsnäs / Sandhamn', desc: 'Enbart nåbar med båt — inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Kanholmens naturhamn', desc: 'Välskyddad ankringsplats på lä-sidan.' }],
    restaurants: [],
    tips: ['Kom tidigt — populär hamn fylls fort midsommar–juli.', 'Allemansrätten gäller — ta med soporna hem.'],
    related: ['sandhamn', 'gallno', 'ingmarso'],
    tags: ['naturhamn', 'ankring', 'mellersta', 'segling'],
    did_you_know: 'Kanholmsfjärden, där Kanholmen ligger, är en av Stockholms skärgårds mest trafikerade vatten under sommaren — den fungerar som huvudled för seglare och motorbåtar mellan Värmdö och Sandhamn.',
  },
  {
    slug: 'norrpada',
    name: 'Norrpada',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🦩',
    tagline: 'Liten skärgårdsö med fågelliv och naturhamn',
    description: [
      'Norrpada är en mindre skärgårdsö i Stockholms mellersta skärgård, i området kring Möja. Ön är obebodd permanent och fungerar primärt som naturhamn för seglare och kajakpaddlare som söker ett ögonblick av stillhet.',
      'Klippig kust, stilla vikar och rikt sjöfågelliv präglar miljön. Fisktärna, silltrut och ejder häckar i området och gör Norrpada till ett tyst men levande naturrum. Inga reguljära förbindelser, ingen service — det är tanken.',
      'För kajakpaddlare är Norrpada ett naturligt mål längs den led som löper mellan Stavsnäs och Möja. Lä-sidan av ön ger skyddat vatten och ankringsplatsen på nordvästsidan rymmer ett tiotal båtar.',
      'Norrpada är inte för den som vill ha bekvämligheter. Det är för den som vill ha tystnad, klipphällar och en morgon utan mobilnät. De som hittar dit sällan glömmer det.',
    ],
    facts: { travel_time: '2–3 h med segelbåt eller kajak från Stavsnäs', character: 'Liten naturö, fågelliv, ankring', season: 'Juni–augusti', best_for: 'Fågelskådning, kajak, segling' },
    activities: [
      { icon: '🦩', name: 'Fågelliv', desc: 'Sjöfåglar som silltrut, fisktärna och ejder häckar i området.' },
      { icon: '🛶', name: 'Kajak', desc: 'Stilla vatten längs öns lä-sida.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt/kajak', from: 'Stavsnäs / Möja', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Norrpada naturhamn', desc: 'Liten skyddad ankringsplats.' }],
    restaurants: [],
    tips: ['Respektera fågelhäckningen; perioderna varierar, vanligen någon gång mellan 1 februari och 31 augusti enligt skyltar och föreskrifter.', 'Ta med all proviant.'],
    related: ['gallno', 'bullero'],
    tags: ['fågelliv', 'kajak', 'naturhamn', 'mellersta'],
    did_you_know: 'Stockholms skärgård har över 25 000 öar, kobbar och skär — varav många mindre fågelrika öar som Norrpada. Många är skyddade som naturreservat med tillträdesförbud under fågelhäckningen — perioderna varierar mellan områden, vanligen någon gång mellan 1 februari och 31 augusti.',
  },
  {
    slug: 'graskar',
    name: 'Gräskö',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌿',
    tagline: 'Bebodd skärgårdsö i Norrtälje med anor från 1400-talet',
    description: [
      'Gräskö är en bebodd ö i norra Stockholms skärgård (Roslagens skärgård) i Norrtälje kommun. Cirka 28 personer bor permanent på ön; resten är sommarstugor.',
      'Ön omtalas första gången i skriftliga handlingar 1405. Huvudbyn på ön kallas Gräsken och inkluderar några mindre öar runt omkring som Rågören, Lilla Gåsö, Gåsö och Mäskören.',
      'Gräskö passar både som dagsbesök och övernattning för seglare som söker en levande skärgårdsö med historisk prägel.',
    ],
    facts: { travel_time: 'Egen båt — ingen reguljär båttrafik belagd', character: 'Bebodd ö, sommarstugor, historiska anor', season: 'Året runt med begränsad trafik vintertid', best_for: 'Skärgårdsboende, segling, ankring' },
    activities: [
      { icon: '🚶', name: 'Naturpromenader', desc: 'Stigar längs öns kustlinje.' },
      { icon: '⛵', name: 'Ankring', desc: 'Skyddade vikar runt ön.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Färja', from: 'Räfsnäs / Furusund', desc: 'Färjetrafik året runt; vintertid beställningstrafik via M/S Riddarfjärden på Rödlöga-traden via Gräskö.', icon: '⛴' }],
    harbors: [{ name: 'Gräskös brygga', desc: 'Den bebodda öns anlöpsbrygga.' }],
    restaurants: [],
    tips: ['Respektera privata tomter — många sommarstugor och permanentbo.', 'Kombinera med en tur till närliggande Rödlöga.'],
    related: ['rodloga', 'fejan', 'arholma'],
    tags: ['bebodd', 'historisk', 'norra', 'roslagen'],
    did_you_know: 'Gräskö omtalas första gången i skriftliga handlingar 1405 — en av de äldsta dokumenterade skärgårdsöarna i Norrtälje.',
  },
  {
    slug: 'langviksskaret',
    name: 'Långviksskäret',
    // KÄLLA (2026-09-13): Länsstyrelsen Stockholm, lansstyrelsen.se/stockholm/besoksmal/naturreservat/langviksskar.html —
    // Värmdö kommun, ytterskärgård, naturreservat sedan 1983, ca 300 öar, 3 897 ha varav 302 ha land; tre större öar
    // med sammanhängande vegetation: Långviksskär, Söderö, Hummelskär. Sverigesnationalparker.se: "Ett mindre område på
    // Långviksskär är kvar som naturreservat, omgivet av nationalparken" (Nämdöskärgården, 2025). Stod 'södra' med
    // Landsort/Nåttarö som grannar — det är Nämdö/Bullerö-området, inte Landsortsområdet. Inte samma plats som Långskär.
    region: 'mellersta',
    regionLabel: 'Mellersta ytterskärgården',
    emoji: '🌅',
    tagline: 'Övernattningsö med solnedgångsvyer mot Östersjön',
    description: [
      'Långviksskäret i Nämdöskärgårdens yttre havsband är ett populärt övernattningsalternativ för seglare. Utsikten mot öppet hav och solnedgångarna är svåra att slå.',
      'Långviksskäret kombinerar naturvärdena på ett exponerat läge med möjligheter för enkel ankring. Badplatser och möjligheter för naturupplevelse erbjuds.',
      'Långviksskäret passar för erfarna seglare som letar efter dramatisk natur och spektakulära solnedgångar på väg söderut.'
    ],

    facts: { travel_time: 'Egen båt eller båttaxi — inga reguljära turer', character: 'Naturhamn, utsikt, södra', season: 'Juni–september', best_for: 'Segling, övernattning, solnedgång' },
    activities: [
      { icon: '🌅', name: 'Solnedgångsvyer', desc: 'Dramatisk horisont mot öppet hav.' },
      { icon: '⛵', name: 'Ankring', desc: 'Naturlig ankringsplats med bra skydd.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Långviksskärets naturhamn', desc: 'Skyddad vik.' }],
    restaurants: [],
    tips: ['Naturreservat sedan 1983 — respektera föreskrifterna och fågelkolonierna.'],
    related: ['bullero', 'namdo', 'langskar'],
    tags: ['solnedgång', 'segling', 'södra', 'naturhamn'],
    did_you_know: 'Stockholms södra ytterskärgård kännetecknas av små klippiga skär — många, som Långviksskäret, fungerar som naturhamnar för seglare och kajakpaddlare som söker en lugn övernattning utanför de större öarna.',
  },
  {
    slug: 'storholmen',
    name: 'Storholmen',
    region: 'mellersta',
    regionLabel: 'Innerskärgården',
    emoji: '🌳',
    // KÄLLA: Lidingö stad (lidingo.se/stad-politik/om-lidingo/lidingo-skargard/) — "bebyggda, har restaurang och stigar att promenera på"; SL linje 80 (se getting_there). Stod "vandringsleder och havsbad": Lidingö stad nämner inga, och Storholmen finns inte bland stadens badplatser hos Havs- och vattenmyndigheten.
    tagline: 'Bebodd ö i Lidingös skärgård med sjökrog och promenadstigar — ca 25–30 min med SL:s pendelbåt 80 från Ropsten',
    description: [
      // KÄLLA: Lidingö stad, Lidingö skärgård (https://lidingo.se/stad-politik/om-lidingo/lidingo-skargard/), läst i webbläsare 2026-09-21 — "Med skärgårdsbåt tar du dig lätt till Storholmen eller Fjäderholmarna … Bägge två är bebyggda, har restaurang och stigar att promenera på"; "dagsverkstorp under Frösviks säteri från 1780-talet"; Villa Kassman ("Slottet") 1917; "cirka 250 fastigheter för sommarboende" 1925–1935; "i dag finns cirka 80 permanenta hushåll"; "överflyttades från Vaxholm kommun till Lidingö stad 2011"
      'Storholmen är en bebyggd ö i Lidingös skärgård med restaurang och stigar att promenera på, som nås med SL:s pendelbåt från Ropsten. Ön ligger i innerskärgården, nära nog för en dagstur utan lång restid.',
      'Historien enligt Lidingö stad: ett dagsverkstorp under Frösviks säteri från 1780-talet, sommarvillor från 1800-talets slut, och bankir Kassmans "Slottet" från 1917. Efter Kassmans konkurs styckades ön i cirka 250 sommartomter under 1925–1935. I dag bor omkring 80 hushåll här året runt.',
      'Storholmen tillhörde Vaxholms kommun fram till 2011, då ön överfördes till Lidingö stad.',
    ],
    facts: { travel_time: 'ca 25–30 min med SL:s pendelbåt 80 från Ropsten', character: 'Bebodd ö, restaurang och promenadstigar, nära stan', season: 'Maj–september', best_for: 'Dagsutflykt, restaurangbesök, promenad' },
    facts_provenance: { travel_time: 'matt', character: 'matt', season: 'bedomning', best_for: 'bedomning' },
    activities: [
      // KÄLLA: Lidingö stad (samma sida) — "stigar att promenera på" och restaurang; längd på rundan, badplatser och fågelliv har vi ingen källa för och skriver därför inte
      { icon: '🚶', name: 'Promenad', desc: 'Stigar att promenera på över ön, enligt Lidingö stad.' },
      { icon: '🍽', name: 'Restaurang', desc: 'Storholmen Sjökrog vid vattnet — se restaurangens egen sida för säsong och bokning.' },
    ],
    accommodation: [],
      // KÄLLA: SL pendelbåt linje 80 (https://kund.printhuset-sthlm.se/sl/h80.pdf, gäller 17 aug–12 dec 2026): Ropsten–Storholmen södra ca 28 min; Lidingö stad (https://lidingo.se/bygga-bo/bygglov/kulturmiljoprogram/ (Stora Fjäderholmen, pdf), Båtpendla) — "Båten åker inte till Storholmen östra, Frösvik och Storholmen norra under vintertid om det ligger is" (läst 2026-09-14). Stod "Waxholmsbolaget från Strömkajen/Nybrokajen sommartid, 40 min" — fel avgångsplats och säsong. "Året runt" är inte belagt och borttaget.
    getting_there: [
      { method: 'SL pendelbåt linje 80', from: 'Ropsten', time: 'ca 25–30 min', desc: 'Pendelbåt 80 (Nybroplan–Ropsten) fortsätter Ropsten–Storholmen med bryggorna Storholmen södra, östra och norra. Vintertid, när det ligger is, trafikeras inte Storholmen östra, Frösvik och Storholmen norra. Ingår i SL-biljetten.', icon: '⛴' },
      { method: 'Fritidsbåt', from: 'Lidingö eller valfri brygga', desc: 'Nås med egen båt. Om det finns gästplatser vid bryggorna har vi inte kunnat belägga — fråga på plats.', icon: '⚓' },
    ],
    harbors: [],
    restaurants: [
      // KÄLLA: https://storholmensjokrog.se/ (läst 2026-09-26) — "SEDAN 2018", "Vår terrass sträcker sig ut mot vattnet", "rätter med säsongens bästa råvaror", meny med bl.a. "Stekt strömming", "Fish and Chips", "Moules Frites", "För barnen", "skräddarsydd catering", "Hyr hela restaurangen"
      { name: 'Storholmen Sjökrog', type: 'Restaurang', desc: 'Sjökrog på Storholmen sedan 2018, med terrass ut mot vattnet och meny efter säsong – till exempel stekt strömming, fish and chips och moules frites – och barnmeny. Tar också catering och går att hyra för fester.', websiteUrl: 'https://www.storholmensjokrog.se/' },
    ],
    // KÄLLA: tips 1 = SL linje 80 och Lidingö stad (se getting_there); tips 2 = storholmensjokrog.se ("Boka bord"). Borttaget 2026-09-26: "Kortare restid än Vaxholm … lugnare alternativ" (obelagd jämförelse).
    tips: [
      'Båten hit är SL:s pendelbåt 80 från Ropsten, inte Waxholmsbolaget — den ingår i SL-biljetten. Kontrollera tidtabellen på sl.se; vintertid trafikeras inte alla bryggor.',
      'Boka bord på Storholmen Sjökrog i förväg — se restaurangens egen sida för säsong.',
    ],
    related: ['vaxholm', 'fjaderholmarna', 'moja'],
    tags: ['bebodd', 'lidingö', 'innerskärgård', 'dagstur', 'restaurang', 'vandring'],
    // KÄLLA: havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-lidingo-stad.html (läst 2026-09-26) — Lidingö stads registrerade badplatser: "Fågelöudde", "Kottlasjön, badviken", "Käppalabadet", "Sticklinge udde, Sandviksbadet", "Södergarn"; ingen på Storholmen. lidingo.se bad-och-simhallar — "mest känt är badet vid Fågelöudde", bottenbesiktning två gånger per sommar.
    activity_meta: {
      bad: {
        beaches: [],
        note: 'Lidingö stad har ingen kommunal badplats på Storholmen. Stadens badplatser, som provtas och bottenbesiktas under sommaren, ligger på Lidingö: Fågelöudde, Käppalabadet, Sticklinge udde (Sandviksbadet), Södergarn och Kottlasjön. Vattenkvaliteten redovisas på Havs- och vattenmyndighetens sida Badplatsen.',
      },
    },
    // KÄLLA: Lidingö stad (samma sida) — "Storholmen överflyttades från Vaxholm kommun till Lidingö stad 2011"; att det skulle vara en av få ändringar under 2000-talet har vi ingen källa för
    did_you_know: 'Storholmen tillhörde Vaxholms kommun fram till 2011, då ön överfördes till Lidingö stad. I mitten av 1980-talet bodde tolv hushåll här året runt — i dag omkring 80.',
  },
  {
    slug: 'langskar',
    name: 'Långskär',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌅',
    tagline: 'Naturreservat med ett 50-tal öar i Bulleröskärgården',
    description: [
      // KÄLLA (verifierat 2026-09-13): Länsstyrelsen Stockholm, lansstyrelsen.se/stockholm/besoksmal/naturreservat/langskar.html —
      // "ett femtiotal öar", 854 ha varav 33 ha land, skyddat sedan 1967, Värmdö kommun, Bulleröskärgården,
      // fågelskyddsområde med tillträdesförbud 1 februari–15 augusti. Långskär och Långviksskär är TVÅ OLIKA reservat:
      // Länsstyrelsen har separata sidor (Långviksskär: 1983, ~300 öar, 3 897 ha). Naturvårdsverkets skötselplan
      // (978-91-620-7202-5, s. 12) säger att Långviksskärs reservat kvarstår omgivet av nationalparken; om Långskärs
      // reservat formellt uppgått i parken framgår inte av Länsstyrelsens sida — därför "kontrollera" nedan.
      'Långskär är ett naturreservat sedan 1967 med ett femtiotal öar i Bulleröskärgården, Värmdö kommun — 854 hektar, varav bara 33 hektar land. Sedan 2025 omges området av Nämdöskärgårdens nationalpark; kontrollera aktuella föreskrifter innan besök.',
      'Området nås lättast med egen båt. Klippig kust och stilla vatten i lä-läge präglar miljön.',
      'Långskär passar för seglare och naturvänner som söker ett ostört område utanför de stora destinationerna i Bullerö-arkipelagen.',
    ],
    facts: { travel_time: 'Cirka 3 h med segelbåt från Stavsnäs', character: 'Naturreservat, ankring, ytterskärgård', season: 'Juni–augusti', best_for: 'Segling, ankring, naturvistelse' },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'Skyddade ankringsmöjligheter i flera vikar.' },
      { icon: '🌅', name: 'Vyer', desc: 'Öppen horisont mot havet.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Stavsnäs / Möja', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Långskärs naturhamn', desc: 'Skyddad ankringsplats i lä-läge.' }],
    restaurants: [],
      // KÄLLA: Länsstyrelsen (samma sida) — förbjudet att "Under tiden 1 februari–15 augusti beträda utpekat fågelskyddsområde"
    tips: ['Utpekat fågelskyddsområde får inte beträdas 1 februari–15 augusti — se Länsstyrelsens karta.', 'Ta med all proviant och färskvatten.'],
    related: ['bullero', 'norrpada', 'moja'],
    tags: ['naturreservat', 'bulleröskärgården', 'mellersta', 'segling'],
    did_you_know: 'Långskärs naturreservat omfattar ett femtiotal öar och 854 hektar — men bara 33 hektar av dem är land. Resten är hav.',
  },
  {
    slug: 'storskar',
    name: 'Storskär',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '⛵',
    tagline: 'Naturreservat 4 km norr om Möja',
    description: [
      'Storskär är ett naturreservat i Svartlögafjärden, cirka 4 km norr om Möja i Stockholms mellersta skärgård. Reservatet omfattar den södra delen av ön. Naturen är typisk för mellanskärgården, klippor, blandskog och små vikar.',
      'Ön är obebodd och saknar service. Ankringsmöjligheter finns för seglare som söker ett lugnt naturhamnsstopp utanför de större öarna.',
      'Storskär passar för seglare och kajakpaddlare som söker ostörd natur i mellanskärgården.',
    ],
    facts: { travel_time: 'Cirka 1 h med segelbåt från Möja', character: 'Naturreservat, klippor, blandskog', season: 'Juni–augusti', best_for: 'Segling, ankring, naturvistelse' },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'Skyddad naturhamn för seglare.' },
      { icon: '🚶', name: 'Naturpromenad', desc: 'Spår genom blandskog och längs klippkust (utanför reservatets skyddade del).' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Möja / Stavsnäs', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Storskärs naturhamn', desc: 'Skyddad ankringsplats.' }],
    restaurants: [],
    // KÄLLA: Länsstyrelsen Stockholm, naturreservat Storskär (https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/storskar.html) — södra delen av ön, 8,9 ha, skyddat sedan 1968, förvaltas av Länsstyrelsen; ön ligger i Svartlögafjärden ca 4 km norr om Möja, Österåkers kommun (läst 2026-09-14)
    tips: ['Södra delen av ön är naturreservat — respektera reservatsreglerna.', 'Ta med all proviant.'],
    related: ['moja', 'kanholmen', 'norrora'],
    tags: ['naturreservat', 'naturhamn', 'mellersta', 'segling'],
    did_you_know: 'Naturen i Storskärs naturreservat är representativ för mellanskärgården och förvaltas av Länsstyrelsen i Stockholms län.',
  },
  // ── Övriga Sverige — Höga Kusten, Gotland m.fl. ────────────────────────────

  {
    slug: 'ulvon',
    name: 'Ulvön',
    region: 'ovriga',
    regionLabel: 'Höga Kusten',
    emoji: '🐟',
    tagline: 'Höga Kustens hjärta — världsarv, surströmming och dramatiska klippor.',
    description: [
      'Ulvön är Höga Kustens mest välkända ö och en av Sveriges bäst bevarade fiskebyar. Två samhällen — Ulvöhamn i norr och Sörvik i söder — lever kvar med ett genuint kustliv i en miljö som inte förändrats nämnvärt på hundra år.',
      'Ön är oupplösligt förknippad med surströmming. Den jästa strömmingen produceras här och exporteras över hela landet. Surströmmingsfabriken i Ulvöhamn är öppen för besök sommartid — luktupplevelsen är garanterad oavsett avstånd.',
      'Höga Kusten är UNESCO-världsarv tack vare en av världens mest dramatiska landhöjningar sedan istiden. Klipporna stiger brant ur havet, skogarna är täta och utsikten från höjderna är enastående. Ulvön är navet i detta landskap.',
    ],
    facts: {
      travel_time: '4–5 h från Stockholm (tåg till Härnösand + buss + färja)',
      character: 'Genuint, vilt, historiskt, surströmming',
      season: 'Maj–September',
      best_for: 'Naturälskare, fiskentusiaster, de som söker äkta kustkultur',
    },
    activities: [
      { icon: '🐟', name: 'Surströmmingsupplevelse', desc: 'Besök surströmmingsfabriken i Ulvöhamn. Smaka om du törs — en klassisk svensk upplevelse.' },
      { icon: '🥾', name: 'Vandring', desc: 'Välmärkta leder längs kusten och upp till klippor med utsikt över Höga Kusten.' },
      { icon: '🏖', name: 'Sandstrand', desc: 'Sälesstranden på södra Ulvön är ovanligt lång för norrlandskusten — ett sällsynt fynd.' },
      { icon: '⛵', name: 'Båtliv', desc: 'Välskyddad gästhamn i Ulvöhamn. Populär etapp för seglare längs norrlandskusten.' },
    ],
    accommodation: [
      { name: 'Ulvö Hotell', type: 'Hotell', desc: 'Öns hotell i Ulvöhamn med havsutsikt och restaurang. Boka i god tid inför sommarsäsongen.' },
      { name: 'Ulvöhamns Camping', type: 'Camping', desc: 'Enkla camingmöjligheter i närheten av hamnen.' },
    ],
    getting_there: [
      { method: 'Tåg + buss + färja', from: 'Stockholm Central', time: '4–5 h', desc: 'SJ tåg till Härnösand, buss mot Docksta, sedan reguljärfärja (M/S Solleftea) till Ulvön (ca 1 h). Färjan går dagligen sommartid.', icon: '🚆' },
      { method: 'Flyg + hyrbil + färja', from: 'Stockholm Arlanda', time: '3 h', desc: 'Flyg till Härnösand/Kramfors Airport, hyrbil till Docksta eller Köpmanholmen, sedan färja till Ulvön.', icon: '✈️' },
      { method: 'Bil + färja', from: 'Stockholm', time: '5–6 h', desc: 'Kör E4 norrut till Docksta (ca 470 km), parkera och ta färjan till Ulvön.', icon: '🚗' },
    ],
    harbors: [
      // KÄLLA: https://www.hogakusten.com/sv/gasthamn-ulvo-hotell — "Gästhamn Ulvö Hotell", "färskvatten och el", "toaletter, duschar, kök och tvättstuga", "diesel, och bensin"
      { name: 'Gästhamn Ulvö Hotell', desc: 'Gästhamn i Ulvöhamn vid Ulvö Hotell. Färskvatten och el, toaletter, duschar, kök, tvättstuga och bastu. Diesel och bensin.', fuel: true, service: ['el', 'vatten', 'dusch', 'tvätt', 'bränsle'] },
    ],
    restaurants: [
      // KÄLLA: https://ulvohotell.se/sv/restaurang — "förkärlek till det lokala … twist på redan klassiska rätter", "Surströmmingens mekka", höstmeny 2026; hogakusten.com — "Ulvö Hotell Restaurang"
      { name: 'Ulvö Hotell Restaurang', type: 'Restaurang', desc: 'Restaurang på Ulvö Hotell med lokala råvaror och egen twist på klassiska rätter. Surströmming på menyn.', websiteUrl: 'https://ulvohotell.se/restaurang' },
    ],
    tips: [
      'Boka färja och boende tidigt — sommarsäsongen på Ulvön är kort och populär.',
      'Ta med myggmedel. Höga Kusten-natten är vacker men myggen är på.',
      'Surströmmingspremiären sker tredje torsdagen i augusti — om du vill delta, planera i god tid.',
      'Ulvökapellet från 1622 är ett av Sveriges äldsta bevarade kustkapell — inte att missa.',
    ],
    related: ['arholma', 'sandhamn', 'landsort'],
    tags: ['höga kusten', 'naturreservat', 'surströmming', 'fiske', 'norrland', 'världsarv', 'sandstrand'],
    insiderTips: [
      'Sälesstranden på södra Ulvön är en av norrlandskustens längsta sandstränder — nästan tropiskt känslig en solig julidag.',
      'Höga Kusten-leden passerar förbi Ulvön och är en av Sveriges mest dramatiska vandringsleder.',
      'Ulvöhamn har ett fiskelägeskapell från 1622 — ett av de äldsta i Sverige.',
    ],
    did_you_know: 'Ulvön kallas "Surströmmingsön" och är hem till en av Sveriges sista aktiva surströmmingsfabriker. Ön nämns i historiska dokument redan på 1500-talet som en viktig fiskehamn längs norrlandskusten.',
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli–Augusti',
      best: 'Mitten av Augusti',
      bestReason: 'Surströmmingspremiären sker tredje torsdagen i augusti — ön är livlig, färjan går tätare och det är den mest genuina tidpunkten att besöka Ulvön. Julibadare hittar Sälesstranden på bästa sätt.',
      warning: 'Höga Kusten-mynnet kan ha ojämna väderförhållanden. Kontrollera färjescheman noga — avgångarna är färre utanför högsäsongen och stoppas vid kraftig vind.',
      months: ['off','off','off','off','off','limited','peak','peak','open','limited','off','off'],
    },
  },
  {
    slug: 'gotland',
    name: 'Gotland',
    region: 'ovriga',
    regionLabel: 'Gotland',
    emoji: '🏰',
    tagline: 'Sveriges största ö — medeltida Visby, kalkstensraukar och Östersjösommar.',
    description: [
      'Gotland är Sveriges mest besökta ö och med goda skäl. Visby är en levande medeltidsstad med en välbevarad ringmur, imponerande kyrkoruiner och ett av Sveriges starkaste restaurangutbud. UNESCO-listade sedan 1995.',
      'Raukar längs kusten — de skulpturala kalkstensformationerna — sandstränder och ett klimat som är märkbart varmare än fastlandet gör Gotland till ett naturligt sommarresemål. Nästan var tredje soltimme i Sverige noteras här.',
      'Gotland är mer än Visby. Landsbygden har egna kvaliteter: vindmöllor, medeltidskyrkor i varje socken, mathantverk i världsklass och ett tempo som saktar ner av sig självt. Fårö, ön norr om Gotland, är Ingmar Bergmans landskap.',
    ],
    facts: {
      travel_time: '3 h med Destination Gotland-färja från Nynäshamn',
      character: 'Kulturellt rikt, soligt, levande, medeltida',
      season: 'April–Oktober (peak juli)',
      best_for: 'Alla — par, familjer, kulturresenärer, matälskare',
    },
    activities: [
      { icon: '🏰', name: 'Visby medeltidsstad', desc: 'Utforska UNESCO-listade ringmuren, kyrkoruin­er och det medeltida gatunätet. Bäst tidigt på morgonen eller sent på kvällen.' },
      { icon: '🪨', name: 'Raukar', desc: 'Kalkstensformationer längs kusten. Langhammar på Fårö och Hoburgen i söder är de mest spektakulära.' },
      { icon: '🏖', name: 'Stränder', desc: 'Tofta strand, Ljugarn och Sudersand på Fårö. Gotlands vatten är varmt och grunt — perfekt för barnfamiljer.' },
      { icon: '🚲', name: 'Cykling', desc: 'Platt landskap och välskyltade cykelvägar — Gotland är Sveriges bästa cykelö. Hyr i Visby och cykla ut på landsbygden.' },
      { icon: '🍷', name: 'Mat & dryck', desc: 'Gotlandslammets hemö. Världsklassrestauranger i Visby, lokala vingårdar och hantverk­sbryggerier.' },
    ],
    accommodation: [
      { name: 'Clarion Hotel Wisby', type: 'Hotell', desc: 'Mitt i Visby med pool och utsikt mot ringmuren. Klassiker för sommarvisiter.' },
      { name: 'Strandridargården', type: 'Hotell', desc: 'Spa-hotell vid stranden i Tofta — perfekt om du vill kombinera Visby med stranddagar.' },
      { name: 'Fårösund Camping & Stugby', type: 'Camping', desc: 'Välskött camping vid Fårösund med närheten till Fårö och Bergmans landskap.' },
    ],
    getting_there: [
      { method: 'Destination Gotland-färja', from: 'Nynäshamn', time: '3 h', desc: 'Avgår flera gånger per dag. Bil eller gående passagerare. Boka bil minst 2–3 månader i förväg under juli.', icon: '⛴' },
      { method: 'Destination Gotland-färja', from: 'Oskarshamn', time: '3,5 h', desc: 'Alternativ rutt söderifrån. Smidigare om du reser från Sydsverige eller Kalmar-hållet.', icon: '⛴' },
      { method: 'Flyg', from: 'Stockholm Arlanda / Bromma', time: '55 min', desc: 'BRA och SAS flyger dagligen sommartid. Snabbaste alternativet — men dyrare och utan bil.', icon: '✈️' },
    ],
    transport_meta: {
      from_city_min: 180,
      nearest_hub: 'Nynäshamn',
      from_nearest_hub_min: 180,
      operator: 'Destination Gotland',
      frequency: 'Flera avgångar dagligen',
      booking_url: 'https://www.destinationgotland.se',
      car_parking: 'Parkering finns vid Nynäshamns färjeterminal (avgift). I Visby — planera för trängsel i juli.',
    },
    harbors: [
      // KÄLLA: https://gotland.com/companies/visby-gasthamn/ — "Platser finns både i inre hamnen, i fiskehamnen samt på norra vågbrytaren … 250 platser … hamndjupet är 3-6 m"; gotland.se listar "Visby gästhamn". Service anges inte av Region Gotland.
      { name: 'Visby Gästhamn', desc: 'Gästhamn i centrala Visby med 250 platser i inre hamnen, fiskehamnen och på norra vågbrytaren. Hamndjup 3–6 m.', fuel: false, service: [] },
      // KÄLLA: https://gotland.com/companies/klintehamn-gasthamn/ — 10 gästplatser, djup 1,8–2,5 m; gotland.se (hamnar för fritidsbåt) — "tillgång till toalett, dusch och tvättstuga", "Hamncaféet ligger i anslutning"
      { name: 'Klintehamn Gästhamn', desc: 'Gästhamn på Gotlands västkust med tio gästplatser, hamndjup 1,8–2,5 m. Toalett, dusch och tvättstuga; hamncafé intill.', fuel: false, service: ['dusch', 'tvätt'] },
    ],
    restaurants: [
      // KÄLLA: https://gotland.com/companies/bakfickan/ — "en fisk- och skaldjursrestaurang", Stora Torget 1, "Året runt"; bakfickanvisby.se
      { name: 'Bakfickan Visby', type: 'Restaurang', desc: 'Fisk- och skaldjursrestaurang vid Stora Torget i Visby. Lunch och middag. Öppet året runt.', websiteUrl: 'https://www.bakfickanvisby.se/' },
      // KÄLLA: https://gotland.com/companies/krakas-krog/ — "Restaurang i gamla bankhuset i Kräklingbo", "Fine dining", "menyn följer … säsongerna"; krakas.se — säsong 2026
      { name: 'Krakas Krog', type: 'Restaurang', desc: 'Säsongsbaserad fine dining i gamla bankhuset i Kräklingbo på östra Gotland. Sommaröppen.', websiteUrl: 'https://www.krakas.se/' },
    ],
    tips: [
      'Boka Destination Gotland-färjan minst 2–3 månader i förväg om du reser i juli med bil.',
      'Almedalsveckan (tidig juli) gör Visby fullbokat och hektiskt — undvik om du inte är där för det.',
      'Hyr cykel och ta dig till Fårö för en dag. Bergmans landskap, raukar och en annan tid.',
      'Gotland har 93 medeltidskyrkor — fler än något annat landskap i Sverige. Ta en spontan av­stickare.',
    ],
    related: ['sandhamn', 'arholma', 'ulvon'],
    tags: ['gotland', 'visby', 'medeltid', 'stränder', 'raukar', 'cykling', 'mat', 'världsarv', 'färja'],
    insiderTips: [
      'Gotland har det varmaste klimatet i Sverige med flest soltimmar. Medeltemperaturen i juli är 2–3 grader högre än Stockholm.',
      'Fårö, ön norr om Gotland, är känd som Ingmar Bergmans hemö och har en av landets finaste raukmiljöer vid Langhammar.',
      'Gotlands 93 medeltidskyrkor gör landskapet unikt i Europa — de flesta är öppna och fria att besöka.',
      'Restaurangscenen i Visby är oproportionerligt stark för en stad med 25 000 invånare — sommartid håller den Stockholmsnivå.',
    ],
    activity_meta: {
      cykel: { rental: true, notes: 'Gotland är Sveriges bästa cykelö med välskyltade leder och relativt plant landskap.' },
      bad: { beaches: ['Tofta strand', 'Ljugarn', 'Sudersand (Fårö)'] },
    },
    did_you_know: 'Gotlands ringmur runt Visby är en av världens bäst bevarade medeltida stadsmurar. Den är cirka 3,6 km lång, har 27 bevarade torn och är i det närmaste komplett sedan 1200-talet.',
    seasonal: {
      open: 'April–Oktober',
      peak: 'Juli–mitten av Augusti',
      best: 'Juni eller September',
      bestReason: 'Juni: allt öppet, sommarens kvalitet utan trängseln och de skyhöga priserna. September: badbart vatten, tomma restauranger, lägre hotellpriser och ett lugnare Visby.',
      warning: 'Boka Destination Gotland-färjan minst 2–3 månader i förväg om du reser i juli med bil. Almedalsveckan (tidig juli) ger fullbokat Visby och höga priser.',
      months: ['off','off','off','limited','open','open','peak','peak','open','limited','off','off'],
    },
  },
  {
    slug: 'oland',
    name: 'Öland',
    region: 'ovriga',
    regionLabel: 'Öland',
    emoji: '🌾',
    // Omskriven 2026-09-26 från Länsstyrelsen Kalmar, Riksantikvarieämbetet, oland.se (Ölands officiella besöksguide), Borgholms slott, Sollidens slott och Trafikverket. Tidigare text hade "400 väderkvarnar", "Östersjöns längsta sandstrand", "en av Europas längsta broar", flyg med BRA, tre boenden och soltimmar – inget med källa.
    // KÄLLA: oland.se ("solens och vindarnas ö"); lansstyrelsen.se/kalmar Bödakustens östra ("Här finns Ölands längsta sandstrand")
    tagline: 'Solens och vindarnas ö – världsarvet på södra Öland, Trollskogen och Ölands längsta sandstrand vid Böda.',
    description: [
      // KÄLLA: lansstyrelsen.se/kalmar/besoksmal/varldsarvet-sodra-olands-odlingslandskap.html (läst 2026-09-26) — "År 2000 skrevs Södra Ölands odlingslandskap in på Unesco:s världsarvslista", "ett av Sveriges 15 världsarv", "Idag odlar ölänningarna den jord som odlats sedan många generationer tillbaka och låter beta de marker som har betats i ett par tusen år"
      'Södra Ölands odlingslandskap skrevs in på Unescos världsarvslista år 2000 och är ett av Sveriges 15 världsarv. Enligt Länsstyrelsen i Kalmar län odlar ölänningarna i dag den jord som odlats i generationer och låter beta de marker som har betats i ett par tusen år.',
      // KÄLLA: Länsstyrelsen Kalmar (samma sida) — "Av Ölands drygt 300 byar är cirka 200 radbyar", "alla gårdarna ligger tätt intill varandra på rad utmed bygatan eller landsvägen"; raa.se Södra Ölands odlingslandskap — alvaren "består av flacka hällmarker på hård kalkberggrund", "Stora Alvaret dominerar"
      'Av Ölands drygt 300 byar är cirka 200 radbyar, där gårdarna ligger tätt på rad utmed bygatan. Utmarkerna är alvaren – flacka hällmarker på hård kalkberggrund – och Stora alvaret är det största.',
      // KÄLLA: lansstyrelsen.se/kalmar Trollskogen — "Ölands nordostligaste udde", "gammal tallskog med stormvridna träd", "mäktiga ekar klädda i murgröna", "klapperstenstränder", "ett av Ölands mest besökta naturområden"; Bödakustens östra — "Ölands längsta sandstrand", "tio meter höga sanddyner", "De äldsta tallarna är upp emot 200 år gamla"
      'I norr ligger naturreservatet Trollskogen på Ölands nordostligaste udde, med stormvridna tallar, grova ekar och klapperstensstränder – ett av öns mest besökta naturområden. I Bödakustens östra naturreservat finns Ölands längsta sandstrand, med upp till tio meter höga sanddyner och sandtallskog där de äldsta tallarna är nära 200 år.',
      // KÄLLA: borgholmsslott.se (läst 2026-09-26) — "I 900 år har Borgholms slott stått på sin klippkant och blickat ut över Kalmarsund", "palatset förstördes vid en brand i början av 1800-talet", guidade turer och utställningar; sollidensslott.se — "Öppet dagligen 7 maj - 27 september 2026", byggt av drottning Victoria, "stod färdigt 1906", parker
      'Vid Borgholm står Borgholms slott, som har legat på klippkanten över Kalmarsund i 900 år; palatset brann i början av 1800-talet, och ruinen har i dag utställningar och guidade turer. Sollidens slott, som drottning Victoria lät bygga och som stod färdigt 1906, har parker som är öppna för besökare under sommarhalvåret.',
    ],
    facts: {
      travel_time: 'Bil över Ölandsbron från Kalmar · tåg till Kalmar och regionbuss vidare',
      character: 'Världsarv, alvar, radbyar och långa sandstränder i norr',
      season: 'Maj–September (peak juli–aug)',
      best_for: 'Natur, kulturhistoria, cykling, strand',
    },
    facts_provenance: { travel_time: 'matt', character: 'matt', season: 'bedomning', best_for: 'bedomning' },
    activities: [
      // KÄLLA: Länsstyrelsen Kalmar, världsarvet (se description); oland.se/varldsarvet — guidade turer med Öländsguiderna, världsarvshelg 4–6 september 2026
      { icon: '🌾', name: 'Världsarvet på södra Öland', desc: 'Radbyar, stenmurar och Stora alvaret i det levande odlingslandskapet. Öländsguiderna har guidade turer i världsarvet.' },
      // KÄLLA: borgholmsslott.se
      { icon: '🏰', name: 'Borgholms slott', desc: 'Slottsruinen på klippkanten över Kalmarsund, med utställningar, guidade turer och slottscafé.' },
      // KÄLLA: lansstyrelsen.se/kalmar Bödakustens östra — "Ölands längsta sandstrand", "fina badstränder och en vandringsled"; hund ska vara kopplad, ingen eld, inget tält
      { icon: '🏖', name: 'Böda', desc: 'Ölands längsta sandstrand i Bödakustens östra naturreservat, med sanddyner och en vandringsled. I reservatet ska hunden vara kopplad, och det är förbjudet att tälta och göra upp eld.' },
      // KÄLLA: lansstyrelsen.se/kalmar Trollskogen — "Vandringsleder i Trollskogen", "Reservatet ligger på Ölands nordostligaste udde och är en del av Ekopark Böda"
      { icon: '🌲', name: 'Trollskogen', desc: 'Vandringsleder genom stormvriden tallskog och längs klapperstensstränder på öns nordostligaste udde, en del av Ekopark Böda.' },
      // KÄLLA: sollidensslott.se — "Öppet dagligen 7 maj - 27 september 2026", parker, restaurang & café
      { icon: '🌷', name: 'Sollidens slott', desc: 'Kungafamiljens sommarslott med parker som är öppna dagligen på sommaren – 2026 från 7 maj till 27 september.' },
    ],
    // Stod Borgholms Stadshotell, Böda Sand Camping och Halltorps Gästgiveri med obelagda beskrivningar ("Boka i god tid"). Borttagna 2026-09-26; oland.se har boendesök.
    accommodation: [],
    // KÄLLA: oland.se/en/travel/bus-tag-taxi (läst 2026-09-26) — "several daily departures to Kalmar from Stockholm, Gothenburg and Malmö/Copenhagen", Silverlinjen "Direct bus in both directions all year round", Swebus/Flixbus Stockholm–Kalmar, "From Kalmar and on to Öland, you can travel with the local bus company KLT", regionbussar "lines 101, 102, 103 …"; trafikverket.se "Underhållsarbeten på Ölandsbron" (trafik från Kalmar och från Öland över bron, arbeten 6 april–15 juni och 16 augusti–21 september 2026). Restider, BRA-flyg och "kostnads- och tullfri bro" stod utan källa.
    getting_there: [
      { method: 'Bil', from: 'Kalmar', desc: 'Ölandsbron går från Kalmar över Kalmarsund till Öland. Trafikverket har aviserat underhållsarbeten med risk för köer under delar av våren och sensommaren.', icon: '🚗' },
      { method: 'Tåg + buss', from: 'Stockholm, Göteborg eller Malmö', desc: 'Tåg till Kalmar flera gånger om dagen, sedan Kalmar länstrafiks regionbussar (t.ex. linje 101–107) vidare till Öland.', icon: '🚆' },
      { method: 'Direktbuss', from: 'Stockholm', desc: 'Silverlinjen kör direktbuss mellan Stockholm och Öland/Kalmar året runt.', icon: '🚌' },
    ],
    harbors: [
      // KÄLLA: https://www.borgholm.se/borgholms-hamn — "Drivs av: Strand Öland", "Duschar: 3", "Tvättstuga: Ja", "Tanka: Diesel och bensin", "Wifi: Ja", "El: Ja" (redigerad 2026-06-29)
      { name: 'Borgholms Gästhamn', desc: 'Gästhamn nedanför Borgholms slott, drivs av Strand Öland. El, vatten, dusch, tvättstuga, wifi och tankning.', fuel: true, service: ['el', 'vatten', 'dusch', 'tvätt', 'wifi', 'bränsle'] },
    ],
    restaurants: [
      // KÄLLA: https://www.borgholmsslott.se/slottscafe/ — "Slottscafé", pannkakor, bullar, kakor och glass. Namnet Källarporten finns inte.
      { name: 'Slottscafé, Borgholms slott', type: 'Café', desc: 'Café i slottsruinen med pannkakor, bullar, kakor och glass.', websiteUrl: 'https://www.borgholmsslott.se/slottscafe/' },
    ],
    // KÄLLA: oland.se (Ölands Turistcenter, boende och evenemang); lansstyrelsen.se/kalmar reservatsföreskrifter för Bödakustens östra
    tips: [
      'I Bödakustens östra naturreservat får du inte tälta eller göra upp eld, och hunden ska vara kopplad.',
      'Under världsarvshelgen, 2026 den 4–6 september, har södra Öland extra många guidade turer, öppna kyrkor och konserter.',
    ],
    related: ['gotland', 'ulvon'],
    tags: ['öland', 'alvaret', 'böda', 'trollskogen', 'borgholm', 'unesco', 'strand', 'historia', 'cykling'],
    // KÄLLA: Länsstyrelsen Kalmar, världsarvet — radbyarna, "Gårdstypen kallas götisk", Östgötalagen från 1200-talet. Stod "fler soltimmar än nästan hela övriga Sverige" utan källa.
    did_you_know: 'I en öländsk radby fick gården en bredare tomt mot bygatan ju större andel den hade i byns jord – regler för hur radbytomten skulle läggas ut finns redan i Östgötalagen från 1200-talet.',
    // seasonal borttaget 2026-09-26: "alvaret blommar med orkidéer", "priser rimliga", "Ölandsbron kan ha kö på fredagar" och stängt november–mars stod utan källa.
  },
  // ── Göteborgs södra skärgård (Styrsöbolaget) ─────────────────────────────

  {
    slug: 'branno',
    name: 'Brännö',
    region: 'goteborg',
    regionLabel: 'Göteborgs södra skärgård',
    emoji: '💃',
    // Omskriven 2026-09-26. Tidigare text sa att dansen på bryggan är "varje fredag" med hambo och polska sedan 1930-talet, att Rävholmen är populärast, att värdshuset är öns enda boende och att restiden är 30 min. Inget av det gick att belägga; dansen är på torsdagar (Brännöföreningen, Styrsöbolaget).
    // KÄLLA: goteborg.com/platser/branno (Göteborg & Co, läst 2026-09-26) — "Ö med välkänd bryggdans, barnvänlig badplats och genuint värdshus"
    tagline: 'Ön med dansen på Brännö brygga, badplatser och värdshus – bilfri, i Göteborgs södra skärgård.',
    description: [
      // KÄLLA: goteborg.com/platser/branno — "levande skärgårdsö i södra delen av Göteborgs skärgård med cirka 900 bofasta invånare", "Sommargästerna började inta ön på 1930-talet och numera är pendlarna i klar majoritet", "jordbruket, lots-historien, tullarna och sjöfarten", "Viskompositören Lasse Dahlqvist har gjort ön känd genom sina visor", "Från berget vid den gamla lotsutkiken, på öns högsta punkt, har du utsikt från Vinga till inloppet till Göteborg", "hembygdsmuseet mitt på ön"
      'Brännö är en levande ö i Göteborgs södra skärgård med omkring 900 bofasta. Sommargästerna kom på 1930-talet, och i dag är pendlarna i klar majoritet. Tidigare levde ön på jordbruk, lotsning, tull och sjöfart, och från den gamla lotsutkiken på öns högsta punkt ser man från Vinga till inloppet till Göteborg. Mitt på ön finns ett litet hembygdsmuseum.',
      // KÄLLA: https://www.brannoforeningen.se/kulturevenemang/dans-pa-branno-brygga/ — "Brännö Brygga är vackert belägen i Brännö Husvik med utblick mot västerhavet och Vinga fyr", "Torsdag 25 juni kl 19.30 – 22.00", "Torsdag 30 juli kl 19.30 – 22.00", "Lördag 8 aug kl 19.30 – 22.00" (läst 2026-09-27)
      // KÄLLA: https://www.goteborg.com/platser/branno — "Vill du uppleva den klassiska dansen på Brännö brygga tar du båten till Husvik på sydvästra sidan", "De’ ä’ dans på Brännö brygga" (läst 2026-09-27). Samma sida har en bildtext som säger "dans vid Rödstens brygga" – den motsägs av arrangören, Styrsöbolaget och sidans egen brödtext.
      // KÄLLA: https://transdev.se/wp-content/uploads/sites/5/2026/03/25-056-Annons-Ockero-Tidning-252x370-3.pdf — "STENPIREN – BRÄNNÖ HUSVIK" (läst 2026-09-27)
      'Ön är känd genom Lasse Dahlquists visa om dansen på Brännö brygga, och dansen finns kvar. Bryggan ligger i Husvik på öns sydvästra sida, med utsikt mot västerhavet och Vinga fyr. Brännöföreningen ordnar dansen på sommaren: 2026 var det dans på torsdagar från 25 juni till 30 juli och en avslutning lördag 8 augusti, kl. 19.30–22.00 med olika band. Styrsöbolagets M/S Kungsö gick då en kvällstur från Stenpiren i Göteborg till Brännö Husvik.',
      // KÄLLA: goteborg.com/guider/ta-dig-till-skargarden — "De södra öarna är bilfria och nås enkelt året runt med Styrsöbolagets båtar", "283, Saltholmen–Asperö–Brännö Rödsten", "282, Saltholmen–Köpstadsö–Styrsö Bratten–Styrsö Tången–Brännö Husvik", "Båtarna avgår som regel en gång i timmen", "räcker en biljett för zon A"
      // KÄLLA: https://transdev.se/wp-content/uploads/sites/5/2026/07/Hosttidtabell-281-282-Liggande-A3.pdf — "Hösttidtabell 20260823 - 20261212" (läst 2026-09-27); Husvik anlöps sex gånger måndag–fredag och två gånger lördag och söndag (se getting_there)
      'Brännö är bilfri och nås året runt med Styrsöbolagets båtar från Saltholmen: linje 283 till Brännö Rödsten, som som regel går en gång i timmen, och linje 282 via Styrsö till Brännö Husvik, som bara har ett fåtal turer om dagen. Båtarna ingår i Västtrafiks kollektivtrafik, med en biljett för zon A.',
    ],
    facts: {
      // KÄLLA: https://transdev.se/wp-content/uploads/sites/5/2026/07/Hosttidtabell-283-Liggande-A4.pdf — "283 Hösttidtabell 20260824 - 20261212", "Saltholmen-Asperö-Brännö Rödsten" (läst 2026-09-27). Restiden räknad ur tabellen, måndag–fredag: Saltholmen 05:20 → Brännö Rödsten 05:38 (18 min), 09:24 → 09:47 (23 min via Asperö Östra).
      // KÄLLA: https://www.goteborg.com/guider/ta-dig-till-skargarden — "282, Saltholmen–Köpstadsö–Styrsö Bratten–Styrsö Tången–Brännö Husvik" (läst 2026-09-27)
      travel_time: 'Båt 18–23 min från Saltholmen till Brännö Rödsten (linje 283, hösten 2026); linje 282 går till Brännö Husvik',
      // KÄLLA: https://www.goteborg.com/platser/branno — "cirka 900 bofasta invånare", "Ö med välkänd bryggdans, barnvänlig badplats och genuint värdshus" (läst 2026-09-27)
      character: 'Bilfri ö med omkring 900 bofasta, bryggdans och värdshus',
      // KÄLLA: https://www.goteborg.com/guider/ta-dig-till-skargarden — "De södra öarna är bilfria och nås enkelt året runt med Styrsöbolagets båtar" (läst 2026-09-27); dansen: se description
      season: 'Året runt (dansen: sommar)',
      // KÄLLA: https://www.goteborg.com/platser/branno — "Badplatser finns det gott om på ön", "Via en smal landförbindelse går det att vandra över till fantastiska Galterö" (läst 2026-09-27)
      best_for: 'Bad, promenad till Galterö, dans på bryggan i Husvik',
    },
    facts_provenance: { travel_time: 'matt', character: 'matt', season: 'matt', best_for: 'bedomning' },
    activities: [
      // KÄLLA: https://www.brannoforeningen.se/kulturevenemang/dans-pa-branno-brygga/ — "Brännö Brygga är vackert belägen i Brännö Husvik", "Brännö Rödsten (gångavstånd cirka 30 minuter till Brännö Brygga)", "Le Shack har som vanligt öppet under danserna" (läst 2026-09-27)
      // KÄLLA: https://brannoforeningen.se/kulturevenemang/kafe-husvik/ — "Brännöföreningen har inför säsongen 2026 återigen arrenderat ut kiosk/kaféet i Husvik till Sebastian Pilups som här driver Le Shack", "Kaféet ligger i direkt anslutning till färjelägret Brännö Husvik" (läst 2026-09-27)
      { icon: '💃', name: 'Dans på Brännö brygga', desc: 'Bryggan ligger i Husvik. Sommartid, med levande band kl. 19.30–22.00 – 2026 på torsdagar 25 juni–30 juli och lördag 8 augusti. Kaféet Le Shack vid färjeläget i Husvik har öppet under danserna. Kommer du med båten till Rödsten är det cirka 30 minuters promenad till bryggan.' },
      // KÄLLA: goteborg.com/platser/branno — "Vid Ramsdals badplats, nära Husvik finns en barnvänlig strand med klippor och hopptorn samt toaletter", "Från Rödsten är det cirka en kilometer till badplatsen Gröna Vik. Här finns sandstrand och bryggor"
      { icon: '🏖', name: 'Bad', desc: 'Ramsdal nära Husvik har barnvänlig strand, klippor, hopptorn och toaletter. Gröna Vik, cirka en kilometer från Rödsten, har sandstrand och bryggor.' },
      // KÄLLA: goteborg.com/platser/branno — "Via en smal landförbindelse går det att vandra över till fantastiska Galterö. Här finns ett rikt fågelliv", "enkelt att ta upp kajaken på stränderna vid Galterös vikar"; goteborg.com/guider/en-guide-till-skargarden-sodra-oar — "obebodda grannön Galterö"
      { icon: '🥾', name: 'Promenad till Galterö', desc: 'Via en smal landförbindelse går det att gå över till obebodda Galterö, med rikt fågelliv och vikar där man kan ta upp kajaken.' },
      // KÄLLA: https://www.aroniagarden.se/ — "Eller varför inte hyra en cykel av oss under de dagar du gästar vår ö?", "I vår verkstad erbjuder vi service och reparationer av cyklar, elcyklar och elektriska flakmopeder" (läst 2026-09-27)
      { icon: '🚲', name: 'Cykel', desc: 'Aroniagården hyr ut cyklar och har en verkstad som servar och reparerar cyklar, elcyklar och elektriska flakmopeder.' },
    ],
    // Stod "Brännö Värdshus & Pensionat – öns enda övernattning … Boka långt i förväg" utan källa; boendet står under värdshuset nedan (rum året runt enligt brannovardshus.se).
    accommodation: [],
    getting_there: [
      // KÄLLA: https://www.goteborg.com/guider/ta-dig-till-skargarden — "283, Saltholmen–Asperö–Brännö Rödsten", "Båtarna avgår som regel en gång i timmen", "räcker en biljett för zon A" (läst 2026-09-27)
      // KÄLLA: https://transdev.se/wp-content/uploads/sites/5/2026/07/Hosttidtabell-283-Liggande-A4.pdf — "283 Hösttidtabell 20260824 - 20261212" (läst 2026-09-27); restid 18–23 min räknad ur tabellen (se facts)
      // KÄLLA: https://transdev.se/wp-content/uploads/sites/5/2026/07/Hosttidtabell-281-282-Liggande-A3.pdf — "282 Stenpiren-Saltholmen-Köpstadsö-Styrsö Bratten-Styrsö Tången-Brännö Husvik och omvänt", "Hösttidtabell 20260823 - 20261212" (läst 2026-09-27). Raden Brännö Husvik har måndag–fredag ankomsterna 07:34, 10:41, 15:19, 16:09, 17:12 och 18:19, lördag 10:36 och 15:25, söndag 10:08 och 15:33.
      // KÄLLA: https://www.brannoforeningen.se/kulturevenemang/dans-pa-branno-brygga/ — "gångavstånd cirka 30 minuter till Brännö Brygga" (läst 2026-09-27)
      { method: 'Styrsöbolagets båt', from: 'Saltholmen', desc: 'Linje 283 Saltholmen–Asperö–Brännö Rödsten och linje 282 via Styrsö till Brännö Husvik. Båtarna ingår i Västtrafiks zon A. Linje 283 går som regel en gång i timmen och tar 18–23 minuter till Rödsten enligt hösttidtabellen (24 augusti–12 december 2026). Linje 282 anlöper Husvik bara sex gånger om dagen måndag–fredag och två gånger på lördagar och söndagar (hösttidtabellen 2026), så de flesta turer går till Rödsten. Från Rödsten är det cirka 30 minuters promenad till dansbryggan i Husvik. Sök resan i Västtrafiks app.', icon: '⛴' },
    ],
    harbors: [
    ],
    restaurants: [
      // KÄLLA: https://www.goteborg.com/platser/branno-vardshus-pensionat-baggen — "mitt på den södra ön Brännö", "Mat med inspiration från havet", byggt 1900 (läst 2026-09-26)
      // KÄLLA: https://brannovardshus.se/oppettider — "14 Februari – 31 maj 2026", "1 JUNI – 23 JUNI 2026", "Onsdag kl. 12-18/20", "24 JUNI – 9 AUGUSTI 2026", "Öppet alla dagar 12.00-23.00", "10 AUGUSTI – 13 DECEMBER 2026", "Rumsuthyrning på Pensionat Baggen och Värdshusets Gästrum är möjlig året runt" (läst 2026-09-27). 1–23 juni är restaurangen öppen även onsdagar, så den tidigare texten (torsdag–söndag utanför högsäsongen) var inte helt rätt; klockslag struket (sidan anger att stängningstiden varierar).
      { name: 'Brännö Värdshus & Pensionat Baggen', type: 'Värdshus', desc: 'Värdshus och pensionat mitt på Brännö, byggt år 1900. Mat med inspiration från havet. Restaurangen har 2026 öppet 14 februari–13 december: alla dagar 24 juni–9 augusti, övriga perioder vissa veckodagar (torsdag–söndag, i juni även onsdag). Rumsuthyrning året runt.', websiteUrl: 'https://brannovardshus.se/' },
    ],
    // KÄLLA: https://www.goteborg.com/guider/ta-dig-till-skargarden — "De södra öarna är bilfria", "Samma typ av biljett gäller på båten som på buss och spårvagn" (läst 2026-09-27)
    // KÄLLA: https://www.styrsobolaget.se/dans-pa-branno-brygga/ — "M/S Kungsö avgår på torsdagar från Stenpiren kl 19:10", "avgång från Brännö 22.30" (läst 2026-09-27); https://transdev.se/wp-content/uploads/sites/5/2026/03/25-056-Annons-Ockero-Tidning-252x370-3.pdf — "STENPIREN – BRÄNNÖ HUSVIK" (läst 2026-09-27), framme i Husvik 20.15 enligt samma tabell
    tips: [
      'Ön är bilfri. En biljett för Västtrafiks zon A räcker för båten, samma som för spårvagn och buss.',
      'På danskvällarna går Styrsöbolagets M/S Kungsö från Stenpiren i Göteborg direkt till Brännö Husvik (kl. 19.10 sommaren 2026, framme 20.15) och tillbaka från Brännö 22.30.',
    ],
    related: ['styrso', 'vrango', 'donso', 'asperon'],
    tags: ['göteborg', 'södra skärgård', 'dans', 'bilfritt', 'styrsöbolaget', 'västkust', 'bad'],
    // KÄLLA: https://www.goteborg.com/platser/branno — "Skärgårdsön Brännö är känd inte minst genom Lasse Dahlquists klassiska visa" (läst 2026-09-27); https://www.brannoforeningen.se/kulturevenemang/dans-pa-branno-brygga/ — "Vi ser fram emot ännu en härlig sommar med mycket sol, musik och dans", "Brännö Brygga är vackert belägen i Brännö Husvik", "Torsdag 25 juni kl 19.30 – 22.00" (läst 2026-09-27)
    // Stod tidigare att folkdansen startade på 1930-talet och hölls nästan varje fredag – utan källa; arrangören anger torsdagar.
    did_you_know: 'Lasse Dahlquists visa om dansen på Brännö brygga gjorde ön känd, och dansen hålls fortfarande varje sommar på bryggan i Husvik – i dag på torsdagskvällar med levande band.',
    // KÄLLA: https://www.goteborg.com/guider/ta-dig-till-skargarden — "nås enkelt året runt" (läst 2026-09-27); https://brannovardshus.se/oppettider — "Rumsuthyrning på Pensionat Baggen och Värdshusets Gästrum är möjlig året runt", "14 Februari – 31 maj 2026", "10 AUGUSTI – 13 DECEMBER 2026" (läst 2026-09-27).
    seasonal: {
      open: 'Året runt – båtar och rum; värdshusets restaurang 14 februari–13 december',
      // KÄLLA: https://www.brannoforeningen.se/kulturevenemang/dans-pa-branno-brygga/ — "Torsdag 25 juni kl 19.30 – 22.00", "Lördag 8 aug kl 19.30 – 22.00" (läst 2026-09-27); https://brannovardshus.se/oppettider — "24 JUNI – 9 AUGUSTI 2026", "Öppet alla dagar 12.00-23.00" (läst 2026-09-27)
      peak: 'Slutet av juni–början av augusti',
      best: 'Slutet av juni–början av augusti',
      bestReason: 'Då är det dans på Brännö brygga i Husvik och värdshuset har öppet alla dagar (24 juni–9 augusti 2026).',
      // KÄLLA: https://brannovardshus.se/oppettider — "Måndag-onsdag öppet endast för förbokade större sällskap och konferenser" (läst 2026-09-27); sidan anger restaurangtider bara för perioderna 14 februari–13 december 2026.
      warning: 'Värdshusets restaurang har 2026 öppet 14 februari–13 december. Utanför sommaren tar den emot besökare torsdag–söndag (i juni även onsdag); måndag–onsdag bara förbokade större sällskap.',
      months: ['limited','limited','limited','limited','open','peak','peak','peak','open','limited','limited','limited'],
    },

  },
  {
    slug: 'styrso',
    name: 'Styrsö',
    region: 'goteborg',
    regionLabel: 'Göteborgs södra skärgård',
    emoji: '🌿',
    // KÄLLA: https://www.goteborg.com/platser/styrso — "cirka 1400 bofasta invånare"; "Skärgårdsbåten anlöper vid tre olika bryggor: Styrsö Bratten, Styrsö Tången och Styrsö Skäret"; "På Styrsö finns fyra små samhällen med olika karaktärer"; "Det finns en broförbindelse mellan Styrsö och Donsö" (läst 2026-09-27)
    tagline: 'Bilfri ö med 1 400 invånare i Göteborgs södra skärgård — tre bryggor, fyra små samhällen och bro till Donsö.',
    description: [
      // KÄLLA: https://www.goteborg.com/platser/styrso — "Styrsö är den södra delen av skärgårdens centralort med cirka 1400 bofasta invånare"; "Det är förbjudet att köra bil på Styrsö, de flesta använder därför lastmopeder och golfbilar som transportmedel" (läst 2026-09-27)
      // KÄLLA: https://www.brattenswardshus.se/historia/ — "Styrsö Bratten är centralpunkten i Södra Skärgården. Här finns vårdcentral, folktandvård, äldreboendet Styrsö Hemmet, samt ett stycke upp på ön högstadieskola med centralbibliotek" (läst 2026-09-27)
      'Styrsö har omkring 1 400 invånare året om och är södra skärgårdens centralort. Vid Bratten finns vårdcentral, folktandvård och äldreboende, och en bit upp på ön högstadieskola med bibliotek. Det är förbjudet att köra bil här — de flesta tar sig fram med lastmoped eller golfbil.',
      // KÄLLA: https://www.goteborg.com/platser/styrso — "Det äldsta är Byn med kyrkan från 1752, gårdar och gammal odlingsmark. Tången är det traditionella fiskeläget med tät bebyggelse och slingrande smala vägar. I Halsvik satte de välbeställda skutskepparna sin prägel på bebyggelsen och Bratten fick de fina sommargästerna" (läst 2026-09-27)
      'Ön består av fyra små samhällen. Äldst är Byn, med kyrkan från 1752, gårdar och gammal odlingsmark. Tången är det traditionella fiskeläget med tät bebyggelse och smala, slingrande vägar, i Halsvik byggde de välbeställda skutskepparna, och Bratten blev sommargästernas del av ön.',
      // KÄLLA: https://www.goteborg.com/ — "Brattens Wärdshus – vid färjelägret Styrsö Bratten". Tidigare text om "en av Göteborgs mest hyllade" saknade källa och togs bort 2026-09-14.
      'Vid färjeläget Styrsö Bratten ligger Bratten\'s Wärdshus, restaurang och kafé.',
      // KÄLLA: http://www.batebacken.se/ — "Båtebackens Caferestaurang ligger på Styrsö Tången intill Snobbrännan på Nordvästra Styrsö"; "När solen går ner bakom Känsö Torn då vet vi att nu är det högsommar"; "bortom farleden ser du bl.a. öarna Brännö och Känsö" (läst 2026-09-27)
      // KÄLLA: https://www.brattenswardshus.se/historia/ — "Tången var ursprungligen öns fiskhamn" (läst 2026-09-27)
      'Tången ligger inte på södra spetsen utan på öns nordvästra sida, och var ursprungligen öns fiskhamn. Vid kajkanten ligger Båtebackens caférestaurang med utsikt över farleden Snobbrännan och öarna Brännö och Känsö — på högsommaren går solen ner bakom Känsö torn.',
      // KÄLLA: https://www.goteborg.com/platser/styrso — "Från öns högsta punkt, Stora Rös, kan du njuta av en storslagen utsikt över hela skärgården. Härifrån kan du vandra på naturstigarna till Brännholmsviken och Styrsö Skäret" (läst 2026-09-27)
      'Från öns högsta punkt, Stora Rös, ser man ut över hela skärgården, och därifrån går naturstigar till Brännholmsviken och Styrsö Skäret. Över Långesandsbron kan du gå eller cykla vidare till Donsö.',
      // KÄLLA: https://www.brattenswardshus.se/historia/ — "Långesandsbron"; "Bron som förbinder Styrsö och Donsö" (läst 2026-09-27)
      // KÄLLA: https://kusthotelletstyrso.se/historia/ — "År 1893 invigdes Styrsö Havsbad"; "I början av 1900-talet spelade Styrsö även en viktig roll i vården av tuberkulossjuka barn" (läst 2026-09-27)
      // KÄLLA: https://www.goteborg.com/platser/styrso — "En kort promenad från Bratten hittas sedan augusti 2025" (läst 2026-09-27)
      'Badortstiden syns fortfarande vid Bratten. 1893 invigdes Styrsö Havsbad, och i början av 1900-talet vårdades tuberkulossjuka barn i sanatorier på ön. I dag ligger Kusthotellet Styrsö, öppnat i augusti 2025, en kort promenad från Bratten.',
    ],
    facts: {
      // KÄLLA: https://transdev.se/wp-content/uploads/sites/5/2026/07/Hosttidtabell-281-282-Liggande-A3.pdf — "23/08 2026 - 12/12 2026"; "281 Stenpiren-Saltholmen-Köpstadsö-Styrsö Bratten-Donsö-Vrångö och omvänt"; "282 Stenpiren-Saltholmen-Köpstadsö-Styrsö Bratten-Styrsö Tången-Brännö Husvik och omvänt"; "Styrsö Bratten - 05:34 - - 06:26 07:16 - 08:11 08:59 09:39 10:17". Vardagar enligt tabellen (avläst): Saltholmen 06:09→Bratten 06:26, 07:54→08:11, 09:25→09:39, 11:20→11:44; Saltholmen 07:24→Skäret 07:39; Saltholmen 05:47→Tången 06:12, 08:35→09:09, 09:53→10:28 (läst 2026-09-27)
      travel_time: '15–25 min med båt 281/282 från Saltholmen till Bratten eller Skäret, 25–35 min till Tången',
      // KÄLLA: https://www.goteborg.com/platser/styrso — "En bilfri ö full av historia och skärgårdscharm"; "Tången är det traditionella fiskeläget" (läst 2026-09-27)
      character: 'Bilfri ö med fiskeläge, kyrkby och badortsvillor',
      // KÄLLA: https://www.goteborg.com/guider/ta-dig-till-skargarden — "Färjorna går året runt från Saltholmen" (läst 2026-09-27)
      // KÄLLA: https://kusthotelletstyrso.se/ — "Hos oss finns plats för både avkoppling och gemenskap – året runt" (läst 2026-09-27)
      season: 'Året runt',
      // UPPSKATTNING: målgrupper utifrån bad, restauranger vid bryggorna och bron till Donsö
      best_for: 'Dagstur med bad och promenad, mat vid bryggan, cykel till Donsö',
    },
    activities: [
      // KÄLLA: https://www.goteborg.com/guider/guide-ata-och-fika-i-goteborgs-skargard — "Beger du dig istället till färjeläget Styrsö Bratten hittar du" (läst 2026-09-27)
      { icon: '🍽', name: 'Bratten\'s Wärdshus', desc: 'Restaurang och kafé vid färjeläget Bratten.' },
      // KÄLLA: https://www.goteborg.com/platser/styrso — "Från öns högsta punkt, Stora Rös, kan du njuta av en storslagen utsikt över hela skärgården" (läst 2026-09-27)
      { icon: '🌿', name: 'Stora Rös', desc: 'Öns högsta punkt, med utsikt över hela skärgården. Naturstigar leder vidare till Brännholmsviken och Styrsö Skäret.' },
      // KÄLLA: https://www.goteborg.com/platser/styrso-brattenbadet/ — "Badet ligger cirka 300 meter från färjeläget Styrsö Bratten"; "Vid badplatsen finns en mindre sandstrand, brygga med badstegar, klippor och en gräsyta"; "vattnet kan vara strömt i farleden utanför badplatsen" (läst 2026-09-27)
      // KÄLLA: https://www.goteborg.com/platser/styrso — "Utterviksbadet ligger i nordväst, en kilometer från hållplatsen Styrsö Tången"; "Utterviksbadet med bryggor och badvänliga klippor" (läst 2026-09-27)
      { icon: '🏖', name: 'Bad', desc: 'Brattenbadet, 300 meter från Bratten, har liten sandstrand, brygga med badstegar och klippor — men vattnet kan vara strömt i farleden utanför. Utterviksbadet i nordväst, en kilometer från Tången, har bryggor och klippor.' },
      // KÄLLA: https://styrsohamn.se/styrs%C3%B6-t%C3%A5ngen/ — "Som båtgäst i Tången får du tillgång till toaletter samt dusch vid Båtebacken" (läst 2026-09-27)
      // KÄLLA: https://tangbaren.se/batplatser/ — "Hos Tångbaren hittar du 12 stycken gästplatser med akterförtöjning" (läst 2026-09-27)
      { icon: '⛵', name: 'Gästhamn', desc: 'Gästplatser i Styrsö Tången, med toalett och dusch vid Båtebacken. Tångbaren har 12 gästplatser med akterförtöjning.' },
    ],
    accommodation: [
      // KÄLLA: https://www.goteborg.com/platser/kusthotellet-styrso — "med 50 rum, varav 10 sviter, restaurang, wellness-område, uppvärmd utomhuspool och gym" (läst 2026-09-27)
      // KÄLLA: https://www.goteborg.com/platser/styrso — "En kort promenad från Bratten hittas sedan augusti 2025" (läst 2026-09-27)
      { name: 'Kusthotellet Styrsö', type: 'Hotell', desc: 'Hotell en kort promenad från Bratten, öppnat i augusti 2025: 50 rum varav 10 sviter, restaurang, spa, uppvärmd utomhuspool och gym. Öppet året runt.', websiteUrl: 'https://kusthotelletstyrso.se/' },
      // KÄLLA: https://stbnb.se/ — "We are open for bookings for the summer season June – August 2026"; "four bedrooms, kitchen and a bathroom. We can accommodate up to 10 guests"; "a six minute walk from the ferry station Tången" (läst 2026-09-27)
      // KÄLLA: https://www.goteborg.com/platser/styrso-tangen-bed-breakfast/ — "inrymt i en vacker jugendvilla från 1904" (läst 2026-09-27)
      { name: 'Guesthouse Styrsö Tången', type: 'Pensionat', desc: 'Övervåningen i en jugendvilla från 1904: fyra sovrum, kök och badrum för upp till tio gäster. Sex minuters promenad från Tången. Sommarsäsong juni–augusti.', websiteUrl: 'https://stbnb.se/' },
    ],
    getting_there: [
      // KÄLLA: https://www.goteborg.com/guider/ta-dig-till-skargarden — "Spårvagn 11, samt linje 9 under sommaren, restid cirka 35 minuter"; "Buss 114, Ö-snabben, restid cirka 25 minuter"; "281, Saltholmen–Köpstadsö–Styrsö Bratten–Donsö–Vrångö"; "283, Saltholmen–Asperö–Brännö Rödsten" (läst 2026-09-27)
      // KÄLLA: https://www.goteborg.com/platser/kusthotellet-styrso — "bara cirka 1 timma från centrala Göteborg" (läst 2026-09-27)
      { method: 'Spårvagn + Styrsöbolaget-färja', from: 'Göteborg C', time: 'ca 1 h totalt', desc: 'Spårvagn 11 (även 9 på sommaren) eller buss 114 Ö-snabben till Saltholmen, sedan båt 281 eller 282 — 15–35 minuter beroende på brygga. Linje 283 går inte till Styrsö.', icon: '🚋' },
      // KÄLLA: https://www.goteborg.com/guider/ta-dig-till-skargarden — "två turer per dag måndag till fredag, samt även lördag och söndag under sommaren" (läst 2026-09-27)
      { method: 'Båt direkt', from: 'Stenpiren (centrala Göteborg)', time: 'ca 1 h', desc: 'Några turer på linje 281 och 282 går direkt från Stenpiren utan byte — två om dagen på vardagar, fler på sommaren.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: https://styrsohamn.se/styrs%C3%B6-t%C3%A5ngen/ — "Tångens Gästhamn"; "Som båtgäst i Tången får du tillgång till toaletter samt dusch vid Båtebacken och betalning sker inne på restaurangen" (läst 2026-09-27)
      // KÄLLA: https://tangbaren.se/batplatser/ — "Hos Tångbaren hittar du 12 stycken gästplatser med akterförtöjning"; "nere i Styrsö Sandvik, en kort promenad ifrån oss" (läst 2026-09-27)
      { name: 'Tångens gästhamn', desc: 'Gästhamn vid Styrsö Tången, med toalett och dusch vid Båtebacken (betalning i restaurangen). Tångbaren har 12 egna gästplatser med akterförtöjning, och fler platser finns i Styrsö Sandvik en kort promenad bort.', service: ['toalett', 'dusch'] },
    ],
    restaurants: [
      // KÄLLA: https://www.goteborg.com/guider/guide-ata-och-fika-i-goteborgs-skargard — "Beger du dig istället till färjeläget Styrsö Bratten hittar du" (läst 2026-09-27)
      // KÄLLA: https://www.brattenswardshus.se/restaurang/ — "Vi har även glutenfri pizza"; "Rödspätta, pommes, remouladsås, sallad" (läst 2026-09-27)
      // KÄLLA: https://www.brattenswardshus.se/kontakta-oss/ — "Bratten’s Wärdhus ligger bara några meter från hållplatsen" (läst 2026-09-27)
      { name: 'Bratten\'s Wärdshus', type: 'Restaurang', desc: 'Restaurang och kafé några meter från bryggan Styrsö Bratten. Menyn har räksmörgås och fisk men också pizza och hamburgare.', websiteUrl: 'https://www.brattenswardshus.se/' },
      // KÄLLA: https://tangbaren.se/ — "Belägen på en brygga över havet"; "Flera gånger i veckan lägger fiskebåtar till vid vår brygga"; "Just nu tar vi inga bokningar utan endast drop in" (läst 2026-09-27)
      // KÄLLA: https://www.goteborg.com/platser/tangbaren-styrso/ — "Tångbaren har öppet under sommarsäsongen och arbetar med drop-in" (läst 2026-09-27)
      { name: 'Tångbaren', type: 'Fisk & skaldjur', desc: 'Fisk- och skaldjursrestaurang på en brygga i Tången, med ostronbar och deli. Fiskebåtar levererar till bryggan flera gånger i veckan. Drop-in.', open_season: 'Sommarsäsong', websiteUrl: 'https://tangbaren.se/' },
      // KÄLLA: http://www.batebacken.se/ — "Lokalen har plats för drygt 40 personer"; "uteservering med plats för ytterligare cirka 40 personer" (läst 2026-09-27)
      { name: 'Båtebackens caférestaurang', type: 'Caférestaurang', desc: 'Liten skärgårdskrog vid kajkanten i Tången, med skaldjur, enklare rätter och hembakat. Drygt 40 platser inne och lika många ute.', websiteUrl: 'http://www.batebacken.se/' },
      // KÄLLA: https://www.goteborg.com/guider/guide-ata-och-fika-i-goteborgs-skargard — "Kusthotellet Styrsös restaurang Astri serverar frukost, lunch och middag" (läst 2026-09-27)
      { name: 'Astri, Kusthotellet Styrsö', type: 'Restaurang', desc: 'Hotellets restaurang, med frukost, lunch och middag.', websiteUrl: 'https://kusthotelletstyrso.se/' },
    ],
    tips: [
      // KÄLLA: http://www.batebacken.se/ — "När solen går ner bakom Känsö Torn då vet vi att nu är det högsommar" (läst 2026-09-27)
      'På högsommaren går solen ner bakom Känsö torn sett från kajen i Tången — ta en kvällsbåt och ät vid Båtebacken eller Tångbaren.',
      // KÄLLA: https://www.ica.se/butiker/nara/goteborg/ica-tangen-1003744/ — "ICA Tången"; "Styrsö Hamnväg 30, Styrsö"; "Butiken öppet: Söndag 10 till 18" (läst 2026-09-27)
      'ICA Tången vid Styrsö Hamnväg har öppet alla dagar i veckan och är också apoteksombud — handla proviant där.',
      // KÄLLA: http://www.batebacken.se/ — "Om du väljer att stiga iland på Styrsö Bratten får du en intressant promenad på 1,8 km genom tre av Styrsös fyra samhällen" (läst 2026-09-27)
      'Gå av vid Bratten och promenera till Tången: 1,8 kilometer genom Bratten, kyrkbyn och fiskeläget, och ta båten hem därifrån.',
    ],
    related: ['branno', 'vrango', 'donso'],
    tags: ['göteborg', 'södra skärgård', 'restaurang', 'bilfritt', 'styrsöbolaget', 'fiskeläge'],
    // KÄLLA: https://www.goteborg.com/platser/styrso — "Det äldsta är Byn med kyrkan från 1752" (läst 2026-09-27)
    // KÄLLA: https://www.brattenswardshus.se/historia/ — "Under 1700-talet och tidigt 1800-tal låg här trankokeri och sillsalteri"; "Den kända Madam Öberg"; "1969 eldades hotell, restaurang och en del övrig bebyggelse upp" (läst 2026-09-27)
    // KÄLLA: https://kusthotelletstyrso.se/historia/ — "År 1893 invigdes Styrsö Havsbad" (läst 2026-09-27)
    did_you_know: 'Vid Bratten låg under 1700-talet och tidigt 1800-tal trankokeri och sillsalteri. Madam Öbergs gästgiveri drog sedan hit de första turisterna, 1893 invigdes Styrsö Havsbad, och Bratten blev badort med hotell och restaurang — tills byggnaderna eldades upp 1969. Kyrkan i Byn är från 1752.',
    seasonal: {
      open: 'Hela året',
      peak: 'Juli',
      best: 'Maj–Juni eller September',
      // KÄLLA: https://www.goteborg.com/guider/ta-dig-till-skargarden — "Färjorna går året runt från Saltholmen" (läst 2026-09-27)
      // KÄLLA: https://tangbaren.se/ — "högsäsong (från midsommar till 23 augusti)"; "har vi ett högre tryck i restaurangen" (läst 2026-09-27)
      bestReason: 'Båtarna går året runt och Kusthotellet har öppet året om. Tångbarens högsäsong är midsommar till 23 augusti, då trycket är högst — i maj–juni och september är det lugnare på bryggorna.',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },

  },
  {
    slug: 'vrango',
    name: 'Vrångö',
    region: 'goteborg',
    regionLabel: 'Göteborgs södra skärgård',
    emoji: '🦅',
    // KÄLLA: Göteborg & Co, Vrångö, https://www.goteborg.com/platser/vrango — "fina sandstränder"; "både områdena norr och söder om bebyggelsen är skyddade naturreservat"; lotsutkiken med "panoramavy över bland annat Vinga fyr" (läst 2026-09-21). "Södra skärgårdens yttersta punkt" hade ingen källa.
    tagline: 'Bilfri ö längst ut på båtlinje 281 – sandstränder, naturreservat och lotsutkiken med utsikt mot Vinga.',
    // Omskriven 2026-09-26. Stod "knappt 150 fast bosatta" (Länsstyrelsen: "drygt 350 invånare"), "ingen kommersiell turism … en liten mataffär, ett kafé" (goteborg.com nämner två restauranger, pensionat, hotell, affär, post och kiosk) och "utsikt mot Nordsjön".
    description: [
      // KÄLLA: lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vrangoskargarden-vrango-arkipelagen.html (läst 2026-09-26) — "Vrångö är bebodd med drygt 350 invånare", "Bildat: 1979", "Areal: cirka 5 184 hektar", "Naturvårdsförvaltare: Västkuststiftelsen", "ett av de mest besökta naturreservaten i länet", "Över sextio arter häckar i området", "På reservatets södra skär syns knubbsälar", "betande får"
      'Vrångö har drygt 350 invånare, och stora delar av ön ingår i naturreservatet Vrångöskärgården, bildat 1979 och på omkring 5 184 hektar, som Västkuststiftelsen förvaltar. Enligt Länsstyrelsen är det ett av de mest besökta naturreservaten i länet. Över sextio fågelarter häckar i området, på de södra skären ligger knubbsälar, och på ön betar får för att hålla gamla ängar öppna.',
      // KÄLLA: goteborg.com/platser/vrango (läst 2026-09-26) — "Bebyggelsen sträcker sig som ett bälte tvärs över ön och både områdena norr och söder om bebyggelsen är skyddade naturreservat", "Skärgårdsbåten lägger till i Mittvik, där finns Restaurang Ternan", "en knapp kilometer … stor modern gästhamn med fiskekaj, livsmedelsbutiken Tempo samt Fiskeboa Vrångö Hamnkrogen Lotsen", "post, affär, kiosk, bangolfsbana", "pensionat Solviken eller på Kajkanten", "sedan 1600-talet varit viktig utpost för att lotsa"
      'Bebyggelsen går som ett bälte tvärs över ön, med naturreservat både norr och söder om den. Båten lägger till i Mittvik, där Restaurang Ternan ligger, och en knapp kilometer bort på andra sidan ön finns gästhamnen med fiskekaj, livsmedelsbutiken Tempo och Hamnkrogen Lotsen. Här finns också post, kiosk och bangolf, och den som vill stanna kan bo på pensionat Solviken eller på Kajkanten i sjöbodar vid hamnen.',
      // KÄLLA: goteborg.com/platser/vrango — lotsning "sedan 1600-talet", lotsutkiken med "panoramavy över bland annat Vinga fyr, Öckerööarna och fastlandet"
      'Vrångö har sedan 1600-talet varit en utpost för att lotsa och hjälpa fartyg i nöd. Den gamla lotsutkiken står kvar, med utsikt över bland annat Vinga fyr, Öckerööarna och fastlandet.',
    ],
    facts: {
      travel_time: '20–40 min med båt 281 från Saltholmen · ca 1 h 35 min direkt från Stenpiren',
      character: 'Bebodd, bilfri ö med stort naturreservat och sandstrand',
      season: 'Maj–September',
      best_for: 'Bad, promenadslingor, fågelliv',
    },
    facts_provenance: { travel_time: 'matt', character: 'matt', season: 'bedomning', best_for: 'bedomning' },
    activities: [
      // KÄLLA: lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vrangoskargarden-vrango-arkipelagen.html — "Ta dig förbi Brevik, Bingen och Vättnena i norr, via de lummiga busk- och skogspartierna längs en markerad promenadslinga. Eller gå söderut, förbi Nötholmsviken över den öppna hällmarksljungheden och förbi Store rös, det gamla bronsåldersröset"; "Det finns en fin sandstrand söder om färjeläget"; "Det bästa fisket sägs vara på öns södra sida vid Kungsnabbe och vid Kungsö sund". Stod "ca 6 km runt hela Vrångö" och "klippbad på östra och norra sidan" utan källa.
      { icon: '🚶', name: 'Promenadslingor', desc: 'En markerad slinga går norrut förbi Brevik, Bingen och Vättnena. Söderut går du över hällmarksljungheden förbi Nötholmsviken och bronsåldersröset Store rös.' },
      { icon: '🏊', name: 'Bad', desc: 'Sandstrand söder om färjeläget i Mittvik.' },
      { icon: '🎣', name: 'Fiske', desc: 'Länsstyrelsen skriver att det bästa fisket sägs vara på öns södra sida, vid Kungsnabbe och Kungsö sund.' },
    ],
    accommodation: [],
    getting_there: [
      // KÄLLA: Göteborg & Co, Ta dig till Göteborgs skärgård, https://www.goteborg.com/guider/ta-dig-till-skargarden — "Spårvagn 11, samt linje 9 under sommaren, restid cirka 35 minuter"; "Buss 114, Ö-snabben, restid cirka 25 minuter"; "281, Saltholmen–Köpstadsö–Styrsö Bratten–Donsö–Vrångö"; "för resor till öarna i södra skärgården räcker en biljett för zon A"; "Linje 281 och 282 trafikerar sträckan Stenpiren–Styrsö–Donsö–Vrångö, med en total restid på cirka 1 timme och 35 minuter … två turer per dag måndag till fredag, samt även lördag och söndag under sommaren"; parkering "i områdena Talattagatan och Vikebacken i Långedrag, samt sommartid vid Hinsholmskilen. På Saltholmen finns endast parkering för rörelsehindrade" (läst 2026-09-21). Västtrafik, tidtabell linje 281 Vrångö–Saltholmen 2026-08-24–2026-12-12, https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014528100000/ — Saltholmen 05:09 → Vrångö 05:27, 09:25 → 10:03, 10:53 → 11:28 (läst 2026-09-21). Tidigare stod linje 283 (går till Asperö och Brännö Rödsten, inte Vrångö).
      { method: 'Spårvagn + båt 281', from: 'Göteborg centrum', time: '20–40 min båt', desc: 'Spårvagn 11 (sommartid även 9) till Saltholmen, ungefär 35 minuter, eller buss 114 Ö-snabben, ungefär 25. Därifrån båtlinje 281 via Köpstadsö, Styrsö och Donsö till Vrångö. En biljett för zon A räcker hela vägen.', icon: '⛴' },
      { method: 'Båt direkt från Stenpiren', from: 'Stenpiren, centrala Göteborg', time: 'ca 1 h 35 min', desc: 'Utan byte från city – men bara två turer per dag måndag–fredag, helger bara sommartid.', icon: '⛴' },
      { method: 'Bil till Långedrag', from: 'Göteborg', time: '', desc: 'Öarna är bilfria. Parkera i Långedrag (Talattagatan eller Vikebacken) eller sommartid vid Hinsholmskilen och ta spårvagnen sista biten till Saltholmen – på Saltholmen finns bara parkering för rörelsehindrade.', icon: '🚗' },
    ],
    harbors: [
      // KÄLLA: https://www.goteborg.com/platser/vrango — "en stor modern gästhamn med fiskekaj", "tvärs över ön, en knapp kilometer från båtens tilläggsplats", "livsmedelsbutiken Tempo vid hamnen". Service ej belagd (vrangogasthamn.se svarade inte).
      { name: 'Vrångö Gästhamn', desc: 'Stor modern gästhamn med fiskekaj, tvärs över ön från färjeläget. Livsmedelsbutik vid hamnen.', fuel: false, service: [] },
    ],
    restaurants: [
      // KÄLLA: https://www.goteborg.com/platser/vrango — namnger "Restaurang Ternan" (vid Mittvik) och "Fiskeboa Vrångö Hamnkrogen Lotsen" (vid hamnen)
      { name: 'Restaurang Ternan', type: 'Restaurang', desc: 'Restaurang vid Mittvik på Vrångö.' },
      { name: 'Fiskeboa Vrångö Hamnkrogen Lotsen', type: 'Restaurang', desc: 'Hamnkrog vid Vrångö hamn.' },
    ],
    tips: [
      // KÄLLA: lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vrangoskargarden-vrango-arkipelagen.html — föreskrifter: inte "campa", "medföra okopplad hund", "elda annat än på plats som förvaltaren anordnat"; "skyddade områden för säl och fågel med landstigningsförbud i delar av skärgården"; "vissa tider om året får du inte gå iland". Stod "vanligen någon gång mellan 1 februari och 31 augusti" utan källa.
      'I naturreservatet får du inte campa, hunden ska vara kopplad och eld får bara göras på iordningställda platser.',
      'Delar av skärgården runt Vrångö är skyddade för säl och fågel med landstigningsförbud vissa tider på året – se skyltarna om du kommer med egen båt.',
    ],
    related: ['branno', 'styrso', 'asperon'],
    tags: ['göteborg', 'södra skärgård', 'naturreservat', 'bilfritt', 'fågelliv', 'ytterst'],
    // KÄLLA: lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vrangoskargarden-vrango-arkipelagen.html — klapperstensfälten "spår efter landisens avsmältning för ungefär 12 000 år sedan, då Vrångö täcktes av havet". Stod "riksintresse … skarvar, ejdrar och tärnor" utan källa.
    did_you_know: 'Klapperstensfälten på Vrångö är spår efter inlandsisens avsmältning för ungefär 12 000 år sedan, då ön täcktes av havet.',
    // seasonal borttaget 2026-09-26: fågelskyddsdatum, "cafét är bara öppet sommartid" och stängt oktober–april stod utan källa. Ön är bebodd och båt 281 går året runt (se getting_there).
  },
  {
    slug: 'donso',
    name: 'Donsö',
    region: 'goteborg',
    regionLabel: 'Göteborgs södra skärgård',
    emoji: '⚓',
    tagline: 'Rederiornas ö — ett litet samhälle med stor historia inom sjöfart och en av Göteborgs finaste hamnar.',
    description: [
      'Donsö är känt som "rederiornas ö". Trots att bara 1 500 personer bor här äger donsöborna en oproportionerligt stor del av den svenska handelsflottan — en tradition som går tillbaka till 1800-talets segelsjöfart. Sjöfartshistorien är inbäddad i öns DNA.',
      'I praktiken är Donsö ett välordnat, välmående ösamhälle med bred service: mataffär, restaurang, bensinmack och en av södra skärgårdens bästa gästhamnar. Perfekt för seglare längs Bohuslänskusten.',
      'Ön är bilfri (för besökare). Invånarna kör moped och elcykel. Det ger ett lugn som gör det lätt att förstå varför folk väljer att bo här.',
    ],
    facts: {
      travel_time: '~25–38 min med Styrsöbolaget från Saltholmen (linje 281)',
      character: 'Välordnat, maritim historia, praktisk, bilfritt',
      season: 'Hela året (gästhamnen: maj–sept)',
      best_for: 'Seglare, maritimintresserade, barnfamiljer',
    },
    activities: [
      { icon: '⚓', name: 'Maritim historia', desc: 'Vandra bland de storslagna villorna längs hamnpromenaden — byggda av sjökaptensfamiljer på 1800-talet.' },
      { icon: '⛵', name: 'Gästhamn', desc: 'En av södra skärgårdens mest välservicerade gästhamnar med fuel, el och vatten.' },
      { icon: '🏖', name: 'Bad', desc: 'Badplatser på östra sidan av ön med klart vatten och klippor.' },
    ],
    accommodation: [
      { name: 'Donsö Gästhem', type: 'Vandrarhem', desc: 'Enkelt boende nära hamnen. Sommarsäsong.' },
    ],
    getting_there: [
      { method: 'Spårvagn + Styrsöbolaget-färja', from: 'Göteborg C', time: '60 min totalt', desc: 'Spårvagn 11 till Saltholmen, sedan Styrsöbolagets linje 281 via Köpstadsö till Donsö (35–40 min).', icon: '🚋' },
    ],
    harbors: [
      // KÄLLA: https://donsohamn.se/ — "inklusive el, vatten, dusch och toalett", "internet via hamnens wifi", tvättmaskin, "Istappen, sjömack", "Restaurang Isbolaget", säsong 1 maj–30 sept
      { name: 'Donsö Gästhamn', desc: 'Gästhamn i Donsö fiskehamn. El, vatten, dusch, wifi, tvättmaskin och sjömack. Restaurang Isbolaget i hamnen.', fuel: true, service: ['el', 'vatten', 'dusch', 'wifi', 'tvätt', 'bränsle'] },
    ],
    restaurants: [
      // KÄLLA: https://www.goteborg.com/platser/isbolaget-donso — "längst ut på piren i Donsö hamn", gammalt ismagasin; isbolaget.com — öppettider v 37–38 2026
      { name: 'Isbolaget', type: 'Restaurang', desc: 'Restaurang och hotell i det gamla ismagasinet längst ut på piren i Donsö hamn.', websiteUrl: 'https://isbolaget.com/' },
    ],
    tips: [
      'Donsö hamn har bränsle — ovanligt i södra skärgården. Planera bunkringen hit om du seglar söderut.',
      'Gå längs hamnpromenaden och titta på de gamla kaptensfamiljernas villor — arkitektonisk historia.',
      'Mataffären är välsorterad — handla proviant inför norrlandsskärgårdens glapp.',
    ],
    related: ['branno', 'styrso', 'asperon'],
    tags: ['göteborg', 'södra skärgård', 'sjöfart', 'gästhamn', 'bilfritt', 'styrsöbolaget'],
    did_you_know: 'Donsöborna äger rederiflottor värderade till miljarder kronor. Ön producerade per capita fler sjökaptener än något annat samhälle i Sverige under 1900-talets första hälft.',
    seasonal: {
      open: 'Hela året',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Donsö har service året runt tack vare den fasta befolkningen. Juni och september ger lugnet och gästhamnens platser utan högsäsongens köer.',
      warning: 'Gästhamnen tar fullt upp i juli — boka i god tid eller kom tidigt på morgonen för att säkra en plats. Bränsle finns hela sommarsäsongen.',
      months: ['limited','limited','limited','limited','open','open','peak','peak','open','open','limited','limited'],
    },
  },
  {
    slug: 'asperon',
    name: 'Asperön',
    region: 'goteborg',
    regionLabel: 'Göteborgs södra skärgård',
    emoji: '🌊',
    tagline: 'Göteborgs södra skärgårds stillaste ö — inga bilar, ingen brådska, bara klippor och hav.',
    description: [
      'Asperön är den minsta av de bebodda öarna i södra skärgården, med ett hundratal fast bosatta. Det är öns lugn och enkelhet som lockar: inga bilar, inga turistmassor, ingen affär att tala om.',
      'Ön passar perfekt som ett steg i en längre skärgårdsdag — du tar färjan via Brännö eller Styrsö och stannar ett par timmar för att promenera, bada och ta in tystnaden. Eller stannar du längre än du planerat.',
      'Klipporna på östra sidan med utsikten mot Vrångö och ytterhavet är Asperöns bästa sida.',
    ],
    facts: {
      travel_time: '~10 min med Styrsöbolaget från Saltholmen (linje 282, Asperö Östra)',
      character: 'Stilla, litet, okommersiellt, bilfritt',
      season: 'Maj–September',
      best_for: 'De som söker lugn, dagsturer i kombination med Brännö/Styrsö',
    },
    activities: [
      { icon: '🌊', name: 'Klippbad', desc: 'Klart vatten och klippor på östra sidan. Lugnt och oavbrutet.' },
      { icon: '🚶', name: 'Promenad runt ön', desc: 'En rund tur tar ca 45 minuter. Lätt vandring med vacker utsikt.' },
    ],
    accommodation: [],
    getting_there: [
      { method: 'Spårvagn + Styrsöbolaget-färja', from: 'Göteborg C', time: '50 min totalt', desc: 'Spårvagn 11 till Saltholmen, sedan Styrsöbolagets linje 282 till Asperö Östra (~6–10 min) eller linje 283 till Asperö Norra (~14 min).', icon: '🚋' },
    ],
    harbors: [],
    restaurants: [],
    tips: [
      'Ta med all mat och dryck — det finns ingen service på ön.',
      'Kombinera gärna med Brännö under samma dag — de ligger nära varandra.',
      'Perfekt för barnfamiljer: liten, säker och promenadvänlig.',
    ],
    related: ['branno', 'styrso', 'vrango', 'donso'],
    tags: ['göteborg', 'södra skärgård', 'bilfritt', 'lugnt', 'styrsöbolaget', 'klippbad'],
    did_you_know: 'Asperön är en av de öar som historiskt hörde till Styrsö socken och ingick i det fiskelägessystem som försörjde Göteborg med fisk under 1700- och 1800-talen.',
  },
  // ─── YTTRE GÅRDEN ────────────────────────────────────────────
  {
    slug: 'yttre-garden',
    name: 'Yttre Gården',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🪨',
    // KÄLLA: https://www.naturvardsverket.se/4a622a/contentassets/66a1a996e37b4ecd872d9df8b73a4387/statlig-skog-skyddsvarda-stockholm-objekt.pdf — "Området utgör den södra halvan av ön Yttre Gården som ligger ca två km sydost om Nynäshamn."; "Hällmarkspartierna är bevuxna med gammal tallskog."; "Det är såväl sandtstränder som klapperstensstränder omväxlande med klippstränder." (PDF, objekt 3706, s. 1) (läst 2026-09-27)
    tagline: 'Skyddsvärd statlig skog två kilometer sydost om Nynäshamn — gammal tallskog och sand-, klapper- och klippstränder.',
    lat: 58.895,
    lng: 17.925,
    description: [
      // KÄLLA: https://www.naturvardsverket.se/4a622a/contentassets/66a1a996e37b4ecd872d9df8b73a4387/statlig-skog-skyddsvarda-stockholm-objekt.pdf — "3706 Yttre Gården"; "Området utgör den södra halvan av ön Yttre Gården som ligger ca två km sydost om Nynäshamn."; "Fortifikationsverket"; "Totalareal … 56 ha"; "Areal land … 41 ha"; "Areal vatten … 14 ha" (PDF, s. 1) (läst 2026-09-27)
      // KÄLLA: https://www.naturvardsverket.se/vagledning-och-stod/skyddad-natur/skyddsvarda-statliga-skogar/ — "Det pågår ett arbete att ge skyddsvärda statliga ägda skogar formellt skydd."; "inventeringar som Naturvårdsverket och länsstyrelserna redovisade 2004" (läst 2026-09-27)
      // KÄLLA: https://www.fortifikationsverket.se/om-oss/vart-uppdrag — "Det gör vi genom att äga, utveckla och förvalta landets försvarsfastigheter." (läst 2026-09-27)
      'Yttre Gården är en ö i Nynäshamns kommun, ungefär två kilometer sydost om Nynäshamn. Södra halvan av ön finns med som objekt 3706 i den inventering av skyddsvärda statliga skogar som Naturvårdsverket och länsstyrelserna redovisade 2004. Det utpekade området är 56 hektar, varav 41 hektar land och 14 hektar vatten. Marken ägs av Fortifikationsverket, som äger och förvaltar landets försvarsfastigheter.',
      // KÄLLA: https://www.naturvardsverket.se/4a622a/contentassets/66a1a996e37b4ecd872d9df8b73a4387/statlig-skog-skyddsvarda-stockholm-objekt.pdf — "Det utgörs av ett sprickdalslandskap bestående av hällmarkspartier avbrutna av mer låglänt terräng."; "Hällmarkspartierna är bevuxna med gammal tallskog."; "I väster är det relativt brant med hällmarkstallskog ned mot vattnet."; "I öster är det inte lika brant utan det sluttar ned mot havet."; "gammal gles tallskog med inslag av torrakor på sandigt underlag i de flackare delarna mot stränderna i öster" (PDF, s. 1) (läst 2026-09-27)
      'Landskapet är ett sprickdalslandskap, där hällmarker med gammal tallskog bryts av lägre terräng. Västsidan är relativt brant ner mot vattnet. Östsidan sluttar i stället ner mot havet, och närmast stränderna växer gles gammal tallskog med torrakor på sandig mark.',
      // KÄLLA: https://www.naturvardsverket.se/4a622a/contentassets/66a1a996e37b4ecd872d9df8b73a4387/statlig-skog-skyddsvarda-stockholm-objekt.pdf — "Det är såväl sandtstränder som klapperstensstränder omväxlande med klippstränder."; "Här finns också en havsstrandäng bevuxen med rödsäv."; "På klapperstensstränderna förekommer tydliga strandvallar."; "På den sydvästra delen av ön finns ett tombolaliknande sandparti med en klipphäll ytterst. Detta parti utnyttjas flitigt av båtburna gäster. Så är även fallet med stränderna på den östra sidan av ön." (PDF, s. 1) (läst 2026-09-27)
      'Stränderna växlar mellan sand, klappersten och klipphällar. Det finns också en havsstrandäng med rödsäv, och på klapperstensstränderna syns tydliga strandvallar. Längst i sydväst ligger ett sandparti, format ungefär som en tombolo, med en klipphäll ytterst. Enligt objektbladet används det flitigt av båtburna gäster, och det gör även stränderna på östsidan.',
      // KÄLLA: https://www.naturvardsverket.se/4a622a/contentassets/66a1a996e37b4ecd872d9df8b73a4387/statlig-skog-skyddsvarda-stockholm-objekt.pdf — "Ett parti med lövskog sträcker sig från den västra stranden, ungefär mitt på ön, nedanför en brant, i nordostlig riktning in mot mitten av ön."; "I den sydvästra delen består lövskogen av gamla ekar med inslag av eklågor samt död ved av främst gran."; "Av karta från 1800-talets slut framgår att denna del även då var lövträdsdominerad."; "I den nordöstra delen övergår lövskogen till en ungskog dominerad av björk och asp."; "en del mindre avverkningar har gjorts i anslutning till militära anläggningar som numer är rivna"; "Rödlistade arter noterade för området är stor klipptuss och mindre hackspett." (PDF, s. 1) (läst 2026-09-27)
      'Ett stråk av lövskog går från västra stranden in mot öns mitt. I sydväst står gamla ekar med döda ekstammar och död granved på marken, och redan på en karta från slutet av 1800-talet var den delen lövträdsdominerad. Längre åt nordost tar ungskog av björk och asp över. På det högre partiet mitt på ön har det avverkats i anslutning till militära anläggningar som numera är rivna. De rödlistade arter som noterats i området är mossan stor klipptuss och fågeln mindre hackspett.',
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ — "Låna en brygga tillfälligt eller hitta en strand, som ligger utanför någons tomt."; "Förtöj och övernatta något dygn i din båt." (läst 2026-09-27)
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/samhalle/sakerhet-och-beredskap/skyddsobjekt.html — "Ett beslut om skyddsobjekt innebär att obehöriga inte har tillträde till skyddsobjektet"; "Ett skyddsobjekt är vanligtvis utmärkt med gula skyltar."; "förbud mot att bada, dyka, ankra eller fiska" (läst 2026-09-27)
      'Vi har inte hittat något beslut om naturreservat för Yttre Gården hos Länsstyrelsen i Stockholm, och inga publicerade förbud för ön. Därför gäller allemansrätten: du får lägga till vid en strand utanför någons tomt och övernatta något dygn i båten. Eftersom Fortifikationsverket äger marken är det ändå värt att hålla utkik efter gula skyltar. Ett skyddsobjekt är vanligtvis utmärkt så, och där har obehöriga inte tillträde eller så gäller förbud mot att bada, dyka, ankra eller fiska.',
    ],
    facts: {
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/turbatar — "Waxholmsbolaget (båt till Nåttarö, Aspö, Rånö, Ålö och Landsort)" (läst 2026-09-27)
      // KÄLLA: https://www.naturvardsverket.se/4a622a/contentassets/66a1a996e37b4ecd872d9df8b73a4387/statlig-skog-skyddsvarda-stockholm-objekt.pdf — "som ligger ca två km sydost om Nynäshamn"; "Särskild betydelse för friluftsliv"; "Området är även viktigt för det båtburna friluftslivet, bland annat genom sitt läge nära Nynäshamn." (PDF, s. 1–2) (läst 2026-09-27)
      travel_time: 'Ingen reguljär båt – egen båt eller kajak, ca 2 km sydost om Nynäshamn',
      character: 'Skyddsvärd statlig skog, gammal tallskog, sand- och klippstränder',
      season: 'Ingen säsong att planera efter – ingen reguljär trafik eller service hittad',
      best_for: 'Båtfolk och paddlare från Nynäshamn',
    },
    activities: [
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/ — "Du får bada vid stränder, paddla kajak och åka båt." (läst 2026-09-27)
      // KÄLLA: https://www.kayakomat.com/sv/location/62b4ecb11cfae6aacec5e0ef — "KAYAKOMAT Nynäshamn Nickstabadet"; "Kajak och SUP-uthyrning via self service"; "Flytväst ingår"; "Uthyrning för korta utflykter på två timmar, upp till flera dagars äventyr." (läst 2026-09-27)
      { icon: '🛶', name: 'Kajakpaddling', desc: 'Allemansrätten låter dig paddla, lägga till och bada. Ön ligger ungefär två kilometer sydost om Nynäshamn, där Kayakomat vid Nickstabadet hyr ut kajaker och SUP-brädor med självbetjäning. Flytväst ingår, och du kan hyra från två timmar upp till flera dagar.' },
      // KÄLLA: https://www.naturvardsverket.se/4a622a/contentassets/66a1a996e37b4ecd872d9df8b73a4387/statlig-skog-skyddsvarda-stockholm-objekt.pdf — "På den sydvästra delen av ön finns ett tombolaliknande sandparti med en klipphäll ytterst."; "Det är såväl sandtstränder som klapperstensstränder omväxlande med klippstränder." (PDF, s. 1) (läst 2026-09-27)
      { icon: '🏊', name: 'Bad', desc: 'Stränderna växlar mellan sand, klappersten och klipphällar. Båtfolk använder särskilt sandpartiet med klipphällen ytterst i sydväst och stränderna på östsidan.' },
      // KÄLLA: https://www.naturvardsverket.se/4a622a/contentassets/66a1a996e37b4ecd872d9df8b73a4387/statlig-skog-skyddsvarda-stockholm-objekt.pdf — "Hällmarkspartierna är bevuxna med gammal tallskog."; "Sydost om Ådhällan finns en västvänd klippbrant."; "Här har vid tidigare inventeringar gjorts fynd av den ovanliga mossan stor klipptuss."; "Rödlistade arter noterade för området är stor klipptuss och mindre hackspett." (PDF, s. 1) (läst 2026-09-27)
      { icon: '🌲', name: 'Gammal tallskog', desc: 'Hällmarkerna är bevuxna med gammal tallskog. Vid en västvänd klippbrant sydost om Ådhällan har inventerare hittat den ovanliga mossan stor klipptuss, och den rödlistade fågeln mindre hackspett är noterad i området.' },
      // KÄLLA: https://www.naturvardsverket.se/4a622a/contentassets/66a1a996e37b4ecd872d9df8b73a4387/statlig-skog-skyddsvarda-stockholm-objekt.pdf — "Av karta från 1800-talets slut framgår att denna del även då var lövträdsdominerad."; "Ett brandljud … i en torr gammal tall påträffades som vittnar om att minst två bränder inträffat i området."; "militära anläggningar som numer är rivna" (PDF, s. 1) (läst 2026-09-27)
      { icon: '🏛', name: 'Spår i landskapet', desc: 'Ekskogen i sydväst var lövträdsdominerad redan på en karta från slutet av 1800-talet. En torr gammal tall bär brandljud efter minst två bränder, och mitt på ön har det funnits militära anläggningar som numera är rivna.' },
    ],
    accommodation: [
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/ — "Du får tälta något enstaka dygn i naturen"; "allemansrätten ger dig ingen självklar rätt att elda. Du har ansvar för att elda på ett säkert sätt, utan att riskera att elden sprider sig" (läst 2026-09-27)
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ — "Förtöj och övernatta något dygn i din båt."; "Ta med dig en påse som du kan samla skräp och matrester i för att ta med hem eller slänga i en papperskorg." (läst 2026-09-27)
      { name: 'Tältning (allemansrätten)', type: 'Camping', desc: 'Du får tälta något enstaka dygn i naturen, och kommer du med båt får du förtöja och övernatta något dygn i den. Vi har inte hittat någon service på ön, så ta med allt du behöver och en påse för skräp och matrester. Allemansrätten ger ingen självklar rätt att elda, och du ansvarar för att elden inte sprider sig.' },
    ],
    getting_there: [
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/surfa-och-paddla — "Hyr en egen kajak eller kom med på en guidad tur. Glöm inte flytvästen bara!" (läst 2026-09-27)
      // KÄLLA: https://www.kayakomat.com/sv/location/62b4ecb11cfae6aacec5e0ef — "KAYAKOMAT Nynäshamn Nickstabadet"; "Flytväst ingår" (läst 2026-09-27)
      // KÄLLA: https://www.sjofartsverket.se/sv/om-oss/nyheter-och-press/nyheter/sjosakerhetstips/ — "Flytväst är den enskilt viktigaste åtgärden för att hålla sig säker till sjöss."; "En av de stora olycksorsakerna till sjöss är snabba väderomslag." (läst 2026-09-27)
      { method: 'Kajak', from: 'Nynäshamn', desc: 'Ön ligger ungefär två kilometer sydost om Nynäshamn. Nynäshamns kommun listar kajakuthyrning och guidade turer, bland annat Kayakomat vid Nickstabadet där flytväst ingår. Kolla vädret innan du ger dig ut: snabba väderomslag är enligt Sjöfartsverket en av de stora olycksorsakerna till sjöss.', icon: '🛶' },
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/batliv — "De cirka 300 båtplatserna ligger väl skyddade"; "Nynäshamns Gästhamn ligger centralt belägen i stadens fiskehamn"; "I fiskehamnen kan du även enkelt tanka din båt på Nynäshamns enda sjömack"; "I Nynäshamns gästhamn finns möjlighet att hyra mindre motorbåtar" (läst 2026-09-27)
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ — "Låna en brygga tillfälligt eller hitta en strand, som ligger utanför någons tomt." (läst 2026-09-27)
      { method: 'Egen eller hyrd båt', from: 'Nynäshamns gästhamn', desc: 'Gästhamnen ligger i stadens fiskehamn och har cirka 300 båtplatser. Där finns Nynäshamns enda sjömack, och i gästhamnen går det att hyra mindre motorbåtar. Vi har inte hittat någon brygga på Yttre Gården; enligt allemansrätten får du lägga till vid en strand utanför någons tomt.', icon: '⛵' },
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/turbatar — "Waxholmsbolaget (båt till Nåttarö, Aspö, Rånö, Ålö och Landsort)"; "Vid Fiskehamnen i Nynäshamn, nära parkeringsplatser och kollektivtrafik, finner du Waxholmsbolagets båtar" (läst 2026-09-27)
      { method: 'Ingen reguljär båt', from: 'Nynäshamns fiskehamn', desc: 'Nynäshamns kommun listar Waxholmsbolagets båtar från fiskehamnen till Nåttarö, Aspö, Rånö, Ålö och Landsort, men inte till Yttre Gården. Utan egen eller hyrd båt kan du i stället åka med tidtabell till till exempel Nåttarö eller Landsort.', icon: '⛴' },
    ],
    harbors: [],
    restaurants: [],
    tips: [
      // KÄLLA: https://www.naturvardsverket.se/vagledning-och-stod/skyddad-natur/skyddsvarda-statliga-skogar/ — "Det pågår ett arbete att ge skyddsvärda statliga ägda skogar formellt skydd." (läst 2026-09-27)
      'Kontrollera Naturvårdsverkets karta Skyddad natur före besöket. Vi har inte hittat något reservatsbeslut, men arbete pågår med att ge skyddsvärda statliga skogar formellt skydd.',
      // KÄLLA: https://nynashamn.se/uppleva/skargard--batliv/turbatar — "Waxholmsbolaget (båt till Nåttarö, Aspö, Rånö, Ålö och Landsort)" (läst 2026-09-27)
      'Ingen reguljär båt går hit, och vi har inte hittat någon service på ön. Ta med mat, vatten och det du behöver för dagen.',
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ — "Håll avstånd till häckande fåglar."; "Använd en hink med tättslutande lock om båten saknar toalett med avloppstank." (läst 2026-09-27)
      // KÄLLA: https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/hundar-i-naturen/ — "Koppla hunden när vilda djur har ungar, 1 mars–20 augusti." (läst 2026-09-27)
      'Håll avstånd till häckande fåglar och koppla hunden 1 mars–20 augusti. Saknar båten toalett med avloppstank, använd en hink med tättslutande lock.',
      // KÄLLA: https://www.sjofartsverket.se/sv/om-oss/nyheter-och-press/nyheter/sjosakerhetstips/ — "112 från mobilen, kanal 16 på VHF-radion. Skydda mobilen från vatten."; "Se därför alltid till att ha uppdaterade sjökort, både i pappersformat och digitalt."; "Meddela anhöriga dina planer och håll dem underrättade om förändringar i din planerade rutt." (läst 2026-09-27)
      'Ha uppdaterade sjökort, på papper och digitalt, och berätta för någon var du ska. Larma på 112 från mobilen eller kanal 16 på VHF-radion, och skydda mobilen från vatten.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/natur-och-landsbygd/om-eldningsforbud.html — "Länsstyrelsen har rätt att besluta om eldningsförbud utifrån lagen om skydd mot olyckor när det råder stor risk för brand i skog och mark."; "Beslut om lokala eldningsförbud hittar du på din kommuns webbplats." (läst 2026-09-27)
      'Ska du elda, kolla först om det råder eldningsförbud. Länsstyrelsen beslutar om förbud i länet när brandrisken är stor, och lokala förbud står på Nynäshamns kommuns webbplats.',
    ],
    related: ['landsort', 'nattaro', 'uto'],
    tags: ['skyddsvärd natur', 'kajak', 'södra', 'nynäshamn', 'sandstrand', 'tallskog'],
    // KÄLLA: https://www.naturvardsverket.se/4a622a/contentassets/66a1a996e37b4ecd872d9df8b73a4387/statlig-skog-skyddsvarda-stockholm-objekt.pdf — "Ett brandljud … i en torr gammal tall påträffades som vittnar om att minst två bränder inträffat i området."; "Av karta från 1800-talets slut framgår att denna del även då var lövträdsdominerad." (PDF, s. 1) (läst 2026-09-27)
    did_you_know: 'I en torr gammal tall på Yttre Gården finns brandljud, ärr som visar att det har brunnit i området minst två gånger. Ekskogen i sydväst är också gammal: den var lövträdsdominerad redan på en karta från slutet av 1800-talet.',
    insiderTips: [
      // KÄLLA: https://www.naturvardsverket.se/4a622a/contentassets/66a1a996e37b4ecd872d9df8b73a4387/statlig-skog-skyddsvarda-stockholm-objekt.pdf — "På den sydvästra delen av ön finns ett tombolaliknande sandparti med en klipphäll ytterst. Detta parti utnyttjas flitigt av båtburna gäster." (PDF, s. 1) (läst 2026-09-27)
      'Det mest använda läget är sandpartiet i sydväst, med en klipphäll ytterst. Enligt objektbladet utnyttjas det flitigt av båtburna gäster, liksom stränderna på östsidan.',
      // KÄLLA: https://www.naturvardsverket.se/4a622a/contentassets/66a1a996e37b4ecd872d9df8b73a4387/statlig-skog-skyddsvarda-stockholm-objekt.pdf — "I väster är det relativt brant med hällmarkstallskog ned mot vattnet."; "I öster är det inte lika brant utan det sluttar ned mot havet." (PDF, s. 1) (läst 2026-09-27)
      'Västsidan är relativt brant ner mot vattnet, medan östsidan sluttar ner mot havet. Vill du kliva i land på en flackare strand är östsidan närmast till hands.',
      // KÄLLA: https://www.naturvardsverket.se/4a622a/contentassets/66a1a996e37b4ecd872d9df8b73a4387/statlig-skog-skyddsvarda-stockholm-objekt.pdf — "Här finns också en havsstrandäng bevuxen med rödsäv."; "På klapperstensstränderna förekommer tydliga strandvallar."; "Sydost om Ådhällan finns en västvänd klippbrant." (PDF, s. 1) (läst 2026-09-27)
      'Titta efter strandvallarna på klapperstensstränderna och havsstrandängen med rödsäv. Sydost om Ådhällan finns en västvänd klippbrant där den ovanliga mossan stor klipptuss har hittats.',
      // KÄLLA: https://www.lansstyrelsen.se/stockholm/samhalle/sakerhet-och-beredskap/skyddsobjekt.html — "Ett skyddsobjekt är vanligtvis utmärkt med gula skyltar."; "förbud mot att bada, dyka, ankra eller fiska" (läst 2026-09-27)
      'Marken ägs av Fortifikationsverket. Vi har inte hittat några tillträdesförbud här, men följ skyltningen på plats: skyddsobjekt märks vanligtvis ut med gula skyltar.',
    ],
    // transport_meta borttagen 2026-09-27: ingen reguljär trafik (Nynäshamns kommun, Turbåtar) och ingen källa för 90 respektive 40 minuter. Fältet är valfritt; sidorna hanterar att det saknas (som för Askö).
    activity_meta: {
      // UPPSKATTNING: svårighetsgrad medel eftersom turen går över öppet vatten utanför Nynäshamn och ingen skyddad led är belagd.
      // KÄLLA: https://www.kayakomat.com/sv/location/62b4ecb11cfae6aacec5e0ef — "KAYAKOMAT Nynäshamn Nickstabadet"; "Kajak och SUP-uthyrning via self service" (läst 2026-09-27)
      kajak: { difficulty: 'medel', rental: false, notes: 'Ingen uthyrning på ön. Kayakomat vid Nickstabadet i Nynäshamn hyr ut kajak och SUP; ön ligger ca 2 km sydost om Nynäshamn.' },
      // KÄLLA: https://www.naturvardsverket.se/4a622a/contentassets/66a1a996e37b4ecd872d9df8b73a4387/statlig-skog-skyddsvarda-stockholm-objekt.pdf — "På den sydvästra delen av ön finns ett tombolaliknande sandparti med en klipphäll ytterst."; "Så är även fallet med stränderna på den östra sidan av ön." (PDF, s. 1) (läst 2026-09-27)
      bad: { beaches: ['Sandpartiet med klipphäll i sydväst', 'Stränderna på östsidan (sand, klappersten och klipp)'] },
      fiske: false,
    },
    amenities: {
      toilets: false,
      shower: false,
      cafe: false,
      grocery: false,
    },
  },


  // ─── TYNNINGÖ ────────────────────────────────────────────────────────────
  {
    slug: 'tynningo',
    name: 'Tynningö',
    region: 'norra',
    emoji: '🌿',
    tagline: 'Sommarvillornas ö mellan Vaxholm och Värmdö – klippor, en insjö att bada i och två vägar dit.',
    seoTitle: 'Tynningö – färja, badplats & sommarvillornas ö',
    seoDescription: 'Tynningö nära Vaxholm: Waxholmsbåt eller avgiftsfri vägfärja från Lagnö, badplatsen Myrholmsmaren vid insjön Stora Maren, Tynningö klack och villorna från ångbåtstiden.',
    // Ifylld 2026-09-21 efter Toms beslut "fyll ut med belagt innehåll". Huvudkälla: Vaxholms stads "Kulturmiljöunderlag och landskapsanalys, Tynningö" (Sweco för Vaxholms stad, slutversion 2020-04-24), https://www.vaxholm.se/download/18.7540ce651827e350272a8e08/1661434105419/Bilaga%203%20-%20Kulturmilj%C3%B6underlag%20o%20.pdf — läst 2026-09-21. Restaurang/affär: sökt, ingen operatörssida hittad — står därför inte här.
    description: [
      // KÄLLA: Vaxholms stad, Kulturmiljöunderlag Tynningö 2020, faktaruta s. 5: "Areal: cirka 441 hektar. Tynningö klack ligger ca 50 meter över havet. Sammanhängande sötvattensjö (Maren, Myrholmsmaren, Lilla Maren …) cirka 1500 m lång och 100 m bred. Tynningö sträcker ut sig närmare 6 km i nordväst-sydöst riktning mellan Vaxholm och Värmdö. Vegetation … hälltallskog med mellanliggande lersvackor med stråk av örtrik skog och alkärr."
      'Tynningö sträcker sig närmare sex kilometer mellan Vaxholm och Värmdö, mitt i inloppet till Stockholm. Ön är omkring 441 hektar med hälltallskog på höjderna och lövskog i svackorna, och tvärs igenom den ligger en sammanhängande insjö, Maren, ungefär en och en halv kilometer lång. Från Tynningö klack, öns högsta punkt cirka 50 meter över havet, ser du ut över farleden.',
      // KÄLLA: samma rapport, kap. 06 Historik "Sommarvillor och ångbåtstrafik": Höganäs (Fyrkanten) köpt 1874 av snickarmästare Munthe, ångbåtstrafik till Höganäs 1877, Östra Tynningö reguljärtrafik 1875, "Som mest hade Tynningö ett tjugotal samtidigt trafikerade bryggor"; kap. 03: "sommarvillor uppförda 1870–1920 … Två bryggor är fortfarande i bruk"; kap. 02: "Tynningö norra delar ligger inom riksintresse för kulturmiljövården Norra Boo - Vaxholm - Oxdjupet - Lindalssundet [AB 51, 58]"
      'Det som ger ön dess karaktär är sommarvillorna. När Höganäs styckades upp 1874 och ångbåtarna började gå 1877 byggdes påkostade villor på klippor och strandtomter runt hela ön – som mest hade Tynningö ett tjugotal ångbåtsbryggor i trafik samtidigt. Villorna från 1870–1920 står till stor del kvar, och öns norra del ingår i riksintresset för kulturmiljövården längs inloppet till Stockholm.',
      // KÄLLA: samma rapport, kap. 05 Nuläge: "Många av de målpunkter som finns på ön vänder sig främst till de boende och inte till turister"; "strandlinjen är i huvudsak privatiserad"; "det finns få allmänna platser att lägga till sin båt eller bada". Vaxholms stad, badplatser, https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser — "Badet Myrholmsmaren ligger vid sjön Stora Maren … sköts av Tynningö Idrottsförening" (läst 2026-09-21)
      'Räkna med en ö för dem som bor här snarare än för turister: strandlinjen är till största delen privat och det finns få allmänna platser att lägga till eller bada – det konstaterar Vaxholms stads egen landskapsanalys. Öns allmänna badplats, Myrholmsmaren, ligger i stället inne på ön vid insjön Stora Maren. Affär eller krog har vi inte kunnat belägga hos någon källa vi litar på, så ta med det du behöver.',
    ],
    facts: {
      season: 'Juni–Augusti',
      travel_time: 'ca 1–1,25 h med Waxholmsbåt (linje 4) från Strömkajen; vägfärja från Lagnö',
      character: 'Sommarvillor från 1870–1920, hälltallskog, insjöbad',
      best_for: 'Halvdagstur från Vaxholm, bad i sötvatten, utsikt från Tynningö klack',
    },
    facts_provenance: { travel_time: 'matt', character: 'matt', season: 'bedomning', best_for: 'bedomning' },
    activities: [
      // KÄLLA: Vaxholms stad, badplatser (länk ovan): "Badet Myrholmsmaren ligger vid sjön Stora Maren. Badplatsen sköts av Tynningö Idrottsförening som också anordnar simskola varje sommar. Sandstrand, Bryggor, Grillplats med fasta bänkar och lösa bord, Omklädningshytt, Baja-maja under badsäsong". Havs- och vattenmyndigheten, https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-vaxholms-stad/tynningo-myrholmsmaren.html — provsvar 2026-07-20 Tjänligt, Ingen blomning (läst 2026-09-21)
      { icon: '🏊', name: 'Bada i Myrholmsmaren', desc: 'Kommunal badplats vid insjön Stora Maren mitt på ön: sandstrand, bryggor, grillplats med bänkar och omklädningshytt. Tynningö IF sköter badet och håller simskola varje sommar. Kommunen provtar vattnet under badsäsongen och provsvaren finns hos Havs- och vattenmyndigheten.' },
      // KÄLLA: Kulturmiljöunderlag Tynningö 2020, kap. 06: "närliggande höjden Tynningö klack där det troligen funnit en vårdkase vilken tjänade som varningssystem när fiendeflotta kom seglande. Systemet med vårdkasar var i fullt bruk till 1700-talet"; kap. 05: "Öns högsta punkter, där i bland Tynningö klack, ger god utblick"
      { icon: '⛰', name: 'Tynningö klack', desc: 'Öns högsta punkt, omkring 50 meter över havet, med utblick över farleden. Här stod troligen en vårdkase som varnade när fientlig flotta kom seglande – systemet var i bruk till 1700-talet.' },
      // KÄLLA: Kulturmiljöunderlag Tynningö 2020, kap. 03: "rik uppsättning av sommarvillor uppförda 1870–1920 i välexponerade lägen på klippor och tomter utmed vattnet till vilka man tog sig med ångbåt"; kap. 05: "Ofta har fastigheterna privata stränder med egna bryggor"; "Många av de större husen … lättare att observera från vattnet"
      { icon: '🏛', name: 'Sommarvillorna', desc: 'Villor från 1870–1920 i exponerade lägen på klippor och strandtomter, byggda när ångbåten gjorde ön till sommarnöje för Stockholms borgerskap. Tomterna är privata – villorna ses bäst från vattnet eller från vägarna.' },
      // KÄLLA: Kulturmiljöunderlag Tynningö 2020, kap. 05: "Huvudvägarna på Tynningö kopplar ihop öns tre bryggor … Över ön löper stigar och stråk … vissa av dessa är markerade och andra inte". Vaxholms stad (värd), "Mark och Vandringsleder på Tynningö 2011", TGEF, https://www.vaxholm.se/download/18.5dda784b16d6ccd6b031b3f3/1569999357738/Mark_och_vandringsleder_pa_Tynningo_2011.pdf — "Ca 300 tomtägare äger genom TGEF, Tynningö Gård Ekonomisk Förening, runt 100 hektar skogsmark på ön" (läst 2026-09-21; dokumentet är från 2011)
      { icon: '🚶', name: 'Vägar och stigar', desc: 'Huvudvägarna binder ihop öns tre bryggor och över ön går stigar, en del markerade. Skogen – runt 100 hektar enligt en beskrivning från 2011 – förvaltas av Tynningö Gård Ekonomisk Förening, som beskrev leder söder om Tynningövägen.' },
    ],
    accommodation: [],
    // KÄLLA: Waxholmsbolaget linje 4, https://kund.printhuset-sthlm.se/wa/h4.pdf — "4A STOCKHOLM – VAXHOLM – RAMSÖSUND – ÅLSTÄKET", gäller 2 april–18 juni och 17 augusti–12 december 2026; angör Norra Tynningö, Norehill (Tynningö) och Orrlunda (Tynningö): Strömkajen 07.45 → Norra Tynningö 08.59 (1 h 14 min), 11.00 → 12.23 (1 h 23 min); Vaxholm avg. 08.52 → Norra Tynningö 08.59 (7 min), 12.15 → 12.23 (8 min); Norehill och Orrlunda "Xb" = utan fast tid, beställs (läst 2026-09-19 och 2026-09-21); linje 83 nämns inte i SL:s eller Waxholmsbolagets tidtabellsindex för hösten 2026 (senaste 83-tabellen gällde t.o.m. 29 april 2025) ; Trafikverket, https://www.trafikverket.se/resa-och-trafik/farjetrafik/tynningoleden/ — "Tynningöleden går mellan Lagnö på Värmdö och Tynningö i Stockholms skärgård"; "Färjeledens längd är 1000 meter lång"; "Resan med vägfärjan är avgiftsfri" (läst 2026-09-19 och 2026-09-21)
    getting_there: [
      // Linje 83 finns inte längre: kund.printhuset-sthlm.se/wa/h83.pdf svarar 404 (2026-09-19). Norra Tynningö ligger nu på linje 4A enligt h4.pdf ovan.
      { method: 'Waxholmsbolaget linje 4', from: 'Strömkajen via Vaxholm', time: 'ca 1–1,25 h', desc: 'Linje 4A (Stockholm–Vaxholm–Ramsösund–Ålstäket) angör Norra Tynningö med fast tid, och Norehill och Orrlunda efter beställning. Vissa turer är beställningstrafik och måste bokas i SL-appen i förväg — kontrollera tidtabellen. Gäller 2 april–18 juni och 17 augusti–12 december.', icon: '⛴' },
      { method: 'Bilfärja', from: 'Lagnö (Värmdö)', time: 'några minuter', desc: 'Trafikverkets vägfärja Tynningöleden Lagnö–Tynningö, ca 1 000 m, avgiftsfri. Tidtabell och trafikinfo i appen Trafikinfo Färjerederiet.', icon: '🚗' },
    ],
    transport_meta: {
      from_city_min: 74,
      nearest_hub: 'Vaxholm',
      from_nearest_hub_min: 7,
      operator: 'Waxholmsbolaget',
      line: '4',
      frequency: 'Några turer per dag; Norehill och Orrlunda efter beställning',
    },
    harbors: [
    ],
    restaurants: [],
    tips: [
      'Badet ligger vid en insjö, inte vid havet: Myrholmsmaren vid Stora Maren är öns allmänna badplats, med sandstrand och grillplats.',
      'Strandlinjen är till största delen privat. Kommer du med egen båt, räkna inte med att hitta en allmän plats att lägga till.',
      'Halvdagsutflykt från Vaxholm: linje 4 tar sju–åtta minuter Vaxholm–Norra Tynningö enligt tidtabellen.',
      'Vissa turer på linje 4 är beställningstrafik — kontrollera i SL-appen innan du åker.',
    ],
    related: ['vaxholm', 'resaro', 'rindo'],
    tags: ['bad', 'sommarvillor', 'norra skärgård', 'dagsutflykt', 'vägfärja'],
    // KÄLLA: Kulturmiljöunderlag Tynningö 2020, kap. 06: "Några byggnader från Stockholmsutställningen 1897 kom att flyttas till Tynningö, exempelvis villa Björkudden och nuvarande bostadshuset Kvarnen."
    did_you_know: 'Några byggnader från Stockholmsutställningen 1897 flyttades ut till Tynningö – bland dem villa Björkudden och huset som i dag heter Kvarnen.',
    amenities: { restaurant: false, shop: false, accommodation: false, beach: true, camping: false },
    activity_meta: {
      bad: {
        beaches: [
          // KÄLLA: Vaxholms stad, badplatser (länk ovan); HaV Tynningö, Myrholmsmaren (länk ovan) — läst 2026-09-21
          { name: 'Myrholmsmaren', type: 'sandstrand', desc: 'Kommunal badplats vid insjön Stora Maren inne på ön: sandstrand, bryggor, grillplats med fasta bänkar, omklädningshytt och toalett under badsäsong. Simskola varje sommar genom Tynningö IF.', child_friendly: true, directions: 'Vid sjön Stora Maren inne på ön' },
        ],
      },
    },
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli–Augusti',
      best: 'Juni eller Augusti',
      bestReason: 'Nära Vaxholm och lugnt – en halvdagstur när Vaxholm är fullt.',
      warning: 'Räkna inte med affär eller restaurang på ön. Ta med mat och dryck.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },
  },
  // ─── DJURÖ ───────────────────────────────────────────────────────────────
  {
    slug: 'djuro',
    name: 'Djurö',
    region: 'mellersta',
    emoji: '⛪',
    // OMSKRIVEN 2026-09-14 (Toms beslut "skriv om med sann fakta"). Den gamla sidan beskrev ett
    // "Djurö naturreservat" på 100 km² med hundratals öar och havsörn — det finns inte.
    // KÄLLA: Värmdö kommun (https://www.varmdo.se/) — Djurö nås via väg 222 och Djuröbron; Hamnskogen-Eriksbergs
    // naturreservat bildat 2016, ca 35 ha; Djurö hamn i Djurhamn hyrs ut till Kustbevakningen,
    // Storstockholms brandförsvar, Sjöpolisen m.fl. (ingen gästhamn för allmänheten); badplats
    // Vita grindarna, Djurö Havsbad (läst 2026-09-14).
    // KÄLLA: Svenska kyrkan, Djurö-Möja-Nämdö församling — Djurö kyrka invigd 1683, timrad träkyrka,
    // "Kyrkan tillkom under Vasatiden, då Djurhamn var en viktig örlogsbas" (läst 2026-09-14).
    // KÄLLA: SL, tidtabell linje 433/434 — 433 Slussen–Djurö med hållplatser Djuröbron, Djurönäset,
    // Djurö kyrka, Djurö skola (läst 2026-09-14). Restid: transit-stops.ts, uppmätt 2026-08-05.
    // KÄLLA: https://www.djuronaset.com/ — hotell, spa och konferens i Djurhamn, 273 rum, egen gästhamn för hotellgäster.
    tagline: 'Landfast skärgård över Djuröbron — Vasatidens örlogshamn, träkyrka från 1683 och Djurönäset.',
    description: [
      'Djurö nås utan färja: SL-buss 433 från Slussen går över Djuröbron, med hållplatserna Djuröbron, Djurönäset, Djurö kyrka och Djurö skola. Det gör Djurö till en av få skärgårdsöar där man kommer fram med buss eller bil.',
      'Djurhamn på öns södra del var under Vasatiden en viktig örlogsbas, och det är därför Djurö kyrka byggdes — en timrad träkyrka invigd 1683. I Djurhamn ligger också Djurönäset, ett hotell med spa och konferens och en gästhamn som är tillgänglig året runt även för båt-, restaurang- och daggäster.',
    ],
    facts: {
      known_for: 'Djurö kyrka (1683), Djurönäset, Hamnskogen-Eriksberg',
      season: 'Året runt — landfast',
      travel_time: 'ca 1 h 20 min från Stockholm C med SL (1 byte)',
      character: 'Landfast skärgårdsö, kyrka, konferenshotell',
      best_for: 'Dagsutflykt utan båt, kulturhistoria, spa och konferens',
    },
    facts_provenance: { travel_time: 'matt', season: 'matt', known_for: 'matt', character: 'bedomning', best_for: 'bedomning' },
    activities: [
      { icon: '⛪', name: 'Djurö kyrka', desc: 'Timrad träkyrka invigd 1683 med altaruppsats från samma år och votivskepp. Byggd när Djurhamn var örlogsbas.' },
      { icon: '🥾', name: 'Hamnskogen-Eriksberg', desc: 'Naturreservat på ca 35 hektar med stigar genom tät och öppen skog, utsikt över fjärdarna och badplats. Parkering vid Björkås.' },
      { icon: '🧖', name: 'Spa på Djurönäset', desc: 'Inomhuspool och utomhuspool med havsutsikt på hotellet i Djurhamn.' },
      { icon: '🏖', name: 'Bad', desc: 'Kommunal badplats Vita grindarna (Djurö Havsbad) samt anvisad badplats i Hamnskogen-Eriksberg.' },
    ],
    accommodation: [
      { name: 'Djurönäset', type: 'Hotell', desc: 'Hotell, spa och konferens i Djurhamn med 273 rum, restaurang och egen gästhamn för hotellgäster.', websiteUrl: 'https://www.djuronaset.com' },
    ],
    getting_there: [
      { method: 'SL-buss 433', from: 'Slussen', time: 'ca 1 h', desc: 'Linje 433 går från Slussen ända fram till Djurö med hållplatser Djuröbron, Djurönäset, Djurö kyrka och Djurö skola. Kolla sl.se för aktuell tidtabell.', icon: '🚌' },
      { method: 'Bil', from: 'Stockholm', time: 'ca 50 min', desc: 'Väg 222 (Värmdöleden) österut, över Djuröbron. Parkering vid Björkås för naturreservatet.', icon: '🚗' },
    ],
    transport_meta: {
      from_city_min: 80,
      nearest_hub: 'Slussen',
      from_nearest_hub_min: 60,
      operator: 'SL',
      line: '433',
      frequency: 'Regelbundet dagtid — se sl.se',
    },
    harbors: [
      // KÄLLA: https://www.djuronaset.com/hotell/gasthamn — "Djurönäset Gästhamn Folkparken", "ca 25 gästplatser beroende på båtarnas storlek", "wc, laddström 10A, wi-fi, vatten 20/L per dygn", bokning via dockspot.com; servicen gäller bemannad period 18 juni–17 augusti, därefter är hamnen öppen utan servicefunktioner
      { name: 'Djurönäset Gästhamn (Folkparken)', desc: 'Gästhamn i Djurhamn, ca 25 gästplatser, bokas via Dockspot. Vatten, laddström 10A, wifi och wc under bemannad period 18 juni–17 augusti — därefter är hamnen öppen utan servicefunktioner.', fuel: false, service: ['el', 'vatten', 'wifi'] },
    ],
    restaurants: [
      // KÄLLA: https://www.djuronaset.com/restaurang-bar — "Matsalen" (middag, lunch, brunch), "Sjöboden – Skärgårdskrog öppet sommartid", © 2026
      { name: 'Djurönäset: Matsalen och Sjöboden', type: 'Restaurang', desc: 'Hotellets restauranger i Djurhamn: Matsalen (lunch, middag, brunch) och Sjöboden, skärgårdskrog öppen sommartid.', websiteUrl: 'https://www.djuronaset.com/restaurang-bar/' },
    ],
    tips: [
      'ICA Nära Djurö i Djurhamn har det mesta — proviantera här om du fortsätter ut i skärgården från Stavsnäs.',
      'Djuröbron Bensin vid Stavsnäsvägen har bensin, släputhyrning och enklare livsmedel.',
      'Kyrkan är liten (ca 150 platser) och används av församlingen — kolla öppettider innan du åker för att se den invändigt.',
    ],
    related: ['runmaro', 'namdo', 'sandhamn'],
    tags: ['landfast', 'kyrka', 'konferens', 'naturreservat', 'mellersta skärgård'],
    did_you_know: 'Djurö kyrka från 1683 byggdes för att Djurhamn under Vasatiden var en viktig örlogsbas — flottan behövde en kyrka nära hamnen.',
    amenities: { restaurant: true, shop: true, accommodation: true, beach: true, camping: false },
    activity_meta: {
      bad: { beaches: ['Vita grindarna (Djurö Havsbad)', 'Hamnskogen-Eriksberg'] },
    },
    seasonal: {
      open: 'Året runt',
      peak: 'Juli',
      best: 'Maj–september',
      bestReason: 'Landfast och nåbart hela året; naturreservatet och badplatserna är som bäst maj–september.',
      warning: 'Kommunens hamn i Djurhamn tar inte emot gästande båtar.',
      months: ['limited','limited','limited','open','open','open','peak','open','open','open','limited','limited'],
    },
  },
  // ─── BIRKA ───────────────────────────────────────────────────────────────
  {
    slug: 'birka',
    name: 'Birka',
    region: 'ovriga',
    regionLabel: 'Mälaren',
    emoji: '⚔️',
    tagline: 'Sveriges vikingastad — UNESCO-listat världsarv på en ö i Mälaren.',
    description: [
      'Birka på ön Björkö i Mälaren var Sveriges viktigaste handelsstad under 700–900-talen. Här möttes handelsmän från hela den kända världen — arabiska silvermynt, frankiska vapen och östliga sidenstoffer har hittats i de tusentals gravarna runt staden.',
      'I dag är Birka ett av Sveriges mest fascinerande arkeologiska platser och ett UNESCO-världsarv. Välbevarade vallar, gravfält och museet Vikingastad ger en av de klaraste bilderna av hur livet såg ut i Nordens forntid.',
      'Birka nås med dagstursbåt från Stockholm och är utmärkt för historieintresserade i alla åldrar.',
    ],
    facts: {
      area: 'Björkö ca 5 km²',
      population: 'Inga fast boende',
      known_for: 'Vikingahandelsstad, UNESCO-världsarv, arkeologi',
      season: 'Maj–September (dagstursbåtar)',
    
      travel_time: 'ca 2 tim',
      character: 'Vikingastad, UNESCO-arv',
      best_for: 'Historieintresserade, familjer, dagsutflykt',
    },
    activities: [
      { icon: '🏛', name: 'Vikingastads­museet', desc: 'Utställning om Birkas historia med original­fynd. Guidade turer sommartid ger sammanhang åt gravfälten och vallarna.' },
      { icon: '⚔️', name: 'Gravfält & vallar', desc: 'Tusentals gravar synliga på marken runt Björkö. Vandring i gravfältet med guide rekommenderas.' },
      { icon: '🚢', name: 'Dagstur med Strömma', desc: 'Strömma Kanalbolaget kör dagstursbåtar från Stadshusbron i Stockholm med guide, museiinträde och lunch ingår.' },
    ],
    accommodation: [],
    getting_there: [
      { method: 'Dagstursbåt från Stockholm', from: 'Stadshusbron, Stockholm', time: 'ca 2 h', desc: 'Strömma och andra operatörer kör dagsturer till Birka sommartid. Biljetter inkluderar ofta guide och museum. Kolla aktuellt utbud på strömma.se.', icon: '⛴' },
      { method: 'Bil + lokalbåt', from: 'Adelsö / Ekerö', time: 'ca 5 min båt', desc: 'Kör via Ekerö (ca 30 min från Stockholm, väg 261). Från Adelsö går en liten lokalbåt till Björkö.', icon: '🚗' },
    ],
    transport_meta: {
      from_city_min: 120,
      nearest_hub: 'Stockholm Stadshusbron',
      from_nearest_hub_min: 120,
      operator: 'Strömma / lokal färja',
      frequency: 'Sommarsäsong dagligen',
    },
    harbors: [
      // KÄLLA: https://www.birkavikingastaden.se/hitta-pa-birka/gasthamnen/ — "Birkas gästhamn", vatten ja, "Toalett/Dusch: Ja/Ja", el vid platsen nej men "Tillgång till el" mot avgift, bränsle nej (uppdaterad 2026-06-16)
      { name: 'Birkas gästhamn', desc: 'Gästhamn vid Birka Vikingastaden på Björkö. Vatten, toalett och dusch; el mot avgift.', fuel: false, service: ['vatten', 'dusch'] },
    ],
    restaurants: [
      // KÄLLA: https://www.birkavikingastaden.se/en/attraction/restaurant-cafe/ — "Café Eldrimner", "Coffee, ice cream and light lunch", "sandwiches and freshly baked pastries", säsong 22 juni–9 augusti 2026
      { name: 'Café Eldrimner', type: 'Café', desc: 'Café på Birka Vikingastaden med kaffe, smörgåsar, bakverk och glass. Sommaröppet.', websiteUrl: 'https://www.birkavikingastaden.se/' },
    ],
    tips: [
      'Boka dagstur med guide — det ger sammanhanget som krävs för att förstå vad man ser på gravfälten.',
      'Barn brukar gilla historien om vikingarna och det arkeologiska fynden. Bra familjeutflykt.',
      'Ta med picknick — det är vackert att äta i gräset vid gravfälten.',
    ],
    related: ['adelsjo', 'vaxholm', 'sandhamn'],
    tags: ['historia', 'UNESCO', 'vikingar', 'arkeologi', 'familjer', 'dagsutflykt', 'mälaren'],
    insiderTips: [
      'Strömmas dagstur inkluderar guide — men om du tar den lokala färjan från Adelsö kan du gå runt på egen hand i lugn och ro.',
    ],
    did_you_know: 'Birka grundades ca 750 e.Kr. och fungerade som Skandinaviens mest livliga handelscentrum i 200 år. I Birkas gravfält har arkeologer hittat fynd från England, Frankerriket, Bysans och Mellanöstern — ett bevis på hur globala vikingarna faktiskt var.',
    amenities: { restaurant: true, shop: true, accommodation: false, beach: false, camping: false },
    activity_meta: { cykel: { rental: false, notes: 'Cyklar olämpliga på det lilla Björkö' } },
  },
  // ─── LILLA KARLSÖ ────────────────────────────────────────────────────────
  {
    slug: 'lilla-karlso',
    name: 'Lilla Karlsö',
    region: 'ovriga',
    regionLabel: 'Gotland',
    emoji: '🐦',
    tagline: 'Gotlands fågelö — klippfästning med 15 000 häckande havssjöfåglar.',
    description: [
      'Lilla Karlsö är en klippö väster om Gotlands södra kust, och ett av Sveriges märkligaste naturskyddsområden. Varje sommar häckar upp till 15 000 sillgrisslor och tordmular på öns klippavsatser — ett naturspektakel utan like i Östersjön.',
      'Ön är ett naturreservat med starkt begränsad tillgång. Besök sker uteslutande med guidade turer från Klintehamn — du kan inte sätta foten på ön utan guide. Det är en av anledningarna till att upplevelsen är så stark.',
      'Lilla Karlsö är en halvdags- eller dagsturs­upplevelse, inte ett resmål att övernatta på. Men de timmar du tillbringar där är bland de mest minnesvärda i Östersjöns natur.',
    ],
    facts: {
      area: 'ca 1,5 km²',
      population: '0 (naturreservat)',
      known_for: '15 000 häckande sillgrisslor och tordmular, klippfaunan',
      season: 'Maj–Augusti (häckningssäsong)',
    
      travel_time: 'ca 4 tim',
      character: 'Naturreservat med fågelliv',
      best_for: 'Fågelskådare, fotografer, naturguider',
    },
    activities: [
      { icon: '🦅', name: 'Fågelskådning', desc: 'Sillgrisslor och tordmular på klippavsatserna. Möjlighet att se alkor, havsörn och en rik kärlväxtflora. Guide medverkar på alla turer.' },
      { icon: '🌿', name: 'Naturguidad tur', desc: 'Alla besök är guidade. Turerna tar ca 2 timmar och inkluderar promenad på öns leder med information om flora och fauna.' },
      { icon: '📸', name: 'Fotografera fåglar', desc: 'Möjlighet att komma mycket nära sillgrisslorna. En av de bästa möjligheterna för fågelfoto i norra Europa under häckningssäsongen.' },
    ],
    accommodation: [],
    getting_there: [
      // KÄLLA: Länsstyrelsen Gotland, naturreservat Lilla Karlsö (https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/lilla-karlso.html) (sedan 1955, ägs av Naturskyddsföreningen): båt från Klintehamn; landstigning bara vid bryggan på östra sidan; 1 mars–31 aug krävs tillstånd för att vistas på ön (läst 2026-09-14). Arrangör enligt Naturskyddsföreningen Gotland: Gotland Sea Guides.
      { method: 'Guidad tur från Klintehamn', from: 'Klintehamn (Gotland)', desc: 'Boka tur via Naturskyddsföreningen Gotland (Gotland Sea Guides). Under 1 mars–31 augusti krävs tillstånd för att vistas på ön och landstigning får bara ske vid bryggan — i praktiken går man med guidad tur.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 240,
      nearest_hub: 'Klintehamn (Gotland)',
      from_nearest_hub_min: 25,
      operator: 'Naturskyddsföreningen Gotland / Gotland Sea Guides',
      frequency: 'Guidade turer dagligen maj–aug, boka i förväg',
    },
    harbors: [],
    restaurants: [],
    tips: [
      'Boka tur via lillakarlso.se — platserna är begränsade och tar slut tidigt i säsongen.',
      'Havsörn syns ofta kring ön. Ta kikare.',
      'Bäst fågelupplevelse: maj–juni när ungarna är på väg ut ur äggskalen.',
      'Kombinera med Stora Karlsö samma dag — liknade tur erbjuds dit från Klintehamn.',
    ],
    related: ['gotland', 'faro', 'oland'],
    tags: ['fågelliv', 'naturreservat', 'gotland', 'dagsutflykt', 'guidad tur', 'fotografi'],
    did_you_know: 'Sillgrisslorna på Lilla Karlsö lägger sina ägg direkt på kala klippavsatser — inga bon. Äggets päronform är en evolution­är anpassning: om ägget nuddar till, rullar det i en cirkel snarare än utanför kanten.',
    amenities: { restaurant: false, shop: false, accommodation: false, beach: false, camping: false },
    activity_meta: { bad: { beaches: [] } },
  },
  // ─── GOTSKA SANDÖN ───────────────────────────────────────────────────────
  {
    slug: 'gotska-sandon',
    name: 'Gotska Sandön',
    region: 'ovriga',
    regionLabel: 'Gotland',
    emoji: '🏝',
    // KÄLLA: Gotska Sandöns nationalpark (https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/gotska-sandon) — bildad 1910, utvidgad 1963 och 1988 (läst 2026-09-14)
    tagline: 'Östersjöns ensliga nationalpark — sanddyner, tallar och absolut avskildhet.',
    description: [
      'Gotska Sandön är en av Sveriges mest avlägsna öar — och en av de mest fascinerande. Nationalparken i öppet Östersjövatten, cirka 37 km norr om Fårö, har inga vägar och inga butiker. Bebyggelsen omfattar bland annat Fyrbyn med fyrmästarbostaden, Gamla gården, skolhuset/museet, ett kapell från 1950 och ett antal stugor.',
      'Ön är ett geologiskt unikum: ett sandrevlande landskap format av Östersjöns vindar, med vandringsdyner, tallskogar som växer på sand och stränder som skiftar form varje år. Det är en ö som inte alls liknar någon annan i Sverige.',
      'Hit tar man sig med sommarbåt från Nynäshamn eller Fårösund under juni–september. Turen är lång, platserna begränsade och upplevelsen nästintill ogreppbar. Det är därför Gotska Sandön är en av de svenska bucket-list-destinationerna.',
    ],
    facts: {
      area: 'ca 37 km²',
      population: '0 (nationalparkspersonal sommartid)',
      // KÄLLA: se ovan (nationalpark sedan 1910)
      known_for: 'Avlägsen nationalpark, sanddyner, unika ekosystem',
      season: 'Juni–September (sommartrafik)',
    
      travel_time: 'ca 7 tim',
      character: 'Avlägsen sandöpark',
      best_for: 'Äventyrare, naturentusiaster, bucket list',
    },
    activities: [
      { icon: '🏖', name: 'Sandstränder', desc: 'Öns hela kust är strand — vita sanddyner och relativt varmt Östersjövatten. Nästan alltid öde.' },
      { icon: '🥾', name: 'Vandring', desc: 'Markerade leder runt ön och genom nationalparken. Fullrunda ca 18 km. Sandigt underlag — gott om insekter i juli.' },
      { icon: '🔭', name: 'Mörkertidsstjärnor', desc: 'Gotska Sandön har en av Sveriges lägsta ljusföroreningar. Vintergatan syns med blotta ögat på en klar natt.' },
      { icon: '🌿', name: 'Naturstudier', desc: 'Unika sand­växter, havsörn, sälkoloni på norra stranden och ett ekosystem som saknar direkt jämförelse.' },
    ],
    accommodation: [
      { name: 'STF Stugor Gotska Sandön', type: 'Stugor', desc: 'Enklare stugor och raststugor i parken. Begränsat antal platser — boka månader i förväg via STF.' },
      { name: 'Tältning i nationalpark', type: 'Camping', desc: 'Tältning på anvisade platser i nationalparken. Koll aktuella regler hos Naturvårdsverket.' },
    ],
    getting_there: [
      { method: 'Sommarbåt från Nynäshamn', from: 'Nynäshamn', time: 'ca 5–6 h', desc: 'Gotska Sandön Trafik AB kör sommarbåt ett fåtal avgångsdagar per vecka juni–september. Boka i god tid — begränsat antal platser.', icon: '⛴' },
      { method: 'Sommarbåt från Fårösund', from: 'Fårösund (Gotland)', time: 'ca 2,5–3 h', desc: 'Kortare rutt. Kolla Gotska Sandön Trafik AB:s tidtabell för avgångsdagar.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 420,
      nearest_hub: 'Nynäshamn / Fårösund',
      from_nearest_hub_min: 300,
      operator: 'Gotska Sandön Trafik AB',
      frequency: 'Begränsade avgångsdagar juni–sept — kolla aktuell tidtabell',
    },
    harbors: [
    ],
    restaurants: [],
    tips: [
      'Boka plats på båt och stuga minst 2–3 månader i förväg. Gotska Sandön är liten och fullbokad tidigt.',
      'Insekter kan vara besvärliga i juli. Ta med bra myggskydd.',
      'Ön är inte nåbar om sjön är för grov — tur­operatören kan ställa in utan förvarning.',
      'Ta med allt du behöver — ingen mat, inget vatten och ingen affär på ön.',
    ],
    related: ['gotland', 'faro', 'arholma'],
    tags: ['nationalpark', 'avlägsen', 'sanddyner', 'äventyr', 'natur', 'bucket list', 'gotland'],
    insiderTips: [
      'Prata med nationalparkspersonalen när du landar — de vet var havsörnen sitter och var sälarna vilar på stranden.',
      'Ta med handlinor och fiska längs stranden. Gotska Sandöns stränder är fria för alla.',
    ],
    did_you_know: 'Gotska Sandön blev nationalpark 1909 — ett av Sveriges allra första. Ön är ett geologiskt sällsynt sanddynlandskap mitt i Östersjön, med arter som inte förekommer på Gotland trots att de är nära grannar.',
    amenities: { restaurant: false, shop: false, accommodation: true, beach: true, camping: true },
    activity_meta: {
      bad: { beaches: ['Hela kusten är strand, ca 18 km'] },
      fiske: true,
    },
  },
  // ─── ASPÖ (BLEKINGE) ─────────────────────────────────────────────────────
  {
    slug: 'aspo-blekinge',
    name: 'Aspö',
    region: 'ovriga',
    regionLabel: 'Blekinge',
    emoji: '🦀',
    tagline: 'Karlskrona-skärgårdens vackraste ö — granit, barrskog och fri natur.',
    description: [
      'Aspö är en av de mer besökta öarna i Karlskronas skärgård — en kuperad klipp­ö med barrskog, klippstränder och det typiska Blekinges möte mellan granit och hav. Ön är naturreservat till stora delar och välbesökt av seglare, kajakpaddlare och naturentusiaster.',
      'Från Aspö kan man se Karlskronas östra utkant och navigera vidare till Sturkö och skärgårdens yttre delar. Ön erbjuder camping, vandring och ett av de bättre klippbaden längs den blekingska kusten.',
    ],
    facts: {
      area: 'ca 9 km²',
      population: 'ca 100 (helårsboende)',
      // Inget naturreservat på Aspö i Karlskrona kommun gick att belägga hos Länsstyrelsen Blekinge (sökt 2026-09-14) — ordet borttaget.
      known_for: 'Klipplandskap, Karlskrona-skärgård',
      season: 'Maj–September',
    
      travel_time: 'ca 4 tim',
      character: 'Skärgårdsö i Blekinge',
      best_for: 'Kajakpaddlare, badare, naturliv',
    },
    activities: [
      { icon: '🏊', name: 'Klippbad', desc: 'Klart Östersjövatten längs öns klippkust. Vackra badplatser på sydöst­sidan.' },
      { icon: '🥾', name: 'Vandring', desc: 'Markerade leder runt ön och in i naturreservatet. Utsikter mot Hanöbukten och Karlskrona-skärgården.' },
      { icon: '🚣', name: 'Kajak', desc: 'Aspö ingår i Blekinges kajak­rutter. Paddla vidare mot Yttre Pölsan eller mot Sturkö.' },
    ],
    accommodation: [
      { name: 'Aspö Camping', type: 'Camping', desc: 'Camping­möjligheter på ön sommartid. Kolla aktuellt utbud med Karlskrona Turism.' },
    ],
    getting_there: [
      { method: 'Passagerarfärja från Karlskrona', from: 'Karlskrona (Fisktorget/Polhemspiren)', time: 'ca 30–40 min', desc: 'Lokal passagerarfärja till Aspö sommar­säsong. Kolla aktuell tidtabell hos Blekingetrafiken.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 240,
      nearest_hub: 'Karlskrona',
      from_nearest_hub_min: 35,
      operator: 'Blekingetrafiken',
      frequency: 'Sommarsäsong — kolla aktuell tidtabell',
    },
    harbors: [
      // KÄLLA: https://www.karlskrona.se:443/ (gästhamnar, 2026-02-20) — "Aspö, Lökanabben"; https://www.visitkarlskrona.se/sv — "just beside the citadel of Drottningskär", "Shower/wc", 6 gästplatser; https://aspobatklubb.se/ — dusch, wifi, tvättmaskin
      { name: 'Lökanabben gästhamn, Aspö', desc: 'Gästhamn vid Drottningskärs kastell, drivs av Aspö Båtklubb. Sex gästplatser. Dusch/wc, wifi och tvättmaskin.', fuel: false, service: ['dusch', 'wifi', 'tvätt'] },
    ],
    restaurants: [],
    tips: [
      'Kombinerbar med Sturkö: ta båten till Aspö, paddla eller ta sig vidare till Sturkö.',
      'Ta med mat — serviceutbudet på ön är begränsat.',
    ],
    related: ['hano', 'sturko', 'landsort'],
    tags: ['blekinge', 'naturreservat', 'kajak', 'bad', 'dagsutflykt'],
    did_you_know: 'Karlskronas skärgård med Aspö och omgivande öar ingår i det område som präglade den svenska örlogsflottans historia från 1680-talet. Karlskrona är sedan 1998 ett UNESCO-världsarv, och marken och vattnet runt Aspö bär fortfarande spår av den militär­strategiska historien.',
    amenities: { restaurant: false, shop: false, accommodation: false, beach: true, camping: true },
    activity_meta: {
      kajak: { difficulty: 'lätt–medel', rental: false, notes: 'Kajakhyrning i Karlskrona' },
      bad: { beaches: ['Sydöstra klippstranden', 'Västra viken'] },
    },
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Juni: klippbadet och naturreservatet på sitt bästa utan trängseln. September: Östersjön håller fortfarande badtemperatur och ön är nästan tom.',
      warning: 'Färjan från Karlskrona kör bara sommarsäsong — utanför juni–september krävs privat båt. Ta med all mat och dryck.',
      months: ['off','off','off','off','off','open','peak','peak','open','limited','off','off'],
    },
  },
  // ─── STURKÖ ──────────────────────────────────────────────────────────────
  {
    slug: 'sturko',
    name: 'Sturkö',
    region: 'ovriga',
    regionLabel: 'Blekinge',
    emoji: '🌲',
    tagline: 'Blekinges största ö — skog, klippor och bilfri skärgårds­känsla.',
    description: [
      'Sturkö är den till ytan störst­a av de bebodda öarna i Blekinges skärgård. Ön är välkänd för sin skogiga karaktär, goda camping­möjligheter och de vackra utsikterna mot Hanöbukten och ut mot öppet Östersjövatten.',
      'Till skillnad från många skärgårdsöar kan man nå Sturkö med bil via bro­förbindelser från Karlskrona-hållet, vilket gör den tillgänglig för dem utan båt. Ön kombinerar skärgårdens frihet med den praktiska tillgängligheten.',
    ],
    facts: {
      area: 'ca 23 km²',
      population: 'ca 700 (helårsboende)',
      known_for: 'Blekinges största ö, camping, skogsmiljö',
      season: 'Maj–September',
    
      travel_time: 'ca 4 tim',
      character: 'Camping, klippkust',
      best_for: 'Barnfamiljer, campare, bad',
    },
    activities: [
      { icon: '⛺', name: 'Camping', desc: 'Sturkö är ett välkänt sommarcampingmål i Blekinge. Campingplatser med gott om utrymme.' },
      { icon: '🥾', name: 'Vandring', desc: 'Skogspartier och klippkust erbjuder varierade vandrings­möjligheter. Utsikter mot öppet hav.' },
      { icon: '🏊', name: 'Bad', desc: 'Klippbad och sandiga vikar längs östkusten. Klart Östersjövatten.' },
    ],
    accommodation: [
      { name: 'Sturkö Camping', type: 'Camping', desc: 'Camping­anläggning med gott om plats. Populär i juli — boka i förväg eller kom tidigt.' },
      { name: 'Stuguthyrning Sturkö', type: 'Stugor', desc: 'Sommarstugor via lokala uthyrare.' },
    ],
    getting_there: [
      { method: 'Bil via bro­förbindelser', from: 'Karlskrona', time: 'ca 20–30 min', desc: 'Sturkö nås med bil via broförbindelser från Karlskrona-hållet. Kör mot Lyckeby och följ skyltning mot Sturkö.', icon: '🚗' },
      { method: 'Passagerarfärja', from: 'Karlskrona', time: 'ca 25–35 min', desc: 'Blekingetrafiken trafikerar ön sommar­säsong. Kolla aktuell tidtabell.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 240,
      nearest_hub: 'Karlskrona',
      from_nearest_hub_min: 25,
      operator: 'Bil (broförbunden) / Blekingetrafiken',
      frequency: 'Tillgänglig med bil hela året',
    },
    harbors: [
      // KÄLLA: https://www.karlskrona.se:443/ (gästhamnar) — "Sturkö, Ekenabben", "eluttag på gästbryggan"; https://www.visitkarlskrona.se/sv — "Guest harbour/Fishing harbor at Djupasund on the west side of Sturkö to the south of Tjurkö bridge"
      { name: 'Ekenabben gästhamn, Sturkö', desc: 'Kommunal gästhamn och fiskehamn vid Djupasund på Sturkös västra sida, söder om Tjurköbron. El på gästbryggan.', fuel: false, service: ['el'] },
    ],
    restaurants: [
      // KÄLLA: https://www.visitblekinge.se/en/sturko-a-picturesque-island — "Kvarnmagasinet" (pizza i kvarntornet); visitkarlskrona.se/en/sturko-kvarncafe-kvarnmagasinets-pizzeria
      { name: 'Sturkö Kvarncafé och Kvarnmagasinets pizzeria', type: 'Café/Pizzeria', desc: 'Café och pizzeria i kvarnen på Sturkö.', websiteUrl: 'https://www.visitkarlskrona.se/en/sturko-kvarncafe-kvarnmagasinets-pizzeria' },
    ],
    tips: [
      'Sturkö är bra om du vill ha skärgård men inte vill vara beroende av båtturer — ta bilen dit.',
      'Kombinerbar med Aspö och Hanö om du har tillgång till båt.',
    ],
    related: ['hano', 'aspo-blekinge', 'landsort'],
    tags: ['blekinge', 'camping', 'bil', 'familjer', 'skärgård'],
    did_you_know: 'Sturkö har en av de äldsta kontinuerligt bebodda fiskebefolkningarna i Blekinges skärgård. Fisket och sjöfarten präglade ön ända fram till 1900-talets mitt.',
    amenities: { restaurant: true, shop: true, accommodation: true, beach: true, camping: true },
    activity_meta: { bad: { beaches: ['Östra klippstranden', 'Sandviken'] } },
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Juni ger Östersjöns kallare men klara vatten och tomma campingplatser. September: Östersjön är badvarmt, skogens höstfärger är enastående och du har ön för dig själv.',
      warning: 'Campingen är fullbokad i juli — kom tidigt eller boka i förväg. Butiken har begränsade öppettider utanför högsäsong.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },
  },
  // ─── BLÅ JUNGFRUN ────────────────────────────────────────────────────────
  {
    slug: 'bla-jungfrun',
    name: 'Blå Jungfrun',
    region: 'ovriga',
    regionLabel: 'Kalmarsund',
    emoji: '🪄',
    // KÄLLA: https://www.sverigesnationalparker.se/sv + Länsstyrelsen Kalmar — Blå Jungfrun nationalpark sedan 1926 (läst 2026-09-14)
    tagline: 'Förtrollad nationalpark i Kalmarsund — häxor, labyrinter och urberg.',
    description: [
      'Blå Jungfrun är en av Sveriges märkligaste platser — en rund granitö mitt i Kalmarsund som i folklig tradition ansågs vara samlings­platsen för svenska häxor varje Skärtorsdag (Blåkulla-legenden). I verkligheten är ön ett geologiskt unikum: en rundad granitklump formad av inlandsisen med stenlabyrinten Trollebo som dess mest kända inslag.',
      'Ön är nationalpark sedan 1926 och nås med dagstur­båt från Ölandskajen i Oskarshamns hamn eller Södra piren i Byxelkroks hamn på Öland — eller med egen båt. Övernattning är tillåten endast i vindskydden vid Sikhamn, som bokas via Solkustturer och är kostnadsfria (max åtta personer, en natt per tillfälle); att övernatta någon annanstans på ön, i tält eller under bar himmel, är förbjudet. Varje besök är ett kortare men djupt minnesvärt möte med urbergets Sverige.',
    ],
    facts: {
      area: 'ca 0,66 km²',
      population: '0 (nationalpark)',
      known_for: 'Häxlegenden (Blåkulla), stenlabyrint Trollebo, rundad granitklump, nationalpark',
      season: 'Maj–September (dagstursbåtar)',
    
      travel_time: 'ca 4 tim',
      character: 'Nationalpark, mystik',
      best_for: 'Historieintresserade, naturentusiaster, dagsutflykt',
    },
    activities: [
      { icon: '🪄', name: 'Trollebo stenlabyrint', desc: 'Forntida stenlabyrint — liknande labyrinter finns längs hela svenska kusten men Blå Jungfruns är en av de välbevarade. Ursprunget okänt.' },
      { icon: '🥾', name: 'Vandring på ön', desc: 'Välmärkta leder runt ön (ca 3–4 km). Utsikter från öns topp mot Öland och fastlandet.' },
      { icon: '🔮', name: 'Häxhistorian', desc: 'Guider berättar om Blåkulla-legenden, varför just Blå Jungfrun valdes ut av folktron och hur påskkärrings­traditionen hänger ihop.' },
      { icon: '🌿', name: 'Naturupplevelse', desc: 'Orörda urskogspartier med gamla ekar och tallskogar. Havsörn och pilgrimsfalk observeras.' },
    ],
    accommodation: [],
    getting_there: [
      { method: 'Dagstursbåt från Oskarshamn', from: 'Oskarshamn', time: 'ca 1,5–2 h', desc: 'Sommarsäsong kör operatörer dagstursbåtar till Blå Jungfrun från Oskarshamn. Boka i förväg.', icon: '⛴' },
      { method: 'Dagstursbåt från Byxelkrok', from: 'Byxelkrok (Ölands nordspets)', time: 'ca 45 min', desc: 'Kortare rutt från Ölands nordspets. Sommaroperatörer — kolla aktuellt utbud.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 240,
      nearest_hub: 'Oskarshamn / Byxelkrok',
      from_nearest_hub_min: 100,
      operator: 'Lokala dagstursbåtar (sommarsäsong)',
      frequency: 'Begränsade dagar per vecka, boka i förväg',
    },
    harbors: [],
    restaurants: [],
    tips: [
      'Övernattning är INTE tillåtet — det är en dagstur utan undantag.',
      'Boka dagstur­båt i god tid — platserna är begränsade.',
      'Högt upp på ön finns de bästa utsikterna mot Öland och fastlandet — ta med kameran.',
      'Legenden säger att om man tar en sten från ön, tar man med sig olycka. Lämna stenarna kvar.',
    ],
    related: ['oland', 'gotland', 'faro'],
    tags: ['nationalpark', 'historia', 'naturreservat', 'dagsutflykt', 'mystik', 'kalmarsund'],
    insiderTips: [
      'Guidade turer inkluderas vanligen i dagstursbiljetterna — hoppa inte av guiden. Historien om häxlegenden och geologin kräver sammanhang.',
    ],
    did_you_know: 'Blå Jungfrun fick sitt namn av sjömän som fruktat ön och kallat den "Blåkulla" — the Blue Island — som i folketro var häxornas samlingsplats. Det officiella "Blå Jungfrun" (Blå Jungfru) är en eufemism för att inte nämna det fruktade namnet direkt.',
    amenities: { restaurant: false, shop: false, accommodation: false, beach: false, camping: false },
    activity_meta: { bad: { beaches: [] } },
  },
  // ─── HEMSÖN ──────────────────────────────────────────────────────────────
  {
    slug: 'hemson',
    name: 'Hemsön',
    region: 'ovriga',
    regionLabel: 'Höga Kusten',
    emoji: '🏰',
    tagline: 'Höga Kustens hemliga ö — berömda fästningsverk, urskogar och klippstränder.',
    description: [
      'Hemsön är en stor ö utanför Härnösand i Ångermanland, och en av Höga Kustens mest besöksvärda men undermarknadsförda destinationer. Öns domineras av Hemsö fästning — ett skalskydds­anläggning byggd i berg under det kalla krigets era som idag är ett öppet historiskt monument.',
      'Utöver fästningen bjuder Hemsön på typisk Höga Kusten-natur: dramatiska klippor som landar rakt i havet, barrskogs­täta marker och utsikter mot Ångermanälvens mynning och de inre fjärdarna.',
      'Ön nås med passagerarfärja från Härnösand och är tillgänglig som dagsutflykt eller för övernattning via camping.',
    ],
    facts: {
      area: 'ca 30 km²',
      population: 'ca 200 (helårsboende)',
      known_for: 'Hemsö fästning, klippnatur, Höga Kusten',
      season: 'Juni–Augusti',
    
      travel_time: 'ca 5 tim',
      character: 'Fästning, Höga Kusten',
      best_for: 'Historieintresserade, vandrare, seglare',
    },
    activities: [
      { icon: '🏰', name: 'Hemsö fästning', desc: 'Bergfästning från kalla krigets era uthuggd i klippan. Guidade turer sommartid visar kasematter, tunnel­system och pjässällningar. En av Sveriges mest unika militär­historiska platser.' },
      { icon: '🥾', name: 'Vandring i urskog', desc: 'Välmärkta leder genom Hemsöns barrskogar och längs klippkusten. Stigar med fantastisk utsikt mot Ångermans­landskapet.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Klart Bottenhavsvatten längs öns stränder. Avskilt och rent.' },
    ],
    accommodation: [
      { name: 'Hemsön Camping', type: 'Camping', desc: 'Camping­möjligheter sommartid. Koll aktuellt utbud.' },
    ],
    getting_there: [
      { method: 'Passagerarfärja från Härnösand', from: 'Härnösand', time: 'ca 20–30 min', desc: 'Lokal passagerarfärja till Hemsön från Härnösand hamn. Kolla aktuell tidtabell hos Länstrafiken Västernorrland.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 300,
      nearest_hub: 'Härnösand',
      from_nearest_hub_min: 25,
      operator: 'Länstrafiken Västernorrland',
      frequency: 'Sommarsäsong — kolla aktuell tidtabell',
    },
    harbors: [
      // KÄLLA: https://mittharnosand.se/ (Härnösands kommun) — "Hultoms brygga … northern Hemsön … a jetty … a toilet and sauna". Ingen "Hemsö Gästhamn" hos kommunen.
      { name: 'Hultoms brygga', desc: 'Brygga på norra Hemsön med toalett och bastu.', fuel: false, service: [] },
    ],
    restaurants: [],
    tips: [
      'Boka guidad tur till fästningen i förväg — en av de mest häpnadsväckande platserna i norra Sverige.',
      'Kombinerbar med Ulvön och Trysunda för en längre Höga Kusten-vistelse.',
    ],
    related: ['ulvon', 'trysunda', 'arholma'],
    tags: ['höga kusten', 'historia', 'fästning', 'natur', 'vandring', 'UNESCO'],
    did_you_know: 'Hemsö fästning byggdes in i berget under 1950–60-talen som en del av Sveriges kall­krigsförsvar. Bergrum, tunnel­system och kanon­pjässällningar är bevarade och öppna för besök — ett tidskapsel från en era då Sverige tog sin militärstrategiska neutralitet på extremt allvar.',
    amenities: { restaurant: false, shop: false, accommodation: false, beach: true, camping: true },
    activity_meta: { bad: { beaches: ['Klippstränder östra sidan'] } },
  },
  // ─── FÅRÖ ────────────────────────────────────────────────────────────────
  {
    slug: 'faro',
    name: 'Fårö',
    region: 'ovriga',
    regionLabel: 'Gotland',
    emoji: '🪨',
    // KÄLLA: https://gotland.com/companies/faro/ — "trots att det bara tar sex minuter att åka över sundet", "Här finns långa vackra sandstränder och ståtliga raukar längs västkusten." (läst 2026-09-27)
    tagline: 'Bergmans ö – raukar, långa sandstränder och sex minuter med färja från Fårösund.',
    description: [
      // KÄLLA: https://gotland.com/article/bergman-and-faro/ — "Ingmar Bergman first came to Fårö on a stormy April day in 1960.", "as a possible location for Through a Glass Darkly", "He had his house built not far from where Persona was filmed. He came to live and work there for almost 40 years.", "Ingmar Bergman died at the age of 89 at his home on Fårö and is buried in Fårö Church Cemetery.", "The meeting with the barren island on Gotland’s northern point was overwhelming." (läst 2026-09-27); https://www.trafikverket.se/resa-och-trafik/farjetrafik/farosundsleden/ — "Resan med vägfärjan är avgiftsfri." (läst 2026-09-27)
      'Fårö ligger vid Gotlands norra spets och nås med en avgiftsfri vägfärja från Fårösund. Ingmar Bergman kom hit första gången en stormig aprildag 1960, när han letade inspelningsplats för Såsom i en spegel. Han lät bygga sitt hus inte långt från platsen där Persona spelades in, levde och arbetade på ön i nästan 40 år och dog i sitt hem på Fårö 2007, 89 år gammal.',
      // KÄLLA: https://gotland.com/companies/faro/ — "På Fårö är landskapet ännu lite kargare och sanden ännu finkornigare.", "Digerhuvud är ett flera kilometer långt naturreservat och Gotlands största raukområde." (läst 2026-09-27)
      // KÄLLA: https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/digerhuvud.html — "Raukarna varierar i höjd från någon meter upp till 8 meter.", "Ännu längre in vidtar en lågvuxen skog av vindpinade strandtallar." (läst 2026-09-27)
      'Enligt gotland.com är landskapet på Fårö ännu kargare och sanden ännu finkornigare än på övriga Gotland. Längs nordvästkusten sträcker sig Digerhuvud, Gotlands största raukområde, med raukar på upp till åtta meter, ett brett klapperstensfält och innanför det en lågvuxen skog av vindpinade strandtallar.',
      // KÄLLA: https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/digerhuvud.html — "Den gotländska berggrunden är till stor del uppbyggd av korallrev som bildades i ett tropiskt hav för cirka 430 miljoner år sedan", "kunde de stå kvar som isolerade stenpelare – raukar", "förstöra eller skada fast naturföremål eller ytbildning genom att exempelvis knacka fossil ur raukar" (läst 2026-09-27)
      'Raukarna är rester av korallrev som bildades i ett tropiskt hav för cirka 430 miljoner år sedan. När landet steg ur havet efter istiden nötte vågorna bort de mjukare lagren, och de hårda revkropparna blev stående som isolerade stenpelare. Kalkstenen är full av fossil, men i reservaten är det förbjudet att knacka loss dem.',
    ],
    facts: {
      // area 113 km² och "ca 550 helårsboende" borttagna: ingen tillåten källa kunde läsas (Region Gotlands Demografen går inte att hämta). Fälten visas inte på sidan.
      // KÄLLA: https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/langhammars.html — "De ståtliga raukarna på stranden vid Klajvika är utan tvekan de mest fotograferade raukarna på Gotland."; https://gotland.com/companies/sudersand/ — "En av Gotlands absolut vackraste och längsta sandstränder är Sudersand som ligger på Fårö." (läst 2026-09-27)
      known_for: 'Raukar, Ingmar Bergman, Sudersand',
      // KÄLLA: https://gotland.com/besoka-uppleva/upptack-norra-gotland/ — "Färjan till Fårö går varje hel och halv timme från Fårösund året runt", "Det går endast bussar på Fårö under sommartid, från mitten av juni till mitten av augusti." (läst 2026-09-27)
      season: 'Året runt (färjan går året om); buss på ön och de flesta verksamheter sommartid',
      // KÄLLA: https://www.destinationgotland.se/resa/ — "På omkring tre timmar är du framme i Visby"; https://dokument.gotland.se:443/IntegrationService.svc/doc/content/55284 — "Ordinarie tidtabell 2026/2027. Giltig 2026-08-16–2027-06-12", Visby busstation–Fårösund färjeläge 60 min (t.ex. 08.35–09.35); https://www.trafikverket.se/resa-och-trafik/farjetrafik/farosundsleden/ — "överfartstiden är sex minuter" (läst 2026-09-27)
      travel_time: 'Färja Nynäshamn–Visby ca 3 tim + buss 20 till Fårösund 1 tim + Fåröfärjan 6 min',
      character: 'Raukar, Bergman, Östersjö',
      // KÄLLA: https://gotland.com/companies/sudersand/ — "Idealisk för barnfamiljer med mjuk len sand och långgrunt vatten."; https://bergmancenter.se/besok-oss/utstallningar/ — "Ta chansen att få veta mer om den starka relation som uppstod mellan den världsberömde regissören och Fårö." (läst 2026-09-27)
      best_for: 'Raukar, bad på långgrunda sandstränder, Bergmans Fårö',
    },
    activities: [
      // KÄLLA: https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/langhammars.html — "De ståtliga raukarna på stranden vid Klajvika är utan tvekan de mest fotograferade raukarna på Gotland. Raukarna finns även avbildade på baksidan av den svenska 200 kronorssedeln.", "Det 480 hektar stora naturreservatet", "På strandsluttningen ovanför Klajvika står ett drygt 50-tal raukar, av vilka några är mer än 8 meter höga" (läst 2026-09-27)
      { icon: '🪨', name: 'Langhammars raukar', desc: 'Ett drygt 50-tal raukar på strandsluttningen ovanför Klajvika, några mer än 8 meter höga. Länsstyrelsen kallar dem Gotlands mest fotograferade raukar, och de finns på baksidan av 200-kronorssedeln. Reservatet på nordligaste Fårö är 480 hektar.' },
      // KÄLLA: https://gotland.com/companies/sudersand/ — "En av Gotlands absolut vackraste och längsta sandstränder är Sudersand som ligger på Fårö. Idealisk för barnfamiljer med mjuk len sand och långgrunt vatten. Restaurang, café, kiosk osv finns i närheten." (läst 2026-09-27)
      { icon: '🏖', name: 'Sudersandstranden', desc: 'En av Gotlands längsta sandstränder, med mjuk sand och långgrunt vatten som passar barnfamiljer. Restaurang, café och kiosk finns i närheten.' },
      // KÄLLA: https://gotland.com/companies/bergmancenter/ — "Bergmancenter är ett kulturcentrum med utställningar, skaparverkstad, kafé och biograf.", "Varje sommar, veckan efter midsommar, arrangerar Bergmancenter Bergmanveckan"; https://bergmancenter.se/besok-oss/utstallningar/ — "2009 blev Bergmans fastigheter på ön ett konstnärsresidens, Bergmangårdarna, och är inte tillgängligt för allmänheten.", "Men i Bergmancenters VR-vandring kan du ändå besöka Bergmans hus!" (läst 2026-09-27)
      { icon: '🎬', name: 'Bergmancenter', desc: 'Kulturcentrum med utställningar om Ingmar Bergman och Fårö, kafé och biograf; veckan efter midsommar arrangeras filmfestivalen Bergmanveckan. Bergmans hus vid Hammars är konstnärsresidens och inte öppet för allmänheten, men går att se i Bergmancenters VR-vandring.' },
      // KÄLLA: https://verktygsladan.gotland.com/companies/broa-kiosken-faro/ — "Cykeluthyrning.", "Perfekt för dig som besöker ön utan bil."; https://gotland.com/besoka-uppleva/upptack-norra-gotland/ — "Det går endast bussar på Fårö under sommartid, från mitten av juni till mitten av augusti." (läst 2026-09-27)
      { icon: '🚲', name: 'Cykla Fårö', desc: 'Cykel hyrs vid Broa Kiosken vid färjeläget på Fårösidan. Buss går på Fårö bara från mitten av juni till mitten av augusti, så resten av året är cykel eller bil sättet att ta sig mellan stränder och raukområden.' },
      // KÄLLA: https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/gamla-hamn.html — "är namn på den så karaktäristiska rauken som står i reservatet", "Naturreservatet Gamla hamn omfattar dels en mot nordväst utskjutande klippudde vid den södra änden av Lautervik", "ligger ett 15-tal gravar som sannolikt är från vikingatid", "Den brukar kallas S:t Olofs kyrka", "Gamla hamn ligger drygt 4 km nordväst om Fårö k:a." (läst 2026-09-27)
      { icon: '⛵', name: 'Gamla Hamn', desc: 'Naturreservat drygt 4 km nordväst om Fårö kyrka, vid södra änden av Lautervik. Här står raukporten Kaffepannan (även kallad Hunden), ett 15-tal gravar sannolikt från vikingatid och resterna av S:t Olofs kyrka. Vattensamlingen norr om kyrkan var hamn under vikingatid och tidig medeltid.' },
    ],
    accommodation: [
      // KÄLLA: https://gotland.com/companies/sudersand-resort/ — "Bo i stuga, hus, villa, hotellrum eller på camping – alldeles nära Sudersands strand", "Alla campingplatser på strandcampingen inom 100m från badstranden." (läst 2026-09-27)
      { name: 'Sudersand Resort', type: 'Hotell/Camping', desc: 'Stugor, hus, villor, hotellrum och strandcamping vid Sudersand; alla campingplatser ligger inom 100 meter från badstranden.', websiteUrl: 'https://www.sudersand.se/sv' },
      // KÄLLA: https://gotland.com/companies/farogarden-bb-och-vandrarhem/ — "I vackra Fårö östra skola från 1850 huserar Fårögårdens mysiga B&B."; https://farogarden.se/ — "boende på vandrarhemmet", "Vi har lunchöppet" (läst 2026-09-27)
      { name: 'Fårögården', type: 'B&B/Vandrarhem', desc: 'B&B och vandrarhem i Fårö östra skola från 1850, med egen restaurang.', websiteUrl: 'https://farogarden.se/' },
      // KÄLLA: https://gotland.com/companies/stallplats-lauterhorn/ — "Naturskön ställplats vid Lauters gästhamn på Fårö. Elplatser, toalett, latrintömning.", "Öppet året runt. Tillgång till dusch endast sommarsäsong maj-september." (läst 2026-09-27)
      { name: 'Ställplats Lauterhorn', type: 'Ställplats', desc: 'Ställplats för husbil vid Lauters gästhamn med el, toalett och latrintömning. Öppen året runt; dusch bara maj–september.', websiteUrl: 'https://gotland.com/companies/stallplats-lauterhorn/' },
    ],
    getting_there: [
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/farosundsleden/ — "Fårösundsleden går mellan Fårösund på norra Gotland och Broa på Fårö. Färjeledens längd är 1300 meter och överfartstiden är sex minuter. Resan med vägfärjan är avgiftsfri.", "Utöver dessa kategorier gäller rätt till förtur mellan 1 juni och 15 augusti för fast bosatta på Fårö" (läst 2026-09-27)
      // KÄLLA: https://gotland.com/companies/farofarjan-tidtabell/ — "Turer utöver ordinarie avgångar (även nattetid) kan beställas per telefon."; https://gotland.com/besoka-uppleva/upptack-norra-gotland/ — "Färjan till Fårö går varje hel och halv timme från Fårösund året runt" (läst 2026-09-27)
      { method: 'Avgiftsfri vägfärja Fårösund–Broa', from: 'Fårösund (Gotland)', time: '6 min', desc: 'Trafikverkets Fårösundsleden, 1 300 meter och sex minuters överfart, avgiftsfri. Färjan går året runt varje hel och halv timme och oftare på sommaren; extra turer, även nattetid, kan beställas per telefon. 1 juni–15 augusti har fast boende på Fårö förtur.', icon: '⛴' },
      // KÄLLA: https://www.destinationgotland.se/resa/ — "Res från Nynäshamn eller Oskarshamn", "På omkring tre timmar är du framme i Visby"; https://dokument.gotland.se:443/IntegrationService.svc/doc/content/55284 — "Giltig 2026-08-16–2027-06-12", Visby busstation 08.35 → Fårösund färjeläge 09.35 (läst 2026-09-27)
      { method: 'Destination Gotland + buss eller bil', from: 'Nynäshamn eller Oskarshamn', time: 'ca 3 h + 1 h', desc: 'Färja till Visby på omkring tre timmar. Från Visby busstation går buss 20 till Fårösund färjeläge på en timme (tidtabell 16 augusti 2026–12 juni 2027); på Fårö går buss bara från mitten av juni till mitten av augusti.', icon: '🚢' },
      // KÄLLA: https://gotland.com/gotland-convention-bureau/resa-till-och-fran-on/ — "Till Gotland flyger du dagligen från Arlanda med SAS, med en restid på cirka 40–45 minuter.", "Brommaflyg trafikerar även Visby från Bromma (ca 35 minuter)" (läst 2026-09-27)
      { method: 'Flyg + buss eller bil', from: 'Stockholm Arlanda / Bromma', time: 'ca 35–45 min flyg + 1 h', desc: 'SAS flyger dagligen från Arlanda till Visby (ca 40–45 min) och Brommaflyg från Bromma (ca 35 min). Från Visby buss 20 eller bil till Fårösund.', icon: '✈️' },
    ],
    transport_meta: {
      // UPPSKATTNING: from_city_min 300 = anslutning till Nynäshamn + färja ca 3 tim (https://www.destinationgotland.se/resa/) + buss 20 Visby–Fårösund 60 min (https://dokument.gotland.se:443/IntegrationService.svc/doc/content/55284) + färja 6 min; verklig restid beror på anslutningar.
      from_city_min: 300,
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/farosundsleden/ — "överfartstiden är sex minuter" (läst 2026-09-27)
      nearest_hub: 'Fårösund',
      from_nearest_hub_min: 6,
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/farosundsleden/ — "Resan med vägfärjan är avgiftsfri."; https://gotland.com/besoka-uppleva/upptack-norra-gotland/ — "Färjan till Fårö går varje hel och halv timme från Fårösund året runt, när det är många som vill åka under sommaren går färjorna oftare" (läst 2026-09-27)
      operator: 'Trafikverket Färjerederiet (Fårösundsleden, avgiftsfri)',
      frequency: 'Varje hel och halv timme året runt, oftare sommartid',
    },
    harbors: [
    ],
    restaurants: [
      // KÄLLA: https://gotland.com/companies/faro-strandcafe/ — "frukost, lunch, afterbeach och middag … Pizza, pasta, sallad, smårätter samt … kött & fiskrätter", säsong 2026; farostrandcafe.se — "Vid Sudersand resort"
      { name: 'Fårö Strandcafé', type: 'Restaurang/Bar', desc: 'Restaurang och bar vid Sudersand Resort. Frukost, lunch, afterbeach och middag; pizza, pasta, kött och fisk.', websiteUrl: 'https://farostrandcafe.se/' },
      // KÄLLA: https://verktygsladan.gotland.com/companies/broa-kiosken-faro/ — "Broa Kiosken Fårö", "glass, take away-kaffe, kylda drycker, snabbmat"
      { name: 'Broa Kiosken Fårö', type: 'Café/Kiosk', desc: 'Kiosk och café vid färjeläget i Broa. Glass, kaffe, kylda drycker och snabbmat.', websiteUrl: 'https://verktygsladan.gotland.com/companies/broa-kiosken-faro/' },
      // KÄLLA: https://gotland.com/activities/daglig-guidning/ — "Kafé Smultronstället på Fårö är Bergmancenters kafé och restaurang där du kan ta en fika, hemlagad lunch eller njuta av en glass i solen. Allt med utsikt över vackra Kyrkviken." (läst 2026-09-27)
      { name: 'Kafé Smultronstället', type: 'Kafé/Restaurang', desc: 'Bergmancenters kafé och restaurang med fika, hemlagad lunch och glass, med utsikt över Kyrkviken.', websiteUrl: 'https://bergmancenter.se/' },
    ],
    tips: [
      // KÄLLA: https://gotland.com/activities/daglig-guidning/ — "Varje dag mellan 1/7 och 31/8, kl. 13:00 kan du gå en guidad visning av vår fasta utställning", "Ingen bokning krävs – bara att dyka upp." (läst 2026-09-27)
      'Bergmancenters fasta utställning har guidad visning varje dag kl. 13 mellan 1 juli och 31 augusti – ingen bokning, bara dyk upp.',
      // KÄLLA: https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/langhammars.html — "förflytta eller bortföra sten, block eller fossil" (läst 2026-09-27)
      'Låt stenarna ligga vid Langhammars: i reservatet är det förbjudet att flytta eller föra bort sten, block eller fossil.',
      // KÄLLA: https://bergmancenter.se/besok-oss/utstallningar/ — "2009 blev Bergmans fastigheter på ön ett konstnärsresidens, Bergmangårdarna, och är inte tillgängligt för allmänheten.", "Men i Bergmancenters VR-vandring kan du ändå besöka Bergmans hus!" (läst 2026-09-27)
      'Bergmans hus vid Hammars går inte att besöka – det är konstnärsresidens – men i Bergmancenters VR-vandring kan du se dig om i huset.',
      // KÄLLA: https://verktygsladan.gotland.com/companies/broa-kiosken-faro/ — "Vid Broa Kiosken hittar du Fårö cykeluthyrning. Perfekt för dig som besöker ön utan bil."; https://gotland.com/besoka-uppleva/upptack-norra-gotland/ — "Det går endast bussar på Fårö under sommartid" (läst 2026-09-27)
      'Utan bil: hyr cykel vid Broa Kiosken direkt vid färjeläget. Buss på Fårö går bara från mitten av juni till mitten av augusti.',
    ],
    related: ['gotland', 'ulvon', 'arholma'],
    tags: ['natur', 'kultur', 'strand', 'cykling', 'historia', 'raukar'],
    insiderTips: [
      // KÄLLA: https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser/norsta-aurar — "Badplatsen Norsta Aurar på Fårö är en cirka fem kilometer lång, långgrund, sandstrand", "Skyltning mot badplatsen saknas, men badplatsen nås till fots från Fårö fyr." (läst 2026-09-27)
      'Norsta Aurar längst norrut är en cirka fem kilometer lång, långgrund sandstrand. Det finns ingen skyltning dit – stranden nås till fots från Fårö fyr.',
      // KÄLLA: https://gotland.com/article/bergman-and-faro/ — "In the late 1960s, Bergman formed production company Cinematograph with its headquarters on Fårö. Cinematograph productions included Fårö Document 1969 and 1979" (läst 2026-09-27)
      'Bergman gjorde två dokumentärer om ön, Fårödokument 1969 och Fårödokument 1979, genom produktionsbolaget Cinematograph som hade sitt huvudkontor på Fårö.',
    ],
    dog_friendly: true,
    // KÄLLA: https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/digerhuvud.html — "medföra okopplad hund, med undantag för tiden 1 november – 31 januari"; https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/allmant-om-region-gotlands-badplatser — "Enligt regionens Allmänna lokala ordningsföreskrifter får hundar under perioden 1 maj – 30 september inte vistas på vissa utpekade badplatser."; https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser/ekeviken — "Se eventuell skyltning." (läst 2026-09-27)
    dog_notes: 'I naturreservatet Digerhuvud ska hunden vara kopplad utom 1 november–31 januari. Enligt Region Gotlands ordningsföreskrifter får hundar 1 maj–30 september inte vara på vissa utpekade badplatser – se skyltningen på plats, till exempel vid Ekeviken och Norsta Aurar.',
    // KÄLLA: https://gotland.com/article/bergman-and-faro/ — "Ingmar Bergman first came to Fårö on a stormy April day in 1960.", "To put an end to the discussions he visited Fårö in order to have a reason to definitely decide on the Orkneys.", "Bergman would make three feature films, a TV series, two documentary films and a short film on Fårö", "is buried in Fårö Church Cemetery" (läst 2026-09-27)
    did_you_know: 'Bergman åkte till Fårö en stormig aprildag 1960 för att få ett skäl att välja Orkneyöarna som inspelningsplats för Såsom i en spegel. Det blev tvärtom: förutom den filmen gjorde han tre långfilmer, en tv-serie, två dokumentärer och en kortfilm på Fårö, och han ligger begravd på Fårö kyrkogård.',
    // KÄLLA: https://gotland.com/companies/sudersand-resort/ — "caféer, restauranger, pool, äventyrsgolf, padelbanor, lekplats, hembageri och lanthandel på gångavstånd", "Bo i stuga, hus, villa, hotellrum eller på camping" (läst 2026-09-27)
    amenities: {
      restaurant: true,
      shop: true,
      accommodation: true,
      beach: true,
      camping: true,
    },
    activity_meta: {
      // KÄLLA: https://verktygsladan.gotland.com/companies/broa-kiosken-faro/ — "Vid Broa Kiosken hittar du Fårö cykeluthyrning."; https://gotland.com/companies/sudersand/; https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser/ekeviken — "Badplatsen Ekeviken på Fårö är en cirka 900 meter lång, långgrund, sandstrand."; https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser/norsta-aurar — "Badplatsen Norsta Aurar" (läst 2026-09-27)
      cykel: { rental: true, notes: 'Cykeluthyrning vid Broa Kiosken vid färjeläget på Fårö.' },
      bad: { beaches: ['Sudersandstranden', 'Ekeviken', 'Norsta Aurar'] },
    },
    seasonal: {
      // KÄLLA: https://gotland.com/besoka-uppleva/upptack-norra-gotland/ — "Färjan till Fårö går varje hel och halv timme från Fårösund året runt"; https://gotland.com/companies/stallplats-lauterhorn/ — "Öppet året runt." (läst 2026-09-27)
      open: 'Året runt',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      // KÄLLA: https://gotland.com/companies/bergmancenter/ — "Varje sommar, veckan efter midsommar, arrangerar Bergmancenter Bergmanveckan"; https://gotland.com/activities/daglig-guidning/ — "Varje dag mellan 1/7 och 31/8, kl. 13:00"; https://bergmancenter.se/ — "I oktober stänger vi utställningen för säsongen."; https://gotland.com/besoka-uppleva/faronatta/ — "Fårönatta 19 september", "Det fullspäckade programmet är fyllt av musik, konst, matupplevelser" (läst 2026-09-27)
      bestReason: 'Veckan efter midsommar pågår Bergmanveckan, och 1 juli–31 augusti har Bergmancenter daglig guidning. I september är utställningen fortfarande öppen och Fårönatta fyller ön med musik, konst och mat – 2026 den 19 september.',
      // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/farosundsleden/ — "the priority lane for the ferry, valid between June 1 and August 15, is for permanent residents on Fårö" (läst 2026-09-27)
      warning: '1 juni–15 augusti har fast boende på Fårö och vissa andra trafikanter förtur till färjan i en egen fil.',
      months: ['limited','limited','limited','limited','limited','open','peak','peak','open','limited','limited','limited'],
    },

  },
  // ─── TRYSUNDA ─────────────────────────────────────────────────────────────
  {
    slug: 'trysunda',
    name: 'Trysunda',
    region: 'ovriga',
    regionLabel: 'Höga Kusten',
    emoji: '🏡',
    tagline: 'Höga Kustens pärlstav — ett levande 1700-tals fiskesamhälle utan bilar.',
    description: [
      'Trysunda är en av Höga Kustens mest välbevarade öar — ett fiskesamhälle som nästan inte förändrats sedan 1700-talet. Röda stugor tätt i tätt, byssgränder utan asfaltering och ett kapell från 1654 som fortfarande håller sommargudstjänster.',
      'Ön är bilfri och nås med passagerarfärja från fastlandet. Det är avsiktligt. Trysunda är en ö för dem som vill stanna, inte passera — för kajakpaddlaren, vandrandets entusiast och den som vill förstå vad Höga Kusten egentligen är bortom vybilarna.',
      'Höga Kusten är UNESCO:s världsarv för sin landhöjning — den snabbaste i världen. Trysundas klippor, stänk av havsnäring och det omgivande vidfrämmande tystnad är ett av världsarvets finaste kapitel.',
    ],
    facts: {
      area: 'ca 2 km²',
      population: 'ca 30 (helårsboende), ca 200 (sommar)',
      // KÄLLA: RAÄ bebyggelseregistret ('sannolikt byggt 1654') + Svenska kyrkan (1600-tal, målningar 1711).
      known_for: 'Välbevarat fiskesamhälle, kapell från 1654, bilfritt',
      season: 'Juni–Augusti',
    
      travel_time: 'ca 5 tim',
      character: 'Fiskeläge, Höga Kusten',
      best_for: 'Kajakpaddlare, fiskare, naturliv',
    },
    activities: [
      { icon: '⛵', name: 'Kajakpaddling', desc: 'Trysunda är ett nav för Höga Kustens kajak­rutter. Paddla till Ulvön (ca 45 min) eller längs klippkusten söderut.' },
      { icon: '⛪', name: 'Trysunda kapell', desc: 'Kapellet från 1654 är ett av Höga Kustens äldsta bevarade byggnader, med väggmålningar från 1711. Sommargudstjänster hålls än idag.' },
      { icon: '🥾', name: 'Vandring på ön', desc: 'Välmärkta leder runt öns klipp­kust och genom fiskesamhället. Utsikter över Ulvöfjärden.' },
      { icon: '🏊', name: 'Bad från klippor', desc: 'Klart, djupt vatten runt hela ön. Klassiska klipp­bad i skydd av vindstilla vikar.' },
      { icon: '🎣', name: 'Fiske', desc: 'Handlina, abborre och gädda i fjärdarna. Fråga på ön om rätt platser.' },
    ],
    accommodation: [
      { name: 'Trysunda Stugby', type: 'Stugor', desc: 'Enkla men charmiga stugor i fiskesamhällets hjärta. Boka tidigt — begränsat antal.' },
      { name: 'Tält på ön', type: 'Camping', desc: 'Tältning tillåten på utpekade platser. Kolla aktuella regler med länsstyrelsen.' },
    ],
    getting_there: [
      { method: 'Passagerarfärja från Ullånger/Bönhamn', from: 'Nordingrå-området', time: 'ca 45 min', desc: 'Sommarsäsong kör passagerarfärja från Bönhamn och/eller Ullånger. Kolla aktuella tidtabeller med Höga Kustens Båttrafik.', icon: '⛴' },
      { method: 'Passagerarfärja från Ulvöhamn', from: 'Ulvön', time: 'ca 20 min', desc: 'Möjligt att ta sig från Ulvön till Trysunda med båt. Kombinerbar dag­utflykt.', icon: '⛴' },
      { method: 'Kajak', from: 'Nordingrå / Ulvön', time: 'varierar', desc: 'Erfarna paddlare tar sig till Trysunda med kajak från Nordingrå-halvön (ca 5–6 km) eller från Ulvöhamn.', icon: '🚣' },
    ],
    transport_meta: {
      from_city_min: 300,
      nearest_hub: 'Kramfors / Härnösand',
      from_nearest_hub_min: 45,
      operator: 'Höga Kustens Båttrafik',
      frequency: 'Sommarsäsong — begränsade avgångar, kolla tidtabell',
    },
    harbors: [
      // KÄLLA: https://www.hogakusten.com/en/trysunda-guest-harbour — "Trysunda guest harbour", "Hamndjup: 3-7 m", bastu/dusch/toalett, bojförtöjning ca 25 platser
      { name: 'Trysunda gästhamn', desc: 'Gästhamn i fiskeläget med bojförtöjning, ca 25 platser. Bastu, dusch och toalett. Hamndjup 3–7 m.', fuel: false, service: ['dusch'] },
    ],
    restaurants: [
      // KÄLLA: https://www.hogakusten.com/en/trysunda-vandrarhem-skargardscafe — "homemade refreshments (fika) and meals, and a small grocery store"
      { name: 'Trysunda Vandrarhem & Skärgårdscafé', type: 'Café', desc: 'Vandrarhem och skärgårdscafé med hemlagad fika och mat samt liten livsmedelsbutik.', websiteUrl: 'https://www.hogakusten.com/en/trysunda-vandrarhem-skargardscafe' },
    ],
    tips: [
      'Boka färjebiljett och boende i god tid — Trysunda är liten och söks av många.',
      'Kombinerbar med Ulvön: ta färjan till Trysunda på förmiddagen, paddla eller ta båt till Ulvön på eftermiddagen.',
      'Ta med proviant — öns affär är minimal och stänger tidigt.',
      'Kapellet är öppet utan guide. Kliv in, det är värt fem tysta minuter.',
    ],
    related: ['ulvon', 'arholma', 'furusund'],
    tags: ['höga kusten', 'bilfritt', 'historia', 'kajak', 'UNESCO', 'natur', 'fiske'],
    insiderTips: [
      'Trysunda är inte Ulvöns surströmmings­glamour — den är stillsammare och mer autentisk. Perfekt om du vill ha Höga Kusten utan folkvimmel.',
      'De röda fiskebodarna längs hamnen fotograferas flitigt — men den egentliga pärlstaben är gränderna innanför, där husen ligger nästan axel mot axel.',
    ],
    dog_friendly: true,
    dog_notes: 'Hund tillåten på de flesta ödeplatser. Håll koppel i fiskesamhällets tätbebyggda delar.',
    did_you_know: 'Höga Kusten är ett UNESCO-världsarv för sin land­höjning — havsytan sjunker relativt land med ca 8 mm per år, den snabbaste landhöjningen i världen. Trysundas klippor som idag är strandbred var för 10 000 år sedan havsbotten.',
    amenities: {
      restaurant: true,
      shop: false,
      accommodation: true,
      beach: false,
      camping: true,
    },
    activity_meta: {
      kajak: { difficulty: 'medel', rental: false, notes: 'Kajakhyrning rekommenderas från fastlandet i Nordingrå' },
      bad: { beaches: ['Klippbad norra sidan', 'Skyddad vik vid hamnen'] },
    },
  },
  // ─── HANÖ ─────────────────────────────────────────────────────────────────
  {
    slug: 'hano',
    name: 'Hanö',
    region: 'ovriga',
    regionLabel: 'Blekinge',
    emoji: '⚓',
    tagline: 'Blekinges klippö — engelsk kyrkogård, raukar och vild Östersjönatur.',
    description: [
      'Hanö är en av Blekinges mest besökta öar — och en av de mest ovanliga. Stora delar av ön ingår i Hanö naturreservat (bildat 2017), här finns bofasta sedan 1830-talet, och ön nås med reguljär båt från Nogersund på Listerlandet. Det är ett resmål som kräver lite ansträngning, och som belönar den ansträngningen generöst.',
      'Det mest oväntade på Hanö är dess engelska historia. Under Napoleonkrigen 1810–1812 använde brittiska Royal Navy Hanö som flottbas i Östersjön. Sjömän som dog under övervintringen begravdes på ön — kyrkogården är i dag en av de märkligaste platserna längs hela svenska kusten.',
      'Naturen är dramatisk: kuperade klippor, barrskog, strandhed och den steniga stranden vid Engelskabadet. En liten fyr markerar öns höjdpunkt.',
    ],
    facts: {
      area: '2,8 km²',
      // KÄLLA: Länsstyrelsen Blekinge — naturreservat 2017 (192 ha land), bofast befolkning sedan 1830-talet, båt från Nogersund (2026-08-23)
      population: 'Litet antal bofasta (fast befolkning sedan 1830-talet)',
      known_for: 'Engelsk kyrkogård, naturreservat, klipplandskap',
      season: 'Maj–September',
    
      travel_time: 'Kort överfart med reguljär båt från Nogersund',
      character: 'Historia, naturreservat',
      best_for: 'Historieintresserade, vandrare, fågelskådare',
    },
    activities: [
      { icon: '⚱️', name: 'Engelska kyrkogården', desc: 'Brittiska sjömän begravda 1810–1812. En av Sverige mest ovanliga historiska platser — läs inskriptionerna och unna dig ett stilla ögonblick.' },
      { icon: '🥾', name: 'Vandringsleder', desc: 'Välmärkta leder runt hela ön, ca 8 km totalt. Klippstränder, barrskog och vid utsikt över Hanöbukten.' },
      { icon: '🏊', name: 'Engelskabadet', desc: 'Öns populäraste badplats. Stenig strand med klart vatten och tillräcklig avskildheten för att kännas som en hemlighet.' },
      { icon: '🦅', name: 'Fågelskådning', desc: 'Hanö är rastplats för sträckande fåglar höst och vår. Havsörn observeras regelbundet.' },
      { icon: '🏠', name: 'Fyren', desc: 'Hanös gamla fyr på öns högsta punkt. Fri att besöka — fin utsikt över Östersjön och mot fastlandet.' },
    ],
    accommodation: [
      { name: 'Tält på Hanö', type: 'Camping', desc: 'Tältning tillåten i naturreservatet på anvisad plats. Ta med allt du behöver — ingen service på ön.' },
    ],
    getting_there: [
      { method: 'Båt från Karlshamn', from: 'Karlshamn', time: 'ca 45 min', desc: 'Passagerarfärja sommarsäsong. Kolla aktuella avgångstider med Karlshamns Turism eller lokala båtoperatörer.', icon: '⛴' },
      { method: 'Privat- eller charterbåt', from: 'Karlshamn / Sölvesborg', time: '30–60 min', desc: 'Egen båt eller chartrad — Hanöbukten är öppen vatten, undvik vid kuling.', icon: '⛵' },
    ],
    transport_meta: {
      from_city_min: 240,
      nearest_hub: 'Karlshamn',
      from_nearest_hub_min: 45,
      operator: 'Lokal båtoperatör (sommarsäsong)',
      frequency: 'Begränsade avgångar, kolla tidtabell',
    },
    harbors: [
      // KÄLLA: https://www.visitblekinge.se/en/guest-harbour-hano — "Guest harbor with 74 berths in Hanö Harbor", "WIFI is available in the harbor as well as shower and laundry facilities for boat guests. There is a sauna to rent a short distance from the harbor office." hano.nu/hamnen är blockerad av robots.txt och gick inte att läsa; 75 platser, byalaget, el, vatten och drivmedelsuppgiften är därför obelagda och borttagna.
      { name: 'Hanö gästhamn', desc: 'Gästhamn med 74 gästplatser. Wifi, dusch och tvättmöjligheter för båtgäster. Bastu finns att hyra en bit från hamnkontoret.', service: ['dusch', 'tvätt', 'wifi'] },
    ],
    restaurants: [],
    tips: [
      'Ta med all mat, vatten och utrustning — ingenting säljs på ön.',
      'Den engelska kyrkogården är liten men djupt stämningsfull. Ta dig tid.',
      'Kolla väderprognoser noga — Hanöbukten är öppet hav och trafiken ställs in vid sämre väder.',
      'Kombinerbar med Karlskrona: ligga i Karlskrona, dagstur till Hanö.',
    ],
    related: ['gotland', 'ulvon', 'landsort'],
    tags: ['historia', 'natur', 'naturreservat', 'fågelskådning', 'blekinge', 'dagsutflykt'],
    insiderTips: [
      'De flesta besöker Hanö på dagsutflykt. Att övernatta med tält ger en helt annan upplevelse — tidig morgon på klipporna med havsörn och ingenting annat.',
      'Den engelska kyrkogårdens stenar är vittrade men läsliga. Sjömanens namn, skeppets namn, dödsdatum — det finns berättelser i varje sten.',
    ],
    dog_friendly: true,
    dog_notes: 'Hund tillåten i naturreservatet. Håll koppel nära fågelhäcknings­områden — perioderna varierar, vanligen någon gång mellan 1 februari och 31 augusti enligt skyltarna.',
    did_you_know: 'Under Napoleonkrigen blockerade brittiska flottan Napoleons allierades hamnar i Östersjön. Hanö valdes som bas för sin strategiska position och naturliga hamn. Mer än 200 brittiska sjömän avled och begravdes på ön under åren 1810–1812.',
    amenities: {
      restaurant: false,
      shop: false,
      accommodation: false,
      beach: true,
      camping: true,
    },
    activity_meta: {
      bad: { beaches: ['Engelskabadet', 'Norra klippstranden'] },
      fiske: true,
    },
  },
  // ─── SVARTLÖGA ───────────────────────────────────────────────────────────
  {
    slug: 'svartloga',
    name: 'Svartlöga',
    region: 'norra',
    emoji: '🌑',
    tagline: 'Norra skärgårdens mest avskilda ö — ytterskärgård utan bilar och affärer.',
    description: [
      'Svartlöga är en av Stockholms skärgårds mest avlägsna och orörda öar. Belägen långt ut i norra skärgården, ca 7 timmar med Waxholmsbolaget från Stockholm, är Svartlöga ett resmål för dem som söker äkta ytterskärgård utan kompromisser: inga bilar, ingen affär och mycket lite folk utanför högsäsongen.',
      'Ön är bilfri och knappt 3 km² stor med en fast befolkning om bara några tiotal helårsboende. Naturen domineras av tallskogsklippornas karaktär — lavtäckta berghällar som möter öppet Östersjövatten. Havsörn och säl syns regelbundet.',
      'Svartlöga är en av de öar i Stockholms skärgård som kräver planering och tålamod att nå — och det är precis det som gör det värt det.',
    ],
    facts: {
      area: 'ca 3 km²',
      population: 'ca 20–30 (helårsboende)',
      known_for: 'Ytterskärgård, bilfritt, havsörn, absolut avskildhet',
      season: 'Juni–Augusti',
    
      travel_time: 'ca 4 tim från Strömkajen (linje 26)',
      character: 'Vild ytterskärgård',
      best_for: 'Seglare, naturentusiaster, havsörn',
    },
    activities: [
      { icon: '🦅', name: 'Havsörn & säl', desc: 'Norra ytterskärgården hyser en stark population av havsörn. Säl observeras på klipporna i öns yttre delar.' },
      { icon: '⛺', name: 'Tältning', desc: 'Allemansrätten gäller. Klipporna erbjuder unika tältplatser med öppet havsläge och solnedgångar österut.' },
      { icon: '🚣', name: 'Kajak', desc: 'Paddla runt ön och utforska de omgivande skären. Lugn och skyddad inre fjärd på västra sidan.' },
    ],
    accommodation: [
      { name: 'Tältning på klipporna', type: 'Camping', desc: 'Inga bokningsbara boenden. Ta med tält och allt du behöver.' },
    ],
    // KÄLLA: Waxholmsbolaget linje 26 (https://kund.printhuset-sthlm.se/wa/v26.pdf): Svartlöga är näst sista bryggan före Rödlöga, ca 3,5–4 h från Strömkajen (läst 2026-09-14)
    getting_there: [
      { method: 'Waxholmsbolaget', from: 'Stockholm (Strömkajen)', time: 'ca 4 tim', desc: 'Waxholmsbolagets linje 26 via norra skärgårdens öar; Svartlöga ligger ett stopp före Rödlöga. Kolla aktuell tidtabell på waxholmsbolaget.se — avgångarna är sällsynta.', icon: '⛴' },
      { method: 'Privat båt', desc: 'Med egen båt är det det naturliga sättet att besöka ön.', icon: '⛵' },
    ],
    transport_meta: {
      from_city_min: 400,
      nearest_hub: 'Furusund / Norrtälje',
      from_nearest_hub_min: 50,
      operator: 'Waxholmsbolaget / privat båt',
      frequency: 'Sällsynta avgångar — kolla tidtabell noggrant',
    },
    harbors: [
    ],
    restaurants: [],
    tips: [
      'Ta med allt — mat, vatten, utrustning. Ingenting säljs på ön.',
      'Kolla Waxholmsbolagets tidtabell noga. Avgångarna är begränsade och missar du sista båten stannar du kvar.',
      'Svartlöga är bäst under veckorna, inte helgerna i juli. Lugnet är poängen.',
    ],
    related: ['arholma', 'rodloga', 'fejan'],
    tags: ['ytterskärgård', 'bilfritt', 'natur', 'avskilt', 'norra skärgård', 'havsörn'],
    insiderTips: [
      'Solnedgången sedd från Svartlögas östklippa — med inget annat land synligt på horisonten — är en av skärgårdens mest oslagbara upplevelser.',
    ],
    did_you_know: 'Svartlöga är en av de öar i norra Stockholms skärgård som kallas "svart" av historiska skäl — de yttre, karga, mörkfärgade granitöarna fick epitetet "svart" för att skilja dem från de inre, skogklädda "gröna" öarna.',
    amenities: { restaurant: false, shop: false, accommodation: false, beach: false, camping: true },
    activity_meta: {
      kajak: { difficulty: 'medel', rental: false, notes: 'Ta med egen kajak — ingen uthyrning på ön' },
      bad: { beaches: ['Klippbad östra sidan'] },
    },
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli',
      best: 'Mitten av juni',
      bestReason: 'Yttre norrskärgård med dramatiska solnedgångar — bäst besökt precis före högsäsongen när öarna är tomma.',
      warning: 'Inga reguljära förbindelser. Kräver egen båt och god väderkunskap.',
      months: ['off','off','off','off','off','open','peak','open','limited','off','off','off'],
    },

  },
  // ─── VISINGSÖ ────────────────────────────────────────────────────────────
  {
    slug: 'visingo',
    name: 'Visingsö',
    region: 'ovriga',
    regionLabel: 'Vättern',
    emoji: '🏇',
    tagline: 'Vätterns sagolika ö — Brahehus, ekskog och hästskjuts i en av Europas klaraste sjöar.',
    description: [
      'Visingsö är en långsmal ö i södra Vättern, ett par kilometer utanför Gränna i Jönköpings län. Ön är 14 km lång och känd för sin dramatiska historia, märkliga natur och det faktum att man tar sig runt med häst och vagn — en tradition som lockar hundratusentals besökare varje år.',
      'Ruinerna av Brahehus (1600-tal) och Näs slott (medeltid) ger historisk tyngd, och ekskogen som planterades på 1800-talet för att ge virke till den svenska flottan täcker idag delar av ön med en urgammal karaktär.',
      // KÄLLA: Vätternvårdsförbundet (vattern.org) — näringsfattig klarvattensjö, siktdjup 15–16 m.
      'Vättern är en näringsfattig klarvattensjö med siktdjup på hela 15–16 meter. Bad och fiske hör sommaren till.',
    ],
    facts: {
      area: 'ca 24 km²',
      population: 'ca 800 (helårsboende)',
      known_for: 'Brahehus ruiner, ekskogen, häst­skjuts, Vätterns klara vatten',
      season: 'Maj–September',
    
      travel_time: 'ca 3 tim',
      character: 'Historisk Vätternö',
      best_for: 'Historieintresserade, familjer, cyklister',
    },
    activities: [
      { icon: '🏇', name: 'Häst och vagn', desc: 'En av Visingsös signaturer. Ta häst­skjuts från färjeläget och åk runt ön i traditionellt stil.' },
      { icon: '🏰', name: 'Brahehus', desc: 'Ruinerna av Per Brahes slott (1600-tal) på en klippudde med fantastisk utsikt över Vättern mot Gränna och fastlandet.' },
      { icon: '🌳', name: 'Ekskogen', desc: 'En av Sveriges mest ovanliga skogar — planterad på 1800-talet för flottans framtida virkesbe­hov. En djup, urskogsaktig upplevelse.' },
      { icon: '🏊', name: 'Bad i Vättern', desc: 'Vätterns klara vatten ger ett av Sveriges renaste badsäsonger. Sandstränder på öns östra sida.' },
    ],
    accommodation: [
      { name: 'Visingsö Vandrarhem', type: 'Vandrarhem', desc: 'Vandrarhem och stuguthyrning på ön. Boka i god tid sommartid.' },
    ],
    getting_there: [
      { method: 'Bilfärja från Gränna', from: 'Gränna', time: 'ca 25 min', desc: 'Visingsöbåten trafikerar rutten Gränna–Visingsö dagligen. Bilen kan tas med sommartid. Gränna nås med bil (ca 30 min söder om Jönköping längs E4) eller buss från Jönköping.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 200,
      nearest_hub: 'Gränna',
      from_nearest_hub_min: 25,
      operator: 'Visingsöbåten',
      frequency: 'Dagligen, sommarsäsong täta avgångar',
    },
    harbors: [
      // KÄLLA: https://www.jonkoping.se/ (båtplatser, hamnar och gästhamnar) — "Gästhamn på Visingsö … Färskvatten, Toalett, Dusch, Eluttag, Latrintömning … Från 0,6 m till 1 m"; jkpg.com/gasthamnar — "nedanför Visingsborgs slottsruin"
      { name: 'Visingsö gästhamn', desc: 'Gästhamn nedanför Visingsborgs slottsruin. Färskvatten, el, dusch, toalett och latrintömning. Djup vid gästplatserna 0,6–1 m.', fuel: false, service: ['el', 'vatten', 'dusch'] },
    ],
    restaurants: [
    ],
    tips: [
      'Ta häst­skjuts direkt när du kliver av färjan — det är en del av Visingsöupplevelsen.',
      'Brahehus är mest magiskt i solnedgången. Planer din dag dit mot kvällen.',
      'Cykelhyra finns på ön — perfekt för att ta sig runt på egna villkor.',
    ],
    related: ['oland', 'gotland', 'birka'],
    tags: ['historia', 'natur', 'bad', 'familjer', 'vättern', 'kulturarv'],
    insiderTips: [
      'Eken i Ekskogen är planterad specifikt för att ge mastvirke till 1800-talets örlogsfartyg. Skogen är redo att avverkas runt år 2050 — en gåva från ett sekel till nästa.',
    ],
    did_you_know: 'Visingsö var säte för den mäktiga Brahe-ätten på 1600-talet. Per Brahe d.y., riksdrots och Finlands generalguvern­ör, grundade bland annat Brahehus och Brahestads stad (nuv. Brahestad i Finland) härifrån.',
    amenities: { restaurant: true, shop: true, accommodation: true, beach: true, camping: false },
    activity_meta: {
      cykel: { rental: true, notes: 'Cykelhyra vid färjeläget' },
      bad: { beaches: ['Österstrand', 'Norra sandstranden'] },
    },
  },
  // ─── VEN ─────────────────────────────────────────────────────────────────
  {
    slug: 'ven',
    name: 'Ven',
    region: 'ovriga',
    regionLabel: 'Öresund',
    emoji: '🔭',
    tagline: 'Tycho Brahes ö i Öresund — observatorieruiner, vindruvor och cykelleder.',
    description: [
      'Ven (historiskt Hven) är en liten ö i Öresund mellan Landskrona och Helsingborg. Ön är globalt känd som platsen där den danske astronomen Tycho Brahe grundade Uraniborg 1576 — ett av de första observatorier som byggdes uteslutande för astronomiska observationer, och platsen därifrån han kartlade planeters rörelser med en precision som inte skulle överträffas förrän teleskopet uppfanns.',
      'I dag är Ven ett populärt utflyktsmål sommartid med cykelleder runt hela ön, Tycho Brahes museum och klipputsikter mot Öresundsbrons silhuett och danska kusten. Vingårdar har etablerats på ön de senaste decennierna — Vens mikroklimat med lång solskenstid och klarblå Öresunds-vind visar sig lämpa sig för odling.',
    ],
    facts: {
      area: 'ca 7,5 km²',
      population: 'ca 400 (helårsboende)',
      known_for: 'Tycho Brahes Uraniborg, astronomisk historia, cykelleder, vingårdar',
      season: 'April–Oktober',
    
      travel_time: 'ca 1,5 tim',
      character: 'Astronomisk öklassiker',
      best_for: 'Cyklister, historieintresserade, vingårdsbesök',
    },
    activities: [
      { icon: '🔭', name: 'Tycho Brahe Museum', desc: 'Museum om den store astronomen och hans observatorier Uraniborg och Stjärneborg. Resterna av Stjärneborg är bevarade och synliga.' },
      { icon: '🚴', name: 'Cykling runt ön', desc: 'Ca 8 km runt hela Ven. Välmarkerade leder via klipputsikter, kyrkan S:t Ibbs och lantliga vägar.' },
      { icon: '🍷', name: 'Vingårdar', desc: 'Vens vingårdar producerar vita och rosé­viner. Vingårdsbesök och provning sommartid — kolla Ven Vineyard och Backaskog.' },
    ],
    accommodation: [
      { name: 'Stuguthyrning Ven', type: 'Stugor', desc: 'Stugor och B&B via lokala uthyrare. Boka i god tid sommartid.' },
    ],
    getting_there: [
      { method: 'Passagerarfärja från Landskrona', from: 'Landskrona', time: 'ca 25 min', desc: 'Färja till Ven trafikeras av Ven Ferries och Öresundsfärjan. Avgångar dagligen, tätt sommartid. Kolla aktuella tider och priser på fergudansen.dk eller lokala operatörers sajter.', icon: '⛴' },
      { method: 'Tåg + färja', from: 'Malmö / Helsingborg → Landskrona', time: 'ca 60–80 min totalt', desc: 'Tåg till Landskrona C (Pågatågen/SJ) sedan promenad till färjeterminalen. Hela resan från Malmö/Helsingborg ca 60–80 min.', icon: '🚆' },
    ],
    transport_meta: {
      from_city_min: 75,
      nearest_hub: 'Landskrona',
      from_nearest_hub_min: 25,
      operator: 'Ven Ferries / lokala operatörer',
      frequency: 'Dagligen, sommartid täta avgångar',
    },
    harbors: [
    ],
    restaurants: [
    ],
    tips: [
      'Hyr cykel direkt vid färjeläget i Kyrkbacken — det är det naturliga sättet att se hela ön.',
      'Tycho Brahes museum är litet men välgjort. Kombinera med ett besök till Stjärneborg-ruinerna.',
      'Vens vingårdar har ofta drop-in provning vid besök, men ring och bekräfta på sommaren.',
    ],
    related: ['gotland', 'bornholm', 'oland'],
    tags: ['historia', 'astronomi', 'cykling', 'vingård', 'öresund', 'dagsutflykt', 'skåne'],
    insiderTips: [
      'Ta kvällsfärjan hem och se solen gå ner mot Öresundsbron på vägen tillbaka — en av Sydsveriges vackraste kvällsvyer.',
    ],
    did_you_know: 'Tycho Brahe observerade från Ven 1576–1597. Hans mätningar av Marspositionen gav Johannes Kepler det data han behövde för att formulera planetrörelsens lagar — fundamentet för modern astronomi. Allt det skedde på den lilla ön mitt i Öresund.',
    amenities: { restaurant: true, shop: true, accommodation: true, beach: false, camping: false },
    activity_meta: {
      cykel: { rental: true, notes: 'Cykelhyra vid Kyrkbacken färjeläge' },
      bad: { beaches: ['Klippbad östra sidan'] },
    },
  },
  // ─── TJÄRÖ ───────────────────────────────────────────────────────────────
  {
    slug: 'tjaro',
    name: 'Tjärö',
    region: 'ovriga',
    regionLabel: 'Blekinge',
    emoji: '🏕',
    // KÄLLA: Länsstyrelsen Blekinge, naturreservat Tjärö (https://www.lansstyrelsen.se/blekinge/besoksmal/naturreservat/tjaro.html) — skyddat 1976, förvaltas av Länsstyrelsen (läst 2026-09-14)
    tagline: 'Blekinges naturreservat med sandstränder — camping och urskogar vid Östersjön.',
    description: [
      // KÄLLA: Länsstyrelsen Blekinge, naturreservat Tjärö (https://www.lansstyrelsen.se/blekinge/besoksmal/naturreservat/tjaro.html) (läst 2026-08-23)
      'Tjärö är ett naturreservat och en av Blekinges vackraste öar — en skogig klippö i Ronneby kommuns ytterskärgård med vita sandstränder, tallskogsmiljöer och ett rikt maritimt fågelliv.',
      'Ön är nästan bilfri och känd för sin välordnade camping som driftas av Blekinges naturturism. Sandstranden på öns sydöstra sida är en av de finaste längs hela Blekingekusten. Tjärö är ett populärt mål för familjer, vandrare och kajakpaddlare.',
    ],
    facts: {
      area: 'ca 1,5 km²',
      population: '0 (naturreservat)',
      known_for: 'Sandstrand, naturreservat, camping, fågelskådning',
      season: 'Maj–September',
    
      travel_time: 'ca 4 tim',
      character: 'Sandstrand, naturreservat',
      best_for: 'Barnfamiljer, campare, bad',
    },
    activities: [
      { icon: '🏕', name: 'Camping på naturreservat', desc: 'Välskött camping i naturreservat med stugor, tältplatser och kanotuthyrning. Boka i god tid sommartid.' },
      { icon: '🏊', name: 'Sandstrand', desc: 'Öns sydöstra sandstrand är en av Blekinges finaste med vitt sand och klart Östersjövatten.' },
      { icon: '🚣', name: 'Kajak', desc: 'Kajakpaddling runt ön och till omgivande kobbar. Uthyrning finns via campingen.' },
      { icon: '🦅', name: 'Fågelskådning', desc: 'Havsörn, fisktärna och ett rikt spektrum av kustfåglar under häckningssäsongen.' },
    ],
    accommodation: [
      { name: 'Tjärö Camping & Stugor', type: 'Camping', desc: 'Driftas av Ronneby Naturturism. Campingplatser och enklare stugor. Boka via deras hemsida i god tid.' },
    ],
    getting_there: [
      { method: 'Båt från Ronneby / Karö', from: 'Ronneby / Karö brygga', time: 'ca 20–30 min', desc: 'Sommarbåt till Tjärö från Ronneby/Karö-området. Kolla Ronneby Naturturisms aktuella tidtabell.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 250,
      nearest_hub: 'Ronneby',
      from_nearest_hub_min: 25,
      operator: 'Ronneby Naturturism',
      frequency: 'Sommarsäsong — kolla aktuell tidtabell',
    },
    harbors: [
      // KÄLLA: https://www.visitblekinge.se/gasthamn-tjaro — "Cirka 70 stycken båtplatser totalt … Maren vid restaurangen … Seglarbryggan", el och vatten vid gästplatser
      { name: 'Gästhamn Tjärö', desc: 'Gästhamn med ca 70 platser vid två bryggor: Maren vid restaurangen och Seglarbryggan. El och vatten vid gästplatserna.', fuel: false, service: ['el', 'vatten'] },
    ],
    restaurants: [
      // KÄLLA: https://www.visitblekinge.se/en/tjaro-cafe — "Tjärö Cafe"; tjaro.com/restaurant-cafe — "sandwiches, salads, Tjärös räksmörgås, Tjärö waffle, soft ice cream", säsong 2026
      { name: 'Tjärö Café', type: 'Café', desc: 'Café vid restaurangen med smörgåsar, räksmörgås, våffla, glass och fika. Säsongsöppet.', websiteUrl: 'https://tjaro.com/' },
    ],
    tips: [
      'Boka campingplats/stuga tidigt — Tjärö är ett populärt Blekingemål och tar slut i juli.',
      'Sandstranden på sydöstsidan är öns finaste. Gå dit tidigt på morgonen för att ha den för dig själv.',
    ],
    related: ['hano', 'aspo-blekinge', 'sturko'],
    tags: ['blekinge', 'naturreservat', 'sandstrand', 'camping', 'kajak', 'familjer'],
    did_you_know: 'Tjärö naturreservat är ett av Blekinges mest uppskattade friluftsmål. Öns blandning av sandstrand, urskog och Östersjöklippor är ovanlig — de flesta kustöar i söder har antingen sand eller klippa, sällan båda.',
    amenities: { restaurant: true, shop: false, accommodation: true, beach: true, camping: true },
    activity_meta: {
      kajak: { difficulty: 'lätt–medel', rental: true, notes: 'Kajakhyrning via campingen' },
      bad: { beaches: ['Sydöstra sandstranden', 'Norra klippbad'] },
    },
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Juni eller mitten av augusti',
      // KÄLLA: Länsstyrelsen Blekinge, naturreservat Tjärö (https://www.lansstyrelsen.se/blekinge/besoksmal/naturreservat/tjaro.html) (1976)
      bestReason: 'Tjärö naturreservat med sandstrand och camping i Blekinge. I juni: tomt och mysigt. Mitten av aug: varmt hav utan juli-trängseln.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },

  },
  // ─── ÖCKERÖ ──────────────────────────────────────────────────────────────
  {
    slug: 'ockero',
    name: 'Öckerö',
    region: 'goteborg',
    regionLabel: 'Göteborgs norra skärgård',
    emoji: '🚢',
    tagline: 'Göteborgs fiskeö — sjöfartens hjärta och Hönöleden utanför hamnen.',
    description: [
      'Öckerö är huvudön i Öckerö kommun — en samling öar i Göteborgs norra skärgård med djupa rötter i sjöfart och fiske. Ön är broförbunden med Öckeröarkipelagen och nås med Västtrafiks färjelinje från Hinsholmen i Göteborg.',
      'Öckerö och de omgivande öarna — Hönö, Björkö, Fotö, Kalvsund, Hyppeln — bildar en levande skärgård med genuina fiskesamhällen. Sjöfartsträditionen är stark: Öckerö är en av de kommuner i Sverige med flest sjökapten per capita.',
      'Som utflyktsmål erbjuder Öckerö klippor, fiskehamnar och en autentisk skärgårds­känsla utan turisttrycket på Bohusläns mer kända öar.',
    ],
    facts: {
      area: 'ca 3 km²',
      population: 'ca 4 500 (Öckerö ö, hela kommunen ca 13 000)',
      known_for: 'Sjöfart, fiske, Öckerö-skärgård, Hönöleden',
      season: 'Hela året (Göteborg-närheten)',
    
      travel_time: 'ca 40 min',
      character: 'Fiske, sjöfart, skaldjur',
      best_for: 'Matturister, familjer, dagsutflykt',
    },
    activities: [
      { icon: '🚢', name: 'Sjöfartshistoria', desc: 'Öckerö Sjöfartsmuseum (kolla öppettider) och de många fiskehamnarnas berättelser. En av Sveriges mest sjöfartstäta kommuner.' },
      { icon: '🥾', name: 'Hönöleden', desc: 'Vandringsleder via brofar­bunden öar — Öckerö, Hönö, Björkö. Kombinera klippor, hamnar och fiskelägen.' },
      { icon: '🦞', name: 'Hummer & räkor', desc: 'Färska räkor och hummer säljs direkt från fiskebåtarna i hamnarna. En av de äkta upplevelserna i Göteborgsskärgården.' },
    ],
    accommodation: [
      { name: 'Stuguthyrning Öckerö', type: 'Stugor', desc: 'Privata stuguthyrningar och B&B via lokala uthyrare.' },
    ],
    getting_there: [
      { method: 'Västtrafik färja från Hinsholmen', from: 'Hinsholmen, Göteborg', time: 'ca 15–20 min', desc: 'Buss 281/282 från Göteborg C till Hinsholmen (ca 20 min), sedan färja till Öckerö. Hela resan ca 35–40 min från Göteborg C.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 40,
      nearest_hub: 'Hinsholmen (Göteborg)',
      from_nearest_hub_min: 18,
      operator: 'Västtrafik',
      frequency: 'Tät trafik hela dagen med SL-liknande turtäthet',
    },
    harbors: [
      // KÄLLA: https://ockerohamn.se/gasthamn-o-camping — "sydvästra delen av fiskehamnen", "moderna duschar och toaletter … inkluderat", "Trådlös bredbandsuppkoppling", diesel, tvättmaskiner, öppen 30 april–30 september
      { name: 'Öckerö gästhamn', desc: 'Gästhamn i sydvästra delen av fiskehamnen, drivs av Öckerö Hamn & Fiskareförening. El, dusch, bastu, tvättmaskin, wifi och diesel.', fuel: true, service: ['el', 'dusch', 'tvätt', 'wifi', 'bränsle'] },
    ],
    restaurants: [
    ],
    tips: [
      'Räkor direkt från fiskebåtarna i hamnen — billigare och färskare än någon restaurang.',
      'Kör eller gå vidare till Hönö och Björkö via broarna — hela Öckerö-archipelagen är värd att utforska.',
      'Västtrafik-kortet/reskassan gäller på färjan — ingen extra biljett behövs.',
    ],
    related: ['branno', 'styrso', 'vinga'],
    tags: ['göteborg', 'fiske', 'sjöfart', 'familjer', 'dagsutflykt', 'skaldjur'],
    did_you_know: 'Öckerö kommun har per capita fler sjöfarare och sjökaptener än nästan någon annan svensk kommun. Sjöfartstraditionens rötter sträcker sig till 1700-talets handel och fiske — en tradition som lever kvar i de marinmålade trähusen längs hamnkajerna.',
    amenities: { restaurant: true, shop: true, accommodation: true, beach: false, camping: false },
    activity_meta: { bad: { beaches: ['Klippbad östra sidan'] } },
  },
  // ─── RÖRÖ ────────────────────────────────────────────────────────────────
  {
    slug: 'roro',
    name: 'Rörö',
    region: 'goteborg',
    regionLabel: 'Göteborgs norra skärgård',
    emoji: '🔴',
    tagline: 'Göteborgs lilla bilfria skärgårdsö — fyr, klippor och räksmörgås vid hamnen.',
    description: [
      'Rörö är en liten bilfri ö i yttre Göteborgs­skärgård, nåbar med färja via Öckerö. Ön är känd för sin pittoreska fiskehamnsmiljö, fyren Rörö fyr och de dramatiska klipporna som möter Västerhavet på öns västra sida.',
      'Turistmässigt är Rörö Göteborgs svar på Smögen: kompakt, vackert och fullt av sommarstämning kring hamnen. Det finns en restaurang, en handelsbod och en gästhamn — men annars är det klipporna, badet och tystnaden som är poängen.',
    ],
    facts: {
      area: 'ca 0,5 km²',
      population: 'ca 100 (helårsboende)',
      known_for: 'Fyr, klippor, bilfritt, fiskehamn, Göteborgs skärgård',
      season: 'Juni–Augusti',
    
      travel_time: 'ca 50 min',
      character: 'Bilfritt, fyr, Västerhavet',
      best_for: 'Dagsutflykt, skaldjur, klippbad',
    },
    activities: [
      { icon: '🔴', name: 'Rörö fyr', desc: 'Fyren Rörö fyr är öns landmärke. Strosa längs klipporna fram till fyren och upplev den öppna Västerhavshoris­onten.' },
      { icon: '🏊', name: 'Klippbad Västerhavet', desc: 'Klart Västerhavsvatten längs öns västra och norra klippkust. Saltare och svalare än inre skärgårdsvatten.' },
      { icon: '🍤', name: 'Räksmörgås vid hamnen', desc: 'Fiskebåtarna levererar räkor direkt till hamnen. Sommarklassikern: räksmörgås och öl vid bryggkanten.' },
    ],
    accommodation: [
      { name: 'Stugor Rörö', type: 'Stugor', desc: 'Begränsat antal stuguthyrningar. Boka tidigt.' },
    ],
    getting_there: [
      { method: 'Västtrafik färja via Öckerö / Hönö', from: 'Hinsholmen, Göteborg → Öckerö → Rörö', time: 'ca 40–50 min totalt', desc: 'Ta Västtrafik-färjan från Hinsholmen till Öckerö/Hönö och byt till lokal linje mot Rörö. Kolla Västtrafiks reseplanerare för aktuella linjer och tider.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 50,
      nearest_hub: 'Öckerö / Hönö',
      from_nearest_hub_min: 15,
      operator: 'Västtrafik',
      frequency: 'Sommartid regelbundna avgångar',
    },
    harbors: [
      // KÄLLA: https://www.vastsverige.com:443/visitockero/produkter/gasthamn-roro/ (Öckerö kommun) — "vid farleden Göteborg och Marstrand … Serviceanläggning och spolplatta och septitankstömning". Drivmedel nämns inte av kommunen.
      { name: 'Rörö gästhamn', desc: 'Gästhamn vid farleden Göteborg–Marstrand. Serviceanläggning, spolplatta och septitankstömning.', fuel: false, service: [] },
    ],
    restaurants: [
      // KÄLLA: https://www.goteborg.com/platser/roro — "Rörö Fiskeboa & Krog … rätter med tydlig förankring i havet"; rorofiskeboakrog.se — "nykokta kräftor, räkor och fisk", "fish & chips"
      { name: 'Rörö Fiskeboa & Krog', type: 'Restaurang', desc: 'Krog och fiskbod vid hamnen. Nykokta kräftor, räkor och fisk samt fish & chips.', websiteUrl: 'https://rorofiskeboakrog.se/' },
    ],
    tips: [
      'Dagstur från Göteborg är perfekt — ut med morgonfärjan, lunch vid hamnen, hem till kvällen.',
      'Kombinera med Hönö eller Öckerö på samma resa.',
      'Ta med egna drycker — utbudet är begränsat.',
    ],
    related: ['ockero', 'hono', 'branno'],
    tags: ['göteborg', 'bilfritt', 'fyr', 'klippor', 'dagsutflykt', 'skaldjur'],
    did_you_know: 'Rörö fyr har väglett sjöfarten in mot Göteborg i mer än ett sekel. Ön har trots sin ringa storlek spelat en viktig roll i Västerhavet-sjöfartens historia.',
    amenities: { restaurant: true, shop: true, accommodation: true, beach: false, camping: false },
    activity_meta: { bad: { beaches: ['Norra klippbad', 'Västra klipputsprång'] } },
  },
  // ─── HOLMÖN ──────────────────────────────────────────────────────────────
  {
    slug: 'holmon',
    name: 'Holmön',
    region: 'ovriga',
    regionLabel: 'Västerbotten',
    emoji: '🦭',
    tagline: 'Nordens glömda skärgård — sälar, havsörn och öde Bottenhavsöar.',
    description: [
      'Holmön är en ö utanför Umeå i Västerbottens skärgård — en av de störst­a och vackraste öarna i norra Sverige men knappast känd utanför regionen. Det är precis det som gör den unik.',
      'Ön är ett naturreservat med dramatisk kustlinje, gammelska­lar och ett rikt djurliv. Säl, havsörn och vipa är vanliga inslag. Sommartid brusar strandängar av blomster och fågelliv — ett av norra Sveriges bäst bevarade kustnatur­landskap.',
      'Holmön nås med färja från Norrfjärden utanför Umeå. Resan tar ca 35 minuter och landar i en värld som känns som att kliva tillbaka ett sekel i tid.',
    ],
    facts: {
      area: 'ca 24 km²',
      population: 'ca 70 (helårsboende)',
      known_for: 'Naturreservat, sälar, havsörn, Bottenhavets ytterskärgård',
      season: 'Juni–Augusti',
    
      travel_time: 'ca 1 tim',
      // KÄLLA: Länsstyrelsen Västerbotten, naturreservat Holmöarna (https://www.lansstyrelsen.se/vasterbotten/besoksmal/naturreservat/holmoarna.html) — bildat 1980 och 1995, ca 25 000 ha (läst 2026-09-14)
      character: 'Holmöarnas naturreservat',
      best_for: 'Sälskådare, fågelskådare, naturentusiaster',
    },
    activities: [
      { icon: '🦭', name: 'Sälskådning', desc: 'Gråsäl och vikare håller till på öns yttre klippor och runt Holmöar­nas skärgård. Sälsafaris arrangeras sommartid.' },
      { icon: '🦅', name: 'Fågelskådning', desc: 'Holmön är en av Bottenhavet-regionens bästa fågelskådningslokaler. Havsörn, fiskgjuse och ett brett spektrum av vadare och sjöfåglar.' },
      { icon: '🥾', name: 'Vandring i naturreservat', desc: 'Välmärkta leder genom naturreservatet. Strandängar, tallskogar och klippkust. Ca 20 km leder runt ön.' },
      { icon: '🚴', name: 'Cykling', desc: 'Ön har ett enkelt vägsy­stem — cykeln är utmärkt för att ta sig runt. Hyr cykel vid färjeläget.' },
    ],
    accommodation: [
      { name: 'Holmöns Camping & Stugor', type: 'Camping', desc: 'Camping och enklare stugor. Kolla Holmöns turistbyrå för aktuellt utbud.' },
    ],
    getting_there: [
      { method: 'Färja från Norrfjärden', from: 'Norrfjärden (nära Umeå)', time: 'ca 35 min', desc: 'Holmöfärjan trafikerar Norrfjärden–Holmön dagligen. Norrfjärden nås med bil ca 25 min från Umeå centrum, eller buss från Umeå. Kolla Länstrafiken Västernorrland / Region Västerbotten för aktuell tidtabell.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 60,
      nearest_hub: 'Umeå / Norrfjärden',
      from_nearest_hub_min: 35,
      operator: 'Holmöfärjan / Region Västerbotten',
      frequency: 'Dagligen, sommarsäsong täta avgångar',
    },
    harbors: [
      // KÄLLA: https://www.holmon.se/hamnforeningen/gasthamn/ — "Gästhamn … Byviken … Hamnföreningen Byviken Holmön Ekonomisk förening … boj-förtöjning … en flytbrygga"
      { name: 'Byvikens gästhamn', desc: 'Gästhamn i Byviken, drivs av Hamnföreningen Byviken Holmön. Bojförtöjning och flytbrygga.', fuel: false, service: [] },
    ],
    restaurants: [
      // KÄLLA: https://visitumea.se/en/novas-holmon — "Novas Holmön … directly adjacent to where the ferry docks … BBQ, meat, fish, seafood and vegetarian food"
      { name: 'Novas Holmön', type: 'Restaurang', desc: 'Restaurang, bar och café intill färjeläget i Byviken. BBQ, kött, fisk, skaldjur och vegetariskt.', websiteUrl: 'https://visitumea.se/en/novas-holmon' },
    ],
    tips: [
      'Hyr cykel på ön direkt när du landar — du hinner runt hela ön på en dag.',
      'Sälfoto: sälarna är mest synliga på morgonen när de solar på ytterskären.',
      'Holmön är glest turistad — kom med en mer öppen agenda, utan för många förväntningar.',
    ],
    related: ['ulvon', 'hemson', 'trysunda'],
    tags: ['norrland', 'naturreservat', 'säl', 'fågelskådning', 'natur', 'avskilt', 'västerbotten'],
    insiderTips: [
      'Fråga lokalborna om de bästa platserna. Holmön är liten nog att alla känner varandra — och stora nog att det finns hemligheter de inte marknadsför.',
    ],
    did_you_know: 'Holmön är en av de öar längs Norrlandskusten som drabbades hårdast av landhöjningen efter istiden — havet steg relativt sett, men landet höjer sig fortfarande med ca 8 mm per år, vilket gör att strandlinjen förändras mätbart under en mänsklig livstid.',
    amenities: { restaurant: true, shop: false, accommodation: true, beach: false, camping: true },
    activity_meta: {
      cykel: { rental: true, notes: 'Cykelhyrning vid färjeläget' },
      bad: { beaches: ['Strandäng nordvästra sidan'] },
    },
  },
]

// ── Bohuslän-utvidgning (västkustens öar, sedan 2026-04) ─────────────────
import { BOHUSLAN_ISLANDS } from './bohuslan-data'

export const ALL_ISLANDS: Island[] = [...ISLANDS, ...(BOHUSLAN_ISLANDS as Island[])]

export function getIsland(slug: string): Island | undefined {
  return ALL_ISLANDS.find(i => i.slug === slug)
}

export function getIslandsByRegion(region: Island['region']): Island[] {
  return ALL_ISLANDS.filter(i => i.region === region)
}
