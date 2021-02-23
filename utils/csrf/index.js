//生成随机字符串
function getRandomString(n){
  var str="";
  while(str.length<n){
    str+=Math.random().toString(36).substr(2);
  }
  return str.substr(str.length-n)
}

function csrfProtect(req, res, next){
  let method = req.method
  if(method=="GET"){
    let csrf_token = getRandomString(48);
    res.cookie('csrf_token', csrf_token);
    next() //执行跳转到下一个函数执行，即app.use(beforeReq,router)中的下一个
  }else if(method=="POST"){
    // 判断响应头中的x-csrftoken值，和cookies中的csrf_token进行对比
    console.log(req.headers["x-csrftoken"]);
    console.log(req.cookies["csrf_token"]);

    if((req.headers["x-csrftoken"] === req.cookies["csrf_token"])){
      console.log("csrf验证通过！");
      next()
    }else{
      res.send({errmsg:"csrf验证不通过!！"});
      return
    }
  }
}

module.exports={
  csrfProtect
}