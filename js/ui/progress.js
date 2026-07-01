/**
 * =========================================================
 * Bellacosa Mainframe
 * Java no IBM Z Simulator
 * progress.js
 * Sistema Global de Progresso
 * =========================================================
 */

const ProgressManager = (() => {

    const STORAGE_KEY = "java-z-progress";

    const DEFAULT_STATE = {

        intro:false,

        startup:false,

        mapping:false,

        architecture:false,

        timeline:false,

        glossary:false,

        boss:false,

        certificate:false,

        labs:[],

        quizzes:[],

        achievements:[]

    };

    let progress = structuredClone(DEFAULT_STATE);

    /*======================================================
      Inicialização
    ======================================================*/

    function init(){

        load();

        updateUI();

    }

    /*======================================================
      Persistência
    ======================================================*/

    function load(){

        const saved = localStorage.getItem(STORAGE_KEY);

        if(!saved) return;

        try{

            progress = {

                ...DEFAULT_STATE,

                ...JSON.parse(saved)

            };

        }

        catch(e){

            console.warn(e);

        }

    }

    function save(){

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(progress)

        );

    }

    /*======================================================
      Etapas
    ======================================================*/

    function complete(step){

        if(progress[step]===true) return;

        progress[step]=true;

        save();

        reward(step);

        dispatch();

    }

    function isCompleted(step){

        return progress[step]===true;

    }

    /*======================================================
      Labs
    ======================================================*/

    function completeLab(id){

        if(progress.labs.includes(id))

            return;

        progress.labs.push(id);

        save();

        if(window.XPManager){

            XPManager.completeLab(id);

        }

        dispatch();

    }

    /*======================================================
      Quiz
    ======================================================*/

    function completeQuiz(id){

        if(progress.quizzes.includes(id))

            return;

        progress.quizzes.push(id);

        save();

        if(window.XPManager){

            XPManager.completeQuiz(id);

        }

        dispatch();

    }

    /*======================================================
      Achievement
    ======================================================*/

    function unlock(id){

        if(progress.achievements.includes(id))

            return;

        progress.achievements.push(id);

        save();

        dispatch();

    }

    /*======================================================
      Recompensas
    ======================================================*/

    function reward(step){

        if(!window.XPManager)

            return;

        const rewards={

            intro:25,

            startup:25,

            mapping:50,

            architecture:75,

            timeline:50,

            glossary:25,

            boss:500,

            certificate:250

        };

        XPManager.addXP(

            rewards[step]||20,

            step

        );

    }

    /*======================================================
      Estatísticas
    ======================================================*/

    function percent(){

        const totalSteps=8;

        let finished=0;

        [

            "intro",

            "startup",

            "mapping",

            "architecture",

            "timeline",

            "glossary",

            "boss",

            "certificate"

        ].forEach(step=>{

            if(progress[step])

                finished++;

        });

        finished+=progress.labs.length;

        finished+=progress.quizzes.length;

        const total=

            totalSteps+

            20+

            20;

        return Math.round(

            finished*100/total

        );

    }

    /*======================================================
      Interface
    ======================================================*/

    function updateUI(){

        const bar=document.querySelector(

            ".progress-fill"

        );

        if(bar){

            bar.style.width=

                percent()+"%";

        }

        const label=document.querySelector(

            ".progress-label"

        );

        if(label){

            label.textContent=

                percent()+"%";

        }

    }

    /*======================================================
      Eventos
    ======================================================*/

    function dispatch(){

        updateUI();

        document.dispatchEvent(

            new CustomEvent(

                "progress:updated",

                {

                    detail:getState()

                }

            )

        );

    }

    /*======================================================
      Getters
    ======================================================*/

    function getState(){

        return structuredClone(progress);

    }

    function completedLabs(){

        return progress.labs.length;

    }

    function completedQuizzes(){

        return progress.quizzes.length;

    }

    function completedAchievements(){

        return progress.achievements.length;

    }

    /*======================================================
      Reset
    ======================================================*/

    function reset(){

        progress=

            structuredClone(DEFAULT_STATE);

        save();

        dispatch();

    }

    /*======================================================
      API
    ======================================================*/

    return{

        init,

        complete,

        completeLab,

        completeQuiz,

        unlock,

        isCompleted,

        completedLabs,

        completedQuizzes,

        completedAchievements,

        percent,

        getState,

        reset

    };

})();

document.addEventListener(

    "DOMContentLoaded",

    ProgressManager.init

);