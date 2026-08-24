// MHVwork Service Worker v5
// Bewust minimaal — geen caching van HTML, alleen push notificaties

// Firebase Cloud Messaging (officiële patroon voor achtergrond-pushmeldingen). Als je de
// FCM_VAPID_KEY in app.html nog niet hebt ingevuld, gebeurt hier gewoon niets extra's — de
// rest van de service worker (notificatieklik afhandelen) blijft altijd normaal werken.
try {
  importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
  importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');
  firebase.initializeApp({
    apiKey: "AIzaSyDqwDEf35KoH2850xFHZ6gN9ROwgcx0Kyw",
    authDomain: "mhvwork-2376d.firebaseapp.com",
    projectId: "mhvwork-2376d",
    storageBucket: "mhvwork-2376d.firebasestorage.app",
    messagingSenderId: "292563349134",
    appId: "1:292563349134:web:6897c6e23536baf56ba3df"
  });
  const messaging = firebase.messaging();
  messaging.onBackgroundMessage((payload) => {
    const n = payload.notification || {};
    self.registration.showNotification(n.title || 'MHVwork', {
      body: n.body || '',
      icon: '/MHVwork/icon.svg',
      badge: '/MHVwork/icon.svg',
      vibrate: [200, 100, 200],
      data: { url: '/MHVwork/app.html' }
    });
  });
} catch (e) {
  // Geen probleem — FCM is optioneel, de rest van de app werkt gewoon door
}

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
    .then(() => clients.claim())
));

// GEEN fetch handler — browser haalt alles rechtstreeks van netwerk
// Dit voorkomt dat oude versies gecached blijven

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type:'window' }).then(list => {
    for (const c of list) if (c.url.includes('MHVwork') && 'focus' in c) return c.focus();
    return clients.openWindow('/MHVwork/app.html');
  }));
});
