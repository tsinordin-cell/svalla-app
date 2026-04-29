/**
 * seaWaypoints.ts — Sjöledes-grafen för Stockholm och Bohuslän skärgård
 *
 * Definierar ~70 navigeringspunkter (waypoints) i havet + en lista av segelbara kanter.
 * Varje waypoint är en verklig position i havet mellan/runt öar, inte på land.
 * Kantlistan definierar direkta vägar mellan waypoints utan att korsa land.
 *
 * Waypoint-namngivning: [farled_eller_område]_[position]
 * Exempel: "stromkajen_ledstreck_start", "lidingöleden_västra_utfarten", etc.
 */

export type SeaWaypoint = {
  id: string
  lat: number
  lng: number
  name: string
  /**
   * Vilka klassiska rutt-destinationer denna punkt är bäst anslutad till.
   * Används för snap: söker närmaste waypoint med matchande destination.
   */
  destinations?: string[]
}

export type SeaEdge = {
  from: string
  to: string
}

/**
 * ~70 waypoints täckande Stockholms inner-, mellan- och ytterskärgård + Bohuslän
 */
export const SEA_WAYPOINTS: SeaWaypoint[] = [
  // ─── STOCKHOLM: INRE BASIER ───────────────────────────────────────────
  { id: 'stromkajen_port', lat: 59.3243, lng: 18.0782, name: 'Strömkajen utgång', destinations: ['stromkajen'] },
  { id: 'saltsjoen_low', lat: 59.3200, lng: 18.1500, name: 'Saltsjön (västra)', destinations: ['stockholm'] },
  { id: 'saltsjoen_mid', lat: 59.3180, lng: 18.2100, name: 'Saltsjön (central)', destinations: ['stockholm'] },
  { id: 'hoggarnsfjarden', lat: 59.3400, lng: 18.2600, name: 'Höggarnsfjärden', destinations: ['stockholm', 'lidingö'] },
  { id: 'stora_varten_low', lat: 59.3700, lng: 18.3200, name: 'Stora Värtan (västra)', destinations: ['stockholm'] },
  { id: 'stora_varten_high', lat: 59.4000, lng: 18.3500, name: 'Stora Värtan (östra)', destinations: ['stockholm', 'vaxholm'] },

  // ─── LIDINGÖLEDEN-OMRÅDET ──────────────────────────────────────────────
  { id: 'lidingolen_sund_west', lat: 59.3550, lng: 18.2700, name: 'Lidingösund väst', destinations: ['lidingö'] },
  { id: 'lidingolen_sund_east', lat: 59.3600, lng: 18.2900, name: 'Lidingösund öst', destinations: ['lidingö'] },
  { id: 'lidingolen_north', lat: 59.3780, lng: 18.2200, name: 'Lidingöleden norr', destinations: ['lidingö'] },

  // ─── VAXHOLM OCH VÄGEN DORTUT ─────────────────────────────────────────
  { id: 'vaxholm_main', lat: 59.4024, lng: 18.3512, name: 'Vaxholm (centrum)', destinations: ['vaxholm'] },
  { id: 'vaxholm_south', lat: 59.3900, lng: 18.3400, name: 'Vaxholm (södra utfart)', destinations: ['vaxholm'] },
  { id: 'vaxholm_north', lat: 59.4150, lng: 18.3600, name: 'Vaxholm (norra utfart)', destinations: ['vaxholm'] },
  { id: 'vaxholm_east', lat: 59.4024, lng: 18.3700, name: 'Vaxholm (östra utfart)', destinations: ['vaxholm'] },
  { id: 'kastells_grund', lat: 59.3950, lng: 18.3600, name: 'Kastells Grund', destinations: ['vaxholm'] },

  // ─── NORRA INRE VÄGEN (Sollenkroka, Möjafjärden) ─────────────────────
  { id: 'sollenkroka_low', lat: 59.5850, lng: 18.5400, name: 'Vägen till Sollenkroka', destinations: ['sollenkroka'] },
  { id: 'sollenkroka_main', lat: 59.7050, lng: 18.8090, name: 'Sollenkroka (hamn)', destinations: ['sollenkroka'] },
  { id: 'mojafjarden_west', lat: 59.5300, lng: 18.6200, name: 'Möjafjärden (västra)', destinations: ['möja'] },
  { id: 'mojafjarden_mid', lat: 59.4800, lng: 18.8000, name: 'Möjafjärden (mittendel)', destinations: ['möja'] },
  { id: 'mojafjarden_east', lat: 59.4545, lng: 18.9110, name: 'Möja (centrum)', destinations: ['möja'] },

  // ─── SAXARFJÄRDEN OCH TRÄLHAVET (väg norrut från Vaxholm) ─────────────
  { id: 'saxarfjarden', lat: 59.4500, lng: 18.4500, name: 'Saxarfjärden', destinations: ['saxarfjärden'] },
  { id: 'tralhavet_low', lat: 59.5000, lng: 18.5000, name: 'Trälhavet (västra)', destinations: ['trälhavet'] },
  { id: 'tralhavet_mid', lat: 59.5300, lng: 18.5500, name: 'Trälhavet (mittendel)', destinations: ['trälhavet'] },
  { id: 'tralhavet_north', lat: 59.5600, lng: 18.6000, name: 'Trälhavet (norra)', destinations: ['trälhavet'] },

  // ─── VÄRMDÖ-OMRÅDET (Stavsnäs, Ingarö) ─────────────────────────────────
  { id: 'ingaro_west', lat: 59.2600, lng: 18.5200, name: 'Ingarö väst', destinations: ['ingarö'] },
  { id: 'ingaro_sund', lat: 59.2472, lng: 18.5861, name: 'Ingarö-sund', destinations: ['ingarö'] },
  { id: 'stavsnäs_south', lat: 59.1795, lng: 18.6500, name: 'Vägen till Stavsnäs', destinations: ['stavsnäs'] },
  { id: 'stavsnäs_main', lat: 59.1895, lng: 18.6823, name: 'Stavsnäs (hamn)', destinations: ['stavsnäs'] },

  // ─── SANDHAMN-VÄGEN (östra delen) ──────────────────────────────────────
  { id: 'vaxholm_sandhamn_start', lat: 59.3800, lng: 18.4000, name: 'Vägen från Vaxholm mot Sandhamn', destinations: ['sandhamn'] },
  { id: 'tunns_stengrund', lat: 59.3200, lng: 18.5500, name: 'Tunns Stengrund', destinations: ['sandhamn'] },
  { id: 'stora_moja_fjarden', lat: 59.3000, lng: 18.7000, name: 'Stora Möja-fjärden', destinations: ['sandhamn'] },
  { id: 'sandhamn_approach', lat: 59.2900, lng: 18.8500, name: 'Vägen in till Sandhamn', destinations: ['sandhamn'] },
  { id: 'sandhamn_main', lat: 59.2820, lng: 18.9130, name: 'Sandhamn (centrum)', destinations: ['sandhamn'] },

  // ─── GRINDA OCH SVARTSÖ ────────────────────────────────────────────────
  { id: 'grinda_south', lat: 59.4500, lng: 18.6800, name: 'Vägen från Vaxholm mot Grinda', destinations: ['grinda'] },
  { id: 'grinda_main', lat: 59.4602, lng: 18.7167, name: 'Grinda (centrum)', destinations: ['grinda'] },
  { id: 'svartso_approach', lat: 59.4600, lng: 18.7400, name: 'Vägen in till Svartsö', destinations: ['svartsö'] },
  { id: 'svartso_main', lat: 59.4730, lng: 18.7250, name: 'Svartsö (centrum)', destinations: ['svartsö'] },

  // ─── FINNHAMN OCH NORRA MELLERSKÄRGÅRD ──────────────────────────────────
  { id: 'finnhamn_approach', lat: 59.5200, lng: 18.8000, name: 'Vägen in till Finnhamn', destinations: ['finnhamn'] },
  { id: 'finnhamn_main', lat: 59.5430, lng: 18.8240, name: 'Finnhamn (centrum)', destinations: ['finnhamn'] },
  { id: 'husaro_north', lat: 59.5500, lng: 18.9500, name: 'Husarö (norr)', destinations: ['husarö'] },

  // ─── SÖDRA SKÄRGÅRDEN (Dalarö, Ornö, Utö, Nynäshamn) ──────────────────
  { id: 'stockholm_south', lat: 59.2500, lng: 18.3000, name: 'Stockholm söder (utfart)', destinations: ['stockholm'] },
  { id: 'mysingen_approach', lat: 59.2200, lng: 18.3500, name: 'Mysingen (västra)', destinations: ['mysingen'] },
  { id: 'mysingen_main', lat: 59.2000, lng: 18.4000, name: 'Mysingen (central)', destinations: ['mysingen'] },
  { id: 'dalaroe_approach', lat: 59.1400, lng: 18.3500, name: 'Vägen in till Dalarö', destinations: ['dalarö'] },
  { id: 'dalaroe_main', lat: 59.1298, lng: 18.4003, name: 'Dalarö (centrum)', destinations: ['dalarö'] },
  { id: 'orno_south', lat: 58.9700, lng: 18.4400, name: 'Ornö (sydlig)', destinations: ['ornö'] },
  { id: 'orno_main', lat: 58.9773, lng: 18.4550, name: 'Ornö (centrum)', destinations: ['ornö'] },
  { id: 'uto_approach', lat: 58.9500, lng: 18.2500, name: 'Vägen in till Utö', destinations: ['utö'] },
  { id: 'uto_main', lat: 58.9590, lng: 18.3017, name: 'Utö (centrum)', destinations: ['utö'] },
  { id: 'nynashamn_approach', lat: 58.9100, lng: 17.9500, name: 'Vägen in till Nynäshamn', destinations: ['nynäshamn'] },
  { id: 'nynashamn_main', lat: 58.9038, lng: 17.9475, name: 'Nynäshamn (hamn)', destinations: ['nynäshamn'] },
  { id: 'nattaro_approach', lat: 58.8600, lng: 17.9000, name: 'Vägen in till Nåttarö', destinations: ['nåttarö'] },
  { id: 'nattaro_main', lat: 58.8455, lng: 17.8742, name: 'Nåttarö (centrum)', destinations: ['nåttarö'] },
  { id: 'landsort_approach', lat: 58.7600, lng: 17.8800, name: 'Vägen in till Landsort', destinations: ['landsort'] },
  { id: 'landsort_main', lat: 58.7440, lng: 17.8640, name: 'Landsort (fyren)', destinations: ['landsort'] },

  // ─── NORRA SKÄRGÅRDEN (Blidö, Furusund, Arholma) ───────────────────────
  { id: 'blido_approach', lat: 59.5800, lng: 18.7800, name: 'Vägen in till Blidö', destinations: ['blidö'] },
  { id: 'blido_main', lat: 59.6200, lng: 18.8700, name: 'Blidö (centrum)', destinations: ['blidö'] },
  { id: 'furusund_approach', lat: 59.6500, lng: 18.9000, name: 'Vägen in till Furusund', destinations: ['furusund'] },
  { id: 'furusund_main', lat: 59.6653, lng: 18.9217, name: 'Furusund (centrum)', destinations: ['furusund'] },
  { id: 'rodloga_north', lat: 59.8000, lng: 19.0200, name: 'Rödlöga (västra)', destinations: ['rödlöga'] },
  { id: 'rodloga_main', lat: 59.8180, lng: 19.0650, name: 'Rödlöga (centrum)', destinations: ['rödlöga'] },
  { id: 'arholma_approach', lat: 59.8300, lng: 19.1000, name: 'Vägen in till Arholma', destinations: ['arholma'] },
  { id: 'arholma_main', lat: 59.8532, lng: 19.1345, name: 'Arholma (centrum)', destinations: ['arholma'] },

  // ─── BOHUSLÄN (Göteborg, Marstrand, Käringön, Smögen, Fjällbacka, Koster) ──
  { id: 'goteborg_harbor', lat: 57.7089, lng: 11.9746, name: 'Göteborg hamn', destinations: ['göteborg'] },
  { id: 'marstrand_approach', lat: 58.6400, lng: 11.6000, name: 'Vägen in till Marstrand', destinations: ['marstrand'] },
  { id: 'marstrand_main', lat: 58.6495, lng: 11.5756, name: 'Marstrand (centrum)', destinations: ['marstrand'] },
  { id: 'karingen_approach', lat: 58.7800, lng: 11.4500, name: 'Vägen in till Käringön', destinations: ['käringön'] },
  { id: 'karingen_main', lat: 58.8200, lng: 11.4200, name: 'Käringön (centrum)', destinations: ['käringön'] },
  { id: 'smogen_approach', lat: 58.9500, lng: 11.3000, name: 'Vägen in till Smögen', destinations: ['smögen'] },
  { id: 'smogen_main', lat: 58.9600, lng: 11.2800, name: 'Smögen (centrum)', destinations: ['smögen'] },
  { id: 'fjallbacka_approach', lat: 59.0500, lng: 11.2500, name: 'Vägen in till Fjällbacka', destinations: ['fjällbacka'] },
  { id: 'fjallbacka_main', lat: 59.0700, lng: 11.2200, name: 'Fjällbacka (centrum)', destinations: ['fjällbacka'] },
  { id: 'sydkoster_approach', lat: 59.2000, lng: 10.8000, name: 'Vägen in till Söderkoster', destinations: ['söderkoster'] },
  { id: 'sydkoster_main', lat: 59.2200, lng: 10.7800, name: 'Söderkoster (centrum)', destinations: ['söderkoster'] },
  { id: 'nordkoster_approach', lat: 59.3000, lng: 10.6500, name: 'Vägen in till Norderkoster', destinations: ['norderkoster'] },
  { id: 'nordkoster_main', lat: 59.3200, lng: 10.6200, name: 'Norderkoster (centrum)', destinations: ['norderkoster'] },
]

