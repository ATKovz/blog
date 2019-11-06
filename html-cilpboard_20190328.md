---
title: 剪贴板与富文本
tags: HTML API
date: 2019-03-29 
categories: HTML
---

>最近遇到了需要处理剪贴板的问题，算是以前很少接触的问题。

查资料和翻书发现居然出现了一个IE胜过了Chrome的点 —— cilpboard的操作，或许是因为考虑到安全性，IE外的浏览器并没有提供直接操作剪贴板的方法，

在IE里你要使用cilpboard只需要访问window.clipboardData，

而在chrome里，浏览器并不支持访问这个对象，

如果现在需要一个点击复制文本框内容到剪切板的功能，

你需要手动进行elem.setSelectionRange(start, end)选定范围，然后使用document.execCommand("copy")方法复制。

而在部分只需要获取片段而不写入剪贴板的场景中，需要进行手动截取了：

```
	window.addEventListener('select', function(e){
		cilpBoard	=	this.value.slice(this.selectionStart, this.selectionEnd);
	})

```

原本是想用剪切板手动操作DOM做个富文本编辑器的，后面看剪贴板看着看着发现红宝书上就已经提到有原生的富文本API了,就是上面已经用到了的操作：

** document.execCommand(commandType, ShowDefaultUI, ValueArgument) **

CommandName
一个 DOMString ，命令的名称。可用命令列表请参阅 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand#%E5%91%BD%E4%BB%A4) 。

ShowDefaultUI
一个 Boolean， 是否展示用户界面，一般为 false。Mozilla 没有实现。

ValueArgument
一些命令（例如insertImage）需要额外的参数（insertImage需要提供插入image的url），默认为null。


这个API主要是配套HTML的contenteditable属性使用的，设置了之后选中文本直接进行操作就会对选中部分进行样式变更，不需要对文本所在DOM元素进行额外操作，所以前面提到的剪贴板其实不太管用，主要还是用来进行加防盗链文字等操作。

举个实例：比较常见的加粗、斜体、下划线等操作：
```
// html
<div contenteditable="true"></div>
<button id="bold"><button>
// js
const b = document.querySelector("#bold");
b.addEventListener('click', function(){
	document.execCommand('bold', false, null);
})
```

可以看到过程完全不需要操作选中的区域，