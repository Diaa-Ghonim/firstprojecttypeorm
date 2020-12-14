"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
require("reflect-metadata");
// const express = require('express');
var express_1 = require("express");
// const bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
var path_1 = require("path");
var app = express_1["default"]();
var cors_1 = require("cors");
app.use(cors_1["default"]());
var multerMiddleware_1 = require("./middlewares/multerMiddleware");
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
require("./initializeTypeormConnection");
app.use('/static', express_1["default"].static(path_1["default"].join(__dirname, '..', '..', 'client')));
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(multerMiddleware_1.CustomMulter);
app.use(express_1["default"].json({ limit: '50mb' }));
app.use(express_1["default"].urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));
// app.set('port', process.env.PORT || 8000);
var router1 = express_1["default"].Router();
var router2 = express_1["default"].Router();
app.all('/users', function (req, res, next) {
    // console.log('all ', req.url);
    next();
});
// router1.use((req, res, next) => {
//     console.log('router1 middleware');
//     next();
// });
// router2.use((req, res, next) => {
//     console.log('router2 middleware');
//     next();
// });
router1.get('/users', function asyncFunc(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userRepo, users, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    userRepo = typeorm_1.getConnection().getRepository(User_1.User);
                    return [4 /*yield*/, userRepo.find()];
                case 1:
                    users = _a.sent();
                    res.json(users);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    res.json({ error: error_1, msg: error_1.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
});
app.post('/upload-form', function (request, response) {
    // console.log(request, 'body');
    console.log(request.files, 'files');
    console.log(request.file, 'file');
    response.json({ success: true, file: request.files[0] });
});
router2.post('/users', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var userRepo, _a, firstName, lastName, age, user, savedUser, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                userRepo = typeorm_1.getConnection().getRepository(User_1.User);
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName, age = _a.age;
                user = new User_1.User();
                user.firstName = firstName;
                user.lastName = lastName;
                user.age = age;
                return [4 /*yield*/, userRepo.save(user)];
            case 1:
                savedUser = _b.sent();
                res.json(savedUser);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                res.json({ error: error_2, msg: error_2.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.use(router1, router2);
app.use(function (error, request, response) {
    console.log(error);
    response.status(400).json({ error: error });
});
app.get('/*', function (req, res) {
    res.sendFile(path_1["default"].join(__dirname, '../../client/index.html'));
});
// console.log(router1);
app.listen(2020, function () { return console.log("server is running now on port " + app.get('port')); });
// https.createServer(app).listen(8443);
/*
createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
*/
// export = {
//   "name": "default",
//   "type": "mongodb",
//   "database": "firstproject",
//   url: process.env.NODE_ENV
//   "synchronize": true,
//   "logging": false,
//   "entities": [
//     "src/entity/**/*.ts"
//   ],
//   "migrations": [
//     "src/migration/**/*.ts"
//   ],
//   "subscribers": [
//     "src/subscriber/**/*.ts"
//   ],
//   "cli": {
//     "entitiesDir": "src/entity",
//     "migrationsDir": "src/migration",
//     "subscribersDir": "src/subscriber"
//   }
// }
