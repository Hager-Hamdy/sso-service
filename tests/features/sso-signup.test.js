const { expect } = require("chai");
const chai = require("chai");
const http = require("http");
const chaiHttp = require('chai-http');
const { describe } = require("mocha");
const app = require("../../app.js");
const umzug = require("../../umzug.js");
const { mock: nodemailerMock } = require("nodemailer-mock");
const server = http.createServer(app);
chai.use(chaiHttp);

describe("POST /sso-signup", function() {

    before(async () => {
        await umzug.down({to: 0});
        await umzug.up();
        nodemailerMock.reset();
    })

    it("sso-signup with all fields", async () => {
        const response = await chai.request(server).post("/sso-signup").send({
            "name": "john Deo",
            "email": "info@ibbil-markets.com",
            "avatar": "ibbil-storage/xyz.png",
            "phone": "12313214",
            "status": "active",
            "password": "mySecretPassword",
            "preferred_date_type": "gregorian",
            "app_name": "ibbil_markets"
        });
        expect(response.status).to.eql(201);
        expect(response.body.message).to.eql("successfully registered");
    })

    it("sso-signup otp sent after signup", async () => {
        expect(nodemailerMock.getSentMail().length).to.equal(1);
    })

    after(() => {
        nodemailerMock.reset();
    })
})