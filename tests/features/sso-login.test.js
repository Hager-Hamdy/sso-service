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

describe("POST /sso-login", function() {

    let user;

    before(async () => {
        await umzug.down({ to: 0 });
        await umzug.up();

        user = await User.create({
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

    it("login with email", async () => {
        const response = await chai.request(server).post("/sso-login").send({
            "user": "info@ibbil-markets.com",
            "password": "mySecretPassword",
            "app_name": "ibbil_markets"
        });
        expect(response.status).to.eql(200);
        expect(response.body.data.name).to.eql("john Deo");
    })

    it("login with phone", async () => {
        const response = await chai.request(server).post("/sso-login").send({
            "user": "12313214",
            "password": "mySecretPassword",
            "app_name": "ibbil_markets"
        });
        expect(response.status).to.eql(200);
        expect(response.body.data.name).to.eql("john Deo");
    })

    it("try login banned user", async () => {
        user.status = "banned";
        await user.save();
        const response = await chai.request(server).post("/sso-login").send({
            "user": "12313214",
            "password": "mySecretPassword",
            "app_name": "ibbil_markets"
        });
        expect(response.status).to.eql(400);
        expect(response.body.message).to.eql("please activate/verify your account first");
    })

    it("try login pending user", async () => {
        user.status = "pending";
        await user.save();
        const response = await chai.request(server).post("/sso-login").send({
            "user": "12313214",
            "password": "mySecretPassword",
            "app_name": "ibbil_markets"
        });
        expect(response.status).to.eql(400);
        expect(response.body.message).to.eql("please contact system administrator");
    })
})