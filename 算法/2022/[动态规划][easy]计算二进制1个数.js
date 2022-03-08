/**
 * 
 * @see https://leetcode-cn.com/problems/counting-bits/
 * @description 给你一个整数 n ，对于 0 <= i <= n 中的每个 i ，计算其二进制表示中 1 的个数 ，返回一个长度为 n + 1 的数组 ans 作为答案。
 * 输入：n = 2
 * 输出：[0,1,1]
 * 解释：
 * 0 --> 0
 * 1 --> 1
 * 2 --> 10
 */


/**
 * @description 暴力解法，复杂度较高
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
  const toBinary = (origin) => {
    const result = []
    let r = origin
    let count = 0
    while (r >= 1) {
      const bit = r % 2
      if (bit === 1) {
        count += 1
      }
      result.push(bit)
      r = Math.floor(r / 2)
    }
    return count
  }
  const result = []
  for (let i = 0; i<=n; i++) {
    result.push(toBinary(i))
  }
  return result
};

countBits(5)

var countBits2 = function (n) {
  const dp = [0, 1]
  if (n === 0) {
    // 特殊用例手动返回
    return [0]
  }
  // * 2 本身等于左移动一位，所以 偶数位 dp[2i] = dp[i], 而 dp[i+1] = dp[i] + 1,由此可推出 O(n/2)解法
  for (let i = 1; i <= (n / 2); i++) {
    dp[2 * i] = dp[i]
    if (2 * i + 1 <= n) {
      dp[2 * i + 1] = dp[i] + 1
    }
  }
  return dp
}

console.log(countBits(5), countBits2(4));