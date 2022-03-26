/**
 * @description 给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
 * @param {Array<number>} nums 
 * @param {number} k
 * @description 递归解法，复杂度为 O(kn)
 */
const getMaxVal = function (nums, k) {
  const result = []
  
  const getMax = function (arr, left, right) {
    let max = -Infinity
    for (let i = left; i < right; i++) {
      if (arr[i] > max)  {
        max = arr[i]
      }
    }
    return max
  }
  for (let i = 0; (i + k - 1) < nums.length; i++) {
    const max = getMax(nums, i, i + k)
    result.push(max)
  }
  return result
}

// 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3 输出: [3,3,5,5,6,7]
console.log(getMaxVal([1,3,-1,-3,5,3,6,7], 3));

// 上面是递归解法，easy 评级

// 下面是 O(n)复杂度 解法，使用双头队列 + 递减队列来实现，JS里的数组就可以满足这需求，hard 评级


/**
 * @description 给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。
 * @param {Array<number>} nums 
 * @param {number} k
 * @description 双向队列解法，复杂度为 O(n)
 */
 const getMaxValOn = function (nums, k) {
  const result = []
  const queue = []
  let max = -Infinity
  
  for (let i = 0; i < nums.length; i++) {
    while (queue.length && queue[queue.length - 1] < nums[i]) {
      // 确保队末大于即将入队的数字
      queue.pop()
    }

    queue.push(i)
    // 确保队头在范围内
    if (queue[0] < (i - k)) {
      queue.shift()
    }
    // 确保下标起码满足了k的个数
    if (i >= k - 1) {
      result.push(nums[queue[0]])
    }
  }
  return result
}

// 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3 输出: [3,3,5,5,6,7]
console.log(getMaxValOn([1,3,-1,-3,5,3,6,7], 3));
