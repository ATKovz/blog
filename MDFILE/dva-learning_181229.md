---
title: DvaJS的学习笔记
date: 2018-12-27 15:33:49
tags: 学轮子
---

#[Dva](https://dvajs.com/) 

今天开始<s>OW里的大屁股萌妹</s> 轻量级的应用框架D.va的学习


Dva是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。

###创建一个Dva应用的最简流程：


    const app = dva(); //创建dva应用
    
    const Bar = connect( ({ demo }) => ({ demo }))(function(){
    		return (
    			<div>Hello{demo.dva}</div>
    		(
    })
    
    app.model({
    	namespace: 'demo',  //model名，很重要的一个参数
    	state: {
    		demoData: 'dva'
    	},  //等同于react里的state
    	reducers: {}, //等同于redux里的reducer
    	effects: {}, //用于处理复杂计算
    });
    
    app.router( () => <Bar /> ) //将Dva应用app绑定到组件Bar上。
    
    app.start("#root") //启动应用


这样就完成了我们的第一个dva应用。

##umi项目中使用dva



    + src
      + models
    - g.js
      + pages
    + a
      + models
    - a.js
    - b.js
    + ss
      - s.js
      - page.js
    + c
      - model.js
      + d
    + models
      - d.js
    - page.js
      - page.js
UMI项目中，model 分两类，
一是全局 model，全局 model 存于 /src/models/ 目录，所有页面都可引用；
二是页面 model，页面 model 不能被其他页面所引用。

规则如下：

src/models/\*\*/\*.js 为 global model
src/pages/\*\*/models/\*\*/\*.js 为 page model
model从里层往外查找

约定 model.js 为单文件 model，解决只有一个 model 时不需要建 models 目录的问题，有 model.js 则不去找 models/**/*.js

具体的可以参考 [UMI的官方文档](https://umijs.org/zh/guide/with-dva.html#%E4%BD%BF%E7%94%A8)


    //model.js
	export default {
    	namespace: 'demo',  
    	state: {
    		foo: 'dva',
			bar: 'learning'
    	},  
    	reducers: {}, 
    	effects: {}, 
    }



	//index.js
    import { connect } from 'dva'
    const Bar = function(props){
    	return <div>{props.demo.foo}用connect获得model的数据和dispatch</div>
    }
    
    const mapState = ({demo}) => {
    	const { foo, bar } = demo
		return {
			foo,
			bar
		}
    }
    
    export default connect(mapState)(Bar);


这用法和React-Redux中的connect完全一致。



##reducers 和 effects

这两个其实就等同于Redux中的reducer，以及使用了Redux-saga的actionCreator。

其中reducer还有点差异， effects可以说是照搬saga了。

一般情况reducer的用法都是这样：

    //actionCreator.js
    const action = {
    	type: 'actionType',
    	value
    }
    dispatch(action)
    
    //reducer.js 
    export const reducer = (state = defaultState, action){
    	switch(action.type){
    		case 'typeX':
    			{
    				...
    				return newState
    			}
    		default:
    			return state;
    	}
    }

而Dva里的ruducer对操作进行了简化，首先是把action必要的type进行了整合简化，将大部分数据操作集中到了effects

###Dva中的reducer操作：

    // model.js
    export default {
    	namespace: 'demo',  
    	state: {
    		demoData: 'Dva'
    	},  
    	reducers: {
    			add (state, { payload }){
    				return {...state, ...payload}
    			}
    		}, 
    	effects: {
    			* create (action, { select, put, call }){
    				yield put({ type:'add', { ...payload } })
    			}
    		}, 
    }

	//component.js
    const Bar = function(props){
    	return 
			<div onClick={() => { dispatch({type: 'demo/create', payload}) }>helloWorld</div>
    }
	

    
可以看出effects的API和saga是一样的，

而type则被简化成了 namespace/method 的形式。

关于Redux-saga API的用法可以参考文档 [API 参考](https://redux-saga-in-chinese.js.org/docs/api/index.html)

saga/effects中使用的ES6 Generator 可以参考阮一峰老师的 [Generator 函数 ](http://es6.ruanyifeng.com/#docs/generator)