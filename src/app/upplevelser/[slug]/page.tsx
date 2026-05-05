import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { EXPERIENCES, getExperience } from '../experiences-data'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return EXPERIENCES.map(e => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const exp = getExperience(slug)
  if (!exp) return {}
  return {
    title: `${exp.name} på ${exp.islandName} – Svalla`,
    description: exp.description,
    alternates: { canonical: `https://svalla.se/upplevelser/${slug}` },
    openGraph: {
      title: `${exp.name} på ${exp.islandName} – Svalla`,
      description: exp.description,
      url: `https://svalla.se/upplevelser/${slug}`,
    },
  }
}

const CATEGORY_LABELS: Record<string, string> = {
  ribbåtstur: 'Ribbåtstur',
  fisketur: 'Fisketur',
  kajak: 'Kajak',
  sup: 'SUP',
  dykning: 'Dykning',
  segling: 'Segling',
  naturtur: 'Naturtur',
  kulturtur: 'Kulturtur',
  övrigt: 'Övrigt',
}

export default async function UpplevelseDetailPage({ params }: Props) {
  const { slug } = await params
  const exp = getExperience(slug)
  if (!exp) notFound()

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg, #f8f7f4)', paddingBottom: 80 }}>
      {/* Back link */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '28px 24px 0' }}>
        <Link
          href="/upplevelser"
          style={{
            fontSize: 14,
            color: 'var(--sea, #0a7b8c)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          ← Alla upplevelser
        </Link>
      </div>

      {/* Content card */}
      <article style={{
        maxWidth: 720,
        margin: '20px auto 0',
        padding: '0 24px',
      }}>
        {/* Badges */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            color: 'var(--sea, #0a7b8c)',
            background: 'rgba(10,123,140,0.1)',
            padding: '4px 10px',
            borderRadius: 20,
          }}>
            {CATEGORY_LABELS[exp.category] ?? exp.category}
          </span>
          <Link
            href={`/o/${exp.islandSlug}`}
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: 'var(--txt3, #888)',
              background: 'var(--surface, #fff)',
              border: '1px solid var(--border, rgba(0,0,0,0.1))',
              padding: '4px 10px',
              borderRadius: 20,
              textDecoration: 'none',
            }}
          >
            {exp.islandName}
          </Link>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
          fontSize: 'clamp(26px, 4vw, 40px)',
          fontWeight: 700,
          color: 'var(--txt, #1a1a1a)',
          margin: '0 0 6px',
          lineHeight: 1.2,
        }}>
          {exp.name}
        </h1>

        {/* Provider */}
        <p style={{ fontSize: 15, color: 'var(--txt3, #888)', margin: '0 0 28px' }}>
          {exp.provider}
        </p>

        {/* Meta facts */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 12,
          marginBottom: 32,
        }}>
          {[
            { label: 'Varaktighet', value: exp.duration },
            { label: 'Pris', value: exp.price },
            { label: 'Säsong', value: exp.season },
            { label: 'Ö', value: exp.islandName },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                background: 'var(--surface, #fff)',
                border: '1px solid var(--border, rgba(0,0,0,0.08))',
                borderRadius: 10,
                padding: '12px 16px',
              }}
            >
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--txt3, #888)', margin: '0 0 4px' }}>
                {label}
              </p>
              <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--txt, #1a1a1a)', margin: 0 }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Description */}
        <p style={{
          fontSize: 17,
          color: 'var(--txt2, #444)',
          lineHeight: 1.7,
          margin: '0 0 32px',
        }}>
          {exp.description}
        </p>

        {/* CTA */}
        <a
          href={exp.bookingUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--sea, #0a7b8c)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 16,
            padding: '14px 28px',
            borderRadius: 10,
            textDecoration: 'none',
            marginBottom: 40,
          }}
        >
          Boka nu →
        </a>

        {/* Island link */}
        <div style={{ marginBottom: 48 }}>
          <Link
            href={`/o/${exp.islandSlug}`}
            style={{
              fontSize: 14,
              color: 'var(--sea, #0a7b8c)',
              textDecoration: 'none',
            }}
          >
            Se allt på {exp.islandName} →
          </Link>
        </div>

        {/* Disclaimer */}
        <p style={{
          fontSize: 12,
          color: 'var(--txt3, #aaa)',
          lineHeight: 1.6,
          borderTop: '1px solid var(--border, rgba(0,0,0,0.08))',
          paddingTop: 20,
          marginBottom: 0,
        }}>
          Svalla kan få provision när du bokar via våra länkar. Det påverkar inte priset du betalar.
        </p>
      </article>
    </main>
  )
}
