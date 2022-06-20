const data = require("../db/data")
const db = require("../database/models")
const productos = db.Product;
const users = db.User

const controller = {
    productDetalle: function(req, res, next) { 
        res.render('product', {data: data.productos, comentarios: data.comentarios});      
    },
    productAdd: function(req, res, next) { 
        res.render('product-add', {data: data.usuario});
    },
    store: function(req, res){
        //Obtener los datos del formulario y armar el objeto literal que quiero guardar
        let producto = {
            userName: req.body.usuario,
            email: req.body.email,
            password: req.body.password,
            //avatar: req.body.avatar,
        }
        //Guardar la info en la base de datos
        productos.create(producto)
            .then( function(respuesta){ //En el parámetro recibimos el registro que se acaba de crear en la base de datos.
                console.log(respuesta)
                return res.redirect('/')
            })
            .catch( error => console.log(error))
    },
}
module.exports = controller;