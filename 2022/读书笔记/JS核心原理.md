## Javascript 的构建

1. delete 操作符，delete x 本质上发生了什么？

首先要从 lhs 和 rhs (right hand side) 说起 

以一个赋值运算为例子

```
x = x
```

这本质上就是 把 x 的值 赋值给引用x，可以理解成 Ref(x) = getValue(x)

也就是 lRef = rVal

delete 操作符本质上只能删除"计算结果值的引用", 也就是对象的成员, 删除不成功时 (writable 为 false) 返回false

delete x 本质上会在当前上下文找 x 的引用， 也就是类似于 delete global.x, 也就是 obj.x 本质上是一个引用

delete undefined 也一样，在 JS 里有一个骚操作，就是 undefined 实际上是 global.undefined(writable: false)

所以 delete undefined 会返回 false (因为只读)


2. 赋值背后发生了什么？

看下面一个表达式

```
var x = y = 100; 
```

这表达式本质上是 y = 100, 然后 x = y 而不是 y = 100， x = 100

再看下面一个例子

```
> var a = 100;
> x = 200;


# `a`和`x`都是global的属性
> Object.getOwnPropertyDescriptor(global, 'a');
{ value: 100, writable: true, enumerable: true, configurable: false }
> Object.getOwnPropertyDescriptor(global, 'x');
{ value: 200, writable: true, enumerable: true, configurable: true }

# `a`不能删除, `x`可以被删除
> delete a
false
> delete x
true

# 检查
> a
100
> x
ReferenceError: x is not defin
```

为什么会这样？

因为 JS 除了全局对象还维护了一个 变量名列表(varNames), 所有静态语法期声明的变量名就放在这里，(如用 var, let const, function 声明的变量)，

然后规定本列表内的都是直接声明的变量，不能用 delete 删除 (eval 里的除外，因为 eval 里的不会在编译时进行语法分析，会在执行时才分析)

至于直接声明的语句，可以参考下面

- let x 

声明变量 x。不可在赋值之前读

- const x 

声明常量 x。不可写。

- var x 

声明变量 x。在赋值之前可读取到 undefined 值。

- function x 

声明变量 x。该变量指向一个函数。

- class x 

声明变量 x。该变量指向一个类（该类的作用域内部是处理严格模式的）。

- import 

导入标识符并作为常量（可以有多种声明标识符的模式和方法）。


3. a.x = a = {n:2} 原理解析

还是之前的例子 

```
var x = y = 100; 
```

这行代码到底执行了什么？

var x  声明 x

y = 100 赋值操作，注意 y 并不是通过 var 声明创建的，而是通过赋值操作创建的全局变量

- 如何区分赋值和声明？

最明显的一点，就是声明 的等号左侧不可能为表达式，只能是标志符

```
var x.name = y =  'name' // 显然不行

var x = y.name = 'name' // 可以

```
很明显看出，y是符合赋值的特性的, 也就是 y.name = 'name' 这段是一个赋值表达式，而 x 是一个标识符， x = y.name 是一个值绑定操作

而任何表达式都伴随着计算，声明(标识符)则不伴随计算，所以 var x.name 这种写法是不符合这规则的

** 回到最初的问题 **

```
var a = {n:1};
a.x = a = {n:2};
```

JavaScript 有一个原则，就是严格按照从左至右的顺序来计算表达式。

第一部分的 var x = y = 100 是一个由赋值和表达式组成的语句，也就是 y = 100 是表达式，var x = y 是赋值

所以会先执行 y=100 然后执行 var x = y

那么看这个表达式 a.x = a = {n:2} 

这是一个完全的表达式，显然 a.x 就会最先被计算, 也就是此时 a.x 已被检索，获取了引用

获取之后 a 怎么变就不重要了，此时指向的是 a.x 所指向的内存地址 ({n:1}['x'])， 而不是 "a.x"

然后继续执行, 所以整体的顺序是下面这样的:

1. 计算 a.x 得到 { n: 1 }['x']

2. 赋值 {n:1}['x'] = (a = {n:2})

3. 计算 a = {n:2}

4. 把 a = {n:2} 的结果 赋值给 {n:1}['x']

所以如果我们改一下这例子


```
var a = {n:1};
var b = a;
a.x = a = {n:2};
a // {n: 2}
b // {n: 1 x: {n: 2}}
```

就可以看出，最原始的引用被改变了，符合我们上面的说法

4. 理解 模块

首先理解代码是怎么生成出来的，我们编写的代码主要分为以下3部分

- 字面量 (any value)

- 标识符 (any name)

- 字符串模版 (str template)

而 export default 的使用方法是 export default <expression>

但是es6 export/import 是静态的，import/export 过程中 <expression> 是不会被执行的

同时这里会出现变量提升，也是因为 import/export 是静态的，先有变量名后给变量绑定值, 就自然出现了变量提升的情况

也说明了 export default 需要有一个名字来承载静态解析, 

这个名字就是 **default**

```
export default function(){}
```

如果import 这个模块并打印 name，得到的 name 会是 default


