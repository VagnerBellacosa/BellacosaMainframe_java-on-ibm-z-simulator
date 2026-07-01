/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 screens/architecture.js
=========================================================*/

import Router from "../router.js";
import EventBus from "../event-bus.js";
import XPManager from "../xp-manager.js";
import Analytics from "../analytics.js";
import Storage from "../storage.js";
import Audio from "../audio.js";
import Utils from "../utils.js";

class ArchitectureScreen {

    constructor(){

        this.id="architecture";

        this.data=null;

        this.visited=new Set();

        this.xpAwarded=false;

    }

    /*=====================================================*/

    async load(){

        const response=

            await fetch(

                "data/architecture.json"

            );

        this.data=

            await response.json();

    }

    /*=====================================================*/

    render(){

        if(!this.data) return "";

        const layers=

            this.data.layers.map(layer=>`

<div class="card architecture-card"
     data-id="${layer.id}">

    <div class="card-header">

        <div class="card-icon">

            ${layer.icon}

        </div>

        <div>

            <h3>

                ${layer.title}

            </h3>

            <small>

                ${layer.description}

            </small>

        </div>

    </div>

</div>

`).join("");

        return `

<section id="architecture-screen"
         class="section hidden">

    <div class="section-title">

        <h2>

            🏛 Arquitetura Java no IBM Z

        </h2>

        <p>

            Clique em cada camada
            para descobrir seu papel.

        </p>

    </div>

    <div class="grid">

        ${layers}

    </div>

    <div class="center mt-5">

        <button
            id="btnArchitectureNext"

            class="btn btn-primary hidden">

            Próxima Etapa →

        </button>

    </div>

</section>

`;

    }

    /*=====================================================*/

    async init(){

        await this.load();

        Analytics.event(

            "architecture_loaded"

        );

        this.bindEvents();

    }

    /*=====================================================*/

    bindEvents(){

        Utils.$$(".architecture-card")

        .forEach(card=>{

            card.addEventListener(

                "click",

                ()=>this.open(card)

            );

        });

        Utils.$(

            "#btnArchitectureNext"

        )?.addEventListener(

            "click",

            ()=>this.finish()

        );

    }

    /*=====================================================*/

    open(card){

        const id=

            card.dataset.id;

        const layer=

            this.data.layers.find(

                l=>l.id===id

            );

        if(!layer)return;

        Audio.play("click");

        Analytics.event(

            "architecture_open"

        );

        this.visited.add(id);

        card.classList.add(

            "glow"

        );

        const components=

            layer.components

            .map(

                c=>`• ${c.name}`

            )

            .join("\n");

        alert(

`${layer.title}

${layer.description}

--------------------

${components}`

        );

        if(

            this.visited.size===

            this.data.layers.length

        ){

            this.unlock();

        }

    }

    /*=====================================================*/

    unlock(){

        if(this.xpAwarded)return;

        this.xpAwarded=true;

        XPManager.add(250);

        Audio.play("success");

        Storage.set(

            "architectureCompleted",

            true

        );

        EventBus.emit(

            "architecture:completed"

        );

        Analytics.event(

            "architecture_completed"

        );

        Utils.$(

            "#btnArchitectureNext"

        )?.classList.remove(

            "hidden"

        );

    }

    /*=====================================================*/

    finish(){

        Router.go(

            "mapping"

        );

    }

    /*=====================================================*/

    show(){

        Utils.$(

            "#architecture-screen"

        )?.classList.remove(

            "hidden"

        );

    }

    /*=====================================================*/

    hide(){

        Utils.$(

            "#architecture-screen"

        )?.classList.add(

            "hidden"

        );

    }

    /*=====================================================*/

    destroy(){

        this.visited.clear();

        this.xpAwarded=false;

    }

}

export default new ArchitectureScreen();