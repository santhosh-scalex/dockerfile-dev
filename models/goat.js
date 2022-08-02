"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Goat extends Model {
        static associate(models) {
            // define association here
        }
    }
    Goat.init({
        sku: {
            type: DataTypes.TEXT,
            primaryKey: true,
        },
        size:{
            type: DataTypes.FLOAT,
            primaryKey: true
        },
        shoe_condition: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        box_condition: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        size_option_presentation: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        size_option_value: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        lowest_price_cents_currency: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        lowest_price_cents_amount: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        lowest_price_cents_amountusd_cents: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        instant_ship_lowest_price_cents_currency: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        lowest_price_cents_by_warehouse: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        dt: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: "Goat",
        tableName: 'goat'
    });
    return Goat;
};