title: Nginx配置 （更新中）
author: Teo
tags:
  - nginx
  - 综合技能
categories: []
date: 2019-09-20 09:56:00
---
之前用nginx只是做一些简单的转发，现在全面学一下配置，学习笔记尽量不用太多难懂的专业词汇，讲究通俗易懂，由于nginx一般是跑在linux下的，所以学习nginx前置条件是能进行基本的linux操作。 

## 安装
http://nginx.org/en/linux_packages.html linux可以在左边连接下载安装包


## 什么是Nginx


Nginx是一个web服务器，也就是和apache是同一性质的工具，同样也通过配置文件来配置功能。

主要功能是作为HTTP和反向代理服务器，能做到负载均衡，限制访问，反向代理等功能

### nginx的使用

具体的命令可以看下图， 这里只提几个比较常用的
![upload successful](/images/pasted-12.png)

```
nginx // 启动nginx
nginx -s reload // 重加载配置文件
nginx -s stop // 关闭
nginx -V // 查看配置
nginx -t // 查看目前配置文件
nginx -c [filepath] // 指定配置文件
```


## Nginx配置文件结构
> 详细的API可看文档http://nginx.org/en/docs/ngx_core_module.html

nginx的功能由配置文件决定，配置文件分为以下几个模块：



1. 全局模块

也就是配置文件最顶层的项 eg: 

```
events {
	...
}

http {
...

	server {
    listen 80
    ...
    location / {
    	root /app/demo
    	index index.html index.htm
    }
   }
}
```

这里的events和http所处的上下文就是全局模块，nginx配置文件的语法如下：
```
# ...全局模块内容
模块名 {
	# ...模块内容
	模块名 {
      # ...模块内容
   }
}
```
在配置文件中用正则表达式时是以~开头，eg：
```
http {
	...
  server {
      location / {
        proxy_pass http://localhost:8080/;
    	}
        
       # 把所有图片的请求转到/static/imgs/路径下
      location ~\.(png|jpg|gif)$ {
  			root /static/imgs
      }
  }  
}

```


### 全局模块配置项：

- user  

配置nginx的服务器用户
eg:

- worker process

指定最大worker process数目，通常和CPU核心数一致

- error_log

错误日志目录，默认： error_log logs/error.log error;

在	main, http, mail, stream, server, location
模块中都可指定
- PID

pid储存位置，就是nginx主进程的进程号
- include

引入内部使用到的配置文件

eg：
```
include /usr/share/nginx/modules/*.conf;
include mime.types;
include vhosts/*.conf;
```
会引入 /usr/share/nginx/modules/下的所有配置文件，所以可以按模块配置然后引入，多次引入是叠加而不是覆盖


- env 

指定保留的环境变量 nginx默认不继承环境变量，除了在这指定的，
默认值是 env TZ 
也就是不指定的话默认只有 **TZ** 这一个环境变量 

官方使用例子：
```
# 继承了MALLOC_OPTIONS,声明了PERL5LIB
env MALLOC_OPTIONS;
env PERL5LIB=/data/site/modules;
```

---

### events配置项

- work_connections

最大连接数

- use [select|poll|kqueue|epoll|rtsig|/dev/poll|eventport] 

选择事件驱动模型

- accept_mutex [on|off]

对多个 nginx 进程接收连接进行序列化，即防止多个进程同时争夺同一个请求

- multi_accept [on|off]

### http配置项

** 前端用的最多的一项 **

核心的有以下几个

- server {...}

块集的配置项，可在括号内配置转发，监听端口等内容，eg：
```
http {
	server {
	  # 服务名（注意星号通配符只能用在www或者.com的位置，不能用在主域名位置）
   	 server_name example.com *.example.com www.example.*; 
    # 配置监听的端口/IP
    listen 127.0.0.1:8000;
    listen 127.0.0.1;
    listen 8000;
    listen *:8000;
    listen localhost:8000; 
    
    # 监听根路径（nginx配置的值均可用正则）
    location / {
    	# 配置根目录，此时访问localhost/jerk 等价于访问 /app/mysite/jerk
    	root /app/mysite/
        
      # 配置首页，会按顺序查找
      index index.htm index.html /index.html
    }
    
    #对比root和alias
    location /images {
    	# 配置根目录，此时访问localhost/images 等价于访问 /app/static/img/images
    	root /app/static/img/
        
      # 配置首页，会按顺序查找
      index index.htm index.html /index.html
    }
    
    # 一个alias的实例，配置静态资源目录，这种时候访问localhost/images 等价于访问/app/static/img/
    location /images {
    	alias /app/static/img/
    }
   }
}
```
从上面的示例可以看出root和alias的区别在于，root是指定的location的根目录，而alias是直接覆盖指定的location

再来几个例子：

```
	location / {
    root /app/root/
   }
   
   location /projectb {
   	alias /app/public
   
   # 配置当找不到目标文件后要按什么顺序查找,通常用于解决单页面部署刷新白屏的问题，因为前端路由并不存在真实的文件,所以在找不到文件的情况下要指回index.html
   	try_files: $uri $uri/ index.html
   }
```

