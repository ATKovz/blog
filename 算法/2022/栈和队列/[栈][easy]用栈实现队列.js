/**
 * 题目描述：使用栈实现队列的下列操作：
 * 
 * push(x) -- 将一个元素放入队列的尾部。
 * pop() -- 从队列首部移除元素。
 * peek() -- 返回队列首部的元素。
 * empty() -- 返回队列是否为空。
 */
const Stack = function () {
  this.val = []
}

Stack.prototype.pop = function (val) {
  this.val.pop()
}
Stack.prototype.push = function (val) {
  this.val.push(val)
}


// 思路: 由于队列可以理解成取出时是反向栈，所以可以用一个缓存栈来实现从头出栈
const Queue = function () {
  this.stack1 = new Stack()
  this.stack2 = new Stack()
}

Queue.prototype.push = function (val) {
  this.stack1.push()
}

Queue.prototype.pop = function () {
  if (this.stack2.length) {
    this.stach2.pop()
  } else {
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop())
    }
    this.stack2.pop()
  }
}

Queue.prototype.peek = function () {
  if (!this.stack2.length) {
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop())
    }
  }
  return this.stack2[this.stack2.length - 1]
}