"use strict";
exports.__esModule = true;
var path = require("path");
var Download = function (req, res) {
    console.log(req.params);
    // @ts-ignore
    res.download(path.join('./upload', req.params.media));
};
exports["default"] = Download;
