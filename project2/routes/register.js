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
router.get('/', function(req, res) {
  res.render('register');
});

router.post('/', function(req, res) {

  var name = req.body.name;

  var member = {
    name: name,
    pwd: req.body.pwd,
    phone: req.body.phone,
    email: req.body.email
  };

  pool.query('insert into member SET ?', [member], function(err){
    if(err) throw err;
    console.log(name + ' register mew member ');
    res.render('index');
  });

});

module.exports = router;
