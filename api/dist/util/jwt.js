"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
var JWT_SECRET = process.env.JWT_SECRET || "ThisMustBeASecret";
var TOKEN_TYPE = 'Bearer';
function getTocken(data) {
    return TOKEN_TYPE + ' ' + jwt.sign({ data: data }, JWT_SECRET, { expiresIn: '1h' });
}
function verify(token) {
    return jwt.verify(token, JWT_SECRET);
}
var loginRequireMiddleware = function () {
    return function (req, res, next) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === TOKEN_TYPE) {
            var token = req.headers.authorization.split(' ')[1];
            try {
                var result = verify(token);
                req.user = result.data;
                next();
            }
            catch (error) {
                res.status(400).json(error);
            }
        }
        else {
            res.status(401).json({});
        }
    };
};
exports["default"] = {
    getTocken: getTocken,
    verify: verify,
    loginRequireMiddleware: loginRequireMiddleware
};
