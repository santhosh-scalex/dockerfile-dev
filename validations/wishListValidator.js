const Joi = require('joi')
const { messagesConstants } = require('../utils')

module.exports = {
    validateAddWishList: async (data) => {
        try {
            const validateSchema = Joi.object().keys({
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
                data: Joi.array().items(
                    Joi.object().keys({
                        sneaker: Joi.object()
                            .keys({
                                sku: Joi.string()
                                    .trim()
                                    .required()
                                    .error((errors) => {
                                        errors.forEach((err) => {
                                            switch (err.code) {
                                                case 'string.empty':
                                                case 'string.required':
                                                    err.message =
                                                        messagesConstants.SKU.REQUIRED
                                                    break
                                            }
                                        })
                                        return errors
                                    }),
                                brand: Joi.string().allow(null).empty(''),
                                color_way: Joi.string().allow(null).empty(''),
                                description: Joi.string().allow(null).empty(''),
                                estimated_market_value: Joi.string()
                                    .allow(null)
                                    .empty(''),
                                gender: Joi.string().allow(null).empty(''),
                                image_360: Joi.string().allow(null).empty(''),
                                image_url: Joi.string().allow(null).empty(''),
                                name: Joi.string().allow(null).empty(''),
                                objectID: Joi.string().allow(null).empty(''),
                                release_date: Joi.string()
                                    .allow(null)
                                    .empty(''),
                                release_year: Joi.string()
                                    .allow(null)
                                    .empty(''),
                                retail_price: Joi.string()
                                    .allow(null)
                                    .empty(''),
                                silhoutte: Joi.string().allow(null).empty(''),
                                small_image_url: Joi.string()
                                    .allow(null)
                                    .empty(''),
                                uid: Joi.string().allow(null).empty(''),
                            })
                            .required(),
                        priority: Joi.number().allow(null).empty(''),
                    })
                ),
            })
            const { value, error } = validateSchema.validate(data)

            if (error) {
                return Promise.reject(error)
            }
            return Promise.resolve(value)
        } catch (error) {
            return Promise.reject(error)
        }
    },
}
