"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class ProductInfo extends Model {
        static associate(models) {
            // define association here
            ProductInfo.hasMany(models.PosLineItem, {
                foreignKey: "sku",
                as: "postLineItem",
            });
            ProductInfo.hasOne(models.UserToAssetsMapping, {
                foreignKey: "sku",
                as: "assetsMapping",
            });
        }
    }
    ProductInfo.init({
        sku: {
            type: DataTypes.TEXT,
            primaryKey: true,
            allowNull: false,
        },
        brand: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        colorway: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        gender: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        silhouette: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        retailprice: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        release_date: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        release_year: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        estimated_market_value: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        links: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        image_url: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        small_image_url: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        thumbnail_image_url: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        images_360: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    }, {
        sequelize,
        modelName: "ProductInfo",
        tableName: 'product_infos',
        timestamps: false,
    });
    return ProductInfo;
};