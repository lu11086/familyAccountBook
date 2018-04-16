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

// 个人信息查询
router.post('/getSingleData', function(req, res, next) {
    var myId = req.body.id;
    var minDate = req.body.month;
    var data = {};
    data.data = {};
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }else {
            var selectSQL1 = 'select * from fabook_account_now_month ' +
                'where fabook_account_user_id = ' + myId + ' ' +
                '&& fabook_account_date BETWEEN "' + minDate + '" AND NOW();';
            conn.query(selectSQL1, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    if(result.length > 0) {
                        data.data = result;
                    } else {
                        data.data = []
                    }
                    data.msg = 'success';
                    res.send(data);
                    //释放连接
                    conn.release();
                }
            });
        }
    });
});

// 家庭组信息查询
router.post('/getFamilyData', function(req, res, next) {
    var myId = req.body.id;
    var minDate = req.body.month;
    var data = {};
    data.data = {};
    var isEnd = 0;
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
                    if(result.length > 0) {
                        data.data.sumIncome = result[0].income;
                        data.data.sumPay = result[0].pay;
                    } else {
                        data.data.sumIncome = 0;
                        data.data.sumPay = 0;
                    }
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
                    data.data.echartDataList = [];
                    for (var i in result) {
                        if (i < 5) {
                            data.data.echartDataList.push(result[i]);
                        }
                    }
                    endIt();
                }
            });
            var selectSQL3 = 'select fabook_account_title as title, fabook_account_pay as pay from fabook_account_now_month ' +
                'where fabook_account_family_id = ' + myId + ' ' +
                '&& fabook_account_is_pay = 1 ' +
                '&& fabook_account_date BETWEEN "' + minDate + '" AND NOW() ORDER BY cast(pay as DECIMAL) DESC;';
            conn.query(selectSQL3, function (err, result) {
                if (err) {
                    console.log(err)
                } else {
                    data.data.payList = [];
                    for (var i in result) {
                        if (i < 3) {
                            data.data.payList.push(result[i])
                        }
                    }
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
