"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserBrandMapping extends Model {
        static associate(models) {
            // define association here
            UserBrandMapping.belongsTo(models.UserMaster, {
                foreignKey: "email",
                as: "user_brand_mapping",
            });
            UserBrandMapping.belongsTo(models.Brand, {
                foreignKey: "brand_id",
                as: "brands",
            });
        }
    }
    UserBrandMapping.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: "UserBrandMapping",
        tableName: 'user_brand_mappings'
    });
    return UserBrandMapping;
};