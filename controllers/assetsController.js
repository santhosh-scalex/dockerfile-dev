const Joi = require('joi')
const { assetsService } = require('../services')
const { soleGradeEnum } = require('../enum')
const { messagesConstants } = require('../utils')
const { commonValidator, assetsValidator } = require('../validations')

module.exports = {
    addAssetsMetaData: async (req, res) => {
        try {
            const { body = {} } = req

            const validData = await assetsValidator.validateAddAssetsMetaData(
                body
            )

            let { dataValues: { global_meta_data: data = {} } = {} } =
                await assetsService.addAssetsMetaData(validData)

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
    getAssetsMetaData: async (req, res) => {
        try {
            const { query = {} } = req
            const validData = await commonValidator.validateEmail(query)
            let { global_meta_data: data = {} } =
                await assetsService.getAssetsMetaData(validData.email)
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
    addAsset: async (req, res) => {
        try {
            const { body: { email, data = [] } = {} } = req

            data.map((element) => {
                element.email = email
                if (element.sole_grade) {
                    element.condition = soleGradeEnum[element.sole_grade] || ''
                }
                return element
            })

            let validData = await assetsValidator.validateAddAssets(data)
            validData = validData.map((item) => {
                if (item.stored) {
                    item.stored = item.stored.toString()
                }
                return item
            })
            const assetsData = await assetsService.addAsset(validData)
            return res.status(200).send({
                message: messagesConstants.ASSETS.ADDED_SUCCESSFULLY,
                data: assetsData,
            })
        } catch (error) {
            res.status(400).send({
                message: error.message,
            })
        }
    },
    getAssetsById: async (req, res) => {
        try {
            const { params: { id } = {} } = req
            const assetDetail = await assetsService.getAssetsById(id)
            res.status(200).send({
                message: messagesConstants.COMMON.GET_SUCCESS,
                data: assetDetail,
            })
        } catch (error) {
            res.status(400).send({
                message: error.message,
            })
        }
    },
    getAssetsCount: async (req, res) => {
        try {
            const { query: { email = [] } = {} } = req

            const validateAssetsListing = Joi.array().items(
                Joi.string()
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
                    })
            )
            const { value, error } = validateAssetsListing.validate(email)

            if (error) {
                return res.status(400).send({
                    message: error.message,
                })
            }

            const assetsList = await assetsService.getAssetsCount(value)
            res.status(200).send({
                message: messagesConstants.COMMON.GET_SUCCESS,
                data: assetsList,
            })
        } catch (error) {
            res.status(400).send({
                message: error.message,
            })
        }
    },
    listAssets: async (req, res) => {
        try {
            const { query = {} } = req
            const validData = await commonValidator.validateEmail(query)
            const { count = 0, rows: data = [] } =
                await assetsService.listAssets(validData)
            res.status(200).send({
                message: messagesConstants.COMMON.GET_SUCCESS,
                count,
                data,
            })
        } catch (error) {
            res.status(400).send({
                message: error.message,
            })
        }
    },
    listPublicAssets: async (req, res) => {
        try {
            const { query = {} } = req
            const validData = await commonValidator.validateEmail(query)

            // checking for public assets
            validData.is_private = false

            const { count = 0, rows: data = [] } =
                await assetsService.listAssets(validData)
            res.status(200).send({
                message: messagesConstants.COMMON.GET_SUCCESS,
                count,
                data,
            })
        } catch (error) {
            res.status(400).send({
                message: error.message,
            })
        }
    },
}
