#### 项目介绍
这是一个基于nodejs开发的前后台不分离的新闻项目

#### 项目包依赖
1. art-template: node后端渲染模板
2. body-parser : 接受post请求的必要插件
3. cookie-parser/cookie-session : 储存cookie/session的npm包
4. express : node的框架
5. express-art-template : 基于express的art-template 引擎
6. jsonwebtoken : 前后台分离必要的token 生成工具(本项目没有用)
7. log4js : nodejs的日志管理工具
8. md5 : md5加密
9. mysql : mysql 数据库
10. svg-captcha : 后端生成验证码
11. weiyao-jasmine-mysql : 个人封装的mysql连接包,几乎0配置


#### 说明
用到的sql文件在项目中,当下数据库在阿里云服务器上运行,直接`yarn run dev`
或者`npm run dev` 即可运行


#### 项目功能

- 开发了用户的登录/注册
- 开启了POST请求的crsf防护
- 应用了个人封装的mysql连接库
- 熟悉了art-template的render方式
- 对nodejs前后台对接有了直观的描述,可以做一些基于node的crud等实战
- 对nodejs高度抽离成模块化更加直观


