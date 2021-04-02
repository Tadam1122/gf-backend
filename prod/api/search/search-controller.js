"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.show = show;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connect = require("../../db/connect");

//search for products given a query
function show(_x, _x2) {
  return _show.apply(this, arguments);
}

function _show() {
  _show = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var query, client, db, products, eGuitars, aGuitars, eAmps, aAmps, pedals;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = req.params.query;
            _context.next = 3;
            return (0, _connect.connectClient)();

          case 3:
            client = _context.sent;
            db = client.db(process.env.MONGO_DBNAME || 'guitar-finder');
            console.log("searching products with query '".concat(query, "'"));
            products = []; //search electric guitars

            _context.next = 9;
            return db.collection('electric-guitars').find({
              $text: {
                $search: query
              }
            }).toArray();

          case 9:
            eGuitars = _context.sent;
            if (eGuitars) products = products.concat(eGuitars); //search acoustic guitars

            _context.next = 13;
            return db.collection('acoustic-guitars').find({
              $text: {
                $search: query
              }
            }).toArray();

          case 13:
            aGuitars = _context.sent;
            if (aGuitars) products = products.concat(aGuitars); //search electric amps

            _context.next = 17;
            return db.collection('electric-amps').find({
              $text: {
                $search: query
              }
            }).toArray();

          case 17:
            eAmps = _context.sent;
            if (eAmps) products = products.concat(eAmps); //search acoustic amps

            _context.next = 21;
            return db.collection('acoustic-amps').find({
              $text: {
                $search: query
              }
            }).toArray();

          case 21:
            aAmps = _context.sent;
            if (aAmps) products = products.concat(aAmps); //search effect pedals

            _context.next = 25;
            return db.collection('effect-pedals').find({
              $text: {
                $search: query
              }
            }).toArray();

          case 25:
            pedals = _context.sent;
            if (pedals) products = products.concat(pedals);
            return _context.abrupt("return", res.status(200).json(products));

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _show.apply(this, arguments);
}