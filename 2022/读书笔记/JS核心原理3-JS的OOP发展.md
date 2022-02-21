
## Javascript 语言发展

1. 最开始的 JS 面向对象

这段会在原理后说明这句表达式的结果
```
1 in 1..constructor // maybe true or false
```

一开始的 JS OOP 就是我们熟悉的 ES6 之前的构造函数类语法

也就是:

```
function Item (name, props) {
  this.name = name
  this.props = props
}
const desk = new Item('desk', { height: 90 })
```

'new' 构造函数的过程实现了一个从无到有的过程，实现了一个多个属性的集合

也就是JS里对象的概念（In ECMAScript, an object is a collection of zero or more properties.）

同时这个阶段，JS确定了几个概念

- 全局环境和全局变量

- 函数闭包和对象闭包

全局环境和全局变量的设计实现出来的效果就是，未声明的变量赋值会隐性创建一个全局变量，同时全局变量会被挂到 global

而函数闭包和对象闭包实现出来的环境我们称之为 域 (Scope)

对象闭包的实现可以理解成往 一个 Scope 上挂入另外一个Scope，也就是类似下面的操作

```
// some module
x.scope = {
  parent: x.scope,
  current: newScope
}
try {
  // ...do sth
} finally {
  // 移除掉前面创建的 scope
  x.scope = x.parent.scope
}
```

这个 Scope 现在在动态环境被我们叫做 Context (上下文)

在静态环境被我们叫做作用域(Scope)，但本质上 Context 和 Scope 是一样的东西

早期的对象有个对象没设计清楚，就是Object 的 propName 的可见性(enumerable), 也就是能否被 for in 和 Object.keys 枚举

举个例子，constructor 这属性在很多 JS 引擎里实现就不太一样

后面 ECMAScript 才规定了对象的几个属性(ES5):

- writable

- enumerable

- configurable

在这里 [[constructor]] 才被默认打上了 enumerable: false

JS 的继承只是从父类把所有属性都 用上面的属性定义了一圈，和父类是独立的，也就是原型继承，注意不是原型链继承

继承来的属性行为由描述符决定

- 数据描述符(obj.value)

- 存取描述符(getter/setter)

除此外还有一个**包装类型**

也就是通过 ValueOf 和 toString 来取值，除了 Undefined 外其他所有对象都有自己的包装类(如 str/number/boolean/symbol)

插入一个概念 **类型装箱**, 也就是包装类型的操作

JS的类型转换 首先会尝试调用 值的 Symbol.toPrimitive 属性，如果拿不到就会根据转换类型尝试不同的顺序调用 valueOf/toString

例子：
```
[] + '' 
// 先调用 [][Symbol.toPrimitive], 这里没有定义，就会调用 [].toString()
```

### 基础类型的解析

标识符通常被叫做变量名

字面量通常被叫做值

标识符通常是一个引用，而字面量是一个值

JS在处理标志服调用的时候通常都会建立一个引用来计算操作数，而字面量可以直接处理

如下面这例子

```
x = 1

// 数字的 1.xxx 是有语义的，所以得用1.. 或者(1). 来调用
1..constructor
x.constructor // 先计算 x 的引用，然后再去调用 .constructor
```

实际上 1..constructor 是等同于 Object(1).constructor

Object(基础类型) 时 会自动去找他的基础构造函数进行装箱操作

也就是 Object(1).constructor 会得到 Number

但是 1 instanceof Number 是 false,

也就是 1 和 1..constructor 这两个 1 是不一样的

这里复习下原型链知识，实例.constructor 不是自有属性，所以继承自 Constructor.prototype.constructor

而 Constructor.prototype.constructor 基本 等于 Constructor

### 回到最开始的例子 

```
1 in 1..constructor 

// 经过上面的解释我们可以知道这个等效于 1 in Object(1).constructor 或者 Number(1).constructor
// 也就自然可以通过 Number[1] = 'anything' 来得到 true 了
```

2. 加入原型链后的 OOP

Js 1.1 版本，JS多了个原型链机制

也就是可以通过以下操作实现继承

