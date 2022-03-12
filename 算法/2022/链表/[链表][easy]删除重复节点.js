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

// 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
// 输入: 1->1->2
// 输出: 2
// 示例 2:
// 输入: 1->1->2->3->3->4
// 输出: 2->4
const deleteRepeat = (l1) => {
  const map = {}
  // 锁定头部（空头）
  const prev = new ListNode()
  prev.next = l1
  let current = prev
  // 从空头逐个往后筛，遇见重叠就移除，因为单向链表没法直接获取前一个节点，所以用空节点的形式来实现，最后返回空节点的下一个节点（Head）就可以
  while (current.next && current.next.next) {
    if (current.next.val === current.next.next.val ) {
      const val = current.next.val
      while (current.next?.val === val) {
        current.next = current.next.next
      }
    } else {
      current = current.next
    }
  }
  return prev.next
}


const list1 = new ListNode(1)
list1.push(1)
list1.push(2)
list1.push(3)
list1.push(3)
list1.push(4)

const result = deleteRepeat(list1)

let cur = result
while (cur) {
  console.log(cur.val);
  cur = cur.next
}

