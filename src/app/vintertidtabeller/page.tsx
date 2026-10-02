import type { Metadata } from 'next'
import Link from 'next/link'
import PublicFooter from '@/components/PublicFooter'
import SvallaLogo from '@/components/SvallaLogo'
import EmailSignup from '@/components/EmailSignup'

/**
 * /vintertidtabeller: vinterns båttidtabeller samlade, och ett skäl att lämna
 * mejladressen (exitplanen, E-post & CRM, 2026-10-02).
 *
 * VARFÖR: höstens tabeller tar slut 12 december och vinterns är inte
 * publicerade än. Den som har fritidshus eller ska till ett julbord på en ö
 * vill veta så fort de kommer. Det är ett ärligt skäl att lämna adressen:
 * vi skickar länkarna när rederierna publicerat dem, inget annat.
 *
 * Adresserna sparas i email_subscribers med source 'vintertidtabeller'.
 * Utskicket görs för hand när tabellerna finns, och godkänns av Max innan
 * det går iväg. Det finns inget automatiskt vinterutskick i cron.
 *
 * KÄLLOR (alla lästa 2026-10-02):
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
    'Höstens tidtabeller för Waxholmsbolaget och Styrsöbolaget gäller till 12 december. Vinterns är inte publicerade än. Här är vad som gäller nu, och vi mejlar länkarna när de kommer.',
  alternates: { canonical: 'https://svalla.se/vintertidtabeller' },
  openGraph: {
    title: 'Vintertidtabeller 2026/27 för skärgårdsbåtarna',
    description: 'Vad som gäller nu, när höstens tabeller tar slut och hur du får vinterns så fort de publiceras.',
    url: 'https://svalla.se/vintertidtabeller',
  },
}

const KONTROLLERAD = '2 oktober 2026'

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
    nu: 'Hösttidtabellerna gäller 17 augusti till 12 december 2026. Linje 24 (Blidösundet), 26 (Rödlöga) och 27 (Arholma) slutar redan 1 november.',
    vinter: 'Inte publicerad än. Förra vintern gällde vintertabellerna 14 december 2025 till 1 april 2026.',
    extra: 'Waxholmsbolaget byter tidtabell fyra gånger om året, och vissa linjer går bara en del av perioden. Under vintertidtabellen säljer vissa fartyg bara drycker ombord.',
    lank: { text: 'Linjetidtabeller som pdf', url: 'https://waxholmsbolaget.linjetidtabeller.se/' },
  },
  {
    namn: 'Styrsöbolaget (Västtrafik)',
    omrade: 'Göteborgs södra skärgård',
    nu: 'Hösttidtabellen för linje 281 till 284 gäller 24 augusti till 12 december 2026.',
    vinter: 'Inte publicerad än.',
    extra: 'Styrsöbolaget byter tidtabell tre gånger om året: sommar, höst och vinter.',
    lank: { text: 'Styrsöbolagets tidtabeller', url: 'https://styrsobolaget.se/tidtabeller/' },
  },
  {
    namn: 'Kosterbåtarna (Västtrafik)',
    omrade: 'Kosteröarna, Bohuslän',
    nu: 'Linje 899 och 898 går mellan Strömstad och Kosteröarna. Tiderna finns i Västtrafiks reseplanerare, inte som egen tabell.',
    vinter: 'Sök resan på det datum du ska åka.',
    extra: 'Från januari 2027 ingår Kosteröarna i Västtrafiks zon C i stället för ett eget biljettsortiment.',
    lank: { text: 'Kosterbåtarna hos Västtrafik', url: 'https://www.vasttrafik.se/info/kosterbatarna/' },
  },
]

export default function VintertidtabellerPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ background: 'var(--grad-sea-hero)', padding: '52px 20px 40px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
            <SvallaLogo height={26} color="#ffffff" />
          </Link>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: '#fff', margin: '0 0 8px', letterSpacing: -0.3 }}>
            Vintertidtabeller 2026/27
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, margin: 0, lineHeight: 1.55 }}>
            Höstens tidtabeller för skärgårdsbåtarna i Stockholm och Göteborg gäller till 12 december.
            Vinterns tabeller är inte publicerade än. Lämna din mejladress så skickar vi länkarna när rederierna lagt ut dem.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 20px 0' }}>
        <EmailSignup
          source="vintertidtabeller"
          variant="card"
          title="Få vintertidtabellerna när de kommer"
          description="Ett mejl med länkarna när Waxholmsbolaget och Styrsöbolaget publicerat vinterns tabeller. Du hamnar också på vårt nyhetsbrev och kan avregistrera dig i varje utskick."
          buttonLabel="Skicka till mig"
        />
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 20px 8px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>Det här gäller just nu</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {REDERIER.map((r) => (
            <article key={r.namn} style={{ background: 'var(--white)', borderRadius: 16, padding: '18px 20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: 0 }}>{r.namn}</h3>
              <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '2px 0 12px' }}>{r.omrade}</p>
              <dl style={{ margin: 0, fontSize: 14, lineHeight: 1.55, color: 'var(--txt2)' }}>
                <dt style={{ fontWeight: 700, color: 'var(--txt)' }}>Nu</dt>
                <dd style={{ margin: '0 0 8px' }}>{r.nu}</dd>
                <dt style={{ fontWeight: 700, color: 'var(--txt)' }}>Vinter</dt>
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
