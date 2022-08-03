const express = require("express");
const permissionRouter = express.Router();
// const Auth = require("../middlewares/auth.js");
// const AuthorizeRole = require("../middlewares/authorize-role.js");
const PermissionController = require("../controllers/PermissionController");

const PermissionRequests = require("../validators/permission-requests");

// GET /api/v1/permissions
// permissionRouter.get("/api/v1/permissions", Auth.JWT_SESSION, AuthorizeRole.OR(["admin", "owner"]), PermissionRequests.index, PermissionController.index);
//
// // POST /api/v1/permissions
// permissionRouter.post("/api/v1/permissions", Auth.JWT_SESSION, AuthorizeRole.OR(["admin", "owner"]), PermissionRequests.create, PermissionController.create);
//
// // GET /api/v1/permissions/{permissionId}
// permissionRouter.get("/api/v1/permissions/:permissionId", Auth.JWT_SESSION, AuthorizeRole.OR(["admin", "owner"]), PermissionRequests.get, PermissionController.get);
//
// // PUT /api/v1/permissions/{permissionId}
// permissionRouter.put("/api/v1/permissions/:permissionId", Auth.JWT_SESSION, AuthorizeRole.OR(["admin", "owner"]), PermissionRequests.update, PermissionController.update);
//
// // DELETE /api/v1/permissions/{permissionId}
// permissionRouter.delete("/api/v1/permissions/:permissionId", Auth.JWT_SESSION, AuthorizeRole.OR(["admin", "owner"]), PermissionRequests.delete, PermissionController.delete);

permissionRouter.get("/api/v1/permissions", PermissionRequests.index, PermissionController.index);

// POST /api/v1/permissions
permissionRouter.post("/api/v1/permissions", PermissionRequests.create, PermissionController.create);

// GET /api/v1/permissions/{permissionId}
permissionRouter.get("/api/v1/permissions/:permissionId", PermissionRequests.get, PermissionController.get);

// PUT /api/v1/permissions/{permissionId}
permissionRouter.put("/api/v1/permissions/:permissionId", PermissionRequests.update, PermissionController.update);

// DELETE /api/v1/permissions/{permissionId}
permissionRouter.delete("/api/v1/permissions/:permissionId", PermissionRequests.delete, PermissionController.delete);


module.exports = permissionRouter;