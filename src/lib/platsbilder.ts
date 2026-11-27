/**
 * Foton på enskilda ställen och på öns vägar, för ösidorna (förhandsvisning, Max 2026-11-27).
 *
 * Bara fria licenser från Wikimedia Commons (CC0, PD, CC BY, CC BY-SA) och bara bilder där filbeskrivningen
 * eller kategorin säger att bilden visar just det stället. Kontrollerade 2026-11-27.
 * Avvisade: skyltar, anslagstavlor och affischer (STF Möja vandrarhem.jpg, Champagne Club, Utö bykrog,
 * Utö tältplats skylt) och bilder med osäkert motiv (Bakgården Utö, Bryggans café).
 * Saknas fritt foto: Hamncafét (Möja). Kortet visar då en målad illustration.
 *
 * Nyckel: öns slug och ställets namn exakt som i island-data.
 */
export type Platsbild = { fil: string; fotograf: string; licens: string }

export const PLATSBILDER: Record<string, Record<string, Platsbild>> = {
  moja: {
    // Kategori "Möja värdshus" (Commons, läst 2026-11-27)
    'Möja Värdshus & Bageri': { fil: 'Möja Värdshus 20260717 88.jpg', fotograf: 'Salgo60', licens: 'CC0' },
    // Kategori "Möja hamnbar"
    'Hamnbaren': { fil: 'Hamnbaren Möja 20260717 121.jpg', fotograf: 'Salgo60', licens: 'CC0' },
    // Kategori "Les Poissonniers"
    'Les Poissonniers de Möja': { fil: 'Les Poissonniers de Möja 20260717 94.jpg', fotograf: 'Salgo60', licens: 'CC0' },
    // Kategori "Jeppes Gästgiveri"
    'Jeppes': { fil: 'Jeppes gästgiveri Möja 20260717 40.jpg', fotograf: 'Salgo60', licens: 'CC0' },
    // Kategori "STF Möja vandrarhem", beskrivning "SAT Möja vandring 2025 april STF vandrarhem"
    'STF Möja Vandrarhem': { fil: 'SAT Möja vandring 2025 april 09 STF vandrarhem.jpg', fotograf: 'Salgo60', licens: 'CC0' },
    // Kategori "Roland Svensson Museet", signaturen syns på fasaden
    'Roland Svensson-museet': { fil: 'SAT Möja 2025 vandring april 08 Roland Svensson museum.jpg', fotograf: 'Salgo60', licens: 'CC0' },
    // Kategori "Möja kyrka", beskrivning "Möja kyrka (Berg 11:1)"
    'Möja kyrka': { fil: 'Möja kyrka - 2014-03-22 - 03.JPG', fotograf: 'Axel Pettersson', licens: 'CC BY-SA 3.0' },
    // Kategori "Möja dansbana"
    'Möja dansbana': { fil: 'Möja dansbana 20260717 87.jpg', fotograf: 'Salgo60', licens: 'CC0' },
    // Kategori "Möja Outdoor": boden med kajaker och SUP-brädor
    'Kajak & SUP': { fil: 'SAT Möja 20260717 106.jpg', fotograf: 'Salgo60', licens: 'CC0' },
    // Kategori "SAT Möja", beskrivning "Möja mot Hamn SAT Möja"
    'Vandring': { fil: 'Möja mot Hamn SAT.jpg', fotograf: 'Salgo60', licens: 'CC0' },
  },
  sandhamn: {
    // Kategori "Sandhamns hotell"
    'Sandhamn Seglarhotell': { fil: 'Sandhamn Seglarhotellet.jpg', fotograf: 'Salgo60', licens: 'CC0' },
    'Segelsalen, Sandhamn Seglarhotell': { fil: 'Sandhamn Seglarhotellet.jpg', fotograf: 'Salgo60', licens: 'CC0' },
    // "Sandhamn värdshus is a historic restaurant and small hotel in Sandhamn"
    'Sandhamns Värdshus': { fil: 'Sandhamn värdshus December 2025 01.jpg', fotograf: 'Arild Vågen', licens: 'CC BY-SA 4.0' },
    // Kategori "Dykarbaren Sandhamn"
    'Dykarbaren': { fil: 'Dykarbaren Sandhamn 2025 juli.jpg', fotograf: 'Salgo60', licens: 'CC0' },
    // "Small bakery in Sandhamn", kategori "Sandhamns bageri"
    'Sandhamnsbageriet': { fil: 'Sandhamns bageri June 2025 01.jpg', fotograf: 'Arild Vågen', licens: 'CC BY-SA 4.0' },
    // Kategori "Sands hotel, Sandhamn"
    'Sands Hotell': { fil: 'Sands Hotell 202508 01.jpg', fotograf: 'Salgo60', licens: 'CC0' },
  },
  uto: {
    // Kategori "Utö Värdshus"
    'Utö Värdshus': { fil: 'Utö värdshus July 2024 01.jpg', fotograf: 'Arild Vågen', licens: 'CC BY-SA 4.0' },
    // Kategori "Seglarbaren, Utö"
    'Seglarbaren': { fil: 'Utö gruvbyn Seglarbaren 20260709 02.jpg', fotograf: 'Salgo60', licens: 'CC0' },
    // Kategori "Utö hamnboden"
    'Hamnboden': { fil: 'Utö gruvbyn Hamnboden 20260709 15.jpg', fotograf: 'Salgo60', licens: 'CC0' },
    // Kategori "Utö Värdshus vandrarhem"
    'Utö Vandrarhem Skärgården': { fil: 'SAT Utö 2025 maj vandrarhemmet.jpg', fotograf: 'Salgo60', licens: 'CC0' },
  },
}

