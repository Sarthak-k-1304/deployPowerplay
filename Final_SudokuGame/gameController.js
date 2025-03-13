import { generateAnsMatrix } from "./ansMatrix.js";
import { Sudoku } from "./sudokuGamePrototype.js";
import { generateVisibleMatrix } from "./visibleMatrix.js";

let game = null;
let playerName = "";

window.addEventListener("message", (event) => {
  if (event.origin !== "https://deploy-powerplay-fv69.vercel.app") return;

  if (event.data.type === "SEND_USERNAME") {
    playerName = event.data.playerName?.trim();

    console.log("Received player name:", playerName);

    if (!playerName) {
      playerName = prompt("Enter Player Name") || "";
    }

    if (playerName) {
      startNewGame(playerName); // Start game as soon as username is received
    } else {
      console.warn("Player name is required to start the game!");
    }
  }
});

export const createGame = function () {
  const startNewGame = (name) => {
    if (!name) return;

    game = new Sudoku(name);
    game.setMatrix(generateAnsMatrix(game.getMatrix()));
    game.setVisiblematrix(
      generateVisibleMatrix(
        game.getMatrix(),
        game.getVisiblematrix(),
        game.prefilledcell
      )
    );

    console.log("Game Matrix:", game.getMatrix());
    console.log("Visible Matrix:", game.getVisiblematrix());
    game.renderBoard(game.getVisiblematrix());
  };

  return {
    startNewGame,
    getGame: () => game,
    getName: () => playerName,
  };
};
