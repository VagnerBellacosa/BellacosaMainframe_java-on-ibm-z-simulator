/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 screens/quiz.js
=========================================================*/

import Router from "../router.js";
import EventBus from "../event-bus.js";
import QuizEngine from "../quiz-engine.js";
import XPManager from "../xp-manager.js";
import Analytics from "../analytics.js";
import Storage from "../storage.js";
import Audio from "../audio.js";
import Utils from "../utils.js";

class QuizScreen {

    constructor(){

        this.id="quiz";

        this.finished=false;

    }

    /*=====================================================*/

    render(){

        return `

<section id="quiz-screen"
         class="section hidden">

    <div class="section-title">

        <h2>

            ❓ Quiz Java no IBM Z

        </h2>

        <p>

            Responda corretamente e
            acumule XP para enfrentar
            o Boss Final.

        </p>

    </div>

    <div class="quiz-container">

        <div class="quiz-header">

            <div class="quiz-counter">

                Pergunta

                <span id="questionNumber">

                    1

                </span>

            </div>

            <div class="quiz-score">

                XP

                <span id="quizXP">

                    0

                </span>

            </div>

        </div>

        <div id="quizArea">

        </div>

        <div class="quiz-actions mt-5">

            <button
                id="btnNext"

                class="btn btn-primary hidden">

                Próxima →

            </button>

        </div>

    </div>

</section>

`;

    }

    /*=====================================================*/

    async init(){

        Analytics.event("quiz_loaded");

        await QuizEngine.load(

            "data/quiz.json"

        );

        this.renderQuestion();

        this.bindEvents();

    }

    /*=====================================================*/

    bindEvents(){

        Utils.$("#btnNext")

        ?.addEventListener(

            "click",

            ()=>{

                this.next();

            }

        );

    }

    /*=====================================================*/

    renderQuestion(){

        const area=

            Utils.$("#quizArea");

        if(!area)return;

        area.innerHTML=

            QuizEngine.render();

        QuizEngine.bind(

            result=>{

                this.answer(result);

            }

        );

    }

    /*=====================================================*/

    answer(result){

        Audio.play(

            result.correct

            ? "success"

            : "error"

        );

        Analytics.event(

            result.correct

            ? "quiz_correct"

            : "quiz_wrong"

        );

        XPManager.add(

            result.correct

            ? 100

            : 10

        );

        Utils.$("#quizXP").textContent=

            XPManager.total();

        Utils.$("#btnNext")

            ?.classList.remove(

                "hidden"

            );

    }

    /*=====================================================*/

    next(){

        Utils.$("#btnNext")

            ?.classList.add(

                "hidden"

            );

        if(

            QuizEngine.hasNext()

        ){

            QuizEngine.next();

            this.renderQuestion();

            return;

        }

        this.finish();

    }

    /*=====================================================*/

    finish(){

        if(this.finished)return;

        this.finished=true;

        const score=

            QuizEngine.score();

        Storage.set(

            "quizCompleted",

            true

        );

        Storage.set(

            "quizScore",

            score

        );

        Analytics.event(

            "quiz_finished"

        );

        EventBus.emit(

            "quiz:finished",

            score

        );

        if(

            score.percent>=70

        ){

            XPManager.add(500);

            Audio.play("victory");

        }

        Router.go("boss");

    }

    /*=====================================================*/

    show(){

        Utils.$(

            "#quiz-screen"

        )?.classList.remove(

            "hidden"

        );

    }

    /*=====================================================*/

    hide(){

        Utils.$(

            "#quiz-screen"

        )?.classList.add(

            "hidden"

        );

    }

    /*=====================================================*/

    destroy(){

        this.finished=false;

    }

}

export default new QuizScreen();