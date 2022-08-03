const { validate, Joi } = require('express-validation');

module.exports = validate({
    body: Joi.object({
        name: Joi.string(),
        email: Joi.string().email().required(),
        avatar: Joi.string(),
        phone: Joi.string().required(),
        status: Joi.string().valid('super_admin', 'active', 'banned', 'pending'),
        password: Joi.string().min(8).required(),
        preferred_date_type: Joi.string().valid('gregorian', 'hijri'),
       // app_name: Joi.string().required(),
    })
}, {}, {})