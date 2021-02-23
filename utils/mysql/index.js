const {handleDB,orm,orm_config} = require("weiyao-jasmine-mysql");

orm_config.host = "47.102.123.200" //连接阿里服务器
orm_config.port = '3306'; //开放端口
orm_config.user = 'root'; //用户名
orm_config.password = 'root57' //密码
orm_config.database ='news'; //数据库名字

//配置原文件
orm.connect(orm_config);

let handle = handleDB;
//导出接口
module.exports = handle