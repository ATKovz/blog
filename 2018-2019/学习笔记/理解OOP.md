title: 回顾面向对象
tags:
  - 基础
  - JavaScript
category: 读书
categories:
  - 读书
date: 2019-03-13 00:00:00
---

>  复习面向对象

JS的原型链和构造函数是很容易混淆的概念，而在日常工作用的频率不高，所以容易混淆，

虽然ES6有了class语法糖，但还是得不定期复习下。

## 构造函数创建实例

JS在ES6的class出现前并没有类这个概念，最常用的用于模拟类的就是构造函数

```
var Guys = function(){
	this.type = 'jerk'
};
var joe = new Guys();  // joe: {  type: 'jerk' }
console.log(joe instanceof Guys); // true
joe.hasOwnProperty('type'); // true
var errorExam = Guys(); // 未使用new的错误示范 => errorExam: undefined
console.log(window.type) // jerk 
```

构造函数使用 new 关键字来创建实例，如果不带new则是相当于直接调用Guys，

这会使得this指向window，相当于声明了构造函数中同等数量的全局变量，这负面效果是很明显的。

如果想避免忘记使用new的情况，可以使用保险点的方法：

```
var Guys = function(){
	if( this instanceof Guys ){
		this.type = 'jerk'              
	}else{
		return new Guys();
	}
}  
var errorExam = Guys(); // 使用了保险方法，未使用new的错误示范： errorExam => Guys {type: "jerk"}
```

使用构造函数的情况下，实例的constructor属性会指向构造函数，同时此时。

## 原型链

相比构造函数在ES6被语法糖代替的地位，原型链在ES6之后要更为不堪，class语法直接让不少人舍弃了多变的原型链，但是在老项目中是非常常见的。

```
var Guys = function(){
	console.log('empty constructor')
}
Guys.prototype.type = 'jerk';
var pony = new Guys(); 
console.log(joe instanceof Guys) // false
console.log(pony.type) // 'jerk';
```

这种方法是通过原型链实现继承，即pony.__proto__ 指向 Guys.prototype

同时原型链是动态的，在创建实例后添加的属性同样可以继承到实例上，除非你直接改变Guys.prototype,

即这种情况：

```
var Guys = function(){
	console.log('empty constructor')
}
Guys.prototype.type = 'jerk';
var pony = new Guys(); 
console.log(pony.__proto__ ===  Guys.prototype) // true;
Guys.prototype = {};
console.log(pony.__proto__ ===  Guys.prototype) // false;
Guys.prototype.butt = 'sth';
console.log(pony.type); // "jerk"
console.log(pony.butt) // undefined
```

这种情况相当于直接把Guys.prototype的指向更改了，此时则无法通过修改构造函数原型来实现属性共享了。


## 原型链和构造函数创建实例的区别 

### 区别

用2个值相同，创建方式不同的例子来对比：

```
var ProtoFn = function(){};
ProtoFn.prototype.type = 'prototype ways'
var InstanFn = function(){
	this.type = 'Instance ways'
}
var p = new ProtoFn();
var i = new InstanFn();

console.log(p instanceof ProtoFn); //true
console.log(i instanceof InstanFn); //true
i.hasOwnProperty('type'); // true
p.hasOwnProperty('type'); // false
console.log("type" in i); // true
console.log("type" in p); // true
```

通过原型链继承的对象无法通过hasOwnProperty来判断属性是否存在，

而通过实例创建的可以, 如果直接对p.type进行写入操作，那就可以通过hasOwnProperty来判断

因为此时p.type是私有属性而不是指向ProtoFn.prototype了。


### 优缺点

#### 原型链

原型链继承的动态特性，可以随时通过修改构造函数的prototype来进行同步更新方法，

但这也使得所有通过原型继承的对象在初始化时值都是同样的值。

同时在涉及引用类型（如数组）等的继承时，对数组等**引用类型数据**的操作会改变原型，

从而直接影响全部通过原型链继承的对象。

#### 实例

通过实例创建的对象虽然在后续没法统一修改属性，但是在创建时可以通过添加参数的方式，实现初始化赋值一步完成。

同时在引用类型的更改上也较原型链要安全。

### 继承

创建子类和创建实例其实是一个原理，不过实例是使用new来创建，

而子类是创建一个新的类，然后将这个类的prototype指向父类的prototype，

所以同样的对子类的prototype进行修改也会影响到父类，所以还是有很大的局限性


## 其他

阅读红宝书时有些意义不大，或者是由于年代久远现在感受不到意义的内容，例如所谓的“寄生模式”以及“稳妥构造模式”，
前者本质上就是使用new的工厂模式，也就是在封装了的函数里进行对象实例化，然后return出来。而后者“稳妥构造模式”就只是带有私有变量的类。

这是传统的工厂模式
```
function factory(gender, age, status){
	var obj = new Object();
	obj.gender = gender;
	obj.age = age;
	obj.status = status
	return obj;
}
var people_1 = factory('male', '12', 'dead');
```

这是书中提到的“寄生模式”：

```
function factory(gender, age, status){
	var obj = new Object();
	obj.gender = gender;
	obj.age = age;
	obj.status = status
	return obj;
}
var people_1 = new factory('male', '12', 'dead');
```

> 在另外一本书里看到寄生继承，发现和高程里描述差距有点大，做个修正：

```
var Sth = function(){
	this.name = 'jerk'
}
var obj = new Sth();  // 寄生是在现有类的基础上做补充后返回，属于原类的超集。 
obj.gender = gender;
obj.age = age;
obj.status = status
function

```



