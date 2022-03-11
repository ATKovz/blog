const validPalindrome = (str) => {
  let j = str.length - 1
  let i = 0

  while (i < j && str[i] === str[j]) {
    i++
    j--
  }

  // 跳过头指针一位，如果不需要跳过也会直接返回true
  if (isPalindrome(str, i + 1, j)) {
    return true
  }
  // 跳过尾指针一位
  if (isPalindrome(str, i, j - 1)) {
    return true
  }

  const isPalindrome = (str, start, end) => {
    while (start < end) {
      if (str[start] !== str[end]) {
        return false
      }
      start++
      end--
    }
    return true
  }
  
  return false
}