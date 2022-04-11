const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    first_name: { type: String, },
    last_name: { type: String, },
    username: { type: String, required: true, lowercase: true, },
    phone: { type: String, required: true },
    email: { type: String, lowercase : true, },
    password: { type: String, required: true },
    otp: {
        type: Object, default: {
            code: 0,
            expires: 0,
        }
    },
    bills: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    birthday: { type: String, },
    roles: { type: [String], default: [] },

})

module.exports = {
    UserModel: mongoose.model("user", Schema)
}