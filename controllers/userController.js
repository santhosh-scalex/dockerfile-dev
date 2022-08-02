const Joi = require('joi')
const { userService } = require('../services')
const { userNotificationSettingEnum } = require('../enum')
const { messagesConstants } = require('../utils')
const { wishListValidator, commonValidator } = require('../validations')

module.exports = {
    addNotificationSetting: async (req, res) => {
        try {
            const { body = {} } = req

            const validateSettingSchema = Joi.object().keys({
                email: Joi.string()
                    .trim()
                    .required()
                    .email()
                    .error((errors) => {
                        errors.forEach((err) => {
                            switch (err.code) {
                                case 'any.required':
                                case 'string.empty':
                                case 'string.required':
                                    err.message =
                                        messagesConstants.COMMON.EMAIL.REQUIRED
                                    break
                                case 'string.email':
                                    err.message =
                                        messagesConstants.COMMON.EMAIL.VALID_EMAIL
                                    break
                            }
                        })
                        return errors
                    }),
                notification_settings: Joi.object()
                    .required()
                    .error((errors) => {
                        errors.forEach((err) => {
                            switch (err.code) {
                                case 'string.empty':
                                case 'any.required':
                                    err.message =
                                        messagesConstants.NOTIFICATION_SETTING.REQUIRED
                                    break
                            }
                        })
                        return errors
                    }),
            })
            const { value, error } = validateSettingSchema.validate(body)

            if (error) {
                return res.status(400).send({
                    message: error.message,
                })
            }

            let { dataValues: { notification_settings = {} } = {} } =
                await userService.addNotificationSetting(value)
            notification_settings = {
                ...userNotificationSettingEnum,
                ...notification_settings,
            }
            const data = {
                ...notification_settings,
            }
            res.status(200).send({
                message: messagesConstants.COMMON.SAVED,
                data,
            })
        } catch (error) {
            res.status(400).send({
                message: error.message,
            })
        }
    },
    getNotificationSetting: async (req, res) => {
        try {
            const { query = {} } = req
            const validData = await commonValidator.validateEmail(query)

            let { notification_settings = {} } =
                await userService.getNotificationSetting(validData.email)
            notification_settings = {
                ...userNotificationSettingEnum,
                ...notification_settings,
            }
            const data = {
                ...notification_settings,
            }
            res.status(200).send({
                message: messagesConstants.COMMON.GET_SUCCESS,
                data,
            })
        } catch (error) {
            res.status(400).send({
                message: error.message,
            })
        }
    },
    listUsers: async (_req, res) => {
        try {
            const userList = await userService.listUsers()
            res.status(200).send({
                message: messagesConstants.COMMON.GET_SUCCESS,
                data: userList,
            })
        } catch (error) {
            res.status(400).send({
                message: error.message,
            })
        }
    },
    addWishList: async (req, res) => {
        try {
            const { body = {} } = req

            const validData = await wishListValidator.validateAddWishList(body)
            await userService.addWishList(validData)
            res.status(200).send({
                message: messagesConstants.COMMON.SAVED,
            })
        } catch (error) {
            res.status(400).send({
                message: error.message,
            })
        }
    },
    listWishList: async (req, res) => {
        try {
            const { query = {} } = req
            const validData = await commonValidator.validateEmail(query)
            const { data = [] } = await userService.listWishList(
                validData.email
            )
            res.status(200).send({
                message: messagesConstants.COMMON.GET_SUCCESS,
                data,
            })
        } catch (error) {
            res.status(400).send({
                message: error.message,
            })
        }
    },
    getTopPerformer: async (_req, res) => {
        try {
            const topPerformer = await userService.getTopPerformer()
            res.status(200).send({
                message: messagesConstants.COMMON.GET_SUCCESS,
                data: topPerformer,
            })
        } catch (error) {
            res.status(400).send({
                message: error.message,
            })
        }
    },
    addWithStudents(req, res) {
        return Classroom.create(
            {
                class_name: req.body.class_name,
                students: req.body.students,
            },
            {
                include: [
                    {
                        model: Student,
                        as: "students",
                    },
                ],
            }
        )
            .then((classroom) => res.status(201).send(classroom))
            .catch((error) => res.status(400).send(error));
    },
};
