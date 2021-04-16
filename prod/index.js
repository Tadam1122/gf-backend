"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

var _http = _interopRequireDefault(require("http"));

var _nodeSchedule = _interopRequireDefault(require("node-schedule"));

var _routes = require("./routes");

var _prodServices = require("./services/prod-services");

var app = (0, _express["default"])();
var port = process.env.PORT || 8000;
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"]["static"](_path["default"].resolve(__dirname, '../dist'), {
  maxAge: '62d',
  etag: false
}));
(0, _routes.registerRoutes)(app);

var httpServer = _http["default"].createServer(app);

app.get('*', function (_, res) {
  res.sendFile(_path["default"].join(__dirname, '../dist/index.html'));
});
httpServer.listen(port, function () {
  console.log("app listening on port ".concat(port));

  _nodeSchedule["default"].scheduleJob('* 2 * * *', function () {
    (0, _prodServices.scrapePrices)();
  });
});