/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 utils.js
=========================================================*/

class Utils {

    /*=====================================================
      DOM
    =====================================================*/

    $(selector, parent = document) {

        return parent.querySelector(selector);

    }

    $$(selector, parent = document) {

        return [...parent.querySelectorAll(selector)];

    }

    create(tag, className = "") {

        const element = document.createElement(tag);

        if (className) {

            element.className = className;

        }

        return element;

    }

    /*=====================================================
      NÚMEROS
    =====================================================*/

    random(min, max) {

        return Math.floor(

            Math.random() * (max - min + 1)

        ) + min;

    }

    randomFloat(min, max) {

        return Math.random() * (max - min) + min;

    }

    clamp(value, min, max) {

        return Math.max(

            min,

            Math.min(max, value)

        );

    }

    lerp(start, end, amount) {

        return start + (end - start) * amount;

    }

    percent(value, total) {

        if (total === 0) return 0;

        return Math.round(

            (value / total) * 100

        );

    }

    /*=====================================================
      TEMPO
    =====================================================*/

    sleep(ms) {

        return new Promise(resolve => {

            setTimeout(resolve, ms);

        });

    }

    formatTime(seconds) {

        const m =

            Math.floor(seconds / 60);

        const s =

            seconds % 60;

        return `${m}:${String(s).padStart(2, "0")}`;

    }

    /*=====================================================
      STRINGS
    =====================================================*/

    capitalize(text = "") {

        return

            text.charAt(0)

            .toUpperCase()

            +

            text.slice(1);

    }

    slug(text = "") {

        return text

            .toLowerCase()

            .normalize("NFD")

            .replace(/[\u0300-\u036f]/g, "")

            .replace(/\s+/g, "-")

            .replace(/[^\w-]/g, "");

    }

    /*=====================================================
      ARRAYS
    =====================================================*/

    shuffle(array) {

        const copy = [...array];

        for (

            let i = copy.length - 1;

            i > 0;

            i--

        ) {

            const j =

                Math.floor(

                    Math.random() * (i + 1)

                );

            [

                copy[i],

                copy[j]

            ] = [

                copy[j],

                copy[i]

            ];

        }

        return copy;

    }

    choice(array = []) {

        return array[

            this.random(

                0,

                array.length - 1

            )

        ];

    }

    /*=====================================================
      OBJETOS
    =====================================================*/

    clone(obj) {

        return structuredClone(obj);

    }

    merge(a, b) {

        return {

            ...a,

            ...b

        };

    }

    /*=====================================================
      IDs
    =====================================================*/

    uuid() {

        return

            Date.now().toString(36)

            +

            Math.random()

                .toString(36)

                .substring(2, 10);

    }

    /*=====================================================
      CORES
    =====================================================*/

    randomColor() {

        const colors = [

            "#00D9FF",

            "#00FF9D",

            "#FFD34D",

            "#FF5B6B",

            "#FFFFFF"

        ];

        return this.choice(colors);

    }

    /*=====================================================
      ANIMAÇÃO
    =====================================================*/

    fadeIn(element) {

        if (!element) return;

        element.style.opacity = 0;

        element.style.display = "";

        requestAnimationFrame(() => {

            element.style.transition =

                "opacity .4s";

            element.style.opacity = 1;

        });

    }

    fadeOut(element) {

        if (!element) return;

        element.style.transition =

            "opacity .4s";

        element.style.opacity = 0;

        setTimeout(() => {

            element.style.display = "none";

        }, 400);

    }

    /*=====================================================
      DEBOUNCE
    =====================================================*/

    debounce(fn, delay = 300) {

        let timer;

        return (...args) => {

            clearTimeout(timer);

            timer = setTimeout(() => {

                fn(...args);

            }, delay);

        };

    }

    /*=====================================================
      THROTTLE
    =====================================================*/

    throttle(fn, delay = 100) {

        let waiting = false;

        return (...args) => {

            if (waiting) return;

            waiting = true;

            fn(...args);

            setTimeout(() => {

                waiting = false;

            }, delay);

        };

    }

    /*=====================================================
      DOWNLOAD JSON
    =====================================================*/

    download(name, data) {

        const blob = new Blob(

            [

                JSON.stringify(

                    data,

                    null,

                    2

                )

            ],

            {

                type: "application/json"

            }

        );

        const url =

            URL.createObjectURL(blob);

        const link =

            document.createElement("a");

        link.href = url;

        link.download = name;

        link.click();

        URL.revokeObjectURL(url);

    }

    /*=====================================================
      LOG
    =====================================================*/

    log(...args) {

        console.log(

            "[Bellacosa]",

            ...args

        );

    }

}

const utils = new Utils();

export default utils;