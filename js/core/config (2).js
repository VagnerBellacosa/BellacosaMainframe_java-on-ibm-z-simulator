/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 config.js
=========================================================*/

export const CONFIG = {

    APP:{

        NAME:"Java no IBM Z",

        VERSION:"1.0.0",

        AUTHOR:"Vagner Bellacosa",

        COMPANY:"Bellacosa Mainframe"

    },

    GAME:{

        MAX_XP:1000,

        INITIAL_XP:0,

        MAX_LEVEL:10,

        INITIAL_LEVEL:1,

        QUIZ_POINTS:100,

        CARD_POINTS:50,

        LAB_POINTS:150,

        BOSS_POINTS:300,

        ACHIEVEMENT_POINTS:75,

        TIMER_MINUTES:5,

        TIMER_SECONDS:300

    },

    STORAGE:{

        PREFIX:"bellacosa-java-",

        SAVE_KEY:"save",

        SETTINGS_KEY:"settings",

        STATS_KEY:"stats",

        ACHIEVEMENTS_KEY:"achievements"

    },

    TERMINAL:{

        SPEED:35,

        CURSOR:"█",

        STARTUP:[
            "IPL IBM Z...",
            "Loading z/OS...",
            "Loading JES2...",
            "Loading JVM...",
            "Loading COBOL Runtime...",
            "Mission Ready."
        ]

    },

    AUDIO:{

        ENABLED:true,

        MASTER_VOLUME:.50,

        CLICK:"assets/audio/click.mp3",

        SUCCESS:"assets/audio/success.mp3",

        ERROR:"assets/audio/error.mp3",

        LEVELUP:"assets/audio/levelup.mp3",

        BOSS:"assets/audio/boss.mp3",

        VICTORY:"assets/audio/victory.mp3"

    },

    PARTICLES:{

        ENABLED:true,

        COUNT:60,

        SPEED:1,

        SIZE_MIN:2,

        SIZE_MAX:6

    },

    CONFETTI:{

        ENABLED:true,

        PIECES:180

    },

    QUIZ:{

        QUESTIONS_PER_GAME:5,

        RANDOM:true,

        SHUFFLE_OPTIONS:true,

        SHOW_EXPLANATION:true,

        AUTO_NEXT:false

    },

    BOSS:{

        NAME:"Medo do Java",

        MAX_HP:100,

        DAMAGE_PER_HIT:20,

        ANIMATION_DURATION:800

    },

    ROUTES:[

        "intro",

        "terminal",

        "cards",

        "mapping",

        "quiz",

        "architecture",

        "timeline",

        "lab",

        "boss",

        "finish"

    ],

    SELECTORS:{

        GAME:"#game",

        TERMINAL:"#terminal",

        XPBAR:"#xpBar",

        XPTEXT:"#xpText",

        BOSSBAR:"#bossBar",

        FINALXP:"#finalXP"

    },

    CSS:{

        HIDDEN:"hidden",

        ACTIVE:"active",

        SUCCESS:"success",

        ERROR:"error",

        FLIPPED:"flipped",

        LOCKED:"locked",

        UNLOCKED:"unlocked"

    },

    EVENTS:{

        START:"game:start",

        SCREEN:"screen:change",

        XP:"xp:add",

        LEVEL:"level:up",

        QUIZ_RIGHT:"quiz:right",

        QUIZ_WRONG:"quiz:wrong",

        CARD:"card:flip",

        ACHIEVEMENT:"achievement",

        BOSS_DAMAGE:"boss:damage",

        BOSS_DEAD:"boss:dead",

        SAVE:"game:save",

        LOAD:"game:load",

        RESET:"game:reset"

    }

};

/*=========================================================
 Estado inicial
=========================================================*/

export const DEFAULT_STATE={

    level:1,

    xp:0,

    bossHP:100,

    route:"intro",

    score:0,

    quizCorrect:0,

    quizWrong:0,

    achievements:[],

    finished:false,

    started:false,

    elapsedTime:0

};

/*=========================================================
 Conquistas
=========================================================*/

export const ACHIEVEMENTS=[

    {

        id:"first-card",

        title:"Primeiro Conceito",

        xp:50

    },

    {

        id:"quiz-master",

        title:"Mestre do Quiz",

        xp:100

    },

    {

        id:"lab-complete",

        title:"Laboratório Concluído",

        xp:150

    },

    {

        id:"boss-defeated",

        title:"Medo do Java Derrotado",

        xp:300

    },

    {

        id:"mission-complete",

        title:"Padawan Java",

        xp:500

    }

];

/*=========================================================
 Frases do Terminal
=========================================================*/

export const TERMINAL_MESSAGES=[

    "READY",

    "Carregando ambiente Java...",

    "Inicializando JVM...",

    "Conectando ao DB2...",

    "Verificando CICS...",

    "Compilando Bytecode...",

    "Tudo pronto para a missão."

];

/*=========================================================
 Dicas
=========================================================*/

export const TIPS=[

    "PROGRAM-ID é semelhante a uma class.",

    "PERFORM lembra um método.",

    "WORKING-STORAGE corresponde aos atributos.",

    "CALL e invocação de métodos possuem o mesmo objetivo.",

    "A JVM é apenas outro ambiente de execução."

];

/*=========================================================
 Constantes
=========================================================*/

export const VERSION="1.0.0";

export const DEBUG=true;