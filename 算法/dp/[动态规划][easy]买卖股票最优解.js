/**
 * @see https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/
 * @description 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
 * 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
 * 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
  let max = 0
  // 初始值为第一天的值
  let min = prices[0]
  let i = 1
  while (i < prices.length) {
    // 每天都和之前的最小值比对，由于只有单次交易，所以只需要线性记录最大值减去最小值就可以
    max = Math.max(max, prices[i] - min)
    min = Math.min(prices[i], min)
    i++
  }
  return max
};