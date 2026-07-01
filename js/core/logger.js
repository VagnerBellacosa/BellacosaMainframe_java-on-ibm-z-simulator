/**
 * =========================================================
 * Bellacosa Mainframe
 * Java no IBM Z Simulator
 * logger.js
 * Sistema Centralizado de Logs
 * =========================================================
 */

const Logger = (() => {

    "use strict";

    const STORAGE_KEY = "bellacosa.logs";

    const LEVELS = Object.freeze({

        TRACE : 0,
        DEBUG : 1,
        INFO  : 2,
        WARN  : 3,
        ERROR : 4,
        FATAL : 5

    });

    let currentLevel = LEVELS.INFO;

    let enabled = true;

    let persist = true;

    let maxEntries = 500;

    /*======================================================
      Timestamp
    ======================================================*/

    function timestamp(){

        return new Date().toISOString();

    }

    /*======================================================
      Nome do nível
    ======================================================*/

    function levelName(level){

        return Object.keys(LEVELS)

            .find(k => LEVELS[k] === level);

    }

    /*======================================================
      Persistência
    ======================================================*/

    function save(entry){

        if(!persist) return;

        try{

            const logs = JSON.parse(

                localStorage.getItem(STORAGE_KEY) || "[]"

            );

            logs.push(entry);

            while(logs.length > maxEntries){

                logs.shift();

            }

            localStorage.setItem(

                STORAGE_KEY,

                JSON.stringify(logs)

            );

        }

        catch(e){

            console.error(e);

        }

    }

    /*======================================================
      Log principal
    ======================================================*/

    function write(level,message,data=null){

        if(!enabled) return;

        if(level < currentLevel) return;

        const entry = {

            timestamp : timestamp(),

            level     : levelName(level),

            message,

            data

        };

        save(entry);

        switch(level){

            case LEVELS.TRACE:
            case LEVELS.DEBUG:
                console.debug(entry);
                break;

            case LEVELS.INFO:
                console.info(entry);
                break;

            case LEVELS.WARN:
                console.warn(entry);
                break;

            case LEVELS.ERROR:
            case LEVELS.FATAL:
                console.error(entry);
                break;

            default:
                console.log(entry);

        }

        if(window.EventBus){

            EventBus.emit("logger:new", entry);

        }

    }

    /*======================================================
      API Pública
    ======================================================*/

    function trace(msg,data){

        write(LEVELS.TRACE,msg,data);

    }

    function debug(msg,data){

        write(LEVELS.DEBUG,msg,data);

    }

    function info(msg,data){

        write(LEVELS.INFO,msg,data);

    }

    function warn(msg,data){

        write(LEVELS.WARN,msg,data);

    }

    function error(msg,data){

        write(LEVELS.ERROR,msg,data);

    }

    function fatal(msg,data){

        write(LEVELS.FATAL,msg,data);

    }

    /*======================================================
      Configuração
    ======================================================*/

    function setLevel(level){

        currentLevel = level;

    }

    function enable(flag=true){

        enabled = flag;

    }

    function enablePersistence(flag=true){

        persist = flag;

    }

    function clear(){

        localStorage.removeItem(STORAGE_KEY);

    }

    function getLogs(){

        return JSON.parse(

            localStorage.getItem(STORAGE_KEY) || "[]"

        );

    }

    function exportLogs(){

        return JSON.stringify(

            getLogs(),

            null,

            2

        );

    }

    function download(){

        const blob = new Blob(

            [exportLogs()],

            {

                type:"application/json"

            }

        );

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;

        a.download =

            `bellacosa-log-${Date.now()}.json`;

        a.click();

        URL.revokeObjectURL(url);

    }

    /*======================================================
      Captura Global
    ======================================================*/

    window.addEventListener(

        "error",

        event => {

            error(

                event.message,

                {

                    file : event.filename,

                    line : event.lineno,

                    column : event.colno

                }

            );

        }

    );

    window.addEventListener(

        "unhandledrejection",

        event => {

            error(

                "Promise Rejeitada",

                event.reason

            );

        }

    );

    return{

        LEVELS,

        trace,

        debug,

        info,

        warn,

        error,

        fatal,

        setLevel,

        enable,

        enablePersistence,

        clear,

        getLogs,

        exportLogs,

        download

    };

})();