"use strict";
exports.__esModule = true;
exports.userSchema = void 0;
var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
exports.userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    }
});
exports.userSchema.plugin(uniqueValidator);
exports["default"] = mongoose.model('User', exports.userSchema);
