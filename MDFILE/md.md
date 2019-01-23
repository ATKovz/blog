---
title:算法--经典排序
tags: 基础
date: 2019-01-22
---

排序和检索是计算机出现频率最高的操作——储存和查询中使用的非常多的。

本次学习的算法主要就是储存和查询。

<div id="cnblogs_post_body" class="blogpost-body"><p>先看看各系列排序的时间复杂度</p>
<table style="width: 880px;" border="0">
<tbody>
<tr>
<td style="border: 1px solid #000000;" rowspan="2"><strong>分类</strong></td>
<td rowspan="2"><strong>算法</strong></td>
<td colspan="3"><strong>时间复杂度</strong></td>
<td rowspan="2"><strong>空间复杂度 &nbsp; &nbsp; &nbsp;</strong></td>
<td rowspan="2"><strong>稳定性 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</strong></td>
<td rowspan="2"><strong>关联性 &nbsp; &nbsp; &nbsp;&nbsp;</strong></td>
</tr>
<tr>
<td><strong>最好 &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</strong></td>
<td><strong>最差 &nbsp; &nbsp; &nbsp;&nbsp;</strong></td>
<td><strong>平均 &nbsp; &nbsp; &nbsp;</strong></td>
</tr>
<tr>
<td rowspan="2">插入排序 &nbsp; &nbsp; &nbsp;&nbsp;</td>
<td>直接插入排序 &nbsp; &nbsp;&nbsp;</td>
<td>O(n)(优化后) &nbsp; &nbsp;</td>
<td>O(n<sup>2</sup>) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td>
<td>O(n<sup>2</sup>) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</td>
<td>O(1)</td>
<td>稳定</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>希尔排序</td>
<td>O(n)</td>
<td>O(n<sup>2</sup>)</td>
<td>不确定</td>
<td>O(1)</td>
<td>不稳定</td>
<td>基于直接插入排序 &nbsp; &nbsp;</td>
</tr>
<tr>
<td rowspan="2">选择排序</td>
<td>直接选择排序</td>
<td>O(n<sup>2</sup>)</td>
<td>O(n<sup>2</sup>)</td>
<td>O(n<sup>2</sup>)</td>
<td>O(1)</td>
<td>不稳定</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>堆排序</td>
<td>O(nlogn)</td>
<td>O(nlogn)</td>
<td>O(nlogn)</td>
<td>
<p>就地排序-O(1)&nbsp; &nbsp;</p>
</td>
<td>不稳定</td>
<td>应用了选择的理念</td>
</tr>
<tr>
<td rowspan="2">交换排序</td>
<td>冒泡排序</td>
<td>O(n)(优化后)</td>
<td>O(n<sup>2</sup>)</td>
<td>O(n<sup>2</sup>)</td>
<td>O(1)</td>
<td>稳定</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>快速排序</td>
<td>O(nlogn)</td>
<td>O(n<sup>2</sup>)</td>
<td>O(nlogn)</td>
<td>
<p>最好O(logn)，</p>
<p>最差O(n)&nbsp;</p>
</td>
<td>不稳定</td>
<td>基于冒泡排序</td>
</tr>
<tr>
<td colspan="2">归并排序</td>
<td>O(nlogn)</td>
<td>O(nlogn)</td>
<td>O(nlogn)</td>
<td>O(n)</td>
<td>稳定</td>
<td>&nbsp;</td>
</tr>
<tr>
<td colspan="2">基数排序</td>
<td>
<p>O(d*(n+r))</p>
<p>d是位数，r是基数，</p>
<p>n是比较的数目</p>
</td>
<td>O(d*(n+r))</td>
<td>O(d*(n+r))</td>
<td>O(n+r)</td>
<td>稳定</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table></div>



## 冒泡排序

最基本也是最低效的排序法，时间复杂度为O（n^2）

思路是逐对元素对比，对比之后根据排序条件判断，决定是否交换位置，

好比下面这样：

	[5, 4, 3, 7, 4, 5, 12, 3] //排序前
	[4, 3, 5, 4, 5, 7, 12, 3] //第一轮排序后

每一轮只能确保的有效排序只有一位，所以得执行n^2次。

 	function bubbleSort(arr){
	for(let i=0;i<arr.length-1;i++){
		for(let i=0;i<arr.length-1;i++){
			if(arr[i]<arr[i+1]){
				swap(arr, i, i+1);
			}
		}
	}
		console.log(arr)
		return arr;
	}

## 选择排序 
	

选择排序不同于冒泡排序每次都是和隔位对比

选择排序是逐位进行对比排序，所以复杂度也是O(N^2)，但是它更少进行位置交换，所以性能更优。

如果同样是上面那个例子，那在排序的第一轮就可以看到首位已经是最小值了。

选择排序的实现如下：

	function selectionSort(arr){
		for(let i = 0; i<arr.length; i++){
			let min = i;
			for(let j = i+1; j<arr.length; j++){
				if(arr[i]>arr[j]){
					min = j;
					swap(arr, i, min);
				}
			}
		}
		console.log(arr);
	}

## 插入排序

 插入排序较前两者要复杂一点点，它是通过选中元素作为标尺对比，然后移动数组片段的形式来排序的。

当一个元素满足排序条件，则该元素向右移动一位，然后继续与前一位比较。

当遇到不满足条件的元素时，该作为标尺的就停在这一位。

