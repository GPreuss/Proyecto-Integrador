const data = require("../db/data")

const controller = {
    productDetalle: function(req, res, next) { 
        res.render('product', {data: data.product});
      
        
    },
    productAdd: function(req, res, next) { 
        res.render('product-add');
    },



}
