/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 screens/timeline.js
=========================================================*/

import Router from "../router.js";
import EventBus from "../event-bus.js";
import XPManager from "../xp-manager.js";
import Analytics from "../analytics.js";
import Storage from "../storage.js";
import Audio from "../audio.js";
import Utils from "../utils.js";

class TimelineScreen{

    constructor(){

        this.id="timeline";

        this.data=null;

        this.current=0;

        this.visited=new Set();

        this.progress=null;

    }

    /*=====================================================*/

    async load(){

        const response=
            await fetch(
                "data/timeline.json"
            );

        this.data=
            await response.json();

    }

    /*=====================================================*/

    render(){

        if(!this.data) return "";

        const html=

            this.data.steps.map(step=>`

<div class="timeline-item ${step.order===1?"active":""}"

     data-id="${step.id}"

     data-order="${step.order}">

    <div class="timeline-dot"></div>

    <div class="timeline-content">

        <div class="timeline-icon">

            ${step.icon}

        </div>

        <span class="timeline-date">

            Etapa ${step.order}

        </span>

        <h3 class="timeline-title">

            ${step.title}

        </h3>

        <h5>

            ${step.subtitle}

        </h5>

        <p class="timeline-text">

            ${step.description}

        </p>

        <div class="timeline-badge">

            ⭐ ${step.xp} XP

            •

            ⏱ ${step.duration}s

        </div>

    </div>

</div>

`).join("");

        return `

<section id="timeline-screen"

         class="section hidden">

    <div class="section-title">

        <h2>

            🗺 Jornada Java no IBM Z

        </h2>

        <p>

            Explore todas as etapas para
            desbloquear sua missão.

        </p>

    </div>

    <div class="timeline">

        <div class="timeline-progress"

             id="timelineProgress">

        </div>

        ${html}

    </div>

    <div class="center mt-5">

        <button

            id="btnTimelineContinue"

            class="btn btn-primary hidden">

            Continuar →

        </button>

    </div>

</section>

`;

    }

    /*=====================================================*/

    async init(){

        await this.load();

        Analytics.event(

            "timeline_loaded"

        );

        this.progress=

            Utils.$(

                "#timelineProgress"

            );

        this.bindEvents();

    }

    /*=====================================================*/

    bindEvents(){

        Utils.$$(".timeline-item")

        .forEach(item=>{

            item.addEventListener(

                "click",

                ()=>this.open(item)

            );

        });

        Utils.$(

            "#btnTimelineContinue"

        )?.addEventListener(

            "click",

            ()=>{

                Router.go(

                    "mapping"

                );

            }

        );

    }

    /*=====================================================*/

    open(card){

        const id=

            card.dataset.id;

        const step=

            this.data.steps.find(

                s=>s.id===id

            );

        if(!step) return;

        Audio.play("click");

        Analytics.event(

            "timeline_step"

        );

        this.visited.add(id);

        card.classList.add(

            "completed"

        );

        card.classList.remove(

            "active"

        );

        XPManager.add(

            step.xp

        );

        this.updateProgress();

        this.showPopup(step);

        if(

            this.visited.size===

            this.data.steps.length

        ){

            this.finish();

        }

    }

    /*=====================================================*/

    showPopup(step){

        alert(

`${step.icon} ${step.title}

---------------------------------

${step.description}

XP ganho: ${step.xp}`

        );

    }

    /*=====================================================*/

    updateProgress(){

        const percent=

            (this.visited.size/

            this.data.steps.length)

            *100;

        if(this.progress){

            this.progress.style.height=

                percent+"%";

        }

    }

    /*=====================================================*/

    finish(){

        Storage.set(

            "timelineCompleted",

            true

        );

        XPManager.add(500);

        Audio.play("victory");

        Analytics.event(

            "timeline_completed"

        );

        EventBus.emit(

            "timeline:completed"

        );

        Utils.$(

            "#btnTimelineContinue"

        )?.classList.remove(

            "hidden"

        );

    }

    /*=====================================================*/

    show(){

        Utils.$(

            "#timeline-screen"

        )?.classList.remove(

            "hidden"

        );

    }

    /*=====================================================*/

    hide(){

        Utils.$(

            "#timeline-screen"

        )?.classList.add(

            "hidden"

        );

    }

    /*=====================================================*/

    destroy(){

        this.visited.clear();

        this.current=0;

    }

}

export default new TimelineScreen();