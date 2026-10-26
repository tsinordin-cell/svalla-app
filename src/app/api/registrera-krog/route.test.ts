import { describe, it, expect, vi, beforeEach } from 'vitest'

const insert = vi.fn()
vi.mock('@/lib/supabase-admin', () => ({ getAdminClient: () => ({ from: () => ({ insert }) }) }))
vi.mock('@/lib/rateLimit', () => ({ checkRateLimit: vi.fn(async () => true) }))

import { POST } from './route'
import { checkRateLimit } from '@/lib/rateLimit'

const giltig = {
  businessName: 'Krogen', businessType: 'restaurang', location: 'Sandhamn',
  contactName: 'Anna', email: 'Anna@Exempel.se', description: '', phone: '', website: '',
}
const post = (b: unknown) => POST(new Request('https://svalla.se/api/registrera-krog', {
  method: 'POST', body: JSON.stringify(b), headers: { 'x-forwarded-for': '1.2.3.4, 10.0.0.1' },
}))

describe('/api/registrera-krog', () => {
  beforeEach(() => { insert.mockReset(); insert.mockResolvedValue({ error: null }) })

  it('sparar en giltig anmälan med tjänsteklienten', async () => {
    const res = await post(giltig)
    expect(res.status).toBe(200)
    expect(insert).toHaveBeenCalledWith(expect.objectContaining({
      business_name: 'Krogen', business_type: 'restaurang', contact_email: 'anna@exempel.se', description: null,
    }))
    expect(checkRateLimit).toHaveBeenCalledWith('registrera-krog:1.2.3.4', 5, 3600000)
  })
  it('avvisar okänd verksamhetstyp och ogiltig e-post', async () => {
    expect((await post({ ...giltig, businessType: 'kasino' })).status).toBe(400)
    expect((await post({ ...giltig, email: 'inte-epost' })).status).toBe(400)
    expect(insert).not.toHaveBeenCalled()
  })
  it('kapar för långa fält', async () => {
    await post({ ...giltig, description: 'x'.repeat(5000) })
    expect((insert.mock.calls[0]?.[0] as { description: string }).description).toHaveLength(2000)
  })
  it('429 när gränsen är nådd', async () => {
    vi.mocked(checkRateLimit).mockResolvedValueOnce(false)
    expect((await post(giltig)).status).toBe(429)
  })
})
