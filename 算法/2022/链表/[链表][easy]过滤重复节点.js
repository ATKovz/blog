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
// 输出: 1->2
// 示例 2:
// 输入: 1->1->2->3->3
// 输出: 1->2->3
const filterRepeat = (l1) => {
  const map = {}
  let current = l1
  map[current.val] = true
  while (current.next) {
    if (map[current.next.val]) {
      current.next = current.next.next
    } else {
      map[current.next.val] = true
      current = current.next
    }
  }
  return l1
}


const list1 = new ListNode(1)
list1.push(1)
list1.push(2)
list1.push(3)
list1.push(3)

const result = filterRepeat(list1)

let cur = result
while (cur) {
  console.log(cur.val);
  
  cur = cur.next
}

