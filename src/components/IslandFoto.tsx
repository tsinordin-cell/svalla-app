import { OBILDER } from '@/app/o/obilder.generated'

/**
 * Fotot överst på en ösida.
 *
 * Bakgrunden: i september 2026 hade Svalla noll bilder. Inte bilder som
 * misslyckades ladda — det fanns inga bildelement alls på någon ösida, och på
 * /oar hade alla 103 öar samma platshållarillustration av en grön kulle.
 * En besökare som väljer resmål tittar på bilden först.
 *
 * Fotografen och licensen står under bilden. Det är inte artighet utan
 * villkoret för att vi får använda den: CC BY och CC BY-SA kräver att
 * upphovspersonen anges och att licensen framgår. Därför renderar den här
 * komponenten aldrig ett foto utan byline — saknas fotografen finns bilden
 * inte i den genererade filen alls.
 */

export default function IslandFoto({ slug, islandName }: { slug: string; islandName: string }) {
  const b = OBILDER[slug]
  if (!b) return null

  return (
    <figure style={{ margin: '0 0 22px' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: 16,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #1e5c82, #2d7d8a)',
        }}
      >
        {/*
          Vanlig <img> och inte next/image: bilderna ligger på Wikimedias CDN,
          som redan levererar rätt storlek via thumburl. Att låta Vercel
          optimera om dem hade kostat bildoptimeringskvot för ingen vinst —
          och det var just en bildkvot som sprack 8 september.
        */}
        {/* eslint-disable-next-line @next/next/no-img-element -- avsiktligt, se ovan:
            Wikimedias CDN levererar redan rätt storlek, och varningen påpekar
            själv att next/image "may incur additional usage or cost". Det var
            en bildkvot som sprack 8 september. */}
        <img
          src={b.url}
          alt={`${islandName} — foto av ${b.fotograf}`}
          width={b.bredd}
          height={b.hojd}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      <figcaption
        style={{
          fontSize: 11.5,
          color: 'var(--txt3)',
          marginTop: 7,
          lineHeight: 1.5,
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0 6px',
        }}
      >
        <span>
          Foto: <strong style={{ fontWeight: 600, color: 'var(--txt2)' }}>{b.fotograf}</strong>
          {b.ar ? `, ${b.ar}` : ''}
        </span>
        <span aria-hidden>·</span>
        {b.licensUrl ? (
          <a
            href={b.licensUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            style={{ color: 'var(--txt3)', textDecoration: 'underline' }}
          >
            {b.licens}
          </a>
        ) : (
          <span>{b.licens}</span>
        )}
        <span aria-hidden>·</span>
        <a
          href={b.kalla}
          target="_blank"
          rel="noopener noreferrer nofollow"
          style={{ color: 'var(--txt3)', textDecoration: 'underline' }}
        >
          Wikimedia Commons
        </a>
      </figcaption>
    </figure>
  )
}
