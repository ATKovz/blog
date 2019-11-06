title: 大勺掏粪吃着香 -- Webpack学习笔记（上）
tags:
  - 学轮子
  - JavaScript
categories:
  - JavaScript
date: 2019-01-15 00:00:00
---
	
webpack是前端工程化必备的打包工具，虽然现在大多数脚手架已经极大简化了webpack的配置，但是为了更灵活的解决项目中的问题，webpack的学习还是十分有必要的。

本文主要以[ webpack v4.28.4文档 ](https://www.webpackjs.com/guides/getting-started/)为参考

## 起步

### 创建项目
	
创建一个目录，初始化npm项目然后安装webpack和webpack-cli

	npm init -y
	npm install webpack webpack-cli --save-dev
	
安装完成后首先得认识webpack的目录结构：

	  webpack-demo
	  |- package.json
	+ |- index.html
	+ |- /src
	+   |- index.js


webpack依赖另外一个库： lodash，开始前得安装lodash

	npm install lodash --save

安装完成后，跟着结构图创建目录，然后在index.js里进行我们的第一个webpack项目：

	import _ from lodash;
	function content(){
		const content = document.createElement("div");
		content.innerHTML =  _.join(["f***ing", "webpack"]);
		return content;
	}
	document.body.appendChild(content());


我们还需要修改一下package的配置：
	
	{
	  "name": "learning-pack",
	  "version": "1.0.0",
	  "description": "",
	  "private": true,    //保证项目私有，同时删除 "main": "index.js"项
	  "scripts": {
			"test": "echo \"Error: no test specified\" && exit 1",
			"build": "webpack"
	  },
	  "author": "",
	  "license": "ISC",
	  "devDependencies": {
	    "webpack": "^4.28.4",
	    "webpack-cli": "^3.2.1"
	  },
	  "dependencies": {
	    "lodash": "^4.17.11"
	  }
	}


然后运行打包脚本

	npx webpack || npm run build

npm run build 脚本可以通过package配置

	  "scripts": {
			"test": "echo \"Error: no test specified\" && exit 1",
			"build": "webpack"
	  },


现在打开index.html,应该就可以看到我们index.js里创建的DIV内容了。

### 配置

哪怕没学过webpack的配置，应该也多多少少在类似vue-cli create-react-app 之类的脚手架工具里看到过相关的字眼，webpack的核心就是打包和配置。

配置主要通过模块的形式，

	  webpack-demo
	  |- package.json
	+ |- webpack.config.js
	  |- /dist
	    |- index.html
	  |- /src
	    |- index.js


先在根目录下创建一个配置文件：

	const path = require("path");
	module.exports = {
		entry: "./src/index.js",  //配置入口文件
		output:{
			filename: "bundle.js",  //配置输出文件
			path: path.resolve(__dirname, "dist") //配置输出目录
		}
	}

然后再次运行打包脚本 

	npm run build --config webpack.config.js

这次在dist文件夹里输出了一个bundle.js文件。



webpack的基本使用就是这样！


**恭喜达成成就:  Hello World!** 
