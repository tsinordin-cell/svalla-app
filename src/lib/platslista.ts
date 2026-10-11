/**
 * Platslistan till /upptack (kartan) och /api/discovery?type=poi (2026-10).
 *
 * Varför en gemensam fil: /upptack renderas nu på servern med listan i
 * HTML:en (tidigare hämtade webbläsaren den via API:t först efter att sidans
 * skript körts – 3–5 s in på en långsam telefon, och sökmotorer såg en tom
 * sida). API:t finns kvar för andra anropare och ska ge exakt samma rader.
 *
 * Projektionen: platsens egen bild först, Googles foto (via proxyn) bara när
 * egen bild saknas; beskrivningen klipps till 300 tecken (korten visar två
 * rader, sökningen matchar mot den korta texten); google_photo_refs skickas
 * aldrig med (~3 kB per plats). endast_medlemmar bara när den är sann.
 *
 * Giltighet (flyttad från UpptackExplorer): koordinater inom Skandinavien
 * (54–70°N, 5–25°E – (0,0) är öppet hav söder om Ghana, en vanlig
 * "default-koordinat" från trasig data) och ett namn som börjar med versal
 * (Google Places-importen gav poster som "not the public sauna").
 */
import type { SupabaseClient } from '@supabase/supabase-js'

export interface Plats {
  id: string
  name: string
  latitude: number
  longitude: number
  type: string | null
  categories: string[] | null
  description: string | null
  image_url: string | null
  slug: string | null
  island: string | null
  archipelago_region: string | null
  endast_medlemmar?: boolean
}

type Rad = {
  id: string; name: string; latitude: number; longitude: number;
  type: string | null; categories: string[] | null; description: string | null;
  image_url: string | null; slug: string | null; island: string | null;
  archipelago_region: string | null;
  google_photo_refs: { reference: string }[] | null;
  endast_medlemmar: boolean | null;
}

export const PLATS_KOLUMNER =
  'id, name, latitude, longitude, type, categories, description, image_url, slug, island, archipelago_region, google_photo_refs, endast_medlemmar'

/** Har platsen koordinater i Skandinavien och ett riktigt namn? */
export function arGiltigPlats(p: Pick<Plats, 'latitude' | 'longitude' | 'name'>): boolean {
  return (
    typeof p.latitude === 'number' && typeof p.longitude === 'number' &&
    Number.isFinite(p.latitude) && Number.isFinite(p.longitude) &&
    p.latitude > 54 && p.latitude < 70 &&
    p.longitude > 5 && p.longitude < 25 &&
    /^[^a-zåäö]/.test((p.name ?? '').trim())
  )
}

/** Raden ur databasen → det listan och API:t skickar. */
export function projiceraPlats(r: Rad): Plats {
  let imageUrl = r.image_url
  const ref = r.google_photo_refs?.[0]?.reference
  if (!imageUrl && ref) {
    const encoded = Buffer.from(ref, 'utf-8').toString('base64url')
    imageUrl = `/api/places/photo/${encoded}?w=400`
  }
  return {
    id: r.id, name: r.name, latitude: r.latitude, longitude: r.longitude,
    type: r.type, categories: r.categories,
    description: r.description ? r.description.slice(0, 300) : null,
    image_url: imageUrl, slug: r.slug, island: r.island,
    archipelago_region: r.archipelago_region,
    ...(r.endast_medlemmar ? { endast_medlemmar: true } : {}),
  }
}

/** Alla platser med koordinater, projicerade. Kastar vid databasfel. */
export async function hamtaPlatslista(supabase: SupabaseClient): Promise<Plats[]> {
  const { data, error } = await supabase
    .from('restaurants')
    .select(PLATS_KOLUMNER)
    .not('latitude', 'is', null)
    .not('longitude', 'is', null)
  if (error) throw new Error(error.message)
  return ((data as unknown as Rad[] | null) ?? []).map(projiceraPlats)
}
