/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 animation.js
=========================================================*/

import EventBus from "./event-bus.js";

class AnimationManager {

    constructor() {

        this.duration = 600;

        this.listeners();

    }

    /*=====================================================*/

    listeners() {

        EventBus.on("ui:levelup", () => {

            this.flash(document.body);

        });

        EventBus.on("boss:show-damage", ({ damage }) => {

            this.damagePopup(damage);

        });

        EventBus.on("ui:xp-popup", ({ text }) => {

            this.popup(text);

        });

    }

    /*=====================================================*/

    fadeIn(element) {

        if (!element) return;

        element.animate([

            {
                opacity: 0
            },
            {
                opacity: 1
            }

        ], {

            duration: this.duration,

            easing: "ease"

        });

    }

    /*=====================================================*/

    fadeOut(element) {

        if (!element) return;

        element.animate([

            {
                opacity: 1
            },
            {
                opacity: 0
            }

        ], {

            duration: this.duration

        });

    }

    /*=====================================================*/

    slideUp(element) {

        if (!element) return;

        element.animate([

            {

                opacity: 0,

                transform:
                    "translateY(40px)"

            },

            {

                opacity: 1,

                transform:
                    "translateY(0)"

            }

        ], {

            duration: 500,

            easing: "ease-out"

        });

    }

    /*=====================================================*/

    zoom(element) {

        if (!element) return;

        element.animate([

            {

                transform:
                    "scale(.8)"

            },

            {

                transform:
                    "scale(1)"

            }

        ], {

            duration: 350

        });

    }

    /*=====================================================*/

    pulse(element) {

        if (!element) return;

        element.animate([

            {

                transform:
                    "scale(1)"

            },

            {

                transform:
                    "scale(1.08)"

            },

            {

                transform:
                    "scale(1)"

            }

        ], {

            duration: 500

        });

    }

    /*=====================================================*/

    shake(element) {

        if (!element) return;

        element.animate([

            {

                transform:
                    "translateX(0)"

            },

            {

                transform:
                    "translateX(-10px)"

            },

            {

                transform:
                    "translateX(10px)"

            },

            {

                transform:
                    "translateX(0)"

            }

        ], {

            duration: 400

        });

    }

    /*=====================================================*/

    glow(element) {

        if (!element) return;

        element.animate([

            {

                filter:
                    "brightness(1)"

            },

            {

                filter:
                    "brightness(1.6)"

            },

            {

                filter:
                    "brightness(1)"

            }

        ], {

            duration: 700

        });

    }

    /*=====================================================*/

    flash(element) {

        if (!element) return;

        element.animate([

            {

                backgroundColor:
                    "rgba(255,255,255,0)"

            },

            {

                backgroundColor:
                    "rgba(255,255,255,.15)"

            },

            {

                backgroundColor:
                    "rgba(255,255,255,0)"

            }

        ], {

            duration: 450

        });

    }

    /*=====================================================*/

    count(element, start, end) {

        if (!element) return;

        const duration = 800;

        const increment =
            (end - start) / 40;

        let value = start;

        const timer =
            setInterval(() => {

                value += increment;

                if (value >= end) {

                    value = end;

                    clearInterval(timer);

                }

                element.textContent =
                    Math.round(value);

            }, duration / 40);

    }

    /*=====================================================*/

    progress(bar, percent) {

        if (!bar) return;

        bar.animate([

            {

                width:
                    bar.style.width

            },

            {

                width:
                    percent + "%"

            }

        ], {

            duration: 500,

            fill: "forwards"

        });

    }

    /*=====================================================*/

    popup(text) {

        const div =
            document.createElement("div");

        div.className = "floating-xp";

        div.textContent = text;

        document.body.appendChild(div);

        div.animate([

            {

                opacity: 0,

                transform:
                    "translateY(20px)"

            },

            {

                opacity: 1,

                transform:
                    "translateY(-20px)"

            },

            {

                opacity: 0,

                transform:
                    "translateY(-80px)"

            }

        ], {

            duration: 1500,

            easing: "ease-out"

        });

        setTimeout(() => {

            div.remove();

        }, 1500);

    }

    /*=====================================================*/

    damagePopup(value) {

        this.popup("-" + value);

    }

    /*=====================================================*/

    rotate(element) {

        if (!element) return;

        element.animate([

            {

                transform:
                    "rotate(0deg)"

            },

            {

                transform:
                    "rotate(360deg)"

            }

        ], {

            duration: 600

        });

    }

    /*=====================================================*/

    bounce(element) {

        if (!element) return;

        element.animate([

            {

                transform:
                    "translateY(0)"

            },

            {

                transform:
                    "translateY(-25px)"

            },

            {

                transform:
                    "translateY(0)"

            }

        ], {

            duration: 700

        });

    }

    /*=====================================================*/

    float(element) {

        if (!element) return;

        element.animate([

            {

                transform:
                    "translateY(0)"

            },

            {

                transform:
                    "translateY(-12px)"

            },

            {

                transform:
                    "translateY(0)"

            }

        ], {

            duration: 2500,

            iterations: Infinity

        });

    }

}

const animation = new AnimationManager();

export default animation;
