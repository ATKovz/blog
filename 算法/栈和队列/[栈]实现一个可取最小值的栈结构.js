/**
 * 需求: 实现一个栈结构，并能通过 O(1) 拿到最小值
 */
const Stack = function () {
  this.stack = []
  this.minStack = []
}

Stack.prototype.getMin = function () {
  // 在最小栈取下标然后从主stack取出数据
  const minIdx = this.minStack[this.minStack.length - 1]
  const minVal = this.stack[minIdx]
  return minVal
}

Stack.prototype.pop = function () {

  const minIdx = this.minStack[this.minStack.length - 1]
  const minVal = this.stack[minIdx]
  // 确保是最后一个最小值再弹出最小栈
  if (this.minStack.length > 0 && (this.stack.length - 1) === minIdx) {
    this.minStack.pop()
  }
  return this.stack.pop()
}

Stack.prototype.push = function (val) {
  // 如果已经存在同样的值，下标不入栈，确保最小值唯一
  if (this.getMin() > val || !this.minStack.length) {
    this.minStack.push(this.stack.length)
  }
  this.stack.push(val)
}

const stack = new Stack()

stack.push(8)
stack.push(1)
stack.push(3)
stack.push(5)
stack.push(1)
stack.push(4)

// 期望输出 1
console.log(stack.stack, stack.getMin());

stack.pop()
stack.pop()
// 期望输出 1
console.log(stack.stack, stack.getMin());
stack.pop()
stack.pop()
stack.pop()

// 期望输出 8
console.log(stack.stack, stack.getMin());