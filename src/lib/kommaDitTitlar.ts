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
  karingon: { titel: 'Båt och färja till Käringön från Tuvesvik – hur tar man sig dit 2026', hamn: 'Tuvesvik' },
  vrango: { titel: 'Färja till Vrångö: båt 281 från Saltholmen – hur tar man sig dit 2026', hamn: 'Saltholmen' },
  branno: { titel: 'Färja till Brännö från Saltholmen – hur tar man sig dit 2026', hamn: 'Saltholmen' },
  orno: { titel: 'Färja till Ornö från Dalarö – bilfärja och båt, hur tar man sig dit 2026', hamn: 'Dalarö' },
  storholmen: { titel: 'Båt till Storholmen: pendelbåt 80 från Ropsten – hur tar man sig dit 2026', hamn: 'Ropsten' },
  ingmarso: { titel: 'Båt till Ingmarsö från Strömkajen och Åsättra – hur tar man sig dit 2026', hamn: 'Åsättra' },
  bullero: { titel: 'Båt till Bullerö från Stavsnäs – Bullerölinjen, hur tar man sig dit 2026', hamn: 'Stavsnäs' },
  yxlan: { titel: 'Färja till Yxlan från Furusund – bil, buss och båt: hur tar man sig dit 2026', hamn: 'Furusund' },
  svartso: { titel: 'Båt till Svartsö från Strömkajen – hur tar man sig dit 2026', hamn: 'Strömkajen' },
  runmaro: { titel: 'Båt till Runmarö från Stavsnäs – hur tar man sig dit 2026', hamn: 'Stavsnäs' },
  gullholmen: { titel: 'Färja till Gullholmen från Tuvesvik – hur tar man sig dit 2026', hamn: 'Tuvesvik' },
  moja: { titel: 'Båt till Möja från Sollenkroka och Strömkajen – hur tar man sig dit 2026', hamn: 'Sollenkroka' },
  birka: { titel: 'Båt till Birka från Stockholm – hur tar man sig dit 2026', hamn: 'Stockholm' },
}

/** Gemensam titel för öar utan egen titel (oförändrad sedan tidigare). */
export function kommaDitTitel(slug: string, namn: string): string {
  return KOMMA_DIT_TITLAR[slug]?.titel ?? `Hur tar man sig till ${namn}? — Båt, buss, färja 2026`
}
