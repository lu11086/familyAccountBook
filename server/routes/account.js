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

//新建记录
router.post('/newAccount', function(req, res, next) {
    var title = req.body.title;
    var isPay = req.body.isPay;
    var type = req.body.type;
    var amount = req.body.amount;
    var time = req.body.time;
    var remark = req.body.remark;
    var id = req.body.id;
    var name = req.body.name;
    var family = req.body.family;
    var now = new Date().getTime();
    var accountId = id + now.toString();
    var pay, income;
    if (isPay > 0) {
        pay = amount;
        income = 0;
    } else {
        pay = 0;
        income = amount;
    }
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }else{
            var insertSQL= 'INSERT INTO fabook_account_now_month ' +
                '(fabook_account_id, fabook_account_title, fabook_account_is_pay, fabook_account_type, fabook_account_remark, fabook_account_income, fabook_account_pay, fabook_account_user_id, fabook_account_user_name, fabook_account_family_id, fabook_account_date, create_date)' +
                ' VALUES ' +
                '("'+accountId+'", "'+title+'", "'+isPay+'", "'+type+'", "'+remark+'", "'+income+'","'+pay+'", "'+id+'", "'+name+'", "'+family+'", "'+time+'", NOW());';
            conn.query(insertSQL,function(err,result){
                if(err){
                    console.log(err)
                }else{
                    var backInfo = {};
                    backInfo.msg = 'success';
                    res.send(backInfo)
                }
                //释放连接
                conn.release();
            });
        }
    });
});

//筛选收支记录
router.post('/filterAccountList', function(req, res, next) {
    var postType = req.body.post;
    var myId = req.body.id;
    var isType = req.body.type;
    var payType = req.body.pay;
    var incomeType = req.body.income;
    var minAmount = req.body.minA;
    var maxAmount = req.body.maxA;
    var myMinDate = new Date(parseInt(req.body.minD))
    var minDate = myMinDate.getFullYear() + '-' + dealZero(myMinDate.getMonth() + 1) + '-' + dealZero(myMinDate.getDate())
    var myMaxDate = new Date(parseInt(req.body.maxD))
    var maxDate = myMaxDate.getFullYear() + '-' + dealZero(myMaxDate.getMonth() + 1) + '-' + dealZero(myMaxDate.getDate())
    function dealZero(index) {
        if (index < 10) {
            return ('0' + index.toString())
        } else {
            return index
        }
    }
    var idOfSQL = '';
    if (postType == 'user') idOfSQL = 'fabook_account_user_id';
    if (postType == 'family') idOfSQL = 'fabook_account_family_id';
    var chooseSQL = '';
    if (isType != 2) {
        chooseSQL += '&& fabook_account_is_pay = "'+isType+'" ';
        if (isType == 0) {
            if (incomeType != 100) chooseSQL += '&& fabook_account_type = "'+incomeType+'" ';
            chooseSQL += '&& fabook_account_income BETWEEN '+minAmount+' AND '+maxAmount+' ';
        } else if (isType == 1){
            if (payType != 200) chooseSQL += '&& fabook_account_type = "'+payType+'" ';
            chooseSQL += '&& fabook_account_pay BETWEEN '+minAmount+' AND '+maxAmount+' ';
        }
    } else {
        chooseSQL += '&& ((fabook_account_is_pay = 0 && fabook_account_income BETWEEN '+minAmount+' AND '+maxAmount+') OR (fabook_account_is_pay = 1 && fabook_account_pay BETWEEN '+minAmount+' AND '+maxAmount+')) ';
    }
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }else{
            var selectSQL = 'select sum(fabook_account_income) AS income, sum(fabook_account_pay) AS pay, fabook_account_date AS date from fabook_account_now_month ' +
                'where ' + idOfSQL + ' = '+myId+' ' +
                '&& fabook_account_date BETWEEN "'+minDate+'" AND "'+maxDate+'" ' +
                'GROUP BY date ORDER BY date DESC;';
            conn.query(selectSQL,function(err,result){
                if(err){
                    console.log(err)
                }else{
                    var isEnd = result.length;
                    var index = 0;
                    var data = {};
                    data.msg = 'success';
                    data.data = result;
                    for (var i in data.data) {
                        var selectDate = 'select fabook_account_id, fabook_account_title, fabook_account_is_pay, fabook_account_pay, fabook_account_income from fabook_account_now_month ' +
                            'where ' + idOfSQL + ' = '+myId+' ' +
                            '&& fabook_account_date = "'+data.data[i].date+'" ' +
                            chooseSQL +
                            'ORDER BY fabook_account_date DESC;';
                        conn.query(selectDate,function(errDate,resultDate){
                            if(errDate){
                                console.log(errDate)
                            }else{
                                data.data[index].data = resultDate;
                                isEnd --;
                                index ++;
                                end()
                            }
                        })
                    }
                    function end() {
                        if (isEnd == 0) res.send(data)
                    }
                }
                //释放连接
                conn.release();
            });
        }
    });
});

