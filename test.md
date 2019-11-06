title: 自己做过的面试题（持续不定期更新）
author: Teo
tags:
  - 面试
  - javascript
  - css
categories:
  - 零散笔记
date: 2019-09-19 16:25:00
---
> 汇总下见到过的面试题以及个人解法,不定时更新

# HTML

## canvas应用场景

1. 绘图（如活动二维码海报生成）

2. 绘制常见图形

3. 进行图片处理（灰度，色彩等）

4. 数据可视化

## iframe和frame区别

1. 前者无需指定DTD（文档头）后者要

2. frame废弃了，基本都用iframe嵌入

## cookie/localStorage/sessionStorage区别

1. cookie限制4K，其他2个大小限制5M

2. cookie请求头加了credentials:include的话每次请求都会携带，影响网络请求性能

3. localStorage用户不清除可永久保存，seesionStorage关浏览器就没了，cookie可手动设置失效时间

4. storage的原生接口比cookie友好一点

## 实现切换浏览器标签视频自动暂停

监听document.visibilityState, 对应事件：document.onvisibilitychange

## HTML5新特性

- canvas
- svg
- localStorage/sessionStorage
- navigator.geolocation.getCurrentPosition
- video/audio

## <meta>标签

https://segmentfault.com/a/1190000004279791

## href和src有什么区别

href是关联当前文件和链接文件

src是用链接文件的内容嵌入目前元素

所以href是并行加载，src是阻塞式加载

## 如何原样输出HTML代码，不被浏览器解析

用code pre textarea标签 

## 在新窗口打开链接的方法是什么？那怎么设置全站链接都在新窗口打开

1.

```
<a target="_blank"></a>
```

2.
```
<head>
  <base target="_blank">
</head>
```

## iframe的使用场景

以前的管理后台类 菜单-内容布局

广告

游戏

第三方登录接入

## ruby标签

```
<ruby>
  <rb>茕</rb>
  <rt>qióng</rt>
</ruby>
```



# CSS

## 前端多倍图

用1倍图在DPI高的屏幕会糊（拉伸），一般建议用2倍图，最理想是根据屏幕分配不同倍图

## 分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景。

opacity和visibility都会占据DOM布局， 

opacity可以继续交互操作，

visibility不可以操作, 

如果对属性为hidden的父元素的子元素设置为visible， 则该子元素会正常显示，opacity和display则不行，

因为visibility是针对单个元素的，而子元素隐藏是因为继承了父元素的属性，再次设置则顶掉了。

display：none不占据，但是会导致回流，性能比其他2个差

## 已知如下代码，如何修改才能让图片宽度为 300px ？注意下面代码不可修改。

```
<img src="1.jpg" style="width:480px!important;”>
```
1. 盒模型 

box-sizing: border-box;
padding: 0 90px; 

2. css3

transform: scale(0.625,0.625)

3. 最大宽度

max-width: 300px

# 原生JS

## 用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值

```
const getRandom = () => (Math.ceil(Math.random() * 31) + 1)

const getRandomArr = (arr = [], length = 0) => {
  if (length >= 5) {
    return arr;
  }
  let randomItem = getRandom()
  if (arr.indexOf(randomItem) !== -1) {
    return getRandomArr(arr, length)
  } else {
    arr.push(randomItem)
    return getRandomArr(arr, length + 1)
  }
}
```

## 写一个方法去掉字符串中的空格

```
const replaceSpace = (str) => {
  if(typeof str !== 'string'){
    throw new Error('param must be type string')
  }
  const space = /\s/g
  return str.replace(space, '')
}
```

## 去除字符串中最后一个指定的字符

```
const removeLastChar = (str, char) => {
  const index = str.lastIndexOf(char)
  console.log(index)
  return str.slice(0, index).concat(str.slice(index + char.length, str.length))
}
```

## 写一个方法把下划线命名转成大驼峰命名

```
const underlineToCamel = (str) => {
  const target = new RegExp(/_./g)
  const toUpper = (str) => (str[1].toUpperCase())
  return str.replace(target, toUpper)
}
```

