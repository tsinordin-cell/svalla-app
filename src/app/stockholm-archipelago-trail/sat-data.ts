/**
 * Stockholm Archipelago Trail — etappdata.
 *
 * KÄLLA: stockholmarchipelagotrail.com/section (läst 2026-09-17).
 * Leden är 270 km över 20 öar, uppdelad i 22 etapper, från Arholma i norr
 * till Landsort i söder. Samtliga etapper nås med reguljär skärgårdstrafik.
 *
 * Etapperna listas norr → söder, samma ordning som den officiella sajten.
 * `island` sätts bara när Svalla har en ösida för etappen — annars null.
 */

export type SatDifficulty = 'Lätt' | 'Medel' | 'Krävande'

export type SatSection = {
  /** Etappens namn så som den heter officiellt */
  name: string
  km: number
  difficulty: SatDifficulty
  /** Svallas ö-slug, eller null om vi saknar sida för ön */
  island: string | null
  /** Kort beskrivning — vad som utmärker etappen */
  note?: string
}

export const SAT_TOTAL_KM = 270
export const SAT_ISLANDS = 20
export const SAT_URL = 'https://stockholmarchipelagotrail.com'

export const SAT_SECTIONS: SatSection[] = [
  { name: 'Arholma', km: 13.4, difficulty: 'Medel', island: 'arholma',
    note: 'Ledens nordligaste etapp. Passerar Arholma Båk och naturreservatet mot öppet hav.' },
  { name: 'Lidö', km: 11.9, difficulty: 'Medel', island: 'lido',
    note: 'Godslandskap och den karaktäristiska väderkvarnen.' },
  { name: 'Furusund', km: 7.2, difficulty: 'Medel', island: 'furusund',
    note: 'Kortaste etappen i norr. Gamla badortsvillor längs Furusundsleden.' },
  { name: 'Yxlan', km: 24, difficulty: 'Medel', island: 'yxlan',
    note: 'Ledens längsta sammanhängande etapp efter Ornö.' },
  { name: 'Rodd Finnhamn–Ingmarsö', km: 0.4, difficulty: 'Lätt', island: null,
    note: 'Roddbåtar på var sida om sundet. Du drar båten över själv — och tillbaka åt nästa vandrare.' },
  { name: 'Finnhamn', km: 10.1, difficulty: 'Medel', island: 'finnhamn' },
  { name: 'Ingmarsö', km: 9.8, difficulty: 'Medel', island: 'ingmarso',
    note: 'Öppna betesmarker och blandskog. Kopplar ihop med Finnhamn via roddbåtarna.' },
  { name: 'Brottö', km: 1, difficulty: 'Lätt', island: null,
    note: 'Ledens kortaste etapp.' },
  { name: 'Svartsö', km: 17.9, difficulty: 'Lätt', island: 'svartso',
    note: 'Lång men lätt — den längsta etappen som klassas som lätt.' },
  { name: 'Möja', km: 13.8, difficulty: 'Lätt', island: 'moja' },
  { name: 'Grinda', km: 9.8, difficulty: 'Medel', island: 'grinda' },
  { name: 'Sandhamn', km: 8.1, difficulty: 'Lätt', island: 'sandhamn',
    note: 'Tallskog, sanddyner och Trouvillestranden.' },
  { name: 'Runmarö', km: 18.5, difficulty: 'Medel', island: 'runmaro' },
  { name: 'Nämdö', km: 13.1, difficulty: 'Medel', island: 'namdo' },
  { name: 'Ornö', km: 34.1, difficulty: 'Medel', island: 'orno',
    note: 'Ledens överlägset längsta etapp. Skogsö med utsikt från öns högsta punkt.' },
  { name: 'Fjärdlång', km: 11.7, difficulty: 'Medel', island: 'fjardlang' },
  { name: 'Utö', km: 18.4, difficulty: 'Krävande', island: 'uto',
    note: 'Gruvhistoria, östkust och naturreservat.' },
  { name: 'Utö–Ålö förbindelse', km: 4.6, difficulty: 'Lätt', island: 'uto',
    note: 'Länken mellan Utö och Ålö.' },
  { name: 'Ålö', km: 13.2, difficulty: 'Krävande', island: null },
  { name: 'Rånö', km: 12, difficulty: 'Lätt', island: null },
  { name: 'Nåttarö', km: 9.5, difficulty: 'Krävande', island: 'nattaro',
    note: 'Naturreservat, gammal barrskog och klippor. Ingen service längs leden.' },
  { name: 'Landsort', km: 10.7, difficulty: 'Medel', island: 'landsort',
    note: 'Ledens sydligaste etapp, på Öja med Sveriges äldsta fyrplats.' },
]

/** Sektioner som har en ösida på Svalla */
export const SAT_WITH_ISLAND = SAT_SECTIONS.filter(s => s.island !== null)
