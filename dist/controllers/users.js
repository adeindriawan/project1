'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeUserFollowTopics = exports.letUserFollowTopics = exports.getAllStudents = exports.getAllTeachers = exports.getUserById = exports.getAllUsers = undefined;

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _topic = require('../models/topic');

var _topic2 = _interopRequireDefault(_topic);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllUsers = exports.getAllUsers = function getAllUsers(req, res) {
    var data = { users: [] };
    _user2.default.find({}, function (err, user) {
        user.map(function (item) {
            var month = parseInt(item.date_of_birth.getMonth()) + parseInt(1);
            if (month < 10) month = '0' + month;
            var day = parseInt(item.date_of_birth.getDate());
            if (day < 10) day = '0' + day;
            var dob = day + '-' + month + '-' + item.date_of_birth.getFullYear();
            data.users.push({
                'id': item._id,
                'username': item.username,
                'password': item.password,
                'email': item.email,
                'first_name': item.first_name,
                'last_name': item.last_name,
                'date_of_birth': dob,
                'gender': item.gender,
                'role': item.role,
                'topics_followed': item.topics_followed
            });
        });
        res.json(data);
    });
};

var getUserById = exports.getUserById = function getUserById(req, res) {
    var id = req.params.id;
    var data = {};
    _user2.default.findOne({ _id: id }, function (err, user) {
        var month = parseInt(user.date_of_birth.getMonth()) + parseInt(1);
        if (month < 10) month = '0' + month;
        var day = parseInt(user.date_of_birth.getDate());
        if (day < 10) day = '0' + day;
        var dob = day + '-' + month + '-' + user.date_of_birth.getFullYear();
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
        data['topics_followed'] = item.topics_followed;

        res.json(data);
    });
};

var getAllTeachers = exports.getAllTeachers = function getAllTeachers(req, res) {
    var data = { teachers: [] };
    _user2.default.find({ role: 'Guru' }, function (err, teacher) {
        teacher.map(function (item) {
            var month = parseInt(item.date_of_birth.getMonth()) + parseInt(1);
            if (month < 10) month = '0' + month;
            var day = parseInt(item.date_of_birth.getDate());
            if (day < 10) day = '0' + day;
            var dob = day + '-' + month + '-' + item.date_of_birth.getFullYear();
            data.teachers.push({
                'id': item._id,
                'username': item.username,
                'password': item.password,
                'email': item.email,
                'first_name': item.first_name,
                'last_name': item.last_name,
                'date_of_birth': dob,
                'gender': item.gender,
                'topics_followed': item.topics_followed
            });
        });
        res.json(data);
    });
};

var getAllStudents = exports.getAllStudents = function getAllStudents(req, res) {
    var data = { students: [] };
    _user2.default.find({ role: 'Murid' }, function (err, student) {
        student.map(function (item) {
            var month = parseInt(item.date_of_birth.getMonth()) + parseInt(1);
            if (month < 10) month = '0' + month;
            var day = parseInt(item.date_of_birth.getDate());
            if (day < 10) day = '0' + day;
            var dob = day + '-' + month + '-' + item.date_of_birth.getFullYear();
            data.students.push({
                'id': item._id,
                'username': item.username,
                'password': item.password,
                'email': item.email,
                'first_name': item.first_name,
                'last_name': item.last_name,
                'date_of_birth': dob,
                'gender': item.gender,
                'topics_followed': item.topics_followed
            });
        });
        res.json(data);
    });
};

var letUserFollowTopics = exports.letUserFollowTopics = function letUserFollowTopics(req, res) {
    var token = getAccessToken(req.session.accessToken);
    if (token) {
        var data = {
            all_topics: [],
            topics_followed: []
        };
        var id = req.params.id;
        _topic2.default.find({}, function (err, topic) {
            topic.map(function (item) {
                data.all_topics.push({
                    'id': item._id,
                    'name': item.name
                });
            });
        });
        _user2.default.find({ _id: id }, function (err, user) {
            var item = JSON.parse(JSON.stringify(user));
            item.map(function (el) {
                data.topics_followed.push({
                    'id': el.topics_followed
                });
            });
            res.json(data);
        });
    } else {
        res.status(401).send({ success: false, msg: 'Unauthorized user. You must log in first.' });
    }
};

var makeUserFollowTopics = exports.makeUserFollowTopics = function makeUserFollowTopics(req, res) {
    var token = getAccessToken(req.session.accessToken);
    if (token) {
        var id = req.params.id;
        var topic = req.body.topic;
        _user2.default.findByIdAndUpdate(id, { $set: { topics_followed: topic } }, { new: true }, function (err, user) {
            if (err) return handleError(err);
            res.json(user);
        });
    } else {
        res.status(401).send({ success: false, msg: 'Unauthorized user. You must log in first.' });
    }
};

var getAccessToken = function getAccessToken(session) {
    if (session) {
        return session;
    } else {
        return null;
    }
};