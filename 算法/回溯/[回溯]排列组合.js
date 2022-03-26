// 题目描述：给定一个没有重复数字的序列，返回其所有可能的全排列。

// 这种全排列组合问题就是典型的dfs，或者说回溯类型的，也就是暴力递归可以解决的
// 核心是选择分支记录状态，以及选择分支结束后清除状态
const getArrange = function (arr) {
  const visited = {}
  const curr = []
  const result = []

  const dfs = function (n) {
    if (n === arr.length) {
      // 分支末端，保存结果
      result.push(curr.slice())
      return
    }
    for (let i = 0; i < arr.length; i++) {
      if (!visited[i]) {
        visited[i] = true
        curr.push(arr[i])
        // 清除状态
        dfs(n + 1)
        curr.pop()
        visited[i] = false
      }
    }
  }
  dfs(0)
  return result
}

// console.log(getArrange([234,4,436,43,64]).length);

// 题目描述：给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
// 说明：解集不能包含重复的子集。
// 类似的，只是这次的解可以包括子组合(长度小于原数组)
const getArrange1 = function (nums) {
  const result = []
  const subset = []

  const dfs = (idx) => {
    result.push(subset.slice())
    // 和上题不同，本题从 idx 开始, 因为要返回不重复的内容，从0开始可能会返回元素同样但顺序不同的组合
    for (let i = idx; i < nums.length; i++) {
      subset.push(nums[i])
      dfs(i + 1)
      subset.pop()
    }
  }
  dfs(0)
  return result
}

console.log(getArrange1([234,4,436,43,64]));