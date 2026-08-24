# CHANGELOG — update augustus 2026

Puntsgewijs, gekoppeld aan de oorspronkelijke lijst.

### ✅ Opgelost
- **Announcement-knop "insufficient permissions"** — de `announcements`-collectie had helemaal
  geen Firestore-regel, dus werd elke schrijfactie geblokkeerd. Regel toegevoegd.
- **Wachtwoord-reset link ongeldig** — het oude systeem maakte nooit een écht tijdelijk
  wachtwoord aan. Volledig vervangen door Firebase's eigen, beveiligde reset-flow.
  *(check Stap 3 in HANDLEIDING.md — authorized domain!)*
- **Rooster opent niet op "Alles"** — twee losstaande tab-sets deelden per ongeluk dezelfde
  variabele. Losgekoppeld; rooster opent nu standaard op "Alles".
- **Beheerders konden geen dev-rol toewijzen** — het gekozen rol-veld werd nooit opgeslagen bij
  het aanmaken van een uitnodiging. Gefixt.
- **@tag in chat stuurt alleen nog een pushmelding**, geen e-mail meer.
- **Pin-bug in chat** — het vastgepinde bericht stond bovenin de scrollende berichtenlijst en
  verdween dus bij scrollen. Nu een eigen vaste balk, altijd zichtbaar.
- **Uitbetaalknop uit de chat gehaald**; foto's versturen toegevoegd (incl. slepen/droppen).
- **Export-agendaknop werkte niet (vooral op mobiel/PWA)** — iOS/Android PWA's blokkeren
  soms stille blob-downloads. Nu eerst een poging via de Deel-functie (Web Share API), met
  download als fallback op desktop. Ook toegevoegd aan de dagweergave (stond er eerder niet).
- **Kalender "loopt vast"** — defensieve null-checks/try-catch toegevoegd rond het
  kalender-rendering, zodat één foutje niet alles blokkeert.
- **Promo.html paste niet op mobiel** — de vaste 1280×720-pixelinhoud werd nooit echt
  geschaald. Nu een correcte, universele schaal-fix (werkt in portret én landschap).
- **Help-knop** stuurt niet meer naar de promo-pagina, maar toont per pagina een korte,
  relevante uitleg (wat het is, wat je ermee kan, tips).
- **Beheerder zag zelf nooit aankondigingen op de homepage** — ontbrak, nu toegevoegd.

