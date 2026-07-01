/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 screens/mapping.js
=========================================================*/

import Router from "../router.js";
import EventBus from "../event-bus.js";
import XPManager from "../xp-manager.js";
import Analytics from "../analytics.js";
import Storage from "../storage.js";
import Audio from "../audio.js";
import Utils from "../utils.js";

class MappingScreen {

    constructor() {

        this.id = "mapping";

        this.xpEarned = false;

        this.items = [

            {
                cobol: "PROGRAM-ID",
                java: "class",
                icon: "📦"
            },

            {
                cobol: "PERFORM",
                java: "method",
                icon: "⚙"
            },

            {
                cobol: "Working-Storage",
                java: "Class Fields",
                icon: "🧠"
            },

            {
                cobol: "Local-Storage",
                java: "Local Variables",
                icon: "📄"
            },

            {
                cobol: "CALL",
                java: "Method Call",
                icon: "📞"
            },

            {
                cobol: "COPY",
                java: "import",
                icon: "📚"
            },

            {
                cobol: "EXEC SQL",
                java: "JDBC",
                icon: "💾"
            },

            {
                cobol: "CICS LINK",
                java: "REST API",
                icon: "🌐"
            },

            {
                cobol: "JCL",
                java: "Maven / Gradle",
                icon: "🚀"
            },

            {
                cobol: "Load Module",
                java: ".class",
                icon: "☕"
            }

        ];

    }

    /*=====================================================*/

    render() {

        const cards =

            this.items.map(item => `

<div class="card mapping-card">

    <div class="mapping-icon">

        ${item.icon}

    </div>

    <div class="mapping-left">

        <h3>

            ${item.cobol}

        </h3>

        <small>

            COBOL

        </small>

    </div>

    <div class="mapping-arrow">

        ➜

    </div>

    <div class="mapping-right">

        <h3>

            ${item.java}

        </h3>

        <small>

            Java

        </small>

    </div>

</div>

`).join("");

        return `

<section id="mapping-screen"
         class="section hidden">

<div class="section-title">

<h2>

🗺 Tradutor Mental

</h2>

<p>

Tudo o que você já conhece em COBOL
possui um equivalente em Java.

</p>

</div>

<div class="grid">

${cards}

</div>

<div class="center mt-5">

<button
id="btnMappingContinue"
class="btn btn-primary">

Continuar Jornada →

</button>

</div>

</section>

`;

    }

    /*=====================================================*/

    init() {

        this.bindEvents();

        Analytics.event(

            "mapping_loaded"

        );

    }

    /*=====================================================*/

    bindEvents() {

        const button =

            Utils.$(

                "#btnMappingContinue"

            );

        button?.addEventListener(

            "click",

            () => this.finish()

        );

        Utils.$$(".mapping-card")

        .forEach(card => {

            card.addEventListener(

                "click",

                () => this.flip(card)

            );

        });

    }

    /*=====================================================*/

    flip(card) {

        card.classList.toggle(

            "pulse"

        );

        Audio.play("click");

        Analytics.event(

            "mapping_card"

        );

        setTimeout(

            () =>

            card.classList.remove(

                "pulse"

            ),

            500

        );

    }

    /*=====================================================*/

    finish() {

        if (!this.xpEarned) {

            XPManager.add(150);

            this.xpEarned = true;

        }

        Storage.set(

            "mappingCompleted",

            true

        );

        Analytics.event(

            "mapping_completed"

        );

        EventBus.emit(

            "mapping:completed"

        );

        Audio.play("success");

        Router.go("architecture");

    }

    /*=====================================================*/

    show() {

        Utils.$(

            "#mapping-screen"

        )?.classList.remove(

            "hidden"

        );

    }

    /*=====================================================*/

    hide() {

        Utils.$(

            "#mapping-screen"

        )?.classList.add(

            "hidden"

        );

    }

}

export default new MappingScreen();