/**
 * Organisationen bakom en källa i källistan på ösidan (faktagranskningen, mallarnas runda 6, 2026-11-16; Redaktörens
 * tillägg 12 efter slutomkontrollen).
 *
 * Källistan grupperar sidorna per avsändare och skriver "32 sidor hos 19 källor, varav 5 myndighet eller kommun"
 * (src/components/IslandKallor.tsx). Avsändaren kommer ur KÄLLA-raden, eller ur domänen när raden inte namnger någon,
 * så samma organisation kunde stå som två källor: "catalog.lansstyrelsen.se" och "Länsstyrelsen Stockholm" på
 * Fjäderholmarna (MÄTT av Kontrollanten), "varmdo.se" och "Värmdö kommun" på Möja, "haninge.se" och
 * "utoskola.haninge.se" på Utö. Här slås varianterna ihop innan källor och myndigheter räknas.
 *
 * Regeln:
 *  1. Nyckeln är den registrerbara domänen (utoskola.haninge.se → haninge.se, catalog.lansstyrelsen.se → lansstyrelsen.se).
 *     Undantag där värden delas av flera organisationer: kund.printhuset-sthlm.se är Waxholmsbolaget (/wa/) eller SL (/sl/),
 *     vtstorage*.blob.core.windows.net är Västtrafik. Länsstyrelserna skiljs åt per län (sökvägens första led eller länet i
 *     avsändarnamnet); en länsstyrelsekälla utan län räknas till öns län när ön bara har ett.
 *  2. Namnet för gruppen: har alla sidor samma namn står det kvar. Annars länsstyrelsens namn med län ("Länsstyrelsen
 *     Stockholm"); för Waxholmsbolaget, SL och Västtrafik operatörens namn; ett myndighets- eller kommunnamn om någon
 *     sida i gruppen har ett ("Värmdö kommun"); avsändarnamnet om gruppen bara har ett namn utöver domäner ("Furusund
 *     Hamn"); annars den registrerbara domänen ("kungalv.se").
 *
 * Ren JavaScript så att scripts/generera-kallor.mjs kan läsa den utan byggsteg; testet ligger i src/lib/kallorOrg.test.ts.
 */

const LAN = {
  stockholm: 'Stockholm', 'vastra-gotaland': 'Västra Götaland', gotland: 'Gotland',
  kalmar: 'Kalmar län', blekinge: 'Blekinge', skane: 'Skåne',
  vasternorrland: 'Västernorrland', vasterbotten: 'Västerbotten',
  sodermanland: 'Södermanland', uppsala: 'Uppsala län', norrbotten: 'Norrbotten',
  halland: 'Halland', ostergotland: 'Östergötland',
}
const LAN_NAMN = Object.values(LAN)

/** Operatörer vars sidor ligger på en delad värd, med namnet som står för gruppen. */
const OPERATOR = { 'waxholmsbolaget.se': 'Waxholmsbolaget', 'sl.se': 'SL', 'vasttrafik.se': 'Västtrafik' }

/** Ett namn som säger att avsändaren är en myndighet, en kommun eller en region. */
const MYNDIGHETSNAMN = /kommun\b|\bstad\b|länsstyrelse|\bregion\b|verket\b|ämbetet\b|\bSCB\b|\bSMHI\b|lantmäteriet|sveriges nationalparker/i

