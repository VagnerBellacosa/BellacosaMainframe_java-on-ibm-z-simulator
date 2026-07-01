/**
 * ============================================================
 * Bellacosa Mainframe Java on IBM Z Simulator
 * Screen Manager
 * ============================================================
 *
 * Responsabilidades
 *
 * • Registrar telas
 * • Carregar telas
 * • Destruir telas
 * • Controlar transições
 * • Atualizar AppState
 * * Emitir eventos do ciclo de vida
 *
 * Cada Screen deve implementar:
 *
 * init()
 * render()
 * destroy()
 *
 * ============================================================
 */

import EventBus from "../js/core/event-bus.js";
import Logger from "../js/core/logger.js";
import AppState from "../js/core/app-state.js";

class ScreenManager {

    constructor() {

        this.screens = new Map();

        this.currentScreen = null;

        this.currentName = null;

    }

    /**
     * Registra uma tela
     */
    register(name, ScreenClass) {

        if (this.screens.has(name)) {

            Logger.warn(`Screen "${name}" já registrada.`);

            return;

        }

        this.screens.set(name, ScreenClass);

        Logger.info(`Screen registrada: ${name}`);

    }

    /**
     * Lista telas disponíveis
     */
    getRegisteredScreens() {

        return [...this.screens.keys()];

    }

    /**
     * Tela atual
     */
    getCurrentScreen() {

        return this.currentName;

    }

    /**
     * Navegação principal
     */
    async navigate(name, params = {}) {

        if (!this.screens.has(name)) {

            Logger.error(`Screen "${name}" não encontrada.`);

            return;

        }

        EventBus.emit("screen:before-change", {

            from: this.currentName,

            to: name

        });

        if (this.currentScreen?.destroy) {

            await this.currentScreen.destroy();

        }

        const ScreenClass = this.screens.get(name);

        this.currentScreen = new ScreenClass(params);

        this.currentName = name;

        AppState.set("progress.currentScreen", name);

        if (this.currentScreen.init) {

            await this.currentScreen.init();

        }

        if (this.currentScreen.render) {

            await this.currentScreen.render();

        }

        EventBus.emit("screen:changed", {

            screen: name,

            instance: this.currentScreen

        });

        Logger.info(`Screen atual: ${name}`);

    }

    /**
     * Atualiza a tela atual
     */
    async refresh() {

        if (!this.currentScreen) {

            return;

        }

        if (this.currentScreen.render) {

            await this.currentScreen.render();

        }

    }

    /**
     * Remove uma tela registrada
     */
    unregister(name) {

        this.screens.delete(name);

        Logger.info(`Screen removida: ${name}`);

    }

    /**
     * Remove todas
     */
    clear() {

        this.screens.clear();

        this.currentScreen = null;

        this.currentName = null;

    }

}

export default new ScreenManager();