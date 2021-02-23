const handleDB = require('../mysql/index');
async function getUser(req,res) {
  //判断是否登录
  //从session中获取user_id
  let user_id = req.session['user_id'];
  // console.log(user_id);
  //如果存在
  let result=[];
  if(user_id){
    //  如果已经获取到user_id;
    result = await handleDB(res,'info_user','find',"查询数据库出错",`id='${user_id}'`);
    //  result 是个数组[{···}] 、[];
  }

  return  result;
}

module.exports = {
  getUser
}