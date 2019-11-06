title: React Hooks API学习笔记
tags:
  - 学轮子
  - JavaScript
  - hook
categories: []
date: 2019-01-14 10:33:00
---

> 目前Hooks还处于提案阶段，要使用得自行更新16.7.0-alpha.0以上的版本。

## 基础API

### useState:

声明一个长度为2的数组，
用于调用state和setState方法, 使用方法如下：
```
function DemoFn(){

	const [demoState, setdemoState] = useState("我是一个demo");
	
	return (
		<div onClick={()=>{setdemoState("我改变了demo");}}>
			点击改变state
		</div>
	)
	
	
}
```
	

useState可重复调用，声明多个state变量。

useState的状态完全靠顺序决定，所以你也完全可以以这种形式：
```
const [free, namespace] = useState("我是一个乱来的demo") 
```
但是这样会让你的代码变得一团糟，所以最好还是参照 [xxx, setXxx] 的格式来命名。

-------
### useEffect



effect可以理解成简化了生命周期函数的一个钩子函数，使用方法如下：
```
useEffect(didUpdate);
```

实例： 
```
useEffect(()=>{
	document.title = "我在组件渲染后更新了页面title";
	return ()=>{
		document.title = "然后通过return一个函数来清除之前的操作"
	}
})
```
当然每次渲染组件都执行effect会带来额外的性能损耗，所以useEffect提供了第二个参数 —— 监听值
```
useEffect(
	()=>{
		console.log("调用effect");
		return () => {
			console.log("清除effect")
		}
	},[demoState]
)
```
当传入第二个参数的时候，只有第二个参数中的值发生变化的时候才会调用Effect，这就避免了很多无谓的渲染。

------

### useContext

顾名思义，这是一个调用函数上下文，方便组件间进行数据交换的api，使用方法：
```
const context = useContext(demoContext)；
```
	
这个钩子函数会接受一个由 React.createContext 返回的值，值由离本层最近的Provider传递。

当Provider更新时，useContext接受的值也会随之更新。

---


## 进阶Hooks

### use Reducer

#### 基本用法

用法和redux一致，首先是引入reducer和dispatch，然后声明一个对象用于装载reducer初始值，然后就是标准的dispatch-reducer写法了，主要就是中间直接省略了store。

实例用法： 

```
const [state, dispatch] = useReducer(reducer, initialState);
const initialState = {count: 0}; //reducer初始值

//reducer
function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
  }
}


function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialState);

//组件里引入reducer，initialState和dispatch

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'reset'})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
}
```
#### 惰性初始化

useReducer的第三个参数（可选设置），当函数传入了外部参数的时候可用，用于记录初始值，下面是实例：
```
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return {count: action.payload};
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    {type: 'reset', payload: initialCount},
  );

  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
    </>
  );
}
```
ruducer里加入了一个“reset”， 当传入的type值为“reset”时，将reducer里的state数据设置成最初调用useReducer时传入的第三个参数的值。


### useCallback 和useMemo

这两个都是通过记忆函数结果的方式来节省计算提高性能。 

**useCallback**

```
const memoizedCallback = useCallback(
  () => {
	doSomething(a, b);
  },
  [a, b],
);
```

**useMemo**

```
const memoizedValue = useMemo(
() => 
	computeExpensiveValue(a, b), [a, b]
);
```
### useRef

顾名思义，返回一个ref。
用法：
```
const refContainer = useRef(initialValue);
```
实例：
```
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```
这个例子获取了input的真实DOM节点 

### useImperativeMethods

名字特别长的一个钩子，其实主要作用简单说，就是让父组件能调用子组件的实例。

这个钩子有3个参数
 ```
useImperativeMethods(ref, createInstance, [inputs]);
```
第一个参数是组件的ref，第二个是要创建的实例对象属性，第三个是DOM。

写了个大概的用法：
```
var Binding = function(props, ref){
	const inputs = useRef();
	const inputsa = useRef();
	const inputsb = useRef();
	const butt = useRef();
	useImperativeMethods(ref, () => ({
		foo : () => {
			inputsb.current.focus();
		}
	}));
	return (
		<div ref={butt}>
			<input ref={inputs} />
			<input ref={inputsa} />
			<input ref={inputsb} />
		</div>
	)
}

const Test = () => {
	Binding = forwardRef(Binding);
	const bar = useRef();
	return (
		<div>
			<Binding ref={bar}></Binding>
			<button onClick={() =>{bar.current.foo()}}>
				11
			</button>
		</div>
	)
}
```

上面这个例子里就创建了一个使用了useImperativeMethods的组件Binding，并在另外一个组件里调用了Binding。

此时就可以通过触发binding里的方法，来访问Binding里的子元素了。

有一点需要注意，就是useImperativeMethods必须要和forwardRef配套使用。

### useLayoutEffect

用法基本和useEffect一致，

但是明确对应了
componentDidMount和componentDidUpdate这二个生命周期

