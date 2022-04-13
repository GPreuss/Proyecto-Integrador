const data = require("../db/data")

const controller = {
    productDetalle: function(req, res, next) { 
        res.render('product', {data: data.productos[req.params.id], comentarios: data.comentarios});      
    },
    productAdd: function(req, res, next) { 
        res.render('product-add');
    },
}
module.exports = controller;