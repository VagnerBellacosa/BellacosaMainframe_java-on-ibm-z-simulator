/**
 * ============================================================
 * Bellacosa Mainframe Java on IBM Z Simulator
 * Analytics
 * ============================================================
 *
 * Responsabilidades
 *
 * • Registrar eventos
 * • Registrar erros
 * • Registrar navegação
 * • Registrar laboratórios
 * • Registrar quizzes
 * • Registrar certificados
 *
 * ============================================================
 */

import Logger from "../js/core/logger.js";

class Analytics {

    constructor() {

        this.enabled = true;

        this.debug = true;

    }

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
     * Evento genérico
     */
    track(eventName, data = {}) {

        if (!this.enabled) {

            return;

        }

        const payload = {

            timestamp: new Date().toISOString(),

            event: eventName,

            ...data

        };

        if (this.debug) {

            console.table(payload);

        }

        Logger.info(`[Analytics] ${eventName}`, payload);

    }

    /**
     * Mudança de tela
     */
    screen(screenName) {

        this.track("screen_view", {

            screen: screenName

        });

    }

    /**
     * Laboratório iniciado
     */
    startLab(id) {

        this.track("lab_started", {

            lab: id

        });

    }

    /**
     * Laboratório concluído
     */
    finishLab(id) {

        this.track("lab_completed", {

            lab: id

        });

    }

    /**
     * Quiz iniciado
     */
    startQuiz(id) {

        this.track("quiz_started", {

            quiz: id

        });

    }

    /**
     * Quiz concluído
     */
    finishQuiz(id, score) {

        this.track("quiz_completed", {

            quiz: id,

            score

        });

    }

    /**
     * XP ganho
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

        this.track("achievement_unlocked", {

            achievement: id

        });

    }

    /**
     * Certificado
     */
    certificate(id) {

        this.track("certificate_earned", {

            certificate: id

        });

    }

    /**
     * Erros
     */
    error(error, context = "") {

        this.track("error", {

            context,

            message: error?.message ?? error,

            stack: error?.stack ?? null

        });

    }

}

const analytics = new Analytics();

export default analytics;