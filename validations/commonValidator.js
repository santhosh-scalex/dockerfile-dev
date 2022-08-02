const Joi = require("joi");
const { messagesConstants } = require("../utils");

module.exports = {
    validateEmail: async (requestBody) => {
        try {
            const validateEmailSchema = Joi.object().keys({
                email: Joi.string()
                    .trim()
                    .required()
                    .email()
                    .error((errors) => {
                        errors.forEach((err) => {
                            switch (err.code) {
                                case "any.required":
                                case "string.empty":
                                case "string.required":
                                    err.message =
                                        messagesConstants.COMMON.EMAIL.REQUIRED;
                                    break;
                                case "string.email":
                                    err.message =
                                        messagesConstants.COMMON.EMAIL.VALID_EMAIL;
                                    break;
                            }
                        });
                        return errors;
                    }),
            });

            const { value, error } = validateEmailSchema.validate(requestBody);

            if (error) {
                return Promise.reject(error);
            }
            return Promise.resolve(value);
        } catch (error) {
            return Promise.reject(error);
        }
    },
};
