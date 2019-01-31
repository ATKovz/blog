---
title: 你知道数据有几种写法吗 —— 数据结构学习笔记（链表） 
date: 2019-01-16 
tags: 基础
---
 

> 恶补基础之路--数据结构与算法（链表），
> 
> 学习书籍为图灵的 数据结构与算法——JavaScript描述

在处理复数数据的时候，通常都会选择数组，但是数组并不能解决所有的问题，由于JS万物皆对象的特性，数组也被实现成了对象，效率较低。

同时数组也比较难以描述对象之间的关系，链表则比较灵活了 ↓

![http://www.teoblog.cn](http://www.teoblog.cn/postimg/20191161.jpg)


链表除了储存数据外，也能很好的描述对象之间的关系，同时在对数据的处理上也更加灵活。

当想在其中添加一个元素时，只需要改变其前后元素的指向就行

![http://www.teoblog.cn](http://www.teoblog.cn/postimg/20191162.jpg)

删除的话也只需要把他前一个元素指向后一个元素就可以了

![http://www.teoblog.cn](http://www.teoblog.cn/postimg/20191163.jpg)


一个链表的构成需要两个部分，一个是节点，一个是操作链

可以用2个类来表示：
```
//带有双向指针的节点
function Node(elem){
	this.prev = null;
	this.next = null;
	this.elem = elem;
}

//实现了增删查改和移动指针的操作链
function List(){
this.head = new Node('head');
this.length = 1;
this.append = append;  
this.remove = remove;
this.find = find;
this.insert = insert;
this.advance = advance;
this.show = show;
this.back = back;
this.currentNode = this.head;
```
下面就基于增删查改的需求实现一个链表：
```
function Node(elem){
	this.prev = null;
	this.next = null;
	this.elem = elem;
}

function List(){
this.head = new Node('head');
this.length = 1;

//增加节点
const append = function(elem){
	const newNode = new Node(elem);
	let currentNode = this.head;
	while(currentNode.next){
		currentNode = currentNode.next;
	}
	currentNode.next = newNode;
	newNode.prev =  currentNode;
	this.length++;
	return(this.length);
};

//删除节点
const remove = function(elem){
	let currentNode = this.head;
	while(currentNode.elem !== elem){
		currentNode = currentNode.next;
	}
	if(currentNode.elem === elem){
		currentNode.prev.next = currentNode.next;
		currentNode.next.prev = currentNode.prev;
		this.length--;
		return currentNode;
	}
	return null;
};

//查找节点
const find = function(elem){
	let currentNode = this.head;
	while(currentNode.elem != elem){
		currentNode = currentNode.next;
	}
	console.log(currentNode);
	return currentNode;
};

//插入节点
const insert = function(elem, target){
	let newNode = new Node(elem),
		targetNode = this.find(target);
	newNode.prev = targetNode;
	if(targetNode.next){
		newNode.next = targetNode.next;
		targetNode.next.prev = newNode;
	}
	targetNode.next = newNode;
	this.length++;
	return this;
};

//往后移动N位的方法
const back = function(n=1){
	for(let i=0; i<n; i++){
		if(!this.currentNode.next){
			throw new Error("超范围了");
		}
		this.currentNode = this.currentNode.next;
	}
	return this.currentNode;
};

//往前移动N位的方法
const advance = function(n=1){
	for(let i=0; i<n; i++){
		if(!this.currentNode.prev){
			throw new Error("超范围了");
		}
		this.currentNode = this.currentNode.prev;
	}
	return this.currentNode;
};

展示链表中全部数据
const show = function(){
	let currentNode = this.head;
	console.log(currentNode);
	while(currentNode.next){
		console.log(currentNode.next);
		currentNode = currentNode.next;
	}
};

	this.append = append;
	this.remove = remove;
	this.find = find;
	this.insert = insert;
	this.advance = advance;
	this.show = show;
	this.back = back;
	this.currentNode = this.head;
}
```
这是一个非循环链表 ，如果将链表的头部指向尾部，那么就可以实现一个循环的链表，在需要进行周期性的循环操作的时候就非常实用了。
```
//	检验链表功能
const Queue = new List();
Queue.append("first");
Queue.append("second");
Queue.append("third");
Queue.append("fourth");
Queue.remove("third");
Queue.insert("???", "fourth");
Queue.find("second");

console.log(Queue.currentNode);
Queue.back(2);
console.log(Queue.currentNode);
Queue.advance(4);
console.log(Queue, Queue.currentNode);
```

输出结果：

 ![http://www.teoblog.cn](http://www.teoblog.cn/postimg/20191164.png)

