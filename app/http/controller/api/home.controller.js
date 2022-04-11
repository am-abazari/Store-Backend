const createHttpError = require("http-errors");
const { authSchema } = require("../../validator/user/auth.schema");
const Controller = require("../controller");

class HomeController extends Controller {

    async indexPage(req, res, next) {
        try {
            const result = await authSchema.validateAsync(req.body)
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Index Page",
            })
        } catch (error) {
            next(createHttpError.BadRequest(error.message))
        }
    }
}
module.exports = new HomeController;