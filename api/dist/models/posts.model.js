"use strict";
exports.__esModule = true;
exports.postSchema = void 0;
var mongoose = require("mongoose");
exports.postSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    media_type: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});
exports["default"] = mongoose.model('Post', exports.postSchema);
