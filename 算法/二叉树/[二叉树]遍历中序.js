// 给定一个二叉树，返回它的前序（先序）遍历序列。
// 输入: [1,null,2,3] 输出 [1, 2, 3]

const root = {
  val: "A",
  left: {
    val: "B",
    left: {
      val: "D"
    },
    right: {
      val: "E"
    }
  },
  right: {
    val: "C",
    right: {
      val: "F"
    }
  }
};

const mapTreeMid = function (root) {
  const result = []

  let stack = [root]
  let current = stack.pop()
  
  while (current || stack.length) {

    while (current) {
      // 2. 如果有右也走此处，以右为root进行中序遍历
      stack.push(current)
      current = current.left
      // 1. 跑到最左端后 往上推，可以得到 左中(右(递归)) 这样的结构，就是我们要的中序
    }
    // 3. 出栈
    current = stack.pop()
    result.push(current.val)
    current = current.right
  }
  return result
}

console.log(mapTreeMid(root));