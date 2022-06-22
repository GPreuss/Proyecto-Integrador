const data = require("../db/data")
const db = require("../database/models")
const productos = db.Product;
const users = db.User
const comments = db.Comentario
const op = db.Sequelize.Op;//contiene los operadores para usar en metodos de sequelize
const bcrypt = require('bcryptjs')

const controller = {
    productDetalle: function(req, res, next) {
        let id = req.params.id
        console.log(id)
        productos.findOne({
                include: [{
                    association: "publicadorProducto"
                }],
                where: [{
                    productName: id
                }]
            })
            .then(function (elProducto) {
                comments.findAll( {
                        include: [{
                            association: "comentador"
                        }, {
                            association: "productoComentado"
                        }],
                        where: [{
                            producto: elProducto
                        }],
                            order: [[['id', 'DESC']]]
                    
                    })
                    .then(function (comentarios) {
                        return res.render('product', {
                            productos: elProducto,
                            comments: comentarios
                        })
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))    
    },
    productAdd: function(req, res, next) { 
        res.render('product-add', {data: data.usuario});
        //
    },
    store: function(req, res){
        //Obtener los datos del formulario y armar el objeto literal que quiero guardar
        let producto = {
            productName: req.body.productName,
            descripcion: req.body.descripcion,
            publicador: req.session.user.id,
            imagen: req.file.filename,
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