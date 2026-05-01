/**
 * forum-render — säker rendering av forum-body med:
 *   - URL-detektering (auto-länkning)
 *   - @-mentions → klickbar profil-länk
 *   - Bilder via [img:URL]-syntax (uppladdade via reply-form)
 *   - Citat via > prefix på rader
 *   - Line-breaks bevaras
 *
 * Returnerar React.ReactNode — säker mot XSS (vi escapar all text via React).
 */

import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'
import { MENTION_RE, extractMentions as _extractMentions } from './forum-mentions'
import ForumTripAttachment from '@/components/ForumTripAttachment'

// Tillåtna bild-domäner (våra Supabase-buckets + ev. CDN)
const IMG_HOSTS = [
  'supabase.co',
  'svalla.se',
]

const URL_RE = /\b(https?:\/\/[^\s<]+)/g
const IMG_TAG_RE = /\[img:(https?:\/\/[^\]\s]+)\]/g
const TRIP_TAG_RE = /\[trip:([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\]/gi
const HASHTAG_RE = /(^|\s)#([a-zA-ZåäöÅÄÖ0-9_-]{2,40})\b/g

// Re-export för bakåtkompatibilitet
export const extractMentions = _extractMentions

function isAllowedImgUrl(url: string): boolean {
  try {
    const u = new URL(url)
    return IMG_HOSTS.some(h => u.hostname.endsWith(h))
  } catch {
    return false
  }
}

/**
 * Renderar en text-rad med inline mentions + URL-länkar.
 * Returneras som array av React-noder (alltid säkert via React-escaping).
 */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = []
  let cursor = 0
  let n = 0

  // Hitta alla URL:er + mentions + hashtags, sortera efter position
  type Match = { start: number; end: number; type: 'url' | 'mention' | 'hashtag'; value: string; raw: string }
  const matches: Match[] = []

  for (const m of text.matchAll(URL_RE)) {
    matches.push({ start: m.index!, end: m.index! + m[0].length, type: 'url', value: m[0], raw: m[0] })
  }
  for (const m of text.matchAll(MENTION_RE)) {
    const lead = m[1] ?? ''
    const username = m[2]
    if (!username) continue
    const start = m.index! + lead.length
    matches.push({ start, end: start + 1 + username.length, type: 'mention', value: username, raw: '@' + username })
  }
  for (const m of text.matchAll(HASHTAG_RE)) {
    const lead = m[1] ?? ''
    const tag = m[2]
    if (!tag) continue
    const start = m.index! + lead.length
    matches.push({ start, end: start + 1 + tag.length, type: 'hashtag', value: tag, raw: '#' + tag })
  }
  matches.sort((a, b) => a.start - b.start)

  // Ta bort överlapp (URL vinner över mention vid samma start)
  const filtered: Match[] = []
  let lastEnd = -1
  for (const m of matches) {
    if (m.start >= lastEnd) {
      filtered.push(m)
      lastEnd = m.end
    }
  }

  for (const m of filtered) {
    if (m.start > cursor) {
      parts.push(text.slice(cursor, m.start))
    }
    if (m.type === 'url') {
      // Trimma trailing skiljetecken som inte är del av URL
      let url = m.value
      let trail = ''
      while (url.length > 0 && /[.,!?;:)]$/.test(url)) {
        trail = url.slice(-1) + trail
        url = url.slice(0, -1)
      }
      try {
        const u = new URL(url)
        const display = u.hostname.replace(/^www\./, '') + (u.pathname.length > 1 ? u.pathname.replace(/\/$/, '') : '')
        parts.push(
          <a
            key={`${keyPrefix}-u${n++}`}
            href={url}
            target="_blank"
            rel="noopener nofollow ugc"
            style={{
              color: 'var(--sea)',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(10,123,140,0.35)',
              textUnderlineOffset: 2,
              wordBreak: 'break-word',
            }}
          >
            {display.length > 60 ? display.slice(0, 57) + '…' : display}
          </a>
        )
        if (trail) parts.push(trail)
      } catch {
        parts.push(m.value)
      }
    } else if (m.type === 'mention') {
      parts.push(
        <Link
          key={`${keyPrefix}-m${n++}`}
          href={`/u/${m.value}`}
          style={{
            color: 'var(--sea)',
            fontWeight: 600,
            textDecoration: 'none',
            background: 'rgba(10,123,140,0.08)',
            padding: '0 4px',
            borderRadius: 4,
          }}
        >
          @{m.value}
        </Link>
      )
    } else if (m.type === 'hashtag') {
      const slug = m.value.toLowerCase()
      parts.push(
        <Link
          key={`${keyPrefix}-h${n++}`}
          href={`/sok?q=${encodeURIComponent(slug)}`}
          style={{
            color: 'var(--accent, #c96e2a)',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          #{m.value}
        </Link>
      )
    }
    cursor = m.end
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor))
  }

  return parts.length > 0 ? parts : [text]
}

