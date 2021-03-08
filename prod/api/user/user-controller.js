"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateName = updateName;
exports.updateEmail = updateEmail;
exports.updatePassword = updatePassword;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connect = require("../../db/connect");

var _mongodb = require("mongodb");

var _argon = _interopRequireDefault(require("argon2"));

function updateName(_x, _x2) {
  return _updateName.apply(this, arguments);
}

function _updateName() {
  _updateName = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var user, userId, client, db, userCheck;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = {
              username: req.body.username.toLowerCase()
            };
            userId = req.body.id;
            _context.next = 4;
            return (0, _connect.connectClient)();

          case 4:
            client = _context.sent;
            db = client.db(process.env.MONGO_DBNAME || 'guitar-finder'); //check username not already taken

            _context.next = 8;
            return db.collection('users').findOne({
              username: user.username
            });

          case 8:
            userCheck = _context.sent;

            if (!userCheck) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(409).json({
              message: "Username '".concat(req.body.username, "' already taken")
            }));

          case 11:
            _context.next = 13;
            return db.collection('users').updateOne({
              _id: (0, _mongodb.ObjectId)(userId)
            }, {
              $set: user
            });

          case 13:
            client.close();
            return _context.abrupt("return", res.status(200).json(user));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _updateName.apply(this, arguments);
}

function updateEmail(_x3, _x4) {
  return _updateEmail.apply(this, arguments);
}

function _updateEmail() {
  _updateEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var user, userId, client, db, emailCheck;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = {
              email: req.body.email.toLowerCase()
            };
            userId = req.body.id;
            _context2.next = 4;
            return (0, _connect.connectClient)();

          case 4:
            client = _context2.sent;
            db = client.db(process.env.MONGO_DBNAME || 'guitar-finder'); //check if email not already used

            _context2.next = 8;
            return db.collection('users').findOne({
              email: user.email
            });

          case 8:
            emailCheck = _context2.sent;

            if (!emailCheck) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", res.status(409).json({
              message: "Email '".concat(req.body.email, "' already taken")
            }));

          case 11:
            _context2.next = 13;
            return db.collection('users').updateOne({
              _id: (0, _mongodb.ObjectId)(userId)
            }, {
              $set: user
            });

          case 13:
            client.close();
            return _context2.abrupt("return", res.status(200).json(user));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _updateEmail.apply(this, arguments);
}

function updatePassword(_x5, _x6) {
  return _updatePassword.apply(this, arguments);
}

function _updatePassword() {
  _updatePassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var user, userId, client, db;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _argon["default"].hash(req.body.password);

          case 2:
            _context3.t0 = _context3.sent;
            user = {
              password: _context3.t0
            };
            userId = req.body.id;
            _context3.next = 7;
            return (0, _connect.connectClient)();

          case 7:
            client = _context3.sent;
            db = client.db(process.env.MONGO_DBNAME || 'guitar-finder'); //update user

            _context3.next = 11;
            return db.collection('users').updateOne({
              _id: (0, _mongodb.ObjectId)(userId)
            }, {
              $set: user
            });

          case 11:
            client.close();
            return _context3.abrupt("return", res.status(200).json(user));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _updatePassword.apply(this, arguments);
}