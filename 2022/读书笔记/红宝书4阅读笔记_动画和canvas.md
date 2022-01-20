# 动画

## RAF

setTimeout 的第二个参数实际上有最低限制，设置为0时可能为4(chrome)，也可能为10+(firefox/safari/ie) ms 在不同浏览器里是不一样的，同时会根据 eventloop 的执行情况来延后执行，实际上第二个参数只能保证大于等于设计的时间。

requestAnimationFrame 可以弥补 setTimtout 和 setInterval 等 macroTask 不稳定的问题

和名称一样，每次绘制新的帧之前就会触发

个人觉得这函数更适合叫 pushTaskBeforeNextFrames 

用法约等于 settimtout，可以用递归的方式实现 interval，也可以理解成稳定的 setTimtout(fn, 1000 / 60)，所以稳定的动画更适合用这个来实现

## Canvas

这部分后续会在 webGL 编程更详细的展开，这里仅做简单的用法记录

最基本的案例：

绘制一个图形

首先我们需要一个 canvas

```
<canvas id='cvs'></canvas>
```

然后获取 canvas 和上下文方便绘制

```
const cvs = document.querySelector('#cvs')

// 这里知道是2d就行了，webgl也是通过这个api来获取Context的，传入'webgl' 或者 'experimental-webgl' 即可
const ctx = cvs.getContext('3d')

```

详细内容看 同目录下 canvas.html demo