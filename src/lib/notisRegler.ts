/**
 * Regler för notiser som webbläsaren ber servern skapa (/api/notifications/insert).
 *
 * Varför (2026-10): notiser skapades tidigare direkt från webbläsaren, och
 * routen trodde sedan på vad klienten påstod. En inloggad kunde därför skicka
 * "X gillade din tur" eller "X börjar följa dig" till vem som helst utan att
 * ha gjort något. Nu kontrolleras att HÄNDELSEN finns i databasen innan
 * notisen skapas, och samma notis skapas inte två gånger i rad.
 *
 * Pushen till mottagarens telefon byggs också här, av servern, utifrån den
 * kontrollerade händelsen. Klienten får inte längre välja push-text eller länk.
 *
 * Varje notis knyts till sin händelse (reference_id = gillningens, kommentarens,
 * följningens eller meddelandets id) och skapas högst en gång per händelse.
 * Ett partiellt unikt index i databasen (migration 20261010000002) stoppar
 * även samtidiga anrop; routen behandlar unik-konflikt (23505) som dubblett.
 *
 * Databasfrågorna ligger bakom NotisDb så att reglerna kan testas utan databas.
 */
import type { SupabaseClient } from '@supabase/supabase-js'
import { namner } from './omnamnanden'

export const KLIENT_TYPER = ['like', 'comment', 'mention', 'follow', 'tag', 'message', 'dm_accepted'] as const
export type KlientTyp = (typeof KLIENT_TYPER)[number]

export function arKlientTyp(v: unknown): v is KlientTyp {
  return typeof v === 'string' && (KLIENT_TYPER as readonly string[]).includes(v)
}

/** Hur länge en kommentar eller ett meddelande räknas som "nyss" (minuter). */
const KOMMENTAR_FONSTER_MIN = 10
const MEDDELANDE_FONSTER_MIN = 2

/**
 * Dubblettspärr per typ – vad som räknas som "samma notis" (aldrig två gånger):
 *  - tur:      samma aktör, mottagare och tur  (gilla, ta bort, gilla igen = en notis)
 *  - par:      samma aktör och mottagare       (följ, avfölj, följ igen = en notis)
 *  - handelse: samma kommentar/meddelande/konversation (reference_id)
 */
const DUBBLETT_NYCKEL: Record<KlientTyp, 'tur' | 'par' | 'handelse'> = {
  like: 'tur',
  follow: 'par',
  tag: 'tur',
  comment: 'handelse',
  mention: 'handelse',
  message: 'handelse',
  dm_accepted: 'handelse',
}

export interface NotisDb {
  /** Ägaren till en tur som inte är raderad, annars null. */
  turAgare(tripId: string): Promise<string | null>
  /** Gillningens id, eller null. */
  gillning(actorId: string, tripId: string): Promise<string | null>
  /** Aktörens kommentarer på turen sedan tidpunkten, nyast först. */
  kommentarer(actorId: string, tripId: string, sedanIso: string): Promise<{ id: string; content: string }[]>
  /** Följningens id, eller null. */
  foljning(actorId: string, targetId: string): Promise<string | null>
  harTaggat(actorId: string, targetId: string, tripId: string): Promise<boolean>
  /** Vilka av användarna som är med i konversationen. */
  deltagare(conversationId: string, userIds: string[]): Promise<Set<string>>
  /** Id för aktörens senaste meddelande i konversationen sedan tidpunkten, eller null. */
  senasteMeddelande(conversationId: string, actorId: string, sedanIso: string): Promise<string | null>
  konversation(conversationId: string): Promise<{ created_by: string | null; status: string | null } | null>
  anvandarnamn(userId: string): Promise<string | null>
  /** Finns samma notis redan? nyckel avgör vad som jämförs (se DUBBLETT_NYCKEL). */
  finnsRedan(rad: NotisRad, nyckel: 'tur' | 'par' | 'handelse'): Promise<boolean>
}

export type NotisRad = {
  user_id: string
  actor_id: string
  type: KlientTyp
  trip_id?: string
  reference_id?: string
}

export type PushInnehall = { title: string; body: string; url: string }

