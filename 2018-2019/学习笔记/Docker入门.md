title: Docker入门
author: Teo
tags:
  - Docker
  - 工具链
categories:
  - 工具链
date: 2019-11-18 11:10:00
---

在业务开发中，为了避免很多环境问题，项目中常常会使用docker，作为一个开发人员也需要掌握docker

- 什么是docker

可以理解成一个一个比虚拟机小但性能更胜虚拟机，同时集成了各种运行环境的容器，docker主要围绕镜像（image）和 容器（container）两个概念以及仓库进行的

- 安装

redHat系统下安装docker非常简单

> yum install docker 

### 镜像（image)

### 什么是image

镜像可以理解成软件，像node，nginx这种在docker中都是以镜像的形式存在的

### 安装镜像

dockerHub 为我们提供了大量的优质镜像，从docker官方仓库获取镜像的方式很简单

> docker pull [image]

eg:

> docker pull nginx

### 查看已有镜像

查看本地已有的镜像也很简单

> docker image ls

```
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
node                latest              1a77bcb355eb        8 days ago          933MB
ubuntu              18.04               775349758637        2 weeks ago         64.2MB
nginx               latest              540a289bab6c        3 weeks ago         126MB
redis               latest              de25a81a5a0b        4 weeks ago         98.2MB
```

### 移除镜像

删除镜像也很简单，我们用docker image ls查看镜像列表后，拿到对应的 image ID 后，就可以执行以下命令

> docker image rm [imageID]

docker里ID的使用未必要全部输入，只需要输入前几位就可以识别到了，如上面我们要删除nginx可以用

> docker image rm 540a


## 容器 (container)

### 什么是container

在docker里的image和container 很像OOP语言里的类和实例

就是说镜像是容器的定义，容器是镜像运行时的实例，所以容器也可以被运行，停止，删除，暂停，容器同样拥有自己的文件系统，可以视为一个小操作系统

容器里的数据是以 **数据卷** 的形式脱离于容器存在的，不会随着容器的停止而删除

### 运行容器

同样是一行命令搞定：

> docker run -dit ubuntu

如果不带d参数，docker将会运行在前端，退出时也会跟着退出

docker run的参数有很多，可以对照下面的列表

参数 | 作用
---|:--:|--|
-a| stdin| 指定标准输入输出内容类型，可选 STDIN/STDOUT/STDERR 三项
-d| 后台运行容器，并返回容器ID
-i| 以交互模式运行容器，通常与 -t|同时使用
-t| 为容器重新分配一个伪输入终端，通常与 -i|同时使用
–name=”nginx-lb”| 为容器指定一个名称
–dns 8.8.8.8| 指定容器使用的DNS服务器，默认和宿主一致
–dns-search example.com| 指定容器DNS搜索域名，默认和宿主一致
-h|“mars”| 指定容器的hostname
-e|username=”ritchie”| 设置环境变量
–env-file=[]| 从指定文件读入环境变量
–cpuset=”0-2” or –cpuset=”0,1,2”| 绑定容器到指定CPU运行
-m||设置容器使用内存最大值
–net=”bridge”| 指定容器的网络连接类型，支持 bridge/host/none/Container 四种类型
–link=[]| 添加链接到另一个容器
–expose=[]| 开放一个端口或一组端口；

### 查看后台容器

> docker container ls

### 进入后台容器

通常进入后台容器有2种方式 exec / attach

使用attach的话使用ctrl + c退出后台会跟着退出

而exec就不会

eg:

打印 123

> docker exec 20b1 echo 123

或者

> docker attach 20b1

如果exec时不使用 -t参数，打开bash不会有linux命令提示符,


> docker exec 20b1 bash // 无提示符

> echo 1

> docker exec -t 20b1 bash // 有提示符

> root@20b18554bbfe:/# echo 1


### 删除容器

> docker rm [dockerid]

如果要删除运行中的，可以用

> docker rm [dockerid]

还可以用prune清除所有关闭的容器

先查看关闭的容器

> docker container ls -a

执行删除命令

> docker container prune


### 导出容器快照

> docker export [containerid] > [savedfilename]

