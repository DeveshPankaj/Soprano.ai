"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Profile = exports.Login = exports.Signup = void 0;
var user_model_1 = require("../models/user.model");
var md5 = require("md5");
var jwt_1 = require("../util/jwt");
var Signup = function (req, res) {
    var _a = req.body, first_name = _a.first_name, last_name = _a.last_name, email = _a.email, password = _a.password;
    var filename = req.file.filename;
    var userData = {
        first_name: first_name,
        last_name: last_name,
        password: md5((password || "").toString()),
        email: email,
        avatar: filename
    };
    user_model_1["default"].create(userData).then(function (result) {
        res.json(__assign(__assign({}, userData), { _id: result._id }));
    })["catch"](function (error) {
        res.status(400).json(error);
    });
};
exports.Signup = Signup;
var Login = function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (!email || !password) {
        return res.status(400).json({ error: { message: "Email Id and Password is required!" } });
    }
    user_model_1["default"].findOne({ email: email }, function (error, data) {
        if (!data) {
            return res.status(400).json({ error: { message: "Invalid Email Id or password!" } });
        }
        if (md5(password) !== data.password) {
            return res.status(400).json({ error: { message: "Invalid Email Id or password!" } });
        }
        var payload = {
            _id: data._id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            avatar: data.avatar
        };
        var token = jwt_1["default"].getTocken(payload);
        res.json({ token: token });
    });
};
exports.Login = Login;
var Profile = function (req, res) {
    var email = req.user.email;
    user_model_1["default"].findOne({ email: email }, function (error, data) {
        if (!data) {
            return res.status(400).json({ error: { message: "Account does not exist" } });
        }
        var payload = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            avatar: data.avatar
        };
        res.json(payload);
    });
};
exports.Profile = Profile;
