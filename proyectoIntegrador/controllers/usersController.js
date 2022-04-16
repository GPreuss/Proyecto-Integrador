const data = require("../db/data")

const controller = {
    perfil: function(req, res, next) { 
        res.render('profile',  {data: data.usuario, producto: data.productos});      
    },
    editarPerfil: function(req, res, next) { 
        res.render('profile-edit', {data: data.usuario});
    },
}   
module.exports = controller;