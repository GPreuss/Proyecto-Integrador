var express = require('express');
var router = express.Router();
const controller = require('../controllers/indexController');

/* GET home page. */
router.get('/',controller.index);

router.get('/login',controller.login);

router.get('/search-results', controller.search);

router.get('/register', controller.create);

router.post('/store', controller.store);


module.exports = router;
