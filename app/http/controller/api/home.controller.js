const createHttpError = require("http-errors");
const { authSchema } = require("../../validator/user/auth.schema");
const Controller = require("../controller");

class HomeController extends Controller {

    async indexPage(req, res, next) {
        try {
            return res.status(200).json({
                status: 200,
                success: true,
                message: "Index Page",
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new HomeController;