// ── Ö-koordinater för Stockholms skärgård ────────────────────────────────────
// Centrumkoordinat per ö. Används på fyra ställen som alla syns för användaren:
// ö-taggning av loggade resor (detectVisitedIslands), vädret på ö-sidan,
// kartmarkören, och "närmaste obesökta ö" på /min-skargard. En felaktig rad
// märks alltså inte bara i en widget — den taggar fel ö på någons resa.
//
// Omkontrollerade 2026-08-05 mot TVÅ oberoende källor: OSM place=island via
// Overpass (punkt-i-polygon, ytterringar hopsydda) och Nominatim
// (namnuppslag + omvänd geokodning). En rad godkänns bara om båda pekar åt
// samma håll. 53 av 56 rader stod sig. Se noterna vid de rättade raderna.
//
// Den tidigare rubriken sa "Verifierade mot Nominatim/Wikipedia (2026-04-25)".
// Björkö låg då 79 km fel, mitt i Sandhamnsområdet. Rubriken var alltså inte
// sann, vilket är värre än ingen rubrik alls — den gjorde att ingen tittade.

export interface IslandCoord {
  slug: string
  name: string
  lat: number
  lng: number
  radiusKm?: number  // anpassad detektionsradie (default 3km)
  /**
   * Radien för ösidornas platslistor (islandPlaces), när den ska skilja sig från
   * GPS-radien radiusKm: hur långt från nålen en plats utan ö-fält räknas som "på ön".
   * Saknas fältet gäller radiusKm. Värdet mäts per ö mot öns strandlinje och sätts av
   * öns Skribent (Toms beslut 3, 2026-11-08; mallarnas runda 5, 2026-11-10).
   */
  platsRadieKm?: number
}

