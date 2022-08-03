const moment = require("moment");
const { sessionHelper, stringHelper } = require("../helpers.js");
const { FROM_NAME, FROM_EMAIL } = require("../config.js");
const { transporter } = require("../services/mailer.js");

const sendOTP = ({req, user}) => {
    const otp = stringHelper.generateOTP();
    sessionHelper.setSessionValues(req, {
        registerOtp: otp,
        registerEmail: user.email,
        registerOtpExpires: parseInt(moment().add(1, "hour").format("X"))
    });
    // Sending email
    transporter.sendMail({
        from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
        to: user.email,
        subject: "Registration verification",
        text: `OTP: ${otp}`,
        html: `OTP: <b>${otp}</b>`
    });
}

const sendResetOTP = ({req, user}) => {
    const otp = stringHelper.generateOTP();
    sessionHelper.setSessionValues(req, {
        resetOtp: otp,
        resetEmail: user.email,
        otpVerified: false,
        otpExpires: parseInt(moment().add(1, "hour").format("X"))
    });
    // Sending email
    transporter.sendMail({
        from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
        to: user.email,
        subject: "Password reset",
        text: `Reset OTP: ${otp}`,
        html: `Reset OTP: <b>${otp}</b>`
    });
}

module.exports = {
    sendOTP,
    sendResetOTP
};