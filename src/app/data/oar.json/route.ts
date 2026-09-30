/**
 * GET /data/oar.json: ödatan som öppen fil, med källor.
 *
 * VARFÖR (exitplanen, 2026-09-30): en köpare eller partner ska kunna se vad
 * som ligger under ösidorna utan att be om en export. Filen visar vilka öar vi
 * täcker och vilka källor varje ö vilar på, räknat ur samma data som bygger
 * sidorna. Den blir aldrig inaktuell eftersom den genereras vid varje bygge.
 *
 * Vad som INTE följer med, och varför:
 *  - Citaten ur källorna (fältet `vad` i kallor.generated.ts). Texten är
 *    myndigheters och verksamheters, inte vår, och ska inte licensieras om
 *    av oss. Länken räcker för att kontrollera.
 *  - Koordinater. De är ungefärliga mittpunkter i datafilen, inte uppmätta.
 *  - Priser, klockslag och öppettider. De ändras över säsongen och hör hemma
 *    på ösidan där de står bredvid sin källa.
 *
 * Licens: CC BY 4.0 för sammanställningen. Källorna har sina egna villkor.
 */
import { ALL_ISLANDS } from '@/app/o/island-data'
import { KALLOR_PER_O } from '@/app/o/kallor.generated'

export const dynamic = 'force-static'

const BAS = 'https://svalla.se'

export function GET() {
  const oar = ALL_ISLANDS.map((o) => {
    const kallor = (KALLOR_PER_O[o.slug] ?? []).map((k) => ({
      url: k.url,
      avsandare: k.org,
      myndighet: k.myndighet,
      last: k.last,
    }))
    return {
      slug: o.slug,
      namn: o.name,
      region: o.region,
      url: `${BAS}/o/${o.slug}`,
      antal_kallor: kallor.length,
      kallor,
    }
  })

  const allaKallor = oar.flatMap((o) => o.kallor)
  const body = {
    namn: 'Svalla ödata',
    beskrivning:
      'Öar i svenska skärgårdar som Svalla täcker, med källorna varje ösida vilar på. ' +
      'Genereras vid varje bygge ur samma data som sidorna.',
    licens: 'CC BY 4.0',
    licens_url: 'https://creativecommons.org/licenses/by/4.0/deed.sv',
    erkannande: 'Svalla, svalla.se',
    kallornas_villkor: 'Varje källa har sina egna villkor. Följ länken.',
    antal_oar: oar.length,
    antal_kallor: allaKallor.length,
    antal_myndighetskallor: allaKallor.filter((k) => k.myndighet).length,
    oar,
  }

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
