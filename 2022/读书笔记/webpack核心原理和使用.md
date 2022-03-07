## Webpack 核心功能原理解析

1. Tree shaking 

依赖 es6 静态引入分析

2. ScopeHoisting

本质上是多作用域合并成一个，依赖 es6 静态引入分析，大于2次引入的就没必要做 ScopeHoisting 了，因为会生成重复代码

通过 ModuleConcatenationPlugin 实现

3. Dynamic import

在 splitchunk 的基础上拆分, 利用 JSONP 加载，插入script 后卸载，传入回调


## webpack5

0. ModuleFederation

类似微前端，以前有共同依赖通常是 NPM 发包的形式，比较麻烦

现在新增了概念

remote 被依赖的项目

host 主项目

主要通过插件 ModuleFederationPlugin 来配置，具体可以看文档

1. Treeshaking 优化

多了内部模块优化，如果一个模块的内容没执行，那他依赖到的内容也不会执行

2. Cache

现在 bundle 不是按顺序命名的，不像以前的 1.bundle.js 2.bundle.js

是一个固定的Hash数，这样就不会由于新增模块导致一系列 bundle 重新打包

3. ES6支持

Webpack4 只支持 生成 es5，Webpack 可以支持生成ES6, 具体可以在 Output.ecmaVersion 配置 Output.ecmaVersion: number (version > 5 && version < 11)(ecma version) (version > 2009 && version < 2022)(ecma years) 

## webpack 常用优化

- SpeedMeasurePlugin(建议按需打开, 分析)

测量构建速度

- FriendlyErrorsPlugin (分析)

优化输出log

- BundleAnalyzer(建议按需打开, 分析) 

分析包大小, 方便进行 external/treeshaking 等优化

- MiniCssPlugin/OptimizeCssPlugin (体积)

抽离CSS/压缩CSS

- ExternalPlugin (体积)

使用CDN依赖，避免打入相应包

- cliconfig --json > xx.json (分析)

导出打包log

- thread-loader (速度)

分成多个模块，分给多个worker线程打包 

- 优化 resolve (速度)

extendsion: string[] 写死扩展名缩小查找范围

mainFields: 写死 package.json 入口字段 缩小查找范围

alias: 写死部分用的多的通用包入口 absolute path，缩小范围

- Purgecss-webpack-plugin (体积，treeshaking)


- 图片压缩 (tinypng/imagemin)(image-webpack-plugin)

- 动态Polyfill 

根据UA来判断返回 polyfill，可以有效减少加载的体积，但是会有额外网络请求, 同时部分乱改UA的浏览器可能会有问题


## Webpack 运行机制

1. 启动

