/**
 * revision 2026-10-02: tester för ferries.ts (P2-8).
 *
 * Inga nätverksanrop. Global fetch byts mot en stub som ger ett FAST svar per
 * test och sparar frågans URL. Stubben härmar inte ResRobot: products=256 är
 * en ny sökning hos ResRobot (HAFAS), inte ett filter på ett annat svar. Här
 * testas bara (1) att frågan ser rätt ut och (2) att ett givet svar tolkas
 * rätt.
 *
 * Resorna är inspelade natten till 2026-10-03 från produktionen och här
 * tillbakaskrivna till ResRobots råformat (Trip → LegList → Leg → Product):
 *   - Grinda, linje 12 och 13: /api/ferries.
 *   - Operatörsnamn och Stavsnäs båttaxi: /api/transit/departures.
 * catCode och cls finns inte i inspelningen, eftersom våra API:er inte skickar
 * vidare dem. Värdena här (catCode "8", cls "256") kommer från Trafiklabs
 * dokumentation (trafiklab.se/api/our-apis/resrobot-v21/common/, läst
 * 2026-10-02). Datumet är bytt mot "i morgon" så att testerna inte åldras.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { TripLeg, TripSummary } from './trafiklab'

vi.mock('./logger', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}))

const I_MORGON = new Date(Date.now() + 86_400_000)
  .toLocaleDateString('sv-SE', { timeZone: 'Europe/Stockholm' })

// ── Råformat ───────────────────────────────────────────────────────────────

type Produkt = { operator: string; line: string; catOutL: string; catCode?: string | number; cls?: string | number }

const aka = (p: Produkt, fran: string, franTid: string, till: string, tillTid: string) => ({
  type: 'JNY',
  Origin: { name: fran, time: `${franTid}:00`, date: I_MORGON },
  Destination: { name: till, time: `${tillTid}:00`, date: I_MORGON },
  Product: [p],
})
const resa = (...ben: ReturnType<typeof aka>[]) => ({ LegList: { Leg: ben } })

const wxbFarja = (linje: string): Produkt =>
  ({ operator: 'Waxholmsbolaget', line: linje, catOutL: 'Länstrafik färja', catCode: '8' })

const STROMKAJEN = 'Stockholm Strömkajen'
const GRINDA_N = 'Grinda Norra bryggan (Värmdö kn)'
const GRINDA_S = 'Grinda Södra bryggan (Värmdö kn)'

/** Inspelat från /api/ferries: Strömkajen → Grinda, direktbåtar. */
const GRINDA_FARJOR = [
  resa(aka(wxbFarja('12'), STROMKAJEN, '08:30', GRINDA_N, '10:20')),
  resa(aka(wxbFarja('13'), STROMKAJEN, '08:35', GRINDA_S, '10:25')),
]

// ── Normaliserat format (för valjFarjeavgangar) ────────────────────────────

const ben = (operator: string, category: string, extra: Partial<TripLeg> = {}): TripLeg => ({
  category, operator, line: '12', isWalk: false, catCode: '8',
  fromName: STROMKAJEN, fromTime: '08:30', toName: GRINDA_N, toTime: '10:20',
  ...extra,
})
const sammanfattning = (...legs: TripLeg[]): TripSummary => ({
  durationMin: 110, startTime: legs[0]!.fromTime, startDate: I_MORGON,
  endTime: legs[legs.length - 1]!.toTime, changes: legs.length - 1, legs, allLegs: legs,
})

const WXB_BEN = ben('Waxholmsbolaget', 'Länstrafik färja')
const SL_BEN = ben('Storstockholms Lokaltrafik ', 'Länstrafik färja') // sic: blanksteg som i datan
/** Inspelat från /api/transit/departures?dest=sandhamn (catCode enligt dokumentationen). */
const BATTAXI_BEN = ben('Stavsnäs båttaxi', 'Färjetrafik - övrigt', {
  line: '103', fromName: 'Stavsnäs vinterhamn (Värmdö kn)', fromTime: '10:10',
  toName: 'Sandhamn brygga (Värmdö kn)', toTime: '10:40',
})

// ── Stub och modulladdning ─────────────────────────────────────────────────

type Svar = { status?: number; body: unknown; raText?: boolean } | Error

