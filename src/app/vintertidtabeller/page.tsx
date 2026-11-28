import type { Metadata } from 'next'
import SidHuvud from '@/components/SidHuvud'
import Link from 'next/link'
import PublicFooter from '@/components/PublicFooter'
import EmailSignup from '@/components/EmailSignup'
import { ogSida } from '@/lib/og-standard'

/**
 * /vintertidtabeller: vinterns båttidtabeller samlade, och ett skäl att lämna
 * mejladressen (exitplanen, E-post & CRM, 2026-10-02).
 *
 * VARFÖR (2026-10-02): höstens tabeller tar slut 12 december och vinterns var inte
 * publicerade då. Granskningen 2026-11-28 (fas 3, f300b-0080 och framåt): vinterns
 * tabeller är nu publicerade hos Waxholmsbolaget, Styrsöbolaget och Västtrafik. Runda 2 (2026-11-28):
 * sidan skriver perioderna utan "nu", så att den stämmer också efter 13 december, och mejlrutan
 * gäller nästa tidtabellsbyte. Den som har fritidshus eller ska till ett julbord på en ö
 * vill veta så fort de kommer. Det är ett ärligt skäl att lämna adressen:
 * vi skickar länkarna när rederierna publicerat nästa periods tabeller, inget annat.
 *
 * Adresserna sparas i email_subscribers med source 'vintertidtabeller'.
 * Utskicket görs för hand när tabellerna finns, och godkänns av Max innan
 * det går iväg. Det finns inget automatiskt vinterutskick i cron.
 *
 * KÄLLOR 2026-11-28 (fas 3):
 *  (waxholmsbolaget.linjetidtabeller.se: EJ NÅBAR i runda 2, 2026-11-28; Chromium visade en verifieringssida.)
 *  KÄLLA: https://kund.printhuset-sthlm.se/wa/w11.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027" (läst 2026-11-28)
 *    (MÄTT 2026-11-28: 28 av 30 vintertabeller har den raden; w12 har egna perioder och w7:s rubrik går inte att läsa ur pdf:en.)
 *  KÄLLA: https://kund.printhuset-sthlm.se/wa/w12.pdf — "12A STOCKHOLM – LILLSVED – NORRA INGMARSÖ", "GÄLLER 13/12 – 6/1 OCH 25/3 – 11/4 SAMT ISFRI PERIOD 7/1 – 24/3" (läst 2026-11-28)
 *  KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026" (läst 2026-11-28)
 *  KÄLLA: https://kund.printhuset-sthlm.se/wa/h24.pdf — "24A STOCKHOLM – VAXHOLM – BLIDÖSUNDET", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026" (läst 2026-11-28)
 *  KÄLLA: https://kund.printhuset-sthlm.se/wa/h26.pdf — "26A STOCKHOLM – VAXHOLM – NORRSUND – RÖDLÖGA", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026" (läst 2026-11-28)
 *  KÄLLA: https://kund.printhuset-sthlm.se/wa/h27.pdf — "27A STOCKHOLM – VAXHOLM – NORRSUND – ARHOLMA", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026" (läst 2026-11-28)
 *  KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – BROMSKÄR / RÖDLÖGA", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 30 SEPTEMBER 2026" (läst 2026-11-28)
 *  KÄLLA: https://styrsobolaget.se/tidtabeller/ — "Hösttidtabell L 285, 286, 287 20260817-20261213", "Vintertidtabell L 285, 286, 287 20261213-20270614" (läst 2026-11-28)
 *  KÄLLA: https://waxholmsbolaget.se/reseplanering/tidtabeller — "Waxholmsbolaget byter tidtabell fyra gånger om året, men vissa linjer går bara delar av en period." (läst 2026-11-28)
 *  KÄLLA: https://waxholmsbolaget.se/att-resa-med-oss/fore-och-under-resan — "Under vintertidtabellen (december till april) har vissa fartyg bara försäljning av varma och kalla drycker ombord." (läst 2026-11-28)
 *  KÄLLA: https://styrsobolaget.se/tidtabeller/ — "Tidtabellskifte sker tre gånger om året: sommar, höst och vinter", "Hösttidtabell L 281-282 20260824-20261212", "Vinterttidtabell L 281-282 20261213-20270606", "Vinterttidtabell L 283 20261213-20270606", "Vinterttidtabell L 284 20261213-20270606" (läst 2026-11-28)
 *  KÄLLA: https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014489900000/ — "Tidtabell linje 899", "Strömstad - Kosteröarna - Strömstad", "Gäller 2026-09-27 till 2026-12-12", "Gäller 2026-12-13 till 2027-05-15" (läst 2026-11-28)
 *  KÄLLA: https://www.vasttrafik.se/info/kosterbatarna/ — "Kosterbåtarna - linje 899 och 898", "Kosterbåtarna kör mellan Strömstad och Kosteröarna.", "Från januari 2027 kommer Kosteröarna istället ingå i zon C." (läst 2026-11-28)
 *
 * KÄLLOR (alla lästa 2026-10-02, före fas 3):
 *  - waxholmsbolaget.se/reseplanering/tidtabeller: "Waxholmsbolaget byter
 *    tidtabell fyra gånger om året, men vissa linjer går bara delar av en
 *    period." Linjetidtabellerna ligger i en extern tjänst.
 *  - waxholmsbolaget.linjetidtabeller.se: 38 linjetidtabeller. Linjerna i
 *    persontrafiken gäller 2026-08-17 till 2026-12-12, utom linje 24
 *    (Blidösundet), 26 (Rödlöga) och 27 (Arholma) som gäller till 2026-11-01.
 *    Ingen tabell som börjar efter 12 december var publicerad.
 *  - styrsobolaget.se/tidtabeller: "Tidtabellskifte sker tre gånger om året:
 *    sommar, höst och vinter." Hösttidtabell L 281 till 284 gäller
 *    2026-08-24 till 2026-12-12. Ingen vintertidtabell publicerad.
 *  - vasttrafik.se/info/kosterbatarna: linje 899 och 898 mellan Strömstad och
 *    Kosteröarna, tider i reseplaneraren. "Från januari 2027 kommer
 *    Kosteröarna istället ingå i zon C."
 *  - Förra vinterns datum: kund.printhuset-sthlm.se/wa/w28.pdf, "GÄLLER 14
 *    DECEMBER 2025 – 1 APRIL 2026" (samma källa som guiden julbord-skargarden).
 *  - Drycker ombord: waxholmsbolaget.se/att-resa-med-oss/fore-och-under-resan,
 *    "Under vintertidtabellen (december till april) har vissa fartyg bara
 *    försäljning av varma och kalla drycker ombord."
 */

