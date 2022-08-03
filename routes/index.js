const express = require("express");
const rootRouter = express.Router();

const authRouter = require("./auth");
 const rolesRouter = require("./roles");
 const permissionsRouter = require("./permissions");


rootRouter.use(authRouter);
rootRouter.use(rolesRouter);
rootRouter.use(permissionsRouter);


module.exports = rootRouter;