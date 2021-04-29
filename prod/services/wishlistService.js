"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateWishlists = updateWishlists;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bson = require("bson");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function updateWishlists(_x, _x2, _x3) {
  return _updateWishlists.apply(this, arguments);
}

function _updateWishlists() {
  _updateWishlists = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(db, priceDiff, productId) {
    var users, _iterator, _step, user, updated, _iterator2, _step2, wishlist, _iterator3, _step3, product;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            users = db.collection('users').find({});
            _iterator = _createForOfIteratorHelper(users);
            _context.prev = 2;

            _iterator.s();

          case 4:
            if ((_step = _iterator.n()).done) {
              _context.next = 14;
              break;
            }

            user = _step.value;
            updated = false;
            _iterator2 = _createForOfIteratorHelper(user.wishlists);

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                wishlist = _step2.value;
                _iterator3 = _createForOfIteratorHelper(wishlist.items);

                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    product = _step3.value;

                    if (product.id === productId) {
                      wishlist.totalPrice -= priceDiff;
                      updated = true;
                    }
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }
              } // update new totalprice for a user

            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            if (!updated) {
              _context.next = 12;
              break;
            }

            _context.next = 12;
            return db.collection('users').updateOne({
              _id: (0, _bson.ObjectId)(user._id)
            }, {
              $set: user
            });

          case 12:
            _context.next = 4;
            break;

          case 14:
            _context.next = 19;
            break;

          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](2);

            _iterator.e(_context.t0);

          case 19:
            _context.prev = 19;

            _iterator.f();

            return _context.finish(19);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 16, 19, 22]]);
  }));
  return _updateWishlists.apply(this, arguments);
}