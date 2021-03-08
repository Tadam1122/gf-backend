"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerRoutes = registerRoutes;

var _registerRoutes = _interopRequireDefault(require("./api/register/register-routes"));

var _authRoutes = _interopRequireDefault(require("./api/auth/auth-routes"));

var _eguitarRoutes = _interopRequireDefault(require("./api/eguitar/eguitar-routes"));

var _aguitarRoutes = _interopRequireDefault(require("./api/aguitar/aguitar-routes"));

var _aampRoutes = _interopRequireDefault(require("./api/aamp/aamp-routes"));

var _eampRoutes = _interopRequireDefault(require("./api/eamp/eamp-routes"));

var _pedalRoutes = _interopRequireDefault(require("./api/pedal/pedal-routes"));

var _userRoutes = _interopRequireDefault(require("./api/user/user-routes"));

var _wishlistRoutes = _interopRequireDefault(require("./api/wishlist/wishlist-routes"));

function registerRoutes(app) {
  app.use('/api', _authRoutes["default"]);
  app.use('/api', _registerRoutes["default"]);
  app.use('/api', _eguitarRoutes["default"]);
  app.use('/api', _aguitarRoutes["default"]);
  app.use('/api', _aampRoutes["default"]);
  app.use('/api', _eampRoutes["default"]);
  app.use('/api', _pedalRoutes["default"]);
  app.use('/api', _userRoutes["default"]);
  app.use('/api', _wishlistRoutes["default"]);
}