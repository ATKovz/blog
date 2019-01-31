
---
title: 算法--经典检索
tags: 基础
date: 2019-01-25
---

继上部分排序，现在是检索。

数据结构与算法JS描述一书中介绍的检索方式只有两种：

- 二分查找
- 顺序查找


## 顺序查找

顺序查找就是最常见的暴力法，对所有元素进行遍历查找，逐一对比：

```
	for(let i=0; i<arr.length; i++){
		if(arr[i] === target){
			return [i]
		}
	}
		return '没有'
	}
```
这种算法的速度其实没有indexOf高，但是可以利用这种算法进行最大值/最小值等条件查找，只需要加多一项判断
```
	let max = arr[0];
	for(let i=0; i<arr.length; i++){
		if(arr[i] > max){
			max = arr[i]
		}
	}
		return max;
	}
```
还可以把它封装一下：
```
	function findtarget(arr, target, type)
		let lens = arr.length;
		if(type === 'max'){
			let max = arr[0];
			for(let i=0; i<lens; i++){
				if(arr[i] > max){
					max = arr[i]
				}
			}
			return max;
		}
		if(type === 'min'){
			let min = arr[0];
			for(let i=0; i<lens; i++){
				if(arr[i] < min){
					min = arr [i];
				}
			}
			return min
		}
		return new Error('请输入类型!') 
	}
```

这样就封装成了一个简单的查找最大最小值的方法了。


二八原则在搜索领域也同样适用，但是有点不太一样：我们80%的搜索都是用在搜索20%的相同数据上，

这种情况下，可以考虑对搜索进行优化，怎么优化呢？

**可以把经常搜索到的数据移动到数组最前端**

这种算法类似于冒泡排序，即每次搜索后将目标和其前一位互换位置，

长期下来，搜索频率较高的部分就被移动到了最前端，再次进行检索时则能省下不少性能。

```
	function seqSearch(arr, target){
		for(let i=0; i<arr.length; i++){
			if(arr[i] === data){
				if(i>i*0.2){
					let temp = arr[i];
					arr[i] = arr[i-1];
					arr[i-1] = temp;
					return temp;
				}
				return i-1
			}
		}
		return '没有';
	}
```

同时保证只有目标对象不在数组前20%的时候才进行交换位置，也省下了不必要的交换。


## 二分查找

二分查找的算法简述就是：

>取中值，对比，目标大于中值则继续向右取中值，反之则向左，直到找到目标为止。


```
	function binSearch(arr, target){
		let left = 0,
			right = arr.length,
		while(left < right){
			let mid = (left+right)/2;
			if(target > arr[mid]){
				left = mid+1
			}else if(target < arr[mid]){
				right = mid-1
			}else{
				return mid
			}
		}
		return '没有';
	}
```

但是二分法最大的短板是需要先对数据进行排序，这点是无法避免的。

如果在原本已进行排序的数据中进行检索，那二分查找的性能将会遥遥碾压顺序查找。


关于排序参考上一篇 [算法--经典排序](http://www.teoblog.cn/post/basic-learning-algorithm-1_190123/)