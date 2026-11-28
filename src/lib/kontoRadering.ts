/**
 * Städning av personuppgifter när ett konto raderas.
 *
 * Anropas från POST /api/account/delete. Varje steg är eget: ett fel
 * rapporteras och nästa steg körs ändå, så att kontot fortfarande kan tas bort.
 *
 * PostHog-personen raderas inte. Det kräver en personlig API-nyckel, och
 * någon sådan finns varken i koden eller i .env.local.example.
 */
import * as Sentry from '@sentry/nextjs'
import { logger } from '@/lib/logger'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
/** Supabase Storage listar högst 1000 objekt per anrop. */
const SIDA = 1000
const MAX_SIDOR = 50

export interface RaderingsDb {
  from(tabell: string): {
    delete(): {
      eq(kolumn: string, varde: string): PromiseLike<{ error: { message: string } | null }>
    }
  }
  storage: {
    from(hink: string): {
      list(
        mapp: string,
        opts?: { limit?: number; offset?: number },
      ): PromiseLike<{
        data: { name: string }[] | null
        error: { message: string } | null
      }>
      remove(sokvagar: string[]): PromiseLike<{ error: { message: string } | null }>
    }
  }
}

/** Adressen som den står, och i gemener om de skiljer sig. Tomt om det inte är en adress. */
export function epostAdresser(email: string | null | undefined): string[] {
  if (!email) return []
  const trim = email.trim()
  if (!trim.includes('@')) return []
  const lower = trim.toLowerCase()
  return trim === lower ? [trim] : [trim, lower]
}

async function raderaDar(
  db: RaderingsDb,
  tabell: string,
  kolumn: string,
  varde: string,
): Promise<void> {
  const { error } = await db.from(tabell).delete().eq(kolumn, varde)
  if (error) throw new Error(`${tabell} ${kolumn}: ${error.message}`)
}

/** Kör alla försök. Kastar först när alla är gjorda, om något misslyckades. */
async function alla(steg: Array<() => Promise<void>>): Promise<void> {
  const fel: string[] = []
  for (const kor of steg) {
    try {
      await kor()
    } catch (e) {
      fel.push(e instanceof Error ? e.message : String(e))
    }
  }
  if (fel.length > 0) throw new Error(fel.join('; '))
}

/** Raderar mejlloggens rader för kontot och för adressen. */
export async function raderaEpostlogg(
  db: RaderingsDb,
  userId: string,
  email: string | null | undefined,
): Promise<void> {
  await alla([
    () => raderaDar(db, 'email_log', 'user_id', userId),
    ...epostAdresser(email).map(adress => () => raderaDar(db, 'email_log', 'email', adress)),
  ])
}

/** Tar bort adressen ur nyhetsbrevslistan, både via konto och via adress. */
export async function taBortPrenumerant(
  db: RaderingsDb,
  userId: string,
  email: string | null | undefined,
): Promise<void> {
  await alla([
    () => raderaDar(db, 'email_subscribers', 'user_id', userId),
    ...epostAdresser(email).map(adress => () => raderaDar(db, 'email_subscribers', 'email', adress)),
  ])
}

/**
 * Tar bort filerna i en mapp i en Storage-hink.
 * Listar allt först, så att borttagningen inte förskjuter nästa sida.
 */
export async function raderaLagringsmapp(
  db: RaderingsDb,
  hink: string,
  mapp: string,
): Promise<void> {
  if (!mapp || mapp.startsWith('/') || mapp.includes('..') || mapp.endsWith('/')) {
    throw new Error(`ogiltig sökväg i ${hink}`)
  }
  const storage = db.storage.from(hink)
  const namn: string[] = []
  for (let sida = 0; sida < MAX_SIDOR; sida++) {
    const { data, error } = await storage.list(mapp, { limit: SIDA, offset: sida * SIDA })
    if (error) throw new Error(`${hink} lista: ${error.message}`)
    for (const fil of data ?? []) {
      if (fil.name && fil.name !== '.' && !fil.name.includes('/')) namn.push(fil.name)
    }
    if (!data || data.length < SIDA) break
    if (sida === MAX_SIDOR - 1) throw new Error(`${hink} lista: för många filer`)
  }

  const fel: string[] = []
  for (let i = 0; i < namn.length; i += SIDA) {
    const sokvagar = namn.slice(i, i + SIDA).map(n => `${mapp}/${n}`)
    try {
      const { error } = await storage.remove(sokvagar)
      if (error) fel.push(error.message)
    } catch (e) {
      fel.push(e instanceof Error ? e.message : String(e))
    }
  }
  if (fel.length > 0) throw new Error(`${hink} bort: ${fel.join('; ')}`)
}

export interface StadSteg {
  namn: string
  kor: () => Promise<void>
}

/**
 * Mejllogg, nyhetsbrev och användarens egna bildmappar.
 * Forum-bilder ligger i forum-images/{konto}. Stories ligger i
 * trip-images/stories/{konto}. Övriga hinkar (avatar, turbilder, chatt)
 * städas redan av själva raderingsrutten.
 */
export function personuppgiftssteg(
  db: RaderingsDb,
  userId: string,
  email: string | null | undefined,
): StadSteg[] {
  const steg: StadSteg[] = [
    { namn: 'email_log', kor: () => raderaEpostlogg(db, userId, email) },
    { namn: 'email_subscribers', kor: () => taBortPrenumerant(db, userId, email) },
  ]
  if (!UUID.test(userId)) {
    steg.push({
      namn: 'lagring',
      kor: async () => { throw new Error('ogiltigt användar-id') },
    })
    return steg
  }
  steg.push(
    { namn: 'forum-images', kor: () => raderaLagringsmapp(db, 'forum-images', userId) },
    { namn: 'trip-images/stories', kor: () => raderaLagringsmapp(db, 'trip-images', `stories/${userId}`) },
  )
  return steg
}

/** Kör varje steg. Ett fel anropas via vidFel och stoppar inte de andra. */
export async function stadaPersonuppgifter(
  db: RaderingsDb,
  userId: string,
  email: string | null | undefined,
  vidFel: (steg: string, fel: unknown) => void,
): Promise<void> {
  for (const steg of personuppgiftssteg(db, userId, email)) {
    try {
      await steg.kor()
    } catch (fel) {
      try { vidFel(steg.namn, fel) } catch { /* rapporten får inte stoppa nästa steg */ }
    }
  }
}

/** Loggar ett städningsfel till stdout och till Sentry. Utan e-postadress. */
export function rapporteraRaderingsfel(steg: string, fel: unknown, userId: string): void {
  const meddelande = fel instanceof Error ? fel.message : String(fel)
  logger.error('account-delete', `${steg} cleanup failed`, { e: meddelande, userId })
  const err = fel instanceof Error ? fel : new Error(meddelande)
  Sentry.captureException(err, {
    tags: { scope: 'account-delete', steg },
    extra: { userId },
  })
}
