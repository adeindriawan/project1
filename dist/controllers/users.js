'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getUserById = exports.getAllUsers = undefined;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllUsers = exports.getAllUsers = function getAllUsers(req, res) {
    _user2.default.find({}, function (err, user) {
        res.json(user);
    });
};

var getUserById = exports.getUserById = function getUserById(req, res) {
    var id = req.params.id;
    _user2.default.findOne({ _id: id }, function (err, user) {
        res.json(user);
    });
};