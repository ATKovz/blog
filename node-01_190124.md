
---
title: NodeJS入门学习
tags: NodeJS
date: 2019-01-24
---



# 自带的全局变量 

[官方文档-全局变量](http://nodejs.cn/api/globals.html)

- setImmediate
- process
- module
- exports

## setImmediate

setImmediate是一个用于执行异步任务的函数，只有一个参数就是回调函数，和setTimeout不同，

setImmediate是将回调函数延后到队列末端位置，可以看下面的例子：

```
console.log('first');
setImmediate(()=>{
	console.log('second');
})
console.log('third');
console.log('forth');

// first third forth second
```

second被延后到任务队列最后执行。

和这很相似的还有process.nextTick,和setTimeout, promise

一起做个对比:

```

console.log('1:log');

new Promise((resolve)=>{
	resolve('1.5 promise');
}).then((res)=>{
	console.log(res);
})

setTimeout(()=>{
	console.log('2: setTimeout');
})

setImmediate(()=>{
	console.log('3: setImmediate');
})

process.nextTick(()=>{
	console.log('4: nextTick')
})

console.log('5: log');
```
输出结果： 

	1:log
	5: log
	4: nextTick
	1.5 promise
	2: setTimeout
	3: setImmediate

可以看出， nextTick和promise是先于所有异步函数的，而setImmediate则总是慢于所有异步函数。

因为nextTick属于异步任务里的microtask，setTimeout是属于macrotask，

而microtask总是先于macrotask的，有一篇比较详细的文章可以参考下 ：

> **[深入核心，详解事件循环机制](https://www.jianshu.com/p/12b9f73c5a4f#)**

由于demo太丧心病狂就不贴上来了,反正是相当典型的一个demo。


## process 

process的api

- process.argv
-
运行node时传入的参数（数组）其中argv[0]为node的路径,argv[1]为运行的脚本路径，argv[2]命令中为传入的参数

- process.argv0
-
等价于argv[0]

- process.execArgv

跟随在node命令的特殊参数，通常为配置

- process.execPath
-  
脚本执行路径



例子：  当输入node --inspect  load.js butt:awe 打印参数如下
``````
argv=> [ 'D:\\nodejs\\node.exe',
  'E:\\project\\test\\node\\load.js',
  'butt:awe' ]

argv0=> D:\nodejs\node.exe

execArgv=>: [ '--inspect' ]

execPath=>: D:\nodejs\node.exe
```
-process.env
-
环境配置列表，查看配置时调用。

-process.cwd
-
查看当前目录


- process.nextTick
-
异步钩子，还是同样很推荐看下面这个链接，
> **[深入核心，详解事件循环机制](https://www.jianshu.com/p/12b9f73c5a4f#)**


# 基础Api

## path 

主要是一系列处理路径的API。

- normalize 
- join
- resolve

normalize 用于处理不规范的路径，

join用于合并字符串并自动调用normalize路径规范化

resolve用于转化相对路径和绝对路径

- extname
- __dirname
- basename 

用于获取路径的扩展名/文件夹/根目录 

- parse(path)	(返回对象）
- format (返回字符串)
- resolve (返回绝对路径)
demo：
```
const { normalize, join, parse, format } = require('path');
const root = '/dir/file//fold/item';
const rootobj = { root: 'root', dir: 'dir', base: 'base', ext: 'ext', name: 'name' };
console.log(join('base','//dir','item'));
console.log(normalize(root));
console.log(parse(root));
console.log(format(rootobj));
console.log(resolve(format(rootobj)));
```
输出：

	base\dir\item
	\dir\file\fold\item
	{ root: '/',
	  dir: '/dir/file//fold',
	  base: 'item',
	  ext: '',
	  name: 'item' }
	dir\base
	E:\project\test\node\dir\base

在format方法中， 如果同时存在pathObject.dir和pathObject.root， root会被忽略

如果base存在，则忽略ext和name，如果不存在 则是 name+ext的格式


### __filename, __dirname,process.cwd()的区别：

__filename和__dirname总是返回文件所在目录， process.cwd()返回执行命令时所在的目录，require也是固定不变的


## Buffer

Buffer整体和数组很相似，也是全局变量 用于处理二进制数据流，

Buffer.alloc(size[, fill[, encoding]]) 
-
用于创建指定大小的Buffer

Buffer.allocUnsafe(size) / Buffer.allocUnsafeSlow(size)
-
同上，速度较快，但未初始化可能含有旧数据。

Buffer.from(string[, encoding]) 
-
返回传入内容的Buffer，第二个参数可以设置编码。

例子: 
```
console.log(Buffer.alloc(30));   
//输出 <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>

console.log(Buffer.from([3,56,2])); 
//输出 <Buffer 03 38 02>

console.log(Buffer.from("jerk"));
//输出 <Buffer 6a 65 72 6b>

console.log(Buffer.from("jerk", 'base64'));
//输出 <Buffer 8d ea e4>

console.log(Buffer.allocUnsafe(3));
//输出 <Buffer 00 01 00> 可见被污染了。 
```

Buffer.concat(unitarr[])
-
参数为数组,链接2个Buffer

Buffer.isBuffer()
-
判断是否为Buffer实例

Buffer.byteLength()
-
判断占用的字节数

## Buffer实例方法
 
Buffer.prototype.length
-
返回字节数

Buffer.prototype.toString([encoding[, start[, end]]])
-
转回字符串格式，默认编码格式是UTF-8

Buffer.prototype.fill(item, startindex, endindex);
-
填充Buffer

Buffer.prototype.copy(buf, startindex, endindex);
-
copy Buffer

Buffer.prototype.equal(buf)
-
比较buffer。

大多数数组有的方法Buffer也有，所以看点常用的特有的就可以了
更多参考 **[Buffer APi](http://nodejs.cn/api/buffer.html)**


## event

node的内建构造函数，node的核心就是事件驱动, 通常用触发器（emitter）触发自定义事件，然后使用监听器监听来调用函数。

下面是一个简单的实例：
```
const A = require('events');

class Event extends A{};

const eventEmitter = new Event();

eventEmitter.on('jerk',()=>{
	console.log('小孩子不要说脏话');
});

setInterval(()=>{
	eventEmitter.emit('jerk')
}, 2000);
```
上面的实例引入events，创建了一个新的实例，然后监听自定义event jerk。

这里的on和jquery的on Api一样，都是事件监听器。

所以上面例子会每2秒触发一次jerk事件然后触发回调函数。

当 EventEmitter 对象触发一个事件时，所有绑定在该事件上的函数都会被同步地调用。

还可以用emit传递无数量限制的参数，在事件后的参数传递即可，然后在回调函数中接收。


移除监听时，events提供了 removeListener(eventName, fn)
```
const fn1 = (arg)=>{
	console.log('小孩子不要说脏话',arg);
}
const fn2 = ()=>{
	console.log('11');
}

eventEmitter.on('butt', fn1);
eventEmitter.on('butt', fn2);

setInterval(()=>{
	eventEmitter.emit('butt', 'guys');
}, 200);

setTimeout(()=>{
	eventEmitter.removeListener('butt',fn1);
	console.log('remove event1')
}, 3000);
```

方法执行时只会清除指定的函数,若没有指定函数名则会报错。

想要全部清除得使用 removeAllListener(event) 方法

## fs（fileSystem)


fs也是内嵌API,使用前得先引入。

所有文件系统操作都具有同步和异步的形式。

异步操作约定回调函数的第一个参数为错误信息。
```
const fs = require('fs');

fs.unlink('/tmp/hello', (err) => {
  if (err) throw err;
  console.log('已成功删除 /tmp/hello');
});
```
同步操作则可以使用try...catch代码块来捕获错误。
同时fs下的同步方法命名为异步函数名+Sync。

```
const fs = require('fs');

try {
  fs.unlinkSync('/tmp/hello');
  console.log('已成功删除 /tmp/hello');
} catch (err) {
  // 处理错误
}
```
### fs常用的操作文件方法

- fs.readFile(path[, options], callback)
- fs.writeFile(file, data[, options], callback)
- fs.appendFile(path, data[, options], callback)
- fs.stat(path[, options], callback)
- fs.rename(oldPath, newPath, callback)
- fs.unlink(path, callback)
- fs.createReadStream(path)

更多参考 [FS API](http://nodejs.cn/api/fs.html)




