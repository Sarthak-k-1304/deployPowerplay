import { generateAnsMatrix } from "./ansMatrix.js";
import { Sudoku } from "./sudokuGamePrototype.js";
import { generateVisibleMatrix } from "./visibleMatrix.js";

let game = null;
let playerName = "";

export const createGame = function () {
  const startNewGame = (name) => {
    if (!name) {
      console.warn("Player name is required to start the game!");
      return;
    }

    playerName = name; // Update player name globally
    game = new Sudoku(playerName);

    // Set the matrices
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

// Listen for messages from the parent (Powerplay app)
window.addEventListener("message", (event) => {
  if (event.origin !== "https://powerplays-psi.vercel.app/") return;

  if (event.data.type === "SEND_USERNAME") {
    const receivedName = event.data.playerName?.trim();
    console.log("Received player name:", receivedName);

    // Use the received name or prompt for one
    const finalName = receivedName || prompt("Enter Player Name");
    if (finalName) {
      const gameInstance = createGame();
      gameInstance.startNewGame(finalName);
    }
  }
});
