"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.show = show;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connect = require("../../db/connect");

var _mongodb = require("mongodb");

function index(_x, _x2) {
  return _index.apply(this, arguments);
}

function _index() {
  _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, res) {
    var client, db, aGutiars;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _connect.connectClient)();

          case 2:
            client = _context.sent;
            db = client.db(process.env.MONGO_DBNAME || 'guitar-finder'); //get all electric guitars

            _context.next = 6;
            return db.collection('acoustic-guitars').find({}).toArray();

          case 6:
            aGutiars = _context.sent;
            client.close();
            return _context.abrupt("return", res.status(200).json(aGutiars));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _index.apply(this, arguments);
}

function show(_x3, _x4) {
  return _show.apply(this, arguments);
}

function _show() {
  _show = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var aGuitarId, client, db, eGutiar;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            aGuitarId = req.params.id;
            _context2.next = 3;
            return (0, _connect.connectClient)();

          case 3:
            client = _context2.sent;
            db = client.db(process.env.MONGO_DBNAME || 'guitar-finder'); //get acoustic guitar

            _context2.next = 7;
            return db.collection('acoustic-guitars').findOne({
              _id: (0, _mongodb.ObjectId)(aGuitarId)
            });

          case 7:
            eGutiar = _context2.sent;
            client.close(); //no acoustic guitar found

            if (eGutiar) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              message: 'Acoustic guitar could ont be found'
            }));

          case 13:
            return _context2.abrupt("return", res.status(200).json(eGutiar));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _show.apply(this, arguments);
}