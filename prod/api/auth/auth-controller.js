"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = verify;
exports.resend = resend;
exports.index = index;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connect = require("../../db/connect");

var _mongodb = require("mongodb");

var _argon = _interopRequireDefault(require("argon2"));

var _authServices = require("../../services/auth-services");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _nodemailer = require("nodemailer");

function verify(_x, _x2) {
  return _verify.apply(this, arguments);
}

function _verify() {
  _verify = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var results, client, db;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            results = _jsonwebtoken["default"].verify(req.params.token, process.env.EMAIL_SECRET);
            _context.next = 4;
            return (0, _connect.connectClient)();

          case 4:
            client = _context.sent;
            db = client.db(process.env.MONGO_DBNAME || 'guitar-finder');
            _context.next = 8;
            return db.collection('users').findOneAndUpdate({
              _id: (0, _mongodb.ObjectId)(results.user._id)
            }, {
              $set: {
                verified: true
              }
            }, {
              returnOriginal: false
            });

          case 8:
            client.close();
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.send('Error validating user'));

          case 14:
            return _context.abrupt("return", res.redirect(process.env.EMAIL_SECRET ? 'https://guitar-finder.net/login' : 'http://localhost:3000/login'));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));
  return _verify.apply(this, arguments);
}

function resend(_x3, _x4) {
  return _resend.apply(this, arguments);
}

function _resend() {
  _resend = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var client, db, results, transporter;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _connect.connectClient)();

          case 2:
            client = _context2.sent;
            db = client.db(process.env.MONGO_DBNAME || 'guitar-finder');
            _context2.next = 6;
            return db.collection('users').findOne({
              email: req.body.email.toLowerCase()
            });

          case 6:
            results = _context2.sent;
            client.close();

            if (!results) {
              _context2.next = 14;
              break;
            }

            transporter = (0, _nodemailer.createTransport)({
              port: 465,
              host: 'smtp.gmail.com',
              auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
              },
              secure: true
            });

            _jsonwebtoken["default"].sign({
              user: {
                _id: results._id
              }
            }, process.env.EMAIL_SECRET, {
              expiresIn: '1d'
            }, function (err, token) {
              var url = process.env.EMAIL_USER ? "https://guitar-finder.net/api/confirm/".concat(token) : "http://localhost:8000/api/confirm/".concat(token);
              transporter.sendMail({
                to: req.body.email,
                subject: 'Confirm Email',
                html: "Please click <a href=\"".concat(url, "\">here</a> to confirm your email for your new account.")
              });
            });

            return _context2.abrupt("return", res.status(200).json(results));

          case 14:
            return _context2.abrupt("return", res.status(400).json({
              message: "No account found with email '".concat(req.body.email, "'.")
            }));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _resend.apply(this, arguments);
}

function index(_x5, _x6) {
  return _index.apply(this, arguments);
}

function _index() {
  _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var validation, client, db, user, pwMatch, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            //check for valid request
            validation = validateIndex(req.body);

            if (validation.isValid) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              message: validation.message
            }));

          case 3:
            _context3.next = 5;
            return (0, _connect.connectClient)();

          case 5:
            client = _context3.sent;
            db = client.db(process.env.MONGO_DBNAME || 'guitar-finder');
            _context3.next = 9;
            return db.collection('users').findOne({
              username: req.body.username.toLowerCase()
            });

          case 9:
            user = _context3.sent;

            if (user) {
              _context3.next = 12;
              break;
            }

            return _context3.abrupt("return", res.status(401).json({
              message: 'Username or password did not match'
            }));

          case 12:
            if (user.verified) {
              _context3.next = 14;
              break;
            }

            return _context3.abrupt("return", res.status(403).json({
              message: 'Please verify account before logging in.'
            }));

          case 14:
            _context3.next = 16;
            return _argon["default"].verify(user.password, req.body.password);

          case 16:
            pwMatch = _context3.sent;

            if (pwMatch) {
              _context3.next = 19;
              break;
            }

            return _context3.abrupt("return", res.status(401).json({
              message: 'Username or password did not match'
            }));

          case 19:
            client.close();
            token = (0, _authServices.generateJWT)(user);
            return _context3.abrupt("return", res.status(200).json({
              token: token
            }));

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _index.apply(this, arguments);
}

function validateIndex(body) {
  var errors = '';

  if (!body.username || !body.username.trim()) {
    errors += 'Username required. ';
  }

  if (!body.password || !body.password.trim()) {
    errors += 'Password required. ';
  }

  return {
    isValid: !errors || !errors.trim(),
    message: errors
  };
}