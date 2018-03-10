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
            var selectSQL= "select * from fabook_user WHERE runoob_id='"+queryId+"';";
            conn.query(selectSQL,function(err,result){
                res.send(result)
                //释放连接
                conn.release();
            });
        }
    });
});

module.exports = router;
