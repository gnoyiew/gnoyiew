var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var appConfig = require('config');

const pool = mysql.createPool({
  host: appConfig.database.host,
  user: appConfig.database.user,
  password: appConfig.database.password,
  port: appConfig.database.port,
  database: appConfig.database.database
});

/* GET home page. */
router.post('/', function(req, res, next) {
  var name = req.body.name;
  var pwd = req.body.pwd;
  pool.query('select * from member where name=? and pwd=?', [name,pwd], function (err, results, rows) {
    if(err) throw err;
    if(results == '' || results[0].name != name || results[0].pwd != pwd) {
      res.render('index');
    }else{
      var id = results[0].id;
      console.log(results[0])
      console.log(id)
      pool.query("select * from activity where member1 = ? or member2 = ? or member3 = ? or member4 = ? or member5 = ?",[id,id,id,id,id], function(err, rows){
        if(err) throw err;
        console.log(rows)
        irows = rows;
        pool.query('select * from activity',function(err, rows){
          if(err) throw err;
          console.log('user ' + name + ' login');
          res.cookie('Name', name, { signed: true, maxAge: 6000000 });
          res.render('index2', { datas: irows,
                                adata: rows,
                                name: name });  
        });
      });
    }
    });
});

module.exports = router;
