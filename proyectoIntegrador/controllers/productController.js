const data = require("../db/data")
const db = require("../database/models")
const productos = db.Product;
const users = db.User
const comentarios = db.Comentario
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
                    id: id
                }]
            })
            .then(function (elProducto) {
                comentarios.findAll( {
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
                            comentarios: comentarios
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
    comentario: function (req, res) {
        if (req.session.user == undefined) {
            return res.redirect('/login')
        } else {
            let comentario = {
                comentarioTexto: req.body.texto,
                username: req.session.user.id,
                producto: req.params.id
            }
            comentarios.create(comentario)
            .then (function(respuesta){
                productos.findByPk(req.params.id)
                .then (function(producto){
                    return res.redirect (`/product/detalle/${producto.id}`)
                })
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
        };
    },

    productosEdit: function (req, res) {
        productos.findByPk(req.params.id) //el req.params me trae "id:numero" por eso nos da error.
        .then(producto => {
            return res.render('edit', {producto: producto})
           
        })

},

edited: function(req,res){
    let product = {
        nombre: req.body.productName,
        descripcion:req.body.descripcion,
        imagen:req.file.filename,
        publicador: req.session.user.id, // otro error parecido con el id, no encontramos la solucion. 
    }
    productos.update(product, {
        where: {
            id: req.params.id
        }
    })
    .then(function (respuesta) {
        return res.redirect(`/products/${req.params.id}`)
    })
    .catch(error => console.log(error))
},
}
module.exports = controller;