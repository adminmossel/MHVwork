// MHVwork Service Worker — Push Notifications
const CACHE = 'mhvwork-v3';
const CACHE_URLS = []; // Geen pre-cache — altijd netwerk

self.addEventListener('install', e => {
  self.skipWaiting(); // Activeer meteen
});

self.addEventListener('activate', e => {
  // Verwijder ALLE oude caches
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => clients.claim())
  );
});

// Netwerk-first strategie — NOOIT van cache serveren voor HTML
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // HTML altijd vers ophalen van netwerk
  if (e.request.destination === 'document' || url.pathname.endsWith('.html')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }
  // Overige requests: netwerk, dan cache
  e.respondWith(
    fetch(e.request)
      .then(res => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

// Push event
self.addEventListener('push', e => {
  let data = { title: 'MHVwork', body: 'Je hebt een nieuw bericht.' };
  try { data = e.data.json(); } catch(err) {}
  e.waitUntil(
    self.registration.showNotification(data.title || 'MHVwork', {
      body: data.body || '',
      icon: '/MHVwork/icon.svg',
      badge: '/MHVwork/icon.svg',
      vibrate: [200, 100, 200],
      data: { url: data.url || '/MHVwork/app.html' }
    })
  );
});

// Klik op notificatie
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || '/MHVwork/app.html';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const c of list) {
        if (c.url.includes('MHVwork') && 'focus' in c) return c.focus();
      }
      return clients.openWindow(url);
    })
  );
});
