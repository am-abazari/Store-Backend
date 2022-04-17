const createHttpError = require("http-errors");
const JWT = require('jsonwebtoken');
const { UserModel } = require("../../models/users");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constants");

function VerifyAccessToken(req, res, next) {
    const headers = req.headers;
    const [bearer, token] = headers?.["access-token"]?.split(" ") || [];
    if (token && bearer?.toLowerCase() === "bearer") {
        JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async(error, payload) => {
            if (error) return next(createHttpError.Unauthorized("Please Login to Your Account !"))
            const { mobile } = payload || {};
            const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 })
            if (!user) return next(createHttpError.Unauthorized("Username Not Found #404"))
            req.user = user;
            return next();
        });
    } else return next(createHttpError.Unauthorized("Please Login to Your Account !"))

}


module.exports = VerifyAccessToken;