假定目前的项目结构是这样的：
```
/
  -app
  		-root
			项目A.html
			- script
				- bundleA.js
	 	-public
			- 项目B.html
			- script
				- bundleB.js
```
假定现在有2个完全不同的项目，分别部署在root和public下，

如果此时项目B的a.js引用了b.js，且调用的链接是/script/bundleB.js，则会产生错误，因为此时访问到的是/app/root/script/bundleB.js，而该文件不存在。

而如果是项目A中的引用路径是/script/bundleA.js，则可以正常运行。

此时项目B如果要正常运转，要么把bundleB放到/app/root/script, 要么把前端引用的/script/bundleB.js更换成/public/script/bundleB.js，

前端一般是通过在webpack中配置publicPath，也就是方案2实现的。也就是该例子中项目B的publicPath应该配置成/projectb。如果是单页面应用还需要配置路由根路径。


## 转发请求
```
location /api {   
  # 请求host传给后端
  proxy_set_header Host $http_host;
  # 请求ip 传给后端
  proxy_set_header X-Real-IP $remote_addr;
  # 请求协议传给后端
  proxy_set_header X-Scheme $scheme;
  # 路径重写
  rewrite  /api/(.*)  /$1  break;
  # 代理服务器
  proxy_pass http://localhost:8000;
  }
```

通过http_proxy_module 这个模块可以实现请求转发的功能，

利用proxy_set_header 重写header， 

rewrite重写请求路径，如上面的配置就是把 /api/sth 改写成了/sth

proxy_pass 设置代理服务器，也就是这时候如果我们监听的是80端口，同时我们发起一个请求：

> GET http://www.xxxxx.com/api/getSomeList

Nginx就帮我们在服务端把请求转发到了http://localhost:8000/getSomeList下。

### 内置参数

例子中用到了一些特别的参数，http模块下还提供了内置的变量，统一以$开头，下面列举几个

- $uri 
不带参数的请求链接

- $request_uri
完整链接（带参数）

- scheme 
http | https

- server_protocol
协议版本 http/1.0 | http/1.1 | http/2.0

更多见 http://nginx.org/en/docs/http/ngx_http_core_module.html#location 


## 资源压缩（Gzip）

- gzip [on|off]
 
处于http模块下的配置项，性能优化里很重要的一项，压缩文件,也就是我们响应头里经常出现的gzip，设置为on开启

下面看看相关配置

```
http {
    # 开启gzip 压缩
    gzip on;
    
    # 设置gzip所需的http协议最低版本 （HTTP/1.1, HTTP/1.0）
    gzip_http_version 1.1;
    
    # 压缩级别，0到9，越高压缩比越高，同时对服务器负担越大，我一般设置为6，默认为1，
    gzip_comp_level 6;
    
    # 设置压缩的最小字节数， 页面Content-Length获取
    gzip_min_length 1000;
    
    # 设置压缩文件的类型 
    gzip_types text/plain application/javascript text/css;
}
```
## 负载均衡

Nginx很重要的一部分，是确保服务器稳定工作的核心

Syntax:	upstream name { ... }
Default:	—
Context:	http

也是http模块下的配置项

官方例子：
```
upstream backend {
    # 收到请求时会随机分配给以下服务器
    # 常用的参数有以下几个：
      # weight是该服务器的权重
      # backup：用于标明备胎服务器，上面3个服务器炸了后，请求就会分给备胎服务器
      # max_fails：最大失败数，连续n次失败后将暂时标为不可用，等下一轮请求时才恢复，默认为1
      # max_conns：最大同时连接数,默认为0，无限制
      # fail_timeout: 最长响应时间,默认10秒
      # down： 标识该服务器不可用
    
    server backend1.example.com weight=5; max_conns=12; 
    server 127.0.0.1:8080 max_fails=3 fail_timeout=30s;
    server unix:/tmp/backend3;
    server backup1.example.com  backup;
    
    # 用于保持会话，同一客户端只会访问一台服务器
    ip_hash;
    
    # 优先分配给访问数比较少的服务器
    least_conn;
    
    # 还有很多配置没列举，需要用到时可以看文档
    
}
```

## https相关配置

### nginx升级https

https用的是443端口，所以nginx监听的端口也得改，申请ssl证书后应该会拿到pem和key这两种格式的文件，把他们丢到服务器上，然后配置 **ssl_certificate** 和 **ssl_certificate_key** 分别为上面2文件的路径就可以了

```
server {
	listen       443 ssl http2 default_server;
	listen       [::]:443 ssl http2 default_server;
	ssl_certificate /cert/*****.pem;
	ssl_certificate_key /cert/*****.key;
	server_name  _;
}

```

### http访问重定向到https


以我博客为例：

    server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  *.example.cn;
        rewrite (.*) https://$host$1 permanent;
    }
