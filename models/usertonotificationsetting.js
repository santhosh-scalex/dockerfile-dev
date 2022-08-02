"use strict";
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserToNotificationSetting extends Model {
        static associate(models) {
            // define association here
            UserToNotificationSetting.belongsTo(models.UserMaster, {
                foreignKey: "email",
                as: "user_notification_setting",
            });
        }
    }
    UserToNotificationSetting.init({
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
        notification_settings: {
            type: DataTypes.JSON,
            defaultValue: {},
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: "UserToNotificationSetting",
        tableName: 'user_notification_setting'
    });
    return UserToNotificationSetting;
};