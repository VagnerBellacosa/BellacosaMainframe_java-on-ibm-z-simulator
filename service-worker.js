/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z Simulator
 service-worker.js
=========================================================*/

"use strict";

/*=========================================================
 VERSION
=========================================================*/

const VERSION = "2026.07.01";

/*=========================================================
 CACHE NAMES
=========================================================*/

const STATIC_CACHE = `bellacosa-static-${VERSION}`;
const DATA_CACHE = `bellacosa-data-${VERSION}`;
const IMAGE_CACHE = `bellacosa-images-${VERSION}`;

const VALID_CACHES = [
    STATIC_CACHE,
    DATA_CACHE,
    IMAGE_CACHE
];

/*=========================================================
 APP SHELL
=========================================================*/

const APP_SHELL = [

    "/",
    "/index.html",
    "/offline.html",

    "/manifest.webmanifest",

    /* CSS */

    "/css/core/reset.css",
    "/css/core/variables.css",
    "/css/core/theme.css",
    "/css/core/layout.css",
    "/css/core/responsive.css",

    "/css/components/buttons.css",
    "/css/components/cards.css",
    "/css/components/modal.css",
    "/css/components/progress.css",

    /* CORE */

    "/js/core/app.js",
    "/js/core/bootstrap.js",
    "/js/core/router.js",
    "/js/core/config.js",
    "/js/core/constants.js",
    "/js/core/storage.js",
    "/js/core/cache.js",
    "/js/core/logger.js",
    "/js/core/utils.js",
    "/js/core/event-bus.js",
    "/js/core/analytics.js",

    /* UI */

    "/js/ui/loading.js",
    "/js/ui/preload.js",
    "/js/ui/sounds.js",
    "/js/ui/progress.js",
    "/js/ui/typing.js",

    /* ENGINES */

    "/js/engines/quiz-engine.js",
    "/js/engines/boss-engine.js",
    "/js/engines/xp-manager.js",
    "/js/engines/achievement-engine.js",

    /* DATA */

    "/data/quiz.json",
    "/data/cards.json",
    "/data/glossary.json",
    "/data/architecture.json",
    "/data/achievements.json",

    /* ICONS */

    "Assets/icons/favicon.ico"
];

/*=========================================================
 INSTALL
=========================================================*/

self.addEventListener("install", event => {

    event.waitUntil(

        (async () => {

            const cache = await caches.open(STATIC_CACHE);

            await Promise.allSettled(

                APP_SHELL.map(async file => {

                    try {

                        await cache.add(file);

                    }

                    catch (error) {

                        console.warn("SW Install:", file);

                    }

                })

            );

            self.skipWaiting();

        })()

    );

});

/*=========================================================
 ACTIVATE
=========================================================*/

self.addEventListener("activate", event => {

    event.waitUntil(

        (async () => {

            const keys = await caches.keys();

            await Promise.all(

                keys

                    .filter(key => !VALID_CACHES.includes(key))

                    .map(key => caches.delete(key))

            );

            if (self.registration.navigationPreload) {

                await self.registration.navigationPreload.enable();

            }

            await self.clients.claim();

        })()

    );

});

/*=========================================================
 NETWORK FIRST
=========================================================*/

async function networkFirst(request) {

    try {

        const response = await fetch(request);

        const cache = await caches.open(DATA_CACHE);

        cache.put(request, response.clone());

        return response;

    }

    catch {

        return caches.match(request, {

            ignoreSearch: true

        }) || caches.match("/offline.html");

    }

}

/*=========================================================
 CACHE FIRST
=========================================================*/

async function cacheFirst(request, cacheName) {

    const cache = await caches.open(cacheName);

    const cached = await cache.match(request);

    if (cached) {

        return cached;

    }

    const response = await fetch(request);

    cache.put(request, response.clone());

    return response;

}

/*=========================================================
 STALE WHILE REVALIDATE
=========================================================*/

async function staleWhileRevalidate(request) {

    const cache = await caches.open(STATIC_CACHE);

    const cached = await cache.match(request);

    const networkFetch = fetch(request)

        .then(response => {

            cache.put(request, response.clone());

            return response;

        })

        .catch(() => cached);

    return cached || networkFetch;

}

/*=========================================================
 FETCH
=========================================================*/

self.addEventListener("fetch", event => {

    const request = event.request;

    if (request.method !== "GET") {

        return;

    }

    const url = new URL(request.url);

    if (

        url.protocol === "chrome-extension:" ||

        url.protocol === "moz-extension:"

    ) {

        return;

    }

    /* HTML */

    if (request.mode === "navigate") {

        event.respondWith(

            networkFirst(request)

        );

        return;

    }

    /* CSS */

    if (url.pathname.endsWith(".css")) {

        event.respondWith(

            cacheFirst(request, STATIC_CACHE)

        );

        return;

    }

    /* JavaScript */

    if (url.pathname.endsWith(".js")) {

        event.respondWith(

            staleWhileRevalidate(request)

        );

        return;

    }

    /* JSON */

    if (url.pathname.endsWith(".json")) {

        event.respondWith(

            networkFirst(request)

        );

        return;

    }

    /* Images */

    if (

        /\.(png|jpg|jpeg|gif|svg|webp|ico)$/i.test(

            url.pathname

        )

    ) {

        event.respondWith(

            cacheFirst(request, IMAGE_CACHE)

        );

        return;

    }

});

/*=========================================================
 MESSAGE
=========================================================*/

self.addEventListener("message", event => {

    switch (event.data) {

        case "skipWaiting":

            self.skipWaiting();

            break;

        case "clearCache":

            event.waitUntil(

                Promise.all(

                    VALID_CACHES.map(

                        cache => caches.delete(cache)

                    )

                )

            );

            break;

    }

});

/*=========================================================
 PUSH
=========================================================*/

self.addEventListener("push", event => {

    if (!event.data) {

        return;

    }

    let payload = {

        title: "Bellacosa Mainframe",

        body: "Nova atualização disponível."

    };

    try {

        payload = event.data.json();

    }

    catch {

        payload.body = event.data.text();

    }

    event.waitUntil(

        self.registration.showNotification(

            payload.title,

            {

                body: payload.body,

                icon: "/assets/icons/icon-192.png",

                badge: "/assets/icons/icon-192.png"

            }

        )

    );

});

/*=========================================================
 NOTIFICATION CLICK
=========================================================*/

self.addEventListener("notificationclick", event => {

    event.notification.close();

    event.waitUntil(

        clients.matchAll({

            type: "window",

            includeUncontrolled: true

        })

        .then(clientList => {

            for (const client of clientList) {

                if ("focus" in client) {

                    return client.focus();

                }

            }

            return clients.openWindow("/");

        })

    );

});

