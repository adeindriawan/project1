'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _database = require('../config/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.connect(_database2.default.database);
// define SessionSchema
var SessionSchema = new _mongoose.Schema({
    session_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    user_role: {
        type: String,
        required: true
    },
    session_started: {
        type: Date
    }
});

var Session = _mongoose2.default.model('session', SessionSchema, 'session');

exports.default = Session;