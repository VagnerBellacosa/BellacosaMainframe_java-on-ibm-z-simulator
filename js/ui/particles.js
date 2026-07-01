/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 particles.js
=========================================================*/

import { CONFIG } from "../js/core/config.js";
import EventBus from "../js/core/event-bus.js";

class ParticlesManager {

    constructor() {

        this.canvas = null;
        this.ctx = null;

        this.items = [];

        this.running = false;

        this.mouse = {

            x: -9999,
            y: -9999

        };

    }

    /*=====================================================*/

    init() {

        this.createCanvas();

        this.createParticles();

        this.registerEvents();

        this.running = true;

        this.animate();

    }

    /*=====================================================*/

    createCanvas() {

        this.canvas = document.createElement("canvas");

        this.canvas.id = "particlesCanvas";

        Object.assign(this.canvas.style, {

            position: "fixed",

            inset: "0",

            width: "100%",

            height: "100%",

            zIndex: "-1",

            pointerEvents: "none"

        });

        document.body.prepend(this.canvas);

        this.ctx = this.canvas.getContext("2d");

        this.resize();

    }

    /*=====================================================*/

    resize() {

        this.canvas.width = window.innerWidth;

        this.canvas.height = window.innerHeight;

    }

    /*=====================================================*/

    registerEvents() {

        window.addEventListener(

            "resize",

            () => this.resize()

        );

        window.addEventListener(

            "mousemove",

            e => {

                this.mouse.x = e.clientX;

                this.mouse.y = e.clientY;

            }

        );

        EventBus.on(

            "particles:start",

            () => {

                this.running = true;

                this.animate();

            }

        );

        EventBus.on(

            "particles:stop",

            () => {

                this.running = false;

            }

        );

    }

    /*=====================================================*/

    createParticles() {

        this.items = [];

        for (

            let i = 0;

            i < CONFIG.PARTICLES.COUNT;

            i++

        ) {

            this.items.push(

                this.createParticle()

            );

        }

    }

    /*=====================================================*/

    createParticle() {

        return {

            x:

                Math.random() *

                window.innerWidth,

            y:

                Math.random() *

                window.innerHeight,

            vx:

                (Math.random() - .5) *

                CONFIG.PARTICLES.SPEED,

            vy:

                (Math.random() - .5) *

                CONFIG.PARTICLES.SPEED,

            radius:

                CONFIG.PARTICLES.SIZE_MIN +

                Math.random() *

                (

                    CONFIG.PARTICLES.SIZE_MAX -

                    CONFIG.PARTICLES.SIZE_MIN

                ),

            alpha:

                .3 +

                Math.random() * .6

        };

    }

    /*=====================================================*/

    animate() {

        if (!this.running) {

            return;

        }

        this.ctx.clearRect(

            0,

            0,

            this.canvas.width,

            this.canvas.height

        );

        this.update();

        this.draw();

        requestAnimationFrame(

            () => this.animate()

        );

    }

    /*=====================================================*/

    update() {

        this.items.forEach(p => {

            p.x += p.vx;

            p.y += p.vy;

            if (

                p.x < 0 ||

                p.x > this.canvas.width

            ) {

                p.vx *= -1;

            }

            if (

                p.y < 0 ||

                p.y > this.canvas.height

            ) {

                p.vy *= -1;

            }

            const dx =

                this.mouse.x - p.x;

            const dy =

                this.mouse.y - p.y;

            const dist =

                Math.sqrt(

                    dx * dx +

                    dy * dy

                );

            if (dist < 120) {

                p.x -= dx * .01;

                p.y -= dy * .01;

            }

        });

    }

    /*=====================================================*/

    draw() {

        this.drawConnections();

        this.items.forEach(

            particle =>

                this.drawParticle(

                    particle

                )

        );

    }

    /*=====================================================*/

    drawParticle(p) {

        this.ctx.beginPath();

        this.ctx.arc(

            p.x,

            p.y,

            p.radius,

            0,

            Math.PI * 2

        );

        this.ctx.fillStyle =

            `rgba(0,217,255,${p.alpha})`;

        this.ctx.fill();

    }

    /*=====================================================*/

    drawConnections() {

        for (

            let i = 0;

            i < this.items.length;

            i++

        ) {

            for (

                let j = i + 1;

                j < this.items.length;

                j++

            ) {

                const a = this.items[i];

                const b = this.items[j];

                const dx = a.x - b.x;

                const dy = a.y - b.y;

                const dist =

                    Math.sqrt(

                        dx * dx +

                        dy * dy

                    );

                if (dist < 140) {

                    const alpha =

                        1 -

                        dist / 140;

                    this.ctx.beginPath();

                    this.ctx.moveTo(

                        a.x,

                        a.y

                    );

                    this.ctx.lineTo(

                        b.x,

                        b.y

                    );

                    this.ctx.strokeStyle =

                        `rgba(0,217,255,${alpha*.25})`;

                    this.ctx.stroke();

                }

            }

        }

    }

    /*=====================================================*/

    add(x, y) {

        this.items.push({

            x,

            y,

            vx:

                (Math.random()-.5)*2,

            vy:

                (Math.random()-.5)*2,

            radius:4,

            alpha:1

        });

    }

    /*=====================================================*/

    reset() {

        this.createParticles();

    }

    /*=====================================================*/

    stop() {

        this.running = false;

    }

    /*=====================================================*/

    start() {

        if(this.running){

            return;

        }

        this.running = true;

        this.animate();

    }

}

const particles = new ParticlesManager();

export default particles;