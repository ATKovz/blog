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

6. 可执行结构

JS里具有参数表的东西都是可以执行的，JS里有3种东西有参数表

1. 函数

2. new 

3. 模版字符串

前面 2 者储存的是过程，具体结果要到执行时才知道，

而模板字符串储存的是是“结果”与“结果的计算过程”之间的关系。