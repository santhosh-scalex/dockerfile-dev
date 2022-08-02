"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserToAssetsMapping extends Model {
        static associate(models) {
            // define association here
            UserToAssetsMapping.belongsTo(models.UserMaster, {
                foreignKey: "email",
                as: "user",
            });
            UserToAssetsMapping.belongsTo(models.ProductInfo, {
                foreignKey: "sku",
                as: "product",
            });
            /* UserToAssetsMapping.hasOne(models.StockType, {
                foreignKey: "stock_type_id",
                as: "stockType",
            }); */
        }
    }
    UserToAssetsMapping.init({
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
        sku: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        range: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        size: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        condition: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        sole_grade: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        stored: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        is_self_service: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_solesafe_premium_service: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_private: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        links: DataTypes.STRING,
        image_url: DataTypes.STRING,
        small_image_url: DataTypes.STRING,
        thumbnail_image_url: DataTypes.STRING,
        image_360: DataTypes.STRING,
        stock_type_id: DataTypes.INTEGER,
        sole_id: DataTypes.INTEGER,
        is_insured: DataTypes.BOOLEAN,
        description: DataTypes.STRING,
        coverage: DataTypes.STRING,
        coverage_lock: DataTypes.STRING,
        coverage_term_dates: DataTypes.DATE,
        coverage_wait_period_end: DataTypes.DATE,
        certificate_of_authentication: DataTypes.STRING,
        certificate_of_authentication_date: DataTypes.DATE,
        certificate_of_appraisal: DataTypes.STRING,
        certificate_of_appraisal_date: DataTypes.DATE,
        posted_date: DataTypes.DATE,
    }, {
        sequelize,
        modelName: "UserToAssetsMapping",
        tableName: 'user_to_assets_mapping'
    });
    return UserToAssetsMapping;
};