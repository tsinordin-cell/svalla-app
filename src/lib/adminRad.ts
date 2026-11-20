/**
 * Är den inloggade admin? (2026-11-20)
 *
 * Frågar databasfunktionen is_admin_user() i stället för att läsa kolumnen
 * users.is_admin. Kolumnen gick att läsa för alla, även utloggade, så vem som
 * helst kunde lista adminkontona. Läsrätten tas bort; funktionen svarar bara
 * för den som frågar.
 *
 * Svaret har samma form som den gamla frågan
 *   supabase.from('users').select('is_admin').eq('id', user.id).single()
 * så att kontrollen på raden efter ( if (!userRow?.is_admin) … ) står kvar
 * oförändrad. Vid fel blir data null, vilket nekar.
 */
type KanRpc = { rpc: (fn: 'is_admin_user') => PromiseLike<{ data: unknown; error: unknown }> }

export async function adminRad(supabase: KanRpc): Promise<{ data: { is_admin: boolean } | null }> {
  try {
    const { data, error } = await supabase.rpc('is_admin_user')
    if (error) return { data: null }
    return { data: { is_admin: data === true } }
  } catch {
    return { data: null }
  }
}
