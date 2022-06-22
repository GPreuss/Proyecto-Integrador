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
        createdAt : {
            type: dataTypes.DATE,
            allowNull:true,
        },
        updatedAt: {
            type: dataTypes.DATE,
            allowNull: true,
        },
    }

    let config = {
        tableName : "products",
        timestamps:true, 
        underscored: false, 
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        Product.belongsTo(models.User,
            {
                as: 'publicadorProducto',
                foreignKey: 'publicador'
            });
        Product.hasMany(models.Comentario,
            {
                as: 'comentarios',
                foreignKey: 'id'
            });
    }

    return Product;

}