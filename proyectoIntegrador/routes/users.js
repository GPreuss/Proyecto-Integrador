var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Express' });
});
router.get('/profile-edit', function(req, res, next) {
  res.render('profile-edit', { title: 'Express' });
});

module.exports = router;
