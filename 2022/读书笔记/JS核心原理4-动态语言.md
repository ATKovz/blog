## 动态语言的优劣性

JS 是一门动态语言，动态语言通常伴随着易上手难精通

动态语言里最有特点的就是动态类型

1. 动态类型

先从JS类型系统入手

JS有7种类型，分别是string，number，boolean，symbol，null，undefined，Object(function/object/array)

都可以通过Object()来进行装箱，如Object('')会得到一个String实例

2. 值 和 原始值（Primitive values）

JS的所有对象都有2个方法 toString/valueOf, 这是JS动态类型的根基

而基于1我们可以看下它的工作流程

```
obj = Object(x);

// 等效于（如果能操作内部槽的话）
obj.[[PrimitiveValue]] = x;
```

可以理解成暂时性把该值包装到内部槽，等到要用的时候在用 valueOf 取出, 这是ES5的，ES5只有一种内部槽[[PrimitiveValue]]

而 ES6 就不一样 

ES6 的内部槽分成多种:

[[BooleanData] [[NumberData]]、[[StringData] [[SymbolData]]和[[BigIntData]]

同时ES6新增了Symbol.toPrimitive，来取出ES6的PrimitiveValue

至此，原始值(PrimitiveValue) 的概念就大概有了，就是上面5种有内部槽（或者说有他们的包装类）的值，就是所有的原始值集合，bigint在语言特性上和number没太大区别

这其中 Symbol 和 Boolean 是最麻烦的，因为经常在转换过程中他们的语义就丢了或者出现了变化

Symbol 是由于本身就比较特殊，而Boolean则是因为众多的truthy和falsy值

3. 隐形转换

这是JS坑最多的一个领域。见下面

```
> [] + {}
'[object Object]'

> {} + []
0

> {} + {}
NaN

> [] + []
''
```

[]拆箱的话会先执行[].valueOf(),得到的是[],并不是原始值，就执行[].toString()，得到的结果是''。

{}拆箱会先执行{}.valueOf()，得到的是{}，并不是原始值，于是执行toString(),得到的结果是[object Object]。

[]+{}就相当于""+"[object Object]"，结果就是[object Object]。

{}+[]的话，js会把开头的{}理解成代码块，所以这句话就相当于+[],也就是等于+"",将空字符串转换为数字类型，结果就是0。

{}+{}的话，也是和上面一样的道理,相当于+"[object Object]"，将字符串转化为数字类型，结果是NaN。

[]+[]就相当于""+""，所以结果还是""。

### 转换的规则

JS 规定，原始值的 toPrimitive 返回自身

对象的 toPrimitive 返回 对象.valueOf()

如果一个运算无法确定类型，那么在类型转换前，它的运算数将被预设为 number

如果 对象走完toPrimitive依旧不是原始值，那就调用toString

具体可以展现为下面4规则

3.1. 加号是没法判断左右操作数的类型的，也就是会预设为 number，走ValueOf()，而不会走 toString()，除非加号两端有一端是字符串，也就是字符串优先级最高

3.2. 如果 == 有一端是基础类型，就会把另外一端也转成原始类型

3.3. new Date(x)”中，也有他的规则, 见伪代码

```
typeof x.toString() === string
  ? new Date(parser(x.toString()))
  : new Date(parser(Number(x)))

```
如果 x 是一个非 Date() 实例的对象，那么将尝试把 x 转换为基础类型 x1；

如果 x1 是字符串，尝试从字符串中 parser 出日期值；

否则尝试 x2 = Number(x1)，如果能得到有效的数字值，则用 x2 来创建日期对象。

3.4. Date 对象首先走toString然后走valueOf

Date 为什么不一样不是先走 valueOf 呢？

因为 Date 重写了 Date.prototype[Symbol.toPrimitive], 所以和其他对象规则不一样，‘

也就是 

Date() + 12 得到 'Mon Feb 21 2022 23:10:22 GMT+0800 (中国标准时间)12'

而 {} + 12 = 12

而 12 + {} = '12[object Object]'

因为 第一个，Date重写了转换规则, 直接走toString

第二个，{}被读为块，所以是 +12

第三个 {} 先走 valueOf，转换成基础类型失败，继续走 toString, 然后字符串优先级最高，把12也转成了字符串

最后这4点和3题可以说是JS所有动态类型坑的总结了，吃透基本可以完美避开


5. 动态执行

JS 常见的能够动态执行的有以下几个

- setTimeout/setInterval

- eval(str)

- new Function(str)

这部分主要讲eval

eval 执行的是什么? 

eval 会把传入的字符串按照 语句 -> 表达式的顺序解析，如果是表达式或者字面量，就返回表达式的结果

所以 eval({ a: 123 }) 会返回123

因为 {} 被解析成块， a: 被解析成 label，最后就只有123了

eval的执行环境通常和当前Context是一样的，这里解释下执行上下文

### 声明环境

也就是之前有提到的 名字表，用于检索 名字 -> 数据，通常也被叫做词法环境

### 对象环境

JavaScript 的一个对象，用来“模拟 / 映射”成上述的对照表的一个结果，如 with 和 global，别的地方都是声明环境

### 执行上下文

JavaScript 的执行系统由一个执行栈(存储Context)和一个执行队列(存储Task),只有执行了才会有执行上下文，当前任务入栈，一个Context就被推入执行栈

出栈，Context就被存储起来，就是典型的stack结构（先进后出）,Generator 就是典型的在执行过程退出 Context 的存在

JS里有个非常坑的存在可以突破词法作用域(声明环境),就是var，所以ES5以后Context就有2种环境，

一个是 Lexical Environment(词法环境), 一个是Variable Environment(变量环境), var就由后者管理

在大多数情况下，这俩都是等效的，**eval除外**

那么为什么这俩等效 但是 var 可以多次声明，而let不行呢？ 因为var的多次声明后面几次会被解析成赋值，而let始终是声明

### eval 的不同上下文

with(obj){}, try {} catch {}, global 等的环境都是可以在代码解析阶段就得到，并在执行前创建，

但是 eval 的是等到执行才创建的，

```

function foo() {
  var x = 100;
  eval('let x = 200; console.log(x);'); // 200
  console.log(x); // 100
}
foo();

#(如下示例不可执行，eval 的上下文创建过程伪代码)
evalCtx.VariableEnvironment === fooCtx.VariableEnvironment
true

fooCtx.VariableEnvironment === fooCtx.LexicalEnvironment
true

evalCtx.VariableEnvironment === evalCtx.LexicalEnvironment
false
```

所以当 eval 中执行代码“var x = …”时，就可以通过evalCtx.VariableEnvironment来访问到fooCtx.VariableEnvironment

```
function foo() {
  var x = 100;
  eval('var x = 200; console.log(x);'); // 200, x指向foo()中的变量x
  console.log(x); // 200
}
foo();
```

如果使用了 'use strict'; 那么在 eval 里的代码将无法访问到外部作用域，因为这时候 eval 的作用域是只属于他自己的，这种时候

```
'use strict';
eval("n = 4") // 报错

'use strict';
(0, eval)("n = 4") // 可以执行
```
为什么有这种情况呢？(0, xx)() 这种被称为间接调用

关于间接调用的eval, ECMA 有以下2个规定

1. 所有的“间接调用”的代码总是执行在“全局环境”中。

2. 所有的“间接调用”的代码将默认执行在“非严格模式”中。

而 () 被称为分组运算符，(0, eval) 本质上是按顺序运行然后返回最后一个的结果, 这是连续分组

如果是单个分组 (eval) 则是返回引用, 而不是 (getValue(eval))

也就是 (getValue(0), getValue(eval))，这也回到了第一篇文章说到的所谓引用和值的区别上了

分组运算拿到的是值，而平时调用是直接拿引用

直接调用必须是引用，而且是环境引用（也就是不能是xx.eval）, 看下面的例子:

```
# （控制台，直接进入全局的严格模式)
> node --use-strict

# 测试用的代码（in Node.js）
> var x = 'arguments = 1'; // try source-text

# 作为对象属性
> var obj = {eval};

# 间接调用：这里的确是一个引用，并且名字是字符串文本"eval"，但它是属性引用
> (obj.eval)(x)
1

# 直接调用：eval是当前环境中的一个名字引用（标识符）
> eval(x)
SyntaxError: Unexpected eval or arguments in strict mode

# 直接调用：同上（分组运算符保留了引用的性质）
> (eval)(x)
SyntaxError: Unexpected eval or arguments in strict mode

```

### eval 返回的结果是引用还是值？

语句执行只会返回值，传入eval的字符串参数是作为语句执行的

```
# 在代码文本中直接创建了一个`eval`函数的“引用（规范类型）”
> obj = { foo() { return this === obj } }

# this.foo调用中未丢失`this`这个引用
> obj.foo()
true

# 同上，分组表达式传回引用，所以`this`未丢失
> (obj.foo)()
true

# eval将返回值，所以`this`引用丢失了
> eval('obj.foo')()
false
```

### Function 也是动态创建

Function('a, b, c', 'console.log(a)') 和 eval 有什么区别呢？

唯一的区别就是 Function 和 局部调用的eval (0, eval) 更接近，就是基于全局Context创建的， 同时会突破 全局 use strict 限制，这也使得 Function 动态生成的不可能基于当前Context，只能基于global context

因为动态创建的函数毕竟难判断全局范围的 use strict, 只能判断内部是否是 strict mode

而普通的 eval 则是只能在当前 Context 下执行，无法访问 global context