## 写一个把字符串大小写切换的方法

```
const toggleFormat = (str) => {
  const a = 'a'.charCodeAt()
  const z = 'z'.charCodeAt()
  const A = 'A'.charCodeAt()
  const Z = 'Z'.charCodeAt()
  for(i=0; i<str.length; i++){
    const position = str[i].charCodeAt()
    let temp
    if(position >= a && position <= z){
      temp = str[i].toUpperCase()
    }
    if(position >= A && position <= Z){
      temp = str[i].toLowerCase()
    }
    str = str.slice(0, i) + temp + str.slice(i+1, str.length)
  }
  return str
}
```
## 写一个加密字符串的方法

```
const encryptStr = (str, startIndex, length) => {
  let code = ""
  for(let i = 0; i<length; i++){
    code += "*"
  }
  return str.slice(0, startIndex) + code + str.slice(startIndex+1, str.length)
}
```

##  统计某一字符或字符串在另一个字符串中出现的次数

```
const matchStrAmount = (target, str) => {
  const item = new RegExp(str, 'g')
  return target.match(item).length
}

```

## 写一个判断数据类型的方法

```
const checkType = item => Object.prototype.toString.call(item).slice(8,-1)
```

## 写一个获取当前url查询字符串中的参数的方法

```
const parseQuery = (url = window.location.href) => {
  const str = url.split('?')[1]
  const paramList = str.split('&')
  const params = {}
  paramList.forEach(i => {
    let param = i.split('=')
    params[param[0]] = param[1]
  })
  return params
}
```

## 写一个数组去重的方法（支持多维数组）

```
const flat = (arr) => {
  for(let i = 0; i<arr.length; i++){
    if(arr[i] instanceof Array){
      arr = arr.slice(0, i).concat(flat(arr[i])).concat(arr.slice(i+1, arr.length))
    }
  }
  return arr
}
```

## 写一个验证身份证号的方法
```
挖坑待填
```

## 写一个去除换行符制表符的方法
```
挖坑待填
```

## 写一个方法验证是否为中文

```
const isChinese = (str) => {
  const left = 0x4E00
  const right = 0x9FA5
  for(let i = 0; i< str.length; i++) {
    const position = str[i].charCodeAt()
    if(position <= left || position >= right){
      return false
    }
  }
  return true
}
//或者用正则
const isChinese = (str) = {
  return /^[\u4e00-\u9fa5]+$/.test(str);
}
```

## 手写一个new

```
const newFn = (Constructor, ...arg) => {
  const target = {}
  target.__proto__ = Constructor.prototype;
  let item = Constructor.apply(target, arg)
  return typeof item === 'object' ? item: target // 如果构造函数return，且为对象，则以return为准
}
```

## 什么是闭包？优缺点分别是什么？

拥有自己的作用域同时内存不会被释放的一种表现，通常出现在单例模式，防抖节流函数等场景

可以通过闭包创建无法被篡改的变量，避免了污染函数作用域外的上下文，但滥用可能造成内存泄漏

单例模式就是典型的闭包应用：
```
const Instanse = function(){
  this.name = 'single instance'
}
const closure = (function(){
  let isCreated = false;
  let instance = {}
  return function(){
    if(!isCreated){
      const item = new Instanse()
      isCreated = true
      instance = item
      return item
    }else{
      return instance
    }
  } 
})()

const a = closure()
const b = closure()
a.jerk = 'butt'

console.log(a, b)
```

## 手撸一个new
```
const _new = function(Constructor, ...params) {
  const obj = {}
  obj.__proto__ = Constructor.prototype
  Constructor.call(obj, ...params)
  return obj
}
```

## 判断数组的方法

1. [] instanceof array

缺陷：由于JS万物皆对象，所以 [] instanceof Object 也为true，有可能会出现偏差

2. Array.isArray([])

缺陷：由于是ES6的新API，兼容性一般

3. Object.prototype.toString.call([])

个人比较喜欢这种，判断类型的万能方法，但是性能较差

