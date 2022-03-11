/**
 * @description
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
 * 注意：答案中不可以包含重复的三元组。
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = (nums) => {
  const res = []

  // 先排序便于双指针机制运转
  nums.sort((a, b) => (a - b))

  
  const length = nums.length

  if (nums[0] > 0 || length < 3) {
    return []
  }
  // 最后2位有head和tail，所以不用跑
  for (let i = 0; i<length - 2; i++) {
    const point = i

    let head = i + 1
    let tail = nums.length - 1
    if (nums[point] === nums[point - 1]) {
      // 要求不可重复，所以跳过重复值
      continue
    }
    while (head < tail) {
      const target = nums[head] + nums[tail] + nums[point]
      if (target === 0) {
        res.push([nums[point], nums[head], nums[tail]])
        head++
        tail--
        while (nums[head] === nums[head - 1]) {
          head++
        }
        while (nums[tail] === nums[tail + 1]) {
          tail--
        }
      }
      if (target < 0) {
        head++
        while (nums[head] === nums[head - 1]) {
          head++
        }
      }
      if (target > 0) {
        tail--
        while (nums[tail] === nums[tail + 1]) {
          tail--
        }
      }
    }
  }
  return res
}

console.log(threeSum([-1,0,1,2,-1,-4]));