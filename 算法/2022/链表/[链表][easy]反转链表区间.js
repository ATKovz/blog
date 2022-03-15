const ListNode = function (val) {
  this.val = val
  this.next = null

  this.push = (val) => {
    let current = this
    while (current.next) {
      current = current.next
    }
    current.next = new ListNode(val)
  }
}

/**
 * 反转部分链表, 思路和之前类似，复杂度为 O(n), 记录首尾，中间反转，然后拼接首尾
 * @param {ListNode} l1 
 * @param {number} start
 * @param {end} l1 
 * @returns {ListNode} l
 */
const reverseList = function (l1, start, end) {
  const dummy = new ListNode()
  dummy.next = l1
  let head = new ListNode()
  head.next = l1

  let i = 1
  const length = end - start
  while (i < length) {
    // 由于要到开始的前一位，所以 i = 1 就可以
    head = head.next
    i++
  }
  
  let current = head.next
  let next = current.next
  i = 0
  while (i < length) {
    prev = current
    current = next
    next = current?.next || null
    current.next = prev
    i++
  }
  head.next.next = next
  head.next = current
  
  return dummy.next
}

const list1 = new ListNode(1)
list1.push(2)
list1.push(3)
list1.push(4)
list1.push(5)
list1.push(6)
list1.push(7)
// 输出 1->2->6->5->4->3->7

const result = reverseList(list1, 3, 6);

// let cur = result
// while (cur) {
//   // console.log(cur.val);
//   cur = cur.next
// }

