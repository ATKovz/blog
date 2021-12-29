title: 写给自己看的ES6复习————Proxy/Reflect
tags:
  - es6
  - javascript
  - 基础
categories:
  - JavaScript
date: 2019-03-22 00:00:00
---

> 复习以前没做笔记的内容————Proxy/Reflect

## Proxy

如同字面意思，Proxy是作为代理修改对象默认属性的方法，语法如下： let p = new Proxy(target, handler)

-target
用Proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。

-handler
一个对象，其属性是当执行一个操作时定义代理的行为的函数。

先从一个简单的例子上手：

```
let a = { type: 'normal obj' };
let b = new Proxy(a, {});
console.log(b) // type: 'normal obj'
b.newType = 'proxy obj';
console.log(a) // type: "normal obj", newType: "proxy obj"
```
当第二个参数，也就是拦截处理为空时，相当于直接指向原对象，等于只是通过b访问a

```
b = new Proxy(a, {
	get: function(target, property){
		return 'jerk'
	},
	set: function(target, property){
		target[property] = 'proxyvalue'
	}
})
b.newType // jerk
b.anything // jerk
b.avalue = 'testvalue';
b.avalue; // jerk
a.avalue; // proxyvalue
```
通过配置的选项成功拦截了

而未通过配置的选项则将会和没设置代理一样，下面是proxy实例可以拦截的所有操作：

<table>
<thead>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/apply" target="_blank" rel="nofollow">apply(target, object, args)</a></td>
<td>拦截 Proxy 实例作为函数调用的操作</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/construct" target="_blank" rel="nofollow">construct(target, args)</a></td>
<td>拦截 Proxy 实例作为函数调用的操作</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/defineProperty" target="_blank" rel="nofollow">defineProperty(target, propKey, propDesc)</a></td>
<td>拦截 Object.defineProperty() 的操作</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/deleteProperty" target="_blank" rel="nofollow">deleteProperty(target, propKey)</a></td>
<td>拦截 Proxy 实例删除属性操作</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get" target="_blank" rel="nofollow">get(target, propKey, receiver)</a></td>
<td>拦截 读取属性的操作</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set" target="_blank" rel="nofollow">set(target, propKey, value, receiver)</a></td>
<td>拦截 属性赋值的操作</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor" target="_blank" rel="nofollow">getOwnPropertyDescriptor(target, propKey)</a></td>
<td>拦截 Object.getOwnPropertyDescriptor() 的操作</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getPrototypeOf" target="_blank" rel="nofollow">getPrototypeOf(target)</a></td>
<td>拦截 获取原型对象的操作</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/has" target="_blank" rel="nofollow">has(target, propKey)</a></td>
<td>拦截 属性检索操作</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/isExtensible" target="_blank" rel="nofollow">isExtensible(target)</a></td>
<td>拦截 Object.isExtensible()操作</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/ownKeys" target="_blank" rel="nofollow">ownKeys(target)</a></td>
<td>拦截 Object.getOwnPropertyDescriptor() 的操作</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/preventExtensions" target="_blank" rel="nofollow">preventExtension(target)</a></td>
<td>拦截 Object().preventExtension() 操作</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/setPrototypeOf" target="_blank" rel="nofollow">setPrototypeOf(target, proto)</a></td>
<td>拦截Object.setPrototypeOf()操作</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/revocable" target="_blank" rel="nofollow">Proxy.revocable()</a></td>
<td>创建一个可取消的 Proxy 实例</td>
</tr>
</tbody>
</table>

### this问题

在proxy中，this会指向proxy实例，所以在拦截部分带有this的对象时可能会出错，这种时候需要手动进行this硬绑定。

### get && set

