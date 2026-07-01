/**
 * =========================================================
 * Bellacosa Mainframe
 * Java no IBM Z Simulator
 * xp-manager.js
 * Sistema Global de XP
 * =========================================================
 */

const XPManager = (() => {

    const STORAGE_KEY = "java-z-player";

    const DEFAULT_PLAYER = {

        xp: 0,

        level: 1,

        achievements: [],

        completedLabs: [],

        completedQuizzes: [],

        bossDefeated: false

    };

    let player = structuredClone(DEFAULT_PLAYER);

    /*=========================================
      Inicialização
    =========================================*/

    function init() {

        load();

        console.info("XPManager inicializado.");

    }

    /*=========================================
      Persistência
    =========================================*/

    function save() {

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(player)

        );

    }

    function load() {

        const data = localStorage.getItem(STORAGE_KEY);

        if (!data) return;

        try{

            player = {

                ...DEFAULT_PLAYER,

                ...JSON.parse(data)

            };

        }

        catch(e){

            console.warn(e);

        }

    }

    /*=========================================
      XP
    =========================================*/

    function addXP(value, reason="") {

        player.xp += value;

        const previous = player.level;

        player.level = calculateLevel(player.xp);

        save();

        console.info(

            `+${value} XP (${reason})`

        );

        if(window.AudioManager){

            AudioManager.play("success");

        }

        if(player.level > previous){

            levelUp(player.level);

        }

        dispatch();

    }

    function removeXP(value){

        player.xp = Math.max(

            0,

            player.xp - value

        );

        player.level = calculateLevel(player.xp);

        save();

        dispatch();

    }

    /*=========================================
      Nível
    =========================================*/

    function calculateLevel(xp){

        return Math.floor(

            Math.sqrt(xp / 100)

        ) + 1;

    }

    function xpForLevel(level){

        return Math.pow(

            level - 1,

            2

        ) * 100;

    }

    function nextLevelXP(){

        return xpForLevel(

            player.level + 1

        );

    }

    function levelProgress(){

        const current = xpForLevel(player.level);

        const next = nextLevelXP();

        return Math.round(

            ((player.xp-current)/(next-current))*100

        );

    }

    function levelUp(level){

        console.info(

            `Level ${level}`

        );

        if(window.AudioManager){

            AudioManager.play("level-up");

        }

        if(window.Toast){

            Toast.success(

                `Level ${level} alcançado!`

            );

        }

    }

    /*=========================================
      Laboratórios
    =========================================*/

    function completeLab(id){

        if(

            player.completedLabs.includes(id)

        ) return;

        player.completedLabs.push(id);

        addXP(100,"Laboratório");

    }

    /*=========================================
      Quiz
    =========================================*/

    function completeQuiz(id){

        if(

            player.completedQuizzes.includes(id)

        ) return;

        player.completedQuizzes.push(id);

        addXP(75,"Quiz");

    }

    /*=========================================
      Boss
    =========================================*/

    function defeatBoss(){

        if(player.bossDefeated)

            return;

        player.bossDefeated=true;

        addXP(500,"Boss");

    }

    /*=========================================
      Achievements
    =========================================*/

    function unlock(id){

        if(

            player.achievements.includes(id)

        ) return;

        player.achievements.push(id);

        save();

        if(window.AudioManager){

            AudioManager.play("achievement");

        }

        dispatch();

    }

    /*=========================================
      Eventos
    =========================================*/

    function dispatch(){

        document.dispatchEvent(

            new CustomEvent(

                "xp:updated",

                {

                    detail:getPlayer()

                }

            )

        );

    }

    /*=========================================
      Getters
    =========================================*/

    function getPlayer(){

        return structuredClone(player);

    }

    function getXP(){

        return player.xp;

    }

    function getLevel(){

        return player.level;

    }

    function getAchievements(){

        return [...player.achievements];

    }

    function reset(){

        player = structuredClone(DEFAULT_PLAYER);

        save();

        dispatch();

    }

    /*=========================================
      API
    =========================================*/

    return{

        init,

        addXP,

        removeXP,

        getXP,

        getLevel,

        getPlayer,

        getAchievements,

        completeLab,

        completeQuiz,

        defeatBoss,

        unlock,

        levelProgress,

        xpForLevel,

        nextLevelXP,

        reset

    };

})();

document.addEventListener(

    "DOMContentLoaded",

    XPManager.init

);