"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserToAssetsMetaData extends Model {
        static associate(models) {
            // define association here
            UserToAssetsMetaData.belongsTo(models.UserMaster, {
                foreignKey: "email",
                as: "user_assets_meta_data",
            });
        }
    }
    UserToAssetsMetaData.init(
        {
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
            global_meta_data: {
                type: DataTypes.JSON,
                defaultValue: {},
            },
        },
        {
            sequelize,
            timestamps: false,
            modelName: "UserToAssetsMetaData",
            tableName: "user_to_assets_meta_data",
        }
    );
    return UserToAssetsMetaData;
};
