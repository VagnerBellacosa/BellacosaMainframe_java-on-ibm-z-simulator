/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z Simulator
 preload.js
=========================================================*/

import CONFIG from "./core/config.js";
import Loading from "./loading.js";
import EventBus from "./core/event-bus.js";
import Analytics from "./core/analytics.js";

class Preloader {

    constructor() {

        this.assets = [];

        this.loaded = 0;

        this.total = 0;

    }

    /*=====================================================
      REGISTER
    =====================================================*/

    register(url, type = "image") {

        this.assets.push({

            url,

            type

        });

    }

    /*=====================================================
      DEFAULT ASSETS
    =====================================================*/

    loadDefaults() {

        [

            /* Images */

            "images/logo.png",

            "images/java.png",

            "images/cobol.png",

            "images/zos.png",

            "images/cics.png",

            "images/db2.png",

            "images/ims.png",

            "images/mq.png",

            "images/jcl.png",

            "images/vsam.png",

            "images/api.png",

            "images/terminal.png",

            "images/boss.png",

            "images/trophy.png",

            "images/certificate.png",

            "images/avatar1.png",

            "images/avatar2.png",

            "images/avatar3.png",

            "images/hero-bg.png",

            "images/timeline-bg.png"

        ].forEach(

            image =>

            this.register(

                image,

                "image"

            )

        );

        [

            CONFIG.DATA.QUIZ,

            CONFIG.DATA.TIMELINE,

            CONFIG.DATA.CARDS,

            CONFIG.DATA.GLOSSARY,

            CONFIG.DATA.ARCHITECTURE,

            CONFIG.DATA.ACHIEVEMENTS

        ].forEach(

            json =>

            this.register(

                json,

                "json"

            )

        );

        [

            "audio/click.mp3",

            "audio/success.mp3",

            "audio/error.mp3",

            "audio/victory.mp3",

            "audio/attack.mp3",

            "audio/power.mp3"

        ].forEach(

            audio =>

            this.register(

                audio,

                "audio"

            )

        );

    }

    /*=====================================================
      START
    =====================================================*/

    async start() {

        this.total = this.assets.length;

        this.loaded = 0;

        Loading.show(

            "Carregando recursos..."

        );

        Loading.set(0);

        for (

            const asset of this.assets

        ) {

            await this.load(asset);

        }

        Loading.set(100);

        Loading.hide();

        Analytics.event(

            "preload_complete"

        );

        EventBus.emit(

            "preload:complete"

        );

    }

    /*=====================================================
      LOAD
    =====================================================*/

    async load(asset) {

        try {

            switch (

                asset.type

            ) {

                case "image":

                    await this.loadImage(

                        asset.url

                    );

                    break;

                case "audio":

                    await this.loadAudio(

                        asset.url

                    );

                    break;

                case "json":

                    await fetch(

                        asset.url

                    );

                    break;

                default:

                    await fetch(

                        asset.url

                    );

            }

        }

        catch (e) {

            console.warn(

                "Falha ao carregar:",

                asset.url

            );

        }

        finally {

            this.loaded++;

            Loading.set(

                Math.round(

                    this.loaded /

                    this.total *

                    100

                )

            );

        }

    }

    /*=====================================================
      IMAGE
    =====================================================*/

    loadImage(url) {

        return new Promise(

            resolve => {

                const img = new Image();

                img.onload = resolve;

                img.onerror = resolve;

                img.src = url;

            }

        );

    }

    /*=====================================================
      AUDIO
    =====================================================*/

    loadAudio(url) {

        return new Promise(

            resolve => {

                const audio =

                    new Audio();

                audio.oncanplaythrough =

                    resolve;

                audio.onerror =

                    resolve;

                audio.src = url;

            }

        );

    }

    /*=====================================================
      STATS
    =====================================================*/

    stats() {

        return {

            total:

                this.total,

            loaded:

                this.loaded,

            percent:

                Math.round(

                    this.loaded /

                    this.total *

                    100

                )

        };

    }

}

const preload = new Preloader();

preload.loadDefaults();

export default preload;