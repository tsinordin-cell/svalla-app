/**
 * FÖRHANDSVISNING 2026-11-18/19: områden att välja mellan på krog-, boende-,
 * hamn- och aktivitetssidorna. Byggs ur regionLabel i island-data och fotona
 * i obilder.generated (fri licens, fotograf visas), så inget innehåll är nytt.
 */
import { ALL_ISLANDS } from '@/app/o/island-data'
import { OBILDER } from '@/app/o/obilder.generated'
import type { OmradeData, OmradeBild } from '@/components/OmradesVal'

const OMRADEN: { namn: string; etiketter: string[] }[] = [
  { namn: 'Stockholms skärgård', etiketter: ['Innerskärgården', 'Norra skärgården', 'Norra ytterskärgården', 'Mellersta skärgården', 'Mellersta ytterskärgården', 'Södra skärgården', 'Södra ytterskärgården'] },
  { namn: 'Roslagen', etiketter: ['Roslagen'] },
  { namn: 'Sörmland', etiketter: ['Sörmlands skärgård'] },
  { namn: 'Östergötland', etiketter: ['Östergötlands skärgård'] },
  { namn: 'Kalmar och Öland', etiketter: ['Kalmar läns skärgård', 'Kalmarsund', 'Öland'] },
  { namn: 'Gotland', etiketter: ['Gotland'] },
  { namn: 'Blekinge', etiketter: ['Blekinge'] },
  { namn: 'Skåne och Öresund', etiketter: ['Skånes kust', 'Öresund'] },
  { namn: 'Halland', etiketter: ['Hallands skärgård'] },
  { namn: 'Göteborgs skärgård', etiketter: ['Göteborgs norra skärgård', 'Göteborgs skärgård', 'Göteborgs södra skärgård'] },
  { namn: 'Bohuslän', etiketter: ['Bohuslän'] },
  { namn: 'Norrlandskusten', etiketter: ['Gävleborgs skärgård', 'Höga Kusten', 'Västerbotten', 'Norrbottens skärgård'] },
  { namn: 'Insjöar', etiketter: ['Mälaren', 'Vänern', 'Vättern'] },
]

// Aktiviteternas typ läses ur namnet på aktiviteten i island-data, inget gissas.
const AKT_TYPER: [RegExp, string][] = [
  [/kajak|paddl|kanot|sup\b/i, 'Kajak och paddling'],
  [/bad|strand|simn/i, 'Bad'],
  [/vandr|promen|stig|led\b|leden/i, 'Vandring'],
  [/cykl|cykel/i, 'Cykling'],
  [/fisk/i, 'Fiske'],
  [/segl/i, 'Segling'],
  [/dyk|snork/i, 'Dykning'],
  [/bastu/i, 'Bastu'],
]
const aktTyp = (namn: string) => AKT_TYPER.find(([re]) => re.test(namn))?.[1] ?? 'Annat'

const FLIK = { krogar: 'restauranger', boende: 'boende', hamnar: 'hamnar', aktiviteter: 'aktiviteter' } as const

export function bildFor(slug: string, oNamn: string): OmradeBild | undefined {
  const b = OBILDER[slug]
  return b ? { url: b.url, fotograf: b.fotograf, licens: b.licens, kalla: b.kalla, o: oNamn } : undefined
}

export function byggOmraden(vad: 'krogar' | 'boende' | 'hamnar' | 'aktiviteter'): OmradeData[] {
  return OMRADEN.map(o => {
    const oar = ALL_ISLANDS.filter(i => i.regionLabel && o.etiketter.includes(i.regionLabel))
    const lista = (i: (typeof oar)[number]) => {
      const href = `/o/${i.slug}/${FLIK[vad]}`
      if (vad === 'krogar') return (i.restaurants ?? []).map(r => ({ name: r.name, typ: r.type, o: i.name, oSlug: i.slug, href }))
      if (vad === 'boende') return (i.accommodation ?? []).map(a => ({ name: a.name, typ: a.type, o: i.name, oSlug: i.slug, href }))
      if (vad === 'aktiviteter') return (i.activities ?? []).map(a => ({ name: a.name, typ: aktTyp(a.name), o: i.name, oSlug: i.slug, href }))
      return (i.harbors ?? []).map(h => ({ name: h.name, typ: h.fuel ? 'Gästhamn med bränsle' : 'Gästhamn', o: i.name, oSlug: i.slug, href }))
    }
    const platser = oar.flatMap(lista)
    // Bild: ön med flest träffar som har ett fritt licensierat foto.
    const medBild = [...oar].filter(i => OBILDER[i.slug]).sort((a, b) => lista(b).length - lista(a).length)[0]
    return { namn: o.namn, platser, bild: medBild ? bildFor(medBild.slug, medBild.name) : undefined }
  })
}
