const HomeController = require('../../http/controller/api/home.controller');

const router = require('express').Router();

router.post("/", HomeController.indexPage);

module.exports = {
    HomeRouter: router, 
}