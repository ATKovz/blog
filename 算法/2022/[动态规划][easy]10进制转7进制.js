/**
 * @see https://leetcode-cn.com/problems/base-7/
 * @description 给定一个整数 num，将其转化为 7 进制，并以字符串形式输出。
 */

const convertToBase7 = (c, r = [], isNegative = false) => {
  if (c < 0) {
    // 负数 flag
    isNegative = true
    c = - c
  }
  // 终止条件
  if (c < 7) {
    r.push(c)
    return `${isNegative ? '-' : ''}${r.reverse().join('')}`
  }
  // 计算当前位
  r.push(c % 7)
  // 右移
  return convertToBase7(Math.floor(c / 7), r, isNegative)
}