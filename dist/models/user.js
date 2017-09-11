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
// define KategoriSchema
var UserSchema = new _mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function (next) {
    var user = undefined;
    console.log(user);
    next();
    // if (user.isModified('password') || user.isNew) {
    //     bcrypt.genSalt(10, (err, salt) => {
    //         if (err) {
    //             return next(err)
    //         }
    //         bcrypt.hash(user.password, salt, null, (err, hash) => {
    //             if (err) {
    //                 return next(err)
    //             }
    //             user.password = hash
    //             next()
    //         })
    //     })
    // } else {
    //     return next()
    // }
});

// UserSchema.methods.comparePassword = (pass, cb) => {
//     bcrypt.compare(passw, this.password, (err, isMatch) => {
//         if (err) {
//             return cb(err)
//         }
//         cb(null, isMatch)
//     })
// }

var User = _mongoose2.default.model('user', UserSchema, 'user');

exports.default = User;