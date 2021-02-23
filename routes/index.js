const router = require('express').Router();
const handleDB = require('../utils/mysql/index');
const filters = require('../utils/filters/index');
const {getUser} = require('../utils/user/index');
//首页
router.get('/',(req,res)=>{
  (async function () {
    //访问首页，处理右上角是否登录的展示问题
    //判断是否登录
    let result = await getUser(req,res);

  //  展示首页分类信息
  let result2 = await  handleDB(res,'info_category','find','查询数据错误',['name']);

  //  展示右侧点击排行榜
  // let result3 = await handleDB(res,'info_news','sql','查询数据库出错',"select * from info_news order by clicks desc limit 6")
  let result3 = await handleDB(res,'info_news','find','查询数据库出错',"1 order by clicks desc limit 6")

  //  把信息传到模板中去
    let data = {
      user_info:result[0]?{
        nick_name: result[0].nick_name,
        avatar_url: result[0].avatar_url,
      }:false,
      category:result2,
      newsClick:result3,
    }

    res.render("news/index",data);
  })()
})


router.get('/news_list',(req,res)=>{
  (async function () {
    //获取参数，判空
    let {cid=1,page=1,per_page=5} =  req.query;
//  查询数据库,获取前端想要的数据
    let a = cid==1? 1 :`category_id =${cid}`;

    let result = await handleDB(res,'info_news','limit','数据库查询错误',
        {where:`${a} order by create_time desc`,
          number:page,
          count:per_page});

//    求总页数totalPage
    let result2 = await handleDB(res,'info_news','sql','数据库查询错误',
      "select count(*) from info_news where "+a);

      let totalPage =Math.ceil(result2[0]['count(*)']/per_page);

//  把查询到的新闻结合返回到前端
    res.send({
      newsList:result,
      totalPage:totalPage,
      currentPage:Number(page)
    })
  })()

});

module.exports = router;
