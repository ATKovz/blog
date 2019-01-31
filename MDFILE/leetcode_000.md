
---
title: LeetCode掏粪志 --- 删除链表中的节点
date: 2019-1-11 13:45:49
tags: LeetCode 算法
---

刷到了一道比较有意思的数据结构题,下面是题目:

### 删除链表中的节点

> 请编写一个函数，使其可以删除某个链表中给定的（非末尾）节点，你将只被给定要求被删除的节点。
> 
> 现有一个链表 -- head = [4,5,1,9]，它可以表示为:
> 
>     4 -5 -1 -9
> 示例 1:
> 
> 输入: head = [4,5,1,9], node = 5
> 输出: [4,1,9]
> 解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -1 -9.
> 示例 2:
> 
> 输入: head = [4,5,1,9], node = 1
> 输出: [4,5,9]
> 解释: 给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -5 -9.

	/**
	 * Definition for singly-linked list.
	 * function ListNode(val) {
	 *     this.val = val;
	 *     this.next = null;
	 * }
	 */
	/**
	 * @param {ListNode} node
	 * @return {void} Do not return anything, modify node in-place instead.
	 */
	var deleteNode = function(node) {
	
	};

看到这题目第一个瞬间有点懵，head都不给一个完全没法访问该节点之前的部分。

过了几分钟反应过来了，直接将当前节点赋值为下一节点，然后直接指向下下个节点就行了。

这题目有意思的点就在于，它不是通过常规的直接改变上一节点的指向，反而是通过复制下一节点，然后删除下一节点来变相的删除当前节点，算是比较有意思的一题。
	
	var deleteNode = function(node) {
	    node.val = node.next.val;
	    node.next = node.next.next
	};