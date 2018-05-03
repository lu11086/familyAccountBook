var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({  //连接池
    host:'localhost',
    user:'root',
    password:'123456',
    port:'3306',
    database:'xxlPost'  //数据库名称
})

//测试get
router.get('/getTest', function(req, res, next) {
    res.send('There is xxl-post test!');
});

//测试post
router.post('/postTest', function(req, res, next) {
    var id = req.body.id;
    res.send('The id is ' + id + '!');
});

//用户注册
router.post('/user/register', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }else{
            var selectSQL= "select user_name from xxl_user WHERE user_name ='"+username+"';";
            conn.query(selectSQL,function(err,result){
                var data = {}
                if(result.length > 0) {
                    data.msg = 'error'
                    data.msgText = '该邮箱地址已经被占用！'
                    res.send(data)
                }else{
                    var registerSQL= 'INSERT INTO xxl_user (user_name, user_sysKey, create_date) ' +
                        'VALUES ("'+username+'", "'+password+'", NOW());';
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
router.post('/user/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }else{
            var selectSQL= "select * from xxl_user WHERE user_name ='"+username+"';";
            conn.query(selectSQL,function(err,result){
                var data = {}
                if(result.length > 0) {
                    if(result[0].user_sysKey == password) {
                        data.msg = 'success'
                        data.data = result
                        delete data.data[0].user_sysKey
                        delete data.data[0].create_date
                        res.send(data)
                    } else {
                        data.msg = 'error'
                        data.msgText = '密码错误！'
                        res.send(data)
                    }
                }else{
                    data.msg = 'error'
                    data.msgText = '该用户不存在！'
                    res.send(data)
                }
                //释放连接
                conn.release();
            });
        }
    });
});

module.exports = router;
