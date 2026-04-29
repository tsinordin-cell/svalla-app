import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SvallaLogo from '@/components/SvallaLogo'
import EmailSignup from '@/components/EmailSignup'
import { ACTIVITY_LIST, getActivity, islandsForActivity, type ActivityType } from '../activity-data'

type Props = { params: Promise<{ type: string }> }

export async function generateStaticParams() {
  return ACTIVITY_LIST.map(a => ({ type: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params
  const activity = getActivity(type)
  if (!activity) return {}
  const islandCount = islandsForActivity(activity.slug).length
  return {
    title: `${activity.name} i skärgården — ${islandCount} öar att välja mellan | Svalla`,
    description: `Hitta de bästa öarna för ${activity.name.toLowerCase()} i Stockholms och Bohusläns skärgård. ${activity.description.split('.')[0]}.`,
    keywords: [`${activity.name.toLowerCase()} skärgården`, `${activity.name.toLowerCase()} stockholm`, `${activity.name.toLowerCase()} bohuslän`, 'skärgården'],
    alternates: { canonical: `https://svalla.se/aktivitet/${activity.slug}` },
    openGraph: {
      title: `${activity.name} i skärgården`,
      description: activity.hero,
      url: `https://svalla.se/aktivitet/${activity.slug}`,
    },
  }
}

export default async function ActivityTypePage({ params }: Props) {
  const { type } = await params
  const activity = getActivity(type)
  if (!activity) notFound()

  const islands = islandsForActivity(activity.slug as ActivityType)
  const grouped = {
    norra: islands.filter(i => i.region === 'norra'),
    mellersta: islands.filter(i => i.region === 'mellersta'),
    södra: islands.filter(i => i.region === 'södra'),
    bohuslan: islands.filter(i => i.region === 'bohuslan'),
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{
        background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '18px 24px 16px',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <SvallaLogo height={24} color="#ffffff" />
          </Link>
          <Link href="/aktivitet" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textDecoration: 'none' }}>
            ← Alla aktiviteter
          </Link>
        </div>
      </nav>

      <header style={{
        background: 'linear-gradient(170deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '40px 24px 56px', color: '#fff',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>
            Aktivitet · {islands.length} öar
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>
            {activity.hero}
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.55, marginTop: 12, maxWidth: 640, opacity: 0.92 }}>
            {activity.description}
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '-24px auto 0', padding: '0 16px 60px' }}>
        {/* Faktarutor */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 28 }}>
          <div style={{ background: 'var(--white)', border: '1px solid var(--surface-3)', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 }}>Bästa säsong</div>
            <div style={{ fontSize: 13, color: 'var(--txt)', fontWeight: 600 }}>{activity.bestSeason}</div>
          </div>
          <div style={{ background: 'var(--white)', border: '1px solid var(--surface-3)', borderRadius: 12, padding: '14px 16px' }}>
            <div style={{ fontSize: 11, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 }}>Svårighetsgrad</div>
            <div style={{ fontSize: 13, color: 'var(--txt)', fontWeight: 600 }}>{activity.level}</div>
          </div>
        </div>

        {/* Packlista */}
        <div style={{
          background: 'var(--white)', border: '1px solid var(--surface-3)',
          borderRadius: 14, padding: '20px 22px', marginBottom: 28,
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 10px' }}>
            Vad du behöver packa
          </h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
            {activity.whatToBring.map(item => (
              <li key={item} style={{
                fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5,
                paddingLeft: 18, position: 'relative',
              }}>
                <span style={{
                  position: 'absolute', left: 0, top: 6, width: 10, height: 10,
                  borderRadius: 999, background: 'var(--sea)',
                }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Öar grupperade per region */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', margin: '0 0 16px', fontFamily: "'Playfair Display', Georgia, serif" }}>
          Öar för {activity.shortName.toLowerCase()}
        </h2>

        {(['norra', 'mellersta', 'södra', 'bohuslan'] as const).map(region => {
          if (grouped[region].length === 0) return null
          const label = region === 'bohuslan' ? 'Bohuslän' : `${region.charAt(0).toUpperCase()}${region.slice(1)} skärgården`
          return (
            <section key={region} style={{ marginBottom: 24 }}>
              <h3 style={{
                fontSize: 12, fontWeight: 700, color: 'var(--txt3)',
                textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10,
              }}>
                {label} · {grouped[region].length}
              </h3>
              <div style={{ display: 'grid', gap: 10 }}>
                {grouped[region].map(island => (
                  <Link
                    key={island.slug}
                    href={`/aktivitet/${activity.slug}/${island.slug}`}
                    style={{
                      background: 'var(--white)',
                      border: '1px solid var(--surface-3)',
                      borderRadius: 12,
                      padding: '14px 18px',
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'flex', alignItems: 'center', gap: 14,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', marginBottom: 2 }}>
                        {island.name}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--txt2)', lineHeight: 1.4 }}>
                        {island.tagline}
                      </div>
                    </div>
                    <span style={{ color: 'var(--sea)', fontSize: 18 }}>→</span>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}

        {islands.length === 0 && (
          <div style={{
            background: 'var(--white)', border: '1px solid var(--surface-3)',
            borderRadius: 12, padding: '24px', color: 'var(--txt2)', fontSize: 14,
          }}>
            Vi hittade inga öar som matchar — säg till om någon ö har {activity.shortName.toLowerCase()} så lägger vi till den.
          </div>
        )}

        {/* Cross-länk till andra aktiviteter */}
        <div style={{
          marginTop: 32, padding: '20px 22px',
          background: 'var(--white)', borderRadius: 14,
          border: '1px solid var(--surface-3)',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Andra aktiviteter</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 14 }}>
            {ACTIVITY_LIST.filter(a => a.slug !== activity.slug).map(a => (
              <Link
                key={a.slug}
                href={`/aktivitet/${a.slug}`}
                style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}
              >
                {a.name} →
              </Link>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <EmailSignup
            variant="card"
            source={`aktivitet-${activity.slug}`}
            title={`Mer om ${activity.shortName.toLowerCase()} i skärgården`}
            description="Få nya guider, säsongstips och insidertips direkt i mailen. 2 mail i månaden."
          />
        </div>
      </main>
    </div>
  )
}
