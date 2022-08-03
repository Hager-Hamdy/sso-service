const { expect } = require("chai");
const chai = require("chai");
const http = require("http");
const chaiHttp = require('chai-http');
const { describe } = require("mocha");
const app = require("../../app.js");
const umzug = require("../../umzug.js");
const { User, ConnectedApp } = require("../../models/index.js");
const md5 = require("md5");
const server = http.createServer(app);
chai.use(chaiHttp);

const {mock: nodemailerMock} = require("nodemailer");

describe("GET /sso-reset-password", function() {

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

    it("sso-reset-password for existing phone", async () => {
        const response = await chai.request(server).get("/sso-reset-password").query({
            "user": "12313214"
        }).send();
        expect(nodemailerMock.getSentMail().length).to.equal(1);
        expect(response.status).to.eql(200);
        expect(response.body).to.eql({
            "data":{
                "message": "if this email is stored in our system then we will send instruction message please check your inbox"
            }
        });
    })

    it("sso-check for existing email", async () => {
        const response = await chai.request(server).get("/sso-reset-password").query({
            "user": "info@ibbil-markets.com"
        }).send();
        expect(nodemailerMock.getSentMail().length).to.equal(1);
        expect(response.status).to.eql(200);
        expect(response.body).to.eql({
            "data":{
                "message": "if this email is stored in our system then we will send instruction message please check your inbox"
            }
        });
    })

    it("sso-check for non existing phone", async () => {
        const response = await chai.request(server).get("/sso-reset-password").query({
            "user": "12313214231"
        }).send();
        expect(nodemailerMock.getSentMail().length).to.equal(0);
        expect(response.status).to.eql(200);
        expect(response.body).to.eql({
            "data":{
                "message": "if this email is stored in our system then we will send instruction message please check your inbox"
            }
        });
    })

    it("sso-check for non existing email", async () => {
        const response = await chai.request(server).get("/sso-reset-password").query({
            "user": "dev@ibbil-markets.com"
        }).send();
        expect(nodemailerMock.getSentMail().length).to.equal(0);
        expect(response.status).to.eql(200);
        expect(response.body).to.eql({
            "data":{
                "message": "if this email is stored in our system then we will send instruction message please check your inbox"
            }
        });
    })

    beforeEach(() => {
        nodemailerMock.reset();
    })
})

describe("POST /sso-reset-password", function() {

    let cookies = "";

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

    beforeEach(async () => {
        // Sending OTP
        const response = await chai.request(server).get("/sso-reset-password").query({
            "user": "info@ibbil-markets.com"
        }).send();
        
        let setCookies = response.headers["set-cookie"];
        cookies = "";
        if(setCookies && setCookies.length) {
            setCookies.forEach((cookie) => {
                cookies += cookie.match(/^[^;]+/)[0] + ";";
            })
        }
    })

    it("sso-reset-password changing password on OTP verified", async () => {

        // Verifying OTP
        await chai.request(server).post("/sso-reset-otp-verify").set("Cookie", cookies).send({
            "otp": "123456"
        });

        const resetPasswordResponse = await chai.request(server).put("/sso-reset-password").set("Cookie", cookies).send({
            "password": "12345678",
            "password_confirmation": "12345678"
        });
        expect(resetPasswordResponse.status).to.eql(200);
        expect(resetPasswordResponse.body).to.eql({
            "data":{
                "message": "password successfully reset"
            }
        });
    })

    it("sso-reset-password try changing password on non verified OTP", async () => {

        // Verifying OTP
        await chai.request(server).post("/sso-reset-otp-verify").set("Cookie", cookies).send({
            "otp": "123465"
        });

        const resetPasswordResponse = await chai.request(server).put("/sso-reset-password").set("Cookie", cookies).send({
            "password": "12345678",
            "password_confirmation": "12345678"
        });
        expect(resetPasswordResponse.status).to.eql(400);
        expect(resetPasswordResponse.body).to.eql({
            "data": {
                "success": false,
                "message": "please verify your otp"
            }
        });
    })

    it("sso-reset-password verifying if password even changed for user", async () => {

        // Verifying OTP
        await chai.request(server).post("/sso-reset-otp-verify").set("Cookie", cookies).send({
            "otp": "123456"
        });

        const resetPasswordResponse = await chai.request(server).put("/sso-reset-password").set("Cookie", cookies).send({
            "password": "12345678",
            "password_confirmation": "12345678"
        });

        const user = await User.findOne({
            where: {
                "email": "info@ibbil-markets.com",
                "password": md5("12345678")
            }
        })

        expect(user).to.exist;
        
    })
})