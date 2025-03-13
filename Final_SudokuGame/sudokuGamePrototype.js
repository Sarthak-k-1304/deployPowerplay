const Player = function (name) {
  this.name = name;
};

export const Sudoku = function (name) {
  Player.call(this, name); // parent constructor

  this.id = this.generateUUID();
  this.prefilledcell = 25;
  this.startTime = Date.now();
  this.endTime = null;

  // Private Variables
  let correctcells = this.prefilledcell;
  let matrix = new Array(9).fill(0).map(() => new Array(9).fill(0));
  let visiblematrix = new Array(9).fill(0).map(() => new Array(9).fill(0));

  this.setMatrix = (newMatrix) => {
    matrix = newMatrix;
  };
  this.setVisiblematrix = (newMatrix) => {
    visiblematrix = newMatrix;
  };

  this.getMatrix = () => {
    return matrix;
  };
  this.getVisiblematrix = () => {
    return visiblematrix;
  };
  this.getCorrectcells = () => {
    return correctcells;
  };

  this.incrementcorrectcell = (num = 1) => {
    correctcells += num;
  };
  this.decrementcorrectcell = () => {
    correctcells--;
  };
};
// uuid generation
Sudoku.prototype.generateUUID = function () {
  let uuid = "";
  for (let i = 0; i < 36; i++) {
    let digit = Math.floor(Math.random() * 16);
    if (i === 14) {
      uuid += "4";
    } else if (i === 19) {
      uuid += ((digit & 3) | 8).toString(16);
    } else if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += "-";
    } else {
      uuid += digit.toString(16);
    }
  }
  return uuid;
};
// rendering the board
Sudoku.prototype.renderBoard = function (visiblematrix) {
  let cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    let rowindx = parseInt(cell.getAttribute("data-row"));

    let colindx = parseInt(cell.getAttribute("data-col"));

    if (visiblematrix[rowindx][colindx] != 0) {
      cell.value = visiblematrix[rowindx][colindx];
      cell.setAttribute("disabled", true); // Disable input field
      cell.style.backgroundColor = "#5C4033"; // Set background color
      cell.style.color = "white"; // Ensure text is visible
    } else {
      if (cell.style.backgroundColor === "rgb(92, 64, 51)") {
        cell.style.backgroundColor = "";
        cell.style.color = "";
      }
      cell.value = "";
      cell.removeAttribute("disabled");
    }
  });
};
// validation at each typing in cell
Sudoku.prototype.validation = function (element) {
  let row = parseInt(element.getAttribute("data-row"));
  let col = parseInt(element.getAttribute("data-col"));
  if (element.value == "") {
    this.prefilledcell--;
    let previous = this.getVisiblematrix()[row][col];
    if (previous == this.getMatrix()[row][col]) this.decrementcorrectcell();
  } else {
    this.prefilledcell++;
    this.getVisiblematrix()[row][col] = element.value;
    if (this.getVisiblematrix()[row][col] == this.getMatrix()[row][col])
      this.incrementcorrectcell();
  }
};
