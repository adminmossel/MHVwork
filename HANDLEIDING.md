# MHVwork — Volledige Setup Handleiding
**Leestijd: ~20 minuten | Geen technische kennis vereist**

---

## 🆕 UPDATE — stappenplan om deze nieuwe versie in te voeren

Deze update bevat bugfixes en nieuwe features (zie CHANGELOG.md voor de volledige lijst).
Volg deze stappen in volgorde — dit duurt ~10-15 minuten.

### Stap 1 — Bestanden uploaden naar GitHub
1. Ga naar je repo: **https://github.com/adminmossel/MHVwork**
2. Upload/overschrijf alle meegeleverde bestanden (via "Add file" → "Upload files", sleep alle
   bestanden erin, en commit direct op de `main`-branch — dat is precies wat GitHub Pages live zet).
3. Wacht ~1 minuut tot GitHub Pages de nieuwe versie heeft gepubliceerd.

### Stap 2 — Firestore Security Rules bijwerken (VERPLICHT)
Zonder deze stap blijven aankondigingen, privéberichten en instellingen kapot.
1. Ga naar **https://console.firebase.google.com** → jouw project → **Firestore Database** → tabblad **Regels**
2. Vervang de volledige inhoud door de nieuwe `firestore.rules` uit deze levering
3. Klik **Publiceren**

### Stap 3 — Authorized domain checken (VERPLICHT voor wachtwoord-reset)
1. Firebase Console → **Authentication** → **Settings** → tabblad **Authorized domains**
2. Controleer of **`adminmossel.github.io`** in de lijst staat. Zo niet: klik **Add domain** en voeg 'm toe.
   (Zonder dit blijft de "link ongeldig"-fout terugkomen bij wachtwoord resetten.)

### Stap 4 — Eigen e-mailtemplates instellen (OPTIONEEL)
De app werkt direct met de bestaande EmailJS-template voor alles. Wil je per soort mail
(aankondiging/tag/ruil/wachtwoord) een ander uiterlijk?
1. Ga naar **https://dashboard.emailjs.com** → **Email Templates** → **Create New Template** (4x, één per soort)
2. Kopieer steeds het Template ID
3. Open `app.html`, zoek naar `EMAILJS_TPL_ANNOUNCE` / `EMAILJS_TPL_TAG` / `EMAILJS_TPL_SWAP` / `EMAILJS_TPL_PW`
   (rond regel 45) en vul je eigen ID's in
4. Upload het aangepaste `app.html` opnieuw naar GitHub

### Stap 5 — Gmail SMTP i.p.v. EmailJS (OPTIONEEL, technischer)
Je vroeg om "de gratis Google SMTP service" i.p.v. EmailJS. Dit **kan alleen via Firebase Cloud
Functions** — GitHub Pages is pure statische hosting en kan zelf geen mail versturen.
De code staat klaar in de map `functions/`, maar deployen moet je zelf doen (ik heb geen
toegang tot jouw Firebase-project):

1. **Blaze-plan activeren**: Firebase Console → tandwiel (⚙️) → **Upgrade** → kies **Blaze**
   (pay-as-you-go; je gratis quotum is ruim genoeg voor dit gebruik, dus in de praktijk €0)
2. **Gmail app-wachtwoord aanmaken**: log in op het Gmail-account dat je wil gebruiken →
   **myaccount.google.com/apppasswords** → maak een app-wachtwoord aan (16 tekens, geen spaties)
   *(vereist dat 2-staps-verificatie aanstaat op dat Google-account)*
3. Installeer op je eigen computer **Node.js** (nodejs.org) en de Firebase CLI:
   ```
   npm install -g firebase-tools
   firebase login
   ```
4. Ga in een terminal naar de map van dit project (waar de map `functions/` in staat) en voer uit:
   ```
   firebase use --add        (kies je mhvwork-project)
   firebase functions:secrets:set GMAIL_USER
   firebase functions:secrets:set GMAIL_APP_PASSWORD
   cd functions && npm install && cd ..
   firebase deploy --only functions
   ```
5. Klaar — vanaf nu kun je in `app.html` de EmailJS-aanroepen vervangen door een aanroep naar
   de `sendMail`-cloud function (voorbeeldcode staat als commentaar bovenin `functions/index.js`).
   *Dit is bewust niet automatisch al aangesloten — zo blijft EmailJS altijd als werkende
   fallback bestaan totdat jij bevestigt dat de Cloud Function goed werkt.*

