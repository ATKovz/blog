---
title: 你知道数据有几种写法吗 —— 数据结构学习笔记（集合）
tags: 基础
date: 2019-01-17
---

> 恶补基础之路--数据结构与算法（集合），
> 
> 学习书籍为图灵的 数据结构与算法——JavaScript描述


ES6里已经提供了Set数据结构，但是也只提供了基本操作和遍历器，没有求并集，交集，补集等方法，所以集合的学习还是有必要的。

惯例，先定义一个集合类，列出需要的方法：
```
function Sets(){
	this.data = [];
	this.size = size;
	this.add = add;
	this.remove = remove;
	this.show = show;
	this.union = union;
	this.intersect = intersect;
	this.difference = difference;
	this.subset = subset;
}
```

从增删查改开始：

增加方法需要有除重的特性，所以得检查添加的值在集合中是否存在：
```
const contains = function(item){
	if(this.data.indexOf(item) != -1){
		return true;
	}else{
		return false;
	}
};
```

下面是一个完整的整合了增删查改的集合类实例

```
function Sets(){
	this.data = [];
	this.size = 0;

	const contains = function(item){
		if(this.data.indexOf(item) != -1){
			return true;
		}else{
			return false;
		}
	};

	const add = function(item){
		if(!this.contains(item)){
			this.data.push(item);
			this.size ++;
			return this.data;
		}else{
			return false;
		}
	};

	const remove = function(item){
		const index = this.data.indexOf(item);
		this.data.splice(index, 1);
		this.size--;
		return this.data;
	};

	const show = function(){
		return this.data;
	};

	const union = function(set){
		const tempSet = new Sets();
		const data = set.data;
		for(let i=0, lens=this.data.length; i<lens; i++){
			tempSet.add(this.data[i]);
		}
		for(let i=0, lens=data.length; i<lens; i++){
			tempSet.add(data[i]);
		}
		return tempSet;
	};

	const intersect = function(set){
		const tempSet = new Sets();
		const data = this.data;
		for(let i=0, lens=data.length; i<lens; i++){
			if(set.contains(data[i])){
				tempSet.add(data[i]);
			}
		}
		return tempSet;
	};

	const difference = function(set){
		const tempSet  = new Sets();
		const data = this.data;
		for(let i=0, lens=data.length; i<lens; i++){
			if(!set.contains(data[i])){
				tempSet.add(data[i]);
			}
		}
		return tempSet;
	};

	const subset = function(set){
		const data = set.data;
		if(set.size > this.size){
			return false;
		}
		for(let i=0; i<data.length; i++){
			if(!this.contains(data[i])){
				return false;
			}
		}
		return true;
	};

	this.contains = contains;
	this.add = add;
	this.remove = remove;
	this.show = show;
	this.union = union;
	this.intersect = intersect;
	this.difference = difference;
	this.subset = subset;
}
```
输出测试：
```
const b = new Sets();
b.add(2);
b.add(5);
b.add(3);
b.show();
b.add(2);
b.show();				//输出[2,5,3]
const c = new Sets();
c.add(234);
c.add(2);
c.add(4);
b.difference(c); 		//[5,3]
b.subset(c); 			//false
const d = new Sets();
d.add(2);
d.add(3);
b.subset(d); 			//false
b.union(c); 			//[2, 5, 3, 234, 4]
b.intersect(c); 		//[2]
```