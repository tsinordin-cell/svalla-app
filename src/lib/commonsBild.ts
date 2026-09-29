/**
 * Wikimedia Commons-miniatyrer i rätt storlek.
 *
 * obilder.generated.ts pekar på 1280 px breda miniatyrer. /oar visade dem i
 * 64×48-rutor: MÄTT 2026-09-21 ca 400 kB per bild (Grinda 397 814 byte) för en
 * ruta som behöver ca 20 kB — för 85 öar i storleksordningen 30 MB vid full
 * scroll. Commons levererar standardsteg (120, 250, 330, 500, 960, 1280 …);
 * här väljs steget via URL:en. Bilder som inte är miniatyrer (originalet är
 * mindre än 1280 px) lämnas orörda.
 */
export function commonsThumb(url: string, bredd: 120 | 250 | 330 | 500 | 960 | 1280): string {
  return url.replace(/\/\d+px-([^/]+)$/, `/${bredd}px-$1`)
}
