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

/* GET home page. */
router.post('/singleData',
    function(req, res, next) {
    var queryId = req.body.id;
    pool.getConnection(function(err,conn){
        if(err){
         console.log(err)
        }else{
            var selectSQL= "select * from fabook_user WHERE fabook_id='"+queryId+"';";
            conn.query(selectSQL,function(err,result){
                var data = {}
                data.data = result
                if(result.length > 0) {
                    data.msg = 'success'
                    res.send(data)
                }else{
                    data.msg = 'error'
                    res.send(data)
                }
                //释放连接
                conn.release();
            });
        }
    });
});

module.exports = router;
