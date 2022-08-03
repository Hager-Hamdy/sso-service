const { JWT_SECRET } = require("../config.js");
const { User, RoleUser, Role, Token, PermissionUser, Permission } = require("../models/index.js");
const {Op} = require('sequelize');
const moment = require("moment");
const jwt = require('jsonwebtoken');
const { sendResetOTP } = require("../helpers/email.js");
const { setSessionValues } = require("../helpers/session.js");
const md5 = require("md5");
const cache = require('../services/cache');
const { getUserRolesAndPermissions } = require("../helpers/roles_permissions.js");

module.exports = {
    login: async (req, res) => {
        const {user: username, password, app_name} = req.body;
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    {
                        email: username,
                        password: md5(password)
                    },
                    {
                        phone: username,
                        password: md5(password)
                    }
                ]
            }
        })
        if(user !== null) {
            if(user.status === "banned") {
                return res.status(400).json({
                    message: "please activate/verify your account first"
                });
            }
            if(user.status === "pending") {
                return res.status(400).json({
                    message: "please contact system administrator"
                });
            }
                const roles_permissions = await getUserRolesAndPermissions(user.id)
                const issuedTime = moment();
                const expireAt = moment().add(1, "months");
                const token = jwt.sign({
                    user_id: user.id,
 //                   roles,
//                    permissions,
                    iat: parseInt(issuedTime.format("X")),
                    expire: parseInt(expireAt.format("X"))
                }, JWT_SECRET);
                // TODO: store token in cache
                await Token.create({
                    token
                })
                return res.json({
                    data: {
                        name: user.name,
                        avatar: `https://ebil.storage/${user.avatar}`,
                        status: user.status,
                    },
                    meta: {
                        message: "successfully logged in.",
                        token,
                        session_expire_at: expireAt.format()
                    },
                    roles: roles_permissions.roles,
                    permissions: roles_permissions.permissions,
                });
        }
    
        return res.json({
            message: "User or Password is incorrect!"
        });
    },
    token: async (req, res) => {
        // const decoded = jwt.decode(req.body.token);
         //let token = ""
        // const { user_id } = decoded
        //const cached_token = await cache.get("user_" + user_id);
        // if (cached_token) {
        //     token = cached_token
        // } else {
             const token = await Token.findOne({
                where: {
                    token: req.body.token
                }
            })
        // if (token_from_db) token = token_from_db.token
        //}

        if(token) {
            try {
                const payload = jwt.verify(token.token, JWT_SECRET);
             //   if (!cached_token)  await cache.set("user_" + user_id, token);
                const user = await User.findOne({
                    where: {
                        id: payload.user_id
                    }
                });
                // incase user not found in DB
                if(!user) {
                    return res.status(401).send({
                        message: "Unauthorized"
                    });
                }
                const roles_permissions = await getUserRolesAndPermissions(user.id)
                console.log(roles_permissions.permissions)
                return res.status(200).send({ user, roles: roles_permissions.roles, permissions: roles_permissions.permissions });
            } catch(err) {
                console.log("Expired Token")
                 await Token.destroy({
                    where: {
                        id: token.id
                    }
                })
                 await token.destroy()
                return res.status(401).send({
                    message: "Unauthorized"
                });
            }

        } else return res.status(401).send({
            message: "Unauthorized"
        });

    },
    check_permission: async (req, res) => {
        const { user_id, permission_name } = req.body
        const permissions = []
        const user_permissions = await PermissionUser.find({
                where: {
                    user_id
                }})
        user_permissions.map(async item => {
            const permission = await Permission.findOne({where: {id: item.permission_id}})
            if (permission.name === permission_name)  return res.status(200).send("This user has permission to " + permission_name);

        })
        return res.status(401).send({
            message: "Unauthorized"
        });
    },
    check: async (req, res) => {
        const {user: username} = req.body
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    {
                        email: username
                    },
                    {
                        phone: username
                    }
                ]
            }
        })
        if(user === null) {
            return res.status(404).json({
                data: {
                    success: true,
                }
            });
        }
        return res.status(200).json({
            data: {
                success: false,
                errors: [
                    {
                        message: "this email is already registered, please login or use another one"
                    }
                ]
            }
        });
    },
    sendResetPassword: async (req, res) => {
        const {user: username} = req.query
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    {
                        email: username
                    },
                    {
                        phone: username
                    }
                ]
            }
        })
        if(user !== null) {
            sendResetOTP({
                req,
                user
            });
        }
        return res.status(200).set("Content-Type", "application/json").send({
            "data":{
                "message": "if this email is stored in our system then we will send instruction message please check your inbox"
            }
        });
    },
    resetPassword: async (req, res) => {
        const {password, password_confirmation} = req.body
        const {otpVerified, resetEmail} = req.session;
        if(!otpVerified) {
            return res.status(400).json({
                "data": {
                    "success": false,
                    "message": "please verify your otp"
                }
            });
        }
        if(password !== password_confirmation) {
            return res.status(400).json({
                "data": {
                    "success": false,
                    "message": "password don't match with confirm password"
                }
            });
        }
        const user = await User.findOne({
            where: {
                email: resetEmail
            },
        })
        if(user !== null) {
            setSessionValues(req, {
                resetOtp: null,
                resetEmail: null,
                otpVerified: false,
                otpExpires: 0
            });
            user.password = md5(password);
            await user.save();
        }
        return res.status(200).json({
            "data":{
                "message": "password successfully reset"
            }
        });
    },
    verifyResetOtp: async (req, res) => {
        const {otpExpires, resetOtp} = req.session;
        const {otp} = req.body;
        if(otpExpires < parseInt(moment().format("X"))) {
            return res.status(400).json({
                data: {
                    success: false,
                    message: "otp expired"
                }
            });
        }
        if(resetOtp === null || otp != resetOtp) {
            return res.status(400).json({
                data: {
                    success: false,
                    message: "invalid otp"
                }
            });
        }
        req.session.otpVerified = true;
        return res.status(200).json({
            data: {
                success: true,
                message: "otp verified"
            }
        });
    },
    logout: async (req, res) => {
        const token = await Token.findOne({
            where: {
                token: req.session.token
            }
        })
        await token.destroy()
        req.session.destroy();
        return res.status(200).send("");
    }
}