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
  - "Välkommen ombord, {{first_name}}"
  - "Din skärgård är samlad — börja här"
  - "Välkommen till Svalla"
preheader: 84 öguider, alla hamnar och en plats för dina egna turer.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Välkommen ombord, {{first_name}}.

Svalla är skärgården samlad på ett ställe: guider till öarna, gästhamnar och naturhamnar, krogarna värda att avvika för — och en plats för dina egna turer.

Tre saker att göra först.

:::kort
### 1. Planera sommarens tur
Skriv in start och mål. Du får sjöleden, vädret längs vägen och vad som ligger vid rutten.

[Planera en rutt →](https://svalla.se/planera/ny)
:::

:::kort
### 2. Spara öarna du vill till
Hjärtat på varje guide bygger upp *Min skärgård* — en privat lista att skicka till resten av crewet inför helgen.

[Utforska öarna →](https://svalla.se/oar)
:::

:::kort accent
### 3. Logga din första tur
Tryck *Logga tur* när du lägger ut. GPS:en sköter resten: distans, tid, fart och en ritad rutt på sjökortet. Med tiden en karta över skärgården du faktiskt seglat.

[Så funkar GPS-loggen →](https://svalla.se/logga)
:::

## Varför vi byggde Svalla

Skärgården är vacker men bökig. Turerna går olika beroende på vecka, krogarna har olika öppet beroende på månad, och det som gällde förra sommaren gäller inte nödvändigtvis i år.

Så vi samlade det. Öguiderna, hamnarna, färjetiderna och vädret på samma ställe. Ingen flikjonglering.

Loggade turer blir en del av kartan. Ju fler som är med, desto bättre blir den.

:::knapp
[Öppna Svalla](https://svalla.se)
:::

:::signatur
Ses därute.
— Team Svalla
*Ett gäng skärgårdsnördar med alldeles för många sjökort.*
:::
`,
  day7: `---
trigger: user_created + 7 days
layout: fullt
subject_options:
  - "Fem öar du förmodligen inte tänkt på"
  - "{{first_name}}, har du planerat sommarturen än?"
  - "Skärgården bortom Sandhamn"
preheader: De öar som flyger under radarn — och varför du borde åka dit.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Fem öar du förmodligen inte tänkt på

Hej {{first_name}}. De flesta gör samma resa varje år: Sandhamn, Grinda, Vaxholm. Inget fel med det — men det finns betydligt mer därute.

<!-- KÄLLA: Länsstyrelsen Stockholm, Skärgårdsfakta — ca 30 000 öar, ca 200 bebodda året runt -->
Stockholms skärgård har omkring 30 000 öar. Runt 200 av dem är bebodda året om. Här är fem som sällan hamnar på någons lista.

:::ruta
### Rödlöga
<!-- KÄLLA: Skippo / Visit Roslagen — tre bofasta året runt, ca 150 hushåll sommartid -->
Kala klippor och knotiga tallar längst ut i norra ytterskärgården. Tre personer bor här året runt.

[Läs guiden →](https://svalla.se/o/rodloga)
:::

:::ruta
### Husarö
Litet, lågmält och välskött. Den sortens ö man åker till för att inget särskilt ska hända.

[Läs guiden →](https://svalla.se/o/husaro)
:::

:::ruta
### Nämdö
Vidsträckt och tyst, med vikar som paddlare älskar. Stor nog att gå vilse på en eftermiddag.

[Läs guiden →](https://svalla.se/o/namdo)
:::

:::ruta
### Bullerö
Naturreservat som i praktiken bara seglare och kajakpaddlare hittar till. Bruno Liljefors ateljéö.

[Läs guiden →](https://svalla.se/o/bullero)
:::

:::ruta
### Landsort
<!-- KÄLLA: Sjöfartsverket, "Landsort – den äldsta svenskbyggda fyren" (uppförd 1689) -->
Söderut, på Öja. Sveriges äldsta bevarade fyr står här. Dramatiskt läge, lite folk.

[Läs guiden →](https://svalla.se/o/landsort)
:::

## Spara dem du fastnar för

Hjärtknappen lägger ön i *Min skärgård*. Sedan har du dem samlade när det är dags att bestämma.

:::knapp
[Öppna Min skärgård](https://svalla.se/min-skargard)
:::

:::signatur
Ses därute.
— Team Svalla
*Vi grälar fortfarande om vilken av de fem som är bäst. Ingen vinnare hittills.*
:::
`,
  season_open: `---
# PRODUKTREGEL: vårt eget cron-schema, inte en tid vi påstår om omvärlden
trigger: cron 1 april kl 09:00
layout: enkelt
subject_options:
  - "Säsongen öppnar — tre saker att göra nu"
  - "Skärgårdssäsongen startar snart"
  - "{{first_name}}, dags att planera skärgårdssommaren"
preheader: De som bokar i april får de bästa platserna. Tre saker den här veckan.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Säsongen öppnar snart

Hej {{first_name}}. Sommartidtabellerna är på väg och krogarna börjar ta emot bokningar. De som planerar i april får välja fritt. Tre saker att göra den här veckan.

:::kort
### 1. Boka boendet
Värdshusen och pensionaten på de populära öarna fyller högsommaren långt i förväg. Vänta inte.

[Sandhamn](https://svalla.se/o/sandhamn/boende) · [Grinda](https://svalla.se/o/grinda/boende) · [Finnhamn](https://svalla.se/o/finnhamn/boende)
:::

:::kort
### 2. Ring om bord
Krogarna öppnar bokningen under våren och tiderna varierar från år till år. Hellre en vecka för tidigt än en dag för sent.

[Se krogarna ö för ö →](https://svalla.se/oar)
:::

:::kort
### 3. Bokmärk turlistan
Sommartabellen släpps under våren. På vår färjesida ligger Waxholmsbolagets och Strömmas turer med aktuella tider — inga skärmdumpar från förra året.

[svalla.se/farjor →](https://svalla.se/farjor)
:::

## När du vet vart du vill

Spara öarna i *Min skärgård* så har du listan klar när det är dags att boka.

:::knapp
[Öppna Min skärgård](https://svalla.se/min-skargard)
:::

:::signatur
Glad sommar.
— Team Svalla
*Några av oss har redan sjösatt. Resten påstår att de väntar på rätt väder.*
:::
`,
  season_close: `---
# PRODUKTREGEL: vårt eget cron-schema, inte en tid vi påstår om omvärlden
trigger: cron 1 oktober kl 09:00
layout: enkelt
subject_options:
  - "Din skärgårdssommar i siffror"
  - "Tack för säsongen, {{first_name}}"
  - "Säsongen är slut — {{visited_count}} öar blev det"
preheader: Året i siffror — och vad Svalla gör under vintern.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Tack för säsongen, {{first_name}}

Det blev en sommar. Så här såg din ut:

:::siffror
- **{{visited_count}}** öar besökta
- **{{trip_count}}** turer loggade
- **{{distance_nm}}** distansminuter på vattnet
- **{{saved_count}}** öar sparade nästa år
:::

:::knapp
[Se hela din sammanställning](https://svalla.se/min-skargard)
:::

## Vi stänger inte

Skärgården är öppen året om, den är bara tystare. Under vintern finns kvar:

- **Väder och vind** — för dig som tar varje fönster som dyker upp
- **Öguiderna** — vad som har öppet utanför säsong står på varje ö-sida
- **Planeringen** — spara öar nu så är listan klar i april

Vi hörs igen när säsongen drar i gång.

:::signatur
Tack för i år.
— Team Svalla
*Nu drar vi upp båtarna och börjar planera nästa sommar. Nästan lika kul.*
:::

---

Känner du någon som borde vara med? [Bjud in dem här →](https://svalla.se/bjud-in)
`,
  weather_tip: `---
# PRODUKTREGEL: vårt eget cron-schema, inte en tid vi påstår om omvärlden
trigger: cron torsdagar 09:00 UTC, maj–september, om helgprognos ≥18°C och ≤40% regn och ≤9 m/s vind
layout: enkelt
subject_options:
  - "{{temp}}° i skärgården i helgen"
  - "Skärgårdsväder {{best_day}} — {{temp}}° och lite vind"
  - "Prognosen ser bra ut, {{first_name}}"
preheader: Prognosen ser bra ut. Tre öar att fundera på.
from: "Team Svalla <hej@mail.svalla.se>"
---

# Det blir skärgårdsväder

<!-- KÄLLA: SMHI-prognos via /api/weather, hämtad vid utskicket -->
Hej {{first_name}}. Prognosen för {{best_day}} ser bra ut: **{{temp}}°** och **{{wind}} m/s**. Tre öar att fundera på.

:::ruta
### Grinda
Naturreservat mitt i skärgården. Vandringsleder, klippbad och ett värdshus som lagar riktig mat.

[Grinda-guiden →](https://svalla.se/o/grinda)
:::

:::ruta
### Sandhamn
Seglarnas huvudstad. Bageri, klippor mot öppet hav och Sandhamns Värdshus. Boka bord innan du åker.

[Sandhamn-guiden →](https://svalla.se/o/sandhamn)
:::

:::ruta
### Finnhamn
<!-- KÄLLA: Skärgårdsstiftelsen — området förvaltas av stiftelsen, STF driver vandrarhemmet, tältning endast på anvisad plats (Stora Jolpan) -->
Naturreservat med STF-vandrarhem och bra kajakvatten. Tältning går bra på den anvisade lägerplatsen.

[Finnhamn-guiden →](https://svalla.se/o/finnhamn)
:::

Kolla sista turen hem innan du åker — den står på [färjesidan](https://svalla.se/farjor).

:::knapp
[Planera helgturen](https://svalla.se/planera)
:::

:::signatur
Ha en fin helg.
— Team Svalla
*Vi kollade prognosen tre gånger. Den höll sig.*
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
