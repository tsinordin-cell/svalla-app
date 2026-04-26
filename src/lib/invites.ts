/**
 * Invites — personliga inbjudningslänkar.
 * Schema: invites (id, user_id, code, max_uses, uses, created_at, expires_at).
 * Vy: invite_codes (publik) — för att slå upp en kod utan att exponera user_id.
 */
import type { SupabaseClient } from '@supabase/supabase-js'

export type Invite = {
  id: string
  user_id: string
  code: string
  max_uses: number | null
  uses: number
  created_at: string
  expires_at: string | null
}

export type InvitePublic = {
  code: string
  max_uses: number | null
  uses: number
  expires_at: string | null
}

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // utan 0/O/1/I för läsbarhet

function generateCode(len = 8): string {
  let s = ''
  const cryptoObj = typeof crypto !== 'undefined' ? crypto : null
  if (cryptoObj && 'getRandomValues' in cryptoObj) {
    const buf = new Uint32Array(len)
    cryptoObj.getRandomValues(buf)
    for (let i = 0; i < len; i++) s += ALPHABET[buf[i]! % ALPHABET.length]!
  } else {
    for (let i = 0; i < len; i++) s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)]!
  }
  return s
}

export async function createInvite(
  supabase: SupabaseClient,
  userId: string,
  opts: { maxUses?: number | null; expiresAt?: string | null } = {},
): Promise<Invite | null> {
  // försök upp till 5 ggr om kollision på unique-code
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateCode(8)
    const { data, error } = await supabase
      .from('invites')
      .insert({
        user_id: userId,
        code,
        max_uses: opts.maxUses ?? null,
        expires_at: opts.expiresAt ?? null,
      })
      .select('id, user_id, code, max_uses, uses, created_at, expires_at')
      .single()
    if (!error && data) return data as Invite
    // 23505 = unique_violation → loop, annars avbryt
    if (error && error.code !== '23505') return null
  }
  return null
}

export async function listMyInvites(
  supabase: SupabaseClient,
  userId: string,
): Promise<Invite[]> {
  const { data } = await supabase
    .from('invites')
    .select('id, user_id, code, max_uses, uses, created_at, expires_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return (data ?? []) as Invite[]
}

export async function deleteInvite(
  supabase: SupabaseClient,
  inviteId: string,
): Promise<boolean> {
  const { error } = await supabase.from('invites').delete().eq('id', inviteId)
  return !error
}

/** Validera + hämta publik info om en kod. Returnerar null om utgången eller tomt. */
export async function getInviteByCode(
  supabase: SupabaseClient,
  code: string,
): Promise<InvitePublic | null> {
  const { data } = await supabase
    .from('invite_codes')
    .select('code, max_uses, uses, expires_at')
    .eq('code', code.toUpperCase())
    .maybeSingle()
  if (!data) return null
  const inv = data as InvitePublic
  if (inv.expires_at && new Date(inv.expires_at) < new Date()) return null
  if (inv.max_uses != null && inv.uses >= inv.max_uses) return null
  return inv
}

/**
 * Lös in en kod efter att en ny användare har skapat sitt konto.
 * Bumpar `uses`. Försöker auto-följa inbjudaren (best-effort).
 * Returnerar inviterar-id om något hände.
 */
export async function redeemInvite(
  supabase: SupabaseClient,
  newUserId: string,
  code: string,
): Promise<{ inviterId: string } | null> {
  // Hämta full row via en RPC- eller direkt — vi kan bara läsa via vyn anonymt.
  // Inloggad user kan dock göra .select på invites om policy tillåter — men policy
  // är "read own invites". Lös genom att uppdatera + få tillbaka user_id.
  const upper = code.toUpperCase()
  // Slå först mot vyn för att verifiera giltighet
  const pub = await getInviteByCode(supabase, upper)
  if (!pub) return null

  // Bumpa uses via RPC saknas — gör best-effort via direkt update.
  // Eftersom RLS hindrar UPDATE för andra användares invites kommer inget ske
  // om vi inte har en SECURITY DEFINER-funktion. Vi kallar en sådan om den finns;
  // annars är invitet giltigt men räknas inte upp (acceptabelt MVP).
  let inviterId: string | null = null
  try {
    const { data, error } = await supabase.rpc('redeem_invite_code', { p_code: upper })
    if (!error && data && typeof data === 'string') inviterId = data as string
  } catch { /* ingen RPC installerad */ }

  // Fallback: hämta inviterId via insert i en bridge-tabell finns ej; gör en separat
  // lookup mot publika vyn berikat med user_id finns ej. Utan RPC-stöd avbryter vi
  // med null så att vi inte autopiloterar in en följning.
  if (!inviterId) return null

  // Auto-följ
  try {
    await supabase.from('follows').insert({ follower_id: newUserId, following_id: inviterId })
  } catch { /* tyst — kan redan följa */ }

  return { inviterId }
}

export function buildInviteUrl(code: string, base = 'https://svalla.se'): string {
  return `${base}/i/${code.toUpperCase()}`
}
