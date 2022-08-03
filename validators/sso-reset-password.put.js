const { validate, Joi } = require('express-validation');

module.exports = validate({
    body: Joi.object({
        password: Joi.string().min(8).required(),
        password_confirmation: Joi.string().required()
    })
}, {}, {})