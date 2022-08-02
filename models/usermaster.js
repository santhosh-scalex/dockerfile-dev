"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserMaster extends Model {
        static associate(models) {
            UserMaster.hasMany(models.UserToWishListMapping, {
                foreignKey: "email",
                as: "wishlist",
            });
            UserMaster.hasMany(models.UserToAssetsMapping, {
                foreignKey: "email",
                as: "assets",
            });
            UserMaster.hasMany(models.UserTagMapping, {
                foreignKey: "email",
                as: "user_tag_mapping",
            });
            UserMaster.hasMany(models.UserBrandMapping, {
                foreignKey: "email",
                as: "user_brand_mapping",
            });
            UserMaster.hasOne(models.UserToNotificationSetting, {
                foreignKey: "email",
                as: "user_notification_setting",
            });
            UserMaster.hasOne(models.UserToAssetsMetaData, {
                foreignKey: "email",
                as: "user_assets_meta_data",
            });
        }
    }
    UserMaster.init(
        {
            email: {
                type: DataTypes.TEXT,
                primaryKey: true,
                allowNull: false,
            },
            username: {
                type: DataTypes.TEXT,
                unique: true,
                allowNull: false,
            },
            full_name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            phone_number: {
                type: DataTypes.TEXT,
            },
            zipcode: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            avatar: {
                type: DataTypes.TEXT,
            },
            country: {
                type: DataTypes.TEXT,
            },
            news_letter: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            how_did_you_find_us: {
                type: DataTypes.ENUM(
                    "Instagram",
                    "Facebook",
                    "Twitter",
                    "LinkedIn",
                    "TikTok",
                    "Word of Mouth",
                    "Tiona Deniece",
                    "Ashten Prechtel",
                    "SneakerCon Event"
                ),
            },
        },
        {
            sequelize,
            modelName: "UserMaster",
            tableName: "user_master",
            timestamps: false,
        }
    );
    return UserMaster;
};
