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
  - "Välkommen ombord, {{first_name}} ⚓"
  - "Fjorton flikar blev en. Välkommen till Svalla."
  - "Din skärgård börjar här"
preheader: Fem öar att börja med — och tre saker som gör dig till proffs direkt.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Välkommen ombord, {{first_name}}.

Du vet känslan: fjorton flikar, tre tidtabeller och en gnagande misstanke om att sista båten hem går tidigare än man tror. Det var därför vi byggde Svalla. Guider till öarna, levande färjetider, rutter och en plats att logga dina egna turer — på ett ställe. Inga annonser. Inget "du kanske också gillar". Bara skärgård.

:::panel
### Fem öar, fem humör
Trygg första helg? **Sandhamn** eller **Grinda**. Sugen på det äkta? **Möja** eller **Finnhamn**. Vill du söderut? **Utö**. Samma skärgård — fem helt olika känslor.
:::

:::ruta
### Sandhamn & Grinda — de enkla
Sandhamn är seglarnas huvudstad, Grinda ligger närmare och andas lugnare. Båda är perfekta för en första riktig skärgårdshelg — svårt att misslyckas, lätt att längta tillbaka.

[Sandhamn →](https://svalla.se/o/sandhamn) · [Grinda →](https://svalla.se/o/grinda)
:::

:::ruta
### Möja & Finnhamn — de äkta
Möja är ön dit man åker för att äta räkor på en klippa med utsikt mot ingenting alls. Finnhamn är STF:s vandrarhem mitt i ett naturreservat — enkelt, välskött och svårslaget en stilla kväll.

[Möja →](https://svalla.se/o/moja) · [Finnhamn →](https://svalla.se/o/finnhamn)
:::

## Tre saker som gör dig till proffs direkt

:::kort
### Kom igång på fem minuter
- **Spara öar** — tryck hjärtat på en ö så hamnar den i *Min skärgård*. Din framtida sommar, samlad
- **Logga turer med GPS** — appen ritar rutten på sjökortet och räknar distans, tid och fart. Som Strava, fast med bättre utsikt
- **Hitta krogar och hamnar** — med live-färjetider och väder bredvid kartan, så du slipper gissa
:::

:::knapp
[Öppna din profil](https://svalla.se/min-skargard)
:::

:::signatur
Glad sommar — vi syns på vattnet.
— Team Svalla
*Vi skriver breven själva, med kaffet i handen. Ingen algoritm har valt öarna åt dig.*
:::
`,
  day7: `---
trigger: user_created + 7 days
layout: fullt
subject_options:
  - "Alla åker till Sandhamn. Du är inte alla, {{first_name}}."
  - "Fem öar som flyger under radarn 🌊"
  - "Skärgårdens bäst bevarade hemligheter"
preheader: Öarna turistbåtarna missar — och varför det är hela poängen.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Alla åker till Sandhamn. Du är inte alla, {{first_name}}.

Samma resa, varje år: Sandhamn, Grinda, Vaxholm. Inget ont om klassikerna — men skärgården är större än så, och de finaste öarna är ofta de som kräver ett byte till och en halvtimme extra på däck. Det är inte ett hinder. Det är entréavgiften.

:::kort
### Fem under radarn
- **Rödlöga** — ingen bilväg, ingen el, bara stigar och klippor. En av skärgårdens mest oförändrade öar
- **Husarö** — bilfri seglarö, ett av Skärgårdsstiftelsens skyddade områden. Lugnet sitter i väggarna
- **Nämdö** — bilfri, lugn och vild. Bäst sent i augusti, när alla andra åkt hem
- **Bullerö** — huvudentré till Nämdöskärgårdens nationalpark och Bruno Liljefors gamla konstnärsö
- **Landsort** — Stockholms sydligaste utpost, med en av Sveriges äldsta fyrar och öppet hav åt tre håll
:::

## Varför just de här?

:::ruta
### Restiden är själva filtret
Öarna längst ut kräver planering — färre avgångar, längre resa. Precis det håller dem lugna. Den som klivit i land på Rödlöga eller Landsort har *valt* att vara där. Det märks på stämningen, och det är den du åker för.
:::

:::ruta
### En helt egen nationalpark
<!-- KÄLLA: src/app/o/island-data.ts (bullero) — Nämdöskärgårdens nationalpark invigd sep 2025, Sveriges 31:a och första marina nationalpark -->
Bullerö blev 2025 huvudentré till Nämdöskärgårdens nationalpark — Sveriges första marina. Konstnären Bruno Liljefors köpte ön 1908, och hans jaktstuga rymmer i dag parkens utställning. Konsthistoria och ytterskärgård på samma klippa.

[Bullerö-guiden →](https://svalla.se/o/bullero)
:::

Tryck hjärtat på dem som lockar, så ligger de samlade i *Min skärgård* den dag du bestämmer dig. Ditt framtida jag säger tack.

:::knapp
[Bläddra bland alla 84 guider](https://svalla.se/oar)
:::

:::signatur
Ses därute — förhoppningsvis inte på Sandhamn.
— Team Svalla
*Filtrera på bilfritt, barnvänligt eller segling, så blir listan kortare direkt.*
:::
`,
  season_open: `---
trigger: cron 1 april kl 09:00
layout: fullt
subject_options:
  - "Värdshusen vet inte att du kommer än, {{first_name}} 🌸"
  - "En månad till säsongsstart — tre saker att fixa nu"
  - "Skärgårdssommaren bokar inte sig själv"
preheader: De som planerar i april får de bästa platserna. Resten får restplatserna.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Värdshusen vet inte att du kommer än, {{first_name}}.

En månad kvar till säsongen. Just nu är borden lediga, rummen bokningsbara och gästhamnarna tomma. Det varar inte. De som planerar i april får de bästa platserna — resten får det som blev över. Tre saker är värda en kvart av din vecka — redan nu.

:::panel
### Tumregeln
Boka boende och bord tidigt, kolla färjorna sent. Det första tar slut. Det andra ändras in i det sista.
:::

:::ruta
### 1. Boende — börja här
Värdshus och pensionat på Sandhamn, Grinda och Finnhamn fyller juli långt innan juli. Välj helg, boka, klart. Ledigheten känns dubbelt så nära när rummet är säkrat.

[Sandhamn →](https://svalla.se/o/sandhamn) · [Grinda →](https://svalla.se/o/grinda) · [Finnhamn →](https://svalla.se/o/finnhamn)
:::

:::ruta
### 2. Borden
Sandhamns Värdshus och de andra krogarna öppnar normalt bokningarna i april. Ett bokat bord i solnedgången slår varje medhavd matlåda.

[Se öarnas krogar →](https://svalla.se/oar)
:::

:::ruta
### 3. Färjorna — bokmärk nu, kolla sen
Sommartabellen släpps i april. Vår färjesida visar avgångarna live, så du aldrig behöver skärmdumpa en tidtabell igen.

[svalla.se/farjor →](https://svalla.se/farjor)
:::

:::knapp
[Börja planera säsongen](https://svalla.se/oar)
:::

:::signatur
Vi hörs när vädret vänder.
— Team Svalla
*Har du redan en ö i kikaren? Svara på mejlet så hjälper vi dig med resan dit.*
:::
`,
  season_close: `---
trigger: cron 1 oktober kl 09:00
layout: fullt
subject_options:
  - "{{visited_count}} öar. Vi har räknat, {{first_name}} 🍂"
  - "Din skärgårdssommar i siffror"
  - "Tack för i år — här är kvittot"
preheader: Din sommar i siffror — och varför vintern är skärgårdens hemliga säsong.
from: "Team Svalla <hej@mail.svalla.se>"
---

# {{visited_count}} öar. Vi har räknat, {{first_name}}.

Säsongen är slut, båtarna glesar ut och skärgården byter till vinterläge. Innan vi drar in landgången: här är din sommar, svart på vitt. Inga uppskattningar, inga påhitt — bara dina egna loggade turer.

:::panel
### Ditt år på vattnet
**{{visited_count}} öar** besökta · **{{trip_count}} turer** loggade · **{{distance_nm}} distansminuter** i kölvattnet · **{{saved_count}} öar** sparade till nästa år
:::

:::kort
### Hela historien finns kvar
Rutterna på sjökortet, statistiken, dina sparade öar — allt ligger i profilen och nollställs aldrig. I februari, när mörkret är som tätast, är det här du öppnar.

[Öppna Min skärgård →](https://svalla.se/min-skargard)
:::

## Vintern är skärgårdens hemliga säsong

:::ruta
### Vi stänger inte — vi växlar ner
- **Live väder och vind** — för dig som tar varje fönster som ges
- **Vinterhamnar** — vilka som har plats för båten på land
- **Planera nästa år** — spara öar nu, så ligger listan färdig när isarna släpper
:::

Vi hörs i april när säsongen vänder. Tills dess ligger allt kvar precis där du lämnade det.

:::knapp
[Börja spara inför nästa sommar](https://svalla.se/oar)
:::

:::signatur
Tack för i år — det var ett nöje att ha dig ombord.
— Team Svalla
*Känner du någon som borde varit med i somras? Vidarebefordra gärna. Vi lovar att vara lika trevliga mot dem.*
:::
`,
  weather_tip: `---
trigger: cron torsdagar morgon (UTC), maj–september, om helgprognos ≥18°C och ≤40% regn och ≤9 m/s vind
layout: fullt
subject_options:
  - "☀️ {{temp}}° på {{best_day}} — det här är inte en övning"
  - "Skärgårdsväder i helgen: {{temp}}° och nästan ingen vind"
  - "Prognosen du väntat på, {{first_name}}"
preheader: Sånt här väder kommer inte på beställning. Tre öar, tre humör.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Släpp vad du har för händer, {{first_name}}.

Prognosen för **{{best_day}}**: **{{temp}}°** och bara **{{wind}} m/s**. Det är inte väder — det är en inbjudan. Soffan finns kvar på söndag kväll, det här vädret gör det inte. Tre öar, tre olika humör:

:::ruta
### Grinda — den enkla
<!-- KÄLLA: src/app/o/island-data.ts (grinda) — Waxholmsbolagets tabell 11, snabbast 1 tim 35, de flesta ~2 h -->
Naturreservat mitt i skärgården: vandringsleder, klippbad och ett av skärgårdens bästa värdshus. Cirka 2 timmar med Waxholmsbåten från Strömkajen (snabbast 1 tim 35) — och den ingår i SL-kortet. Lägre tröskel finns inte.

[Grinda-guiden →](https://svalla.se/o/grinda)
:::

:::ruta
### Sandhamn — den klassiska
Seglarcentrum med bageri, klippor mot öppet hav och Sandhamns Värdshus. Vill du äta lunch ute: boka bordet innan du kliver på båten, inte efter.

[Sandhamn-guiden →](https://svalla.se/o/sandhamn)
:::

:::ruta
### Finnhamn — den lugna
STF:s vandrarhem och krog i ett naturreservat, med bra kajaktillgång. Lugnt, välskött och sällan trångt — även när prognosen ser ut så här.

[Finnhamn-guiden →](https://svalla.se/o/finnhamn)
:::

:::knapp
[Planera helgturen](https://svalla.se/planera)
:::

:::signatur
Passa på — såna här helger går att räkna på ena handens fingrar.
— Team Svalla
*Osäker på sista båten hem? Fråga Thorkel innan du åker, inte från bryggan.*
:::
`,
  newsletter_welcome: `---
trigger: newsletter_subscribe
layout: fullt
subject_options:
  - "Välkommen — nu har du en insider i skärgården 🌊"
  - "Varannan tisdag: det som faktiskt händer därute"
  - "Din första öinsider är på väg"
preheader: Varannan tisdag. Det som är öppet, det som ändrats, och det ingen karta visar.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Nu har du en insider i skärgården.

Varannan tisdag i inkorgen: vad som är öppet just nu, vad som ändrats och var det är värt att åka. Inga annonser, ingen utfyllnad, inga "5 tips du INTE får missa". Bara sånt vi själva hade velat veta.

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

Nästa nummer kommer om två veckor. Undrar du något om en specifik ö innan dess — svara på det här mejlet. Vi läser allt, och vi svarar som folk.

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
  - "Har du träffat Thorkel? ⚓"
  - "Ställ en omöjlig skärgårdsfråga. Vi väntar."
  - "Den snabbaste vägen till ett svar"
preheader: Vår guide svarar på skärgårdsfrågor — med riktiga turer och tider.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Har du träffat Thorkel?

Tre dagar sedan du klev ombord — dags att du får träffa besättningens stolthet.

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

En sökmotor ger dig tio blå länkar och lycka till. Thorkel ger dig ett svar att agera på — och länken till guiden om du vill gräva vidare.

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
  - "Var det Grinda eller Gällnö som crewet gillade? 🤔"
  - "Tre öar att spara — och stället att spara dem på"
  - "Min skärgård: listan du delar med crewet"
preheader: Spara öarna du vill åka till och dela listan med crewet inför helgen.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Var det Grinda eller Gällnö som var finast?

Det vanligaste problemet i skärgårdsplanering är inte att välja fel ö. Det är att man hade en idé i mars, ett tips från en kollega i maj, en skärmdump någonstans — och i juli är allt borta. Idéer man inte samlar ihop blir aldrig turer.

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
Söder om det mesta. Gammal gruvö med cykelvägar som visar hela ön på en dag — och Ålö Storsand på broförbundna grannön, en av Sveriges finaste sandstränder.

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
  - "Ärlig fråga: har du hunnit ut än? 🛥️"
  - "En dagstur, tre steg, noll ursäkter"
  - "Det svåra är att bestämma sig"
preheader: Tre steg till en dagstur. Resten löser sig därute.
from: "Team Svalla <hej@mail.svalla.se>"
---

# En månad ombord — har du hunnit ut än?

Helt okej om inte — kalendrar är fulla och båtar går när de går. Men en sak är värd att skicka vidare:

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
