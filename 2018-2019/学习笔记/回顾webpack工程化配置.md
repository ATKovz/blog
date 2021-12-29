title: 回顾webpack工程化配置
author: Teo
tags:
  - webpack
  - 工具链
categories:
  - webpack
date: 2019-09-24 06:10:00
---
> 由于日常工作不会频繁搭建新项目，维护项目都是很久才配置一次webpack，webpack的配置过于强大又导致只能面向文档配置，次次搭都查文档效率也不是很高，所以现在整理一篇便于直接CV和偶尔复习。

### 编译es6代码

webpack是通过babel进行低版本兼容的，所以需要安装babel

```
npm install @babel/core babel-loader --save-dev
```
然后在webpack中的module模块进行配置，具体配置可以写在option里，我个人是推荐抽出来写到项目根目录下的.babelrc文件中方便维护,

### 开发业务时的配置

把ES6语法编译成ES5需要依赖@babel/polyfill，@babel/preset-env这两个包,在配置里把useBuiltIns设置成usage可以按需打包有效压缩代码体积
```
// webpack.config.js
module: {
      rules: [{
           	test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              // option: {}
      }]
}

// 引入polyfilll有2个方式 1.在入口文件import
//index.js 
import ‘@babel/polyfill’

// 2. 配置webpack entry项
entry: ['@babel/polyfill', 'src/index.js']

//.babelrc
{
    "presets": [["@babel/preset-env", {
            "corejs": "2",
            "useBuiltIns": "usage"
    }]]
}
// 3. useBuiltIns设置为usage时会自动引入
```


实测下，入口文件引入的方式"useBuiltIns": "usage"的设置是无效的


### 开发通用库时的配置

如果是开发一个开源库，那是很不建议使用polyfill的，因为polyfill是通过全局变量的形式进行兼容的，会造成全局污染，

这种时候更推荐使用@babel/plugin-transform-runtime

看babel官方文档，我们需要安装几个包：
```
npm install --save-dev @babel/plugin-transform-runtime	
npm install --save @babel/runtime
npm install --save @babel/runtime-corejs2
```

然后把babel配置中的presets配置去掉，换成
```
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
```

这个方案是用闭包的方式实现兼容的，所以不会污染全局变量。

总结就是业务推荐使用polyfill，开发库推荐使用transform-runtime，如果需要兼容低版本浏览器可以在polyfill的targets配置项里配置目标版本。


## 打包React

用webpack打包React项目同样是依赖preset,所以同样得先安装一个包，然后在配置文件里配置，而且众所周知webpack的配置都是从右往左读的，所以下面这种配置是先编译react代码后编译es6代码

```
npm install --save-dev @babel/preset-react

// .babelrc

{
  "presets": [
    ["@babel/preset-env", {
            "corejs": "2",
            "useBuiltIns": "usage"
    }]，
    ["@babel/preset-react", {
  	
    }]
  ]
}
```

## treeShaking

treeShaking就是一个概念，意思是只打包引用到的代码，不会打包没引用过的代码，但只支持ESModule（es6 import export）,而且对第三方包不管用

在webpack和package.json添加配置：

```
// webpack.config.js
optimization: {
  usedExports: true
}

// package.json
sideEffects: "packagename" | ["packagenameOrFileName", "*.css"] | false
```
package.json里的sideEffects配置项内的内容将不会受treeShaking影响。css文件如果使用了treeShaking很有可能出现预料之外的错误，所以一般推荐配置 ** sideEffects："\*.css" **

## 开发环境区分

一般来说为了开发方便，webpack通常会分生产环境配置，一般是webpack的mode配置项来区分2个环境的差异,

个人推荐使用配置环境变量以及webpack-merge这个插件来配置，也就是以下这样:

```
// webpack.config.js

const merge = require('webpack-merge')

const devConfig = require('./webpack.dev.js')
const prodConfig = require('./webpack.prod.js')

let env = process.env.NODE_ENV

const Config = {
  dev: devConfig,
  prod: prodConfig,
}

module.exports = merge(Config[env], {
	// ...commonConfig
})

// package.json

  "scripts": {
    "build": "cross-env NODE_ENV=prod webpack",
    "dev": "cross-env NODE_ENV=dev webpack-dev-server"
  }
```
## 代码分割

打包时不做代码分割会把源码和依赖全都打到一个文件里，

无论是做缓存或是加载速度都不太理想，所以在前端项目中需要做代码分割（CodeSpliting）处理，

### JS文件

webpack的代码分割是在optimization下的splitChunks项，webpack是引用了
**SplitChunksPlugin** 这个插件，查看文档可以读到配置项和默认值，下面代码就是不传参时的默认值

