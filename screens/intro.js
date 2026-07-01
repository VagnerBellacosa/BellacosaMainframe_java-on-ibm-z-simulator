/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 screens/intro.js
=========================================================*/

import Router from "../router.js";
import EventBus from "../event-bus.js";
import XPManager from "../xp-manager.js";
import Analytics from "../analytics.js";
import Audio from "../audio.js";
import Storage from "../storage.js";
import Utils from "../utils.js";
import { CONFIG } from "../config.js";

class IntroScreen {

    constructor() {

        this.id = "intro";

        this.element = null;

        this.initialized = false;

    }

    /*=====================================================
      RENDER
    =====================================================*/

    render() {

        return `

<section id="intro-screen"
         class="hero fade-in">

    <div class="hero-content">

        <div class="hero-logo float">

            <img
                src="images/java.png"
                alt="Java IBM Z">

        </div>

        <h1>

            ☕

            Um Café no Bellacosa Mainframe

        </h1>

        <h2>

            Java para IBM Mainframe

        </h2>

        <p>

            Descubra que Java não substitui COBOL.

            Ele trabalha ao lado dele,

            compartilhando CICS, Db2,

            MQ e APIs modernas.

        </p>

        <div class="hero-buttons mt-5">

            <button
                id="btnStart"

                class="btn btn-primary btn-lg">

                🚀 Iniciar Jornada

            </button>

            <button
                id="btnTimeline"

                class="btn btn-glass">

                🗺 Ver Jornada

            </button>

        </div>

        <div class="hero-stats mt-5">

            <div class="panel">

                <strong>⏱ 5 minutos</strong>

                <small>

                    duração média

                </small>

            </div>

            <div class="panel">

                <strong>🏆 3.000 XP</strong>

                <small>

                    disponíveis

                </small>

            </div>

            <div class="panel">

                <strong>🎓 Certificado</strong>

                <small>

                    ao concluir

                </small>

            </div>

        </div>

    </div>

</section>

`;

    }

    /*=====================================================
      INIT
    =====================================================*/

    init() {

        this.element =

            document.querySelector(

                "#intro-screen"

            );

        if (!this.element) return;

        this.bindEvents();

        this.restore();

        Analytics.event("intro_loaded");

        this.initialized = true;

    }

    /*=====================================================
      EVENTOS
    =====================================================*/

    bindEvents() {

        const start =

            Utils.$("#btnStart");

        const timeline =

            Utils.$("#btnTimeline");

        start?.addEventListener(

            "click",

            () => this.start()

        );

        timeline?.addEventListener(

            "click",

            () =>

            Router.go("timeline")

        );

    }

    /*=====================================================
      INICIAR
    =====================================================*/

    start() {

        Audio.play("click");

        XPManager.add(50);

        Analytics.event("intro_start");

        Storage.set(

            "introCompleted",

            true

        );

        EventBus.emit(

            "intro:completed"

        );

        Router.go(

            "architecture"

        );

    }

    /*=====================================================
      RESTORE
    =====================================================*/

    restore() {

        const completed =

            Storage.get(

                "introCompleted",

                false

            );

        if (!completed) return;

        const button =

            Utils.$("#btnStart");

        if (!button) return;

        button.innerHTML =

            "▶ Continuar";

    }

    /*=====================================================
      SHOW
    =====================================================*/

    show() {

        this.element?.classList.remove(

            "hidden"

        );

        this.element?.classList.add(

            "fade-in"

        );

    }

    /*=====================================================
      HIDE
    =====================================================*/

    hide() {

        this.element?.classList.add(

            "hidden"

        );

    }

    /*=====================================================
      DESTROY
    =====================================================*/

    destroy() {

        this.initialized = false;

        this.element = null;

    }

}

export default new IntroScreen();