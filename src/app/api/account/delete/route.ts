export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import Stripe from 'stripe'
import { logger } from '@/lib/logger'
import { checkRateLimit } from '@/lib/rateLimit'

/**
 * POST /api/account/delete
 * Body: { confirm: "RADERA", password: string }
 *
 * GDPR-flöde för permanent kontoradering. Kräver:
 *  - Inloggad session
 *  - Bekräftelse-text "RADERA" (för att förhindra UI-misstag)
 *  - Lösenord-verifiering (för att förhindra session-hijack)
 *
 * Steg (i ordning):
 *  1. Cancel Stripe-subscription om aktiv
 *  2. Anonymisera forum-content till "[Borttagen användare]"
 *  3. Cascade-delete användarspecifik data (likes, follows, bookmarks, etc.)
 *  4. Skicka bekräftelse-email
 *  5. Radera auth-user via service-role
 *
 * Returnerar { ok: true } vid success — klient ska redirecta till /goodbye.
 */

export async function POST(req: NextRequest) {
  // Auth
  const supabase = await createServerSupabaseClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Inte inloggad' }, { status: 401 })
  }

  // Rate limit: max 3 försök per timme (förebygger trial-and-error)
  if (!(await checkRateLimit(`account-delete:${user.id}`, 3, 60 * 60 * 1000))) {
    return NextResponse.json({ error: 'För många försök. Försök igen om en stund.' }, { status: 429 })
  }

  // Body-validering
  let body: { confirm?: string; password?: string }
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Ogiltig JSON' }, { status: 400 }) }

  if (body.confirm !== 'RADERA') {
    return NextResponse.json({ error: 'Bekräftelse-text matchar inte' }, { status: 400 })
  }
  if (typeof body.password !== 'string' || body.password.length < 6) {
    return NextResponse.json({ error: 'Lösenord krävs' }, { status: 400 })
  }

  // Verifiera lösenord genom att försöka logga in (bypass session-hijack)
  if (user.email) {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: body.password,
    })
    if (signInError) {
      return NextResponse.json({ error: 'Fel lösenord' }, { status: 401 })
    }
  }

  const userId = user.id
  const userEmail = user.email
  const s = getAdminClient()

  // ─── Steg 1: Cancel Stripe-subscription ────────────────────────────────
  try {
    const { data: subRow } = await s
      .from('subscriptions')
      .select('stripe_subscription_id, stripe_customer_id, status')
      .eq('user_id', userId)
      .maybeSingle()

    if (subRow?.stripe_subscription_id && subRow.status !== 'canceled') {
      const stripeKey = process.env.STRIPE_SECRET_KEY
      if (stripeKey) {
        const stripe = new Stripe(stripeKey)
        await stripe.subscriptions.cancel(subRow.stripe_subscription_id).catch((e: unknown) => {
          logger.error('account-delete', 'stripe cancel failed', { e: String(e), userId })
        })
      }
    }
  } catch (e) {
    logger.error('account-delete', 'stripe lookup failed', { e: String(e), userId })
    // Fortsätt ändå — Stripe-fel ska inte blockera GDPR-radering
  }

  // ─── Steg 2: Anonymisera forum-content ────────────────────────────────
  // Vi raderar inte forum-trådar/inlägg — andra users har svarat på dem.
  // Istället: byt user_id till en "deleted-user-placeholder" eller sätt till null.
  // För enkelhet: uppdatera body till "[Borttaget av användare]" + null user_id.
  await s.from('forum_posts').update({ body: '[Borttaget av användare]', user_id: null as unknown as string }).eq('user_id', userId)
  await s.from('forum_threads').update({ body: '[Borttaget av användare]', title: '[Borttaget av användare]', user_id: null as unknown as string }).eq('user_id', userId)

  // ─── Steg 3: Cascade-delete user-specific data ────────────────────────
  // Tabeller som ska tömmas helt för denna user. Body-content (forum) hanteras ovan.
  const tablesToClear = [
    'forum_post_likes',
    'forum_subscriptions',
    'trip_likes',
    'trip_comments',
    'bookmarks',
    'follows',          // som follower
    'visited_islands',
    'push_subscriptions',
    'partner_inquiries',
    'reports',
    'messages',         // user's egna meddelanden
    'conversation_participants',
    'planned_routes',
  ]

  for (const table of tablesToClear) {
    const { error } = await s.from(table).delete().eq('user_id', userId)
    if (error && !error.message.includes('does not exist')) {
      logger.error('account-delete', `clear ${table} failed`, { e: error.message, userId })
    }
  }

  // Follows kan ha user som follower ELLER following — rensa båda
  await s.from('follows').delete().or(`follower_id.eq.${userId},following_id.eq.${userId}`).then(
    () => null,
    (e: unknown) => logger.error('account-delete', 'follows clear failed', { e: String(e), userId })
  )

  // Trips raderas helt (inkluderar route_points + bilder)
  await s.from('trips').delete().eq('user_id', userId)

  // Subscriptions
  await s.from('subscriptions').delete().eq('user_id', userId)

  // Egen users-rad (om finns)
  await s.from('users').delete().eq('id', userId)

  // ─── Steg 3b: Rensa Storage-filer ─────────────────────────────────────
  // Avatar: images-bucket, path avatars/{userId}.{ext}
  try {
    const { data: avatarFiles } = await s.storage.from('images').list('avatars', {
      search: userId,
    })
    if (avatarFiles && avatarFiles.length > 0) {
      const paths = avatarFiles.map(f => `avatars/${f.name}`)
      await s.storage.from('images').remove(paths)
    }
  } catch (e) {
    logger.error('account-delete', 'avatar storage cleanup failed', { e: String(e), userId })
  }

  // Trip-bilder: trip-images-bucket, prefix checkin/{userId}/
  try {
    const { data: checkinFiles } = await s.storage.from('trip-images').list(`checkin/${userId}`)
    if (checkinFiles && checkinFiles.length > 0) {
      const paths = checkinFiles.map(f => `checkin/${userId}/${f.name}`)
      await s.storage.from('trip-images').remove(paths)
    }
  } catch (e) {
    logger.error('account-delete', 'trip-images storage cleanup failed', { e: String(e), userId })
  }

  // Trip-bilder: trips-bucket, prefix {userId}-
  try {
    const { data: tripFiles } = await s.storage.from('trips').list('', {
      search: userId,
    })
    if (tripFiles && tripFiles.length > 0) {
      const paths = tripFiles.map(f => f.name)
      await s.storage.from('trips').remove(paths)
    }
  } catch (e) {
    logger.error('account-delete', 'trips storage cleanup failed', { e: String(e), userId })
  }

  // ─── Steg 4: Skicka bekräftelse-email ─────────────────────────────────
  if (userEmail && process.env.RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM ?? 'hello@svalla.se',
          to: userEmail,
          subject: 'Ditt Svalla-konto har raderats',
          text: 'Hej,\n\nDitt Svalla-konto har raderats permanent. All din personliga data har tagits bort enligt GDPR.\n\nTack för tiden hos oss. Du är välkommen tillbaka när som helst.\n\n— Svalla',
        }),
      })
    } catch (e) {
      logger.error('account-delete', 'confirmation email failed', { e: String(e) })
    }
  }

  // ─── Steg 5: Radera auth-user (sista, irreversibelt) ──────────────────
  const { error: authDelErr } = await s.auth.admin.deleteUser(userId)
  if (authDelErr) {
    logger.error('account-delete', 'auth deleteUser failed', { e: authDelErr.message, userId })
    // Detta är ett kritiskt fel — datat är raderat men auth-row finns kvar.
    // Returnera ändå ok (data är borta) men logga för manuell cleanup.
  }

  // ─── Steg 6: GDPR-audit log (ingen PII — bara hash + tidstämpel) ──────
  try {
    const userIdHash = createHash('sha256').update(userId).digest('hex')
    await s.from('account_deletions').insert({
      user_id_hash: userIdHash,
      deleted_at: new Date().toISOString(),
    })
  } catch (e) {
    logger.error('account-delete', 'audit log failed', { e: String(e) })
    // Icke-kritiskt — fortsätt ändå
  }

  // Logga ut session
  const res = NextResponse.json({ ok: true })
  res.cookies.delete('sb-access-token')
  res.cookies.delete('sb-refresh-token')

  logger.info('account-delete', 'completed', { userId, email: userEmail })
  return res
}
