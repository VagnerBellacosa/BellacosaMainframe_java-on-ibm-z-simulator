/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z Simulator
 glossary.js
=========================================================*/

import EventBus from "../js/core/event-bus.js";
import Analytics from "../js/core/analytics.js";
import Storage from "../js/core/storage.js";
import Utils from "./utils.js";
import CONFIG from "../js/core/config.js";

class Glossary {

    constructor() {

        this.data = [];

        this.filtered = [];

        this.container = null;

    }

    /*=====================================================
      LOAD
    =====================================================*/

    async load() {

        try {

            const response = await fetch(

                CONFIG.DATA.GLOSSARY

            );

            const json = await response.json();

            this.data = json.entries || [];

            this.filtered = [...this.data];

        }

        catch (e) {

            console.error(

                "Erro carregando glossary:",

                e

            );

        }

    }

    /*=====================================================
      INIT
    =====================================================*/

    async init(container = "#glossary") {

        this.container =

            document.querySelector(container);

        if (!this.container) return;

        await this.load();

        this.render();

        this.bindEvents();

    }

    /*=====================================================
      RENDER
    =====================================================*/

    render() {

        this.container.innerHTML = `

<div class="glossary">

<div class="glossary-search">

<input

id="glossarySearch"

type="search"

placeholder="Pesquisar termo...">

</div>

<div id="glossaryList"

class="glossary-list">

${this.renderList()}

</div>

</div>

`;

    }

    renderList() {

        return this.filtered.map(term => `

<div class="glossary-item"

data-term="${term.term}">

<h3>

${term.term}

</h3>

<small>

${term.category}

</small>

</div>

`).join("");

    }

    /*=====================================================
      EVENTS
    =====================================================*/

    bindEvents() {

        Utils.$(

            "#glossarySearch"

        )?.addEventListener(

            "input",

            e =>

            this.search(

                e.target.value

            )

        );

        this.bindItems();

    }

    bindItems() {

        Utils.$$(".glossary-item")

        .forEach(item => {

            item.addEventListener(

                "click",

                () =>

                this.open(

                    item.dataset.term

                )

            );

        });

    }

    /*=====================================================
      SEARCH
    =====================================================*/

    search(text) {

        text =

            text.toLowerCase();

        this.filtered =

            this.data.filter(

                t =>

                t.term

                .toLowerCase()

                .includes(text)

            );

        Utils.$(

            "#glossaryList"

        ).innerHTML =

            this.renderList();

        this.bindItems();

    }

    /*=====================================================
      OPEN
    =====================================================*/

    open(termName) {

        const term =

            this.data.find(

                t =>

                t.term === termName

            );

        if (!term) return;

        Analytics.event(

            "glossary_open",

            term.term

        );

        Storage.set(

            "lastGlossary",

            term.term

        );

        EventBus.emit(

            "glossary:open",

            term

        );

        alert(

`${term.term}

------------------------

Categoria:

${term.category}

Descrição:

${term.definition}

Equivalente COBOL:

${term.cobolEquivalent}

Exemplo:

${term.example}`

        );

    }

    /*=====================================================
      CATEGORY
    =====================================================*/

    filter(category) {

        this.filtered =

            this.data.filter(

                t =>

                t.category === category

            );

        Utils.$(

            "#glossaryList"

        ).innerHTML =

            this.renderList();

        this.bindItems();

    }

    /*=====================================================
      CLEAR
    =====================================================*/

    clear() {

        this.filtered =

            [...this.data];

        Utils.$(

            "#glossaryList"

        ).innerHTML =

            this.renderList();

        this.bindItems();

    }

    /*=====================================================
      RANDOM
    =====================================================*/

    random() {

        return this.data[

            Math.floor(

                Math.random()

                * this.data.length

            )

        ];

    }

    /*=====================================================
      COUNT
    =====================================================*/

    count() {

        return this.data.length;

    }

}

export default new Glossary();