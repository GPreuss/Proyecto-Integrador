const data = require("../db/data")
const db = require("../database/models")
const productos = db.Product;
const users = db.User
const comentarios = db.Comentario
const op = db.Sequelize.Op;

const controller = {
    perfil: function (req, res, next) {
        res.render('profile', {
            data: data.usuario,
            producto: data.productos
        });
    },
    /*
    profile: function (req, res) {
        // if(req.session.user == undefined){
        //    return res.redirect('/')
        // } else {

        productos.findAll({
                where: [{
                    usuarioId: req.params.id
                }],
            })
            .then(function (productos) {
                usuarios.findOne({
                        where: [{
                            id: req.params.id
                        }],
                    })
                    .then(function (usuarios) {
                        seguidores.findAll({
                                where: [{
                                    seguidoId: req.params.id
                                }]
                            })
                            .then(function (seguidores) {
                                comentarios.findAll({
                                        include: [{
                                            association: "usuario"
                                        }],
                                        where: [{
                                            usuarioId: req.params.id
                                        }]
                                    })
                                    .then(function (comentarios) {
                                        return res.render('profile', {
                                            usuarios: usuarios,
                                            productos: productos,
                                            seguidores: seguidores,
                                            comentarios: comentarios
                                        });
                                    })
                            })

                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    },
    */
    editarPerfil: function (req, res, next) {
        res.render('profile-edit', {
            data: data.usuario
        });
    },
    storeFollower: function (req, res) {
        //res.send(req.body)
        let follower = {
            seguido: req.body.usuarioSeguido,
            seguidor: req.body.usuarioSeguidor
        }
        if (req.body.seguido == 1) {
            userFollowers.create(follower)
                .then(function (respuesta) { //en el parametro recibimos el registro que se acaba de crear en la base de datos
                    // return res.send(respuesta)
                    return res.redirect('/profile/' + req.body.usuarioSeguido); //redirigir falta ponerle el id del usuario en cuestion -> session
                })
        }
        if (req.body.seguido == 0) {
            userFollowers.destroy({
                    where: [{
                        seguido: req.body.usuarioSeguido,
                    }, {
                        seguidor: req.body.usuarioSeguidor
                    }]
                })
                .then(function (respuesta) { //en el parametro recibimos el registro que se acaba de crear en la base de datos
                    // return res.send(respuesta)
                    return res.redirect('/profile/' + req.body.usuarioSeguido); //redirigir falta ponerle el id del usuario en cuestion -> session
                })
        }
    },
    seguir: function (req, res) {
        seguidores.findOne({
                where: [{
                    seguidor: req.session.user.id,
                    seguido: req.params.id
                }]
            })
            .then(function (user) {
                if (user) {
                    return res.redirect(`/users/profile/${req.params.id}`)
                } else {
                    seguidores.create({
                            seguidorId: req.session.user.id,
                            seguidoId: req.params.id
                        })
                        .then(function (respuesta) {
                            return res.redirect(`/users/profile/${req.params.id}`)
                        })
                        .catch(error => console.log(error))
                }
            })
            .catch(error => console.log(error))
    },
}
module.exports = controller;