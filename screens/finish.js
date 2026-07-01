/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 screens/finish.js
=========================================================*/

import Router from "../router.js";
import EventBus from "../event-bus.js";
import XPManager from "../xp-manager.js";
import Achievements from "../achievements.js";
import Analytics from "../analytics.js";
import Storage from "../storage.js";
import Audio from "../audio.js";
import Confetti from "../confetti.js";
import Utils from "../utils.js";

class FinishScreen{

    constructor(){

        this.id="finish";

    }

    /*=====================================================*/

    render(){

        return `

<section id="finish-screen"
         class="section hidden">

<div class="section-title">

<h1>

🎉 Missão Cumprida!

</h1>

<p>

Você concluiu o laboratório
Java para IBM Mainframe.

</p>

</div>

<div class="card center">

<div class="certificate-seal pulse">

🎓

</div>

<h2>

Java IBM Z Padawan

</h2>

<p>

Agora você entende como Java
convive com COBOL dentro do
ecossistema IBM Z.

</p>

<div class="grid grid-3 mt-5">

<div class="panel">

<h3 id="finishXP">

0

</h3>

<small>

XP Total

</small>

</div>

<div class="panel">

<h3 id="finishLevel">

1

</h3>

<small>

Nível

</small>

</div>

<div class="panel">

<h3 id="finishAchievements">

0

</h3>

<small>

Conquistas

</small>

</div>

</div>

<div class="mt-5">

<button

id="btnCertificate"

class="btn btn-success">

🎓 Certificado

</button>

<button

id="btnRestart"

class="btn btn-secondary">

🔄 Reiniciar

</button>

<button

id="btnHome"

class="btn btn-primary">

🏠 Início

</button>

</div>

</div>

</section>

`;

    }

    /*=====================================================*/

    init(){

        Audio.play("victory");

        Confetti.fire();

        Analytics.event(

            "finish_loaded"

        );

        Storage.set(

            "courseCompleted",

            true

        );

        Achievements.unlock(

            "java-padawan"

        );

        this.fill();

        this.bindEvents();

    }

    /*=====================================================*/

    bindEvents(){

        Utils.$(

            "#btnCertificate"

        )?.addEventListener(

            "click",

            ()=>{

                Router.go(

                    "certificate"

                );

            }

        );

        Utils.$(

            "#btnRestart"

        )?.addEventListener(

            "click",

            ()=>{

                this.restart();

            }

        );

        Utils.$(

            "#btnHome"

        )?.addEventListener(

            "click",

            ()=>{

                Router.go(

                    "intro"

                );

            }

        );

    }

    /*=====================================================*/

    fill(){

        Utils.$(

            "#finishXP"

        ).textContent=

            XPManager.total();

        Utils.$(

            "#finishLevel"

        ).textContent=

            XPManager.level();

        Utils.$(

            "#finishAchievements"

        ).textContent=

            Achievements.count();

    }

    /*=====================================================*/

    restart(){

        if(

            confirm(

                "Reiniciar todo o laboratório?"

            )

        ){

            Storage.clear();

            EventBus.emit(

                "game:restart"

            );

            Analytics.event(

                "restart"

            );

            location.reload();

        }

    }

    /*=====================================================*/

    show(){

        Utils.$(

            "#finish-screen"

        )?.classList.remove(

            "hidden"

        );

    }

    /*=====================================================*/

    hide(){

        Utils.$(

            "#finish-screen"

        )?.classList.add(

            "hidden"

        );

    }

    /*=====================================================*/

    destroy(){}

}

export default new FinishScreen();