```
let a = {
	sth: 'value'
}
let b = new Proxy(a, {
	get(target, property){
		if(property in target){
			return target[property]
		}else{
			throw new Error(`${property}不存在,property ${property} is undefined`)
		}
	},
	set(target, propKey, value, receiver){
		if(propKey in target){
			throw new Error(`${propKey} is onlyRead`)
		}else{
			target[propKey] = value
		}
	}
})
b.sth // "value"
b.xxx // Uncaught Error: xxx不存在,property xxx is undefined
b.sth = 'jerk' // Uncaught Error: sth is onlyRead

拦截了对象的读取和写入操作，当访问未定义的对象时抛出错误, 当修改属性时抛出错误。而get的第三个参数和set的第四个参数receiver指向操作所在的对象，一般情况下就是 Proxy 实例

```
const target = Object.defineProperties({}, {
  foo: {
    value: 123,
    writable: false,
    configurable: false
  },
});
var c = new Proxy(c, {}
})
c.sth // 123
c = new Proxy(c, {
	get(target,propkey){
	return 'jerk'
	}
})
c.sth // 报错

### has

has用于拦截hasproperty

```
var handler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  }
};
var target = { _prop: 'foo', prop: 'foo' };
var proxy = new Proxy(target, handler);
'_prop' in proxy // false
```
上面这个例子就拦截了_开头的属性名，所以通常has可以用于隐藏某些属性。同样如果对象设置了不可配置或者不可扩展，has拦截就会报错：

```
var obj = { a: 10 };
Object.preventExtensions(obj);

var p = new Proxy(obj, {
  has: function(target, prop) {
    return false;
  }
});

'a' in p; // 报错
```

### construct

用于拦截new命令，当用new命令创建新实例时拦截

```
const p = function(){
this.jerk = 'bar'
}
const proxy = new Proxy(p, {
construct(target, args, newTarget){
	console.log('new', newTarget, target); // newTarget是new的构造函数
	return { butt: 'sth' }
}
})
/* 输出 new ƒ () { [native code] } ƒ (){
 	this.jerk = 'bar'
	}
*/
```
*construct方法返回的必须是一个对象，否则会报错。*

### defineProperty

拦截定义属性的操作
```
var handler = {
  defineProperty (target, key, descriptor) {
    	return false;
  }
};
var target = {};
var proxy = new Proxy(target, handler);
proxy.foo = 'bar' // 不会生效
```

### getPrototypeOf

- Object.prototype.__proto__
- Object.prototype.isPrototypeOf()
- Object.getPrototypeOf()
- Reflect.getPrototypeOf()
- instanceof

用于拦截以上方法。

### ownKeys

拦截以下方法

- Object.getOwnPropertyNames()
- Object.getOwnPropertySymbols()
- Object.keys()
- for...in循环

### setPrototypeOf

拦截Object.setPrototypeOf方法

## Reflect

主要是用于把部分命令式的操作转成函数式如：

```
// demo1-Reflect.set(target, name, value, receiver), 第四个参数用于指定当set的name是方法的时候，return的this的上下文
var obj = {};
obj.a = 'a';
//等同于
Reflect.set(a, 'a');
________
// demo2-Reflect.has(obj, name)
'assign' in Object // true
// 等同于
Reflect.has(Object, 'assign') // true
________
// demo3-Reflect.deleteProperty(obj, name) 
delete myObj.foo;
// 等同于
Reflect.deleteProperty(myObj, 'foo');
________
// demo4-Reflect.construct(target, args)
const instance = new App('jerk');
// 等同于
const instance = Reflect.construct(App, ['jerk']);
________
demo5-Reflect.setPrototypeOf(obj, newProto)
const a = new A()
Object.getPrototypeOf(myObj)
Obj.prototype;
// 等同于
Reflect.getPrototypeOf(myObj);
________
demo6-Reflect.apply(func, thisArg, args)
Object.prototype.apply.call(fn, ctx, args)
//等同于
Reflect.apply(fn, ctx, args)
____
demo7-Reflect.ownKeys (target)
// Symbol中提到的，可以同时获取普通属性名和Symbol的方法
```	

除此外还有一些完全一致，只是把Object.method 换成 Reflect.method的,可以看出应该未来新出的操作对象的方法都会直接定义在Reflect上了

- Reflect.isExtensible (target)
- Reflect.getOwnPropertyDescriptor(target, propertyKey) 
- Reflect.defineProperty(target, propertyKey, attributes) 
- Reflect.preventExtensions(target) 


