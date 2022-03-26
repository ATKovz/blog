/**
 * 题目描述: 根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替。
 * 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。
 * 提示：气温 列表长度的范围是 [1, 30000]。每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数。
 */

/**
 * 如果使用暴力回溯，那复杂度显然是 O(2n) 到 O(n2), 过高了，这里由于是线性且逐个求值，所以可以用栈
 */

const getThermal = (thermals) => {
  const stacks = []
  // 默认为0
  const result = [...Array(thermals.length)].fill(0)
  for (let i = 0; i < thermals.length; i++) {
    const thermal = thermals[i]
    while (stacks.length && (thermals[stacks[stacks.length - 1]] < thermal)) {
      // 每位都入栈，然后在下一位向前比对，这样复杂度就是O(n)
      const prev = stacks.pop()
      result[prev] = i - prev
    }
    // 储存索引，比对出结果异常就直接用索引计算时间差
    stacks.push(i)
  }
  return result
}

const  test = [34, 35, 1, 37, 38, 4, 5]
// 期望返回 [1, 2, 1, 1, 0, 1, 0]

console.log(getThermal(test));