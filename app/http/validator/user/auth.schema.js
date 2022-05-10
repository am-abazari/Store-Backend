const Joi = require('@hapi/joi');
const getOTPSchema = Joi.object({
    mobile: Joi.string().trim().length(11).pattern(/^09[0-9]{9}$/mi).error(new Error("Mobile Number is Invalid"))
})
const checkOTPSchema = Joi.object({
    mobile: Joi.string().trim().length(11).pattern(/^09[0-9]{9}$/mi).error(new Error("Mobile Number is Invalid")),
    code: Joi.string().trim().min(4).max(6).error(new Error("The Code is Invalid"))
})
module.exports = { getOTPSchema, checkOTPSchema }
