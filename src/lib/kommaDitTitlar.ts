/**
 * Egna sidtitlar för /o/[slug]/komma-dit (2026-10-04).
 *
 * Varför: komma-dit-sidorna ligger på plats 6–10 i Google med nästan ingen
 * klickfrekvens. Search Console (28 dagar till 2026-10-03) visar att folk
 * söker på färdsättet och hamnen, inte på frågan:
 *   Käringön  936 visningar, 5 klick, pos 8,5: "käringön färja", "färja till
 *             käringön", "färja käringön tuvesvik", "båt till käringön"
 *   Ornö      275 visningar, 0 klick, pos 9,6: "ornö färja", "dalarö ornö färja"
 *   Brännö    285 visningar, 3 klick, pos 8,3: "färja till brännö", "saltholmen brännö"
 *   Storholmen 248 visningar, 8 klick, pos 8,6: "båt till storholmen",
 *             "pendelbåt 80 ropsten"
 * Den gemensamma titeln ("Hur tar man sig till X? — Båt, buss, färja 2026")
 * nämner varken hamnen eller rätt färdsätt, och påstår buss även där ingen
 * buss finns i öns data.
 *
 * Regel: varje titel bygger bara på öns egna, källbelagda uppgifter i
 * island-data (getting_there och facts.travel_time). Hamnen i titeln måste
 * finnas där – det kontrolleras i kommaDitTitlar.test.ts. Öar som saknas här
 * behåller den gemensamma titeln.
 *
 * Frasen "hur tar man sig dit" och året finns kvar i varje titel, så att
 * inga sökord från den gamla titeln faller bort utom "buss" där öns data
 * inte har någon buss.
 */
export const KOMMA_DIT_TITLAR: Record<string, { titel: string; hamn: string }> = {
  karingon: { titel: 'Båt och färja till Käringön från Tuvesvik: hur tar man sig dit 2026', hamn: 'Tuvesvik' },
  vrango: { titel: 'Färja till Vrångö: båt 281 från Saltholmen: hur tar man sig dit 2026', hamn: 'Saltholmen' },
  branno: { titel: 'Färja till Brännö från Saltholmen: hur tar man sig dit 2026', hamn: 'Saltholmen' },
  orno: { titel: 'Färja till Ornö från Dalarö: bilfärja och båt, hur tar man sig dit 2026', hamn: 'Dalarö' },
  // KÄLLA: https://lidingo.se/trafik-infrastruktur/ta-dig-fram/batpendla/ — "Pendelbåtslinjen 80 trafikerar sträckan Ropsten-Nybroplan", "Vissa avgångar fortsätter från Ropsten till Storholmen." (läst 2026-10-29)
  storholmen: { titel: 'Båt till Storholmen: pendelbåt 80 från Ropsten: hur tar man sig dit 2026', hamn: 'Ropsten' },
  ingmarso: { titel: 'Båt till Ingmarsö från Strömkajen och Åsättra: hur tar man sig dit 2026', hamn: 'Åsättra' },
  bullero: { titel: 'Båt till Bullerö från Stavsnäs: Bullerölinjen, hur tar man sig dit 2026', hamn: 'Stavsnäs' },
  yxlan: { titel: 'Färja till Yxlan från Furusund: bil, buss och båt: hur tar man sig dit 2026', hamn: 'Furusund' },
  svartso: { titel: 'Båt till Svartsö från Strömkajen: hur tar man sig dit 2026', hamn: 'Strömkajen' },
  runmaro: { titel: 'Båt till Runmarö från Stavsnäs: hur tar man sig dit 2026', hamn: 'Stavsnäs' },
  gullholmen: { titel: 'Färja till Gullholmen från Tuvesvik: hur tar man sig dit 2026', hamn: 'Tuvesvik' },
  moja: { titel: 'Båt till Möja från Sollenkroka och Strömkajen: hur tar man sig dit 2026', hamn: 'Sollenkroka' },
  birka: { titel: 'Båt till Birka från Stockholm: hur tar man sig dit 2026', hamn: 'Stockholm' },
}

/** Färdsätt som går över vattnet: båt, färja, rederi eller en namngiven båtlinje. */
const BAT = /båt|färj|rederi|linjen|waxholmsbolaget|strömma/i

/**
 * Går färdsättet från orten själv? from börjar med ortens namn och följs inte av en bokstav ("Hamburgsund", "Grebbestad,
 * gästhamnen"), så Hamburgsunds linfärja och Grebbestads taxibåt tar en inte dit. Flyttad hit från komma-dit/page.tsx
 * (mall-0166 omarbete 3) för att titeln ska använda samma test (runda 10, sm07-k009).
 */
export function franOrten(namn: string, fran?: string): boolean {
  const f = (fran ?? '').trim()
  return Boolean(f && f.toLowerCase().startsWith(namn.toLowerCase()) && !/[a-zåäö]/i.test(f.charAt(namn.length)))
}

/** Har något av öns färdsätt (getting_there.method) båt eller färja? */
export function harBat(fardsatt: string[]): boolean {
  return fardsatt.some(m => BAT.test(m))
}

/**
 * Gemensam titel för öar utan egen titel. "Båt, buss, färja" stod på alla sådana
 * öar, även utan buss (Fjäderholmarna) och utan färja (2026-11-02, mall-0160–0161).
 * "Båt" stod också på de 16 öar som nås med bil och buss över bro eller tunnel
 * (Öland, Tjörn, Dalarö m.fl.; 2026-11-02, mall-0160–0161 omarbete).
 */
export function kommaDitTitel(slug: string, namn: string, fardsatt: string[] = []): string {
  const egen = KOMMA_DIT_TITLAR[slug]?.titel
  if (egen) return egen
  const satt = harBat(fardsatt)
    ? 'Båt och resväg'
    : fardsatt.some(m => /buss/i.test(m)) && fardsatt.some(m => /bil/i.test(m)) ? 'Bil och buss' : 'Resväg'
  return `Hur tar man sig till ${namn}? ${satt} 2026`
}
