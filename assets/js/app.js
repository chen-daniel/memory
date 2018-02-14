// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html";

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

import socket from "./socket";

import run_game from "./game";

function index() {
    $('#toGame').click(() => {
        let game = $('#game').val();
        if (game == '') {
            return;
        }
        else {
            window.location.replace(window.location.origin + '/game/' + game);
        }
    })
}

function init() {
    if (document.getElementById('index')) {
        index();
        return;
    }
    let channel = socket.channel("games:" + window.gameName, {});
    let root = document.getElementById('game');
    run_game(root, channel);
}

// Use jQuery to delay until page loaded.
$(init);

