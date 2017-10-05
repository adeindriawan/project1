'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _database = require('../config/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect(_database2.default.database);
// define SubcategorySchema
var SubcategorySchema = new _mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    _category: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'category'
    }
});

var Subkategori = _mongoose2.default.model('subcategory', SubcategorySchema, 'subcategory');

exports.default = Subkategori;