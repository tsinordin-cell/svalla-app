/**
 * De avstängda mejlflödena (2026-09-29). Anropas från cron/route.ts.
 *
 * INGET HÄR SKICKAS förrän flödets namn står i EMAIL_AUTOMATIK (se
 * src/lib/mailfloden.ts). Varje flöde kollar flodePa() först och returnerar
 * { skipped: 'avstängt' } annars — utan att ens läsa databasen.
 *
 * Gemensamt för alla:
 *  - Dedupe mot email_log (template-nyckeln är unik per mottagare och tillfälle),
 *    så att en omkörning samma dygn aldrig skickar två gånger.
 *  - Tak på antal utskick per körning (Resend gratis: 100/dygn). Det som inte
 *    hinns med tas nästa dag, eftersom fönstren är flera dagar breda.
 *  - Inga påståenden skrivs i koden. Ö-uppgifterna hämtas från ösidans data,
 *    och restid används bara om den är källbelagd (facts_provenance 'matt').
 */
import type { SupabaseClient } from '@supabase/supabase-js'
import { sendEmail, type EmailTemplate } from '@/lib/email'
import { MAIL_MALLAR } from '@/lib/email-templates.generated'
import {
  flodePa, manadsbrevFonster, manadsnyckel, arVeckansOdag, isoVecka, valjVeckansO,
} from '@/lib/mailfloden'
import { ALL_ISLANDS, getIsland, type Island } from '@/app/o/island-data'
import { getGuidesForIsland } from '@/app/guider/guide-island-map'
import { PUBLICERADE_GUIDER } from '@/app/guider/guides-data'
import { SCB_OAR, SCB_OAR_KALLA } from '@/app/o/scb-oar.generated'

const MAX_PER_KORNING = 80

type Resultat = { sent: number; errors: number; skipped?: string; details?: unknown }
type Mottagare = { email: string; vars: Record<string, string>; loggnyckel: string; userId?: string }

async function skickaEnGang(
  service: SupabaseClient,
  template: EmailTemplate,
  mottagare: Mottagare[],
  budget: { kvar: number },
): Promise<Resultat> {
  let sent = 0, errors = 0
  if (mottagare.length === 0) return { sent, errors }

  const nycklar = [...new Set(mottagare.map(m => m.loggnyckel))]
  const { data: redan } = await service
    .from('email_log')
    .select('email, template')
    .in('template', nycklar)
    .in('email', mottagare.map(m => m.email))
  const skickat = new Set((redan ?? []).map(r => `${r.template}|${String(r.email).toLowerCase()}`))

  for (const m of mottagare) {
    if (budget.kvar <= 0) break
    if (skickat.has(`${m.loggnyckel}|${m.email.toLowerCase()}`)) continue
    budget.kvar--
    const r = await sendEmail({ template, to: m.email, vars: m.vars })
    // sendEmail svarar ok med error 'unsubscribed' när adressen har
    // avregistrerat sig. Inget skickades, så det ska inte räknas eller loggas.
    if (r.ok && r.error === 'unsubscribed') continue
    if (r.ok) {
      sent++
      skickat.add(`${m.loggnyckel}|${m.email.toLowerCase()}`)
      await service.from('email_log').insert({
        email: m.email, template: m.loggnyckel, sent_at: new Date().toISOString(),
        resend_id: r.id, user_id: m.userId ?? null,
      }).then(() => {}, () => {})
    } else {
      errors++
    }
  }
  return { sent, errors }
}

/**
 * Mottagare av utskick som går till en lista (månadsbrev, veckans ö):
 * BARA bekräftade prenumeranter som inte avregistrerat sig.
 *
 * Konton (users) är medvetet INTE med (2026-09-29). Integritetspolicyn
 * nämner inte nyhetsbrev som ändamål för kontots e-postadress, och
 * marknadsföringslagen 19 § kräver samtycke i förväg för reklam via e-post
 * till privatpersoner. Kontoinnehavare kommer med när de själva kryssat i
 * nyhetsbrevet (då finns de i email_subscribers).
 *
 * Avregistreringarna i email_unsubscribes filtreras bort här också, och om
 * den listan inte går att läsa skickas ingenting (fail-closed). sendEmail
 * är fail-open vid databasfel, vilket är rimligt för enskilda mejl men inte
 * för ett massutskick.
 */
