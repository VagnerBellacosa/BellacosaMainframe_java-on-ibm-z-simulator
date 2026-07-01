/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z Simulator
 service-worker.js
=========================================================*/

const CACHE_VERSION = "v1.0.0";

const CACHE_NAME = `bellacosa-java-${CACHE_VERSION}`;

/*=========================================================
 ARQUIVOS ESSENCIAIS
=========================================================*/

const APP_SHELL = [

    "/",

    "/index.html",

    "/css/core/variables.css",
    "/css/core/layout.css",
    "/css/components/buttons.css",
    "/css/components/cards.css",
	"/css/components/components.css",
    "/css/screens/quiz.css",
    "/css/screens/timeline.css",
    "/css/components/modal.css",
    "/css/components/progress.css",
    "/css/core/responsive.css",

    "/js/core/app.js",
    "/js/core/config.js",
    "/js/core/router.js",
    "/js/core/constants.js",
    "/js/core/storage.js",
    "/js/core/utils.js",
    "/js/core/event-bus.js",
    "/js/audio.js",
    "/js/loading.js",
    "/js/preload.js",
    "/js/core/cache.js",
    "/js/engines/xp-manager.js",
    "/js/engines/quiz-engine.js",
    "/js/engines/boss-engine.js",
    "/js/engines/achievements.js",
    "/js/core/analytics.js",

    "/data/quiz.json",
    "/data/timeline.json",
    "/data/cards.json",
    "/data/glossary.json",
    "/data/architecture.json",
    "/data/achievements.json",

    "/images/logo.png",
    "/images/java.png",
    "/images/cobol.png",
    "/images/zos.png",
    "/images/cics.png",
    "/images/db2.png",
    "/images/ims.png",
    "/images/mq.png",
    "/images/jcl.png",
    "/images/vsam.png",
    "/images/api.png",
    "/images/terminal.png",
    "/images/boss.png",
    "/images/trophy.png",
    "/images/certificate.png",
    "/images/avatar1.png",
    "/images/avatar2.png",
    "/images/avatar3.png",
    "/images/hero-bg.png",
    "/images/timeline-bg.png",

    "/favicon.ico",

    "/seo/manifest.webmanifest"

];

/*=========================================================
 INSTALL
=========================================================*/

self.addEventListener(

    "install",

    event => {

        event.waitUntil(

            caches.open(

                CACHE_NAME

            )

            .then(

                cache =>

                cache.addAll(

                    APP_SHELL

                )

            )

        );

        self.skipWaiting();

    }

);

/*=========================================================
 ACTIVATE
=========================================================*/

self.addEventListener(

    "activate",

    event => {

        event.waitUntil(

            caches.keys()

            .then(keys =>

                Promise.all(

                    keys

                    .filter(

                        key =>

                        key !== CACHE_NAME

                    )

                    .map(

                        key =>

                        caches.delete(key)

                    )

                )

            )

        );

        self.clients.claim();

    }

);

/*=========================================================
 FETCH
=========================================================*/

self.addEventListener(

    "fetch",

    event => {

        if (

            event.request.method !== "GET"

        ) return;

        event.respondWith(

            caches.match(

                event.request

            )

            .then(cached => {

                if (

                    cached

                ) {

                    return cached;

                }

                return fetch(

                    event.request

                )

                .then(response => {

                    if (

                        !response ||

                        response.status !== 200

                    ) {

                        return response;

                    }

                    const copy =

                        response.clone();

                    caches.open(

                        CACHE_NAME

                    )

                    .then(cache => {

                        cache.put(

                            event.request,

                            copy

                        );

                    });

                    return response;

                });

            })

            .catch(() => {

                return caches.match(

                    "/index.html"

                );

            })

        );

    }

);

/*=========================================================
 MESSAGE
=========================================================*/

self.addEventListener(

    "message",

    event => {

        switch (

            event.data

        ) {

            case "skipWaiting":

                self.skipWaiting();

                break;

            case "clearCache":

                caches.delete(

                    CACHE_NAME

                );

                break;

        }

    }

);

/*=========================================================
 SYNC
=========================================================*/

self.addEventListener(

    "sync",

    event => {

        console.log(

            "Background Sync:",

            event.tag

        );

    }

);

/*=========================================================
 PUSH
=========================================================*/

self.addEventListener(

    "push",

    event => {

        if (

            !event.data

        ) return;

        const data =

            event.data.json();

        event.waitUntil(

            self.registration.showNotification(

                data.title,

                {

                    body:

                        data.body,

                    icon:

                        "/images/icon-192.png",

                    badge:

                        "/images/icon-192.png"

                }

            )

        );

    }

);

/*=========================================================
 NOTIFICATION CLICK
=========================================================*/

self.addEventListener(

    "notificationclick",

    event => {

        event.notification.close();

        event.waitUntil(

            clients.openWindow("/")

        );

    }

);