# Svalla — Native-app (Capacitor)

## Bygga och testa på egen enhet

### iOS (iPhone via Xcode)

Kräver: Mac med Xcode installerat. Inget Apple Developer-konto behövs för personlig signering.

1. Installera beroenden och synka:
   ```
   npm install
   npm run cap:sync
   ```
2. Öppna i Xcode:
   ```
   npm run ios:open
   ```
3. I Xcode: välj din iPhone som target. Första gången: Xcode → Settings → Accounts → lägg till ditt Apple-ID.
4. Välj ditt personliga team under Signing & Capabilities.
5. Tryck Run (⌘R). Appen installeras och öppnas på din telefon.
6. Personlig signering gäller i 7 dagar — kör om steg 5 när den löper ut.

### Android (via USB debugging)

Kräver: Android Studio installerat.

1. Installera och synka:
   ```
   npm install
   npm run cap:sync
   ```
2. Öppna i Android Studio:
   ```
   npm run android:open
   ```
3. Aktivera Developer Options och USB Debugging på din Android-enhet.
4. Anslut via USB. Välj din enhet i Android Studio och tryck Run.

---

## Checklista för framtida App Store-publicering

### Apple App Store

- [ ] Skaffa Apple Developer Program (99 USD/år) på developer.apple.com
- [ ] Skapa App ID `se.svalla.app` i Apple Developer-portalen
- [ ] Skapa Distribution Certificate och Provisioning Profile
- [ ] Aktivera Associated Domains (`applinks:svalla.se`) under Signing & Capabilities i Xcode
- [ ] Generera `apple-app-site-association`-fil och lägg på `https://svalla.se/.well-known/apple-app-site-association`
- [ ] Generera ikoner och splash via `npx @capacitor/assets generate`
- [ ] Ta screenshots i mapparna under `app-store-assets/screenshots/`
- [ ] Granska `app-store-assets/description-sv.md` och `description-en.md`
- [ ] Ladda upp till TestFlight via Xcode → Product → Archive
- [ ] Beta-testa via TestFlight
- [ ] Skicka in till App Review

### Google Play Store

- [ ] Skaffa Google Play Developer-konto (25 USD engångsavgift)
- [ ] Skapa appen i Google Play Console
- [ ] Generera upload-signeringsnyckel: `keytool -genkey -v -keystore svalla.keystore -alias svalla -keyalg RSA -keysize 2048 -validity 10000`
- [ ] Spara nyckeln säkert — den kan inte återskapas
- [ ] Lägg upp `assetlinks.json` på `https://svalla.se/.well-known/assetlinks.json` för App Links
- [ ] Generera APK/AAB: Android Studio → Build → Generate Signed Bundle
- [ ] Ladda upp till Internal Testing i Play Console
- [ ] Fyll i butiksuppgifter och ta screenshots
- [ ] Rulla ut till produktion

---

## Push-notiser

### iOS (APNs)

1. I Apple Developer-portalen: Certificates, Identifiers & Profiles → Keys → skapa en ny nyckel med Apple Push Notifications Service aktiverat
2. Ladda ner `.p8`-filen — kan bara laddas ner en gång
3. I Supabase Dashboard → Settings → Auth → External OAuth Providers eller direkt i Supabase push-konfigurationen: lägg in Team ID, Key ID och `.p8`-innehållet

### Android (FCM)

1. Skapa ett Firebase-projekt på console.firebase.google.com
2. Lägg till Android-appen med package name `se.svalla.app`
3. Ladda ner `google-services.json` och lägg i `android/app/`
4. I Supabase: lägg in FCM Server Key

---

## Miljövariabler (native-specifika)

Inga extra env-variabler krävs för native-bygget. Appen pekar mot `https://svalla.se` och använder befintliga Supabase-nycklar via webview.

---

## Deep links

- iOS: Associated Domains konfigureras i Xcode efter Apple Developer-konto finns
- Android: App Links är redan konfigurerade i `AndroidManifest.xml` — fungerar när `assetlinks.json` publiceras

Stöds: `svalla.se/tur/[id]`, `svalla.se/u/[username]`, `svalla.se/platser/[slug]`
