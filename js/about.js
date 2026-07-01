/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z Simulator
 about.js
=========================================================*/

import Router from "../js/core/router.js";
import EventBus from "../js/core/event-bus.js";
import Analytics from "../js/core/analytics.js";
import Audio from "./audio.js";
import Utils from "../js/core/utils.js";
import CONFIG from "../js/core/config.js";

class About {

    constructor() {

        this.id = "about";

    }

    /*=====================================================
      RENDER
    =====================================================*/

    render() {

        return `

<section id="about-screen" class="section hidden">

<div class="card about-card">

<div class="center">

<img
src="images/logo.png"
alt="Bellacosa Mainframe"
class="about-logo">

<h1>

☕

${CONFIG.APP.NAME}

</h1>

<h3>

Versão ${CONFIG.APP.VERSION}

</h3>

<p>

Laboratório gamificado para ensinar
Java no IBM Z utilizando analogias
com COBOL e o ecossistema Mainframe.

</p>

</div>

<hr>

<h2>

🎯 Objetivo

</h2>

<p>

Ajudar programadores COBOL a compreender
Java de maneira simples, prática e divertida.

</p>

<h2>

🚀 Tecnologias

</h2>

<div class="grid grid-2">

<div>

<ul>

<li>HTML5</li>

<li>CSS3</li>

<li>JavaScript ES Modules</li>

<li>JSON</li>

<li>LocalStorage</li>

</ul>

</div>

<div>

<ul>

<li>IBM Z</li>

<li>Enterprise COBOL</li>

<li>Java</li>

<li>CICS</li>

<li>Db2</li>

</ul>

</div>

</div>

<h2>

🎮 Recursos

</h2>

<ul>

<li>Gamificação</li>

<li>Sistema de XP</li>

<li>Achievements</li>

<li>Boss Battle</li>

<li>Timeline</li>

<li>Quiz</li>

<li>Terminal IBM Z</li>

<li>Arquitetura Interativa</li>

<li>SEO Completo</li>

</ul>

<h2>

👨‍💻 Autor

</h2>

<p>

<strong>

Vagner Bellacosa

</strong>

</p>

<p>

Especialista IBM Mainframe

</p>

<p>

IBM Champion

</p>

<p>

Criador do projeto

<strong>

Bellacosa Mainframe

</strong>

</p>

<hr>

<div class="center">

<button
id="btnAboutHome"
class="btn btn-primary">

🏠 Início

</button>

<button
id="btnAboutCredits"
class="btn btn-success">

🎬 Créditos

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

            "about_open"

        );

        Audio.play("click");

        this.bindEvents();

    }

    /*=====================================================
      EVENTS
    =====================================================*/

    bindEvents() {

        Utils.$(

            "#btnAboutHome"

        )?.addEventListener(

            "click",

            () => {

                Router.go(

                    "startup"

                );

            }

        );

        Utils.$(

            "#btnAboutCredits"

        )?.addEventListener(

            "click",

            () => {

                Router.go(

                    "credits"

                );

            }

        );

    }

    /*=====================================================
      SHOW
    =====================================================*/

    show() {

        Utils.$(

            "#about-screen"

        )?.classList.remove(

            "hidden"

        );

        EventBus.emit(

            "about:show"

        );

    }

    /*=====================================================
      HIDE
    =====================================================*/

    hide() {

        Utils.$(

            "#about-screen"

        )?.classList.add(

            "hidden"

        );

    }

    /*=====================================================
      DESTROY
    =====================================================*/

    destroy() {

        Analytics.event(

            "about_close"

        );

    }

}

export default new About();