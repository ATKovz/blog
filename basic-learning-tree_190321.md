title: 写给自己看的数据结构——二叉树
tags:
  - 基础
  - 数据结构
categories:
  - 数据结构
author: ''
date: 2019-03-21 00:00:00
---

> 数据结构——搜索二叉树，拖了很久了，
其他的结构比较简单有点不想写，以后要是想不起来其他的需要复习时，看到这句话就可以抽自己耳光了。

隔了2个月补上树的部分，树也是非常常见的数据结构，这里主要说二叉搜索树。

首先是树的结构, 树本质就是由一个根节点扩展开的，每个节点有左右两个分支。

二叉搜索树一般是左分支比根节点小，右分支比根节点大,如下图：

这种结构在搜索特定的值时能比较节约时间，但是删除时就比较不理想了。

接下来是树的实现，

构建一棵二叉树需要有基本的树节点，以及实现增删查功能。

增加一个节点和查找都比较简单，新增节点由根节点开始，小于根则往左，大于则往右，

查找则分为3种，先序中序和后序，主要就是看输出和递归的位置。输出在前为先序，在中为中序，后为后序。

![](https://img-blog.csdn.net/20180227094925701?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvc3NjY19sZWFybmluZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)


删除则是最复杂的操作，如果要删除的节点无分支或者只有一个分支，则直接将节点删除，将节点的父节点指向该节点的子节点。

如果有2个节点，那就比较复杂了，根据树的特性可以知道一个节点右边的值一定大于该节点，左边一定小于该节点。

所以待删除节点的右分支最小值一定小于右节点的所有值，大于该节点。

所以可以选择用左分支的最大值或者右分支的最小值，这里使用的是右分支的最小值。

接下来就是具体实现：

```
// 先构建一棵树需要的节点类
const Node = function(value){
	this.left = null;
	this.right = null;
	this.value = value
}
// 然后是树类，含括增删查改
const Tree = function(){
	// 根节点
	this.root = null;
	//插入兼查重操作
	var insertNode = function(value) {
		if(!this.root){
			this.root = new Node(value);
			console.log(this.root);
			return this.root;
		}
		let currentNode = this.root;
		while(currentNode.value){
			if(value === currentNode.value){
				console.log('有了。');
				return false;
			}
			if(value < currentNode.value){
				if(currentNode.left){
					currentNode = currentNode.left;
				}else{
					currentNode.left = new Node(value);
					console.log(currentNode.left);
					return currentNode.left;
				}
			}
			if(value > currentNode.value){
				if(currentNode.right){
					currentNode = currentNode.right;
				}else{
					currentNode.right = new Node(value)
					console.log(currentNode.right);
					return currentNode.right;
				}
			}
		}
	};
	// 指定根节点的先序遍历
	var findAll = function(currentNode) {
		if(currentNode){
			console.log(currentNode);
			findAll(currentNode.left);
			findAll(currentNode.right);
		}else{
			console.log('发现空节点');
		}
	}
	// 最小值
	var findSmallest = function(currentNode = this.root){
		if(currentNode.left){
			return findSmallest(currentNode.left);
		}else{
			console.log(currentNode);
			return currentNode;
		}
	}	
	// 最大值
	var findBiggest = function(currentNode){
		console.log(currentNode, 'start')
		if(currentNode.right){
			findBiggest(currentNode.right);
		}else{
			console.log(currentNode)
			return currentNode;
		}
	}
	// 删除方法，不暴露给外部
	var removeNode = function(node, value){
		if(!node){
			return null;
		}
		if(node.value < value){
			node.right = removeNode(node.right);
			return node;
		}
		if(node.value > value){
			node.left = removeNode(node.left);
			return node;
		}
		if(node.value === value){
			if(!node.left && !node.right){
				console.log('remove')
				return null;
			}else if(!node.left){
				console.log('remove')
				return node.right;
			}else	if(!node.right){
				console.log('remove')
				return node.left;
			}else{
				const temp = findSmallest(node.right);
				console.log(temp, 'tmp');
				removeNode(node.right, temp.value);
				return temp.value;
			}
		}
	}
	// 删除节点
	var remove = function(value){
		this.root = removeNode(this.root, value);
		console.log('removeOver')
	}
	return {
		insertNode,
		findAll,
		findSmallest,
		findBiggest,
		remove
	}
}
```