/**
 * Renderar full forum-body. Hanterar:
 *  - [img:URL] → <img>
 *  - > -prefixade rader → blockquote
 *  - tomma rader → paragraph-break
 *  - inline URL/mention via renderInline
 */
type Block = { type: 'text'; content: string } | { type: 'img'; url: string } | { type: 'trip'; id: string }

/**
 * Splittrar body i text/img/trip-block för rendering.
 */
function splitBlocks(body: string): Block[] {
  // Hitta alla [img:URL] och [trip:UUID] med position
  type Tag = { start: number; end: number; type: 'img' | 'trip'; value: string }
  const tags: Tag[] = []
  for (const m of body.matchAll(IMG_TAG_RE)) {
    tags.push({ start: m.index!, end: m.index! + m[0].length, type: 'img', value: m[1] ?? '' })
  }
  for (const m of body.matchAll(TRIP_TAG_RE)) {
    tags.push({ start: m.index!, end: m.index! + m[0].length, type: 'trip', value: m[1] ?? '' })
  }
  tags.sort((a, b) => a.start - b.start)

  const blocks: Block[] = []
  let cursor = 0
  for (const t of tags) {
    if (t.start > cursor) {
      const text = body.slice(cursor, t.start)
      if (text.trim()) blocks.push({ type: 'text', content: text })
    }
    if (t.type === 'img' && isAllowedImgUrl(t.value)) {
      blocks.push({ type: 'img', url: t.value })
    } else if (t.type === 'trip') {
      blocks.push({ type: 'trip', id: t.value })
    }
    cursor = t.end
  }
  if (cursor < body.length) {
    const text = body.slice(cursor)
    if (text.trim()) blocks.push({ type: 'text', content: text })
  }
  return blocks
}

export function renderForumBody(body: string): ReactNode {
  if (!body) return null

  const blocks = splitBlocks(body)
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === 'text') {
          return <div key={`b${i}`}>{renderTextBlock(block.content, `b${i}`)}</div>
        }
        if (block.type === 'img') {
          return (
            <div key={`b${i}`} style={{ margin: '12px 0', position: 'relative', width: '100%', maxWidth: 720 }}>
              <Image
                src={block.url}
                alt=""
                width={720}
                height={480}
                sizes="(max-width: 760px) 100vw, 720px"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: 480,
                  objectFit: 'contain',
                  borderRadius: 12,
                  display: 'block',
                  border: '1px solid rgba(10,123,140,0.10)',
                }}
              />
            </div>
          )
        }
        if (block.type === 'trip') {
          return <ForumTripAttachment key={`b${i}`} id={block.id} />
        }
        return null
      })}
    </>
  )
}

function renderTextBlock(text: string, keyPrefix: string): ReactNode {
  // Splitta på dubbel newline → paragrafer
  const paragraphs = text.split(/\n{2,}/)
  return (
    <>
      {paragraphs.map((para, pi) => {
        // Citatblock: alla rader börjar med >
        const lines = para.split('\n')
        const isQuote = lines.length > 0 && lines.every(l => l.trim().startsWith('>'))
        if (isQuote) {
          const quoteText = lines.map(l => l.replace(/^>\s?/, '')).join('\n')
          return (
            <blockquote
              key={`${keyPrefix}-p${pi}`}
              style={{
                borderLeft: '3px solid var(--sea)',
                paddingLeft: 12,
                margin: pi === 0 ? '0 0 10px' : '10px 0',
                color: 'var(--txt2)',
                fontStyle: 'italic',
                background: 'rgba(10,123,140,0.04)',
                borderRadius: '0 8px 8px 0',
                padding: '6px 12px',
              }}
            >
              {quoteText.split('\n').map((line, li) => (
                <span key={li} style={{ display: 'block' }}>
                  {renderInline(line, `${keyPrefix}-p${pi}-q${li}`)}
                </span>
              ))}
            </blockquote>
          )
        }
        return (
          <p key={`${keyPrefix}-p${pi}`} style={{ margin: pi === 0 ? '0' : '10px 0 0', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {lines.map((line, li) => (
              <span key={li}>
                {renderInline(line, `${keyPrefix}-p${pi}-l${li}`)}
                {li < lines.length - 1 && '\n'}
              </span>
            ))}
          </p>
        )
      })}
    </>
  )
}

/**
 * Bygger ett citat-block från en användares post för citera-knappen.
 * Resultatet kan klistras in i textarea — användaren skriver sedan sitt svar under.
 */
export function buildQuotePrefix(username: string, body: string): string {
  // Maxa citatet till ~280 tecken så det inte blir överväldigande
  const trimmed = body.length > 280 ? body.slice(0, 277) + '…' : body
  // Konvertera bilder till "[bild]"-platshållare i citatet
  const cleanedBody = trimmed.replace(IMG_TAG_RE, '[bild]')
  const lines = cleanedBody.split('\n').map(l => `> ${l}`).join('\n')
  return `> @${username} skrev:\n${lines}\n\n`
}
