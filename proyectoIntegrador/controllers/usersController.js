const db = require("../database/models")
const productos = db.Product;
const users = db.User
const comentarios = db.Comentario
const Follower = db.Follower
const bcrypt = require('bcryptjs')

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
        res.render('profile-edit');
    },
    edit: function (req, res) {
        //detectar errores de los datos del usuairo en el form 
        let errores = {}
        if (req.body.nombreUsuario == '') {
            errores.message = "El nombre de usuario es obligatorio" //le agrego la posicion message al obj literal errores
            res.locals.errores = errores //en locals.errors, va a estar el obj literal errores. se lo estoy pasando a la vista
            return res.render('profile-edit');
        } else if (req.body.email == '') {
            errores.message = "El email es obligatorio" //le agrego la posicion message al obj literal errores
            res.locals.errores = errores //en locals.errors, va a estar el obj literal errores. se lo estoy pasando a la vista
            return res.render('profile-edit');
        } else if (req.body.contrasena == '') {
            errores.message = "La contraseña es obligatoria"
            res.locals.errores = errores
            return res.render('profile-edit');
        } else if (req.body.contrasena.length < 3) {
            errores.message = "La contraseña tiene que tener al menos 3 caracteres" //le agrego la posicion message al obj literal errores
            res.locals.errores = errores
            return res.render('profile-edit');
        } else {
            //chequear que la contrasena anterior es correcta 
            users.findByPk(req.params.id)
                .then(function (user) {
                    if (user) {
                            let user = {
                                email: req.body.email,
                                userName: req.body.usuario,
                                password: bcrypt.hashSync(req.body.contrasena, 10), //vamos a hashear la contrasena que viene del form
                                nacimiento: req.body.nacimiento,
                                documento: req.body.dni,
                                avatar: req.file.filename
                            }
                            users.update(user, {
                                    where: [{
                                        id: req.params.id
                                    }]
                                })
                                .then(function (user) {
                                    return res.redirect('/users/profile/'+ req.params.id)
                                })
                                .catch(error => console.log(error))
                        } else {
                            errores.message = "La contraseña anterior es incorrecta" //le agrego la posicion message al obj literal errores
                            res.locals.errores = errores //en locals.errors, va a estar el obj literal errores. se lo estoy pasando a la vista
                            return res.render('profile-edit');
                        }
                })
                .catch(error => console.log(error))
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
                        where: { seguidor: req.session.user.id, seguido: req.params.id}
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