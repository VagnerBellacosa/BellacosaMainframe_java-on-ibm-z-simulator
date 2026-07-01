/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z Simulator
 constants.js
=========================================================*/

/*=========================================================
 APPLICATION
=========================================================*/

export const APP = Object.freeze({

    NAME: "Java no IBM Z Simulator",

    VERSION: "1.0.0",

    AUTHOR: "Vagner Bellacosa",

    BRAND: "Bellacosa Mainframe",

    COPYRIGHT:
        "© Bellacosa Mainframe"

});

/*=========================================================
 ROUTES
=========================================================*/

export const ROUTES = Object.freeze({

    STARTUP: "startup",

    INTRO: "intro",

    TIMELINE: "timeline",

    ARCHITECTURE: "architecture",

    MAPPING: "mapping",

    LAB: "lab",

    TERMINAL: "terminal",

    QUIZ: "quiz",

    BOSS: "boss",

    CERTIFICATE: "certificate",

    FINISH: "finish",

    ABOUT: "about",

    CREDITS: "credits"

});

/*=========================================================
 EVENTS
=========================================================*/

export const EVENTS = Object.freeze({

    READY: "app:ready",

    START: "app:start",

    LOADING_SHOW: "loading:show",

    LOADING_HIDE: "loading:hide",

    XP_CHANGED: "xp:changed",

    LEVEL_UP: "xp:levelup",

    QUIZ_FINISHED: "quiz:finished",

    LAB_FINISHED: "lab:finished",

    BOSS_DEFEATED: "boss:defeated",

    ACHIEVEMENT: "achievement:unlock",

    SETTINGS_CHANGED: "settings:changed",

    ROUTE_CHANGED: "router:changed"

});

/*=========================================================
 STORAGE KEYS
=========================================================*/

export const STORAGE = Object.freeze({

    PLAYER: "player",

    XP: "xp",

    LEVEL: "level",

    SETTINGS: "settings",

    ACHIEVEMENTS: "achievements",

    QUIZ: "quiz",

    LABS: "labs",

    TIMELINE: "timeline",

    CACHE: "cache"

});

/*=========================================================
 DATA FILES
=========================================================*/

export const DATA = Object.freeze({

    QUIZ: "data/quiz.json",

    TIMELINE: "data/timeline.json",

    GLOSSARY: "data/glossary.json",

    CARDS: "data/cards.json",

    ARCHITECTURE: "data/architecture.json",

    ACHIEVEMENTS: "data/achievements.json"

});

/*=========================================================
 IMAGE PATHS
=========================================================*/

export const IMAGES = Object.freeze({

    LOGO: "images/logo.png",

    JAVA: "images/java.png",

    COBOL: "images/cobol.png",

    ZOS: "images/zos.png",

    CICS: "images/cics.png",

    DB2: "images/db2.png",

    IMS: "images/ims.png",

    MQ: "images/mq.png",

    JCL: "images/jcl.png",

    VSAM: "images/vsam.png",

    API: "images/api.png",

    TERMINAL: "images/terminal.png",

    BOSS: "images/boss.png",

    TROPHY: "images/trophy.png",

    CERTIFICATE: "images/certificate.png",

    HERO: "images/hero-bg.png",

    TIMELINE: "images/timeline-bg.png",

    AVATAR1: "images/avatar1.png",

    AVATAR2: "images/avatar2.png",

    AVATAR3: "images/avatar3.png"

});

/*=========================================================
 AUDIO
=========================================================*/

export const AUDIO = Object.freeze({

    CLICK: "audio/click.mp3",

    SUCCESS: "audio/success.mp3",

    ERROR: "audio/error.mp3",

    ATTACK: "audio/attack.mp3",

    POWER: "audio/power.mp3",

    VICTORY: "audio/victory.mp3",

    BOOT: "audio/boot.mp3"

});

/*=========================================================
 LEVELS
=========================================================*/

export const LEVELS = Object.freeze([

    0,

    500,

    1000,

    2000,

    3500,

    5000,

    7000,

    10000,

    15000,

    20000

]);

/*=========================================================
 XP
=========================================================*/

export const XP = Object.freeze({

    INTRO: 50,

    TIMELINE: 100,

    ARCHITECTURE: 250,

    MAPPING: 150,

    LAB: 100,

    QUIZ_CORRECT: 100,

    QUIZ_COMPLETE: 500,

    BOSS: 1000,

    CERTIFICATE: 500

});

/*=========================================================
 QUIZ
=========================================================*/

export const QUIZ = Object.freeze({

    PASS_PERCENTAGE: 70,

    TIME_PER_QUESTION: 30,

    MAX_ATTEMPTS: 3

});

/*=========================================================
 BOSS
=========================================================*/

export const BOSS = Object.freeze({

    NAME: "Legacy Monster",

    MAX_HP: 100,

    NORMAL_DAMAGE: 12,

    SPECIAL_DAMAGE: 25

});

/*=========================================================
 COLORS
=========================================================*/

export const COLORS = Object.freeze({

    PRIMARY: "#00D9FF",

    SECONDARY: "#0095FF",

    SUCCESS: "#2ECC71",

    WARNING: "#F39C12",

    DANGER: "#E74C3C",

    DARK: "#08131F",

    SURFACE: "#12263A",

    LIGHT: "#FFFFFF"

});

/*=========================================================
 ICONS
=========================================================*/

export const ICONS = Object.freeze({

    JAVA: "☕",

    COBOL: "💚",

    IBMZ: "🖥",

    QUIZ: "❓",

    LAB: "🧪",

    BOSS: "👹",

    XP: "⭐",

    TROPHY: "🏆",

    CERTIFICATE: "🎓",

    TIMELINE: "🗺",

    SETTINGS: "⚙"

});

/*=========================================================
 ANIMATIONS
=========================================================*/

export const ANIMATIONS = Object.freeze({

    FAST: 150,

    NORMAL: 300,

    SLOW: 600,

    VERY_SLOW: 1000

});

/*=========================================================
 DEFAULT EXPORT
=========================================================*/

export default Object.freeze({

    APP,

    ROUTES,

    EVENTS,

    STORAGE,

    DATA,

    IMAGES,

    AUDIO,

    LEVELS,

    XP,

    QUIZ,

    BOSS,

    COLORS,

    ICONS,

    ANIMATIONS

});