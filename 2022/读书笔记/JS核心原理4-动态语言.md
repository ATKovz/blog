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

1. 加号是没法判断左右操作数的类型的，也就是会预设为 number，走ValueOf()，而不会走 toString()，除非加号两端有一端是字符串，也就是字符串优先级最高

2. 如果 == 有一端是基础类型，就会把另外一端也转成原始类型

3. new Date(x)”中，也有他的规则, 见伪代码

```
typeof x.toString() === string
  ? new Date(parser(x.toString()))
  : new Date(parser(Number(x)))

```
如果 x 是一个非 Date() 实例的对象，那么将尝试把 x 转换为基础类型 x1；

如果 x1 是字符串，尝试从字符串中 parser 出日期值；

否则尝试 x2 = Number(x1)，如果能得到有效的数字值，则用 x2 来创建日期对象。

4. Date 对象首先走toString然后走valueOf

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