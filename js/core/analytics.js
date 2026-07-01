/**
 * ============================================================
 * Bellacosa Mainframe Java on IBM Z Simulator
 * Core Analytics
 * ============================================================
 */

import Logger from "./logger.js";
import EventBus from "./event-bus.js";

class Analytics {

    constructor() {

        this.enabled = true;
        this.debug = false;

    }

    /**
     * Inicialização
     */
    init(options = {}) {

        this.enabled = options.enabled ?? true;
        this.debug = options.debug ?? false;

        Logger.info("Analytics inicializado.");

    }

    enable() {

        this.enabled = true;

    }

    disable() {

        this.enabled = false;

    }

    /**
     * Método principal
     */
    track(name, data = {}) {

        if (!this.enabled) return;

        const payload = {

            event: name,
            timestamp: new Date().toISOString(),
            ...data

        };

        if (this.debug) {

            console.table(payload);

        }

        Logger.info(`[Analytics] ${name}`, payload);

        EventBus.emit("analytics:event", payload);

    }

    /**
     * Compatibilidade com código legado
     */
    event(name, value = null) {

        if (value !== null && typeof value !== "object") {

            this.track(name, { value });

            return;

        }

        this.track(name, value ?? {});

    }

    /**
     * Screen View
     */
    screen(name) {

        this.track("screen_view", {

            screen: name

        });

    }

    /**
     * Navegação
     */
    page(name) {

        this.screen(name);

    }

    /**
     * Quiz
     */
    quizStarted(id) {

        this.track("quiz_started", {

            quiz: id

        });

    }

    quizFinished(id, score) {

        this.track("quiz_finished", {

            quiz: id,
            score

        });

    }

    /**
     * Laboratórios
     */
    labStarted(id) {

        this.track("lab_started", {

            lab: id

        });

    }

    labFinished(id) {

        this.track("lab_finished", {

            lab: id

        });

    }

    /**
     * XP
     */
    gainXP(amount) {

        this.track("xp_gain", {

            amount

        });

    }

    /**
     * Achievement
     */
    achievement(id) {

        this.track("achievement", {

            id

        });

    }

    /**
     * Certificados
     */
    certificate(id) {

        this.track("certificate", {

            id

        });

    }

    /**
     * Erros
     */
    error(error, context = "") {

        this.track("error", {

            context,
            message: error?.message ?? String(error),
            stack: error?.stack ?? null

        });

    }

}

const analytics = new Analytics();

export default analytics;