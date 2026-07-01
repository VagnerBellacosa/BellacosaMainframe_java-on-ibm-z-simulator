/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z Simulator
 settings.js
=========================================================*/

import CONFIG from "./core/config.js";
import Storage from "./core/storage.js";
import EventBus from "./core/event-bus.js";
import Analytics from "./core/analytics.js";
import Audio from "./audio.js";

class Settings {

    constructor() {

        this.key = "settings";

        this.defaults = {

            theme: "dark",

            language: "pt-BR",

            sound: true,

            music: true,

            volume: 0.70,

            animations: true,

            particles: true,

            confetti: true,

            autoSave: true,

            hints: true,

            terminalSpeed: 35,

            quizShuffle: false,

            quizTimer: false,

            quizTime: 30,

            accessibility: {

                highContrast: false,

                largeFonts: false,

                reducedMotion: false

            }

        };

        this.settings = {};

    }

    /*=====================================================
      INITIALIZE
    =====================================================*/

    initialize() {

        const saved = Storage.get(

            this.key,

            null

        );

        this.settings =

            saved

            ? { ...this.defaults, ...saved }

            : { ...this.defaults };

        this.apply();

    }

    /*=====================================================
      SAVE
    =====================================================*/

    save() {

        Storage.set(

            this.key,

            this.settings

        );

        EventBus.emit(

            "settings:saved",

            this.settings

        );

        Analytics.event(

            "settings_saved"

        );

    }

    /*=====================================================
      RESET
    =====================================================*/

    reset() {

        this.settings = {

            ...this.defaults

        };

        this.save();

        this.apply();

    }

    /*=====================================================
      GET
    =====================================================*/

    get(name) {

        return this.settings[name];

    }

    /*=====================================================
      SET
    =====================================================*/

    set(name, value) {

        this.settings[name] = value;

        this.save();

        this.apply();

    }

    /*=====================================================
      TOGGLE
    =====================================================*/

    toggle(name) {

        this.settings[name] =

            !this.settings[name];

        this.save();

        this.apply();

    }

    /*=====================================================
      APPLY
    =====================================================*/

    apply() {

        document.documentElement.dataset.theme =

            this.settings.theme;

        document.documentElement.classList.toggle(

            "reduced-motion",

            this.settings.accessibility.reducedMotion

        );

        document.documentElement.classList.toggle(

            "large-fonts",

            this.settings.accessibility.largeFonts

        );

        document.documentElement.classList.toggle(

            "high-contrast",

            this.settings.accessibility.highContrast

        );

        Audio.setEnabled(

            this.settings.sound

        );

        Audio.setVolume(

            this.settings.volume

        );

        EventBus.emit(

            "settings:changed",

            this.settings

        );

    }

    /*=====================================================
      IMPORT
    =====================================================*/

    import(json) {

        try {

            const data =

                JSON.parse(json);

            this.settings = {

                ...this.defaults,

                ...data

            };

            this.save();

            this.apply();

            return true;

        }

        catch {

            return false;

        }

    }

    /*=====================================================
      EXPORT
    =====================================================*/

    export() {

        return JSON.stringify(

            this.settings,

            null,

            2

        );

    }

    /*=====================================================
      DOWNLOAD
    =====================================================*/

    download() {

        const blob =

            new Blob(

                [this.export()],

                {

                    type:

                    "application/json"

                }

            );

        const url =

            URL.createObjectURL(blob);

        const a =

            document.createElement("a");

        a.href = url;

        a.download =

            "settings.json";

        a.click();

        URL.revokeObjectURL(url);

    }

    /*=====================================================
      LOAD FILE
    =====================================================*/

    async loadFile(file) {

        const text =

            await file.text();

        return this.import(text);

    }

    /*=====================================================
      INFO
    =====================================================*/

    info() {

        return {

            app:

                CONFIG.APP.NAME,

            version:

                CONFIG.APP.VERSION,

            settings:

                this.settings

        };

    }

}

const settings = new Settings();

export default settings;