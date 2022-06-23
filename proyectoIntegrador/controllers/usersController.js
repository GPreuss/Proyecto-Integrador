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
        } else if (req.body.contrasenaAnterior == '') {
            errores.message = "Escriba su contraseña anterior" //le agrego la posicion message al obj literal errores
            res.locals.errores = errores
            return res.render('profile-edit');
        } else {
            //chequear que la contrasena anterior es correcta 
            usuarios.findOne({
                    where: [{
                        email: req.body.email
                    }]
                })
                .then(function (user) {
                    if (user) {
                        let compare = bcrypt.compareSync(req.body.contrasenaAnterior, user.contrasena)
                        if (compare) {
                            let user = {
                                email: req.body.email,
                                nombreUsuario: req.body.nombreUsuario,
                                contrasena: bcrypt.hashSync(req.body.contrasena, 10), //vamos a hashear la contrasena que viene del form
                                nacimiento: req.body.nacimiento,
                                documento: req.body.documento,
                                imagen: req.file.filename
                            }
                            usuarios.update(user, {
                                    where: [{
                                        id: req.body.id
                                    }]
                                })
                                .then(function (user) {

                                    return res.redirect('/')

                                })
                                .catch(error => console.log(error))
                        } else {
                            errores.message = "La contraseña anterior es incorrecta" //le agrego la posicion message al obj literal errores
                            res.locals.errores = errores //en locals.errors, va a estar el obj literal errores. se lo estoy pasando a la vista
                            return res.render('profile-edit');
                        }
                    } else {
                        errores.message = "El mail nunca fue registrado" //le agrego la posicion message al obj literal errores
                        res.locals.errores = errores //en locals.errors, va a estar el obj literal errores. se lo estoy pasando a la vista
                        return res.render('register');
                    }
                })
                .catch(error => console.log(error))
        }
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