### Stap 6 — Testen (aanrader, ~5 minuten)
- [ ] Log in als beheerder → plaats een aankondiging → verschijnt hij op de homepage?
- [ ] Wachtwoord resetten via Beheer → Medewerkers → "Reset ww" → komt de mail aan en werkt de link?
- [ ] Chat: verstuur een foto (of sleep er één in) → tag iemand met @naam → krijgt die persoon ALLEEN een pushmelding (geen mail)?
- [ ] Pin een bericht → scroll door de chat → blijft de pin-balk bovenaan zichtbaar?
- [ ] Rooster openen als beheerder → staat "Alles" standaard actief?
- [ ] Nieuwe medewerker uitnodigen met rol "Developer" → krijgt die persoon na registreren echt de dev-rol?
- [ ] Profiel → Meldingen-bel rechtsboven → opent dit een volledige pagina met Systeem + Berichten?
- [ ] Dienst bewerken → notitie + foto toevoegen → ziet de medewerker dit in zijn rooster + krijgt hij een melding?

Loopt iets nog niet goed? Meld het gewoon terug met wat je precies ziet — dan duik ik er weer in.

---

## Wat ga je instellen?

Je hebt straks:
- Een gratis Firebase database (opslag van roosters, medewerkers, etc.)
- Een gratis EmailJS account (voor e-mailmeldingen)
- De app live op GitHub Pages (gratis hosting)
- Een ingebouwde ADMIN account

---

## STAP 1 — Firebase instellen (de database)

### 1.1 Account aanmaken

1. Ga naar **https://firebase.google.com**
2. Klik rechtsboven op **"Get started"** of **"Ga aan de slag"**
3. Log in met een Google-account (maak een aan als je die niet hebt)

### 1.2 Project aanmaken

1. Klik op **"Add project"** (of **"Project toevoegen"**)
2. Naam: typ **`mhvwork`** (of wat je wil)
3. Google Analytics: **uitschakelen** (niet nodig) → klik op **"Create project"**
4. Wacht ~30 seconden totdat het klaar is → klik **"Continue"**

### 1.3 Web app toevoegen

1. Je ziet nu het Firebase dashboard
2. Klik op het **`</>`** icoontje (Web app toevoegen)
3. App nickname: **`mhvwork-web`**
4. Vink **"Also set up Firebase Hosting"** **NIET** aan (we gebruiken GitHub Pages)
5. Klik **"Register app"**
6. Je ziet nu een stuk code met `firebaseConfig`. **Laat dit scherm open staan** — je hebt deze gegevens zo nodig!

Het ziet er zo uit:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "mhvwork-abc.firebaseapp.com",
  projectId: "mhvwork-abc",
  storageBucket: "mhvwork-abc.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123"
};
```
Klik **"Continue to console"**

### 1.4 Authentication instellen

1. Klik in het linkermenu op **"Authentication"**
2. Klik op **"Get started"**
3. Klik op **"Email/Password"**
4. Zet de **eerste toggle** aan (Email/Password)
5. Klik **"Save"**

### 1.5 Firestore Database instellen

1. Klik in het linkermenu op **"Firestore Database"**
2. Klik op **"Create database"**
3. Kies **"Start in production mode"** → klik **"Next"**
4. Kies als locatie: **`eur3 (europe-west)`** → klik **"Enable"**
5. Wacht totdat de database aangemaakt is

### 1.6 Security rules instellen

1. In Firestore, klik bovenaan op het tabblad **"Rules"**
2. Verwijder alles wat er staat
3. Kopieer de inhoud van het bestand **`firestore.rules`** uit de app-map
4. Plak dat in het tekstveld
5. Klik **"Publish"**

### 1.7 ADMIN account aanmaken (automatisch via setup pagina)

Dit gaat heel makkelijk via de meegeleverde setup pagina:

1. Upload eerst alle bestanden naar GitHub Pages (zie Stap 4)
2. Open dan: `https://jouwgebruikersnaam.github.io/mhvwork/seed-admin.html`
3. Vul in:
   - **E-mailadres**: bijv. `admin@mhv.nl`
   - **Wachtwoord**: bijv. `MHV1953` (of iets wat jij kiest)
   - **Naam**: `ADMIN`
4. Klik **"ADMIN account aanmaken"**
5. Je ziet een groene bevestiging ✓

> ⚠️ **Belangrijk:** Na het aanmaken, verwijder `seed-admin.html` uit je GitHub repository! Ga naar je repository → klik op het bestand → klik op het prullenbak-icoontje → "Commit changes".

---

