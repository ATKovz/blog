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

const mapTreeDfs = function (root) {
  const result = []

  let stack = [root]
  
  
  while (stack.length) {
    let current = stack.pop()
    result.unshift(current.val)
    if (current.left) {
      stack.push(current.left)
    }
    if (current.right) {
      stack.push(current.right)
    }
  }
  return result
}

console.log(mapTreeDfs(root));