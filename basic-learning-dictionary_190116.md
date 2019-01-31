---
title: 你知道数据有几种写法吗 —— 数据结构学习笔记（字典）
tags: 基础
date: 2019-01-17
---

> 恶补基础之路--数据结构与算法（字典），
> 
> 学习书籍为图灵的 数据结构与算法——JavaScript描述


字典本质就是一种以键值对形式储存数据的数据结构，JS中的对象就是典型的字典，而数组也可以以字典的形式构建。

下面就通过增删查改的需求构建一个字典类：
```
function Dict(){
	this.data = [];
	this.add = function(key, value){
		console.log(this);
		this.data[key] = value;
		return this.data[key];
	};
	this.remove = function(key){
		delete this.data[key];
	}
	this.show = function(key){
		return this.data[key];
	};
	this.showAll = function(){
		console.log(this.data);
		const key = Object.keys(this.data).sort();
		for(let i=0; i<key.length; i++){
			console.log(key[i] +"=>" +this.data[key[i]]);
		}
	};
}

const dic = new Dict();
dic.add("lisa", 34);
dic.add("chiko", 22);
dic.add("dicky", 55);
dic.showAll();
dic.remove('chiko');
dic.showAll();
```

输出：
```
chiko=>22
dicky=>55
lisa=>34

//after remove
dicky=>55
lisa=>34
```
再实现一个根据输入的字符串判断出现单词次数并排序输出的类：

```
function Dictionary(){
	this.data = [];
	this.add = function(str){
		const arr = str.split(" ");
		for(let i = 0; i<arr.length; i++){
			this.data[arr[i]] = this.data[arr[i]] +1 || 1;
		}
	};
	this.showAll = function(){
		const key = Object.keys(this.data).sort();
		for(let i = 0; i<key.length; i++){
			console.log(key[i]+"=>"+this.data[key[i]]);
		}
	};
}

const sentense  = new Dictionary();
sentense.add("jerk jerk where are you jerk");
sentense.showAll();
```
输出：
```
are=>1
jerk=>3
where=>1
you=>1
```