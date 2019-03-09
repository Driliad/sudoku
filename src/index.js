const getUnassignedLocation = matrix => {
   for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
         if (matrix[row][col] === 0) {
            return [row, col];
         }
      }
   }

   return [9, 9];
};

const isInRow = (matrix, row, num) => {
   for (let col = 0; col < 9; col++) {
      if (matrix[row][col] === num) {
         return true;
      }
   }

   return false;
};

const isInCol = (matrix, col, num) => {
   for (let row = 0; row < 9; row++) {
      if (matrix[row][col] === num) {
         return true;
      }
   }

   return false;
};

const isInBox = (matrix, startRow, startCol, num) => {
   for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
         if (matrix[row + startRow][col + startCol] == num) {
            return true;
         }
      }
   }
   return false;
};

const canUse = (matrix, row, col, num) => {
   return (
      !isInRow(matrix, row, num) &&
      !isInCol(matrix, col, num) &&
      !isInBox(matrix, row - (row % 3), col - (col % 3), num)
   );
};

const solveSudoku = matrix => {
   const location = getUnassignedLocation(matrix);

   const [r, c] = [location[0], location[1]];

   if (r === 9 && c === 9) {
      return true;
   }

   for (let index = 1; index <= 9; index++) {
      if (canUse(matrix, r, c, index)) {
         matrix[r][c] = index;

         if (solveSudoku(matrix)) {
            return matrix;
         }

         matrix[r][c] = 0;
      }
   }

   return false;
};

module.exports = solveSudoku;
