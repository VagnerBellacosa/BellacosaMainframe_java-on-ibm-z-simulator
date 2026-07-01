/**
 * ============================================================
 * Bellacosa Mainframe Java on IBM Z Simulator
 * AppState
 * ============================================================
 *
 * Fonte única da verdade (Single Source of Truth)
 *
 * Nenhum módulo deve manter estado global próprio.
 *
 * Toda alteração deve ocorrer através de:
 *
 * AppState.set(...)
 * AppState.update(...)
 * AppState.reset()
 *
 * ============================================================
 */

import EventBus from "../js/core/event-bus.js";

const DEFAULT_STATE = Object.freeze({

    player: {

        name: "Padawan",

        level: 1,

        xp: 0,

        score: 0,

        lives: 3

    },

    progress: {

        currentScreen: "home",

        currentModule: null,

        currentLab: null,

        currentQuiz: null,

        completedLabs: [],

        completedQuizzes: []

    },

    achievements: [],

    settings: {

        language: "pt-BR",

        sound: true,

        music: true,

        particles: true,

        animations: true,

        darkMode: false

    },

    statistics: {

        questionsAnswered: 0,

        correctAnswers: 0,

        wrongAnswers: 0,

        labsFinished: 0,

        certificatesEarned: 0,

        playTime: 0

    }

});

class AppState {

    constructor() {

        this.reset();

    }

    reset() {

        this.state = structuredClone(DEFAULT_STATE);

        EventBus.emit("state:reset", this.state);

    }

    get() {

        return structuredClone(this.state);

    }

    getValue(path) {

        return path.split(".").reduce((obj, key) => obj?.[key], this.state);

    }

    set(path, value) {

        const keys = path.split(".");

        let obj = this.state;

        while (keys.length > 1) {

            const key = keys.shift();

            if (!obj[key]) {

                obj[key] = {};

            }

            obj = obj[key];

        }

        obj[keys[0]] = value;

        EventBus.emit("state:changed", {

            path,

            value,

            state: this.get()

        });

    }

    update(path, callback) {

        const current = this.getValue(path);

        this.set(path, callback(current));

    }

    increment(path, value = 1) {

        const current = this.getValue(path) || 0;

        this.set(path, current + value);

    }

    decrement(path, value = 1) {

        const current = this.getValue(path) || 0;

        this.set(path, current - value);

    }

    push(path, value) {

        const array = this.getValue(path);

        if (!Array.isArray(array)) {

            throw new Error(`${path} não é um Array.`);

        }

        array.push(value);

        this.set(path, array);

    }

    remove(path, predicate) {

        const array = this.getValue(path);

        if (!Array.isArray(array)) {

            throw new Error(`${path} não é um Array.`);

        }

        this.set(path, array.filter(item => !predicate(item)));

    }

}

export default new AppState();