title: 一文复习移动端布局
tags:
  - 基础
  - html
  - css
categories:
  - HTML
date: 2019-06-04 00:00:00
---
>参考文章: https://juejin.im/post/5cddf289f265da038f77696c

太久没写移动端有些概念忘了，也有段时间没写笔记了，写个适合自己理解的笔记。


## 需要知道的移动端概念

### 移动设备物理像素和设备独立像素的区别

一般平时聊天说的像素，都是指设备的物理像素，好比什么2K屏，720P屏。

移动设备的高分辨率并不一定和PC端一样能显示更多内容，只能说明设备的PPI（pixel per Inch）更高，更难看到肉眼可见的像素点。

而在写移动端项目的情况下，一般是用的设备独立像素(Device Independent Pixels)DP/DIP来描述的，设备物理像素不同，1DP所代表的物理像素也不同。

PC大分辨率显示内容可以更多内容，是基于显示器的大展示面积前提，
而移动端分辨率提升通常尺寸不会变化太多，所以显然不能用PC的1PX=1PX的设计思路，
在移动端中，1DP往往等于若干px，我们写的px就是基于DP的，也就是我们写的1px并不等于设备上的1px，而是根据设备分辨率和尺寸来决定我们写的1px等于多少真实像素。

![不同分辨率下同样一个图片的显示效果](http://www.teoblog.cn/postimg/mobilePx.gif)


一般DP可以参考chrome调试工具中提供的参数，iPhoneX的DP为 375*812

### dpr

由于有物理像素和设备独立像素的差异，就引申出dpr(device pixel ratio)的概念

也就是物理像素/设备独立像素，在浏览器可以调用window.devicePixelRatio来获取

以PC端的chrome为例 

```
console.log(window.devicePixelRatio) // 1 （chrome标准配置）
console.log(window.devicePixelRatio) // 1.25 （chrome页面125%）
console.log(window.devicePixelRatio) // 3 （iPhoneX）
```
![不同分辨率下](http://www.teoblog.cn/postimg/16ac3a6649f8d53a.gif)


举个例子，iPhoneX下的DPR为3，这种时候一个200px的元素就需要写成200/2（px/dpr） 也就是100

也就是遵循以下公式： 

> *页面的缩放系数 = CSS像素 / 设备独立像素*

或者说 

> *理想视口宽度 / 视觉视口宽度*

这里又涉及到视口，视口可分为三种

- 布局视口

一般是浏览器窗口大小（不含滚动条）

document.documentElement.clientWidth / clientHeight

- 视觉视口

一般指浏览器大小（含滚动条）

window.innerWidth / innerHeight

- 理想视口

设备大小

如PC屏幕1920

可通过screen.width / height

### 1px问题

由于存在dpr，1dp的边框在某些场景下会显得特别粗，常见的解决方案有伪类，svg，或者border-img等，根据不同情况单独调节。

最常用的还是设置viewport的方式,

### flexible vh/vw

flexible是以font-size基准，以rem为单位的解决方案

以iPhone6为例：布局视口为375px，则1rem = 37.5px，这时UI给定一个元素的宽为75px（设备独立像素），我们只需要将它设置为75 / 37.5 = 2rem

而vh/vw则是将窗口分为100份

- vw(Viewport's width)：1vw等于视觉视口的1%
- vh(Viewport's height) :1vh 为视觉视口高度的1%
- vmin : vw 和 vh 中的较小值
- vmax : 选取 vw 和 vh 中的较大值

这2种也是目前最常用的方式了。