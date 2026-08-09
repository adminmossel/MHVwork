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