eg: 

>docker export 20b1 > dockerContainer.tar 

### 导入容器快照

导入容器有2种方式 

import 导入快照，import对应的是export

load 导入完整记录，load对应的是save

容器快照文件将丢弃所有的历史记录和元数据信息（即仅保存容器当时的快照状态），而镜像存储文件将保存完整记录，体积也要大。此外，从容器快照文件导入时可以重新指定标签等元数据信息。

使用方式：

> docker import [filename] [repo alias]

eg:

docker import docks.tar somename/thedocker

### 使用commit理解镜像组成

- 实例，修改一个nginx镜像

先跑一个nginx镜像，用下面这条命令用nginx镜像启动一个容器，运行在80端口，并命名为ng

此处的 -p 80:80 是 指明宿主端口：容器端口

> docker run --name ng -d -p 80:80 nginx

然后进入镜像

> docker exec -it ng bash

然后随便修改点文件：

在nginx默认根目录创建一个sth.html,并随便写入点东西

> touch /usr/share/nginx/html/sth.html

> echo '<div>i write sth into sth</div>' > /usr/share/nginx/html/sth.html

然后退出容器，用 docker diff [containerid or name] 查看变化

> docker diff ng

```
C /var
C /var/cache
C /var/cache/nginx
A /var/cache/nginx/scgi_temp
A /var/cache/nginx/uwsgi_temp
A /var/cache/nginx/client_temp
A /var/cache/nginx/fastcgi_temp
A /var/cache/nginx/proxy_temp
C /usr
C /usr/share
C /usr/share/nginx
C /usr/share/nginx/html
A /usr/share/nginx/html/sth.html
C /root
A /root/.bash_history
C /run
A /run/nginx.pid
```

就可以看到我们在容器中具体的改动

然后正式使用commit：

> docker commit [选项] <容器ID或容器名> [<仓库名>[:<标签>]]

```
$ docker commit --author teo --message "随便改了点东西，体验下commit" ng nginx:v998

sha256:b8721a54b1776a65dfbbf66f1a7698b6422efa0f7af58e721b32d67aae501c4f
```

再查看容镜像

```
$ docker image ls

REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
nginx               v998                b8721a54b177        11 minutes ago      126MB
nginx               latest              540a289bab6c        3 weeks ago         126MB
```

可以看到我们多了一个tag为v998的镜像，这镜像就包含了我们刚刚的修改


用docker history nginx:v998 就可以看到我们镜像的历史记录了

定制完后直接运行镜像就可以了

> docker run --name the998nginx -d -p 80:80 nginx:v998

### 一般不建议用commit

不要使用 docker commit 定制镜像，定制镜像应该使用 Dockerfile 来完成。这里我们只是借助commit来理解一个docker镜像是怎么被定制出来的 

## DokerFile

前面说过更建议用DokerFile代替commit来定制镜像

先看看实现之前一样的效果需要怎么做o

```
FROM nginx
RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
```

**FROM**用于指定基础镜像，如果我们要在之前的v998镜像上修改，就得写FROM nginx:v998，Dockerfile 中 FROM 是必备的指令，并且必须是第一条指令。

**RUN**用于执行命令，每个run后就会自动执行一次commit

RUN有2种格式

> RUN 命令

这种就和我们上面用的一样，直接

---

> RUN ["可执行文件", "参数1", "参数2"] 

这种更像函数调用


由于docker中每个RUN都会对应一个新的commit，形成一个新镜像，所以下面这种写法是不推荐的

错误的示范：

```
FROM nginx
RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
RUN echo '<h1>second Page</h1>' > /usr/share/nginx/html/second.html
```

正确的示范：

```
FROM nginx
RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html && echo '<h1>second Page</h1>' > /usr/share/nginx/html/second.html
```

第一种写法会生成2个镜像包，而第二种只会形成一个，滥用RUN会导致出现大量没必要的镜像包，写DockerFile并不是在写 Shell 脚本，而是在定义每一层该如何构建，所以得思考后再决定要用一个新的RUN还是连接符。

dockerFile也支持\换行符和 # 注释，编写时应该避免全写在一行以及完全没注释的情况，不然后续维护会很麻烦

