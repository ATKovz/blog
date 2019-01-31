---
title: ES6异步解决方案 —— Promise 
date: 2019-01-01 15:33:49
tags: 基础
---

ES6学习/复习笔记均参考阮一峰老师的教程：

 [传送门](http://es6.ruanyifeng.com/)


## Promise

异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。

Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。

Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。

### Promise的用法：

ES6规定Promise对象是用于生成对象的构造函数

所以用法和构造函数一样：
```
const foo = new Promise(function(resolve, reject){
	if(/* 异步操作成功条件 */){
		resolve(value)
	}else{
		reject(error)
	}
})
```
resolve和reject是Promise提供的函数，不用自己部署。

这两个函数主要用于改变Promise的状态，并传入参数（执行结果和报错）

resolve代表成功，（即从 pending 变为 resolved）
reject则表示失败了（即从 pending 变为 rejected）

状态改变后就会执行then方法指定的函数:
```
foo.then(function(){
		//resolved时执行的函数
	},function(){
		//rejected时执行的函数（可选）
	})
```
Promise实例在创建的时候就会立即执行，可参考一下例子：
```
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

// Promise

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');
	
// Hi!
// resolved
```
回调函数则会在所有同步任务执行完成后才执行。

由于自带两个参数，所以需要传参的场景一般会把Promise嵌套在里层。

### 用Promise封装的Ajax例子：
```
const Ajax = function(method, url){
	const promise = new Promise(function(resolve, reject){
		//回调函数
		const callBack = function(){
			if(this.readyState !== 4){
				return
			}
			if(this.status === 200){
				resolve(this.response)
			}else{
				reject(new Error(this.statusText))
			}
		} 
		//创建Ajax实例
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.onreadystatechange = callBack;
		xhr.send();
	}
	return promise
}

Ajax("GET", './api.json').then(function(res){
	console.log(res)
}, function(error){
	console.log(error)
})
```

### Promise.prototype.catch

个人比较喜欢把then的第二个参数写成catch的形式，这不仅提高了可读性，使用起来也比then里包含两个函数要灵活的多：
```
// 写法一
const promise = new Promise(function(resolve, reject) {
  try {
    throw new Error('test');
  } catch(e) {
    reject(e);
  }
});
promise.catch(function(error) {
  console.log(error);
});

// 写法二
const promise = new Promise(function(resolve, reject) {
  reject(new Error('test'));
});
promise.catch(function(error) {
  console.log(error);
});
```

通过这种方法也可以捕获并抛出错误，
如果嵌套使用Promise对象，中间发生的错误都会被最外层，也就是最后执行的catch捕获。


