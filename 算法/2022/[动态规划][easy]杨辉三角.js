/**
 * @description 给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。
 * 在「杨辉三角」中，每个数是它左上方和右上方的数的和。
 * 输入: numRows = 5
 * 输出: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
 */

/**
 * @param {number} numRows
 * @return {number[][]}
 */
 var generate = function(numRows) {
     
  const result = [[1], [1, 1]]
  if (numRows === 1) {
      return [[1]]
  }
  if (numRows === 2) {
      return result
  }
  let i = 2;
  while (i < numRows) {
      result[i] = result[i] || []
      let j = 0;
      while (j <= i) {
          if (j === 0 || j === i) {
              result[i][j] = 1
          } else {
              result[i][j] = result[i - 1][j - 1] + result[i - 1][j]
          }
          j++
      }
      i++
  }
  return result
};