export const ISLAND_COORDS: IslandCoord[] = [
  // ── Innerskärgården ──────────────────────────────────────────────────────
  // KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=R12694237&format=json — OpenStreetMap-relation 12694237 "Fjäderholmarna, Skärsätra, Lidingö, Lidingö kommun", mittpunkt 59.3283805, 18.1751269 (läst 2026-10-29). Den gamla nålen 59.3333, 18.1833 låg i vattnet nordost om ögruppen.
  { slug: 'fjaderholmarna',    name: 'Fjäderholmarna',    lat: 59.3284, lng: 18.1751, radiusKm: 1.5, platsRadieKm: 0.7 },  // radiusKm styr GPS-taggningen och står kvar på 1,5 km enligt Toms beslut 3 (2026-11-08). platsRadieKm styr platslistan och är uppmätt 2026-10-29: OSM:s gränsruta 59.3269403–59.3325597 N, 18.1674518–18.1801403 E ryms inom 0,64 km från mittpunkten. Fältet läggs till i IslandCoord av mallarnas runda 5.
  // platsRadieKm uppmätt 2026-11-17 (mallarnas runda 10, Kontrollantens fynd sm07-k042): längsta avstånd från nålen till
  // Vaxöns strandlinje är 3,220 km (nod 52141878; 513 noder i ytterringen, haversine), så 3,3 km täcker hela Vaxön och
  // kommunens Eriksö badplats (2,68 km) räknas som på Vaxholm. radiusKm styr GPS-taggningen och står kvar (Toms beslut 3).
  // Cirkeln når också Bogesundslandet, Kastellet och Resarö; platserna där har ö-fält i databasen och räknas inte som på
  // Vaxholm, utom Tenöbadet (Bogesundslandet, 1,66 km, utan ö-fält), som redan med 2,0 km räknades som på (SELECT 2026-11-17, db-riktig.json).
  // KÄLLA: https://api.openstreetmap.org/api/0.6/relation/4121363/full — "Vaxön" (läst 2026-11-17)
  { slug: 'vaxholm',           name: 'Vaxholm',           lat: 59.4022, lng: 18.3520, radiusKm: 2.0, platsRadieKm: 3.3 },
  // KÄLLA: https://www.openstreetmap.org/relation/2663146 — "Relation: Grinda (2663146)" (läst 2026-11-09)
  // KÄLLA: https://api.openstreetmap.org/api/0.6/relation/2663146/full — "Grinda" (läst 2026-11-09)
  // platsRadieKm uppmätt 2026-11-08 och igen 2026-11-09 i relationens 3 887 strandnoder från OpenStreetMaps API (relation 2663146, full; haversine): längsta avstånd från nålen till strandlinjen 1,319 km (nod 2012398914), så 1,4 km täcker hela Grinda. Cirkeln når också holmar i reservatet och strand på Viggsö (1,19 km) och Södra Ljusterö (1,22 km), där databasen inte har några platser (SELECT 2026-11-08: närmaste plats utanför Grinda ligger 3,5 km från nålen). Fältet platsRadieKm läggs till i IslandCoord och läses av islandPlaces i mallarnas runda 5.
  // radiusKm styr GPS-taggningen och sänks från 2,5 till 1,5 km enligt Toms beslut 3 (2026-11-08). Uppmätt igen 2026-11-09 (samma data och metod): Grindas längsta punkt ligger 1,32 km från nålen, så 1,5 km täcker hela ön. Cirkeln når också strand på Viggsö (1,19 km), Södra Ljusterö (1,22 km) och Storön (1,43 km) (OpenStreetMaps API, map-utdrag 18,515–18,608 E, 59,388–59,434 N).
  { slug: 'grinda',            name: 'Grinda',            lat: 59.4109, lng: 18.5618, radiusKm: 1.5, platsRadieKm: 1.4 },
  { slug: 'finnhamn',          name: 'Finnhamn',          lat: 59.4833, lng: 18.8333, radiusKm: 2.5 },
  { slug: 'rindo',             name: 'Rindö',             lat: 59.3990, lng: 18.4052, radiusKm: 2.0 },
  { slug: 'resaro',            name: 'Resarö',            lat: 59.4308, lng: 18.3333, radiusKm: 2.0 },

  // ── Mellersta skärgården ─────────────────────────────────────────────────
  { slug: 'sandhamn',          name: 'Sandhamn',          lat: 59.2868, lng: 18.9091, radiusKm: 2.5 },
  // KÄLLA: https://api.openstreetmap.org/api/0.6/nodes?nodes=441941298,2349235266,441941314,5010012668,2349141872,2334340773,2349139503,2349013583 — "Berg brygga"; "Möjaström"; "Södermöja"; "Stora Kalholmen" (läst 2026-11-09)
  // KÄLLA: https://api.openstreetmap.org/api/0.6/relation/8346534/full — "Möja" (läst 2026-11-09)
  // KÄLLA: https://api.openstreetmap.org/api/0.6/map?bbox=18.8150,59.4480,18.8350,59.4610 — "Stora Kalholmen" (läst 2026-11-09)
  // radiusKm styr GPS-taggningen och höjs från 3,0 till 3,5 km enligt Toms beslut 3 (2026-11-08). Uppmätt 2026-11-09 i OpenStreetMaps API (haversine) från nålen till bryggornas noder (ferry_terminal): Berg 3 036 m, Möjaström 3 293 m och Södermöja 3 331 m, alltså utanför 3,0 km men inom 3,5 km. Stora Kalholmens brygga ligger 4 211 m och holmens närmaste strand 3 889 m från nålen (way 222662304), utanför 3,5 km. Möjas längsta punkt ligger 3 584 m från nålen (relation 8346534), så 33 av 3 343 strandnoder hamnar utanför cirkeln. Platslistan använder radiusKm tills platsRadieKm finns (mallarnas runda 5).
  { slug: 'moja',              name: 'Möja',              lat: 59.4333, lng: 18.8833, radiusKm: 3.5 },
  { slug: 'ljustero',          name: 'Ljusterö',          lat: 59.5297, lng: 18.6135, radiusKm: 4.0 },
  { slug: 'gallno',            name: 'Gällnö',            lat: 59.4000, lng: 18.6333, radiusKm: 2.5 },
  { slug: 'ingmarso',          name: 'Ingmarsö',          lat: 59.4750, lng: 18.7667, radiusKm: 3.0 },
  { slug: 'namdo',             name: 'Nämdö',             lat: 59.1844, lng: 18.6947, radiusKm: 3.0 },
  { slug: 'svartso',           name: 'Svartsö',           lat: 59.4500, lng: 18.6833, radiusKm: 2.5 },
  { slug: 'runmaro',           name: 'Runmarö',           lat: 59.2833, lng: 18.7667, radiusKm: 3.0 },
  // radiusKm styr GPS-taggningen och sänks från 2,0 till 1,5 km enligt Toms beslut 3 (2026-11-08). Uppmätt 2026-11-10 i OpenStreetMaps API (haversine) från nålen: hela Husarö ryms inom 1,32 km (längsta avstånd till strandlinjen 1,317 km bland 604 noder i ytterringarna i relation 11665504), och Särsös brygga (nod 12953540454, ferry_terminal) ligger 1,66 km bort, alltså innanför 2,0 km men utanför 1,5 km.
  { slug: 'husaro',            name: 'Husarö',            lat: 59.5064, lng: 18.8475, radiusKm: 1.5 },
  { slug: 'kymmendo',          name: 'Kymmendö',          lat: 59.1112, lng: 18.4992, radiusKm: 2.0 },
    // AVGJORD 2026-08-12: ön heter "Bullerön" i OSM (bestämd form) — därför gav
  // "Bullerö" noll träffar i både Nominatim och tidigare Overpass-försök.
  // KÄLLA: OSM way/248949716 place=island "Bullerön", centrum 59.2049, 18.8472.
  // Vår gamla punkt (59.2005, 18.8492) var exakt Bullerö Gästhems position
  // (way/221764551) — PÅ ön men 500 m från centrum. Nu öns eget centrum.
  { slug: 'bullero',           name: 'Bullerö',           lat: 59.2049, lng: 18.8472, radiusKm: 2.0 },
  { slug: 'vindo',             name: 'Vindö',             lat: 59.3462, lng: 18.6990, radiusKm: 2.0 },
  { slug: 'ingaro',            name: 'Ingarö',            lat: 59.2500, lng: 18.4833, radiusKm: 4.0 },
  { slug: 'svenska-hogarna',   name: 'Svenska Högarna',   lat: 59.4431, lng: 19.5024, radiusKm: 2.5 },
  { slug: 'huvudskar',         name: 'Huvudskär',         lat: 58.9630, lng: 18.5683, radiusKm: 2.0 },
  { slug: 'ekno',              name: 'Eknö',              lat: 59.3087, lng: 18.8676, radiusKm: 2.0 },
  { slug: 'ormskar',            name: 'Ormskär',           lat: 59.1701, lng: 18.7509, radiusKm: 1.5 },
  { slug: 'norrpada',          name: 'Norrpada',          lat: 59.6544, lng: 19.2748, radiusKm: 1.5 },
  // RÄTTAD 2026-10-29. Låg på 59.2803, 18.8090 vid Byholmen i Värmdö kommun, omkring 40 km fel (därav "närmaste hållplats Långvik (Runmarö)" i transit-stops.ts).
  // KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=R9340511&format=jsonv2 — "59.3970411", "18.1394645", "Storholmen, Sticklinge, Lidingö, Lidingö kommun, Stockholms län, Sverige" (läst 2026-10-29); öns gränsruta i OpenStreetMap är 59.3932–59.4010, 18.1288–18.1445, och SL-bryggorna Storholmen södra, östra och norra ligger inom 0,5 km från punkten.
  // radiusKm styr GPS-taggningen och står kvar på 1,5 km enligt Toms beslut 3 (2026-11-08). platsRadieKm styr platslistan och är uppmätt: gränsrutans hörn ligger högst 0,75 km från punkten (haversine, beräknat 2026-11-10), så 0,8 km täcker ön. Fältet läggs till i IslandCoord av mallarnas runda 5.
  { slug: 'storholmen',        name: 'Storholmen',        lat: 59.3970, lng: 18.1395, radiusKm: 1.5, platsRadieKm: 0.8 },
  // RÄTTAD 2026-09-28. Låg på 59.6075, 19.2519 vid Rödlöga, 24 km fel. Länsstyrelsen:
  // reservatet ligger på södra delen av ön "i Svartlögafjärden 4 kilometer norr om Möja".
  // Lantmäteriets ortnamn "Storskäret" (Österåker) SWEREF99 TM 6600960/721672 = 59.4883, 18.9154;
  // Naturvårdsverkets reservatsgräns (NVR 2000006) har mittpunkt 59.4862, 18.9093 — 400 m isär.
  { slug: 'storskar',          name: 'Storskär',          lat: 59.4883, lng: 18.9154, radiusKm: 1.5 },
  // RÄTTAD 2026-08-05. Låg på 59.2939, 18.9513 — en punkt som ligger inuti ön
  // Kroksö vid Sandhamn (OSM way/245761619), 79 km från Björkö. Ön vi menar är
  // Björkö i Mälaren, där Birka ligger: OSM way/34546894, centroid
  // 59.3254, 17.5615. Nominatim ger 59.3256, 17.5664 för samma ö — källorna
  // skiljer 280 m, vilket ryms i radien.
  { slug: 'birka',             name: 'Birka',             lat: 59.3254, lng: 17.5615, radiusKm: 2.0 }, // 2026-10-21: hette bjorko/Björkö; posten är ihopslagen med Birka
  { slug: 'adelso',           name: 'Adelsö',            lat: 59.3768, lng: 17.5006, radiusKm: 2.0 },

  // ── Södra skärgården ─────────────────────────────────────────────────────
  // Rättad 2026-11-16 (Toms beslut 3c): nål och radie är Utös minsta omslutande cirkel. Mätmetod: alla 3 839 strandnoder i ytterringen för OpenStreetMaps relation 6315443 (Utö); minsta omslutande cirkel med Welzls algoritm i en azimutal ekvidistant projektion, kontrollerad med haversine; mittpunkten skrivs med fyra decimaler. Mittpunkten 58.9482, 18.3006 ligger på land, 207 m från närmaste strandnod. Längsta strandpunkten (node 269395829) ligger 5,254 km bort, så 5,3 km täcker hela ön. Gruvbryggan ligger 2,85 km från mittpunkten; Ålö brygga (7,00 km), Rånö färjeläge (7,73 km) och Rånö Källan Pub & Café (7,80 km) ligger utanför. Radien styr turtaggningen och platslistan (islandPlaces). Förut: 58.9476, 18.2623 och 7,0 km (Toms beslut 3, alternativ b).
  // KÄLLA: https://api.openstreetmap.org/api/0.6/relation/6315443/full — "name=Utö", "place=island" (läst 2026-11-16); uppmätt 2026-11-16 i ytterringens 3 839 strandnoder: minsta omslutande cirkel, mittpunkten 58.9482, 18.3006, längsta strandpunkt 5,254 km (haversine).
  // KÄLLA: https://api.openstreetmap.org/api/0.6/nodes?nodes=2321869273,424093156,269395949,3053395678,3231273089 — "name=Gruvbryggan", "name=Ålö", "name=Rånö", "name=Rånö Källan Pub & Café" (läst 2026-11-16); uppmätt 2026-11-16 (haversine) från mittpunkten: 2,85, 7,00, 7,73 och 7,80 km.
  { slug: 'uto',               name: 'Utö',               lat: 58.9482, lng: 18.3006, radiusKm: 5.3 },
  { slug: 'dalaro',            name: 'Dalarö',            lat: 59.1331, lng: 18.4064, radiusKm: 2.5 },
  { slug: 'orno',              name: 'Ornö',              lat: 59.0667, lng: 18.4167, radiusKm: 4.0 },
  { slug: 'landsort',          name: 'Landsort',          lat: 58.7396, lng: 17.8658, radiusKm: 2.0 },
  { slug: 'nattaro',           name: 'Nåttarö',           lat: 58.8743, lng: 18.1230, radiusKm: 2.5 },
  { slug: 'asko',              name: 'Askö',              lat: 58.8226, lng: 17.6426, radiusKm: 2.5 },
  { slug: 'galo',              name: 'Galö',              lat: 59.0884, lng: 18.2664, radiusKm: 2.0 },
  { slug: 'toro',              name: 'Torö',              lat: 58.8246, lng: 17.8414, radiusKm: 3.0 },
  { slug: 'fjardlang',         name: 'Fjärdlång',         lat: 59.0463, lng: 18.5226, radiusKm: 2.0 },
  { slug: 'smadalaro',        name: 'Smådalarö',         lat: 59.1662, lng: 18.4525, radiusKm: 2.0 },
  { slug: 'morko',             name: 'Mörkö',             lat: 58.9847, lng: 17.6597, radiusKm: 3.5 },
  { slug: 'musko',             name: 'Muskö',             lat: 58.9958, lng: 18.1149, radiusKm: 3.5 },
  // RÄTTAD 2026-08-05. Låg på 59.3200, 18.9900. Overpass hittar 127 öar inom
  // 6 km av den punkten och ingen av dem innehåller den — den låg i vatten,
  // närmaste ö Lökholmen 4,9 km bort. Nominatim placerar Hasselö på
  // 59.3213, 18.8494, alltså 8 km västerut.
  { slug: 'hasselo',           name: 'Hasselö',           lat: 59.3213, lng: 18.8494, radiusKm: 1.0 },
  { slug: 'langviksskaret',    name: 'Långviksskär',      lat: 59.1509, lng: 18.7981, radiusKm: 2.0 },

  // ── Norra skärgården ─────────────────────────────────────────────────────
  { slug: 'arholma',           name: 'Arholma',           lat: 59.8500, lng: 19.1167, radiusKm: 2.5 },
  { slug: 'furusund',          name: 'Furusund',          lat: 59.6606, lng: 18.9069, radiusKm: 2.0 },
  { slug: 'blido',             name: 'Blidö',             lat: 59.6072, lng: 18.8944, radiusKm: 3.5 },
  { slug: 'norrora',           name: 'Norröra',           lat: 59.6458, lng: 19.0377, radiusKm: 2.0 },
  { slug: 'fejan',             name: 'Fejan',             lat: 59.7399, lng: 19.1659, radiusKm: 1.5 },
  { slug: 'rodloga',           name: 'Rödlöga',           lat: 59.5919, lng: 19.1663, radiusKm: 2.0 },
  { slug: 'singo',             name: 'Singö',             lat: 60.1859, lng: 18.7543, radiusKm: 3.5 },
  { slug: 'lido',              name: 'Lidö',              lat: 59.7854, lng: 19.0656, radiusKm: 2.0 },
  { slug: 'graddo',            name: 'Gräddö',            lat: 59.7642, lng: 19.0321, radiusKm: 2.0 },
  { slug: 'vaddo',             name: 'Väddö',             lat: 60.0037, lng: 18.8310, radiusKm: 5.0 },
  { slug: 'yxlan',             name: 'Yxlan',             lat: 59.6167, lng: 18.8532, radiusKm: 2.5 },
  // RÄTTAD 2026-09-28. Raden hette "Gräskar" och låg på 59.4811, 18.9993 vid Möja,
  // 22 km fel, men ösidan /o/grasko handlar om Gräskö i Norrtälje kommun.
  // Lantmäteriets ortnamn "Gräskö" (Norrtälje) SWEREF99 TM 6622776/726531 = 59.6812, 19.0243;
  // Trafiklabs hållplats Gräskö brygga ligger 564 m därifrån.
  { slug: 'grasko',           name: 'Gräskö',            lat: 59.6812, lng: 19.0243, radiusKm: 2.0 },
  // RÄTTAD 2026-09-28. Låg på 59.7065, 19.4005 i Norrtäljes ytterskärgård, 65 km fel.
  // Ösidan handlar om Långskärs naturreservat i Värmdö kommun (Länsstyrelsen).
  // Lantmäteriets ortnamn "Långskär" (Värmdö) SWEREF99 TM 6566842/720013 = 59.1835, 18.8514,
  // och punkten ligger inom Naturvårdsverkets reservatsgräns (NVR 2000877, 4,4 x 3,8 km).
  // KÄLLA: https://api.openstreetmap.org/api/0.6/relation/10626307/full — "Långskärs naturreservat"; "2000877" (läst 2026-11-25). Uppmätt 2026-11-25 (runda 11, sb03-k030; haversine): reservatets gräns (19 noder) ligger som längst 3 448 m från nålen, och av de 2 014 strandnoder (natural=coastline, api/0.6/map för rutan 18.78,59.15,18.93,59.22) som ligger inom gränsen ligger den längsta 2 637 m bort (node 3198499372). 2,5 km täcker alltså inte hela reservatets land. radiusKm ändras inte här; förslaget står i styrso.tom.md.
  { slug: 'langskar',          name: 'Långskär',          lat: 59.1835, lng: 18.8514, radiusKm: 2.5 },

  // ── Göteborgs södra skärgård ──────────────────────────────────────────────
  // Tillagd 2026-11-09 enligt Toms beslut 3 (2026-11-08). Nålen är densamma som i island-data.ts (Lantmäteriets ortnamn Styrsö, trakt).
  // KÄLLA: https://api.openstreetmap.org/api/0.6/relation/6429433/full — "Styrsö"; "island" (läst 2026-11-09); uppmätt 2026-11-09 (haversine) i relationens 1 423 strandnoder: öns längsta strandpunkt ligger 1 988 m från nålen 57.6152, 11.7757 (node 3571400197), så 2,0 km täcker hela Styrsö. Bryggorna (OSM-noder): Tången 781 m, Bratten 1 106 m, Skäret 1 548 m.
  // Grannöarnas närmaste strand (relationerna 10129624, 10129623, 11048170, 10250729 och 10250730, /full i samma API, lästa samma dag): Vargö 1 044 m, Känsö 1 317 m, Donsö 1 544 m, Köpstadsö 1 697 m och Brännö 1 805 m, alltså innanför radien. Donsö färjeläge (node 639186627) ligger 2 018 m bort, utanför. Radien styr GPS-taggningen och platslistorna (islandPlaces); utan raden gällde standardradien 3 km.
  { slug: 'styrso',            name: 'Styrsö',            lat: 57.6152, lng: 11.7757, radiusKm: 2.0 },
]

