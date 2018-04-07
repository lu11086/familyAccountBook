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

//新建家庭组
router.post('/createFamily', function(req, res, next) {
    var familyName = req.body.name;
    var userListJson = req.body.userList;
    var userList = userListJson.split(';');
    var familyRemark = req.body.remark;
    var isRight = 0;
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }else{
            for (var i = 0; i < userList.length - 1; i++) {
                var selectSQL;
                if (userList[i].indexOf('@') > -1) {
                    selectSQL= "select fabook_email, family_id from fabook_user WHERE fabook_email ='"+userList[i]+"';";
                } else {
                    selectSQL= "select fabook_tel, family_id from fabook_user WHERE fabook_tel ='"+userList[i]+"';";
                }
                conn.query(selectSQL,function(err,result){
                    var data = {}
                    if(result.length == 0) {
                        data.msg = 'error';
                        data.msgText = '用户不存在！请检查是否拼对！';
                        res.send(data)
                    }else {
                        if (result[0].family_id != null) {
                            data.msg = 'error';
                            if (result[0].fabook_tel) data.msgText = result[0].fabook_tel + '已经在别的家庭组！';
                            if (result[0].fabook_email) data.msgText = result[0].fabook_email + '已经在别的家庭组！';
                            res.send(data);
                            conn.release();
                        } else {
                            isRight++;
                            insertFamily();
                        }
                    }
                });
            }
        }
    });
    function insertFamily() {
        if (isRight == (userList.length - 1)) {
            pool.getConnection(function(err,conn){
                if(err){
                    console.log(err)
                }else{
                    var registerSQL= 'INSERT INTO fabook_family (fabook_family_name, fabook_family_member, fabook_family_remark, fabook_family_notice, fabook_family_red_line, fabook_family_plan, create_date) ' +
                        'VALUES ("'+familyName+'", "'+userListJson+'", "'+familyRemark+'", "暂无公告", "80%", "default", NOW())';
                    conn.query(registerSQL,function(err,result){
                        var backInfo = {};
                        var checkSQL= 'SELECT MAX(fabook_family_id) FROM fabook_family;';
                        conn.query(checkSQL,function(err,result){
                            for (var i = 0; i < userList.length - 1; i++) {
                                var updateSQL;
                                if (userList[i].indexOf('@') > -1) {
                                    updateSQL = 'UPDATE fabook_user SET family_id = "'+result[0]['MAX(fabook_family_id)']+'" WHERE fabook_email = "'+userList[i]+'"';
                                    if (i == 0) updateSQL = 'UPDATE fabook_user SET family_id = "'+result[0]['MAX(fabook_family_id)']+'", family_admin="1" WHERE fabook_email = "'+userList[i]+'"';
                                } else {
                                    updateSQL = 'UPDATE fabook_user SET family_id = "'+result[0]['MAX(fabook_family_id)']+'" WHERE fabook_tel = "'+userList[i]+'"';
                                    if (i == 0) updateSQL = 'UPDATE fabook_user SET family_id = "'+result[0]['MAX(fabook_family_id)']+'", family_admin="1" WHERE fabook_tel = "'+userList[i]+'"';
                                }
                                conn.query(updateSQL,function(err,result){});
                            }
                        });
                        backInfo.msg = 'success';
                        res.send(backInfo)
                    });
                }
                conn.release();
            });
        }
    }
});

//检查用户是否存在于家庭组中
router.post('/checkFamily', function(req, res, next) {
    var userId = req.body.userId;
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }else{
            var selectSQL = 'select family_id from fabook_user WHERE fabook_id ="'+ userId + '";'
            conn.query(selectSQL,function(err,result){
                if(err){
                    console.log(err)
                }else{
                    var backInfo = {};
                    backInfo.msg = 'success';
                    backInfo.family_id = null;
                    if (result[0].family_id != null) backInfo.family_id = result[0].family_id;
                    res.send(backInfo)
                }
                //释放连接
                conn.release();
            });
        }
    });
});

//获取家庭组相关信息
router.post('/getFamilyInfo', function(req, res, next) {
    var familyId = req.body.id;
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }else{
            var selectSQL = 'select * from fabook_family WHERE fabook_family_id ="'+ familyId + '";'
            conn.query(selectSQL,function(err,result){
                if(err){
                    console.log(err)
                }else{
                    var data = {};
                    data.msg = 'success'
                    data.data = result[0]
                    delete data.data.create_date
                    res.send(data)
                }
                //释放连接
                conn.release();
            });
        }
    });
});


//修改家庭组信息
router.post('/changeFamily', function(req, res, next) {
    var familyId = req.body.id;
    var familyName = req.body.name;
    var userListJson = req.body.userList;
    var userList = userListJson.split(';');
    var familyRemark = req.body.remark;
    var notice = req.body.notice;
    var isRight = 0;
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }else{
            for (var i = 0; i < userList.length - 1; i++) {
                var selectSQL;
                if (userList[i].indexOf('@') > -1) {
                    selectSQL= "select fabook_email, family_id from fabook_user WHERE fabook_email ='"+userList[i]+"';";
                } else {
                    selectSQL= "select fabook_tel, family_id from fabook_user WHERE fabook_tel ='"+userList[i]+"';";
                }
                conn.query(selectSQL,function(err,result){
                    var data = {}
                    if(result.length == 0) {
                        data.msg = 'error';
                        data.msgText = '用户不存在！请检查是否拼对！';
                        res.send(data)
                    }else {
                        if (result[0].family_id != null && result[0].family_id != familyId) {
                            data.msg = 'error';
                            if (result[0].fabook_tel) data.msgText = result[0].fabook_tel + '已经在别的家庭组！';
                            if (result[0].fabook_email) data.msgText = result[0].fabook_email + '已经在别的家庭组！';
                            res.send(data);
                            conn.release();
                        } else {
                            isRight++;
                            insertFamily();
                        }
                    }
                });
            }
        }
    });
    function insertFamily() {
        if (isRight == (userList.length - 1)) {
            pool.getConnection(function(err,conn){
                if(err){
                    console.log(err)
                }else{
                    var updateSQL = 'UPDATE fabook_family SET ' +
                        'fabook_family_name = "'+familyName+'", ' +
                        'fabook_family_member = "'+userListJson+'", ' +
                        'fabook_family_remark = "'+familyRemark+'", ' +
                        'fabook_family_notice = "'+notice+'" ' +
                        'WHERE fabook_family_id = "'+familyId+'"';
                    conn.query(updateSQL,function(err,result){
                        if(err){
                            console.log(err)
                        }else{
                            var backInfo = {};
                            for (var i = 0; i < userList.length - 1; i++) {
                                var updateSQL;
                                if (userList[i].indexOf('@') > -1) {
                                    updateSQL = 'UPDATE fabook_user SET family_id = "'+familyId+'" WHERE fabook_email = "'+userList[i]+'"';
                                } else {
                                    updateSQL = 'UPDATE fabook_user SET family_id = "'+familyId+'" WHERE fabook_tel = "'+userList[i]+'"';
                                }
                                conn.query(updateSQL,function(err,result){});
                            }
                            backInfo.msg = 'success';
                            res.send(backInfo)
                        }
                        //释放连接
                        conn.release();
                    });
                }
            });
        }
    }
});

module.exports = router;
