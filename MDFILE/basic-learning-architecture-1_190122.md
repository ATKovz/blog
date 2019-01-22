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

 插入排序较前两者要复杂一点点，它是通过选中元素作为标杆对比，然后移动数组片段的形式来排序的。

当一个元素满足排序条件，则该元素向右移动一位，然后继续与前一位比较。

当遇到不满足条件的元素时，该作为标杆的就停在这一位。

实现如下：

	function insertionSort(arr){
		for(i=1;i<arr.length;i++){
			let temp = arr[i],
			j = i;
			while(j>0 && arr[j-1]>temp){
				arr[j] = arr [j-1];   //当第j-1位比标杆大时向右移动一位，同时减小下标，直到出现比标杆小或者下标为0。
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

		






