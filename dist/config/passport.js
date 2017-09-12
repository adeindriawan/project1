'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _database = require('../config/database');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load the User model

exports.default = function (passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = _database2.default.secret;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        _user2.default.findOne({ id: jwt_payload.id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};