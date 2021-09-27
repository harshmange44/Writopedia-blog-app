const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    expire_at: { type: Date, default: Date.now, expires: 90 } //86400000
});

module.exports = mongoose.model("Token", tokenSchema);