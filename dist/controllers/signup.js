'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.signup = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _database = require('../config/database');

var _database2 = _interopRequireDefault(_database);

var _passport3 = require('../config/passport');

var _passport4 = _interopRequireDefault(_passport3);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var psp = (0, _passport4.default)(_passport2.default);

var signup = exports.signup = function signup(req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({ success: false, msg: 'Please pass username and password.' });
    } else {
        var newUser = new _user2.default({
            username: req.body.username,
            password: req.body.password
        });
        // save the user
        newUser.save(function (err) {
            if (err) {
                return res.send(err);
            }
            res.json({ success: true, msg: 'Successfully created new user.' });
        });
    }
};