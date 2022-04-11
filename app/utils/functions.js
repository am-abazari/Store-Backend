const createHttpError = require('http-errors');
const JWT = require('jsonwebtoken');
const { UserModel } = require('../models/users');
const { SECRET_KEY } = require('./constants');
const RandomNumberGenerator = () => {
    return Math.floor((Math.random() * 90000) + 10000)
}
const SignAccessToken = (userID) => {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userID)
        const payload = {
            mobile: user.mobilem,
            userID: user._id
        };
        const options = {
            expiresIn: "1h",

        };
        JWT.sign(payload, SECRET_KEY, options, (error, token) => {
            if (error) reject(createHttpError.InternalServerError("Internal Server Error"));
            else resolve(token);

        })
    })
}
module.exports = { RandomNumberGenerator, SignAccessToken }