const md5 = require("md5");
const dotenv = require("dotenv");

// Loading ENV from .env file
dotenv.config()

const APP_ENV = process.env.APP_ENV || "development";
const APP_PORT = process.env.APP_PORT || 8000;
const JWT_SECRET = process.env.JWT_SECRET || md5((new Date()).toString());
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = parseInt(process.env.DB_PORT) || 3306;
const DB_NAME = process.env.DB_NAME || "ibbil_auth_dev";
const DB_USER = process.env.DB_USER || "root";
const DB_PASS = process.env.DB_PASS || "root123";
const SMTP_HOST = process.env.SMTP_HOST || "smtp.mailtrap.io";
const SMTP_PORT = process.env.SMTP_PORT || "2525";
const SMTP_USER = process.env.SMTP_USER || null;
const SMTP_PASS = process.env.SMTP_PASS || null;
const FROM_NAME = process.env.FROM_NAME || null;
const FROM_EMAIL = process.env.FROM_EMAIL || null;
const redis = {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 12753,
        password: process.env.REDIS_PASSWORD || 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81'
}
module.exports = {
    APP_ENV,
    APP_PORT,
    JWT_SECRET,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASS,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    FROM_NAME,
    FROM_EMAIL,
    redis
};