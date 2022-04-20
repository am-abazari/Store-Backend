const createHttpError = require('http-errors');
const JWT = require('jsonwebtoken');
const { UserModel } = require('../models/users');
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require('./constants');
const RandomNumberGenerator = () => {
    return Math.floor((Math.random() * 90000) + 10000)
}
const SignAccessToken = (userID) => {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userID)
        const payload = {
            mobile: user.mobile,
        };
        const options = {
            expiresIn: "1h",

        };
        JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, options, (error, token) => {
            if (error) reject(createHttpError.InternalServerError("Internal Server Error"));
            else resolve(token);
        })
    })
}
const SignRefreshToken = (userID) => {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userID)
        const payload = {
            mobile: user.mobile,
        };
        const options = {
            expiresIn: "1y",

        };
        JWT.sign(payload, REFRESH_TOKEN_SECRET_KEY, options, (error, token) => {
            if (error) reject(createHttpError.InternalServerError("Internal Server Error"));
            else resolve(token);

        })
    })
}
function VerifyRefreshToken(token) {
    return new Promise((resolve, reject) => {
        JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (error, payload) => {
            if (error) return reject(createHttpError.Unauthorized("Please Login to Your Account !"))
            const { mobile } = payload || {};
            const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 })
            if (!user) reject(createHttpError.Unauthorized("Username Not Found #404"));
            resolve(mobile);
        });
    })
}
module.exports = { RandomNumberGenerator, SignAccessToken, SignRefreshToken, VerifyRefreshToken }