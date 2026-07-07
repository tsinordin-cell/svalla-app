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
  'midsommar-skargarden-2026':        ['sandhamn', 'grinda', 'fjaderholmarna', 'vaxholm'],
  'sandhamn-vs-grinda':               ['sandhamn', 'grinda'],
  'grinda-vs-finnhamn':               ['grinda', 'finnhamn'],
  'basta-oar-stockholms-skargard':    ['sandhamn', 'grinda', 'uto', 'fjaderholmarna', 'finnhamn', 'moja', 'arholma'],
  'weekend-i-skargarden':             ['sandhamn', 'grinda', 'finnhamn', 'uto'],
  'romantisk-weekend-skargarden':     ['sandhamn', 'grinda', 'uto'],
  'foretagsevent-skargarden':         ['fjaderholmarna', 'grinda'],
  'pingst-skargarden':                ['sandhamn', 'fjaderholmarna', 'vaxholm'],
  'naturhamnar-guide':                ['sandhamn', 'finnhamn', 'moja', 'arholma'],
  'solnedgang-skargarden':            ['sandhamn', 'grinda', 'uto'],
  'stockholm-archipelago-trail':      ['arholma', 'ingmarso'],
  'norrtelje-guide':                  ['arholma', 'ingmarso'],
  'juni-skargarden-2026':             ['sandhamn', 'grinda', 'moja', 'arholma'],
  'folkfria-oar-juli':                ['arholma', 'moja', 'namdo'],
  'oktober-skargarden':               ['sandhamn', 'moja', 'arholma'],
  'ankra-sova-bat':                   ['moja', 'finnhamn', 'arholma'],
  'skargard-solo':                    ['moja', 'arholma', 'namdo'],
  'skargard-seniorer':                ['vaxholm', 'fjaderholmarna'],
  'batsaerhet-guide':                 ['vaxholm', 'sandhamn'],
  'skargard-pa-budget':               ['grinda', 'fjaderholmarna', 'uto'],
  'skargard-tillganglighet':          ['vaxholm', 'fjaderholmarna'],
  'vattensport-guide':                ['moja', 'sandhamn', 'vaxholm'],
  'fagelskadning-skargarden':         ['arholma', 'namdo', 'landsort'],
  'snorkling-stockholm':              ['landsort', 'arholma'],
  'nacka-skargard-guide':             ['fjaderholmarna', 'vaxholm'],
  'varmdo-guide':                     ['moja', 'ingmarso'],
  // ── Stockholm: ö-guider ───────────────────────────────────────────────────
  'fjaderholmarna-guide':             ['fjaderholmarna'],
  'vaxholm-guide-komplett':           ['vaxholm'],
  'landsort-guide':                   ['landsort'],
  'ingmarso-guide':                   ['ingmarso'],
  'arholma-guide':                    ['arholma'],
  'moja-guide':                       ['moja'],
  'grinda-guide':                     ['grinda'],
  'finnhamn-guide':                   ['finnhamn'],
  'nattaro-guide':                    ['nattaro'],
  'orno-guide':                       ['orno'],
  'dalaro-guide':                     ['orno', 'uto'],
  'ljustero-guide':                   ['ljustero'],
  'runmaro-guide':                    ['runmaro'],
  'blido-guide':                      ['blido'],
  'svartloga-guide':                  ['arholma', 'moja'],
  // ── Stockholm: aktivitet/praktisk ─────────────────────────────────────────
  'barplockning-skargarden':          ['moja', 'orno', 'nattaro'],
  'svampplockning-skargarden':        ['moja', 'orno', 'ingmarso'],
  'fiske-host':                       ['moja', 'orno', 'nattaro'],
  'vandring-host-skargard':           ['moja', 'arholma', 'orno'],
  'restauranger-havsvy-stockholm':    ['fjaderholmarna', 'sandhamn'],
  // Batch H – transaktionella Stockholm
  'hyra-bat-utan-korkort-stockholm':  ['fjaderholmarna', 'vaxholm'],
  'aw-pa-bat-stockholm':              ['fjaderholmarna'],
  'konferens-skargard-stockholm':     ['grinda', 'finnhamn'],
  'kajak-vaxholm':                    ['vaxholm'],
  'hyra-kajak-stockholm':             ['fjaderholmarna', 'vaxholm'],
  'hyra-elektrisk-bat-stockholm':     ['fjaderholmarna'],
  'glamping-skargard':                ['grinda', 'uto'],
  'segeldag-foretag-stockholm':       ['sandhamn', 'vaxholm'],
  'teambuilding-kajak-stockholm':     ['vaxholm', 'fjaderholmarna'],
  'kursgard-skargard-stockholm':      ['grinda', 'finnhamn'],
  'kickoff-ideer-skargard':           ['grinda', 'fjaderholmarna', 'vaxholm'],
  'workshop-skargard-stockholm':      ['grinda', 'vaxholm'],
  'teambuilding-skargard-stockholm':  ['grinda', 'fjaderholmarna', 'vaxholm'],
  'segelkurs-stockholm':              ['sandhamn', 'vaxholm'],
  'yttre-garden-guide':               ['yttre-garden'],
  // ── Gotland ───────────────────────────────────────────────────────────────
  'gotland-guide':                    ['gotland'],
  'cykeluthyrning-gotland':           ['gotland'],
  'flyga-till-gotland':               ['gotland'],
  'hyra-bil-gotland':                 ['gotland'],
  'hyra-husbil-gotland':              ['gotland'],
  'vinter-gotland-2026':              ['gotland'],
  'gotland-vs-bornholm':              ['gotland'],
  'gotland-vs-oland':                 ['gotland', 'oland'],
  // ── Öland ─────────────────────────────────────────────────────────────────
  'oland-guide':                      ['oland'],
  'host-oland-2026':                  ['oland'],
  'vinter-oland-2026':                ['oland'],
  'badplatser-oland':                 ['oland'],
  'barnfamilj-oland':                 ['oland'],
  'vandring-oland':                   ['oland'],
  'hyra-stuga-oland':                 ['oland'],
  'hyra-bil-oland':                   ['oland'],
  'camping-oland':                    ['oland'],
  'mat-oland':                        ['oland'],
  // ── Höga Kusten ───────────────────────────────────────────────────────────
  'hoga-kusten-guide':                ['ulvon'],
  'surstrommning-guide':              ['ulvon'],
  'kajak-hoga-kusten':                ['ulvon'],
  'vandring-skuleskogen':             ['ulvon'],
  'barnfamilj-hoga-kusten':           ['ulvon'],
  'camping-hoga-kusten':              ['ulvon'],
  'host-hoga-kusten-2026':            ['ulvon'],
  'trysunda-guide':                   ['ulvon'],
  // ── Göteborg sydskärgård & Bohuslän ──────────────────────────────────────
  'hyra-bat-goteborg':                ['styrso', 'branno', 'vrango', 'donso'],
  'aw-pa-bat-goteborg':               ['styrso', 'branno'],
  'teambuilding-goteborg-skargard':   ['styrso', 'branno', 'vrango'],
  'segelkurs-goteborg':               ['styrso', 'vrango'],
  'konferens-bohuslan':               ['styrso', 'branno'],
  'hyra-bat-marstrand':               ['styrso', 'branno'],
  'hyra-kajak-bohuslan':              ['styrso', 'branno', 'vrango'],
  'bohuslan-skargard-guide':          ['styrso', 'branno', 'vrango', 'donso'],
  'bohuslan-vs-hoga-kusten':          ['styrso', 'branno', 'ulvon'],
  'vinter-bohuslan-2026':             ['styrso', 'branno'],
  'hummersafari-bohuslan':            ['styrso', 'vrango'],
  'midsommar-bohuslan':               ['styrso', 'branno'],
  'hyra-stuga-marstrand-bohuslan':    ['styrso', 'branno'],
  'dagstur-marstrand':                ['styrso', 'branno'],
  // ── Jämförelser & tematiska ───────────────────────────────────────────────
  'skargard-vs-fjall':                ['grinda', 'sandhamn'],
  'camping-kust-sverige':             ['uto', 'oland', 'styrso'],
  'nationalparkerna-havet':           ['landsort', 'uto'],
  'vandring-var-kust':                ['moja', 'arholma', 'ulvon'],
  'isbad-vinterbad-sverige':          ['styrso', 'branno'],
  'skargard-med-husbil':              ['oland', 'gotland'],
  'hundstrand-sverige':               ['oland', 'styrso'],
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
