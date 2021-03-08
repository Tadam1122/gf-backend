"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var controller = _interopRequireWildcard(require("./aamp-controller"));

var router = _express["default"].Router();

//get all acoustic amps
router.get('/aamp', controller.index); //get single acoustic amp by id

router.get('/aamp/:id', controller.show);
var _default = router;
exports["default"] = _default;