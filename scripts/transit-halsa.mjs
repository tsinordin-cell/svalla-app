#!/usr/bin/env node
/**
 * Hälsovakt för avgångsrutorna (2026-11-28, Toms ja: "Följ din rekommendation").
 *
 * Varför: Trafiklab-nyckeln slutade fungera (ResRobot svarade 401) och rutorna
 * Avgångar och Sista båten var trasiga på alla öar utan att någon märkte det.
 *
 * Vad: anropar svalla.se/api/transit/departures för några öar med olika
 * operatörer. Svarar alla med fältet "fel" (tjänsten kunde inte hämta tider)
 * skapas ett LARM-kort på /team, om inget öppet sådant kort redan finns.
 * Fungerar tjänsten igen markeras ett öppet LARM-kort som klart.
 *
 * Körs av .github/workflows/transit-halsa.yml var tredje timme.
 * Kräver SUPABASE_URL och SUPABASE_SERVICE_ROLE_KEY (finns redan som
 * GitHub-hemligheter för backup-arbetsflödet). Inga hemligheter loggas.
 */

const BAS = process.env.SVALLA_URL || 'https://svalla.se'
const OAR = ['sandhamn', 'vaxholm', 'styrso']
export const LARM_TITEL = 'LARM: Avgångsrutorna på ösidorna kan inte hämta tider'

/** Bedömer ett svar från /api/transit/departures. */
export function bedom(status, json) {
  if (status !== 200 || !json || typeof json !== 'object') return { ok: false, skal: `HTTP ${status}` }
  if (json.error) return { ok: false, skal: `error: ${json.error}` }
  if (json.fel) return { ok: false, skal: `fel: ${json.fel}` }
  return { ok: true, skal: `${Array.isArray(json.trips) ? json.trips.length : 0} turer` }
}

async function provaOn(slug) {
  try {
    const r = await fetch(`${BAS}/api/transit/departures?dest=${encodeURIComponent(slug)}`, { headers: { accept: 'application/json' } })
    let json = null
    try { json = await r.json() } catch { /* ignoreras */ }
    return { slug, ...bedom(r.status, json) }
  } catch (e) {
    return { slug, ok: false, skal: `nätverk: ${e instanceof Error ? e.message : String(e)}` }
  }
}

async function supabase(vag, init = {}) {
  const url = process.env.SUPABASE_URL
  const nyckel = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !nyckel) throw new Error('SUPABASE_URL eller SUPABASE_SERVICE_ROLE_KEY saknas')
  const r = await fetch(`${url}/rest/v1/${vag}`, {
    ...init,
    headers: { apikey: nyckel, authorization: `Bearer ${nyckel}`, 'content-type': 'application/json', prefer: 'return=representation', ...(init.headers || {}) },
  })
  if (!r.ok) throw new Error(`Supabase ${r.status}: ${await r.text()}`)
  return r.json()
}

function stampel() {
  return new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm', hour12: false }).slice(0, 16)
}

async function main() {
  const resultat = await Promise.all(OAR.map(provaOn))
  const rad = resultat.map(r => `${r.slug}: ${r.ok ? 'OK' : 'FEL'} (${r.skal})`).join('; ')
  console.log(rad)
  const allaFel = resultat.every(r => !r.ok)

  const oppna = await supabase(`team_tasks?select=id,description&title=eq.${encodeURIComponent(LARM_TITEL)}&status=neq.done`)

  if (allaFel && oppna.length === 0) {
    await supabase('team_tasks', {
      method: 'POST',
      body: JSON.stringify({
        title: LARM_TITEL,
        status: 'todo',
        priority: 'high',
        description: `${stampel()} (hälsovakten): MÄTT: ${rad}.\n` +
          'Rutorna Avgångar och Sista båten visar inga tider. Vanligaste orsaken: Trafiklab-nyckeln (TRAFIKLAB_RESROBOT_KEY i Vercel) fungerar inte, ' +
          'till exempel 401 från ResRobot. Kontrollera nyckeln på trafiklab.se och i Vercel. Kortet markeras klart automatiskt när tjänsten fungerar igen.',
      }),
    })
    console.log('LARM-kort skapat')
  } else if (!allaFel && oppna.length > 0) {
    for (const k of oppna) {
      await supabase(`team_tasks?id=eq.${k.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'done', description: `${stampel()} (hälsovakten): ÅTERSTÄLLT. MÄTT: ${rad}.\n${k.description ?? ''}` }),
      })
    }
    console.log('LARM-kort markerat klart')
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(e => { console.error(e instanceof Error ? e.message : String(e)); process.exit(1) })
}
