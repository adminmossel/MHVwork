<div align="center">

# 🍺 MHVwork

### Modern workforce & shift management for MHV 1931

**Plan. Work. Communicate. Manage. — all from one platform.**

<br>

[🇳🇱 Nederlands](./README.md) · 🇬🇧 **English**

<br><br>

[![Version](https://img.shields.io/github/package-json/v/adminmossel/MHVwork?style=for-the-badge)](https://github.com/adminmossel/MHVwork)
[![License](https://img.shields.io/github/license/adminmossel/MHVwork?style=for-the-badge)](https://github.com/adminmossel/MHVwork)
[![Issues](https://img.shields.io/github/issues/adminmossel/MHVwork?style=for-the-badge)](https://github.com/adminmossel/MHVwork/issues)
[![Stars](https://img.shields.io/github/stars/adminmossel/MHVwork?style=for-the-badge)](https://github.com/adminmossel/MHVwork/stargazers)

<br>

[🌐 Live application](https://adminmossel.github.io/MHVwork/) ·
[📖 Documentation](./HANDLEIDING.md) ·
[📝 Changelog](./CHANGELOG.md) ·
[🐛 Issues](https://github.com/adminmossel/MHVwork/issues)

</div>

---

## 📖 About MHVwork

**MHVwork** is a modern Progressive Web App for organizing volunteer bar staff at **MHV 1931**.

The application brings scheduling, staff management, shift exchanges, communication, notifications and payments together in one central platform.

The goal is simple:

> **Less administration. Less scattered communication. More control.**

MHVwork is designed around the day-to-day needs of a club: fast, clear and accessible from phones, tablets and desktops.

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 📅 Schedule Management

- Create and schedule shifts
- Assign staff members
- Manage availability
- Day, week and month views
- Shift confirmations
- Custom working hours
- `.ics` calendar export

</td>
<td width="50%">

### 🔄 Shift Exchanges

- Make shifts available
- Show interest in a shift
- Request a takeover
- Administrator approval
- Automatic schedule updates
- Notifications for involved users

</td>
</tr>

<tr>
<td>

### 💬 Communication

- Central group chat
- `@employee` mentions
- `@everyone` notifications
- `@dev` communication
- Image sharing
- Automatic image compression
- Message management

</td>
<td>

### 💶 Payments

- Track working hours
- Expected earnings
- Approved amounts
- Record payments
- Personal financial overview
- Monthly summaries

</td>
</tr>

<tr>
<td>

### 🔔 Notifications

- In-app notifications
- Notification badges
- Browser notifications
- Push notifications
- E-mail notifications
- Shift exchange notifications

</td>
<td>

### 📱 Progressive Web App

- Installable on mobile
- Installable on desktop
- Service Worker
- Offline caching
- Web App Manifest
- Native-like experience

</td>
</tr>
</table>

---

## 👥 Roles & Permissions

MHVwork uses multiple roles to separate functionality and access.

| Role | Description |
|---|---|
| 👤 **Employee** | Personal schedule, availability, shifts, chat and financial information |
| 🛠️ **Administrator** | Full management of staff, schedules, shifts, payments and communication |
| 💻 **Developer** | Technical functionality and development-related communication |

Access is controlled through **Firebase Authentication** and **Firestore Security Rules**.

---

## 🧭 Quick Navigation

<details>
<summary><strong>📚 Documentation</strong></summary>

- [Installation](#-installation)
- [Configuration](#-configuration)
- [Architecture](#️-architecture)
- [Security](#-security)
- [PWA](#-progressive-web-app)
- [Roadmap](#️-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

</details>

---

## 📱 Progressive Web App

MHVwork is built as a **Progressive Web App (PWA)**.

Users can install the application without downloading a separate mobile application from an app store.

<details>
<summary><strong>🍎 iPhone / iPad</strong></summary>

1. Open MHVwork in Safari.
2. Tap **Share**.
3. Select **Add to Home Screen**.
4. Open MHVwork from your home screen.

</details>

<details>
<summary><strong>🤖 Android</strong></summary>

1. Open MHVwork in Chrome.
2. Open the browser menu.
3. Select **Install app** or **Add to Home screen**.
4. Open the installed application.

</details>

<details>
<summary><strong>💻 Desktop</strong></summary>

Use Chrome or Edge and select the installation icon in the address bar when available.

</details>

---

## 🏗️ Architecture

```text
                           ┌─────────────────────┐
                           │      MHVwork PWA    │
                           │   HTML / CSS / JS   │
                           └──────────┬──────────┘
                                      │
                ┌─────────────────────┼─────────────────────┐
                │                     │                     │
                ▼                     ▼                     ▼
        ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
        │    Firebase  │      │   EmailJS    │      │    Browser   │
        │     Auth     │      │    Email     │      │ Notifications│
        └──────┬───────┘      └──────────────┘      └──────────────┘
               │
               ▼
        ┌──────────────┐
        │   Firestore  │
        │   Database   │
        └──────────────┘
```

### Technology

| Component | Technology |
|---|---|
| Frontend | HTML5 / CSS3 / JavaScript |
| Application model | Progressive Web App |
| Database | Firebase Firestore |
| Authentication | Firebase Authentication |
| E-mail | EmailJS |
| Notifications | Web Notification API |
| Offline support | Service Worker |
| Hosting | GitHub Pages |
| Calendar | `.ics` |

---

## 🔐 Security

Security is a core part of MHVwork.

### Authentication

Users authenticate through Firebase Authentication.

### Authorization

Firestore Security Rules determine which data users can read and modify.

### Roles

Application functionality is restricted according to the user's role.

### Secrets

Sensitive information such as:

- passwords;
- private keys;
- API secrets;
- service credentials;

must **never** be committed directly to the repository.

> ⚠️ Always review the current `firestore.rules` before deploying a production environment.

---

## 📂 Project Structure

<details>
<summary><strong>View project structure</strong></summary>

```text
MHVwork/
│
├── 📄 index.html
├── 📄 app.html
├── 📄 index.js
│
├── 🔐 firestore.rules
│
├── 📱 manifest.json
├── ⚙️ sw.js
│
├── 👤 register.html
├── 🔑 reset-pw.html
├── 🛠️ seed-admin.html
│
├── 📖 HANDLEIDING.md
├── 📝 CHANGELOG.md
├── 📜 LICENSE
│
├── 🎨 promo.html
├── 📄 voorwaarden.html
│
└── 🖼️ assets
```

</details>

---

## ⚙️ Installation

### Requirements

- A modern web browser
- A Firebase project
- Firebase Authentication
- Firebase Firestore
- An EmailJS account if e-mail notifications are required

### Clone the repository

```bash
git clone https://github.com/adminmossel/MHVwork.git
cd MHVwork
```

### Local server

For example, start a simple local server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

> See [`HANDLEIDING.md`](./HANDLEIDING.md) for complete installation and configuration instructions.

---

## 🔧 Configuration

MHVwork uses external services for several application features.

### Firebase

Configure:

- Authentication
- Firestore
- Security Rules

### EmailJS

Configure EmailJS when e-mail notifications are enabled.

### Production

For production deployments, it is recommended to:

- review security rules;
- keep secrets outside the repository;
- verify user roles;
- monitor Firebase usage;
- test notifications;
- test PWA installation.

---

## 📊 Project Status

| Component | Status |
|---|---|
| 🔐 Authentication | ✅ Available |
| 📅 Schedule management | ✅ Available |
| 🔄 Shift exchanges | ✅ Available |
| 💬 Group chat | ✅ Available |
| 💶 Payments | ✅ Available |
| 🔔 Notifications | ✅ Available |
| 📱 PWA | ✅ Available |
| 📆 Calendar export | ✅ Available |
| 🛠️ Further development | 🚧 Active |

---

## 🗺️ Roadmap

<details>
<summary><strong>✅ Completed</strong></summary>

- [x] Basic schedule management
- [x] Firebase Authentication
- [x] Firestore integration
- [x] Shift exchanges
- [x] Group chat
- [x] Payment tracking
- [x] Push notifications
- [x] E-mail notifications
- [x] PWA support
- [x] Calendar export

</details>

<details>
<summary><strong>🚧 In Development</strong></summary>

- [ ] Performance improvements
- [ ] Improved mobile UX
- [ ] Extended reporting
- [ ] Improved notification settings

</details>

<details>
<summary><strong>💡 Future</strong></summary>

- [ ] Automated schedule generation
- [ ] Advanced statistics
- [ ] Audit logs
- [ ] More administrative automation
- [ ] Extended analytics

</details>

---

## 📝 Changelog

All significant changes are documented in:

**[`CHANGELOG.md`](./CHANGELOG.md)**

The current application version is displayed through the version badge at the top of this README.

---

## 🤝 Contributing

Contributions are welcome when the project is open for them.

### Workflow

```text
Fork
  │
  ▼
Branch
  │
  ▼
Development
  │
  ▼
Testing
  │
  ▼
Pull Request
  │
  ▼
Review
  │
  ▼
Merge
```

### Pull Requests

A good Pull Request should include:

- a clear description;
- the reason for the change;
- relevant screenshots where appropriate;
- testing information;
- no secrets;
- only relevant changes.

For larger changes, opening an issue first is recommended.

---

## 🐛 Bugs & Feature Requests

Found a problem?

[Open an issue](https://github.com/adminmossel/MHVwork/issues/new)

Please include:

- browser;
- device;
- application version;
- reproduction steps;
- expected behavior;
- actual behavior;
- screenshots where relevant.

---

## 📜 License

### ⚠️ Licensing Policy

The license of MHVwork must always match the actual `LICENSE` file in the repository.

**Only use the MIT section below if the repository is actually released under the MIT License.**

### MIT License

Copyright © MHVwork / MHV 1931

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files, to deal in the Software without restriction, subject to the conditions of the MIT License.

The complete legal text is available in:

**[`LICENSE`](./LICENSE)**

> If MHVwork is not intended for unrestricted reuse, replace this section with the actual proprietary/non-commercial license chosen for the project.

---

## 🌐 Language

| Language | Document |
|---|---|
| 🇳🇱 Nederlands | [README.md](./README.md) |
| 🇬🇧 English | **Current page** |

---

## 📞 Contact

**MHVwork**

For technical questions, bugs or support:

📧 **h.mhvwork@gmail.com**

---

<div align="center">

### 🍺 MHVwork

**One roster. One team. One place.**

Built for **MHV 1931**.

<br>

[🌐 Live App](https://adminmossel.github.io/MHVwork/) ·
[💻 GitHub](https://github.com/adminmossel/MHVwork)

<br><br>

<sub>© MHVwork — MHV 1931</sub>

</div>
