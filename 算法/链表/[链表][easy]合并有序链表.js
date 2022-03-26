// 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有结点组成的

// 输入：1->2->4, 1->3->4 输出：1->1->2->3->4->4

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

const mergeList = function (l1, l2) {
  const head = new ListNode()
  let current = head
  while (l1 && l2) {
    if (l2.val > l1.val) {
      current.next = new ListNode(l1.val)
      l1 = l1.next
    } else {
      current.next = new ListNode(l2.val)
      l2 = l2.next
    }
    current = current.next
  }

  if (l2.val) {
    current.next = l2
  }
  return head.next
}

const list1 = new ListNode(1)
list1.push(5)
list1.push(36)
const list2 = new ListNode(4)
list2.push(4)
list2.push(32)
list2.push(97)

const result = mergeList(list1, list2);

let cur = result
while (cur) {
  console.log(cur.val);
  cur = cur.next
}

