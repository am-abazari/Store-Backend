const Joi = require('@hapi/joi');
const authSchema = Joi.object({
    email : Joi.string().trim().lowercase().email().required(),
    password : Joi.string().min(6).max(20).trim().required(),
})

module.exports = {authSchema , }