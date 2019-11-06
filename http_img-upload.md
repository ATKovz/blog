title: 利用formData异步上传图片
tags:
  - NodeJS
  - HTML
categories:
  - NodeJS
date: 2019-02-28 00:00:00
---

> 毕业设计日常摸石头过河，上传文件功能模块 

个人不是很喜欢用表单，更喜欢用异步请求，在上传文件时就遇到了问题 —— 怎么上传图片

查阅资料后发现有个比较简单的处理方法，使用HTML5新增的formData方法可以绕开表单操作表单文件，做个记录。
```
const form = new formData();
const fileinput = document.querySelector("#input");
form.append('filename', fileinput.files[0]);
fetch('http://localhost:7777/', {
	methos: "POST",
	credentials: "include",
	body: form
});   // 不添加"Content-Type"字段的话默认会自动添加 multipart/form-data
```

接口处理数据则使用api比较丰富的formidable插件，可以帮我们解析分段数据并保存：

```
const forms = require('formidable');
app.post("/file/upload", (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	res.setHeader("Access-Control-Allow-Credentials","true");
	var form = new forms.IncomingForm();
	var target = path.resolve(__dirname, './img');
	form.uploadDir = target;
	form.encoding = 'utf-8';
	form.parse(req, function(err,fields,files){
		if(err) {
			console.log('错误');
		}
		const ext = path.extname(files.userfile.name); // 获取文件真实拓展名 
		const oldfilePath = path.normalize(files.userfile.path);  //获取保存在本地的路径
		const oldPath = __dirname + '/img/' + path.basename(oldfilePath); // 获取保存在本地的文件名，并拼接路径
		fs.rename(oldPath, `${target}/${Date.now()}${ext}`, (err)=>{   //重命名为时间戳.ext的格式 
			if(err){
				console.log('改名失败')
			}
		})
		res.end('上传成功！');
	});
});

```


完事
