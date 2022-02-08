

Parcel1(parcel-bundler) 中 http 和 async_hooks 等 node 模块有问题，引入漏了

如果依赖到了 node 环境最好 Parcel2 进行打包

```
// node 环境
"engines": {
    "node": "14"
}
```


同时如果引入了第三方包，记得加入 includeNodeModules 来打入第三方包

```
"targets": {
  "default": {
    "includeNodeModules": true
  }
}
```
  