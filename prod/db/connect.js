"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectClient = connectClient;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongodb = require("mongodb");

function connectClient() {
  return _connectClient.apply(this, arguments);
}

function _connectClient() {
  _connectClient = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var client;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _mongodb.MongoClient.connect(process.env.MONGO_USER && process.env.MONGO_PASS ? "mongodb+srv://".concat(process.env.MONGO_USER, ":").concat(process.env.MONGO_PASS, "@").concat(process.env.MONGO_HOST, "/").concat(process.env.MONGO_DBNAME, "?retryWrites=true&w=majority") : 'mongodb://localhost:27017', {
              useUnifiedTopology: true,
              useNewUrlParser: true
            });

          case 2:
            client = _context.sent;
            return _context.abrupt("return", client);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _connectClient.apply(this, arguments);
}