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

    "/css/variables.css",
    "/css/layout.css",
    "/css/buttons.css",
    "/css/cards.css",
    "/css/quiz.css",
    "/css/timeline.css",
    "/css/modal.css",
    "/css/progress.css",
    "/css/responsive.css",

    "/js/app.js",
    "/js/config.js",
    "/js/router.js",
    "/js/constants.js",
    "/js/storage.js",
    "/js/utils.js",
    "/js/event-bus.js",
    "/js/audio.js",
    "/js/loading.js",
    "/js/preload.js",
    "/js/cache.js",
    "/js/xp-manager.js",
    "/js/quiz-engine.js",
    "/js/boss-engine.js",
    "/js/achievements.js",
    "/js/analytics.js",

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