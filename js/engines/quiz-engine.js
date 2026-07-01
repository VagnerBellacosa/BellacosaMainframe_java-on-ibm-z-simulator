/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 quiz-engine.js
 Parte 1 - Estrutura e Renderização
=========================================================*/

import { CONFIG } from "../js/core/config.js";
import EventBus from "../js/core/event-bus.js";
import router from "../js/core/router.js";

class QuizEngine {

    constructor() {

        this.questions = [];

        this.currentQuestion = 0;

        this.score = 0;

        this.correct = 0;

        this.wrong = 0;

        this.container = null;

        this.progressBar = null;

    }

    /*=====================================================*/

    init() {

        this.container = document.getElementById("quizContainer");

        this.progressBar = document.querySelector(
            ".quiz-progress-fill"
        );

        this.loadQuestions();

        EventBus.on(CONFIG.EVENTS.SCREEN, ({ route }) => {

            if (route === "quiz") {

                this.start();

            }

        });

    }

    /*=====================================================*/

    loadQuestions() {

        this.questions = [

            {

                id:1,

                question:"Quem normalmente inicia a JVM no z/OS?",

                explanation:
                    "Em ambientes batch a JVM normalmente é iniciada por um Job JCL.",

                answers:[

                    {

                        text:"JCL",

                        correct:true

                    },

                    {

                        text:"Windows",

                        correct:false

                    },

                    {

                        text:"DB2",

                        correct:false

                    },

                    {

                        text:"MQ",

                        correct:false

                    }

                ]

            },

            {

                id:2,

                question:"O equivalente mais próximo de PROGRAM-ID em Java é:",

                explanation:
                    "Cada programa Java é representado por uma classe.",

                answers:[

                    {

                        text:"class",

                        correct:true

                    },

                    {

                        text:"package",

                        correct:false

                    },

                    {

                        text:"method",

                        correct:false

                    },

                    {

                        text:"interface",

                        correct:false

                    }

                ]

            },

            {

                id:3,

                question:"WORKING-STORAGE é semelhante a:",

                explanation:
                    "Os atributos armazenam o estado do objeto.",

                answers:[

                    {

                        text:"Atributos",

                        correct:true

                    },

                    {

                        text:"Imports",

                        correct:false

                    },

                    {

                        text:"Threads",

                        correct:false

                    },

                    {

                        text:"Exceptions",

                        correct:false

                    }

                ]

            },

            {

                id:4,

                question:"Java é compilado para:",

                explanation:
                    "O bytecode é executado pela JVM.",

                answers:[

                    {

                        text:"Bytecode",

                        correct:true

                    },

                    {

                        text:"Assembler",

                        correct:false

                    },

                    {

                        text:"CICS",

                        correct:false

                    },

                    {

                        text:"VSAM",

                        correct:false

                    }

                ]

            },

            {

                id:5,

                question:"Qual ambiente executa programas Java?",

                explanation:
                    "A JVM interpreta e executa o bytecode.",

                answers:[

                    {

                        text:"JVM",

                        correct:true

                    },

                    {

                        text:"JES2",

                        correct:false

                    },

                    {

                        text:"RACF",

                        correct:false

                    },

                    {

                        text:"SDSF",

                        correct:false

                    }

                ]

            }

        ];

        if(CONFIG.QUIZ.RANDOM){

            this.shuffleQuestions();

        }

    }

    /*=====================================================*/

    shuffleQuestions() {

        this.questions.sort(() => Math.random() - 0.5);

        this.questions.forEach(question => {

            question.answers.sort(() => Math.random() - 0.5);

        });

    }

    /*=====================================================*/

    start() {

        this.currentQuestion = 0;

        this.score = 0;

        this.correct = 0;

        this.wrong = 0;

        this.render();

    }

    /*=====================================================*/

    render() {

        const question = this.questions[this.currentQuestion];

        const letters = ["A","B","C","D"];

        let html = `

<div class="quiz-card">

<div class="quiz-header">

<div class="quiz-counter">

Pergunta ${this.currentQuestion+1}
de ${this.questions.length}

</div>

<div class="quiz-score">

XP ${this.score}

</div>

</div>

<div class="quiz-question">

${question.question}

</div>

<div class="quiz-options">

`;

        question.answers.forEach((answer,index)=>{

            html += `

<div
class="quiz-option"
data-index="${index}"
>

<div class="quiz-letter">

${letters[index]}

</div>

<div class="quiz-text">

${answer.text}

</div>

</div>

`;

        });

        html += `

</div>

<div
class="quiz-feedback"
id="quizFeedback"
>

</div>

<div class="quiz-progress">

<div class="quiz-progress-track">

<div
class="quiz-progress-fill"
style="width:${this.progress()}%"
>

</div>

</div>

</div>

</div>

`;

        this.container.innerHTML = html;

        this.attachEvents();

    }