export const metadata: Metadata = {
  title: { absolute: 'Vintertidtabeller 2026/27 för skärgårdsbåtarna | Svalla' },
  description:
    'Vinterns tidtabeller för Waxholmsbolaget, Styrsöbolaget och Kosterbåtarna är publicerade och gäller från 13 december 2026. Här är perioderna för hösten och vintern 2026/27, med länkar till rederiernas tabeller.',
  alternates: { canonical: 'https://svalla.se/vintertidtabeller' },
  openGraph: {
    images: ogSida('https://svalla.se/vintertidtabeller'),
    title: 'Vintertidtabeller 2026/27 för skärgårdsbåtarna',
    description: 'Perioderna för höstens och vinterns tidtabeller 2026/27 hos Waxholmsbolaget, Styrsöbolaget och Kosterbåtarna, med länkar till rederiernas tabeller.',
    url: 'https://svalla.se/vintertidtabeller',
  },
}

const KONTROLLERAD = '28 november 2026'

type Rederi = {
  namn: string
  omrade: string
  nu: string
  vinter: string
  extra?: string
  lank: { text: string; url: string }
}

const REDERIER: Rederi[] = [
  {
    namn: 'Waxholmsbolaget',
    omrade: 'Stockholms skärgård',
    nu: 'Höstperioden för de flesta linjer: 17 augusti till 12 december 2026. Linje 28 hade höstperiod till 30 september 2026, och linje 24 (Blidösundet), 26 (Rödlöga) och 27 (Arholma) till 1 november 2026.',
    vinter: 'Publicerad. För de flesta linjer gäller vintertabellen 13 december 2026 till 11 april 2027. Linje 12 följer vintertabellen 13 december till 6 januari och 25 mars till 11 april, och 7 januari till 24 mars när det är isfritt.',
    extra: 'Waxholmsbolaget byter tidtabell fyra gånger om året, och vissa linjer går bara en del av perioden. Under vintertidtabellen säljer vissa fartyg bara drycker ombord.',
    lank: { text: 'Linjetidtabeller som pdf', url: 'https://waxholmsbolaget.linjetidtabeller.se/' },
  },
  {
    namn: 'Styrsöbolaget (Västtrafik)',
    omrade: 'Göteborgs södra skärgård',
    nu: 'Höstperioden för linje 281 till 284: 24 augusti till 12 december 2026. För linje 285, 286 och 287: 17 augusti till 13 december 2026.',
    vinter: 'Publicerad. Vintertidtabellen för linje 281 till 284 gäller 13 december 2026 till 6 juni 2027, och för linje 285, 286 och 287 13 december 2026 till 14 juni 2027.',
    extra: 'Styrsöbolaget byter tidtabell tre gånger om året: sommar, höst och vinter.',
    lank: { text: 'Styrsöbolagets tidtabeller', url: 'https://styrsobolaget.se/tidtabeller/' },
  },
  {
    namn: 'Kosterbåtarna (Västtrafik)',
    omrade: 'Kosteröarna, Bohuslän',
    nu: 'Linje 899 och 898 går mellan Strömstad och Kosteröarna. Höstperioden i Västtrafiks tabell för linje 899: 27 september till 12 december 2026.',
    vinter: 'Tabellen för linje 899 gäller 13 december 2026 till 15 maj 2027. I Västtrafiks reseplanerare får du tiderna i realtid.',
    extra: 'Från januari 2027 ingår Kosteröarna i Västtrafiks zon C i stället för ett eget biljettsortiment.',
    lank: { text: 'Tidtabell linje 899 hos Västtrafik', url: 'https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014489900000/' },
  },
]

