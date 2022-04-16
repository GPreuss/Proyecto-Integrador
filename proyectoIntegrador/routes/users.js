var express = require('express');
var router = express.Router();
const controller = require('../controllers/usersController');

/* GET users listing. */
router.get('/profile', controller.perfil);

router.get('/profile/edit', controller.editarPerfil);

module.exports = router;
