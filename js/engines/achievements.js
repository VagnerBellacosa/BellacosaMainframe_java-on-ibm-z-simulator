/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 achievements.js
=========================================================*/

import { ACHIEVEMENTS } from "../js/core/config.js";
import EventBus from "../js/core/event-bus.js";

class AchievementsManager {

    constructor(){

        this.items = new Map();

        this.container = null;

        this.listeners();

    }

    /*=====================================================*/

    init(){

        this.container =
            document.querySelector(".achievements");

        this.load();

        this.render();

    }

    /*=====================================================*/

    listeners(){

        EventBus.on(

            "achievement:unlock",

            (id)=>{

                this.unlock(id);

            }

        );

        EventBus.on(

            "game:reset",

            ()=>{

                this.reset();

            }

        );

    }

    /*=====================================================*/

    load(){

        ACHIEVEMENTS.forEach(item=>{

            this.items.set(

                item.id,

                {

                    ...item,

                    unlocked:false,

                    date:null

                }

            );

        });

    }

    /*=====================================================*/

    unlock(id){

        const achievement =

            this.items.get(id);

        if(!achievement){

            return;

        }

        if(achievement.unlocked){

            return;

        }

        achievement.unlocked = true;

        achievement.date =

            new Date();

        this.items.set(

            id,

            achievement

        );

        this.render();

        this.popup(achievement);

        EventBus.emit(

            "achievement:earned",

            achievement

        );

    }

    /*=====================================================*/

    popup(item){

        EventBus.emit(

            "toast:show",

            {

                type:"success",

                title:"🏆 Conquista",

                message:item.title

            }

        );

    }

    /*=====================================================*/

    render(){

        if(!this.container){

            return;

        }

        let html="";

        this.items.forEach(item=>{

            html += `

<div class="achievement ${

item.unlocked ?

"unlocked":

"locked"

}">

<div class="achievement-icon">

${item.unlocked ?

"🏆":

"🔒"}

</div>

<div class="achievement-title">

${item.title}

</div>

<div class="achievement-desc">

+${item.xp} XP

</div>

</div>

`;

        });

        this.container.innerHTML = html;

    }

    /*=====================================================*/

    reset(){

        this.items.forEach(item=>{

            item.unlocked=false;

            item.date=null;

        });

        this.render();

    }

    /*=====================================================*/

    isUnlocked(id){

        const item =

            this.items.get(id);

        return item ?

            item.unlocked :

            false;

    }

    /*=====================================================*/

    get(id){

        return this.items.get(id);

    }

    /*=====================================================*/

    all(){

        return [...this.items.values()];

    }

    /*=====================================================*/

    unlocked(){

        return this.all()

            .filter(

                item=>item.unlocked

            );

    }

    /*=====================================================*/

    locked(){

        return this.all()

            .filter(

                item=>!item.unlocked

            );

    }

    /*=====================================================*/

    count(){

        return{

            total:this.items.size,

            unlocked:

                this.unlocked().length,

            locked:

                this.locked().length

        };

    }

    /*=====================================================*/

    progress(){

        const c=this.count();

        return Math.round(

            (c.unlocked/c.total)

            *100

        );

    }

}

const achievements =

    new AchievementsManager();

export default achievements;