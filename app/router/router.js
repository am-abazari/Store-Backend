const { HomeRouter } = require('./api');
const { UserAuthRoutes } = require('./user/auth');

const router = require('express').Router();
router.use("/", HomeRouter);
router.use("/user", UserAuthRoutes);
module.exports = {
    AllRoutes: router,
}