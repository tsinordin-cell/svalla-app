import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { renderEmail, type EmailTemplate } from '@/lib/email'
import { flodePa, MAILFLODEN, type Mailflode } from '@/lib/mailfloden'

export const dynamic = 'force-dynamic'

/**
 * Förhandsvisning av alla utskick, renderade av samma kod som skickar dem.
 *
 * Fanns inte tidigare, och det var en del av problemet: mailen gick bara att
 * granska genom att skicka dem till sig själv. Texten kunde därför driva iväg
 * från vad någon faktiskt hade läst. Här syns exakt vad mottagaren får.
 */

const EXEMPELVARDEN: Record<EmailTemplate, Record<string, string | number>> = {
  welcome: { first_name: 'Anna' },
  day7: { first_name: 'Anna' },
  season_open: { first_name: 'Anna' },
  season_close: { first_name: 'Anna', visited_count: 12, trip_count: 9, distance_nm: 184, saved_count: 6 },
  weather_tip: { first_name: 'Anna', temp: 21, wind: 4, best_day: 'lördag' },
  newsletter_welcome: {},
  day3_newsletter: {},
  day14_newsletter: {},
  day30_newsletter: {},
  manadsbrev: {},
  day60: { first_name: 'Anna' },
  day90: { first_name: 'Anna' },
  saved_island: {
    island_name: 'Grinda', island_tagline: 'Exempeltext: ösidans tagline hamnar här.',
    restid_rad: 'Exempeltext: ösidans restid hamnar här.',
    island_url: 'https://svalla.se/o/grinda', planera_url: 'https://svalla.se/utflykt?o=grinda',
    guide_rad: 'Mer att läsa: [Guider om Grinda](https://svalla.se/o/grinda)',
  },
  weekly_island: {
    island_name: 'Grinda', island_tagline: 'Exempeltext: ösidans tagline hamnar här.',
    restid_rad: 'Exempeltext: ösidans restid hamnar här.',
    island_url: 'https://svalla.se/o/grinda', planera_url: 'https://svalla.se/utflykt?o=grinda',
    guide_rad: '',
  },
}

const BESKRIVNING: Record<EmailTemplate, string> = {
  welcome: 'Nytt konto',
  day7: '7 dagar efter registrering',
  season_open: '1 april',
  season_close: '1 oktober',
  weather_tip: 'Torsdagar, om helgprognosen är bra',
  newsletter_welcome: 'Ny nyhetsbrevsprenumerant',
  day3_newsletter: 'Dag 3 efter prenumeration',
  day14_newsletter: 'Dag 14 efter prenumeration',
  day30_newsletter: 'Dag 30 efter prenumeration',
  manadsbrev: 'Första tisdagen i månaden okt–mars, bara om mallens manad stämmer',
  day60: 'Konto + 60 dagar utan tur och utan sparad ö',
  day90: 'Konto + 90 dagar utan tur och utan sparad ö',
  saved_island: 'Dagen efter att en användare sparat en ö (en gång per ö)',
  weekly_island: 'Tisdagar april–september, en ö per vecka',
}

const ORDNING: EmailTemplate[] = [
  'welcome', 'day7', 'season_open', 'season_close', 'weather_tip',
  'newsletter_welcome', 'day3_newsletter', 'day14_newsletter', 'day30_newsletter',
  'manadsbrev', 'day60', 'day90', 'saved_island', 'weekly_island',
]

export default async function AdminMailPage() {
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logga-in?next=/admin/mail')

  const { data: userRow } = await supabase
    .from('users').select('is_admin').eq('id', user.id).single()
  if (!userRow?.is_admin) redirect('/feed')

  const mail = ORDNING.map(t => ({
    nyckel: t,
    // Flödena i mailfloden.ts är avstängda tills de står i EMAIL_AUTOMATIK.
    beskrivning: (MAILFLODEN as readonly string[]).includes(t)
      ? `${BESKRIVNING[t]} · ${flodePa(t as Mailflode) ? 'PÅ' : 'AVSTÄNGT (EMAIL_AUTOMATIK)'}`
      : BESKRIVNING[t],
    // {{email}} sätts normalt av sendEmail (avregistreringslänken i sidfoten).
    // Förhandsvisningen skickar inte riktig post, men variabelspärren kräver
    // den ändå — annars vägrar renderEmail, vilket den också gjorde: nio röda
    // rutor på en nyss driftsatt sida. Spärren hade rätt, jag matade den fel.
    resultat: renderEmail(t, { email: 'exempel@svalla.se', ...EXEMPELVARDEN[t] }),
  }))

  const trasiga = mail.filter(m => !m.resultat.ok).length

  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-950 py-8 px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-baseline justify-between flex-wrap gap-3 mb-1">
          <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-slate-100">Mailutskick</h1>
          <Link href="/admin" className="text-sm text-sky-700 dark:text-sky-400 hover:underline">← Admin</Link>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Renderade av samma kod som skickar dem. Texten ligger i <code className="font-mono">emails/*.md</code>.
          {trasiga > 0
            ? <span className="ml-2 font-semibold text-red-600 dark:text-red-400">{trasiga} mall(ar) går inte att rendera.</span>
            : <span className="ml-2 text-emerald-700 dark:text-emerald-400">Alla {mail.length} renderar.</span>}
        </p>

        <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(380px,1fr))]">
          {mail.map(m => (
            <section key={m.nyckel} className="min-w-0">
              <div className="mb-2">
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 font-mono">{m.nyckel}</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">{m.beskrivning}</p>
                {m.resultat.ok && (
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                    <span className="text-slate-400">Ämne:</span> {m.resultat.subject}
                  </p>
                )}
              </div>
              {m.resultat.ok ? (
                <iframe
                  title={m.nyckel}
                  srcDoc={m.resultat.html}
                  className="w-full h-[820px] rounded-xl border border-slate-300 dark:border-slate-700 bg-white"
                />
              ) : (
                <div className="p-4 rounded-xl border border-red-300 bg-red-50 text-sm text-red-800 dark:bg-red-950/40 dark:border-red-800 dark:text-red-300">
                  {m.resultat.error}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
