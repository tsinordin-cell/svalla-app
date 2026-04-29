import { createServerSupabaseClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { CONTENT_POSTS, type Channel } from './content-data'
import ContentPostCard from './ContentPostCard'

export const dynamic = 'force-dynamic'

const CHANNEL_LABEL: Record<Channel, string> = {
  reddit: 'Reddit',
  facebook: 'Facebook',
  instagram: 'Instagram',
}

const CHANNEL_COLOR: Record<Channel, string> = {
  reddit: '#ff4500',
  facebook: '#1877f2',
  instagram: '#c13584',
}

export default async function AdminContentPage() {
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logga-in?next=/admin/innehall')

  const { data: userRow } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!userRow?.is_admin) redirect('/feed')

  // Gruppera per kanal
  const grouped: Record<Channel, typeof CONTENT_POSTS> = {
    reddit: [],
    facebook: [],
    instagram: [],
  }
  for (const p of CONTENT_POSTS) grouped[p.channel].push(p)

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', padding: '20px 16px 80px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <Link href="/admin" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--txt3)', textDecoration: 'none',
          marginBottom: 20,
        }}>
          ← Admin
        </Link>

        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--sea)', margin: '0 0 4px' }}>
          Sociala medier — färdiga inlägg
        </h1>
        <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 24px' }}>
          Kopiera, anpassa, posta. Inga superlativ, inga fake-claims.
        </p>

        {(['reddit', 'facebook', 'instagram'] as const).map(channel => (
          <section key={channel} style={{ marginBottom: 36 }}>
            <h2 style={{
              fontSize: 14, fontWeight: 700,
              color: CHANNEL_COLOR[channel],
              textTransform: 'uppercase', letterSpacing: 1,
              margin: '0 0 14px',
              borderBottom: `2px solid ${CHANNEL_COLOR[channel]}`,
              paddingBottom: 6,
            }}>
              {CHANNEL_LABEL[channel]} · {grouped[channel].length}
            </h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {grouped[channel].map(post => (
                <ContentPostCard key={post.id} post={post} channelColor={CHANNEL_COLOR[channel]} />
              ))}
            </div>
          </section>
        ))}

        {/* Riktlinjer */}
        <div style={{
          background: 'var(--white)', border: '1px solid var(--surface-3)',
          borderRadius: 14, padding: '20px 22px',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Generella tips för distribution
          </h2>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--txt2)', fontSize: 13, lineHeight: 1.7 }}>
            <li><strong>Reddit:</strong> Inga emojis, ingen säljjargong. Var beredd att svara på kommentarer i 24 h. Kolla subreddit-regler först.</li>
            <li><strong>FB-grupper:</strong> Många kräver godkännande från admin. Skicka privatmeddelande först — &quot;är det OK om jag delar X?&quot;</li>
            <li><strong>Instagram:</strong> Foto + kort text. Länk i bio (caption-länkar är inte klickbara). Story stayar 24 h, Reels är permanent.</li>
            <li><strong>Tajming:</strong> Tisdag-torsdag förmiddag är generellt bäst för text-baserade inlägg. Helger för IG.</li>
            <li><strong>Spårning:</strong> Lägg till <code>?utm_source=reddit&amp;utm_campaign=2026summer</code> i länkar om du vill mäta vad som drar trafik.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
