"use strict";
exports.__esModule = true;
var express = require("express");
var swaggerUi = require("swagger-ui-express");
var fs = require("fs");
var path = require("path");
var user_routes_1 = require("./routes/user.routes");
var post_routes_1 = require("./routes/post.routes");
var dotenv_1 = require("dotenv");
var bodyParser = require("body-parser");
require("./db");
dotenv_1.config();
var app = express();
var cors = function () { return function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}; };
// Set Response Headers
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({
    limit: '49mb'
}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/api', user_routes_1["default"]);
app.use('/api', post_routes_1["default"]);
// Swagger Docs config
var swaggerFile = path.join(process.cwd(), "swagger.json");
var swaggerData = fs.readFileSync(swaggerFile, 'utf8');
var swaggerDocument = JSON.parse(swaggerData);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log('Server is listening on port ' + PORT);
});
