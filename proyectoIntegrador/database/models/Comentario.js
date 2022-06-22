module.exports = function (sequelize, dataTypes){

    let alias = 'Comentario'; //Este alias se busca como nombre en de la tabla en plural dentro de la base de datos.

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        /*user_id: {
            type: dataTypes.INTEGER
        },*/
        comentarioTexto: {
            type: dataTypes.STRING
        },
        producto: {
            type: dataTypes.INTEGER
        },
        username: {
            type: dataTypes.INTEGER
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
        tableName : "comentarios",
        timestamps:true, 
        underscored: true, 
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