"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLowestPrice = getLowestPrice;
exports.getLowestNumber = getLowestNumber;
exports.priceToNumber = priceToNumber;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

function getLowestPrice(stores) {
  var nonEmpty = stores.filter(function (store) {
    return store.price.length > 0;
  });
  return "$".concat(Math.min.apply(Math, (0, _toConsumableArray2["default"])(nonEmpty.map(function (store) {
    return Number(store.price.replace(/,/g, '').split('$')[1]);
  }))));
}

function getLowestNumber(stores) {
  var nonEmpty = stores.filter(function (store) {
    return store.price.length > 0;
  });
  return Math.min.apply(Math, (0, _toConsumableArray2["default"])(nonEmpty.map(function (store) {
    return Number(store.price.replace(/,/g, '').split('$')[1]);
  })));
}

function priceToNumber(price) {
  return Number(price.split('$')[1]);
}