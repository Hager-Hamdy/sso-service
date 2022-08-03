
const express = require("express");
const {ValidationError} = require('express-validation');
const { JWT_SECRET, APP_ENV } = require("./config.js");

const router = require("./routes/index.js");

const app = express();

// using express session
const session = require('express-session');
let sessionOptions = {
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {}
};
if(APP_ENV === "production") {
    sessionOptions.cookie = {
        secure: true
    };
}
app.use(session(sessionOptions))

app.use(express.json());

app.get('/', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send('"OK"');
});

app.use(router);

app.use(function(err, req, res, next) {
    if(err instanceof ValidationError) {
        return res.status(err.statusCode).json(err);
    }
})

module.exports = app;