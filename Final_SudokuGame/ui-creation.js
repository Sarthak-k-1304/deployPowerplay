const section = document.querySelector(".main");

export const createGrid = function () {
  const limit = 3;
  const sudoku = document.createElement("div");
  sudoku.classList.add("sudoku-box");

  for (let i = 0; i < limit; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    sudoku.appendChild(row);

    for (let j = 0; j < limit; j++) {
      const box = document.createElement("div");
      box.classList.add("box");
      let boxid = i * limit + j;
      box.dataset.box = boxid;
      row.appendChild(box);

      for (let k = 0; k < limit; k++) {
        const innerrow = document.createElement("div");
        innerrow.classList.add("row");
        box.appendChild(innerrow);

        for (let l = 0; l < limit; l++) {
          const cell = document.createElement("input");
          cell.classList.add("cell");
          cell.type = "text";
          cell.maxLength = 1;
          cell.value = "";
          const rowindx = k + Math.floor(boxid / limit) * limit;
          const colindx = l + (boxid % limit) * limit;
          cell.dataset.row = rowindx;
          cell.dataset.col = colindx;
          cell.setAttribute("disabled", true); // Disable input field
          innerrow.appendChild(cell);
        }
      }
    }
  }
  section.appendChild(sudoku);
};

export const createButtons = function () {
  const buttonsdiv = document.createElement("div");
  buttonsdiv.classList.add("button-div");
  section.appendChild(buttonsdiv);

  const generateNewGame = document.createElement("button");
  const checkresult = document.createElement("button");
  const test_onlydev = document.createElement("button");

  generateNewGame.classList.add("button");
  generateNewGame.id = "new-game";
  checkresult.classList.add("button");
  checkresult.id = "check-result";

  test_onlydev.classList.add("button");
  test_onlydev.id = "test";
  test_onlydev.textContent = "Test for dev";

  generateNewGame.textContent = "NewGame";
  checkresult.textContent = "Validate";
  buttonsdiv.append(test_onlydev, checkresult, generateNewGame);
};
