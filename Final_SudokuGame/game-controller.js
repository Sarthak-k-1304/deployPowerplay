import { generateAnsMatrix } from "./ans-matrix.js";
import { Sudoku } from "./sudoku-game-prototype.js";
import { generateVisibleMatrix } from "./visible-matrix.js";

export const createGame = function () {
  const name = prompt("Please Enter your name");
  let game = null;
  const startNewGame = () => {
    game = new Sudoku(name);
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
  };
};