const ARDOMAN = /^[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i

/**
 * Den registrerbara domänen: de två sista leden (haninge.se, gotland.com), tre för co.uk och liknande.
 * @param {string} host
 * @returns {string}
 */
export function registrerbarDoman(host) {
  const delar = host.toLowerCase().replace(/^www\./, '').split('.')
  const tva = /^(?:co|com|org|net|ac|gov)$/.test(delar[delar.length - 2] ?? '') && (delar[delar.length - 1] ?? '').length === 2
  return delar.slice(tva ? -3 : -2).join('.')
}

/**
 * Länet för en länsstyrelsekälla: sökvägens första led (lansstyrelsen.se/stockholm/…) eller länet i namnet.
 * @param {URL} u
 * @param {string} org
 * @returns {string | null}
 */
function lanFor(u, org) {
  const host = u.hostname.replace(/^www\./, '')
  if (host === 'lansstyrelsen.se' || host === 'ext-dokument.lansstyrelsen.se') {
    const lan = LAN[u.pathname.split('/').filter(Boolean)[0] ?? '']
    if (lan) return lan
  }
  return LAN_NAMN.find(l => org.includes(l)) ?? null
}

/**
 * Organisationsnyckeln för en källa (utan hänsyn till öns övriga källor).
 * @param {string} url
 * @param {string} org
 * @returns {{ nyckel: string, lan: string | null }}
 */
export function orgNyckel(url, org = '') {
  let u
  try { u = new URL(url) } catch { return { nyckel: org.toLowerCase(), lan: null } }
  const host = u.hostname.toLowerCase().replace(/^www\./, '')
  if (host === 'kund.printhuset-sthlm.se') {
    if (u.pathname.startsWith('/wa/')) return { nyckel: 'waxholmsbolaget.se', lan: null }
    if (u.pathname.startsWith('/sl/')) return { nyckel: 'sl.se', lan: null }
    return { nyckel: host, lan: null }
  }
  if (host.endsWith('.blob.core.windows.net')) return { nyckel: host.startsWith('vtstorage') ? 'vasttrafik.se' : host, lan: null }
  const doman = registrerbarDoman(host)
  if (doman === 'lansstyrelsen.se') {
    const lan = lanFor(u, org)
    return { nyckel: lan ? `lansstyrelsen.se|${lan}` : 'lansstyrelsen.se', lan }
  }
  return { nyckel: doman, lan: null }
}

/**
 * Öns källor med ett gemensamt avsändarnamn för varianter av samma organisation. Ordningen och alla andra fält står kvar.
 * @template {{ url: string, org: string }} K
 * @param {K[]} kallor
 * @returns {K[]}
 */
export function slaIhopOrganisationer(kallor) {
  const nycklar = kallor.map(k => orgNyckel(k.url, k.org))
  // En länsstyrelsekälla utan län hör till öns län när ön bara har ett.
  const lanen = [...new Set(nycklar.filter(n => n.lan).map(n => n.nyckel))]
  const nyckelAv = nycklar.map(n => (n.nyckel === 'lansstyrelsen.se' && lanen.length === 1 ? lanen[0] : n.nyckel))
  const grupper = new Map()
  kallor.forEach((k, i) => {
    const n = nyckelAv[i]
    if (!grupper.has(n)) grupper.set(n, [])
    grupper.get(n).push(k.org)
  })
  const namn = new Map()
  for (const [nyckel, orgs] of grupper) namn.set(nyckel, gruppnamn(nyckel, orgs))
  return kallor.map((k, i) => ({ ...k, org: namn.get(nyckelAv[i]) }))
}

/**
 * @param {string} nyckel
 * @param {string[]} orgs
 * @returns {string}
 */
function gruppnamn(nyckel, orgs) {
  const [doman, lan] = nyckel.split('|')
  const unika = [...new Set(orgs)]
  if (unika.length === 1) return unika[0]
  if (doman === 'lansstyrelsen.se') return lan ? `Länsstyrelsen ${lan}` : 'Länsstyrelsen'
  if (OPERATOR[doman]) return OPERATOR[doman]
  const myndighet = vanligast(unika.filter(o => !ARDOMAN.test(o) && MYNDIGHETSNAMN.test(o)), orgs)
  if (myndighet) return myndighet
  const egennamn = unika.filter(o => !ARDOMAN.test(o))
  if (egennamn.length === 1) return egennamn[0]
  return doman
}

/**
 * Det namn bland kandidaterna som flest sidor har, vid lika det kortaste.
 * @param {string[]} kandidater
 * @param {string[]} alla
 * @returns {string | undefined}
 */
function vanligast(kandidater, alla) {
  return [...kandidater].sort((a, b) => alla.filter(o => o === b).length - alla.filter(o => o === a).length || a.length - b.length)[0]
}
