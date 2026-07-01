/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z Simulator
 config.js
=========================================================*/

export const CONFIG = {

    /*=====================================================
      APLICAÇÃO
    =====================================================*/

    APP: {

        NAME: "Java no IBM Z Simulator",

        VERSION: "1.0.0",

        AUTHOR: "Vagner Bellacosa",

        BRAND: "Bellacosa Mainframe",

        LANGUAGE: "pt-BR",

        DEBUG: true

    },

    /*=====================================================
      SEO
    =====================================================*/

    SEO: {

        TITLE:
            "Java no IBM Z - Laboratório Interativo",

        DESCRIPTION:
            "Aprenda Java no IBM Mainframe através de um laboratório gamificado.",

        KEYWORDS: [

            "Java",

            "IBM Z",

            "Mainframe",

            "COBOL",

            "CICS",

            "Db2",

            "JCL",

            "z/OS"

        ]

    },

    /*=====================================================
      ROTAS
    =====================================================*/

    ROUTES: [

        "startup",

        "intro",

        "timeline",

        "mapping",

        "architecture",

        "lab",

        "quiz",

        "boss",

        "certificate",

        "finish"

    ],

    /*=====================================================
      XP
    =====================================================*/

    XP: {

        INTRO: 50,

        TIMELINE: 500,

        MAPPING: 150,

        ARCHITECTURE: 250,

        LAB: 100,

        QUIZ_CORRECT: 100,

        QUIZ_COMPLETE: 500,

        BOSS: 1000,

        CERTIFICATE: 500

    },

    /*=====================================================
      LEVELS
    =====================================================*/

    LEVELS: [

        0,

        500,

        1000,

        2000,

        3500,

        5000,

        7000,

        9000,

        12000,

        15000

    ],

    /*=====================================================
      QUIZ
    =====================================================*/

    QUIZ: {

        PASS_PERCENTAGE: 70,

        SHUFFLE: false,

        SHOW_EXPLANATION: true,

        TIMER: false,

        TIME_PER_QUESTION: 30

    },

    /*=====================================================
      BOSS
    =====================================================*/

    BOSS: {

        NAME: "Legacy Monster",

        LIFE: 100,

        ATTACK: 15,

        SPECIAL_ATTACK: 30

    },

    /*=====================================================
      STORAGE
    =====================================================*/

    STORAGE: {

        PREFIX: "bellacosa-java-"

    },

    /*=====================================================
      ÁUDIO
    =====================================================*/

    AUDIO: {

        ENABLED: true,

        VOLUME: 0.6

    },

    /*=====================================================
      ANIMAÇÕES
    =====================================================*/

    ANIMATION: {

        ENABLED: true,

        SPEED: 300

    },

    /*=====================================================
      PARTÍCULAS
    =====================================================*/

    PARTICLES: {

        ENABLED: true,

        COUNT: 40

    },

    /*=====================================================
      CONFETTI
    =====================================================*/

    CONFETTI: {

        ENABLED: true,

        PIECES: 180

    },

    /*=====================================================
      TIMELINE
    =====================================================*/

    TIMELINE: {

        AUTO_SCROLL: true,

        ANIMATION_DELAY: 400

    },

    /*=====================================================
      TERMINAL
    =====================================================*/

    TERMINAL: {

        BOOT_SPEED: 35,

        CURSOR: "_",

        PROMPT: "IBMZ>"

    },

    /*=====================================================
      CAMINHOS
    =====================================================*/

    PATHS: {

        DATA: "data/",

        IMAGES: "images/",

        AUDIO: "audio/",

        CSS: "css/",

        SEO: "seo/"

    },

    /*=====================================================
      ARQUIVOS JSON
    =====================================================*/

    DATA: {

        QUIZ:
            "data/quiz.json",

        TIMELINE:
            "data/timeline.json",

        CARDS:
            "data/cards.json",

        GLOSSARY:
            "data/glossary.json",

        ARCHITECTURE:
            "data/architecture.json",

        ACHIEVEMENTS:
            "data/achievements.json"

    },

    /*=====================================================
      ANALYTICS
    =====================================================*/

    ANALYTICS: {

        ENABLED: true

    },

    /*=====================================================
      TEMA
    =====================================================*/

    THEME: {

        PRIMARY: "#00D9FF",

        SECONDARY: "#0095FF",

        SUCCESS: "#27AE60",

        WARNING: "#F39C12",

        DANGER: "#E74C3C",

        BACKGROUND: "#08131F",

        SURFACE: "#12263A",

        TEXT: "#FFFFFF"

    }

};

/*=========================================================
 CONFIGURAÇÕES IMUTÁVEIS
=========================================================*/

Object.freeze(CONFIG);
Object.keys(CONFIG).forEach(key => {

    Object.freeze(CONFIG[key]);

});

export default CONFIG;