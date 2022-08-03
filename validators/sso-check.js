const { validate, Joi } = require('express-validation');

module.exports = validate({
    body: Joi.object({
        user: Joi.string().required(),
    })
}, {}, {})