function stubba(svar: (url: URL) => Svar) {
  const anrop: URL[] = []
  const fn = vi.fn(async (input: unknown) => {
    const url = new URL(String(input))
    anrop.push(url)
    const s = svar(url)
    if (s instanceof Error) throw s
    const kropp = s.raText ? String(s.body) : JSON.stringify(s.body)
    return new Response(kropp, { status: s.status ?? 200 })
  })
  vi.stubGlobal('fetch', fn)
  return { anrop, fn }
}

/** Färsk modul (tomma modul-cachar) med given nyckel. */
async function ladda(nyckel = 'testnyckel') {
  vi.resetModules()
  vi.stubEnv('TRAFIKLAB_RESROBOT_KEY', nyckel)
  vi.stubEnv('TRAFIKLAB_API_KEY', '')
  const ferries = await import('./ferries')
  const trafiklab = await import('./trafiklab')
  const rutt = (id: string) => {
    const r = ferries.SEED_FERRY_ROUTES.find(x => x.id === id)
    if (!r) throw new Error(`rutt saknas: ${id}`)
    return r
  }
  return { ...ferries, fetchTripsResult: trafiklab.fetchTripsResult, rutt }
}

const timeoutFel = () => new DOMException('The operation was aborted due to timeout', 'TimeoutError')

let varningar: ReturnType<typeof vi.spyOn>
beforeEach(() => {
  // ferries.ts loggar ResRobots errorCode med console.warn; tyst i testerna men kontrollerbar.
  varningar = vi.spyOn(console, 'warn').mockImplementation(() => {})
})

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

// ── Frågan ─────────────────────────────────────────────────────────────────

describe('frågan till ResRobot', () => {
  it('varje rutt frågar med sina låsta id, products=256 och numF=6, utan namnuppslag', async () => {
    const f = stubba(() => ({ body: { errorCode: 'SVC_NO_RESULT' } }))
    const { fetchDeparturesResult, SEED_FERRY_ROUTES, HALLPLATS_ID } = await ladda()
    for (const r of SEED_FERRY_ROUTES) await fetchDeparturesResult(r, 3)

    expect(f.anrop.every(u => u.pathname.endsWith('/trip'))).toBe(true)
    expect(f.anrop).toHaveLength(SEED_FERRY_ROUTES.length)
    for (const r of SEED_FERRY_ROUTES) {
      const id = HALLPLATS_ID[r.id]!
      const u = f.anrop.find(x => x.searchParams.get('originId') === id.fran && x.searchParams.get('destId') === id.till)
      expect(u, r.id).toBeDefined()
      expect(u?.searchParams.get('products')).toBe('256')
      expect(u?.searchParams.get('numF')).toBe('6')
    }
  })

  it('alla rutter har låsta id; Strandvägen är Stockholms och Sollenkroka är bryggan', async () => {
    const { SEED_FERRY_ROUTES, HALLPLATS_ID } = await ladda()
    for (const r of SEED_FERRY_ROUTES) {
      expect(HALLPLATS_ID[r.id]?.fran, r.id).toMatch(/^7400\d{5}$/)
      expect(HALLPLATS_ID[r.id]?.till, r.id).toMatch(/^7400\d{5}$/)
    }
    // Uppmätt via /api/transit/stop-lookup 2026-10-03: första träffen var fel hållplats.
    expect(HALLPLATS_ID['cinderella-sandhamn']?.fran).toBe('740046034') // inte 740069094, Botkyrka
    expect(HALLPLATS_ID['wxb-moja']?.fran).toBe('740001309') // inte 740045674, Sollenkroka by
    expect(HALLPLATS_ID['wxb-moja']?.till).toBe('740024316') // Berg brygga, kortets sista stopp
  })
})

// ── Tolkningen ─────────────────────────────────────────────────────────────

