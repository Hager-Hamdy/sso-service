const { User, App, AppUser, Role, RoleUser, PermissionRole, PermissionUser } = require("../models/index.js");
const moment = require("moment");
const {Op} = require('sequelize');
const { sendOTP } = require("../helpers/email.js");
const { setSessionValues } = require("../helpers/session.js");
const md5 = require("md5");

module.exports = {
    index: async (req, res) => {
        const {name, email, avatar, phone, status, password, preferred_date_type} = req.body;
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    {
                        email
                    },
                    {
                        phone
                    }
                ]
            }
        })
        if(existingUser === null) {
            const user = await User.create({name, email, avatar, phone, status, password: md5(password), preferred_date_type});

            const userRoles = await Role.findAll({ where: {
                    name: "user"
            }})
userRoles.forEach(async item => {
    await RoleUser.create({
        user_id: user.id,
        role_id: item.id
    })
    const rolePermissions = await PermissionRole.findAll({ where: {
            role_id: item.id
        }})
    rolePermissions.forEach(async item => {
        await PermissionUser.create({
            user_id: user.id,
            permission_id: item.permission_id
        })
    })
})
            // Sending OTP
            sendOTP({
                req,
                user
            });
            return res.status(201).json({
                message: "successfully registered",
                user
            });
        } else {
            return res.json({
                message: "email or phone already exist",
                user: ""
            });
        }
    },
    verify: async (req, res) => {
        const {registerOtpExpires, registerOtp, registerEmail} = req.session;
        const {otp} = req.body;
        if(registerOtpExpires < parseInt(moment().format("X"))) {
            return res.status(400).json({
                data: {
                    success: false,
                    message: "otp expired"
                }
            });
        }
        if(registerOtp === null || otp != registerOtp) {
            return res.status(400).json({
                data: {
                    success: false,
                    message: "invalid otp"
                }
            });
        }
        const user = await User.findOne({
            where: {
                email: registerEmail
            }
        })
        if(user) {
            setSessionValues(req, {
                registerOtp: null,
                registerEmail: null,
                registerOtpExpires: 0
            });
            user.phone_verified_at = moment();
            await user.save();
        }
        return res.status(200).json({
            data: {
                success: true,
                message: "account verified"
            }
        });
    }
}