async function prenumeranter(service: SupabaseClient): Promise<Array<{ email: string; firstName: string }> | null> {
  const [{ data: subs, error: e1 }, { data: avreg, error: e2 }] = await Promise.all([
    service.from('email_subscribers').select('email').eq('confirmed', true).eq('unsubscribed', false).limit(5000),
    service.from('email_unsubscribes').select('email').limit(10000),
  ])
  if (e1 || e2) return null
  const bort = new Set((avreg ?? []).map(r => String(r.email).toLowerCase()))
  const map = new Map<string, string>()
  for (const s of subs ?? []) {
    const e = s.email ? String(s.email).toLowerCase() : ''
    if (e && !bort.has(e)) map.set(e, 'där')
  }
  return [...map.keys()].map(email => ({ email, firstName: 'där' }))
}

/** Variabler för en ö, bara från ösidans data. */
export function oVariabler(island: Island): Record<string, string> {
  const matt = island.facts_provenance?.travel_time === 'matt' && island.facts?.travel_time
  const guider = getGuidesForIsland(island.slug)
    .map(gs => PUBLICERADE_GUIDER.find(g => g.slug === gs))
    .filter((g): g is NonNullable<typeof g> => Boolean(g))
    // Säsongsguider (midsommar, kräftor …) passar bara en del av året; mejlet
    // går året runt, så de hoppas över.
    .filter(g => g.category !== 'Säsong')
    .slice(0, 3)
  // Officiell statistik från SCB, samma som ösidans faktaruta. Tom rad när
  // SCB inte redovisar ön eller inte har någon siffra.
  const scb = SCB_OAR[island.slug]
  const fakta_rad = scb?.folkbokforda != null
    ? scb.scbNamn === island.name
      ? `Enligt SCB var ${scb.folkbokforda.toLocaleString('sv-SE')} personer folkbokförda på ${island.name} den ${SCB_OAR_KALLA.referens}.`
      : `Enligt SCB var ${scb.folkbokforda.toLocaleString('sv-SE')} personer folkbokförda på ${scb.scbNamn} den ${SCB_OAR_KALLA.referens}.`
    : ''
  return {
    fakta_rad,
    island_name: island.name,
    island_tagline: island.tagline,
    restid_rad: matt
      ? `Restid enligt ösidan: ${island.facts!.travel_time}.`
      : 'Hur du tar dig dit står på ösidan, med källa.',
    island_url: `https://svalla.se/o/${island.slug}`,
    planera_url: `https://svalla.se/utflykt?o=${island.slug}`,
    guide_rad: guider.length
      ? `Mer att läsa: ${guider.map(g => `[${g.title}](https://svalla.se/guider/${g.slug})`).join(', ')}.`
      : '',
  }
}

export async function korAvstangdaFloden(
  service: SupabaseClient,
  today: Date,
): Promise<Record<string, Resultat>> {
  const ut: Record<string, Resultat> = {}
  const budget = { kvar: MAX_PER_KORNING }
  const dag = 24 * 60 * 60 * 1000

  // ── Månadsbrev (okt–mars) ────────────────────────────────────────────
  if (!flodePa('manadsbrev')) ut.manadsbrev = { sent: 0, errors: 0, skipped: 'avstängt' }
  else if (!manadsbrevFonster(today)) ut.manadsbrev = { sent: 0, errors: 0, skipped: 'utanför fönstret' }
  else {
    const manad = MAIL_MALLAR.manadsbrev.match(/^manad:\s*(\d{4}-\d{2})\s*$/m)?.[1]
    if (manad !== manadsnyckel(today)) {
      ut.manadsbrev = { sent: 0, errors: 0, skipped: `mallen gäller ${manad ?? 'ingen månad'}, inte ${manadsnyckel(today)}` }
    } else {
      const mottagare = await prenumeranter(service)
      if (!mottagare) ut.manadsbrev = { sent: 0, errors: 0, skipped: 'kunde inte läsa listan, skickar inget' }
      else {
        const lista = mottagare.map(m => ({
          email: m.email, vars: { first_name: m.firstName }, loggnyckel: `manadsbrev-${manad}`,
        }))
        ut.manadsbrev = await skickaEnGang(service, 'manadsbrev', lista, budget)
      }
    }
  }

  // ── Dag 60 och dag 90 (konton utan tur och utan sparad ö) ───────────
  for (const [flode, dagar] of [['day60', 60], ['day90', 90]] as const) {
    if (!flodePa(flode)) { ut[flode] = { sent: 0, errors: 0, skipped: 'avstängt' }; continue }
    const fran = new Date(today.getTime() - (dagar + 1) * dag).toISOString()
    const till = new Date(today.getTime() - (dagar - 1) * dag).toISOString()
    const { data: konton } = await service
      .from('users').select('id, email, username')
      .not('email', 'is', null).gte('created_at', fran).lte('created_at', till).limit(500)
    const ids = (konton ?? []).map(k => k.id as string)
    const [{ data: turer }, { data: sparat }] = ids.length
      ? await Promise.all([
          service.from('trips').select('user_id').in('user_id', ids).is('deleted_at', null),
          service.from('saved_islands').select('user_id').in('user_id', ids),
        ])
      : [{ data: [] }, { data: [] }]
    const aktiva = new Set([...(turer ?? []), ...(sparat ?? [])].map(r => r.user_id as string))
    const lista = (konton ?? [])
      .filter(k => !aktiva.has(k.id as string) && k.email)
      .map(k => ({
        email: String(k.email), userId: k.id as string,
        vars: { first_name: (k.username as string) || 'där' }, loggnyckel: flode,
      }))
    ut[flode] = await skickaEnGang(service, flode, lista, budget)
  }

  // ── Sparad ö → mejl dagen efter (en gång per ö och användare) ───────
  if (!flodePa('saved_island')) ut.saved_island = { sent: 0, errors: 0, skipped: 'avstängt' }
  else {
    const { data: sparade } = await service
      .from('saved_islands').select('user_id, island_slug, created_at')
      .gte('created_at', new Date(today.getTime() - 3 * dag).toISOString())
      .lte('created_at', new Date(today.getTime() - dag).toISOString())
      .limit(500)
    const ids = [...new Set((sparade ?? []).map(s => s.user_id as string))]
    const { data: konton } = ids.length
      ? await service.from('users').select('id, email').in('id', ids)
      : { data: [] as Array<{ id: string; email: string | null }> }
    const epost = new Map((konton ?? []).map(k => [k.id as string, k.email as string | null]))
    const lista: Mottagare[] = []
    for (const s of sparade ?? []) {
      const island = getIsland(s.island_slug as string)
      const email = epost.get(s.user_id as string)
      if (!island || !email) continue
      lista.push({ email, userId: s.user_id as string, vars: oVariabler(island), loggnyckel: `saved_island:${island.slug}` })
    }
    ut.saved_island = await skickaEnGang(service, 'saved_island', lista, budget)
  }

  // ── Veckans ö (tisdagar april–september) ────────────────────────────
  if (!flodePa('weekly_island')) ut.weekly_island = { sent: 0, errors: 0, skipped: 'avstängt' }
  else if (!arVeckansOdag(today)) ut.weekly_island = { sent: 0, errors: 0, skipped: 'inte tisdag april–september' }
  else {
    const kandidater = ALL_ISLANDS
      .filter(i => i.facts_provenance?.travel_time === 'matt' && i.facts?.travel_time)
      .sort((a, b) => a.slug.localeCompare(b.slug))
    const o = valjVeckansO(kandidater, today)
    if (!o) ut.weekly_island = { sent: 0, errors: 0, skipped: 'ingen ö med källbelagd restid' }
    else {
      const nyckel = `weekly_island-${today.getUTCFullYear()}-v${isoVecka(today)}`
      const vars = oVariabler(o)
      const mottagare = await prenumeranter(service)
      if (!mottagare) ut.weekly_island = { sent: 0, errors: 0, skipped: 'kunde inte läsa listan, skickar inget' }
      else {
        const lista = mottagare.map(m => ({ email: m.email, vars, loggnyckel: nyckel }))
        ut.weekly_island = { ...(await skickaEnGang(service, 'weekly_island', lista, budget)), details: { o: o.slug } }
      }
    }
  }

  return ut
}
