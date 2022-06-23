var express = require('express');
var router = express.Router();
const controller = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/products'))
    },
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }});
    
    var upload = multer({storage: storage})

/* GET home page. */


router.get('/add', controller.productAdd);

router.post('/store', upload.single('imagen'), controller.store);

router.get('/detalle/:id', controller.productDetalle);

router.get("/edit/:id" , controller.edit)

module.exports = router;