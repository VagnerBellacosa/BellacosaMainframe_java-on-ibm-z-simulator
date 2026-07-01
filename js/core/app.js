/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z Simulator
 app.js
=========================================================*/

import CONFIG from "..js/core/config.js";
import Router from "../js/core/router.js";
import EventBus from "../js/core/event-bus.js";
import Storage from "../js/core/storage.js";
import Analytics from "../js/core/analytics.js";
import Audio from "../js/audio.js";
import Animation from "../js/animation.js";
import Particles from "../js/particles.js";
import Confetti from "./confetti.js";
import XPManager from "./xp-manager.js";
import Achievements from "./achievements.js";

import Schema from "../seo/schema.js";

/*================== Screens ==================*/

import Startup from "./screens/startup.js";
import Intro from "./screens/intro.js";
import Timeline from "./screens/timeline.js";
import Mapping from "./screens/mapping.js";
import Architecture from "./screens/architecture.js";
import Lab from "./screens/lab.js";
import Quiz from "./screens/quiz.js";
import Boss from "./screens/boss.js";
import Finish from "./screens/finish.js";

/*=========================================================*/

class Application {

    constructor() {

        this.started = false;

    }

    /*=====================================================*/

    async start() {

        if (this.started) return;

        console.log("");

        console.log("===================================");

        console.log(CONFIG.APP.NAME);

        console.log("Version:", CONFIG.APP.VERSION);

        console.log(CONFIG.APP.AUTHOR);

        console.log("===================================");

        await this.initialize();

        this.started = true;

    }

    /*=====================================================*/

    async initialize() {

        this.initializeStorage();

        this.initializeAudio();

        this.initializeAnalytics();

        this.initializeXP();

        this.initializeAchievements();

        this.initializeSEO();

        this.initializeRouter();

        this.initializeEffects();

        this.initializeEvents();

        Router.startAtDefault();

    }

    /*=====================================================*/

    initializeStorage() {

        Storage.initialize?.();

    }

    /*=====================================================*/

    initializeAudio() {

        Audio.initialize?.({

            volume: CONFIG.AUDIO.VOLUME,

            enabled: CONFIG.AUDIO.ENABLED

        });

    }

    /*=====================================================*/

    initializeAnalytics() {

        Analytics.initialize?.();

    }

    /*=====================================================*/

    initializeXP() {

        XPManager.initialize?.();

    }

    /*=====================================================*/

    initializeAchievements() {

        Achievements.initialize?.();

    }

    /*=====================================================*/

    initializeSEO() {

        document.title = CONFIG.SEO.TITLE;

        const description =

            document.querySelector(

                'meta[name="description"]'

            );

        if (description) {

            description.content =

                CONFIG.SEO.DESCRIPTION;

        }

        Schema.website();

        Schema.webpage({

            title: CONFIG.SEO.TITLE,

            description:

                CONFIG.SEO.DESCRIPTION

        });

        Schema.course();

        Schema.quiz();

        Schema.game();

        Schema.software();

        Schema.faq();

        Schema.howTo();

        Schema.breadcrumb();

        Schema.publish();

    }

    /*=====================================================*/

    initializeRouter() {

        Router.start("#app");

        Router.registerMany({

            startup: Startup,

            intro: Intro,

            timeline: Timeline,

            mapping: Mapping,

            architecture: Architecture,

            lab: Lab,

            quiz: Quiz,

            boss: Boss,

            finish: Finish

        });

        Router.enableHashNavigation();

    }

    /*=====================================================*/

    initializeEffects() {

        Animation.initialize?.();

        Particles.initialize?.();

        Confetti.initialize?.();

    }

    /*=====================================================*/

    initializeEvents() {

        EventBus.on(

            "router:changed",

            route => {

                Analytics.event(

                    "page_view",

                    route

                );

            }

        );

        EventBus.on(

            "boss:defeated",

            () => {

                console.log(

                    "🏆 Boss derrotado."

                );

            }

        );

        EventBus.on(

            "game:restart",

            () => {

                Storage.clear();

                location.reload();

            }

        );

    }

}

/*=========================================================
 START
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    async () => {

        const app =

            new Application();

        await app.start();

    }

);