    /*=====================================================*/

    attachEvents() {

        const options =
            document.querySelectorAll(".quiz-option");

        options.forEach(option=>{

            option.addEventListener("click",()=>{

                const index =
                    Number(option.dataset.index);

                this.answer(index);

            });

        });

    }

    /*=====================================================*/

    progress(){

        return (

            (this.currentQuestion)

            /

            this.questions.length

        )*100;

    }

    /*=====================================================*/

    answer(index){

        // Implementado na Parte 2

    }

}

const quizEngine = new QuizEngine();

export default quizEngine;

/*=====================================================
 Resposta do usuário
=====================================================*/

answer(index){

    const question =
        this.questions[this.currentQuestion];

    const options =
        document.querySelectorAll(".quiz-option");

    // Evita responder duas vezes
    if(options[0]?.classList.contains("disabled")){

        return;

    }

    options.forEach(option=>{

        option.classList.add("disabled");

    });

    const answer =
        question.answers[index];

    const feedback =
        document.getElementById("quizFeedback");

    if(answer.correct){

        options[index].classList.add("correct");

        this.correct++;

        this.addScore(CONFIG.GAME.QUIZ_POINTS);

        EventBus.emit(
            CONFIG.EVENTS.QUIZ_RIGHT,
            question
        );

        feedback.innerHTML = `
            <strong>✔ Correto!</strong><br>
            ${question.explanation}
        `;

    }else{

        options[index].classList.add("wrong");

        this.wrong++;

        const correctIndex =
            this.findCorrectAnswer(question);

        if(correctIndex !== -1){

            options[correctIndex]
                .classList.add("correct");

        }

        EventBus.emit(
            CONFIG.EVENTS.QUIZ_WRONG,
            question
        );

        feedback.innerHTML = `
            <strong>✖ Resposta incorreta.</strong><br>
            ${question.explanation}
        `;

    }

    feedback.classList.add("show");

    this.updateHeader();

    setTimeout(()=>{

        this.nextQuestion();

    },2200);

}

/*=====================================================
 Procura resposta correta
=====================================================*/

findCorrectAnswer(question){

    return question.answers.findIndex(

        answer=>answer.correct

    );

}

/*=====================================================
 Soma XP
=====================================================*/

addScore(points){

    this.score += points;

    EventBus.emit(

        CONFIG.EVENTS.XP,

        {

            points,

            total:this.score

        }

    );

}

/*=====================================================
 Atualiza cabeçalho
=====================================================*/

updateHeader(){

    const score =
        document.querySelector(".quiz-score");

    if(score){

        score.textContent =
            `XP ${this.score}`;

    }

}

/*=====================================================
 Estatísticas
=====================================================*/

getStats(){

    return{

        total:this.questions.length,

        current:this.currentQuestion+1,

        score:this.score,

        correct:this.correct,

        wrong:this.wrong

    };

}

/*=====================================================
 Próxima pergunta
=====================================================*/

nextQuestion(){

    this.currentQuestion++;

    if(this.currentQuestion >= this.questions.length){

        this.finish();

        return;

    }

    this.render();

}

/*=====================================================
 Finaliza Quiz
=====================================================*/

finish(){

    const total = this.questions.length;

    const percent = Math.round(

        (this.correct / total) * 100

    );

    const medal = this.getMedal(percent);

    EventBus.emit("quiz:finished",{

        score:this.score,

        correct:this.correct,

        wrong:this.wrong,

        total,

        percent,

        medal

    });

    this.showResult({

        score:this.score,

        correct:this.correct,

        wrong:this.wrong,

        total,

        percent,

        medal

    });

}

/*=====================================================
 Medalhas
=====================================================*/

getMedal(percent){

    if(percent === 100){

        return{

            icon:"🏆",

            title:"Mestre Jedi Java"

        };

    }

    if(percent >= 80){

        return{

            icon:"🥇",

            title:"Ouro"

        };

    }

    if(percent >= 60){

        return{

            icon:"🥈",

            title:"Prata"

        };

    }

    if(percent >= 40){

        return{

            icon:"🥉",

            title:"Bronze"

        };

    }

    return{

        icon:"📘",

        title:"Padawan"

    };

}

