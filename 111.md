title: 浅谈函数式编程
author: Teo
date: 2019-10-11 18:01:11
tags:
---
> 本文参考书目：《JS函数式编程指南》

开始学习函数式编程是在读antd源码时读到一段代码

```
for (key in obj) {
 if (Object.prototype.hasOwnProperty.call(obj, key)) {
   ...
 }
}
```
一开始以为是FP里的引用透明，现在看虽然和本篇没什么关系，但是还是提下这个， in 表示在原型链查找， hasOwnProperty 只能找私有属性，所以是用于判断私有属性防止覆盖原型链上的方法

## 从函数命名开始

函数命名虽然看似无关紧要，但在长期的编程中命名就很要紧了，特别是在初次开发时只某些针对业务的功能中：

```
// 只针对当前的博客
const validArticles = articles =>
  articles.filter(article => article !== null && article !== undefined),

// 对未来的项目更友好
const compact = xs => xs.filter(x => x !== null && x !== undefined);
```

前者容易导致在一个长期维护的项目中，由于某些功能近似的函数由于名称引起误解，出现重复造轮子的现象。

而下面的命名适用性更强，能有效避免前者出现的不足

在函数式编程中，this也是应该谨慎使用的，在某些场景里可能会由于业务复杂，导致this指向混乱，导致代码全无可读性

## 纯函数的意义

纯函数即每次同样操作都会有同样的结果，同时不会改变传入的参数的函数，最典型的例子就是数组的slice和splice方法

```
var xs = [1,2,3,4,5];

// 纯的
xs.slice(0,3);
//=> [1,2,3]

xs.slice(0,3);
//=> [1,2,3]

xs.slice(0,3);
//=> [1,2,3]


// 不纯的
xs.splice(0,3);
//=> [1,2,3]

xs.splice(0,3);
//=> [4,5]

xs.splice(0,3);
//=> []
```

非纯函数同样会导致复杂的业务场景中结果难以预测，让项目变得难以维护。

```
// 不纯的
var minimum = 21;

var checkAge = function(age) {
  return age >= minimum;
};

// 纯的
var checkAge = function(age) {
  var minimum = 21;
  return age >= minimum;
};
```

上面这例子中，在阅读到checkAge这个函数时，如果minimum的值是不确定的，我们并没法直接判断输出的结果，这就使得我们还需要回过头去搜索minimum这个变量。

函数式编程正是要极力避免这一点，或者说完全不该出现非纯函数，或者叫副作用函数（effect）。

在这种场景中，一个输出只会固定有一种结果，在简单的功能里我们甚至可以用object来代替function，举个例子：

```
var toLowerCase = {"A":"a", "B": "b", "C": "c", "D": "d", "E": "e", "D": "d"};

toLowerCase["C"];
//=> "c"

var isPrime = {1:false, 2: true, 3: true, 4: false, 5: true, 6:false};

isPrime[3];
//=> true

```

上面这场景其实不太恰当，只是个简单的例子，证明这种写法的可行性。

## 纯函数的好处

1. 可缓存

当固定的输入必定会返回固定的值时，我们就没必要每次都进行计算了，完全可以把计算过的结果存储起来，下次计算同样的值直接返回缓存，这样对性能的提升是极大的。

eg:

```
const memorize = function(fn) {
  const cache = {}

  return function (...args) {
    const argStr = JSON.stringify(args)
    cache[argStr] = cache[argStr] || fn.apply(fn, args)
    return cache[argStr]
  }
}

```

2. 可测试

由于每次固定输入都输出同样的结果，没有什么可变性，所以函数式开发的测试，完全可以给函数一个输入，然后断言（assert）输出进行判断就行了。

3. 合理性

如果可以把计算出来的结果用于替换该函数的调用，同时我们不需要改变其他条件，那这个函数就是*引用透明*的，开头那段就满足了这一点，

但是开头的那段的if部分，个人觉得还是没必要写，因为属于无论输入什么值，结果都返回是true，这种判断完全可以省略，这大概是框架上设计的纰漏或者开发者的小癖好了，如有理解错误望指正。

4. 可移植

首先看例子：

```
// 不纯的
var signUp = function(attrs) {
  var user = saveUser(attrs);
  welcomeUser(user);
};

var saveUser = function(attrs) {
    var user = Db.save(attrs);
    ...
};

var welcomeUser = function(user) {
    Email(user, ...);
    ...
};

// 纯的
var signUp = function(Db, Email, attrs) {
  return function() {
    var user = saveUser(Db, attrs);
    welcomeUser(Email, user);
  };
};

var saveUser = function(Db, attrs) {
    ...
};

var welcomeUser = function(Email, user) {
    ...
};
```

