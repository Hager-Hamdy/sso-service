const { expect } = require("chai");
const chai = require("chai");
const http = require("http");
const chaiHttp = require('chai-http');
const { describe } = require("mocha");
const app = require("../../app.js");
const umzug = require("../../umzug.js");
const sinon = require("sinon");
const moment = require("moment");
const { User, ConnectedApp } = require("../../models/index.js");
const md5 = require("md5");
const server = http.createServer(app);
chai.use(chaiHttp);

describe("POST /sso-reset-otp-verify", function() {

    before(async () => {
        await umzug.down({to: 0});
        await umzug.up();

        const user = await User.create({
            "name": "john Deo",
            "email": "info@ibbil-markets.com",
            "avatar": "ibbil-storage/xyz.png",
            "phone": "12313214",
            "status": "active",
            "password": md5("mySecretPassword"),
            "preferred_date_type": "gregorian"
        });
        await ConnectedApp.create({
            user_id: user.id,
            app: "ibbil_markets"
        })
    })

    it("sso-reset-verify using valid otp", async () => {
        const response = await chai.request(server).get("/sso-reset-password").query({
            "user": "info@ibbil-markets.com"
        }).send();
        expect(response.status).to.eql(200);
        expect(response.body).to.eql({
            "data":{
                "message": "if this email is stored in our system then we will send instruction message please check your inbox"
            }
        });
        const setCookies = response.headers["set-cookie"];
        let cookies = "";
        if(setCookies && setCookies.length) {
            setCookies.forEach((cookie) => {
                cookies += cookie.match(/^[^;]+/)[0] + ";";
            })
        }
        const verifyOtpResponse = await chai.request(server).post("/sso-reset-otp-verify").set("Cookie", cookies).send({
            "otp": "123456"
        });
        expect(verifyOtpResponse.status).to.eql(200);
        expect(verifyOtpResponse.body).to.eql({
            data: {
                success: true,
                message: "otp verified"
            }
        });
    })

    it("sso-reset-verify using invalid otp", async () => {
        const response = await chai.request(server).get("/sso-reset-password").query({
            "user": "info@ibbil-markets.com"
        }).send();
        expect(response.status).to.eql(200);
        expect(response.body).to.eql({
            "data":{
                "message": "if this email is stored in our system then we will send instruction message please check your inbox"
            }
        });
        const setCookies = response.headers["set-cookie"];
        let cookies = "";
        if(setCookies && setCookies.length) {
            setCookies.forEach((cookie) => {
                cookies += cookie.match(/^[^;]+/)[0] + ";";
            })
        }
        const verifyOtpResponse = await chai.request(server).post("/sso-reset-otp-verify").set("Cookie", cookies).send({
            "otp": "123465"
        });
        expect(verifyOtpResponse.status).to.eql(400);
        expect(verifyOtpResponse.body).to.eql({
            data: {
                success: false,
                message: "invalid otp"
            }
        });
    })


    it("sso-reset-verify using expired otp", async () => {
        const response = await chai.request(server).get("/sso-reset-password").query({
            "user": "info@ibbil-markets.com"
        }).send();
        expect(response.status).to.eql(200);
        expect(response.body).to.eql({
            "data":{
                "message": "if this email is stored in our system then we will send instruction message please check your inbox"
            }
        });
        const setCookies = response.headers["set-cookie"];
        let cookies = "";
        if(setCookies && setCookies.length) {
            setCookies.forEach((cookie) => {
                cookies += cookie.match(/^[^;]+/)[0] + ";";
            })
        }
        // Changing clock time
        const clock = sinon.useFakeTimers(new Date(moment().add(1, "day").format()));
        const verifyOtpResponse = await chai.request(server).post("/sso-reset-otp-verify").set("Cookie", cookies).send({
            "otp": "123465"
        });
        expect(verifyOtpResponse.status).to.eql(400);
        expect(verifyOtpResponse.body).to.eql({
            data: {
                success: false,
                message: "otp expired"
            }
        });
        clock.restore();
    })
})