describe('tolkning av svaret', () => {
  it('Grinda: inspelade färjeresor blir avgångar med rätt tid, linje och brygga', async () => {
    stubba(() => ({ body: { Trip: GRINDA_FARJOR } }))
    const { fetchDeparturesResult, rutt } = await ladda()
    const { departures, fel } = await fetchDeparturesResult(rutt('wxb-grinda'), 3)
    expect(fel).toBeNull()
    expect(departures.map(d => [d.time, d.arrival, d.line, d.from, d.to, d.changes])).toEqual([
      [`${I_MORGON}T08:30`, '10:20', '12', STROMKAJEN, GRINDA_N, 0],
      [`${I_MORGON}T08:35`, '10:25', '13', STROMKAJEN, GRINDA_S, 0],
    ])
    expect(departures.every(d => d.source === 'live' && d.operator === 'Waxholmsbolaget')).toBe(true)
  })

  it('båt avgörs av catCode/cls, inte av kategoritexten', async () => {
    const { arBatben } = await ladda()
    expect(arBatben(ben('x', 'Färjetrafik - övrigt', { catCode: '8' }))).toBe(true)
    expect(arBatben(ben('x', 'vad som helst', { catCode: undefined, cls: '256' }))).toBe(true)
    expect(arBatben(ben('x', 'Länstrafik färja', { catCode: '7' }))).toBe(false) // syntetiskt: texten ljuger
    expect(arBatben(ben('x', 'Länstrafik färja', { catCode: undefined }))).toBeNull()
  })

  it('catCode och cls blir strängar även när ResRobot skickar tal', async () => {
    stubba(() => ({ body: { Trip: [resa(aka({ ...wxbFarja('12'), catCode: 8, cls: 256 }, STROMKAJEN, '08:30', GRINDA_N, '10:20'))] } }))
    const { fetchTripsResult } = await ladda()
    const { trips } = await fetchTripsResult('740020691', '740098471', 6)
    expect(trips[0]?.legs[0]).toMatchObject({ catCode: '8', cls: '256' })
  })

  it('ben utan både catCode och cls: api_fel, inte "inga avgångar"', async () => {
    const utanKod = resa(aka({ operator: 'Waxholmsbolaget', line: '12', catOutL: 'Länstrafik färja' }, STROMKAJEN, '08:30', GRINDA_N, '10:20'))
    stubba(() => ({ body: { Trip: [utanKod] } }))
    const { fetchDeparturesResult, rutt } = await ladda()
    expect(await fetchDeparturesResult(rutt('wxb-grinda'), 3)).toEqual({ departures: [], fel: 'api_fel' })
  })

  it('resor utan något båtben trots products=256 → api_fel, inte tyst tomt (granskningens S1, S2)', async () => {
    const { fetchDeparturesResult, rutt } = await ladda()
    // S1: catCode finns men med oväntat värde (6 = spårvagn), cls saknas.
    stubba(() => ({ body: { Trip: [resa(aka({ ...wxbFarja('12'), catCode: '6' }, STROMKAJEN, '08:30', GRINDA_N, '10:20'))] } }))
    expect(await fetchDeparturesResult(rutt('wxb-grinda'), 3)).toEqual({ departures: [], fel: 'api_fel' })
    // S2: en SL-buss, som om products hade ignorerats.
    const buss: Produkt = { operator: 'Storstockholms Lokaltrafik ', line: '670', catOutL: 'Länstrafik buss', catCode: '7', cls: '128' }
    stubba(() => ({ body: { Trip: [resa(aka(buss, STROMKAJEN, '08:30', GRINDA_N, '10:20'))] } }))
    const { fetchDeparturesResult: f2, rutt: r2 } = await ladda()
    expect(await f2(r2('wxb-grinda'), 3)).toEqual({ departures: [], fel: 'api_fel' })
  })

  it('båtar finns men ingen passar kortets operatör → äkta tomt (fel: null)', async () => {
    stubba(() => ({ body: { Trip: GRINDA_FARJOR } }))
    const { fetchDeparturesResult, rutt } = await ladda()
    expect(await fetchDeparturesResult(rutt('cinderella-sandhamn'), 3)).toEqual({ departures: [], fel: null })
  })

  it('inställda resor och resor utan datum räknas inte; count är ett tak', async () => {
    const { valjFarjeavgangar, rutt } = await ladda()
    const r = rutt('wxb-grinda')
    const t = sammanfattning(WXB_BEN)
    expect(valjFarjeavgangar(r, [{ ...t, cancelled: true }], 3)).toEqual([])
    expect(valjFarjeavgangar(r, [{ ...t, startDate: '' }], 3)).toEqual([])
    expect(valjFarjeavgangar(r, [t, t, t], 2)).toHaveLength(2)
  })
})

// ── Operatörsvakterna ──────────────────────────────────────────────────────

