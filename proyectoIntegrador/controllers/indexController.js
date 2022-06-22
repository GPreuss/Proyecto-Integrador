const data = require("../db/data")
const db = require("../database/models")
const productos = db.Product;
const users = db.User
const op = db.Sequelize.Op;

const controller = {
    index: function (req, res, next) {
        res.render('index', {
            data: data.productos
        });
    },
    login: function (req, res, next) {
        res.render('login');
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
            where:[{email : req.body.email}]
        })
        .then(function(users){
            //falta la validacion si existe o no el mail
        if(users){
            req.session.user = users.dataValues ;
            // si el usuario tildo recordame creo la cookie
            res.cookie('userID',users.dataValues.id,{maxAge:1000*60*10})
        }
        console.log(req.session.user)
        // console.log(req.session.user); //para ver si existe la session 
            return res.redirect('/')
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