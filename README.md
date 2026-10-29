<div align="center">
<img src="icon.svg" width="88" height="88" alt="MHVwork logo">

# 🍺 MHVwork

### Het rooster van de MHV-kantine — gebouwd vóór en dóór de barhulp

**Geen rooster-appje uit de store. Geen abonnement. Geen WhatsApp-chaos meer.**

<br>

**🇳🇱 Nederlands** · [🇬🇧 English](./README.en.md)

<br>

[![PWA](https://img.shields.io/badge/PWA-installeerbaar-1A3BB5?style=for-the-badge)](#-installeren)
[![Hosting](https://img.shields.io/badge/hosting-GitHub%20Pages-181717?style=for-the-badge&logo=github)](#-technologie)
[![Database](https://img.shields.io/badge/database-Firebase%20Firestore-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](#-technologie)
[![Licentie](https://img.shields.io/badge/licentie-intern%20gebruik-lightgrey?style=for-the-badge)](#-licentie)

<br>

[🌐 Open de app](https://adminmossel.github.io/MHVwork/) ·
[📖 Handleiding](./HANDLEIDING.md) ·
[📝 Changelog](./CHANGELOG.md) ·
[🎨 Promopagina](./promo.html)

</div>

---

Eén gratis, op maat gebouwde app die precies doet wat een kantine met vrijwilligers nodig heeft —
en verder niks. Geen los WhatsApp-groepje waarin het laatste rooster ligt te verstoffen, geen
Excel-bestand dat maar op één laptop staat: iedereen ziet zijn eigen diensten, geeft
beschikbaarheid door en ruilt met een collega. De beheerder keurt goed, betaalt uit en heeft
altijd een actueel overzicht.

## 📋 Inhoud

- [Wat kan MHVwork?](#-wat-kan-mhvwork)
- [Rollen & bevoegdheden](#-rollen--bevoegdheden)
- [Technologie](#-technologie)
- [Installeren als app](#-installeren)
- [Aan de slag](#-aan-de-slag)
- [Projectstructuur](#-projectstructuur)
- [Beveiliging](#-beveiliging)
- [Dank aan](#-dank-aan)
- [Gebruikte bibliotheken & licenties](#-gebruikte-bibliotheken--licenties)
- [Licentie](#-licentie)

---

## ✨ Wat kan MHVwork?

<table>
<tr>
<td width="50%" valign="top">

### 📅 Rooster & diensten
- Diensten aanmaken — ook zónder direct iemand toe te wijzen
- Eindtijd "Sluit" voor diensten met een onbekende sluitingstijd, telt pas mee zodra de
  medewerker de werkelijke tijd doorgeeft
- Bevestigen, of een afwijkende gewerkte tijd melden
- Notitie + foto per dienst
- Live voortgangsbalk en countdown op Home zodra een dienst bezig is
- Export naar de eigen agenda (`.ics`) of Excel
- **Thuiswedstrijden** van de MHV-website (import via de console of automatische sync): tijd, logo's, wie tegen wie en waar — zichtbaar bij Rooster, Home en idle-modus. Beheerder én dev kunnen ze importeren of handmatig invoeren; bij de laatste import staat wie het deed. Een herhaalde import maakt nooit een dubbele wedstrijd aan: elke wedstrijd krijgt een vaste sleutel (datum + beide teams), dus een nieuwe import werkt de bestaande wedstrijd bij in plaats van er een tweede naast te zetten. Lijst met ingevoerde wedstrijden staat standaard ingeklapt
- **Wedstrijd-importlog (alleen dev)**: elke import staat genoteerd (door wie, wanneer, hoeveel nieuw/bijgewerkt), met een knop om een hele import in één keer ongedaan te maken
- **Korte stap-voor-stap uitleg** (met screenshots) direct bij het importpaneel: "Hoe werkt importeren?" — een laptop/desktop wordt aangeraden, want rechtsklikken + Developer Tools werkt op een telefoon anders
- **Eigen team**: iedereen geeft bij de eerste keer inloggen (ook bestaande accounts) aan bij welk team hij/zij speelt, of "geen team". Zodra die persoon op een dag een eigen wedstrijd heeft, waarschuwt de app bij het samenstellen van een dienst dat diegene waarschijnlijk maar tot het begin van de wedstrijd kan werken (exclusief reis-/verzameltijd) — met het advies dit in de Lisa-app te checken
- **Dienstadvies** (beheerder): per wedstrijddag een voorstel voor tijden en aantal mensen (Heren 1 druk, onder-11 rustig, minimaal 2 — behalve een rustige ochtendwedstrijd), met één knop "Maak dienst aan" die het formulier voorinvult. Handmatig een dienst aanmaken blijft kunnen. Staat standaard ingeklapt (met een telbadge) op Home en Rooster
- **Kalender** vernieuwd: duidelijke stippen voor dienst (blauw) en eigen thuiswedstrijd (geel), rustigere animatie, legenda onderin

</td>
<td width="50%" valign="top">

### 📣 Open diensten
Een beheerder kan een dienst aanmaken zonder iemand toe te wijzen en vragen wie wil. Kies het aantal plekken en of de beheerder zelf kiest uit de aanmeldingen, of dat wie zich het eerst opgeeft er direct op staat. Medewerkers zien op hun homepage een kaart *Open dienst* (dag, tijd, aantal plekjes) met de knop **Geef je op**; de beheerder wijst toe via *Dienst bewerken*.

### 📺 Bar-scherm
Onderaan de homepage staat een klein knopje *Bar-scherm* dat de idle-modus opent (rooster van vandaag en wedstrijden, groot en leesbaar, met eigen uitgangscode). Het scherm blijft aan zolang de idle-modus draait.

### 🔑 Snelle toegang (snelcode + QR)
**Snel inloggen met code.** Onder "Inloggen" staat de knop *Snelcode*. Je typt alleen je persoonlijke code (6–12 letters/cijfers) en krijgt een beperkt, mooi overzicht: een aftelring voor je lopende of volgende dienst (met wie er nog meer staat), je komende diensten, de thuiswedstrijden van vandaag en de komende dagen (met een label als een wedstrijd tijdens jouw dienst valt) en een berichtenvak met snelle zinnen. Niets wordt onthouden: nieuw tabblad = opnieuw je code, en het scherm sluit na 5 minuten zonder gebruik. Na 4 foute pogingen is een toestel 15 minuten geblokkeerd.

**Verplichte snelcode.** Elk account (medewerker, beheerder, dev) stelt er bij de eerstvolgende login één in; tot dat gebeurd is, is de app niet te gebruiken. Een knop genereert een veilige code. Tijdens de eerste login komen de popups netjes na elkaar: (installatie →) rondleiding → teamkeuze → snelcode.

**Persoonlijke QR.** Elke medewerker heeft een eigen QR waarmee je direct in je volledige account komt. Scannen kan met de camera-app of met de knop *QR scannen* op de inlogpagina (die opent de camera). Opslaan in de galerij, printen als A4-kaartje, of als **pinpas** (bankpasformaat 85,6 × 54 mm, voor- en achterkant, als PDF of afbeelding).

**QR uitgelekt?** De eigenaar (Profiel → Snelle toegang), een beheerder (voor medewerkers) en de dev (voor iedereen) kunnen de QR vernieuwen. De oude QR is direct ongeldig, ook op toestellen waar al mee is ingelogd, en de getroffen persoon krijgt een mail. De dev kan ook een snelcode resetten. Een geschorst account verliest direct ook zijn QR- en snelcode-toegang. De dev ziet in het Logboek wie er via QR is ingelogd en kan per account *Overal uitloggen*. Op een toestel kun je ook inloggen met vingerafdruk of gezicht (aan te zetten in Profiel).

Alles draait op het gratis Spark-plan: anonieme Firebase-sessies plus Firestore-regels, geen Cloud Functions. Vereist wel dat **Anonymous** is ingeschakeld bij Authentication → Sign-in method.

---

### 🔄 Dienst ruilen
- Medewerker plaatst een ruilverzoek in de groepschat
- Collega's tonen interesse
- Beheerder keurt goed
- Dienst wordt automatisch overgezet, beide partijen krijgen een melding

</td>
</tr>
<tr>
<td valign="top">

### 💬 Groepschat & privéberichten
- `@naam`, `@iedereen`, `@beheerder`, `@dev` — direct een pushmelding
- Foto's, automatisch gecomprimeerd — vloeiende animatie, alleen nieuwe berichten schuiven in
- Zoeken in de groepschat, en een apart archief van alle vastgepinde berichten
- Berichten vastpinnen of verwijderen
- Privéberichten (DM) tussen medewerker en beheerder/dev, nu met foto's en bijlagen (max 700 KB, opgeslagen in Firestore — geen Storage/Blaze nodig), leesbevestiging ("Gezien") en "aan het typen…"

</td>
<td valign="top">

### 📢 Aankondigingen
- Op Home alleen de titel, volledige tekst pas na aantikken
- Opmaak met werkbalk en live voorbeeld: **vet**, *schuin*, onderstreept, doorgehaald, markeren, koppen, lijstjes en links
- Foto mee in de e-mail (als miniatuur — zie HANDLEIDING)
- Speciale aankondigingen met eigen kleur en directe pop-up
- Eigen aankondiging achteraf **bewerken** (dev kan alles bewerken; beheerder niet die van dev)

</td>
</tr>
<tr>
<td valign="top">

### 💶 Uitbetalingen
- Bevestigd → goedgekeurd → uitbetaald
- Apart overzicht van wat nog goedgekeurd moet worden
- Export naar boekhouding: nette grootboekregels per medewerker per dienst

</td>
<td valign="top">

### 🔔 Meldingen
- In-app, e-mail én browser push
- Een dag van tevoren, een uur van tevoren, direct na afloop
- Vervolgherinnering als een dienst na verloop van tijd nog niet bevestigd is

</td>
</tr>
<tr>
<td valign="top">

### 🍺 Sociale hygiëne
- Per medewerker bijhouden of iemand mag schenken (IVA-certificaat)
- Zichtbaar voor iedereen via "Andere gebruikers" bij Profiel

</td>
<td valign="top">

### 📺 Idle-modus
- Kiosk-weergave voor een tablet achter de bar
- Rooster van vandaag met live tijdbalk per dienst
- Start met een zelfgekozen 4-cijferige code, nergens opgeslagen

</td>
</tr>
</table>

### 🎨 Weergave
Zwevende, glazen navigatie of de klassieke volle-breedte-balk — naar keuze per account. Licht,
donker of een verborgen NASA-APOD-thema, los van de systeeminstelling. Het witte thema is in 1.5 volledig herzien: alle tekst minstens 5:1 contrast, duidelijke knoppen en invoervelden, leesbare badges. Wachtwoord-sterktemeter
bij aanmaken én wijzigen. **Eigen achtergrond**: kies een foto uit je galerij, die alleen op dat toestel wordt bewaard (IndexedDB) en dus geen databaseruimte kost.

---

### 🛠 Dev-beheer
Tabs voor **Accounts**, **Gasten**, **Wedstrijden**, **Berichten** en **Instellingen** (Aankondigingen en Logboek blijven eigen tabbladen). Tijdelijke gastaccounts die een beheerder aanmaakt moeten door dev worden **goedgekeurd** voordat ze kunnen inloggen; dev kan ze verlengen, een datum instellen, intrekken, **definitief maken** (geen vervaldatum meer) of verwijderen.

---

### 📶 Offline
Geen bereik tijdens het typen? Een bericht in de groepschat of een privébericht wordt dan lokaal vastgehouden (herkenbaar aan een lichter bolletje met een klokje) en automatisch alsnog verstuurd zodra er weer verbinding is — boven in beeld staat intussen een balkje met het aantal wachtende berichten.

---

## 👤 Rollen & bevoegdheden

| Rol | Toegang |
|---|---|
| 👤 **Medewerker** | Eigen rooster, beschikbaarheid, chat, profiel, agenda-export, dienst ruilen |
| 🛠️ **Beheerder** | Alles van medewerker + roosters beheren, medewerkers uitnodigen, uitbetalingen, aankondigingen, functies uitzetten voor één profiel — tenzij dev een specifieke bevoegdheid heeft ingetrokken |
| 💻 **Dev** | Eigen omgeving: accountbeheer, bevoegdheden per beheerder, functies app-breed uitzetten, aankondigingen, logboek, harde reset — géén toegang tot financiële gegevens |

Bevoegdheden zijn fijnmazig, niet alles-of-niets:

- **Dev kan een beheerder-account specifieke bevoegdheden ontnemen** (medewerkers toevoegen,
  diensten aanmaken/verwijderen/goedkeuren, uitbetalen, aankondigingen plaatsen, medewerkers
  beheren, functies per profiel uitzetten) zonder het hele account te schorsen — afgedwongen in
  zowel de app als de databaseregels zelf, en zichtbaar voor de betrokken beheerder in het eigen
  profiel
- **Een beheerder kan nooit een aankondiging van dev verwijderen**, en kan geen functie
  app-breed uitzetten (zoals de chat) — dat blijft voorbehouden aan dev. Een beheerder kan wel
  een functie uitzetten voor één profiel, bijvoorbeeld tijdens onboarding
- **Harde reset (alleen dev)**: wist in één keer alle diensten, chat, meldingen en
  betaalhistorie, met dubbele bevestiging — accounts en logboek blijven altijd staan

---

## 🛠 Technologie

| Onderdeel | Technologie |
|---|---|
| Hosting | GitHub Pages (gratis) |
| Database | Firebase Firestore (Spark-plan, gratis tier) |
| Authenticatie | Firebase Authentication |
| E-mail | EmailJS (optioneel: Gmail SMTP via Cloud Functions, zie `index.js`) |
| Push | Browser Notification API + Service Worker |
| PWA | Web App Manifest + Service Worker |
| Agenda-export | `.ics`-bestand (iPhone, Android, Windows, Mac) |
| Excel-export | [SheetJS](https://sheetjs.com) (client-side, geen server nodig) |

Geen build-stap, geen framework — puur HTML/CSS/JavaScript, direct leesbaar en aanpasbaar.

---

## 📲 Installeren

MHVwork is een **Progressive Web App**: geen appstore nodig.

<details>
<summary><strong>🍎 iPhone / iPad</strong></summary>

1. Open MHVwork in Safari
2. Tik op **Deel**
3. Kies **Zet op beginscherm**

</details>

<details>
<summary><strong>🤖 Android</strong></summary>

1. Open MHVwork in Chrome
2. Open het browsermenu
3. Kies **App installeren** of **Toevoegen aan startscherm**

</details>

<details>
<summary><strong>💻 Desktop</strong></summary>

Gebruik Chrome of Edge en klik op het installatie-icoon in de adresbalk.

</details>

---

## 🚀 Aan de slag

Volledige installatie- en updatehandleiding: zie **[HANDLEIDING.md](./HANDLEIDING.md)**.
Overzicht van alle wijzigingen per versie: zie **[CHANGELOG.md](./CHANGELOG.md)**. Alles over versie 1.5: **[V1.5.md](./V1.5.md)**.

In het kort:
1. Fork of clone deze repository
2. Maak een eigen [Firebase](https://console.firebase.google.com)-project aan (Spark-plan volstaat)
3. Vul je Firebase-configuratie in bovenaan `app.html`, `index.html`, `fast.html`, `register.html` en `reset-pw.html`
4. Zet in Authentication → Sign-in method **Anonymous** aan (nodig voor snelcode en QR)
5. Publiceer de `firestore.rules` in de Firebase Console
6. Zet GitHub Pages aan voor deze repository

---

## 📁 Projectstructuur

```
├── index.html          Inlogpagina
├── register.html        Accountregistratie (via uitnodigingslink)
├── reset-pw.html         Wachtwoord opnieuw instellen
├── app.html              De volledige applicatie (alle rollen)
├── fast.html             Snelcode-overzicht (beperkt: dienst, wedstrijden, bericht)
├── qr.js                 QR-generator (qrcode-generator, MIT)
├── jsqr.js               QR-lezer voor de camera-scanner (jsQR, Apache-2.0)
├── voorwaarden.html       Gebruiksvoorwaarden & privacyverklaring
├── promo.html             Presentatie "Wat is MHVwork?"
├── firestore.rules        Firestore security rules
├── manifest.json          PWA-manifest
├── sw.js                  Service worker
├── index.js               Optionele Cloud Functions (Gmail SMTP, accountbeheer)
├── icon.svg / icon-*.png  App-iconen
├── HANDLEIDING.md         Installatie- en updatehandleiding
├── CHANGELOG.md           Overzicht van alle wijzigingen
└── V1.5.md                Volledige inhoud van versie 1.5 (snelle toegang)
```

---

## 🔒 Beveiliging

- Alle databasetoegang loopt via Firestore Security Rules — medewerkers kunnen alleen hun eigen
  gegevens aanpassen, beheerders beheren roosters/uitbetalingen binnen hun bevoegdheden, en de
  dev-rol heeft geen toegang tot financiële gegevens
- Installatie wordt per account én per toestel bijgehouden (Profiel → App): is de app op één apparaat geïnstalleerd, dan komt de installatie-barricade nooit meer terug — een bekend maar nog niet geïnstalleerd apparaat krijgt alleen een kleine melding met een installeerknop
- Alleen een dev-account kan de dev-rol toewijzen of intrekken, en alleen dev kan een beheerder
  specifieke bevoegdheden ontnemen — of een app-brede functie uitzetten — allebei afgedwongen in
  zowel de app als de databaseregels, niet alleen in het scherm
- Wachtwoord-reset verloopt via Firebase's eigen, beveiligde flow
- Geschorste accounts worden bij inloggen direct geweigerd (en verliezen direct hun QR-/snelcode-toegang)
- Snelcode en QR werken via anonieme Firebase-sessies die de Firestore-regels alleen als geldig zien zolang de teller van het account niet is opgehoogd; tokens zijn niet te lijsten of te zoeken, een snelcode-sessie mag alleen eigen diensten/wedstrijden lezen en berichten versturen

> ⚠️ Controleer altijd de actuele `firestore.rules` voordat je naar een productieomgeving gaat.

---

## 🙏 Dank aan

Met dank voor het testen en meedenken:

- R. Massalt
- I. Massalt
- C. Koning
- J. v Heun (dev)
- Jou, als je meehelpt!

---

## 📦 Gebruikte bibliotheken & licenties

MHVwork is zelf geschreven zonder framework, maar leunt op de volgende diensten en bibliotheken:

| Bibliotheek / dienst | Doel | Licentie |
|---|---|---|
| [Firebase](https://firebase.google.com) (Firestore, Auth, Cloud Functions) | Database, login, optionele mailserver | [Google APIs Terms of Service](https://developers.google.com/terms) |
| [EmailJS](https://www.emailjs.com) | E-mailverzending vanuit de browser | Eigen servicevoorwaarden ([emailjs.com/legal](https://www.emailjs.com/legal/terms-of-service/)) |
| [SheetJS (xlsx)](https://sheetjs.com) | Excel-export in de browser | [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) |
| [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator) | QR-codes tekenen (`qr.js`) | MIT License |
| [jsQR](https://github.com/cozmo/jsQR) | QR lezen met de camera (`jsqr.js`) | Apache License 2.0 |
| [Nodemailer](https://nodemailer.com) | Gmail SMTP-verzending (optioneel, `index.js`) | MIT License |
| [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts) | Lettertype | [SIL Open Font License 1.1](https://openfontlicense.org) |

---

## 📄 Licentie

Deze applicatie is gebouwd voor en het interne gebruik van **MHV**. De broncode mag vrij bekeken,
aangepast en hergebruikt worden voor gelijksoortige vrijwilligersorganisaties; gebruik op eigen
risico en zonder enige garantie. Bovenstaande externe diensten en bibliotheken vallen onder hún
eigen licentievoorwaarden (zie tabel hierboven) — check die zelf even als je deze app elders wil
inzetten of doorontwikkelen.

<div align="center">
<br>

### 🍺 MHVwork

**Eén rooster. Eén team. Eén plek.**

Gebouwd voor **MHV**.

<sub>Vragen, bugs of support: h.mhvwork@gmail.com</sub>

</div>
