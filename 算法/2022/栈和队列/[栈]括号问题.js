/**
 * @description 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 * 注意空字符串可被认为是有效字符串。
 */

/**
 * 
 * @param {string} str 
 */
const includesValidBranket = (str) => {
  const stack = []
  const map = {
    '{': '}',
    '[': ']',
    '(': ')',
  }

  for (let i = 0; i<str.length; i++) {
    if ('([{'.includes(str[i])) {
      stack.push(str[i])
    }
    if ('}])'.includes(str[i])) {
      const branket = stack.pop()
      if (map[branket] !== str[i]) {
        return false
      }
    }
  }
  return stack.length === 0
}


console.log(includesValidBranket('(213123)]'));
console.log(includesValidBranket('[(213123)]'));
