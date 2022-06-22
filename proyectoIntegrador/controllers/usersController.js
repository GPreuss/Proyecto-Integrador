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
    create: function (req, res) {
        console.log(users)
        return res.render('register')
    },
    store: function (req, res) {
        //Obtener los datos del formulario y armar el objeto literal que quiero guardar
        let user = {
            userName: req.body.usuario,
            email: req.body.email,
            password: req.body.password,
            //avatar: req.file.filename,
        }
        //Guardar la info en la base de datos
        users.create(user)
            .then(function (respuesta) { //En el parámetro recibimos el registro que se acaba de crear en la base de datos.
                console.log(respuesta)
                return res.redirect('/')
            })
            .catch(error => console.log(error))
    },
    /*
    storeProfile: function (req, res){
        
        console.log(req.body) // aca deberia llegar lo que mando el usuario

        var image;
        if (!(req.file.filename)){
            console.log('entro al filename')
            image = '/images/users/default-image.png'
        } else {
            image = req.file.filename
        }
        if(req.body.password.length<3){
            res.locals.errores={mensaje:"la contraseña debe tener mas de tres caracteres"}
            return res.render("register")
        }
        let user = { 
            email: req.body.email,
            username:req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            date: req.body.date,
            dni: req.body.dni,
            image: req.file.filename
        }

        users.findOne({
            where: [{email: user.email}] //encontrar un mail que coincida con el mail que ingreso el usuario
        })

        .then(function(usuario){ //el then es para que el codigo se ejecute recien cuando se chequee la linea de arriba (el find one)
            if (usuario) {
                console.log ('el usuario ya existe')
                res.locals.errores = {mensaje: 'El email ya esta en uso'}
                console.log(res.locals.errores)
                return res.render('register')
            }else{
                res.locals.errores = ''; 
                console.log ('el usuario no existe')
                users.create(user) //create agarra el objeto, se lo manda a la table en la bd y cuando esta lo guarda, devuelve el registro como parametro de la funcion del then
                .then(function(respuesta){  //en el parametro recibimos el registro que se acaba de crear en la base de datos
                    // return res.send(respuesta)
                    return res.redirect('/index'); //redirigir falta ponerle el id del usuario en cuestion -> session
                })
            }
        })

        

            .catch(error => console.log (error))

    },
    */
    login: function (req, res) {
        //mostrar el form de registro
        //Chequear que un usario esté logueado
        if (req.session.user != undefined) {
            return res.redirect('/')
        } else {
            return res.render('login');
        }
    },
    logout: function (req, res) {
        //destruir session
        req.session.destroy();

        //Eliminar cookie si existe.
        if (req.cookies.userId !== undefined) {
            res.clearCookie('userId')
        }

        return res.redirect('/');
    },

    signIn: function (req, res) {
        console.log("entre al sign in");
        users.findOne({
                where: [{
                    email: req.body.email
                }]
            })
            .then(function (user) {
                //si trajo un usuario hay que chequear la contraseña con compareSync()
                //Si las contraseñas no coincuiden mandamos mensaje de error.
                console.log(req.body)
                console.log('el usuario es: ' + user);

                if (user) {
                    console.log('entro al if(user)');
                    if (bcrypt.compareSync(req.body.password, user.password)) {
                        //Si el usuario tildó recordarme creo la cookie
                        if (req.body.remember) {
                            res.cookie('userId', user.dataValues.id, {
                                maxAge: 1000 * 60 * 10
                            });
                        }
                        console.log('coinciden');
                        req.session.user = user.dataValues;
                        res.locals.errores = ''
                        console.log('los errores son' + res.locals.errores);
                        return res.redirect('/profile/' + user.dataValues.id)
                    } else {
                        res.locals.errores = {
                            mensaje: "la password no concide"
                        };
                        console.log('los errores son' + res.locals.errores);
                        return res.render('login')
                    }

                } else {
                    res.locals.errores = {
                        mensaje: "El email es incorrecto"
                    };
                    console.log(res.locals.errores);
                    return res.render('login')
                }
            })
            .catch(error => console.log(error))

    },
}
module.exports = controller;