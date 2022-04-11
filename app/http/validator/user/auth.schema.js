const Joi = require('@hapi/joi');
const authSchema = Joi.object({
    mobile : Joi.string().trim().length(11).pattern(/^09[0-9]{9}$/mi).error(new Error("Mobile Number is Invalid"))
})

module.exports = {authSchema , }