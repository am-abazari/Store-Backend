const { UserAuthController } = require('../../http/controller/user/auth/auth.controller')
const { checkOTPSchema } = require('../../http/validator/user/auth.schema')

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
 *  /user/get-otp:
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

router.post("/get-otp", UserAuthController.getOTP)

/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: Check OTP With Mobile and Expire Date 
 *          description: One Time Password (OTP) Check
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phonenumber
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: Enter SMS Code
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
router.post("/check-otp", UserAuthController.checkOTP)


/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          tags: [User-Authentication]
 *          summary: send refresh token for get new token and refresh token
 *          description : fresh token
 *          parameters:
 *              -   name: refreshToken
 *                  in: formData
 *                  required: true
 *                  type: string
 *          responses:
 *              200:
 *                  description : success
 */
router.post("/refresh-token" , UserAuthController.refreshToken)
module.exports = { UserAuthRoutes: router }