/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 boss-engine.js
 Parte 1
=========================================================*/

import { CONFIG } from "./config.js";
import EventBus from "./event-bus.js";

class BossEngine {

    constructor(){

        this.name = CONFIG.BOSS.NAME;

        this.maxHP = CONFIG.BOSS.MAX_HP;

        this.hp = this.maxHP;

        this.damage = CONFIG.BOSS.DAMAGE_PER_HIT;

        this.active = false;

        this.bar = null;

        this.button = null;

        this.label = null;

        this.listeners();

    }

    /*=====================================================*/

    init(){

        this.bar = document.querySelector(
            CONFIG.SELECTORS.BOSSBAR
        );

        this.button =
            document.getElementById("attack");

        this.label =
            document.getElementById("bossName");

        if(this.label){

            this.label.textContent = this.name;

        }

        if(this.button){

            this.button.addEventListener(

                "click",

                ()=>this.playerAttack()

            );

        }

        this.updateUI();

    }

    /*=====================================================*/

    listeners(){

        EventBus.on(

            "boss:unlock",

            ()=>{

                this.start();

            }

        );

        EventBus.on(

            CONFIG.EVENTS.RESET,

            ()=>{

                this.reset();

            }

        );

    }

    /*=====================================================*/

    start(){

        this.active = true;

        this.hp = this.maxHP;

        this.updateUI();

        EventBus.emit(

            "boss:start",

            {

                name:this.name,

                hp:this.hp

            }

        );

    }

    /*=====================================================*/

    reset(){

        this.active = false;

        this.hp = this.maxHP;

        this.updateUI();

    }

    /*=====================================================*/

    playerAttack(){

        if(!this.active){

            return;

        }

        this.hit(this.damage);

    }

    /*=====================================================*/

    hit(points){

        this.hp -= points;

        if(this.hp < 0){

            this.hp = 0;

        }

        this.updateUI();

        EventBus.emit(

            CONFIG.EVENTS.BOSS_DAMAGE,

            {

                hp:this.hp,

                damage:points

            }

        );

        this.showDamage(points);

        if(this.hp === 0){

            this.defeat();

        }

    }

    /*=====================================================*/

    heal(points){

        this.hp += points;

        if(this.hp > this.maxHP){

            this.hp = this.maxHP;

        }

        this.updateUI();

    }

    /*=====================================================*/

    updateUI(){

        if(this.bar){

            const percent =

                (this.hp / this.maxHP) * 100;

            this.bar.style.width = percent + "%";

        }

    }

    /*=====================================================*/

    showDamage(points){

        EventBus.emit(

            "boss:show-damage",

            {

                damage:points

            }

        );

    }

    /*=====================================================*/

    getHP(){

        return this.hp;

    }

    getPercent(){

        return Math.round(

            (this.hp / this.maxHP) * 100

        );

    }

    isAlive(){

        return this.hp > 0;

    }

    isActive(){

        return this.active;

    }

    /*=====================================================*/

    defeat(){

        this.active = false;

        EventBus.emit(

            CONFIG.EVENTS.BOSS_DEAD,

            {

                name:this.name

            }

        );

    }

}

const bossEngine = new BossEngine();

export default bossEngine;

/*=====================================================
 Ataque Crítico
=====================================================*/

criticalHit(){

    if(!this.active){

        return;

    }

    const damage =

        this.damage * 2;

    this.hit(damage);

    EventBus.emit(

        "boss:critical",

        {

            damage

        }

    );

}

/*=====================================================
 Fases do Boss
=====================================================*/

checkPhase(){

    const percent = this.getPercent();

    if(percent <= 20){

        EventBus.emit(

            "boss:phase",

            {

                phase:3

            }

        );

        return;

    }

    if(percent <= 50){

        EventBus.emit(

            "boss:phase",

            {

                phase:2

            }

        );

        return;

    }

    EventBus.emit(

        "boss:phase",

        {

            phase:1

        }

    );

}

/*=====================================================
 Sobrescreve hit()
=====================================================*/

hit(points){

    this.hp -= points;

    if(this.hp < 0){

        this.hp = 0;

    }

    this.updateUI();

    this.showDamage(points);

    this.checkPhase();

    EventBus.emit(

        CONFIG.EVENTS.BOSS_DAMAGE,

        {

            hp:this.hp,

            damage:points

        }

    );

    if(this.hp===0){

        this.defeat();

    }

}

/*=====================================================
 Vitória
=====================================================*/

victory(){

    EventBus.emit(

        "xp:add",

        {

            points:

            CONFIG.GAME.BOSS_POINTS

        }

    );

    EventBus.emit(

        "achievement:unlock",

        "boss-defeated"

    );

    EventBus.emit(

        "confetti:start"

    );

    EventBus.emit(

        "analytics:boss",

        {

            hp:this.hp,

            victory:true

        }

    );

}

/*=====================================================
 Sobrescreve defeat()
=====================================================*/

defeat(){

    this.active=false;

    this.victory();

    EventBus.emit(

        CONFIG.EVENTS.BOSS_DEAD,

        {

            boss:this.name

        }

    );

    setTimeout(()=>{

        router.go("finish");

    },2000);

}

/*=====================================================
 Ataque Especial
=====================================================*/

specialAttack(){

    if(!this.active){

        return;

    }

    EventBus.emit(

        "boss:special"

    );

}

/*=====================================================
 Reinício
=====================================================*/

restart(){

    this.reset();

    this.start();

}

/*=====================================================
 Status
=====================================================*/

status(){

    return{

        name:this.name,

        hp:this.hp,

        percent:this.getPercent(),

        active:this.active

    };

}

