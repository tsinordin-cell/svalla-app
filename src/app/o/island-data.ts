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
   * Max ~60 tecken inkl. " | Svalla" (12 tecken) = 48 tecken för titeln.
   */
  seoTitle?: string
  /**
   * Anpassad meta description som ersätter den generiska mallen.
   * Ange för högtrafik-öar. Max ~155 tecken.
   */
  seoDescription?: string
  did_you_know?: string
  /**
   * Maskinläsbar transport-sammanfattning för /ta-dig-till/[slug] och BusTrip-schema.
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
    bad?: { beaches: (string | IslandBeach)[] }
    vandring?: { trails: number, max_km?: number }
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
  /** Hundvänlighet — för /oar/hundvanliga och ö-sida */
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
    tagline: 'Seglingsvatten, gammal lots- och tullplats och en by av trähus i ytterskärgården.',
    seoTitle: 'Sandhamn 2026 – restauranger, boende & seglarkultur',
    seoDescription: 'Guide till Sandhamn: restauranger, Trouville-stranden, Seglarhotellet och båt från Stockholm. Lots- och tullplats i Stockholms skärgård.',
    description: [
      // KÄLLA: ksss.se/KSSS/historia/ — "KSSS grundades i Stockholm 1830 under namnet Svenska Segel Sällskapet" samt "aktiv seglingsverksamhet på fjärdarna runt Sandhamn, bidrog till klubbens goda rykte"
      'Sandhamn hör till de namn i Stockholms skärgård som de flesta känner igen, och seglingen är en stor del av förklaringen. Kungliga Svenska Segel Sällskapet, KSSS, grundades i Stockholm 1830 under namnet Svenska Segel Sällskapet, och sällskapets seglingsverksamhet på fjärdarna runt Sandhamn har följt ön sedan dess. Under sommaren ligger båtarna tätt och hamnlivet håller på långt in på kvällarna.',
      // KÄLLA: varmdo.se, Trouville Sandhamn — "Den långsträckta stranden i Trouville, med sin vita sand, ligger på Sandhamns södra sida." / "Trouville ligger omkring 20 minuters promenad från hamnen."
      'Den långsträckta stranden Trouville, med sin vita sand, ligger på Sandhamns södra sida, omkring tjugo minuters promenad från hamnen. Sand i stället för klippor är ovanligt i de här farvattnen. Klipporna öster om stranden ligger öppna mot havet och är oftast tommare.',
      // KÄLLA: stockholmslansmuseum.se/besoksmal/sandhamn/ — "Under slutet av 1600-talet upprättades en lotsstation och de bofasta under 1700- och 1800-talen var främst lotsar, tullare och krögare." / "Sandhamn har sedan 1700-talet varit lots- och tullstation"
      'Sandhamn är ingen gammal fiskeby utan en gammal lots- och tullplats. En lotsstation upprättades under slutet av 1600-talet, och de bofasta under 1700- och 1800-talen var främst lotsar, tullare och krögare. Sedan 1700-talet har ön varit lots- och tullstation, och den sjöfartsanknutna arbetskulturen syns fortfarande i hur byn är byggd.',
      // KÄLLA: stockholmslansmuseum.se/besoksmal/sandhamn/ — "Det pampiga gula tullhuset av sten som dominerar hamnen ritades av slottsarkitekten Carl Hårleman och byggdes 1752." / "I de små 1700-talshusen Bryggstugan och Tullvaktstugan finns ett museum"
      'Det gula tullhuset av sten dominerar hamnen. Det ritades av slottsarkitekten Carl Hårleman och byggdes 1752. I de små 1700-talshusen Bryggstugan och Tullvaktstugan finns ett museum. Går man hundra meter in i byn smalnar gränderna till spår mellan staket och köksträdgårdar, och det blir tyst nog att höra fåglarna.',
      // KÄLLA: ksss.se/en/gotlandrunt/ — "since 2024 it starts at Gråskärsfjärden south of Sandön" / "boats sail south on open water to round Gotland with the finish at Sandhamn"
      // KÄLLA: ksss.se/KSSS/historia/ — Gotland Runt beskrivs som "den ledande havskappseglingen i norra Europa"
      'Gotland Runt avslutas i Sandhamn. Sedan 2024 går starten från Gråskärsfjärden söder om Sandön, medan målgången ligger kvar i Sandhamn, och KSSS beskriver tävlingen som den ledande havskappseglingen i norra Europa. Under tävlingsveckan ligger båtarna tätt i hamnen och byn har en annan puls än resten av sommaren.',
      'Ön ligger långt ut, där vattnet är saltare och klipporna lägre och jämnare. Havet beter sig annorlunda här än längre in: svallet är längre, horisonten bredare. Från de östra klipporna en klar dag ser du ingenting annat än öppet vatten.',
      'Östra sidan är för den som vill bort från hamnen. Klipporna är jämna, havet öppet och tystnaden bruten mest av sjöfåglar. En vardag utanför högsommaren kan du gå länge utan att möta någon.',
      'Från oktober till maj är Sandhamn en stillsammare plats. Vinterlandskapet har sin egen kvalitet: is kan bildas i inre hamnen, gränderna står tomma och hamnen rymmer några vinterliggande båtar. Värt ett besök för den som specifikt vill ha kontrasten till sommarön.',
      // KÄLLA: varmdo.se, Trouville Sandhamn — "Trouville ligger omkring 20 minuters promenad från hamnen."
      'Sandhamn passar inte alla, och det är en del av tjusningen. Barnfamiljer bör veta att det inte finns någon strand vid hamnen: Trouville ligger omkring tjugo minuters promenad bort, och hamnen i sig är full av båttrafik. För den som vill ha energin i en aktiv seglarhamn är det däremot precis rätt.',
    ],
    facts: {
      // KÄLLA: sandhamn.com/en/hitta-hit (Waxholmsbåt linje 15 Strömkajen–Sandhamn: "2–3 hours"); battaxi.se/sandhamnslinjen-2 (Sandhamnslinjen Stavsnäs–Sandhamn: "30 minuter"). Siffran "3 tim 45" kunde inte beläggas och är borttagen.
      travel_time: 'Via Stavsnäs 30 min (Sandhamnslinjen) · Waxholmsbåt Strömkajen (linje 15) ca 2–3 tim',
      character: 'Livlig, seglartät, festlig sommardestination',
      season: 'Maj–September (Seglarhotellet: helår)',
      best_for: 'Seglare, restaurangälskare, sommarturer',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      // KÄLLA: ksss.se/en/gotlandrunt/ (start sedan 2024 vid Gråskärsfjärden, mål i Sandhamn; nuvarande namn "Gotland Runt Offshore Race")
      { icon: '⛵', name: 'Segling', desc: 'KSSS-hamnen är en av Östersjöns mest besökta gästhamnar med plats för hundratals båtar. Sandhamn är målhamn för flera klassiska kappseglingar, däribland Gotland Runt Offshore Race.' },
      { icon: '🏊', name: 'Sandstranden Trouville', desc: 'Öns vackraste sandstrand på södra sidan. Sällsynt i skärgårdssammanhang — sand istället för klippor.' },
      { icon: '🧖', name: 'Spa & Gym', desc: 'Seglarhotellets spa med bubbelpool, bastu och havsutsikt. Öppet för hotellgäster och boende.' },
      { icon: '🚶', name: 'Vandring', desc: 'Promenera runt ön på de smala stigarna. Klipporna på östra sidan ger utsikt mot öppet hav.' },
      { icon: '🎣', name: 'Fiske', desc: 'Ytterskärgårdens vatten erbjuder utmärkt fiske. Havsöring och makrill är vanliga.' },
      { icon: '🛶', name: 'Kajak & SUP', desc: 'Uthyrning finns vid hamnen. Paddla runt ön eller ut mot de omgivande grunden.' },
    ],
    // Öppettider och "boka månader i förväg" var obelagt och togs bort 2026-09-14. Anläggningarna och deras egenskaper är källmärkta i accommodation nedan.
    accommodationIntro: 'Boendet på Sandhamn ligger samlat kring hamnen: Seglarhotellet med spa och restaurang, Sandhamns Värdshus i Missionshuset och lägenhetshotellet Sands Hotell.',
    // KÄLLA: sandhamn.com, sandhamns-vardshus.se, sandshotell.se — egna webbplatser; visitskargarden.se listar samma tre, inget STF-boende på Sandhamn (läst 2026-09-14)
    accommodation: [
      { name: 'Sandhamn Seglarhotell', type: 'Hotell', desc: 'Hotell vid hamnen med spa, restaurang, gym och pool. Öppet året runt. Boka långt i förväg.', websiteUrl: 'https://www.sandhamn.com' },
      { name: 'Sandhamns Värdshus', type: 'B&B', desc: 'Gästgiveri i Missionshuset med fem dubbelrum och en stuga, frukost ingår.', websiteUrl: 'https://sandhamns-vardshus.se' },
      { name: 'Sands Hotell', type: 'Hotell', desc: 'Lägenhetshotell med hotellservice nära hamnen, 15 dubbelrum och 3 enkelrum. Öppet året om.', websiteUrl: 'https://sandshotell.se' },
    ],
    getting_there: [
      // KÄLLA: sandhamn.com/en/hitta-hit — Waxholmsbåt linje 15 Strömkajen–Sandhamn "2–3 hours"
      { method: 'Waxholmsbåt', from: 'Strömkajen, Stockholm', time: '2–3 h', desc: 'Klassikalternativet — ta med sig mat och njut av resan.', icon: '⛴' },
      // KÄLLA: battaxi.se/sandhamnslinjen-2 — Sandhamnslinjen Stavsnäs–Sandhamn "30 minuter"
      { method: 'Snabbåt', from: 'Stavsnäs', time: '30 min', desc: 'Snabbaste alternativet. Buss/bil till Stavsnäs, sedan båt.', icon: '🚤' },
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Segelbåt eller motorbåt till KSSS-hamnen. Förboka gästplats under högsäsong.', icon: '⛵' },
    ],
    harbors: [
      // KÄLLA: ksss.se/hamnar/sandhamn — "ca 150 gästplatser", "20 st bokningsbara platser … dockspot.com", el på brygga B och C, "Vatten på bryggorna och servicehusen med dusch, toalett och tvättstuga … maj till september". Bränsle nämns inte av KSSS.
      { name: 'KSSS Sandhamn', desc: 'KSSS gästhamn framför Seglarhotellet, ca 150 platser. 20 bokningsbara platser via Dockspot. Servicehus maj–september.', fuel: false, service: ['el', 'vatten', 'dusch', 'tvätt'] },
    ],
    restaurants: [
      // KÄLLA: sandhamn.com/sv/restauranger-och-barer/segelsalen — "Segelsalen på Seglarhotellet … meny med fokus på säsongens råvaror"; hotellets restaurangsida listar Bistro, Segelsalen, Seglarbaren, Orangeriet, Terassen, Hamnbaren
      { name: 'Segelsalen, Sandhamn Seglarhotell', type: 'Restaurang', desc: 'Seglarhotellets matsal med säsongsmeny. Boka bord i förväg.', websiteUrl: 'https://www.sandhamn.com/sv/restauranger-och-barer/segelsalen' },
      // KÄLLA: sandhamns-vardshus.se — "Sandhamns Värdshus anno 1672", "Puben … Öppet året runt", "Restaurangen Med en magisk utsikt över hamnen"
      { name: 'Sandhamns Värdshus', type: 'Restaurang', desc: 'Värdshus anno 1672 med pub öppen året runt och restaurang med utsikt över hamnen.', websiteUrl: 'https://sandhamns-vardshus.se' },
      // OBELAGT: sandshotell.se/restaurang/ gick inte att hämta (robots.txt/timeout). Sekundärkällor (hotels.com, travelocity) kallar anläggningen "Sands Hotell & Bistro" — namnet bör verifieras direkt mot sandshotell.se innan publicering.
      // KÄLLA: visitskargarden.se/boende/hotell/sands-hotell.aspx — "Sands Hotell & Bistro"; sandshotell.se — "restaurangen med uteterassen"
      { name: 'Sands Bistro', type: 'Bistro', desc: 'Hotellbistro på Sands Hotell med mat lagad från grunden och uteterrass.', websiteUrl: 'https://sandshotell.se' },
      // KÄLLA: dykarbaren.se — "DYKARBAREN SANDHAMN", inne- och uteservering, säsongsöppettider 2026
      { name: 'Dykarbaren', type: 'Bar', desc: 'Bar och restaurang i Sandhamn med inne- och uteservering. Säsongsöppen.', websiteUrl: 'https://dykarbaren.se' },
      // KÄLLA: sandhamnsbageriet.com — vetesurdegsbröd, kanelbulle, kardemummabulle, "Seglarbulle"; säsongsöppet (sista helgen sept 2026)
      { name: 'Sandhamnsbageriet', type: 'Bageri', desc: 'Bageri i Sandhamn med surdegsbröd, bullar, tårtor och smörgåsar. Säsongsöppet.', websiteUrl: 'https://www.sandhamnsbageriet.com' },
    ],
    tips: [
      // KÄLLA: varmdo.se, Trouville Sandhamn — "Trouville ligger omkring 20 minuters promenad från hamnen." / "Toaletter sommartid"
      'Trouville ligger omkring 20 minuters promenad från hamnen — räkna med gångtiden när du planerar badet.',
      // KÄLLA: varmdo.se, Trouville Sandhamn — "Ingen provtagning av badvatten utförs av Värmdö kommun."
      'Värmdö kommun tar inga badvattenprover vid Trouville.',
      'Klipporna öster om Trouville ligger öppna mot havet och är oftast tommare än stranden.',
    ],
    related: ['moja', 'grinda', 'finnhamn'],
    tags: ['segling', 'gästhamn', 'restauranger', 'sandstrand', 'sommarfest'],
    // KÄLLA: stockholmslansmuseum.se/besoksmal/sandhamn/ — "Det pampiga gula tullhuset av sten som dominerar hamnen ritades av slottsarkitekten Carl Hårleman och byggdes 1752."
    // KÄLLA: ksss.se/en/gotlandrunt/ — "since 2024 it starts at Gråskärsfjärden south of Sandön"
    did_you_know: 'Det gula tullhuset i hamnen ritades av slottsarkitekten Carl Hårleman och byggdes 1752. Gotland Runt startar sedan 2024 från Gråskärsfjärden söder om Sandön — men målgången ligger kvar i Sandhamn.',
    transport_meta: {
      // KÄLLA: sandhamn.com/en/hitta-hit anger "2–3 hours" (120–180 min) för Strömkajen–Sandhamn; 150 min ligger inom intervallet men exakt tid kunde inte beläggas mer precist
      from_city_min: 150,
      // KÄLLA: battaxi.se/sandhamnslinjen-2 — Sandhamnslinjen Stavsnäs–Sandhamn 30 minuter
      from_nearest_hub_min: 30,
      nearest_hub: 'Stavsnäs',
      operator: 'Waxholmsbolaget',
      // KÄLLA: linjenummer "444" kunde inte beläggas (waxholmsbolaget.se, skargardstrafikanten.se). Waxholmsbåten Strömkajen–Sandhamn anges som "linje 15" på sandhamn.com/en/hitta-hit; Sandhamnslinjen Stavsnäs–Sandhamn drivs av Stavsnäs Båttaxi, inte Waxholmsbolaget.
      frequency: 'Flera avgångar/dag sommartid, glesare vinter',
      booking_url: 'https://waxholmsbolaget.se',
      // KÄLLA: Värmdö kommun — https://www.varmdo.se/varmdohamnar/parkera.4.6e5e3cc318a8d4dc3f6361bf.html (hämtad 2026-08-06)
      car_parking: 'Parkering vid Stavsnäs vinterhamn: 3 timmar fritt med p-skiva, därefter avgift som betalas i app (operatör Parkit). Cirka 1 300 platser, varav omkring hälften för besökare.',
    },
    activity_meta: {
      kajak: { difficulty: 'lätt', rental: true, notes: 'Uthyrning vid hamnen. Paddla runt ön eller ut mot omgivande grund.' },
      bad: {
        beaches: [
          {
            name: 'Trouville-stranden',
            type: 'sandstrand',
            desc: 'Sandhamns enda sandstrand och öns mest älskade badplats. Smal remsa av fin ljus sand på södra sidan, skyddad mot nordliga vindar. Heter "Trouville" efter den franska badorten — ett smeknamn seglarna gav platsen på 1800-talet.',
            child_friendly: true,
            depth: 'Grunt och sandbotten nära stranden — bra för barn. Vattnet värms upp snabbt i juli.',
            directions: 'Gå söderut från hamnen ca 10 min förbi Sandhamns Värdshus, ta sedan stigen ned mot havet.',
            insider_tip: 'Kom tidigt på morgonen eller sent på eftermiddagen — bryggan mitt på dagen fylls av dagsturister. Lokalt bad = morgon.',
          },
          // KÄLLA: badplats.nu/varmdo/flaskberget, thatsup.se/stockholm/plats/flaskberget-sandhamn — klippbadet nära Sandhamns by/Trouville heter Fläskberget, inte "Västerudd" (namnet kunde inte beläggas). Uppgifter om exakt väderstreck/avstånd/solnedgång kunde inte beläggas och är borttagna.
          {
            name: 'Fläskberget',
            type: 'klippbad',
            desc: 'Klippbad vid Sandhamns by, i närheten av Trouville-stranden. Öppet hav och hällar. Populärt bland seglarna som vinterliggare och de som bor på ön.',
            child_friendly: false,
            depth: 'Djupt direkt vid klippkanten — hoppa in, men håll koll på barn.',
            directions: 'Följ klippkanten från Trouville-stranden.',
          },
        ],
      },
      fiske: true,
    },
    amenities: { toilets: true, shower: true, cafe: true, grocery: true, atm: false },
    dog_friendly: true,
    // OBELAGT efter sökning (inget hittat om säsongsbundet hundförbud vid Trouville; Värmdö kommuns badplatssida gick inte att läsa). Den specifika förbudsperioden är borttagen tills den kan beläggas.
    dog_notes: 'Hundar tillåtna på de flesta delar av ön. Koppeltvång i hamn- och restaurangområden.',
    insiderTips: [
      'Waxholmsbåten tar ungefär 2,5–3,5 timmar från Strömkajen beroende på antal bryggstopp. Snabbåt via Stavsnäs kortar restiden rejält.',
      'Trouville är en av få sandstränder i hela Stockholms skärgård. De flesta öar har klippor och hällmarker, inte sand.',
      // KÄLLA: ksss.se/KSSS/historia/ (fullständigt namn "Kungl. Svenska Segel Sällskapet"); ksss.se/en/gotlandrunt/ (start sedan 2024 vid Gråskärsfjärden, mål i Sandhamn)
      'KSSS (Kungliga Svenska Segel Sällskapet) har sin flaggskeppshamn i Sandhamn. Gotland Runt Offshore Race, en av världens mest välkända offshore-seglingstävlingar, avslutas i Sandhamn varje år.',
      'Byn Sandhamn ligger i öns nordöstra del. Promenaden runt hela ön tar ungefär två timmar i lugnt tempo.',
      'Sandhamn var lotsstation i hundratals år. Lotsarna här guidade handelsfartyg genom de smala passagerna in mot Stockholm, vilket formade byn och dess karaktär.',
    ],
    blogLinks: [
      { slug: 'basta-restaurangerna-sandhamn', title: 'De 5 bästa restaurangerna på Sandhamn 2026' },
      { slug: 'gasthamnar-guide', title: 'Bästa gästhamnarna i Stockholms skärgård 2026' },
      { slug: 'segling-nyborjare-guide', title: 'Segla för första gången – allt du behöver veta' },
    ],
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli–mitten av Augusti',
      best: 'Juni eller September',
      bestReason: 'Juni: allt öppet utan trängseln. September: badbart vatten, tomma restauranger och billigare boende.',
      warning: 'Seglarhotellet är öppet hela året men de flesta caféer och barer stänger oktober–april.',
      months: ['off','off','off','limited','limited','open','peak','peak','open','limited','off','off'],
    },
  },

  // ─── UTÖ ─────────────────────────────────────────────────────
  {
    slug: 'uto',
    name: 'Utö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🚲',
    tagline: 'Järngruvor sedan medeltiden, grusvägar att cykla och sandstrand vid Ålö Storsand.',
    seoTitle: 'Utö 2026 – cykling, gruvhistoria & Utö Värdshus',
    seoDescription: 'Guide till Utö: cykelleder, gruvhistoria och Utö Värdshus. Pendeltåg till Nynäshamn och båt vidare. Naturreservat i södra skärgården.',
    description: [
      // KÄLLA: lansstyrelsen.se, naturreservat Utö — "Utö gruvor från järnmalmsbrytningen som funnits till och från under 700 år med början redan under 1100-talet"
      // KÄLLA: kulturarvstockholm.se, Utö gruvor — "År 1879 upphörde slutligen gruvdriften helt"
      'Utö präglas av järnet. Järnmalmsbrytning har funnits här till och från under 700 år, med början redan under 1100-talet, och 1879 upphörde gruvdriften slutligen helt. Spåren efter arbetet finns kvar i landskapet: schakt, varphögar och den gamla gruvbyn.',
      // KÄLLA: kulturarvstockholm.se, Utö gruvor — "måhända Sveriges äldsta järngruvor, upptagna redan under tidig medeltid" / "Sommaren 1719 härjade tsar Peter I:s flotta stora delar av den svenska ostkusten och totalförstörde utögruvorna"
      'Gruvorna beskrivs som måhända Sveriges äldsta järngruvor, upptagna redan under tidig medeltid. Driften var inte obruten. Sommaren 1719 härjade tsar Peter I:s flotta stora delar av den svenska ostkusten och totalförstörde utögruvorna, och verksamheten fick byggas upp på nytt.',
      // KÄLLA: kulturarvstockholm.se, Utö gruvor — "under 1840-talet uppnådde befolkningstalet sitt maximum, 446 personer"
      'Gruvsamhället var som störst under 1840-talet, då befolkningstalet nådde sitt maximum på 446 personer. Det är ett annat perspektiv på skärgårdsliv än fiskebyar och seglarhamnar: industriellt arbete i en ömiljö. Gruvbyn och utställningen där ger den bilden.',
      // KÄLLA: skargardsstiftelsen.se/omraden/uto/ — "I den historiska Gruvbyn finns spår av järnbrytning som påbörjades redan under medeltiden." / "Sveriges äldsta bevarade väderkvarn"
      'I den historiska Gruvbyn finns spår av järnbrytningen, och här står också Sveriges äldsta bevarade väderkvarn. Det är en kort promenad mellan husen och en tät koncentration av öns historia.',
      // KÄLLA: skargardsstiftelsen.se/omraden/uto/ — "Ålö Storsand, som nås med båt eller via vandringsled, räknas som en av Stockholms skärgårds mest omtyckta sandstränder."
      'Ålö Storsand, som nås med båt eller via vandringsled, räknas av Skärgårdsstiftelsen som en av Stockholms skärgårds mest omtyckta sandstränder. Riktig sandstrand är ovanligt i skärgården, där bad oftast betyder jämna klipphällar. Vägen dit går genom skog och öppnare marker innan havet ligger framför en.',
      // KÄLLA: skargardsstiftelsen.se/omraden/uto/ — "Utö är en riktig cykel-ö med möjlighet att hyra dagsvis"
      'Utö är en riktig cykel-ö med möjlighet att hyra cykel dagsvis. Grusvägarna går mellan skogsparti och öppnare marker, och terrängen är mestadels flack. Det är så de flesta tar sig runt.',
      // KÄLLA: lansstyrelsen.se, naturreservat Utö — "Reservatet utgör norra delen av Utö samt ett antal öar i omgivande vatten" (skyddat 1974, 4 183 hektar varav 653 land; markägare och förvaltare Skärgårdsstiftelsen)
      'Norra delen av Utö är naturreservat tillsammans med ett antal öar i omgivande vatten. Reservatet är skyddat sedan 1974 och omfattar 4 183 hektar, varav 653 hektar land. Skärgårdsstiftelsen är både markägare och förvaltare.',
      // KÄLLA: lansstyrelsen.se, naturreservat Utö — rovfåglarna dras till Utö särskilt under hösten vid västliga vindar; reservatet är "känt för sina många fjärilar"
      'Det exponerade läget gör Utö till en bra plats för fågelskådning. Rovfåglar dras hit särskilt under hösten vid västliga vindar. Reservatet är också känt för sina många fjärilar, apollofjärilen bland dem.',
      // KÄLLA: lansstyrelsen.se, naturreservat Utö — i varphögarna finns bland annat "guldglänsande svavelkis, blå turmalin och röda granater"
      'I varphögarna efter gruvdriften går det fortfarande att hitta mineral: guldglänsande svavelkis, blå turmalin och röda granater. Det är en av få platser i skärgården där marken under fötterna berättar något annat än is och hav.',
      // KÄLLA: utovardshus.se/kontakt/hitta-hit/ — "Waxholmsbåtar trafikerar linjen Utö – Årsta Brygga dagligen" / "Båt utgår även från Nynäshamn till grannön Ålö som har broförbindelse till Utö"
      // KÄLLA: sl.se, linje 846 Västerhaninge station–Årsta (–Årsta slott)
      'Waxholmsbåtar trafikerar linjen Utö–Årsta brygga dagligen. Årsta brygga nås med pendeltåg till Västerhaninge och därifrån buss 846 mot Årsta. Båt utgår även från Nynäshamn till grannön Ålö, som har broförbindelse till Utö.',
      'Utö belönar den som stannar mer än en dag. Cykelturen och gruvbyn fyller lätt ett dygn; nästa dag är för det långsammare, en runda längs vattnet eller en lång lunch utan något planerat efteråt. Landskapet har en hårdare, mer ärlig kvalitet utanför högsommaren som klär öns gruvhistoria.',
    ],
    facts: {
      // KÄLLA: Waxholmsbolagets tabell 21 Årsta–Utö. Nynäshamnslinjen (tabell 22) slutar på Ålö, inte Utö by. Årsta brygga nås med buss 846 (14–17 min). Se varv 51–52.
      travel_time: 'Buss 846 till Årsta brygga + båt 35–75 min (Gruvbryggan förbokas)',
      character: 'Lugnt, naturnära, perfekt för familjer och cyklister',
      season: 'April–Oktober (Värdshuset öppet helår)',
      best_for: 'Cykling, havsbastu, naturupplevelser, familjer',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      // KÄLLA: uto.se/cykel/ och utogasthamn.se/uto-cykeluthyrning/ bekräftar cykeluthyrning vid hamnen (Cykelboden); exakt antal/märke gick ej att verifiera (sidor blockerade av robots.txt)
      { icon: '🚲', name: 'Cykling', desc: 'Cykeluthyrning vid hamnen (Cykelboden). Klassiska rutten Gruvbyn–Ålö är ca 13 km enkel väg längs grusvägar genom skog och ängar till Ålö storsand med klappstrandsbad och krogen Båtshaket.' },
      { icon: '🧖', name: 'Havsbastu', desc: 'En av skärgårdens mest omtalade havsbastur. Dörren går ut mot havet — basta, hoppa i, basta igen.' },
      { icon: '⛏', name: 'Gruvan & museet', desc: 'Järnmalm bröts på Utö i mer än 700 år, från 1100-talet till 1879. Gruvdriften var som störst på 1840-talet med 16 000 ton/år och cirka 500 invånare på ön. Gruvmuseet berättar historien — fascinerande för både barn och vuxna.' },
      // KÄLLA: marinwiki.se/port/661 — "Stranden ligger på militärens område drygt 7 kilometer från Gruvbyn"
      { icon: '🏊', name: 'Bad & stränder', desc: 'Stora Sand på Utö (drygt 7 km från Gruvbryggan, ligger inom skjutfältet — kontrollera tillgänglighet) och Ålö Storsand på grannön Ålö (broförbunden) hör till Sveriges finaste sandstränder.' },
      // KÄLLA: lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — reservatet omfattar "norra delen av Utö samt ett antal öar i omgivande vatten"; södra delen är militärt övningsområde
      { icon: '🚶', name: 'Vandring', desc: 'Naturreservat i öns norra del med välmarkerade leder och vacker urbergslandskap.' },
      { icon: '🎣', name: 'Fiske', desc: 'Ytterskärgården runt Utö är utmärkt för havsöring och abborre.' },
    ],
    // "Skärgårdens bredaste boendeutbud" var ett obelagt superlativ och togs bort 2026-09-14.
    accommodationIntro: 'Utö har både värdshus, stugor och camping. Anläggningarna ligger i eller nära Gruvbyn, och flera av dem ligger inom naturreservatet.',
    // KÄLLA: utovardshus.se/boende (Kvarnvillan, Stenhotellet, hotellstugor, vandrarhemmet); uto.se/camping; STF:s lista över vandrarhem i Stockholms skärgård nämner INTE Utö — "STF-ansluten" borttaget (läst 2026-09-14)
    accommodation: [
      { name: 'Utö Värdshus', type: 'Hotell', desc: 'Värdshus med restaurang och havsutsikt — rum i Kvarnvillan, Stenhotellet och hotellstugor. Öppet hela året.', websiteUrl: 'https://www.utovardshus.se' },
      { name: 'Utö Vandrarhem Skärgården', type: 'Vandrarhem', desc: 'Vandrarhemsdelen av Utö Värdshus. Enkelt boende, bokningsbart online.', websiteUrl: 'https://www.utovardshus.se/boende/vandrarhemmet/' },
      { name: 'Utö campingplats', type: 'Camping', desc: 'Tältplats nära Gruvbryggan, sköts av Hamnboden/Utö gästhamn.', websiteUrl: 'https://www.uto.se/camping/' },
    ],
    getting_there: [
      { method: 'Skärgårdsbåt', from: 'Årsta brygga, Nynäshamn', time: '1,5 h', desc: 'Waxholmsbolagets skärgårdslinje från Årsta brygga i Nynäshamn (kommunal- och SL-kort gäller ej — separat biljett).', icon: '⛴' },
      { method: 'Snabbåt', from: 'Årsta brygga, Nynäshamn', time: '30 min', desc: 'Snabbare alternativ sommartid — körs som expresslinje av Waxholmsbolaget.', icon: '🚤' },
      { method: 'Pendel + buss + båt', from: 'Stockholm City', time: '2 h totalt', desc: 'Pendeltåg linje 43 till Västerhaninge, buss 846 till Årsta brygga (16 min), sedan båt till Gruvbryggan 35–75 min, beställningsbrygga på de flesta turer.', icon: '🚆' },
    ],
    harbors: [
      // KÄLLA: utogasthamn.se/gasthamnen — "plats för ca 300 fritidsbåtar med eluttag … på samtliga platser", "dusch, bastu och toaletter", "tvättstuga att hyra", "fylla på färskvatten", "I den norra hamnen finns sjömacken"
      { name: 'Utö Gästhamn', desc: 'Gästhamn i Gruvbyn med ca 300 platser. El på alla platser, dusch, bastu, tvättstuga och sjömack i norra hamnen.', fuel: true, service: ['el', 'vatten', 'dusch', 'tvätt', 'bränsle'] },
    ],
    restaurants: [
      // KÄLLA: utovardshus.se/restaurang/uto-vardshus — "I det gamla gruvkontoret finns Utö Värdshus bar och matsalar … à la carte både lunch och middag … verandan öppen" på sommaren
      { name: 'Utö Värdshus', type: 'Restaurang', desc: 'Bar och matsalar i det gamla gruvkontoret. À la carte lunch och middag, veranda sommartid.', bookingUrl: 'https://www.utovardshus.se/restaurang/boka-bord-vardshuset/', websiteUrl: 'https://www.utovardshus.se' },
      // KÄLLA: utovardshus.se/restaurang/seglarbaren — "BAREN MITT I HAMNEN", veranda mot hamninloppet, "enklare rätter till lunch … kolgrillade rätter till kvällen"
      { name: 'Seglarbaren', type: 'Bar', desc: 'Utö Värdshus bar mitt i hamnen. Veranda mot hamninloppet, enklare lunch och kolgrillat till kvällen.', websiteUrl: 'https://www.utovardshus.se/restaurang/seglarbaren/' },
      // KÄLLA: utogasthamn.se/kiosk-cafe — "Hamnboden … kiosk, café och restaurang i samma byggnad … glass, godis, korv och toast men även sushi samt en bar"
      { name: 'Hamnboden', type: 'Kiosk/Café', desc: 'Kiosk, café och restaurang i Utö gästhamn: glass, korv, toast, sushi och bar.', websiteUrl: 'https://www.utogasthamn.se/kiosk-cafe/' },
      // KÄLLA: visitskargarden.se/mat-dryck/restaurang/bakfickan.aspx — "Utös vattenhål och nattklubb", bar/nattklubb i anslutning till Utö Värdshus
      { name: 'Bakfickan Utö', type: 'Bar', desc: 'Bar och nattklubb vid Gruvbryggan, del av Utö Värdshus. Livemusik och DJ sommarhelger.', slug: 'bakfickan-uto' },
    ],
    tips: [
      // KÄLLA: skargardsstiftelsen.se/omraden/uto/ — "Utö är en riktig cykel-ö med möjlighet att hyra dagsvis"
      'Utö är en cykel-ö och cykel går att hyra dagsvis — planera dagen kring grusvägarna.',
      // KÄLLA: skargardsstiftelsen.se/omraden/uto/ — "Ålö Storsand, som nås med båt eller via vandringsled"
      'Ålö Storsand nås med båt eller via vandringsled.',
      // KÄLLA: utovardshus.se/kontakt/hitta-hit/ — "Båt utgår även från Nynäshamn till grannön Ålö som har broförbindelse till Utö"
      'Kommer du från Nynäshamn lägger båten till på Ålö — därifrån går bro över till Utö.',
    ],
    related: ['nattaro', 'dalaro', 'orno'],
    tags: ['cykling', 'havsbastu', 'gruva', 'naturreservat', 'familj'],
    // KÄLLA: kulturarvstockholm.se, Utö gruvor — "under 1840-talet uppnådde befolkningstalet sitt maximum, 446 personer"
    // KÄLLA: skargardsstiftelsen.se/omraden/uto/ — "Sveriges äldsta bevarade väderkvarn"
    // KÄLLA: kulturarvstockholm.se, Utö gruvor — "Sommaren 1719 härjade tsar Peter I:s flotta … och totalförstörde utögruvorna"
    did_you_know: 'Utös befolkning nådde sitt maximum under 1840-talet: 446 personer. I Gruvbyn står Sveriges äldsta bevarade väderkvarn. Gruvdriften var inte obruten: sommaren 1719 totalförstörde tsar Peter I:s flotta anläggningarna.',
    transport_meta: {
      from_city_min: 120,
      from_nearest_hub_min: 30,
      nearest_hub: 'Nynäshamn (Årsta brygga)',
      operator: 'Waxholmsbolaget',
      line: 'Utölinje',
      frequency: 'Flera avgångar/dag sommartid, 2–3 ggr/dag vinter',
      booking_url: 'https://waxholmsbolaget.se',
      car_parking: 'Pendeltåg till Nynäshamn (SL), sedan 5 min buss/gång till Årsta brygga. Parkering vid Nynäshamns station eller Årsta brygga.',
    },
    activity_meta: {
      kajak: { difficulty: 'lätt', rental: true, notes: 'Kajakuthyrning vid hamnen. Lugnt vatten på öns västra sida, mer öppet i söder.' },
      cykel: { rental: true, km_track: 13, notes: 'Ca 350 hyrcyklar. Klassrutt: Gruvbryggan–Ålö ca 13 km enkel väg.' },
      bad: {
        beaches: [
          {
            name: 'Ålö Storsand',
            type: 'sandstrand',
            desc: 'En av Stockholms skärgårds verkligt vackra sandstränder — vit sand, turkost vatten och öppet hav mot söder. Ligger på grannön Ålö (broförbunden med Utö). Strandkrogen Båtshaket ligger precis intill.',
            child_friendly: true,
            depth: 'Grunt vid strandlinjen, sandbotten hela vägen ut — perfekt för barn.',
            directions: 'Hyr cykel vid Gruvbryggan. Cykla söderut längs grusvägen, passera Ålöbron och följ skyltarna till Storsand. Ca 13 km, ca 45 min i lugnt tempo.',
            insider_tip: 'Gå bort till stenrevet i norr — där är det färre folk och exakt samma vatten. Kom med morgonbåten och ha stranden för dig själv till 11.',
          },
          // KÄLLA: lansstyrelsen.se (naturreservat Utö): skjutfältet ligger i öns södra del; marinwiki.se/port/661: Stora Sand ligger på militärens område "drygt 7 kilometer från Gruvbyn"
          {
            name: 'Stora Sand (södra Utö)',
            type: 'sandstrand',
            desc: 'Sandstrand på Utös södra sida inom militärt övningsområde. Öppen för besökare under stora delar av sommaren men stängs vid militärövningar utan förvarning. Kolla skyltningen vid infarterna.',
            child_friendly: true,
            depth: 'Sandbotten, grunt — bra för barn när stranden är öppen.',
            directions: 'Cykla söderut från Gruvbryggan, drygt 7 km. Skyltar vid infarterna visar om stranden är tillgänglig.',
            insider_tip: 'Fråga alltid vid bryggan eller kolla utoinfo.se om stranden är öppen denna dag. Stängs utan förvarning.',
          },
        ],
      },
      vandring: { trails: 4, max_km: 12 },
      fiske: true,
    },
    amenities: { toilets: true, shower: true, cafe: true, grocery: true, atm: false },
    dog_friendly: true,
    dog_notes: 'Hundar välkomna. Naturreservat i södra delen har koppeltvång under häckningssäsong; enligt lag ska hundar dessutom hindras från att springa lösa i marker med vilt 1 mars–20 augusti, och reservatet kan ha egna perioder. Värdshuset tillåter hundar i uteserveringen.',
    insiderTips: [
      // KÄLLA: Stockholms läns museum — brytning möjligen redan på 1100-talet, nedlagd 1879 (2026-08-24)
      'Järngruvan på Utö var i drift från medeltiden — möjligen redan på 1100-talet — till 1879 och räknas till Sveriges äldsta kända järngruvor. Gruvsystemet kan besökas.',
      'Cykellederna på Utö är välmarkerade och terrängen är till stor del flack, vilket gör en rundtur tillgänglig för de flesta konditionsnivåer.',
      'Utö Värdshus vid Gruvbryggan erbjuder restaurang, bar och boende åt besökare och sjöfarare.',
      'Havsbastu finns på Utö och är populär även under vinterhalvåret. Kontrasten mot kallt hav är störst i november och mars.',
    ],
    blogLinks: [
      { slug: 'uto-guide', title: 'Utö – södra skärgårdens kronjuvel' },
      { slug: 'vandring-orno-uto', title: 'Vandring i skärgården – bästa lederna på Ornö och Utö' },
      { slug: 'havsbastu-guide', title: 'Havsbastu i skärgården – de bästa platserna 2026' },
    ],
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Sandstrand, cykel och värdshus — utan juliträngseln. Havsbastu är ett plus i september.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },
  },

  // ─── VAXHOLM ─────────────────────────────────────────────────
  {
    slug: 'vaxholm',
    name: 'Vaxholm',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🏛️',
    tagline: 'Porten till skärgården — stad, fästning och direktbåt från Strömkajen.',
    seoTitle: 'Vaxholm 2026 – fästning, historisk stad & dagstur',
    seoDescription: 'Guide till Vaxholm: Vaxholms kastell, restauranger och båt från Strömkajen. Dagstur eller weekendresa i Stockholms skärgård.',
    description: [
      // KÄLLA: vaxholmsfastning.se/historik/ — "Vaxholms fästnings historia inleddes i början av 1500-talet med ett blockhus på Vaxholmen, byggt av riksföreståndaren Svante Nilsson Sture." / "Gustav Vasa 1548 åt ståthållaren på Stockholms slott att uppföra en ny och kraftigare fästning."
      'Vaxholms fästnings historia inleddes i början av 1500-talet med ett blockhus på Vaxholmen, byggt av riksföreståndaren Svante Nilsson Sture. År 1548 gav Gustav Vasa ståthållaren på Stockholms slott i uppdrag att uppföra en ny och kraftigare fästning. Det strategiska läget vid inloppet mot Stockholm är anledningen till att anläggningen finns där den finns.',
      // KÄLLA: vaxholmsfastning.se/historik/ — "Den gamla fästningen revs och ersattes med det nuvarande Kastellet under åren 1833-1863."
      // KÄLLA: sfv.se, Vaxholms kastell — "Byggår: 1833-1863 på uppdrag av Karl XIV Johan"
      'Den gamla fästningen revs och ersattes med det nuvarande Kastellet under åren 1833–1863, på uppdrag av Karl XIV Johan. Det är den byggnaden som ligger i sundet i dag, tyngre och mer sluten än man väntar sig av bilderna.',
      // KÄLLA: vaxholmsfastning.se/historik/ — angrepp slogs tillbaka två gånger: "Första gången var 1612 då danskarna anföll" och "andra gången 1719 då ryssarna härjade i Stockholms skärgård"
      'Fästningen har slagit tillbaka angrepp två gånger. Första gången var 1612 då danskarna anföll, andra gången 1719 då ryssarna härjade i Stockholms skärgård.',
      // KÄLLA: sfv.se, Vaxholms kastell — "På ön Vaxholmen ett stenkast från skärgårdens huvudstad Vaxholm ligger Vaxholms kastell."
      // KÄLLA: vaxholmsfastning.se — museet låter besökaren följa "skärgårdsförsvarets 500-åriga historia" och täcker "Sveriges försvarshistoria från Gustav Vasa till nutid"
      'Vaxholms kastell ligger på ön Vaxholmen, ett stenkast från staden Vaxholm, och nås över vattnet. Inne i kastellet finns museet, där utställningarna följer skärgårdsförsvarets 500-åriga historia och Sveriges försvarshistoria från Gustav Vasa till nutid. Utsikten från murarna går ut över sundet åt båda håll.',
      // KÄLLA: Waxholmsbolagets tabell 11 Strömkajen–Vaxholm, ~55–70 min (se facts_provenance ovan i filen)
      'Direktbåt från Strömkajen tar ungefär en timme. Vaxholm är det självklara första steget ut i skärgården för den som aldrig åkt dit förut.',
      // KÄLLA: sl.se, linje 670 (ficktidtabell v670) trafikerar sträckan Tekniska högskolan–Vaxholm
      'Buss 670 går mellan Tekniska högskolan och Vaxholm. Kombinationen buss och båt gör att Vaxholm fungerar som halvdags- eller heldagsutflykt även på kort varsel.',
      'Det som skiljer Vaxholm från öarna längre ut är att det är en stad. Det finns en huvudgata, ett hamnstråk och bostadskvarter bakom, och livet där följer inte turistsäsongen. Går man fem minuter inåt från kajen blir det tyst på ett sätt som påminner om vilken liten kuststad som helst längs den svenska kusten.',
      'Att promenera i Vaxholms gator är en lektion i äldre svensk träarkitektur. Målade trähus, trädgårdsstaket och vuxna träd står tätt i bostadskvarteren, och kvarteren kring hamnplatsen är särskilt tilltalande i lågt ljus.',
      // KÄLLA: vaxholm.se, nyhetsarkiv — "Välkommen till Vaxholms julmarknad 7–8/12" (2024) samt "Julgran och julmarknad på Lägret"
      'I december arrangeras Vaxholms julmarknad. Kombinationen av den gamla trästaden, vinterdekoration och hamnen ger staden en annan karaktär än sommarhalvåret, och är ett av de tydligare exemplen på att Vaxholm fungerar också utanför säsong.',
      'Hamnen är stadens sociala centrum. På sommaren fylls den av besökande båtar och dagsbesökare; på vintern ligger ett fåtal båtar kvar och staden återgår till sin lugnare rytm. Båda versionerna är värda att uppleva.',
      'De flesta kommer hit som dagsbesökare och staden rymmer det väl. Ett övernattningsbesök ger något annat: staden tidigt på morgonen innan båtarna anlänt, och på kvällen när den sjunker in i sin egen takt.',
    ],
    facts: {
      // KÄLLA: Waxholmsbolagets tabell 11 Strömkajen–Vaxholm, ~55–70 min (08.15→09.17, 08.20→09.17, 12.45→13.42). Tidigare "75 min" var i överkant.
      travel_time: '~1 tim (55 min–1 tim 20) med Waxholmsbåt från Strömkajen',
      character: 'Stad med skärgårdskänsla, historia, helårsdestination',
      season: 'Helår — Vaxholm är en aktiv stad tolv månader om året',
      best_for: 'Dagsturer, historia, familjer, första skärgårdsbesök',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      { icon: '🏰', name: 'Vaxholms Kastell', desc: 'Fästningsmuseum med 500 år av skärgårdsförsvar. Guidade turer sommartid. Lägg 2 timmar här.' },
      { icon: '🛍', name: 'Stadspromenaden', desc: 'Vandra längs kajen, titta in i de gamla trähusen och fika i de lokala caféerna.' },
      { icon: '🎣', name: 'Fiskeguider', desc: 'Catch & Relax och andra guider erbjuder guidat fiske i Vaxholms skärgård.' },
      { icon: '🛶', name: 'Kajakpaddling', desc: 'Perfekt utgångspunkt för kajakpaddling mot Resarö, Rindö och Tenö.' },
      { icon: '🚢', name: 'Båtutflykter', desc: 'Ta Waxholmsbåten vidare ut i skärgården — Grinda, Finnhamn och Sandhamn är alla tillgängliga.' },
    ],
    // "Skärgårdens mest tillgängliga" var ett obelagt superlativ och togs bort 2026-09-14.
    accommodationIntro: 'Vaxholm nås med bil, buss och båt, och boendet finns i staden snarare än utspritt på en ö: hotell, bed & breakfast, vandrarhem och camping.',
    // KÄLLA: waxholmshotell.se; kastelletvaxholm.se + STF (STF Kastellet Bed & Breakfast, 27 rum, året runt); vaxholmsbedandbreakfast.se; svenskaturistforeningen.se/boende/stf-vaxholm-bogesund-vandrarhem; waxholmscamping.com (läst 2026-09-14)
    accommodation: [
      { name: 'Waxholms Hotell', type: 'Hotell', desc: 'Historiskt hotell vid hamnen med matsal och havsutsikt. Öppet hela året.', websiteUrl: 'https://www.waxholmshotell.se' },
      { name: 'Kastellet Bed & Breakfast', type: 'B&B', desc: 'STF-anslutet B&B i Vaxholms kastell, 27 rum, öppet året runt; bistro och café sommartid.', websiteUrl: 'https://kastelletvaxholm.se' },
      { name: 'Vaxholms Bed & Breakfast', type: 'B&B', desc: 'Litet B&B i privat hem i Vaxholm.', websiteUrl: 'https://vaxholmsbedandbreakfast.se' },
      { name: 'STF Bogesunds Vandrarhem', type: 'Vandrarhem', desc: 'Vandrarhem vid Bogesunds slott utanför Vaxholm.', websiteUrl: 'https://www.svenskaturistforeningen.se/boende/stf-vaxholm-bogesund-vandrarhem/' },
      { name: 'Waxholms Camping', type: 'Camping', desc: 'Campingplats med stugor på Eriksö — nås med bil.', websiteUrl: 'https://waxholmscamping.com' },
    ],
    getting_there: [
      // KÄLLA: Waxholmsbolagets tabell 11 Strömkajen–Vaxholm, ~55–70 min (se facts_provenance ovan i filen)
      { method: 'Waxholmsbåt', from: 'Strömkajen, Stockholm', time: '~1 tim', desc: 'Direktlinje med Waxholmsbolaget. Ingår i SL-kort.', icon: '⛴' },
      { method: 'Bil', from: 'Stockholm', time: '45 min', desc: 'Vaxholm nås med bil via E18. Det finns parkeringar i staden.', icon: '🚗' },
      { method: 'Buss', from: 'Tekniska Högskolan', time: '60 min', desc: 'SL-buss 670 från T-banan.', icon: '🚌' },
    ],
    harbors: [
      // KÄLLA: gasthamnsguide.se/omradesindelat/stockholms-mellersta-skargard/item/vaxholms-gasthamn + svenskagasthamnar.se/stockholms-skargard/waxholm-vaxholm/ — drivmedel (diesel/bensin/gasol) via Sjömackarna/Gulf
      { name: 'Vaxholms Gästhamn', desc: 'Centralt belägen gästhamn med god service. Gångavstånd till all service.', fuel: true, service: ['el', 'vatten', 'dusch', 'toilet'] },
    ],
    restaurants: [
      // KÄLLA: hamnkrogenvaxholm.com — "vaxholmarnas kvarterskrog sedan 1950-talet … ser ut över båtlivet i gästhamnen", Söderhamnen 10, "Våra klassiker samsas med husmanskost"
      { name: 'Hamnkrogen', type: 'Restaurang', desc: 'Kvarterskrog vid gästhamnen sedan 1950-talet. Lunch, middag och husmanskost.', websiteUrl: 'https://www.hamnkrogenvaxholm.com' },
      // KÄLLA: winbergs.se — "WINBERGS KÖK & BAR PÅ KAJEN I VAXHOLM … sommarkrog … Krogen är grundad 1961"
      { name: 'Winbergs Kök & Bar', type: 'Restaurang', desc: 'Sommarkrog och grill på kajen i Vaxholm, grundad 1961.', websiteUrl: 'https://www.winbergs.se' },
      // KÄLLA: ostmakeriet.se/aterforsaljare — "Mathantverkstan i Skärgården"; destinationvaxholm.se (Vaxholms turistbyrå) — "artisan cheeses, bread, jams, kombucha, coffee, ice cream", Söderhamnsplan 1
      { name: 'Mathantverkstan i Skärgården', type: 'Delikatess/Café', desc: 'Butik och café vid Söderhamnsplan med hantverksostar, bröd, sylt, kombucha och kaffe.' },
    ],
    tips: [
      // KÄLLA: sfv.se, Vaxholms kastell — "På ön Vaxholmen ett stenkast från skärgårdens huvudstad Vaxholm ligger Vaxholms kastell."
      'Kastellet ligger på en egen ö, Vaxholmen — du måste över vattnet för att komma dit.',
      // KÄLLA: Waxholmsbolagets tabell 11 Strömkajen–Vaxholm, ~55–70 min
      'Direktbåten från Strömkajen tar ungefär en timme och är en del av upplevelsen.',
      // KÄLLA: vaxholm.se, nyhetsarkiv — "Välkommen till Vaxholms julmarknad 7–8/12"
      'Julmarknaden i december är ett skäl att komma hit utanför sommarsäsongen — kolla datum på vaxholm.se.',
    ],
    related: ['grinda', 'finnhamn', 'ljustero'],
    tags: ['historia', 'fästning', 'stad', 'dagsturer', 'helår'],
    // KÄLLA: vaxholmsfastning.se/historik/ — "Vaxholms fästnings historia inleddes i början av 1500-talet med ett blockhus på Vaxholmen, byggt av riksföreståndaren Svante Nilsson Sture."
    // KÄLLA: sfv.se, Vaxholms kastell — "Byggår: 1833-1863 på uppdrag av Karl XIV Johan"
    // KÄLLA: vaxholmsfastning.se/historik/ — angreppen 1612 (danskarna) och 1719 (ryssarna) slogs tillbaka
    did_you_know: 'Det första försvarsverket på Vaxholmen var ett blockhus från början av 1500-talet, byggt av riksföreståndaren Svante Nilsson Sture. Dagens kastell byggdes 1833–1863 på uppdrag av Karl XIV Johan — den fästning Gustav Vasa lät uppföra 1548 revs för att ge plats åt det. Två angrepp har slagits tillbaka här: danskarna 1612 och ryssarna 1719.',
    transport_meta: {
      // KÄLLA: Waxholmsbolagets tabell 11 Strömkajen–Vaxholm, ~55–70 min (se facts_provenance ovan i filen)
      from_city_min: 65,
      from_nearest_hub_min: 0,
      nearest_hub: 'Strömkajen (direktbåt)',
      operator: 'Waxholmsbolaget',
      line: 'Linje 670 (buss) eller direktbåt',
      frequency: 'Buss varje timme. Båt flera gånger/dag.',
      booking_url: 'https://sl.se',
      // KÄLLA: Vaxholms stad, taxa antagen av kommunfullmäktige 2025 — https://www.vaxholm.se/trafik--infrastruktur/trafik-gator-och-parkering/parkering/taxor-och-avgifter (hämtad 2026-08-06)
      car_parking: 'Parkering i centrala Vaxholm: 40 kr/timme 1 maj–31 augusti (8–18 vardagar, 8–15 helger), avgiftsfritt 1 september–30 april. Pendling rekommenderas — buss 670 från Tekniska Högskolan tar 60 min med SL-kort.',
    },
    activity_meta: {
      kajak: { difficulty: 'lätt', rental: true, notes: 'Perfekt utgångspunkt för kajaktur mot Resarö och Rindö. Uthyrning vid hamnen.' },
      bad: {
        beaches: [
          // KÄLLA: vaxholm.se (badplatser) + visitskargarden.se/laesvaert/badplatser-i-vaxholm.aspx — badplatsen på Rindö heter Grönviksbadet/Grönviken, "liten sandstrand och en brygga", renoverad 2020
          {
            name: 'Grönviksbadet (Rindö)',
            type: 'sandstrand',
            desc: 'Liten sandstrand med brygga på grannön Rindö. Mer undanskymd än Vaxholms hamn.',
            child_friendly: true,
            // KÄLLA: Trafikverket, trafikverket.se/resa-och-trafik/farjetrafik/vaxholmsleden/ — gratis vägfärja, ca 6 min över 970 m
            directions: 'Rindö nås från Vaxholm med den gratis vägfärjan Vaxholmsleden (ca 6 min) eller egen båt.',
            insider_tip: 'Mindre besökt än Vaxholms hamn — ta med matsäck.',
          },
        ],
      },
      fiske: true,
    },
    amenities: { toilets: true, shower: true, cafe: true, grocery: true, atm: true },
    dog_friendly: true,
    dog_notes: 'Vaxholm är hundvänligt med gott om promenadstråk. Koppeltvång i hamn och tätort.',
    insiderTips: [
      // KÄLLA: OpenStreetMap ("Buss 670: Tekniska högskolan – Vaxholm"), moovitapp.com, rome2rio.com — linjenumret är 670, inte 676
      'Vaxholm nås med SL-buss 670 från Tekniska Högskolan (tunnelbana röd linje), ett billigare alternativ till båt och ofta lika snabbt.',
      // KÄLLA: vaxholmsfastning.se/historik (läst 2026-08-25) + SFV — blockhus på Vaxholmen i början av 1500-talet (Svante Nilsson Sture), Gustav Vasas nya och kraftigare fästning 1548, nuvarande kastell 1833–1863. Tidigare stod här att 1548 var den FÖRSTA fästningen.
      'Vaxholmen befästes redan i början av 1500-talet med ett blockhus, och 1548 lät Gustav Vasa uppföra en ny och kraftigare fästning som avvisade både danska och ryska anfall. Det kastell som står här i dag byggdes 1833–1863, sedan den gamla fästningen rivits. Kastellet kan besökas sommartid.',
      'Vaxholm är en av få skärgårdsdestinationer med apotek, post och ett brett serviceutbud öppet hela året.',
      'Innerstan i Vaxholm har välbevarad trähusmiljö med byggnader från 1800-talets slut, en av de mer intakta trästadsmiljöerna i Stockholmsregionen.',
    ],
    blogLinks: [
      { slug: 'vaxholm-guide', title: 'Vaxholm – skärgårdsstadens kompletta guide' },
      { slug: 'waxholmsbolaget-guide', title: 'Waxholmsbolaget – komplett guide till båttrafiken' },
    ],
    seasonal: {
      open: 'Hela året',
      peak: 'Juli–Augusti',
      best: 'Maj–Juni eller September',
      bestReason: 'Vaxholm är en stad med åretruntservice. Undvik högsommarens trängseln — maj och september ger samma upplevelse med halva folkligheten.',
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
    tagline: 'Naturreservat mitt i skärgården — vandringsstigar, bad och STF-boende.',
    seoTitle: 'Grinda 2026 – Grinda Wärdshus, natur & gästhamn',
    seoDescription: 'Guide till Grinda: Grinda Wärdshus, natur, gästhamn och båt från Strömkajen. Skärgårdsstiftelsens ö i mellersta skärgården.',
    description: [
      // KÄLLA: lansstyrelsen.se, naturreservat Grinda — "Skyddat sedan: 2000", "Förvaltare: Skärgårdsstiftelsen", "Markägare: Skärgårdsstiftelsen", "Storlek: 503 hektar varav land 178"
      // KÄLLA: skargardsstiftelsen.se/omraden/grinda/ — "Grinda är ett naturreservat som ägs och förvaltas av Skärgårdsstiftelsen"
      'Grinda är ett naturreservat som ägs och förvaltas av Skärgårdsstiftelsen. Reservatet är skyddat sedan 2000 och omfattar 503 hektar, varav 178 hektar land. Att marken har en långsiktig förvaltare är en stor del av förklaringen till att ön fortfarande ser ut som den gör.',
      // KÄLLA: svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ — "Hotellet erbjuder 28 moderna dubbelrum och två King Size rum" / "På öns södra sida hittar ni Grinda Sea Lodge, som är ett lite enklare men minst lika charmigt boende." / "Frukost ingår i rumspriset eller finns att köpa mot tillägg."
      'Boendet drivs av Svenska Turistföreningen under namnet STF Grinda Hotell & Sea Lodge. Hotellet erbjuder 28 dubbelrum och två King Size-rum i en tillbyggnad till huvudbyggnaden. På öns södra sida ligger Grinda Sea Lodge, ett enklare boende. Frukost ingår i rumspriset eller finns att köpa mot tillägg.',
      // KÄLLA: svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ — "Det anrika Grinda Wärdshus erbjuder vällagad klassisk skärgårdsmat." samt restaurangen Framfickan vid hamnen
      // KÄLLA: skargardsstiftelsen.se/omraden/grinda/ — "Grinda Wärdshus har restaurang, hotellrum och vandrarhem"
      'Grinda Wärdshus har restaurang, hotellrum och vandrarhem, och serverar klassisk skärgårdsmat. Nere vid hamnen ligger Framfickan, det enklare alternativet när man vill äta i solen utan att klä om. Matsalen på wärdshuset har en äldre träinredning som inte känns bortrenoverad.',
      // KÄLLA: svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ — hotellet och huvudrestaurangen ligger cirka en kilometer från bryggorna, ungefär 15 minuters promenad
      'Hotellet och huvudrestaurangen ligger ungefär en kilometer från bryggorna, runt en kvarts promenad. Vägen dit går genom skogen och är en del av ankomsten: man lämnar bryggan och hamnljuden bakom sig innan man är framme.',
      // KÄLLA: skargardsstiftelsen.se/omraden/grinda/ — natur- och kulturstig som förbinder norra och södra bryggan; "Stockholm Archipelago Trail på Grinda" bjuder på "en varierad vandring genom skogar, öppna ängar"
      'En natur- och kulturstig förbinder norra och södra bryggan, och Stockholm Archipelago Trail har en etapp på Grinda med en varierad vandring genom skogar och öppna ängar. Lederna är korta nog att man hinner med de flesta på en dag.',
      // KÄLLA: skargardsstiftelsen.se/omraden/grinda/ — "barnvänliga badstränder", badplatsen Källviken samt grillplatser
      'Bad finns på flera ställen. Skärgårdsstiftelsen pekar ut barnvänliga badstränder och badplatsen Källviken, och det finns grillplatser i anslutning. Vattnet i de skyddade vikarna blir badbart tidigare på säsongen än på öppnare lägen.',
      // KÄLLA: lansstyrelsen.se, naturreservat Grinda — föreskrifterna förbjuder att "medföra okopplad hund"; "Tältning är endast tillåten på tältplatsen nära norra bryggan"
      'Reservatsföreskrifterna sätter ramarna. Hund ska hållas kopplad, och tältning är endast tillåten på tältplatsen nära norra bryggan. I övrigt är det fritt att vandra och slå sig ner på klipporna.',
      // KÄLLA: skargardsstiftelsen.se/omraden/grinda/ — "Grinda lanbruk där kor, hästar och andra djur betar och bidrar till det levande kulturlandskapet"
      // KÄLLA: skargardsstiftelsen.se/var-verksamhet/jordbruken-och-angarna/ (Grinda lantbruk ingår bland Skärgårdsstiftelsens jordbruk)
      'På Grinda finns ett jordbruk, Grinda lantbruk, där kor, hästar och andra djur betar och bidrar till det levande kulturlandskapet. Det ingår bland Skärgårdsstiftelsens jordbruk i skärgården, och betet är anledningen till att ängarna är öppna.',
      // KÄLLA: skargardsstiftelsen.se/omraden/grinda/ — lanthandel, café och tältplats håller öppet sommartid
      'Sommartid finns lanthandel, café och tältplats på ön. Utbudet är litet och det är en del av poängen: aktiviteten här är att gå, bada, äta och göra relativt lite annat.',
      'Ön har bra proportioner. Den är stor nog att inte kännas trång och liten nog att man hittar runt utan karta. Skogen är tät på mitten, klipporna öppnar sig mot vattnet i norr och söder.',
      'Att bo kvar ett par dagar ger tillgång till timmarna som dagsbesökare missar: tidiga morgnar när dimman hänger kvar i sunden, och eftermiddagen när båtarna gått och ön är som stillsammast.',
      'Grinda passar inte alla. Den som vill ha livlig hamnmiljö, flera restaurangalternativ eller kommersiell underhållning tycker att det är tyst till gränsen för tristess. Den som vill ha natur, lugn och bra bad tycker tvärtom.',
    ],
    facts: {
      // KÄLLA: Waxholmsbolagets tabell 11 Strömkajen–Södra Grinda, snabbast 1 tim 35, de flesta 1 tim 50–2 tim 15.
      travel_time: '~2 h med Waxholmsbåt från Strömkajen (snabbast 1 tim 35)',
      character: 'Naturskönt, välskött, bra mat, populär gästhamn',
      season: 'Maj–September',
      best_for: 'Seglare, vandring, romantiska par, familjer',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      { icon: '🚶', name: 'Vandring', desc: 'Markerade stigar runt hela ön. Klipporna i norr ger panoramautsikt mot skärgården.' },
      { icon: '🛶', name: 'Kajak & SUP', desc: 'Uthyrning vid Wärdshuset. Paddla söder om ön mot de omgivande grunden.' },
      { icon: '🏊', name: 'Bad', desc: 'Grinda har flera fina badplatser, varav en sandstrand vid gästhamnen.' },
      { icon: '⛵', name: 'Segling', desc: 'Grinda Gästhamn är ett klassiskt stopp på Sandhamnsleden. Välutrustad med full service.' },
      { icon: '🌅', name: 'Solnedgångspromenaden', desc: 'Promenera till öns västra sida på kvällen för att se solnedgången över vattnet.' },
    ],
    // KÄLLA: grinda.se — Grinda Wärdshus driver boendet på ön. "Hotellrum i fyra hus", "håller hög standard" och säsongsangivelsen var obelagda och togs bort 2026-09-14.
    accommodationIntro: 'Grinda Wärdshus driver boendet på ön: hotellrum, Sea Lodge-stugor nära vattnet och camping. Allt går att nå utan bil.',
    // KÄLLA: grinda.se/en/accommodation (hotels, sea-lodge, camping: "No reservation is needed"); svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge (läst 2026-09-14)
    accommodation: [
      { name: 'Grinda Wärdshus Hotell', type: 'Hotell', desc: 'Hotellrum i hus nära wärdshuset, frukost ingår. STF-anslutet (STF Grinda Hotell & Sea Lodge). Boka i förväg sommartid.', websiteUrl: 'https://grinda.se' },
      { name: 'Grinda Sea Lodge', type: 'Stugor', desc: 'Enkelt boende på öns södra sida; måltider lagas av personal och äts gemensamt, frukost ingår.', websiteUrl: 'https://grinda.se/en/accommodation/sea-lodge/' },
      { name: 'Grinda Camping', type: 'Camping', desc: 'Tältplats i naturskön miljö. Ingen förbokning krävs — välj plats när du kommer.', websiteUrl: 'https://grinda.se/en/accommodation/camping/' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: '2 h', desc: 'Direktlinje. Ordinarie Waxholmsbolagsbiljett krävs — SL-kort gäller inte på reguljär skärgårdstrafik under högsäsong.', icon: '⛴' }, // KÄLLA: svalla.se/guider/waxholmsbolaget-guide ("SL-kortet gäller INTE på Waxholmsbolagets reguljära skärgårdstrafik"); SL-biljett gäller samtliga linjer endast 14 sep–29 apr (mynewsdesk.com/se/sl)
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Gästhamnen tar emot alla. Boka el-plats i förväg.', icon: '⛵' },
    ],
    harbors: [
      // KÄLLA: grinda.se/hamn-mack/gasthamn — "gästhamn för 100 båtar", el, dusch, toalett, "28 st bokningsbara platser"; /sakerhet-service — "Färskvatten … i dunk"; /sjomack — "Bensin 98, Diesel, Gasol"; skargardsstiftelsen.se — "Gästhamn finns i Hemviken". Tvätt/wifi nämns inte.
      { name: 'Grinda Gästhamn (Hemviken)', desc: 'Gästhamn för ca 100 båtar med el, dusch, toalett, färskvatten och sjömack. 28 bokningsbara platser.', fuel: true, service: ['el', 'vatten', 'dusch', 'bränsle'] },
    ],
    restaurants: [
      // KÄLLA: grinda.se/mat-fest/wardshuset — "Grinda Wärdshus klassisk skärgårdsmat & stämning sedan 1906", "blickat ut över Saxarfjärden"; skargardsstiftelsen.se/omraden/grinda — "Mitt på ön ligger Grinda Wärdshus"
      { name: 'Grinda Wärdshus', type: 'Restaurang', desc: 'Wärdshus från 1906 med klassisk skärgårdsmat och utsikt över Saxarfjärden. Boka bord.', bookingUrl: 'https://grinda.se/boka-bord/', websiteUrl: 'https://grinda.se/mat-fest/wardshuset/' },
      // KÄLLA: grinda.se/mat-fest/framfickan — "hamnkrog, pizza & lättare rätter", "Gästhamnen ligger bara tio simtag bort", "endast drop-in"
      { name: 'Framfickan', type: 'Bistro', desc: 'Hamnkrog vid gästhamnen med pizza och lättare rätter. Endast drop-in.', websiteUrl: 'https://grinda.se/mat-fest/framfickan/' },
      // KÄLLA: grinda.se/mat-fest/lanthandel-cafe — "Nedanför Grinda Wärdshus ligger vår … Lanthandel med tillhörande cafédel … frukost och enklare luncher"
      { name: 'Grinda Lanthandel & Café', type: 'Café', desc: 'Lanthandel med café nedanför Wärdshuset. Frukost, enklare luncher och glass.', websiteUrl: 'https://grinda.se/mat-fest/lanthandel-cafe/' },
    ],
    tips: [
      // KÄLLA: lansstyrelsen.se, naturreservat Grinda — föreskrifterna förbjuder att "medföra okopplad hund"
      'Hunden ska vara kopplad — det gäller hela reservatet, inte bara under häckningen.',
      // KÄLLA: lansstyrelsen.se, naturreservat Grinda — "Tältning är endast tillåten på tältplatsen nära norra bryggan"
      'Ska du tälta måste du göra det på tältplatsen nära norra bryggan.',
      // KÄLLA: svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ — hotellet ligger cirka en kilometer från bryggorna, ungefär 15 minuters promenad
      'Räkna med en kvarts promenad från bryggan upp till hotellet och wärdshuset.',
      // KÄLLA: skargardsstiftelsen.se/omraden/grinda/ — badplatsen Källviken och barnvänliga badstränder
      'Källviken är ett bra val om ni badar med barn.',
    ],
    related: ['sandhamn', 'finnhamn', 'vaxholm'],
    tags: ['gästhamn', 'värdshus', 'natur', 'segling', 'romantik'],
    // KÄLLA: lansstyrelsen.se, naturreservat Grinda — "Storlek: 503 hektar varav land 178"
    // KÄLLA: lansstyrelsen.se, naturreservat Grinda — "Tältning är endast tillåten på tältplatsen nära norra bryggan"
    // KÄLLA: skargardsstiftelsen.se/omraden/grinda/ — "Grinda lanbruk där kor, hästar och andra djur betar"
    did_you_know: 'Naturreservatet Grinda är 503 hektar stort — men bara 178 hektar av det är land. Tältning på Grinda är bara tillåten på tältplatsen nära norra bryggan. De öppna ängarna på Grinda hålls öppna av betande djur från Grinda lantbruk.',
    transport_meta: {
      from_city_min: 120,
      from_nearest_hub_min: 60,
      nearest_hub: 'Vaxholm',
      operator: 'Waxholmsbolaget',
      line: 'Linje mot Sandhamn',
      frequency: 'Flera avgångar/dag sommartid',
      booking_url: 'https://waxholmsbolaget.se',
      car_parking: 'Inget bilalternativ till Grinda — ta båt från Strömkajen eller Vaxholm. Parkering vid Vaxholms hamn om du kör till Vaxholm.',
    },
    activity_meta: {
      kajak: { difficulty: 'lätt', rental: true, notes: 'Uthyrning vid Wärdshuset. Lugna vatten söder om ön.' },
      bad: {
        beaches: [
          {
            name: 'Sandstrand vid Grinda gästhamn',
            type: 'sandstrand',
            desc: 'En av de få sandstränderna i mellersta skärgården — liten men genuint fin. Direkt vid gästhamnen Hemviken med lugnt, skyddat vatten och god sikt. Populär bland barnfamiljer och de som anländer med Waxholmsbåten.',
            child_friendly: true,
            depth: 'Grunt och sandbotten, barn kan stå långt ut. Vattnet i Hemviken värms upp snabbt.',
            directions: 'Direkt vid gästhamnen — gå längs bryggan söderut, 2 min. Omklädning och toaletter vid vandrarhemmet 50 m bort.',
            insider_tip: 'Bäst tidigt på morgonen när Stockholmsbåtarna ännu inte anlänt. Efter kl 14 är det fullt med dagsbåtsturister.',
          },
          {
            name: 'Klippbad, norra Grinda',
            type: 'klippbad',
            desc: 'Öppna klipphällar på norra sidan med vid utsikt mot norra skärgårdskorridoren. Mer exponerat och vindpåverkat än sandstranden — bättre för den som gillar det öppna havet. Ensamt och vackert på kvällen.',
            child_friendly: false,
            depth: 'Djupt direkt vid klippkanten — passa yngre barn noga.',
            directions: 'Vandra norrut från vandrarhemmet längs den markerade stigen, ca 20 min.',
            insider_tip: 'Solnedgångsbad härifrån är en av mellersta skärgårdens bäst bevarade hemligheter — ta med dryck och sätt dig ner en timme innan solen går ner.',
          },
        ],
      },
      fiske: false,
    },
    amenities: { toilets: true, shower: true, cafe: true, grocery: true, atm: false },
    dog_friendly: true,
    dog_notes: 'Naturreservat — koppeltvång gäller hela året i reservatet. Hundar i övrigt välkomna på ön.', // KÄLLA: lansstyrelsen.se, naturreservat Grinda, föreskrifter (förbjudet att medföra okopplad hund, ingen angiven säsongsundantag)
    insiderTips: [
      'Grinda är naturreservat och förvaltas av Skärgårdsstiftelsen; ön saknar privat bebyggelse och bilar. STF driver hotell, Sea Lodge och restaurang på ön.', // KÄLLA: lansstyrelsen.se, naturreservat Grinda (Förvaltare/Markägare: Skärgårdsstiftelsen)
      'Grinda har två hamnar: Norra Grinda (gästhamn, mer besökt) och Södra Grinda (naturhamn, lugnare). De flesta turistbåtar lägger till i norr.',
      'STF-anläggningen på Grinda serverar frukost och middag. Under juli och augusti är bokning av bord starkt rekommenderat.',
    ],
    blogLinks: [
      { slug: 'kajak-stockholms-skargard-nyborjare', title: 'Kajak i skärgården – guide för nybörjaren' },
      { slug: 'barnfamilj-skargard', title: 'Skärgård med barnfamilj – 8 tips för en lyckad tur' },
    ],
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Grinda är som vackrast i juni — allt öppet, mycket blommor och färre besökare än i juli.',
      warning: 'Grinda Wärdshus stänger normalt oktober–april. Gästhamnen har begränsad service utanför säsong.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },
  },

  // ─── FINNHAMN ────────────────────────────────────────────────
  {
    slug: 'finnhamn',
    name: 'Finnhamn',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌲',
    tagline: 'Naturreservat på tre hopvuxna öar, med STF-vandrarhem och vandring över klipporna.',
    description: [
      // KÄLLA: skargardsstiftelsen.se/omraden/finnhamn/ — "Stora delar av Finnhamn är ett naturreservat med vandringsstigar som går genom lövskogar, ängar, levande jordbruksbygd och karg skärgårdsnatur." (Skärgårdsstiftelsen förvaltar området)
      // KÄLLA: svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "Naturreservatet Finnhamn består av tre öar som sitter ihop. Lilla och stora Jolpan samt Idholmen."
      'Naturreservatet Finnhamn består av tre öar som sitter ihop: Lilla och Stora Jolpan samt Idholmen. Stora delar av Finnhamn är naturreservat med vandringsstigar som går genom lövskogar, ängar, levande jordbruksbygd och karg skärgårdsnatur. Området förvaltas av Skärgårdsstiftelsen.',
      // KÄLLA: svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "Vandrarhemmet och de tillhörande stugorna har totalt 87 bäddar fördelade på 28 rum." / "Det vackra, gula huset, står högt och syns långväga."
      'Vandrarhemmet drivs av Svenska Turistföreningen som STF Finnhamns Vandrarhem. Det vackra, gula huset står högt och syns långväga. Vandrarhemmet och de tillhörande stugorna har totalt 87 bäddar fördelade på 28 rum. Det är enkelt boende i ordets goda mening, och atmosfären är att alla är välkomna oavsett hur fin båt man kom med.',
      // KÄLLA: svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "en restaurang med takbar som har en vidunderlig utsikt" / "Enklare mat- och caféservering."
      'Vid vandrarhemmet finns en restaurang med takbar och en vidunderlig utsikt, samt enklare mat- och caféservering. Vänta inte ett elaborerat matutbud. Maten är ärlig och passar miljön, och takbaren är platsen man hamnar på när ljuset börjar gå ner.',
      // KÄLLA: skargardsstiftelsen.se/omraden/finnhamn/ — "Stockholm Archipelago Trail har en etapp på Finnhamn: en 10 kilometer lång vandring"
      'Vandring är öns huvudsakliga friluftsaktivitet. Stockholm Archipelago Trail har en etapp på Finnhamn: en tio kilometer lång vandring. Terrängen är klippig och skogbevuxen, och stigarna växlar mellan kustnära promenader och mer krävande partier genom det inre.',
      // KÄLLA: skargardsstiftelsen.se/omraden/finnhamn/ — "möjlighet att hyra kajak och upptäcka de omgivande vikarna, kobbarna och skären i egen takt"
      // KÄLLA: svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "Kanot finns att hyra."
      'Kajak är ett naturligt komplement till vandringen. Det finns möjlighet att hyra kajak och upptäcka de omgivande vikarna, kobbarna och skären i egen takt, och kanot finns att hyra vid vandrarhemmet. Vattnet runt öarna är mindre exponerat än ytterskärgården.',
      // KÄLLA: Waxholmsbolagets tabell 10 (t.o.m. 2022: 12/13) Strömkajen–Finnhamn, snabbast 3 tim 05, typiskt ~3 tim 30.
      'Resan till Finnhamn med Waxholmsbåt tar omkring tre timmar från Stockholm. Båten passerar genom progressivt öppnare delar av den norra skärgården på vägen ut, och själva resan är en del av besöket.',
      // KÄLLA: skargardsstiftelsen.se/omraden/finnhamn/ — Söder Långholm anges som naturhamn i området
      'Söder Långholm, en bit söder om huvudön, är en naturhamn i området. Det finns ingen brygga och ingen kiosk där. Det är den sortens plats man åker tillbaka till.',
      // KÄLLA: sverigesnationalparker.se/park/angso-nationalpark/nationalparksfakta/ — Ängsö nationalpark inrättades 1909 (24 maj 1909), ligger i Norrtälje kommun, syfte "Bevara ett äldre odlingslandskap i väsentligen oförändrat skick", naturtyp "Skärgård, ängs- och hagmarker, blandskog"
      'Ängsö nationalpark i Norrtälje kommun inrättades 1909 och hör därmed till Sveriges första nationalparker. Syftet är att bevara ett äldre odlingslandskap i väsentligen oförändrat skick, och naturen består av skärgård, ängs- och hagmarker och blandskog. Den ligger i samma del av skärgården och är ett mål för den som planerar en längre rutt.',
      'Vattnet runt Finnhamn ligger ofta blankt på morgnarna. Hamnen ligger skyddad i en vik och klipporna runt omkring är släta nog att sitta på hela kvällen.',
      'Den sociala atmosfären är en del av vad som gör platsen speciell: de gemensamma matborden, mötet med andra friluftsmänniskor. Det är ett av få ställen i Stockholms skärgård där det är naturligt att slå sig ner vid ett bord med folk man inte känner och börja prata om vart man ska härnäst.',
      'Finnhamn är ärlig i vad det erbjuder: bra natur, bra vandring, enkelt men bekvämt boende och stämningen på ett vandrarhem. Det erbjuder inte kulinarisk ambition, spa eller något som liknar lyx. Den som vill ha det bör söka sig annorstädes.',
      'Hösten har en specifik stämning här. Löven på de norra klipporna börjar nyanseras, stigarna är tomma och ön visar sin mer stillsamma sida.',
    ],
    facts: {
      // KÄLLA: Waxholmsbolagets tabell 10 Strömkajen–Finnhamn, snabbast 3 tim 05 (08.30→11.35), typiskt ~3 tim 30; skargardstrafikanten.se: linjen bytte 2023 tabellnummer från 12/13 till 10.
      travel_time: '~3 h med Waxholmsbåt från Strömkajen (linje 10, tidigare 12/13)',
      character: 'Naturnärt, lugnt, genuint, bra för vandring',
      season: 'Maj–September (vandrarhem delvis öppet helår)',
      best_for: 'Vandring, naturupplevelse, seglare, budget-resenärer',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      { icon: '🚶', name: 'Vandring', desc: 'Välmarkerade stigar på ön och de omgivande holmarna. Söder Långholm är ett must.' },
      { icon: '🛶', name: 'Kajak', desc: 'Paddla till omgivande öar och naturhamnar. Uthyrning finns vid vandrarhemet.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Klara och kalla vatten runt ön. Hoppa från klipporna norr om hamnen.' },
      { icon: '⛵', name: 'Segling', desc: 'Paradisviken och Söder Långholm är klassikerhamnar. Välskyddade och natursköna.' },
    ],
    // KÄLLA: svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem; finnhamn.se/en/accommodation; boka.finnhamn.se; skargardsstiftelsen.se/omraden/finnhamn — tältning på två anvisade platser i reservatet; "fråga i lanthandeln" obelagt, borttaget (läst 2026-09-14)
    accommodation: [
      { name: 'STF Finnhamns Vandrarhem', type: 'Vandrarhem', desc: 'STF-vandrarhem i grosshandlarvillan från 1915, flerbädds- och tvåbäddsrum.', websiteUrl: 'https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/' },
      { name: 'Stugby Finnhamn', type: 'Stugor', desc: 'Stugby på Idholmen med ett trettiotal stugor för 2–4 personer samt sjöstugor. Boka tidigt.', websiteUrl: 'https://boka.finnhamn.se' },
      { name: 'Tältplatser', type: 'Camping', desc: 'Tältning bara på två anvisade platser — Finnhamn är naturreservat.', websiteUrl: 'https://skargardsstiftelsen.se/omraden/finnhamn/' },
    ],
    getting_there: [
      // KÄLLA: sl.se/aktuellt/nyheter/sl-biljetter-i-en-del-av-waxholmsbolagets-trafik (SL-biljett/reskassa gäller bara Strömkajen–Vaxholm med omnejd); regionstockholm.se (SL-periodkort 30 dagar+ gäller alla linjer men bara lågsäsong 14/9–29/4).
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: '~3 h', desc: 'SL-biljett gäller inte hela sträckan; SL-periodkort gäller endast under lågsäsong.', icon: '⛴' },
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Ankra i Paradisviken (Djupfladen) eller förtöj i gästhamnen.', icon: '⛵' },
    ],
    harbors: [
      // KÄLLA: finnhamn.se/en/guestharbor/ (Paradise Bay/Paradisviken: vatten, el, sopkärl, mulltoa).
      { name: 'Djupfladen (Paradisviken)', desc: 'Naturhamn och gästhamn klassad som en av skärgårdens bästa. Skyddad och naturskönt.', fuel: false, service: ['vatten', 'el', 'sopor'] },
      { name: 'Vandrarhemsviken', desc: 'Hamn vid vandrarhemet med service.', fuel: false, service: ['el', 'vatten'] },
    ],
    restaurants: [
      // KÄLLA: finnhamn.se/ata — "Finnhamns krog är belägen nere vid ångbåtsbryggan … klassisk inriktning på lunchen och en á la carte meny som varierar under säsongen"
      { name: 'Finnhamns krog', type: 'Restaurang', desc: 'Krog vid ångbåtsbryggan med klassisk lunch och säsongsvarierad à la carte.', websiteUrl: 'https://finnhamn.se/ata/' },
      // KÄLLA: finnhamn.se/ata — "Uppe på krogens tak ligger … Takbaren … nästan 150 sittplatser", öppen "Vid midsommar … till mitten augusti"
      { name: 'Takbaren', type: 'Bar', desc: 'Bar på krogens tak med ca 150 sittplatser. Öppen midsommar till mitten av augusti.', websiteUrl: 'https://finnhamn.se/ata/' },
      // KÄLLA: finnhamn.se/en/eat/ ("Ragnar's Kiosk, located at Paradise Bay beach").
      { name: 'Ragnars kiosk', type: 'Kiosk', desc: 'Glassbod och enkla tilltugg vid Paradisviken.', slug: 'ragnars-kiosk-finnhamn' },
      { name: 'Lanthandeln', type: 'Handel', desc: 'Proviant, kaffe och metmask. Allt du behöver.' },
    ],
    tips: [
      // KÄLLA: skargardsstiftelsen.se/omraden/finnhamn/ — Söder Långholm anges som naturhamn i området
      'Söder Långholm en bit söder om ön är en naturhamn utan brygga och kiosk.',
      // KÄLLA: skargardsstiftelsen.se/omraden/finnhamn/ — "Stockholm Archipelago Trail har en etapp på Finnhamn: en 10 kilometer lång vandring"
      'Stockholm Archipelago Trails etapp på Finnhamn är 10 kilometer — räkna in den i dagsplaneringen.',
      // KÄLLA: skargardsstiftelsen.se/omraden/finnhamn/ — "möjlighet att hyra kajak"; svenskaturistforeningen.se — "Kanot finns att hyra."
      'Kajak och kanot går att hyra på ön om du vill ut bland kobbarna.',
    ],
    related: ['grinda', 'ingmarso', 'ljustero'],
    tags: ['vandrarhem', 'natur', 'vandring', 'segling', 'lugnt'],
    // KÄLLA: en.wikipedia.org/wiki/Finnhamn ("The name Finnhamn is derived from the Finnish boats which called into the harbour on their way to and from Stockholm") — inget källbelagt århundrade hittat.
    // KÄLLA: svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "Naturreservatet Finnhamn består av tre öar som sitter ihop. Lilla och stora Jolpan samt Idholmen."
    // KÄLLA: svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/ — "Vandrarhemmet och de tillhörande stugorna har totalt 87 bäddar fördelade på 28 rum."
    // KÄLLA: sverigesnationalparker.se/park/angso-nationalpark/nationalparksfakta/ — Ängsö nationalpark inrättades 1909
    did_you_know: '"Finnhamn" är egentligen tre öar som sitter ihop: Lilla och Stora Jolpan samt Idholmen. Vandrarhemmet och stugorna rymmer tillsammans 87 bäddar fördelade på 28 rum. Ängsö nationalpark i Norrtälje kommun inrättades 1909 och är en av Sveriges första nationalparker.',
    insiderTips: [
      // KÄLLA: skargardsstiftelsen.se/omraden/finnhamn/ och lansstyrelsen.se naturreservat Finnhamn (Skärgårdsstiftelsen äger/förvaltar, naturreservat sedan 2000); roslagen.se (tältning endast på två anvisade platser).
      'Finnhamn ägs och förvaltas av Skärgårdsstiftelsen och är naturreservat sedan år 2000. STF driver vandrarhemmet på ön, som har anvisade tältplatser vid sidan av vandrarhemsboendet.',
      // KÄLLA: en.wikipedia.org/wiki/Finnhamn — inget källbelagt århundrade hittat.
      'Namnet Finnhamn kommer av att finska båtar använde hamnen som tillfällig anhalt på väg till och från Stockholm. Det är inte en person vid namn Finn.',
      'Kajakuthyrning finns på Finnhamn under sommarsäsongen. Ön är ett av de bättre utgångspunkterna för kajakpaddling i mellersta skärgården.',
      'Caféet och kiosken på Finnhamn stänger relativt tidigt under kvällen. Ta med proviant om du planerar en sen ankomst.',
    ],
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Lugn ö som sällan är fullsatt. Juni ger grönare natur och September ger svamprika skogar.',
      warning: 'Båttrafiken till Finnhamn är begränsad utanför sommarsäsongen. Kontrollera tidtabellen i förväg.',
      months: ['off','off','off','off','limited','open','peak','open','limited','off','off','off'],
    },
    activity_meta: {
      kajak: { difficulty: 'lätt', rental: true, notes: 'Paddla ut till Paradisviken (Djupfladen) och Söder Långholm. Uthyrning via vandrarhemet.' },
      bad: {
        beaches: [
          {
            // KÄLLA: ingen källa hittad för platsnamnet "Berg" efter sökning; bytt till overifierbar riktningsbeskrivning.
            name: 'Klippbad norr om hamnen',
            type: 'klippbad',
            desc: 'Klipphällar norr om hamnen med svalt, klart vatten och utsikt mot norra skärgårdskorridoren. Stillare och mer ostört än hamnfronten — morgondoppet här är en ritual för vandrarhemsgästerna.',
            child_friendly: true,
            depth: 'Hopphällar finns, men även grunt parti för barn.',
            directions: 'Följ stigen norrut från vandrarhemet. Fråga personalen om den exakta leden.',
            insider_tip: 'Ta med kaffe från kiosken och kom hit i gryningen — vattnet är klarare och kallare på morgonen, och du har hela klippan för dig själv.',
          },
          {
            // KÄLLA: ingen källa hittad för platsnamnet "Långvik" efter sökning; bytt till riktningsbeskrivning.
            name: 'Klippbad söder om hamnen',
            type: 'klippbad',
            desc: 'Skyddad vik på södra sidan av Finnhamn med lugnare vatten och mer sol eftermiddagstid. Mer tillgänglig för de med barn än de norra klipporna.',
            child_friendly: true,
            depth: 'Litet grunt parti vid vikens inre del — bra för de yngre.',
            directions: 'Ta stigen söderut från hamnen. Välmarkerat.',
            insider_tip: 'Söder Långholm (den lilla ön söder om Finnhamn) har ännu bättre klippbad — paddla dit med kajak om du hyr en.',
          },
        ],
      },
      // KÄLLA: stockholmarchipelagotrail.com/sv/section/etapp-finnhamn/ (medelslinga 10,1 km; tre slingor plus Båtluffarleden) — ingen källa för exakt 12 km, justerat till belagd slinglängd.
      vandring: { trails: 4, max_km: 10 },
    },
  },

  // ─── MÖJA ────────────────────────────────────────────────────
  {
    slug: 'moja',
    name: 'Möja',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: 'island',
    tagline: 'Byar, kyrka och lanthandel i Stockholms mellersta skärgård.',
    seoTitle: 'Möja 2026 – bilfri ö med krog & äkta skärgård',
    seoDescription: 'Guide till Möja: bilfri ö med värdshus och bageri, cykelleder och lantliv. Hur du tar dig dit och vad som finns på ön.',
    description: [
      // KÄLLA: varmdo.se/download/.../Möja.pdf — "Huvudöarna Möja och Södermöja har cirka 250 bofasta"; byarna Berg, Långvik, Ramsmora, Löka och Södermöja
      'Möja ligger i Stockholms mellersta skärgård. Huvudöarna Möja och Södermöja har omkring 250 bofasta, fördelade på byarna Berg, Långvik, Ramsmora, Löka och Södermöja. Ön är avlång i nord-sydlig riktning, och landskapet växlar mellan skog, öppen mark och klippor längs hela sträckan.',
      // KÄLLA: varmdo.se/download/.../Möja.pdf — "Öns skola finns i Berg ... och har ca 25 elever från förskola till klass 9"
      'Öns skola ligger i Berg och har ett tjugofemtal elever från förskola till årskurs 9.',
      // KÄLLA: varmdo.se/download/.../Möja.pdf — "Kyrkan uppfördes 1768" (renoverad på 1880-talet)
      'Möja kyrka uppfördes 1768 och renoverades på 1880-talet.',
      // KÄLLA: varmdo.se/download/.../Möja.pdf — "åka buss 434 från Slussen till Sollenkroka ... restid ca 2,5 timme"; "båt från Strömkajen tar ca 3-4 timmar"
      'Till Möja reser man med båt. En väg går med buss 434 från Slussen till Sollenkroka och båt därifrån; en annan går med båt hela vägen från Strömkajen, vilket tar betydligt längre tid. Restiden fungerar som ett filter — hit kommer man med avsikt.',
      // KÄLLA: konsummoja.se — Möja Konsumtionsförening driver Coop Berg, "Den stora butiken på Möja och som har öppet året runt", samt en obemannad automatbutik i Långvik
      'Möja Konsumtionsförening driver Coop i Berg, som håller öppet året runt, och en obemannad automatbutik i Långvik.',
      // KÄLLA: visitmoja.se/äta-och-handla-på-möja — Möja värdshus, Hamnbaren, Les Poissonniers de Möja, Jeppes, Hamncafét, Möja bageri; Hamncafét: "Café med glass och bullar samt cykeluthyrning"
      'Matutbudet är småskaligt och säsongsbetonat. På ön finns Möja värdshus, Hamnbaren, Les Poissonniers de Möja, Jeppes, Hamncafét och Möja bageri. Hamncafét serverar glass och bullar och hyr ut cyklar.',
      // KÄLLA: rolandsvenssonmuseet.se — "Roland Svensson (1910-2003)"; visitskargarden.se/se-goera/kultur-musik/roland-svensson-museet-paa-moeja.aspx — museet ligger vid Ramsmora brygga; målar- och skrivarhörnorna flyttades 2014 från ateljén på Tornö
      'Roland Svensson-museet ligger vid Ramsmora brygga. Roland Svensson (1910–2003) skildrade skärgården och dess människor i bild och text, och hans målar- och skrivarhörnor flyttades 2014 från ateljén på Tornö till det nybyggda museet. En glasvägg vetter ut mot det landskap han arbetade med.',
      // KÄLLA: varmdo.se/download/.../Möja.pdf — Björndalens naturreservat, Storö-Bockö-Lökaö naturreservat och Granholmens naturreservat
      'Tre naturreservat ligger i och kring Möja: Björndalens, Storö-Bockö-Lökaö och Granholmens.',
      // KÄLLA: varmdo.se/download/.../Möja.pdf — "För Möjaborna var fisket den mest betydelsefulla inkomstkällan till långt in på 1980-talet"
      'Fisket var Möjabornas viktigaste inkomstkälla långt in på 1980-talet. Sjöbodarna och bryggorna längs vattnet hör till den historien, och morgonarna vid hamnen är fortfarande tysta.',
    ],
    facts: {
      // KÄLLA: Waxholmsbolagets tabell 14. Möja nås från SOLLENKROKA (ej Stavsnäs), ~40 min–1 tim till byns bryggor. Strömkajen–Berg ~3,5 tim (08.50→12.30).
      travel_time: '~40 min–1 tim från Sollenkroka · ~3,5 h från Strömkajen',
      character: 'Bilfri, lantlig, genuint, lugnt',
      season: 'Maj–September',
      best_for: 'De som söker äkta skärgårdsliv utan turister',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      { icon: '🎨', name: 'Roland Svensson-museet', desc: 'Museum tillägnat skärgårdskonstnären Roland Svensson (1910–2003). Öppnade 2014 vid Ramsmora ångbåtsbrygga — Roland Svenssons gamla ateljé från Tornö är bevarad och flyttad in i museet.' },
      { icon: '🚶', name: 'Vandring', desc: 'Promenera mellan hamnarna och genom lantliga bymiljöer. Ingen brådska, inga turiststigar.' },
      { icon: '⛪', name: 'Möja kyrka', desc: 'Vacker liten kyrka med utsikt. Välskött och värd ett besök.' },
      { icon: '🎣', name: 'Fiske', desc: 'Utmärkt fiskevatten runt ön. Abborre och gädda i vikarna, havsöring utanför.' },
      { icon: '🛶', name: 'Kajak', desc: 'Paddla runt öns södra sida mot Gällnö och Svartsö.' },
    ],
    // Påståendet om uthyrning via lokalbor och plattformar gick inte att belägga och togs bort 2026-09-14.
    accommodationIntro: 'Boendet på Möja är småskaligt — vandrarhem och värdshus snarare än hotellanläggningar.',
    // KÄLLA: svenskaturistforeningen.se/boende/stf-moja-vandrarhem (öppet april–december); mojavardshusochbageri.se. Wikströms Fisk stängde 13 juni 2024 (wikstromsfisk.com) — inget boende där (läst 2026-09-14)
    accommodation: [
      { name: 'STF Möja Vandrarhem', type: 'Vandrarhem', desc: 'STF-vandrarhem med självhushåll, rum för 2–4 personer. Öppet april–december. Boka i god tid inför sommaren.', websiteUrl: 'https://www.svenskaturistforeningen.se/boende/stf-moja-vandrarhem/' },
      { name: 'Möja Värdshus & Bageri', type: 'B&B', desc: 'Värdshus och bageri med B&B-boende under förlängd sommarsäsong.', websiteUrl: 'https://mojavardshusochbageri.se' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Sollenkroka', time: '~40 min', desc: 'Waxholmsbolagets linje 14 från Sollenkroka brygga (buss 434 från Slussen dit) — flera bryggor på Möja: Berg, Ramsmora, Långvik. Även direktbåt från Strömkajen, ~3,5 h.', icon: '⛴' },
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Förtöj vid någon av öns gästhamnar (Kyrkviken i Berg och Långvik är huvudalternativen).', icon: '⛵' },
    ],
    harbors: [
      // KÄLLA: gasthamnsguide.se (Möja Kyrkviken Gästhamn: Dusch, WC, El, Färskvatten, Livsmedel, Restaurang, Drivmedel); hamnkartan.se (Kyrkviken gästhamn ligger i Berg)
      { name: 'Kyrkviken gästhamn', desc: 'Huvudhamnen i Berg på östra Möja, i viken Kyrkviken. Bra service och nära till restauranger och bageri.', service: ['el', 'vatten', 'dusch'] },
      { name: 'Långvik gästhamn', desc: 'Mindre gästhamn i Långvik, lugnare och mer naturnära.', service: ['el', 'vatten'] },
    ],
    restaurants: [
      // KÄLLA: mojavardshusochbageri.se — "genuin och hemtrevlig skärgårdsrestaurang med fullskaligt bageri", "Möja bageris historia tar sin början 1951", Bergs by
      { name: 'Möja Värdshus & Bageri', type: 'Värdshus/Bageri', desc: 'Skärgårdsrestaurang med eget bageri i Bergs by. Bagerihistoria sedan 1951. Säsongsöppet.', websiteUrl: 'https://mojavardshusochbageri.se' },
    ],
    tips: [
      'Möja är inte en plats att hasta igenom — stanna gärna minst en natt.',
      // KÄLLA: visitskargarden.se/se-goera/kultur-musik/roland-svensson-museet-paa-moeja.aspx — museet ligger vid Ramsmora brygga
      'Roland Svensson-museet ligger vid Ramsmora brygga.',
      // KÄLLA: konsummoja.se — Coop Berg har öppet året runt; Långvik är obemannad automatbutik
      'Coop i Berg har öppet året runt; butiken i Långvik är en obemannad automatbutik.',
    ],
    related: ['sandhamn', 'gallno', 'finnhamn'],
    tags: ['bilfri', 'lantlig', 'genuint', 'lugnt', 'konstnär'],
    // KÄLLA: varmdo.se bibliotekssida (Möja saknas i listan över biblioteksfilialer); visitmoja.se/om-möja (skola och Coop, ingen uppgift om mejeri/bibliotek)
    did_you_know: 'Möja har en byskola som är öppen året runt och en Coop-butik, trots att ön saknar fast vägförbindelse till fastlandet.',
    transport_meta: {
      from_city_min: 195,
      from_nearest_hub_min: 60,
      nearest_hub: 'Sollenkroka',
      operator: 'Waxholmsbolaget',
      line: 'Linje 14 (Sollenkroka–Möja); buss 434 Slussen–Sollenkroka',
      frequency: '2–4 avgångar/dag sommartid, glesare vinter',
      booking_url: 'https://waxholmsbolaget.se',
      // KÄLLA: Värmdö kommun — https://www.varmdo.se/varmdohamnar/parkera.4.6e5e3cc318a8d4dc3f6361bf.html (hämtad 2026-08-06)
      car_parking: 'Parkering vid Sollenkroka brygga (avfärdshamn för Möja). Vid Stavsnäs vinterhamn finns ca 1 300 platser men den hamnen gäller Sandhamn/Nämdö-trafiken, inte Möja. Pendelbuss 428 från Slussen till Stavsnäs (ca 60 min med SL-kort).',
    },
    activity_meta: {
      kajak: { difficulty: 'lätt', rental: true, notes: 'Paddla söderut mot Gällnö och Svartsö. Uthyrning vid Berg.' },
      bad: {
        beaches: [
          {
            name: 'Klippbad vid Berg',
            type: 'klippbad',
            desc: 'Klipphällar i anslutning till Bergs hamn på östra Möja.',
            child_friendly: true,
            depth: 'Varierar — hör efter lokalt före bad med barn.',
            directions: 'I anslutning till Bergs by/hamn.',
            insider_tip: 'Fråga i Coop-butiken i Berg om aktuell väg dit.',
          },
          {
            name: 'Klippbad vid Långvik',
            type: 'klippbad',
            desc: 'Badplats i anslutning till Långvik på Möjas västsida, nära Coop-butiken.',
            child_friendly: true,
            depth: 'Varierar — hör efter lokalt före bad med barn.',
            directions: 'I anslutning till Långvik.',
            insider_tip: 'Fråga i Coop-butiken i Långvik om aktuell väg dit.',
          },
          {
            name: 'Klippbad södra Möja',
            type: 'klippbad',
            desc: 'Klippartier på södra Möja mot öppet vatten.',
            depth: 'Varierar.',
            directions: 'Söderut från Berg.',
            insider_tip: 'Södersidan är öppen och kan vara blåsig — kolla väderprognosen innan du ger dig ut.',
          },
        ],
      },
      // KÄLLA: visitmoja.se/vandra (Stockholm Archipelago Trail-sektionen Långvik–Berg–Hamn med gren till Ulvik, samt Naturstigen Hamn–Ramsmora)
      vandring: { trails: 2 },
      fiske: true,
    },
    // KÄLLA: gasthamnsguide.se (Kyrkviken gästhamn, Berg: "Dusch | WC | El | Färskvatten...")
    amenities: { toilets: true, shower: true, cafe: true, grocery: true, atm: false },
    dog_friendly: true,
    dog_notes: 'Hundvänlig ö med gott om utrymme. Koppeltvång i hamnområden och på några naturreservatsdelar.',
    insiderTips: [
      'Möja har ungefär 200 fastboende och en fungerande byskola, en av de mer välbefolkade yttre öarna i Stockholms mellersta skärgård.',
      'Wikströms på Möja säljer färsk fisk och räkor direkt från fiskaren. Öppet under sommarsäsongen vid hamnen.',
      // KÄLLA: konsummoja.se; visitmoja.se/äta-och-handla-på-möja
      'Det finns Coop-butiker på Möja (Berg och Långvik) med ett gott utbud för en ö utan fast vägförbindelse.',
      'Möja är bilfri för besökare men har ett internt bilsystem för de fastboende.',
    ],
    blogLinks: [
      { slug: 'dolda-parlor-moja', title: 'Möjas dolda pärlor – bilfri ö med äkta skärgårdsstämning' },
      { slug: 'cykling-moja-gallno', title: 'Cykla i skärgården – guide för Möja och Gällnö' },
    ],
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Möja är aldrig överfylld men juni och september ger lugnast stämning och de bästa ljusförhållandena för cykelturen.',
      warning: 'Caféet och mataffären håller begränsade öppettider utanför juli–aug. Ta med extra proviant.',
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
    // KÄLLA: stromma.com (Strandvägen ca 30 min), visitskargarden.se (Fjäderholmslinjen Slussen ca 25 min), ResRobot (Waxholmsbolaget Strömkajen 19 min)
    tagline: 'Närmaste skärgårdsöarna från centrala Stockholm — en kort båttur ut.',
    seoTitle: 'Fjäderholmarna 2026 – dagstur 20–30 min från Stockholm', // KÄLLA: stromma.com (30 min), visitskargarden.se (25 min), ResRobot (19 min)
    seoDescription: 'Fjäderholmarna – närmaste skärgårdsupplevelsen från Stockholm. Båt från Strandvägen, restauranger och hantverksgallerier. Guide till din dagstur.',
    description: [
      // KÄLLA: fjaderholmarna.se — Fjäderholmarnas Krog, Restaurang Rökeriet och Fjäderholmarnas Bryggeri anges som verksamheter på ön, liksom hantverkare (trä, textil, keramik, glas)
      // KÄLLA: stromma.com — avgång Strandvägen kajplats 13, restid ca 30 minuter
      'Fjäderholmarna är det enklaste svaret på frågan hur man snabbt tar sig ut i skärgården. En dryg halvtimme med båt från Strandvägen och du står på en ö med rökeri, krog, bryggeri och hantverkare. Ingen bil, ingen planering, ingen övernattning att boka.',
      // KÄLLA: naturkartan.se och visitlidingo.se — ögruppen utgörs av Stora Fjäderholmen, Ängsholmen, Libertas och Rövarns holme; Libertas och Rövarns holme är fågelskyddsområden med landstigningsförbud under häckningstid
      'Ögruppen består av fyra öar: Stora Fjäderholmen, Ängsholmen, Libertas och Rövarns holme. Det är Stora Fjäderholmen man kliver av på. Libertas och Rövarns holme är fågelskyddsområden med landstigningsförbud under häckningstiden.',
      // KÄLLA: fjaderholmarna.se — båtoperatörer: Waxholmsbolaget, Strömma Kanalbolaget och Fjäderholmslinjen
      // KÄLLA: stromma.com — Strandvägen kajplats 13, stopp vid Nacka Strand, ca 30 min
      'Tre operatörer trafikerar öarna: Waxholmsbolaget, Strömma Kanalbolaget och Fjäderholmslinjen. Strömmas båt går från Strandvägen kajplats 13, gör ett stopp vid Nacka Strand och är framme efter cirka 30 minuter. Resan går ut genom Stockholms inlopp förbi Djurgården — en ovanligt snabb övergång från stad till ö.',
      // KÄLLA: rokeriet-fjaderholmarna.se — rökta produkter tillagade på plats, restaurang och deli; visitskargarden.se — deli med skagenmackor, sallader, rökta räkor och chark
      'Restaurang Rökeriet röker sina produkter på plats och säljer dem både i restaurangen och i delin, med skagenmackor, sallader, rökta räkor och chark. Att köpa direkt från ett fungerande rökeri går bra att kombinera med att sätta sig på klipporna en bit bort, med Stockholms inlopp framför sig.',
      // KÄLLA: fjaderholmarnasbryggeri.se — brewpub på Stora Fjäderholmen där ölen serveras direkt från tankarna, pubmeny och ölprovning; huvudproduktionen sker i Bro
      'Fjäderholmarnas Bryggeri driver en brewpub på ön där ölen serveras direkt från tankarna, med pubmeny och ölprovningar. Huvudproduktionen ligger i Bro norr om Stockholm. Uteserveringen vetter mot vattnet.',
      // KÄLLA: fjaderholmarnaskrog.se — Krogen, Hamnbaren och Loftet, bordsbokning online; gasthamnsguide.se — "modern mat med tydlig anknytning till skärgård och svensk mattradition", läge vid gästhamnen
      'Fjäderholmarnas Krog ligger vid gästhamnen och serverar modern mat med tydlig anknytning till skärgård och svensk mattradition, fördelat på Krogen, Hamnbaren och Loftet. Bord bokas online.',
      // KÄLLA: fjaderholmarna.se — utställningen "Allmogebåtar" anges bland öns utställningar
      'På ön finns en utställning med allmogebåtar — traditionella skärgårdsbåtar, kompakt presenterade. Den passar den som vill förstå hur människor rörde sig här innan ångbåtarna.',
      // KÄLLA: fjaderholmarna.se — flera hantverkare listas på ön, bland annat inom trä, textil, keramik och glas
      'Flera hantverkare har verkstad på ön, bland annat inom trä, textil, keramik och glas. Vilka som är på plats varierar mellan säsonger.',
      // KÄLLA: explorearchipelago.com — klippbad med utsikt över Stockholms inlopp samt mindre sandstränder; naturkartan.se — klipphällar för sol
      'Bad går bra från klipporna, med utsikt över Stockholms inlopp, och vid några mindre sandstränder. Klipphällarna fylls tidigt på varma dagar.',
      // KÄLLA: fjaderholmarna.se — "Fjäderholmarna har nu säsongsöppet"
      'Fjäderholmarna drivs inte året runt. Båtar, restauranger och butiker har säsongsöppet under sommarhalvåret; utanför säsong är det mesta stängt. En vardag i början eller slutet av säsongen ger öarna med allt öppet men utan de tätaste folksamlingarna.',
      // KÄLLA: lidingo.se, kulturmiljöunderlag Stora Fjäderholmen — "Fjäderholmarna omnämns i skrift redan 1381"; "Åtminstone sedan 1699 och troligen även sedan långt tidigare fanns krog på Stora Fjäderholmen"; "År 1849 övertogs ägandet av holmarna av Stockholms stad"; "Från 1849 fram till 1880-talets slut använde Stockholms stad nämligen Ängsholmen som deponi för stadens latrintömning"
      'Fjäderholmarna omnämns i skrift redan 1381, och åtminstone sedan 1699 fanns krog på Stora Fjäderholmen — troligen långt tidigare än så. År 1849 övertog Stockholms stad ägandet, och från 1849 fram till 1880-talets slut användes Ängsholmen som deponi för stadens latrintömning.',
      // KÄLLA: lidingo.se, kulturmiljöunderlag Stora Fjäderholmen — "År 1918 när Försvarsmakten (marinen) förvärvade Fjäderholmarna"; "landstigningsförbud, som i princip rådde fram till 1976 då Försvarsmakten lämnade holmarna"; "Kungliga Djurgårdsförvaltningen förvaltar Fjäderholmarna sedan 1982"; ny restaurangbyggnad färdig 1985; "Sedan 1995 ingår Fjäderholmarna i Kungliga nationalstadsparken"
      '1918 förvärvade marinen Fjäderholmarna, och landstigningsförbud rådde i princip fram till 1976 då Försvarsmakten lämnade holmarna. Kungl. Djurgårdens förvaltning har förvaltat öarna sedan 1982, en ny restaurangbyggnad stod färdig 1985 och sedan 1995 ingår Fjäderholmarna i Kungliga nationalstadsparken.',
      'Kvällarna har ett eget ljus. Solen går ner i väster bakom stadens siluett, och uteplatserna vetter åt rätt håll för det.',
    ],
    facts: {
      // KÄLLA: uppmätt mot ResRobot 2026-08-05 — färja 13-1 Stockholm Strömkajen
      // 08:45 → Fjäderholmarna 09:04, alltså 19 min. Stod tidigare "25 min med
      // Cinderellabåtarna från Strandvägen". Restiden var ungefär rätt, men
      // operatören och kajen var fel: Strömmas Cinderella-linje går till
      // Sandhamn, Grinda, Gällnö och Vaxholm — inte till Fjäderholmarna.
      // KÄLLA: visitskargarden.se/fjaederholmslinjen (Slussen ca 25 min) + stromma.com (Strandvägen kajpl 13 ca 30 min) + kungligaslotten.se (Waxholmsbolaget angör, kaj 1; ResRobot 19 min från Strömkajen). Säsong maj–sep.
      travel_time: '~20 min från Strömkajen (Waxholmsbolaget), ~25 min från Slussen (Fjäderholmslinjen), ~30 min från Strandvägen (Strömma), maj–sep',
      character: 'Nära stad, lättillgänglig, hög kvalitet',
      season: 'Maj–September',
      best_for: 'Dagstur, lunch, barnfamiljer, seglare på väg in mot stan',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      { icon: '🍺', name: 'Fjäderholmarnas Bryggeri', desc: 'Brewpub med öl direkt från tanken, pubmeny och ölprovning. Uteservering mot vattnet.' }, // KÄLLA: fjaderholmarnasbryggeri.se
      { icon: '🐟', name: 'Rökeriet', desc: 'Restaurang och deli med rökta produkter tillagade på plats, bland annat rökta räkor och skagenmackor.' }, // KÄLLA: rokeriet-fjaderholmarna.se, visitskargarden.se
      { icon: '🛒', name: 'Hantverk & butiker', desc: 'Glas, keramik, textil, trä, smide och choklad i Hantverkslängan och Verkstadslängan.' }, // KÄLLA: kungligaslotten.se, stromma.com/blogg
      { icon: '🧒', name: 'Klätterbåt & barnlek', desc: 'Lekplats byggd kring en klätterbar båt. Passar barnfamiljer.' }, // KÄLLA: stadtillstrand.se (lekplats med sjunket skepp att klättra i), maringuiden.se (lekplats)
      { icon: '🚶', name: 'Promenad runt ön', desc: 'Promenera runt Stora Fjäderholmen längs klipporna, förbi Jenny Linds ek och de gamla militärbyggnaderna.' }, // KÄLLA: naturkartan.se (Jenny Linds ek, militära lämningar)
    ],
    accommodation: [],
    getting_there: [
      // KÄLLA: stromma.com (Strandvägen kajplats 13, ca 30 min, var 30:e min 10:30–17:00 i högsäsong, 170 kr enkel / 205 kr t/r, säsong 1 maj–13 sep)
      { method: 'Strömma', from: 'Strandvägen kajplats 13', time: '30 min', desc: 'Var 30:e minut dagtid i högsäsong, stopp vid Nacka Strand. 170 kr enkel, 205 kr tur och retur.', icon: '⛴' },
      // KÄLLA: visitskargarden.se/fjaederholmslinjen (Slussen, ca 25 min, timmestrafik); tripadvisor-forum (bryggan vid Skeppsbron, ej SL)
      { method: 'Fjäderholmslinjen', from: 'Slussen (Skeppsbron)', time: '25 min', desc: 'Avgår varje timme sommartid. Biljett köps ombord, ej SL.', icon: '⛴' },
      // KÄLLA: ResRobot 2026-08-05 (Strömkajen 08:45 → Fjäderholmarna 09:04, 19 min); kungligaslotten.se (Waxholmsbolaget kaj 1); sl.se (SL-biljetter gäller Strömkajen–Vaxholm med omnejd)
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: '20 min', desc: 'SL-biljetter gäller på Waxholmsbolagets båtar mellan Strömkajen och Vaxholm med omnejd.', icon: '⛴' },
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Gästplatser i krogviken på östra sidan och vid sjömacken på västra sidan.', icon: '⛵' }, // KÄLLA: maringuiden.se, gasthamnsguide.se
    ],
    harbors: [
      // KÄLLA: svenskagasthamnar.se (35 platser, bojar, dag 100 kr, natt 300 kr, dusch, toalett, 1 maj–30 sep); gasthamnsguide.se ("Dusch | Färskvatten | Restaurang | Lokaltrafik | Drivmedel"); kungligaslotten.se (Sjömacken & Gästhamnskontor)
      { name: 'Fjäderholmarnas Gästhamn & Sjömack', desc: 'Gästplatser i krogviken och vid sjömacken, bojar och långsides. Dag 100 kr, natt 300 kr. Ingen landström. Säsong maj–september.', fuel: true, service: ['toilet', 'shower'] },
    ],
    restaurants: [
      // KÄLLA: fjaderholmarnaskrog.se — "STOCKHOLMS NÄRMASTE SKÄRGÅRDSKROG", à la carte-meny 2026, öppettider 2026 19 juni–13 september, festvåning Magasinet
      { name: 'Fjäderholmarnas Krog', type: 'Restaurang', desc: 'Skärgårdskrog på Fjäderholmarna med à la carte, hamnbar och festvåning. Säsongsöppen.', websiteUrl: 'https://www.fjaderholmarnaskrog.se' },
      { name: 'Rökeriet Fjäderholmarna', type: 'Restaurang', desc: 'Rökta produkter tillagade på plats, bordsservering och deli för take-away. Öppet maj–september, julbord i november–december.' }, // KÄLLA: rokeriet-fjaderholmarna.se
      { name: 'Fjäderholmarnas Bryggeri', type: 'Bar', desc: 'Hantverksöl med Stockholms siluett. Kväll och solnedgång.', slug: 'fjaderholmarna-bryggeri' },
    ],
    tips: [
      // KÄLLA: fjaderholmarna.se — Waxholmsbolaget, Strömma Kanalbolaget och Fjäderholmslinjen trafikerar öarna
      'Tre rederier går hit — Waxholmsbolaget, Strömma och Fjäderholmslinjen — från olika kajer i stan. Välj den kaj som ligger närmast dig.',
      // KÄLLA: fjaderholmarnaskrog.se — bordsbokning sker online
      'Boka bord på Fjäderholmarnas Krog online i förväg om du vill äta på en sommarhelg.',
      // KÄLLA: naturkartan.se och visitlidingo.se — Libertas och Rövarns holme är fågelskyddsområden med landstigningsförbud under häckningstid
      'Libertas och Rövarns holme har landstigningsförbud under fåglarnas häckningstid — håll dig till Stora Fjäderholmen.',
    ],
    related: ['vaxholm', 'grinda', 'bockholmen'],
    tags: ['nära stan', 'dagstur', 'rökeriet', 'öl', 'mat'],
    // KÄLLA: lidingo.se (kulturmiljö-PDF: Försvaret 1918–1976, landstigningsförbud 1940, KDF 1982, ny restaurangbyggnad 1985); systrarnadegen.se (1985 öppnades Stora Fjäderholmen för besökare); nationalstadsparken.se (ammunitions- och minförråd i berg)
    // KÄLLA: lidingo.se, kulturmiljöunderlag Stora Fjäderholmen — "Från 1849 fram till 1880-talets slut använde Stockholms stad nämligen Ängsholmen som deponi för stadens latrintömning"
    // KÄLLA: lidingo.se, kulturmiljöunderlag Stora Fjäderholmen — landstigningsförbud rådde i princip från 1918 till 1976 då Försvarsmakten lämnade holmarna
    // KÄLLA: lidingo.se, kulturmiljöunderlag Stora Fjäderholmen — "Åtminstone sedan 1699 och troligen även sedan långt tidigare fanns krog på Stora Fjäderholmen"
    did_you_know: 'Ängsholmen i Fjäderholmarna var Stockholms stads deponi för latrintömning från 1849 fram till slutet av 1880-talet. Fjäderholmarna var militärt område i nästan sextio år — landstigningsförbud gällde i princip från 1918 till 1976. Det har funnits krog på Stora Fjäderholmen åtminstone sedan 1699.',
    insiderTips: [
      'Fjäderholmarna är den närmaste ön från centrala Stockholm, ungefär 25 minuter med båt från Slussen.',
      // KÄLLA: lidingo.se (militären lämnade 1976); systrarnadegen.se (öppnades för besökare 1985)
      'Ön var militärområde fram till 1976 och öppnades för besökare först 1985, vilket är anledningen till att restauranger och rökeriet öppnade relativt sent.',
      'Rökeriet på Fjäderholmarna säljer rökt fisk och skaldjur och är öppet under sommarsäsongen.',
      // KÄLLA: stromma.com (Strandvägen kajplats 13); visitskargarden.se (Fjäderholmslinjen från Slussen); kungligaslotten.se (Waxholmsbolaget kaj 1); sl.se (SL-biljetter i Waxholmsbolagets trafik Strömkajen–Vaxholm med omnejd)
      'Strömma går från Strandvägen och Fjäderholmslinjen från Slussen — ingen av dem tar SL-biljett. Vill du resa på SL-kortet: ta Waxholmsbolagets båt från Strömkajen.',
    ],
    seasonal: {
      open: 'Maj–September', // KÄLLA: stromma.com, rokeriet-fjaderholmarna.se, fjaderholmarnasbryggeri.se (1 maj–13 sep)
      peak: 'Juli–Augusti',
      best: 'Maj–Juni',
      bestReason: 'Maj och juni ger sommarstemning utan trängsel. Gå promenaden runt ön och lunta på rökeriet utan kö.',
      warning: 'Sommarsäsongen är kort. De flesta verksamheter stänger i mitten av september och öppnar i maj; Rökeriet har julbord i november–december.', // KÄLLA: rokeriet-fjaderholmarna.se (1 maj–13 sep, julbord 20 nov–22 dec), fjaderholmarnaskrog.se
      months: ['off','off','off','limited','open','open','peak','peak','open','limited','off','off'],
    },
    activity_meta: {
      bad: {
        beaches: [
          // KÄLLA: explorearchipelago.com (klippbad med utsikt över Stockholms inlopp, mindre sandstränder); naturkartan.se (klipphällar för sol)
          {
            name: 'Klipporna på Stora Fjäderholmen',
            type: 'klippbad',
            desc: 'Klipphällar med utsikt över Stockholms inlopp. Det finns även några mindre sandstränder. Välbesökt på varma dagar.',
            child_friendly: false,
            depth: 'Varierar längs klipporna.',
            directions: 'Följ stigen från bryggan ut längs strandlinjen.',
            insider_tip: 'Vardagar är lugnare än helger, när dagsbåtarna fyller ön.',
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
    tagline: 'Ö i mellersta skärgården med avgiftsfri bilfärja från Östanå.',
    description: [
      // KÄLLA: osteraker.se/upplevagora/sevardheter/oariosterakersskargard — "Ljusterö är en av de största öarna i den mellersta delen av Stockholms skärgård"; sommartid "vistas det nästan 20 000 personer på ön"
      'Ljusterö är en av de största öarna i den mellersta delen av Stockholms skärgård. På sommaren vistas nästan 20 000 personer på ön, vilket ger säsongen en helt annan puls än vinterhalvåret.',
      // KÄLLA: trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/ — "Ljusteröleden går mellan Östanå och Ljusterö"; "Överfartstiden är sju minuter"; "Resan med vägfärjan är avgiftsfri"
      'Till skillnad från de flesta skärgårdsöar kan man ta bilen hit. Ljusteröleden går mellan Östanå och Ljusterö, överfarten tar sju minuter och resan med vägfärjan är avgiftsfri.',
      // KÄLLA: waxholmsbolaget.se/bryggor-och-resmal/mellersta/{linanas,laggarsvik,grundvik,vasbystrand} — bryggor på Ljusterö; osteraker.se — "bussen från Åkersberga station till Åsättra brygga på Ljusterö"
      'Ön nås också utan bil. Waxholmsbolaget har flera bryggor på Ljusterö, bland dem Linanäs, Laggarsvik, Grundvik och Vasbystrand, och från Åkersberga station går buss till Åsättra brygga.',
      // KÄLLA: osteraker.se/upplevagora/sevardheter/oariosterakersskargard — vid Linanäs finns "ett stort utbud av restauranger", "de gamla, fina sekelskifteshusen" och "den gamla fiskebyn Laggarsvik"
      'Vid Linanäs på södra Ljusterö finns ett stort utbud av restauranger och gamla sekelskifteshus, och intill ligger den gamla fiskebyn Laggarsvik.',
      // KÄLLA: osteraker.se/upplevagora/sevardheter/oariosterakersskargard — "ett klippbad med storslagen utsikt över Saxarfjärden, och ett barnbad med sandstrand"; naturstig, sagostig, boule och tennis
      'På ön finns ett klippbad med utsikt över Saxarfjärden och ett barnbad med sandstrand. Där finns också naturstig och sagostig, boule och tennis.',
      // KÄLLA: svenskakyrkan.se/osteraker/ljustero-kyrka — "Norra Ljusterö fick sitt första kapell under 1600 talet, möjligen redan på 1500 talet"; "Mot slutet av 1800 talet ... omgestaltades kapellet helt till dagens kyrka"; vit åttkantig träkyrka vid Mellansjö, ca 3 km från färjeläget
      'Ljusterö kyrka ligger vid Mellansjö, omkring tre kilometer från färjeläget. Norra Ljusterö fick sitt första kapell under 1600-talet, möjligen redan på 1500-talet. Ett nytt kapell uppfördes i början av 1700-talet och byggdes mot slutet av 1800-talet om till dagens vita, åttkantiga träkyrka.',
      // KÄLLA: osteraker.se/subsitegrundskolor/ljusteroskola — Ljusterö skola, kommunal grundskola på ön
      'Ljusterö har en egen kommunal grundskola.',
      'Kustlinjen är lång och växlar mellan grunda vikar, öppna hällar och skyddade sund. Terrängen är flack nog att man hinner byta miljö flera gånger på en dag utan att anstränga sig.',
    ],
    facts: {
      travel_time: '~1 tim från Danderyds sjukhus (buss 626 + bilfärja Ljusteröleden)',
      character: 'Bred och mångfacetterad, bilfärja, cykling',
      season: 'April–Oktober',
      best_for: 'Cykling, kajakpaddling, bilburna besökare, naturupplevelse',
    },
    activities: [
      { icon: '🚲', name: 'Cykling', desc: 'Välcyklade kustvägar på en av skärgårdens tillgängligaste öar — bilfärja med täta avgångar från Ljusteröfärjan. Cykla norrut mot Linanäs eller runt de södra delarna av ön.' },
      { icon: '🛶', name: 'Kajak', desc: 'Klintsundet och den norra kustlinjen är utmärkta paddlingvatten.' },
      // KÄLLA: badplats.nu/osteraker/linanasbadet/ — badplatsen heter Linanäsbadet (Dyviksrundan), ej Linanäsbryggan
      { icon: '🏊', name: 'Bad', desc: 'Flera badplatser, varav Linanäsbadet vid Dyviksrundan är mest känd.' },
      { icon: '⛽', name: 'Sjömack', desc: 'Klintan har sjömack — ett av skärgårdens välplacerade bränslestopp.' },
    ],
    // KÄLLA: visitskargarden.se/boende/vandrarhem/gaasviks-vandrarhem (18 bäddar, året runt); ljusterologi.se. Åsättra är båtplatser/parkering, inte boende (asattra.com) (läst 2026-09-14)
    accommodation: [
      { name: 'Gåsviks Vandrarhem', type: 'Vandrarhem', desc: 'Vandrarhem med 18 bäddar i sex rum, öppet året runt.', websiteUrl: 'https://visitskargarden.se/boende/vandrarhem/gaasviks-vandrarhem.aspx' },
      { name: 'Ljusterö Logi', type: 'B&B', desc: 'Boende med anor från 1910-talet, även konferens och event.', websiteUrl: 'https://ljusterologi.se' },
    ],
    getting_there: [
      // KÄLLA: SL:s tidtabell linje 626 Danderyds sjukhus–Ljusterö (giltig dec 2025–juni 2026); linje 621 går Åkersberga–Norrtälje. Färjan avgiftsfri enligt Trafikverket (Ljusteröleden).
      { method: 'Buss + Bilfärja', from: 'Danderyds sjukhus', time: '60 min', desc: 'Buss 626 från Danderyds sjukhus till Östanå färjeläge, sedan avgiftsfri bilfärja Östanå–Ljusterö (7 min). Samma linje fortsätter ut på ön.', icon: '🚌' },
      { method: 'Bil + Färja', from: 'Stockholm', time: '50 min', desc: 'Kör till Östanå färjeläge norr om Åkersberga, ta avgiftsfri bilfärja över till Ljusterö (Ljusteröleden, ca 7 min).', icon: '🚗' },
      { method: 'Waxholmsbåt', from: 'Strömkajen / Vaxholm', time: 'Varierar', desc: 'Skärgårdsbåtar trafikerar bryggor som Linanäs, Grundvik, Åsättra m.fl.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: klintsundetmarina.se — marina, sjömack, lanthandel, café och gästhamn vid Klintsundet ("Klintan Sjöstation" fanns inte under det namnet).
      { name: 'Klintsundet Marina', desc: 'Marina med sjömack, lanthandel, café och gästhamn vid Klintsundet.', fuel: true, service: ['el', 'vatten', 'bränsle', 'gästhamn'] },
      { name: 'Linanäsbryggan', desc: 'Naturskönt läge, populärt ankare.', fuel: false },
    ],
    restaurants: [
      // KÄLLA: linanasbryggan.se/meny — varmrätter 255–285 kr (2026), öppet dagligen 11–21.
      { name: 'Linanäsbryggan', type: 'Restaurang', desc: 'Klassisk brygga med mat och utsikt.', price_example: 'Varmrätter ca 255–285 kr (2026)', open_season: 'Juni–Augusti', open_hours: '11–21' },
      // KÄLLA: klintsundetmarina.se (hämtad 2026-09) — juni & juli dagligen 10–18, augusti dagligen 11–16. Kajak från 370 kr/halvdag (2026).
      { name: 'Klintsundet Marina', type: 'Service/Café', desc: 'Sjömack, lanthandel och café vid Klintsundet — hyr även ut kajaker.', slug: 'klintan-sjostation', price_example: 'Kajak från 370 kr/halvdag (2026)', open_season: 'Juni–Augusti', open_hours: '10–18 (juni–juli), 11–16 (augusti)' },
      // KÄLLA: explorearchipelago.com (Fnaych Pizzabagaren KB, Långsjöängen 20) — öppet dagligen 10–20; priser publiceras inte, därför ingen siffra.
      { name: 'Pizzeria Ljusterö', type: 'Restaurang', desc: 'Lokalbefolkningens val — avslappnat och bra. Pizza, kebab och hamburgare.', slug: 'pizzeria-ljustero', price_example: 'Aktuella priser anslås på plats', open_season: 'Helår', open_hours: 'Mån–Sön 10–20' },
    ],
    day_cost: {
      // Ingen totalsumma: cafépriser publiceras inte, och summan blev en gissning. Posterna nedan är belagda var för sig.
      budget_per_person: 'Färja och buss är avgiftsfria — resten beror på mat och ev. kajakhyra',
      includes: 'Avgiftsfri bilfärja, lunch eller pizza, kaffe vid Klintsundet',
      breakdown: [
        // KÄLLA: SL:s tidtabell linje 626 Danderyds sjukhus–Ljusterö + Trafikverket, Ljusteröleden avgiftsfri (hämtad 2026-08-24)
        { item: 'Buss 626 från Danderyds sjukhus (SL-kort)', price: '0 kr' },
        { item: 'Bilfärja Östanå–Ljusterö (avgiftsfri)', price: '0 kr' },
        // KÄLLA: linanasbryggan.se/meny-4 — varmrätter 255–285 kr (hämtad 2026-08-24)
        { item: 'Lunch Linanäsbryggan', price: '255–285 kr (2026)' },
        // KÄLLA: restaurangljusterotorg.se (Restaurang Turquoise, Ljusterö torg 8) — priser publiceras inte online, därför ingen siffra
        { item: 'Alternativ: pizza, Restaurang Turquoise vid Ljusterö torg', price: 'Se meny på plats' },
        // KÄLLA: klintsundetmarina.se — cafépriser publiceras inte, därför ingen siffra
        { item: 'Kaffe + bulle, Klintsundets café', price: 'Se pris på plats' },
        // KÄLLA: klintsundetmarina.se — enmanskajak 370 kr halvdag, 530 kr heldag (hämtad 2026-08-24)
        { item: 'Kajakhyra Klintsundet Marina (halvdag)', price: 'från 370 kr (2026)' },
      ],
      tips: [
        // KÄLLA: Trafikverket, Ljusteröleden avgiftsfri; SL linje 626
        'Både bilfärjan Östanå–Ljusterö och SL-bussen ingår utan extra avgift — färjan är avgiftsfri.',
        'Hyr kajak vid Klintsundet Marina eller ta buss 626 som fortsätter ut på ön mot Linanäs.',
        'Pizzerian vid Ljusterö torg har öppet även utanför turistsäsongen — kontrollera aktuella tider på plats.',
      ],
    },
    tips: [
      // KÄLLA: osteraker.se/upplevagora/sevardheter/oariosterakersskargard — "Vid Linanäs finns ett stort utbud av restauranger"
      'Linanäs på södra Ljusterö har flera restauranger.',
      // KÄLLA: osteraker.se/upplevagora/sevardheter/oariosterakersskargard — "bussen från Åkersberga station till Åsättra brygga på Ljusterö"
      'Utan bil: buss från Åkersberga station till Åsättra brygga.',
      // KÄLLA: trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/ — "Resan med vägfärjan är avgiftsfri"
      'Vägfärjan över Ljusteröleden är avgiftsfri.',
    ],
    related: ['finnhamn', 'ingmarso', 'blido'],
    tags: ['cykling', 'kajak', 'bilfärja', 'kustlinje', 'familj'],
    // KÄLLA: trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/ (avgiftsfri vägfärja, sträcka 1100 meter); osteraker.se (kostnadsfri)
    did_you_know: 'Ljusterö nås med den avgiftsfria bilfärjan Ljusteröleden mellan Östanå och Ljusterö, en resa på ungefär 7 minuter över sundet.',
    insiderTips: [
      'Ljusterö nås med bilfärja från Östanå. Färjan tar ungefär 7 minuter och går regelbundet hela dagen.',
      'Ön är en av de stora öarna i norra skärgården och har vägar som gör det möjligt att köra bil över stora delar av ön.',
      'Det finns en ICA-butik, skola och bensinstation på Ljusterö, en av de mer självförsörjande öarna i norra skärgården.',
      'Ljusterö och trakterna runt Östanå är kända för goda förutsättningar för fågelskådning, särskilt under fågelsträcket på vår och höst.',
    ],
    seasonal: {
      open: 'April–Oktober',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Juni: cykellederna är tomma och kajakpaddlingen är fantastisk. September: lummig höstfärg, badbar sjö och inga köer till Klintan.',
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
    tagline: 'Lots- och tullsamhället som blev badortsidyll — södra skärgårdens landvägsport.',
    description: [
      // KÄLLA: haninge.se/uppleva-och-gora/besok-och-upplev-haninge/platser-att-besoka/dalaro/ — "Dalarö är lots- och tullsamhället som sedan blev badortsidyll"; "snirkliga gator, gränder och villor med snickarglädje i schweizisk anda"; Strindberg kallade det "porten till paradiset"
      'Dalarö är lots- och tullsamhället som sedan blev badortsidyll. Här möts snirkliga gator och gränder och villor med snickarglädje i schweizisk anda. August Strindberg kallade platsen "porten till paradiset".',
      // KÄLLA: sfv.se/vara-fastigheter/sverige/stockholms-lan/oevrigt/dalaro-tullhus — 1636 räknas som grundläggningsår för samhället Dalarö; "I samband med att systemet avskaffades 1928 drogs även tullstationen in"
      'År 1636 blev Dalarö inloppsstation för Stockholm, och 1636 räknas som grundläggningsår för samhället. Tullstationen drogs in när systemet avskaffades 1928.',
      // KÄLLA: sfv.se/vara-fastigheter/sverige/stockholms-lan/oevrigt/dalaro-tullhus — uppfört "under åren 1787–88" efter Erik Palmstedts ritningar; "ett av en handfull tullhus som är statligt byggnadsminne"; Haninge kommun använder det som turistbyrå och skärgårdsmuseum
      'Dalarö tullhus uppfördes 1787–88 efter Erik Palmstedts ritningar och är ett av en handfull tullhus som är statligt byggnadsminne. Haninge kommun använder byggnaden som turistbyrå och skärgårdsmuseum.',
      // KÄLLA: sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/dalaro-skans — "man beslöt 1656 att på Stockskäret anlägga en skans"; "1683 ritade generalkvartermästaren Erik Dahlbergh ett förslag"; "Först 1698 påbörjades arbeten ... ända till 1724 innan skansen var försvarsduglig"; "1854 upphörde den att räknas till rikets fasta försvar"
      'Dalarö skans går tillbaka till 1656, då man beslöt att på Stockskäret anlägga en skans. 1683 ritade generalkvartermästaren Erik Dahlbergh ett förslag till förbättring och förstärkning, men först 1698 påbörjades arbetena, och det dröjde till 1724 innan skansen var försvarsduglig. 1854 upphörde den att räknas till rikets fasta försvar. Skansen är statligt byggnadsminne.',
      // KÄLLA: haninge.se/.../dalaro/ — "Dalarö når du enkelt med bil eller buss från Haninge och Stockholm"; orten är "en populär utgångspunkt för att upptäcka Haninges öar"
      'Dalarö når man enkelt med bil eller buss från Haninge och Stockholm. Det gör orten ovanlig bland skärgårdsmålen — man behöver ingen båt för att komma hit — och den fungerar som utgångspunkt för att upptäcka Haninges öar.',
      // KÄLLA: haninge.se/.../dalaro/ — bada "på olika badplatser (till exempel Schweizerbadet)"; "paddla kajak, segla, kitesurfning och SUP-bräda"; "dyka vid Dalarös unika skeppsvraksområde"
      'Det finns flera badplatser, till exempel Schweizerbadet. Runt Dalarö går det att paddla kajak, segla, kitesurfa och paddla SUP, och utanför orten ligger ett skeppsvraksområde som går att dyka vid.',
      // KÄLLA: haninge.se/.../dalaro/ — "naturhamnar och gästhamn för fritidsbåtar"; "små butiker, bageri och museum att besöka"; "pittoreska caféer och restauranger"
      'I Dalarö finns naturhamnar och gästhamn för fritidsbåtar, små butiker, bageri och museum, och kaféer och restauranger.',
      'Kajen är stilla på morgonen och livligare när båtarna kommer in på eftermiddagen. Husen ligger tätt mot vattnet och gatorna är smala nog att man går långsamt av sig själv.',
    ],
    facts: {
      // KÄLLA: SL buss 869 Slakthuset(Globen)–Dalarö ~47 min; med t-baneanslutning ~60 min. Tidigare '90 min' överskattade snabbaste vägen.
      travel_time: '45 min med bil / ~60 min koll (buss 869 från Slakthuset)',
      character: 'Historisk hamnort, utgångspunkt, välskött',
      season: 'April–Oktober',
      best_for: 'Dagsturer, hamnliv, utgångspunkt mot Utö och södern',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      { icon: '🏰', name: 'Dalarö skans', desc: 'Fortifikation påbörjad 1656 under Karl X Gustav. Statligt byggnadsminne sedan 1935 — idag festvåning och visningsplats.' },
      { icon: '⛵', name: 'Utgångspunkt mot Utö', desc: 'Ta pendelbåt till Utö och de södra öarna direkt från Dalarö hamn.' },
      { icon: '🎣', name: 'Fiske', desc: 'Fiske i vattnen kring Dalarö och södra skärgården.' },
      { icon: '🚶', name: 'Dalarö Museum', desc: 'Liten men intressant utställning om ortens maritima historia.' },
    ],
    // KÄLLA: smadalarogard.se; visitskargarden.se/boende/vandrarhem/vandrarhemmet-lotsen (12 bäddar, året runt, inte STF). "Dalarö Strand Hotell" gick inte att belägga; Dalarö Skans är evenemangsplats (SFV), inget boende (läst 2026-09-14)
    accommodation: [
      { name: 'Smådalarö Gård', type: 'Hotell', desc: 'Spa-hotell utanför samhället med pool och naturläge.', websiteUrl: 'https://smadalarogard.se' },
      { name: 'Vandrarhemmet Lotsen', type: 'Vandrarhem', desc: 'Litet vandrarhem i Dalarö med 12 bäddar i fyra rum, öppet året runt.', websiteUrl: 'https://visitskargarden.se/boende/vandrarhem/vandrarhemmet-lotsen.aspx' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Stockholm', time: '45 min', desc: 'Kör E4 söderut och följ skyltning mot Haninge och Dalarö.', icon: '🚗' },
      { method: 'Pendeltåg + Buss', from: 'Stockholm Central', time: '~65 min', desc: 'Pendeltåg till Handen, sedan buss 839 till Dalarö. Buss 869 går också från Slakthuset vid Globen.', icon: '🚌' }, // KÄLLA: rome2rio.com (pendeltåg Stockholm C–Handen ca 27 min; buss 839 Handen–Dalarö ca 30 min, exkl. bytestid)
    ],
    harbors: [
      { name: 'Dalarö Gästhamn (Askfatshamnen)', desc: 'Välskött hamn med full service. Bra utgångspunkt för vidare segling söderut.', fuel: true, service: ['el', 'vatten', 'dusch', 'toilet'] }, // KÄLLA: gasthamnsguiden.se, "Dalarö Askfatshamnen Gästhamn" (bränsle diesel/bensin samt el, vatten, dusch, toalett)
    ],
    restaurants: [
      { name: 'Restaurang Mysingen', type: 'Restaurang', desc: 'Hamnkrog med husmanskost och räkor, tidigare känd som Dalarö Krog Mysingen.' }, // KÄLLA: dalaro.se, Dalarö Guiden 2025 (listar "Restaurang Mysingen", Odinsvägen 10)
      { name: 'Dalarö Bageri', type: 'Bageri', desc: 'Morgonkaffet och nybakade bullar.' }, // KÄLLA: dalaro.se, branschsidan "Fika, äta, bo på Dalarö" och Dalarö Guiden 2025 (Odinsvägen 15)
    ],
    tips: [
      // KÄLLA: sfv.se/.../dalaro-skans — skansen anlades från 1656 och är statligt byggnadsminne
      'Dalarö skans går tillbaka till 1656 och är statligt byggnadsminne.',
      // KÄLLA: haninge.se/.../dalaro/ — "dyka vid Dalarös unika skeppsvraksområde"
      'Skeppsvraksområdet utanför Dalarö går att dyka vid.',
      // KÄLLA: haninge.se/.../dalaro/ — "en populär utgångspunkt för att upptäcka Haninges öar"
      'Dalarö är en utgångspunkt för att ta sig vidare till Haninges öar.',
    ],
    related: ['uto', 'nattaro', 'orno'],
    tags: ['historia', 'hamn', 'utgångspunkt', 'södern', 'fortet'],
    did_you_know: 'Dalarö blev 1636 platsen för "stora sjötullen" — landets viktigaste tullstation under stormaktstiden. Alla handelsfartyg på väg in till Stockholm var tvungna att förtullas här. Tullhuset från 1788 står fortfarande kvar vid hamnen.',
    insiderTips: [
      'Dalarö nås med bil via väg 227 (Dalarövägen) och är tekniskt sett en halvö med vägförbindelse till fastlandet.', // KÄLLA: sv.wikipedia.org/wiki/Länsväg_227; trafiken.nu, vägarbetsposter "Väg 227 på Dalarövägen vid Dalarö brygga"
      'Tullhuset i Dalarö byggdes 1787–1788 efter ritningar av Erik Palmstedt. Alla fartyg som passerade mot Stockholm var tvungna att förtullas här.', // KÄLLA: sfv.se, "Dalarö tullhus" (byggår 1787–1788, arkitekt Erik Palmstedt)
      'Dalarö är ett känt mål för sportdykare med flera intressanta vrakplatser i närheten.',
      'Gästhamnen i Dalarö är en av de mer välservade i södra skärgården med dusch, el och servicebyggnad.',
    ],
    seasonal: {
      open: 'April–Oktober',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Dalarö är tillgängligt med bil hela året men turistlivet blommar juni–september. September ger historisk stämning utan folkmassor och gästhamnen är på topp utan köer.',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },
    activity_meta: {
      bad: {
        beaches: [
          {
            name: 'Klippbadet vid Skansen',
            type: 'klippbad',
            desc: 'Välskyddade klipphällar på södra sidan av Dalarö, strax söder om Dalarö Skans. Lugnt, klart vatten med lätt instegsplats. En av södra skärgårdens mest lättillgängliga klippbadsplatser — man tar bilen hit.',
            child_friendly: true,
            depth: 'Grunt vid klippkanten, djupare mot mitten av viken.',
            directions: 'Kör eller gå längs kajen söderut förbi Dalarö Värdshus, följ stigen mot Skansen ca 10 min. Parkering vid hamnen.',
            insider_tip: 'Kom dit på en tisdag i juli — på helger konkurrerar stockholmarna med bilarna om varje kvadratmeter.',
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
    tagline: 'Yttersta Roslagen — båk från 1768 och naturreservat mot öppet hav.',
    description: [
      // KÄLLA: lansstyrelsen.se/stockholm/besoksmal/naturreservat/arholma-ido.html — reservatet i Norrtälje kommun; relativt flack terräng; "skärgård, marina miljöer och odlingslandskap"
      'Arholma ligger längst ut i Roslagens skärgård i Norrtälje kommun, där skärgården övergår i öppet hav. Terrängen är relativt flack, vinden ofta märkbar och horisonten öppen österut.',
      // KÄLLA: lansstyrelsen.se/stockholm/besoksmal/naturreservat/arholma-ido.html — "Arholma och öarna öster därom samt Idö, Idskär och några mindre öar"; bildat 1965; 1 866 ha varav 538 ha land; Natura 2000
      'Naturreservatet Arholma-Idö bildades 1965 och omfattar Arholma och öarna öster därom samt Idö, Idskär och några mindre öar. Reservatet är 1 866 hektar, varav 538 hektar land, och ingår i Natura 2000. Landskapet är skärgård, marina miljöer och odlingslandskap, med åkrar, strandängar och betesmarker.',
      // KÄLLA: sjofartsverket.se/sv/om-oss/fyrar-och-kulturfastigheter/visningsfyrar/arholma-bak/ — "byggdes 1768 av hovjunkaren Pehr Ridderstad från Rådmansö"; "Den är en så kallad känningsbåk och har aldrig haft fyrljus"; "fungerade också som lotsutkik fram till 1875"; statligt byggnadsminne sedan 1935
      'Arholma båk byggdes 1768 av hovjunkaren Pehr Ridderstad från Rådmansö. Det är en så kallad känningsbåk som aldrig haft fyrljus, och den fungerade också som lotsutkik fram till 1875. Sedan 1935 är båken statligt byggnadsminne.',
      // KÄLLA: arholmahandel.se — "åretruntöppen butik"; "livsmedel, nybakat bröd och produkter från lokala producenter"; "bensin, diesel, gasol och kemtekniska varor"; ombud för apotek och Systembolaget, postservice, cykeluthyrning, stuguthyrning; bryggcafé sommartid
      'Arholma Handel är en åretruntöppen butik med livsmedel, nybakat bröd och produkter från lokala producenter. Där finns också bensin, diesel och gasol, ombud för apotek och Systembolaget, postservice, cykeluthyrning och stuguthyrning. Sommartid driver de ett bryggcafé.',
      // KÄLLA: arholmanord.se — "Vandrarhem, restaurang, guidade turer och aktiviteter i egen havsvik på Arholma i Stockholms norra skärgård"
      'Arholma Nord erbjuder vandrarhem, restaurang, guidade turer och aktiviteter i en egen havsvik.',
      // KÄLLA: blidosundsbolaget.se/norra-batlinjen/ — avgång från "Norrtälje hamn, längst bort på Norrtälje hamnpromenad, vid bron Havslänken"; destinationer Lidö och Arholma; fartyget M/S Rex; sommarsäsong
      'På sommaren går Blidösundsbolagets Norra båtlinjen från Norrtälje hamn till Lidö och Arholma med M/S Rex. Resan hit tar tid oavsett väg, och det märks på stämningen vid bryggan — få hamnar på Arholma av en slump.',
      'Hällarna är slipade och låga, och ljuset från ett hav utan hinder mot horisonten byter karaktär flera gånger under en kväll. Vädret känns tydligare här än längre in i skärgården.',
    ],
    facts: {
      // KÄLLA: uppmätt mot ResRobot 2026-08-05 — buss 636 Norrtälje busstation
      // 10:19 → Simpnäs brygga 11:32, sedan färja 30 till Arholma 11:55. Totalt
      // 1 tim 36 min. Stod tidigare "3,5–4 h med Waxholmsbåt från Norrtälje",
      // vilket var fel om BÅDE tiden och färdsättet: det går ingen båt från
      // Norrtälje, man tar buss till Simpnäs och en kort färja därifrån.
      travel_time: '1 tim 36 min: buss till Simpnäs från Norrtälje, sedan färja',
      character: 'Vilt, orört, ytterst, äventyrligt',
      season: 'Maj–September',
      best_for: 'Äventyrliga seglare, naturälskare, de som söker ensamt',
    },
    activities: [
      { icon: '⛵', name: 'Segling', desc: 'Arholma är ett klassiskt mål och genomfart på längre seglingsresor norrut.' },
      { icon: '🌅', name: 'Naturupplevelse', desc: 'Klippor mot öppet hav, lång horisont och inga grannar. Sällan uppnådd natur.' },
      // KÄLLA: https://arholmahandel.se/cykeluthyrning/ (hämtad 2026-08-06)
      { icon: '🚲', name: 'Cykling', desc: 'Arholma Handel hyr ut cyklar: 100 kr halvdag (4 h), 150 kr heldag (8 h), 200 kr per dygn. Hämtas direkt på bryggan — boka i förväg, trycket är högt. Kort, avkopplande tur till Arholma Båk och fyren längs öns grusvägar.' },
    ],
    // KÄLLA: svenskaturistforeningen.se/boende/stf-arholma-bull-august-gard (14 rum, 32 bäddar, huvudbyggnaden året runt; bullaugust.com); visitskargarden.se — Arholma Handel-Stuguthyrning maj–september; roslagen.se — Arholma Nord (läst 2026-09-14)
    accommodation: [
      { name: 'STF Arholma Bull-August gård', type: 'Vandrarhem', desc: 'STF-vandrarhem på gammal skärgårdsgård, 14 rum och 32 bäddar. Huvudbyggnaden öppen året runt.', websiteUrl: 'https://bullaugust.com' },
      { name: 'Arholma Nord', type: 'Stugor', desc: 'Stugor och rum i egen vik, sommardrift.', websiteUrl: 'https://roslagen.se/en/boende/arholma-nord/' },
      { name: 'Arholma Handel — stuguthyrning', type: 'Stugor', desc: 'Stuga (Källarstugan) som hyrs ut av handelsboden, maj–september.', websiteUrl: 'https://visitskargarden.se/boende/vandrarhem/arholma-handel-stuguthyrning.aspx' },
    ],
    getting_there: [
      { method: 'Buss + färja', from: 'Norrtälje (via Simpnäs)', time: '1 tim 36 min', desc: 'Buss 636 till Simpnäs på Björkö, sedan kort färja till Arholma. Ingen Waxholmsbåt går direkt från Norrtälje.', icon: '🚌' }, // KÄLLA: se facts.travel_time (ResRobot 2026-08-05)
      { method: 'Bil + passagerarfärja', from: 'Stockholm via Simpnäs', time: 'ca 2,5 h', desc: 'Kör till Simpnäs (på Björkö, norra Roslagen) — drygt 2 timmar — sedan passagerarfärja Simpnäs–Arholma (ca 15 min, ingen bilfärja).', icon: '🚗' }, // KÄLLA: arholma.nu/resa-hit ("Med bil från Stockholm tar det drygt två timmar")
    ],
    harbors: [
      { name: 'Arholma Gästhamn', desc: 'Gästhamnar vid Arholma Handel (västsidan) och Österhamn/Ahlmansviken (sydöstsidan). Färskvatten och drivmedel finns.', fuel: true, service: ['vatten', 'bränsle'] }, // KÄLLA: gasthamnsguide.se (Arholma Gästhamn; Arholma Gästhamn - Österhamn), svenskagasthamnar.se (Arholma - Österhamn: el/dusch/wifi ej listat)
    ],
    restaurants: [
      { name: 'Arholma Dansbana & Krog', type: 'Restaurang', desc: 'Öns krog och samlingspunkt. Enkel mat och sommarnöje.', slug: 'arholma-dansbana-krog' },
      { name: 'Arholma Nord', type: 'Restaurang & vandrarhem', desc: 'Restaurang och bar vid egen vik, mat från eget rökeri, med tillhörande vandrarhem.' }, // KÄLLA: arholmanord.se; arholma.nu/mat-dryck/arholmanord; svenskaturistforeningen.se/boende/stf-arholma-nord
    ],
    tips: [
      'Planera resan i förväg — Arholma ligger långt ut och kräver mer än ett infall.',
      // KÄLLA: SMHI (smhi.se) — kontrollera prognos före sjöresa
      'Kolla väderprognosen noggrant om du tar ut en liten båt.',
      // KÄLLA: arholmahandel.se — åretruntöppen butik med livsmedel, bensin, diesel, gasol och cykeluthyrning
      'Arholma Handel har öppet året runt och säljer livsmedel, bensin, diesel och gasol, och hyr ut cyklar.',
    ],
    related: ['blido', 'furusund', 'norrora'],
    tags: ['ytterst', 'orört', 'norra', 'vilt', 'segling'],
    did_you_know: 'Arholma omtalas i skriftliga handlingar redan 1547 (Gustav Vasas räkenskaper). Ön fick sin första fasta lots 1724. Ön har ingen bilfärja — en passbåt går mellan Simpnäs på fastlandet och Arholma, en resa på ca 15 minuter; vilket fartyg som trafikerar linjen växlar med säsong.', // KÄLLA: stockholmslansmuseum.se/besoksmal/arholma (1547); Norrtälje kommuns kulturmiljöutredning om Arholma ("Arholma fick sin första fasta lots 1724"); ressel.se tidtabell Simpnäs–Arholma (M/S Monsun isfri period, M/S Ridö sommarsäsong)
    insiderTips: [
      'Arholma är en av de nordligaste bebodda öarna i Stockholms skärgård och nås med passbåt från Simpnäs, en resa på ca 15 minuter.', // KÄLLA: arholma.nu/resa-hit; ressel.se tidtabell (fartyget växlar med säsong)
      'Den gamla lotsstationen på Arholma var aktiv under lång tid. Lotsar var stationerade här för att guida fartyg genom de norra skärgårdspassagerna.',
      // KÄLLA: Länsstyrelsen Stockholm, naturreservatet Arholma-Idö (läst 2026-08-23)
      'Arholma ligger i naturreservatet Arholma-Idö, med vandringsstigar som leder ut till klippor med utsikt mot öppet hav mot norr.',
      'Sommarsäsongen är kortare på Arholma än på öar längre söderut. Bryggcaféet vid Arholma Handel har historiskt stängt i början av augusti.', // KÄLLA: arholmahandel.se (läst 2026-09-03: "Söndagen 9 augusti är Bryggcaféets sista öppna dag")
    ],
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli–Mitten av Augusti',
      best: 'Juli',
      bestReason: 'Längst ut i norra skärgården med råaste naturen — i juli är caféet öppet, hamnen välkomnar och havsörnarna cirkulerar fortfarande.',
      warning: 'Säsongen är kort. Bryggcaféet vid Arholma Handel har historiskt stängt i början av augusti. Kolla tidtabellen — Arholma kräver lång restid och planering.', // KÄLLA: arholmahandel.se (läst 2026-09-03: Bryggcaféets sista öppna dag 9 augusti)
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
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
      // KÄLLA: haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/orno/ — Ornö beskrivs som "södra skärgårdens största ö"
      'Ornö är södra skärgårdens största ö. Storleken märks: skog, sjöar och kust ryms inom samma ö, och avstånden är långa nog att en dag går åt om man vill se en meningsfull del av den.',
      // KÄLLA: ornosjotrafik.se — "Avgår från Hässelmara brygga på Ornö och Hotellbryggan på Dalarö"; "Överfarten tar ca 30 minuter"; alla fordon måste bokas
      'Bilfärjan drivs av Ornö Sjötrafik och går mellan Hotellbryggan på Dalarö och Hässelmara brygga på Ornö. Överfarten tar ungefär 30 minuter, och fordon måste bokas i förväg.',
      // KÄLLA: haninge.se/.../orno/ — Kyrkviken är "Ornös nav" med "museum, bibliotek, gästbryggor och cykeluthyrning"; utställning i Sockenstugan; cykeluthyrning även i Brunnsviken
      'Kyrkviken är Ornös nav, med museum, bibliotek, gästbryggor och cykeluthyrning. Hit hör också utställningen i Sockenstugan. Cykel går att hyra både i Kyrkviken och i Brunnsviken.',
      // KÄLLA: svenskakyrkan.se/haninge/orno-kyrka — "Det första kapellet på ön uppfördes troligen redan vid 1300-talets slut"; "En större kyrka uppfördes 1652" i "för dåtiden modern stil"; "en vacker träkyrka med spännande historia"
      'Ornö kyrka är en träkyrka som uppfördes 1652, i för dåtiden modern stil. Det första kapellet på ön uppfördes troligen redan vid 1300-talets slut.',
      // KÄLLA: lansstyrelsen.se/stockholm/besoksmal/naturreservat/norra-skogen.html — reservatet på norra Ornö i Haninge kommun, skyddat 2024, 389 ha varav 360 ha land; "långsamväxande hällmarkstallskog, kala bergspartier, grövre barrblandskog, sumpskogar och våtmarkspartier"; "Stor del av Nybysjön med god vattenkvalitet ligger i reservatet"
      'Naturreservatet Norra skogen på norra Ornö skyddades 2024 och omfattar 389 hektar, varav 360 hektar land. Här finns långsamväxande hällmarkstallskog, kala bergspartier, grövre barrblandskog, sumpskogar och våtmarkspartier. En stor del av Nybysjön, som är omkring 31 hektar och rymmer ett tiotal småöar, ligger inom reservatet.',
      'Att gå i Ornös inre liknar mer en fastlandsskog än den klippiga skärgård många väntar sig. Träden står tätt, undervegetationen är rik och ljudet av vatten försvinner en stund.',
      // KÄLLA: haninge.se/.../orno/ — "cykling, vandring" anges som aktiviteter; cykeluthyrning i Kyrkviken och Brunnsviken
      'Cykel är ett rimligt sätt att ta sig runt på ön, och vandring hör till det kommunen lyfter fram.',
      'Ornö skyltas inte högt. Den som ger ön en hel dag får utrymme att röra sig utan att ha bråttom.',
    ],
    facts: {
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
    // KÄLLA: ornoskargardshotell.se (året runt); sundbyorno.se (5 dubbelrum); orno.se/ata-bo/boende — Ornö Båtvarv 6 stugor, 18 bäddar; visitskargarden.se — stuga i Brunnsviken. Kyrkvikens vandrarhem och camping gick inte att belägga (läst 2026-09-14)
    accommodation: [
      { name: 'Ornö Skärgårdshotell', type: 'Hotell', desc: 'Hotell med dubbelrum och lägenheter vid vattnet i Brunnsviken, frukost ingår. Öppet året runt.', websiteUrl: 'https://ornoskargardshotell.se' },
      { name: 'Sundby gård', type: 'B&B', desc: 'B&B med fem dubbelrum i herrgårdsflygel.', websiteUrl: 'https://sundbyorno.se' },
      { name: 'Stugor på Ornö Båtvarv', type: 'Stugor', desc: 'Sex stugor med sammanlagt 18 bäddar vid båtvarvet.', websiteUrl: 'https://ornobatvarv.se' },
    ],
    getting_there: [
      // KÄLLA: ornosjotrafik.se — "Överfarten tar ca 30 minuter" mellan Hässelmara brygga och Hotellbryggan på Dalarö. Publicerad turlista gäller 27/4–13/9 2026; ingen vintertidtabell hittades vid granskning, så "året runt" är borttaget.
      { method: 'Bilfärja', from: 'Dalarö (Hotellbryggan) → Hässelmara brygga', time: '~30 min', desc: 'Ornö Sjötrafik kör bilfärjan mellan Dalarö och Hässelmara och tar både bil och passagerare. Det är huvudvägen till Ornö.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: Haninge kommun, "Ornö" (haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/orno/) — Kyrkviken har museum, bibliotek, gästbryggor och cykeluthyrning.
      { name: 'Kyrkviken', desc: 'Öns huvudhamn med gästbryggor, museum, bibliotek och cykeluthyrning.', fuel: false },
    ],
    restaurants: [
    ],
    tips: [
      // KÄLLA: lansstyrelsen.se/stockholm/besoksmal/naturreservat/norra-skogen.html — reservatet ligger på norra Ornö och skyddades 2024
      'Naturreservatet Norra skogen ligger på norra Ornö och skyddades 2024.',
      // KÄLLA: ornosjotrafik.se — alla fordon måste bokas
      'Boka fordonsplats på bilfärjan i förväg.',
      // KÄLLA: haninge.se/.../orno/ — cykeluthyrning i Kyrkviken och Brunnsviken
      'Cykeluthyrning finns i Kyrkviken och i Brunnsviken.',
    ],
    related: ['uto', 'nattaro', 'dalaro'],
    tags: ['natur', 'vandring', 'skog', 'fåglar', 'lugnt'],
    // KÄLLA: Haninge kommun, "Ornö" (haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/orno/) — "Ornö, södra skärgårdens största ö". Postbåtens turtäthet kunde inte beläggas och är borttagen.
    did_you_know: 'Ornö är södra skärgårdens största ö.',
    insiderTips: [
      // KÄLLA: Haninge kommun, "Ornö" (haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/orno/) — "Ornö, södra skärgårdens största ö".
      'Ornö är södra skärgårdens största ö.',
      'Ornö södra del erbjuder skyddade vikar och bra förutsättningar för kajakpaddling.',
      // KÄLLA: Haninge kommun, "Ornö" (haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/orno/) nämner ett café vid Brunnsviken; ingen lanthandel kunde beläggas.
      'Det finns ett café vid Brunnsviken men utbudet på ön är begränsat. Planera med matsäck om du ska ut på en heldagstur.',
    ],
    seasonal: {
      // KÄLLA: ornosjotrafik.se/turlista-fran-dalaro/ — publicerad turlista gäller 27/4–13/9 2026; ingen vintertidtabell hittades vid granskning, så "hela året" är borttaget.
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
    tagline: 'Fyrplats längst söderut i Stockholms skärgård — klippor och öppet hav.',
    description: [
      // KÄLLA: lansstyrelsen.se/stockholm/besoksmal/naturreservat/oja-landsort.html — "omfattar den kända ön Öja med fyrplatsen Landsort"; naturreservat sedan 1985, 570 ha varav 178 ha land (2026-09-14)
      // KÄLLA: waxholmsbolaget.se/reseplanering/resmal/landsort — "Landsort är Waxholmsbolagets sydligaste destination. Här hittar du vacker natur, badklippor och Sveriges allra äldsta fyr." (2026-09-14)
      'Landsort är namnet på fyrplatsen och samhället längst söderut på ön Öja, Waxholmsbolagets sydligaste destination. Ön och vattnen runt den ingår i naturreservatet Öja-Landsort, som omfattar 570 hektar varav 178 hektar är land. Klipporna är släta och slitna, och havet hörs överallt.',
      // KÄLLA: sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/landsortoeja-stockholms-skargard — grunden lades på 1680-talet, fyren fick "sitt nuvarande utseende 1869-70", statligt byggnadsminne 1935, obemannad sedan 1963 (2026-09-14)
      // KÄLLA: sjofartsverket.se/en/about-us/fyrar-och-kulturfastigheter/visningsfyrar/landsort--the-oldest-swedish-built-lighthouse/ — "the oldest Swedish-built lighthouse"; "Electrified in 1938"; "Automated and demanned in 1963" (2026-09-14)
      'Fyren på Landsort är Sveriges äldsta svenskbyggda fyr. Grunden lades på 1680-talet och tornet fick sitt nuvarande utseende 1869–70. Fyren elektrifierades 1938, blev statligt byggnadsminne 1935 och är obemannad sedan 1963. Bebyggelsen omkring den hänger ihop till en liten by, och det går att gå omkring där en hel förmiddag utan att tröttna.',
      // KÄLLA: sfv.se/.../landsortoeja-stockholms-skargard — lotsningen har "gamla anor och kan vara en av de äldsta i landet"; Gustav Vasa lär ha anlitat lotsen Anders Bertilsson på 1530-talet; de flesta yrkesverksamma var "lotsar, fyrtjänstemän, tullare och telegrafister" (2026-09-14)
      'Lotsningen vid Landsort har gamla anor och kan vara en av de äldsta i landet — Gustav Vasa ska ha anlitat lotsen Anders Bertilsson här redan på 1530-talet. Under lång tid var de flesta yrkesverksamma på ön lotsar, fyrtjänstemän, tullare och telegrafister. Det präglar fortfarande hur husen står och vad de är byggda för.',
      // KÄLLA: sfv.se/.../landsortoeja-stockholms-skargard — kustartilleribatteri anlades på 1930-talet; ERSTA-batteriet byggdes 1974–78 som "fyravåningshus av stål inuti berget" och blev statligt byggnadsminne 2018 (2026-09-14)
      'Militärhistorien ligger kvar i berget. Ett kustartilleribatteri anlades på 1930-talet, och 1974–78 byggdes ERSTA-batteriet som ett fyravåningshus av stål inne i klippan, dimensionerat mot kärnvapenangrepp. Anläggningen är statligt byggnadsminne sedan 2018.',
      // KÄLLA: lansstyrelsen.se/.../oja-landsort.html — Öja är "en av länets förnämsta sträckfågellokaler", med starkt sträck både vår och höst (2026-09-14)
      // KÄLLA: landsort-birds.se/pages/skada-pa-landsort.php — över 300 fågelarter noterade; sibiriska felflyttare som tajgasångare och kungsfågelsångare; "Nuförtiden besöks ön nästan dagligen av fågelskådare" (2026-09-14)
      'Öja är en av länets förnämsta sträckfågellokaler, med starkt sträck både vår och höst. Fler än 300 arter har noterats, inklusive sibiriska felflyttare som tajgasångare och kungsfågelsångare, och ön besöks numera nästan dagligen av fågelskådare.',
      // KÄLLA: sfv.se/.../landsortoeja-stockholms-skargard — omkring 30 personer bor på ön året runt, betydligt fler på sommaren (2026-09-14)
      'Ungefär trettio personer bor på ön året runt, betydligt fler under sommaren. Skalan märks: det kommersiella utbudet är litet och besökare bör räkna med att i hög grad klara sig själva.',
      // KÄLLA: landsort.com/saltboden/ — "Här kan du handla livsmedel, ta en kopp kaffe med dopp, äta en god bit mat eller dricka något svalkande från vår mysiga pub"; ligger i den södra delen av Landsort, mitt i byn (2026-09-14)
      'Saltboden ligger mitt i byn i den södra delen av Landsort och säljer livsmedel, kaffe och mat, och har pub. Det är i praktiken öns service, så ta med mer proviant än du tror att du behöver.',
      // KÄLLA: lansstyrelsen.se/.../oja-landsort.html — reservatet ligger ca 2 km söder om Torö; ta SL-buss till Ankarudden på Torö och därifrån "reguljär turtrafik med Waxholmsbolagets fartyg till Öja-Landsort" (2026-09-14)
      'Att ta sig hit kräver planering. Reservatet ligger ungefär två kilometer söder om Torö: du åker SL-buss till Ankarudden på Torö och därifrån går Waxholmsbolagets reguljära turtrafik till Öja-Landsort. Kontrollera tidtabellen i förväg.',
    ],
    facts: {
      // KÄLLA: uppmätt mot ResRobot 2026-08-05 — färja 29-1 Ankarudden 07:20 →
      // Landsort 07:50. Båtbenet är 30 min, inte "~1 h" som stod här.
      travel_time: 'Buss 852 från Nynäshamn till Ankarudden, sedan 30 min båt',
      character: 'Ytterst, dramatiskt, havsexponerat, genuint',
      season: 'Juni–Augusti (begränsad service)',
      best_for: 'Erfarna seglare, äventyrare, fyr-entusiaster',
    },
    activities: [
      { icon: '🗼', name: 'Landsorts fyr', desc: 'En av Sveriges äldsta fyrar med utsikt mot öppet Östersjön. Guidade turer sommartid.' },
      { icon: '🌊', name: 'Havsutsikter', desc: 'Stå på klipporna och titta österut — ingen ö skymmer horisonten. Omöjligt att fotografera dåligt.' },
      { icon: '🐦', name: 'Fågelstation', desc: 'Landsort är en av de viktigaste observationsplatserna för sträckande fåglar i Sverige.' },
    ],
    // KÄLLA: visitskargarden.se — Landsorts Stugor AB (1–4 pers, året runt; landsortsstuguthyrning.se), Landsorts Vandrarhem (4 hus, 26 bäddar, året runt; landsortsvandrarhem.se), Lotstornet (6 dubbelrum, restaurang Svedtiljas; g-mo.se) (läst 2026-09-14)
    accommodation: [
      { name: 'Landsorts Stugor', type: 'Stugor', desc: 'Stugor för 1–4 personer nära fyren, öppet året runt.', websiteUrl: 'https://landsortsstuguthyrning.se' },
      { name: 'Landsorts Vandrarhem', type: 'Vandrarhem', desc: 'Fyra hus med 26 bäddar nedanför fyren, öppet året runt.', websiteUrl: 'https://landsortsvandrarhem.se' },
      { name: 'Lotstornet', type: 'Hotell', desc: 'Sex dubbelrum i den ombyggda lotsutkiken, med restaurang Svedtiljas.', websiteUrl: 'https://g-mo.se' },
    ],
    getting_there: [
      { method: 'Buss + båt', from: 'Nynäshamn → Ankarudden (Torö) → Landsort', time: 'Beror på anslutning, se tidtabell', desc: 'SL-buss 852 från Nynäshamn till Ankarudden, sedan skärgårdsbåt ca 30 min till Landsort.', icon: '⛴' }, // KÄLLA: ResRobot 2026-08-05, färja 29-1 Ankarudden 07:20 → Landsort 07:50 (se facts.travel_time i denna fil)
      { method: 'Egen båt', from: 'Nynäshamn/Utö', time: 'Varierar', desc: 'Planera noggrant med väderprognoser — Landsort ligger exponerat mot öppet hav.', icon: '⛵' },
    ],
    harbors: [
      { name: 'Landsorts Gästhamn', desc: 'Gästhamn på Landsort.', fuel: false }, // KÄLLA: gasthamnsguide.se – Landsorts Gästhamn, Stockholms södra skärgård (2026-09-03)
    ],
    restaurants: [
    ],
    tips: [
      'Kolla väderprognosen noggrant — Landsort är en exponerad ytterskärgårdsö.',
      // KÄLLA: landsort-birds.se/pages/foreningen.php + /pages/skada-pa-landsort.php — fågelstationen bedriver ringmärkning och har guidningar och program för besökare (2026-09-14)
      'Landsorts fågelstation bedriver ringmärkning och tar emot besökare — se fågelstationens egen sida för guidningar och aktuella program.',
      // KÄLLA: landsort.com/saltboden/ — Saltboden är öns livsmedels- och matställe (2026-09-14)
      'Utbudet på ön är begränsat — kontrollera Saltbodens aktuella öppettider innan du åker, och ta med mat.',
    ],
    related: ['uto', 'dalaro', 'nattaro'],
    tags: ['fyr', 'ytterst', 'dramatiskt', 'hav', 'fåglar'],
    // KÄLLA: Sjöfartsverket (äldsta svenskbyggda fyren, fyrbål 1651) + landsort.com:s kronologi (van der Hagens koncession 1658, privilegium 1669) + Hans Högmans fyrhistoria (fyren tänd 1678, tornet brann 1686, nytt torn klart 1687).
    did_you_know: 'Landsorts fyr är Sveriges äldsta bevarade fyr — ett fyrbål tändes redan 1651, Johan van der Hagen fick kungligt privilegium 1669 och det nuvarande stentornet restes efter branden 1686. Landsort är Stockholms skärgårds sydligaste bebodda utpost (Sveriges sydligaste fastlandspunkt är Smygehuk i Skåne).',
    insiderTips: [
      'Landsort har Sveriges äldsta bevarade fyrtorn i aktiv drift. Platsen har markerats med fyr sedan 1600-talets mitt, om än i olika former.',
      'Landsort nås med Waxholmsbåten från Nynäshamn och är den sydligaste bebodda platsen i Stockholms skärgård.',
      'Ön räknas som ett av de bästa fågelskådningsställena i regionen, framförallt under fågelsträcket i maj och september.',
      'Det bor ett fåtal fastboende på Landsort åretrunt. Ön är en av de mest avskilda i skärgården trots reguljär båttrafik.',
    ],
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli–Mitten av Augusti',
      best: 'Maj eller September',
      bestReason: 'Fågelstationen vid fyren är aktivast under sträcktiderna i maj och september. Då är Landsort på sitt allra mest dramatiska — vind, fyr och tusentals migrerande fåglar.',
      warning: 'Båten Ankarudden–Landsort går året runt, men med gles vintertidtabell — planera efter avgångarna. Enda matalternativet är Saltboden, som har kort säsong — kontrollera öppettider.',
      months: ['off','off','off','off','limited','open','peak','open','limited','off','off','off'],
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
      // KÄLLA: trafikverket.se/furusundsleden — "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård", 600 meter, fyra minuters överfart, avgiftsfri (2026-09-14)
      // KÄLLA: furusund.se/hamnen/ — "I vår gästhamn finns plats för upp till hundra båtar", med toaletter, duschar, bastu, el, vatten och tvätt (2026-09-14)
      'Furusund ligger vid ett smalt sund i norra skärgården som länge varit en av farlederna in mot Stockholm. Vägfärjan Furusundsleden korsar sundet på 600 meter och fyra minuter, och i gästhamnen finns plats för upp till hundra båtar, med toaletter, duschar, bastu, el, vatten och tvätt. Bryggorna fylls på kvällarna och tömms tidigt på morgnarna.',
      // KÄLLA: hotellfurusund.se/historia/ — "1811 bygger man så en tullstation med arrest på Furusund"; "den stora restaurangen brann 1950", vilket blev starten för värdshusverksamheten i det gamla tullhuset; juveleraren Christian Hammer utvecklade Furusund till badort efter 1882 (2026-09-14)
      'Värdshuset har sin kärna i den tullstation med arrest som byggdes 1811. Efter 1882 utvecklade juveleraren Christian Hammer Furusund till badort, och när den stora restaurangbyggnaden brann 1950 flyttade värdshusverksamheten in i det gamla tullhuset — där den finns kvar. Huset är välbevarat och matsalen bär ett äldre hantverk.',
      // KÄLLA: hotellfurusund.se/historia/ — "August Strindberg kom till Furusund sommaren 1899, hitlockad av sin syster och svåger"; "På Furusund kom Strindberg även att vistas med tid med Harriet Bosse i villan Isola Bella"; Strindbergs verk från 1902 kallade Furusund "Fagervik" och grannön Köpmanholm "Skamsund" (2026-09-14)
      'August Strindberg kom till Furusund sommaren 1899, hitlockad av sin syster och svåger, och vistades senare här med Harriet Bosse i villan Isola Bella. I verket "Fagervik och Skamsund" (1902) blev Furusund "Fagervik" och grannön Köpmanholm "Skamsund".',
    ],

    facts: {
      travel_time: '2 h med bil från Stockholm', // KÄLLA: hotellfurusund.se/kontakt/ nämner bil, SL-buss via Norrtälje eller båt men ingen Waxholmsbolaget-linje eller restid från Strömkajen kunde beläggas (se Fynd)
      character: 'Lugnt, naturskönt, historiskt, seglingstradition',
      season: 'Maj–September',
      best_for: 'Seglare, romantik, Strindberg-intresserade',
    },
    activities: [
      { icon: '⛵', name: 'Segling', desc: 'Furusund är en klassisk passage och etappstopp på norrlandsresorna.' },
      { icon: '📚', name: 'Strindbergs-turism', desc: 'August Strindberg bodde och skrev här. Platsen bär hans historia.' },
      { icon: '🏊', name: 'Bad', desc: 'Klippbad längs sundet och på de omgivande holmarna.' },
    ],
    // KÄLLA: hotellfurusund.se (furusundvardshus.se omdirigerar dit) — boutiquehotell med 16 rum, restaurang, året runt; visitskargarden.se/boende/hotell/hotell-furusund (läst 2026-09-14)
    accommodation: [
      { name: 'Hotell Furusund', type: 'Hotell', desc: 'Anrikt värdshus, i dag boutiquehotell med 16 rum och restaurang. Öppet året runt.', websiteUrl: 'https://hotellfurusund.se' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Stockholm via Norrtälje', time: '2 h', desc: 'Kör E18 mot Norrtälje och följ skylt mot Furusund.', icon: '🚗' },
    ],
    harbors: [
      { name: 'Furusund Hamn', desc: 'Välplacerad gästhamn vid sundet med WC, dusch, el och vatten.', fuel: false, service: ['el', 'vatten', 'dusch'] }, // KÄLLA: furusundshamnkrog.se/gasthamn/ ("Service i hamnen: WC, Dusch, El, Vatten, WiFi, Miljöstation") — ingen bränsleförsäljning listad
    ],
    restaurants: [
      // KÄLLA: hotellfurusund.se — hotellet kallar den bara "restaurang"; "Värdshus" är det historiska namnet
      { name: 'Hotell Furusund, restaurangen', type: 'Restaurang', desc: 'Det gamla värdshuset — mat i historisk miljö.', slug: 'furusund-vardshus', price_example: 'Förrätt 175–195 kr, huvudrätt 225–390 kr', open_season: 'Maj–Oktober', open_hours: 'Varierar med säsong, kortare öppettider utanför juni–augusti', book_required: true, phone: '0176-803 44', child_menu: true }, // KÄLLA: hotellfurusund.se/kontakt/ (telefon +46 (0)176-803 44; öppettider publicerade per månad, t.ex. september); hotellfurusund.se/menyer/, PDF-menyer hösten 2026 (förrätter 175–195 kr, huvudrätter 225–390 kr)
    ],
    day_cost: {
      // Ingen totalsumma: parkering och resa saknar belagt pris. Menypriserna nedan är belagda.
      budget_per_person: 'Lunch och middag enligt hotellets menyer — resa och parkering tillkommer',
      includes: 'Bil/buss till Furusund, lunch + middag på hotellets restaurang, parkering',
      breakdown: [
        { item: 'Lunch, Hotell Furusund', price: '175–290 kr' }, // KÄLLA: hotellfurusund.se, lunchmeny hösten 2026 (PDF): förrätt 175 kr, huvudrätt 225–290 kr
        { item: 'Middag, Hotell Furusund', price: '175–390 kr' }, // KÄLLA: hotellfurusund.se, kvällsmeny hösten 2026 (PDF): förrätt 175–195 kr, huvudrätt 225–390 kr
      ],
      tips: [
        'Boka bord på hotellets restaurang i förväg under högsäsong.',
        'Kom med bil — det är det snabbaste sättet att ta sig till Furusund. Alternativet är SL-buss via Norrtälje.', // KÄLLA: hotellfurusund.se/kontakt/ ("Här hittar du hur SL-bussarna går till och från Furusund")
        'Strömmen i sundet gör att seglare ofta stannar över kvällen.',
      ],
    },
    tips: [
      // KÄLLA: trafikverket.se/furusundsleden — vägfärja mellan Furusund och Yxlan, 600 meter (2026-09-14)
      'Vägfärjan Furusund–Yxlan korsar sundet — håll uppsikt på färjetrafiken när du passerar.',
      'Boka bord på värdshuset i förväg under sommaren.',
    ],
    related: ['blido', 'arholma', 'norrora'],
    tags: ['segling', 'Strindberg', 'norra', 'passage', 'historia'],
    did_you_know: 'Furusund var på 1800-talet ett av Stockholms läns mest populära sommarutflyktsställen. August Strindberg tillbringade flera somrar här och lät sig inspireras av ön.',
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Juni: seglarlivet börjar, värdshuset öppet och inga köer. September: stilla vatten och dramatiska ljusförhållanden.',
      warning: 'Begränsade öppettider utanför högsäsong (juni–augusti). Hotell Furusund håller dock öppet för bl.a. julbord i december.', // KÄLLA: hotellfurusund.se (menyval "Julbord"; öppettider publicerade även för september); furusundshamnkrog.se/gasthamn/hamnguide/ ("Huvudsäsong: 1 juni – 31 augusti")
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
    tagline: 'Lugn ö i norra skärgården med äkta landsbygdskänsla.',
    description: [
      // KÄLLA: trafikverket.se/furusundsleden — "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård", 600 meter, fyra minuter, avgiftsfri (2026-09-14)
      // KÄLLA: trafikverket.se/resa-och-trafik/farjetrafik/blidoleden/ — färjeleden går "mellan Yxlan och Blidö i Stockholms skärgård", 530 meter, fyra minuter, "Resan med vägfärjan är avgiftsfri" (2026-09-14)
      'Blidö nås med bil hela vägen, via två avgiftsfria vägfärjor: Furusundsleden mellan Furusund och Yxlan, 600 meter och fyra minuter, och därefter Blidöleden mellan Yxlan och Blidö, 530 meter och lika kort överfart. Det är en resa som slutar utan att man riktigt märker att man kommit fram.',
    ],

    facts: {
      // KÄLLA: sv.wikipedia.org/wiki/Blidö (färjerutt Furusund–Yxlan–Blidö via Furusundsleden och Blidöleden; exakt restid ej verifierad)
      travel_time: 'Bil + två bilfärjor via Yxlan (Furusundsleden + Blidöleden)',
      character: 'Lugnt, lantligt, äkta norrskärgård',
      season: 'Maj–September',
      best_for: 'Lugn, cykling, naturskönt',
    },
    activities: [
      { icon: '🚲', name: 'Cykling', desc: 'Kuperade kustvägar längs en lång, skogig kustlinje med öppna åkrar och klippor. Räkna med en heldagstur för att nå öns norra och södra delar.' },
      { icon: '🏊', name: 'Bad', desc: 'Fina badplatser längs kusten.' },
    ],
    // KÄLLA: visitskargarden.se — Blidö Brygga och Bistro, vandrarhem med 27 bäddar + stuga, restaurang, vedeldad bastu (blidobryggabistro.se) (läst 2026-09-14)
    accommodation: [
      { name: 'Blidö Brygga och Bistro', type: 'Vandrarhem', desc: 'Vandrarhem med 27 bäddar och en stuga vid bryggan, restaurang och vedeldad bastu.', websiteUrl: 'https://blidobryggabistro.se' },
    ],
    getting_there: [
      // KÄLLA: sv.wikipedia.org/wiki/Blidö ("färjeförbindelse från Furusund via trafikfärjelederna Furusundsleden och Blidöleden... mellan Furusund... och Köpmanholm (Yxlan) samt mellan Larshamn (Yxlan) och Norrsund (Blidö)")
      { method: 'Bil + två bilfärjor', from: 'Furusund', desc: 'Kör mot Furusund, bilfärja till Yxlan (Furusundsleden), sedan bilfärja Yxlan–Blidö (Blidöleden). Båda avgiftsfria.', icon: '🚗' },
    ],
    harbors: [], // KÄLLA: inget hittat efter sökning (gasthamnsguide.se, skargardsstiftelsen.se, waxholmsbolaget.se, norrtalje.se) — gästhamnen kunde inte bekräftas
    restaurants: [
    ],
    tips: [
    ],
    related: ['furusund', 'arholma', 'norrora'],
    tags: ['lugnt', 'norra', 'bilfärja', 'lantligt'],
    // KÄLLA: sv.wikipedia.org/wiki/Blidö ("Konstnären Rune Jansson föddes här 1918... Tove Jansson tillbringade sin barndoms somrar på ön.")
    did_you_know: 'Tove Jansson tillbringade sina barndomssomrar på Blidö, och konstnären Rune Jansson föddes på ön 1918.',
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Juni: lugn norra skärgård med öppna bryggor och färre besökare. September: naturupplevelsen är som finast och vattnet fortfarande badbart.',
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
      // KÄLLA: lansstyrelsen.se/stockholm/besoksmal/naturreservat/gallno.html — "Skyddat sedan: 1978, utvidgat 2017 och 2024"; syftet är att bevara ett skärgårdsområde "av stor betydelse för allmänhetens friluftsliv" med ett "skyddsvärt, kulturpräglat skärgårdslandskap"; "genuin skärgårdsmiljö med levande jordbruk" (2026-09-14)
      // KÄLLA: gallno.se — ön är bilfri och nås med skärgårdsbåt (2026-09-14)
      'Gällnö är en bilfri ö i mellersta skärgården och naturreservat sedan 1978, utvidgat 2017 och 2024. Syftet är att bevara ett skärgårdsområde av stor betydelse för friluftslivet, med ett skyddsvärt, kulturpräglat skärgårdslandskap och levande jordbruk.',
      // KÄLLA: lansstyrelsen.se/.../gallno.html — "hagmarker med en artrik flora"; på Västerholmen "växer bland annat lind, ask, alm och ek", många gamla och grova med rikligt med död ved (2026-09-14)
      'Reservatets hagmarker har en artrik flora, och på Västerholmen står lövskog med bland annat lind, ask, alm och ek — många av träden gamla och grova, med rikligt med död ved.',
      // KÄLLA: gallno.se — på ön finns Gällnö krog ("Till vår sommaröppna krog kommer man för att äta en bit mat, sippa på ett glas vin"), Handelsboden, vandrarhem (STF) och Hotell Frans August (2026-09-14)
      'På ön finns en sommaröppen krog, Handelsboden, ett vandrarhem och Hotell Frans August — men ingen storskalig turistinfrastruktur. Landskapet växlar mellan skogspartier och öppna hagmarker.',
      // KÄLLA: waxholmsbolaget.se/reseplanering/resmal/gallno — Gällnö är ett av Waxholmsbolagets resmål med egen bryggsida (2026-09-14)
      'Ön trafikeras av Waxholmsbolaget.',
    ],

    facts: {
      // KÄLLA: gallno.se ("trafikeras av både Waxholmsbolaget och Strömma/Cinderella-båtarna", "tar mellan 1,5–2 timmar"). Linjenummer kunde inte verifieras. Kontrollerad 2026-09-03.
      travel_time: 'Waxholmsbåt eller Cinderellabåt från Strömkajen/Strandvägen, ca 1,5–2 h',
      character: 'Bilfri, naturreservat, lugnt',
      // KÄLLA: gallno.se/mat-dryck/oppettider (2026) — begränsat öppet från 14 maj, sista öppna dagar i slutet av augusti. Kontrollerad 2026-09-03.
      season: 'Mitten av maj–slutet av augusti (fullt öppethållande slutet av juni–början av augusti)',
      best_for: 'Natur, kulturlandskap, mat och dryck',
    },
    activities: [
      // KÄLLA: gallno.se (FAQ, dagsutflykt) — cykel och kajak går att hyra på ön under sommaren. Uppgift om lägertradition hittades inte i primärkällor. Kontrollerad 2026-09-03.
      { icon: '🚴', name: 'Cykel och kajak', desc: 'Cykel och kajak går att hyra på ön under sommaren.' },
      { icon: '🚶', name: 'Vandring', desc: 'Välmarkerade leder i naturreservat.' },
    ],
    // KÄLLA: svenskaturistforeningen.se/boende/stf-gallno-vandrarhem + gallno.se (rum i gamla skolan och stugor, café sommartid, året runt); skargardsstiftelsen.se/omraden/gallno-karklo — tältplats vid Torsviken (läst 2026-09-14)
    accommodation: [
      { name: 'STF Gällnö Vandrarhem', type: 'Vandrarhem', desc: 'STF-vandrarhem i gamla skolan med rum och stugor, café och bar sommartid. Öppet året runt.', websiteUrl: 'https://gallno.se' },
      { name: 'Tältplats Torsviken', type: 'Camping', desc: 'Skärgårdsstiftelsens tältplats och naturhamn vid Torsviken.', websiteUrl: 'https://skargardsstiftelsen.se/omraden/gallno-karklo/' },
    ],
    getting_there: [{ method: 'Waxholmsbåt', from: 'Strömkajen', time: 'ca 2 h', desc: 'Waxholmsbolaget eller Strömma/Cinderellabåtarna från Strömkajen eller Strandvägen.', icon: '⛴' }], // KÄLLA: gallno.se ("tar mellan 1,5–2 timmar ... trafikeras av både Waxholmsbolaget och Strömma/Cinderella-båtarna")
    harbors: [{ name: 'Gällnö brygga', desc: 'Brygga vid Gällnö by, nära krog, café och handelsbod.', fuel: false }], // KÄLLA: gallno.se (nämner "Gällnö brygga" och "Gällnö by"); namnet "Gällnö Hamn" hittades inte i primärkällor
    restaurants: [
      // KÄLLA: gallno.se/mat-dryck/gallno-krog (namn, meny) och gallno.se/mat-dryck/oppettider (2026: begränsat öppet från 14 maj, fullt öppet 27 juni–9 aug ti–lö 11–22, sö 12–16, må stängt; nedtrappning 11–23 aug). Prisexempel hittades inte i primärkällor och togs bort. Kontrollerad 2026-09-03.
      { name: 'Gällnö krog', type: 'Restaurang & bar', desc: 'Sommaröppen krog med bar och café, medelhavsinspirerad meny.', slug: 'gallno-bar', open_season: 'Mitten av maj–slutet av augusti (fullt öppethållande slutet av juni–början av augusti)', open_hours: 'Tisdag–lördag ca 11–22, söndag 12–16, måndag stängt (kortare tider i maj och augusti)' },
      // KÄLLA: gallno.se/mat-dryck/handelsboden ("omfattande sortiment av kolonialvaror, mejeriprodukter, frysvaror, färsk frukt, kött, fisk... färskt bröd från bageri Vivels") och gallno.se/mat-dryck/oppettider (2026: högsäsong 13 juli–9 aug ti–lö 09–20, sö–må 10–17; kortare tider i maj, juni och augusti). Kontrollerad 2026-09-03.
      { name: 'Gällnö Handelsbod', type: 'Handel', desc: 'Bred handelsbod med livsmedel, färskt bröd dagligen, kött, fisk och grönsaker.', open_season: 'Mitten av maj–slutet av augusti', open_hours: 'Ca 09–20 i högsäsong (juli), kortare tider i maj, juni och augusti' },
    ],
    day_cost: {
      // Inga belopp: varken båtbiljett eller krogens priser gick att belägga mot publicerad prislista (2026-09-14). Siffror borttagna på Toms beslut.
      budget_per_person: 'Beror på båtbiljett och mat — se waxholmsbolaget.se och gallno.se',
      includes: 'Waxholmsbåt t/r från Strömkajen, dryck på krogen, medhavd matsäck',
      breakdown: [
        // KÄLLA: waxholmsbolaget.se — prislistan renderas med JavaScript och kunde inte hämtas; inget belopp
        { item: 'Waxholmsbåt t/r Strömkajen–Gällnö', price: 'Se waxholmsbolaget.se för aktuellt pris' },
        // KÄLLA: gallno.se/mat-dryck/gallno-krog — verksamheten heter Gällnö krog (bar ingår); ingen publicerad prislista. Kontrollerad 2026-09-03.
        { item: 'Dryck på Gällnö krog', price: 'Se prislista på plats' },
      ],
      // KÄLLA: gallno.se/mat-dryck/gallno-krog och /mat-dryck/oppettider — krogen serverar lagad mat men öppettiderna varierar kraftigt under säsong. Uppgifter om havsörn och ankringsförhållanden hittades inte i primärkällor och togs bort. Kontrollerad 2026-09-03.
      tips: [
        'Kontrollera öppettiderna för Gällnö krog och Handelsboden innan avfärd — de varierar kraftigt under säsongen.',
      ],
    },
    // KÄLLA: gallno.se/mat-dryck/gallno-krog och /handelsboden — krogen serverar lagad mat och Handelsboden har brett sortiment, men öppettiderna varierar under säsong. Uppgifter om ljunghed och havsörn hittades inte i primärkällor och togs bort. Kontrollerad 2026-09-03.
    tips: [
      'Öppettiderna för krogen och Handelsboden varierar under säsongen — kontrollera aktuella tider innan besök.',
    ],
    related: ['moja', 'svartso', 'ingmarso'],
    tags: ['bilfri', 'naturreservat', 'läger', 'orört'],
    // KÄLLA: Länsstyrelsen Stockholm, naturreservat Gällnö — kulturpräglat skärgårdslandskap som hävdas genom aktivt jordbruk och bete. Superlativet "bäst bevarade" kunde inte beläggas och togs bort. Kontrollerad 2026-09-03.
    did_you_know: 'Gällnös naturreservat skyddar ett kulturpräglat skärgårdslandskap där ängarna hålls öppna med betande djur.',
    seasonal: {
      // KÄLLA: gallno.se/mat-dryck/oppettider (2026) — begränsat öppet från 14 maj, sista öppna dagar i slutet av augusti. Kontrollerad 2026-09-03.
      open: 'Mitten av maj–slutet av augusti',
      peak: 'Juli',
      best: 'Juli',
      // KÄLLA: gallno.se/mat-dryck/oppettider (2026) — fullt öppethållande (krog, café och handelsbod) 27 juni–9 augusti. Kontrollerad 2026-09-03.
      bestReason: 'Krog, café och handelsbod har fullt öppethållande under högsäsong, med möjlighet att hyra cykel och kajak.',
      // KÄLLA: gallno.se/mat-dryck/oppettider (2026) — öppettider för krog och handelsbod varierar kraftigt utanför högsäsong. Kontrollerad 2026-09-03.
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
    tagline: 'Familjens skärgård — känd som "Saltkråkan" i Astrid Lindgrens TV-serie och Tjorven-filmerna.',
    description: [
      'Norröra är en liten, lugn ö i norra skärgården, mest känd som inspelningsplats för Astrid Lindgrens "Vi på Saltkråkan" (inspelad sommaren 1963, TV-premiär 18 januari 1964) och de fyra Tjorven-filmerna som följde. Inspelningarna gjordes huvudsakligen på Norröra och grannön Söderöra. Många generationer svenska barnfamiljer har växt upp med bilderna från ön.',
      'Ön är perfekt för barnfamiljer, tillräckligt stor för att erbjuda något för var smak men inte så stor att barnen tröttnar. Naturliga badplatser längs kusten och möjligheter till klippklättring gör det enkelt att tillbringa en heldag här.',
      'Norröra passar ofta bäst som kombination med en tur till närliggande öar som Fejan eller Arholma, men kan också fungera som självständig destination för ett lugnt övernattningsäventyr.'
    ],

    facts: {
      travel_time: '3 h med Waxholmsbåt',
      character: 'Lugnt, familjevänligt, litet',
      season: 'Juni–Augusti',
      best_for: 'Barnfamiljer, Astrid Lindgren-fans',
    },
    activities: [
      { icon: '📚', name: 'Saltkråkan-platser', desc: 'Se inspelningsplatserna för "Vi på Saltkråkan" och Tjorven-filmerna.' },
      { icon: '🏊', name: 'Bad', desc: 'Badplatser längs kusten.' },
    ],
    accommodation: [],
    getting_there: [
      // KÄLLA: waxholmsbolaget.se, reseplanering/resmal/norrora-och-soderora ("...åka från Strömkajen. Turerna går via Vaxholm..."; vintertid från Köpmanholm, Yxlan); reseplanerare Strömkajen–Norröra 3 tim 10 min (linje 26)
      { method: 'Waxholmsbåt', from: 'Strömkajen, Stockholm', time: '3 h', desc: 'Via Vaxholm (linje 26), vår/sommar/höst. Vintertid från Köpmanholm, Yxlan.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: norrora.se/gronomraden/ ("...ångbåts-bryggan..."); waxholmsbolaget.se ("Det finns varken livsmedelsbutiker eller restauranger på öarna") — ingen gästhamn med service belagd
      { name: 'Norröra brygga', desc: 'Waxholmsbolagets brygga för reguljärtrafik. Ingen gästhamn eller service (bränsle, el, vatten) är belagd.', fuel: false },
    ],
    // KÄLLA: waxholmsbolaget.se, reseplanering/resmal/norrora-och-soderora ("Det finns varken livsmedelsbutiker eller restauranger på öarna, så se till att ta med dig picknickkorgen...")
    restaurants: [],
    day_cost: {
      // KÄLLA: waxholmsbolaget.se, reseplanering/resmal/norrora-och-soderora (avgång Strömkajen ej Norrtälje; ingen restaurang/livsmedelsbutik på ön; reseplanerare visar ca 3 tim enkel resa, linje 26)
      budget_per_person: 'Se aktuellt pris på waxholmsbolaget.se (ca 3 h enkel resa från Strömkajen)',
      includes: 'Waxholmsbåt t/r Strömkajen–Norröra (ca 3 h enkel väg), medhavd matsäck',
      breakdown: [
        { item: 'Waxholmsbåt t/r Strömkajen–Norröra', price: 'Se aktuellt pris på waxholmsbolaget.se' },
        { item: 'Medhavd matsäck (snacks + dryck)', price: 'Se aktuellt pris i butik' },
      ],
      tips: [
        'Norröra användes som inspelningsplats för Saltkråkan.',
        'Restiden är lång (ca 3 h enkel väg från Strömkajen) — planera en heldag.',
        'Det finns varken restaurang eller livsmedelsbutik på ön — ta med matsäck.',
        'Kombinera gärna med grannöarna Söderöra eller Fejan för ett längre norrskärgårdsäventyr.',
      ],
    },
    tips: [
      'Norröra är bäst kombinerat med en tur till Fejan eller Arholma för en längre norrskärgårdsdag.',
      'Inspelningsplatserna från "Vi på Saltkråkan" är utmärkta på ön — Saltkråkans hus och bryggan känns igen direkt om du vuxit upp med TV-serien.',
    ],
    related: ['arholma', 'blido', 'furusund'],
    tags: ['familj', 'Saltkråkan', 'norra', 'lugnt'],
    did_you_know: '"Vi på Saltkråkan" är den enda av Astrid Lindgrens berättelser som skrevs direkt för TV — TV-serien spelades in på Norröra och Söderöra sommaren 1963 och hade premiär 18 januari 1964. Boken kom samma år och är skriven utifrån manuset, inte tvärtom.',
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli',
      best: 'Mitten av juni',
      bestReason: 'Midsommarveckan med ljusa nätter, lite folk och ännu inte högsommarträngseln.',
      // KÄLLA: waxholmsbolaget.se, reseplanering/resmal/norrora-och-soderora; sv.wikipedia.org/wiki/Norröra ("Sedan april 2006 trafikeras ön dagligen året runt av Waxholmsbolaget")
      warning: 'Waxholmsbolaget trafikerar ön regelbundet men med få dagliga turer (från Strömkajen vår/sommar/höst, från Köpmanholm vintertid). Servicen på ön är mycket begränsad — ingen affär eller restaurang.',
      months: ['off','off','off','off','off','open','peak','open','limited','off','off','off'],
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
      // KÄLLA: lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Förvaltare: Skärgårdsstiftelsen" / "Skyddat sedan: 2008"
      // KÄLLA: skargardsstiftelsen.se/omraden/nattaro/ — "Nåttarö är ett av länets första marina naturreservat"
      'Nåttarö är ett naturreservat i Haninges del av södra skärgården. Reservatet bildades 2008, förvaltas av Skärgårdsstiftelsen och är ett av länets första marina naturreservat — skyddet omfattar alltså även vattnet runt ön.',
      // KÄLLA: lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Reguljär båttrafik till Nåttarö med Waxholmsbolaget från Nynäshamn."
      // KÄLLA: haninge.se/.../nattaro/ — "endast en halvtimmes båtresa från Nynäshamn"
      'Nåttarö nås med Waxholmsbolagets båtar från Nynäshamn, en resa på ungefär en halvtimme. Egen båt fungerar också — det finns gästhamn och flera naturhamnar runt ön.',
      // KÄLLA: lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Storsand i öster är en av skärgårdens längsta sandstränder med stora sanddyner."
      // KÄLLA: haninge.se/.../nattaro/ — "Det finns gott om barnvänliga, långgrunda sandstränder. Mest känd är Stora sand, men den mer avskilda Skarsand är minst lika vacker."
      'Storsand på öns östra sida är en av skärgårdens längsta sandstränder, med stora sanddyner bakom. Stranden är långgrund och barnvänlig. Den mer avskilda Skarsand är ett alternativ när Storsand fylls, och runt ön finns både sand och klippor att bada från.',
      // KÄLLA: lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "gamla tall- och blandskogar med små mossar och kärr" / "Förutom gäss och måsfåglar finns här gravand, snatterand, bergand och svärta."
      'Innanför stränderna tar gamla tall- och blandskogar vid, med små mossar och kärr insprängda. Fågellivet omfattar bland annat gravand, snatterand, bergand och svärta utöver gäss och måsfåglar. Ta med kikare.',
      // KÄLLA: haninge.se/.../nattaro/ — "På ön ligger Drottninggrottan, där drottning Maria Eleonora gömde sig" / "Runt berget finns ryssugnar från härjningarna 1719" / "På ön strövar även dovhjortar vilt."
      'Ön bär spår av sin historia. Drottninggrottan är enligt traditionen platsen där drottning Maria Eleonora gömde sig i väntan på att fly landet, och runt Bötsudden i norr, öns högsta punkt, finns ryssugnar från härjningarna 1719. Dovhjortar strövar fritt på ön.',
      // KÄLLA: haninge.se/.../nattaro/ — "Här finns vandrarhem, stugor, restaurang, tältplats och en handelsbod." / "du kan snorkla längs länets första snorkelled"
      // KÄLLA: nattaro.se — "En trerätters på Krogen" / "pizza på Sixtens bodega"
      'Servicen är sammanhållen och säsongsbetonad: vandrarhem, stugor, tältplats, handelsbod samt Nåttarö Krog och Sixtens Bodega. För den som vill se ön underifrån finns länets första snorkelled.',
      // KÄLLA: lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — förbud mot att "tälta mer än två dygn i följd annat än på anvisad plats" och att "medföra hund som inte är kopplad"
      'Reservatsföreskrifterna är få men bindande: tältning högst två dygn i följd utanför anvisad plats, och hundar ska hållas kopplade inom hela reservatet.',
    ],

    facts: {
      // KÄLLA: nattaro.se (startsida: "30 minutes by boat from Nynäshamn")
      travel_time: '~30 min med turbåt från Nynäshamn (under säsong)',
      character: 'Vilt, naturreservat, orört',
      // KÄLLA: nattaro.se, praktisk information (säsong ungefär slutet av april–slutet av september)
      season: 'Slutet av april–slutet av september',
      best_for: 'Seglare, naturupplevelse, dagsutflykt med båt',
    },
    activities: [
      { icon: '🚶', name: 'Vandring', desc: 'Vandringsstigar i naturreservat.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Rent vatten och fina klippor.' },
    ],
    // KÄLLA: nattaro.se/vandrarhemmet (fyra hus, 32 bäddar); nattaro.se (stugor, bokning via hemsidan); nattaro.se/gasthamn (gästhamn Kvarnviken)
    // KÄLLA: nattaro.se/boende — vandrarhemmet fyra hus (Röda Villan, Annexet, Västan, Östan) 32 bäddar, ca 50 stugor, dygnscamping på anvisad plats; skargardsstiftelsen.se/omraden/nattaro (läst 2026-09-14)
    accommodation: [
      { name: 'Nåttarö Vandrarhem', type: 'Vandrarhem', desc: 'Fyra hus — Röda Villan, Annexet, Västan och Östan — med sammanlagt 32 bäddar.', websiteUrl: 'https://nattaro.se/boende/vandrarhemmet/' },
      { name: 'Stugor på Nåttarö', type: 'Stugor', desc: 'Ett femtiotal uthyrningsstugor på ön, bokas via nattaro.se.', websiteUrl: 'https://nattaro.se/boende/' },
      { name: 'Camping', type: 'Camping', desc: 'Dygnscamping och tältning på anvisad plats.', websiteUrl: 'https://nattaro.se/boende/' },
    ],
    getting_there: [
      // KÄLLA: nattaro.se ("turbåten från Nynäshamn"); exakt linjenamn och trafikperiod kunde inte beläggas hos Waxholmsbolaget (tidtabellen kräver JavaScript och gick inte att hämta)
      { method: 'Turbåt (Waxholmsbolaget)', from: 'Nynäshamn', time: '~30 min', desc: 'Trafikerar under säsong. Kontrollera aktuell tidtabell på waxholmsbolaget.se.', icon: '⛴' },
      { method: 'Egen båt', from: 'Utö/Dalarö', time: 'Varierar', desc: 'Ankringsmöjligheter i flera skyddade vikar.', icon: '⛵' },
    ],
    // KÄLLA: nattaro.se/gasthamn (Nåttarö gästhamn, Kvarnviken: 45 platser vid flytbrygga, el 230V, toaletter/dusch, bastu)
    harbors: [{ name: 'Nåttarö gästhamn (Kvarnviken)', desc: '45 båtplatser vid flytbrygga, el (230V), toaletter och dusch, bastu mot avgift.', fuel: false }],
    restaurants: [
      // KÄLLA: nattaro.se (mat på ön: "Vi tar inte bordsbokningar"; krogen har haft öppna helger även i september — dvs. längre säsong än juni–mitten av augusti). Priser och exakta öppettider kunde inte beläggas.
      { name: 'Nåttarö Krog', type: 'Restaurang', desc: 'Restaurang vid ångbåtsbryggan och gästhamnen. Öppettider varierar under säsongen.', open_season: 'Del av sommarsäsongen, kontrollera aktuella tider på nattaro.se', book_required: false },
    ],
    day_cost: {
      // Inga belopp: varken resa eller krog har belagt pris (se raderna nedan). Siffror borttagna på Toms beslut 2026-09-14.
      budget_per_person: 'Beror på tåg/buss, båtbiljett och mat — inga belagda priser',
      // KÄLLA: nattaro.se ("turbåten från Nynäshamn"); exakt biljettpris kunde inte beläggas
      includes: 'Turbåt + ev. buss från Nynäshamn, lunch på krogen, medhavd picknick',
      breakdown: [
        // KÄLLA: exakt pris kunde inte beläggas efter sökning (SL:s taxa varierar med zon/biljettyp)
        { item: 'Pendeltåg till Nynäshamn + ev. buss', price: 'Enligt SL:s aktuella taxa' },
        // KÄLLA: båtnamn och pris kunde inte beläggas hos Waxholmsbolaget (tidtabell/prislista renderas med JavaScript och gick inte att hämta)
        { item: 'Turbåt Nynäshamn–Nåttarö t/r', price: 'Enligt Waxholmsbolagets aktuella taxa' },
        // KÄLLA: pris kunde inte beläggas på nattaro.se
        { item: 'Lunch Nåttarö Krog', price: 'Se aktuell meny på plats' },
      ],
      tips: [
        'Nåttarö är ett naturreservat — ta med allt du behöver, krogen är enda matplatsen.',
        // KÄLLA: lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Storsand i öster är en av skärgårdens längsta sandstränder"
        'Storsand ligger på öns östra sida — planera promenaden från bryggan därefter.',
        'Kontrollera Waxholmsbolagets tidtabell före resan — trafiken varierar med säsong.',
      ],
    },
    tips: [
      // KÄLLA: lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Reguljär båttrafik till Nåttarö med Waxholmsbolaget från Nynäshamn."
      'Nåttarö nås med Waxholmsbolagets båtar från Nynäshamn — kontrollera tidtabellen på waxholmsbolaget.se före resan.',
      // KÄLLA: lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — "Storsand i öster är en av skärgårdens längsta sandstränder med stora sanddyner."
      'Storsand ligger på öns östra sida, inte i söder — planera promenaden från bryggan därefter.',
      // KÄLLA: lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html — förbud mot att "medföra hund som inte är kopplad"
      'Hund ska vara kopplad i hela naturreservatet.',
    ],
    related: ['uto', 'orno', 'landsort'],
    tags: ['naturreservat', 'orört', 'segling', 'södra'],
    // KÄLLA: Länsstyrelsen Stockholm, naturreservat Nåttarö (areal 6 565 ha totalt, varav 609 ha land; Natura 2000-område)
    // KÄLLA: haninge.se/.../nattaro/ — "På ön ligger Drottninggrottan, där drottning Maria Eleonora gömde sig i väntan på att fly landet."
    // KÄLLA: haninge.se/.../nattaro/ — "du kan snorkla längs länets första snorkelled och uppleva skärgårdens undervattensmiljö"
    did_you_know: 'Drottninggrottan på Nåttarö ska ha varit gömställe för drottning Maria Eleonora inför hennes flykt ur landet. Nåttarö har länets första snorkelled.',
    insiderTips: [
      'Nåttarö är ett naturreservat utan fastboende. Ön nås med säsongsbetonad båttrafik eller egen båt.',
      // KÄLLA: nattaro.se (stugor, vandrarhem, krog, gästhamn, expedition — etablerad besöksverksamhet på ön)
      'Ön saknar fast bosättning, men har en etablerad säsongsverksamhet med stugor, vandrarhem, krog och gästhamn.',
      'Det finns sandstränder på Nåttarö, vilket är ovanligt i den yttre skärgårdens annars klippdominerade landskap.',
    ],
    seasonal: {
      // KÄLLA: nattaro.se, praktisk information (säsong ungefär slutet av april–slutet av september)
      open: 'Slutet av april–slutet av september',
      peak: 'Juli–Mitten av Augusti',
      best: 'Juli',
      bestReason: 'Sandstranden är fin i juli. Kombinera med ankring eller gästhamn och en morgonvandring i naturreservatet.',
      // KÄLLA: nattaro.se (mat på ön: krog och pizzeria med säsongsbegränsade öppettider; turbåt från Nynäshamn — exakt trafikperiod ej bekräftad hos Waxholmsbolaget)
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
      // KÄLLA: ingmarso.se — "runt 180 bofasta"; "Coop Ingmarsö" med "året runt-öppet" ligger "vid södra bryggan"; gästhamnen är "Centralt belägen på Södra Ingmarsö" med "gångavstånd till krog, affär och bageri"
      'Ingmarsö är en levande ö i Stockholms mellersta skärgård med runt 180 bofasta. Waxholmsbåtarna lägger till vid två bryggor, norra och södra. Vid södra bryggan ligger Coop Ingmarsö, som har öppet året runt, och gästhamnen på Södra Ingmarsö ligger inom gångavstånd från krog, affär och bageri.',
      // KÄLLA: stockholmarchipelagotrail.com/sv/section/roddbatar-finnhamn-ingmarso/ — sträckan anges som "Lätt 0.4 km"; "Det måste alltid finnas en roddbåt på varje sida."
      'Mellan Ingmarsö och Finnhamn finns en roddbåtspassage som ingår i Stockholm Archipelago Trail. Sundet är bara omkring 400 meter, men överfarten har sin egen ritual: det måste alltid finnas en roddbåt kvar på varje sida, så den som ror över får ro fram och tillbaka flera gånger innan vandringen kan fortsätta.',
      // KÄLLA: ingmarso.se/hittahit — "Båt hela vägen från stan tar mellan två och cirka tre timmar"; "Du till vissa turer ta SL-buss 438 från Slussen i Stockholm och stiga på båten i Boda"; "Till bryggan på norra Ingmarsö går reguljära turer från Åsättra på Ljusterö"
      'Båt hela vägen från stan tar mellan två och cirka tre timmar. Det går snabbare att ta SL-buss 438 från Slussen och kliva på båten i Boda, och till norra bryggan går reguljära turer från Åsättra på Ljusterö.',
      'Ön är inte anpassad efter besökare på det sätt som de mest turistade öarna är. Grusvägar, betesmark och blandskog, och en tillvaro som fortsätter oberoende av vem som kliver av båten.',
    ],

    facts: {
      // KÄLLA: Waxholmsbolagets tabell 12/13. Nu: Strömkajen 09.00→N. Ingmarsö 12.15 = 3 h 15. Sommar: 08.30→11.05 = 2 h 35. Tidigare '2,5 h' var sommarsiffran.
      travel_time: '~3 h från Strömkajen med Waxholmsbåt (2,5 h sommartid)',
      character: 'Bilfri, vandringsmål, helårsverksamhet',
      season: 'Maj–September (lanthandeln öppen helår)',
      best_for: 'Båtluffare, vandrare, dagsutflykter, lugn skärgård',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      // KÄLLA: stockholmarchipelagotrail.com/sv/etapp/ingmarso/: leden passerar Kålgårdsön; /sv/section/: roddbåtssträckan Finnhamn–Ingmarsö är 0,4 km
      { icon: '🥾', name: 'Båtluffarleden mot Finnhamn', desc: 'Markerad blå led via Kålgårdsön — egen roddbåt över sundet till Finnhamn, en del av Stockholm Archipelago Trail.' },
      // KÄLLA: ingmarso.se: Ingmarsö Bageri = "Café – Deli – Restaurang – Catering", öppet morgon till sen kväll, serverar frukost/lunch/middag/pizza/fika; ingmarsogasthamn.se: bageriet ligger ca 1,5 km från södra bryggan
      { icon: '🍞', name: 'Ingmarsö Bageri', desc: 'Café och bageri mitt på ön — bröd, fika, lunch och pizza, uteservering i trädgården.' },
      // KÄLLA: ingmarso.se ("att-göra"): namnger badplatserna Femsundsviken (brygga och sandstrand) och Badberget (vid norra bryggan)
      { icon: '🏊', name: 'Badplatser', desc: 'Femsundsviken har brygga och sandstrand; Badberget ligger vid norra bryggan.' },
      { icon: '🚶', name: 'Vandring', desc: 'Stigar genom öppet betesmarkslandskap och blandskog. Stockholm Archipelago Trail-etappen är väl markerad.' },
    ],
    // KÄLLA: ingmarsobnb.se + roslagen.se — B&B på Norrgården (1600-talsgård), rum med frukost. Ingmarsö Krog är restaurang utan rum (ingmarsokrog.com) (läst 2026-09-14)
    accommodation: [
      { name: 'Ingmarsö B&B', type: 'B&B', desc: 'B&B på Norrgården, en gård från 1600-talet — svit, familjerum eller dubbelrum, frukost ingår.', websiteUrl: 'https://ingmarsobnb.se' },
    ],
    getting_there: [
      // KÄLLA: se facts.travel_time ovan (Waxholmsbolagets tabell 12/13): 2,5 h sommartid, ca 3 h 15 min övrig tid; ingmarso.se/hittahit: angörs via Åsättra (Ljusterö), Vaxholm eller buss 438 till Boda på Värmdö
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: '2,5–3 h', desc: 'Angör norra och södra Ingmarsö, via Åsättra (Ljusterö), Vaxholm eller buss 438 till Boda på Värmdö.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: ingmarsogasthamn.se: ca 30 platser, landström, färskvatten, dusch/wc, bränsle (bensinmack + sjömack året runt, kortbetalning)
      { name: 'Ingmarsö Gästhamn', desc: 'Gästhamn vid södra bryggan med drygt 30 platser, dusch/wc och bränsleförsäljning.', fuel: true, service: ['el', 'vatten', 'dusch'] },
    ],
    restaurants: [
      // KÄLLA: ingmarsokrog.com: krog vid södra bryggan med brygga/badplats intill. Exakta öppettider, säsong, priser, bokningskrav och barnmeny anges endast som bild på sajten och kunde inte beläggas i text.
      { name: 'Ingmarsö Krog', type: 'Restaurang', desc: 'Öns krog vid södra bryggan, med brygga och badplats intill.', slug: 'ingmarso-krog' },
      // KÄLLA: ingmarso.se: "Café – Deli – Restaurang – Catering", öppet morgon till sen kväll, serverar frukost/lunch/middag/pizza/fika. Priser och exakt säsong obelagda.
      { name: 'Ingmarsö Bageri', type: 'Bageri/Café', desc: 'Bröd, fika, lunch och pizza — uteservering i trädgården.' },
      // KÄLLA: coop.se (butikssidan "coop-ingmarso"); ingmarso.se: Coop Ingmarsö — dagligvaror, Systembolagsombud, apotek, post och bensin, öppet året om. Exakta öppettider obelagda.
      { name: 'Coop Ingmarsö', type: 'Handel', desc: 'Dagligvaror, Systembolagsombud, apotek, post och bensin — öppet året om.', open_season: 'Helår' },
    ],
    tips: [
      // KÄLLA: ingmarso.se — Waxholmsbåtarna angör både norra och södra bryggan
      'Ön har två bryggor, norra och södra — kontrollera i tidtabellen vilken din båt angör.',
      // KÄLLA: ingmarso.se/hittahit — "Du till vissa turer ta SL-buss 438 från Slussen i Stockholm och stiga på båten i Boda"
      'Buss 438 från Slussen till Boda kortar resan jämfört med båt hela vägen från stan.',
    ],
    related: ['finnhamn', 'svartso', 'ljustero'],
    tags: ['bilfri', 'båtluffarleden', 'vandring', 'natur', 'mellersta'],
    // KÄLLA: en.wikipedia.org (Stockholm Archipelago Trail): "Opening in 2024 ... approximately 270 kilometers"; stockholmarchipelagotrail.com/sv/etapp/ingmarso/: leden passerar Kålgårdsön med roddbåtsöverfart
    // KÄLLA: stockholmarchipelagotrail.com/sv/section/roddbatar-finnhamn-ingmarso/ — "Det måste alltid finnas en roddbåt på varje sida."
    did_you_know: 'På roddbåtspassagen mot Finnhamn måste det alltid lämnas kvar en båt på varje sida — vandrare ror därför sträckan flera gånger.',
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli–Mitten av Augusti',
      best: 'Juni',
      bestReason: 'Bageri och krog öppna, Båtluffarleden i toppskick, och inga köer till roddbåten vid Kålgårdsön-sundet.',
      warning: 'Bageri och krog stänger efter säsongen. Vid besök utanför juni–aug — ta med mat.',
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
      // KÄLLA: waxholmsbolaget.se/reseplanering/resmal/namdo — "Nämdö är en av skärgårdens större öar. Ön är promenadvänlig året om"; "den är både bilfri och till viss del ett naturreservat"; "Waxholmsbolagets fartyg lägger till vid flera bryggor på ön"
      'Nämdö är en av skärgårdens större öar, bilfri och till viss del naturreservat. Waxholmsbolagets fartyg lägger till vid flera bryggor, och ön är promenadvänlig året om. Grusvägar, gårdar och skog snarare än kajpromenad och kösystem.',
      // KÄLLA: Riksantikvarieämbetet, bebyggelseregistret via kringla.nu (raa/bbr/21400000445278) — "Nämdö kyrka invigdes hösten 1876"; "Stilen är nygotisk som framförallt uttrycks genom den höga takresningen, tornet samt de spetsbågade fönstren"; "utförd med trästomme, granitsockel samt svartmålat plåttak"
      'Nämdö kyrka invigdes hösten 1876. Stilen är nygotisk, vilket framför allt syns i den höga takresningen, tornet och de spetsbågade fönstren, och byggnaden har trästomme, granitsockel och svartmålat plåttak.',
      // KÄLLA: Riksantikvarieämbetet via kringla.nu (raa/bbr/21400000445278) — knuttimrat kapell på Nämdö efter 1607; nytt kapell uppfört 1701–1702; kapell på initiativ av häradshövding Magnus Blix färdigt 1798
      'Kyrkan har föregångare. Ett knuttimrat kapell restes på ön efter 1607, ett nytt kapell uppfördes 1701–1702 och överlevde ryssarnas härjningar, och 1798 stod ytterligare ett kapell färdigt tillsammans med klockstapel, likbod och kyrkbrygga.',
      // KÄLLA: naturvardsverket.se, nyhet juni 2025 — "Nu har regeringen fattat beslut om att bilda Sveriges 31:a nationalpark"; "Nämdöskärgårdens nationalpark"; "Den omfattar en areal på 25 300 hektar varav 97 procent är hav"; "drygt 1 300 öar, kobbar och skär"
      // KÄLLA: varmdo.se, Nämdöskärgårdens nationalpark — "Den 17 juni 2025 röstade riksdagen i frågan, kort därefter beslutade regeringen"; parken ligger "öster om ön Nämdö" och omfattar "det som tidigare var Bullerö och Långviksskärs naturreservat samt ett stort område hav utanför"
      'Öster om Nämdö bildades 2025 Nämdöskärgårdens nationalpark, Sveriges 31:a och den första med marint fokus i Östersjön. Parken omfattar 25 300 hektar, varav 97 procent är hav, och drygt 1 300 öar, kobbar och skär — bland dem tidigare Bullerö och Långviksskärs naturreservat. Själva ön Nämdö ingår inte i parken, men den ligger vid dess gräns.',
    ],

    facts: {
      // KÄLLA: uppmätt mot ResRobot 2026-08-05 — färja 17-1 Stavsnäs vinterhamn
      // 07:37 → Östanvik (Nämdö) 08:10, utan byten. Stod tidigare "90 min",
      // nästan tre gånger för långt.
      // KÄLLA: Waxholmsbolagets tabell 17 Stavsnäs–Nämdö. ~35 min till Östanvik; andra bryggor 25–60 min.
      travel_time: '~35 min till Östanvik (Nämdö) från Stavsnäs (linje 17)',
      character: 'Bilfri, genuint, litet samhälle, välskyddat',
      season: 'Maj–September',
      best_for: 'Seglare, naturälskare, genuint skärgårdsliv',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      // KÄLLA: Svenska kyrkan (Djurö, Möja och Nämdö församling) + RAÄ bebyggelseregistret — nygotisk träkyrka, invigd hösten 1876; tidigare uppgifter om åttakantig gustaviansk kyrka 1768/1798 var fel.
      { icon: '⛪', name: 'Nämdö kyrka', desc: 'Vit träkyrka i nygotisk stil, invigd 1876 — en av skärgårdens mest distinkta kyrkobyggnader. Öppen sommartid.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Klara vatten och fina klippor längs södra kustlinjen.' },
      { icon: '🚶', name: 'Vandring', desc: 'Promenera runt ön och utforska de gamla fiskelägena.' },
      { icon: '⛵', name: 'Segling', desc: 'Naturhamnen på södsidan är ett populärt seglarankar.' },
    ],
    // KÄLLA: skargardsstiftelsen.se/omraden/namdo — Solvik har boende sommartid, bl.a. glamping, samt tältplatser; visitskargarden.se — Nämdö Solviks Gästhamn (läst 2026-09-14)
    accommodation: [
      { name: 'Solvik — glamping och gästhamn', type: 'Camping', desc: 'Skärgårdsstiftelsens område Solvik har boende sommartid, bland annat glamping, samt gästhamn och tältplatser.', websiteUrl: 'https://skargardsstiftelsen.se/omraden/namdo/' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Stavsnäs', time: '~35 min till Östanvik', desc: 'Waxholmsbolagets linje 17 från Stavsnäs vinterhamn. Linjen går mot Saltsjöbaden/Stockholm, inte till Möja.', icon: '⛴' },
    ],
    harbors: [
    ],
    restaurants: [
      // KÄLLA: visitskargarden.se, Mellersta skärgården/Nämdö — "Tempo Nämdö Livs", livsmedelsbutik, Solvik 201, öppen året runt.
      { name: 'Tempo Nämdö Livs', type: 'Handel', desc: 'Livsmedelsbutik i Solvik, öppen året runt.' },
    ],
    tips: [
      // KÄLLA: waxholmsbolaget.se/reseplanering/resmal/namdo — "den är både bilfri och till viss del ett naturreservat"; "Ön är promenadvänlig året om"
      'Ön är bilfri och promenadvänlig året om — räkna med att gå.',
      // KÄLLA: Riksantikvarieämbetet via kringla.nu (raa/bbr/21400000445278) — Nämdö kyrka invigd hösten 1876, nygotisk träkyrka med torn och spetsbågade fönster
      'Nämdö kyrka från 1876 är ett landmärke på ön — nygotisk träkyrka med högt tak och spetsbågade fönster.',
    ],
    related: ['moja', 'gallno', 'sandhamn'],
    tags: ['bilfri', 'genuint', 'segling', 'natur', 'kyrka'],
    // KÄLLA: att Nämdö specifikt härjades 1719 samt att kyrkan haft "minst tre föregångare" kunde ej beläggas och är borttaget. Kapell ca 1630 och kyrka invigd 1876: Svenska kyrkan (Djurö, Möja och Nämdö församling) + RAÄ bebyggelseregistret (se KÄLLA-kommentar ovanför activities-fältet).
    // KÄLLA: naturvardsverket.se, nyhet juni 2025 — "den andra nationalparken i Sverige med marint fokus" och "första nationalparken med marint fokus i Östersjön"
    // KÄLLA: Riksantikvarieämbetet via kringla.nu (raa/bbr/21400000445278) — kapell på Nämdö efter 1607
    did_you_know: 'Nämdöskärgårdens nationalpark, bildad 2025, är Sveriges första nationalpark med marint fokus i Östersjön. Nämdö har haft kapell sedan 1600-talets början — den nuvarande kyrkan från 1876 är minst den fjärde gudstjänstbyggnaden på ön.',
    insiderTips: [
      'Nämdö kyrka, invigd 1876, är en vit nygotisk träkyrka med hög takresning och spetsbågade fönster — ett karakteristiskt inslag i skärgårdslandskapet.',
      'Nämdö har ett fåtal fastboende och nås med Waxholmsbåten från Stavsnäs.',
      'Ön är känd bland seglare för sina skyddade naturhamnar och är ett populärt ankringsställe.',
      // KÄLLA: skargardsstiftelsen.se, Nämdö — nämner livsmedelsbutik, café och "restaurangverksamhet under sommarsäsongen" i Solvik.
      'Café och enklare restaurangservering finns säsongsvis i Solvik, men öppettiderna är begränsade. Ta med eget som backup.',
    ],
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Juni eller Juli',
      bestReason: 'Midsommar vid den gamla kyrkan är skärgård på riktigt. Juni ger lugnet, blomstret och det tomma sundet — utan juli-trängseln.',
      // KÄLLA: skargardsstiftelsen.se, Nämdö — café/restaurangverksamhet i Solvik under sommarsäsongen; visitskargarden.se anger att livsmedelsbutiken (Tempo Nämdö Livs) är öppen året runt.
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
    tagline: 'Bilfri ö i Värmdö — lanthandel, krog och en levande helårsby.',
    description: [
      // KÄLLA: svartso.se — Svartsö ligger "cirka 2 distansminuter ost om södra Ljusterö, strax söder om Ingmarsö", i Värmdö kommun; ön är 8 km lång och 1,5 km bred (2026-09-14)
      // KÄLLA: svartsolanthandel.se/om-svartso — "omkring 65 personer permanent på Svartsö"; på ön finns "förskola, skola, lanthandel, krog, Bistro och hotell&vandrarhem" (2026-09-14)
      'Svartsö ligger i Stockholms mellersta skärgård, cirka två distansminuter öster om södra Ljusterö och strax söder om Ingmarsö, och tillhör Värmdö kommun. Ön är åtta kilometer lång och en och en halv kilometer bred. Med omkring 65 permanentboende är den ett av få mellanstora skärgårdssamhällen med förskola, skola, lanthandel, krog, bistro och hotell och vandrarhem.',
      // KÄLLA: svartso.se ("Svartsö genom tiderna") — ön bebyggdes sannolikt under medeltiden; från 1500-talet utgör gårdarna en grundstruktur; stenhuset i Alsvik uppfördes 1732 av Johan Söderling, med tegel från hans tegelbruk på Hästnacken (anlagt omkring 1730); skola byggd 1897, missionshus 1880 (2026-09-14)
      'Ön bebyggdes sannolikt redan under medeltiden, och sedan 1500-talet har gårdarna utgjort grundstrukturen i samhället. I Alsvik lät Johan Söderling uppföra ett stenhus 1732, av tegel från hans eget tegelbruk på grannön Hästnacken. Missionshuset restes 1880 och skolan byggdes 1897.',
      // KÄLLA: svartso.se — vägnätet består av grusvägar och gångstigar, ön är i praktiken bilfri och det finns cykeluthyrning (2026-09-14)
      'Vägnätet på Svartsö består av grusvägar och gångstigar, och ön är i praktiken bilfri. Cykeln är det självklara fortskaffningsmedlet och det finns cykeluthyrning. Krogen, lanthandeln och vandrarhemmet utgör öns kärna.',
      // KÄLLA: stockholmarchipelagotrail.com/sv/section/etapp-svartso/ — etappen är 17,9 km, "en liggande åtta", nås från bryggorna Norra Svartsö, Alsvik, Skälvik och Söderboudd; svårighetsgrad "Lätt", "De knappt arton kilometrarna är för det mesta på vacker grusväg" (2026-09-14)
      'Stockholm Archipelago Trails Svartsö-etapp är knappt arton kilometer lång och går som en liggande åtta över ön, mest på grusväg och klassad som lätt. Den kan påbörjas från bryggorna Norra Svartsö, Alsvik, Skälvik och Söderboudd.',
      'Att kunna cykla utan att hålla utkik efter bilar, och höra fågelljud och havets sus i stället för motorer, hör till det som gör en dag här till vad den är.',
    ],

    facts: {
      // KÄLLA: svartsokrog.se/hitta-hit ("Resan tar ca 1,5-2,5h beroende på avgång" med Waxholmsbolaget från Strömkajen)
      // KÄLLA: Waxholmsbolagets tabell 13 Strömkajen–Alsvik (Svartsö), snabbast ~2 tim 15, typiskt 2 tim 20–35.
      travel_time: '~2 tim 15–35 min med Waxholmsbåt från Strömkajen (linje 13)',
      // KÄLLA: sv.wikipedia.org/wiki/Svartsö ("Det finns inget jordbruk på ön") — "ekologisk" obelagt/missvisande
      character: 'Bilfri, lugnt, mat i fokus',
      // KÄLLA: svartsokrog.se/oppettider (öppet in i oktober); seasonal.open i samma objekt anger April–Oktober
      season: 'Maj–Oktober',
      best_for: 'Matälskare, naturälskare, cyklister',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      { icon: '🛒', name: 'Svartsö Lanthandel', desc: 'Skärgårdens kanske mest välsorterade lanthandel — med apotekombud och Systembolagets utlämning. Lokalbornas vardagsliv händer här.' },
      // KÄLLA: svartso.se ("Svartsö genom tiderna": stenhuset i Alsvik, uppfört 1732 av bankokommissarie Johan Söderling, finns kvar och är privatägt)
      { icon: '🏛', name: 'Stenhuset i Alsvik', desc: 'Stenhus uppfört 1732 av bankokommissarien Johan Söderling, av tegel från hans eget tegelbruk på Hästnacken — en av öns äldsta bevarade byggnader, idag privatägd.' },
      { icon: '🚶', name: 'Vandring', desc: 'Stockholm Archipelago Trail-etapp leder över Svartsö med markerade stigar genom öppet odlingslandskap och skog.' },
      { icon: '🚲', name: 'Cykling', desc: 'Bilfri ö med totalt 14 km grusvägar — ideal för en hel dag på cykel. Hyr cykel hos Svartsö Lanthandel vid Ahlsviks brygga. Inga bilar, bara kor, betesängar och stilla skärgårdslandskap.' },
    ],
    // KÄLLA: svenskaturistforeningen.se/boende/stf-svartso-skargardshotell-vandrarhem — STF-anslutet, ägs och drivs av fyra Svartsöfamiljer (inte av STF); svartsolanthandel.se/sjobodarna — 4 stugor, 8 bäddar vid Alsviks brygga (läst 2026-09-14)
    accommodation: [
      { name: 'STF Svartsö Skärgårdshotell & Vandrarhem', type: 'Vandrarhem', desc: 'Hotell- och vandrarhemsboende med konferens. STF-anslutet, ägs och drivs av fyra Svartsöfamiljer.', websiteUrl: 'https://www.svenskaturistforeningen.se/boende/stf-svartso-skargardshotell-vandrarhem/' },
      { name: 'Sjöbodarna, Svartsö Lanthandel', type: 'Stugor', desc: 'Fyra stugor med åtta bäddar vid Alsviks brygga intill lanthandeln.', websiteUrl: 'https://www.svartsolanthandel.se/sjobodarna' },
    ],
    getting_there: [
      // KÄLLA: svartsokrog.se/hitta-hit ("Resan tar ca 1,5-2,5h beroende på avgång"; "Stig av vid Alsviks brygga")
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: '~2 tim 15–35 min', desc: 'Waxholmsbolagets linje 13 från Strömkajen via Vaxholm; bryggor Alsvik och Skälvik.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: svartsolanthandel.se/gasthamn (El 80 kr/dygn; servicehus med toalett & dusch; ingen uppgift om bränsle eller vatten)
      { name: 'Svartsö gästhamn', desc: 'Gästhamn i Alsvik, driven av Svartsö Lanthandel, med servicehus (toalett och dusch).', fuel: false, service: ['el', 'dusch'] },
    ],
    restaurants: [
      // KÄLLA: svartsokrog.se (meny, öppettider, kontaktuppgifter, hämtat sep 2026)
      { name: 'Svartsö Krog', type: 'Restaurang', desc: 'Öns krog vid bryggan — säsongsbaserad meny.', slug: 'svartso-krog', price_example: 'Varmrätt 310–355 kr, fyrarättersmeny 655–795 kr', open_season: 'Maj–Oktober', open_hours: 'Varierar per dag, oftast 11.30–15 och 17–21.30', book_required: true, phone: '08-542 472 55', child_menu: true },
      // KÄLLA: svartsolanthandel.se ("Öppettider butik")
      { name: 'Svartsö Lanthandel', type: 'Handel', desc: 'Skärgårdens kanske bäst sorterade lanthandel — apotek- och Systembolagsombud.', open_season: 'Helår', open_hours: 'Mån–Ons 9–13, Tor–Fre 9–17, Lör 10–13, Sön stängt' },
    ],
    day_cost: {
      // KÄLLA: waxholmsbolaget.se kunde inte verifieras (JS-renderad sajt, ej skrapbar) — exakt biljettpris borttaget tills det kan beläggas
      budget_per_person: 'Beror på båtbiljett, mat och ev. cykeluthyrning',
      includes: 'Båtbiljett t/r (se waxholmsbolaget.se), mat på krogen, ev. cykeluthyrning och proviant',
      breakdown: [
        // KÄLLA: svartsokrog.se/hitta-hit och svartsolanthandel.se/cykeluthyrning (avgångsorter Strömkajen/Boda brygga)
        { item: 'Waxholmsbåt t/r från Strömkajen/Boda', price: 'Se waxholmsbolaget.se för aktuellt pris' },
        // KÄLLA: svartsokrog.se/meny (varmrätt, hämtat sep 2026)
        { item: 'Varmrätt Svartsö Krog', price: '310–355 kr' },
        // KÄLLA: svartsolanthandel.se/cykeluthyrning ("200kr / dag")
        { item: 'Cykeluthyrning (heldag)', price: '200 kr' },
      ],
      tips: [
        'Boka bord på krogen i förväg — högsäsong kan vara fullbokat.',
        // KÄLLA: svartsolanthandel.se/cykeluthyrning — lanthandeln hyr ut cyklar
        'Hyr cykel vid lanthandeln och cykla runt på ön.',
        'Lanthandeln har apoteksombud och Systembolagsombud.',
      ],
    },
    tips: [
      // KÄLLA: svartsolanthandel.se/om-svartso — lanthandel på ön, omkring 65 permanentboende, förskola och skola (2026-09-14)
      'Lanthandeln är en sevärdhet i sig för en bilfri ö.',
      'Skola och året-runt-befolkning gör att ön är levande även utanför sommarsäsongen.',
      // KÄLLA: stockholmarchipelagotrail.com/sv/section/etapp-svartso/ — etapp Svartsö, 17,9 km, svårighetsgrad Lätt (2026-09-14)
      'Stockholm Archipelago Trail går genom Svartsö — etappen är knappt 18 km och klassad som lätt.',
    ],
    related: ['moja', 'gallno', 'ingmarso'],
    tags: ['bilfri', 'helårs-ö', 'lanthandel', 'genuint', 'lantligt'],
    did_you_know: 'Svartsö har omkring 65 åretruntinvånare och är en av få mellanstora skärgårdsöar med levande helårsverksamhet — ön har egen skola, krog, vandrarhem och en lanthandel som även fungerar som apotekombud och Systembolagets utlämningsställe.',
    insiderTips: [
      // KÄLLA: svartsokrog.se/hitta-hit ("stiger av vid Boda brygga... Därifrån tar du Waxholmsbåten sista biten till Svartsö")
      'Boda brygga på Värmdö är en vanlig omstigningspunkt: ta SL-buss från Slussen till Boda och Waxholmsbåten sista biten till Svartsö.',
      'Lanthandeln på Svartsö fungerar även som apoteksombud och utlämningsställe för Systembolaget.',
      // KÄLLA: sv.wikipedia.org/wiki/Svartsö (SCB, 66 inv. 2020); svartso.se ("cirka 60 bofasta"); svartsolanthandel.se/om-svartso ("omkring 65 personer permanent")
      'Svartsö har omkring 65 fastboende året runt, en av de mer folkrika mellanstora öarna utan fast landförbindelse i länet.',
    ],
    seasonal: {
      open: 'April–Oktober',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Genuint skärgårdsliv utan trängseln. Lanthandeln, krogen och vandrarhemmet håller öppet — men du delar ön med byborna istället för turisterna.',
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
      // KÄLLA: runmarohembygdsförening.se/forfattare/ — Strindberg hyrde hus tre somrar: "Nore 1889, Stenbro 1890, Lerkila 1891"; "Söderberg hyrde samma hus i Stenbro som Strindberg tidigare hade hyrt"
      'Runmarö har en ovanligt tät litteraturhistoria. August Strindberg hyrde hus på ön tre somrar i rad — Nore 1889, Stenbro 1890 och Lerkila 1891 — och Hjalmar Söderberg hyrde senare samma hus i Stenbro som Strindberg hade bott i.',
      // KÄLLA: runmarohembygdsförening.se/forfattare/ — Tomas Tranströmer (1931–2015): "Morfadern var lots och det blev många sommarlov hos mormor och morfar i Gatan"; Nobelpriset i litteratur 2011; "Dikter från Runmarö" (2001)
      'Tomas Tranströmer (1931–2015), Nobelpristagare i litteratur 2011, tillbringade många sommarlov hos mormor och morfar i Gatan på Runmarö; morfadern var lots. Samlingen "Dikter från Runmarö" kom 2001. Det finns ingen skyltad författarrunda på ön — man går dit på egen hand och hittar vad man hittar.',
      // KÄLLA: runmarohembygdsförening.se/kalkhallar/ — "Där det finns urkalksten på Runmarö ser man en särpräglad och färgsprakande blomsterprakt och en stor rikedom på orkidéer"; apollofjärilen "finns bara på platser med kalkberggrund"
      'Berggrunden gör ön botaniskt udda. Där urkalkstenen går i dagen växer en särpräglad och färgsprakande flora med stor rikedom på orkidéer, och här finns också apollofjärilen, som bara förekommer på platser med kalkberggrund.',
      // KÄLLA: runmaro.se/om — "Från Stavsnäs Vinterhamn finns det gott om reguljära förbindelser till Runmarö med Waxholmsbolaget eller andra båtbolag"; "buss 433 eller 434 från Slussen. Bussresan till Stavsnäs tar ca 50 minuter"
      // KÄLLA: stockholmarchipelagotrail.com/sv/section/etapp-runmaro/ — "Du åker till Runmarö flera gånger om dagen från Stavsnäs eller Sandhamn, året om."
      'Ön nås från Stavsnäs Vinterhamn med Waxholmsbolaget eller andra båtbolag, flera gånger om dagen året om, och även från Sandhamn. Från Stockholm tar man buss 433 eller 434 från Slussen till Stavsnäs, en bussresa på ungefär 50 minuter.',
      // KÄLLA: runmaro.se/om — bageri (Låttas Bageri), krog/restaurang (Svängen), affär (Tempo Runmarö)
      // KÄLLA: stockholmarchipelagotrail.com/sv/section/etapp-runmaro/ — "På Runmarö finns affär, skola, restaurang och bageri"; cykeluthyrning vid affären eller båthamnen
      'Ön har affär, bageri, krog och skola — det är en ö där folk bor, inte bara hyr. Cykel går att hyra vid affären eller båthamnen.',
      // KÄLLA: stockholmarchipelagotrail.com/sv/section/etapp-runmaro/ — "Grusvägar genom öppna beteslandskap tar dig till skogsvägar genom gles bebyggelse"; "stigar genom trolsk skog"
      'Landskapet växlar mellan grusvägar genom öppna beteslandskap, skogsvägar genom gles bebyggelse och stigar genom tät skog. Vattnet är aldrig långt bort, och klipporna gör sig lika bra till handduk som till utsiktsplats.',
    ],

    facts: {
      // KÄLLA: Waxholmsbolagets tabell 16/17. Runmarö nås från STAVSNÄS (ej Strömkajen), Styrsvik ~11 min, Långvik ~15–20 min.
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
    // KÄLLA: runmarobatvarv.se — gästbrygga med båtplatser, inga stugor; runmaro.se: Runmarö Krog är nedlagd ("F.d. Runmarö Krog") (läst 2026-09-14)
    accommodation: [
      { name: 'Runmarö Båtvarv — gästbrygga', type: 'Gästhamn', desc: 'Gästplatser för båtar vid Runmarö Båtvarv. Inget boende på land är belagt på ön.', websiteUrl: 'https://runmarobatvarv.se' },
    ],
    // KÄLLA: Waxholmsbolagets tidtabeller linje 16 och 17 (kund.printhuset-sthlm.se/wa/v16.pdf, v17.pdf, gäller 2 apr–18 jun och 17 aug–12 dec 2026): Stavsnäs–Styrsvik ca 5 min; 17 fortsätter Nämdö–Saltsjöbaden–Stockholm (läst 2026-09-14). Stod 11–20 min och "nås ej från Strömkajen" — fel.
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Stavsnäs', time: 'ca 5 min', desc: 'Waxholmsbolagets linje 16 och 17 från Stavsnäs; Styrsvik är huvudbryggan (Gatan och Långvik angörs på beställning). Linje 17 fortsätter till Strömkajen via Nämdö och Saltsjöbaden, ca 2–2,5 h.', icon: '⛴' },
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Gästhamn i Styrsvik.', icon: '⛵' },
    ],
    harbors: [
      // KÄLLA: runmarobatvarv.se/tjänster/gästhamn-marina — "Gästbrygga … Anslutning Landström", Solberga. Ingen källa för bränsle, vatten eller dusch.
      { name: 'Runmarö Båtvarv gästbrygga (Solberga)', desc: 'Gästbrygga vid Runmarö Båtvarv i Solberga med landström.', fuel: false, service: ['el'] },
    ],
    restaurants: [
      // KÄLLA: runmaro.se (öns egen sida) — "F.d. Runmarö Krog" är nedlagd; aktiva: "Svängen, Krog och restaurang" och "Tempo Runmarö". Inga öppettider anges där.
      { name: 'Svängen', type: 'Restaurang', desc: 'Krog och restaurang på ön.', book_required: false },
      { name: 'Tempo Runmarö', type: 'Handel', desc: 'Öns lanthandel — proviant och dagligvaror.' },
    ],
    tips: [
      // KÄLLA: runmaro.se/om — "buss 433 eller 434 från Slussen. Bussresan till Stavsnäs tar ca 50 minuter"
      'Från Slussen går buss 433 och 434 till Stavsnäs, ca 50 minuter, och därifrån båt till Runmarö.',
      // KÄLLA: stockholmarchipelagotrail.com/sv/section/etapp-runmaro/ — cykeluthyrning vid affären eller båthamnen
      'Cykel kan hyras vid affären eller båthamnen — grusvägarna gör ön lätt att ta sig runt på.',
    ],
    related: ['sandhamn', 'moja', 'gallno'],
    tags: ['segling', 'naturhamn', 'bränsle', 'lugnt', 'mellersta'],
    // KÄLLA: runmarohembygdsförening.se/kalkhallar/ — apollofjärilen är "en av Sveriges största fjärilsarter och den finns bara på platser med kalkberggrund"
    // KÄLLA: runmarohembygdsförening.se/forfattare/ — "Söderberg hyrde samma hus i Stenbro som Strindberg tidigare hade hyrt"
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
    // KÄLLA: SL buss 682 Engarn–Resarö (kund.printhuset-sthlm.se/sl/h682.pdf, gäller 17 aug–12 dec 2026); buss 670 Tekniska högskolan–Vaxholm passerar Engarn (läst 2026-09-14). Stod "buss 676 till Resarö" — 676 går Tekniska högskolan–Norrtälje. "50 min" obelagt, borttaget.
    getting_there: [
      { method: 'Bil', from: 'Vaxholm', time: '10 min', desc: 'Resarö är landfast — bilväg från Vaxholm.', icon: '🚗' },
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
    tagline: 'Bilfri och lugn — en av de bättre bevarade hemligheterna i mellersta skärgården.',
    description: [
      'Husarö är en bilfri ö i mellersta skärgården som erbjuder lugn och möjligheter för längre vistelse. Ön är mindre känd än sina närliggande grannar.',
      // KÄLLA: husaro.se ("ungefär 2,5 km lång"; kulturlandskap med ängar och lövträd → tallskog och släta klippor), visitskargarden.se (Husarö Handel: lanthandel, sjömack, gästhamn vid ångbåtsbryggan)
      'Naturmässigt är Husarö varierad: kulturlandskap med ängar och lövträd i byn, tallskog och släta klippor längre ut. Ön är ungefär 2,5 km lång — allt nås till fots. Vid ångbåtsbryggan ligger Husarö Handel med lanthandel, sjömack och gästhamn.',
      'Husarö passar för familjer som söker lugn och naturupplevelse, eller som ett stopp på en längre seglingsresa.'
    ],

    facts: {
      // KÄLLA: Waxholmsbolagets tabell 12/13 Strömkajen–Husarö, snabbast ~3 tim 15 (08.30→11.45), typiskt ~3 tim 30.
      travel_time: '~3 tim 15 min med Waxholmsbåt från Strömkajen (linje 12/13)',
      character: 'Bilfri, lugnt, genuint, norra mellersta',
      season: 'Maj–September',
      best_for: 'Seglare, de som söker lugn och orördhet',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      // KÄLLA: husaro.se ("Vandra, bada, fiska"), visitroslagen.se (badplatser Sandholmen, Badviken, Bockholmen, Kallviken), stockholmslansmuseum.se (lotsplats 1740–1912, fiske och säljakt), explorearchipelago.com (pontonbrygga med Y-bommar)
      { icon: '🚶', name: 'Vandring', desc: 'Ön är bara 2,5 km lång men skiftar från ängar och lövträd i byn till tallskog och släta klippor. Hela ön går att gå runt på en eftermiddag.' },
      { icon: '🏊', name: 'Bad', desc: 'Sandholmen, Badviken, Bockholmen och Kallviken är öns badplatser.' },
      { icon: '🎣', name: 'Fiske', desc: 'Husaröborna levde av lotsning, fiske och säljakt — fiske från klipporna är fortfarande en av öns självklara sysselsättningar.' },
      { icon: '⛵', name: 'Segling', desc: 'Gästhamn med Y-bommar vid ångbåtsbryggan och sjömack intill. Officiell lotsplats 1740–1912 — sjöfolk har lagt till här i sekler.' },
    ],
    accommodation: [
      // KÄLLA: visitroslagen.se ("småstugor", "stugbyn"), husaro.se ("Hyr stuga")
      { name: 'Stugor på Husarö', type: 'Stugor', desc: 'Småstugor och stugby att hyra på ön. Litet utbud — boka i god tid.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: '~3 tim 15 min', desc: 'Linje 12/13. Ingår i SL-kort.', icon: '⛴' }, // KÄLLA: Waxholmsbolagets tabell 12/13 Strömkajen–Husarö, snabbast ~3 tim 15 (samma källa som travel_time ovan).
    ],
    harbors: [
      // KÄLLA: explorearchipelago.com (pontonbrygga med Y-bommar, el mot avgift, nya toaletter, miljöstation, inget färskvatten), visitskargarden.se (Husarö Handel-Sjömack)
      { name: 'Husarö Handel gästhamn', desc: 'Pontonbrygga med Y-bommar vid ångbåtsbryggan. El mot avgift, nya toaletter och miljöstation — men inget färskvatten. Sjömack intill.', fuel: true, service: ['el', 'toalett'] },
    ],
    restaurants: [
      // KÄLLA: osteraker.se (lanthandel drivs av Henkan och Kattis, enklare mat och dryck sommartid), gasthamnsguide.se ("öppet alla dagar under sommarlovet 10.00-19.00"), visitroslagen.se (begränsade öppettider)
      { name: 'Husarö Handel', type: 'Café', desc: 'Öns lanthandel vid ångbåtsbryggan — enklare mat, fika och proviant sommartid. Öppet alla dagar under sommarlovet 10–19, begränsat utanför säsong.' },
    ],
    tips: [
      'Lanthandeln har begränsade öppettider utanför sommarlovet — kommer du i maj eller september, ta med proviant.',
      'Husarö är mindre känt än grannarna, vilket ger ett lugnare hamnläge.',
    ],
    related: ['finnhamn', 'ingmarso', 'ljustero'],
    tags: ['bilfri', 'orört', 'segling', 'vandring', 'lugnt'],
    // KÄLLA: stockholmslansmuseum.se ("Husarn" i kung Valdemars jordebok från 1200-talet; officiell lotsplats 1740–1912; ett 20-tal lotsar), osteraker.se (Elsa Beskow, riksintresse för kulturmiljövården). OBS: Skärgårdsstiftelsens "Lilla Husarn" är en annan ö vid Nämdö.
    did_you_know: 'Husarö finns med redan i kung Valdemars jordebok från 1200-talet, då som "Husarn". Ön var officiell lotsplats 1740–1912 med ett tjugotal lotsar när segelsjöfarten var som störst. Elsa Beskow hade sitt sommarhus här, och byn är i dag riksintresse för kulturmiljövården.',
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Juni',
      bestReason: 'Lugnt vatten, öppna naturhamnar och inga turister — perfekt för segling.',
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
      'Skärgårdsstiftelsen arrenderade området från Fortifikationsverket 1994 och tog över ägandet 2013. Idag drivs vandrarhem, sjökrog, gästhamn och bastu i karantänsstationens äldre byggnader.',
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
      // KÄLLA: skargardsstiftelsen.se/omraden/fejan — "Fejans gästhamn … Hamnavgiften inkluderar tillgång till dusch, toalett och bastu"; fejan.com/gasthamn — "ligger ni på mooringlinor", el/dusch/WC
      { name: 'Fejans gästhamn', desc: 'Gästhamn vid Fejan Sjökrog med mooringlinor. Hamnavgiften inkluderar dusch, toalett och bastu. Säsongsöppen.', fuel: false, service: ['el', 'dusch'] },
    ],
    restaurants: [],
    tips: [
      'Anlöp tidigt — Fejan är populär och naturhamnen fylls kvällar i juli.',
      'Ta med allt du behöver — ingen service finns på ön.',
      // Fejan är INTE naturreservat (KÄLLA: Norrtälje kommuns lista över skyddad natur, läst 2026-09-14 — Fejan finns inte med). Tidigare tips om "naturreservatsregler" borttaget.
    ],
    related: ['furusund', 'arholma', 'graddo'],
    tags: ['naturreservat', 'klippor', 'segling', 'snorkling', 'norra'],
    did_you_know: 'Fejan var östkustens karantänsstation från 1892 — fartyg och passagerare med smittsamma sjukdomar fick stanna här innan de fick fortsätta in mot fastlandet. Sjukhuset "Wasa" låg i drift fram till 1930-talet och vandrarhemmet idag bedrivs i de bevarade byggnaderna.',
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
    tagline: 'Skyddat ytterklippsskär med en av norra skärgårdens finaste ankringsplatser.',
    description: [
      'Rödlöga ligger på gränsen till Stockholms norra ytterskärgård och är en av skärgårdens mest oförändrade öar. Det finns inga bilvägar, bara slingrande stigar mellan tomter och klippor, och ingen el. Sommartid räknar ön ca 150 hushåll, vintertid är ön i princip obebodd.',
      'Ön har bofast historia sedan 1530-talet och var en av få öar som inte brändes vid ryssarnas härjningar 1719. Från 1792 var en lots stationerad här. Jordbruket lades ned 1956 och den siste fastboende, Georg Nordström, flyttade 1979.',
      'Rödlöga är primärt en seglarö, de skyddade vikarna och naturhamnen lockar erfarna seglare som söker autentisk ytterskärgård.',
      'Byn på Rödlöga är en av norra skärgårdens mest välbevarade. Röda fiskerigårdar, bodar och bryggvakt längs den inre viken, en miljö som inte förändrats nämnvärt sedan sekelskiftet 1900. Kyrkan från 1878 är liten och enkel och öppen under sommarmånaderna. Det är den sortens plats man fotograferar och sedan inser att bilden inte fångar det.',
      'Hamnen på Rödlögas inre sida är naturligt skyddad och ett av norra skärgårdens bästa ankarplatser. Hit tar man sig efter en lång seglingsdag och stannar. Ingen anledning att skynda vidare, viken håller vad den lovar.',
      'Rödlöga belönar den som tar sig tid att gå runt ön. Östra sidan mot öppet hav är vild och klippig med dramatisk utsikt mot de yttersta holmarna. Det tar ungefär två timmar i lugnt tempo. Vattnet längs klipporna är klart och kallt även i juli, klippbad med havsutsikt av det slag man minns.',
    ],

    facts: {
      travel_time: 'ca 4 tim med Waxholmsbåt från Strömkajen (linje 26)',
      character: 'Ytterskärgård, välskyddat ankare, äventyrligt',
      season: 'Juni–Augusti',
      best_for: 'Erfarna seglare, ytterskärgårdsälskare',
    },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'En av norra skärgårdens bäst skyddade naturhamnar. Populär under Gotland Runt och andra långseglingsäventyr.' },
      { icon: '🌊', name: 'Klippvandring', desc: 'Vandra ut mot yttre klipporna och känn havsexponeringen.' },
      { icon: '🎣', name: 'Fiske', desc: 'Utmärkt havsöring- och makrillfiske i ytterskärgårdens vatten.' },
    ],
    accommodation: [
      { name: 'Stugor vid hamnen', type: 'Stugor', desc: 'Enkla stugor för övernattning.' },
    ],
    // KÄLLA: Waxholmsbolaget linje 26 (kund.printhuset-sthlm.se/wa/v26.pdf, gäller 2 apr–18 jun, 17 aug–1 nov 2026): Strömkajen–Rödlöga ca 4 h 15 min, Rödlöga är ändbrygga (läst 2026-09-14)
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: 'ca 4 tim', desc: 'Waxholmsbolagets linje 26 (Strömkajen–Norröra–Söderöra–Svartlöga–Rödlöga), yttersta stoppet. Ej från Norrtälje.', icon: '⛴' },
      { method: 'Privat båt', from: 'Furusund / Arholma', time: '1–2 h', desc: 'Naturlig etapp på en längre norrlands-seglingstur.', icon: '⛵' },
    ],
    harbors: [
      // KÄLLA: rodlogaboden.se — naturhamn "i alla vindar"; "ny gästbrygga … inne i byviken … Ej nattförtöjning … max 3 ton"; /om-oss — "sjömack med bensin, diesel, fotogen och gasol", "På ön finns ingen fast el"
      { name: 'Rödlöga naturhamn och Rödlögabodens dagbrygga', desc: 'Naturhamn i alla vindar. Dagbrygga (ej nattförtöjning, max 3 ton) vid Rödlögaboden. Sjömack finns.', fuel: true, service: ['bränsle'] },
    ],
    restaurants: [
      // KÄLLA: rodlogaboden.se/pages/cafe-truten — "kaffe eller the … hembakade pajer och kakor, en god smörgås - eller kanske en hamburgare som du grillar själv"; öppnar midsommardagen. Ingen "Rödlöga Krog" hos tillåten källa.
      { name: 'Café Truten', type: 'Café', desc: 'Café i byn vid Rödlögaboden: kaffe, hembakat, smörgåsar och grilla-själv-hamburgare. Öppet från midsommar.', websiteUrl: 'https://rodlogaboden.se/pages/cafe-truten' },
    ],
    tips: [
      'Rödlöga kräver god navigeringskunskap — ytterskärgård med grunder.',
      'Krogen är extra livlig under Gotland Runt-helgen (tidig juli).',
    ],
    related: ['arholma', 'furusund', 'fejan'],
    tags: ['ytterskärgård', 'segling', 'ankring', 'norra', 'äventyr'],
    did_you_know: 'Rödlöga är omgiven av ett av Stockholms läns rikaste fiskevatten. Abborrar, gäddor och havsöring fångas här i stor mängd.',
    seasonal: {
      open: 'Juni–Mitten av September',
      peak: 'Juli',
      best: 'Juli',
      bestReason: 'Rödlöga är extra livlig under Gotland Runt-helgen i tidig juli. Krogen och hamnen är öppna och norra ytterskärgårdens vildaste stämning.',
      warning: 'Kräver god navigationskunskap — ytterskärgård med grunder. Lång restid från Stockholm (3–4 h med Waxholmsbåt).',
      months: ['off','off','off','off','off','open','peak','open','limited','off','off','off'],
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
      travel_time: '~1,5 tim med bil från Stockholm / SL-buss 637 från Norrtälje — Singö är landfast via bro',
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
    // KÄLLA: SL buss 637 Norrtälje busstation–Ellans vändplan (kund.printhuset-sthlm.se/sl/h637.pdf, gäller 17 aug–12 dec 2026) (läst 2026-09-14). Broåret 1955 obelagt — borttaget.
    getting_there: [
      { method: 'Bil / buss', from: 'Norrtälje', time: 'ca 45 min', desc: 'Singö är landfast via broar (Väddö–Fogdö–Singö). SL-buss 637 från Norrtälje busstation (hållplatser Singöbron södra, Singö kyrka, Singö camping) eller bil hela vägen — ingen bilfärja.', icon: '🚗' },
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
      // KÄLLA: Waxholmsbolagets tabell 31 (RÄFSNÄS–TJOCKÖ–LIDÖ–FEJAN). Lidö nås från Räfsnäs ~25 min (06.40→07.05), EJ från Strömkajen. Ingen bilfärja till ön.
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
    // KÄLLA: Waxholmsbolaget linje 31 (kund.printhuset-sthlm.se/wa/v31.pdf): Räfsnäs–Lidö ca 10–15 min (läst 2026-09-14). Stod ~25 min, "Norra linjen från Strömkajen 3 h" och "bilfärja till ön" — inget av det belagt (Lidö finns inte bland Trafikverkets färjeleder), borttaget.
    getting_there: [
      { method: 'Bil + Waxholmsbåt', from: 'Räfsnäs', time: 'ca 10–15 min båt', desc: 'E18 mot Norrtälje och vidare till Räfsnäs brygga. Därifrån Waxholmsbolagets linje 31 (Räfsnäs–Tjockö–Lidö–…–Fejan), året runt.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: lidovardshus.com/gsthamnen — "Eluttag finns på bryggan", "vid separat brygga finns station att fylla dricksvatten", "Vid Oasen finns toaletter, dusch"
      { name: 'Lidö Värdshus gästhamn', desc: 'Gästhamn vid Lidö Värdshus. El på bryggan, dricksvatten vid separat brygga, toalett och dusch vid Oasen.', fuel: false, service: ['el', 'vatten', 'dusch'] },
    ],
    restaurants: [
      // KÄLLA: lidovardshus.com/restaurangen — "klassisk och skärgårdsinspirerad mat med tydliga, svenska smaker där lokala råvaror står i fokus"
      { name: 'Lidö Värdshus, restaurangen', type: 'Restaurang', desc: 'Restaurang på Lidö Värdshus med klassisk, skärgårdsinspirerad mat med lokala råvaror.', websiteUrl: 'https://lidovardshus.com/restaurangen' },
    ],
    tips: [
      'Lidö Värdshus är populärt för weekendpaket — boka i god tid, helst flera veckor i förväg.',
      'Skärgårdsstiftelsens vandringsleder mellan Lidö och de mindre öarna runt om är fina i juni–juli.',
    ],
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
    tagline: 'Halvö i norra skärgården med direktbuss och en av regionens finaste stränder.',
    description: [
      'Gräddö är en halvö i Roslagens skärgård i Norrtälje kommun, broförbunden med fastlandet via E18 och väg 76. Det gör Gräddö till en av de mest tillgängliga skärgårdsplatserna i norra Stockholms län, man kör hela vägen utan färja.',
      'Halvön är populär för dagsutflykter från Stockholm. Sommartid finns båtutflykter till Tjockö, Fejan och vidare ut i Furusunds skärgård. Gräddöbadet är en lättillgänglig sandstrand och området har flera mindre gästhamnar och restauranger längs kusten.',
      'Gräddö passar för bilburna familjer som vill nå Roslagens skärgård utan båt, för dagsturer från Norrtälje, eller som start- och slutpunkt för båtutflykter mot Furusund och de yttre öarna.',
    ],

    facts: {
      travel_time: '90 min med buss från Stockholm',
      character: 'Lättillgänglig, sandstrand, norra skärgård',
      season: 'April–Oktober',
      best_for: 'Bad, dagstur, barnfamiljer, bilresenärer',
    },
    activities: [
      { icon: '🏖', name: 'Gräddöbadet', desc: 'En av norra skärgårdens populäraste sandstränder. Grunt och barnvänligt.' },
      { icon: '🚲', name: 'Cykling', desc: 'Ny gång- och cykelbana vid Gräddö hamn (1,1 km). Cykla vidare längs Rådmansölandet mot Räfsnäs och Kapellskär, ca 20 km enkel väg längs en av Roslagens vackraste kustlinjer.' },
      { icon: '⛵', name: 'Segling', desc: 'Välplacerat stopp på väg norrut längs Furusundsleder.' },
    ],
    accommodation: [
      { name: 'Gräddö Gård', type: 'Hotell', desc: 'Konferens- och övernattning på gård i naturskönt läge.' },
    ],
    getting_there: [
      { method: 'Buss', from: 'Stockholm', time: '90 min', desc: 'SL-buss 637 mot Norrtälje och vidare.', icon: '🚌' },
      { method: 'Bil', from: 'Stockholm', time: '75 min', desc: 'E18 mot Norrtälje, sedan väg 76 mot Gräddö.', icon: '🚗' },
    ],
    harbors: [
      // KÄLLA: graddosjomack.se — "Gräddö Sjömack och Gästhamn", gästplatser med el, färskvatten, dusch; sjömack med bensin och diesel
      { name: 'Gräddö Sjömack och Gästhamn', desc: 'Gästhamn med sjömack på Gräddö. Gästplatser med el, färskvatten och dusch; bensin och diesel.', fuel: true, service: ['el', 'vatten', 'dusch', 'bränsle'] },
    ],
    restaurants: [
    ],
    tips: [
      'Gräddöbadet är bäst tidig morgon — sandstranden fylls snabbt på varma dagar.',
      'Gräddö är ett bra alternativ för den utan båt som vill uppleva norra skärgårdens karaktär.',
    ],
    related: ['furusund', 'blido', 'norrora'],
    tags: ['sandstrand', 'lättillgänglig', 'norra', 'bad', 'dagstur'],
    // KÄLLA: Sjöhistoriska museet/DigitaltMuseum — Gräddö båtvarv grundat 1924 av bröderna Eriksson, nedlagt 1965, 54 båtar byggda (2026-08-24)
    did_you_know: 'På Gräddö drev bröderna Eriksson ett träbåtsvarv 1924–1965 som hann bygga ett femtiotal båtar innan det lades ner — i dag lever varvstraditionen vidare i form av båtservice vid hamnen.',
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Gräddö är en stor norrskärgårdsö med karaktär och egna hamnar — bäst besökt utanför peak.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
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
    // KÄLLA: SL buss 637 Norrtälje–Ellans vändplan via Väddö kyrka, Älmsta, Grisslehamn (kund.printhuset-sthlm.se/sl/h637.pdf, 2026); 676 Tekniska högskolan–Norrtälje (läst 2026-09-14). Stod "637 från T-centralen, 2 h" — 637 utgår från Norrtälje.
    getting_there: [
      { method: 'Bil', from: 'Stockholm via E18', time: 'ca 90 min', desc: 'E18 mot Norrtälje, sedan norrut mot Väddö.', icon: '🚗' },
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
    // KÄLLA: Länsstyrelsen Södermanland, naturreservat Askö — bildat 2001, utökat 2007, 5 849 ha varav 624 ha land (läst 2026-09-14)
    tagline: 'Marinbiologisk forskning och naturskönt naturreservat i södra ytterskärgården.',
    description: [
      'Askö ligger i Trosa-skärgården i södra Sörmland (formellt utanför Stockholms län), och är hem för Stockholms universitets marina forskningsstation Askölaboratoriet, en av Sveriges viktigaste forskningsplattformar för Östersjön. Ön är obebodd förutom forskningsstationen.',
      'Askölaboratoriet grundades 1961 och fungerar som bas för forskning kring Östersjöns ekosystem, övergödning, klimateffekter och marin biodiversitet. Sommartid arrangerar Stockholms universitet öppna visningsdagar då allmänheten kan besöka stationen och få guidning av forskarna.',
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
    // KÄLLA: SL buss 839 Handens station–Dalarö (kund.printhuset-sthlm.se/sl/v839.pdf, gäller 2026): Handen–Gålövägen ca 18 min (läst 2026-09-14). Stod "buss 843, 30 min" — fel linje.
    getting_there: [
      { method: 'Bil', from: 'Stockholm', time: 'ca 40 min', desc: 'Väg 73 söderut mot Handen, sedan skylt mot Gålö.', icon: '🚗' },
      { method: 'Buss', from: 'Handens station', time: 'ca 18 min', desc: 'SL-buss 839 (Handen–Dalarö/Smådalarö) till hållplats Gålövägen.', icon: '🚌' },
    ],
    harbors: [
    ],
    restaurants: [
      // KÄLLA: galohavsbad.se/ata — "vår charmiga Bistro", "matbit, fika, smarriga smörgåsar"; skargardsstiftelsen.se/omraden/galo — "Vid Gålö havsbad finns restaurang, café och camping med stugor"
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
    // KÄLLA: Nynäshamns kommun (nynashamn.se/uppleva/skargard--batliv/toro): "Till Tottnäs, Oxnö, Svärdsö och Torö går SL:s buss nummer 852. Resan tar cirka 40 minuter från Nynäshamns station till Ankarudden"; Tottnäsbron; SL buss 852 (kund.printhuset-sthlm.se/sl/v852.pdf, 2026) (läst 2026-09-14).
    getting_there: [
      { method: 'Bil', from: 'Stockholm', time: 'ca 60 min', desc: 'Väg 73 mot Nynäshamn, sedan skylt mot Torö. Ön är landfast via den öppningsbara Tottnäsbron.', icon: '🚗' },
      { method: 'Buss', from: 'Nynäshamns station', time: 'ca 40 min', desc: 'SL-buss 852 Nynäshamn–Torö via Ankarudden.', icon: '🚌' },
    ],
    harbors: [
    ],
    restaurants: [
      // KÄLLA: nynashamn.se/uppleva/skargard--batliv/toro — "Restaurang Sjöboden", sommaröppen vid Ankarudden; sjobodentoro.se — "Restaurang Sjöboden Torö Ankarudden", à la carte
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
    // KÄLLA: Länsstyrelsen Stockholm, naturreservat Fjärdlång — skyddat sedan 1986, förvaltas av Skärgårdsstiftelsen och USF-Ö Fastighet AB (läst 2026-09-14)
    tagline: 'Orört naturreservat i södra ytterskärgården — här åker man hit, inte förbi.',
    description: [
      'Fjärdlång är en större ö i Stockholms södra skärgård öster om Dalarö och Ornö. Ön är skyddad som naturreservat och förvaltas av Skärgårdsstiftelsen, ett tag av Stockholms läns finaste oexploaterade skärgårdsmiljöer med klippkust, blandskog och rikt fågelliv.',
      'På ön finns Fjärdlångs vandrarhem (32 bäddar, öppet maj till mitten av september) och Norrötorpet, en liten 33 m² stuga med ett rum, kök och sovloft, utan el, med vatten från egen pump och utedass plus bastu vid den egna bryggan.',
      'Fjärdlång nås med Waxholmsbåt eller egen båt från Dalarö. Markerade vandringsleder av varierande längd och svårighetsgrad gör ön till en av södra skärgårdens bästa platser för en längre dagsutflykt eller weekend.',
    ],

    facts: {
      travel_time: '1–1,5 h med Waxholmsbåt från Dalarö (linje 19)',
      character: 'Naturreservat, inga permanentbor, orört',
      season: 'Juni–Augusti',
      best_for: 'Seglare, naturälskare, stillhet',
    },
    activities: [
      // KÄLLA: skargardsstiftelsen.se/omraden/fjardlang — "gott om fina naturhamnar i naturreservatet"
      { icon: '⛵', name: 'Naturhamnar', desc: 'Gott om naturhamnar i naturreservatet, enligt Skärgårdsstiftelsen.' },
      { icon: '🚶', name: 'Klippvandring', desc: 'Vandra längs östkusten för dramatiska havsvyer.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Rent klart vatten i ytterskärgårdsläge.' },
    ],
    accommodation: [
      { name: 'Fjärdlångs Vandrarhem', type: 'Vandrarhem', desc: '32 bäddar, öppet maj till mitten av september. Drivs i Skärgårdsstiftelsens regi.' },
      { name: 'Norrötorpet', type: 'Stugor', desc: 'Liten 33 m² stuga utan el — vatten från pump, utedass, bastu vid egen brygga. Ta med egen mat.' },
    ],
    // KÄLLA: Waxholmsbolaget linje 19 (kund.printhuset-sthlm.se/wa/v19.pdf): Dalarö–Fjärdlång ca 1 h 10 min, året runt, flera turer kräver förbeställning (läst 2026-09-14)
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Dalarö', time: '1–1,5 h', desc: 'Reguljär skärgårdslinje under säsong. Kontrollera Waxholmsbolagets tidtabell.', icon: '⛴' },
      { method: 'Egen båt', from: 'Dalarö / Utö', time: '1–2 h', desc: 'Naturhamnar och en liten gästhamn i reservatet.', icon: '⛵' },
    ],
    harbors: [
      // KÄLLA: skargardsstiftelsen.se/omraden/fjardlang — "Det finns en liten gästhamn samt gott om fina naturhamnar i naturreservatet". Ingen service nämnd.
      { name: 'Fjärdlångs gästhamn', desc: 'Liten gästhamn och gott om naturhamnar i naturreservatet. Förvaltas av Skärgårdsstiftelsen.', fuel: false, service: [] },
    ],
    restaurants: [],
    tips: [
      'Boka vandrarhem 2–3 månader i förväg för juli — populärt med 32 bäddar.',
      'Norrötorpet är el-fritt — perfekt för digital detox men kräver planering.',
      'Markerade vandringsleder av olika längd — bra för både dagsutflykt och längre vistelse.',
    ],
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
    // KÄLLA: Trafikverket, Vaxholmsleden (970 m, 6 min, avgiftsfri) och Oxdjupsleden (500 m, 3 min, avgiftsfri) (läst 2026-09-14)
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
    tagline: 'En av norra skärgårdens största öar — bilfärja, cykling och Köpmanholms hamn',
    description: [
      'Yxlan är en av norra skärgårdens största öar, cirka 17 km², och ligger mellan Furusund och Blidö. Köpmanholm vid öns nordspets är öns huvudort, med gästhamn, butiker och restauranger. Waxholmsbolaget angör åtta bryggor på ön: Yxlö, Alsvik, Brokholmen, Duvnäs, Kolsvik, Köpmanholm, Vagnsunda och Yxlövik.',
      'Ön är broförbunden i båda riktningar via Trafikverkets avgiftsfria bilfärjor: Furusundsleden (600 meter, 4 minuter) från Furusund och Blidöleden (530 meter, 4 minuter) över till Blidö. Det gör Yxlan till en av de mest tillgängliga större öarna i norra skärgården.',
      'Yxlan passar för cykelsemester, vandring och båtutflykter med övernattning på land. Köpmanholm är ett bra startläge för seglare som vill utforska Furusunds- och Blidöleden.',
    ],
    facts: { travel_time: '1,5 h med bil + bilfärja från Stockholm', character: 'Stor ö, bilförbunden via färja, Köpmanholm', season: 'Maj–oktober', best_for: 'Cykling, vandring, segling, dagsutflykt' },
    activities: [
      { icon: '🚲', name: 'Cykling', desc: 'Stor ö med bilfärja från Räfsnäs (Norrtälje). Cykla runt från Köpmanholm längs kustvägar — räkna med heldagstur. Bra bas för seglare och naturälskare i norra skärgårdens ytterkanter.' },
      { icon: '🏊', name: 'Klipp- och sandbad', desc: 'Flera badplatser längs kusten, både klippor och mindre sandstränder.' },
      { icon: '⛵', name: 'Hamnliv i Köpmanholm', desc: 'Öns huvudort med gästhamn, restauranger och småbåtsservice.' },
    ],
    accommodation: [{ name: 'Yxlans Vandrarhem', type: 'Vandrarhem', desc: 'Enkelt boende med självhushåll, perfekt för naturälskare.' }],
    // KÄLLA: Trafikverket, Furusundsleden Furusund–Yxlan (Köpmanholm), 600 m, 4 min, avgiftsfri (läst 2026-09-14). Tidigare rader om Waxholmsbolaget ("åtta bryggor", 3–4 h) och Cinderellabåtarna till Köpmanholm gick inte att belägga — borttagna tills linje och tid är kontrollerade.
    getting_there: [
      { method: 'Bil + bilfärja', from: 'Stockholm via Furusund', time: '1,5 h', desc: 'E18 mot Norrtälje, sen väg 276 till Furusund. Furusundsleden (Trafikverkets vägfärja, 600 m, 4 min, avgiftsfri) över till Köpmanholm på Yxlan.', icon: '🚗' },
    ],
    harbors: [{ name: 'Köpmanholms Gästhamn', desc: 'Yxlans huvudhamn vid Köpmanholm — full service.', service: ['El', 'Vatten', 'Dusch'] }],
    restaurants: [{ name: 'Yxlans Café', type: 'Kafé', desc: 'Hemlagad mat och kaffe i lantlig miljö vid hamnen.' }],
    tips: ['Båda bilfärjorna (Furusund-Yxlan och Yxlan-Blidö) är avgiftsfria.', 'Cykla mellan bryggor — varje brygga har sin egen karaktär.', 'Köpmanholm är livligast under hummerveckan i september.'],
    related: ['blido', 'furusund', 'graddo'],
    tags: ['stor ö', 'bilfärja', 'cykling', 'norra', 'köpmanholm'],
    did_you_know: 'Yxlan är broförbunden med både Furusund och Blidö via två avgiftsfria bilfärjor — Furusundsleden (600 m) i väster och Blidöleden (530 m) i öster. Tillsammans gör de Yxlan till en av de mest lättillgängliga större öarna i Roslagens skärgård, trots att den saknar fast brobindelse till fastlandet.',
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli',
      best: 'Juni',
      bestReason: 'Stor norrröslagens ö — cykla och segla i juni när Köpmanholm är öppet men ännu inte fullpackat.',
      months: ['off','off','off','off','open','open','peak','peak','open','limited','off','off'],
    },
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
    // KÄLLA: Waxholmsbolaget linje 19 (kund.printhuset-sthlm.se/wa/v19.pdf): Dalarö–Kymmendö ca 13–17 min, Strömkajen–Kymmendö ca 2 h 45 min–3 h; vissa turer utan fast tid/förbeställning (läst 2026-09-14)
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
    // KÄLLA: Länsstyrelsen Stockholm, Nämdöskärgårdens nationalpark (invigd sept 2025): "Bullerö är nationalparkens entré" (läst 2026-09-14)
    tagline: 'Huvudentré till Nämdöskärgårdens nationalpark — Bruno Liljefors ö',
    description: [
      // KÄLLA: sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark — "Huvudentrén finns på ön Bullerö", bildades 2025 (hämtad 2026-08-19)
      // Uppgifterna bekräftade per telefon med Nämdöskärgårdens nationalpark 2026-08-19.
      'Bullerö är huvudentré till Nämdöskärgårdens nationalpark — Sveriges 31:a nationalpark, invigd 2025 och den första marina nationalparken i Östersjön. Parken omfattar ett tusental öar, kobbar och skär, och 97 procent av ytan är hav.',
      // KÄLLA: samma sida — "När nationalparken bildades år 2025 fanns två naturreservat i området, Bullerö och Långviksskärs naturreservat." Bullerö naturreservat uppgick alltså i nationalparken.
      'Fram till 2025 var ön ett eget naturreservat. I dag ingår Bullerö i nationalparken, som förvaltas av Länsstyrelsen Stockholm. Konstnären Bruno Liljefors (1860–1939), en av Sveriges mest framstående djurmålare, köpte ön 1908 och byggde sin jaktstuga och ateljé här 1909.',
      'Bullerö passar för dagsturer och naturhamnsbesök för seglare och naturälskare som vill se den verkliga ytterskärgården och en del av svensk konsthistoria på samma plats.',
    ],
    facts: { travel_time: '3–4 h med segelbåt från Stavsnäs', character: 'Nationalpark, ytterskärgård, konsthistorisk plats', season: 'Maj–september', best_for: 'Jaktstugan, bastu, fågelskådning, segling' },
    activities: [
      // KÄLLA: sverigesnationalparker.se — Jaktstugan, Bastun på Bullerö ("öppen för alla och går inte att boka"), Brunos slinga (hämtad 2026-08-19)
      { icon: '🎨', name: 'Jaktstugan', desc: 'Bruno Liljefors jaktstuga från 1909 — i dag utställning om nationalparken och livet i Östersjön.' },
      { icon: '🧖', name: 'Bastun på Bullerö', desc: 'Öppen för alla och går inte att boka.' },
      { icon: '🚶', name: 'Brunos slinga', desc: 'Historisk vandringsled i konstnärens fotspår.' },
      { icon: '🦅', name: 'Fågelliv', desc: 'Havsörn, ejder, vigg och olika sjöfågel häckar i området.' },
    ],
    accommodation: [],
    // KÄLLA: bullero.se/sv/turtrafiken/ — "För att komma till Bullerö res med Bullerölinjen" (uppdaterad 2026-02-12, hämtad 2026-08-19)
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
    // KÄLLA: SL buss 434 (kund.printhuset-sthlm.se/sl/v433_434.pdf): Slussen 09.45 → Sollenkroka brygga 10.58; Överby ca 135 min (läst 2026-09-14). "Fast broförbindelse" är inte belagd med namn/år hos Trafikverket — bussen går dock utan färja.
    getting_there: [
      { method: 'Bil', from: 'Stockholm via Värmdö', time: '1 h', desc: 'Väg 222 till Värmdö, vidare över Djurö till Vindö — bussen går hela vägen utan färja.', icon: '🚗' },
      { method: 'Buss', from: 'Slussen', time: 'ca 1 h 15 min', desc: 'SL-buss 434 Slussen–Vindö: ca 73 min till Sollenkroka brygga, betydligt längre till Överby brygga.', icon: '🚌' },
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
    // KÄLLA: smadalarogard.se — sjökaptenen Carl Peter Blom, köp 1802 (Brita Bonde), klart 1810; hotellets egen sida: 110 rum, 2 000 m² spa (2026-08-24)
    did_you_know: 'Smådalarö Gård byggdes 1802–1810 av sjökaptenen Carl Peter Blom efter att han 1802 köpt hela "Tyresö skärgården" från grevinnan Brita Bonde för 12 000 riksdaler. Efter renoveringen 2021 är Gården ett av Sveriges mest påkostade spa-hotell med 110 rum och 2 000 m² spa.',
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
    // KÄLLA: Trafikverket, Skanssundsleden Hörningsnäs–Mörkö, 330 m, 3 min, avgiftsfri (läst 2026-09-14). Broåret 1972 obelagt — borttaget.
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
    // KÄLLA: Trafikverket (Muskötunneln 2 910 m, allmän trafik sedan mars 1964); SL buss 849 Ösmo centrum–Muskö (kund.printhuset-sthlm.se/sl/v849.pdf, gäller 2026), Ösmo–Hyttan ca 35–40 min (läst 2026-09-14)
    getting_there: [
      { method: 'Bil', from: 'Stockholm', time: 'ca 1 h', desc: 'Väg 73 mot Nynäshamn, avfart mot Muskö, genom Muskötunneln (2 910 m, öppen för allmän trafik sedan 1964).', icon: '🚗' },
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
    // KÄLLA: birkavikingastaden.se/how-to-get-here (Strömma, Klara Mälarstrand 2; stopp Nya Kungshatt, Jungfrusund, Vårby, Hovgården/Adelsö; lågsäsong nov–apr stängt) (läst 2026-09-14). Stod "3 h t/r med båt" utan operatör.
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
    // KÄLLA: Trafikverket, Adelsöleden Munsö–Adelsö ca 1 000 m, 6 min, avgiftsfri; birkavikingastaden.se: Strömma stannar vid Hovgården (Adelsö) (läst 2026-09-14). Stod "30 min från Björkö".
    getting_there: [
      { method: 'Bil + bilfärja', from: 'Ekerö via Munsö', time: '6 min överfart', desc: 'Trafikverkets vägfärja Adelsöleden Munsö–Adelsö, ca 1 000 m, avgiftsfri, året runt.', icon: '🚗' },
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
    // KÄLLA: Länsstyrelsen Stockholm, naturreservat Svenska Högarna — reservat sedan 1976, utökat med stort havsområde 2020, Sveriges största marina naturreservat (läst 2026-09-14)
    tagline: 'Norra ytterskärgårdens ostligaste utpost — Heidenstam-fyr och naturreservat',
    description: [
      'Svenska Högarna är en ögrupp i Norrtälje kommun, längst österut i Stockholms ytterskärgård, ca 18 distansminuter rakt öster om Möjas nordspets. Ön nämns redan 1488 i skrifter från Julita kloster, då som kronohamnsfiske där munkar bytte till sig saltad strömming mot avlat.',
      'På Storön byggdes 1855 en träbåk som 1874 ersattes av en järnfyr ritad av Gustaf von Heidenstam, den enda Heidenstam-fyren i Stockholms skärgård. Fyrtornet tillverkades på Ludvigsbergs Verkstad i Stockholm. Fyren automatiserades 1966 och avbemannades 1968.',
      'Området är naturreservat sedan 1976. Ön är inte bebodd permanent men besöks av seglare som söker den yttre skärgårdens orörda klipplandskap.',
    ],
    facts: {
      travel_time: '5–7 h med segelbåt från Möja/Sandhamn',
      character: 'Extrem ytterskärgård, fyrplats, naturreservat',
      season: 'Juni–augusti',
      best_for: 'Erfarna seglare, fågelskådare, fyr-entusiaster',
    },
    activities: [
      { icon: '🗼', name: 'Heidenstam-fyren', desc: 'Stockholms skärgårds enda Heidenstam-fyr (1874). Fortfarande aktiv farledsfyr.' },
      { icon: '🌅', name: 'Öppet hav', desc: 'En av skärgårdens absolut mest exponerade utsiktsplatser — ingenting öster om dig förrän Åland.' },
      { icon: '🐦', name: 'Fågelliv', desc: 'Naturreservat med rikt häckande sjöfågel — silltrut, ejder, tordmule.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Möja/Sandhamn', time: '5–7 h', desc: 'Inga reguljära förbindelser. Kräver erfaren besättning och stabil väderprognos.', icon: '⛵' }],
    harbors: [{ name: 'Svenska Högarnas naturhamn', desc: 'Liten skyddad vik på Storön. Endast i gott väder.' }],
    restaurants: [],
    tips: ['Kontrollera SMHI noggrant — vid sydväst eller ostlig kuling är hamnen svår att lämna.', 'Fulltanka i Sandhamn eller Möja innan avfärd.', 'Naturreservatets regler gäller — respektera fågelhäckningen; perioderna varierar, vanligen någon gång mellan 1 februari och 31 augusti enligt skyltar och föreskrifter.'],
    related: ['sandhamn', 'rodloga', 'huvudskar'],
    tags: ['ytterskärgård', 'heidenstam', 'fyr', 'naturreservat', 'segling'],
    did_you_know: 'Svenska Högarna är den enda platsen i Stockholms skärgård där det står en Heidenstam-fyr — Gustaf von Heidenstams banbrytande öppna järntornkonstruktion (samma typ som Pater Noster utanför Marstrand). Fyren restes 1874 och tillverkades på Ludvigsbergs Verkstad i Stockholm.',
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
      'Ormskär ligger söder om Nämdö i Stockholms mellersta skärgård och ingår tillsammans med Koskären i Nämdöskärgårdens nationalpark, invigd 2025. Ön höjer sig oväntat högt ur havet, namnet kommer av huggormarna som funnits på ön.',
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
    did_you_know: 'Ormskär ingår tillsammans med Koskären i Nämdöskärgårdens nationalpark, invigd 2025. Namnet kommer av att det fanns gott om huggormar på ön.',
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
    tagline: 'Lättillgänglig skärgårdsö med restaurang, vandringsleder och havsbad — en halvtimme med pendelbåt från Ropsten',
    description: [
      'Storholmen är en av Lidingös mest omtyckta skärgårdsöar — bebodd, grön och lättillgänglig med reguljär skärgårdsbåt. Ön ligger i innerskärgården och är ett perfekt alternativ för stockholmare som vill ha äkta skärgårdskänsla utan lång restid.',
      'Ön har en varierad natur med lövskog, klipphällar längs kusterna och välmarkerade vandringsleder. En runda runt ön tar ca 2 timmar. Badplatserna på östra och södra sidan är populära sommartid med klart och skyddat vatten.',
      'Historiskt intressant: ön tillhörde Frösviks gård från 1780-talet och har en lång historia av fiske och kustbruk. Fram till 2011 tillhörde ön Vaxholms kommun — en ovanlig kommungränsändring i Stockholms län.',
    ],
    facts: { travel_time: 'ca 25–30 min med SL:s pendelbåt 80 från Ropsten', character: 'Bebodd ö, grön och lättillgänglig, vandring och bad', season: 'Maj–september', best_for: 'Dagsutflykt, restaurangbesök, vandring, klippbad' },
    activities: [
      { icon: '🚶', name: 'Vandring', desc: 'Markerade stigar runt ön, ca 2 timmar för hela rundan.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Populära badplatser på östra och södra sidan med skyddat vatten.' },
      { icon: '🍽', name: 'Restaurang', desc: 'Säsongsöppen skärgårdsrestaurang — boka bord i förväg i juli.' },
      { icon: '🐦', name: 'Fågelskådning', desc: 'Lövskogen och strandlinjen lockar sjöfåglar och häckande fåglar.' },
    ],
    accommodation: [],
    // KÄLLA: SL pendelbåt linje 80 (kund.printhuset-sthlm.se/sl/h80.pdf, gäller 17 aug–12 dec 2026): Ropsten–Storholmen södra ca 28 min; Lidingö stad (lidingo.se, båtpendla): trafik året runt utom vid is (läst 2026-09-14). Stod "Waxholmsbolaget från Strömkajen/Nybrokajen sommartid, 40 min" — fel avgångsplats och säsong.
    getting_there: [
      { method: 'SL pendelbåt linje 80', from: 'Ropsten', time: 'ca 25–30 min', desc: 'Pendelbåt 80 (Nybroplan–Ropsten) fortsätter Ropsten–Storholmen med bryggorna Storholmen södra, östra och norra. Går året runt utom vid is. Ingår i SL-biljetten.', icon: '⛴' },
      { method: 'Fritidsbåt', from: 'Lidingö eller valfri brygga', desc: 'Nås enkelt med egen båt. Gästbrygga finns vid huvudbryggan.', icon: '⚓' },
    ],
    harbors: [{ name: 'Storholmens brygga', desc: 'Huvudbrygga med plats för gästande båtar.' }],
    restaurants: [
      // KÄLLA: storholmensjokrog.se — "skärgårdsrestaurang på ön Storholmen utanför Lidingö. Njut av nyfångad fisk och klassisk skärgårdsmat vid vattnet", © 2026
      { name: 'Storholmen Sjökrog', type: 'Restaurang', desc: 'Skärgårdsrestaurang på Storholmen utanför Lidingö med nyfångad fisk och klassisk skärgårdsmat vid vattnet.', websiteUrl: 'https://www.storholmensjokrog.se/' },
    ],
    tips: [
      'Ta morgonbåten och hinn med lunch på restaurangen — kvällstider är fullbokade i juli.',
      'Vandringen runt ön tar ca 2 timmar — ta med matsäck och bada halvvägs på södra sidan.',
      'Bra alternativ när Fjäderholmarna är överfulla — kortare restid än Vaxholm, färre turister.',
      'Kontrollera aktuell tidtabell på waxholmsbolaget.se — turtätheten varierar under säsongen.',
    ],
    related: ['vaxholm', 'fjaderholmarna', 'moja'],
    tags: ['bebodd', 'lidingö', 'innerskärgård', 'dagstur', 'restaurang', 'vandring', 'bad'],
    did_you_know: 'Storholmen tillhörde Vaxholms kommun fram till 2011 då ön överfördes till Lidingö stad — en av de få kommungränsändringar i Stockholms skärgård under 2000-talet.',
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
      // fågelskyddsområde med tillträdesförbud 1 mars–15 augusti. Långskär och Långviksskär är TVÅ OLIKA reservat:
      // Länsstyrelsen har separata sidor (Långviksskär: 1983, ~300 öar, 3 897 ha). Naturvårdsverkets skötselplan
      // (978-91-620-7202-5, s. 12) säger att Långviksskärs reservat kvarstår omgivet av nationalparken; om Långskärs
      // reservat formellt uppgått i parken framgår inte av Länsstyrelsens sida — därför "kontrollera" nedan.
      'Långskär är ett naturreservat sedan 1967 med ett femtiotal öar i Bulleröskärgården, Värmdö kommun — 854 hektar, varav bara 33 hektar land. Sedan 2025 omges området av Nämdöskärgårdens nationalpark; kontrollera aktuella föreskrifter innan besök.',
      'Området nås lättast med egen båt. Långskär finns bland de fiskehamnar/fiskeskär som omnämns i historiska källor från 1744. Klippig kust och stilla vatten i lä-läge präglar miljön.',
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
    // KÄLLA: Länsstyrelsen (samma sida) — tillträdesförbud i utpekat fågelskyddsområde 1 mars–15 augusti
    tips: ['Utpekat fågelskyddsområde får inte beträdas 1 mars–15 augusti — se Länsstyrelsens karta.', 'Ta med all proviant och färskvatten.'],
    related: ['bullero', 'norrpada', 'moja'],
    tags: ['naturreservat', 'bulleröskärgården', 'mellersta', 'segling'],
    did_you_know: 'Långskär var en av de fiskehamnar som omnämns i historiska källor från 1744 — ett vittnesbörd om skärgårdsfiskets långa tradition i området.',
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
    // KÄLLA: Länsstyrelsen Stockholm, naturreservat Storskär — södra delen av ön, 8,9 ha, skyddat sedan 1968, förvaltas av Länsstyrelsen; ön ligger i Svartlögafjärden ca 4 km norr om Möja, Österåkers kommun (läst 2026-09-14)
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
      // KÄLLA: hogakusten.com/sv/gasthamn-ulvo-hotell — "Gästhamn Ulvö Hotell", "färskvatten och el", "toaletter, duschar, kök och tvättstuga", "diesel, och bensin"
      { name: 'Gästhamn Ulvö Hotell', desc: 'Gästhamn i Ulvöhamn vid Ulvö Hotell. Färskvatten och el, toaletter, duschar, kök, tvättstuga och bastu. Diesel och bensin.', fuel: true, service: ['el', 'vatten', 'dusch', 'tvätt', 'bränsle'] },
    ],
    restaurants: [
      // KÄLLA: ulvohotell.se/restaurang — "förkärlek till det lokala … twist på redan klassiska rätter", "Surströmmingens mekka", höstmeny 2026; hogakusten.com — "Ulvö Hotell Restaurang"
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
      // KÄLLA: gotland.com/companies/visby-gasthamn — "Platser finns både i inre hamnen, i fiskehamnen samt på norra vågbrytaren … 250 platser … hamndjupet är 3-6 m"; gotland.se listar "Visby gästhamn". Service anges inte av Region Gotland.
      { name: 'Visby Gästhamn', desc: 'Gästhamn i centrala Visby med 250 platser i inre hamnen, fiskehamnen och på norra vågbrytaren. Hamndjup 3–6 m.', fuel: false, service: [] },
      // KÄLLA: gotland.com/companies/klintehamn-gasthamn — 10 gästplatser, djup 1,8–2,5 m; gotland.se (hamnar för fritidsbåt) — "tillgång till toalett, dusch och tvättstuga", "Hamncaféet ligger i anslutning"
      { name: 'Klintehamn Gästhamn', desc: 'Gästhamn på Gotlands västkust med tio gästplatser, hamndjup 1,8–2,5 m. Toalett, dusch och tvättstuga; hamncafé intill.', fuel: false, service: ['dusch', 'tvätt'] },
    ],
    restaurants: [
      // KÄLLA: gotland.com/companies/bakfickan — "en fisk- och skaldjursrestaurang", Stora Torget 1, "Året runt"; bakfickanvisby.se
      { name: 'Bakfickan Visby', type: 'Restaurang', desc: 'Fisk- och skaldjursrestaurang vid Stora Torget i Visby. Lunch och middag. Öppet året runt.', websiteUrl: 'https://www.bakfickanvisby.se/' },
      // KÄLLA: gotland.com/companies/krakas-krog — "Restaurang i gamla bankhuset i Kräklingbo", "Fine dining", "menyn följer … säsongerna"; krakas.se — säsong 2026
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
    tagline: 'Solens och vindarnas ö — UNESCO-alvaret, 400 väderkvarnar och Östersjöns längsta sandstrand.',
    description: [
      'Öland är Sveriges längsta och näst största ö och ett av landets mest omtyckta sommarmål. Den 137 km långa ön förbinds med fastlandet via Ölandsbron från Kalmar — en av Europas längsta broar. Borgholm är den lilla huvudstaden med ett sommarliv i särklass.',
      'Södra Ölands odlingslandskap är UNESCO-världsarv sedan 2000. Det så kallade Alvaret — en unik, kalkstensbaserad stäpp — är en av Europas mest sällsynta naturmiljöer och hem till hundratals växt- och fågelarter. Mer än 400 väderkvarnar ger Öland sin karaktäristiska siluett.',
      'I norr väntar Böda Sand, en av Skandinaviens längsta sandstränder, omgiven av Trollskogen — en vresig bokskog som ger en närmast magisk atmosfär. Eketorps ringborg från järnåldern och Borgholms slottsruin är välbevarade pärlor längs landsvägen.',
    ],
    facts: {
      travel_time: '3,5–4 h med bil från Stockholm (E4 + E22 via Kalmar)',
      character: 'Soligt, öppet, historiskt, naturvård',
      season: 'Maj–September (peak juli–aug)',
      best_for: 'Familjer, naturälskare, historia, cykling, strand',
    },
    activities: [
      { icon: '🌾', name: 'Alvaret', desc: 'Vandra i det UNESCO-listade odlingslandskapet i söder — en unik kalkstäpp med sällsynt flora.' },
      { icon: '🏰', name: 'Borgholms slottsruin', desc: 'En av Skandinaviens största slottsruiner, med utsikt över sundet mot fastlandet.' },
      { icon: '🏖', name: 'Böda Sand', desc: 'Norra Ölands långa sandstrand — ett av Sveriges populäraste badsställen.' },
      { icon: '🌲', name: 'Trollskogen', desc: 'Vresig bokskog på norra spetsen med knöliga, vindpinade träd och en närmast sagolik stämning.' },
      { icon: '⛺', name: 'Eketorps ringborg', desc: 'Rekonstruerad järnåldersby och fornborg från 400-talet. Levande historia för hela familjen.' },
      { icon: '🚲', name: 'Cykling', desc: 'Platt landskap och välskyltad cykelväg längs hela ön. Hyr cykel i Borgholm eller Mörbylånga.' },
    ],
    accommodation: [
      { name: 'Borgholms Stadshotell', type: 'Hotell', desc: 'Klassiskt hotell i centrum av Borgholm med terrass och sommarstämning.' },
      { name: 'Böda Sand Camping', type: 'Camping', desc: 'Stor välskött camping direkt vid stranden i norra Öland. Boka i god tid.' },
      { name: 'Halltorps Gästgiveri', type: 'Hotell', desc: 'Historisk herrgård i ek- och bokskogen nära Borgholm. Stillsamt och naturnära.' },
    ],
    getting_there: [
      { method: 'Bil via Ölandsbron', from: 'Stockholm', time: '3,5 h', desc: 'Kör E4 söderut till Södertälje, sedan E22 via Norrköping och Kalmar. Ölandsbron tar dig direkt in på ön. Kostnads- och tullfri bro.', icon: '🚗' },
      { method: 'Tåg + buss', from: 'Stockholm Central', time: '4–5 h', desc: 'SJ tåg till Kalmar (ca 3 h), sedan buss 101 mot Borgholm via Ölandsbron (45 min).', icon: '🚆' },
      { method: 'Flyg till Kalmar', from: 'Stockholm Arlanda', time: '3 h totalt', desc: 'BRA flyger Stockholm–Kalmar (55 min), sedan hyrbil eller taxi över bron (15 min).', icon: '✈️' },
    ],
    harbors: [
      // KÄLLA: borgholm.se/borgholms-hamn — "Drivs av: Strand Öland", "Duschar: 3", "Tvättstuga: Ja", "Tanka: Diesel och bensin", "Wifi: Ja", "El: Ja" (redigerad 2026-06-29)
      { name: 'Borgholms Gästhamn', desc: 'Gästhamn nedanför Borgholms slott, drivs av Strand Öland. El, vatten, dusch, tvättstuga, wifi och tankning.', fuel: true, service: ['el', 'vatten', 'dusch', 'tvätt', 'wifi', 'bränsle'] },
    ],
    restaurants: [
      // KÄLLA: borgholmsslott.se/slottscafe — "Slottscafé", pannkakor, bullar, kakor och glass. Namnet Källarporten finns inte.
      { name: 'Slottscafé, Borgholms slott', type: 'Café', desc: 'Café i slottsruinen med pannkakor, bullar, kakor och glass.', websiteUrl: 'https://www.borgholmsslott.se/slottscafe/' },
    ],
    tips: [
      'Boka camping och hotell i god tid — Öland är fullbokat i juli och första halvan av augusti.',
      'Kör eller cykla landsvägarna längs östra och västra kusten — vyn över Kalmarsund är fantastisk.',
      'Solliden Palace (kungafamiljens sommarresidens) har öppna trädgårdar — värt ett besök.',
      'Besök Eketorps ringborg med barn — rekonstruktionen är imponerande och pedagogisk.',
    ],
    related: ['gotland', 'ulvon'],
    tags: ['öland', 'alvaret', 'böda sand', 'väderkvarnar', 'borgholm', 'unesco', 'strand', 'historia', 'cykling'],
    insiderTips: [
      'Alvaret blommar som vackrast i juni — orkidéer, backsippa och andra sällsynta arter täcker kalkstenen.',
      'Trollskogen på norra spetsen är allra vackrast i morgondimma eller solnedgång.',
      'Ölandsmarknaden i Borgholm (tidig juli) är en av Sveriges äldsta marknader och ett lokalt evenemang i särklass.',
    ],
    did_you_know: 'Öland har fler soltimmar per år än nästan hela övriga Sverige — och fler än många platser på kontinenten. Klimatet liknar centrala Europa mer än norra Skandinavien.',
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Juni: alvaret blommar med orkidéer och backsippa, stränder är tomma och priser rimliga. September: badbart vatten fortfarande, fullständig lugn och naturen övergår i höstfärger.',
      warning: 'Juli fullbokas tidigt — camping och hotell i Borgholm ska bokas månader i förväg. Ölandsbron kan ha kö på fredag eftermiddag i juli.',
      months: ['off','off','off','limited','open','open','peak','peak','open','limited','off','off'],
    },
  },

  // ── Göteborgs södra skärgård (Styrsöbolaget) ─────────────────────────────

  {
    slug: 'branno',
    name: 'Brännö',
    region: 'goteborg',
    regionLabel: 'Göteborgs södra skärgård',
    emoji: '💃',
    tagline: 'Folkdansön — hambo på bryggan varje fredag och ett genuint Göteborgsliv utanför staden.',
    description: [
      'Brännö är känd i hela Göteborg för en sak: folkdansen på bryggan varje fredag kväll sommartid. Sedan decennier samlas hundratals människor på Brännö Brygga för att dansa hambo och polska i solnedgången — en tradition utan like i Sverige.',
      'Ön är den folkrikaste i södra skärgården utanför Donsö, med ett genuint ösamhälle och en atmosfär som är svår att beskriva utan att ha upplevt den. Ingen bil får köras på ön — transporter sker med moped och kärra.',
      'Brännö nås med Styrsöbolaget från Saltholmen (spårvagn 11 från centrum). Restid ca 30 minuter. En fullständigt annan värld, 8 km från Göteborg.',
    ],
    facts: {
      travel_time: '~20 min till Brännö Rödsten (linje 283) från Saltholmen — spårvagn 11 dit',
      character: 'Autentiskt, folkligt, levande, bilfritt',
      season: 'Maj–September (folkdansen: juni–aug)',
      best_for: 'Göteborgare som vill komma bort, dansintresserade, naturälskare',
    },
    activities: [
      { icon: '💃', name: 'Folkdans på Brännö Brygga', desc: 'Varje fredag kväll i sommar (juni–aug). Hambo, polska och glädje — kom tidigt för att få plats.' },
      { icon: '🏖', name: 'Bad', desc: 'Flera badplatser runt ön. Rävholmen på östra sidan är populärast.' },
      { icon: '🥾', name: 'Vandring', desc: 'Välskyltade stigar runt hela ön. Vacker västkustsnatur med klippor och hedar.' },
      { icon: '⛵', name: 'Gästhamn', desc: 'Välutrustad gästhamn i Rödsten på östra sidan.' },
    ],
    accommodation: [
      { name: 'Brännö Värdshus & Pensionat', type: 'Pensionat', desc: 'Öns enda övernattning — enkelt, genuint och fullt sommartid. Boka långt i förväg.' },
    ],
    getting_there: [
      { method: 'Spårvagn + Styrsöbolaget-färja', from: 'Göteborg C', time: '50 min totalt', desc: 'Spårvagn linje 11 till Saltholmen (25 min), sedan Styrsöbolagets linje 283 till Brännö Rödsten (~20 min). Avgår ofta sommartid.', icon: '🚋' },
      { method: 'Bil + färja', from: 'Göteborg', time: '40 min', desc: 'Kör till Saltholmen (parkering finns), ta färjan. Bilar får ej tas med till ön.', icon: '🚗' },
    ],
    harbors: [
    ],
    restaurants: [
      // KÄLLA: goteborg.com/platser/branno-vardshus-pensionat-baggen — "mitt på den södra ön Brännö", "Mat med inspiration från havet", byggt 1900; brannovardshus.se — säsong 2026
      { name: 'Brännö Värdshus & Pensionat Baggen', type: 'Värdshus', desc: 'Värdshus och pensionat mitt på Brännö, byggt år 1900. Mat med inspiration från havet. Sommaröppet.', websiteUrl: 'https://brannovardshus.se/' },
    ],
    tips: [
      'Folkdansen på fredag kväll är gratis — men kom 30 min tidigt för att få plats vid bryggan.',
      'Inga bilar på ön: lämna bilen i Saltholmens parkeringshus och njut av bilfrihetens lugn.',
      'Ta med picnic — det finns begränsad matservice utanför värdshuset.',
    ],
    related: ['styrso', 'vrango', 'donso', 'asperon'],
    tags: ['göteborg', 'södra skärgård', 'folkdans', 'bilfritt', 'styrsöbolaget', 'västkust'],
    did_you_know: 'Folkdansen på Brännö Brygga startade på 1930-talet och har hållits nästan varje fredag sommartid sedan dess. Det är en av Göteborgs mest omtyckta sommartraditioner.',
    seasonal: {
      open: 'Hela året',
      peak: 'Juli',
      best: 'Maj–Juni eller September',
      bestReason: 'Göteborgsarkipelagen har service året om. Undvik juli — välj juni för bästa möjliga upplevelse med allt öppet.',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },

  },

  {
    slug: 'styrso',
    name: 'Styrsö',
    region: 'goteborg',
    regionLabel: 'Göteborgs södra skärgård',
    emoji: '🌿',
    tagline: 'Göteborgs södra skärgårds hjärta — vacker natur, topprankad restaurang och tyst ölivstempo.',
    description: [
      'Styrsö är den folkrikaste ön i södra skärgården med cirka 1 500 fast bosatta och den naturliga knutpunkten i arkipelagen. Ön har skola, bibliotek, mataffär och samhällsservice — ett komplett ösamhälle utan bilar.',
      // KÄLLA: goteborg.com — "Brattens Wärdshus – vid färjelägret Styrsö Bratten". Tidigare text om "en av Göteborgs mest hyllade" saknade källa och togs bort 2026-09-14.
      'Vid färjeläget Styrsö Bratten ligger Bratten\'s Wärdshus, restaurang och kafé.',
      // Tången är gästhamn/turbåtsbrygga, inte naturreservat — inget reservat på Styrsö hos Länsstyrelsen Västra Götaland eller Göteborgs Stad (sökt 2026-09-14). Ordet borttaget.
      'Styrsö södra spets, Tången, har fri utsikt över Kattegatt. Att sitta där i solnedgången är en av Göteborgstraktens finest.',
    ],
    facts: {
      travel_time: '~15–25 min med Styrsöbolaget från Saltholmen (linje 281/282)',
      character: 'Levande, naturskön, gastronomisk, bilfritt',
      season: 'Hela året (topprestaurang öppen sommarsäsongen)',
      best_for: 'Matälskare, barnfamiljer, de som vill bo kvar i skärgården',
    },
    activities: [
      { icon: '🍽', name: 'Bratten\'s Wärdshus', desc: 'Restaurang och kafé vid färjeläget Bratten.' },
      { icon: '🌿', name: 'Tången', desc: 'Södra spetsen med fri havsutsikt. Vandring genom ljunghed och klippor.' },
      { icon: '🏖', name: 'Bad', desc: 'Badklippor runt hela ön. Brevik på östra sidan populärast.' },
      { icon: '⛵', name: 'Gästhamn', desc: 'Gästhamn i Styrsö Tången med service sommartid.' },
    ],
    accommodation: [
      { name: 'Styrsö Seglora Pensionat', type: 'Pensionat', desc: 'Enkelt och charmigt pensionat med trädgård. Familjedrivet och mysigt.' },
    ],
    getting_there: [
      { method: 'Spårvagn + Styrsöbolaget-färja', from: 'Göteborg C', time: '50–60 min totalt', desc: 'Spårvagn 11 till Saltholmen, sedan Styrsöbolagets linje 281/282/283. Avgångstider på styrsöbolaget.se.', icon: '🚋' },
    ],
    harbors: [
      // KÄLLA: (reservkälla) gasthamnsguide.se/…/styrso-gasthamn — "Styrsö Gästhamn - Sandvikshamnen", "bra tilläggsplats speciellt för lite större båtar", el, färskvatten, dusch, drivmedel. Ingen operatörssida hittad.
      { name: 'Styrsö Gästhamn (Sandvikshamnen)', desc: 'Gästhamn vid Styrsö Tången, lämplig även för större båtar.', fuel: true, service: ['el', 'vatten', 'dusch', 'bränsle'] },
    ],
    restaurants: [
      // KÄLLA: goteborg.com/guider/guide-ata-och-fika-i-goteborgs-skargard — "Brattens Wärdshus – vid färjelägret Styrsö Bratten"; brattenswardshus.se
      { name: 'Bratten\'s Wärdshus', type: 'Restaurang', desc: 'Restaurang och kafé vid färjeläget Styrsö Bratten. Fisk och skaldjur samt pizza och klassiska rätter.', websiteUrl: 'https://www.brattenswardshus.se/' },
    ],
    tips: [
      'Tången kostar inget och är öppet dygnet runt — ta med termos och se solnedgången.',
      'Mataffären på Styrsö håller rimliga tider sommartid — handla proviant för dagen.',
    ],
    related: ['branno', 'vrango', 'donso'],
    tags: ['göteborg', 'södra skärgård', 'restaurang', 'bilfritt', 'styrsöbolaget', 'naturreservat'],
    did_you_know: 'Styrsö har haft fast befolkning sedan medeltiden. Ön var länge ett centrum för fiske och båtbyggeri längs Göteborgs kust.',
    seasonal: {
      open: 'Hela året',
      peak: 'Juli',
      best: 'Maj–Juni eller September',
      bestReason: 'Bilfri klassiker i Göteborgsskärgården med reguljär spårvagnsfärja. Funkar utmärkt utanför högsäsong.',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },

  },

  {
    slug: 'vrango',
    name: 'Vrångö',
    region: 'goteborg',
    regionLabel: 'Göteborgs södra skärgård',
    emoji: '🦅',
    tagline: 'Södra skärgårdens yttersta punkt — naturreservat, vild klippkust och havets ständiga närvaro.',
    description: [
      'Vrångö är den sydligaste bebodda ön i Göteborgs södra skärgård, med knappt 150 fast bosatta året om. Öns södra del är naturreservat och skyddat fågelområde — en vild, orörd klippkust med utsikt rakt ut mot Nordsjön.',
      'Känslan på Vrångö är annorlunda jämfört med Brännö och Styrsö. Lugnet är mer påtagligt, turistströmmen lättare och naturen tar mer plats. Det är hit göteborgare åker när de verkligen vill slita sig från stadens tempo.',
      'Inga bilar. Ingen kommersiell turism att tala om. En liten mataffär, ett kafé och naturens egna ljud.',
    ],
    facts: {
      travel_time: '~35–50 min med Styrsöbolaget från Saltholmen (linje 281, yttersta ön)',
      character: 'Vilt, stilla, natur, ytterst',
      season: 'Maj–September (fågelskydd: undvik klippreservatet under häckningen — datumen står på skyltarna)',
      best_for: 'Naturälskare, fågelskådare, de som söker verkligt lugn',
    },
    activities: [
      { icon: '🦅', name: 'Naturreservat i söder', desc: 'Vild klippkust och rikt fågelliv. Promenadstigen runt sydspetsen ger panoramautsikt mot havet.' },
      { icon: '🏊', name: 'Bad', desc: 'Klippbad på östra och norra sidan. Vattnet är klart och kallt.' },
      { icon: '🚶', name: 'Vandring', desc: 'Välmärkta stigar runt ön — ca 6 km runt hela Vrångö.' },
    ],
    accommodation: [],
    getting_there: [
      { method: 'Spårvagn + Styrsöbolaget-färja', from: 'Göteborg C', time: '70–80 min totalt', desc: 'Spårvagn 11 till Saltholmen, sedan Styrsöbolagets linje 281/283 via Brännö och Styrsö till Vrångö. Kontrollera tidtabell på styrsöbolaget.se.', icon: '🚋' },
    ],
    harbors: [
      // KÄLLA: goteborg.com/platser/vrango — "en stor modern gästhamn med fiskekaj", "tvärs över ön, en knapp kilometer från båtens tilläggsplats", "livsmedelsbutiken Tempo vid hamnen". Service ej belagd (vrangogasthamn.se svarade inte).
      { name: 'Vrångö Gästhamn', desc: 'Stor modern gästhamn med fiskekaj, tvärs över ön från färjeläget. Livsmedelsbutik vid hamnen.', fuel: false, service: [] },
    ],
    restaurants: [
      // KÄLLA: goteborg.com/platser/vrango — namnger "Restaurang Ternan" (vid Mittvik) och "Fiskeboa Vrångö Hamnkrogen Lotsen" (vid hamnen)
      { name: 'Restaurang Ternan', type: 'Restaurang', desc: 'Restaurang vid Mittvik på Vrångö.' },
      { name: 'Fiskeboa Vrångö Hamnkrogen Lotsen', type: 'Restaurang', desc: 'Hamnkrog vid Vrångö hamn.' },
    ],
    tips: [
      'Gå hela vägen till sydspetsen — utsikten mot Nordsjön och de yttre skären är enastående.',
      'Fågelskyddsperioden gäller i reservatets klippzoner — datumen står på skyltarna och i föreskrifterna, vanligen någon gång mellan 1 februari och 31 augusti: håll dig till stigen.',
      'Ta med egen mat — utbudet är mycket begränsat på ön.',
    ],
    related: ['branno', 'styrso', 'asperon'],
    tags: ['göteborg', 'södra skärgård', 'naturreservat', 'bilfritt', 'fågelliv', 'ytterst'],
    did_you_know: 'Vrångö naturreservats klippzoner är klassade som riksintresse för naturvård och hyser häckande skarvar, ejdrar och tärnor.',
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Juni: reservatets fågelskyddsperiod börjar avta, havet är tyst och naturupplevelsen är ostörd. September: klart höstljus, inga turistmassorna och den vilda klippkusten på sitt bästa.',
      warning: 'Fågelskyddsperiod i klippreservatet — datumen står på skyltarna och i länsstyrelsens föreskrifter, vanligen någon gång mellan 1 februari och 31 augusti; håll dig till markerade stigar. Cafét är bara öppet sommartid; ta med egen mat.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },
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
      // KÄLLA: donsohamn.se — "inklusive el, vatten, dusch och toalett", "internet via hamnens wifi", tvättmaskin, "Istappen, sjömack", "Restaurang Isbolaget", säsong 1 maj–30 sept
      { name: 'Donsö Gästhamn', desc: 'Gästhamn i Donsö fiskehamn. El, vatten, dusch, wifi, tvättmaskin och sjömack. Restaurang Isbolaget i hamnen.', fuel: true, service: ['el', 'vatten', 'dusch', 'wifi', 'tvätt', 'bränsle'] },
    ],
    restaurants: [
      // KÄLLA: goteborg.com/platser/isbolaget-donso — "längst ut på piren i Donsö hamn", gammalt ismagasin; isbolaget.com — öppettider v 37–38 2026
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
    tagline: 'Naturreservat i Nynäshamns skärgård — kajakparadis med historiska fiskarspår och klart vatten.',
    lat: 58.895,
    lng: 17.925,
    description: [
      'Yttre Gården är en ö i Nynäshamns skärgård, belägen i Gårdsfjärden precis öster om Bedarön. Ön är ett populärt mål för kajakpaddlare och naturälskare som söker orördhet i den södra skärgårdens yttre delar.',
      'På öns nordöstra sida finns resterna av det historiska fiskarstället Gårdsund, uppfört 1912 och en gång i tiden ett levande arbetsläge för yrkesfiskare som försörjde sig på Gårdsfjärdens rika vatten. Idag vittnar grundmurar och stenfundament om livet som levdes här, ett stycke lokal maritim historia i naturreservatets mitt.',
      // KÄLLA: Naturvårdsverkets objektlista skyddsvärd statlig skog, objekt 3706 Yttre Gården, Nynäshamn 56 ha (läst 2026-08-23). Faktagranskning s.d.: inget bildat naturreservat och inga publicerade förbud hittades hos Länsstyrelsen eller kommunen.
      'Yttre Gården är utpekad av Naturvårdsverket som skyddsvärd statlig skog, men ön är i dag inte ett bildat naturreservat och några särskilda förbud finns inte publicerade. Kontrollera Länsstyrelsens karta över skyddad natur inför besök och visa samma hänsyn som i ett reservat inom reservatets gränser. Däremot är bad tillåtet och ön är fritt tillgänglig för besök under den tid fågelskyddsbestämmelserna tillåter.',
      'Öns östsida döljer en av södra skärgårdens mest ovanliga hemligheter: en stor sandstrand med varmt, grunt vatten. Här kan man gå barfota i sanden och bada bekymmersfritt — långt från turiststråken. Södra sidan bjuder på dramatiska klipphällar och djupare vatten för dem som föredrar att kliva i från kanten. Vattenklarheten i Gårdsfjärden är bland de bästa i södra skärgården.',
      'Yttre Gården nås enklast med kajak eller egen liten motorbåt från Nynäshamns fiskehamn eller från Lövhagen och Segersäng. Det är ingen reguljär båttrafik till ön, vilket bidrar till dess stillhet. Räkna med 30–60 minuters paddling från närmaste kajakhyrning eller startpunkt.',
    ],
    facts: {
      travel_time: '30–60 min med kajak från Nynäshamns fiskehamn',
      character: 'Skyddsvärd, orörd, bilfri, kajak',
      season: 'Maj–September',
      best_for: 'Kajakpaddlare, naturälskare, fågelskådning',
    },
    activities: [
      { icon: '🛶', name: 'Kajakpaddling', desc: 'Yttre Gården är ett av de bästa kajaktutflykterna i Nynäshamns skärgård. Klarvatten, klippor och vindskyddade vikar.' },
      { icon: '🏊', name: 'Bad', desc: 'Bad är tillåtet vid ön. Östra sidan har en stor sandstrand med varmt, grunt vatten som passar utmärkt för barfotabad. Södra sidan bjuder på klipphällar och djupare vatten.' },
      { icon: '🦅', name: 'Fågelskådning', desc: 'Ön och dess omgivningar i Gårdsfjärden är rika på sjöfågel. Havsörn syns regelbundet.' },
      { icon: '🏛', name: 'Gårdsund fiskarläge', desc: 'Besök resterna av det historiska fiskarstället Gårdsund från 1912 på öns nordöstra sida.' },
    ],
    accommodation: [
      { name: 'Tältning (allemansrätten)', type: 'Camping', desc: 'Tältning är tillåtet enligt allemansrätten. Öns klipphällar och platsen nära sandstranden på östsidan fungerar bra för övernattning. Ta med allt eget och lämna inga spår. Kom ihåg att ADF-förbud gäller — ankra inte, dyk inte, fiska inte.' },
    ],
    getting_there: [
      { method: 'Kajak', from: 'Nynäshamns fiskehamn eller Lövhagen', time: '30–60 min', desc: 'Naturligaste sättet att ta sig till ön. Paddla söderut och sedan genom Gårdsund — sundet mellan Yttre Gården och Bedarön — till öns ostliga sida. Kajakhyrning finns i Nynäshamn.', icon: '🛶' },
      { method: 'Egen motorbåt', from: 'Nynäshamns gästhamn', time: '20–30 min', desc: 'Ankring EJ tillåtet inom reservatsgränserna. Lägg upp längs stranden kortvarigt och ro eller paddla iland istället.', icon: '⛵' },
    ],
    harbors: [],
    restaurants: [],
    tips: [
      'Kontrollera Länsstyrelsens karta över skyddad natur före besök — och visa samma hänsyn som i ett reservat.',
      'Ta med all mat och dryck — ingen service finns på ön.',
      'Vill du övernatta? Tältning är tillåtet enligt allemansrätten. Sandstranden på östsidan är en ypperlig plats för tält.',
      'Tidigt morgon eller sen eftermiddag ger bäst ljus och störst chans att se havsörn — två exemplar brukar kretsa över ön.',
      'Planera paddlingen efter väder — passagen genom Gårdsund och det yttre läget kan vara blåsiga.',
    ],
    related: ['landsort', 'nattaro', 'uto'],
    tags: ['skyddsvärd natur', 'kajak', 'södra', 'nynäshamn', 'sandstrand', 'orört'],
    did_you_know: 'Det historiska fiskarstället Gårdsund på Yttre Gårdens nordöstra sida uppfördes 1912. Platsen är ett av skärgårdens välbevarade fiskelämningar och visar hur yrkesfisket i den yttre skärgården bedrevs under tidigt 1900-tal.',
    insiderTips: [
      'Ön saknar brygga och service — kajak är bästa sättet att komma i land. Sjöfågellivet är känsligt, håll avstånd under häckningstid.',
      'Österstrandens sand är ovanlig i södra skärgården — ta av skorna och njut. Stranden är stor och grund, perfekt för barn.',
      'Gårdsund-lämningarna på nordöstra sidan är lätta att missa — sök upp stenfundamenten och grundmurarna nära strandkanten.',
      'Övernattning fungerar utmärkt — tälta på klipphällarna eller nära sandstranden. Ingen el, ingen service — bara stjärnhimmel.',
    ],
    transport_meta: {
      from_city_min: 90,
      from_nearest_hub_min: 40,
      nearest_hub: 'Nynäshamns fiskehamn',
      operator: 'Kajak / Egen båt',
      frequency: 'Ingen reguljär trafik',
    },
    activity_meta: {
      kajak: { difficulty: 'medel', rental: false, notes: 'Kajakhyrning i Nynäshamn, ca 3 km från ön' },
      bad: { beaches: ['Östra sandstranden (stor och grund)', 'Södra klipphällar'] },
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
    tagline: 'Bilfri idyllö nära Vaxholm — klippor, sommarstugor och skärgårdsro.',
    description: [
      'Tynningö är en liten bilfri ö strax nordöst om Vaxholm, perfekt för dem som vill ha skärgårdens lugn utan att åka långt. Ön nås med Waxholmsbolaget och välkomnar besökare med klippor, badskelett och sommarstugornas täta grönska.',
      'Det finns inga affärer, inga restauranger öppna för allmänheten, och absolut ingen stress. Tynningö är skärgården i sin renaste form: komma dit, kliva upp på en klippa och låta timmar bli till timmar.',
    ],
    facts: {
      area: 'ca 3 km²',
      population: 'ca 300 (helårsboende)',
      known_for: 'Bilfritt, nära Vaxholm, klippor och bad',
      season: 'Juni–Augusti',
    
      travel_time: 'ca 1–1,25 h med Waxholmsbåt (linje 83) från Strömkajen; bilfärja från Lagnö',
      character: 'Bilfritt, sommarstugeö',
      best_for: 'Bad, barnfamiljer, skärgårdsro',
    },
    activities: [
      { icon: '🏊', name: 'Klippbad', desc: 'Klara vatten runt hela ön. Hoppklippor och grunda sandvikar på öns södra sida.' },
      { icon: '🚶', name: 'Promenader', desc: 'Välmärkta gångstigar runt ön. Kombinera med ett picknick­stopp vid vattnet.' },
      { icon: '⛵', name: 'Segla till', desc: 'Populärt mål för dagsseglare från Stockholm och Vaxholm. Gott ankrings­läge på öns sydöstra sida.' },
    ],
    accommodation: [
      { name: 'Sommarstugor Tynningö', type: 'Stugor', desc: 'Privata stuguthyrningar via Airbnb och lokala uthyrare. Boka tidigt.' },
    ],
    // KÄLLA: Waxholmsbolaget linje 83 (kund.printhuset-sthlm.se/sl/h83.pdf — senast hämtade version gäller 2024, rutten kontrollerad, tiderna bör dubbelkollas mot 2026); Trafikverket, Tynningöleden Lagnö–Tynningö ca 1 000 m, avgiftsfri (läst 2026-09-14)
    getting_there: [
      { method: 'Waxholmsbolaget linje 83', from: 'Strömkajen via Vaxholm', time: 'ca 1–1,25 h', desc: 'Linje 83 (Strömkajen–Vaxholm–Rindö) angör Norra Tynningö; Vaxholm–Norra Tynningö ca 7–8 min. Kolla aktuell tidtabell på waxholmsbolaget.se.', icon: '⛴' },
      { method: 'Bilfärja', from: 'Lagnö (Värmdö)', time: 'några minuter', desc: 'Trafikverkets vägfärja Tynningöleden Lagnö–Tynningö, ca 1 000 m, avgiftsfri.', icon: '🚗' },
    ],
    transport_meta: {
      from_city_min: 70,
      nearest_hub: 'Vaxholm',
      from_nearest_hub_min: 20,
      operator: 'Waxholmsbolaget',
      frequency: 'Sommartid dagligen, vinter mer sällan',
    },
    harbors: [
    ],
    restaurants: [],
    tips: [
      'Ta med all mat — ingen affär på ön.',
      'Perfekt halvdagsutflykt kombinerat med Vaxholm: ta morgonbåten, bada, ta kvällsbåten tillbaka.',
    ],
    related: ['vaxholm', 'resaro', 'rindo'],
    tags: ['bilfritt', 'bad', 'norra skärgård', 'dagsutflykt', 'familjer'],
    did_you_know: 'Tynningö är en av öarna i det historiska Östersjö­archipelaget nära Vaxholm, en stad som sedan 1600-talet tjänat som Stockholm­s yttre försvarslinje.',
    amenities: { restaurant: false, shop: false, accommodation: true, beach: true, camping: false },
    activity_meta: { bad: { beaches: ['Södra klippbaden', 'Sandvik östra'] } },
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli–Augusti',
      best: 'Juni eller Augusti',
      bestReason: 'Bilfritt, nära Vaxholm och klippbaden är på topp. Perfekt halvdagstur kombinerat med Vaxholm.',
      warning: 'Ingen affär eller restaurang på ön. Ta alltid med mat och dryck.',
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
    // KÄLLA: Värmdö kommun (varmdo.se) — Djurö nås via väg 222 och Djuröbron; Hamnskogen-Eriksbergs
    // naturreservat bildat 2016, ca 35 ha; Djurö hamn i Djurhamn hyrs ut till Kustbevakningen,
    // Storstockholms brandförsvar, Sjöpolisen m.fl. (ingen gästhamn för allmänheten); badplats
    // Vita grindarna, Djurö Havsbad (läst 2026-09-14).
    // KÄLLA: Svenska kyrkan, Djurö-Möja-Nämdö församling — Djurö kyrka invigd 1683, timrad träkyrka,
    // "Kyrkan tillkom under Vasatiden, då Djurhamn var en viktig örlogsbas" (läst 2026-09-14).
    // KÄLLA: SL, tidtabell linje 433/434 — 433 Slussen–Djurö med hållplatser Djuröbron, Djurönäset,
    // Djurö kyrka, Djurö skola (läst 2026-09-14). Restid: transit-stops.ts, uppmätt 2026-08-05.
    // KÄLLA: djuronaset.com — hotell, spa och konferens i Djurhamn, 273 rum, egen gästhamn för hotellgäster.
    tagline: 'Landfast skärgård över Djuröbron — Vasatidens örlogshamn, träkyrka från 1683 och Djurönäset.',
    description: [
      'Djurö ligger i Värmdö kommun och är landfast: väg 222 leder över Djuröbron och vidare mot Stavsnäs. Det gör Djurö till en av få skärgårdsöar där man kommer fram med SL-buss eller bil utan att sätta foten på en färja.',
      'Djurhamn på öns södra del var under Vasatiden en viktig örlogsbas, och det är därför Djurö kyrka byggdes — en timrad träkyrka invigd 1683, i dag skyddad som kyrkligt kulturminne. I Djurhamn ligger också Djurönäset, ett hotell med spa och konferens och egen gästhamn för hotellgästerna.',
      'Naturen finns i Hamnskogen-Eriksberg, ett kommunalt naturreservat från 2016 på ca 35 hektar med vandringsstigar, utsikt över fjärdarna och en anvisad badplats. Kommunens hamn i Djurhamn är ingen gästhamn — den hyrs ut till Kustbevakningen, brandförsvaret och Sjöpolisen.',
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
      // KÄLLA: djuronaset.com/hotell/gasthamn — "Djurönäset Gästhamn Folkparken", "wc, laddström 10A, wi-fi, vatten", ca 25 gästplatser, bokning via dockspot.com
      { name: 'Djurönäset Gästhamn (Folkparken)', desc: 'Hotellets gästhamn i Djurhamn, ca 25 gästplatser, bokas via Dockspot. Vatten, el, wifi och wc.', fuel: false, service: ['el', 'vatten', 'wifi'] },
    ],
    restaurants: [
      // KÄLLA: djuronaset.com/restaurang-bar — "Matsalen" (middag, lunch, brunch), "Sjöboden – Skärgårdskrog öppet sommartid", © 2026
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
      // KÄLLA: birkavikingastaden.se/sevardheter/gasthamnen — "Birkas gästhamn", vatten ja, "Toalett/Dusch: Ja/Ja", el vid platsen nej men "Tillgång till el" mot avgift, bränsle nej (uppdaterad 2026-06-16)
      { name: 'Birkas gästhamn', desc: 'Gästhamn vid Birka Vikingastaden på Björkö. Vatten, toalett och dusch; el mot avgift.', fuel: false, service: ['vatten', 'dusch'] },
    ],
    restaurants: [
      // KÄLLA: birkavikingastaden.se/en/attraction/restaurant-cafe — "Café Eldrimner", "Coffee, ice cream and light lunch", "sandwiches and freshly baked pastries", säsong 22 juni–9 augusti 2026
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
      // KÄLLA: Länsstyrelsen Gotland, naturreservat Lilla Karlsö (sedan 1955, ägs av Naturskyddsföreningen): båt från Klintehamn; landstigning bara vid bryggan på östra sidan; 1 mars–31 aug krävs tillstånd för att vistas på ön (läst 2026-09-14). Arrangör enligt Naturskyddsföreningen Gotland: Gotland Sea Guides.
      { method: 'Guidad tur från Klintehamn', from: 'Klintehamn (Gotland)', time: 'ca 25 min båt', desc: 'Boka tur via Naturskyddsföreningen Gotland (Gotland Sea Guides). Under 1 mars–31 augusti krävs tillstånd för att vistas på ön och landstigning får bara ske vid bryggan — i praktiken går man med guidad tur.', icon: '⛴' },
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
    // KÄLLA: Länsstyrelsen Gotland, Gotska Sandöns nationalpark — bildad 1910, utvidgad 1963 och 1988 (läst 2026-09-14)
    tagline: 'Östersjöns ensliga nationalpark — sanddyner, tallar och absolut avskildhet.',
    description: [
      'Gotska Sandön är en av Sveriges mest avlägsna öar — och en av de mest fascinerande. Nationalparken i öppet Östersjövatten, cirka 37 km norr om Fårö, har inga vägar, inga butiker och ingen fast bebyggelse utöver fyrvaktarbostaden och ett antal stugor.',
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
      // KÄLLA: karlskrona.se (gästhamnar, 2026-02-20) — "Aspö, Lökanabben"; visitkarlskrona.se — "just beside the citadel of Drottningskär", "Shower/wc", 6 gästplatser; aspobatklubb.se — dusch, wifi, tvättmaskin
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
      // KÄLLA: karlskrona.se (gästhamnar) — "Sturkö, Ekenabben", "eluttag på gästbryggan"; visitkarlskrona.se — "Guest harbour/Fishing harbor at Djupasund on the west side of Sturkö to the south of Tjurkö bridge"
      { name: 'Ekenabben gästhamn, Sturkö', desc: 'Kommunal gästhamn och fiskehamn vid Djupasund på Sturkös västra sida, söder om Tjurköbron. El på gästbryggan.', fuel: false, service: ['el'] },
    ],
    restaurants: [
      // KÄLLA: visitblekinge.se/en/sturko-a-picturesque-island — "Kvarnmagasinet" (pizza i kvarntornet); visitkarlskrona.se/en/sturko-kvarncafe-kvarnmagasinets-pizzeria
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
    // KÄLLA: sverigesnationalparker.se + Länsstyrelsen Kalmar — Blå Jungfrun nationalpark sedan 1926 (läst 2026-09-14)
    tagline: 'Förtrollad nationalpark i Kalmarsund — häxor, labyrinter och urberg.',
    description: [
      'Blå Jungfrun är en av Sveriges märkligaste platser — en rund granitö mitt i Kalmarsund som i folklig tradition ansågs vara samlings­platsen för svenska häxor varje Skärtorsdag (Blåkulla-legenden). I verkligheten är ön ett geologiskt unikum: en rundad granitklump formad av inlandsisen med stenlabyrinten Trollebo som dess mest kända inslag.',
      'Ön är nationalpark sedan 1926 och kan endast besökas med dagstur­båt från Oskarshamn eller Byxelkrok på Öland. Övernattning är inte tillåten. Varje besök är ett kortare men djupt minnesvärt möte med urbergets Sverige.',
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
      // KÄLLA: mittharnosand.se (Härnösands kommun) — "Hultoms brygga … northern Hemsön … a jetty … a toilet and sauna". Ingen "Hemsö Gästhamn" hos kommunen.
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
    tagline: 'Bergmans ö — raukar, vild natur och Östersjöns tystnad.',
    description: [
      'Fårö är Gotlands nordligaste utpost — och en av Sveriges mest mytomspunna öar. Ingmar Bergman anlände hit 1960 när han sökte inspelningsplats för Såsom i en spegel, och kom aldrig riktigt tillbaka. Han bodde kvar till sin död 2007.',
      'Landskapet är radikalt annorlunda än resten av Gotland: vindpinade tallar, öppen hed och kalkstensraukar som reser sig längs stränderna som skulpterade pelarhallar. Fårö är inte en ö man passerar — den är ett resmål i sig.',
      'Via den kostnadsfria färjan från Fårösund är Fårö lätt att nå med bil. Men ön belönar dem som stannar. Sudersandstranden, rauk-vandringarna vid Langhammars och den tidlösa stämningen i fiskelägena är svåra att kombinera på ett och samma dagsutflyktsstopp.',
    ],
    facts: {
      area: '113 km²',
      population: 'ca 550 (helårsboende)',
      known_for: 'Raukar, Ingmar Bergman, Sudersandstranden',
      season: 'Maj–September',
    
      travel_time: 'ca 5 tim',
      character: 'Raukar, Bergman, Östersjö',
      best_for: 'Kulturturister, cyklister, badare',
    },
    activities: [
      { icon: '🪨', name: 'Langhammars raukar', desc: 'Fårös och Gotlands mest imponerande raukfält. Kalkstens­pelarema står tätt och höga längs den svept­öppna nordvästkusten. Bäst i morgon- eller kvällsljus.' },
      { icon: '🏖', name: 'Sudersandstranden', desc: 'Fårös populäraste strand — lång, ljus sand och Östersjöns klara vatten. Strandbar och café sommartid.' },
      { icon: '🎬', name: 'Bergmancentret', desc: 'Utställning om Ingmar Bergmans liv och arv, med fokus på åren på Fårö. Guidade turer till Hammars (hans sista hem) sommartid — boka i förväg.' },
      { icon: '🚲', name: 'Cykla Fårö', desc: 'Platt terräng och lite trafik gör ön idealisk för cykling. Runtur ca 40 km — Sudersand, Langhammars, Gamla Hamn och tillbaka.' },
      { icon: '⛵', name: 'Gamla Hamn', desc: 'Fårös gamla fiskehamn på nordostsidan. Ovanliga raukformer, praktiskt taget inga turister. Stämningsfull tidvattens­basin vid lågvatten.' },
    ],
    accommodation: [
      { name: 'Fårö Sudersand Resort', type: 'Hotell/Camping', desc: 'Strandnära anläggning med hotellrum, stugor och camping. Boka månader i förväg till juli.' },
      { name: 'Fårö Bed & Breakfast', type: 'B&B', desc: 'Enklare och charmigare alternativ i gammal gårds­miljö. Perfekt för par.' },
      { name: 'Stuguthyrning Fårö', type: 'Stugor', desc: 'Privata stugor via Airbnb och Blocket. Stor variation — boka senast mars för midsommar–juli.' },
    ],
    getting_there: [
      { method: 'Gratis färja Fårösund–Broa', from: 'Fårösund (Gotland)', time: '5 min', desc: 'Färjan går dygnet runt och kostar ingenting. Kör till Fårösund via Gotlands vägnät, ca 80 km från Visby. Köbildning väntas i juli.', icon: '⛴' },
      { method: 'Destination Gotland + hyrbil', from: 'Nynäshamn eller Oskarshamn', time: '3–3,5 h + bil', desc: 'Färja till Visby, hyr bil och kör norrut. Boka bil­platsen på färjan minst 2–3 månader i förväg under högsäsong.', icon: '🚢' },
      { method: 'Flyg + hyrbil', from: 'Stockholm Arlanda / Bromma', time: '55 min flyg + 90 min bil', desc: 'BRA och SAS flyger dagligen till Visby. Hyr bil på flygplatsen och kör till Fårösund.', icon: '✈️' },
    ],
    transport_meta: {
      from_city_min: 300,
      nearest_hub: 'Visby / Fårösund',
      from_nearest_hub_min: 5,
      operator: 'Gratis bilfärja (Region Gotland)',
      frequency: 'Dygnet runt, tät trafik',
    },
    harbors: [
    ],
    restaurants: [
      // KÄLLA: gotland.com/companies/faro-strandcafe — "frukost, lunch, afterbeach och middag … Pizza, pasta, sallad, smårätter samt … kött & fiskrätter", säsong 2026; farostrandcafe.se — "Vid Sudersand resort"
      { name: 'Fårö Strandcafé', type: 'Restaurang/Bar', desc: 'Restaurang och bar vid Sudersand Resort. Frukost, lunch, afterbeach och middag; pizza, pasta, kött och fisk.', websiteUrl: 'https://farostrandcafe.se/' },
      // KÄLLA: verktygsladan.gotland.com/companies/broa-kiosken-faro — "Broa Kiosken Fårö", "glass, take away-kaffe, kylda drycker, snabbmat"
      { name: 'Broa Kiosken Fårö', type: 'Café/Kiosk', desc: 'Kiosk och café vid färjeläget i Broa. Glass, kaffe, kylda drycker och snabbmat.', websiteUrl: 'https://verktygsladan.gotland.com/companies/broa-kiosken-faro/' },
    ],
    tips: [
      'Boka boende senast mars om du åker midsommar–juli. Fårö är litet och fyllbokat.',
      'Langhammars är bäst i tidigt morgon- eller kvällsljus — turist­bubblan på eftermiddagen är påtaglig.',
      'Guidad tur till Hammars (Bergmans hem) via Bergmancentret — boka online, begränsat antal platser.',
      'Ta gärna en dag extra och cykla hela ön. Det är Fårös rätta tempo.',
    ],
    related: ['gotland', 'ulvon', 'arholma'],
    tags: ['natur', 'kultur', 'strand', 'cykling', 'romantisk', 'historia', 'raukar'],
    insiderTips: [
      'De flesta besökare stannar vid Sudersand och Langhammars. Ge dig istället till Gamla Hamn på nordostsidan — ovanliga raukformer och nästan inga turister ens i juli.',
      'Fårö-dokumentären (Bergman, 1969) och Fårö-dokument 1979 finns på streaming — titta innan du åker för att förstå varför ön fastnar i en.',
    ],
    dog_friendly: true,
    dog_notes: 'Hund tillåten på de flesta platser. Undvikt Sudersandstrandens badbälte under badsäsongen (15/6–15/8).',
    did_you_know: 'Ingmar Bergman hittade Fårö 1960 när han sökte inspelnings­plats för Såsom i en spegel. Han köpte sin första tomt 1966, byggde ut gården Hammars och bodde kvar till sin död 2007 — varefter han begravdes på Fårö kyrka­gård.',
    amenities: {
      restaurant: true,
      shop: true,
      accommodation: true,
      beach: true,
      camping: true,
    },
    activity_meta: {
      cykel: { rental: true, notes: 'Cykelhyrning via Sudersand Resort och i Fårösund.' },
      bad: { beaches: ['Sudersandstranden', 'Ekeviken', 'Norsta Auren'] },
    },
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Bergmans ö är vacker hela säsongen. I juni är Sudersandsstranden tom och vindskärmarna tillgängliga. September: havstemperaturen håller och Bergman Center har höst-event.',
      warning: 'Boende i juli svårt att hitta — boka månader i förväg. Fårösund-färjan har begränsad kapacitet högsäsong.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
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
      // KÄLLA: hogakusten.com/en/trysunda-guest-harbour — "Trysunda guest harbour", "Hamndjup: 3-7 m", bastu/dusch/toalett, bojförtöjning ca 25 platser
      { name: 'Trysunda gästhamn', desc: 'Gästhamn i fiskeläget med bojförtöjning, ca 25 platser. Bastu, dusch och toalett. Hamndjup 3–7 m.', fuel: false, service: ['dusch'] },
    ],
    restaurants: [
      // KÄLLA: hogakusten.com/en/trysunda-vandrarhem-skargardscafe — "homemade refreshments (fika) and meals, and a small grocery store"
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
      population: 'Litet antal bofasta (fiskeläge sedan 1830-talet)',
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
      // KÄLLA: hano.nu/hamnen — "drivs av Hanö Hamn- och Byalag … Servicebyggnad med bastu, duschar, toaletter och tvättmaskin … Ingen försäljning av bensin eller diesel … Gästplatser: 75"; visitblekinge.se — vatten, el, wifi
      { name: 'Hanö gästhamn', desc: 'Gästhamn med 75 gästplatser, drivs av Hanö Hamn- och Byalag. Bastu, dusch, toalett, tvättmaskin och wifi. Inget drivmedel.', fuel: false, service: ['el', 'vatten', 'dusch', 'tvätt', 'wifi'] },
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
    // KÄLLA: Waxholmsbolaget linje 26 (kund.printhuset-sthlm.se/wa/v26.pdf): Svartlöga är näst sista bryggan före Rödlöga, ca 3,5–4 h från Strömkajen (läst 2026-09-14)
    getting_there: [
      { method: 'Waxholmsbolaget', from: 'Stockholm (Strömkajen)', time: 'ca 4 tim', desc: 'Waxholmsbolagets linje 26 via norra skärgårdens öar; Svartlöga ligger ett stopp före Rödlöga. Kolla aktuell tidtabell på waxholmsbolaget.se — avgångarna är sällsynta.', icon: '⛴' },
      { method: 'Privat båt', from: 'Furusund / Norrtälje', time: 'ca 45–60 min', desc: 'Från Furusund eller Norrtälje är det kortare båtväg. Det naturliga sättet att besöka ön om du har tillgång till båt.', icon: '⛵' },
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
      'Vättern är en näringsfattig klarvattensjö med siktdjup på hela 15–16 meter, och vattnet runt Visingsö är kristallklart. Bad och fiske hör sommaren till.',
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
      // KÄLLA: jonkoping.se (båtplatser, hamnar och gästhamnar) — "Gästhamn på Visingsö … Färskvatten, Toalett, Dusch, Eluttag, Latrintömning … Från 0,6 m till 1 m"; jkpg.com/gasthamnar — "nedanför Visingsborgs slottsruin"
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
    // KÄLLA: Länsstyrelsen Blekinge, naturreservat Tjärö — skyddat 1976, förvaltas av Länsstyrelsen (läst 2026-09-14)
    tagline: 'Blekinges naturreservat med sandstränder — camping och urskogar vid Östersjön.',
    description: [
      // KÄLLA: Länsstyrelsen Blekinge, besöksmål naturreservat/Tjärö (läst 2026-08-23)
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
      // KÄLLA: visitblekinge.se/gasthamn-tjaro — "Cirka 70 stycken båtplatser totalt … Maren vid restaurangen … Seglarbryggan", el och vatten vid gästplatser
      { name: 'Gästhamn Tjärö', desc: 'Gästhamn med ca 70 platser vid två bryggor: Maren vid restaurangen och Seglarbryggan. El och vatten vid gästplatserna.', fuel: false, service: ['el', 'vatten'] },
    ],
    restaurants: [
      // KÄLLA: visitblekinge.se/en/tjaro-cafe — "Tjärö Cafe"; tjaro.com/restaurant-cafe — "sandwiches, salads, Tjärös räksmörgås, Tjärö waffle, soft ice cream", säsong 2026
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
      // KÄLLA: Länsstyrelsen Blekinge, naturreservat Tjärö (1976)
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
      // KÄLLA: ockerohamn.se/gasthamn-o-camping — "sydvästra delen av fiskehamnen", "moderna duschar och toaletter … inkluderat", "Trådlös bredbandsuppkoppling", diesel, tvättmaskiner, öppen 30 april–30 september
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
      // KÄLLA: vastsverige.com/visitockero/produkter/gasthamn-roro (Öckerö kommun) — "vid farleden Göteborg och Marstrand … Serviceanläggning och spolplatta och septitankstömning". Drivmedel nämns inte av kommunen.
      { name: 'Rörö gästhamn', desc: 'Gästhamn vid farleden Göteborg–Marstrand. Serviceanläggning, spolplatta och septitankstömning.', fuel: false, service: [] },
    ],
    restaurants: [
      // KÄLLA: goteborg.com/platser/roro — "Rörö Fiskeboa & Krog … rätter med tydlig förankring i havet"; rorofiskeboakrog.se — "nykokta kräftor, räkor och fisk", "fish & chips"
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
      // KÄLLA: Länsstyrelsen Västerbotten, naturreservat Holmöarna — bildat 1980 och 1995, ca 25 000 ha (läst 2026-09-14)
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
      // KÄLLA: holmon.se/hamnforeningen/gasthamn — "Gästhamn … Byviken … Hamnföreningen Byviken Holmön Ekonomisk förening … boj-förtöjning … en flytbrygga"
      { name: 'Byvikens gästhamn', desc: 'Gästhamn i Byviken, drivs av Hamnföreningen Byviken Holmön. Bojförtöjning och flytbrygga.', fuel: false, service: [] },
    ],
    restaurants: [
      // KÄLLA: visitumea.se/en/novas-holmon — "Novas Holmön … directly adjacent to where the ferry docks … BBQ, meat, fish, seafood and vegetarian food"
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
