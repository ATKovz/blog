title: Javascript类型系统
tags:
  - 基础
  - ' JavaScript'
category: JavaScript基础
categories:
  - JavaScript
date: 2019-04-09 00:00:00
---
类型是JavaScript中很基础的一个部分，一些细节在以前学习时被忽略了，只是了解了个大概，补充学习下：

- 为什么有的编程规范要求用 void 0 代替 undefined

- 字符串有最大长度

- 0.1 + 0.2 不等于 0.3

- 为什么给对象添加的方法能用在基本类型上


## 1.undefined

undefined在JS里不是一个保留字，而是一个变量，这意味着undefined可以被更改，他表示变量未定义，而null表示的是定义了而未赋值。

所以一般我们都用null来表示一个空值，而为了防止undefined不被误操作，有时会使用void(0)来代替undefined，这保证了所有的undefined都是未经使用过的。

## 2. String

String 有最大长度是 2^53 - 1

因为String表示的并不是字符串，而是字符串的utf-16编码,也就是通常语境下的Unicode编码，同时charat、length、charCodeAt等方法也都是基于utf-16编码的，也就是字符串的最大长度其实就是uff-16的编码长度。

## 3. Number

JS中的 Number ，本质上就是其他语言的 double，即Number 类型中有效的整数范围是 -0x1fffffffffffff 至 0x1fffffffffffff，Number无法精确表示这范围外的整数，

所以要对比浮点数，正确的姿势应该是 a+b - c <= Number.EPSILON， Number.EPSILON为JS提供的最小精度值，如果2数之差小于该值，那在人类的角度看这两个数就是相等的。

JS中存在字符串转数字的几种特殊规则：

- 二进制 0b111
- 16进制 0xFF
- 8进制 0o11

以及最常见的十进制，同时JS还支持科学计数法：

1e3 ===  1000

## 4. Object

JS里，万物皆对象，所以在JS里它是最复杂的一个类型，在JS里，类型构造函数的实例 和 类型 是不同的，所以new Number(3) 和 3 本质上是完全不同的，但他们可以进行数学运算和隐式转换

> 隐式转换见 http://www.teoblog.cn/post/basic-fragment/

### 装箱转换

```
var strobj =  (function(){return this}.call(string('str')))
typeof numberobj; // object
strobj instanceof String; // true
strobj.constructor === String; // true
```
封装转换可以把基本类型转换为对象类型。

### 拆箱转换

把object转换成基本类型的操作，拆箱转换过程中，会尝试调用valueOf和toString来获取转换后的类型，如果没返回基本类型，或者前面2个方法不存在，则会报出typeError的错误， 证明拆箱转换失败

```
var o = {
		valueOf : () => {console.log("valueOf"); return {}},
		toString : () => {console.log("toString"); return {}}
}
o * 2
// valueOf
// toString
// typeError
```
可以看到上面的操作执行的顺序是toString ->  valueOf
但是如果调用是使用String()，则是先进行类型转换后调用valueof
```
var o = {
		valueOf : () => {console.log("valueOf"); return {}},
		toString : () => {console.log("toString"); return {}}
}

String(o)
// toString
// valueOf
// TypeError
```

ES6中还可以通过设置对象的Symbol.toPrimitive属性来执行回调，覆盖原有的转换行为 ，当对象被转成原始类型时就会调用fn[Symbol.toPrimitive]
```
var o = {
		valueOf : () => {console.log("valueOf"); return {}},
		toString : () => {console.log("toString"); return {}}
}

o[Symbol.toPrimitive] = () => {console.log("toPrimitive"); return "hello"}


console.log(o + "")
// toPrimitive
// hello
```

同时在JS中，typeof运算的结果和对象实际运行时的表现类型是不太一致的，可以参照下表：

![type](https://static001.geekbang.org/resource/image/ec/6b/ec4299a73fb84c732efcd360fed6e16b.png)

## 布尔类型

### 假值

要分清布尔类型的转换规则，就得先分清什么是假值

- undefind
- null
- false
- 0, +0, -0, NaN
- ""

基本上除了以上几个假值 ，其余均为真

**但是在隐性转换中有十分多的坑，在比较中出现true，false，[], "", 0的时候尽可能用 === 代替 ==**,

github@dorey 有一张图总结了 == 的坑，可以作为参考

![“==" 的坑](http://www.teoblog.cn/postimg/trans.png)

一般ToBoolean操作有以下几种方式，但第四种逻辑运算符返回的不是布尔值，而是运算符左右值中的一个，更像是选择

-Boolean（object）
-！object
-if/while/三元表达式object: ?
- 逻辑运算符&& ||


和~运算符一样，使用2个！就可以转换成原值

eg：
```
console.log(Boolean('string'));  // true
console.log(!!'string'); 		// true
```

## 理解强制类型转换的原理

虽然除了假值都是真值，但是像下面这种还是不成立的

```
const x = 4444;
const y = true;
console.log(x == true)		// false
console.log(x == false)  // false
```
因为在强制转换的过程中，参与对比的是 Number(y) ，而不是y本身，即此时true被转换成了1.

所以
```
const x = 1;
const y = true;
console.log(x == y) // true

同理在数字和字符串的转换中也是类似的规则 如
 
```
console.log(123.3 == '123.3');
//此时实际上是比较 123.3 == parseFloat('123')

> 在==中 null和undefined是相等的

### 类型封装 

```
const a = 'asf';
const b = new String('asf');
console.log(a==b, a===b, a, b); 
// true false asf String {[[PrimitiveValue]]: "asf"}
```

可以看到，使用b返回的是一个PrimitiveValue，

**在==中，JS对b进行了ToPrimitive转换操作**，

实际上相当于是a == b.valueOf(),

所以当你做出以下这种反人类操作时，得到的结果也是十分惊人的：

```
const a = 'aaaa';
const b = new String('asf');
String.prototype.valueOf = function(){
	return 'aaaa';
};
console.log(a==b, a===b, a, b, b.valueOf()); 
//true false aaaa String {[[PrimitiveValue]]: "asf"} aaaa
```

>通过修改valueOf方法，验证了通过构造函数生成的b在 == 比较中进行的隐性转换，

但是这种令人智息操作一般不会出现，反而帮我们充分验证了类型转换的原理。