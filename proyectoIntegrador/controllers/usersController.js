const data = require("../db/data")

const controller = {
    perfil: function(req, res, next) { 
        res.render('profile',  {data: data.usuario});      
    },
    editarPerfil: function(req, res, next) { 
        res.render('profile-edit');
    },
}
module.exports = controller;