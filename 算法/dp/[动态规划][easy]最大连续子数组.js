// 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

// 子数组 是数组中的一个连续部分。

// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。

// 复杂度  O(n)

/**
 * @param {number[]} nums
 * @return {number}
 */
const maxSubArray = function(nums, stack = []) {
  let max = nums[0]
  for (let i = 1; i < nums.length; i++) {
    // 如果前一个数是负数，重新开始, 否则就加上
    nums[i] = Math.max(nums[i], nums[i - 1] + nums[i])
    // 检查当前值是否大于stack里的最大值
    max = Math.max(nums[i], max)
  }
  return max
};
