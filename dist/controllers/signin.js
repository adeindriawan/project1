'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.signin = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _database = require('../config/database');

var _database2 = _interopRequireDefault(_database);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var signin = exports.signin = function signin(req, res) {
    _user2.default.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) {
            throw err;
        }

        if (!user) {
            res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right, create a token
                    var token = _jsonwebtoken2.default.sign({ data: user }, _database2.default.secret);
                    // create session var signinToken with the token as the value
                    req.session.signinToken = token;
                    // return the information including token as JSON
                    res.json({ success: true, token: 'JWT ' + token, data: user });
                } else {
                    res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password!' });
                }
            });
        }
    });
};