```
Subclass.prototype = new ParentClass()
const subInstance = new SubClass()
subInstance instanceof ParentClass // true
```

同时也伴随着 instanceof 这个操作符出现

instanceof 会沿着 __proto__ 来查找 Consturctor.prototype,

在上面的例子就是

```
subInstance.__proto__ // SubClass.prototype 也就是 new ParentClass
subInstance.__proto__ === Parent.prototype // new ParentClass() === Parent.prototype ? false
subInstance.__proto__ === Parent.prototype // new ParentClass().__proto__ === Parent.prototype ? true
```

prototype 有一个特别的性质，就是可编辑(writable)不可删除, 同时当 prototype 被设置为对象以外的值时，子类的实例的__proto__, 将会是Object.prototype

3. ES6 后的OOP

ES6 引进了 class, 从此对象被分为3种

1. class 仅可用作 new 

2. method 仅可用() 调用

3. 普通 function 可以实现1和2


1和3都还比较常见，这里解释下2

```
const obj = { foo() {this.name = '123'} }

new obj.foo() // Uncaught TypeError: obj.foo is not a constructor
```

这是因为 ES6 后，对象内的方法有几个新特性

- 具有一个名为“主对象[[HomeObject]]”的内部槽

- 没有名为“构造器[[Construct]]”的内部槽

- 没有名为“prototype”的属性。

后面的2个直接剥夺了对象当作类的门票

而 class 就可以简单的通过 extends 来实现继承，es5 的 Function Date 无法继承他的原生特性，但是 es6 可以

（因为函数本质上是有个 [[call]] 内部属性，es5的继承是通过手动抄写属性，没法继承该属性）

```
MyFunction = function() {
    Function.call(this)
};

MyFunction.prototype = new Function;
f = new MyFunction()

f() 
// TypeError: f is not a function

class F extends Function {}

f = new F()
f() // ok
```
因为 **es6 里的this对象是由父类创建** 或者由子类的 constructor 返回一个对象来实现的（人为干涉 new）

ES5 的类构造函数返回一个 Object 外的数据会被忽略，而返回 Object 会被当作this对象

而ES6 class 语法，如果是派生类， constructor 返回 Object 外的数据会直接报错

同时 ES6 如果声明了构造函数，则必须通过super来调用SuperClass，没有声明则会自动隐式调用

3. ES6 Super

Super 出现之前，由于 JS都是通过原型继承的，一旦子类重写(overwrite)父类同名方法后，就再也没法引用到父类的方法了

Super 出现解决了这个问题

在静态声明(static)的方法中 super 指向 superClass, 而一般声明super指向 superClass.prototype,

同时，对象中也是可以调用super的，这时 super 指向对象本身的prototype, 如:

```
let test = {
    a() {
        this.name = super.name;
    }
}
Object.setPrototypeOf(test, {name: 'test proto'})

class B extends A {
    constructor() {
        super();
        this.a = test.a;
        this.a();
        console.log(this.name); // test proto
    }
}
```

需要注意的是，class 的属性会挂在构造函数注到在this上, 而方法会挂在 superClass.prototype 上

同时 **super.xxx() 的this指向会指向 当前环境。。** 而不是像其他this指向一样谁调用就指向谁

其实就是 Super 是通过当前方法的 [[HomeObject]] 决定的

super 实际上是在通过原型链查找父一级的对象，而与它是不是类继承无关。


除此之外，Super 还隐性做了一件事情！就是创建 this 对象

例子:

```

class MyClass {
  constructor() { return new Date };
}

class MyClassEx extends MyClass {
  constructor() { super() }; // or default
  foo() {
    console.log('check only');
  }
}

var x = new MyClassEx;
console.log(x instanceof MyClassEx); // false
console.log('foo' in x); // false
```

这个例子成功的扰乱了 MyClassEx 实例的原型，因为正常的父类是类似这样操作的：

```
class Parent {
  constructor() {
    // new.target 在子类继承了本类后实例化时指向子类
    // new.target是用来描述构造器本身的属性，指代是当前这个构造器函数this， 它不属于实例对象的一部分
    return Object.create(new.target.prototype)
  };
}
```

至此，Super 的内容就被扒光了。

