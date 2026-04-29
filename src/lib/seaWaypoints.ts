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
 * 215+ waypoints täckande Stockholms inner-, mellan- och ytterskärgård + Bohuslän
 * Uppdaterad 2026-04-29 för Nivå 2-light routing
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
  { id: 'tegelhagen', lat: 59.3720, lng: 18.1500, name: 'Tegelhagen', destinations: ['lidingö'] },
  { id: 'kappala', lat: 59.3850, lng: 18.1200, name: 'Käppala', destinations: ['lidingö'] },

  // ─── VAXHOLM OCH VÄGEN DORTUT ─────────────────────────────────────────
  { id: 'vaxholm_main', lat: 59.4024, lng: 18.3512, name: 'Vaxholm (centrum)', destinations: ['vaxholm'] },
  { id: 'vaxholm_south', lat: 59.3900, lng: 18.3400, name: 'Vaxholm (södra utfart)', destinations: ['vaxholm'] },
  { id: 'vaxholm_north', lat: 59.4150, lng: 18.3600, name: 'Vaxholm (norra utfart)', destinations: ['vaxholm'] },
  { id: 'vaxholm_east', lat: 59.4024, lng: 18.3700, name: 'Vaxholm (östra utfart)', destinations: ['vaxholm'] },
  { id: 'kastells_grund', lat: 59.3950, lng: 18.3600, name: 'Kastells Grund', destinations: ['vaxholm'] },

  // ─── STOCKHOLMS INNER (Hägernäs, Torpa, Resaröviken) ────────────────────
  { id: 'hagernas', lat: 59.3300, lng: 18.4200, name: 'Hägernäs', destinations: ['stockholm'] },
  { id: 'torpa', lat: 59.3150, lng: 18.4500, name: 'Torpa', destinations: ['stockholm'] },
  { id: 'resaroviken', lat: 59.3050, lng: 18.4800, name: 'Resaröviken', destinations: ['stockholm'] },

  // ─── SÖDRA INNER (Ramsmoraviken, Rindö, Frötuna) ──────────────────────
  { id: 'ramsmoraviken', lat: 59.2800, lng: 18.5000, name: 'Ramsmoraviken', destinations: ['stockholm'] },
  { id: 'rindo', lat: 59.2600, lng: 18.5600, name: 'Rindö', destinations: ['stockholm'] },
  { id: 'frotuna', lat: 59.2450, lng: 18.5200, name: 'Frötuna', destinations: ['stockholm'] },

  // ─── VÄRMDÖ-ZONEN (Boda, Boo, Ingaröfjärden, Lemshaga) ──────────────────
  { id: 'boda', lat: 59.3200, lng: 18.6000, name: 'Boda', destinations: ['värmdö'] },
  { id: 'boo', lat: 59.2950, lng: 18.6300, name: 'Boo', destinations: ['värmdö'] },
  { id: 'ingarofjarden', lat: 59.2750, lng: 18.6700, name: 'Ingaröfjärden', destinations: ['ingarö'] },
  { id: 'lemshaga', lat: 59.2550, lng: 18.7100, name: 'Lemshaga', destinations: ['värmdö'] },
  { id: 'skarmaro', lat: 59.2380, lng: 18.7450, name: 'Skärmarö', destinations: ['värmdö'] },
  { id: 'algö', lat: 59.2200, lng: 18.7800, name: 'Älgö', destinations: ['värmdö'] },

  // ─── VÄSTRARE VÄRMDÖ (Vindöfjärden, Stora Stenskär) ─────────────────────
  { id: 'vindofjarden', lat: 59.2600, lng: 18.8500, name: 'Vindöfjärden', destinations: ['värmdö'] },
  { id: 'stora_stenskar', lat: 59.2450, lng: 18.9200, name: 'Stora Stenskär', destinations: ['värmdö'] },

  // ─── MELLERSKÄRGÅRD NORD (Yxlö, Karklö, Idskärsfjärden) ──────────────────
  { id: 'yxlo', lat: 59.4500, lng: 18.5500, name: 'Yxlö', destinations: ['mellerskärgård'] },
  { id: 'karklo', lat: 59.4700, lng: 18.6200, name: 'Karklö', destinations: ['mellerskärgård'] },
  { id: 'idskarsfarden', lat: 59.5000, lng: 18.7000, name: 'Idskärsfjärden', destinations: ['mellerskärgård'] },

  // ─── PELLERSKÄRGÅRD-VÄST (Husarö, Sollenkroka, Söderöra) ──────────────────
  { id: 'husaro_main', lat: 59.5600, lng: 18.8800, name: 'Husarö (huvudort)', destinations: ['husarö'] },
  { id: 'sollenkroka_approach', lat: 59.6200, lng: 18.7600, name: 'Vägen till Sollenkroka', destinations: ['sollenkroka'] },
  { id: 'sollenkroka_low', lat: 59.5850, lng: 18.5400, name: 'Vägen till Sollenkroka (söder)', destinations: ['sollenkroka'] },
  { id: 'sollenkroka_main', lat: 59.7050, lng: 18.8090, name: 'Sollenkroka (hamn)', destinations: ['sollenkroka'] },
  { id: 'soderorа_north', lat: 59.6400, lng: 18.9500, name: 'Söderöra (norr)', destinations: ['söderöra'] },
  { id: 'soderorа_main', lat: 59.6250, lng: 18.9800, name: 'Söderöra (centrum)', destinations: ['söderöra'] },

  // ─── NORRA INRE VÄGEN (Möjafjärden) ────────────────────────────────────
  { id: 'mojafjarden_west', lat: 59.5300, lng: 18.6200, name: 'Möjafjärden (västra)', destinations: ['möja'] },
  { id: 'mojafjarden_mid', lat: 59.4800, lng: 18.8000, name: 'Möjafjärden (mittendel)', destinations: ['möja'] },
  { id: 'mojafjarden_east', lat: 59.4545, lng: 18.9110, name: 'Möja (centrum)', destinations: ['möja'] },

  // ─── SAXARFJÄRDEN OCH TRÄLHAVET ────────────────────────────────────────
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

  // ─── NORRKROKA OCH NORRA STAVSFJÄRDEN ──────────────────────────────────
  { id: 'norra_stavsfarden', lat: 59.5200, lng: 18.7200, name: 'Norra Stavsfjärden', destinations: ['stavsfjärden'] },
  { id: 'norrkroka', lat: 59.5100, lng: 18.7600, name: 'Norrkroka', destinations: ['mellerskärgård'] },

  // ─── STORÖ, KORSÖ, LÖKSKÄR ────────────────────────────────────────────
  { id: 'storo', lat: 59.4800, lng: 18.9000, name: 'Storö', destinations: ['mellerskärgård'] },
  { id: 'korso', lat: 59.5000, lng: 18.8500, name: 'Korsö', destinations: ['mellerskärgård'] },
  { id: 'lokskar', lat: 59.5300, lng: 19.0000, name: 'Lökskär', destinations: ['mellerskärgård'] },

  // ─── GILLÖGA OCH MÄRTEN FYR ────────────────────────────────────────────
  { id: 'gilloga', lat: 59.6000, lng: 18.9200, name: 'Gillöga', destinations: ['norr'] },
  { id: 'marten_fyr', lat: 59.6800, lng: 19.1000, name: 'Märten Fyr', destinations: ['norr'] },
  { id: 'soderarm', lat: 59.6600, lng: 19.2000, name: 'Söderarm', destinations: ['norr'] },

  // ─── FINNHAMN OCH NORRA MELLERSKÄRGÅRD ──────────────────────────────────
  { id: 'finnhamn_approach', lat: 59.5200, lng: 18.8000, name: 'Vägen in till Finnhamn', destinations: ['finnhamn'] },
  { id: 'finnhamn_main', lat: 59.5430, lng: 18.8240, name: 'Finnhamn (centrum)', destinations: ['finnhamn'] },
  { id: 'husaro_north', lat: 59.5500, lng: 18.9500, name: 'Husarö (norr)', destinations: ['husarö'] },

  // ─── SÖDRA SKÄRGÅRDEN (Dalarö, Ornö, Utö, Nynäshamn) ──────────────────
  { id: 'stockholm_south', lat: 59.2500, lng: 18.3000, name: 'Stockholm söder (utfart)', destinations: ['stockholm'] },
  { id: 'mysingen_approach', lat: 59.2200, lng: 18.3500, name: 'Mysingen (västra)', destinations: ['mysingen'] },
  { id: 'mysingen_main', lat: 59.2000, lng: 18.4000, name: 'Mysingen (central)', destinations: ['mysingen'] },
  { id: 'alvsnabben', lat: 59.1600, lng: 18.2800, name: 'Älvsnabben', destinations: ['söder'] },
  { id: 'studsen', lat: 59.1400, lng: 18.3200, name: 'Studsen', destinations: ['söder'] },
  { id: 'dalaroe_approach', lat: 59.1400, lng: 18.3500, name: 'Vägen in till Dalarö', destinations: ['dalarö'] },
  { id: 'dalaroe_main', lat: 59.1298, lng: 18.4003, name: 'Dalarö (centrum)', destinations: ['dalarö'] },
  { id: 'smedejeholmen', lat: 59.0950, lng: 18.4200, name: 'Smedjeholmen', destinations: ['söder'] },
  { id: 'langvikskar', lat: 59.0800, lng: 18.4500, name: 'Långviksskär', destinations: ['söder'] },
  { id: 'mellsten', lat: 59.0650, lng: 18.4100, name: 'Mellsten', destinations: ['söder'] },
  { id: 'orno_south', lat: 58.9700, lng: 18.4400, name: 'Ornö (sydlig)', destinations: ['ornö'] },
  { id: 'orno_main', lat: 58.9773, lng: 18.4550, name: 'Ornö (centrum)', destinations: ['ornö'] },
  { id: 'uto_approach', lat: 58.9500, lng: 18.2500, name: 'Vägen in till Utö', destinations: ['utö'] },
  { id: 'uto_main', lat: 58.9590, lng: 18.3017, name: 'Utö (centrum)', destinations: ['utö'] },
  { id: 'kapellskar', lat: 59.0200, lng: 18.6500, name: 'Kapellskär', destinations: ['söder'] },
  { id: 'ladholmen', lat: 58.9400, lng: 18.5800, name: 'Ladholmen', destinations: ['söder'] },
  { id: 'kymmendo', lat: 58.8800, lng: 18.6200, name: 'Kymmendö', destinations: ['söder'] },

  // ─── STOCKHOLM SÖD → NYNÄSHAMN → NÅTTARÖ → LANDSORT ───────────────────
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

  // ─── BOHUSLÄN — GÖTEBORG ─────────────────────────────────────────────
  { id: 'goteborg_harbor', lat: 57.7089, lng: 11.9746, name: 'Göteborg hamn', destinations: ['göteborg'] },
  { id: 'goteborg_north', lat: 57.7500, lng: 12.0000, name: 'Göteborg (norr)', destinations: ['göteborg'] },
  { id: 'vinga', lat: 57.6800, lng: 11.8200, name: 'Vinga', destinations: ['göteborg'] },

  // ─── BOHUSLÄN — HISINGEN & TJÖRN ──────────────────────────────────────
  { id: 'hisingen', lat: 57.8200, lng: 11.8800, name: 'Hisingen', destinations: ['hisingen'] },
  { id: 'tjorn_west', lat: 58.0500, lng: 11.5500, name: 'Tjörn (västra)', destinations: ['tjörn'] },
  { id: 'tjorn_main', lat: 58.0800, lng: 11.7000, name: 'Tjörn (centrum)', destinations: ['tjörn'] },

  // ─── BOHUSLÄN — ORUST ─────────────────────────────────────────────────
  { id: 'orust_south', lat: 58.2500, lng: 11.6000, name: 'Orust (södra)', destinations: ['orust'] },
  { id: 'orust_main', lat: 58.3200, lng: 11.6500, name: 'Orust (centrum)', destinations: ['orust'] },

  // ─── BOHUSLÄN — HÖNÖ, ÖCKERÖ ──────────────────────────────────────────
  { id: 'hono_west', lat: 57.8800, lng: 11.6500, name: 'Hönö (västra)', destinations: ['hönö'] },
  { id: 'hono_main', lat: 57.9000, lng: 11.7200, name: 'Hönö (centrum)', destinations: ['hönö'] },
  { id: 'ockero_west', lat: 57.9200, lng: 11.5500, name: 'Öckerö (västra)', destinations: ['öckerö'] },
  { id: 'ockero_main', lat: 57.9500, lng: 11.6200, name: 'Öckerö (centrum)', destinations: ['öckerö'] },

  // ─── BOHUSLÄN — BRÄNNÖ, VRÅNGÖ, DONSÖ ──────────────────────────────────
  { id: 'branno', lat: 58.0200, lng: 11.7800, name: 'Brännö', destinations: ['brännö'] },
  { id: 'vrango', lat: 58.0800, lng: 11.8200, name: 'Vrångö', destinations: ['vrångö'] },
  { id: 'donso', lat: 58.1500, lng: 11.8800, name: 'Donsö', destinations: ['donsö'] },

  // ─── BOHUSLÄN — TJÖRNBRON & FISKEBÄCKSKIL ──────────────────────────────
  { id: 'tjornbron', lat: 58.2000, lng: 11.6800, name: 'Tjörnbron', destinations: ['tjörnbron'] },
  { id: 'fiskebackskil', lat: 58.3800, lng: 11.4200, name: 'Fiskebäckskil', destinations: ['fiskebäckskil'] },
  { id: 'grundsund', lat: 58.5200, lng: 11.3800, name: 'Grundsund', destinations: ['grundsund'] },

  // ─── BOHUSLÄN — LYSEKIL & HOVENÄSET ────────────────────────────────────
  { id: 'lysekil_main', lat: 58.2700, lng: 11.4400, name: 'Lysekil (centrum)', destinations: ['lysekil'] },
  { id: 'hovenäset', lat: 58.3100, lng: 11.3600, name: 'Hovenäset', destinations: ['hovenäset'] },
  { id: 'ramsvik', lat: 58.3900, lng: 11.2900, name: 'Ramsvik', destinations: ['ramsvik'] },

  // ─── BOHUSLÄN — SMÖGEN & KUNGSHAMN ────────────────────────────────────
  { id: 'smogen_approach', lat: 58.9500, lng: 11.3000, name: 'Vägen in till Smögen', destinations: ['smögen'] },
  { id: 'smogen_main', lat: 58.9600, lng: 11.2800, name: 'Smögen (centrum)', destinations: ['smögen'] },
  { id: 'kungshamn_main', lat: 58.9800, lng: 11.2200, name: 'Kungshamn', destinations: ['kungshamn'] },
  { id: 'hallo', lat: 58.8800, lng: 11.1500, name: 'Hållö', destinations: ['hållö'] },

  // ─── BOHUSLÄN — FJÄLLBACKA ────────────────────────────────────────────
  { id: 'fjallbacka_approach', lat: 59.0500, lng: 11.2500, name: 'Vägen in till Fjällbacka', destinations: ['fjällbacka'] },
  { id: 'fjallbacka_main', lat: 59.0700, lng: 11.2200, name: 'Fjällbacka (centrum)', destinations: ['fjällbacka'] },

  // ─── BOHUSLÄN — HAMBURGSUND & GREBBESTAD ──────────────────────────────
  { id: 'hamburgsund', lat: 59.1200, lng: 11.1500, name: 'Hamburgsund', destinations: ['hamburgsund'] },
  { id: 'edshultshall', lat: 59.1600, lng: 11.1200, name: 'Edshultshall', destinations: ['edshultshall'] },
  { id: 'grebbestad', lat: 59.2000, lng: 11.0800, name: 'Grebbestad', destinations: ['grebbestad'] },

  // ─── BOHUSLÄN — STRÖMSTAD & RESÖ ──────────────────────────────────────
  { id: 'stromstad_main', lat: 59.1900, lng: 10.9800, name: 'Strömstad (centrum)', destinations: ['strömstad'] },
  { id: 'reso', lat: 59.1700, lng: 10.8800, name: 'Resö', destinations: ['resö'] },
  { id: 'ursholmen', lat: 59.2000, lng: 10.7500, name: 'Ursholmen', destinations: ['ursholmen'] },

  // ─── BOHUSLÄN — KOSTERHAVET ───────────────────────────────────────────
  { id: 'sydkoster_approach', lat: 59.2000, lng: 10.8000, name: 'Vägen in till Söderkoster', destinations: ['söderkoster'] },
  { id: 'sydkoster_main', lat: 59.2200, lng: 10.7800, name: 'Söderkoster (centrum)', destinations: ['söderkoster'] },
  { id: 'sydkoster_east', lat: 59.2150, lng: 10.8500, name: 'Söderkoster (östra)', destinations: ['söderkoster'] },
  { id: 'nordkoster_approach', lat: 59.3000, lng: 10.6500, name: 'Vägen in till Norderkoster', destinations: ['norderkoster'] },
  { id: 'nordkoster_main', lat: 59.3200, lng: 10.6200, name: 'Norderkoster (centrum)', destinations: ['norderkoster'] },
  { id: 'otterom', lat: 59.2700, lng: 10.5800, name: 'Otterön', destinations: ['otterön'] },
  { id: 'kosterhavet_mid', lat: 59.2500, lng: 10.6800, name: 'Kosterhavet (mittendel)', destinations: ['kosterhavet'] },

  // ─── MÄLAREN BASIC (om relevant för Stockholm) ───────────────────────
  { id: 'mälaren_åkersberga', lat: 59.3500, lng: 18.0200, name: 'Åkersberga (Mälaren)', destinations: ['mälaren'] },
  { id: 'mälaren_västerås', lat: 59.6100, lng: 16.5400, name: 'Västerås (Mälaren)', destinations: ['mälaren'] },

  // ─── STOCKHOLMS INNERSKÄRGÅRD — UTÖKNING ──────────────────────────────
  { id: 'saltsjoen_north', lat: 59.3350, lng: 18.1800, name: 'Saltsjön norr om Djurgården', destinations: ['stockholm'] },
  { id: 'djurgarden_east', lat: 59.3280, lng: 18.3600, name: 'Djurgården östra sida', destinations: ['stockholm'] },
  { id: 'lidingöfjarden_north', lat: 59.3900, lng: 18.2800, name: 'Lidingöfjärden norra', destinations: ['lidingö'] },
  { id: 'lidingöfjarden_mid', lat: 59.3750, lng: 18.2950, name: 'Lidingöfjärden mittendel', destinations: ['lidingö'] },
  { id: 'halvkakssundet', lat: 59.3650, lng: 18.3150, name: 'Halvkakssundet', destinations: ['stockholm', 'lidingö'] },
  { id: 'tranholmen', lat: 59.3580, lng: 18.3400, name: 'Tranholmen', destinations: ['stockholm'] },
  { id: 'algöfjarden_north', lat: 59.3550, lng: 18.4100, name: 'Älgöfjärden norra', destinations: ['stockholm'] },
  { id: 'algöfjarden_mid', lat: 59.3400, lng: 18.4300, name: 'Älgöfjärden mittendel', destinations: ['stockholm'] },
  { id: 'trälhavet_västra', lat: 59.4900, lng: 18.4800, name: 'Trälhavet västra', destinations: ['trälhavet'] },
  { id: 'solöfjarden', lat: 59.3300, lng: 18.6400, name: 'Solöfjärden', destinations: ['stockholm'] },
  { id: 'lillsved_leden', lat: 59.3550, lng: 18.7200, name: 'Lillsved-leden', destinations: ['lillsved'] },

  // ─── STOCKHOLMS MELLANSKÄRGÅRD — UTÖKNING ───────────────────────────────
  { id: 'saxarfjarden_north', lat: 59.4700, lng: 18.4300, name: 'Saxarfjärden norra', destinations: ['saxarfjärden'] },
  { id: 'saxarfjarden_south', lat: 59.4300, lng: 18.4700, name: 'Saxarfjärden södra', destinations: ['saxarfjärden'] },
  { id: 'möjafjarden_inre', lat: 59.5200, lng: 18.7500, name: 'Möjafjärden inre', destinations: ['möja'] },
  { id: 'möjafjarden_mellan', lat: 59.4900, lng: 18.8500, name: 'Möjafjärden mellan', destinations: ['möja'] },
  { id: 'möjafjarden_yttre', lat: 59.4700, lng: 18.9300, name: 'Möjafjärden yttre', destinations: ['möja'] },
  { id: 'tunns_stengrund_north', lat: 59.3400, lng: 18.5700, name: 'Tunns Stengrund nord', destinations: ['sandhamn'] },
  { id: 'lokaö_leden', lat: 59.3500, lng: 18.6800, name: 'Lökaö-leden', destinations: ['mellerskärgård'] },
  { id: 'sandhamn_inlopp', lat: 59.2950, lng: 18.8700, name: 'Sandhamn inlopp (Korsöledsleden)', destinations: ['sandhamn'] },
  { id: 'kanholmsfjarden', lat: 59.4100, lng: 19.0200, name: 'Kanholmsfjärden öster om Möja', destinations: ['mellerskärgård'] },
  { id: 'norra_norrlängansundet', lat: 59.4950, lng: 18.7800, name: 'Norra Norrlängansundet', destinations: ['mellerskärgård'] },
  { id: 'älgösund', lat: 59.2050, lng: 18.7600, name: 'Älgösund', destinations: ['värmdö'] },
  { id: 'granhamnsfjarden', lat: 59.2150, lng: 18.8800, name: 'Granhamnsfjärden', destinations: ['mellerskärgård'] },

  // ─── SÖDER OM VÄRMDÖ ──────────────────────────────────────────────────────
  { id: 'baggensfjarden_inre', lat: 59.1400, lng: 18.5500, name: 'Baggensfjärden inre', destinations: ['söder'] },
  { id: 'baggensfjarden_yttre', lat: 59.1200, lng: 18.6200, name: 'Baggensfjärden yttre', destinations: ['söder'] },
  { id: 'mysingen_north', lat: 59.2300, lng: 18.3800, name: 'Mysingen norra', destinations: ['mysingen'] },
  { id: 'mysingen_south', lat: 59.1800, lng: 18.4200, name: 'Mysingen södra', destinations: ['mysingen'] },
  { id: 'erstaviken', lat: 59.1800, lng: 18.3000, name: 'Erstaviken', destinations: ['söder'] },
  { id: 'dalarostromm', lat: 59.1100, lng: 18.3800, name: 'Dalarö strömmen', destinations: ['dalarö'] },
  { id: 'jungfrufjarden', lat: 59.0850, lng: 18.5500, name: 'Jungfrufjärden', destinations: ['söder'] },
  { id: 'nämdöfjarden', lat: 59.1500, lng: 18.7200, name: 'Nämdöfjärden', destinations: ['söder'] },

  // ─── YTTRE SKÄRGÅRD ───────────────────────────────────────────────────────
  { id: 'korsöledsfjarden', lat: 59.2650, lng: 19.0500, name: 'Korsöledsfjärden', destinations: ['sandhamn'] },
  { id: 'långviksskär_north', lat: 59.0950, lng: 18.4800, name: 'Långviksskär nord', destinations: ['söder'] },
  { id: 'bullerö_leden', lat: 58.9200, lng: 18.5000, name: 'Bullerö-leden', destinations: ['söder'] },
  { id: 'huvudskär', lat: 58.8500, lng: 18.2500, name: 'Huvudskär', destinations: ['söder'] },
  { id: 'måsknuv', lat: 58.8900, lng: 18.7200, name: 'Måsknuv', destinations: ['söder'] },
  { id: 'landsortsdjupet', lat: 58.7300, lng: 17.9200, name: 'Landsortsdjupet', destinations: ['landsort'] },
  { id: 'söderarm_north', lat: 59.6800, lng: 19.2500, name: 'Söderarm norra', destinations: ['norr'] },
  { id: 'lyran_fyr', lat: 59.7300, lng: 19.3500, name: 'Lyran fyren (yttre)', destinations: ['norr'] },

  // ─── NORRA SKÄRGÅRDEN — UTÖKNING ──────────────────────────────────────────
  { id: 'furusunds_leden', lat: 59.6800, lng: 18.8500, name: 'Furusunds-leden', destinations: ['furusund'] },
  { id: 'norra_stäket', lat: 59.7200, lng: 19.1200, name: 'Norra Stäket', destinations: ['norr'] },
  { id: 'yxlan', lat: 59.7550, lng: 19.0800, name: 'Yxlan', destinations: ['norr'] },
  { id: 'blidö_leden_north', lat: 59.6500, lng: 18.8200, name: 'Blidö-leden norra', destinations: ['blidö'] },
  { id: 'blidö_leden_south', lat: 59.6000, lng: 18.8100, name: 'Blidö-leden södra', destinations: ['blidö'] },
  { id: 'söderarmsleden', lat: 59.6750, lng: 19.0600, name: 'Söderarmsleden', destinations: ['norr'] },
  { id: 'kapellskärs_inlopp', lat: 59.0500, lng: 18.6200, name: 'Kapellskärs inlopp', destinations: ['söder'] },
  { id: 'arholma_yttre', lat: 59.8700, lng: 19.1800, name: 'Arholma yttre', destinations: ['arholma'] },
  { id: 'simpnäs', lat: 59.8200, lng: 19.2200, name: 'Simpnäs', destinations: ['arholma'] },

  // ─── BOHUSLÄN — UTÖKNING ──────────────────────────────────────────────────
  { id: 'hakefjorden', lat: 58.5000, lng: 11.5200, name: 'Hakefjorden', destinations: ['bohuslän'] },
  { id: 'stenungsundet', lat: 58.4200, lng: 11.6800, name: 'Stenungsundet', destinations: ['bohuslän'] },
  { id: 'marstrands_leden', lat: 58.6500, lng: 11.6000, name: 'Marstrands-leden', destinations: ['bohuslän'] },
  { id: 'albrektssund', lat: 58.6700, lng: 11.5800, name: 'Albrektssund', destinations: ['bohuslän'] },
  { id: 'hjältefjorden', lat: 58.7500, lng: 11.4500, name: 'Hjältefjorden', destinations: ['bohuslän'] },
  { id: 'halsefjorden', lat: 58.8500, lng: 11.3500, name: 'Halsefjorden', destinations: ['bohuslän'] },
  { id: 'soteleden', lat: 58.9200, lng: 11.2200, name: 'Soteleden', destinations: ['bohuslän'] },
  { id: 'sotekanalen', lat: 58.9500, lng: 11.2500, name: 'Sotekanalen', destinations: ['bohuslän'] },
  { id: 'smögens_inlopp', lat: 58.9700, lng: 11.2500, name: 'Smögens inlopp', destinations: ['smögen'] },
  { id: 'hållö_south', lat: 58.8500, lng: 11.1200, name: 'Hållö södra', destinations: ['hållö'] },
  { id: 'fjällbacka_inlopp', lat: 59.0400, lng: 11.2700, name: 'Fjällbacka inlopp', destinations: ['fjällbacka'] },
  { id: 'pinnstugan', lat: 59.0900, lng: 11.1800, name: 'Pinnstugan', destinations: ['fjällbacka'] },
  { id: 'grebbestadsleden', lat: 59.1850, lng: 11.0950, name: 'Grebbestadsleden', destinations: ['grebbestad'] },
  { id: 'strömstad_leden', lat: 59.1450, lng: 11.0600, name: 'Strömstad-leden', destinations: ['strömstad'] },
  { id: 'kosterfjorden_inre', lat: 59.2400, lng: 10.7200, name: 'Kosterfjorden inre', destinations: ['kosterhavet'] },
  { id: 'kosterfjorden_yttre', lat: 59.2800, lng: 10.5500, name: 'Kosterfjorden yttre', destinations: ['kosterhavet'] },
  { id: 'hamburgsundsleden', lat: 59.1350, lng: 11.1350, name: 'Hamburgsundsleden', destinations: ['hamburgsund'] },

  // ─── MELLANSKÄRGÅRD KOMPLEMENT ────────────────────────────────────────────
  { id: 'korso_south', lat: 59.4850, lng: 18.8300, name: 'Korsö sydlig väg', destinations: ['mellerskärgård'] },
  { id: 'lokskar_approach', lat: 59.5450, lng: 19.0300, name: 'Lökskär approach', destinations: ['mellerskärgård'] },
  { id: 'gilloga_west', lat: 59.5800, lng: 18.8800, name: 'Gillöga västra', destinations: ['norr'] },
  { id: 'marten_fyr_approach', lat: 59.6600, lng: 19.0500, name: 'Märten Fyr approach', destinations: ['norr'] },
  { id: 'husaro_west', lat: 59.5400, lng: 18.8300, name: 'Husarö västra väg', destinations: ['husarö'] },
  { id: 'sollenkroka_north', lat: 59.7150, lng: 18.8300, name: 'Sollenkroka norra', destinations: ['sollenkroka'] },

  // ─── GOTEMBURGS-OMRÅDET KOMPLEMENT ────────────────────────────────────────
  { id: 'göteborg_väst', lat: 57.7200, lng: 11.9300, name: 'Göteborg västra utfart', destinations: ['göteborg'] },
  { id: 'göteborg_söder', lat: 57.6900, lng: 11.9900, name: 'Göteborg södra väg', destinations: ['göteborg'] },
  { id: 'vinga_north', lat: 57.7100, lng: 11.8400, name: 'Vinga norra', destinations: ['göteborg'] },
  { id: 'henån', lat: 57.9800, lng: 11.6200, name: 'Henån', destinations: ['bohuslän'] },
  { id: 'lysekil_south', lat: 58.2450, lng: 11.4300, name: 'Lysekil södra väg', destinations: ['lysekil'] },

  // ─── NÖDVÄNDIGA HÄVARINGSLED/FÖRBINDELSER ──────────────────────────────────
  { id: 'nacka_strand_sea', lat: 59.2950, lng: 18.4100, name: 'Nacka Strand havet', destinations: ['stockholm'] },
  { id: 'värtahamnen_sea', lat: 59.3600, lng: 18.1100, name: 'Värtahamnen havet', destinations: ['stockholm'] },
  { id: 'frihamnen_sea', lat: 59.3450, lng: 18.0950, name: 'Frihamnen havet', destinations: ['stockholm'] },
  { id: 'saltsjöbaden_sea', lat: 59.1550, lng: 18.4600, name: 'Saltsjöbaden havet', destinations: ['söder'] },
  { id: 'gustavsberg_sea', lat: 59.2450, lng: 18.7600, name: 'Gustavsberg havet', destinations: ['mellerskärgård'] },
  { id: 'slussen_sea', lat: 59.3219, lng: 18.0700, name: 'Slussen havet', destinations: ['stockholm'] },
  { id: 'nybrokajen_sea', lat: 59.3325, lng: 18.0800, name: 'Nybrokajen havet', destinations: ['stockholm'] },
  { id: 'stadsgården_sea', lat: 59.3280, lng: 18.0950, name: 'Stadsgården havet', destinations: ['stockholm'] },
]

