/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 analytics.js
=========================================================*/

/* teste */
/* teste */
/* teste */
import EventBus from "./js/core/event-bus.js";
import { CONFIG } from "./js/core/config.js";

class AnalyticsManager {

    constructor() {

        this.session = {

            id: this.uuid(),

            startedAt: new Date(),

            endedAt: null,

            duration: 0

        };

        this.stats = {

            screens: {},

            events: {},

            quiz: {},

            xp: {},

            boss: {},

            achievements: []

        };

        this.currentScreen = null;

        this.screenStart = Date.now();

        this.registerEvents();

    }

    /*=====================================================*/

    registerEvents() {

        EventBus.on(CONFIG.EVENTS.START, () => {

            this.start();

        });

        EventBus.on(CONFIG.EVENTS.SCREEN, ({ route }) => {

            this.changeScreen(route);

        });

        EventBus.on("analytics:quiz", data => {

            this.stats.quiz = data;

        });

        EventBus.on("analytics:xp", data => {

            this.stats.xp = data;

        });

        EventBus.on("analytics:boss", data => {

            this.stats.boss = data;

        });

        EventBus.on("achievement:earned", achievement => {

            this.stats.achievements.push({

                id: achievement.id,

                title: achievement.title,

                date: new Date().toISOString()

            });

        });

    }

    /*=====================================================*/

    start() {

        this.session.startedAt = new Date();

        this.screenStart = Date.now();

    }

    /*=====================================================*/

    finish() {

        this.session.endedAt = new Date();

        this.session.duration =

            Math.round(

                (this.session.endedAt -

                 this.session.startedAt) / 1000

            );

    }

    /*=====================================================*/

    changeScreen(route) {

        if (this.currentScreen) {

            const elapsed =

                Math.round(

                    (Date.now() - this.screenStart) / 1000

                );

            this.stats.screens[this.currentScreen] =

                (this.stats.screens[this.currentScreen] || 0)

                + elapsed;

        }

        this.currentScreen = route;

        this.screenStart = Date.now();

    }

    /*=====================================================*/

    event(name) {

        this.stats.events[name] =

            (this.stats.events[name] || 0) + 1;

    }

    /*=====================================================*/

    export() {

        this.finish();

        return {

            session: this.session,

            stats: this.stats

        };

    }

    /*=====================================================*/

    print() {

        console.table(

            this.export()

        );

    }

    /*=====================================================*/

    reset() {

        this.stats = {

            screens:{},

            events:{},

            quiz:{},

            xp:{},

            boss:{},

            achievements:[]

        };

    }

    /*=====================================================*/

    uuid() {

        return

            Date.now().toString(36)

            +

            Math.random()

                .toString(36)

                .substring(2,10);

    }

}

const analytics =

    new AnalyticsManager();

export default analytics;