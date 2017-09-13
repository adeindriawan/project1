'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initialize http server
var app = (0, _express2.default)();
var port = process.env.PORT || 5000;

// Make the server CORS-ENABLE
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(_bodyParser2.default.json()); // for parsing application/json
app.use(_bodyParser2.default.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// initialize passport
app.use(_passport2.default.initialize());

app.get('/', function (req, res) {
  res.send('Project1 Backend');
});

// Handle / route
app.use('/v1', _router2.default);

// Launch the server on port 3000
var server = app.listen(port, function () {
  console.log('Listening at application server at port ' + port);
});