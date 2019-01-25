
---
title: 经典算法——高级算法
tags: 基础
date: 2019-01-25
---

> 本文主要内容为动态规划和贪心算法


## 动态规划 

递归解决问题虽然方便，但过度依赖递归会导致程序效率低下，所以就需要某些代替递归的手段，这就是动态规划。

### demo0: 斐波那契数列 

以斐波那契数列为例，传统用递归解决问题的方法是这样的：

	function fib(n){
		if(n<2){
			return n;
		}else{
			return fib(n-1) + fib(n-2);
		}
	}

递归是从问题的表面解决到问题的根源，这就相当于把一个问题拆分成千万个问题，就像细胞分裂一样。

而动态规划是从问题的本质去解决问题，相当于不断合并问题。

同样是斐波那契数列，动态规划的解决方案如下：

	function fib(n){
		let arr = [0];
		for(let i=0; i<n; i++){
			if(n<2){
				arr[i] = 1;
			}else{
				arr[i] = arr[i-2] + arr[i-1]	
			}
		}
		return arr[n-1]
	}

### demo1: 寻找最长公共字符串

输入两个字符串，要求输出最长公共字符串

eg: 输入 'invisibleFate', 'visiblity', 输出visibl

思路： 对2个字符串进行遍历，若字符串A的第N位和B字符串的第Y位相等，则在新的二维数组arr[n][b]处进行标记，若中断，则标为0。

标记过程需要考虑的有几个点，一就是标记依据，由于需要判断的是连续字符串，所以以前一位为参考值累计更为可行，即：

	if(word1[i] === word2[j]){
		arr[i+1][j+1] = arr[i][j] + 1;
	}else{
		arr[i+1][j+1] = 0;
	}

由于使用错位计数，所以累计数组需要整体向后移一位，首位用0初始化。

下面是实现：
	
		function compare(word1, word2){
			let arr = new Array(word1.length),
				max = 0,
				index = 0; 
			//index用于登记坐标以便检索字符串， max用于记录最大长度
			for(let i =0;i<=word1.length;i++){
				arr[i] = new Array(word2.length);
				for(let j = 0; j<=word2.length;j++){
					arr[i][j] = 0;
				}
			}
			for(let i =0;i<word1.length;i++){
				for(let j = 0; j<word2.length;j++){
					if(word1[i] == word2[j]){
						arr[i+1][j+1] = arr[i][j] +1;
						if(max < arr[i+1][j+1]){
							max = arr[i+1][j+1];
							index = i+1;
						}
					}else{
						arr[i+1][j+1] = 0;
					}
				}
			}
			let str = '';
			for(let i = index-max; i< index;i++){
				str += word1[i];
			}
			console.log(max, str, index);
			return max;
	}




### demo2: 背包问题


## 贪心算法


### demo0: 找零问题

### demo1: 背包问题（贪心算法）


