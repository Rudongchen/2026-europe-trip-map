const CACHE = "trip-map-f6085574c4ae";
const RUNTIME = "trip-map-runtime-f6085574c4ae";
const APP_SHELL = ["./", "./index.html", "./manifest.webmanifest"];
const MAX_RUNTIME_ENTRIES = 900;

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith("trip-map-") && key !== CACHE && key !== RUNTIME).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

async function trimRuntimeCache(cache) {
  const keys = await cache.keys();
  if (keys.length <= MAX_RUNTIME_ENTRIES) return;
  await Promise.all(keys.slice(0, keys.length - MAX_RUNTIME_ENTRIES).map((key) => cache.delete(key)));
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (request.method === "GET" && response && (response.ok || response.type === "opaque" || response.type === "cors")) {
    const cache = await caches.open(RUNTIME);
    cache.put(request, response.clone());
    trimRuntimeCache(cache);
  }
  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    return (await caches.match(request)) || (await caches.match("./index.html"));
  }
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin === location.origin) {
    event.respondWith(networkFirst(request));
    return;
  }
  const cacheableHosts = [
    "unpkg.com",
    "a.basemaps.cartocdn.com",
    "b.basemaps.cartocdn.com",
    "c.basemaps.cartocdn.com",
    "d.basemaps.cartocdn.com",
    "tile.openstreetmap.org",
    "server.arcgisonline.com",
    "router.project-osrm.org",
    "en.wikipedia.org",
    "commons.wikimedia.org"
  ];
  if (cacheableHosts.some((host) => url.hostname === host || url.hostname.endsWith("." + host))) {
    event.respondWith(cacheFirst(request));
  }
});
