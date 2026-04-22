import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import SvallaLogo from '@/components/SvallaLogo'
import { getArticleBySlug, renderMarkdown } from '@/lib/articles'

export const revalidate = 300

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const a = await getArticleBySlug(slug)
  if (!a) return { title: 'Artikel hittades inte — Svalla' }
  return {
    title: `${a.title} — Svalla`,
    description: a.excerpt || 'Redaktionellt innehåll från Svalla.',
    openGraph: {
      title: a.title,
      description: a.excerpt || '',
      url: `https://svalla.se/tips/${a.slug}`,
      images: a.cover_image ? [{ url: a.cover_image }] : undefined,
    },
  }
}

export default async function TipsArticlePage({ params }: Props) {
  const { slug } = await params
  const a = await getArticleBySlug(slug)
  if (!a || !a.published) notFound()

  const html = renderMarkdown(a.body_md)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 96 }}>
      {/* HERO */}
      <div style={{
        background: a.cover_image
          ? `linear-gradient(to bottom, rgba(12,36,54,0.45), rgba(12,36,54,0.75)), url(${a.cover_image}) center/cover`
          : 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '48px 20px 56px',
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link href="/tips" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: 'rgba(255,255,255,0.85)',
            fontSize: 13,
            textDecoration: 'none',
            marginBottom: 20,
          }}>
            ← Sthlmare tipsar
          </Link>

          <div style={{ marginBottom: 18 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <SvallaLogo height={22} color="#ffffff" />
            </Link>
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            {a.category && (
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#fff',
                background: 'rgba(255,255,255,0.18)',
                padding: '4px 10px',
                borderRadius: 20,
                textTransform: 'uppercase',
                letterSpacing: 0.4,
                backdropFilter: 'blur(8px)',
              }}>{a.category}</span>
            )}
            {a.reading_min != null && (
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>{a.reading_min} min läsning</span>
            )}
          </div>

          <h1 style={{
            fontSize: 34,
            fontWeight: 700,
            color: '#fff',
            margin: '0 0 14px',
            lineHeight: 1.2,
            letterSpacing: -0.3,
          }}>
            {a.title}
          </h1>

          {a.excerpt && (
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.88)', margin: 0, lineHeight: 1.5 }}>
              {a.excerpt}
            </p>
          )}

          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 20 }}>
            {a.author_name || 'Svalla-redaktionen'}
            {a.published_at && (
              <> · {new Date(a.published_at).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}</>
            )}
          </div>
        </div>
      </div>

      {/* BODY */}
      <article
        className="tips-article"
        style={{ maxWidth: 720, margin: '0 auto', padding: '40px 20px' }}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* TAGS */}
      {a.tags && a.tags.length > 0 && (
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 20px 32px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {a.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 12,
              color: 'var(--sea)',
              background: 'rgba(30,92,130,0.08)',
              padding: '5px 11px',
              borderRadius: 20,
              fontWeight: 600,
            }}>#{tag}</span>
          ))}
        </div>
      )}

      {/* Typography for markdown body */}
      <style>{`
        .tips-article h1 { font-size: 26px; font-weight: 700; color: var(--txt); margin: 36px 0 16px; line-height: 1.25; }
        .tips-article h2 { font-size: 22px; font-weight: 700; color: var(--txt); margin: 32px 0 14px; line-height: 1.3; }
        .tips-article h3 { font-size: 18px; font-weight: 700; color: var(--txt); margin: 24px 0 10px; }
        .tips-article p  { font-size: 16px; color: var(--txt2); line-height: 1.7; margin: 0 0 16px; }
        .tips-article ul { margin: 0 0 18px; padding-left: 22px; }
        .tips-article li { font-size: 16px; color: var(--txt2); line-height: 1.7; margin-bottom: 6px; }
        .tips-article a  { color: var(--sea); text-decoration: underline; }
        .tips-article strong { color: var(--txt); font-weight: 700; }
      `}</style>
    </div>
  )
}
