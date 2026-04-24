import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'

const W = 1080, H = 1920

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log('[share-og] ENTRY')
  const { id } = await params
  console.log('[share-og] START id=', id)

  return new ImageResponse(
    (
      <div style={{
        width: W, height: H, display: 'flex', background: '#0d2a40',
        alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
      }}>
        <div style={{ fontSize: 80, color: '#fff', display: 'flex' }}>⛵ Svalla</div>
        <div style={{ fontSize: 40, color: 'rgba(255,255,255,0.6)', display: 'flex' }}>{id.slice(0, 8)}</div>
      </div>
    ),
    { width: W, height: H }
  )
}
