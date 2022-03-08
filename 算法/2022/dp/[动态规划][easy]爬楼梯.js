/**
 * @see https://leetcode-cn.com/problems/climbing-stairs/
 * @description 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 */

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  const result = [1, 2]
  if (n < 2) {
      return result[n - 1]
  }
  let i = 2;
  // 动态规划本质就是用小结果推出大结果，由于只有 1/2 两种爬法
  // 所以本质上 n 的方法就是等于 n-2 阶层加上 n-1 阶，和斐波那契类似
  // 手推出 0/1 或者 1/2 2种基础往上推就行
  while (i < n) {
      result[i] = result[i - 1] + result[i - 2]
      i++
  }
  return result[n - 1]
};

console.log(climbStairs(5));