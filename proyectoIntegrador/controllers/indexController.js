const data = require("../db/data")
const db = require("../database/models")
const productos = db.Product;
const users = db.User


const controller = {
    index: function(req, res, next) { 
        res.render('index', {data: data.productos});      
    },
    login: function(req, res, next) { 
        res.render('login');
    },
    create: function(req, res){
        console.log(users)
        return res.render('register')
    },
    store: function(req, res){
        //Obtener los datos del formulario y armar el objeto literal que quiero guardar
        let user = {
            userName: req.body.usuario,
            email: req.body.email,
            password: req.body.password,
            avatar: req.body.avatar,
        }
        //Guardar la info en la base de datos
        users.create(user)
            .then( function(respuesta){ //En el parámetro recibimos el registro que se acaba de crear en la base de datos.
                
                return res.redirect('/')
            })
            .catch( error => console.log(error))
    },
    search: function(req, res, next) { 
        res.render('search-results', {data: data.productos});
    },
}
module.exports = controller;