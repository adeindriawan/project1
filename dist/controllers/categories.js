'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAllCategoriesWithSubcategories = exports.aggCategory = exports.getAllCategories = undefined;

var _category = require('../models/category');

var _category2 = _interopRequireDefault(_category);

var _subcategory = require('../models/subcategory');

var _subcategory2 = _interopRequireDefault(_subcategory);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllCategories = exports.getAllCategories = function getAllCategories(req, res) {
    _category2.default.find({}, function (err, kategori) {
        res.json(kategori);
    });
};

var aggCategory = exports.aggCategory = function aggCategory(req, res) {
    _category2.default.aggregate([{
        $lookup: {
            from: 'subcategory',
            localField: '_id',
            foreignField: '_category',
            as: 'subcategories'
        }
    }]).exec(function (err, results) {
        res.json(results);
    });
};

var getAllCategoriesWithSubcategories = exports.getAllCategoriesWithSubcategories = function getAllCategoriesWithSubcategories(req, res) {
    var categories = [];
    _category2.default.find({}, function (err, kategori) {
        kategori.map(function (item) {
            // let subcategories = []
            // Subkategori.find({id_category: item._id}, (err, subkategori) => {
            //     subkategori.map((subitem) => {
            //         subcategories.push(subitem.name)
            //     })
            //     categories.subcategories = subcategories
            //     console.log(categories)
            // })
            categories.push({
                'id': item._id,
                'name': item.name,
                'subcategories': getSubCategoriesFromEachCategories(item._id),
                'subconsole': console.log(getSubCategoriesFromEachCategories(item._id))
            });
        });
        res.json(categories);
    });
};