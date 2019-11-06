---
title: 写给自己看的JS设计模式复习——发布订阅模式
tags: 基础
date: 2019-03-20
categories: 读书
---


>过一遍设计模式，一些以前学过一些没学过，学过当复习。

发布订阅模式是现在非常实用的模式，在vue中就大量的用到了这种设计模式。

该设计模式伴随着发布方法和订阅方法:

```
// 投递事件
var Publisher = function(){
	this.subscriber = [] 
};
Publisher.prototype.deliver = function(data){
	this.subscriber.forEach((fn) => {
		fn(data);	// 每个订阅者都执行该事件
	})
	return this;
}
// 订阅事件
Function.prototype.subscribe = function(publisher){
	var exist = publisher.subscriber.some((subcribers)=>{
		return subcribers === this; // 检查是否已订阅该事件
	})
	// 如果未订阅则订阅
	if(!exist){
		publisher.subscriber.push(this);
	}
	return this;
}
// 取消订阅
Function.prototype.unSubcribe = function(publisher){
	publisher.subscriber = publisher.subscriber.filter(item=>{
		item !== this;
	})
}
var a = new Publisher();
const b = function(){alert('the guy was subscribed is delivering')};
b.subscribe(a);
a.deliver();
```

当发布者投递状态的时候，订阅了该发布者的订阅者便会全部执行。

发布-订阅模式简化了开发过程中任务流程的设计，

原本设计一个功能需要在某个阶段调用某几个功能，需要考虑的有两方面，在需要调用多个方法的时候代码会显得十分繁琐。

而使用发布订阅模式，把所有方法整合为一个发布讯号，

我们只需要知道方法需要在什么阶段执行，然后订阅该发布讯号即可。

### 优缺点

1.在只需要少次数的调用方法的时候发布订阅模式可能看起来不如直接调用函数，但是在复杂场景下这种整合手段就显得非常的优雅，可维护性也非常强。

2.创建发布实例会增加加载时间，可以使用惰性加载来优化。



