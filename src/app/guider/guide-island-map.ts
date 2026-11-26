/**
 * guide-island-map.ts
 *
 * Dubbelriktad koppling guide ↔ öar.
 * Används av:
 *   - /guider/[slug]/page.tsx  (visa "Utforska öarna" på guidsidan)
 *   - /o/[slug]/page.tsx       (visa "Guider om ön" på ö-sidan)
 *
 * Viktigt: använd BARA island-sluggar som finns i island-data.ts.
 */

export const GUIDE_ISLAND_MAP: Record<string, string[]> = {
  // ── Stockholms skärgård: övergripande ──────────────────────────────────────
  'midsommar-skargarden':        ['sandhamn', 'grinda', 'fjaderholmarna', 'vaxholm', 'donso', 'moja', 'orno'],
  'sandhamn-vs-grinda':               ['sandhamn', 'grinda'],
  'grinda-vs-finnhamn':               ['grinda', 'finnhamn'],
  'basta-oar-stockholms-skargard':    ['sandhamn', 'grinda', 'uto', 'fjaderholmarna', 'finnhamn', 'moja', 'arholma', 'landsort', 'orno'],
  'weekend-i-skargarden':             ['sandhamn', 'grinda', 'finnhamn', 'uto', 'moja'],
  'romantisk-weekend-skargarden':     ['sandhamn', 'grinda', 'uto'],
  'foretagsevent-skargarden':         ['grinda'],
  'pingst-skargarden':                ['sandhamn', 'fjaderholmarna', 'vaxholm'],
  'naturhamnar-guide':                ['finnhamn', 'moja'],
  'solnedgang-skargarden':            ['sandhamn', 'grinda'],
  'stockholm-archipelago-trail':      ['arholma', 'ingmarso', 'landsort', 'moja', 'orno'],
  'norrtelje-guide':                  ['arholma'],
  'juni-skargarden':             ['grinda', 'moja', 'arholma'],
  'folkfria-oar-juli':                ['arholma', 'moja'],
  'julbord-skargarden':               ['sandhamn', 'uto', 'vaxholm', 'fjaderholmarna', 'donso', 'marstrand'],
  'vintertrafik-skargarden':          ['moja', 'norrora', 'sandhamn', 'husaro', 'rodloga', 'ulvon'],
  'oktober-skargarden':               ['sandhamn', 'moja', 'arholma'],
  'skargard-solo':                    ['moja', 'namdo'],
  'skargard-seniorer':                ['vaxholm'],
  'skargard-pa-budget':               ['fjaderholmarna'],
  'skargard-tillganglighet':          ['vaxholm', 'styrso', 'vrango'],
  'vattensport-guide':                ['vaxholm'],
  'fagelskadning-skargarden':         ['arholma', 'namdo', 'landsort'],
  'snorkling-stockholm':              ['nattaro'],
  'varmdo-guide':                     ['moja'],
  // ── Stockholm: ö-guider ───────────────────────────────────────────────────
  'fjaderholmarna-guide':             ['fjaderholmarna'],
  'vaxholm-guide-komplett':           ['vaxholm'],
  'landsort-guide':                   ['landsort'],
  'ingmarso-guide':                   ['ingmarso'],
  'arholma-guide':                    ['arholma'],
  'moja-guide':                       ['moja'],
  'grinda-guide':                     ['grinda'],
  'finnhamn-guide':                   ['finnhamn', 'ingmarso'],
  'nattaro-guide':                    ['nattaro'],
  'orno-guide':                       ['orno'],
  'dalaro-guide':                     ['orno', 'uto'],
  'ljustero-guide':                   ['ljustero', 'ingmarso'],
  'runmaro-guide':                    ['runmaro'],
  'blido-guide':                      ['blido'],
  // ── Stockholm: aktivitet/praktisk ─────────────────────────────────────────
  'barplockning-skargarden':          ['nattaro'],
  'svampplockning-skargarden':        ['moja'],
  'vandring-host-skargard':           ['arholma'],
  'restauranger-havsvy-stockholm':    ['fjaderholmarna', 'sandhamn'],
  // Batch H – transaktionella Stockholm
  'aw-pa-bat-stockholm':              ['fjaderholmarna'],
  'konferens-skargard-stockholm':     ['grinda'],
  'kajak-vaxholm':                    ['vaxholm'],
  'hyra-kajak-stockholm':             ['vaxholm'],
  'glamping-skargard':                ['grinda', 'uto'],
  'segeldag-foretag-stockholm':       ['sandhamn', 'vaxholm'],
  'kursgard-skargard-stockholm':      ['grinda', 'finnhamn', 'arholma'],
  'kickoff-ideer-skargard':           ['grinda', 'vaxholm'],
  'workshop-skargard-stockholm':      ['grinda', 'vaxholm'],
  'teambuilding-skargard-stockholm':  ['grinda', 'vaxholm'],
  'segelkurs-stockholm':              ['sandhamn', 'vaxholm'],
  'yttre-garden-guide':               ['yttre-garden'],
  // ── Gotland ───────────────────────────────────────────────────────────────
  'gotland-guide':                    ['gotland'],
  'cykeluthyrning-gotland':           ['gotland'],
  'flyga-till-gotland':               ['gotland'],
  'hyra-bil-gotland':                 ['gotland'],
  'hyra-husbil-gotland':              ['gotland'],
  'vinter-gotland':              ['gotland'],
  'gotland-vs-bornholm':              ['gotland'],
  'gotland-vs-oland':                 ['gotland', 'oland'],
  // ── Öland ─────────────────────────────────────────────────────────────────
  'oland-guide':                      ['oland'],
  'host-oland':                  ['oland'],
  'vinter-oland':                ['oland'],
  'badplatser-oland':                 ['oland'],
  'barnfamilj-oland':                 ['oland'],
  'vandring-oland':                   ['oland'],
  'hyra-stuga-oland':                 ['oland'],
  'hyra-bil-oland':                   ['oland'],
  'camping-oland':                    ['oland'],
  'mat-oland':                        ['oland'],
  // ── Höga Kusten ───────────────────────────────────────────────────────────
  'surstrommning-guide':              ['ulvon'],
  'kajak-hoga-kusten':                ['ulvon'],
  'vandring-skuleskogen':             ['ulvon'],
  'barnfamilj-hoga-kusten':           ['ulvon'],
  'camping-hoga-kusten':              ['ulvon'],
  'trysunda-guide':                   ['ulvon'],
  // ── Göteborg sydskärgård & Bohuslän ──────────────────────────────────────
  'hyra-bat-goteborg':                ['styrso', 'branno', 'vrango', 'donso'],
  'aw-pa-bat-goteborg':               ['styrso', 'branno', 'vrango'],
  'teambuilding-goteborg-skargard':   ['styrso'],
  'bohuslan-vs-hoga-kusten':          ['ulvon'],
  'midsommar-bohuslan':               ['vrango'],
  // ── Jämförelser & tematiska ───────────────────────────────────────────────
  'skargard-vs-fjall':                ['grinda'],
  'camping-kust-sverige':             ['oland'],
  'skargard-med-husbil':              ['oland', 'gotland'],
  'hundstrand-sverige':               ['oland'],
  // ── Tillagda 2026-11-02 (faktagranskningen mall-0103) ─────────────────────
  // Rubriken på ösidan är "Guider som tar upp <ö>". 84 kopplingar där guiden
  // inte nämner ön togs bort; i stället står guider som nämner ön minst två
  // gånger (flest omnämnanden först, högst lika många som ön förlorade).
  '20-bastustallen-skargarden-boka': ['namdo'],
  'bad-med-bastu-skargarden':       ['finnhamn', 'uto'],
  'barnfamilj-skargarden':          ['branno', 'styrso', 'vrango'],
  'barnfamilj-stockholms-skargard': ['arholma', 'fjaderholmarna'],
  'barnvanliga-bad-skargarden':     ['fjaderholmarna'],
  'barnvanliga-batresor-skargarden': ['fjaderholmarna'],
  'barnvanliga-oar-bohuslan':       ['styrso'],
  'barnvanliga-restauranger-skargarden': ['fjaderholmarna'],
  'basta-badplatser-bohuslan':      ['styrso'],
  'camping-stockholm-skargard':     ['finnhamn'],
  'camping-talta-skargarden':       ['arholma'],
  'cykling-skargarden':             ['ingmarso', 'moja', 'uto'],
  'havsbastu-skargarden':           ['sandhamn'],
  'host-roslagen':                  ['arholma'],
  'host-stockholms-skargard':       ['moja'],
  'hund-i-skargarden':              ['sandhamn'],
  'hund-skargarden':                ['moja'],
  'island-hopping-stockholms-skargard': ['fjaderholmarna', 'grinda', 'vaxholm'],
  'jul-skargarden':                 ['sandhamn'],
  'juli-skargarden-mat':            ['fjaderholmarna'],
  'juli-skargarden-oar':            ['orno'],
  'kraftskiva-skargarden':          ['fjaderholmarna'],
  'november-skargard':              ['arholma', 'branno', 'styrso', 'vrango'],
  'sandhamn-komplett-guide':        ['sandhamn'],
  'semestervecka-skargarden':       ['moja'],
  'sjomatkrogar-guide':             ['fjaderholmarna'],
  'skargard-instagramguide':        ['arholma'],
  'skargard-utan-bat':              ['vaxholm'],
  'sl-kort-skargarden':             ['vaxholm'],
  'sommarlov-skargarden-barn':      ['fjaderholmarna'],
  'surstrommingspremiar':           ['ulvon'],
  'ulvon-guide':                    ['ulvon'],
  'uto-komplett-guide':             ['uto'],
  'uto-vs-sandhamn':                ['sandhamn', 'uto'],
  'var-stockholms-skargard':        ['fjaderholmarna'],
  'waxholmsbolaget-guide':          ['vaxholm'],
  'weekendresa-host-havet':         ['branno', 'styrso'],
}

/**
 * Returnerar alla guide-sluggar som är kopplade till en given ö.
 * Används av ö-sidan för att visa "Guider om den här ön".
 */
export function getGuidesForIsland(islandSlug: string): string[] {
  return Object.entries(GUIDE_ISLAND_MAP)
    .filter(([, islands]) => islands.includes(islandSlug))
    .map(([guideSlug]) => guideSlug)
}
