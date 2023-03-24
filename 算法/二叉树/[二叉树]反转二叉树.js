
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


/**
 * 经典反转题，由于每个都需要过一次，所以使用递归实现
 * @param {*} root 
 */
const reverseTree = function (root) {
  if (!root) {
    return root
  }

  const left = reverseTree(root.left)
  const right = reverseTree(root.right)

  root.left = right
  root.right = left

  return root
}

console.log(reverseTree(root));

