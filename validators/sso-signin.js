const { validate, Joi } = require('express-validation');

module.exports = validate({
    body: Joi.object({
        user: Joi.string().required(),
        password: Joi.string().required(),
        app_name: Joi.string()
    })
}, {}, {})