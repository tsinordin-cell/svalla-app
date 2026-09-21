/**
 * restaurants.archipelago_region är en kod ("north", "bohuslan"). Koden visades
 * rå på platssidorna (rubrik och FAQ) – mätt 2026-09-21. Okänd kod ger null,
 * så att ingen engelsk rådata når besökaren.
 */
export const REGION_LABEL: Record<string, string> = {
  stockholm: 'Stockholms skärgård', north: 'Norra skärgården', middle: 'Mellersta skärgården',
  south: 'Södra skärgården', stockholm_sodra: 'Södra skärgården', inner: 'Innerskärgården',
  outer: 'Ytterskärgården', bohuslan: 'Bohuslän', bohuslan_nord: 'Norra Bohuslän',
  goteborg: 'Göteborgs skärgård', west_coast: 'Västkusten', aland: 'Åland', gotland: 'Gotland',
  oland: 'Öland', blekinge: 'Blekinge', oresund: 'Öresund',
}

export function regionEtikett(kod: string | null | undefined): string | null {
  return kod ? REGION_LABEL[kod] ?? null : null
}