## 浏览器和node环境下的evenLoop

node11开始和浏览器一致，开始回调后，node11之前不会有第二轮队列，

即第二轮回调开始会把单个macrotask/micro内部的microtask执行完才执行下一个macrotask,

即新一轮的microtask可以插队，而11之前的node中microtask是没法插队的，会直接打入下一轮，

11之后的microtask可以插队，但是macrotask还是打入下一轮（个人理解）

具体可以看下面这例子：

```
function test () {
  console.log('start')
   setTimeout(() => {
       console.log('children2')
       Promise.resolve().then(() => {console.log('children2-1')})
   }, 0)
   setTimeout(() => {
       console.log('children3')
       Promise.resolve().then(() => {console.log('children3-1')})
   }, 0)
   Promise.resolve().then(() => {
    console.log('children1')     
    setTimeout(() => {
      console.log('children-2.1')
    }, 0)})
   console.log('end') 
}

test()

// 浏览器输出
start
end
children1
children2
children2-1
children3
children3-1
children-2.1

// node10.15.3输出
start
end
children1
children2
children3
children-2.1
children2-1
children3-1
```

## 形参问题

以下输出什么

```
function changeObjProperty(o) {
  o.siteUrl = "http://www.baidu.com"
  o = new Object()
  o.siteUrl = "http://www.google.com"
} 
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl);
```

输出百度，因为传参本质是o = website，在o = new Object()的时候就丢失了对website的引用

## 引用问题

下面输出什么
```
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x)
console.log(b.x)
```
考核运算优先级和引用，挺有意思的一题目

a指向的是{n: 1} 这个内存空间，

正常的赋值运算是从右到左，但点运算符的优先级比等号高，所以a.x相当于给{n: 1} 增加了x这属性，

然后开始运算右边 a = {n: 2}

最后a.x = a, 此时的a.x已经是保存为原有的{ n:1, x: undefined }了，而a是{n: 2},

所以最后运算是让{ n: 1, x: undefined } 变成{ n: 1, x: { n: 2 } }

而a则指向了{ n: 2 }

输出 undefined，{ n: 2 }

## 设计一个类

要求设计 LazyMan 类，实现以下功能

```
LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
```

我用了堆栈结构和异步操作实现

```
const lazyMan = function(name){
  this.stack = []
  this.name = name
  this.next = (value) => {
    const fn = this.stack.shift()
    fn(value)
  }

  this.eat = (value) => {
    this.stack.push(() => {
      console.log(this.name + ' eat ' + value)
    })
    setTimeout(() => {
      this.next()
    })
    return this
  }

  this.sleepFirst = (interval = 0) => {
    this.stack.unshift(() => {
      console.log(this.name + ' first sleep for ' + interval + 's')
      setTimeout(() => {
        this.next()
    }, interval)})
    return this
  }

  this.sleep = (interval = 0) => {
    this.stack.push(() => {
      console.log(this.name + ' sleep for ' + interval + 's')
      setTimeout(() => {
        this.next()
      }, interval)
    })
    return this
  }

  console.log('hey i\'m ' + name)
  return this
}


lazyMan('dumm').eat('shit').sleepFirst(21).sleep(3).eat('poop')
```

## 数组右移

```
const move = (arr, index) => {
  const i = index % arr.length
  return arr.slice(-i).concat(arr.slice(0, arr.length-i))
}
```

## 输出对称数

```
const contrastNum = (max) => {
  let list = []
  for(let i = 0; i < max; i++){
    const str = String(i)
    if (str === str.split('').reverse().join('')) {
      list.push(i)
    }
  }
  return list
}
```

## 高亮搜索词

```
const highlight = (target, keyword, classname) => {
  const hightlightItem = `<span class="${classname}">${keyword}</span>`
  const keywordReg = RegExp(keyword, 'g')
  return target.replace(keywordReg, hightlightItem)
}
```

# JS库/框架

## React中setState什么时候为同步，什么时候为异步

- 事件触发的setState

- 生命周期的setState

除了以上2者其余都为同步

# node