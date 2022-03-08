// 给定一个非负索引 rowIndex，返回「杨辉三角」的第 rowIndex 行。
// 在「杨辉三角」中，每个数是它左上方和右上方的数的和。

/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
  const result = [[1], [1, 1]]
  if (rowIndex < 2) {
    return result[rowIndex]
  }
  // 只用2个子数组减少内存使用,
  const prev = 0
  const curr = 1

  let i = 2
  while (i <= rowIndex) {
    let j = 0
    // 每次都轮替和清空，减少内存使用
    result[prev] = result[curr]
    result[curr] = []
    while (j <= i) {
      if (j === 0 || j === i) {
        result[curr][j] = 1
        // 中止条件
        if (j === rowIndex) {
          return result[curr]
        }
      } else {
        result[curr][j] = result[prev][j - 1] + result[prev][j]
      }
      j++
    }
    i++
  }
};

console.log(getRow(6));