'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.aggSubcategory = exports.getAllSubcategories = undefined;

var _subcategory = require('../models/subcategory');

var _subcategory2 = _interopRequireDefault(_subcategory);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllSubcategories = exports.getAllSubcategories = function getAllSubcategories(req, res) {
    _subcategory2.default.find({}, function (err, subkategori) {
        res.json(subkategori);
    });
};

var aggSubcategory = exports.aggSubcategory = function aggSubcategory(req, res) {
    _subcategory2.default.aggregate([{
        $lookup: {
            from: 'topic',
            localField: '_id',
            foreignField: '_subcategory',
            as: 'topics'
        }
    }]).exec(function (err, results) {
        res.json(results);
    });
};