/**
 * ~90 kanter som definierar vilka waypoints som är direkt-segelbara från varandra
 * Varje kant är dubbelriktad (båda riktningarna är samma väg).
 */
export const SEA_EDGES: SeaEdge[] = [
  // ─── STROMKAJEN → STORA VÄRTAN → VAXHOLM ─────────────────────────────
  { from: 'stromkajen_port', to: 'saltsjoen_low' },
  { from: 'saltsjoen_low', to: 'saltsjoen_mid' },
  { from: 'saltsjoen_mid', to: 'hoggarnsfjarden' },
  { from: 'hoggarnsfjarden', to: 'lidingolen_sund_west' },
  { from: 'lidingolen_sund_west', to: 'lidingolen_sund_east' },
  { from: 'lidingolen_sund_east', to: 'stora_varten_low' },
  { from: 'stora_varten_low', to: 'stora_varten_high' },
  { from: 'stora_varten_high', to: 'vaxholm_south' },
  { from: 'vaxholm_south', to: 'vaxholm_main' },
  { from: 'vaxholm_main', to: 'vaxholm_north' },
  { from: 'vaxholm_main', to: 'vaxholm_east' },

  // ─── LIDINGÖLEDEN (alternativ väg) ────────────────────────────────────
  { from: 'hoggarnsfjarden', to: 'lidingolen_north' },
  { from: 'lidingolen_north', to: 'stora_varten_high' },

  // ─── VAXHOLM NORR → TRÄLHAVET → MÖJAFJÄRDEN → SOLLENKROKA ──────────────
  { from: 'vaxholm_north', to: 'saxarfjarden' },
  { from: 'saxarfjarden', to: 'tralhavet_low' },
  { from: 'tralhavet_low', to: 'tralhavet_mid' },
  { from: 'tralhavet_mid', to: 'tralhavet_north' },
  { from: 'tralhavet_north', to: 'mojafjarden_west' },
  { from: 'mojafjarden_west', to: 'mojafjarden_mid' },
  { from: 'mojafjarden_mid', to: 'mojafjarden_east' },
  { from: 'mojafjarden_east', to: 'sollenkroka_low' },
  { from: 'sollenkroka_low', to: 'sollenkroka_main' },

  // ─── VAXHOLM → GRINDA → SVARTSÖ ───────────────────────────────────────
  { from: 'vaxholm_east', to: 'grinda_south' },
  { from: 'grinda_south', to: 'grinda_main' },
  { from: 'grinda_main', to: 'svartso_approach' },
  { from: 'svartso_approach', to: 'svartso_main' },

  // ─── MOJAFJÄRDEN → FINNHAMN ────────────────────────────────────────────
  { from: 'mojafjarden_mid', to: 'finnhamn_approach' },
  { from: 'finnhamn_approach', to: 'finnhamn_main' },
  { from: 'finnhamn_main', to: 'husaro_north' },

  // ─── VAXHOLM → SANDHAMN-VÄGEN ──────────────────────────────────────────
  { from: 'vaxholm_east', to: 'vaxholm_sandhamn_start' },
  { from: 'vaxholm_sandhamn_start', to: 'tunns_stengrund' },
  { from: 'tunns_stengrund', to: 'stora_moja_fjarden' },
  { from: 'stora_moja_fjarden', to: 'sandhamn_approach' },
  { from: 'sandhamn_approach', to: 'sandhamn_main' },

  // ─── STAVSNÄS → SANDHAMN (väster från Stavsnäs) ─────────────────────────
  { from: 'stavsnäs_main', to: 'stavsnäs_south' },
  { from: 'stavsnäs_south', to: 'ingaro_sund' },
  { from: 'ingaro_sund', to: 'ingaro_west' },
  { from: 'ingaro_west', to: 'tunns_stengrund' },

  // ─── STOCKHOLM SÖD → MYSINGEN → DALARÖ → ORNÖ → UTÖ ────────────────────
  { from: 'saltsjoen_mid', to: 'stockholm_south' },
  { from: 'stockholm_south', to: 'mysingen_approach' },
  { from: 'mysingen_approach', to: 'mysingen_main' },
  { from: 'mysingen_main', to: 'dalaroe_approach' },
  { from: 'dalaroe_approach', to: 'dalaroe_main' },
  { from: 'dalaroe_main', to: 'orno_south' },
  { from: 'orno_south', to: 'orno_main' },
  { from: 'orno_main', to: 'uto_approach' },
  { from: 'uto_approach', to: 'uto_main' },

  // ─── STOCKHOLM SÖD → NYNÄSHAMN → NÅTTARÖ → LANDSORT ───────────────────
  { from: 'stockholm_south', to: 'nynashamn_approach' },
  { from: 'nynashamn_approach', to: 'nynashamn_main' },
  { from: 'nynashamn_main', to: 'nattaro_approach' },
  { from: 'nattaro_approach', to: 'nattaro_main' },
  { from: 'nattaro_main', to: 'landsort_approach' },
  { from: 'landsort_approach', to: 'landsort_main' },

  // ─── NORRA VÄGEN: SOLLENKROKA → BLIDÖ → FURUSUND → ARHOLMA ──────────────
  { from: 'sollenkroka_main', to: 'blido_approach' },
  { from: 'blido_approach', to: 'blido_main' },
  { from: 'blido_main', to: 'furusund_approach' },
  { from: 'furusund_approach', to: 'furusund_main' },
  { from: 'furusund_main', to: 'rodloga_north' },
  { from: 'rodloga_north', to: 'rodloga_main' },
  { from: 'rodloga_main', to: 'arholma_approach' },
  { from: 'arholma_approach', to: 'arholma_main' },

  // ─── BOHUSLÄN ──────────────────────────────────────────────────────────
  { from: 'goteborg_harbor', to: 'marstrand_approach' },
  { from: 'marstrand_approach', to: 'marstrand_main' },
  { from: 'marstrand_main', to: 'karingen_approach' },
  { from: 'karingen_approach', to: 'karingen_main' },
  { from: 'karingen_main', to: 'smogen_approach' },
  { from: 'smogen_approach', to: 'smogen_main' },
  { from: 'smogen_main', to: 'fjallbacka_approach' },
  { from: 'fjallbacka_approach', to: 'fjallbacka_main' },
  { from: 'fjallbacka_main', to: 'sydkoster_approach' },
  { from: 'sydkoster_approach', to: 'sydkoster_main' },
  { from: 'sydkoster_main', to: 'nordkoster_approach' },
  { from: 'nordkoster_approach', to: 'nordkoster_main' },

  // ─── CROSS-LINKS (alternativa vägar) ────────────────────────────────────
  { from: 'mojafjarden_east', to: 'finnhamn_approach' },
  { from: 'mojafjarden_east', to: 'svartso_main' },
  { from: 'svartso_main', to: 'finnhamn_approach' },
  { from: 'stora_moja_fjarden', to: 'mojafjarden_mid' },
  { from: 'ingaro_sund', to: 'mysingen_main' },
]

/**
 * Bygger en adjacency-lista från kantlistan (båda riktningar).
 */
export function buildSeaGraph(): Map<string, string[]> {
  const graph = new Map<string, string[]>()

  // Initialisera alla waypoints
  for (const wp of SEA_WAYPOINTS) {
    graph.set(wp.id, [])
  }

  // Lägg till kanter (dubbelriktad)
  for (const edge of SEA_EDGES) {
    const fromList = graph.get(edge.from)
    const toList = graph.get(edge.to)
    if (fromList) fromList.push(edge.to)
    if (toList) toList.push(edge.from)
  }

  return graph
}

/**
 * Mappar waypoint-ID till waypoint-objekt för snabb lookup.
 */
export function buildWaypointMap(): Map<string, SeaWaypoint> {
  return new Map(SEA_WAYPOINTS.map(wp => [wp.id, wp]))
}
