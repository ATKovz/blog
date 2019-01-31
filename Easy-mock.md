---
title: Easy-mock的安装与配置
date: 2018-12-22 02:03:49
tags:
---


[Easy-mock][1]  是一款比较好用的接口模拟工具，

使用之前我们需要安装和配置

需要下载的内容有以下

[Node][2]
[Redis][3]
[MongoDB][4]
Node和Redis一路点下一步就行， MongoDB可以参考 [MongoDB安装和运行][5]


安装完成后就可以从github上下载easy-mock并开始使用了

 

    git clone https://github.com/easy-mock/easy-mock.git
    cd easy-mock && npm install

 

依赖安装完成后可以开始修改配置文件

配置文件位于目录下的 config/default.json，或者创建一个 config/local.json 文件，将如下需要替换的字段换成自己的配置即可。

官方配置模板 ：

    {
      "port": 7300,
      "host": "0.0.0.0",
      "pageSize": 30,
      "proxy": false,
      "db": "mongodb://localhost/easy-mock",
      "unsplashClientId": "",
      "redis": {
        "keyPrefix": "[Easy Mock]",
        "port": 6379,
        "host": "localhost",
        "password": "",
        "db": 0
      },
      "blackList": {
        "projects": [], // projectId，例："5a4495e16ef711102113e500"
        "ips": [] // ip，例："127.0.0.1"
      },
      "rateLimit": { // https://github.com/koajs/ratelimit
        "max": 1000,
        "duration": 1000
      },
      "jwt": {
        "expire": "14 days",
        "secret": "shared-secret"
      },
      "upload": {
        "types": [".jpg", ".jpeg", ".png", ".gif", ".json", ".yml", ".yaml"],
        "size": 5242880,
        "dir": "../public/upload",
        "expire": {
          "types": [".json", ".yml", ".yaml"],
          "day": -1
        }
      },
      "ldap": {
        "server": "", // 设置 server 代表启用 LDAP 登录。例："ldap://localhost:389" 或 "ldaps://localhost:389"（使用 SSL）
        "bindDN": "", // 用户名，例："cn=admin,dc=example,dc=com"
        "password": "",
        "filter": {
          "base": "", // 查询用户的路径，例："dc=example,dc=com"
          "attributeName": "" // 查询字段，例："mail"
        }
      },
      "fe": {
        "copyright": "",
        "storageNamespace": "easy-mock_",
        "timeout": 25000,
        "publicPath": "/dist/"
      }
    }


如果不懂node-config，只需要知道开头的 port host，决定了你模拟接口运行的路径就行了。

配置完成后，打开命令行，来到MongoDB根目录，运行Mongod服务器，然后就可以运行程序使用接口了。

$npm run dev


 



 


如果只是小项目的话也可以用 Charles 来模拟数据接口，具体的使用可以进入 [Charles 官网][7]阅读文档


  [1]: https://github.com/easy-mock/easy-mock
  [2]: https://nodejs.org/en/
  [3]: https://redis.io/
  [4]: https://www.mongodb.com/
  [5]: http://www.runoob.com/mongodb/mongodb-window-install.html
  [7]: https://www.charlesproxy.com/