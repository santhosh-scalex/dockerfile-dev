"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class StockType extends Model {
        static associate(models) {
            // define association here
            /* StockType.belongsTo(models.UserToAssetsMapping, {
                foreignKey: "stock_type_id",
                as: "assetsMapping",
            }); */
        }
    }
    StockType.init({
        key: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        index: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: "StockType",
        tableName: 'stock_types',
        timestamps: false
    });
    return StockType;
};