"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var controller = _interopRequireWildcard(require("./user-controller"));

var router = _express["default"].Router();

//update user
router.put('/username', controller.updateName);
router.put('/useremail', controller.updateEmail);
var _default = router;
exports["default"] = _default;