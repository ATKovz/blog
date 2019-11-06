title: HTML5 Drag
tags:
  - HTML
categories:
  - HTML
date: 2019-03-27 00:00:00
---

HTML5增加了个原生拖拽API，挺有意思的，后续工作应该也会用到，这里提一提

## 事件

主要有6个事件

- dragstart
- drag
- dragend

这仨是主动拖的事件，也就是拖动目标元素，分别对应了开始过程和结束3个生命周期

- dragenter
- dragover
- dragleave/drop

这仨是被动的事件，也就是把某个DOM元素拖进目标元素时触发的，

dragenter和dragleave只在进入/挪出的一瞬间触发，在内部移动触发的均是dragover，

而drop事件比较独特，如果DOM元素不是原生可drop元素，那永远将不会触发drop，但是可以通过手动修改事件属性来改变：

```
target.addEventListener('dragover', function(event){
	event.preventDefault();
		...
	event.dataTransfer.dropEffect = "move"
})
```

阻止了默认事件后鼠标挪入时光标（cursor）就不会再显示禁止光标，而是可drop的光标。

## dataTransfer

用于传输数据的方法，只有布局变换数据而没迁移是没什么意义的，所以有了这个对象，挂载在event下。

其中获取数据和设置数据的方法分别是

- setData(format, data)
- getData(data)

**需要注意的是 setData只能在dragstart事件中设置，getData只能在drop事件中获取，这是我踩了半天才发现的坑。**

### dropEffect/effectAllowed

**这2个方法需要配套使用，同时只能在dragover和dragstart中使用**

dropEffect有4种行为

- none // 默认值
- copy
- move
- link

dropAllow的值可以为以下：

- uninitialized
- copy
- move
- link

以及上面3种方法的排列组合

- copyLink
- copyMove
- linkMove
- all

dropEffect 用于设定行为属性，dropAllow 用于设置允许的行为。

在 dragstart 事件设定的行为和 drop 事件允许的行为一致的情况下，就可以通过先前提到的dataAPI来进行DOM操作了。

dataTransfer下还有一些常用的简单API

- clearData(format) 

用于清除特定格式保存的数据

- addElement(element)

添加元素（这个功能笔记待补充）

- setDragImage(element, x, y)

拖动时显示在光标附近的阴影图片

- types

可以访问目前保存的数据类型
