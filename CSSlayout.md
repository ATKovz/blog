---
title: 日常踩坑（CSS）——父元素自适应，子元素自动填充    
date: 2018-12-25 10:29:02
tags: 踩坑
---



![5c21c6fc2306f](https://i.loli.net/2018/12/25/5c21c6fc2306f.png)

现在是这样一种场景，有父元素盒子1，子元素盒子2和盒子3，下面称为ABC

 A（父元素）高度要由B撑开，而C要根据 A的高度自适应，flex布局或者传统浮动布局中，这种场景应该都很常见，这次也算第一次踩坑。



这种情况下A未设置高度，通过清除浮动的方式来获取B的高度以达成自适应，这使得传统的适应方法都没法生效。

但是这种情况下C盒子就无法通过 height：100%  来自适应父元素的高度了，这也和CSS的坑逼算法有点关系。

那么这种情况下应该怎么解决呢？



通过父元素相对定位，子元素绝对定位来处理，这样子元素就可以获取到父元素的高度了。

这种方法的缺点是原本的布局会被打乱，所以B盒子得加上等同于C宽度的margin-left了。

虽然姿势有点不优雅，也算是解决了这个疑难杂症了。




