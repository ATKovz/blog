/**
 * 设计一个支持以下两种操作的数据结构：
 * void addWord(word)
 * bool search(word)
 * search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z 。
.* 可以表示任何一个字母。
 */

const dataSet = {}

/**
 * @param {string} str 
 */
const addWord = (str) => {
  if (dataSet[str.length]) {
    dataSet[str.length].push(str)
  } else {
    dataSet[str.length] = [str]
  }
}
/**
 * @param {string} str 
 */
const search = (str) => {
  const targetList = dataSet[str.length]
  if (!targetList) {
    return false
  }
  for (let i = 0; i < targetList.length; i++) {
    if (targetList[i] === str) {
      return true
    }
    if (new RegExp(str).test(targetList)) {
      return true
    }
  }
  return false
}
