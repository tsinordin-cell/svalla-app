'use client'
import { useState } from 'react'

export interface FAQItem {
  q: string
  a: string
}

interface Props {
  items: FAQItem[]
  title?: string
  /** Skapar JSON-LD/FAQPage schema för Google Featured Snippets */
  includeSchema?: boolean
  schemaUrl?: string
}

export default function FAQSection({
  items,
  title = 'Vanliga frågor',
  includeSchema = true,
  schemaUrl,
}: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  if (!items || items.length === 0) return null

  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: '24px 24px 32px' }}>
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              ...(schemaUrl ? { url: schemaUrl } : {}),
              mainEntity: items.map(item => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.a,
                },
              })),
            }),
          }}
        />
      )}

      <h2 style={{
        fontSize: 22, fontWeight: 700,
        marginBottom: 14, color: 'var(--txt, #1a2530)',
        fontFamily: "'Playfair Display', Georgia, serif",
      }}>
        {title}
      </h2>

      <div style={{
        background: 'var(--surface-1, #fff)',
        border: '1px solid var(--border, rgba(0,0,0,0.08))',
        borderRadius: 14,
        overflow: 'hidden',
      }}>
        {items.map((item, i) => {
          const isOpen = openIdx === i
          return (
            <div key={i} style={{ borderBottom: i < items.length - 1 ? '1px solid var(--border, rgba(0,0,0,0.08))' : 'none' }}>
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-${i}-answer`}
                style={{
                  width: '100%', padding: '16px 18px', textAlign: 'left',
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14,
                  fontSize: 15, fontWeight: 600, color: 'var(--txt, #1a2530)',
                }}
              >
                <span>{item.q}</span>
                <span aria-hidden style={{
                  fontSize: 18, color: 'var(--sea, #1e5c82)',
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform .2s',
                  flexShrink: 0,
                }}>⌄</span>
              </button>
              {isOpen && (
                <div
                  id={`faq-${i}-answer`}
                  style={{
                    padding: '0 18px 18px', fontSize: 14, lineHeight: 1.65,
                    color: 'var(--txt2, rgba(0,0,0,0.72))',
                  }}
                >
                  {item.a}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
