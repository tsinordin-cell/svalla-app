/**
 * sidodatum — riktiga "senast ändrad"-datum för sitemap.xml (2026-10-10).
 *
 * Tidigare fick nästan varje sida lastModified = new Date(), alltså "ändrad i
 * dag" vid varje hämtning. Google slutar då läsa datumet alls. Nu används det
 * senaste datum då innehållet faktiskt ändrades enligt git
 * (scripts/generera-sidodatum.mjs → src/app/sidodatum.generated.ts).
 * Hittas inget datum returneras undefined — hellre inget datum än ett som ljuger.
 */
import { SIDODATUM } from '@/app/sidodatum.generated'

type Datumkarta = Record<string, string>

function monster(karta: Datumkarta) {
  return Object.keys(karta)
    .filter(k => k.startsWith('sida:'))
    .map(k => ({ delar: k.slice(5).split('/').filter(Boolean), datum: karta[k]! }))
}

const STANDARD_MONSTER = monster(SIDODATUM)

function sidaDatum(karta: Datumkarta, rutter: ReturnType<typeof monster>, sokvag: string): string | undefined {
  const exakt = karta[`sida:${sokvag}`]
  if (exakt) return exakt
  const delar = sokvag.split('/').filter(Boolean)
  // Dynamisk mapp, t.ex. /jamfor/[pair] eller /o/[slug]/[kategori]. Statiska
  // segment matchar före dynamiska, så /o/[slug]/restauranger vinner över /o/[slug]/[x].
  const traffar = rutter.filter(r =>
    r.delar.length === delar.length &&
    r.delar.every((d, i) => d === delar[i] || /^\[.+\]$/.test(d)))
  traffar.sort((a, b) =>
    b.delar.filter(d => !d.startsWith('[')).length - a.delar.filter(d => !d.startsWith('[')).length)
  return traffar[0]?.datum
}

/** Senaste verkliga ändringsdatum för en URL, eller undefined om det är okänt. */
export function verkligtDatum(url: string, karta: Datumkarta = SIDODATUM): Date | undefined {
  const rutter = karta === SIDODATUM ? STANDARD_MONSTER : monster(karta)
  const sokvag = new URL(url).pathname.replace(/\/$/, '') || '/'
  const delar = sokvag.split('/').filter(Boolean)
  const kandidater: (string | undefined)[] = []
  if (delar[0] === 'guider' && delar.length === 2) kandidater.push(karta[`guide:${delar[1]}`])
  if (delar[0] === 'o' && delar[1]) kandidater.push(karta[`o:${delar[1]}`])
  // Aktivitet × ö: /aktivitet/<aktivitet>/<ö>
  if (delar[0] === 'aktivitet' && delar[2]) kandidater.push(karta[`o:${delar[2]}`])
  kandidater.push(sidaDatum(karta, rutter, sokvag))
  const senast = kandidater.filter((d): d is string => !!d).sort().pop()
  return senast ? new Date(`${senast}T12:00:00Z`) : undefined
}
