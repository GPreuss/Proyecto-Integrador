module.exports = function (sequelize, dataTypes){

    let alias = 'Comentario'; //Este alias se busca como nombre en de la tabla en plural dentro de la base de datos.

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        username: {
            type: dataTypes.INTEGER
        },
        comentarioTexto: {
            type: dataTypes.STRING
        },
        producto: {
            type: dataTypes.INTEGER
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
        tableName : "comentarios",
        timestamps:true, 
        underscored: false, 
    };

    const Comentario = sequelize.define(alias, cols, config);

 
    Comentario.associate = function(models){
        Comentario.belongsTo(models.Product,
            {
                as: 'productoComentado',
                foreignKey: 'producto'
            });

        Comentario.belongsTo(models.User,
            {
                as: 'comentador',
                foreignKey: 'username'
            });

    }

    return Comentario;

}