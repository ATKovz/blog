/**
 * @see https://leetcode-cn.com/problems/is-subsequence
 * @description 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
 * 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。
 */


// 这题没用到dp做，用迭代更简单

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
 var isSubsequence = function(s, t) {
  if (!s.length) {
      return true
  }
  if (t.length <= s.length) {
    return s === t
  }

  for (let i = 0, idx = 0; i < t.length; i++) {
    if (s[idx] === t[i]) {
      if (idx === s.length - 1) {
        return true
      }
      idx++
    }
  }
  return false
};