export default function VintertidtabellerPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <SidHuvud />
      <div style={{ background: 'var(--grad-sea-hero)', padding: '52px 20px 40px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: '#fff', margin: '0 0 8px', letterSpacing: -0.3 }}>
            Vintertidtabeller 2026/27
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, margin: 0, lineHeight: 1.55 }}>
            {/* RÄTTAD 2026-11-28 (fas 3, f300b-0079; runda 2, f300b-0076): vinterns tabeller är publicerade; texten säger inte "nu",
                så att den stämmer också efter 13 december. KÄLLA-raderna i kommentaren överst. */}
            Vinterns tidtabeller för skärgårdsbåtarna i Stockholm och Göteborg är publicerade och gäller från 13 december 2026.
            Här är perioderna för hösten och vintern, med länkar till rederiernas tabeller.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 20px 0' }}>
        <EmailSignup
          source="vintertidtabeller"
          variant="card"
          // RUNDA 2 (2026-11-28, f300b-0081, f300b-0082): vinterns tabeller är redan publicerade, så rutan gäller nästa tidtabellsbyte.
          // KÄLLA: https://waxholmsbolaget.se/reseplanering/tidtabeller — "Waxholmsbolaget byter tidtabell fyra gånger om året, men vissa linjer går bara delar av en period." (läst 2026-11-28)
          // KÄLLA: https://styrsobolaget.se/tidtabeller/ — "Tidtabellskifte sker tre gånger om året: sommar, höst och vinter och tidtabellerna publiceras här." (läst 2026-11-28)
          title="Få ett mejl vid nästa tidtabellsbyte"
          description="Ett mejl med länkarna när Waxholmsbolaget och Styrsöbolaget publicerat tabellerna för nästa period. Du hamnar också på vårt nyhetsbrev och kan avregistrera dig i varje utskick."
          buttonLabel="Skicka till mig"
        />
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 20px 8px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>Hösten 2026 och vintern 2026/27</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {REDERIER.map((r) => (
            <article key={r.namn} style={{ background: 'var(--white)', borderRadius: 16, padding: '18px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: 0 }}>{r.namn}</h3>
              <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '2px 0 12px' }}>{r.omrade}</p>
              <dl style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--txt2)' }}>
                <dt style={{ fontWeight: 700, color: 'var(--txt)' }}>Hösten 2026</dt>
                <dd style={{ margin: '0 0 8px' }}>{r.nu}</dd>
                <dt style={{ fontWeight: 700, color: 'var(--txt)' }}>Vintern 2026/27</dt>
                <dd style={{ margin: '0 0 8px' }}>{r.vinter}</dd>
              </dl>
              {r.extra && <p style={{ fontSize: 13, color: 'var(--txt2)', margin: '0 0 10px', lineHeight: 1.5 }}>{r.extra}</p>}
              <a href={r.lank.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 600, color: 'var(--sea)' }}>
                {r.lank.text}
              </a>
            </article>
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'var(--txt3)', margin: '14px 0 0', lineHeight: 1.5 }}>
          Kontrollerat {KONTROLLERAD} mot rederiernas egna sidor. Tidtabellerna visar hur trafiken är planerad och båtarna kan ändras med kort varsel. Kolla alltid rederiets trafikinformation samma dag.
        </p>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 20px 48px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 10px' }}>Läs vidare</h2>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 15, lineHeight: 1.9 }}>
          <li><Link href="/guider/vinter-i-skargarden" style={{ color: 'var(--sea)' }}>Stockholms skärgård på vintern</Link></li>
          <li><Link href="/guider/julbord-skargarden" style={{ color: 'var(--sea)' }}>Julbord i skärgården 2026</Link></li>
          <li><Link href="/farjor" style={{ color: 'var(--sea)' }}>Färjetider och kommande avgångar</Link></li>
        </ul>
      </div>

      <PublicFooter />
    </div>
  )
}
