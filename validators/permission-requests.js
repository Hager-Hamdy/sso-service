const { validate, Joi } = require('express-validation');

module.exports = {
  index: validate({
    query: Joi.object({
      ["page"]: Joi.number().optional(),
      ["lang"]: Joi.string().allow(null, '').optional()
    })
  }, {}, {}),
  create: validate({
    body: Joi.object({
      ["name"]: Joi.string().required(),
      ["description"]: Joi.string().allow(null, '').optional()
    })
  }, {}, {}),
  get: validate({
    params: Joi.object({
      ["permissionId"]: Joi.number().required()
    })
  }, {}, {}),
  update: validate({
    body: Joi.object({
      ["name"]: Joi.string().required(),
      ["description"]: Joi.string().allow(null, '').optional()
    }),
    params: Joi.object({
      ["permissionId"]: Joi.number().required()
    })
  }, {}, {}),
  delete: validate({
    params: Joi.object({
      ["permissionId"]: Joi.number().required()
    })
  }, {}, {})
}