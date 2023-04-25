// https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
// ------------------------------
// Pre Cache and Update
// ------------------------------
importScripts('./workbox-sw.prod.v1.0.1.js');

const workboxSW = new WorkboxSW({ clientsClaim: true });
/**
 * precache() is passed a manifest of URLs and versions
 * each time the service worker starts up.
 * Use workbox-build to generate the manifest
 */

// set names for both precache & runtime cache
workbox.core.setCacheNameDetails({
    prefix: 'my-blog',
    suffix: 'v1.0',
    precache: 'precache',
    runtime: 'runtime-cache'
});

// let Service Worker take control of pages ASAP
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// let Workbox handle our precache list
workbox.precaching.precacheAndRoute(self.__precacheManifest);

// use `NetworkFirst` strategy for html
workbox.routing.registerRoute(
    /\.html$/,
    new workbox.strategies.NetworkFirst()
);

// use `NetworkFirst` strategy for css and js
workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.NetworkFirst()
);

// use `CacheFirst` strategy for images
workbox.routing.registerRoute(
    /assets\/(img|icons)/,
    new workbox.strategies.CacheFirst()
);

// use `StaleWhileRevalidate` third party files
workbox.routing.registerRoute(
    /^https?:\/\/cdn.staticfile.org/,
    new workbox.strategies.StaleWhileRevalidate()
);
