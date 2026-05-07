import dotenv from 'dotenv'
dotenv.config({ path: process.cwd() + '/.env.local' })
const KEY = process.env.GOOGLE_PLACES_API_KEY
async function search(q) {
  const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': KEY,
      'X-Goog-FieldMask': 'places.displayName,places.location,places.formattedAddress',
    },
    body: JSON.stringify({ textQuery: q, languageCode: 'sv', regionCode: 'se', maxResultCount: 3 }),
  })
  const data = await r.json()
  return data.places ?? []
}
for (const q of ['Tullinge båtklubb', 'Tullingesjön', 'Tullinge båtklubb Botkyrka', 'Tullinge brygga']) {
  console.log(`\n=== ${q} ===`)
  const results = await search(q)
  for (const p of results) {
    console.log(`  ${p.displayName?.text}: ${p.location.latitude}, ${p.location.longitude}  (${p.formattedAddress})`)
  }
}
