'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAllTopics = undefined;

var _topic = require('../models/topic');

var _topic2 = _interopRequireDefault(_topic);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllTopics = exports.getAllTopics = function getAllTopics(req, res) {
    _topic2.default.find({}, function (err, top) {
        res.json(top);
    });
};