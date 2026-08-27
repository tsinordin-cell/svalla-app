// GENERERAD FIL — ändra inte här.
// Källa: /emails/*.md · Generator: scripts/build-email-templates.mjs (körs i prebuild)
//
// Filerna bakas in eftersom repo-rotens filer inte följer med i Vercels
// serverless-bundle. Vill du ändra texten i ett mail: redigera .md-filen.

import type { EmailTemplate } from './email'

export const MAIL_MALLAR: Record<EmailTemplate, string> = {
  welcome: `---
trigger: user_created
layout: fullt
subject_options:
  - "Välkommen till Svalla"
  - "Din skärgård är samlad — börja här"
  - "Ombord, {{first_name}} — fem öar att börja med"
preheader: Fem öar att börja med och tre saker du kan göra direkt.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Välkommen ombord, {{first_name}}.

Svalla är Stockholms skärgård samlad på ett ställe — guider till öarna, levande färjetider, rutter och en plats att logga dina egna turer. Inga annonser, ingen utfyllnad. Här är hur du kommer igång.

:::panel
### Fem öar att börja med
Vill du ha en trygg första helg, sikta på **Sandhamn** eller **Grinda**. Vill du längre ut, testa **Möja** eller **Finnhamn**. Vill du söderut, ta **Utö**. Fem olika känslor av samma skärgård.
:::

:::ruta
### Sandhamn & Grinda — de enkla
Sandhamn är seglarnas huvudstad, Grinda ligger närmare och lugnare. Båda funkar utmärkt som första riktiga skärgårdshelg.

[Sandhamn →](https://svalla.se/o/sandhamn) · [Grinda →](https://svalla.se/o/grinda)
:::

:::ruta
### Möja & Finnhamn — de äkta
Möja är genuin skärgård — hit åker man för att äta räkor på en klippa med utsikt mot ingenting. Finnhamn är för dig som vill övernatta på STF:s vandrarhem.

[Möja →](https://svalla.se/o/moja) · [Finnhamn →](https://svalla.se/o/finnhamn)
:::

## Tre saker du kan göra direkt

:::kort
### Gör Svalla till din
- **Spara öar** — tryck hjärtat på en ö så hamnar den i *Min skärgård*
- **Logga turer med GPS** — appen ritar rutten på sjökortet och summerar distans, tid och fart. Som Strava, fast på vatten
- **Hitta krogar och hamnar** — med live-färjetider och väderlager bredvid kartan
:::

:::knapp
[Öppna din profil](https://svalla.se/min-skargard)
:::

:::signatur
Glad sommar — vi syns på vattnet.
— Team Svalla
*Vi skriver breven själva. Ingen algoritm har valt öarna åt dig.*
:::
`,
  day7: `---
trigger: user_created + 7 days
layout: fullt
subject_options:
  - "Fem öar de flesta missar"
  - "{{first_name}}, din skärgård är större än du tror"
  - "Bortom Sandhamn, Grinda och Vaxholm"
preheader: Öarna som flyger under radarn — och varför de är värda resan.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Fem öar de flesta missar, {{first_name}}.

De flesta gör samma resa varje år: Sandhamn, Grinda, Vaxholm. Inget fel med det — men skärgården är större än så, och de finaste öarna är ofta de som kräver en extra byte eller en halvtimme till på båten.

:::kort
### Fem under radarn
- **Rödlöga** — en av skärgårdens mest oförändrade öar. Ingen bilväg, ingen el, bara stigar och klippor
- **Husarö** — bilfritt med stark seglartradition, ett av Skärgårdsstiftelsens skyddade områden
- **Nämdö** — bilfritt, lugnt och vilt. Bäst sent i augusti när sommartoppen passerat
- **Bullerö** — huvudentré till Nämdöskärgårdens nationalpark och Bruno Liljefors konstnärsö
- **Landsort** — Stockholms sydligaste utpost, med en av Sveriges äldsta fyrar
:::

## Varför de här, och inte de vanliga

:::ruta
### Restiden är själva filtret
Öarna längst ut kräver planering — färre avgångar, någon extra timme. Just det håller dem lugna. Den som kommer fram till Rödlöga eller Landsort har valt att vara där, och det märks på stämningen.
:::

:::ruta
### En helt egen nationalpark
<!-- KÄLLA: src/app/o/island-data.ts (bullero) — Nämdöskärgårdens nationalpark invigd sep 2025, Sveriges 31:a och första marina nationalpark -->
Bullerö blev 2025 huvudentré till Nämdöskärgårdens nationalpark — Sveriges första marina nationalpark. Konstnären Bruno Liljefors köpte ön 1908; hans jaktstuga rymmer i dag parkens utställning.

[Bullerö-guiden →](https://svalla.se/o/bullero)
:::

Spara dem du vill åka till via hjärtknappen, så ligger de samlade i *Min skärgård* när du väl bestämmer dig.

:::knapp
[Bläddra bland alla 84 guider](https://svalla.se/oar)
:::

:::signatur
Ses därute.
— Team Svalla
*Filtrera på bilfritt, barnvänligt eller segling — listan blir kortare direkt.*
:::
`,
  season_open: `---
trigger: cron 1 april kl 09:00
layout: fullt
subject_options:
  - "Säsongen öppnar om en månad — börja planera"
  - "Skärgårdssäsongen 2026 startar snart"
  - "{{first_name}}, dags att boka skärgårdssommaren"
preheader: 30 dagar till säsongsstart. Tre saker att fixa den här veckan.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Säsongen öppnar om en månad, {{first_name}}.

De som planerar i april får de bästa platserna. Värdshus, bord och boenden på de populära öarna bokar slut för juli långt innan sommaren börjar. Tre saker är värda att fixa redan den här veckan.

:::panel
### Regeln är enkel
Boka boende och bord tidigt, kolla färjorna sent. Det första tar slut, det andra ändras in i det sista.
:::

:::ruta
### 1. Boka boende
Värdshus och pensionat på Sandhamn, Grinda och Finnhamn fyller juli redan i april. Vänta inte med de populära öarna.

[Sandhamn →](https://svalla.se/o/sandhamn) · [Grinda →](https://svalla.se/o/grinda) · [Finnhamn →](https://svalla.se/o/finnhamn)
:::

:::ruta
### 2. Boka bord
Sandhamns Värdshus och de andra krogarna öppnar normalt sina bokningar i april. Lägg in helgen innan borden är tagna.

[Se öarnas krogar →](https://svalla.se/oar)
:::

:::ruta
### 3. Bokmärk färjorna
Sommartabellen släpps i april. Vår färjesida visar avgångarna live — bokmärk den nu så missar du ingen båt i sommar.

[svalla.se/farjor →](https://svalla.se/farjor)
:::

:::knapp
[Börja planera säsongen](https://svalla.se/oar)
:::

:::signatur
Vi hörs när vädret vänder.
— Team Svalla
*Har du redan en ö i kikaren? Svara på mailet så hjälper vi dig med resan dit.*
:::
`,
  season_close: `---
trigger: cron 1 oktober kl 09:00
layout: fullt
subject_options:
  - "Din skärgårdssommar i siffror, {{first_name}}"
  - "Tack för säsongen — {{visited_count}} öar blev det"
  - "Din Svalla-sammanfattning 2026"
preheader: Din sommar i siffror — och vad Svalla gör över vintern.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Tack för säsongen, {{first_name}}.

Det blev en sommar. Innan vi drar in landgången, här är din skärgård 2026 — bara dina egna turer, ingenting påhittat.

:::panel
### Din sommar i siffror
**{{visited_count}} öar** besökta · **{{trip_count}} turer** loggade · **{{distance_nm}} distansminuter** på vattnet · **{{saved_count}} öar** sparade till nästa år
:::

:::kort
### Se hela sammanställningen
Din rutt-historik, dina sparade öar och din statistik ligger kvar i profilen — och nollställs inte till våren.

[Öppna Min skärgård →](https://svalla.se/min-skargard)
:::

## Vi stänger inte

:::ruta
### Vintern på Svalla
- **Live väder och vind** — för dig som tar varje fönster som dyker upp
- **Vinterhamnar** — vilka som har plats för båten på land
- **Planera 2027** — spara öar redan nu, så är listan klar när säsongen vänder
:::

Vi hörs i april igen med säsongsstarten. Tills dess ligger allt du samlat kvar precis som du lämnade det.

:::knapp
[Börja spara inför nästa sommar](https://svalla.se/oar)
:::

:::signatur
Tack för i år — vi ses på vattnet 2027.
— Team Svalla
*Känner du en seglarvän som borde vara med? Vidarebefordra gärna det här.*
:::
`,
  weather_tip: `---
trigger: cron torsdagar morgon (UTC), maj–september, om helgprognos ≥18°C och ≤40% regn och ≤9 m/s vind
layout: fullt
subject_options:
  - "{{temp}}° i skärgården i helgen — dags att planera"
  - "Skärgårdsväder {{best_day}} — {{temp}}° och lite vind"
preheader: Prognosen ser bra ut. Tre öar att fundera på.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Skärgårdsväder i helgen, {{first_name}}.

Prognosen för **{{best_day}}** ser bra ut: **{{temp}}°** och bara **{{wind}} m/s vind**. Det är skärgårdsväder — och den här sortens helg bokar inte sig själv. Tre öar värda att fundera på, en för varje humör.

:::ruta
### Grinda — den enkla
<!-- KÄLLA: src/app/o/island-data.ts (grinda) — Waxholmsbolagets tabell 11, snabbast 1 tim 35, de flesta ~2 h -->
Naturreservat mitt i skärgården med vandringsleder, klippbad och ett av skärgårdens bästa värdshus. Cirka 2 timmar med Waxholmsbåten från Strömkajen (snabbast 1 tim 35), och den ingår i SL-kortet.

[Grinda-guiden →](https://svalla.se/o/grinda)
:::

:::ruta
### Sandhamn — den klassiska
Seglarcentrum med bageri, klippor mot öppet hav och Sandhamns Värdshus. Boka bord innan du åker om du vill äta lunch ute.

[Sandhamn-guiden →](https://svalla.se/o/sandhamn)
:::

:::ruta
### Finnhamn — den lugna
STF:s vandrarhem och krog i ett naturreservat, med bra kajaktillgång. Lugnt, välskött och sällan trångt.

[Finnhamn-guiden →](https://svalla.se/o/finnhamn)
:::

:::knapp
[Planera helgturen](https://svalla.se/planera)
:::

:::signatur
Passa på — såna här helger är inte många.
— Team Svalla
*Osäker på sista båten hem? Fråga Thorkel innan du åker.*
:::
`,
  newsletter_welcome: `---
trigger: newsletter_subscribe
layout: fullt
subject_options:
  - "Välkommen till Svallanyheter"
  - "Din första öinsider är på väg"
  - "Varannan tisdag, rakt i inkorgen"
preheader: Varannan tisdag. Öppna öar, hamnar, krogar och väderfönster.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Välkommen till Svallanyheter.

Varannan tisdag i inkorgen. Vad som är öppet just nu, vad som ändrats och var det är värt att åka. Inga annonser, ingen utfyllnad.

:::kort
### Det här kommer i brevet
- **Öppet just nu** — vad som faktiskt går att besöka den här månaden
- **Hamnar och krogar** — vad som öppnat, stängt eller bytt ägare
- **Väderfönster** — ser vi en riktigt bra helg skickar vi ett extra tips
- **Insidertips** — lägen och timing som inte syns på en karta
:::

## Bra ställen att börja

:::ruta
### Öppet just nu
Vilka öar som är i säsong, vad som har fullservice och vad som drar ner. Uppdateras löpande.

[svalla.se/oppet-nu →](https://svalla.se/oppet-nu)
:::

:::ruta
### Hitta din ö
<!-- KÄLLA: src/app/o/island-data.ts — 84 publicerade öguider (räknat 2026-08) -->
84 öguider. Filtrera på barnvänligt, bilfritt, segling, romantiskt — eller bläddra och låt dig överraskas.

[svalla.se/oar →](https://svalla.se/oar)
:::

:::ruta
### Säsongsguider
Vad som är bäst när. Inklusive de veckor då turisterna åkt hem och öarna är som finast.

[svalla.se/sasong →](https://svalla.se/sasong)
:::

Nästa nummer kommer om två veckor. Har du en fråga om en specifik ö innan dess — svara på det här mailet. Vi läser allt.

:::knapp
[Se vad som är öppet nu](https://svalla.se/oppet-nu)
:::

:::signatur
Ses därute.
— Team Svalla
*Vi skriver breven själva. Ingen algoritm har valt öarna åt dig.*
:::
`,
  day3_newsletter: `---
trigger: newsletter_subscribe + 3 days
layout: fullt
subject_options:
  - "Har du träffat Thorkel?"
  - "Fråga vår skärgårdsguide vad du vill"
  - "Den snabbaste vägen till ett svar"
preheader: Vår guide svarar på skärgårdsfrågor — med riktiga turer och tider.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Har du träffat Thorkel?

Du prenumererade för tre dagar sedan. Det här mailet finns för att tipsa om det vi är mest stolta över.

:::panel
### Din skärgårdsguide, dygnet runt
Thorkel är Svallas guide. Ställ en fråga — vart man ska med barn, hur man tar sig ut utan bil, vad som är öppet i september — och du får ett konkret svar.

Han slår upp riktiga turer och tider när frågan handlar om att ta sig någonstans. Finns det ingen förbindelse säger han det, i stället för att hitta på en.
:::

:::ruta
### Prova med en sån här fråga
- *"Vilken ö passar en nybörjare med små barn?"*
- *"Hur tar jag mig till Möja utan egen båt?"*
- *"Vad är öppet i skärgården i oktober?"*
:::

## Varför det är bättre än att googla

En sökmotor ger dig listor att bearbeta. Thorkel ger dig ett svar att agera på — och länkar till guiden om du vill läsa vidare.

:::knapp
[Prata med Thorkel](https://svalla.se/guide)
:::

:::signatur
Ses därute.
— Team Svalla
*Han svarar hellre "det vet jag inte" än gissar. Det tog ett tag att lära honom.*
:::
`,
  day14_newsletter: `---
trigger: newsletter_subscribe + 14 days
layout: fullt
subject_options:
  - "Tre öar att spara — och en funktion du kanske missat"
  - "Har du samlat ihop dina öar?"
  - "Min skärgård: listan du delar med crewet"
preheader: Spara öarna du vill till, dela listan med crewet inför helgen.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Har du samlat ihop dina öar?

Det vanligaste problemet i skärgårdsplanering är inte att man väljer fel ö. Det är att man hade en idé om vart man ville, men aldrig samlade ihop den.

:::kort
### Min skärgård — din privata lista
Tryck hjärtat på en ö så hamnar den i *Min skärgård*. Dela listan med crewet inför helgen. Inga appar att installera, inga konton för dem att skapa.

[Öppna Min skärgård →](https://svalla.se/min-skargard)
:::

## Tre att lägga in nu

:::ruta
### Sandhamn
Ytterskärgårdens seglarhamn. Sandstrand på Trouville, klippor mot öppet hav och Sandhamns Värdshus. Boka bord i förväg under högsommaren.

[Guiden →](https://svalla.se/o/sandhamn)
:::

:::ruta
### Grinda
Naturreservat med sandstrand vid gästhamnen och klippbad på norra sidan. Nära nog för en dagstur, tillräckligt för en helg.

[Guiden →](https://svalla.se/o/grinda)
:::

:::ruta
### Utö
Söder om det mesta. Gammal gruvö med långgrund sandstrand vid Ålö och cykelvägar som gör att man ser hela ön på en dag.

[Guiden →](https://svalla.se/o/uto)
:::

Letar du efter något särskilt — barnvänligt, bilfritt, seglingsvänligt — filtrera bland [alla 84 guider](https://svalla.se/oar) och spara ett par kandidater. Beslut blir lättare när alternativen ligger bredvid varandra.

:::knapp
[Utforska öarna](https://svalla.se/oar)
:::

:::signatur
Ses därute.
— Team Svalla
*Nästa nummer om två veckor. Svara gärna om du undrar något om en specifik ö.*
:::
`,
  day30_newsletter: `---
trigger: newsletter_subscribe + 30 days
layout: fullt
subject_options:
  - "En månad sedan du prenumererade — har du hunnit ut?"
  - "Planera en dagstur på tio minuter"
  - "Det svåra är att bestämma sig"
preheader: Tre steg till en dagstur. Resten löser sig därute.
from: "Team Svalla <hej@mail.svalla.se>"
---

# En månad sedan du prenumererade.

Har du hunnit ut på vattnet? Oavsett svar skickar vi det här, för att dela en sak vi hör ofta.

:::citat
### "Det var enklare än jag trodde."
Det är det vanligaste vi hör från folk som just gjort sin första dagstur. Båten går. Krogen har öppet. Det finns var man badar.

Den svåra biten är att bestämma sig.
:::

## En dagstur, tre steg

:::ruta
### 1. Välj en ö
Vill du testa lätt: [Fjäderholmarna](https://svalla.se/o/fjaderholmarna) — närmast stan och kräver ingen planering. Vill du längre ut: [Grinda](https://svalla.se/o/grinda) eller [Finnhamn](https://svalla.se/o/finnhamn).
:::

:::ruta
### 2. Kolla turen — och sista båten hem
Waxholmsbolagets och Strömmas avgångar ligger på [svalla.se/farjor](https://svalla.se/farjor). Titta på hemresan innan du bokar utresan.
:::

:::ruta
### 3. Fråga om du fastnar
Hur lång tid tar det, vad finns på ön, hur blir vädret? [Skriv till Thorkel →](https://svalla.se/guide)
:::

:::knapp
[Planera din första tur](https://svalla.se/planera)
:::

Det här var sista påminnelsen. Du ligger kvar i listan och får nyhetsbrevet varannan tisdag som vanligt.

:::signatur
Ses därute.
— Team Svalla
*Vi hoppas på ett bra väderfönster åt dig.*
:::
`,
}
