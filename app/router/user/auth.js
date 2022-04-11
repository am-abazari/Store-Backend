const { UserAuthController } = require('../../http/controller/user/auth/auth.controller')

const router = require('express').Router()
/**
 * @swagger
 *  tags:
 *      name : User-Authentication
 *      description : user-auth section
 */

/**


/**
 * @swagger
 *  /user/login:
 *      post:
 *          tags: [User-Authentication]
 *          summary: Login User in UserPanel with Mobile Phone
 *          description: One Time Password (OTP) Login
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phonenumber
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad get Away
 *              500:
 *                  description : Internal Server Error
 */

router.post("/login" , UserAuthController.login)

module.exports = { UserAuthRoutes: router }