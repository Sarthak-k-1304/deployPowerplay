import { generateAnsMatrix } from "./ansMatrix.js";
import { Sudoku } from "./sudokuGamePrototype.js";
import { generateVisibleMatrix } from "./visibleMatrix.js";

let playerName = "";
let game = null;
export const createGame = function () {
  let pname = "";
  const startNewGame = () => {
    if (!playerName) {
      console.warn("Player name is required to start the game!");
      return;
    }
    console.log("playerName", playerName);

    pname = playerName;
    game = new Sudoku(pname);

    console.log("pname", pname);

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
    getName: () => pname,
  };
};

// Listen for messages from the parent (Powerplay app)
window.addEventListener("message", (event) => {
  if (event.origin !== "https://powerplays-psi.vercel.app") {
    // playerName = prompt("Enter Player Name");
    playerName = "Default";
  }

  if (event.data.type === "SEND_USERNAME") {
    const receivedName = event.data.playerName?.trim();
    console.log("Received player name:", receivedName);

    // Use the received name or prompt for one
    playerName = receivedName;
  }
});
