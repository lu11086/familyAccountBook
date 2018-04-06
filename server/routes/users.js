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
            var selectSQL= "select fabook_tel,fabook_email from fabook_user WHERE "+registerType+"='"+username+"';";
            conn.query(selectSQL,function(err,result){
                var data = {}
                if(result.length > 0) {
                    data.msg = 'error'
                    data.msgText = '该'+msgType+'已经被占用！'
                    res.send(data)
                }else{
                    var registerSQL= 'INSERT INTO fabook_user (fabook_name, fabook_sex, fabook_sysKey, '+registerType+', header_img, family_admin, fixed_income, fixed_pay, red_line, create_date) ' +
                        'VALUES ("'+username+'", "0", "'+password+'", "'+username+'", "6", "0", "0", "0", "80%", NOW());';
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
                        delete data.data[0].fabook_sysKey
                        delete data.data[0].create_date
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

//修改用户信息
router.post('/changeInfo', function(req, res, next) {
    var userId = req.body.userId;
    var username = req.body.username;
    var headerImg = req.body.headerImg;
    var sexNum = req.body.sexNum;
    var userRemark = req.body.userRemark;
    var question = req.body.question;
    var answer = req.body.answer;
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }else{
            var updateSQL = 'UPDATE fabook_user SET ' +
                'fabook_name = "'+username+'", ' +
                'header_img = "'+headerImg+'", ' +
                'fabook_sex = "'+sexNum+'", ' +
                'fabook_remark = "'+userRemark+'", ' +
                'remember_question = "'+question+'", ' +
                'remember_answer = "'+answer+'" ' +
                'WHERE fabook_id = "'+userId+'"';
            conn.query(updateSQL,function(err,result){
                if(err){
                    console.log(err)
                }else{
                    var backInfo = {}
                    backInfo.msg = 'success'
                    res.send(backInfo)
                }
                //释放连接
                conn.release();
            });
        }
    });
});

//修改用户红线
router.post('/changeRedLine', function(req, res, next) {
    var userId = req.body.userId;
    var redLine = req.body.redLine.toString();
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }else{
            var updateSQL = 'UPDATE fabook_user SET red_line = "'+redLine+'" WHERE fabook_id = "'+userId+'"';
            conn.query(updateSQL,function(err,result){
                if(err){
                    console.log(err)
                }else{
                    var backInfo = {}
                    backInfo.msg = 'success'
                    res.send(backInfo)
                }
                //释放连接
                conn.release();
            });
        }
    });
});

//修改用户固定收支
router.post('/changeFixedCtrl', function(req, res, next) {
    var userId = req.body.userId;
    var fixedIncome = req.body.fixedIncome;
    var fixedPay = req.body.fixedPay;
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }else{
            var updateSQL = 'UPDATE fabook_user SET fixed_income = "'+fixedIncome+'", fixed_pay = "'+fixedPay+'" WHERE fabook_id = "'+userId+'"';
            conn.query(updateSQL,function(err,result){
                if(err){
                    console.log(err)
                }else{
                    var backInfo = {}
                    backInfo.msg = 'success'
                    res.send(backInfo)
                }
                //释放连接
                conn.release();
            });
        }
    });
});

//查询密保问题
router.post('/checkQuestion', function(req, res, next) {
    var username = req.body.username;
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
            var selectSQL= "select fabook_tel,fabook_email from fabook_user WHERE "+registerType+"='"+username+"';";
            conn.query(selectSQL,function(err,result){
                var data = {}
                if(result.length > 0) {
                    var selectQuestion= "select remember_question, fabook_id from fabook_user WHERE "+registerType+"='"+username+"';";
                    conn.query(selectQuestion,function(err,result){
                        var backInfo = {}
                        backInfo.msg = 'success'
                        backInfo.fabook_id = result[0].fabook_id
                        backInfo.remember_question = result[0].remember_question
                        res.send(backInfo)
                    });
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

//查询密保答案是否正确
router.post('/checkForgetAnswer', function(req, res, next) {
    var userId = req.body.userId;
    var answer = req.body.answer;
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }else{
            var selectSQL= 'select remember_answer from fabook_user WHERE fabook_id = "'+userId+'"';
            conn.query(selectSQL,function(err,result){
                if(err){
                    console.log(err)
                }else{
                    var backInfo = {}
                    if (result[0].remember_answer.trim() == answer.trim()) {
                        var selectPwd= 'select fabook_sysKey from fabook_user WHERE fabook_id = "'+userId+'"';
                        conn.query(selectPwd,function(error,returnMsg){
                            if(error){
                                console.log(error)
                            }else {
                                backInfo.msgText = '回答正确！请牢记密码'
                                backInfo.password = returnMsg[0].fabook_sysKey
                                res.send(backInfo)
                            }
                        });
                    } else {
                        backInfo.msgText = '回答错误请重试'
                        res.send(backInfo)
                    }
                }
                //释放连接
                conn.release();
            });
        }
    });
});

module.exports = router;
