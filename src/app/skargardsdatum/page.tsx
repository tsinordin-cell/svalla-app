import type { Metadata } from 'next'
import Link from 'next/link'
import PublicFooter from '@/components/PublicFooter'
import SvallaLogo from '@/components/SvallaLogo'
import EmailSignup from '@/components/EmailSignup'

/**
 * /skargardsdatum: skärgårdens återkommande datum på ett ställe
 * (exitplanen, Innehåll & SEO, "sidor som äger återkommande datum", 2026-10-02).
 *
 * VARFÖR: "när är hummerpremiären 2027", "surströmmingspremiär 2027" och
 * liknande söks varje år. Varje datum har redan en egen guide med källa. Den
 * här sidan samlar dem i tidsordning och länkar till guiden som äger datumet,
 * så att sidan och guiderna stärker varandra i stället för att konkurrera.
 *
 * Inga nya påståenden här. Varje rad är hämtad ur en guide eller sida där
 * KÄLLA-raden redan finns:
 *  - Hummer: guides-data.ts hummerpremiar-bohuslan (havochvatten.se, "första
 *    måndagen efter 20 september", 2026 = 21 september, 2027 = 27 september,
 *    fritidsfiske till och med 30 november).
 *  - Surströmming: guides-data.ts surstrommingspremiar (isof.se, tredje
 *    torsdagen i augusti; 2027 = 19 augusti).
 *  - Kräftpremiär: guides-data.ts kraftskiva-skargarden (isof.se, första
 *    onsdagen i augusti klockan 17, tradition sedan förbudet upphävdes 1994).
 *    2027 = 4 augusti, uträknat ur regeln.
 *  - Waxholmsbolaget: /vintertidtabeller (linjetidtabeller lästa 2026-10-02).
 *  - SL-biljett: /farjor FAQ (waxholmsbolaget.se och sl.se, läst 2026-09-19).
 *  - Hundar: guides-data.ts hund-skargarden (jordbruksverket.se och
 *    lansstyrelsen.se Stockholm, 1 mars till 20 augusti; "I många
 *    naturreservat ska hunden vara kopplad hela året.").
 *  - Höstlov: guides-data.ts hostlov-vid-havet (Stockholms stads lärotider).
 *
 * Datum med år ska skrivas om när året passerat. Regeln står bredvid så att
 * raden går att kontrollera.
 */

export const metadata: Metadata = {
  title: { absolute: 'Skärgårdens datum 2026 och 2027: hummer, kräftor, surströmming, båtar | Svalla' },
  description:
    'När är hummerpremiären, kräftpremiären och surströmmingspremiären 2027, och när byter båtarna tidtabell? Varje datum med regel och källa.',
  alternates: { canonical: 'https://svalla.se/skargardsdatum' },
  openGraph: {
    title: 'Skärgårdens datum 2026 och 2027',
    description: 'Premiärer, fiskesäsonger och tidtabellsbyten i skärgården, med regel och källa.',
    url: 'https://svalla.se/skargardsdatum',
  },
}

type Datum = {
  nar: string
  vad: string
  regel: string
  lank: { href: string; text: string }
}

type Grupp = { rubrik: string; rader: Datum[] }

