'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.users = undefined;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var users = exports.users = function users(req, res) {
    _user2.default.find({}, function (err, user) {
        res.json(user);
    });
};