```
module.exports = {
  //...
  optimization: {
    splitChunks: {
    	name: 
    	// 分割规则，默认只切割async  async|all|['chunkname_0', 'chunkname_1']
      chunks: 'async',
      
      // 库超过30000（b）就分割
      minSize: 30000,
      
      // 单文件最大分割到30000(b),但不少第三方库都无法二次拆分，所以用的其实比较少
      maxSize: 30000, 
      
      // 最少被引用几次时被分割，也就是设为2，只用到一次时不会进行分割
      minChunks: 1,
      
      // 同时只能加载的模块数不大于5个，也就是在访问一个页面时最多只能加载5个异步请求文件，超过5个都会被打到同一个包里
      maxAsyncRequests: 5,
      
      // 入口文件分割最大值，和上面的类似，不过是访问入口文件时的限制，一般这两项不改动
      maxInitialRequests: 3,
      
      // 名称切割标识，如vendors~1c73ab04.async.js中的~ 就分割了[name]~[hash].async.js
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      
      // 设置为true时文件会命名为cacheGroups名+key 
      // 文档： The name of the split chunk. Providing true will automatically generate a name based on chunks and cache group key.
      name: true,
      // 如果满足上面的条件，文件就会走下面的规则，匹配到规则就按规则来分割，如下面就匹配node_modules为一个规则，default为一个规则，不配置default则为下图的规则
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // 包同时满足多个条件时根据priority判断遵循哪个条件
          priority: -10,
          filename: 'vendors.js'
        },
        default: {
          minChunks: 2,
          priority: -20,
          
          // 如果其他包中已经打包过某库了就直接复用，不重复打包
          reuseExistingChunk: true
        }
      }
    }
  }
};
```

### CSS文件

这里用到 ** mini-css-extract-plugin ** 这个插件，注意不能和style-loader一起用，会产生冲突，旧版本不支持HMR，可以选择开发环境使用style-loader这种CSS in JS 方案，在开发环境使用 mini-css-extract-plugin。

当然还是建议直接使用最新版本的本插件，最新版本已经支持了
需要在pulgins和module里都添加配置:

```
const MiniCSS = require('mini-css-extract-plugin')

modules.export = {
	...
  module: {
      rules: [
        {
          test: /\.(css|less)$/,
          use: [
            MiniCSS.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
              }
            },
          ],
        },
     ]
  },
  plugins: [new MiniCSS()]
}
```

## 懒加载

也是性能优化里很重要的一项，用到某资源的时候再进行请求，常用于路由以及 图片

### 写法

```
const LazyLoadDemo = () => {
  const handleLazyLoadDemo = async () => {
    const _ = await import(/* webpackChunkName: "lodash" */'lodash')
    console.log(_)
  }

  return (
    <div>
      <div onClick={handleLazyLoadDemo}>lazy load</div>
    </div>
  )
}

```

通过这种配置，当我们点击lazy load这个标签的时候，才会去请求lodash这个包，这就是所谓的懒加载，
同时这里也涉及到一点前面的代码分割的知识点，
```
const _ = await import(/* webpackChunkName: "lodash" */'lodash')
```
这种注释写法在webpack里被称为魔法注释，打包时会根据webpackChunkName的值进行包命名，

而这种异步引入包的方式是ECMA的一个实验性语法，同时也属于前一部分配置中maxAsyncRequests所指的异步请求。



## 处理缓存问题

由于浏览器有缓存的功能，用户第一次访问我们的项目后浏览器会自动缓存，在第二次访问就会调用缓存文件，如果我们在2次更新的过程中打包的文件名一样，那很可能用户访问到的就是旧页面。

webpack也有解决这个问题的方法，就是使用[contenthash]占位符

输出的时候在名字中加入该占位符，就能在每次打包都产生不同的hash值用于判断是否更新了，该配置建议只在生产环境应用。

```
output: {
  filename: '[name].[contenthash].js',
  chunkFilename: '[name].[contenthash].js'
}
```

## 使用shimming解决部分模块问题

shimmingg和treeShaking一样是一个概念，就和字面意思一样，是一个垫片，用于改变全局变量

### 使用ProvidePlugin引入第三方库

在进行模块式开发的时候，使用如jQuery，Lodash这类库时，需要频繁的在模块里引入
```
import $ from 'jQuery'
```

这样操作起来很不方便，webpack内置了一个插件解决了这个问题：ProvidePlugin

```
...
plugins: [new Webpack.ProvidePlugin({
	$: 'jQuery',
   _: 'lodash'
})]
```
在这样引入后，我们每次使用到配置中的变量时webpack就会自动帮我们引入对应的包，就节省了很多手动操作。
同时也避免了一些比较老的库的打包问题

### 使用imports-loader改变this指向

同样是在模块化开发中，开发过程的this不是指向global/ window，而是指向一个module实例
```
function Module (id, parent) {
  this.id = id;
  this.exports = {};
  this.parent = parent;
  this.filename = null;
  this.loaded = false;
  this.children = [];
}
```

如果有时有改变this指向的需求，就可以使用 ** imports-loader **
```
{
	test: /\.(jsx|js)$/,
   loaders: [
     'babel-loader',
     'imports-loader?this=>window&jq=jQuery'
   ],
},
```

只需要在使用loaders在query参数部分加上所需挂载的全局变量就可以了

