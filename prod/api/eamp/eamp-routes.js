"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var controller = _interopRequireWildcard(require("./eamp-controller"));

var router = _express["default"].Router();

//get all electric amps
router.get('/eamp', controller.index); //get single electric amp by id

router.get('/eamp/:id', controller.show);
var _default = router;
exports["default"] = _default;