### ✨ Nieuw
- **Privéberichten (DM)** tussen medewerker en beheerder/dev, los van de groepschat.
- **Meldingen is nu een volledige pagina** (i.p.v. een dropdown-paneeltje), met tabs
  "Systeem" (aankondigingen/tags/uitbetalingen — visueel anders) en "Berichten" (de DM's).
- **Bevestigingsreminder-systeem**: melding direct na afloop van een onbevestigde dienst,
  tweede herinnering na een instelbaar aantal uren (standaard 30, aan te passen onder
  Beheer → Instellingen), en de oorspronkelijke tijd is daarna niet meer door de beheerder
  aan te passen — status toont "Geweest, onbevestigd".
- **Dashboard medewerker**: "Goedgekeurd" en "Uitbetaald" nu apart zichtbaar i.p.v. samengevoegd.
- **PWA-installatiepopup** direct na het aanmaken van een account, met een vinkje bij Profiel
  zodra de app daadwerkelijk geïnstalleerd is.
- **Dev: speciale aankondigingen** — eigen (rode) kleur, verschijnen als in-app pop-up, en
  sturen meteen push + e-mail naar de doelgroep.
- **Dienstnotities met foto** — beheerders kunnen bij een dienst een notitie + afbeelding
  toevoegen; medewerkers zien dit in hun rooster en krijgen een melding.
- **Meer animaties**: tabs, knoppen, chatbubbels, tabbalk, modals.
- **Beveiliging aangescherpt**: uitnodigingen kunnen niet meer door willekeurige bezoekers
  herschreven worden vóór registratie, wachtwoord-reset-systeem grondig herzien.

### 🔧 Optioneel, vereist eigen actie (zie HANDLEIDING.md)
- **Eigen e-mailtemplate per soort mail** — structuur staat klaar, jij vult de EmailJS-
  template-ID's in.
- **Gmail SMTP i.p.v. EmailJS** — code staat klaar in `functions/`, vereist Firebase Blaze-plan
  en handmatige deploy (kan niet vanuit deze sessie gedaan worden).

### ⚠️ Nog niet aangepast / bekende beperking
- De exacte 30-uurs reminder is **client-side getimed** (checkt zodra iemand de app opent),
  niet een exacte server-cronjob — op GitHub Pages zonder Cloud Functions kan dat niet
  nauwkeuriger. In de praktijk hebben beheerders/medewerkers de app regelmatig open, dus komt
  dit er in de praktijk dicht bij, maar het is geen harde garantie op de minuut.

## 🆕 Update 2 — bugfixes op gemelde problemen + nieuwe features

### 🐛 Bevestigde bugs (root cause gevonden, niet alleen symptoombestrijding)
- **"Eigen afwezigheid niet zichtbaar/verwijderbaar"** — de Firestore-query combineerde een filter met een sortering op een ander veld, wat een composite index vereiste die er nooit was. Zonder foutafhandeling faalde dit stil (geen data, geen foutmelding). Query vereenvoudigd (client-side sorteren) + foutafhandeling toegevoegd.
- **"Account met zelfde e-mail kan niet opnieuw aangemaakt worden"** — "verwijderen" in het dev-paneel wiste alleen het Firestore-profiel, nooit het Firebase Auth-account (dat kan technisch niet vanuit de app zelf). Duidelijke waarschuwing + handmatige oplossing toegevoegd (Firebase Console → Authentication), en een echte Cloud Function klaargezet voor als je dit ooit automatisch wil laten verlopen.
- **Agenda-export "nog steeds kapot"** — extra, specifiek voor iOS betrouwbaardere aanpak toegevoegd (`data:`-URI, een bekend werkend patroon in PWA's op Safari).

### ✨ Nieuw
- Automatisch groen vinkje wanneer een hele dienst klaar én iedereen uitbetaald is.
- Beheerder kan een dienst aanmaken zónder direct iemand toe te wijzen (oranje status), met automatische herinnering aan beheerders naarmate de datum nadert.
- Pushmeldingen uitgebreid: dag ervoor, 1 uur ervoor, direct na afloop ("hoe was je dienst?"), en de bestaande 30-uurs vervolgherinnering.
- E-mail/push-keuze bij het versturen van een privébericht via Meldingen; afzender staat duidelijk in titel + e-mail.
- E-mailvoorkeuren per medewerker: niet-urgente mails (bijv. vervallen dienst, notitie) zijn uit te zetten bij Profiel. Wachtwoord-mails en persoonlijke berichten van beheerder/dev blijven altijd binnenkomen.
- Profielfoto's voor iedereen (opgeslagen als gecomprimeerde afbeelding in het profiel zelf — geen Firebase Storage/Blaze-upgrade nodig), zichtbaar in chat en accountoverzicht.
- Excel-export van diensten over een gekozen periode: medewerkers als rijen, datums als kolommen, kruisje + tijden in de cellen.
- Geverifieerd-vinkje is nu een echt icoon (geen emoji meer) en door de dev toe te wijzen/intrekken bij elk account, niet meer alleen automatisch voor dev-accounts.
- "Bericht naar beheerder"-knoppen bij Profiel verwijderd (overbodig sinds Meldingen dit al kan). Meldingen-icoon nu geel.

## 🆕 Update 3 — dev als volwaardig eigen accounttype

- **Dev heeft nu een écht eigen navigatiestructuur**, net als beheerder z'n eigen tabs heeft — niet langer alles verzameld in één "Dev"-tab met subtabjes. Drie aparte pagina's onderin de tabbalk: **Beheer** (accounts + uitzending), **Aankondiging**, **Logboek**. Plus Chat, Meldingen en Profiel, die alle rollen delen.
- **Dev heeft geen Home-tab** — een dev is geen medewerker en start nu direct op de Beheer-pagina.
- Help-uitleg (het "?"-icoon) bijgewerkt met de juiste tekst per nieuwe dev-pagina.

## 🚨 Hotfix — "geen enkele knop werkt na inloggen"

Kritieke fout: bij het opsplitsen van het dev-paneel in aparte pagina's bleef er één verwijzing
staan naar de oude, inmiddels verwijderde functie `renderDev`. Daardoor crashte het script
meteen bij het opstarten, vóórdat alle knoppen aan hun functies gekoppeld konden worden —
inloggen werkte nog (apart stukje code), maar daarna reageerde niets meer. Verwijderd en
getest met een volledige runtime-simulatie (niet alleen een syntax-check) om zeker te zijn
dat alle 77 functies weer correct gebonden worden.

## 🆕 Update 4 — bugfixes op je laatste meldingen

- **Privébericht sturen "hele veld is 1 knop"** — root cause: kwetsbare, dubbel-geëscapete quotes in een onclick-attribuut met de naam van de ontvanger erin, wat bij bepaalde tekens de HTML-parsing brak. Volledig herschreven naar `data-uid`-attributen + losse click-listeners per rij (robuuster, geen escaping-risico meer).
- **Zwart scherm bij klikken op een chatfoto** — `window.open()` op een `data:`-URI faalt vaak stil in een PWA. Vervangen door een echte in-app lightbox (overal waar op een foto geklikt kan worden: chat, dienstnotities).
- **Logboek uitgebreider en overzichtelijker**: per-gebruiker samenvattingskaartjes (aantal logins, eerste/laatste keer) bovenaan, aanklikbaar om de tijdlijn te filteren, plus een "Exporteer naar Excel"-knop.
- **Tab- en meldingen-icoon animeren nu** bij het wisselen van pagina (kleine "pop"-animatie).
- **Geschorst account krijgt een eigen pagina** direct na inloggen, met de reden die de beheerder/dev bij het schorsen kan invullen — i.p.v. een simpele foutmelding op de inlogpagina.
- **README volledig herschreven**: overzichtelijker, met badges, inhoudsopgave, projectstructuur, en een licentie-sectie (inclusief de externe bibliotheken die MHVwork gebruikt en hún licenties).

## 🆕 Update 5 — bugfixes ronde 2

- **Animaties die na 1x stopten** → vervangen door de Web Animations API, speelt nu altijd opnieuw af.
- **Privébericht/aankondiging-acties "deden niets"** → root cause: geen foutafhandeling rond Firestore-aanroepen in `openDMThread`, `sendDM` en `deleteAnnouncement`. Als zo'n aanroep faalt (bv. rules nog niet bijgewerkt), gebeurde er he-le-maal niets zichtbaars. Nu tonen alle drie een duidelijke foutmelding met reden.
- **Niet-beschikbare medewerkers toch toevoegbaar bij het bewerken van een dienst** → `openEditShift` checkte beschikbaarheid niet (in tegenstelling tot bij aanmaken). Gefixt, met behoud van reeds-toegewezen medewerkers.
- **E-mail-keuze bij élke aankondiging** (niet alleen speciale).
- **Geen emoji meer op de schorsingspagina** — nu een SVG-icoon.
- **Beheerders konden dev-aankondigingen niet verwijderen** — zelfde silent-failure patroon als hierboven, nu met foutmelding. Dev's eigen Aankondiging-pagina toont nu ook alle bestaande aankondigingen (kon voorheen niet).
- **"Tygo" hernoemd naar "Dev"** in de hardcoded dev-bypass. *Let op: als er al een bestaand account met de naam "Tygo (Dev)" in je database staat, pas die zelf even aan via Beheer → Accounts → ✏ Rol/gegevens — nieuwe accounts krijgen nu automatisch "Dev".*
- **Datum aanpasbaar bij het bewerken van een afwezigheidsmelding** (kon voorheen alleen de reden).
- **Logboek opvragen via het gesprek met de dev**: beheerder klikt "Vraag logboek op" in de chat met de dev → dev kiest welke gebruikers in de export mogen en keurt goed → aanvrager krijgt een downloadknop in hetzelfde gesprek.
- **Agenda-export grondig herzien**: na onderzoek bleek elke losse "trick" (blob-download, Share API, `data:`-URI) op zich onbetrouwbaar — Apple blokkeert het dynamisch openen van .ics-bestanden in sommige gevallen, en Android-browsers hebben bekende bugs met .ics-afhandeling. Nu een keuze-scherm (zoals Eventbrite/Meetup): "Google Agenda" (opent direct, werkt universeel) of "Apple Agenda / Outlook" (.ics-download, nu ook met de verplichte `DTSTAMP`-regel die eerder ontbrak — sommige agenda-apps weigerden het bestand zonder die regel volledig).

## 🆕 Update 6 — twee kritieke fixes + verdere verbeteringen

### 🚨 Kritiek (verklaart meerdere terugkerende klachten)
- **Agenda-export "werkte nog steeds niet"**: de knoppen verwezen rechtstreeks naar `allShifts` middenin een `onclick=""`-attribuut. Zulke attributen draaien in de globale scope, terwijl `allShifts` module-scoped is — dus onzichtbaar daarbuiten. Dit gaf altijd een `ReferenceError`, op alle apparaten, meteen bij het klikken. Gefixt door alleen het ID mee te geven.
- **Privébericht "werkt nog steeds niet"**: eindelijk de échte oorzaak gevonden dankzij jouw screenshot — een subtiele fout in de Firestore-regel crashte bij het *allereerste* bericht naar iemand nieuws (vóór het gesprek bestaat), en Firestore behandelt zo'n crash als een blokkade. **Dit vereist opnieuw dat je de bijgewerkte `firestore.rules` publiceert in de Firebase Console — zonder die stap blijft dit stuk.**

### ✨ Verder deze ronde
- Beheerders kunnen **geen** dev-aankondigingen meer verwijderen (teruggedraaid, was per ongeluk andersom gefixt) — zowel in de app als hard in de Firestore-regels.
- Geverifieerd-vinkje en profielfoto tonen nu op veel meer plekken (roosterlijsten, dienstenoverzicht, privéberichten-lijst, logboek), niet alleen chat/profiel.
- Ruilverzoek: als iemand interesse toont, wordt het **originele** bericht in de chat nu ook duidelijk visueel bijgewerkt (gele rand + "✓ interesse"-label), niet alleen een nieuw apart berichtje.
- Verborgen easter egg: tik 7x snel op het logo 🍺
- Feestdagen-thema (kerst, oud & nieuw, Koningsdag, Halloween, Pasen): klein feestelijk accent bij het logo + eenmalige felicitatie in de app. *Het daadwerkelijke beginscherm-icoon van de PWA kan helaas niet dynamisch wisselen — dat is een technische beperking van hoe app-iconen werken, geen keuze.*
- E-mailvoorkeuren-sectie verduidelijkt: dit gaat alleen over e-mail, in-app pushmeldingen beheer je bij Meldingen.

## 🆕 Update 7

### 🚨 Belangrijke architectuurfix
- **Pushmeldingen "werkten niet helemaal"**: geanalyseerd en uitgelegd — de bestaande "push" toonde
  alleen een melding lokaal bij wie de actie uitvoerde, nooit bij de daadwerkelijke ontvanger op
  een ander apparaat. Dat kan alleen via een echte pushserver. Firebase Cloud Messaging-infrastructuur
  toegevoegd (client-registratie + Cloud Function + service worker) — **optioneel te activeren, zie
  Stap 6 in HANDLEIDING.md**. Zonder die stap blijft alles werken zoals nu (lokale meldingen).

### ✨ Nieuw
- **Privéberichten zijn nu een volledige pagina** i.p.v. een pop-up, met terugknop, precies zoals de groepschat.
- Privéberichten zijn nu **altijd alleen een pushmelding** — geen e-mail-keuze meer.
- **Geweest + volledig uitbetaalde diensten zijn niet meer te bewerken of verwijderen** — tonen een "🔒 Afgehandeld"-label.
- **Custom laadanimatie** i.p.v. een generieke spinner (het logo dat zachtjes ademt + een laadbalk).
- **Easter egg verbeterd**: elke tik op het logo telt nu mee (bijgehouden), en bij 7x snel achter elkaar ontgrendel je een **geheim thema**: elke dag een nieuwe foto van NASA's "Astronomy Picture of the Day" als achtergrond, te kiezen bij Profiel → Thema.
- **Nieuw thema: "Liquid Glass"** 🫧 — een kleurrijk, vervagend glaseffect-thema, gewoon te kiezen naast licht/donker/systeem (systeem blijft de standaard).
