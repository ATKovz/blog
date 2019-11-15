玩了1年多服务器，也没怎么正经学习linux，这次整体补下相关知识

## 包管理

著名的linux系统基本上分两大类：
1.RedHat系列：Redhat、Centos、Fedora等
2.Debian系列：Debian、Ubuntu等

- yum

一般用于RedHat
1 常见的安装包格式 rpm包,安装rpm包的命令是“rpm -参数”
2 支持tar包

- apt-get 
一般用于Debian
1 常见的安装包格式 deb包,安装deb包的命令是“dpkg -参数”
3 支持tar包

使用方法：yum/apt-get install [package_name]

## 系统目录

### 文件夹说明

- /usr

一般软件都安装在这，下面通常有bin sbin shared lib local等文件夹

1. /usr/bin & /usr/sbin

系统预装的可执行程序，一般全局用的命令都在这里

2. /usr/lib

存放各种库，如npm全局安装的node_module就在这

3. /usr/src

linux源码

4. /usr/local

本地后期增加的内容，里面也有bin sbin etc lib lib64等内容

- /etc

Editable Text Configuration 各种配置文件，如nginx.conf

- /opt

options 一般拿来放选用的自己安装的软件，好比什么tomcat, nginx如果手动装都可以放这里，我个人服务器可以瞎折腾一般放/app

- /bin & /sbin

binary, superBinary 类似usr/bin 和 usr/bin

- /lib

library 存放内核模块和共享库，类似于windows里的dll文件

- /tmp

temprory 顾名思义丢临时文件用的

- /proc

process 系统内存的映射，可直接访问这个目录来获取系统信息。

- /root

超级管理员的主目录

- /dev

device 存放设备文件

- /var

varible 存放运行时会改变内容的文件，如各种日志

### 文件夹的一些区别

/bin是系统的一些指令。bin为binary的简写主要放置一些系统的必备执行档

例如:cat、cp、chmod df、dmesg、gzip、kill、ls、mkdir、more、mount、rm、su、tar等。

/sbin一般是指超级用户指令。主要放置一些系统管理的必备程式

例如:cfdisk、dhcpcd、dump、e2fsck、fdisk、halt、ifconfig、ifup、 ifdown、init、insmod、lilo、lsmod、mke2fs、modprobe、quotacheck、reboot、rmmod、 runlevel、shutdown等。

/usr/bin　是你在**后期安装**的一些软件的运行脚本。主要放置一些应用软体工具的必备执行档

例如c++、g++、gcc、chdrv、diff、dig、du、eject、elm、free、gnome*、 gzip、htpasswd、kfm、ktop、last、less、locale、m4、make、man、mcopy、ncftp、 newaliases、nslookup passwd、quota、smb*、wget等。

/usr/sbin   放置一些用户安装的系统管理的必备程式

例如:dhcpd、httpd、imap、in.*d、inetd、lpd、named、netconfig、nmbd、samba、sendmail、squid、swap、tcpd、tcpdump等。


## 操作文件

### 压缩

- tar命令（Tape Archive）

参数：

1. c 

压缩

2. x

解压

3. v

显示过程

4. f

指定名称

5. z

操作tar.xz文件

6. Z

操作tar.Z文件

7. j

操作tar.bz2文件

例子：

1. 解压一个tar文件: 

>  tar xvf a.tar

2. 解压一个tar.xz文件: 

>  tar xzvf a.tar.xz

3. 压缩目录下的文件为tar格式

> tar cvf sth.tar ./

3. 压缩/app目录下的文件为tar格式，命名为sth.tar

> tar cvf sth.tar /app

### 文件操作

- mkdir [dirname]

make directory 创建文件夹

- vim [filename]

用vim打开文件，不存在就创建，所以可以拿来创建文件

- rm [filename]

remove 删除文件

- rmdir [emtpy dir name]

删除空文件夹, 要删除有内容的可以用 rm -rf [filedir]，不过慎用，gitlab就试过不小心rm -rf / 把整个服务器内容删了

- pwd

path of work directory 打印当前文件夹path

- cp [source] [target]

copy 复制文件 例子：复制index.js 粘贴命名为index_1.js 

> cp ./index.js ./index_1.js

- mv [source] [target]

移动文件或者改名，eg:

把上面复制出来的index_1.js改名

> mv index_1.js what.js

移动到/app目录下

> mv ./what.js /app/what.js

- ln [现有文件位置] [快捷方式位置] (link)

链接文件，类似windows创建快捷方式，

ln -s 是软连接，不带参数为硬链接

eg:

链接刚刚移动动的/app/what.js

> ln /app/what.js /opt/newlink

硬链接如果把/app/what.js删除，访问/opt/newlink依旧可以访问的到内容

而软连接删除了源文件就访问不到了。

硬链接类似于复制，但是修改一边另外一遍也会受到影响，这点和复制不太一样

一般都是用软连接


## 系统相关

### 环境变量

使用echo $PATH可以打印出环境变量目录

默认是 usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin 这5个文件夹

### 常用的系统命令

- df (disk file)

查看磁盘使用情况

- find [scope] [target] 查找文件

eg:

在全目录下查找what.js（不区分大小写）

> find / -iname WHat.js

参数还有很多，如

-name a.js

-user root

-size +500k

-mtime +5 （大于5天前修改） 

等，都和名字一样左右

- whatis [command]

查看命令简介

eg: whatis df

- man [command] (manual)

查看命令详情


## vim文本编辑器

:w 保存

:q 退出

:wq 保存退出

:n 下一个文件

:N() 上一个

:11 跳到对应行数，这里是跳到11行

/sth 从光标后搜索"sth"

?sth 从光标前搜索"sth"

i 编辑

u/ctrl + r 撤销/取消撤销



d 按2次删除当前行

c 剪切当前行

p 粘贴

y 复制

H/M/L 光标挪到文章头部/中间/结尾

ctrl + v 进入view模式 可以多行选中