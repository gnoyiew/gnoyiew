var express = require('express');
var router = express.Router();
const mysql = require('mysql');

const pool = mysql.createPool({
  host: '120.118.214.43',
  user: 'gnoy',
  password: 'gnoy',
  port: '3306',
  database: 'registered'
});

router.post('/', function(req, res) {
  var p1 = req.body.photo1;
  var p2 = req.body.photo2;
  var p3 = req.body.photo3;
  
  var sql = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    photo1:req.body.photo1,
    photo2:req.body.photo2,
    photo3:req.body.photo3
  }
  pool.query('insert into data set ?',[sql],function(err){
    if(err) throw err;
  })
  res.render('index');
});

module.exports = router;
