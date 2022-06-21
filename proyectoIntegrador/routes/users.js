var express = require('express');
var router = express.Router();
const controller = require('../controllers/usersController');

/* GET users listing. */
router.get('/profile', controller.perfil);

router.get('/profile/edit', controller.editarPerfil);

/*router.get('/register', controller.create);

router.post('/store', controller.storeUser);

router.get('/login',controller.login);

router.post('/login', controller.signIn);

router.post('/store', controller.storeUser);
*/

module.exports = router;
