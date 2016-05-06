// 模块 =================================================
var express        = require('express');
var app            = express();
//var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// 配置 ===========================================

// 配置文件
//var db = require('./config/db');

var port = process.env.PORT || 8080; // 设置端口号
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
//app.use(bodyParser.json()); // parse application/json
//app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

//app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// 路由 ==================================================
require('./app/routes')(app); // pass our application into our routes

// 启动app ===============================================
app.listen(port);
console.log('端口已启动：' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
