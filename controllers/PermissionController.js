const { getPagination, getPagingData } = require("../helpers/pagination.js");
const {Permission, PermissionRole, Role, RoleUser, PermissionUser} = require("../models/index.js");

module.exports = {
  index: async (req, res) => {
    const { page } = req.query;
    const pageSize = 10;
    const {limit, offset} = getPagination(page, pageSize);
    const count = await Permission.count();
    const permissions = await Permission.findAll({
      offset,
      limit,
      raw: true
    });
    return res.status(200).send(getPagingData({count, rows: permissions}, page, pageSize));
  },

  get: async (req, res) => {
    const {permissionId} = req.params;
    const permission = await Permission.findByPk(permissionId);
    if(!permission)
      return res.status(404).json({
        message: "permission not found"
      });
    return res.status(200).json(permission);
  },
  create: async (req, res) => {
    const {name, description} = req.body;
    const permission = await Permission.findOne({
      where: {
        name: name.trim()
      }
    });
    if(permission) {
      return res.status(400).json({
        message: "permission name already exists"
      });
    }
    await Permission.create({
      name: name.trim(),
      description: typeof description === "string" ? description.trim() : null
    });
    return res.status(201).json({
      message: "permission created successfully"
    });
  },
  update: async (req, res) => {
    const {permissionId} = req.params;
    const {name, description} = req.body;
    const permission = await Permission.findByPk(permissionId);
    if(!permission)
      return res.status(400).json({
        message: "permission not found"
      });
    if(name !== undefined) {
      permission.name = typeof name === "string" ? name.trim() : null;
    }
    if(description !== undefined) {
      permission.description = typeof description === "string" ? description.trim() : null;
    }
    await permission.save();
    return res.status(200).json({
      message: "permission updated successfully"
    });
  },
  delete: async (req, res) => {
    const {permissionId} = req.params;
    const permission = await Permission.findByPk(permissionId);
    await permission.destroy();
    res.status(200).send("");
  }
}