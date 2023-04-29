# Ahooks 源码解读 - useRequest

useRequest 的实现并不复杂，但是其中用到的兜底手法和设计模式的使用是相当值得学习的，所以简单阅读下源码

## hooks 结构

1. Request 类

一个普通的类，类似于 Class Component 的结构，有基本的 setState 和 request，以及一套插件发布订阅（plugins/events系统）

fetch 过程就是简单的兜底和 state(data/loading等p ro)

- plugins 系统 / events 系统 / 计数系统

plugins 基于一系列 effect  和 events 实现的一系列hooks，包括常用的 Loading cache autoRun 等功能

Event 主要为 plugins 提供了 onSuccess/onError/onCancel/onMutate 等一系列钩子

Count 请求和取消主要依赖于 内部保存的 count，用于管理 onFinally 的emit/cancel/retry，

每当 cancel/retry count 会自增，以 run 为例

```
  async runAsync(...params: TParams): Promise<TData> {
    this.count += 1;
    const currentCount = this.count;

    const {
      stopNow = false,
      returnNow = false,
      ...state
    } = this.runPluginHandler('onBefore', params);

    // stop request
    if (stopNow) {
      return new Promise(() => {});
    }

    this.setState({
      loading: true,
      params,
      ...state,
    });

    // return now
    if (returnNow) {
      return Promise.resolve(state.data);
    }

    this.options.onBefore?.(params);

    try {
      // replace service
      let { servicePromise } = this.runPluginHandler('onRequest', this.serviceRef.current, params);

      if (!servicePromise) {
        servicePromise = this.serviceRef.current(...params);
      }

      const res = await servicePromise;

      if (currentCount !== this.count) {
        // prevent run.then when request is canceled
        return new Promise(() => {});
      }

      // const formattedResult = this.options.formatResultRef.current ? this.options.formatResultRef.current(res) : res;

      this.setState({
        data: res,
        error: undefined,
        loading: false,
      });

      this.options.onSuccess?.(res, params);
      this.runPluginHandler('onSuccess', res, params);

      this.options.onFinally?.(params, res, undefined);

      if (currentCount === this.count) {
        this.runPluginHandler('onFinally', params, res, undefined);
      }

      return res;
    } catch (error) {
      if (currentCount !== this.count) {
        // prevent run.then when request is canceled
        return new Promise(() => {});
      }

      this.setState({
        error,
        loading: false,
      });

      this.options.onError?.(error, params);
      this.runPluginHandler('onError', error, params);

      this.options.onFinally?.(params, undefined, error);

      if (currentCount === this.count) {
        this.runPluginHandler('onFinally', params, undefined, error);
      }

      throw error;
    }
```

而每次请求都会携带对应的 count 作为 ID， 在 请求结束后， setState和onSuccess 前会判断， 而请求完成后如果 count 对应不上则是直接返回一个空的 Promise 而不采用请求结果

需要注意的是 在 plugins 的 onFinally 前，hooks options 的 onFinally 后会再执行一次 count 判断，也就是如果我们在 hook options 里的 onFinally 再发起一次请求调用的话，插件的 onFinally 不会触发