var express = require('express');
var router = express.Router();
const controller = require('../controllers/indexController');
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/users'));
    }, 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({storage: storage});

/* GET home page. */
router.get('/',controller.index);

router.get('/search-results', controller.search);

router.get('/register', controller.create);

router.post('/store', upload.single('avatar'), controller.store);

router.get('/login',controller.login);

router.post('/login',controller.signIn);

router.post('/logout',controller.logout);

module.exports = router;
