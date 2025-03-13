export const generateVisibleMatrix = function (
  matrix,
  visiblematrix,
  visibleNumbers
) {
  // Create a pair of array with each bigger cell indicating the number of values in it
  let mapping = [...Array(9)].map((_, index) => [index, 0]);

  let extras = visibleNumbers - 9 * Math.floor(visibleNumbers / 9);

  let minumberallowed = Math.floor(visibleNumbers / 9);

  while (mapping.length > 0 && visibleNumbers > 0) {
    let index = Math.floor(Math.random() * mapping.length);

    let [boxnum, value] = mapping[index];

    if (
      (extras > 0 && value < minumberallowed + 1) ||
      value < minumberallowed
    ) {
      const rowstart = Math.floor((boxnum % 9) / 3) * 3;
      let row = [rowstart, rowstart + 1, rowstart + 2];
      const colstart = Math.floor(boxnum * 3) % 9;
      let col = [colstart, colstart + 1, colstart + 2];

      let done = true;
      while (done && row.length > 0) {
        let i = Math.floor(Math.random() * row.length);
        let j = Math.floor(Math.random() * col.length);
        if (visiblematrix[row[i]][col[j]] == 0) {
          visiblematrix[row[i]][col[j]] = matrix[row[i]][col[j]];
          done = false;
        } else {
          row.splice(i, 1);
        }
      }
      if (value == minumberallowed) extras--;
      visibleNumbers--;
      mapping[index][1]++;
    } else mapping.splice(index, 1); // when a box completely filled it is removed from array;
  }
  return visiblematrix;
};
