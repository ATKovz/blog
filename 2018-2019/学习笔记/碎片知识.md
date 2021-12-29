title: 零散笔记集合
tags:
  - 零散笔记
  - JavaScript
categories:
  - JavaScript
date: 2019-02-14 00:00:00
---
> 一堆零零散散的读书笔记，值得记录的点并不成体系，故开个零散知识点整合文，当某个模块凑够一定的数量后会拆开。

## 不常用的运算符
- \>>> 
把数字当二进制，无视符号（正负）的右移（即右移几位等于开方几次）


- \>>

把数字当二进制，不无视符号的右移（即右移几位等于开方几次）

- <<

把数字当二进制，不无视符号的左移（即右移几位等于开方几次）

- ^ 

位*异或*运算 ，把数字转成二进制对比，相同得0（false），不同得1(true),再将结果换成10进制

- & 

位 *与（and）* 运算，把数字转成二进制对比(前不补0，即3和10比转为11和1010，而不是0011和1010，然后直接从低位开始比，即11 和 10)，相同得1，不同得0,再将结果换成10进制

可用于判断奇偶，n&1为0则为偶数 为1则是奇数

- | 

位 *与（and）* 运算，把数字转成二进制对比，和 || 类似算法，最后转成10进制




## 正则表达式变量

1. 方法中用变量操作，

eg: 假定我们用一个对象存储了一个dom元素的样式：

const style = {
  width: 234,
  height: 234,
  top: 234234,
  left: 234534
}

这种时候突然想格式换成，数字+rpx的形式，一个个手动改未免太掏粪了，就可以用正则表达式变量处理

```
JSON.stringify(style).replace(/(\d{1,})/g, '$1rpx')
```

记住用括号把各个匹配分开才能实用变量，$n就代表第n个变量



## ~ 运算符（非运算符）

返回2的补码，可以理解成 -(x+1)记忆，**只适用于数字和布尔型(0,1),其他返回-1**

> ~-1是唯一一个能得到0的数，由于滋味运算符是通过ToInt32实现的，~~number 可以得到去除小数位的原值

利用这个特性，可以在判断字符是否存在的应用中提高代码可读性，

当字符串不存在时，indexOf返回-1，通过~indexOf的写法可以转成0，也就是false。

eg: 

```
let a = foo;
let b = j;
if(~foo.indexOf('bar')){
	//不存在时执行此段
}
```
## 数字字符串解析

显性转换有Number(), parseInt(), parseFloat.

隐性转换可以直接在字符串前加 **+ / - **运算符。

但是能处理带字符的数字的就只有parseInt和parseFloat，其他的会返回NaN

```
const a = '300px';
console.log(Number(a));  		// NaN
console.log(parseInt(a)); 	//300
console.log(parseFloat(a)); //300
console.log(+a);						// NaN
console.log(-a);						// NaN
```
还有一些比较特殊的，如0x开头的字符串会被解析成16进制，
第二个参数传递了转换进制基数的，会在第一个非法位置中断转化，

这些看起来很稀奇但仔细想想是挺正常的：
```
console.log(parseInt(Infinity, 19));  // 18
console.log(parseInt('0x3f'));			// 63
console.log(parseInt(false, 16));   	// 250 
```

## 赋值和引用

数组一般为引用,即指向内存，对数组的部分操作可能会影响原数组

基本类型一般为复制，不会出现这个问题。

```
const a = [1,2,3]
const change = (x) => {
	x.push(99);
	x = [2,2,2,2];
	console.log(x, a);  //  x=>Array(4) [2, 2, 2, 2]  a=>Array(4) [1, 2, 3, 99]
}
```
对x进行push操作时，a也受到影响。

```
const A = {};
A.prototype.say = function(){
	console.log('hello');
};
let b = {};
b.prototype = A.prototype;
b.prototype.say = function(){
	console.log('bye');
};
A.prototype.say();
```

用原型链实现继承时也同样体现了这个缺陷，子类修改prototype时会影响到父类。

