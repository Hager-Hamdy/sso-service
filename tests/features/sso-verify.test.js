const { expect } = require("chai");
const chai = require("chai");
const http = require("http");
const moment = require("moment");
const chaiHttp = require('chai-http');
const { describe } = require("mocha");
const sinon = require("sinon");
const app = require("../../app.js");
const umzug = require("../../umzug.js");
const { mock: nodemailerMock } = require("nodemailer-mock");
const {User} = require("../../models/index.js");
const server = http.createServer(app);
chai.use(chaiHttp);

describe("POST /sso-verify", function() {

    let cookies;

    before(async () => {
        await umzug.down({to: 0});
        await umzug.up();
        nodemailerMock.reset();
        // Registring a User
        const signupResponse = await chai.request(server).post("/sso-signup").send({
            "name": "john Deo",
            "email": "info@ibbil-markets.com",
            "avatar": "ibbil-storage/xyz.png",
            "phone": "12313214",
            "status": "active",
            "password": "mySecretPassword",
            "preferred_date_type": "gregorian",
            "app_name": "ibbil_markets"
        });
        const setCookies = signupResponse.headers["set-cookie"];
        cookies = "";
        if(setCookies && setCookies.length) {
            setCookies.forEach((cookie) => {
                cookies += cookie.match(/^[^;]+/)[0] + ";";
            })
        }
    })

    it("sso-verify sending invalid OTP", async () => {
        const response = await chai.request(server).post("/sso-verify").set("Cookie", cookies).send({
            "otp": "123465"
        });
        expect(response.status).to.eql(400);
        expect(response.body.data.success).to.eql(false);
    })

    it("sso-verify sending expired OTP", async () => {
        const clock = sinon.useFakeTimers(new Date(moment().add(1, "day").format()));
        const response = await chai.request(server).post("/sso-verify").set("Cookie", cookies).send({
            "otp": "123456"
        });
        expect(response.status).to.eql(400);
        expect(response.body.data.success).to.eql(false);
        clock.restore();
    })

    it("sso-verify sending valid OTP", async () => {
        const response = await chai.request(server).post("/sso-verify").set("Cookie", cookies).send({
            "otp": "123456"
        });
        expect(response.status).to.eql(200);
        expect(response.body.data.success).to.eql(true);
    })

    it("sso-verify verifying if user is verified", async () => {
        const user = await User.findOne({
            where: {
                email: "info@ibbil-markets.com"
            }
        });
        expect(user.phone_verified_at).to.not.null;
    })

    after(() => {
        nodemailerMock.reset();
    })
})