/**
 * Verifierade farbara passager — smala sund som öppnats punktvis i
 * kustlinjemasken därför att de är smalare än rastrets upplösning.
 *
 * Datat ligger i src/lib/data/farbara-passager.json och läses av TVÅ håll:
 *   scripts/build-land-raster.mjs  öppnar dem i rastret
 *   den här filen                  visar begränsningarna för användaren
 *
 * VARFÖR DET HÄR BEHÖVS: rasteriseringen kan bara säga vatten eller land. Den
 * kan inte säga "farbar men bara till 3 meters djupgående". När vi öppnade
 * Baggensstäket och Knapens hål (PR #139) började vi rita en sjöled genom ett
 * sund där lodningar visar 2,8–2,9 m — utan att säga det. En segelbåt med
 * 3,5 m djupgående kommer inte igenom. Rutten såg alltså MER pålitlig ut än
 * den var, vilket är precis det fel vi försöker bort ifrån.
 */
import data from './data/farbara-passager.json'

/**
 * Öppningsbar bro över passagen.
 *
 * VARFÖR EGET FÄLT: utan det blir segelfriHojdM lögnaktig åt andra hållet.
 * Stäketbron har 2,7 m segelfri höjd vid STÄNGD bro, men den är en svängbro
 * som öppnas varje hel timme hela säsongen. Skrev vi bara "segelfri höjd
 * 2,7 m" skulle varje segelbåt tro att Stäketsundet är stängt för dem — och
 * då hade vi bytt ut ett för optimistiskt påstående mot ett för pessimistiskt.
 * Båda är fel. Höjden gäller, men bara tills man ringer brovakten.
 */
export type OppningsbarBro = {
  namn: string
  oppettider: string
  kontakt: string
}

export type Passage = {
  namn: string
  kalla: string
  breddM: number
  /** Största djupgående passagen tar, i meter. null = ingen känd begränsning. */
  maxDjupM: number | null
  /** Segelfri höjd i meter. null = ingen känd begränsning. */
  segelfriHojdM: number | null
  /** Finns bron? Då gäller segelfriHojdM bara vid stängd bro. */
  oppningsbarBro?: OppningsbarBro | null
  mittlinje: Array<[number, number]>
}

export const PASSAGER: Passage[] = (data.passager as Passage[])

/** Meter mellan två punkter. */
function meter(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const R = 6371000, rad = Math.PI / 180
  const dLat = (bLat - aLat) * rad, dLng = (bLng - aLng) * rad
  const s = Math.sin(dLat / 2) ** 2 +
    Math.cos(aLat * rad) * Math.cos(bLat * rad) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(s))
}

/**
 * Vilka passager med kända begränsningar passerar rutten?
 *
 * Tröskeln 250 m är generös med flit: hellre visa en varning för en rutt som
 * går strax förbi, än att tiga om en som går rakt igenom. Passager utan
 * begränsning (Skurusundet) rapporteras inte — det finns inget att varna för.
 */
export function passagerLangsRutt(
  path: Array<[number, number]> | null,
): Passage[] {
  if (!path || path.length < 2) return []
  const TROSKEL_M = 250
  const traffar: Passage[] = []
  for (const p of PASSAGER) {
    if (p.maxDjupM == null && p.segelfriHojdM == null) continue
    const nara = p.mittlinje.some(([mLat, mLng]) =>
      path.some(([lat, lng]) => meter(lat, lng, mLat, mLng) < TROSKEL_M))
    if (nara) traffar.push(p)
  }
  return traffar
}

/**
 * Den slimmade form som skickas till klienten.
 *
 * Hela Passage innehåller mittlinjen — 27 koordinatpar bara för Skurusundet —
 * plus källhänvisningen. Inget av det behöver webbläsaren, och /api/route/
 * calculate anropas vid varje ruttvisning. Skicka bara det gränssnittet ska
 * visa.
 */
export type PassageForKlient = {
  namn: string
  maxDjupM: number | null
  segelfriHojdM: number | null
  oppningsbarBro: OppningsbarBro | null
}

export function tillKlient(p: Passage): PassageForKlient {
  return {
    namn: p.namn,
    maxDjupM: p.maxDjupM,
    segelfriHojdM: p.segelfriHojdM,
    oppningsbarBro: p.oppningsbarBro ?? null,
  }
}
