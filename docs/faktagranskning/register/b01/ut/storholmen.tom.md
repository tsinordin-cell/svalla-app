# Storholmen – det som kräver Tom (batch 01, 2026-10-29)

## 1. Platsen `runmaro-bryggkiosk` (register 0213–0217)

**Läget:** Raden i `restaurants` heter "Runmarö Bryggkiosk", typ `cafe`, nål 59.2945, 18.7565 och webbplats http://www.runmarolanthandel.se/. Ingen tillåten källa nämner en verksamhet med det namnet.

- Webbplatsen tillhör Runmarö Lanthandel (Tempo Runmarö), Styrsvik 125. Butiken skriver själv att den ligger "ca 200m från Styrsviks brygga". En sökning på "kiosk" på sajten ger "Inget matchade dina söktermer." (läst 2026-10-29).
- Nålen ligger på bryggan Gatan (OSM ferry_terminal, Långvik, Värmdö kommun), cirka 2 km från Styrsvik.
- Platsen hör till Runmarö, inte till Storholmen. Den hamnade i Storholmens register bara för att Storholmens nål låg fel, vid Runmarö (rad 0014). När nålen är rättad räknas den inte längre till Storholmen. Runmarös egen granskning kan ta över ärendet.

Att radera eller dölja platsen är inte tillåtet, så jag lämnar ingen SQL. Tills svar finns står raden kvar som den är; beskrivningen är redan tom sedan 2026-09-26.

**Fråga till verksamheten** (adressen kommer från deras sida "Om oss", https://www.runmarolanthandel.se/kontaka-oss/):

> **Till:** info@runmarolanthandel.se
> **Ämne:** Kiosk vid Gatans brygga på Runmarö?
>
> Hej!
>
> Vi går igenom uppgifterna om Runmarö på svalla.se. Hos oss finns en plats som heter "Runmarö Bryggkiosk", ett kafé vid bryggan Gatan, och den länkar till er webbplats. Vi hittar ingen sådan kiosk hos er.
>
> Driver ni, eller någon annan, en kiosk eller ett kafé vid Gatans brygga? Om ja: vad heter den, och när har den öppet? Om nej rättar vi uppgiften och visar i stället Runmarö Lanthandel med det ni själva skriver på er webbplats.
>
> Tack på förhand!
>
> Hälsningar
> Tom, Svalla (svalla.se)

**Om svaret är nej – förslag på ersättning:** Raden görs om till Runmarö Lanthandel med uppgifterna från butikens egen sida: "Runmarö Lanthandel byggdes 1983", Styrsvik 125, "ca 200m från Styrsviks brygga". Det kräver ditt beslut av två skäl:

- Tabellen `restaurants` har ingen typ för butik (befintliga typer: restaurant, cafe, bar, harbor, beach, hotel, sauna, fuel, med flera). Ny typ är en **schemaändring**.
- Butikens exakta läge finns inte i OpenStreetMap. Nålen behöver mätas, till exempel i Lantmäteriets Min karta, eller hämtas från butiken.
