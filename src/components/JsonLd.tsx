/**
 * JsonLd — enkel server component för strukturerad data.
 * Renderar ett godtyckligt JSON-LD-objekt som <script type="application/ld+json">
 * direkt i dokumentet. Kan placeras var som helst i en server component —
 * Next.js 15 hoistar <script>-taggar till <head> automatiskt.
 *
 * Användning:
 *   <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", ... }} />
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
