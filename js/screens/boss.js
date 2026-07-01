/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 screens/boss.js
=========================================================*/

import Router from "../router.js";
import EventBus from "../event-bus.js";
import BossEngine from "../boss-engine.js";
import XPManager from "../xp-manager.js";
import Analytics from "../analytics.js";
import Achievements from "../achievements.js";
import Storage from "../storage.js";
import Audio from "../audio.js";
import Confetti from "../confetti.js";
import Utils from "../utils.js";

class BossScreen{

    constructor(){

        this.id="boss";

        this.started=false;

        this.finished=false;

    }

    /*=====================================================*/

    render(){

        return `

<section id="boss-screen"
         class="section hidden">

<div class="section-title">

<h2>

👹 Legacy Monster

</h2>

<p>

O último desafio.

Use tudo o que aprendeu
sobre Java no IBM Z.

</p>

</div>

<div class="card">

<div class="center">

<div class="boss-avatar pulse">

👹

</div>

<h2 id="bossName">

Legacy Monster

</h2>

<p>

Sistema legado cheio de
dependências, acoplamento
e código sem documentação.

</p>

</div>

<div class="progress progress-boss mt-5">

<div class="progress-track">

<div id="bossLife"

class="progress-fill"

style="width:100%">

</div>

</div>

</div>

<div class="boss-stats mt-4">

<div class="progress-chip">

❤️ Vida:
<span id="bossHP">

100

</span>

%

</div>

<div class="progress-chip">

⚔ Ataque:
<span id="bossAttack">

0

</span>

</div>

<div class="progress-chip">

⭐ XP:
<span>

1000

</span>

</div>

</div>

<div class="center mt-5">

<button

id="btnAttack"

class="btn btn-danger">

⚔ Atacar

</button>

<button

id="btnSpecial"

class="btn btn-warning">

☕ Java Power

</button>

</div>

<div id="battleLog"

class="terminal mt-5">

Sistema aguardando...

</div>

</div>

</section>

`;

    }

    /*=====================================================*/

    init(){

        Analytics.event(

            "boss_loaded"

        );

        BossEngine.reset();

        this.update();

        this.bindEvents();

    }

    /*=====================================================*/

    bindEvents(){

        Utils.$(

            "#btnAttack"

        )?.addEventListener(

            "click",

            ()=>this.attack()

        );

        Utils.$(

            "#btnSpecial"

        )?.addEventListener(

            "click",

            ()=>this.special()

        );

    }

    /*=====================================================*/

    attack(){

        if(this.finished) return;

        Audio.play("attack");

        const result=

            BossEngine.attack();

        this.log(

            result.message

        );

        this.update();

        Analytics.event(

            "boss_attack"

        );

        if(

            result.victory

        ){

            this.victory();

        }

    }

    /*=====================================================*/

    special(){

        if(this.finished) return;

        Audio.play("power");

        const result=

            BossEngine.special();

        this.log(

            result.message

        );

        this.update();

        Analytics.event(

            "boss_special"

        );

        if(

            result.victory

        ){

            this.victory();

        }

    }

    /*=====================================================*/

    update(){

        const hp=

            BossEngine.life();

        Utils.$(

            "#bossLife"

        ).style.width=

            hp+"%";

        Utils.$(

            "#bossHP"

        ).textContent=

            hp;

        Utils.$(

            "#bossAttack"

        ).textContent=

            BossEngine.turns();

    }

    /*=====================================================*/

    log(message){

        const terminal=

            Utils.$(

                "#battleLog"

            );

        terminal.innerHTML+=

            "<br>"+message;

        terminal.scrollTop=

            terminal.scrollHeight;

    }

    /*=====================================================*/

    victory(){

        this.finished=true;

        Audio.play("victory");

        Confetti.fire();

        XPManager.add(1000);

        Storage.set(

            "bossCompleted",

            true

        );

        Achievements.unlock(

            "boss-defeated"

        );

        Analytics.event(

            "boss_victory"

        );

        EventBus.emit(

            "boss:defeated"

        );

        this.log(

            "<br><strong>🏆 Boss derrotado!</strong>"

        );

        Utils.$(

            "#btnAttack"

        ).disabled=true;

        Utils.$(

            "#btnSpecial"

        ).disabled=true;

        setTimeout(

            ()=>{

                Router.go(

                    "certificate"

                );

            },

            2500

        );

    }

    /*=====================================================*/

    show(){

        Utils.$(

            "#boss-screen"

        )?.classList.remove(

            "hidden"

        );

    }

    /*=====================================================*/

    hide(){

        Utils.$(

            "#boss-screen"

        )?.classList.add(

            "hidden"

        );

    }

    /*=====================================================*/

    destroy(){

        this.finished=false;

        this.started=false;

    }

}

export default new BossScreen();