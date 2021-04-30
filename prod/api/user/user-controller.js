"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = update;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connect = require("../../db/connect");

var _mongodb = require("mongodb");

var _argon = _interopRequireDefault(require("argon2"));

var _authServices = require("../../services/auth-services");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function update(_x, _x2) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var user, userId, client, db, userCheck, emailCheck, newUser, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = _objectSpread({}, req.body);
            delete user.id;
            userId = req.body.id;
            _context.next = 5;
            return (0, _connect.connectClient)();

          case 5:
            client = _context.sent;
            db = client.db(process.env.MONGO_DBNAME || 'guitar-finder'); //check username not already taken

            if (!user.username) {
              _context.next = 13;
              break;
            }

            _context.next = 10;
            return db.collection('users').findOne({
              username: user.username
            });

          case 10:
            userCheck = _context.sent;

            if (!userCheck) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", res.status(409).json({
              message: "Username '".concat(req.body.username, "' already taken")
            }));

          case 13:
            if (!user.email) {
              _context.next = 19;
              break;
            }

            _context.next = 16;
            return db.collection('users').findOne({
              email: user.email
            });

          case 16:
            emailCheck = _context.sent;

            if (!emailCheck) {
              _context.next = 19;
              break;
            }

            return _context.abrupt("return", res.status(409).json({
              message: "Email '".concat(req.body.email, "' already taken")
            }));

          case 19:
            if (!user.password) {
              _context.next = 23;
              break;
            }

            _context.next = 22;
            return _argon["default"].hash(user.password);

          case 22:
            user.password = _context.sent;

          case 23:
            console.log("updating user with id ".concat(userId)); //update user

            _context.next = 26;
            return db.collection('users').findOneAndUpdate({
              _id: (0, _mongodb.ObjectId)(userId)
            }, {
              $set: user
            }, {
              returnOriginal: false
            });

          case 26:
            newUser = _context.sent;
            client.close();
            token = (0, _authServices.generateJWT)(newUser.value);
            return _context.abrupt("return", res.status(200).json({
              token: token
            }));

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _update.apply(this, arguments);
}