在第一个例子里，在函数的后续引用中调用了外部的函数（welcomeUser中的Email），

而第二个例子里，纯函数全程使用的函数都是从第一层调用时就确定了的（Db, Email, attrs），这让函数的调用变得更透明

## 柯里化

柯里化是一种能把函数参数提前储存，分成多次传递的操作，eg：

```
// replace space to sth
const sentence_0 = 'test   can  replace space'
const sentence_1 = 'test   can  replace space'

// no curry
const replaceSth = (regx, replacement, str) => str.replace(regx, replacement)
replaceSth(/\s/g, 'space', sentence_0)
replaceSth(/\s/g, 'space', sentence_1)

// with curry
const replace = _.curry(replaceSth)
const replaceSpace = replace(/\s/g, 'space')
replaceSpace(sentence_0)
replaceSpace(sentence_1)
```

上面例子中，我们将要处理的对象放到参数的最后一位，未经过柯里化的方法要么需要每次调用都传入参数，要么得写死前面2个参数，没法进行其他条件的匹配。

而柯里化后的函数则可以储存前面2个参数，以后每次调用只需要传入要处理的对象就可以了。


## 函数组合

和柯里化一样对函数进行处理后返回一个新的函数，不过这里是将2个函数合并

```
var compose = function(f,g) {
	return function(x) {
		return f(g(x));
	};
};
```

在这里，会先执行作为第二个参数传入的函数，后执行第一个函数，在部分函数的合并里可能没影响，但在某些场景下是会影响到的，但是函数的组合顺序是不会影响到结果的，这就是函数组合的一个特性，** 结合律（associativity）**。 所以个人觉得与其把这东西叫组合，倒不如叫排列。


```
// 结合律（associativity）
var associative = compose(f, compose(g, h)) === compose(compose(f, g), h);
```
由于有这个特性，我们就可以把compose改造下，让compose可以传入任意个参数:

```
const co = (...fns) => {
	return (...args) => {
        let res = args
        for(let i = (fns.length -1); i >= 0; i--){
            res = fns[i](res)
        }
        return res
    }
}

let a = (x) => { return x * x }

let b = (x) => x + 10

let c = (x) => `${x} !!`


console.log(co(c, b, a)(10)) // 110!!
console.log(co(c, co(b, a))(10)) 110!!
```


### pointFree

pointFree是一种编程风格，就是要满足调用的函数过程不提及处理的参数（可以理解成不需要定义形参），举个例子：

```
// 2个提及处理参数的简单函数
var addOne = x => x + 1;
var square = x => x * x;

// 满足pointfree的新函数
var addOneThenSquare = compose(square， addOne);
addOneThenSquare(2) //  9
```

这种编程风格能让我们尽量少定义形参，保持代码的简洁性，但部分场景可能无法使用，同时新手使用的时候很容易混淆，所以要看情况使用。

### Hindley-Milner 类型签名

由于现在基本用ts来解决类型问题了，这部分直接跳过，只需要他是这样一种注释写法就行

```
//  strLength :: String -> Number
var strLength = function(s){
  return s.length;
}

//  match :: Regex -> (String -> [String])
var match = curry(function(reg, s){
  return s.match(reg);
});
```

## 容器

容器是用于隔绝变量和外界的一个概念，只能通过容器暴露出的接口修改/访问内部数据，同时避免了频繁手动使用 new 运算符，同时最小化了上下文。

```
var Container = function (val) {
	this._value = val
}

Container.of = function (val) {
	return new Container(val)
}

Container.prototype.map = function (fn) {
	return Container.of(fn(this.__value))
}
```

但这种传统的容器无法隔绝null/undefined等值

这种时候就涉及一种新容器 ** Maybe **

```
var Maybe = function (val) {
	this._value = val
}

Maybe.of = function (val) {
	return new Maybe(val)
}
Maybe.prototype.isNothing = function(){
	return (typeof this._value !== 'number' && this._value)
}
Maybe.prototype.map = function (fn) {
	return this.isNothing ? Maybe.of(null) : Maybe.of(fn(this._value))
}
```
Maybe实例的map方法会先判断实例值是否为空再执行map的fn参数，这避免了不少错误