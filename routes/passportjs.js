const router = require('express').Router();
const Captcha = require('../utils/svg-captcha');
const handleDB = require('../utils/mysql/index');
const log4js = require('../utils/log4js/index');
const logger = log4js.getLogger();
const errLog = log4js.getLogger('err');
const md5 = require('md5');
const keys = require('../utils/keys/keys');

/**
 * @description 应用第三方模块svg-Captcha 完成;
 * TODO 验证码接口
 */
router.get('/passport/image_code/:code',(req,res)=>{
  const captchaObj = new Captcha();
  const code = captchaObj.getCode();
  // code.text  图片文本
  // code.data  图片验证码图片内容
  //将内容保存到session中
  req.session["ImageCode"]  =code.text.toLowerCase();
  // console.log(req.session["ImageCode"]);
  //注意：返回给浏览器的时候，需要设置响应头
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(code.data)
});

/*
* TODO 注册接口
*/
router.post("/passport/register",(req,res)=>{
  (async function () {
    let {username,image_code,password,agree} = req.body;

    if(!username || !image_code || !password || !agree){
      //缺少必传参数
      res.send({errmsg:"缺少必传参数"});
      return;
    }
//  验证用户输入的验证码是否正确(大小写都行)
    if(image_code.toLowerCase()!==req.session["ImageCode"]){
      res.send({errmsg:"图片验证码填写错误"});
      return;
    }
//  查询数据库是否注册了
    let result = await handleDB(res,"info_user","find","数据库查询出错",`username="${username}"`);
    // console.log(result);
    //如果result 有值
    if(result[0]){
      logger.info("用户已存在",result[0]);
      res.send({errmsg:"用户已存在"});
      return ;
    }
  //  增加数据
    let result2 = await handleDB(res,"info_user","insert","数据插入失败",{
       username,
       password_hash:md5(md5(password)+keys.md5_key),
       nick_name: username,
      last_login:new Date().toLocaleString()
    });
    // console.log(result2);
  //保持用户的登录状态
  req.session["user_id"]  = result2.insertId;

  res.send({errno:'0',errmsg:'注册成功'});
  })();
});

/*
* TODO 登录的接口
*/
router.post('/passport/login',(req,res)=>{
  (async function () {
    //  获取参数
    let {username,password} =req.body;
    //判断账号密码是否是空
    if(!username || !password){
      logger.error("账号密码未填写");
      res.json({errmsg:"账号密码未填写"});
      return ;
    }
    //查询数据库是否被注册了
    let result = await handleDB(res,"info_user","find","数据库查询出错",`username="${username}"`);
  // 没有被注册就结束
    if(!result[0]){
      logger.error("账号没有被注册,请注册");
      res.send({errmsg:'账号没有被注册,请注册'});
      return ;
    }
  //校验密码
    if(md5(md5(password)+keys.md5_key) !== result[0].password_hash) {
      logger.error("密码错误,登录失败,请重试");
      res.send({errmsg:'密码错误,登录失败,请重试'});
      return ;
    }

    //保持用户的登录状态
    req.session["user_id"]  = result[0].id;

    //更新用户登录时间last_login
    await  handleDB(res,"info_user","update","数据库修改输错",`id='${result[0].id}'`,{
      last_login:new Date().toLocaleString()
    });


    logger.info(result,'登录成功');
    res.send({errno:'0',errmsg:'登录成功'});
  })();
})

/*
*TODO 退出登录
*/
router.post('/passport/logout',(req,res)=>{
  //    退出登录
  delete req.session['user_id'];
  logger.info('退出成功');
  res.send({errno:'0',errmsg:'退出成功'})
})





module.exports = router;