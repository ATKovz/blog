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
 * 反转整个链表
 * @param {ListNode} l1 
 * @returns {ListNode} l
 */
const reverseList = function (l1) {
  const dummy = new ListNode()
  dummy.next = l1
  let current = l1
  let next = current.next
  while (next) {
    prev = current
    current = next
    next = current?.next || null
    current.next = prev
  }
  
  dummy.next.next = null
  return current
}

const list1 = new ListNode(1)
list1.push(5)
list1.push(36)
list1.push(97)

const result = reverseList(list1);

let cur = result
while (cur) {
  console.log(cur.val);
  cur = cur.next
}

