/**
 * =========================================================
 * Bellacosa Mainframe
 * Java no IBM Z Simulator
 * sounds.js
 * Catálogo de Sons
 * =========================================================
 */

const Sounds = Object.freeze({

    /*======================================================
      Interface
    ======================================================*/

    CLICK: "click",

    HOVER: "hover",

    OPEN: "open",

    CLOSE: "close",

    NOTIFICATION: "notification",

    SWITCH: "switch",

    /*======================================================
      Startup
    ======================================================*/

    STARTUP: "startup",

    BOOT: "boot",

    WELCOME: "welcome",

    SHUTDOWN: "shutdown",

    /*======================================================
      Terminal IBM Z
    ======================================================*/

    TERMINAL_KEY: "terminal-key",

    TERMINAL_ENTER: "terminal-enter",

    TERMINAL_ERROR: "terminal-error",

    TERMINAL_SUCCESS: "terminal-success",

    TERMINAL_BOOT: "terminal-boot",

    /*======================================================
      Quiz
    ======================================================*/

    QUIZ_CORRECT: "quiz-correct",

    QUIZ_WRONG: "quiz-wrong",

    QUIZ_FINISH: "quiz-finish",

    QUIZ_NEXT: "quiz-next",

    /*======================================================
      Laboratórios
    ======================================================*/

    LAB_START: "lab-start",

    LAB_COMPLETE: "lab-complete",

    LAB_HINT: "lab-hint",

    /*======================================================
      XP
    ======================================================*/

    XP: "xp",

    LEVEL_UP: "level-up",

    ACHIEVEMENT: "achievement",

    TROPHY: "trophy",

    CERTIFICATE: "certificate",

    /*======================================================
      Boss Battle
    ======================================================*/

    BOSS_INTRO: "boss-intro",

    BOSS_ATTACK: "boss-attack",

    PLAYER_ATTACK: "player-attack",

    CRITICAL: "critical",

    DAMAGE: "damage",

    HEAL: "heal",

    VICTORY: "victory",

    DEFEAT: "defeat",

    /*======================================================
      Música
    ======================================================*/

    MUSIC_MENU: "music-menu",

    MUSIC_LAB: "music-lab",

    MUSIC_BOSS: "music-boss",

    MUSIC_VICTORY: "music-victory",

    MUSIC_AMBIENT: "music-ambient"

});

/*==========================================================
 Registro automático
==========================================================*/

function registerDefaultSounds(){

    if(!window.AudioManager){

        console.warn("AudioManager não encontrado.");

        return;

    }

    const base="assets/audio/";

    AudioManager.load(Sounds.CLICK,`${base}click.mp3`);

    AudioManager.load(Sounds.HOVER,`${base}hover.mp3`);

    AudioManager.load(Sounds.OPEN,`${base}open.mp3`);

    AudioManager.load(Sounds.CLOSE,`${base}close.mp3`);

    AudioManager.load(Sounds.NOTIFICATION,`${base}notification.mp3`);

    AudioManager.load(Sounds.SWITCH,`${base}switch.mp3`);

    AudioManager.load(Sounds.STARTUP,`${base}startup.mp3`);

    AudioManager.load(Sounds.BOOT,`${base}boot.mp3`);

    AudioManager.load(Sounds.WELCOME,`${base}welcome.mp3`);

    AudioManager.load(Sounds.SHUTDOWN,`${base}shutdown.mp3`);

    AudioManager.load(Sounds.TERMINAL_KEY,`${base}terminal-key.mp3`);

    AudioManager.load(Sounds.TERMINAL_ENTER,`${base}terminal-enter.mp3`);

    AudioManager.load(Sounds.TERMINAL_ERROR,`${base}terminal-error.mp3`);

    AudioManager.load(Sounds.TERMINAL_SUCCESS,`${base}terminal-success.mp3`);

    AudioManager.load(Sounds.TERMINAL_BOOT,`${base}terminal-boot.mp3`);

    AudioManager.load(Sounds.QUIZ_CORRECT,`${base}quiz-correct.mp3`);

    AudioManager.load(Sounds.QUIZ_WRONG,`${base}quiz-wrong.mp3`);

    AudioManager.load(Sounds.QUIZ_FINISH,`${base}quiz-finish.mp3`);

    AudioManager.load(Sounds.QUIZ_NEXT,`${base}quiz-next.mp3`);

    AudioManager.load(Sounds.LAB_START,`${base}lab-start.mp3`);

    AudioManager.load(Sounds.LAB_COMPLETE,`${base}lab-complete.mp3`);

    AudioManager.load(Sounds.LAB_HINT,`${base}lab-hint.mp3`);

    AudioManager.load(Sounds.XP,`${base}xp.mp3`);

    AudioManager.load(Sounds.LEVEL_UP,`${base}level-up.mp3`);

    AudioManager.load(Sounds.ACHIEVEMENT,`${base}achievement.mp3`);

    AudioManager.load(Sounds.TROPHY,`${base}trophy.mp3`);

    AudioManager.load(Sounds.CERTIFICATE,`${base}certificate.mp3`);

    AudioManager.load(Sounds.BOSS_INTRO,`${base}boss-intro.mp3`);

    AudioManager.load(Sounds.BOSS_ATTACK,`${base}boss-attack.mp3`);

    AudioManager.load(Sounds.PLAYER_ATTACK,`${base}player-attack.mp3`);

    AudioManager.load(Sounds.CRITICAL,`${base}critical.mp3`);

    AudioManager.load(Sounds.DAMAGE,`${base}damage.mp3`);

    AudioManager.load(Sounds.HEAL,`${base}heal.mp3`);

    AudioManager.load(Sounds.VICTORY,`${base}victory.mp3`);

    AudioManager.load(Sounds.DEFEAT,`${base}defeat.mp3`);

}

document.addEventListener(

    "DOMContentLoaded",

    registerDefaultSounds

);