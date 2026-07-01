/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 router.js
=========================================================*/

import { CONFIG } from "../js/core/config.js";
import EventBus from "../js/core/event-bus.js";

class Router {

    constructor() {

        this.routes = CONFIG.ROUTES;

        this.currentIndex = 0;

        this.currentRoute = this.routes[0];

        this.screens = [];

    }

    /*=====================================================*/

    init() {

        this.screens = [...document.querySelectorAll(".screen")];

        this.hideAll();

        this.show(this.currentRoute);

    }

    /*=====================================================*/

    hideAll() {

        this.screens.forEach(screen => {

            screen.classList.add(CONFIG.CSS.HIDDEN);

        });

    }

    /*=====================================================*/

    show(route) {

        const element = document.getElementById(`${route}Screen`);

        if (!element) {

            console.warn(`Tela '${route}' não encontrada.`);

            return;

        }

        this.hideAll();

        element.classList.remove(CONFIG.CSS.HIDDEN);

        this.currentRoute = route;

        this.currentIndex = this.routes.indexOf(route);

        this.updateProgress();

        EventBus.emit(CONFIG.EVENTS.SCREEN, {

            route,

            index: this.currentIndex

        });

    }

    /*=====================================================*/

    next() {

        if (this.currentIndex >= this.routes.length - 1)

            return;

        this.currentIndex++;

        this.show(this.routes[this.currentIndex]);

    }

    /*=====================================================*/

    previous() {

        if (this.currentIndex <= 0)

            return;

        this.currentIndex--;

        this.show(this.routes[this.currentIndex]);

    }

    /*=====================================================*/

    go(route) {

        if (!this.routes.includes(route)) {

            console.warn("Rota inválida:", route);

            return;

        }

        this.show(route);

    }

    /*=====================================================*/

    restart() {

        this.currentIndex = 0;

        this.show(this.routes[0]);

    }

    /*=====================================================*/

    getCurrentRoute() {

        return this.currentRoute;

    }

    /*=====================================================*/

    getCurrentIndex() {

        return this.currentIndex;

    }

    /*=====================================================*/

    getProgress() {

        return Math.round(

            ((this.currentIndex + 1) / this.routes.length) * 100

        );

    }

    /*=====================================================*/

    updateProgress() {

        const progress = this.getProgress();

        const bar = document.getElementById("xpBar");

        if (bar) {

            bar.style.width = progress + "%";

        }

    }

    /*=====================================================*/

    isFirst() {

        return this.currentIndex === 0;

    }

    /*=====================================================*/

    isLast() {

        return this.currentIndex === this.routes.length - 1;

    }

}

/*=========================================================
 Singleton
=========================================================*/

const router = new Router();

export default router;