# Dimension 1 — Säkerhet

## [P1] Soft-delete filter saknas på topplista och sökning
**Fil:** `src/app/topplista/page.tsx:33`, `src/app/sok/page.tsx:111`
**Beskrivning:** Queries mot `trips` saknar `.is('deleted_at', null)`. Soft-deleted turer kan visas i topplistan och bland aktiva seglare på förstasidan.
**Fix:**
```typescript
// topplista/page.tsx rad 33
.is('deleted_at', null)
// sok/page.tsx rad 111
.is('deleted_at', null)
```
**Status:** VERIFIERAT

---

## [P2] MIME-validering inkomplett på avatar/trip-uploads
**Fil:** `src/app/profil/page.tsx:138`, `src/app/check-in/page.tsx:66`, `src/app/logga/manuell/page.tsx:236`
**Beskrivning:** Forum-upload har magic-byte-validering (`isValidImageMagic()` i `src/app/api/forum/upload-image/route.ts:35-52`), men avatar och trip-photo-uploads validerar bara `file.type` (client-controlled, kan spoofas).
**Fix:** Extrahera `isValidImageMagic()` till `src/lib/image-validate.ts` och importera i alla upload-handlers.
**Status:** VERIFIERAT

---

## Verifierat säkert — ingen åtgärd krävs

- **SUPABASE_SERVICE_ROLE_KEY i client-komponenter:** Inga träffar. VERIFIERAT SÄKER.
- **dangerouslySetInnerHTML med user input:** `renderMarkdown()` escapar all text via `esc()`. Forum-render använder React-element. VERIFIERAT SÄKER.
- **VAPID_PRIVATE_KEY / CRON_SECRET:** Enbart i server-side API-routes. VERIFIERAT SÄKER.
- **SQL injection via .rpc():** Alla parametrar är bound (ej template literals). VERIFIERAT SÄKER.
- **CORS:** Next.js default same-origin. Inga öppna wildcard-headers. VERIFIERAT SÄKER.
- **Public Storage buckets:** Avsiktligt publika (forum-bilder, trip-foton, avatarer). RLS säkrar writes. VERIFIERAT SÄKER.