## STAP 2 — EmailJS instellen (e-mails)

### 2.1 Account aanmaken

1. Ga naar **https://www.emailjs.com**
2. Klik op **"Sign Up Free"**
3. Maak een account aan (gratis, 200 emails/maand)

### 2.2 Email service koppelen

1. Ga naar **"Email Services"** in het dashboard
2. Klik **"Add New Service"**
3. Kies **"Gmail"** (of je eigen e-mailprovider)
4. Klik **"Connect Account"** en log in met het e-mailadres waarmee je wil versturen
5. Service Name: `mhvwork-mail`
6. Klik **"Create Service"**
7. **Kopieer de Service ID** (bijv. `service_abc123`)

### 2.3 Templates aanmaken

Je hebt 3 templates nodig:

#### Template 1: Uitnodiging (`template_invite`)

1. Ga naar **"Email Templates"** → **"Create New Template"**
2. Template Name: `Uitnodiging`
3. Subject: `Je bent uitgenodigd voor MHVwork — {{club_name}}`
4. Inhoud:

```
Hoi {{to_name}},

Je bent uitgenodigd om MHVwork te gebruiken voor {{club_name}}.

Klik op de onderstaande link om je account aan te maken:
{{invite_link}}

Deze link is eenmalig geldig.

Groeten,
Het MHV team
```

5. To Email: `{{to_email}}`
6. Klik **"Save"** — kopieer de **Template ID** (bijv. `template_abc123`)

#### Template 2: Melding (`template_notif`)

1. Nieuwe template → Name: `Melding`
2. Subject: `MHVwork: {{title}}`
3. Inhoud:

```
Hoi {{to_name}},

{{body}}

Groeten,
MHVwork — MHV
```

4. To Email: `{{to_email}}`
5. Klik **"Save"** — kopieer de **Template ID**

#### Template 3: Uitbetaling (`template_payment`)

1. Nieuwe template → Name: `Uitbetaling`
2. Subject: `MHVwork: Uitbetaling ontvangen — {{month}}`
3. Inhoud:

```
Hoi {{to_name}},

Goed nieuws! Je uitbetaling voor {{month}} is verwerkt.

Bedrag: {{amount}}

Groeten,
MHV
```

4. To Email: `{{to_email}}`
5. Klik **"Save"** — kopieer de **Template ID**

### 2.4 Public Key ophalen

1. Ga in EmailJS naar **"Account"** → **"General"**
2. Kopieer de **Public Key** (bijv. `user_abc123xyz`)

---

## STAP 3 — App configureren

Nu ga je de gegevens van Firebase en EmailJS invullen in de app-bestanden.

### Bestanden aanpassen

Open elk van deze 3 bestanden in een teksteditor (Kladblok, Notepad++, VS Code):
- `index.html`
- `app.html`
- `register.html`

Zoek in elk bestand naar het stuk dat er zo uitziet:

```javascript
const firebaseConfig = {
  apiKey: "JOUW_API_KEY",
  authDomain: "JOUW_PROJECT.firebaseapp.com",
  projectId: "JOUW_PROJECT_ID",
  ...
};
const EMAILJS_PUBLIC_KEY = "JOUW_EMAILJS_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "JOUW_SERVICE_ID";
const EMAILJS_TPL_INVITE  = "template_invite";
const EMAILJS_TPL_NOTIF   = "template_notif";
const EMAILJS_TPL_PAYMENT = "template_payment";
```

Vervang de waarden:

| Placeholder | Vervangen door |
|-------------|---------------|
| `JOUW_API_KEY` | apiKey uit Firebase |
| `JOUW_PROJECT.firebaseapp.com` | authDomain uit Firebase |
| `JOUW_PROJECT_ID` | projectId uit Firebase |
| `JOUW_PROJECT.appspot.com` | storageBucket uit Firebase |
| `JOUW_SENDER_ID` | messagingSenderId uit Firebase |
| `JOUW_APP_ID` | appId uit Firebase |
| `JOUW_EMAILJS_PUBLIC_KEY` | Public Key uit EmailJS |
| `JOUW_SERVICE_ID` | Service ID uit EmailJS |
| `template_invite` | Template ID van uitnodiging |
| `template_notif` | Template ID van melding |
| `template_payment` | Template ID van uitbetaling |

**Let op:** doe dit in ALLE 3 de bestanden!

---

## STAP 4 — App online zetten (GitHub Pages)

### 4.1 GitHub account

1. Ga naar **https://github.com** en log in (of maak een account aan)

