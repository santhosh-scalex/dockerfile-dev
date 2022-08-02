"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class PosLineItem extends Model {
        static associate(models) {
            PosLineItem.belongsTo(models.ProductInfo, {
                foreignKey: "sku",
                as: "product",
            });
        }
    }
    PosLineItem.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            sku: DataTypes.STRING,
            brand: DataTypes.STRING,
            size: DataTypes.STRING,
            shoe_condition: DataTypes.STRING,
            box_condition: DataTypes.STRING,
            size_option_presentation: DataTypes.STRING,
            size_option_value: DataTypes.STRING,
            price: DataTypes.FLOAT,
            market_value: DataTypes.FLOAT,
            percentage: DataTypes.FLOAT,
        },
        {
            sequelize,
            modelName: "PosLineItem",
            tableName: 'pos_line_item'
        }
    );
    return PosLineItem;
};
