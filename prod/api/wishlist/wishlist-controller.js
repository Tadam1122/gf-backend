"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = update;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connect = require("../../db/connect");

var _mongodb = require("mongodb");

function update(_x, _x2) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var user, userId, client, db;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = {
              wishlists: req.body.wishlists
            };
            userId = req.body.id;
            _context.next = 4;
            return (0, _connect.connectClient)();

          case 4:
            client = _context.sent;
            db = client.db(process.env.MONGO_DBNAME || 'guitar-finder'); //update user

            _context.next = 8;
            return db.collection('users').updateOne({
              _id: (0, _mongodb.ObjectId)(userId)
            }, {
              $set: user
            });

          case 8:
            client.close();
            return _context.abrupt("return", res.status(200).json(user));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _update.apply(this, arguments);
}