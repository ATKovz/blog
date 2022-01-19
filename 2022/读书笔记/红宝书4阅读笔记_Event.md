
## Event


### Mouse Event

mouse event 触发顺序:

mousedown
mouseup
click
...
mousedown
mouseup
click
dbl click(移动端无法触发 因为 300ms 问题)

移动端上 mouseover 会引发UI变化时，不会触发 click，所以在移动端不要用 mouseover 来触发UI变化，用 mouseEnter 代替

### Keyboard Event

- key/keycode/charcode

charcode 通常为0，按键按下时等于 keycode，按键有对应的编号 (字母数字为 ASCII 编码)

key 兼容性有问题但是可读性强，不需要考虑兼容性的场景推荐用key，其他场景推荐用 charcode/keycode

ctl/shift/alt 等键，在新浏览器可以用 e.getModifierState('Shift') 来获取

老浏览器可以用 e.shiftKey/altKey... 等

### 大多数情况下都适用冒泡

捕获在老版本浏览器有问题，同时冒泡也能满足大部分需求，所以尽量用冒泡，事件的触发顺序如下

捕获 -> elm本身 -> 冒泡

e.preventDefault 基本也能解决大多数情况的默认行为拦截，IE 需要设置 e.returnValue = false

### e.persist （react）

React里的合成事件如果要异步里使用，需要调用下这个函数持久化 event 对象，否则会丢失，这是多年以前踩过的坑顺便也记录在这里

### beforeunload

提醒用户的弹窗，之前做客户端/web通用程序时用的挺多的，ie 可以设置 returnValue 来改变文字


### hash change

现代前端的核心事件之一，hash router 的实现基础, 对应的是 location.hash , 具体使用看 Router 源码


## 事件委托

原生尽量使用事件委托，避免挂载过多的回调。