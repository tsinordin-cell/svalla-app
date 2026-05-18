# AUTOFIX — Vad agenten auto-fixat

Per audit-instruktionen tilläts agenten auto-fixa **endast kosmetiska ändringar**. Inga auto-fixes utfördes under denna audit.

## Ej auto-fixade (kräver manuell granskning)

Alla funna problem i P0–P2 kräver antingen:
- **Logikförändring** (timezone-fix, soft-delete filter, GPS-hastighetstak)
- **Databasmigrationer** (index, policy-idempotency, trigger exception handling)
- **Arkitekturbeslut** (Sentry-wrapping policy, Stripe idempotency)
- **Riskbedömning** (borttagning av `LastBoatPanel 2.tsx` — verifiera att det är en kopia)

## Rekommenderat nästa steg

Kör följande kommandon manuellt efter granskning:

```bash
# 1. npm-sårbarheter (säker, non-breaking)
npm audit fix

# 2. Ta bort macOS-duplikat
git rm "src/components/LastBoatPanel 2.tsx"
git rm "src/app/rutter/[id]/.fuse_hidden0000000c00000002"
git rm src/app/rutter/page.tsx.bak
echo ".fuse_hidden*" >> .gitignore

# 3. Lägg till restaurants(slug) index i en ny migration
# supabase/migrations/20260512000001_add-restaurants-slug-index.sql:
# CREATE INDEX CONCURRENTLY IF NOT EXISTS restaurants_slug_idx ON restaurants(slug);
```

Alla andra fixes måste skrivas, granskas och testas av Tom.
