var express = require('express');
var router = express.Router();
const controller = require('../controllers/usersController');
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

/* GET users listing. */
router.get('/profile/:id', controller.profile);

router.get('/edit/:id', controller.editarPerfil);

router.post('/edit/:id', upload.single('foto'), controller.edit);

router.post('/follow/:id', controller.follow);

module.exports = router;
