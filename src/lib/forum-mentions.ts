/**
 * forum-mentions — server-safe parsing av @-mentions.
 * Inga React-imports här så filen kan användas både i server-routes och client-render.
 */

export const MENTION_RE = /(^|\s)@([a-zA-Z0-9_]{2,30})\b/g

/**
 * Extraherar alla @-mentions från en text. Returnerar lowercase usernames, deduplicerade.
 */
export function extractMentions(body: string): string[] {
  const mentions = new Set<string>()
  for (const m of body.matchAll(MENTION_RE)) {
    const username = m[2]
    if (username) mentions.add(username.toLowerCase())
  }
  return Array.from(mentions)
}
