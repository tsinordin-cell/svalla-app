## Svalla Pro — Stripe-integration

### Miljövariabler

Lägg till i `.env.local` (lokalt) och i Netlify/Vercel (produktion):

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_MONTH=price_...
STRIPE_PRICE_YEAR=price_...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_PRO_ENABLED=true
```

Utan `NEXT_PUBLIC_PRO_ENABLED=true` syns ingenting av Pro-koden i UI:t.

---

### Skapa produkter i Stripe Dashboard

1. Logga in på dashboard.stripe.com (använd Test-läge)
2. Katalog → Produkter → Skapa produkt: **Svalla Pro**
3. Lägg till två priser:
   - Återkommande · Månadsvis · 49 SEK → kopiera `price_...` → `STRIPE_PRICE_MONTH`
   - Återkommande · Årsvis · 399 SEK → kopiera `price_...` → `STRIPE_PRICE_YEAR`

---

### Testa med Stripe CLI (lokalt)

```bash
brew install stripe/stripe-cli/stripe
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

CLI:n skriver ut ett `whsec_...`-värde — lägg det i `STRIPE_WEBHOOK_SECRET`.

Starta appen:
```bash
npm run dev
```

Trigga ett test-köp:
```bash
stripe trigger checkout.session.completed
```

Eller gå till `http://localhost:3000/pro` och klicka **Bli Pro**.
Använd testkortet `4242 4242 4242 4242` (valfritt datum och CVC).

---

### Webhook-händelser som hanteras

| Händelse | Effekt |
|---|---|
| `customer.subscription.created` | Upsertar rad i `subscriptions` |
| `customer.subscription.updated` | Uppdaterar status, plan, period |
| `customer.subscription.deleted` | Sätter status till `canceled` |

---

### Registrera webhook i produktion

1. Stripe Dashboard → Developers → Webhooks → Lägg till endpoint
2. URL: `https://svalla.se/api/stripe/webhook`
3. Händelser: välj `customer.subscription.*`
4. Kopiera Signing secret → `STRIPE_WEBHOOK_SECRET` i produktionsmiljön

---

### Aktivera Pro i produktion

Sätt `NEXT_PUBLIC_PRO_ENABLED=true` i Netlify/Vercel environment variables.
Byt till Live-nycklar (`sk_live_...`, `price_live_...`) när redo för riktiga betalningar.
