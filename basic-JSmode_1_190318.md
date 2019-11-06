---
title: 写给自己看的JS设计模式复习——工厂/单例
tags: 基础
date: 2019-03-18
categories: 读书
---

> 过一遍设计模式，一些以前学过一些没学过，学过当复习。

工厂模式调用后在内部创建了一个新对象并返回，并可封装多种类根据类型返回，这在需要大量复用的场景里，记忆起来比起构造函数要来的方便，也便于维护。

```
const Factory = function(type){
	const object = {};
	switch(type){
		case 'pig':{
			object.say = function(sth){
				console.log('say' + sth);
			}
			object.eat = function(sth){
				console.log('eat' + sth);
			}
		};
		return object;
		case 'dog': {
			object.bark = function(sth){
				console.log('bark');
			}
			object.run = function(){
				alert('running')
			}
		};
		return object;
	}
}
```

单例模式则侧重结构鲜明，能让人一眼就看出各个功能模块的分布，同时还能有效的节省命名空间
```
const Single = {
	Utils: {
		util_1: function(){
			// do sth
		},
		util_2: function(){
			// do sth
		},
	}

	Action: {
		action_1: function(){
			// do sth
		},
		action_2: function(){
			// do sth
		}
	}

	Constants: {
		constant_1: 'sth',
		constant_2: 'sth'
	}
}
```

上面这个例子很鲜明的划分了3个模块，而占用到的命名空间极少，在调用方法时可读性也非常强，一眼就能看出方法/变量是属于哪个模块，其实也可以说，es6 export实例就算是单例。

同时单例模式顾名思义，这种模式下类只有一个实例，为防止重复创建新实例，可以使用惰性单例，在创建实例时检查是否已存在实例，存在则返回该实例，不存在时才创建新的实例，这也有效的提高了性能。

```
const lazySingle = (function(){
	let _instance = null;
	let init = function(){
		return {
			name: 'single_instance',
			public_method: function(){
				alert('im a lazy_single_instance');
			}
		}
	}
	// 如果实例不存在则创建新实例,存在则不创建，直接引用该实例
	return function(){
		if(!_instance){
			_instance = init();
		}
		return _instance;
	}
})()
const a = lazySingle()
const b = lazySingle()
console.log(a === b); // true
```



