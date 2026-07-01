/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 screens/startup.js
=========================================================*/

import Router from "../router.js";
import EventBus from "../event-bus.js";
import Audio from "../audio.js";
import Analytics from "../analytics.js";
import Utils from "../utils.js";

class StartupScreen {

    constructor() {

        this.id = "startup";

        this.lines = [

            "IPLINFO  IBM z/OS 3.2 Initialization",
            "Loading JES2...",
            "Loading TCP/IP...",
            "Loading USS...",
            "Initializing IBM Semeru Runtime...",
            "Loading Java Virtual Machine...",
            "Connecting to Db2...",
            "Connecting to CICS...",
            "Connecting to IBM MQ...",
            "Loading Bellacosa Mainframe Labs...",
            "Environment Ready ✔"

        ];

        this.speed = 550;

    }

    /*====================================================*/

    render() {

        return `

<section id="startup-screen"
         class="hero">

    <div class="terminal-card panel">

        <div class="terminal-header">

            <span>

                IBM Z SYSTEM CONSOLE

            </span>

            <span>

                Java Runtime

            </span>

        </div>

        <pre id="startupLog"></pre>

        <div class="progress mt-4">

            <div class="progress-track">

                <div id="startupProgress"

                     class="progress-fill">

                </div>

            </div>

        </div>

    </div>

</section>

`;

    }

    /*====================================================*/

    async init() {

        Analytics.event("startup");

        Audio.play("boot");

        const log =

            document.querySelector(

                "#startupLog"

            );

        const progress =

            document.querySelector(

                "#startupProgress"

            );

        for (

            let i = 0;

            i < this.lines.length;

            i++

        ) {

            log.textContent +=

                this.lines[i] + "\n";

            log.scrollTop =

                log.scrollHeight;

            progress.style.width =

                ((i + 1)

                / this.lines.length)

                * 100 + "%";

            await Utils.sleep(

                this.speed

            );

        }

        await Utils.sleep(900);

        EventBus.emit(

            "startup:finished"

        );

        Router.go("intro");

    }

    /*====================================================*/

    show() {

        document

            .querySelector(

                "#startup-screen"

            )

            ?.classList

            .remove("hidden");

    }

    /*====================================================*/

    hide() {

        document

            .querySelector(

                "#startup-screen"

            )

            ?.classList

            .add("hidden");

    }

}

export default new StartupScreen();