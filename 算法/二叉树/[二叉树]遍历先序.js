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

const mapTreePre = function (root) {
  const result = []

  let stack = [root]
  
  
  while (stack.length) {
    let current = stack.pop()
    result.push(current.val)
    if (current.right) {
      stack.push(current.right)
    }
    if (current.left) {
      stack.push(current.left)
    }
  }
  return result
}

console.log(mapTreePre(root));