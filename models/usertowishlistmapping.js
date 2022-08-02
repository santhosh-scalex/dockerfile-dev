"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserToWishListMapping extends Model {
        static associate(models) {
            // define association here
            UserToWishListMapping.belongsTo(models.UserMaster, {
                foreignKey: "email",
                as: "user_wish_list_mapping",
            });
        }
    }
    UserToWishListMapping.init(
        {
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
            data: {
                type: DataTypes.JSON,
                defaultValue: [],
            },
        },
        {
            sequelize,
            timestamps: false,
            modelName: "UserToWishListMapping",
            tableName: "user_to_wish_list_mapping",
        }
    );
    return UserToWishListMapping;
};
