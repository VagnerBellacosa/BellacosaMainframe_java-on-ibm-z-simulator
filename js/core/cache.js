/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z Simulator
 cache.js
=========================================================*/

import CONFIG from "./config.js";

class Cache {

    constructor() {

        this.prefix =
            CONFIG.STORAGE.PREFIX + "cache:";

        this.defaultTTL =
            1000 * 60 * 60; // 1 hora

    }

    /*=====================================================
      KEY
    =====================================================*/

    key(name) {

        return this.prefix + name;

    }

    /*=====================================================
      SET
    =====================================================*/

    set(name, value, ttl = this.defaultTTL) {

        const data = {

            value,

            created: Date.now(),

            expires: Date.now() + ttl

        };

        localStorage.setItem(

            this.key(name),

            JSON.stringify(data)

        );

    }

    /*=====================================================
      GET
    =====================================================*/

    get(name, fallback = null) {

        const raw = localStorage.getItem(

            this.key(name)

        );

        if (!raw) return fallback;

        try {

            const data = JSON.parse(raw);

            if (

                data.expires &&

                Date.now() > data.expires

            ) {

                this.remove(name);

                return fallback;

            }

            return data.value;

        }

        catch {

            return fallback;

        }

    }

    /*=====================================================
      HAS
    =====================================================*/

    has(name) {

        return this.get(name) !== null;

    }

    /*=====================================================
      REMOVE
    =====================================================*/

    remove(name) {

        localStorage.removeItem(

            this.key(name)

        );

    }

    /*=====================================================
      CLEAR
    =====================================================*/

    clear() {

        Object.keys(localStorage)

            .filter(

                key =>

                key.startsWith(this.prefix)

            )

            .forEach(

                key =>

                localStorage.removeItem(key)

            );

    }

    /*=====================================================
      CLEAN EXPIRED
    =====================================================*/

    cleanExpired() {

        Object.keys(localStorage)

            .filter(

                key =>

                key.startsWith(this.prefix)

            )

            .forEach(key => {

                try {

                    const item = JSON.parse(

                        localStorage.getItem(key)

                    );

                    if (

                        item.expires &&

                        Date.now() >

                        item.expires

                    ) {

                        localStorage.removeItem(key);

                    }

                }

                catch {}

            });

    }

    /*=====================================================
      SIZE
    =====================================================*/

    size() {

        return Object.keys(localStorage)

            .filter(

                key =>

                key.startsWith(this.prefix)

            )

            .length;

    }

    /*=====================================================
      KEYS
    =====================================================*/

    keys() {

        return Object.keys(localStorage)

            .filter(

                key =>

                key.startsWith(this.prefix)

            )

            .map(

                key =>

                key.replace(this.prefix, "")

            );

    }

    /*=====================================================
      STATS
    =====================================================*/

    stats() {

        return {

            items: this.size(),

            keys: this.keys(),

            ttl: this.defaultTTL

        };

    }

    /*=====================================================
      REMEMBER
    =====================================================*/

    async remember(name, callback, ttl = this.defaultTTL) {

        const cached = this.get(name);

        if (cached !== null) {

            return cached;

        }

        const value = await callback();

        this.set(name, value, ttl);

        return value;

    }

}

const cache = new Cache();

export default cache;