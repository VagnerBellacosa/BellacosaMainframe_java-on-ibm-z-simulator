/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 confetti.js
=========================================================*/

import EventBus from "../js/core/event-bus.js";

class ConfettiManager {

    constructor() {

        this.canvas = null;
        this.ctx = null;

        this.particles = [];

        this.running = false;

        this.colors = [

            "#00D9FF",
            "#00FF9D",
            "#FFD34D",
            "#FF5B6B",
            "#FFFFFF"

        ];

        this.listeners();

    }

    /*=====================================================*/

    listeners() {

        EventBus.on("confetti:start", () => {

            this.start();

        });

        EventBus.on("confetti:stop", () => {

            this.stop();

        });

    }

    /*=====================================================*/

    init() {

        this.canvas = document.createElement("canvas");

        this.canvas.id = "confettiCanvas";

        this.canvas.style.position = "fixed";
        this.canvas.style.inset = "0";
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.canvas.style.pointerEvents = "none";
        this.canvas.style.zIndex = "99999";

        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");

        this.resize();

        window.addEventListener(

            "resize",

            () => this.resize()

        );

    }

    /*=====================================================*/

    resize() {

        this.canvas.width = window.innerWidth;

        this.canvas.height = window.innerHeight;

    }

    /*=====================================================*/

    start(count = 200) {

        if (!this.canvas) {

            this.init();

        }

        this.particles = [];

        for (let i = 0; i < count; i++) {

            this.particles.push(

                this.createParticle()

            );

        }

        this.running = true;

        this.animate();

    }

    /*=====================================================*/

    stop() {

        this.running = false;

        this.particles = [];

        this.ctx.clearRect(

            0,
            0,
            this.canvas.width,
            this.canvas.height

        );

    }

    /*=====================================================*/

    createParticle() {

        return {

            x: Math.random() * this.canvas.width,

            y: -20 - Math.random() * 300,

            size: 4 + Math.random() * 8,

            speedY: 2 + Math.random() * 5,

            speedX: -2 + Math.random() * 4,

            rotation: Math.random() * 360,

            rotationSpeed:

                -6 + Math.random() * 12,

            color:

                this.colors[

                    Math.floor(

                        Math.random() *

                        this.colors.length

                    )

                ]

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

        this.particles.forEach(p => {

            p.x += p.speedX;

            p.y += p.speedY;

            p.rotation += p.rotationSpeed;

            this.drawParticle(p);

        });

        this.particles = this.particles.filter(

            p => p.y < this.canvas.height + 30

        );

        if (this.particles.length === 0) {

            this.stop();

            return;

        }

        requestAnimationFrame(

            () => this.animate()

        );

    }

    /*=====================================================*/

    drawParticle(p) {

        this.ctx.save();

        this.ctx.translate(

            p.x,

            p.y

        );

        this.ctx.rotate(

            p.rotation *

            Math.PI / 180

        );

        this.ctx.fillStyle = p.color;

        this.ctx.fillRect(

            -p.size / 2,

            -p.size / 2,

            p.size,

            p.size

        );

        this.ctx.restore();

    }

    /*=====================================================*/

    burst(x, y, count = 80) {

        if (!this.canvas) {

            this.init();

        }

        for (let i = 0; i < count; i++) {

            const angle =

                Math.random() *

                Math.PI * 2;

            const speed =

                2 +

                Math.random() * 6;

            this.particles.push({

                x,

                y,

                size:

                    4 +

                    Math.random() * 6,

                speedX:

                    Math.cos(angle) * speed,

                speedY:

                    Math.sin(angle) * speed,

                rotation:0,

                rotationSpeed:

                    -8 +

                    Math.random() * 16,

                color:

                    this.colors[

                        Math.floor(

                            Math.random() *

                            this.colors.length

                        )

                    ]

            });

        }

        this.running = true;

        this.animate();

    }

}

const confetti = new ConfettiManager();

export default confetti;