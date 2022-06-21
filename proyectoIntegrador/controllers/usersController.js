const data = require("../db/data")
const db = require("../database/models")
const productos = db.Product;
const users = db.User


const controller = {
    perfil: function(req, res, next) { 
        res.render('profile',  {data: data.usuario, producto: data.productos});      
    },
    editarPerfil: function(req, res, next) { 
        res.render('profile-edit', {data: data.usuario});
    },
    storeFollower:function (req, res) {
        //res.send(req.body)
        let follower = {
            FkUserId:req.body.usuarioSeguido,
            FkFollowerId: req.body.usuarioSeguidor
        }
        if(req.body.seguido == 1) {
            userFollowers.create(follower)
            .then(function(respuesta){  //en el parametro recibimos el registro que se acaba de crear en la base de datos
                // return res.send(respuesta)
                return res.redirect('/profile/' + req.body.usuarioSeguido); //redirigir falta ponerle el id del usuario en cuestion -> session
            })
        }
        if(req.body.seguido == 0) {
            userFollowers.destroy({
                where: [{FkUserId: req.body.usuarioSeguido,},{FkFollowerId: req.body.usuarioSeguidor}] 
            })
            .then(function(respuesta){  //en el parametro recibimos el registro que se acaba de crear en la base de datos
                // return res.send(respuesta)
                return res.redirect('/profile/' + req.body.usuarioSeguido); //redirigir falta ponerle el id del usuario en cuestion -> session
            })
        }
    }
}   
module.exports = controller;