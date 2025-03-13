import { generateAnsMatrix } from "./ansMatrix.js";
import { Sudoku } from "./sudokuGamePrototype.js";
import { generateVisibleMatrix } from "./visibleMatrix.js";

// create the game
export const createGame = function () {
  const name = prompt("Please Enter your name");
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
