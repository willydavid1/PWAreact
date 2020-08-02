/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */

// Precarga la app
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerNavigationRoute('/index.html')

// Para que google googleAnalytics funcione online
workbox.googleAnalytics.initialize()

// La API usa la estategia Stale While Revalidate para mayor velocidad
workbox.routing.registerRoute(/^https?:\/\/www.themealdb.com\/api\/.*/, 
    workbox.strategies.staleWhileRevalidate(),
    'GET')

// La fuente usa la estategia cacheFirst
workbox.routing.registerRoute(/^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-cacheNAME',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 24 * 60 * 60
            })
        ]
    }),
    'GET')

// aplicamos el Network First, para cualquier ruta que empieze con http o https, va aplicar una estrategia networkFirst, (cachea peticiones GET) | va a tratar a ir a red si no hay conexion retorna lo que hay en cache | las dos de abajo es la manera mas nueva segun la DOC
workbox.routing.registerRoute(/^https?.*/,
    workbox.strategies.networkFirst(), 'GET')
// workbox.routing.setDefaultHandler(
//     new workbox.strategies.NetworkFirst(),
//   );
// workbox.routing.registerRoute(
//     /^https?.*/,
//     new workbox.strategies.NetworkFirst()
//   );