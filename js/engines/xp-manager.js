/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 xp-manager.js
=========================================================*/

import { CONFIG, DEFAULT_STATE } from "../js/core/config.js";
import EventBus from "../js/core/event-bus.js";

class XPManager {

    constructor(){

        this.xp = DEFAULT_STATE.xp;

        this.level = DEFAULT_STATE.level;

        this.maxXP = CONFIG.GAME.MAX_XP;

        this.bar = null;

        this.label = null;

        this.listeners();

    }

    /*=====================================================*/

    init(){

        this.bar = document.querySelector(
            CONFIG.SELECTORS.XPBAR
        );

        this.label = document.querySelector(
            CONFIG.SELECTORS.XPTEXT
        );

        this.updateUI();

    }

    /*=====================================================*/

    listeners(){

        EventBus.on(

            CONFIG.EVENTS.XP,

            ({points})=>{

                this.add(points);

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

    add(points=0){

        this.xp += points;

        if(this.xp > this.maxXP){

            this.xp = this.maxXP;

        }

        this.calculateLevel();

        this.updateUI();

        EventBus.emit(

            "xp:changed",

            this.status()

        );

    }

    /*=====================================================*/

    remove(points=0){

        this.xp -= points;

        if(this.xp<0){

            this.xp=0;

        }

        this.calculateLevel();

        this.updateUI();

    }

    /*=====================================================*/

    calculateLevel(){

        const levels = CONFIG.GAME.MAX_LEVEL;

        const size =

            this.maxXP / levels;

        const newLevel =

            Math.floor(

                this.xp / size

            ) + 1;

        if(newLevel > this.level){

            this.levelUp(newLevel);

        }

        this.level =

            Math.min(

                newLevel,

                levels

            );

    }

    /*=====================================================*/

    levelUp(level){

        EventBus.emit(

            CONFIG.EVENTS.LEVEL,

            {

                level

            }

        );

    }

    /*=====================================================*/

    updateUI(){

        if(this.bar){

            const percent =

                (this.xp/

                this.maxXP)

                *100;

            this.bar.style.width=

                percent+"%";

        }

        if(this.label){

            this.label.textContent=

                `${this.xp} / ${this.maxXP}`;

        }

    }

    /*=====================================================*/

    reset(){

        this.xp=0;

        this.level=1;

        this.updateUI();

    }

    /*=====================================================*/

    status(){

        return{

            xp:this.xp,

            level:this.level,

            percent:

            Math.round(

                (this.xp/

                this.maxXP)

                *100

            )

        };

    }

    /*=====================================================*/

    getXP(){

        return this.xp;

    }

    /*=====================================================*/

    getLevel(){

        return this.level;

    }

    /*=====================================================*/

    getPercent(){

        return Math.round(

            (this.xp/

            this.maxXP)

            *100

        );

    }

    /*=====================================================*/

    isMax(){

        return this.xp>=

            this.maxXP;

    }

    /*=====================================================*/

    remaining(){

        return this.maxXP-

            this.xp;

    }

}

const xpManager = new XPManager();

export default xpManager;

/*=====================================================
 Multiplicador
=====================================================*/

setMultiplier(value = 1){

    this.multiplier = Math.max(1, value);

}

getMultiplier(){

    return this.multiplier || 1;

}

/*=====================================================
 Adiciona XP com multiplicador
=====================================================*/

reward(baseXP, source = "game"){

    const total = Math.round(

        baseXP * this.getMultiplier()

    );

    this.add(total);

    EventBus.emit("xp:reward",{

        source,

        base:baseXP,

        total

    });

    this.showFloatingXP(total);

}

/*=====================================================
 XP Flutuante
=====================================================*/

showFloatingXP(points){

    EventBus.emit(

        "ui:xp-popup",

        {

            text:`+${points} XP`

        }

    );

}

/*=====================================================
 Salvar
=====================================================*/

save(){

    EventBus.emit(

        CONFIG.EVENTS.SAVE,

        this.status()

    );

}

/*=====================================================
 Restaurar
=====================================================*/

load(data){

    if(!data) return;

    this.xp=data.xp||0;

    this.level=data.level||1;

    this.updateUI();

}

/*=====================================================
 Nome do Nível
=====================================================*/

getLevelName(){

    if(this.level===1) return "Padawan";

    if(this.level<=3) return "Aprendiz";

    if(this.level<=5) return "Desenvolvedor";

    if(this.level<=7) return "Especialista";

    if(this.level<=9) return "Mestre";

    return "Arquiteto IBM Z";

}

/*=====================================================
 Analytics
=====================================================*/

sendAnalytics(){

    EventBus.emit(

        "analytics:xp",

        this.status()

    );

}

/*=====================================================
 Conquistas
=====================================================*/

checkAchievements(){

    if(this.level>=2){

        EventBus.emit(

            "achievement:unlock",

            "level-2"

        );

    }

    if(this.level>=5){

        EventBus.emit(

            "achievement:unlock",

            "level-5"

        );

    }

    if(this.level>=10){

        EventBus.emit(

            "achievement:unlock",

            "max-level"

        );

    }

}

/*=====================================================
 Atualização completa
=====================================================*/

refresh(){

    this.updateUI();

    this.checkAchievements();

    this.sendAnalytics();

    this.save();

}

/*=====================================================
 Resumo
=====================================================*/

summary(){

    return{

        xp:this.xp,

        level:this.level,

        levelName:this.getLevelName(),

        percent:this.getPercent(),

        remaining:this.remaining(),

        max:this.maxXP

    };

}