describe('operatörsvakter', () => {
  it('Waxholmsbolagets kort tar länstrafikens namn: "Waxholmsbolaget" och "Storstockholms Lokaltrafik "', async () => {
    const { valjFarjeavgangar, rutt } = await ladda()
    const r = rutt('wxb-grinda')
    expect(valjFarjeavgangar(r, [sammanfattning(WXB_BEN)], 3)).toHaveLength(1)
    expect(valjFarjeavgangar(r, [sammanfattning(SL_BEN)], 3)).toHaveLength(1)
  })

  it('namnen jämförs som prefix utan skiftläge: "Waxholmsbolaget AB" döljs inte (granskningens S4)', async () => {
    const { valjFarjeavgangar, rutt } = await ladda()
    const r = rutt('wxb-grinda')
    for (const op of ['Waxholmsbolaget AB', 'WAXHOLMSBOLAGET', 'storstockholms lokaltrafik', 'SL']) {
      expect(valjFarjeavgangar(r, [sammanfattning(ben(op, 'Länstrafik färja'))], 3), op).toHaveLength(1)
    }
    for (const op of ['Waxholmsbolagets vänner', 'SLM Båtar', 'Stavsnäs båttaxi']) {
      expect(valjFarjeavgangar(r, [sammanfattning(ben(op, 'Länstrafik färja'))], 3), op).toEqual([])
    }
  })

  it('privat båt (Stavsnäs båttaxi) visas inte under Waxholmsbolaget, inte ens som ett av flera ben', async () => {
    const { valjFarjeavgangar, rutt } = await ladda()
    const r = rutt('wxb-grinda')
    expect(valjFarjeavgangar(r, [sammanfattning(BATTAXI_BEN)], 3)).toEqual([])
    expect(valjFarjeavgangar(r, [sammanfattning(WXB_BEN, BATTAXI_BEN)], 3)).toEqual([])
  })

  it('Cinderella-kortet tar varken Waxholmsbolaget eller Stavsnäs båttaxi', async () => {
    const { valjFarjeavgangar, rutt } = await ladda()
    const r = rutt('cinderella-sandhamn')
    expect(valjFarjeavgangar(r, [sammanfattning(WXB_BEN), sammanfattning(BATTAXI_BEN)], 3)).toEqual([])
    // Syntetiskt: Cinderellas operatörsnamn i ResRobot är inte uppmätt.
    expect(valjFarjeavgangar(r, [sammanfattning(ben('Strömma Turism & Sjöfart AB', 'Färjetrafik - övrigt'))], 3)).toHaveLength(1)
  })
})

// ── errorCode → fel ────────────────────────────────────────────────────────

