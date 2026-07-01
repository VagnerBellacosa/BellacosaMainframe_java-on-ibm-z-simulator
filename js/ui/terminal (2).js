/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 terminal.js
=========================================================*/

import { CONFIG, TERMINAL_MESSAGES } from "./core/config.js";
import EventBus from "./core/event-bus.js";

class Terminal {

    constructor() {

        this.element = null;

        this.cursor = CONFIG.TERMINAL.CURSOR;

        this.speed = CONFIG.TERMINAL.SPEED;

        this.queue = [];

        this.running = false;

        this.history = [];

    }

    /*=====================================================*/

    init() {

        this.element = document.querySelector(
            CONFIG.SELECTORS.TERMINAL
        );

        if (!this.element) {

            console.warn("Terminal não encontrado.");

            return;

        }

        EventBus.on(CONFIG.EVENTS.SCREEN, ({ route }) => {

            if (route === "terminal") {

                this.startBoot();

            }

        });

    }

    /*=====================================================*/

    clear() {

        this.element.textContent = "";

        this.history = [];

    }

    /*=====================================================*/

    print(text = "") {

        this.history.push(text);

        this.element.textContent =
            this.history.join("\n");

    }

    /*=====================================================*/

    async println(text) {

        await this.type(text);

        this.history.push("");

        this.element.textContent =
            this.history.join("\n");

    }

    /*=====================================================*/

    async type(text) {

        this.running = true;

        this.history.push("");

        const index = this.history.length - 1;

        for (const letter of text) {

            this.history[index] += letter;

            this.render();

            await this.wait(this.speed);

        }

        this.running = false;

    }

    /*=====================================================*/

    render() {

        this.element.textContent =
            this.history.join("\n") +
            "\n" +
            this.cursor;

    }

    /*=====================================================*/

    wait(ms) {

        return new Promise(resolve => {

            setTimeout(resolve, ms);

        });

    }

    /*=====================================================*/

    async startBoot() {

        this.clear();

        for (const line of CONFIG.TERMINAL.STARTUP) {

            await this.println(line);

            await this.wait(250);

        }

        await this.wait(400);

        await this.println("");

        await this.println("READY");

        EventBus.emit("terminal:ready");

    }

    /*=====================================================*/

    async demo() {

        this.clear();

        for (const line of TERMINAL_MESSAGES) {

            await this.println(line);

            await this.wait(500);

        }

    }

    /*=====================================================*/

    async execute(command) {

        command = command.trim().toUpperCase();

        await this.println("> " + command);

        switch (command) {

            case "HELP":

                await this.println("Comandos:");

                await this.println("HELP");

                await this.println("CLEAR");

                await this.println("DISPLAY JVM");

                await this.println("CALL JAVA");

                await this.println("ABOUT");

                break;

            case "CLEAR":

                this.clear();

                break;

            case "DISPLAY JVM":

                await this.println("JVM STATUS");

                await this.println("RUNNING");

                await this.println("HEAP OK");

                await this.println("THREADS OK");

                break;

            case "CALL JAVA":

                await this.println("Loading Class...");

                await this.println("Creating Object...");

                await this.println("Executing Method...");

                await this.println("Mission Successful.");

                break;

            case "ABOUT":

                await this.println(CONFIG.APP.NAME);

                await this.println(CONFIG.APP.VERSION);

                await this.println(CONFIG.APP.AUTHOR);

                break;

            default:

                await this.println(

                    "COMMAND NOT FOUND"

                );

        }

    }

    /*=====================================================*/

    async simulateCompile() {

        await this.println("");

        await this.println("Compiling...");

        await this.wait(600);

        await this.println("Generating Bytecode...");

        await this.wait(600);

        await this.println("Optimizing JVM...");

        await this.wait(600);

        await this.println("Build Successful.");

    }

    /*=====================================================*/

    async simulateDatabase() {

        await this.println("");

        await this.println("Connecting DB2...");

        await this.wait(500);

        await this.println("SQLCODE = 000");

        await this.wait(400);

        await this.println("Connection Established.");

    }

    /*=====================================================*/

    async simulateCICS() {

        await this.println("");

        await this.println("Connecting CICS...");

        await this.wait(500);

        await this.println("Transaction Started");

        await this.wait(500);

        await this.println("Task Completed");

    }

}

const terminal = new Terminal();

export default terminal;