// Lookup map for O(1) access
export const ISLAND_COORD_MAP = Object.fromEntries(
  ISLAND_COORDS.map(c => [c.slug, c])
)

// Haversine distance in km between two coords
export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

/**
 * Given a list of GPS points, returns the slugs of islands
 * that were passed within their detection radius.
 */
export function detectVisitedIslands(
  points: { lat: number; lng: number }[],
): string[] {
  if (points.length === 0) return []
  const visited = new Set<string>()

  // Glesa till högst ca 400 punkter (fast var 5:e förut, vilket hoppade över både
  // slutpunkten och glesa rutter; rättat 2026-10-26). Första och sista är alltid med.
  const steg = Math.max(1, Math.floor(points.length / 400))
  const sample = points.filter((_, i) => i % steg === 0 || i === points.length - 1)

  for (const island of ISLAND_COORDS) {
    const radius = island.radiusKm ?? 3.0
    const hit = sample.some(p =>
      haversineKm(p.lat, p.lng, island.lat, island.lng) <= radius
    )
    if (hit) visited.add(island.slug)
  }

  return [...visited]
}

/**
 * Besökt eller passerad (2026-10-26, Thomas: "Vad ser bäst ut? Vad lockar bäst?").
 *
 * detectVisitedIslands markerade varje ö inom radien som "besökt", också den
 * man körde förbi på 500 meter. Nu skiljer vi:
 * - BESÖKT: turen började eller slutade inom öns radie, eller ett stopp
 *   (auto-stopp eller paus) på minst BESOK_MIN_S inom radien. Du var där.
 * - PASSERAD: punkter inom radien utan att du stannade. Du såg ön från sjön.
 * Bara besökta räknas i Min skärgård (X av 102, märken); passerade listas för
 * sig som "Passerade från sjön" med uppmaningen att lägga till nästa gång.
 */
