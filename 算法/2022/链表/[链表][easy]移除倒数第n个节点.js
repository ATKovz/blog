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


// 输入 1 -> 3 -> 6 -> 7, n = 3 返回 1 -> 6 -> 7
const removeLastNnode = (l1, n) => {
  const head = new ListNode()
  head.next = l1
  // 这题目使用的是快慢指针，先用一个快指针快速移动，然后对比前后
  let quickNode = l1
  let current = l1
  for (let i = 0; i < n; i++) {
    quickNode = quickNode.next
  }
  while (quickNode.next) {
    current = current.next
    quickNode = quickNode.next
  }
  if (current.next.next) {
    current.next = current.next.next
  } else {
    current.next = null
  }
  return head
}

const list1 = new ListNode(1)
list1.push(3)
list1.push(6)
list1.push(7)

let cur = result
while (cur) {
  console.log(cur.val);
  cur = cur.next
}

