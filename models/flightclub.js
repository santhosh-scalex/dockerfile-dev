"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class FlightClub extends Model {
        static associate(models) {
            // define association here
        }
    }
    FlightClub.init({
        sku: {
            type: DataTypes.TEXT,
            primaryKey: true
        },
        size: {
            type: DataTypes.REAL,
            primaryKey: true
        },
        id: {
            type: DataTypes.TEXT,
        },
        new_shoe_condition: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        new_box_condition: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        new_lowest_price_cents: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        new_instant_ship_lowest_pricecents: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        used_shoe_condition: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        used_box_condition: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        used_lowest_price_cents: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        used_instant_ship_lowest_price_cents: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        dt: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    }, {
        sequelize,
        modelName: "FlightClub",
        tableName: 'flight_club',
        timestamps: false
    });
    return FlightClub;
};