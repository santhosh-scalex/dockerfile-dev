const Joi = require('joi')
const { messagesConstants } = require('../utils')

module.exports = {
    validateAddAssets: async (requestBody) => {
        try {
            const validateSchema = Joi.array().items(
                Joi.object().keys({
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
                    range: Joi.string()
                        .trim()
                        .required()
                        .valid(
                            '1 to 25',
                            '26 to 50',
                            '51 to 75',
                            '76 to 100',
                            '101 to 250',
                            '251 to 500',
                            '500+'
                        )
                        .error((errors) => {
                            errors.forEach((err) => {
                                switch (err.code) {
                                    case 'string.empty':
                                    case 'string.required':
                                    case 'any.only':
                                        err.message =
                                            messagesConstants.RANGE.VALID_RANGE
                                        break
                                }
                            })
                            return errors
                        }),
                    size: Joi.string()
                        .trim()
                        .required()
                        .valid(
                            '1 M/- W',
                            '1.5 M/3 W',
                            '2 M/3.5 W',
                            '2.5 M/4 W',
                            '3 M/4.5 W',
                            '3.5 M/5 W',
                            '4 M/5.5 W',
                            '4.5 M/6 W',
                            '5 M/6.5 W',
                            '5.5 M/7 W',
                            '6 M/7.5 W',
                            '6.5 M/8 W',
                            '7 M/8.5 W',
                            '7.5 M/9 W',
                            '8 M/9.5 W',
                            '8.5 M/10 W',
                            '9 M/10.5 W',
                            '9.5 M/11 W',
                            '10 M/11.5 W',
                            '10.5 M/12 W',
                            '11 M/12.5 W',
                            '11.5 M/13 W',
                            '12 M/13.5 W',
                            '12.5 M/14 W',
                            '13 M/14.5 W',
                            '13.5 M/15 W',
                            '14 M/15.5 W',
                            '14.5 M/16 W',
                            '15 M/16.5 W',
                            '15.5 M/17 W',
                            '16 M/17.5 W',
                            '16.5 M/18 W'
                        )
                        .error((errors) => {
                            errors.forEach((err) => {
                                switch (err.code) {
                                    case 'string.empty':
                                    case 'string.required':
                                    case 'any.only':
                                        err.message =
                                            messagesConstants.SIZE.VALID_SIZE
                                        break
                                }
                            })
                            return errors
                        }),

                    sole_grade: Joi.string()
                        .trim()
                        .required()
                        .valid(
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '9.5',
                            '10'
                        )
                        .error((errors) => {
                            errors.forEach((err) => {
                                switch (err.code) {
                                    case 'string.empty':
                                    case 'string.required':
                                    case 'any.only':
                                        err.message =
                                            messagesConstants.SOLE_GRADE.VALID_SOLE_GRADE
                                        break
                                }
                            })
                            return errors
                        }),
                    condition: Joi.string()
                        .trim()
                        .required()
                        .valid('D', 'B', 'D/O', 'G/W', 'NDS', 'VNDS', 'DS')
                        .error((errors) => {
                            errors.forEach((err) => {
                                switch (err.code) {
                                    case 'string.empty':
                                    case 'string.required':
                                    case 'any.only':
                                        err.message =
                                            messagesConstants.CONDITION.VALID_CONDITION
                                        break
                                }
                            })
                            return errors
                        }),
                    stored: Joi.array()
                        .items(
                            Joi.string()
                                .valid(
                                    null,
                                    '',
                                    'Original Boxes',
                                    'Display Boxes',
                                    'Open Shelves',
                                    'Storage Bins',
                                    'Plastic Wrapped'
                                )
                                .default('')
                        )
                        .error((errors) => {
                            errors.forEach((err) => {
                                switch (err.code) {
                                    case 'string.empty':
                                    case 'string.required':
                                    case 'any.only':
                                        err.message =
                                            messagesConstants.STORED.VALID_STORED
                                        break
                                }
                            })
                            return errors
                        }),
                    is_self_service: Joi.boolean()
                        .allow(null)
                        .allow('')
                        .empty(''),
                    is_solesafe_premium_service: Joi.boolean()
                        .allow(null)
                        .allow('')
                        .empty(''),
                    image_url: Joi.string().allow(null).allow(''),
                })
            )

            let { value, error } = validateSchema.validate(requestBody)

            if (error) {
                return Promise.reject(error)
            }
            return Promise.resolve(value)
        } catch (error) {
            return Promise.reject(error)
        }
    },
    validateAddAssetsMetaData: async (requestBody) => {
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
                global_meta_data: Joi.object().keys({
                    range: Joi.string()
                        .trim()
                        .required()
                        .valid(
                            '1 to 25',
                            '26 to 50',
                            '51 to 75',
                            '76 to 100',
                            '101 to 250',
                            '251 to 500',
                            '500+'
                        )
                        .error((errors) => {
                            errors.forEach((err) => {
                                switch (err.code) {
                                    case 'string.empty':
                                    case 'string.required':
                                    case 'any.only':
                                        err.message =
                                            messagesConstants.RANGE.VALID_RANGE
                                        break
                                }
                            })
                            return errors
                        }),
                    size: Joi.string()
                        .trim()
                        .required()
                        .valid(
                            '1 M/- W',
                            '1.5 M/3 W',
                            '2 M/3.5 W',
                            '2.5 M/4 W',
                            '3 M/4.5 W',
                            '3.5 M/5 W',
                            '4 M/5.5 W',
                            '4.5 M/6 W',
                            '5 M/6.5 W',
                            '5.5 M/7 W',
                            '6 M/7.5 W',
                            '6.5 M/8 W',
                            '7 M/8.5 W',
                            '7.5 M/9 W',
                            '8 M/9.5 W',
                            '8.5 M/10 W',
                            '9 M/10.5 W',
                            '9.5 M/11 W',
                            '10 M/11.5 W',
                            '10.5 M/12 W',
                            '11 M/12.5 W',
                            '11.5 M/13 W',
                            '12 M/13.5 W',
                            '12.5 M/14 W',
                            '13 M/14.5 W',
                            '13.5 M/15 W',
                            '14 M/15.5 W',
                            '14.5 M/16 W',
                            '15 M/16.5 W',
                            '15.5 M/17 W',
                            '16 M/17.5 W',
                            '16.5 M/18 W'
                        )
                        .error((errors) => {
                            errors.forEach((err) => {
                                switch (err.code) {
                                    case 'string.empty':
                                    case 'string.required':
                                    case 'any.only':
                                        err.message =
                                            messagesConstants.SIZE.VALID_SIZE
                                        break
                                }
                            })
                            return errors
                        }),

                    sole_grade: Joi.string()
                        .trim()
                        .required()
                        .valid(
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '9.5',
                            '10'
                        )
                        .error((errors) => {
                            errors.forEach((err) => {
                                switch (err.code) {
                                    case 'string.empty':
                                    case 'string.required':
                                    case 'any.only':
                                        err.message =
                                            messagesConstants.SOLE_GRADE.VALID_SIZE
                                        break
                                }
                            })
                            return errors
                        }),
                    stored: Joi.array()
                        .items(
                            Joi.string()
                                .valid(
                                    null,
                                    '',
                                    'Original Boxes',
                                    'Display Boxes',
                                    'Open Shelves',
                                    'Storage Bins',
                                    'Plastic Wrapped'
                                )
                                .default('')
                        )
                        .error((errors) => {
                            errors.forEach((err) => {
                                switch (err.code) {
                                    case 'string.empty':
                                    case 'string.required':
                                    case 'any.only':
                                        err.message =
                                            messagesConstants.STORED.VALID_STORED
                                        break
                                }
                            })
                            return errors
                        }),
                }),
            })
            const { value, error } = validateSchema.validate(requestBody)

            if (error) {
                return Promise.reject(error)
            }
            return Promise.resolve(value)
        } catch (error) {
            return Promise.reject(error)
        }
    },
}
