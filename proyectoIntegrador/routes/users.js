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
router.get('/:id', controller.perfil);

router.get('/edit/:id', controller.editarPerfil);

/*router.post('/profile', upload.single('avatar'), controller.editarPerfil);

router.get('/register', controller.create); //crea el perfil

router.post('/store', upload.single('avatar'), controller.store); //guardo el perfil en la db

router.get('/login',controller.login); 

router.post('/login',controller.signIn);

router.post('/logout',controller.logout);

router.post('/storeFollower', controller.storeFollower);
*/

module.exports = router;
