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

describe("POST /sso-check", function() {

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

    it("sso-check for existing phone", async () => {
        const response = await chai.request(server).post("/sso-check").send({
            "user": "12313214"
        });
        expect(response.status).to.eql(200);
        expect(response.body.data.success).to.eql(false);
    })

    it("sso-check for existing email", async () => {
        const response = await chai.request(server).post("/sso-check").send({
            "user": "info@ibbil-markets.com"
        });
        expect(response.status).to.eql(200);
        expect(response.body.data.success).to.eql(false);
    })

    it("sso-check for non existing phone", async () => {
        const response = await chai.request(server).post("/sso-check").send({
            "user": "12313214231"
        });
        expect(response.status).to.eql(404);
        expect(response.body.data.success).to.eql(true);
    })

    it("sso-check for non existing email", async () => {
        const response = await chai.request(server).post("/sso-check").send({
            "user": "dev@ibbil-markets.com"
        });
        expect(response.status).to.eql(404);
        expect(response.body.data.success).to.eql(true);
    })
})