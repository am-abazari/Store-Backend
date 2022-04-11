const createHttpError = require("http-errors")
const { authSchema } = require("../../../validator/user/auth.schema")

class UserAuthController {
    async login(req, res, next) {
        try {
            const result = await authSchema.validateAsync(req.body)
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Successfully Logged in !",
            })
        } catch (error) {
            next(createHttpError.BadRequest(error.message))
        }
    }
}

module.exports = {
    UserAuthController: new UserAuthController(),
}