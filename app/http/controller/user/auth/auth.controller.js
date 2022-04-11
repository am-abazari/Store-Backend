const createHttpError = require("http-errors")
const { UserModel } = require("../../../../models/users")
const { EXPIRES_IN } = require("../../../../utils/constants")
const { RandomNumberGenerator, SignAccessToken } = require("../../../../utils/functions")
const { getOTPSchema, checkOTPSchema } = require("../../../validator/user/auth.schema")
const Controller = require("../../controller")

class UserAuthController extends Controller {
    async getOTP(req, res, next) {
        try {
            await getOTPSchema.validateAsync(req.body)
            const { mobile } = req.body
            const code = RandomNumberGenerator();
            const result = this.saveUser(mobile, code);
            if (!result) throw createHttpError.Unauthorized("An Error Happened While Logging in")
            return res.status(200).json({
                data: {
                    status: 200,
                    message: "One Time Password Sent to Your Phone",
                    code,
                    mobile,

                }
            })
        } catch (error) {
            next(createHttpError.BadRequest(error.message))
        }
    }
    async checkOTP(req, res, next) {
        try {
            await checkOTPSchema.validateAsync(req.body)
            const { mobile, code } = req.body
            const user = await UserModel.findOne({ mobile });
            if (!user) throw createHttpError.NotFound("User Not Found")
            if (user.otp.code != code) throw createHttpError.Unauthorized("The Code is Invalid");
            const now = Date.now();
            if (user.otp.expiresIn < now) throw createHttpError.Unauthorized("The Code Has Been Expired")
            const accessToken = await SignAccessToken(user._id);
            return res.json({
                data: {
                    accessToken
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async saveUser(mobile, code) {
        const otp = {
            code,
            expiresIn: EXPIRES_IN,
        }
        const result = await this.checkExistUser(mobile);
        if (result) {
            return (await this.updateUser(mobile, { otp }))
        }
        return !!(UserModel.create({
            mobile,
            otp,
        }))
    }
    async checkExistUser(mobile) {
        const user = await UserModel.findOne({ mobile });
        return !!user
    }
    async updateUser(mobile, objectData = {}) {
        Object.keys(objectData).forEach(key => {
            if (["", " ", 0, null, NaN, undefined, "0"].includes(objectData[key])) delete objectData[key];
        })
        const updateResult = await UserModel.updateOne({ mobile }, { $set: objectData })
        return !!updateResult.modifiedCount

    }

}

module.exports = {
    UserAuthController: new UserAuthController(),
}