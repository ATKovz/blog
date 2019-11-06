title: 全方位理解this
tags:
  - 基础
  - JavaScript
categories: []
date: 2019-01-28 00:00:00
---
>你所不知道的JS（上）this解析章节,学习笔记及一点疑惑

this一直是很多半路出家的前端学习者脑壳痛的地方，因为从字面上理解他就应该指向类/对象。

可实际并非如此，哪怕是在node和浏览器里表现都不一样：

## node中的this和浏览器中的this

先来个例子：

```
function fn(){
	console.log(this.foo);
}
var foo = 'global';
fn();
```

一段简单的代码，在node环境下会输出什么？

如果没接触过node，很可能就脱口而出global，可实际真的是这样吗？

> 答案： node下输出undefined， 浏览器中输出global。

是什么导致了这种差异呢？
再来看下面这个例子:

```
function fn(){
	console.log(this.foo);
}
foo = 'global';
fn();
```

和上面的例子对比，var foo 变成了 foo。

这种情况下就同样都是输出global了。

要解释这个现象，首先得看看node全局环境下的this指向，

>打印this：输出Object {}


原因就是node全局环境下，使用var声明的对象是挂在在一个空对象下的，也就是module.exports所导出的对象，

而直接声明的对象，则是挂载在global下的。

而浏览器环境下，只要是在顶层声明的变量全都是挂载在window下。

## 默认绑定规则

默认规则即不做多余操作情况下的绑定情况，一般，this通常是这样使用的：
```
function log(){
	console.log(this.foo)
};
var foo = 'global';
log()
```

>输出： global

```
function log(){
	var foo = 'log';
	console.log(this.foo)
};
var foo = 'global';
log()
```

>输出： global

如果是string 那将会输出undefined。

## 隐式绑定

### 隐式绑定的规则

先来个例子：

```
var foo = 'global';
function fn(){
	console.log(this.foo);
}
var obj = {
	foo: 'obj',
	fn: fn,
	obj1: obj1
};
var obj1 = {
	fn: fn,
	foo: 'obj_1',
	obj: obj
};
obj1.obj.fn();
```

问：上面会输出什么？

隐式绑定是通过更改调用者来改变函数执行时的上下文，

那么在这种多次调用的场景下，函数的上下文会不会跟着改变呢？

这就是上面这题的关键：

通过对象属性链来引用函数时，this指向只会绑定到引用链的最后一层。

所以答案就很明确了

> 答案： 输出obj


### 隐式绑定的缺陷

this的隐式绑定也有很大的缺陷，先看例子：

#### demo0：

```
var foo = 'global';
function fn(){
	console.log(this.foo);
}
var obj = {
	foo: 'obj',
	fn: fn,
	obj1: obj1
};
var obj1 = {
	fn: fn,
	foo: 'obj_1',
	obj: obj
};
var bar = obj1.obj.fn;
bar();
```

这段代码会输出什么？

> 输出global

当对引用链进行引用时，实际上bar是直接引用了fn，

也就是相当于直接在global环境下调用了函数，**相当于fn();**


#### demo1：
```
var foo = 'global';
function fn(){
	console.log(this.foo);
}
function hasCallBack(fn){
	fn();
}
var obj = {
	foo: 'obj',
	fn: fn,
};
hasCallBack(obj.foo);
```

输出什么？

> 输出global

和上面一样道理，引用链作为参数时实际上指向的是真实函数，在setTimeout等方法中也一样。

## 显式绑定

和隐式绑定这种绕来绕去的不同，显示绑定十分明显，即使用call，apply，bind等方法强制改变函数上下文

同样来个例子：

```
var foo = 'global';
function fn(){
	console.log(this.foo);
}
var obj = {
	foo: 'obj'
};
fn.call(obj);
```

>输出obj。

部分内置函数也提供了类似的显式绑定，如
Array.prototype.forEach(callback[, thisArg]), 
Array.prototype.filter(callback(element[, index[, array]])[, thisArg])

这个是基本常识，那么下面这种情况呢？

### 硬绑定

```
var foo = 'global';
function log(){
	console.log(this.foo);
}
function fn(){
	log.call(window)
}
var obj = {
	foo: 'obj'
};
fn.apply(obj);
```

这是显示绑定的一个扩展，即多次进行绑定，那么会输出什么？

> 答案： global


```
即多次进行显示绑定无法改变第一次绑定的指向。

## new绑定

一般出现在构造函数中，使用new 构造函数创建新实例的时候。

新实例的this指向新实例本身。


## 优先级

一般情况下，优先级最高的是硬绑定，

但是如果对硬绑定了的函数使用new运算符，则相当于对象被实例化，则会被构造函数所覆盖

## 箭头函数

箭头函数指向外层函数的this指向，不会随环境改变。