如上面这段，imports-loader等同于帮我们做了
```
(function () { ... }).call(window);

var jq = reuiqre('jQuery')
```
两个操作,但是imports-loader问题比较多，不太建议使用。


## 打包自己的库

开发中我们经常会使用第三方库，第三方库的打包明显和业务项目是不一样的，那么如何用webpack打包一个属于自己的库呢？

### 模块引入方式

打包库的时候通常要考虑各种各样的引入方式，如AMD，ESmodule，script src=''等，所以需要进行一定的配置

eg:
```
...
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'teosLibrary.js',
  
  // library项决定你在用script标签引入时注入的全局变量名
  library: 'teosLibrary',
  
  libraryTarget: 'umd',
}
```

然后在引入打包出来的文件，打印

```
// test.html
<script src='./teosLibrary.js'></script>
<script>
  console.log(teosLibrary) // 输出看下图
</script>

```

![upload successful](/images/pasted-13.png)

从控制台的输出可以看出我们的库已经可以通过script标签引入后全局注入变量了

### external

开发第三方库时或多或少也会依赖到更多的第三方库，如果把这些依赖也一起打包到我们的项目中，那项目体积会十分庞大。

所以就需要用到webpack的external配置项，把这些第三方库看作是用户自己一定会装的，打包时就只会打包我们的源代码了。

eg:
```
module.exports = {
	...
   externals: {
   	lodash: {
		commonjs: 'lodash',
		commonjs2: 'lodash',
		amd: 'lodash',
		root: '_'
     }
   }
}

```

如果我们是单独引用库里的某些组件，也可以用正则表达式来批量加入externals项中，以lodash为例


```
import lodash from 'lodash'

export const join = (arr, seperate) => lodash.join(arr, seperate)
```

如果以上面的配置打包


![upload successful](/images/pasted-14.png)

可以看到lodash也被打包进来了，这显然不是我们想看到的，那该怎么解决这个问题呢？

webpack的externals（外部库）配置项为我们解决了这点

```
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'teosLibrary.js',
    library: 'teosLibrary',
    
    // 如果配置为libraryTarget: 'this'，那通过script标签引入时，变量teosLibrary将会被挂载到最外层this指向的对象上，同理我们还可以把该变量挂到global, window等对象上。
    // 一般为了模块化引入，我们会把libraryTarget设置为umd
    libraryTarget: 'umd',
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      
      // 标签引入时全局对象为_
      root: '_'
    }
  },
  // 或者可以写成一个数组
  externals: ['lodash'],
  
  // 或
  externals: 'lodash',
  
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist')]
    })
  ]
}
```
在externals项加入配置后我们再进行一次打包


![upload successful](/images/pasted-15.png)

本次打包就十分的干净，显然是排除了lodash在外的源码


![upload successful](/images/pasted-16.png)

添加配置前后的体积也是非常明显的，所以这步配置是必须的

### 发布至npm

最简单的一步

1. npm login 登录

2. npm publish 就成功发布了

发布记得更新package.json的版本信息，然后我们就可以通过
```
npm install [package.name]
```
来安装我们的包了

## 开发环境转发请求

### 解决跨域和环境切换问题

开发过程或多或少都会遇到跨域问题，以及多环境切换不方便的问题，
webpack-dev-server内置的 **http-proxy-middleware** 插件就解决了这些问题

```
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.github.com/',
        pathRewrite: {
        	// key可以用正则表达式匹配
          '^/api': '/user'
        },
        // https需要添加secure: false配置
        sucure: false,
        // 更改请求头的Origin，如果不开changeOrigin，可能在访问某些接口时会受到服务端的限制
        changeOrigin: true,
        // 更改请求头
        headers: {
        	host: 'www.example.org',
          Authorization: 'barear ************'
			}
      } 
    }
  },

```
想代理多个路径的时候可以使用下面这种写法
```
proxy: [{
	context: ['/auth', '/api'],
	target: 'http://api.github.com/',
}]
```

### 解决SPA问题


## 给项目用上TS

现在的新项目，除了政府工程等需要考虑考虑兼容性的，其他都十分建议上TS，webpack上TS很简单，和其他需要编译的一样，上loader，这里我们用到的是ts-loader，

```
// cli 安装
npm install ts-loader --save-dev

// 配置
module: {
      rules: [
        {
          test: /\.(tsx|ts|js)$/,
          exclude: /node_module/,
          use: [
            {
              loader: 'ts-loader'
            }
          ]
         }
      ]
}
```

这种时候我们直接打包，会提示我们根目录下找不到tsconfig.json这模块

这是因为ts的相关规则都需要在tsconfig.json中配置，所以在根目录下创建一个

```
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    // 如果像我们之前配置的要进行按需加载，那得把module配置为exnext
    "module": "esNext",
    "target": "es5",
    "jsx": "react",
    "allowJs": true
  }
}.
```

其余配置可以看	ts的文档，https://www.tslang.cn/docs/handbook/tsconfig-json.html