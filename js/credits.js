/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z Simulator
 credits.js
=========================================================*/

import Router from "./router.js";
import EventBus from "./event-bus.js";
import Analytics from "./analytics.js";
import Audio from "./audio.js";
import Utils from "./utils.js";

class Credits {

    constructor() {

        this.running = false;

        this.interval = null;

    }

    /*=====================================================
      RENDER
    =====================================================*/

    render() {

        return `

<section id="credits-screen"

         class="section hidden">

<div class="credits-container">

<h1>

☕

Bellacosa Mainframe

</h1>

<h2>

Java no IBM Z Simulator

</h2>

<div id="creditsContent"

class="credits-scroll">

<h3>

Idealização

</h3>

<p>

Vagner Bellacosa

</p>

<h3>

Projeto

</h3>

<p>

Bellacosa Mainframe

</p>

<h3>

Tecnologias

</h3>

<p>

HTML5

</p>

<p>

CSS3

</p>

<p>

JavaScript ES Modules

</p>

<p>

IBM Z

</p>

<p>

Java

</p>

<p>

Enterprise COBOL

</p>

<p>

CICS

</p>

<p>

Db2

</p>

<p>

MQ

</p>

<p>

JCL

</p>

<p>

z/OS

</p>

<h3>

Recursos

</h3>

<p>

Gamificação

</p>

<p>

Sistema de XP

</p>

<p>

Boss Battle

</p>

<p>

Quiz Engine

</p>

<p>

Achievements

</p>

<p>

Timeline

</p>

<p>

Flash Cards

</p>

<p>

Terminal IBM Z

</p>

<p>

SEO Completo

</p>

<h3>

Agradecimentos

</h3>

<p>

Comunidade IBM Z

</p>

<p>

IBM Champions

</p>

<p>

Open Source Community

</p>

<p>

Todos os Programadores COBOL

</p>

<p>

que mantêm o mundo funcionando.

</p>

<h3>

Visite

</h3>

<p>

El Jefe Midnight Lunch

</p>

<p>

Bellacosa Mainframe

</p>

<p>

Obrigado por participar!

</p>

</div>

<div class="center mt-5">

<button

id="btnCreditsClose"

class="btn btn-primary">

Voltar

</button>

</div>

</div>

</section>

`;

    }

    /*=====================================================
      INIT
    =====================================================*/

    init() {

        Analytics.event(

            "credits_open"

        );

        Audio.play("victory");

        this.bindEvents();

        this.startScroll();

    }

    /*=====================================================
      EVENTS
    =====================================================*/

    bindEvents() {

        Utils.$(

            "#btnCreditsClose"

        )?.addEventListener(

            "click",

            () => this.close()

        );

    }

    /*=====================================================
      AUTO SCROLL
    =====================================================*/

    startScroll() {

        const area =

            Utils.$(

                "#creditsContent"

            );

        if (!area) return;

        this.running = true;

        this.interval = setInterval(() => {

            area.scrollTop += 1;

            if (

                area.scrollTop >=

                area.scrollHeight -

                area.clientHeight

            ) {

                area.scrollTop = 0;

            }

        }, 40);

    }

    /*=====================================================
      STOP
    =====================================================*/

    stopScroll() {

        clearInterval(

            this.interval

        );

        this.running = false;

    }

    /*=====================================================
      CLOSE
    =====================================================*/

    close() {

        this.stopScroll();

        Analytics.event(

            "credits_close"

        );

        EventBus.emit(

            "credits:close"

        );

        Router.go(

            "finish"

        );

    }

    /*=====================================================
      SHOW
    =====================================================*/

    show() {

        Utils.$(

            "#credits-screen"

        )?.classList.remove(

            "hidden"

        );

    }

    /*=====================================================
      HIDE
    =====================================================*/

    hide() {

        Utils.$(

            "#credits-screen"

        )?.classList.add(

            "hidden"

        );

    }

    /*=====================================================
      DESTROY
    =====================================================*/

    destroy() {

        this.stopScroll();

    }

}

export default new Credits();