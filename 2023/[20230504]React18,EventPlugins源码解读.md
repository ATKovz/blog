# React Event Plugins 源码解读

## SyntheticEvents

合成事件是React封装的一套系统，如onChange等，会在listener触发时从target逐层冒泡，提供 currentTarget 来用于手动冒泡触发，不管绑定多少事件在VDom上，实际上都是收集到了 document/root 上，使用的内存较低

## 执行大纲


createRoot -> listenToAllSupportedEvents (获取所有原生DOM然后遍历调用 listenToNativeEvent)

listenToNativeEvent (简单加上 capture标志) -> addTrappedEventListener (createEventListenerWrapperWithPriority创建listener 然后 addEventCaptureListener/addEventBubbleListener 绑定到 root/document 上)

createEventListenerWrapperWithPriority (根据 eventPriority 调用 不同的 dispatchEvent, 命名为listenerWrapper 绑定 domEvent，Capture标识，root elm) -> dispatchEvent (从 event target 开始逐层往上收集dom 然后每层调用dispatchEventForPluginEventSystem)

// 这步需要重新阅读源码 mainLoop
dispatchEventForPluginEventSystem (寻找 Tag === HostRoot（3） 且 和container一致的的 VDOM, 通过 node.return 逐层往上走 ) -> 通过通用方法 batchedUpdates 来调用 dispatchEventsForPlugins -> 

extractEvents (调用下一步来收集listener {
  instance,
  listener,
  currentTarget,
} 到 listeners 里) -> accumulateSinglePhaseListeners （从目标开始手动往上return 同时通过 getListener 获取 VDOM的 onxxxEvent(如果有) push进listeners） -> processDispatchQueue(解包 dispatchQueue {event: ReactSyncEvent listeners: { currentTarget, listener, instance: fiber }[] }) -> processDispatchQueueItemsInOrder（逐个执行 listeners） -> executeDispatch

## 捕获模拟

 accumulateEnterLeaveTwoPhaseListeners/accumulateSinglePhaseListeners, accumulateEnterLeaveTwoPhaseListeners 主要是用于模拟 capture 也就是事件捕获，主要用于

BeforeInputEventPlugin
ChangeEventPlugin
SelectEventPlugin

React也只支持通过 onCapturexxx 的形式来触发捕获事件，具体模拟就是在这里面实现的



## 总结

总的来说，React的事件系统完全依赖于一开始 createRoot/ReactDOM.render 时绑定到全局的事件委托，具体的触发流程都是在执行时再从 event target 开始自底向上基于 SyntheticEvents 触发的，而 SyntheticEvents 又分成 Simple/Select/Form/EnterlEave/Change 等一系列，同时在里面各自实现了对应的 Event 并在 extractEvents 时作区分，这也是各种事件除了优先级外的唯一差异点