### 4.2 Repository aanmaken

1. Klik rechtsboven op **"+"** → **"New repository"**
2. Repository name: `mhvwork`
3. Zet op **"Public"** (vereist voor gratis GitHub Pages)
4. Klik **"Create repository"**

### 4.3 Bestanden uploaden

1. In je nieuwe repository, klik op **"uploading an existing file"**
2. Sleep of selecteer de volgende bestanden:
   - `index.html`
   - `app.html`
   - `register.html`
   - `manifest.json`
   - `firestore.rules` (niet vereist voor de app, maar handig voor later)
3. Scroll naar beneden, klik **"Commit changes"**

### 4.4 GitHub Pages aanzetten

1. Ga naar het tabblad **"Settings"** van je repository
2. Klik in het linkermenu op **"Pages"**
3. Onder "Branch": kies **"main"** → map: **"/ (root)"**
4. Klik **"Save"**
5. Wacht 1-2 minuten
6. Je URL verschijnt bovenaan: bijv. `https://jouwgebruikersnaam.github.io/mhvwork`

### 4.5 Firebase authorized domain toevoegen

1. Ga terug naar Firebase → **Authentication** → **Settings**
2. Klik op **"Authorized domains"**
3. Klik **"Add domain"**
4. Voer je GitHub Pages URL in: `jouwgebruikersnaam.github.io`
5. Klik **"Add"**

---

## STAP 5 — Eerste keer inloggen en testen

1. Open je GitHub Pages URL
2. Log in met:
   - Email: `admin@mhv.nl` (of wat je in stap 1.7 ingesteld hebt)
   - Wachtwoord: `MHV1953`
3. Je bent nu ingelogd als ADMIN
4. Ga naar **Beheer** → **Medewerkers** → **+ Medewerker uitnodigen**
5. Voer naam, e-mail en uurtarief in van je eerste medewerker
6. Kopieer de uitnodigingslink en stuur die naar de medewerker

---

## STAP 6 — Medewerkers uitnodigen (werkwijze)

Elke keer dat je een nieuwe medewerker wil toevoegen:

1. Log in als ADMIN
2. Ga naar **Beheer** → **Medewerkers** → **+ Medewerker uitnodigen**
3. Vul naam, e-mail en uurtarief in
4. Klik **"Uitnodigingslink genereren"**
5. Klik **"Kopieer link"** of **"Verstuur email"**
6. Stuur de link naar de medewerker (WhatsApp, e-mail, etc.)
7. De medewerker opent de link en kiest zelf een wachtwoord
8. Na registratie kan de medewerker direct inloggen op de app

---

## STAP 7 — App op telefoon installeren (optioneel)

De app werkt als Progressive Web App (PWA) — je kunt hem als een echte app installeren:

**iPhone (Safari):**
1. Open de app URL in Safari
2. Tik op het deel-icoontje onderaan
3. Tik op **"Zet op beginscherm"**

**Android (Chrome):**
1. Open de app URL in Chrome
2. Tik op de drie puntjes rechtsbovenin
3. Tik op **"Toevoegen aan startscherm"**

---

## Samenvatting — wat kost dit?

| Service | Gratis limiet | Verwacht gebruik |
|---------|---------------|-----------------|
| Firebase Firestore | 1 GB opslag, 50.000 lees/dag | < 1 MB, < 500 lees/dag ✅ |
| Firebase Auth | Onbeperkt | 10 gebruikers ✅ |
| EmailJS | 200 emails/maand | < 50/maand ✅ |
| GitHub Pages | Onbeperkt | — ✅ |

**Conclusie: Dit blijft altijd gratis voor jullie gebruik.**

---

## Problemen oplossen

**"Permission denied" fout:**
→ Controleer of je de security rules goed hebt gekopieerd (Stap 1.6)

**Inloggen werkt niet:**
→ Controleer of je het juiste e-mailadres en wachtwoord gebruikt
→ Controleer of Authentication is ingeschakeld in Firebase

**Emails komen niet aan:**
→ Controleer of je EmailJS service ID en template IDs correct zijn ingevuld
→ Controleer de EmailJS dashboard op fouten

**Uitnodigingslink werkt niet:**
→ Controleer of de GitHub Pages URL is toegevoegd als authorized domain in Firebase

**App laadt niet:**
→ Controleer de browser console (F12 → Console) op foutmeldingen
→ Controleer of alle Firebase config waarden correct zijn ingevuld

---

*MHVwork v1.0 — Gebouwd voor MHV 1931*
