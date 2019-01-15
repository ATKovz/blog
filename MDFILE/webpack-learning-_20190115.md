---
title: 大勺掏粪吃着香 -- Webpack学习笔记（下）
date: 2019-01-15 
tags: 学轮子
---

接着上篇：

本次学习参考阮一峰老师的[ webpack教程 ](https://github.com/ruanyf/webpack-demos#demo01-entry-file-source) 
以及[ webpack v4.28.4文档 ](https://www.webpackjs.com/guides/getting-started/)

## 入口文件

上一篇就是简单的配置了一个入口文件和输出目录

	module.exports = {
	  entry: './main.js',
	  output: {
	    filename: 'bundle.js'
	  }
	};

webpack会根据读取里的入口文件，将其打包到bundle.js里，然后由index.html引入。

## 多入口文件

webpack也允许多入口文件，同理输出时也会生成2个bundle。

	// main1.js
	document.write('<h1>Hello World</h1>');
	
	// main2.js
	document.write('<h2>Hello Webpack</h2>');
	----------------------------------------------
	index.html
	
	<html>
	  <body>
	    <script src="bundle1.js"></script>
	    <script src="bundle2.js"></script>
	  </body>
	</html>
	----------------------------------------------
	webpack.config.js
	
	module.exports = {
	  entry: {
	    bundle1: './main1.js',
	    bundle2: './main2.js'
	  },
	  output: {
	    filename: '[name].js'
	  }
	};


## Babel-loader

Babel-loader是ES6和JSX必不可少的编译器，webpack打包文件就需要这玩意。

好比我们有main.jsx这样一个入口文件，配置里就应该引入babel-loader：

	module.exports = {
	  entry: './main.jsx',
	  output: {
	    filename: 'bundle.js'
	  },
	  module: {
	    rules: [
	      {
	        test: /\.jsx?$/,   //根据正则表达式的描述筛选jsx文件
	        exclude: /node_modules/,  //排除依赖文件夹
	        use: {
	          loader: 'babel-loader',  	//编译器配置
	          options: {			
	            presets: ['es2015', 'react']
	          }
	        }
	      }
	    ]
	  }
};

## CSS-loader

使用CSS in JS语法时所用的预编译器

	  const path = require('path');
	
	  module.exports = {
	    entry: './src/index.js',
	    output: {
	      filename: 'bundle.js',
	      path: path.resolve(__dirname, 'dist')
	    },
	+   module: {
	+     rules: [
	+       {
	+         test: /\.css$/,
	+         use: [
	+           'style-loader',
	+           'css-loader'
	+         ]
	+       }
	+     ]
	+   }
	  };

## 图片加载 || 字体加载

一般使用file-loader插件


通常情况图片字体都是在CSS里引用src，使用图片加载可以在JS里引入：

	module.exports = {
	  entry: './main.js',
	  output: {
	    filename: 'bundle.js'
	  },
	  module: {
	    rules:[
	      {
	        test: /\.(png|jpg)$/,
	        use: [
	          {
	            loader: 'url-loader',
	            options: {
	              limit: 8192  //限制图片大小
	            }
	          }
	        ]
	      },
	+     {
	+       test: /\.(woff|woff2|eot|ttf|otf)$/,
	+       use: [
	+         'file-loader'
	+       ]
	+     }+       {
	+       test: /\.(woff|woff2|eot|ttf|otf)$/,
	+       use: [
	+         'file-loader'
	+       ]
	+     }
	   ]
	  }
	};

这种情况下img标签里含有的就是经过处理后的文件路径

	<img src="data:image/png;base64,iVBOR...uQmCC">

而配置好的字体文件就可以直接通过@font-face引入使用
	
	+ @font-face {
	+   font-family: 'MyFont';
	+   src:  url('./my-font.woff2') format('woff2'),
	+         url('./my-font.woff') format('woff');
	+   font-weight: 600;
	+   font-style: normal;
	+ }
	
	  .hello {
	    color: red;
	+   font-family: 'MyFont';
	    background: url('./icon.png');
	  }

## CSS模块化

CSS模块化在工程化项目中是非常常见的，能通过编译有效避免变量名冲突的问题，这种时候就需要CSS-loader插件来预编译，让浏览器能识别这种代码：

	// style.css
	/* local scope */
	.h1 {
	  color:red;
	}
	
	/* global scope */
	:global(.h2) {
	  color: blue;
	}
	--------------------------------------------
	// main.jsx	
	import React from 'react';
	import style from 'style.css';
	
	ReactDOM.render(
	  <div>
	    <h1 className={style.h1}>Hello World</h1>
	    <h2 className="h2">Hello Webpack</h2>
	  </div>,
	  document.getElementById('example')
	);


一路下来也很熟悉了，使用css模块化时就需要在webpack的module/rules下加上配置：一样的语法一样的味道：

	{
		test: /\.css$/,
		use: [
			{
				loader: "style-loader"
			},
			{
				loader: "css-loader",
				option: {
					modules: true
				}
			},
		]
	}

## HTML Webpack Plugin/ Open Browser Webpack Plugin

HTML Webpack Plugin会自动生成index.html

而Open Browser Webpack Plugin会在打包完成后自动打开浏览器

	import Htmlwebpackplugin from "html-webpack-plugin";
	import OpenBrowserPlugin from "open-browser-plugin";
	
	module.exports = {
	  entry: './main.js',
	  output: {
	    filename: 'bundle.js'
	  },
	  plugins: [
	    new HtmlwebpackPlugin({
	      title: 'Webpack-demos',  //配置生成的入口文件
	      filename: 'index.html'
	    }),
	    new OpenBrowserPlugin({		//配置运行的端口
	      url: 'http://localhost:8080'
	    })
	  ]
	};


## webpack-dev-server

这是开发中使用频率最高的，提供了一个轻量服务器，并提供实时更新的功能，
 首先安装

	npm install webpack-dev-server --save-dev

然后配置

	  module.exports = {
	    entry: {
	      app: './src/index.js',
	      print: './src/print.js'
	    },
	    devtool: 'inline-source-map',
	+   devServer: {
	+     contentBase: './dist' //配置文件夹
	+   },


然后在package.json/script里添加一条
	
	"script:[
		"start": "webpack-dev-server --open",
	]

就可以愉快的通过start命令运行服务器了。

配套的还有[HMR](https://www.webpackjs.com/guides/hot-module-replacement/)，也是极大提升开发效率的功能。具体可以看左边的webpack文档



webpack本质上只是打包开发工具，具体使用还是得参考其他的具体配置文档，快速上手的话只需要了解webpack.config里的结构，然后具体根据不同插件的文档即可。

