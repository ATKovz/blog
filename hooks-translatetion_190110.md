
---
title: React Hooks——概述部分的翻译
date: 2019-1-10 13:33:49
tags: 学轮子
---

菜鸡英文翻给自己看，其他的写学习笔记了 ![](http://www.teoblog.cn/myimgstore_______/1.jpg)

## HOOK概述



这一部分节奏可能会比较快，如果你看着脑壳痛，可以看看下面这种区块 ↓：  以阅读更详细的文档。

	
> 阅读 [Motivation](https://react.docschina.org/docs/hooks-intro.html#motivation) 了解为什么在React中引入Hooks。

↑每个部分都会有这样的一个模块，连向每部分详细的说明文档。

## State钩子（State Hook）

下面这个例子渲染了一个计数器，当你按下Button的时候数字会增加。

```
import { useState } from 'react';
function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
};
```

上面的这个**useState**就是一个钩子（我们会在恰当的时候解释这是什么意思），我们会在函数组件内部调用useState。React会在重新渲染（rerender）之前保存这个state。


useState会成对返回，一个现成（当下声明）的State和一个用于更新state的函数，你可以在事件处理或者其他场景中使用。 这看起来和 class里使用的this.setState很像，但是它不会合并新的state和旧的state，（ 我们会在 [Using the State Hook](https://react.docschina.org/docs/hooks-state.html) 里通过一个例子来比较二者 ）


useState的唯一一个参数是在调用他的时候声明的，在上面这例子里，参数就是 0 ， 因为我们的计数器是从0开始的。


和this.state不太一样的是，这里的state不一定要是个对象（也可以是个对象）。 state的参数只在第一次渲染的时候被使用（初始参数）。

## 声明多个state

你可以在一个组件里使用多个State Hooks：
```
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}
```
我们调用数组解构语法来对state变量命名，这些命名不是useState API的一部分，如果多次调用useState，那么每次渲染时都会按照同样的顺序。

>  Instead, React assumes that if you call useState many times, you do it in the same order during every render. `           



我们回头看看它的工作原理和为什么说Hook以后会很常用。

## 什么是Hook？

Hooks（钩子）是一个让你在函数组件里能“ 勾进 ” React里的state和生命周期 的函数。 Hooks不用在class里执行 —— 就是为了在不用class的场景里更便利的使用React.
(不建议为了用hooks花大量时间重写现有的组件，但是可以考虑在新的组件里用上Hooks)

React提供了少量内置Hooks，好比useState。 你也可以创建自己的 Hooks用于在不同的组件中复用state，我们先看看内置Hooks。


> 
> 阅读 [Using the State Hook](https://react.docschina.org/docs/hooks-state.html)
> 学习更详细的State Hook用法
> 

## Effect钩子（Effect Hook）

过去，你可能在React组件里进行 数据获取（fetch），数据监听（subscribe）或者手动改变DOM等操作，我们管这叫“副作用”(side effects)，因为他们会影响其他的组件，而且在渲染过程中不能被执行。

**useEffect** 这个Hooks给函数组件带来了执行 side effects 的能力。

它和React classes里的 

- componentDidMount
- componentDidUpdate
- componentWillUnmount


有着同样的目的，但它整合成了一个API（在 [Using the Effect Hook](https://react.docschina.org/docs/hooks-effect.html) 里，我们会通过一些例子来对比useEffect和这些生命周期函数）

举个例子， 下面这个组件在React更新DOM后设置了页面的标题

import { useState, useEffect } from 'react';
```
function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
// Update the document title using the browser API
document.title = `You clicked ${count} times`;
  });

  return (
<div>
  <p>You clicked {count} times</p>
  <button onClick={() => setCount(count + 1)}>
Click me
  </button>
</div>
  );
}
```
当你调用useEffect的时候，你就告诉了React，在对DOM改变之后执行effect函数。 

Effects在组件里被声明，所以它可以使用组件的state和props。

默认情况下，React在每次渲染(render)后都会调用——包括第一次渲染
> ( [Using the Effect Hook](https://react.docschina.org/docs/hooks-effect.html)，阅读更多effect和生命周期的对比 )


Effects可以返回一个函数来决定怎么“清理”它们，举个例子，下面这个组件用了一个effect来监听好友的在线状态，同时也通过取消监听来“清理”：
```
import { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

在这个例子里，当组件被移除（unmounts）时，React会取消监听ChatAPI，在下次渲染前effect会重新执行，如果我们传递给ChatAPI的props.friend.id 没有改变（ React跳过重订阅的方法 [tell React to skip re-subscribing](https://react.docschina.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects) ）

和 useState一样，你可以在一个组件里使用多个effect：
```
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  // ...
```
Hooks允许通过连贯的方式来组织side effects事件，如发布监听和注销监听，而不是以生命周期那种强制分割成几部分的方式。


## Hooks的规则（Rules of Hooks）

Hooks是JavaScript函数，但是Hooks多了两个附加规则：


- 只能在顶层解构调用Hooks，不要在嵌套的函数，条件语句或者在循环中调用Hooks。

- 只能在React组件里调用Hooks，不要在常规的JavaScript函数 里调用Hooks（ 除此之外还有一个可以调用Hooks的场景 —— 在你的自定义Hooks中，我们会在恰当的时机再提到它 ）

这里提供一个语法检测插件[ linter plugin ](https://www.npmjs.com/package/eslint-plugin-react-hooks) 来自动检测这些规则。 虽然这些规则一开始看起来会很蛋疼，但它的确能够让Hooks更好地工作。

> [Rules of Hooks](https://react.docschina.org/docs/hooks-rules.html) 详细的Hooks规范。

## 自定义Hooks

某些场景中，我们会想跨组件复用一些逻辑，通常情况下我们使用高阶组件或者渲染组件。

组定义Hooks也能做到这些，而且不用增加新的分支组件。

先前我们介绍了一个FriendStatus 组件，它调用了useState和useEffect来监听好友在线状态，现在我们将在其他的组件里复用这个逻辑。

 
首先，我们把这部分逻辑提取出来，命名为useFriendStatus ：

```
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

```
这个函数需要一个 friendID作为参数，然后返回好友的在线状态。

现在我们就可以在各种组件里使用它了：


```
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

----------


	function FriendListItem(props) {
	const isOnline = useFriendStatus(props.friend.id);
	
	return (
	<li style={{ color: isOnline ? 'green' : 'black' }}>
	  {props.friend.name}
	</li>
	);
	}

这些组件的状态都是相互独立的，Hooks是复用逻辑的方法，而不是逻辑本身。 实际上，Hooks的每次调用都是完全独立的状态 —— 这意味着你可以在同一个组件里重复使用。

自定义Hooks更像一种约定，而不是特性，如果函数的命名以“use” 开头，同时调用了其他Hooks，我们就将它视作自定义Hooks。

**useSomething** 这种格式的命名约定也是检测插件（linter plugin）在使用了Hooks的项目里发现BUG的一个依赖。

你可以尽情的使用自定义Hooks，像在绑定，动画，声明，监听，定时器或者其他我们没想到的场景。

> [Building Your Own Hooks](https://react.docschina.org/docs/hooks-custom.html) ，学习自定义Hooks的使用姿势


## 其他Hooks

还有一些比较实用且常用的内置Hooks，如 **useContext**，能轻松的监听React上下文。 
```
function Example() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
  // ...
}
```
**useReducer**，管理较复杂的组件状态
```
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer);
  // ...
```
更多钩子请参考 [Hooks API]([https://react.docschina.org/docs/hooks-reference.html](https://react.docschina.org/docs/hooks-reference.html)

