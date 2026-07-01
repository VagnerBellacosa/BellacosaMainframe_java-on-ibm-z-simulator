/**
 * =========================================================
 * Bellacosa Mainframe
 * Java no IBM Z Simulator
 * typing.js
 * Máquina de Digitação
 * =========================================================
 */

const Typing = (() => {

    const DEFAULTS = {

        speed:35,

        eraseSpeed:18,

        delay:500,

        cursor:true,

        loop:false,

        sound:false,

        html:false,

        autoScroll:true,

        onStart:null,

        onFinish:null

    };

    let running=false;

    let cancelled=false;

    /*======================================================
      Espera
    ======================================================*/

    const sleep=(ms)=>new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

    /*======================================================
      Digitação
    ======================================================*/

    async function type(element,text,options={}){

        const config={

            ...DEFAULTS,

            ...options

        };

        if(!element) return;

        cancelled=false;

        running=true;

        if(typeof config.onStart==="function"){

            config.onStart();

        }

        element.innerHTML="";

        if(config.cursor){

            element.classList.add("typing-cursor");

        }

        for(let i=0;i<text.length;i++){

            if(cancelled) break;

            const char=text[i];

            if(config.html){

                element.innerHTML+=char;

            }else{

                element.textContent+=char;

            }

            if(config.sound && window.AudioManager){

                AudioManager.play("terminal");

            }

            if(config.autoScroll){

                element.scrollTop=element.scrollHeight;

            }

            await sleep(config.speed);

        }

        running=false;

        element.classList.remove("typing-cursor");

        if(typeof config.onFinish==="function"){

            config.onFinish();

        }

        document.dispatchEvent(

            new CustomEvent(

                "typing:finished"

            )

        );

    }

    /*======================================================
      Apagar
    ======================================================*/

    async function erase(element,options={}){

        const config={

            ...DEFAULTS,

            ...options

        };

        const text=element.textContent;

        for(let i=text.length;i>=0;i--){

            if(cancelled) return;

            element.textContent=text.substring(0,i);

            await sleep(config.eraseSpeed);

        }

    }

    /*======================================================
      Sequência
    ======================================================*/

    async function sequence(

        element,

        texts,

        options={}

    ){

        const config={

            ...DEFAULTS,

            ...options

        };

        do{

            for(const line of texts){

                if(cancelled) return;

                await type(

                    element,

                    line,

                    config

                );

                await sleep(config.delay);

                await erase(

                    element,

                    config

                );

            }

        }

        while(config.loop);

    }

    /*======================================================
      Terminal
    ======================================================*/

    async function terminal(

        element,

        commands,

        options={}

    ){

        const config={

            ...DEFAULTS,

            ...options

        };

        element.textContent="";

        for(const cmd of commands){

            if(cancelled) return;

            await type(

                element,

                `$ ${cmd}\n`,

                config

            );

            await sleep(350);

        }

    }

    /*======================================================
      Cancelar
    ======================================================*/

    function stop(){

        cancelled=true;

        running=false;

    }

    /*======================================================
      Estado
    ======================================================*/

    function isRunning(){

        return running;

    }

    return{

        type,

        erase,

        sequence,

        terminal,

        stop,

        isRunning

    };

})();