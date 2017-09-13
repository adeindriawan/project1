'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAllCategories = undefined;

var _category = require('../models/category');

var _category2 = _interopRequireDefault(_category);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllCategories = exports.getAllCategories = function getAllCategories(req, res) {
    _category2.default.find({}, function (err, kategori) {
        res.json(kategori);
    });
};