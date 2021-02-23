## 封装了nodemysql模块
## The nodemysql module is encapsulated

## 依赖(Dependent module)

- mysql

## 用法(usage)

```js
const {handleDB,orm,orm_config} = require('weiyao-jasmine-mysql');
const express = require('express');
// 连接测试数据库
let app = express();

// 配置数据库
orm_config.host ='127.0.0.1'   //默认为 localhost
orm_config.port = '3306'         //默认为 3306
orm_config.user = 'root';      //默认为 root
orm_config.password = 'root57'; //默认为root57
orm_config.database ='homework';  //默认为test


//  配置到源文件中
orm.connect(orm_config);




app.get('/',(req,res)=>{
  // 查询数据库
  (async function(){

      let a = await handleDB(res, "vegetables", "find", "查询数据库出错",["vsname"]);

      res.send(a);
  })()

})

app.listen(3000,()=>{
  console.log('3000 on loading');
})

```

## 介绍(introduce)

>本 npm 包 结合了ES6的async+await语法和数据库的orm模型
This NPM package combines the async + await syntax of ES6 with ORM model of database

```js
  res: 返回结果,
  vegetables: 表名
  find: 查询语句
  查询数据库出错: 错误返回信息
  ["vsname"] : 条件字段(非必填)
  let a = await handleDB(res, "vegetables", "find", "查询数据库出错",["vsname"]);
```

## 案例(case)

+ 查询全部
```js
(async function(){

    let a = await handleDB(res, "vegetables", "find", "查询数据库出错",["vsname"]);

    res.send(a);
})()
```
+ 查询一个字段或多个字段

```js
(async function(){

    let a = await handleDB(res, "vegetables", "find", "查询数据库出错",["vsname"]);

    res.send(a);
})()
```

+ 查询限制

```js
(async function(){

  let wh = cid==1?"1":`category_id=${cid}`;
  let a = await handleDB(res, "info_news", "limit", "数据库查询出错",
          {where: `${wh} order by create_time desc`,
          number:page,
          count:per_page
      })

    res.send(a);
})()
```
+ 自定义sql

```js
(async function(){

  let wh = cid==1?"1":`category_id=${cid}`;
   let result2 = await handleDB(res, "info_news", "sql", "数据库查询出错", "select count(*) from info_news where " + wh)  // 计算总条数

    res.send(a);
})()
```
