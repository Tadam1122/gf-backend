"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connect = require("../../db/connect");

var _argon = _interopRequireDefault(require("argon2"));

var _authServices = require("../../services/auth-services");

function index(_x, _x2) {
  return _index.apply(this, arguments);
}

function _index() {
  _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var validation, client, db, user, pwMatch, token;
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
            _context.next = 5;
            return MongoClient.connect(process.env.MONGO_USER && process.env.MONGO_PASS ? "mongodb+srv://".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PASS, "@cluster0.co9dm.mongodb.net/").concat(process.env.MONGO_DBNAME, "?retryWrites=true&w=majority") : 'mongodb://localhost:27017', {
              useUnifiedTopology: true,
              useNewUrlParser: true
            });

          case 5:
            client = _context.sent;
            db = client.db(process.env.MONGO_DBNAME || 'guitar-finder');
            _context.next = 9;
            return db.collection('users').findOne({
              username: req.body.username.toLowerCase()
            });

          case 9:
            user = _context.sent;

            if (user) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              message: 'Username or password did not match'
            }));

          case 12:
            _context.next = 14;
            return _argon["default"].verify(user.password, req.body.password);

          case 14:
            pwMatch = _context.sent;

            if (pwMatch) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              message: 'Username or password did not match'
            }));

          case 17:
            client.close();
            token = (0, _authServices.generateJWT)(user);
            return _context.abrupt("return", res.status(200).json({
              token: token
            }));

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
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