Fiber 数组diff

一共有2轮比对

第一轮

找到 key 不一致的首位，然后记录index，用 index 进入下一轮

如果已经遍历比对完了 newChildren (index === newChildren.length)，那直接删除  oldFiber 剩余节点，然后返回，结束diff

否则进入下一行

如果 oldFibel 为 null，即 oldFiber 已比对完一致，那把剩余的 newChildren 标记Placement， 返回

否则进入第二轮

第二轮

先把剩余的 oldFiber 映射进 map 里

然后遍历 newCHildren，拿key来再次比对，看看有没有顺序不一致但是可以复用的（placeChild）

如果有，用lastPlacedIndex 替换掉 oldFiber 里的 index，否则则用原本的 oldFiber.index 返回作为下一个标志位

没有直接挂到 组件的 deletions （array）里等下一步删除
