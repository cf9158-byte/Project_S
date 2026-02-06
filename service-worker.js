const CACHE_NAME='seryeok-dashboard-v1';
const urlsToCache=[
    './index.html','./app.js','./settings.js','./style.css','./manifest.json',
    './icon-192.png','./icon-512.png','./data.json'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(urlsToCache)))});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(key=>{if(key!==CACHE_NAME)return caches.delete(key);}))))});