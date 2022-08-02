"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserTagMapping extends Model {
        static associate(models) {
            // define association here
            UserTagMapping.belongsTo(models.UserMaster, {
                foreignKey: "email",
                as: "user_tag_mapping",
            });
            UserTagMapping.belongsTo(models.UserTags, {
                foreignKey: "tag_id",
                as: "tags",
            });
        }
    }
    UserTagMapping.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: "UserTagMapping",
        tableName: 'user_tag_mappings'
    });
    return UserTagMapping;
};