const data = require("../db/data")
const db = require("../database/models")
const productos = db.Product;
const users = db.User
const op = db.Sequelize.Op;
const bcrypt = require('bcryptjs')

const controller = {
    index: function (req, res) {
        productos.findAll({
            include: [{association: 'publicadorProducto'},{association: 'comentarios'}],order: [['createdAt','ASC']]
        })
        .then(productos => {
            return res.render('index', {
                productos: productos,
            })    
        })

        .catch(error => console.log(error))
    },
    login: function (req, res, next) {
        res.render('login');
    },
    create: function (req, res) {
        console.log(users)
        return res.render('register')
    },
    store: function (req, res) {

        let errores = {}
        if (req.body.email == "") {
            errores.message = "El email es obligatorio";
            res.locals.errores = errores;
            return res.render('register');
        } else if (req.body.password == "") {
            errores.message = "la contraseña es obligatoria";
            res.locals.errores = errores;
            return res.render('register');
        } else if (req.body.usuario == undefined) {
            errores.message = "Es obligatorio completar el usuario";
            res.locals.errores = errores;
            return res.render('register');
        } else {
            users.findOne({
                where: [{ username: req.body.usuario }]
            })
                .then(function (user) {
                    if (user !== null) {
                        errores.message = "El usuario ya existe. Por favor, elija otro.";
                        res.locals.errores = errores;
                        return res.render('register');
                    } else {
                        //Obtener los datos del formulario y armar el objeto literal que quiero guardar
                        let user = {
                            userName: req.body.usuario,
                            email: req.body.email,
                            password: bcrypt.hashSync(req.body.password, 10),
                            //avatar: req.file.filename,
                        }
                        //Guardar la info en la base de datos
                        users.create(user)
                            .then(function (respuesta) { //En el parámetro recibimos el registro que se acaba de crear en la base de datos.
                                console.log(respuesta)
                                return res.redirect('/')
                            })
                            .catch(error => console.log(error))
                    }
                })
                .catch(errors => console.log(errors))
        }
    },

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

        let errores = {}
        // console.log("entre al sign in");
        users.findOne({
            where: [{ email: req.body.email }]
        })

            .then(function (users) {
                if(users){
                let compare = bcrypt.compareSync(req.body.password, users.password);
                //falta la validacion si existe o no el mail
                if (compare) {
                    req.session.user = users.dataValues;
                    // si el usuario tildo recordame creo la cookie
                    if (req.body.recordarme) {
                        res.cookie('userId', users.dataValues.id, { maxAge: 1000 * 60 * 100 })

                        console.log(errores)
                    }
                    return res.redirect('/');

                } else {
                    errores.message = "Contraseña incorrecta" 
                    res.locals.errores = errores 
                    return res.render('login');

                }

                } else {
                    errores.message = "Ese usuario no existe"
                    res.locals.errores = errores
                    return res.render('login');

                }

                //return res.redirect('/')
            })
            .catch(error => console.log(error))


    },
    search: function (req, res, next) {
        res.render('search-results', {
            data: data.productos
        });
    },
    /*searchResults: function (req, res) {
        let search = req.query.search
        productos.findAll({
            include: [{
                association: 'publicadorProducto'
            }, {
                association: 'comentarios'
            }],
            where: {
                [op.or]: [{
                        nombre: {
                            [op.like]: `%${search}%`
                        }
                    },
                    {
                        descripcion: {
                            [op.like]: `%${search}%`
                        }
                    }
                ]
            }
        }).then(function (unosProductos) {
            return res.render('search-results', {
                productos: unosProductos
            })
        })
    },*/
}
module.exports = controller;