"use strict";
exports.__esModule = true;
exports.DeletePost = exports.UpdatePost = exports.CreatePost = exports.GetPostById = exports.SearchPostByLocation = exports.GetPosts = void 0;
var posts_model_1 = require("../models/posts.model");
var GetPosts = function (req, res) {
    posts_model_1["default"].find({ user_id: req.user._id }).then(function (result) {
        res.json(result);
    })["catch"](function (error) {
        res.status(401).json(error);
    });
};
exports.GetPosts = GetPosts;
// Search is allowed for all user
var SearchPostByLocation = function (req, res) {
    console.log(req.query);
    posts_model_1["default"].find({ location: { $regex: '.*' + req.query.location + '.*' } }).then(function (result) {
        res.json(result);
    })["catch"](function (error) {
        res.status(401).json(error);
    });
};
exports.SearchPostByLocation = SearchPostByLocation;
var GetPostById = function (req, res) {
    posts_model_1["default"].findOne({ user_id: req.user._id, _id: req.params.id }).then(function (result) {
        if (!result) {
            res.statusMessage = 'No Data';
            res.status(204).json({});
        }
        else
            res.json(result);
    })["catch"](function (error) {
        res.status(401).json(error);
    });
};
exports.GetPostById = GetPostById;
var CreatePost = function (req, res) {
    var _a = req.file, filename = _a.filename, mimetype = _a.mimetype;
    var _b = req.body, title = _b.title, location = _b.location;
    var payload = {
        user_id: req.user._id,
        media_type: mimetype,
        url: filename,
        title: title,
        location: location
    };
    posts_model_1["default"].create(payload).then(function (data) {
        res.json({ data: data });
    })["catch"](function (error) {
        res.status(401).json(error);
    });
};
exports.CreatePost = CreatePost;
var UpdatePost = function (req, res) {
    var _a = req.file || {}, filename = _a.filename, mimetype = _a.mimetype;
    var _b = req.body, title = _b.title, location = _b.location;
    var payload = {
        _id: req.params.id,
        user_id: req.user._id,
        media_type: mimetype,
        url: filename,
        title: title,
        location: location
    };
    posts_model_1["default"].findOne({ _id: req.params.id }).then(function (result) {
        if (!result) {
            res.statusMessage = 'No Data';
            res.status(204).json({});
        }
        else {
            if (result.user_id !== req.user._id) {
                return res.status(401).end();
            }
            payload.media_type = mimetype || payload.media_type;
            payload.url = filename || payload.url;
            posts_model_1["default"].updateOne(payload).then(function (data) {
                res.json({ data: data });
            })["catch"](function (error) {
                res.status(401).json(error);
            });
        }
    })["catch"](function (error) {
        res.status(401).json(error);
    });
};
exports.UpdatePost = UpdatePost;
var DeletePost = function (req, res) {
    try {
        posts_model_1["default"].remove({
            _id: req.params.id, user_id: req.user._id
        }, function (_err) {
            if (_err)
                res.status(500).send();
            else
                res.json({ status: 'success' });
        });
    }
    catch (error) {
        res.status(500).send();
    }
};
exports.DeletePost = DeletePost;
// TODO:
// -- delete media file on post update or delete
// -- pagination
