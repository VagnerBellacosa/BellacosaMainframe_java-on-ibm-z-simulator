/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 storage.js
=========================================================*/

import { CONFIG, DEFAULT_STATE } from "./config.js";
import EventBus from "./event-bus.js";
import Content from "./content.js";

class StorageManager {

    constructor() {

        this.prefix = CONFIG.STORAGE.PREFIX;

        this.keys = {

            save: this.prefix + CONFIG.STORAGE.SAVE_KEY,

            settings: this.prefix + CONFIG.STORAGE.SETTINGS_KEY,

            stats: this.prefix + CONFIG.STORAGE.STATS_KEY,

            achievements:
                this.prefix + CONFIG.STORAGE.ACHIEVEMENTS_KEY

        };

        this.listeners();

    }

    /*=====================================================*/

    listeners() {

        EventBus.on(

            CONFIG.EVENTS.SAVE,

            data => this.saveGame(data)

        );

        EventBus.on(

            CONFIG.EVENTS.LOAD,

            () => this.loadGame()

        );

        EventBus.on(

            CONFIG.EVENTS.RESET,

            () => this.clearGame()

        );

    }

    /*=====================================================*/

    write(key, value) {

        try {

            localStorage.setItem(

                key,

                JSON.stringify(value)

            );

            return true;

        }

        catch (error) {

            console.error(error);

            return false;

        }

    }

    /*=====================================================*/

    read(key, fallback = null) {

        try {

            const value =

                localStorage.getItem(key);

            if (!value) {

                return fallback;

            }

            return JSON.parse(value);

        }

        catch (error) {

            console.error(error);

            return fallback;

        }

    }

    /*=====================================================*/

    remove(key) {

        localStorage.removeItem(key);

    }

    /*=====================================================*/

    exists(key) {

        return localStorage.getItem(key) !== null;

    }

    /*=====================================================
      GAME
    =====================================================*/

    saveGame(data) {

        const payload = {

            ...DEFAULT_STATE,

            ...data,

            savedAt:

                new Date().toISOString()

        };

        this.write(

            this.keys.save,

            payload

        );

    }

    loadGame() {

        const data =

            this.read(

                this.keys.save,

                DEFAULT_STATE

            );

        EventBus.emit(

            "storage:loaded",

            data

        );

        return data;

    }

    clearGame() {

        this.remove(this.keys.save);

    }

    /*=====================================================
      SETTINGS
    =====================================================*/

    saveSettings(settings) {

        this.write(

            this.keys.settings,

            settings

        );

    }

    loadSettings() {

        return this.read(

            this.keys.settings,

            {}

        );

    }

    /*=====================================================
      ACHIEVEMENTS
    =====================================================*/

    saveAchievements(data) {

        this.write(

            this.keys.achievements,

            data

        );

    }

    loadAchievements() {

        return this.read(

            this.keys.achievements,

            []

        );

    }

    /*=====================================================
      STATS
    =====================================================*/

    saveStats(stats) {

        this.write(

            this.keys.stats,

            stats

        );

    }

    loadStats() {

        return this.read(

            this.keys.stats,

            {}

        );

    }

    /*=====================================================
      EXPORT
    =====================================================*/

    export() {

        return {

            game:

                this.loadGame(),

            settings:

                this.loadSettings(),

            stats:

                this.loadStats(),

            achievements:

                this.loadAchievements()

        };

    }

    /*=====================================================
      IMPORT
    =====================================================*/

    import(data) {

        if (!data) return;

        if (data.game)

            this.saveGame(data.game);

        if (data.settings)

            this.saveSettings(data.settings);

        if (data.stats)

            this.saveStats(data.stats);

        if (data.achievements)

            this.saveAchievements(

                data.achievements

            );

    }

    /*=====================================================
      LIMPAR TUDO
    =====================================================*/

    clearAll() {

        Object.values(this.keys)

            .forEach(key => {

                localStorage.removeItem(key);

            });

    }

    /*=====================================================
      INFO
    =====================================================*/

    info() {

        return {

            save:

                this.exists(this.keys.save),

            settings:

                this.exists(this.keys.settings),

            stats:

                this.exists(this.keys.stats),

            achievements:

                this.exists(

                    this.keys.achievements

                )

        };

    }

}

const storage = new StorageManager();

export default storage;