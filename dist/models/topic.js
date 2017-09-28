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
// define TopicSchema
var TopicSchema = new _mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    rating: {
        type: Number
    },
    id_subcategory: {
        type: String
    }
});

var Topik = _mongoose2.default.model('topic', TopicSchema, 'topic');

exports.default = Topik;