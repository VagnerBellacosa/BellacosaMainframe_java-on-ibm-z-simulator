/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z
 event-bus.js
=========================================================*/

class EventBus {

    constructor() {

        this.events = new Map();

        this.debug = false;

    }

    /*=====================================================
      Registrar evento
    =====================================================*/

    on(eventName, callback) {

        if (!this.events.has(eventName)) {

            this.events.set(eventName, []);

        }

        this.events.get(eventName).push(callback);

        return () => this.off(eventName, callback);

    }

    /*=====================================================
      Registrar apenas uma vez
    =====================================================*/

    once(eventName, callback) {

        const wrapper = (...args) => {

            callback(...args);

            this.off(eventName, wrapper);

        };

        this.on(eventName, wrapper);

    }

    /*=====================================================
      Remover evento
    =====================================================*/

    off(eventName, callback) {

        if (!this.events.has(eventName)) {

            return;

        }

        const listeners = this.events.get(eventName);

        const filtered = listeners.filter(

            fn => fn !== callback

        );

        this.events.set(eventName, filtered);

    }

    /*=====================================================
      Emitir evento
    =====================================================*/

    emit(eventName, payload = {}) {

        if (this.debug) {

            console.log(

                "[EVENT]",

                eventName,

                payload

            );

        }

        const listeners = this.events.get(eventName);

        if (!listeners) {

            return;

        }

        listeners.forEach(listener => {

            try {

                listener(payload);

            }

            catch (error) {

                console.error(

                    "Erro no evento:",

                    eventName,

                    error

                );

            }

        });

    }

    /*=====================================================
      Limpar um evento
    =====================================================*/

    clear(eventName) {

        this.events.delete(eventName);

    }

    /*=====================================================
      Limpar todos
    =====================================================*/

    clearAll() {

        this.events.clear();

    }

    /*=====================================================
      Existe?
    =====================================================*/

    has(eventName) {

        return this.events.has(eventName);

    }

    /*=====================================================
      Quantidade
    =====================================================*/

    count(eventName) {

        if (!this.events.has(eventName)) {

            return 0;

        }

        return this.events.get(eventName).length;

    }

    /*=====================================================
      Listar
    =====================================================*/

    list() {

        return [...this.events.keys()];

    }

    /*=====================================================
      Informações
    =====================================================*/

    info() {

        const result = {};

        this.events.forEach((listeners, event) => {

            result[event] = listeners.length;

        });

        return result;

    }

    /*=====================================================
      Debug
    =====================================================*/

    enableDebug() {

        this.debug = true;

    }

    disableDebug() {

        this.debug = false;

    }

}

const eventBus = new EventBus();

export default eventBus;