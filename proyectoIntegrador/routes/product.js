var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) { 
  res.render('product', { title: 'Express' });
});
router.get('/add', function(req, res, next) {
  res.render('product-add', { title: 'Express' });
});

module.exports = router;