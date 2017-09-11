'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.index = undefined;

var _category = require('../models/category');

var _category2 = _interopRequireDefault(_category);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var index = exports.index = function index(req, res) {
    var kategori = {
        kategori_populer: []
    };
    _category2.default.find({}, function (err, kat) {
        kat.map(function (item) {
            kategori.kategori_populer.push({
                "id": item._id,
                "name": item.name,
                "icon": item.icon
            });
        });
        res.json(kategori);
    });
};