describe('errorCode → fel (trafiklab.se/api/our-apis/resrobot-v21/error-codes/)', () => {
  const fall: Array<[string, number, unknown, string | null, boolean?]> = [
    ['SVC_NO_RESULT', 200, { errorCode: 'SVC_NO_RESULT' }, null],
    ['SVC_FAILED_SEARCH', 500, { errorCode: 'SVC_FAILED_SEARCH' }, 'api_fel'],
    ['SVC_NO_MATCH', 422, { errorCode: 'SVC_NO_MATCH' }, 'api_fel'],
    ['API_QUOTA', 400, { errorCode: 'API_QUOTA' }, 'kvot'],
    ['API_TOO_MANY_REQUESTS', 429, { errorCode: 'API_TOO_MANY_REQUESTS' }, 'kvot'],
    ['429 utan kropp', 429, '', 'kvot', true],
    ['SVC_PROD', 400, { errorCode: 'SVC_PROD' }, 'api_fel'],
    ['API_AUTH', 403, { errorCode: 'API_AUTH' }, 'api_fel'],
    ['INT_GATEWAY', 503, { errorCode: 'INT_GATEWAY' }, 'api_fel'],
    ['502 med HTML', 502, '<html>Bad Gateway</html>', 'api_fel', true],
  ]
  for (const [namn, status, body, vantat, raText] of fall) {
    it(`${namn} (HTTP ${status}) → ${vantat ?? 'null (inga resor)'}`, async () => {
      stubba(() => ({ status, body, raText }))
      const { fetchDeparturesResult, rutt } = await ladda()
      expect(await fetchDeparturesResult(rutt('wxb-grinda'), 3)).toEqual({ departures: [], fel: vantat })
    })
  }

  it('SVC_FAILED_SEARCH på alla rutter ger felruta på alla kort, inte "Ingen båtavgång hittad" (granskningens S3)', async () => {
    stubba(() => ({ status: 500, body: { errorCode: 'SVC_FAILED_SEARCH', errorText: 'unsuccessful search' } }))
    const { fetchDeparturesResult, SEED_FERRY_ROUTES } = await ladda()
    const svar = await Promise.all(SEED_FERRY_ROUTES.map(r => fetchDeparturesResult(r, 3)))
    expect(svar.every(x => x.fel === 'api_fel' && x.departures.length === 0)).toBe(true)
  })

  it('errorCode loggas med console.warn även när den ger fel: null', async () => {
    stubba(() => ({ body: { errorCode: 'SVC_NO_RESULT' } }))
    const { fetchDeparturesResult, rutt } = await ladda()
    expect(await fetchDeparturesResult(rutt('cinderella-sandhamn'), 3)).toEqual({ departures: [], fel: null })
    expect(varningar).toHaveBeenCalledWith('[ferries] ResRobot errorCode',
      { routeId: 'cinderella-sandhamn', errorCode: 'SVC_NO_RESULT', fel: null })
  })

  it('tidsgräns → timeout', async () => {
    stubba(() => timeoutFel())
    const { fetchDeparturesResult, rutt } = await ladda()
    expect(await fetchDeparturesResult(rutt('wxb-grinda'), 3)).toEqual({ departures: [], fel: 'timeout' })
  })

  it('saknad nyckel → ingen_nyckel, och inget anrop görs', async () => {
    const f = stubba(() => ({ body: { Trip: GRINDA_FARJOR } }))
    const { fetchDeparturesResult, rutt } = await ladda('')
    expect(await fetchDeparturesResult(rutt('wxb-grinda'), 3)).toEqual({ departures: [], fel: 'ingen_nyckel' })
    expect(f.fn).not.toHaveBeenCalled()
  })

  it('rutt utan låsta id → stopp_saknas, och inget anrop görs', async () => {
    const f = stubba(() => ({ body: { Trip: GRINDA_FARJOR } }))
    const { fetchDeparturesResult, rutt } = await ladda()
    const okand = { ...rutt('wxb-grinda'), id: 'finns-inte' }
    expect(await fetchDeparturesResult(okand, 3)).toEqual({ departures: [], fel: 'stopp_saknas' })
    expect(f.fn).not.toHaveBeenCalled()
  })
})

// ── Bakåtkompatibilitet ────────────────────────────────────────────────────

describe('bakåtkompatibilitet', () => {
  it('fetchDepartures och fetchLiveDepartures returnerar fortfarande bara listan', async () => {
    stubba(() => ({ body: { Trip: GRINDA_FARJOR } }))
    const { fetchDepartures, fetchLiveDepartures, rutt } = await ladda()
    expect((await fetchDepartures(rutt('wxb-grinda'), 3)).map(d => d.line)).toEqual(['12', '13'])
    expect((await fetchLiveDepartures(rutt('wxb-grinda'), 3)).map(d => d.line)).toEqual(['12', '13'])
  })

  it('transit-lagret: utan filter inget products, och fel klassas som förut (errorCode skickas bara med)', async () => {
    const f = stubba(() => ({ status: 500, body: { errorCode: 'SVC_FAILED_SEARCH' } }))
    const { fetchTripsResult } = await ladda()
    expect(await fetchTripsResult('740020691', '740098471', 4)).toEqual({ trips: [], fel: 'api_fel', errorCode: 'SVC_FAILED_SEARCH' })
    expect(f.anrop[0]?.searchParams.has('products')).toBe(false)
  })

  it('filtret ingår i cachenyckeln: båtsökning och allt-sökning delar inte cache', async () => {
    const f = stubba(() => ({ body: { Trip: GRINDA_FARJOR } }))
    const { fetchTripsResult } = await ladda()
    const fran = { date: I_MORGON, time: '06:00' }
    await fetchTripsResult('740020691', '740098471', 6, fran)
    await fetchTripsResult('740020691', '740098471', 6, fran)
    await fetchTripsResult('740020691', '740098471', 6, fran, { products: 256 })
    expect(f.anrop).toHaveLength(2)
    expect(f.anrop.map(u => u.searchParams.get('products'))).toEqual([null, '256'])
  })

  it('operatorWebbplats ger domänen ur infoUrl', async () => {
    const { operatorWebbplats, rutt } = await ladda()
    expect(operatorWebbplats(rutt('wxb-vaxholm'))).toBe('waxholmsbolaget.se')
    expect(operatorWebbplats(rutt('cinderella-sandhamn'))).toBe('stromma.com')
  })
})
