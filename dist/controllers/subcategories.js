'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.subcategories = undefined;

var _subcategory = require('../models/subcategory');

var _subcategory2 = _interopRequireDefault(_subcategory);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subcategories = exports.subcategories = function subcategories(req, res) {
    _subcategory2.default.find({}, function (err, subkategori) {
        res.json(subkategori);
    });
};