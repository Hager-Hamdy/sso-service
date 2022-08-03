const { validate, Joi } = require('express-validation');

module.exports = validate({
    query: Joi.object({
        user: Joi.string().required(),
    })
}, {}, {})