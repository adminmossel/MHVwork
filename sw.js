// MHVwork Service Worker v4
// Bewust minimaal — geen caching van HTML, alleen push notificaties

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
    .then(() => clients.claim())
));

// GEEN fetch handler — browser haalt alles rechtstreeks van netwerk
// Dit voorkomt dat oude versies gecached blijven

self.addEventListener('push', e => {
  let data = { title: 'MHVwork', body: 'Nieuw bericht.' };
  try { data = e.data.json(); } catch(err) {}
  e.waitUntil(self.registration.showNotification(data.title || 'MHVwork', {
    body: data.body || '',
    icon: '/MHVwork/icon.svg',
    data: { url: '/MHVwork/app.html' }
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type:'window' }).then(list => {
    for (const c of list) if (c.url.includes('MHVwork') && 'focus' in c) return c.focus();
    return clients.openWindow('/MHVwork/app.html');
  }));
});
