"use strict";
exports.__esModule = true;
var express_1 = require("express");
var posts = require("../controller/posts.controller");
var upload_helper_1 = require("../util/upload-helper");
var jwt_1 = require("../util/jwt");
var download_controller_1 = require("../controller/download.controller");
var router = express_1.Router();
var uploadAvatar = upload_helper_1["default"].single('avatar');
router.get('/posts', jwt_1["default"].loginRequireMiddleware(), posts.GetPosts);
router.put('/posts', jwt_1["default"].loginRequireMiddleware(), uploadAvatar, posts.CreatePost);
router.get('/posts/:id', jwt_1["default"].loginRequireMiddleware(), posts.GetPostById);
router.patch('/posts/:id', jwt_1["default"].loginRequireMiddleware(), uploadAvatar, posts.UpdatePost);
router["delete"]('/posts/:id', jwt_1["default"].loginRequireMiddleware(), posts.DeletePost);
router.get('/search', posts.SearchPostByLocation);
router.get('/download/:media', download_controller_1["default"]); // download image (all users are allowed to download images from other images)
exports["default"] = router;
