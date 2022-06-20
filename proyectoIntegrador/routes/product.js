var express = require('express');
var router = express.Router();
const controller = require('../controllers/productController');

/* GET home page. */
router.get('/', controller.productDetalle);

router.get('/add', controller.productAdd);

router.post('/store', controller.store);

module.exports = router;