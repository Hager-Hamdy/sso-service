const { getPagination, getPagingData } = require("../helpers/pagination.js");
const {Role} = require("../models/index.js");

module.exports = {
  index: async (req, res) => {
    const { page } = req.query;
    const pageSize = 10;
    const {limit, offset} = getPagination(page, pageSize);
    const count = await Role.count();
    const roles = await Role.findAll({
      offset,
      limit,
      raw: true
    });
    return res.status(200).send(getPagingData({count, rows: roles}, page, pageSize));
  },
  get: async (req, res) => {
    const {roleId} = req.params;
    const role = await Role.findByPk(roleId);
    if(!role)
      return res.status(404).json({
        message: "role not found"
      });
    return res.status(200).json(role);
  },
  create: async (req, res) => {
    const {name, description} = req.body;
    const role = await Role.findOne({
      where: {
        name: name.trim()
      }
    });
    if(role) {
      return res.status(400).json({
        message: "role name already exists"
      });
    }
    await Role.create({
      name: name.trim(),
      description: typeof description === "string" ? description.trim() : null
    });
    return res.status(201).json({
      message: "role created successfully"
    });
  },
  update: async (req, res) => {
    const {roleId} = req.params;
    const {name, description} = req.body;
    const role = await Role.findByPk(roleId);
    if(!role)
      return res.status(400).json({
        message: "role not found"
      });
    if(name !== undefined) {
      role.name = typeof name === "string" ? name.trim() : null;
    }
    if(description !== undefined) {
      role.description = typeof description === "string" ? description.trim() : null;
    }
    await role.save();
    res.status(200).json({
      message: "role updated successfully"
    });
  },
  delete: async (req, res) => {
    const {roleId} = req.params;
    const role = await Role.findByPk(roleId);
    await role.destroy();
    res.status(200).send("");
  }
}