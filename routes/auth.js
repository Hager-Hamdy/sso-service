const express = require("express");
const router = express.Router();

const SSOSignupValidator = require("../validators/sso-signup.js");
const SSOResetPasswordOTPVerifyValidator = require("../validators/sso-reset-otp-verify.js");

const SSOSigninValidator = require("../validators/sso-signin.js");
const SSOCheckValidator = require("../validators/sso-check.js");
const SSOResetPasswordValidator = require("../validators/sso-reset-password.js");
const SSOResetPasswordPUTValidator = require("../validators/sso-reset-password.put.js");
const SSOTokenValidator = require("../validators/sso-token.js");
const SSOCheckPermissionValidator = require("../validators/sso-check-permission");

const SignupController = require("../controllers/SignupController.js");
const AuthController = require("../controllers/AuthController.js");

// POST /sso-signup
router.post('/sso-signup', SSOSignupValidator, SignupController.index);

// POST /sso-verify
router.post('/sso-verify', SSOResetPasswordOTPVerifyValidator, SignupController.verify);

// POST /sso-login
router.post('/sso-login', SSOSigninValidator, AuthController.login);

// POST /sso-token
router.post('/sso-token', SSOTokenValidator, AuthController.token);

router.post('/sso-permission', SSOCheckPermissionValidator, AuthController.check_permission);

// POST /sso-check
router.post('/sso-check', SSOCheckValidator, AuthController.check)

// GET /sso-reset-password
router.get('/sso-reset-password', SSOResetPasswordValidator, AuthController.sendResetPassword)

// PUT /sso-reset-password
router.put('/sso-reset-password', SSOResetPasswordPUTValidator, AuthController.resetPassword)

// POST /sso-reset-otp-verify
router.post('/sso-reset-otp-verify', SSOResetPasswordOTPVerifyValidator, AuthController.verifyResetOtp);

router.post('/sso-logout', AuthController.logout);


module.exports = router;