/**
 * FÖRHANDSVISNING 2026-11-19: regionLabel i island-data till regionens sida,
 * för brödsmulor som går via regionen (Hem › Blekinge › Tärnö).
 */
const KARTA: { etiketter: string[]; namn: string; href: string }[] = [
  { namn: 'Stockholms skärgård', href: '/stockholms-skargard', etiketter: ['Innerskärgården', 'Norra skärgården', 'Norra ytterskärgården', 'Mellersta skärgården', 'Mellersta ytterskärgården', 'Södra skärgården', 'Södra ytterskärgården', 'Roslagen'] },
  { namn: 'Blekinge', href: '/blekinge-skargard', etiketter: ['Blekinge'] },
  { namn: 'Bohuslän', href: '/bohuslan', etiketter: ['Bohuslän'] },
  { namn: 'Göteborgs skärgård', href: '/goteborg-skargard', etiketter: ['Göteborgs norra skärgård', 'Göteborgs skärgård', 'Göteborgs södra skärgård'] },
  { namn: 'Gotland', href: '/gotland', etiketter: ['Gotland'] },
  { namn: 'Öland', href: '/oland', etiketter: ['Öland', 'Kalmarsund', 'Kalmar läns skärgård'] },
  { namn: 'Halland', href: '/halland', etiketter: ['Hallands skärgård'] },
  { namn: 'Höga Kusten', href: '/hoga-kusten', etiketter: ['Höga Kusten'] },
  { namn: 'Mälaren', href: '/malaren', etiketter: ['Mälaren'] },
]

export function regionForIsland(regionLabel?: string): { namn: string; href: string } {
  const r = KARTA.find(k => regionLabel && k.etiketter.includes(regionLabel))
  return r ? { namn: r.namn, href: r.href } : { namn: 'Alla öar', href: '/oar' }
}