实现如下：

	function insertionSort(arr){
		for(i=1;i<arr.length;i++){
			let temp = arr[i],
			j = i;
			while(j>0 && arr[j-1]>temp){
				arr[j] = arr [j-1];   //当第j-1位比标尺大时向右移动一位，同时减小下标，直到出现比标尺小或者下标为0。
				j--;
			}
		}
		arr[j] = temp;
	}

插入排序的效率就比前面2者都高，因为交换的次数也很低，但插入效率的时间复杂度也是不固定的。

## 希尔排序 

希尔排序是基于插入排序的一种排序算法，不同的地方在于插入排序的插入间隔是固定的1，而希尔排序是可变的，先进行粗略的插入排序，再逐渐减少插入间隔，可以有效的提高排序效率

网上见到一个很不错的GIF就能说明希尔排序：



![希尔排序](http://www.teoblog.cn/postimg/sort_1.gif)


希尔排序的实现如下：

		var gaps = [5,3,1]
		function shellSort(arr, gaps){
			for(let i=0; i<gaps.length; i++){
				var temp = arr[gaps[i]];
				for(let j = gaps[i]; j<arr.length; j++){
					let k = j;
					while(arr[k-gaps[i]]>= temp && k-gaps[i] >=gaps[i]){
						arr[k] = arr[k-gaps[i]];
					}
				}
			}	
			return arr;
		}

		
## 快速排序

快速排序是十分流行的一种排序算法，因为在处理大型数据时性能很高，但是在小数据集的处理中性能表现普通。

我所知道的快速排序有两种，一种是我在本书中阅读到的，也是引起掘金热文  《面试官：阮一峰版的快速排序完全是错的》 的

### 单指针非原地排序

	var QuickSort = function(arr){
		if(arr.length === 0){
			return [];
		}
		var lt = [],
			gt = [],
			base = arr[0];
		for(let i=1; i<arr.length; i++){
			if(base>=arr[i]){
				lt.push(arr[i]);
			}else{
				gt.push(arr[i]);
			}
		}
		let result = QuickSort(lt).concat(base, QuickSort(gt));
		console.log(result);
		return result;
	};

这种算法的缺点是占用内存高，增加了空间复杂度，

但是从理解上更容易让人理解，很适合作为引入另外一种快速排序的前菜，也是非常巧妙的，所以不是很能理解喷子的点。

### 双指针快速排序 

这种算法则比较抽象一点，同样是通过立标尺和移动指针的方式，但是是双指针。

首先取数组左边第一个值为标尺，然后先移动右指针，当右指针遇见第一位比标尺小的值时停下，移动左指针，当左指针遇见第一个比标尺大的值时停下，交换二者的值，这样比标尺大的就被丢到了右边，小的就被丢到了左边。

当左指针下标等于右指针时，把标尺与现在的下标互换，因为此时要么左边没有比标尺大的值，要么右边没有比标尺小的值。

然后进行递归。直到右指针指向0为止。

**先移动右指针** 

这点很重要，如果先移动左指针，那当数据中只有最后一位大于标尺时则无法继续进行了。

<div style='overflow: hidden'>
	<div style="float: left; height:100px; width: 100px; border: 1px solid black; font-size: 40px; line-height: 100px; text-align: center">71</div>
	<div style="float: left; height:100px; width: 100px; border: 1px solid black; font-size: 40px; line-height: 100px; text-align: center">43</div>
	<div style="float: left; height:100px; width: 100px; border: 1px solid black; font-size: 40px; line-height: 100px; text-align: center">32</div>
	<div style="float: left; height:100px; width: 100px; border: 1px solid black; font-size: 40px; line-height: 100px; text-align: center">56</div>
	<div style="float: left; height:100px; width: 100px; border: 1px solid black; font-size: 40px; line-height: 100px; text-align: center">65</div>
	<div style="float: left; height:100px; width: 100px; border: 1px solid black; font-size: 40px; line-height: 100px; text-align: center">70</div>
	<div style="float: left; height:100px; width: 100px; border: 1px solid black; font-size: 40px; line-height: 100px; text-align: center">71</div>

</div>

例如这个例子，这个例子中如果先移动左指针，那左指针会直接移动到最后一位，然后造成死循环。

下面是算法：

	function quickSort(arr){
		if (arr.length<2) { return arr; }
		// 定义左指针
		var left=0;
		// 定义右指针
		var right=arr.length-1;
		//排序开始
		while(left<right){
			// 寻找右边比arr[0]小的数的下标
			while(arr[right]>=arr[0] && left<right){
				right=right-1;
			}
			// 寻找左边比arr[0]大的数的下标
			while(arr[left]<=arr[0] && left<right){
				left++;
			}
			//当左边指针与右边指针相遇后，交换arr[0]与当前两个指针所在的元素
			if (right==left) {
				let mid=arr[right];
				arr[right]=arr[0];
				arr[0]=mid;
				break;
			}
			// 当左指针小于右指针的位置，交换两个指针当前位置的元素
			let tem=arr[right];
			arr[right]=arr[left];
			arr[left]=tem;
		}
		//递归实现
		return quickSort(arr.slice(0, left)).concat(arr.slice(left,right+1)).concat(arr.slice(right+1)));
	}


## 归并排序

归并排序是先把数组拆成若干个小数组，分别排序后再进行合並的一种算法，从描述上就可以看出，这和上面的单指针快速排序有同样的缺陷，就是空间复杂度会随着数据复杂度提升而提升。