export type Bedomning =
  | { ok: true; rad: NotisRad; push: PushInnehall | null }
  | { ok: false; status: 400 | 403; fel: string }
  | { ok: 'hoppa'; skal: 'dubblett' }

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const arUuid = (v: unknown): v is string => typeof v === 'string' && UUID_RE.test(v)

const minuterSedan = (nu: number, min: number) => new Date(nu - min * 60_000).toISOString()


export async function bedomNotis(
  db: NotisDb,
  input: { actorId: string; targetId: string; type: KlientTyp; tripId?: unknown; conversationId?: unknown },
  nu: number = Date.now(),
): Promise<Bedomning> {
  const { actorId, targetId, type } = input
  const tripId = arUuid(input.tripId) ? input.tripId : undefined
  const convId = arUuid(input.conversationId) ? input.conversationId : undefined
  const rad: NotisRad = { user_id: targetId, actor_id: actorId, type }
  let push: PushInnehall | null = null

  const behoverTur = type === 'like' || type === 'comment' || type === 'mention' || type === 'tag'
  if (behoverTur && !tripId) return { ok: false, status: 400, fel: 'tripId krävs' }
  const behoverKonv = type === 'message' || type === 'dm_accepted'
  if (behoverKonv && !convId) return { ok: false, status: 400, fel: 'conversationId krävs' }

  const aktorNamn = async () => (await db.anvandarnamn(actorId)) ?? 'Någon'

  switch (type) {
    case 'like': {
      if ((await db.turAgare(tripId!)) !== targetId) return { ok: false, status: 403, fel: 'Inte turens ägare' }
      const gillning = await db.gillning(actorId, tripId!)
      if (!gillning) return { ok: false, status: 403, fel: 'Ingen gillning' }
      rad.trip_id = tripId
      rad.reference_id = gillning
      push = { title: 'Ny gillning', body: `${await aktorNamn()} gillade din tur`, url: `/tur/${tripId}` }
      break
    }
    case 'comment': {
      if ((await db.turAgare(tripId!)) !== targetId) return { ok: false, status: 403, fel: 'Inte turens ägare' }
      const k = await db.kommentarer(actorId, tripId!, minuterSedan(nu, KOMMENTAR_FONSTER_MIN))
      if (k.length === 0) return { ok: false, status: 403, fel: 'Ingen ny kommentar' }
      rad.trip_id = tripId
      rad.reference_id = k[0]!.id
      push = { title: 'Ny kommentar', body: `${await aktorNamn()}: ${k[0]!.content.slice(0, 60)}`, url: `/tur/${tripId}` }
      break
    }
    case 'mention': {
      const agare = await db.turAgare(tripId!)
      if (agare === null) return { ok: false, status: 403, fel: 'Turen finns inte' }
      const namn = await db.anvandarnamn(targetId)
      const k = await db.kommentarer(actorId, tripId!, minuterSedan(nu, KOMMENTAR_FONSTER_MIN))
      const traff = namn ? k.find(t => namner(t.content, namn)) : undefined
      if (!traff) return { ok: false, status: 403, fel: 'Ingen kommentar som nämner mottagaren' }
      rad.trip_id = tripId
      rad.reference_id = traff.id
      // Turens ägare får redan en kommentarspush för samma kommentar – ingen dubbelpush.
      push = agare === targetId ? null : { title: `${await aktorNamn()} nämnde dig`, body: traff.content.slice(0, 80), url: `/tur/${tripId}` }
      break
    }
    case 'follow': {
      const foljning = await db.foljning(actorId, targetId)
      if (!foljning) return { ok: false, status: 403, fel: 'Ingen följning' }
      rad.reference_id = foljning
      const namn = await aktorNamn()
      push = { title: 'Ny följare', body: `${namn} börjar följa dig`, url: `/u/${encodeURIComponent(namn)}` }
      break
    }
    case 'tag': {
      if (!(await db.harTaggat(actorId, targetId, tripId!))) return { ok: false, status: 403, fel: 'Ingen sådan taggning' }
      rad.trip_id = tripId
      rad.reference_id = tripId // taggningar saknar eget id; turen är händelsen
      push = { title: 'Du är taggad i en tur', body: `${await aktorNamn()} taggade dig`, url: `/tur/${tripId}` }
      break
    }
    case 'message': {
      const d = await db.deltagare(convId!, [actorId, targetId])
      if (!d.has(actorId) || !d.has(targetId)) return { ok: false, status: 403, fel: 'Inte i samma konversation' }
      const meddelande = await db.senasteMeddelande(convId!, actorId, minuterSedan(nu, MEDDELANDE_FONSTER_MIN))
      if (!meddelande) return { ok: false, status: 403, fel: 'Inget nytt meddelande' }
      rad.reference_id = meddelande
      // Push för meddelanden skickas av /api/push/dm (med egen strypning).
      break
    }
    case 'dm_accepted': {
      const d = await db.deltagare(convId!, [actorId, targetId])
      if (!d.has(actorId) || !d.has(targetId)) return { ok: false, status: 403, fel: 'Inte i samma konversation' }
      const k = await db.konversation(convId!)
      if (!k || k.created_by !== targetId || k.status !== 'active') return { ok: false, status: 403, fel: 'Förfrågan är inte accepterad' }
      rad.reference_id = convId
      break
    }
  }

  if (await db.finnsRedan(rad, DUBBLETT_NYCKEL[type])) {
    return { ok: 'hoppa', skal: 'dubblett' }
  }
  return { ok: true, rad, push }
}

