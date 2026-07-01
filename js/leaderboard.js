/*=========================================================
 Bellacosa Mainframe
 Java no IBM Z Simulator
 leaderboard.js
=========================================================*/

import Storage from "./storage.js";
import XPManager from "./xp-manager.js";
import Analytics from "./analytics.js";
import EventBus from "./event-bus.js";
import Utils from "./utils.js";

class Leaderboard {

    constructor() {

        this.storageKey = "leaderboard";

        this.players = [];

        this.maxPlayers = 100;

    }

    /*=====================================================
      INITIALIZE
    =====================================================*/

    initialize() {

        this.players = Storage.get(

            this.storageKey,

            []

        );

        this.sort();

    }

    /*=====================================================
      SAVE
    =====================================================*/

    save() {

        Storage.set(

            this.storageKey,

            this.players

        );

    }

    /*=====================================================
      ADD PLAYER
    =====================================================*/

    add(player) {

        const record = {

            id: crypto.randomUUID(),

            name:

                player.name ||

                "Padawan",

            xp:

                player.xp ||

                0,

            level:

                player.level ||

                1,

            achievements:

                player.achievements ||

                0,

            quiz:

                player.quiz ||

                0,

            boss:

                player.boss ||

                false,

            date:

                new Date()

                .toISOString()

        };

        this.players.push(record);

        this.sort();

        this.trim();

        this.save();

        Analytics.event(

            "leaderboard_add"

        );

        EventBus.emit(

            "leaderboard:changed"

        );

    }

    /*=====================================================
      CURRENT PLAYER
    =====================================================*/

    addCurrentPlayer() {

        this.add({

            name:

                Storage.get(

                    "playerName",

                    "Padawan"

                ),

            xp:

                XPManager.total(),

            level:

                XPManager.level(),

            achievements:

                Storage.get(

                    "achievementCount",

                    0

                ),

            quiz:

                Storage.get(

                    "quizScore",

                    0

                ),

            boss:

                Storage.get(

                    "bossCompleted",

                    false

                )

        });

    }

    /*=====================================================
      SORT
    =====================================================*/

    sort() {

        this.players.sort(

            (a, b) => {

                if (

                    b.xp !== a.xp

                )

                    return b.xp - a.xp;

                if (

                    b.level !== a.level

                )

                    return b.level - a.level;

                return new Date(

                    b.date

                ) - new Date(

                    a.date

                );

            }

        );

    }

    /*=====================================================
      LIMIT
    =====================================================*/

    trim() {

        if (

            this.players.length >

            this.maxPlayers

        ) {

            this.players =

                this.players.slice(

                    0,

                    this.maxPlayers

                );

        }

    }

    /*=====================================================
      TOP
    =====================================================*/

    top(limit = 10) {

        return this.players.slice(

            0,

            limit

        );

    }

    /*=====================================================
      POSITION
    =====================================================*/

    position(name) {

        return this.players.findIndex(

            p =>

            p.name === name

        ) + 1;

    }

    /*=====================================================
      CLEAR
    =====================================================*/

    clear() {

        this.players = [];

        this.save();

    }

    /*=====================================================
      COUNT
    =====================================================*/

    count() {

        return this.players.length;

    }

    /*=====================================================
      EXPORT
    =====================================================*/

    export() {

        return JSON.stringify(

            this.players,

            null,

            2

        );

    }

    /*=====================================================
      IMPORT
    =====================================================*/

    import(json) {

        try {

            this.players =

                JSON.parse(json);

            this.sort();

            this.save();

            return true;

        }

        catch {

            return false;

        }

    }

    /*=====================================================
      DOWNLOAD
    =====================================================*/

    download() {

        const blob =

            new Blob(

                [

                    this.export()

                ],

                {

                    type:

                    "application/json"

                }

            );

        const url =

            URL.createObjectURL(blob);

        const a =

            document.createElement("a");

        a.href = url;

        a.download =

            "leaderboard.json";

        a.click();

        URL.revokeObjectURL(url);

    }

    /*=====================================================
      RENDER
    =====================================================*/

    render(container = "#leaderboard") {

        const div =

            Utils.$(container);

        if (!div) return;

        div.innerHTML = `

<table class="leaderboard-table">

<thead>

<tr>

<th>#</th>

<th>Jogador</th>

<th>Nível</th>

<th>XP</th>

<th>🏆</th>

</tr>

</thead>

<tbody>

${this.top(20).map((p, i) => `

<tr>

<td>${i + 1}</td>

<td>${p.name}</td>

<td>${p.level}</td>

<td>${p.xp}</td>

<td>${p.achievements}</td>

</tr>

`).join("")}

</tbody>

</table>

`;

    }

}

const leaderboard = new Leaderboard();

export default leaderboard;