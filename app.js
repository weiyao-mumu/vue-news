const express = require('express');
const  appConfig = require("./config");

const app = express();
//配置入口文件
appConfig(app,3000);







