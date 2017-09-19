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
    var data = { user: [] };
    _user2.default.find({}, function (err, user) {
        user.map(function (item) {
            data.user.push({
                'id': item._id,
                'username': item.username,
                'password': item.password,
                'email': item.email,
                'first_name': item.first_name,
                'last_name': item.last_name,
                'date_of_birth': item.date_of_birth.getDate() + '-' + (parseInt(item.date_of_birth.getMonth()) + parseInt(1)) + '-' + item.date_of_birth.getFullYear(),
                'gender': item.gender,
                'role': item.role
            });
        });
        res.json(data);
    });
};

var getUserById = exports.getUserById = function getUserById(req, res) {
    var id = req.params.id;
    var data = {};
    _user2.default.findOne({ _id: id }, function (err, user) {
        var dob = user.date_of_birth.getDate() + '-' + (parseInt(user.date_of_birth.getMonth()) + parseInt(1)) + '-' + user.date_of_birth.getFullYear();
        var item = JSON.parse(JSON.stringify(user));

        data['id'] = item._id;
        data['username'] = item.username;
        data['password'] = item.password;
        data['email'] = item.email;
        data['first_name'] = item.first_name;
        data['last_name'] = item.last_name;
        data['date_of_birth'] = dob;
        data['gender'] = item.gender;
        data['role'] = item.role;

        res.json(data);
    });
};