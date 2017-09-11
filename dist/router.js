'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _index = require('./controllers/index');

var _signup = require('./controllers/signup');

var _signin = require('./controllers/signin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
// initialize the router
var router = (0, _express.Router)();

// handle '/' route with index action from index controller
router.route('/').get(_index.index);
router.route('/signup').post(_signup.signup);
router.route('/signin').post(_signin.signin);

exports.default = router;