---
title: 写给自己看的JS设计模式复习——外观模式/适配器模式/装饰者模式
tags: 基础
date: 2019-03-19
categories: 读书
---

>过一遍设计模式，一些以前学过一些没学过，学过当复习。

本篇参考 
>https://www.cnblogs.com/TomXu/archive/2012/02/29/2354979.html
JavaScript设计模式 —— 张容铭，这本书目前感觉不太行。。

## 外观模式

为复杂的子系统接口系统一个高级统一接口。

大白话就是把复杂的API封装简化，或者做一些兼容性处理。

好比曾经的王者jQuery，就是封装了大量的原生API。

仿个简单的例子：

```
const API = {
	log: function(value){
		console.log(value);
	},
	elm: function(selector){
		return document.querySelector(selector);
	},
	addElm: function(position, elm){
		document.insertAdjacentHTML(position, elm);
	}
}
```

这就算是一个简单的外观模式的应用。


## 适配器模式

### 框架适配

和外观模式有点类似，简单说就是在用的库发生变化时做兼容性处理，如本文参考的书籍中举的例子

原有JS库 A 其部分API与jQuery类似，现在要引入jQuery，则对原有库做了处理,

```
window.A = jQuery;
```
这个例子感觉可以用的地方并不多，项目中出现技术栈变更，

大多数需要进行较复杂的处理后才能使用或者甚至重构的。



### 参数适配

就是ES6的默认参数的降级版本,十分常见的写法。

```
/**
*obj.name: name
*obj.sex: sex
*obj.age: age
***/
function fn(obj){
	var _adapter = {
		name: '参数1',
		sex: '参数2',
		age: '参数3'
	}
	for( key in _adapter ){
		_adapter[key] = obj[key] || _adapter[key];
	}
}
```

还有是对输入参数适配:
```
function arrToObj(arr){
	return{
		name: arr[0],
		sex: arr[1],
		age: arr[2]
	}
}
```

## 装饰者模式 

和适配器模式有点类似，拿绑定事件为例，假定现在要给不确定有没有绑定事件的一系列元素添加事件

为了不覆盖原有事件，又想避免回头一个个添加，就用上了装饰者模式：

```
var decorator = function(selector, event, fn){
	var elm = document.querySelector(selector);
	if(typeof elm[event] === 'function'){
		let oldFn = elm[event];
		elm[event] = function(){
			fn();
			oldFn();
		}
	}else{
		elm[event] = Fn;
	}
}
```

这样就在避免了覆盖掉原有的事件的同时绑定了新事件。