/*=====================================================
 Resultado
=====================================================*/

showResult(result){

    this.container.innerHTML = `

<div class="quiz-card fade-slide">

<h2 style="text-align:center">

${result.medal.icon}

</h2>

<h2 style="text-align:center">

${result.medal.title}

</h2>

<br>

<p>

Acertos:
<strong>${result.correct}</strong>

</p>

<p>

Erros:
<strong>${result.wrong}</strong>

</p>

<p>

Desempenho:
<strong>${result.percent}%</strong>

</p>

<p>

XP Obtido:
<strong>${result.score}</strong>

</p>

<br>

<div style="text-align:center">

<button
class="quiz-next"
id="continueBoss">

Enfrentar o Boss →

</button>

</div>

</div>

`;

    document

        .getElementById("continueBoss")

        .addEventListener(

            "click",

            ()=>{

                router.go("boss");

            }

        );

}

/*=====================================================
 Reiniciar
=====================================================*/

reset(){

    this.currentQuestion=0;

    this.score=0;

    this.correct=0;

    this.wrong=0;

}

/*=====================================================
 Reiniciar e jogar
=====================================================*/

restart(){

    this.reset();

    if(CONFIG.QUIZ.RANDOM){

        this.shuffleQuestions();

    }

    this.render();

}

/*=====================================================
 Percentual
=====================================================*/

getPercent(){

    return Math.round(

        (this.correct/

        this.questions.length)

        *100

    );

}

/*=====================================================
 Resultado simples
=====================================================*/

isPerfect(){

    return this.correct===

        this.questions.length;

}

/*=====================================================
 Resultado mínimo
=====================================================*/

passed(){

    return this.getPercent()>=60;

}

/*=====================================================
 Timer
=====================================================*/

startTimer(){

    this.stopTimer();

    this.remainingTime =
        CONFIG.GAME.TIMER_SECONDS;

    this.timer = setInterval(()=>{

        this.remainingTime--;

        EventBus.emit("quiz:timer",{

            remaining:this.remainingTime

        });

        if(this.remainingTime<=0){

            this.stopTimer();

            this.finish();

        }

    },1000);

}

/*=====================================================
 Stop Timer
=====================================================*/

stopTimer(){

    if(this.timer){

        clearInterval(this.timer);

        this.timer=null;

    }

}

/*=====================================================
 Salvar progresso
=====================================================*/

saveProgress(){

    const data={

        currentQuestion:this.currentQuestion,

        score:this.score,

        correct:this.correct,

        wrong:this.wrong,

        remainingTime:this.remainingTime

    };

    EventBus.emit(

        CONFIG.EVENTS.SAVE,

        data

    );

}

/*=====================================================
 Restaurar progresso
=====================================================*/

loadProgress(data){

    if(!data) return;

    this.currentQuestion=data.currentQuestion||0;

    this.score=data.score||0;

    this.correct=data.correct||0;

    this.wrong=data.wrong||0;

    this.remainingTime=data.remainingTime||
        CONFIG.GAME.TIMER_SECONDS;

}

/*=====================================================
 Estatísticas completas
=====================================================*/

statistics(){

    return{

        score:this.score,

        correct:this.correct,

        wrong:this.wrong,

        percent:this.getPercent(),

        answered:

            this.correct+

            this.wrong,

        total:

            this.questions.length,

        time:

            this.remainingTime

    };

}

/*=====================================================
 Analytics
=====================================================*/

sendAnalytics(){

    EventBus.emit(

        "analytics:quiz",

        this.statistics()

    );

}

/*=====================================================
 Conquistas
=====================================================*/

checkAchievements(){

    if(this.correct===1){

        EventBus.emit(

            "achievement:unlock",

            "first-answer"

        );

    }

    if(this.correct===

        this.questions.length){

        EventBus.emit(

            "achievement:unlock",

            "perfect-score"

        );

    }

    if(this.score>=500){

        EventBus.emit(

            "achievement:unlock",

            "quiz-master"

        );

    }

}

/*=====================================================
 Atualiza XP
=====================================================*/

updateXP(){

    EventBus.emit(

        CONFIG.EVENTS.XP,

        {

            points:this.score,

            source:"quiz"

        }

    );

}

/*=====================================================
 Boss
=====================================================*/

unlockBoss(){

    EventBus.emit(

        "boss:unlock",

        {

            score:this.score,

            percent:this.getPercent()

        }

    );

}

/*=====================================================
 Limpeza
=====================================================*/

destroy(){

    this.stopTimer();

    this.container=null;

    this.questions=[];

}