下面是一个实例，编译和安装redis

```
FROM debian:stretch

RUN buildDeps='gcc libc6-dev make wget' \
    && apt-get update \
    && apt-get install -y $buildDeps \
    && wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz" \
    && mkdir -p /usr/src/redis \
    && tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1 \
    && make -C /usr/src/redis \
    && make -C /usr/src/redis install \
    && rm -rf /var/lib/apt/lists/* \
    && rm redis.tar.gz \
    && rm -r /usr/src/redis \
    && apt-get purge -y --auto-remove $buildDeps
```

由于这里只有一个目的，就是安装配置Redis，所以一个RUN就足够了，在每层构建,也就是每个RUN命令的最后一定要记住清除无用的文件，这样可以有效减小镜像体积，保持镜像纯净

## 使用docker build构建镜像

上面讲了这么多都没说到如何使用dockerfile文件，这部分就通过一个实例讲解下，

```
# /testDocker/Dockerfile
# 这里一定要保证文件名叫Dockerfile，区分大小写
FROM nginx
# 定制一个修改了主业的NGINX镜像
RUN echo "<div>the changed nginx image</div>" > /usr/share/nginx/html/index.html
```

看看docker build的使用方法

> docker build [options] <context>

所以这里我们应该这样写

> docker build /testDcker/

输出，构建成功
```
Sending build context to Docker daemon  2.048kB
Step 1/2 : FROM nginx
 ---> 540a289bab6c
Step 2/2 : RUN echo "<div>the changed nginx image</div>" > /usr/share/nginx/html/index.html
 ---> Using cache
 ---> c753c1ec5507
Successfully built c753c1ec5507

```

在后续的指令详解里会提到context，这并不只是指定Dockerfile路径用的

## Dockerfile 指令

### RUN 

前面提及过了

### COPY

和 RUN 指令一样，也有两种格式，一种类似于命令行，一种类似于函数调用。

> COPY [--chown=<user>:<group>] <源路径>... <目标路径>
> COPY [--chown=<user>:<group>] ["<源路径1>",... "<目标路径>"]

注意目标路径指的是容器内的绝对路径

--chown=\<user>:\<group> 这段是用于改变文件所属用户和用户组的

注意

COPY里源路径是相对BUILD的上下文的

也就是如果有下面这种命令

docker build -t nginx:v3 /sth

```
# /sth/Dockerfile
COPY ./package.json /app/
```

这种时候是复制/sth/package.json

如果超出了上下文范围，那就没法复制了

错误的示范：

```
COPY ../package.json /app/
COPY /opt/package.json /app/
```

这两条的源路径就超出了上下文范围，所以会复制失败

如果真的需要复制这些文件夹里的内容，那应该复制在上下文目录内，也就是/sth 下

### ADD

ADD和COPY类似，但是能有更多操作，一般如果只是复制文件不建议用ADD代替COPY，因为ADD更为复杂，语义也不明确

ADD的<源路径> 可以是一个链接，同时如果源路径是格式为gzip, bzip2 以及 xz的 tar压缩包，会自动解压

ADD 指令会令镜像构建缓存失效，从而可能会令镜像构建变慢。

因此在 COPY 和 ADD 指令中选择的时候，可以遵循这样的原则，所有的文件复制均使用 COPY 指令，仅在需要自动解压缩的场合使用 ADD

### CMD

启动容器的命令

CMD 指令的格式和 RUN 相似，也是两种格式：

shell：

> CMD <命令>

exec：

> CMD ["可执行文件", "参数1", "参数2"]

如果使用shell的形式，实际上执行的是 CMD ['sh', '-c', \<command>]

如：

> CMD echo $HOME

实际上等于

> CMD ['sh', '-c', 'echo $HOME']

所以如果我们使用某些默认后台启动的服务，会出现启动不了的情况，因为这条CMD的主体是 sh 

在执行完sh后主线程就不在了，容器就会退出，所以这种时候我们应该用服务的前端启动形式

错误的例子：

> CMD service nginx start

正确的例子：直接执行nginx可执行文件，并前台运行

