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

</td>
<td width="50%" valign="top">

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
- Foto's, automatisch gecomprimeerd
- Berichten vastpinnen of verwijderen
- Privéberichten (DM) tussen medewerker en beheerder/dev

</td>
<td valign="top">

### 📢 Aankondigingen
- Op Home alleen de titel, volledige tekst pas na aantikken
- Basisopmaak (vet, tabs, witregels) bij het aanmaken
- Speciale aankondigingen met eigen kleur en directe pop-up

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
donker of een verborgen NASA-APOD-thema, los van de systeeminstelling. Wachtwoord-sterktemeter
bij aanmaken én wijzigen.

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
Overzicht van alle wijzigingen per versie: zie **[CHANGELOG.md](./CHANGELOG.md)**.

In het kort:
1. Fork of clone deze repository
2. Maak een eigen [Firebase](https://console.firebase.google.com)-project aan (Spark-plan volstaat)
3. Vul je Firebase-configuratie in bovenaan `app.html`, `index.html`, `register.html` en `reset-pw.html`
4. Publiceer de `firestore.rules` in de Firebase Console
5. Zet GitHub Pages aan voor deze repository

---

## 📁 Projectstructuur

```
├── index.html          Inlogpagina
├── register.html        Accountregistratie (via uitnodigingslink)
├── reset-pw.html         Wachtwoord opnieuw instellen
├── app.html              De volledige applicatie (alle rollen)
├── voorwaarden.html       Gebruiksvoorwaarden & privacyverklaring
├── promo.html             Presentatie "Wat is MHVwork?"
├── firestore.rules        Firestore security rules
├── manifest.json          PWA-manifest
├── sw.js                  Service worker
├── index.js               Optionele Cloud Functions (Gmail SMTP, accountbeheer)
├── icon.svg / icon-*.png  App-iconen
├── HANDLEIDING.md         Installatie- en updatehandleiding
└── CHANGELOG.md           Overzicht van alle wijzigingen
```

---

## 🔒 Beveiliging

- Alle databasetoegang loopt via Firestore Security Rules — medewerkers kunnen alleen hun eigen
  gegevens aanpassen, beheerders beheren roosters/uitbetalingen binnen hun bevoegdheden, en de
  dev-rol heeft geen toegang tot financiële gegevens
- Alleen een dev-account kan de dev-rol toewijzen of intrekken, en alleen dev kan een beheerder
  specifieke bevoegdheden ontnemen — of een app-brede functie uitzetten — allebei afgedwongen in
  zowel de app als de databaseregels, niet alleen in het scherm
- Wachtwoord-reset verloopt via Firebase's eigen, beveiligde flow
- Geschorste accounts worden bij inloggen direct geweigerd

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
