var express = require('express');
var router = express.Router();

/* GET users listing. */
//登出 清除cookie並回到使用者登入頁面
router.get('/', function(req, res, next) {
  console.log(req.signedCookies.Name + ' logout');
  res.clearCookie('Name');
  res.render('index');
});

module.exports = router;
