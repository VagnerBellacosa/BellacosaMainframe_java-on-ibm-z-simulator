/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z Simulator
 certificate.js
=========================================================*/

import Router from "./core/router.js";
import EventBus from "./core/event-bus.js";
import XPManager from "./xp-manager.js";
import Achievements from "./achievements.js";
import Analytics from "./core/analytics.js";
import Storage from "./core/storage.js";
import Audio from "./audio.js";
import Confetti from "./confetti.js";
import Utils from "./core/utils.js";
import CONFIG from "./core/config.js";

class Certificate {

    constructor() {

        this.id = "certificate";

    }

    /*=====================================================*/

    render() {

        const date = new Date().toLocaleDateString("pt-BR");

        return `

<section id="certificate-screen"
         class="section hidden">

<div class="certificate">

<div class="certificate-border">

<div class="center">

<img
src="images/logo.png"
alt="Bellacosa Mainframe"
class="certificate-logo">

<h1>

🏆 CERTIFICADO

</h1>

<h2>

Java no IBM Z Simulator

</h2>

<p>

Certificamos que

</p>

<h2 id="certificateName">

Padawan Mainframe

</h2>

<p>

concluiu com sucesso o laboratório gamificado

<strong>

Java no IBM Z

</strong>

demonstrando conhecimentos sobre:

</p>

<div class="certificate-skills">

<span>Java</span>

<span>IBM Z</span>

<span>COBOL</span>

<span>CICS</span>

<span>Db2</span>

<span>MQ</span>

<span>JCL</span>

<span>z/OS</span>

</div>

<div class="certificate-grid">

<div>

<h3>

XP

</h3>

<p id="certificateXP">

0

</p>

</div>

<div>

<h3>

Nível

</h3>

<p id="certificateLevel">

1

</p>

</div>

<div>

<h3>

Conquistas

</h3>

<p id="certificateAchievements">

0

</p>

</div>

</div>

<p>

Emitido em

<strong>

${date}

</strong>

</p>

<p>

Bellacosa Mainframe

</p>

</div>

</div>

<div class="center mt-5">

<button
id="btnPrint"
class="btn btn-success">

🖨 Imprimir

</button>

<button
id="btnSave"
class="btn btn-primary">

💾 Salvar HTML

</button>

<button
id="btnFinish"
class="btn btn-warning">

🏁 Finalizar

</button>

</div>

</section>

`;

    }

    /*=====================================================*/

    init() {

        Analytics.event("certificate_open");

        Audio.play("victory");

        Confetti.fire();

        this.fill();

        this.bindEvents();

    }

    /*=====================================================*/

    fill() {

        const player =

            Storage.get("playerName")

            || "Padawan Mainframe";

        Utils.$("#certificateName").textContent = player;

        Utils.$("#certificateXP").textContent =
            XPManager.total();

        Utils.$("#certificateLevel").textContent =
            XPManager.level();

        Utils.$("#certificateAchievements").textContent =
            Achievements.count();

    }

    /*=====================================================*/

    bindEvents() {

        Utils.$("#btnPrint")

        ?.addEventListener(

            "click",

            ()=>this.print()

        );

        Utils.$("#btnSave")

        ?.addEventListener(

            "click",

            ()=>this.save()

        );

        Utils.$("#btnFinish")

        ?.addEventListener(

            "click",

            ()=>{

                Router.go("finish");

            }

        );

    }

    /*=====================================================*/

    print() {

        window.print();

        Analytics.event(

            "certificate_print"

        );

    }

    /*=====================================================*/

    save() {

        const html = document.documentElement.outerHTML;

        const blob = new Blob(

            [html],

            {type:"text/html"}

        );

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download =

            "certificado-java-ibm-z.html";

        a.click();

        URL.revokeObjectURL(url);

        Analytics.event(

            "certificate_download"

        );

    }

    /*=====================================================*/

    show() {

        Utils.$(

            "#certificate-screen"

        )?.classList.remove(

            "hidden"

        );

        EventBus.emit(

            "certificate:show"

        );

    }

    /*=====================================================*/

    hide() {

        Utils.$(

            "#certificate-screen"

        )?.classList.add(

            "hidden"

        );

    }

    /*=====================================================*/

    destroy() {}

}

export default new Certificate();