"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connect = require("../../db/connect");

var _argon = _interopRequireDefault(require("argon2"));

//create user
function create(_x, _x2) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var validation, user, client, db, userCheck, emailCheck;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //check for valid request
            validation = validateIndex(req.body);

            if (validation.isValid) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              message: validation.message
            }));

          case 3:
            _context.t0 = req.body.username.toLowerCase();
            _context.next = 6;
            return _argon["default"].hash(req.body.password);

          case 6:
            _context.t1 = _context.sent;
            _context.t2 = req.body.email.toLowerCase();
            _context.t3 = [];
            user = {
              username: _context.t0,
              password: _context.t1,
              email: _context.t2,
              wishlists: _context.t3
            };
            _context.next = 12;
            return (0, _connect.connectClient)();

          case 12:
            client = _context.sent;
            db = client.db(process.env.MONGO_DBNAME || 'guitar-finder'); //check username not already taken

            _context.next = 16;
            return db.collection('users').findOne({
              username: user.username
            });

          case 16:
            userCheck = _context.sent;

            if (!userCheck) {
              _context.next = 19;
              break;
            }

            return _context.abrupt("return", res.status(409).json({
              message: "Username '".concat(req.body.username, "' already taken")
            }));

          case 19:
            _context.next = 21;
            return db.collection('users').findOne({
              email: user.email
            });

          case 21:
            emailCheck = _context.sent;

            if (!emailCheck) {
              _context.next = 24;
              break;
            }

            return _context.abrupt("return", res.status(409).json({
              message: "Email '".concat(req.body.email, "' already taken")
            }));

          case 24:
            _context.next = 26;
            return db.collection('users').insertOne(user);

          case 26:
            client.close();
            return _context.abrupt("return", res.status(200).json(user));

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _create.apply(this, arguments);
}

function validateIndex(body) {
  var errors = '';

  if (!body.username || !body.username.trim()) {
    errors += 'Username required. ';
  }

  if (!body.password || !body.password.trim()) {
    errors += 'Password required. ';
  }

  if (!body.email || !body.email.trim()) {
    errors += 'Email required. ';
  }

  return {
    isValid: !errors || !errors.trim(),
    message: errors
  };
}