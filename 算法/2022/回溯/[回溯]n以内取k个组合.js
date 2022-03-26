/**
 * 题目描述：给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
 * @param {number} n 
 * @param {number} k 
 */
const combine = function (n, k) {
  const result = []
  const subset = []
  const dfs = function (idx) {
    if (subset.length === k) {
      result.push(subset.slice())
      return
    }
    for (let i = idx; i <= n; i ++) {
      subset.push(i)
      dfs(i + 1)
      subset.pop()
    }
  }
  dfs(1)
  return result
}

console.log(combine(5, 3));