在 const b = function () {} 时，打印 b.name 也是 b，

也就是真正的匿名函数只有 (function() {}).name 这种作为操作对象的行为

而生命式的本质上都是 var xx = function () {}

5. 理解 块级作用域

try {

} catch (e) {
  // e仅作用于此
} finally {}

{} 块语句

with (xx) {
  xx 仅作用于此
}

for (let i) {
  // i 仅作用于此
}

目前只有这4种情况有自己的块级作用域

switch case 不管有多少个 case，case都是共享一个块级作用域的

而 for 的实际块级作用域是非常惊人的，乍看只有 for (1) {2} 这两个，而实际上，为了确保每个 {} 都能访问到正确的值，需要每次循环都创建一个新的作用域，所以实际上数字越大，for循环 性能越差

## Javascript 的执行

1. 可执行结构

JS里具有参数表的东西都是可以执行的，JS里有3种东西有参数表

1. 函数

2. new 

3. 模版字符串

前面 2 者储存的是过程，具体结果要到执行时才知道，

而模板字符串储存的是是“结果”与“结果的计算过程”之间的关系。

而函数是分为3个部分的，就是 参数，执行体，结果


...todo: 这部分等二周目精读更新


## Javascript 语言发展

1. 最开始的 JS 面向对象

这段会在原理后说明这句表达式的结果
```
1 in 1..constructor // maybe true or false
```

一开始的 JS OOP 就是我们熟悉的 ES6 之前的构造函数类语法

也就是:

```
function Item (name, props) {
  this.name = name
  this.props = props
}
const desk = new Item('desk', { height: 90 })
```

'new' 构造函数的过程实现了一个从无到有的过程，实现了一个多个属性的集合

也就是JS里对象的概念（In ECMAScript, an object is a collection of zero or more properties.）

同时这个阶段，JS确定了几个概念

- 全局环境和全局变量

- 函数闭包和对象闭包

全局环境和全局变量的设计实现出来的效果就是，未声明的变量赋值会隐性创建一个全局变量，同时全局变量会被挂到 global

而函数闭包和对象闭包实现出来的环境我们称之为 域 (Scope)

对象闭包的实现可以理解成往 一个 Scope 上挂入另外一个Scope，也就是类似下面的操作

```
// some module
x.scope = {
  parent: x.scope,
  current: newScope
}
try {
  // ...do sth
} finally {
  // 移除掉前面创建的 scope
  x.scope = x.parent.scope
}
```

这个 Scope 现在在动态环境被我们叫做 Context (上下文)

在静态环境被我们叫做作用域(Scope)，但本质上 Context 和 Scope 是一样的东西

早期的对象有个对象没设计清楚，就是Object 的 propName 的可见性(enumerable), 也就是能否被 for in 和 Object.keys 枚举

举个例子，constructor 这属性在很多 JS 引擎里实现就不太一样

后面 ECMAScript 才规定了对象的几个属性(ES5):

- writable

- enumerable

- configurable

在这里 [[constructor]] 才被默认打上了 enumerable: false

JS 的继承只是从父类把所有属性都 用上面的属性定义了一圈，和父类是独立的，也就是原型继承，注意不是原型链继承

继承来的属性行为由描述符决定

- 数据描述符(obj.value)

- 存取描述符(getter/setter)

除此外还有一个**包装类型**

也就是通过 ValueOf 和 toString 来取值，除了 Undefined 外其他所有对象都有自己的包装类(如 str/number/boolean/symbol)

插入一个概念 **类型装箱**, 也就是包装类型的操作

JS的类型转换 首先会尝试调用 值的 Symbol.toPrimitive 属性，如果拿不到就会根据转换类型尝试不同的顺序调用 valueOf/toString

例子：
```
[] + '' 
// 先调用 [][Symbol.toPrimitive], 这里没有定义，就会调用 [].toString()
```

### 基础类型的解析

标识符通常被叫做变量名

字面量通常被叫做值

标识符通常是一个引用，而字面量是一个值

JS在处理标志服调用的时候通常都会建立一个引用来计算操作数，而字面量可以直接处理

如下面这例子

```
x = 1

// 数字的 1.xxx 是有语义的，所以得用1.. 或者(1). 来调用
1..constructor
x.constructor // 先计算 x 的引用，然后再去调用 .constructor
```

实际上 1..constructor 是等同于 Object(1).constructor

Object(基础类型) 时 会自动去找他的基础构造函数进行装箱操作

也就是 Object(1).constructor 会得到 Number

但是 1 instanceof Number 是 false,

也就是 1 和 1..constructor 这两个 1 是不一样的

这里复习下原型链知识，实例.constructor 不是自有属性，所以继承自 Constructor.prototype.constructor

而 Constructor.prototype.constructor 基本 等于 Constructor

回到最开始的例子 

```
1 in 1..constructor 

// 经过上面的解释我们可以知道这个等效于 1 in Object(1).constructor 或者 Number(1).constructor
// 也就自然可以通过 Number[1] = 'anything' 来得到 true 了
```

