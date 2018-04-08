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
    var familyId = req.body.id;
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }else{
            var selectSQL = 'select sum(fabook_account_income) AS income, sum(fabook_account_pay) AS pay, fabook_account_date AS date from fabook_account_now_month ' +
                'where fabook_account_date BETWEEN "2018-03-01" AND "2018-04-30" ' +
                '&& fabook_account_family_id = '+familyId+' GROUP BY date ORDER BY date DESC;';
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
                        var selectDate = 'select * from fabook_account_now_month ' +
                            'where fabook_account_date = "'+data.data[i].date+'" ' +
                            '&& fabook_account_family_id = '+familyId+' ORDER BY fabook_account_date DESC;'
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

module.exports = router;
