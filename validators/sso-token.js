const { validate, Joi } = require('express-validation');

module.exports = validate({
    body: Joi.object({
        token: Joi.string().required()
    })
}, {}, {})