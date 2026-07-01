/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 screens/lab.js
=========================================================*/

import Router from "../router.js";
import EventBus from "../event-bus.js";
import XPManager from "../xp-manager.js";
import Analytics from "../analytics.js";
import Storage from "../storage.js";
import Audio from "../audio.js";
import Utils from "../utils.js";

class LabScreen {

    constructor(){

        this.id="lab";

        this.completed=new Set();

        this.xpGranted=false;

        this.labs=[

            {

                id:"hello",

                icon:"☕",

                title:"Hello Java",

                description:

                "Crie sua primeira classe.",

                xp:100

            },

            {

                id:"variables",

                icon:"📦",

                title:"Variáveis",

                description:

                "Conheça tipos primitivos.",

                xp:100

            },

            {

                id:"methods",

                icon:"⚙",

                title:"Métodos",

                description:

                "Equivalente ao PERFORM.",

                xp:150

            },

            {

                id:"objects",

                icon:"🧩",

                title:"Objetos",

                description:

                "Instancie utilizando new.",

                xp:150

            },

            {

                id:"collections",

                icon:"📚",

                title:"Collections",

                description:

                "ArrayList e Map.",

                xp:200

            },

            {

                id:"db2",

                icon:"💾",

                title:"Java + Db2",

                description:

                "Primeiro acesso JDBC.",

                xp:200

            }

        ];

    }

    /*=====================================================*/

    render(){

        const cards=

        this.labs.map(l=>`

<div class="card lab-card"

     data-id="${l.id}"

     data-xp="${l.xp}">

    <div class="card-header">

        <div class="card-icon">

            ${l.icon}

        </div>

        <div>

            <h3>

                ${l.title}

            </h3>

            <p>

                ${l.description}

            </p>

        </div>

    </div>

    <div class="card-footer">

        <span>

            ⭐ ${l.xp} XP

        </span>

        <button

            class="btn btn-primary btn-run">

            Executar

        </button>

    </div>

</div>

`).join("");

        return `

<section id="lab-screen"

         class="section hidden">

<div class="section-title">

<h2>

🧪 Laboratórios Java

</h2>

<p>

Complete todos os desafios
para desbloquear o Boss.

</p>

</div>

<div class="grid grid-2">

${cards}

</div>

<div class="center mt-5">

<button

id="btnLabContinue"

class="btn btn-success hidden">

Continuar →

</button>

</div>

</section>

`;

    }

    /*=====================================================*/

    init(){

        Analytics.event(

            "lab_loaded"

        );

        this.bindEvents();

    }

    /*=====================================================*/

    bindEvents(){

        Utils.$$(".lab-card")

        .forEach(card=>{

            card.querySelector(

                ".btn-run"

            ).addEventListener(

                "click",

                ()=>this.run(card)

            );

        });

        Utils.$(

            "#btnLabContinue"

        )?.addEventListener(

            "click",

            ()=>{

                Router.go(

                    "quiz"

                );

            }

        );

    }

    /*=====================================================*/

    run(card){

        const id=

            card.dataset.id;

        if(

            this.completed.has(id)

        ) return;

        const xp=

            Number(

                card.dataset.xp

            );

        Audio.play("success");

        XPManager.add(xp);

        Analytics.event(

            "lab_completed"

        );

        EventBus.emit(

            "lab:completed",

            id

        );

        Storage.set(

            "lab-"+id,

            true

        );

        this.completed.add(id);

        card.classList.add(

            "completed"

        );

        card.querySelector(

            ".btn-run"

        ).disabled=true;

        card.querySelector(

            ".btn-run"

        ).textContent="✔ Concluído";

        if(

            this.completed.size===

            this.labs.length

        ){

            this.finish();

        }

    }

    /*=====================================================*/

    finish(){

        if(

            this.xpGranted

        ) return;

        this.xpGranted=true;

        XPManager.add(500);

        Storage.set(

            "labsCompleted",

            true

        );

        Audio.play("victory");

        Analytics.event(

            "labs_finished"

        );

        EventBus.emit(

            "labs:finished"

        );

        Utils.$(

            "#btnLabContinue"

        )?.classList.remove(

            "hidden"

        );

    }

    /*=====================================================*/

    show(){

        Utils.$(

            "#lab-screen"

        )?.classList.remove(

            "hidden"

        );

    }

    /*=====================================================*/

    hide(){

        Utils.$(

            "#lab-screen"

        )?.classList.add(

            "hidden"

        );

    }

    /*=====================================================*/

    destroy(){

        this.completed.clear();

        this.xpGranted=false;

    }

}

export default new LabScreen();