/** NotisDb mot riktiga databasen (tjänsteklienten, eftersom notiser och andras rader inte är läsbara för anroparen). */
export function notisDb(admin: SupabaseClient): NotisDb {
  return {
    async turAgare(tripId) {
      const { data } = await admin.from('trips').select('user_id, deleted_at').eq('id', tripId).maybeSingle()
      return data && !data.deleted_at ? (data.user_id as string) : null
    },
    async gillning(actorId, tripId) {
      const { data } = await admin.from('likes').select('id').eq('trip_id', tripId).eq('user_id', actorId).limit(1).maybeSingle()
      return (data?.id as string | undefined) ?? null
    },
    async kommentarer(actorId, tripId, sedanIso) {
      const { data } = await admin.from('comments').select('id, content')
        .eq('trip_id', tripId).eq('user_id', actorId).gte('created_at', sedanIso)
        .order('created_at', { ascending: false }).limit(10)
      return (data ?? []) as { id: string; content: string }[]
    },
    async foljning(actorId, targetId) {
      const { data } = await admin.from('follows').select('id').eq('follower_id', actorId).eq('following_id', targetId).limit(1).maybeSingle()
      return (data?.id as string | undefined) ?? null
    },
    async harTaggat(actorId, targetId, tripId) {
      const { data } = await admin.from('trip_tags').select('trip_id')
        .eq('trip_id', tripId).eq('tagged_user_id', targetId).eq('tagged_by_user_id', actorId).limit(1).maybeSingle()
      return !!data
    },
    async deltagare(conversationId, userIds) {
      const { data } = await admin.from('conversation_participants').select('user_id')
        .eq('conversation_id', conversationId).in('user_id', userIds)
      return new Set(((data ?? []) as { user_id: string }[]).map(r => r.user_id))
    },
    async senasteMeddelande(conversationId, actorId, sedanIso) {
      const { data } = await admin.from('messages').select('id')
        .eq('conversation_id', conversationId).eq('user_id', actorId).gte('created_at', sedanIso)
        .order('created_at', { ascending: false }).limit(1).maybeSingle()
      return (data?.id as string | undefined) ?? null
    },
    async konversation(conversationId) {
      const { data } = await admin.from('conversations').select('created_by, status').eq('id', conversationId).maybeSingle()
      return (data as { created_by: string | null; status: string | null } | null) ?? null
    },
    async anvandarnamn(userId) {
      const { data } = await admin.from('users').select('username').eq('id', userId).maybeSingle()
      return (data?.username as string | undefined) ?? null
    },
    async finnsRedan(rad, nyckel) {
      let q = admin.from('notifications').select('id')
        .eq('user_id', rad.user_id).eq('actor_id', rad.actor_id).eq('type', rad.type)
      if (nyckel === 'tur') q = q.eq('trip_id', rad.trip_id!)
      if (nyckel === 'handelse') q = q.eq('reference_id', rad.reference_id!)
      const { data } = await q.limit(1).maybeSingle()
      return !!data
    },
  }
}
