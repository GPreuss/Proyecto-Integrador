module.exports = function (sequelize, dataTypes){

    let alias = 'Product';

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        productName: {
            type: dataTypes.STRING
        },
        descripcion: {
            type: dataTypes.STRING
        },
        publicador: {
            type: dataTypes.INTEGER
        },
        imagen:{
            type: dataTypes.STRING
        },
        created_at : {
            type: dataTypes.DATE,
            allowNull:true,
        },
        updated_at: {
            type: dataTypes.DATE,
            allowNull: true,
        },

    }

    let config = {
        tableName : "products",
        timestamps:true, 
        underscored: true, 
    };

    const Product = sequelize.define(alias, cols, config);

    return Product;

}