//获得收支详情
router.post('/getDetail', function(req, res, next) {
    var accountId = req.body.id;
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }else{
            var selectSQL = 'select * from fabook_account_now_month where fabook_account_id = "'+accountId+'";';
            conn.query(selectSQL,function(err,result){
                if(err){
                    console.log(err)
                }else{
                    var backInfo = {};
                    backInfo.msg = 'success';
                    backInfo.data = {};
                    backInfo.data.fabook_record_title = result[0].fabook_account_title;
                    backInfo.data.fabook_record_pay = result[0].fabook_account_is_pay;
                    backInfo.data.fabook_record_type = result[0].fabook_account_type;
                    if (result[0].fabook_account_is_pay == 0) backInfo.data.fabook_record_amount = result[0].fabook_account_income;
                    if (result[0].fabook_account_is_pay == 1) backInfo.data.fabook_record_amount = result[0].fabook_account_pay;
                    backInfo.data.fabook_record_time = result[0].fabook_account_date;
                    backInfo.data.fabook_record_remark = result[0].fabook_account_remark;
                    backInfo.data.fabook_user_id = result[0].fabook_account_user_id;
                    backInfo.data.fabook_user_name = result[0].fabook_account_user_name;
                    res.send(backInfo)
                }
                //释放连接
                conn.release();
            });
        }
    });
});

//删除收支详情
router.post('/deleteDetail', function(req, res, next) {
    var accountId = req.body.id;
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }else{
            var selectSQL = 'delete from fabook_account_now_month where fabook_account_id = "'+accountId+'";';
            conn.query(selectSQL,function(err,result){
                if(err){
                    console.log(err)
                }else{
                    var backInfo = {};
                    backInfo.msg = 'success';
                    res.send(backInfo)
                }
                //释放连接
                conn.release();
            });
        }
    });
});


//查询支出数据（周/月/季度）以方便对比
router.post('/getContrastData', function(req, res, next) {
    var myId = req.body.id;
    var minDate = req.body.minD;
    var oldDS = req.body.oldDS;
    var oldDE = req.body.oldDE;
    var data = {};
    data.data = {};
    var isEnd = 0;
    var isForEnd = 0;
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }else {
            var selectSQL1 = 'select sum(fabook_account_income) AS income, sum(fabook_account_pay) AS pay from fabook_account_now_month ' +
                'where fabook_account_family_id = ' + myId + ' ' +
                '&& fabook_account_date BETWEEN "' + minDate + '" AND NOW();';
            conn.query(selectSQL1, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    data.data.sumIncome = result[0].income;
                    data.data.sumPay = result[0].pay;
                    endIt();
                }
            });
            var selectSQL2 = 'select sum(fabook_account_pay) as pay, fabook_account_type AS type from fabook_account_now_month ' +
                'where fabook_account_family_id = ' + myId + ' ' +
                '&& fabook_account_date BETWEEN "' + minDate + '" AND NOW() ' +
                '&& fabook_account_is_pay = 1 ' +
                'GROUP BY type ORDER BY pay DESC;';
            conn.query(selectSQL2, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    data.data.pieDataList = [];
                    data.data.barDataList = [];
                    for (var i in result) {
                        if (i < 5) data.data.barDataList.push(result[i])
                        data.data.pieDataList.push(result[i]);
                    }
                    for (var i in data.data.barDataList) {
                        var selectSQLBar = 'select fabook_account_type AS type, sum(fabook_account_pay) AS pay from fabook_account_now_month ' +
                            'where fabook_account_family_id = ' + myId + ' ' +
                            '&& fabook_account_type = "' + data.data.barDataList[i].type + '" ' +
                            '&& fabook_account_date BETWEEN "' + oldDS + '" AND "' + oldDE + '";';
                        conn.query(selectSQLBar, function (err, result) {
                            if (err) {
                                console.log(err)
                            } else {
                                for (var j in data.data.barDataList) {
                                    if (data.data.barDataList[j].type == result[0].type) {
                                        data.data.barDataList[j].old = result[0].pay
                                    }
                                }
                                endFor();
                            }
                        });
                    }
                    function endFor() {
                        isForEnd++;
                        if (isForEnd == data.data.barDataList.length) {
                            endIt();
                        }
                    }
                }
            });
            var selectSQL3 = 'select sum(fabook_account_income) AS income, sum(fabook_account_pay) AS pay from fabook_account_now_month ' +
                'where fabook_account_family_id = ' + myId + ' ' +
                '&& fabook_account_date BETWEEN "' + oldDS + '" AND "' + oldDE + '";';
            conn.query(selectSQL3, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    data.data.oldIncome = result[0].income;
                    data.data.oldPay = result[0].pay;
                    endIt();
                }
            });

            function endIt() {
                isEnd++;
                if (isEnd == 3) {
                    console.log(data)
                    data.msg = 'success';
                    res.send(data)
                    //释放连接
                    conn.release();
                }
            }
        }
    });
});

module.exports = router;
