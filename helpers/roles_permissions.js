const {RoleUser, Role, PermissionUser, Permission} = require("../models");


const getUserRolesAndPermissions = async (userId) => {
    const roles = []
    const permissions = []
    const role_user = await RoleUser.findAll({where: {
            user_id: userId
        }})
    for (let _role of role_user) {
        const role = await Role.findOne({ where: { id: _role.role_id }})
        roles.push({app_name: role.app_name, role: role.slug})
    }

    const permission_user = await PermissionUser.findAll({where: {
            user_id: userId
        }})
    for (let _permission of permission_user) {
        const permission = await Permission.findOne({where: {id: _permission.permission_id}})
        permissions.push(permission.slug)
    }
    return { roles, permissions }
}

module.exports = {
    getUserRolesAndPermissions
}