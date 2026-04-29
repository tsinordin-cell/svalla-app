'use client'
import { useState } from 'react'
import { type ContentPost } from './content-data'

interface Props {
  post: ContentPost
  channelColor: string
}

export default function ContentPostCard({ post, channelColor }: Props) {
  const [copied, setCopied] = useState<'hook' | 'body' | 'all' | null>(null)

  async function copy(value: string, kind: 'hook' | 'body' | 'all') {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(kind)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      // ignore
    }
  }

  const fullText = post.body
  const expanded = post.hook + '\n\n' + post.body

  return (
    <div style={{
      background: 'var(--white)',
      border: '1px solid var(--surface-3)',
      borderLeft: `4px solid ${channelColor}`,
      borderRadius: 12,
      padding: '16px 18px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 4 }}>
            {post.audience}
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: 0, lineHeight: 1.35 }}>
            {post.hook}
          </h3>
        </div>
        <button
          onClick={() => copy(expanded, 'all')}
          style={{
            padding: '6px 12px', borderRadius: 8,
            border: `1px solid ${channelColor}`,
            background: copied === 'all' ? channelColor : 'transparent',
            color: copied === 'all' ? '#fff' : channelColor,
            fontSize: 12, fontWeight: 700,
            cursor: 'pointer', flexShrink: 0,
            transition: 'all .15s',
          }}
        >
          {copied === 'all' ? '✓ Kopierat' : 'Kopiera allt'}
        </button>
      </div>

      <pre style={{
        margin: '12px 0',
        padding: '12px 14px',
        background: 'var(--bg)',
        borderRadius: 8,
        fontSize: 13,
        color: 'var(--txt2)',
        lineHeight: 1.55,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        fontFamily: 'inherit',
        maxHeight: 280,
        overflow: 'auto',
      }}>
        {fullText}
      </pre>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', marginTop: 8 }}>
        <button
          onClick={() => copy(post.body, 'body')}
          style={{
            padding: '4px 10px', borderRadius: 6,
            border: '1px solid var(--surface-3)',
            background: copied === 'body' ? 'var(--sea)' : 'transparent',
            color: copied === 'body' ? '#fff' : 'var(--txt2)',
            fontSize: 11, fontWeight: 600, cursor: 'pointer',
          }}
        >
          {copied === 'body' ? '✓ Kopierat' : 'Kopiera bara texten'}
        </button>
        {post.link && (
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '4px 10px', borderRadius: 6,
              border: '1px solid var(--surface-3)',
              background: 'transparent',
              color: 'var(--sea)',
              fontSize: 11, fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Förhandsvisa länk →
          </a>
        )}
        {post.notes && (
          <span style={{
            fontSize: 11, color: 'var(--txt3)',
            fontStyle: 'italic', marginLeft: 'auto',
            flexBasis: '100%', marginTop: 4,
          }}>
            💡 {post.notes}
          </span>
        )}
      </div>
    </div>
  )
}
