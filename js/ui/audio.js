/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 audio.js
=========================================================*/

import { CONFIG } from "../js/core/config.js";
import EventBus from "../js/core/event-bus.js";

class AudioManager {

    constructor() {

        this.enabled = CONFIG.AUDIO.ENABLED;
        this.volume = CONFIG.AUDIO.MASTER_VOLUME;

        this.sounds = {};

        this.initialized = false;

        this.registerEvents();

    }

    /*=====================================================*/

    init() {

        if (this.initialized) return;

        Object.entries(CONFIG.AUDIO).forEach(([key, value]) => {

            if (typeof value !== "string") return;

            const audio = new Audio(value);

            audio.preload = "auto";
            audio.volume = this.volume;

            this.sounds[key.toLowerCase()] = audio;

        });

        this.initialized = true;

    }

    /*=====================================================*/

    registerEvents() {

        EventBus.on(CONFIG.EVENTS.QUIZ_RIGHT, () => {

            this.play("success");

        });

        EventBus.on(CONFIG.EVENTS.QUIZ_WRONG, () => {

            this.play("error");

        });

        EventBus.on(CONFIG.EVENTS.LEVEL, () => {

            this.play("levelup");

        });

        EventBus.on(CONFIG.EVENTS.BOSS_DEAD, () => {

            this.play("victory");

        });

        EventBus.on("boss:start", () => {

            this.play("boss");

        });

    }

    /*=====================================================*/

    play(name) {

        if (!this.enabled) return;

        const sound = this.sounds[name];

        if (!sound) return;

        sound.pause();

        sound.currentTime = 0;

        sound.play().catch(() => {});

    }

    /*=====================================================*/

    stop(name) {

        const sound = this.sounds[name];

        if (!sound) return;

        sound.pause();

        sound.currentTime = 0;

    }

    /*=====================================================*/

    stopAll() {

        Object.values(this.sounds).forEach(sound => {

            sound.pause();

            sound.currentTime = 0;

        });

    }

    /*=====================================================*/

    pauseAll() {

        Object.values(this.sounds).forEach(sound => {

            sound.pause();

        });

    }

    /*=====================================================*/

    resume(name) {

        const sound = this.sounds[name];

        if (!sound) return;

        sound.play().catch(() => {});

    }

    /*=====================================================*/

    setVolume(value) {

        this.volume = Math.max(

            0,

            Math.min(1, value)

        );

        Object.values(this.sounds).forEach(sound => {

            sound.volume = this.volume;

        });

    }

    /*=====================================================*/

    mute() {

        this.enabled = false;

    }

    /*=====================================================*/

    unmute() {

        this.enabled = true;

    }

    /*=====================================================*/

    toggle() {

        this.enabled = !this.enabled;

    }

    /*=====================================================*/

    isMuted() {

        return !this.enabled;

    }

    /*=====================================================*/

    preload() {

        Object.values(this.sounds).forEach(sound => {

            sound.load();

        });

    }

    /*=====================================================*/

    getVolume() {

        return this.volume;

    }

    /*=====================================================*/

    exists(name) {

        return !!this.sounds[name];

    }

    /*=====================================================*/

    list() {

        return Object.keys(this.sounds);

    }

}

const audio = new AudioManager();

export default audio;