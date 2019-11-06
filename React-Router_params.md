---
title: React-Router4变换参数时页面不刷新的解决方案
tags: 踩坑
date: 2019-03-01
---

日常掏粪踩到的React-Router4坑

在路由传递参数时，通过Link改变参数虽然地址栏发生了变换但是页面并没有重新渲染，而需要手动刷新。

个人解决方案是使用 componentWillReceiveProps，

一般需要传递参数的场景需要发起异步请求，把请求也放一份到componentWillReceiveProps里就解决了。

但是这可能会导致发送2次请求，后续有更好的解决方案再补充了。
