/**
 * 合法字符串转自付，不合法字符串返回空
 * @param {string} str 
 */
const strToNumber = (str) => {
  const flag = str[0]
  const validReg = /\s*([-\+]?)([0-9]*).*/
  const result = str.match(validReg)
  if (result) {
    console.log(result);
    const flag = result[1]
    const number = result[2]
    return parseInt(`${flag}${number}`)
  }
  return ''
}

console.log(strToNumber('   -12345'));