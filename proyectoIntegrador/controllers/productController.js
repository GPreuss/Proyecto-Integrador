const data = require("../db/data")

const controller = {
    productDetalle: function(req, res, next) { 
        res.render('product', {data: data.productos, comentarios: data.comentarios});      
    },
    productAdd: function(req, res, next) { 
        res.render('product-add', {data: data.usuario});
    },
}
module.exports = controller;