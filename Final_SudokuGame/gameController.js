import { generateAnsMatrix } from "./ansMatrix.js";
import { Sudoku } from "./sudokuGamePrototype.js";
import { generateVisibleMatrix } from "./visibleMatrix.js";

// create the game

let name = "";
window.addEventListener("message", (event) => {
  if (event.origin !== "https://deploy-powerplay-fv69.vercel.app") return;

  if (event.data.type === "SEND_USERNAME") {
    name = event.data.playerName;
    console.log("Received player name:", name);
  }
});
export const createGame = function () {
  if (name === "") name = prompt("Please Enter your name");
  let game = null;
  const startNewGame = () => {
    game = new Sudoku(name);
    // set both the matrix
    game.setMatrix(generateAnsMatrix(game.getMatrix()));
    game.setVisiblematrix(
      generateVisibleMatrix(
        game.getMatrix(),
        game.getVisiblematrix(),
        game.prefilledcell
      )
    );
    console.log(game.getMatrix());
    console.log(game.getVisiblematrix());
    game.renderBoard(game.getVisiblematrix());
  };
  return {
    startNewGame,
    getGame: () => game,
    getName: () => name,
  };
};
