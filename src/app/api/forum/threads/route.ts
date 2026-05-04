import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { checkRateLimit } from '@/lib/rateLimit'
import { getUserForumPostCount } from '@/lib/forum'
import { STATIC_CATEGORIES } from '@/lib/forum-categories'
// TODO: wrap handlers with withSentrySimple(handler, 'forum/threads') — se src/lib/api-handler.ts

/** POST /api/forum/threads — skapa ny tråd */
export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Du måste vara inloggad.' }, { status: 401 })
    }

    // Rate limit: 5 forum-actions per 10 minuter per användare
    const rlKey = `forum:${user.id}`
    if (!(await checkRateLimit(rlKey, 5, 10 * 60 * 1000))) {
      return NextResponse.json({ error: 'Du skriver för snabbt. Vänta en stund.' }, { status: 429 })
    }

    const body = await req.json()
    const { categoryId, title, body: postBody, listingData } = body

    // Validera kategori
    const validIds = STATIC_CATEGORIES.map(c => c.id)
    if (!categoryId || !validIds.includes(categoryId)) {
      return NextResponse.json({ error: 'Ogiltig kategori.' }, { status: 400 })
    }

    // Validera title + body
    const trimTitle = (title ?? '').trim()
    const trimBody  = (postBody ?? '').trim()
    if (trimTitle.length < 5 || trimTitle.length > 200) {
      return NextResponse.json({ error: 'Ogiltig rubrik (5–200 tecken).' }, { status: 400 })
    }
    // Loppis tillåter kortare body (1 tecken) eftersom strukturerad data
    // ersätter mycket av innehållet. Andra kategorier kräver 10+.
    const minBody = categoryId === 'loppis' ? 1 : 10
    if (trimBody.length < minBody || trimBody.length > 10000) {
      return NextResponse.json({
        error: categoryId === 'loppis'
          ? 'Beskrivning saknas eller är för lång (max 10 000 tecken).'
          : 'Ogiltig text (10–10 000 tecken).',
      }, { status: 400 })
    }

    // Validera listing_data (bara för Loppis)
    let validatedListing: Record<string, unknown> | null = null
    if (categoryId === 'loppis') {
      if (!listingData || typeof listingData !== 'object') {
        return NextResponse.json({ error: 'Annonsdata saknas.' }, { status: 400 })
      }
      const ld = listingData as Record<string, unknown>
      const price = typeof ld.price === 'number' ? ld.price : null
      if (price !== null && (price < 0 || price > 100_000_000)) {
        return NextResponse.json({ error: 'Ogiltigt pris.' }, { status: 400 })
      }
      const images = Array.isArray(ld.images) ? ld.images.filter((u): u is string => typeof u === 'string').slice(0, 8) : []
      if (images.length < 1) {
        return NextResponse.json({ error: 'Minst en bild krävs för annonser.' }, { status: 400 })
      }
      const specs = Array.isArray(ld.specs)
        ? (ld.specs as unknown[])
            .filter((s): s is { label: string; value: string } =>
              !!s && typeof s === 'object'
              && typeof (s as { label?: unknown }).label === 'string'
              && typeof (s as { value?: unknown }).value === 'string')
            .map(s => ({ label: s.label.slice(0, 40), value: s.value.slice(0, 200) }))
            .filter(s => s.label.trim() && s.value.trim())
            .slice(0, 12)
        : []
      const allowedConditions = ['Nyskick', 'Mycket bra', 'Bra', 'Acceptabelt', 'Renoveringsobjekt']
      const allowedCategories = ['Båt', 'Motor', 'Tillbehör', 'Säkerhet', 'Övrigt']
      const allowedStatuses   = ['aktiv', 'reserverad', 'sald']
      validatedListing = {
        price,
        currency: 'SEK',
        condition: typeof ld.condition === 'string' && allowedConditions.includes(ld.condition) ? ld.condition : null,
        category:  typeof ld.category  === 'string' && allowedCategories.includes(ld.category)  ? ld.category  : 'Övrigt',
        images,
        specs,
        location: typeof ld.location === 'string' ? ld.location.trim().slice(0, 80) : null,
        external_link: typeof ld.external_link === 'string' && /^https?:\/\//i.test(ld.external_link)
          ? ld.external_link.slice(0, 500)
          : null,
        status: typeof ld.status === 'string' && allowedStatuses.includes(ld.status) ? ld.status : 'aktiv',
      }
    }

    // Spam-kö: om användaren har färre än 3 godkända inlägg totalt
    const approvedCount = await getUserForumPostCount(user.id)
    const inSpamQueue   = approvedCount < 3

    const insertPayload: Record<string, unknown> = {
      category_id:   categoryId,
      user_id:       user.id,
      title:         trimTitle,
      body:          trimBody,
      in_spam_queue: inSpamQueue,
    }
    if (validatedListing) insertPayload.listing_data = validatedListing

    const { data: thread, error: insertError } = await supabase
      .from('forum_threads')
      .insert(insertPayload)
      .select('id')
      .single()

    if (insertError || !thread) {
      console.error('[forum/threads] insert error:', insertError)
      return NextResponse.json({ error: 'Kunde inte spara tråden.' }, { status: 500 })
    }

    // Pinga Google Indexing API om annonsen är publik (icke-spam)
    if (categoryId === 'loppis' && !inSpamQueue) {
      const url = `https://svalla.se/forum/loppis/${thread.id}`
      // Fire-and-forget; failar tyst om SA-JSON saknas
      fetch(`${req.nextUrl.origin}/api/seo/index-now`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': req.headers.get('cookie') ?? '',
        },
        body: JSON.stringify({ url }),
      }).catch(() => { /* ignore — annons ska alltid lyckas skapas */ })
    }

    return NextResponse.json({
      id:          thread.id,
      in_spam_queue: inSpamQueue,
    })
  } catch (err) {
    console.error('[forum/threads] unexpected error:', err)
    return NextResponse.json({ error: 'Serverfel.' }, { status: 500 })
  }
}
