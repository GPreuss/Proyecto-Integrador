module.exports = function (sequelize, dataTypes){

    let alias = 'Follower'; 

    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        seguidor: {
            type: dataTypes.INTEGER
        },
        seguido: {
            type: dataTypes.INTEGER
        },

    }

    let config = {
        tableName : "followers",
        timestamps: false, 
        underscored: false, 
    };

    const Follower = sequelize.define(alias, cols, config);

    /*UserFollower.associate = function(models){
        UserFollower.belongsToMany(models.UserFollower, {
        as: "Followers",
        through: "user_follower",
        foreignKey: "user_id",
        otherKey: "follower_id",
        timestamps: false
        });
    }*/

    return Follower;

}