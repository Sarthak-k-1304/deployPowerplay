export const setupUihandler = function (currentGame) {
  const newGame = document.getElementById("new-game");
  const cells = document.querySelectorAll(".cell");
  newGame.addEventListener("click", () => {
    currentGame.startNewGame();
    let game = currentGame.getGame();

    cells.forEach((cell) => {
      cell.addEventListener("input", () => {
        cell.value = cell.value.replace(/[^1-9]/g, "");
        game.validation(cell);
      });
    });
  });

  const validateResult = document.getElementById("check-result");
  validateResult.addEventListener("click", () => {
    let game = currentGame.getGame();
    let correct = game.getCorrectcells();
    game.endTime = Date.now();
    console.log(correct);
    console.log("hi", game.prefilledcell);
    if (game.prefilledcell !== 81) alert("please complete the grid");
    else if (correct !== 81) alert("you lost");
    else alert("Wohoo you won");
  });

  const test = document.getElementById("test");
  test.addEventListener("click", () => {
    let temp = 0;
    const game = currentGame.getGame();
    cells.forEach((cell) => {
      let row = cell.getAttribute("data-row");
      let col = cell.getAttribute("data-col");
      if (cell.value == "") {
        temp++;
        cell.value = game.getMatrix()[row][col];
        game.getVisiblematrix()[row][col] = cell.value;
      }
    });
    game.incrementcorrectcell(temp);
    game.prefilledcell = 81;
  });
};