> CMD ["nginx", "-g", "daemon off;"]

实例：构建一个获取IP的镜像

```
# Dockerfile
FROM ubuntu:18.04
RUN apt-get update \
    && apt-get install -y curl \
    && rm -rf /var/lib/apt/lists/*
CMD [ "curl", "-s", "https://ip.cn" ]

------
docker build -t testCMD .
docker run testCMD
```

不过如果这种时候我们需要在CMD的命令后面加多个参数 -i 

我们就需要重新写一遍CMD命令了 

>  docker run testipsc curl -s https://ip.cn -i

这样显然很麻烦， 这就引入我们下一个命令 **enrtypoint**

### ENTRYPOINT

ENTRYPOINT和CMD的作用类似，格式为：

> <ENTRYPOINT> "<CMD>"

实例： 

```
FROM ubuntu:18.04
RUN apt-get update \
    && apt-get install -y curl \
    && rm -rf /var/lib/apt/lists/*
ENTRYPOINT [ "curl", "-s", "https://ip.cn" ]
```
这种时候我们要实现前一部分CMD带额外参数的功能，就可以直接加了：

> docker run testipsc -i 

可以看出 ENTRYPOINT 顾名思义就是把入口点定在了命令这行，所以直接加参数就相当于在命令后加参数

### ENV 

配置环境变量，这个比较简单，一般有2种格式

> ENV <key> <value>
> ENV <key1>=<value1> <key2>=<value2>..

同时也支持换行，带空格的value需要用字符串包裹

例如node的官方image

```
ENV NODE_VERSION 7.2.0

RUN curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc" \
  && gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc \
  && grep " node-v$NODE_VERSION-linux-x64.tar.xz\$" SHASUMS256.txt | sha256sum -c - \
  && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.xz" SHASUMS256.txt.asc SHASUMS256.txt \
  && ln -s /usr/local/bin/node /usr/local/bin/nodejs
```

### ARG

也一样是配置环境变量，不过是外部环境的环境变量，用的格式和ENV一致

可以在构建命令 docker build 中用 --build-arg <参数名>=<值> 覆盖

### WORKDIR

指定工作目录的指令，因为RUN每次执行都是一层新的镜像，所以以下这种方式是行不通的：

访问/app/sth.js

```
RUN cd /app
RUN echo 'sth' > sth.js
```

应该用以下方式或者用&连接符

```
...
WORKDIR /app
RUN echo 'sth' > sth.js
```

从WORKDIR指定后的每一层都会在/app目录中执行

### USER

> USER <用户名>[:<用户组>]

和Workdir一样指定后的每一层都会影响到

## 数据卷 (volumn)

数据卷是脱离于容器存在的目录，可以用于数据持久化或者容器数据共享

创建/查看/删除 数据卷：

> docker volume create my-vol

> docker volume ls

> docker volume rm my-vol

当数据卷没给挂载时可以用prune清除所有无主数据卷

> docker volume prune

### 匿名数据卷

挂载数据卷的方式是在docker run时用mount参数，并用source指定数据卷，target指定容器路径，挂载：

```
# 挂载my-vol 到 镜像的/weapp目录下
$ docker run -d -P \
    --name web \
    # -v my-vol:/wepapp \
    --mount source=my-vol,target=/webapp \
    training/webapp \
    python app.py
```

也可以以匿名的形式直接挂载主机目录（也可挂载单个文件，文件夹路径换成文件就可以了）：
```
$ docker run -d -P \
    --name web \
    # -v /src/webapp:/opt/webapp:ro \
    --mount type=bind,source=/src/webapp,target=/opt/webapp,readonly \
    training/webapp \
    python app.py
    ``
```

上面加了readonly参数，所以现在数据卷是只读的，无法在容器内进行写入操作

使用以下命令可以看到容器挂载的数据卷信息：

```
$ docker inspect [container name]

# key “mounts”
"Mounts": [
    {
        "Type": "bind",
        "Source": "/src/webapp",
        "Destination": "/opt/webapp",
        "Mode": "",
        "RW": true,
        "Propagation": "rprivate"
    }
],
```

## 网络

待更新