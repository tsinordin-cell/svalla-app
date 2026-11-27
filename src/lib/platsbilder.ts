/**
 * Foton på enskilda krogar och boenden, för mosaikerna på ösidorna (förhandsvisning, Max 2026-11-27).
 *
 * Bara fria licenser från Wikimedia Commons (CC0, CC BY, CC BY-SA) och bara bilder där filbeskrivningen
 * eller kategorin säger att bilden visar just det stället. Varje bild är granskad med ögonen 2026-11-27.
 * Avvisade: skyltar, anslagstavlor och affischer (STF Möja vandrarhem, Champagne Club, Utö bykrog,
 * Utö tältplats) och bilder med osäkert motiv (Bakgården Utö, Bryggans café).
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

/** Miniatyr via Commons Special:FilePath (följer omdirigering till rätt fil). */
export function platsbild(slug: string, namn: string): { url: string; fotograf: string; licens: string } | undefined {
  const b = PLATSBILDER[slug]?.[namn]
  if (!b) return undefined
  return { url: 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(b.fil) + '?width=960', fotograf: b.fotograf, licens: b.licens }
}
