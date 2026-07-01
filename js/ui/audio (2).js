/**
 * =========================================================
 * Bellacosa Mainframe
 * Java no IBM Z Simulator
 * audio.js
 * Sistema Global de Áudio
 * =========================================================
 */

const AudioManager = (() => {

    const sounds = new Map();

    let music = null;

    let enabled = true;

    let volume = 0.5;

    /**
     * Carrega um efeito sonoro
     */
    function load(name, src) {

        const audio = new Audio(src);

        audio.preload = "auto";

        audio.volume = volume;

        sounds.set(name, audio);

    }

    /**
     * Toca efeito sonoro
     */
    function play(name) {

        if (!enabled) return;

        const sound = sounds.get(name);

        if (!sound) {

            console.warn(`Áudio não encontrado: ${name}`);

            return;

        }

        const clone = sound.cloneNode();

        clone.volume = volume;

        clone.play().catch(() => {});

    }

    /**
     * Música de fundo
     */
    function playMusic(src, loop = true) {

        if (!enabled) return;

        stopMusic();

        music = new Audio(src);

        music.loop = loop;

        music.volume = volume * 0.45;

        music.play().catch(() => {});

    }

    /**
     * Pausar música
     */
    function pauseMusic() {

        music?.pause();

    }

    /**
     * Continuar música
     */
    function resumeMusic() {

        if (!enabled) return;

        music?.play().catch(() => {});

    }

    /**
     * Encerrar música
     */
    function stopMusic() {

        if (!music) return;

        music.pause();

        music.currentTime = 0;

        music = null;

    }

    /**
     * Volume
     */
    function setVolume(value) {

        volume = Math.max(0, Math.min(1, value));

        sounds.forEach(sound => sound.volume = volume);

        if (music) {

            music.volume = volume * 0.45;

        }

        localStorage.setItem("audio-volume", volume);

    }

    /**
     * Liga/desliga áudio
     */
    function enable(flag) {

        enabled = flag;

        if (!flag) {

            stopMusic();

        }

        localStorage.setItem("audio-enabled", flag);

    }

    function isEnabled() {

        return enabled;

    }

    function getVolume() {

        return volume;

    }

    /**
     * Sons padrão do simulador
     */
    function preload() {

        load("click", "assets/audio/click.mp3");

        load("success", "assets/audio/success.mp3");

        load("error", "assets/audio/error.mp3");

        load("correct", "assets/audio/correct.mp3");

        load("wrong", "assets/audio/wrong.mp3");

        load("achievement", "assets/audio/achievement.mp3");

        load("boss-hit", "assets/audio/boss-hit.mp3");

        load("boss-dead", "assets/audio/boss-dead.mp3");

        load("level-up", "assets/audio/level-up.mp3");

        load("terminal", "assets/audio/terminal.mp3");

    }

    /**
     * Inicialização
     */
    function init() {

        enabled = localStorage.getItem("audio-enabled") !== "false";

        volume = parseFloat(

            localStorage.getItem("audio-volume") || 0.5

        );

        preload();

        console.info("AudioManager iniciado.");

    }

    return {

        init,

        load,

        play,

        playMusic,

        pauseMusic,

        resumeMusic,

        stopMusic,

        setVolume,

        getVolume,

        enable,

        isEnabled

    };

})();

document.addEventListener("DOMContentLoaded", () => {

    AudioManager.init();

});