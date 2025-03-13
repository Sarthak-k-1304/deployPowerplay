// check whether number can be placed in the cell
const isSafe = function (rowindx, colindx, num, row, col, box) {
  if (
    (row[rowindx] & (1 << (num - 1))) !== 0 ||
    (col[colindx] & (1 << (num - 1))) !== 0 ||
    (box[Math.floor(rowindx / 3) * 3 + Math.floor(colindx / 3)] &
      (1 << (num - 1))) !==
      0
  ) {
    return false;
  }
  return true;
};

// Recursive function to create matrix

const matrixGenRec = function (rowindx, colindx, n, matrix, row, col, box) {
  if (rowindx == n - 1 && colindx == n) return true;

  if (colindx == n) {
    rowindx++;
    colindx = 0;
  }

  if (matrix[rowindx][colindx] != 0)
    return matrixGenRec(rowindx, colindx + 1, n, matrix, row, col, box);

  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  while (numbers.length > 0) {
    let index = Math.floor(Math.random() * numbers.length);
    let randNum = numbers.splice(index, 1)[0];
    if (isSafe(rowindx, colindx, randNum, row, col, box)) {
      matrix[rowindx][colindx] = randNum;
      row[rowindx] |= 1 << (randNum - 1);
      col[colindx] |= 1 << (randNum - 1);
      box[Math.floor(rowindx / 3) * 3 + Math.floor(colindx / 3)] |=
        1 << (randNum - 1);

      if (matrixGenRec(rowindx, colindx + 1, n, matrix, row, col, box))
        return true;
      matrix[rowindx][colindx] = 0;
      row[rowindx] &= ~(1 << (randNum - 1));
      col[colindx] &= ~(1 << (randNum - 1));
      box[Math.floor(rowindx / 3) * 3 + Math.floor(colindx / 3)] &= ~(
        1 <<
        (randNum - 1)
      );
    }
  }
};

// give us the answer Matrix

export const generateAnsMatrix = function (matrix) {
  const row = new Array(9).fill(0);
  const col = new Array(9).fill(0);
  const box = new Array(9).fill(0); // 3*3 grid cell
  matrixGenRec(0, 0, 9, matrix, row, col, box);
  return matrix;
};
