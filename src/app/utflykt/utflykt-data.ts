/**
 * Säsongsdata för dagsplaneraren /utflykt.
 *
 * 2026-09-28: startpunkterna (DEPARTURES) och restidsuppskattningen
 * approximateTravelMinutes (fågelväg / 40 km/h) togs bort härifrån. Vilka öar
 * som nås varifrån avgörs nu i lib/dagsplan.ts av Trafiklab-verifierade
 * hållplatser och ösidans källbelagda "Ta sig dit"; restiden är ösidans egen.
 */

/**
 * Säsong-baserad packlista — vad behövs vid den här tiden på året.
 */
export function packingForSeason(month: number): string[] {
  // Vinter
  if (month <= 2 || month === 12) {
    return [
      'Ordentliga vinterkängor + termobyxor',
      'Mössa + halsduk + vantar (det blåser ute på sjön)',
      'Termoflaska med varmt',
      // UPPSKATTNING: ungefärliga prisnivåer/tider över flera aktörer, ej hämtat per aktör (2026-08)
      'Stark ficklampa — det blir mörkt 15:30',
      'Reservbatteri till mobilen (kyla tar batteri)',
      'Boka boende inomhus — inte alla öar har vinteröppet',
    ]
  }
  // Tidig vår
  if (month >= 3 && month <= 4) {
    return [
      'Vindtät jacka + lager (temperaturen kan svänga 10°C)',
      'Vattentät kängor — leriga stigar',
      'Solglasögon (vårsolen är bländande)',
      'Termoflaska med varmt — ute är det fortfarande svalt',
      'Kolla färjetiderna — många avgångar är glesare än sommartid',
    ]
  }
  // Sommar
  if (month >= 5 && month <= 8) {
    return [
      'Solkräm SPF 30+ (vatten reflekterar)',
      'Solglasögon + keps/hatt',
      'Badkläder + handduk',
      'Vattenflaska (1 L per person)',
      'Myggmedel (juli–augusti)',
      'Lättare regnjacka — vädret kan slå om',
      'Bekväma skor som tål klippor',
    ]
  }
  // Höst
  return [
    'Vindtät + regnjacka',
    'Vatten- och vindtäta skor',
    'Lager du kan ta av (lufttemperaturen växlar)',
    'Termos med varmt',
    'Pannlampa — det skymmer tidigt',
    'Boka — många restauranger stänger efter september',
  ]
}

export function seasonLabel(month: number): string {
  if (month <= 2 || month === 12) return 'Vinter'
  if (month >= 3 && month <= 4) return 'Tidig vår'
  if (month >= 5 && month <= 8) return 'Sommar'
  return 'Höst'
}
