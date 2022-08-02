"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserTags extends Model {
        static associate(models) {
            // define association here
            UserTags.hasMany(models.UserTagMapping, {
                foreignKey: "tag_id",
                as: "tags",
            });
        }
    }
    UserTags.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        white_icon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        check: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: "UserTags",
        tableName: 'user_tags'
    });
    return UserTags;
};