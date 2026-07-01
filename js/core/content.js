/**
 * ============================================================
 * Bellacosa Mainframe Java on IBM Z Simulator
 * Content Manager
 * ============================================================
 *
 * Responsabilidades
 *
 * • Carregar arquivos JSON
 * • Cache de conteúdo
 * • Pré-carregamento
 * • Evitar múltiplos fetch()
 *
 * ============================================================
 */

import Logger from "..js/core/logger.js";

class ContentManager {

    constructor() {

        this.cache = new Map();

    }

    /**
     * Carrega um arquivo JSON
     */
    async load(file) {

        if (this.cache.has(file)) {

            return this.cache.get(file);

        }

        const url = new URL(`../../data/${file}`, import.meta.url);

        Logger.info(`Carregando ${file}`);

        const response = await fetch(url);

        if (!response.ok) {

            throw new Error(`Erro carregando ${file}`);

        }

        const json = await response.json();

        this.cache.set(file, json);

        return json;

    }

    /**
     * Pré-carrega vários arquivos
     */
    async preload(files = []) {

        return Promise.all(

            files.map(file => this.load(file))

        );

    }

    /**
     * Obtém conteúdo já carregado
     */
    get(file) {

        return this.cache.get(file);

    }

    /**
     * Remove um item do cache
     */
    clear(file) {

        this.cache.delete(file);

    }

    /**
     * Limpa todo o cache
     */
    clearAll() {

        this.cache.clear();

    }

}

const Content = new ContentManager();

export default Content;