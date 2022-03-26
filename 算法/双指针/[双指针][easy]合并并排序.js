/**
 * 两个有序数组合并，拼接后也是有序数组
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {void} 
 */
 const mergeAndSort = (nums1, nums2) => {
  const m = nums1.length
  const n = nums2.length
  // 从末端开始，这样修改 nums1 的过程就不会影响遍历 
  let i = m - 1, j = n - 1, k = m + n - 1

  while (i > 0 && j > 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i]
      k--
      i--
    } else {
      nums1[k] = nums2[j]
      k--
      j--
    }
  }
  while (j >= 0) {
    nums1[k] = nums2[j]
    k--
    j--
  }
  return nums1
 }

 console.log(mergeAndSort([1,2,13,24,36,67], [4, 14, 34]));