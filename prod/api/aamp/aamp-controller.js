"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.show = show;
exports.update = update;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connect = require("../../db/connect");

var _mongodb = require("mongodb");

function index(_x, _x2) {
  return _index.apply(this, arguments);
}

function _index() {
  _index = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, res) {
    var client, db, aAmps;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _connect.connectClient)();

          case 2:
            client = _context.sent;
            db = client.db(process.env.MONGO_DBNAME || 'guitar-finder');
            console.log('fetching acoustic amplifiers'); //get all acoustic amps

            _context.next = 7;
            return db.collection('acoustic-amps').find({}).toArray();

          case 7:
            aAmps = _context.sent;
            client.close();
            return _context.abrupt("return", res.status(200).json(aAmps));

          case 10:
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
    var aAmpId, client, db, aAmp;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            aAmpId = req.params.id;
            _context2.next = 3;
            return (0, _connect.connectClient)();

          case 3:
            client = _context2.sent;
            db = client.db(process.env.MONGO_DBNAME || 'guitar-finder');
            console.log("fetching acoustic amplifier with id ".concat(aAmpId)); //get acoustic amp

            _context2.next = 8;
            return db.collection('acoustic-amps').findOne({
              _id: (0, _mongodb.ObjectId)(aAmpId)
            });

          case 8:
            aAmp = _context2.sent;
            client.close(); //no acoustic amp found

            if (aAmp) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              message: 'Acoustic amp could ont be found'
            }));

          case 14:
            return _context2.abrupt("return", res.status(200).json(aAmp));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _show.apply(this, arguments);
}

function update(_x5, _x6) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var aAmp, aAmpId, client, db;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            aAmp = req.body;
            aAmpId = req.body.id;
            console.log("updating acoustic amplifier with id ".concat(aAmpId));
            _context3.next = 5;
            return (0, _connect.connectClient)();

          case 5:
            client = _context3.sent;
            db = client.db(process.env.MONGO_DBNAME || 'guitar-finder'); //update acoustic amp

            _context3.next = 9;
            return db.collection('acoustic-amps').updateOne({
              _id: (0, _mongodb.ObjectId)(aAmpId)
            }, {
              $set: aAmp
            });

          case 9:
            client.close();
            return _context3.abrupt("return", res.status(200).json(aAmp));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _update.apply(this, arguments);
}