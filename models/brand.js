"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Brand extends Model {
        static associate(models) {
            // define association here
            Brand.hasMany(models.UserBrandMapping, {
                foreignKey: "brand_id",
                as: "brands",
            });
        }
    }
    Brand.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING,
        },
        brand: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: "Brand",
        tableName: 'brands'
    });
    return Brand;
};