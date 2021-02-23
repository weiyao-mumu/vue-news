const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
//cookie-session模块
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
//路由模块
const indexRouter = require('./routes/index');
const passPortJs = require('./routes/passportjs');
const detailRouter = require('./routes/detail');
//日志模块
const {useLogger} = require('./utils/log4js/index');

//秘钥模块
const keys = require('./utils/keys/keys');
const {csrfProtect} = require('./utils/csrf/index');

//用户模块
const {getUser} = require('./utils/user/index');

let appConfig = (app,port)=>{
//指定静态文件的文件夹
  app.use(express.static('public'));
//关于post请求的配置
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

//注册cookie和session
  app.use(cookieParser());
  app.use(cookieSession({
    name:'my_session',
    keys:[keys.session_key],
    maxAge:1000*60*60*24    //一天
  }));
// 关于模板的配置信息
  app.engine('html', require('express-art-template'));
  app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
  });
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'html');

//路由中间件
  app.use(csrfProtect,indexRouter);
  app.use(csrfProtect,passPortJs);
  app.use(csrfProtect,detailRouter);
  app.use( (req,res)=>{
    //查看用户是否登录
    (async function () {
      const result = await getUser(req,res);
      let data = {
        user_info:result[0]?{
          nick_name: result[0].nick_name,
          avatar_url: result[0].avatar_url,
        }:false,
      }
      res.render('news/404')
    })()

  })
//  注册组件
useLogger(app);



  //监听端口号
  app.listen(port,()=>{
    console.log(`${port} on loading`);
  })
}


module.exports = appConfig;