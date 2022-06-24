module.exports = function (sequelize, dataTypes){

    let alias = 'User'; 

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        userName: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        avatar:{
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
        tableName : "users",
        timestamps: true, 
        underscored: false, 
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = function(models){
        User.hasMany(models.Product, 
            {
                as: 'posteos',
                foreignKey: 'id'
            });
        User.belongsToMany(models.Product,{
            through: "comentarios",
            as: "comentario",
            foreignKey: 'username'
        })
        User.belongsToMany(models.User,{
            through: "followers",
            as: "follow",
            foreignKey: 'sguido',
            otherKey: 'seguidor',
            timestamps: false
        })

    }


    return User;

}