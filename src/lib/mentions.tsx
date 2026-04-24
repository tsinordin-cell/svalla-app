/**
 * Mention & hashtag parsing helpers.
 * Works in both server and client components.
 */
import Link from 'next/link'

export type MentionSpan = {
  type: 'mention' | 'hashtag' | 'text'
  value: string   // raw text segment or username/slug
  start: number
  end: number
}

/** Parse @username and #hashtag tokens from text. */
export function parseTokens(text: string): MentionSpan[] {
  const pattern = /(@[a-zA-Z0-9_]{2,30})|(#[a-zA-Z0-9_\u00C0-\u024F]{2,50})/g
  const spans: MentionSpan[] = []
  let last = 0
  let m: RegExpExecArray | null

  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) {
      spans.push({ type: 'text', value: text.slice(last, m.index), start: last, end: m.index })
    }
    if (m[1]) {
      spans.push({ type: 'mention', value: m[1].slice(1), start: m.index, end: m.index + m[1].length })
    } else if (m[2]) {
      spans.push({ type: 'hashtag', value: m[2].slice(1), start: m.index, end: m.index + m[2].length })
    }
    last = m.index + m[0].length
  }

  if (last < text.length) {
    spans.push({ type: 'text', value: text.slice(last), start: last, end: text.length })
  }

  return spans
}

/** Extract unique mentioned usernames from text. */
export function extractMentions(text: string): string[] {
  const seen = new Set<string>()
  for (const span of parseTokens(text)) {
    if (span.type === 'mention') seen.add(span.value.toLowerCase())
  }
  return [...seen]
}

/** Extract unique hashtag slugs from text. */
export function extractHashtags(text: string): string[] {
  const seen = new Set<string>()
  for (const span of parseTokens(text)) {
    if (span.type === 'hashtag') seen.add(span.value.toLowerCase())
  }
  return [...seen]
}

/**
 * Detect the @mention being actively typed at the cursor.
 * Returns null if cursor is not inside a mention.
 */
export function getActiveMention(text: string, cursorPos: number): { word: string; start: number } | null {
  // Walk backwards from cursor to find unbroken @-word
  let i = cursorPos - 1
  while (i >= 0 && /[a-zA-Z0-9_]/.test(text[i])) i--
  if (i < 0 || text[i] !== '@') return null
  const start = i
  const word = text.slice(start + 1, cursorPos)
  // Don't trigger with empty @ or very long words
  if (word.length > 30) return null
  return { word, start }
}

// ── Render mentions as plain JSX ─────────────────────────────────────────
// Server-safe: ingen onClick, fungerar i server och client components.
export function renderMentions(text: string) {
  const spans = parseTokens(text)
  return spans.map((s, i) => {
    if (s.type === 'mention') {
      return (
        <Link
          key={i}
          href={`/u/${s.value}`}
          style={{ color: 'var(--sea)', fontWeight: 700, textDecoration: 'none' }}
        >
          @{s.value}
        </Link>
      )
    }
    if (s.type === 'hashtag') {
      return (
        <Link
          key={i}
          href={`/tagg/${s.value.toLowerCase()}`}
          style={{ color: 'var(--sea)', fontWeight: 700, textDecoration: 'none' }}
        >
          #{s.value}
        </Link>
      )
    }
    return <span key={i}>{s.value}</span>
  })
}