export const BESOK_MIN_S = 10 * 60

export type StoppPunkt = { lat: number; lng: number; durationSeconds: number }

export function klassaOarPaTuren(
  points: { lat: number; lng: number }[],
  stopp: StoppPunkt[] = [],
): { besokta: string[]; passerade: string[] } {
  if (points.length === 0) return { besokta: [], passerade: [] }
  const passerade = detectVisitedIslands(points)
  if (passerade.length === 0) return { besokta: [], passerade: [] }
  // Varje "ankare" (start, slut, långt stopp) ger högst EN besökt ö: den närmaste
  // vars radie punkten ligger inom. Radierna överlappar (Vaxholm/Rindö/Resarö,
  // Ljusterö 4 km), och en start mellan två öar fick förut båda som besökta
  // (granskning 2026-11-02).
  const ankare = [points[0]!, points[points.length - 1]!, ...stopp.filter(s => s.durationSeconds >= BESOK_MIN_S)]
  const besoktSet = new Set<string>()
  for (const p of ankare) {
    const o = narmasteOInomRadie(p)
    if (o) besoktSet.add(o)
  }
  const besokta = passerade.filter(s => besoktSet.has(s))
  // En besökt ö som provtagningen av rutten missat (t.ex. ett stopp mellan två punkter) tas ändå med.
  for (const s of besoktSet) if (!besokta.includes(s)) besokta.push(s)
  return { besokta, passerade: passerade.filter(s => !besoktSet.has(s)) }
}

/** Närmaste ö vars detektionsradie punkten ligger inom, eller null. */
export function narmasteOInomRadie(p: { lat: number; lng: number }): string | null {
  let bast: { slug: string; d: number } | null = null
  for (const o of ISLAND_COORDS) {
    const d = haversineKm(p.lat, p.lng, o.lat, o.lng)
    if (d <= (o.radiusKm ?? 3.0) && (!bast || d < bast.d)) bast = { slug: o.slug, d }
  }
  return bast?.slug ?? null
}
