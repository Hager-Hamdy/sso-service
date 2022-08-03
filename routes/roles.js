const express = require("express");
const roleRouter = express.Router();
// const Auth = require("../middlewares/auth.js");
// const AuthorizeRole = require("../middlewares/authorize-role.js");
const RoleController = require("../controllers/RoleController.js");

const RoleRequests = require("../validators/role-requests");

// GET /api/v1/roles
// roleRouter.get("/api/v1/roles", Auth.JWT_SESSION, AuthorizeRole.OR(["admin", "owner"]), RoleRequests.index, RoleController.index);
//
// // POST /api/v1/roles
// roleRouter.post("/api/v1/roles", Auth.JWT_SESSION, AuthorizeRole.OR(["admin", "owner"]), RoleRequests.create, RoleController.create);
//
// // GET /api/v1/roles/{roleId}
// roleRouter.get("/api/v1/roles/:roleId", Auth.JWT_SESSION, AuthorizeRole.OR(["admin", "owner"]), RoleRequests.get, RoleController.get);
//
// // PUT /api/v1/roles/{roleId}
// roleRouter.put("/api/v1/roles/:roleId", Auth.JWT_SESSION, AuthorizeRole.OR(["admin", "owner"]), RoleRequests.update, RoleController.update);
//
// // DELETE /api/v1/roles/{roleId}
// roleRouter.delete("/api/v1/roles/:roleId", Auth.JWT_SESSION, AuthorizeRole.OR(["admin", "owner"]), RoleRequests.delete, RoleController.delete);

roleRouter.get("/api/v1/roles",  RoleRequests.index, RoleController.index);

// POST /api/v1/roles
roleRouter.post("/api/v1/roles", RoleRequests.create, RoleController.create);

// GET /api/v1/roles/{roleId}
roleRouter.get("/api/v1/roles/:roleId",  RoleRequests.get, RoleController.get);

// PUT /api/v1/roles/{roleId}
roleRouter.put("/api/v1/roles/:roleId", RoleRequests.update, RoleController.update);

// DELETE /api/v1/roles/{roleId}
roleRouter.delete("/api/v1/roles/:roleId",  RoleRequests.delete, RoleController.delete);


module.exports = roleRouter;