/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z Simulator
 loading.js
=========================================================*/

import EventBus from "./event-bus.js";
import Analytics from "./analytics.js";
import Audio from "./audio.js";
import Utils from "./utils.js";

class Loading {

    constructor() {

        this.id = "loading";

        this.visible = false;

        this.progress = 0;

        this.message = "Inicializando...";

        this.interval = null;

    }

    /*=====================================================
      RENDER
    =====================================================*/

    render() {

        return `

<div id="loadingScreen"

class="loading-overlay hidden">

    <div class="loading-card">

        <div class="loading-logo">

            <img

            src="images/logo.png"

            alt="Bellacosa Mainframe">

        </div>

        <h2>

            ☕

            Java no IBM Z

        </h2>

        <p id="loadingMessage">

            Inicializando...

        </p>

        <div class="loading-progress">

            <div

                id="loadingBar"

                class="loading-progress-bar">

            </div>

        </div>

        <div

            id="loadingPercent"

            class="loading-percent">

            0%

        </div>

        <div class="loading-spinner">

            <div></div>

            <div></div>

            <div></div>

        </div>

    </div>

</div>

`;

    }

    /*=====================================================
      INIT
    =====================================================*/

    init() {

        if (

            document.querySelector(

                "#loadingScreen"

            )

        ) return;

        document.body.insertAdjacentHTML(

            "beforeend",

            this.render()

        );

    }

    /*=====================================================
      SHOW
    =====================================================*/

    show(message = "Carregando...") {

        this.init();

        this.progress = 0;

        this.message = message;

        this.visible = true;

        Utils.$(

            "#loadingMessage"

        ).textContent = message;

        Utils.$(

            "#loadingScreen"

        ).classList.remove(

            "hidden"

        );

        Analytics.event(

            "loading_show"

        );

        EventBus.emit(

            "loading:show"

        );

    }

    /*=====================================================
      HIDE
    =====================================================*/

    hide(delay = 250) {

        setTimeout(() => {

            Utils.$(

                "#loadingScreen"

            )?.classList.add(

                "hidden"

            );

            this.visible = false;

            this.stop();

            EventBus.emit(

                "loading:hide"

            );

            Analytics.event(

                "loading_hide"

            );

        }, delay);

    }

    /*=====================================================
      SET MESSAGE
    =====================================================*/

    message(text) {

        this.message = text;

        Utils.$(

            "#loadingMessage"

        ).textContent = text;

    }

    /*=====================================================
      SET PROGRESS
    =====================================================*/

    set(value) {

        this.progress =

            Math.min(

                100,

                Math.max(

                    0,

                    value

                )

            );

        Utils.$(

            "#loadingBar"

        ).style.width =

            this.progress + "%";

        Utils.$(

            "#loadingPercent"

        ).textContent =

            this.progress + "%";

        if (

            this.progress >= 100

        ) {

            Audio.play(

                "success"

            );

        }

    }

    /*=====================================================
      INCREMENT
    =====================================================*/

    increment(step = 5) {

        this.set(

            this.progress + step

        );

    }

    /*=====================================================
      AUTO
    =====================================================*/

    start(speed = 100) {

        this.stop();

        this.interval =

            setInterval(() => {

                if (

                    this.progress < 95

                ) {

                    this.increment(

                        Math.random() * 3

                    );

                }

            }, speed);

    }

    /*=====================================================
      STOP
    =====================================================*/

    stop() {

        clearInterval(

            this.interval

        );

    }

    /*=====================================================
      TASK
    =====================================================*/

    async task(

        callback,

        message = "Processando..."

    ) {

        this.show(message);

        this.start();

        try {

            const result =

                await callback();

            this.set(100);

            await Utils.sleep(

                300

            );

            this.hide();

            return result;

        }

        catch (e) {

            this.hide();

            throw e;

        }

    }

    /*=====================================================
      IS VISIBLE
    =====================================================*/

    isVisible() {

        return this.visible;

    }

}

const loading = new Loading();

export default loading;