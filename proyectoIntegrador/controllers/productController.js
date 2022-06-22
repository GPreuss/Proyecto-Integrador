const data = require("../db/data")
const db = require("../database/models")
const productos = db.Product;
const users = db.User
const comments = db.Comentario
const op = db.Sequelize.Op;//contiene los operadores para usar en metodos de sequelize
const bcrypt = require('bcryptjs')

const controller = {
    productDetalle: function(req, res, next) { 
        res.render('product', {data: data.productos, comentarios: data.comentarios});      
    },
    productAdd: function(req, res, next) { 
        res.render('product-add', {data: data.usuario});
        //
    },

    /*show: function (req,res){
        productos.findOne({
            where: [{id: req.params.id}],
            include: [{association: 'publicadorProducto'}, {association: 'comentarios', order: [['createdAt', 'order','DESC']]}],
            //order: ['comentarios', 'order', 'desc']
        })
            .then(function(unProduct){
                let comentariosOrdenados = unProduct.comentarios.slice().sort((a,b) => b.createdAt - a.createdAt);//como la consigna pide que los comentarios esten en orden descendiente ordenados por createdAt, con esta linea resolvemos esto
                unProduct.comentarios = comentariosOrdenados;
                //res.send(comentariosOrdenados)

                let comentadores = [];//checkear si el codigo este esta bien o hay otra forma de resolver
                if(unProduct.comentarios[0] != undefined){
                    //return res.send('hay comentarios')
                    for(let i = 0; i < unProduct.comentarios.length; i++){
                        users.findOne({
                            where: [{id: unProduct.comentarios[i].publicador}]
                        })
                        .then(function(unComentador){
                            comentadores.push(unComentador);
                            if(i == unProduct.comentarios.length - 1){
                                //return res.send(comentadores)
                                return res.render('product', {info: unProduct, comentadores: comentadores, id: req.params.id});
                            }
                        })
                    }
                } else {
                    //return res.send('no hay comentarios')
                    return res.render('product', {info: unProduct, comentadores: [], id: req.params.id});
                }
                //return res.send(unTelefono)
                
            })
        //return res.render('product', {info: data, array: array, id: req.params.id});
    },

    /*productAdd: function (req, res) {
        if (req.session.user == undefined) {
            return res.redirect('/')
        } else {
            return res.render('product-add' , {info: data});
        };
    },*/

    store: function(req, res){
        //Obtener los datos del formulario y armar el objeto literal que quiero guardar
        let producto = {
            productName: req.body.productName,
            descripcion: req.body.descripcion,
            publicador: req.session.user.id,
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