const GRUPPER: Grupp[] = [
  {
    rubrik: 'Hösten 2026',
    rader: [
      {
        nar: '26 till 30 oktober 2026',
        vad: 'Höstlov i Stockholms stads grundskolor (vecka 44)',
        regel: 'Varje kommun bestämmer sina lov. Kontrollera din kommun.',
        lank: { href: '/guider/hostlov-vid-havet', text: 'Höstlov vid havet' },
      },
      {
        nar: '1 november 2026',
        vad: 'Sista dagen för Waxholmsbolagets linjer till Blidösundet, Rödlöga och Arholma',
        regel: 'Linje 24, 26 och 27 har kortare höstperiod än övriga linjer.',
        lank: { href: '/vintertidtabeller', text: 'Vintertidtabeller' },
      },
      {
        nar: '30 november 2026',
        vad: 'Sista dagen för fritidsfiske efter hummer',
        regel: 'Yrkesfiskare får fiska till och med 31 december.',
        lank: { href: '/guider/hummerpremiar-bohuslan', text: 'Hummerpremiär och regler' },
      },
      {
        nar: '12 december 2026',
        vad: 'Sista dagen för höstens tidtabeller hos Waxholmsbolaget och Styrsöbolaget',
        regel: 'Vinterns tabeller är inte publicerade än. Förra vintern gällde Waxholmsbolagets 14 december 2025 till 1 april 2026.',
        lank: { href: '/vintertidtabeller', text: 'Vintertidtabeller' },
      },
    ],
  },
  {
    rubrik: '2027',
    rader: [
      {
        nar: '1 mars till 20 augusti',
        vad: 'Hundar får inte springa lösa i naturen',
        regel: 'Samma datum varje år, där det kan finnas vilda djur. I många naturreservat ska hunden vara kopplad hela året.',
        lank: { href: '/guider/hund-skargarden', text: 'Skärgård med hund' },
      },
      {
        nar: '4 augusti 2027',
        vad: 'Kräftpremiär enligt traditionen',
        regel: 'Första onsdagen i augusti klockan 17. Ingen officiell premiär sedan 1994, men dagen lever kvar.',
        lank: { href: '/guider/kraftskiva-skargarden', text: 'Kräftpremiär och kräftskiva' },
      },
      {
        nar: '19 augusti 2027',
        vad: 'Surströmmingspremiär',
        regel: 'Tredje torsdagen i augusti, sedan 1940.',
        lank: { href: '/guider/surstrommingspremiar', text: 'Surströmmingspremiär' },
      },
      {
        nar: '14 september till 29 april',
        vad: 'SL:s periodbiljetter på 30 dagar eller mer gäller i hela Waxholmsbolagets trafik',
        regel: 'Resten av året gäller SL-biljett bara mellan Strömkajen och Vaxholm med omnejd. Linje 17, 18 och 19 tar inte SL-biljett.',
        lank: { href: '/farjor', text: 'Färjetider' },
      },
      {
        nar: '27 september 2027 klockan 07.00',
        vad: 'Hummerpremiär',
        regel: 'Första måndagen efter 20 september, enligt Havs- och vattenmyndigheten.',
        lank: { href: '/guider/hummerpremiar-bohuslan', text: 'Hummerpremiär och regler' },
      },
    ],
  },
]

export default function SkargardsdatumPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ background: 'var(--grad-sea-hero)', padding: '52px 20px 40px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
            <SvallaLogo height={26} color="#ffffff" />
          </Link>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: '#fff', margin: '0 0 8px', letterSpacing: -0.3 }}>
            Skärgårdens datum 2026 och 2027
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, margin: 0, lineHeight: 1.55 }}>
            Premiärer, fiskesäsonger och tidtabellsbyten i tidsordning. Varje datum har sin regel bredvid och en guide med källan.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '24px 20px 8px' }}>
        {GRUPPER.map((g) => (
          <section key={g.rubrik} style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>{g.rubrik}</h2>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {g.rader.map((d) => (
                <li key={d.vad} style={{ background: 'var(--white)', borderRadius: 14, padding: '14px 18px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--sea)' }}>{d.nar}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '2px 0 4px' }}>{d.vad}</div>
                  <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5, marginBottom: 6 }}>{d.regel}</div>
                  <Link href={d.lank.href} style={{ fontSize: 14, fontWeight: 600, color: 'var(--sea)' }}>{d.lank.text}</Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 20px 48px' }}>
        <EmailSignup
          source="skargardsdatum"
          variant="card"
          title="Få skärgårdens säsongsnytt"
          description="Nya guider och säsongsnytt, när det händer något. Du kan avregistrera dig i varje utskick."
          buttonLabel="Prenumerera"
        />
      </div>

      <PublicFooter />
    </div>
  )
}
