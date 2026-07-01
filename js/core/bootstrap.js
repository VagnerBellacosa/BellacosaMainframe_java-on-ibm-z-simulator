/**
 * ==========================================================
 * Bellacosa Mainframe
 * Java no IBM Z Simulator
 * bootstrap.js
 * ==========================================================
 *
 * Responsável por inicializar toda a aplicação.
 *
 * Ordem de inicialização:
 *
 * 1. Configuração
 * 2. Storage / Cache
 * 3. Internacionalização
 * 4. Assets
 * 5. Engines
 * 6. Router
 * 7. Analytics
 * 8. Service Worker
 * 9. Eventos Globais
 *
 * ==========================================================
 */

import config from "../js/core/config.js";

import constants from "../js/core/constants.js";

import logger from "../js/core/logger.js";

import storage from "../js/core/storage.js";

import cache from "../js/core/cache.js";

import eventBus from "../js/core/event-bus.js";

import preload from "./preload.js";

import router from "../js/core/router.js";

import analytics from "../js/core/analytics.js";

import i18n from "../lang/i18n.js";

import loading from "./loading.js";

import settings from "./settings.js";

import audioEngine from "./audio-engine.js";

import particleEngine from "./particle-engine.js";

import architectureEngine from "./architecture-engine.js";

import cardsEngine from "./cards-engine.js";

import glossaryEngine from "./glossary-engine.js";

import timelineEngine from "./timeline-engine.js";

import labEngine from "./lab-engine.js";

import certificateEngine from "./certificate-engine.js";

import achievementEngine from "./achievement-engine.js";

/**
 * ==========================================================
 * Bootstrap
 * ==========================================================
 */

class Bootstrap {

    constructor() {

        this.started = false;

    }

    async start() {

        if (this.started) {

            return;

        }

        this.started = true;

        logger.info("====================================");

        logger.info("Bellacosa Mainframe");

        logger.info("Java no IBM Z Simulator");

        logger.info(`Version ${config.version}`);

        logger.info("====================================");

        try {

            loading.show("Inicializando...");

            await this.initialize();

            loading.hide();

            document.body.classList.add("ready");

            eventBus.emit("application.ready");

            logger.success("Application Ready");

        }

        catch (error) {

            logger.error(error);

            loading.hide();

            this.showFatalError(error);

        }

    }

    /**
     * ======================================================
     * Inicialização
     * ======================================================
     */

    async initialize() {

        logger.info("Loading configuration...");

        await settings.init?.();

        logger.info("Loading storage...");

        storage.init?.();

        cache.init?.();

        logger.info("Loading language...");

        await i18n.init();

        logger.info("Preloading assets...");

        await preload.init?.();

        logger.info("Loading Audio Engine...");

        await audioEngine.init?.();

        logger.info("Loading Particle Engine...");

        await particleEngine.init?.();

        logger.info("Loading Architecture Engine...");

        await architectureEngine.init?.();

        logger.info("Loading Cards Engine...");

        await cardsEngine.init?.();

        logger.info("Loading Glossary Engine...");

        await glossaryEngine.init?.();

        logger.info("Loading Timeline Engine...");

        await timelineEngine.init?.();

        logger.info("Loading Labs...");

        await labEngine.init?.();

        logger.info("Loading Certificates...");

        await certificateEngine.init?.();

        logger.info("Loading Achievements...");

        await achievementEngine.init?.();

        logger.info("Loading Router...");

        await router.start();

        logger.info("Starting Analytics...");

        analytics.startSession();

        this.registerServiceWorker();

        this.registerGlobalEvents();

    }

    /**
     * ======================================================
     * Service Worker
     * ======================================================
     */

    registerServiceWorker() {

        if (

            !("serviceWorker" in navigator)

        ) {

            return;

        }

        window.addEventListener(

            "load",

            async () => {

                try {

                    await navigator

                        .serviceWorker

                        .register("./service-worker.js");

                    logger.success(

                        "Service Worker Registered"

                    );

                }

                catch (error) {

                    logger.warn(error);

                }

            }

        );

    }

    /**
     * ======================================================
     * Eventos Globais
     * ======================================================
     */

    registerGlobalEvents() {

        window.addEventListener(

            "beforeunload",

            () => analytics.finishSession()

        );

        window.addEventListener(

            "online",

            () => {

                logger.info("Online");

                eventBus.emit("network.online");

            }

        );

        window.addEventListener(

            "offline",

            () => {

                logger.warn("Offline");

                eventBus.emit("network.offline");

            }

        );

        window.addEventListener(

            "languageChanged",

            event => {

                logger.info(

                    `Language: ${event.detail.language}`

                );

            }

        );

    }

    /**
     * ======================================================
     * Fatal Error
     * ======================================================
     */

    showFatalError(error) {

        console.error(error);

        document.body.innerHTML = `

        <main
            style="
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                min-height:100vh;
                background:#07111f;
                color:#ffffff;
                font-family:Arial,sans-serif;
                padding:40px;
                text-align:center">

            <h1>

                ☕ Bellacosa Mainframe

            </h1>

            <h2>

                Java no IBM Z Simulator

            </h2>

            <p>

                Ocorreu um erro durante a inicialização.

            </p>

            <pre
                style="
                    max-width:800px;
                    overflow:auto;
                    text-align:left;
                    background:#111;
                    padding:20px;
                    border-radius:10px">

${error}

            </pre>

        </main>

        `;

    }

}

/**
 * ==========================================================
 * Singleton
 * ==========================================================
 */

const bootstrap = new Bootstrap();

export default bootstrap;

/**
 * ==========================================================
 * Auto Start
 * ==========================================================
 */

document.addEventListener(

    "DOMContentLoaded",

    () => bootstrap.start()

);