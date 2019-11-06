---
title: 解决跨域请求session丢失问题
tags: 踩坑
date: 2019-02-27
---

由于发起跨域请求时，每次访问都会创建一个带着不同secret的session，所以导致了跨域请求时多次访问信息会丢失的问题。

在做登录认证模块时踩到了这坑，留个记录

由于服务端无法判定是哪一个session，所以需要带上cookies验证

```
fetch('http://localhost:7777/user/login',{
	method: "POST",
	body: JSON.stringify(mes),
	credentials: 'include'	
})
```

同时服务端的响应报文要加上Access-Control-Allow-Credentials字段，而且此时允许cors的地址不能为*了，得指定地址 
```
res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
res.setHeader("Access-Control-Allow-Credentials","true");
```

需要使用到session的地方都得允许Credentials，然后就可以正确读取session了。

踩坑+1成就达成。