/**
 * Bilder till vägkorten "Vad vill du göra?" (förslag E). Varje bild är tagen på just den ön.
 * Möja först, som mall. Övriga öar visar målade illustrationer tills bilder är granskade.
 */
export const VAGBILDER: Record<string, Record<string, Platsbild>> = {
  moja: {
    // "The archipelago ship Holly in Berg, Möja."
    dag: { fil: 'Holly Möja June 2020 02.jpg', fotograf: 'Arild Vågen', licens: 'CC BY-SA 4.0' },
    // Beskrivning "STF Möja vandrarhem 20260717"
    bo: { fil: 'STF Möja vandrarhem 20260717 111.jpg', fotograf: 'Salgo60', licens: 'CC0' },
    // Kategori "Ramsmora guestharbor"
    bat: { fil: 'Möja D81 1405 (36347350812).jpg', fotograf: 'Bengt Nyman', licens: 'CC BY 2.0' },
    // Beskrivning "SAT Möja Långviks badplats 20260717"
    barn: { fil: 'SAT Möja Långviks badplats 20260717 02.jpg', fotograf: 'Salgo60', licens: 'CC0' },
    // "Small road in Ramsmora, Möja"
    aktiv: { fil: 'Small road in Ramsmora, Möja - panoramio.jpg', fotograf: 'Mats Sjödin', licens: 'CC BY 3.0' },
    // "Långvik is not only a town on Möja"
    bor: { fil: 'Långvik, Möja.jpg', fotograf: 'Johan Fredriksson', licens: 'CC BY-SA 3.0' },
    // "Utsiktspunkt mot Möja Strömma", kategori "Möjaström Viewpoint"
    visa: { fil: 'Utsiktspunkt Möja Strömma 2.jpg', fotograf: 'Salgo60', licens: 'CC0' },
  },
}

type Url = { url: string; fotograf: string; licens: string }
function tillUrl(b: Platsbild, bredd: number): Url {
  return { url: 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(b.fil) + '?width=' + bredd, fotograf: b.fotograf, licens: b.licens }
}

/** Miniatyr via Commons Special:FilePath (följer omdirigering till rätt fil). */
export function platsbild(slug: string, namn: string): Url | undefined {
  const b = PLATSBILDER[slug]?.[namn]
  return b ? tillUrl(b, 960) : undefined
}

export function vagbild(slug: string, vag: string): Url | undefined {
  const b = VAGBILDER[slug]?.[vag]
  return b ? tillUrl(b, 960) : undefined
}
