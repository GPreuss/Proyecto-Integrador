const data = require("../db/data")
const db = require("../database/models")
const productos = db.Product;
const users = db.User
const comentarios = db.Comentario
const Follower = db.Follower
const op = db.Sequelize.Op;

const controller = {
    profile: function (req, res) {
        productos.findAll({
                where: [{
                    publicador: req.params.id
                }],
            })
            .then(function (productos) {
                users.findByPk(req.params.id)
                    .then(function (usuarios) {
                        Follower.findAll({
                                where: [{
                                    seguido: req.params.id
                                }]
                            })
                            .then(function (Follower) {
                                comentarios.findAll({
                                        include: [{
                                            association: "comentador"
                                        }],
                                        where: [{
                                            username: req.params.id
                                        }]
                                    })
                                    .then(function (comentarios) {
                                        return res.render('profile', {
                                            usuarios: usuarios,
                                            productos: productos,
                                            Follower: Follower,
                                            comentarios: comentarios
                                        });
                                    })
                                    .catch(error => console.log(error))
                            })
                            .catch(error => console.log(error))
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    },
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
    follow: function (req, res) {
        Follower.findOne({
                where: [{
                    seguidor: req.session.user.id,
                    seguido: req.params.id
                }]
            })
            .then(function (user) {
                if (user) {
                    Follower.destroy({
                        where: { seguidorId: req.session.user.id, seguidoId: req.params.id}
                    })
                    .then(function (answer) {
                        return res.redirect(`/users/profile/${req.params.id}`)
                    })
                    .catch(error => console.log(error))
                } else {
                    Follower.create({
                            seguidor: req.session.user.id,
                            seguido: req.params.id
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