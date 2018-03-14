var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({  //连接池
    host:'localhost',
    user:'root',
    password:'123456',
    port:'3306',
    database:'fabook'  //数据库名称
})

//用户注册
router.post('/register', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var registerType = '';
    var msgType = '';
    if (username.indexOf('@') > -1) {
        registerType = 'fabook_email';
        msgType = '邮箱'
    } else {
        registerType = 'fabook_tel'
        msgType = '手机号'
    }
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }else{
            var selectSQL= "select * from fabook_user WHERE "+registerType+"='"+username+"';";
            conn.query(selectSQL,function(err,result){
                var data = {}
                if(result.length > 0) {
                    data.msg = 'error'
                    data.msgText = '该'+msgType+'已经被占用！'
                    res.send(data)
                }else{
                    var registerSQL= 'INSERT INTO fabook_user (fabook_name, fabook_sex, fabook_sysKey, '+registerType+', create_date) VALUES ("'+username+'", "0", "'+password+'", "'+username+'", NOW());';
                    conn.query(registerSQL,function(err,result){
                        var backInfo = {}
                        backInfo.msg = 'success'
                        res.send(backInfo)
                    });
                }
                //释放连接
                conn.release();
            });
        }
    });
});

//用户登录
router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var registerType = '';
    var msgType = '';
    if (username.indexOf('@') > -1) {
        registerType = 'fabook_email';
        msgType = '邮箱'
    } else {
        registerType = 'fabook_tel'
        msgType = '手机号'
    }
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }else{
            var selectSQL= "select * from fabook_user WHERE "+registerType+"='"+username+"';";
            conn.query(selectSQL,function(err,result){
                var data = {}
                if(result.length > 0) {
                    if(result[0].fabook_sysKey == password) {
                        data.msg = 'success'
                        data.data = result
                        res.send(data)
                    } else {
                        data.msg = 'error'
                        data.msgText = '密码错误！'
                        res.send(data)
                    }
                }else{
                    data.msg = 'error'
                    data.msgText = '该'+msgType+'不存在！'
                    res.send(data)
                }
                //释放连接
                conn.release();
            });
        }
    });
});

module.exports = router;
