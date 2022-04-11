const Controller = require("../controller");

class HomeController extends Controller {

    indexPage(req, res, next) {
        return res.status(200).json({
            status : 200,
            success : true ,
            message :"Index Page",
        })
    }
}
module.exports = new HomeController;