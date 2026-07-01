/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z Simulator
 router.js
=========================================================*/

import CONFIG from "./config.js";
import EventBus from "./event-bus.js";

class Router {

    constructor() {

        this.routes = new Map();

        this.current = null;

        this.currentName = null;

        this.container = null;

        this.history = [];

    }

    /*=====================================================
      START
    =====================================================*/

    start(container = "#app") {

        this.container = document.querySelector(container);

        if (!this.container) {

            throw new Error("Container não encontrado.");

        }

        EventBus.emit("router:started");

    }

    /*=====================================================
      REGISTER
    =====================================================*/

    register(name, screen) {

        this.routes.set(name, screen);

        return this;

    }

    /*=====================================================
      REGISTER MANY
    =====================================================*/

    registerMany(list) {

        Object.entries(list)

            .forEach(

                ([name, screen]) =>

                    this.register(name, screen)

            );

    }

    /*=====================================================
      GO
    =====================================================*/

    async go(name, params = {}) {

        if (!this.routes.has(name)) {

            console.error(

                `Rota '${name}' inexistente.`

            );

            return;

        }

        const screen =

            this.routes.get(name);

        if (this.current?.hide)

            this.current.hide();

        if (this.current?.destroy)

            this.current.destroy();

        this.container.innerHTML =

            screen.render(params);

        if (screen.init)

            await screen.init(params);

        if (screen.show)

            screen.show();

        this.current = screen;

        this.currentName = name;

        this.history.push(name);

        window.location.hash = name;

        EventBus.emit(

            "router:changed",

            {

                route: name,

                params

            }

        );

    }

    /*=====================================================
      BACK
    =====================================================*/

    async back() {

        if (

            this.history.length < 2

        ) return;

        this.history.pop();

        const previous =

            this.history.pop();

        await this.go(previous);

    }

    /*=====================================================
      RELOAD
    =====================================================*/

    reload() {

        if (

            this.currentName

        ) {

            this.go(

                this.currentName

            );

        }

    }

    /*=====================================================
      CURRENT
    =====================================================*/

    currentRoute() {

        return this.currentName;

    }

    /*=====================================================
      EXISTS
    =====================================================*/

    exists(name) {

        return this.routes.has(name);

    }

    /*=====================================================
      LIST
    =====================================================*/

    list() {

        return [

            ...this.routes.keys()

        ];

    }

    /*=====================================================
      COUNT
    =====================================================*/

    count() {

        return this.routes.size;

    }

    /*=====================================================
      RESET
    =====================================================*/

    reset() {

        this.history = [];

    }

    /*=====================================================
      HASH NAVIGATION
    =====================================================*/

    enableHashNavigation() {

        window.addEventListener(

            "hashchange",

            () => {

                const route =

                    location.hash

                    .replace("#", "");

                if (

                    route &&

                    this.exists(route)

                ) {

                    this.go(route);

                }

            }

        );

    }

    /*=====================================================
      INITIAL ROUTE
    =====================================================*/

    startAtDefault() {

        const hash =

            location.hash

            .replace("#", "");

        if (

            hash &&

            this.exists(hash)

        ) {

            this.go(hash);

            return;

        }

        this.go(

            CONFIG.ROUTES[0]

        );

    }

}

const router = new Router();

export default router;