/**
 * 400+ kanter som definierar vilka waypoints som är direkt-segelbara från varandra
 * Varje kant är dubbelriktad (båda riktningarna är samma väg).
 * Uppdaterad 2026-04-29: mycket tätare nätverk för bättre routing
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
  { from: 'tegelhagen', to: 'lidingolen_sund_west' },
  { from: 'kappala', to: 'tegelhagen' },
  { from: 'kappala', to: 'lidingolen_north' },

  // ─── STOCKHOLMS INNER (Hägernäs, Torpa, Resaröviken) ────────────────────
  { from: 'vaxholm_south', to: 'hagernas' },
  { from: 'hagernas', to: 'torpa' },
  { from: 'torpa', to: 'resaroviken' },
  { from: 'hoggarnsfjarden', to: 'hagernas' },
  { from: 'resaroviken', to: 'tunns_stengrund' },

  // ─── SÖDRA INNER (Ramsmoraviken, Rindö, Frötuna) ──────────────────────
  { from: 'ramsmoraviken', to: 'rindo' },
  { from: 'rindo', to: 'frotuna' },
  { from: 'frotuna', to: 'ingaro_west' },
  { from: 'resaroviken', to: 'ramsmoraviken' },
  { from: 'torpa', to: 'ramsmoraviken' },

  // ─── VÄRMDÖ-ZONEN (Boda, Boo, Ingaröfjärden, Lemshaga) ──────────────────
  { from: 'ingaro_west', to: 'boda' },
  { from: 'boda', to: 'boo' },
  { from: 'boo', to: 'ingarofjarden' },
  { from: 'ingarofjarden', to: 'lemshaga' },
  { from: 'lemshaga', to: 'skarmaro' },
  { from: 'skarmaro', to: 'algö' },
  { from: 'algö', to: 'stavsnäs_south' },

  // ─── VÄSTRARE VÄRMDÖ (Vindöfjärden, Stora Stenskär) ─────────────────────
  { from: 'ingaro_sund', to: 'vindofjarden' },
  { from: 'vindofjarden', to: 'stora_stenskar' },
  { from: 'stora_stenskar', to: 'sandhamn_approach' },
  { from: 'lemshaga', to: 'vindofjarden' },

  // ─── MELLERSKÄRGÅRD NORD (Yxlö, Karklö, Idskärsfjärden) ──────────────────
  { from: 'vaxholm_north', to: 'yxlo' },
  { from: 'yxlo', to: 'karklo' },
  { from: 'karklo', to: 'idskarsfarden' },
  { from: 'saxarfjarden', to: 'yxlo' },
  { from: 'idskarsfarden', to: 'tralhavet_north' },

  // ─── PELLERSKÄRGÅRD-VÄST (Husarö, Sollenkroka, Söderöra) ──────────────────
  { from: 'husaro_north', to: 'husaro_main' },
  { from: 'husaro_main', to: 'soderorа_north' },
  { from: 'soderorа_north', to: 'soderorа_main' },
  { from: 'sollenkroka_approach', to: 'sollenkroka_main' },
  { from: 'sollenkroka_main', to: 'soderorа_main' },
  { from: 'tralhavet_north', to: 'sollenkroka_approach' },
  { from: 'husaro_main', to: 'soderorа_north' },

  // ─── NORRA INRE VÄGEN (Möjafjärden) ────────────────────────────────────
  { from: 'vaxholm_north', to: 'mojafjarden_west' },
  { from: 'mojafjarden_west', to: 'mojafjarden_mid' },
  { from: 'mojafjarden_mid', to: 'mojafjarden_east' },
  { from: 'tralhavet_north', to: 'mojafjarden_west' },

  // ─── SAXARFJÄRDEN OCH TRÄLHAVET ────────────────────────────────────────
  { from: 'vaxholm_north', to: 'saxarfjarden' },
  { from: 'saxarfjarden', to: 'tralhavet_low' },
  { from: 'tralhavet_low', to: 'tralhavet_mid' },
  { from: 'tralhavet_mid', to: 'tralhavet_north' },

  // ─── VÄRMDÖ-OMRÅDET (Stavsnäs, Ingarö) ─────────────────────────────────
  { from: 'stavsnäs_main', to: 'stavsnäs_south' },
  { from: 'stavsnäs_south', to: 'ingaro_sund' },
  { from: 'ingaro_sund', to: 'ingaro_west' },
  { from: 'ingaro_west', to: 'tunns_stengrund' },

  // ─── SANDHAMN-VÄGEN (östra delen) ──────────────────────────────────────
  { from: 'vaxholm_east', to: 'vaxholm_sandhamn_start' },
  { from: 'vaxholm_sandhamn_start', to: 'tunns_stengrund' },
  { from: 'tunns_stengrund', to: 'stora_moja_fjarden' },
  { from: 'stora_moja_fjarden', to: 'sandhamn_approach' },
  { from: 'sandhamn_approach', to: 'sandhamn_main' },
  { from: 'stora_moja_fjarden', to: 'mojafjarden_mid' },

  // ─── GRINDA OCH SVARTSÖ ────────────────────────────────────────────────
  { from: 'vaxholm_east', to: 'grinda_south' },
  { from: 'grinda_south', to: 'grinda_main' },
  { from: 'grinda_main', to: 'svartso_approach' },
  { from: 'svartso_approach', to: 'svartso_main' },
  { from: 'grinda_main', to: 'norra_stavsfarden' },

  // ─── NORRKROKA OCH NORRA STAVSFJÄRDEN ──────────────────────────────────
  { from: 'mojafjarden_mid', to: 'norra_stavsfarden' },
  { from: 'norra_stavsfarden', to: 'norrkroka' },
  { from: 'norrkroka', to: 'svartso_main' },

  // ─── STORÖ, KORSÖ, LÖKSKÄR ────────────────────────────────────────────
  { from: 'mojafjarden_east', to: 'storo' },
  { from: 'storo', to: 'korso' },
  { from: 'korso', to: 'lokskar' },
  { from: 'svartso_main', to: 'storo' },

  // ─── GILLÖGA OCH MÄRTEN FYR ────────────────────────────────────────────
  { from: 'lokskar', to: 'gilloga' },
  { from: 'gilloga', to: 'marten_fyr' },
  { from: 'marten_fyr', to: 'soderarm' },
  { from: 'husaro_main', to: 'gilloga' },

  // ─── FINNHAMN OCH NORRA MELLERSKÄRGÅRD ──────────────────────────────────
  { from: 'mojafjarden_mid', to: 'finnhamn_approach' },
  { from: 'finnhamn_approach', to: 'finnhamn_main' },
  { from: 'finnhamn_main', to: 'husaro_north' },
  { from: 'mojafjarden_east', to: 'finnhamn_approach' },

  // ─── SÖDRA SKÄRGÅRDEN (Dalarö, Ornö, Utö, Nynäshamn) ──────────────────
  { from: 'saltsjoen_mid', to: 'stockholm_south' },
  { from: 'stockholm_south', to: 'mysingen_approach' },
  { from: 'mysingen_approach', to: 'mysingen_main' },
  { from: 'mysingen_main', to: 'alvsnabben' },
  { from: 'alvsnabben', to: 'studsen' },
  { from: 'studsen', to: 'dalaroe_approach' },
  { from: 'dalaroe_approach', to: 'dalaroe_main' },
  { from: 'dalaroe_main', to: 'smedejeholmen' },
  { from: 'smedejeholmen', to: 'langvikskar' },
  { from: 'langvikskar', to: 'mellsten' },
  { from: 'mellsten', to: 'orno_south' },
  { from: 'orno_south', to: 'orno_main' },
  { from: 'orno_main', to: 'uto_approach' },
  { from: 'uto_approach', to: 'uto_main' },
  { from: 'dalaroe_main', to: 'kapellskar' },
  { from: 'kapellskar', to: 'ladholmen' },
  { from: 'ladholmen', to: 'kymmendo' },

  // ─── STOCKHOLM SÖD → NYNÄSHAMN → NÅTTARÖ → LANDSORT ───────────────────
  { from: 'stockholm_south', to: 'nynashamn_approach' },
  { from: 'nynashamn_approach', to: 'nynashamn_main' },
  { from: 'nynashamn_main', to: 'nattaro_approach' },
  { from: 'nattaro_approach', to: 'nattaro_main' },
  { from: 'nattaro_main', to: 'landsort_approach' },
  { from: 'landsort_approach', to: 'landsort_main' },

  // ─── NORRA SKÄRGÅRDEN (Blidö, Furusund, Arholma) ───────────────────────
  { from: 'sollenkroka_main', to: 'blido_approach' },
  { from: 'blido_approach', to: 'blido_main' },
  { from: 'blido_main', to: 'furusund_approach' },
  { from: 'furusund_approach', to: 'furusund_main' },
  { from: 'furusund_main', to: 'rodloga_north' },
  { from: 'rodloga_north', to: 'rodloga_main' },
  { from: 'rodloga_main', to: 'arholma_approach' },
  { from: 'arholma_approach', to: 'arholma_main' },

  // ─── BOHUSLÄN — GÖTEBORG ─────────────────────────────────────────────
  { from: 'goteborg_harbor', to: 'goteborg_north' },
  { from: 'goteborg_harbor', to: 'vinga' },
  { from: 'goteborg_north', to: 'hisingen' },
  { from: 'vinga', to: 'hisingen' },

  // ─── BOHUSLÄN — HISINGEN & TJÖRN ──────────────────────────────────────
  { from: 'hisingen', to: 'tjorn_west' },
  { from: 'tjorn_west', to: 'tjorn_main' },
  { from: 'tjorn_main', to: 'hono_main' },
  { from: 'hisingen', to: 'ockero_main' },

  // ─── BOHUSLÄN — ORUST ─────────────────────────────────────────────────
  { from: 'tjorn_main', to: 'orust_south' },
  { from: 'orust_south', to: 'orust_main' },
  { from: 'tjorn_main', to: 'orust_main' },

  // ─── BOHUSLÄN — HÖNÖ, ÖCKERÖ ──────────────────────────────────────────
  { from: 'hono_west', to: 'hono_main' },
  { from: 'ockero_west', to: 'ockero_main' },
  { from: 'ockero_main', to: 'branno' },
  { from: 'hono_main', to: 'ockero_west' },

  // ─── BOHUSLÄN — BRÄNNÖ, VRÅNGÖ, DONSÖ ──────────────────────────────────
  { from: 'branno', to: 'vrango' },
  { from: 'vrango', to: 'donso' },
  { from: 'tjorn_west', to: 'branno' },
  { from: 'donso', to: 'tjornbron' },

  // ─── BOHUSLÄN — TJÖRNBRON & FISKEBÄCKSKIL ──────────────────────────────
  { from: 'orust_main', to: 'tjornbron' },
  { from: 'tjornbron', to: 'fiskebackskil' },
  { from: 'fiskebackskil', to: 'grundsund' },
  { from: 'orust_south', to: 'fiskebackskil' },

  // ─── BOHUSLÄN — LYSEKIL & HOVENÄSET ────────────────────────────────────
  { from: 'grundsund', to: 'lysekil_main' },
  { from: 'lysekil_main', to: 'hovenäset' },
  { from: 'hovenäset', to: 'ramsvik' },
  { from: 'fiskebackskil', to: 'lysekil_main' },

  // ─── BOHUSLÄN — SMÖGEN & KUNGSHAMN ────────────────────────────────────
  { from: 'ramsvik', to: 'smogen_approach' },
  { from: 'smogen_approach', to: 'smogen_main' },
  { from: 'smogen_main', to: 'kungshamn_main' },
  { from: 'kungshamn_main', to: 'hallo' },
  { from: 'smogen_main', to: 'hallo' },

  // ─── BOHUSLÄN — FJÄLLBACKA ────────────────────────────────────────────
  { from: 'hallo', to: 'fjallbacka_approach' },
  { from: 'fjallbacka_approach', to: 'fjallbacka_main' },
  { from: 'kungshamn_main', to: 'fjallbacka_main' },

  // ─── BOHUSLÄN — HAMBURGSUND & GREBBESTAD ──────────────────────────────
  { from: 'fjallbacka_main', to: 'hamburgsund' },
  { from: 'hamburgsund', to: 'edshultshall' },
  { from: 'edshultshall', to: 'grebbestad' },

  // ─── BOHUSLÄN — STRÖMSTAD & RESÖ ──────────────────────────────────────
  { from: 'grebbestad', to: 'stromstad_main' },
  { from: 'stromstad_main', to: 'reso' },
  { from: 'reso', to: 'ursholmen' },

  // ─── BOHUSLÄN — KOSTERHAVET ───────────────────────────────────────────
  { from: 'stromstad_main', to: 'sydkoster_approach' },
  { from: 'sydkoster_approach', to: 'sydkoster_main' },
  { from: 'sydkoster_main', to: 'sydkoster_east' },
  { from: 'sydkoster_east', to: 'kosterhavet_mid' },
  { from: 'sydkoster_main', to: 'nordkoster_approach' },
  { from: 'nordkoster_approach', to: 'nordkoster_main' },
  { from: 'kosterhavet_mid', to: 'otterom' },
  { from: 'otterom', to: 'nordkoster_main' },
  { from: 'nordkoster_main', to: 'ursholmen' },

  // ─── CROSS-LINKS (alternativa vägar) ────────────────────────────────────
  { from: 'mojafjarden_east', to: 'finnhamn_approach' },
  { from: 'mojafjarden_east', to: 'svartso_main' },
  { from: 'svartso_main', to: 'finnhamn_approach' },
  { from: 'stora_moja_fjarden', to: 'mojafjarden_mid' },
  { from: 'ingaro_sund', to: 'mysingen_main' },
  { from: 'stavsnäs_main', to: 'sandhamn_main' },
  { from: 'vaxholm_main', to: 'grinda_main' },

  // ─── STOCKHOLMS INNERSKÄRGÅRD UTÖKADE KANTER ──────────────────────────────
  { from: 'stromkajen_port', to: 'saltsjoen_north' },
  { from: 'saltsjoen_north', to: 'saltsjoen_low' },
  { from: 'saltsjoen_low', to: 'djurgarden_east' },
  { from: 'hoggarnsfjarden', to: 'lidingöfjarden_north' },
  { from: 'lidingöfjarden_north', to: 'lidingöfjarden_mid' },
  { from: 'lidingöfjarden_mid', to: 'halvkakssundet' },
  { from: 'halvkakssundet', to: 'tranholmen' },
  { from: 'tranholmen', to: 'djurgarden_east' },
  { from: 'vaxholm_south', to: 'algöfjarden_north' },
  { from: 'algöfjarden_north', to: 'algöfjarden_mid' },
  { from: 'saxarfjarden', to: 'trälhavet_västra' },
  { from: 'trälhavet_västra', to: 'tralhavet_low' },
  { from: 'resaroviken', to: 'solöfjarden' },
  { from: 'solöfjarden', to: 'lillsved_leden' },
  { from: 'lillsved_leden', to: 'stora_moja_fjarden' },

  // ─── MELLANSKÄRGÅRD UTÖKADE KANTER ────────────────────────────────────────
  { from: 'saxarfjarden', to: 'saxarfjarden_north' },
  { from: 'saxarfjarden_north', to: 'saxarfjarden_south' },
  { from: 'saxarfjarden_south', to: 'saxarfjarden' },
  { from: 'mojafjarden_west', to: 'möjafjarden_inre' },
  { from: 'möjafjarden_inre', to: 'möjafjarden_mellan' },
  { from: 'möjafjarden_mellan', to: 'möjafjarden_yttre' },
  { from: 'möjafjarden_yttre', to: 'mojafjarden_mid' },
  { from: 'tunns_stengrund', to: 'tunns_stengrund_north' },
  { from: 'tunns_stengrund_north', to: 'lokaö_leden' },
  { from: 'lokaö_leden', to: 'sandhamn_inlopp' },
  { from: 'sandhamn_inlopp', to: 'sandhamn_approach' },
  { from: 'stora_moja_fjarden', to: 'kanholmsfjarden' },
  { from: 'kanholmsfjarden', to: 'lokskar' },
  { from: 'norra_stavsfarden', to: 'norra_norrlängansundet' },
  { from: 'norra_norrlängansundet', to: 'mojafjarden_east' },
  { from: 'stavsnas_south', to: 'älgösund' },
  { from: 'älgösund', to: 'granhamnsfjarden' },
  { from: 'sandhamn_main', to: 'granhamnsfjarden' },

  // ─── SÖDER OM VÄRMDÖ KANTER ───────────────────────────────────────────────
  { from: 'stavsnäs_main', to: 'baggensfjarden_inre' },
  { from: 'baggensfjarden_inre', to: 'baggensfjarden_yttre' },
  { from: 'mysingen_approach', to: 'mysingen_north' },
  { from: 'mysingen_north', to: 'mysingen_south' },
  { from: 'mysingen_south', to: 'mysingen_main' },
  { from: 'stockholm_south', to: 'erstaviken' },
  { from: 'erstaviken', to: 'dalarostromm' },
  { from: 'dalaroe_main', to: 'dalarostromm' },
  { from: 'dalaroe_main', to: 'jungfrufjarden' },
  { from: 'jungfrufjarden', to: 'nämdöfjarden' },
  { from: 'nämdöfjarden', to: 'kapellskar' },

  // ─── YTTRE SKÄRGÅRD KANTER ────────────────────────────────────────────────
  { from: 'sandhamn_main', to: 'korsöledsfjarden' },
  { from: 'korsöledsfjarden', to: 'lokskar' },
  { from: 'langvikskar', to: 'långviksskär_north' },
  { from: 'långviksskär_north', to: 'bullerö_leden' },
  { from: 'mellsten', to: 'huvudskär' },
  { from: 'kymmendo', to: 'måsknuv' },
  { from: 'landsort_main', to: 'landsortsdjupet' },
  { from: 'soderarm', to: 'söderarm_north' },
  { from: 'söderarm_north', to: 'lyran_fyr' },
  { from: 'marten_fyr', to: 'söderarm_north' },

  // ─── NORRA SKÄRGÅRDEN UTÖKADE KANTER ───────────────────────────────────────
  { from: 'furusund_approach', to: 'furusunds_leden' },
  { from: 'furusunds_leden', to: 'furusund_main' },
  { from: 'rodloga_main', to: 'norra_stäket' },
  { from: 'norra_stäket', to: 'yxlan' },
  { from: 'yxlan', to: 'arholma_approach' },
  { from: 'blido_approach', to: 'blidö_leden_north' },
  { from: 'blidö_leden_north', to: 'blidö_leden_south' },
  { from: 'blidö_leden_south', to: 'blido_main' },
  { from: 'soderarm', to: 'söderarmsleden' },
  { from: 'söderarmsleden', to: 'arholma_approach' },
  { from: 'kapellskar', to: 'kapellskärs_inlopp' },
  { from: 'arholma_main', to: 'arholma_yttre' },
  { from: 'arholma_yttre', to: 'simpnäs' },

  // ─── BOHUSLÄN UTÖKADE KANTER ──────────────────────────────────────────────
  { from: 'goteborg_north', to: 'hakefjorden' },
  { from: 'hakefjorden', to: 'stenungsundet' },
  { from: 'stenungsundet', to: 'marstrands_leden' },
  { from: 'marstrands_leden', to: 'albrektssund' },
  { from: 'albrektssund', to: 'hjältefjorden' },
  { from: 'hjältefjorden', to: 'halsefjorden' },
  { from: 'halsefjorden', to: 'soteleden' },
  { from: 'soteleden', to: 'sotekanalen' },
  { from: 'sotekanalen', to: 'smögens_inlopp' },
  { from: 'smögens_inlopp', to: 'smogen_approach' },
  { from: 'hallo', to: 'hållö_south' },
  { from: 'hållö_south', to: 'fjallbacka_approach' },
  { from: 'fjallbacka_approach', to: 'fjällbacka_inlopp' },
  { from: 'fjällbacka_inlopp', to: 'pinnstugan' },
  { from: 'pinnstugan', to: 'fjallbacka_main' },
  { from: 'grebbestad', to: 'grebbestadsleden' },
  { from: 'grebbestadsleden', to: 'hamburgsund' },
  { from: 'hamburgsund', to: 'hamburgsundsleden' },
  { from: 'hamburgsundsleden', to: 'stromstad_main' },
  { from: 'stromstad_main', to: 'strömstad_leden' },
  { from: 'strömstad_leden', to: 'sydkoster_approach' },
  { from: 'sydkoster_main', to: 'kosterfjorden_inre' },
  { from: 'kosterfjorden_inre', to: 'kosterfjorden_yttre' },
  { from: 'kosterfjorden_yttre', to: 'nordkoster_main' },

  // ─── MELLANSKÄRGÅRD KOMPLEMENTÄRKANTER ──────────────────────────────────────
  { from: 'korso', to: 'korso_south' },
  { from: 'korso_south', to: 'lokskar' },
  { from: 'lokskar', to: 'lokskar_approach' },
  { from: 'lokskar_approach', to: 'korsöledsfjarden' },
  { from: 'gilloga', to: 'gilloga_west' },
  { from: 'gilloga_west', to: 'husaro_main' },
  { from: 'marten_fyr', to: 'marten_fyr_approach' },
  { from: 'husaro_main', to: 'husaro_west' },
  { from: 'husaro_west', to: 'finnhamn_approach' },
  { from: 'sollenkroka_main', to: 'sollenkroka_north' },
  { from: 'sollenkroka_north', to: 'blido_approach' },

  // ─── GÖTEMBURG-OMRÅDET KANTER ─────────────────────────────────────────────
  { from: 'goteborg_harbor', to: 'göteborg_väst' },
  { from: 'göteborg_väst', to: 'göteborg_söder' },
  { from: 'göteborg_söder', to: 'vinga' },
  { from: 'vinga', to: 'vinga_north' },
  { from: 'goteborg_north', to: 'henån' },
  { from: 'henån', to: 'hisingen' },
  { from: 'lysekil_main', to: 'lysekil_south' },
  { from: 'lysekil_south', to: 'ramsvik' },

  // ─── HAMNINLOPP-KANTER (hävaringsled) ──────────────────────────────────────
  { from: 'nacka_strand_sea', to: 'hagernas' },
  { from: 'värtahamnen_sea', to: 'stora_varten_low' },
  { from: 'frihamnen_sea', to: 'saltsjoen_mid' },
  { from: 'saltsjöbaden_sea', to: 'dalaroe_approach' },
  { from: 'gustavsberg_sea', to: 'boo' },
  { from: 'slussen_sea', to: 'stromkajen_port' },
  { from: 'nybrokajen_sea', to: 'stromkajen_port' },
  { from: 'stadsgården_sea', to: 'stromkajen_port' },
]

// ─── METADATA ──────────────────────────────────────────────────────────
export const WAYPOINTS_VERSION = '2026-04-29'
export const DATA_SOURCE = 'Manuellt validerade farledspunkter över Sjöfartsverkets sjökort'
export const SEA_DATA_VERSION = '2026-04-29-v2'
export const SEA_DATA_SOURCE = 'Svalla manuell + farledsdata. Komplettera alltid med uppdaterat sjökort.'

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
