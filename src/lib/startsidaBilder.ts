/**
 * Bilder till startsidans kort (data-lp-photo i LandingPageClient).
 *
 * Google Places svarar 403 sedan september (se page.tsx), så i praktiken är
 * det de här två listorna som ger startsidan dess bilder. Regeln för båda:
 * motivet ska vara det kortet lovar. Hellre ingen bild än fel bild — men
 * hellre rätt bild än ingen, och testet startsidaBilder.test.ts larmar om
 * ett kort står utan källa.
 */
import type { Bildkalla } from '@/app/LandingPageClient'

// Kortnyckel → ö i OBILDER (ett foto per ö, valt via Wikidata). Bara där
// motivet faktiskt är platsen kortet handlar om.
export const COMMONS_FOR_KORT: Record<string, { slug: string; namn: string }> = {
  grinda: { slug: 'grinda', namn: 'Grinda' },
  sandhamn: { slug: 'sandhamn', namn: 'Sandhamn' },
  uto: { slug: 'uto', namn: 'Utö' },
  fjaderholmarna: { slug: 'fjaderholmarna', namn: 'Fjäderholmarna' },
  mellersta: { slug: 'moja', namn: 'Möja' },
  norra: { slug: 'arholma', namn: 'Arholma' },
  sodra: { slug: 'orno', namn: 'Ornö' },
  bohuslan: { slug: 'smogen', namn: 'Smögen' },
  gotland: { slug: 'gotland', namn: 'Gotland' },
  oland: { slug: 'oland', namn: 'Öland' },
  blekinge: { slug: 'hano', namn: 'Hanö' },
  vasterhav: { slug: 'kosterhavet', namn: 'Kosterhavet' },
  hogakusten: { slug: 'ulvon', namn: 'Ulvön' },
}

/**
 * Handplockade Commons-foton för kort där ö-bilden saknas eller inte passar.
 * Går FÖRE både Google och OBILDER. Varje bild är granskad i kortets egen
 * beskärning (background-size: cover, centrerad) på mobil och dator.
 */
export const HANDPLOCKADE: Record<string, Bildkalla & { url: string }> = {
  // Guidekort "Badplatser i Stockholms skärgård – sandstränder och klippbad".
  // Guiden nämner Trouville på Sandhamn; bilden visar sandstranden och
  // klipporna där. Vald 2026-10-27.
  badplatser: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f2/Trouville_May_2026_01.jpg/960px-Trouville_May_2026_01.jpg',
    namn: 'Trouville, Sandhamn',
    fotograf: 'ArildV',
    licens: 'CC BY-SA 4.0',
    licensUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    kalla: 'https://commons.wikimedia.org/wiki/File:Trouville_May_2026_01.jpg',
  },
  // Guidekort "Kajak i Stockholms skärgård – guide för nybörjare". Havskajak
  // uppdragen på stranden vid Sveriges holme. Vald 2026-10-27. (Bättre
  // paddlingsbild från Brofjorden valdes bort: Bohuslän, fel region.)
  kajak: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/Sveriges_holme%2C_2017-09-30%2C_06.jpg/960px-Sveriges_holme%2C_2017-09-30%2C_06.jpg',
    namn: 'Kajak vid Sveriges holme',
    fotograf: 'Axel Pettersson',
    licens: 'CC BY-SA 4.0',
    licensUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    kalla: 'https://commons.wikimedia.org/wiki/File:Sveriges_holme,_2017-09-30,_06.jpg',
  },
  // Regionkort "Åland – Mariehamn · ytterskärgård · Föglö" och galleriet
  // "Åland – Finland · Östersjön · Mariehamn". Fyrmastbarken Pommern i
  // Mariehamns Västerhamn, augusti 2019. Valdes framför en kvällsbild med
  // Pommern och Viking Line-färjan: den blev för mörk bredvid grannkorten.
  aland: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Pommern%2C_%C3%85land_Maritime_Museum%2C_2019_%2812%29.jpg/960px-Pommern%2C_%C3%85land_Maritime_Museum%2C_2019_%2812%29.jpg',
    namn: 'Pommern, Mariehamn',
    fotograf: 'Bahnfrend',
    licens: 'CC BY-SA 4.0',
    licensUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
    kalla: 'https://commons.wikimedia.org/wiki/File:Pommern,_%C3%85land_Maritime_Museum,_2019_(12).jpg',
  },
  // Regionkort "Halland – Varberg · Tylösand · Falkenberg · Båstad". Varbergs
  // kallbadhus och stranden framför, sommarkväll juli 2009. Valdes framför en
  // nyare bild av kallbadhuset under grå himmel (maj 2024).
  halland: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Varberg_open_air_bath_and_beach_2009.jpg/960px-Varberg_open_air_bath_and_beach_2009.jpg',
    namn: 'Varbergs kallbadhus',
    fotograf: 'Axelaxel',
    licens: 'CC BY 3.0',
    licensUrl: 'https://creativecommons.org/licenses/by/3.0',
    kalla: 'https://commons.wikimedia.org/wiki/File:Varberg_open_air_bath_and_beach_2009.jpg',
  },
  // Destinationskortet "Innerskärgården – Fjäderholmarna · Vaxholm · Grinda"
  // och ruttkortet "Klassisk paddlingsrutt via Vaxholm, Grinda och Finnhamn".
  // Ersätter OBILDER-fotot av Vaxholm (flygbild i februari, isbelagd fjärd)
  // med hamnfronten och Waxholms Hotell i juni 2013. Ångbåtsbilden "Vaxholm
  // July 2017 01" provades först men klipptes av i det höga kortet.
  innerskargard: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6d/Vaxholm_water_fronts_June_2013_-_panoramio.jpg/960px-Vaxholm_water_fronts_June_2013_-_panoramio.jpg',
    namn: 'Vaxholm',
    fotograf: 'Bengt Nyman',
    licens: 'CC BY 3.0',
    licensUrl: 'https://creativecommons.org/licenses/by/3.0',
    kalla: 'https://commons.wikimedia.org/wiki/File:Vaxholm_water_fronts_June_2013_-_panoramio.jpg',
  },
}
